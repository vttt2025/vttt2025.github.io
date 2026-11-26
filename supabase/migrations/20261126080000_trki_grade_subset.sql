-- Chấm TRKI theo phần: chỉ chấm và trả đáp án các câu được chọn (thi từng phần), không lưu kết quả luyện tập.
--  p_question_indices: chỉ số câu toàn đề (0-based, theo thứ tự chấm) cần chấm; null = cả đề (như trước).
--    Câu ngoài danh sách: không tính điểm, mục reviews chỉ có order_index + skipped (không có đáp án).
--  p_record: false → không ghi trki_submissions (chế độ luyện tập).
-- Bỏ bản 3 tham số trước (tránh PostgREST nhập nhằng overload); lời gọi cũ 3 tham số vẫn chạy nhờ giá trị mặc định.
drop function if exists public.rusi_grade_trki_submission(text, jsonb, integer);

create or replace function public.rusi_grade_trki_submission(
  p_test_code text, p_user_answers jsonb, p_time_spent_sec integer default 0,
  p_question_indices integer[] default null, p_record boolean default true)
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
    select id, code, order_index, correct_index, correct_answer, explanation, points
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
      v_user_choice := (p_user_answers ->> v_idx::text)::int;
    elsif v_row.code is not null and p_user_answers ? v_row.code then
      v_user_choice := (p_user_answers ->> v_row.code)::int;
    elsif p_user_answers ? v_row.id::text then
      v_user_choice := (p_user_answers ->> v_row.id::text)::int;
    else
      v_user_choice := null;
    end if;

    v_is_correct := (v_user_choice is not null and v_row.correct_index is not null and v_user_choice = v_row.correct_index);
    if v_is_correct then v_correct_count := v_correct_count + 1; end if;

    v_reviews := v_reviews || jsonb_build_object(
      'order_index', v_total_questions,
      'code', coalesce(v_row.code, v_row.id::text),
      'user_choice', v_user_choice,
      'correct_index', v_row.correct_index,
      'correct_answer', coalesce(v_row.correct_answer, ''),
      'explanation', coalesce(v_row.explanation, ''),
      'is_correct', v_is_correct
    );
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
            if p_user_answers ? v_total_questions::text then
              v_user_choice := (p_user_answers ->> v_total_questions::text)::int;
            else
              v_user_choice := null;
            end if;

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

revoke all on function public.rusi_grade_trki_submission(text, jsonb, integer, integer[], boolean) from public, anon;
grant execute on function public.rusi_grade_trki_submission(text, jsonb, integer, integer[], boolean) to authenticated, service_role;
