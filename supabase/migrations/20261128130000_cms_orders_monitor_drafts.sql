-- =============================================================================
-- CMS: đơn hàng, màn hình theo dõi, nháp nhiều ngày (28/11/2026)
--
-- 1. Đơn hàng: đã thanh toán là chốt (không hoàn tiền) — không đổi trạng thái đơn 'paid', không dùng
--    'refunded' / 'partially_refunded'. Chỉ Super Admin (hoặc hệ thống: service_role / webhook Casso) được
--    đánh dấu 'paid' — academic_admin không kích hoạt PRO được (kể cả qua rusi_activate_order).
-- 2. rusi_admin_user_emails(ids): admin đọc email + lần đăng nhập cuối từ auth.users (profiles không có email).
-- 3. Admin được ĐỌC practice_logs, trki_submissions, user_ai_usage, user_progress (màn hình theo dõi).
--    writing_submissions đã có policy rusi_read cho academic_admin/super_admin; user_device_sessions đã có.
-- 4. rusi_admin_audit_logs(limit, offset): admin đọc nhật ký private.audit_logs.
-- 5. public.cms_drafts: bản nháp đang soạn của CMS (tự lưu), chỉ admin đọc/ghi. Không nằm trong luồng xuất bản
--    → sửa nhiều ngày không ảnh hưởng web cho tới khi bấm Lưu.
-- 6. publication_status ('draft' | 'published' | 'archived', mặc định 'published' để không ẩn nội dung đang có)
--    cho topic_articles, listening_lessons, speaking_lessons, vocab_jars (grammar_lessons, writing_tasks,
--    blog_posts đã có). rusi_pro_catalog bỏ mục chưa 'published'. scripts/publish-content.js lọc tương ứng.
-- Idempotent: chạy lại an toàn.
-- =============================================================================

-- ---------- 1. Đơn hàng ----------
create or replace function private.rusi_orders_status_guard()
returns trigger
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_jwt_role text := coalesce(auth.jwt() ->> 'role', '');
  v_is_system boolean := (
    current_user in ('postgres', 'supabase_admin')
    or v_jwt_role = 'service_role'
    or (auth.uid() is null and v_jwt_role not in ('anon', 'authenticated'))
  );
begin
  if new.status in ('refunded', 'partially_refunded') and (tg_op = 'INSERT' or new.status is distinct from old.status) then
    raise exception 'Đơn đã thanh toán không hoàn tiền — không dùng trạng thái %', new.status;
  end if;
  if tg_op = 'UPDATE' and old.status = 'paid' and new.status is distinct from 'paid' then
    raise exception 'Đơn % đã thanh toán — không đổi trạng thái được', coalesce(old.order_code, old.id::text);
  end if;
  if new.status = 'paid' and (tg_op = 'INSERT' or old.status is distinct from 'paid')
     and not v_is_system and not private.rusi_is_super_admin(auth.uid()) then
    raise exception 'Chỉ Super Admin được đánh dấu đơn đã thanh toán';
  end if;
  return new;
end;
$$;
revoke all on function private.rusi_orders_status_guard() from public, anon, authenticated;

drop trigger if exists rusi_01_orders_status_guard on public.orders;
create trigger rusi_01_orders_status_guard before insert or update on public.orders
  for each row execute function private.rusi_orders_status_guard();

-- ---------- 2. Email học viên ----------
create or replace function public.rusi_admin_user_emails(p_ids uuid[])
returns table (id uuid, email text, last_sign_in_at timestamptz, created_at timestamptz)
language plpgsql
stable
security definer
set search_path to ''
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Chỉ quản trị viên được xem email tài khoản' using errcode = '42501';
  end if;
  return query
    select u.id, u.email::text, u.last_sign_in_at, u.created_at
      from auth.users u
     where u.id = any(coalesce(p_ids, '{}'::uuid[]))
     limit 1000;
end;
$$;
revoke all on function public.rusi_admin_user_emails(uuid[]) from public, anon;
grant execute on function public.rusi_admin_user_emails(uuid[]) to authenticated;

-- ---------- 3. Quyền đọc cho màn hình theo dõi ----------
do $$
declare
  t text;
begin
  foreach t in array array['practice_logs', 'trki_submissions', 'user_ai_usage', 'user_progress'] loop
    execute format('drop policy if exists "Admins read %s" on public.%I', t, t);
    execute format('create policy "Admins read %s" on public.%I for select to authenticated using (public.is_admin((select auth.uid())))', t, t);
  end loop;
end $$;

-- ---------- 4. Nhật ký hoạt động ----------
create or replace function public.rusi_admin_audit_logs(p_limit int default 50, p_offset int default 0)
returns table (id bigint, actor_id uuid, db_role text, action text, entity_table text, entity_key jsonb,
               changed_columns text[], occurred_at timestamptz)
language plpgsql
stable
security definer
set search_path to ''
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Chỉ quản trị viên được xem nhật ký' using errcode = '42501';
  end if;
  return query
    select a.id, a.actor_id, a.db_role, a.action, a.entity_table, a.entity_key, a.changed_columns::text[], a.occurred_at
      from private.audit_logs a
     order by a.occurred_at desc, a.id desc
     limit least(greatest(coalesce(p_limit, 50), 1), 200)
    offset greatest(coalesce(p_offset, 0), 0);
end;
$$;
revoke all on function public.rusi_admin_audit_logs(int, int) from public, anon;
grant execute on function public.rusi_admin_audit_logs(int, int) to authenticated;

-- ---------- 5. Bản nháp CMS ----------
create table if not exists public.cms_drafts (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  doc_key text not null,
  is_new boolean not null default false,
  data jsonb not null,
  base_updated_at timestamptz,
  title text,
  updated_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection, doc_key)
);
alter table public.cms_drafts enable row level security;
drop policy if exists "Admins manage cms_drafts" on public.cms_drafts;
create policy "Admins manage cms_drafts" on public.cms_drafts for all to authenticated
  using (public.is_admin((select auth.uid()))) with check (public.is_admin((select auth.uid())));
revoke all on public.cms_drafts from anon;
grant select, insert, update, delete on public.cms_drafts to authenticated;

-- ---------- 6. Trạng thái xuất bản ----------
do $$
declare
  t text;
begin
  foreach t in array array['topic_articles', 'listening_lessons', 'speaking_lessons', 'vocab_jars'] loop
    if not exists (select 1 from information_schema.columns
                    where table_schema = 'public' and table_name = t and column_name = 'publication_status') then
      execute format('alter table public.%I add column publication_status text not null default ''published''', t);
      execute format('alter table public.%I add constraint %I check (publication_status in (''draft'', ''published'', ''archived''))',
                     t, t || '_publication_status_check');
    end if;
  end loop;
end $$;

-- rusi_pro_catalog: bỏ mục chưa xuất bản (grammar_lessons, writing_tasks đã lọc sẵn)
do $$
declare
  d text := pg_get_functiondef('public.rusi_pro_catalog()'::regprocedure);
  pairs text[][] := array[
    array['where j.is_system = true and j.is_pro = true',
          'where j.is_system = true and j.is_pro = true and j.publication_status = ''published'''],
    array['where exists (select 1 from public.vocab_jars j',
          'where a.publication_status = ''published'' and exists (select 1 from public.vocab_jars j'],
    array['where coalesce(l.is_pro_only, false) or coalesce(t.is_pro_only, false)',
          'where l.publication_status = ''published'' and (coalesce(l.is_pro_only, false) or coalesce(t.is_pro_only, false))'],
    array['where s.is_pro_only = true',
          'where s.is_pro_only = true and s.publication_status = ''published''']
  ];
  i int;
begin
  for i in 1 .. array_length(pairs, 1) loop
    if position(pairs[i][2] in d) > 0 then
      continue; -- đã vá
    end if;
    if position(pairs[i][1] in d) = 0 then
      raise exception 'rusi_pro_catalog: không tìm thấy đoạn cần vá: %', pairs[i][1];
    end if;
    d := replace(d, pairs[i][1], pairs[i][2]);
  end loop;
  execute d;
end $$;
