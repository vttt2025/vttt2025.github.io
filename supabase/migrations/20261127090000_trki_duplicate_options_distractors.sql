-- =============================================================================
-- Sửa 5 câu TRKI có 2 phương án trùng chữ + tên phần sai số bài (người dùng duyệt 27/11/2026).
--  * Thay bản lặp bằng một phương án nhiễu; đáp án đúng (chỉ số và chữ) giữ nguyên.
--    - trki_b1_spbsu_01 #43, trki_b1_spbsu_02 #69, trki_c2_spbsu_01 #11: sửa ở trki_question_bank
--      (trigger rusi_trki_bank_sync_* dựng lại trki_tests.parts/sections/part1..5).
--      Lặp có sẵn trong sách gốc: lần nhập lại đề СПбГУ ngày 26/11 đã đưa lại bản lặp sau migration
--      20261126100000_fix_duplicate_trki_options — nếu nhập lại từ nguồn, phải áp lại migration này.
--    - trki_exam_a1_01 (code trki_a1_mock_01) #1, trki_exam_b1_02 (code trki_b1_mock_01) #2: không có trong
--      ngân hàng → sửa part1 (trigger trg_sync_trki_test dựng parts/sections từ part1..5).
--  * trki_exam_a1_04: tên phần Viết "(1 bài)" và Nói "(3 bài)" → "(2 bài)" theo số bài thực có.
-- Idempotent: mỗi lệnh chỉ ghi khi giá trị cũ còn nguyên.
-- =============================================================================

update public.trki_question_bank q
   set options = jsonb_set(q.options, array[x.oi::text], to_jsonb(x.new_opt))
  from (values
          ('1bbfa5dd-9270-5b9d-866c-23a71472403d'::uuid, 3, 'этот шкаф',    'в этом шкафу'),
          ('8ebd07a8-8ebd-5d9a-a485-7089d12421b7'::uuid, 1, 'цветы',        'цветам'),
          ('b41f5d91-c1fa-5498-819f-ea2a40b9ad59'::uuid, 3, 'продолжилась', 'продолжится')
       ) as x(id, oi, old_opt, new_opt)
 where q.id = x.id
   and q.options ->> x.oi = x.old_opt
   and q.correct_index is distinct from x.oi;

update public.trki_tests t
   set part1 = jsonb_set(t.part1, array['questions', x.qi::text, 'options', x.oi::text], to_jsonb(x.new_opt))
  from (values
          ('trki_exam_a1_01', 0, 2, 'Его',        'Ей'),
          ('trki_exam_b1_02', 1, 3, 'отвечающей', 'отвечающие')
       ) as x(id, qi, oi, old_opt, new_opt)
 where t.id = x.id
   and t.part1 ->> 'id' = 'gram'
   and t.part1 -> 'questions' -> x.qi -> 'options' ->> x.oi = x.old_opt
   and (t.part1 -> 'questions' -> x.qi ->> 'a')::int is distinct from x.oi;

update public.trki_tests t
   set part4 = jsonb_set(t.part4, '{vi}', to_jsonb(replace(t.part4 ->> 'vi', '(1 bài)', '(2 bài)'))),
       part5 = jsonb_set(t.part5, '{vi}', to_jsonb(replace(t.part5 ->> 'vi', '(3 bài)', '(2 bài)')))
 where t.id = 'trki_exam_a1_04'
   and jsonb_array_length(coalesce(t.part4 -> 'writing_tasks', '[]'::jsonb)) = 2
   and jsonb_array_length(coalesce(t.part5 -> 'speaking_tasks', '[]'::jsonb)) = 2
   and ((t.part4 ->> 'vi') like '%(1 bài)%' or (t.part5 ->> 'vi') like '%(3 bài)%');
