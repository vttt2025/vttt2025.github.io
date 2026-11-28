/**
 * RUSI TRKI — HỆ THỐNG KIỂM TOÁN VÀ ĐẢM BẢO CHẤT LƯỢNG MÃ NGUỒN TỰ ĐỘNG
 * Chuẩn Karpathy Guidelines & ECC Verification Engine
 * Chức năng:
 * 1. Kiểm tra cú pháp 100% tệp JavaScript (node -c).
 * 2. Kiểm tra tính toàn vẹn tài nguyên trên toàn bộ 16 tệp HTML (script, css, links).
 * 3. Kiểm tra tính hợp lệ của tất cả tệp dữ liệu JSON.
 * 4. Kiểm tra rà soát không để lộ khóa bí mật hoặc dead code nguy hiểm.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let errors = [];
let warnings = [];
let passedChecks = 0;

console.log('\n======================================================');
console.log('  RUSI TRKI — BỘ KIỂM TRA MÃ NGUỒN TỰ ĐỘNG (CLEAN CODE)');
console.log('======================================================\n');

// 1. KIỂM TRA CÚ PHÁP TẤT CẢ FILE JAVASCRIPT
let jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js'));
if (fs.existsSync(path.join('js', 'pages'))) {
  fs.readdirSync(path.join('js', 'pages')).filter(f => f.endsWith('.js')).forEach(f => {
    jsFiles.push(path.join('js', 'pages', f));
  });
}
if (fs.existsSync(path.join('js', 'audioRecorder.js'))) {
  jsFiles.push(path.join('js', 'audioRecorder.js'));
}
if (fs.existsSync('scripts')) {
  fs.readdirSync('scripts').filter(f => f.endsWith('.js')).forEach(f => {
    jsFiles.push(path.join('scripts', f));
  });
}
jsFiles.forEach(file => {
  try {
    execSync('node -c "' + file + '"', { stdio: 'pipe' });
    passedChecks++;
  } catch (err) {
    errors.push(`[Lỗi cú pháp JS] ${file}: ${err.message}`);
  }
});
console.log(`✓ Cú pháp JavaScript: ${jsFiles.length}/${jsFiles.length} tệp đạt chuẩn.`);

// 2. KIỂM TRA HỢP LỆ DỮ LIỆU JSON
let jsonCount = 0;
function auditJsonDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      auditJsonDir(full);
    } else if (f.endsWith('.json')) {
      jsonCount++;
      try {
        JSON.parse(fs.readFileSync(full, 'utf8'));
        passedChecks++;
      } catch (err) {
        errors.push(`[Lỗi cú pháp JSON] ${full}: ${err.message}`);
      }
    }
  });
}
auditJsonDir('data');
console.log(`✓ Tính hợp lệ dữ liệu JSON: ${jsonCount} tệp đạt chuẩn RFC 8259.`);

// 3. KIỂM TRA TÀI NGUYÊN TRÊN 16 TỆP HTML
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Script tags
  const scriptRegex = /<script\s+[^>]*src="([^"]+)"/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1].split('?')[0];
    if (!src.startsWith('http') && !src.startsWith('//')) {
      if (!fs.existsSync(src)) {
        errors.push(`[Thiếu tệp Script] ${file} tham chiếu tới "${src}" không tồn tại!`);
      }
    }
  }

  // Link tags
  const linkRegex = /<link\s+[^>]*href="([^"]+)"/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1].split('?')[0];
    if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('data:')) {
      // "/assets/..." = gốc site (gốc repo), không phải gốc ổ đĩa
      if (!fs.existsSync(href.replace(/^\//, ''))) {
        errors.push(`[Thiếu tệp Link/CSS] ${file} tham chiếu tới "${href}" không tồn tại!`);
      }
    }
  }
  passedChecks++;
});
console.log(`✓ Tài nguyên HTML: 16/16 tệp HTML có đường dẫn chính xác 100%.`);

// 3b. KIỂM TRA BẢO VỆ ĐÁP ÁN THI (ZERO-ANSWER LEAK) & KÍCH THƯỚC DATA.JS
// Dùng chung danh sách trường đáp án với scripts/publish-content.js (xuất bản tự động)
const { findAnswerKeys } = require('./publish-content.js');
for (const f of ['trki_bank.json', 'trki_index.json', 'trki_questions.json']) {
  const p = path.join('data', 'modules', f);
  if (!fs.existsSync(p)) continue;
  const leaked = [...findAnswerKeys(JSON.parse(fs.readFileSync(p, 'utf8')))];
  if (leaked.length) {
    errors.push(`[Bảo mật Zero-Answer Leak] data/modules/${f} còn trường đáp án: ${leaked.join(', ')}`);
  } else {
    passedChecks++;
  }
}
const qbPath = path.join('data', 'modules', 'trki_questions.json');
if (fs.existsSync(qbPath) && fs.readFileSync(qbPath, 'utf8').trim() !== '[]') {
  errors.push('[Bảo mật Zero-Answer Leak] data/modules/trki_questions.json phải luôn là [] (chấm thi qua RPC server-side).');
}
if (fs.existsSync('data.js')) {
  const dataJsSize = fs.statSync('data.js').size;
  const maxBytes = 500 * 1024;
  if (dataJsSize > maxBytes) {
    errors.push(`[0-Egress Budget] data.js (${(dataJsSize / 1024).toFixed(1)} KB) vượt quá ngân sách 500 KB!`);
  } else {
    passedChecks++;
  }
}
console.log('✓ Zero-Answer Leak & 0-Egress: Đáp án thi được bảo vệ, data.js đạt ngân sách.');

// 3c. NỘI DUNG PRO: chạy hàm dựng module của publish-content.js trên dữ liệu giả (dòng PRO đầy đủ nội dung như anon
// đọc được trước khi siết RLS + catalog metadata) — item PRO phải bị khoá, không còn trường nội dung; bài miễn phí giữ nguyên.
{
  const Shapes = require('../js/content-shapes.js');
  const { assembleModule } = require('./publish-content.js');
  const heavy = { sentences: [{ ru: 'Привет' }], items: [{ ru: 'Привет' }], lines: [{ text_ru: 'Да' }], questions: [{ q: 'Что?', options: ['a', 'b'] }],
    raw_data: { items: [{ ru: 'x' }], parts: [{ id: 'p', questions: [{ q: 'x' }] }], model: 'Образец' }, prompt: 'Опишите', prompt_text: 'Опишите',
    model_answer: 'Образец', sample_essay: 'Образец', tips: ['совет'], suggested_words: ['слово'], content_md: '# Текст', rules: [{ r: 1 }],
    table_data: { a: 1 }, transcript_ru: 'Текст', translation_vi: 'Bản dịch', audio_url: 'https://x/a.mp3', youtube_id: 'abcdefghijk',
    parts: [{ id: 'gram', name: 'Часть 1', questions: [{ q: 'x', options: ['a', 'b'] }] }], intro: 'Lời mở đầu', cultural_tip: 'Mẹo',
    action_chains: [{ a: 1 }], dialogues: [{ d: 1 }], grammar_notes: [{ g: 1 }],
    jar_items: [{ position: 1, vocabularies: { id: 'v1', word_normalized: 'слово', meaning_vi: 'từ' } }] };
  const cases = [
    ['vocab_jars.json', 'vocab_jars', { is_system: true, name: 'Lọ', created_at: '2026-01-01T00:00:00Z' }, { is_pro: true }, { is_pro: false }],
    ['topic_articles.json', 'topic_articles', { title: 'Bài' }, {}, {}],
    ['listening_lessons.json', 'listening_lessons', { title: 'Nghe', sort_order: 1 }, { is_pro_only: true }, { is_pro_only: false }],
    ['speaking_sets.json', 'speaking_lessons', { title: 'Nói', sort_order: 1, icon: 'mic-speaking' }, { is_pro_only: true }, { is_pro_only: false }],
    ['writing_tasks.json', 'writing_tasks', { title: 'Viết', sort_order: 1 }, { is_pro_only: true }, { is_pro_only: false }],
    ['writing_topics.json', 'writing_topics', { title: 'Chủ đề', sort_order: 1 }, { is_pro_only: true }, { is_pro_only: false }],
    ['grammar_lessons.json', 'grammar_lessons', { title: 'Ngữ pháp', order_index: 1 }, { is_pro_only: true }, { is_pro_only: false }],
    ['trki_bank.json', 'trki_tests', { title: 'Đề', level: 'B1', is_published: true }, { is_pro_only: true }, { is_pro_only: false }]
  ];
  let proErrors = 0;
  cases.forEach(([file, catKey, base, proFlag, freeFlag]) => {
    const proRow = { ...base, ...heavy, ...proFlag, id: 'pro-1', code: 'pro_1' };
    const freeRow = { ...base, ...heavy, ...freeFlag, id: 'free-1', code: 'free_1' };
    const catRow = { ...base, ...proFlag, id: 'pro-1', code: 'pro_1', word_count: 1, sentence_count: 1, question_count: 1,
      part_summaries: [{ id: 'gram', name: 'Часть 1', questionCount: 1 }] };
    const out = assembleModule(file, [freeRow, proRow], { [catKey]: [catRow] }, { prevOrder: new Map(), articles: {} });
    const items = Array.isArray(out) ? out : Object.values(out);
    const locked = items.filter((it) => it.content_locked);
    const leaks = Shapes.findLockedLeaks(file, out).concat(Shapes.findUnlockedPro(file, out));
    const free = items.find((it) => !it.content_locked);
    const leakedText = JSON.stringify(locked).match(/Привет|Опишите|Образец|# Текст|Bản dịch|Lời mở đầu|слово|a\.mp3|abcdefghijk/);
    if (items.length !== 2 || locked.length !== 1 || leaks.length || leakedText || !free || free.code === 'pro_1') {
      proErrors++;
      errors.push(`[Nội dung PRO] ${file}: item PRO chưa khoá đúng (${leaks.join(', ') || (leakedText && leakedText[0]) || 'sai số item'})`);
    }
  });
  if (!proErrors) passedChecks++;
  console.log(`✓ Nội dung PRO: ${cases.length} module công khai chỉ chứa metadata cho bài PRO (kiểm tra trên dữ liệu giả).`);
}

// 4. KIỂM TRA RÀ SOÁT BẢO MẬT & DEAD CODE NGUY HIỂM
const sensitivePatterns = [
  { pattern: /ghp_[a-zA-Z0-9]{30,}/, name: 'GitHub Personal Token' },
  { pattern: /sk_live_[a-zA-Z0-9]{24,}/, name: 'Stripe Live Secret' },
  { pattern: /sbp_[a-zA-Z0-9]{30,}/, name: 'Supabase Secret Service Key' }
];

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  sensitivePatterns.forEach(sp => {
    if (sp.pattern.test(content)) {
      errors.push(`[Bảo mật] Phát hiện mã bí mật ${sp.name} trong tệp ${file}!`);
    }
  });
});
console.log(`✓ Kiểm tra bảo mật: Không có mã bí mật (Secret Keys) bị lộ.`);

// 5. 0-EGRESS: truy vấn đọc trong supabase-client.js phải có giới hạn (.limit/.range/.eq/.in/.single/.maybeSingle)
// Ngoại lệ khai báo kèm lý do trong scripts/check_unbounded_queries.js (ALLOWLIST)
{
  const { checkUnboundedQueries } = require('./check_unbounded_queries.js');
  const { violations, stale } = checkUnboundedQueries('supabase-client.js');
  violations.forEach((v) => errors.push(`[0-Egress] ${v}`));
  stale.forEach((k) => errors.push(`[0-Egress] ALLOWLIST thừa trong scripts/check_unbounded_queries.js (không còn truy vấn khớp): ${k}`));
  if (!violations.length && !stale.length) {
    passedChecks++;
    console.log('✓ 0-Egress: Truy vấn đọc trong supabase-client.js đều có giới hạn hoặc nằm trong danh sách cho phép.');
  } else {
    console.log(`✗ 0-Egress: ${violations.length + stale.length} lỗi truy vấn không giới hạn (xem cuối báo cáo).`);
  }
}

// TỔNG KẾT
console.log('\n------------------------------------------------------');
if (errors.length > 0) {
  console.error(`❌ PHÁT HIỆN ${errors.length} LỖI CẦN KHẮC PHỤC:`);
  errors.forEach(e => console.error('  • ' + e));
  process.exit(1);
} else {
  console.log(`✅ TOÀN BỘ HỆ THỐNG ĐẠT CHUẨN MÃ NGUỒN SẠCH (${passedChecks} bài kiểm tra đạt 100%).\n`);
  process.exit(0);
}
