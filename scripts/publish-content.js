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

// Chuyển dòng DB → item dùng chung với trình duyệt (js/pro-content.js tải bài PRO cùng định dạng)
const Shapes = require('../js/content-shapes.js');
const { ANSWER_KEYS, SELECTS, stripAnswers, findAnswerKeys, sanitizeWord, formatArticle } = Shapes;

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

const fetchArticles = (cfg) => api(cfg, `topic_articles?select=${SELECTS.topic_articles}`);

// ---------------------------------------------------------------------------
// Bài PRO: file công khai chỉ chứa metadata (`content_locked: true`), lấy từ public.rusi_pro_catalog()
// (anon gọi được cả trước lẫn sau khi siết RLS). Nội dung tải sau bằng phiên PRO (js/pro-content.js).
// ---------------------------------------------------------------------------
let _catalogPromise = null;
function fetchProCatalog(cfg) {
  if (!_catalogPromise) {
    _catalogPromise = (async () => {
      const res = await fetch(`${cfg.url}/rest/v1/rpc/rusi_pro_catalog`, {
        method: 'POST', headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}`, 'Content-Type': 'application/json' }, body: '{}'
      });
      const text = await res.text();
      egressBytes += Buffer.byteLength(text);
      // Không có catalog thì KHÔNG xuất bản (tránh lộ nội dung PRO hoặc xoá bài PRO khỏi danh sách)
      if (!res.ok) throw new Error(`rusi_pro_catalog HTTP ${res.status}: ${text.slice(0, 300)} — dừng xuất bản.`);
      const cat = JSON.parse(text);
      if (!cat || typeof cat !== 'object') throw new Error('rusi_pro_catalog trả dữ liệu không hợp lệ — dừng xuất bản.');
      return cat;
    })();
  }
  return _catalogPromise;
}

// Khoá sắp xếp (như ORDER BY của truy vấn cũ, thêm code để thứ tự ổn định): null xếp cuối
function compareKeys(a, b) {
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x === y) continue;
    if (x == null) return 1;
    if (y == null) return -1;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}
const ts = (v) => (v ? Date.parse(v) : null);
const PRO_MODULES = {
  'topic_articles.json': { cat: 'topic_articles', key: (r) => [r.id], shape: (r) => formatArticle(r) },
  'vocab_jars.json': { cat: 'vocab_jars', key: (r) => [ts(r.created_at), r.code || r.id], shape: (r, ctx) => Shapes.vocabJar(r, ctx.articles) },
  'listening_lessons.json': { cat: 'listening_lessons', key: (r) => [r.sort_order, r.code || r.id], shape: (r) => Shapes.listeningLesson(r) },
  'speaking_sets.json': { cat: 'speaking_lessons', key: (r) => [r.sort_order, r.code || r.id], shape: (r) => Shapes.speakingSet(r) },
  'writing_tasks.json': { cat: 'writing_tasks', key: (r) => [r.sort_order, r.code || r.id], shape: (r) => Shapes.writingTask(r) },
  'writing_topics.json': { cat: 'writing_topics', key: (r) => [r.sort_order, r.code || r.id], shape: (r) => Shapes.writingTopic(r) },
  'grammar_lessons.json': { cat: 'grammar_lessons', key: (r) => [r.order_index, r.code || r.id], shape: (r) => Shapes.grammarLesson(r) },
  'trki_bank.json': { cat: 'trki_tests', key: (r) => [r.level, r.code || r.id], shape: (r) => Shapes.trkiTest(r) }
};
// Thứ tự trong file đang xuất bản: dùng phân định các dòng trùng khoá sắp xếp để danh sách không bị xáo trộn
function previousOrder(file) {
  const prev = readJson(path.join(MODULES_DIR, file), null);
  const ids = Array.isArray(prev) ? prev.map((it) => it && it.id) : (prev && typeof prev === 'object' ? Object.keys(prev) : []);
  return new Map(ids.map((id, i) => [String(id), i]));
}
// rows: dòng đọc bằng anon (trước khi siết RLS còn gồm cả dòng PRO — bỏ đi theo id trong catalog)
// ctx.prevOrder: Map id item → vị trí trong file cũ (mặc định đọc data/modules/<file>)
function assembleModule(file, rows, catalog, ctx = {}) {
  const conf = PRO_MODULES[file];
  const proRows = catalog && catalog[conf.cat];
  if (!Array.isArray(proRows)) throw new Error(`rusi_pro_catalog thiếu mục "${conf.cat}" — dừng xuất bản.`);
  const prevOrder = ctx.prevOrder || previousOrder(file);
  const entry = (r, item) => {
    const k = conf.key(r);
    const pos = prevOrder.get(String(item.id));
    return { k: k.slice(0, -1).concat(pos === undefined ? null : pos, k[k.length - 1]), item };
  };
  const proIds = new Set(proRows.map((r) => String(r.id)));
  const entries = rows.filter((r) => !proIds.has(String(r.id))).map((r) => entry(r, conf.shape(r, ctx)))
    .concat(proRows.map((r) => entry(r, Shapes.lockedItem(file, r))));
  const items = entries.sort((x, y) => compareKeys(x.k, y.k)).map((e) => e.item);
  if (file !== 'topic_articles.json') return items;
  const out = {};
  items.forEach((a) => { out[a.id] = a; });
  return out;
}

const BUILDERS = {
  'topic_articles.json': {
    tables: ['topic_articles', 'vocab_jars'],
    async build(cfg) {
      return assembleModule('topic_articles.json', await fetchArticles(cfg), await fetchProCatalog(cfg));
    }
  },
  'vocab_jars.json': {
    tables: ['vocab_jars', 'jar_items', 'vocabularies', 'topic_articles'],
    async build(cfg) {
      const rawJars = await api(cfg, `vocab_jars?select=${SELECTS.vocab_jars},created_at&is_system=eq.true&order=created_at.asc`);
      const articles = {};
      (await fetchArticles(cfg)).forEach((a) => { articles[a.id] = a; });
      return assembleModule('vocab_jars.json', rawJars, await fetchProCatalog(cfg), { articles });
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
      const rows = await api(cfg, `listening_lessons?select=${SELECTS.listening_lessons}&order=sort_order.asc`);
      return assembleModule('listening_lessons.json', rows, await fetchProCatalog(cfg));
    }
  },
  // Chủ đề nghe: cùng dạng fromRow của CMS (admin.js MAPPINGS.LISTENING_TOPICS) — dùng cho danh sách và ô chọn chủ đề
  'listening_topics.json': {
    tables: ['listening_topics'],
    async build(cfg) {
      const rows = await api(cfg, 'listening_topics?select=id,code,title,level,category,description,icon,sort_order,is_pro_only&order=sort_order.asc');
      return rows.map((row) => ({
        id: row.code || row.id, uuid: row.id, code: row.code || row.id, title: row.title || '',
        level: row.level || 'A1', category: row.category || 'airport', description: row.description || '',
        icon: row.icon || 'headphones', sort_order: Number(row.sort_order) || 0, is_pro_only: Boolean(row.is_pro_only)
      }));
    }
  },
  'speaking_sets.json': {
    tables: ['speaking_lessons'],
    async build(cfg) {
      const rows = await api(cfg, `speaking_lessons?select=${SELECTS.speaking_lessons}&order=sort_order.asc`);
      return assembleModule('speaking_sets.json', rows, await fetchProCatalog(cfg));
    }
  },
  'writing_tasks.json': {
    tables: ['writing_tasks', 'writing_topics', 'writing_task_vocab', 'vocabularies'],
    async build(cfg) {
      const rows = await api(cfg, `writing_tasks?select=${SELECTS.writing_tasks}&order=sort_order.asc`);
      return assembleModule('writing_tasks.json', rows, await fetchProCatalog(cfg));
    }
  },
  'writing_topics.json': {
    tables: ['writing_topics'],
    async build(cfg) {
      const rows = await api(cfg, `writing_topics?select=${SELECTS.writing_topics}&order=sort_order.asc`);
      return assembleModule('writing_topics.json', rows, await fetchProCatalog(cfg));
    }
  },
  'trki_bank.json': {
    tables: ['trki_tests'],
    async build(cfg) {
      // View đã xoá khoá đáp án phía server; bảng trki_tests không còn cho anon đọc
      const rows = await api(cfg, `trki_tests_public?select=${SELECTS.trki_tests_public}&order=level.asc`);
      return assembleModule('trki_bank.json', rows, await fetchProCatalog(cfg));
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
      const rows = await api(cfg, `grammar_lessons?select=${SELECTS.grammar_lessons}&order=order_index.asc`);
      return assembleModule('grammar_lessons.json', rows, await fetchProCatalog(cfg));
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
    // Đếm cả bài viết/nói như màn hình chuẩn bị phòng thi ("Tổng số câu hỏi") để thẻ đề và phòng thi khớp nhau
    // Đề PRO bị khoá: tóm tắt phần thi lấy sẵn từ catalog (không có parts)
    const partSummaries = t.content_locked ? (t.part_summaries || []) : Shapes.trkiPartSummaries(t.parts);
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
  // Nội dung PRO: item PRO phải bị khoá và item khoá không còn trường nội dung
  for (const [f, data] of Object.entries(outputs)) {
    const leaks = Shapes.findLockedLeaks(f, data).concat(Shapes.findUnlockedPro(f, data));
    if (leaks.length) throw new Error(`[PRO Leak] ${f}: ${leaks.slice(0, 10).join(', ')} — dừng xuất bản.`);
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
module.exports = { BUILDERS, buildTrkiIndex, assembleModule, stripAnswers, findAnswerKeys, ANSWER_KEYS };
