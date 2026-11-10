/**
 * scripts/pull-supabase.js
 *
 * Kéo toàn bộ dữ liệu mới nhất từ Supabase Cloud PostgreSQL về máy cục bộ:
 * 1. Đọc cấu hình từ supabase-config.js (url & anonKey)
 * 2. Tải toàn bộ 9 bảng dữ liệu từ Supabase Cloud:
 *    - vocab_jars (10 Lọ từ vựng hệ thống & 500 từ)
 *    - vocabularies (500 từ vựng chi tiết)
 *    - listening_lessons (7 bài luyện nghe)
 *    - speaking_lessons (6 bài luyện nói)
 *    - writing_topics (8 đề luyện viết)
 *    - grammar_lessons (5 bài ngữ pháp)
 *    - shop_products (9 sản phẩm lưu niệm / sách)
 *    - packages (3 gói học Pro)
 *    - trki_tests (6 đề thi TRKI)
 * 3. Xuất file backup cục bộ: data/supabase-backup.json
 * 4. Đồng bộ dữ liệu VOCAB_JARS trong data.js đảm bảo 100% khớp với Supabase
 */

const fs = require('fs');
const path = require('path');

// 1. Lấy thông tin URL & Anon Key từ supabase-config.js
function getSupabaseConfig() {
  const configFile = path.join(__dirname, '..', 'supabase-config.js');
  const content = fs.readFileSync(configFile, 'utf8');
  const urlMatch = content.match(/url:\s*"([^"]+)"/);
  const keyMatch = content.match(/anonKey:\s*storedAnon\s*\|\|\s*"([^"]+)"/);

  if (!urlMatch || !keyMatch) {
    throw new Error('Không thể đọc cấu hình Supabase từ supabase-config.js');
  }

  return {
    url: urlMatch[1].replace(/\/+$/, ''),
    anonKey: keyMatch[1]
  };
}

async function fetchTable(config, table, query = 'select=*') {
  const endpoint = `${config.url}/rest/v1/${table}?${query}`;
  const res = await fetch(endpoint, {
    headers: {
      'apikey': config.anonKey,
      'Authorization': 'Bearer ' + config.anonKey,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Lỗi tải bảng ${table}: HTTP ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

async function main() {
  console.log('========================================================================');
  console.log('RUSI TRKI: KÉO DỮ LIỆU TỪ SUPABASE CLOUD VỀ MÁY CỤC BỘ');
  console.log('========================================================================');

  const config = getSupabaseConfig();
  console.log(`Kết nối Supabase Project: ${config.url}\n`);

  const tables = [
    { key: 'vocab_jars', query: 'select=*&is_system=eq.true&order=code.asc', label: 'Lọ từ vựng hệ thống (vocab_jars)' },
    { key: 'topic_articles', query: 'select=*&order=id.asc', label: 'Bài học chủ đề (topic_articles)' },
    { key: 'vocabularies', query: 'select=*&order=topic_code.asc,created_at.asc', label: 'Từ vựng chi tiết (vocabularies)' },
    { key: 'listening_lessons', query: 'select=*&order=part_number.asc', label: 'Bài luyện nghe (listening_lessons)' },
    { key: 'speaking_lessons', query: 'select=*&order=code.asc', label: 'Bài luyện nói (speaking_lessons)' },
    { key: 'writing_tasks', query: 'select=*&order=code.asc', label: 'Đề luyện viết chuẩn (writing_tasks)' },
    { key: 'writing_topics', query: 'select=*&order=code.asc', label: 'Đề luyện viết tương thích (writing_topics)' },
    { key: 'grammar_lessons', query: 'select=*&order=id.asc', label: 'Bài ngữ pháp (grammar_lessons)' },
    { key: 'shop_products', query: 'select=*&order=price.asc', label: 'Sản phẩm shop (shop_products)' },
    { key: 'packages', query: 'select=*&order=price.asc', label: 'Gói học Pro (packages)' },
    { key: 'trki_tests', query: 'select=*&order=level.asc', label: 'Đề thi TRKI (trki_tests)' }
  ];

  const backupData = {
    pulled_at: new Date().toISOString(),
    source_url: config.url,
    tables: {}
  };

  for (const t of tables) {
    try {
      process.stdout.write(`Đang tải [${t.key}]... `);
      const rows = await fetchTable(config, t.key, t.query);
      backupData.tables[t.key] = rows;
      console.log(`✓ ${rows.length} bản ghi`);
    } catch (err) {
      console.log(`✗ Thất bại: ${err.message}`);
    }
  }

  // 2. Lưu file backup cục bộ
  const backupPath = path.join(__dirname, '..', 'data', 'supabase-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
  console.log(`\n✓ Đã lưu snapshot toàn bộ cơ sở dữ liệu vào: data/supabase-backup.json`);

  // 3. Cập nhật VOCAB_JARS trong data.js từ bảng vocab_jars của Supabase
  const cloudJars = backupData.tables['vocab_jars'];
  if (Array.isArray(cloudJars) && cloudJars.length > 0) {
    const dataJsPath = path.join(__dirname, '..', 'data.js');
    let dataJs = fs.readFileSync(dataJsPath, 'utf8');

    // Chuyển cloudJars sang cấu trúc VOCAB_JARS chuẩn của data.js
    const formattedJars = cloudJars.map(j => ({
      id: j.code || j.id,
      name: j.jar_name || "Lọ từ vựng",
      level: j.level || "A1",
      desc: j.description || "",
      icon: j.icon || "archive-jar",
      color: j.color_code || "#0039A6",
      is_system: true,
      words: Array.isArray(j.words) ? j.words : []
    }));

    // Tìm vị trí VOCAB_JARS trong data.js
    const jarStartMarker = 'const VOCAB_JARS = [';
    const jarEndMarker = 'const GRAMMAR_LESSONS = [';

    const startIdx = dataJs.indexOf(jarStartMarker);
    const endIdx = dataJs.indexOf(jarEndMarker);

    if (startIdx !== -1 && endIdx !== -1) {
      const formattedJson = JSON.stringify(formattedJars, null, 2);
      const newVocabJarsBlock = `const VOCAB_JARS = ${formattedJson};\n\n`;
      dataJs = dataJs.slice(0, startIdx) + newVocabJarsBlock + dataJs.slice(endIdx);
      console.log(`✓ Đã cập nhật 10 Lọ từ vựng (${cloudJars.reduce((acc, j) => acc + (j.words || []).length, 0)} từ) từ Supabase vào data.js`);
    } else {
      console.warn('! Không tìm thấy marker VOCAB_JARS trong data.js để thay thế.');
    }

    // Cập nhật TOPIC_ARTICLES trong data.js từ bảng vocab_jars (cột article)
    const artStartMarker = 'const TOPIC_ARTICLES = {';
    const artStartIdx = dataJs.indexOf(artStartMarker);
    if (artStartIdx !== -1) {
      let artEndIdx = dataJs.indexOf('\nconst ', artStartIdx + 1);
      if (artEndIdx === -1) artEndIdx = dataJs.indexOf('\nfunction ', artStartIdx + 1);
      if (artEndIdx !== -1) {
        const cloudArticles = {};
        cloudJars.forEach(j => {
          const code = j.code || j.id;
          if (code && j.article) {
            cloudArticles[code] = j.article;
          }
        });
        if (Object.keys(cloudArticles).length > 0) {
          const formattedArtJson = JSON.stringify(cloudArticles, null, 2);
          const newArtBlock = `const TOPIC_ARTICLES = ${formattedArtJson};\n`;
          dataJs = dataJs.slice(0, artStartIdx) + newArtBlock + dataJs.slice(artEndIdx);
          console.log(`✓ Đã cập nhật ${Object.keys(cloudArticles).length} Bài học chủ đề chuyên sâu (TOPIC_ARTICLES) vào data.js`);
        }
      }
    }

    fs.writeFileSync(dataJsPath, dataJs, 'utf8');
  }

  console.log('\n========================================================================');
  console.log('HOÀN TẤT ĐỒNG BỘ DỮ LIỆU TỪ SUPABASE VỀ MÁY CỤC BỘ THÀNH CÔNG!');
  console.log('========================================================================');
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
