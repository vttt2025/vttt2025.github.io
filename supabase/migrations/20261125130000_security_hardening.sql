-- =============================================================================
-- Vá bảo mật theo PROJECT_SPEC Mục 7.5 (đối chiếu 25/11/2026). Idempotent: chạy lại an toàn.
--
-- 1. Zero-Answer Leak — trki_tests: các cột answers/part1..5/parts/sections/raw_data đều chứa đáp án
--    ("a", "ex"...). Bỏ quyền đọc trực tiếp bảng cho anon/authenticated (admin vẫn đọc qua policy
--    "Admins manage trki_tests"); client và scripts/publish-content.js đọc view trki_tests_public
--    đã xoá mọi khoá đáp án (cùng danh sách ANSWER_KEYS của publish-content.js).
-- 2. Zero-Answer Leak — trki_question_bank: anon đọc được correct_index/correct_answer/explanation.
--    Bỏ policy đọc công khai; view trki_questions_public chạy quyền chủ view (security_invoker = false)
--    để vẫn trả câu hỏi đã xuất bản, không có cột đáp án.
--    Hai view chỉ cấp SELECT (view đơn giản có thể ghi được → thu hồi INSERT/UPDATE/DELETE).
-- 3. user_progress: học viên tự ghi được XP/streak tuỳ ý. Trigger chặn: XP không giảm, mỗi lần ghi
--    chỉ tăng tối đa 100 + 100/phút kể từ lần ghi trước (trần 5000); streak chỉ +1 khi
--    last_study_date tiến lên; last_study_date không vượt quá ngày mai. Admin/service_role không bị chặn.
--    Đây là biện pháp giảm thiểu; muốn chặn hẳn phải cộng XP phía server (rusi_award_xp).
-- 4. sync_my_progress: đang ghi vào cột không tồn tại của profiles → sửa sang user_progress
--    (đi qua trigger ở bước 3).
-- 5. Kiểm tra phiên private.rusi_session_ok(): policy permissive rusi_read/rusi_update bị OR với policy
--    cũ nên vô tác dụng → thay bằng policy RESTRICTIVE.
-- =============================================================================

-- ---------- 1. trki_tests ----------
create or replace function private.rusi_strip_answer_keys(j jsonb)
returns jsonb
language plpgsql
immutable
security definer -- gọi đệ quy theo tên trong schema private, anon/authenticated không có USAGE
set search_path = ''
as $$
declare
  v_keys constant text[] := array['a', 'ex', 'ans', 'answer', 'answers', 'answer_key', 'official_key',
    'correct_answer', 'correct_index', 'correct_option', 'correctIndex', 'explanation'];
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
$$;
revoke all on function private.rusi_strip_answer_keys(jsonb) from public;
grant execute on function private.rusi_strip_answer_keys(jsonb) to anon, authenticated;

create or replace view public.trki_tests_public
with (security_invoker = false)
as
select t.id, t.code, t.title, t.level, t.level_name, t.category, t.sub_test_type,
       t.duration_min, t.duration_minutes, t.pass_percent, t.passing_score,
       t.is_pro_only, t.is_published, t.test_mode, t.created_at, t.updated_at,
       private.rusi_strip_answer_keys(t.part1)    as part1,
       private.rusi_strip_answer_keys(t.part2)    as part2,
       private.rusi_strip_answer_keys(t.part3)    as part3,
       private.rusi_strip_answer_keys(t.part4)    as part4,
       private.rusi_strip_answer_keys(t.part5)    as part5,
       private.rusi_strip_answer_keys(t.parts)    as parts,
       private.rusi_strip_answer_keys(t.sections) as sections,
       private.rusi_strip_answer_keys(t.raw_data) as raw_data
  from public.trki_tests t
 where t.is_published = true;
revoke all on public.trki_tests_public from anon, authenticated;
grant select on public.trki_tests_public to anon, authenticated;

drop policy if exists "Public read trki_tests" on public.trki_tests;

-- ---------- 2. trki_question_bank ----------
drop policy if exists "Public read published trki_question_bank columns" on public.trki_question_bank;
alter view public.trki_questions_public set (security_invoker = false);
revoke all on public.trki_questions_public from anon, authenticated;
grant select on public.trki_questions_public to anon, authenticated;

-- ---------- 3. user_progress ----------
create or replace function private.rusi_guard_user_progress()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_privileged boolean := auth.uid() is null
    or coalesce(current_setting('request.jwt.claim.role', true), '') = 'service_role'
    or coalesce(auth.jwt() ->> 'role', '') = 'service_role'
    or public.is_admin(auth.uid());
  v_max_gain bigint;
begin
  if v_privileged then
    return new;
  end if;

  if tg_op = 'INSERT' then
    -- Upsert của client: nếu dòng đã có, nhánh UPDATE của trigger sẽ kiểm tra.
    if exists (select 1 from public.user_progress p where p.user_id = new.user_id) then
      return new;
    end if;
    new.xp_total := least(greatest(coalesce(new.xp_total, 0), 0), 500);
    new.streak_count := least(greatest(coalesce(new.streak_count, 0), 0), 1);
    new.last_study_date := least(new.last_study_date, current_date + 1);
    new.updated_at := now();
    return new;
  end if;

  if new.user_id is distinct from old.user_id then
    raise exception 'user_progress.user_id is immutable';
  end if;

  v_max_gain := least(5000, 100 + floor(extract(epoch from (now() - coalesce(old.updated_at, now() - interval '1 day'))) / 60)::bigint * 100);
  new.xp_total := least(greatest(coalesce(new.xp_total, 0), old.xp_total), old.xp_total + v_max_gain);

  new.last_study_date := least(coalesce(new.last_study_date, old.last_study_date), current_date + 1);
  if old.last_study_date is not null and new.last_study_date < old.last_study_date then
    new.last_study_date := old.last_study_date;
  end if;

  if coalesce(new.streak_count, 0) > old.streak_count then
    new.streak_count := case
      when old.last_study_date is null or new.last_study_date > old.last_study_date then old.streak_count + 1
      else old.streak_count
    end;
  else
    new.streak_count := greatest(coalesce(new.streak_count, 0), 0);
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists rusi_guard_user_progress on public.user_progress;
create trigger rusi_guard_user_progress
  before insert or update on public.user_progress
  for each row execute function private.rusi_guard_user_progress();

-- ---------- 4. sync_my_progress ----------
create or replace function public.sync_my_progress(p_streak integer, p_xp integer, p_mascot_level integer default 1)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  -- p_mascot_level: chưa có cột lưu, giữ tham số để client cũ không lỗi.
  insert into public.user_progress (user_id, xp_total, streak_count)
  values (auth.uid(), greatest(coalesce(p_xp, 0), 0), greatest(coalesce(p_streak, 0), 0))
  on conflict (user_id) do update
    set xp_total = excluded.xp_total,
        streak_count = excluded.streak_count;
end;
$$;
revoke all on function public.sync_my_progress(integer, integer, integer) from public, anon;
grant execute on function public.sync_my_progress(integer, integer, integer) to authenticated;

-- ---------- 5. Kiểm tra phiên (RESTRICTIVE) ----------
drop policy if exists rusi_read on public.profiles;
drop policy if exists rusi_update on public.profiles;
drop policy if exists rusi_session_guard on public.profiles;
create policy rusi_session_guard on public.profiles as restrictive for all to authenticated
  using (private.rusi_session_ok()) with check (private.rusi_session_ok());

drop policy if exists rusi_read on public.orders;
drop policy if exists rusi_session_guard on public.orders;
create policy rusi_session_guard on public.orders as restrictive for all to authenticated
  using (private.rusi_session_ok()) with check (private.rusi_session_ok());

drop policy if exists rusi_read on public.user_vocab_progress;
drop policy if exists rusi_session_guard on public.user_vocab_progress;
create policy rusi_session_guard on public.user_vocab_progress as restrictive for all to authenticated
  using (private.rusi_session_ok()) with check (private.rusi_session_ok());
