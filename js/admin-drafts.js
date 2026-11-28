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
  const esc = (s) => (A().esc ? A().esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
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
    index.set(key, { ...meta, source: ok ? "cloud" : "local" });
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
        .select("collection, doc_key, title, is_new, base_updated_at, updated_at")
        .order("updated_at", { ascending: false }).limit(500);
      if (error) console.warn("[Drafts] Không đọc được danh sách nháp:", error);
      (data || []).forEach((r) => index.set(k2(r.collection, r.doc_key), { ...r, source: "cloud" }));
    }
    await flushLocal();
  }

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
          </div>
          <ul class="rusi-drafts-list">
            ${items.map((m) => {
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
