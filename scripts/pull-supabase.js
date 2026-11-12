/**
 * scripts/pull-supabase.js
 *
 * Kéo 100% dữ liệu mới nhất từ Supabase Cloud PostgreSQL về máy cục bộ:
 * 1. Đọc cấu hình từ supabase-config.js (url & anonKey)
 * 2. Tải toàn bộ các bảng dữ liệu từ Supabase Cloud:
 *    - vocab_jars + jar_items + vocabularies (10 Lọ từ vựng hệ thống & 500 từ)
 *    - topic_articles (10 bài đọc chủ đề)
 *    - listening_lessons + listening_topics + listening_lesson_vocab (7 bài luyện nghe)
 *    - speaking_lessons (28 bài luyện nói)
 *    - writing_tasks + writing_topics + writing_task_vocab (17 đề luyện viết)
 *    - grammar_lessons (5 bài ngữ pháp)
 *    - shop_products (7 sản phẩm shop)
 *    - packages (3 gói học Pro)
 *    - trki_tests (6 đề thi TRKI)
 *    - blog_posts (3 bài cẩm nang du học)
 * 3. Xuất file backup cục bộ sạch: data/supabase-backup.json
 * 4. Đồng bộ dữ liệu 100% Supabase vào data.js, xoá sạch hoàn toàn dữ liệu mock cũ
 */

require('./sync-from-supabase.js');
