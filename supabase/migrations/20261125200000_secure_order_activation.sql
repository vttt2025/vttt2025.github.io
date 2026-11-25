-- Vá luồng đơn hàng / kích hoạt PRO (kiểm chứng E2E 2026-11-25). Idempotent.
--
-- 1. rusi_activate_order: kiểm tra quyền dùng current_user — trong hàm SECURITY DEFINER (owner postgres)
--    current_user luôn là 'postgres' → mọi học viên đăng nhập tự kích hoạt được đơn bất kỳ.
--    Sửa: chỉ admin (is_admin) hoặc service_role / kết nối nội bộ (không JWT); đơn phải 'pending';
--    gói phải tồn tại (trước đây gói lạ → PRO vĩnh viễn).
-- 2. Trigger cấp PRO là BEFORE INSERT OR UPDATE → với INSERT ... ON CONFLICT DO UPDATE (CMS upsert)
--    chạy 2 lần (nhánh INSERT rồi nhánh UPDATE) → hạn PRO bị cộng gấp đôi.
--    Sửa: cấp PRO trong trigger AFTER (chỉ chạy cho thao tác thực sự xảy ra); BEFORE chỉ điền paid_at.
-- 3. Học viên tự đặt giá đơn (policy chỉ kiểm tra amount >= 0). Sửa: trigger ép amount/amount_minor/
--    currency/status/expires_at theo bảng packages cho người không phải admin.
-- 4. FK orders.package_id → packages(id).

-- Người gọi có đặc quyền: admin, service_role, hoặc kết nối nội bộ không mang JWT (SQL editor, cron).
create or replace function private.rusi_is_privileged_caller()
returns boolean
language sql
stable
set search_path = ''
as $$
  select public.is_admin(auth.uid())
    or coalesce(auth.jwt() ->> 'role', '') = 'service_role'
    or (auth.uid() is null and coalesce(auth.jwt() ->> 'role', '') not in ('anon', 'authenticated'));
$$;

-- ---------- 3. Ép giá đơn theo gói ----------
create or replace function private.rusi_guard_order_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_pkg record;
begin
  if private.rusi_is_privileged_caller() then
    return new;
  end if;

  select * into v_pkg from public.packages p
  where p.id = new.package_id and coalesce(p.status, 'active') = 'active';
  if not found then
    raise exception 'Gói không hợp lệ: %', coalesce(new.package_id, '(trống)');
  end if;

  new.amount := coalesce(v_pkg.price, v_pkg.price_vnd, v_pkg.price_minor);
  new.amount_minor := coalesce(v_pkg.price_minor, new.amount);
  new.currency := coalesce(v_pkg.currency, 'VND');
  new.status := 'pending';
  new.paid_at := null;
  new.casso_trans_id := null;
  new.expires_at := now() + interval '24 hours';
  return new;
end;
$$;

drop trigger if exists rusi_guard_order_insert on public.orders;
create trigger rusi_guard_order_insert
  before insert on public.orders
  for each row execute function private.rusi_guard_order_insert();

-- ---------- 2. Cấp PRO đúng một lần ----------
create or replace function private.rusi_order_set_paid_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if lower(coalesce(new.status, '')) = 'paid' and new.paid_at is null then
    new.paid_at := now();
  end if;
  return new;
end;
$$;

create or replace function public.activate_pro_from_paid_order()
returns trigger
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_pkg record;
begin
  -- Chạy AFTER: chỉ cấp khi đơn vừa chuyển sang 'paid' (INSERT thật hoặc UPDATE từ trạng thái khác)
  if lower(new.status) = 'paid'
     and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) <> 'paid') then
    select * into v_pkg from public.packages where id = new.package_id;
    if found then
      update public.profiles
      set is_pro = true,
          pro_expires_at = case
            when v_pkg.is_lifetime then null
            when v_pkg.duration_months is not null and v_pkg.duration_months > 0 then
              greatest(coalesce(pro_expires_at, now()), now()) + (v_pkg.duration_months || ' months')::interval
            when v_pkg.duration_days is not null and v_pkg.duration_days > 0 then
              greatest(coalesce(pro_expires_at, now()), now()) + make_interval(days => v_pkg.duration_days)
            else pro_expires_at
          end,
          updated_at = now()
      where id = new.user_id;
    end if;
  end if;
  return null;
end;
$function$;

drop trigger if exists trg_activate_pro_from_paid_order on public.orders;
drop trigger if exists trg_order_set_paid_at on public.orders;
create trigger trg_order_set_paid_at
  before insert or update on public.orders
  for each row execute function private.rusi_order_set_paid_at();
create trigger trg_activate_pro_from_paid_order
  after insert or update on public.orders
  for each row execute function public.activate_pro_from_paid_order();

-- ---------- 1. rusi_activate_order ----------
create or replace function public.rusi_activate_order(p_order_code text, p_casso_ref text default null::text)
returns jsonb
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_order record;
  v_expires timestamptz;
begin
  if not private.rusi_is_privileged_caller() then
    return jsonb_build_object('success', false, 'message', 'Không có quyền kích hoạt đơn hàng');
  end if;

  select * into v_order from public.orders
  where order_code = p_order_code or id::text = p_order_code
  for update;

  if not found then
    return jsonb_build_object('success', false, 'message', 'Không tìm thấy đơn hàng: ' || coalesce(p_order_code, ''));
  end if;

  if v_order.status = 'paid' then
    return jsonb_build_object('success', true, 'message', 'Đơn hàng đã được kích hoạt trước đó', 'order_id', v_order.id);
  end if;

  if v_order.status <> 'pending' then
    return jsonb_build_object('success', false, 'message', 'Đơn hàng không ở trạng thái chờ thanh toán (' || v_order.status || ')');
  end if;

  if not exists (select 1 from public.packages where id = v_order.package_id) then
    return jsonb_build_object('success', false, 'message', 'Đơn hàng gắn gói không tồn tại: ' || coalesce(v_order.package_id, '(trống)'));
  end if;

  -- Trigger trg_activate_pro_from_paid_order cấp/gia hạn PRO khi đơn chuyển sang 'paid'
  update public.orders
  set status = 'paid', casso_trans_id = coalesce(p_casso_ref, casso_trans_id), paid_at = coalesce(paid_at, now())
  where id = v_order.id;

  select pro_expires_at into v_expires from public.profiles where id = v_order.user_id;

  insert into private.audit_logs (actor_id, db_role, action, entity_table, entity_key, changed_columns)
  values (
    auth.uid(),
    current_user,
    'ACTIVATE_ORDER',
    'orders',
    jsonb_build_object('order_id', v_order.id, 'order_code', v_order.order_code, 'user_id', v_order.user_id),
    array['status', 'paid_at', 'casso_trans_id']
  );

  return jsonb_build_object('success', true, 'order_id', v_order.id, 'user_id', v_order.user_id, 'expires_at', v_expires);
end;
$function$;

revoke all on function public.rusi_activate_order(text, text) from public, anon;
grant execute on function public.rusi_activate_order(text, text) to authenticated, service_role;
revoke all on function private.rusi_is_privileged_caller() from public, anon;
grant execute on function private.rusi_is_privileged_caller() to authenticated, service_role;

-- ---------- 4. FK gói ----------
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'orders_package_id_fkey' and conrelid = 'public.orders'::regclass) then
    alter table public.orders
      add constraint orders_package_id_fkey foreign key (package_id) references public.packages(id) not valid;
    alter table public.orders validate constraint orders_package_id_fkey;
  end if;
end $$;
