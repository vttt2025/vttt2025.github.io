-- =============================================================================
-- Ẩn tạm 27 câu TRKI mất phương án trong dữ liệu gốc (theo yêu cầu người dùng, 25/11/2026).
--
-- RPC rusi_grade_trki_submission ghép đáp án theo THỨ TỰ câu đã xuất bản trong trki_question_bank,
-- còn trang thi gửi đáp án theo thứ tự câu hiển thị (trki_tests.parts). Vì vậy phải bỏ câu ở CẢ HAI
-- nơi cùng lúc, nếu không mọi câu phía sau bị chấm lệch:
--   - trki_question_bank: is_published = false (giữ nguyên dữ liệu để nhập lại phương án sau).
--   - trki_tests: gỡ câu khỏi parts / sections / part1..5 tại đúng vị trí tương ứng.
-- Vị trí được xác định theo thứ tự chấm của RPC và kiểm tra khớp options + đầu đề bài; nếu không
-- khớp đủ 27 câu, hoặc sections/part1..5 không trùng parts, migration dừng (không ghi gì).
-- Khôi phục: nhập lại phương án trong CMS, bật lại is_published và thêm câu vào đúng vị trí trong đề.
-- =============================================================================

create temporary table tmp_hide on commit drop as
with ordered as (
  select q.id, q.test_code, q.prompt, q.options, q.correct_index,
         row_number() over (partition by q.test_code order by
           case q.sub_test when 'lexis_grammar' then 1 when 'grammar' then 1 when 'reading' then 2
                           when 'listening' then 3 when 'writing' then 4 when 'speaking' then 5 else 9 end,
           q.order_index, q.id) - 1 as pos
    from public.trki_question_bank q
   where q.is_published
), flat as (
  select t.id as test_id, t.code as test_code, (p.ord - 1)::int as part_idx, (j.ord - 1)::int as q_idx,
         row_number() over (partition by t.id order by p.ord, j.ord) - 1 as pos, j.v
    from public.trki_tests t,
         jsonb_array_elements(t.parts) with ordinality p(v, ord),
         jsonb_array_elements(coalesce(p.v -> 'questions', '[]'::jsonb)) with ordinality j(v, ord)
)
select o.id as question_id, f.test_id, f.part_idx, f.q_idx,
       (f.v -> 'options' = o.options and left(coalesce(f.v ->> 'q', ''), 40) = left(o.prompt, 40)) as matched
  from ordered o
  join flat f on f.test_code = o.test_code and f.pos = o.pos
 where o.correct_index < 0 or o.correct_index >= jsonb_array_length(o.options);

do $$
declare v_n int; v_bad int; v_mismatch int;
begin
  select count(*), count(*) filter (where not matched) into v_n, v_bad from tmp_hide;
  if v_n = 0 then
    raise notice 'Không còn câu lỗi — bỏ qua.';
    return;
  end if;
  if v_bad > 0 then
    raise exception 'Dừng: % câu không khớp vị trí giữa trki_question_bank và trki_tests', v_bad;
  end if;
  select count(*) into v_mismatch
    from public.trki_tests t
   where t.id in (select test_id from tmp_hide)
     and (t.sections is distinct from t.parts
          or t.part1 is distinct from coalesce(t.parts -> 0, '{}'::jsonb)
          or t.part2 is distinct from coalesce(t.parts -> 1, '{}'::jsonb)
          or t.part3 is distinct from coalesce(t.parts -> 2, '{}'::jsonb)
          or t.part4 is distinct from coalesce(t.parts -> 3, '{}'::jsonb)
          or t.part5 is distinct from coalesce(t.parts -> 4, '{}'::jsonb));
  if v_mismatch > 0 then
    raise exception 'Dừng: % đề có sections/part1..5 khác parts — cần xử lý tay', v_mismatch;
  end if;
end $$;

-- Gỡ câu khỏi đề hiển thị (parts là nguồn; sections, part1..5 đồng bộ theo)
with rebuilt as (
  select t.id,
         (select jsonb_agg(
                   case when exists (select 1 from tmp_hide h where h.test_id = t.id and h.part_idx = p.ord - 1)
                        then jsonb_set(p.v, '{questions}', (
                               select coalesce(jsonb_agg(j.v order by j.ord), '[]'::jsonb)
                                 from jsonb_array_elements(p.v -> 'questions') with ordinality j(v, ord)
                                where not exists (select 1 from tmp_hide h
                                                   where h.test_id = t.id and h.part_idx = p.ord - 1 and h.q_idx = j.ord - 1)))
                        else p.v end
                   order by p.ord)
            from jsonb_array_elements(t.parts) with ordinality p(v, ord)) as new_parts
    from public.trki_tests t
   where t.id in (select test_id from tmp_hide)
)
update public.trki_tests t
   set parts      = r.new_parts,
       sections   = r.new_parts,
       part1      = coalesce(r.new_parts -> 0, '{}'::jsonb),
       part2      = coalesce(r.new_parts -> 1, '{}'::jsonb),
       part3      = coalesce(r.new_parts -> 2, '{}'::jsonb),
       part4      = coalesce(r.new_parts -> 3, '{}'::jsonb),
       part5      = coalesce(r.new_parts -> 4, '{}'::jsonb),
       updated_at = now()
  from rebuilt r
 where r.id = t.id;

-- Ẩn trong ngân hàng câu hỏi (giữ dữ liệu)
update public.trki_question_bank
   set is_published = false, updated_at = now()
 where id in (select question_id from tmp_hide);
