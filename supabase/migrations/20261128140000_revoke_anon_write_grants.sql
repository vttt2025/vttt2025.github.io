-- Thu hồi quyền GHI cấp bảng của role anon (khách chưa đăng nhập) trên schema public (28/11/2026). Idempotent.
--
-- Hiện trạng (đối chiếu DB 28/11/2026, chỉ đọc): anon có GRANT INSERT/UPDATE/DELETE trên 27 bảng dưới đây (mặc định
-- của Supabase khi tạo bảng). Không bảng nào có policy INSERT/UPDATE/DELETE/ALL cho anon hoặc public (pg_policies = 0),
-- nên RLS đang chặn mọi lệnh ghi của anon — quyền này thừa, chỉ còn một lớp bảo vệ (RLS). Thu hồi để phòng thủ chiều sâu:
-- lỡ tay tạo policy ghi `to public` hoặc tắt RLS một bảng cũng không mở được quyền ghi cho khách.
--
-- Không ảnh hưởng luồng nào:
--   * Mọi lệnh ghi phía client đều cần đăng nhập (role authenticated): đơn gói PRO app.js ensureOrder → orders.createPending
--     (user.uid), đơn shop js/pages/page-shop.js:231-232 chặn khách trước createShopPending, profiles/user_progress/
--     practice_logs/trki_submissions/vocab_jars ghi theo user_id đã đăng nhập.
--   * Tạo profile khi đăng ký: trigger auth.users → private.rusi_auth_user_created (SECURITY DEFINER), không dùng quyền anon.
--   * anon chỉ được EXECUTE 2 hàm SECURITY DEFINER chỉ đọc (rusi_has_pro, rusi_pro_catalog); không hàm INVOKER nào anon gọi được mà ghi bảng.
-- KHÔNG đụng quyền SELECT của anon (nội dung công khai vẫn đọc qua RLS "Public read"/view công khai) và không đụng authenticated.

do $$
declare
  t text;
  tables text[] := array[
    'blog_posts', 'grammar_lessons', 'jar_items', 'listening_lesson_vocab', 'listening_lessons', 'listening_topics',
    'orders', 'packages', 'practice_logs', 'profiles', 'shop_products', 'speaking_lessons', 'topic_articles',
    'trki_question_bank', 'trki_submissions', 'trki_tests', 'user_ai_usage', 'user_device_sessions', 'user_progress',
    'user_vocab_progress', 'vocab_jars', 'vocab_lessons', 'vocabularies', 'writing_submissions', 'writing_task_vocab',
    'writing_tasks', 'writing_topics'
  ];
begin
  foreach t in array tables loop
    if to_regclass('public.' || t) is not null then
      execute format('revoke insert, update, delete, truncate on table public.%I from anon', t);
    end if;
  end loop;
end
$$;

-- Kiểm tra sau khi áp dụng (phải trả 0 dòng):
-- select table_name, privilege_type from information_schema.role_table_grants
--  where table_schema = 'public' and grantee = 'anon' and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE');
