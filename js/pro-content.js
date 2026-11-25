/**
 * js/pro-content.js — Tải nội dung bài PRO bằng phiên đăng nhập (window.RusiProContent).
 *
 * File công khai data/modules/*.json chỉ chứa metadata của bài PRO (`content_locked: true`, xem
 * scripts/publish-content.js). Khi học viên PRO mở bài, ensureFull() truy vấn Supabase (RLS cho phép khi
 * public.rusi_has_pro() — PRO còn hạn + phiên gắn thiết bị đang hoạt động), chuyển bằng RusiContentShapes
 * (cùng định dạng với file module) rồi gộp vào chính item đó trong RAM. Không lưu nội dung PRO vào IndexedDB.
 * Cần: js/content-shapes.js, supabase-client.js (RusiSupabase), auth.js (Auth), app.js (Monetization, toast).
 */
(function () {
  "use strict";

  const S = () => window.RusiContentShapes;

  // moduleKey → bảng/view, select, khoá truy vấn, hàm shape
  const SOURCES = {
    VOCAB_JARS: { table: "vocab_jars", select: "vocab_jars", file: "vocab_jars.json" },
    TOPIC_ARTICLES: { table: "topic_articles", select: "topic_articles", file: "topic_articles.json", shape: (r) => S().formatArticle(r) },
    LISTENING_LESSONS: { table: "listening_lessons", select: "listening_lessons", file: "listening_lessons.json", shape: (r) => S().listeningLesson(r) },
    SPEAKING_SETS: { table: "speaking_lessons", select: "speaking_lessons", file: "speaking_sets.json", shape: (r) => S().speakingSet(r) },
    WRITING_TASKS: { table: "writing_tasks", select: "writing_tasks", file: "writing_tasks.json", shape: (r) => S().writingTask(r) },
    WRITING_TOPICS: { table: "writing_topics", select: "writing_topics", file: "writing_topics.json", shape: (r) => S().writingTopic(r) },
    GRAMMAR_LESSONS: { table: "grammar_lessons", select: "grammar_lessons", file: "grammar_lessons.json", shape: (r) => S().grammarLesson(r) },
    TRKI_BANK: { table: "trki_tests_public", select: "trki_tests_public", file: "trki_bank.json", shape: (r) => S().trkiTest(r) }
  };

  const PRO_TITLE = "Nội dung dành cho PRO";
  const PRO_DESC = "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chuyên sâu.";
  const _pending = new Map(); // item → lượt tải đang chạy

  const rowIdOf = (item) => item.uuid || item.lesson_uuid || item.id;
  const isLocked = (item) => Boolean(item && item.content_locked);
  const notify = (msg) => { if (typeof window.toast === "function") window.toast(msg); };
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  async function fetchRows(src, ids) {
    const sb = window.RusiSupabase && window.RusiSupabase.getClient && window.RusiSupabase.getClient();
    if (!sb) throw new Error("Chưa kết nối được máy chủ dữ liệu");
    const { data, error } = await sb.from(src.table).select(S().SELECTS[src.select]).in("id", ids);
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  // Lọ từ: kèm bài chủ đề cùng code (cũng là nội dung PRO)
  async function fetchJars(ids) {
    const rows = await fetchRows(SOURCES.VOCAB_JARS, ids);
    const artIds = [];
    rows.forEach((r) => { if (r.code) artIds.push(r.code); artIds.push(String(r.id)); });
    const sb = window.RusiSupabase.getClient();
    const { data: arts, error } = await sb.from("topic_articles").select(S().SELECTS.topic_articles).in("id", artIds);
    if (error) throw error;
    const articles = {};
    (arts || []).forEach((a) => { articles[a.id] = a; });
    // Cập nhật luôn TOPIC_ARTICLES (trang bài chủ đề đọc cả từ đây)
    const map = window.TOPIC_ARTICLES;
    (arts || []).forEach((a) => {
      if (map && typeof map === "object" && (!map[a.id] || map[a.id].content_locked)) map[a.id] = S().formatArticle(a);
    });
    return rows.map((r) => S().vocabJar(r, articles));
  }

  function merge(item, full) {
    Object.keys(full).forEach((k) => { item[k] = full[k]; });
    delete item.content_locked;
    item._pro_loaded = true;
    return item;
  }

  async function loadOnce(moduleKey, items) {
    const src = SOURCES[moduleKey];
    const ids = items.map(rowIdOf).filter(Boolean).map(String);
    if (!ids.length) throw new Error("Thiếu mã bài học");
    const fetchAll = () => (moduleKey === "VOCAB_JARS" ? fetchJars(ids) : fetchRows(src, ids).then((rows) => rows.map(src.shape)));
    let full = await fetchAll();
    // Phiên vừa đăng nhập: thiết bị có thể chưa kịp gắn phiên (rusi_register_device) → RLS chưa cho đọc. Thử lại 1 lần.
    if (full.length < items.length && window.Auth && typeof window.Auth.verifyDeviceGuard === "function") {
      await delay(1200);
      const ok = await window.Auth.verifyDeviceGuard();
      if (ok === false) return null;
      full = await fetchAll();
    }
    const byCode = new Map(full.map((f) => [String(f.id), f]));
    let missing = 0;
    items.forEach((it) => {
      const f = byCode.get(String(it.id)) || byCode.get(String(it.code));
      if (f) merge(it, f); else missing++;
    });
    if (missing) {
      let hasPro = null;
      try {
        const { data } = await window.RusiSupabase.getClient().rpc("rusi_has_pro");
        hasPro = data;
      } catch (_) { /* chỉ dùng để chọn thông báo */ }
      throw new Error(hasPro === false
        ? "Phiên đăng nhập trên thiết bị này chưa được xác nhận PRO. Vui lòng tải lại trang hoặc đăng nhập lại."
        : "Không tìm thấy nội dung bài học trên máy chủ.");
    }
    return items;
  }

  /**
   * Bảo đảm các item PRO đã có đủ nội dung. Trả true nếu dùng được (item miễn phí → true ngay, không gọi mạng),
   * false nếu không PRO (đã hiện modal PRO), lỗi (đã báo toast) hoặc thiết bị bị chặn.
   */
  async function ensureFullList(moduleKey, list, opts) {
    const items = Array.from(new Set((Array.isArray(list) ? list : [list]).filter(isLocked)));
    if (!items.length) return true;
    if (!SOURCES[moduleKey] || !S()) {
      console.error("[RusiProContent] Không hỗ trợ module:", moduleKey);
      notify("Không mở được bài học PRO. Vui lòng tải lại trang.");
      return false;
    }
    // opts.admin: CMS — bỏ kiểm tra PRO/thiết bị phía client, RLS phía server quyết định (admin luôn đọc được)
    const asAdmin = Boolean(opts && opts.admin);
    if (!asAdmin && (typeof Monetization === "undefined" || !Monetization.isPro())) {
      if (typeof Monetization !== "undefined") Monetization.showProGateModal((opts && opts.title) || PRO_TITLE, (opts && opts.desc) || PRO_DESC);
      return false;
    }
    // Item đang được tải (vd. trang gọi mở bài 2 lần liên tiếp) → chờ lượt tải đó, không truy vấn lại
    const waits = [];
    const fresh = [];
    items.forEach((it) => { if (_pending.has(it)) waits.push(_pending.get(it)); else fresh.push(it); });
    if (fresh.length) {
      const job = (async () => {
        if (!asAdmin && window.Auth && typeof window.Auth.verifyDeviceGuard === "function") {
          const ok = await window.Auth.verifyDeviceGuard();
          if (ok === false) return null; // Đã hiện modal giới hạn thiết bị
        }
        return loadOnce(moduleKey, fresh);
      })();
      fresh.forEach((it) => _pending.set(it, job));
      job.then(() => fresh.forEach((it) => _pending.delete(it)), () => fresh.forEach((it) => _pending.delete(it)));
      waits.push(job);
    }
    try {
      const res = await Promise.all(waits);
      return res.every(Boolean) && items.every((it) => !isLocked(it));
    } catch (err) {
      console.error("[RusiProContent] Lỗi tải nội dung PRO", moduleKey, err);
      notify("Không tải được nội dung PRO: " + ((err && err.message) || "lỗi kết nối"));
      return false;
    }
  }

  /** Như ensureFullList cho 1 item: trả về item đầy đủ, hoặc null nếu không mở được. */
  async function ensureFull(moduleKey, item, opts) {
    if (!item) return null;
    return (await ensureFullList(moduleKey, [item], opts)) ? item : null;
  }

  window.RusiProContent = { ensureFull, ensureFullList, isLocked };
})();
