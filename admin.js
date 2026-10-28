/**
 * admin.js — Payload CMS Web Studio Engine for RUSI TRKI Platform
 * 
 * Architecture based on Payload CMS (payloadcms.com) v3 Open Source:
 * - Reactive State Engine (State.currentDraft with two-way binding)
 * - Complete Array Builder Suite (TRKI Parts, Vocab Words, Listening Dialogs, Speaking Sets)
 * - Hash Router (Dashboard, Collection List, Document 2-Column Editor, Globals, API Explorer, Supabase Sync)
 * - Payload Table with Search, Level/PRO Filters, Bulk Operations, Pagination
 * - Payload 3.0 Live Preview Split Drawer with context URL injection
 * - Interactive REST API & Schema Explorer with live JSON viewer & cURL generator
 * - Supabase Cloud PostgreSQL Sync & In-place Runtime Mutation (window.mergeAdminData)
 * - Full Mobile/Tablet Responsiveness & "More..." Kebab Overflow Pattern
 */

(function () {
  "use strict";

  const STORE_KEY = "trki_admin_data";
  const THEME_KEY = "payload_theme";
  const DEV_MODE_KEY = "trki_dev_mode";

  // =========================================================================
  // 1. SCHEMAS REGISTRY (10 COLLECTIONS & GLOBALS MATCHING DATA.JS)
  // =========================================================================

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

  const COLLECTIONS = {
    TRKI_BANK: {
      slug: "TRKI_BANK",
      group: "study",
      label: "Đề thi TRKI",
      singular: "Đề thi",
      icon: "graduation-cap",
      webUrl: "mock-test.html",
      source: () => (window.TRKI_BANK || []),
      desc: "Ngân hàng đề thi chuẩn TRKI A1, A2, B1, B2 với 3 phần thi: Từ vựng & Ngữ pháp, Đọc hiểu, Nghe hiểu.",
      createDefault: () => ({
        id: "trki_de_" + Date.now().toString().slice(-4),
        title: "Đề thi TRKI Mới",
        level: "A1",
        levelName: "Sơ cấp A1 (ТЭУ)",
        category: "full",
        categoryName: "Đề thi toàn diện (3 phần)",
        durationMin: 45,
        passPercent: 66,
        is_pro_only: false,
        parts: JSON.parse(JSON.stringify(SAMPLE_TRKI_PARTS))
      }),
      fields: [
        { key: "id", label: "Mã đề thi (ID duy nhất)", type: "text", required: true, help: "Ví dụ: trki_a1, trki_b1_de1" },
        { key: "title", label: "Tiêu đề đề thi", type: "text", required: true },
        {
          key: "level",
          label: "Cấp độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (ТЭУ) — Sơ cấp" },
            { v: "A2", l: "A2 (ТБУ) — Cơ bản" },
            { v: "B1", l: "B1 (ТРКИ-1) — Trung cấp 1" },
            { v: "B2", l: "B2 (ТРКИ-2) — Trung cấp 2" },
            { v: "C1", l: "C1 (ТРКИ-3) — Cao cấp" },
            { v: "C2", l: "C2 (ТРКИ-4) — Thành thạo" }
          ],
          defaultValue: "A1"
        },
        { key: "levelName", label: "Tên cấp độ hiển thị", type: "text", defaultValue: "Sơ cấp A1 (ТЭУ)" },
        { key: "categoryName", label: "Tên phân loại đề", type: "text", defaultValue: "Đề thi toàn diện (3 phần)" },
        { key: "durationMin", label: "Thời gian làm bài (phút)", type: "number", defaultValue: 45 },
        { key: "passPercent", label: "Điểm chuẩn đạt (%)", type: "number", defaultValue: 66 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ]
        }
      ]
    },

    VOCAB_JARS: {
      slug: "VOCAB_JARS",
      group: "study",
      label: "Lọ từ vựng",
      singular: "Lọ từ",
      icon: "archive-jar",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_JARS || []),
      desc: "Kho lọ từ vựng theo chuỗi hành động và ngữ cảnh sống còn tại Nga, tích hợp thuật toán lặp lại ngắt quãng SM-2.",
      createDefault: () => ({
        id: "jar_" + Date.now().toString().slice(-4),
        name: "Lọ từ vựng mới",
        level: "A1",
        levelName: "Sơ cấp A1",
        desc: "Từ vựng sinh hoạt và giao tiếp sống còn.",
        icon: "archive-jar",
        is_pro_only: false,
        words: [
          { ru: "сло́во", vi: "từ ngữ", note: "danh từ giống trung (оно)", ex: "Русское слово." },
          { ru: "кни́га", vi: "quyển sách", note: "danh từ giống cái (она)", ex: "Я читаю интересную книгу." }
        ]
      }),
      fields: [
        { key: "id", label: "Mã lọ (ID)", type: "text", required: true, help: "Ví dụ: jar_auchan, jar_chemodan" },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "archive-jar" },
        { key: "name", label: "Tên lọ từ vựng", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" },
            { v: "C1", l: "C1 (Cao cấp)" },
            { v: "C2", l: "C2 (Thành thạo)" }
          ],
          defaultValue: "A1"
        },
        { key: "levelName", label: "Tên hiển thị cấp độ", type: "text", defaultValue: "Sơ cấp A1" },
        { key: "color", label: "Mã màu chủ đề (Hex)", type: "text", defaultValue: "#0039A6" },
        { key: "desc", label: "Mô tả ngữ cảnh sử dụng & mục tiêu", type: "textarea" },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free)" },
            { v: "true", l: "Chỉ dành cho PRO" }
          ]
        }
      ]
    },

    TOPIC_ARTICLES: {
      slug: "TOPIC_ARTICLES",
      group: "study",
      label: "Bài học chủ đề (Article)",
      singular: "Bài học chủ đề",
      icon: "book-open-blog",
      webUrl: "vocabulary.html",
      desc: "Nội dung bài đọc chi tiết theo chủ đề: Bối cảnh đời sống, hội thoại mẫu, điểm ngữ pháp và bảng từ vựng.",
      source: () => {
        const raw = window.TOPIC_ARTICLES || {};
        return Object.keys(raw).map((k) => ({
          id: k,
          intro: raw[k].intro || "",
          audioUrl: raw[k].audioUrl || "",
          dialogues: Array.isArray(raw[k].dialogues) ? raw[k].dialogues : [],
          grammar: raw[k].grammar || { title: "", rule: "", examples: [] },
          vocabTable: Array.isArray(raw[k].vocabTable) ? raw[k].vocabTable : []
        }));
      },
      createDefault: () => ({
        id: "chu_de_moi",
        intro: "Giới thiệu bối cảnh thực tế đời sống sinh viên và giao tiếp tại Nga...",
        audioUrl: "",
        dialogues: [
          { speaker: "Анна", role: "Sinh viên", ru: "Привет! Как дела?", vi: "Chào bạn! Bạn khỏe không?" }
        ],
        grammar: {
          title: "Điểm ngữ pháp cốt lõi",
          rule: "Mô tả quy tắc ngữ pháp trong bài học...",
          examples: [
            { ru: "Я изучаю русский язык.", vi: "Tôi đang học tiếng Nga." }
          ]
        },
        vocabTable: [
          { ru: "студент", stress: "студе́нт", pos: "Noun", vi: "sinh viên nam", exampleRu: "Он студент.", exampleVi: "Anh ấy là sinh viên." }
        ]
      }),
      fields: [
        { key: "id", label: "Mã chủ đề (khớp với ID Lọ từ vựng)", type: "text", required: true, help: "Ví dụ: nghe_nghiep, do_an_uong..." },
        { key: "intro", label: "Đoạn văn bối cảnh giới thiệu", type: "textarea", rows: 4, required: true },
        { key: "audioUrl", label: "URL File âm thanh (tùy chọn)", type: "text" }
      ]
    },

    GRAMMAR_LESSONS: {
      slug: "GRAMMAR_LESSONS",
      group: "study",
      label: "Ngữ pháp chuyên sâu",
      singular: "Bài ngữ pháp",
      icon: "sparkles-clean",
      webUrl: "vocabulary.html",
      desc: "Tổng hợp các bài học ngữ pháp chuyên sâu: Các Cách (Падежи), Thể động từ, Giới từ và bảng chia mẫu.",
      source: () => (window.GRAMMAR_LESSONS || []),
      createDefault: () => ({
        id: "grammar_" + Date.now().toString().slice(-4),
        title: "Bài ngữ pháp mới",
        vi: "Ý nghĩa và cách dùng trong giao tiếp",
        topic: "Chủ đề liên quan: Đời sống",
        rules: [
          "Quy tắc 1: Cách dùng cơ bản trong câu.",
          "Quy tắc 2: Quy tắc biến đổi đuôi từ."
        ],
        table: {
          head: ["Nguyên mẫu", "Dạng biến đổi", "Ví dụ"],
          rows: [
            ["книга (nữ)", "книгу", "Я читаю книгу."]
          ]
        },
        quickQuiz: [
          {
            q: "Chọn dạng đúng của từ...",
            options: ["книга", "книгу", "книге", "книгой"],
            a: 1,
            explain: "Tân ngữ trực tiếp dùng cách 4: đuôi -а đổi thành -у."
          }
        ]
      }),
      fields: [
        { key: "id", label: "Mã bài học (ID)", type: "text", required: true, help: "Ví dụ: accusative, genitive, verb_aspect..." },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text", required: true },
        { key: "vi", label: "Ý nghĩa & diễn giải tiếng Việt", type: "text", required: true },
        { key: "topic", label: "Chủ đề liên quan", type: "text" }
      ]
    },

    LISTENING_LESSONS: {
      slug: "LISTENING_LESSONS",
      group: "study",
      label: "Luyện nghe 4 Part",
      singular: "Bài nghe",
      icon: "headphones",
      webUrl: "listening.html",
      source: () => (window.LISTENING_LESSONS || []),
      desc: "Hệ thống bài nghe 4 Part chuẩn CEFR và Shadowing Studio có phụ đề song ngữ và trắc nghiệm.",
      createDefault: () => ({
        id: "lis_" + Date.now().toString().slice(-4),
        title: "В кафе",
        vi: "Ở quán cà phê — gọi món và thanh toán",
        level: "A1",
        levelName: "Sơ cấp A1",
        category: "cafe",
        categoryName: "Ăn uống & Cà phê",
        estMinutes: 10,
        icon: "coffee",
        partNumber: 1,
        is_pro_only: false,
        lines: [
          { who: "Официант", ru: "Здравствуйте! Что вы будете заказывать?", vi: "Xin chào! Anh/chị muốn gọi món gì ạ?" },
          { who: "Анна", ru: "Кофе без сахара и круассан, пожалуйста.", vi: "Cho tôi một cà phê không đường và một bánh sừng bò nhé." }
        ],
        questions: [
          { q: "Anna gọi món gì?", options: ["Trà và bánh ngọt", "Cà phê không đường và bánh sừng bò", "Nước cam", "Bánh mì kẹp"], a: 1, ex: "Anna nói: 'Кофе без сахара и круассан'." }
        ]
      }),
      fields: [
        { key: "id", label: "ID bài nghe", type: "text", required: true, help: "Ví dụ: lis-airport, lis-shop" },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text", required: true },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" }
          ],
          defaultValue: "A1"
        },
        { key: "categoryName", label: "Chủ đề / Ngữ cảnh", type: "text", defaultValue: "Đời sống hàng ngày" },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "headphones" },
        { key: "estMinutes", label: "Thời lượng ước tính (phút)", type: "number", defaultValue: 12 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí" },
            { v: "true", l: "Chỉ dành cho PRO" }
          ]
        }
      ]
    },

    SPEAKING_SETS: {
      slug: "SPEAKING_SETS",
      group: "study",
      label: "Luyện nói Shadowing",
      singular: "Bộ câu nói",
      icon: "mic-speaking",
      webUrl: "speaking.html",
      source: () => (window.SPEAKING_SETS || []),
      desc: "Kho mẫu câu luyện nói phản xạ, ngữ điệu và phát âm tiếng Nga có AI chấm điểm âm vị.",
      createDefault: () => ({
        id: "sp_" + Date.now().toString().slice(-4),
        title: "Giao tiếp cơ bản mới",
        level: "A1",
        levelName: "Sơ cấp A1",
        category: "basic",
        categoryName: "Giao tiếp cơ bản",
        phonemeTarget: "Luyện âm cứng/mềm và trọng âm từ",
        icon: "handshake",
        is_pro_only: false,
        items: [
          { ru: "Добрый день! Как ваши дела́?", vi: "Chào bạn! Công việc của bạn thế nào?" },
          { ru: "Всё отлично, спасибо!", vi: "Mọi thứ đều tuyệt vời, cảm ơn bạn!" }
        ]
      }),
      fields: [
        { key: "id", label: "ID bộ luyện nói", type: "text", required: true, help: "Ví dụ: sp-basic, sp-travel" },
        { key: "title", label: "Tên chủ đề luyện nói", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" }
          ],
          defaultValue: "A1"
        },
        { key: "categoryName", label: "Tên nhóm giao tiếp", type: "text", defaultValue: "Giao tiếp hàng ngày" },
        { key: "phonemeTarget", label: "Mục tiêu âm vị / Trọng âm cần chú ý", type: "text" },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "mic-speaking" },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí" },
            { v: "true", l: "Chỉ dành cho PRO" }
          ]
        }
      ]
    },

    WRITING_TASKS: {
      slug: "WRITING_TASKS",
      group: "study",
      label: "Luyện viết tả tranh",
      singular: "Đề bài viết",
      icon: "pen-tool",
      webUrl: "writing.html",
      source: () => (window.WRITING_TASKS || []),
      desc: "Đề bài luyện viết Письмо theo chuẩn TRKI kèm từ khóa gợi ý và bài viết mẫu.",
      createDefault: () => ({
        id: "w_" + Date.now().toString().slice(-4),
        level: "A1",
        levelName: "Sơ cấp A1",
        category: "general",
        categoryName: "Sinh hoạt",
        icon: "pen-tool",
        estMinutes: 15,
        title: "Viết đoạn văn ngắn",
        prompt: "Напишите короткий текст о вашей семье или друзьях.",
        vi: "Hãy viết một đoạn văn ngắn về gia đình hoặc bạn bè của bạn.",
        minWords: 30,
        suggested_words: ["Моя семья", "Мы живём", "Очень дружно", "Каждый день"],
        tips: ["Sử dụng cách 1 cho chủ ngữ", "Dùng cách 6 chỉ nơi chốn: в + giới cách"],
        model: "Меня зовут Антон. Вот моя семья. Мой папа инженер, а мама врач. Мы живём дружно."
      }),
      fields: [
        { key: "id", label: "ID đề bài viết", type: "text", required: true, help: "Ví dụ: w1, w2, w-letter" },
        { key: "title", label: "Tên đề bài", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" }
          ],
          defaultValue: "A1"
        },
        { key: "categoryName", label: "Chủ đề bài viết", type: "text", defaultValue: "Tự giới thiệu" },
        { key: "prompt", label: "Đề bài tiếng Nga", type: "textarea", required: true },
        { key: "vi", label: "Đề bài tiếng Việt", type: "textarea", required: true },
        { key: "minWords", label: "Số từ tối thiểu", type: "number", defaultValue: 30 },
        { key: "model", label: "Bài viết mẫu tham khảo (Model Essay)", type: "textarea" }
      ]
    },

    VOCAB_LESSONS: {
      slug: "VOCAB_LESSONS",
      group: "study",
      label: "Video «Хочу в Россию»",
      singular: "Tập phim",
      icon: "film",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_LESSONS || []),
      desc: "Series video hoạt hình tình huống đời sống sinh viên du học tại Nga.",
      createDefault: () => ({
        id: "ep_" + Date.now().toString().slice(-4),
        type: "series",
        level: "A1",
        ep: 1,
        ru: "Новый день в Москве",
        vi: "Ngày mới ở Moskva",
        scene: "building-2",
        story: "Anya thức dậy tại ký túc xá và bắt đầu một ngày mới tại thủ đô.",
        words: [
          { ru: "утро", vi: "buổi sáng", note: "danh từ trung" },
          { ru: "завтрак", vi: "bữa sáng", note: "danh từ đực" }
        ]
      }),
      fields: [
        { key: "id", label: "ID bài học", type: "text", required: true },
        {
          key: "type",
          label: "Loại bài",
          type: "select",
          options: [{ v: "series", l: "Series theo tập" }, { v: "topic", l: "Chủ đề tự do" }],
          defaultValue: "series"
        },
        { key: "ep", label: "Số tập (Episode)", type: "number", defaultValue: 1 },
        { key: "scene", label: "Mã Icon Cảnh Phim", type: "text", defaultValue: "film" },
        { key: "ru", label: "Tiêu đề tiếng Nga", type: "text", required: true },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text", required: true },
        { key: "story", label: "Cốt truyện / Bối cảnh", type: "textarea" }
      ]
    },

    SHOP_PRODUCTS: {
      slug: "SHOP_PRODUCTS",
      group: "commerce",
      label: "Sản phẩm Shop Nga",
      singular: "Sản phẩm",
      icon: "shopping-bag-shop",
      webUrl: "shop.html",
      source: () => (window.SHOP_PRODUCTS || []),
      desc: "Sản phẩm bánh kẹo Alenka, mỹ phẩm Siberia và các gói dịch vụ Du học Nga.",
      createDefault: () => ({
        id: "prod_" + Date.now().toString().slice(-4),
        category: "banh_keo",
        categoryName: "Bánh kẹo Nga",
        title: "Bánh kẹo Nga nhập khẩu mới",
        desc: "Sản phẩm chính hãng nội địa Nga thơm ngon, hạn sử dụng mới nhất.",
        price: 55000,
        priceOld: 70000,
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
        badge: "Mới"
      }),
      fields: [
        { key: "id", label: "Mã SKU / ID sản phẩm", type: "text", required: true },
        {
          key: "category",
          label: "Ngành hàng",
          type: "select",
          options: [
            { v: "banh_keo", l: "Bánh kẹo & Thực phẩm Nga" },
            { v: "my_pham", l: "Mỹ phẩm Siberia" },
            { v: "luu_niem", l: "Quà lưu niệm Nga" },
            { v: "dich_vu_du_hoc", l: "Dịch vụ & Hồ sơ Du học Nga" }
          ]
        },
        { key: "categoryName", label: "Tên ngành hàng hiển thị", type: "text" },
        { key: "title", label: "Tên sản phẩm / dịch vụ", type: "text", required: true },
        { key: "desc", label: "Mô tả sản phẩm", type: "textarea" },
        { key: "price", label: "Giá bán (VNĐ)", type: "number", required: true },
        { key: "priceOld", label: "Giá gốc niêm yết (VNĐ)", type: "number" },
        { key: "image", label: "URL ảnh sản phẩm", type: "text" },
        { key: "badge", label: "Huy hiệu (Bán chạy / Mới / Hot)", type: "text" }
      ]
    },

    PACKAGES: {
      slug: "PACKAGES",
      group: "commerce",
      label: "Gói cước PRO",
      singular: "Gói cước",
      icon: "crown-vip",
      webUrl: "index.html#pricing",
      source: () => (window.PACKAGES || []),
      desc: "Bảng giá và quyền lợi các gói hội viên VIP PRO (6 tháng, 1 năm, trọn đời).",
      createDefault: () => ({
        id: "pro_" + Date.now().toString().slice(-4),
        badge: "3 THÁNG",
        title: "Gói Trải Nghiệm 3 Tháng",
        desc: "Dành cho người mới bắt đầu tiếp cận tiếng Nga và chuẩn bị thi A1.",
        price: 199000,
        priceOld: 390000,
        popular: false,
        features: [
          "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1",
          "Luyện nghe 4 Part CEFR không giới hạn",
          "Tạo Lọ từ vựng cá nhân",
          "Sửa phát âm AI"
        ]
      }),
      fields: [
        { key: "id", label: "Mã gói cước (pro_6m, pro_1y, pro_vip)", type: "text", required: true },
        { key: "badge", label: "Huy hiệu thời hạn", type: "text", defaultValue: "6 THÁNG" },
        { key: "title", label: "Tên gói cước", type: "text", required: true },
        { key: "desc", label: "Mô tả mục tiêu phù hợp", type: "textarea" },
        { key: "price", label: "Giá ưu đãi (VNĐ)", type: "number", required: true },
        { key: "priceOld", label: "Giá gốc niêm yết (VNĐ)", type: "number" },
        {
          key: "popular",
          label: "Đánh dấu gói Nổi bật nhất",
          type: "select",
          options: [
            { v: "false", l: "Gói tiêu chuẩn" },
            { v: "true", l: "Gói phổ biến nhất" }
          ]
        }
      ]
    },

        ORDERS: {
      slug: "ORDERS",
      group: "commerce",
      label: "Đơn hàng & Giao dịch",
      singular: "Đơn hàng",
      icon: "shopping-bag",
      webUrl: "index.html#pricing",
      source: () => (window.SHOP_ORDERS || []),
      desc: "Quản lý đơn hàng mua gói học PRO, sách và giáo trình tiếng Nga qua VietQR.",
      createDefault: () => ({
        id: "ORD-" + Date.now().toString().slice(-6),
        userEmail: "",
        packageId: "pro_6m",
        packageName: "Gói Luyện Thi 6 Tháng",
        amount: 299000,
        paymentMethod: "VietQR",
        status: "pending",
        createdAt: new Date().toISOString()
      }),
      fields: [
        { key: "id", label: "Mã đơn hàng", type: "text", required: true },
        { key: "userEmail", label: "Email học viên", type: "text", required: true },
        { key: "packageId", label: "Mã gói / Mã sách", type: "text", required: true },
        { key: "packageName", label: "Tên gói cước", type: "text", required: true },
        { key: "amount", label: "Số tiền thanh toán (VNĐ)", type: "number", required: true },
        {
          key: "paymentMethod",
          label: "Phương thức thanh toán",
          type: "select",
          options: [
            { v: "VietQR", l: "VietQR Chuyển khoản" },
            { v: "MOMO", l: "Ví MoMo" },
            { v: "Card", l: "Thẻ ngân hàng / Visa" }
          ],
          defaultValue: "VietQR"
        },
        {
          key: "status",
          label: "Trạng thái thanh toán",
          type: "select",
          options: [
            { v: "pending", l: "Chờ thanh toán (Pending)" },
            { v: "paid", l: "Đã kích hoạt PRO (Paid)" },
            { v: "cancelled", l: "Đã hủy (Cancelled)" }
          ],
          defaultValue: "pending"
        },
        { key: "createdAt", label: "Thời gian tạo đơn", type: "text" }
      ]
    },

BLOG_POSTS: {
      slug: "BLOG_POSTS",
      group: "commerce",
      label: "Cẩm nang Blog",
      singular: "Bài viết",
      icon: "book-open-blog",
      webUrl: "blog.html",
      source: () => (window.BLOG_POSTS || []),
      desc: "Kinh nghiệm xin học bổng chính phủ, đời sống ký túc xá và thủ tục du học Nga.",
      createDefault: () => ({
        slug: "bai-viet-moi-" + Date.now().toString().slice(-4),
        title: "Bài viết cẩm nang mới",
        tag: "Lộ trình",
        date: "Tháng 10, 2026",
        icon: "flag",
        excerpt: "Tóm tắt ngắn gọn nội dung bài viết về đời sống và du học Nga.",
        content: "Nội dung bài viết chi tiết được viết tại đây...",
        published: true
      }),
      fields: [
        { key: "slug", label: "Slug URL bài viết", type: "text", required: true, help: "Ví dụ: kinh-nghiem-xin-hoc-bong-nga" },
        { key: "title", label: "Tiêu đề bài viết", type: "text", required: true },
        { key: "tag", label: "Chuyên mục (Lộ trình / KTX / Học bổng / Đời sống)", type: "text" },
        { key: "date", label: "Thời gian đăng (ví dụ: Tháng 10, 2026)", type: "text" },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "flag" },
        { key: "excerpt", label: "Tóm tắt bài viết hiển thị ngoài danh sách", type: "textarea" },
        { key: "content", label: "Nội dung bài viết chi tiết (Hỗ trợ HTML/Markdown)", type: "textarea", required: true }
      ]
    },

    USERS: {
      slug: "USERS",
      group: "system",
      label: "Học viên & Quản trị",
      singular: "Người dùng",
      icon: "users-students",
      webUrl: "index.html",
      source: () => {
        const store = loadAdminStore();
        return Array.isArray(store.USERS) ? store.USERS : [
          { id: "usr_admin", email: "admin@rusitrki.com", full_name: "Tổng Quản Trị RUSI", role: "super_admin", is_pro: true, streak: 128, xp: 9500 },
          { id: "usr_academic", email: "academic@rusitrki.com", full_name: "Quản trị Học thuật", role: "academic_admin", is_pro: true, streak: 45, xp: 4200 }
        ];
      },
      createDefault: () => ({
        id: "usr_" + Date.now().toString().slice(-4),
        email: "student@example.com",
        full_name: "Học viên mới",
        role: "student",
        is_pro: false,
        streak: 1,
        xp: 100
      }),
      fields: [
        { key: "id", label: "User ID", type: "text", required: true },
        { key: "email", label: "Email Gmail", type: "text", required: true },
        { key: "full_name", label: "Họ và tên", type: "text" },
        {
          key: "role",
          label: "Vai trò quản trị (RBAC)",
          type: "select",
          options: [
            { v: "student", l: "Học viên (Student)" },
            { v: "teacher", l: "Giáo viên chấm bài (Teacher)" },
            { v: "academic_admin", l: "Quản trị học thuật (Academic Admin)" },
            { v: "super_admin", l: "Tổng quản trị (Super Admin)" }
          ],
          defaultValue: "student"
        },
        {
          key: "is_pro",
          label: "Trạng thái VIP PRO",
          type: "select",
          options: [
            { v: "false", l: "Tài khoản thường" },
            { v: "true", l: "Đã kích hoạt PRO" }
          ]
        },
        { key: "streak", label: "Chuỗi ngày học liên tục (Streak)", type: "number", defaultValue: 0 },
        { key: "xp", label: "Điểm kinh nghiệm (XP)", type: "number", defaultValue: 0 }
      ]
    }
  };

  const COLLECTION_KEYS = Object.keys(COLLECTIONS);

  // =========================================================================
  // 2. STATE STORE & IN-PLACE RUNTIME PROPAGATION
  // =========================================================================

  const State = {
    currentRoute: "dashboard",
    currentSlug: null,
    currentDocId: null,
    isCreating: false,
    currentDraft: null, // Active live editing buffer
    activeEditorTab: "content",
    searchQuery: "",
    filterLevel: "all",
    filterPro: "all",
    filterSource: "all",
    currentPage: 1,
    pageSize: 10,
    selectedRows: new Set(),
    devMode: false
  };

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

  function getMergedList(slug) {
    const col = COLLECTIONS[slug];
    if (!col) return [];
    const original = col.source() || [];
    const store = loadAdminStore();
    const admin = store[slug] || [];
    const deletedSet = new Set((store.__deleted && store.__deleted[slug]) || []);

    const map = new Map();
    original.forEach((it) => {
      const key = it.id || it.slug || it.title;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...it, __source: "original" });
      }
    });

    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      const key = clone.id || clone.slug || clone.title;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...clone, __source: "admin" });
      }
    });

    return Array.from(map.values());
  }

  function syncDataToWeb() {
    if (typeof window.mergeAdminData === "function") {
      window.mergeAdminData();
    }
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("trki:data-updated", { detail: { timestamp: Date.now() } }));
    }
  }

  function stripSource(it) {
    if (!it || typeof it !== "object") return it;
    const out = { ...it };
    delete out.__source;
    delete out.__admin;
    return out;
  }

  // =========================================================================
  // 3. ROUTER & CONTROLLER
  // =========================================================================

  function parseHash() {
    const hash = (window.location.hash || "#dashboard").replace(/^#/, "");
    const parts = hash.split("/");

    if (parts[0] === "dashboard" || !parts[0]) {
      return { route: "dashboard" };
    }
    if (parts[0] === "collection" && parts[1]) {
      if (parts[2] === "create") {
        return { route: "editor", slug: parts[1], docId: null, isCreating: true };
      }
      if (parts[2] === "edit" && parts[3]) {
        return { route: "editor", slug: parts[1], docId: decodeURIComponent(parts[3]), isCreating: false };
      }
      return { route: "list", slug: parts[1] };
    }
    if (parts[0] === "globals" && parts[1]) {
      return { route: "globals", slug: parts[1] };
    }
    if (parts[0] === "supabase-sync") {
      return { route: "supabase-sync" };
    }
    if (parts[0] === "api-explorer") {
      return { route: "api-explorer" };
    }
    return { route: "dashboard" };
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function handleRoute() {
    const parsed = parseHash();
    State.currentRoute = parsed.route;
    State.currentSlug = parsed.slug || null;
    State.currentDocId = parsed.docId || null;
    State.isCreating = !!parsed.isCreating;
    State.selectedRows.clear();
    State.currentPage = 1;

    // Initialize or load draft buffer
    if (State.currentRoute === "editor" && State.currentSlug) {
      const col = COLLECTIONS[State.currentSlug];
      if (State.isCreating) {
        State.currentDraft = col.createDefault ? col.createDefault() : { id: "item_" + Date.now().toString().slice(-4), title: "Mục mới" };
      } else {
        const item = getMergedList(State.currentSlug).find((it) => (it.id || it.slug || it.title) === State.currentDocId);
        State.currentDraft = item ? JSON.parse(JSON.stringify(stripSource(item))) : (col.createDefault ? col.createDefault() : {});
      }
    } else {
      State.currentDraft = null;
    }

    updateSidebarNav();
    updateBreadcrumbs();
    updateTopbarActions();

    const container = document.getElementById("payloadViewContainer");
    if (!container) return;

    if (State.currentRoute === "dashboard") {
      renderDashboard(container);
    } else if (State.currentRoute === "list") {
      renderCollectionView(container, State.currentSlug);
    } else if (State.currentRoute === "editor") {
      renderDocumentEditor(container, State.currentSlug);
    } else if (State.currentRoute === "globals") {
      renderGlobalsView(container, State.currentSlug);
    } else if (State.currentRoute === "supabase-sync") {
      renderSupabaseSyncView(container);
    } else if (State.currentRoute === "api-explorer") {
      renderApiExplorer(container);
    }

    closeMobileSidebar();
  }

  // =========================================================================
  // 4. SIDEBAR & BREADCRUMBS
  // =========================================================================

  function renderSidebarLists() {
    const listStudy = document.getElementById("navListStudy");
    const listCommerce = document.getElementById("navListCommerce");

    if (listStudy) listStudy.innerHTML = "";
    if (listCommerce) listCommerce.innerHTML = "";

    const countStudy = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "study").length;
    const countCommerce = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "commerce").length;
    const bStudy = document.getElementById("badgeCountStudy");
    const bCommerce = document.getElementById("badgeCountCommerce");
    if (bStudy) bStudy.textContent = countStudy;
    if (bCommerce) bCommerce.textContent = countCommerce;

    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      if (col.group === "system") return;

      const items = getMergedList(key);
      const li = document.createElement("li");
      li.className = "payload-nav-item";
      li.innerHTML = `
        <a class="payload-nav-link" data-nav="collection:${col.slug}" href="#collection/${col.slug}">
          <span class="payload-nav-icon">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 18 }) : col.icon}</span>
          <span class="payload-nav-label">${esc(col.label)}</span>
          <span class="payload-nav-badge" id="badge_${col.slug}">${items.length}</span>
        </a>
      `;

      if (col.group === "study" && listStudy) listStudy.appendChild(li);
      else if (col.group === "commerce" && listCommerce) listCommerce.appendChild(li);
    });

    const userCountEl = document.getElementById("navBadgeUsers");
    if (userCountEl) {
      userCountEl.textContent = getMergedList("USERS").length;
    }
  }

  function updateSidebarNav() {
    document.querySelectorAll(".payload-nav-link").forEach((link) => {
      const target = link.getAttribute("data-nav");
      let isActive = false;

      if (State.currentRoute === "dashboard" && target === "dashboard") isActive = true;
      else if ((State.currentRoute === "list" || State.currentRoute === "editor") && target === `collection:${State.currentSlug}`) isActive = true;
      else if (State.currentRoute === "globals" && target === `globals:${State.currentSlug}`) isActive = true;
      else if (State.currentRoute === "supabase-sync" && target === "supabase-sync") isActive = true;
      else if (State.currentRoute === "api-explorer" && target === "api-explorer") isActive = true;

      link.classList.toggle("active", isActive);
    });
  }

  function updateBreadcrumbs() {
    const nav = document.getElementById("breadcrumbsNav");
    if (!nav) return;

    if (State.currentRoute === "dashboard") {
      nav.innerHTML = `<span class="payload-crumb-item active">Bảng điều khiển (Dashboard)</span>`;
    } else if (State.currentRoute === "list") {
      const col = COLLECTIONS[State.currentSlug];
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">Dashboard</a>
        <span class="payload-crumb-sep">/</span>
        <span class="payload-crumb-item active">${col ? esc(col.label) : esc(State.currentSlug)}</span>
      `;
    } else if (State.currentRoute === "editor") {
      const col = COLLECTIONS[State.currentSlug];
      const title = State.isCreating ? "Tạo mới" : esc(State.currentDocId);
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">Dashboard</a>
        <span class="payload-crumb-sep">/</span>
        <a class="payload-crumb-item" href="#collection/${State.currentSlug}">${col ? esc(col.label) : esc(State.currentSlug)}</a>
        <span class="payload-crumb-sep">/</span>
        <span class="payload-crumb-item active">${title}</span>
      `;
    } else if (State.currentRoute === "globals") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">Dashboard</a>
        <span class="payload-crumb-sep">/</span>
        <span class="payload-crumb-item active">Cấu hình hệ thống</span>
      `;
    } else if (State.currentRoute === "supabase-sync") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">Dashboard</a>
        <span class="payload-crumb-sep">/</span>
        <span class="payload-crumb-item active">Supabase Cloud Engine</span>
      `;
    } else if (State.currentRoute === "api-explorer") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">Dashboard</a>
        <span class="payload-crumb-sep">/</span>
        <span class="payload-crumb-item active">REST API & Schema Explorer</span>
      `;
    }
  }

  // =========================================================================
  // 5. TOPBAR ACTIONS & KEBAB MENU ("MORE..." RULE COMPLIANCE)
  // =========================================================================

  function updateTopbarActions() {
    const area = document.getElementById("topbarActions");
    if (!area) return;

    let primaryBtn = "";
    let secondaryBtn = "";

    if (State.currentRoute === "list") {
      primaryBtn = `<a class="p-btn p-btn-primary p-btn-sm" href="#collection/${State.currentSlug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Tạo mới</a>`;
      secondaryBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnSyncWeb" type="button">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} Đẩy về Web</button>`;
    } else if (State.currentRoute === "editor") {
      primaryBtn = `<button class="p-btn p-btn-primary p-btn-sm" id="btnSaveDoc" type="button">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu thay đổi</button>`;
      secondaryBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnOpenPreviewDrawer" type="button">${window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : ""} Live Preview</button>`;
    } else {
      primaryBtn = `<button class="p-btn p-btn-primary p-btn-sm" id="btnSyncWeb" type="button">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} Đẩy về Web</button>`;
      secondaryBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnOpenSupabaseModal" type="button">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 14 }) : ""} Supabase</button>`;
    }

    const kebabHtml = `
      <div class="payload-kebab-menu" id="topbarKebab">
        <button class="p-btn-icon" id="btnKebabToggle" type="button" aria-label="Thao tác khác" title="Thêm thao tác">···</button>
        <div class="payload-kebab-dropdown" id="kebabDropdown">
          <a class="payload-kebab-item" href="index.html" target="_blank">${window.RusiIcons ? RusiIcons.get("external-link", { size: 14 }) : ""} Mở Web học viên</a>
          <button class="payload-kebab-item" id="kebabSbBtn" type="button">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 14 }) : ""} Cấu hình Supabase</button>
          <button class="payload-kebab-item" id="kebabExportBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Export JSON / data.js</button>
          <button class="payload-kebab-item" id="kebabImportBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Import Backup JSON</button>
          <div class="payload-kebab-divider"></div>
          <button class="payload-kebab-item danger" id="kebabResetBtn" type="button">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Khôi phục gốc (Reset)</button>
        </div>
      </div>
    `;

    area.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        ${primaryBtn}
        ${secondaryBtn}
        ${kebabHtml}
      </div>
    `;

    // Bind event listeners
    const btnSync = document.getElementById("btnSyncWeb");
    if (btnSync) btnSync.onclick = () => {
      syncDataToWeb();
      toast("Đã cập nhật và đột biến dữ liệu runtime thành công trên toàn bộ website!");
    };

    const btnSbModal = document.getElementById("btnOpenSupabaseModal");
    if (btnSbModal) btnSbModal.onclick = openSupabaseModal;

    const btnPreview = document.getElementById("btnOpenPreviewDrawer");
    if (btnPreview) btnPreview.onclick = openLivePreview;

    const btnSave = document.getElementById("btnSaveDoc");
    if (btnSave) btnSave.onclick = saveDocument;

    const kebabBtn = document.getElementById("btnKebabToggle");
    const kebabDropdown = document.getElementById("kebabDropdown");
    if (kebabBtn && kebabDropdown) {
      kebabBtn.onclick = (e) => {
        e.stopPropagation();
        kebabDropdown.classList.toggle("open");
      };
      document.addEventListener("click", () => kebabDropdown.classList.remove("open"));
    }

    const kebabSb = document.getElementById("kebabSbBtn");
    if (kebabSb) kebabSb.onclick = openSupabaseModal;

    const kebabExp = document.getElementById("kebabExportBtn");
    if (kebabExp) kebabExp.onclick = exportData;

    const kebabImp = document.getElementById("kebabImportBtn");
    if (kebabImp) kebabImp.onclick = () => document.getElementById("importFileInput").click();

    const kebabRst = document.getElementById("kebabResetBtn");
    if (kebabRst) kebabRst.onclick = resetAdminData;
  }

  // =========================================================================
  // 6. VIEW 1: DASHBOARD (OVERVIEW)
  // =========================================================================

  function renderDashboard(container) {
    let totalDocs = 0;
    COLLECTION_KEYS.forEach((k) => totalDocs += getMergedList(k).length);

    const isSbConfigured = window.isSupabaseConfigured && window.isSupabaseConfigured();

    let collectionsHtml = "";
    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      const items = getMergedList(key);
      collectionsHtml += `
        <div class="payload-collection-card">
          <div class="payload-collection-card-head">
            <div class="payload-card-icon-wrap">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 24 }) : col.icon}</div>
            <span class="p-pill p-pill-neutral">${items.length} tài liệu</span>
          </div>
          <h3 class="payload-card-title">${esc(col.label)}</h3>
          <p class="payload-card-desc">${esc(col.desc || "Quản lý dữ liệu phân hệ.")}</p>
          <div class="payload-card-foot">
            <a class="p-btn p-btn-ghost p-btn-sm" href="#collection/${col.slug}">Xem danh sách →</a>
            <a class="p-btn p-btn-primary p-btn-sm" href="#collection/${col.slug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Tạo mới</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="payload-dashboard-hero">
        <h1 class="payload-hero-title">
          <span>RUSI TRKI — Payload Studio</span>
          <span class="p-pill p-pill-success" style="font-size:12px">v3.0 Open Source</span>
        </h1>
        <p class="payload-hero-desc">Hệ thống quản trị nội dung Headless CMS mã nguồn mở theo chuẩn PayloadCMS. Dữ liệu được đồng bộ trực tiếp hai chiều giữa Supabase PostgreSQL và Local Web Runtime.</p>
      </div>

      <div class="payload-metrics-grid">
        <div class="payload-metric-card">
          <div class="payload-metric-head">
            <span>Tổng Tài Liệu</span>
            <span>${window.RusiIcons ? RusiIcons.get("book-open-blog", { size: 18 }) : ""}</span>
          </div>
          <div class="payload-metric-value">${totalDocs}</div>
          <div class="payload-metric-sub">Phân bố trên 10 phân hệ</div>
        </div>

        <div class="payload-metric-card">
          <div class="payload-metric-head">
            <span>Cơ Sở Dữ Liệu</span>
            <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 18 }) : ""}</span>
          </div>
          <div class="payload-metric-value" style="font-size:18px;line-height:2">
            ${isSbConfigured ? '<span style="color:var(--p-success)">Supabase Cloud</span>' : '<span style="color:var(--p-warning)">Offline Cache</span>'}
          </div>
          <div class="payload-metric-sub">PostgreSQL + LocalStorage</div>
        </div>

        <div class="payload-metric-card">
          <div class="payload-metric-head">
            <span>Live Propagation</span>
            <span>${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 18 }) : ""}</span>
          </div>
          <div class="payload-metric-value" style="font-size:18px;color:var(--p-primary);line-height:2">Kích hoạt</div>
          <div class="payload-metric-sub">In-place Array Mutation</div>
        </div>

        <div class="payload-metric-card">
          <div class="payload-metric-head">
            <span>Quyền Hạn</span>
            <span>${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 18 }) : ""}</span>
          </div>
          <div class="payload-metric-value" style="font-size:18px;line-height:2">Super Admin</div>
          <div class="payload-metric-sub">Toàn quyền hệ thống</div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h2 style="font-size:18px;font-weight:700;margin:0">Các Bộ Sưu Tập (Collections)</h2>
        <span style="font-size:12.5px;color:var(--p-text-muted)">10 Collections có sẵn</span>
      </div>

      <div class="payload-collections-grid">
        ${collectionsHtml}
      </div>
    `;
  }

  // =========================================================================
  // 7. VIEW 2: COLLECTION LIST (TABLE VIEW)
  // =========================================================================

  function renderCollectionView(container, slug) {
    const col = COLLECTIONS[slug];
    if (!col) {
      container.innerHTML = `<div style="padding:40px;text-align:center">Collection không tồn tại. <a href="#dashboard">Quay lại Dashboard</a></div>`;
      return;
    }

    const allItems = getMergedList(slug);

    let filtered = allItems.filter((item) => {
      const q = State.searchQuery.toLowerCase();
      const textToSearch = [
        item.id,
        item.slug,
        item.title,
        item.name,
        item.ru,
        item.vi,
        item.desc,
        item.level
      ].filter(Boolean).join(" ").toLowerCase();

      if (q && !textToSearch.includes(q)) return false;

      if (State.filterLevel !== "all" && item.level) {
        if (!item.level.toLowerCase().includes(State.filterLevel.toLowerCase())) return false;
      }

      if (State.filterPro === "pro" && String(item.is_pro_only) !== "true") return false;
      if (State.filterPro === "free" && String(item.is_pro_only) === "true") return false;

      if (State.filterSource === "admin" && item.__source !== "admin") return false;
      if (State.filterSource === "original" && item.__source !== "original") return false;

      return true;
    });

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / State.pageSize));
    State.currentPage = Math.min(State.currentPage, totalPages);
    const startIndex = (State.currentPage - 1) * State.pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + State.pageSize);

    let rowsHtml = "";
    if (paginatedItems.length === 0) {
      rowsHtml = `
        <tr>
          <td colspan="7" style="text-align:center;padding:48px 20px;color:var(--p-text-muted)">
            <div style="margin-bottom:8px;color:var(--p-text-muted)">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 36 }) : ""}</div>
            <div>Không tìm thấy tài liệu nào phù hợp với bộ lọc hiện tại.</div>
            <button class="p-btn p-btn-secondary p-btn-sm" style="margin-top:12px" onclick="window.clearFilters()">Xóa bộ lọc</button>
          </td>
        </tr>
      `;
    } else {
      paginatedItems.forEach((it) => {
        const idKey = it.id || it.slug || it.title;
        const isChecked = State.selectedRows.has(idKey);
        const titleText = it.title || it.name || it.ru || it.id;
        const subText = it.desc || it.vi || (it.parts ? `${it.parts.length} phần thi` : "");
        const levelBadge = it.level ? `<span class="p-pill p-pill-info">${esc(it.level)}</span>` : "";
        const proBadge = String(it.is_pro_only) === "true" || it.is_pro ? `<span class="p-pill p-pill-warning">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 12 }) : ""} PRO</span>` : `<span class="p-pill p-pill-neutral">Free</span>`;
        const sourceBadge = it.__source === "admin" ? `<span class="p-pill p-pill-violet">Admin sửa</span>` : `<span class="p-pill p-pill-neutral">Bản gốc</span>`;

        rowsHtml += `
          <tr>
            <td class="payload-table-check">
              <input type="checkbox" class="row-checkbox" data-id="${escAttr(idKey)}" ${isChecked ? "checked" : ""} />
            </td>
            <td>
              <div style="font-weight:600;font-size:13.5px">${esc(titleText)}</div>
              ${subText ? `<div style="font-size:12px;color:var(--p-text-muted);margin-top:2px;max-width:320px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(subText)}</div>` : ""}
            </td>
            <td><code>${esc(idKey)}</code></td>
            <td>${levelBadge || "—"}</td>
            <td>${proBadge}</td>
            <td>${sourceBadge}</td>
            <td>
              <div class="payload-row-actions">
                <a class="p-btn p-btn-ghost p-btn-sm" href="#collection/${slug}/edit/${encodeURIComponent(idKey)}" title="Chỉnh sửa">${window.RusiIcons ? RusiIcons.get("edit-3", { size: 14 }) : "Sửa"}</a>
                <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.cloneDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Nhân bản">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 14 }) : "Copy"}</button>
                <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.deleteDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Xóa" style="color:var(--p-danger)">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : "Xóa"}</button>
              </div>
            </td>
          </tr>
        `;
      });
    }

    container.innerHTML = `
      <div class="payload-list-header">
        <div class="payload-list-title-wrap">
          <span style="font-size:24px;display:inline-flex;align-items:center">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 28 }) : col.icon}</span>
          <h1 class="payload-list-title">${esc(col.label)}</h1>
          <span class="p-pill p-pill-neutral">${allItems.length}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <a class="p-btn p-btn-primary" href="#collection/${slug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm mới</a>
          <a class="p-btn p-btn-secondary" href="${col.webUrl}" target="_blank" title="Mở trang tương ứng của học viên">${window.RusiIcons ? RusiIcons.get("external-link", { size: 14 }) : ""} Xem trên web</a>
        </div>
      </div>

      <div class="payload-toolbar">
        <div class="payload-toolbar-left">
          <div class="payload-search-box">
            <span class="payload-search-icon">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 16 }) : ""}</span>
            <input type="text" class="payload-search-input" id="tableSearch" placeholder="Tìm kiếm theo tiêu đề, ID, từ khóa..." value="${escAttr(State.searchQuery)}" />
          </div>

          <select class="payload-filter-select" id="filterLevel">
            <option value="all" ${State.filterLevel === "all" ? "selected" : ""}>Tất cả cấp độ</option>
            <option value="A1" ${State.filterLevel === "A1" ? "selected" : ""}>Cấp độ A1</option>
            <option value="A2" ${State.filterLevel === "A2" ? "selected" : ""}>Cấp độ A2</option>
            <option value="B1" ${State.filterLevel === "B1" ? "selected" : ""}>Cấp độ B1</option>
            <option value="B2" ${State.filterLevel === "B2" ? "selected" : ""}>Cấp độ B2</option>
          </select>

          <select class="payload-filter-select" id="filterPro">
            <option value="all" ${State.filterPro === "all" ? "selected" : ""}>Tất cả gói</option>
            <option value="free" ${State.filterPro === "free" ? "selected" : ""}>Chỉ Miễn phí</option>
            <option value="pro" ${State.filterPro === "pro" ? "selected" : ""}>Chỉ VIP PRO</option>
          </select>

          <select class="payload-filter-select" id="filterSource">
            <option value="all" ${State.filterSource === "all" ? "selected" : ""}>Tất cả nguồn</option>
            <option value="original" ${State.filterSource === "original" ? "selected" : ""}>Bản gốc data.js</option>
            <option value="admin" ${State.filterSource === "admin" ? "selected" : ""}>Admin đã sửa</option>
          </select>
        </div>
      </div>

      <div class="payload-bulk-bar" id="bulkBar">
        <div style="font-weight:600;font-size:13px" id="bulkCountText">Đã chọn 0 mục</div>
        <div style="display:flex;gap:8px">
          <button class="p-btn p-btn-danger p-btn-sm" id="btnBulkDelete" type="button">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Xoá mục đã chọn</button>
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnBulkMakePro" type="button">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""} Đặt thành PRO</button>
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnBulkMakeFree" type="button">${window.RusiIcons ? RusiIcons.get("award-badge", { size: 14 }) : ""} Đặt thành Miễn phí</button>
        </div>
      </div>

      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table">
            <thead>
              <tr>
                <th class="payload-table-check">
                  <input type="checkbox" id="selectAllCheckbox" />
                </th>
                <th>Tiêu Đề / Tên Gọi</th>
                <th>Mã ID</th>
                <th>Cấp Độ</th>
                <th>Quyền Hạn</th>
                <th>Nguồn Dữ Liệu</th>
                <th style="text-align:right">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <div class="payload-pagination">
        <div>
          Hiển thị <strong>${totalItems === 0 ? 0 : startIndex + 1}</strong> – <strong>${Math.min(startIndex + State.pageSize, totalItems)}</strong> trên <strong>${totalItems}</strong> mục
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnPrevPage" ${State.currentPage <= 1 ? "disabled" : ""}>← Trang trước</button>
          <span style="font-family:var(--p-font-mono)">Trang ${State.currentPage} / ${totalPages}</span>
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnNextPage" ${State.currentPage >= totalPages ? "disabled" : ""}>Trang sau →</button>
        </div>
      </div>
    `;

    // Search input handler
    const searchInp = document.getElementById("tableSearch");
    if (searchInp) {
      let timer;
      searchInp.oninput = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          State.searchQuery = e.target.value.trim();
          State.currentPage = 1;
          renderCollectionView(container, slug);
        }, 200);
      };
    }

    const fLevel = document.getElementById("filterLevel");
    if (fLevel) fLevel.onchange = (e) => { State.filterLevel = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    const fPro = document.getElementById("filterPro");
    if (fPro) fPro.onchange = (e) => { State.filterPro = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    const fSource = document.getElementById("filterSource");
    if (fSource) fSource.onchange = (e) => { State.filterSource = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    // Select All
    const chkAll = document.getElementById("selectAllCheckbox");
    if (chkAll) {
      chkAll.onchange = (e) => {
        document.querySelectorAll(".row-checkbox").forEach((cb) => {
          cb.checked = e.target.checked;
          const id = cb.getAttribute("data-id");
          if (e.target.checked) State.selectedRows.add(id);
          else State.selectedRows.delete(id);
        });
        updateBulkBar();
      };
    }

    document.querySelectorAll(".row-checkbox").forEach((cb) => {
      cb.onchange = (e) => {
        const id = cb.getAttribute("data-id");
        if (e.target.checked) State.selectedRows.add(id);
        else State.selectedRows.delete(id);
        updateBulkBar();
      };
    });

    const btnPrev = document.getElementById("btnPrevPage");
    if (btnPrev) btnPrev.onclick = () => { if (State.currentPage > 1) { State.currentPage--; renderCollectionView(container, slug); } };

    const btnNext = document.getElementById("btnNextPage");
    if (btnNext) btnNext.onclick = () => { if (State.currentPage < totalPages) { State.currentPage++; renderCollectionView(container, slug); } };

    const btnBulkDel = document.getElementById("btnBulkDelete");
    if (btnBulkDel) btnBulkDel.onclick = () => bulkDelete(slug);

    const btnBulkPro = document.getElementById("btnBulkMakePro");
    if (btnBulkPro) btnBulkPro.onclick = () => bulkUpdateField(slug, "is_pro_only", true);

    const btnBulkFree = document.getElementById("btnBulkMakeFree");
    if (btnBulkFree) btnBulkFree.onclick = () => bulkUpdateField(slug, "is_pro_only", false);

    updateBulkBar();
  }

  function updateBulkBar() {
    const bar = document.getElementById("bulkBar");
    const txt = document.getElementById("bulkCountText");
    if (!bar || !txt) return;

    if (State.selectedRows.size > 0) {
      bar.classList.add("visible");
      txt.textContent = `Đã chọn ${State.selectedRows.size} tài liệu`;
    } else {
      bar.classList.remove("visible");
    }
  }

  window.clearFilters = function () {
    State.searchQuery = "";
    State.filterLevel = "all";
    State.filterPro = "all";
    State.filterSource = "all";
    State.currentPage = 1;
    handleRoute();
  };

  // =========================================================================
  // 8. VIEW 3: DOCUMENT EDITOR (PAYLOAD 2-COLUMN WITH LIVE BINDING)
  // =========================================================================

  function renderDocumentEditor(container, slug) {
    const col = COLLECTIONS[slug];
    if (!col || !State.currentDraft) return;

    const draft = State.currentDraft;

    // Build form field inputs with two-way binding
    let formFieldsHtml = "";
    col.fields.forEach((f) => {
      const val = draft[f.key] != null ? draft[f.key] : (f.defaultValue != null ? f.defaultValue : "");

      if (f.type === "select") {
        const opts = (f.options || []).map((o) => `<option value="${escAttr(o.v)}" ${String(val) === String(o.v) ? "selected" : ""}>${esc(o.l)}</option>`).join("");
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <select class="p-select live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}">${opts}</select>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "textarea") {
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <textarea class="p-textarea live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" rows="4">${esc(val)}</textarea>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "list-lines") {
        const linesVal = Array.isArray(val) ? val.join("\n") : (val || "");
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <textarea class="p-textarea live-draft-field-lines" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" rows="5" placeholder="Mỗi dòng là một mục...">${esc(linesVal)}</textarea>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else {
        const isIdDisabled = !State.isCreating && (f.key === "id" || f.key === "slug");
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <input type="${f.type === "number" ? "number" : "text"}" class="p-input live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" value="${escAttr(val)}" ${isIdDisabled ? "readonly style='background:var(--p-surface-hover);cursor:not-allowed'" : ""} />
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      }
    });

    const structureHtml = renderActiveStructureBuilder(slug, draft);
    const jsonString = JSON.stringify(draft, null, 2);

    container.innerHTML = `
      <div class="payload-doc-editor">
        <!-- Main Content Area -->
        <div class="payload-doc-main">
          <!-- Editor Tabs -->
          <div class="payload-editor-tabs">
            <button class="payload-editor-tab ${State.activeEditorTab === "content" ? "active" : ""}" type="button" onclick="window.switchEditorTab('content')">
              ${window.RusiIcons ? RusiIcons.get("file-text", { size: 14 }) : ""} Nội dung chính
            </button>
            <button class="payload-editor-tab ${State.activeEditorTab === "structure" ? "active" : ""}" type="button" onclick="window.switchEditorTab('structure')">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 14 }) : ""} Cấu trúc Array Builder
            </button>
            <button class="payload-editor-tab ${State.activeEditorTab === "json" ? "active" : ""}" type="button" onclick="window.switchEditorTab('json')">
              ${window.RusiIcons ? RusiIcons.get("keyboard-cyrillic", { size: 14 }) : ""} JSON / Mã nguồn
            </button>
          </div>

          <!-- Tab 1: Content Fields -->
          <div id="tabContent" style="display:${State.activeEditorTab === "content" ? "block" : "none"}">
            <form id="docForm">
              ${formFieldsHtml}
            </form>
          </div>

          <!-- Tab 2: Structure / Array Builder -->
          <div id="tabStructure" style="display:${State.activeEditorTab === "structure" ? "block" : "none"}">
            ${structureHtml}
          </div>

          <!-- Tab 3: JSON / Code Editor -->
          <div id="tabJson" style="display:${State.activeEditorTab === "json" ? "block" : "none"}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:12.5px;color:var(--p-text-muted)">Chỉnh sửa JSON trực tiếp với kiểm tra cú pháp thời gian thực:</span>
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.formatJsonEditor()">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Format JSON</button>
            </div>
            <textarea class="payload-code-editor" id="jsonEditorArea">${esc(jsonString)}</textarea>
          </div>
        </div>

        <!-- Sidebar Meta Area -->
        <div class="payload-doc-sidebar">
          <div class="payload-doc-card">
            <div class="payload-doc-card-title">
              <span>Thông tin tài liệu</span>
              <span class="p-pill p-pill-success">Published</span>
            </div>
            <div style="font-size:12.5px;color:var(--p-text-muted);display:flex;flex-direction:column;gap:10px">
              <div>
                <span style="color:var(--p-text-dim)">Mã ID:</span>
                <code style="float:right">${esc(draft.id || draft.slug || draft.title || "(Chưa đặt)")}</code>
              </div>
              <div>
                <span style="color:var(--p-text-dim)">Collection:</span>
                <span style="float:right;font-weight:600;color:var(--p-text)">${esc(col.label)}</span>
              </div>
              <div>
                <span style="color:var(--p-text-dim)">Trạng thái:</span>
                <span style="float:right">${State.isCreating ? '<span class="p-pill p-pill-warning">Mới</span>' : '<span class="p-pill p-pill-info">Đang sửa</span>'}</span>
              </div>
              <div>
                <span style="color:var(--p-text-dim)">Supabase Cloud:</span>
                <span style="float:right"><span class="p-pill p-pill-success">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 12 }) : ""} Tự động đẩy Cloud</span></span>
              </div>
            </div>
          </div>

          <div class="payload-doc-card">
            <div class="payload-doc-card-title">Hành động</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="p-btn p-btn-primary" type="button" onclick="window.saveDocument()">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu & Đồng bộ Cloud (Supabase)</button>
              <button class="p-btn p-btn-secondary" type="button" onclick="window.openLivePreview()">${window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : ""} Live Preview Studio</button>
              <a class="p-btn p-btn-ghost" href="#collection/${slug}">Huỷ & Quay lại</a>
            </div>
          </div>

          ${!State.isCreating && State.currentDocId ? `
            <div class="payload-doc-card" style="border-color:var(--p-danger-soft)">
              <div class="payload-doc-card-title" style="color:var(--p-danger)">Vùng nguy hiểm</div>
              <p style="font-size:12px;color:var(--p-text-muted);margin:0 0 12px 0">Xóa tài liệu này khỏi bộ sưu tập (có thể khôi phục từ data.js bất kỳ lúc nào).</p>
              <button class="p-btn p-btn-danger p-btn-sm" type="button" onclick="window.deleteDocument('${escAttr(slug)}', '${escAttr(State.currentDocId)}')">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Xoá tài liệu này</button>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    // Bind two-way live field inputs
    document.querySelectorAll(".live-draft-field").forEach((inp) => {
      inp.oninput = (e) => {
        const key = e.target.getAttribute("data-key");
        const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        State.currentDraft[key] = val;
      };
      inp.onchange = (e) => {
        const key = e.target.getAttribute("data-key");
        const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        State.currentDraft[key] = val;
      };
    });

    document.querySelectorAll(".live-draft-field-lines").forEach((inp) => {
      inp.oninput = (e) => {
        const key = e.target.getAttribute("data-key");
        State.currentDraft[key] = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean);
      };
    });

    const jsonArea = document.getElementById("jsonEditorArea");
    if (jsonArea) {
      jsonArea.onchange = () => {
        try {
          const parsed = JSON.parse(jsonArea.value);
          State.currentDraft = parsed;
        } catch (e) {
          // Keep draft as is
        }
      };
    }
  }

  window.switchEditorTab = function (tab) {
    State.activeEditorTab = tab;

    // Sync state before switching
    if (tab === "json") {
      const jsonArea = document.getElementById("jsonEditorArea");
      if (jsonArea) {
        jsonArea.value = JSON.stringify(State.currentDraft, null, 2);
      }
    } else if (tab === "structure") {
      const tabS = document.getElementById("tabStructure");
      if (tabS && State.currentSlug && State.currentDraft) {
        tabS.innerHTML = renderActiveStructureBuilder(State.currentSlug, State.currentDraft);
      }
    }

    const tabC = document.getElementById("tabContent");
    const tabS = document.getElementById("tabStructure");
    const tabJ = document.getElementById("tabJson");

    if (tabC) tabC.style.display = tab === "content" ? "block" : "none";
    if (tabS) tabS.style.display = tab === "structure" ? "block" : "none";
    if (tabJ) tabJ.style.display = tab === "json" ? "block" : "none";

    document.querySelectorAll(".payload-editor-tab").forEach((btn, idx) => {
      btn.classList.toggle("active", (idx === 0 && tab === "content") || (idx === 1 && tab === "structure") || (idx === 2 && tab === "json"));
    });
  };

  window.formatJsonEditor = function () {
    const el = document.getElementById("jsonEditorArea");
    if (!el) return;
    try {
      const obj = JSON.parse(el.value);
      State.currentDraft = obj;
      el.value = JSON.stringify(obj, null, 2);
      toast("Đã định dạng JSON chuẩn.");
    } catch (e) {
      toast("Lỗi cú pháp JSON: " + e.message);
    }
  };

  // =========================================================================
  // 9. ARRAY BUILDERS (TRKI, VOCAB, LISTENING, SPEAKING, PACKAGES)
  // =========================================================================

  function renderActiveStructureBuilder(slug, draft) {
    if (slug === "TRKI_BANK") {
      return renderTrkiPartsBuilder(draft.parts || []);
    } else if (slug === "VOCAB_JARS" || slug === "VOCAB_LESSONS") {
      return renderVocabWordsBuilder(draft.words || []);
    } else if (slug === "TOPIC_ARTICLES") {
      return renderTopicArticleBuilder(draft.dialogues || [], draft.grammar || {}, draft.vocabTable || []);
    } else if (slug === "GRAMMAR_LESSONS") {
      return renderGrammarBuilder(draft.rules || [], draft.table || {}, draft.quickQuiz || []);
    } else if (slug === "LISTENING_LESSONS") {
      return renderListeningBuilder(draft.lines || [], draft.questions || []);
    } else if (slug === "SPEAKING_SETS") {
      return renderSpeakingBuilder(draft.items || []);
    } else if (slug === "PACKAGES") {
      return renderPackagesFeaturesBuilder(draft.features || []);
    } else if (slug === "WRITING_TASKS") {
      return renderWritingTipsBuilder(draft.suggested_words || [], draft.tips || []);
    } else {
      return `<div style="padding:24px;color:var(--p-text-muted)">Phân hệ này không yêu cầu Array Builder phức tạp. Vui lòng chỉnh sửa tại tab Nội dung chính hoặc JSON.</div>`;
    }
  }

  // --- TRKI Parts & Questions Builder ---
  function renderTrkiPartsBuilder(parts) {
    let partsHtml = "";
    parts.forEach((p, pIdx) => {
      let questionsHtml = "";
      (p.questions || []).forEach((q, qIdx) => {
        const opts = (q.options || []).join("\n");
        questionsHtml += `
          <div class="payload-array-row" style="margin-bottom:10px">
            <span class="payload-array-row-num">Q${qIdx + 1}</span>
            <div class="payload-array-row-fields">
              <input type="text" class="p-input" placeholder="Câu hỏi hoặc câu điền khuyết..." value="${escAttr(q.q || "")}" oninput="window.updateTrkiQuestion(${pIdx}, ${qIdx}, 'q', this.value)" />
              <div style="display:flex;gap:10px">
                <textarea class="p-textarea" rows="3" placeholder="Các phương án (mỗi dòng 1 phương án)..." oninput="window.updateTrkiQuestionOptions(${pIdx}, ${qIdx}, this.value)">${esc(opts)}</textarea>
                <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                  <label class="p-label" style="font-size:11px">Đáp án đúng:</label>
                  <select class="p-select" onchange="window.updateTrkiQuestion(${pIdx}, ${qIdx}, 'a', Number(this.value))">
                    <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                    <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                    <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                    <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                  </select>
                </div>
              </div>
              <input type="text" class="p-input" placeholder="Giải thích ngữ pháp..." value="${escAttr(q.ex || "")}" oninput="window.updateTrkiQuestion(${pIdx}, ${qIdx}, 'ex', this.value)" />
            </div>
            <button class="p-btn-icon" type="button" onclick="window.removeTrkiQuestion(${pIdx}, ${qIdx})" title="Xóa câu hỏi">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
          </div>
        `;
      });

      partsHtml += `
        <div class="payload-array-container" style="margin-bottom:20px">
          <div class="payload-array-header">
            <div>
              <span style="font-weight:700;font-size:14px">${esc(p.name || `Phần ${pIdx + 1}`)}</span>
              <span style="font-size:12px;color:var(--p-text-muted);margin-left:8px">(${p.questions ? p.questions.length : 0} câu hỏi)</span>
            </div>
            <div style="display:flex;gap:6px">
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addTrkiQuestion(${pIdx})">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
              <button class="p-btn-icon" type="button" onclick="window.removeTrkiPart(${pIdx})" title="Xoá phần thi này">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
            </div>
          </div>
          <div class="payload-array-items">
            ${questionsHtml || '<div style="padding:16px;text-align:center;color:var(--p-text-muted)">Chưa có câu hỏi. Bấm "Thêm câu hỏi" để tạo.</div>'}
          </div>
        </div>
      `;
    });

    return `
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <span style="font-weight:700">Cấu trúc các Phần thi TRKI (${parts.length} phần):</span>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiPart()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm phần thi mới</button>
        </div>
        ${partsHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có phần thi nào.</div>'}
      </div>
    `;
  }

  window.addTrkiPart = function () {
    if (!State.currentDraft) return;
    State.currentDraft.parts = State.currentDraft.parts || [];
    State.currentDraft.parts.push({
      id: "part_" + (State.currentDraft.parts.length + 1),
      name: `Часть ${State.currentDraft.parts.length + 1}. Mới`,
      vi: `Phần ${State.currentDraft.parts.length + 1}. Mới`,
      questions: [
        { q: "Câu hỏi mẫu 1", options: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"], a: 0, ex: "Giải thích..." }
      ]
    });
    refreshStructureTab();
  };

  window.removeTrkiPart = function (pIdx) {
    if (!State.currentDraft || !State.currentDraft.parts) return;
    if (confirm("Bạn có chắc chắn muốn xoá phần thi này?")) {
      State.currentDraft.parts.splice(pIdx, 1);
      refreshStructureTab();
    }
  };

  window.addTrkiQuestion = function (pIdx) {
    if (!State.currentDraft || !State.currentDraft.parts || !State.currentDraft.parts[pIdx]) return;
    State.currentDraft.parts[pIdx].questions = State.currentDraft.parts[pIdx].questions || [];
    State.currentDraft.parts[pIdx].questions.push({
      q: "",
      options: ["", "", "", ""],
      a: 0,
      ex: ""
    });
    refreshStructureTab();
  };

  window.removeTrkiQuestion = function (pIdx, qIdx) {
    if (!State.currentDraft || !State.currentDraft.parts || !State.currentDraft.parts[pIdx]) return;
    State.currentDraft.parts[pIdx].questions.splice(qIdx, 1);
    refreshStructureTab();
  };

  window.updateTrkiQuestion = function (pIdx, qIdx, field, val) {
    if (!State.currentDraft || !State.currentDraft.parts || !State.currentDraft.parts[pIdx]) return;
    const q = State.currentDraft.parts[pIdx].questions[qIdx];
    if (q) q[field] = val;
  };

  window.updateTrkiQuestionOptions = function (pIdx, qIdx, textVal) {
    if (!State.currentDraft || !State.currentDraft.parts || !State.currentDraft.parts[pIdx]) return;
    const q = State.currentDraft.parts[pIdx].questions[qIdx];
    if (q) {
      q.options = textVal.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  };

  // --- Vocab Jar Words Builder ---
  function renderVocabWordsBuilder(words) {
    let rowsHtml = "";
    words.forEach((w, idx) => {
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">#${idx + 1} - ${escAttr(w.ru || "Từ mới")}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeVocabWord(${idx})" title="Xóa từ này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div class="payload-array-row-fields" style="display:flex;flex-direction:column;gap:8px">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px">
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Từ tiếng Nga & trọng âm (*)</label>
                <input type="text" class="p-input" placeholder="ví dụ: я́блоко" value="${escAttr(w.ru || "")}" oninput="window.updateVocabWord(${idx}, 'ru', this.value)" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Nghĩa tiếng Việt (*)</label>
                <input type="text" class="p-input" placeholder="quả táo" value="${escAttr(w.vi || "")}" oninput="window.updateVocabWord(${idx}, 'vi', this.value)" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Từ loại (POS)</label>
                <select class="p-input" onchange="window.updateVocabWord(${idx}, 'pos', this.value)">
                  <option value="" ${!w.pos ? 'selected' : ''}>-- Chọn từ loại --</option>
                  <option value="danh từ" ${w.pos === 'danh từ' ? 'selected' : ''}>Danh từ (Существительное)</option>
                  <option value="động từ" ${w.pos === 'động từ' ? 'selected' : ''}>Động từ (Глагол)</option>
                  <option value="tính từ" ${w.pos === 'tính từ' ? 'selected' : ''}>Tính từ (Прилагательное)</option>
                  <option value="phó từ" ${w.pos === 'phó từ' ? 'selected' : ''}>Phó từ (Наречие)</option>
                  <option value="đại từ" ${w.pos === 'đại từ' ? 'selected' : ''}>Đại từ (Местоимение)</option>
                  <option value="giới từ" ${w.pos === 'giới từ' ? 'selected' : ''}>Giới từ (Предлог)</option>
                </select>
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Giống / Thể động từ</label>
                <input type="text" class="p-input" placeholder="đực/cái/trung hoặc НСВ/СВ" value="${escAttr(w.gender || w.aspect || "")}" oninput="window.updateVocabWord(${idx}, 'gender', this.value)" />
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px">
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Cụm kết hợp (Collocation)</label>
                <input type="text" class="p-input" placeholder="ăn táo (есть яблоко)..." value="${escAttr(w.collocation || "")}" oninput="window.updateVocabWord(${idx}, 'collocation', this.value)" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Đồng nghĩa (Synonyms)</label>
                <input type="text" class="p-input" placeholder="từ đồng nghĩa..." value="${escAttr(Array.isArray(w.synonyms) ? w.synonyms.join(', ') : (w.synonyms || ''))}" oninput="window.updateVocabWord(${idx}, 'synonyms', this.value.split(',').map(s=>s.trim()).filter(Boolean))" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Trái nghĩa (Antonyms)</label>
                <input type="text" class="p-input" placeholder="từ trái nghĩa..." value="${escAttr(Array.isArray(w.antonyms) ? w.antonyms.join(', ') : (w.antonyms || ''))}" oninput="window.updateVocabWord(${idx}, 'antonyms', this.value.split(',').map(s=>s.trim()).filter(Boolean))" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Chủ đề con (Sub-topic)</label>
                <input type="text" class="p-input" placeholder="Trái cây, Thực phẩm..." value="${escAttr(w.sub_topic || "")}" oninput="window.updateVocabWord(${idx}, 'sub_topic', this.value)" />
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Câu ví dụ song ngữ</label>
                <input type="text" class="p-input" placeholder="Я люблю сладкие яблоки (Tôi thích những quả táo ngọt)..." value="${escAttr(w.ex || "")}" oninput="window.updateVocabWord(${idx}, 'ex', this.value)" />
              </div>
              <div>
                <label style="font-size:11px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:2px">Ghi chú ngữ pháp / Quản cách</label>
                <input type="text" class="p-input" placeholder="cách 2 số nhiều: яблок..." value="${escAttr(w.note || "")}" oninput="window.updateVocabWord(${idx}, 'note', this.value)" />
              </div>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <span style="font-weight:700;font-size:15px">Danh sách từ vựng chuyên sâu (${words.length} từ)</span>
            <div style="font-size:12px;color:var(--p-text-muted);margin-top:2px">Hỗ trợ đầy đủ trọng âm, từ loại, cụm kết hợp (collocation), từ đồng nghĩa, trái nghĩa và ví dụ song ngữ theo Spec Module 1.</div>
          </div>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addVocabWord()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm từ mới</button>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="text-align:center;padding:24px;color:var(--p-text-muted)">Chưa có từ nào trong lọ. Bấm "Thêm từ mới" để tạo.</div>'}
        </div>
      </div>
    `;
  }

  window.addVocabWord = function () {
    if (!State.currentDraft) return;
    State.currentDraft.words = State.currentDraft.words || [];
    State.currentDraft.words.push({ ru: "", vi: "", pos: "danh từ", gender: "", collocation: "", synonyms: [], antonyms: [], ex: "", note: "", sub_topic: "" });
    refreshStructureTab();
  };

  window.removeVocabWord = function (idx) {
    if (!State.currentDraft || !State.currentDraft.words) return;
    State.currentDraft.words.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateVocabWord = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.words || !State.currentDraft.words[idx]) return;
    State.currentDraft.words[idx][field] = val;
  };

  // --- Topic Article Builder (Dialogues, Grammar, Vocab Table) ---
  function renderTopicArticleBuilder(dialogues, grammar, vocabTable) {
    let diaHtml = "";
    (dialogues || []).forEach((d, idx) => {
      diaHtml += `
        <div class="payload-array-row" style="margin-bottom:8px;padding:10px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
            <span class="payload-array-row-num" style="font-weight:700">#${idx + 1}</span>
            <input type="text" class="p-input" placeholder="Người nói (Анна / Иван)..." value="${escAttr(d.who || "")}" oninput="window.updateArticleDialogue(${idx}, 'who', this.value)" style="max-width:180px" />
            <button class="p-btn-icon" type="button" onclick="window.removeArticleDialogue(${idx})" title="Xóa dòng" style="margin-left:auto;color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <textarea class="p-input" rows="2" placeholder="Lời thoại tiếng Nga (có trọng âm)..." oninput="window.updateArticleDialogue(${idx}, 'ru', this.value)">${escAttr(d.ru || "")}</textarea>
            <textarea class="p-input" rows="2" placeholder="Dịch nghĩa tiếng Việt..." oninput="window.updateArticleDialogue(${idx}, 'vi', this.value)">${escAttr(d.vi || "")}</textarea>
          </div>
        </div>
      `;
    });

    let vtHtml = "";
    (vocabTable || []).forEach((v, idx) => {
      vtHtml += `
        <div style="display:grid;grid-template-columns:1fr 100px 1.5fr 36px;gap:8px;align-items:center;margin-bottom:6px">
          <input type="text" class="p-input" placeholder="Từ vựng (trọng âm)..." value="${escAttr(v.word || "")}" oninput="window.updateArticleVocabRow(${idx}, 'word', this.value)" />
          <input type="text" class="p-input" placeholder="Loại từ..." value="${escAttr(v.type || "")}" oninput="window.updateArticleVocabRow(${idx}, 'type', this.value)" />
          <input type="text" class="p-input" placeholder="Giải nghĩa tiếng Việt..." value="${escAttr(v.meaning || "")}" oninput="window.updateArticleVocabRow(${idx}, 'meaning', this.value)" />
          <button class="p-btn-icon" type="button" onclick="window.removeArticleVocabRow(${idx})" title="Xóa" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
        </div>
      `;
    });

    const g = grammar || {};

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        <!-- Section 1: Đối thoại -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">1. Hội thoại mẫu song ngữ (${(dialogues || []).length} lượt thoại)</span>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addArticleDialogue()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm lời thoại</button>
          </div>
          <div class="payload-array-items">
            ${diaHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có hội thoại nào. Bấm "Thêm lời thoại" để tạo.</div>'}
          </div>
        </div>

        <!-- Section 2: Ngữ pháp trọng điểm -->
        <div class="payload-array-container" style="padding:14px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:8px">
          <span style="font-weight:700;font-size:14px;display:block;margin-bottom:10px">2. Ngữ pháp trọng điểm trong bài đọc</span>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Tiêu đề điểm ngữ pháp</label>
              <input type="text" class="p-input" placeholder="ví dụ: Quy tắc sử dụng giới từ В và НА..." value="${escAttr(g.title || "")}" oninput="window.updateArticleGrammar('title', this.value)" />
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Nội dung quy tắc / Giải thích chi tiết</label>
              <textarea class="p-input" rows="3" placeholder="Trình bày cấu trúc, ví dụ minh họa và quy tắc ngữ pháp..." oninput="window.updateArticleGrammar('rule', this.value)">${escAttr(g.rule || "")}</textarea>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Lưu ý & trường hợp đặc biệt (Note)</label>
              <input type="text" class="p-input" placeholder="Ngoại lệ hoặc bẫy hay gặp trong kỳ thi..." value="${escAttr(g.note || "")}" oninput="window.updateArticleGrammar('note', this.value)" />
            </div>
          </div>
        </div>

        <!-- Section 3: Bảng từ vựng trọng tâm -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">3. Bảng từ vựng trọng tâm (${(vocabTable || []).length} mục)</span>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addArticleVocabRow()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm từ</button>
          </div>
          <div class="payload-array-items">
            ${vtHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có từ vựng bảng biểu.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  window.addArticleDialogue = function () {
    if (!State.currentDraft) return;
    State.currentDraft.dialogues = State.currentDraft.dialogues || [];
    State.currentDraft.dialogues.push({ who: "", ru: "", vi: "" });
    refreshStructureTab();
  };

  window.removeArticleDialogue = function (idx) {
    if (!State.currentDraft || !State.currentDraft.dialogues) return;
    State.currentDraft.dialogues.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateArticleDialogue = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.dialogues || !State.currentDraft.dialogues[idx]) return;
    State.currentDraft.dialogues[idx][field] = val;
  };

  window.updateArticleGrammar = function (field, val) {
    if (!State.currentDraft) return;
    State.currentDraft.grammar = State.currentDraft.grammar || {};
    State.currentDraft.grammar[field] = val;
  };

  window.addArticleVocabRow = function () {
    if (!State.currentDraft) return;
    State.currentDraft.vocabTable = State.currentDraft.vocabTable || [];
    State.currentDraft.vocabTable.push({ word: "", type: "n.", meaning: "" });
    refreshStructureTab();
  };

  window.removeArticleVocabRow = function (idx) {
    if (!State.currentDraft || !State.currentDraft.vocabTable) return;
    State.currentDraft.vocabTable.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateArticleVocabRow = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.vocabTable || !State.currentDraft.vocabTable[idx]) return;
    State.currentDraft.vocabTable[idx][field] = val;
  };

  // --- Grammar Lessons Builder (Rules, Table, Quick Quiz) ---
  function renderGrammarBuilder(rules, table, quickQuiz) {
    let rulesHtml = "";
    (rules || []).forEach((r, idx) => {
      rulesHtml += `
        <div class="payload-array-row" style="margin-bottom:10px;padding:12px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span class="payload-array-row-num" style="font-weight:700">Quy tắc #${idx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeGrammarRule(${idx})" title="Xóa quy tắc" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <input type="text" class="p-input" placeholder="Tiêu đề quy tắc..." value="${escAttr(r.title || "")}" oninput="window.updateGrammarRule(${idx}, 'title', this.value)" />
            <textarea class="p-input" rows="2" placeholder="Giải thích chi tiết công thức và quy tắc..." oninput="window.updateGrammarRule(${idx}, 'content', this.value)">${escAttr(r.content || "")}</textarea>
            <input type="text" class="p-input" placeholder="Ví dụ song ngữ (phân cách bằng dấu chấm phẩy)..." value="${escAttr(Array.isArray(r.examples) ? r.examples.join('; ') : (r.examples || ''))}" oninput="window.updateGrammarRule(${idx}, 'examples', this.value.split(';').map(s=>s.trim()).filter(Boolean))" />
          </div>
        </div>
      `;
    });

    let quizHtml = "";
    (quickQuiz || []).forEach((q, idx) => {
      const opts = q.options || [];
      quizHtml += `
        <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="payload-array-row-num" style="font-weight:700">Câu củng cố #${idx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeGrammarQuiz(${idx})" title="Xóa câu hỏi" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <input type="text" class="p-input" placeholder="Câu hỏi hoặc câu cần điền từ..." value="${escAttr(q.q || q.question || "")}" oninput="window.updateGrammarQuiz(${idx}, 'q', this.value)" />
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:6px">
              ${[0, 1, 2, 3].map(oi => `
                <div style="display:flex;align-items:center;gap:4px">
                  <input type="radio" name="g_correct_${idx}" ${q.answer === oi ? 'checked' : ''} onchange="window.updateGrammarQuiz(${idx}, 'answer', ${oi})" title="Đáp án đúng" />
                  <input type="text" class="p-input" placeholder="Lựa chọn ${String.fromCharCode(65 + oi)}" value="${escAttr(opts[oi] || '')}" oninput="window.updateGrammarQuizOption(${idx}, ${oi}, this.value)" />
                </div>
              `).join('')}
            </div>
            <input type="text" class="p-input" placeholder="Giải thích ngữ pháp ngắn gọn khi chọn..." value="${escAttr(q.explain || "")}" oninput="window.updateGrammarQuiz(${idx}, 'explain', this.value)" />
          </div>
        </div>
      `;
    });

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        <!-- Section 1: Quy tắc -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">1. Các quy tắc ngữ pháp (${(rules || []).length} quy tắc)</span>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addGrammarRule()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm quy tắc</button>
          </div>
          <div class="payload-array-items">
            ${rulesHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có quy tắc nào. Bấm "Thêm quy tắc" để tạo.</div>'}
          </div>
        </div>

        <!-- Section 2: Trắc nghiệm củng cố -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">2. Bài tập trắc nghiệm củng cố (${(quickQuiz || []).length} câu hỏi)</span>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addGrammarQuiz()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
          </div>
          <div class="payload-array-items">
            ${quizHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có câu hỏi trắc nghiệm. Bấm "Thêm câu hỏi" để tạo.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  window.addGrammarRule = function () {
    if (!State.currentDraft) return;
    State.currentDraft.rules = State.currentDraft.rules || [];
    State.currentDraft.rules.push({ title: "", content: "", examples: [] });
    refreshStructureTab();
  };

  window.removeGrammarRule = function (idx) {
    if (!State.currentDraft || !State.currentDraft.rules) return;
    State.currentDraft.rules.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateGrammarRule = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.rules || !State.currentDraft.rules[idx]) return;
    State.currentDraft.rules[idx][field] = val;
  };

  window.addGrammarQuiz = function () {
    if (!State.currentDraft) return;
    State.currentDraft.quickQuiz = State.currentDraft.quickQuiz || [];
    State.currentDraft.quickQuiz.push({ q: "", options: ["", "", "", ""], answer: 0, explain: "" });
    refreshStructureTab();
  };

  window.removeGrammarQuiz = function (idx) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz) return;
    State.currentDraft.quickQuiz.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateGrammarQuiz = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz || !State.currentDraft.quickQuiz[idx]) return;
    State.currentDraft.quickQuiz[idx][field] = val;
  };

  window.updateGrammarQuizOption = function (qIdx, optIdx, val) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz || !State.currentDraft.quickQuiz[qIdx]) return;
    State.currentDraft.quickQuiz[qIdx].options = State.currentDraft.quickQuiz[qIdx].options || [];
    State.currentDraft.quickQuiz[qIdx].options[optIdx] = val;
  };

  // --- Topic Article Builder (Dialogues, Grammar, Vocab Table) ---
  function renderTopicArticleBuilder(dialogues, grammar, vocabTable) {
    let diaHtml = "";
    (dialogues || []).forEach((d, idx) => {
      diaHtml += `
        <div class="payload-array-row" style="margin-bottom:8px;padding:10px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
            <span class="payload-array-row-num" style="font-weight:700">#${idx + 1}</span>
            <input type="text" class="p-input" placeholder="Người nói (Анна / Иван)..." value="${escAttr(d.who || "")}" oninput="window.updateArticleDialogue(${idx}, 'who', this.value)" style="max-width:180px" />
            <button class="p-btn-icon" type="button" onclick="window.removeArticleDialogue(${idx})" title="Xóa dòng" style="margin-left:auto;color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <textarea class="p-input" rows="2" placeholder="Lời thoại tiếng Nga (có trọng âm)..." oninput="window.updateArticleDialogue(${idx}, 'ru', this.value)">${escAttr(d.ru || "")}</textarea>
            <textarea class="p-input" rows="2" placeholder="Dịch nghĩa tiếng Việt..." oninput="window.updateArticleDialogue(${idx}, 'vi', this.value)">${escAttr(d.vi || "")}</textarea>
          </div>
        </div>
      `;
    });

    let vtHtml = "";
    (vocabTable || []).forEach((v, idx) => {
      vtHtml += `
        <div style="display:grid;grid-template-columns:1fr 100px 1.5fr 36px;gap:8px;align-items:center;margin-bottom:6px">
          <input type="text" class="p-input" placeholder="Từ vựng (trọng âm)..." value="${escAttr(v.word || "")}" oninput="window.updateArticleVocabRow(${idx}, 'word', this.value)" />
          <input type="text" class="p-input" placeholder="Loại từ..." value="${escAttr(v.type || "")}" oninput="window.updateArticleVocabRow(${idx}, 'type', this.value)" />
          <input type="text" class="p-input" placeholder="Giải nghĩa tiếng Việt..." value="${escAttr(v.meaning || "")}" oninput="window.updateArticleVocabRow(${idx}, 'meaning', this.value)" />
          <button class="p-btn-icon" type="button" onclick="window.removeArticleVocabRow(${idx})" title="Xóa" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
        </div>
      `;
    });

    const g = grammar || {};

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        <!-- Section 1: Đối thoại -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">1. Hội thoại mẫu song ngữ (${(dialogues || []).length} lượt thoại)</span>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addArticleDialogue()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm lời thoại</button>
          </div>
          <div class="payload-array-items">
            ${diaHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có hội thoại nào. Bấm "Thêm lời thoại" để tạo.</div>'}
          </div>
        </div>

        <!-- Section 2: Ngữ pháp trọng điểm -->
        <div class="payload-array-container" style="padding:14px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:8px">
          <span style="font-weight:700;font-size:14px;display:block;margin-bottom:10px">2. Ngữ pháp trọng điểm trong bài đọc</span>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Tiêu đề điểm ngữ pháp</label>
              <input type="text" class="p-input" placeholder="ví dụ: Quy tắc sử dụng giới từ В và НА..." value="${escAttr(g.title || "")}" oninput="window.updateArticleGrammar('title', this.value)" />
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Nội dung quy tắc / Giải thích chi tiết</label>
              <textarea class="p-input" rows="3" placeholder="Trình bày cấu trúc, ví dụ minh họa và quy tắc ngữ pháp..." oninput="window.updateArticleGrammar('rule', this.value)">${escAttr(g.rule || "")}</textarea>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--p-text-muted);display:block;margin-bottom:4px">Lưu ý & trường hợp đặc biệt (Note)</label>
              <input type="text" class="p-input" placeholder="Ngoại lệ hoặc bẫy hay gặp trong kỳ thi..." value="${escAttr(g.note || "")}" oninput="window.updateArticleGrammar('note', this.value)" />
            </div>
          </div>
        </div>

        <!-- Section 3: Bảng từ vựng trọng tâm -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">3. Bảng từ vựng trọng tâm (${(vocabTable || []).length} mục)</span>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addArticleVocabRow()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm từ</button>
          </div>
          <div class="payload-array-items">
            ${vtHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có từ vựng bảng biểu.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  window.addArticleDialogue = function () {
    if (!State.currentDraft) return;
    State.currentDraft.dialogues = State.currentDraft.dialogues || [];
    State.currentDraft.dialogues.push({ who: "", ru: "", vi: "" });
    refreshStructureTab();
  };

  window.removeArticleDialogue = function (idx) {
    if (!State.currentDraft || !State.currentDraft.dialogues) return;
    State.currentDraft.dialogues.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateArticleDialogue = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.dialogues || !State.currentDraft.dialogues[idx]) return;
    State.currentDraft.dialogues[idx][field] = val;
  };

  window.updateArticleGrammar = function (field, val) {
    if (!State.currentDraft) return;
    State.currentDraft.grammar = State.currentDraft.grammar || {};
    State.currentDraft.grammar[field] = val;
  };

  window.addArticleVocabRow = function () {
    if (!State.currentDraft) return;
    State.currentDraft.vocabTable = State.currentDraft.vocabTable || [];
    State.currentDraft.vocabTable.push({ word: "", type: "n.", meaning: "" });
    refreshStructureTab();
  };

  window.removeArticleVocabRow = function (idx) {
    if (!State.currentDraft || !State.currentDraft.vocabTable) return;
    State.currentDraft.vocabTable.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateArticleVocabRow = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.vocabTable || !State.currentDraft.vocabTable[idx]) return;
    State.currentDraft.vocabTable[idx][field] = val;
  };

  // --- Grammar Lessons Builder (Rules, Table, Quick Quiz) ---
  function renderGrammarBuilder(rules, table, quickQuiz) {
    let rulesHtml = "";
    (rules || []).forEach((r, idx) => {
      rulesHtml += `
        <div class="payload-array-row" style="margin-bottom:10px;padding:12px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span class="payload-array-row-num" style="font-weight:700">Quy tắc #${idx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeGrammarRule(${idx})" title="Xóa quy tắc" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <input type="text" class="p-input" placeholder="Tiêu đề quy tắc..." value="${escAttr(r.title || "")}" oninput="window.updateGrammarRule(${idx}, 'title', this.value)" />
            <textarea class="p-input" rows="2" placeholder="Giải thích chi tiết công thức và quy tắc..." oninput="window.updateGrammarRule(${idx}, 'content', this.value)">${escAttr(r.content || "")}</textarea>
            <input type="text" class="p-input" placeholder="Ví dụ song ngữ (phân cách bằng dấu chấm phẩy)..." value="${escAttr(Array.isArray(r.examples) ? r.examples.join('; ') : (r.examples || ''))}" oninput="window.updateGrammarRule(${idx}, 'examples', this.value.split(';').map(s=>s.trim()).filter(Boolean))" />
          </div>
        </div>
      `;
    });

    let quizHtml = "";
    (quickQuiz || []).forEach((q, idx) => {
      const opts = q.options || [];
      quizHtml += `
        <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-card-bg,#fff);border:1px solid var(--p-border,#e5e7eb);border-radius:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="payload-array-row-num" style="font-weight:700">Câu củng cố #${idx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeGrammarQuiz(${idx})" title="Xóa câu hỏi" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <input type="text" class="p-input" placeholder="Câu hỏi hoặc câu cần điền từ..." value="${escAttr(q.q || q.question || "")}" oninput="window.updateGrammarQuiz(${idx}, 'q', this.value)" />
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:6px">
              ${[0, 1, 2, 3].map(oi => `
                <div style="display:flex;align-items:center;gap:4px">
                  <input type="radio" name="g_correct_${idx}" ${q.answer === oi ? 'checked' : ''} onchange="window.updateGrammarQuiz(${idx}, 'answer', ${oi})" title="Đáp án đúng" />
                  <input type="text" class="p-input" placeholder="Lựa chọn ${String.fromCharCode(65 + oi)}" value="${escAttr(opts[oi] || '')}" oninput="window.updateGrammarQuizOption(${idx}, ${oi}, this.value)" />
                </div>
              `).join('')}
            </div>
            <input type="text" class="p-input" placeholder="Giải thích ngữ pháp ngắn gọn khi chọn..." value="${escAttr(q.explain || "")}" oninput="window.updateGrammarQuiz(${idx}, 'explain', this.value)" />
          </div>
        </div>
      `;
    });

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        <!-- Section 1: Quy tắc -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">1. Các quy tắc ngữ pháp (${(rules || []).length} quy tắc)</span>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addGrammarRule()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm quy tắc</button>
          </div>
          <div class="payload-array-items">
            ${rulesHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có quy tắc nào. Bấm "Thêm quy tắc" để tạo.</div>'}
          </div>
        </div>

        <!-- Section 2: Trắc nghiệm củng cố -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-weight:700;font-size:14px">2. Bài tập trắc nghiệm củng cố (${(quickQuiz || []).length} câu hỏi)</span>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addGrammarQuiz()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
          </div>
          <div class="payload-array-items">
            ${quizHtml || '<div style="text-align:center;padding:16px;color:var(--p-text-muted)">Chưa có câu hỏi trắc nghiệm. Bấm "Thêm câu hỏi" để tạo.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  window.addGrammarRule = function () {
    if (!State.currentDraft) return;
    State.currentDraft.rules = State.currentDraft.rules || [];
    State.currentDraft.rules.push({ title: "", content: "", examples: [] });
    refreshStructureTab();
  };

  window.removeGrammarRule = function (idx) {
    if (!State.currentDraft || !State.currentDraft.rules) return;
    State.currentDraft.rules.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateGrammarRule = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.rules || !State.currentDraft.rules[idx]) return;
    State.currentDraft.rules[idx][field] = val;
  };

  window.addGrammarQuiz = function () {
    if (!State.currentDraft) return;
    State.currentDraft.quickQuiz = State.currentDraft.quickQuiz || [];
    State.currentDraft.quickQuiz.push({ q: "", options: ["", "", "", ""], answer: 0, explain: "" });
    refreshStructureTab();
  };

  window.removeGrammarQuiz = function (idx) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz) return;
    State.currentDraft.quickQuiz.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateGrammarQuiz = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz || !State.currentDraft.quickQuiz[idx]) return;
    State.currentDraft.quickQuiz[idx][field] = val;
  };

  window.updateGrammarQuizOption = function (qIdx, optIdx, val) {
    if (!State.currentDraft || !State.currentDraft.quickQuiz || !State.currentDraft.quickQuiz[qIdx]) return;
    State.currentDraft.quickQuiz[qIdx].options = State.currentDraft.quickQuiz[qIdx].options || [];
    State.currentDraft.quickQuiz[qIdx].options[optIdx] = val;
  };

  // --- Listening Lessons Dialog & Quiz Builder ---
  function renderListeningBuilder(lines, questions) {
    let linesHtml = "";
    lines.forEach((l, idx) => {
      linesHtml += `
        <div class="payload-array-row" style="margin-bottom:8px">
          <span class="payload-array-row-num">#${idx + 1}</span>
          <div class="payload-array-row-fields">
            <div style="display:flex;gap:10px;margin-bottom:6px">
              <input type="text" class="p-input" placeholder="Người nói..." value="${escAttr(l.who || "")}" oninput="window.updateListeningLine(${idx}, 'who', this.value)" style="max-width:140px" />
              <input type="text" class="p-input" placeholder="Câu thoại tiếng Nga..." value="${escAttr(l.ru || "")}" oninput="window.updateListeningLine(${idx}, 'ru', this.value)" />
            </div>
            <input type="text" class="p-input" placeholder="Dịch tiếng Việt..." value="${escAttr(l.vi || "")}" oninput="window.updateListeningLine(${idx}, 'vi', this.value)" />
          </div>
          <button class="p-btn-icon" type="button" onclick="window.removeListeningLine(${idx})">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
        </div>
      `;
    });

    let qHtml = "";
    questions.forEach((q, qIdx) => {
      const opts = (q.options || []).join("\n");
      qHtml += `
        <div class="payload-array-row" style="margin-bottom:8px">
          <span class="payload-array-row-num">Q${qIdx + 1}</span>
          <div class="payload-array-row-fields">
            <input type="text" class="p-input" placeholder="Câu hỏi nghe hiểu..." value="${escAttr(q.q || "")}" oninput="window.updateListeningQuestion(${qIdx}, 'q', this.value)" />
            <div style="display:flex;gap:10px">
              <textarea class="p-textarea" rows="3" placeholder="Các đáp án (mỗi dòng 1 đáp án)..." oninput="window.updateListeningQuestionOpts(${qIdx}, this.value)">${esc(opts)}</textarea>
              <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                <label class="p-label" style="font-size:11px">Đáp án đúng:</label>
                <select class="p-select" onchange="window.updateListeningQuestion(${qIdx}, 'a', Number(this.value))">
                  <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                  <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                  <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                  <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                </select>
              </div>
            </div>
          </div>
          <button class="p-btn-icon" type="button" onclick="window.removeListeningQuestion(${qIdx})">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
        </div>
      `;
    });

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        <div class="payload-array-container">
          <div class="payload-array-header">
            <span style="font-weight:700">Lời thoại Shadowing (${lines.length} câu)</span>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addListeningLine()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu thoại</button>
          </div>
          <div class="payload-array-items">
            ${linesHtml || '<div style="text-align:center;padding:20px;color:var(--p-text-muted)">Chưa có câu thoại.</div>'}
          </div>
        </div>

        <div class="payload-array-container">
          <div class="payload-array-header">
            <span style="font-weight:700">Câu hỏi trắc nghiệm nghe hiểu (${questions.length} câu)</span>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addListeningQuestion()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
          </div>
          <div class="payload-array-items">
            ${qHtml || '<div style="text-align:center;padding:20px;color:var(--p-text-muted)">Chưa có câu hỏi trắc nghiệm.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  window.addListeningLine = function () {
    if (!State.currentDraft) return;
    State.currentDraft.lines = State.currentDraft.lines || [];
    State.currentDraft.lines.push({ who: "Người nói", ru: "", vi: "" });
    refreshStructureTab();
  };

  window.removeListeningLine = function (idx) {
    if (!State.currentDraft || !State.currentDraft.lines) return;
    State.currentDraft.lines.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateListeningLine = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.lines || !State.currentDraft.lines[idx]) return;
    State.currentDraft.lines[idx][field] = val;
  };

  window.addListeningQuestion = function () {
    if (!State.currentDraft) return;
    State.currentDraft.questions = State.currentDraft.questions || [];
    State.currentDraft.questions.push({ q: "", options: ["", "", "", ""], a: 0 });
    refreshStructureTab();
  };

  window.removeListeningQuestion = function (idx) {
    if (!State.currentDraft || !State.currentDraft.questions) return;
    State.currentDraft.questions.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateListeningQuestion = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.questions || !State.currentDraft.questions[idx]) return;
    State.currentDraft.questions[idx][field] = val;
  };

  window.updateListeningQuestionOpts = function (idx, textVal) {
    if (!State.currentDraft || !State.currentDraft.questions || !State.currentDraft.questions[idx]) return;
    State.currentDraft.questions[idx].options = textVal.split("\n").map((s) => s.trim()).filter(Boolean);
  };

  // --- Speaking Sets Builder ---
  function renderSpeakingBuilder(items) {
    let itemsHtml = "";
    items.forEach((it, idx) => {
      itemsHtml += `
        <div class="payload-array-row" style="margin-bottom:8px">
          <span class="payload-array-row-num">#${idx + 1}</span>
          <div class="payload-array-row-fields">
            <input type="text" class="p-input" placeholder="Câu tiếng Nga (trọng âm)..." value="${escAttr(it.ru || "")}" oninput="window.updateSpeakingItem(${idx}, 'ru', this.value)" style="margin-bottom:6px" />
            <input type="text" class="p-input" placeholder="Dịch tiếng Việt..." value="${escAttr(it.vi || "")}" oninput="window.updateSpeakingItem(${idx}, 'vi', this.value)" />
          </div>
          <button class="p-btn-icon" type="button" onclick="window.removeSpeakingItem(${idx})">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header">
          <span style="font-weight:700">Các câu luyện nói (${items.length} câu)</span>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addSpeakingItem()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu mới</button>
        </div>
        <div class="payload-array-items">
          ${itemsHtml || '<div style="text-align:center;padding:20px;color:var(--p-text-muted)">Chưa có câu nào.</div>'}
        </div>
      </div>
    `;
  }

  window.addSpeakingItem = function () {
    if (!State.currentDraft) return;
    State.currentDraft.items = State.currentDraft.items || [];
    State.currentDraft.items.push({ ru: "", vi: "" });
    refreshStructureTab();
  };

  window.removeSpeakingItem = function (idx) {
    if (!State.currentDraft || !State.currentDraft.items) return;
    State.currentDraft.items.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateSpeakingItem = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.items || !State.currentDraft.items[idx]) return;
    State.currentDraft.items[idx][field] = val;
  };

  // --- Packages Features Builder ---
  function renderPackagesFeaturesBuilder(features) {
    let rowsHtml = "";
    (features || []).forEach((feat, idx) => {
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:6px">
          <span class="payload-array-row-num">${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""}</span>
          <div class="payload-array-row-fields">
            <input type="text" class="p-input" value="${escAttr(feat)}" oninput="window.updatePackageFeature(${idx}, this.value)" />
          </div>
          <button class="p-btn-icon" type="button" onclick="window.removePackageFeature(${idx})">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header">
          <span style="font-weight:700">Quyền lợi gói hội viên (${(features || []).length} mục)</span>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addPackageFeature()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm quyền lợi</button>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="padding:16px;text-align:center;color:var(--p-text-muted)">Chưa có quyền lợi.</div>'}
        </div>
      </div>
    `;
  }

  window.addPackageFeature = function () {
    if (!State.currentDraft) return;
    State.currentDraft.features = State.currentDraft.features || [];
    State.currentDraft.features.push("Quyền lợi mới");
    refreshStructureTab();
  };

  window.removePackageFeature = function (idx) {
    if (!State.currentDraft || !State.currentDraft.features) return;
    State.currentDraft.features.splice(idx, 1);
    refreshStructureTab();
  };

  window.updatePackageFeature = function (idx, val) {
    if (!State.currentDraft || !State.currentDraft.features) return;
    State.currentDraft.features[idx] = val;
  };

  // --- Writing Tasks Tips Builder ---
  function renderWritingTipsBuilder(words, tips) {
    const wordsVal = (words || []).join("\n");
    const tipsVal = (tips || []).join("\n");

    return `
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="p-form-group">
          <label class="p-label">Từ vựng gợi ý (suggested_words — mỗi dòng 1 từ/cụm từ):</label>
          <textarea class="p-textarea" rows="4" oninput="State.currentDraft.suggested_words = this.value.split('\\n').map(s => s.trim()).filter(Boolean)">${esc(wordsVal)}</textarea>
        </div>
        <div class="p-form-group">
          <label class="p-label">Mẹo làm bài (tips — mỗi dòng 1 mẹo):</label>
          <textarea class="p-textarea" rows="4" oninput="State.currentDraft.tips = this.value.split('\\n').map(s => s.trim()).filter(Boolean)">${esc(tipsVal)}</textarea>
        </div>
      </div>
    `;
  }

  function refreshStructureTab() {
    const tabS = document.getElementById("tabStructure");
    if (tabS && State.currentSlug && State.currentDraft) {
      tabS.innerHTML = renderActiveStructureBuilder(State.currentSlug, State.currentDraft);
    }
  }

  // =========================================================================
  // SUPABASE POSTGRESQL SYNC ENGINE (TWO-WAY CLOUD INTEGRATION)
  // =========================================================================

  const SupabaseSyncEngine = {
    MAPPINGS: {
      TRKI_BANK: {
        table: "trki_tests",
        conflict: "code",
        deleteCol: "code",
        label: "Đề thi TRKI",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          level: doc.level || "A1",
          level_name: doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
          title: doc.title || "Đề thi TRKI",
          sub_test_type: doc.category || "full",
          category: doc.category || "full",
          duration_minutes: Number(doc.durationMin) || 45,
          passing_score: Number(doc.passPercent) || 66,
          is_published: true,
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          icon: doc.icon || "graduation-cap",
          raw_data: { parts: Array.isArray(doc.parts) ? doc.parts : [] },
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          level: row.level || "A1",
          levelName: row.level_name || ("TRKI " + row.level),
          category: row.category || "full",
          categoryName: row.category === "full" ? "Đề thi toàn diện (3 phần)" : (row.category || "Đề thi TRKI"),
          title: row.title || "Đề thi TRKI",
          durationMin: Number(row.duration_minutes) || 45,
          passPercent: Number(row.passing_score) || 66,
          is_pro_only: Boolean(row.is_pro_only),
          icon: row.icon || "graduation-cap",
          parts: (row.raw_data && Array.isArray(row.raw_data.parts)) ? row.raw_data.parts : []
        })
      },

      VOCAB_JARS: {
        table: "vocab_jars",
        conflict: "code",
        deleteCol: "code",
        label: "Lọ từ vựng",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          jar_name: doc.name || doc.title || "Lọ từ vựng",
          level: doc.level || "A1",
          description: doc.desc || "",
          icon: doc.icon || "archive-jar",
          color_code: doc.color || "#0039A6",
          is_system: true,
          words: Array.isArray(doc.words) ? doc.words : [],
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          name: row.jar_name || "Lọ từ vựng",
          level: row.level || "A1",
          levelName: row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1",
          desc: row.description || "",
          icon: row.icon || "archive-jar",
          color: row.color_code || "#0039A6",
          words: Array.isArray(row.words) ? row.words : []
        })
      },

      LISTENING_LESSONS: {
        table: "listening_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Bài luyện nghe",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          part_type: doc.partType || doc.category || "dialogue",
          title: doc.title || "Bài luyện nghe",
          vi: doc.vi || "",
          level: doc.level || "A1",
          level_name: doc.levelName || "Sơ cấp A1",
          category: doc.category || "airport",
          category_name: doc.categoryName || "Bài nghe",
          est_minutes: Number(doc.estMinutes) || 10,
          icon: doc.icon || "headphones",
          part_number: Number(doc.partNumber) || 1,
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          raw_data: {
            lines: Array.isArray(doc.lines) ? doc.lines : [],
            blanks: Array.isArray(doc.blanks) ? doc.blanks : [],
            dictation: Array.isArray(doc.dictation) ? doc.dictation : [],
            questions: Array.isArray(doc.questions) ? doc.questions : []
          },
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          title: row.title || "",
          vi: row.vi || "",
          level: row.level || "A1",
          levelName: row.level_name || "Sơ cấp A1",
          category: row.category || "airport",
          categoryName: row.category_name || "Bài nghe",
          estMinutes: Number(row.est_minutes) || 10,
          icon: row.icon || "headphones",
          partNumber: Number(row.part_number) || 1,
          is_pro_only: Boolean(row.is_pro_only),
          lines: (row.raw_data && Array.isArray(row.raw_data.lines)) ? row.raw_data.lines : [],
          blanks: (row.raw_data && Array.isArray(row.raw_data.blanks)) ? row.raw_data.blanks : [],
          dictation: (row.raw_data && Array.isArray(row.raw_data.dictation)) ? row.raw_data.dictation : [],
          questions: (row.raw_data && Array.isArray(row.raw_data.questions)) ? row.raw_data.questions : []
        })
      },

      SPEAKING_SETS: {
        table: "speaking_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Bài luyện nói",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          title: doc.title || "Bài luyện nói",
          level: doc.level || "A1",
          level_name: doc.levelName || "Sơ cấp A1",
          category: doc.category || "greeting",
          category_name: doc.categoryName || "Chào hỏi",
          phoneme_target: doc.phonemeTarget || "",
          icon: doc.icon || "mic-speaking",
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          sentence_ru: (doc.items && doc.items[0] && doc.items[0].ru) || "",
          raw_data: { items: Array.isArray(doc.items) ? doc.items : [] },
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          title: row.title || "",
          level: row.level || "A1",
          levelName: row.level_name || "Sơ cấp A1",
          category: row.category || "greeting",
          categoryName: row.category_name || "Chào hỏi",
          phonemeTarget: row.phoneme_target || "",
          icon: row.icon || "mic-speaking",
          is_pro_only: Boolean(row.is_pro_only),
          items: (row.raw_data && Array.isArray(row.raw_data.items)) ? row.raw_data.items : (row.sentence_ru ? [{ ru: row.sentence_ru, vi: "" }] : [])
        })
      },

      WRITING_TASKS: {
        table: "writing_topics",
        conflict: "code",
        deleteCol: "code",
        label: "Đề luyện viết",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          level: doc.level || "A1",
          level_name: doc.levelName || "Sơ cấp A1",
          category: doc.category || "intro",
          category_name: doc.categoryName || "Tự giới thiệu",
          icon: doc.icon || "pen-tool",
          est_minutes: Number(doc.estMinutes) || 15,
          title: doc.title || "Đề luyện viết",
          prompt: doc.prompt || "",
          vi: doc.vi || "",
          min_words: Number(doc.minWords) || 20,
          suggested_words: Array.isArray(doc.suggested_words) ? doc.suggested_words : [],
          tips: Array.isArray(doc.tips) ? doc.tips : [],
          model_answer: doc.model || "",
          raw_data: {
            suggested_words: Array.isArray(doc.suggested_words) ? doc.suggested_words : [],
            tips: Array.isArray(doc.tips) ? doc.tips : [],
            model: doc.model || ""
          },
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          level: row.level || "A1",
          levelName: row.level_name || "Sơ cấp A1",
          category: row.category || "intro",
          categoryName: row.category_name || "Tự giới thiệu",
          icon: row.icon || "pen-tool",
          estMinutes: Number(row.est_minutes) || 15,
          title: row.title || "",
          prompt: row.prompt || "",
          vi: row.vi || "",
          minWords: Number(row.min_words) || 20,
          suggested_words: (row.raw_data && Array.isArray(row.raw_data.suggested_words)) ? row.raw_data.suggested_words : (Array.isArray(row.suggested_words) ? row.suggested_words : []),
          tips: (row.raw_data && Array.isArray(row.raw_data.tips)) ? row.raw_data.tips : (Array.isArray(row.tips) ? row.tips : []),
          model: (row.raw_data && row.raw_data.model) || row.model_answer || "",
          is_pro_only: Boolean(row.is_pro_only)
        })
      },

      SHOP_PRODUCTS: {
        table: "shop_products",
        conflict: "code",
        deleteCol: "code",
        label: "Cửa hàng & Giáo trình",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          title: doc.title || doc.name || "Sản phẩm",
          price: Number(doc.price) || 0,
          original_price: Number(doc.origPrice) || 0,
          category: doc.category || "book",
          category_name: doc.categoryName || "Giáo trình",
          badge: doc.badge || "",
          description: doc.desc || "",
          image: doc.image || "",
          image_urls: doc.image ? [doc.image] : [],
          stock: Number(doc.sold) || 100,
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          title: row.title || "",
          name: row.title || "",
          category: row.category || "book",
          categoryName: row.category_name || "Giáo trình",
          badge: row.badge || "",
          price: Number(row.price) || 0,
          origPrice: Number(row.original_price) || 0,
          rating: 5.0,
          sold: Number(row.stock) || 0,
          image: row.image || (Array.isArray(row.image_urls) ? row.image_urls[0] : "") || "",
          desc: row.description || ""
        })
      },

      PACKAGES: {
        table: "packages",
        conflict: "id",
        deleteCol: "id",
        label: "Gói Premium PRO",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          id: String(doc.id).trim(),
          title: doc.name || doc.title || "Gói học",
          price: Number(doc.price) || 0,
          price_old: Number(doc.origPrice) || 0,
          badge: doc.badge || "",
          duration_days: (Number(doc.months) || 1) * 30,
          popular: Boolean(doc.is_popular === true || doc.is_popular === "true"),
          features: Array.isArray(doc.features) ? doc.features : [],
          feature_list: Array.isArray(doc.features) ? doc.features : []
        }),
        fromRow: (row) => ({
          id: row.id,
          name: row.title || "",
          title: row.title || "",
          price: Number(row.price) || 0,
          origPrice: Number(row.price_old) || 0,
          badge: row.badge || "",
          months: Math.max(1, Math.round((Number(row.duration_days) || 30) / 30)),
          features: Array.isArray(row.features) ? row.features : (Array.isArray(row.feature_list) ? row.feature_list : []),
          is_popular: Boolean(row.popular)
        })
      },

      BLOG_POSTS: {
        table: "blog_posts",
        conflict: "slug",
        deleteCol: "slug",
        label: "Bài viết Blog",
        idKey: (doc) => doc.slug || doc.id,
        toRow: (doc) => ({
          slug: String(doc.slug || doc.id).trim(),
          title: doc.title || "Bài viết",
          category: doc.category || "news",
          category_name: doc.categoryName || doc.category || "Tin tức",
          cover_image: doc.cover || "assets/red-square.jpg",
          excerpt: doc.excerpt || "",
          content_markdown: doc.content || doc.content_markdown || "",
          icon: doc.icon || "book-open-blog",
          author: doc.author || "RUSI Editorial",
          read_time: doc.readTime || "5 phút đọc",
          published: true,
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          slug: row.slug,
          title: row.title || "",
          category: row.category || "news",
          categoryName: row.category_name || row.category || "Tin tức",
          cover: row.cover_image || "assets/red-square.jpg",
          excerpt: row.excerpt || "",
          content: row.content_markdown || "",
          icon: row.icon || "book-open-blog",
          author: row.author || "RUSI Editorial",
          readTime: row.read_time || "5 phút đọc"
        })
      },

      GRAMMAR_LESSONS: {
        table: "grammar_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Bài học Ngữ pháp",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          code: String(doc.id).trim(),
          title: doc.title || "Bài học ngữ pháp",
          vi: doc.vi || "",
          level: doc.level || "A1",
          level_name: doc.levelName || "Sơ cấp A1",
          topic: doc.topic || "cases",
          topic_name: doc.topicName || "Biến cách",
          icon: doc.icon || "book-open",
          est_minutes: Number(doc.estMinutes) || 15,
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          raw_data: {
            rules: Array.isArray(doc.rules) ? doc.rules : [],
            table: doc.table || null,
            quickQuiz: Array.isArray(doc.quickQuiz) ? doc.quickQuiz : []
          },
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
          title: row.title || "",
          vi: row.vi || "",
          level: row.level || "A1",
          levelName: row.level_name || "Sơ cấp A1",
          topic: row.topic || "cases",
          topicName: row.topic_name || "Biến cách",
          icon: row.icon || "book-open",
          estMinutes: Number(row.est_minutes) || 15,
          is_pro_only: Boolean(row.is_pro_only),
          rules: (row.raw_data && Array.isArray(row.raw_data.rules)) ? row.raw_data.rules : [],
          table: (row.raw_data && row.raw_data.table) ? row.raw_data.table : null,
          quickQuiz: (row.raw_data && Array.isArray(row.raw_data.quickQuiz)) ? row.raw_data.quickQuiz : []
        })
      },

      ORDERS: {
        table: "orders",
        conflict: "order_code",
        deleteCol: "order_code",
        label: "Đơn hàng & Giao dịch",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          order_code: String(doc.id).trim(),
          user_email: doc.userEmail || "",
          package_id: doc.packageId || "",
          package_name: doc.packageName || "",
          amount: Number(doc.amount) || 0,
          payment_method: doc.paymentMethod || "VietQR",
          status: doc.status || "pending",
          created_at: doc.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.order_code || row.id,
          userEmail: row.user_email || "",
          packageId: row.package_id || "",
          packageName: row.package_name || "",
          amount: Number(row.amount) || 0,
          paymentMethod: row.payment_method || "VietQR",
          status: row.status || "pending",
          createdAt: row.created_at || ""
        })
      }
    },

    hasMapping(slug) {
      return Boolean(this.MAPPINGS[slug]);
    },

    getClient() {
      if (window.RusiSupabase && window.RusiSupabase.getClient) {
        const client = window.RusiSupabase.getClient();
        if (client) return client;
      }
      if (typeof window.supabase !== "undefined" && window.SUPABASE_CONFIG) {
        const key = localStorage.getItem("trki_sb_anon_key") || window.SUPABASE_CONFIG.anonKey;
        if (key && !key.includes("DÁN_ANON_KEY")) {
          return window.supabase.createClient(window.SUPABASE_CONFIG.url, key);
        }
      }
      return null;
    },

    async upsertDoc(slug, doc) {
      const mapping = this.MAPPINGS[slug];
      if (!mapping) return { ok: true, skipped: true, message: `Collection ${slug} không map tới bảng Supabase.` };

      const sb = this.getClient();
      if (!sb) {
        return { ok: false, message: "Supabase client chưa sẵn sàng. Hãy kiểm tra Anon Key." };
      }

      try {
        const row = mapping.toRow(doc);
        const { data, error } = await sb
          .from(mapping.table)
          .upsert(row, { onConflict: mapping.conflict })
          .select();

        if (error) {
          console.error(`[SupabaseSyncEngine] Lỗi upsert bảng ${mapping.table}:`, error);
          return { ok: false, error, message: error.message || "Lỗi Supabase" };
        }
        return { ok: true, table: mapping.table, data };
      } catch (err) {
        console.error(`[SupabaseSyncEngine] Ngoại lệ khi upsert:`, err);
        return { ok: false, error: err, message: err.message };
      }
    },

    async deleteDoc(slug, idKey) {
      const mapping = this.MAPPINGS[slug];
      if (!mapping) return { ok: true, skipped: true };

      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      try {
        const { error } = await sb
          .from(mapping.table)
          .delete()
          .eq(mapping.deleteCol, idKey);

        if (error) {
          console.error(`[SupabaseSyncEngine] Lỗi xoá bảng ${mapping.table}:`, error);
          return { ok: false, error, message: error.message };
        }
        return { ok: true, table: mapping.table };
      } catch (err) {
        console.error(`[SupabaseSyncEngine] Ngoại lệ khi xoá:`, err);
        return { ok: false, error: err, message: err.message };
      }
    },

    async syncAllCollections(onProgress) {
      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      const results = {};
      let totalSuccess = 0;
      let totalErrors = 0;
      const slugs = Object.keys(this.MAPPINGS);

      for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const mapping = this.MAPPINGS[slug];
        const items = getMergedList(slug).map(stripSource);
        results[slug] = { total: items.length, synced: 0, errors: 0 };

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "syncing", current: 0, total: items.length });
        }

        for (const item of items) {
          try {
            const row = mapping.toRow(item);
            const { error } = await sb
              .from(mapping.table)
              .upsert(row, { onConflict: mapping.conflict });

            if (error) {
              console.warn(`[SupabaseSyncEngine] Lỗi sync ${slug}/${item.id || item.slug}:`, error.message);
              results[slug].errors++;
              totalErrors++;
            } else {
              results[slug].synced++;
              totalSuccess++;
            }
          } catch (err) {
            results[slug].errors++;
            totalErrors++;
          }
        }

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "done", current: results[slug].synced, total: items.length });
        }
      }

      return { ok: totalErrors === 0, totalSuccess, totalErrors, results };
    },

    async pullAllCollections(onProgress) {
      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      const store = loadAdminStore();
      let totalPulled = 0;
      const slugs = Object.keys(this.MAPPINGS);

      for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const mapping = this.MAPPINGS[slug];

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "fetching" });
        }

        try {
          const { data, error } = await sb.from(mapping.table).select("*");
          if (error) {
            console.warn(`[SupabaseSyncEngine] Lỗi pull bảng ${mapping.table}:`, error.message);
            continue;
          }

          if (Array.isArray(data) && data.length > 0) {
            store[slug] = store[slug] || [];
            data.forEach((row) => {
              const doc = mapping.fromRow(row);
              const idKey = mapping.idKey(doc);
              if (!idKey) return;

              const idx = store[slug].findIndex((x) => mapping.idKey(x) === idKey);
              if (idx >= 0) {
                store[slug][idx] = { ...doc, __admin: true, __fromSupabase: true };
              } else {
                store[slug].push({ ...doc, __admin: true, __fromSupabase: true });
              }
              totalPulled++;
            });
          }
        } catch (err) {
          console.warn(`[SupabaseSyncEngine] Ngoại lệ pull bảng ${mapping.table}:`, err);
        }
      }

      saveAdminStore(store);
      syncDataToWeb();
      renderSidebarLists();
      handleRoute();

      return { ok: true, totalPulled };
    },

    async fetchStats() {
      const sb = this.getClient();
      if (!sb) return null;
      const stats = {};
      const slugs = Object.keys(this.MAPPINGS);
      for (const slug of slugs) {
        const mapping = this.MAPPINGS[slug];
        try {
          const { count, error } = await sb.from(mapping.table).select("*", { count: "exact", head: true });
          stats[slug] = error ? 0 : (count || 0);
        } catch (_) {
          stats[slug] = 0;
        }
      }
      return stats;
    }
  };
  window.SupabaseSyncEngine = SupabaseSyncEngine;

  // =========================================================================
  // 10. SAVE, DELETE, CLONE & BULK ACTIONS
  // =========================================================================

  window.saveDocument = async function () {
    const slug = State.currentSlug;
    const col = COLLECTIONS[slug];
    if (!col || !State.currentDraft) return;

    // If on JSON tab, ensure JSON parse
    if (State.activeEditorTab === "json") {
      const jsonEl = document.getElementById("jsonEditorArea");
      try {
        State.currentDraft = JSON.parse(jsonEl.value);
      } catch (err) {
        toast("Lỗi cú pháp JSON: " + err.message);
        return;
      }
    }

    const data = State.currentDraft;
    const idKey = data.id || data.slug || data.title;
    if (!idKey) {
      toast("Lỗi: Mã ID / Slug là bắt buộc.");
      return;
    }

    const store = loadAdminStore();
    store[slug] = store[slug] || [];

    if (State.isCreating) {
      const exists = getMergedList(slug).some((it) => (it.id || it.slug || it.title) === idKey);
      if (exists) {
        toast(`Mã "${idKey}" đã tồn tại. Vui lòng chọn mã khác.`);
        return;
      }
      store[slug].push({ ...data, __admin: true });
    } else {
      const idx = store[slug].findIndex((it) => (it.id || it.slug || it.title) === (State.currentDocId || idKey));
      const updated = { ...data, __admin: true };
      if (idx >= 0) store[slug][idx] = updated;
      else store[slug].push(updated);
    }

    store.__deleted = store.__deleted || {};
    if (Array.isArray(store.__deleted[slug])) {
      store.__deleted[slug] = store.__deleted[slug].filter((k) => k !== idKey);
    }

    // 1. Lưu cục bộ trước (offline-first, bảo đảm không bao giờ mất dữ liệu)
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    // 2. Đồng bộ đám mây Supabase PostgreSQL nếu collection có cấu hình
    if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(slug)) {
      toast("Đang lưu & đẩy lên Supabase Cloud...");
      try {
        const syncRes = await SupabaseSyncEngine.upsertDoc(slug, data);
        if (syncRes.ok) {
          toast(`Đã lưu & đồng bộ thành công lên Supabase (bảng ${syncRes.table})!`);
        } else {
          toast(`Đã lưu trên máy. Supabase phản hồi: ${syncRes.message}`);
        }
      } catch (err) {
        toast(`Đã lưu trên máy. Lỗi Supabase: ${err.message}`);
      }
    } else {
      toast(State.isCreating ? "Đã tạo mới tài liệu và đồng bộ về website!" : "Đã lưu thay đổi thành công!");
    }

    navigateTo(`#collection/${slug}`);
  };

  window.deleteDocument = async function (slug, idKey) {
    if (!confirm(`Bạn có chắc chắn muốn xoá tài liệu "${idKey}" khỏi ${slug}?`)) return;

    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    store.__deleted[slug] = store.__deleted[slug] || [];
    if (!store.__deleted[slug].includes(idKey)) {
      store.__deleted[slug].push(idKey);
    }

    if (Array.isArray(store[slug])) {
      store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== idKey);
    }

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    // Đồng bộ xoá trên Supabase Cloud
    if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(slug)) {
      toast(`Đang xoá "${idKey}" trên Supabase Cloud...`);
      try {
        const delRes = await SupabaseSyncEngine.deleteDoc(slug, idKey);
        if (delRes.ok) {
          toast(`Đã xoá tài liệu "${idKey}" (cục bộ & bảng ${delRes.table} Cloud).`);
        } else {
          toast(`Đã xoá cục bộ. Supabase: ${delRes.message}`);
        }
      } catch (e) {
        toast(`Đã xoá cục bộ. Lỗi Supabase: ${e.message}`);
      }
    } else {
      toast(`Đã xoá tài liệu "${idKey}".`);
    }

    if (State.currentRoute === "editor") {
      navigateTo(`#collection/${slug}`);
    } else {
      renderCollectionView(document.getElementById("payloadViewContainer"), slug);
    }
  };

  window.cloneDocument = function (slug, idKey) {
    const list = getMergedList(slug);
    const item = list.find((it) => (it.id || it.slug || it.title) === idKey);
    if (!item) return;

    const clone = JSON.parse(JSON.stringify(stripSource(item)));
    const newId = `${idKey}_copy_${Date.now().toString().slice(-4)}`;
    if (clone.id) clone.id = newId;
    if (clone.slug) clone.slug = newId;
    if (clone.title) clone.title = `${clone.title} (Bản sao)`;
    clone.__admin = true;

    const store = loadAdminStore();
    store[slug] = store[slug] || [];
    store[slug].push(clone);
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    toast(`Đã nhân bản thành công "${newId}"!`);
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  };

  function bulkDelete(slug) {
    if (State.selectedRows.size === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xoá ${State.selectedRows.size} tài liệu đã chọn?`)) return;

    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    store.__deleted[slug] = store.__deleted[slug] || [];

    State.selectedRows.forEach((id) => {
      if (!store.__deleted[slug].includes(id)) store.__deleted[slug].push(id);
      if (Array.isArray(store[slug])) {
        store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== id);
      }
    });

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();
    State.selectedRows.clear();

    toast("Đã xoá hàng loạt các mục được chọn!");
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  }

  function bulkUpdateField(slug, field, value) {
    if (State.selectedRows.size === 0) return;

    const store = loadAdminStore();
    store[slug] = store[slug] || [];
    const list = getMergedList(slug);

    State.selectedRows.forEach((id) => {
      const orig = list.find((it) => (it.id || it.slug || it.title) === id);
      if (!orig) return;
      const clone = { ...orig, [field]: value, __admin: true };
      delete clone.__source;
      const idx = store[slug].findIndex((it) => (it.id || it.slug || it.title) === id);
      if (idx >= 0) store[slug][idx] = clone;
      else store[slug].push(clone);
    });

    saveAdminStore(store);
    syncDataToWeb();
    State.selectedRows.clear();

    toast("Đã cập nhật trạng thái cho các mục được chọn!");
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  }

  // =========================================================================
  // 11. VIEW 4: LIVE PREVIEW DRAWER (PAYLOAD 3.0 SIGNATURE)
  // =========================================================================

  function openLivePreview() {
    const drawer = document.getElementById("previewDrawer");
    const backdrop = document.getElementById("payloadBackdrop");
    const iframe = document.getElementById("previewIframe");
    const selector = document.getElementById("previewPageSelector");

    if (!drawer || !backdrop) return;

    // Temporary sync draft data to local cache so preview iframe reads latest changes
    if (State.currentDraft && State.currentSlug) {
      const store = loadAdminStore();
      store[State.currentSlug] = store[State.currentSlug] || [];
      const idKey = State.currentDraft.id || State.currentDraft.slug || State.currentDraft.title;
      if (idKey) {
        const idx = store[State.currentSlug].findIndex((it) => (it.id || it.slug || it.title) === idKey);
        if (idx >= 0) store[State.currentSlug][idx] = { ...State.currentDraft, __admin: true };
        else store[State.currentSlug].push({ ...State.currentDraft, __admin: true });
        saveAdminStore(store);
        syncDataToWeb();
      }
    }

    let targetUrl = "mock-test.html";
    if (State.currentSlug && COLLECTIONS[State.currentSlug]) {
      const base = COLLECTIONS[State.currentSlug].webUrl;
      const docId = State.currentDraft ? (State.currentDraft.id || State.currentDraft.slug) : State.currentDocId;

      if (State.currentSlug === "TRKI_BANK" && docId) targetUrl = `mock-test.html?test=${encodeURIComponent(docId)}`;
      else if (State.currentSlug === "VOCAB_JARS" && docId) targetUrl = `vocabulary.html?jar=${encodeURIComponent(docId)}`;
      else if (State.currentSlug === "LISTENING_LESSONS" && docId) targetUrl = `listening.html?lesson=${encodeURIComponent(docId)}`;
      else if (State.currentSlug === "SPEAKING_SETS" && docId) targetUrl = `speaking.html?set=${encodeURIComponent(docId)}`;
      else if (State.currentSlug === "WRITING_TASKS" && docId) targetUrl = `writing.html?task=${encodeURIComponent(docId)}`;
      else targetUrl = base;
    }

    if (selector) selector.value = targetUrl.split("?")[0];
    if (iframe) iframe.src = targetUrl;

    drawer.classList.add("open");
    backdrop.classList.add("open");

    const closeBtn = document.getElementById("btnClosePreview");
    if (closeBtn) closeBtn.onclick = closeLivePreview;

    const refreshBtn = document.getElementById("btnRefreshPreview");
    if (refreshBtn) refreshBtn.onclick = () => { if (iframe) iframe.src = iframe.src; };

    if (selector) selector.onchange = (e) => { if (iframe) iframe.src = e.target.value; };

    backdrop.onclick = closeLivePreview;
  }

  function closeLivePreview() {
    const drawer = document.getElementById("previewDrawer");
    const backdrop = document.getElementById("payloadBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  // =========================================================================
  // 12. VIEW 5: REST API & SCHEMA EXPLORER
  // =========================================================================

  function renderApiExplorer(container) {
    const origin = window.location.origin;
    let cardsHtml = "";

    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      const items = getMergedList(key);
      const restPath = `/api/${col.slug.toLowerCase().replace(/_/g, "-")}`;

      cardsHtml += `
        <div style="background:var(--p-surface-elevated);border:1px solid var(--p-border);border-radius:var(--p-radius-lg);padding:18px;margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span class="p-pill p-pill-info" style="font-size:11px">GET</span>
              <code style="font-size:14px;font-weight:700">${restPath}</code>
              <span class="p-pill p-pill-neutral">${items.length} tài liệu</span>
            </div>
            <div style="display:flex;gap:6px">
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="navigator.clipboard.writeText('curl -X GET ${origin}${restPath}');window.toast('Đã copy cURL command!')">Copy cURL</button>
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.downloadCollectionJson('${col.slug}')">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Tải JSON</button>
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="document.getElementById('apiJson_${col.slug}').style.display = document.getElementById('apiJson_${col.slug}').style.display === 'none' ? 'block' : 'none'">Xem JSON ${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : ""}</button>
            </div>
          </div>
          <p style="font-size:12.5px;color:var(--p-text-muted);margin:0 0 10px 0">${esc(col.desc || "REST endpoint simulation.")}</p>
          <div id="apiJson_${col.slug}" style="display:none;margin-top:10px">
            <textarea class="payload-code-editor" style="min-height:160px" readonly>${esc(JSON.stringify({ total: items.length, docs: items.map(stripSource) }, null, 2))}</textarea>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("waveform-audio", { size: 24 }) : ""} Payload REST API & Schema Explorer</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Mô phỏng các điểm cuối REST và GraphQL của Payload CMS. Hỗ trợ truy vấn dữ liệu từ xa cho ứng dụng Mobile hoặc Web bên ngoài.</p>
      </div>

      <div>
        ${cardsHtml}
      </div>
    `;
  }

  window.downloadCollectionJson = function (slug) {
    const items = getMergedList(slug).map(stripSource);
    const content = JSON.stringify(items, null, 2);
    downloadFile(`rusitrki-${slug.toLowerCase()}.json`, content, "application/json");
  };

  // =========================================================================
  // 13. VIEW 6: SUPABASE CLOUD & GLOBALS
  // =========================================================================

  function renderSupabaseSyncView(container) {
    const isReady = SupabaseSyncEngine.getClient() != null;
    const cfg = window.SUPABASE_CONFIG || {};
    const url = cfg.url || "https://nrhtdwjihnlaxrbitmcf.supabase.co";
    const anonKey = localStorage.getItem("trki_sb_anon_key") || cfg.anonKey || "";
    const maskedKey = anonKey ? (anonKey.slice(0, 14) + "..." + anonKey.slice(-10)) : "(Chưa cấu hình)";

    const mappings = SupabaseSyncEngine.MAPPINGS;
    const slugs = Object.keys(mappings);

    const rowsHtml = slugs.map((slug) => {
      const m = mappings[slug];
      const col = COLLECTIONS[slug] || {};
      const localCount = getMergedList(slug).length;
      return `
        <tr>
          <td>
            <div style="font-weight:700;display:flex;align-items:center;gap:8px">
              <span style="display:inline-flex;align-items:center">${window.RusiIcons ? RusiIcons.get(col.icon || "file-text", { size: 18 }) : ""}</span>
              <span>${esc(m.label)}</span>
            </div>
          </td>
          <td><code>${esc(m.table)}</code></td>
          <td style="font-weight:600">${localCount}</td>
          <td><span id="sbCloudCount_${slug}" class="p-pill p-pill-neutral">Đang nạp...</span></td>
          <td><span class="p-pill p-pill-success" style="display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Mapped</span></td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.syncSingleCollection('${slug}')" title="Đẩy bộ sưu tập này lên Supabase">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Đẩy</button>
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.pullSingleCollection('${slug}')" title="Kéo dữ liệu bảng này từ Supabase về">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Kéo</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 24 }) : ""} Supabase PostgreSQL Cloud Hub</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Cơ chế đồng bộ cơ sở dữ liệu đám mây hai chiều giữa Payload CMS và Supabase Cloud (Project: <code>nrhtdwjihnlaxrbitmcf</code>).</p>
      </div>

      <div class="payload-doc-card" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-weight:700;font-size:14px;margin-bottom:2px">Trạng thái kết nối Cloud:</div>
            <div style="font-size:12px;color:var(--p-text-muted)">Máy chủ: <code>${esc(url)}</code> &bull; Anon Key: <code>${esc(maskedKey)}</code></div>
          </div>
          <span id="sbHubConnBadge" class="p-pill ${isReady ? "p-pill-success" : "p-pill-warning"}">${isReady ? `<span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 12 }) : ""} Supabase Sẵn Sàng</span>` : "Chưa có Anon Key"}</span>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.openSupabaseModal()">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 14 }) : ""} Cấu hình Anon Key</button>
          <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.syncAllToSupabase()">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Đẩy toàn bộ lên Supabase (Push All)</button>
          <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.pullAllFromSupabase()">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Kéo toàn bộ về Web (Pull All)</button>
          <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.refreshSupabaseStats()">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : ""} Làm mới số lượng</button>
        </div>
      </div>

      <div id="sbSyncProgressBox" style="display:none;background:var(--p-surface-elevated);border:1px solid var(--p-border);border-radius:var(--p-radius-md);padding:16px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <span id="sbProgressTitle" style="font-weight:700;font-size:13px">Đang đồng bộ...</span>
          <span id="sbProgressPercent" class="p-pill p-pill-info">0%</span>
        </div>
        <div style="height:6px;background:var(--p-border);border-radius:3px;overflow:hidden;margin-bottom:8px">
          <div id="sbProgressBar" style="height:100%;width:0%;background:var(--p-primary);transition:width 0.2s ease"></div>
        </div>
        <div id="sbProgressDetail" style="font-size:12px;color:var(--p-text-muted)">Đang chuẩn bị dữ liệu...</div>
      </div>

      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table">
            <thead>
              <tr>
                <th>Bộ sưu tập (Collection)</th>
                <th>Bảng PostgreSQL</th>
                <th>Web / Local</th>
                <th>Supabase Cloud</th>
                <th>Ánh xạ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.refreshSupabaseStats();
  }

  window.refreshSupabaseStats = async function () {
    const stats = await SupabaseSyncEngine.fetchStats();
    if (!stats) return;
    Object.keys(stats).forEach((slug) => {
      const el = document.getElementById(`sbCloudCount_${slug}`);
      if (el) {
        const cnt = stats[slug];
        el.textContent = `${cnt} dòng`;
        el.className = "p-pill p-pill-info";
      }
    });
  };

  window.syncAllToSupabase = async function () {
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key trước khi đồng bộ đám mây.");
      openSupabaseModal();
      return;
    }

    const box = document.getElementById("sbSyncProgressBox");
    const pTitle = document.getElementById("sbProgressTitle");
    const pPercent = document.getElementById("sbProgressPercent");
    const pBar = document.getElementById("sbProgressBar");
    const pDetail = document.getElementById("sbProgressDetail");

    if (box) box.style.display = "block";
    if (pTitle) pTitle.textContent = "Đang đẩy dữ liệu lên Supabase Cloud...";

    toast("Bắt đầu đồng bộ 8 bảng lên Supabase Cloud...");

    const res = await SupabaseSyncEngine.syncAllCollections((prog) => {
      const pct = Math.round((prog.index / prog.totalSlugs) * 100);
      if (pPercent) pPercent.textContent = `${pct}%`;
      if (pBar) pBar.style.width = `${pct}%`;
      if (pDetail) pDetail.textContent = `[${prog.index}/${prog.totalSlugs}] ${prog.label} (${prog.current}/${prog.total} bản ghi)...`;
    });

    if (res.ok) {
      toast(`Đã đẩy thành công ${res.totalSuccess} tài liệu lên Supabase Cloud!`);
      if (pTitle) pTitle.textContent = "Đẩy dữ liệu hoàn tất!";
      if (pDetail) pDetail.textContent = `Tổng cộng ${res.totalSuccess} tài liệu đã đồng bộ thành công vào 8 bảng PostgreSQL.`;
    } else {
      toast(`Đã đồng bộ ${res.totalSuccess} bản ghi (${res.totalErrors} lỗi).`);
      if (pTitle) pTitle.textContent = "Hoàn tất có cảnh báo";
      if (pDetail) pDetail.textContent = `Thành công: ${res.totalSuccess}, lỗi: ${res.totalErrors}.`;
    }

    window.refreshSupabaseStats();
    setTimeout(() => { if (box) box.style.display = "none"; }, 5000);
  };

  window.pullAllFromSupabase = async function () {
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key trước khi kéo dữ liệu.");
      openSupabaseModal();
      return;
    }

    if (!confirm("Kéo toàn bộ dữ liệu từ Supabase Cloud về máy? Dữ liệu mới nhất trên đám mây sẽ cập nhật vào website.")) return;

    const box = document.getElementById("sbSyncProgressBox");
    const pTitle = document.getElementById("sbProgressTitle");
    const pPercent = document.getElementById("sbProgressPercent");
    const pBar = document.getElementById("sbProgressBar");
    const pDetail = document.getElementById("sbProgressDetail");

    if (box) box.style.display = "block";
    if (pTitle) pTitle.textContent = "Đang kéo dữ liệu từ Supabase Cloud về...";

    toast("Đang tải dữ liệu từ Supabase PostgreSQL...");

    const res = await SupabaseSyncEngine.pullAllCollections((prog) => {
      const pct = Math.round((prog.index / prog.totalSlugs) * 100);
      if (pPercent) pPercent.textContent = `${pct}%`;
      if (pBar) pBar.style.width = `${pct}%`;
      if (pDetail) pDetail.textContent = `[${prog.index}/${prog.totalSlugs}] Đang tải ${prog.label}...`;
    });

    if (res.ok) {
      toast(`Đã kéo thành công ${res.totalPulled} tài liệu từ Supabase về Web!`);
      if (pTitle) pTitle.textContent = "Kéo dữ liệu hoàn tất!";
      if (pDetail) pDetail.textContent = `Đã cập nhật ${res.totalPulled} tài liệu vào bộ nhớ máy và website.`;
    }

    window.refreshSupabaseStats();
    setTimeout(() => { if (box) box.style.display = "none"; }, 4000);
  };

  window.syncSingleCollection = async function (slug) {
    const mapping = SupabaseSyncEngine.MAPPINGS[slug];
    if (!mapping) return;
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key.");
      openSupabaseModal();
      return;
    }
    toast(`Đang đẩy ${mapping.label} lên Supabase Cloud...`);
    const items = getMergedList(slug).map(stripSource);
    let okCount = 0;
    for (const it of items) {
      const res = await SupabaseSyncEngine.upsertDoc(slug, it);
      if (res.ok) okCount++;
    }
    toast(`Đã đồng bộ ${okCount}/${items.length} bản ghi ${mapping.label} lên bảng [${mapping.table}]!`);
    window.refreshSupabaseStats();
  };

  window.pullSingleCollection = async function (slug) {
    const mapping = SupabaseSyncEngine.MAPPINGS[slug];
    if (!mapping) return;
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key.");
      openSupabaseModal();
      return;
    }
    toast(`Đang kéo dữ liệu ${mapping.label} từ Supabase...`);
    try {
      const { data, error } = await sb.from(mapping.table).select("*");
      if (error) throw error;
      if (Array.isArray(data)) {
        const store = loadAdminStore();
        store[slug] = store[slug] || [];
        data.forEach((row) => {
          const doc = mapping.fromRow(row);
          const idKey = mapping.idKey(doc);
          if (!idKey) return;
          const idx = store[slug].findIndex((x) => mapping.idKey(x) === idKey);
          if (idx >= 0) store[slug][idx] = { ...doc, __admin: true, __fromSupabase: true };
          else store[slug].push({ ...doc, __admin: true, __fromSupabase: true });
        });
        saveAdminStore(store);
        syncDataToWeb();
        renderSidebarLists();
        toast(`Đã kéo ${data.length} bản ghi ${mapping.label} từ Cloud về máy!`);
        window.refreshSupabaseStats();
      }
    } catch (err) {
      toast(`Lỗi kéo dữ liệu: ${err.message}`);
    }
  };

  function renderGlobalsView(container, slug) {
    const store = loadAdminStore();
    const settings = store.__siteSettings || {
      site_title: "RUSI TRKI — Nền tảng Ôn thi & Du học Nga",
      slogan: "Chinh phục tiếng Nga từ số 0 đến B2",
      contact_zalo: "0988.xxx.xxx",
      bank_name: "MB Bank (Quân Đội)",
      bank_account: "0988888888",
      bank_holder: "RUSI TRKI VIETNAM"
    };

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 24 }) : ""} Cấu hình Hệ thống Toàn diện (Globals)</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Cấu hình thông tin thương hiệu, tài khoản VietQR và thông số vận hành website.</p>
      </div>

      <div class="payload-doc-card">
        <div class="p-form-group">
          <label class="p-label">Tên Website:</label>
          <input type="text" class="p-input" id="cfgSiteTitle" value="${escAttr(settings.site_title)}" />
        </div>
        <div class="p-form-group">
          <label class="p-label">Khẩu hiệu Slogan:</label>
          <input type="text" class="p-input" id="cfgSlogan" value="${escAttr(settings.slogan)}" />
        </div>
        <div class="p-form-group">
          <label class="p-label">Hotline / Zalo hỗ trợ:</label>
          <input type="text" class="p-input" id="cfgZalo" value="${escAttr(settings.contact_zalo)}" />
        </div>
        <div class="p-form-row">
          <div>
            <label class="p-label">Ngân hàng VietQR:</label>
            <input type="text" class="p-input" id="cfgBankName" value="${escAttr(settings.bank_name)}" />
          </div>
          <div>
            <label class="p-label">Số tài khoản:</label>
            <input type="text" class="p-input" id="cfgBankAccount" value="${escAttr(settings.bank_account)}" />
          </div>
          <div>
            <label class="p-label">Tên chủ tài khoản:</label>
            <input type="text" class="p-input" id="cfgBankHolder" value="${escAttr(settings.bank_holder)}" />
          </div>
        </div>
        <button class="p-btn p-btn-primary" type="button" onclick="window.saveSiteSettings()">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu cấu hình</button>
      </div>
    `;
  }

  window.saveSiteSettings = function () {
    const store = loadAdminStore();
    store.__siteSettings = {
      site_title: document.getElementById("cfgSiteTitle")?.value || "",
      slogan: document.getElementById("cfgSlogan")?.value || "",
      contact_zalo: document.getElementById("cfgZalo")?.value || "",
      bank_name: document.getElementById("cfgBankName")?.value || "",
      bank_account: document.getElementById("cfgBankAccount")?.value || "",
      bank_holder: document.getElementById("cfgBankHolder")?.value || ""
    };
    saveAdminStore(store);
    toast("Đã lưu cấu hình hệ thống thành công!");
  };

  // =========================================================================
  // 14. EXPORT, IMPORT & RESET
  // =========================================================================

  function exportData() {
    const payload = {};
    COLLECTION_KEYS.forEach((k) => {
      payload[k] = getMergedList(k).map(stripSource);
    });

    const body = COLLECTION_KEYS.map((k) => `const ${k} = ${JSON.stringify(payload[k], null, 2)};`).join("\n\n");
    const today = new Date().toISOString().slice(0, 10);
    const content = `// Auto-generated by Payload CMS Studio on ${today}\n// Có thể dán trực tiếp vào data.js để lưu vĩnh viễn vào mã nguồn.\n\n${body}\n`;

    downloadFile(`rusitrki-data-export-${today}.js`, content, "application/javascript");
    toast("Đã tải về file export. Dán nội dung vào data.js khi muốn commit git.");
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
          const fn = new Function(text + `\n;return { ${COLLECTION_KEYS.join(", ")} };`);
          obj = fn();
        }
        importToStore(obj);
      } catch (err) {
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
    COLLECTION_KEYS.forEach((k) => {
      if (Array.isArray(obj[k])) {
        store[k] = store[k] || [];
        obj[k].forEach((it) => {
          const idKey = it.id || it.slug || it.title;
          if (!idKey) return;
          const idx = store[k].findIndex((x) => (x.id || x.slug || x.title) === idKey);
          if (idx >= 0) store[k][idx] = { ...it, __admin: true };
          else store[k].push({ ...it, __admin: true });
          count++;
        });
      }
    });
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();
    handleRoute();
    toast(`Đã import thành công ${count} tài liệu và đồng bộ về website!`);
  }

  function resetAdminData() {
    if (!confirm("Khôi phục TOÀN BỘ dữ liệu về mặc định gốc (từ data.js)? Tất cả chỉnh sửa admin sẽ được đặt lại.")) return;
    localStorage.removeItem(STORE_KEY);
    syncDataToWeb();
    renderSidebarLists();
    handleRoute();
    toast("Đã khôi phục dữ liệu gốc từ data.js!");
  }

  // =========================================================================
  // 15. SUPABASE CONNECTION MODAL
  // =========================================================================

  function openSupabaseModal() {
    const drawer = document.getElementById("modalSupabaseDrawer");
    const backdrop = document.getElementById("modalSupabaseBackdrop");
    if (!drawer || !backdrop) return;

    drawer.classList.add("open");
    backdrop.classList.add("open");

    const closeBtn = document.getElementById("modalSbClose");
    if (closeBtn) closeBtn.onclick = closeSupabaseModal;
    backdrop.onclick = closeSupabaseModal;

    const anonInp = document.getElementById("sbAnonKeyInput");
    if (anonInp && window.SUPABASE_CONFIG) {
      anonInp.value = window.SUPABASE_CONFIG.anonKey || "";
    }

    testSupabaseConn();

    const saveBtn = document.getElementById("btnSaveSbKey");
    if (saveBtn) {
      saveBtn.onclick = () => {
        const val = (anonInp?.value || "").trim();
        if (!val) { toast("Vui lòng nhập Anon Key."); return; }
        if (window.SUPABASE_CONFIG) {
          window.SUPABASE_CONFIG.anonKey = val;
          localStorage.setItem("trki_sb_anon_key", val);
        }
        if (window.RusiSupabase && window.RusiSupabase.resetClient) {
          window.RusiSupabase.resetClient();
        }
        testSupabaseConn();
        toast("Đã lưu khoá Supabase Anon Key!");
      };
    }

    const testBtn = document.getElementById("btnTestSbConn");
    if (testBtn) testBtn.onclick = testSupabaseConn;

    const pushBtn = document.getElementById("btnPushAllToSb");
    if (pushBtn) pushBtn.onclick = () => window.syncAllToSupabase();

    const pullBtn = document.getElementById("btnPullAllFromSb");
    if (pullBtn) pullBtn.onclick = () => window.pullAllFromSupabase();
  }

  function closeSupabaseModal() {
    const drawer = document.getElementById("modalSupabaseDrawer");
    const backdrop = document.getElementById("modalSupabaseBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  async function testSupabaseConn() {
    const badge = document.getElementById("sbConnStatusBadge");
    const msg = document.getElementById("sbConnMessage");
    if (!badge || !msg) return;

    badge.textContent = "Đang kiểm tra...";
    badge.className = "p-pill p-pill-warning";
    msg.textContent = "Đang gửi yêu cầu ping tới máy chủ Supabase...";

    if (!window.RusiSupabase || !window.RusiSupabase.testConnection) {
      badge.textContent = "Chưa nạp SDK";
      badge.className = "p-pill p-pill-danger";
      msg.textContent = "Không tìm thấy thư viện RusiSupabase.";
      return;
    }

    try {
      const res = await window.RusiSupabase.testConnection();
      if (res.ok) {
        badge.textContent = `Kết nối tốt (${res.latency || 45}ms)`;
        badge.className = "p-pill p-pill-success";
        msg.textContent = "Kết nối cơ sở dữ liệu Supabase PostgreSQL thành công.";
      } else {
        badge.textContent = "Chưa có Anon Key";
        badge.className = "p-pill p-pill-warning";
        msg.textContent = res.message || "Vui lòng dán Anon Key từ Supabase Dashboard.";
      }
    } catch (e) {
      badge.textContent = "Lỗi kết nối";
      badge.className = "p-pill p-pill-danger";
      msg.textContent = e.message;
    }
  }

  // =========================================================================
  // 16. MOBILE DRAWER & THEME SWITCHER
  // =========================================================================

  function initMobileDrawer() {
    const toggleBtn = document.getElementById("btnMenuToggle");
    const sidebar = document.getElementById("payloadSidebar");
    const backdrop = document.getElementById("payloadBackdrop");
    const closeBtn = document.getElementById("sidebarCloseBtn");

    if (toggleBtn && sidebar && backdrop) {
      toggleBtn.onclick = () => {
        sidebar.classList.add("open");
        backdrop.classList.add("open");
        backdrop.onclick = closeMobileSidebar;
      };
    }

    if (closeBtn) closeBtn.onclick = closeMobileSidebar;
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("payloadSidebar");
    const backdrop = document.getElementById("payloadBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggleBtn = document.getElementById("btnToggleTheme");
    if (toggleBtn) {
      toggleBtn.innerHTML = savedTheme === "dark" ? (window.RusiIcons ? RusiIcons.get("moon", { size: 16 }) : "") : (window.RusiIcons ? RusiIcons.get("sun", { size: 16 }) : "");
      toggleBtn.onclick = () => {
        const cur = document.documentElement.getAttribute("data-theme") || "dark";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(THEME_KEY, next);
        toggleBtn.innerHTML = next === "dark" ? (window.RusiIcons ? RusiIcons.get("moon", { size: 16 }) : "") : (window.RusiIcons ? RusiIcons.get("sun", { size: 16 }) : "");
      };
    }
  }

  // =========================================================================
  // 17. AUTH & GATE LOGIC
  // =========================================================================

  function applyAuthState(isAuthed) {
    const loginGate = document.getElementById("loginGate");
    const deniedGate = document.getElementById("deniedGate");
    const appEl = document.getElementById("payloadApp");

    if (State.devMode || localStorage.getItem(DEV_MODE_KEY) === "true") {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "flex";
      return;
    }

    if (!isAuthed || !window.Auth || !window.Auth.user) {
      if (loginGate) loginGate.style.display = "flex";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "none";
      return;
    }

    const email = String(window.Auth.user.email || "").toLowerCase().trim();
    const adminEmails = (window.ADMIN_EMAILS || []).map((e) => String(e).toLowerCase().trim());
    const isAdmin = adminEmails.includes(email);

    if (isAdmin) {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "flex";

      const nameEl = document.getElementById("sidebarUserName");
      const avatarEl = document.getElementById("sidebarAvatar");
      if (nameEl) nameEl.textContent = window.Auth.user.displayName || email;
      if (avatarEl) avatarEl.textContent = (window.Auth.user.displayName || email)[0].toUpperCase();
    } else {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "flex";
      if (appEl) appEl.style.display = "none";

      const deniedInfo = document.getElementById("deniedInfo");
      if (deniedInfo) deniedInfo.textContent = `Tài khoản hiện tại: ${email}`;
    }
  }

  function enableDevMode() {
    State.devMode = true;
    localStorage.setItem(DEV_MODE_KEY, "true");
    applyAuthState(true);
    toast("Đã kích hoạt Chế độ Dev Mode offline.");
  }

  // =========================================================================
  // 18. TOAST NOTIFICATIONS & UTILS
  // =========================================================================

  function toast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const el = document.createElement("div");
    el.className = "payload-toast";
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.2s ease";
      setTimeout(() => el.remove(), 250);
    }, 3200);
  }
  window.toast = toast;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function escAttr(s) {
    return esc(s);
  }

  // =========================================================================
  // 19. INITIALIZATION
  // =========================================================================

  function init() {
    initTheme();
    initMobileDrawer();
    renderSidebarLists();

    const impInput = document.getElementById("importFileInput");
    if (impInput) impInput.addEventListener("change", onImportFile);

    const loginBtn = document.getElementById("adminLoginBtn");
    if (loginBtn) loginBtn.onclick = () => window.Auth && window.Auth.signInWithGoogle();

    const switchBtn = document.getElementById("btnSwitchAccount");
    if (switchBtn) switchBtn.onclick = () => window.Auth && window.Auth.signInWithGoogle();

    const dev1 = document.getElementById("btnDevBypass");
    if (dev1) dev1.onclick = enableDevMode;

    const dev2 = document.getElementById("btnDevBypass2");
    if (dev2) dev2.onclick = enableDevMode;

    const pushSb = document.getElementById("btnPushAllToSb");
    if (pushSb) pushSb.onclick = () => window.syncAllToSupabase();

    const pullSb = document.getElementById("btnPullAllFromSb");
    if (pullSb) pullSb.onclick = () => window.pullAllFromSupabase();

    const signoutBtn = document.getElementById("btnSignOut");
    if (signoutBtn) {
      signoutBtn.onclick = () => {
        localStorage.removeItem(DEV_MODE_KEY);
        if (window.Auth && window.Auth.signOut) window.Auth.signOut();
        applyAuthState(false);
      };
    }

    if (window.Auth && window.Auth.isReady) {
      window.Auth.isReady().then(() => {
        applyAuthState(!!window.Auth.user);
        window.Auth.onChange((u) => applyAuthState(!!u));
      });
    } else {
      applyAuthState(false);
    }

    window.addEventListener("storage", (e) => {
      if (e.key === STORE_KEY) {
        renderSidebarLists();
        handleRoute();
      }
    });

    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.openSupabaseModal = openSupabaseModal;
  window.openLivePreview = openLivePreview;
})();
