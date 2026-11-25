-- Vá RPC thi TRKI (kiểm chứng E2E 2026-11-25). Idempotent. Giữ nguyên thuật toán chấm/ghép câu hiện có.
--
-- 1. rusi_check_trki_question: oracle lộ đáp án — trả correct_index cho mọi câu kể cả đề PRO và khi
--    chưa chọn đáp án. Sửa: bắt buộc có lựa chọn; đề PRO chỉ cho người có PRO (hoặc admin).
-- 2. rusi_grade_trki_submission:
--    - đề PRO trả đáp án cho người không PRO → chặn;
--    - exam_id ghi p_test_code (code) nhưng FK trỏ trki_tests(id) → đề có id ≠ code lỗi 23503 → tra id thật;
--    - ngưỡng đạt cố định 66 → dùng pass_percent/passing_score của đề (mặc định 66);
--    - cộng 30 XP mọi lần nộp (kể cả 0%, nộp lặp) → chỉ cộng khi đạt lần đầu đề đó.
-- 3. Bỏ policy cho học viên INSERT thẳng trki_submissions (tự ghi điểm 100). RPC SECURITY DEFINER vẫn ghi được.

create or replace function private.rusi_user_is_pro(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.is_admin(p_uid), false)
    or exists (
      select 1 from public.profiles p
      where p.id = p_uid and p.is_pro = true and (p.pro_expires_at is null or p.pro_expires_at > now())
    );
$$;
revoke all on function private.rusi_user_is_pro(uuid) from public, anon;
grant execute on function private.rusi_user_is_pro(uuid) to authenticated, service_role;

-- ---------- 1. Kiểm tra từng câu (chế độ luyện tập) ----------
create or replace function public.rusi_check_trki_question(p_test_code text, p_question_index integer, p_user_choice integer)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
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
begin
  -- Chỉ trả đáp án sau khi học viên đã chọn
  if p_test_code is null or p_question_index is null or p_question_index < 0 or p_user_choice is null then
    return jsonb_build_object('found', false);
  end if;

  -- Đề PRO: chỉ người có PRO
  if exists (select 1 from public.trki_tests t where (t.code = p_test_code or t.id = p_test_code) and t.is_pro_only = true)
     and not private.rusi_user_is_pro(auth.uid()) then
    return jsonb_build_object('found', false, 'pro_required', true);
  end if;

  -- 1. Try trki_question_bank
  select correct_index, correct_answer, explanation into v_row
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
    return jsonb_build_object(
      'found', true,
      'is_correct', (v_row.correct_index is not null and p_user_choice = v_row.correct_index),
      'correct_index', v_row.correct_index,
      'correct_answer', coalesce(v_row.correct_answer, ''),
      'explanation', coalesce(v_row.explanation, '')
    );
  end if;

  -- 2. Fallback to public.trki_tests JSONB
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

-- ---------- 2. Chấm cả bài ----------
create or replace function public.rusi_grade_trki_submission(p_test_code text, p_user_answers jsonb, p_time_spent_sec integer default 0)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_total_questions int := 0;
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
begin
  -- Đề (id thật cho FK, ngưỡng đạt, cờ PRO)
  select t.id, t.is_pro_only, coalesce(t.pass_percent, t.passing_score) as pass_pct into v_meta
  from public.trki_tests t
  where t.code = p_test_code or t.id = p_test_code
  order by (t.code = p_test_code) desc
  limit 1;

  if found then
    if coalesce(v_meta.is_pro_only, false) and not private.rusi_user_is_pro(v_user_id) then
      return jsonb_build_object('success', false, 'pro_required', true, 'message', 'Đề thi dành cho tài khoản PRO.');
    end if;
    if v_meta.pass_pct is not null and v_meta.pass_pct > 0 and v_meta.pass_pct <= 100 then
      v_pass_threshold := v_meta.pass_pct;
    end if;
  end if;

  -- 1. Try trki_question_bank first
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
    v_total_questions := v_total_questions + 1;
    if p_user_answers ? (v_total_questions - 1)::text then
      v_user_choice := (p_user_answers ->> (v_total_questions - 1)::text)::int;
    elsif v_row.code is not null and p_user_answers ? v_row.code then
      v_user_choice := (p_user_answers ->> v_row.code)::int;
    elsif p_user_answers ? v_row.id::text then
      v_user_choice := (p_user_answers ->> v_row.id)::int;
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

  -- 2. Fallback to public.trki_tests JSONB for tests not mirrored into trki_question_bank
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

  v_score_percent := round((v_correct_count::numeric / v_total_questions::numeric) * 100, 2);
  v_passed := (v_score_percent >= v_pass_threshold);

  -- Chỉ lưu bài khi tra được đề thật (FK exam_id → trki_tests.id)
  if v_user_id is not null and v_meta.id is not null then
    -- XP chỉ cho lần đầu đạt đề này
    if v_passed and not exists (
      select 1 from public.trki_submissions s
      where s.user_id = v_user_id and s.exam_id = v_meta.id and s.passed = true
    ) then
      v_xp_earned := 30;
    end if;

    insert into public.trki_submissions (
      user_id, exam_id, score_percent, passed, user_answers, time_spent_sec, submitted_at
    ) values (
      v_user_id, v_meta.id, v_score_percent, v_passed, p_user_answers, p_time_spent_sec, now()
    ) returning id into v_submission_id;

    if v_xp_earned > 0 then
      insert into public.user_progress (user_id, xp_total, updated_at)
      values (v_user_id, v_xp_earned, now())
      on conflict (user_id) do update set
        xp_total = public.user_progress.xp_total + v_xp_earned,
        updated_at = now();
    end if;
  end if;

  return jsonb_build_object(
    'success', true,
    'submission_id', v_submission_id,
    'test_code', p_test_code,
    'score_percent', v_score_percent,
    'passed', v_passed,
    'pass_percent', v_pass_threshold,
    'correct_count', v_correct_count,
    'total_questions', v_total_questions,
    'time_spent_sec', p_time_spent_sec,
    'xp_earned', v_xp_earned,
    'reviews', v_reviews
  );
end;
$function$;

revoke all on function public.rusi_check_trki_question(text, integer, integer) from public, anon;
grant execute on function public.rusi_check_trki_question(text, integer, integer) to authenticated, service_role;
revoke all on function public.rusi_grade_trki_submission(text, jsonb, integer) from public, anon;
grant execute on function public.rusi_grade_trki_submission(text, jsonb, integer) to authenticated, service_role;

-- ---------- 3. Học viên không tự ghi điểm ----------
drop policy if exists "Users can insert own trki submissions" on public.trki_submissions;
