-- Số câu ghi trong tên phần thi ("Phần 1. Từ vựng & Ngữ pháp (100 câu)") và tên đề ("… (30 câu)") lệch với số câu
-- thực có sau khi gỡ câu rác / câu giữ chỗ (26/11/2026, chủ dự án yêu cầu "sửa thành số câu mới").
-- Tính lại từ số câu trắc nghiệm thật trong parts. Idempotent: chỉ đổi khi số khác.

-- 1. Tên phần (parts[].vi); sections, part1..5 đồng bộ theo parts
with rebuilt as (
  select t.id,
         (select jsonb_agg(
                   case when p.v ? 'vi' and (p.v ->> 'vi') ~ '\(\d+ câu\)'
                             and jsonb_array_length(coalesce(p.v -> 'questions', '[]'::jsonb)) > 0
                        then jsonb_set(p.v, '{vi}', to_jsonb(regexp_replace(p.v ->> 'vi', '\(\d+ câu\)',
                               '(' || jsonb_array_length(p.v -> 'questions') || ' câu)')))
                        else p.v end
                   order by p.ord)
            from jsonb_array_elements(t.parts) with ordinality p(v, ord)) as new_parts
    from public.trki_tests t
   where jsonb_typeof(t.parts) = 'array'
)
update public.trki_tests t
   set parts = r.new_parts, sections = r.new_parts,
       part1 = coalesce(r.new_parts -> 0, '{}'::jsonb), part2 = coalesce(r.new_parts -> 1, '{}'::jsonb),
       part3 = coalesce(r.new_parts -> 2, '{}'::jsonb), part4 = coalesce(r.new_parts -> 3, '{}'::jsonb),
       part5 = coalesce(r.new_parts -> 4, '{}'::jsonb), updated_at = now()
  from rebuilt r
 where r.id = t.id and t.parts is distinct from r.new_parts;

-- 2. Tên đề có "(N câu)" → tổng số câu trắc nghiệm của đề
with totals as (
  select t.id, (select coalesce(sum(jsonb_array_length(coalesce(p -> 'questions', '[]'::jsonb))), 0)
                  from jsonb_array_elements(t.parts) p) as nq
    from public.trki_tests t
   where jsonb_typeof(t.parts) = 'array' and t.title ~ '\(\d+ câu\)'
)
update public.trki_tests t
   set title = regexp_replace(t.title, '\(\d+ câu\)', '(' || x.nq || ' câu)'), updated_at = now()
  from totals x
 where x.id = t.id and x.nq > 0
   and (substring(t.title from '\((\d+) câu\)'))::int <> x.nq;
