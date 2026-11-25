-- =============================================================================
-- Tự động xuất bản nội dung: admin lưu → GitHub Action publish-content → data/modules/*.json
--
-- 1. public.content_versions: bộ đếm thay đổi cho từng bảng nội dung (anon đọc được — không nhạy cảm).
--    scripts/publish-content.js so sánh với data/modules/manifest.json để chỉ kéo bảng đã đổi.
-- 2. Trigger cấp câu lệnh trên mọi bảng nội dung: tăng bộ đếm + gửi repository_dispatch sang GitHub
--    (qua pg_net, token đọc từ Vault 'github_publish_token'; chống dồn: tối đa 1 lần / 20 giây).
--    GitHub Action chờ 90 giây trước khi đọc dữ liệu nên các lần lưu bị bỏ qua tín hiệu vẫn được xuất bản.
-- 3. Lỗi ở bước gửi tín hiệu KHÔNG BAO GIỜ làm hỏng thao tác ghi của admin.
--
-- Cài token (chạy tay trong SQL Editor, token không nằm trong repo):
--   select vault.create_secret('<github_fine_grained_token>', 'github_publish_token', 'Dispatch publish-content');
-- Idempotent: chạy lại an toàn.
-- =============================================================================

create extension if not exists pg_net with schema extensions;

create table if not exists public.content_versions (
  table_name text primary key,
  version    bigint not null default 0,
  changed_at timestamptz not null default now()
);
alter table public.content_versions enable row level security;
drop policy if exists "content_versions_read_all" on public.content_versions;
create policy "content_versions_read_all" on public.content_versions for select to anon, authenticated using (true);
revoke insert, update, delete on public.content_versions from anon, authenticated;

create table if not exists public.content_publish_state (
  id               int primary key default 1 check (id = 1),
  last_dispatch_at timestamptz
);
alter table public.content_publish_state enable row level security;   -- không có policy: chỉ hàm definer truy cập
revoke all on public.content_publish_state from anon, authenticated;
insert into public.content_publish_state (id) values (1) on conflict (id) do nothing;

create or replace function public.rusi_mark_content_changed()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_token text;
begin
  insert into public.content_versions (table_name, version, changed_at)
  values (TG_TABLE_NAME, 1, now())
  on conflict (table_name) do update
    set version = public.content_versions.version + 1, changed_at = now();

  begin
    update public.content_publish_state
       set last_dispatch_at = now()
     where id = 1 and (last_dispatch_at is null or last_dispatch_at < now() - interval '20 seconds');
    if found then
      select decrypted_secret into v_token
        from vault.decrypted_secrets where name = 'github_publish_token' limit 1;
      if v_token is not null then
        perform net.http_post(
          url     := 'https://api.github.com/repos/vttt2025/vttt2025.github.io/dispatches',
          body    := jsonb_build_object('event_type', 'content-changed',
                                        'client_payload', jsonb_build_object('table', TG_TABLE_NAME)),
          headers := jsonb_build_object(
                       'Authorization', 'Bearer ' || v_token,
                       'Accept', 'application/vnd.github+json',
                       'X-GitHub-Api-Version', '2022-11-28',
                       'User-Agent', 'rusitrki-content-publisher',
                       'Content-Type', 'application/json')
        );
      end if;
    end if;
  exception when others then
    raise warning '[publish-content] không gửi được tín hiệu xuất bản: %', sqlerrm;
  end;

  return null;
end;
$$;

revoke all on function public.rusi_mark_content_changed() from public, anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'topic_articles', 'vocab_jars', 'jar_items', 'vocabularies', 'vocab_lessons',
    'listening_lessons', 'listening_topics', 'listening_lesson_vocab', 'speaking_lessons',
    'writing_tasks', 'writing_task_vocab', 'writing_topics', 'trki_tests',
    'shop_products', 'packages', 'grammar_lessons', 'blog_posts'
  ] loop
    execute format('drop trigger if exists rusi_publish_content on public.%I', t);
    execute format('create trigger rusi_publish_content after insert or update or delete on public.%I
                    for each statement execute function public.rusi_mark_content_changed()', t);
    execute format('drop trigger if exists rusi_publish_content_truncate on public.%I', t);
    execute format('create trigger rusi_publish_content_truncate after truncate on public.%I
                    for each statement execute function public.rusi_mark_content_changed()', t);
    insert into public.content_versions (table_name, version) values (t, 1) on conflict (table_name) do nothing;
  end loop;
end $$;
