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

// 1d. Định dạng trình soạn admin cần lưu lại đúng: căn lề bảng, \| trong ô, danh sách lồng, •, ol start, «»
const tbl = RM.render('| A | B |\n|:---:|---:|\n| `x \\| y` | 2 |');
assert(/<th data-align="center"/.test(tbl) && /<td data-align="right"/.test(tbl), 'table alignment kept');
assert((tbl.match(/<td/g) || []).length === 2 && tbl.includes('x | y'), 'escaped pipe stays inside one cell');
const nested = RM.render('- Cha\n  - Con\n- Cha 2').replace(/\s/g, '');
assert.strictEqual(nested, '<ulclass="rusi-md-ul"><li>Cha<ulclass="rusi-md-ul"><li>Con</li></ul></li><li>Cha2</li></ul>', 'nested list');
assert(RM.render('• a').includes('data-marker="•"'), '• marker remembered');
assert(RM.render('3. ba').includes('start="3"'), 'ordered list start');
assert(RM.render('«Привет»').includes('«Привет»'), 'guillemets kept');
passed++;

// 1e. Thẻ an toàn được phép (mark/span màu, audio) nhưng mọi biến thể nguy hiểm vẫn bị chặn
assert(RM.render('<mark style="background-color:#fef08a">x</mark>').includes('<mark style="background-color:#fef08a">x</mark>'), 'mark color');
assert(RM.render('<span style="color:rgb(220, 38, 38)">x</span>').includes('<span style="color:rgb(220, 38, 38)">x</span>'), 'span color');
assert(/<audio class="rusi-md-audio" controls preload="none" src="https:\/\/a\.b\/c\.mp3"><\/audio>/.test(RM.render('<audio controls src="https://a.b/c.mp3"></audio>')), 'audio https');
[
  '<mark style="background:url(javascript:alert(1))">x</mark>',
  '<mark onclick="alert(1)">x</mark>',
  '<span style="color:expression(alert(1))">x</span>',
  '<span style="color:red&quot; onmouseover=&quot;alert(1)">x</span>',
  '<audio controls src="javascript:alert(1)"></audio>',
  '<audio controls src="https://a/b.mp3" onerror="alert(1)"></audio>',
  '<audio controls src="data:audio/mp3;base64,AAAA"></audio>',
  '<mark><img src=x onerror=alert(1)></mark>',
  '| a |\n|---|\n| <svg onload=alert(1)> |',
].forEach((payload) => {
  const live = RM.render(payload).replace(/&lt;[\s\S]*?&gt;/g, '');
  assert(!/<(script|img|svg|iframe)\b|\son\w+\s*=|javascript:|expression\(|data:audio/i.test(live), 'XSS blocked: ' + payload);
});
passed++;

console.log('✓ 1. RusiMarkdown: XSS sanitized, <br/> preserved, codeblock intact, editor formats round-trip safely.');

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

// 2c. markMastered/unmarkMastered giữ vocab_mastered_words khớp với thẻ
SRS.markMastered('собака');
assert.deepStrictEqual(srsSandbox.STORE.get('vocab_mastered_words', []).length, 1, 'mastered list should contain the word');
SRS.unmarkMastered('Соба́ка');
assert.deepStrictEqual(srsSandbox.STORE.get('vocab_mastered_words', []), [], 'mastered list should be emptied');
passed++;

// 2d. Thẻ mang id srsd_<dk> vẫn được tìm theo chữ
const dkId = SRS.ensureCard({ ru: 'кошка', vi: 'con mèo', dk: 'k1' });
SRS.markMastered('кошка');
state = SRS.getState();
assert(state.cards[dkId].mastered === true, 'markMastered should resolve srsd_ card by word');
assert(!state.cards[SRS.cardId({ ru: 'кошка' })], 'no duplicate srs_ card should be created');
passed++;

// 2d2. +10 XP chỉ cộng lần đầu thuộc; markMastered nhận object từ và giữ nghĩa
{
  let xp = 0;
  srsSandbox.Progress = { addXp(n) { xp += n; } };
  vm.runInContext('var Progress = globalThis.Progress;', srsSandbox);
  SRS.markMastered({ ru: 'река́', vi: 'dòng sông', pos: 'сущ.' });
  const rkId = SRS.cardId({ ru: 'река' });
  assert.strictEqual(SRS.getState().cards[rkId].vi, 'dòng sông', 'card from word object keeps meaning');
  SRS.unmarkMastered(rkId);
  SRS.markMastered('река');
  SRS.unmarkMastered('река');
  SRS.markMastered({ ru: 'река', vi: 'dòng sông' });
  assert.strictEqual(xp, 10, 'mastered XP awarded once per card');
  delete srsSandbox.Progress;
  vm.runInContext('Progress = undefined;', srsSandbox);
  passed++;
}

// 2e. review(): requeue cho again/hard từ mới, ghi tổng lượt ôn, khoảng ôn đúng
const rid = SRS.ensureCard({ ru: 'дом', vi: 'nhà' });
let r = SRS.review(rid, 'again');
assert(r.requeue === true && r.nextIntervalH === 0, 'again on new card should requeue');
r = SRS.review(rid, 'good');
assert(r.requeue === false && r.nextIntervalH === 24, 'good on new card = 24h');
r = SRS.review(rid, 'good');
assert(r.nextIntervalH === 72, 'good on review card = interval x3');
assert(SRS.review(rid, 'bogus') === null, 'invalid rating should be ignored');
assert.strictEqual(srsSandbox.STORE.get('srs_totalReviews', 0), 3, 'recordReview should count reviews');
assert.strictEqual(srsSandbox.STORE.get('srs_totalCorrect', 0), 2, 'recordReview should count correct');
assert(SRS.getState().cards[rid].updatedAt > 0, 'card should carry updatedAt');
passed++;

console.log('✓ 2. SRS: Stress-mark normalization, cardId, markMastered/unmarkMastered, review/requeue verified.');

// ============================================================================
// 2b. Test vocab-sync.js merge
// ============================================================================
{
  const data = {};
  const sb = { console };
  sb.window = sb;
  sb.CustomEvent = function () {};
  sb.STORE = {
    get(k, fb) { return k in data ? JSON.parse(data[k]) : fb; },
    set(k, v) { this._write(k, v); data.vocab_changed_at = JSON.stringify(Date.now()); },
    _write(k, v) { if (v === null || v === undefined) delete data[k]; else data[k] = JSON.stringify(v); return true; }
  };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync('vocab-sync.js', 'utf8'), sb);
  const VS = sb.window.RusiVocabSync;

  // Máy mới có 1 thẻ + 1 lọ chưa từng đồng bộ; cloud có thẻ khác, thẻ trùng mới hơn và lọ khác
  sb.STORE._write('srs', { cards: {
    a: { id: 'a', ru: 'а', ex: 'пример', updatedAt: 100 },
    b: { id: 'b', ru: 'б', updatedAt: 500, mastered: true }
  } });
  sb.STORE._write('custom_jars', [{ id: 'j1', words: [] }]);
  VS._merge({
    v: 1, updatedAt: 1000,
    srs: { cards: { a: { id: 'a', ru: 'а', updatedAt: 200, interval: 24 }, c: { id: 'c', ru: 'в', updatedAt: 300 } }, resetAt: 0 },
    totals: { reviews: 7, correct: 5 },
    custom_jars: [{ id: 'j2', words: [] }], starred: [], mastered_words: []
  });
  const merged = sb.STORE.get('srs');
  assert.strictEqual(merged.cards.a.interval, 24, 'newer remote card wins');
  assert.strictEqual(merged.cards.a.ex, 'пример', 'local-only fields kept on merge');
  assert(merged.cards.b && merged.cards.c, 'cards from both sides kept');
  assert.deepStrictEqual(sb.STORE.get('custom_jars').map(j => j.id), ['j1', 'j2'], 'first sync unions jars');
  assert.deepStrictEqual(sb.STORE.get('vocab_mastered_words'), ['б'], 'mastered cards added to mastered list');
  assert.strictEqual(sb.STORE.get('srs_totalReviews'), 7, 'totals take max');
  assert(VS.isDirty(), 'local had unsynced data → must push merged result');
  // Máy kia nhanh giờ 10 phút: bản gộp vẫn phải được đẩy lên (CHANGED > SYNCED dù đồng hồ máy này chậm hơn)
  {
    const savedSynced = sb.STORE.get('vocab_synced_at', 0), savedChanged = sb.STORE.get('vocab_changed_at', 0);
    sb.STORE._write('vocab_synced_at', 1); sb.STORE._write('vocab_changed_at', 5);
    VS._merge({ v: 1, updatedAt: Date.now() + 600000, srs: { cards: {}, resetAt: 0 }, custom_jars: [], starred: [], mastered_words: [] });
    assert(VS.isDirty(), 'remote clock ahead → merged local changes still marked dirty');
    sb.STORE._write('vocab_synced_at', savedSynced); sb.STORE._write('vocab_changed_at', savedChanged);
  }
  passed++;

  // resetAt từ cloud xoá các thẻ cũ hơn
  sb.STORE._write('vocab_synced_at', 1000);
  sb.STORE._write('vocab_changed_at', 1000);
  VS._merge({ v: 1, updatedAt: 2000, srs: { cards: {}, resetAt: 400 }, custom_jars: [], starred: [], mastered_words: [] });
  assert.deepStrictEqual(Object.keys(sb.STORE.get('srs').cards), ['b'], 'cards older than resetAt dropped');
  assert.deepStrictEqual(sb.STORE.get('custom_jars'), [], 'clean local takes remote lists');
  assert(!VS.isDirty(), 'clean local stays clean after pull');
  assert.strictEqual(VS.payloadForPush(), null, 'never push before a successful pull');
  passed++;

  // Máy mới tự tạo "Lọ yêu thích" rỗng trước khi kéo về → không được đè lọ cùng id có từ trên cloud.
  // Thẻ đã bỏ thuộc ở máy khác (updatedAt mới hơn) phải bị gỡ khỏi danh sách đã thuộc.
  sb.STORE._write('vocab_synced_at', 0);
  sb.STORE._write('vocab_changed_at', 3000);
  sb.STORE._write('custom_jars', [{ id: 'custom-jar-default', words: [] }]);
  sb.STORE._write('vocab_mastered_words', ['б']);
  VS._merge({
    v: 1, updatedAt: 4000,
    srs: { cards: { b: { id: 'b', ru: 'б', updatedAt: 3500, mastered: false } }, resetAt: 0 },
    custom_jars: [{ id: 'custom-jar-default', words: [{ ru: 'любовь' }] }], starred: [], mastered_words: []
  });
  assert.deepStrictEqual(sb.STORE.get('custom_jars')[0].words.map(w => w.ru), ['любовь'], 'default jar keeps cloud words');
  assert.deepStrictEqual(sb.STORE.get('vocab_mastered_words'), [], 'unmastered card removes word from mastered list');
  passed++;

  // Gộp 3 chiều với BASE: mục máy này xoá không quay lại, mục máy khác thêm được giữ, mục máy này thêm được giữ
  {
    sb.STORE._write('vocab_synced_at', 5000);
    sb.STORE._write('vocab_changed_at', 6000);
    sb.STORE._write('vocab_sync_base', { custom_jars: [{ id: 'j1', words: [{ ru: 'a' }, { ru: 'b' }] }, { id: 'jdel', words: [] }], starred: ['x', 'y'], mastered_words: [] });
    sb.STORE._write('custom_jars', [{ id: 'j1', words: [{ ru: 'a' }, { ru: 'c' }] }, { id: 'jnew', words: [] }]);
    sb.STORE._write('quizlet_starred', ['y', 'z']);
    sb.STORE._write('vocab_mastered_words', []);
    VS._merge({
      v: 1, updatedAt: 7000, srs: { cards: {}, resetAt: 0 },
      custom_jars: [{ id: 'j1', words: [{ ru: 'a' }, { ru: 'b' }, { ru: 'd' }] }, { id: 'jdel', words: [] }, { id: 'jremote', words: [] }],
      starred: ['x', 'y', 'w'], mastered_words: []
    });
    const jars = sb.STORE.get('custom_jars');
    assert.deepStrictEqual(jars.map(j => j.id).sort(), ['j1', 'jnew', 'jremote'], '3-way: deleted jar stays deleted, both sides\' new jars kept');
    assert.deepStrictEqual(jars.find(j => j.id === 'j1').words.map(w => w.ru).sort(), ['a', 'c', 'd'], '3-way: words merged inside jar');
    assert.deepStrictEqual(sb.STORE.get('quizlet_starred').sort(), ['w', 'y', 'z'], '3-way: unstarred word not resurrected');
    assert(VS.isDirty(), '3-way merge result must be pushed');
    assert.strictEqual(VS.payloadForPush('someone-else'), null, 'never push for an account that was not pulled');
  }
  passed++;

  // Thẻ gửi lên không mang câu ví dụ
  const built = VS._build();
  assert(!('ex' in (built.srs.cards.b || {})), 'payload strips ex');
  passed++;
  console.log('✓ 2b. vocab-sync: per-card merge, resetAt, first-sync union, push gating verified.');
}

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
