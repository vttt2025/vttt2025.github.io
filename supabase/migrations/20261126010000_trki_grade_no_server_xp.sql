-- rusi_grade_trki_submission: thôi cộng XP phía server (26/11/2026). Idempotent.
-- Client đã cộng XP theo quy tắc chuẩn RUSI_XP_RULES (TRKI_FULL_PASS / TRKI_SUBTEST_PASS, chỉ lần đầu đạt)
-- và đồng bộ xp_total lên user_progress → server cộng thêm 30 là cộng trùng.
-- Khối "if v_xp_earned > 0 then insert into user_progress ..." vẫn giữ nhưng không còn chạy.

do $$
declare
  v_def text;
  v_new text;
begin
  select pg_get_functiondef(p.oid) into v_def
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and p.proname = 'rusi_grade_trki_submission';
  if v_def is null then
    raise notice 'Bỏ qua: không có hàm public.rusi_grade_trki_submission';
    return;
  end if;
  v_new := replace(v_def,
    $q$      v_xp_earned := 30;$q$,
    $q$      v_xp_earned := 0; -- XP do client cộng theo RUSI_XP_RULES$q$);
  if v_new <> v_def then
    execute v_new;
  end if;
end $$;
