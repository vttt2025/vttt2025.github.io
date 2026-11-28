#!/usr/bin/env node
/**
 * check_answer_leak_live.js — Kiểm tra Zero-Answer Leak TRỰC TIẾP trên Supabase (cần mạng, KHÔNG nằm trong npm test).
 *
 * Gọi PostgREST bằng anon key công khai (đọc từ supabase-config.js) như một khách chưa đăng nhập:
 *   - public.trki_tests_public    : quét mọi cột JSON (part1..5, parts, sections, raw_data) tìm khoá đáp án.
 *   - public.trki_questions_public: cột của view không được có cột đáp án; quét JSON (options, passage...) tìm khoá đáp án.
 * Thoát mã 1 nếu thấy rò rỉ hoặc không gọi được API (để CI báo đỏ), 0 nếu sạch.
 *
 * Dùng:
 *   node scripts/check_answer_leak_live.js
 *   RUSI_CHECK_JWT=<access_token học viên PRO> node scripts/check_answer_leak_live.js   # kiểm cả đề PRO (view lọc theo quyền)
 * Biến môi trường tuỳ chọn: SUPABASE_URL, SUPABASE_ANON_KEY (ghi đè giá trị trong supabase-config.js).
 * Chỉ đọc (GET). Dung lượng tải mỗi lần ≈ toàn bộ đề/câu hỏi công khai (vài MB) — đừng chạy theo lịch dày.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ANSWER_KEYS } = require('../js/content-shapes.js');

// Khoá đáp án: danh sách chung với publish-content.js + vài biến thể thường gặp trong JSON đề.
const LEAK_KEYS = new Set([...ANSWER_KEYS, 'correct', 'is_correct', 'isCorrect', 'correct_answers', 'answer_index', 'answerIndex', 'solution']);
// Cột đáp án không bao giờ được có trong view câu hỏi công khai.
const FORBIDDEN_COLUMNS = new Set([...LEAK_KEYS, 'answer_explanation']);
const PAGE = 500;

function loadConfig() {
  const sandbox = { window: {}, localStorage: { getItem: () => null } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'supabase-config.js'), 'utf8'), sandbox);
  const cfg = sandbox.window.SUPABASE_CONFIG || {};
  const url = (process.env.SUPABASE_URL || cfg.url || '').replace(/\/+$/, '');
  const anonKey = process.env.SUPABASE_ANON_KEY || cfg.anonKey || '';
  if (!url || !anonKey) throw new Error('Thiếu Supabase URL/anon key (supabase-config.js hoặc SUPABASE_URL/SUPABASE_ANON_KEY).');
  // Chặn nhầm khoá service_role: script này chỉ được chạy với quyền anon/học viên.
  try {
    const payload = JSON.parse(Buffer.from(anonKey.split('.')[1] || '', 'base64url').toString('utf8') || '{}');
    if (payload.role === 'service_role') throw new Error('Khoá được cấp là service_role — chỉ dùng anon key.');
  } catch (e) { if (/service_role/.test(e.message)) throw e; }
  return { url, anonKey };
}

async function fetchAll({ url, anonKey }, view, select) {
  const rows = [];
  const auth = process.env.RUSI_CHECK_JWT || anonKey;
  for (let offset = 0; ; offset += PAGE) {
    const res = await fetch(`${url}/rest/v1/${view}?select=${encodeURIComponent(select)}&order=id.asc&limit=${PAGE}&offset=${offset}`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${auth}`, Accept: 'application/json' }
    });
    if (!res.ok) throw new Error(`${view}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < PAGE) return rows;
  }
}

/** Trả về danh sách "đường.dẫn" tới các khoá đáp án trong một giá trị JSON. */
function findLeaks(value, at, out) {
  if (Array.isArray(value)) value.forEach((v, i) => findLeaks(v, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (LEAK_KEYS.has(k)) out.push(`${at}.${k}`);
      findLeaks(v, `${at}.${k}`, out);
    }
  } else if (typeof value === 'string' && /^\s*[[{]/.test(value)) {
    try { findLeaks(JSON.parse(value), at, out); } catch (_) { /* chuỗi thường, không phải JSON */ }
  }
  return out;
}

async function main() {
  const cfg = loadConfig();
  const problems = [];
  const asWho = process.env.RUSI_CHECK_JWT ? 'JWT trong RUSI_CHECK_JWT' : 'anon';

  const tests = await fetchAll(cfg, 'trki_tests_public', '*');
  for (const t of tests) {
    for (const [col, v] of Object.entries(t)) {
      if (FORBIDDEN_COLUMNS.has(col)) problems.push(`trki_tests_public#${t.code || t.id}: có cột đáp án "${col}"`);
      const hits = findLeaks(v, col, []);
      if (hits.length) problems.push(`trki_tests_public#${t.code || t.id}: ${hits.length} khoá đáp án, vd. ${hits.slice(0, 3).join(', ')}`);
    }
  }

  const questions = await fetchAll(cfg, 'trki_questions_public', '*');
  const cols = new Set(questions.flatMap((q) => Object.keys(q)));
  for (const c of cols) if (FORBIDDEN_COLUMNS.has(c)) problems.push(`trki_questions_public: view có cột đáp án "${c}"`);
  for (const q of questions) {
    const hits = [];
    for (const [col, v] of Object.entries(q)) findLeaks(v, col, hits);
    if (hits.length) problems.push(`trki_questions_public#${q.code || q.id}: ${hits.slice(0, 3).join(', ')}`);
  }

  console.log(`Quyền: ${asWho} · trki_tests_public: ${tests.length} đề · trki_questions_public: ${questions.length} câu`);
  if (problems.length) {
    console.error(`✗ Zero-Answer Leak (live): ${problems.length} vấn đề`);
    problems.slice(0, 50).forEach((p) => console.error('  • ' + p));
    process.exit(1);
  }
  if (!tests.length && !questions.length) {
    console.error('✗ Không đọc được dòng nào — kiểm tra lại quyền view/anon key (không thể kết luận là sạch).');
    process.exit(1);
  }
  console.log('✓ Zero-Answer Leak (live): không thấy khoá đáp án trong view công khai.');
}

main().catch((e) => { console.error('✗ ' + (e && e.message ? e.message : e)); process.exit(1); });
