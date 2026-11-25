-- =============================================================================
-- Dọn quyền & index theo báo cáo phân tích CSDL (25/11/2026). Idempotent: chạy lại an toàn.
--
-- 1. rusi_set_timezone(p_user, ...): SECURITY DEFINER, không kiểm tra auth.uid() → ai đăng nhập cũng
--    đổi được múi giờ (ảnh hưởng streak) của người khác. Hàm ghi chú "Backend-only" → thu hồi quyền gọi.
-- 2. RPC client không gọi tới (grep supabase-client.js, auth.js, app.js, admin.js, js/pages, scripts,
--    supabase/functions) và phần lớn tham chiếu bảng của thiết kế cũ không còn tồn tại → thu hồi EXECUTE
--    của anon/authenticated. CHƯA DROP: để một migration sau xoá khi chắc chắn không cần.
--    Hàm trigger (activate_pro_from_paid_order, rusi_mark_content_changed...) không bị ảnh hưởng:
--    PostgreSQL không kiểm tra EXECUTE khi chạy hàm trigger.
-- 3. profiles.role: thêm CHECK theo danh sách vai trò thật đang dùng (is_admin() nhận academic_admin,
--    super_admin; CMS chỉ cho chọn student/teacher/academic_admin/super_admin).
-- 4. Bỏ quyền TRUNCATE/REFERENCES/TRIGGER mặc định của anon/authenticated trên bảng public.
-- 5. Index: bỏ index trùng, thêm index cho truy vấn client (tìm từ vựng ILIKE, câu hỏi theo đề).
-- Không đụng: rusi_grade_trki_submission / rusi_check_trki_question (trang thi thử có thể dùng khi
-- chưa đăng nhập — cần quyết định sản phẩm trước khi thu hồi của anon).
-- =============================================================================

-- ---------- 1 & 2. Thu hồi quyền gọi RPC ----------
do $$
declare
  v_sig text;
begin
  foreach v_sig in array array[
    'public.rusi_set_timezone(uuid, text)',
    'public.ingest_grammar_lesson(text, text, text, text, text, text, text, integer, text)',
    'public.rusi_admin_get_trki_questions(integer, integer)',
    'public.rusi_admin_upsert_trki_question(jsonb)',
    'public.rusi_create_jar(text, text)',
    'public.rusi_create_order(uuid, jsonb, jsonb)',
    'public.rusi_get_ai_feedback(uuid, text)',
    'public.rusi_get_exam_feedback(uuid)',
    'public.rusi_get_exam_questions(uuid)',
    'public.rusi_get_exam_result(uuid)',
    'public.rusi_get_my_stats()',
    'public.rusi_grade_trki_exam(text, jsonb, integer)',
    'public.rusi_record_vocab_review(uuid, uuid, uuid, uuid, smallint, bigint, integer, real, smallint, text, timestamp with time zone)',
    'public.rusi_request_refund(uuid, uuid, bigint, text)',
    'public.rusi_save_exam_answers(uuid, jsonb, bigint)',
    'public.rusi_set_jar_word(uuid, uuid, boolean)',
    'public.rusi_start_exam(uuid, uuid, uuid)',
    'public.rusi_start_vocab_session(uuid, uuid, smallint, integer, uuid)',
    'public.rusi_submit_exam(uuid, jsonb)',
    'public.rusi_submit_listening(uuid, bigint, uuid, jsonb)',
    'public.rusi_submit_speaking(uuid, uuid, uuid, integer)',
    'public.rusi_submit_srs_review(uuid, smallint)',
    'public.rusi_submit_writing(uuid, uuid, text)',
    'public.update_vocab_audio(jsonb)'
  ] loop
    if to_regprocedure(v_sig) is not null then
      execute format('revoke execute on function %s from public, anon, authenticated', v_sig);
    end if;
  end loop;
end $$;

-- ---------- 3. CHECK vai trò ----------
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'teacher', 'academic_admin', 'super_admin'));

-- ---------- 4. Quyền mặc định thừa ----------
revoke truncate, references, trigger on all tables in schema public from anon, authenticated;

-- ---------- 5. Index ----------
-- Trùng với index của ràng buộc UNIQUE / khoá chính đã có
drop index if exists public.idx_trki_qb_code;                  -- = trki_question_bank_code_key
drop index if exists public.idx_orders_code;                   -- = orders_order_code_key
drop index if exists public.idx_speaking_lessons_code_unique;  -- = speaking_lessons_code_unique
drop index if exists public.idx_writing_topics_code_unique;    -- = writing_topics_code_unique
drop index if exists public.idx_jar_items_jar;                 -- PK (jar_id, vocab_id) đã bao
drop index if exists public.idx_trki_qb_published;             -- 100% dòng is_published = true

-- vocabularies.search: ilike '%k%' trên word_normalized / meaning_vi (pg_trgm nằm ở schema public)
create index if not exists idx_vocab_word_trgm on public.vocabularies using gin (word_normalized public.gin_trgm_ops);
create index if not exists idx_vocab_meaning_trgm on public.vocabularies using gin (meaning_vi public.gin_trgm_ops);
-- questionBank.getByTest / getAll: lọc test_code hoặc level + sub_test, sắp theo order_index
create index if not exists idx_trki_qb_test_order on public.trki_question_bank (test_code, order_index);
create index if not exists idx_trki_qb_level_sub_order on public.trki_question_bank (level, sub_test, order_index);
