-- Gỡ 80 dòng rác do script nhập cũ tạo thừa ở 3 đề SPbSU — các câu này KHÔNG có trong PDF đề gốc
-- (đối chiếu 26/11/2026): B1#1 READ_Q021–030 (phần Đọc chỉ có 20 câu), C1#2 READ_Q026–094, C2#1 LIST_Q150.
-- Nội dung là chữ giữ chỗ "Câu hỏi số N / Đáp án А…" đang hiển thị cho học viên.
--   - trki_question_bank: is_published = false (giữ dữ liệu).
--   - trki_tests: gỡ câu khỏi parts tại đúng vị trí (sections, part1..5 đồng bộ) để RPC chấm không lệch.
-- Migration dừng (không ghi gì) nếu vị trí không khớp.
create temporary table tmp_hide on commit drop as
with ordered as (
  select q.id, q.code, q.test_code, q.options,
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
select o.id as question_id, f.test_id, f.part_idx, f.q_idx, (f.v -> 'options' = o.options) as matched
  from ordered o
  join flat f on f.test_code = o.test_code and f.pos = o.pos
 where (o.test_code = 'trki_b1_spbsu_01' and o.code between 'TRKI_B1_SPBSU_01_READ_Q021' and 'TRKI_B1_SPBSU_01_READ_Q030')
    or (o.test_code = 'trki_c1_spbsu_02' and o.code between 'TRKI_C1_SPBSU_02_READ_Q026' and 'TRKI_C1_SPBSU_02_READ_Q094')
    or (o.test_code = 'trki_c2_spbsu_01' and o.code = 'TRKI_C2_SPBSU_01_LIST_Q150');

do $$
declare v_n int; v_bad int; v_ph int; v_mismatch int;
begin
  select count(*), count(*) filter (where not matched) into v_n, v_bad from tmp_hide;
  if v_n = 0 then raise notice 'Đã gỡ trước đó — bỏ qua.'; return; end if;
  if v_n <> 80 then raise exception 'Dừng: tìm thấy % / 80 dòng', v_n; end if;
  if v_bad > 0 then raise exception 'Dừng: % dòng không khớp vị trí', v_bad; end if;
  select count(*) into v_ph from public.trki_question_bank q join tmp_hide h on h.question_id = q.id
   where not (q.prompt ~* '^(câu hỏi số|question)\s*\d+' or q.options::text ~ 'Đáp án [АБВГABCD]"');
  if v_ph > 0 then raise exception 'Dừng: % dòng không phải chữ giữ chỗ', v_ph; end if;
  select count(*) into v_mismatch from public.trki_tests t
   where t.id in (select test_id from tmp_hide)
     and (t.sections is distinct from t.parts
          or t.part1 is distinct from coalesce(t.parts -> 0, '{}'::jsonb) or t.part2 is distinct from coalesce(t.parts -> 1, '{}'::jsonb)
          or t.part3 is distinct from coalesce(t.parts -> 2, '{}'::jsonb) or t.part4 is distinct from coalesce(t.parts -> 3, '{}'::jsonb)
          or t.part5 is distinct from coalesce(t.parts -> 4, '{}'::jsonb));
  if v_mismatch > 0 then raise exception 'Dừng: % đề có sections/part1..5 khác parts', v_mismatch; end if;
end $$;

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
   set parts = r.new_parts, sections = r.new_parts,
       part1 = coalesce(r.new_parts -> 0, '{}'::jsonb), part2 = coalesce(r.new_parts -> 1, '{}'::jsonb),
       part3 = coalesce(r.new_parts -> 2, '{}'::jsonb), part4 = coalesce(r.new_parts -> 3, '{}'::jsonb),
       part5 = coalesce(r.new_parts -> 4, '{}'::jsonb), updated_at = now()
  from rebuilt r
 where r.id = t.id;

update public.trki_question_bank
   set is_published = false, updated_at = now()
 where id in (select question_id from tmp_hide);
