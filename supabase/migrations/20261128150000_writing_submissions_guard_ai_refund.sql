-- B-05 Luyện viết AI (28/11/2026). Idempotent. CHƯA áp dụng — chạy TRƯỚC khi deploy Edge Function ai-review mới.
--
-- 1. writing_submissions: học viên đã có quyền INSERT bài của chính mình (policy "Users can insert own writing submissions",
--    with_check auth.uid() = user_id) nhưng trigger rusi_submission_guard chỉ chặn UPDATE → client tự khai được
--    status='graded', graded_at, teacher_notes, assigned_teacher_id. Thêm trigger BEFORE INSERT: người gọi không đặc quyền
--    (không phải admin / service_role) luôn bị ép status='submitted', xoá các cột của giáo viên, và ai_feedback được gắn
--    "source":"client" (điểm do trình duyệt tự báo, chưa kiểm chứng). Bản ghi do Edge Function ai-review ghi bằng
--    service_role giữ nguyên status='graded', "source":"server".
-- 2. public.rusi_refund_ai_quota(p_user_id): trả lại 1 lượt chấm AI hôm nay khi Groq lỗi/timeout/trả kết quả hỏng —
--    học viên không bị mất lượt vì sự cố hệ thống. Chỉ service_role (Edge Function) gọi được.

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

create or replace function public.rusi_refund_ai_quota(p_user_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_today date := (now() at time zone 'Asia/Ho_Chi_Minh')::date;
  v_used int;
begin
  if coalesce(auth.jwt() ->> 'role', '') <> 'service_role' and not private.rusi_is_privileged_caller() then
    raise exception 'Chỉ máy chủ được hoàn lượt chấm AI' using errcode = '42501';
  end if;
  update public.user_ai_usage
     set used_count = greatest(used_count - 1, 0),
         updated_at = now()
   where user_id = p_user_id and usage_date = v_today and used_count > 0
  returning used_count into v_used;
  return jsonb_build_object('refunded', v_used is not null, 'used_count', coalesce(v_used, 0));
end
$$;
revoke all on function public.rusi_refund_ai_quota(uuid) from public, anon, authenticated;
grant execute on function public.rusi_refund_ai_quota(uuid) to service_role;

-- Kiểm tra sau khi áp dụng:
-- select tgname from pg_trigger where tgrelid = 'public.writing_submissions'::regclass and not tgisinternal;  -- có rusi_submission_insert_guard
-- select has_function_privilege('authenticated', 'public.rusi_refund_ai_quota(uuid)', 'execute');            -- false
