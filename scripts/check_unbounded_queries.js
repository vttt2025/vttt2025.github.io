/**
 * check_unbounded_queries.js — Quy tắc tĩnh 0-Egress cho supabase-client.js.
 * Mọi chuỗi đọc `.from("bảng")...select(...)` phải có ít nhất một giới hạn trong chính chuỗi đó:
 * .limit / .range / .eq / .in / .single / .maybeSingle. Chuỗi ghi (insert/upsert/update/delete ... .select())
 * chỉ trả lại các dòng vừa ghi nên được bỏ qua.
 * Ngoại lệ phải nằm trong ALLOWLIST kèm lý do; mục thừa (không còn khớp) cũng bị báo để danh sách không mục.
 *
 * Dùng: node scripts/check_unbounded_queries.js  (được verify_clean_code.js / npm test gọi)
 */
const fs = require('fs');
const path = require('path');

const BOUND_RE = /\.(limit|range|eq|in|single|maybeSingle)\(/;
const WRITE_RE = /\.(insert|upsert|update|delete)\(/;

// Khoá = "<bảng>@<tên hàm bao ngoài gần nhất>" (không dùng số dòng để không vỡ khi file đổi).
const ALLOWLIST = {
  'profiles@testConnection': 'select("id", { head: true }) — chỉ đếm, không tải dòng nào.',
  'blog_posts@getAll': 'Fallback chỉ khi BLOG_POSTS tích hợp sẵn trong data.js trống (page-blog.js, blog-post.html); bảng nhỏ.',
  'shop_products@getAll': 'Fallback page-shop.js chỉ khi SHOP_PRODUCTS tích hợp sẵn trống; bảng nhỏ.',
  'packages@getAll': 'Fallback page-upgrade.js chỉ khi PACKAGES tích hợp sẵn trống; bảng vài gói cước.'
};

/** Cắt chuỗi lệnh bắt đầu từ `.from(` tới `;` hoặc `,`/ngoặc đóng ở cùng cấp. */
function extractChains(src) {
  const out = [];
  const re = /\.from\(\s*["'`]([a-zA-Z_]+)["'`]\s*\)/g;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    let depth = 0;
    let inStr = null;
    for (; i < src.length; i++) {
      const c = src[i];
      if (inStr) {
        if (c === '\\') { i++; continue; }
        if (c === inStr) inStr = null;
        continue;
      }
      if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
      if (c === '(' || c === '[' || c === '{') depth++;
      else if (c === ')' || c === ']' || c === '}') { if (depth === 0) break; depth--; }
      else if ((c === ';' || c === ',') && depth === 0) break;
    }
    const before = src.slice(0, m.index);
    const line = before.split('\n').length;
    // Tên hàm bao ngoài gần nhất: "ten: async function" / "ten: function" / "function ten("
    const fnRe = /(?:([A-Za-z_$][\w$]*)\s*:\s*(?:async\s+)?function\b|function\s+([A-Za-z_$][\w$]*)\s*\()/g;
    let fn = '?';
    let f;
    while ((f = fnRe.exec(before))) fn = f[1] || f[2];
    out.push({ table: m[1], fn, line, chain: src.slice(m.index, i) });
  }
  return out;
}

function checkUnboundedQueries(file) {
  const src = fs.readFileSync(file, 'utf8');
  const violations = [];
  const usedAllow = new Set();
  for (const c of extractChains(src)) {
    if (!/\.select\(/.test(c.chain) || WRITE_RE.test(c.chain) || BOUND_RE.test(c.chain)) continue;
    const key = `${c.table}@${c.fn}`;
    if (ALLOWLIST[key]) { usedAllow.add(key); continue; }
    violations.push(`${path.basename(file)}:${c.line} ${key} — select không có .limit/.range/.eq/.in/.single/.maybeSingle`);
  }
  const stale = Object.keys(ALLOWLIST).filter((k) => !usedAllow.has(k));
  return { violations, stale };
}

module.exports = { checkUnboundedQueries, extractChains, ALLOWLIST };

if (require.main === module) {
  const { violations, stale } = checkUnboundedQueries(path.join(__dirname, '..', 'supabase-client.js'));
  violations.forEach((v) => console.error('✗ ' + v));
  stale.forEach((k) => console.error(`✗ ALLOWLIST thừa (không còn truy vấn khớp): ${k}`));
  if (violations.length || stale.length) process.exit(1);
  console.log('✓ 0-Egress: mọi truy vấn đọc trong supabase-client.js đều có giới hạn hoặc nằm trong danh sách cho phép.');
}
