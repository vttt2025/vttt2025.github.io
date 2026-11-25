-- =============================================================================
-- Sửa lỗi đăng ký tài khoản mới (Supabase Auth: "Database error saving new user").
-- Trigger rusi_auth_user_created trên auth.users luôn INSERT vào public.learner_stats — bảng này
-- không tồn tại (thiết kế cũ) → mọi lượt đăng ký bị rollback (tài khoản cuối tạo được: 01/11/2026).
-- Thay bằng public.user_progress (bảng tiến độ đang dùng, PROJECT_SPEC Mục 7.2). Idempotent.
-- =============================================================================
create or replace function private.rusi_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_tz text;
begin
  select name into v_tz
    from pg_catalog.pg_timezone_names
   where name = new.raw_user_meta_data ->> 'timezone';

  insert into public.profiles (id, full_name, avatar_url, timezone)
  values (new.id,
          left(nullif(new.raw_user_meta_data ->> 'full_name', ''), 160),
          new.raw_user_meta_data ->> 'avatar_url',
          coalesce(v_tz, 'Asia/Ho_Chi_Minh'))
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;
