-- =============================================================================
-- CMS: chặn leo thang quyền + chặn ghi đè bản cũ cho đơn hàng / hồ sơ (28/11/2026)
--
-- 1. Trước đây private.rusi_validate_profile coi mọi is_admin() (academic_admin, super_admin) là có đặc quyền,
--    nên academic_admin tự nâng mình (hoặc người khác) lên super_admin qua CMS.
--    Nay: đổi role chỉ do super_admin (hoặc postgres / service_role). is_pro / pro_expires_at vẫn cho mọi admin.
-- 2. orders, profiles chưa có trigger rusi_00_stale_guard: admin lưu đơn đã tải lúc 'pending' sẽ ghi đè
--    trạng thái 'paid' do Casso vừa cập nhật. Gắn cùng trigger như các bảng nội dung (CMS gửi updated_at đã tải).
-- Idempotent: chạy lại an toàn.
-- =============================================================================

create or replace function private.rusi_is_super_admin(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path to ''
as $$
  select exists (select 1 from public.profiles p where p.id = p_uid and p.role = 'super_admin');
$$;
revoke all on function private.rusi_is_super_admin(uuid) from public, anon, authenticated;

create or replace function private.rusi_validate_profile()
returns trigger
language plpgsql
set search_path to ''
as $function$
declare
  v_jwt_role text := coalesce(current_setting('request.jwt.claim.role', true), '');
  v_is_system boolean := (
    current_user in ('postgres', 'supabase_admin', 'supabase_auth_admin')
    or v_jwt_role = 'service_role'
  );
  v_is_privileged boolean := (v_is_system or public.is_admin(auth.uid()));
  v_can_set_role boolean := (v_is_system or private.rusi_is_super_admin(auth.uid()));
begin
  if new.timezone is not null and not exists (
    select 1 from pg_catalog.pg_timezone_names where name = new.timezone
  ) then
    raise exception 'Invalid IANA timezone';
  end if;

  if tg_op = 'INSERT' then
    if not v_is_privileged then
      new.role := 'student';
      new.is_pro := false;
      new.pro_expires_at := null;
    elsif not v_can_set_role then
      new.role := 'student';
    end if;
  elsif tg_op = 'UPDATE' then
    if new.id <> old.id or new.created_at <> old.created_at then
      raise exception 'Profile identity/created_at is immutable';
    end if;
    if new.role is distinct from old.role and not v_can_set_role then
      raise exception 'Chỉ Super Admin mới được đổi vai trò tài khoản';
    end if;
    if not v_is_privileged then
      if new.is_pro is distinct from old.is_pro
         or new.pro_expires_at is distinct from old.pro_expires_at then
        raise exception 'Unauthorized modification of privileged profile fields';
      end if;
    end if;
  end if;

  return new;
end;
$function$;

do $$
declare
  t text;
begin
  foreach t in array array['orders', 'profiles'] loop
    if exists (select 1 from information_schema.columns
                where table_schema = 'public' and table_name = t and column_name = 'updated_at') then
      execute format('drop trigger if exists rusi_00_stale_guard on public.%I', t);
      execute format('create trigger rusi_00_stale_guard before update on public.%I
                      for each row execute function private.rusi_reject_stale_write()', t);
    end if;
  end loop;
end $$;
