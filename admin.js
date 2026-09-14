/**
 * admin.js — Trang quản trị nội dung.
 *
 * Yêu cầu đăng nhập Gmail (xem auth.js). Mọi thay đổi lưu localStorage.
 * Có nút Export ra file .js để paste vào data.js khi muốn commit.
 *
 * Dữ liệu lưu ở: localStorage["trki_admin_data"] = {
 *   VOCAB_LESSONS:   [ { ...item, __admin: true } ],
 *   GRAMMAR_LESSONS: [ ... ],
 *   LISTENING_LESSONS: [ ... ],
 *   SPEAKING_SETS:   [ ... ],
 *   WRITING_TASKS:   [ ... ],
 *   BLOG_POSTS:      [ ... ],
 * }
 *
 * Khi các trang học load, app.js gọi mergeAdminData() để gộp item admin vào
 * mảng gốc theo id (item admin ghi đè nếu trùng id).
 */

(function () {
  "use strict";

  // ====== Schema khai báo form cho từng loại ======
  // type: text | textarea | number | select | list | list-lines
  const SCHEMAS = {
    VOCAB_LESSONS: {
      label: "📚 Từ vựng",
      icon: "🎬",
      source: () => VOCAB_LESSONS,
      fields: [
        { key: "id", label: "ID (không dấu, viết liền, ví dụ: ep7, transport)", type: "text", required: true },
        { key: "type", label: "Loại", type: "select", options: [{ v: "series", l: "Series (tập)" }, { v: "topic", l: "Chủ đề" }] },
        { key: "ep", label: "Số tập (chỉ với series)", type: "number" },
        { key: "scene", label: "Emoji cảnh", type: "text" },
        { key: "ru", label: "Tiêu đề tiếng Nga", type: "text" },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text" },
        { key: "story", label: "Cốt truyện / mô tả ngắn", type: "textarea" },
        {
          key: "script", label: "Script hội thoại", type: "list",
          item: [
            { key: "ru", label: "Tiếng Nga", type: "textarea" },
            { key: "vi", label: "Tiếng Việt", type: "textarea" }
          ]
        },
        {
          key: "words", label: "Từ vựng", type: "list",
          item: [
            { key: "ru", label: "Từ tiếng Nga", type: "text" },
            { key: "vi", label: "Nghĩa tiếng Việt", type: "text" },
            { key: "note", label: "Ghi chú (giống, loại từ…)", type: "text" }
          ]
        },
        {
          key: "quiz", label: "Câu hỏi trắc nghiệm", type: "list",
          item: [
            { key: "q", label: "Câu hỏi (VI)", type: "textarea" },
            { key: "ru", label: "Câu gốc tiếng Nga (tùy chọn)", type: "textarea" },
            { key: "a0", label: "Đáp án 0 (đúng)", type: "text" },
            { key: "a1", label: "Đáp án 1", type: "text" },
            { key: "a2", label: "Đáp án 2", type: "text" },
            { key: "a3", label: "Đáp án 3", type: "text" },
            { key: "ex", label: "Giải thích (tùy chọn)", type: "textarea" }
          ]
        }
      ]
    },
    GRAMMAR_LESSONS: {
      label: "📐 Ngữ pháp",
      icon: "📐",
      source: () => GRAMMAR_LESSONS,
      fields: [
        { key: "id", label: "ID (không dấu, viết liền)", type: "text", required: true },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text" },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text" },
        { key: "topic", label: "Chủ đề liên quan", type: "text" },
        {
          key: "rules", label: "Quy tắc (mỗi dòng 1 mục)", type: "list-lines"
        },
        {
          key: "table", label: "Bảng tóm tắt", type: "group",
          fields: [
            { key: "head", label: "Tiêu đề cột (mỗi dòng 1)", type: "list-lines" },
            {
              key: "rows", label: "Các hàng (mỗi dòng = 1 hàng, các cột cách nhau bằng | )", type: "list-lines"
            }
          ]
        },
        {
          key: "questions", label: "Câu hỏi", type: "list",
          item: [
            { key: "q", label: "Câu hỏi (VI)", type: "textarea" },
            { key: "ru", label: "Câu gốc tiếng Nga (tùy chọn)", type: "textarea" },
            { key: "a0", label: "Đáp án 0 (đúng)", type: "text" },
            { key: "a1", label: "Đáp án 1", type: "text" },
            { key: "a2", label: "Đáp án 2", type: "text" },
            { key: "a3", label: "Đáp án 3", type: "text" },
            { key: "ex", label: "Giải thích (tùy chọn)", type: "textarea" }
          ]
        }
      ]
    },
    LISTENING_LESSONS: {
      label: "🎧 Nghe",
      icon: "🎧",
      source: () => LISTENING_LESSONS,
      fields: [
        { key: "id", label: "ID (không dấu, viết liền)", type: "text", required: true },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text" },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text" },
        { key: "level", label: "Trình độ (ТЭУ / ТРКИ-1…)", type: "text" },
        {
          key: "lines", label: "Các lượt hội thoại", type: "list",
          item: [
            { key: "who", label: "Người nói (Anya / Nhân viên…)", type: "text" },
            { key: "ru", label: "Tiếng Nga", type: "textarea" },
            { key: "vi", label: "Tiếng Việt", type: "textarea" }
          ]
        },
        {
          key: "blanks", label: "Điền từ vào chỗ trống", type: "list",
          item: [
            { key: "before", label: "Phần trước chỗ trống", type: "textarea" },
            { key: "blank", label: "Từ điền vào (đáp án)", type: "text" },
            { key: "after", label: "Phần sau chỗ trống", type: "textarea" },
            { key: "hint", label: "Gợi ý tiếng Việt", type: "text" }
          ]
        },
        {
          key: "dictation", label: "Câu chính tả (mỗi dòng 1 câu)", type: "list-lines"
        },
        {
          key: "questions", label: "Câu hỏi trắc nghiệm", type: "list",
          item: [
            { key: "q", label: "Câu hỏi (VI)", type: "textarea" },
            { key: "ru", label: "Câu gốc tiếng Nga (tùy chọn)", type: "textarea" },
            { key: "a0", label: "Đáp án 0 (đúng)", type: "text" },
            { key: "a1", label: "Đáp án 1", type: "text" },
            { key: "a2", label: "Đáp án 2", type: "text" },
            { key: "a3", label: "Đáp án 3", type: "text" },
            { key: "ex", label: "Giải thích (tùy chọn)", type: "textarea" }
          ]
        }
      ]
    },
    SPEAKING_SETS: {
      label: "🎙️ Nói",
      icon: "🎙️",
      source: () => SPEAKING_SETS,
      fields: [
        { key: "id", label: "ID (không dấu, viết liền)", type: "text", required: true },
        { key: "title", label: "Tên bộ câu", type: "text" },
        {
          key: "items", label: "Các câu luyện nói", type: "list",
          item: [
            { key: "ru", label: "Tiếng Nga", type: "textarea" },
            { key: "vi", label: "Tiếng Việt", type: "textarea" }
          ]
        }
      ]
    },
    WRITING_TASKS: {
      label: "✍️ Viết",
      icon: "✍️",
      source: () => WRITING_TASKS,
      fields: [
        { key: "id", label: "ID (không dấu, viết liền)", type: "text", required: true },
        { key: "level", label: "Cấp độ (ТЭУ / ТРКИ-1)", type: "text" },
        { key: "title", label: "Tên đề bài", type: "text" },
        { key: "prompt", label: "Đề bài tiếng Nga", type: "textarea" },
        { key: "vi", label: "Đề bài tiếng Việt", type: "textarea" },
        { key: "minWords", label: "Số từ tối thiểu", type: "number" },
        {
          key: "tips", label: "Mẹo làm bài (mỗi dòng 1)", type: "list-lines"
        },
        { key: "model", label: "Bài mẫu tiếng Nga", type: "textarea" }
      ]
    },
    BLOG_POSTS: {
      label: "📰 Blog",
      icon: "📰",
      source: () => BLOG_POSTS,
      fields: [
        { key: "title", label: "Tiêu đề", type: "text", required: true },
        { key: "tag", label: "Tag (Lộ trình / Mẹo / Kinh nghiệm…)", type: "text" },
        { key: "date", label: "Ngày (Tháng X, 2026)", type: "text" },
        { key: "icon", label: "Icon emoji", type: "text" },
        { key: "excerpt", label: "Tóm tắt ngắn", type: "textarea" }
      ]
    }
  };

  // ====== Lưu trữ ======
  const STORE_KEY = "trki_admin_data";
  const TYPE_KEYS = Object.keys(SCHEMAS);

  function loadAdminStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function saveAdminStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }
  function getAdminList(type) {
    return loadAdminStore()[type] || [];
  }
  function setAdminList(type, arr) {
    const store = loadAdminStore();
    store[type] = arr;
    saveAdminStore(store);
  }

  /**
   * Trả về mảng đã gộp: gốc + admin (admin ghi đè theo id).
   */
  function getMergedList(type) {
    const original = SCHEMAS[type].source() || [];
    const admin = getAdminList(type);
    const map = new Map();
    original.forEach((it) => map.set(it.id || it.title, { ...it, __source: "original" }));
    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      map.set(it.id || it.title, { ...clone, __source: "admin" });
    });
    return Array.from(map.values());
  }

  // ====== Trạng thái admin ======
  let currentType = TYPE_KEYS[0];
  let editingItem = null;   // item đang sửa (kèm __admin: true nếu là admin)
  let isCreating = false;   // true nếu đang tạo mới

  // ====== Khởi tạo giao diện ======
  function init() {
    // Đợi Auth sẵn sàng
    if (!window.Auth) {
      setTimeout(init, 100);
      return;
    }
    window.Auth.isReady().then(() => {
      applyAuthState(!!window.Auth.user);
      window.Auth.onChange((u) => applyAuthState(!!u));
    });

    // Nút đăng nhập ở gate
    const loginBtn = document.getElementById("adminLoginBtn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => window.Auth.signInWithGoogle());
    }

    // Nút toolbar
    document.getElementById("btnAdd").addEventListener("click", () => openForm(currentType, null, true));
    document.getElementById("btnExport").addEventListener("click", exportData);
    document.getElementById("btnImport").addEventListener("click", () => document.getElementById("importFile").click());
    document.getElementById("importFile").addEventListener("change", onImportFile);
    document.getElementById("btnReset").addEventListener("click", resetAdmin);

    // Modal
    document.getElementById("modalClose").addEventListener("click", closeForm);
    document.getElementById("modalCancel").addEventListener("click", closeForm);
    document.getElementById("modalSave").addEventListener("click", saveForm);
    document.getElementById("modalBack").addEventListener("click", (e) => {
      if (e.target === document.getElementById("modalBack")) closeForm();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("modalBack").classList.contains("open")) closeForm();
    });
  }

  function applyAuthState(loggedIn) {
    const user = window.Auth && window.Auth.user;
    const isAdmin = loggedIn && checkIsAdmin(user);

    document.getElementById("loginGate").style.display = loggedIn ? "none" : "block";

    const denied = document.getElementById("deniedGate");
    const admin = document.getElementById("adminArea");
    if (denied) denied.style.display = (loggedIn && !isAdmin) ? "block" : "none";
    admin.style.display = isAdmin ? "block" : "none";

    if (isAdmin) {
      renderTabs();
      renderList();
      renderStats();
    } else if (loggedIn) {
      const info = document.getElementById("deniedInfo");
      if (info) info.textContent = `Đang đăng nhập: ${user.email}`;
    }
  }

  /**
   * Kiểm tra user hiện tại có trong ADMIN_EMAILS không.
   * So sánh lowercase, bỏ qua khoảng trắng. Cho phép gọi nhiều lần an toàn.
   */
  function checkIsAdmin(user) {
    if (!user || !user.email) return false;
    const list = Array.isArray(window.ADMIN_EMAILS) ? window.ADMIN_EMAILS : [];
    if (list.length === 0) return false; // danh sách rỗng = chặn hết
    const email = String(user.email).trim().toLowerCase();
    return list.some((e) => String(e).trim().toLowerCase() === email);
  }

  function renderTabs() {
    const host = document.getElementById("adminTabs");
    host.innerHTML = TYPE_KEYS.map((k) => {
      const schema = SCHEMAS[k];
      const cnt = getMergedList(k).length;
      const adminCnt = getAdminList(k).length;
      return `<button class="admin-tab ${k === currentType ? "active" : ""}" data-type="${k}">
        ${schema.label}
        <span style="opacity:.6;font-weight:400">(${cnt}${adminCnt ? ` <span style="color:var(--violet)">+${adminCnt}</span>` : ""})</span>
      </button>`;
    }).join("");
    host.querySelectorAll(".admin-tab").forEach((b) => {
      b.addEventListener("click", () => {
        currentType = b.dataset.type;
        renderTabs();
        renderList();
      });
    });
  }

  function renderStats() {
    const host = document.getElementById("adminStats");
    const store = loadAdminStore();
    const totals = TYPE_KEYS.map((k) => `${SCHEMAS[k].icon} ${getMergedList(k).length}`).join(" · ");
    const adminTotal = Object.values(store).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);
    host.innerHTML = `
      <span>Tổng: <b>${totals}</b></span>
      <span>Admin đã thêm: <b style="color:var(--violet)">${adminTotal}</b> mục</span>
      <span>Lưu tại: <code>localStorage["${STORE_KEY}"]</code></span>
    `;
  }

  function renderList() {
    const host = document.getElementById("adminList");
    const list = getMergedList(currentType);
    const adminIds = new Set(getAdminList(currentType).map((it) => it.id || it.title));
    if (list.length === 0) {
      host.innerHTML = `<div class="admin-empty">Chưa có mục nào. Bấm <b>➕ Thêm mới</b> để tạo.</div>`;
      return;
    }
    host.innerHTML = list.map((it) => {
      const isAdmin = adminIds.has(it.id || it.title);
      const title = it.title || it.vi || it.ru || it.id || "(không tiêu đề)";
      const sub = it.vi && it.ru ? `${esc(it.ru)} · ${esc(it.vi)}` : (it.ru || it.vi || it.excerpt || "");
      const counts = [];
      if (Array.isArray(it.words)) counts.push(`${it.words.length} từ`);
      if (Array.isArray(it.script)) counts.push(`${it.script.length} câu`);
      if (Array.isArray(it.quiz)) counts.push(`${it.quiz.length} câu hỏi`);
      if (Array.isArray(it.questions)) counts.push(`${it.questions.length} câu hỏi`);
      if (Array.isArray(it.lines)) counts.push(`${it.lines.length} lượt`);
      if (Array.isArray(it.items)) counts.push(`${it.items.length} câu`);
      if (Array.isArray(it.rules)) counts.push(`${it.rules.length} quy tắc`);
      if (Array.isArray(it.tips)) counts.push(`${it.tips.length} mẹo`);
      return `
        <div class="admin-item">
          <div class="admin-item-meta">
            <div class="admin-item-title">
              ${esc(title)}
              <span class="admin-item-badge ${isAdmin ? "" : "original"}">${isAdmin ? "ADMIN" : "GỐC"}</span>
            </div>
            <div class="admin-item-sub">${esc(sub)}${counts.length ? " · " + counts.join(" · ") : ""}</div>
          </div>
          <button class="btn btn-soft btn-sm" data-act="edit" data-id="${esc(it.id || it.title)}">Sửa</button>
          <button class="btn btn-sm" style="background:var(--red-soft);color:var(--red)" data-act="del" data-id="${esc(it.id || it.title)}">Xoá</button>
        </div>`;
    }).join("");
    host.querySelectorAll("[data-act='edit']").forEach((b) =>
      b.addEventListener("click", () => openForm(currentType, b.dataset.id, false))
    );
    host.querySelectorAll("[data-act='del']").forEach((b) =>
      b.addEventListener("click", () => deleteItem(b.dataset.id))
    );
  }

  // ====== Form ======
  function openForm(type, idOrTitle, isNew) {
    const schema = SCHEMAS[type];
    editingItem = null;
    isCreating = isNew;
    document.getElementById("modalTitle").textContent = isNew ? `➕ Thêm mới — ${schema.label}` : `✏️ Sửa — ${schema.label}`;

    let initial = {};
    if (!isNew) {
      const merged = getMergedList(type);
      initial = merged.find((it) => (it.id || it.title) === idOrTitle) || {};
      const adminList = getAdminList(type);
      const inAdmin = adminList.find((it) => (it.id || it.title) === idOrTitle);
      if (inAdmin) editingItem = { ...inAdmin };
      else editingItem = { ...initial, __adminNew: true };
    } else {
      if (schema.fields.find((f) => f.key === "type")) initial.type = "topic";
    }

    document.getElementById("modalBody").innerHTML = renderForm(schema.fields, initial);
    document.getElementById("modalBack").classList.add("open");
    wireFormAdds();
  }

  function closeForm() {
    document.getElementById("modalBack").classList.remove("open");
    editingItem = null;
  }

  /**
   * Render form theo schema. Hỗ trợ các kiểu:
   *   text / textarea / number / select / list / list-lines / group
   */
  function renderForm(fields, data) {
    return fields.map((f) => {
      const val = data[f.key];
      const labelHtml = `<label class="form-label">${esc(f.label)}${f.required ? ' <span style="color:var(--red)">*</span>' : ""}</label>`;
      if (f.type === "text") return `<div class="form-row"><div>${labelHtml}<input class="form-input" data-key="${f.key}" value="${escAttr(val || "")}" /></div></div>`;
      if (f.type === "textarea") return `<div class="form-row"><div>${labelHtml}<textarea class="form-textarea" data-key="${f.key}">${esc(val || "")}</textarea></div></div>`;
      if (f.type === "number") return `<div class="form-row"><div>${labelHtml}<input type="number" class="form-input" data-key="${f.key}" value="${escAttr(val ?? "")}" /></div></div>`;
      if (f.type === "select") {
        const opts = (f.options || []).map((o) => {
          const v = typeof o === "string" ? o : o.v;
          const l = typeof o === "string" ? o : o.l;
          return `<option value="${escAttr(v)}" ${String(val) === String(v) ? "selected" : ""}>${esc(l)}</option>`;
        }).join("");
        return `<div class="form-row"><div>${labelHtml}<select class="form-select" data-key="${f.key}">${opts}</select></div></div>`;
      }
      if (f.type === "list-lines") {
        // Mỗi mục có thể là chuỗi (rules/tips/dictation) hoặc MẢNG cell (table.rows) —
        // mảng cell được nối bằng " | " để khớp với cách đọc lại khi lưu.
        const arr = Array.isArray(val)
          ? val.map((v) => (Array.isArray(v) ? v.join(" | ") : v))
          : (val ? String(val).split("\n") : []);
        return `<div class="form-section">
          <h4>${esc(f.label)} <button class="btn btn-soft btn-sm" type="button" data-add="lines" data-key="${f.key}">+ Thêm dòng</button></h4>
          <div data-list="${f.key}" data-mode="lines">
            ${arr.map((line) => lineRow(f.key, line)).join("")}
          </div>
          <p class="form-help">Mỗi dòng = 1 mục trong mảng.</p>
        </div>`;
      }
      if (f.type === "list") {
        const arr = Array.isArray(val) ? val : [];
        // Chuẩn hoá quiz options: a0..a3 thành mảng options + index a
        const normalized = arr.map((it) => normalizeQuizLike(it));
        return `<div class="form-section">
          <h4>${esc(f.label)} <button class="btn btn-soft btn-sm" type="button" data-add="list" data-key="${f.key}">+ Thêm mục</button></h4>
          <div data-list="${f.key}" data-mode="list">
            ${normalized.map((it, i) => itemRow(f.key, i, f.item, it)).join("")}
          </div>
        </div>`;
      }
      if (f.type === "group") {
        return `<div class="form-section">
          <h4>${esc(f.label)}</h4>
          ${renderForm(f.fields, val || {})}
        </div>`;
      }
      return "";
    }).join("");
  }

  function lineRow(key, val) {
    return `<div class="form-list-item">
      <textarea class="form-textarea" data-line>${esc(val || "")}</textarea>
      <button class="form-remove" type="button" data-remove>×</button>
    </div>`;
  }

  function itemRow(key, idx, schema, data) {
    const inner = schema.map((sf) => {
      const v = data[sf.key];
      const lbl = `<label class="form-label" style="margin-top:6px">${esc(sf.label)}</label>`;
      if (sf.type === "textarea") return `${lbl}<textarea class="form-textarea" data-item-key="${sf.key}">${esc(v || "")}</textarea>`;
      return `${lbl}<input class="form-input" data-item-key="${sf.key}" value="${escAttr(v || "")}" />`;
    }).join("");
    return `<div class="form-section" data-item>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <b style="font-size:.82rem">#${idx + 1}</b>
        <button class="form-remove" type="button" data-remove>×</button>
      </div>
      ${inner}
    </div>`;
  }

  function wireFormAdds() {
    // Nút "+ Thêm dòng" / "+ Thêm mục"
    document.querySelectorAll("[data-add]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.dataset.key;
        const mode = b.dataset.add;
        const list = document.querySelector(`[data-list="${key}"]`);
        if (!list) return;
        if (mode === "lines") {
          list.insertAdjacentHTML("beforeend", lineRow(key, ""));
        } else {
          // Tìm schema của trường để biết item con
          const schema = findSchema(currentType, key);
          if (schema && schema.item) {
            list.insertAdjacentHTML("beforeend", itemRow(key, list.children.length, schema.item, {}));
          }
        }
      });
    });
    // Nút xoá từng dòng (event delegation) — chỉ gắn MỘT lần trên modalBody
    // (modalBody không bị thay thế nên gắn mỗi openForm sẽ tích tụ listener)
    if (!wireFormAdds._delegated) {
      wireFormAdds._delegated = true;
      document.getElementById("modalBody").addEventListener("click", (e) => {
        const rm = e.target.closest("[data-remove]");
        if (rm) {
          const block = rm.closest("[data-item], .form-list-item");
          if (block) block.remove();
        }
      });
    }
  }

  function findSchema(type, key) {
    function walk(fields) {
      for (const f of fields) {
        if (f.key === key) return f;
        if (f.fields) {
          const r = walk(f.fields);
          if (r) return r;
        }
      }
      return null;
    }
    return walk(SCHEMAS[type].fields);
  }

  /**
   * Đọc dữ liệu từ form thành object. Với quiz/question, options a0..a3 thành mảng options + a.
   */
  function readForm(type) {
    const out = {};
    const body = document.getElementById("modalBody");
    body.querySelectorAll("[data-key]").forEach((el) => {
      out[el.dataset.key] = el.value.trim();
    });
    // List lines
    body.querySelectorAll("[data-list][data-mode='lines']").forEach((el) => {
      const arr = [];
      el.querySelectorAll("[data-line]").forEach((tx) => {
        const v = tx.value.trim();
        if (v) arr.push(v);
      });
      out[el.dataset.list] = arr;
    });
    // List items (kể cả quiz)
    body.querySelectorAll("[data-list][data-mode='list']").forEach((el) => {
      const key = el.dataset.list;
      const arr = [];
      el.querySelectorAll("[data-item]").forEach((row) => {
        const obj = {};
        row.querySelectorAll("[data-item-key]").forEach((inp) => {
          obj[inp.dataset.itemKey] = inp.value.trim();
        });
        if (Object.keys(obj).length) {
          const norm = denormalizeQuizLike(obj);
          if (norm) arr.push(norm);
        }
      });
      out[key] = arr;
    });
    // Sửa riêng table.group: head + rows là các list-lines lồng trong group,
    // không được đọc qua [data-key] — gom về out.table và xoá key rác top-level.
    const tableHeadEl = body.querySelector('[data-list="head"][data-mode="lines"]');
    const tableRowsEl = body.querySelector('[data-list="rows"][data-mode="lines"]');
    if (tableHeadEl || tableRowsEl) {
      const head = tableHeadEl ? Array.from(tableHeadEl.querySelectorAll("[data-line]")).map((tx) => tx.value.trim()).filter(Boolean) : [];
      const rowsRaw = tableRowsEl ? Array.from(tableRowsEl.querySelectorAll("[data-line]")).map((tx) => tx.value.trim()).filter(Boolean) : [];
      const rows = rowsRaw.map((line) => line.split("|").map((s) => s.trim()));
      out.table = { head, rows };
      delete out.head;
      delete out.rows;
    }

    // Ép kiểu số cho ep, minWords
    ["ep", "minWords"].forEach((k) => {
      if (out[k] !== undefined && out[k] !== "") out[k] = Number(out[k]);
    });

    return out;
  }

  /**
   * Dữ liệu gốc { q, ru, options: [...], a, ex } → dạng form { q, ru, a0..a3, ex }.
   * Xoay mảng options để đáp án đúng (options[a]) luôn nằm ở a0 — vì form admin
   * cố định "a0 = đáp án đúng". Khi lưu sẽ rotate lại thành a: 0.
   */
  function normalizeQuizLike(obj) {
    const out = { ...obj };
    const opts = Array.isArray(out.options) ? out.options.map((x) => (x == null ? "" : String(x))) : null;
    const aRaw = Math.round(+out.a || 0) || 0;
    delete out.options;
    delete out.a;
    if (opts && opts.length >= 2) {
      const a = Math.min(Math.max(aRaw, 0), opts.length - 1);
      const rotated = opts.slice(a).concat(opts.slice(0, a));
      while (rotated.length < 4) rotated.push("");
      out.a0 = rotated[0] || "";
      out.a1 = rotated[1] || "";
      out.a2 = rotated[2] || "";
      out.a3 = rotated[3] || "";
    }
    return out;
  }
  /** Ngược lại: { q, ru, a0..a3, ex } → { q, ru, options: [không rỗng], a: 0, ex }.
   *  Trả về null nếu câu hỏi không đủ 2 đáp án (bỏ qua khi lưu). */
  function denormalizeQuizLike(obj) {
    const out = { ...obj };
    const has = "a0" in out || "a1" in out || "a2" in out || "a3" in out;
    if (!has) return out;
    const opts = [out.a0, out.a1, out.a2, out.a3].map((x) => String(x || "").trim()).filter(Boolean);
    delete out.a0; delete out.a1; delete out.a2; delete out.a3;
    if (opts.length < 2) return null; // câu hỏi hỏng — không lưu
    out.options = opts;
    out.a = 0; // a0 luôn là đáp án đúng trong form admin
    return out;
  }

  function saveForm() {
    const data = readForm(currentType);
    // Validate id required
    const idField = SCHEMAS[currentType].fields.find((f) => f.key === "id" || f.key === "title");
    if (idField && idField.required && !data[idField.key]) {
      toast(`${idField.label} là bắt buộc.`);
      return;
    }
    const adminList = getAdminList(currentType);
    if (isCreating) {
      // Tránh trùng id
      const idKey = data.id || data.title;
      const exists = getMergedList(currentType).some((it) => (it.id || it.title) === idKey);
      if (exists) {
        toast(`ID "${idKey}" đã tồn tại — chọn ID khác.`);
        return;
      }
      adminList.push({ ...data, __admin: true });
    } else {
      const newKey = data.id || data.title;
      const oldKey = (editingItem && (editingItem.id || editingItem.title)) || newKey;
      // Đổi ID của mục GỐC (data.js) sẽ tạo bản sao trùng vì không xoá được mục gốc
      if (editingItem && editingItem.__adminNew && oldKey !== newKey) {
        toast("Không thể đổi ID của mục gốc (data.js) — chỉ sửa được nội dung.");
        return;
      }
      const idx = adminList.findIndex((it) => (it.id || it.title) === oldKey);
      // Merge trên item gốc đang sửa: giữ lại các trường không có trong form
      // (vd: blanks/dictation của listening, model của writing) khỏi bị mất.
      const item = { ...(editingItem || {}), ...data, __admin: true };
      delete item.__adminNew;
      delete item.__source;
      if (idx >= 0) adminList[idx] = item;
      else adminList.push(item);
    }
    setAdminList(currentType, adminList);
    closeForm();
    renderTabs();
    renderList();
    renderStats();
    toast(isCreating ? "Đã thêm!" : "Đã lưu!");
    // Báo cho app.js merge ngay
    if (typeof window.mergeAdminData === "function") window.mergeAdminData();
  }

  function deleteItem(idOrTitle) {
    const adminList = getAdminList(currentType);
    const idx = adminList.findIndex((it) => (it.id || it.title) === idOrTitle);
    if (idx === -1) {
      toast("Mục này thuộc data.js gốc — chỉ xoá được mục do admin thêm.");
      return;
    }
    if (!confirm(`Xoá "${idOrTitle}" khỏi admin? (Mục gốc trong data.js không bị ảnh hưởng)`)) return;
    adminList.splice(idx, 1);
    setAdminList(currentType, adminList);
    renderTabs();
    renderList();
    renderStats();
    toast("Đã xoá.");
    if (typeof window.mergeAdminData === "function") window.mergeAdminData();
  }

  // ====== Export / Import ======
  function exportData() {
    // Trả về file .js chứa tất cả mảng đã gộp, để paste thẳng vào data.js
    const payload = {};
    TYPE_KEYS.forEach((k) => {
      payload[k] = getMergedList(k).map(stripSource);
    });
    const body = TYPE_KEYS.map((k) => `const ${k} = ${JSON.stringify(payload[k], null, 2)};`).join("\n\n");
    const today = new Date().toISOString().slice(0, 10);
    const content = `// Auto-generated by admin.html on ${today}\n// Ghi đè lên data.js (hoặc merge thủ công nếu muốn giữ data gốc).\n\n${body}\n`;
    downloadFile(`data-export-${today}.js`, content, "application/javascript");
    toast("Đã export. Mở file rồi copy nội dung vào data.js.");
  }

  function stripSource(it) {
    const out = { ...it };
    delete out.__source;
    return out;
  }

  function downloadFile(name, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function onImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        let text = String(reader.result).trim();
        let obj;
        if (/^[\[{]/.test(text.replace(/^\s*\/\/.*$/gm, "").trim())) {
          // File .json (hoặc JSON thuần) — bỏ dòng chú thích rồi parse
          obj = JSON.parse(text.replace(/^\s*\/\/.*$/gm, ""));
        } else {
          // File .js do export tạo ra: `const NAME = [...];` — chạy trong sandbox
          // function scope và lấy đúng các mảng thuộc TYPE_KEYS. Không dùng eval
          // trên toàn cục để tránh ghi đè biến toàn cục.
          const fn = new Function(
            text + `\n;return { ${TYPE_KEYS.join(", ")} };`
          );
          obj = fn();
        }
        importToStore(obj);
      } catch (err) {
        console.error(err);
        toast("File không hợp lệ: " + err.message);
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  }

  function importToStore(obj) {
    if (!obj || typeof obj !== "object") {
      toast("File không chứa dữ liệu hợp lệ.");
      return;
    }
    const store = loadAdminStore();
    let count = 0;
    TYPE_KEYS.forEach((k) => {
      if (Array.isArray(obj[k])) {
        // Bỏ các mục đã có trong data.js gốc (theo id/title)
        const origIds = new Set((SCHEMAS[k].source() || []).map((it) => it.id || it.title));
        const adminIds = new Set((store[k] || []).map((it) => it.id || it.title));
        obj[k].forEach((it) => {
          const idKey = it.id || it.title;
          if (!idKey) return;
          if (origIds.has(idKey) || adminIds.has(idKey)) return;
          store[k] = store[k] || [];
          store[k].push({ ...it, __admin: true });
          count++;
        });
      }
    });
    saveAdminStore(store);
    renderTabs();
    renderList();
    renderStats();
    toast(`Đã import ${count} mục mới.`);
    if (typeof window.mergeAdminData === "function") window.mergeAdminData();
  }

  function resetAdmin() {
    if (!confirm("Xoá TOÀN BỘ dữ liệu admin đã thêm? (data.js gốc không bị ảnh hưởng)")) return;
    localStorage.removeItem(STORE_KEY);
    renderTabs();
    renderList();
    renderStats();
    toast("Đã xoá sạch dữ liệu admin.");
    if (typeof window.mergeAdminData === "function") window.mergeAdminData();
  }

  // ====== Helpers ======
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function escAttr(s) {
    return esc(s);
  }

  // ====== Khởi động ======
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
