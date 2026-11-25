-- Vá 2 RPC quota chấm AI (kiểm chứng E2E 2026-11-25). Idempotent (thay chuỗi; chạy lại không đổi gì).
--
-- 1. Kiểm tra quyền `current_user IN ('postgres', 'supabase_admin')` luôn đúng trong hàm SECURITY DEFINER
--    (owner postgres) → RPC dùng p_user_id do client gửi → học viên tiêu/xem quota AI của người khác.
--    Sửa: chỉ service_role / kết nối nội bộ / admin được chỉ định p_user_id (private.rusi_is_privileged_caller).
-- 2. `CURRENT_DATE AT TIME ZONE 'Asia/Ho_Chi_Minh'` vẫn ra ngày UTC → quota làm mới lúc 07:00 giờ VN.
--    Sửa: (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date.
-- Cần private.rusi_is_privileged_caller() (migration 20261125200000_secure_order_activation.sql).

do $$
declare
  f text;
  v_def text;
  v_new text;
begin
  foreach f in array array['check_and_consume_ai_quota', 'get_user_ai_quota'] loop
    select pg_get_functiondef(p.oid) into v_def
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = f;
    if v_def is null then
      raise notice 'Bỏ qua: không có hàm public.%', f;
      continue;
    end if;

    v_new := replace(v_def,
      $q$IF v_jwt_role = 'service_role' OR current_user IN ('postgres', 'supabase_admin') THEN$q$,
      $q$IF v_jwt_role = 'service_role' OR private.rusi_is_privileged_caller() THEN$q$);
    v_new := replace(v_new,
      $q$v_today DATE := (CURRENT_DATE AT TIME ZONE 'Asia/Ho_Chi_Minh');$q$,
      $q$v_today DATE := (now() AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;$q$);

    if v_new <> v_def then
      execute v_new;
    end if;
  end loop;
end $$;
