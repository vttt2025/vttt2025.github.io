-- =============================================================================
-- Sửa 14 câu TRKI có phương án trùng chữ (ngoài 2 đề Innove — xử lý riêng), theo người dùng yêu cầu 26/11/2026.
--  * Phương án lặp (kể cả lặp ngay trong sách gốc): bỏ bản lặp, giữ thứ tự; đáp án đúng tính lại theo chữ.
--  * 7 câu bị tách đôi khi nhập (["… задержать", "преступника", "…", "преступника"]): khôi phục 4 phương án
--    theo PDF gốc (TRKI3_demo_v2.pdf tr.12/22/23; Адаптационный_тест_B_2.pdf tr.10/12/18).
--    Đáp án: c1_spbsu_02 theo khoá chính thức (В/Б/Б); spec_b2_adapt (đề gốc không có khoá, đáp án cũ là "А"
--    điền sẵn) theo ngữ pháp: 59 В, 70 А, 73 В, 100 В.
--  * 3 đề bài bị dính chữ thừa / mất dấu "…" (zlat_b2_t16 #57, zlat_b2_t7 #42, zlat_b2_t2 #17).
-- Sửa ở trki_question_bank và câu tương ứng trong trki_tests.parts (sections, part1..5 đồng bộ theo).
-- Migration dừng (không ghi gì) nếu vị trí giữa ngân hàng và đề không khớp.
-- =============================================================================

create temporary table tmp_fix (
  question_id uuid primary key,
  new_options jsonb,     -- null = chỉ bỏ phương án lặp
  new_correct int,       -- null = tính theo chữ đáp án cũ
  new_prompt text        -- null = giữ nguyên
) on commit drop;

insert into tmp_fix values
  -- Bỏ phương án lặp
  ('dd44baa0-c467-5d23-8b94-5672c32ac4ee', null, null, null),                       -- a1_minobr_02 #40
  ('1bbfa5dd-9270-5b9d-866c-23a71472403d', null, null, null),                       -- b1_spbsu_01 #43 (lặp trong sách gốc)
  ('8ebd07a8-8ebd-5d9a-a485-7089d12421b7', null, null, null),                       -- b1_spbsu_02 #69 (lặp trong sách gốc)
  ('085e7393-1716-484f-ac09-088f56a08e44', null, null, '... наступило лето, было ещё холодно и пасмурно.'),
  ('1f95aaa4-aa00-4f4d-b6eb-9a959c027692', null, null, 'Что повлияло ... ?'),
  ('044ef53e-f8d9-4218-9d0f-3b31e7a605e4', null, null, 'В кухне будет ремонт, надо из неё ... всю мебель.'),
  ('f62ade46-1a14-4a24-bc41-dba01cfde745', null, null, null),                       -- zlat_c1_t28 #82
  -- Khôi phục phương án bị tách đôi
  ('3e67f701-18cc-54a7-8743-089a5a2ddab3', '["Вы не должны услышать этих исполнителей вне музыкального фестиваля.", "Вы можете не услышать этих исполнителей вне музыкального фестиваля.", "Вы не сможете услышать этих исполнителей вне музыкального фестиваля.", "Вам нельзя слушать этих исполнителей вне музыкального фестиваля."]'::jsonb, 2, null),
  ('a3b4b31c-f63c-55cf-9e19-737eba8bac62', '["они помогли бы задержать преступника", "они помогли задержать преступника", "они не помогут задержать преступника", "им не помочь задержать преступника"]'::jsonb, 1, null),
  ('0b317f77-fd8d-54bd-9020-049348a36dcc', '["ради того что подписали выгодный контракт", "ввиду того что подписали выгодный контракт", "даже если подписали выгодный контракт", "вопреки тому что подписали выгодный контракт"]'::jsonb, 1, null),
  ('3b8d452a-1553-5f07-b5d2-63ab1bbda06b', '["которым не заплатили за проживание", "которые не заплатят за проживание", "которые не заплатили за проживание", "которые заплатили за проживание"]'::jsonb, 2, null),
  ('7688bfbb-aafb-5d7e-bfb8-ba6c9a855d17', '["когда узнают все обстоятельства этого дела", "хотя узнают все обстоятельства этого дела", "несмотря на то что узнают все обстоятельства этого дела", "потому что узнали все обстоятельства этого дела"]'::jsonb, 0, null),
  ('b9d47482-3fa7-59ae-ba7f-b50a1f22d157', '["Переводивший научную статью", "Переведя научную статью", "Переводя научную статью"]'::jsonb, 2, 'Когда я перевожу научную статью, я обычно выписываю самые трудные слова.'),
  ('c4414ba8-b750-5475-9a97-c93409d3cbc5', '["что он подготовил текст выступления", "кто подготовил текст выступления", "подготовил ли он текст выступления", "о чём он подготовил текст выступления"]'::jsonb, 2, null);

-- Bỏ phương án lặp (giữ lần xuất hiện đầu), đáp án đúng tìm lại theo chữ
update tmp_fix f
   set new_options = d.opts,
       new_correct = (select (x.ord - 1)::int from jsonb_array_elements_text(d.opts) with ordinality x(e, ord)
                       where lower(btrim(x.e)) = lower(btrim(q.options ->> q.correct_index)) limit 1)
  from public.trki_question_bank q,
       lateral (select jsonb_agg(to_jsonb(u.e) order by u.ord) as opts
                  from (select distinct on (lower(btrim(e))) e, ord
                          from jsonb_array_elements_text(q.options) with ordinality y(e, ord)
                         order by lower(btrim(e)), ord) u) d
 where f.question_id = q.id and f.new_options is null;

create temporary table tmp_map on commit drop as
with ordered as (
  select q.id, q.test_code, q.options, q.prompt, q.explanation, q.correct_index,
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
select f.question_id, fl.test_id, fl.part_idx, fl.q_idx,
       f.new_options, f.new_correct, coalesce(f.new_prompt, o.prompt) as new_prompt,
       f.new_options ->> f.new_correct as new_answer,
       case when o.explanation like 'Đáp án chính thức:%' then 'Đáp án chính thức: ' || (f.new_options ->> f.new_correct)
            when o.explanation like 'Đáp án mẫu:%' then 'Đáp án: ' || (f.new_options ->> f.new_correct)
            else o.explanation end as new_ex,
       (fl.v -> 'options' = o.options) as matched
  from tmp_fix f
  join ordered o on o.id = f.question_id
  left join flat fl on fl.test_code = o.test_code and fl.pos = o.pos;

do $$
declare v_n int; v_bad int; v_nullc int; v_mismatch int;
begin
  select count(*), count(*) filter (where matched is not true), count(*) filter (where new_correct is null or new_answer is null)
    into v_n, v_bad, v_nullc from tmp_map;
  if v_n <> 14 then raise exception 'Dừng: chỉ tìm thấy % / 14 câu', v_n; end if;
  if v_bad > 0 then raise exception 'Dừng: % câu không khớp vị trí giữa trki_question_bank và trki_tests', v_bad; end if;
  if v_nullc > 0 then raise exception 'Dừng: % câu không xác định được đáp án đúng', v_nullc; end if;
  select count(*) into v_mismatch
    from public.trki_tests t
   where t.id in (select test_id from tmp_map)
     and (t.sections is distinct from t.parts
          or t.part1 is distinct from coalesce(t.parts -> 0, '{}'::jsonb)
          or t.part2 is distinct from coalesce(t.parts -> 1, '{}'::jsonb)
          or t.part3 is distinct from coalesce(t.parts -> 2, '{}'::jsonb)
          or t.part4 is distinct from coalesce(t.parts -> 3, '{}'::jsonb)
          or t.part5 is distinct from coalesce(t.parts -> 4, '{}'::jsonb));
  if v_mismatch > 0 then raise exception 'Dừng: % đề có sections/part1..5 khác parts', v_mismatch; end if;
end $$;

-- Đề hiển thị (parts là nguồn; sections, part1..5 đồng bộ theo)
with rebuilt as (
  select t.id,
         (select jsonb_agg(
                   jsonb_set(p.v, '{questions}', (
                     select coalesce(jsonb_agg(
                              coalesce((select j.v || jsonb_build_object('q', m.new_prompt, 'options', m.new_options, 'a', m.new_correct,
                                                                          'correct_answer', m.new_answer, 'ex', coalesce(m.new_ex, j.v ->> 'ex'))
                                          from tmp_map m where m.test_id = t.id and m.part_idx = p.ord - 1 and m.q_idx = j.ord - 1), j.v)
                              order by j.ord), '[]'::jsonb)
                       from jsonb_array_elements(p.v -> 'questions') with ordinality j(v, ord)))
                   order by p.ord)
            from jsonb_array_elements(t.parts) with ordinality p(v, ord)) as new_parts
    from public.trki_tests t
   where t.id in (select test_id from tmp_map)
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

-- Ngân hàng câu hỏi (máy chủ chấm theo bảng này)
update public.trki_question_bank q
   set prompt = m.new_prompt, options = m.new_options, correct_index = m.new_correct,
       correct_answer = m.new_answer, explanation = m.new_ex, updated_at = now()
  from tmp_map m
 where q.id = m.question_id;
