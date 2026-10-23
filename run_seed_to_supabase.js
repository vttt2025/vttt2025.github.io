const fs = require('fs');
const https = require('https');

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN || '';
const PROJECT_REF = 'nrhtdwjihnlaxrbitmcf';

function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });
    const req = https.request(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (_) {
            resolve(body);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("=== BẮT ĐẦU NẠP DỮ LIỆU VÀO SUPABASE ===");

  // 0. Xóa dữ liệu cũ để tránh trùng lặp
  console.log("\n0. Dọn dẹp dữ liệu cũ...");
  await executeQuery("DELETE FROM vocabularies; DELETE FROM vocab_jars WHERE is_system = true;");
  console.log("✅ Đã dọn dẹp bảng vocabularies và vocab_jars!");

  // 1. Nạp vocab_jars (10 topics)
  console.log("\n1. Đang nạp 10 chủ đề vào bảng vocab_jars...");
  const jarsSql = fs.readFileSync('batch_jars.sql', 'utf8');
  await executeQuery(jarsSql);
  console.log("✅ Đã nạp thành công 10 chủ đề vào vocab_jars!");

  // 2. Nạp vocabularies (6 batches)
  const vocabFiles = [
    'batch_vocab_1.sql',
    'batch_vocab_2.sql',
    'batch_vocab_3.sql',
    'batch_vocab_4.sql',
    'batch_vocab_5.sql',
    'batch_vocab_6.sql'
  ];

  for (let i = 0; i < vocabFiles.length; i++) {
    const file = vocabFiles[i];
    console.log(`\n2.${i + 1}. Đang nạp từ vựng từ ${file}...`);
    const sql = fs.readFileSync(file, 'utf8');
    await executeQuery(sql);
    console.log(`✅ Đã nạp thành công ${file}!`);
  }

  // 3. Kiểm tra kết quả
  console.log("\n3. Kiểm tra số lượng bản ghi sau khi nạp:");
  const jarCount = await executeQuery("SELECT count(*) FROM vocab_jars;");
  const vocabCount = await executeQuery("SELECT count(*) FROM vocabularies;");
  console.log("Số lượng chủ đề trong vocab_jars:", jarCount);
  console.log("Số lượng từ vựng trong vocabularies:", vocabCount);

  // 4. Kiểm tra mẫu mapping giữa topic và vocabularies
  console.log("\n4. Kiểm tra ánh xạ chủ đề 'do_an_uong':");
  const testMapping = await executeQuery(`
    SELECT j.jar_name, j.code, count(v.id) as total_words
    FROM vocab_jars j
    JOIN vocabularies v ON v.topic_id = j.id
    GROUP BY j.jar_name, j.code
    ORDER BY total_words DESC;
  `);
  console.log("Thống kê mapping giữa vocab_jars và vocabularies:");
  console.log(JSON.stringify(testMapping, null, 2));

  console.log("\n🎉 HOÀN THÀNH TOÀN BỘ QUÁ TRÌNH NẠP DỮ LIỆU!");
}

main().catch(err => {
  console.error("❌ LỖI:", err);
  process.exit(1);
});
