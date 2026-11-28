-- B-16 Studio Chấm bài viết cho giáo viên (28/11/2026). Idempotent. CHƯA áp dụng.
--
-- Hiện trạng (chỉ đọc 28/11/2026):
--   * writing_submissions chỉ có policy SELECT (chính chủ; rusi_read: chính chủ / academic_admin(+super_admin) /
--     teacher với bài assigned_teacher_id = mình) và INSERT (chính chủ). KHÔNG có policy UPDATE nào → cả admin lẫn
--     giáo viên đều không nhập được điểm/nhận xét.
--   * Trigger rusi_submission_guard (BEFORE UPDATE) chỉ cho đổi status, assigned_teacher_id, teacher_notes, graded_at.
--   * Không có cột điểm của giáo viên (overall_score là điểm AI, bất biến).
--   * Role teacher không có quyền ghi bảng nào khác (is_admin() chỉ gồm academic_admin, super_admin) — giữ nguyên.
-- Thay đổi:
--   1. Cột teacher_score numeric(5,2) 0..100 (điểm giáo viên, tách khỏi điểm AI).
--   2. rusi_submission_guard cho đổi thêm teacher_score; tự đặt graded_at khi chuyển sang 'graded'.
--   3. Trigger chặn INSERT tự khai (B-05, migration 20261128150000) xoá cả teacher_score — tạo lại đầy đủ ở đây để
--      không phụ thuộc thứ tự áp dụng.
--   4. Policy:
--      - rusi_teacher_read_unassigned (SELECT): giáo viên xem được bài CHƯA ai nhận (để nhận chấm).
--      - rusi_grade_update (UPDATE): admin (is_admin) sửa mọi bài; giáo viên sửa bài chưa ai nhận hoặc của mình,
--        sau khi sửa bài phải thuộc về mình (assigned_teacher_id = auth.uid()) → không gán bài cho người khác.
--      Học viên vẫn không có UPDATE. Không thêm DELETE cho ai.

alter table public.writing_submissions add column if not exists teacher_score numeric(5,2);
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'writing_submissions_teacher_score_check'
                   and conrelid = 'public.writing_submissions'::regclass) then
    alter table public.writing_submissions
      add constraint writing_submissions_teacher_score_check
      check (teacher_score is null or (teacher_score >= 0 and teacher_score <= 100));
  end if;
end
$$;

create or replace function private.rusi_submission_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (to_jsonb(new) - array['status','assigned_teacher_id','teacher_notes','graded_at','teacher_score']) is distinct from
     (to_jsonb(old) - array['status','assigned_teacher_id','teacher_notes','graded_at','teacher_score']) then
    raise exception 'Submitted work is immutable; create a new submission';
  end if;
  if new.status = 'graded' and new.graded_at is null then
    new.graded_at := now();
  end if;
  return new;
end
$$;

create or replace function private.rusi_submission_insert_guard()
returns trigger
language plpgsql
security definer -- authenticated không có USAGE trên schema private; auth.jwt() vẫn là JWT của request
set search_path = ''
as $$
begin
  if not private.rusi_is_privileged_caller() then
    new.status := 'submitted';
    new.graded_at := null;
    new.assigned_teacher_id := null;
    new.teacher_notes := null;
    new.teacher_score := null;
    new.ai_feedback := coalesce(new.ai_feedback, '{}'::jsonb) || jsonb_build_object('source', 'client');
  end if;
  return new;
end
$$;
revoke all on function private.rusi_submission_insert_guard() from public, anon, authenticated;

drop trigger if exists rusi_submission_insert_guard on public.writing_submissions;
create trigger rusi_submission_insert_guard
  before insert on public.writing_submissions
  for each row execute function private.rusi_submission_insert_guard();

drop policy if exists rusi_teacher_read_unassigned on public.writing_submissions;
create policy rusi_teacher_read_unassigned on public.writing_submissions
  for select to authenticated
  using (private.rusi_session_ok() and assigned_teacher_id is null and private.rusi_has_role(array['teacher']));

drop policy if exists rusi_grade_update on public.writing_submissions;
create policy rusi_grade_update on public.writing_submissions
  for update to authenticated
  using (
    private.rusi_session_ok() and (
      public.is_admin((select auth.uid()))
      or (private.rusi_has_role(array['teacher'])
          and (assigned_teacher_id is null or assigned_teacher_id = (select auth.uid())))
    )
  )
  with check (
    private.rusi_session_ok() and (
      public.is_admin((select auth.uid()))
      or (private.rusi_has_role(array['teacher']) and assigned_teacher_id = (select auth.uid()))
    )
  );

-- Kiểm tra sau khi áp dụng:
-- select policyname, cmd from pg_policies where schemaname = 'public' and tablename = 'writing_submissions' order by 1;
--   → có rusi_grade_update (UPDATE), rusi_teacher_read_unassigned (SELECT)
-- select column_name from information_schema.columns where table_name = 'writing_submissions' and column_name = 'teacher_score';
