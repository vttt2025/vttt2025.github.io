/**
 * admin-grading.js — Studio Chấm bài viết (B-16) cho giáo viên và quản trị viên trong CMS (route #grading).
 * Xem bài luyện viết học viên đã nộp (writing_submissions) + kết quả AI, nhập điểm giáo viên (teacher_score),
 * đổi trạng thái và ghi nhận xét (teacher_notes, có chip chèn nhanh).
 * Quyền thật nằm ở RLS + trigger (migration 20261128160000): giáo viên chỉ thấy bài chưa ai nhận hoặc của mình,
 * lưu là nhận bài (assigned_teacher_id = mình); bài đã nộp bất biến ngoài các cột chấm. Mỗi lần tải 1 trang 20 dòng.
 * Phụ thuộc: admin.js (window.RusiAdmin, window.SupabaseSyncEngine).
 */
(function () {
  "use strict";

  const PAGE = 20;
  const A = () => window.RusiAdmin || {};
  const esc = (s) => (A().esc ? A().esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const toast = (m, t) => (A().toast ? A().toast(m, t) : console.log("[Grading]", m));
  const sbClient = () => (window.SupabaseSyncEngine && window.SupabaseSyncEngine.getClient ? window.SupabaseSyncEngine.getClient() : null);
  const isAdminRole = () => ["academic_admin", "super_admin"].includes(String(window.__rusiAdminRole || ""));

  const STATUS = [
    ["submitted", "Chờ chấm", "p-pill-warning"],
    ["grading", "Đang chấm", "p-pill-info"],
    ["graded", "Đã chấm", "p-pill-success"],
    ["failed", "Lỗi / trả lại", "p-pill-danger"]
  ];
  const statusInfo = (s) => STATUS.find((x) => x[0] === s) || [s || "—", s || "—", "p-pill-neutral"];
  const NOTE_CHIPS = [
    "Bài viết đúng yêu cầu đề, bố cục rõ ràng.",
    "Chú ý biến cách danh từ/tính từ sau giới từ.",
    "Kiểm tra lại cách chia động từ theo ngôi và thì.",
    "Cần phân biệt thể động từ hoàn thành / chưa hoàn thành.",
    "Nên dùng thêm từ nối để các câu liên kết hơn.",
    "Vốn từ phong phú, hãy tiếp tục phát huy!"
  ];
  const BASE_COLS = "id,user_id,task_id,prompt_snapshot,student_text,word_count,status,overall_score,ai_feedback,teacher_notes,assigned_teacher_id,submitted_at,graded_at";

  const state = { status: "submitted", page: 0, rows: [], hasMore: false, loading: false, error: "", hasTeacherScore: true, openId: null };
  const emails = new Map();

  const fmt = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d) ? esc(iso) : d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const who = (r) => esc(emails.get(r.user_id) || ("Học viên #" + String(r.user_id || "").slice(0, 8)));

  async function fetchPage() {
    const sb = sbClient();
    if (!sb) { state.error = "Chưa kết nối Supabase."; return; }
    state.loading = true;
    state.error = "";
    const from = state.page * PAGE;
    const run = (cols) => {
      let q = sb.from("writing_submissions").select(cols).order("submitted_at", { ascending: false }).range(from, from + PAGE);
      if (state.status !== "all") q = q.eq("status", state.status);
      return q;
    };
    try {
      let res = await run(BASE_COLS + (state.hasTeacherScore ? ",teacher_score" : ""));
      // Cột teacher_score chỉ có sau migration 20261128160000 → vẫn xem được bài, khoá ô điểm
      if (res.error && state.hasTeacherScore && /teacher_score/.test(res.error.message || "")) {
        state.hasTeacherScore = false;
        res = await run(BASE_COLS);
      }
      if (res.error) throw res.error;
      const data = res.data || [];
      state.hasMore = data.length > PAGE;
      state.rows = data.slice(0, PAGE);
      // Email học viên chỉ admin xem được (RPC kiểm tra is_admin); giáo viên thấy mã học viên rút gọn
      const missing = isAdminRole() ? Array.from(new Set(state.rows.map((r) => r.user_id).filter((id) => id && !emails.has(id)))) : [];
      if (missing.length) {
        const { data: mails, error } = await sb.rpc("rusi_admin_user_emails", { p_ids: missing });
        if (error) console.warn("[Grading] Không đọc được email học viên:", error.message);
        (mails || []).forEach((m) => emails.set(m.id, m.email));
      }
    } catch (err) {
      console.error("[Grading] Lỗi tải bài nộp:", err);
      state.error = (err && err.message) || String(err);
      state.rows = [];
      state.hasMore = false;
    } finally {
      state.loading = false;
    }
  }

  function aiBlock(r) {
    const f = r.ai_feedback && typeof r.ai_feedback === "object" ? r.ai_feedback : {};
    if (!Object.keys(f).length) return `<div class="rusi-mon-sub">Chưa có kết quả AI.</div>`;
    const src = f.source === "server" ? "AI chấm trên máy chủ" : (f.source === "client" ? "Điểm do trình duyệt gửi (chưa kiểm chứng)" : "Kết quả AI");
    const parts = [["Ngữ pháp", f.grammar], ["Vốn từ", f.lexis], ["Bố cục", f.structure], ["Nội dung", f.content]]
      .map(([k, v]) => `<span class="p-pill p-pill-neutral">${esc(k)}: ${esc(v == null ? "—" : v)}/25</span>`).join(" ");
    return `
      <div class="rusi-grade-ai">
        <div><strong>${esc(f.total != null ? f.total : (r.overall_score != null ? r.overall_score : "—"))}/100</strong> · <span class="rusi-mon-sub">${esc(src)}${f.fallback ? " · điểm ước tính" : ""}</span></div>
        <div class="rusi-grade-ai-parts">${parts}</div>
        ${f.feedback ? `<pre>${esc(f.feedback)}</pre>` : ""}
      </div>`;
  }

  function editor(r) {
    const opts = STATUS.map(([v, l]) => `<option value="${esc(v)}" ${r.status === v ? "selected" : ""}>${esc(l)}</option>`).join("");
    return `
      <form class="rusi-grade-form" data-id="${esc(r.id)}">
        <div class="rusi-mon-detail-block"><strong>Bài làm (${esc(r.word_count)} từ)</strong><pre>${esc(r.student_text || "")}</pre></div>
        <div class="rusi-mon-detail-block"><strong>Kết quả AI</strong>${aiBlock(r)}</div>
        <div class="rusi-grade-fields">
          <label class="rusi-grade-field"><span>Điểm giáo viên (0–100)</span>
            <input class="p-input" type="number" name="teacher_score" min="0" max="100" step="0.5" inputmode="decimal"
              value="${r.teacher_score != null ? esc(r.teacher_score) : ""}" ${state.hasTeacherScore ? "" : 'disabled title="Cần áp dụng migration 20261128160000"'} />
          </label>
          <label class="rusi-grade-field"><span>Trạng thái</span>
            <select class="p-select" name="status">${opts}</select>
          </label>
        </div>
        <label class="rusi-grade-field rusi-grade-notes"><span>Nhận xét của giáo viên</span>
          <textarea class="p-input" name="teacher_notes" rows="4" maxlength="5000">${esc(r.teacher_notes || "")}</textarea>
        </label>
        <div class="rusi-grade-chips" aria-label="Chèn nhanh nhận xét">
          ${NOTE_CHIPS.map((c, i) => `<button type="button" class="p-btn p-btn-ghost p-btn-sm rusi-grade-chip" data-chip="${i}">+ ${esc(c)}</button>`).join("")}
        </div>
        <div class="rusi-grade-actions">
          <button type="submit" class="p-btn p-btn-primary p-btn-sm">Lưu kết quả chấm</button>
          <span class="rusi-mon-sub">${r.graded_at ? "Chấm lúc " + fmt(r.graded_at) : ""}</span>
        </div>
      </form>`;
  }

  async function save(form, container) {
    const sb = sbClient();
    const id = form.getAttribute("data-id");
    const row = state.rows.find((r) => String(r.id) === id);
    if (!sb || !row) return;
    const fd = new FormData(form);
    const status = String(fd.get("status") || "submitted");
    const patch = { status, teacher_notes: String(fd.get("teacher_notes") || "").trim() || null };
    if (state.hasTeacherScore) {
      const raw = String(fd.get("teacher_score") || "").trim();
      const score = raw === "" ? null : Number(raw);
      if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) { toast("Điểm giáo viên phải từ 0 đến 100.", "error"); return; }
      patch.teacher_score = score;
    }
    patch.graded_at = status === "graded" ? (row.graded_at || new Date().toISOString()) : null;
    // Giáo viên lưu = nhận bài (RLS bắt buộc bài thuộc về mình sau khi sửa); admin giữ người được giao hiện tại
    if (!isAdminRole()) {
      const { data: u } = await sb.auth.getUser();
      if (u && u.user) patch.assigned_teacher_id = u.user.id;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const { data, error } = await sb.from("writing_submissions").update(patch).eq("id", id).select("id").maybeSingle();
      if (error) throw error;
      if (!data) {
        toast("Không lưu được: bạn không có quyền với bài này, bài đã được giáo viên khác nhận, hoặc máy chủ chưa áp dụng quyền chấm bài.", "error");
        return;
      }
      Object.assign(row, patch);
      toast("Đã lưu kết quả chấm thành công!", "success");
      state.openId = null;
      draw(container);
    } catch (err) {
      console.error("[Grading] Lỗi lưu kết quả chấm:", err);
      toast("Lỗi lưu kết quả chấm: " + ((err && err.message) || err), "error");
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function draw(container) {
    const from = state.page * PAGE;
    const tabs = [["submitted", "Chờ chấm"], ["grading", "Đang chấm"], ["graded", "Đã chấm"], ["all", "Tất cả"]];
    container.innerHTML = `
      <div class="payload-list-header">
        <div class="payload-list-title-wrap">
          <h1 class="payload-list-title">Chấm bài viết</h1>
          <span class="p-pill p-pill-neutral">${isAdminRole() ? "Quản trị viên" : "Giáo viên"}</span>
        </div>
      </div>
      ${state.hasTeacherScore ? "" : `<div class="rusi-mon-error">Máy chủ chưa có cột điểm giáo viên (cần áp dụng migration 20261128160000). Vẫn đổi được trạng thái/nhận xét nếu đã có quyền.</div>`}
      <div class="rusi-mon-tabs rusi-grade-tabs" role="tablist">
        ${tabs.map(([v, l]) => `<button type="button" role="tab" class="rusi-mon-tab ${state.status === v ? "active" : ""}" aria-selected="${state.status === v}" data-status="${v}">${esc(l)}</button>`).join("")}
        <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="gradeRefresh">Tải lại</button>
      </div>
      ${state.error ? `<div class="rusi-mon-error">Không tải được bài nộp: ${esc(state.error)}</div>` : ""}
      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table rusi-mon-table rusi-grade-table">
            <thead><tr><th>Học viên</th><th>Đề bài</th><th>Số từ</th><th>Điểm AI</th><th>Điểm GV</th><th>Trạng thái</th><th>Nộp lúc</th><th></th></tr></thead>
            <tbody>
              ${state.loading ? `<tr><td colspan="8" class="rusi-mon-empty">Đang tải…</td></tr>` :
                (state.rows.length ? state.rows.map((r) => {
                  const st = statusInfo(r.status);
                  const snap = r.prompt_snapshot && typeof r.prompt_snapshot === "object" ? r.prompt_snapshot : {};
                  const open = state.openId === String(r.id);
                  return `
                  <tr>
                    <td data-label="Học viên">${who(r)}</td>
                    <td data-label="Đề bài">${esc(snap.title || snap.code || "—")}${snap.level ? `<div class="rusi-mon-sub">${esc(snap.level)}</div>` : ""}</td>
                    <td data-label="Số từ">${esc(r.word_count)}</td>
                    <td data-label="Điểm AI">${r.overall_score != null ? esc(r.overall_score) : "—"}</td>
                    <td data-label="Điểm GV">${r.teacher_score != null ? esc(r.teacher_score) : "—"}</td>
                    <td data-label="Trạng thái"><span class="p-pill ${st[2]}">${esc(st[1])}</span></td>
                    <td data-label="Nộp lúc">${fmt(r.submitted_at)}</td>
                    <td><button type="button" class="p-btn p-btn-ghost p-btn-sm rusi-grade-open" data-id="${esc(r.id)}">${open ? "Đóng" : "Chấm"}</button></td>
                  </tr>
                  ${open ? `<tr class="rusi-mon-detail"><td colspan="8">${editor(r)}</td></tr>` : ""}`;
                }).join("") : `<tr><td colspan="8" class="rusi-mon-empty">Không có bài nộp nào.</td></tr>`)}
            </tbody>
          </table>
        </div>
      </div>
      <div class="payload-pagination">
        <div>${state.rows.length ? `Hiển thị <strong>${from + 1}</strong> – <strong>${from + state.rows.length}</strong>` : ""}</div>
        <div style="display:flex;gap:8px">
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="gradePrev" ${state.page === 0 ? "disabled" : ""}>← Trang trước</button>
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="gradeNext" ${state.hasMore ? "" : "disabled"}>Trang sau →</button>
        </div>
      </div>`;

    container.querySelectorAll(".rusi-mon-tab[data-status]").forEach((b) => {
      b.onclick = () => { state.status = b.getAttribute("data-status"); state.page = 0; state.openId = null; Grading.render(container); };
    });
    container.querySelector("#gradeRefresh").onclick = () => Grading.render(container);
    container.querySelector("#gradePrev").onclick = () => { if (state.page > 0) { state.page--; state.openId = null; Grading.render(container); } };
    container.querySelector("#gradeNext").onclick = () => { if (state.hasMore) { state.page++; state.openId = null; Grading.render(container); } };
    container.querySelectorAll(".rusi-grade-open").forEach((b) => {
      b.onclick = () => { const id = b.getAttribute("data-id"); state.openId = state.openId === id ? null : id; draw(container); };
    });
    container.querySelectorAll(".rusi-grade-form").forEach((form) => {
      form.onsubmit = (e) => { e.preventDefault(); save(form, container); };
      const notes = form.querySelector('textarea[name="teacher_notes"]');
      form.querySelectorAll(".rusi-grade-chip").forEach((chip) => {
        chip.onclick = () => {
          const text = NOTE_CHIPS[Number(chip.getAttribute("data-chip"))] || "";
          notes.value = notes.value.trim() ? notes.value.trim() + "\n" + text : text;
          notes.focus();
        };
      });
    });
  }

  const Grading = {
    async render(container) {
      if (!container) return;
      state.loading = true;
      draw(container);
      await fetchPage();
      if (container.isConnected) draw(container);
    }
  };

  window.RusiAdminGrading = Grading;
})();
