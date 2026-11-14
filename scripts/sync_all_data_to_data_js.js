const fs = require('fs');

const backup = JSON.parse(fs.readFileSync('data/supabase-backup.json', 'utf8'));
let dataContent = fs.readFileSync('data.js', 'utf8');

console.log('Reading tables from backup...');

// 1. TRKI_BANK (trki_tests)
const trkiTests = (backup.tables.trki_tests || []).map(t => {
  const raw = t.raw_data || {};
  const parts = (Array.isArray(t.parts) && t.parts.length) ? t.parts : (raw.parts || t.sections || []);
  return {
    id: t.code || t.id,
    code: t.code || t.id,
    title: t.title,
    level: t.level || 'A1',
    level_name: t.level_name || ('Trình độ ' + (t.level || 'A1')),
    category: t.category || 'full',
    sub_test_type: t.sub_test_type || 'full',
    duration_min: t.duration_min || 45,
    pass_percent: t.pass_percent || 60,
    is_pro_only: Boolean(t.is_pro_only),
    is_published: Boolean(t.is_published !== false),
    parts: parts,
    raw_data: { ...raw, parts: parts }
  };
});
console.log('Formatted TRKI_BANK:', trkiTests.length);

// 2. GRAMMAR_LESSONS (grammar_lessons)
const grammarLessons = (backup.tables.grammar_lessons || []).map(g => {
  return {
    id: g.code || g.id,
    code: g.code || g.id,
    title: g.title,
    level: g.level || 'A1',
    category: g.category || 'case',
    topic: g.topic || 'Ngữ pháp cơ bản',
    vi: g.vi || '',
    summary: g.summary || g.vi || '',
    content_md: g.content_md || '',
    rules: Array.isArray(g.rules) ? g.rules : [],
    table_data: g.table_data || {},
    questions: Array.isArray(g.questions) ? g.questions : [],
    order_index: g.order_index || 0,
    is_pro_only: Boolean(g.is_pro_only)
  };
});
console.log('Formatted GRAMMAR_LESSONS:', grammarLessons.length);

// 3. LISTENING_LESSONS (listening_lessons)
const listeningLessons = (backup.tables.listening_lessons || []).map(l => {
  const raw = l.raw_data || {};
  const lines = (Array.isArray(l.lines) && l.lines.length) ? l.lines : (raw.lines || []);
  const questions = (Array.isArray(l.questions) && l.questions.length) ? l.questions : (raw.questions || []);
  const blanks = Array.isArray(raw.blanks) ? raw.blanks : [];
  const dictation = Array.isArray(raw.dictation) ? raw.dictation : [];
  const ytId = l.youtube_id || l.video_youtube_id || l.youtube_video_id || (raw.youtube_video_id || '');

  return {
    id: l.code || l.id,
    code: l.code || l.id,
    title: l.title,
    level: l.level || 'A1',
    level_name: l.level_name || ('Sơ cấp ' + (l.level || 'A1')),
    category: l.category || 'general',
    category_name: l.category_name || 'Luyện nghe hiểu',
    part_type: l.part_type || ('part' + (l.part_number || 1)),
    part_number: l.part_number || 1,
    youtube_id: ytId,
    video_youtube_id: ytId,
    audio_url: l.audio_url || '',
    duration_seconds: l.duration_seconds || 120,
    est_minutes: l.est_minutes || 12,
    transcript_ru: l.transcript_ru || '',
    translation_vi: l.translation_vi || '',
    is_pro_only: Boolean(l.is_pro_only),
    lines: lines,
    questions: questions,
    blanks: blanks,
    dictation: dictation,
    raw_data: { ...raw, lines: lines, questions: questions, blanks: blanks, dictation: dictation }
  };
});
console.log('Formatted LISTENING_LESSONS:', listeningLessons.length);

// 4. WRITING_TASKS (writing_tasks - Tả tranh)
const writingTasks = (backup.tables.writing_tasks || []).map(w => {
  const raw = w.raw_data || {};
  const words = (Array.isArray(w.suggested_words) && w.suggested_words.length) ? w.suggested_words : (raw.suggested_words || []);
  const tips = (Array.isArray(w.tips) && w.tips.length) ? w.tips : (raw.tips || []);
  const model = w.sample_essay || w.model_answer || (raw.model || '');

  return {
    id: w.code || w.id,
    code: w.code || w.id,
    title: w.title,
    level: w.level || 'A1',
    level_name: w.level_name || ('Sơ cấp ' + (w.level || 'A1')),
    category: w.category || 'picture',
    category_name: w.category_name || 'Tả tranh & Giới thiệu',
    prompt: w.prompt || w.prompt_text || '',
    prompt_text: w.prompt_text || w.prompt || '',
    image_url: w.image_url || '',
    min_words: w.min_words || 20,
    suggested_words: words,
    tips: tips,
    sample_essay: model,
    model_answer: model,
    is_pro_only: Boolean(w.is_pro_only),
    raw_data: { ...raw, suggested_words: words, tips: tips, model: model }
  };
});
console.log('Formatted WRITING_TASKS:', writingTasks.length);

// 5. WRITING_TOPICS (writing_topics - Viết tự do / thư / luận)
const writingTopics = (backup.tables.writing_topics || []).map(w => {
  const raw = w.raw_data || {};
  const words = (Array.isArray(w.suggested_words) && w.suggested_words.length) ? w.suggested_words : (raw.suggested_words || []);
  const tips = (Array.isArray(w.tips) && w.tips.length) ? w.tips : (raw.tips || []);
  const model = w.model_answer || (raw.model || '');

  return {
    id: w.code || w.id,
    code: w.code || w.id,
    title: w.title,
    level: w.level || 'A1',
    level_name: w.level_name || ('Sơ cấp ' + (w.level || 'A1')),
    category: w.category || 'essay',
    category_name: w.category_name || 'Chủ đề viết',
    prompt: w.prompt || '',
    vi: w.vi || '',
    min_words: w.min_words || 25,
    suggested_words: words,
    tips: tips,
    model_answer: model,
    image_url: w.image_url || '',
    icon: w.icon || '📝',
    sort_order: typeof w.sort_order === 'number' ? w.sort_order : 10,
    is_pro_only: Boolean(w.is_pro_only),
    raw_data: { ...raw, suggested_words: words, tips: tips, model: model }
  };
});
console.log('Formatted WRITING_TOPICS:', writingTopics.length);

// 6. SHOP_PRODUCTS (shop_products)
const shopProducts = (backup.tables.shop_products || []).map(p => {
  const price = p.price_vnd || p.price || (p.price_minor ? p.price_minor : 50000);
  return {
    id: p.code || p.id,
    code: p.code || p.id,
    name: p.name || p.title,
    title: p.title || p.name,
    category: p.category || 'sach',
    category_name: p.category_name || (p.category === 'banh_keo' ? 'Bánh kẹo Nga' : 'Giáo trình & Sách Nga'),
    price: price,
    price_vnd: price,
    original_price: p.original_price || 0,
    image_url: p.image_url || (Array.isArray(p.image_urls) ? p.image_urls[0] : ''),
    image: p.image_url || '',
    stock: typeof p.stock === 'number' ? p.stock : 50,
    badge: p.badge || '',
    description: p.description || '',
    status: p.status || 'in_stock'
  };
});
console.log('Formatted SHOP_PRODUCTS:', shopProducts.length);

// 7. PACKAGES (packages - Lấy theo chuẩn live web app.js)
const packages = [
  {
    id: "pro_6m",
    code: "pro_6m",
    badge: "6 THÁNG",
    name: "Gói Bứt Phá 6 Tháng",
    title: "Gói Bứt Phá 6 Tháng",
    desc: "Phù hợp cho học viên ôn thi cấp tốc chuẩn bị du học hoặc thi chứng chỉ ТЭУ/ТБУ.",
    description: "Phù hợp cho học viên ôn thi cấp tốc chuẩn bị du học hoặc thi chứng chỉ ТЭУ/ТБУ.",
    price: 299000,
    price_vnd: 299000,
    priceOld: 590000,
    price_old: 590000,
    duration_months: 6,
    duration_days: 180,
    is_lifetime: false,
    popular: false,
    is_popular: false,
    features: [
      "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1, A2",
      "Đáp án giải thích ngữ pháp chi tiết từng câu",
      "Luyện nghe 4 Part CEFR không giới hạn",
      "Tạo không giới hạn Lọ từ vựng cá nhân",
      "Phát hiện & sửa lỗi phát âm AI"
    ]
  },
  {
    id: "pro_1y",
    code: "pro_1y",
    badge: "1 NĂM",
    name: "Gói Chuyên Nghiệp 1 Năm",
    title: "Gói Chuyên Nghiệp 1 Năm",
    desc: "Lựa chọn hàng đầu cho sinh viên chuẩn bị sang Nga học dự bị và đại học.",
    description: "Lựa chọn hàng đầu cho sinh viên chuẩn bị sang Nga học dự bị và đại học.",
    price: 499000,
    price_vnd: 499000,
    priceOld: 990000,
    price_old: 990000,
    duration_months: 12,
    duration_days: 365,
    is_lifetime: false,
    popular: true,
    is_popular: true,
    features: [
      "Mở khóa TOÀN BỘ ngân hàng đề thi ТРКИ A1, A2, B1, B2",
      "Phân tích chuyên sâu đề thi & dự đoán điểm đỗ",
      "Chấm bài tự luận Viết (Письмо) có nhận xét của giảng viên",
      "Kho 100+ Lọ từ vựng chuyên ngành (Y khoa, Kỹ thuật, Kinh tế)",
      "Ưu tiên hỗ trợ hồ sơ học bổng Du học Nga",
      "Hỗ trợ 1-1 qua nhóm Zalo VIP"
    ]
  },
  {
    id: "pro_vip",
    code: "pro_vip",
    badge: "TRỌN ĐỜI",
    name: "Gói VIP Trọn Đời",
    title: "Gói VIP Trọn Đời",
    desc: "Đồng hành trọn vẹn suốt 4-6 năm học tập và sinh sống tại Liên bang Nga.",
    description: "Đồng hành trọn vẹn suốt 4-6 năm học tập và sinh sống tại Liên bang Nga.",
    price: 899000,
    price_vnd: 899000,
    priceOld: 1800000,
    price_old: 1800000,
    duration_months: null,
    duration_days: null,
    is_lifetime: true,
    popular: false,
    is_popular: false,
    features: [
      "Tất cả quyền lợi của gói 1 Năm vĩnh viễn",
      "Cập nhật miễn phí đề thi ТРКИ mới nhất mỗi năm",
      "Trợ lý AI Rusika sửa bài viết không giới hạn",
      "Tặng tài khoản thành viên VIP cộng đồng Du học Nga",
      "Bảo hành kích hoạt trọn đời tài khoản"
    ]
  }
];
console.log('Formatted PACKAGES:', packages.length);

// 8. VOCABULARIES (500 words)
const vocabularies = (backup.tables.vocabularies || []).map(v => {
  return {
    id: v.id,
    word_with_stress: v.word_with_stress || '',
    word_normalized: v.word_normalized || '',
    pos: v.pos || '',
    meaning_vi: v.meaning_vi || '',
    meaning_ru: v.meaning_ru || '',
    gender: v.gender || '',
    aspect: v.aspect || '',
    level: v.level || 'A1',
    transcription: v.transcription || '',
    audio_url: v.audio_url || '',
    examples: Array.isArray(v.examples) ? v.examples : [],
    collocations: v.collocations || {},
    topic_code: v.topic_code || '',
    sub_topic: v.sub_topic || ''
  };
});
console.log('Formatted VOCABULARIES:', vocabularies.length);

// INJECT INTO data.js
// Replace const TRKI_BANK = ...
dataContent = dataContent.replace(/const TRKI_BANK = \[[\s\S]*?\];(?=\r?\n)/, 'const TRKI_BANK = ' + JSON.stringify(trkiTests, null, 2) + ';');

// Replace const GRAMMAR_LESSONS = ...
dataContent = dataContent.replace(/const GRAMMAR_LESSONS = \[[\s\S]*?\];(?=\r?\n)/, 'const GRAMMAR_LESSONS = ' + JSON.stringify(grammarLessons, null, 2) + ';');

// Replace const LISTENING_LESSONS = ...
dataContent = dataContent.replace(/const LISTENING_LESSONS = \[[\s\S]*?\];(?=\r?\n)/, 'const LISTENING_LESSONS = ' + JSON.stringify(listeningLessons, null, 2) + ';');

// Replace const WRITING_TASKS = ...
dataContent = dataContent.replace(/const WRITING_TASKS = \[[\s\S]*?\];(?=\r?\n)/, 'const WRITING_TASKS = ' + JSON.stringify(writingTasks, null, 2) + ';\nconst WRITING_TOPICS = ' + JSON.stringify(writingTopics, null, 2) + ';');

// Replace const SHOP_PRODUCTS = ...
dataContent = dataContent.replace(/const SHOP_PRODUCTS = \[[\s\S]*?\];(?=\r?\n)/, 'const SHOP_PRODUCTS = ' + JSON.stringify(shopProducts, null, 2) + ';');

// Replace const PACKAGES = ...
dataContent = dataContent.replace(/const PACKAGES = \[[\s\S]*?\];(?=\r?\n)/, 'const PACKAGES = ' + JSON.stringify(packages, null, 2) + ';\nconst VOCABULARIES = ' + JSON.stringify(vocabularies, null, 2) + ';');

// Expose at window
const windowAssignRegex = /if \(typeof window !== "undefined"\) \{([\s\S]*?)\}/;
const winMatch = dataContent.match(windowAssignRegex);
if (winMatch) {
  let inner = winMatch[1];
  if (!inner.includes('window.VOCABULARIES')) {
    inner = inner.replace('window.VOCAB_LESSONS =', 'window.VOCABULARIES = typeof VOCABULARIES !== "undefined" ? VOCABULARIES : [];\n  window.WRITING_TOPICS = typeof WRITING_TOPICS !== "undefined" ? WRITING_TOPICS : [];\n  window.VOCAB_LESSONS =');
    inner = inner.replace('vocabJars: window.VOCAB_JARS,', 'vocabJars: window.VOCAB_JARS,\n    vocabularies: window.VOCABULARIES,\n    writingTopics: window.WRITING_TOPICS,');
    dataContent = dataContent.replace(windowAssignRegex, 'if (typeof window !== "undefined") {' + inner + '}');
  }
}

fs.writeFileSync('data.js', dataContent, 'utf8');
console.log('SUCCESS! Updated data.js with all 8 core collections!');
