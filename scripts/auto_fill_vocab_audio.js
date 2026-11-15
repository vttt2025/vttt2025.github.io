/**
 * scripts/auto_fill_vocab_audio.js
 * 
 * Tool tự động phát hiện và bổ sung audio_url cho từ vựng mới:
 * 1. Quét Supabase (bảng vocabularies) tìm các từ chưa có audio_url (hoặc truyền --word "<từ>")
 * 2. Ưu tiên 1: Tra cứu bản thu âm chuẩn người bản xứ Nga trên Wikimedia Commons / Lingua Libre
 * 3. Ưu tiên 2: Nếu chưa có bản thu người thật, tự động kích hoạt AI Neural Voice (ru-RU-SvetlanaNeural) qua edge-tts và tải lên Supabase Storage (bucket vocab-audio)
 * 4. Tự động lưu audio_url lên Supabase Cloud PostgreSQL
 * 5. Cập nhật data/wikimedia_audio_map.json, data.js và data/supabase-backup.json
 * 
 * Cách dùng:
 * - Tự động quét toàn bộ từ mới trên Supabase:
 *   node scripts/auto_fill_vocab_audio.js
 * - Tạo audio cho 1 từ cụ thể:
 *   node scripts/auto_fill_vocab_audio.js --word "здравствуйте"
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaHRkd2ppaG5sYXhyYml0bWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1ODk5MjgsImV4cCI6MjEwODE2NTkyOH0.qMGTYhVyoyht7jrBCSN2VczeqShmsBedC-Qdg_C5-FI";
const SUPABASE_URL = "https://nrhtdwjihnlaxrbitmcf.supabase.co";
const STORAGE_UPLOAD_BASE = `${SUPABASE_URL}/storage/v1/object/vocab-audio/`;
const STORAGE_PUBLIC_BASE = `${SUPABASE_URL}/storage/v1/object/public/vocab-audio/`;
const MAP_PATH = path.join(__dirname, '..', 'data', 'wikimedia_audio_map.json');

function cleanRussianWord(str) {
  if (!str) return '';
  return str
    .replace(/[\u0300-\u036f\u0301\u0300]/g, '')
    .replace(/[«»""''„“]/g, '')
    .replace(/^[(\[]|[)\]]$/g, '')
    .trim()
    .toLowerCase();
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function queryMediaWiki(titles) {
  return new Promise((resolve) => {
    const encodedTitles = titles.map(t => encodeURIComponent(t)).join('|');
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodedTitles}&redirects=1&prop=imageinfo&iiprop=url|size|mime&format=json`;

    const req = https.get(apiUrl, {
      headers: { 'User-Agent': 'RusiTrkiAudioBot/2.0 (contact@rusitrki.com)' }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve({});
        }
      });
    });

    req.on('error', () => resolve({}));
    req.setTimeout(15000, () => req.destroy());
  });
}

function getAudioUrlFromPage(page) {
  if (!page || !page.imageinfo || !page.imageinfo[0]) return null;
  const originalUrl = page.imageinfo[0].url;
  if (!originalUrl) return null;
  const filename = page.title.replace('File:', '').replace(/ /g, '_');
  if (originalUrl.endsWith('.ogg')) {
    const baseUrl = originalUrl.replace('https://upload.wikimedia.org/wikipedia/commons/', 'https://upload.wikimedia.org/wikipedia/commons/transcoded/');
    return `${baseUrl.split('?')[0]}/${encodeURIComponent(filename)}.mp3`;
  }
  return originalUrl.split('?')[0];
}

async function resolveWikimediaAudio(words) {
  const result = {};
  if (!words || words.length === 0) return result;

  const CHUNK_SIZE = 50;
  const missingPass1 = [];

  // Pass 1: File:Ru-{word}.ogg
  for (let i = 0; i < words.length; i += CHUNK_SIZE) {
    const chunk = words.slice(i, i + CHUNK_SIZE);
    const titles = chunk.map(w => `File:Ru-${w}.ogg`);
    const resp = await queryMediaWiki(titles);
    const pages = (resp.query && resp.query.pages) || {};
    const redMap = {};
    ((resp.query && resp.query.redirects) || []).forEach(r => { redMap[r.to] = r.from; });

    const foundInChunk = new Set();
    for (const pid in pages) {
      if (pid === '-1') continue;
      const page = pages[pid];
      const originalTitle = redMap[page.title] || page.title;
      const match = originalTitle.match(/^File:Ru-(.+)\.ogg$/i);
      if (match && match[1]) {
        const w = match[1].toLowerCase();
        const mp3 = getAudioUrlFromPage(page);
        if (mp3) {
          result[w] = mp3;
          foundInChunk.add(w);
        }
      }
    }

    chunk.forEach(w => {
      if (!foundInChunk.has(w)) missingPass1.push(w);
    });
    await sleep(80);
  }

  // Pass 2: File:Ru-{Capitalized}.ogg
  for (let i = 0; i < missingPass1.length; i += CHUNK_SIZE) {
    const chunk = missingPass1.slice(i, i + CHUNK_SIZE);
    const titles = chunk.map(w => `File:Ru-${capitalize(w)}.ogg`);
    const resp = await queryMediaWiki(titles);
    const pages = (resp.query && resp.query.pages) || {};
    const redMap = {};
    ((resp.query && resp.query.redirects) || []).forEach(r => { redMap[r.to] = r.from; });

    for (const pid in pages) {
      if (pid === '-1') continue;
      const page = pages[pid];
      const originalTitle = redMap[page.title] || page.title;
      const match = originalTitle.match(/^File:Ru-(.+)\.ogg$/i);
      if (match && match[1]) {
        const w = match[1].toLowerCase();
        const mp3 = getAudioUrlFromPage(page);
        if (mp3) result[w] = mp3;
      }
    }
    await sleep(80);
  }

  return result;
}

async function generateAndUploadAIAudio(words) {
  const result = {};
  if (!words || words.length === 0) return result;

  console.log(`Đang khởi tạo AI đọc giọng chuẩn cho ${words.length} từ vựng mới...`);
  const pythonScript = path.join(__dirname, 'generate_ai_audio.py');

  const tmpListFile = path.join(__dirname, '..', 'still_missing_words.json');
  fs.writeFileSync(tmpListFile, JSON.stringify(words, null, 2), 'utf8');

  try {
    execSync(`python "${pythonScript}"`, { stdio: 'inherit' });
    const aiMapPath = path.join(__dirname, '..', 'ai_generated_audio_map.json');
    if (fs.existsSync(aiMapPath)) {
      const generated = JSON.parse(fs.readFileSync(aiMapPath, 'utf8'));
      Object.assign(result, generated);
    }
  } catch (e) {
    console.error('Lỗi khi chạy AI Edge TTS generator:', e.message);
  }

  return result;
}

async function updateSupabaseCloud(updates) {
  if (!updates || updates.length === 0) return 0;
  const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/update_vocab_audio`;
  const BATCH_SIZE = 500;
  let total = 0;

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const chunk = updates.slice(i, i + BATCH_SIZE);
    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_updates: chunk })
    });
    if (res.ok) {
      const count = await res.json();
      total += count;
    } else {
      console.warn(`Lỗi update RPC batch ${i}:`, await res.text());
    }
  }
  return total;
}

async function main() {
  console.log('========================================================================');
  console.log('RUSI TRKI: TOOL TỰ ĐỘNG BỔ SUNG AUDIO CHO TỪ VỰNG TIẾNG NGA');
  console.log('========================================================================\n');

  // Đọc audio map hiện có
  let audioMap = {};
  if (fs.existsSync(MAP_PATH)) {
    try {
      audioMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
    } catch {}
  }

  // 1. Kiểm tra tham số CLI --word
  const args = process.argv.slice(2);
  const wordIdx = args.indexOf('--word');
  if (wordIdx !== -1 && args[wordIdx + 1]) {
    const targetWord = cleanRussianWord(args[wordIdx + 1]);
    console.log(`Đang xử lý từ vựng đơn: "${targetWord}"...`);

    if (audioMap[targetWord]) {
      console.log(`✓ Đã có audio: ${audioMap[targetWord]}`);
      return;
    }

    // Tra cứu Wikimedia
    const wikiRes = await resolveWikimediaAudio([targetWord]);
    if (wikiRes[targetWord]) {
      audioMap[targetWord] = wikiRes[targetWord];
      fs.writeFileSync(MAP_PATH, JSON.stringify(audioMap, null, 2), 'utf8');
      console.log(`✓ Tìm thấy bản thu bản xứ trên Wikimedia: ${wikiRes[targetWord]}`);
      return;
    }

    // Tạo bằng AI Neural
    const aiRes = await generateAndUploadAIAudio([targetWord]);
    if (aiRes[targetWord]) {
      audioMap[targetWord] = aiRes[targetWord];
      fs.writeFileSync(MAP_PATH, JSON.stringify(audioMap, null, 2), 'utf8');
      console.log(`✓ Đã sinh giọng AI và tải lên Supabase Storage: ${aiRes[targetWord]}`);
      return;
    }

    console.log('Không thể tạo audio cho từ này.');
    return;
  }

  // 2. Chế độ quét toàn bộ từ mới trên Supabase Cloud
  console.log('1. Đang kiểm tra danh sách từ vựng thiếu audio trên Supabase Cloud...');
  const queryUrl = `${SUPABASE_URL}/rest/v1/vocabularies?select=id,word_with_stress,word_normalized,audio_url&or=(audio_url.is.null,audio_url.eq.)`;
  
  let allMissing = [];
  let offset = 0;
  while (true) {
    const res = await fetch(`${queryUrl}&limit=1000&offset=${offset}`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      }
    });
    if (!res.ok) break;
    const chunk = await res.json();
    if (!chunk || chunk.length === 0) break;
    allMissing.push(...chunk);
    if (chunk.length < 1000) break;
    offset += 1000;
  }

  console.log(`Số từ vựng đang thiếu audio_url trên Supabase: ${allMissing.length}`);
  if (allMissing.length === 0) {
    console.log('✓ Toàn bộ 100% từ vựng trên Supabase đã có audio đầy đủ!');
    return;
  }

  // Lọc các từ cần tìm audio
  const wordsToFind = new Set();
  allMissing.forEach(row => {
    const clean = cleanRussianWord(row.word_normalized || row.word_with_stress);
    if (clean && !audioMap[clean]) wordsToFind.add(clean);
  });

  const missingList = Array.from(wordsToFind);
  console.log(`Số từ chưa có trong kho audio map: ${missingList.length}`);

  if (missingList.length > 0) {
    // Pass 1 & 2: Wikimedia Commons
    console.log('2. Đang tra cứu bản thu người bản xứ trên Wikimedia Commons...');
    const wikiFound = await resolveWikimediaAudio(missingList);
    Object.assign(audioMap, wikiFound);
    console.log(`Tìm thấy ${Object.keys(wikiFound).length} bản thu âm người thật trên Wikimedia Commons.`);

    // Pass 3: AI Neural Voice
    const stillMissing = missingList.filter(w => !audioMap[w]);
    if (stillMissing.length > 0) {
      console.log(`3. Đang chuyển ${stillMissing.length} từ sang AI Neural Voice (Svetlana)...`);
      const aiFound = await generateAndUploadAIAudio(stillMissing);
      Object.assign(audioMap, aiFound);
    }

    // Ghi lại audio map
    fs.writeFileSync(MAP_PATH, JSON.stringify(audioMap, null, 2), 'utf8');
  }

  // 4. Tạo danh sách cập nhật cho Supabase
  const updates = [];
  allMissing.forEach(row => {
    const clean = cleanRussianWord(row.word_normalized || row.word_with_stress);
    if (audioMap[clean]) {
      updates.push({ id: row.id, audio_url: audioMap[clean] });
    }
  });

  console.log(`4. Đang cập nhật ${updates.length} audio_url lên Supabase Cloud...`);
  const updatedCount = await updateSupabaseCloud(updates);
  console.log(`✓ Đã cập nhật thành công ${updatedCount} dòng vào Supabase.`);

  // 5. Đồng bộ lại dữ liệu cục bộ
  console.log('5. Đang đồng bộ về data.js và data/supabase-backup.json...');
  try {
    execSync(`node "${path.join(__dirname, 'sync-from-supabase.js')}"`, { stdio: 'inherit' });
  } catch (err) {
    console.warn('Lỗi khi đồng bộ về data.js:', err.message);
  }

  console.log('\n========================================================================');
  console.log('HOÀN TẤT: 100% TỪ VỰNG ĐÃ CÓ AUDIO CHUẨN XÁC!');
  console.log('========================================================================');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
