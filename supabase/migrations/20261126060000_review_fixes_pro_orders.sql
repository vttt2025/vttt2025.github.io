-- Sửa các lỗi từ code review toàn đợt (26/11/2026). Idempotent.
-- 1. RPC chấm/kiểm tra TRKI: coi là PRO cả khi câu hỏi tự gắn PRO hoặc gắn với đề PRO qua test_id
--    (khớp view trki_questions_public) — trước chỉ xét trki_tests theo p_test_code nên lộ đáp án câu PRO.
-- 2. rusi_user_is_pro: giáo viên (role teacher) được miễn ràng buộc thiết bị như ở client (auth.js verifyDeviceGuard
--    không đăng ký thiết bị cho teacher) — trước giáo viên có PRO mất PRO phía server.
-- 3. Cấp PRO từ đơn đã thanh toán: giữ trạng thái trọn đời (is_pro + pro_expires_at NULL) khi mua thêm gói có thời hạn.
-- 4. rusi_activate_order: người có đặc quyền (admin/service_role) được kích hoạt đơn 'expired' (tiền về muộn).

-- ---------- 1. PRO theo phạm vi đề/câu ----------
create or replace function private.rusi_trki_scope_is_pro(p_test_code text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.trki_tests t
                 where (t.code = p_test_code or t.id = p_test_code) and coalesce(t.is_pro_only, false))
      or exists (select 1 from public.trki_question_bank q
                 where q.test_code = p_test_code and q.is_published
                   and (coalesce(q.is_pro_only, false)
                        or exists (select 1 from public.trki_tests t
                                   where coalesce(t.is_pro_only, false) and (t.code = q.test_id or t.id = q.test_id))));
$$;
revoke all on function private.rusi_trki_scope_is_pro(text) from public, anon, authenticated;

do $$
declare
  v_def text;
  v_new text;
begin
  -- rusi_check_trki_question
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'rusi_check_trki_question';
  v_new := replace(v_def,
    $q$if exists (select 1 from public.trki_tests t where (t.code = p_test_code or t.id = p_test_code) and t.is_pro_only = true)$q$,
    $q$if private.rusi_trki_scope_is_pro(p_test_code)$q$);
  if v_new = v_def and position('rusi_trki_scope_is_pro' in v_def) = 0 then
    raise exception 'rusi_check_trki_question: không tìm thấy đoạn kiểm tra PRO để thay';
  end if;
  if v_new <> v_def then execute v_new; end if;

  -- rusi_grade_trki_submission: kiểm tra PRO theo phạm vi trước khi chấm (cả khi không tra được đề)
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'rusi_grade_trki_submission';
  v_new := replace(v_def,
    $q$  if found then
    if coalesce(v_meta.is_pro_only, false) and not private.rusi_user_is_pro(v_user_id) then$q$,
    $q$  if private.rusi_trki_scope_is_pro(p_test_code) and not private.rusi_user_is_pro(v_user_id) then
    return jsonb_build_object('success', false, 'pro_required', true, 'message', 'Đề thi dành cho tài khoản PRO.');
  end if;

  if found then
    if coalesce(v_meta.is_pro_only, false) and not private.rusi_user_is_pro(v_user_id) then$q$);
  if v_new = v_def and position('rusi_trki_scope_is_pro' in v_def) = 0 then
    raise exception 'rusi_grade_trki_submission: không tìm thấy đoạn kiểm tra PRO để thay';
  end if;
  if v_new <> v_def then execute v_new; end if;
end $$;

-- ---------- 2. Giáo viên miễn ràng buộc thiết bị ----------
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
        -- Giáo viên: client không áp Device Guard (auth.js) → server cũng miễn
        or exists (select 1 from public.profiles p where p.id = p_uid and p.role = 'teacher')
        or exists (
          select 1 from public.user_device_sessions d
          where d.user_id = p_uid and d.is_active = true and d.auth_session_id = private.rusi_current_session_id()
        )
      )
    );
$$;

-- ---------- 3. Giữ PRO trọn đời ----------
create or replace function public.activate_pro_from_paid_order()
returns trigger
language plpgsql
security definer
set search_path = 'public', 'pg_temp'
as $function$
declare
  v_pkg record;
begin
  if lower(new.status) = 'paid'
     and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) <> 'paid') then
    select * into v_pkg from public.packages where id = new.package_id;
    if found then
      update public.profiles
      set is_pro = true,
          pro_expires_at = case
            -- Đang PRO trọn đời (is_pro + không hạn) → giữ nguyên trọn đời
            when is_pro and pro_expires_at is null then null
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

-- ---------- 4. Kích hoạt đơn 'expired' khi tiền về muộn ----------
do $$
declare
  v_def text;
  v_new text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'rusi_activate_order';
  v_new := replace(v_def,
    $q$  if v_order.status <> 'pending' then$q$,
    $q$  -- 'expired': tiền về sau hạn đơn — người có đặc quyền vẫn kích hoạt được (đã kiểm tra quyền ở trên)
  if v_order.status not in ('pending', 'expired') then$q$);
  if v_new = v_def and position($q$not in ('pending', 'expired')$q$ in v_def) = 0 then
    raise exception 'rusi_activate_order: không tìm thấy đoạn kiểm tra trạng thái để thay';
  end if;
  if v_new <> v_def then execute v_new; end if;
end $$;
