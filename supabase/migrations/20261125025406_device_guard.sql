-- =============================================================================
-- Device Guard: giới hạn số thiết bị đăng nhập đồng thời cho tài khoản PRO.
-- Client: supabase-client.js (deviceGuard.*) + auth.js (verifyDeviceGuard).
--
-- Ghi lại đúng schema/RPC đang chạy trên production (tạo tay trước đây, đối chiếu
-- ngày 2026-11-25) + 2 bản vá:
--   1. rusi_register_device: khoá advisory theo user để 2 thiết bị đăng ký cùng lúc
--      không cùng lọt qua giới hạn.
--   2. Thu hồi quyền EXECUTE của anon trên rusi_revoke_all_devices / rusi_revoke_my_device.
-- Idempotent: chạy lại nhiều lần an toàn.
-- =============================================================================

-- 1. Bảng ----------------------------------------------------------------------
create table if not exists public.user_device_sessions (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  device_fingerprint text not null,
  device_name        text,
  device_type        text default 'unknown',
  browser            text,
  os                 text,
  ip_address         text,
  is_active          boolean default true,
  last_active_at     timestamptz default now(),
  created_at         timestamptz default now(),
  unique (user_id, device_fingerprint)
);

alter table public.user_device_sessions enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_device_sessions' and policyname = 'Users view own device sessions') then
    create policy "Users view own device sessions" on public.user_device_sessions
      for select to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_device_sessions' and policyname = 'Users delete own device sessions') then
    create policy "Users delete own device sessions" on public.user_device_sessions
      for delete to authenticated using ((select auth.uid()) = user_id);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_device_sessions' and policyname = 'Admins manage all device sessions') then
    create policy "Admins manage all device sessions" on public.user_device_sessions
      for all to authenticated using (public.current_user_is_admin());
  end if;
end $$;

-- 2. Đăng ký / làm mới thiết bị hiện tại ----------------------------------------
create or replace function public.rusi_register_device(
  p_fingerprint text,
  p_device_name text default 'Thiết bị không rõ',
  p_device_type text default 'desktop',
  p_browser     text default 'Trình duyệt',
  p_os          text default 'Hệ điều hành'
)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
DECLARE
  v_user_id uuid := auth.uid();
  v_is_pro boolean := false;
  v_is_adm boolean := false;
  v_max_devices int := 2;
  v_active_count int := 0;
  v_session_id uuid;
  v_existing record;
  v_active_devices jsonb;
BEGIN
  -- Khách vãng lai: cho phép ngay
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('allowed', true, 'guest', true);
  END IF;

  -- Kiểm tra vai trò Admin: Admin không bao giờ bị giới hạn thiết bị
  BEGIN
    SELECT public.is_admin(v_user_id) INTO v_is_adm;
  EXCEPTION WHEN OTHERS THEN
    v_is_adm := false;
  END;
  IF v_is_adm THEN
    RETURN jsonb_build_object('allowed', true, 'is_admin', true);
  END IF;

  -- Kiểm tra trạng thái PRO: Device Guard chỉ bảo vệ tài khoản PRO tránh chia sẻ lậu
  SELECT COALESCE(is_pro, false) INTO v_is_pro
  FROM public.profiles
  WHERE id = v_user_id;

  IF NOT v_is_pro THEN
    RETURN jsonb_build_object('allowed', true, 'is_pro', false);
  END IF;

  -- Khoá theo user: 2 thiết bị đăng ký đồng thời không cùng lọt qua bước đếm bên dưới
  PERFORM pg_advisory_xact_lock(hashtextextended('rusi_device_guard:' || v_user_id::text, 0));

  -- Tự động đánh dấu hết hạn các phiên không hoạt động quá 30 ngày
  UPDATE public.user_device_sessions
  SET is_active = false
  WHERE user_id = v_user_id AND is_active = true AND last_active_at < (now() - interval '30 days');

  -- Kiểm tra thiết bị hiện tại đã từng đăng ký chưa
  SELECT id, is_active INTO v_existing
  FROM public.user_device_sessions
  WHERE user_id = v_user_id AND device_fingerprint = p_fingerprint;

  IF v_existing.id IS NOT NULL THEN
    UPDATE public.user_device_sessions
    SET
      last_active_at = now(),
      is_active = true,
      device_name = COALESCE(NULLIF(p_device_name, ''), device_name),
      device_type = COALESCE(NULLIF(p_device_type, ''), device_type),
      browser = COALESCE(NULLIF(p_browser, ''), browser),
      os = COALESCE(NULLIF(p_os, ''), os)
    WHERE id = v_existing.id;

    RETURN jsonb_build_object(
      'allowed', true,
      'is_existing', true,
      'session_id', v_existing.id,
      'max_devices', v_max_devices
    );
  END IF;

  -- Đếm số lượng thiết bị đang hoạt động
  SELECT count(*) INTO v_active_count
  FROM public.user_device_sessions
  WHERE user_id = v_user_id AND is_active = true;

  -- Đã vượt quá số lượng cho phép (tối đa 2)
  IF v_active_count >= v_max_devices THEN
    SELECT jsonb_agg(jsonb_build_object(
      'id', id,
      'device_name', device_name,
      'device_type', device_type,
      'browser', browser,
      'os', os,
      'last_active_at', last_active_at,
      'created_at', created_at
    ) ORDER BY last_active_at DESC) INTO v_active_devices
    FROM public.user_device_sessions
    WHERE user_id = v_user_id AND is_active = true;

    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'device_limit_exceeded',
      'max_devices', v_max_devices,
      'active_count', v_active_count,
      'devices', COALESCE(v_active_devices, '[]'::jsonb),
      'message', 'Tài khoản của bạn đã đạt giới hạn 2 thiết bị đăng nhập đồng thời. Vui lòng đăng xuất bớt thiết bị cũ để tiếp tục.'
    );
  END IF;

  -- Thiết bị mới hợp lệ: thêm vào danh sách
  INSERT INTO public.user_device_sessions (
    user_id,
    device_fingerprint,
    device_name,
    device_type,
    browser,
    os,
    is_active,
    last_active_at
  ) VALUES (
    v_user_id,
    p_fingerprint,
    p_device_name,
    p_device_type,
    p_browser,
    p_os,
    true,
    now()
  ) RETURNING id INTO v_session_id;

  RETURN jsonb_build_object(
    'allowed', true,
    'is_new', true,
    'session_id', v_session_id,
    'max_devices', v_max_devices
  );
END;
$function$;

-- 3. Đăng xuất một thiết bị cụ thể ------------------------------------------------
create or replace function public.rusi_revoke_device(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
DECLARE
  v_user_id uuid := auth.uid();
  v_deleted boolean := false;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Chưa đăng nhập');
  END IF;

  DELETE FROM public.user_device_sessions
  WHERE id = p_session_id AND user_id = v_user_id;

  IF FOUND THEN
    v_deleted := true;
  END IF;

  RETURN jsonb_build_object('success', v_deleted);
END;
$function$;

-- 4. Đăng xuất toàn bộ thiết bị -------------------------------------------------
create or replace function public.rusi_revoke_all_devices()
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Chưa đăng nhập');
  END IF;

  DELETE FROM public.user_device_sessions
  WHERE user_id = v_user_id;

  RETURN jsonb_build_object('success', true);
END;
$function$;

-- 5. Giải phóng thiết bị hiện tại khi đăng xuất --------------------------------
create or replace function public.rusi_revoke_my_device(p_fingerprint text)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
DECLARE
  v_user_id uuid := auth.uid();
  v_deleted boolean := false;
BEGIN
  IF v_user_id IS NULL OR p_fingerprint IS NULL THEN
    RETURN jsonb_build_object('success', false);
  END IF;

  DELETE FROM public.user_device_sessions
  WHERE user_id = v_user_id AND device_fingerprint = p_fingerprint;

  IF FOUND THEN
    v_deleted := true;
  END IF;

  RETURN jsonb_build_object('success', v_deleted);
END;
$function$;

-- 6. Danh sách thiết bị của tôi -------------------------------------------------
create or replace function public.rusi_get_my_devices()
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
DECLARE
  v_user_id uuid := auth.uid();
  v_devices jsonb;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN '[]'::jsonb;
  END IF;

  SELECT jsonb_agg(jsonb_build_object(
    'id', id,
    'device_name', device_name,
    'device_type', device_type,
    'browser', browser,
    'os', os,
    'last_active_at', last_active_at,
    'created_at', created_at
  ) ORDER BY last_active_at DESC) INTO v_devices
  FROM public.user_device_sessions
  WHERE user_id = v_user_id AND is_active = true;

  RETURN COALESCE(v_devices, '[]'::jsonb);
END;
$function$;

-- 7. Quyền gọi: chỉ người dùng đã đăng nhập -----------------------------------
revoke execute on function public.rusi_register_device(text, text, text, text, text) from public, anon;
revoke execute on function public.rusi_revoke_device(uuid) from public, anon;
revoke execute on function public.rusi_revoke_all_devices() from public, anon;
revoke execute on function public.rusi_revoke_my_device(text) from public, anon;
revoke execute on function public.rusi_get_my_devices() from public, anon;

grant execute on function public.rusi_register_device(text, text, text, text, text) to authenticated;
grant execute on function public.rusi_revoke_device(uuid) to authenticated;
grant execute on function public.rusi_revoke_all_devices() to authenticated;
grant execute on function public.rusi_revoke_my_device(text) to authenticated;
grant execute on function public.rusi_get_my_devices() to authenticated;
