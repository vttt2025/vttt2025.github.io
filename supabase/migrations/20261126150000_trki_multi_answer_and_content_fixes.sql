-- ТРКИ — 26/11/2026 (duyệt bởi chủ dự án):
--  1. Dạng câu "chọn TẤT CẢ phương án đúng" (Выберите все возможные варианты):
--     - trki_question_bank.correct_indices int[] + question_type = 'multi_select'; parts đánh dấu "multi": true
--       (chỉ cho client biết câu chọn nhiều — tập đáp án đúng không bao giờ xuống client).
--     - RPC chấm/kiểm tra nhận đáp án dạng mảng; đúng khi chọn ĐỦ và ĐÚNG mọi phương án (all-or-nothing).
--     - Áp dụng cho 11 câu: C1 SPbSU#2 câu 97–100, C2 SPbSU#1 câu 45–49 (khóa PDF), ТПУ#3 câu 22–23 (người soạn giải,
--       cần giáo viên duyệt).
--  2. Gỡ 21 câu tự luận C2 SPbSU#1 còn là chữ giữ chỗ (không làm được dạng trắc nghiệm).
--  3. Đề VNZh, Pháp luật câu 4 & 5: sửa theo luật hiện hành (Luật 115-ФЗ).
-- Idempotent: chạy lại không đổi kết quả. Dừng (không ghi) nếu vị trí câu trong parts không khớp ngân hàng.

alter table public.trki_question_bank add column if not exists correct_indices integer[];
alter table public.trki_question_bank drop constraint if exists trki_question_bank_question_type_check;
alter table public.trki_question_bank add constraint trki_question_bank_question_type_check
  check (question_type = any (array['multiple_choice', 'multi_select', 'fill_in_blank', 'matching',
                                    'sentence_ordering', 'essay_prompt', 'speaking_prompt']));

-- Thêm correct_indices vào danh sách khóa bị xoá khỏi view công khai (phòng xa — cột này không có trong view)
create or replace function private.rusi_strip_answer_keys(j jsonb)
returns jsonb
language plpgsql
immutable security definer
set search_path to ''
as $function$
declare
  v_keys constant text[] := array['a', 'ex', 'ans', 'answer', 'answers', 'answer_key', 'official_key',
    'correct_answer', 'correct_index', 'correct_indices', 'correct_option', 'correctIndex', 'explanation'];
  v_out jsonb;
begin
  if j is null then
    return null;
  elsif jsonb_typeof(j) = 'object' then
    select coalesce(jsonb_object_agg(e.key, private.rusi_strip_answer_keys(e.value)), '{}'::jsonb)
      into v_out
      from jsonb_each(j) e
     where not (e.key = any (v_keys));
    return v_out;
  elsif jsonb_typeof(j) = 'array' then
    select coalesce(jsonb_agg(private.rusi_strip_answer_keys(a.value) order by a.ord), '[]'::jsonb)
      into v_out
      from jsonb_array_elements(j) with ordinality a(value, ord);
    return v_out;
  end if;
  return j;
end;
$function$;

-- Vị trí của mọi câu đang xuất bản trong parts (cùng thứ tự RPC chấm)
create or replace function pg_temp.rusi_question_positions()
returns table (question_id uuid, code text, test_id text, part_idx int, q_idx int, matched boolean)
language sql
as $$
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
  select o.id, o.code, f.test_id, f.part_idx, f.q_idx, (f.v -> 'options' = o.options)
    from ordered o join flat f on f.test_code = o.test_code and f.pos = o.pos
$$;

-- ---------------------------------------------------------------------------------------------
-- 1. Câu chọn nhiều đáp án
-- ---------------------------------------------------------------------------------------------
create temporary table tmp_multi (code text primary key, idx int[], src text) on commit drop;
insert into tmp_multi values
  ('TRKI_C1_SPBSU_02_READ_Q097', array[0,1,2], 'Đáp án chính thức'),
  ('TRKI_C1_SPBSU_02_READ_Q098', array[1,2],   'Đáp án chính thức'),
  ('TRKI_C1_SPBSU_02_READ_Q099', array[1,2],   'Đáp án chính thức'),
  ('TRKI_C1_SPBSU_02_READ_Q100', array[0,2,3], 'Đáp án chính thức'),
  ('TRKI_C2_SPBSU_01_LEXI_Q045', array[0,2],   'Đáp án chính thức'),
  ('TRKI_C2_SPBSU_01_LEXI_Q046', array[1,2,3], 'Đáp án chính thức'),
  ('TRKI_C2_SPBSU_01_LEXI_Q047', array[0,1,2], 'Đáp án chính thức'),
  ('TRKI_C2_SPBSU_01_LEXI_Q048', array[0,1,3], 'Đáp án chính thức'),
  ('TRKI_C2_SPBSU_01_LEXI_Q049', array[1,2],   'Đáp án chính thức'),
  ('TRKI_TPU_03_Q022',           array[0,1],   'Đáp án'),
  ('TRKI_TPU_03_Q023',           array[0,2],   'Đáp án');

create temporary table tmp_multi_new on commit drop as
select q.id as question_id, m.idx,
       m.src || ' (chọn tất cả phương án đúng): ' ||
         (select string_agg((array['А','Б','В','Г','Д'])[i + 1] || '. ' || (q.options ->> i), '; ' order by i)
            from unnest(m.idx) i) as ex,
       (select string_agg(q.options ->> i, ' / ' order by i) from unnest(m.idx) i) as ans
  from tmp_multi m join public.trki_question_bank q on q.code = m.code and q.is_published;

create temporary table tmp_multi_pos on commit drop as
select p.*, n.idx, n.ex, n.ans
  from pg_temp.rusi_question_positions() p join tmp_multi_new n on n.question_id = p.question_id;

do $$
declare v_n int; v_bad int;
begin
  select count(*), count(*) filter (where not matched) into v_n, v_bad from tmp_multi_pos;
  if v_n <> 11 then raise exception 'Dừng: tìm thấy % / 11 câu chọn nhiều đáp án', v_n; end if;
  if v_bad > 0 then raise exception 'Dừng: % câu chọn nhiều đáp án lệch vị trí trong parts', v_bad; end if;
end $$;

update public.trki_question_bank q
   set question_type = 'multi_select', correct_indices = n.idx, correct_index = n.idx[1],
       correct_answer = n.ans, explanation = n.ex, updated_at = now()
  from tmp_multi_pos n
 where n.question_id = q.id
   and (q.correct_indices is distinct from n.idx or q.question_type <> 'multi_select' or q.explanation is distinct from n.ex);

create temporary table tmp_parts_patch (test_id text, part_idx int, q_idx int, patch jsonb) on commit drop;
insert into tmp_parts_patch
select test_id, part_idx, q_idx,
       jsonb_build_object('multi', true, 'a', idx[1], 'ex', ex, 'correct_answer', ans)
  from tmp_multi_pos;

-- ---------------------------------------------------------------------------------------------
-- 3. VNZh — Pháp luật câu 4 & 5 theo luật hiện hành
-- ---------------------------------------------------------------------------------------------
create temporary table tmp_law (code text primary key, prompt text, options jsonb, idx int, ex text) on commit drop;
insert into tmp_law values
  ('TRKI_VNZH_LA_Q004',
   'Вид на жительство иностранному гражданину по общему правилу выдаётся … .',
   '["на три года", "на пять лет", "бессрочно"]'::jsonb, 2,
   'Từ 01/11/2019 (Luật 257-ФЗ sửa Luật 115-ФЗ), thẻ cư trú (ВНЖ) cấp cho công dân nước ngoài là vô thời hạn (бессрочно), trừ một số trường hợp riêng (ví dụ chuyên gia trình độ cao). Đề gốc ghi 5 năm theo quy định cũ.'),
  ('TRKI_VNZH_LA_Q005', null, null, 1,
   'Theo Điều 9 Luật 115-ФЗ, việc tài trợ, lên kế hoạch hoạt động khủng bố (cực đoan) là căn cứ từ chối cấp hoặc huỷ thẻ cư trú (ВНЖ). Ở ngoài LB Nga chỉ là căn cứ huỷ thẻ khi quá 6 tháng, không phải 3 tháng. Khóa đề gốc ghi А, không đúng theo luật hiện hành.');

create temporary table tmp_law_pos on commit drop as
select p.*, l.prompt, l.options, l.idx, l.ex, q.options as old_options
  from pg_temp.rusi_question_positions() p
  join public.trki_question_bank q on q.id = p.question_id
  join tmp_law l on l.code = p.code;

do $$
declare v_n int; v_bad int;
begin
  select count(*), count(*) filter (where not matched) into v_n, v_bad from tmp_law_pos;
  if v_n <> 2 then raise exception 'Dừng: tìm thấy % / 2 câu luật VNZh', v_n; end if;
  if v_bad > 0 then raise exception 'Dừng: % câu luật VNZh lệch vị trí trong parts', v_bad; end if;
end $$;

update public.trki_question_bank q
   set prompt = coalesce(l.prompt, q.prompt),
       options = coalesce(l.options, q.options),
       correct_index = l.idx,
       correct_answer = coalesce(l.options, q.options) ->> l.idx,
       explanation = l.ex,
       updated_at = now()
  from tmp_law_pos l
 where l.question_id = q.id;

insert into tmp_parts_patch
select test_id, part_idx, q_idx,
       jsonb_strip_nulls(jsonb_build_object(
         'q', prompt, 'options', options, 'a', idx, 'ex', ex,
         'correct_answer', coalesce(options, old_options) ->> idx,
         'official_key', (array['А','Б','В','Г'])[idx + 1]))
  from tmp_law_pos;

-- Ghi bản vá vào parts (sections, part1..5 đồng bộ theo parts)
with rebuilt as (
  select t.id,
         (select jsonb_agg(
                   case when exists (select 1 from tmp_parts_patch x where x.test_id = t.id and x.part_idx = p.ord - 1)
                        then jsonb_set(p.v, '{questions}', (
                               select coalesce(jsonb_agg(
                                        j.v || coalesce((select x.patch from tmp_parts_patch x
                                                          where x.test_id = t.id and x.part_idx = p.ord - 1
                                                            and x.q_idx = j.ord - 1), '{}'::jsonb)
                                        order by j.ord), '[]'::jsonb)
                                 from jsonb_array_elements(p.v -> 'questions') with ordinality j(v, ord)))
                        else p.v end
                   order by p.ord)
            from jsonb_array_elements(t.parts) with ordinality p(v, ord)) as new_parts
    from public.trki_tests t
   where t.id in (select test_id from tmp_parts_patch)
)
update public.trki_tests t
   set parts = r.new_parts, sections = r.new_parts,
       part1 = coalesce(r.new_parts -> 0, '{}'::jsonb), part2 = coalesce(r.new_parts -> 1, '{}'::jsonb),
       part3 = coalesce(r.new_parts -> 2, '{}'::jsonb), part4 = coalesce(r.new_parts -> 3, '{}'::jsonb),
       part5 = coalesce(r.new_parts -> 4, '{}'::jsonb), updated_at = now()
  from rebuilt r
 where r.id = t.id and t.parts is distinct from r.new_parts;

-- ---------------------------------------------------------------------------------------------
-- 2. Gỡ 21 câu tự luận C2 còn là chữ giữ chỗ
-- ---------------------------------------------------------------------------------------------
create temporary table tmp_hide on commit drop as
select p.question_id, p.test_id, p.part_idx, p.q_idx, p.matched
  from pg_temp.rusi_question_positions() p
  join public.trki_question_bank q on q.id = p.question_id
 where q.test_code = 'trki_c2_spbsu_01'
   and (q.prompt ~* '^(câu hỏi số|question)\s*\d+' or q.options::text ~ 'Đáp án [АБВГABCD]"');

do $$
declare v_n int; v_bad int;
begin
  select count(*), count(*) filter (where not matched) into v_n, v_bad from tmp_hide;
  if v_n = 0 then raise notice 'Đã gỡ 21 câu C2 trước đó — bỏ qua.'; return; end if;
  if v_n <> 21 then raise exception 'Dừng: tìm thấy % / 21 câu giữ chỗ C2', v_n; end if;
  if v_bad > 0 then raise exception 'Dừng: % câu giữ chỗ C2 lệch vị trí', v_bad; end if;
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

-- ---------------------------------------------------------------------------------------------
-- 4. RPC chấm bài: nhận đáp án dạng số hoặc mảng (câu chọn nhiều)
-- ---------------------------------------------------------------------------------------------
create or replace function private.rusi_answer_set(v jsonb)
returns integer[]
language sql
immutable
set search_path to ''
as $$
  select case
    when v is null then null
    when jsonb_typeof(v) = 'array' then
      (select array_agg(distinct x::int order by x::int)
         from jsonb_array_elements_text(v) x where x ~ '^\d{1,3}$')
    when jsonb_typeof(v) in ('number', 'string') and (v #>> '{}') ~ '^\d{1,3}$' then array[(v #>> '{}')::int]
    else null end
$$;

create or replace function public.rusi_grade_trki_submission(p_test_code text, p_user_answers jsonb, p_time_spent_sec integer default 0, p_question_indices integer[] default null::integer[], p_record boolean default true)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_total_questions int := 0;
  v_graded int := 0;
  v_correct_count int := 0;
  v_score_percent numeric(5,2) := 0;
  v_passed boolean := false;
  v_submission_id uuid := null;
  v_row record;
  v_user_choice int;
  v_user_set int[];
  v_correct_set int[];
  v_ans jsonb;
  v_is_correct boolean;
  v_reviews jsonb := '[]'::jsonb;
  v_xp_earned int := 0;
  v_test record;
  v_part jsonb;
  v_q jsonb;
  v_correct_idx int;
  v_correct_ans text;
  v_ex text;
  v_meta record;
  v_pass_threshold numeric := 66.0;
  v_idx int;
begin
  select t.id, t.is_pro_only, coalesce(t.pass_percent, t.passing_score) as pass_pct into v_meta
  from public.trki_tests t
  where t.code = p_test_code or t.id = p_test_code
  order by (t.code = p_test_code) desc
  limit 1;

  if private.rusi_trki_scope_is_pro(p_test_code) and not private.rusi_user_is_pro(v_user_id) then
    return jsonb_build_object('success', false, 'pro_required', true, 'message', 'Đề thi dành cho tài khoản PRO.');
  end if;

  if v_meta.id is not null then
    if coalesce(v_meta.is_pro_only, false) and not private.rusi_user_is_pro(v_user_id) then
      return jsonb_build_object('success', false, 'pro_required', true, 'message', 'Đề thi dành cho tài khoản PRO.');
    end if;
    if v_meta.pass_pct is not null and v_meta.pass_pct > 0 and v_meta.pass_pct <= 100 then
      v_pass_threshold := v_meta.pass_pct;
    end if;
  end if;

  for v_row in
    select id, code, order_index, correct_index, correct_indices, correct_answer, explanation, points
    from public.trki_question_bank
    where test_code = p_test_code and is_published = true
    order by case sub_test
      when 'lexis_grammar' then 1
      when 'grammar' then 1
      when 'reading' then 2
      when 'listening' then 3
      when 'writing' then 4
      when 'speaking' then 5
      else 9 end, order_index asc, id asc
  loop
    v_idx := v_total_questions;
    v_total_questions := v_total_questions + 1;
    if p_question_indices is not null and not (v_idx = any(p_question_indices)) then
      v_reviews := v_reviews || jsonb_build_object('order_index', v_total_questions, 'skipped', true);
      continue;
    end if;
    v_graded := v_graded + 1;
    if p_user_answers ? v_idx::text then
      v_ans := p_user_answers -> v_idx::text;
    elsif v_row.code is not null and p_user_answers ? v_row.code then
      v_ans := p_user_answers -> v_row.code;
    elsif p_user_answers ? v_row.id::text then
      v_ans := p_user_answers -> v_row.id::text;
    else
      v_ans := null;
    end if;
    v_user_set := private.rusi_answer_set(v_ans);

    if coalesce(cardinality(v_row.correct_indices), 0) > 0 then
      -- Câu chọn nhiều: đúng khi chọn đủ và đúng mọi phương án
      v_correct_set := (select array_agg(distinct x order by x) from unnest(v_row.correct_indices) x);
      v_is_correct := (v_user_set is not null and v_user_set = v_correct_set);
      v_reviews := v_reviews || jsonb_build_object(
        'order_index', v_total_questions,
        'code', coalesce(v_row.code, v_row.id::text),
        'user_choice', to_jsonb(v_user_set),
        'correct_index', v_correct_set[1],
        'correct_indices', to_jsonb(v_correct_set),
        'correct_answer', coalesce(v_row.correct_answer, ''),
        'explanation', coalesce(v_row.explanation, ''),
        'is_correct', v_is_correct
      );
    else
      v_user_choice := case when cardinality(v_user_set) = 1 and jsonb_typeof(v_ans) <> 'array' then v_user_set[1] end;
      v_is_correct := (v_user_choice is not null and v_row.correct_index is not null and v_user_choice = v_row.correct_index);
      v_reviews := v_reviews || jsonb_build_object(
        'order_index', v_total_questions,
        'code', coalesce(v_row.code, v_row.id::text),
        'user_choice', v_user_choice,
        'correct_index', v_row.correct_index,
        'correct_answer', coalesce(v_row.correct_answer, ''),
        'explanation', coalesce(v_row.explanation, ''),
        'is_correct', v_is_correct
      );
    end if;
    if v_is_correct then v_correct_count := v_correct_count + 1; end if;
  end loop;

  if v_total_questions = 0 then
    select parts, part1, part2, part3 into v_test
    from public.trki_tests
    where (code = p_test_code or id = p_test_code) and is_published = true
    limit 1;

    if found then
      for v_part in
        select elem from jsonb_array_elements(
          case
            when v_test.parts is not null and jsonb_typeof(v_test.parts) = 'array' and jsonb_array_length(v_test.parts) > 0
            then v_test.parts
            else jsonb_build_array(v_test.part1, v_test.part2, v_test.part3)
          end
        ) elem
      loop
        if v_part is not null and jsonb_typeof(v_part->'questions') = 'array' then
          for v_q in select elem from jsonb_array_elements(v_part->'questions') elem
          loop
            if p_question_indices is not null and not (v_total_questions = any(p_question_indices)) then
              v_reviews := v_reviews || jsonb_build_object('order_index', v_total_questions + 1, 'skipped', true);
              v_total_questions := v_total_questions + 1;
              continue;
            end if;
            v_graded := v_graded + 1;
            v_correct_idx := coalesce((v_q->>'a')::int, (v_q->>'correct')::int, (v_q->>'correct_index')::int);
            v_correct_ans := coalesce(v_q->>'ans', v_q->'options'->>v_correct_idx, '');
            v_ex := coalesce(v_q->>'ex', v_q->>'explanation', '');
            v_ans := p_user_answers -> v_total_questions::text;
            v_user_set := private.rusi_answer_set(v_ans);
            v_user_choice := case when cardinality(v_user_set) = 1 and jsonb_typeof(v_ans) <> 'array' then v_user_set[1] end;

            v_is_correct := (v_user_choice is not null and v_correct_idx is not null and v_user_choice = v_correct_idx);
            if v_is_correct then v_correct_count := v_correct_count + 1; end if;

            v_reviews := v_reviews || jsonb_build_object(
              'order_index', v_total_questions + 1,
              'code', coalesce(v_q->>'code', p_test_code || '_' || v_total_questions::text),
              'user_choice', v_user_choice,
              'correct_index', v_correct_idx,
              'correct_answer', v_correct_ans,
              'explanation', v_ex,
              'is_correct', v_is_correct
            );
            v_total_questions := v_total_questions + 1;
          end loop;
        end if;
      end loop;
    end if;
  end if;

  if v_total_questions = 0 then
    return jsonb_build_object(
      'success', false,
      'message', 'Không tìm thấy ngân hàng câu hỏi cho mã đề: ' || p_test_code
    );
  end if;
  if v_graded = 0 then
    return jsonb_build_object('success', false, 'message', 'Không có câu hỏi nào được chọn để chấm.');
  end if;

  v_score_percent := round((v_correct_count::numeric / v_graded::numeric) * 100, 2);
  v_passed := (v_score_percent >= v_pass_threshold);

  if p_record and v_user_id is not null and v_meta.id is not null then
    insert into public.trki_submissions (
      user_id, exam_id, score_percent, passed, user_answers, time_spent_sec, submitted_at
    ) values (
      v_user_id, v_meta.id, v_score_percent, v_passed, p_user_answers, p_time_spent_sec, now()
    ) returning id into v_submission_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', v_submission_id,
    'test_code', p_test_code,
    'score_percent', v_score_percent,
    'passed', v_passed,
    'pass_percent', v_pass_threshold,
    'correct_count', v_correct_count,
    'total_questions', v_graded,
    'time_spent_sec', p_time_spent_sec,
    'xp_earned', v_xp_earned,
    'reviews', v_reviews
  );
end;
$function$;

-- RPC kiểm tra 1 câu (chế độ Luyện tập): thêm p_user_choices cho câu chọn nhiều
drop function if exists public.rusi_check_trki_question(text, integer, integer);
create or replace function public.rusi_check_trki_question(p_test_code text, p_question_index integer, p_user_choice integer default null, p_user_choices integer[] default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  v_row record;
  v_test record;
  v_part jsonb;
  v_q jsonb;
  v_idx int := 0;
  v_correct_idx int;
  v_correct_ans text;
  v_ex text;
  v_user_set int[];
  v_correct_set int[];
begin
  if p_test_code is null or p_question_index is null or p_question_index < 0
     or (p_user_choice is null and coalesce(cardinality(p_user_choices), 0) = 0) then
    return jsonb_build_object('found', false);
  end if;

  if private.rusi_trki_scope_is_pro(p_test_code)
     and not private.rusi_user_is_pro(auth.uid()) then
    return jsonb_build_object('found', false, 'pro_required', true);
  end if;

  select correct_index, correct_indices, correct_answer, explanation into v_row
  from public.trki_question_bank
  where test_code = p_test_code and is_published = true
  order by case sub_test
    when 'lexis_grammar' then 1
    when 'grammar' then 1
    when 'reading' then 2
    when 'listening' then 3
    when 'writing' then 4
    when 'speaking' then 5
    else 9 end, order_index asc, id asc
  offset p_question_index limit 1;

  if found then
    if coalesce(cardinality(v_row.correct_indices), 0) > 0 then
      v_correct_set := (select array_agg(distinct x order by x) from unnest(v_row.correct_indices) x);
      v_user_set := (select array_agg(distinct x order by x)
                       from unnest(coalesce(p_user_choices, array[p_user_choice])) x where x is not null);
      return jsonb_build_object(
        'found', true,
        'is_correct', (v_user_set = v_correct_set),
        'correct_index', v_correct_set[1],
        'correct_indices', to_jsonb(v_correct_set),
        'correct_answer', coalesce(v_row.correct_answer, ''),
        'explanation', coalesce(v_row.explanation, '')
      );
    end if;
    return jsonb_build_object(
      'found', true,
      'is_correct', (v_row.correct_index is not null and p_user_choice = v_row.correct_index),
      'correct_index', v_row.correct_index,
      'correct_answer', coalesce(v_row.correct_answer, ''),
      'explanation', coalesce(v_row.explanation, '')
    );
  end if;

  select parts, part1, part2, part3 into v_test
  from public.trki_tests
  where (code = p_test_code or id = p_test_code) and is_published = true
  limit 1;

  if found then
    for v_part in
      select elem from jsonb_array_elements(
        case
          when v_test.parts is not null and jsonb_typeof(v_test.parts) = 'array' and jsonb_array_length(v_test.parts) > 0
          then v_test.parts
          else jsonb_build_array(v_test.part1, v_test.part2, v_test.part3)
        end
      ) elem
    loop
      if v_part is not null and jsonb_typeof(v_part->'questions') = 'array' then
        for v_q in select elem from jsonb_array_elements(v_part->'questions') elem
        loop
          if v_idx = p_question_index then
            v_correct_idx := coalesce((v_q->>'a')::int, (v_q->>'correct')::int, (v_q->>'correct_index')::int);
            v_correct_ans := coalesce(v_q->>'ans', v_q->'options'->>v_correct_idx, '');
            v_ex := coalesce(v_q->>'ex', v_q->>'explanation', '');
            return jsonb_build_object(
              'found', true,
              'is_correct', (v_correct_idx is not null and p_user_choice = v_correct_idx),
              'correct_index', v_correct_idx,
              'correct_answer', v_correct_ans,
              'explanation', v_ex
            );
          end if;
          v_idx := v_idx + 1;
        end loop;
      end if;
    end loop;
  end if;

  return jsonb_build_object('found', false);
end;
$function$;

revoke all on function public.rusi_check_trki_question(text, integer, integer, integer[]) from public, anon;
grant execute on function public.rusi_check_trki_question(text, integer, integer, integer[]) to authenticated, service_role;
revoke all on function public.rusi_grade_trki_submission(text, jsonb, integer, integer[], boolean) from public, anon;
grant execute on function public.rusi_grade_trki_submission(text, jsonb, integer, integer[], boolean) to authenticated, service_role;
revoke all on function private.rusi_answer_set(jsonb) from public, anon;
