-- View đề/câu hỏi TRKI: 2 chỉnh sửa sau code review (26/11/2026). Idempotent.
-- 1. trki_questions_public: câu thuộc đề PRO được nhận diện qua CẢ test_code lẫn test_id (form admin sửa riêng
--    trường "Mã Test ID liên kết") — trước chỉ xét test_code nên câu gắn đề PRO qua test_id có thể lộ.
-- 2. Gọi (select public.rusi_has_pro()) để Postgres tính 1 lần cho cả truy vấn (initplan), như các policy RLS,
--    thay vì có thể gọi lại theo từng dòng.

create or replace view public.trki_tests_public with (security_invoker = false) as
 select id,
    code,
    title,
    level,
    level_name,
    category,
    sub_test_type,
    duration_min,
    duration_minutes,
    pass_percent,
    passing_score,
    is_pro_only,
    is_published,
    test_mode,
    created_at,
    updated_at,
    private.rusi_strip_answer_keys(part1) as part1,
    private.rusi_strip_answer_keys(part2) as part2,
    private.rusi_strip_answer_keys(part3) as part3,
    private.rusi_strip_answer_keys(part4) as part4,
    private.rusi_strip_answer_keys(part5) as part5,
    private.rusi_strip_answer_keys(parts) as parts,
    private.rusi_strip_answer_keys(sections) as sections,
    private.rusi_strip_answer_keys(raw_data) as raw_data
   from public.trki_tests t
  where is_published = true
    and (not coalesce(is_pro_only, false) or (select public.rusi_has_pro()));

create or replace view public.trki_questions_public with (security_invoker = false) as
 select id,
    code,
    level,
    sub_test,
    part_number,
    question_type,
    topic,
    grammar_case,
    difficulty,
    prompt,
    prompt_vi,
    passage,
    audio_url,
    image_url,
    options,
    points,
    test_code,
    test_id,
    order_index,
    is_published,
    is_pro_only,
    created_at,
    updated_at
   from public.trki_question_bank q
  where is_published = true
    -- PRO nếu chính câu gắn cờ PRO HOẶC câu thuộc một đề PRO (qua test_code hoặc test_id)
    and ((not coalesce(q.is_pro_only, false)
          and not exists (select 1 from public.trki_tests t
                          where coalesce(t.is_pro_only, false)
                            and (t.code = q.test_code or t.id = q.test_code
                                 or t.code = q.test_id or t.id = q.test_id)))
         or (select public.rusi_has_pro()));
