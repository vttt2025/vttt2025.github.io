/* =====================================================================
 * RusiVocabSync — đồng bộ tiến độ từ vựng giữa các thiết bị.
 * Dữ liệu (localStorage, tiền tố trki_): srs (thẻ SRS), srs_totalReviews/srs_totalCorrect,
 * vocab_mastered_words, custom_jars, quizlet_starred → cột user_progress.vocab_state.
 *
 * Quy tắc:
 *  - Chỉ đẩy lên sau khi đã kéo bản cloud trong lần tải trang này (tránh máy mới ghi đè dữ liệu cũ).
 *  - Chỉ tải khối vocab_state khi mốc updatedAt trên cloud mới hơn lần đồng bộ trước (tiết kiệm egress).
 *  - Thẻ SRS gộp từng thẻ theo updatedAt; mốc resetAt bỏ các thẻ cũ hơn lần "Reset toàn bộ".
 *  - Lọ cá nhân / từ gắn sao / từ đã thuộc: bản mới hơn thắng; lần đồng bộ đầu tiên thì gộp hợp.
 * Cần app.js (STORE, Progress) và supabase-client.js.
 * ===================================================================== */
(function () {
  "use strict";

  const CHANGED = "vocab_changed_at";
  const SYNCED = "vocab_synced_at";
  let pulled = false;

  const read = (k, fb) => STORE.get(k, fb);
  // Ghi không đánh dấu thay đổi (dữ liệu vừa lấy từ cloud)
  const writeQuiet = (k, v) => STORE._write(k, v);
  const stamp = (c) => (c && (c.updatedAt || c.lastReview || c.addedAt)) || 0;
  const norm = (w) => String(w || "").replace(/[\u0300\u0301]/g, "").toLowerCase().trim();
  const arr = (v) => (Array.isArray(v) ? v : []);

  function hasLocalData() {
    const srs = read("srs", null);
    return !!((srs && srs.cards && Object.keys(srs.cards).length) ||
      arr(read("custom_jars", [])).length ||
      arr(read("vocab_mastered_words", [])).length ||
      arr(read("quizlet_starred", [])).length);
  }

  /** Khối gửi lên cloud. Bỏ câu ví dụ/từ loại của thẻ để gọn — các trang lấy lại từ dữ liệu lọ. */
  function build() {
    const srs = read("srs", {}) || {};
    const cards = {};
    Object.keys(srs.cards || {}).forEach((id) => {
      const { ex, pos, ...rest } = srs.cards[id];
      cards[id] = rest;
    });
    return {
      v: 1,
      updatedAt: read(CHANGED, 0) || Date.now(),
      srs: { cards, resetAt: srs.resetAt || 0 },
      totals: { reviews: read("srs_totalReviews", 0), correct: read("srs_totalCorrect", 0) },
      mastered_words: arr(read("vocab_mastered_words", [])),
      custom_jars: arr(read("custom_jars", [])),
      starred: arr(read("quizlet_starred", []))
    };
  }

  function unionBy(localList, remoteList, keyFn) {
    const seen = new Set(localList.map(keyFn));
    return localList.concat(remoteList.filter((x) => !seen.has(keyFn(x))));
  }

  /** Gộp lọ theo id; lọ trùng id (vd. "Lọ yêu thích" mặc định) thì gộp hợp danh sách từ. */
  function mergeJars(localJars, remoteJars) {
    const remoteById = new Map(remoteJars.filter((j) => j && j.id).map((j) => [j.id, j]));
    const merged = localJars.map((l) => {
      const r = l && l.id && remoteById.get(l.id);
      if (!r) return l;
      return { ...r, ...l, words: unionBy(arr(l.words), arr(r.words), (w) => norm(w && w.ru)) };
    });
    return unionBy(merged, remoteJars, (j) => (j && j.id) || JSON.stringify(j));
  }

  function merge(remote) {
    const lastSynced = read(SYNCED, 0);
    const localChanged = read(CHANGED, 0);
    // Máy không có dữ liệu (vd. vừa đăng xuất, trang ghi lại giá trị rỗng) thì không có gì để gộp
    const localDirty = hasLocalData() && (localChanged > lastSynced || !lastSynced);

    // 1. Thẻ SRS: gộp từng thẻ
    const srs = read("srs", null) || { cards: {} };
    const localCards = srs.cards || {};
    const remoteCards = (remote.srs && remote.srs.cards) || {};
    const resetAt = Math.max(srs.resetAt || 0, (remote.srs && remote.srs.resetAt) || 0);
    const cards = {};
    new Set(Object.keys(localCards).concat(Object.keys(remoteCards))).forEach((id) => {
      const l = localCards[id];
      const r = remoteCards[id];
      // Thẻ từ cloud thiếu ex/pos → giữ của bản máy nếu có
      const pick = !l ? r : !r ? l : stamp(r) > stamp(l) ? { ...l, ...r } : l;
      if (pick && stamp(pick) >= resetAt) cards[id] = pick;
    });
    srs.cards = cards;
    srs.resetAt = resetAt;
    writeQuiet("srs", srs);

    // 2. Tổng số lượt ôn (chỉ tăng)
    const totals = remote.totals || {};
    writeQuiet("srs_totalReviews", Math.max(read("srs_totalReviews", 0), Number(totals.reviews) || 0));
    writeQuiet("srs_totalCorrect", Math.max(read("srs_totalCorrect", 0), Number(totals.correct) || 0));

    // 3. Lọ cá nhân, từ gắn sao, từ đã thuộc.
    // merge() chỉ chạy khi cloud đã đổi kể từ lần đồng bộ trước. Nếu máy này cũng có thay đổi chưa gửi
    // (hoặc đồng bộ lần đầu) thì gộp hợp để không mất dữ liệu bên nào; ngược lại lấy bản cloud.
    const lists = [
      ["custom_jars", arr(remote.custom_jars), mergeJars],
      ["quizlet_starred", arr(remote.starred), (l, r) => unionBy(l, r, norm)],
      ["vocab_mastered_words", arr(remote.mastered_words), (l, r) => unionBy(l, r, norm)]
    ];
    lists.forEach(([key, remoteList, mergeFn]) => {
      const localList = arr(read(key, []));
      writeQuiet(key, localDirty ? mergeFn(localList, remoteList) : remoteList);
    });

    // Từ có thẻ SRS: cờ mastered của thẻ (gộp theo updatedAt) quyết định có trong danh sách đã thuộc hay không
    const cardMastered = new Map();
    Object.values(cards).forEach((c) => { if (c.ru) cardMastered.set(norm(c.ru), { ru: c.ru, mastered: !!c.mastered }); });
    const mastered = arr(read("vocab_mastered_words", [])).filter((w) => {
      const c = cardMastered.get(norm(w));
      return !c || c.mastered;
    });
    const masteredSet = new Set(mastered.map(norm));
    cardMastered.forEach((c, k) => {
      if (c.mastered && !masteredSet.has(k)) { mastered.push(c.ru); masteredSet.add(k); }
    });
    writeQuiet("vocab_mastered_words", mastered);

    writeQuiet(SYNCED, remote.updatedAt || 0);
    // Máy này có thay đổi chưa gửi → đánh dấu để đẩy bản đã gộp lên
    // Mốc thay đổi phải > SYNCED (= updatedAt của máy khác, có thể lệch giờ) để bản đã gộp chắc chắn được đẩy lên
    writeQuiet(CHANGED, localDirty ? Math.max(Date.now(), (remote.updatedAt || 0) + 1) : (remote.updatedAt || 0));
  }

  async function pull(userId, remoteUpdatedAt) {
    try {
      const remoteStamp = Number(remoteUpdatedAt) || 0;
      if (remoteStamp && remoteStamp > read(SYNCED, 0)) {
        const remote = await window.RusiSupabase.userProgress.getVocabState(userId);
        if (remote && remote.v) merge(remote);
      } else if (!read(SYNCED, 0) && hasLocalData() && !read(CHANGED, 0)) {
        // Dữ liệu cũ từ trước khi có đồng bộ → cần đẩy lên lần đầu
        writeQuiet(CHANGED, Date.now());
      }
      pulled = true;
      if (isDirty()) {
        window.Progress.syncToCloud();
      }
      window.dispatchEvent(new CustomEvent("trki:progress-updated"));
    } catch (err) {
      // Không đánh dấu pulled → không đẩy lên, tránh ghi đè dữ liệu cloud bằng bản máy chưa gộp
      console.warn("[RusiVocabSync] Không tải được tiến độ từ vựng từ cloud:", err);
    }
  }

  function isDirty() {
    return read(CHANGED, 0) > read(SYNCED, 0);
  }

  window.RusiVocabSync = {
    pull,
    isDirty,
    /** Khối cần gửi, hoặc null nếu chưa kéo về hay không có thay đổi. */
    payloadForPush() {
      return pulled && isDirty() ? build() : null;
    },
    markPushed(payload) {
      if (payload && payload.updatedAt > read(SYNCED, 0)) writeQuiet(SYNCED, payload.updatedAt);
    },
    _merge: merge,
    _build: build
  };
})();
