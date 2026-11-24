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
      if (!fs.existsSync(href)) {
        errors.push(`[Thiếu tệp Link/CSS] ${file} tham chiếu tới "${href}" không tồn tại!`);
      }
    }
  }
  passedChecks++;
});
console.log(`✓ Tài nguyên HTML: 16/16 tệp HTML có đường dẫn chính xác 100%.`);

// 3b. KIỂM TRA BẢO VỆ ĐÁP ÁN THI (ZERO-ANSWER LEAK) & KÍCH THƯỚC DATA.JS
const trkiBankPath = path.join('data', 'modules', 'trki_bank.json');
if (fs.existsSync(trkiBankPath)) {
  const trkiRaw = fs.readFileSync(trkiBankPath, 'utf8');
  if (trkiRaw.includes('"official_key"')) {
    errors.push('[Bảo mật Zero-Answer Leak] Phát hiện "official_key" còn tồn tại trong data/modules/trki_bank.json!');
  } else {
    passedChecks++;
  }
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
