/**
 * ============================================================================
 * RUSI TRKI — CLIENT DATA BRIDGE & SMART LOADER ENGINE
 * Phiên bản tối ưu: Modular Data Chunking + IndexedDB 0-Egress Browser Cache
 * Phiên bản dữ liệu: v11.1 (Cập nhật: 2026-11-19)
 * ============================================================================
 * Kiến trúc tối giản Egress & Chống rò rỉ dữ liệu:
 * 1. Dữ liệu cốt lõi nhẹ (<500KB) được nạp trực tiếp tức thì (Zero-Latency).
 * 2. Dữ liệu nặng (Đề thi TRKI, Ngân hàng câu hỏi, Từ điển, Lọ từ, Luyện nói)
 *    được phân tách thành các module độc lập trong thư mục 'data/modules/'.
 * 3. RusiDataLoader tự động nạp theo nhu cầu từng trang (On-demand Lazy Loading)
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
    "content": "## Lộ trình ôn thi chứng chỉ ТРКИ ТЭУ (A1) trong 3 tháng\\n\\nĐể đạt chứng chỉ ТРКИ trình độ sơ cấp (A1), học viên cần nắm vững khoảng 780 từ vựng cốt lõi và 6 cách trong ngữ pháp tiếng Nga.\\n\\n### Tháng 1: Bảng chữ cái và Phát âm cơ bản\\n- Làm quen với bảng chữ cái Cyrillic và quy tắc biến âm.\\n- Học từ vựng theo chủ đề: Chào hỏi, Gia đình, Số đếm, Đồ dùng hàng ngày.\\n- Luyện phát âm cùng trợ lý AI Rusika mỗi ngày 15 phút.\\n\\n### Tháng 2: 6 Cách trong tiếng Nga & Động từ chuyển động\\n- Nắm vững Cách 1 đến Cách 6 qua các câu ví dụ thực tế.\\n- Động từ chuyển động cơ bản: Идти - Ходить, Ехать - Ездить.\\n- Bắt đầu luyện nghe 4 Part CEFR trên hệ thống RUSI.\\n\\n### Tháng 3: Giải đề thi thử & Hoàn thiện kỹ năng\\n- Luyện đề thi thử trực tuyến trên RUSI TRKI với đồng hồ bấm giờ chuẩn phòng thi.\\n- Chữa bài viết tả tranh và luyện nói phản xạ.",
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
    "content": "## Phương pháp học từ vựng qua Chuỗi hành động (Action Chains)\\n\\nHọc từ vựng đơn lẻ thường khiến người học nhanh quên và lúng túng khi đặt câu. Phương pháp **Chuỗi hành động** gắn từ vựng vào một chuỗi ngữ cảnh liên tục.\\n\\n### Ví dụ thực tế:\\nThay vì chỉ học từ *хлеб* (bánh mì):\\n1. **Я беру хлеб** (Tôi lấy bánh mì)\\n2. **Я режу хлеб** (Tôi cắt bánh mì)\\n3. **Я кладу сыр на хлеб** (Tôi đặt phô mai lên bánh mì)\\n4. **Я ем бутерброд** (Tôi ăn bánh mì kẹp)\\n\\nNhờ vậy, bạn học được cả danh từ, động từ và cấu trúc giới từ đi kèm một cách tự nhiên nhất!",
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
    "content": "## 5 lỗi phát âm phổ biến của người Việt khi học tiếng Nga\\n\\n### 1. Âm Ы (Y)\\nNhiều bạn phát âm thành âm \"I\" hoặc \"Ư\". Âm Ы đòi hỏi cuống lưỡi lùi về sau, không bẹt môi như âm I.\\n\\n### 2. Âm Rung Р (R)\\nÂm rung đầu lưỡi cần thả lỏng và đẩy luồng hơi mạnh qua đầu lưỡi chạm vào lợi trên.\\n\\n### 3. Dấu mềm (Мягкий знак - Ь)\\nKhông làm mềm phụ âm đứng trước khiến từ bị đổi nghĩa hoặc mất tính tự nhiên.\\n\\n### 4. Giảm âm (Редукция О và Е)\\nChữ О khi không mang trọng âm phát âm thành А ngắn. Chữ Е phát âm thành И ngắn.\\n\\n### 5. Nuốt phụ âm cuối\\nNgười Việt hay có thói quen không phát âm bật phụ âm cuối (như т, д, к, п). Hãy chú ý phát âm rõ phụ âm kết thúc từ.",
    "date": "11/11/2026",
    "icon": "book-open-blog",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  }
];
  const WRITING_TOPICS = [
  {
    "id": "topic_pic_daily_a1",
    "code": "topic_pic_daily_a1",
    "title": "Sinh hoạt thường nhật & Gia đình",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "daily",
    "category_name": "Sinh hoạt hằng ngày",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "timer-clock",
    "sort_order": 1,
    "is_pro_only": false,
    "raw_data": {}
  },
  {
    "id": "topic_pic_dorm_a2",
    "code": "topic_pic_dorm_a2",
    "title": "Ký túc xá & Đời sống sinh viên",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "dorm",
    "category_name": "Ký túc xá & Sinh viên",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "building-2",
    "sort_order": 2,
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "topic_pic_travel_b1",
    "code": "topic_pic_travel_b1",
    "title": "Du lịch & Khám phá thành phố Nga",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "travel",
    "category_name": "Du lịch & Danh lam",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "plane",
    "sort_order": 3,
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "topic_trans_intro_a1",
    "code": "topic_trans_intro_a1",
    "title": "Giao tiếp cơ bản & Giới thiệu bản thân",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "intro",
    "category_name": "Giao tiếp cơ bản",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "book-open-blog",
    "sort_order": 10,
    "is_pro_only": false,
    "raw_data": {}
  },
  {
    "id": "topic_trans_daily_a2",
    "code": "topic_trans_daily_a2",
    "title": "Sinh hoạt thường nhật & Mua sắm",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "shopping",
    "category_name": "Sinh hoạt & Mua sắm",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "utensils",
    "sort_order": 11,
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "topic_trans_work_b1",
    "code": "topic_trans_work_b1",
    "title": "Thư từ & Email công sở",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "letter",
    "category_name": "Thư tín & Công việc",
    "prompt": "",
    "vi": "",
    "min_words": 20,
    "suggested_words": [],
    "tips": [],
    "model_answer": "",
    "image_url": "",
    "icon": "briefcase",
    "sort_order": 12,
    "is_pro_only": true,
    "raw_data": {}
  }
];
  const WRITING_TASKS = [
  {
    "id": "pic_a1_01",
    "code": "pic_a1_01",
    "title": "Bài 1: Bữa sáng của gia đình",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "daily",
    "category_name": "Sinh hoạt",
    "prompt": "Посмотрите на фотографию и подробно опишите, что вы видите. Кто изображён на фото? Где они находятся? Что делает каждый член семьи? Какое у них настроение?",
    "prompt_text": "Посмотрите на фотографию и подробно опишите, что вы видите. Кто изображён на фото? Где они находятся? Что делает каждый член семьи? Какое у них настроение?",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/family-breakfast.jpg",
    "min_words": 25,
    "suggested_words": [
      {
        "id": "08fcbd53-565d-461e-acf2-ec4a44f1d5c0",
        "ru": "Стол",
        "word": "Стол",
        "word_normalized": "стол",
        "vi": "Bàn",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b5/Ru-%D1%81%D1%82%D0%BE%D0%BB.ogg/Ru-%D1%81%D1%82%D0%BE%D0%BB.ogg.mp3"
      },
      {
        "id": "3b630b3c-52bd-445d-9815-3c584b8dd48c",
        "ru": "большо́й",
        "word": "большо́й",
        "word_normalized": "большой",
        "vi": "to",
        "pos": "прил.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/47/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg.mp3"
      },
      {
        "id": "6e601bf0-9949-4870-a0f5-315e59998b40",
        "ru": "Молоко́",
        "word": "Молоко́",
        "word_normalized": "молоко",
        "vi": "Sữa",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/63/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg.mp3"
      },
      {
        "id": "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a",
        "ru": "Чай",
        "word": "Чай",
        "word_normalized": "чай",
        "vi": "Trà",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D1%87%D0%B0%D0%B9.ogg/Ru-%D1%87%D0%B0%D0%B9.ogg.mp3"
      },
      {
        "id": "c40e8975-331e-4113-b4c7-54358d87c259",
        "ru": "Ко́мната",
        "word": "Ко́мната",
        "word_normalized": "комната",
        "vi": "Phòng",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg.mp3"
      },
      {
        "id": "db1a6b8f-8a9f-4964-be74-337bb49e27e2",
        "ru": "завтра́кать",
        "word": "завтра́кать",
        "word_normalized": "завтракать",
        "vi": "ăn sáng",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/81/Ru-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA%D0%B0%D1%82%D1%8C.ogg/Ru-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0%D0%BA%D0%B0%D1%82%D1%8C.ogg.mp3"
      }
    ],
    "tips": [
      "Xác định bối cảnh: căn phòng nào (на кухне, в столовой)",
      "Mô tả từng người: bố, mẹ, các con đang làm gì (пьёт кофе, наливает чай, едят кашу)",
      "Mô tả đồ vật trên bàn (на столе стоят тарелки, чашки)",
      "Nhận xét về không khí và cảm xúc (атмосфера уютная, настроение отличное)"
    ],
    "sample_essay": "На фотографии я вижу дружную семью. Они сидят на кухне за большим столом и завтракают. Папа пьёт горячий кофе и читает утреннюю газету. Мама наливает чай и улыбается. Сын и дочь едят вкусную кашу со свежими фруктами. На столе стоят тарелки, чашки и ваза с цветами. В комнате светло и уютно. У всех членов семьи хорошее, радостное настроение.",
    "model_answer": "На фотографии я вижу дружную семью. Они сидят на кухне за большим столом и завтракают. Папа пьёт горячий кофе и читает утреннюю газету. Мама наливает чай и улыбается. Сын и дочь едят вкусную кашу со свежими фруктами. На столе стоят тарелки, чашки и ваза с цветами. В комнате светло и уютно. У всех членов семьи хорошее, радостное настроение.",
    "is_pro_only": false,
    "raw_data": {}
  },
  {
    "id": "trans_b1_01",
    "code": "trans_b1_01",
    "title": "Bài 1: Viết email xin phép nghỉ học vì ốm",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "letter",
    "category_name": "Thư từ & Email công sở",
    "prompt": "Hãy dịch bức thư điện tử sau sang tiếng Nga theo phong cách trang trọng:\n\"Kính gửi thầy Ivan Petrovich!\nEm viết thư này để xin phép thầy cho em nghỉ học buổi học ngày hôm nay, thứ Tư ngày 12 tháng 10, vì lý do bị cảm sốt. Bác sĩ đã khuyên em nên ở nhà nghỉ ngơi hai ngày. Em xin hứa sẽ tự học và nộp đầy đủ bài tập về nhà. Em xin gửi kèm theo thư này giấy chứng nhận của bệnh viện.\nEm xin trân trọng cảm ơn thầy!\"",
    "prompt_text": "Hãy dịch bức thư điện tử sau sang tiếng Nga...",
    "image_url": "",
    "min_words": 45,
    "suggested_words": [
      {
        "id": "0503b401-d820-454e-be18-75b7eb2198bb",
        "ru": "Университе́т",
        "word": "Университе́т",
        "word_normalized": "университет",
        "vi": "Trường đại học",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6f/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg.mp3"
      },
      {
        "id": "4671448f-b17c-488e-835c-2e10914ad9ef",
        "ru": "писа́ть",
        "word": "писа́ть",
        "word_normalized": "писать",
        "vi": "viết",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/64/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "49030d34-4174-4548-b6d1-a6871290afd0",
        "ru": "Студе́нт",
        "word": "Студе́нт",
        "word_normalized": "студент",
        "vi": "Sinh viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3"
      }
    ],
    "tips": [
      "Lời chào trang trọng: Уважаемый + Tên và tên đệm (Cách 1)",
      "Lý do: по причине болезни hoặc из-за болезни",
      "Khuyên làm gì: посоветовал мне остаться дома",
      "Đính kèm tài liệu: К письму прилагаю..."
    ],
    "sample_essay": "Уважаемый Иван Петрович!\nЯ пишу Вам, чтобы предупредить о том, что сегодня, в среду 12 октября, я не смогу присутствовать на занятии по причине болезни. Врач посоветовал мне остаться дома и соблюдать постельный режим в течение двух дней. Я обещаю самостоятельно изучить пропущенный материал и вовремя сдать все домашние задания. К письму прилагаю медицинскую справку.\nС уважением, Нам.",
    "model_answer": "Уважаемый Иван Петрович!\nЯ пишу Вам, чтобы предупредить о том, что сегодня, в среду 12 октября, я не смогу присутствовать на занятии по причине болезни. Врач посоветовал мне остаться дома и соблюдать постельный режим в течение двух дней. Я обещаю самостоятельно изучить пропущенный материал и вовремя сдать все домашние задания. К письму прилагаю медицинскую справку.\nС уважением, Нам.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "pic_b1_01",
    "code": "pic_b1_01",
    "title": "Bài 1: Quảng trường Đỏ mùa thu",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "travel",
    "category_name": "Du lịch & Khám phá thành phố Nga",
    "prompt": "Посмотрите на фотографию Красной площади в Москве. Опишите архитектуру, погоду, людей и ваше впечатление от этого исторического места.",
    "prompt_text": "Посмотрите на фотографию Красной площади...",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/red-square.jpg",
    "min_words": 50,
    "suggested_words": [
      {
        "id": "11ced31b-eb93-4fe2-acde-d20bfdc68883",
        "ru": "жить",
        "word": "жить",
        "word_normalized": "жить",
        "vi": "sống, cư ngụ",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "3b630b3c-52bd-445d-9815-3c584b8dd48c",
        "ru": "большо́й",
        "word": "большо́й",
        "word_normalized": "большой",
        "vi": "to",
        "pos": "прил.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/47/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg.mp3"
      },
      {
        "id": "9bc8340b-7566-4ae9-8281-0bb36e5e7ef3",
        "ru": "Парк",
        "word": "Парк",
        "word_normalized": "парк",
        "vi": "Công viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9b/Ru-%D0%BF%D0%B0%D1%80%D0%BA.ogg/Ru-%D0%BF%D0%B0%D1%80%D0%BA.ogg.mp3"
      }
    ],
    "tips": [
      "Giới thiệu tên địa danh nổi tiếng: Красная площадь, Кремль, Собор Василия Блаженного",
      "Miêu tả khách du lịch: dạo chơi, chụp ảnh lưu niệm (прогуливаются туристы, фотографируют)",
      "Mô tả thời tiết và ánh sáng mùa thu (ясная осенняя погода)",
      "Nêu ấn tượng sâu sắc của bản thân (производит глубокое впечатление)"
    ],
    "sample_essay": "Перед нами открывается величественный вид на Красную площадь — главное сердце Москвы и всей России. На заднем плане гордо возвышаются башни Московского Кремля и разноцветные купола собора Василия Блаженного. По площади не спеша прогуливаются многочисленные туристы из разных уголков мира: они увлечённо фотографируют исторические памятники и любуются архитектурой. Погода ясная и прохладная, освящённая мягким осенним солнцем. Это место производит глубокое, незабываемое впечатление своей грандиозностью и многовековой историей.",
    "model_answer": "Перед нами открывается величественный вид на Красную площадь — главное сердце Москвы и всей России. На заднем плане гордо возвышаются башни Московского Кремля и разноцветные купола собора Василия Блаженного. По площади не спеша прогуливаются многочисленные туристы из разных уголков мира: они увлечённо фотографируют исторические памятники и любуются архитектурой. Погода ясная и прохладная, освящённая мягким осенним солнцем. Это место производит глубокое, незабываемое впечатление своей грандиозностью и многовековой историей.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "trans_a2_01",
    "code": "trans_a2_01",
    "title": "Bài 1: Đi siêu thị mua sắm thực phẩm",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "shopping",
    "category_name": "Sinh hoạt thường nhật & Mua sắm",
    "prompt": "Hãy dịch đoạn văn sau sang tiếng Nga:\n\"Hôm nay sau giờ học, tôi cần đi siêu thị mua sắm thực phẩm. Tôi muốn mua sữa tươi, phô mai và một ít hoa quả. Tôi cũng sẽ mua trà đen vì trà ở phòng KTX đã hết.\"",
    "prompt_text": "Hãy dịch đoạn văn sau sang tiếng Nga...",
    "image_url": "",
    "min_words": 30,
    "suggested_words": [
      {
        "id": "6e601bf0-9949-4870-a0f5-315e59998b40",
        "ru": "Молоко́",
        "word": "Молоко́",
        "word_normalized": "молоко",
        "vi": "Sữa",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/63/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg.mp3"
      },
      {
        "id": "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a",
        "ru": "Чай",
        "word": "Чай",
        "word_normalized": "чай",
        "vi": "Trà",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D1%87%D0%B0%D0%B9.ogg/Ru-%D1%87%D0%B0%D0%B9.ogg.mp3"
      },
      {
        "id": "c40e8975-331e-4113-b4c7-54358d87c259",
        "ru": "Ко́мната",
        "word": "Ко́мната",
        "word_normalized": "комната",
        "vi": "Phòng",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg.mp3"
      },
      {
        "id": "f35b1a5f-53a9-450c-a775-39b54547fc94",
        "ru": "Магази́н",
        "word": "Магази́н",
        "word_normalized": "магазин",
        "vi": "Cửa hàng",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/77/Ru-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD.ogg/Ru-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD.ogg.mp3"
      }
    ],
    "tips": [
      "Sau giờ học: После занятий (Cách 2 số nhiều)",
      "Cần làm gì: Мне нужно + động từ hoàn thành thể (пойти)",
      "Mua thực phẩm: за продуктами (Cách 5) hoặc купить продукты (Cách 4)",
      "Một ít hoa quả: немного фруктов (Cách 2)"
    ],
    "sample_essay": "Сегодня после занятий мне нужно пойти в супермаркет за продуктами. Я хочу купить свежее молоко, сыр и немного фруктов. Я также куплю чёрный чай, потому что в комнате чай уже закончился.",
    "model_answer": "Сегодня после занятий мне нужно пойти в супермаркет за продуктами. Я хочу купить свежее молоко, сыр и немного фруктов. Я также куплю чёрный чай, потому что в комнате чай уже закончился.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "pic_a2_01",
    "code": "pic_a2_01",
    "title": "Bài 1: Buổi sáng ở phòng ký túc xá",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "dorm",
    "category_name": "Ký túc xá & Đời sống sinh viên",
    "prompt": "Посмотрите на фотографию и опишите утро в студенческом общежитии. Что делают соседи по комнате? Как они готовятся к занятиям?",
    "prompt_text": "Посмотрите на фотографию и опишите утро в общежитии.",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/f827ca97-ca9f-4071-ba8f-aa66283c77f2.gif",
    "min_words": 35,
    "suggested_words": [
      {
        "id": "08fcbd53-565d-461e-acf2-ec4a44f1d5c0",
        "ru": "Стол",
        "word": "Стол",
        "word_normalized": "стол",
        "vi": "Bàn",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b5/Ru-%D1%81%D1%82%D0%BE%D0%BB.ogg/Ru-%D1%81%D1%82%D0%BE%D0%BB.ogg.mp3"
      },
      {
        "id": "49030d34-4174-4548-b6d1-a6871290afd0",
        "ru": "Студе́нт",
        "word": "Студе́нт",
        "word_normalized": "студент",
        "vi": "Sinh viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3"
      },
      {
        "id": "83fd2fd1-8dd6-482d-95ba-1a7ceb249c12",
        "ru": "Рюкза́к",
        "word": "Рюкза́к",
        "word_normalized": "рюкзак",
        "vi": "cặp sách",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/69/Ru-%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA.ogg/Ru-%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA.ogg.mp3"
      },
      {
        "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
        "ru": "Кни́га",
        "word": "Кни́га",
        "word_normalized": "книга",
        "vi": "Sách",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3"
      },
      {
        "id": "c40e8975-331e-4113-b4c7-54358d87c259",
        "ru": "Ко́мната",
        "word": "Ко́мната",
        "word_normalized": "комната",
        "vi": "Phòng",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg.mp3"
      }
    ],
    "tips": [
      "Miêu tả không gian phòng KTX: bàn học, giá sách, giường ngủ",
      "Hành động của 2 người bạn cùng phòng (соседи по комнате)",
      "Cảm xúc và dự định sắp tới (скоро пойдут на занятия)"
    ],
    "sample_essay": "На фотографии показана уютная комната в студенческом общежитии утром. Два соседа готовятся к занятиям в университете. Один студент сидит за письменным столом и повторяет конспект по русской грамматике. Другой студент собирает свой рюкзак и проверяет расписание лекций. На полке аккуратно стоят словари и справочники. Скоро они вместе пойдут на первую пару.",
    "model_answer": "На фотографии показана уютная комната в студенческом общежитии утром. Два соседа готовятся к занятиям в университете. Один студент сидит за письменным столом и повторяет конспект по русской грамматике. Другой студент собирает свой рюкзак и проверяет расписание лекций. На полке аккуратно стоят словари и справочники. Скоро они вместе пойдут на первую пару.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "trans_a1_01",
    "code": "trans_a1_01",
    "title": "Bài 1: Giới thiệu bản thân và việc học tại Moskva",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "intro",
    "category_name": "Giao tiếp cơ bản & Giới thiệu bản thân",
    "prompt": "Hãy dịch đoạn văn sau sang tiếng Nga:\n\"Xin chào mọi người! Tôi tên là Nam. Tôi đến từ Việt Nam, hiện tại tôi đang sống và học tập tại Moskva. Tôi là sinh viên năm thứ nhất của trường Đại học Tổng hợp. Tôi rất thích học tiếng Nga vì nó là một ngôn ngữ tuyệt đẹp.\"",
    "prompt_text": "Hãy dịch đoạn văn sau sang tiếng Nga...",
    "image_url": "",
    "min_words": 25,
    "suggested_words": [
      {
        "id": "11ced31b-eb93-4fe2-acde-d20bfdc68883",
        "ru": "жить",
        "word": "жить",
        "word_normalized": "жить",
        "vi": "sống, cư ngụ",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "49030d34-4174-4548-b6d1-a6871290afd0",
        "ru": "Студе́нт",
        "word": "Студе́нт",
        "word_normalized": "студент",
        "vi": "Sinh viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3"
      },
      {
        "id": "553db8c1-34f9-47af-b649-2d843f925d64",
        "ru": "Университе́т",
        "word": "Университе́т",
        "word_normalized": "университет",
        "vi": "Đại học",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6f/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg.mp3"
      },
      {
        "id": "77a8dbb0-e56c-48a2-b27c-7edbe74c83f5",
        "ru": "чита́ть",
        "word": "чита́ть",
        "word_normalized": "читать",
        "vi": "đọc",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "df18e000-0809-4f01-ab18-68ca7aee7d40",
        "ru": "писа́ть",
        "word": "писа́ть",
        "word_normalized": "писать",
        "vi": "viết",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/64/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg.mp3"
      }
    ],
    "tips": [
      "Sử dụng cấu trúc Меня зовут + Danh từ riêng",
      "Đến từ đâu: giới từ из + Cách 2 (из Вьетнама)",
      "Sống và học ở đâu: giới từ в + Cách 6 (в Москве, в университете)",
      "Thích làm gì: Мне нравится + động từ nguyên thể"
    ],
    "sample_essay": "Здравствуйте всем! Меня зовут Нам. Я из Вьетнама, сейчас я живу и учусь в Москве. Я студент первого курса университета. Мне очень нравится изучать русский язык, потому что это прекрасный язык.",
    "model_answer": "Здравствуйте всем! Меня зовут Нам. Я из Вьетнама, сейчас я живу и учусь в Москве. Я студент первого курса университета. Мне очень нравится изучать русский язык, потому что это прекрасный язык.",
    "is_pro_only": false,
    "raw_data": {}
  },
  {
    "id": "pic_a2_02",
    "code": "pic_a2_02",
    "title": "Bài 2: Cùng nhau nấu ăn ở bếp chung",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "dorm",
    "category_name": "Ký túc xá & Đời sống sinh viên",
    "prompt": "Опишите общую кухню в студенческом общежитии. Кто готовит еду? Какие продукты они используют? Как проходит их общение?",
    "prompt_text": "Опишите общую кухню в студенческом общежитии.",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/dorm-kitchen.jpg",
    "min_words": 35,
    "suggested_words": [
      {
        "id": "7a5cdf10-05d8-4e02-8a17-805624f1d8b6",
        "ru": "Столо́вая",
        "word": "Столо́вая",
        "word_normalized": "столовая",
        "vi": "Căng tin",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c1/Ru-%D1%81%D1%82%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F.ogg/Ru-%D1%81%D1%82%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F.ogg.mp3"
      },
      {
        "id": "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a",
        "ru": "Чай",
        "word": "Чай",
        "word_normalized": "чай",
        "vi": "Trà",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D1%87%D0%B0%D0%B9.ogg/Ru-%D1%87%D0%B0%D0%B9.ogg.mp3"
      },
      {
        "id": "ddeca66d-a02e-4bd4-ab14-6aa07274788b",
        "ru": "у́жинать",
        "word": "у́жинать",
        "word_normalized": "ужинать",
        "vi": "ăn tối",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/97/Ru-%D1%83%D0%B6%D0%B8%D0%BD%D0%B0%D1%82%D1%8C.ogg/Ru-%D1%83%D0%B6%D0%B8%D0%BD%D0%B0%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "e6751002-8d56-494f-8311-83c7c5caabc2",
        "ru": "Одногру́ппник",
        "word": "Одногру́ппник",
        "word_normalized": "одногруппник",
        "vi": "Bạn cùng lớp",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/vocab-audio/ru_ai_d0bed0b4d0bdd0bed0b3d180d183d0bfd0bfd0bdd0b8d0ba.mp3"
      }
    ],
    "tips": [
      "Nêu không gian bếp chung: bếp nấu, nồi chảo, mùi vị",
      "Hoạt động: cắt gọt rau củ, nấu súp (режет овощи, варит суп)",
      "Ý nghĩa: tình bạn giữa các sinh viên quốc tế"
    ],
    "sample_essay": "На общей кухне общежития собралась группа иностранных студентов из разных стран. Они вместе и весело готовят ужин после трудных занятий. Девушка режет свежие овощи для салата, а юноша варит суп на плите. В кухне пахнет вкусной едой. Ребята оживлённо общаются, делятся новостями và cười. Совместное приготовление еды помогает им быстрее подружиться.",
    "model_answer": "На общей кухне общежития собралась группа иностранных студентов из разных стран. Они вместе и весело готовят ужин после трудных занятий. Девушка режет свежие овощи для салата, а юноша варит суп на плите. В кухне пахнет вкусной едой. Ребята оживлённо общаются, делятся новостями và cười. Совместное приготовление еды помогает им быстрее подружиться.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "trans_a2_02",
    "code": "trans_a2_02",
    "title": "Bài 2: Hỏi đường đến ga tàu điện ngầm",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "shopping",
    "category_name": "Sinh hoạt thường nhật & Mua sắm",
    "prompt": "Hãy dịch đoạn hội thoại sau sang tiếng Nga:\n\"- Xin lỗi, bạn có thể chỉ cho tôi biết ga tàu điện ngầm gần nhất ở đâu không?\n- Bạn hãy đi thẳng theo con phố này khoảng năm phút, sau đó rẽ phải ở ngã tư. Nhà ga sẽ nằm ngay bên tay trái.\n- Cảm ơn bạn rất nhiều!\"",
    "prompt_text": "Hãy dịch đoạn hội thoại sau sang tiếng Nga...",
    "image_url": "",
    "min_words": 30,
    "suggested_words": [
      {
        "id": "3b630b3c-52bd-445d-9815-3c584b8dd48c",
        "ru": "большо́й",
        "word": "большо́й",
        "word_normalized": "большой",
        "vi": "to",
        "pos": "прил.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/47/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg.mp3"
      },
      {
        "id": "7d759e58-1708-4042-9cc3-34b796e460f6",
        "ru": "Метро́",
        "word": "Метро́",
        "word_normalized": "метро",
        "vi": "Tàu điện ngầm",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ae/Ru-%D0%BC%D0%B5%D1%82%D1%80%D0%BE.ogg/Ru-%D0%BC%D0%B5%D1%82%D1%80%D0%BE.ogg.mp3"
      }
    ],
    "tips": [
      "Lời hỏi lịch sự: Извините, вы не можете сказать... hoặc Скажите, пожалуйста...",
      "Đi thẳng / rẽ phải: mệnh lệnh thức Идите прямо, Поверните направо",
      "Theo con phố: по этой улице (Cách 3)",
      "Ở ngã tư: на перекрёстке (Cách 6)"
    ],
    "sample_essay": "- Извините, вы не можете сказать, где находится ближайшая станция метро?\n- Идите прямо по этой улице примерно пять минут, потом поверните направо на перекрёстке. Станция будет прямо слева от вас.\n- Большое спасибо!",
    "model_answer": "- Извините, вы не можете сказать, где находится ближайшая станция метро?\n- Идите прямо по этой улице примерно пять минут, потом поверните направо на перекрёстке. Станция будет прямо слева от вас.\n- Большое спасибо!",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "trans_a1_02",
    "code": "trans_a1_02",
    "title": "Bài 2: Kể về sở thích và ngày cuối tuần",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "intro",
    "category_name": "Giao tiếp cơ bản & Giới thiệu bản thân",
    "prompt": "Hãy dịch đoạn văn sau sang tiếng Nga:\n\"Vào thời gian rảnh rỗi, tôi thích đọc sách và nghe nhạc. Vào cuối tuần, tôi thường đi dạo trong công viên cùng bạn bè. Đôi khi chúng tôi cùng nhau đi uống trà và trò chuyện vui vẻ.\"",
    "prompt_text": "Hãy dịch đoạn văn sau sang tiếng Nga...",
    "image_url": "",
    "min_words": 25,
    "suggested_words": [
      {
        "id": "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a",
        "ru": "Чай",
        "word": "Чай",
        "word_normalized": "чай",
        "vi": "Trà",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D1%87%D0%B0%D0%B9.ogg/Ru-%D1%87%D0%B0%D0%B9.ogg.mp3"
      },
      {
        "id": "9bc8340b-7566-4ae9-8281-0bb36e5e7ef3",
        "ru": "Парк",
        "word": "Парк",
        "word_normalized": "парк",
        "vi": "Công viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9b/Ru-%D0%BF%D0%B0%D1%80%D0%BA.ogg/Ru-%D0%BF%D0%B0%D1%80%D0%BA.ogg.mp3"
      },
      {
        "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
        "ru": "Кни́га",
        "word": "Кни́га",
        "word_normalized": "книга",
        "vi": "Sách",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3"
      },
      {
        "id": "eb7377dc-f8e4-4f9f-9e06-19cb44820d5c",
        "ru": "чита́ть",
        "word": "чита́ть",
        "word_normalized": "читать",
        "vi": "đọc (sách, báo)",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg.mp3"
      }
    ],
    "tips": [
      "Vào thời gian rảnh: В свободное время",
      "Vào cuối tuần: В выходные дни",
      "Cùng bạn bè: giới từ с + Cách 5 (с друзьями)",
      "Cùng nhau: вместе"
    ],
    "sample_essay": "В свободное время я люблю читать книги и слушать музыку. В выходные дни я часто гуляю в парке с друзьями. Иногда мы вместе ходим пить чай и весело разговариваем.",
    "model_answer": "В свободное время я люблю читать книги и слушать музыку. В выходные дни я часто гуляю в парке с друзьями. Иногда мы вместе ходим пить чай и весело разговариваем.",
    "is_pro_only": false,
    "raw_data": {}
  },
  {
    "id": "pic_b1_02",
    "code": "pic_b1_02",
    "title": "Bài 2: Bờ sông Neva ở Sankt-Peterburg",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "travel",
    "category_name": "Du lịch & Khám phá thành phố Nga",
    "prompt": "Опишите набережную реки Невы в Санкт-Петербурге: архитектурные ансамбли, мосты, движение катеров и атмосферу северной столицы.",
    "prompt_text": "Опишите набережную реки Невы...",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/saint-petersburg.jpg",
    "min_words": 50,
    "suggested_words": [
      {
        "id": "11ced31b-eb93-4fe2-acde-d20bfdc68883",
        "ru": "жить",
        "word": "жить",
        "word_normalized": "жить",
        "vi": "sống, cư ngụ",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg/Ru-%D0%B6%D0%B8%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "3b630b3c-52bd-445d-9815-3c584b8dd48c",
        "ru": "большо́й",
        "word": "большо́й",
        "word_normalized": "большой",
        "vi": "to",
        "pos": "прил.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/47/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg/Ru-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9.ogg.mp3"
      }
    ],
    "tips": [
      "Nêu bối cảnh sông Neva và bờ kè đá hoa cương (набережная реки Невы, гранитные берега)",
      "Miêu tả cung điện, cầu mở (дворцы, разводные мосты)",
      "Hoạt động: ca-nô du lịch lướt trên mặt nước (курсируют катера)",
      "Cảm nhận về nét lãng mạn của thành phố Peterburg"
    ],
    "sample_essay": "На снимке запечатлена набережная величественной реки Невы в Санкт-Петербурге в период белых ночей. Вдоль гранитных берегов выстроились великолепные дворцы и исторические здания в стиле классицизма. По глади воды плавно курсируют экскурсионные катера с восторженными пассажирами. Знаменитые разводные мосты придают городу неповторимый романтический облик. Прогулка по этим местам дарит ощущение прикосновения к великой русской культуре.",
    "model_answer": "На снимке запечатлена набережная величественной реки Невы в Санкт-Петербурге в период белых ночей. Вдоль гранитных берегов выстроились великолепные дворцы и исторические здания в стиле классицизма. По глади воды плавно курсируют экскурсионные катера с восторженными пассажирами. Знаменитые разводные мосты придают городу неповторимый романтический облик. Прогулка по этим местам дарит ощущение прикосновения к великой русской культуре.",
    "is_pro_only": true,
    "raw_data": {}
  },
  {
    "id": "pic_a1_02",
    "code": "pic_a1_02",
    "title": "Bài 2: Học tập trong thư viện trường",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "daily",
    "category_name": "Sinh hoạt thường nhật & Gia đình",
    "prompt": "Опишите студентов в библиотеке. Где сидят ребята? Что лежит на их столах? Чем они занимаются?",
    "prompt_text": "Опишите студентов в библиотеке.",
    "image_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/library-students.jpg",
    "min_words": 25,
    "suggested_words": [
      {
        "id": "0503b401-d820-454e-be18-75b7eb2198bb",
        "ru": "Университе́т",
        "word": "Университе́т",
        "word_normalized": "университет",
        "vi": "Trường đại học",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6f/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg/Ru-%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82.ogg.mp3"
      },
      {
        "id": "4671448f-b17c-488e-835c-2e10914ad9ef",
        "ru": "писа́ть",
        "word": "писа́ть",
        "word_normalized": "писать",
        "vi": "viết",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/64/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg/Ru-%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C.ogg.mp3"
      },
      {
        "id": "49030d34-4174-4548-b6d1-a6871290afd0",
        "ru": "Студе́нт",
        "word": "Студе́нт",
        "word_normalized": "студент",
        "vi": "Sinh viên",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3"
      },
      {
        "id": "83fd2fd1-8dd6-482d-95ba-1a7ceb249c12",
        "ru": "Рюкза́к",
        "word": "Рюкза́к",
        "word_normalized": "рюкзак",
        "vi": "cặp sách",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/69/Ru-%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA.ogg/Ru-%D1%80%D1%8E%D0%BA%D0%B7%D0%B0%D0%BA.ogg.mp3"
      },
      {
        "id": "b865e467-6e8a-4645-968c-4773c83ebf2e",
        "ru": "Библиоте́ка",
        "word": "Библиоте́ка",
        "word_normalized": "библиотека",
        "vi": "Thư viện",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/30/Ru-%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B0.ogg/Ru-%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B0.ogg.mp3"
      },
      {
        "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
        "ru": "Кни́га",
        "word": "Кни́га",
        "word_normalized": "книга",
        "vi": "Sách",
        "pos": "сущ.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3"
      },
      {
        "id": "eb7377dc-f8e4-4f9f-9e06-19cb44820d5c",
        "ru": "чита́ть",
        "word": "чита́ть",
        "word_normalized": "читать",
        "vi": "đọc (sách, báo)",
        "pos": "гл.",
        "level": "A1",
        "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg/Ru-%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C.ogg.mp3"
      }
    ],
    "tips": [
      "Nêu không gian: thư viện trường đại học (университетская библиотека)",
      "Hành động của sinh viên: đọc sách giáo khoa, ghi chú (читают учебники, делают заметки)",
      "Đồ vật: sách vở, laptop, sổ ghi chép (книги, ноутбуки, тетради)",
      "Không khí: yên tĩnh, tập trung ôn thi (тишина, готовятся к экзаменам)"
    ],
    "sample_essay": "На снимке изображена просторная университетская библиотека. За длинными деревянными столами сидят молодые студенты. Они внимательно читают учебники и делают важные заметки в тетрадях. На столах лежат толстые книги, открытые ноутбуки и ручки. В читальном зале царит тишина и сосредоточенность, потому что скоро начнутся зимние экзамены.",
    "model_answer": "На снимке изображена просторная университетская библиотека. За длинными деревянными столами сидят молодые студенты. Они внимательно читают учебники и делают важные заметки в тетрадях. На столах лежат толстые книги, открытые ноутбуки и ручки. В читальном зале царит тишина и сосредоточенность, потому что скоро начнутся зимние экзамены.",
    "is_pro_only": false,
    "raw_data": {}
  }
];
  const LISTENING_LESSONS = [
  {
    "id": "lis-dorm",
    "lesson_uuid": "33333333-3333-3333-3333-000000000003",
    "code": "lis-dorm",
    "topic_id": "22222222-2222-2222-2222-000000000003",
    "title": "Nhận phòng và hỏi nhà bếp",
    "vi": "Студент: Xin chào! Em là sinh viên mới. Đây là giấy báo nhập học của em.\nКомендант: Chào mừng em! Phòng của em là số 305 ở tầng ba.\nСтудент: Cảm ơn bác! Cho em hỏi nhà bếp ở đâu ạ?\nКомендант: Nhà bếp ở cuối hành lang, còn phòng tắm ở tầng một.\nСтудент: Ký túc xá mở cửa đến mấy giờ ạ?\nКомендант: Ký túc xá mở cửa đến 11 giờ đêm. Đừng về muộn nhé!",
    "translation_vi": "Студент: Xin chào! Em là sinh viên mới. Đây là giấy báo nhập học của em.\nКомендант: Chào mừng em! Phòng của em là số 305 ở tầng ba.\nСтудент: Cảm ơn bác! Cho em hỏi nhà bếp ở đâu ạ?\nКомендант: Nhà bếp ở cuối hành lang, còn phòng tắm ở tầng một.\nСтудент: Ký túc xá mở cửa đến mấy giờ ạ?\nКомендант: Ký túc xá mở cửa đến 11 giờ đêm. Đừng về muộn nhé!",
    "transcript_ru": "Студент: Здравствуйте! Я новый студент. Вот моё направление.\nКомендант: Добро пожаловать! Ваша комната номер триста пять на третьем этаже.\nСтудент: Спасибо! Скажите, а где находится кухня?\nКомендант: Кухня в конце коридора, а душ на первом этаже.\nСтудент: А до какого часа открыто общежитие?\nКомендант: Общежитие открыто до одиннадцати вечера. Не опаздывайте!",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "dorm",
    "category_name": "Trong ký túc xá (В общежитии)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-a2-dorm.mp3",
    "duration_seconds": 29,
    "est_minutes": 12,
    "is_pro_only": true,
    "lines": [
      {
        "id": 1,
        "ru": "Здравствуйте! Я новый студент. Вот моё направление.",
        "vi": "Xin chào! Em là sinh viên mới. Đây là giấy báo nhập học của em.",
        "end_sec": 4.8,
        "speaker": "Студент",
        "text_ru": "Здравствуйте! Я новый студент. Вот моё направление.",
        "start_sec": 0,
        "vocab_ids": [
          "49030d34-4174-4548-b6d1-a6871290afd0"
        ],
        "translation_vi": "Xin chào! Em là sinh viên mới. Đây là giấy báo nhập học của em."
      },
      {
        "id": 2,
        "ru": "Добро пожаловать! Ваша комната номер триста пять на третьем этаже.",
        "vi": "Chào mừng em! Phòng của em là số 305 ở tầng ba.",
        "end_sec": 10.79,
        "speaker": "Комендант",
        "text_ru": "Добро пожаловать! Ваша комната номер триста пять на третьем этаже.",
        "start_sec": 5.15,
        "vocab_ids": [
          "c40e8975-331e-4113-b4c7-54358d87c259",
          "11111111-1111-1111-1111-000000000009",
          "11111111-1111-1111-1111-000000000012"
        ],
        "translation_vi": "Chào mừng em! Phòng của em là số 305 ở tầng ba."
      },
      {
        "id": 3,
        "ru": "Спасибо! Скажите, а где находится кухня?",
        "vi": "Cảm ơn bác! Cho em hỏi nhà bếp ở đâu ạ?",
        "end_sec": 15.36,
        "speaker": "Студент",
        "text_ru": "Спасибо! Скажите, а где находится кухня?",
        "start_sec": 11.14,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000013"
        ],
        "translation_vi": "Cảm ơn bác! Cho em hỏi nhà bếp ở đâu ạ?"
      },
      {
        "id": 4,
        "ru": "Кухня в конце коридора, а душ на первом этаже.",
        "vi": "Nhà bếp ở cuối hành lang, còn phòng tắm ở tầng một.",
        "end_sec": 19.82,
        "speaker": "Комендант",
        "text_ru": "Кухня в конце коридора, а душ на первом этаже.",
        "start_sec": 15.71,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000013",
          "11111111-1111-1111-1111-000000000012"
        ],
        "translation_vi": "Nhà bếp ở cuối hành lang, còn phòng tắm ở tầng một."
      },
      {
        "id": 5,
        "ru": "А до какого часа открыто общежитие?",
        "vi": "Ký túc xá mở cửa đến mấy giờ ạ?",
        "end_sec": 23.41,
        "speaker": "Студент",
        "text_ru": "А до какого часа открыто общежитие?",
        "start_sec": 20.17,
        "vocab_ids": [],
        "translation_vi": "Ký túc xá mở cửa đến mấy giờ ạ?"
      },
      {
        "id": 6,
        "ru": "Общежитие открыто до одиннадцати вечера. Не опаздывайте!",
        "vi": "Ký túc xá mở cửa đến 11 giờ đêm. Đừng về muộn nhé!",
        "end_sec": 28.73,
        "speaker": "Комендант",
        "text_ru": "Общежитие открыто до одиннадцати вечера. Не опаздывайте!",
        "start_sec": 23.76,
        "vocab_ids": [],
        "translation_vi": "Ký túc xá mở cửa đến 11 giờ đêm. Đừng về muộn nhé!"
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Phòng của bạn sinh viên là số bao nhiêu và ở tầng mấy?",
        "id": "q1",
        "options": [
          "Phòng 205 tầng 2",
          "Phòng 305 tầng 3",
          "Phòng 301 tầng 3",
          "Phòng 105 tầng 1"
        ],
        "explanation": "Quản lý nói: Ваша комната номер триста пять на третьем этаже."
      },
      {
        "a": 2,
        "q": "Nhà bếp nằm ở đâu trong ký túc xá?",
        "id": "q2",
        "options": [
          "Ở tầng 1",
          "Ở tầng 2",
          "Ở cuối hành lang",
          "Ở đầu cầu thang"
        ],
        "explanation": "Quản lý chỉ: Кухня в конце коридора."
      },
      {
        "a": 1,
        "q": "Ký túc xá mở cửa đến mấy giờ đêm?",
        "id": "q3",
        "options": [
          "10 giờ đêm",
          "11 giờ đêm",
          "12 giờ đêm",
          "Mở cửa suốt đêm"
        ],
        "explanation": "Quản lý dặn: Общежитие открыто до одиннадцати вечера."
      }
    ],
    "dictation": [
      "Здравствуйте! Я новый студент. Вот моё направление.",
      "Добро пожаловать! Ваша комната номер триста пять на третьем этаже.",
      "Спасибо! Скажите, а где находится кухня?",
      "Кухня в конце коридора, а душ на первом этаже."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "49030d34-4174-4548-b6d1-a6871290afd0",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Студе́нт у́чится в университе́те.",
              "vi": "Sinh viên đang học ở trường đại học."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sinh viên",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.137815+00:00",
          "word_normalized": "студент",
          "word_with_stress": "Студе́нт"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "c40e8975-331e-4113-b4c7-54358d87c259",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Ко́шка спит в ко́мнате.",
              "vi": "Con mèo ngủ trong phòng."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg/Ru-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0.ogg.mp3",
          "created_at": "2026-11-10T05:56:17.667132+00:00",
          "meaning_vi": "Phòng",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.128979+00:00",
          "word_normalized": "комната",
          "word_with_stress": "Ко́мната"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000009",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Наш но́мер в оте́ле на второ́м этаже́.",
              "vi": "Phòng khách sạn của chúng tôi ở tầng 2."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0a/Ru-%D0%BD%D0%BE%D0%BC%D0%B5%D1%80.ogg/Ru-%D0%BD%D0%BE%D0%BC%D0%B5%D1%80.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Con số, số phòng",
          "structures": [
            "но́мер телефо́на, но́мер в гости́нице"
          ],
          "updated_at": "2026-11-15T12:01:14.082394+00:00",
          "word_normalized": "номер",
          "word_with_stress": "Но́мер"
        },
        "line_index": 1,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000012",
          "pos": "сущ.",
          "level": "A2",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Наша университетская аудитория находится на третьем этаже.",
              "vi": "Phòng học đại học của chúng tôi nằm ở tầng ba."
            },
            {
              "ru": "Мы живём в новом доме на девятом этаже.",
              "vi": "Chúng tôi sống trong một tòa nhà mới ở tầng chín."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1b/Ru-%D1%8D%D1%82%D0%B0%D0%B6.ogg/Ru-%D1%8D%D1%82%D0%B0%D0%B6.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Tầng lầu",
          "structures": [
            "на первом / втором / третьем этаже (ở tầng 1 / tầng 2 / tầng 3)",
            "подняться на этаж (đi lên tầng)"
          ],
          "updated_at": "2026-11-15T12:01:14.182485+00:00",
          "word_normalized": "этаж",
          "word_with_stress": "эта́ж"
        },
        "line_index": 1,
        "sort_order": 3
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000013",
          "pos": "сущ.",
          "level": "A2",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Мама готовит вкусный ужин на кухне.",
              "vi": "Mẹ đang nấu bữa tối ngon lành trong bếp."
            },
            {
              "ru": "Мне очень нравится традиционная русская кухня.",
              "vi": "Tôi rất thích ẩm thực truyền thống Nga."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D0%BA%D1%83%D1%85%D0%BD%D1%8F.ogg/Ru-%D0%BA%D1%83%D1%85%D0%BD%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Nhà bếp",
          "structures": [
            "на кухне (ở trong nhà bếp)",
            "русская / вьетнамская кухня (ẩm thực Nga / Việt Nam)"
          ],
          "updated_at": "2026-11-15T12:01:14.181774+00:00",
          "word_normalized": "кухня",
          "word_with_stress": "ку́хня"
        },
        "line_index": 2,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000013",
          "pos": "сущ.",
          "level": "A2",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Мама готовит вкусный ужин на кухне.",
              "vi": "Mẹ đang nấu bữa tối ngon lành trong bếp."
            },
            {
              "ru": "Мне очень нравится традиционная русская кухня.",
              "vi": "Tôi rất thích ẩm thực truyền thống Nga."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D0%BA%D1%83%D1%85%D0%BD%D1%8F.ogg/Ru-%D0%BA%D1%83%D1%85%D0%BD%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Nhà bếp",
          "structures": [
            "на кухне (ở trong nhà bếp)",
            "русская / вьетнамская кухня (ẩm thực Nga / Việt Nam)"
          ],
          "updated_at": "2026-11-15T12:01:14.181774+00:00",
          "word_normalized": "кухня",
          "word_with_stress": "ку́хня"
        },
        "line_index": 3,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000012",
          "pos": "сущ.",
          "level": "A2",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Наша университетская аудитория находится на третьем этаже.",
              "vi": "Phòng học đại học của chúng tôi nằm ở tầng ba."
            },
            {
              "ru": "Мы живём в новом доме на девятом этаже.",
              "vi": "Chúng tôi sống trong một tòa nhà mới ở tầng chín."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1b/Ru-%D1%8D%D1%82%D0%B0%D0%B6.ogg/Ru-%D1%8D%D1%82%D0%B0%D0%B6.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Tầng lầu",
          "structures": [
            "на первом / втором / третьем этаже (ở tầng 1 / tầng 2 / tầng 3)",
            "подняться на этаж (đi lên tầng)"
          ],
          "updated_at": "2026-11-15T12:01:14.182485+00:00",
          "word_normalized": "этаж",
          "word_with_stress": "эта́ж"
        },
        "line_index": 3,
        "sort_order": 2
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Здравствуйте! Я новый студент. Вот моё направление.",
          "vi": "Xin chào! Em là sinh viên mới. Đây là giấy báo nhập học của em.",
          "who": "Студент"
        },
        {
          "ru": "Добро пожаловать! Ваша комната номер триста пять на третьем этаже.",
          "vi": "Chào mừng em! Phòng của em là số 305 ở tầng ba.",
          "who": "Комендант"
        },
        {
          "ru": "Спасибо! Скажите, а где находится кухня?",
          "vi": "Cảm ơn bác! Cho em hỏi nhà bếp ở đâu ạ?",
          "who": "Студент"
        },
        {
          "ru": "Кухня в конце коридора, а душ на первом этаже.",
          "vi": "Nhà bếp ở cuối hành lang, còn phòng tắm ở tầng một.",
          "who": "Комендант"
        },
        {
          "ru": "А до какого часа открыто общежитие?",
          "vi": "Ký túc xá mở cửa đến mấy giờ ạ?",
          "who": "Студент"
        },
        {
          "ru": "Общежитие открыто до одиннадцати вечера. Не опаздывайте!",
          "vi": "Ký túc xá mở cửa đến 11 giờ đêm. Đừng về muộn nhé!",
          "who": "Комендант"
        }
      ],
      "blanks": [],
      "dictation": [
        "Здравствуйте! Я новый студент. Вот моё направление.",
        "Добро пожаловать! Ваша комната номер триста пять на третьем этаже.",
        "Спасибо! Скажите, а где находится кухня?",
        "Кухня в конце коридора, а душ на первом этаже."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Phòng của bạn sinh viên là số bao nhiêu và ở tầng mấy?",
          "id": "q1",
          "options": [
            "Phòng 205 tầng 2",
            "Phòng 305 tầng 3",
            "Phòng 301 tầng 3",
            "Phòng 105 tầng 1"
          ],
          "explanation": "Quản lý nói: Ваша комната номер триста пять на третьем этаже."
        },
        {
          "a": 2,
          "q": "Nhà bếp nằm ở đâu trong ký túc xá?",
          "id": "q2",
          "options": [
            "Ở tầng 1",
            "Ở tầng 2",
            "Ở cuối hành lang",
            "Ở đầu cầu thang"
          ],
          "explanation": "Quản lý chỉ: Кухня в конце коридора."
        },
        {
          "a": 1,
          "q": "Ký túc xá mở cửa đến mấy giờ đêm?",
          "id": "q3",
          "options": [
            "10 giờ đêm",
            "11 giờ đêm",
            "12 giờ đêm",
            "Mở cửa suốt đêm"
          ],
          "explanation": "Quản lý dặn: Общежитие открыто до одиннадцати вечера."
        }
      ]
    }
  },
  {
    "id": "lis-cafe",
    "lesson_uuid": "33333333-3333-3333-3333-000000000004",
    "code": "lis-cafe",
    "topic_id": "22222222-2222-2222-2222-000000000004",
    "title": "Gọi món bánh xèo và súp",
    "vi": "Кассир: Xin chào! Quý khách muốn dùng món gì ạ?\nКлиент: Cho tôi một bánh xèo kẹp phô mai và súp củ dền.\nКассир: Lựa chọn tuyệt vời! Quý khách muốn uống gì ạ?\nКлиент: Cho tôi một tách trà đen kèm chanh.\nКассир: Quý khách có dùng đường không?\nКлиент: Không, cảm ơn, tôi không dùng đường. Tổng cộng hết bao nhiêu ạ?",
    "translation_vi": "Кассир: Xin chào! Quý khách muốn dùng món gì ạ?\nКлиент: Cho tôi một bánh xèo kẹp phô mai và súp củ dền.\nКассир: Lựa chọn tuyệt vời! Quý khách muốn uống gì ạ?\nКлиент: Cho tôi một tách trà đen kèm chanh.\nКассир: Quý khách có dùng đường không?\nКлиент: Không, cảm ơn, tôi không dùng đường. Tổng cộng hết bao nhiêu ạ?",
    "transcript_ru": "Кассир: Добрый день! Что будете заказывать?\nКлиент: Мне, пожалуйста, блин с сыром и суп борщ.\nКассир: Отличный выбор! Что будете пить?\nКлиент: Чашку чёрного чая с лимоном, пожалуйста.\nКассир: Сахар нужен?\nКлиент: Нет, спасибо, без сахара. Сколько с меня?",
    "level": "A2",
    "level_name": "Sơ cấp A2",
    "category": "cafe",
    "category_name": "Trong quán ăn Nga (В кафе “Теремок”)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-a2-cafe.mp3",
    "duration_seconds": 23,
    "est_minutes": 12,
    "is_pro_only": true,
    "lines": [
      {
        "id": 1,
        "ru": "Добрый день! Что будете заказывать?",
        "vi": "Xin chào! Quý khách muốn dùng món gì ạ?",
        "end_sec": 3.36,
        "speaker": "Кассир",
        "text_ru": "Добрый день! Что будете заказывать?",
        "start_sec": 0,
        "vocab_ids": [],
        "translation_vi": "Xin chào! Quý khách muốn dùng món gì ạ?"
      },
      {
        "id": 2,
        "ru": "Мне, пожалуйста, блин с сыром и суп борщ.",
        "vi": "Cho tôi một bánh xèo kẹp phô mai và súp củ dền.",
        "end_sec": 8.01,
        "speaker": "Клиент",
        "text_ru": "Мне, пожалуйста, блин с сыром и суп борщ.",
        "start_sec": 3.71,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000014",
          "36225aaf-62bf-4dc8-80a7-f2acce8fd03a"
        ],
        "translation_vi": "Cho tôi một bánh xèo kẹp phô mai và súp củ dền."
      },
      {
        "id": 3,
        "ru": "Отличный выбор! Что будете пить?",
        "vi": "Lựa chọn tuyệt vời! Quý khách muốn uống gì ạ?",
        "end_sec": 11.43,
        "speaker": "Кассир",
        "text_ru": "Отличный выбор! Что будете пить?",
        "start_sec": 8.36,
        "vocab_ids": [],
        "translation_vi": "Lựa chọn tuyệt vời! Quý khách muốn uống gì ạ?"
      },
      {
        "id": 4,
        "ru": "Чашку чёрного чая с лимоном, пожалуйста.",
        "vi": "Cho tôi một tách trà đen kèm chanh.",
        "end_sec": 15.76,
        "speaker": "Клиент",
        "text_ru": "Чашку чёрного чая с лимоном, пожалуйста.",
        "start_sec": 11.78,
        "vocab_ids": [
          "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a"
        ],
        "translation_vi": "Cho tôi một tách trà đen kèm chanh."
      },
      {
        "id": 5,
        "ru": "Сахар нужен?",
        "vi": "Quý khách có dùng đường không?",
        "end_sec": 17.58,
        "speaker": "Кассир",
        "text_ru": "Сахар нужен?",
        "start_sec": 16.11,
        "vocab_ids": [],
        "translation_vi": "Quý khách có dùng đường không?"
      },
      {
        "id": 6,
        "ru": "Нет, спасибо, без сахара. Сколько с меня?",
        "vi": "Không, cảm ơn, tôi không dùng đường. Tổng cộng hết bao nhiêu ạ?",
        "end_sec": 22.2,
        "speaker": "Клиент",
        "text_ru": "Нет, спасибо, без сахара. Сколько с меня?",
        "start_sec": 17.93,
        "vocab_ids": [],
        "translation_vi": "Không, cảm ơn, tôi không dùng đường. Tổng cộng hết bao nhiêu ạ?"
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Khách hàng đã gọi món ăn nào?",
        "id": "q1",
        "options": [
          "Bánh xèo nhân thịt",
          "Bánh xèo phô mai và súp củ dền",
          "Cơm chiên và salad",
          "Bánh mì kẹp xúc xích"
        ],
        "explanation": "Khách hàng nói: блин с сыром и суп борщ."
      },
      {
        "a": 2,
        "q": "Đồ uống khách hàng chọn là gì?",
        "id": "q2",
        "options": [
          "Cà phê đen",
          "Nước ép táo",
          "Trà đen với chanh",
          "Trà sữa đá"
        ],
        "explanation": "Khách hàng gọi: Чашку чёрного чая с лимоном."
      },
      {
        "a": 1,
        "q": "Khách hàng có cho đường vào trà không?",
        "id": "q3",
        "options": [
          "Có thêm 2 thìa",
          "Không dùng đường",
          "Chỉ dùng mật ong",
          "Tùy quán cho"
        ],
        "explanation": "Khách hàng đáp: Нет, спасибо, без сахара."
      }
    ],
    "dictation": [
      "Добрый день! Что будете заказывать?",
      "Мне, пожалуйста, блин с сыром и суп борщ.",
      "Отличный выбор! Что будете пить?",
      "Чашку чёрного чая с лимоном, пожалуйста."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000014",
          "pos": "сущ.",
          "level": "A2",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": null,
          "examples": [
            {
              "ru": "На завтрак я люблю есть бутерброд с сыром и маслом.",
              "vi": "Bữa sáng tôi thích ăn bánh mì kẹp phô mai và bơ."
            },
            {
              "ru": "В магазине продаётся много сортов вкусного сыра.",
              "vi": "Trong cửa hàng có bán rất nhiều loại phô mai ngon."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0c/Ru-%D1%81%D1%8B%D1%80.ogg/Ru-%D1%81%D1%8B%D1%80.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Phô mai",
          "structures": [
            "кусок сыра (một miếng phô mai)",
            "бутерброд с сыром (bánh mì kẹp phô mai)"
          ],
          "updated_at": "2026-11-15T12:01:14.18197+00:00",
          "word_normalized": "сыр",
          "word_with_stress": "сыр"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "36225aaf-62bf-4dc8-80a7-f2acce8fd03a",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.",
              "vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1b/Ru-%D1%81%D1%83%D0%BF.ogg/Ru-%D1%81%D1%83%D0%BF.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Súp",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.133383+00:00",
          "word_normalized": "суп",
          "word_with_stress": "Суп"
        },
        "line_index": 1,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "8a7f4757-6d37-435f-8cdc-bc69a5d92b6a",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я налива́ю чай в стака́н и пью.",
              "vi": "Tôi rót trà vào cốc và uống."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/Ru-%D1%87%D0%B0%D0%B9.ogg/Ru-%D1%87%D0%B0%D0%B9.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Trà",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.133796+00:00",
          "word_normalized": "чай",
          "word_with_stress": "Чай"
        },
        "line_index": 3,
        "sort_order": 1
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Добрый день! Что будете заказывать?",
          "vi": "Xin chào! Quý khách muốn dùng món gì ạ?",
          "who": "Кассир"
        },
        {
          "ru": "Мне, пожалуйста, блин с сыром и суп борщ.",
          "vi": "Cho tôi một bánh xèo kẹp phô mai và súp củ dền.",
          "who": "Клиент"
        },
        {
          "ru": "Отличный выбор! Что будете пить?",
          "vi": "Lựa chọn tuyệt vời! Quý khách muốn uống gì ạ?",
          "who": "Кассир"
        },
        {
          "ru": "Чашку чёрного чая с лимоном, пожалуйста.",
          "vi": "Cho tôi một tách trà đen kèm chanh.",
          "who": "Клиент"
        },
        {
          "ru": "Сахар нужен?",
          "vi": "Quý khách có dùng đường không?",
          "who": "Кассир"
        },
        {
          "ru": "Нет, спасибо, без сахара. Сколько с меня?",
          "vi": "Không, cảm ơn, tôi không dùng đường. Tổng cộng hết bao nhiêu ạ?",
          "who": "Клиент"
        }
      ],
      "blanks": [],
      "dictation": [
        "Добрый день! Что будете заказывать?",
        "Мне, пожалуйста, блин с сыром и суп борщ.",
        "Отличный выбор! Что будете пить?",
        "Чашку чёрного чая с лимоном, пожалуйста."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Khách hàng đã gọi món ăn nào?",
          "id": "q1",
          "options": [
            "Bánh xèo nhân thịt",
            "Bánh xèo phô mai và súp củ dền",
            "Cơm chiên và salad",
            "Bánh mì kẹp xúc xích"
          ],
          "explanation": "Khách hàng nói: блин с сыром и суп борщ."
        },
        {
          "a": 2,
          "q": "Đồ uống khách hàng chọn là gì?",
          "id": "q2",
          "options": [
            "Cà phê đen",
            "Nước ép táo",
            "Trà đen với chanh",
            "Trà sữa đá"
          ],
          "explanation": "Khách hàng gọi: Чашку чёрного чая с лимоном."
        },
        {
          "a": 1,
          "q": "Khách hàng có cho đường vào trà không?",
          "id": "q3",
          "options": [
            "Có thêm 2 thìa",
            "Không dùng đường",
            "Chỉ dùng mật ong",
            "Tùy quán cho"
          ],
          "explanation": "Khách hàng đáp: Нет, спасибо, без сахара."
        }
      ]
    }
  },
  {
    "id": "lis-campus",
    "lesson_uuid": "33333333-3333-3333-3333-000000000005",
    "code": "lis-campus",
    "topic_id": "22222222-2222-2222-2222-000000000005",
    "title": "Mượn sách giáo trình đại học",
    "vi": "Студент: Xin chào! Em cần mượn giáo trình vật lý.\nБиблиотекарь: Làm ơn cho cô xem thẻ sinh viên của em.\nСтудент: Dạ thẻ của em đây ạ. Cuốn sách này còn trong kho không ạ?\nБиблиотекарь: Có, còn một cuốn cuối. Thời hạn trả là ba tuần.\nСтудент: Cảm ơn cô rất nhiều! Em sẽ trả sách đúng hạn.",
    "translation_vi": "Студент: Xin chào! Em cần mượn giáo trình vật lý.\nБиблиотекарь: Làm ơn cho cô xem thẻ sinh viên của em.\nСтудент: Dạ thẻ của em đây ạ. Cuốn sách này còn trong kho không ạ?\nБиблиотекарь: Có, còn một cuốn cuối. Thời hạn trả là ba tuần.\nСтудент: Cảm ơn cô rất nhiều! Em sẽ trả sách đúng hạn.",
    "transcript_ru": "Студент: Здравствуйте! Мне нужен учебник по физике.\nБиблиотекарь: Покажите ваш студенческий билет, пожалуйста.\nСтудент: Вот мой билет. Эта книга есть в наличии?\nБиблиотекарь: Да, остался один экземпляр. Срок возврата — три недели.\nСтудент: Большое спасибо! Я верну книгу вовремя.",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "campus",
    "category_name": "Thư viện & Giảng đường (В библиотеке)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-b1-campus.mp3",
    "duration_seconds": 23,
    "est_minutes": 12,
    "is_pro_only": true,
    "lines": [
      {
        "id": 1,
        "ru": "Здравствуйте! Мне нужен учебник по физике.",
        "vi": "Xin chào! Em cần mượn giáo trình vật lý.",
        "end_sec": 3.89,
        "speaker": "Студент",
        "text_ru": "Здравствуйте! Мне нужен учебник по физике.",
        "start_sec": 0,
        "vocab_ids": [
          "49030d34-4174-4548-b6d1-a6871290afd0",
          "11111111-1111-1111-1111-000000000015"
        ],
        "translation_vi": "Xin chào! Em cần mượn giáo trình vật lý."
      },
      {
        "id": 2,
        "ru": "Покажите ваш студенческий билет, пожалуйста.",
        "vi": "Làm ơn cho cô xem thẻ sinh viên của em.",
        "end_sec": 8.15,
        "speaker": "Библиотекарь",
        "text_ru": "Покажите ваш студенческий билет, пожалуйста.",
        "start_sec": 4.24,
        "vocab_ids": [
          "49030d34-4174-4548-b6d1-a6871290afd0",
          "11111111-1111-1111-1111-000000000002"
        ],
        "translation_vi": "Làm ơn cho cô xem thẻ sinh viên của em."
      },
      {
        "id": 3,
        "ru": "Вот мой билет. Эта книга есть в наличии?",
        "vi": "Dạ thẻ của em đây ạ. Cuốn sách này còn trong kho không ạ?",
        "end_sec": 12.34,
        "speaker": "Студент",
        "text_ru": "Вот мой билет. Эта книга есть в наличии?",
        "start_sec": 8.5,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000002",
          "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c"
        ],
        "translation_vi": "Dạ thẻ của em đây ạ. Cuốn sách này còn trong kho không ạ?"
      },
      {
        "id": 4,
        "ru": "Да, остался один экземпляр. Срок возврата — три недели.",
        "vi": "Có, còn một cuốn cuối. Thời hạn trả là ba tuần.",
        "end_sec": 18.33,
        "speaker": "Библиотекарь",
        "text_ru": "Да, остался один экземпляр. Срок возврата — три недели.",
        "start_sec": 12.69,
        "vocab_ids": [
          "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c"
        ],
        "translation_vi": "Có, còn một cuốn cuối. Thời hạn trả là ba tuần."
      },
      {
        "id": 5,
        "ru": "Большое спасибо! Я верну книгу вовремя.",
        "vi": "Cảm ơn cô rất nhiều! Em sẽ trả sách đúng hạn.",
        "end_sec": 22.42,
        "speaker": "Студент",
        "text_ru": "Большое спасибо! Я верну книгу вовремя.",
        "start_sec": 18.68,
        "vocab_ids": [
          "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c"
        ],
        "translation_vi": "Cảm ơn cô rất nhiều! Em sẽ trả sách đúng hạn."
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Sinh viên cần mượn giáo trình môn học nào?",
        "id": "q1",
        "options": [
          "Toán cao cấp",
          "Vật lý",
          "Hóa học đại cương",
          "Lịch sử nước Nga"
        ],
        "explanation": "Sinh viên nói: Мне нужен учебник по физике."
      },
      {
        "a": 1,
        "q": "Thủ thư yêu cầu sinh viên xuất trình giấy tờ gì?",
        "id": "q2",
        "options": [
          "Hộ chiếu",
          "Thẻ thư viện hoặc thẻ sinh viên",
          "Giấy giới thiệu của khoa",
          "Biên lai đóng học phí"
        ],
        "explanation": "Thủ thư yêu cầu: Покажите ваш студенческий билет."
      },
      {
        "a": 2,
        "q": "Thời hạn mượn sách là bao lâu?",
        "id": "q3",
        "options": [
          "1 tuần",
          "2 tuần",
          "3 tuần",
          "Cả học kỳ"
        ],
        "explanation": "Thủ thư thông báo: Срок возврата — три недели."
      }
    ],
    "dictation": [
      "Здравствуйте! Мне нужен учебник по физике.",
      "Покажите ваш студенческий билет, пожалуйста.",
      "Вот мой билет. Эта книга есть в наличии?",
      "Да, остался один экземпляр. Срок возврата — три недели."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "49030d34-4174-4548-b6d1-a6871290afd0",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Студе́нт у́чится в университе́те.",
              "vi": "Sinh viên đang học ở trường đại học."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sinh viên",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.137815+00:00",
          "word_normalized": "студент",
          "word_with_stress": "Студе́нт"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "49030d34-4174-4548-b6d1-a6871290afd0",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Студе́нт у́чится в университе́те.",
              "vi": "Sinh viên đang học ở trường đại học."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg/Ru-%D1%81%D1%82%D1%83%D0%B4%D0%B5%D0%BD%D1%82.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sinh viên",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.137815+00:00",
          "word_normalized": "студент",
          "word_with_stress": "Студе́нт"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000002",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я купи́л биле́т на по́езд в Москву́.",
              "vi": "Tôi đã mua vé tàu hỏa đi Moskva."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/49/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Vé",
          "structures": [
            "биле́т + куда? (В.п. - С4) (билет на самолёт, билет в Москву)"
          ],
          "updated_at": "2026-11-15T12:01:14.068296+00:00",
          "word_normalized": "билет",
          "word_with_stress": "Биле́т"
        },
        "line_index": 1,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000002",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я купи́л биле́т на по́езд в Москву́.",
              "vi": "Tôi đã mua vé tàu hỏa đi Moskva."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/49/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Vé",
          "structures": [
            "биле́т + куда? (В.п. - С4) (билет на самолёт, билет в Москву)"
          ],
          "updated_at": "2026-11-15T12:01:14.068296+00:00",
          "word_normalized": "билет",
          "word_with_stress": "Биле́т"
        },
        "line_index": 2,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
              "vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sách",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.050898+00:00",
          "word_normalized": "книга",
          "word_with_stress": "Кни́га"
        },
        "line_index": 2,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
              "vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sách",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.050898+00:00",
          "word_normalized": "книга",
          "word_with_stress": "Кни́га"
        },
        "line_index": 3,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
              "vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg/Ru-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0.ogg.mp3",
          "created_at": "2026-11-10T05:56:22.629553+00:00",
          "meaning_vi": "Sách",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.050898+00:00",
          "word_normalized": "книга",
          "word_with_stress": "Кни́га"
        },
        "line_index": 4,
        "sort_order": 1
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Здравствуйте! Мне нужен учебник по физике.",
          "vi": "Xin chào! Em cần mượn giáo trình vật lý.",
          "who": "Студент"
        },
        {
          "ru": "Покажите ваш студенческий билет, пожалуйста.",
          "vi": "Làm ơn cho cô xem thẻ sinh viên của em.",
          "who": "Библиотекарь"
        },
        {
          "ru": "Вот мой билет. Эта книга есть в наличии?",
          "vi": "Dạ thẻ của em đây ạ. Cuốn sách này còn trong kho không ạ?",
          "who": "Студент"
        },
        {
          "ru": "Да, остался один экземпляр. Срок возврата — три недели.",
          "vi": "Có, còn một cuốn cuối. Thời hạn trả là ba tuần.",
          "who": "Библиотекарь"
        },
        {
          "ru": "Большое спасибо! Я верну книгу вовремя.",
          "vi": "Cảm ơn cô rất nhiều! Em sẽ trả sách đúng hạn.",
          "who": "Студент"
        }
      ],
      "blanks": [],
      "dictation": [
        "Здравствуйте! Мне нужен учебник по физике.",
        "Покажите ваш студенческий билет, пожалуйста.",
        "Вот мой билет. Эта книга есть в наличии?",
        "Да, остался один экземпляр. Срок возврата — три недели."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Sinh viên cần mượn giáo trình môn học nào?",
          "id": "q1",
          "options": [
            "Toán cao cấp",
            "Vật lý",
            "Hóa học đại cương",
            "Lịch sử nước Nga"
          ],
          "explanation": "Sinh viên nói: Мне нужен учебник по физике."
        },
        {
          "a": 1,
          "q": "Thủ thư yêu cầu sinh viên xuất trình giấy tờ gì?",
          "id": "q2",
          "options": [
            "Hộ chiếu",
            "Thẻ thư viện hoặc thẻ sinh viên",
            "Giấy giới thiệu của khoa",
            "Biên lai đóng học phí"
          ],
          "explanation": "Thủ thư yêu cầu: Покажите ваш студенческий билет."
        },
        {
          "a": 2,
          "q": "Thời hạn mượn sách là bao lâu?",
          "id": "q3",
          "options": [
            "1 tuần",
            "2 tuần",
            "3 tuần",
            "Cả học kỳ"
          ],
          "explanation": "Thủ thư thông báo: Срок возврата — три недели."
        }
      ]
    }
  },
  {
    "id": "lis-interview",
    "lesson_uuid": "33333333-3333-3333-3333-000000000007",
    "code": "lis-interview",
    "topic_id": "22222222-2222-2222-2222-000000000007",
    "title": "Nghiên cứu trên trạm vũ trụ",
    "vi": "Журналист: Kính chào giáo sư! Xin giáo sư kể về những nghiên cứu mới trên trạm quỹ đạo.\nУчёный: Xin chào! Các phi hành gia của chúng tôi đang tiến hành các thí nghiệm sinh học quan trọng.\nЖурналист: Mục tiêu trọng tâm đặt ra cho ngành vũ trụ hiện đại là gì?\nУчёный: Mục tiêu cốt lõi là phát triển các công nghệ an toàn cho các chuyến bay lên Mặt Trăng.\nЖурналист: Cảm ơn giáo sư vì cuộc phỏng vấn và chúc nhóm nghiên cứu gặt hái thành công lớn!",
    "translation_vi": "Журналист: Kính chào giáo sư! Xin giáo sư kể về những nghiên cứu mới trên trạm quỹ đạo.\nУчёный: Xin chào! Các phi hành gia của chúng tôi đang tiến hành các thí nghiệm sinh học quan trọng.\nЖурналист: Mục tiêu trọng tâm đặt ra cho ngành vũ trụ hiện đại là gì?\nУчёный: Mục tiêu cốt lõi là phát triển các công nghệ an toàn cho các chuyến bay lên Mặt Trăng.\nЖурналист: Cảm ơn giáo sư vì cuộc phỏng vấn và chúc nhóm nghiên cứu gặt hái thành công lớn!",
    "transcript_ru": "Журналист: Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.\nУчёный: Добрый день! Наши космонавты проводят важные биологические эксперименты.\nЖурналист: Какая главная цель стоит перед современной космонавтикой?\nУчёный: Главная цель — разработка безопасных технологий для полётов на Луну.\nЖурналист: Благодарим вас за интервью и желаем больших успехов!",
    "level": "B2",
    "level_name": "Sơ cấp B2",
    "category": "interview",
    "category_name": "Phỏng vấn khoa học vũ trụ (Интервью о космонавтике)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-b2-interview.mp3",
    "duration_seconds": 30,
    "est_minutes": 12,
    "is_pro_only": true,
    "lines": [
      {
        "id": 1,
        "ru": "Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.",
        "vi": "Kính chào giáo sư! Xin giáo sư kể về những nghiên cứu mới trên trạm quỹ đạo.",
        "end_sec": 6.74,
        "speaker": "Журналист",
        "text_ru": "Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.",
        "start_sec": 0,
        "vocab_ids": [
          "a65ed9ae-5a41-4e86-adbd-00feb6a8e652"
        ],
        "translation_vi": "Kính chào giáo sư! Xin giáo sư kể về những nghiên cứu mới trên trạm quỹ đạo."
      },
      {
        "id": 2,
        "ru": "Добрый день! Наши космонавты проводят важные биологические эксперименты.",
        "vi": "Xin chào! Các phi hành gia của chúng tôi đang tiến hành các thí nghiệm sinh học quan trọng.",
        "end_sec": 13.48,
        "speaker": "Учёный",
        "text_ru": "Добрый день! Наши космонавты проводят важные биологические эксперименты.",
        "start_sec": 7.09,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000017"
        ],
        "translation_vi": "Xin chào! Các phi hành gia của chúng tôi đang tiến hành các thí nghiệm sinh học quan trọng."
      },
      {
        "id": 3,
        "ru": "Какая главная цель стоит перед современной космонавтикой?",
        "vi": "Mục tiêu trọng tâm đặt ra cho ngành vũ trụ hiện đại là gì?",
        "end_sec": 18.56,
        "speaker": "Журналист",
        "text_ru": "Какая главная цель стоит перед современной космонавтикой?",
        "start_sec": 13.83,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000018"
        ],
        "translation_vi": "Mục tiêu trọng tâm đặt ra cho ngành vũ trụ hiện đại là gì?"
      },
      {
        "id": 4,
        "ru": "Главная цель — разработка безопасных технологий для полётов на Луну.",
        "vi": "Mục tiêu cốt lõi là phát triển các công nghệ an toàn cho các chuyến bay lên Mặt Trăng.",
        "end_sec": 24.59,
        "speaker": "Учёный",
        "text_ru": "Главная цель — разработка безопасных технологий для полётов на Луну.",
        "start_sec": 18.91,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000018"
        ],
        "translation_vi": "Mục tiêu cốt lõi là phát triển các công nghệ an toàn cho các chuyến bay lên Mặt Trăng."
      },
      {
        "id": 5,
        "ru": "Благодарим вас за интервью и желаем больших успехов!",
        "vi": "Cảm ơn giáo sư vì cuộc phỏng vấn và chúc nhóm nghiên cứu gặt hái thành công lớn!",
        "end_sec": 29.43,
        "speaker": "Журналист",
        "text_ru": "Благодарим вас за интервью и желаем больших успехов!",
        "start_sec": 24.94,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000019"
        ],
        "translation_vi": "Cảm ơn giáo sư vì cuộc phỏng vấn và chúc nhóm nghiên cứu gặt hái thành công lớn!"
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Các phi hành gia trên trạm vũ trụ đang tiến hành dạng thí nghiệm nào?",
        "id": "q1",
        "options": [
          "Thí nghiệm vật lý lượng tử",
          "Thí nghiệm sinh học quan trọng",
          "Thử nghiệm động cơ ion",
          "Khảo sát khí quyển Trái Đất"
        ],
        "explanation": "Giáo sư chia sẻ: Наши космонавты проводят важные биологические эксперименты."
      },
      {
        "a": 1,
        "q": "Mục tiêu trọng tâm được nhắc tới là gì?",
        "id": "q2",
        "options": [
          "Khai thác khoáng sản thiên thạch",
          "Công nghệ an toàn cho chuyến bay lên Mặt Trăng",
          "Mở rộng du lịch quỹ đạo",
          "Xây dựng khách sạn vũ trụ"
        ],
        "explanation": "Giáo sư khẳng định: разработка безопасных технологий для полётов на Луну."
      },
      {
        "a": 1,
        "q": "Lời chúc của phóng viên ở cuối buổi phỏng vấn là gì?",
        "id": "q3",
        "options": [
          "Chúc sớm tìm thấy hành tinh mới",
          "Chúc gặt hái nhiều thành công lớn",
          "Chúc chuyến bay thuận lợi",
          "Chúc sức khỏe toàn đoàn"
        ],
        "explanation": "Phóng viên kết luận: желаем больших успехов!"
      }
    ],
    "dictation": [
      "Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.",
      "Добрый день! Наши космонавты проводят важные биологические эксперименты.",
      "Какая главная цель стоит перед современной космонавтикой?",
      "Главная цель — разработка безопасных технологий для полётов на Луну."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "a65ed9ae-5a41-4e86-adbd-00feb6a8e652",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
              "vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Ga tàu điện ngầm",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.043206+00:00",
          "word_normalized": "станция",
          "word_with_stress": "Ста́нция"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000017",
          "pos": "сущ.",
          "level": "B2",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Юрий Гагарин — первый космонавт в истории человечества.",
              "vi": "Yuri Gagarin là phi hành gia đầu tiên trong lịch sử nhân loại."
            },
            {
              "ru": "В будущем многие мечтают стать космонавтами и полететь на Марс.",
              "vi": "Trong tương lai, nhiều người mơ ước trở thành phi hành gia và bay tới sao Hỏa."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c1/Ru-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.ogg/Ru-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Phi hành gia",
          "structures": [
            "профессия космонавта (nghề phi hành gia)",
            "полёт космонавта на орбиту (chuyến bay của phi hành gia lên quỹ đạo)"
          ],
          "updated_at": "2026-11-15T12:01:14.181493+00:00",
          "word_normalized": "космонавт",
          "word_with_stress": "космона́вт"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000018",
          "pos": "сущ.",
          "level": "B2",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Моя главная цель — успешно сдать государственный экзамен ТРКИ.",
              "vi": "Mục tiêu chính của tôi là thi đỗ kỳ thi quốc gia TRKI."
            },
            {
              "ru": "Упорный труд помогает быстрее достичь поставленной цели.",
              "vi": "Sự chăm chỉ giúp nhanh chóng đạt được mục tiêu đã đề ra."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f8/Ru-%D1%86%D0%B5%D0%BB%D1%8C.ogg/Ru-%D1%86%D0%B5%D0%BB%D1%8C.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Mục tiêu",
          "structures": [
            "достичь цели (đạt được mục tiêu)",
            "поставить цель перед собой (đặt ra mục tiêu cho bản thân)",
            "с целью чего? (với mục đích gì)"
          ],
          "updated_at": "2026-11-15T12:01:14.182336+00:00",
          "word_normalized": "цель",
          "word_with_stress": "цель"
        },
        "line_index": 2,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000018",
          "pos": "сущ.",
          "level": "B2",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Моя главная цель — успешно сдать государственный экзамен ТРКИ.",
              "vi": "Mục tiêu chính của tôi là thi đỗ kỳ thi quốc gia TRKI."
            },
            {
              "ru": "Упорный труд помогает быстрее достичь поставленной цели.",
              "vi": "Sự chăm chỉ giúp nhanh chóng đạt được mục tiêu đã đề ra."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f8/Ru-%D1%86%D0%B5%D0%BB%D1%8C.ogg/Ru-%D1%86%D0%B5%D0%BB%D1%8C.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Mục tiêu",
          "structures": [
            "достичь цели (đạt được mục tiêu)",
            "поставить цель перед собой (đặt ra mục tiêu cho bản thân)",
            "с целью чего? (với mục đích gì)"
          ],
          "updated_at": "2026-11-15T12:01:14.182336+00:00",
          "word_normalized": "цель",
          "word_with_stress": "цель"
        },
        "line_index": 3,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000019",
          "pos": "сущ.",
          "level": "B2",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": null,
          "examples": [
            {
              "ru": "Желаю вам больших успехов в изучении русского языка!",
              "vi": "Chúc bạn gặt hái nhiều thành công trong việc học tiếng Nga!"
            },
            {
              "ru": "Этот научный проект имел огромный успех.",
              "vi": "Dự án khoa học này đã đạt được thành công vang dội."
            }
          ],
          "synonyms": null,
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e3/Ru-%D1%83%D1%81%D0%BF%D0%B5%D1%85.ogg/Ru-%D1%83%D1%81%D0%BF%D0%B5%D1%85.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Thành công",
          "structures": [
            "добиться успеха (đạt được thành công)",
            "желать успеха кому? (chúc ai thành công)",
            "с успехом (thành công rực rỡ)"
          ],
          "updated_at": "2026-11-15T12:01:14.182172+00:00",
          "word_normalized": "успех",
          "word_with_stress": "успе́х"
        },
        "line_index": 4,
        "sort_order": 1
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.",
          "vi": "Kính chào giáo sư! Xin giáo sư kể về những nghiên cứu mới trên trạm quỹ đạo.",
          "who": "Журналист"
        },
        {
          "ru": "Добрый день! Наши космонавты проводят важные биологические эксперименты.",
          "vi": "Xin chào! Các phi hành gia của chúng tôi đang tiến hành các thí nghiệm sinh học quan trọng.",
          "who": "Учёный"
        },
        {
          "ru": "Какая главная цель стоит перед современной космонавтикой?",
          "vi": "Mục tiêu trọng tâm đặt ra cho ngành vũ trụ hiện đại là gì?",
          "who": "Журналист"
        },
        {
          "ru": "Главная цель — разработка безопасных технологий для полётов на Луну.",
          "vi": "Mục tiêu cốt lõi là phát triển các công nghệ an toàn cho các chuyến bay lên Mặt Trăng.",
          "who": "Учёный"
        },
        {
          "ru": "Благодарим вас за интервью и желаем больших успехов!",
          "vi": "Cảm ơn giáo sư vì cuộc phỏng vấn và chúc nhóm nghiên cứu gặt hái thành công lớn!",
          "who": "Журналист"
        }
      ],
      "blanks": [],
      "dictation": [
        "Здравствуйте, профессор! Расскажите о новых исследованиях на орбитальной станции.",
        "Добрый день! Наши космонавты проводят важные биологические эксперименты.",
        "Какая главная цель стоит перед современной космонавтикой?",
        "Главная цель — разработка безопасных технологий для полётов на Луну."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Các phi hành gia trên trạm vũ trụ đang tiến hành dạng thí nghiệm nào?",
          "id": "q1",
          "options": [
            "Thí nghiệm vật lý lượng tử",
            "Thí nghiệm sinh học quan trọng",
            "Thử nghiệm động cơ ion",
            "Khảo sát khí quyển Trái Đất"
          ],
          "explanation": "Giáo sư chia sẻ: Наши космонавты проводят важные биологические эксперименты."
        },
        {
          "a": 1,
          "q": "Mục tiêu trọng tâm được nhắc tới là gì?",
          "id": "q2",
          "options": [
            "Khai thác khoáng sản thiên thạch",
            "Công nghệ an toàn cho chuyến bay lên Mặt Trăng",
            "Mở rộng du lịch quỹ đạo",
            "Xây dựng khách sạn vũ trụ"
          ],
          "explanation": "Giáo sư khẳng định: разработка безопасных технологий для полётов на Луну."
        },
        {
          "a": 1,
          "q": "Lời chúc của phóng viên ở cuối buổi phỏng vấn là gì?",
          "id": "q3",
          "options": [
            "Chúc sớm tìm thấy hành tinh mới",
            "Chúc gặt hái nhiều thành công lớn",
            "Chúc chuyến bay thuận lợi",
            "Chúc sức khỏe toàn đoàn"
          ],
          "explanation": "Phóng viên kết luận: желаем больших успехов!"
        }
      ]
    }
  },
  {
    "id": "lis-airport",
    "lesson_uuid": "33333333-3333-3333-3333-000000000001",
    "code": "lis-airport",
    "topic_id": "22222222-2222-2222-2222-000000000001",
    "title": "Ở sân bay làm thủ tục",
    "vi": "Nhân viên: Xin hộ chiếu và vé của anh/chị.\nАня: Đây ạ.\nNhân viên: Anh/chị có hành lý ký gửi không?\nАня: Có, một vali. Còn đây là hành lý xách tay.\nNhân viên: Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva.\nАня: Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?\nNhân viên: Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa.",
    "translation_vi": "Nhân viên: Xin hộ chiếu và vé của anh/chị.\nАня: Đây ạ.\nNhân viên: Anh/chị có hành lý ký gửi không?\nАня: Có, một vali. Còn đây là hành lý xách tay.\nNhân viên: Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva.\nАня: Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?\nNhân viên: Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa.",
    "transcript_ru": "Nhân viên: Ваш паспорт и билет, пожалуйста.\nАня: Вот, пожалуйста.\nNhân viên: У вас есть багаж?\nАня: Да, один чемодан. Это ручная кладь.\nNhân viên: Ваше место — 21А. Рейс с пересадкой в Москве.\nАня: Спасибо! А где паспортный контроль?\nNhân viên: Там, направо. Ваш рейс через два часа.",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "airport",
    "category_name": "Ở sân bay (В аэропорту)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-a1-airport-checkin.mp3",
    "duration_seconds": 25,
    "est_minutes": 12,
    "is_pro_only": false,
    "lines": [
      {
        "id": 1,
        "ru": "Ваш паспорт и билет, пожалуйста.",
        "vi": "Xin hộ chiếu và vé của anh/chị.",
        "end_sec": 3.19,
        "speaker": "Nhân viên",
        "text_ru": "Ваш паспорт и билет, пожалуйста.",
        "start_sec": 0,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000001",
          "11111111-1111-1111-1111-000000000002"
        ],
        "translation_vi": "Xin hộ chiếu và vé của anh/chị."
      },
      {
        "id": 2,
        "ru": "Вот, пожалуйста.",
        "vi": "Đây ạ.",
        "end_sec": 5.25,
        "speaker": "Аня",
        "text_ru": "Вот, пожалуйста.",
        "start_sec": 3.54,
        "vocab_ids": [],
        "translation_vi": "Đây ạ."
      },
      {
        "id": 3,
        "ru": "У вас есть багаж?",
        "vi": "Anh/chị có hành lý ký gửi không?",
        "end_sec": 7.35,
        "speaker": "Nhân viên",
        "text_ru": "У вас есть багаж?",
        "start_sec": 5.6,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000003"
        ],
        "translation_vi": "Anh/chị có hành lý ký gửi không?"
      },
      {
        "id": 4,
        "ru": "Да, один чемодан. Это ручная кладь.",
        "vi": "Có, một vali. Còn đây là hành lý xách tay.",
        "end_sec": 11.35,
        "speaker": "Аня",
        "text_ru": "Да, один чемодан. Это ручная кладь.",
        "start_sec": 7.7,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000005"
        ],
        "translation_vi": "Có, một vali. Còn đây là hành lý xách tay."
      },
      {
        "id": 5,
        "ru": "Ваше место — 21А. Рейс с пересадкой в Москве.",
        "vi": "Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva.",
        "end_sec": 17.02,
        "speaker": "Nhân viên",
        "text_ru": "Ваше место — 21А. Рейс с пересадкой в Москве.",
        "start_sec": 11.7,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000004",
          "11111111-1111-1111-1111-000000000006"
        ],
        "translation_vi": "Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva."
      },
      {
        "id": 6,
        "ru": "Спасибо! А где паспортный контроль?",
        "vi": "Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?",
        "end_sec": 20.49,
        "speaker": "Аня",
        "text_ru": "Спасибо! А где паспортный контроль?",
        "start_sec": 17.37,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000001",
          "11111111-1111-1111-1111-000000000007"
        ],
        "translation_vi": "Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?"
      },
      {
        "id": 7,
        "ru": "Там, направо. Ваш рейс через два часа.",
        "vi": "Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa.",
        "end_sec": 24.92,
        "speaker": "Nhân viên",
        "text_ru": "Там, направо. Ваш рейс через два часа.",
        "start_sec": 20.84,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000006"
        ],
        "translation_vi": "Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa."
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Chỗ ngồi của Anya là số nào?",
        "id": "q1",
        "options": [
          "12Б",
          "21А",
          "21Б",
          "20А"
        ],
        "explanation": "Nhân viên nói: Ваше место — 21А."
      },
      {
        "a": 1,
        "q": "Chuyến bay của Anya có điểm gì đặc biệt?",
        "id": "q2",
        "options": [
          "Bay thẳng không dừng",
          "Quá cảnh ở Moskva",
          "Bị hoãn 3 tiếng",
          "Bay chuyến đêm"
        ],
        "explanation": "Nhân viên thông báo: Рейс с пересадкой в Москве."
      },
      {
        "a": 1,
        "q": "Anya có mấy vali ký gửi?",
        "id": "q3",
        "options": [
          "Không có vali nào",
          "Một chiếc vali",
          "Hai chiếc vali",
          "Ba chiếc vali"
        ],
        "explanation": "Anya trả lời: Да, один чемодан."
      },
      {
        "a": 2,
        "q": "Kiểm tra hộ chiếu ở đâu?",
        "id": "q4",
        "options": [
          "Bên trái",
          "Đi thẳng",
          "Bên phải",
          "Ở tầng hai"
        ],
        "explanation": "Nhân viên chỉ đường: Там, направо."
      }
    ],
    "dictation": [
      "Ваш паспорт и билет, пожалуйста.",
      "Вот, пожалуйста.",
      "У вас есть багаж?",
      "Да, один чемодан. Это ручная кладь."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000001",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Покажи́те, пожа́луйста, ваш па́спорт.",
              "vi": "Làm ơn cho tôi xem hộ chiếu của bạn."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d5/Ru-%D0%BF%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%82.ogg/Ru-%D0%BF%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:29.962544+00:00",
          "meaning_vi": "Hộ chiếu",
          "structures": [
            "па́спорт граждани́на, заграни́чный па́спорт"
          ],
          "updated_at": "2026-11-15T12:01:14.069064+00:00",
          "word_normalized": "паспорт",
          "word_with_stress": "Па́спорт"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000002",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я купи́л биле́т на по́езд в Москву́.",
              "vi": "Tôi đã mua vé tàu hỏa đi Moskva."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/49/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg/Ru-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Vé",
          "structures": [
            "биле́т + куда? (В.п. - С4) (билет на самолёт, билет в Москву)"
          ],
          "updated_at": "2026-11-15T12:01:14.068296+00:00",
          "word_normalized": "билет",
          "word_with_stress": "Биле́т"
        },
        "line_index": 0,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000003",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Где мо́жно получи́ть бага́ж?",
              "vi": "Có thể lấy hành lý ở đâu?"
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2f/Ru-%D0%B1%D0%B0%D0%B3%D0%B0%D0%B6.ogg/Ru-%D0%B1%D0%B0%D0%B3%D0%B0%D0%B6.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Hành lý ký gửi",
          "structures": [
            "сдава́ть / сдать бага́ж (gửi hành lý)"
          ],
          "updated_at": "2026-11-15T12:01:14.077047+00:00",
          "word_normalized": "багаж",
          "word_with_stress": "Бага́ж"
        },
        "line_index": 2,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000005",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Мой чемода́н о́чень тяжёлый.",
              "vi": "Chiếc vali của tôi rất nặng."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/16/Ru-%D1%87%D0%B5%D0%BC%D0%BE%D0%B4%D0%B0%D0%BD.ogg/Ru-%D1%87%D0%B5%D0%BC%D0%BE%D0%B4%D0%B0%D0%BD.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Chiếc vali",
          "structures": [
            "собира́ть / собра́ть чемода́н"
          ],
          "updated_at": "2026-11-15T12:01:14.077374+00:00",
          "word_normalized": "чемодан",
          "word_with_stress": "Чемода́н"
        },
        "line_index": 3,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000004",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ср.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Э́то ме́сто свобо́дно? Мо́жно здесь сесть?",
              "vi": "Chỗ này có trống không? Tôi có thể ngồi đây được không?"
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ae/Ru-%D0%BC%D0%B5%D1%81%D1%82%D0%BE.ogg/Ru-%D0%BC%D0%B5%D1%81%D1%82%D0%BE.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Chỗ ngồi, nơi chốn",
          "structures": [
            "свобо́дное ме́сто, ме́сто в самолёте"
          ],
          "updated_at": "2026-11-15T12:01:14.086239+00:00",
          "word_normalized": "место",
          "word_with_stress": "Ме́сто"
        },
        "line_index": 4,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000006",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Наш рейс отпра́вится во́время.",
              "vi": "Chuyến bay của chúng tôi sẽ khởi hành đúng giờ."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/55/Ru-%D1%80%D0%B5%D0%B9%D1%81.ogg/Ru-%D1%80%D0%B5%D0%B9%D1%81.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Chuyến bay",
          "structures": [
            "рейс + куда? (В.п. - С4) (рейс в Москву, прямой рейс)"
          ],
          "updated_at": "2026-11-15T12:01:14.077496+00:00",
          "word_normalized": "рейс",
          "word_with_stress": "Рейс"
        },
        "line_index": 4,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000001",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Покажи́те, пожа́луйста, ваш па́спорт.",
              "vi": "Làm ơn cho tôi xem hộ chiếu của bạn."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d5/Ru-%D0%BF%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%82.ogg/Ru-%D0%BF%D0%B0%D1%81%D0%BF%D0%BE%D1%80%D1%82.ogg.mp3",
          "created_at": "2026-11-10T16:52:29.962544+00:00",
          "meaning_vi": "Hộ chiếu",
          "structures": [
            "па́спорт граждани́на, заграни́чный па́спорт"
          ],
          "updated_at": "2026-11-15T12:01:14.069064+00:00",
          "word_normalized": "паспорт",
          "word_with_stress": "Па́спорт"
        },
        "line_index": 5,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000007",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Пассажи́ры прохо́дят па́спортный контро́ль.",
              "vi": "Hành khách đang làm thủ tục kiểm tra hộ chiếu."
            }
          ],
          "synonyms": [
            "прове́рка"
          ],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8d/Ru-%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C.ogg/Ru-%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Kiểm soát, kiểm tra",
          "structures": [
            "па́спортный контро́ль, тамо́женный контро́ль"
          ],
          "updated_at": "2026-11-15T12:01:14.081033+00:00",
          "word_normalized": "контроль",
          "word_with_stress": "Контро́ль"
        },
        "line_index": 5,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000006",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Наш рейс отпра́вится во́время.",
              "vi": "Chuyến bay của chúng tôi sẽ khởi hành đúng giờ."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/55/Ru-%D1%80%D0%B5%D0%B9%D1%81.ogg/Ru-%D1%80%D0%B5%D0%B9%D1%81.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Chuyến bay",
          "structures": [
            "рейс + куда? (В.п. - С4) (рейс в Москву, прямой рейс)"
          ],
          "updated_at": "2026-11-15T12:01:14.077496+00:00",
          "word_normalized": "рейс",
          "word_with_stress": "Рейс"
        },
        "line_index": 6,
        "sort_order": 1
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Ваш паспорт и билет, пожалуйста.",
          "vi": "Xin hộ chiếu và vé của anh/chị.",
          "who": "Nhân viên"
        },
        {
          "ru": "Вот, пожалуйста.",
          "vi": "Đây ạ.",
          "who": "Аня"
        },
        {
          "ru": "У вас есть багаж?",
          "vi": "Anh/chị có hành lý ký gửi không?",
          "who": "Nhân viên"
        },
        {
          "ru": "Да, один чемодан. Это ручная кладь.",
          "vi": "Có, một vali. Còn đây là hành lý xách tay.",
          "who": "Аня"
        },
        {
          "ru": "Ваше место — 21А. Рейс с пересадкой в Москве.",
          "vi": "Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva.",
          "who": "Nhân viên"
        },
        {
          "ru": "Спасибо! А где паспортный контроль?",
          "vi": "Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?",
          "who": "Аня"
        },
        {
          "ru": "Там, направо. Ваш рейс через два часа.",
          "vi": "Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa.",
          "who": "Nhân viên"
        }
      ],
      "blanks": [],
      "dictation": [
        "Ваш паспорт и билет, пожалуйста.",
        "Вот, пожалуйста.",
        "У вас есть багаж?",
        "Да, один чемодан. Это ручная кладь."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Chỗ ngồi của Anya là số nào?",
          "id": "q1",
          "options": [
            "12Б",
            "21А",
            "21Б",
            "20А"
          ],
          "explanation": "Nhân viên nói: Ваше место — 21А."
        },
        {
          "a": 1,
          "q": "Chuyến bay của Anya có điểm gì đặc biệt?",
          "id": "q2",
          "options": [
            "Bay thẳng không dừng",
            "Quá cảnh ở Moskva",
            "Bị hoãn 3 tiếng",
            "Bay chuyến đêm"
          ],
          "explanation": "Nhân viên thông báo: Рейс с пересадкой в Москве."
        },
        {
          "a": 1,
          "q": "Anya có mấy vali ký gửi?",
          "id": "q3",
          "options": [
            "Không có vali nào",
            "Một chiếc vali",
            "Hai chiếc vali",
            "Ba chiếc vali"
          ],
          "explanation": "Anya trả lời: Да, один чемодан."
        },
        {
          "a": 2,
          "q": "Kiểm tra hộ chiếu ở đâu?",
          "id": "q4",
          "options": [
            "Bên trái",
            "Đi thẳng",
            "Bên phải",
            "Ở tầng hai"
          ],
          "explanation": "Nhân viên chỉ đường: Там, направо."
        }
      ]
    }
  },
  {
    "id": "lis-shop",
    "lesson_uuid": "33333333-3333-3333-3333-000000000002",
    "code": "lis-shop",
    "topic_id": "22222222-2222-2222-2222-000000000002",
    "title": "Mua bánh mì và sữa tươi",
    "vi": "Покупатель: Xin chào! Ổ bánh mì này giá bao nhiêu?\nПродавец: Xin chào! Bánh mì giá 40 rúp.\nПокупатель: Làm ơn cho tôi một ổ bánh mì và sữa tươi.\nПродавец: Đây là sữa của bạn. Tổng cộng 120 rúp.\nПокупатель: Tôi có thể thanh toán bằng thẻ ngân hàng không?\nПродавец: Vâng, tất nhiên! Hãy chạm thẻ vào máy.",
    "translation_vi": "Покупатель: Xin chào! Ổ bánh mì này giá bao nhiêu?\nПродавец: Xin chào! Bánh mì giá 40 rúp.\nПокупатель: Làm ơn cho tôi một ổ bánh mì và sữa tươi.\nПродавец: Đây là sữa của bạn. Tổng cộng 120 rúp.\nПокупатель: Tôi có thể thanh toán bằng thẻ ngân hàng không?\nПродавец: Vâng, tất nhiên! Hãy chạm thẻ vào máy.",
    "transcript_ru": "Покупатель: Здравствуйте! Сколько стоит этот хлеб?\nПродавец: Здравствуйте! Хлеб стоит сорок рублей.\nПокупатель: Дайте, пожалуйста, хлеб и свежее молоко.\nПродавец: Вот ваше молоко. С вас сто двадцать рублей.\nПокупатель: Можно оплатить банковской картой?\nПродавец: Да, конечно! Приложите карту к терминалу.",
    "level": "A1",
    "level_name": "Sơ cấp A1",
    "category": "shop",
    "category_name": "Trong cửa hàng (В магазине)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-a1-shop.mp3",
    "duration_seconds": 24,
    "est_minutes": 12,
    "is_pro_only": false,
    "lines": [
      {
        "id": 1,
        "ru": "Здравствуйте! Сколько стоит этот хлеб?",
        "vi": "Xin chào! Ổ bánh mì này giá bao nhiêu?",
        "end_sec": 3.41,
        "speaker": "Покупатель",
        "text_ru": "Здравствуйте! Сколько стоит этот хлеб?",
        "start_sec": 0,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000010"
        ],
        "translation_vi": "Xin chào! Ổ bánh mì này giá bao nhiêu?"
      },
      {
        "id": 2,
        "ru": "Здравствуйте! Хлеб стоит сорок рублей.",
        "vi": "Xin chào! Bánh mì giá 40 rúp.",
        "end_sec": 7.19,
        "speaker": "Продавец",
        "text_ru": "Здравствуйте! Хлеб стоит сорок рублей.",
        "start_sec": 3.76,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000010",
          "11111111-1111-1111-1111-000000000011"
        ],
        "translation_vi": "Xin chào! Bánh mì giá 40 rúp."
      },
      {
        "id": 3,
        "ru": "Дайте, пожалуйста, хлеб и свежее молоко.",
        "vi": "Làm ơn cho tôi một ổ bánh mì và sữa tươi.",
        "end_sec": 11.62,
        "speaker": "Покупатель",
        "text_ru": "Дайте, пожалуйста, хлеб и свежее молоко.",
        "start_sec": 7.54,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000010",
          "6e601bf0-9949-4870-a0f5-315e59998b40"
        ],
        "translation_vi": "Làm ơn cho tôi một ổ bánh mì và sữa tươi."
      },
      {
        "id": 4,
        "ru": "Вот ваше молоко. С вас сто двадцать рублей.",
        "vi": "Đây là sữa của bạn. Tổng cộng 120 rúp.",
        "end_sec": 15.88,
        "speaker": "Продавец",
        "text_ru": "Вот ваше молоко. С вас сто двадцать рублей.",
        "start_sec": 11.97,
        "vocab_ids": [
          "6e601bf0-9949-4870-a0f5-315e59998b40",
          "11111111-1111-1111-1111-000000000011"
        ],
        "translation_vi": "Đây là sữa của bạn. Tổng cộng 120 rúp."
      },
      {
        "id": 5,
        "ru": "Можно оплатить банковской картой?",
        "vi": "Tôi có thể thanh toán bằng thẻ ngân hàng không?",
        "end_sec": 19.02,
        "speaker": "Покупатель",
        "text_ru": "Можно оплатить банковской картой?",
        "start_sec": 16.23,
        "vocab_ids": [],
        "translation_vi": "Tôi có thể thanh toán bằng thẻ ngân hàng không?"
      },
      {
        "id": 6,
        "ru": "Да, конечно! Приложите карту к терминалу.",
        "vi": "Vâng, tất nhiên! Hãy chạm thẻ vào máy.",
        "end_sec": 23.25,
        "speaker": "Продавец",
        "text_ru": "Да, конечно! Приложите карту к терминалу.",
        "start_sec": 19.37,
        "vocab_ids": [],
        "translation_vi": "Vâng, tất nhiên! Hãy chạm thẻ vào máy."
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Giá một ổ bánh mì là bao nhiêu?",
        "id": "q1",
        "options": [
          "20 rúp",
          "40 rúp",
          "100 rúp",
          "120 rúp"
        ],
        "explanation": "Người bán hàng trả lời: Хлеб стоит сорок рублей."
      },
      {
        "a": 2,
        "q": "Tổng số tiền khách hàng phải thanh toán là bao nhiêu?",
        "id": "q2",
        "options": [
          "40 rúp",
          "80 rúp",
          "120 rúp",
          "160 rúp"
        ],
        "explanation": "Người bán hàng thông báo: С вас сто двадцать рублей."
      },
      {
        "a": 1,
        "q": "Khách hàng thanh toán bằng phương thức nào?",
        "id": "q3",
        "options": [
          "Tiền mặt",
          "Thẻ ngân hàng",
          "Điểm thưởng",
          "Chuyển khoản"
        ],
        "explanation": "Khách hàng hỏi: Можно оплатить банковской картой?"
      }
    ],
    "dictation": [
      "Здравствуйте! Сколько стоит этот хлеб?",
      "Здравствуйте! Хлеб стоит сорок рублей.",
      "Дайте, пожалуйста, хлеб и свежее молоко.",
      "Вот ваше молоко. С вас сто двадцать рублей."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000010",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Купи́, пожа́луйста, све́жий бе́лый хлеб.",
              "vi": "Làm ơn mua giúp bánh mì trắng tươi mới nhé."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Bánh mì",
          "structures": [
            "бе́лый хлеб, чёрный хлеб, кусок хлеба"
          ],
          "updated_at": "2026-11-15T12:01:14.044844+00:00",
          "word_normalized": "хлеб",
          "word_with_stress": "Хлеб"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000010",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Купи́, пожа́луйста, све́жий бе́лый хлеб.",
              "vi": "Làm ơn mua giúp bánh mì trắng tươi mới nhé."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Bánh mì",
          "structures": [
            "бе́лый хлеб, чёрный хлеб, кусок хлеба"
          ],
          "updated_at": "2026-11-15T12:01:14.044844+00:00",
          "word_normalized": "хлеб",
          "word_with_stress": "Хлеб"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000011",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Э́та кни́га сто́ит три́ста рубле́й.",
              "vi": "Cuốn sách này giá ba trăm rúp."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/24/Ru-%D1%80%D1%83%D0%B1%D0%BB%D1%8C.ogg/Ru-%D1%80%D1%83%D0%B1%D0%BB%D1%8C.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Đồng rúp Nga",
          "structures": [
            "оди́н рубль, два рубля́, сто рубле́й"
          ],
          "updated_at": "2026-11-15T12:01:14.075587+00:00",
          "word_normalized": "рубль",
          "word_with_stress": "Рубль"
        },
        "line_index": 1,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000010",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Купи́, пожа́луйста, све́жий бе́лый хлеб.",
              "vi": "Làm ơn mua giúp bánh mì trắng tươi mới nhé."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg/Ru-%D1%85%D0%BB%D0%B5%D0%B1.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Bánh mì",
          "structures": [
            "бе́лый хлеб, чёрный хлеб, кусок хлеба"
          ],
          "updated_at": "2026-11-15T12:01:14.044844+00:00",
          "word_normalized": "хлеб",
          "word_with_stress": "Хлеб"
        },
        "line_index": 2,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "6e601bf0-9949-4870-a0f5-315e59998b40",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ср.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я налива́ю молоко́ в стака́н и пью.",
              "vi": "Tôi rót trà vào cốc và uống."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/63/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Sữa",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.132965+00:00",
          "word_normalized": "молоко",
          "word_with_stress": "Молоко́"
        },
        "line_index": 2,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "6e601bf0-9949-4870-a0f5-315e59998b40",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ср.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я налива́ю молоко́ в стака́н и пью.",
              "vi": "Tôi rót trà vào cốc và uống."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/63/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg/Ru-%D0%BC%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Sữa",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.132965+00:00",
          "word_normalized": "молоко",
          "word_with_stress": "Молоко́"
        },
        "line_index": 3,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "11111111-1111-1111-1111-000000000011",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Э́та кни́га сто́ит три́ста рубле́й.",
              "vi": "Cuốn sách này giá ba trăm rúp."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/24/Ru-%D1%80%D1%83%D0%B1%D0%BB%D1%8C.ogg/Ru-%D1%80%D1%83%D0%B1%D0%BB%D1%8C.ogg.mp3",
          "created_at": "2026-11-10T16:52:49.224545+00:00",
          "meaning_vi": "Đồng rúp Nga",
          "structures": [
            "оди́н рубль, два рубля́, сто рубле́й"
          ],
          "updated_at": "2026-11-15T12:01:14.075587+00:00",
          "word_normalized": "рубль",
          "word_with_stress": "Рубль"
        },
        "line_index": 3,
        "sort_order": 2
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Здравствуйте! Сколько стоит этот хлеб?",
          "vi": "Xin chào! Ổ bánh mì này giá bao nhiêu?",
          "who": "Покупатель"
        },
        {
          "ru": "Здравствуйте! Хлеб стоит сорок рублей.",
          "vi": "Xin chào! Bánh mì giá 40 rúp.",
          "who": "Продавец"
        },
        {
          "ru": "Дайте, пожалуйста, хлеб и свежее молоко.",
          "vi": "Làm ơn cho tôi một ổ bánh mì và sữa tươi.",
          "who": "Покупатель"
        },
        {
          "ru": "Вот ваше молоко. С вас сто двадцать рублей.",
          "vi": "Đây là sữa của bạn. Tổng cộng 120 rúp.",
          "who": "Продавец"
        },
        {
          "ru": "Можно оплатить банковской картой?",
          "vi": "Tôi có thể thanh toán bằng thẻ ngân hàng không?",
          "who": "Покупатель"
        },
        {
          "ru": "Да, конечно! Приложите карту к терминалу.",
          "vi": "Vâng, tất nhiên! Hãy chạm thẻ vào máy.",
          "who": "Продавец"
        }
      ],
      "blanks": [],
      "dictation": [
        "Здравствуйте! Сколько стоит этот хлеб?",
        "Здравствуйте! Хлеб стоит сорок рублей.",
        "Дайте, пожалуйста, хлеб и свежее молоко.",
        "Вот ваше молоко. С вас сто двадцать рублей."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Giá một ổ bánh mì là bao nhiêu?",
          "id": "q1",
          "options": [
            "20 rúp",
            "40 rúp",
            "100 rúp",
            "120 rúp"
          ],
          "explanation": "Người bán hàng trả lời: Хлеб стоит сорок рублей."
        },
        {
          "a": 2,
          "q": "Tổng số tiền khách hàng phải thanh toán là bao nhiêu?",
          "id": "q2",
          "options": [
            "40 rúp",
            "80 rúp",
            "120 rúp",
            "160 rúp"
          ],
          "explanation": "Người bán hàng thông báo: С вас сто двадцать рублей."
        },
        {
          "a": 1,
          "q": "Khách hàng thanh toán bằng phương thức nào?",
          "id": "q3",
          "options": [
            "Tiền mặt",
            "Thẻ ngân hàng",
            "Điểm thưởng",
            "Chuyển khoản"
          ],
          "explanation": "Khách hàng hỏi: Можно оплатить банковской картой?"
        }
      ]
    }
  },
  {
    "id": "lis-metro",
    "lesson_uuid": "33333333-3333-3333-3333-000000000006",
    "code": "lis-metro",
    "topic_id": "22222222-2222-2222-2222-000000000006",
    "title": "Thông báo chuyển ga Metro",
    "vi": "Диктор: Chú ý, cửa đang đóng lại. Ga tiếp theo là Okhotny Ryad.\nДиктор: Ga Okhotny Ryad. Chuyển tuyến sang tuyến Sokolnicheskaya.\nДиктор: Kính thưa quý hành khách, khi rời đoàn tàu xin đừng bỏ quên đồ đạc.\nДиктор: Về đồ đạc bị bỏ quên xin hãy báo cho nhân viên trực ban nhà ga.",
    "translation_vi": "Диктор: Chú ý, cửa đang đóng lại. Ga tiếp theo là Okhotny Ryad.\nДиктор: Ga Okhotny Ryad. Chuyển tuyến sang tuyến Sokolnicheskaya.\nДиктор: Kính thưa quý hành khách, khi rời đoàn tàu xin đừng bỏ quên đồ đạc.\nДиктор: Về đồ đạc bị bỏ quên xin hãy báo cho nhân viên trực ban nhà ga.",
    "transcript_ru": "Диктор: Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.\nДиктор: Станция “Охотный ряд”. Переход на Сокольническую линию.\nДиктор: Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.\nДиктор: О забытых вещах сообщайте дежурному по станции.",
    "level": "B1",
    "level_name": "Sơ cấp B1",
    "category": "metro",
    "category_name": "Tàu điện ngầm Moskva (Объявления в метро)",
    "part_type": "part1",
    "part_number": 1,
    "youtube_id": "",
    "video_youtube_id": "",
    "audio_url": "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/lis-b1-metro.mp3",
    "duration_seconds": 23,
    "est_minutes": 12,
    "is_pro_only": true,
    "lines": [
      {
        "id": 1,
        "ru": "Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.",
        "vi": "Chú ý, cửa đang đóng lại. Ga tiếp theo là Okhotny Ryad.",
        "end_sec": 6.1,
        "speaker": "Диктор",
        "text_ru": "Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.",
        "start_sec": 0,
        "vocab_ids": [
          "a65ed9ae-5a41-4e86-adbd-00feb6a8e652"
        ],
        "translation_vi": "Chú ý, cửa đang đóng lại. Ga tiếp theo là Okhotny Ryad."
      },
      {
        "id": 2,
        "ru": "Станция “Охотный ряд”. Переход на Сокольническую линию.",
        "vi": "Ga Okhotny Ryad. Chuyển tuyến sang tuyến Sokolnicheskaya.",
        "end_sec": 11.49,
        "speaker": "Диктор",
        "text_ru": "Станция “Охотный ряд”. Переход на Сокольническую линию.",
        "start_sec": 6.45,
        "vocab_ids": [
          "a65ed9ae-5a41-4e86-adbd-00feb6a8e652"
        ],
        "translation_vi": "Ga Okhotny Ryad. Chuyển tuyến sang tuyến Sokolnicheskaya."
      },
      {
        "id": 3,
        "ru": "Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.",
        "vi": "Kính thưa quý hành khách, khi rời đoàn tàu xin đừng bỏ quên đồ đạc.",
        "end_sec": 17.72,
        "speaker": "Диктор",
        "text_ru": "Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.",
        "start_sec": 11.84,
        "vocab_ids": [
          "11111111-1111-1111-1111-000000000016",
          "113ffa6c-11e3-4428-80d1-24d370123445"
        ],
        "translation_vi": "Kính thưa quý hành khách, khi rời đoàn tàu xin đừng bỏ quên đồ đạc."
      },
      {
        "id": 4,
        "ru": "О забытых вещах сообщайте дежурному по станции.",
        "vi": "Về đồ đạc bị bỏ quên xin hãy báo cho nhân viên trực ban nhà ga.",
        "end_sec": 22.36,
        "speaker": "Диктор",
        "text_ru": "О забытых вещах сообщайте дежурному по станции.",
        "start_sec": 18.07,
        "vocab_ids": [
          "a65ed9ae-5a41-4e86-adbd-00feb6a8e652"
        ],
        "translation_vi": "Về đồ đạc bị bỏ quên xin hãy báo cho nhân viên trực ban nhà ga."
      }
    ],
    "questions": [
      {
        "a": 1,
        "q": "Ga tàu tiếp theo được thông báo là ga nào?",
        "id": "q1",
        "options": [
          "Teatralnaya",
          "Okhotny Ryad",
          "Arbatskaya",
          "Kurskaya"
        ],
        "explanation": "Phát thanh viên đọc: Следующая станция — “Охотный ряд”."
      },
      {
        "a": 2,
        "q": "Khi rời tàu, hành khách được nhắc nhở điều gì?",
        "id": "q2",
        "options": [
          "Giữ chặt tay vịn",
          "Không xô đẩy khi lên xuống",
          "Không bỏ quên đồ đạc hành lý",
          "Mua vé bổ sung"
        ],
        "explanation": "Phát thanh viên nhắc: при выходе из поезда не забывайте свои вещи."
      },
      {
        "a": 1,
        "q": "Hành khách cần báo cho ai khi thấy đồ bị bỏ quên?",
        "id": "q3",
        "options": [
          "Cảnh sát giao thông",
          "Lái tàu hoặc nhân viên trực ban ga",
          "Hành khách đi cùng",
          "Tổng đài hỗ trợ"
        ],
        "explanation": "Phát thanh viên hướng dẫn: сообщайте дежурному по станции."
      }
    ],
    "dictation": [
      "Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.",
      "Станция “Охотный ряд”. Переход на Сокольническую линию.",
      "Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.",
      "О забытых вещах сообщайте дежурному по станции."
    ],
    "blanks": [],
    "vocab_items": [
      {
        "vocab": {
          "id": "a65ed9ae-5a41-4e86-adbd-00feb6a8e652",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
              "vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Ga tàu điện ngầm",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.043206+00:00",
          "word_normalized": "станция",
          "word_with_stress": "Ста́нция"
        },
        "line_index": 0,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "a65ed9ae-5a41-4e86-adbd-00feb6a8e652",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
              "vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Ga tàu điện ngầm",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.043206+00:00",
          "word_normalized": "станция",
          "word_with_stress": "Ста́нция"
        },
        "line_index": 1,
        "sort_order": 1
      },
      {
        "vocab": {
          "id": "113ffa6c-11e3-4428-80d1-24d370123445",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "м.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.",
              "vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0d/Ru-%D0%BF%D0%BE%D0%B5%D0%B7%D0%B4.ogg/Ru-%D0%BF%D0%BE%D0%B5%D0%B7%D0%B4.ogg.mp3",
          "created_at": "2026-11-10T05:56:24.103803+00:00",
          "meaning_vi": "Tàu hỏa",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.139895+00:00",
          "word_normalized": "поезд",
          "word_with_stress": "По́езд"
        },
        "line_index": 2,
        "sort_order": 2
      },
      {
        "vocab": {
          "id": "a65ed9ae-5a41-4e86-adbd-00feb6a8e652",
          "pos": "сущ.",
          "level": "A1",
          "notes": null,
          "aspect": null,
          "gender": "ж.",
          "antonyms": [],
          "examples": [
            {
              "ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
              "vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
            }
          ],
          "synonyms": [],
          "audio_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/46/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg/Ru-%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F.ogg.mp3",
          "created_at": "2026-11-10T05:56:19.821448+00:00",
          "meaning_vi": "Ga tàu điện ngầm",
          "structures": [],
          "updated_at": "2026-11-15T12:01:14.043206+00:00",
          "word_normalized": "станция",
          "word_with_stress": "Ста́нция"
        },
        "line_index": 3,
        "sort_order": 1
      }
    ],
    "raw_data": {
      "lines": [
        {
          "ru": "Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.",
          "vi": "Chú ý, cửa đang đóng lại. Ga tiếp theo là Okhotny Ryad.",
          "who": "Диктор"
        },
        {
          "ru": "Станция “Охотный ряд”. Переход на Сокольническую линию.",
          "vi": "Ga Okhotny Ryad. Chuyển tuyến sang tuyến Sokolnicheskaya.",
          "who": "Диктор"
        },
        {
          "ru": "Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.",
          "vi": "Kính thưa quý hành khách, khi rời đoàn tàu xin đừng bỏ quên đồ đạc.",
          "who": "Диктор"
        },
        {
          "ru": "О забытых вещах сообщайте дежурному по станции.",
          "vi": "Về đồ đạc bị bỏ quên xin hãy báo cho nhân viên trực ban nhà ga.",
          "who": "Диктор"
        }
      ],
      "blanks": [],
      "dictation": [
        "Осторожно, двери закрываются. Следующая станция — “Охотный ряд”.",
        "Станция “Охотный ряд”. Переход на Сокольническую линию.",
        "Уважаемые пассажиры, при выходе из поезда не забывайте свои вещи.",
        "О забытых вещах сообщайте дежурному по станции."
      ],
      "questions": [
        {
          "a": 1,
          "q": "Ga tàu tiếp theo được thông báo là ga nào?",
          "id": "q1",
          "options": [
            "Teatralnaya",
            "Okhotny Ryad",
            "Arbatskaya",
            "Kurskaya"
          ],
          "explanation": "Phát thanh viên đọc: Следующая станция — “Охотный ряд”."
        },
        {
          "a": 2,
          "q": "Khi rời tàu, hành khách được nhắc nhở điều gì?",
          "id": "q2",
          "options": [
            "Giữ chặt tay vịn",
            "Không xô đẩy khi lên xuống",
            "Không bỏ quên đồ đạc hành lý",
            "Mua vé bổ sung"
          ],
          "explanation": "Phát thanh viên nhắc: при выходе из поезда не забывайте свои вещи."
        },
        {
          "a": 1,
          "q": "Hành khách cần báo cho ai khi thấy đồ bị bỏ quên?",
          "id": "q3",
          "options": [
            "Cảnh sát giao thông",
            "Lái tàu hoặc nhân viên trực ban ga",
            "Hành khách đi cùng",
            "Tổng đài hỗ trợ"
          ],
          "explanation": "Phát thanh viên hướng dẫn: сообщайте дежурному по станции."
        }
      ]
    }
  }
];
  const VOCAB_LESSONS = [
  {
    "id": "94c11881-0c17-4c67-8060-6b659145565e",
    "code": "lesson_vocab_a2_12",
    "jar_id": "a4ea9cef-a42d-4870-a27e-259a1963b6ec",
    "title": "BÀI 12: TỪ VỰNG CHỦ ĐỀ GIAO TIẾP, THƯ TỪ & BÁO CHÍ (ОБЩЕНИЕ VÀ СМИ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Giao tiếp, Thư từ & Báo chí (Общение và СМИ)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Giao tiếp, Thư từ & Báo chí (Общение và СМИ)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "1f9ca346-9068-49eb-83bb-02d305997493",
    "code": "lesson_vocab_a2_01",
    "jar_id": "15e78493-af9c-4f48-acbc-e9657fecf34e",
    "title": "BÀI 01: TỪ VỰNG CHỦ ĐỀ THÀNH PHỐ & DU LỊCH (ГОРОД И ТУРИЗМ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Thành phố & Du lịch (Город и туризм)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Thành phố & Du lịch (Город и туризм)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "23e9b88e-42a8-4adb-af48-a3fc3f6e7ba7",
    "code": "lesson_vocab_a2_02",
    "jar_id": "7f46de84-facd-4dd5-91bc-31a736857ba7",
    "title": "BÀI 02: TỪ VỰNG CHỦ ĐỀ NGHỀ NGHIỆP & CÔNG VIỆC (ПРОФЕССИЯ И РАБОТА)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Nghề nghiệp & Công việc (Профессия и работа)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Nghề nghiệp & Công việc (Профессия и работа)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "209f68f9-fb0c-4d82-868a-9eb999cc329f",
    "code": "lesson_vocab_a2_03",
    "jar_id": "4c692e41-ede6-4193-ac8e-de1c84aa450d",
    "title": "BÀI 03: TỪ VỰNG CHỦ ĐỀ NGHỆ THUẬT & NHÀ HÁT (ИСКУССТВО И ТЕАТР)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Nghệ thuật & Nhà hát (Искусство и театр)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Nghệ thuật & Nhà hát (Искусство и театр)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "7ffa32af-1f26-4bc5-a789-a05ce8cc2d8e",
    "code": "lesson_vocab_a2_04",
    "jar_id": "99e1678e-6eee-4318-ac74-641ec6b81e8e",
    "title": "BÀI 04: TỪ VỰNG CHỦ ĐỀ NHÀ CỬA & ĐỜI SỐNG (ДОМ И БЫТ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Nhà cửa & Đời sống (Дом и быт)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Nhà cửa & Đời sống (Дом и быт)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "af37b6cc-4dfa-4be4-805a-36d0c9cdd142",
    "code": "lesson_vocab_a2_05",
    "jar_id": "ece556c3-dc18-4869-9c46-6ad674ef69fb",
    "title": "BÀI 05: TỪ VỰNG CHỦ ĐỀ GIA ĐÌNH & MỐI QUAN HỆ (СЕМЬЯ И ОТНОШЕНИЯ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Gia đình & Mối quan hệ (Семья и отношения)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Gia đình & Mối quan hệ (Семья и отношения)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "26525cff-b8a1-493b-b490-440d5afdaa2f",
    "code": "lesson_vocab_a2_06",
    "jar_id": "5aca3bfb-473d-442a-abd3-2efda55cdead",
    "title": "BÀI 06: TỪ VỰNG CHỦ ĐỀ HỌC TẬP & KHOA HỌC (УЧЁБА И НАУКА)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Học tập & Khoa học (Учёба и наука)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Học tập & Khoa học (Учёба и наука)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "3f06c050-1f61-4b3d-b323-8ccdddd54062",
    "code": "lesson_vocab_a2_07",
    "jar_id": "26d96b05-933b-48c1-abdd-c54faff7aa39",
    "title": "BÀI 07: TỪ VỰNG CHỦ ĐỀ GIAO THÔNG & ĐI LẠI (ТРАНСПОРТ И ПОЕЗДКИ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Giao thông & Đi lại (Транспорт и поездки)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Giao thông & Đi lại (Транспорт и поездки)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "c2260fa7-e3e8-4b7d-83bb-a5ee118f3701",
    "code": "lesson_vocab_a2_08",
    "jar_id": "0539af8a-d9a4-42b2-823d-3b112f94da5b",
    "title": "BÀI 08: TỪ VỰNG CHỦ ĐỀ THỂ THAO & SỨC KHỎE (СПОРТ И ЗДОРОВЬЕ)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Thể thao & Sức khỏe (Спорт и здоровье)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Thể thao & Sức khỏe (Спорт и здоровье)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "e85b4266-677d-461e-83d5-6f3af9c7fc68",
    "code": "lesson_vocab_a2_09",
    "jar_id": "010ef059-63bf-491f-917b-325d8b2590dd",
    "title": "BÀI 09: TỪ VỰNG CHỦ ĐỀ THIÊN NHIÊN & THỜI TIẾT (ПРИРОДА И ПОГОДА)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Thiên nhiên & Thời tiết (Природа и погода)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Thiên nhiên & Thời tiết (Природа и погода)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "76d6fe58-a2e0-46db-bb0e-f0f2f5ebc55f",
    "code": "lesson_vocab_a2_10",
    "jar_id": "ecccc8c4-ea83-4b69-b24d-10737fbc5621",
    "title": "BÀI 10: TỪ VỰNG CHỦ ĐỀ ẨM THỰC & NHÀ HÀNG (ЕДА И РЕСТОРАН)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Ẩm thực & Nhà hàng (Еда и ресторан)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Ẩm thực & Nhà hàng (Еда и ресторан)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "e9b1a16d-fc88-4513-8175-c72469dd4f57",
    "code": "lesson_vocab_a2_11",
    "jar_id": "45e4ee39-d8c4-4ed0-b1b4-fcb1d6ec2cd2",
    "title": "BÀI 11: TỪ VỰNG CHỦ ĐỀ TÍNH CÁCH & CẢM XÚC (ХАРАКТЕР И ЧУВСТВА)",
    "level": "A2",
    "content_md": "# Bài học Ngữ cảnh A2: Tính cách & Cảm xúc (Характер и чувства)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A2)\nỞ trình độ A2, người học bắt đầu bước vào giai đoạn giao tiếp thực tế chuyên sâu tại Nga. Chủ đề **Tính cách & Cảm xúc (Характер и чувства)** cung cấp vốn từ vựng nền tảng, các cụm từ kết hợp tự nhiên (collocations) và các mẫu câu thông dụng nhất giúp bạn tự tin xử lý mọi tình huống sinh hoạt, du lịch, học tập và công việc.\n\n## 2. Các mẫu câu đàm thoại nòng cốt (Kèm trọng âm & Dịch Việt)\n- Vận dụng linh hoạt các cấu trúc ngữ pháp cách (Падежи):\n  - Hỏi đáp vị trí, phương hướng di chuyển.\n  - Diễn đạt mong muốn, yêu cầu lịch sự với đối tác, người bản xứ.\n  - Sử dụng câu phức với *который*, *чтобы*, *если*, *хотя*.\n\n## 3. Cụm từ cố định & Cấu trúc ngữ pháp trọng tâm\n- Nắm vững sự kết hợp giữa Động từ và Giới từ đi kèm (Управление глаголов).\n- Chú ý các cặp động từ Thể chưa hoàn thành (НСВ) và Hoàn thành (СВ) trong từng ngữ cảnh hành động cụ thể.\n\n## 4. Những lỗi người học Việt Nam thường mắc phải\n- Quên biến cách cho tính từ và danh từ đi kèm.\n- Nhầm lẫn giữa các động từ gần nghĩa hoặc chuyển ngữ trực tiếp từ tiếng Việt.\n\n## 5. Luyện tập với Lọ từ vựng (Spaced Repetition SM-2)\nHãy mở Lọ từ vựng tương ứng của bài học này để bắt đầu phiên ôn luyện lặp lại ngắt quãng, giúp ghi nhớ vĩnh viễn các từ vựng cốt lõi vào trí nhớ dài hạn!\n",
    "created_at": "2026-11-13T17:01:16.023317+00:00",
    "updated_at": "2026-11-13T17:01:16.023317+00:00"
  },
  {
    "id": "b95988f8-b0fa-4472-aeba-ef4a2e049ed1",
    "code": "lesson_vocab_b1_04",
    "jar_id": "7e868131-a336-45a0-839a-07372b144c80",
    "title": "BÀI 04: TỪ VỰNG CHỦ ĐỀ GIÁO DỤC ĐẠI HỌC & NGHIÊN CỨU (УНИВЕРСИТЕТ И ВЫСШЕЕ ОБРАЗОВАНИЕ)",
    "level": "B1",
    "content_md": "# Bài học: Giáo dục Đại học & Nghiên cứu (Университет и высшее образование)\n\n## I. Môi trường Đại học Nga (Вузы России)\nHệ thống giáo dục đại học Nga nổi tiếng toàn cầu với tòa nhà trung tâm MGU sừng sững trên Đồi Chim Sẻ. Đây là cái nôi sản sinh ra nhiều nhà khoa học đoạt giải Nobel.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **специа́льность** | *сущ.* | chuyên ngành, chuyên môn | • **Cấu trúc:** `специальность + по чему (Д.п.)`<br/>• **Ví dụ:** *По́сле оконча́ния МГУ он рабо́тает по свое́й специа́льности.* (Sau khi tốt nghiệp MGU, anh ấy làm việc đúng theo chuyên ngành của mình.) |\n| 2 | **поступи́ть** | *гл.* | thi đỗ, nhập học (vào trường); hành xử | • **Cấu trúc:** `поступить + в университет / на факультет (В.п.)`<br/>• **Ví dụ:** *Мой друг мечта́л поступи́ть на филологи́ческий факульте́т МГУ.* (Bạn tôi đã mơ ước thi đỗ vào khoa Ngữ văn Đại học MGU.) |\n| 3 | **око́нчить** | *гл.* | tốt nghiệp, học xong (trường học) | • **Cấu trúc:** `окончить + университет / школу (В.п.)`<br/>• **Ví dụ:** *В э́том году́ на́ша дочь с отли́чием око́нчила медици́нский институ́т.* (Năm nay con gái chúng tôi đã tốt nghiệp xuất sắc viện y học.) |\n| 4 | **выпускни́к** | *сущ.* | cựu sinh viên tốt nghiệp, người ra trường | • **Cấu trúc:** `выпускник университета`<br/>• **Ví dụ:** *Выпускники́ МГУ рабо́тают в крупне́йших лаборато́риях и компа́ниях ми́ра.* (Các cựu sinh viên MGU đang làm việc tại các phòng thí nghiệm và tập đoàn lớn nhất thế giới.) |\n| 5 | **се́ссия** | *сущ.* | kỳ thi học kỳ (ở trường đại học) | • **Cấu trúc:** `зимняя / летняя сессия`<br/>• **Ví dụ:** *Студе́нты напряжённо гото́вятся, ведь ско́ро начина́ется зи́мняя се́ссия.* (Sinh viên đang căng mình ôn tập, bởi kỳ thi học kỳ mùa đông sắp bắt đầu.) |\n| 6 | **стипе́ндия** | *сущ.* | học bổng | • **Cấu trúc:** `получать стипендию`<br/>• **Ví dụ:** *За отличную учёбу студе́нту назна́чили повы́шенную стипе́ндию.* (Nhờ thành tích học tập xuất sắc, người sinh viên đã được cấp học bổng loại giỏi.) |\n| 7 | **общежи́тие** | *сущ.* | ký túc xá | • **Cấu trúc:** `жить в общежитии`<br/>• **Ví dụ:** *Иногоро́дним студе́нтам университе́т предоставля́ет ме́сто в общежи́тии.* (Trường đại học cung cấp chỗ ở tại ký túc xá cho sinh viên đến từ các tỉnh thành khác.) |\n| 8 | **аспиранту́ра** | *сущ.* | hệ đào tạo nghiên cứu sinh tiến sĩ | • **Cấu trúc:** `поступить в аспирантуру`<br/>• **Ví dụ:** *Он реши́л оста́ться в аспиранту́ре, что́бы продолжа́ть нау́чную рабо́ту.* (Anh ấy quyết định tiếp tục học hệ nghiên cứu sinh để theo đuổi công tác nghiên cứu khoa học.) |\n| 9 | **диссерта́ция** | *сущ.* | luận án (tiến sĩ, phó tiến sĩ) | • **Cấu trúc:** `защитить диссертацию`<br/>• **Ví dụ:** *В про́шлом ме́сяце он успе́шно защити́л ка́ндидатскую диссерта́цию.* (Tháng trước anh ấy đã bảo vệ thành công luận án phó tiến sĩ.) |\n| 10 | **аудито́рия** | *сущ.* | giảng đường; thính giả / độc giả | • **Cấu trúc:** `в лекционной аудитории`<br/>• **Ví dụ:** *Лекцио́нная аудито́рия была́ по́лностью за́полнена студе́нтами.* (Giảng đường lớp học đã chật kín sinh viên.) |\n| 11 | **факульте́т** | *сущ.* | khoa (trong trường đại học) | • **Cấu trúc:** `учиться на факультете (Пр.п.)`<br/>• **Ví dụ:** *Она́ учи́тся на тре́тьем ку́рсе механико-математи́ческого факульте́та МГУ.* (Cô ấy đang học năm thứ ba khoa Toán - Cơ trường Đại học Tổng hợp Moskva.) |\n| 12 | **дека́н** | *сущ.* | trưởng khoa, chủ nhiệm khoa | • **Cấu trúc:** `кабинет декана`<br/>• **Ví dụ:** *Дека́н подписа́л прика́з о преми́ровании лу́чших студе́нтов ку́рса.* (Trưởng khoa đã ký quyết định khen thưởng những sinh viên xuất sắc nhất khóa.) |\n| 13 | **ре́ктор** | *сущ.* | hiệu trưởng trường đại học | • **Cấu trúc:** `ректор университета`<br/>• **Ví dụ:** *Ре́ктор поздра́вил первоку́рсников с Днём зна́ний пе́рвого сентября́.* (Hiệu trưởng đã chúc mừng các tân sinh viên nhân Ngày Tri thức 1/9.) |\n| 14 | **ле́кция** | *сущ.* | bài giảng lý thuyết trên lớp | • **Cấu trúc:** `читать лекцию`<br/>• **Ví dụ:** *Профе́ссор прочита́л увлека́тельную ле́кцию по исто́рии ру́сской литерату́ры.* (Giáo sư đã thuyết giảng một bài lý thuyết cuốn hút về lịch sử văn học Nga.) |\n| 15 | **семина́р** | *сущ.* | buổi thảo luận chuyên đề, tiết thực hành | • **Cấu trúc:** `практический семинар`<br/>• **Ví dụ:** *На семина́ре студе́нты оживлённо обсужда́ли прочитанную нау́чную статью́.* (Trong buổi seminar các sinh viên đã thảo luận sôi nổi về bài báo khoa học vừa đọc.) |\n| 16 | **зачёт** | *сущ.* | bài thi điều kiện, kỳ sát hạch (đạt/không đạt) | • **Cấu trúc:** `сдать зачёт (В.п.)`<br/>• **Ví dụ:** *Пе́ред се́ссией студе́нтам ну́жно получи́ть все зачёты по практи́ческим предме́там.* (Trước kỳ thi học kỳ sinh viên phải hoàn thành tất cả các môn thi sát hạch thực hành.) |\n| 17 | **дипло́м** | *сущ.* | bằng tốt nghiệp; khóa luận tốt nghiệp | • **Cấu trúc:** `красный диплом (с отличием)`<br/>• **Ví dụ:** *Она́ око́нчила университе́т с кра́сным дипло́мом и получи́ла приглаше́ние на рабо́ту.* (Cô ấy đã tốt nghiệp đại học với tấm bằng đỏ xuất sắc và nhận được lời mời làm việc.) |\n| 18 | **абитурие́нт** | *сущ.* | thí sinh dự thi đại học, người nộp hồ sơ | • **Cấu trúc:** `приём документов от абитуриентов`<br/>• **Ví dụ:** *Ты́сячи абитурие́нтов со все́й страны́ съезжа́ются ле́том в Москву́ сдава́ть экза́мены.* (Hàng ngàn thí sinh từ khắp cả nước đổ về Moskva vào mùa hè để tham gia kỳ thi tuyển.) |\n| 19 | **первоку́рсник** | *сущ.* | sinh viên năm nhất, tân sinh viên | • **Cấu trúc:** `посвящение в первокурсники`<br/>• **Ví dụ:** *Первоку́рсникам бы́ло тру́дно привы́кнуть к но́вому студе́нческому распорядку дня.* (Các bạn tân sinh viên đã rất khó khăn để quen với thời gian biểu mới của đời sống sinh viên.) |\n| 20 | **ка́федра** | *сущ.* | bộ môn (đơn vị chuyên môn của khoa); bục giảng | • **Cấu trúc:** `кафедра русского языка`<br/>• **Ví dụ:** *Ка́федра ру́сского языка́ как иностра́нного подгото́вила но́вый уче́бник B1.* (Bộ môn Tiếng Nga như một Ngoại ngữ đã biên soạn cuốn giáo trình B1 mới.) |\n| 21 | **руководи́тель** | *сущ.* | người hướng dẫn, lãnh đạo (người hướng dẫn khoa học) | • **Cấu trúc:** `научный руководитель`<br/>• **Ví dụ:** *Нау́чный руководи́тель помо́г аспира́нту вы́брать актуа́льную те́му иссле́дования.* (Người hướng dẫn khoa học đã giúp nghiên cứu sinh chọn được đề tài nghiên cứu mang tính thời sự.) |\n| 22 | **конфере́нция** | *сущ.* | hội thảo, hội nghị khoa học | • **Cấu trúc:** `международная конференция`<br/>• **Ví dụ:** *На междунаро́дной конфере́нции учёные обсужда́ли глоба́льные пробле́мы кли́мата.* (Tại hội nghị quốc tế các nhà khoa học đã thảo luận những vấn đề toàn cầu về khí hậu.) |\n| 23 | **отчисле́ние** | *сущ.* | sự buộc thôi học, đuổi học | • **Cấu trúc:** `приказ об отчислении`<br/>• **Ví dụ:** *Студе́нту грози́ло отчисле́ние за системати́ческие про́пуски заня́тий.* (Người sinh viên đã đối mặt nguy cơ bị buộc thôi học vì nghỉ học có hệ thống.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-14T12:15:22.850037+00:00"
  },
  {
    "id": "df666f5d-df50-4144-94c4-453c0bf2d644",
    "code": "lesson_vocab_b1_01",
    "jar_id": "a36c16b2-13ca-47cb-9ec0-5701d083d759",
    "title": "BÀI 01: TỪ VỰNG CHỦ ĐỀ CON NGƯỜI, TIỂU SỬ & TÍNH CÁCH (ЧЕЛОВЕК, БИОГРАФИЯ И ХАРАКТЕР)",
    "level": "B1",
    "content_md": "# Bài học: Con người, Tiểu sử & Tính cách (Человек, биография и характер)\n\n## I. Bối cảnh & Tầm quan trọng (CEFR B1)\nỞ trình độ B1, người học không chỉ dừng lại ở việc giới thiệu tên tuổi, nghề nghiệp đơn giản như ở bậc sơ cấp A1/A2, mà phải có khả năng khắc họa chân dung tâm lý nhân vật, thuật lại các bước ngoặt cuộc đời (biography), phân tích các mối quan hệ tình cảm và các giá trị gia đình sâu sắc.\n\n> [!NOTE]\n> **Góc nhìn Văn hóa Nga:**\n> Người Nga đặc biệt tôn sùng những con người có ý chí sắt đá, vượt lên nghịch cảnh số phận (*судьба*) bằng lòng kiên định (*целеустремлённость*). Khi nói về gia đình, sự thấu hiểu và tin cậy lẫn nhau (*взаимное доверие*) luôn được đặt lên hàng đầu.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (25 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **биогра́фия** | *сущ.* | tiểu sử, lý lịch cuộc đời | • **Cấu trúc:** `биография + кого (Р.п.)`<br/>• **Ví dụ:** *Он опубликова́л подро́бную биогра́фию вели́кого учёного.* (Ông ấy đã xuất bản cuốn tiểu sử chi tiết về nhà khoa học vĩ đại.) |\n| 2 | **судьба́** | *сущ.* | số phận, vận mệnh | • **Cấu trúc:** `судьба + кого/чего (Р.п.)`<br/>• **Ví dụ:** *Судьба́ свела́ их вме́сте в тяжёлые го́ды.* (Số phận đã đưa họ đến với nhau trong những năm tháng gian khó.) |\n| 3 | **коллекциони́ровать** | *гл.* | sưu tầm, thu thập theo bộ sưu tập | • **Cấu trúc:** `коллекционировать + что (В.п.)`<br/>• **Ví dụ:** *Па́вел Третьяко́в мно́го лет коллекциони́ровал карти́ны ру́сских худо́жников.* (Pavel Tretyakov đã nhiều năm sưu tầm tranh của các họa sĩ Nga.) |\n| 4 | **коллекционе́р** | *сущ.* | nhà sưu tầm, người sưu tập | • **Cấu trúc:** `коллекционер + чего (Р.п.)`<br/>• **Ví dụ:** *Изве́стный коллекционе́р подари́л свою́ галере́ю го́роду.* (Nhà sưu tầm nổi tiếng đã hiến tặng phòng tranh của mình cho thành phố.) |\n| 5 | **подари́ть** | *гл.* | tặng, trao tặng (hoàn thành) | • **Cấu trúc:** `подарить + что (В.п.) + кому (Д.п.)`<br/>• **Ví dụ:** *В 1892 году́ Третьяко́в подари́л свою́ колле́кцию Москве́.* (Năm 1892, Tretyakov đã trao tặng bộ sưu tập của mình cho Moskva.) |\n| 6 | **пожени́ться** | *гл.* | kết hôn, lấy nhau (dùng cho cả hai người) | • **Cấu trúc:** `кто (И.п.) + поженились`<br/>• **Ví dụ:** *Они́ пожени́лись сра́зу по́сле оконча́ния институ́та.* (Họ đã kết hôn ngay sau khi tốt nghiệp đại học.) |\n| 7 | **развести́сь** | *гл.* | ly hôn, ly dị | • **Cấu trúc:** `развестись + с кем (Тв.п.)`<br/>• **Ví dụ:** *Они́ прожи́ли вме́сте де́сять лет и реши́ли развести́сь.* (Họ sống cùng nhau mười năm rồi quyết định ly dị.) |\n| 8 | **разво́д** | *сущ.* | vụ ly hôn, sự chia tay hôn nhân | • **Cấu trúc:** `подать на развод`<br/>• **Ví dụ:** *По́сле разво́да они́ сохрани́ли уважи́тельные отноше́ния.* (Sau khi ly hôn họ vẫn giữ mối quan hệ tôn trọng nhau.) |\n| 9 | **восхища́ться** | *гл.* | ngưỡng mộ, khâm phục, say mê | • **Cấu trúc:** `восхищаться + кем/чем (Тв.п.)`<br/>• **Ví dụ:** *Весь мир восхища́ется тала́нтом э́того вели́кого пиани́ста.* (Cả thế giới ngưỡng mộ tài năng của nghệ sĩ piano vĩ đại này.) |\n| 10 | **разочарова́ться** | *гл.* | thất vọng (về ai/cái gì) | • **Cấu trúc:** `разочароваться + в ком/в чём (Пр.п.)`<br/>• **Ví dụ:** *Он разочарова́лся в свое́й профе́ссии и реши́л смени́ть рабо́ту.* (Anh ấy đã thất vọng về nghề nghiệp của mình và quyết định đổi việc.) |\n| 11 | **черта́** | *сущ.* | nét, nét tính cách; ranh giới | • **Cấu trúc:** `черта характера`<br/>• **Ví dụ:** *Трудолю́бие — э́то са́мая я́ркая черта́ его́ хара́ктера.* (Chăm chỉ là nét nổi bật nhất trong tính cách của anh ấy.) |\n| 12 | **трудолюби́вый** | *прил.* | chăm chỉ, cần cù, siêng năng lao động | • **Cấu trúc:** `трудолюбивый человек`<br/>• **Ví dụ:** *То́лько трудолюби́вый студе́нт смо́жет доби́ться высо́ких результа́тов.* (Chỉ người sinh viên chăm chỉ mới có thể đạt được những kết quả cao.) |\n| 13 | **общи́тельный** | *прил.* | cởi mở, chan hòa, dễ giao thiệp | • **Cấu trúc:** `общительный человек`<br/>• **Ví dụ:** *Анна о́чень общи́тельная, у неё мно́го друзе́й по всему́ ми́ру.* (Anna rất cởi mở giao tiếp, cô ấy có nhiều bạn bè trên khắp thế giới.) |\n| 14 | **за́мкнутый** | *прил.* | khép kín, nội tâm, ít giao tiếp | • **Cấu trúc:** `замкнутый образ жизни`<br/>• **Ví dụ:** *В де́тстве он был за́мкнутым ма́льчиком и бо́льше люби́л чита́ть кни́ги.* (Hồi nhỏ cậu ấy là một đứa trẻ sống khép kín và thích đọc sách hơn.) |\n| 15 | **целеустремлённый** | *прил.* | kiên định, có mục tiêu rõ ràng, quyết đoán | • **Cấu trúc:** `целеустремлённый человек`<br/>• **Ví dụ:** *Благодаря́ целеустремлённому хара́ктеру она́ поступи́ла в МГУ.* (Nhờ tính cách kiên định mục tiêu mà cô ấy đã thi đỗ vào MGU.) |\n| 16 | **самостоя́тельный** | *прил.* | tự lập, tự chủ, độc lập | • **Cấu trúc:** `самостоятельная жизнь`<br/>• **Ví dụ:** *Студе́нты должны́ уме́ть вести́ самостоя́тельную нау́чную рабо́ту.* (Sinh viên cần phải biết tự mình tiến hành nghiên cứu khoa học.) |\n| 17 | **уваже́ние** | *сущ.* | sự tôn trọng, lòng kính trọng | • **Cấu trúc:** `уважение + к кому/чему (Д.п.)`<br/>• **Ví dụ:** *Э́тот профе́ссор по́льзуется глубо́ким уваже́нием коллег.* (Vị giáo sư này nhận được sự kính trọng sâu sắc từ các đồng nghiệp.) |\n| 18 | **дове́рие** | *сущ.* | sự tin cậy, lòng tin tưởng | • **Cấu trúc:** `доверие + к кому (Д.п.)`<br/>• **Ví dụ:** *Взаи́мное дове́рие — осно́ва кре́пкой и счастли́вой семьи́.* (Sự tin cậy lẫn nhau là nền tảng của một gia đình bền vững và hạnh phúc.) |\n| 19 | **преодолева́ть** | *гл.* | vượt qua, khắc phục (khó khăn, trở ngại) | • **Cấu trúc:** `преодолевать + трудности / препятствия (В.п.)`<br/>• **Ví dụ:** *В жи́зни ну́жно учи́ться преодолева́ть любые тру́дности.* (Trong cuộc sống cần phải học cách vượt qua bất kỳ khó khăn nào.) |\n| 20 | **преодоле́ть** | *гл.* | vượt qua được, khắc phục xong | • **Cấu trúc:** `преодолеть + кризис / барьер (В.п.)`<br/>• **Ví dụ:** *Спортсме́н суме́л преодоле́ть страх и вы́играл золоту́ю меда́ль.* (Vận động viên đã vượt qua được nỗi sợ hãi và giành huy chương vàng.) |\n| 21 | **посту́пок** | *сущ.* | hành động, nghĩa cử, việc làm đạo đức | • **Cấu trúc:** `благородный поступок`<br/>• **Ví dụ:** *Он соверши́л благоро́дный посту́пок, помо́гший спасти́ жизнь челове́ку.* (Anh ấy đã làm một nghĩa cử cao đẹp giúp cứu sống tính mạng một con người.) |\n| 22 | **взаимопонима́ние** | *сущ.* | sự thấu hiểu lẫn nhau | • **Cấu trúc:** `достичь взаимопонимания`<br/>• **Ví dụ:** *В э́той семье́ всегда́ цари́ло глубо́кое взаимопонима́ние и уваже́ние.* (Trong gia đình này luôn tràn ngập sự thấu hiểu sâu sắc và lòng tôn trọng lẫn nhau.) |\n| 23 | **скро́мный** | *прил.* | khiêm tốn, nhã nhặn, giản dị | • **Cấu trúc:** `скромный человек`<br/>• **Ví dụ:** *Несмотря́ на мировую сла́ву, учёный остава́лся о́чень скро́мным челове́ком.* (Bất chấp danh tiếng toàn cầu, nhà khoa học vẫn là một con người rất mực khiêm tốn.) |\n| 24 | **достиже́ние** | *сущ.* | thành tựu, thành tích đạt được | • **Cấu trúc:** `достижения в науке`<br/>• **Ví dụ:** *Его́ нау́чные достиже́ния бы́ли отме́чены госуда́рственной пре́мией.* (Những thành tựu khoa học của ông đã được ghi nhận bằng giải thưởng nhà nước.) |\n| 25 | **пережива́ть** | *гл.* | trải qua (biến cố); lo lắng, trăn trở | • **Cấu trúc:** `переживать + за кого (В.п.)`<br/>• **Ví dụ:** *Мать о́чень пережива́ет за своего́ сы́на, уе́хавшего учи́ться за грани́цу.* (Người mẹ rất lo lắng cho cậu con trai đi du học ở nước ngoài.) |\n\n## III. Điểm Ngữ pháp Then chốt\n1. **Câu bị động với động từ có đuôi -ся (НСВ):** Dùng để diễn tả một hành động thường xuyên, quy luật hoặc đang tiếp diễn (*Романы создаются писателем в тишине*).\n2. **Cấu trúc hôn nhân cần phân biệt rạch ròi:**\n   - Nam lấy vợ: *жениться на ком (Пр.п.)*\n   - Nữ lấy chồng: *выйти замуж за кого (В.п.)*\n   - Hai người kết hôn: *пожениться (chỉ dùng số nhiều)*\n   - Ly hôn: *развестись с кем (Тв.п.)*\n\n## IV. Luyện tập với Lọ từ vựng RUSI\nHãy mở Lọ từ vựng tương ứng trên website RUSI để kích hoạt chu trình Spaced Repetition SM-2, giúp ghi nhớ vĩnh viễn các từ vựng này vào trí nhớ dài hạn!",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-14T12:15:22.119257+00:00"
  },
  {
    "id": "fefa4615-99e4-492d-92cc-899cc521d99e",
    "code": "lesson_vocab_b1_03",
    "jar_id": "a9521f2e-8d31-418c-be1e-32cc68422085",
    "title": "BÀI 03: TỪ VỰNG CHỦ ĐỀ KHOA HỌC, CÔNG NGHỆ & PHÁT MINH (НАУКА, ТЕХНОЛОГИИ И ОТКРЫТИЯ)",
    "level": "B1",
    "content_md": "# Bài học: Khoa học, Công nghệ & Phát minh (Наука, технологии и открытия)\n\n## I. Tầm vĩ đại của Khoa học Nga\nNước Nga đã cống hiến cho nhân loại những bộ óc thiên tài: D.I. Mendeleev với Bảng tuần hoàn các nguyên tố hóa học, A.S. Popov với máy thu phát vô tuyến, K.E. Tsiolkovsky và S.P. Korolev với ngành du hành vũ trụ.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **откры́тие** | *сущ.* | phát minh, khám phá, phát hiện khoa học | • **Cấu trúc:** `научное открытие`<br/>• **Ví dụ:** *Откры́тие Д.И. Менделе́ева соверши́ло настоя́щую револю́цию в хи́мии.* (Phát minh của D.I. Mendeleev đã tạo nên một cuộc cách mạng thực sự trong ngành hóa học.) |\n| 2 | **изобрете́ние** | *сущ.* | sáng chế, phát minh kỹ thuật | • **Cấu trúc:** `изобретение + чего (Р.п.)`<br/>• **Ví dụ:** *Изобрете́ние радиосвя́зи Попо́вым измени́ло спо́соб переда́чи информа́ции.* (Sáng chế truyền thông vô tuyến của Popov đã làm thay đổi cách thức truyền tải thông tin.) |\n| 3 | **изобрета́тель** | *сущ.* | nhà sáng chế, nhà phát minh | • **Cấu trúc:** `гениальный изобретатель`<br/>• **Ví dụ:** *Ру́сские изобрета́тели внесли́ огро́мный вклад в разви́тие мирово́й нау́ки.* (Các nhà sáng chế người Nga đã đóng góp to lớn vào sự phát triển của khoa học thế giới.) |\n| 4 | **иссле́дование** | *сущ.* | công trình nghiên cứu, sự khảo sát khoa học | • **Cấu trúc:** `научное исследование`<br/>• **Ví dụ:** *Учёные провели́ фундамента́льное иссле́дование в о́бласти я́дерной фи́зики.* (Các nhà khoa học đã tiến hành một công trình nghiên cứu cơ bản trong lĩnh vực vật lý hạt nhân.) |\n| 5 | **иссле́дователь** | *сущ.* | nhà nghiên cứu, nhà khảo sát | • **Cấu trúc:** `молодой исследователь`<br/>• **Ví dụ:** *Молодо́й иссле́дователь защити́л диссерта́цию по биоинжене́рии.* (Nhà nghiên cứu trẻ đã bảo vệ thành công luận án về kỹ thuật sinh học.) |\n| 6 | **иссле́довать** | *гл.* | nghiên cứu, khảo sát (lưỡng thể) | • **Cấu trúc:** `исследовать + что (В.п.)`<br/>• **Ví dụ:** *Лаборато́рия иссле́дует влия́ние но́вых лека́рств на челове́ческий органи́зм.* (Phòng thí nghiệm đang nghiên cứu tác động của các loại thuốc mới lên cơ thể con người.) |\n| 7 | **экспериме́нт** | *сущ.* | thí nghiệm, thực nghiệm | • **Cấu trúc:** `ставить / проводить эксперимент`<br/>• **Ví dụ:** *Фи́зики поста́вили сло́жный экспериме́нт на лаборато́рной устано́вке.* (Các nhà vật lý đã thực hiện một thí nghiệm phức tạp trên hệ thống phòng thí nghiệm.) |\n| 8 | **доказа́тельство** | *сущ.* | bằng chứng, luận cứ chứng minh | • **Cấu trúc:** `убедительное доказательство`<br/>• **Ví dụ:** *Учёный представи́л неопровержи́мые доказа́тельства свое́й тео́рии.* (Nhà khoa học đã trình bày những bằng chứng không thể bác bỏ cho lý thuyết của mình.) |\n| 9 | **соверши́ть** | *гл.* | thực hiện, làm nên (kỳ tích, phát minh, chuyến bay) | • **Cấu trúc:** `совершить + открытие / полёт / поступок (В.п.)`<br/>• **Ví dụ:** *Ю́рий Гага́рин соверши́л пе́рвый в исто́рии полёт в ко́смос.* (Yuri Gagarin đã thực hiện chuyến bay đầu tiên trong lịch sử vào vũ trụ.) |\n| 10 | **косми́ческий** | *прил.* | (thuộc) vũ trụ, không gian | • **Cấu trúc:** `космический корабль`<br/>• **Ví dụ:** *Росси́я запу́стила но́вый косми́ческий аппара́т на орби́ту Земли́.* (Nước Nga đã phóng một tàu vũ trụ mới lên quỹ đạo Trái Đất.) |\n| 11 | **учёный** | *сущ.* | nhà khoa học, học giả | • **Cấu trúc:** `великий учёный`<br/>• **Ví dụ:** *Росси́йские учёные внесли́ огро́мный вклад в мирово́е ракетострое́ние.* (Các nhà khoa học Nga đã đóng góp to lớn vào ngành chế tạo tên lửa thế giới.) |\n| 12 | **лаборато́рия** | *сущ.* | phòng thí nghiệm | • **Cấu trúc:** `научная лаборатория`<br/>• **Ví dụ:** *В лаборато́рии устано́влено са́мое совреме́нное опти́ческое обору́дование.* (Trong phòng thí nghiệm đã được trang bị thiết bị quang học hiện đại nhất.) |\n| 13 | **периоди́ческий** | *прил.* | tuần hoàn, định kỳ | • **Cấu trúc:** `Периодический закон Менделеева`<br/>• **Ví dụ:** *Периоди́ческий зако́н Менделе́ева объясни́л взаимосвя́зь всех элеме́нтов.* (Định luật tuần hoàn Mendeleev đã giải thích mối liên hệ qua lại giữa tất cả các nguyên tố.) |\n| 14 | **элеме́нт** | *сущ.* | nguyên tố hóa học; thành tố, yếu tố | • **Cấu trúc:** `химический элемент`<br/>• **Ví dụ:** *Но́вый хими́ческий элеме́нт был на́зван в честь вели́кого ру́сского фи́зика.* (Nguyên tố hóa học mới được đặt tên để vinh danh nhà vật lý vĩ đại người Nga.) |\n| 15 | **разви́тие** | *сущ.* | sự phát triển | • **Cấu trúc:** `развитие науки и техники`<br/>• **Ví dụ:** *Разви́тие информацио́нных техноло́гий открыва́ет но́вые горизо́нты для челове́чества.* (Sự phát triển của công nghệ thông tin mở ra những chân trời mới cho nhân loại.) |\n| 16 | **прогре́сс** | *сущ.* | sự tiến bộ, bước tiến nhảy vọt | • **Cấu trúc:** `научно-технический прогресс`<br/>• **Ví dụ:** *Нау́чно-техни́ческий прогре́сс кардина́льно меня́ет на́шу повседне́вную жизнь.* (Tiến bộ khoa học kỹ thuật làm thay đổi căn bản cuộc sống thường nhật của chúng ta.) |\n| 17 | **тео́рия** | *сущ.* | lý thuyết, học thuyết khoa học | • **Cấu trúc:** `научная теория`<br/>• **Ví dụ:** *Тео́рия была́ подтверждена́ практи́ческими опытами в лаборато́рии.* (Lý thuyết đã được xác nhận bằng các thí nghiệm thực tế trong phòng lab.) |\n| 18 | **гипо́теза** | *сущ.* | giả thuyết khoa học | • **Cấu trúc:** `выдвинуть гипотезу`<br/>• **Ví dụ:** *Молоды́е иссле́дователи вы́двинули сме́лую нау́чную гипо́тезу.* (Các nhà nghiên cứu trẻ đã đề xuất một giả thuyết khoa học táo bạo.) |\n| 19 | **аппара́т** | *сущ.* | thiết bị, máy móc, phi thuyền không gian | • **Cấu trúc:** `космический аппарат`<br/>• **Ví dụ:** *Косми́ческий аппара́т переда́л на Зе́млю це́нные сни́мки пове́рхности Марса.* (Tàu vũ trụ đã truyền về Trái Đất những bức ảnh giá trị về bề mặt Sao Hỏa.) |\n| 20 | **орби́та** | *сущ.* | quỹ đạo chuyển động | • **Cấu trúc:** `выйти на орбиту`<br/>• **Ví dụ:** *Спу́тник благополу́чно вы́шел на зада́нную околозе́мную орби́ту.* (Vệ tinh đã tiến vào quỹ đạo quanh Trái Đất theo đúng kế hoạch.) |\n| 21 | **за́пуск** | *сущ.* | sự phóng (tên lửa, vệ tinh), sự khởi động | • **Cấu trúc:** `запуск ракеты`<br/>• **Ví dụ:** *Весь мир следи́л за исто́рическим за́пуском пе́рвого иску́сственного спу́тника Зе́мли.* (Toàn thế giới đã theo dõi vụ phóng lịch sử vệ tinh nhân tạo đầu tiên của Trái Đất.) |\n| 22 | **техноло́гия** | *сущ.* | công nghệ, quy trình kỹ thuật | • **Cấu trúc:** `высокие технологии`<br/>• **Ví dụ:** *Внедре́ние передовы́х техноло́гий повыша́ет производи́тельность труда́.* (Việc áp dụng công nghệ tiên tiến nâng cao năng suất lao động.) |\n| 23 | **внедри́ть** | *гл.* | ứng dụng, đưa vào thực tế sản xuất | • **Cấu trúc:** `внедрить + новые технологии в производство (В.п.)`<br/>• **Ví dụ:** *Заво́д успе́шно внедри́л но́вую экологи́ческую техноло́гию очи́стки воды́.* (Nhà máy đã ứng dụng thành công công nghệ sinh thái mới xử lý nước.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-14T12:15:22.651036+00:00"
  },
  {
    "id": "b5f579b4-b41f-4de4-8649-f87146b166c5",
    "code": "lesson_vocab_b1_02",
    "jar_id": "70c94966-e62a-4467-a7ce-153b0aaad25c",
    "title": "BÀI 02: TỪ VỰNG CHỦ ĐỀ DIỆN MẠO, TRANG PHỤC & LỐI SỐNG (ВНЕШНОСТЬ, СТИЛЬ И БЫТ)",
    "level": "B1",
    "content_md": "# Bài học: Diện mạo, Trang phục & Lối sống (Внешность, стиль и быт)\n\n## I. Bối cảnh & Tình huống giao tiếp\nVăn hào A.P. Chekhov từng viết: *“В человеке всё должно быть прекрасно: и лицо, и одежда, и душа, и мысли”* (Ở con người mọi thứ đều phải đẹp: từ gương mặt, trang phục cho đến tâm hồn và ý nghĩ). Ở trình độ B1, bạn sẽ học cách diễn đạt sự thanh lịch, gu thẩm mỹ và ứng xử tự nhiên tại các dịch vụ công cộng ở Nga.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (24 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **вне́шность** | *сущ.* | ngoại hình, diện mạo bên ngoài | • **Cấu trúc:** `приятная внешность`<br/>• **Ví dụ:** *В челове́ке всё должно́ быть прекра́сно: и лицо́, и оде́жда, и душа́, и мы́сли.* (Ở con người mọi thứ đều phải đẹp: từ gương mặt, trang phục đến tâm hồn và ý nghĩ (A.P. Chekhov).) |\n| 2 | **фигу́ра** | *сущ.* | vóc dáng, thân hình; nhân vật | • **Cấu trúc:** `стройная фигура`<br/>• **Ví dụ:** *Она́ регуля́рно занима́ется спо́ртом, что́бы сохрани́ть хоро́шую фигу́ру.* (Cô ấy thường xuyên tập thể thao để giữ được vóc dáng thon gọn.) |\n| 3 | **похо́дка** | *сущ.* | dáng đi, bước đi | • **Cấu trúc:** `лёгкая походка`<br/>• **Ví dụ:** *Я узна́л своего́ ста́рого учи́теля издалека́ по его́ бы́строй похо́дке.* (Tôi đã nhận ra người thầy giáo cũ từ xa nhờ dáng đi nhanh nhẹn của thầy.) |\n| 4 | **элега́нтный** | *прил.* | thanh lịch, trang nhã, tao nhã | • **Cấu trúc:** `элегантный костюм`<br/>• **Ví dụ:** *На дипломати́ческий приём он наде́л элега́нтный тёмно-си́ний костю́м.* (Tới dự buổi chiêu đãi ngoại giao, ông ấy đã mặc bộ vest màu xanh thẫm thanh lịch.) |\n| 5 | **причёска** | *сущ.* | kiểu tóc, mái tóc làm kiểu | • **Cấu trúc:** `модная причёска`<br/>• **Ví dụ:** *Пе́ред пра́здничным ве́чером она́ пошла́ в сало́н сде́лать но́вую причёску.* (Trước đêm tiệc hội, cô ấy đã đến tiệm để làm một kiểu tóc mới.) |\n| 6 | **стри́жка** | *сущ.* | kiểu cắt tóc, sự cắt tóc | • **Cấu trúc:** `короткая стрижка`<br/>• **Ví dụ:** *Ма́стер предложи́л клие́нту совреме́нную коро́ткую стри́жку.* (Người thợ đã gợi ý cho khách hàng một kiểu cắt tóc ngắn hiện đại.) |\n| 7 | **парикма́херская** | *сущ.* | tiệm cắt tóc, hiệu làm đầu | • **Cấu trúc:** `пойти в парикмахерскую`<br/>• **Ví dụ:** *Я записа́лся в парикма́херскую на суббо́ту на де́сять утра́.* (Tôi đã đặt lịch ở tiệm cắt tóc vào sáng thứ bảy lúc 10 giờ.) |\n| 8 | **химчи́стка** | *сущ.* | tiệm giặt khô là hơi, sự giặt tẩy hóa chất | • **Cấu trúc:** `сдать костюм в химчистку`<br/>• **Ví dụ:** *По́сле дождя́ ма́льчик испа́чкал брю́ки и сдал их в сро́чную химчи́стку.* (Sau cơn mưa cậu bé làm bẩn quần và đã mang đến tiệm giặt hấp lấy ngay.) |\n| 9 | **га́лстук** | *сущ.* | cà vạt | • **Cấu trúc:** `завязать галстук`<br/>• **Ví dụ:** *Э́тот шёлковый га́лстук идеа́льно подхо́дит к ва́шему пиджаку́.* (Chiếc cà vạt lụa này rất hợp với chiếc áo vest của bạn.) |\n| 10 | **примеря́ть** | *гл.* | thử (quần áo, giày dép) | • **Cấu trúc:** `примерять + что (В.п.)`<br/>• **Ví dụ:** *Де́вушка до́лго примеря́ла ра́зные пла́тья пе́ред зеркалом.* (Cô gái thử đi thử lại nhiều chiếc váy khác nhau trước gương rất lâu.) |\n| 11 | **приме́рить** | *гл.* | thử xong (bộ đồ) | • **Cấu trúc:** `примерить + костюм (В.п.)`<br/>• **Ví dụ:** *Разреши́те приме́рить э́ти ту́фли три́дцать восьмо́го разме́ра.* (Cho phép tôi thử đôi giày cỡ 38 này với ạ.) |\n| 12 | **подходи́ть** | *гл.* | hợp, vừa vặn; tiến lại gần | • **Cấu trúc:** `подходить + к кому/чему (Д.п.)`<br/>• **Ví dụ:** *Цвет э́того шарфа́ прекра́сно подхо́дит к твои́м глаза́м.* (Màu chiếc khăn này rất hợp với đôi mắt của bạn.) |\n| 13 | **вы́глядеть** | *гл.* | trông như thế nào, có vẻ ngoài | • **Cấu trúc:** `выглядеть + как (великолепно, устало, молодо)`<br/>• **Ví dụ:** *Сего́дня вы вы́глядите про́сто потряса́юще!* (Hôm nay bạn trông thật sự rạng rỡ tuyệt vời!) |\n| 14 | **впечатле́ние** | *сущ.* | ấn tượng | • **Cấu trúc:** `произвести впечатление на кого (В.п.)`<br/>• **Ví dụ:** *Его́ глубо́кие зна́ния произвели́ си́льное впечатле́ние на всех прису́тствующих.* (Kiến thức sâu rộng của anh ấy đã để lại ấn tượng mạnh mẽ cho tất cả người có mặt.) |\n| 15 | **произвести́** | *гл.* | gây ra, tạo nên (ấn tượng); sản xuất | • **Cấu trúc:** `произвести + впечатление на кого (В.п.)`<br/>• **Ví dụ:** *Но́вый спекта́кль произвёл фуро́р и потряса́ющее впечатле́ние на зри́телей.* (Vở kịch mới đã tạo nên cơn sốt và gây ấn tượng sửng sốt cho khán giả.) |\n| 16 | **костю́м** | *сущ.* | bộ âu phục, comple, trang phục | • **Cấu trúc:** `деловой костюм`<br/>• **Ví dụ:** *На дипломати́ческую встре́чу он наде́л стро́гий делово́й костю́м.* (Đến cuộc gặp ngoại giao, ông ấy đã mặc bộ âu phục công sở trang trọng.) |\n| 17 | **сочета́ться** | *гл.* | kết hợp hài hòa, ăn khớp (màu sắc, phong cách) | • **Cấu trúc:** `сочетаться + с чем (Тв.п.)`<br/>• **Ví dụ:** *Цвет су́мки идеа́льно сочета́ется с ту́флями.* (Màu của chiếc túi xách kết hợp hoàn hảo với đôi giày.) |\n| 18 | **аксессуа́р** | *сущ.* | phụ kiện thời trang (khăn, thắt lưng, găng tay) | • **Cấu trúc:** `модные аксессуары`<br/>• **Ví dụ:** *Уда́чно подо́бранные аксессуа́ры подчёркивают индивидуа́льный стиль.* (Những phụ kiện được chọn lựa khéo léo làm tôn lên phong cách riêng biệt.) |\n| 19 | **мо́дный** | *прил.* | hợp thời trang, sành điệu, mốt | • **Cấu trúc:** `модная одежда`<br/>• **Ví dụ:** *В э́том сезо́не мо́дными счита́ются пасте́льные тона́.* (Trong mùa này các tông màu pastel được coi là thời thượng nhất.) |\n| 20 | **вкус** | *сущ.* | gu thẩm mỹ, thị hiếu; vị giác | • **Cấu trúc:** `одеваться со вкусом`<br/>• **Ví dụ:** *Она́ всегда́ одева́ется со вку́сом, да́же в са́мые обы́чные дни.* (Cô ấy luôn ăn mặc rất có gu thẩm mỹ, ngay cả trong những ngày bình thường nhất.) |\n| 21 | **опря́тный** | *прил.* | gọn gàng, chỉn chu, sạch sẽ | • **Cấu trúc:** `опрятный вид`<br/>• **Ví dụ:** *Студе́нт всегда́ име́л опря́тный вид: чи́стая руба́шка и аккура́тная стри́жка.* (Người sinh viên luôn có vẻ ngoài chỉn chu: áo sơ mi sạch sẽ và mái tóc cắt tỉa gọn gàng.) |\n| 22 | **привлека́тельный** | *прил.* | lôi cuốn, hấp dẫn, ưa nhìn | • **Cấu trúc:** `привлекательная внешность`<br/>• **Ví dụ:** *У молодо́го актёра о́чень привлека́тельная и запомина́ющаяся вне́шность.* (Người nam diễn viên trẻ có ngoại hình rất lôi cuốn và dễ nhớ.) |\n| 23 | **покра́сить** | *гл.* | nhuộm (tóc), sơn (tường) | • **Cấu trúc:** `покрасить волосы (В.п.)`<br/>• **Ví dụ:** *В парикма́херской де́вушка реши́ла покра́сить во́лосы в све́тлый цвет.* (Ở tiệm làm tóc cô gái quyết định nhuộm tóc sang màu sáng.) |\n| 24 | **ухо́женный** | *прил.* | được chăm chút, tươm tất, bóng bẩy | • **Cấu trúc:** `ухоженное лицо`<br/>• **Ví dụ:** *Ухо́женные ру́ки и краси́вая улы́бка создаю́t отли́чное пе́рвое впечатле́ние.* (Bàn tay được chăm sóc tươm tất và nụ cười đẹp tạo nên ấn tượng ban đầu tuyệt vời.) |\n\n## III. Mẹo Thực tế tại Nga\nKhi đến tiệm giặt khô (*химчистка*), bạn cần nói rõ loại vải và các vết bẩn đặc biệt (*пятно от кофе, грязь от дождя*). Luôn giữ lại phiếu biên nhận (*квитанция*) để nhận lại đồ đúng hạn.",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-16T16:05:15.513143+00:00"
  },
  {
    "id": "1ac417ff-112d-4a07-ac09-936c559d581b",
    "code": "lesson_vocab_b1_07",
    "jar_id": "167c4bfe-ae9b-4409-910f-84a9841848c2",
    "title": "BÀI 07: TỪ VỰNG CHỦ ĐỀ ĐỊA LÝ, THIÊN NHIÊN & NƯỚC NGA (ГЕОГРАФИЯ, ПРИРОДА И РОССИЯ)",
    "level": "B1",
    "content_md": "# Bài học: Địa lý, Thiên nhiên & Nước Nga (География, природа и Россия)\n\n## I. Đất nước Trải rộng 11 Múi giờ\nLiên bang Nga là quốc gia có diện tích lãnh thổ (*территория*) lớn nhất thế giới, chiếm 1/8 diện tích đất liền của Trái Đất. Dãy núi Ural là ranh giới tự nhiên phân chia châu Âu và châu Á.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **террито́рия** | *сущ.* | lãnh thổ, vùng đất | • **Cấu trúc:** `огромная территория`<br/>• **Ví dụ:** *Росси́йская Федера́ция занима́ет са́мую большу́ю террито́рию в ми́ре.* (Liên bang Nga chiếm diện tích lãnh thổ lớn nhất thế giới.) |\n| 2 | **грани́ца** | *сущ.* | biên giới, ranh giới | • **Cấu trúc:** `государственная граница`<br/>• **Ví dụ:** *Росси́я име́ет о́бщие грани́цы со мно́гими стра́нами Евро́пы и А́зии.* (Nước Nga có chung đường biên giới với nhiều quốc gia châu Âu và châu Á.) |\n| 3 | **грани́чить** | *гл.* | giáp ranh, tiếp giáp (với nước nào/cái gì) | • **Cấu trúc:** `граничить + с кем/чем (Тв.п.)`<br/>• **Ví dụ:** *На восто́ке Росси́я грани́чит по мо́рю с Япо́нией и США.* (Ở phía đông, nước Nga giáp ranh trên biển với Nhật Bản và Hoa Kỳ.) |\n| 4 | **ископа́емые** | *сущ.* | khoáng sản, tài nguyên dưới lòng đất | • **Cấu trúc:** `полезные ископаемые`<br/>• **Ví dụ:** *Не́дра Сиби́ри бога́ты поле́зными ископа́емыми: нефтью, га́зом и зо́лотом.* (Lòng đất Siberia trù phú các khoáng sản quý: dầu mỏ, khí đốt và vàng.) |\n| 5 | **добыва́ть** | *гл.* | khai thác (dầu mỏ, than, quặng); kiếm được | • **Cấu trúc:** `добывать + нефть / уголь (В.п.)`<br/>• **Ví dụ:** *В Се́верном Ледови́том океа́не начина́ют добыва́ть приро́дный газ.* (Tại Bắc Băng Dương người ta bắt đầu khai thác khí tự nhiên.) |\n| 6 | **суро́вый** | *прил.* | khắc nghiệt, giá buốt (khí hậu); nghiêm khắc | • **Cấu trúc:** `суровый климат`<br/>• **Ví dụ:** *В Сиби́ри и на Кра́йнем Се́вере о́чень суро́вый кли́мат с моро́зами до ми́нус пяти́десяти.* (Ở Siberia và miền Cực Bắc có khí hậu rất khắc nghiệt với những đợt rét tới âm 50 độ.) |\n| 7 | **населе́ние** | *сущ.* | dân cư, dân số | • **Cấu trúc:** `коренное население`<br/>• **Ví dụ:** *Населе́ние Росси́и составля́ет о́коло ста сорока́ шести́ миллио́нов челове́к.* (Dân số nước Nga đạt khoảng 146 triệu người.) |\n| 8 | **многонациона́льный** | *прил.* | đa dân tộc, nhiều sắc tộc | • **Cấu trúc:** `многонациональное государство`<br/>• **Ví dụ:** *Росси́я — э́то многонациона́льная страна́, где живу́т бо́лее ста де́вяноста наро́дов.* (Nga là một đất nước đa dân tộc, nơi sinh sống của hơn 190 sắc tộc.) |\n| 9 | **тайга́** | *сущ.* | rừng lá kim taiga | • **Cấu trúc:** `сибирская тайга`<br/>• **Ví dụ:** *Сиби́рская тайга́ занима́ет миллио́ны квадра́тных киломе́тров и явля́ется лёгкими плане́ты.* (Rừng lá kim taiga Siberia bao phủ hàng triệu km vuông và là lá phổi xanh của hành tinh.) |\n| 10 | **протя́гиваться** | *гл.* | trải dài, vươn dài (dãy núi, tuyến đường) | • **Cấu trúc:** `протягиваться + от чего (Р.п.) + до чего (Р.п.)`<br/>• **Ví dụ:** *Ура́льские го́ры протя́гиваются с се́вера на юг, разделя́я Евро́пу и А́зию.* (Dãy núi Ural trải dài từ bắc xuống nam, phân chia châu Âu và châu Á.) |\n| 11 | **равни́на** | *сущ.* | đồng bằng, bình nguyên | • **Cấu trúc:** `Восточно-Европейская равнина`<br/>• **Ví dụ:** *Восто́чно-Европе́йская равни́на — одна́ из крупне́йших равни́н на плане́те.* (Đồng bằng Đông Âu là một trong những bình nguyên rộng lớn nhất trên hành tinh.) |\n| 12 | **ту́ндра** | *сущ.* | lãnh nguyên (vùng đầm lầy rêu bắc cực) | • **Cấu trúc:** `северная тундра`<br/>• **Ví dụ:** *В ту́ндре расту́т то́лько мхи, лиша́йники и ка́рликовые берёзы.* (Tại vùng lãnh nguyên chỉ mọc rêu, địa y và những rặng bạch dương lùn.) |\n| 13 | **бога́тство** | *сущ.* | sự giàu có, tài nguyên phong phú | • **Cấu trúc:** `природные богатства`<br/>• **Ví dụ:** *Приро́дные бога́тства Сиби́ри слу́жат осно́вой росси́йской эконо́мики.* (Tài nguyên thiên nhiên trù phú của Siberia là nền tảng của nền kinh tế Nga.) |\n| 14 | **располо́жен** | *прил.* | tọa lạc, nằm ở vị trí | • **Cấu trúc:** `расположен + где (Пр.п.)`<br/>• **Ví dụ:** *Санкт-Петербу́рг располо́жен на побере́жье Финского зали́ва и острова́х де́льты Невы́.* (Sankt-Peterburg tọa lạc bên bờ vịnh Phần Lan và trên các đảo thuộc đồng bằng châu thổ sông Neva.) |\n| 15 | **кли́мат** | *сущ.* | khí hậu | • **Cấu trúc:** `континентальный климат`<br/>• **Ví dụ:** *Больша́я часть террито́рии Росси́и нахо́дится в зо́не уме́ренного кли́мата.* (Phần lớn lãnh thổ nước Nga nằm trong khu vực khí hậu ôn đới.) |\n| 16 | **уме́ренный** | *прил.* | ôn đới (khí hậu); điều độ, vừa phải | • **Cấu trúc:** `умеренный климат`<br/>• **Ví dụ:** *В уме́ренном климати́ческом по́ясе чётко выра́жены все четы́ре вре́мени го́да.* (Tại vành đai khí hậu ôn đới bốn mùa trong năm thể hiện rất rõ rệt.) |\n| 17 | **побере́жье** | *сущ.* | vùng duyên hải, bờ biển | • **Cấu trúc:** `морское побережье`<br/>• **Ví dụ:** *Куро́рты на побере́жье Чёрного мо́ря привлека́ют миллио́ны отдыха́ющих ка́ждое ле́то.* (Các khu nghỉ dưỡng ven bờ Biển Đen thu hút hàng triệu du khách mỗi mùa hè.) |\n| 18 | **месторожде́ние** | *сущ.* | mỏ khoáng sản, vỉa quặng | • **Cấu trúc:** `месторождение нефти и газа`<br/>• **Ví dụ:** *Гео́логи откры́ли крупне́йшее в ми́ре месторожде́ние приро́дного га́за на Яма́ле.* (Các nhà địa chất đã phát hiện ra mỏ khí tự nhiên lớn nhất thế giới trên bán đảo Yamal.) |\n| 19 | **о́зеро** | *сущ.* | hồ nước | • **Cấu trúc:** `озеро Байкал`<br/>• **Ví dụ:** *Байка́л — са́мое глубо́кое и древнейшее о́зеро в ми́ре с чисте́йшей пре́сной водо́й.* (Baikal là hồ nước sâu nhất và cổ xưa nhất trên thế giới với nguồn nước ngọt tinh khiết.) |\n| 20 | **эколо́гия** | *сущ.* | môi trường sinh thái, sinh thái học | • **Cấu trúc:** `защита экологии`<br/>• **Ví dụ:** *Сохране́ние уника́льной эколо́гии озера Байкал — первостепе́нная зада́ча госуда́рства.* (Bảo tồn hệ sinh thái độc nhất của hồ Baikal là nhiệm vụ hàng đầu của nhà nước.) |\n| 21 | **запове́дник** | *сущ.* | khu bảo tồn thiên nhiên quốc gia | • **Cấu trúc:** `природный заповедник`<br/>• **Ví dụ:** *В Баргузи́нском запове́днике охраня́ют ре́дких живо́тных, включённых в Кра́сную кни́гу.* (Tại khu bảo tồn thiên nhiên Barguzinsky người ta bảo vệ các loài động vật quý hiếm có tên trong Sách Đỏ.) |\n| 22 | **контине́нт** | *сущ.* | châu lục, đại lục | • **Cấu trúc:** `Евразийский континент`<br/>• **Ví dụ:** *Росси́я располо́жена на еди́ном контине́нте Евра́зия, охва́тывая Евро́пу и А́зию.* (Nước Nga nằm trên đại lục Á-Âu thống nhất, trải rộng cả châu Âu và châu Á.) |\n| 23 | **бассе́йн** | *сущ.* | lưu vực (sông); bể bơi | • **Cấu trúc:** `бассейн Волги`<br/>• **Ví dụ:** *Бассе́йн реки́ Во́лги охва́тывает огро́мную пло́щадь европе́йской части Росси́и.* (Lưu vực sông Volga bao phủ một diện tích khổng lồ thuộc phần châu Âu của Nga.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-14T12:15:23.490563+00:00"
  },
  {
    "id": "470ef01d-e8af-416a-90f1-0f893180df3c",
    "code": "lesson_vocab_b1_09",
    "jar_id": "447ba594-c169-466d-baa2-3a1f347b8393",
    "title": "BÀI 09: TỪ VỰNG CHỦ ĐỀ DU LỊCH, GIAO THÔNG & THÁM HIỂM (ПУТЕШЕСТВИЯ, ТРАНСПОРТ И ЭКСПЕДИЦИИ)",
    "level": "B1",
    "content_md": "# Bài học: Du lịch, Giao thông & Thám hiểm (Путешествия, транспорт и экспедиции)\n\n## I. Những Cung đường Bất tận\nTuyến đường sắt xuyên Siberia (*Транссибирская магистраль*) dài hơn 9.288 km nối liền Moskva với Vladivostok bên bờ Thái Bình Dương là tuyến đường sắt dài nhất hành tinh.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **путеше́ствие** | *сущ.* | chuyến du lịch, cuộc hành trình đường dài | • **Cấu trúc:** `отправиться в путешествие`<br/>• **Ví dụ:** *Путеше́ствие на по́езде по Транссиби́рской магистра́ли занима́ет це́лую неде́лю.* (Chuyến hành trình bằng tàu hỏa trên tuyến đường sắt xuyên Siberia kéo dài nguyên cả một tuần.) |\n| 2 | **маршру́т** | *сущ.* | lộ trình, tuyến đường hành trình | • **Cấu trúc:** `туристический маршрут`<br/>• **Ví dụ:** *Мы зара́нее разрабо́тали подро́бный маршру́т на́шей экспеди́ции на Алта́й.* (Chúng tôi đã lập trước một lộ trình chi tiết cho chuyến thám hiểm tới vùng Altai.) |\n| 3 | **экспеди́ция** | *сущ.* | đoàn thám hiểm, chuyến khảo sát dã ngoại | • **Cấu trúc:** `научная экспедиция`<br/>• **Ví dụ:** *Геологи́ческая экспеди́ция обнару́жила но́вые месторожде́ния руды́ на се́вере.* (Đoàn thám hiểm địa chất đã phát hiện ra các mỏ quặng mới ở miền bắc.) |\n| 4 | **первооткрыва́тель** | *сущ.* | người đầu tiên khám phá, người tiền phong mở đường | • **Cấu trúc:** `первооткрыватель новых земель`<br/>• **Ví dụ:** *Ру́сские морепла́ватели Бе́ринг и Чи́риков бы́ли первооткрыва́телями Аля́ски.* (Các nhà hàng hải người Nga Bering và Chirikov là những người đầu tiên khám phá ra vùng Alaska.) |\n| 5 | **испыта́ние** | *сущ.* | thử thách, phép thử; cuộc thử nghiệm kỹ thuật | • **Cấu trúc:** `тяжёлое испытание`<br/>• **Ví dụ:** *Да́льняя доро́га в тайге́ ста́ла настоя́щим испыта́нием для молоды́х гео́логов.* (Chặng đường dài giữa rừng taiga đã trở thành thử thách thực sự đối với các nhà địa chất trẻ.) |\n| 6 | **магистра́ль** | *сущ.* | tuyến đường trục huyết mạch (đường sắt, xa lộ) | • **Cấu trúc:** `железнодорожная магистраль`<br/>• **Ví dụ:** *Транссиби́рская магистра́ль соединя́ет европе́йскую часть Росси́и с Да́льним Восто́ком.* (Tuyến đường sắt xuyên Siberia kết nối phần châu Âu của Nga với vùng Viễn Đông.) |\n| 7 | **проводни́к** | *сущ.* | nhân viên phục vụ toa tàu; người dẫn đường | • **Cấu trúc:** `проводник вагона`<br/>• **Ví dụ:** *Проводни́к прове́рил на́ши биле́ты и принёс горя́чий чай в подстака́нниках.* (Nhân viên phục vụ toa đã kiểm tra vé của chúng tôi và mang tới trà nóng trong giá đỡ cốc.) |\n| 8 | **приключе́ние** | *сущ.* | cuộc phiêu lưu, chuyến mạo hiểm | • **Cấu trúc:** `опасное приключение`<br/>• **Ví dụ:** *Пое́здка в го́ры Алта́я преврати́лась в настоя́щее незабыва́емое приключе́ние.* (Chuyến đi tới vùng núi Altai đã biến thành một cuộc phiêu lưu thực sự không thể nào quên.) |\n| 9 | **препя́тствие** | *сущ.* | chướng ngại vật, vật cản đường | • **Cấu trúc:** `преодолеть препятствие`<br/>• **Ví dụ:** *Никаки́е приро́дные препя́тствия не остана́вливали отва́жных гео́логов.* (Không một chướng ngại vật thiên nhiên nào có thể ngăn cản những nhà địa chất quả cảm.) |\n| 10 | **купе́** | *сущ.* | khoang tàu hỏa 4 giường có cửa đóng kín | • **Cấu trúc:** `билет в купе`<br/>• **Ví dụ:** *Мы купи́ли биле́ты в четырёхме́стное купе́ ско́рого по́езда.* (Chúng tôi đã mua vé vào khoang 4 giường của chuyến tàu hỏa tốc hành.) |\n| 11 | **плацка́рт** | *сущ.* | toa giường nằm thông suốt không vách ngăn | • **Cấu trúc:** `плацкартный вагон`<br/>• **Ví dụ:** *Студе́нты предпочли́ е́хать плацка́ртом, чтоб сэконо́мить де́ньги.* (Các sinh viên thích đi toa nằm thông khoang để tiết kiệm chi phí.) |\n| 12 | **ваго́н** | *сущ.* | toa tàu, toa xe lửa | • **Cấu trúc:** `вагон-ресторан`<br/>• **Ví dụ:** *Пассажи́ры зашли́ в ваго́н и за́няли свои́ места́ сообра́зно биле́там.* (Hành khách bước vào toa tàu và ổn định chỗ ngồi theo đúng vé.) |\n| 13 | **пассажи́р** | *сущ.* | hành khách đi tàu xe, máy bay | • **Cấu trúc:** `поезд с пассажирами`<br/>• **Ví dụ:** *Проводни́к ве́жливо попроси́л пассажи́ров предъяви́ть паспорта́ и биле́ты.* (Nhân viên phục vụ toa đã lịch sự đề nghị hành khách xuất trình hộ chiếu và vé.) |\n| 14 | **переса́дка** | *сущ.* | sự chuyển tàu xe, đổi chuyến bay | • **Cấu trúc:** `ехать с пересадкой`<br/>• **Ví dụ:** *Мы лете́ли во Владивосто́к с переса́дкой в Новосиби́рске.* (Chúng tôi bay tới Vladivostok với điểm quá cảnh đổi chuyến ở Novosibirsk.) |\n| 15 | **командиро́вка** | *сущ.* | chuyến đi công tác | • **Cấu trúc:** `поехать в командировку`<br/>• **Ví dụ:** *Инжене́р уе́хал в сро́чную командиро́вку на сиби́рский газопрово́д.* (Người kỹ sư đã đi công tác khẩn cấp tới tuyến đường ống dẫn khí đốt Siberia.) |\n| 16 | **ка́сса** | *сущ.* | quầy bán vé, quầy thu ngân | • **Cấu trúc:** `железнодорожная касса`<br/>• **Ví dụ:** *О́коло биле́тных касс вокза́ла со́бралась небольша́я о́чередь.* (Cạnh các quầy bán vé của nhà ga có một hàng người xếp hàng nhỏ.) |\n| 17 | **расписа́ние** | *сущ.* | lịch trình giờ chạy tàu, thời khóa biểu | • **Cấu trúc:** `расписание поездов`<br/>• **Ví dụ:** *По́езд прибы́л на гла́вный вокза́л то́чно по расписа́нию, мину́та в мину́ту.* (Đoàn tàu đã cập bến ga chính hoàn toàn đúng giờ theo lịch trình, từng phút một.) |\n| 18 | **отправле́ние** | *сущ.* | sự khởi hành, xuất phát của tàu xe | • **Cấu trúc:** `время отправления`<br/>• **Ví dụ:** *До отправле́ния ско́рого по́езда остава́лось всего́ де́сять мину́т.* (Cho đến lúc đoàn tàu tốc hành khởi hành chỉ còn lại đúng 10 phút.) |\n| 19 | **прибы́тие** | *сущ.* | sự đến nơi, cập bến của tàu xe | • **Cấu trúc:** `время прибытия`<br/>• **Ví dụ:** *Ди́ктор объя́вит о прибы́тии по́езда за пятна́дцать мину́т.* (Phát thanh viên sẽ thông báo về việc tàu đến nơi trước 15 phút.) |\n| 20 | **бага́ж** | *сущ.* | hành lý xách tay và ký gửi | • **Cấu trúc:** `сдать вещи в багаж`<br/>• **Ví dụ:** *Пассажи́ры сдали тяжёлые чемода́ны в бага́жное отделе́ние вокза́ла.* (Hành khách đã gửi những chiếc vali nặng vào bộ phận ký gửi hành lý của nhà ga.) |\n| 21 | **чемода́н** | *сущ.* | va li du lịch | • **Cấu trúc:** `собрать чемодан`<br/>• **Ví dụ:** *Ве́чером пе́ред отъе́здом она́ бы́стро собрала́ чемода́н со все́ми необходи́мыми веща́ми.* (Tối trước ngày lên đường cô ấy đã nhanh chóng xếp đồ vào vali với đầy đủ tư trang cần thiết.) |\n| 22 | **путеводи́тель** | *сущ.* | sách hướng dẫn du lịch, cẩm nang du hành | • **Cấu trúc:** `путеводитель по Москве`<br/>• **Ví dụ:** *Э́тот иллюстри́рованный путеводи́тель помо́г нам найти́ са́мые интере́сные музе́и.* (Cuốn sách hướng dẫn du lịch có hình ảnh này đã giúp chúng tôi tìm ra những bảo tàng thú vị nhất.) |\n| 23 | **ночле́г** | *сущ.* | chỗ ngủ qua đêm, chỗ trú đêm dọc đường | • **Cấu trúc:** `остановиться на ночлег`<br/>• **Ví dụ:** *Уста́лые пу́тники останови́лись на ночле́г в дереве́нской гости́нице.* (Những người lữ hành mệt mỏi đã dừng chân nghỉ qua đêm tại một khách sạn làng quê.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-14T12:15:23.902139+00:00"
  },
  {
    "id": "87c732da-d4d7-4152-a926-af4c613c8057",
    "code": "lesson_vocab_b1_05",
    "jar_id": "f5534be0-87c9-4a80-b372-916794b64b97",
    "title": "BÀI 05: TỪ VỰNG CHỦ ĐỀ ĐỜI SỐNG ĐÔ THỊ & THỦ ĐÔ MOSKVA (ГОРОДСКАЯ ЖИЗНЬ И МОСКВА)",
    "level": "B1",
    "content_md": "# Bài học: Đời sống Đô thị & Thủ đô Moskva (Городская жизнь и Москва)\n\n## I. Nhịp đập Trái tim Nước Nga\nThủ đô Moskva là một trong những thành phố lớn nhất châu Âu với hơn 12 triệu dân. Đây là nơi hội tụ giữa nhịp sống hối hả (*суета*) của trung tâm tài chính và sự tĩnh lặng cổ kính tại các con phố đi bộ (*пешеходные зоны*) như Arbat hay Zamoskvorechye.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **мегапо́лис** | *сущ.* | đại đô thị, siêu đô thị | • **Cấu trúc:** `современный мегаполис`<br/>• **Ví dụ:** *Москва́ — э́то огро́мный мегапо́лис с населе́нием бо́лее двена́дцати миллио́нов челове́к.* (Moskva là một siêu đô thị khổng lồ với dân số hơn 12 triệu người.) |\n| 2 | **достопримеча́тельность** | *сущ.* | danh lam thắng cảnh, di tích đáng chú ý | • **Cấu trúc:** `главные достопримечательности`<br/>• **Ví dụ:** *Тури́сты провели́ це́лый день, осма́тривая исто́рические достопримеча́тельности столи́цы.* (Các du khách đã dành trọn một ngày để chiêm ngưỡng các thắng cảnh lịch sử của thủ đô.) |\n| 3 | **на́бережная** | *сущ.* | bờ kè, đường ven sông | • **Cấu trúc:** `гулять по набережной`<br/>• **Ví dụ:** *Ве́чером прия́тно гуля́ть по Кремлёвской на́бережной вдоль реки́ Москвы́.* (Vào buổi tối thật dễ chịu khi dạo bước trên bờ kè Kremlyovskaya dọc sông Moskva.) |\n| 4 | **небоскрёб** | *сущ.* | tòa nhà chọc trời | • **Cấu trúc:** `стеклянный небоскрёб`<br/>• **Ví dụ:** *Делово́й центр “Москва́-Си́ти” сла́вится свои́ми сверхвысо́кими небоскрёбами.* (Trung tâm thương mại Moskva-City nổi tiếng với các tòa nhà chọc trời siêu cao.) |\n| 5 | **сноси́ть** | *гл.* | phá dỡ, giật sập (công trình xây dựng) | • **Cấu trúc:** `сносить + старые дома (В.п.)`<br/>• **Ví dụ:** *В э́том райо́не сно́сят ста́рые пятиэта́жки и стро́ят совреме́нные жилы́е ко́мплексы.* (Ở khu vực này người ta đang phá dỡ các dãy nhà 5 tầng cũ để xây các khu chung cư hiện đại.) |\n| 6 | **восстана́вливать** | *гл.* | phục hồi, khôi phục, tái thiết | • **Cấu trúc:** `восстанавливать + памятник / здание (В.п.)`<br/>• **Ví dụ:** *Архите́кторы восстана́вливают разру́шенные истори́ческие фаса́ды у́лицы.* (Các kiến trúc sư đang phục hồi các mặt tiền lịch sử bị hư hại của con phố.) |\n| 7 | **восстанови́ть** | *гл.* | khôi phục xong, phục dựng thành công | • **Cấu trúc:** `восстановить + храм / справедливость (В.п.)`<br/>• **Ví dụ:** *Храм Христа́ Спаси́теля был по́лностью восстано́влен в конце́ двадца́того ве́ка.* (Nhà thờ Chúa Cứu Thế đã được phục dựng lại hoàn toàn vào cuối thế kỷ 20.) |\n| 8 | **реставри́ровать** | *гл.* | trùng tu, tôn tạo di tích nghệ thuật | • **Cấu trúc:** `реставрировать + картины / соборы (В.п.)`<br/>• **Ví dụ:** *Мастера́ о́чень бере́жно реставри́руют дре́вние ико́ны и фре́ски.* (Các nghệ nhân đang rất cẩn trọng trùng tu các bức tượng thánh và tranh tường cổ xưa.) |\n| 9 | **суета́** | *сущ.* | sự hối hả, nhộn nhịp ồn ào của phố thị | • **Cấu trúc:** `городская суета`<br/>• **Ví dụ:** *На выходны́е дни мно́гие москвичи́ уезжа́ют на да́чу от городско́й суеты́.* (Vào những ngày cuối tuần, nhiều người Moskva về nhà nghỉ ngoại ô để trốn khỏi cảnh hối hả của thành phố.) |\n| 10 | **пешехо́дный** | *прил.* | (dành cho) người đi bộ | • **Cấu trúc:** `пешеходная улица`<br/>• **Ví dụ:** *Ста́рый Арба́т — са́мая популя́рная пешехо́дная у́лица в це́нтре Москвы́.* (Phố cổ Arbat là con phố đi bộ nổi tiếng nhất ở trung tâm Moskva.) |\n| 11 | **проспе́кт** | *сущ.* | đại lộ rộng lớn | • **Cấu trúc:** `Ленинский проспект`<br/>• **Ví dụ:** *Ле́нинский проспе́кт — одна́ из са́мых широ́ких и дли́нных магистpáлей Москвы́.* (Đại lộ Leninsky là một trong những tuyến đường rộng và dài nhất của Moskva.) |\n| 12 | **переу́лок** | *сущ.* | ngõ, phố nhỏ, ngách | • **Cấu trúc:** `старомосковский переулок`<br/>• **Ví dụ:** *В ти́хих переу́лках Арба́та сохрани́лась атмосфе́ра ста́рой купе́ческой Москвы́.* (Trong những con ngõ tĩnh lặng của khu phố Arbat vẫn lưu giữ bầu không khí của Moskva cổ kính.) |\n| 13 | **пло́щадь** | *сущ.* | quảng trường; diện tích | • **Cấu trúc:** `Красная площадь`<br/>• **Ví dụ:** *Кра́сная пло́щадь — гла́вное истори́ческое се́рдце столи́цы Росси́и.* (Quảng trường Đỏ là trái tim lịch sử chủ đạo của thủ đô nước Nga.) |\n| 14 | **архитекту́рный** | *прил.* | (thuộc) kiến trúc | • **Cấu trúc:** `архитектурный ансамбль`<br/>• **Ví dụ:** *Архитекту́рный анса́мбль Кремля́ нахо́дится под охра́ной ЮНЕСКО.* (Quần thể kiến trúc Kremlin nằm dưới sự bảo tồn của UNESCO.) |\n| 15 | **реконстру́кция** | *сущ.* | sự tái thiết, sự cải tạo quy hoạch | • **Cấu trúc:** `реконструкция улицы`<br/>• **Ví dụ:** *Истори́ческий центр го́рода закры́ли на масшта́бную реконстру́кцию.* (Trung tâm lịch sử của thành phố đã được đóng cửa để tái thiết quy mô lớn.) |\n| 16 | **па́мятник** | *сущ.* | tượng đài, đài kỷ niệm, di tích | • **Cấu trúc:** `памятник + кому (Д.п.)`<br/>• **Ví dụ:** *Москвичи́ ча́сто назнача́ют свида́ния у па́мятника Пу́шкину на Тверско́й.* (Người Moskva thường hẹn gặp nhau dưới chân tượng đài Pushkin trên phố Tverskaya.) |\n| 17 | **экскурсова́д** | *сущ.* | hướng dẫn viên du lịch | • **Cấu trúc:** `опытный экскурсовод`<br/>• **Ví dụ:** *Экскурсова́д увлечённо расска́зывал об исто́рии строи́тельства моско́вского метро́.* (Hướng dẫn viên say sưa kể về lịch sử xây dựng tuyến tàu điện ngầm Moskva.) |\n| 18 | **стари́нный** | *прил.* | cổ kính, lâu đời | • **Cấu trúc:** `старинный город`<br/>• **Ví dụ:** *В э́том стари́нном росси́йском го́роде сохрани́лись деревя́нные купе́ческие дома́.* (Tại thành phố cổ kính nước Nga này vẫn bảo tồn được những ngôi nhà gỗ của giới thương gia.) |\n| 19 | **фаса́д** | *сущ.* | mặt tiền của tòa nhà | • **Cấu trúc:** `фасад здания`<br/>• **Ví dụ:** *Фаса́д Большо́го теа́тра укра́шен знамени́той скульпту́рной квадри́гой Аполло́на.* (Mặt tiền của Nhà hát Lớn Bolshoi được trang trí bằng cỗ xe tứ mã nổi tiếng của thần Apollo.) |\n| 20 | **метрополите́н** | *сущ.* | hệ thống đường sắt đô thị ngầm, tàu điện ngầm metro | • **Cấu trúc:** `Московский метрополитен`<br/>• **Ví dụ:** *Моско́вский метрополите́н перево́зит бо́лее девяти́ миллио́нов пассажи́ров в день.* (Hệ thống tàu điện ngầm Moskva vận chuyển hơn 9 triệu lượt hành khách mỗi ngày.) |\n| 21 | **ко́мплекс** | *сущ.* | quần thể, khu liên hợp | • **Cấu trúc:** `жилой комплекс`<br/>• **Ví dụ:** *В но́вом жило́м ко́мплексе постро́ены совреме́нная шко́ла и спорти́вный центр.* (Trong khu phức hợp nhà ở mới đã xây dựng trường học hiện đại và trung tâm thể thao.) |\n| 22 | **окра́ина** | *сущ.* | vùng ven ô, vùng ngoại vi thành phố | • **Cấu trúc:** `жить на окраине города`<br/>• **Ví dụ:** *Цены́ на кварти́ры на окра́ине столи́цы значи́тельно ни́же, чем в це́нтре.* (Giá căn hộ ở vùng ngoại vi thủ đô thấp hơn đáng kể so với ở khu vực trung tâm.) |\n| 23 | **про́бка** | *сущ.* | sự tắc đường, ùn tắc giao thông; nút chai | • **Cấu trúc:** `стоять в пробке`<br/>• **Ví dụ:** *В час пик в Москве́ мо́жно простоя́ть в доро́жной про́бке бо́льше часа.* (Vào giờ cao điểm ở Moskva người ta có thể chôn chân trong vụ tắc đường hơn một tiếng đồng hồ.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-16T16:05:15.518987+00:00"
  },
  {
    "id": "d686ac56-25d3-406c-8254-07bf82e1fb64",
    "code": "lesson_vocab_b1_06",
    "jar_id": "dd31caea-d296-40ae-9e3e-f5c8071fd330",
    "title": "BÀI 06: TỪ VỰNG CHỦ ĐỀ KIẾN TRÚC, LỊCH SỬ & TÔN GIÁO (АРХИТЕКТУРА, ИСТОРИЯ И ХРАМЫ)",
    "level": "B1",
    "content_md": "# Bài học: Kiến trúc, Lịch sử & Tôn giáo (Архитектура, история и храмы)\n\n## I. Biểu tượng Linh hồn Văn hóa Nga\nBài ca dao Moskva có câu: *“Москва — звонят колокола! Москва — златые купола!”* (Moskva chuông ngân vang, Moskva mái vòm dát vàng). Kiến trúc Chính thống giáo là linh hồn của lịch sử nước Nga.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **ко́локол** | *сущ.* | chuông (nhà thờ) | • **Cấu trúc:** `звонить в колокола`<br/>• **Ví dụ:** *Над дре́вним Кремлём торже́ственно звоня́т церко́вные колокола́.* (Trên điện Kremlin cổ kính vang lên trang nghiêm tiếng chuông nhà thờ.) |\n| 2 | **колоко́льня** | *сущ.* | tháp chuông | • **Cấu trúc:** `колокольня Ивана Великого`<br/>• **Ví dụ:** *С колоко́льни Ива́на Вели́кого открыва́ется великоле́пный вид на Кремль.* (Từ tháp chuông Ivan Đại đế mở ra tầm nhìn tuyệt đẹp bao quát toàn bộ Kremlin.) |\n| 3 | **ку́пол** | *сущ.* | mái vòm (nhà thờ, công trình) | • **Cấu trúc:** `золотые купола`<br/>• **Ví dụ:** *В со́лнечный день золоты́е купола́ моско́вских церкве́й сия́ют о́чень я́рко.* (Vào ngày nắng ráo những mái vòm dát vàng của các giáo đường Moskva tỏa sáng rực rỡ.) |\n| 4 | **собо́р** | *сущ.* | nhà thờ chính tòa, đại giáo đường | • **Cấu trúc:** `Успенский собор`<br/>• **Ví dụ:** *Собо́р Васи́лия Блаже́нного на Кра́сной пло́щади явля́ется си́мволом Росси́и.* (Đại thánh đường Vasily Blazhenny trên Quảng trường Đỏ là biểu tượng tiêu biểu của nước Nga.) |\n| 5 | **монасты́рь** | *сущ.* | tu viện | • **Cấu trúc:** `мужской / женский монастырь`<br/>• **Ví dụ:** *Новоде́вичий монасты́рь включён в спи́сок Всеми́рного насле́дия ЮНЕСКО.* (Tu viện Novodevichy đã được ghi danh vào danh sách Di sản Thế giới của UNESCO.) |\n| 6 | **зо́дчество** | *сущ.* | nghệ thuật kiến trúc cổ truyền | • **Cấu trúc:** `древнерусское зодчество`<br/>• **Ví dụ:** *Ки́жи — уника́льный музе́й деревя́нного зо́дчества под откры́тым не́бом.* (Kizhi là bảo tàng nghệ thuật kiến trúc gỗ ngoài trời độc nhất vô nhị.) |\n| 7 | **шеде́вр** | *сущ.* | kiệt tác, tác phẩm mẫu mực | • **Cấu trúc:** `шедевр архитектуры / живописи`<br/>• **Ví dụ:** *Ико́на “Тро́ица” Андре́я Рублёва признана́ шеде́вром мирово́го иску́сства.* (Bức tượng thánh 'Ba ngôi' của Andrei Rublev được công nhận là một kiệt tác của nghệ thuật thế giới.) |\n| 8 | **эпо́ха** | *сущ.* | thời đại, kỷ nguyên | • **Cấu trúc:** `эпоха Петра Первого`<br/>• **Ví dụ:** *Э́тот собо́р был постро́ен в эпо́ху вели́кого кня́зя Ива́на Тре́тьего.* (Đại giáo đường này được xây cất vào thời đại của đại công tước Ivan Đệ Tam.) |\n| 9 | **духо́вный** | *прил.* | (thuộc) tâm linh, tinh thần, giáo hội | • **Cấu trúc:** `духовная культура`<br/>• **Ví dụ:** *Правосла́вие оказа́ло глубо́кое влия́ние на духо́вную жизнь ру́сского наро́да.* (Chính thống giáo đã tạo ảnh hưởng sâu sắc đến đời sống tinh thần của nhân dân Nga.) |\n| 10 | **ико́на** | *сущ.* | bức tranh thánh, tượng thánh Chính thống giáo | • **Cấu trúc:** `писать икону`<br/>• **Ví dụ:** *Дре́вние ико́ны в Росси́и традицио́нно писа́ли на де́реве натура́льными кра́сками.* (Các bức tranh thánh cổ xưa ở Nga theo truyền thống được vẽ trên gỗ bằng màu tự nhiên.) |\n| 11 | **храм** | *сущ.* | ngôi đền, thánh đường | • **Cấu trúc:** `Храм Христа Спасителя`<br/>• **Ví dụ:** *Храм Христа́ Спаси́теля — гла́вный кафедра́льный собо́р Ру́сской правосла́вной це́ркви.* (Thánh đường Chúa Cứu Thế là nhà thờ chính tòa của Giáo hội Chính thống giáo Nga.) |\n| 12 | **святы́ня** | *сущ.* | chốn linh thiêng, thánh tích tôn giáo | • **Cấu trúc:** `национальная святыня`<br/>• **Ví dụ:** *Дре́вние мона́стыри явля́ются велича́йшими святы́нями правосла́вного ми́ра.* (Các tu viện cổ kính là những thánh tích vĩ đại nhất của thế giới Chính thống giáo.) |\n| 13 | **фре́ска** | *сущ.* | tranh bích họa trên tường vôi ướt | • **Cấu trúc:** `древние фрески`<br/>• **Ví dụ:** *Сте́ны собо́ра укра́шены уника́льными фре́сками вели́кого иконопи́сца Диони́сия.* (Tường của giáo đường được trang trí bằng những bức bích họa độc nhất vô nhị của danh họa Dionisius.) |\n| 14 | **ро́спись** | *сущ.* | nghệ thuật trang trí hội họa đền đài; hoa văn trang trí | • **Cấu trúc:** `настенная роспись`<br/>• **Ví dụ:** *Насте́нная ро́спись собо́ра поража́ет я́ркостью кра́сок и гармо́нией.* (Nghệ thuật tranh tường của thánh đường gây kinh ngạc bởi độ rực rỡ và hài hòa của sắc màu.) |\n| 15 | **звон** | *сущ.* | tiếng chuông ngân vang, tiếng kêu leng keng | • **Cấu trúc:** `колокольный звон`<br/>• **Ví dụ:** *У́тром над го́родом плывёт мелоди́чный колоко́льный звон.* (Buổi sáng sớm trên khắp thành phố ngân nga tiếng chuông nhà thờ du dương.) |\n| 16 | **правосла́вие** | *сущ.* | Chính thống giáo (nhánh Kitô giáo phương Đông) | • **Cấu trúc:** `принять православие`<br/>• **Ví dụ:** *В 988 году́ князь Влади́мир крести́л Русь, положи́в нача́ло правосла́вию.* (Năm 988, Đại công tước Vladimir đã làm phép rửa cho nước Nga, khởi đầu cho Chính thống giáo.) |\n| 17 | **рели́гия** | *сущ.* | tôn giáo | • **Cấu trúc:** `мировые религии`<br/>• **Ví dụ:** *Конститу́ция гаранти́рует гра́жданам свобо́ду со́вести и вероиспове́дания.* (Hiến pháp bảo đảm cho công dân quyền tự do lương tâm và tôn giáo tín ngưỡng.) |\n| 18 | **ве́ра** | *сущ.* | đức tin, lòng tin, sự tin tưởng | • **Cấu trúc:** `вера в будущее`<br/>• **Ví dụ:** *Ве́ра в свои́ си́лы помога́ет челове́ку побежда́ть в са́мых тяжёлых ситуа́циях.* (Lòng tin vào sức mạnh bản thân giúp con người chiến thắng trong những hoàn cảnh ngặt nghèo nhất.) |\n| 19 | **тради́ция** | *сущ.* | truyền thống phong tục | • **Cấu trúc:** `культурные традиции`<br/>• **Ví dụ:** *В э́той се́мье свя́то храня́т тради́ции свои́х дедо́в и пра́дедов.* (Trong gia đình này người ta gìn giữ thiêng liêng các truyền thống của ông cha.) |\n| 20 | **патриа́рх** | *сущ.* | thượng phụ, đức giáo chủ Chính thống giáo | • **Cấu trúc:** `Патриарх Московский и всея Руси`<br/>• **Ví dụ:** *Патриа́рх соверши́л пра́здничное рожде́ственское богослуже́ние в собо́ре.* (Đức thượng phụ đã chủ trì buổi lễ phụng vụ Giáng sinh tại thánh đường.) |\n| 21 | **моли́тва** | *сущ.* | lời cầu nguyện, kinh cầu | • **Cấu trúc:** `читать молитву`<br/>• **Ví dụ:** *Ве́рующие стоя́ли пе́ред алтарём, погружённые в ти́хую моли́тву.* (Các tín hữu đứng trước bàn thờ, chìm đắm trong lời cầu nguyện tĩnh lặng.) |\n| 22 | **священнослужи́тель** | *сущ.* | giáo sĩ, linh mục, mục sư | • **Cấu trúc:** `православный священнослужитель`<br/>• **Ví dụ:** *Священнослужи́тель обрати́лся к прихожа́нам со слова́ми духо́вного наставле́ния.* (Vị linh mục đã cất lời chỉ dẫn tâm linh tới các giáo dân.) |\n| 23 | **часо́вня** | *сущ.* | nhà nguyện nhỏ không có ban thờ | • **Cấu trúc:** `деревянная часовня`<br/>• **Ví dụ:** *У Воскресе́нских воро́т на Кра́сной пло́щади стои́т знамени́тая И́верская часо́вня.* (Cạnh Cổng Phục Sinh trên Quảng trường Đỏ có Nhà nguyện Iverskaya nổi tiếng.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-16T16:05:15.522043+00:00"
  },
  {
    "id": "101b0c2f-5e84-407b-94c3-f50dbf0b165a",
    "code": "lesson_vocab_b1_08",
    "jar_id": "e2cf61a3-c9e1-40b6-ba07-ea5d8c944b82",
    "title": "BÀI 08: TỪ VỰNG CHỦ ĐỀ VĂN HÓA, NGHỆ THUẬT & VĂN HỌC (КУЛЬТУРА, ИСКУССТВО И ЛИТЕРАТУРА)",
    "level": "B1",
    "content_md": "# Bài học: Văn hóa, Nghệ thuật & Văn học (Культура, искусство и литература)\n\n## I. Nền Văn hóa Đỉnh cao Nhân loại\nVăn học và hội họa Nga là di sản (*наследие*) vô giá. Những áng văn của Pushkin, Lermontov, Tolstoy, Dostoevsky, Chekhov đã chạm tới những chiều kích sâu thẳm nhất của tâm hồn con người.\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **произведе́ние** | *сущ.* | tác phẩm (văn học, nghệ thuật, âm nhạc) | • **Cấu trúc:** `произведение искусства`<br/>• **Ví dụ:** *Рома́н “Война́ и мир” — велича́йшее произведе́ние Льва Толсто́го.* (Tiểu thuyết 'Chiến tranh và Hòa bình' là tác phẩm vĩ đại nhất của Lev Tolstoy.) |\n| 2 | **жи́вопись** | *сущ.* | nghệ thuật hội họa, tranh vẽ | • **Cấu trúc:** `русская живопись`<br/>• **Ví dụ:** *В Третьяко́вской галере́е собра́на богате́йшая колле́кция ру́сской жи́вописи.* (Tại phòng trưng bày Tretyakov hội tụ bộ sưu tập hội họa Nga trù phú nhất.) |\n| 3 | **вдохнове́ние** | *сущ.* | nguồn cảm hứng, sự thăng hoa sáng tạo | • **Cấu trúc:** `источник вдохновения`<br/>• **Ví dụ:** *Красота́ приро́ды служи́ла гла́вным исто́чником вдохнове́ния для поэ́та.* (Vẻ đẹp thiên nhiên đã trở thành nguồn cảm hứng chủ đạo cho nhà thơ.) |\n| 4 | **гениа́льный** | *прил.* | thiên tài, lỗi lạc, xuất chúng | • **Cấu trúc:** `гениальный композитор`<br/>• **Ví dụ:** *Пётр Чайко́вский — гениа́льный компо́зитор, чью му́зыку зна́ют во всём ми́ре.* (Pyotr Tchaikovsky là một nhà soạn nhạc thiên tài mà âm nhạc của ông được biết đến trên toàn thế giới.) |\n| 5 | **насле́дие** | *сущ.* | di sản (văn hóa, lịch sử, tinh thần) | • **Cấu trúc:** `культурное наследие`<br/>• **Ví dụ:** *Истори́ческий центр Санкт-Петербу́рга призна́н объектом Всеми́рного насле́дия.* (Trung tâm lịch sử Sankt-Peterburg được công nhận là di sản thế giới.) |\n| 6 | **тво́рчество** | *сущ.* | sự nghiệp sáng tác, hoạt động sáng tạo | • **Cấu trúc:** `литературное творчество`<br/>• **Ví dụ:** *Тво́рчество А.С. Пу́шкина оказа́ло огро́мное влия́ние на разви́тие ру́сского языка́.* (Sự nghiệp sáng tác của A.S. Pushkin đã tạo ảnh hưởng to lớn đến sự phát triển của tiếng Nga.) |\n| 7 | **драмату́рг** | *сущ.* | nhà soạn kịch, nhà viết kịch | • **Cấu trúc:** `известный драматург`<br/>• **Ví dụ:** *А.П. Че́хов был не то́лько писа́телем, но и гениа́льным драматургом.* (A.P. Chekhov không chỉ là một nhà văn mà còn là một nhà soạn kịch thiên tài.) |\n| 8 | **кла́ссик** | *сущ.* | tác gia kinh điển, nhà văn kinh điển | • **Cấu trúc:** `классики русской литературы`<br/>• **Ví dụ:** *Лев Толсто́й и Фёдор Достое́вский по пра́ву признаны́ велича́йшими кла́ссиками мирово́й литерату́ры.* (Lev Tolstoy và Fyodor Dostoevsky được tôn vinh xứng đáng là những tác gia kinh điển vĩ đại nhất của văn học thế giới.) |\n| 9 | **галере́я** | *сущ.* | phòng trưng bày tranh, bảo tàng nghệ thuật | • **Cấu trúc:** `Третьяковская галерея`<br/>• **Ví dụ:** *Тури́сты с восто́ргом посети́ли знамени́тую Третьяко́вскую галере́ю в Москве́.* (Các du khách đã hào hứng đến thăm phòng trưng bày Tretyakov nổi tiếng ở Moskva.) |\n| 10 | **вы́ставка** | *сущ.* | triển lãm, cuộc trưng bày | • **Cấu trúc:** `художественная выставка`<br/>• **Ví dụ:** *В музе́е откры́лась вы́ставка карти́н худо́жников-передви́жников.* (Tại bảo tàng đã khai mạc cuộc triển lãm tranh của các họa sĩ nhóm Peredvizhniki.) |\n| 11 | **тала́нт** | *сущ.* | tài năng, khiếu bẩm sinh | • **Cấu trúc:** `природный талант`<br/>• **Ví dụ:** *Его́ худо́жественный тала́нт прояви́лся ещё в ра́ннем де́тстве.* (Tài năng hội họa của cậu ấy đã bộc lộ từ thuở ấu thơ.) |\n| 12 | **тала́нтливый** | *прил.* | có tài, tài năng xuất chúng | • **Cấu trúc:** `талантливый писатель`<br/>• **Ví dụ:** *Молодо́й тала́нтливый пиани́ст завоева́л пе́рвую пре́мию на ко́нкурсе имени Чайко́вского.* (Nghệ sĩ piano trẻ đầy tài năng đã giành giải nhất tại cuộc thi mang tên Tchaikovsky.) |\n| 13 | **пу́блика** | *сущ.* | công chúng khán giả, người xem | • **Cấu trúc:** `театральная публика`<br/>• **Ví dụ:** *Пу́блика восторженно аплоди́ровала арти́стам бале́та по́сле оконча́ния спекта́кля.* (Khán giả nhiệt liệt vỗ tay tán thưởng các nghệ sĩ ba-lê sau khi vở diễn kết thúc.) |\n| 14 | **аплодисме́нты** | *сущ.* | tràng pháo tay tán thưởng | • **Cấu trúc:** `бурные аплодисменты`<br/>• **Ví dụ:** *Зал взорва́лся бу́рными аплодисме́нтами, когда́ на сце́ну вы́шел маэ́стро.* (Cả khán phòng bùng nổ những tràng pháo tay giòn giã khi vị nhạc trưởng bước ra sân khấu.) |\n| 15 | **спекта́кль** | *сущ.* | vở kịch, buổi biểu diễn sân khấu | • **Cấu trúc:** `театральный спектакль`<br/>• **Ví dụ:** *Но́вый спекта́кль по пье́се Че́хова “Вишнёвый сад” собра́л по́лный аншла́г.* (Vở kịch mới dàn dựng theo tác phẩm 'Vườn anh đào' của Chekhov đã bán sạch vé.) |\n| 16 | **режиссёр** | *сущ.* | đạo diễn (sân khấu, điện ảnh) | • **Cấu trúc:** `известный режиссёр`<br/>• **Ví dụ:** *Знамени́тый режиссёр Станисла́вский созда́л всеми́рно призна́нную актёрскую систе́му.* (Vị đạo diễn lừng danh Stanislavsky đã sáng tạo nên hệ thống đào tạo diễn xuất được thế giới công nhận.) |\n| 17 | **актёр** | *сущ.* | nam diễn viên | • **Cấu trúc:** `талантливый актёр`<br/>• **Ví dụ:** *Актёр блестя́ще сыгра́л гла́вную роль в драмати́ческом спекта́кле.* (Nam diễn viên đã thể hiện xuất sắc vai chính trong vở kịch chính kịch.) |\n| 18 | **актри́са** | *сущ.* | nữ diễn viên | • **Cấu trúc:** `народная актриса`<br/>• **Ví dụ:** *Э́та актри́са покори́ла зри́телей свое́й искренностью и драмати́ческим талантом.* (Nữ diễn viên này đã chinh phục người xem bằng sự chân thành và tài năng diễn xuất kịch nghệ.) |\n| 19 | **поэ́зия** | *сущ.* | thơ ca, thi ca | • **Cấu trúc:** `русская поэзия`<br/>• **Ví dụ:** *Поэ́зия Сере́бряного ве́ка отлича́ется осо́бой тонкостью и музыка́льностью.* (Thơ ca Thời kỳ Bạc mang nét tinh tế và nhạc tính vô cùng đặc biệt.) |\n| 20 | **про́за** | *сущ.* | văn xuôi; thực tế trần trụi của đời sống | • **Cấu trúc:** `русская классическая проза`<br/>• **Ví dụ:** *Психологи́ческая про́за Достое́вского глубоко́ иссле́дует челове́ческую ду́шу.* (Văn xuôi tâm lý của Dostoevsky nghiên cứu sâu sắc tâm hồn con người.) |\n| 21 | **сюже́т** | *сущ.* | cốt truyện (tiểu thuyết, phim ảnh) | • **Cấu trúc:** `захватывающий сюжет`<br/>• **Ví dụ:** *Захва́тывающий сюже́т детекти́вного рома́на де́ржит чита́теля в напряже́нии до конца́.* (Cốt truyện lôi cuốn của cuốn tiểu thuyết trinh thám giữ độc giả trong trạng thái hồi hộp đến tận trang cuối.) |\n| 22 | **о́браз** | *сущ.* | hình tượng nhân vật / nghệ thuật; lối sống | • **Cấu trúc:** `образ Татьяны в романе`<br/>• **Ví dụ:** *О́браз Татья́ны Ла́риной в рома́не “Евге́ний Оне́гин” стал идеа́лом ру́сской же́нщины.* (Hình tượng Tatyana Larina trong tiểu thuyết 'Evgeny Onegin' đã trở thành hình mẫu lý tưởng của người phụ nữ Nga.) |\n| 23 | **восхища́ть** | *гл.* | làm say mê, làm thán phục, quyến rũ | • **Cấu trúc:** `восхищать + кого (В.п.) + чем (Тв.п.)`<br/>• **Ví dụ:** *Мастерство́ балери́ны восхища́ет зри́телей на ка́ждом спекта́кле.* (Kỹ năng điêu luyện của nữ nghệ sĩ ba-lê làm mê đắm khán giả trong từng vở diễn.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-16T16:05:15.523495+00:00"
  },
  {
    "id": "ff5e84e6-68c5-45e7-aa32-e9b15c283969",
    "code": "lesson_vocab_b1_10",
    "jar_id": "67cbc541-1cca-47c1-809f-d3e35d6af9a1",
    "title": "BÀI 10: TỪ VỰNG CHỦ ĐỀ XÃ HỘI, TRUYỀN THÔNG & TRANH LUẬN (ОБЩЕСТВО, СМИ И ДИСКУССИИ)",
    "level": "B1",
    "content_md": "# Bài học: Xã hội, Truyền thông & Tranh luận (Общество, СМИ и дискуссии)\n\n## I. Kỹ năng Biện luận Đỉnh cao (ТРКИ-1 / B1)\nỞ trình độ B1, yêu cầu cốt lõi của kỳ thi quốc tế là thí sinh phải chứng minh được năng lực tư duy phản biện: biết lắng nghe, phân tích các góc nhìn khác nhau (*дискуссия*), đưa ra luận cứ đanh thép (*веские аргументы*) và đúc kết thành kết luận logic (*вывод*).\n\n\n## II. Bảng Từ vựng Trọng tâm trong Lọ (23 từ)\n\n| STT | Từ vựng (có trọng âm) | Từ loại | Nghĩa tiếng Việt | Cấu trúc & Ví dụ tiêu biểu |\n|:---:|---|:---:|---|---|\n| 1 | **преиму́щество** | *сущ.* | ưu thế, thế mạnh, ưu điểm | • **Cấu trúc:** `иметь преимущество перед кем/чем (Тв.п.)`<br/>• **Ví dụ:** *В эссе́ ну́жно проанализи́ровать гла́вные преиму́щества и недоста́тки онла́йн-обуче́ния.* (Trong bài tiểu luận cần phân tích các ưu điểm và nhược điểm chính của việc học trực tuyến.) |\n| 2 | **недоста́ток** | *сущ.* | nhược điểm, điểm yếu, sự thiếu thốn | • **Cấu trúc:** `существенный недостаток`<br/>• **Ví dụ:** *Еди́нственный недоста́ток э́того прое́кта — сли́шком высо́кая сто́имость.* (Nhược điểm duy nhất của dự án này là kinh phí thực hiện quá cao.) |\n| 3 | **аргуме́нт** | *сущ.* | luận cứ, lý lẽ thuyết phục trong tranh biện | • **Cấu trúc:** `убедительный аргумент`<br/>• **Ví dụ:** *Автор статьи́ приво́дит ве́ские аргуме́нты в защи́ту окружа́ющей среды́.* (Tác giả bài báo đưa ra những luận cứ đanh thép để bảo vệ môi trường xung quanh.) |\n| 4 | **сформули́ровать** | *гл.* | diễn đạt gãy gọn, đúc kết thành lời, công thức hóa | • **Cấu trúc:** `сформулировать + мысль / вывод / вопрос (В.п.)`<br/>• **Ví dụ:** *Студе́нт чётко и я́сно сформули́ровал свою́ то́чку зре́ния на экза́мене.* (Người sinh viên đã diễn đạt rành mạch và rõ ràng quan điểm của mình trong kỳ thi.) |\n| 5 | **вы́вод** | *сущ.* | kết luận, sự đúc rút | • **Cấu trúc:** `сделать вывод`<br/>• **Ví dụ:** *На осно́ве проведённых иссле́дований учёные сде́лали ва́жные вы́воды.* (Dựa trên những nghiên cứu đã tiến hành, các nhà khoa học đã rút ra các kết luận quan trọng.) |\n| 6 | **диску́ссия** | *сущ.* | cuộc thảo luận, cuộc tranh luận học thuật | • **Cấu trúc:** `научная дискуссия`<br/>• **Ví dụ:** *По́сле докла́да разверну́лась о́страя нау́чная диску́ссия о путя́х разви́тия эне́ргетики.* (Sau bản báo cáo đã bùng nổ cuộc tranh luận khoa học sôi nổi về các con đường phát triển năng lượng.) |\n| 7 | **крите́рий** | *сущ.* | tiêu chí, chuẩn mực đánh giá | • **Cấu trúc:** `главный критерий`<br/>• **Ví dụ:** *Гра́мотность и бога́тство словарного запа́са — гла́вные крите́рии оце́нки на те́сте B1.* (Độ chuẩn xác ngữ pháp và sự trù phú của vốn từ vựng là những tiêu chí đánh giá chủ chốt trong bài thi B1.) |\n| 8 | **то́чка зре́ния** | *сущ.* | quan điểm, góc nhìn nhận vấn đề | • **Cấu trúc:** `с точки зрения кого (Р.п.)`<br/>• **Ví dụ:** *С то́чки зре́ния эконо́мики э́тот прое́кт явля́ется чрезвыча́йно вы́годным.* (Dưới góc độ kinh tế dự án này vô cùng có lợi nhuận.) |\n| 9 | **дока́зывать** | *гл.* | chứng minh, đưa ra luận cứ xác đáng | • **Cấu trúc:** `доказывать + свою правоту (В.п.)`<br/>• **Ví dụ:** *В эссе́ ну́жно не про́сто выска́зывать мне́ние, а убеди́тельно дока́зывать его́.* (Trong bài tiểu luận cần không chỉ nêu ý kiến mà phải chứng minh nó một cách đầy thuyết phục.) |\n| 10 | **анализи́ровать** | *гл.* | phân tích, mổ xẻ dữ liệu | • **Cấu trúc:** `анализировать + факты / данные (В.п.)`<br/>• **Ví dụ:** *Экспе́рты внима́тельно анализи́руют сообще́ния мировы́х информацио́нных аге́нтств.* (Các chuyên gia chăm chú phân tích các bản tin của các hãng thông tấn thế giới.) |\n| 11 | **сертифика́т** | *сущ.* | chứng chỉ quốc tế, giấy chứng nhận | • **Cấu trúc:** `сертификат ТРКИ`<br/>• **Ví dụ:** *Успе́шно сдав все субте́сты, студе́нт получи́л госуда́рственный сертифика́т B1.* (Vượt qua thành công tất cả các phân môn, sinh viên đã nhận được chứng chỉ quốc gia B1.) |\n| 12 | **тести́рование** | *сущ.* | kỳ thi trắc nghiệm, cuộc kiểm tra sát hạch năng lực | • **Cấu trúc:** `пройти тестирование`<br/>• **Ví dụ:** *Иностра́нные гражда́не прохо́дят обяза́тельное тести́рование по ру́сскому языку́.* (Công dân nước ngoài tham gia kỳ thi kiểm tra sát hạch bắt buộc về tiếng Nga.) |\n| 13 | **инстру́кция** | *сущ.* | bản hướng dẫn thi, chỉ dẫn làm bài | • **Cấu trúc:** `следовать инструкции`<br/>• **Ví dụ:** *Пе́ред нача́лом экза́мена внима́тельно прочита́йте все пу́нкты инстру́кции.* (Trước khi bắt đầu bài thi hãy đọc kỹ tất cả các mục của bản hướng dẫn.) |\n| 14 | **вариа́нт** | *сущ.* | phương án lựa chọn; mã đề thi | • **Cấu trúc:** `правильный вариант ответа`<br/>• **Ví dụ:** *Выберите еди́нственный пра́вильный вариа́нт отве́та из четырёх предло́женных.* (Hãy chọn phương án trả lời đúng duy nhất trong 4 phương án được đưa ra.) |\n| 15 | **оце́нка** | *сущ.* | điểm số, thang điểm đánh giá | • **Cấu trúc:** `получить высокую оценку`<br/>• **Ví dụ:** *За у́стное выступле́ние на экза́мене студе́нт получи́л наивы́сшую оце́нку.* (Đối với phần thi nói trong kỳ thi người sinh viên đã đạt được điểm số cao nhất.) |\n| 16 | **субте́ст** | *сущ.* | phân môn thi (trong bài thi chuẩn hóa) | • **Cấu trúc:** `субтест “Письмо”`<br/>• **Ví dụ:** *Экза́мен ТРКИ-1 состои́т из пяти́ обяза́тельных субте́стов по всем ви́дам речево́й дея́тельности.* (Kỳ thi TRKI-1 bao gồm 5 phân môn bắt buộc về tất cả các kỹ năng hoạt động lời nói.) |\n| 17 | **гра́мотность** | *сущ.* | sự chuẩn xác ngữ pháp, trình độ học vấn | • **Cấu trúc:** `языковая грамотность`<br/>• **Ví dụ:** *Языкова́я гра́мотность и бога́тство сло́варного запа́са о́чень важны́ для успе́шной сдачи теста.* (Độ chuẩn xác ngôn ngữ và sự phong phú của vốn từ vựng rất quan trọng để thi đỗ bài test.) |\n| 18 | **дискути́ровать** | *гл.* | tranh luận, thảo luận phản biện | • **Cấu trúc:** `дискутировать + о чём (Пр.п.) / на тему`<br/>• **Ví dụ:** *Уча́стники кру́глого стола́ до́лго дискути́ровали о путя́х разви́тия совреме́нной пре́ссы.* (Những người tham gia bàn tròn đã thảo luận rất lâu về các con đường phát triển của báo chí đương đại.) |\n| 19 | **убежда́ть** | *гл.* | thuyết phục ai đó tin theo | • **Cấu trúc:** `убеждать + кого (В.п.) + в чём (Пр.п.)`<br/>• **Ví dụ:** *Ора́тор уме́ло убежда́л аудито́рию в пра́вильности свое́й пози́ции.* (Nhà diễn thuyết đã khéo léo thuyết phục thính chúng tin vào tính đúng đắn trong lập trường của mình.) |\n| 20 | **сомне́ние** | *сущ.* | sự hoài nghi, nỗi nghi ngờ | • **Cấu trúc:** `вызывать сомнение`<br/>• **Ví dụ:** *Факты не вызыва́ли никаки́х сомне́ний в достове́рности опублико́ванного репорта́жа.* (Các sự kiện không gây ra bất kỳ hoài nghi nào về tính xác thực của bài phóng sự đã xuất bản.) |\n| 21 | **компроми́сс** | *сущ.* | sự thỏa hiệp, giải pháp dung hòa | • **Cấu trúc:** `пойти на компромисс`<br/>• **Ví dụ:** *В спо́ре сто́роны суме́ли найти́ разу́мный компроми́сс, устро́ивший всех уча́стников.* (Trong cuộc tranh chấp các bên đã tìm ra được một sự thỏa hiệp hợp lý làm hài lòng tất cả các bên.) |\n| 22 | **СМИ** | *сущ.* | các phương tiện thông tin đại chúng (truyền thông, báo đài) | • **Cấu trúc:** `сообщения в СМИ`<br/>• **Ví dụ:** *Сре́дства ма́ссовой информа́ции игра́ют огро́мную роль в формирова́нии обще́ственного мне́ния.* (Các phương tiện thông tin đại chúng đóng vai trò to lớn trong việc định hình dư luận xã hội.) |\n| 23 | **интервью́** | *сущ.* | cuộc phỏng vấn | • **Cấu trúc:** `брать / дать интервью (кому/у кого)`<br/>• **Ví dụ:** *Изве́стный журнаaccessли́ст взял подро́бное интервью́ у ре́ктора университе́та.* (Nhà báo nổi tiếng đã có cuộc phỏng vấn chi tiết với ngài hiệu trưởng trường đại học.) |\n\n",
    "created_at": "2026-11-14T11:48:19.195091+00:00",
    "updated_at": "2026-11-16T16:05:15.526318+00:00"
  },
  {
    "id": "4869d658-69b6-44c8-bced-02e967d7d006",
    "code": "lesson_vocab_a1_thanh_vien_gia_dinh",
    "jar_id": "a1000000-0000-0000-0000-000000000001",
    "title": "BÀI HỌC TỪ VỰNG A1: THÀNH VIÊN GIA ĐÌNH (ЧЛЕНЫ СЕМЬИ)",
    "level": "A1",
    "content_md": "# Bài học Từ vựng A1: Thành viên gia đình (Члены семьи)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (CEFR A1)\nChủ đề **Thành viên gia đình (Семья / Члены семьи)** là một trong những bài học vỡ lòng quan trọng nhất ở cấp độ sơ cấp A1. Đây là bước đầu tiên để bạn nói về những người thân thiết nhất gắn liền với đời sống hằng ngày. \n\nNắm vững hệ thống từ vựng sơ cấp này giúp bạn:\n- Tự tin giới thiệu bản thân và các thành viên trong gia đình (tên tuổi, nghề nghiệp, nơi chốn làm việc, sở thích).\n- Miêu tả ngoại hình và tính cách cơ bản bằng các cặp tính từ tương phản thông dụng.\n- Vận dụng các động từ chỉ hoạt động sinh hoạt thường nhật (nấu nướng, đọc sách, xem phim, giúp đỡ, đi dạo...).\n- Viết hoặc thuyết trình một đoạn văn ngắn mạch lạc kể về gia đình mình.\n\n---\n\n## 2. Bảng Danh từ chỉ Thành viên gia đình (Существительные)\n\n| STT | Từ vựng (có trọng âm) | Từ loại & Giống | Nghĩa tiếng Việt | Cấu trúc & Ví dụ minh họa |\n|:---:|---|:---:|---|---|\n| 1 | **де́душка** | *сущ. (m)* | ông, ông nội, ông ngoại | • **Ví dụ:** *Мой де́душка смо́трит фильм в гости́ной.* (Ông tôi đang xem phim trong phòng khách.) |\n| 2 | **ба́бушка** | *сущ. (f)* | bà, bà nội, bà ngoại | • **Ví dụ:** *Ба́бушка чита́ет кни́гу ве́чером.* (Bà đọc sách vào buổi tối.) |\n| 3 | **па́па** | *сущ. (m)* | bố, ba, cha | • **Ví dụ:** *Па́па рабо́тает в о́фисе.* (Bố tôi làm việc ở văn phòng.) |\n| 4 | **ма́ма** | *сущ. (f)* | mẹ, má | • **Ví dụ:** *Ма́ма гото́вит у́жин на ку́хне.* (Mẹ đang nấu bữa tối trong bếp.) |\n| 5 | **роди́тели** | *сущ. (pl)* | bố mẹ, cha mẹ, phụ huynh | • **Ví dụ:** *Мои́ роди́тели ложа́тся спать в 10 часо́в.* (Bố mẹ tôi đi ngủ lúc 10 giờ.) |\n| 6 | **сы́н** | *сущ. (m)* | con trai | • **Ví dụ:** *Моего́ сы́на зову́т Макси́м, ему́ двена́дцать лет.* (Con trai tôi tên là Maksim, cháu 12 tuổi.) |\n| 7 | **до́чь** | *сущ. (f)* | con gái | • **Ví dụ:** *Мою́ до́чь зову́т Ми́ла, ей семь лет.* (Con gái tôi tên là Mila, cháu 7 tuổi.) |\n| 8 | **бра́т** | *сущ. (m)* | anh trai, em trai | • **Ví dụ:** *Мой бра́т у́чится в университе́те.* (Anh trai tôi đang học ở trường đại học.) |\n| 9 | **сестра́** | *сущ. (f)* | chị gái, em gái | • **Ví dụ:** *Моя́ сестра́ лю́бит ко́шек.* (Em gái tôi rất yêu mèo.) |\n| 10 | **семья́** | *сущ. (f)* | gia đình, tổ ấm | • **Ví dụ:** *У меня́ больша́я и дру́жная семья́.* (Tôi có một gia đình lớn và hòa thuận.) |\n\n---\n\n## 3. Hệ thống Động từ sinh hoạt hằng ngày (Глаголы)\n\n| STT | Động từ (НСВ / СВ) | Cấu trúc ngữ pháp | Cách biến đổi | Ví dụ minh họa |\n|:---:|---|---|:---:|---|\n| 1 | **гото́вить / пригото́вить** | *что? (nấu món gì)* | Cách 4 | • *Ба́бушка гото́вит борщ.* (Bà đang nấu súp củ dền borscht.)<br/>• *Вчера́ ма́ма пригото́вила вку́сный у́жин.* (Hôm qua mẹ đã nấu bữa tối rất ngon.) |\n| 2 | **чита́ть / прочита́ть** | *что? (đọc cái gì)* | Cách 4 | • *Де́душка чита́ет газе́ту ка́ждое у́тро.* (Mỗi sáng ông đều đọc báo.)<br/>• *Мой брат прочита́л э́ту кни́гу.* (Anh trai tôi đã đọc xong cuốn sách này.) |\n| 3 | **смотре́ть / посмотре́ть** | *что? (xem cái gì)* | Cách 4 | • *Па́па смо́трит футбо́л.* (Bố đang xem bóng đá.)<br/>• *Мы с сестро́й посмотре́ли но́вый фильм.* (Tôi và em gái đã xem một bộ phim mới.) |\n| 4 | **люби́ть** | *кого́? / что? (yêu thương ai / thích cái gì)* | Cách 4 | • *Я люблю́ де́душку и ба́бушку.* (Tôi rất yêu quý ông bà.) |\n| 5 | **игра́ть** | *во что? (chơi môn gì)* | Cách 4 | • *Па́па и сын игра́ют в ша́хматы.* (Hai bố con đang chơi cờ vua.) |\n| 6 | **помога́ть / помо́чь** | *кому́? (giúp đỡ ai)* | Cách 3 | • *Я помога́ю ба́бушке гото́вить суп.* (Tôi giúp bà nấu súp.)<br/>• *Дочь помогла́ ма́ме пригото́вить у́жин.* (Con gái đã phụ mẹ chuẩn bị bữa tối.) |\n| 7 | **жить** | *где? (sống ở đâu)* | Cách 6 | • *Мои́ де́душка и ба́бушка живу́т в дере́вне.* (Ông bà tôi sống ở nông thôn.) |\n| 8 | **рабо́тать** | *где? (làm việc ở đâu)* | Cách 6 | • *Моя́ сестра́ рабо́тает в шко́ле.* (Chị gái tôi làm việc tại một trường học.) |\n| 9 | **учи́ться** | *где? (học tập ở đâu)* | Cách 6 | • *Мой брат у́чится в университе́те.* (Anh tôi học ở trường đại học.) |\n| 10 | **ложи́ться / лечь спать** | *где? (nằm ngủ ở đâu)* | Cách 6 | • *Мой сын ложи́тся спать в свое́й ко́мнате.* (Con trai tôi đi ngủ trong phòng riêng của cháu.)<br/>• *Сестра́ легла́ спать на дива́не.* (Em gái đã nằm ngủ trên ghế bành.) |\n| 11 | **отдыха́ть / отдохну́ть** | *где? (nghỉ ngơi ở đâu)* | Cách 6 | • *Роди́тели отдыха́ют на да́че.* (Bố mẹ tôi đang nghỉ dưỡng ở dacha - nhà vườn.) |\n| 12 | **гуля́ть / погуля́ть** | *где? (đi dạo ở đâu)* | Cách 6 | • *Де́душка гуля́ет в саду́.* (Ông đang đi dạo trong vườn hoa.)<br/>• *Па́па погуля́л с сы́ном на у́лице.* (Bố đã dắt con trai đi dạo phố.) |\n| 13 | **разгова́ривать** | *с кем? (nói chuyện với ai)* | Cách 5 | • *Ве́чером мы ча́сто разгова́риваем на ку́хне.* (Buổi tối chúng tôi hay trò chuyện trong bếp.) |\n| 14 | **у́жинать** | *с кем? / где? (ăn tối cùng ai)* | Cách 5 / 6 | • *Мы у́жинаем вме́сте ка́ждый день.* (Chúng tôi cùng nhau ăn bữa tối mỗi ngày.) |\n| 15 | **звать** | *кого́? (gọi tên ai)* | Cách 4 | • *Как вас зову́т? — Меня́ зову́т А́нна.* (Bạn tên là gì? — Tôi tên là Anna.) |\n\n---\n\n## 4. Các cặp Tính từ miêu tả Tính cách tương phản (Прилагательные)\n\n| Cặp đối lập (Tích cực ↔ Tiêu cực) | Nghĩa tiếng Việt | Câu ví dụ minh họa & Dịch nghĩa |\n|---|---|---|\n| **до́брый** ↔ **зло́й** | tốt bụng, nhân hậu ↔ độc ác, xấu tính | *Мой де́душка до́брый, а его́ сосе́д — зло́й.*<br/>(Ông tôi rất tốt bụng, còn ông hàng xóm thì xấu tính.) |\n| **у́мный** ↔ **глу́пый** | thông minh, sáng dạ ↔ ngốc nghếch | *Моя́ дочь у́мная, а её кот — глу́пый.*<br/>(Con gái tôi rất thông minh, còn chú mèo của nó thì ngốc nghếch.) |\n| **весёлый** ↔ **гру́стный** | vui vẻ, hoạt bát ↔ buồn bã, ủ rũ | *Мой па́па весёлый, а сего́дня он гру́стный.*<br/>(Bố tôi vốn rất vui tính, nhưng hôm nay bố có vẻ buồn.) |\n| **ще́дрый** ↔ **жа́дный** | hào phóng, rộng lượng ↔ keo kiệt, tham lam | *Моя́ ба́бушка ще́драя, а её сосе́дка — жа́дная.*<br/>(Bà tôi rất rộng rãi hào phóng, còn bà hàng xóm thì keo kiệt.) |\n| **че́стный** ↔ **нече́стный** | trung thực, thật thà ↔ không trung thực, dối trá | *Мой брат че́стный, а его́ друг — нече́стный.*<br/>(Anh trai tôi rất trung thực, còn bạn anh ấy lại không thật thà.) |\n\n---\n\n## 5. Bài đọc mẫu: Kể về gia đình tôi (Расскажи о своей семье)\n\n### Nguyên văn tiếng Nga (kèm trọng âm):\n> **Меня́ зову́т А́нна.** Мне два́дцать лет. У меня́ больша́я семья́. В мое́й семье́ пять челове́к: ма́ма, па́па, бра́т, ба́бушка и я. \n> \n> Мою́ ма́му зову́т Еле́на. Она́ рабо́тает в больни́це. Ма́ма лю́бит гото́вить. Ка́ждый ве́чер она́ гото́вит у́жин. \n> \n> Моего́ па́пу зову́т Ива́н. Он рабо́тает в о́фисе. Па́па лю́бит чита́ть кни́ги и смотре́ть телеви́зор. \n> \n> У меня́ есть мла́дший бра́т. Его́ зову́т Макси́м. Он у́чится в шко́ле. Он лю́бит игра́ть в футбо́л и чита́ть кни́ги. \n> \n> Моя́ ба́бушка живёт с на́ми. Она́ до́брая и весёлая. Ба́бушка лю́бит гото́вить и гуля́ть в па́рке. \n> \n> Ве́чером мы ча́сто отдыха́ем до́ма. Мы смо́трим телеви́зор, разгова́риваем и у́жинаем вме́сте. Я о́чень люблю́ свою́ семью́.\n\n### Bản dịch tiếng Việt chuẩn mực:\n> **Tên tôi là Anna.** Năm nay tôi 20 tuổi. Tôi có một gia đình đông người và ấm áp. Gia đình tôi gồm 5 thành viên: mẹ, bố, em trai, bà và tôi.\n>\n> Mẹ tôi tên là Elena. Mẹ làm việc tại bệnh viện. Mẹ rất thích nấu ăn. Mỗi buổi tối mẹ đều chuẩn bị bữa cơm ấm cúng cho cả nhà.\n>\n> Bố tôi tên là Ivan. Bố làm việc tại văn phòng. Bố thích đọc sách và xem tivi sau giờ làm việc.\n>\n> Tôi có một người em trai nhỏ. Em tên là Maksim. Em đang học tiểu học. Maksim rất mê chơi bóng đá và cũng ham đọc sách.\n>\n> Bà tôi sống cùng gia đình chúng tôi. Bà là một người nhân hậu và vui vẻ. Bà thích nấu nướng và đi tản bộ trong công viên.\n>\n> Vào các buổi tối, cả gia đình chúng tôi thường quây quần nghỉ ngơi ở nhà. Chúng tôi cùng xem tivi, trò chuyện rôm rả và thưởng thức bữa tối bên nhau. Tôi thực sự rất yêu quý gia đình của mình.\n\n---\n\n## 6. Điểm Ngữ pháp Cốt lõi A1 cần ghi nhớ\n1. **Cấu trúc sở hữu:** `У меня́ есть...` (Tôi có...) + Danh từ ở Cách 1 (Именительный падеж).\n2. **Cấu trúc giới thiệu tên:** `Меня́ / его́ / её зову́т...` (Tên tôi/anh ấy/cô ấy là...) + Tên riêng.\n3. **Giới từ chỉ nơi chốn (Cách 6):** `в о́фисе` (ở văn phòng), `в больни́це` (ở bệnh viện), `в шко́ле` (ở trường học), `на ку́хне` (ở trong bếp), `на да́че` (ở nhà vườn).\n4. **Động từ bổ nghĩa cho hành động sở thích:** `любить + инфинитив` (*Мама любит готовить*, *Папа любит читать*).\n",
    "created_at": "2026-11-19T15:59:08.259469+00:00",
    "updated_at": "2026-11-19T16:41:47.023738+00:00"
  },
  {
    "id": "b813150c-2572-46b6-aedb-c856217ebd06",
    "code": "lesson_vocab_a2_thanh_vien_gia_dinh",
    "jar_id": "a2000000-0000-0000-0000-000000000002",
    "title": "Bài học Từ vựng A2: Họ hàng & Thế hệ gia đình",
    "level": "A2",
    "content_md": "# Chủ đề A2: Mở rộng Họ hàng và Thế hệ trong Gia đình (Семья и родственники)\n\n## 1. Giới thiệu chủ đề & Tầm quan trọng (Trình độ A2)\nỞ trình độ cơ bản A2, các bạn nên mở rộng vốn từ vựng về họ hàng, các thế hệ trong gia đình (ông bà, cha mẹ, con cháu, cô dì, chú bác...).\n\nBên cạnh việc giới thiệu các thành viên, các bạn cần biết mô tả mối quan hệ giữa họ, tình trạng hôn nhân (độc thân, đã kết hôn, ly hôn...), cũng như một số đặc điểm về ngoại hình, tính cách, nghề nghiệp và sở thích (kết hợp từ vựng của các chủ đề khác). Đồng thời, cần mở rộng hệ thống động từ để diễn đạt sự tương tác giữa các thành viên như chăm sóc, giúp đỡ, thăm hỏi, trò chuyện, cùng nhau tổ chức các hoạt động. Khi các bạn nắm vững kiến thức của trình độ này, các bạn có thể viết một đoạn văn tương đối hoàn chỉnh giới thiệu gia đình nhiều thế hệ, kể về một người họ hàng hoặc thuật lại một sự kiện gia đình quen thuộc như sinh nhật, đám cưới, ngày kỷ niệm.\n\n---\n\n## 2. Vận dụng viết đoạn văn về gia đình ở trình độ A2 (5 bài đọc thực hành song ngữ)\n\n### Chủ đề 1 - Gia đình lớn của tôi (Тема 1 - Моя большая семья)\n\n#### Tiếng Nga (có trọng âm):\n> Меня́ зову́т А́нна. Я живу́ в большо́м го́роде вме́сте со свое́й семьёй. В на́шей семье́ шесть челове́к: ма́ма, па́па, ста́рший бра́т, мла́дшая сестра́, ба́бушка и я. Мою́ ма́му зову́т Еле́на, а па́пу – Алекса́ндр. Ма́ма рабо́тает врачо́м в больни́це, а па́па рабо́тает инжене́ром. Мой ста́рший бра́т у́чится в университе́те, а мла́дшая сестра́ хо́дит в шко́лу. Моя́ ба́бушка уже́ не рабо́тает, поэ́тому она́ ча́сто гото́вит обе́д и giúp chúng tôi làm việc nhà (*помога́ет нам по до́му*).\n>\n> По выходны́м вся на́ша семья́ обы́чно собира́ется вме́сте. Мы за́втракаем, разгова́риваем и расска́зываем друг дру́гу о после́дних но́востях. Иногда́ мы гуля́ем в па́рке и́ли хо́дим в го́сти к ро́дственникам. Я о́чень люблю́ свою́ семью́, потому́ что мы всегда́ giúp đỡ và ủng hộ lẫn nhau (*помога́ем и подде́рживаем друг дру́га*).\n\n#### Bản dịch tiếng Việt:\n> Tên tôi là Anna. Tôi sống ở một thành phố lớn cùng với gia đình mình. Gia đình tôi có sáu người: mẹ, bố, anh trai, em gái, bà và tôi. Mẹ tôi tên là Elena, còn bố tôi tên là Alexander. Mẹ làm bác sĩ ở bệnh viện, còn bố làm kỹ sư. Anh trai tôi học ở trường đại học, còn em gái tôi đi học ở trường phổ thông. Bà tôi hiện không còn đi làm nữa, vì vậy bà thường nấu bữa trưa và giúp chúng tôi làm việc nhà.\n>\n> Vào cuối tuần, cả gia đình tôi thường tụ họp cùng nhau. Chúng tôi ăn sáng, trò chuyện và kể cho nhau nghe những tin tức mới nhất. Đôi khi chúng tôi đi dạo trong công viên hoặc đến thăm họ hàng. Tôi rất yêu gia đình mình vì chúng tôi luôn giúp đỡ và ủng hộ lẫn nhau.\n\n---\n\n### Chủ đề 2 - Họ hàng của tôi (Тема 2 - Мои родственники)\n\n#### Tiếng Nga (có trọng âm):\n> У меня́ больша́я семья́, поэ́тому у меня́ мно́го ро́дственников. У мое́й ма́мы есть ста́ршая сестра́ и мла́дший бра́т. Мою́ тётю зову́т О́льга, а моего́ дя́дю – Серге́й. Тётя О́льга за́мужем, у неё есть муж и две до́чери. Мои́ двою́родные сёстры у́чатся в шко́ле. Они́ о́чень весёлые и лю́бят игра́ть вме́сте. А мой дя́дя ещё не жена́т, он о́чень тре́бователен ко мне, но он о́чень до́брый и внима́тельный.\n>\n> У моего́ па́пы то́же есть брат. Его́ зову́т Ви́ктор. Он жена́т и живёт в друго́м го́роде вме́сте со свое́й жено́й и сы́ном. Его́ сын – мой двою́родный брат. Мы не ча́сто встреча́емся, потому́ что живём далеко́ друг от дру́га, но иногда́ звони́м друг дру́гу и разгова́риваем по телефо́ну.\n>\n> Я люблю́ навеща́ть свои́х ро́дственников во вре́мя кани́кул. Когда́ мы встреча́емся, мы вме́сте обе́даем, гуля́ем и расска́зываем интере́сные исто́рии. Мне нра́вится проводи́ть вре́мя с двою́родными бра́тьями и сёстрами, потому́ что нам всегда́ ве́село вме́сте.\n\n#### Bản dịch tiếng Việt:\n> Tôi có một gia đình đông người, vì vậy tôi có rất nhiều họ hàng. Mẹ tôi có một người chị gái và một người em trai. Dì tôi tên là Olga, còn chú tôi tên là Sergey. Dì Olga đã kết hôn, dì có chồng và hai con gái. Các chị em họ của tôi đang học ở trường phổ thông. Họ rất vui vẻ và thích chơi đùa cùng nhau. Còn chú tôi vẫn chưa kết hôn, chú khá nghiêm khắc đối với tôi nhưng chú rất tốt bụng và chu đáo.\n>\n> Bố tôi cũng có một người anh trai. Bác tên là Viktor. Bác đã kết hôn và sống ở một thành phố khác cùng với vợ và con trai. Con trai của bác là anh họ của tôi. Chúng tôi không thường xuyên gặp nhau vì sống cách xa nhau, nhưng đôi khi chúng tôi gọi điện thoại và trò chuyện với nhau.\n>\n> Tôi thích đến thăm họ hàng vào kỳ nghỉ. Khi gặp nhau, chúng tôi cùng ăn trưa, đi dạo và kể cho nhau nghe những câu chuyện thú vị. Tôi thích dành thời gian bên các anh chị em họ vì chúng tôi luôn vui vẻ khi ở bên nhau.\n\n---\n\n### Chủ đề 3 - Chị gái và anh trai của tôi (Тема 3 - Моя сестра и мой брат)\n\n#### Tiếng Nga (có trọng âm):\n> Моя́ ста́ршая сестра́ Мари́я неда́вно вы́шла за́муж. Её му́жа зову́т Андре́й, и тепе́рь они́ живу́т вме́сте в небольшо́й кварти́ре. Андре́й рабо́тает программи́стом, а Мари́я рабо́тает учи́телем в шко́ле. Они́ познако́мились в университе́те и не́сколько лет встреча́лись, пре́жде чем реши́ли пожени́ться. Моя́ сестра́ и её муж лю́бят путеше́ствовать, поэ́тому ка́ждый год они́ е́здят в ра́зные города́.\n>\n> Мои́ роди́тели о́чень ра́ды, что в на́шей семье́ появи́лся но́вый челове́к. Андре́й ча́сто прихо́дит к нам в го́сти. Он хорошо́ обща́ется с мои́м па́пой и giúp mẹ nấu bữa tối (*помога́ет ма́ме гото́вить у́жин*).\n>\n> У моего́ бра́та пока́ нет жены́. Он ещё не жена́т и сейча́с у́чится в университе́те. Он говори́т, что снача́ла хо́чет зако́нчить учёбу и найти́ хоро́шую рабо́ту, а пото́м созда́ть свою́ семью́.\n\n#### Bản dịch tiếng Việt:\n> Chị gái tôi, Maria, gần đây đã kết hôn. Chồng chị tên là Andrey, và bây giờ họ sống cùng nhau trong một căn hộ nhỏ. Andrey làm lập trình viên, còn Maria làm giáo viên ở trường học. Họ quen nhau ở trường đại học và đã hẹn hò vài năm trước khi quyết định kết hôn. Chị tôi và chồng thích đi du lịch, vì vậy mỗi năm họ đều đến những thành phố khác nhau.\n>\n> Bố mẹ tôi rất vui vì bây giờ gia đình chúng tôi có thêm một thành viên. Andrey thường đến nhà chúng tôi chơi. Anh ấy trò chuyện rất tốt với bố tôi và giúp mẹ chuẩn bị bữa tối.\n>\n> Anh trai tôi hiện chưa có vợ. Anh ấy vẫn chưa kết hôn và hiện đang học ở trường đại học. Anh ấy nói rằng trước tiên muốn hoàn thành việc học và tìm một công việc tốt, sau đó mới xây dựng gia đình riêng.\n\n---\n\n### Chủ đề 4 - Đám cưới của chị gái tôi (Тема 4 - Свадьба моей сестры)\n\n#### Tiếng Nga (có trọng âm):\n> В про́шлом ме́сяце в на́шей семье́ был большо́й пра́здник – сва́дьба мое́й ста́ршей сестры́. Она́ вы́шла за́муж за своего́ люби́мого челове́ка, кото́рого зову́т Михаи́л. Сва́дьба состоя́лась в суббо́ту в краси́вом рестора́не. На пра́здник пришли́ роди́тели, ба́бушки, де́душки, дя́ди, тёти, двою́родные бра́тья и сёстры, а та́кже друзья́ жениха́ и неве́сты.\n>\n> Утро́м моя́ ма́ма giúp chị chuẩn bị cho đám cưới (*помога́ла сестре́ гото́виться к сва́дьбе*). Она́ помогла́ ей наде́ть пла́тье и сде́лать причёску. Па́па встре́тил госте́й у вхо́да в рестора́н. Все го́сти поздравля́ли молодожёнов, дари́ли им пода́рки и жела́ли сча́стья. Во вре́мя пра́здника мы мно́го е́ли, танцева́ли, пе́ли пе́сни и фотографи́ровались вме́сте.\n>\n> Ве́чером все ро́дственники разгова́ривали, вспомина́ли интере́сные исто́рии и смотре́ли фотогра́фии. Моя́ ба́бушка да́же спе́ла краси́вую пе́сню для молодожёнов. Сва́дьба была́ о́чень весёлой и краси́вой. Я была́ ра́да, что на́ша семья́ собрала́сь вме́сте в э́тот осо́бенный день.\n\n#### Bản dịch tiếng Việt:\n> Tháng trước, gia đình chúng tôi có một buổi tiệc lớn – đám cưới của chị gái tôi. Chị đã kết hôn với người mình yêu, tên là Mikhail. Đám cưới diễn ra vào thứ Bảy tại một nhà hàng đẹp. Bố mẹ, ông bà, chú bác, cô dì, các anh chị em họ cũng như bạn bè của cô dâu và chú rể đều đến dự.\n>\n> Vào buổi sáng, mẹ tôi giúp chị chuẩn bị cho đám cưới. Mẹ giúp chị mặc váy và làm tóc. Bố tôi đón khách ở lối vào nhà hàng. Tất cả khách mời chúc mừng đôi vợ chồng mới cưới, tặng quà và chúc họ hạnh phúc. Trong buổi tiệc, chúng tôi ăn uống rất nhiều, nhảy múa, hát và chụp ảnh cùng nhau.\n>\n> Vào buổi tối, tất cả họ hàng trò chuyện, nhớ lại những câu chuyện thú vị và xem ảnh. Bà tôi thậm chí còn hát một bài hát hay dành tặng đôi vợ chồng. Đám cưới đã diễn ra rất vui vẻ và đẹp đẽ. Tôi đã rất vui vì cả gia đình đã tụ họp cùng nhau trong ngày đặc biệt này.\n\n---\n\n### Chủ đề 5 - Ngày sinh nhật của bà (Тема 5 - День рождения бабушки)\n\n#### Tiếng Nga (có trọng âm):\n> В про́шлое воскресе́нье мы пра́здновали день рожде́ния мое́й ба́бушки. Ей испо́лнилось се́мьдесят лет. Мы реши́ли устро́ить семе́йный пра́здник у неё до́ма, потому́ что ба́бушка лю́бит проводи́ть вре́мя со свои́ми детьми́ и вну́ками.\n>\n> Утро́м моя́ ма́ма и тётя гото́вили обе́д. Па́па и дя́дя покупа́ли проду́кты и украша́ли ко́мнату возду́шными шара́ми. Я giúp bày bàn ăn (*помога́ла накрыва́ть на стол*), а мой мла́дший брат гото́вил поздрави́тельную откры́тку для ба́бушки. Мои́ двою́родные бра́тья и сёстры то́же пришли́ на пра́здник и принесли́ цветы́ và пода́рки.\n>\n> Когда́ ба́бушка вошла́ в ко́мнату, все го́сти поздра́вили её с днём рожде́ния. Мы подари́ли ей краси́вый буке́т цвето́в и большо́й торт. Ба́бушка была́ о́чень ра́да и поблагодари́ла всех за пода́рки. По́сле обе́да мы пи́ли чай, разгова́ривали и смотре́ли семе́йные фотогра́фии. Мы вспомина́ли, как ра́ньше проводи́ли пра́здники вме́сте.\n>\n> Ве́чер прошёл о́чень хорошо́. Ба́бушка сказа́ла, что для неё са́мое гла́вное – э́то здоро́вье и сча́стье её дете́й и вну́ков. Мне то́же о́чень понра́вился э́тот пра́здник, потому́ что я смогла́ уви́деть всех свои́х ро́дственников и провести́ с ни́ми вре́мя.\n\n#### Bản dịch tiếng Việt:\n> Chủ nhật tuần trước, chúng tôi đã tổ chức sinh nhật cho bà. Bà đã tròn 70 tuổi. Chúng tôi quyết định tổ chức một buổi tiệc gia đình tại nhà bà vì bà thích dành thời gian bên con cái và các cháu.\n>\n> Vào buổi sáng, mẹ và dì tôi chuẩn bị bữa trưa. Bố và chú tôi đi mua thực phẩm và trang trí căn phòng bằng những quả bóng bay. Tôi giúp bày bàn ăn, còn em trai tôi chuẩn bị một tấm thiệp chúc mừng dành cho bà. Các anh chị em họ của tôi cũng đến dự tiệc và mang theo hoa cùng quà.\n>\n> Khi bà bước vào phòng, tất cả khách mời đều chúc mừng sinh nhật bà. Chúng tôi tặng bà một bó hoa đẹp và một chiếc bánh sinh nhật lớn. Bà đã rất vui và cảm ơn mọi người vì những món quà. Sau bữa trưa, chúng tôi uống trà, trò chuyện và xem những bức ảnh gia đình. Chúng tôi nhớ lại những ngày trước đây khi cùng nhau tổ chức các ngày lễ.\n>\n> Buổi tối diễn ra rất tốt đẹp. Bà nói rằng điều quan trọng nhất đối với bà là sức khỏe và hạnh phúc của con cái và các cháu. Tôi cũng rất thích buổi tiệc này vì tôi có thể gặp tất cả họ hàng và dành thời gian bên họ.\n\n---\n\n## 3. Hệ thống Từ vựng Mở rộng A2 (Danh từ họ hàng, Động từ đòi cách & Tính từ tính cách)\n\n### A. Danh từ chỉ họ hàng và mối quan hệ gia tộc (30 từ)\n| Từ vựng | Từ loại | Nghĩa tiếng Việt | Ví dụ minh họa |\n|---|:---:|---|---|\n| **ро́дственники** | *сущ. pl* | họ hàng | Ле́том я навеща́ю ро́дственников. |\n| **дру́жная семья́** | *сущ. f* | gia đình hòa thuận | Мы дру́жная семья́. |\n| **тётя** | *сущ. f* | cô, dì, bác gái | Мы собира́емся у тёти в воскресе́нье. |\n| **дя́дя** | *сущ. m* | chú, bác, cậu | Мой па́па горди́тся дя́дей. |\n| **двою́родный бра́т** | *сущ. m* | anh/em họ (nam) | Мы всегда́ подде́рживаем двою́родного бра́та. |\n| **двою́родная сестра́** | *сущ. f* | chị/em họ (nữ) | Моя́ двою́родная сестра́ живёт в Москве́. |\n| **племя́нник** | *сущ. m* | cháu trai (con anh/chị/em) | Мой племя́нник о́чень любозна́тельный. |\n| **племя́нница** | *сущ. f* | cháu gái (con anh/chị/em) | Моя́ племя́нница лю́бит рисова́ть. |\n| **свекро́вь** | *сущ. f* | mẹ chồng | Моя́ свекро́вь о́чень терпели́вая. |\n| **свёкор** | *сущ. m* | bố chồng | Мой свёкор рабо́тает на да́че. |\n| **тёща** | *сущ. f* | mẹ vợ | Моя́ тёща всегда́ доброжела́тельная. |\n| **тесть** | *сущ. m* | bố vợ | Мой тесть стро́гий, но справедли́вый. |\n| **неве́стка** | *сущ. f* | con dâu, chị/em dâu | Моя́ неве́стка о́чень внима́тельная. |\n| **зять** | *сущ. m* | con rể, anh/em rể | Наш зять трудолюби́вый. |\n| **де́душка и ба́бушка** | *сущ. pl* | ông bà | Де́душка и ба́бушка живу́т в дере́вне. |\n| **вну́к** | *сущ. m* | cháu trai (của ông bà) | Ба́бушка забо́тится о вну́ке. |\n| **вну́чка** | *сущ. f* | cháu gái (của ông bà) | Де́душка игра́ет с вну́чкой. |\n| **роди́тели** | *сущ. pl* | cha mẹ | Мои́ роди́тели рабо́тают в шко́ле. |\n| **пре́дки** | *сущ. pl* | tổ tiên | Мы уважа́ем свои́х пре́дков. |\n| **поколе́ние** | *сущ. n* | thế hệ | Ста́ршее поколе́ние помога́ет мла́дшему. |\n| **мла́дший бра́т** | *сущ. m* | em trai | Мой мла́дший бра́т хо́дит в шко́лу. |\n| **ста́рший бра́т** | *сущ. m* | anh trai | Мой ста́рший бра́т у́чится в университе́те. |\n| **мла́дшая сестра́** | *сущ. f* | em gái | Моя́ мла́дшая сестра́ лю́бит игра́ть в ку́клы. |\n| **ста́ршая сестра́** | *сущ. f* | chị gái | Моя́ ста́ршая сестра́ вы́шла за́муж. |\n| **близнецы́** | *сущ. pl* | cặp song sinh | В на́шей семье́ родили́сь близнецы́. |\n| **брак** | *сущ. m* | hôn nhân | Их брак о́чень кре́пкий. |\n| **сва́дьба** | *сущ. f* | đám cưới | Мы бы́ли на сва́дьбе сестры́. |\n| **жени́х** | *сущ. m* | chú rể | Жени́х подари́л неве́сте цветы́. |\n| **неве́ста** | *сущ. f* | cô dâu | Неве́ста была́ в краси́вом бе́лом пла́тье. |\n| **юбиле́й** | *сущ. m* | lễ kỷ niệm năm tròn, mừng thọ | Мы пра́здновали юбиле́й ба́бушки. |\n\n### B. Động từ tương tác gia đình & Cấu trúc cách (28 từ)\n| Động từ | Cấu trúc đòi cách | Cách | Ví dụ minh họa |\n|---|---|:---:|---|\n| **жени́ться** | на ком? | Cách 6 | Мой брат жени́лся на свое́й одноку́рснице. |\n| **выходи́ть за́муж** | за кого́? | Cách 4 | Сестра́ вы́шла за́муж за хоро́шего челове́ка. |\n| **пожени́ться** | кто с кем? | Cách 1 | Они́ познако́мились и реши́ли пожени́ться. |\n| **разводи́ться** | с кем? | Cách 5 | Они́ прожи́ли де́сять лет и развели́сь. |\n| **рожда́ться** | у кого́? / где? | Cách 6 | В про́шлом году́ у нас роди́лся сын. |\n| **воспи́тывать** | кого́? | Cách 4 | Роди́тели воспи́тывают дете́й в любви́. |\n| **забо́титься** | о ком? | Cách 6 | Ба́бушка забо́тится обо всех вну́ках. |\n| **уха́живать** | за кем? | Cách 5 | Дочь уха́живает за больно́й ма́мой. |\n| **помога́ть** | кому́? | Cách 3 | Де́ти всегда́ помога́ют роди́телям по до́му. |\n| **ссо́риться** | с кем? | Cách 5 | Бра́тья и́ногда ссо́рятся из-за игру́шек. |\n| **мири́ться** | с кем? | Cách 5 | Они́ бы́стро помири́лись по́сле спо́ра. |\n| **уважа́ть** | кого́? | Cách 4 | Мы о́чень уважа́ем ста́рших. |\n| **горди́ться** | кем? | Cách 5 | Мой па́па горди́тся дя́дей. |\n| **доверя́ть** | кому́? | Cách 3 | Я о́чень доверя́ю двою́родной сестре́. |\n| **скуча́ть** | по кому́? / по чему́? | Cách 3 | Я о́чень скуча́ю по семье́. |\n| **навеща́ть** | кого́? | Cách 4 | Ле́том я навеща́ю свои́х ро́дственников. |\n| **поздравля́ть** | кого́? с чем? | Cách 4 + 5 | Все поздра́вили ба́бушку с юбиле́ем. |\n| **собира́ться** | где? | Cách 6 | Вся семья́ собира́ется у ба́бушки до́ма. |\n| **подде́рживать** | кого́? | Cách 4 | Мы всегда́ подде́рживаем друг дру́га. |\n| **руга́ть** | кого́? за что́? | Cách 4 | Ма́ма руга́ет сы́на за плохи́е оце́нки. |\n| **хвали́ть** | кого́? за что́? | Cách 4 | Оте́ц хва́лит до́чь за успе́хи в учёбе. |\n| **нака́зывать** | кого́? | Cách 4 | Роди́тели ре́дко нака́зывают дете́й. |\n| **проща́ть** | кого́? / что́? | Cách 4 | Ба́бушка всегда́ проща́ет на́ши ша́лости. |\n| **ра́довать** | кого́? | Cách 4 | Вну́ки ра́дуют де́душку свои́ми успе́хами. |\n| **огорча́ть** | кого́? | Cách 4 | Плохи́е но́вости огорча́ют роди́телей. |\n| **обнима́ть** | кого́? | Cách 4 | Ма́ма не́жно обнима́ет до́чку. |\n| **целова́ть** | кого́? | Cách 4 | Ба́бушка целу́ет вну́ка пе́ред сном. |\n| **обеща́ть** | кому́? что́? | Cách 3 + 4 | Сын обеща́л па́пе хорошо́ учи́ться. |\n\n### C. Tính từ miêu tả tính cách & Cặp từ trái nghĩa (20 từ)\n| Từ vựng | Từ trái nghĩa | Nghĩa tiếng Việt | Ví dụ minh họa |\n|---|---|---|---|\n| **самостоя́тельный** | несамостоя́тельный | tự lập / chưa tự lập | Наш сын уже́ самостоя́тельный, а дочь ещё несамостоя́тельная. |\n| **трудолюби́вый** | лени́вый | chăm chỉ / lười biếng | Наш зять трудолюби́вый, а его́ брат лени́вый. |\n| **забо́тливый** | равноду́шный | chu đáo, ân cần / vô tâm | Моя́ ма́ма о́чень забо́тливая, она́ никому́ не равноду́шна. |\n| **стро́гий** | мя́гкий | nghiêm khắc / mềm mỏng, hiền từ | Оте́ц стро́гий, а ба́бушка о́чень мя́гкая. |\n| **общи́тельный** | за́мкнутый | cởi mở, hòa đồng / khép kín | Мой брат общи́тельный, а сестра́ за́мкнутая. |\n| **до́брый** | злой | tốt bụng / hung dữ | Наш де́душка о́чень до́брый. |\n| **терпели́вый** | нетерпели́вый | kiên nhẫn / nóng vội | Свекро́вь о́чень терпели́вая. |\n| **внима́тельный** | невнима́тельный | ân cần, chú ý / lơ đãng | Дя́дя о́чень внима́тельный к племя́нникам. |\n| **ще́дрый** | жа́дный | hào phóng / keo kiệt | Наш де́душка ще́дрый, да́рит всем пода́рки. |\n| **весёлый** | гру́стный | vui vẻ / buồn bã | Мои́ двою́родные сёстры о́чень весёлые. |\n",
    "created_at": "2026-11-19T15:59:08.259469+00:00",
    "updated_at": "2026-11-20T13:57:16.978011+00:00"
  },
  {
    "id": "3f3b5905-60c8-491a-a926-6ece8c2ddda3",
    "code": "lesson_vocab_b1_thanh_vien_gia_dinh",
    "jar_id": "b1000000-0000-0000-0000-000000000003",
    "title": "Bài học Từ vựng B1: Đời sống & Quan hệ gia đình",
    "level": "B1",
    "content_md": "# Chủ đề B1: Mở rộng Mối quan hệ và Đời sống Gia đình (Семейные ценности и устои)\n\n## 1. Giới thiệu chủ đề & Bước ngoặt nhận thức (Trình độ B1)\nCó thể nói rằng, đây là cấp độ đánh dấu một bước chuyển quan trọng về kiến thức cũng như trong cách học. Bạn không chỉ còn miêu tả ai là ai trong gia đình, làm nghề gì, tính cách hay ngoại hình ra sao nữa, mà còn học cách nói về những vấn đề quen thuộc của đời sống gia đình như vai trò của các thành viên trong gia đình, mối quan hệ giữa các thế hệ hay kế hoạch chung,…. Các bạn sẽ tập nêu quan điểm, giải thích nguyên nhân và kể lại trải nghiệm của mình. Vốn từ vựng cũng được mở rộng từ giao tiếp cơ bản sang những từ diễn đạt cảm xúc, ý kiến và các khái niệm trừu tượng đơn giản.\n\nVì vậy, học từ qua bảng liệt kê kèm ví dụ riêng cho từng từ sẽ không còn là cách hiệu quả nhất ở cấp độ này. RUSI sẽ giúp bạn học từ vựng qua các đoạn văn ví dụ, để bạn thấy cách vận dụng những từ mang tính trừu tượng, vốn khó hình dung trong ngữ cảnh thực tế. Thêm nữa, để ghi nhớ lâu hơn, các bạn có thể kết hợp với các bài luyện viết và luyện nghe do chúng mình cung cấp, nhờ đó các bạn sẽ được dùng lại từ mới nhiều lần ở cả hai kỹ năng.\n\n---\n\n## 2. Các Bài đọc Ngữ cảnh & Bảng Từ vựng Chuyên đề B1 (Song ngữ Nga - Việt)\n\n### Đoạn 1: Giá trị và Truyền thống Gia đình (Семе́йные це́нности и тради́ции)\n\n#### Tiếng Nga (có trọng âm):\n> Семья́ игра́ет ва́жную роль в жи́зни ка́ждого челове́ка. И́менно в семье́ формиру́ются основны́е це́нности, таки́е как любо́вь, уваже́ние, дове́рие и взаимопонима́ние.\n>\n> Семе́йные це́нности giúp con người cảm nhận sự gắn kết (*помога́ют лю́дям чу́вствовать принадле́жность к свое́й семье́ и о́бществу*). Кро́ме того́, семе́йные усто́и и тради́ции передаю́тся от ста́ршего поколе́ния к мла́дшему. Наприме́р, во мно́гих се́мьях при́нято вме́сте отмеча́ть пра́здники, собира́ться за одни́м столо́м и giúp đỡ họ hàng (*помога́ть ро́дственникам*).\n>\n> Така́я прее́мственность поколе́ний giúp duy trì quan hệ dòng họ và củng cố tình cảm (*помога́ет сохраня́ть ро́дственные свя́зи и укрепля́ть семе́йные отноше́ния*). Я счита́ю, что кре́пкая семья́ — э́то осно́ва семе́йного благополу́чия и счастли́вой жи́зни.\n\n#### Bản dịch tiếng Việt:\n> Gia đình đóng vai trò quan trọng trong cuộc sống của mỗi người. Chính trong gia đình, những giá trị cơ bản như tình yêu thương, sự tôn trọng, niềm tin và sự thấu hiểu được hình thành.\n>\n> Các giá trị gia đình giúp con người cảm nhận được sự thuộc về gia đình và xã hội. Ngoài ra, những nề nếp và truyền thống gia đình được truyền từ thế hệ lớn tuổi sang thế hệ trẻ. Ví dụ, trong nhiều gia đình, mọi người thường cùng nhau tổ chức các ngày lễ, quây quần bên một bàn ăn và giúp đỡ họ hàng.\n>\n> Sự kế thừa giữa các thế hệ như vậy giúp duy trì quan hệ họ hàng và củng cố các mối quan hệ gia đình. Tôi cho rằng một gia đình bền chặt là nền tảng của hạnh phúc gia đình và cuộc sống hạnh phúc.\n\n#### Danh sách cụm từ & Cấu trúc tương ứng trích từ Đoạn 1 (15 cụm từ):\n| Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài đọc |\n|---|---|---|\n| **основны́е це́нности** | формиру́ются что? | И́менно в семье́ формиру́ются основны́е це́нности, таки́е как любо́вь, уваже́ние, дове́рие и взаимопонима́ние. |\n| **семе́йная це́нность** | ценность кого/чего? | Семе́йные це́нности помога́ют лю́дям чу́вствовать принадле́жность к свое́й семье́ и о́бществу. |\n| **чу́вствовать принадле́жность** | к кому/чему? (Д.п.) | Семе́йные це́нности помога́ют лю́дям чу́вствовать принадле́жность к свое́й семье́ и о́бществу. |\n| **семе́йные усто́и và тради́ции** | устои чего? | Кро́ме того́, семе́йные усто́и и тради́ции передаю́тся от ста́ршего поколе́ния к мла́дшему. |\n| **передава́ться от кого к кому** | от Р.п. к Д.п. | Тради́ции передаю́тся от ста́ршего поколе́ния к мла́дшему. |\n| **ста́ршее поколе́ние** | поколение кого/чего? | О́пыт передаётся от ста́ршего поколе́ния. |\n| **мла́дшее поколе́ние** | поколение кого/чего? | Мла́дшее поколе́ние перенима́ет семе́йные тради́ции. |\n| **при́нято отмеча́ть** | при́нято + инф. | Во мно́гих се́мьях при́нято вме́сте отмеча́ть пра́здники. |\n| **собира́ться за одни́м столо́м** | за чем? (Т.п.) | Семья́ лю́бит собира́ться за одни́м столо́м. |\n| **помога́ть ро́дственникам** | помога́ть кому? (Д.п.) | При́нято помога́ть ро́дственникам в тру́дную мину́ту. |\n| **прее́мственность поколе́ний** | преемственность чего? | Така́я прее́мственность поколе́ний помога́ет сохраня́ть свя́зи. |\n| **сохраня́ть ро́дственные свя́зи** | сохраня́ть что? (В.п.) | Прее́мственность помога́ет сохраня́ть ро́дственные свя́зи. |\n| **укрепля́ть семе́йные отноше́ния**| укрепля́ть что? (В.п.) | Об́щие пра́здники помога́ют укрепля́ть семе́йные отноше́ния. |\n| **кре́пкая семья́** | прилагательное + сущ. | Я счита́ю, что кре́пкая семья́ — э́то осно́ва благополу́чия. |\n| **семе́йное благополу́чие** | благополучие чего? | Кре́пкая семья́ — осно́ва семе́йного благополу́чия. |\n\n---\n\n### Đoạn 2: Các Mô hình Gia đình trong Xã hội Hiện đại (Моде́ли семе́й в совреме́нном о́бществе)\n\n#### Tiếng Nga (có trọng âm):\n> В совреме́нном о́бществе существу́ют ра́зные ти́пы семе́й. Са́мой распространённой моде́лью счита́ется нуклеа́рная семья́, кото́рая состои́т из роди́телей и дете́й. Одна́ко не́которые лю́ди живу́т в расши́ренных се́мьях вме́сте с ба́бушками, де́душками и други́ми ро́дственниками.\n>\n> Та́кже существу́ют многоде́тные се́мьи, в кото́рых воспи́тываются трое и бо́лее дете́й, и непо́лные се́мьи, где ребёнка воспи́тывает то́лько оди́н из роди́телей. Кро́ме того́, в совреме́нном о́бществе мо́жно встре́тить сме́шанные се́мьи, где у супру́гов есть де́ти от преды́дущих бра́ков.\n>\n> Незави́симо от фо́рмы семьи́, са́мое гла́вное — э́то благополу́чие дете́й, взаи́мная подде́ржка и тёплая атмосфе́ра в до́ме.\n\n#### Bản dịch tiếng Việt:\n> Trong xã hội hiện đại tồn tại các kiểu gia đình khác nhau. Mô hình phổ biến nhất được coi là gia đình hạt nhân, bao gồm cha mẹ và con cái. Tuy nhiên, một số người sống trong gia đình mở rộng cùng với ông bà và những người họ hàng khác.\n>\n> Ngoài ra còn có các gia đình đông con, nơi nuôi dạy từ ba con trở lên, và gia đình đơn thân, nơi chỉ có một trong hai cha mẹ nuôi dạy con. Hơn nữa, trong xã hội hiện đại có thể bắt gặp các gia đình tái hợp (gia đình ghép), nơi vợ chồng có con riêng từ các cuộc hôn nhân trước.\n>\n> Bất kể hình thức gia đình là gì, điều quan trọng nhất vẫn là hạnh phúc của con cái, sự ủng hộ lẫn nhau và bầu không khí ấm áp trong gia đình.\n\n#### Danh sách cụm từ & Cấu trúc tương ứng trích từ Đoạn 2 (15 cụm từ):\n| Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài đọc |\n|---|---|---|\n| **существова́ть** | существова́ть что? | В совреме́нном о́бществе существу́ют ра́зные ти́пы семе́й. |\n| **распространённая моде́ль** | прилагательное + сущ. | Са́мой распространённой моде́лью счита́ется нуклеа́рная семья́. |\n| **нуклеа́рная семья́** | модель семьи | Са́мой распространённой моде́лью счита́ется нуклеа́рная семья́. |\n| **расши́ренная семья́** | модель семьи | Не́которые лю́ди живу́т в расши́ренных се́мьях вме́сте с ро́дственниками. |\n| **многоде́тная семья́** | модель семьи | Многоде́тные се́мьи воспи́тывают трои́х и бо́лее дете́й. |\n| **воспи́тываться** | воспи́тываться где? | В многоде́тных се́мьях воспи́тываются трое и бо́лее дете́й. |\n| **непо́лная семья́** | модель семьи | В непо́лных се́мьях ребёнка воспи́тывает то́лько оди́н из роди́телей. |\n| **сме́шанная семья́** | модель семьи | В совреме́нном о́бществе мо́жно встре́тить сме́шанные се́мьи. |\n| **супру́ги** | сущ. pl | У супру́гов есть де́ти от преды́дущих бра́ков. |\n| **преды́дущий брак** | предлог + сущ. (Р.п.) | Де́ти от преды́дущих бра́ков живу́т вме́сте с роди́телями. |\n| **незави́симо от фо́рмы семьи́** | незави́симо от чего? (Р.п.) | Незави́симо от фо́рмы семьи́, са́мое гла́вное — э́то благополу́чие дете́й. |\n| **благополу́чие дете́й** | благополучие кого? (Р.п.) | Гла́вное — э́то благополу́чие дете́й. |\n| **взаи́мная подде́ржка** | сущ. f | Взаи́мная подде́ржка помога́ет преодолева́ть тру́дности. |\n| **тёплая атмосфе́ра** | атмосфера в чём? | Тёплая атмосфе́ра в до́ме согревает всех членов семьи́. |\n| **фо́рма семьи́** | форма чего? (Р.п.) | Ка́ждая фо́рма семьи́ име́ет свои́ осо́бенности. |\n\n---\n\n### Đoạn 3: Phân chia Vai trò và Trách nhiệm của Cha mẹ (Распределе́ние роле́й и роди́тельская отве́тственность)\n\n#### Tiếng Nga (có trọng âm):\n> Ка́ждый член семьи́ игра́ет определённую роль и несёт отве́тственность за о́бщее благополу́чие. Роди́тельская отве́тственность заключа́ется не то́лько в том, что́бы обеспе́чивать дете́й всем необходи́мым, но и в том, что́бы забо́титься об их воспита́нии и разви́тии. Роди́тели должны́ ока́зывать де́тям эмоциона́льную подде́ржку, giúp đỡ chúng khôn lớn, học tập và trở nên tự lập (*помога́ть им расти́, учи́ться и станови́ться самостоя́тельными*).\n>\n> В то же вре́мя совреме́нные супру́ги всё ча́ще де́лят семе́йные обя́занности по́ровну: вме́сте реша́ют бытовы́е вопро́сы, ведут семе́йный бюдже́t và chăm sóc con cái (*забо́тятся о де́тях*). Справедли́вое распределе́ние обя́занностей và trách nhiệm chung (*совме́стная отве́тственность*) giúp tạo dựng một bầu không khí gia đình lành mạnh (*помога́ют созда́ть здоро́вую семе́йную атмосфе́ру*).\n\n#### Bản dịch tiếng Việt:\n> Mỗi thành viên trong gia đình đóng một vai trò nhất định và chịu trách nhiệm về hạnh phúc chung. Trách nhiệm của cha mẹ không chỉ nằm ở việc chu cấp cho con cái mọi thứ cần thiết, mà còn ở việc chăm lo cho việc giáo dục và phát triển của con. Cha mẹ cần hỗ trợ tinh thần cho con cái, giúp con khôn lớn, học tập và trở nên tự lập.\n>\n> Đồng thời, vợ chồng hiện đại ngày càng chia sẻ đều các nghĩa vụ gia đình: cùng nhau giải quyết các công việc gia đình, quản lý ngân sách gia đình và chăm sóc con cái. Sự phân chia công bằng các trách nhiệm và trách nhiệm chung giúp tạo ra một bầu không khí gia đình lành mạnh.\n\n#### Danh sách cụm từ & Cấu trúc tương ứng trích từ Đoạn 3 (18 cụm từ):\n| Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài đọc |\n|---|---|---|\n| **определённая роль** | игра́ть роль | Ка́ждый член семьи́ игра́ет определённую роль. |\n| **нести́ отве́тственность** | за что? (В.п.) | Несёт отве́тственность за о́бщее благополу́чие. |\n| **роди́тельская отве́тственность**| сущ. f | Роди́тельская отве́тственность заключа́ется в забо́те о де́тях. |\n| **заключа́ться в чём** | в чём? (П.п.) | Отве́тственность заключа́ется в воспита́нии. |\n| **обеспе́чивать всем необходи́мым**| обеспе́чивать кого чем? | Обеспе́чивать дете́й всем необходи́мым для жи́зни. |\n| **забо́титься о воспита́нии** | забо́титься о чём? (П.п.) | Забо́титься об их воспита́нии и разви́тии. |\n| **ока́зывать подде́ржку** | ока́зывать кому что? | Роди́тели должны́ ока́зывать де́тям эмоциона́льную подде́ржку. |\n| **эмоциона́льная подде́ржка** | сущ. f | Эмоциона́льная подде́ржка важна́ для ребёнка. |\n| **станови́ться самостоя́тельным** | станови́ться кем/чем? (Т.п.) | Помога́ть де́тям расти́ и станови́ться самостоя́тельными. |\n| **дели́ть обя́занности по́ровну** | дели́ть что как? | Совреме́нные супру́ги де́лят обя́занности по́ровну. |\n| **семе́йные обя́занности** | сущ. pl | Дели́ть семе́йные обя́занности по́ровну. |\n| **реша́ть бытовы́е вопро́сы** | реша́ть что? (В.п.) | Вме́сте реша́ют бытовы́е вопро́сы. |\n| **вести́ семе́йный бюдже́т** | вести́ что? (В.п.) | Супру́ги вме́сте ведут семе́йный бюдже́т. |\n| **справедли́вое распределе́ние** | распределе́ние чего? | Справедли́вое распределе́ние обя́занностей укрепля́ет брак. |\n| **совме́стная отве́тственность** | сущ. f | Совме́стная отве́тственность помога́ет созда́ть гармо́нию. |\n| **здоро́вая семе́йная атмосфе́ра** | сущ. f | Помога́ют созда́ть здоро́вую семе́йную атмосфе́ру. |\n| **в то же вре́мя** | вводное сочетание | В то же вре́мя супру́ги де́лят обя́занности. |\n| **о́бщее благополу́чие** | благополучие чего? | Отвеча́ть за о́бщее благополу́чие всей семьи́. |\n\n---\n\n### Đoạn 4: Sự Thấu hiểu và Tin cậy giữa Cha mẹ và Con cái (Взаимопонима́ние и дове́рие ме́жду роди́телями и детьми́)\n\n#### Tiếng Nga (có trọng âm):\n> Отноше́ния ме́жду роди́телями и детьми́ игра́ют реша́ющую роль в формирова́нии ли́чности ребёнка. Довери́тельное отноше́ние позволя́ет де́тям откры́то дели́ться свои́ми пробле́мами, ра́достями и сомне́ниями, не боя́сь осужде́ния. Роди́тели име́ют бо́льше жи́зненного о́пыта, поэ́тому ча́сто мо́гут помо́чь де́тям tránh khỏi sai lầm (*избежа́ть оши́бок*).\n>\n> Одна́ко в пе́риод взросле́ния мо́гут возника́ть разногла́сия и конфли́кты из-за ра́зницы во взгля́дах. В таки́х ситуа́циях ва́жно уме́ть слу́шать друг дру́га, находи́ть компроми́сс и tôn trọng ý kiến của nhau (*уважа́ть мне́ние друг дру́га*). Отноше́ния, осно́ванные на уваже́нии, giúp con trẻ cảm thấy mình luôn được yêu thương, được bảo vệ và cần thiết (*чу́вствовать себя́ люби́мым, защищённым и ну́жным*).\n\n#### Bản dịch tiếng Việt:\n> Mối quan hệ giữa cha mẹ và con cái đóng vai trò quyết định trong việc hình thành nhân cách của trẻ. Mối quan hệ tin cậy cho phép con cái cởi mở chia sẻ những vấn đề, niềm vui và sự băn khoăn của mình mà không sợ bị phán xét. Cha mẹ có nhiều kinh nghiệm sống hơn, do đó thường có thể giúp con cái tránh khỏi sai lầm.\n>\n> Tuy nhiên, trong giai đoạn trưởng thành có thể nảy sinh những bất đồng và mâu thuẫn do sự khác biệt về quan điểm. Trong những tình huống như vậy, điều quan trọng là biết lắng nghe lẫn nhau, tìm kiếm sự thỏa hiệp và tôn trọng ý kiến của nhau. Những mối quan hệ dựa trên sự tôn trọng giúp đứa trẻ luôn cảm thấy mình được yêu thương, chở che và cần thiết.\n\n#### Danh sách cụm từ & Cấu trúc tương ứng trích từ Đoạn 4 (17 cụm từ):\n| Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài đọc |\n|---|---|---|\n| **реша́ющая роль** | игра́ть роль в чём? | Игра́ют реша́ющую роль в формирова́нии ли́чности. |\n| **формирова́ние ли́чности** | формирование кого/чего? | В формирова́нии ли́чности ребёнка. |\n| **довери́тельное отноше́ние** | отношение к кому? | Довери́тельное отноше́ние позволя́ет де́тям дели́ться мы́слями. |\n| **откры́то дели́ться** | дели́ться чем? (Т.п.) | Откры́то дели́ться свои́ми пробле́мами и ра́достями. |\n| **боя́ться осужде́ния** | боя́ться чего? (Р.п.) | Де́ти говоря́т открове́нно, не боя́сь осужде́ния. |\n| **жи́зненный о́пыт** | сущ. m | Роди́тели име́ют бо́льше жи́зненного о́пыта. |\n| **избежа́ть оши́бок** | избежа́ть чего? (Р.п.) | Помо́чь де́тям избежа́ть оши́бок. |\n| **пе́риод взросле́ния** | в период чего? (Р.п.) | В пе́риод взросле́ния возника́ют тру́дности. |\n| **возника́ть разногла́сия** | возника́ть из-за чего? | Мо́гут возника́ть разногла́сия и конфли́кты. |\n| **ра́зница во взгля́дах** | разница в чём? (П.п.) | Конфли́кты происхо́дят из-за ра́зницы во взгля́дах. |\n| **уме́ть слу́шать** | уме́ть + инф. | Ва́жно уме́ть слу́шать друг дру́га. |\n| **находи́ть компроми́сс** | находи́ть что? (В.п.) | Ва́жно находи́ть компроми́сс в спо́рах. |\n| **уважа́ть мне́ние** | уважа́ть что/кого? | Уважа́ть мне́ние друг дру́га. |\n| **осно́вываться на уваже́нии** | осно́вываться на чём? (П.п.) | Отноше́ния должны́ осно́вываться на уваже́нии. |\n| **чу́вствовать себя́ люби́мым** | чу́вствовать себя́ кем/каким? | Позволя́ет чу́вствовать себя́ люби́мым и ну́жным. |\n| **защищённый** | причастие/прил. | Ребёнок чу́вствует себя́ защищённым в семье́. |\n| **ну́жный** | прилагательное | Ка́ждый хо́чет чу́вствовать себя́ ну́жным. |\n",
    "created_at": "2026-11-19T15:59:08.259469+00:00",
    "updated_at": "2026-11-20T13:57:17.284302+00:00"
  },
  {
    "id": "ab6fe254-fa12-4d87-a84a-93e14b8dcd4c",
    "code": "lesson_vocab_b2_thanh_vien_gia_dinh",
    "jar_id": "b2000000-0000-0000-0000-000000000004",
    "title": "Bài học Từ vựng B2: Gia đình hiện đại & Nhân khẩu học",
    "level": "B2",
    "content_md": "# Chủ đề B2: Thảo luận các Vấn đề của Gia đình Hiện đại & Biến động Nhân khẩu học (Современная семья и демография)\n\n## 1. Giới thiệu chủ đề & Yêu cầu học thuật (Trình độ B2)\nỞ cấp độ này, bạn đi từ việc kể chuyện sang trao đổi quan điểm có lập luận về các vấn đề gia đình như vai trò của cha mẹ và con cái, cách nuôi dạy con, khoảng cách thế hệ, cân bằng giữa công việc và gia đình. Bạn học cách so sánh các ý kiến, đưa ra ưu và nhược điểm, phản biện một cách lịch sự và bảo vệ quan điểm của mình. Bạn đọc và nghe được các bài báo, phóng sự, phỏng vấn về chủ đề gia đình, đồng thời viết được bài trình bày hoặc bài nghị luận ngắn. Vốn từ chuyển sang từ vựng mang tính báo chí và xã hội, kèm các cấu trúc câu phức để liên kết ý.\n\n---\n\n## 2. Các Bài Tiểu luận Chuyên sâu B2 (Song ngữ Nga - Việt & Bảng Thuật ngữ Đi kèm)\n\n### Bài tiểu luận 1: Biến động Nhân khẩu học ở Nga (Эссе́ «Демографи́ческие измене́ния в Росси́и»)\n\n#### Tiếng Nga (có trọng âm):\n> **Демографи́ческие измене́ния** — э́то переме́ны в числе́нности и соста́ве населе́ния страны́: ско́лько рожда́ется дете́й, ско́лько люде́й умира́ет, ско́лько приезжа́ет и уезжа́ет, как распределя́ются жи́тели по во́зрасту и региона́м. Для Росси́и э́та те́ма осо́бенно важна́, потому́ что она́ напряму́ю каса́ется бу́дущего страны́.\n>\n> Одна́ из гла́вных пробле́м совреме́нной Росси́и — **сниже́ние рожда́емости**. Сре́днее число́ дете́й на одну́ же́нщину опусти́лось приме́рно до 1,38, хотя́ для того́, что́бы населе́ние не сокраща́лось, ну́жно не ме́ньше 2,1. Молоды́е лю́ди снача́ла стре́мятся получи́ть образова́ние и устро́иться в жи́зни, поэ́тому откла́дывают рожде́ние дете́й, а жильё và chi phí nhà ở (*его́ сто́имость*) то́же влия́ют на реше́ния о семье́.\n>\n> Второ́й ва́жный проце́сс — **старе́ние населе́ния**. Благодаря́ разви́тию медици́ны лю́ди ста́ли жить до́льше, и до́ля пожилы́х гра́ждан растёт. Э́то хоро́шая но́вость для ка́ждого челове́ка, но и вы́зов для о́бщества: ну́жно плати́ть пе́нсии, тра́тить бо́льше на медици́ну, а эконо́мика мо́жет столкну́ться с дефици́том молоды́х рабо́тников.\n>\n> Э́ти проце́ссы по-ра́зному проявля́ются в столи́цах и региона́х. В больши́е города́, таки́е как Москва́ и Санкт-Петербу́рг, приезжа́ет мно́го молодёжи, поэ́тому там ситуа́ция лу́чше. А вот в небольши́х города́х населе́ние старе́ет быстре́е, и там ну́жно обслуживать всё бо́льше люде́й ста́ршего во́зраста.\n>\n> Госуда́рство принима́ет ме́ры: выпла́чивает **матери́нский капита́л**, подде́рживает многоде́тные се́мьи, развива́ет програ́ммы досту́пного жилья́ và bảo vệ sức khỏe (*охра́ны здоро́вья*). Но демогра́фия — э́то дли́тельный проце́сс, кото́рый зави́сит не то́лько от по́мощи госуда́рства, но и от уве́ренности люде́й в завтра́шнем дне.\n>\n> Поэ́тому демографи́ческий вопро́с остаётся одни́м из са́мых ва́жных для совреме́нной Росси́и.\n\n#### Bản dịch tiếng Việt:\n> Những thay đổi về nhân khẩu học là những biến động về số lượng và cơ cấu dân số của một quốc gia: có bao nhiêu trẻ em được sinh ra, bao nhiêu người qua đời, bao nhiêu người nhập cư và xuất cư, cũng như dân cư được phân bố như thế nào theo độ tuổi và khu vực. Đối với Nga, đây là một chủ đề đặc biệt quan trọng bởi nó liên quan trực tiếp đến tương lai của đất nước.\n>\n> Một trong những vấn đề chính của nước Nga hiện đại là sự suy giảm tỷ lệ sinh. Số con trung bình của một phụ nữ đã giảm xuống khoảng 1,38, trong khi để dân số không bị suy giảm thì cần ít nhất là 2,1. Những người trẻ tuổi trước hết nỗ lực học tập và ổn định cuộc sống, vì vậy họ trì hoãn việc sinh con; ngoài ra vấn đề nhà ở và giá nhà cũng ảnh hưởng đến quyết định lập gia đình.\n>\n> Tiến trình quan trọng thứ hai là sự già hóa dân số. Nhờ vào sự phát triển của y học, con người sống thọ hơn và tỷ lệ người cao tuổi ngày càng tăng. Đây là một tin vui đối với mỗi cá nhân nhưng cũng là một thách thức đối với toàn xã hội: cần phải chi trả lương hưu, tăng chi phí y tế, trong khi nền kinh tế có thể đối mặt với tình trạng thiếu hụt lao động trẻ.\n>\n> Những biến động này thể hiện khác nhau giữa các đô thị lớn và các địa phương. Tại các thành phố lớn như Moskva và Sankt-Peterburg, rất nhiều người trẻ chuyển đến sinh sống nên tình hình khả quan hơn. Trong khi đó, ở các thành phố nhỏ dân số già hóa nhanh hơn, và cần phải chăm lo cho ngày càng nhiều người cao tuổi.\n>\n> Nhà nước đang thực hiện các biện pháp: chi trả vốn thai sản, hỗ trợ các gia đình đông con, phát triển các chương trình nhà ở giá phải chăng và bảo vệ sức khỏe. Tuy nhiên, nhân khẩu học là một quá trình dài hạn, không chỉ phụ thuộc vào sự trợ cấp của nhà nước mà còn dựa vào niềm tin của người dân vào tương lai.\n>\n> Vì vậy, vấn đề nhân khẩu học vẫn là một trong những câu hỏi cấp thiết nhất đối với nước Nga hiện đại.\n\n#### Danh sách thuật ngữ & Cấu trúc tương ứng trích từ Bài luận 1 (34 cụm từ):\n| Thuật ngữ / Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài luận |\n|---|---|---|\n| **демографи́ческое измене́ние** | сущ. n | Демографи́ческие измене́ния — э́то переме́ны в числе́нности и соста́ве населе́ния. |\n| **переме́на в чи́сленности** | перемена в чём? (П.п.) | Переме́ны в числе́нности и соста́ве населе́ния страны́. |\n| **переме́на в соста́ве** | перемена в чём? (П.п.) | Переме́ны в соста́ве населе́ния страны́. |\n| **распределя́ться по во́зрасту** | распределя́ться по чему? (Д.п.) | Как распределя́ются жи́тели по во́зрасту и региона́м. |\n| **напряму́ю каса́ться** | каса́ться чего? (Р.п.) | Она́ напряму́ю каса́ется бу́дущего страны́. |\n| **бу́дущее страны́** | будущее кого/чего? (Р.п.) | Вопро́с напряму́ю каса́ется бу́дущего страны́. |\n| **сниже́ние рожда́емости** | снижение чего? (Р.п.) | Одна́ из гла́вных пробле́м — сниже́ние рожда́емости. |\n| **опусти́ться до...** | опусти́ться до чего/скольких? | Число́ дете́й опусти́лось приме́рно до 1,38. |\n| **хотя́ для того́, что́бы...** | союз цели/уступки | Хотя́ для того́, что́бы населе́ние не сокраща́лось, ну́жно 2,1. |\n| **населе́ние не сокраща́лось** | сокращаться глагол | Что́бы населе́ние страны́ не сокраща́лось. |\n| **стреми́ться получи́ть образова́ние** | стреми́ться к чему / инф. | Сначала стре́мятся получи́ть хоро́шее образова́ние. |\n| **устра́иваться в жи́зни** | устраиваться где? | Стре́мятся устроиться в жи́зни и найти рабо́ту. |\n| **откла́дывать рожде́ние ребёнка** | откла́дывать что? (В.п.) | Поэ́тому откла́дывают рожде́ние пе́рвого ребёнка. |\n| **реше́ние о семье́** | решение о чём? (П.п.) | Сто́имость жилья́ влия́ет на реше́ния о семье́. |\n| **старе́ние населе́ния** | старение кого/чего? (Р.п.) | Второ́й ва́жный проце́сс — старе́ние населе́ния. |\n| **жить до́льше** | сравнительная степень | Благодаря́ медици́не лю́ди ста́ли жить до́льше. |\n| **до́ля пожилы́х гра́ждан** | доля кого/чего? (Р.п.) | До́ля пожилы́х гра́ждан в о́бществе растёт. |\n| **расти́** | глагол несоверш. | До́ля пожилы́х гра́ждан неукло́нно растёт. |\n| **вы́зов для о́бщества** | вызов для кого/чего? | Э́то хоро́шая но́вость, но и вы́зов для о́бщества. |\n| **плати́ть пе́нсии** | плати́ть что? (В.п.) | Госуда́рству ну́жно плати́ть пе́нсии миллио́нам люде́й. |\n| **тра́тить бо́льше на медици́ну** | тра́тить на что? (В.п.) | Прихо́дится тра́тить бо́льше на медици́ну. |\n| **эконо́мика мо́жет столкну́ться** | столкну́ться с чем? (Т.п.) | Эконо́мика мо́жет столкну́ться с дефици́том рабо́тников. |\n| **дефици́т молоды́х рабо́тников** | дефицит кого/чего? (Р.п.) | Столкну́ться с дефици́том молоды́х рабо́тников. |\n| **проявля́ться по-ра́зному** | проявляться как? | Проце́ссы по-ра́зному проявля́ются в региона́х. |\n| **приезжа́ет мно́го молодёжи** | приезжать куда? | В больши́е города́ приезжа́ет мно́го молодёжи. |\n| **ситуа́ция лу́чше** | ситуация какова? | В столи́цах демографи́ческая ситуа́ция лу́чше. |\n| **населе́ние старе́ет быстре́е** | стареть как? | В небольши́х города́х населе́ние старе́ет быстре́е. |\n| **обслу́живать люде́й** | обслуживать кого? (В.п.) | Ну́жно обслу́живать всё бо́льше пожилы́х люде́й. |\n| **челове́к ста́ршего во́зраста** | возраст кого/чего? | Всё бо́льше люде́й ста́ршего во́зраста. |\n| **принима́ть ме́ры** | принимать что? (В.п.) | Госуда́рство принима́ет сро́чные ме́ры. |\n| **выпла́чивать матери́нский капита́л**| выпла́чивать что? (В.п.) | Выпла́чивает матери́нский капита́л семья́м. |\n| **матери́нский капита́л** | субсидия на детей | Госуда́рство выпла́чивает матери́нский капита́л. |\n| **досту́пное жильё** | жильё какого типа? | Развива́ет програ́ммы досту́пного жилья́. |\n| **охра́на здоро́вья** | охрана чего? (Р.п.) | Програ́ммы досту́пного жилья́ и охра́ны здоро́вья. |\n\n---\n\n### Bài tiểu luận 2: Gia đình Truyền thống và Gia đình Hiện đại (Эссе́ «Традицио́нная и совреме́нная семья́»)\n\n#### Tiếng Nga (có trọng âm):\n> Семья́ всегда́ была́ ва́жной ча́стью жи́зни люде́й, но её це́нности и пра́вила со вре́менем меня́лись. В традицио́нном о́бществе семья́ была́ большо́й: под одно́й кры́шей ча́сто жи́ли не́сколько поколе́ний — де́душки, ба́бушки, роди́тели и де́ти. Гла́вными це́нностями счита́лись **послуша́ние ста́ршим** и **продолже́ние ро́да**. В семье́ все труди́лись сообща́, а брак ча́ще заключа́ли не то́лько по любви́, но и что́бы вести́ о́бщее хозя́йство. Мужчи́на был гла́вным в до́ме, а реше́ния принима́л ста́рший.\n>\n> С разви́тием городо́в и промы́шленности в XX ве́ке мно́гое поменя́лось. Лю́ди ста́ли жить отде́льно от роди́телей, и се́мьи ста́ли ме́ньше. Же́нщины получи́ли возмо́жность учи́ться и рабо́тать, поэ́тому отноше́ния в семье́ стано́вились бо́лее ра́вными. А разво́д переста́л быть чем-то необы́чным, а осно́вой бра́ка всё ча́ще стано́вилась любо́вь и взаи́мное уваже́ние.\n>\n> В совреме́нном ми́ре семья́ продолжа́ет меня́ться. Се́мьи ста́ли ещё ме́ньше: ча́сто у роди́телей то́лько оди́н ребёнок, и роди́тели стара́ются удели́ть им бо́льше внима́ния и дать всё необходи́мое. Сейча́с о́бщество признаёт ра́зные фо́рмы семьи́: неполны́е се́мьи, па́ры без дете́й и се́мьи, где дете́й воспи́тывают приёмные роди́тели. Ва́жной це́нностью ста́ло **партнёрство**: муж и жена́ вме́сте реша́ют бытовы́е вопро́сы, де́лят обя́занности по до́му và chăm sóc con cái (*по ухо́ду за детьми́*).\n>\n> При э́том гла́вное остаётся неизме́нным: семья́ — э́то ме́сто, где челове́к чу́вствует подде́ржку и любо́вь. Зде́сь его́ принима́ют таки́м, како́й он есть, và dạy cho lòng nhân ái cũng như tinh thần trách nhiệm (*у́чат доброте́ и отве́тственности*). И хотя́ фо́рмы семьи́ меня́ются, её гла́вная роль в жи́зни челове́ка остаётся прежней.\n\n#### Bản dịch tiếng Việt:\n> Gia đình từ xưa đến nay luôn là một phần quan trọng trong cuộc sống con người, nhưng những giá trị và quy tắc của nó đã thay đổi theo thời gian. Trong xã hội truyền thống, gia đình thường rất đông thành viên: dưới một mái nhà thường có nhiều thế hệ cùng chung sống — ông bà, cha mẹ và con cái. Những giá trị quan trọng nhất là sự vâng lời người lớn và việc duy trì nòi giống. Trong gia đình, mọi người cùng nhau lao động chung, và hôn nhân thường được thiết lập không chỉ vì tình yêu mà còn để cùng gánh vác kinh tế gia đình. Người đàn ông làm chủ gia đình, và người lớn tuổi nhất là người đưa ra các quyết định.\n>\n> Cùng với sự phát triển của các thành phố và nền công nghiệp trong thế kỷ 20, nhiều điều đã thay đổi. Mọi người bắt đầu sống tách biệt khỏi cha mẹ, và các gia đình trở nên ít người hơn. Phụ nữ có cơ hội học tập và làm việc, do đó các mối quan hệ trong gia đình trở nên bình đẳng hơn. Ly hôn không còn là một điều gì đó bất thường, và nền tảng của hôn nhân ngày càng dựa trên tình yêu và sự tôn trọng lẫn nhau.\n>\n> Trong thế giới hiện đại, gia đình tiếp tục biến đổi. Các gia đình thậm chí còn nhỏ hơn nữa: các bậc cha mẹ thường chỉ sinh một con, và họ cố gắng dành cho con nhiều sự quan tâm hơn và đem lại mọi điều cần thiết. Hiện nay xã hội công nhận nhiều hình thức gia đình khác nhau: gia đình đơn thân, các cặp vợ chồng không có con, và những gia đình nuôi con nuôi. Một giá trị quan trọng hiện nay là quan hệ đối tác cộng sự: vợ chồng cùng nhau giải quyết các công việc thường nhật, chia sẻ việc nhà và chăm sóc con cái.\n>\n> Dẫu vậy, điều cốt lõi nhất vẫn không hề thay đổi: gia đình là nơi mỗi người cảm nhận được sự chở che và tình yêu thương. Nơi đây đón nhận mỗi người đúng như con người thật của họ, và dạy cho họ lòng nhân ái cũng như tinh thần trách nhiệm. Và dù các hình thái gia đình có thay đổi, thì vai trò cốt lõi của gia đình trong đời sống con người vẫn vẹn nguyên như trước.\n\n#### Danh sách thuật ngữ & Cấu trúc tương ứng trích từ Bài luận 2 (26 cụm từ):\n| Thuật ngữ / Cụm từ vựng | Cấu trúc câu | Ví dụ minh họa trong bài luận |\n|---|---|---|\n| **меня́ться со вре́менем** | меня́ться с чем? (Т.п.) | Це́нности и пра́вила со вре́менем меня́лись. |\n| **традицио́нное о́бщество** | общество какого типа? | В традицио́нном о́бществе семья́ была́ большо́й. |\n| **послуша́ние ста́ршим** | послушание кому? (Д.п.) | Гла́вными це́нностями счита́лись послуша́ние ста́ршим. |\n| **продолже́ние ро́да** | продолжение чего? (Р.п.) | Гла́вной зада́чей бра́ка счита́лось продолже́ние ро́да. |\n| **труди́ться сообща́** | трудиться как? | В се́мьях все труди́лись сообща́. |\n| **брак заключа́ли** | заключать что? (В.п.) | Брак ча́ще заключа́ли не то́лько по любви́. |\n| **вести́ о́бщее хозя́йство** | вести́ что? (В.п.) | Бра́ки заключа́ли, что́бы вести́ о́бщее хозя́йство. |\n| **гла́вный в до́ме** | главный где? | Мужчи́на традицио́нно был гла́вным в до́ме. |\n| **реше́ния принима́л ста́рший** | принимать что? (В.п.) | Все ва́жные реше́ния принима́л ста́рший член семьи́. |\n| **разви́тие городо́в** | развитие чего? (Р.п.) | С разви́тием городо́в и промы́шленности всё поменя́лось. |\n| **жить отде́льно от роди́телей** | жить отде́льно от кого? (Р.п.)| Лю́ди ста́ли жить отде́льно от свои́х роди́телей. |\n| **получи́ть возмо́жность** | получи́ть что? + инф. | Же́нщины получи́ли возмо́жность учи́ться и рабо́тать. |\n| **станови́ться бо́лее ра́вными** | становиться какими? (Т.п.) | Отноше́ния в семье́ станови́лись бо́лее ра́вными. |\n| **разво́д** | сущ. m | Разво́д переста́л быть позо́рным табу́. |\n| **осно́ва бра́ка** | основа чего? (Р.п.) | Осно́вой бра́ка стано́вилась взаи́мная любо́вь. |\n| **взаи́мное уваже́ние** | уважение к кому? | Взаи́мное уваже́ние ста́ло фунда́ментом бра́ка. |\n| **уделя́ть бо́льше внима́ния** | уделя́ть кому что? (Д.п.) | Роди́тели стара́ются удели́ть де́тям бо́льше внима́ния. |\n| **дать всё необходи́мое** | дать кому что? | Стара́ются дать ребёнку всё необходи́мое для разви́тия. |\n| **признава́ть ра́зные фо́рмы** | признавать что? (В.п.) | О́бщество признаёт ра́зные фо́рмы семьи́. |\n| **приёмные роди́тели** | сущ. pl | Се́мьи, где дете́й воспи́тывают приёмные роди́тели. |\n| **партнёрство в бра́ке** | сущ. n | Ва́жной совреме́нной це́нностью ста́ло партнёрство. |\n| **реша́ть бытово́й вопро́с** | решать что? (В.п.) | Муж и жена́ вме́сте реша́ют бытовы́е вопро́сы. |\n| **дели́ть ухо́д за де́тьми** | делить что? (В.п.) | Де́лят обя́занности по до́му и ухо́ду за детьми́. |\n| **ухо́д за ребёнком** | уход за кем? (Т.п.) | Дели́ть забо́ты по ухо́ду за новорождённым ребёнком. |\n| **остава́ться неизме́нным** | оставаться каким? (Т.п.) | При э́том гла́вное в семье́ остаётся неизме́нным. |\n| **учи́ть доброте́ и отве́тственности**| учить кого чему? (Д.п.)| Семья́ — э́то ме́сто, где люде́й у́чат доброте́. |\n",
    "created_at": "2026-11-19T15:59:08.259469+00:00",
    "updated_at": "2026-11-20T13:57:17.586601+00:00"
  }
];
  const GRAMMAR_LESSONS = [
  {
    "id": "bai_01",
    "code": "bai_01",
    "title": "BÀI 01: CẤU TRÚC HÌNH VỊ TRONG TIẾNG NGA",
    "level": "A1",
    "category": "Hình thái học & Chính tả",
    "topic": "Hình thái học & Chính tả",
    "vi": "BÀI 01: CẤU TRÚC HÌNH VỊ TRONG TIẾNG NGA",
    "summary": "Hiểu rõ bản chất một từ tiếng Nga được cấu tạo như thế nào.\nPhân biệt chính xác 5 loại hình vị: Căn tố, Tiền tố, Tiếp tố, Vĩ tố và Hậu tố.\nNắm vững khái niệm **Thân từ (Основа)** – chìa khóa vàng để chia động từ và biến cách danh từ, tính từ.",
    "content_md": "# BÀI 01: CẤU TRÚC HÌNH VỊ TRONG TIẾNG NGA\n## (Морфемный состав слова в русском языке)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất một từ tiếng Nga được cấu tạo như thế nào.\n> - Phân biệt chính xác 5 loại hình vị: Căn tố, Tiền tố, Tiếp tố, Vĩ tố và Hậu tố.\n> - Nắm vững khái niệm **Thân từ (Основа)** – chìa khóa vàng để chia động từ và biến cách danh từ, tính từ.\n\n---\n\n## 1. VÌ SAO PHẢI HỌC HÌNH VỊ HỌC TIẾNG NGA?\n\nTrong tiếng Việt, từ là những khối cố định, không biến đổi: *\"học\", \"người học\", \"phòng học\", \"học sinh\"*. Mối quan hệ ngữ pháp được thể hiện bằng trật tự từ hoặc hư từ phụ trợ.\n\nNgược lại, tiếng Nga là **ngôn ngữ biến tố (флективный язык)**. Một từ tiếng Nga giống như một cỗ xe được lắp ráp từ nhiều bộ phận có ý nghĩa riêng biệt gọi là **Hình vị (Морфема)**. Nếu bạn nắm được cấu trúc hình vị:\n- Bạn chỉ cần biết 1 gốc từ là có thể đoán và suy luận nghĩa của hàng chục từ phát sinh.\n- Bạn sẽ hiểu chính xác bộ phận nào của từ giữ nguyên, bộ phận nào sẽ biến đổi khi ghép vào câu.\n\n---\n\n## 2. NĂM THÀNH PHẦN HÌNH VỊ CƠ BẢN CỦA TỪ TIẾNG NGA\n\nMột từ hoàn chỉnh trong tiếng Nga có thể gồm tối đa 5 loại hình vị:\n\n$$\\text{Từ} = [\\text{Tiền tố}] + \\textbf{CĂN TỐ} + [\\text{Tiếp tố}] + [\\text{Vĩ tố}] + [\\text{Hậu tố}]$$\n\n```mermaid\nflowchart LR\n    P[\"1. Tiền tố\\n(Префикс)\"] --> R[\"2. CĂN TỐ\\n(Корень - Bắt buộc)\"]\n    R --> S[\"3. Tiếp tố\\n(Суффикс)\"]\n    S --> F[\"4. Vĩ tố\\n(Окончание / Флексия)\"]\n    F --> Post[\"5. Hậu tố\\n(Постфикс -ся/-сь)\"]\n```\n\n### 2.1. Căn tố (Корень слова)\n- **Định nghĩa:** Là hình vị trung tâm, mang ý nghĩa từ vựng cơ bản của từ. Mọi từ độc lập đều bắt buộc phải có căn tố.\n- **Ví dụ:** Xét chùm từ cùng gốc mang nghĩa \"học\":\n  - **уч**-ить *(học/dạy)*\n  - **уч**-еник *(học sinh)*\n  - **уч**-итель *(thầy giáo)*\n  - **уч**-ёба *(việc học tập)*\n  - из-**уч**-ать *(nghiên cứu/học sâu)*\n  $\\rightarrow$ Căn tố chung ở đây là **-уч-**.\n\n### 2.2. Tiền tố (Префикс / Приставка)\n- **Định nghĩa:** Là hình vị đứng trước căn tố, có chức năng tạo ra từ mới hoặc thay đổi thể của động từ.\n- **Ví dụ:**\n  - Từ căn **ход** *(bước đi)*:\n    - **в**-ход *(lối vào)*\n    - **вы**-ход *(lối ra)*\n    - **пере**-ход *(chỗ qua đường)*\n    - **под**-ход *(cách tiếp cận)*\n  - Một từ có thể có nhiều tiền tố: **по-на-вы-**думывать *(nghĩ ra đủ thứ chuyện)*.\n\n### 2.3. Tiếp tố (Суффикс)\n- **Định nghĩa:** Là hình vị đứng sau căn tố (và trước vĩ tố), dùng để tạo từ mới (danh từ chỉ người, vật, tính từ, trạng từ) hoặc tạo dạng thức ngữ pháp.\n- **Ví dụ:**\n  - Căn tố **москв-** *(Moskva)* + tiếp tố **-ич** $\\rightarrow$ **москвич** *(người Moskva)*.\n  - Căn tố **вьетнам-** + tiếp tố **-ец** $\\rightarrow$ **вьетнамец** *(người Việt Nam)*.\n  - Căn tố **уч-** + tiếp tố **-и-** + tiếp tố **-тель** $\\rightarrow$ **учитель** *(giáo viên)*.\n  - Thêm tiếp tố **-ниц(а)** $\\rightarrow$ **учительница** *(cô giáo)*.\n\n### 2.4. Vĩ tố / Từ vĩ (Окончание / Флексия)\n- **Định nghĩa:** Là hình vị đứng ở cuối từ (thường sau tiếp tố), có chức năng **biểu thị mối quan hệ ngữ pháp** (giống, số, cách của danh/tính từ; ngôi, số của động từ) khi từ kết hợp trong câu.\n- **Đặc điểm:** Vĩ tố là thành phần **thay đổi liên tục**:\n  - Danh từ: **комнат-а** *(căn phòng - C1)* $\\rightarrow$ **комнат-ы** *(C2)* $\\rightarrow$ **комнат-е** *(C3)* $\\rightarrow$ **комнат-у** *(C4)*...\n  - Tính từ: **нов-ый** *(mới - giống đực)* $\\rightarrow$ **нов-ая** *(giống cái)* $\\rightarrow$ **нов-ое** *(giống trung)* $\\rightarrow$ **нов-ые** *(số nhiều)*.\n  - Động từ: **чита-ю** *(tôi đọc)* $\\rightarrow$ **чита-ешь** *(bạn đọc)* $\\rightarrow$ **чита-ет** *(anh ấy đọc)*.\n- **Vĩ tố số không (Нулевое окончание):** Có những từ không có biểu hiện âm thanh ở vĩ tố nhưng vẫn mang ý nghĩa ngữ pháp:\n  - **стол-Ø** *(cái bàn - giống đực, số ít, Cách 1)*.\n  - **студент-Ø** *(nam sinh viên - giống đực, số ít, Cách 1)*.\n\n### 2.5. Hậu tố (Постфикс)\n- **Định nghĩa:** Là hình vị đặc biệt đứng **sau cả vĩ tố**. Trong tiếng Nga chỉ có một số ít hậu tố:\n  - Hậu tố phản thân **-ся / -сь**: trong động từ như **умывать-ся** *(tự rửa mặt)*, **учу-сь** *(tôi tự học)*.\n  - Hậu tố bất định **-то, -либо, -нибудь**: **кто-то** *(ai đó)*, **что-нибудь** *(bất cứ cái gì)*.\n\n---\n\n## 3. KHÁI NIỆM THÂN TỪ (ОСНОВА СЛОВА)\n\n> [!IMPORTANT]\n> **Thân từ (Основа)** là toàn bộ phần của từ **sau khi đã trừ đi vĩ tố (và hậu tố chia thì nếu có)**.\n> $$\\text{Thân từ} = \\text{Toàn bộ từ} - \\text{Vĩ tố}$$\n\n### Ví dụ minh họa:\n| Từ đầy đủ | Vĩ tố (Окончание) | Thân từ (Основа) | Thành phần thân từ |\n| :--- | :--- | :--- | :--- |\n| **студент** | -Ø *(vĩ tố 0)* | **студент-** | Căn tố: *студент-* |\n| **школа** | -а | **школ-** | Căn tố: *школ-* |\n| **учительница** | -а | **учительниц-** | Căn: *уч-*, Tiếp tố: *-и-*, *-тель-*, *-ниц-* |\n| **красивый** | -ый | **красив-** | Căn: *крас-*, Tiếp tố: *-ив-* |\n| **перестройка** | -а | **перестройк-** | Tiền: *пере-*, Căn: *строй-*, Tiếp tố: *-к-* |\n\n**Ý nghĩa ứng dụng tối thượng:**\nKhi bạn học biến cách danh từ, tính từ hay chia động từ, nguyên tắc cơ bản là: **Giữ nguyên THÂN TỪ, chỉ thay thế VĨ TỐ!**\n\n---\n\n## 4. BẢNG PHÂN TÍCH HÌNH VỊ MẪU\n\nHãy cùng mổ xẻ một từ phức tạp: **“преподавательница”** *(nữ giảng viên đại học)*:\n- **пре-** : Tiền tố 1\n- **по-** : Tiền tố 2\n- **да-** : Căn tố *(cho, trao)*\n- **-ва-** : Tiếp tố động từ\n- **-тель-** : Tiếp tố chỉ danh từ người thực hiện hành động *(giống đực)*\n- **-ниц-** : Tiếp tố giống cái\n- **-а** : Vĩ tố (biểu thị giống cái, số ít, Cách 1)\n- **Thân từ:** **преподавательниц-**\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Hãy xác định căn tố chung của nhóm từ sau: *вода, водный, подводный, водяной, подводник*.\n2. Hãy tách **Thân từ** và **Vĩ tố** của các từ sau:\n   - a) `книга` *(quyển sách)*\n   - b) `карандаш` *(bút chì)*\n   - c) `синий` *(màu xanh da trời)*\n   - d) `студентка` *(nữ sinh viên)*\n\n### Đáp án & Lời giải:\n1. Căn tố chung là **-вод-** *(nghĩa liên quan đến \"nước\")*.\n2. Tách thân từ và vĩ tố:\n   - a) `книга` $\\rightarrow$ Thân từ: **книг-**, Vĩ tố: **-а**.\n   - b) `карандаш` $\\rightarrow$ Thân từ: **карандаш-**, Vĩ tố: **-Ø** *(vĩ tố không)*.\n   - c) `синий` $\\rightarrow$ Thân từ: **син-**, Vĩ tố: **-ий**.\n   - d) `студентка` $\\rightarrow$ Thân từ: **студентк-**, Vĩ tố: **-а** (Thân từ gồm căn tố *студент-* và tiếp tố giống cái *-к-*).\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 1,
    "is_pro_only": false
  },
  {
    "id": "bai_02",
    "code": "bai_02",
    "title": "BÀI 02: QUY LUẬT TƯƠNG ỨNG CỨNG - MỀM & 7 PHỤ ÂM VÀNG",
    "level": "A1",
    "category": "Hình thái học & Chính tả",
    "topic": "Hình thái học & Chính tả",
    "vi": "BÀI 02: QUY LUẬT TƯƠNG ỨNG CỨNG - MỀM & 7 PHỤ ÂM VÀNG",
    "summary": "Nắm trọn bản chất **Quy luật đối ứng Cứng - Mềm** – bí quyết giúp bạn không bao giờ phải học thuộc lòng hàng chục bảng biến cách riêng lẻ.\nKhắc cốt ghi tâm **Quy tắc 7 Phụ âm Vàng** (Г, К, Х, Ж, Ч, Ш, Щ) để tránh 90% lỗi chính tả cơ bản.\nHiểu quy tắc đuôi vĩ tố sau nhóm âm xuýt và chữ Ц.",
    "content_md": "# BÀI 02: QUY LUẬT TƯƠNG ỨNG CỨNG - MỀM & 7 PHỤ ÂM VÀNG\n## (Правила твердости-мягкости и правописания гласных после согласных)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn bản chất **Quy luật đối ứng Cứng - Mềm** – bí quyết giúp bạn không bao giờ phải học thuộc lòng hàng chục bảng biến cách riêng lẻ.\n> - Khắc cốt ghi tâm **Quy tắc 7 Phụ âm Vàng** (Г, К, Х, Ж, Ч, Ш, Щ) để tránh 90% lỗi chính tả cơ bản.\n> - Hiểu quy tắc đuôi vĩ tố sau nhóm âm xuýt và chữ Ц.\n\n---\n\n## 1. NGUYÊN TẮC VÀNG: BẢN CHẤT CỦA CỨNG VÀ MỀM\n\nTrong tiếng Nga, hầu hết các phụ âm đều tồn tại thành từng cặp: **Phụ âm Cứng (Твёрдый)** và **Phụ âm Mềm (Мягкий)**.\nTính cứng hay mềm của phụ âm đứng trước được quyết định trực tiếp bởi nguyên âm đi liền sau nó hoặc bởi dấu mềm `ь`:\n\n### Bảng đối ứng nguyên âm Cứng - Mềm:\n| Hệ CỨNG (Твёрдый ряд) | Hệ MỀM (Мягкий ряд) | Ghi chú phát âm |\n| :---: | :---: | :--- |\n| **А** | **Я** | /a/ vs /ja/ hoặc làm mềm phụ âm trước |\n| **О** | **Ё** | /o/ vs /jo/ hoặc làm mềm phụ âm trước |\n| **У** | **Ю** | /u/ vs /ju/ hoặc làm mềm phụ âm trước |\n| **Ы** | **И** | /ɨ/ (âm ngạc cứng) vs /i/ (âm vòm mềm) |\n| **Э** | **Е** | /e/ cứng vs /je/ hoặc làm mềm phụ âm trước |\n| *(Phụ âm đứng trần)* | **-Ь** | Dấu mềm (Мягкий знак) làm mềm phụ âm |\n\n---\n\n## 2. QUY LUẬT BIẾN CỨNG - BIẾN MỀM TRONG BIẾN CÁCH\n\n> [!IMPORTANT]\n> **Quy luật bảo toàn độ mềm/cứng:**\n> - Nếu một từ có **thân từ CỨNG**, khi biến cách nó sẽ nhận các vĩ tố thuộc **hệ CỨNG**.\n> - Nếu một từ có **thân từ MỀM**, khi biến cách nó sẽ nhận các vĩ tố tương ứng thuộc **hệ MỀM**.\n\n### Ví dụ so sánh trực quan:\n\n#### A. So sánh Danh từ Giống đực:\n- Thân cứng: **студент** *(kết thúc bằng phụ âm cứng т)*\n  - Số nhiều (Cách 1): студент-**ы** *(hệ cứng)*\n  - Cách 2: студент-**а**\n  - Cách 3: студент-**у**\n- Thân mềm: **словарь** *(kết thúc bằng phụ âm mềm рь)*\n  - Số nhiều (Cách 1): словар-**и** *(hệ mềm tương ứng của ы)*\n  - Cách 2: словар-**я** *(hệ mềm tương ứng của а)*\n  - Cách 3: словар-**ю** *(hệ mềm tương ứng của у)*\n\n#### B. So sánh Danh từ Giống cái:\n- Thân cứng: **карт-а** *(bản đồ - tận cùng -а)* $\\rightarrow$ Số nhiều: карт-**ы**\n- Thân mềm: **деревн-я** *(ngôi làng - tận cùng -я)* $\\rightarrow$ Số nhiều: деревн-**и**\n- Thân mềm: **тетрад-ь** *(vở ghi - tận cùng -ь)* $\\rightarrow$ Số nhiều: тетрад-**и**\n\n#### C. So sánh Tính từ:\n- Thân cứng: **нов-ый** *(mới)* $\\rightarrow$ Giống cái: нов-**ая**; Giống trung: нов-**ое**; Số nhiều: нов-**ые**\n- Thân mềm: **син-ий** *(xanh lam)* $\\rightarrow$ Giống cái: син-**яя**; Giống trung: син-**ее**; Số nhiều: син-**ие**\n\n👉 **Nhận xét:** Bạn không cần học 2 bảng riêng biệt! Bạn chỉ cần nhớ bảng biến tố cứng, sau đó chuyển sang nguyên âm mềm tương ứng theo bảng đối ứng trên!\n\n---\n\n## 3. QUY TẮC 7 PHỤ ÂM VÀNG (ПРАВИЛО 7 СОГЛАСНЫХ)\n\nĐây là quy tắc chính tả nghiêm ngặt và quan trọng bậc nhất trong ngữ pháp tiếng Nga:\n\n$$\\mathbf{7\\ Phụ\\ âm\\ Vàng:\\ Г,\\ К,\\ Х,\\ Ж,\\ Ч,\\ Ш,\\ Щ}$$\n\n> [!WARNING]\n> Sau 7 phụ âm trên:\n> 1. **KHÔNG BAO GIỜ VIẾT Ы $\\rightarrow$ PHẢI VIẾT LÀ И**\n> 2. **KHÔNG BAO GIỜ VIẾT Я $\\rightarrow$ PHẢI VIẾT LÀ А**\n> 3. **KHÔNG BAO GIỜ VIẾT Ю $\\rightarrow$ PHẢI VIẾT LÀ У**\n\n```mermaid\nflowchart TD\n    Cons[\"7 Phụ âm:\\nГ, К, Х, Ж, Ч, Ш, Щ\"]\n    Cons -->|Cấm viết Ы| R1[\"Viết И\\n(книга -> книги)\"]\n    Cons -->|Cấm viết Я| R2[\"Viết А\\n(кричат, задачи)\"]\n    Cons -->|Cấm viết Ю| R3[\"Viết У\\n(хочу, пишу)\"]\n```\n\n### Tại sao lại có quy tắc này?\nVì các phụ âm này có tính chất phát âm đặc biệt trong lịch sử ngôn ngữ Slav. Khi áp dụng vào biến cách ngữ pháp:\n- Danh từ giống cái **книга** *(thân từ: книг-)*: khi chuyển sang số nhiều theo công thức thân cứng là đuôi `-ы`, nhưng vì gặp chữ `г` nên bắt buộc biến thành **книгИ** (tuyệt đối không viết *книгы*).\n- Danh từ giống đực **карандаш** *(bút chì)*: số nhiều không phải *карандашы* mà là **карандашИ**.\n- Tính từ **русский** *(thân từ: русск-)*: số nhiều không phải *русскые* mà là **русскИе**.\n\n---\n\n## 4. QUY TẮC 5 ÂM XUÝT & CHỮ Ц (QUY TẮC NGUYÊN ÂM O / E)\n\n$$\\mathbf{Nhóm\\ âm\\ xuýt\\ (Шипящие):\\ Ж,\\ Ч,\\ Ш,\\ Щ\\ +\\ Chữ\\ Ц}$$\n\n> [!TIP]\n> **Quy tắc trọng âm O / E:**\n> - Khi **CÓ TRỌNG ÂM** rơi vào đuôi: Ta viết **О**.\n> - Khi **KHÔNG CÓ TRỌNG ÂM** (đuôi không nhấn): Ta viết **Е**.\n\n### Ví dụ điển hình trong Cách 5 (Cách công cụ - đuôi -ом / -ем):\n- **отец** *(người cha)* $\\rightarrow$ Cách 5: **отц-О́м** *(trọng âm rơi vào vĩ tố $\\rightarrow$ viết О)*.\n- **палец** *(ngón tay)* $\\rightarrow$ Cách 5: **пА́льц-ем** *(trọng âm rơi vào thân từ, đuôi không nhấn $\\rightarrow$ viết Е)*.\n- **нож** *(con dao)* $\\rightarrow$ Cách 5: **нож-О́м** *(có trọng âm $\\rightarrow$ О)*.\n- **врач** *(bác sĩ)* $\\rightarrow$ Cách 5: **врач-О́м** *(có trọng âm $\\rightarrow$ О)*.\n- **товарищ** *(đồng chí)* $\\rightarrow$ Cách 5: **товА́рищ-ем** *(không trọng âm $\\rightarrow$ Е)*.\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Hãy giải thích tại sao số nhiều của `ручка` *(cái bút)* là `ручки` chứ không phải `ручкы`?\n2. Hãy biến đổi các danh từ sau sang số nhiều và giải thích đuôi vĩ tố:\n   - a) `парк` *(công viên)*\n   - b) `этаж` *(tầng gác)*\n   - c) `студент` *(sinh viên)*\n   - d) `лампа` *(cây đèn)*\n3. Chia động từ `слышать` *(nghe)* ở ngôi `я` (đuôi cơ bản là -ю) và ngôi `они` (đuôi cơ bản là -ят). Viết đúng chính tả.\n\n### Đáp án & Lời giải:\n1. Vì thân từ của `ручка` là `ручк-`, tận cùng bằng phụ âm `к` (nằm trong 7 phụ âm vàng). Theo quy tắc chính tả, sau `к` không bao giờ viết `ы`, bắt buộc phải viết `и` $\\rightarrow$ `ручки`.\n2. Đổi sang số nhiều:\n   - a) `парк` $\\rightarrow$ `парки` *(gặp phụ âm к $\\rightarrow$ đuôi и)*.\n   - b) `этаж` $\\rightarrow$ `этажи` *(gặp âm xuýt ж $\\rightarrow$ đuôi и)*.\n   - c) `студент` $\\rightarrow$ `студенты` *(tận cùng phụ âm cứng т không thuộc 7 phụ âm $\\rightarrow$ giữ nguyên đuôi cứng ы)*.\n   - d) `лампа` $\\rightarrow$ `лампы` *(tận cùng п cứng không thuộc 7 phụ âm $\\rightarrow$ giữ nguyên đuôi ы)*.\n3. Chia động từ `слышать`:\n   - Ngôi `я`: Thân từ `слыш-` tận cùng là `ш`. Sau `ш` không viết `ю` mà viết `у` $\\rightarrow$ **я слышу**.\n   - Ngôi `они`: Sau `ш` không viết `я` mà viết `а` $\\rightarrow$ **они слышат**.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 2,
    "is_pro_only": false
  },
  {
    "id": "bai_03",
    "code": "bai_03",
    "title": "BÀI 03: PHẠM TRÙ GIỐNG CỦA DANH TỪ",
    "level": "A1",
    "category": "Danh từ (Giống & Số)",
    "topic": "Danh từ (Giống & Số)",
    "vi": "BÀI 03: PHẠM TRÙ GIỐNG CỦA DANH TỪ",
    "summary": "Nhận diện chính xác 3 giống của danh từ tiếng Nga (Giống đực, Giống cái, Giống trung) dựa vào đuôi từ điển.\nLàm chủ quy tắc phân biệt danh từ tận cùng bằng dấu mềm `-ь` (vấn đề gây bối rối nhất cho người học).\nNắm vững các trường hợp ngoại lệ: danh từ chỉ người nam có đuôi `-а/-я`, nhóm danh từ đuôi `-мя`, danh từ giống chung và từ ngoại lai không biến cách.",
    "content_md": "# BÀI 03: PHẠM TRÙ GIỐNG CỦA DANH TỪ\n## (Род имён существительных)\n\n> **Mục tiêu bài học:**\n> - Nhận diện chính xác 3 giống của danh từ tiếng Nga (Giống đực, Giống cái, Giống trung) dựa vào đuôi từ điển.\n> - Làm chủ quy tắc phân biệt danh từ tận cùng bằng dấu mềm `-ь` (vấn đề gây bối rối nhất cho người học).\n> - Nắm vững các trường hợp ngoại lệ: danh từ chỉ người nam có đuôi `-а/-я`, nhóm danh từ đuôi `-мя`, danh từ giống chung và từ ngoại lai không biến cách.\n\n---\n\n## 1. TỔNG QUAN VỀ PHẠM TRÙ GIỐNG\n\nTrong tiếng Nga, **mọi danh từ ở số ít đều mang một giống ngữ pháp cố định**:\n- **Giống đực (Мужской род - М.р.):** thay thế bằng đại từ **он** *(anh ấy / nó)*.\n- **Giống cái (Женский род - Ж.р.):** thay thế bằng đại từ **она** *(cô ấy / nó)*.\n- **Giống trung (Средний род - Ср.р.):** thay thế bằng đại từ **оно** *(nó)*.\n\n> [!NOTE]\n> Giống trong tiếng Nga là **giống ngữ pháp (grammatical gender)**, không nhất thiết tương ứng với giới tính sinh học (trừ danh từ chỉ người và động vật).\n> Ví dụ: Cây bút chì (*карандаш*) là giống đực, quyển sách (*книга*) là giống cái, còn bức thư (*письмо*) là giống trung.\n\n---\n\n## 2. QUY TẮC NHẬN BIẾT GIỐNG DỰA VÀO ĐUÔI TỪ ĐIỂN (CÁCH 1 SỐ ÍT)\n\n| Giống | Đuôi nhận diện đặc trưng | Ví dụ điển hình |\n| :--- | :--- | :--- |\n| **GIỐNG ĐỰC**<br>*(Мужской)* | 1. Tận cùng bằng **Phụ âm** *(cứng)*<br>2. Tận cùng bằng **-й**<br>3. Tận cùng bằng **-ь** *(một nhóm)* | **студент** *(sinh viên)*, **город** *(thành phố)*, **стол** *(cái bàn)*<br>**музей** *(bảo tàng)*, **чай** *(trà)*, **герой** *(anh hùng)*<br>**словарь** *(từ điển)*, **преподаватель** *(giảng viên)* |\n| **GIỐNG CÁI**<br>*(Женский)* | 1. Tận cùng bằng **-а**<br>2. Tận cùng bằng **-я**<br>3. Tận cùng bằng **-ия**<br>4. Tận cùng bằng **-ь** *(một nhóm)* | **комната** *(căn phòng)*, **газета** *(tờ báo)*, **страна** *(đất nước)*<br>**песня** *(bài hát)*, **деревня** *(ngôi làng)*, **земля** *(trái đất)*<br>**аудитория** *(giảng đường)*, **Россия** *(nước Nga)*<br>**тетрадь** *(vở)*, **ночь** *(đêm)*, **площадь** *(quảng trường)* |\n| **GIỐNG TRUNG**<br>*(Средний)* | 1. Tận cùng bằng **-о**<br>2. Tận cùng bằng **-е / -ё**<br>3. Tận cùng bằng **-ие**<br>4. 10 danh từ tận cùng bằng **-мя** | **окно** *(cửa sổ)*, **письмо** *(bức thư)*, **фото** *(bức ảnh)*<br>**море** *(biển)*, **поле** *(cánh đồng)*, **бельё** *(quần áo giặt)*<br>**здание** *(tòa nhà)*, **общежитие** *(ký túc xá)*<br>**время** *(thời gian)*, **имя** *(tên)* |\n\n---\n\n## 3. BÍ QUYẾT PHÂN BIỆT DANH TỪ TẬN CÙNG BẰNG DẤU MỀM (-Ь)\n\nDanh từ tận cùng bằng `-ь` có thể là **Giống đực** hoặc **Giống cái**. Hãy ghi nhớ các quy tắc hệ thống sau:\n\n### A. Chắc chắn là GIỐNG ĐỰC nếu:\n1. Có tiếp tố **-тель** (chỉ người làm nghề hoặc thiết bị): *учитель (thầy giáo), писатель (nhà văn), двигатель (động cơ)*.\n2. Có tiếp tố **-арь**: *словарь (từ điển), календарь (lịch), секретарь (thư ký)*.\n3. Tên **12 tháng trong năm** tận cùng bằng -ь: *январь, февраль, апрель, май, июнь, июль, сентябрь, октябрь, ноябрь, декабрь*.\n4. Chỉ người nam hoặc quan hệ nam: *парень (chàng trai), богатырь (tráng sĩ)*.\n\n### B. Chắc chắn là GIỐNG CÁI nếu:\n1. Tận cùng bằng **Âm xuýt + ь (чь, шь, щь, жь)**:\n   - *ночь (đêm), дочь (con gái), печь (cái lò)*\n   - *мышь (con chuột), тишь (sự tĩnh lặng)*\n   - *вещь (đồ vật), помощь (sự giúp đỡ)*\n   - *рожь (lúa mạch đen)*\n   *(Lưu ý: Nếu không có dấu mềm như врач, нож, карандаш thì là Giống đực!)*\n2. Tận cùng bằng hậu tố trừu tượng **-ость / -есть**:\n   - *новость (tin tức), радость (niềm vui), молодость (tuổi trẻ)*\n   - *свежесть (sự tươi mát)*\n3. Danh từ chỉ kích thước, tính chất tận cùng bằng **-бь, -вь, -дь, -зь, -сь, -ть**:\n   - *площадь (quảng trường), тетрадь (vở), кровать (giường)*\n\n---\n\n## 4. CÁC TRƯỜNG HỢP NGOẠI LỆ QUAN TRỌNG\n\n### 4.1. Danh từ chỉ người nam tận cùng bằng -а / -я\n- Các từ như: **папа** *(bố)*, **дедушка** *(ông)*, **дядя** *(chú/bác)*, **юноша** *(chàng thanh niên)*, **мужчина** *(người đàn ông)*.\n- Tên gọi thân mật của nam giới: **Саша, Ваня, Коля, Миша, Серёжа**...\n- **Quy tắc ngữ pháp:** Về mặt hình thức mang đuôi `-а/-я` giống hệt danh từ giống cái, nhưng **về mặt ngữ pháp chúng là GIỐNG ĐỰC 100%**.\n  - Tính từ và đại từ đi kèm **bắt buộc chia theo giống đực**:\n    - *Мой добрый папа* (Bố hiền từ của tôi - KHÔNG dùng *моя добрая папа*).\n    - *Этот красивый юноша* (Chàng thanh niên đẹp trai này).\n\n### 4.2. Nhóm 10 danh từ trung tính tận cùng bằng -мя\nGồm 10 danh từ: **время** *(thời gian)*, **имя** *(tên)*, **знамя** *(ngọn cờ)*, **пламя** *(ngọn lửa)*, **племя** *(bộ lạc)*, **семя** *(hạt giống)*, **стремя** *(bàn đạp ngựa)*, **темя** *(đỉnh đầu)*, **бремя** *(gánh nặng)*, **вымя** *(bầu vú bò)*.\n- Tất cả đều là **GIỐNG TRUNG (Средний род)**!\n  - *Какое сейчас время?* (Bây giờ là mấy giờ?)\n  - *Твоё имя очень красивое.* (Tên của bạn rất đẹp).\n\n### 4.3. Từ đặc biệt: путь (con đường)\n- Tận cùng bằng `-ть` nhưng là **GIỐNG ĐỰC**: *счастливый путь (chúc thượng lộ bình an)*.\n\n### 4.4. Danh từ mượn không biến cách (Несклоняемые существительные)\n- Các từ gốc nước ngoài tận cùng bằng nguyên âm lạ: **пальто** *(áo khoác)*, **метро** *(tàu điện ngầm)*, **кино** *(rạp chiếu phim)*, **такси** *(taxi)*, **интервью** *(phỏng vấn)* $\\rightarrow$ Hầu hết là **GIỐNG TRUNG**.\n- Từ đặc biệt: **кофе** *(cà phê)* $\\rightarrow$ Theo quy chuẩn văn học là **GIỐNG ĐỰC** (*чёрный кофе* - cà phê đen, dù khẩu ngữ hiện đại có chấp nhận giống trung).\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nXác định giống (Đực - М, Cái - Ж, Trung - Ср) của các danh từ sau:\n1. `дочь` *(con gái)*\n2. `преподаватель` *(giảng viên)*\n3. `метро` *(tàu điện ngầm)*\n4. `дядя` *(chú/bác)*\n5. `новость` *(tin tức)*\n6. `время` *(thời gian)*\n7. `врач` *(bác sĩ)*\n8. `музей` *(bảo tàng)*\n\n### Đáp án & Lời giải:\n1. `дочь`: **Giống cái (Ж)** – tận cùng bằng âm xuýt + dấu mềm (-чь).\n2. `преподаватель`: **Giống đực (М)** – đuôi tiếp tố `-тель`.\n3. `метро`: **Giống trung (Ср)** – danh từ ngoại lai tận cùng bằng `-о`.\n4. `дядя`: **Giống đực (М)** – chỉ người nam mặc dù có đuôi `-я`.\n5. `новость`: **Giống cái (Ж)** – hậu tố trừu tượng `-ость`.\n6. `время`: **Giống trung (Ср)** – nằm trong nhóm 10 từ tận cùng bằng `-мя`.\n7. `врач`: **Giống đực (М)** – tận cùng bằng phụ âm âm xuýt không có dấu mềm.\n8. `музей`: **Giống đực (М)** – tận cùng bằng `-й`.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 3,
    "is_pro_only": false
  },
  {
    "id": "bai_04",
    "code": "bai_04",
    "title": "BÀI 04: PHẠM TRÙ SỐ CỦA DANH TỪ",
    "level": "A1",
    "category": "Danh từ (Giống & Số)",
    "topic": "Danh từ (Giống & Số)",
    "vi": "BÀI 04: PHẠM TRÙ SỐ CỦA DANH TỪ",
    "summary": "Nắm vững quy tắc chuyển danh từ từ Số ít (Единственное число) sang Số nhiều (Множественное число) theo từng giống.\nLàm chủ nhóm danh từ giống đực có số nhiều đuôi nhấn `-а́ / -я́` (*дома, города...*).\nGhi nhớ bảng danh từ biến đổi dị biệt (*люди, дети, друзья, братья...*) và hiện tượng rụng nguyên âm (*день $\\rightarrow$ дни*).\nPhân biệt nhóm danh từ chỉ có số ít (*Singularia tantum*) và chỉ có số nhiều (*Pluralia tantum*).",
    "content_md": "# BÀI 04: PHẠM TRÙ SỐ CỦA DANH TỪ\n## (Число имён существительных)\n\n> **Mục tiêu bài học:**\n> - Nắm vững quy tắc chuyển danh từ từ Số ít (Единственное число) sang Số nhiều (Множественное число) theo từng giống.\n> - Làm chủ nhóm danh từ giống đực có số nhiều đuôi nhấn `-а́ / -я́` (*дома, города...*).\n> - Ghi nhớ bảng danh từ biến đổi dị biệt (*люди, дети, друзья, братья...*) và hiện tượng rụng nguyên âm (*день $\\rightarrow$ дни*).\n> - Phân biệt nhóm danh từ chỉ có số ít (*Singularia tantum*) và chỉ có số nhiều (*Pluralia tantum*).\n\n---\n\n## 1. QUY TẮC ĐỔI SANG SỐ NHIỀU CƠ BẢN (CÁCH 1 SỐ NHIỀU)\n\n### 1.1. Danh từ Giống đực & Giống cái\nHai giống này có chung quy luật đuôi số nhiều: **-Ы** (cho thân cứng) hoặc **-И** (cho thân mềm và sau 7 phụ âm vàng).\n\n| Giống | Tận cùng số ít | Đuôi số nhiều | Ví dụ minh họa |\n| :--- | :--- | :---: | :--- |\n| **Giống đực** | Phụ âm cứng<br>-й<br>-ь<br>Sau 7 phụ âm | **-ы**<br>**-и**<br>**-и**<br>**-и** | студент $\\rightarrow$ студент**ы**, стол $\\rightarrow$ стол**ы**<br>музей $\\rightarrow$ музе**и**, трамвай $\\rightarrow$ трамва**и**<br>словарь $\\rightarrow$ словар**и**, преподаватель $\\rightarrow$ преподавател**и**<br>парк $\\rightarrow$ парк**и**, нож $\\rightarrow$ нож**и**, карандаш $\\rightarrow$ карандаш**и** |\n| **Giống cái** | -а<br>-я<br>-ь<br>-ия<br>Sau 7 phụ âm | **-ы**<br>**-и**<br>**-и**<br>**-ии**<br>**-и** | комната $\\rightarrow$ комнат**ы**, газета $\\rightarrow$ газет**ы**<br>песня $\\rightarrow$ песн**и**, деревня $\\rightarrow$ деревн**и**<br>тетрадь $\\rightarrow$ тетрад**и**, площадь $\\rightarrow$ площад**и**<br>аудитория $\\rightarrow$ аудитори**и**, станция $\\rightarrow$ станци**и**<br>книга $\\rightarrow$ книг**и**, ручка $\\rightarrow$ ручк**и** |\n\n### 1.2. Danh từ Giống trung\nQuy tắc đối xứng: tận cùng nguyên âm tròn biến thành nguyên âm bẹt.\n\n| Tận cùng số ít | Đuôi số nhiều | Ví dụ minh họa |\n| :--- | :---: | :--- |\n| **-о** *(thân cứng)* | **-а** | окн**о́** $\\rightarrow$ **о́**кн**а**, письм**о́** $\\rightarrow$ п**и́**сьм**а**, место $\\rightarrow$ мест**а́** |\n| **-е** *(thân mềm)* | **-я** | мор**е** $\\rightarrow$ мор**я́**, пол**е** $\\rightarrow$ пол**я́** |\n| **-ие** | **-ия** | здани**е** $\\rightarrow$ здани**я**, общежити**е** $\\rightarrow$ общежити**я** |\n| **-мя** | **-мена́** | вре**мя** $\\rightarrow$ вре**мена́**, и**мя** $\\rightarrow$ и**мена́** |\n\n---\n\n## 2. HIỆN TƯỢNG ĐẶC BIỆT 1: ĐUÔI -А́ / -Я́ CỦA GIỐNG ĐỰC\n\nMột số lượng lớn danh từ giống đực không dùng đuôi `-ы/-и` mà nhận đuôi **-а́ / -я́** luôn **nhấn trọng âm**:\n\n| Từ số ít | Nghĩa | Dạng số nhiều (Có trọng âm) |\n| :--- | :--- | :--- |\n| **дом** | ngôi nhà | **дома́** *(những ngôi nhà)* |\n| **город** | thành phố | **города́** *(các thành phố)* |\n| **поезд** | chuyến tàu | **поезда́** *(những chuyến tàu)* |\n| **паспорт** | hộ chiếu | **паспорта́** *(những cuốn hộ chiếu)* |\n| **профессор** | giáo sư | **профессора́** *(các giáo sư)* |\n| **доктор** | bác sĩ | **доктора́** *(các bác sĩ)* |\n| **учитель** | thầy giáo | **учителя́** *(các thầy giáo)* |\n| **глаз** | con mắt | **глаза́** *(đôi mắt)* |\n| **лес** | khu rừng | **леса́** *(những cánh rừng)* |\n| **вечер** | buổi tối | **вечера́** *(những buổi tối)* |\n| **берег** | bờ biển/sông | **берега́** *(những bờ sông/biển)* |\n\n---\n\n## 3. HIỆN TƯỢNG ĐẶC BIỆT 2: SỐ NHIỀU ĐỔI THÂN TỪ (-ЬЯ) & DỊ BIỆT\n\n### A. Nhóm nhận hậu tố -ья:\n- **друг** *(người bạn)* $\\rightarrow$ **друзья́** *(bạn bè)*\n- **брат** *(anh/em trai)* $\\rightarrow$ **бра́тья** *(các anh em)*\n- **стул** *(cái ghế)* $\\rightarrow$ **сту́лья** *(những cái ghế)*\n- **дерево** *(cái cây)* $\\rightarrow$ **дере́вья** *(những cái cây)*\n- **лист** *(chiếc lá)* $\\rightarrow$ **ли́стья** *(lá cây)*\n- **сын** *(con trai)* $\\rightarrow$ **сыновья́** *(những người con trai)*\n- **муж** *(người chồng)* $\\rightarrow$ **мужья́** *(những người chồng)*\n\n### B. Nhóm bất quy tắc dị biệt hoàn toàn (Супплетивизм):\n- **человек** *(người - số ít)* $\\rightarrow$ **лю́ди** *(con người/mọi người - số nhiều)*\n- **ребёнок** *(đứa trẻ - số ít)* $\\rightarrow$ **де́ти** *(trẻ em - số nhiều)*\n- **мать** *(người mẹ)* $\\rightarrow$ **ма́тери** *(những người mẹ)*\n- **дочь** *(con gái)* $\\rightarrow$ **до́чери** *(những người con gái)*\n- **ухо** *(cái tai)* $\\rightarrow$ **у́ши** *(đôi tai)*\n\n---\n\n## 4. HIỆN TƯỢNG RỤNG NGUYÊN ÂM ĐỆM (БЕГЛЫЕ ГЛАСНЫЕ О, Е)\n\nKhi chuyển sang số nhiều (hoặc khi biến cách), nguyên âm **о** hoặc **е** ở âm tiết cuối cùng của thân từ thường biến mất để rút gọn phát âm:\n- **день** *(ngày)* $\\rightarrow$ **дни** *(các ngày - không phải деня)*\n- **отец** *(người cha)* $\\rightarrow$ **отцы́**\n- **подарок** *(món quà)* $\\rightarrow$ **подарки**\n- **конец** *(sự kết thúc)* $\\rightarrow$ **концы́**\n- **рынок** *(chợ)* $\\rightarrow$ **рынки**\n- **сон** *(giấc mơ)* $\\rightarrow$ **сны**\n\n---\n\n## 5. DANH TỪ CHỈ DÙNG Ở MỘT SỐ (CHỈ SỐ ÍT HOẶC CHỈ SỐ NHIỀU)\n\n### 5.1. Danh từ chỉ có SỐ ÍT (Singularia tantum)\nKhông bao giờ có dạng số nhiều:\n1. **Chất liệu, thực phẩm:** *молоко (sữa), чай (trà), сахар (đường), масло (dầu/bơ), рис (gạo), мясо (thịt), золото (vàng)...*\n2. **Khái niệm trừu tượng, phẩm chất:** *любовь (tình yêu), мир (hòa bình), здоровье (sức khỏe), дружба (tình bạn), терпение (sự kiên nhẫn)...*\n3. **Danh từ tập hợp:** *молодёжь (giới trẻ), посуда (bát đĩa), обувь (giày dép)...*\n\n### 5.2. Danh từ chỉ có SỐ NHIỀU (Pluralia tantum)\nLuôn đi kèm với tính từ và động từ ở số nhiều:\n1. **Đồ vật ghép đôi / cấu tạo 2 nửa:**\n   - *очки* *(kính mắt)*: *Мои очки лежат на столе.*\n   - *ножницы* *(cái kéo)*\n   - *брюки / джинсы / штаны* *(quần dài / quần jeans)*\n   - *часы* *(đồng hồ)*\n2. **Thời gian, sự kiện:**\n   - *каникулы* *(kỳ nghỉ)*: *летние каникулы (kỳ nghỉ hè)*\n   - *сутки* *(ngày đêm 24 giờ)*\n   - *будни* *(ngày thường trong tuần)*\n3. **Tiền tệ và trò chơi:**\n   - *деньги* *(tiền bạc)*: *Где мои деньги?*\n   - *шахматы* *(cờ vua)*, *шашки* *(cờ ca-rô)*\n\n---\n\n## 6. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chuyển các danh từ sau sang số nhiều và đánh dấu trọng âm nếu có biến đổi:\n   - a) `город` *(thành phố)*\n   - b) `книга` *(sách)*\n   - c) `друг` *(bạn)*\n   - d) `день` *(ngày)*\n   - e) `письмо` *(bức thư)*\n   - f) `человек` *(người)*\n2. Cho biết các từ sau thuộc nhóm nào (*Chỉ số ít* hay *Chỉ số nhiều*):\n   - `деньги`, `молоко`, `очки`, `любовь`, `каникулы`.\n\n### Đáp án & Lời giải:\n1. Chuyển số nhiều:\n   - a) `город` $\\rightarrow$ **города́** *(đuôi -а́ có trọng âm)*.\n   - b) `книга` $\\rightarrow$ **кни́ги** *(sau г viết и)*.\n   - c) `друг` $\\rightarrow$ **друзья́** *(đuôi -ья, đổi gốc từ г $\\rightarrow$ з)*.\n   - d) `день` $\\rightarrow$ **дни** *(rụng nguyên âm е)*.\n   - e) `письмо` $\\rightarrow$ **пи́сьма** *(đổi đuôi о $\\rightarrow$ а, đảo trọng âm)*.\n   - f) `человек` $\\rightarrow$ **лю́ди** *(bất quy tắc hoàn toàn)*.\n2. Phân loại:\n   - **Chỉ số ít:** `молоко` *(chất liệu)*, `любовь` *(trừu tượng)*.\n   - **Chỉ số nhiều:** `деньги` *(tiền bạc)*, `очки` *(đồ vật đôi)*, `каникулы` *(kỳ nghỉ)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 4,
    "is_pro_only": false
  },
  {
    "id": "bai_05",
    "code": "bai_05",
    "title": "BÀI 05: TỔNG QUAN BẢN ĐỒ 6 CÁCH TRONG TIẾNG NGA",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 05: TỔNG QUAN BẢN ĐỒ 6 CÁCH TRONG TIẾNG NGA",
    "summary": "Hiểu rõ bản chất vì sao tiếng Nga có hệ thống Cách (Падеж) và tư duy ngôn ngữ đằng sau nó.\nNắm trọn **Bản đồ 6 Cách**: tên gọi, câu hỏi chất vấn (вопросы) và ý nghĩa cốt lõi của từng cách.\nKhám phá **lộ trình sư phạm tối ưu** để chinh phục 6 cách mà không bị quá tải.",
    "content_md": "# BÀI 05: TỔNG QUAN BẢN ĐỒ 6 CÁCH TRONG TIẾNG NGA\n## (Система падежей русского языка: Обзор и логика)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất vì sao tiếng Nga có hệ thống Cách (Падеж) và tư duy ngôn ngữ đằng sau nó.\n> - Nắm trọn **Bản đồ 6 Cách**: tên gọi, câu hỏi chất vấn (вопросы) và ý nghĩa cốt lõi của từng cách.\n> - Khám phá **lộ trình sư phạm tối ưu** để chinh phục 6 cách mà không bị quá tải.\n\n---\n\n## 1. CÁCH (ПАДЕЖ) LÀ GÌ? VÌ SAO PHẢI BIẾN CÁCH?\n\nTrong tiếng Việt, ta xác định vai trò của từ trong câu dựa vào **vị trí đứng trước/sau**:\n- *\"Mèo đuổi chuột\"* khác hoàn toàn với *\"Chuột đuổi mèo\"*.\n\nTrong tiếng Nga, **vị trí của từ có thể đảo lộn**, nhưng ai làm chủ thể, ai là đối tượng bị tác động được quyết định bởi **vĩ tố (đuôi biến cách)**:\n- *Кот ловит мышь* = Con mèo bắt con chuột.\n- *Мышь ловит кот* = Vẫn là con mèo bắt con chuột! (Vì đuôi *-шь* của chuột là đối cách - bị bắt, còn *кот* giữ nguyên Cách 1 - chủ ngữ).\n\n> [!IMPORTANT]\n> **Cách (Падеж)** là hình thức biến đổi đuôi của danh từ, đại từ, tính từ và số từ nhằm thể hiện **vai trò ngữ pháp** của từ đó trong câu (làm chủ ngữ, tân ngữ trực tiếp, tân ngữ gián tiếp, trạng ngữ nơi chốn, công cụ thực hiện...).\n\n---\n\n## 2. BẢN ĐỒ TOÀN CẢNH 6 CÁCH TIẾNG NGA\n\nTiếng Nga có chính xác **6 cách**. Mỗi cách luôn trả lời cho một cặp đại từ nghi vấn đặc trưng (Ai? / Cái gì?):\n\n```mermaid\nmindmap\n  root((HỆ THỐNG 6 CÁCH))\n    Cách 1: Именительный\n      Кто? Что?\n      Chủ ngữ, định danh\n    Cách 2: Родительный\n      Кого? Чего?\n      Sở hữu, vắng mặt, số lượng\n    Cách 3: Дательный\n      Кому? Чему?\n      Tiếp nhận, tuổi tác, cảm xúc\n    Cách 4: Винительный\n      Кого? Что? / Куда?\n      Tân ngữ trực tiếp, đích đến\n    Cách 5: Творительный\n      Кем? Чем?\n      Công cụ, nghề nghiệp, đi cùng\n    Cách 6: Предложный\n      О ком? О чём? / Где?\n      Địa điểm, chủ đề tư duy\n```\n\n### Bảng chi tiết 6 Cách:\n\n| STT | Tên tiếng Nga | Tên tiếng Việt | Câu hỏi chất vấn | Ý nghĩa cốt lõi & Giới từ tiêu biểu |\n| :---: | :--- | :--- | :--- | :--- |\n| **1** | **Именительный (И.п.)** | Cách 1 (Danh cách) | **Кто? Что?** *(Ai? Cái gì?)* | Dạng gốc từ điển; làm **chủ ngữ** thực hiện hành động. |\n| **2** | **Родительный (Р.п.)** | Cách 2 (Sinh cách) | **Кого? Чего?** *(Của ai? Của cái gì?)*<br>*Откуда? Сколько?* | Biểu thị **sở hữu**, **phủ định không có** (*нет*), **nguồn gốc xuất phát** (*из, с, от*), đi với **số từ**. |\n| **3** | **Дательный (Д.п.)** | Cách 3 (Dữ cách) | **Кому? Чему?** *(Cho ai? Cho cái gì?)*<br>*Куда?* | Đối tượng **tiếp nhận**, được tặng/cho; chỉ **tuổi tác**; trạng thái tâm lý (*мне надо, мне нравится*); giới từ *к, по*. |\n| **4** | **Винительный (В.п.)** | Cách 4 (Đối cách) | **Кого? Что?** *(Thấy ai? Cái gì?)*<br>*Куда?* | **Tân ngữ trực tiếp** chịu hành động tác động; chỉ **phương hướng di chuyển** với động từ chuyển động (*в, на*). |\n| **5** | **Творительный (Т.п.)** | Cách 5 (Tạo cách) | **Кем? Чем?** *(Bằng ai? Bằng cái gì?)*<br>*С кем? С чем?* | **Phương tiện/công cụ** hành động; biểu thị **nghề nghiệp** (*быть/работать кем*); quan hệ **đồng hành cùng ai** (*с*). |\n| **6** | **Предложный (П.п.)** | Cách 6 (Giới cách) | **О ком? О чём?** *(Về ai? Về gì?)*<br>**Где?** *(Ở đâu?)* | Biểu thị **địa điểm tĩnh** (*в, на*); đối tượng **suy nghĩ, thảo luận, nhớ về** (*о, об*). *Luôn luôn phải đi cùng giới từ!* |\n\n---\n\n## 3. THỨ TỰ SƯ PHẠM ĐỂ CHINH PHỤC 6 CÁCH\n\nKhông nên học theo thứ tự số học 1 $\\rightarrow$ 2 $\\rightarrow$ 3 $\\rightarrow$ 4 $\\rightarrow$ 5 $\\rightarrow$ 6 vì sẽ rất dễ nản lòng (Cách 2 và Cách 3 rất phức tạp).\nThứ tự sư phạm chuẩn quốc tế (và giáo trình hiện đại):\n\n1. **Cách 1 (И.п.):** Điểm xuất phát nhận biết danh từ và đại từ.\n2. **Cách 6 (П.п.):** Dễ nhất trong các cách gián tiếp vì hầu hết mọi giống ở số ít đều chỉ nhận **duy nhất một đuôi `-е`** (*в Москве, на столе, в школе*).\n3. **Cách 4 (В.п.):** Tân ngữ cơ bản và đối chiếu vị trí tĩnh (Cách 6 - Ở đâu) với di chuyển động (Cách 4 - Đi đâu).\n4. **Cách 2 (Р.п.):** Nắm vững sở hữu, cấu trúc *\"Tôi có / Tôi không có\"* (*У меня есть / У меня нет*).\n5. **Cách 3 (Д.п.):** Học cách nói tuổi tác, cảm xúc, biểu đạt nhu cầu cá nhân.\n6. **Cách 5 (Т.п.):** Giới thiệu bản thân làm nghề gì, đi lại bằng phương tiện gì, đi chơi cùng ai.\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nHãy xác định câu hỏi chất vấn và Cách ngữ pháp tương ứng cho từ in hoa trong các câu sau:\n1. Иван читает **КНИГУ**. *(Ivan đang đọc một cuốn sách)*\n2. Мы живём **В ХАНОЕ**. *(Chúng tôi sống ở Hà Nội)*\n3. У меня нет **ВРЕМЕНИ**. *(Tôi không có thời gian)*\n4. Я звоню **ДРУГУ**. *(Tôi đang gọi điện cho người bạn)*\n5. Он пишет **РУЧКОЙ**. *(Anh ấy đang viết bằng bút mực)*\n\n### Đáp án & Lời giải:\n1. **КНИГУ**: Trả lời câu hỏi *Что? (Đọc cái gì?)* $\\rightarrow$ **Cách 4 (Đối cách - Tân ngữ trực tiếp)**.\n2. **В ХАНОЕ**: Trả lời câu hỏi *Где? (Sống ở đâu?)* $\\rightarrow$ **Cách 6 (Giới cách - Địa điểm tĩnh)**.\n3. **ВРЕМЕНИ**: Trả lời câu hỏi *Чего нет? (Không có cái gì?)* $\\rightarrow$ **Cách 2 (Sinh cách - Phủ định không có)**.\n4. **ДРУГУ**: Trả lời câu hỏi *Кому? (Gọi điện cho ai?)* $\\rightarrow$ **Cách 3 (Dữ cách - Đối tượng tiếp nhận cuộc gọi)**.\n5. **РУЧКОЙ**: Trả lời câu hỏi *Чем? (Viết bằng công cụ gì?)* $\\rightarrow$ **Cách 5 (Tạo cách - Công cụ hành động)**.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 5,
    "is_pro_only": true
  },
  {
    "id": "bai_06",
    "code": "bai_06",
    "title": "BÀI 06: CÁCH 1 (ИМЕНИТЕЛЬНЫЙ ПАДЕЖ) – CHỦ NGỮ VÀ ĐỊNH DANH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 06: CÁCH 1 (ИМЕНИТЕЛЬНЫЙ ПАДЕЖ) – CHỦ NGỮ VÀ ĐỊNH DANH",
    "summary": "Nắm vững bản chất độc lập tuyệt đối của Cách 1 (Dạng thức không phụ thuộc).\nLàm chủ 4 chức năng cú pháp quan trọng nhất của Cách 1 trong câu.\nGiải mã tư duy ngôn ngữ cấu trúc *\"Tôi có...\"* (`У меня есть + Cách 1`) – lỗi sai kinh điển của người học Việt Nam.",
    "content_md": "# BÀI 06: CÁCH 1 (ИМЕНИТЕЛЬНЫЙ ПАДЕЖ) – CHỦ NGỮ VÀ ĐỊNH DANH\n## (Именительный падеж: Функции и употребление)\n\n> **Mục tiêu bài học:**\n> - Nắm vững bản chất độc lập tuyệt đối của Cách 1 (Dạng thức không phụ thuộc).\n> - Làm chủ 4 chức năng cú pháp quan trọng nhất của Cách 1 trong câu.\n> - Giải mã tư duy ngôn ngữ cấu trúc *\"Tôi có...\"* (`У меня есть + Cách 1`) – lỗi sai kinh điển của người học Việt Nam.\n\n---\n\n## 1. BẢN CHẤT CỦA CÁCH 1\n\n> [!IMPORTANT]\n> - Cách 1 (Именительный падеж) là **dạng nguyên thủy (dạng từ điển)** của mọi danh từ, đại từ, tính từ và số từ.\n> - **ĐẶC ĐIỂM SỐ 1:** Cách 1 **KHÔNG BAO GIỜ ĐI VỚI GIỚI TỪ**! Bất cứ khi nào bạn thấy một danh từ đi sau giới từ (*в, на, с, о, от...*), danh từ đó chắc chắn KHÔNG PHẢI ở Cách 1.\n> - **Câu hỏi chất vấn:**\n>   - **Кто?** *(Ai?)*: Dành cho danh từ động vật (người, con vật, sinh vật sống).\n>   - **Что?** *(Cái gì?)*: Dành cho danh từ bất động vật (đồ vật, sự việc, hiện tượng tự nhiên, khái niệm trừu tượng).\n\n---\n\n## 2. BỐN CHỨC NĂNG CÚ PHÁP CỦA CÁCH 1\n\n### 2.1. Làm Chủ ngữ của câu (Подлежащее)\nChủ ngữ là đối tượng trực tiếp thực hiện hành động hoặc ở vào một trạng thái:\n- **Студент** читает книгу. *(Người sinh viên đang đọc sách $\\rightarrow$ Кто читает? - Студент).*\n- **Поезд** прибывает вовремя. *(Chuyến tàu đến đúng giờ $\\rightarrow$ Что прибывает? - Поезд).*\n- На улице идёт **дождь**. *(Ngoài đường trời đang mưa $\\rightarrow$ Что идёт? - Дождь).*\n\n### 2.2. Làm Vị ngữ danh từ (Именная часть сказуемого)\nDùng để giới thiệu danh tính, nghề nghiệp, định nghĩa bản chất sự vật (ở thì hiện tại):\n- Москва — **столица** России. *(Moskva là thủ đô của nước Nga).*\n- Мой отец — **инженер**. *(Bố tôi là kỹ sư).*\n- Этот человек — наш **преподаватель**. *(Người này là giảng viên của chúng tôi).*\n\n### 2.3. Trong câu định danh một thành phần (Назывные предложения)\nNêu lên sự hiện diện, tồn tại của sự vật, hiện tượng trong hiện thực:\n- **Зима**. **Мороз**. **Тишина**. *(Mùa đông. Giá rét. Sự tĩnh lặng).*\n- Вот наш **университет**. *(Kìa là trường đại học của chúng tôi).*\n\n### 2.4. Dùng làm Hô ngữ / Lời gọi (Обращение)\nDùng khi gọi tên trực tiếp người đối thoại:\n- **Анна**, помоги мне, пожалуйста! *(Anna ơi, giúp tôi với!)*\n- Здравствуйте, **доктор**! *(Xin chào bác sĩ!)*\n\n---\n\n## 3. CẢNH BÁO BẪY TƯ DUY: CẤU TRÚC \"TÔI CÓ...\" (У МЕНЯ ЕСТЬ...)\n\nNgười Việt Nam nói:\n$$\\text{TÔI (Chủ ngữ)} + \\text{CÓ (Động từ)} + \\text{MỘT QUYỂN SÁCH (Tân ngữ)}$$\nVì thói quen này, rất nhiều bạn dịch sang tiếng Nga biến \"quyển sách\" thành đối cách.\n\n> [!CAUTION]\n> **Tư duy người Nga hoàn toàn ngược lại:**\n> Tiếng Nga không dùng cấu trúc *\"Tôi sở hữu cái gì\"*, mà dùng cấu trúc:\n> $$\\textbf{У кого} + \\textbf{есть} + \\textbf{ЧТО (Chủ ngữ ở Cách 1)!}$$\n> *(Nghĩa đen: \"Ở chỗ tôi ĐANG TỒN TẠI một quyển sách\")*\n\n### Ví dụ phân tích:\n- *У меня есть **новая машина**.* *(Tôi có một chiếc xe hơi mới).*\n  $\\rightarrow$ Trong câu này, **новая машина** (giống cái, số ít) là **CHỦ NGỮ** và chia ở **Cách 1**!\n- *У Антона есть **хорошие друзья**.* *(Anton có những người bạn tốt).*\n  $\\rightarrow$ **хорошие друзья** là chủ ngữ số nhiều ở **Cách 1**.\n- Khi hỏi ai có cái gì:\n  - *У вас есть **словарь**?* *(Bạn có từ điển không? $\\rightarrow$ словарь ở Cách 1).*\n\n---\n\n## 4. TỔNG HỢP ĐUÔI CÁCH 1 (SỐ ÍT & SỐ NHIỀU)\n\n| Giống | Cách 1 Số ít (Gốc từ điển) | Cách 1 Số nhiều |\n| :--- | :--- | :--- |\n| **Giống đực** | Phụ âm cứng / -й / -ь<br>*(студент, музей, словарь)* | **-ы / -и / -а́ / -я́**<br>*(студенты, музеи, словари, города́)* |\n| **Giống cái** | -а / -я / -ь / -ия<br>*(комната, песня, тетрадь, аудитория)* | **-ы / -и / -ии**<br>*(комнаты, песни, тетради, аудитории)* |\n| **Giống trung** | -о / -е / -ие / -мя<br>*(окно, море, здание, время)* | **-а / -я / -ия / -мена́**<br>*(о́кна, моря́, здания, времена́)* |\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Đặt câu hỏi (*Кто это?* hoặc *Что это?*) cho các từ in đậm:\n   - a) На столе лежит **газета**.\n   - b) В аудиторию вошёл **профессор**.\n   - c) В парке играют **дети**.\n2. Điền dạng đúng của từ trong ngoặc theo cấu trúc `У кого есть + Cách 1`:\n   - a) У меня есть (красивая собака).\n   - b) У брата есть (новый компьютер).\n   - c) У нас есть (русско-вьетнамский словарь).\n\n### Đáp án & Lời giải:\n1. Đặt câu hỏi:\n   - a) **газета** là vật bất động $\\rightarrow$ **Что лежит на столе?**\n   - b) **профессор** là người/động vật $\\rightarrow$ **Кто вошёл в аудиторию?**\n   - c) **дети** là người $\\rightarrow$ **Кто играет в парке?**\n2. Điền dạng đúng (giữ nguyên Cách 1):\n   - a) У меня есть **красивая собака**.\n   - b) У брата есть **новый компьютер**.\n   - c) У нас есть **русско-вьетнамский словарь**.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 6,
    "is_pro_only": true
  },
  {
    "id": "bai_07",
    "code": "bai_07",
    "title": "BÀI 07: CÁCH 6 (ПРЕДЛОЖНЫЙ ПАДЕЖ) – CÁCH GIỚI TỪ",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 07: CÁCH 6 (ПРЕДЛОЖНЫЙ ПАДЕЖ) – CÁCH GIỚI TỪ",
    "summary": "Hiểu rõ bản chất vì sao gọi là *\"Cách Giới từ\"* (Cách duy nhất bắt buộc luôn có giới từ).\nNắm vững quy tắc chia đuôi số ít: sự thống trị của vĩ tố `-е` và bộ 3 ngoại lệ nhận đuôi `-и`.\nLàm chủ nhóm danh từ giống đực nhận đuôi nhấn `-у́ / -ю́` (*в лесу, в саду, в аэропорту...*).\nPhân biệt chính xác cách dùng giới từ **В** và **НА** trong thực tế.",
    "content_md": "# BÀI 07: CÁCH 6 (ПРЕДЛОЖНЫЙ ПАДЕЖ) – CÁCH GIỚI TỪ\n## (Предложный падеж: Местоположение и объект мысли)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất vì sao gọi là *\"Cách Giới từ\"* (Cách duy nhất bắt buộc luôn có giới từ).\n> - Nắm vững quy tắc chia đuôi số ít: sự thống trị của vĩ tố `-е` và bộ 3 ngoại lệ nhận đuôi `-и`.\n> - Làm chủ nhóm danh từ giống đực nhận đuôi nhấn `-у́ / -ю́` (*в лесу, в саду, в аэропорту...*).\n> - Phân biệt chính xác cách dùng giới từ **В** và **НА** trong thực tế.\n\n---\n\n## 1. ĐẶC ĐIỂM BẢN CHẤT CỦA CÁCH 6\n\n> [!IMPORTANT]\n> Cách 6 (Предложный падеж) là cách **DUY NHẤT** trong tiếng Nga **không bao giờ đứng độc lập một mình**. Nó bắt buộc phải luôn luôn đi kèm với một trong các giới từ: **В, НА, О (ОБ, ОБО), ПРИ**.\n> \n> **Hai câu hỏi chất vấn cốt lõi:**\n> 1. **Где?** *(Ở đâu?)*: Biểu thị địa điểm tĩnh, nơi chốn diễn ra hành động (đi với giới từ **В** hoặc **НА**).\n> 2. **О ком? О чём?** *(Về ai? Về cái gì?)*: Biểu thị đối tượng của tư duy, lời nói, cảm xúc (đi với giới từ **О / ОБ / ОБО**).\n\n---\n\n## 2. QUY TẮC ĐUÔI SỐ ÍT CÁCH 6 (CỰC KỲ DỄ NHỚ)\n\nĐiểm tuyệt vời của Cách 6 số ít là: **Hầu hết mọi danh từ (cả Đực, Cái, Trung) đều biến đổi thành vĩ tố `-Е`!**\n\n### 2.1. Quy tắc chung: Vĩ tố `-Е`\n- **Giống đực:**\n  - *стол* $\\rightarrow$ на стол**е** *(trên bàn)*\n  - *город* $\\rightarrow$ в город**е** *(trong thành phố)*\n  - *музей* $\\rightarrow$ в музе**е** *(trong bảo tàng)*\n  - *словарь* $\\rightarrow$ в словар**е** *(trong từ điển)*\n- **Giống cái:**\n  - *комната* $\\rightarrow$ в комнат**е** *(trong phòng)*\n  - *школа* $\\rightarrow$ в школ**е** *(ở trường học)*\n  - *деревня* $\\rightarrow$ в деревн**е** *(ở làng quê)*\n- **Giống trung:**\n  - *окно* $\\rightarrow$ на окн**е** *(trên cửa sổ)*\n  - *море* $\\rightarrow$ в мор**е** *(trong biển)*\n\n### 2.2. Ba trường hợp đặc biệt nhận Vĩ tố `-И` (Quy tắc \"Tam -и\")\n\n> [!WARNING]\n> Không nhận đuôi `-е` mà nhận đuôi **`-и`** trong 3 trường hợp sau:\n> 1. **Danh từ giống cái đuôi `-ь`:**\n>    - *тетрадь* $\\rightarrow$ в тетрад**и**\n>    - *площадь* $\\rightarrow$ на площад**и**\n>    - *кровать* $\\rightarrow$ в кроват**и**\n> 2. **Danh từ tận cùng `-ия`:**\n>    - *Россия* $\\rightarrow$ в Росси**и**\n>    - *аудитория* $\\rightarrow$ в аудитори**и**\n>    - *станция* $\\rightarrow$ на станци**и**\n> 3. **Danh từ tận cùng `-ие`:**\n>    - *здание* $\\rightarrow$ в здани**и**\n>    - *общежитие* $\\rightarrow$ в общежити**и**\n\n*(Riêng 10 từ tận cùng `-мя`: время $\\rightarrow$ о врем**ени**, имя $\\rightarrow$ об им**ени**).*\n\n---\n\n## 3. NGOẠI LỆ GIỐNG ĐỰC NHẬN ĐUÔI NHẤN `-У́ / -Ю́` (CHỈ KHI CHỈ NƠI CHỐN)\n\nCó khoảng gần 100 danh từ giống đực, khi đi với giới từ **В / НА** để trả lời câu hỏi **Где? (Ở đâu?)**, sẽ không dùng `-е` mà nhận đuôi **`-у́ / -ю́` luôn nhấn trọng âm**:\n\n| Danh từ gốc | Cụm từ nơi chốn Cách 6 (Có trọng âm) | Ý nghĩa tiếng Việt |\n| :--- | :--- | :--- |\n| **лес** | в лес**у́** | trong rừng |\n| **сад** | в сад**у́** | trong vườn |\n| **пол** | на пол**у́** | trên sàn nhà |\n| **шкаф** | в шкаф**у́** | trong tủ |\n| **угол** | на / в угл**у́** | ở góc (đường/phòng) |\n| **берег** | на берег**у́** | trên bờ (biển/sông) |\n| **мост** | на мост**у́** | trên cầu |\n| **аэропорт** | в аэропорт**у́** | ở sân bay |\n| **Крым** | в Крым**у́** | ở bán đảo Crưm |\n| **год** | в этом год**у́** | trong năm nay |\n\n> [!NOTE]\n> **Điểm cực kỳ quan trọng:** Nếu các từ trên đi với giới từ **О (nói/nghĩ về cái gì)** thì chúng **QUAY LẠI ĐUÔI `-Е`** bình thường!\n> - *Мы гуляли в лес**у́**.* (Chúng tôi dạo chơi trong rừng - *Где?*)\n> - *Мы говорили о лес**е**.* (Chúng tôi nói chuyện về khu rừng - *О чём?*)\n\n---\n\n## 4. CHIẾN LƯỢC PHÂN BIỆT GIỚI TỪ “В” VÀ “НА”\n\nRất nhiều người học nhầm lẫn khi nào dùng **В**, khi nào dùng **НА**. Hãy áp dụng ma trận tư duy sau:\n\n| Tiêu chí | Dùng giới từ **В** (Trong) | Dùng giới từ **НА** (Trên / Tại) |\n| :--- | :--- | :--- |\n| **Không gian vật lý** | **Bên trong một không gian kín**, có 4 bức tường, ranh giới rõ ràng:<br>- *в комнате, в классе, в доме*<br>- *в коробке, в чемодане* | **Trên bề mặt tiếp xúc phẳng**:<br>- *на столе, на стене, на полу*<br>**Không gian mở, trời đất bao la, không trần**:<br>- *на улице, на стадионе, на стадионе, на рынке* |\n| **Địa lý hành chính** | Các quốc gia, thành phố, châu lục:<br>- *в России, в Ханое, в Азии* | Hòn đảo, bán đảo, ven bờ, 4 phương hướng:<br>- *на острове, на Кипре, на берегу*<br>- *на севере, на юге, на востоке, на западе* |\n| **Khái niệm sự kiện** | Địa điểm tòa nhà cụ thể:<br>- *в университете, в театре, в банке* | **Sự kiện, buổi biểu diễn, hoạt động đang diễn ra**:<br>- *на уроке, на лекции, на концерте*<br>- *на работе, на экскурсии, на встрече* |\n| **Phương tiện đi lại** | *(Ít gặp hơn)* | Phương tiện giao thông:<br>- *на автобусе, на поезде, на метро, на такси* |\n\n---\n\n## 5. ĐUÔI CÁCH 6 SỐ NHIỀU\n\nBiến đổi số nhiều ở Cách 6 cực kỳ đồng nhất:\n- Thân cứng: thêm **-АХ** (*в домах, на столах, в комнатах, в окнах*).\n- Thân mềm: thêm **-ЯХ** (*в словарях, в музеях, в деревнях, в зданиях*).\n\n---\n\n## 6. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chia dạng Cách 6 của từ trong ngoặc:\n   - a) Мой брат учится в (университет).\n   - b) Книга лежит на (стол).\n   - c) Мы живём в (Россия).\n   - d) Дети гуляют в (сад).\n   - e) Студенты сидят в (аудитория).\n   - f) Мы мечтаем о (лето).\n2. Điền giới từ thích hợp (**В** hoặc **НА**):\n   - a) Вчера мы были _____ концерте.\n   - b) Моя мама сейчас _____ работе.\n   - c) Пальто висит _____ шкафу.\n   - d) Мы гуляем _____ улице.\n\n### Đáp án & Lời giải:\n1. Chia Cách 6:\n   - a) в **университете** *(đuôi -е)*.\n   - b) на **столе** *(đuôi -е)*.\n   - c) в **России** *(đuôi -и vì tận cùng là -ия)*.\n   - d) в **саду́** *(đuôi trọng âm -у́ chỉ nơi chốn)*.\n   - e) в **аудитории** *(đuôi -и vì tận cùng là -ия)*.\n   - f) о **лете** *(đuôi -е)*.\n2. Điền giới từ:\n   - a) **на** концерте *(sự kiện)*.\n   - b) **на** работе *(hoạt động/sự kiện công việc)*.\n   - c) **в** шкафу *(bên trong không gian kín)*.\n   - d) **на** улице *(không gian mở ngoài trời)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 7,
    "is_pro_only": true
  },
  {
    "id": "bai_08",
    "code": "bai_08",
    "title": "BÀI 08: CÁCH 4 (ВИНИТЕЛЬНЫЙ ПАДЕЖ) – ĐỐI CÁCH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 08: CÁCH 4 (ВИНИТЕЛЬНЫЙ ПАДЕЖ) – ĐỐI CÁCH",
    "summary": "Nắm trọn 2 chức năng lớn nhất của Cách 4: **Tân ngữ trực tiếp** và **Phương hướng di chuyển (Куда?)**.\nKhắc cốt ghi tâm quy luật **Động vật (Одушевлённый) vs Bất động vật (Неодушевлённый)**.\nPhân biệt chuẩn xác giữa câu hỏi **Где? (Cách 6)** và **Куда? (Cách 4)**.",
    "content_md": "# BÀI 08: CÁCH 4 (ВИНИТЕЛЬНЫЙ ПАДЕЖ) – ĐỐI CÁCH\n## (Винительный падеж: Прямое дополнение и направление движения)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn 2 chức năng lớn nhất của Cách 4: **Tân ngữ trực tiếp** và **Phương hướng di chuyển (Куда?)**.\n> - Khắc cốt ghi tâm quy luật **Động vật (Одушевлённый) vs Bất động vật (Неодушевлённый)**.\n> - Phân biệt chuẩn xác giữa câu hỏi **Где? (Cách 6)** và **Куда? (Cách 4)**.\n\n---\n\n## 1. HAI CHỨC NĂNG CỐT LÕI CỦA CÁCH 4\n\n```mermaid\nflowchart TD\n    C4[\"CÁCH 4 (ВИНИТЕЛЬНЫЙ ПАДЕЖ)\"]\n    C4 --> F1[\"1. Tân ngữ trực tiếp\\n(Sau ngoại động từ)\\nКого? Что?\\nVí dụ: читать книгу, любить маму\"]\n    C4 --> F2[\"2. Phương hướng chuyển động\\n(Đi đến đâu?)\\nКуда? (в / на + C4)\\nVí dụ: идти в школу, ехать на вокзал\"]\n```\n\n### 1.1. Tân ngữ trực tiếp (Прямое дополнение)\nĐứng sau các ngoại động từ (động từ tác động trực tiếp lên đối tượng không cần giới từ):\n- *читать* (đọc gì?), *слушать* (nghe gì?), *смотреть* (xem gì?)\n- *любить* (yêu ai?), *знать* (biết ai/cái gì?), *понимать* (hiểu ai/cái gì?)\n- *покупать* (mua gì?), *встречать* (gặp ai?)...\n\n### 1.2. Hướng chuyển động (Куда? - Đi đâu?)\nĐi cùng các động từ chuyển động (*идти, ехать, лететь, бежать, пойти...*) với giới từ **В** hoặc **НА**:\n- Я иду **в университет** (Tôi đang đi đến trường đại học).\n- Мы едем **на море** (Chúng tôi đang đi biển).\n\n---\n\n## 2. QUY LUẬT ĐỘNG VẬT VS BẤT ĐỘNG VẬT (LINH HỒN CỦA CÁCH 4)\n\nTrong tiếng Nga, danh từ được chia làm 2 nhóm bản chất:\n1. **Động vật (Одушевлённые):** Người, muông thú, côn trùng, sinh vật sống (*студент, друг, кот, собака...*).\n2. **Bất động vật (Неодушевлённые):** Đồ vật, thực vật, hiện tượng tự nhiên, khái niệm trừu tượng (*стол, книга, дерево, музыка, мир...*).\n\n### BẢNG BIẾN CÁCH 4 SỐ ÍT:\n\n| Giống danh từ | Tính chất danh từ | Công thức Cách 4 số ít | Ví dụ minh họa |\n| :--- | :--- | :---: | :--- |\n| **GIỐNG ĐỰC** | **Bất động vật** | **C4 = C1** *(Giữ nguyên!)* | Я вижу новый **дом**, **стол**, **музей**. |\n| | **Động vật** | **C4 = C2** *(thêm -а / -я)* | Я вижу **студента** *(студент)*, **друга** *(друг)*, **учителя** *(учитель)*. |\n| **GIỐNG CÁI** | **Cả 2 nhóm** *(Đều phải biến đổi!)* | **-а $\\rightarrow$ -У**<br>**-я $\\rightarrow$ -Ю**<br>**-ия $\\rightarrow$ -ИЮ**<br>*-ь $\\rightarrow$ giữ nguyên* | Я читаю **книгу** *(книга)*.<br>Я слушаю **песню** *(песня)*.<br>Я люблю **Россию** *(Россия)*.<br>Я читаю **тетрадь** *(тетрадь)*. |\n| **GIỐNG TRUNG**| **Bất động vật** | **C4 = C1** *(Luôn giữ nguyên!)* | Я вижу **окно**, **море**, **здание**. |\n\n> [!NOTE]\n> - Lưu ý danh từ giống cái chỉ người có đuôi `-ь` (*мать, дочь*): Cách 4 giữ nguyên là *мать, дочь* (hoặc biến theo dạng C2: *матерь/дочерь*).\n> - Danh từ giống đực chỉ người tận cùng bằng `-а/-я` (*папа, дедушка, дядя*): biến đuôi như giống cái nhưng mang ý nghĩa chỉ người nam: *Я люблю папу, дедушку, дядю*.\n\n---\n\n## 3. ĐỐI CHIẾU SỐNG CÒN: ГДЕ? (CÁCH 6) VS КУДА? (CÁCH 4)\n\nĐây là cặp phạm trù kinh điển mà mọi kỳ thi tiếng Nga (TRKI) đều kiểm tra:\n\n| Tiêu chí | Trạng thái TĨNH: Ở ĐÂU? (ГДЕ?) | Trạng thái ĐỘNG: ĐI ĐÂU? (КУДА?) |\n| :--- | :--- | :--- |\n| **Ngữ pháp** | **В / НА + CÁCH 6** | **В / НА + CÁCH 4** |\n| **Động từ đi kèm** | *жить, быть, учиться, работать, сидеть, стоять, лежать...* | *идти, ходить, ехать, ездить, лететь, класть, ставить...* |\n| **Ví dụ 1 (Phòng)** | Мы сидим **в комнате**. *(Chúng tôi đang ngồi trong phòng)* | Мы входим **в комнату**. *(Chúng tôi bước vào trong phòng)* |\n| **Ví dụ 2 (Bàn)** | Книга лежит **на столе**. *(Quyển sách đang nằm trên bàn)* | Я кладу книгу **на стол**. *(Tôi đặt quyển sách lên bàn)* |\n| **Ví dụ 3 (Nhà hát)** | Вчера мы были **в театре**. *(Hôm qua chúng tôi đã ở nhà hát)* | Вечером мы идём **в театр**. *(Tối nay chúng tôi đi đến nhà hát)* |\n| **Ví dụ 4 (Sân vận động)** | Матч идёт **на стадионе**. *(Trận đấu diễn ra trên SVĐ)* | Фанаты идут **на стадион**. *(Người hâm mộ đi tới SVĐ)* |\n\n---\n\n## 4. QUY LUẬT CÁCH 4 Ở SỐ NHIỀU\n\nỞ số nhiều, ranh giới giống đực - cái - trung bị xóa nhòa, chỉ còn duy nhất quy luật Động vật:\n\n- **Bất động vật (Đồ vật, sự việc của cả 3 giống):**\n  $$\\mathbf{C4\\ Số\\ nhiều = C1\\ Số\\ nhiều}$$\n  - *Я покупаю книги, столы, компьютеры, письма.*\n- **Động vật (Người, muông thú của cả 3 giống):**\n  $$\\mathbf{C4\\ Số\\ nhiều = C2\\ Số\\ nhiều}$$\n  - *Я вижу студентов, студенток, преподавателей, врачей, собак.*\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chia Cách 4 cho các từ trong ngoặc (chức năng tân ngữ):\n   - a) Я читаю (интересная книга).\n   - b) Мы встретили (наш преподаватель).\n   - c) Вчера я купил (новый телефон).\n   - d) Антон любит (своя собака).\n2. Điền dạng đúng của từ trong ngoặc (phân biệt Cách 4 và Cách 6):\n   - a) Студенты идут в (библиотека), а профессор уже сидит в (библиотека).\n   - b) Дети бегут на (стадион), потому что на (стадион) идёт матч.\n   - c) Я кладу ручку на (стол), и теперь она лежит на (стол).\n\n### Đáp án & Lời giải:\n1. Chia Cách 4:\n   - a) Я читаю **интересную книгу** *(giống cái: -ая $\\rightarrow$ -ую, -а $\\rightarrow$ -у)*.\n   - b) Мы встретили **нашего преподавателя** *(giống đực động vật: C4 = C2)*.\n   - c) Вчера я купил **новый телефон** *(giống đực bất động: C4 = C1 giữ nguyên)*.\n   - d) Антон любит **свою собаку** *(giống cái: biến đuôi -у)*.\n2. Phân biệt Cách 4 (Куда?) và Cách 6 (Где?):\n   - a) идут в **библиотеку** (Куда? - C4) / сидит в **библиотеке** (Где? - C6).\n   - b) бегут на **стадион** (Куда? - C4) / идёт на **стадионе** (Где? - C6).\n   - c) кладу на **стол** (Куда? - C4) / лежит на **столе** (Где? - C6).\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 8,
    "is_pro_only": true
  },
  {
    "id": "bai_09",
    "code": "bai_09",
    "title": "BÀI 09: CÁCH 2 (РОДИТЕЛЬНЫЙ ПАДЕЖ) – SINH CÁCH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 09: CÁCH 2 (РОДИТЕЛЬНЫЙ ПАДЕЖ) – SINH CÁCH",
    "summary": "Nắm trọn 5 chức năng ngữ pháp đồ sộ của Cách 2 – cách đa năng và xuất hiện nhiều nhất trong văn bản tiếng Nga.\nLàm chủ cấu trúc phủ định vắng mặt: `НЕТ / НЕ БЫЛО / НЕ БУДЕТ + Cách 2`.\nNắm vững bộ ba giới từ xuất phát điểm: `ИЗ / С / ОТ + Cách 2` (hệ đối ứng với hướng đến).\nChinh phục quy tắc chia đuôi số ít và ma trận đuôi số nhiều của Cách 2.",
    "content_md": "# BÀI 09: CÁCH 2 (РОДИТЕЛЬНЫЙ ПАДЕЖ) – SINH CÁCH\n## (Родительный падеж: Принадлежность, отрицание и количество)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn 5 chức năng ngữ pháp đồ sộ của Cách 2 – cách đa năng và xuất hiện nhiều nhất trong văn bản tiếng Nga.\n> - Làm chủ cấu trúc phủ định vắng mặt: `НЕТ / НЕ БЫЛО / НЕ БУДЕТ + Cách 2`.\n> - Nắm vững bộ ba giới từ xuất phát điểm: `ИЗ / С / ОТ + Cách 2` (hệ đối ứng với hướng đến).\n> - Chinh phục quy tắc chia đuôi số ít và ma trận đuôi số nhiều của Cách 2.\n\n---\n\n## 1. NĂM CHỨC NĂNG CỐT LÕI CỦA CÁCH 2\n\n```mermaid\nflowchart TD\n    C2[\"CÁCH 2 (РОДИТЕЛЬНЫЙ ПАДЕЖ)\\nКого? Чего? Откуда? Сколько?\"]\n    C2 --> F1[\"1. Sở hữu / Quan hệ thuộc tính\\n(Của ai? Của cái gì?)\\nкнига студента, центр города\"]\n    C2 --> F2[\"2. Phủ định sự tồn tại\\n(Không có ai / cái gì)\\nнет времени, не было денег\"]\n    C2 --> F3[\"3. Xuất phát điểm (Откуда?)\\n(Từ đâu / từ ai về)\\nиз школы, с работы, от врача\"]\n    C2 --> F4[\"4. Sau giới từ chi phối C2\\nдля, после, до, около, без...\"]\n    C2 --> F5[\"5. Đi sau số từ & lượng từ\\n2, 3, 4 + C2 số ít\\n5+, много, мало + C2 số nhiều\"]\n```\n\n---\n\n## 2. CHI TIẾT CÁC CẤU TRÚC ỨNG DỤNG CỦA CÁCH 2\n\n### 2.1. Biểu thị quan hệ sở hữu & thuộc tính\nDanh từ ở Cách 2 luôn đứng **sau** danh từ mà nó bổ nghĩa:\n- Комната **брата** *(Căn phòng của người anh trai)*.\n- Берег **моря** *(Bờ của biển = Bờ biển)*.\n- Стакан **воды** *(Một cốc nước)*.\n- Урок **русского языка** *(Tiết học tiếng Nga)*.\n\n### 2.2. Phủ định sự tồn tại (Cấu trúc \"KHÔNG CÓ...\")\nKhi biểu thị sự không có mặt, không tồn tại của một ai đó hay vật gì, đối tượng đó **bắt buộc phải chia ở Cách 2**:\n\n| Thời | Cấu trúc phủ định | Ví dụ minh họa |\n| :--- | :--- | :--- |\n| **Hiện tại** | **НЕТ + Cách 2** | У меня **нет времени**. *(Tôi không có thời gian)*<br>Сегодня брата **нет** дома. *(Hôm nay anh trai không có ở nhà)* |\n| **Quá khứ** | **НЕ БЫЛО + Cách 2** | Вчера у нас **не было уроков**. *(Hôm qua chúng tôi không có tiết học)*<br>Вчера его **не было** на работе. *(Hôm qua anh ấy không có ở chỗ làm)* |\n| **Tương lai** | **НЕ БУДЕТ + Cách 2** | Завтра **не будет дождя**. *(Ngày mai sẽ không có mưa)*<br>Меня завтра **не будет** в городе. *(Ngày mai tôi sẽ không có ở thành phố)* |\n\n### 2.3. Hướng xuất phát (Откуда? - Từ đâu đến / về?)\nĐây là hệ thống đối ứng không gian chuẩn xác tuyệt đối trong tiếng Nga:\n\n$$\\begin{aligned}\n\\text{Đi đến bằng }\\textbf{В}\\text{ (C4)} &\\longleftrightarrow \\text{Trở về bằng }\\textbf{ИЗ}\\text{ (C2)} \\\\\n\\text{Đi đến bằng }\\textbf{НА}\\text{ (C4)} &\\longleftrightarrow \\text{Trở về bằng }\\textbf{С / СО}\\text{ (C2)} \\\\\n\\text{Đi đến người }\\textbf{К}\\text{ (C3)} &\\longleftrightarrow \\text{Rời khỏi người }\\textbf{ОТ}\\text{ (C2)}\n\\end{aligned}$$\n\n- Đi vào trường: *в школу* $\\rightarrow$ Đi từ trường về: **из школы**.\n- Đi sang Nga: *в Россию* $\\rightarrow$ Đến từ nước Nga: **из России**.\n- Đi làm: *на работу* $\\rightarrow$ Tan sở về: **с работы**.\n- Đi SVĐ: *на стадион* $\\rightarrow$ Rời SVĐ: **со стадиона**.\n- Đi gặp bác sĩ: *к врачу* $\\rightarrow$ Rời chỗ bác sĩ về: **от врача**.\n\n### 2.4. Các giới từ luôn luôn đi với Cách 2\n- **для** *(dành cho)*: подарок для мамы *(quà cho mẹ)*.\n- **после** *(sau khi)*: после уроков *(sau giờ học)*.\n- **до** *(trước khi / cho tới)*: до вечера *(cho tới tối)*, до еды *(trước bữa ăn)*.\n- **около / возле** *(ở gần)*: около дома *(gần nhà)*.\n- **без** *(không có / thiếu)*: чай без сахара *(trà không đường)*.\n- **из-за** *(vì lý do tiêu cực / từ phía sau)*: из-за дождя *(do trời mưa)*.\n\n---\n\n## 3. BẢNG BIẾN ĐỔI CÁCH 2 SỐ ÍT VÀ SỐ NHIỀU\n\n### 3.1. Đuôi Cách 2 Số ít:\n| Giống danh từ | Quy tắc đuôi | Ví dụ |\n| :--- | :---: | :--- |\n| **Giống đực** | Thân cứng $\\rightarrow$ **-А**<br>Thân mềm $\\rightarrow$ **-Я** | студент $\\rightarrow$ студент**а**, стол $\\rightarrow$ стол**а**<br>музей $\\rightarrow$ музе**я**, словарь $\\rightarrow$ словар**я** |\n| **Giống trung** | Thân cứng $\\rightarrow$ **-А**<br>Thân mềm $\\rightarrow$ **-Я**<br>Từ đuôi -мя $\\rightarrow$ **-ЕНИ** | окно $\\rightarrow$ окн**а**, место $\\rightarrow$ мест**а**<br>море $\\rightarrow$ мор**я**, здание $\\rightarrow$ здани**я**<br>время $\\rightarrow$ врем**ени**, имя $\\rightarrow$ им**ени** |\n| **Giống cái** | Thân cứng $\\rightarrow$ **-Ы**<br>Thân mềm $\\rightarrow$ **-И**<br>Sau 7 phụ âm $\\rightarrow$ **-И** | комната $\\rightarrow$ комнат**ы**, сестра $\\rightarrow$ сестр**ы**<br>песня $\\rightarrow$ песн**и**, тетрадь $\\rightarrow$ тетрад**и**<br>книга $\\rightarrow$ книг**и**, ручка $\\rightarrow$ ручк**и** |\n\n### 3.2. Đuôi Cách 2 Số nhiều (Trọng điểm thi cử):\n- **Giống đực:**\n  - Thân cứng: thêm **-ОВ** (*студентов, домов, городов, столов*).\n  - Tận cùng `-й`: biến thành **-ЕВ** (*музеев, чаев*).\n  - Tận cùng `-ь` hoặc âm xuýt (*ж, ч, ш, щ*): nhận đuôi **-ЕЙ** (*словарей, врачей, ножей, этажей*).\n- **Giống cái & Giống trung:**\n  - Quy tắc rơi rụng vĩ tố (**Vĩ tố 0 - Нулевое окончание**):\n    - *комната* $\\rightarrow$ **комнат**; *школа* $\\rightarrow$ **школ**; *студентка* $\\rightarrow$ **студенток** *(chèn nguyên âm đệm о)*; *девушка* $\\rightarrow$ **девушек** *(chèn е)*.\n    - *место* $\\rightarrow$ **мест**; *окно* $\\rightarrow$ **окон**; *дело* $\\rightarrow$ **дел**.\n  - Tận cùng `-ия / -ие`: nhận đuôi **-ИЙ** (*аудиторий, общежитий, зданий*).\n  - Giống cái đuôi `-ь`: nhận đuôi **-ЕЙ** (*тетрадей, площадей, ночей*).\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Viết lại các câu sau sang thể phủ định ở hiện tại và quá khứ (`нет` và `не было`):\n   - a) У меня есть свободное время.\n   - b) Вчера в клубе был концерт.\n   - c) В городе есть метро.\n2. Điền giới từ thích hợp (`из`, `с`, `от`):\n   - a) Анна вернулась _____ Москвы вчера.\n   - b) Отец пришёл _____ завода поздно вечером.\n   - c) Брат только что вышел _____ врача.\n3. Chia Cách 2 cho từ trong ngoặc:\n   - a) Я купил килограмм (сахар) и бутылку (вода).\n   - b) Это комната (моя старшая сестра).\n   - c) На столе лежит много (книги) и (тетради).\n\n### Đáp án & Lời giải:\n1. Chuyển phủ định:\n   - a) Hiện tại: У меня **нет свободного времени**.\n   - b) Quá khứ: Вчера в клубе **не было концерта**.\n   - c) Hiện tại: В городе **нет метро** *(метро không biến cách)*.\n2. Điền giới từ xuất phát:\n   - a) **из** Москвы *(đối ứng với в Москву)*.\n   - b) **с** завода *(đối ứng với на завод)*.\n   - c) **от** врача *(đối ứng với к врачу)*.\n3. Chia Cách 2:\n   - a) килограмм **сахара**, бутылку **воды**.\n   - b) комната **моей старшей сестры**.\n   - c) много **книг** *(giống cái vĩ tố 0)*, много **тетрадей** *(đuôi -ей)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 9,
    "is_pro_only": true
  },
  {
    "id": "bai_10",
    "code": "bai_10",
    "title": "BÀI 10: CÁCH 3 (ДАТЕЛЬНЫЙ ПАДЕЖ) – DỮ CÁCH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 10: CÁCH 3 (ДАТЕЛЬНЫЙ ПАДЕЖ) – DỮ CÁCH",
    "summary": "Hiểu rõ bản chất của Dữ cách (xuất phát từ động từ *дать* - cho, tặng) trong vai trò **Đối tượng tiếp nhận**.\nNắm vững cấu trúc nói tuổi tác: `Кому (Cách 3) + số tuổi` (tránh lỗi dùng Cách 1).\nLàm chủ cấu trúc câu vô nhân xưng diễn tả cảm giác, nhu cầu: `Мне нужно / надо / холодно / нравится...`\nGhi nhớ bảng đuôi số ít (-у/-ю, -е/-и) và số nhiều (-ам/-ям) của Cách 3.",
    "content_md": "# BÀI 10: CÁCH 3 (ДАТЕЛЬНЫЙ ПАДЕЖ) – DỮ CÁCH\n## (Дательный падеж: Адресат действия, возраст и состояние)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất của Dữ cách (xuất phát từ động từ *дать* - cho, tặng) trong vai trò **Đối tượng tiếp nhận**.\n> - Nắm vững cấu trúc nói tuổi tác: `Кому (Cách 3) + số tuổi` (tránh lỗi dùng Cách 1).\n> - Làm chủ cấu trúc câu vô nhân xưng diễn tả cảm giác, nhu cầu: `Мне нужно / надо / холодно / нравится...`\n> - Ghi nhớ bảng đuôi số ít (-у/-ю, -е/-и) và số nhiều (-ам/-ям) của Cách 3.\n\n---\n\n## 1. BẢN CHẤT VÀ CÂU HỎI CHẤT VẤN CỦA CÁCH 3\n\n> [!IMPORTANT]\n> - Cách 3 (Дательный падеж) trả lời cho câu hỏi:\n>   - **Кому?** *(Cho ai? Đến ai?)*: Danh từ chỉ người, động vật.\n>   - **Чему?** *(Cho cái gì?)*: Danh từ chỉ sự vật, hiện tượng.\n> - Đây là cách đại diện cho **Người thụ hưởng / Đối tượng tiếp nhận hành động** hoặc **Chủ thể trải nghiệm trạng thái tâm sinh lý**.\n\n---\n\n## 2. BỐN MÔ HÌNH NGỮ PHÁP KINH ĐIỂN CỦA CÁCH 3\n\n```mermaid\nmindmap\n  root((CÁCH 3: ДАТЕЛЬНЫЙ))\n    Tân ngữ gián tiếp\n      дарить другу\n      помогать маме\n      звонить сестре\n    Nói tuổi tác\n      Мне 20 лет\n      Брату 15 лет\n      Сколько вам лет?\n    Trạng thái & Nhu cầu\n      Мне холодно\n      Ему нужно/надо\n      Нам можно/нельзя\n    Thích thú нравиться\n      Мне нравится Москва\n      Ей нравятся цветы\n```\n\n### 2.1. Làm Tân ngữ gián tiếp (Người nhận quà, thư, lời nói, sự giúp đỡ)\nĐi với các động từ trao tặng, thông báo, trợ giúp:\n- **давать / дать** *(cho/đưa)*, **подарить** *(tặng)*:\n  - Отец подарил сыну (**сын**) новый велосипед. *(Bố tặng cho con trai một chiếc xe đạp mới).*\n- **помогать / помочь** *(giúp đỡ)*:\n  - Я всегда помогаю маме (**мама**). *(Tôi luôn giúp đỡ mẹ).*\n- **звонить / позвонить** *(gọi điện)*:\n  - Вечером я позвоню подруге (**подруга**). *(Tối tôi sẽ gọi cho cô bạn gái).*\n- **советовать / посоветовать** *(khuyên)*:\n  - Врач советует пациенту (**пациент**) отдыхать. *(Bác sĩ khuyên bệnh nhân nghỉ ngơi).*\n- **мешать** *(làm phiền/cản trở)*:\n  - Не мешай мне (**я**)! *(Đừng làm phiền tôi!)*\n\n### 2.2. Biểu thị Số tuổi (Возраст)\n\n> [!CAUTION]\n> **LỖI PHỔ BIẾN:** Người Việt hay nói *\"Tôi 20 tuổi\"*, nên dịch sai thành *Я 20 лет* (SAI!).\n> **QUY TẮC:** Trong tiếng Nga, con người không \"là\" số tuổi, mà số tuổi \"được trao cho\" con người:\n> $$\\textbf{Chủ thể (Cách 3)} + \\textbf{Số lượng} + \\textbf{год / года / лет}$$\n\n- **Мне** 20 лет. *(Tôi 20 tuổi).*\n- Моему **брату** 25 лет. *(Anh trai tôi 25 tuổi).*\n- Нашей **бабушке** 70 лет. *(Bà chúng tôi 70 tuổi).*\n- Сколько **вам** лет? *(Bạn/Ngài bao nhiêu tuổi?)*\n\n### 2.3. Câu vô nhân xưng diễn tả cảm giác và nhu cầu\nTrong các câu này không có chủ ngữ ngữ pháp; người trải nghiệm cảm giác đứng ở **Cách 3**:\n- **Мне холодно.** *(Tôi thấy lạnh).*\n- **Ему скучно.** *(Anh ấy thấy buồn chán).*\n- **Нам весело.** *(Chúng tôi thấy vui vẻ).*\n- Đi với các từ tình thái **нужно / надо** *(cần)*, **можно** *(được phép)*, **нельзя** *(cấm)*:\n  - **Студентам** нужно много читать. *(Các sinh viên cần đọc nhiều).*\n  - **Детям** нельзя пить холодную воду. *(Trẻ con không được uống nước lạnh).*\n\n### 2.4. Động từ “НРАВИТЬСЯ” (Thích)\nKhác với tiếng Anh (*I like Moscow*), tiếng Nga đảo ngược góc nhìn: *\"Moscow làm cho tôi thấy thích\"*:\n$$\\textbf{Người thích (Cách 3)} + \\textbf{нравится / нравятся} + \\textbf{Vật được thích (Cách 1)}$$\n- **Мне нравится** эта книга. *(Tôi thích cuốn sách này - книга ở Cách 1 số ít).*\n- **Ивану нравятся** русские песни. *(Ivan thích các bài hát Nga - песни ở Cách 1 số nhiều).*\n\n---\n\n## 3. HAI GIỚI TỪ ĐẶC TRƯNG CỦA CÁCH 3: “К” VÀ “ПО”\n\n1. **Giới từ К / КО (Đến gần, tới hướng của ai/vật gì):**\n   - Я иду **к врачу** *(Tôi đi đến chỗ bác sĩ)*.\n   - Поезд подъехал **к станции** *(Đoàn tàu tiến lại gần nhà ga)*.\n2. **Giới từ ПО (Dọc theo bề mặt, lĩnh vực môn học, phương tiện liên lạc):**\n   - Мы гуляем **по улице** / **по парку** *(Chúng tôi dạo bước dọc theo con phố / công viên)*.\n   - Учебник **по физике** *(Sách giáo khoa môn Vật lý)*.\n   - Разговаривать **по телефону** *(Nói chuyện qua điện thoại)*.\n\n---\n\n## 4. BẢNG VĨ TỐ CÁCH 3 (SỐ ÍT & SỐ NHIỀU)\n\n| Giống danh từ | Đuôi Cách 3 Số ít | Ví dụ số ít | Đuôi Cách 3 Số nhiều | Ví dụ số nhiều |\n| :--- | :---: | :--- | :---: | :--- |\n| **Giống đực** | Thân cứng $\\rightarrow$ **-У**<br>Thân mềm $\\rightarrow$ **-Ю** | студент $\\rightarrow$ студент**у**<br>учитель $\\rightarrow$ учител**ю** | Thân cứng $\\rightarrow$ **-АМ**<br>Thân mềm $\\rightarrow$ **-ЯМ** | студент**ам**<br>учител**ям** |\n| **Giống trung** | Thân cứng $\\rightarrow$ **-У**<br>Thân mềm $\\rightarrow$ **-Ю**<br>-мя $\\rightarrow$ **-ЕНИ** | окно $\\rightarrow$ окн**у**<br>море $\\rightarrow$ мор**ю**<br>время $\\rightarrow$ врем**ени** | Thân cứng $\\rightarrow$ **-АМ**<br>Thân mềm $\\rightarrow$ **-ЯМ** | окн**ам**<br>мор**ям** |\n| **Giống cái** | Thân cứng & mềm $\\rightarrow$ **-Е**<br>Tận cùng `-ь` & `-ия` $\\rightarrow$ **-И** | мама $\\rightarrow$ мам**е**<br>песня $\\rightarrow$ песн**е**<br>тетрадь $\\rightarrow$ тетрад**и**<br>Россия $\\rightarrow$ Росси**и** | Thân cứng $\\rightarrow$ **-АМ**<br>Thân mềm $\\rightarrow$ **-ЯМ** | мам**ам**<br>песн**ям**<br>тетрад**ям**<br>аудитори**ям** |\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chia dạng Cách 3 của từ trong ngoặc:\n   - a) Я часто пишу письма (родители).\n   - b) (Антон) исполнилось 22 года.\n   - c) Преподаватель объясняет урок (студенты).\n   - d) (Сестра) очень нравится этот фильм.\n2. Điền giới từ `к` hoặc `по`:\n   - a) Завтра я пойду в поликлинику _____ терапевту.\n   - b) Туристы медленно шли _____ красивой набережной.\n   - c) Бабушка любит смотреть передачи _____ телевизору.\n\n### Đáp án & Lời giải:\n1. Chia Cách 3:\n   - a) пишу письма **родителям** *(số nhiều thân cứng: -ам)*.\n   - b) **Антону** исполнилось 22 года *(nói tuổi tác: giống đực -у)*.\n   - c) объясняет урок **студентам** *(số nhiều: -ам)*.\n   - d) **Сестре** очень нравится этот фильм *(giống cái: -е)*.\n2. Điền giới từ:\n   - a) **к** терапевту *(đến chỗ bác sĩ chuyên khoa)*.\n   - b) **по** красивой набережной *(dọc theo bờ kè)*.\n   - c) **по** телевизору *(qua màn hình ti vi)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 10,
    "is_pro_only": true
  },
  {
    "id": "bai_11",
    "code": "bai_11",
    "title": "BÀI 11: CÁCH 5 (ТВОРИТЕЛЬНЫЙ ПАДЕЖ) – TẠO CÁCH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 11: CÁCH 5 (ТВОРИТЕЛЬНЫЙ ПАДЕЖ) – TẠO CÁCH",
    "summary": "Hiểu rõ nguồn gốc từ chữ *“творить” (tạo nên, tác tạo)* của Tạo cách.\nPhân biệt rạch ròi giữa **Công cụ thực hiện (không có giới từ)** và **Đồng hành cùng ai (bắt buộc có giới từ С)**.\nLàm chủ cấu trúc nói về nghề nghiệp, đam mê: `быть / стать / работать / заниматься + Cách 5`.\nGiải mã tư duy độc đáo của cụm *\"Мы с братом\"* và nhóm giới từ vị trí không gian (*над, под, перед, за, между*).",
    "content_md": "# BÀI 11: CÁCH 5 (ТВОРИТЕЛЬНЫЙ ПАДЕЖ) – TẠO CÁCH\n## (Творительный падеж: Инструмент, профессия и совместность)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ nguồn gốc từ chữ *“творить” (tạo nên, tác tạo)* của Tạo cách.\n> - Phân biệt rạch ròi giữa **Công cụ thực hiện (không có giới từ)** và **Đồng hành cùng ai (bắt buộc có giới từ С)**.\n> - Làm chủ cấu trúc nói về nghề nghiệp, đam mê: `быть / стать / работать / заниматься + Cách 5`.\n> - Giải mã tư duy độc đáo của cụm *\"Мы с братом\"* và nhóm giới từ vị trí không gian (*над, под, перед, за, между*).\n\n---\n\n## 1. HAI PHẠM TRÙ LỚN NHẤT CỦA CÁCH 5: CÔNG CỤ VS ĐỒNG HÀNH\n\nĐây là sự phân biệt sống còn giúp bạn không bao giờ dùng nhầm giới từ:\n\n| Tiêu chí | 1. CÔNG CỤ / PHƯƠNG TIỆN THỰC HIỆN | 2. QUAN HỆ ĐỒNG HÀNH (CÙNG VỚI AI/CÁI GÌ) |\n| :--- | :--- | :--- |\n| **Giới từ** | **TUYỆT ĐỐI KHÔNG CÓ GIỚI TỪ!** | **BẮT BUỘC PHẢI CÓ GIỚI TỪ “С / СО”!** |\n| **Câu hỏi** | **Чем?** *(Bằng cái gì?)* | **С кем? С чем?** *(Cùng với ai? Kèm với món gì?)* |\n| **Bản chất** | Vật thể là công cụ trực tiếp tạo ra hành động | Đối tượng cùng tham gia, cùng hiện diện bên cạnh |\n| **Ví dụ** | - Я пишу **ручкой** *(Tôi viết bằng bút).*<br>- Он режет хлеб **ножом** *(Anh ấy cắt bánh mì bằng dao).*<br>- Мы едим суп **ложкой** *(Chúng tôi ăn súp bằng thìa).* | - Я гуляю **с другом** *(Tôi đi dạo cùng bạn).*<br>- Мы пили чай **с лимоном** *(Chúng tôi uống trà với chanh).*<br>- Студент разговаривает **с преподавателем** *(Sinh viên nói chuyện với giảng viên).* |\n\n---\n\n## 2. NGHỀ NGHIỆP, VAI TRÒ VÀ SỰ ĐAM MÊ (KHÔNG DÙNG GIỚI TỪ)\n\nKhi nói về nghề nghiệp ở quá khứ/tương lai, sự trở thành hoặc lĩnh vực luyện tập, tiếng Nga **bắt buộc chi phối Cách 5**:\n\n### 2.1. Động từ liên kết: БЫТЬ, СТАТЬ, РАБОТАТЬ, ЯВЛЯТЬСЯ\n- **работать** *(làm việc với tư cách là)*:\n  - Мой отец работает **инженером** *(Bố tôi làm kỹ sư)*.\n  - Анна работает **переводчицей** *(Anna làm phiên dịch viên)*.\n- **быть** *(ở quá khứ hoặc tương lai)*:\n  - Раньше он был **студентом**, а сейчас он врач. *(Trước đây anh ấy là sinh viên, còn bây giờ là bác sĩ)*.\n  - Я буду **преподавателем**. *(Tôi sẽ làm giảng viên)*.\n- **стать** *(trở thành)*:\n  - Брат хочет стать **программистом**. *(Em trai muốn trở thành lập trình viên)*.\n- **являться** *(chính là / là - dùng trong văn phong học thuật)*:\n  - Москва является **столицей** России. *(Moskva chính là thủ đô của Nga)*.\n\n### 2.2. Nhóm động từ đam mê, tự hào:\n- **заниматься** *(học tập / tập luyện)*:\n  - Я занимаюсь **спортом** и **русским языком**. *(Tôi tập thể thao và học tiếng Nga)*.\n- **увлекаться** *(say mê, thích thú)*:\n  - Сестра увлекается **музыкой** и **живописью**. *(Chị gái say mê âm nhạc và hội họa)*.\n- **гордиться** *(tự hào về ai/gì)*:\n  - Родители гордятся своим **сыном**. *(Cha mẹ tự hào về người con trai của mình)*.\n- **руководить / управлять** *(lãnh đạo / điều hành)*:\n  - Директор руководит **компанией**. *(Giám đốc điều hành công ty)*.\n\n---\n\n## 3. CÁC ĐẶC TRƯNG ĐỘC ĐÁO KHÁC CỦA CÁCH 5\n\n### 3.1. Cấu trúc tư duy Slav: “МЫ С...”\nKhi người Việt nói *\"Tôi và anh trai đi xem phim\"*, người Nga thường dùng:\n$$\\textbf{Мы с братом}\\text{ ходили в кино.}$$\n*(Nghĩa đen: \"Chúng tôi cùng với anh trai\" = Tôi và anh trai).*\n- *Мы с Анной* = Tôi và Anna.\n- *Мы с друзьями* = Tôi và các bạn của tôi.\n\n### 3.2. Nhóm 5 giới từ chỉ vị trí không gian đi với Cách 5:\n- **НАД** *(ở phía trên, lơ lửng)*: Лампа висит **над столом** *(Đèn treo trên bàn)*.\n- **ПОД** *(ở phía dưới, dưới gầm)*: Кот спит **под диваном** *(Mèo ngủ dưới ghế sofa)*.\n- **ПЕРЕД** *(ở phía trước mặt)*: **Перед домом** растёт красивый сад *(Trước nhà có khu vườn đẹp)*.\n- **ЗА** *(ở phía sau, đằng sau)*: Солнце скрылось **за горой** *(Mặt trời lặn sau ngọn núi)*.\n- **МЕЖДУ** *(ở giữa hai đối tượng)*: Стол стоит **между окнами** *(Bàn nằm giữa hai cửa sổ)*.\n\n---\n\n## 4. BẢNG VĨ TỐ CÁCH 5 (SỐ ÍT & SỐ NHIỀU)\n\n### 4.1. Cách 5 Số ít:\n| Giống danh từ | Đuôi Cách 5 Số ít | Quy tắc & Ví dụ |\n| :--- | :---: | :--- |\n| **Giống đực** | Thân cứng $\\rightarrow$ **-ОМ**<br>Thân mềm $\\rightarrow$ **-ЕМ**<br>Âm xuýt/Ц nhấn trọng âm $\\rightarrow$ **-ОМ**<br>Âm xuýt/Ц không nhấn $\\rightarrow$ **-ЕМ** | студент $\\rightarrow$ студент**ом**, брат $\\rightarrow$ брат**ом**<br>учитель $\\rightarrow$ учител**ем**, музей $\\rightarrow$ музе**ем**<br>врач $\\rightarrow$ врач**о́м**, отец $\\rightarrow$ отц**о́м**<br>товарищ $\\rightarrow$ тов**а́**рищ**ем**, палец $\\rightarrow$ п**а́**льц**ем** |\n| **Giống trung** | Thân cứng $\\rightarrow$ **-ОМ**<br>Thân mềm $\\rightarrow$ **-ЕМ**<br>-мя $\\rightarrow$ **-ЕНЕМ** | окно $\\rightarrow$ окн**о́м**, место $\\rightarrow$ мест**ом**<br>море $\\rightarrow$ мор**ем**, здание $\\rightarrow$ здани**ем**<br>время $\\rightarrow$ врем**енем**, имя $\\rightarrow$ им**енем** |\n| **Giống cái** | Thân cứng $\\rightarrow$ **-ОЙ (-ою)**<br>Thân mềm $\\rightarrow$ **-ЕЙ (-ею)**<br>Đuôi `-ь` $\\rightarrow$ **-ЬЮ** | мама $\\rightarrow$ мам**ой**, сестра $\\rightarrow$ сестр**ой**<br>песня $\\rightarrow$ песн**ей**, деревня $\\rightarrow$ деревн**ей**<br>тетрадь $\\rightarrow$ тетрад**ью**, ночь $\\rightarrow$ ноч**ью**, мать $\\rightarrow$ матер**ью** |\n\n### 4.2. Cách 5 Số nhiều:\n- Thân cứng $\\rightarrow$ **-АМИ** (*студентами, столами, комнатами, окнами*).\n- Thân mềm $\\rightarrow$ **-ЯМИ** (*учителями, словарями, песнями, морями*).\n- Bất quy tắc cần nhớ: **людьми** *(với mọi người)*, **детьми** *(với trẻ con)*, **друзьями** *(với bạn bè)*.\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Điền từ trong ngoặc ở dạng Cách 5 (chú ý có cần giới từ `с` hay không):\n   - a) Утром я всегда пью кофе (сахар и молоко).\n   - b) Мой младший брат хочет стать (врач).\n   - c) Мальчик аккуратно рисует картину (карандаш).\n   - d) Мы долго разговаривали (наш преподаватель).\n   - e) Анна каждый день занимается (спорт).\n2. Điền giới từ thích hợp (`над`, `под`, `перед`, `за`, `между`):\n   - a) Самолёт летит _____ облаками.\n   - b) Машина остановилась _____ входом в гостиницу.\n   - c) Собака спряталась _____ столом.\n\n### Đáp án & Lời giải:\n1. Chia Cách 5:\n   - a) с **сахаром и молоком** *(đồng hành: có giới từ с)*.\n   - b) стать **врачом** *(nghề nghiệp: không giới từ)*.\n   - c) **карандашом** *(công cụ vẽ: không giới từ)*.\n   - d) с **нашим преподавателем** *(trò chuyện cùng ai: có giới từ с)*.\n   - e) **спортом** *(đam mê tập luyện: không giới từ)*.\n2. Điền giới từ không gian:\n   - a) **над** облаками *(bay ở phía trên tầng mây)*.\n   - b) **перед** входом *(dừng ở phía trước lối vào)*.\n   - c) **под** столом *(trốn ở phía dưới gầm bàn)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 11,
    "is_pro_only": true
  },
  {
    "id": "bai_12",
    "code": "bai_12",
    "title": "BÀI 12: MA TRẬN TỔNG HỢP BIẾN CÁCH DANH TỪ 6 CÁCH",
    "level": "A2",
    "category": "Hệ thống 6 Cách",
    "topic": "Hệ thống 6 Cách",
    "vi": "BÀI 12: MA TRẬN TỔNG HỢP BIẾN CÁCH DANH TỪ 6 CÁCH",
    "summary": "Sở hữu **Bảng tra cứu cứu sinh toàn diện** cho cả 6 Cách ở Số ít và Số nhiều.\nNắm trọn các quy luật đồng dạng (quy luật \"đốt cháy giai đoạn\" giúp ghi nhớ thần tốc).\nTự tin giải quyết bất kỳ bài tập biến cách danh từ nào trong các kỳ thi chuẩn hóa TRKI.",
    "content_md": "# BÀI 12: MA TRẬN TỔNG HỢP BIẾN CÁCH DANH TỪ 6 CÁCH\n## (Сводная матрица склонения имён существительных)\n\n> **Mục tiêu bài học:**\n> - Sở hữu **Bảng tra cứu cứu sinh toàn diện** cho cả 6 Cách ở Số ít và Số nhiều.\n> - Nắm trọn các quy luật đồng dạng (quy luật \"đốt cháy giai đoạn\" giúp ghi nhớ thần tốc).\n> - Tự tin giải quyết bất kỳ bài tập biến cách danh từ nào trong các kỳ thi chuẩn hóa TRKI.\n\n---\n\n## 1. MA TRẬN BIẾN CÁCH SỐ ÍT (ЕДИНСТВЕННОЕ ЧИСЛО)\n\n| Cách (Падеж) | Câu hỏi | GIỐNG ĐỰC (М.р.) | GIỐNG TRUNG (Ср.р.) | GIỐNG CÁI (Ж.р.) |\n| :---: | :---: | :--- | :--- | :--- |\n| **CÁCH 1**<br>*(И.п.)* | **Кто? Что?** | **студент** *(cứng)*<br>**музей** / **словарь** *(mềm)* | **окно** *(cứng)*<br>**море** / **здание** *(mềm)*<br>**время** *(-мя)* | **комната** *(cứng)*<br>**песня** / **тетрадь** *(mềm)*<br>**аудитория** *(-ия)* |\n| **CÁCH 2**<br>*(Р.п.)* | **Кого? Чего?**<br>*Откуда? Сколько?* | студент-**а**<br>музе-**я** / словар-**я** | окн-**а**<br>мор-**я** / здани-**я**<br>врем-**ени** | комнат-**ы** *(k/g/h $\\rightarrow$ -и)*<br>песн-**и** / тетрад-**и**<br>аудитори-**и** |\n| **CÁCH 3**<br>*(Д.п.)* | **Кому? Чему?** | студент-**у**<br>музе-**ю** / словар-**ю** | окн-**у**<br>мор-**ю** / здани-**ю**<br>врем-**ени** | комнат-**е**<br>песн-**е**<br>тетрад-**и** / аудитори-**и** |\n| **CÁCH 4**<br>*(В.п.)* | **Кого? Что?**<br>*Куда?* | - Bất động: **= C1** *(стол)*<br>- Động vật: **= C2** *(студента)* | **= C1** *(Luôn giữ nguyên!)*<br>окно, море, здание | комнат-**у**<br>песн-**ю**<br>тетрадь *(giữ nguyên!)*<br>аудитори-**ю** |\n| **CÁCH 5**<br>*(Т.п.)* | **Кем? Чем?**<br>*С кем? С чем?* | студент-**ом**<br>музе-**ем** / словар-**ём** | окн-**ом**<br>мор-**ем** / здани-**ем**<br>врем-**енем** | комнат-**ой**<br>песн-**ей**<br>тетрадь-**ю**<br>аудитори-**ей** |\n| **CÁCH 6**<br>*(П.п.)* | **О ком? О чём?**<br>*Где?* | в/о студент-**е**<br>музе-**е** / словар-**е**<br>*(Nơi chốn: в лесу́, в саду́)* | в/об окн-**е**<br>мор-**е**<br>здани-**и** *(đuôi -и!)*<br>врем-**ени** | в/о комнат-**е**<br>песн-**е**<br>тетрад-**и** *(đuôi -и!)*<br>аудитори-**и** *(đuôi -и!)* |\n\n---\n\n## 2. MA TRẬN BIẾN CÁCH SỐ NHIỀU (МНОЖЕСТВЕННОЕ ЧИСЛО)\n\n> [!TIP]\n> **Nhận xét giải phóng trí não:** Ở số nhiều, đuôi của Cách 3, Cách 5, Cách 6 của CẢ BA GIỐNG đều giống hệt nhau!\n> - Cách 3: luôn là **-АМ / -ЯМ**\n> - Cách 5: luôn là **-АМИ / -ЯМИ**\n> - Cách 6: luôn là **-АХ / -ЯХ**\n\n| Cách | Câu hỏi | Quy tắc vĩ tố chung cho cả 3 giống (Thân cứng / Thân mềm) |\n| :---: | :---: | :--- |\n| **CÁCH 1** | **Кто? Что?** | - Giống đực & cái: **-Ы / -И** *(студенты, комнаты, книги)*; Đực nhấn: **-А́/-Я́** *(дома, города)*<br>- Giống trung: **-А / -Я** *(о́кна, моря, здания)* |\n| **CÁCH 2** | **Кого? Чего?** | - Giống đực: **-ОВ / -ЕВ** *(студентов, музеев)* hoặc **-ЕЙ** *(словарей, врачей)*<br>- Giống cái & trung: **VĨ TỐ 0** *(комнат, книг, окон)* hoặc **-ИЙ** *(аудиторий, зданий)*, đuôi -ь $\\rightarrow$ **-ЕЙ** *(тетрадей)* |\n| **CÁCH 3** | **Кому? Чему?** | Thân cứng $\\rightarrow$ **-АМ** *(студентам, окнам, комнатам)*<br>Thân mềm $\\rightarrow$ **-ЯМ** *(словарям, морям, песням, тетрадям)* |\n| **CÁCH 4** | **Кого? Что?** | - **Bất động vật:** $\\mathbf{C4 = C1}$ *(вижу книги, столы, окна)*<br>- **Động vật:** $\\mathbf{C4 = C2}$ *(вижу студентов, студенток, преподавателей)* |\n| **CÁCH 5** | **Кем? Чем?** | Thân cứng $\\rightarrow$ **-АМИ** *(студентами, окнами, комнатами)*<br>Thân mềm $\\rightarrow$ **-ЯМИ** *(словарями, морями, песнями, тетрадями)*<br>*(Ngoại lệ: людьми, детьми, друзьями)* |\n| **CÁCH 6** | **О ком? О чём?** | Thân cứng $\\rightarrow$ **-АХ** *(о студентах, в окнах, в комнатах)*<br>Thân mềm $\\rightarrow$ **-ЯХ** *(о словарях, в морях, о песнях, в тетрадях)* |\n\n---\n\n## 3. BA QUY TẮC \"CỨU MẠNG\" TRONG PHÒNG THI\n\n1. **Quy tắc Động vật Cách 4:**\n   - Số ít: Chỉ giống đực động vật mới biến đổi ($C4 = C2$). Giống cái luôn biến đổi (-у/-ю). Giống trung luôn giữ nguyên ($C4 = C1$).\n   - Số nhiều: Bất động vật giữ nguyên ($C4 = C1$); Động vật luôn đổi theo Cách 2 ($C4 = C2$).\n2. **Quy tắc \"Tam -и\" của Cách 6:**\n   - Đuôi `-и` chỉ xuất hiện ở: danh từ giống cái đuôi `-ь` (*тетради*), danh từ đuôi `-ия` (*России*), và danh từ đuôi `-ие` (*здании*). Còn lại 95% danh từ đều nhận đuôi `-е`!\n3. **Quy tắc xuất phát điểm:**\n   - Vào đâu bằng **В** $\\rightarrow$ Ra khỏi đó bằng **ИЗ**.\n   - Đến đâu bằng **НА** $\\rightarrow$ Rời khỏi đó bằng **С**.\n   - Đến gặp ai bằng **К** $\\rightarrow$ Rời khỏi ai bằng **ОТ**.\n\n---\n\n## 4. BÀI TẬP TỔNG HỢP TOÀN BỘ 6 CÁCH\n\n### Đề bài:\nCho danh từ `студент` và `книга`. Hãy chia danh từ này qua cả 6 Cách ở dạng số ít và số nhiều:\n\n### Đáp án mẫu:\n| Cách | `студент` (Số ít / Số nhiều) | `книга` (Số ít / Số nhiều) |\n| :---: | :--- | :--- |\n| **C1** | студент / студенты | книга / книги |\n| **C2** | студента / студентов | книги / книг |\n| **C3** | студенту / студентам | книге / книгам |\n| **C4** | студент**а** / студент**ов** *(Động vật: = C2)* | книг**у** / книг**и** *(Bất động: = C1)* |\n| **C5** | студентом / студентами | книгой / книгами |\n| **C6** | о студенте / о студентах | о книге / о книгах |\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 12,
    "is_pro_only": true
  },
  {
    "id": "bai_13",
    "code": "bai_13",
    "title": "BÀI 13: PHÂN LOẠI & BIẾN CÁCH TÍNH TỪ THEO GIỐNG, SỐ, CÁCH",
    "level": "A2",
    "category": "Tính từ",
    "topic": "Tính từ",
    "vi": "BÀI 13: PHÂN LOẠI & BIẾN CÁCH TÍNH TỪ THEO GIỐNG, SỐ, CÁCH",
    "summary": "Hiểu rõ nguyên lý **Hợp dạng Tính - Danh (Согласование)**: Tính từ là chiếc bóng của danh từ (cùng Giống, cùng Số, cùng Cách).\nNắm trọn bảng biến cách tính từ thân cứng, thân mềm và sau phụ âm đặc biệt.\nKhám phá hiện tượng phát âm đặc biệt: đuôi `-ого / -его` phát âm là `[-ово / -ево]`.",
    "content_md": "# BÀI 13: PHÂN LOẠI & BIẾN CÁCH TÍNH TỪ THEO GIỐNG, SỐ, CÁCH\n## (Имя прилагательное: Склонение и согласование с существительными)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ nguyên lý **Hợp dạng Tính - Danh (Согласование)**: Tính từ là chiếc bóng của danh từ (cùng Giống, cùng Số, cùng Cách).\n> - Nắm trọn bảng biến cách tính từ thân cứng, thân mềm và sau phụ âm đặc biệt.\n> - Khám phá hiện tượng phát âm đặc biệt: đuôi `-ого / -его` phát âm là `[-ово / -ево]`.\n\n---\n\n## 1. NGUYÊN LÝ HỢP DẠNG: \"CHIẾC BÓNG CỦA DANH TỪ\"\n\nTrong tiếng Nga, danh từ làm chủ, tính từ đi theo phục vụ:\n$$\\text{Tính từ} = \\mathbf{Giống\\ (Danh\\ từ)} + \\mathbf{Số\\ (Danh\\ từ)} + \\mathbf{Cách\\ (Danh\\ từ)}$$\n\n### Dạng nguyên thể (Cách 1 số ít):\n- **Giống đực:** đuôi **-ЫЙ** *(thân cứng: новый)*, **-ОЙ** *(trọng âm ở đuôi: молодой, большой)*, **-ИЙ** *(thân mềm/7 phụ âm: синий, русский, хороший)*.\n- **Giống cái:** đuôi **-АЯ** *(thân cứng: новая)*, **-ЯЯ** *(thân mềm: синяя)*.\n- **Giống trung:** đuôi **-ОЕ** *(thân cứng: новое)*, **-ЕЕ** *(thân mềm/âm xuýt không trọng âm: синее, хорошее)*.\n- **Số nhiều (cả 3 giống):** đuôi **-ЫЕ** *(новые)*, **-ИЕ** *(синие, русские)*.\n\n---\n\n## 2. MA TRẬN BIẾN CÁCH TÍNH TỪ QUA 6 CÁCH\n\n### 2.1. Nhóm Giống đực & Giống trung (Luôn đi đôi cùng nhau)\nỞ các cách gián tiếp (C2, C3, C5, C6), tính từ giống đực và giống trung biến đổi **giống hệt nhau 100%**:\n\n| Cách | Thân cứng *(новый, новое)* | Thân mềm *(синий, синее)* | Sau âm xuýt *(хороший, -ее)* |\n| :---: | :--- | :--- | :--- |\n| **C1** | нов-**ый** / нов-**ое** | син-**ий** / син-**ее** | хорош-**ий** / хорош-**ее** |\n| **C2** | нов-**ого** *[phát âm: -ово]* | син-**его** *[phát âm: -ево]* | хорош-**его** *[-ево]* |\n| **C3** | нов-**ому** | син-**ему** | хорош-**ему** |\n| **C4** | - Bất động: **= C1** *(новый дом)*<br>- Động vật: **= C2** *(нового друга)* | - Bất động: **= C1** *(синий шар)*<br>- Động vật: **= C2** *(синего кита)* | - Bất động: **= C1**<br>- Động vật: **= C2** |\n| **C5** | нов-**ым** | син-**им** | хорош-**им** |\n| **C6** | о нов-**ом** | о син-**ем** | о хорош-**ем** |\n\n> [!NOTE]\n> **Quy tắc phát âm vàng:** Đuôi `-ого` và `-его` ở Cách 2 luôn phát âm chữ `г` thành âm **[в]**!\n> - *нового* đọc là `[но́вава]`.\n> - *хорошего* đọc là `[харóшэва]`.\n> - *моего, твоего, его* đọc là `[майэвó, твайэвó, йэвó]`.\n\n### 2.2. Nhóm Giống cái (Quy luật 4 cách đồng dạng)\n\n> [!TIP]\n> **Điểm cực dễ nhớ của tính từ giống cái:**\n> Trong 6 cách, tính từ giống cái chỉ có đúng **3 hình thái đuôi**:\n> 1. Cách 1: **-АЯ / -ЯЯ** *(новая, синяя)*\n> 2. Cách 4: **-УЮ / -ЮЮ** *(новую, синюю)*\n> 3. Cả 4 cách còn lại (**C2, C3, C5, C6**): ĐỀU CÙNG MỘT ĐUÔI **-ОЙ / -ЕЙ**!\n\n| Cách | Thân cứng *(новая книга)* | Thân mềm *(синяя тетрадь)* |\n| :---: | :--- | :--- |\n| **C1** | нов-**ая** книга | син-**яя** тетрадь |\n| **C2** | нов-**ой** книги | син-**ей** тетради |\n| **C3** | нов-**ой** книге | син-**ей** тетради |\n| **C4** | нов-**ую** книгу | син-**юю** тетрадь |\n| **C5** | нов-**ой** книгой | син-**ей** тетрадью |\n| **C6** | о нов-**ой** книге | о син-**ей** тетради |\n\n### 2.3. Nhóm Tính từ Số nhiều (Cả 3 giống)\n| Cách | Thân cứng *(новые)* | Thân mềm / 7 phụ âm *(синие, русские)* |\n| :---: | :--- | :--- |\n| **C1** | нов-**ые** | син-**ие**, русск-**ие** |\n| **C2** | нов-**ых** | син-**их**, русск-**их** |\n| **C3** | нов-**ым** | син-**им**, русск-**им** |\n| **C4** | - Bất động: **= C1** *(новые столы)*<br>- Động vật: **= C2** *(новых студентов)* | - Bất động: **= C1** *(синие карандаши)*<br>- Động vật: **= C2** *(русских друзей)* |\n| **C5** | нов-**ыми** | син-**ими**, русск-**ими** |\n| **C6** | о нов-**ых** | о син-**их**, о русск-**их** |\n\n---\n\n## 3. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nChia cụm từ trong ngoặc theo đúng cách của câu:\n1. Мы живём в (большой красивый город). *(Cách 6)*\n2. Я познакомился с (интересная русская девушка). *(Cách 5)*\n3. Вчера мы встретили (наш старый преподаватель). *(Cách 4 - động vật)*\n4. На столе нет (белая бумага). *(Cách 2)*\n5. Поезд подошёл к (центральная станция). *(Cách 3)*\n\n### Đáp án & Lời giải:\n1. в **большом красивом городе** *(C6 đực: đuôi -ом/-ем)*.\n2. с **интересной русской девушкой** *(C5 cái: đuôi -ой)*.\n3. **нашего старого преподавателя** *(C4 đực động vật = C2: đuôi -ого/-его)*.\n4. **белой бумаги** *(C2 cái: đuôi -ой)*.\n5. к **центральной станции** *(C3 cái: đuôi -ой)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 13,
    "is_pro_only": true
  },
  {
    "id": "bai_14",
    "code": "bai_14",
    "title": "BÀI 14: TÍNH TỪ DẠNG RÚT GỌN (КРАТКАЯ ФОРМА) & CẤP ĐỘ SO SÁNH",
    "level": "A2",
    "category": "Tính từ",
    "topic": "Tính từ",
    "vi": "BÀI 14: TÍNH TỪ DẠNG RÚT GỌN (КРАТКАЯ ФОРМА) & CẤP ĐỘ SO SÁNH",
    "summary": "Nắm vững cách thành lập và chức năng cú pháp của **Tính từ dạng ngắn (Краткая форма)**.\nPhân biệt chính xác khi nào dùng dạng đầy đủ (thuộc tính cố định) và dạng ngắn (trạng thái nhất thời).\nLàm chủ 2 cách nói So sánh hơn (dạng đơn với `-ее/-е` và dạng ghép với `более`).\nNắm trọn các cấu trúc so sánh nhất (*самый...*, *-ейший*, *быстрее всех*).",
    "content_md": "# BÀI 14: TÍNH TỪ DẠNG RÚT GỌN (КРАТКАЯ ФОРМА) & CẤP ĐỘ SO SÁNH\n## (Краткие прилагательные и степени сравнения)\n\n> **Mục tiêu bài học:**\n> - Nắm vững cách thành lập và chức năng cú pháp của **Tính từ dạng ngắn (Краткая форма)**.\n> - Phân biệt chính xác khi nào dùng dạng đầy đủ (thuộc tính cố định) và dạng ngắn (trạng thái nhất thời).\n> - Làm chủ 2 cách nói So sánh hơn (dạng đơn với `-ее/-е` và dạng ghép với `более`).\n> - Nắm trọn các cấu trúc so sánh nhất (*самый...*, *-ейший*, *быстрее всех*).\n\n---\n\n## 1. TÍNH TỪ DẠNG RÚT GỌN (КРАТКИЕ ПРИЛАГАТЕЛЬНЫЕ)\n\n### 1.1. Cách thành lập:\nChỉ có **tính từ phẩm chất** mới có dạng ngắn. Ta bỏ vĩ tố của dạng đầy đủ và thêm đuôi:\n\n| Giống / Số | Công thức | Ví dụ: красивый | Ví dụ: готовый | Có xen nguyên âm đệm: умный |\n| :--- | :---: | :--- | :--- | :--- |\n| **Giống đực** | **Vĩ tố 0** | красив-Ø | готов-Ø | ум**ё**н-Ø *(chèn ё)* |\n| **Giống cái** | **-а** | красив-**а** | готов-**а** | умн-**а́** |\n| **Giống trung** | **-о** | красив-**о** | готов-**о** | умн-**о́** |\n| **Số nhiều** | **-ы / -и** | красив-**ы** | готов-**ы** | умн-**ы́** |\n\n> [!NOTE]\n> Xen nguyên âm đệm: Nếu thân từ tận cùng bằng hai phụ âm khó phát âm, ở giống đực thường xen thêm `е`, `ё` hoặc `о`:\n> - *больной* $\\rightarrow$ **болен** *(bị ốm)*, больна, больно, больны.\n> - *спокойный* $\\rightarrow$ **спокоен** *(bình tĩnh)*, спокойна, спокойно, спокойны.\n> - *нужный* $\\rightarrow$ **нужен** *(cần thiết)*, нужна, нужно, нужны.\n\n### 1.2. Chức năng và Sự khác biệt với dạng đầy đủ:\n\n> [!IMPORTANT]\n> **Quy tắc cú pháp tuyệt đối:** Tính từ dạng ngắn **CHỈ LÀM VỊ NGỮ** trong câu, không bao giờ đứng trước danh từ làm định ngữ!\n\n- **Thuộc tính cố định vs Trạng thái nhất thời:**\n  - *Он больной человек.* (Anh ấy là một người hay ốm đau bệnh tật - tính chất cố định, dạng đầy đủ).\n  - *Он сегодня болен.* (Hôm nay anh ấy bị ốm - trạng thái nhất thời lúc này, dạng ngắn).\n- **Từ chỉ có dạng ngắn (không có dạng đầy đủ tương đương):**\n  - **рад, рада, рады** *(vui mừng)*: *Я очень рад вас видеть!*\n  - **должен, должна, должно, должны** *(phải, có bổn phận)*: *Студенты должны учиться.*\n\n---\n\n## 2. CẤP ĐỘ SO SÁNH CỦA TÍNH TỪ (СТЕПЕНИ СРАВНЕНИЯ)\n\n### 2.1. So sánh hơn (Сравнительная степень)\n\nCó 2 cách tạo câu so sánh hơn:\n\n#### Cách 1: Dạng ghép (Составная форма - Dễ nhất)\n$$\\textbf{более / менее} + \\textbf{Tính từ nguyên thể (Cách 1)}$$\n- Этот метод **более эффективный**, чем тот. *(Phương pháp này hiệu quả hơn phương pháp kia).*\n- Эта книга **менее интересная**. *(Cuốn sách này ít thú vị hơn).*\n\n#### Cách 2: Dạng đơn (Простая форма - Người bản xứ dùng 90%)\nBỏ đuôi tính từ và thêm hậu tố **-ЕЕ (-ей)** vào thân từ:\n- *новый $\\rightarrow$ нов**ее*** *(mới hơn)*\n- *быстрый $\\rightarrow$ быстр**ее*** *(nhanh hơn)*\n- *трудный $\\rightarrow$ трудн**ее*** *(khó hơn)*\n- *красивый $\\rightarrow$ красив**ее*** *(đẹp hơn)*\n\n#### Các biến âm đặc biệt khi nhận đuôi `-Е`:\n- **к, т $\\rightarrow$ ч:** *громкий $\\rightarrow$ гром**че***, *богатый $\\rightarrow$ бога**че***, *лёгкий $\\rightarrow$ лег**че***.\n- **г, д $\\rightarrow$ ж:** *дорогой $\\rightarrow$ доро**же***, *молодой $\\rightarrow$ моло**же***.\n- **х $\\rightarrow$ ш:** *тихий $\\rightarrow$ ти**ше***, *сухой $\\rightarrow$ су**ше***.\n- **Rụng tiếp tố `-к-` và biến đổi:**\n  - *высокий $\\rightarrow$ **выше*** *(cao hơn)*\n  - *низкий $\\rightarrow$ **ниже*** *(thấp hơn)*\n  - *широкий $\\rightarrow$ **шире*** *(rộng hơn)*\n  - *узкий $\\rightarrow$ **уже*** *(hẹp hơn)*\n  - *короткий $\\rightarrow$ **короче*** *(ngắn hơn)*\n- **Bất quy tắc dị biệt hoàn toàn (Bắt buộc phải thuộc):**\n  - *хороший $\\rightarrow$ **лучше*** *(tốt hơn)*\n  - *плохой $\\rightarrow$ **хуже*** *(tệ hơn)*\n  - *большой $\\rightarrow$ **больше*** *(to hơn / nhiều hơn)*\n  - *маленький $\\rightarrow$ **меньше*** *(nhỏ hơn / ít hơn)*\n  - *старый $\\rightarrow$ **старше*** *(già hơn / lớn tuổi hơn)*\n\n#### Hai cấu trúc câu so sánh hơn:\n$$\\begin{aligned}\n\\text{Cấu trúc 1 (Dùng чем):}\\quad &\\text{Брат выше, }\\textbf{чем сестра}\\text{ (C1).} \\\\\n\\text{Cấu trúc 2 (Trực tiếp C2):}\\quad &\\text{Брат выше }\\textbf{сестры}\\text{ (C2).}\n\\end{aligned}$$\n*(Cả hai câu đều có nghĩa: \"Anh trai cao hơn em gái\".)*\n\n---\n\n### 2.2. So sánh nhất (Превосходная степень)\n\n1. **Cách thông dụng nhất:** Thêm **САМЫЙ (самая, самое, самые)** trước tính từ:\n   - *Это **самый красивый** город.* (Đây là thành phố đẹp nhất).\n   - *Она **самая лучшая** студентка.* (Cô ấy là nữ sinh viên xuất sắc nhất).\n2. **Cách cấu tạo tiếp tố:** Thêm **-ейший / -айший**:\n   - *умный $\\rightarrow$ умн**ейший*** *(thông minh tột bậc)*\n   - *великий $\\rightarrow$ величайший* *(vĩ đại nhất)*\n3. **Dạng so sánh hơn + ВСЕХ / ВСЕГО:**\n   - *Он бегает **быстрее всех**.* (Anh ấy chạy nhanh hơn tất cả mọi người = nhanh nhất).\n   - *Я люблю это **больше всего**.* (Tôi thích điều này hơn tất cả = thích nhất).\n\n---\n\n## 3. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chuyển tính từ trong ngoặc sang dạng ngắn tương ứng với chủ ngữ:\n   - a) Студентка (готова) к экзамену.\n   - b) Мой друг сегодня (болен).\n   - c) Мы очень (рады) вас видеть.\n2. Viết lại các câu so sánh sau bằng cả 2 cách (*чем* và *Cách 2 trực tiếp*):\n   - a) Волга длиннее (Днепр).\n   - b) Этот дом новее (та школа).\n3. Tìm dạng so sánh hơn dạng đơn của: *хороший, высокий, дорогой, лёгкий*.\n\n### Đáp án & Lời giải:\n1. Dạng ngắn:\n   - a) Студентка **готова** к экзамену.\n   - b) Мой друг сегодня **болен**.\n   - c) Мы очень **рады** вас видеть.\n2. Viết lại câu so sánh:\n   - a) Волга длиннее, **чем Днепр** / Волга длиннее **Днепра**.\n   - b) Этот дом новее, **чем та школа** / Этот дом новее **той школы**.\n3. Dạng so sánh hơn:\n   - *хороший* $\\rightarrow$ **лучше**\n   - *высокий* $\\rightarrow$ **выше**\n   - *дорогой* $\\rightarrow$ **дороже**\n   - *лёгкий* $\\rightarrow$ **легче**\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 14,
    "is_pro_only": true
  },
  {
    "id": "bai_15",
    "code": "bai_15",
    "title": "BÀI 15: ĐẠI TỪ NHÂN XƯNG, PHẢN THÂN VÀ SỞ HỮU",
    "level": "A2",
    "category": "Đại từ",
    "topic": "Đại từ",
    "vi": "BÀI 15: ĐẠI TỪ NHÂN XƯNG, PHẢN THÂN VÀ SỞ HỮU",
    "summary": "Nắm trọn bảng biến cách 6 cách của Đại từ nhân xưng (*я, ты, он, она, мы, вы, они*).\nHiểu quy tắc bắt buộc thêm tiền tố **`н-`** sau giới từ đối với ngôi thứ 3 (*у него, к ней, с ними*).\nLàm chủ đại từ phản thân **СЕБЯ** và đại từ sở hữu phản thân **СВОЙ**.\nPhân biệt bản chất \"vợ mình\" vs \"vợ người ta\" giữa `свой` và `его/её/их`.",
    "content_md": "# BÀI 15: ĐẠI TỪ NHÂN XƯNG, PHẢN THÂN VÀ SỞ HỮU\n## (Личные, возвратное и притяжательные местоимения)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn bảng biến cách 6 cách của Đại từ nhân xưng (*я, ты, он, она, мы, вы, они*).\n> - Hiểu quy tắc bắt buộc thêm tiền tố **`н-`** sau giới từ đối với ngôi thứ 3 (*у него, к ней, с ними*).\n> - Làm chủ đại từ phản thân **СЕБЯ** và đại từ sở hữu phản thân **СВОЙ**.\n> - Phân biệt bản chất \"vợ mình\" vs \"vợ người ta\" giữa `свой` và `его/её/их`.\n\n---\n\n## 1. ĐẠI TỪ NHÂN XƯNG (ЛИЧНЫЕ МЕСТОИМЕНИЯ)\n\n### Bảng biến cách Đại từ nhân xưng qua 6 Cách:\n\n| Cách | Ngôi 1 (Tôi) | Ngôi 2 (Bạn) | Ngôi 3 Đực/Trung (Anh ấy/Nó) | Ngôi 3 Cái (Cô ấy/Nó) | Ngôi 1 SN (Chúng tôi) | Ngôi 2 SN (Các bạn/Ngài) | Ngôi 3 SN (Họ) |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n| **C1** | **я** | **ты** | **он / оно** | **она** | **мы** | **вы** | **они** |\n| **C2** | мен**я́** | теб**я́** | (н)**его́** *[-во]* | (н)**её** | нас | вас | (н)**их** |\n| **C3** | мн**е** | теб**е́** | (н)**ему́** | (н)**ей** | нам | вам | (н)**им** |\n| **C4** | мен**я́** | теб**я́** | (н)**его́** | (н)**её** | нас | вас | (н)**их** |\n| **C5** | мной (мн**о́**ю) | тоб**о́**й | (н)**им** | (н)**ей** (н**е́**ю) | н**а́**ми | в**а́**ми | (н)**и́ми** |\n| **C6** | обо мн**е́** | о теб**е́** | о **нём** | о **ней** | о нас | о вас | о **них** |\n\n> [!WARNING]\n> **Quy tắc thêm chữ “Н-” sau giới từ:**\n> Đối với ngôi thứ ba (*он, она, оно, они*), khi đứng ngay sau một giới từ (*у, к, с, в, о, без, для...*), ta **bắt buộc phải thêm âm `н-`** vào đầu đại từ để dễ phát âm:\n> - *без **н**его* (không có anh ấy), *к **н**ему* (đến chỗ anh ấy), *с **н**им* (với anh ấy), *о **н**ём* (về anh ấy).\n> - *у **н**её* (cô ấy có), *к **н**ей* (đến chỗ cô ấy), *с **н**ей* (với cô ấy), *о **н**ей* (về cô ấy).\n> - *для **н**их* (cho họ), *с **н**ими* (với họ), *о **н**их* (về họ).\n\n---\n\n## 2. ĐẠI TỪ PHẢN THÂN “СЕБЯ” (BẢN THÂN MÌNH)\n\n- **Đặc điểm số 1:** Đại từ `себя` **KHÔNG CÓ CÁCH 1** (vì nó không bao giờ làm chủ ngữ, nó luôn chịu tác động từ chủ ngữ).\n- **Biến cách:** C2: **себя́**, C3: **себ**е́, C4: **себя́**, C5: **собо́й**, C6: **о себе́**.\n- **Cách dùng:** Dùng khi hành động của chủ ngữ quay trở lại tác động vào chính chủ ngữ đó:\n  - *Он купил **себе** новый телефон.* (Anh ấy mua cho chính mình một chiếc điện thoại mới).\n  - *Она недовольна **собой**.* (Cô ấy không hài lòng với chính bản thân mình).\n  - *Расскажите немного **о себе**.* (Hãy kể đôi điều về bản thân bạn).\n\n---\n\n## 3. ĐẠI TỪ SỞ HỮU (ПРИТЯЖАТЕЛЬНЫЕ МЕСТОИМЕНИЯ)\n\n### 3.1. Nhóm biến đổi theo Giống, Số, Cách: МОЙ, ТВОЙ, НАШ, ВАШ\nBiến đổi y hệt như một tính từ:\n- *мой друг* (C1) $\\rightarrow$ *моего друга* (C2) $\\rightarrow$ *моему другу* (C3)...\n- *наша комната* (C1) $\\rightarrow$ *нашу комнату* (C4) $\\rightarrow$ *в нашей комнате* (C6)...\n\n### 3.2. Nhóm BẤT BIẾN TUYỆT ĐỐI: ЕГО, ЕЁ, ИХ\n- **его** *(của anh ấy)*, **её** *(của cô ấy)*, **их** *(của họ)*: **KHÔNG BAO GIỜ BIẾN ĐỔI** dù danh từ đi kèm ở bất kỳ giống, số, cách nào!\n- **ĐẶC BIỆT:** Nhóm này **KHÔNG BAO GIỜ THÊM CHỮ `Н-`**, kể cả khi đứng sau giới từ!\n  - *в **его** комнате* (trong phòng của anh ấy - TUYỆT ĐỐI KHÔNG VIẾT *в него комнате*).\n  - *у **её** мамы* (ở chỗ mẹ cô ấy).\n  - *для **их** детей* (dành cho con cái của họ).\n\n---\n\n## 4. CUỘC CHIẾN KINH ĐIỂN: “СВОЙ” VS “ЕГО / ЕЁ / ИХ”\n\nĐây là sai lầm nghiêm trọng nhất về ngữ nghĩa mà người Việt hay mắc:\n\n> [!CAUTION]\n> **Đại từ “СВОЙ” (của mình):**\n> Chỉ được dùng khi đối tượng thuộc quyền sở hữu của **CHÍNH CHỦ NGỮ TRONG CÂU**!\n> \n> Hãy so sánh 2 câu sau:\n> 1. *Иван любит **свою** жену.* $\\rightarrow$ Ivan yêu vợ **của chính Ivan**.\n> 2. *Иван любит **его** жену.* $\\rightarrow$ Ivan yêu vợ **của một người đàn ông khác** (Anton, Boris...)!\n\n### Thêm ví dụ đối chiếu:\n- *Я люблю **свою** семью.* = Tôi yêu gia đình của tôi *(Chủ ngữ là \"Я\" $\\rightarrow$ dùng свою)*.\n- *Студенты открыли **свои** тетради.* = Các sinh viên mở vở của chính họ.\n- *Анна потеряла **свою** сумку.* = Anna đánh mất túi xách của chính cô ấy *(nếu viết \"её сумку\" thì là túi của người phụ nữ khác!)*.\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Điền đại từ thích hợp vào chỗ trống (chú ý thêm chữ `н-` nếu có giới từ):\n   - a) Я давно не видел Антона. Завтра я поеду к (он) _____.\n   - b) Это Мария. Мы часто говорим о (она) _____.\n   - c) Где студенты? Учитель ждёт (они) _____.\n   - d) Мы встретились с (они) _____ на вокзале.\n2. Chọn giữa `свой` (chia dạng đúng) hoặc `его / её`:\n   - a) Виктор звонит (_____) маме каждый вечер.\n   - b) Мы любим (_____) родину.\n   - c) Вчера я был в гостях у Олега и видел (_____) новую машину.\n\n### Đáp án & Lời giải:\n1. Điền đại từ nhân xưng:\n   - a) к **нему** *(có giới từ к $\\rightarrow$ thêm н-)*.\n   - b) о **ней** *(có giới từ о $\\rightarrow$ thêm н-)*.\n   - c) ждёт **их** *(ngoại động từ ждёт không có giới từ $\\rightarrow$ KHÔNG thêm н-)*.\n   - d) с **ними** *(có giới từ с $\\rightarrow$ thêm н-)*.\n2. Chọn `свой` vs `его/её`:\n   - a) **своей** *(Viktor gọi cho mẹ của chính mình)*.\n   - b) **свою** *(Chúng tôi yêu tổ quốc của chính mình)*.\n   - c) **его** *(Tôi nhìn thấy xe của Oleg - chủ ngữ là Tôi \"я\", còn chiếc xe là của Oleg \"его\")*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 15,
    "is_pro_only": true
  },
  {
    "id": "bai_16",
    "code": "bai_16",
    "title": "BÀI 16: ĐẠI TỪ CHỈ ĐỊNH, NGHI VẤN, BẤT ĐỊNH VÀ PHỦ ĐỊNH",
    "level": "A2",
    "category": "Đại từ",
    "topic": "Đại từ",
    "vi": "BÀI 16: ĐẠI TỪ CHỈ ĐỊNH, NGHI VẤN, BẤT ĐỊNH VÀ PHỦ ĐỊNH",
    "summary": "Nắm trọn cách dùng và biến cách của Đại từ chỉ định (`этот`, `тот`).\nLàm chủ đại từ quan hệ `который` – chìa khóa vàng để nối các câu phức tiếng Nga.\nPhân biệt bản chất tuyệt đối giữa đuôi **`-то`** (đã xảy ra/có thật) và **`-нибудь`** (bất kỳ/chưa xác định).\nNắm vững quy tắc phủ định kép và hiện tượng giới từ chèn vào giữa (*ни с кем, не о чем*).",
    "content_md": "# BÀI 16: ĐẠI TỪ CHỈ ĐỊNH, NGHI VẤN, BẤT ĐỊNH VÀ PHỦ ĐỊNH\n## (Указательные, вопросительные, неопределённые и отрицательные местоимения)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn cách dùng và biến cách của Đại từ chỉ định (`этот`, `тот`).\n> - Làm chủ đại từ quan hệ `который` – chìa khóa vàng để nối các câu phức tiếng Nga.\n> - Phân biệt bản chất tuyệt đối giữa đuôi **`-то`** (đã xảy ra/có thật) và **`-нибудь`** (bất kỳ/chưa xác định).\n> - Nắm vững quy tắc phủ định kép và hiện tượng giới từ chèn vào giữa (*ни с кем, не о чем*).\n\n---\n\n## 1. ĐẠI TỪ CHỈ ĐỊNH: “ЭТОТ” (NÀY) VÀ “ТОТ” (KIA)\n\n| Cách | Giống đực *(этот)* | Giống trung *(это)* | Giống cái *(эта)* | Số nhiều *(эти)* |\n| :---: | :--- | :--- | :--- | :--- |\n| **C1** | **этот** дом / студент | **это** окно | **эта** книга | **эти** книги / студенты |\n| **C2** | эт-**ого** *[-ово]* | эт-**ого** | эт-**ой** | эт-**их** |\n| **C3** | эт-**ому** | эт-**ому** | эт-**ой** | эт-**им** |\n| **C4** | - Bất động: **этот**<br>- Động vật: **этого** | **это** | эт-**у** | - Bất động: **эти**<br>- Động vật: **этих** |\n| **C5** | эт-**им** | эт-**им** | эт-**ой** | эт-**ими** |\n| **C6** | об эт-**ом** | об эт-**ом** | об эт-**ой** | об эт-**их** |\n\n*(Đại từ `тот, то, та, те` biến đổi tương tự: того, тому, тем, о том; той; тех, теми).*\n\n---\n\n## 2. ĐẠI TỪ QUAN HỆ “КОТОРЫЙ” (NGƯỜI MÀ / CÁI MÀ)\n\nTrong câu phức, `который` dùng để thay thế cho danh từ đứng ngay trước nó trong mệnh đề chính:\n\n> [!IMPORTANT]\n> **Quy tắc phối hợp 2 chiều của КОТОРЫЙ:**\n> 1. **Giống và Số:** phụ thuộc vào danh từ đứng trước nó ở mệnh đề chính.\n> 2. **Cách:** phụ thuộc vào vai trò ngữ pháp của nó **bên trong mệnh đề phụ**!\n\n### Ví dụ giải phẫu:\n- *Я знаю студента, **который** сидит у окна.*\n  $\\rightarrow$ `студент` là giống đực số ít; trong vế sau nó làm chủ ngữ $\\rightarrow$ dùng **который** (C1).\n- *Я знаю студента, **которого** вы ищете.*\n  $\\rightarrow$ Trong vế sau, bạn tìm kiếm anh ấy (tân ngữ động vật) $\\rightarrow$ dùng **которого** (C4 = C2).\n- *Я знаю студента, **которому** вы помогли.*\n  $\\rightarrow$ Trong vế sau, giúp đỡ ai (C3) $\\rightarrow$ dùng **которому** (C3).\n- *Вот книга, **о которой** мы вчера говорили.*\n  $\\rightarrow$ `книга` giống cái; nói về cái gì (C6) $\\rightarrow$ dùng **о которой** (C6).\n\n---\n\n## 3. ĐẠI TỪ BẤT ĐỊNH: PHÂN BIỆT “-ТО” VÀ “-НИБУДЬ”\n\nĐây là điểm ngữ pháp cực kỳ tinh tế trong tiếng Nga:\n\n```mermaid\nflowchart LR\n    Indef[\"Đại từ bất định\\n(кто, что, какой, где, куда...)\"]\n    Indef -->|Thêm đuôi -ТО| Known[\"1. Đuôi -ТО:\\nCó thật, cụ thể trong thực tế,\\nnhưng người nói KHÔNG BIẾT\\nhoặc KHÔNG NHỚ RÕ\"]\n    Indef -->|Thêm đuôi -НИБУДЬ| Any[\"2. Đuôi -НИБУДЬ:\\nBẤT KỲ AI / CÁI GÌ,\\nhoàn toàn chưa xác định,\\ndùng trong câu hỏi, tương lai, giả định\"]\n```\n\n### So sánh qua ngữ cảnh thực tế:\n1. **Кто-то vs Кто-нибудь:**\n   - *Вчера мне **кто-то** звонил, но я не знаю кто.* (Hôm qua có ai đó gọi cho tôi - sự việc có thật đã diễn ra $\\rightarrow$ dùng **кто-то**).\n   - *Если **кто-нибудь** позвонит, позови меня.* (Nếu có ai gọi đến - chưa biết có hay không, giả định tương lai $\\rightarrow$ dùng **кто-нибудь**).\n   - *Ты **что-нибудь** знаешь об этом?* (Cậu có biết chút gì/bất cứ điều gì về việc này không? - câu hỏi $\\rightarrow$ dùng **что-нибудь**).\n2. **Где-то vs Где-нибудь:**\n   - *Мои очки **где-то** здесь.* (Kính của tôi ở đâu đó quanh đây - có vị trí thực $\\rightarrow$ dùng **где-то**).\n   - *Летом мы хотим поехать **куда-нибудь** отдыхать.* (Mùa hè chúng tôi muốn đi đâu đó nghỉ ngơi - chưa chốt địa điểm cụ thể $\\rightarrow$ dùng **куда-нибудь**).\n\n---\n\n## 4. ĐẠI TỪ PHỦ ĐỊNH: “НИКТО / НИЧТО” VS “НЕКОГО / НЕЧЕГО”\n\n### 4.1. Nhóm НИКТО, НИЧТО (Quy tắc phủ định kép & Giới từ chèn giữa)\n- **Luôn đi kèm với từ phủ định НЕ trước động từ:**\n  - *Никто **не** знает этого.* (Không ai biết điều này cả).\n  - *Я ничего **не** понимаю.* (Tôi chẳng hiểu cái gì cả).\n- **Hiện tượng giới từ chèn vào giữa:** Khi có giới từ, cụm từ bị tách làm 3 chữ riêng biệt:\n  - *ни + с + кем $\\rightarrow$ **ни с кем***: *Я ни с кем не говорил.* (Tôi không nói chuyện với ai cả).\n  - *ни + о + чём $\\rightarrow$ **ни о чём***: *Мы ни о чём не спорили.* (Chúng tôi chẳng tranh cãi về điều gì).\n  - *ни + у + кого $\\rightarrow$ **ни у кого***: *Я ни у кого не брал денег.* (Tôi không lấy tiền của ai cả).\n\n### 4.2. Nhóm НЕКОГО, НЕЧЕГО (Không có ai / không có gì để làm)\n- **Đặc điểm:** Mang ý nghĩa bế tắc, thiếu thốn; **KHÔNG CÓ DẠNG CÁCH 1**; đi với động từ nguyên mẫu:\n  $$\\textbf{Кому (Cách 3)} + \\textbf{нечего / некого} + \\textbf{Động từ nguyên mẫu}$$\n  - *Мне **нечего делать**.* (Tôi chẳng có gì để làm / Tôi đang rảnh rỗi).\n  - *Ему **не с кем поговорить**.* (Anh ấy chẳng có ai để trò chuyện cùng - giới từ chèn giữa!).\n  - *Нам **некуда спешить**.* (Chúng tôi chẳng có việc gì phải vội).\n  - *Там **негде сидеть**.* (Ở đó chẳng có chỗ nào để ngồi).\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Nối 2 câu thành 1 câu phức dùng đại từ `который` (chia đúng dạng):\n   - a) Я читаю книгу. Эту книгу мне подарил друг.\n   - b) Мы познакомились с девушкой. Она прекрасно говорит по-русски.\n   - c) Вот город. В этом городе я родился.\n2. Chọn giữa `-то` hoặc `-нибудь`:\n   - a) Пожалуйста, купи в магазине что-(то / нибудь) вкусное.\n   - b) Вчера в коридоре кто-(то / нибудь) оставил сумку.\n   - c) Ты когда-(то / нибудь) был в Санкт-Петербурге?\n3. Dịch các câu sau sang tiếng Nga (chú ý giới từ chèn giữa):\n   - a) Tôi không nói chuyện với bất kỳ ai.\n   - b) Tôi chẳng có gì để đọc.\n\n### Đáp án & Lời giải:\n1. Nối câu với `который`:\n   - a) Я читаю книгу, **которую** мне подарил друг *(книга giống cái; vế sau là tân ngữ trực tiếp Cách 4 $\\rightarrow$ которую)*.\n   - b) Мы познакомились с девушкой, **которая** прекрасно говорит по-русски *(vế sau làm chủ ngữ Cách 1 $\\rightarrow$ которая)*.\n   - c) Вот город, **в котором** я родился *(vế sau là nơi chốn Cách 6 $\\rightarrow$ в котором)*.\n2. Chọn đuôi:\n   - a) что-**нибудь** *(yêu cầu chung chung, chưa cụ thể)*.\n   - b) кто-**то** *(sự việc có thật đã xảy ra trong quá khứ)*.\n   - c) когда-**нибудь** *(câu hỏi trải nghiệm \"đã từng bao giờ chưa\")*.\n3. Dịch câu:\n   - a) Я **ни с кем не** разговаривал.\n   - b) Мне **нечего читать**.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 16,
    "is_pro_only": true
  },
  {
    "id": "bai_17",
    "code": "bai_17",
    "title": "BÀI 17: NGUYÊN MẪU & QUY TẮC CHIA ĐỘNG TỪ NHÓM I VÀ NHÓM II",
    "level": "A2",
    "category": "Động từ (Thời & Thể)",
    "topic": "Động từ (Thời & Thể)",
    "vi": "BÀI 17: NGUYÊN MẪU & QUY TẮC CHIA ĐỘNG TỪ NHÓM I VÀ NHÓM II",
    "summary": "Nhận biết hình thái Động từ nguyên mẫu (Инфинитив: `-ть, -ти, -чь`).\nPhân biệt chính xác **Nhóm chia I** (nguyên âm `е/ё`) và **Nhóm chia II** (nguyên âm `и`).\nNằm lòng bài thơ **11 động từ ngoại lệ** của Nhóm II.\nLàm chủ quy luật **Biến âm gốc từ (Чередование)** – bí quyết để không bao giờ bị bất ngờ khi chia động từ ở ngôi `я`.",
    "content_md": "# BÀI 17: NGUYÊN MẪU & QUY TẮC CHIA ĐỘNG TỪ NHÓM I VÀ NHÓM II\n## (Инфинитив и спряжение глаголов в настоящем времени)\n\n> **Mục tiêu bài học:**\n> - Nhận biết hình thái Động từ nguyên mẫu (Инфинитив: `-ть, -ти, -чь`).\n> - Phân biệt chính xác **Nhóm chia I** (nguyên âm `е/ё`) và **Nhóm chia II** (nguyên âm `и`).\n> - Nằm lòng bài thơ **11 động từ ngoại lệ** của Nhóm II.\n> - Làm chủ quy luật **Biến âm gốc từ (Чередование)** – bí quyết để không bao giờ bị bất ngờ khi chia động từ ở ngôi `я`.\n\n---\n\n## 1. ĐỘNG TỪ NGUYÊN MẪU (ИНФИНИТИВ)\n\nĐộng từ nguyên mẫu là dạng cơ bản trong từ điển, chưa chia theo ngôi, thời, hay số:\n- Hầu hết tận cùng bằng **-ТЬ**: *читать, говорить, делать, писать, жить*.\n- Một số tận cùng bằng **-ТИ** (trọng âm luôn rơi vào đuôi): *идти́, нести́, расти́*.\n- Một số tận cùng bằng **-ЧЬ**: *мочь, печь, беречь, течь*.\n\n---\n\n## 2. HAI NHÓM CHIA ĐỘNG TỪ Ở THỜI HIỆN TẠI\n\nTrong tiếng Nga, thời hiện tại được chia theo 6 ngôi đại từ nhân xưng:\n\n```mermaid\nflowchart TD\n    Verbs[\"ĐỘNG TỪ TIẾNG NGA\"]\n    Verbs --> Conj1[\"NHÓM I (I СПРЯЖЕНИЕ)\\nĐuôi có nguyên âm E / Ё\\n-ю/-у, -ешь, -ет, -ем, -ете, -ут/-ют\"]\n    Verbs --> Conj2[\"NHÓM II (II СПРЯЖЕНИЕ)\\nĐuôi có nguyên âm И\\n-ю/-у, -ишь, -ит, -им, -ите, -ят/-ат\"]\n```\n\n### 2.1. Nhóm chia I (I Спряжение)\n- **Dấu hiệu nhận biết:** Hầu hết động từ tận cùng bằng: **-ать, -ять, -еть, -овать, -евать, -нуть, -ти, -чь**.\n- **Bảng đuôi chia Nhóm I:**\n\n| Ngôi | Đuôi chia | Ví dụ: читать *(đọc)* | Ví dụ: писать *(viết - có biến âm)* |\n| :---: | :---: | :--- | :--- |\n| **Я** | **-ю / -у** | чита-**ю** | пиш-**у́** |\n| **Ты** | **-ешь (-ёшь)** | чита-**ешь** | п**и́**ш-**ешь** |\n| **Он / Она** | **-ет (-ёт)** | чита-**ет** | п**и́**ш-**ет** |\n| **Мы** | **-ем (-ём)** | чита-**ем** | п**и́**ш-**ем** |\n| **Вы** | **-ете (-ёте)** | чита-**ете** | п**и́**ш-**ете** |\n| **Они** | **-ут / -ют** | чита-**ют** | п**и́**ш-**ут** |\n\n*(Động từ có tiếp tố `-овать / -евать` biến thành `-у- / -ю-`: рисовать $\\rightarrow$ я рисую, ты рисуешь; путешествовать $\\rightarrow$ путешествую).*\n\n---\n\n### 2.2. Nhóm chia II (II Спряжение)\n- **Dấu hiệu nhận biết:** Hầu hết động từ nguyên mẫu tận cùng bằng **-ИТЬ** (*говорить, учить, помнить, звонить, курить...*).\n- **Bảng đuôi chia Nhóm II:**\n\n| Ngôi | Đuôi chia | Ví dụ: говорить *(nói)* | Ví dụ: учить *(học/dạy)* |\n| :---: | :---: | :--- | :--- |\n| **Я** | **-ю / -у** | говор-**ю́** | уч-**у́** *(sau ч viết у)* |\n| **Ты** | **-ишь** | говор-**и́шь** | **у́**ч-**ишь** |\n| **Он / Она** | **-ит** | говор-**и́т** | **у́**ч-**ит** |\n| **Мы** | **-им** | говор-**и́м** | **у́**ч-**им** |\n| **Вы** | **-ите** | говор-**и́те** | **у́**ч-**ите** |\n| **Они** | **-ят / -ат** | говор-**я́т** | **у́**ч-**ат** *(sau ч viết а)* |\n\n---\n\n## 3. NGOẠI LỆ KINH ĐIỂN CỦA NHÓM II (11 ĐỘNG TỪ VÀNG)\n\n> [!WARNING]\n> Mặc dù tận cùng bằng **-ать** hoặc **-еть**, nhưng 11 động từ sau **BẮT BUỘC CHIA THEO NHÓM II**:\n> \n> - **4 động từ tận cùng -АТЬ:**\n>   1. *слышать* (nghe thấy) $\\rightarrow$ слышу, слышишь... слышат.\n>   2. *дышать* (thở) $\\rightarrow$ дышу, дышишь... дышат.\n>   3. *держать* (cầm/giữ) $\\rightarrow$ держу, держишь... держат.\n>   4. *гнать* (đuổi theo) $\\rightarrow$ гоню, гонишь... гонят.\n> \n> - **7 động từ tận cùng -ЕТЬ:**\n>   5. *видеть* (nhìn thấy) $\\rightarrow$ вижу, видишь... видят.\n>   6. *смотреть* (xem) $\\rightarrow$ смотрю, смотришь... смотрят.\n>   7. *ненавидеть* (căm ghét) $\\rightarrow$ ненавижу, ненавидишь... ненавидят.\n>   8. *обидеть* (làm tổn thương) $\\rightarrow$ обижу, обидишь... обидят.\n>   9. *терпеть* (chịu đựng) $\\rightarrow$ терплю, терпишь... терпят.\n>   10. *вертеть* (xoay/vặn) $\\rightarrow$ верчу, вертишь... вертят.\n>   11. *зависеть* (phụ thuộc) $\\rightarrow$ завишу, зависишь... зависят.\n> \n> *(Ngược lại: 2 động từ đuôi `-ить` nhưng chia theo Nhóm I: **брить** - cạo râu $\\rightarrow$ брею, бреешь; **стелить** - trải $\\rightarrow$ стелю, стелешь).*\n\n---\n\n## 4. QUY LUẬT BIẾN ÂM GỐC TỪ (ЧЕРЕДОВАНИЕ СОГЛАСНЫХ)\n\nKhi chia động từ, phụ âm cuối của thân từ thường bị biến đổi âm để thuận tiện phát âm:\n\n> [!IMPORTANT]\n> **Sự khác biệt quan trọng bậc nhất giữa 2 nhóm:**\n> - **Ở Nhóm I:** Biến âm xảy ra ở **TẤT CẢ 6 NGÔI**!\n>   - *писать (с $\\rightarrow$ ш)*: пишу, пишешь, пишет, пишем, пишете, пишут.\n>   - *мочь (ч $\\rightarrow$ г/ж)*: могу, можешь, может, можем, можете, могут.\n> - **Ở Nhóm II:** Biến âm **CHỈ XẢY RA DUY NHẤT Ở NGÔI “Я”**! Các ngôi khác trở lại phụ âm gốc!\n>   - *любить (б $\\rightarrow$ бл)*: я люб**л**ю, nhưng: ты люб**ишь**, он люб**ит**, они люб**ят**.\n>   - *купить (п $\\rightarrow$ пл)*: я куп**л**ю, ты куп**ишь**, они куп**ят**.\n>   - *готовить (в $\\rightarrow$ вл)*: я готов**л**ю, ты готов**ишь**...\n>   - *ответить (т $\\rightarrow$ ч)*: я отве**ч**у, ты отве**т**ишь...\n>   - *видеть (д $\\rightarrow$ ж)*: я ви**ж**у, ты ви**д**ишь...\n>   - *просить (с $\\rightarrow$ ш)*: я про**ш**у, ты про**с**ишь...\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nChia động từ trong ngoặc ở thời hiện tại:\n1. Я часто (писать) письма родителям.\n2. Что ты (смотреть) по телевизору?\n3. Мой брат прекрасно (рисовать).\n4. Мы (жить) в центре города.\n5. Я очень (любить) русскую литературу.\n6. Почему вы не (отвечать) на вопрос?\n\n### Đáp án & Lời giải:\n1. Я **пишу** *(Nhóm I, с $\\rightarrow$ ш ở mọi ngôi)*.\n2. Что ты **смотришь**? *(Ngoại lệ Nhóm II)*.\n3. Мой брат **рисует** *(Nhóm I, -овать $\\rightarrow$ -у-)*.\n4. Мы **живём** *(Nhóm I, chèn в: жить $\\rightarrow$ живу, живёшь, живём)*.\n5. Я очень **люблю** *(Nhóm II, б $\\rightarrow$ бл ở ngôi я)*.\n6. Почему вы не **отвечаете**? *(Nhóm I thông thường)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 17,
    "is_pro_only": true
  },
  {
    "id": "bai_18",
    "code": "bai_18",
    "title": "BÀI 18: ĐỘNG TỪ PHẢN THÂN (-СЯ) & HỆ THỐNG CÁC THỜI CỦA ĐỘNG TỪ",
    "level": "A2",
    "category": "Động từ (Thời & Thể)",
    "topic": "Động từ (Thời & Thể)",
    "vi": "BÀI 18: ĐỘNG TỪ PHẢN THÂN (-СЯ) & HỆ THỐNG CÁC THỜI CỦA ĐỘNG TỪ",
    "summary": "Hiểu rõ bản chất hậu tố phản thân **`-ся / -сь`** và các nhóm ý nghĩa phong phú của nó.\nLàm chủ **Thì Quá khứ (Прошедшее время)**: quy luật chia theo Giống và Số thay vì chia theo Ngôi.\nNắm trọn hệ thống **Thì Tương lai**: Tương lai ghép (*буду читать*) và Tương lai đơn (*прочитаю*).",
    "content_md": "# BÀI 18: ĐỘNG TỪ PHẢN THÂN (-СЯ) & HỆ THỐNG CÁC THỜI CỦA ĐỘNG TỪ\n## (Возвратные глаголы и система времён глагола)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất hậu tố phản thân **`-ся / -сь`** và các nhóm ý nghĩa phong phú của nó.\n> - Làm chủ **Thì Quá khứ (Прошедшее время)**: quy luật chia theo Giống và Số thay vì chia theo Ngôi.\n> - Nắm trọn hệ thống **Thì Tương lai**: Tương lai ghép (*буду читать*) và Tương lai đơn (*прочитаю*).\n\n---\n\n## 1. ĐỘNG TỪ PHẢN THÂN (ВОЗВРАТНЫЕ ГЛАГОЛЫ)\n\nĐộng từ phản thân là động từ kết thúc bằng hậu tố **`-ся`** hoặc **`-сь`**. \n\n> [!IMPORTANT]\n> **Quy tắc chính tả bất di bất dịch:**\n> - Đứng sau **PHỤ ÂM** $\\rightarrow$ viết **-СЯ** *(он учит**ся**, мы учим**ся**, учить**ся**)*.\n> - Đứng sau **NGUYÊN ÂM** $\\rightarrow$ viết **-СЬ** *(я учу**сь**, вы учите**сь**, учила**сь**)*.\n\n### Các nhóm ý nghĩa cơ bản của động từ đuôi -ся:\n1. **Hành động phản thân (Tự làm cho chính mình):**\n   - *умывать* (rửa mặt cho ai) $\\rightarrow$ *умываться* (tự rửa mặt).\n   - *одевать* (mặc đồ cho con) $\\rightarrow$ *одеваться* (tự mặc quần áo).\n2. **Hành động tương hỗ (Làm cùng nhau, qua lại):**\n   - *встречаться* (gặp gỡ nhau), *целоваться* (hôn nhau), *переписываться* (viết thư từ qua lại).\n3. **Cảm xúc và trạng thái nội tâm:**\n   - *радоваться* (vui mừng), *смеяться* (cười), *бояться* (lo sợ), *сердиться* (tức giận), *надеяться* (hy vọng).\n4. **Thuộc tính thường trực của sự vật:**\n   - *Собака кусается.* (Con chó này hay cắn người).\n   - *Крапива жжётся.* (Cây tầm ma rất ngứa/rát).\n\n---\n\n## 2. THÌ QUÁ KHỨ (ПРОШЕДШЕЕ ВРЕМЯ)\n\nKhác với thời Hiện tại chia theo 6 ngôi, **Thì Quá khứ trong tiếng Nga cực kỳ đơn giản vì nó chia theo GIỐNG VÀ SỐ** của chủ ngữ:\n\n$$\\text{Quá khứ} = \\text{Thân từ nguyên mẫu} + \\textbf{-Л / -ЛА / -ЛО / -ЛИ}$$\n\n| Giống / Số | Hậu tố | Động từ thường: читать | Động từ phản thân: учиться |\n| :--- | :---: | :--- | :--- |\n| **Giống đực** *(Chủ ngữ là nam, он)* | **-л** | он / я чита-**л** | он / я учи-**л-ся** |\n| **Giống cái** *(Chủ ngữ là nữ, она)* | **-ла** | она / я чита-**ла** | она / я учи-**ла-сь** |\n| **Giống trung** *(оно)* | **-ло** | солнышко свети-**ло** | время мча-**ло-сь** |\n| **Số nhiều** *(мы, вы, они)* | **-ли** | они / мы чита-**ли** | они / мы учи-**ли-сь** |\n\n### Một số động từ bất quy tắc ở quá khứ:\n- **идти** $\\rightarrow$ **шёл**, **шла**, **шло**, **шли** *(đi bộ)*.\n- **мочь** $\\rightarrow$ **мог**, **могла**, **могло**, **могли** *(có thể)*.\n- **умереть** $\\rightarrow$ **умер**, **умерла**, **умерло**, **умерли** *(qua đời)*.\n- **нести** $\\rightarrow$ **нёс**, **несла**, **несло**, **несли** *(mang/xách)*.\n\n---\n\n## 3. THÌ TƯƠNG LAI (БУДУЩЕЕ ВРЕМЯ)\n\nHệ thống Thì Tương lai trong tiếng Nga gắn chặt với phạm trù **Thể (Вид)** của động từ:\n\n```mermaid\nflowchart TD\n    Fut[\"THÌ TƯƠNG LAI (БУДУЩЕЕ ВРЕМЯ)\"]\n    Fut --> F1[\"1. Động từ Chưa hoàn thành (НСВ)\\nTƯƠNG LAI GHÉP (Сложное будущее)\\nбыть + Инфинитив НСВ\\nDiễn tả quá trình / thói quen trong tương lai\"]\n    Fut --> F2[\"2. Động từ Hoàn thành (СВ)\\nTƯƠNG LAI ĐƠN (Простое будущее)\\nChia 6 ngôi trực tiếp\\nDiễn tả kết quả hoàn thành trong tương lai\"]\n```\n\n### 3.1. Tương lai ghép (Будущее сложное) – Dành cho Thể chưa hoàn thành (НСВ)\n$$\\textbf{Chia động từ БЫТЬ} + \\textbf{Động từ nguyên mẫu (НСВ)}$$\n\n- **Я буду** читать книгу. *(Tôi sẽ đọc sách - nhấn mạnh quá trình đọc).*\n- **Ты будешь** отдыхать.\n- **Он / Она будет** работать.\n- **Мы будем** учиться.\n- **Вы будете** писать.\n- **Они будут** смотреть фильм.\n\n### 3.2. Tương lai đơn (Будущее простое) – Dành cho Thể hoàn thành (СВ)\nĐộng từ thể hoàn thành **không có thời hiện tại**. Khi bạn chia động từ thể hoàn thành theo 6 ngôi, nó tự động mang ý nghĩa **HÀNH ĐỘNG SẼ HOÀN THÀNH TRONG TƯƠNG LAI**:\n- *Я прочитаю эту книгу за два дня.* (Tôi sẽ đọc xong cuốn sách này trong 2 ngày).\n- *Завтра я напишу письмо.* (Ngày mai tôi sẽ viết xong lá thư).\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chia động từ trong ngoặc ở thời Quá khứ:\n   - a) Вчера Анна долго (читать) эту интересную статью.\n   - b) Мой дедушка всю жизнь (работать) на заводе.\n   - c) Вчера мы поздно (вернуться) домой.\n   - d) Утром студентка быстро (одеться) и (пойти) на занятия.\n2. Đổi các câu sau sang thì Tương lai:\n   - a) Я читаю журнал. $\\rightarrow$ Tương lai quá trình: Я _____ журнал.\n   - b) Мы отдыхаем на море. $\\rightarrow$ Tương lai: Мы _____ на море.\n\n### Đáp án & Lời giải:\n1. Chia quá khứ:\n   - a) Анна долго **читала** *(giống cái)*.\n   - b) дедушка **работал** *(giống đực)*.\n   - c) мы поздно **вернулись** *(số nhiều, sau nguyên âm là -сь)*.\n   - d) студентка быстро **оделась** và **пошла** *(bất quy tắc của пойти)*.\n2. Đổi sang tương lai ghép:\n   - a) Я **буду читать** журнал.\n   - b) Мы **будем отдыхать** на море.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 18,
    "is_pro_only": true
  },
  {
    "id": "bai_19",
    "code": "bai_19",
    "title": "BÀI 19: THỂ ĐỘNG TỪ (ВИД ГЛАГОЛА: НСВ VS СВ) – BẢN CHẤT VÀ ỨNG DỤNG",
    "level": "B1",
    "category": "Thể & Động từ chuyển động",
    "topic": "Thể & Động từ chuyển động",
    "vi": "BÀI 19: THỂ ĐỘNG TỪ (ВИД ГЛАГОЛА: НСВ VS СВ) – BẢN CHẤT VÀ ỨNG DỤNG",
    "summary": "Giải mã triệt để \"linh hồn\" và điểm khó khăn nhất của ngữ pháp tiếng Nga: **Thể của Động từ**.\nPhân biệt bản chất tư duy giữa: **Quá trình (НСВ)** vs **Kết quả (СВ)**; **Lặp lại (НСВ)** vs **Đơn nhất (СВ)**.\nNắm vững quy luật thời gian: `Как долго? (НСВ)` vs `За сколько времени? (СВ)`.\nLàm chủ sắc thái Thể trong câu mệnh lệnh và cấu trúc cấm đoán (`Не + НСВ` vs `Не + СВ`).",
    "content_md": "# BÀI 19: THỂ ĐỘNG TỪ (ВИД ГЛАГОЛА: НСВ VS СВ) – BẢN CHẤT VÀ ỨNG DỤNG\n## (Видовая система русского глагола: Теория и практическое различение)\n\n> **Mục tiêu bài học:**\n> - Giải mã triệt để \"linh hồn\" và điểm khó khăn nhất của ngữ pháp tiếng Nga: **Thể của Động từ**.\n> - Phân biệt bản chất tư duy giữa: **Quá trình (НСВ)** vs **Kết quả (СВ)**; **Lặp lại (НСВ)** vs **Đơn nhất (СВ)**.\n> - Nắm vững quy luật thời gian: `Как долго? (НСВ)` vs `За сколько времени? (СВ)`.\n> - Làm chủ sắc thái Thể trong câu mệnh lệnh và cấu trúc cấm đoán (`Не + НСВ` vs `Не + СВ`).\n\n---\n\n## 1. THỂ CỦA ĐỘNG TỪ LÀ GÌ?\n\nTrong tiếng Việt, ta dùng các từ phụ trợ độc lập: *\"đang làm\", \"đã làm xong\", \"thường làm\", \"làm được rồi\"*.\nTrong tiếng Nga, **hầu hết các động từ đều tồn tại thành từng cặp thể (Видовая пара)**:\n\n$$\\begin{aligned}\n\\textbf{НСВ (Несовершенный вид)} &: \\text{Thể chưa hoàn thành (Trả lời: Что делать?)} \\\\\n\\textbf{СВ (Совершенный вид)} &: \\text{Thể hoàn thành (Trả lời: Что сделать?)}\n\\end{aligned}$$\n\n```mermaid\nflowchart TD\n    V[\"THỂ ĐỘNG TỪ (ВИД ГЛАГОЛА)\"]\n    V --> NSV[\"1. THỂ CHƯA HOÀN THÀNH (НСВ)\\n- Quá trình diễn tiến (Đang làm gì)\\n- Hành động lặp đi lặp lại / Thói quen\\n- Nêu sự kiện đơn thuần (Có làm việc đó)\\n- Có đủ 3 thời: Quá khứ, Hiện tại, Tương lai\"]\n    V --> SV[\"2. THỂ HOÀN THÀNH (СВ)\\n- Kết quả đạt được / Giới hạn cuối\\n- Hành động xảy ra một lần / Đột ngột\\n- Chuỗi hành động kế tiếp nhau\\n- CHỈ CÓ 2 THỜI: Quá khứ & Tương lai đơn\"]\n```\n\n---\n\n## 2. BỐN CẶP PHẠM TRÙ SO SÁNH CỐT TỬ GIỮA НСВ VÀ СВ\n\n### 2.1. Quá trình (Процесс) vs Kết quả (Результат)\n- **НСВ (Quá trình):** Người nói chỉ quan tâm đến hành động diễn ra trong bao lâu, không đề cập đến việc nó đã hoàn thành hay chưa:\n  - *Вчера я долго **читал** эту книгу.* (Hôm qua tôi đã đọc cuốn sách này rất lâu - quá trình đọc).\n- **СВ (Kết quả):** Người nói nhấn mạnh hành động đã kết thúc trọn vẹn và mang lại kết quả cụ thể:\n  - *Вчера я наконец **прочитал** эту книгу.* (Hôm qua cuối cùng tôi đã đọc xong cuốn sách này - có kết quả trọn vẹn).\n\n> [!TIP]\n> **Dấu hiệu nhận biết câu hỏi thời gian:**\n> - Đi với câu hỏi **“Как долго? Сколько времени?”** *(Trong bao lâu?)* $\\rightarrow$ **DÙNG НСВ**:\n>   - *Я писал письмо два часа.* (Tôi đã ngồi viết thư suốt 2 tiếng).\n> - Đi với câu hỏi **“За сколько времени?”** *(Xong trong vòng bao lâu?)* $\\rightarrow$ **DÙNG СВ**:\n>   - *Я написал письмо **за** 30 минут.* (Tôi đã viết xong lá thư trong vòng 30 phút).\n\n---\n\n### 2.2. Hành động Lặp lại (Повторяемость) vs Hành động Đơn nhất (Однократность)\n- **НСВ (Lặp lại / Thói quen):** Bắt buộc dùng khi trong câu xuất hiện các từ chỉ tần suất:\n  - *каждый день* (mỗi ngày), *всегда* (luôn luôn), *часто* (thường xuyên), *обычно* (thường lệ), *редко* (hiếm khi), *иногда* (thỉnh thoảng)...\n  - *Он каждое утро **покупает** газету.* (Mỗi sáng anh ấy đều mua báo).\n- **СВ (Đơn nhất / Bất ngờ):** Dùng khi hành động xảy ra một lần duy nhất tại một thời điểm cụ thể:\n  - *вдруг* (đột nhiên), *неожиданно* (bất ngờ), *однажды* (một hôm nọ), *вчера в 5 часов*...\n  - *Вчера он **купил** новый телефон.* (Hôm qua anh ấy đã mua chiếc điện thoại mới).\n\n---\n\n### 2.3. Hai hành động Đồng thời vs Chuỗi hành động Kế tiếp nhau\n- **Đồng thời (Cùng lúc):** Cả hai vế đều dùng **НСВ**:\n  - *Когда я **читал** книгу, брат **слушал** музыку.* (Trong khi tôi đang đọc sách thì em trai đang nghe nhạc).\n- **Kế tiếp (Làm xong cái này mới đến cái tiếp theo):** Một chuỗi động từ **СВ**:\n  - *Утром он **встал**, **умылся**, **позавтракал** и **пошёл** на работу.* (Sáng anh thức dậy, rửa mặt, ăn sáng xong xuôi rồi đi làm).\n\n---\n\n### 2.4. Sự kiện đơn thuần (Констатация факта) vs Kết quả hiện hành\nHãy so sánh hai câu hỏi sau của người bản xứ:\n1. *Ты **читал** этот роман? (НСВ)* $\\rightarrow$ Hỏi trải nghiệm: Bạn đã từng đọc cuốn này chưa? (Đọc rồi hay chưa đọc).\n2. *Ты **прочитал** этот роман? (СВ)* $\\rightarrow$ Hỏi kết quả: Bạn đã đọc xong cuốn tiểu thuyết đó chưa (để đưa cho tôi mượn)?\n\n---\n\n## 3. THỂ TRONG CÂU MỆNH LỆNH VÀ CẤM ĐOÁN\n\n### 3.1. Mệnh lệnh khẳng định:\n- **Dùng НСВ:** Lời mời mọc lịch sự, hiếu khách hoặc hành động bắt đầu ngay:\n  - *Садитесь, пожалуйста!* (Mời ngồi ạ!).\n  - *Пейте чай!* (Mời uống trà!).\n- **Dùng СВ:** Mệnh lệnh yêu cầu kết quả dứt khoát:\n  - *Открой окно!* (Mở cửa sổ ra!).\n  - *Напиши свой адрес!* (Hãy viết địa chỉ của bạn vào đây!).\n\n### 3.2. Cấu trúc phủ định (Đặc biệt quan trọng!):\n$$\\begin{aligned}\n\\textbf{НЕ} + \\textbf{НСВ} &\\longrightarrow \\textbf{CẤM ĐOÁN / KHUYÊN ĐỪNG LÀM} \\\\\n\\textbf{НЕ} + \\textbf{СВ} &\\longrightarrow \\textbf{CẢNH BÁO NGUY CƠ NGOÀI Ý MUỐN (Coi chừng!)}\n\\end{aligned}$$\n\n- *Не открывай окно!* (Đừng mở cửa sổ - cấm làm điều đó $\\rightarrow$ dùng НСВ).\n- *Не говори никому!* (Đừng nói với ai $\\rightarrow$ НСВ).\n- *Смотри, **не упади**!* (Coi chừng kẻo ngã đấy! $\\rightarrow$ sự việc không mong muốn $\\rightarrow$ dùng СВ).\n- *Не забудь ключи!* (Coi chừng quên chìa khóa đấy! $\\rightarrow$ dùng СВ).\n\n---\n\n## 4. CÁC CÁCH HÌNH THÀNH CẶP THỂ PHỔ BIẾN\n\n| Phương thức | Động từ НСВ | Động từ СВ | Quy tắc |\n| :--- | :--- | :--- | :--- |\n| **Thêm tiền tố** | читать *(đọc)*<br>писать *(viết)*<br>делать *(làm)*<br>учить *(học)* | **про**читать<br>**на**писать<br>**с**делать<br>**вы**учить | Thêm các tiền tố *по-, про-, на-, с-, вы-* |\n| **Thay đổi tiếp tố** | реша́ть *(giải bài)*<br>открыва́ть *(mở)*<br>получа́ть *(nhận)* | реш**и́**ть<br>откр**ы́**ть<br>получ**и́**ть | Đổi tiếp tố `-а- / -ва- / -ыва-` sang `-и- / -Ø-` |\n| **Gốc từ dị biệt hoàn toàn** | **говорить** *(nói)*<br>**брать** *(cầm/lấy)*<br>**класть** *(đặt/để nằm)*<br>**ловить** *(bắt)* | **сказать**<br>**взять**<br>**положить**<br>**поймать** | Bắt buộc phải học thuộc từng cặp riêng biệt! |\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nChọn thể động từ thích hợp (НСВ hoặc СВ) ở thời quá khứ:\n1. Вчера я весь вечер (решал / решил) одну сложную задачу, но так и не (решал / решил) её.\n2. Мы обычно (завтракали / позавтракали) в 7 часов утра.\n3. Студент (писал / написал) сочинение за полчаса.\n4. Пожалуйста, не (брал / бери / возьми) этот документ, он секретный!\n5. Смотри под ноги, не (падай / упади)!\n\n### Đáp án & Lời giải:\n1. **решал** *(quá trình kéo dài suốt cả buổi tối: весь вечер)*, nhưng không **решил** *(không đạt được kết quả)*.\n2. **завтракали** *(thói quen lặp lại thường xuyên: обычно)*.\n3. **написал** *(kết quả hoàn thành trong một khoảng thời gian: за полчаса)*.\n4. не **бери** *(lời cấm đoán: Не + НСВ)*.\n5. не **упади** *(cảnh báo rủi ro ngoài ý muốn: Не + СВ)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 19,
    "is_pro_only": true
  },
  {
    "id": "bai_20",
    "code": "bai_20",
    "title": "BÀI 20: ĐỘNG TỪ CHUYỂN ĐỘNG KHÔNG TIỀN TỐ",
    "level": "B1",
    "category": "Thể & Động từ chuyển động",
    "topic": "Thể & Động từ chuyển động",
    "vi": "BÀI 20: ĐỘNG TỪ CHUYỂN ĐỘNG KHÔNG TIỀN TỐ",
    "summary": "Hiểu rõ bản chất chia cặp động từ chuyển động: **Một hướng (Однонаправленные)** vs **Đa hướng / Khứ hồi (Разнонаправленные)**.\nNằm lòng 8 cặp động từ chuyển động quan trọng nhất và phân biệt rõ đi bộ (*идти/ходить*) với đi xe (*ехать/ездить*).\nGiải mã ý nghĩa \"Đi khứ hồi trọn vẹn trong quá khứ\" của nhóm đa hướng (*Вчера я ходил в музей*).\nNắm trọn các nghĩa bóng thông dụng của động từ `идти` (*trời mưa, đồng hồ chạy, hợp dáng...*).",
    "content_md": "# BÀI 20: ĐỘNG TỪ CHUYỂN ĐỘNG KHÔNG TIỀN TỐ\n## (Бесприставочные глаголы движения: Однонаправленные и разнонаправленные)\n\n> **Mục tiêu bài học:**\n> - Hiểu rõ bản chất chia cặp động từ chuyển động: **Một hướng (Однонаправленные)** vs **Đa hướng / Khứ hồi (Разнонаправленные)**.\n> - Nằm lòng 8 cặp động từ chuyển động quan trọng nhất và phân biệt rõ đi bộ (*идти/ходить*) với đi xe (*ехать/ездить*).\n> - Giải mã ý nghĩa \"Đi khứ hồi trọn vẹn trong quá khứ\" của nhóm đa hướng (*Вчера я ходил в музей*).\n> - Nắm trọn các nghĩa bóng thông dụng của động từ `идти` (*trời mưa, đồng hồ chạy, hợp dáng...*).\n\n---\n\n## 1. NGUYÊN LÝ VECTOR: MỘT HƯỚNG VS ĐA HƯỚNG\n\nTất cả các động từ chuyển động cơ bản chưa gắn tiền tố đều thuộc **Thể chưa hoàn thành (НСВ)**, nhưng chúng chia thành 2 nhánh:\n\n```mermaid\nflowchart TD\n    MV[\"ĐỘNG TỪ CHUYỂN ĐỘNG (НСВ)\"]\n    MV --> Uni[\"NHÓM MỘT HƯỚNG (идти, ехать...)\\n- Một vector có định hướng xác định (A -> B)\\n- Đang diễn ra ngay tại thời điểm nói\\n- Hai hành động di chuyển song song\"]\n    MV --> Multi[\"NHÓM ĐA HƯỚNG (ходить, ездить...)\\n- Đi lại nhiều hướng không mục đích (dạo chơi)\\n- Thói quen lặp đi lặp lại thường xuyên\\n- Chuyến đi khứ hồi trọn vẹn trong quá khứ (A -> B -> A)\\n- Khả năng vận động tự nhiên (biết đi, biết bơi)\"]\n```\n\n---\n\n## 2. BẢNG 8 CẶP ĐỘNG TỪ CHUYỂN ĐỘNG CỐT LÕI\n\n| Phương thức chuyển động | Nhóm Một hướng (Đi 1 hướng) | Nhóm Đa hướng (Lặp lại / Dạo chơi / Khứ hồi) | Ý nghĩa tiếng Việt |\n| :--- | :--- | :--- | :--- |\n| **Bằng chân (Đi bộ)** | **идти́** *(иду́, идёшь... иду́т)* | **ходи́ть** *(хожу́, хо́дишь... хо́дят)* | Đi bộ |\n| **Bằng phương tiện xe cộ** | **е́хать** *(е́ду, е́дешь... е́дут)* | **е́здить** *(е́зжу, е́здишь... е́здят)* | Đi xe, đi tàu, lái xe |\n| **Chạy** | **бежа́ть** *(бегу́, бежи́шь... бегу́т)* | **бе́гать** *(бе́гаю, бе́гаешь...)* | Chạy |\n| **Bay** | **лете́ть** *(лечу́, лети́шь... летя́т)* | **лета́ть** *(лета́ю, лета́ешь...)* | Bay |\n| **Bơi** | **плыть** *(плыву́, плывёшь...)* | **пла́вать** *(пла́ваю, пла́ваешь...)* | Bơi lội |\n| **Mang, xách (bằng tay)** | **нести́** *(несу́, несёшь...)* | **носи́ть** *(ношу́, но́сишь... но́сят)* | Mang, xách, vác |\n| **Chở (bằng phương tiện)** | **везти́** *(везу́, везёшь...)* | **вози́ть** *(вожу́, во́зишь... во́зят)* | Chở, vận chuyển xe |\n| **Dắt, dẫn đường** | **вести́** *(веду́, ведёшь...)* | **води́ть** *(вожу́, во́дишь... во́дят)* | Dắt tay, dẫn dắt, lái xe |\n\n---\n\n## 3. CÁC NGỮ CẢNH ỨNG DỤNG BẢN CHẤT\n\n### 3.1. Đang trên đường đi (Ngay lúc này) $\\rightarrow$ DÙNG MỘT HƯỚNG\n- *Куда ты сейчас **идёшь**?* – *Я **иду** в библиотеку.* (Bây giờ bạn đang đi đâu đấy? - Tôi đang đi đến thư viện).\n- *Посмотри, самолёт **летит** над городом.* (Nhìn kìa, máy bay đang bay qua thành phố).\n\n### 3.2. Thói quen, tần suất lặp lại $\\rightarrow$ DÙNG ĐA HƯỚNG\n- *Я каждый день **хожу** на работу пешком.* (Mỗi ngày tôi đều đi bộ đi làm).\n- *Летом мы часто **ездим** на дачу на машине.* (Mùa hè chúng tôi thường đi xe về biệt thự vườn).\n\n### 3.3. Đi dạo quanh quẩn nhiều hướng $\\rightarrow$ DÙNG ĐA HƯỚNG\n- *Мы долго **ходили** по красивым улицам Москвы.* (Chúng tôi đi dạo quanh các con phố đẹp ở Moskva).\n- *Дети весело **бегают** во дворе.* (Lũ trẻ đang chạy nhảy tung tăng trong sân).\n\n### 3.4. Đi khứ hồi trong quá khứ (A $\\rightarrow$ B $\\rightarrow$ A) $\\rightarrow$ ĐẶC TRƯNG CỦA ĐA HƯỚNG!\n\n> [!IMPORTANT]\n> Khi bạn muốn nói: *\"Hôm qua tôi có đi nhà hát / đi bảo tàng\"* (nghĩa là đã đi đến đó xem xong và bây giờ ĐÃ TRỞ VỀ NHÀ), người Nga **bắt buộc dùng động từ Đa hướng ở thời quá khứ**:\n> - *Вчера я **ходил** в театр.* (Hôm qua tôi đã đi nhà hát - và hiện tại tôi đang ở nhà).\n> - *В прошлом году мы **ездили** в Россию.* (Năm ngoái chúng tôi đã đi Nga - chuyến đi khứ hồi, nay đã về nước).\n> \n> *(Nếu bạn nói: \"Когда я **шёл** в театр, я встретил друга\" $\\rightarrow$ nghĩa là lúc đó tôi đang sải bước trên đường đi đến nhà hát, chưa tới nơi!).*\n\n### 3.5. Khả năng vận động tự nhiên $\\rightarrow$ DÙNG ĐA HƯỚNG\n- *Ребёнку уже год, он уже умеет **ходить**.* (Đứa bé đã 1 tuổi, nó đã biết đi bộ).\n- *Рыбы **плавают**, а птицы **летают**.* (Cá thì biết bơi, còn chim thì biết bay).\n\n---\n\n## 4. CÁC NGHĨA CHUYỂN BÓNG CỰC KỲ PHỔ BIẾN CỦA “ИДТИ”\n\nTrong đời sống hàng ngày, động từ `идти` được dùng cho rất nhiều hiện tượng không phải con người đi bộ:\n- **Thời tiết:** *Идёт дождь* (Trời đang mưa), *Идёт снег* (Tuyết đang rơi).\n- **Thời gian:** *Время быстро идёт.* (Thời gian trôi qua thật nhanh).\n- **Máy móc:** *Мои часы идут точно.* (Đồng hồ của tôi chạy rất chuẩn).\n- **Sự kiện/Phim ảnh:** *В кинотеатре идёт интересный фильм.* (Ở rạp đang chiếu bộ phim hay).\n- **Trang phục/Hợp mắt:** *Это синее платье тебе очень идёт.* (Chiếc váy xanh này rất hợp với bạn).\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\nĐiền dạng đúng của cặp động từ thích hợp:\n1. *(идти - ходить)*:\n   - a) Привет, куда ты сейчас _____?\n   - b) Мой дедушка каждое утро _____ в парк на прогулку.\n   - c) Вчера вечером мы _____ на интересный концерт.\n2. *(ехать - ездить)*:\n   - a) Смотри, вон _____ новый автобус.\n   - b) Зимой студенты часто _____ кататься на лыжах.\n   - c) В прошлом месяце Антон _____ в командировку в Санкт-Петербург.\n\n### Đáp án & Lời giải:\n1. Đi bộ:\n   - a) куда ты сейчас **идёшь**? *(ngay lúc này, một hướng)*.\n   - b) каждое утро **ходит** *(thói quen mỗi sáng, đa hướng)*.\n   - c) Вчера вечером мы **ходили** *(khứ hồi quá khứ, đã đi và đã về)*.\n2. Đi bằng phương tiện:\n   - a) вон **едет** новый автобус *(đang chạy qua mắt, một hướng)*.\n   - b) часто **ездят** *(thường xuyên lặp lại, đa hướng)*.\n   - c) **ездил** *(chuyến công tác khứ hồi trong quá khứ)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 20,
    "is_pro_only": true
  },
  {
    "id": "bai_21",
    "code": "bai_21",
    "title": "BÀI 21: ĐỘNG TỪ CHUYỂN ĐỘNG CÓ TIỀN TỐ",
    "level": "B1",
    "category": "Thể & Động từ chuyển động",
    "topic": "Thể & Động từ chuyển động",
    "vi": "BÀI 21: ĐỘNG TỪ CHUYỂN ĐỘNG CÓ TIỀN TỐ",
    "summary": "Nắm trọn công thức tạo Thể tuyệt đối khi gắn tiền tố: `Tiền tố + Một hướng = СВ` và `Tiền tố + Đa hướng = НСВ`.\nLàm chủ hệ thống 12 tiền tố không gian cốt tử (*по-, при-, у-, в-, вы-, под-, от-, до-, пере-, за-, про-, об-*).\nNắm chắc các cặp tiền tố đối ứng trái nghĩa kinh điển (*прийти - уйти, войти - выйти, подойти - отойти*).\nSử dụng chuẩn xác giới từ đi kèm từng tiền tố.",
    "content_md": "# BÀI 21: ĐỘNG TỪ CHUYỂN ĐỘNG CÓ TIỀN TỐ\n## (Приставочные глаголы движения: Пространственные значения и видовые пары)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn công thức tạo Thể tuyệt đối khi gắn tiền tố: `Tiền tố + Một hướng = СВ` và `Tiền tố + Đa hướng = НСВ`.\n> - Làm chủ hệ thống 12 tiền tố không gian cốt tử (*по-, при-, у-, в-, вы-, под-, от-, до-, пере-, за-, про-, об-*).\n> - Nắm chắc các cặp tiền tố đối ứng trái nghĩa kinh điển (*прийти - уйти, войти - выйти, подойти - отойти*).\n> - Sử dụng chuẩn xác giới từ đi kèm từng tiền tố.\n\n---\n\n## 1. NGUYÊN TẮC VÀNG VỀ SỰ HÌNH THÀNH THỂ (ВИД)\n\nKhi gắn bất kỳ một tiền tố không gian nào vào động từ chuyển động, ta sẽ tạo thành một **Cặp thể hoàn chỉnh (Видовая пара)** theo công thức kỳ diệu sau:\n\n$$\\begin{aligned}\n\\textbf{Tiền tố} + \\textbf{Động từ MỘT HƯỚNG} &\\longrightarrow \\textbf{THỂ HOÀN THÀNH (СВ)} \\\\\n\\textbf{Tiền tố} + \\textbf{Động từ ĐA HƯỚNG} &\\longrightarrow \\textbf{THỂ CHƯA HOÀN THÀNH (НСВ)}\n\\end{aligned}$$\n\n```mermaid\nflowchart LR\n    P[\"Tiền tố Không gian\\n(при-, у-, в-, вы-...)\"]\n    P -->|+ идти / ехать| SV[\"THỂ HOÀN THÀNH (СВ)\\nприйти́, прие́хать\\n(Hành động đến nơi một lần)\"]\n    P -->|+ ходить / ездить*| NSV[\"THỂ CHƯA HOÀN THÀNH (НСВ)\\nприходи́ть, приезжа́ть*\\n(Thói quen đến / Quá trình đang đến)\"]\n```\n\n> [!NOTE]\n> **Biến đổi hình thức đặc thù của nhóm НСВ:**\n> - Đi bộ: `прийти` (СВ) $\\longleftrightarrow$ `приходить` (НСВ).\n> - Đi xe: `приехать` (СВ) $\\longleftrightarrow$ `приезжать` (НСВ - đổi gốc từ `-ездить` thành `-езжать`).\n> - Bay: `прилететь` (СВ) $\\longleftrightarrow$ `прилетать` (НСВ).\n> - Bơi: `приплыть` (СВ) $\\longleftrightarrow$ `приплывать` (НСВ).\n\n---\n\n## 2. BẢN ĐỒ 12 TIỀN TỐ KHÔNG GIAN CỐT TỬ\n\n### 2.1. Tiền tố “ПО-” (Khởi hành / Bắt đầu đi)\n- Gắn vào một hướng tạo động từ **СВ**: biểu thị sự bắt đầu di chuyển, lên đường:\n  - *пойти* *(bắt đầu đi bộ)*, *поехать* *(bắt đầu lái xe/lên đường)*.\n  - *Пойдём!* *(Đi thôi nào! - đi bộ)*; *Поехали!* *(Lên xe xuất phát thôi!)*.\n  - *Утром он позавтракал и **пошёл** в школу.* (Sáng ăn xong và bắt đầu đi tới trường).\n\n### 2.2. Cặp đối nghĩa 1: “ПРИ-” (Đến nơi) $\\longleftrightarrow$ “У-” (Rời đi hẳn)\n| Tiền tố | Hướng chuyển động | Cặp động từ (СВ / НСВ) | Giới từ đi kèm | Ví dụ thực tế |\n| :---: | :--- | :--- | :---: | :--- |\n| **ПРИ-** | **Đến nơi**, xuất hiện tại điểm đích | **прийти / приходить**<br>**приехать / приезжать** | **в / на + C4**<br>**к + C3** | Поезд **прибыл** на вокзал вовремя.<br>Вчера друг **пришёл** ко мне в гости. |\n| **У-** | **Rời đi hẳn**, biến mất khỏi địa điểm | **уйти / уходить**<br>**уехать / уезжать** | **из / с + C2**<br>**от + C2** | Отец уже **ушёл** на работу.<br>В прошлом году он **уехал** из города. |\n\n---\n\n### 2.3. Cặp đối nghĩa 2: “В- / ВО-” (Đi vào) $\\longleftrightarrow$ “ВЫ-” (Đi ra)\n| Tiền tố | Hướng chuyển động | Cặp động từ (СВ / НСВ) | Giới từ đi kèm | Ví dụ thực tế |\n| :---: | :--- | :--- | :---: | :--- |\n| **В- (ВО-)** | **Đi vào bên trong** không gian kín | **войти / входить**<br>**въехать / въезжать** | **В + Cách 4** *(Куда?)* | Профессор **вошёл** в аудиторию.<br>Машина **въехала** в гараж. |\n| **ВЫ-** | **Đi ra ngoài** khỏi không gian kín | **выйти / выходить**<br>**выехать / выезжать** | **ИЗ / С + Cách 2** | Студенты **вышли** из класса.<br>Автобус **выехал** из гаража. |\n\n---\n\n### 2.4. Cặp đối nghĩa 3: “ПОД-” (Tiến lại gần) $\\longleftrightarrow$ “ОТ-” (Lùi ra xa)\n| Tiền tố | Hướng chuyển động | Cặp động từ (СВ / НСВ) | Giới từ đi kèm | Ví dụ thực tế |\n| :---: | :--- | :--- | :---: | :--- |\n| **ПОД-** | **Tiến lại gần sát** người/vật | **подойти / подходить**<br>**подъехать / подъезжать** | **К + Cách 3** | Мальчик **подошёл** к окну.<br>Такси **подъехало** к гостинице. |\n| **ОТ-** | **Lùi xa một khoảng ngắn** khỏi vật | **отойти / отходить**<br>**отъехать / отъезжать** | **ОТ + Cách 2** | **Отойдите** от края платформы!<br>Машина **отъехала** от дома. |\n\n---\n\n### 2.5. Các tiền tố không gian quan trọng khác:\n1. **ДО- (Đi đến tận nơi, chạm đến mốc đích):**\n   - Đi với giới từ **ДО + Cách 2**:\n   - *Мы шли пешком и наконец **дошли до** станции.* (Chúng tôi đi bộ và cuối cùng đã tới tận nhà ga).\n2. **ПЕРЕ- (Băng qua, vượt qua đường / chuyển nhà):**\n   - Đi với **через + Cách 4** hoặc trực tiếp Cách 4:\n   - *Осторожно **переходите** улицу!* (Hãy cẩn thận khi băng qua đường!).\n   - *Семья **переехала** на новую квартиру.* (Gia đình đã chuyển sang căn hộ mới).\n3. **ЗА- (Ghé tạt qua trên đường đi / đi sâu vào bên trong):**\n   - *По дороге домой я **зайду** в магазин за хлебом.* (Trên đường về nhà tôi sẽ tạt qua cửa hàng mua bánh mì).\n   - *Туристы глубоко **зашли** в лес.* (Các du khách đi sâu vào trong rừng).\n4. **ПРО- (Đi ngang qua / đi qua một cự ly):**\n   - Đi với giới từ **МИМО + Cách 2**:\n   - *Я **прошёл мимо** аптеки.* (Tôi đã đi ngang qua hiệu thuốc).\n   - *Мы **проехали** 100 километров.* (Chúng tôi đã chạy qua 100 km).\n5. **ОБ- / ОБО- (Đi vòng quanh):**\n   - Đi với giới từ **ВОКРУГ + Cách 2**:\n   - *Мы **обошли вокруг** нового здания.* (Chúng tôi đi dạo một vòng quanh tòa nhà mới).\n\n---\n\n## 3. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chọn tiền tố thích hợp ghép vào động từ (*при-, у-, в-, вы-, под-, пере-*):\n   - a) Поезд скоро _____едет на первый путь вокзала.\n   - b) Студент постучал и _____шёл в кабинет декана.\n   - c) В 8 часов вечера все сотрудники уже _____шли с работы домой.\n   - d) Он встал и _____шёл к доске.\n   - e) Будьте внимательны, когда вы _____ходите через дорогу!\n2. Xác định thể (НСВ hay СВ) của các động từ sau:\n   - `приезжать`, `уйти`, `переходить`, `доехать`, `войти`.\n\n### Đáp án & Lời giải:\n1. Ghép tiền tố:\n   - a) **при**едет *(đến ga)*.\n   - b) **во**шёл в кабинет *(đi vào bên trong phòng)*.\n   - c) **у**шли с работы *(rời chỗ làm về nhà)*.\n   - d) **подо**шёл к доске *(tiến lại gần bảng)*.\n   - e) **пере**ходите через дорогу *(băng qua đường)*.\n2. Xác định thể:\n   - `приезжать`: **НСВ** *(tiền tố + đa hướng)*.\n   - `уйти`: **СВ** *(tiền tố + một hướng)*.\n   - `переходить`: **НСВ** *(tiền tố + đa hướng)*.\n   - `доехать`: **СВ** *(tiền tố + một hướng)*.\n   - `войти`: **СВ** *(tiền tố + một hướng)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 21,
    "is_pro_only": true
  },
  {
    "id": "bai_22",
    "code": "bai_22",
    "title": "BÀI 22: THỨC MỆNH LỆNH, THỨC GIẢ ĐỊNH & THỂ BỊ ĐỘNG",
    "level": "B2",
    "category": "Phân từ & Trạng phân từ",
    "topic": "Phân từ & Trạng phân từ",
    "vi": "BÀI 22: THỨC MỆNH LỆNH, THỨC GIẢ ĐỊNH & THỂ BỊ ĐỘNG",
    "summary": "Nắm trọn 3 công thức tạo **Thức Mệnh lệnh (Повелительное наклонение)**: `-й/-йте`, `-и/-ите`, `-ь/-ьте`.\nGhi nhớ các dạng mệnh lệnh dị biệt đặc thù (*поезжай, ляг, ешь...*).\nLàm chủ **Thức Giả định / Điều kiện**: cấu trúc câu ước muốn và câu điều kiện không có thật (`Quá khứ + БЫ`).\nPhân biệt 2 cách tạo **Câu Bị động (Страдательный залог)**: bị động với đuôi `-ся` (НСВ) và bị động với tính động từ ngắn (СВ).",
    "content_md": "# BÀI 22: THỨC MỆNH LỆNH, THỨC GIẢ ĐỊNH & THỂ BỊ ĐỘNG\n## (Наклонения глагола и страдательный залог)\n\n> **Mục tiêu bài học:**\n> - Nắm trọn 3 công thức tạo **Thức Mệnh lệnh (Повелительное наклонение)**: `-й/-йте`, `-и/-ите`, `-ь/-ьте`.\n> - Ghi nhớ các dạng mệnh lệnh dị biệt đặc thù (*поезжай, ляг, ешь...*).\n> - Làm chủ **Thức Giả định / Điều kiện**: cấu trúc câu ước muốn và câu điều kiện không có thật (`Quá khứ + БЫ`).\n> - Phân biệt 2 cách tạo **Câu Bị động (Страдательный залог)**: bị động với đuôi `-ся` (НСВ) và bị động với tính động từ ngắn (СВ).\n\n---\n\n## 1. THỨC MỆNH LỆNH (ПОВЕЛИТЕЛЬНОЕ НАКЛОНЕНИЕ)\n\nThức mệnh lệnh dùng để ra lệnh, yêu cầu, đề nghị hoặc khuyên nhủ. Có 2 dạng thức: thân mật (`ты`) và lịch sự/số nhiều (`вы`).\n\n### 1.1. Ba quy tắc thành lập từ gốc thời hiện tại (ngôi “ОНИ”):\nBỏ đuôi ngôi `они` (*-ут/-ют, -ат/-ят*) để lấy thân từ:\n\n| Điều kiện thân từ & Trọng âm | Đuôi ngôi “ТЫ” | Đuôi ngôi “ВЫ” | Ví dụ minh họa |\n| :--- | :---: | :---: | :--- |\n| **1. Thân từ tận cùng bằng NGUYÊN ÂM** | **-й** | **-йте** | чита-ют $\\rightarrow$ чита́**й** / чита́**йте**<br>дела-ют $\\rightarrow$ де́ла**й** / де́ла**йте**<br>по-ют $\\rightarrow$ по**й** / по**йте** |\n| **2. Thân từ tận cùng PHỤ ÂM & Trọng âm ở đuôi** | **-и** | **-ите** | говор-я́т $\\rightarrow$ говор**и́** / говор**и́те**<br>пиш-у́т $\\rightarrow$ пиш**и́** / пиш**и́те**<br>ид-у́т $\\rightarrow$ ид**и́** / ид**и́те** |\n| **3. Thân từ tận cùng PHỤ ÂM & Trọng âm ở THÂN TỪ** | **-ь** | **-ьте** | гото́в-ят $\\rightarrow$ гото́в**ь** / гото́в**ьте**<br>отве́т-ят $\\rightarrow$ отве́т**ь** / отве́т**ьте**<br>познако́м-ят $\\rightarrow$ познако́м**ь**ся / -тесь |\n\n### 1.2. Các động từ mệnh lệnh dị biệt bắt buộc phải thuộc:\n- **ехать** *(đi xe)* $\\rightarrow$ **поезжа́й! / поезжа́йте!** *(tuyệt đối không nói едь hay ехай!)*.\n- **лечь** *(nằm xuống)* $\\rightarrow$ **ляг! / ля́гте!**\n- **есть** *(ăn)* $\\rightarrow$ **ешь! / е́шьте!**\n- **пить** *(uống)* $\\rightarrow$ **пей! / пе́йте!**\n- **дать** *(cho/đưa)* $\\rightarrow$ **дай! / да́йте!**\n- **быть** *(hãy là)* $\\rightarrow$ **будь! / бу́дьте!** *(Будьте здоровы! - Chúc sức khỏe!)*.\n\n---\n\n## 2. THỨC GIẢ ĐỊNH / ĐIỀU KIỆN (СОСЛАГАТЕЛЬНОЕ НАКЛОНЕНИЕ)\n\nThức giả định dùng để diễn tả một hành động không có thật, một điều kiện trái với thực tế hoặc một mong muốn lịch sự:\n\n$$\\text{Công thức:} \\quad \\textbf{Động từ thời Quá khứ} + \\textbf{tiểu từ БЫ}$$\n\n### 2.1. Câu điều kiện trái với thực tế (Nếu... thì...):\n$$\\textbf{Если бы} + \\text{Quá khứ},\\ \\text{Quá khứ} + \\textbf{бы}$$\n- *Если бы у меня **было** время, я с удовольствием **поехал бы** с вами.*\n  *(Nếu tôi có thời gian thì tôi đã rất vui lòng đi cùng với các bạn rồi - thực tế là tôi không có thời gian).*\n- *Если бы вчера не **было** дождя, мы **пошли бы** гулять.*\n  *(Nếu hôm qua trời không mưa thì chúng tôi đã đi dạo).*\n\n### 2.2. Lời đề nghị, mong muốn lịch sự:\n- *Я **хотел бы** заказать столик.* (Tôi muốn đặt một bàn - lịch sự hơn *Я хочу*).\n- *Вы **не помогли бы** мне?* (Ngài có thể giúp tôi một chút được không ạ?).\n\n---\n\n## 3. THỂ BỊ ĐỘNG TRONG TIẾNG NGA (СТРАДАТЕЛЬНЫЙ ЗАЛОГ)\n\nKhi muốn nhấn mạnh đối tượng tiếp nhận thay vì người thực hiện hành động:\n\n```mermaid\nflowchart LR\n    Act[\"CÂU CHỦ ĐỘNG\\nChủ thể (C1) + Động từ + Tân ngữ (C4)\\nРабочие строят дом.\"]\n    Act --> Pass[\"CÂU BỊ ĐỘNG\\nVật bị tác động (C1) + V Bị động + Chủ thể (C5)\\nДом строится рабочими.\"]\n```\n\n### 3.1. Bị động với động từ Chưa hoàn thành (НСВ): Thêm hậu tố `-СЯ`\n$$\\textbf{Đối tượng (C1)} + \\textbf{Động từ НСВ có đuôi -ся} + \\textbf{Chủ thể thực hiện (Cách 5)}$$\n- Chủ động: *Рабочие строят этот мост.*\n- Bị động: *Этот мост **строится рабочими**.* (Cây cầu này đang được xây dựng bởi các công nhân).\n\n### 3.2. Bị động với động từ Hoàn thành (СВ): Dùng Tính động từ bị động ngắn\n$$\\textbf{Đối tượng (C1)} + [\\textbf{был / будет}] + \\textbf{Tính động từ ngắn} + \\textbf{Chủ thể (Cách 5)}$$\n- *Книга **написана** известным писателем.* (Cuốn sách được viết bởi một nhà văn nổi tiếng).\n- *Дом **был построен** в прошлом году.* (Ngôi nhà đã được xây dựng vào năm ngoái).\n- *Окно **открыто**.* (Cửa sổ đang được mở).\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Chuyển các động từ sau sang thức Mệnh lệnh (dạng lịch sự `вы`):\n   - a) читать\n   - b) говорить\n   - c) ответить\n   - d) ехать\n   - e) пить\n2. Chuyển câu chủ động sau sang câu bị động:\n   - *Известный архитектор спроектировал это красивое здание.*\n3. Điền dạng đúng vào câu điều kiện:\n   - *Если бы я (знать) русский язык лучше, я (поступить) в МГУ.*\n\n### Đáp án & Lời giải:\n1. Mệnh lệnh `вы`:\n   - a) чита́**йте**!\n   - b) говори́**те**!\n   - c) отве́т**ьте**!\n   - d) **поезжа́йте**! *(bất quy tắc)*.\n   - e) пе́**йте**!\n2. Bị động:\n   - *Это красивое здание **было спроектировано** известным архитектором.*\n3. Điều kiện:\n   - Если бы я **знал / знала** русский язык лучше, я **поступил бы / поступила бы** в МГУ.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 22,
    "is_pro_only": true
  },
  {
    "id": "bai_23",
    "code": "bai_23",
    "title": "BÀI 23: TÍNH ĐỘNG TỪ (ПРИЧАСТИЕ) – CẤU TẠO VÀ CHUYỂN ĐỔI MỆNH ĐỀ",
    "level": "B2",
    "category": "Phân từ & Trạng phân từ",
    "topic": "Phân từ & Trạng phân từ",
    "vi": "BÀI 23: TÍNH ĐỘNG TỪ (ПРИЧАСТИЕ) – CẤU TẠO VÀ CHUYỂN ĐỔI MỆNH ĐỀ",
    "summary": "Hiểu bản chất lai tạo đặc biệt của **Tính động từ (Причастие)**: Động từ + Tính từ.\nLàm chủ 4 loại tính động từ: **Chủ động Hiện tại/Quá khứ** và **Bị động Hiện tại/Quá khứ**.\nNắm vững kỹ thuật vàng **chuyển đổi 2 chiều** giữa Mệnh đề phụ có `который` và Cụm tính động từ (chủ điểm bắt buộc ở trình độ TRKI B1-B2).\nQuy tắc đặt dấu phẩy của cụm tính động từ trong câu.",
    "content_md": "# BÀI 23: TÍNH ĐỘNG TỪ (ПРИЧАСТИЕ) – CẤU TẠO VÀ CHUYỂN ĐỔI MỆNH ĐỀ\n## (Причастие в русском языке: Действительные и страдательные формы)\n\n> **Mục tiêu bài học:**\n> - Hiểu bản chất lai tạo đặc biệt của **Tính động từ (Причастие)**: Động từ + Tính từ.\n> - Làm chủ 4 loại tính động từ: **Chủ động Hiện tại/Quá khứ** và **Bị động Hiện tại/Quá khứ**.\n> - Nắm vững kỹ thuật vàng **chuyển đổi 2 chiều** giữa Mệnh đề phụ có `который` và Cụm tính động từ (chủ điểm bắt buộc ở trình độ TRKI B1-B2).\n> - Quy tắc đặt dấu phẩy của cụm tính động từ trong câu.\n\n---\n\n## 1. TÍNH ĐỘNG TỪ LÀ GÌ?\n\nTính động từ là dạng thức đặc biệt kết hợp sức mạnh của 2 loại từ:\n- **Tính chất Động từ:** Có thể (*НСВ/СВ*), có thời gian (*Hiện tại/Quá khứ*), chi phối tân ngữ gián tiếp.\n- **Tính chất Tính từ:** Biến cách theo *Giống, Số, Cách*, bổ nghĩa cho danh từ và nhận đuôi tính từ (*-ый, -ая, -ое, -ые*).\n\n```mermaid\nmindmap\n  root((4 LOẠI TÍNH ĐỘNG TỪ))\n    CHỦ ĐỘNG\n      Hiện tại: -УЩ- / -ЮЩ- / -АЩ- / -ЯЩ-\n        читающий студент\n      Quá khứ: -ВШ- / -Ш-\n        прочитавший студент\n    BỊ ĐỘNG\n      Hiện tại: -ЕМ- / -ИМ-\n        изучаемый предмет, любимая песня\n      Quá khứ: -НН- / -ЕНН- / -Т-\n        прочитанная книга, открытое окно\n```\n\n---\n\n## 2. BẢNG CÔNG THỨC THÀNH LẬP 4 LOẠI TÍNH ĐỘNG TỪ\n\n### 2.1. Tính động từ Chủ động (Действительные причастия)\nChỉ đối tượng **tự mình thực hiện hành động**:\n\n| Loại | Thể & Gốc xuất phát | Tiếp tố đặc trưng | Ví dụ cấu tạo |\n| :--- | :--- | :---: | :--- |\n| **Hiện tại**<br>*(Đang làm)* | Chỉ tạo từ **НСВ**<br>Từ ngôi **“ОНИ”** hiện tại | Nhóm I: **-ущ- / -ющ-**<br>Nhóm II: **-ащ- / -ящ-** | чита́-ют $\\rightarrow$ чита́**ющ**ий *(người đang đọc)*<br>пи́ш-ут $\\rightarrow$ пи́ш**ущ**ий *(đang viết)*<br>говоря́т $\\rightarrow$ говоря́**щ**ий *(đang nói)* |\n| **Quá khứ**<br>*(Đã làm)* | Tạo từ cả **НСВ và СВ**<br>Từ thân từ **Quá khứ** (bỏ -л) | Sau nguyên âm: **-вш-**<br>Sau phụ âm: **-ш-** | чита́-л $\\rightarrow$ чита́**вш**ий / прочита́**вш**ий<br>нёс $\\rightarrow$ нёс**ш**ий *(người đã mang)*<br>поги́б $\\rightarrow$ поги́б**ш**ий |\n\n---\n\n### 2.2. Tính động từ Bị động (Страдательные причастия)\nChỉ đối tượng **chịu tác động từ hành động của người/vật khác**:\n\n| Loại | Thể & Gốc xuất phát | Tiếp tố đặc trưng | Ví dụ cấu tạo |\n| :--- | :--- | :---: | :--- |\n| **Hiện tại**<br>*(Đang được làm)* | Chỉ từ ngoại động từ **НСВ**<br>Từ ngôi **“МЫ”** hiện tại | Nhóm I: **-ем-**<br>Nhóm II: **-им-** | чита́ем $\\rightarrow$ чита́**ем**ый *(đang được đọc)*<br>изуча́ем $\\rightarrow$ изуча́**ем**ый *(đang nghiên cứu)*<br>лю́бим $\\rightarrow$ люб**и́м**ый *(được yêu thích)* |\n| **Quá khứ**<br>*(Đã được làm xong)* | Thường chỉ từ động từ **СВ**<br>Từ thân từ **Nguyên mẫu** | **-нн-** *(sau -ать/-ять)*<br>**-енн- (-ённ-)** *(sau -ить/phụ âm)*<br>**-т-** *(từ 1 âm tiết, -ыть, -нуть)* | прочита́ть $\\rightarrow$ прочи́та**нн**ый *(đã đọc xong)*<br>написа́ть $\\rightarrow$ напи́са**нн**ый<br>постро́ить $\\rightarrow$ постро́**енн**ый *(đã xây xong)*<br>откры́ть $\\rightarrow$ откры́**т**ый *(đã mở)* |\n\n---\n\n## 3. KỸ THUẬT VÀNG: CHUYỂN ĐỔI MỆNH ĐỀ CÓ “КОТОРЫЙ”\n\nTrong văn viết, báo chí và sách học thuật Nga, người ta thường rút gọn mệnh đề phụ `который` thành Cụm tính động từ (Причастный оборот) để câu văn súc tích, sang trọng:\n\n### 3.1. Chủ động Hiện tại:\n- *Студент, **который читает** книгу, сидит у окна.*\n  $$\\longleftrightarrow \\text{Студент, }\\textbf{читающий}\\text{ книгу, сидит у окна.}$$\n\n### 3.2. Chủ động Quá khứ:\n- *Я знаю человека, **который написал** эту статью.*\n  $$\\longleftrightarrow \\text{Я знаю человека, }\\textbf{написавшего}\\text{ эту статью (C4 = C2).}$$\n\n### 3.3. Bị động Quá khứ:\n- *Книга, **которую прочитал** студент, лежит на столе.*\n  $$\\longleftrightarrow \\text{Книга, }\\textbf{прочитанная}\\text{ студентом (C5), лежит на столе.}$$\n\n---\n\n## 4. QUY TẮC ĐẶT DẤU PHẨY CỦA CỤM TÍNH ĐỘNG TỪ\n\n> [!WARNING]\n> - Nếu cụm tính động từ đứng **SAU DANH TỪ** $\\rightarrow$ **BẮT BUỘC NGĂN CÁCH BẰNG DẤU PHẨY**:\n>   - *Письмо, **полученное вчера**, лежало на столе.*\n> - Nếu cụm tính động từ đứng **TRƯỚC DANH TỪ** $\\rightarrow$ **KHÔNG DÙNG DẤU PHẨY**:\n>   - *Полученное вчера письмо лежало на столе.*\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Thành lập Tính động từ chủ động hiện tại từ: *делать, жить, любить*.\n2. Thành lập Tính động từ bị động quá khứ từ: *сделать, открыть, решить*.\n3. Rút gọn các câu sau bằng cách dùng cụm tính động từ:\n   - a) Вот журнал, который лежит на столе.\n   - b) Мы смотрели на детей, которые весело играли в саду.\n   - c) Вчера я прочитал статью, которую написал наш профессор.\n\n### Đáp án & Lời giải:\n1. Chủ động hiện tại:\n   - *делать* $\\rightarrow$ **делающий**\n   - *жить* $\\rightarrow$ **живущий**\n   - *любить* $\\rightarrow$ **любящий**\n2. Bị động quá khứ:\n   - *сделать* $\\rightarrow$ **сделанный**\n   - *открыть* $\\rightarrow$ **открытый**\n   - *решить* $\\rightarrow$ **решённый**\n3. Rút gọn câu:\n   - a) Вот журнал, **лежащий** на столе.\n   - b) Мы смотрели на детей, **весело игравших** в саду.\n   - c) Вчера я прочитал статью, **написанную** нашим профессором.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 23,
    "is_pro_only": true
  },
  {
    "id": "bai_24",
    "code": "bai_24",
    "title": "BÀI 24: TRẠNG ĐỘNG TỪ (ДЕЕПРИЧАСТИЕ) – HÀNH ĐỘNG PHỤ VÀ ĐỒNG CHỦ NGỮ",
    "level": "B2",
    "category": "Phân từ & Trạng phân từ",
    "topic": "Phân từ & Trạng phân từ",
    "vi": "BÀI 24: TRẠNG ĐỘNG TỪ (ДЕЕПРИЧАСТИЕ) – HÀNH ĐỘNG PHỤ VÀ ĐỒNG CHỦ NGỮ",
    "summary": "Hiểu bản chất lai tạo giữa **Động từ + Trạng từ**: từ bất biến, làm trạng ngữ bổ trợ cho hành động chính.\nPhân biệt chính xác: **Trạng động từ НСВ (Hành động song song: `-я / -а`)** vs **Trạng động từ СВ (Hành động trước: `-в / -вшись`)**.\nKhắc cốt ghi tâm **Quy tắc Vàng về Đồng chủ ngữ** để tránh lỗi ngữ pháp nghiêm trọng bậc nhất trong tiếng Nga.",
    "content_md": "# BÀI 24: TRẠNG ĐỘNG TỪ (ДЕЕПРИЧАСТИЕ) – HÀNH ĐỘNG PHỤ VÀ ĐỒNG CHỦ NGỮ\n## (Деепричастие: Образование, значение и синтаксическое употребление)\n\n> **Mục tiêu bài học:**\n> - Hiểu bản chất lai tạo giữa **Động từ + Trạng từ**: từ bất biến, làm trạng ngữ bổ trợ cho hành động chính.\n> - Phân biệt chính xác: **Trạng động từ НСВ (Hành động song song: `-я / -а`)** vs **Trạng động từ СВ (Hành động trước: `-в / -вшись`)**.\n> - Khắc cốt ghi tâm **Quy tắc Vàng về Đồng chủ ngữ** để tránh lỗi ngữ pháp nghiêm trọng bậc nhất trong tiếng Nga.\n\n---\n\n## 1. TRẠNG ĐỘNG TỪ LÀ GÌ?\n\nTrong một câu, khi một chủ thể thực hiện cùng lúc 2 hành động, hành động quan trọng hơn làm Vị ngữ chính, còn hành động phụ bổ trợ tính chất, thời điểm hoặc cách thức được chuyển thành **Trạng động từ (Деепричастие)**.\n\n> [!IMPORTANT]\n> **Đặc điểm hình thái của Trạng động từ:**\n> - Là **từ BẤT BIẾN** (không chia theo ngôi, giống, số hay cách).\n> - Trong câu, cụm trạng động từ **LUÔN LUÔN ĐƯỢC TÁCH BIỆT BẰNG DẤU PHẨY**.\n\n```mermaid\nflowchart TD\n    D[\"TRẠNG ĐỘNG TỪ (ДЕЕПРИЧАСТИЕ)\"]\n    D --> DNSV[\"1. TRẠNG ĐỘNG TỪ НСВ\\n- Tiếp tố: -Я / -А (-ясь)\\n- Ý nghĩa: Hành động phụ diễn ra ĐỒNG THỜI (song song) với hành động chính\\nVí dụ: Читая книгу, он слушал музыку.\"]\n    D --> DSV[\"2. TRẠNG ĐỘNG TỪ СВ\\n- Tiếp tố: -В, -ВШИ (-вшись)\\n- Ý nghĩa: Hành động phụ đã HOÀN THÀNH XONG TRƯỚC hành động chính\\nVí dụ: Прочитав письмо, она заплакала.\"]\n```\n\n---\n\n## 2. CÁCH THÀNH LẬP HAI LOẠI TRẠNG ĐỘNG TỪ\n\n### 2.1. Trạng động từ Chưa hoàn thành (НСВ) – Hành động song song\n- **Cách tạo:** Lấy thân từ thời hiện tại của ngôi `они` (bỏ *-ут/-ют, -ат/-ят*) + thêm đuôi **-Я** (hoặc **-А** sau âm xuýt/7 phụ âm):\n  - *чита́-ют $\\rightarrow$ чита́**я*** *(vừa đọc vừa...)*\n  - *де́ла-ют $\\rightarrow$ де́ла**я*** *(vừa làm vừa...)*\n  - *говоря́-т $\\rightarrow$ говоря́* *(vừa nói vừa...)*\n  - *слы́ш-ат $\\rightarrow$ слы́ш**а*** *(sau ш viết а)*\n- **Nhóm động từ đuôi `-авать`:** Giữ nguyên `-ва-`:\n  - *вставать $\\rightarrow$ вста**вая***, *узнавать $\\rightarrow$ узна**вая***, *давать $\\rightarrow$ да**вая***.\n- **Động từ phản thân:** Đuôi biến thành **-ясь** (sau cả phụ âm và nguyên âm):\n  - *улыба́ться $\\rightarrow$ улыба́**ясь*** *(vừa mỉm cười vừa...)*\n  - *занима́ться $\\rightarrow$ занима́**ясь***\n\n### 2.2. Trạng động từ Hoàn thành (СВ) – Hành động hoàn tất trước\n- **Cách tạo:** Lấy thân từ quá khứ hoặc nguyên mẫu của động từ СВ:\n  - Sau **nguyên âm**: thêm **-В** (hoặc *-вши*):\n    - *прочита́-ть $\\rightarrow$ прочита́**в*** *(sau khi đã đọc xong)*\n    - *написа́-ть $\\rightarrow$ написа́**в*** *(sau khi đã viết xong)*\n    - *поза́втрака-ть $\\rightarrow$ поза́втрака**в*** *(ăn sáng xong)*\n  - Động từ **phản thân**: nhận đuôi **-вшись**:\n    - *верну́-ться $\\rightarrow$ верну́**вшись*** *(sau khi đã quay trở về)*\n    - *оде́-ться $\\rightarrow$ оде́**вшись*** *(sau khi đã mặc đồ xong)*\n  - Một số động từ gốc đặc biệt nhận đuôi **-я / -а**:\n    - *войти $\\rightarrow$ войд**я́*** *(bước vào)*, *прийти $\\rightarrow$ прид**я́***, *увидеть $\\rightarrow$ увид**я***.\n\n---\n\n## 3. NGUYÊN TẮC BẤT DI BẤT DỊCH: QUY TẮC ĐỒNG CHỦ NGỮ\n\n> [!CAUTION]\n> **ĐIỀU KIỆN SỐNG CÒN:**\n> Hành động của Trạng động từ và hành động của Động từ vị ngữ chính **BẮT BUỘC PHẢI DO CÙNG MỘT CHỦ NGỮ THỰC HIỆN**!\n\n### Hãy xem xét ví dụ sai kinh điển trong văn học Nga của Chekhov:\n- ❌ **Sai:** *Подъезжая к станции, у меня слетела шляпа.*\n  *(Giải thích: Chủ ngữ vị ngữ là \"cái mũ bay mất - шляпа слетела\", nhưng đối tượng \"tiến lại gần ga - подъезжая\" lại là \"tôi - у меня\". Hai hành động này khác chủ ngữ nên câu này sai ngữ pháp!).*\n- ✅ **Sửa lại đúng:** *Когда я подъезжал к станции, у меня слетела шляпа.*\n- ✅ **Hoặc:** *Подъезжая к станции, **я потерял** шляпу.* *(Lúc này cả hai hành động đều do \"Tôi\" làm).*\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Thành lập Trạng động từ thích hợp từ các động từ sau:\n   - a) `читать` (НСВ)\n   - b) `прочитать` (СВ)\n   - c) `улыбаться` (НСВ)\n   - d) `вернуться` (СВ)\n   - e) `открыть` (СВ)\n2. Nối 2 câu đơn thành 1 câu có trạng động từ:\n   - a) Анна слушала музыку. В это же время она готовила обед.\n   - b) Виктор окончил университет. После этого он уехал работать на родину.\n\n### Đáp án & Lời giải:\n1. Tạo trạng động từ:\n   - a) *читать* $\\rightarrow$ **читая**\n   - b) *прочитать* $\\rightarrow$ **прочитав**\n   - c) *улыбаться* $\\rightarrow$ **улыбаясь**\n   - d) *вернуться* $\\rightarrow$ **вернувшись**\n   - e) *открыть* $\\rightarrow$ **открыв**\n2. Nối câu:\n   - a) **Слушая музыку**, Анна готовила обед. *(hoặc: Готовя обед, Анна слушала музыку - hành động đồng thời).*\n   - b) **Окончив университет**, Виктор уехал работать на родину. *(hành động hoàn thành trước)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 24,
    "is_pro_only": true
  },
  {
    "id": "bai_25",
    "code": "bai_25",
    "title": "BÀI 25: SỐ TỪ & QUY TẮC KẾT HỢP \"KIM CƯƠNG\" VỚI DANH TỪ",
    "level": "B1",
    "category": "Số từ",
    "topic": "Số từ",
    "vi": "BÀI 25: SỐ TỪ & QUY TẮC KẾT HỢP \"KIM CƯƠNG\" VỚI DANH TỪ",
    "summary": "Nắm vững **Quy tắc Kim Cương 1 – (2, 3, 4) – (5+)** khi kết hợp Số từ với Danh từ và Tính từ ở Cách 1.\nPhân biệt chính xác dạng thức nam/trung (`два`) và dạng thức nữ (`две`).\nLàm chủ Số từ tập hợp (`двое, трое...`), Phân số và Số thứ tự.\nHiểu quy luật biến cách đồng bộ của cụm Số từ ở các cách gián tiếp.",
    "content_md": "# BÀI 25: SỐ TỪ & QUY TẮC KẾT HỢP \"KIM CƯƠNG\" VỚI DANH TỪ\n## (Имена числительные: Сочетание с существительными и склонение)\n\n> **Mục tiêu bài học:**\n> - Nắm vững **Quy tắc Kim Cương 1 – (2, 3, 4) – (5+)** khi kết hợp Số từ với Danh từ và Tính từ ở Cách 1.\n> - Phân biệt chính xác dạng thức nam/trung (`два`) và dạng thức nữ (`две`).\n> - Làm chủ Số từ tập hợp (`двое, трое...`), Phân số và Số thứ tự.\n> - Hiểu quy luật biến cách đồng bộ của cụm Số từ ở các cách gián tiếp.\n\n---\n\n## 1. QUY TẮC \"KIM CƯƠNG\" KẾT HỢP SỐ TỪ - DANH TỪ (Ở CÁCH 1)\n\nKhi đứng ở Cách 1 (hoặc Cách 4 bất động vật), số lượng quyết định tuyệt đối đuôi của danh từ và tính từ theo bảng sau:\n\n```mermaid\nflowchart TD\n    N[\"KẾT HỢP SỐ TỪ - DANH TỪ (Ở CÁCH 1)\"]\n    N --> G1[\"1. Đuôi tận cùng là 1\\n(один, 21, 31... trừ 11)\\n+ DANH TỪ CÁCH 1 SỐ ÍT\\n+ TÍNH TỪ CÁCH 1 SỐ ÍT\\nVí dụ: один новый стол, 21 книга\"]\n    N --> G2[\"2. Đuôi tận cùng là 2, 3, 4\\n(два/две, три, четыре, 22... trừ 12-14)\\n+ DANH TỪ CÁCH 2 SỐ ÍT\\n+ Tính từ: C2 số nhiều (đực/trung), C1 số nhiều (cái)\\nVí dụ: два новых стола, две новые книги\"]\n    N --> G3[\"3. Đuôi 5 - 20, đuôi tròn chục 0, много, мало\\n(пять, десять, 25, 30...)\\n+ DANH TỪ CÁCH 2 SỐ NHIỀU\\n+ TÍNH TỪ CÁCH 2 SỐ NHIỀU\\nVí dụ: пять новых столов, много интересных книг\"]\n```\n\n### Bảng tổng hợp đối chiếu chi tiết:\n\n| Nhóm số từ | Quy tắc Danh từ | Quy tắc Tính từ | Ví dụ minh họa thực tế |\n| :--- | :--- | :--- | :--- |\n| **Đuôi là 1**<br>*(1, 21, 31, 101...)*<br>*(trừ 11!)* | **Cách 1 Số ít** | **Cách 1 Số ít** | - *один новый студент*<br>- *одна интересная книга*<br>- *двадцать одно окно* |\n| **Đuôi là 2, 3, 4**<br>*(2, 3, 4, 22, 23, 24...)*<br>*(trừ 12, 13, 14!)* | **CÁCH 2 SỐ ÍT** | **Cách 2 Số nhiều** *(Đực/Trung)*<br>**Cách 1 Số nhiều** *(Cái)* | - *два нов**ых** стол**а***<br>- *три больш**их** окн**а***<br>- *две нов**ые** книг**и***<br>- *четыре красив**ые** девушк**и*** |\n| **Đuôi 5 đến 20**<br>**Các số tròn chục (10, 20, 30...)**<br>**много, мало, сколько** | **CÁCH 2 SỐ NHIỀU** | **Cách 2 Số nhiều** | - *пять нов**ых** стол**ов***<br>- *десять интересн**ых** книг*<br>- *много хорош**их** студент**ов***<br>- *сколько русск**их** город**ов***? |\n\n> [!WARNING]\n> **Chú ý đặc biệt về số 2:**\n> - Đi với giống đực & giống trung: dùng **ДВА** *(два стола, два окна)*.\n> - Đi với giống cái: bắt buộc dùng **ДВЕ** *(две книги, две сестры, две комнаты)*.\n> - Các số từ **11, 12, 13, 14** tận cùng bằng *-надцать*: luôn thuộc nhóm **5+** (đi với Cách 2 số nhiều!): *12 студентов, 14 книг*.\n\n---\n\n## 2. QUY LUẬT BIẾN CÁCH ĐỒNG BỘ Ở CÁC CÁCH GIÁN TIẾP\n\nKhi cả cụm số từ đứng ở các cách gián tiếp (sau giới từ hoặc làm tân ngữ bị động), **sự phân biệt 2, 3, 4 hay 5+ biến mất**. Toàn bộ cụm Số từ, Tính từ và Danh từ **đồng loạt hòa chung một Cách ở SỐ NHIỀU**:\n\n### Bảng biến cách của 2, 3, 4:\n| Cách | dva / dve (2) | tri (3) | chetyre (4) | Danh từ đi kèm (Luôn ở Cách đó - Số nhiều!) |\n| :---: | :--- | :--- | :--- | :--- |\n| **C1** | два / две | три | четыре | студента *(C2 số ít)* |\n| **C2** | двух | трёх | четырёх | новых студент**ов** *(C2 số nhiều)* |\n| **C3** | двум | трём | четырём | новым студент**ам** *(C3 số nhiều)* |\n| **C4** | - Bất động: два/две<br>- Động vật: двух | три<br>трёх | четыре<br>четырёх | стола<br>новых студент**ов** |\n| **C5** | двум**я́** | трем**я́** | четырьм**я́** | новыми студент**ами** *(C5 số nhiều)* |\n| **C6** | о двух | о трёх | о четырёх | о новых студент**ах** *(C6 số nhiều)* |\n\n- Ví dụ: *Я встретил в кафе **трёх новых друзей**.* (Tôi gặp 3 người bạn mới - Cách 4 động vật).\n- *Мы говорили **о двух интересных книгах**.* (Chúng tôi nói về 2 cuốn sách hay - Cách 6).\n\n---\n\n## 3. SỐ TỪ TẬP HỢP (СОБИРАТЕЛЬНЫЕ ЧИСЛИТЕЛЬНЫЕ)\n\nGồm: **двое** *(2)*, **трое** *(3)*, **четверо** *(4)*, **пятеро** *(5)*, **шестеро** *(6)*, **семеро** *(7)*.\nLuôn đi với danh từ ở **Cách 2 số nhiều**. Chỉ dùng trong 3 trường hợp:\n1. Danh từ chỉ **người nam** hoặc trẻ con: *двое студентов, трое мальчиков, четверо детей*.\n2. Danh từ chỉ **con non của động vật**: *трое щенков (3 chú cún con), пятеро котят*.\n3. Danh từ **chỉ có số nhiều (Pluralia tantum)**: *двое суток, трое часов (3 cái đồng hồ), двое ножниц, четверо очков*.\n\n---\n\n## 4. SỐ THỨ TỰ (ПОРЯДКОВЫЕ ЧИСЛИТЕЛЬНЫЕ)\n\n- Cấu tạo và biến đổi y hệt như một **Tính từ**:\n  - *первый* (thứ nhất), *второй* (thứ hai), *третий, третья, третье, третьи* (thứ ba), *четвёртый*... *десятый*... *сотый*.\n- Trong số thứ tự ghép (nhiều chữ số), **chỉ có TỪ CUỐI CÙNG mới biến đổi**:\n  - *в двадцать перв**ом** веке* (trong thế kỷ 21 - chỉ biến đổi *первый* sang C6).\n  - *в тысяча девятьсот девяносто пя́т**ом** году* (năm 1995).\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Viết dạng đúng của cụm từ trong ngoặc:\n   - a) В аудитории сидят 21 (новый студент).\n   - b) На столе лежат 3 (русская книга).\n   - c) В гараже стоят 4 (большой автобус).\n   - d) На полке стоит 5 (толстый словарь).\n   - e) В нашей группе 12 (иностранная студентка).\n2. Chọn số từ thích hợp (`два / две / двое`):\n   - a) У меня есть _____ сестры.\n   - b) В комнату вошли _____ мужчин.\n   - c) Мы купили _____ часов.\n\n### Đáp án & Lời giải:\n1. Kết hợp số từ - danh từ:\n   - a) 21 **новый студент** *(đuôi 1 $\\rightarrow$ C1 số ít)*.\n   - b) 3 **русские книги** *(đuôi 3 $\\rightarrow$ danh từ C2 số ít книги; tính từ giống cái C1 số nhiều)*.\n   - c) 4 **больших автобуса** *(đuôi 4 $\\rightarrow$ danh từ C2 số ít автобуса; tính từ giống đực C2 số nhiều)*.\n   - d) 5 **толстых словарей** *(đuôi 5 $\\rightarrow$ C2 số nhiều)*.\n   - e) 12 **иностранных студенток** *(đuôi 12 $\\rightarrow$ C2 số nhiều)*.\n2. Chọn số từ:\n   - a) **две** сестры *(chị em gái là giống cái)*.\n   - b) **двое** мужчин *(người nam $\\rightarrow$ dùng số từ tập hợp двое)*.\n   - c) **двое** часов *(часы là danh từ chỉ có số nhiều $\\rightarrow$ dùng двое)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 25,
    "is_pro_only": true
  },
  {
    "id": "bai_26",
    "code": "bai_26",
    "title": "BÀI 26: TRẠNG TỪ & TỪ CHỈ TRẠNG THÁI TRONG CÂU VÔ NHÂN XƯNG",
    "level": "B1",
    "category": "Trạng từ & Hư từ",
    "topic": "Trạng từ & Hư từ",
    "vi": "BÀI 26: TRẠNG TỪ & TỪ CHỈ TRẠNG THÁI TRONG CÂU VÔ NHÂN XƯNG",
    "summary": "Nắm vững cách thành lập và phân loại **Trạng từ (Наречие)**.\nPhân biệt bản chất giữa **Trạng từ** (bổ nghĩa cho động từ) và **Từ chỉ trạng thái (Категория состояния)** (làm vị ngữ độc lập trong câu vô nhân xưng).\nLàm chủ cấu trúc câu vô nhân xưng diễn tả thời tiết, tâm lý và cảm xúc: `Кому (Cách 3) + trạng thái`.\nNắm trọn cách sử dụng nhóm từ tình thái: `надо, нужно, можно, нельзя, пора, лень`.",
    "content_md": "# BÀI 26: TRẠNG TỪ & TỪ CHỈ TRẠNG THÁI TRONG CÂU VÔ NHÂN XƯNG\n## (Наречие и слова категории состояния: Разграничение и функционирование)\n\n> **Mục tiêu bài học:**\n> - Nắm vững cách thành lập và phân loại **Trạng từ (Наречие)**.\n> - Phân biệt bản chất giữa **Trạng từ** (bổ nghĩa cho động từ) và **Từ chỉ trạng thái (Категория состояния)** (làm vị ngữ độc lập trong câu vô nhân xưng).\n> - Làm chủ cấu trúc câu vô nhân xưng diễn tả thời tiết, tâm lý và cảm xúc: `Кому (Cách 3) + trạng thái`.\n> - Nắm trọn cách sử dụng nhóm từ tình thái: `надо, нужно, можно, нельзя, пора, лень`.\n\n---\n\n## 1. TRẠNG TỪ TRONG TIẾNG NGA (НАРЕЧИЕ)\n\nTrạng từ là từ **BẤT BIẾN** (không biến đổi hình thái), dùng để bổ nghĩa cho động từ, tính từ hoặc một trạng từ khác:\n\n### 1.1. Các nhóm ý nghĩa cơ bản:\n- **Chỉ cách thức hành động (Как?):** *хорошо* (tốt), *быстро* (nhanh), *аккуратно* (cẩn thận), *по-русски* (bằng tiếng Nga).\n- **Chỉ thời gian (Когда?):** *сегодня* (hôm nay), *вчера* (hôm qua), *завтра* (ngày mai), *утром* (buổi sáng), *всегда* (luôn luôn).\n- **Chỉ nơi chốn (Где? Куда? Откуда?):** *здесь* (ở đây), *там* (ở đó), *дома* (ở nhà), *вперёд* (về phía trước), *оттуда* (từ đó).\n- **Chỉ mức độ (Сколько? Насколько?):** *очень* (rất), *много* (nhiều), *мало* (ít), *слишком* (quá mức), *совсем* (hoàn toàn).\n\n### 1.2. Cách tạo trạng từ từ Tính từ:\n- Thêm hậu tố **-О / -Е** vào thân từ tính từ:\n  - *красивый $\\rightarrow$ красив**о***\n  - *быстрый $\\rightarrow$ быстр**о***\n  - *хороший $\\rightarrow$ хорош**о́***\n- Tiền tố **ПО-** + tiếp tố **-СКИ / -ОМУ / -ЕМУ**:\n  - *русский $\\rightarrow$ **по-русски*** *(nói theo kiểu Nga)*\n  - *мой $\\rightarrow$ **по-моему*** *(theo ý kiến tôi)*\n  - *новый $\\rightarrow$ **по-новому*** *(theo phong cách mới)*\n\n---\n\n## 2. PHÂN BIỆT BẢN CHẤT: TRẠNG TỪ VS TỪ CHỈ TRẠNG THÁI\n\nĐây là một phát kiến học thuật vĩ đại của ngôn ngữ học Nga (GS. V.V. Vinogradov) được GS. Vũ Đình Vị trình bày cực kỳ sâu sắc:\n\n| Tiêu chí so sánh | TRẠNG TỪ (НАРЕЧИЕ) | TỪ CHỈ TRẠNG THÁI (КАТЕГОРИЯ СОСТОЯНИЯ) |\n| :--- | :--- | :--- |\n| **Vai trò cú pháp** | Chỉ là **thành phần phụ (Trạng ngữ)**, luôn đi theo bổ nghĩa cho một Động từ | **TỰ MÌNH LÀM VỊ NGỮ CHÍNH** trong câu vô nhân xưng (câu không có chủ ngữ)! |\n| **Cấu trúc câu** | Câu có Chủ ngữ + Vị ngữ động từ + Trạng từ:<br>$\\rightarrow$ *Анна **красиво поёт**.* (Anna hát hay). | Câu vô nhân xưng:<br>$\\rightarrow$ *Здесь **красиво**.* (Ở đây thật đẹp). |\n| **Chức năng** | Miêu tả cách thức của một hành vi | Miêu tả **trạng thái thời tiết, môi trường hoặc tâm lý con người** |\n\n---\n\n## 3. CÁC NHÓM TỪ CHỈ TRẠNG THÁI TRONG CÂU VÔ NHÂN XƯNG\n\n```mermaid\nmindmap\n  root((TỪ CHỈ TRẠNG THÁI))\n    1. Môi trường & Thời tiết\n      холодно, тепло, жарко\n      темно, светло, ветрено\n    2. Tâm lý & Thể chất con người\n      Кому (C3) + холодно\n      Мне скучно, весело, грустно\n      Студенту трудно, легко\n    3. Tình thái & Nhu cầu\n      нужно, надо (cần)\n      можно (được phép)\n      нельзя (cấm)\n    4. Đánh giá thời gian & Cảm xúc\n      пора (đã đến lúc)\n      жаль (tiếc nuối)\n      лень (lười biếng)\n```\n\n### 3.1. Trạng thái tự nhiên, thời tiết:\n- *На улице **холодно**.* (Ngoài trời lạnh).\n- *Летом в Ханое очень **жарко**.* (Mùa hè ở Hà Nội rất nóng).\n- *В комнате **тихо** и **уютно**.* (Trong phòng yên tĩnh và ấm cúng).\n\n### 3.2. Trạng thái thể chất, tâm lý con người:\n$$\\textbf{Chủ thể trải nghiệm (Cách 3)} + \\textbf{Từ chỉ trạng thái}$$\n- **Мне холодно.** *(Tôi thấy lạnh).*\n- **Ему скучно.** *(Anh ấy thấy buồn chán).*\n- **Студентам было трудно** сдавать экзамен. *(Các sinh viên cảm thấy khó khăn khi thi).*\n- **Мне лень** делать зарядку. *(Tôi lười tập thể dục quá).*\n- **Нам пора** идти домой. *(Đã đến lúc chúng tôi phải về nhà rồi).*\n\n### 3.3. Nhóm từ tình thái: МОЖНО, НЕЛЬЗЯ, НАДО, НУЖНО\n- **можно** *(có thể, được phép)*:\n  - *Здесь **можно курить**?* (Ở đây có được hút thuốc không?).\n- **нельзя** *(cấm, không được phép)*:\n  - *Здесь **нельзя фотографировать**!* (Ở đây cấm chụp ảnh!).\n- **надо / нужно** *(cần phải làm gì)*:\n  - *Мне **нужно повторить** грамматику.* (Tôi cần ôn lại ngữ pháp).\n\n### 3.4. Biểu hiện ở Thì Quá khứ và Tương lai:\nTừ chỉ trạng thái luôn đi kèm động từ liên kết **быть** ở thể trung tính:\n\n| Thời | Công thức | Ví dụ minh họa |\n| :--- | :--- | :--- |\n| **Hiện tại** | Trực tiếp từ trạng thái | *Сегодня **холодно**.* / *Мне **нужно** идти.* |\n| **Quá khứ** | Trạng thái + **БЫЛО** | *Вчера **было холодно**.* / *Мне **нужно было** идти.* |\n| **Tương lai** | Trạng thái + **БУДЕТ** | *Завтра **будет тепло**.* / *Мне **нужно будет** идти.* |\n\n---\n\n## 4. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Phân biệt từ in đậm là *Trạng từ (Наречие)* hay *Từ chỉ trạng thái (Категория состояния)*:\n   - a) Мой брат говорит по-русски **хорошо**.\n   - b) Сегодня на улице очень **хорошо**.\n   - c) В аудитории стало **тихо**.\n   - d) Он **тихо** вошёл в комнату.\n2. Dịch các câu sau sang tiếng Nga dùng câu vô nhân xưng:\n   - a) Hôm qua trời rất nóng.\n   - b) Tôi thấy buồn chán.\n   - c) Đã đến lúc chúng ta phải xuất phát rồi.\n   - d) Ở đây không được phép nói to.\n\n### Đáp án & Lời giải:\n1. Phân loại:\n   - a) **Trạng từ** *(bổ nghĩa cho động từ говорить)*.\n   - b) **Từ chỉ trạng thái** *(làm vị ngữ chỉ thời tiết trong câu vô nhân xưng)*.\n   - c) **Từ chỉ trạng thái** *(vị ngữ chỉ không gian)*.\n   - d) **Trạng từ** *(bổ nghĩa cho hành vi вошёл)*.\n2. Dịch câu:\n   - a) Вчера **было очень жарко**.\n   - b) **Мне скучно**.\n   - c) **Нам пора** отправляться.\n   - d) Здесь **нельзя громко разговаривать**.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 26,
    "is_pro_only": true
  },
  {
    "id": "bai_27",
    "code": "bai_27",
    "title": "BÀI 27: TOÀN THƯ GIỚI TỪ, LIÊN TỪ & TIỂU TỪ SẮC THÁI",
    "level": "B1",
    "category": "Trạng từ & Hư từ",
    "topic": "Trạng từ & Hư từ",
    "vi": "BÀI 27: TOÀN THƯ GIỚI TỪ, LIÊN TỪ & TIỂU TỪ SẮC THÁI",
    "summary": "Sở hữu **Bảng tra cứu toàn diện toàn bộ Giới từ** theo từng cách (từ Cách 2 đến Cách 6).\nLàm chủ các giới từ \"đa năng\" đi với 2 hoặc 3 cách (*в, на, под, за, с*).\nPhân biệt chính xác giữa hai liên từ đối lập kinh điển: **“А”** *(còn / phân đối chiếu)* vs **“НО”** *(nhưng / mâu thuẫn)*.\nSử dụng tinh tế các tiểu từ sắc thái người Nga dùng hàng ngày: *ли, же, ведь, даже, именно*.",
    "content_md": "# BÀI 27: TOÀN THƯ GIỚI TỪ, LIÊN TỪ & TIỂU TỪ SẮC THÁI\n## (Предлоги, союзы и частицы в русском языке)\n\n> **Mục tiêu bài học:**\n> - Sở hữu **Bảng tra cứu toàn diện toàn bộ Giới từ** theo từng cách (từ Cách 2 đến Cách 6).\n> - Làm chủ các giới từ \"đa năng\" đi với 2 hoặc 3 cách (*в, на, под, за, с*).\n> - Phân biệt chính xác giữa hai liên từ đối lập kinh điển: **“А”** *(còn / phân đối chiếu)* vs **“НО”** *(nhưng / mâu thuẫn)*.\n> - Sử dụng tinh tế các tiểu từ sắc thái người Nga dùng hàng ngày: *ли, же, ведь, даже, именно*.\n\n---\n\n## 1. TOÀN THƯ GIỚI TỪ THEO HỆ THỐNG CÁCH\n\nGiới từ là hư từ đóng vai trò \"người cầm lái\" quyết định danh từ đi sau nó phải chia ở cách nào:\n\n```mermaid\nmindmap\n  root((GIỚI TỪ TIẾNG NGA))\n    Đi với CÁCH 2\n      из, с, от (từ đâu/ai)\n      у (ở chỗ)\n      для (dành cho)\n      после, до (thời gian)\n      без (không có)\n      около, возле, вокруг (gần/quanh)\n    Đi với CÁCH 3\n      к / ко (tiến lại gần)\n      по (dọc theo, môn học)\n      благодаря (nhờ có)\n    Đi với CÁCH 4\n      в, на (đi đến đâu - Куда)\n      через (băng qua)\n      за, под (vào sau/dưới)\n      про (về)\n    Đi với CÁCH 5\n      с / со (cùng với ai/gì)\n      над (ở phía trên)\n      под (ở phía dưới)\n      перед (ở phía trước)\n      за (ở phía sau)\n      между (ở giữa)\n    Đi với CÁCH 6\n      в, на (ở đâu - Где)\n      о / об / обо (về ai/gì)\n      при (dưới thời, bên cạnh)\n```\n\n---\n\n## 2. MA TRẬN CÁC GIỚI TỪ ĐA NĂNG (ĐI VỚI NHIỀU CÁCH)\n\nMột số giới từ có thể đi với 2 hoặc 3 cách tùy thuộc vào ý nghĩa và câu hỏi:\n\n### 2.1. Cặp giới từ “В” và “НА”:\n- Đi với **Cách 4** $\\rightarrow$ Trả lời câu hỏi **Куда? (Đi đâu - Trạng thái động)**:\n  - *Я иду в школу / на стадион.*\n- Đi với **Cách 6** $\\rightarrow$ Trả lời câu hỏi **Где? (Ở đâu - Trạng thái tĩnh)**:\n  - *Я учусь в школе / на стадионе.*\n\n### 2.2. Cặp giới từ “ПОД” (Dưới) và “ЗА” (Sau):\n- Đi với **Cách 4** $\\rightarrow$ Trả lời câu hỏi **Куда? (Đặt/Chui vào đâu)**:\n  - *Кот побежал **под диван**.* (Mèo chạy chui vào gầm ghế).\n  - *Солнце садится **за горизонт**.* (Mặt trời lặn xuống sau đường chân trời).\n- Đi với **Cách 5** $\\rightarrow$ Trả lời câu hỏi **Где? (Nằm ở đâu)**:\n  - *Кот спит **под диваном**.* (Mèo đang nằm ngủ dưới gầm ghế).\n  - *Деревня находится **за лесом**.* (Ngôi làng nằm ở phía sau khu rừng).\n\n### 2.3. Giới từ “С / СО”:\n- Đi với **Cách 2** $\\rightarrow$ Trả lời câu hỏi **Откуда? (Từ đâu về)**:\n  - *Антон вернулся **с работы**.* (Anton đi làm về).\n- Đi với **Cách 5** $\\rightarrow$ Trả lời câu hỏi **С кем? С чем? (Cùng với ai/cái gì)**:\n  - *Антон гуляет **с сестрой**.* (Anton đi dạo cùng em gái).\n\n---\n\n## 3. LIÊN TỪ TIẾNG NGA (СОЮЗЫ)\n\n### 3.1. Phân biệt đối lập: Liên từ “А” vs “НО”\n\n> [!IMPORTANT]\n> - **Liên từ “А” (Còn / Mà):** Dùng để **so sánh, đối chiếu** giữa 2 sự vật, hiện tượng độc lập (không có sự mâu thuẫn, triệt tiêu lẫn nhau):\n>   - *Я студент, **а** мой брат — школьник.* (Tôi là sinh viên, còn em trai tôi là học sinh).\n>   - *Здесь тепло, **а** на улице холодно.* (Ở đây thì ấm, còn ngoài trời thì lạnh).\n> - **Liên từ “НО” (Nhưng):** Dùng để diễn tả sự **mâu thuẫn, nghịch lý, cản trở**:\n>   - *Он много занимался, **но** не сдал экзамен.* (Anh ấy học rất nhiều, nhưng vẫn không đỗ kỳ thi).\n>   - *Квартира маленькая, **но** уютная.* (Căn hộ nhỏ nhưng ấm cúng).\n\n### 3.2. Nhóm liên từ phụ thuộc thông dụng:\n- **Nguyên nhân:** *потому что* (bởi vì), *так как* (vì / do chỗ - hay đứng đầu câu).\n- **Mục đích:** *чтобы* (để - sau để nếu cùng chủ ngữ dùng động từ nguyên thể: *Я приехал в Москву, чтобы учиться*).\n- **Điều kiện:** *если* (nếu), *если бы* (nếu như - giả định).\n- **Nhượng bộ:** *хотя* (mặc dù), *несмотря на то что* (bất chấp việc).\n- **Hệ quả:** *поэтому* (cho nên, vì vậy).\n\n---\n\n## 4. TIỂU TỪ SẮC THÁI (ЧАСТИЦЫ)\n\nTiểu từ mang lại linh hồn, cảm xúc và ngữ điệu tự nhiên cho tiếng Nga:\n\n1. **Tiểu từ nghi vấn “ЛИ” (Liệu... có hay không):**\n   - Đứng ngay sau từ mang trọng tâm câu hỏi:\n   - *Знаешь **ли** ты эту песню?* (Liệu bạn có biết bài hát này không?).\n   - *Интересно, придёт **ли** он сегодня.* (Không biết liệu hôm nay anh ấy có đến không).\n2. **Tiểu từ nhấn mạnh “ЖЕ” (Nào, chứ, vậy):**\n   - *Что **же** ты молчишь?* (Sao bạn lại im lặng thế nào?).\n   - *Где **же** ты был?* (Rốt cuộc là bạn đã ở đâu vậy?).\n3. **Tiểu từ “ВЕДЬ” (Chẳng phải là... sao / Rõ ràng là):**\n   - Dùng khi nhắc nhở một chân lý người nghe đã biết:\n   - *Пойдём пешком, **ведь** погода прекрасная!* (Đi bộ thôi, chẳng phải thời tiết đang rất tuyệt sao!).\n4. **Tiểu từ “ДАЖЕ” (Ngay cả, thậm chí):**\n   - *Об этом знают **даже** дети.* (Chuyện này thậm chí trẻ con cũng biết).\n5. **Tiểu từ “ИМЕННО” (Chính là):**\n   - *Я искал **именно** эту книгу.* (Tôi tìm chính là cuốn sách này).\n\n---\n\n## 5. BÀI TẬP CỦNG CỐ\n\n### Đề bài:\n1. Điền liên từ thích hợp (`а` hoặc `но`):\n   - a) Я хочу купить этот телефон, _____ у меня сейчас нет денег.\n   - b) Мой отец врач, _____ мама учительница.\n   - c) На улице шёл сильный дождь, _____ мы всё равно пошли гулять.\n2. Chọn cách đúng cho từ trong ngoặc (chú ý phân biệt giới từ):\n   - a) Мы сидим под (высокое дерево - C4 hay C5?).\n   - b) Мяч закатился под (диван - C4 hay C5?).\n   - c) Поезд прибыл из (Москва - Cách mấy?).\n   - d) Мы шли по (красивый проспект - Cách mấy?).\n\n### Đáp án & Lời giải:\n1. Điền `а` vs `но`:\n   - a) **но** *(mâu thuẫn: muốn mua nhưng kẹt tiền)*.\n   - b) **а** *(đối chiếu nghề nghiệp bố và mẹ)*.\n   - c) **но** *(nghịch lý: mưa to nhưng vẫn đi)*.\n2. Chia cách theo giới từ:\n   - a) под **высоким деревом** *(Где? - Cách 5)*.\n   - b) под **диван** *(Куда? - Cách 4)*.\n   - c) из **Москвы** *(Откуда? - Cách 2)*.\n   - d) по **красивому проспекту** *(Где? dọc theo - Cách 3)*.\n",
    "rules": [],
    "table_data": {},
    "questions": [],
    "order_index": 27,
    "is_pro_only": true
  }
];

  // 2. KHỞI TẠO BỘ NHỚ BIẾN TOÀN CỤC CHO CÁC MODULE LỚN
  let _VOCAB_JARS = [];
  let _VOCABULARIES = [];
  let _TOPIC_ARTICLES = {};
  let _SPEAKING_SETS = [];
  let _TRKI_BANK = [];
  let _TRKI_QUESTION_BANK = [];

  // Khai báo sẵn biến toàn cục trên window để tương thích 100% với code cũ
  if (typeof window !== 'undefined') {
    window.PACKAGES = PACKAGES;
    window.SHOP_PRODUCTS = SHOP_PRODUCTS;
    window.BLOG_POSTS = BLOG_POSTS;
    window.WRITING_TOPICS = WRITING_TOPICS;
    window.WRITING_TASKS = WRITING_TASKS;
    window.LISTENING_LESSONS = LISTENING_LESSONS;
    window.VOCAB_LESSONS = VOCAB_LESSONS;
    window.GRAMMAR_LESSONS = GRAMMAR_LESSONS;

    window.VOCAB_JARS = _VOCAB_JARS;
    window.VOCABULARIES = _VOCABULARIES;
    window.TOPIC_ARTICLES = _TOPIC_ARTICLES;
    window.SPEAKING_SETS = _SPEAKING_SETS;
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
  const DATA_VERSION = 'v11.1';

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
    TOPIC_ARTICLES: { file: 'data/modules/topic_articles.json', assign: (d) => { _TOPIC_ARTICLES = d; window.TOPIC_ARTICLES = d; } },
    SPEAKING_SETS: { file: 'data/modules/speaking_sets.json', assign: (d) => { _SPEAKING_SETS = d; window.SPEAKING_SETS = d; } },
    TRKI_BANK: { file: 'data/modules/trki_bank.json', assign: (d) => { _TRKI_BANK = d; window.TRKI_BANK = d; } },
    TRKI_QUESTION_BANK: { file: 'data/modules/trki_questions.json', assign: (d) => { _TRKI_QUESTION_BANK = d; window.TRKI_QUESTION_BANK = d; } }
  };

  const _loadingPromises = {};

  // Kiểm tra xem dữ liệu có giá trị hợp lệ không (hỗ trợ cả mảng Array lẫn Object)
  function hasValidData(d) {
    if (!d) return false;
    if (Array.isArray(d)) return d.length > 0;
    if (typeof d === 'object') return Object.keys(d).length > 0;
    return false;
  }

  // 5. TRÌNH NẠP DỮ LIỆU THÔNG MINH (RUSI DATA LOADER)
  const RusiDataLoader = {
    version: DATA_VERSION,

    // Kiểm tra xem module đã có trong bộ nhớ RAM chưa
    isLoaded(moduleKey) {
      if (typeof window === 'undefined') return false;
      return hasValidData(window[moduleKey]);
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

      _loadingPromises[moduleKey] = (async () => {
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
          function getAppRoot() {
            if (typeof window === 'undefined') return '';
            if (window.location.protocol === 'file:') return '';
            const path = window.location.pathname || '';
            if (path.startsWith('/rusitrki/')) return '/rusitrki/';
            const segs = path.replace(/^\//, '').split('/').filter(Boolean);
            if (segs.length <= 1) return '';
            return '/';
          }
          const res = await fetch(getAppRoot() + conf.file + '?v=' + DATA_VERSION);
          if (res.ok) {
            const data = await res.json();
            conf.assign(data);
            // Lưu vào IndexedDB cho các lần truy cập tiếp theo (Offline-first)
            saveToIDB(moduleKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[RusiDataLoader] Lỗi nạp module ' + moduleKey + ':', err);
        }
        return window[moduleKey] || (moduleKey === 'TOPIC_ARTICLES' ? {} : []);
      })();

      return _loadingPromises[moduleKey];
    },

    // Nạp song song nhiều module
    async loadMultiple(moduleKeys) {
      return Promise.all(moduleKeys.map((k) => this.load(k)));
    },

    // Tự động phân tích trang hiện tại và chuẩn bị trước đúng các module cần thiết
    async prepareForCurrentPage() {
      if (typeof window === 'undefined') return;
      const page = ((typeof document !== 'undefined' && document.body) ? (document.body.getAttribute('data-page') || '') : '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase();

      let targetModules = [];
      if (page === 'vocabulary' || path.includes('vocab')) {
        targetModules = ['VOCAB_JARS', 'TOPIC_ARTICLES'];
      } else if (page === 'mock-test' || path.includes('mock-test') || path.includes('trki') || path.includes('test')) {
        targetModules = ['TRKI_BANK', 'TRKI_QUESTION_BANK'];
      } else if (page === 'speaking' || path.includes('speak')) {
        targetModules = ['SPEAKING_SETS'];
      } else if (page === 'admin' || path.includes('admin') || path.includes('cms')) {
        // Trên trang admin: nạp các module phổ biến
        targetModules = ['VOCAB_JARS', 'TRKI_BANK', 'SPEAKING_SETS'];
      }

      if (targetModules.length > 0) {
        await this.loadMultiple(targetModules);
      }
    },

    // Tải trước ngầm các module còn lại trong thời gian CPU nhàn rỗi (requestIdleCallback)
    prefetchIdle() {
      if (typeof window === 'undefined') return;
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
      idle(() => {
        const remaining = Object.keys(MODULE_REGISTRY).filter((k) => !this.isLoaded(k));
        remaining.forEach((k, idx) => {
          setTimeout(() => {
            this.load(k).catch(() => {});
          }, idx * 1500);
        });
      });
    }
  };

  // Khởi động nạp tự động ngay khi tệp script được đọc
  if (typeof window !== 'undefined') {
    window.RusiDataLoader = RusiDataLoader;
    if (typeof globalThis !== "undefined") globalThis.RusiDataLoader = RusiDataLoader;

    // Đối tượng DATA tổng hợp bảo toàn backwards-compatibility
    window.DATA = {
      get vocabJars() { return window.VOCAB_JARS || []; },
      get vocabularies() { return window.VOCABULARIES || []; },
      get topicArticles() { return window.TOPIC_ARTICLES || {}; },
      get vocabLessons() { return window.VOCAB_LESSONS || VOCAB_LESSONS; },
      get listeningLessons() { return window.LISTENING_LESSONS || LISTENING_LESSONS; },
      get speakingSets() { return window.SPEAKING_SETS || []; },
      get writingTasks() { return window.WRITING_TASKS || WRITING_TASKS; },
      get writingTopics() { return window.WRITING_TOPICS || WRITING_TOPICS; },
      get trkiBank() { return window.TRKI_BANK || []; },
      get trkiQuestionBank() { return window.TRKI_QUESTION_BANK || []; },
      get shopProducts() { return window.SHOP_PRODUCTS || SHOP_PRODUCTS; },
      get packages() { return window.PACKAGES || PACKAGES; },
      get grammarLessons() { return window.GRAMMAR_LESSONS || GRAMMAR_LESSONS; },
      get blogPosts() { return window.BLOG_POSTS || BLOG_POSTS; }
    };

    // Tự động chuẩn bị dữ liệu cho trang hiện tại
    RusiDataLoader.prepareForCurrentPage().catch(() => {});
  }
})();
