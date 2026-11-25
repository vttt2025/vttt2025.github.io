const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../styles.css');
const dstPath = path.resolve(__dirname, '../styles.min.css');

const css = fs.readFileSync(srcPath, 'utf8');

function safeMinifyCss(src) {
  // 1. Remove comments
  src = src.replace(/\/\*[\s\S]*?\*\//g, '');
  // 2. Normalize newlines
  src = src.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // 3. Trim lines and remove empties
  src = src.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  // 4. Safe whitespace collapse around structural delimiters
  src = src.replace(/\s*\{\s*/g, '{');
  src = src.replace(/\s*\}\s*/g, '}');
  src = src.replace(/\s*;\s*/g, ';');
  src = src.replace(/;\}/g, '}');
  src = src.replace(/\s*,\s*/g, ',');
  src = src.replace(/\s*>\s*/g, '>');
  src = src.replace(/:\s+/g, ':');
  return src.trim();
}

const minified = safeMinifyCss(css);
fs.writeFileSync(dstPath, minified, 'utf8');
console.log(`Successfully generated styles.min.css (${minified.length} bytes from ${css.length} bytes).`);
