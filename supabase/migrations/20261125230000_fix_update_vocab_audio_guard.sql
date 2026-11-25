-- Vá update_vocab_audio (kiểm chứng 2026-11-25). Idempotent.
-- Kiểm tra quyền `current_user IN ('postgres', 'supabase_admin')` luôn đúng trong hàm SECURITY DEFINER (owner postgres)
-- và hàm được GRANT cho authenticated → mọi học viên sửa được audio_url của bảng nội dung vocabularies
-- (kích hoạt xuất bản tự động). Sửa: dùng private.rusi_is_privileged_caller() (admin / service_role / kết nối nội bộ).
-- Giữ GRANT cho authenticated vì scripts/auto_fill_vocab_audio.js gọi bằng JWT admin.
-- Cần private.rusi_is_privileged_caller() (migration 20261125200000_secure_order_activation.sql).

do $$
declare
  v_def text;
  v_new text;
begin
  select pg_get_functiondef(p.oid) into v_def
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'update_vocab_audio';
  if v_def is null then
    raise notice 'Bỏ qua: không có hàm public.update_vocab_audio';
    return;
  end if;
  v_new := replace(v_def,
    $q$current_user IN ('postgres', 'supabase_admin')$q$,
    $q$private.rusi_is_privileged_caller()$q$);
  if v_new <> v_def then
    execute v_new;
  end if;
end $$;
