/**
 * admin.js — Hệ thống Quản trị Nội dung Toàn diện (CMS) cho RUSI TRKI.
 *
 * Hỗ trợ quản lý 9 bộ dữ liệu cốt lõi:
 *   1. TRKI_BANK        : Ngân hàng đề thi TRKI A1, A2, B1, B2 chuẩn 
 *   2. VOCAB_JARS       : Các lọ từ vựng chủ đề & mẩu giấy từ
 *   3. SHOP_PRODUCTS    : Sản phẩm shop nội địa Nga & dịch vụ Du học Nga
 *   4. PACKAGES         : Bảng gói cước nâng cấp tài khoản PRO
 *   5. BLOG_POSTS       : Cẩm nang du học, KTX, học bổng Du học Nga & kinh nghiệm
 *   6. LISTENING_LESSONS: 4 Part luyện nghe chuẩn CEFR
 *   7. SPEAKING_SETS    : Bộ câu luyện nói phản xạ & Shadowing
 *   8. WRITING_TASKS    : Đề bài luyện viết Письмо theo chuẩn TRKI
 *   9. VOCAB_LESSONS    : Series video hoạt hình «Хочу в Россию»
 *
 * Cơ chế đồng bộ dữ liệu:
 *   - Lưu trữ tại: localStorage["trki_admin_data"]
 *   - Gọi mergeAdminData() lập tức đột biến mảng runtime in-place (target.splice)
 *   - Phát sự kiện "trki:data-updated" và đồng bộ qua "storage" event giữa các tab
 *   - Có nút "Xem trên web" và "Đẩy dữ liệu về web" để kiểm tra trực tiếp
 */

(function () {
  "use strict";

  // Mẫu cấu trúc 3 Part cho đề thi TRKI khi tạo đề mới
  const SAMPLE_TRKI_PARTS = [
    {
      id: "gram",
      name: "Часть 1. Лексика и грамматика",
      vi: "Phần 1. Từ vựng và ngữ pháp",
      questions: [
        {
          q: "Мы познакомились с новым ___. (преподаватель)",
          options: ["преподавателем", "преподавателя", "преподавателю", "преподаватель"],
          a: 0,
          ex: "с + cách 5 (danh từ đực mềm -ель -> -елем)."
        },
        {
          q: "Антон звонит своей ___. (сестра)",
          options: ["сестре", "сестру", "сестрой", "сестра"],
          a: 0,
          ex: "звонить + cách 3 (сестра -> сестре)."
        }
      ]
    },
    {
      id: "reading",
      name: "Часть 2. Чтение",
      vi: "Phần 2. Đọc hiểu",
      text: {
        ru: "Москва — столица Российской Федерации. Это крупнейший культурный и научный центр страны. В Москве учится много иностранных студентов.",
        vi: "Moskva là thủ đô của Liên bang Nga. Đây là trung tâm văn hóa và khoa học lớn nhất cả nước. Rất nhiều sinh viên quốc tế học tập tại Moskva."
      },
      questions: [
        {
          q: "Какой город является столицей России?",
          options: ["Москва", "Санкт-Петербург", "Казань", "Новосибирск"],
          a: 0,
          ex: "'Москва — столица Российской Федерации.'"
        }
      ]
    },
    {
      id: "listening",
      name: "Часть 3. Аудирование",
      vi: "Phần 3. Nghe hiểu",
      lines: [
        { who: "Анна", ru: "Привет! Куда ты идёшь?", vi: "Chào cậu! Cậu đang đi đâu thế?" },
        { who: "Максим", ru: "Я иду в библиотеку готовиться к экзамену.", vi: "Mình đang đến thư viện ôn thi." }
      ],
      questions: [
        {
          q: "Куда идёт Максим?",
          options: ["В библиотеку", "В общежитие", "В столовую", "В кино"],
          a: 0,
          ex: "'Я иду в библиотеку...'"
        }
      ]
    }
  ];

  // ====== Schemas khai báo cho 9 phân hệ ======
  const SCHEMAS = {
    TRKI_BANK: {
      label: "🎓 Đề thi TRKI",
      icon: "🎓",
      webUrl: "mock-test.html",
      source: () => (window.TRKI_BANK || []),
      fields: [
        { key: "id", label: "Mã đề thi (ID duy nhất, ví dụ: trki_a1, trki_b1_de1)", type: "text", required: true },
        { key: "level", label: "Cấp độ chuẩn (ví dụ: A1 (ТЭУ), A2 (ТБУ), B1 (ТРКИ-1), B2 (ТРКИ-2))", type: "text", required: true },
        { key: "levelName", label: "Tên cấp độ hiển thị (ví dụ: Trình độ sơ cấp A1)", type: "text" },
        { key: "title", label: "Tiêu đề đề thi", type: "text", required: true },
        { key: "durationMin", label: "Thời gian làm bài (phút)", type: "number" },
        { key: "passPercent", label: "Điểm chuẩn đạt (%)", type: "number" },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ]
        },
        {
          key: "parts",
          label: "Cấu trúc đề thi (3 Part: Ngữ pháp, Đọc hiểu, Nghe hiểu kèm câu hỏi & giải thích)",
          type: "json",
          sample: SAMPLE_TRKI_PARTS
        }
      ]
    },
    VOCAB_JARS: {
      label: "🏺 Lọ từ vựng",
      icon: "🏺",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_JARS || []),
      fields: [
        { key: "id", label: "Mã lọ (ID, ví dụ: jar_auchan, jar_chemodan)", type: "text", required: true },
        { key: "icon", label: "Icon Emoji (ví dụ: 🛒, 🧳, 🏢, ⚽)", type: "text" },
        { key: "name", label: "Tên lọ từ vựng", type: "text", required: true },
        { key: "desc", label: "Mô tả mục đích & ngữ cảnh sử dụng", type: "textarea" },
        {
          key: "words",
          label: "Danh sách mẩu giấy từ vựng trong lọ",
          type: "list",
          item: [
            { key: "ru", label: "Từ tiếng Nga", type: "text" },
            { key: "vi", label: "Nghĩa tiếng Việt", type: "text" },
            { key: "note", label: "Ghi chú (giống, ngữ cảnh)", type: "text" }
          ]
        }
      ]
    },
    SHOP_PRODUCTS: {
      label: "🛍️ Shop sản phẩm",
      icon: "🛍️",
      webUrl: "shop.html",
      source: () => (window.SHOP_PRODUCTS || []),
      fields: [
        { key: "id", label: "Mã sản phẩm (ví dụ: alenka-100g, mishka-candy)", type: "text", required: true },
        {
          key: "category",
          label: "Ngành hàng",
          type: "select",
          options: [
            { v: "banh_keo", l: "🍬 Bánh kẹo Nga" },
            { v: "my_pham", l: "🌿 Mỹ phẩm Siberia" },
            { v: "luu_niem", l: "🪆 Quà lưu niệm Nga" },
            { v: "dich_vu_du_hoc", l: "🎓 Dịch vụ Du học Nga" }
          ]
        },
        { key: "categoryName", label: "Tên ngành hàng hiển thị", type: "text" },
        { key: "title", label: "Tên sản phẩm / dịch vụ", type: "text", required: true },
        { key: "desc", label: "Mô tả sản phẩm", type: "textarea" },
        { key: "price", label: "Giá bán (VNĐ)", type: "number", required: true },
        { key: "image", label: "URL ảnh sản phẩm", type: "text" },
        { key: "badge", label: "Huy hiệu (Bán chạy / Mới / Hot / Thủ công)", type: "text" }
      ]
    },
    PACKAGES: {
      label: "💎 Gói cước PRO",
      icon: "💎",
      webUrl: "index.html#pricing",
      source: () => (window.PACKAGES || []),
      fields: [
        { key: "id", label: "Mã gói cước (ví dụ: pro_6m, pro_1y, pro_vip)", type: "text", required: true },
        { key: "badge", label: "Huy hiệu thời hạn (ví dụ: 6 THÁNG, 1 NĂM, TRỌN ĐỜI)", type: "text" },
        { key: "title", label: "Tên gói cước", type: "text", required: true },
        { key: "desc", label: "Mô tả mục tiêu học tập", type: "textarea" },
        { key: "price", label: "Giá ưu đãi (VNĐ)", type: "number", required: true },
        { key: "priceOld", label: "Giá gốc niêm yết (VNĐ)", type: "number" },
        {
          key: "popular",
          label: "Đánh dấu Phổ biến nhất",
          type: "select",
          options: [
            { v: "false", l: "Gói tiêu chuẩn" },
            { v: "true", l: "⭐ Gói phổ biến nhất (Nổi bật)" }
          ]
        },
        { key: "features", label: "Danh sách tính năng quyền lợi (mỗi dòng 1 tính năng)", type: "list-lines" }
      ]
    },
    BLOG_POSTS: {
      label: "📰 Cẩm nang Blog",
      icon: "📰",
      webUrl: "blog.html",
      source: () => (window.BLOG_POSTS || []),
      fields: [
        { key: "title", label: "Tiêu đề bài viết", type: "text", required: true },
        { key: "tag", label: "Chuyên mục (Lộ trình / KTX / Học bổng Du học Nga / Đời sống)", type: "text" },
        { key: "date", label: "Thời gian đăng (ví dụ: Tháng 10, 2026)", type: "text" },
        { key: "icon", label: "Emoji đại diện bài viết", type: "text" },
        { key: "excerpt", label: "Tóm tắt ngắn hiển thị ngoài danh sách", type: "textarea" },
        { key: "content", label: "Nội dung bài viết chi tiết", type: "textarea" }
      ]
    },
    LISTENING_LESSONS: {
      label: "🎧 Luyện nghe",
      icon: "🎧",
      webUrl: "listening.html",
      source: () => (window.LISTENING_LESSONS || []),
      fields: [
        { key: "id", label: "ID bài nghe (ví dụ: l1, l2)", type: "text", required: true },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text" },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text" },
        { key: "level", label: "Trình độ (ТЭУ / ТРКИ-1…)", type: "text" },
        {
          key: "lines",
          label: "Các lượt hội thoại",
          type: "list",
          item: [
            { key: "who", label: "Người nói", type: "text" },
            { key: "ru", label: "Tiếng Nga", type: "textarea" },
            { key: "vi", label: "Tiếng Việt", type: "textarea" }
          ]
        },
        {
          key: "questions",
          label: "Câu hỏi trắc nghiệm nghe hiểu",
          type: "list",
          item: [
            { key: "q", label: "Câu hỏi (VI)", type: "textarea" },
            { key: "a0", label: "Đáp án đúng (A0)", type: "text" },
            { key: "a1", label: "Đáp án sai 1", type: "text" },
            { key: "a2", label: "Đáp án sai 2", type: "text" },
            { key: "a3", label: "Đáp án sai 3", type: "text" },
            { key: "ex", label: "Giải thích", type: "textarea" }
          ]
        }
      ]
    },
    SPEAKING_SETS: {
      label: "🎙️ Luyện nói",
      icon: "🎙️",
      webUrl: "speaking.html",
      source: () => (window.SPEAKING_SETS || []),
      fields: [
        { key: "id", label: "ID bộ luyện nói (ví dụ: spk1, greeting)", type: "text", required: true },
        { key: "title", label: "Tên chủ đề luyện nói", type: "text" },
        {
          key: "items",
          label: "Các câu luyện nói",
          type: "list",
          item: [
            { key: "ru", label: "Tiếng Nga", type: "textarea" },
            { key: "vi", label: "Tiếng Việt", type: "textarea" }
          ]
        }
      ]
    },
    WRITING_TASKS: {
      label: "✍️ Luyện viết",
      icon: "✍️",
      webUrl: "writing.html",
      source: () => (window.WRITING_TASKS || []),
      fields: [
        { key: "id", label: "ID đề bài viết", type: "text", required: true },
        { key: "level", label: "Cấp độ (ТЭУ / ТРКИ-1)", type: "text" },
        { key: "title", label: "Tên đề bài", type: "text" },
        { key: "prompt", label: "Đề bài tiếng Nga", type: "textarea" },
        { key: "vi", label: "Đề bài tiếng Việt", type: "textarea" },
        { key: "minWords", label: "Số từ tối thiểu", type: "number" },
        { key: "tips", label: "Mẹo làm bài (mỗi dòng 1 mẹo)", type: "list-lines" },
        { key: "model", label: "Bài viết mẫu tham khảo", type: "textarea" }
      ]
    },
    VOCAB_LESSONS: {
      label: "🎬 Series từ vựng",
      icon: "🎬",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_LESSONS || []),
      fields: [
        { key: "id", label: "ID bài học (ví dụ: ep1, transport)", type: "text", required: true },
        { key: "type", label: "Loại bài", type: "select", options: [{ v: "series", l: "Series (tập)" }, { v: "topic", l: "Chủ đề" }] },
        { key: "ep", label: "Số tập (chỉ với series)", type: "number" },
        { key: "scene", label: "Emoji cảnh", type: "text" },
        { key: "ru", label: "Tiêu đề tiếng Nga", type: "text" },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text" },
        { key: "story", label: "Cốt truyện / bối cảnh", type: "textarea" },
        {
          key: "words",
          label: "Từ vựng trọng tâm",
          type: "list",
          item: [
            { key: "ru", label: "Từ tiếng Nga", type: "text" },
            { key: "vi", label: "Nghĩa tiếng Việt", type: "text" },
            { key: "note", label: "Ghi chú", type: "text" }
          ]
        }
      ]
    }
  };

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
    const store = loadAdminStore();
    return Array.isArray(store[type]) ? store[type] : [];
  }

  function setAdminList(type, arr) {
    const store = loadAdminStore();
    store[type] = arr;
    saveAdminStore(store);
  }

  /**
   * Trả về mảng đã gộp: gốc + admin (admin ghi đè theo id/title, trừ đi các mục đã xoá).
   */
  function getMergedList(type) {
    const original = (SCHEMAS[type] && SCHEMAS[type].source()) || [];
    const store = loadAdminStore();
    const admin = store[type] || [];
    const deletedSet = new Set((store.__deleted && store.__deleted[type]) || []);

    const map = new Map();
    original.forEach((it) => {
      const key = it.id || it.title;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...it, __source: "original" });
      }
    });

    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      const key = clone.id || clone.title;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...clone, __source: "admin" });
      }
    });

    return Array.from(map.values());
  }

  // ====== Trạng thái CMS ======
  let currentType = TYPE_KEYS[0];
  let editingItem = null;
  let isCreating = false;
  let searchQuery = "";

  function init() {
    // Đợi module Auth sẵn sàng
    if (!window.Auth) {
      setTimeout(init, 100);
      return;
    }

    window.Auth.isReady().then(() => {
      applyAuthState(!!window.Auth.user);
      window.Auth.onChange((u) => applyAuthState(!!u));
    });

    // Các nút Gate
    const loginBtn = document.getElementById("adminLoginBtn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => window.Auth.signInWithGoogle());
    }

    const switchBtn = document.getElementById("btnSwitchAccount");
    if (switchBtn) {
      switchBtn.addEventListener("click", () => window.Auth.signInWithGoogle());
    }

    const devBtn1 = document.getElementById("btnDevBypass");
    if (devBtn1) {
      devBtn1.addEventListener("click", () => enableDevMode());
    }

    const devBtn2 = document.getElementById("btnDevBypass2");
    if (devBtn2) {
      devBtn2.addEventListener("click", () => enableDevMode());
    }

    // Toolbar buttons
    document.getElementById("btnAdd").addEventListener("click", () => openForm(currentType, null, true));
    document.getElementById("btnSyncNow").addEventListener("click", () => {
      syncDataToWeb();
      toast("⚡ Đã cập nhật và đẩy dữ liệu trực tiếp về toàn bộ trang web!");
    });
    document.getElementById("btnExport").addEventListener("click", exportData);
    document.getElementById("btnImport").addEventListener("click", () => document.getElementById("importFile").click());
    document.getElementById("importFile").addEventListener("change", onImportFile);
    document.getElementById("btnReset").addEventListener("click", resetAdmin);

    // Search filter
    const searchInp = document.getElementById("adminSearch");
    if (searchInp) {
      searchInp.addEventListener("input", (e) => {
        searchQuery = (e.target.value || "").trim().toLowerCase();
        renderList();
      });
    }

    // Modal controls
    document.getElementById("modalClose").addEventListener("click", closeForm);
    document.getElementById("modalCancel").addEventListener("click", closeForm);
    document.getElementById("modalSave").addEventListener("click", saveForm);
    document.getElementById("modalBack").addEventListener("click", (e) => {
      if (e.target === document.getElementById("modalBack")) closeForm();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("modalBack").classList.contains("open")) closeForm();
    });

    // Lắng nghe dữ liệu thay đổi từ tab khác
    window.addEventListener("storage", (e) => {
      if (e.key === STORE_KEY) {
        renderTabs();
        renderList();
        renderStats();
      }
    });

    // Supabase Modal
    initSupabaseModal();
  }

  function initSupabaseModal() {
    const btnSb = document.getElementById("btnSupabase");
    const modal = document.getElementById("modalSupabase");
    const closeBtn = document.getElementById("modalSbClose");
    const cancelBtn = document.getElementById("modalSbCancel");
    const saveKeyBtn = document.getElementById("btnSaveSbKey");
    const testBtn = document.getElementById("btnTestSbConn");
    const anonInp = document.getElementById("sbAnonKeyInput");
    const statusBadge = document.getElementById("sbConnStatusBadge");
    const msgEl = document.getElementById("sbConnMessage");

    if (!modal) return;

    const updateStatusUI = async () => {
      if (statusBadge) {
        statusBadge.textContent = "Đang kiểm tra...";
        statusBadge.style.background = "#fef3c7";
        statusBadge.style.color = "#92400e";
      }
      if (msgEl) msgEl.textContent = "Đang gửi yêu cầu kiểm tra tới Supabase...";

      if (!window.RusiSupabase) {
        if (statusBadge) {
          statusBadge.textContent = "Chưa nạp SDK";
          statusBadge.style.background = "#fee2e2";
          statusBadge.style.color = "#991b1b";
        }
        if (msgEl) msgEl.textContent = "Thư viện Supabase SDK chưa tải xong.";
        return;
      }

      const res = await window.RusiSupabase.testConnection();
      if (res.ok) {
        if (statusBadge) {
          statusBadge.textContent = res.tablesMissing ? "🟢 Đã kết nối (Chưa có bảng)" : "🟢 Sẵn sàng";
          statusBadge.style.background = "#dcfce7";
          statusBadge.style.color = "#166534";
        }
        if (msgEl) msgEl.textContent = res.message;
      } else {
        if (statusBadge) {
          statusBadge.textContent = res.needsKey ? "🟡 Cần Anon Key" : "🔴 Lỗi kết nối";
          statusBadge.style.background = res.needsKey ? "#fef3c7" : "#fee2e2";
          statusBadge.style.color = res.needsKey ? "#92400e" : "#991b1b";
        }
        if (msgEl) msgEl.textContent = res.message;
      }
    };

    const openModal = () => {
      modal.classList.add("open");
      if (anonInp) {
        anonInp.value = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey !== "YOUR_SUPABASE_ANON_KEY")
          ? window.SUPABASE_CONFIG.anonKey
          : "";
      }
      updateStatusUI();
    };

    const closeModal = () => {
      modal.classList.remove("open");
    };

    if (btnSb) btnSb.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
    }

    if (saveKeyBtn) {
      saveKeyBtn.onclick = () => {
        const key = (anonInp.value || "").trim();
        if (!key) {
          toast("Vui lòng nhập Supabase Anon Key");
          return;
        }
        localStorage.setItem("rusi_supabase_anon_key", key);
        if (window.SUPABASE_CONFIG) {
          window.SUPABASE_CONFIG.anonKey = key;
        }
        toast("Đã lưu Supabase Anon Key!");
        updateStatusUI();
      };
    }

    if (testBtn) {
      testBtn.onclick = updateStatusUI;
    }
  }

  function enableDevMode() {
    localStorage.setItem("trki_admin_dev_mode", "true");
    applyAuthState(true);
    toast("⚡ Đã kích hoạt Chế độ Quản trị Dev Mode!");
  }

  function checkIsAdmin(user) {
    if (localStorage.getItem("trki_admin_dev_mode") === "true") return true;
    if (!user || !user.email) return false;
    const list = Array.isArray(window.ADMIN_EMAILS) ? window.ADMIN_EMAILS : [];
    if (list.length === 0) return false;
    const email = String(user.email).trim().toLowerCase();
    return list.some((e) => String(e).trim().toLowerCase() === email);
  }

  function applyAuthState(loggedIn) {
    const user = window.Auth && window.Auth.user;
    const isAdmin = loggedIn && checkIsAdmin(user);

    const loginGate = document.getElementById("loginGate");
    const deniedGate = document.getElementById("deniedGate");
    const adminArea = document.getElementById("adminArea");

    if (loginGate) loginGate.style.display = loggedIn ? "none" : "block";
    if (deniedGate) deniedGate.style.display = loggedIn && !isAdmin ? "block" : "none";
    if (adminArea) adminArea.style.display = isAdmin ? "block" : "none";

    if (isAdmin) {
      renderTabs();
      renderList();
      renderStats();
      updateLiveViewLink();
    } else if (loggedIn) {
      const info = document.getElementById("deniedInfo");
      if (info) info.textContent = `Tài khoản hiện tại: ${user.email}`;
    }
  }

  function updateLiveViewLink() {
    const liveBtn = document.getElementById("btnLiveView");
    if (liveBtn) {
      const url = SCHEMAS[currentType]?.webUrl || "index.html";
      liveBtn.href = url;
    }
  }

  function renderTabs() {
    const host = document.getElementById("adminTabs");
    if (!host) return;
    host.innerHTML = TYPE_KEYS.map((k) => {
      const s = SCHEMAS[k];
      const merged = getMergedList(k);
      return `<button class="admin-tab ${k === currentType ? "active" : ""}" data-tab="${k}">
        ${esc(s.icon)} ${esc(s.label)} (${merged.length})
      </button>`;
    }).join("");

    host.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentType = btn.dataset.tab;
        searchQuery = "";
        const searchInp = document.getElementById("adminSearch");
        if (searchInp) searchInp.value = "";
        renderTabs();
        renderList();
        renderStats();
        updateLiveViewLink();
      });
    });
  }

  function renderStats() {
    const host = document.getElementById("adminStats");
    if (!host) return;
    const orig = (SCHEMAS[currentType] && SCHEMAS[currentType].source()) || [];
    const merged = getMergedList(currentType);
    const adminList = getAdminList(currentType);
    const store = loadAdminStore();
    const deletedCount = ((store.__deleted && store.__deleted[currentType]) || []).length;

    host.innerHTML = `
      <span>Đang xem: <b>${esc(SCHEMAS[currentType].label)}</b></span>
      <span>Tổng số mục: <b>${merged.length}</b></span>
      <span>Gốc: <b>${orig.length}</b></span>
      <span>Admin chỉnh sửa/thêm: <b>${adminList.length}</b></span>
      ${deletedCount > 0 ? `<span>Đã ẩn/xoá: <b style="color:var(--red)">${deletedCount}</b></span>` : ""}
      <span style="color:var(--success);font-weight:600">🟢 Sẵn sàng đẩy về web</span>
    `;
  }

  function renderList() {
    const host = document.getElementById("adminList");
    if (!host) return;

    let items = getMergedList(currentType);

    if (searchQuery) {
      items = items.filter((it) => {
        const str = JSON.stringify(it).toLowerCase();
        return str.includes(searchQuery);
      });
    }

    if (items.length === 0) {
      host.innerHTML = `<div class="admin-empty">
        <p>Chưa có mục nào ${searchQuery ? "khớp với từ khóa tìm kiếm" : "trong danh mục này"}.</p>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('btnAdd').click()">➕ Thêm mục đầu tiên</button>
      </div>`;
      return;
    }

    host.innerHTML = items.map((it) => {
      const idKey = it.id || it.title;
      const isOriginal = it.__source === "original";
      const isProBadge = it.is_pro_only === true || it.is_pro_only === "true" ? '<span class="admin-item-badge" style="background:#fef3c7;color:#b45309">PRO</span>' : "";
      const popularBadge = it.popular === true || it.popular === "true" ? '<span class="admin-item-badge" style="background:#fee2e2;color:#b91c1c">⭐ Nổi bật</span>' : "";
      
      let sub = "";
      if (it.level) sub += `[${esc(it.level)}] `;
      if (it.categoryName) sub += `[${esc(it.categoryName)}] `;
      if (it.price) sub += `${Number(it.price).toLocaleString("vi-VN")} đ · `;
      if (it.desc) sub += `${esc(it.desc).slice(0, 75)}…`;
      else if (it.vi) sub += `${esc(it.vi).slice(0, 75)}…`;
      else if (it.excerpt) sub += `${esc(it.excerpt).slice(0, 75)}…`;

      return `
        <div class="admin-item">
          <div class="admin-item-meta">
            <div class="admin-item-title">
              ${esc(it.title || it.name || it.ru || it.id)}
              <span class="admin-item-badge ${isOriginal ? "original" : ""}">${isOriginal ? "Gốc" : "Admin"}</span>
              ${isProBadge}
              ${popularBadge}
            </div>
            <div class="admin-item-sub">ID: <code>${esc(idKey)}</code> ${sub ? `· ${sub}` : ""}</div>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-soft btn-sm" data-edit="${escAttr(idKey)}">✏️ Sửa</button>
            <button class="btn btn-soft btn-sm" style="color:var(--red)" data-del="${escAttr(idKey)}">🗑️ Xoá</button>
          </div>
        </div>
      `;
    }).join("");

    host.querySelectorAll("[data-edit]").forEach((b) => {
      b.addEventListener("click", () => openForm(currentType, b.dataset.edit, false));
    });

    host.querySelectorAll("[data-del]").forEach((b) => {
      b.addEventListener("click", () => deleteItem(b.dataset.del));
    });
  }

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
      if (schema.fields.find((f) => f.key === "is_pro_only")) initial.is_pro_only = "false";
      if (schema.fields.find((f) => f.key === "popular")) initial.popular = "false";
      if (type === "TRKI_BANK") initial.parts = SAMPLE_TRKI_PARTS;
    }

    document.getElementById("modalBody").innerHTML = renderForm(schema.fields, initial);
    document.getElementById("modalBack").classList.add("open");
    wireFormAdds();
  }

  function closeForm() {
    document.getElementById("modalBack").classList.remove("open");
    editingItem = null;
  }

  function renderForm(fields, data) {
    return fields.map((f) => {
      const val = data[f.key];
      const labelHtml = `<label class="form-label">${esc(f.label)}${f.required ? ' <span style="color:var(--red)">*</span>' : ""}</label>`;

      if (f.type === "text") {
        return `<div class="form-row"><div>${labelHtml}<input class="form-input" data-key="${f.key}" value="${escAttr(val || "")}" /></div></div>`;
      }

      if (f.type === "textarea") {
        return `<div class="form-row"><div>${labelHtml}<textarea class="form-textarea" data-key="${f.key}">${esc(val || "")}</textarea></div></div>`;
      }

      if (f.type === "number") {
        return `<div class="form-row"><div>${labelHtml}<input type="number" class="form-input" data-key="${f.key}" value="${escAttr(val ?? "")}" /></div></div>`;
      }

      if (f.type === "select") {
        const opts = (f.options || []).map((o) => {
          const v = typeof o === "string" ? o : o.v;
          const l = typeof o === "string" ? o : o.l;
          return `<option value="${escAttr(v)}" ${String(val) === String(v) ? "selected" : ""}>${esc(l)}</option>`;
        }).join("");
        return `<div class="form-row"><div>${labelHtml}<select class="form-select" data-key="${f.key}">${opts}</select></div></div>`;
      }

      if (f.type === "json") {
        const jsonStr = typeof val === "object" ? JSON.stringify(val, null, 2) : (val || "[]");
        return `<div class="form-section">
          <h4>
            ${esc(f.label)}
            ${f.sample ? `<button class="btn btn-soft btn-sm" type="button" data-fill-sample="${f.key}">📋 Nạp mẫu 3 Part</button>` : ""}
          </h4>
          <textarea class="form-textarea" data-key="${f.key}" data-mode="json" style="font-family:Consolas,monospace;font-size:0.83rem;min-height:240px;line-height:1.4">${esc(jsonStr)}</textarea>
          <p class="form-help">Hỗ trợ soạn đề TRKI 3 phần (Ngữ pháp, Đọc, Nghe) theo định dạng JSON chuẩn. Hệ thống tự động kiểm tra cú pháp khi lưu.</p>
        </div>`;
      }

      if (f.type === "list-lines") {
        const arr = Array.isArray(val) ? val : (val ? String(val).split("\n") : []);
        return `<div class="form-section">
          <h4>${esc(f.label)} <button class="btn btn-soft btn-sm" type="button" data-add="lines" data-key="${f.key}">+ Thêm dòng</button></h4>
          <div data-list="${f.key}" data-mode="lines">
            ${arr.map((line) => lineRow(f.key, line)).join("")}
          </div>
          <p class="form-help">Mỗi dòng tương ứng 1 mục.</p>
        </div>`;
      }

      if (f.type === "list") {
        const arr = Array.isArray(val) ? val : [];
        const normalized = arr.map((it) => normalizeQuizLike(it));
        return `<div class="form-section">
          <h4>${esc(f.label)} <button class="btn btn-soft btn-sm" type="button" data-add="list" data-key="${f.key}">+ Thêm mục</button></h4>
          <div data-list="${f.key}" data-mode="list">
            ${normalized.map((it, i) => itemRow(f.key, i, f.item, it)).join("")}
          </div>
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
    document.querySelectorAll("[data-add]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.dataset.key;
        const mode = b.dataset.add;
        const list = document.querySelector(`[data-list="${key}"]`);
        if (!list) return;
        if (mode === "lines") {
          list.insertAdjacentHTML("beforeend", lineRow(key, ""));
        } else {
          const schema = findSchema(currentType, key);
          if (schema && schema.item) {
            list.insertAdjacentHTML("beforeend", itemRow(key, list.children.length, schema.item, {}));
          }
        }
      });
    });

    document.querySelectorAll("[data-fill-sample]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.dataset.fillSample;
        const tx = document.querySelector(`[data-key="${key}"][data-mode="json"]`);
        if (tx) {
          tx.value = JSON.stringify(SAMPLE_TRKI_PARTS, null, 2);
          toast("Đã nạp mẫu đề thi TRKI 3 Part!");
        }
      });
    });

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

  function readForm(type) {
    const out = {};
    const body = document.getElementById("modalBody");

    body.querySelectorAll("[data-key]:not([data-mode='json'])").forEach((el) => {
      out[el.dataset.key] = el.value.trim();
    });

    // JSON fields
    body.querySelectorAll("[data-key][data-mode='json']").forEach((el) => {
      try {
        out[el.dataset.key] = JSON.parse(el.value.trim());
      } catch (err) {
        throw new Error(`Cú pháp JSON ở ô "${el.dataset.key}" không hợp lệ: ${err.message}`);
      }
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

    // List items
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

    // Ép kiểu số
    ["ep", "minWords", "price", "priceOld", "durationMin", "passPercent"].forEach((k) => {
      if (out[k] !== undefined && out[k] !== "") out[k] = Number(out[k]);
    });

    // Ép kiểu boolean
    if (out.is_pro_only !== undefined) out.is_pro_only = out.is_pro_only === "true";
    if (out.popular !== undefined) out.popular = out.popular === "true";

    return out;
  }

  function normalizeQuizLike(obj) {
    const out = { ...obj };
    const opts = Array.isArray(out.options) ? out.options.map((x) => (x == null ? "" : String(x))) : null;
    const aRaw = Math.round(Number(out.a));
    const a = !isNaN(aRaw) && opts && aRaw >= 0 && aRaw < opts.length ? aRaw : 0;
    if (opts && opts.length) {
      out.a0 = opts[a] || "";
      let slot = 1;
      for (let i = 0; i < opts.length; i++) {
        if (i !== a && slot <= 3) {
          out[`a${slot}`] = opts[i] || "";
          slot++;
        }
      }
      delete out.options;
      delete out.a;
    }
    return out;
  }

  function denormalizeQuizLike(obj) {
    if (!obj.a0 && !obj.q) return obj;
    const { a0, a1, a2, a3, ...rest } = obj;
    const options = [a0 || "", a1 || "", a2 || "", a3 || ""].filter((s) => s.length > 0);
    if (!options.length) return rest;
    return { ...rest, options, a: 0 };
  }

  function saveForm() {
    let data;
    try {
      data = readForm(currentType);
    } catch (err) {
      toast(err.message);
      return;
    }

    const idField = SCHEMAS[currentType].fields.find((f) => f.key === "id" || f.key === "title");
    if (idField && idField.required && !data[idField.key]) {
      toast(`${idField.label} là bắt buộc.`);
      return;
    }

    const idKey = data.id || data.title;
    const adminList = getAdminList(currentType);

    if (isCreating) {
      const exists = getMergedList(currentType).some((it) => (it.id || it.title) === idKey);
      if (exists) {
        toast(`Mã "${idKey}" đã tồn tại — vui lòng chọn mã khác.`);
        return;
      }
      adminList.push({ ...data, __admin: true });
    } else {
      const oldKey = (editingItem && (editingItem.id || editingItem.title)) || idKey;
      if (editingItem && editingItem.__adminNew && oldKey !== idKey) {
        toast("Không thể đổi ID của mục gốc trong data.js — chỉ sửa được nội dung.");
        return;
      }
      const idx = adminList.findIndex((it) => (it.id || it.title) === oldKey);
      const item = { ...(editingItem || {}), ...data, __admin: true };
      delete item.__adminNew;
      delete item.__source;
      if (idx >= 0) adminList[idx] = item;
      else adminList.push(item);
    }

    // Nếu trước đó từng bị đánh dấu xoá thì khôi phục lại
    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    if (Array.isArray(store.__deleted[currentType])) {
      store.__deleted[currentType] = store.__deleted[currentType].filter((k) => k !== idKey);
    }
    store[currentType] = adminList;
    saveAdminStore(store);

    // Đồng bộ lập tức sang runtime của trang web
    syncDataToWeb();

    closeForm();
    renderTabs();
    renderList();
    renderStats();
    toast(isCreating ? "✅ Đã thêm mới và đồng bộ về trang web!" : "✅ Đã lưu và đẩy dữ liệu về trang web!");
  }

  function deleteItem(idOrTitle) {
    if (!confirm(`Bạn có chắc chắn muốn xoá mục "${idOrTitle}"?`)) return;

    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    store.__deleted[currentType] = store.__deleted[currentType] || [];
    if (!store.__deleted[currentType].includes(idOrTitle)) {
      store.__deleted[currentType].push(idOrTitle);
    }

    if (Array.isArray(store[currentType])) {
      store[currentType] = store[currentType].filter((it) => (it.id || it.title) !== idOrTitle);
    }

    saveAdminStore(store);
    syncDataToWeb();

    renderTabs();
    renderList();
    renderStats();
    toast(`🗑️ Đã xoá "${idOrTitle}". Dữ liệu trang web đã cập nhật.`);
  }

  function syncDataToWeb() {
    if (typeof window.mergeAdminData === "function") {
      window.mergeAdminData();
    }
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("trki:data-updated", { detail: { type: currentType } }));
    }
  }

  // ====== Export / Import ======
  function exportData() {
    const payload = {};
    TYPE_KEYS.forEach((k) => {
      payload[k] = getMergedList(k).map(stripSource);
    });

    const body = TYPE_KEYS.map((k) => `const ${k} = ${JSON.stringify(payload[k], null, 2)};`).join("\n\n");
    const today = new Date().toISOString().slice(0, 10);
    const content = `// Auto-generated by admin.html on ${today}\n// Có thể dán trực tiếp vào data.js để lưu vĩnh viễn vào mã nguồn.\n\n${body}\n`;

    downloadFile(`trki-data-export-${today}.js`, content, "application/javascript");
    toast("📤 Đã tải về file export. Dán nội dung vào data.js khi muốn commit git.");
  }

  function stripSource(it) {
    const out = { ...it };
    delete out.__source;
    delete out.__admin;
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
          obj = JSON.parse(text.replace(/^\s*\/\/.*$/gm, ""));
        } else {
          const fn = new Function(text + `\n;return { ${TYPE_KEYS.join(", ")} };`);
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
        store[k] = store[k] || [];
        obj[k].forEach((it) => {
          const idKey = it.id || it.title;
          if (!idKey) return;
          const idx = store[k].findIndex((x) => (x.id || x.title) === idKey);
          if (idx >= 0) store[k][idx] = { ...it, __admin: true };
          else store[k].push({ ...it, __admin: true });
          count++;
        });
      }
    });
    saveAdminStore(store);
    syncDataToWeb();
    renderTabs();
    renderList();
    renderStats();
    toast(`📥 Đã import thành công ${count} mục và đẩy về trang web!`);
  }

  function resetAdmin() {
    if (!confirm("Khôi phục TOÀN BỘ dữ liệu về mặc định gốc (từ data.js)? Tất cả chỉnh sửa admin sẽ được đặt lại.")) return;
    localStorage.removeItem(STORE_KEY);
    syncDataToWeb();
    renderTabs();
    renderList();
    renderStats();
    toast("🗑️ Đã khôi phục dữ liệu gốc từ data.js!");
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function escAttr(s) {
    return esc(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
