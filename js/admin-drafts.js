/**
 * admin-drafts.js — Bản nháp tự lưu của CMS (sửa thoải mái nhiều ngày, nhiều máy).
 *
 * - Đang soạn (chưa bấm Lưu): mỗi ~3 giây, nếu bản đang sửa khác bản đã lưu → tự lưu nháp vào bảng
 *   public.cms_drafts (chỉ admin đọc/ghi; KHÔNG nằm trong luồng xuất bản nên web không đổi). Mất mạng / chưa
 *   đăng nhập Cloud → giữ trong IndexedDB của máy (admin-local.js) và tự đẩy lên khi có mạng.
 * - Mở lại bài có nháp → banner "Mở bản nháp / Bỏ nháp". Nháp mang mốc phiên bản Cloud lúc bắt đầu soạn
 *   (__cloud_updated_at / __stale_base) → nếu trong lúc đó bài đã được người khác lưu, bấm Lưu sẽ bị máy chủ
 *   chặn (RS409) thay vì ghi đè.
 * - Bấm Lưu thành công → xoá nháp. Bảng điều khiển có danh sách "Bản nháp đang soạn".
 * Phụ thuộc: admin.js (window.State, window.RusiAdmin, window.SupabaseSyncEngine, window.COLLECTIONS).
 */
(function () {
  "use strict";

  const TICK_MS = 3000;
  const index = new Map(); // "<collection>|<doc_key>" → meta
  const lastSaved = new Map(); // key → JSON đã lưu nháp gần nhất
  let started = false;
  let saving = false;
  let pendingCreateKey = null;

  const A = () => window.RusiAdmin || {};
  const S = () => window.State || {};
  const sbClient = () => (window.SupabaseSyncEngine && window.SupabaseSyncEngine.getClient ? window.SupabaseSyncEngine.getClient() : null);
  const esc = (s) => (A().esc ? A().esc(s) : String(s == null ? "" : s));
  const k2 = (collection, docKey) => `${collection}|${docKey}`;
  const fmtTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return isNaN(d) ? "" : d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function currentKey() {
    const st = S();
    if (st.currentRoute !== "editor" || !st.currentSlug) return null;
    if (st.isCreating) {
      if (!st.newDraftKey) st.newDraftKey = newId();
      return "new:" + st.newDraftKey;
    }
    return st.currentDocId != null ? String(st.currentDocId) : null;
  }

  function titleOf(data, docKey) {
    const t = data && (data.title || data.name || data.word_with_stress || data.ru || data.prompt || data.code || data.full_name);
    return String(t || docKey).slice(0, 200);
  }

  function setStatus(text, tone) {
    const main = document.querySelector(".payload-doc-main");
    if (!main) return;
    let el = document.getElementById("draftAutosaveStatus");
    if (!el) {
      el = document.createElement("div");
      el.id = "draftAutosaveStatus";
      el.className = "rusi-draft-status";
      main.insertBefore(el, main.firstChild);
    }
    el.dataset.tone = tone || "ok";
    el.textContent = text;
  }

  async function pushCloud(meta, data) {
    const sb = sbClient();
    if (!sb || (typeof navigator !== "undefined" && navigator.onLine === false)) return false;
    const { error } = await sb.from("cms_drafts").upsert({
      collection: meta.collection,
      doc_key: meta.doc_key,
      is_new: !!meta.is_new,
      data,
      base_updated_at: meta.base_updated_at || null,
      title: meta.title,
      updated_at: meta.updated_at
    }, { onConflict: "collection,doc_key" });
    if (error) {
      console.warn("[Drafts] Chưa lưu được nháp lên Cloud:", error);
      return false;
    }
    return true;
  }

  async function saveDraft(collection, docKey, data) {
    const meta = {
      collection,
      doc_key: docKey,
      is_new: docKey.startsWith("new:"),
      title: titleOf(data, docKey),
      base_updated_at: data.__cloud_updated_at || data.__stale_base || null,
      updated_at: new Date().toISOString()
    };
    const key = k2(collection, docKey);
    // 1. Máy này trước (luôn có, kể cả mất mạng)
    try {
      await window.RusiAdminCache.putDraft(key, { ...meta, data, pendingCloud: true });
    } catch (err) {
      console.error("[Drafts] Không lưu được nháp vào máy:", err);
    }
    // 2. Cloud
    const ok = await pushCloud(meta, data);
    if (ok) {
      try { await window.RusiAdminCache.deleteDraft(key); } catch (_) { /* bản trên máy chỉ là dự phòng */ }
    }
    index.set(key, { ...(index.get(key) || {}), ...meta, source: ok ? "cloud" : "local" });
    updateBadge();
    return ok;
  }

  async function tick() {
    if (saving) return;
    const st = S();
    const key = currentKey();
    if (!key || !st.currentDraft || !A().isEditorDirty || !A().isEditorDirty()) return;
    const json = JSON.stringify(st.currentDraft);
    const mapKey = k2(st.currentSlug, key);
    if (lastSaved.get(mapKey) === json) return;
    saving = true;
    try {
      const ok = await saveDraft(st.currentSlug, key, JSON.parse(json));
      lastSaved.set(mapKey, json);
      const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      setStatus(ok
        ? `Đã tự lưu nháp lúc ${time} (Cloud) — chưa lên web cho tới khi bấm Lưu.`
        : `Đã tự lưu nháp lúc ${time} trên máy này — sẽ đẩy lên Cloud khi có mạng.`, ok ? "ok" : "warn");
    } catch (err) {
      console.error("[Drafts] Lỗi tự lưu nháp:", err);
      setStatus("Không tự lưu được nháp — hãy bấm Lưu để giữ bản sửa.", "error");
    } finally {
      saving = false;
    }
  }

  // Đẩy nháp còn nằm trên máy (lúc mất mạng) lên Cloud
  async function flushLocal() {
    let rows = [];
    try { rows = await window.RusiAdminCache.allDrafts(); } catch (_) { return; }
    for (const { key, value } of rows) {
      if (!value || !value.pendingCloud) continue;
      index.set(key, { ...value, data: undefined, source: "local" });
      if (await pushCloud(value, value.data)) {
        try { await window.RusiAdminCache.deleteDraft(key); } catch (_) { /* dự phòng */ }
        index.set(key, { ...value, data: undefined, source: "cloud" });
      }
    }
  }

  async function loadIndex() {
    const sb = sbClient();
    if (sb) {
      const { data, error } = await sb.from("cms_drafts")
        .select("collection, doc_key, title, is_new, base_updated_at, updated_at, updated_by")
        .order("updated_at", { ascending: false }).limit(500);
      if (error) console.warn("[Drafts] Không đọc được danh sách nháp:", error);
      index.forEach((m, k) => { if (m.source === "cloud") index.delete(k); });
      (data || []).forEach((r) => index.set(k2(r.collection, r.doc_key), { ...r, source: "cloud" }));
    }
    await flushLocal();
    updateBadge();
  }

  function updateBadge() {
    const el = document.getElementById("navBadgeDrafts");
    if (!el) return;
    el.textContent = String(index.size);
    el.hidden = index.size === 0;
  }

  // Tên người soạn (email) cho trang quản lý — RPC rusi_admin_user_emails (chỉ admin)
  const authorEmails = new Map();
  async function loadAuthors(ids) {
    const sb = sbClient();
    const missing = Array.from(new Set(ids.filter((id) => id && !authorEmails.has(id))));
    if (!sb || !missing.length) return;
    const { data, error } = await sb.rpc("rusi_admin_user_emails", { p_ids: missing });
    if (error) { console.warn("[Drafts] Không đọc được email người soạn:", error); return; }
    missing.forEach((id) => authorEmails.set(id, ""));
    (data || []).forEach((r) => authorEmails.set(r.id, r.email || ""));
  }

  // Bài trên Cloud đã được lưu sau khi bắt đầu soạn nháp? (so mốc trong danh sách CMS đã tải, nếu có)
  function cloudNewer(meta) {
    if (!meta.base_updated_at || meta.is_new || typeof window.getMergedList !== "function") return null;
    const item = (window.getMergedList(meta.collection) || []).find((it) => [it.id, it.code, it.slug, it.uuid, it.word_with_stress].some((v) => v != null && String(v) === String(meta.doc_key)));
    if (!item || !item.__cloud_updated_at) return null;
    return new Date(item.__cloud_updated_at) > new Date(meta.base_updated_at) ? item.__cloud_updated_at : null;
  }

  const mgr = { collection: "", q: "", selected: new Set(), focusQ: false };

  async function fetchDraft(collection, docKey) {
    const key = k2(collection, docKey);
    try {
      const local = (await window.RusiAdminCache.allDrafts()).find((r) => r.key === key);
      if (local && local.value && local.value.data) return local.value;
    } catch (_) { /* thử Cloud */ }
    const sb = sbClient();
    if (!sb) return null;
    const { data, error } = await sb.from("cms_drafts").select("*").eq("collection", collection).eq("doc_key", docKey).maybeSingle();
    if (error) { console.warn("[Drafts] Không tải được nháp:", error); return null; }
    return data;
  }

  async function discard(collection, docKey) {
    const key = k2(collection, docKey);
    index.delete(key);
    lastSaved.delete(key);
    updateBadge();
    try { await window.RusiAdminCache.deleteDraft(key); } catch (_) { /* không có bản trên máy */ }
    const sb = sbClient();
    if (sb) {
      const { error } = await sb.from("cms_drafts").delete().eq("collection", collection).eq("doc_key", docKey);
      if (error) console.warn("[Drafts] Không xoá được nháp trên Cloud:", error);
    }
  }

  function restoreInto(draft) {
    const st = S();
    const data = draft.data;
    if (!data) return;
    // Giữ savedSnapshot = bản gốc → editor coi là "có thay đổi chưa lưu" cho tới khi bấm Lưu
    const original = st.savedSnapshot;
    st.currentDraft = JSON.parse(JSON.stringify(data));
    st.__restoringDraft = true;
    try {
      if (A().rerenderEditor) A().rerenderEditor();
    } finally {
      st.__restoringDraft = false;
    }
    if (original != null) st.savedSnapshot = original;
    lastSaved.set(k2(st.currentSlug, draft.doc_key), JSON.stringify(data));
    setStatus(`Đang sửa tiếp bản nháp lưu lúc ${fmtTime(draft.updated_at)}. Bấm Lưu để đưa lên Cloud và web.`, "ok");
  }

  function showBanner(meta) {
    const main = document.querySelector(".payload-doc-main");
    if (!main || document.getElementById("draftRestoreBanner")) return;
    const st = S();
    const cloudAt = st.currentDraft && st.currentDraft.__cloud_updated_at;
    const newer = meta.base_updated_at && cloudAt && new Date(cloudAt) > new Date(meta.base_updated_at);
    const box = document.createElement("div");
    box.id = "draftRestoreBanner";
    box.className = "rusi-draft-banner";
    box.innerHTML = `
      <div class="rusi-draft-banner-text">
        <strong>Có bản nháp soạn dở</strong> — tự lưu lúc ${esc(fmtTime(meta.updated_at))}${meta.source === "local" ? " (trên máy này, chưa lên Cloud)" : ""}.
        ${newer ? `<div class="rusi-draft-banner-warn">Bài trên Cloud đã được lưu lúc ${esc(fmtTime(cloudAt))}, sau khi nháp bắt đầu. Mở nháp rồi bấm Lưu sẽ bị chặn để không ghi đè — hãy đối chiếu và chép phần cần giữ.</div>` : ""}
      </div>
      <div class="rusi-draft-banner-actions">
        <button type="button" class="p-btn p-btn-primary p-btn-sm" data-act="open">Mở bản nháp</button>
        <button type="button" class="p-btn p-btn-ghost p-btn-sm" data-act="discard">Bỏ nháp</button>
      </div>`;
    main.insertBefore(box, main.firstChild);
    box.querySelector('[data-act="open"]').onclick = async () => {
      const draft = await fetchDraft(meta.collection, meta.doc_key);
      if (!draft || !draft.data) { A().toast && A().toast("Không tải được bản nháp.", "error"); return; }
      box.remove();
      restoreInto({ ...meta, ...draft });
    };
    box.querySelector('[data-act="discard"]').onclick = async () => {
      if (!confirm("Bỏ bản nháp này? Bản nháp sẽ bị xoá (bài đang có trên Cloud không đổi).")) return;
      await discard(meta.collection, meta.doc_key);
      box.remove();
      A().toast && A().toast("Đã bỏ bản nháp.", "info");
    };
  }

  const Drafts = {
    has(collection, docKey) {
      return index.has(k2(collection, String(docKey)));
    },

    // admin.js gọi sau mỗi lần vẽ editor
    async onEditorRendered() {
      const st = S();
      if (st.__restoringDraft) return;
      if (st.isCreating && pendingCreateKey) {
        // Mở nháp "tạo mới" từ danh sách nháp
        const docKey = pendingCreateKey;
        pendingCreateKey = null;
        st.newDraftKey = docKey.slice(4);
        const draft = await fetchDraft(st.currentSlug, docKey);
        if (draft && draft.data) restoreInto({ ...draft, doc_key: docKey });
        return;
      }
      const key = currentKey();
      if (!key) return;
      const meta = index.get(k2(st.currentSlug, key));
      if (meta) showBanner(meta);
    },

    // Đi vào form tạo mới → phiên nháp mới (không ghi đè nháp tạo mới trước đó)
    onCreateEntered() {
      const st = S();
      if (!pendingCreateKey) st.newDraftKey = newId();
    },

    async onSaved(collection, keys) {
      const st = S();
      const all = new Set((keys || []).filter(Boolean).map(String));
      if (st.newDraftKey) all.add("new:" + st.newDraftKey);
      for (const k of all) {
        if (index.has(k2(collection, k))) await discard(collection, k);
        else lastSaved.delete(k2(collection, k));
      }
      st.newDraftKey = null;
      const el = document.getElementById("draftAutosaveStatus");
      if (el) el.remove();
    },

    // Rời trang có thay đổi: đã tự lưu nháp chưa (để đổi câu hỏi xác nhận)
    isCurrentSaved() {
      const st = S();
      const key = currentKey();
      return !!(key && st.currentDraft && lastSaved.get(k2(st.currentSlug, key)) === JSON.stringify(st.currentDraft));
    },

    flushNow() { return tick(); },

    count() { return index.size; },

    // Trang "Quản lý bản nháp" (#drafts): mọi nháp của các admin, lọc / tìm / mở / bỏ (từng cái hoặc nhiều cái)
    async renderManager(container) {
      if (!container) return;
      container.innerHTML = `<div class="rusi-mon-empty">Đang tải danh sách nháp…</div>`;
      try { await loadIndex(); } catch (err) { console.warn("[Drafts] Không tải lại được danh sách nháp:", err); }
      await loadAuthors(Array.from(index.values()).map((m) => m.updated_by));
      if (!container.isConnected) return;
      const cols = window.COLLECTIONS || {};
      const labelOf = (c) => (cols[c] && cols[c].label) || c;
      const all = Array.from(index.values()).sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
      const collections = Array.from(new Set(all.map((m) => m.collection)));
      const q = mgr.q.trim().toLowerCase();
      const items = all.filter((m) => (!mgr.collection || m.collection === mgr.collection)
        && (!q || String(m.title || m.doc_key).toLowerCase().includes(q) || String(m.doc_key).toLowerCase().includes(q)));
      mgr.selected.forEach((k) => { if (!index.has(k)) mgr.selected.delete(k); });
      const me = window.Auth && window.Auth.user && window.Auth.user.id;

      container.innerHTML = `
        <div class="payload-list-header">
          <div class="payload-list-title-wrap">
            <h1 class="payload-list-title">Quản lý bản nháp</h1>
            <span class="p-pill p-pill-neutral">${all.length}</span>
          </div>
        </div>
        <p class="rusi-drafts-intro">Bản nháp được tự lưu khi đang sửa và <strong>chưa lên web</strong>. Mở nháp rồi bấm Lưu để đưa lên Cloud và xuất bản; bỏ nháp không ảnh hưởng bài đang có.</p>
        <div class="rusi-mon-toolbar">
          <label class="rusi-mon-filter"><span>Mục</span>
            <select class="p-select" id="drMgrCol"><option value="">Tất cả mục</option>${collections.map((c) => `<option value="${esc(c)}" ${mgr.collection === c ? "selected" : ""}>${esc(labelOf(c))}</option>`).join("")}</select>
          </label>
          <label class="rusi-mon-filter"><span>Tìm</span>
            <input type="search" class="p-input" id="drMgrQ" placeholder="Tiêu đề hoặc mã…" value="${esc(mgr.q)}" />
          </label>
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="drMgrReload">Tải lại</button>
          <button type="button" class="p-btn p-btn-danger p-btn-sm" id="drMgrBulk" ${mgr.selected.size ? "" : "disabled"}>Bỏ ${mgr.selected.size || ""} nháp đã chọn</button>
        </div>
        <div class="payload-table-wrapper">
          <div class="payload-table-scroll">
            <table class="payload-table rusi-mon-table">
              <thead><tr>
                <th class="payload-table-check"><input type="checkbox" id="drMgrAll" aria-label="Chọn tất cả" ${items.length && items.every((m) => mgr.selected.has(k2(m.collection, m.doc_key))) ? "checked" : ""} /></th>
                <th>Bản nháp</th><th>Mục</th><th>Người soạn</th><th>Lưu lúc</th><th>Trạng thái</th><th style="text-align:right">Thao tác</th>
              </tr></thead>
              <tbody>
                ${items.length ? items.map((m) => {
                  const key = k2(m.collection, m.doc_key);
                  const newer = cloudNewer(m);
                  const author = m.updated_by ? (m.updated_by === me ? "Bạn" : (authorEmails.get(m.updated_by) || String(m.updated_by).slice(0, 8) + "…")) : (m.source === "local" ? "Bạn (máy này)" : "—");
                  return `<tr>
                    <td class="payload-table-check"><input type="checkbox" class="drMgrRow" data-key="${esc(key)}" ${mgr.selected.has(key) ? "checked" : ""} aria-label="Chọn nháp" /></td>
                    <td data-label="Bản nháp"><div class="rusi-drafts-title">${esc(m.title || m.doc_key)}</div><div class="rusi-mon-sub">${m.is_new ? "Bài mới" : `<code>${esc(m.doc_key)}</code>`}</div></td>
                    <td data-label="Mục">${esc(labelOf(m.collection))}</td>
                    <td data-label="Người soạn">${esc(author)}</td>
                    <td data-label="Lưu lúc">${esc(fmtTime(m.updated_at))}</td>
                    <td data-label="Trạng thái">
                      ${m.source === "local" ? `<span class="p-pill p-pill-danger" title="Chưa đẩy được lên Cloud — chỉ có trên máy này">Chỉ trên máy này</span>` : `<span class="p-pill p-pill-success">Đã lưu Cloud</span>`}
                      ${newer ? `<div class="rusi-mon-sub rusi-drafts-warn">Bài đã được lưu lúc ${esc(fmtTime(newer))}, sau khi bắt đầu nháp</div>` : ""}
                    </td>
                    <td style="text-align:right"><div class="payload-row-actions">
                      <button type="button" class="p-btn p-btn-secondary p-btn-sm drMgrOpen" data-col="${esc(m.collection)}" data-key="${esc(m.doc_key)}">Mở</button>
                      <button type="button" class="p-btn p-btn-ghost p-btn-sm drMgrDrop" data-col="${esc(m.collection)}" data-key="${esc(m.doc_key)}" style="color:var(--p-danger)">Bỏ nháp</button>
                    </div></td>
                  </tr>`;
                }).join("") : `<tr><td colspan="7" class="rusi-mon-empty">${all.length ? "Không có nháp khớp bộ lọc." : "Chưa có bản nháp nào. Nháp tự lưu khi bạn sửa một bài mà chưa bấm Lưu."}</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>`;

      const rerender = () => Drafts.renderManager(container);
      container.querySelector("#drMgrCol").onchange = (e) => { mgr.collection = e.target.value; rerender(); };
      const qInp = container.querySelector("#drMgrQ");
      let qTimer = null;
      qInp.oninput = () => { clearTimeout(qTimer); qTimer = setTimeout(() => { mgr.q = qInp.value; mgr.focusQ = true; rerender(); }, 250); };
      if (mgr.focusQ) {
        // Vẽ lại bảng khi đang gõ tìm → giữ con trỏ trong ô tìm
        mgr.focusQ = false;
        qInp.focus();
        qInp.setSelectionRange(qInp.value.length, qInp.value.length);
      }
      container.querySelector("#drMgrReload").onclick = rerender;
      container.querySelector("#drMgrAll").onchange = (e) => {
        items.forEach((m) => { const k = k2(m.collection, m.doc_key); if (e.target.checked) mgr.selected.add(k); else mgr.selected.delete(k); });
        rerender();
      };
      container.querySelectorAll(".drMgrRow").forEach((cb) => {
        cb.onchange = () => {
          if (cb.checked) mgr.selected.add(cb.dataset.key); else mgr.selected.delete(cb.dataset.key);
          const bulk = container.querySelector("#drMgrBulk");
          bulk.disabled = !mgr.selected.size;
          bulk.textContent = `Bỏ ${mgr.selected.size || ""} nháp đã chọn`;
        };
      });
      container.querySelectorAll(".drMgrOpen").forEach((b) => {
        b.onclick = () => {
          const col = b.dataset.col, key = b.dataset.key;
          if (key.startsWith("new:")) { pendingCreateKey = key; window.location.hash = `#collection/${col}/create`; }
          else window.location.hash = `#collection/${col}/edit/${encodeURIComponent(key)}`;
        };
      });
      container.querySelectorAll(".drMgrDrop").forEach((b) => {
        b.onclick = async () => {
          if (!confirm("Bỏ bản nháp này? Nháp sẽ bị xoá vĩnh viễn (bài đang có trên Cloud và web không đổi).")) return;
          await discard(b.dataset.col, b.dataset.key);
          A().toast && A().toast("Đã bỏ bản nháp.", "info");
          rerender();
        };
      });
      container.querySelector("#drMgrBulk").onclick = async () => {
        const keys = Array.from(mgr.selected);
        if (!keys.length) return;
        if (!confirm(`Bỏ ${keys.length} bản nháp đã chọn? Các nháp sẽ bị xoá vĩnh viễn (bài trên Cloud và web không đổi).`)) return;
        for (const k of keys) {
          const m = index.get(k);
          if (m) await discard(m.collection, m.doc_key);
        }
        mgr.selected.clear();
        A().toast && A().toast(`Đã bỏ ${keys.length} bản nháp.`, "info");
        rerender();
      };
    },

    renderPanel(el) {
      if (!el) return;
      const items = Array.from(index.values()).sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
      if (!items.length) { el.innerHTML = ""; return; }
      const cols = window.COLLECTIONS || {};
      el.innerHTML = `
        <div class="rusi-drafts-panel">
          <div class="rusi-drafts-head">
            <h3>Bản nháp đang soạn (${items.length})</h3>
            <span>Tự lưu khi đang sửa · chưa lên web cho tới khi mở bài và bấm Lưu</span>
            <a class="rusi-drafts-all" href="#drafts">Quản lý tất cả →</a>
          </div>
          <ul class="rusi-drafts-list">
            ${items.slice(0, 5).map((m) => {
              const label = (cols[m.collection] && cols[m.collection].label) || m.collection;
              return `<li>
                <button type="button" class="rusi-drafts-open" data-col="${esc(m.collection)}" data-key="${esc(m.doc_key)}">
                  <span class="rusi-drafts-title">${esc(m.title || m.doc_key)}</span>
                  <span class="rusi-drafts-meta">${esc(label)}${m.is_new ? " · bài mới" : ""} · ${esc(fmtTime(m.updated_at))}${m.source === "local" ? " · chỉ trên máy này" : ""}</span>
                </button>
              </li>`;
            }).join("")}
          </ul>
        </div>`;
      el.querySelectorAll(".rusi-drafts-open").forEach((btn) => {
        btn.onclick = () => {
          const col = btn.getAttribute("data-col");
          const key = btn.getAttribute("data-key");
          if (key.startsWith("new:")) {
            pendingCreateKey = key;
            window.location.hash = `#collection/${col}/create`;
          } else {
            window.location.hash = `#collection/${col}/edit/${encodeURIComponent(key)}`;
          }
        };
      });
    },

    async start() {
      if (started) return;
      started = true;
      try { await loadIndex(); } catch (err) { console.warn("[Drafts] Không tải được danh sách nháp:", err); }
      setInterval(() => { tick(); }, TICK_MS);
      window.addEventListener("online", () => { flushLocal(); });
      const st = S();
      if (st.currentRoute === "dashboard" || st.currentRoute === "list") {
        if (typeof window.handleRoute === "function") window.handleRoute();
      } else if (st.currentRoute === "editor") {
        Drafts.onEditorRendered();
      }
    }
  };

  window.RusiAdminDrafts = Drafts;
})();
