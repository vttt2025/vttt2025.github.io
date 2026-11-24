/**
 * scripts/test_runtime_logic.js
 * Test suite verifying runtime logic behaviors across patched modules.
 */
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

console.log('\n--- RUNNING TARGETED RUNTIME LOGIC TESTS ---');
let passed = 0;

// ============================================================================
// 1. Test RusiMarkdown in app.js
// ============================================================================
const appJsCode = fs.readFileSync('app.js', 'utf8');
const rusiMarkdownMatch = appJsCode.match(/const RusiMarkdown = \{[\s\S]*?window\.RusiMarkdown = RusiMarkdown;/);
assert(rusiMarkdownMatch, 'RusiMarkdown code block must exist');

const rmSandbox = {
  window: {},
  esc: (s) => (s == null ? '' : String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')),
  console: console
};
vm.createContext(rmSandbox);
vm.runInContext(rusiMarkdownMatch[0], rmSandbox);
const RM = rmSandbox.window.RusiMarkdown;
assert(RM && typeof RM.render === 'function', 'RusiMarkdown.render must exist');

// 1a. <br/> must be preserved
const brHtml = RM.render('Dòng 1<br/>Dòng 2');
assert(brHtml.includes('<br/>') || brHtml.includes('<br>'), '<br/> should be preserved');
passed++;

// 1b. Dangerous script / iframe / javascript: must be sanitized
const xssHtml = RM.render('[Click me](javascript:alert(1)) <script>alert(1)</script>');
assert(!xssHtml.includes('<script>'), 'script tag must be sanitized');
assert(!xssHtml.includes('javascript:'), 'javascript: link must be sanitized');
passed++;

// 1c. Codeblock intact
const codeHtml = RM.render('```javascript\nconst a = 10;\n```');
assert(codeHtml.includes('<pre class="rusi-code-block">') && codeHtml.includes('const a = 10;'), 'Code block must be rendered');
passed++;

console.log('✓ 1. RusiMarkdown: XSS sanitized, <br/> preserved, codeblock intact.');

// ============================================================================
// 2. Test SRS module
// ============================================================================
const srsCode = fs.readFileSync('srs.js', 'utf8');
const srsSandbox = {
  window: {},
  localStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  },
  console: console
};
srsSandbox.window = srsSandbox;
srsSandbox.STORE = {
  get(k, fb) {
    const raw = srsSandbox.localStorage.getItem('trki_' + k);
    return raw ? JSON.parse(raw) : fb;
  },
  set(k, v) {
    srsSandbox.localStorage.setItem('trki_' + k, JSON.stringify(v));
  }
};
vm.createContext(srsSandbox);
vm.runInContext(srsCode, srsSandbox);

const SRS = srsSandbox.window.SRS;
assert(SRS && typeof SRS.cardId === 'function', 'SRS.cardId must exist');

// 2a. SRS.cardId normalization
const cid1 = SRS.cardId({ ru: 'соба́ка' });
const cid2 = SRS.cardId({ ru: 'собака' });
assert.strictEqual(cid1, cid2, 'SRS.cardId should strip stress marks');
passed++;

// 2b. markMastered and unmarkMastered
SRS.markMastered('соба́ка');
let state = SRS.getState();
assert(state.cards[cid1].mastered === true, 'Card should be marked mastered');
SRS.unmarkMastered(cid1);
state = SRS.getState();
assert(state.cards[cid1].mastered === false, 'Card should be unmastered');
passed++;

console.log('✓ 2. SRS: Stress-mark normalization, cardId, markMastered/unmarkMastered verified.');

// ============================================================================
// 3. Test getRusiRouteParam in app.js
// ============================================================================
assert(appJsCode.includes('window.getRusiRouteParam = function(key)'), 'getRusiRouteParam must be exported');
passed++;
console.log('✓ 3. getRusiRouteParam exported and available.');

// ============================================================================
// 4. Test DictData lookup with stress marks
// ============================================================================
const dictCode = fs.readFileSync('dict-data.js', 'utf8');
const dictSandbox = {
  window: {},
  location: { protocol: 'https:' },
  document: { addEventListener: () => {} },
  console: console
};
dictSandbox.window = dictSandbox;
dictSandbox.getRusiAppRoot = () => '';
vm.createContext(dictSandbox);
vm.runInContext(dictCode, dictSandbox);

const RusiDict = dictSandbox.window.RusiDict;
assert(RusiDict && typeof RusiDict.lookup === 'function', 'RusiDict.lookup must exist');
// Inject test word
RusiDict._cache['ru-vi'] = {
  map: new Map([['студент', { ru: 'студент', stress: 'студе́нт', vi: 'sinh viên' }]])
};
const foundWithStress = RusiDict.lookup('студе́нт');
assert(foundWithStress && foundWithStress.ru === 'студент', 'Lookup must find word with stress marks');
passed++;
console.log('✓ 4. DictData: lookup with stress marks verified.');

// ============================================================================
// 5. Test auth-page getRedirectTarget security
// ============================================================================
const authPageCode = fs.readFileSync('auth-page.js', 'utf8');
const authSandbox = {
  window: {},
  document: { readyState: 'complete', body: { dataset: { page: 'login' } }, addEventListener: () => {}, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [] },
  location: { origin: 'https://rusitrki.com', search: '', hash: '' },
  URLSearchParams,
  console: console
};
authSandbox.window = authSandbox;
vm.createContext(authSandbox);
try {
  vm.runInContext(authPageCode, authSandbox);
} catch (e) {
  console.log('authSandbox error:', e.message);
}
const getRedirectTarget = authSandbox.window.getRedirectTarget || authSandbox.getRedirectTarget;
assert(typeof getRedirectTarget === 'function', 'getRedirectTarget must exist');

// Dangerous redirects must fall back to default
assert.strictEqual(getRedirectTarget('javascript:alert(1)'), 'index.html');
assert.strictEqual(getRedirectTarget('data:text/html,test'), 'index.html');
assert.strictEqual(getRedirectTarget('https://evil.com/phish'), 'index.html');
assert.strictEqual(getRedirectTarget('//evil.com'), 'index.html');
// Valid relative redirects
assert.strictEqual(getRedirectTarget('mock-test.html?test=123'), 'mock-test.html?test=123');
assert.strictEqual(getRedirectTarget('vocabulary.html'), 'vocabulary.html');
// Absolute schemes are strictly rejected for security
assert.strictEqual(getRedirectTarget('https://rusitrki.com/vocabulary.html'), 'index.html');
passed++;
console.log('✓ 5. auth-page: Open-redirect protection strictly verified.');

// ============================================================================
// 6. Test zero answer keys in trki_bank.json
// ============================================================================
const trkiBankJson = JSON.parse(fs.readFileSync('data/modules/trki_bank.json', 'utf8'));
let officialKeyFound = 0;
let inlineCorrectAnswerFound = 0;
trkiBankJson.forEach(test => {
  if (test.official_key) officialKeyFound++;
  if (test.answers && Object.keys(test.answers).length > 0) inlineCorrectAnswerFound++;
  (test.parts || []).forEach(part => {
    (part.questions || []).forEach(q => {
      if (q.official_key) officialKeyFound++;
    });
  });
});
assert.strictEqual(officialKeyFound, 0, 'No official_key allowed in client-facing trki_bank.json');
assert.strictEqual(inlineCorrectAnswerFound, 0, 'No answers allowed in client-facing trki_bank.json');
passed++;
console.log('✓ 6. Security Zero-Answer Leak: 0 answer keys in data/modules/trki_bank.json.');

console.log(`\n======================================================`);
console.log(`✅ TẤT CẢ ${passed}/${passed} BÀI KIỂM TRA RUNTIME LOGIC ĐÃ VƯỢT QUA 100%!`);
console.log(`======================================================\n`);
