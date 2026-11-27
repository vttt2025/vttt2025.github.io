#!/usr/bin/env node
/**
 * Rà chữ bị trộn bảng chữ (Latin/Việt ↔ Kirin) và dấu trọng âm đặt sai trong nội dung đã xuất bản
 * (data/modules/*.json — bản sao từ Supabase), rồi đề xuất bản sửa để người duyệt.
 * CHỈ ĐỌC: không sửa file nào ngoài báo cáo; việc sửa thật làm trên Supabase sau khi duyệt.
 *
 *   node scripts/audit-mixed-script.js [thư_mục_ra]      (mặc định: reports/)
 *
 * Ra: mixed-script-review.md (để đọc/duyệt) + mixed-script-review.json (để dựng migration).
 * Loại:
 *   vi       — từ tiếng Việt gõ lẫn chữ Kirin (vd "sа́ch")      → đổi sang chữ Latin, ghép dấu
 *   ru       — từ tiếng Nga lẫn chữ Latin trông giống (vd "нa") → đổi sang chữ Kirin
 *   context  — từ chỉ gồm chữ trông giống nhau, đoán theo các từ xung quanh
 *   manual   — có chữ Latin/Kirin không thể đổi tự động (vd "проspéкт") → sửa tay
 *   stress   — dấu trọng âm đặt sau phụ âm/dấu mềm (vd "деть́ми") → sửa tay
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.resolve(ROOT, process.argv[2] || "reports");
const MOD = (f) => path.join(ROOT, "data", "modules", f);

const ACUTE = "́";
// Cặp chữ trông giống nhau Kirin → Latin
const CYR2LAT = { "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "А": "A", "В": "B", "Е": "E", "К": "K", "М": "M", "Н": "H", "О": "O", "Р": "P", "С": "C", "Т": "T", "Х": "X" };
const LAT2CYR = Object.fromEntries(Object.entries(CYR2LAT).map(([c, l]) => [l, c]));
const RU_VOWELS = "аеёиоуыэюяАЕЁИОУЫЭЮЯ";
const isCyr = (ch) => /[Ѐ-ӿ]/.test(ch);
const isLat = (ch) => /[A-Za-zÀ-ɏḀ-ỿ]/.test(ch);
const isMark = (ch) => /[̀-ͯ]/.test(ch);
// Dấu thanh / dấu phụ chỉ có trong tiếng Việt (sau NFD); U+0301/U+0300 dùng chung với trọng âm Nga, U+0308 là ё
const VI_MARKS = /[̛̣̂̃̆̉]/;
/** Có dấu riêng tiếng Việt gắn vào chữ Latin (й = и + U+0306 khi tách dấu nên không xét chữ Kirin). */
function hasViMarks(nfd) {
  let base = "";
  for (const ch of nfd) {
    if (!isMark(ch)) { base = ch; continue; }
    if (VI_MARKS.test(ch) && isLat(base)) return true;
  }
  return false;
}
const TOKEN = /[A-Za-zÀ-ɏḀ-ỿЀ-ӿ̀-ͯ]+/g;

/** Module → bảng nguồn và các nhánh bỏ qua (dữ liệu nhân bản từ bảng khác). */
const SOURCES = [
  { file: "topic_articles.json", table: "topic_articles" },
  { file: "vocabularies.json", table: "vocabularies" },
  { file: "vocab_jars.json", table: "vocab_jars", skip: /^(article|words)(\.|$)/ },
  { file: "vocab_lessons.json", table: "vocab_lessons" },
  { file: "grammar_lessons.json", table: "grammar_lessons" },
  { file: "trki_bank.json", table: "trki_tests / trki_question_bank" },
  { file: "trki_index.json", table: "trki_tests" },
  { file: "listening_lessons.json", table: "listening_lessons", skip: /^vocab_items(\.|$)/ },
  { file: "listening_topics.json", table: "listening_topics" },
  { file: "speaking_sets.json", table: "speaking_lessons" },
  { file: "writing_tasks.json", table: "writing_tasks" },
  { file: "writing_topics.json", table: "writing_topics" },
  { file: "blog_posts.json", table: "blog_posts" },
  { file: "packages.json", table: "packages" },
  { file: "shop_products.json", table: "shop_products" }
];

function mapLetters(nfd, map) {
  let out = "";
  for (const ch of nfd) out += map[ch] || ch;
  return out.normalize("NFC");
}

function classify(token) {
  const d = token.normalize("NFD");
  let hasLat = false, hasCyr = false, latFixed = 0, cyrFixed = 0;
  for (const ch of d) {
    if (isMark(ch)) continue;
    if (isLat(ch)) { hasLat = true; if (!LAT2CYR[ch]) latFixed++; }
    else if (isCyr(ch)) { hasCyr = true; if (!CYR2LAT[ch]) cyrFixed++; }
  }
  if (!(hasLat && hasCyr)) return null;
  const viMarks = hasViMarks(d);
  if ((latFixed > 0 || viMarks) && cyrFixed === 0) return { kind: "vi", after: mapLetters(d, CYR2LAT) };
  if (cyrFixed > 0 && latFixed === 0 && !viMarks) {
    const after = mapLetters(d, LAT2CYR);
    // Chữ hoa giữa từ thường (vd "свяH") — thường là lỗi nhận dạng chữ, không đoán
    if (/[а-яё][А-ЯЁ]/.test(after)) return { kind: "manual", after: "", note: "chữ hoa giữa từ" };
    return { kind: "ru", after };
  }
  if (latFixed === 0 && cyrFixed === 0) return { kind: "context", after: "" };
  return { kind: "manual", after: "", note: "chữ Latin và Kirin không đổi tự động được" };
}

function scriptOf(word) {
  const d = word.normalize("NFD");
  let c = 0, l = 0;
  for (const ch of d) { if (isCyr(ch) && !CYR2LAT[ch]) c++; else if (isLat(ch) && !LAT2CYR[ch]) l++; }
  if (hasViMarks(d) || l > c) return "vi";
  return c > l ? "ru" : "";
}
/** Bảng chữ theo từ đứng liền trước (rồi liền sau) trong cùng câu: "ru" | "vi" | "" */
function neighbourScript(text, start, end) {
  const before = Array.from(text.slice(Math.max(0, start - 60), start).matchAll(TOKEN)).map((m) => m[0]).reverse();
  const after = Array.from(text.slice(end, end + 60).matchAll(TOKEN)).map((m) => m[0]);
  for (const w of [before[0], after[0], before[1], after[1]]) {
    const s = w ? scriptOf(w) : "";
    if (s) return s;
  }
  return "";
}

function stressOnConsonant(token) {
  const d = token.normalize("NFD");
  if (!/[Ѐ-ӿ]/.test(d) || !d.includes(ACUTE)) return false;
  const chars = Array.from(d);
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] !== ACUTE) continue;
    let j = i - 1;
    while (j >= 0 && isMark(chars[j])) j--;
    if (j < 0) return true;
    if (isCyr(chars[j]) && !RU_VOWELS.includes(chars[j])) return true;
  }
  return false;
}

const findings = new Map(); // key = kind|before|after
function record(kind, before, after, note, occ) {
  const key = kind + "|" + before + "|" + after;
  if (!findings.has(key)) findings.set(key, { kind, before, after, note: note || "", count: 0, tables: new Set(), occurrences: [] });
  const f = findings.get(key);
  f.count++;
  f.tables.add(occ.table);
  if (f.occurrences.length < 5) f.occurrences.push(occ);
}

function scanText(text, ctx) {
  for (const m of text.matchAll(TOKEN)) {
    const token = m[0];
    const start = m.index, end = start + token.length;
    const occ = () => ({
      table: ctx.table, file: ctx.file, record: ctx.record, field: ctx.field,
      context: text.slice(Math.max(0, start - 30), start).replace(/\s+/g, " ") + "⟦" + token + "⟧" + text.slice(end, end + 30).replace(/\s+/g, " ")
    });
    // Chuỗi "\nГ" trong sơ đồ Mermaid: "\n" là xuống dòng, không phải chữ
    if (text[start - 1] === "\\" && token[0] === "n") continue;
    const c = classify(token);
    if (c) {
      if (c.kind === "context") {
        // Nằm gọn trong ngoặc đơn sau từ tiếng Nga = phần dịch tiếng Việt, vd "Ры́ба (cа́)"
        const s = (text[start - 1] === "(" && text[end] === ")") ? "vi" : neighbourScript(text, start, end);
        const after = s ? mapLetters(token.normalize("NFD"), s === "ru" ? LAT2CYR : CYR2LAT) : "";
        record("context", token, after, s ? "theo từ xung quanh: " + (s === "ru" ? "tiếng Nga" : "tiếng Việt") : "không đoán được", occ());
      } else {
        record(c.kind, token, c.after, c.note, occ());
      }
      continue;
    }
    if (stressOnConsonant(token)) record("stress", token, "", "dấu trọng âm sau phụ âm", occ());
  }
}

function walk(node, ctx, field) {
  if (typeof node === "string") { scanText(node, { ...ctx, field }); return; }
  if (Array.isArray(node)) { node.forEach((v) => walk(v, ctx, field)); return; }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      const f = field ? field + "." + k : k;
      if (ctx.skip && ctx.skip.test(f)) continue;
      walk(v, ctx, f);
    }
  }
}

for (const src of SOURCES) {
  const p = MOD(src.file);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  const records = Array.isArray(data) ? data.map((r, i) => [r, i]) : Object.entries(data).map(([k, r]) => [r, k]);
  for (const [rec, idx] of records) {
    const id = (rec && (rec.code || rec.slug || rec.id || rec.uuid)) || String(idx);
    walk(rec, { table: src.table, file: src.file, record: String(id), skip: src.skip }, "");
  }
}

// ---------------- Xuất báo cáo ----------------
const KINDS = [
  ["vi", "Từ tiếng Việt gõ lẫn chữ Kirin → đổi sang chữ Latin (tự động)"],
  ["ru", "Từ tiếng Nga lẫn chữ Latin → đổi sang chữ Kirin (tự động)"],
  ["context", "Chỉ gồm chữ trông giống nhau → đoán theo từ xung quanh (cần xem)"],
  ["manual", "Không sửa tự động được → cần sửa tay"],
  ["stress", "Dấu trọng âm đặt sau phụ âm / dấu mềm → cần sửa tay"]
];
const list = Array.from(findings.values()).sort((a, b) => b.count - a.count || a.before.localeCompare(b.before));
const cell = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
const show = (s) => (s ? "`" + s + "`" : "—");

let md = "# Rà chữ trộn bảng chữ & dấu trọng âm\n\n";
md += "Nguồn: `data/modules/*.json` (bản xuất bản từ Supabase) — " + new Date().toISOString().slice(0, 10) + ". ";
md += "Bài viết và từ trong `vocab_jars.json` không quét lại (lấy từ `topic_articles` / `vocabularies`).\n\n";
md += "Cách đọc: ⟦…⟧ là chỗ cần sửa trong câu. Cột *Sau* để trống nghĩa là phải sửa tay. Mỗi dòng là một cặp trước→sau, gộp mọi lần xuất hiện.\n\n";
md += "## Tổng quan\n\n| Loại | Số cặp khác nhau | Số lần xuất hiện |\n|---|---:|---:|\n";
for (const [k, label] of KINDS) {
  const items = list.filter((f) => f.kind === k);
  md += `| ${label} | ${items.length} | ${items.reduce((s, f) => s + f.count, 0)} |\n`;
}
const byTable = {};
list.forEach((f) => f.tables.forEach((t) => { byTable[t] = (byTable[t] || 0) + f.count; }));
md += "\n**Theo bảng:** " + Object.entries(byTable).sort((a, b) => b[1] - a[1]).map(([t, n]) => `\`${t}\` ${n}`).join(" · ") + "\n";

for (const [k, label] of KINDS) {
  const items = list.filter((f) => f.kind === k);
  if (!items.length) continue;
  md += `\n## ${label} (${items.length})\n\n| # | Trước | Sau | Lần | Bảng | Ghi chú | Ví dụ |\n|---:|---|---|---:|---|---|---|\n`;
  items.forEach((f, i) => {
    const o = f.occurrences[0];
    md += `| ${i + 1} | ${show(cell(f.before))} | ${show(cell(f.after))} | ${f.count} | ${cell(Array.from(f.tables).join(", "))} | ${cell(f.note)} | ${cell(o.record + " · " + o.field + ": " + o.context)} |\n`;
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "mixed-script-review.md"), md, "utf8");
fs.writeFileSync(path.join(OUT_DIR, "mixed-script-review.json"),
  JSON.stringify(list.map((f) => ({ ...f, tables: Array.from(f.tables) })), null, 2), "utf8");

const sum = KINDS.map(([k]) => k + "=" + list.filter((f) => f.kind === k).reduce((s, f) => s + f.count, 0)).join(" ");
console.log("Đã ghi " + path.relative(ROOT, OUT_DIR) + "/mixed-script-review.{md,json} — " + list.length + " cặp; " + sum);
