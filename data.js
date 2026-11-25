/**
 * ============================================================================
 * RUSI TRKI — CLIENT DATA BRIDGE & SMART LOADER ENGINE
 * Phiên bản tối ưu: Modular Data Chunking + IndexedDB 0-Egress Browser Cache
 * Phiên bản dữ liệu: v12.0 (Cập nhật: 2026-11-24)
 * ============================================================================
 * Kiến trúc tối giản Egress & Chống rò rỉ dữ liệu:
 * 1. Dữ liệu cốt lõi nhẹ (~11KB: PACKAGES, SHOP_PRODUCTS, BLOG_POSTS) nạp tức thì.
 * 2. Toàn bộ học liệu lớn (Đề thi TRKI, Từ vựng, Nghe, Nói, Viết, Ngữ pháp)
 *    nằm ở các module JSON độc lập trong 'data/modules/'.
 * 3. RusiDataLoader tự động nạp đúng module cho trang hiện tại (On-demand)
 *    và lưu vĩnh viễn vào IndexedDB của trình duyệt máy người học.
 *    -> Sau lần tải đầu tiên, toàn bộ việc chuyển trang tốn ĐÚNG 0 BYTE EGRESS!
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. DỮ LIỆU CỐT LÕI NHẸ NẠP TRỰC TIẾP (CORE LIGHTWEIGHT COLLECTIONS)
  const PACKAGES = [
  {
    "id": "pro_1m",
    "code": "pro_1m",
    "badge": "NƯỚC RÚT",
    "name": "PRO 1 tháng",
    "title": "PRO 1 tháng",
    "desc": "Phù hợp cho học viên còn 2–4 tuần nữa vào phòng thi thật, cần cày đề cấp tốc để quen áp lực phòng thi.",
    "description": "Phù hợp cho học viên còn 2–4 tuần nữa vào phòng thi thật, cần cày đề cấp tốc để quen áp lực phòng thi.",
    "price": 399000,
    "price_vnd": 399000,
    "priceOld": 590000,
    "price_old": 590000,
    "duration_months": 1,
    "duration_days": null,
    "is_lifetime": false,
    "popular": false,
    "is_popular": false,
    "features": [
      "Mở khóa toàn bộ 91 đề thi TRKI A1–C2 (6.600+ câu hỏi)",
      "Bấm giờ phòng thi thật & chấm điểm tự động chuẩn CBT",
      "Đáp án & giải thích ngữ pháp 6 cách chi tiết",
      "AI nhận diện & chấm điểm phát âm cơ bản",
      "Đồng bộ tiến độ học tập trên mọi thiết bị"
    ]
  },
  {
    "id": "pro_3m",
    "code": "pro_3m",
    "badge": "PHỔ BIẾN NHẤT",
    "name": "PRO 3 tháng",
    "title": "PRO 3 tháng",
    "desc": "Chu kỳ vàng hoàn thành 1 cấp độ (A1→A2 hoặc A2→B1), sinh viên ôn thi học phần và săn học bổng Nga.",
    "description": "Chu kỳ vàng hoàn thành 1 cấp độ (A1→A2 hoặc A2→B1), sinh viên ôn thi học phần và săn học bổng Nga.",
    "price": 899000,
    "price_vnd": 899000,
    "priceOld": 1450000,
    "price_old": 1450000,
    "duration_months": 3,
    "duration_days": null,
    "is_lifetime": false,
    "popular": false,
    "is_popular": false,
    "features": [
      "Tất cả quyền lợi của gói 1 Tháng",
      "Luyện nói Shadowing cùng AI toàn bộ 28 bài học",
      "Kho 33 Lọ từ vựng hệ thống & 5.000+ từ vựng chuẩn TRKI",
      "Không giới hạn tạo Lọ từ vựng cá nhân (thuật toán SM-2)",
      "Mở khóa trọn bộ kho Luyện nghe CEFR",
      "Tiết kiệm 25% chi phí so với mua lẻ từng tháng"
    ]
  },
  {
    "id": "pro_1y",
    "code": "pro_1y",
    "badge": "GIÁ TRỊ CAO NHẤT",
    "name": "PRO 1 năm",
    "title": "PRO 1 năm",
    "desc": "Đồng hành trọn vẹn 1 năm Khoa dự bị (Подфак) tại Nga hoặc cả năm học chuyên ngành đại học.",
    "description": "Đồng hành trọn vẹn 1 năm Khoa dự bị (Подфак) tại Nga hoặc cả năm học chuyên ngành đại học.",
    "price": 1899000,
    "price_vnd": 1899000,
    "priceOld": 3500000,
    "price_old": 3500000,
    "duration_months": 12,
    "duration_days": null,
    "is_lifetime": false,
    "popular": false,
    "is_popular": false,
    "features": [
      "Tất cả quyền lợi của gói 3 Tháng",
      "Mở khóa toàn bộ 11 đề Luyện viết tự luận (Письмо) chấm AI không giới hạn",
      "Đặc quyền kho 5.000+ từ vựng & phân tích ngữ pháp chuyên sâu",
      "Tặng bộ cẩm nang sinh tồn & kinh nghiệm du học Nga",
      "Ưu tiên hỗ trợ kỹ thuật và học thuật 1-1",
      "Tiết kiệm tới 60% chi phí (~158.000đ / tháng)"
    ]
  }
];
  const SHOP_PRODUCTS = [
  {
    "id": "alenka-100g",
    "code": "alenka-100g",
    "name": "Socola Alenka truyền thống 100g",
    "title": "Socola Alenka truyền thống 100g",
    "category": "banh_keo",
    "category_name": "Bánh kẹo Nga",
    "price": 45000,
    "price_vnd": 45000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "Bán chạy",
    "description": "Socola sữa béo ngậy biểu tượng nước Nga từ năm 1965, hình em bé quấn khăn quen thuộc.",
    "status": "in_stock"
  },
  {
    "id": "korovka-waffle",
    "code": "korovka-waffle",
    "name": "Bánh xốp sữa bò Korovka 150g",
    "title": "Bánh xốp sữa bò Korovka 150g",
    "category": "banh_keo",
    "category_name": "Bánh kẹo Nga",
    "price": 55000,
    "price_vnd": 55000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "",
    "description": "Bánh xốp giòn rụm ngậy vị sữa tươi đun cô đặc vùng nông thôn Nga, hoàn hảo khi thưởng trà.",
    "status": "in_stock"
  },
  {
    "id": "mishka-kosolapy",
    "code": "mishka-kosolapy",
    "name": "Kẹo gấu Mishka Kosolapy Nga 250g",
    "title": "Kẹo gấu Mishka Kosolapy Nga 250g",
    "category": "banh_keo",
    "category_name": "Bánh kẹo Nga",
    "price": 85000,
    "price_vnd": 85000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "Truyền thống",
    "description": "Kẹo socola hạnh nhân giòn tan gắn liền với kiệt tác hội họa 'Buổi sáng trong rừng thông'.",
    "status": "in_stock"
  },
  {
    "id": "siberia-cream",
    "code": "siberia-cream",
    "name": "Kem dưỡng ẩm thảo mộc Siberia 75ml",
    "title": "Kem dưỡng ẩm thảo mộc Siberia 75ml",
    "category": "my_pham",
    "category_name": "Mỹ phẩm Siberia",
    "price": 120000,
    "price_vnd": 120000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "Thảo mộc",
    "description": "Chiết xuất hắc mai biển và tinh dầu thông tuyết Taiga, chống nẻ và dưỡng da mềm mịn mùa đông.",
    "status": "in_stock"
  },
  {
    "id": "babushka-shampoo",
    "code": "babushka-shampoo",
    "name": "Dầu gội thảo dược Bà già Agafia 350ml",
    "title": "Dầu gội thảo dược Bà già Agafia 350ml",
    "category": "my_pham",
    "category_name": "Mỹ phẩm Siberia",
    "price": 175000,
    "price_vnd": 175000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "Organic",
    "description": "Công thức cổ truyền 37 loại thảo mộc vùng Taiga, kích thích mọc tóc và nuôi dưỡng chân tóc dày khỏe.",
    "status": "in_stock"
  },
  {
    "id": "cheburashka-plush",
    "code": "cheburashka-plush",
    "name": "Gấu bông Cheburashka tai to 20cm",
    "title": "Gấu bông Cheburashka tai to 20cm",
    "category": "luu_niem",
    "category_name": "Quà lưu niệm Nga",
    "price": 210000,
    "price_vnd": 210000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "",
    "description": "Nhân vật hoạt hình quốc dân Nga với đôi tai to ngộ nghĩnh, chất lông mịn cao cấp an toàn.",
    "status": "in_stock"
  },
  {
    "id": "matryoshka-5pcs",
    "code": "matryoshka-5pcs",
    "name": "Búp bê Matryoshka vẽ tay truyền thống 5 lớp",
    "title": "Búp bê Matryoshka vẽ tay truyền thống 5 lớp",
    "category": "luu_niem",
    "category_name": "Quà lưu niệm Nga",
    "price": 290000,
    "price_vnd": 290000,
    "original_price": 0,
    "image_url": "https://images.unsplash.com/photo-1572945753563-804f5e5d6674?auto=format&fit=crop&w=600&q=80",
    "image": "https://images.unsplash.com/photo-1572945753563-804f5e5d6674?auto=format&fit=crop&w=600&q=80",
    "stock": 100,
    "badge": "Thủ công",
    "description": "Gỗ bồ đề tự nhiên mài thủ công, sơn bóng hoa văn hoa cúc rực rỡ, biểu tượng may mắn gia đình.",
    "status": "in_stock"
  }
];
  const BLOG_POSTS = [
  {
    "slug": "lo-trinh-on-trki-teu-trong-3-thang",
    "id": "post_01",
    "title": "Lộ trình ôn ТРКИ ТЭУ trong 3 tháng",
    "category": "du_hoc_trai_nghiem",
    "categoryName": "Trải nghiệm du học & KTX",
    "cover": "assets/red-square.jpg",
    "excerpt": "Tháng 1: bảng chữ cái + từ vựng sống còn. Tháng 2: 6 cách + động từ chuyển động. Tháng 3: luyện đề mỗi tuần và sửa phát âm bằng AI.",
    "content": "## Lộ trình ôn thi chứng chỉ ТРКИ ТЭУ (A1) trong 3 tháng\n\nĐể đạt chứng chỉ ТРКИ trình độ sơ cấp (A1), học viên cần nắm vững khoảng 780 từ vựng cốt lõi và 6 cách trong ngữ pháp tiếng Nga.\n\n### Tháng 1: Bảng chữ cái và Phát âm cơ bản\n- Làm quen với bảng chữ cái Cyrillic và quy tắc biến âm.\n- Học từ vựng theo chủ đề: Chào hỏi, Gia đình, Số đếm, Đồ dùng hàng ngày.\n- Luyện phát âm cùng trợ lý AI Rusika mỗi ngày 15 phút.\n\n### Tháng 2: 6 Cách trong tiếng Nga & Động từ chuyển động\n- Nắm vững Cách 1 đến Cách 6 qua các câu ví dụ thực tế.\n- Động từ chuyển động cơ bản: Идти - Ходить, Ехать - Ездить.\n- Bắt đầu luyện nghe 4 Part CEFR trên hệ thống RUSI.\n\n### Tháng 3: Giải đề thi thử & Hoàn thiện kỹ năng\n- Luyện đề thi thử trực tuyến trên RUSI TRKI với đồng hồ bấm giờ chuẩn phòng thi.\n- Chữa bài viết tả tranh và luyện nói phản xạ.",
    "date": "11/11/2026",
    "icon": "book-open-blog",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  },
  {
    "slug": "hoc-tu-vung-qua-chuoi-hanh-dong",
    "id": "post_02",
    "title": "Học từ vựng qua chuỗi hành động — vì sao hiệu quả?",
    "category": "ngu_phap",
    "categoryName": "Thành ngữ & Ngữ pháp Nga",
    "cover": "assets/red-square.jpg",
    "excerpt": "Thay vì học “bánh mì” đơn lẻ, hãy học cả câu: “Я режу хлеб и кладу сыр на хлеб” — một câu có danh từ, động từ và giới từ cùng lúc.",
    "content": "## Phương pháp học từ vựng qua Chuỗi hành động (Action Chains)\n\nHọc từ vựng đơn lẻ thường khiến người học nhanh quên và lúng túng khi đặt câu. Phương pháp **Chuỗi hành động** gắn từ vựng vào một chuỗi ngữ cảnh liên tục.\n\n### Ví dụ thực tế:\nThay vì chỉ học từ *хлеб* (bánh mì):\n1. **Я беру хлеб** (Tôi lấy bánh mì)\n2. **Я режу хлеб** (Tôi cắt bánh mì)\n3. **Я кладу сыр на хлеб** (Tôi đặt phô mai lên bánh mì)\n4. **Я ем бутерброд** (Tôi ăn bánh mì kẹp)\n\nNhờ vậy, bạn học được cả danh từ, động từ và cấu trúc giới từ đi kèm một cách tự nhiên nhất!",
    "date": "11/11/2026",
    "icon": "book-open-blog",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  },
  {
    "slug": "5-loi-phat-am-tieng-nga-cua-nguoi-viet",
    "id": "post_03",
    "title": "5 lỗi phát âm tiếng Nga của người Việt",
    "category": "ngu_phap",
    "categoryName": "Thành ngữ & Ngữ pháp Nga",
    "cover": "assets/red-square.jpg",
    "excerpt": "Ы, р, мягкий знак — ba “hung thủ” quen thuộc. Dùng chế độ luyện nói của trang để AI chấm điểm từng câu và theo dõi tiến bộ.",
    "content": "## 5 lỗi phát âm phổ biến của người Việt khi học tiếng Nga\n\n### 1. Âm Ы (Y)\nNhiều bạn phát âm thành âm \"I\" hoặc \"Ư\". Âm Ы đòi hỏi cuống lưỡi lùi về sau, không bẹt môi như âm I.\n\n### 2. Âm Rung Р (R)\nÂm rung đầu lưỡi cần thả lỏng và đẩy luồng hơi mạnh qua đầu lưỡi chạm vào lợi trên.\n\n### 3. Dấu mềm (Мягкий знак - Ь)\nKhông làm mềm phụ âm đứng trước khiến từ bị đổi nghĩa hoặc mất tính tự nhiên.\n\n### 4. Giảm âm (Редукция О và Е)\nChữ О khi không mang trọng âm phát âm thành А ngắn. Chữ Е phát âm thành И ngắn.\n\n### 5. Nuốt phụ âm cuối\nNgười Việt hay có thói quen không phát âm bật phụ âm cuối (như т, д, к, п). Hãy chú ý phát âm rõ phụ âm kết thúc từ.",
    "date": "11/11/2026",
    "icon": "book-open-blog",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  }
];

  // 2. KHỞI TẠO BỘ NHỚ BIẾN TOÀN CỤC CHO CÁC MODULE NẠP THEO NHU CẦU
  let _WRITING_TOPICS = [];
  let _WRITING_TASKS = [];
  let _LISTENING_LESSONS = [];
  let _VOCAB_LESSONS = [];
  let _GRAMMAR_LESSONS = [];
  let _VOCAB_JARS = [];
  let _VOCABULARIES = [];
  let _TOPIC_ARTICLES = {};
  let _SPEAKING_SETS = [];
  let _TRKI_INDEX = [];
  let _TRKI_BANK = [];
  let _TRKI_QUESTION_BANK = [];

  // Khai báo sẵn biến toàn cục trên window để tương thích 100% với code cũ
  if (typeof window !== 'undefined') {
    window.PACKAGES = PACKAGES;
    window.SHOP_PRODUCTS = SHOP_PRODUCTS;
    window.BLOG_POSTS = BLOG_POSTS;

    window.WRITING_TOPICS = _WRITING_TOPICS;
    window.WRITING_TASKS = _WRITING_TASKS;
    window.LISTENING_LESSONS = _LISTENING_LESSONS;
    window.VOCAB_LESSONS = _VOCAB_LESSONS;
    window.GRAMMAR_LESSONS = _GRAMMAR_LESSONS;

    window.VOCAB_JARS = _VOCAB_JARS;
    window.VOCABULARIES = _VOCABULARIES;
    window.TOPIC_ARTICLES = _TOPIC_ARTICLES;
    window.SPEAKING_SETS = _SPEAKING_SETS;
    window.TRKI_INDEX = _TRKI_INDEX;
    window.TRKI_BANK = _TRKI_BANK;
    window.TRKI_QUESTION_BANK = _TRKI_QUESTION_BANK;

    window.WRITING_SUBMISSIONS = [];
    window.TRKI_SUBMISSIONS = [];
    window.SHOP_ORDERS = [];
  }

  // 3. ĐỘNG CƠ BỘ NHỚ ĐỆM INDEXEDDB (RUSI INDEXEDDB CACHE ENGINE)
  const DB_NAME = 'rusi_offline_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'data_modules';
  const DATA_VERSION = 'v12.1';

  let _dbPromise = null;

  function openIndexedDB() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return resolve(null);
      }
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
    return _dbPromise;
  }

  async function getFromIDB(key) {
    const db = await openIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => {
          const res = req.result;
          if (res && res.version === DATA_VERSION && res.data) {
            resolve(res.data);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
  }

  async function saveToIDB(key, data) {
    const db = await openIndexedDB();
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ key, version: DATA_VERSION, data, cachedAt: Date.now() });
    } catch (_) {}
  }

  // 4. DANH MỤC CÁC MODULE NẠP THEO NHU CẦU (MODULE REGISTRY)
  const MODULE_REGISTRY = {
    VOCAB_JARS: { file: 'data/modules/vocab_jars.json', assign: (d) => { _VOCAB_JARS = d; window.VOCAB_JARS = d; } },
    VOCABULARIES: { file: 'data/modules/vocabularies.json', assign: (d) => { _VOCABULARIES = d; window.VOCABULARIES = d; } },
    VOCAB_LESSONS: { file: 'data/modules/vocab_lessons.json', assign: (d) => { _VOCAB_LESSONS = d; window.VOCAB_LESSONS = d; } },
    TOPIC_ARTICLES: { file: 'data/modules/topic_articles.json', assign: (d) => { _TOPIC_ARTICLES = d; window.TOPIC_ARTICLES = d; } },
    SPEAKING_SETS: { file: 'data/modules/speaking_sets.json', assign: (d) => { _SPEAKING_SETS = d; window.SPEAKING_SETS = d; } },
    LISTENING_LESSONS: { file: 'data/modules/listening_lessons.json', assign: (d) => { _LISTENING_LESSONS = d; window.LISTENING_LESSONS = d; } },
    WRITING_TASKS: { file: 'data/modules/writing_tasks.json', assign: (d) => { _WRITING_TASKS = d; window.WRITING_TASKS = d; } },
    WRITING_TOPICS: { file: 'data/modules/writing_topics.json', assign: (d) => { _WRITING_TOPICS = d; window.WRITING_TOPICS = d; } },
    GRAMMAR_LESSONS: { file: 'data/modules/grammar_lessons.json', assign: (d) => { _GRAMMAR_LESSONS = d; window.GRAMMAR_LESSONS = d; } },
    TRKI_INDEX: { file: 'data/modules/trki_index.json', assign: (d) => { _TRKI_INDEX = d; window.TRKI_INDEX = d; } },
    TRKI_BANK: { file: 'data/modules/trki_bank.json', assign: (d) => { _TRKI_BANK = d; window.TRKI_BANK = d; } },
    TRKI_QUESTION_BANK: { file: 'data/modules/trki_questions.json', assign: (d) => { _TRKI_QUESTION_BANK = d; window.TRKI_QUESTION_BANK = d; } }
  };

  const _loadingPromises = {};
  const _loadedModules = new Set();

  // Kiểm tra xem dữ liệu có giá trị hợp lệ không (hỗ trợ cả mảng Array lẫn Object)
  function hasValidData(d) {
    if (!d) return false;
    if (Array.isArray(d)) return d.length > 0;
    if (typeof d === 'object') return Object.keys(d).length > 0;
    return false;
  }

  function getAppRoot() {
    if (typeof window === 'undefined') return '';
    if (window.location && window.location.protocol === 'file:') return '';
    const path = (window.location && window.location.pathname) || '';
    if (path.startsWith('/rusitrki/')) return '/rusitrki/';
    const segs = path.replace(/^\//, '').split('/').filter(Boolean);
    if (segs.length <= 1) return '';
    return '/';
  }

  // 5. TRÌNH NẠP DỮ LIỆU THÔNG MINH (RUSI DATA LOADER)
  const RusiDataLoader = {
    version: DATA_VERSION,

    // Kiểm tra xem module đã có trong bộ nhớ RAM chưa
    isLoaded(moduleKey) {
      if (typeof window === 'undefined') return false;
      return _loadedModules.has(moduleKey) || hasValidData(window[moduleKey]);
    },

    // Nạp 1 module theo quy trình: RAM -> IndexedDB (0ms) -> Network JSON
    async load(moduleKey) {
      if (this.isLoaded(moduleKey)) {
        return window[moduleKey];
      }
      if (_loadingPromises[moduleKey]) {
        return _loadingPromises[moduleKey];
      }

      const conf = MODULE_REGISTRY[moduleKey];
      if (!conf) {
        console.warn('[RusiDataLoader] Module không xác định:', moduleKey);
        return null;
      }

      const promise = (async () => {
        // Bước 1: Thử đọc từ IndexedDB của máy học viên (0 byte Egress!)
        try {
          const cached = await getFromIDB(moduleKey);
          if (hasValidData(cached)) {
            conf.assign(cached);
            return cached;
          }
        } catch (_) {}

        // Bước 2: Tải file JSON tĩnh độc lập từ server / Cloudflare CDN (Root-aware)
        try {
          const res = await fetch(getAppRoot() + conf.file + '?v=' + DATA_VERSION);
          if (res.ok) {
            const data = await res.json();
            conf.assign(data);
            _loadedModules.add(moduleKey);
            // Lưu vào IndexedDB cho các lần truy cập tiếp theo (Offline-first)
            saveToIDB(moduleKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[RusiDataLoader] Lỗi nạp module ' + moduleKey + ':', err);
        }
        return window[moduleKey] || (moduleKey === 'TOPIC_ARTICLES' ? {} : []);
      })();

      _loadingPromises[moduleKey] = promise;
      try {
        return await promise;
      } finally {
        delete _loadingPromises[moduleKey];
      }
    },

    // Nạp song song nhiều module
    async loadMultiple(moduleKeys) {
      return Promise.all(moduleKeys.map((k) => this.load(k)));
    },

    // Tự động phân tích trang hiện tại và chuẩn bị trước đúng các module cần thiết
    async prepareForCurrentPage() {
      if (typeof window === 'undefined') return;
      const page = ((typeof document !== 'undefined' && document.body) ? (document.body.getAttribute('data-page') || '') : '').toLowerCase();
      const rawPath = ((window.location && window.location.pathname) || '').toLowerCase();
      const routePath = rawPath.replace(/^\/rusitrki(?=\/|$)/, '');
      const fileName = routePath.split('/').filter(Boolean).pop() || '';

      let targetModules = [];
      if (page === 'vocabulary' || routePath.includes('vocab')) {
        targetModules = ['VOCAB_JARS', 'TOPIC_ARTICLES', 'VOCAB_LESSONS'];
      } else if (page === 'listening' || routePath.includes('listen')) {
        targetModules = ['LISTENING_LESSONS'];
      } else if (page === 'writing' || routePath.includes('writ')) {
        targetModules = ['WRITING_TASKS', 'WRITING_TOPICS'];
      } else if (page === 'speaking' || routePath.includes('speak')) {
        targetModules = ['SPEAKING_SETS'];
      } else if (page === 'mock-test' || routePath.includes('mock-test') || fileName.includes('trki') || routePath.includes('test')) {
        targetModules = ['TRKI_INDEX'];
      } else if (page === 'admin' || routePath.includes('admin') || routePath.includes('cms')) {
        targetModules = ['VOCAB_JARS', 'TOPIC_ARTICLES', 'VOCABULARIES', 'TRKI_BANK', 'TRKI_QUESTION_BANK', 'SPEAKING_SETS', 'LISTENING_LESSONS', 'WRITING_TASKS', 'WRITING_TOPICS', 'GRAMMAR_LESSONS', 'VOCAB_LESSONS'];
      }

      if (targetModules.length > 0) {
        await this.loadMultiple(targetModules);
      }
    },

    // Safe no-op: không tự động tải ngầm 15.5MB dữ liệu thừa ở nền
    prefetchIdle() {}
  };

  // Khởi động nạp tự động ngay khi tệp script được đọc
  if (typeof window !== 'undefined') {
    window.RusiDataLoader = RusiDataLoader;
    if (typeof globalThis !== 'undefined') globalThis.RusiDataLoader = RusiDataLoader;

    // Đối tượng DATA tổng hợp bảo toàn backwards-compatibility
    window.DATA = {
      get vocabJars() { return window.VOCAB_JARS || []; },
      get vocabularies() { return window.VOCABULARIES || []; },
      get topicArticles() { return window.TOPIC_ARTICLES || {}; },
      get vocabLessons() { return window.VOCAB_LESSONS || []; },
      get listeningLessons() { return window.LISTENING_LESSONS || []; },
      get speakingSets() { return window.SPEAKING_SETS || []; },
      get writingTasks() { return window.WRITING_TASKS || []; },
      get writingTopics() { return window.WRITING_TOPICS || []; },
      get trkiIndex() { return window.TRKI_INDEX || []; },
      get trkiBank() { return window.TRKI_BANK || []; },
      get trkiQuestionBank() { return window.TRKI_QUESTION_BANK || []; },
      get shopProducts() { return window.SHOP_PRODUCTS || SHOP_PRODUCTS; },
      get packages() { return window.PACKAGES || PACKAGES; },
      get grammarLessons() { return window.GRAMMAR_LESSONS || []; },
      get blogPosts() { return window.BLOG_POSTS || BLOG_POSTS; }
    };

    // Tự động chuẩn bị dữ liệu cho trang hiện tại
    RusiDataLoader.prepareForCurrentPage().catch(() => {});
  }
})();
