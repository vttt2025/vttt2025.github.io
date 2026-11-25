-- =============================================================================
-- Sửa dữ liệu đề TRKI & dấu ngoặc (theo yêu cầu người dùng, 25/11/2026). Chạy một lần; chạy lại an toàn.
--
-- 1. trki_question_bank có 53 câu correct_index nằm ngoài mảng options (lỗi trích xuất PDF: mất
--    phương án hoặc gộp 4 phương án vào một chuỗi). Chỉ sửa phần suy ra được chắc chắn từ dữ liệu:
--    A. 19 câu có ≥2 phương án và correct_answer (chữ của đáp án chính thức) nằm trong options →
--       correct_index = vị trí của correct_answer.
--    B. 7 câu gộp 4 phương án vào 1 chuỗi → tách lại 4 phương án; giữ chỉ số đáp án chính thức
--       (đã đúng sau khi tách), cập nhật correct_answer. Bỏ dấu ngắt dòng PDF "%" trong "гла% зами".
--    Cùng câu trong public.trki_tests (part1..5/parts/sections) được cập nhật options/a tương ứng
--    để màn hình thi (đọc từ trki_tests) và chấm điểm (đọc từ trki_question_bank) khớp nhau.
--    27 câu còn lại mất hẳn phương án trong dữ liệu gốc → KHÔNG tự bịa, cần nhập lại từ đề gốc.
-- 2. Quy tắc PROJECT_SPEC Mục 8.13: đổi « → “ và » → ” ở mọi cột văn bản còn sót.
-- =============================================================================

-- Hàm tạm: thay options/a của câu hỏi khớp (q bắt đầu giống prompt, options cũ) trong cây JSON
create or replace function private.rusi_tmp_fix_question(j jsonb, p_prompt text, p_old jsonb, p_new jsonb, p_a int)
returns jsonb language plpgsql immutable set search_path = '' as $$
declare v_out jsonb;
begin
  if j is null then return null; end if;
  if jsonb_typeof(j) = 'object' then
    if j ? 'options' and j -> 'options' = p_old and left(coalesce(j ->> 'q', ''), 40) = left(p_prompt, 40) then
      j := jsonb_set(j, '{a}', to_jsonb(p_a));
      if p_new is not null then j := jsonb_set(j, '{options}', p_new); end if;
      return j;
    end if;
    select coalesce(jsonb_object_agg(e.key, private.rusi_tmp_fix_question(e.value, p_prompt, p_old, p_new, p_a)), '{}'::jsonb)
      into v_out from jsonb_each(j) e;
    return v_out;
  elsif jsonb_typeof(j) = 'array' then
    select coalesce(jsonb_agg(private.rusi_tmp_fix_question(a.value, p_prompt, p_old, p_new, p_a) order by a.ord), '[]'::jsonb)
      into v_out from jsonb_array_elements(j) with ordinality a(value, ord);
    return v_out;
  end if;
  return j;
end $$;

create temporary table tmp_trki_fix (test_code text, order_index int, new_opts jsonb, new_ci int, new_answer text) on commit drop;

-- A. correct_index = vị trí correct_answer trong options (chỉ khi khớp đúng 1 vị trí)
insert into tmp_trki_fix (test_code, order_index, new_opts, new_ci, new_answer)
select q.test_code, q.order_index, null, h.pos, q.correct_answer
  from public.trki_question_bank q
  cross join lateral (
    select min(o.ord - 1)::int pos, count(*) cnt
      from jsonb_array_elements_text(q.options) with ordinality o(v, ord)
     where o.v = q.correct_answer
  ) h
 where (q.correct_index < 0 or q.correct_index >= jsonb_array_length(q.options))
   and jsonb_array_length(q.options) >= 2
   and h.cnt = 1;

-- B. Tách 4 phương án bị gộp (chỉ số đáp án = official key, giữ nguyên)
insert into tmp_trki_fix (test_code, order_index, new_opts, new_ci, new_answer) values
  ('trki_b2_minobr_01', 96, '["Благодаря тому что читаете новый текст,", "Хотя читаете новый текст,", "Когда читаете новый текст,", "Так как читаете новый текст,"]', 2, 'Когда читаете новый текст,'),
  ('trki_b2_minobr_01', 97, '["Так как мы будем пить чай,", "После того как будем пить чай,", "Когда пьем чай,", "Когда будем пить чай,"]', 3, 'Когда будем пить чай,'),
  ('trki_c2_minobr_01', 25, '["с мягким взглядом карими глазами", "с мягким взглядом карих глаз", "при мягком взгляде карими глазами", "при мягком взгляде карих глаз"]', 1, 'с мягким взглядом карих глаз'),
  ('trki_c2_minobr_01', 27, '["Восемьсот пятьдесят лет", "Восемьсотпятидесятилетняя", "Восьмисотпятидесятилетняя", "Восьмисот пятьдесят летняя"]', 2, 'Восьмисотпятидесятилетняя'),
  ('trki_c2_minobr_01', 30, '["виноградного вина", "виноградных вин", "вина из винограда", "вин из винограда"]', 1, 'виноградных вин'),
  ('trki_c2_minobr_01', 65, '["Там есть что посмотреть!", "Есть там что смотреть!", "Там разные картины.", "Мне не хочется идти на выставку."]', 1, 'Есть там что смотреть!'),
  ('trki_c2_minobr_01', 66, '["Лена будет волноваться.", "Лена не знает об этом.", "Станет Лена волноваться!", "У Лены нет подруги."]', 1, 'Лена не знает об этом.');

-- Cập nhật trki_tests trước (cần options CŨ của bank để tìm câu), rồi đến bank
do $$
declare f record; b record;
begin
  for f in select * from tmp_trki_fix loop
    for b in select prompt, options from public.trki_question_bank
              where test_code = f.test_code and order_index = f.order_index
                and (correct_index < 0 or correct_index >= jsonb_array_length(options)) loop
      update public.trki_tests t
         set parts    = private.rusi_tmp_fix_question(t.parts,    b.prompt, b.options, f.new_opts, f.new_ci),
             sections = private.rusi_tmp_fix_question(t.sections, b.prompt, b.options, f.new_opts, f.new_ci),
             part1    = private.rusi_tmp_fix_question(t.part1,    b.prompt, b.options, f.new_opts, f.new_ci),
             part2    = private.rusi_tmp_fix_question(t.part2,    b.prompt, b.options, f.new_opts, f.new_ci),
             part3    = private.rusi_tmp_fix_question(t.part3,    b.prompt, b.options, f.new_opts, f.new_ci),
             part4    = private.rusi_tmp_fix_question(t.part4,    b.prompt, b.options, f.new_opts, f.new_ci),
             part5    = private.rusi_tmp_fix_question(t.part5,    b.prompt, b.options, f.new_opts, f.new_ci)
       where t.code = f.test_code or t.id = f.test_code;
    end loop;
    update public.trki_question_bank
       set correct_index  = f.new_ci,
           options        = coalesce(f.new_opts, options),
           correct_answer = f.new_answer,
           updated_at     = now()
     where test_code = f.test_code and order_index = f.order_index
       and (correct_index < 0 or correct_index >= jsonb_array_length(options));
  end loop;
end $$;

drop function private.rusi_tmp_fix_question(jsonb, text, jsonb, jsonb, int);

-- 2. « » → “ ” (chỉ đụng dòng có ký tự cần đổi)
update public.trki_question_bank
   set prompt         = replace(replace(prompt, '«', '“'), '»', '”'),
       passage        = replace(replace(passage, '«', '“'), '»', '”'),
       options        = replace(replace(options::text, '«', '“'), '»', '”')::jsonb,
       correct_answer = replace(replace(correct_answer, '«', '“'), '»', '”'),
       explanation    = replace(replace(explanation, '«', '“'), '»', '”'),
       updated_at     = now()
 where concat_ws(' ', prompt, passage, options::text, correct_answer, explanation) ~ '[«»]';

update public.trki_tests
   set parts    = replace(replace(parts::text,    '«', '“'), '»', '”')::jsonb,
       sections = replace(replace(sections::text, '«', '“'), '»', '”')::jsonb,
       part1    = replace(replace(part1::text,    '«', '“'), '»', '”')::jsonb,
       part2    = replace(replace(part2::text,    '«', '“'), '»', '”')::jsonb,
       part3    = replace(replace(part3::text,    '«', '“'), '»', '”')::jsonb,
       part4    = replace(replace(part4::text,    '«', '“'), '»', '”')::jsonb,
       part5    = replace(replace(part5::text,    '«', '“'), '»', '”')::jsonb,
       answers  = replace(replace(answers::text,  '«', '“'), '»', '”')::jsonb,
       updated_at = now()
 where concat_ws(' ', parts::text, sections::text, part1::text, part2::text, part3::text, part4::text, part5::text, answers::text) ~ '[«»]';

update public.topic_articles
   set content_md = replace(replace(content_md, '«', '“'), '»', '”'), updated_at = now()
 where content_md ~ '[«»]';

update public.vocab_lessons
   set content_md = replace(replace(content_md, '«', '“'), '»', '”'), updated_at = now()
 where content_md ~ '[«»]';
