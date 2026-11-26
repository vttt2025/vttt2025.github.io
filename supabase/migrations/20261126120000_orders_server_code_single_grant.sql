-- Thanh toán PRO — chuẩn bị vận hành thương mại (26/11/2026):
--  1. Mã đơn (nội dung chuyển khoản) do server sinh: chữ + số, không "_" (nhiều ngân hàng bỏ "_"), không chứa email
--     học viên. Đơn được tạo ngay khi hiện mã QR (client), không đợi học viên bấm "Đã chuyển khoản".
--  2. Chặn tạo đơn hàng loạt: tối đa 10 đơn chờ / học viên / giờ.
--  3. Mỗi đơn chỉ cộng PRO một lần (pro_granted_at): huỷ rồi chuyển lại "paid" không cộng thêm thời hạn.
--  4. Chuyển đơn sang "paid" mà chưa gắn học viên → báo lỗi (trước đây im lặng, không ai được PRO).
alter table public.orders add column if not exists pro_granted_at timestamptz;
update public.orders set pro_granted_at = coalesce(paid_at, updated_at) where status = 'paid' and pro_granted_at is null;

create or replace function private.rusi_guard_order_insert()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_pkg record;
begin
  if private.rusi_is_privileged_caller() then
    return new;
  end if;
  select * into v_pkg from public.packages p where p.id = new.package_id and coalesce(p.status, 'active') = 'active';
  if not found then
    raise exception 'Gói không hợp lệ: %', coalesce(new.package_id, '(trống)');
  end if;
  if (select count(*) from public.orders o
       where o.user_id = new.user_id and o.status = 'pending' and o.created_at > now() - interval '1 hour') >= 10 then
    raise exception 'Bạn đã tạo quá nhiều đơn trong 1 giờ. Vui lòng dùng đơn đã tạo hoặc thử lại sau.';
  end if;
  new.order_code := 'RUSI' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  new.amount := coalesce(v_pkg.price, v_pkg.price_vnd, v_pkg.price_minor);
  new.amount_minor := coalesce(v_pkg.price_minor, new.amount);
  new.currency := coalesce(v_pkg.currency, 'VND');
  new.status := 'pending';
  new.paid_at := null;
  new.casso_trans_id := null;
  new.pro_granted_at := null;
  new.expires_at := now() + interval '24 hours';
  return new;
end;
$function$;

create or replace function public.activate_pro_from_paid_order()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  v_pkg record;
begin
  if lower(new.status) = 'paid' and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) <> 'paid')
     and new.pro_granted_at is null then
    select * into v_pkg from public.packages where id = new.package_id;
    if found then
      if new.user_id is null then
        raise exception 'Đơn % chưa gắn tài khoản học viên — không thể kích hoạt PRO', coalesce(new.order_code, new.id::text);
      end if;
      update public.profiles
         set is_pro = true,
             pro_expires_at = case
               when is_pro and pro_expires_at is null then null
               when v_pkg.is_lifetime then null
               when v_pkg.duration_months is not null and v_pkg.duration_months > 0
                 then greatest(coalesce(pro_expires_at, now()), now()) + (v_pkg.duration_months || ' months')::interval
               when v_pkg.duration_days is not null and v_pkg.duration_days > 0
                 then greatest(coalesce(pro_expires_at, now()), now()) + make_interval(days => v_pkg.duration_days)
               else pro_expires_at end,
             updated_at = now()
       where id = new.user_id;
      -- Đánh dấu đã cộng PRO (lần cập nhật này không cộng lại: trạng thái cũ đã là 'paid')
      update public.orders set pro_granted_at = now() where id = new.id;
    end if;
  end if;
  return null;
end;
$function$;
