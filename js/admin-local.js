/**
 * admin-local.js — Bộ đệm cục bộ của CMS (IndexedDB "rusi_admin_cache"), tách khỏi bộ đệm học viên (rusi_offline_db).
 *
 * - Ngân hàng câu hỏi TRKI (có đáp án): chỉ lưu đệm khi tài khoản là academic_admin / super_admin (vai trò lấy từ
 *   profiles phía server lúc đăng nhập CMS). Phiên bản bộ đệm = số dòng + updated_at mới nhất trên Supabase:
 *   khớp → nạp từ máy (không tải lại 6.000+ câu), lệch → phải Kéo lại. Xoá khi đăng xuất.
 * - Nháp ngoại tuyến: bản nháp đang soạn khi chưa gửi được lên Cloud (bảng cms_drafts) — xem admin-drafts.js.
 */
(function () {
  "use strict";

  const DB_NAME = "rusi_admin_cache";
  const DB_VERSION = 1;
  const QB_KEY = "TRKI_QUESTION_BANK";
  const ADMIN_ROLES = ["academic_admin", "super_admin"];
  let dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error("Trình duyệt không hỗ trợ IndexedDB")); return; }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
        if (!db.objectStoreNames.contains("drafts")) db.createObjectStore("drafts");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("Không mở được IndexedDB"));
    });
    dbPromise.catch(() => { dbPromise = null; });
    return dbPromise;
  }

  async function tx(store, mode, fn) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const t = db.transaction(store, mode);
      const os = t.objectStore(store);
      let result;
      Promise.resolve(fn(os)).then((r) => { result = r; }).catch(reject);
      t.oncomplete = () => resolve(result);
      t.onerror = () => reject(t.error || new Error("Lỗi IndexedDB"));
      t.onabort = () => reject(t.error || new Error("IndexedDB bị huỷ"));
    });
  }
  const reqP = (r) => new Promise((resolve, reject) => { r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });

  function isAdminRole() {
    return ADMIN_ROLES.includes(String(window.__rusiAdminRole || ""));
  }

  // Phiên bản ngân hàng trên Cloud: số dòng + updated_at mới nhất (2 truy vấn nhỏ, không tải dữ liệu câu hỏi)
  async function qbCloudVersion(sb) {
    const [{ count, error: cErr }, { data, error: dErr }] = await Promise.all([
      sb.from("trki_question_bank").select("id", { count: "exact", head: true }),
      sb.from("trki_question_bank").select("updated_at").order("updated_at", { ascending: false }).limit(1)
    ]);
    if (cErr) throw cErr;
    if (dErr) throw dErr;
    return `${count || 0}|${(data && data[0] && data[0].updated_at) || ""}`;
  }

  const Cache = {
    isAllowed: isAdminRole,

    async getQB() {
      if (!isAdminRole()) return null;
      return tx("kv", "readonly", (os) => reqP(os.get(QB_KEY)));
    },

    async setQB(rows, version) {
      if (!isAdminRole() || !Array.isArray(rows)) return;
      await tx("kv", "readwrite", (os) => reqP(os.put({ rows, version, savedAt: new Date().toISOString() }, QB_KEY)));
    },

    // Mở danh sách ngân hàng: bộ đệm khớp phiên bản Cloud → trả rows; không khớp/không có → null
    async loadQBIfFresh(sb) {
      if (!isAdminRole() || !sb) return null;
      const cached = await this.getQB();
      if (!cached || !Array.isArray(cached.rows) || !cached.rows.length) return null;
      const version = await qbCloudVersion(sb);
      return version === cached.version ? cached : null;
    },

    async saveQBWithCloudVersion(sb, rows) {
      if (!isAdminRole() || !sb) return;
      const version = await qbCloudVersion(sb);
      await this.setQB(rows, version);
    },

    // Sau khi admin lưu 1 câu: thay câu đó trong bộ đệm + cập nhật phiên bản → lần sau không phải kéo lại cả ngân hàng
    async patchQB(sb, doc) {
      if (!isAdminRole() || !sb || !doc) return;
      const cached = await this.getQB();
      if (!cached || !Array.isArray(cached.rows)) return;
      const rows = cached.rows.slice();
      const idx = rows.findIndex((r) => r && (r.id === doc.id || (doc.code && r.code === doc.code)));
      const clean = {};
      Object.keys(doc).forEach((k) => { if (!k.startsWith("__") && k !== "_loaded") clean[k] = doc[k]; });
      if (doc.__cloud_updated_at) clean.__cloud_updated_at = doc.__cloud_updated_at;
      if (idx >= 0) rows[idx] = { ...rows[idx], ...clean };
      else rows.push(clean);
      await this.saveQBWithCloudVersion(sb, rows);
    },

    async removeFromQB(sb, ids) {
      if (!isAdminRole() || !sb) return;
      const cached = await this.getQB();
      if (!cached || !Array.isArray(cached.rows)) return;
      const set = new Set((ids || []).map(String));
      await this.saveQBWithCloudVersion(sb, cached.rows.filter((r) => !(set.has(String(r.id)) || set.has(String(r.code)))));
    },

    // Nháp ngoại tuyến (key: "<collection>|<doc_key>")
    async putDraft(key, value) { await tx("drafts", "readwrite", (os) => reqP(os.put(value, key))); },
    async deleteDraft(key) { await tx("drafts", "readwrite", (os) => reqP(os.delete(key))); },
    async allDrafts() {
      return tx("drafts", "readonly", (os) => new Promise((resolve, reject) => {
        const out = [];
        const cur = os.openCursor();
        cur.onsuccess = () => {
          const c = cur.result;
          if (c) { out.push({ key: c.key, value: c.value }); c.continue(); } else resolve(out);
        };
        cur.onerror = () => reject(cur.error);
      }));
    },

    // Đăng xuất: xoá bộ đệm ngân hàng (có đáp án). Nháp ngoại tuyến chưa lên Cloud được giữ lại để không mất bài.
    async clearSensitive() {
      try { await tx("kv", "readwrite", (os) => reqP(os.delete(QB_KEY))); } catch (err) { console.warn("[AdminCache] Không xoá được bộ đệm ngân hàng:", err); }
    }
  };

  window.RusiAdminCache = Cache;
})();
