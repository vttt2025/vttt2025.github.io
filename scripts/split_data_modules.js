/**
 * scripts/split_data_modules.js
 * Trích xuất 100% dữ liệu gốc từ data.js vào các file JSON độc lập trong thư mục data/modules/
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA_JS_PATH = path.join(__dirname, '..', 'data.js');
const MODULES_DIR = path.join(__dirname, '..', 'data', 'modules');

if (!fs.existsSync(MODULES_DIR)) {
  fs.mkdirSync(MODULES_DIR, { recursive: true });
}

console.log('[Split] Đang nạp data.js vào môi trường an toàn...');
const code = fs.readFileSync(DATA_JS_PATH, 'utf8');

const sandbox = {
  window: {},
  console: console
};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const win = sandbox.window;

const MODULES = [
  { key: 'VOCAB_JARS', file: 'vocab_jars.json' },
  { key: 'VOCABULARIES', file: 'vocabularies.json' },
  { key: 'TOPIC_ARTICLES', file: 'topic_articles.json' },
  { key: 'VOCAB_LESSONS', file: 'vocab_lessons.json' },
  { key: 'LISTENING_LESSONS', file: 'listening_lessons.json' },
  { key: 'SPEAKING_SETS', file: 'speaking_sets.json' },
  { key: 'WRITING_TASKS', file: 'writing_tasks.json' },
  { key: 'WRITING_TOPICS', file: 'writing_topics.json' },
  { key: 'TRKI_BANK', file: 'trki_bank.json' },
  { key: 'TRKI_QUESTION_BANK', file: 'trki_questions.json' },
  { key: 'SHOP_PRODUCTS', file: 'shop_products.json' },
  { key: 'PACKAGES', file: 'packages.json' },
  { key: 'GRAMMAR_LESSONS', file: 'grammar_lessons.json' },
  { key: 'BLOG_POSTS', file: 'blog_posts.json' }
];

let totalBytes = 0;

MODULES.forEach(m => {
  const data = win[m.key];
  if (data !== undefined) {
    const targetPath = path.join(MODULES_DIR, m.file);
    const jsonStr = JSON.stringify(data);
    fs.writeFileSync(targetPath, jsonStr, 'utf8');
    const bytes = fs.statSync(targetPath).size;
    totalBytes += bytes;
    const count = Array.isArray(data) ? data.length : Object.keys(data).length;
    console.log(`[OK] ${m.file.padEnd(25)} : ${String(count).padStart(5)} mục | ${(bytes / 1024).toFixed(1)} KB`);
  } else {
    console.warn(`[Cảnh báo] Không tìm thấy dữ liệu cho ${m.key}`);
  }
});

console.log(`\n[Hoàn thành] Đã xuất 14 modules. Tổng dung lượng: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
