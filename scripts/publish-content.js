/**
 * scripts/publish-content.js — Xuất bản nội dung Supabase → data/modules/*.json (0-Egress cho học viên).
 *
 * Dùng bởi GitHub Action `.github/workflows/publish-content.yml` (tự chạy sau khi admin lưu),
 * hoặc chạy tay: `npm run publish-content` (chỉ module có thay đổi) / `npm run publish-content -- --all`.
 *
 * - Chỉ kéo các bảng có bộ đếm thay đổi trong `public.content_versions` (tiết kiệm egress Supabase).
 * - Zero-Answer Leak: xoá mọi trường đáp án khỏi trki_bank, KHÔNG BAO GIỜ ghi ngân hàng câu hỏi
 *   (trki_questions.json luôn là []), và dừng lại nếu phát hiện đáp án trong file sắp ghi.
 * - Ghi data/modules/manifest.json: phiên bản (hash nội dung) của từng module để trình duyệt
 *   chỉ tải lại module đã đổi (xem RusiDataLoader trong data.js).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const MODULES_DIR = path.join(ROOT, 'data', 'modules');
const MANIFEST = path.join(MODULES_DIR, 'manifest.json');

// Trường đáp án tuyệt đối không được xuất hiện trong file công khai của đề thi TRKI.
const ANSWER_KEYS = new Set(['a', 'ex', 'ans', 'answer', 'answers', 'answer_key', 'official_key',
  'correct_answer', 'correct_index', 'correct_option', 'correctIndex', 'explanation']);

function getConfig() {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    return { url: process.env.SUPABASE_URL.replace(/\/+$/, ''), key: process.env.SUPABASE_ANON_KEY };
  }
  const src = fs.readFileSync(path.join(ROOT, 'supabase-config.js'), 'utf8');
  const url = (src.match(/url:\s*"([^"]+)"/) || [])[1];
  const key = (src.match(/anonKey:\s*storedAnon\s*\|\|\s*"([^"]+)"/) || [])[1];
  if (!url || !key) throw new Error('Không đọc được url/anonKey từ supabase-config.js');
  return { url: url.replace(/\/+$/, ''), key };
}

let egressBytes = 0;
async function api(cfg, q) {
  const res = await fetch(`${cfg.url}/rest/v1/${q}`, { headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` } });
  const text = await res.text();
  egressBytes += Buffer.byteLength(text);
  if (!res.ok) throw new Error(`HTTP ${res.status} [${q}]: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}
async function apiAll(cfg, q, pageSize = 1000) {
  const all = [];
  const sep = q.includes('?') ? '&' : '?';
  for (let offset = 0; ; offset += pageSize) {
    const chunk = await api(cfg, `${q}${sep}limit=${pageSize}&offset=${offset}`);
    if (!Array.isArray(chunk) || !chunk.length) break;
    all.push(...chunk);
    if (chunk.length < pageSize) break;
  }
  return all;
}

// ---------------------------------------------------------------------------
// Chuyển đổi dữ liệu (giữ nguyên định dạng của scripts/sync-from-supabase.js)
// ---------------------------------------------------------------------------
function sanitizeWord(w) {
  if (!w) return null;
  const ex0 = (Array.isArray(w.examples) && w.examples[0]) ? w.examples[0] : null;
  const rawWord = w.word_normalized || (w.word_with_stress ? w.word_with_stress.replace(/[̀́]/g, '') : '');
  const stressWord = w.word_with_stress || w.word_normalized || '';
  return {
    id: w.id, ru: rawWord, stress: stressWord, word_with_stress: stressWord, word_normalized: rawWord,
    vi: w.meaning_vi || '', meaning_vi: w.meaning_vi || '', pos: w.pos || '', gender: w.gender || '',
    aspect: w.aspect || '', level: w.level || 'A1', audio: w.audio_url || '', audio_url: w.audio_url || '',
    ex: ex0 ? (ex0.ru || '') : '', ex_vi: ex0 ? (ex0.vi || '') : '',
    examples: Array.isArray(w.examples) ? w.examples : [],
    ant: (Array.isArray(w.antonyms) && w.antonyms.length) ? w.antonyms.join(', ') : '',
    antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
    syn: (Array.isArray(w.synonyms) && w.synonyms.length) ? w.synonyms.join(', ') : '',
    synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
    structures: Array.isArray(w.structures) ? w.structures : [],
    notes: w.notes || ''
  };
}

function formatArticle(art, fallbackLevel) {
  return {
    id: art.id, title: art.title, level: art.level || fallbackLevel || 'A1',
    intro: art.intro || '', desc: art.intro || '',
    culturalTip: art.cultural_tip || '', cultural_tip: art.cultural_tip || '',
    audio_url: art.audio_url || '',
    actionChains: Array.isArray(art.action_chains) ? art.action_chains : [],
    action_chains: Array.isArray(art.action_chains) ? art.action_chains : [],
    dialogues: Array.isArray(art.dialogues) ? art.dialogues : [],
    grammarNotes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
    grammar_notes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
    content_md: art.content_md || ''
  };
}

const fetchArticles = (cfg) => api(cfg, 'topic_articles?select=*');

const BUILDERS = {
  'topic_articles.json': {
    tables: ['topic_articles'],
    async build(cfg) {
      const out = {};
      (await fetchArticles(cfg)).forEach((a) => { out[a.id] = formatArticle(a); });
      return out;
    }
  },
  'vocab_jars.json': {
    tables: ['vocab_jars', 'jar_items', 'vocabularies', 'topic_articles'],
    async build(cfg) {
      const rawJars = await api(cfg, 'vocab_jars?select=id,code,name,level,icon,word_count,is_system,is_pro,jar_items(position,vocabularies(*))&is_system=eq.true&order=created_at.asc');
      const articles = {};
      (await fetchArticles(cfg)).forEach((a) => { articles[a.id] = a; });
      return rawJars.map((row) => {
        const code = row.code || row.id;
        const art = articles[code] || articles[row.id] || null;
        const items = (Array.isArray(row.jar_items) ? row.jar_items : []).sort((a, b) => (a.position || 0) - (b.position || 0));
        const words = items.map((it) => sanitizeWord(it.vocabularies)).filter(Boolean);
        const article = art ? formatArticle(art, row.level) : null;
        return {
          id: code, code, uuid: row.id, name: row.name || code, title: row.name || code,
          level: row.level || 'A1', desc: (article && article.intro) || '', icon: row.icon || 'archive-jar',
          color: '#0039A6', word_count: words.length || row.word_count || 0, is_system: true,
          is_pro: Boolean(row.is_pro), words, article
        };
      });
    }
  },
  'vocabularies.json': {
    tables: ['vocabularies'],
    async build(cfg) {
      return (await apiAll(cfg, 'vocabularies?select=*&order=word_normalized.asc')).map(sanitizeWord).filter(Boolean);
    }
  },
  'vocab_lessons.json': {
    tables: ['vocab_lessons'],
    build: (cfg) => api(cfg, 'vocab_lessons?select=*&order=created_at.asc')
  },
  'listening_lessons.json': {
    tables: ['listening_lessons', 'listening_topics', 'listening_lesson_vocab', 'vocabularies'],
    async build(cfg) {
      const rows = await api(cfg, 'listening_lessons?select=*,topic:listening_topics(*),vocab_items:listening_lesson_vocab(sort_order,line_index,vocab:vocabularies(*))&order=sort_order.asc');
      return rows.map((row) => {
        const raw = row.raw_data || {};
        const t = row.topic || {};
        const lines = (Array.isArray(row.lines) && row.lines.length) ? row.lines : (raw.lines || []);
        const questions = (Array.isArray(row.questions) && row.questions.length) ? row.questions : (raw.questions || []);
        const dictation = (raw.dictation && raw.dictation.length) ? raw.dictation : (Array.isArray(lines) ? lines.map((l) => l.text_ru || l.ru || '').filter(Boolean) : []);
        const ytId = row.youtube_id || row.video_youtube_id || (raw.youtube_video_id || '');
        return {
          id: row.code || row.id, lesson_uuid: row.id, code: row.code || row.id, topic_id: row.topic_id,
          title: row.title, vi: row.vi || row.translation_vi || t.description || '',
          translation_vi: row.translation_vi || row.vi || '', transcript_ru: row.transcript_ru || '',
          level: row.level || t.level || 'A1', level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
          category: t.category || row.category || 'general', category_name: t.title || row.category_name || 'Luyện nghe hiểu',
          part_type: 'part' + (row.part_number || 1), part_number: row.part_number || 1,
          youtube_id: ytId, video_youtube_id: ytId, audio_url: row.audio_url || '',
          duration_seconds: row.duration_seconds || 120, est_minutes: row.est_minutes || 12,
          is_pro_only: Boolean(row.is_pro_only || t.is_pro_only),
          lines, questions, dictation, blanks: raw.blanks || [], vocab_items: row.vocab_items || [], raw_data: raw
        };
      });
    }
  },
  'speaking_sets.json': {
    tables: ['speaking_lessons'],
    async build(cfg) {
      const rows = await api(cfg, 'speaking_lessons?select=*&order=sort_order.asc');
      return rows.map((row) => {
        const raw = row.raw_data || {};
        const sentences = Array.isArray(row.sentences) && row.sentences.length ? row.sentences : (Array.isArray(row.items) && row.items.length ? row.items : (raw.items || []));
        const ytId = row.youtube_id || raw.youtube_video_id || raw.youtubeId || (row.video_sample_url && row.video_sample_url.includes('youtube') ? (row.video_sample_url.match(/(?:embed\/|v=|watch\?v=)([a-zA-Z0-9_-]{11})/) || [])[1] : '');
        return {
          id: row.code || row.id, code: row.code || row.id, title: row.title, level: row.level || 'A1',
          level_name: row.level_name || (row.level === 'B2' ? 'Nâng cao B2' : row.level === 'B1' ? 'Trung cấp B1' : row.level === 'A2' ? 'Cơ bản A2' : 'Sơ cấp A1'),
          category: row.category || 'shadowing', category_name: row.category_name || 'Luyện nói Shadowing',
          speaking_mode: row.speaking_mode || (row.category === 'speech_studio' || row.category === 'reflex' ? 'reflex' : 'shadowing'),
          description: row.description || '', phonemeTarget: row.phoneme_target || '',
          icon: row.icon || (ytId ? 'youtube' : 'mic-speaking'), is_pro_only: Boolean(row.is_pro_only),
          sentences, items: sentences, youtube_id: ytId,
          youtube_url: row.youtube_url || (ytId ? ('https://www.youtube.com/watch?v=' + ytId) : ''),
          video_sample_url: row.video_sample_url || (ytId ? ('https://www.youtube.com/embed/' + ytId + '?enablejsapi=1&rel=0&modestbranding=1&playsinline=1') : ''),
          start_sec: row.start_sec || 0, end_sec: row.end_sec || 0, sort_order: row.sort_order || 0, raw_data: raw
        };
      });
    }
  },
  'writing_tasks.json': {
    tables: ['writing_tasks', 'writing_topics', 'writing_task_vocab', 'vocabularies'],
    async build(cfg) {
      const rows = await api(cfg, 'writing_tasks?select=*,topic:writing_topics(*),vocab_items:writing_task_vocab(sort_order,vocab:vocabularies(*))&order=sort_order.asc');
      return rows.map((row) => {
        const raw = row.raw_data || {};
        let words;
        if (Array.isArray(row.vocab_items) && row.vocab_items.length) {
          words = row.vocab_items.filter((it) => it && it.vocab).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(({ vocab: v }) => ({
            id: v.id, ru: v.word_with_stress || v.word_normalized, word: v.word_with_stress || v.word_normalized,
            word_normalized: v.word_normalized, vi: v.meaning_vi || '', pos: v.pos || '', level: v.level || '', audio_url: v.audio_url || ''
          }));
        } else {
          words = (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length) ? raw.suggested_words : (Array.isArray(row.suggested_words) ? row.suggested_words : []);
        }
        let tips = [];
        if (Array.isArray(row.tips) && row.tips.length) tips = row.tips;
        else if (typeof row.tips === 'string' && row.tips.trim()) { try { tips = JSON.parse(row.tips); } catch (_) { tips = [row.tips]; } }
        const topic = row.topic || {};
        const model = row.model_answer || row.sample_essay || raw.model || '';
        return {
          id: row.code || row.id, code: row.code || row.id, title: row.title, level: row.level || topic.level || 'A1',
          level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
          category: topic.category || row.category || 'picture',
          category_name: topic.title || topic.category_name || row.category_name || 'Tả tranh & Giới thiệu',
          prompt: row.prompt || row.prompt_text || '', prompt_text: row.prompt_text || row.prompt || '',
          image_url: row.image_url || '', min_words: row.min_words || 20, suggested_words: words, tips,
          sample_essay: model, model_answer: model, is_pro_only: Boolean(row.is_pro_only || topic.is_pro_only), raw_data: raw
        };
      });
    }
  },
  'writing_topics.json': {
    tables: ['writing_topics'],
    async build(cfg) {
      const rows = await api(cfg, 'writing_topics?select=*&order=sort_order.asc');
      return rows.map((w) => {
        const raw = w.raw_data || {};
        return {
          id: w.code || w.id, code: w.code || w.id, title: w.title, level: w.level || 'A1',
          level_name: w.level_name || ('Sơ cấp ' + (w.level || 'A1')), category: w.category || 'essay',
          category_name: w.category_name || 'Chủ đề viết', prompt: w.prompt || '', vi: w.vi || '',
          min_words: w.min_words || 25,
          suggested_words: (Array.isArray(w.suggested_words) && w.suggested_words.length) ? w.suggested_words : (raw.suggested_words || []),
          tips: (Array.isArray(w.tips) && w.tips.length) ? w.tips : (raw.tips || []),
          model_answer: w.model_answer || (raw.model || ''), image_url: w.image_url || '', icon: w.icon || '📝',
          sort_order: typeof w.sort_order === 'number' ? w.sort_order : 10, is_pro_only: Boolean(w.is_pro_only), raw_data: raw
        };
      });
    }
  },
  'trki_bank.json': {
    tables: ['trki_tests'],
    async build(cfg) {
      // View đã xoá khoá đáp án phía server; bảng trki_tests không còn cho anon đọc
      const rows = await api(cfg, 'trki_tests_public?select=*&order=level.asc');
      return rows.map((t) => {
        const raw = t.raw_data || {};
        const parts = (Array.isArray(t.parts) && t.parts.length) ? t.parts : (raw.parts || t.sections || []);
        return stripAnswers({
          id: t.code || t.id, code: t.code || t.id, title: t.title, level: t.level || 'A1',
          level_name: t.level_name || ('Trình độ ' + (t.level || 'A1')), category: t.category || 'full',
          sub_test_type: t.sub_test_type || 'full', duration_min: t.duration_min || 45, pass_percent: t.pass_percent || 60,
          is_pro_only: Boolean(t.is_pro_only), is_published: Boolean(t.is_published !== false), test_mode: t.test_mode || 'practice',
          parts, part1: t.part1 || raw.part1, part2: t.part2 || raw.part2, part3: t.part3 || raw.part3,
          part4: t.part4 || raw.part4, part5: t.part5 || raw.part5
        });
      });
    }
  },
  'shop_products.json': {
    tables: ['shop_products'],
    async build(cfg) {
      const rows = await api(cfg, 'shop_products?select=*&order=price_minor.asc');
      return rows.map((p) => {
        const price = p.price_vnd || p.price_minor || p.price || 50000;
        const img = p.image_url || p.image || (Array.isArray(p.image_urls) ? p.image_urls[0] : '');
        return {
          id: p.code || p.id, code: p.code || p.id, name: p.name || p.title, title: p.title || p.name,
          category: p.category || 'sach',
          category_name: p.category_name || (p.category === 'banh_keo' ? 'Bánh kẹo Nga' : (p.category === 'my_pham' ? 'Mỹ phẩm Siberia' : 'Quà lưu niệm Nga')),
          price: Number(price), price_vnd: Number(price), original_price: p.original_price ? Number(p.original_price) : 0,
          image_url: img, image: img, stock: typeof p.stock === 'number' ? p.stock : 50, badge: p.badge || '',
          description: p.description || '', status: p.status || 'in_stock'
        };
      });
    }
  },
  'packages.json': {
    tables: ['packages'],
    async build(cfg) {
      const rows = await api(cfg, 'packages?select=*&order=price.asc');
      return rows.map((pkg) => ({
        id: pkg.code || pkg.id, code: pkg.code || pkg.id,
        badge: pkg.badge || (pkg.duration_days === 365 ? '1 NĂM' : pkg.duration_days === 180 ? '6 THÁNG' : 'TRỌN ĐỜI'),
        name: pkg.name || pkg.title, title: pkg.name || pkg.title, desc: pkg.description || '', description: pkg.description || '',
        price: Number(pkg.price_vnd || pkg.price), price_vnd: Number(pkg.price_vnd || pkg.price),
        priceOld: Number(pkg.price_old || (Number(pkg.price) * 2)), price_old: Number(pkg.price_old || (Number(pkg.price) * 2)),
        duration_months: pkg.duration_months, duration_days: pkg.duration_days, is_lifetime: Boolean(pkg.is_lifetime),
        popular: Boolean(pkg.is_popular), is_popular: Boolean(pkg.is_popular), features: Array.isArray(pkg.features) ? pkg.features : []
      }));
    }
  },
  'grammar_lessons.json': {
    tables: ['grammar_lessons'],
    async build(cfg) {
      const rows = await api(cfg, 'grammar_lessons?select=*&order=order_index.asc');
      return rows.map((g) => ({
        id: g.code || g.id, code: g.code || g.id, title: g.title, level: g.level || 'A1', category: g.category || 'case',
        topic: g.topic || 'Ngữ pháp cơ bản', vi: g.vi || '', summary: g.summary || g.vi || '', content_md: g.content_md || '',
        rules: Array.isArray(g.rules) ? g.rules : [], table_data: g.table_data || {},
        questions: Array.isArray(g.questions) ? g.questions : [], order_index: g.order_index || 0, is_pro_only: Boolean(g.is_pro_only)
      }));
    }
  },
  'blog_posts.json': {
    tables: ['blog_posts'],
    async build(cfg) {
      const rows = await api(cfg, 'blog_posts?select=*&order=created_at.desc');
      return rows.map((row) => ({
        slug: row.slug || row.code || row.id, id: row.code || row.id, title: row.title, category: row.category,
        categoryName: row.category === 'du_hoc_trai_nghiem' ? 'Trải nghiệm du học & KTX' : (row.category === 'ngu_phap' ? 'Thành ngữ & Ngữ pháp Nga' : 'Cẩm nang du học'),
        cover: row.cover_url || 'assets/red-square.jpg', excerpt: row.summary || '', content: row.content_md || row.summary || '',
        date: row.published_at ? new Date(row.published_at).toLocaleDateString('vi-VN') : '', icon: 'book-open-blog',
        author: row.author || 'RUSI Editorial', readTime: '5 phút đọc'
      }));
    }
  }
};

// trki_index.json: mục lục nhẹ suy ra từ trki_bank.json (cùng dữ liệu, không kéo thêm từ Supabase).
const LEVEL_NAMES = {
  A1: 'Sơ cấp A1 (ТЭУ)', A2: 'Cơ bản A2 (ТБУ)', B1: 'Trung cấp B1 (ТРКИ-I)', B2: 'Cao cấp B2 (ТРКИ-II)',
  C1: 'Thành thạo C1 (ТРКИ-III)', C2: 'Bản ngữ C2 (ТРКИ-IV)', VNZh: 'Định cư & Cư trú (ВЖ)'
};
function buildTrkiIndex(bank) {
  return bank.map((t) => {
    const parts = Array.isArray(t.parts) ? t.parts : [];
    // Đếm cả bài viết/nói như màn hình chuẩn bị phòng thi ("Tổng số câu hỏi") để thẻ đề và phòng thi khớp nhau
    const partSummaries = parts.map((p) => ({
      id: p.id, name: p.name, vi: p.vi,
      questionCount: (p.questions || []).length || (p.writing_tasks || []).length || (p.speaking_tasks || []).length
    }));
    const levelName = LEVEL_NAMES[t.level] || t.level_name;
    return {
      id: t.id, code: t.code, title: t.title, level: t.level, levelName, level_name: levelName,
      category: t.category, sub_test_type: t.sub_test_type, test_mode: t.test_mode,
      durationMin: t.duration_min, duration_min: t.duration_min, passPercent: t.pass_percent, pass_percent: t.pass_percent,
      is_pro_only: t.is_pro_only, is_published: t.is_published, icon: 'award-badge', partSummaries,
      questionCount: partSummaries.reduce((a, p) => a + p.questionCount, 0), _isIndexOnly: true
    };
  });
}

function stripAnswers(value) {
  return JSON.parse(JSON.stringify(value, (k, v) => (ANSWER_KEYS.has(k) ? undefined : v)));
}
function findAnswerKeys(value, found = new Set()) {
  if (Array.isArray(value)) value.forEach((v) => findAnswerKeys(v, found));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) { if (ANSWER_KEYS.has(k)) found.add(k); findAnswerKeys(v, found); }
  }
  return found;
}

const hashOf = (text) => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
const readJson = (file, fallback) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { return fallback; } };

async function main() {
  const all = process.argv.includes('--all');
  const dryRun = process.argv.includes('--dry-run');
  const cfg = getConfig();
  const manifest = readJson(MANIFEST, { modules: {}, sources: {} });

  let versions = null;
  try {
    versions = Object.fromEntries((await api(cfg, 'content_versions?select=table_name,version')).map((r) => [r.table_name, Number(r.version)]));
  } catch (err) {
    if (!all) throw new Error('Chưa đọc được public.content_versions (đã chạy migration chưa?). Dùng --all để xuất bản toàn bộ. ' + err.message);
  }
  const changedTables = new Set(Object.keys(BUILDERS).flatMap((f) => BUILDERS[f].tables)
    .filter((t) => all || !versions || versions[t] !== manifest.sources[t]));
  const targets = Object.keys(BUILDERS).filter((f) => all || BUILDERS[f].tables.some((t) => changedTables.has(t)));

  if (!targets.length) {
    console.log('Không có bảng nội dung nào thay đổi — bỏ qua.');
    return;
  }
  console.log('Module cần tạo lại:', targets.join(', '));

  const outputs = {};
  for (const f of targets) outputs[f] = await BUILDERS[f].build(cfg);
  if (outputs['trki_bank.json']) outputs['trki_index.json'] = buildTrkiIndex(outputs['trki_bank.json']);
  outputs['trki_questions.json'] = []; // Zero-Answer Leak: ngân hàng câu hỏi chỉ chấm qua RPC phía server

  for (const f of ['trki_bank.json', 'trki_index.json', 'trki_questions.json']) {
    const leaked = outputs[f] ? [...findAnswerKeys(outputs[f])] : [];
    if (leaked.length) throw new Error(`[Zero-Answer Leak] ${f} còn trường đáp án: ${leaked.join(', ')} — dừng xuất bản.`);
  }
  // Chống xoá trắng ngân hàng đề khi API trả rỗng do lỗi quyền đọc (trki_tests_public) — kiểm tra trước khi ghi file nào
  const bankFile = path.join(MODULES_DIR, 'trki_bank.json');
  if (Array.isArray(outputs['trki_bank.json']) && !outputs['trki_bank.json'].length && readJson(bankFile, []).length) {
    throw new Error('trki_bank.json: Supabase trả về 0 đề trong khi bản hiện tại có dữ liệu — dừng xuất bản (kiểm tra quyền đọc trki_tests_public).');
  }

  const changedFiles = [];
  for (const [f, data] of Object.entries(outputs)) {
    const text = JSON.stringify(data);
    const file = path.join(MODULES_DIR, f);
    const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
    manifest.modules[f] = { v: hashOf(text) };
    if (prev !== text) {
      changedFiles.push(f);
      if (!dryRun) fs.writeFileSync(file, text);
    }
  }
  // Ghi phiên bản cho mọi module đang có (lần đầu chạy: tạo đủ manifest)
  for (const f of fs.readdirSync(MODULES_DIR).filter((x) => x.endsWith('.json') && x !== 'manifest.json')) {
    if (!manifest.modules[f]) manifest.modules[f] = { v: hashOf(fs.readFileSync(path.join(MODULES_DIR, f), 'utf8')) };
  }
  if (versions) manifest.sources = { ...manifest.sources, ...versions };
  manifest.generated_at = new Date().toISOString();
  if (!dryRun) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');

  console.log(`File đã thay đổi: ${changedFiles.join(', ') || '(không có)'}${dryRun ? ' [dry-run, chưa ghi]' : ''}`);
  console.log(`Egress Supabase lần chạy này: ${(egressBytes / 1024).toFixed(0)} KB`);
}

if (require.main === module) {
  main().catch((err) => { console.error(err.message || err); process.exit(1); });
}
module.exports = { BUILDERS, buildTrkiIndex, stripAnswers, findAnswerKeys, ANSWER_KEYS };
