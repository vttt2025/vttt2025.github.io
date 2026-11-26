-- Device Guard: chặn chia sẻ tài khoản PRO bằng cách sao chép fingerprint; PRO hết hạn không bị giới hạn thiết bị.
--  1. Cùng fingerprint nhưng phiên đăng nhập (auth session) khác đang giữ thiết bị → đăng xuất phiên cũ trước khi
--     chuyển thiết bị sang phiên mới (trước đây chuyển im lặng → bao nhiêu máy cũng dùng chung được 1 tài khoản).
--  2. Chỉ tính là PRO khi pro_expires_at còn hạn (hoặc trọn đời).
-- Vá thân hàm hiện có bằng thay chuỗi (idempotent: chỉ thay khi chưa vá).
do $mig$
declare
  d text := pg_get_functiondef('public.rusi_register_device(text,text,text,text,text)'::regprocedure);
  o text := d;
begin
  if position('rusi_kill_device_sessions' in d) = 0 then
    d := replace(d,
      'select coalesce(is_pro, false) into v_is_pro from public.profiles where id = v_user_id;',
      'select coalesce(is_pro, false) and (pro_expires_at is null or pro_expires_at > now()) into v_is_pro from public.profiles where id = v_user_id;');
    d := replace(d,
      'select id, is_active into v_existing',
      'select id, is_active, auth_session_id into v_existing');
    d := replace(d,
      E'  if v_reuse then\n    update public.user_device_sessions',
      E'  if v_reuse then\n    -- Thiết bị đang gắn với phiên đăng nhập khác (vd. fingerprint bị sao chép sang máy khác) → đăng xuất phiên cũ\n    if v_session is not null and v_existing.auth_session_id is not null and v_existing.auth_session_id <> v_session then\n      perform private.rusi_kill_device_sessions(v_user_id, array[v_existing.id]);\n    end if;\n    update public.user_device_sessions');
    if d = o or position('rusi_kill_device_sessions' in d) = 0 or position('pro_expires_at' in d) = 0 then
      raise exception 'rusi_register_device: không vá được (thân hàm đã khác dự kiến)';
    end if;
    execute d;
  end if;
end
$mig$;
