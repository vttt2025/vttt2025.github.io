/**
 * scripts/sync-from-supabase.js
 * 
 * Kéo 100% dữ liệu thực từ Supabase Cloud PostgreSQL:
 * - vocab_jars + jar_items + vocabularies (10 lọ & 500 từ)
 * - topic_articles (10 bài chuyên đề)
 * - listening_lessons + listening_topics + listening_lesson_vocab (7 bài nghe)
 * - speaking_lessons (28 bài luyện nói)
 * - writing_tasks + writing_task_vocab (11 đề tả tranh)
 * - writing_topics (6 đề tự do)
 * - trki_tests (6 đề thi TRKI)
 * - shop_products (7 sản phẩm)
 * - packages (3 gói học PRO)
 * - grammar_lessons (5 bài ngữ pháp)
 * - blog_posts (3 bài cẩm nang)
 * 
 * Xoá sạch toàn bộ dữ liệu mock cũ và ghi lại data.js chuẩn xác 100%.
 */

const fs = require('fs');
const path = require('path');

// 1. Lấy thông tin URL & Key từ supabase-config.js
function getSupabaseConfig() {
  const configFile = path.join(__dirname, '..', 'supabase-config.js');
  const content = fs.readFileSync(configFile, 'utf8');
  const urlMatch = content.match(/url:\s*"([^"]+)"/);
  const keyMatch = content.match(/anonKey:\s*storedAnon\s*\|\|\s*"([^"]+)"/);

  if (!urlMatch || !keyMatch) {
    throw new Error('Không thể đọc cấu hình Supabase từ supabase-config.js');
  }

  return {
    url: urlMatch[1].replace(/\/+$/, ''),
    anonKey: keyMatch[1]
  };
}

async function api(config, queryPath) {
  const res = await fetch(`${config.url}/rest/v1/${queryPath}`, {
    headers: {
      'apikey': config.anonKey,
      'Authorization': `Bearer ${config.anonKey}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} [${queryPath}]: ${await res.text()}`);
  }
  return res.json();
}

function sanitizeWord(w) {
  if (!w) return null;
  const ex0 = (Array.isArray(w.examples) && w.examples[0]) ? w.examples[0] : null;
  const rawWord = w.word_normalized || (w.word_with_stress ? w.word_with_stress.replace(/[\u0300\u0301]/g, '') : '');
  const stressWord = w.word_with_stress || w.word_normalized || '';

  return {
    id: w.id,
    ru: rawWord,
    stress: stressWord,
    word_with_stress: stressWord,
    word_normalized: rawWord,
    vi: w.meaning_vi || '',
    meaning_vi: w.meaning_vi || '',
    pos: w.pos || '',
    gender: w.gender || '',
    aspect: w.aspect || '',
    level: w.level || 'A1',
    audio: w.audio_url || '',
    audio_url: w.audio_url || '',
    ex: ex0 ? (ex0.ru || '') : '',
    ex_vi: ex0 ? (ex0.vi || '') : '',
    examples: Array.isArray(w.examples) ? w.examples : [],
    ant: (Array.isArray(w.antonyms) && w.antonyms.length) ? w.antonyms.join(', ') : '',
    antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
    syn: (Array.isArray(w.synonyms) && w.synonyms.length) ? w.synonyms.join(', ') : '',
    synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
    structures: Array.isArray(w.structures) ? w.structures : [],
    notes: w.notes || ''
  };
}

async function main() {
  console.log('========================================================================');
  console.log('RUSI TRKI: KÉO DỮ LIỆU ĐỘC QUYỀN TỪ SUPABASE & XOÁ SẠCH DỮ LIỆU MOCK CŨ');
  console.log('========================================================================\n');

  const config = getSupabaseConfig();
  console.log(`Endpoint: ${config.url}`);

  // 1. Tải Lọ từ vựng kèm 500 từ vựng và bài đọc chủ đề
  process.stdout.write('1. Tải vocab_jars + jar_items + vocabularies + topic_articles... ');
  const rawJars = await api(config, 'vocab_jars?select=id,code,name,level,icon,word_count,is_system,is_pro,jar_items(position,vocabularies(*))&is_system=eq.true&order=created_at.asc');
  const rawArticles = await api(config, 'topic_articles?select=*');

  const articlesMap = {};
  rawArticles.forEach(a => {
    articlesMap[a.id] = a;
  });

  const formattedJars = rawJars.map(row => {
    const jarCode = row.code || row.id;
    const art = articlesMap[jarCode] || articlesMap[row.id] || null;
    const items = Array.isArray(row.jar_items) ? row.jar_items : [];
    items.sort((a, b) => (a.position || 0) - (b.position || 0));

    const words = items.map(it => sanitizeWord(it.vocabularies)).filter(Boolean);

    const article = art ? {
      id: art.id,
      title: art.title,
      level: art.level || row.level || 'A1',
      intro: art.intro || '',
      desc: art.intro || '',
      culturalTip: art.cultural_tip || '',
      cultural_tip: art.cultural_tip || '',
      audio_url: art.audio_url || '',
      actionChains: Array.isArray(art.action_chains) ? art.action_chains : [],
      action_chains: Array.isArray(art.action_chains) ? art.action_chains : [],
      dialogues: Array.isArray(art.dialogues) ? art.dialogues : [],
      grammarNotes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
      grammar_notes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
      content_md: art.content_md || ''
    } : null;

    return {
      id: jarCode,
      code: jarCode,
      uuid: row.id,
      name: row.name || jarCode,
      title: row.name || jarCode,
      level: row.level || 'A1',
      desc: (article && article.intro) || '',
      icon: row.icon || 'archive-jar',
      color: '#0039A6',
      word_count: words.length || row.word_count || 0,
      is_system: true,
      is_pro: Boolean(row.is_pro),
      words: words,
      article: article
    };
  });
  console.log(`✓ ${formattedJars.length} lọ (${formattedJars.reduce((a, c) => a + c.words.length, 0)} từ)`);

  const topicArticlesObj = {};
  formattedJars.forEach(j => {
    if (j.article) topicArticlesObj[j.code] = j.article;
  });

  // 2. Tải bài luyện nghe
  process.stdout.write('2. Tải listening_lessons... ');
  const rawListening = await api(config, 'listening_lessons?select=*,topic:listening_topics(*),vocab_items:listening_lesson_vocab(sort_order,line_index,vocab:vocabularies(*))&order=sort_order.asc');
  const formattedListening = rawListening.map(row => {
    const raw = row.raw_data || {};
    const t = row.topic || {};
    const linesList = (Array.isArray(row.lines) && row.lines.length) ? row.lines : (raw.lines || []);
    const questionsList = (Array.isArray(row.questions) && row.questions.length) ? row.questions : (raw.questions || []);
    const dictList = (raw.dictation && raw.dictation.length) ? raw.dictation : (Array.isArray(linesList) ? linesList.map(l => l.text_ru || l.ru || '').filter(Boolean) : []);
    const ytId = row.youtube_id || row.video_youtube_id || (raw.youtube_video_id || '');

    return {
      id: row.code || row.id,
      lesson_uuid: row.id,
      code: row.code || row.id,
      topic_id: row.topic_id,
      title: row.title,
      vi: row.vi || row.translation_vi || t.description || '',
      translation_vi: row.translation_vi || row.vi || '',
      transcript_ru: row.transcript_ru || '',
      level: row.level || t.level || 'A1',
      level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
      category: t.category || row.category || 'general',
      category_name: t.title || row.category_name || 'Luyện nghe hiểu',
      part_type: 'part' + (row.part_number || 1),
      part_number: row.part_number || 1,
      youtube_id: ytId,
      video_youtube_id: ytId,
      audio_url: row.audio_url || '',
      duration_seconds: row.duration_seconds || 120,
      est_minutes: row.est_minutes || 12,
      is_pro_only: Boolean(row.is_pro_only || t.is_pro_only),
      lines: linesList,
      questions: questionsList,
      dictation: dictList,
      blanks: raw.blanks || [],
      vocab_items: row.vocab_items || [],
      raw_data: raw
    };
  });
  console.log(`✓ ${formattedListening.length} bài`);

  // 3. Tải bài luyện nói
  process.stdout.write('3. Tải speaking_lessons... ');
  const rawSpeaking = await api(config, 'speaking_lessons?select=*&order=sort_order.asc');
  const formattedSpeaking = rawSpeaking.map(row => {
    const raw = row.raw_data || {};
    const sentencesList = Array.isArray(row.sentences) && row.sentences.length ? row.sentences : (Array.isArray(row.items) && row.items.length ? row.items : (raw.items || []));
    const ytId = row.youtube_id || raw.youtube_video_id || raw.youtubeId || (row.video_sample_url && row.video_sample_url.includes('youtube') ? (row.video_sample_url.match(/(?:embed\/|v=|watch\?v=)([a-zA-Z0-9_-]{11})/)||[])[1] : '');
    const ytUrl = row.youtube_url || (ytId ? ('https://www.youtube.com/watch?v=' + ytId) : '');
    const embedUrl = row.video_sample_url || (ytId ? ('https://www.youtube.com/embed/' + ytId + '?enablejsapi=1&rel=0&modestbranding=1&playsinline=1') : '');

    return {
      id: row.code || row.id,
      code: row.code || row.id,
      title: row.title,
      level: row.level || 'A1',
      level_name: row.level_name || (row.level === 'B2' ? 'Nâng cao B2' : row.level === 'B1' ? 'Trung cấp B1' : row.level === 'A2' ? 'Cơ bản A2' : 'Sơ cấp A1'),
      category: row.category || 'shadowing',
      category_name: row.category_name || 'Luyện nói Shadowing',
      description: row.description || '',
      phonemeTarget: row.phoneme_target || '',
      icon: row.icon || (ytId ? 'youtube' : 'mic-speaking'),
      is_pro_only: Boolean(row.is_pro_only),
      sentences: sentencesList,
      items: sentencesList,
      youtube_id: ytId,
      youtube_url: ytUrl,
      video_sample_url: embedUrl,
      start_sec: row.start_sec || 0,
      end_sec: row.end_sec || 0,
      sort_order: row.sort_order || 0,
      raw_data: raw
    };
  });
  console.log(`✓ ${formattedSpeaking.length} bài`);

  // 4. Tải đề luyện viết
  process.stdout.write('4. Tải writing_tasks + writing_topics... ');
  const rawWritingTasks = await api(config, 'writing_tasks?select=*,topic:writing_topics(*),vocab_items:writing_task_vocab(sort_order,vocab:vocabularies(*))&order=sort_order.asc');
  const rawWritingTopics = await api(config, 'writing_topics?select=*&order=sort_order.asc');

  const formattedWritingTasks = rawWritingTasks.map(row => {
    const raw = row.raw_data || {};
    let wordsList = [];
    if (Array.isArray(row.vocab_items) && row.vocab_items.length) {
      wordsList = row.vocab_items
        .filter(item => item && item.vocab)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map(item => {
          const v = item.vocab;
          return {
            id: v.id,
            ru: v.word_with_stress || v.word_normalized,
            word: v.word_with_stress || v.word_normalized,
            word_normalized: v.word_normalized,
            vi: v.meaning_vi || '',
            pos: v.pos || '',
            level: v.level || '',
            audio_url: v.audio_url || ''
          };
        });
    } else {
      wordsList = (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length)
        ? raw.suggested_words
        : (Array.isArray(row.suggested_words) ? row.suggested_words : []);
    }

    let tipsList = [];
    if (Array.isArray(row.tips) && row.tips.length) tipsList = row.tips;
    else if (typeof row.tips === 'string' && row.tips.trim()) {
      try { tipsList = JSON.parse(row.tips); } catch (_) { tipsList = [row.tips]; }
    }

    const topic = row.topic || {};
    const model = row.model_answer || row.sample_essay || raw.model || '';

    return {
      id: row.code || row.id,
      code: row.code || row.id,
      title: row.title,
      level: row.level || topic.level || 'A1',
      level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
      category: topic.category || row.category || 'picture',
      category_name: topic.title || topic.category_name || row.category_name || 'Tả tranh & Giới thiệu',
      prompt: row.prompt || row.prompt_text || '',
      prompt_text: row.prompt_text || row.prompt || '',
      image_url: row.image_url || '',
      min_words: row.min_words || 20,
      suggested_words: wordsList,
      tips: tipsList,
      sample_essay: model,
      model_answer: model,
      is_pro_only: Boolean(row.is_pro_only || topic.is_pro_only),
      raw_data: raw
    };
  });

  const formattedWritingTopics = rawWritingTopics.map(w => {
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
      raw_data: raw
    };
  });
  console.log(`✓ ${formattedWritingTasks.length} đề tả tranh, ${formattedWritingTopics.length} đề tự do`);

  // 5. Tải đề thi TRKI
  process.stdout.write('5. Tải trki_tests... ');
  const rawTests = await api(config, 'trki_tests?select=*&order=level.asc');
  const formattedTests = rawTests.map(t => {
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
      part1: t.part1 || raw.part1,
      part2: t.part2 || raw.part2,
      part3: t.part3 || raw.part3,
      raw_data: raw
    };
  });
  console.log(`✓ ${formattedTests.length} đề thi`);

  // 5b. Tải ngân hàng câu hỏi TRKI cốt lõi (trki_question_bank)
  process.stdout.write('5b. Tải trki_question_bank... ');
  const rawQuestionBank = await api(config, 'trki_question_bank?select=*&order=level.asc,sub_test.asc,order_index.asc');
  console.log(`✓ ${rawQuestionBank.length} câu hỏi`);

  // 6. Tải sản phẩm shop
  process.stdout.write('6. Tải shop_products... ');
  const rawShop = await api(config, 'shop_products?select=*&order=price.asc');
  const formattedShop = rawShop.map(p => {
    const price = p.price_vnd || p.price || 50000;
    return {
      id: p.code || p.id,
      code: p.code || p.id,
      name: p.name || p.title,
      title: p.title || p.name,
      category: p.category || 'sach',
      category_name: p.category_name || (p.category === 'banh_keo' ? 'Bánh kẹo Nga' : 'Giáo trình & Sách Nga'),
      price: Number(price),
      price_vnd: Number(price),
      original_price: p.original_price ? Number(p.original_price) : 0,
      image_url: p.image_url || p.image || '',
      image: p.image_url || p.image || '',
      stock: typeof p.stock === 'number' ? p.stock : 50,
      badge: p.badge || '',
      description: p.description || '',
      status: p.status || 'in_stock'
    };
  });
  console.log(`✓ ${formattedShop.length} sản phẩm`);

  // 7. Tải gói cước Packages
  process.stdout.write('7. Tải packages... ');
  const rawPackages = await api(config, 'packages?select=*&order=price.asc');
  const formattedPackages = rawPackages.map(pkg => ({
    id: pkg.code || pkg.id,
    code: pkg.code || pkg.id,
    badge: pkg.badge || (pkg.duration_days === 365 ? '1 NĂM' : pkg.duration_days === 180 ? '6 THÁNG' : 'TRỌN ĐỜI'),
    name: pkg.name || pkg.title,
    title: pkg.name || pkg.title,
    desc: pkg.description || '',
    description: pkg.description || '',
    price: Number(pkg.price_vnd || pkg.price),
    price_vnd: Number(pkg.price_vnd || pkg.price),
    priceOld: Number(pkg.price_old || (Number(pkg.price) * 2)),
    price_old: Number(pkg.price_old || (Number(pkg.price) * 2)),
    duration_months: pkg.duration_months,
    duration_days: pkg.duration_days,
    is_lifetime: Boolean(pkg.is_lifetime),
    popular: Boolean(pkg.is_popular),
    is_popular: Boolean(pkg.is_popular),
    features: Array.isArray(pkg.features) ? pkg.features : []
  }));
  console.log(`✓ ${formattedPackages.length} gói`);

  // 8. Tải bài ngữ pháp
  process.stdout.write('8. Tải grammar_lessons... ');
  const rawGrammar = await api(config, 'grammar_lessons?select=*&order=order_index.asc');
  const formattedGrammar = rawGrammar.map(g => ({
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
  }));
  console.log(`✓ ${formattedGrammar.length} bài`);

  // 9. Tải bài viết blog
  process.stdout.write('9. Tải blog_posts... ');
  const rawBlog = await api(config, 'blog_posts?select=*&order=created_at.desc');
  const formattedBlog = rawBlog.map(row => ({
    slug: row.slug || row.code || row.id,
    id: row.code || row.id,
    title: row.title,
    category: row.category,
    categoryName: row.category === 'du_hoc_trai_nghiem' ? 'Trải nghiệm du học & KTX' : (row.category === 'ngu_phap' ? 'Thành ngữ & Ngữ pháp Nga' : 'Cẩm nang du học'),
    cover: row.cover_url || 'assets/red-square.jpg',
    excerpt: row.summary || '',
    content: row.content_md || row.summary || '',
    date: row.published_at ? new Date(row.published_at).toLocaleDateString('vi-VN') : '',
    icon: 'book-open-blog',
    author: row.author || 'RUSI Editorial',
    readTime: '5 phút đọc'
  }));
  console.log(`✓ ${formattedBlog.length} bài`);

  // 10. Ghi backup JSON
  const backupData = {
    pulled_at: new Date().toISOString(),
    source_url: config.url,
    tables: {
      vocab_jars: formattedJars,
      topic_articles: rawArticles,
      listening_lessons: formattedListening,
      speaking_lessons: formattedSpeaking,
      writing_tasks: formattedWritingTasks,
      writing_topics: formattedWritingTopics,
      trki_tests: formattedTests,
      trki_question_bank: rawQuestionBank,
      shop_products: formattedShop,
      packages: formattedPackages,
      grammar_lessons: formattedGrammar,
      blog_posts: formattedBlog
    }
  };

  const backupPath = path.join(__dirname, '..', 'data', 'supabase-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
  console.log('\n✓ Đã lưu file backup sạch: data/supabase-backup.json');

  // 11. XÂY DỰNG FILE data.js HOÀN TOÀN MỚI — 100% SUPABASE, KHÔNG CHỨA DỮ LIỆU CŨ/MOCK
  const dataJsContent = `/**
 * ============================================================================
 * RUSI TRKI — CLIENT DATA BRIDGE (100% SUPABASE CLOUD SYNCHRONIZED)
 * Nguồn dữ liệu: Supabase PostgreSQL (${config.url})
 * Thời gian đồng bộ: ${new Date().toISOString()}
 * ============================================================================
 * Toàn bộ dữ liệu dưới đây được ánh xạ trực tiếp từ các bảng Supabase Cloud:
 * - VOCAB_JARS (${formattedJars.length} lọ & ${formattedJars.reduce((a, c) => a + c.words.length, 0)} từ vựng)
 * - TOPIC_ARTICLES (${Object.keys(topicArticlesObj).length} bài đọc chủ đề chuyên sâu)
 * - LISTENING_LESSONS (${formattedListening.length} bài luyện nghe CEFR)
 * - SPEAKING_SETS (${formattedSpeaking.length} bài luyện nói Shadowing)
 * - WRITING_TASKS (${formattedWritingTasks.length} đề viết tả tranh chuẩn TRKI)
 * - WRITING_TOPICS (${formattedWritingTopics.length} đề viết tự do / luận)
 * - TRKI_BANK (${formattedTests.length} đề thi thử TRKI A1 - B2)
 * - TRKI_QUESTION_BANK (${rawQuestionBank.length} câu hỏi TRKI cốt lõi A1 - B2)
 * - SHOP_PRODUCTS (${formattedShop.length} sản phẩm cửa hàng)
 * - PACKAGES (${formattedPackages.length} gói học viên Pro)
 * - GRAMMAR_LESSONS (${formattedGrammar.length} chuyên đề ngữ pháp)
 * - BLOG_POSTS (${formattedBlog.length} bài cẩm nang du học)
 * ============================================================================
 */

const VOCAB_JARS = ${JSON.stringify(formattedJars, null, 2)};

const TOPIC_ARTICLES = ${JSON.stringify(topicArticlesObj, null, 2)};

const LISTENING_LESSONS = ${JSON.stringify(formattedListening, null, 2)};

const SPEAKING_SETS = ${JSON.stringify(formattedSpeaking, null, 2)};

const WRITING_TASKS = ${JSON.stringify(formattedWritingTasks, null, 2)};

const WRITING_TOPICS = ${JSON.stringify(formattedWritingTopics, null, 2)};

const TRKI_BANK = ${JSON.stringify(formattedTests, null, 2)};

const TRKI_QUESTION_BANK = ${JSON.stringify(rawQuestionBank, null, 2)};

const SHOP_PRODUCTS = ${JSON.stringify(formattedShop, null, 2)};

const PACKAGES = ${JSON.stringify(formattedPackages, null, 2)};

const GRAMMAR_LESSONS = ${JSON.stringify(formattedGrammar, null, 2)};

const BLOG_POSTS = ${JSON.stringify(formattedBlog, null, 2)};

// Phơi bày ra phạm vi toàn cục window
if (typeof window !== "undefined") {
  window.VOCAB_JARS = VOCAB_JARS;
  window.TOPIC_ARTICLES = TOPIC_ARTICLES;
  window.LISTENING_LESSONS = LISTENING_LESSONS;
  window.SPEAKING_SETS = SPEAKING_SETS;
  window.WRITING_TASKS = WRITING_TASKS;
  window.WRITING_TOPICS = WRITING_TOPICS;
  window.TRKI_BANK = TRKI_BANK;
  window.TRKI_QUESTION_BANK = TRKI_QUESTION_BANK;
  window.SHOP_PRODUCTS = SHOP_PRODUCTS;
  window.PACKAGES = PACKAGES;
  window.GRAMMAR_LESSONS = GRAMMAR_LESSONS;
  window.BLOG_POSTS = BLOG_POSTS;

  window.DATA = {
    vocabJars: VOCAB_JARS,
    topicArticles: TOPIC_ARTICLES,
    listeningLessons: LISTENING_LESSONS,
    speakingSets: SPEAKING_SETS,
    writingTasks: WRITING_TASKS,
    writingTopics: WRITING_TOPICS,
    trkiBank: TRKI_BANK,
    trkiQuestionBank: TRKI_QUESTION_BANK,
    shopProducts: SHOP_PRODUCTS,
    packages: PACKAGES,
    grammarLessons: GRAMMAR_LESSONS,
    blogPosts: BLOG_POSTS
  };

  // Khai báo mảng rỗng an toàn cho các phân hệ cũ (tránh lỗi tham chiếu nếu có)
  window.VOCAB_LESSONS = [];
  window.WRITING_SUBMISSIONS = [];
  window.TRKI_SUBMISSIONS = [];
  window.SHOP_ORDERS = [];
}
`;

  const dataJsPath = path.join(__dirname, '..', 'data.js');
  fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');
  console.log(`✓ Đã tạo mới file data.js sạch (100% Supabase, đã loại bỏ toàn bộ dữ liệu mock cũ)!`);
  console.log('========================================================================\n');
}

main().catch(err => {
  console.error('\n✗ Lỗi thực thi:', err);
  process.exit(1);
});
