-- Device Guard thực thi phía server (26/11/2026). Idempotent.
-- Trước: giới hạn 2 thiết bị chỉ là modal ở client (xoá modal là dùng tiếp), thiết bị đã thu hồi vẫn giữ JWT hợp lệ,
-- fingerprint do client tự khai nên chép sang máy khác là "cùng thiết bị".
-- Sau:
--   1. Mỗi thiết bị gắn với phiên đăng nhập thật (auth.jwt() ->> 'session_id'); đăng ký lại cùng fingerprint từ
--      phiên khác thì chuyển thiết bị sang phiên mới (phiên cũ mất quyền PRO phía server).
--   2. Thu hồi thiết bị xoá luôn phiên trong auth.sessions → refresh token hết hiệu lực, thiết bị bị đăng xuất.
--   3. private.rusi_user_is_pro(uid) — dùng cho mọi kiểm tra PRO phía server (RPC chấm TRKI, nội dung PRO) —
--      chỉ công nhận PRO khi phiên hiện tại thuộc một thiết bị đang hoạt động (admin và kết nối không JWT được miễn).
-- Client gọi rusi_register_device mỗi lần tải trang (auth.js verifyDeviceGuard) nên thiết bị cũ tự gắn phiên.

alter table public.user_device_sessions add column if not exists auth_session_id uuid;

create or replace function private.rusi_current_session_id()
returns uuid
language sql
stable
set search_path = ''
as $$
  select case when coalesce(auth.jwt() ->> 'session_id', '') ~ '^[0-9a-fA-F-]{36}$'
              then (auth.jwt() ->> 'session_id')::uuid end;
$$;
revoke all on function private.rusi_current_session_id() from public, anon;
grant execute on function private.rusi_current_session_id() to authenticated, service_role;

-- ---------- 1. Đăng ký thiết bị gắn phiên ----------
create or replace function public.rusi_register_device(p_fingerprint text, p_device_name text default 'Thiết bị không rõ'::text, p_device_type text default 'desktop'::text, p_browser text default 'Trình duyệt'::text, p_os text default 'Hệ điều hành'::text)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_session uuid := private.rusi_current_session_id();
  v_is_pro boolean := false;
  v_is_adm boolean := false;
  v_max_devices int := 2;
  v_active_count int := 0;
  v_session_id uuid;
  v_existing record;
  v_reuse boolean := false;
  v_active_devices jsonb;
begin
  if v_user_id is null then
    return jsonb_build_object('allowed', true, 'guest', true);
  end if;

  begin
    select public.is_admin(v_user_id) into v_is_adm;
  exception when others then
    v_is_adm := false;
  end;
  if v_is_adm then
    return jsonb_build_object('allowed', true, 'is_admin', true);
  end if;

  select coalesce(is_pro, false) into v_is_pro from public.profiles where id = v_user_id;
  if not v_is_pro then
    return jsonb_build_object('allowed', true, 'is_pro', false);
  end if;

  perform pg_advisory_xact_lock(hashtextextended('rusi_device_guard:' || v_user_id::text, 0));

  update public.user_device_sessions
  set is_active = false
  where user_id = v_user_id and is_active = true and last_active_at < (now() - interval '30 days');

  -- Phiên hiện tại đã gắn với một thiết bị khác của user (vd. đổi fingerprint) → gỡ gắn ở thiết bị cũ
  if v_session is not null then
    update public.user_device_sessions
    set auth_session_id = null
    where user_id = v_user_id and auth_session_id = v_session and device_fingerprint is distinct from p_fingerprint;
  end if;

  select id, is_active into v_existing
  from public.user_device_sessions
  where user_id = v_user_id and device_fingerprint = p_fingerprint;

  if found then
    v_reuse := true;
    -- Thiết bị hết hạn (is_active=false) chỉ được kích hoạt lại nếu còn chỗ
    if not v_existing.is_active then
      select count(*) into v_active_count from public.user_device_sessions where user_id = v_user_id and is_active = true;
      if v_active_count >= v_max_devices then
        v_reuse := false;
      end if;
    end if;
  end if;

  if v_reuse then
    update public.user_device_sessions
    set last_active_at = now(),
        is_active = true,
        auth_session_id = coalesce(v_session, auth_session_id),
        device_name = coalesce(nullif(p_device_name, ''), device_name),
        device_type = coalesce(nullif(p_device_type, ''), device_type),
        browser = coalesce(nullif(p_browser, ''), browser),
        os = coalesce(nullif(p_os, ''), os)
    where id = v_existing.id;

    return jsonb_build_object('allowed', true, 'is_existing', true, 'session_id', v_existing.id, 'max_devices', v_max_devices);
  end if;

  select count(*) into v_active_count
  from public.user_device_sessions
  where user_id = v_user_id and is_active = true;

  if v_active_count >= v_max_devices then
    select jsonb_agg(jsonb_build_object(
      'id', id, 'device_name', device_name, 'device_type', device_type, 'browser', browser, 'os', os,
      'last_active_at', last_active_at, 'created_at', created_at
    ) order by last_active_at desc) into v_active_devices
    from public.user_device_sessions
    where user_id = v_user_id and is_active = true;

    return jsonb_build_object(
      'allowed', false,
      'reason', 'device_limit_exceeded',
      'max_devices', v_max_devices,
      'active_count', v_active_count,
      'devices', coalesce(v_active_devices, '[]'::jsonb),
      'message', 'Tài khoản của bạn đã đạt giới hạn 2 thiết bị đăng nhập đồng thời. Vui lòng đăng xuất bớt thiết bị cũ để tiếp tục.'
    );
  end if;

  insert into public.user_device_sessions (
    user_id, device_fingerprint, device_name, device_type, browser, os, is_active, last_active_at, auth_session_id
  ) values (
    v_user_id, p_fingerprint, p_device_name, p_device_type, p_browser, p_os, true, now(), v_session
  )
  on conflict do nothing
  returning id into v_session_id;

  if v_session_id is null then
    -- Thiết bị (fingerprint) đã có nhưng đang bị thu hồi và hết chỗ ở trên → coi như vượt giới hạn
    return jsonb_build_object('allowed', false, 'reason', 'device_limit_exceeded', 'max_devices', v_max_devices,
      'active_count', v_active_count, 'devices', '[]'::jsonb,
      'message', 'Tài khoản của bạn đã đạt giới hạn 2 thiết bị đăng nhập đồng thời. Vui lòng đăng xuất bớt thiết bị cũ để tiếp tục.');
  end if;

  return jsonb_build_object('allowed', true, 'is_new', true, 'session_id', v_session_id, 'max_devices', v_max_devices);
end;
$function$;

-- ---------- 2. Thu hồi thiết bị → xoá phiên đăng nhập ----------
create or replace function private.rusi_kill_device_sessions(p_user uuid, p_device_ids uuid[])
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from auth.sessions s
  using public.user_device_sessions d
  where d.user_id = p_user and d.id = any(p_device_ids) and d.auth_session_id is not null
    and s.id = d.auth_session_id and s.user_id = p_user;
end;
$$;
revoke all on function private.rusi_kill_device_sessions(uuid, uuid[]) from public, anon, authenticated;

create or replace function public.rusi_revoke_device(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_deleted boolean := false;
begin
  if v_user_id is null then
    return jsonb_build_object('success', false, 'message', 'Chưa đăng nhập');
  end if;
  perform private.rusi_kill_device_sessions(v_user_id, array[p_session_id]);
  delete from public.user_device_sessions where id = p_session_id and user_id = v_user_id;
  if found then v_deleted := true; end if;
  return jsonb_build_object('success', v_deleted);
end;
$function$;

create or replace function public.rusi_revoke_my_device(p_fingerprint text)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_deleted boolean := false;
begin
  if v_user_id is null or p_fingerprint is null then
    return jsonb_build_object('success', false);
  end if;
  -- Thiết bị hiện tại tự đăng xuất: client tự huỷ phiên (signOut) nên không cần xoá auth.sessions ở đây
  delete from public.user_device_sessions where user_id = v_user_id and device_fingerprint = p_fingerprint;
  if found then v_deleted := true; end if;
  return jsonb_build_object('success', v_deleted);
end;
$function$;

create or replace function public.rusi_revoke_all_devices()
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_ids uuid[];
begin
  if v_user_id is null then
    return jsonb_build_object('success', false, 'message', 'Chưa đăng nhập');
  end if;
  -- Giữ phiên đang gọi (người dùng chủ động "đăng xuất các thiết bị khác" từ máy này)
  select array_agg(id) into v_ids from public.user_device_sessions
  where user_id = v_user_id and auth_session_id is distinct from private.rusi_current_session_id();
  if v_ids is not null then
    perform private.rusi_kill_device_sessions(v_user_id, v_ids);
  end if;
  delete from public.user_device_sessions where user_id = v_user_id;
  return jsonb_build_object('success', true);
end;
$function$;

-- ---------- 3. Kiểm tra PRO phía server gắn với thiết bị ----------
create or replace function private.rusi_user_is_pro(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.is_admin(p_uid), false)
    or (
      exists (
        select 1 from public.profiles p
        where p.id = p_uid and p.is_pro = true and (p.pro_expires_at is null or p.pro_expires_at > now())
      )
      and (
        -- Kiểm tra hộ người khác (admin/service) hoặc kết nối không JWT: không ràng buộc thiết bị
        p_uid is distinct from auth.uid()
        or private.rusi_current_session_id() is null
        or exists (
          select 1 from public.user_device_sessions d
          where d.user_id = p_uid and d.is_active = true and d.auth_session_id = private.rusi_current_session_id()
        )
      )
    );
$$;
