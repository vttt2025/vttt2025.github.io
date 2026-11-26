-- =============================================================================
-- CMS → Supabase: chặn ghi đè bản cũ + một nguồn dữ liệu cho đề TRKI (26/11/2026)
--
-- 1. Chặn ghi đè bản cũ (bảng nội dung CMS): CMS gửi kèm updated_at của bản đã tải về. Nếu dòng trên Cloud
--    đã được sửa sau mốc đó (old.updated_at > new.updated_at) → lỗi RS409, không ghi. Sau khi qua kiểm tra,
--    updated_at luôn = now() (mốc mới cho lần sửa sau). Ghi không kèm updated_at (cột vắng) vẫn được phép.
--    Ghi lồng trong trigger (pg_trigger_depth() > 1) không bị kiểm tra.
-- 2. Đề TRKI có câu trong trki_question_bank: ngân hàng là nguồn duy nhất cho câu hỏi.
--    - parts[].sub_test cho biết phần nào chứa câu của sub_test nào; parts[].questions[].code nối với ngân hàng.
--    - Sửa/thêm/ẩn/xoá câu trong ngân hàng → tự dựng lại parts của đề (cùng thứ tự với RPC chấm), tự đánh số lại
--      order_index nếu thứ tự chấm lệch thứ tự hiển thị; không khớp số câu → lỗi, không ghi.
--    - Lưu đề (trki_tests) từ CMS: câu hỏi trong parts luôn lấy lại từ ngân hàng (sửa câu ở trình soạn đề bị bỏ qua);
--      tên phần, thời gian... vẫn lưu như cũ.
--    - Đề chỉ có câu trong parts (không có dòng nào trong ngân hàng) giữ nguyên cách cũ.
-- Idempotent: chạy lại an toàn.
-- =============================================================================

-- ---------- 1. Chặn ghi đè bản cũ ----------
create or replace function private.rusi_reject_stale_write()
returns trigger
language plpgsql
set search_path to ''
as $$
begin
  if pg_trigger_depth() > 1 then
    return new;
  end if;
  if new.updated_at is not null and old.updated_at is not null and new.updated_at < old.updated_at then
    raise exception using
      errcode = 'RS409',
      message = 'Bản trên Cloud đã được sửa lúc '
                || to_char(old.updated_at at time zone 'Asia/Ho_Chi_Minh', 'HH24:MI DD/MM/YYYY')
                || ', sau lần bạn tải về. Hãy tải bản mới nhất rồi sửa lại để không ghi đè thay đổi mới hơn.';
  end if;
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function private.rusi_reject_stale_write() from public, anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'trki_tests', 'trki_question_bank', 'vocabularies', 'vocab_jars', 'topic_articles', 'grammar_lessons',
    'listening_topics', 'listening_lessons', 'speaking_lessons', 'writing_tasks', 'writing_topics',
    'shop_products', 'packages', 'blog_posts'
  ] loop
    if exists (select 1 from information_schema.columns
                where table_schema = 'public' and table_name = t and column_name = 'updated_at') then
      -- Tên bắt đầu "rusi_00" để chạy trước rusi_touch (đặt updated_at = now()) — trigger BEFORE chạy theo thứ tự tên
      execute format('drop trigger if exists rusi_00_stale_guard on public.%I', t);
      execute format('create trigger rusi_00_stale_guard before update on public.%I
                      for each row execute function private.rusi_reject_stale_write()', t);
    end if;
  end loop;
end $$;

-- ---------- 2. Ngân hàng câu hỏi → parts ----------

-- Dựng parts từ ngân hàng. p_parts: khung phần (tên, thời gian...); p_base: bản cũ để giữ các khoá phụ của câu
-- (order, topic, official_key...) và ánh xạ phần → sub_test khi p_parts thiếu.
create or replace function private.rusi_trki_build_parts(p_code text, p_parts jsonb, p_base jsonb)
returns jsonb
language sql
stable
set search_path to ''
as $$
  with base_parts as (
    select b.v from jsonb_array_elements(case when jsonb_typeof(p_base) = 'array' then p_base else '[]'::jsonb end) b(v)
  ), base_q as (
    select distinct on (j.v ->> 'code') j.v ->> 'code' as code, j.v
      from base_parts b,
           jsonb_array_elements(case when jsonb_typeof(b.v -> 'questions') = 'array' then b.v -> 'questions' else '[]'::jsonb end) j(v)
     where j.v ? 'code'
  ), parts as (
    select p.ord, p.v,
           coalesce(
             p.v ->> 'sub_test',
             (select b.v ->> 'sub_test' from base_parts b where b.v ->> 'id' = p.v ->> 'id' and b.v ? 'sub_test' limit 1),
             -- Phần mới chưa có câu: đoán theo id phần
             case when (case when jsonb_typeof(p.v -> 'questions') = 'array' then jsonb_array_length(p.v -> 'questions') else 0 end) = 0 then
               case p.v ->> 'id'
                 when 'gram' then 'lexis_grammar' when 'russ_lex' then 'lexis_grammar'
                 when 'read' then 'reading' when 'reading' then 'reading' when 'russ_read' then 'reading'
                 when 'list' then 'listening' when 'listening' then 'listening' when 'russ_list' then 'listening'
                 when 'hist' then 'history' when 'laws' then 'law'
               end
             end) as st
      from jsonb_array_elements(case when jsonb_typeof(p_parts) = 'array' then p_parts else '[]'::jsonb end) with ordinality p(v, ord)
  )
  select coalesce(jsonb_agg(
           case when p.st is null then p.v
                else jsonb_set(p.v || jsonb_build_object('sub_test', p.st), '{questions}', coalesce((
                  select jsonb_agg(
                           (coalesce(b.v, '{}'::jsonb)
                              - array['code', 'q', 'options', 'a', 'ex', 'passage', 'correct_answer', 'multi', 'ans', 'official_key'])
                           || jsonb_strip_nulls(jsonb_build_object(
                                'code', q.code,
                                'q', q.prompt,
                                'options', q.options,
                                'a', q.correct_index,
                                'ex', nullif(q.explanation, ''),
                                'passage', nullif(q.passage, ''),
                                'correct_answer', case when b.v is null or b.v ? 'correct_answer' then nullif(q.correct_answer, '') end,
                                'multi', case when q.question_type = 'multi_select' then true end,
                                'ans', case when b.v ? 'ans' then coalesce(nullif(q.correct_answer, ''), q.options ->> q.correct_index) end,
                                -- Khoá chữ cái theo sách: chỉ giữ khi đáp án không đổi
                                'official_key', case when b.v -> 'a' = to_jsonb(q.correct_index) then b.v -> 'official_key' end))
                           order by q.order_index, q.id)
                    from public.trki_question_bank q
                    left join base_q b on b.code = q.code
                   where q.test_code = p_code and q.is_published and q.sub_test = p.st), '[]'::jsonb))
           end order by p.ord), '[]'::jsonb)
    from parts p
$$;
revoke all on function private.rusi_trki_build_parts(text, jsonb, jsonb) from public, anon, authenticated;

-- Thứ tự hiển thị (parts) so với thứ tự chấm (RPC rusi_grade_trki_submission)
create or replace function private.rusi_trki_alignment(p_code text, p_parts jsonb)
returns table (n_flat int, n_bank int, n_bad int)
language sql
stable
set search_path to ''
as $$
  with flat as (
    select j.v ->> 'code' as code, row_number() over (order by p.ord, j.ord) as rn
      from jsonb_array_elements(case when jsonb_typeof(p_parts) = 'array' then p_parts else '[]'::jsonb end) with ordinality p(v, ord),
           jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) with ordinality j(v, ord)
  ), graded as (
    select q.code, row_number() over (order by
             case q.sub_test when 'lexis_grammar' then 1 when 'grammar' then 1 when 'reading' then 2
                             when 'listening' then 3 when 'writing' then 4 when 'speaking' then 5 else 9 end,
             q.order_index, q.id) as gn
      from public.trki_question_bank q
     where q.test_code = p_code and q.is_published
  )
  select (select count(*) from flat)::int,
         (select count(*) from graded)::int,
         (select count(*) from flat f left join graded g on g.code = f.code where g.gn is distinct from f.rn)::int
$$;
revoke all on function private.rusi_trki_alignment(text, jsonb) from public, anon, authenticated;

-- Dựng lại parts cho các đề có câu trong ngân hàng
create or replace function private.rusi_trki_sync_tests(p_codes text[])
returns void
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_code text;
  v_parts jsonb;
  a record;
begin
  for v_code in select distinct c from unnest(p_codes) c where c is not null and c <> '' loop
    continue when not exists (select 1 from public.trki_question_bank q where q.test_code = v_code);

    update public.trki_tests t
       set parts = x.p, sections = x.p,
           part1 = coalesce(x.p -> 0, '{}'::jsonb), part2 = coalesce(x.p -> 1, '{}'::jsonb),
           part3 = coalesce(x.p -> 2, '{}'::jsonb), part4 = coalesce(x.p -> 3, '{}'::jsonb),
           part5 = coalesce(x.p -> 4, '{}'::jsonb), updated_at = now()
      from (select t2.id, private.rusi_trki_build_parts(t2.code, t2.parts, t2.parts) as p
              from public.trki_tests t2
             where t2.code = v_code and jsonb_typeof(t2.parts) = 'array') x
     where t.id = x.id and t.parts is distinct from x.p;

    select t.parts into v_parts from public.trki_tests t where t.code = v_code limit 1;
    continue when v_parts is null;

    select * into a from private.rusi_trki_alignment(v_code, v_parts);
    if a.n_flat <> a.n_bank then
      raise exception using
        errcode = 'RS422',
        message = format('Đề %s: ngân hàng có %s câu đang xuất bản nhưng chỉ %s câu nằm được trong các phần của đề. '
                         'Kiểm tra sub_test của câu có phần tương ứng trong đề.', v_code, a.n_bank, a.n_flat);
    end if;
    if a.n_bad > 0 then
      -- Thứ tự chấm lệch thứ tự hiển thị (vd. 2 phần cùng hạng như history/law) → đánh số lại theo thứ tự hiển thị
      with flat as (
        select j.v ->> 'code' as code, row_number() over (order by p.ord, j.ord) as rn
          from jsonb_array_elements(v_parts) with ordinality p(v, ord),
               jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) with ordinality j(v, ord)
      )
      update public.trki_question_bank q
         set order_index = f.rn, updated_at = now()
        from flat f
       where q.code = f.code and q.test_code = v_code and q.is_published and q.order_index is distinct from f.rn;

      select * into a from private.rusi_trki_alignment(v_code, v_parts);
      if a.n_bad > 0 then
        raise exception using
          errcode = 'RS422',
          message = format('Đề %s: %s câu có thứ tự chấm khác thứ tự hiển thị. Kiểm tra thứ tự các phần của đề.', v_code, a.n_bad);
      end if;
    end if;
  end loop;
end;
$$;
revoke all on function private.rusi_trki_sync_tests(text[]) from public, anon, authenticated;

create or replace function private.rusi_trki_bank_changed()
returns trigger
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_codes text[];
begin
  if pg_trigger_depth() > 1 then
    return null;
  end if;
  if tg_op = 'INSERT' then
    select array_agg(distinct n.test_code) into v_codes from new_rows n;
  elsif tg_op = 'DELETE' then
    select array_agg(distinct o.test_code) into v_codes from old_rows o;
  else
    select array_agg(distinct c) into v_codes
      from (select n.test_code as c from new_rows n union select o.test_code from old_rows o) x;
  end if;
  perform private.rusi_trki_sync_tests(v_codes);
  return null;
end;
$$;
revoke all on function private.rusi_trki_bank_changed() from public, anon, authenticated;

create or replace function private.rusi_trki_tests_from_bank()
returns trigger
language plpgsql
security definer
set search_path to ''
as $$
declare
  a record;
begin
  if pg_trigger_depth() > 1 or new.code is null or jsonb_typeof(new.parts) is distinct from 'array'
     or not exists (select 1 from public.trki_question_bank q where q.test_code = new.code) then
    return new;
  end if;
  -- Câu hỏi luôn lấy từ ngân hàng; khoá phụ của câu lấy từ bản đang lưu trên Cloud (không từ bản CMS gửi lên)
  new.parts := private.rusi_trki_build_parts(
    new.code, new.parts,
    case when tg_op = 'UPDATE' and jsonb_typeof(old.parts) = 'array' then old.parts else new.parts end);
  select * into a from private.rusi_trki_alignment(new.code, new.parts);
  if a.n_flat <> a.n_bank or a.n_bad > 0 then
    raise exception using
      errcode = 'RS422',
      message = format('Đề %s: các phần của đề không khớp ngân hàng câu hỏi (%s/%s câu, %s câu lệch thứ tự). '
                       'Không xoá/đổi thứ tự phần còn câu trong ngân hàng.', new.code, a.n_flat, a.n_bank, a.n_bad);
  end if;
  new.sections := new.parts;
  new.part1 := coalesce(new.parts -> 0, '{}'::jsonb);
  new.part2 := coalesce(new.parts -> 1, '{}'::jsonb);
  new.part3 := coalesce(new.parts -> 2, '{}'::jsonb);
  new.part4 := coalesce(new.parts -> 3, '{}'::jsonb);
  new.part5 := coalesce(new.parts -> 4, '{}'::jsonb);
  return new;
end;
$$;
revoke all on function private.rusi_trki_tests_from_bank() from public, anon, authenticated;

-- ---------- 3. Gắn code câu + sub_test phần vào parts hiện có (theo vị trí đang khớp) ----------
do $$
declare
  v_bad int;
  v_diff int;
begin
  -- Chỉ chạy khi mọi đề có ngân hàng đang khớp vị trí (đã kiểm 26/11: 0 lệch)
  select count(*) into v_bad
    from public.trki_tests t, private.rusi_trki_alignment(t.code, t.parts) a
   where exists (select 1 from public.trki_question_bank q where q.test_code = t.code)
     and exists (select 1 from jsonb_array_elements(case when jsonb_typeof(t.parts) = 'array' then t.parts else '[]'::jsonb end) p(v),
                        jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) j(v)
                  where not (j.v ? 'code'))
     and a.n_flat <> a.n_bank;
  if v_bad > 0 then
    raise exception 'Dừng: % đề có số câu parts khác ngân hàng', v_bad;
  end if;

  with ordered as (
    select q.code, q.test_code, q.sub_test,
           row_number() over (partition by q.test_code order by
             case q.sub_test when 'lexis_grammar' then 1 when 'grammar' then 1 when 'reading' then 2
                             when 'listening' then 3 when 'writing' then 4 when 'speaking' then 5 else 9 end,
             q.order_index, q.id) as pos
      from public.trki_question_bank q
     where q.is_published
  ), flat as (
    select t.id as test_id, t.code as test_code, p.ord as pord, j.ord as jord, j.v,
           row_number() over (partition by t.id order by p.ord, j.ord) as pos
      from public.trki_tests t,
           jsonb_array_elements(t.parts) with ordinality p(v, ord),
           jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) with ordinality j(v, ord)
     where jsonb_typeof(t.parts) = 'array'
  ), tagged as (
    select f.test_id, f.pord, f.jord, f.v || jsonb_build_object('code', o.code) as v, o.sub_test
      from flat f join ordered o on o.test_code = f.test_code and o.pos = f.pos
  ), rebuilt as (
    select t.id,
           jsonb_agg(
             case when exists (select 1 from tagged x where x.test_id = t.id and x.pord = p.ord)
                  then jsonb_set(p.v || jsonb_build_object('sub_test',
                                   (select min(x.sub_test) from tagged x where x.test_id = t.id and x.pord = p.ord)),
                                 '{questions}',
                                 (select jsonb_agg(x.v order by x.jord) from tagged x where x.test_id = t.id and x.pord = p.ord))
                  else p.v end
             order by p.ord) as np
      from public.trki_tests t, jsonb_array_elements(t.parts) with ordinality p(v, ord)
     where t.id in (select test_id from tagged)
     group by t.id
  )
  update public.trki_tests t
     set parts = r.np, sections = r.np,
         part1 = coalesce(r.np -> 0, '{}'::jsonb), part2 = coalesce(r.np -> 1, '{}'::jsonb),
         part3 = coalesce(r.np -> 2, '{}'::jsonb), part4 = coalesce(r.np -> 3, '{}'::jsonb),
         part5 = coalesce(r.np -> 4, '{}'::jsonb), updated_at = now()
    from rebuilt r
   where r.id = t.id and t.parts is distinct from r.np;

  -- Kiểm tra: dựng lại từ ngân hàng cho ra đúng câu đang hiển thị (đề, phương án, đáp án) và đúng thứ tự chấm
  select count(*) into v_diff
    from public.trki_tests t,
         lateral (select private.rusi_trki_build_parts(t.code, t.parts, t.parts) as np) b,
         lateral (
           select count(*) as n
             from (select row_number() over (order by p.ord, j.ord) rn, j.v
                     from jsonb_array_elements(t.parts) with ordinality p(v, ord),
                          jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) with ordinality j(v, ord)) o
             full join
                  (select row_number() over (order by p.ord, j.ord) rn, j.v
                     from jsonb_array_elements(b.np) with ordinality p(v, ord),
                          jsonb_array_elements(case when jsonb_typeof(p.v -> 'questions') = 'array' then p.v -> 'questions' else '[]'::jsonb end) with ordinality j(v, ord)) n
               on n.rn = o.rn
            where o.v is null or n.v is null
               or o.v -> 'q' is distinct from n.v -> 'q'
               or o.v -> 'options' is distinct from n.v -> 'options'
               or o.v -> 'a' is distinct from n.v -> 'a'
               or coalesce(o.v -> 'multi', 'false') is distinct from coalesce(n.v -> 'multi', 'false')
               or o.v ->> 'code' is distinct from n.v ->> 'code') d
   where exists (select 1 from public.trki_question_bank q where q.test_code = t.code)
     and d.n > 0;
  if v_diff > 0 then
    raise exception 'Dừng: % đề dựng lại từ ngân hàng khác nội dung đang hiển thị', v_diff;
  end if;

  select count(*) into v_bad
    from public.trki_tests t, private.rusi_trki_alignment(t.code, t.parts) a
   where exists (select 1 from public.trki_question_bank q where q.test_code = t.code)
     and (a.n_flat <> a.n_bank or a.n_bad > 0);
  if v_bad > 0 then
    raise exception 'Dừng: % đề lệch thứ tự chấm sau khi gắn code', v_bad;
  end if;
end $$;

-- ---------- 4. Trigger ----------
drop trigger if exists rusi_trki_bank_sync_ins on public.trki_question_bank;
create trigger rusi_trki_bank_sync_ins after insert on public.trki_question_bank
  referencing new table as new_rows
  for each statement execute function private.rusi_trki_bank_changed();

drop trigger if exists rusi_trki_bank_sync_upd on public.trki_question_bank;
create trigger rusi_trki_bank_sync_upd after update on public.trki_question_bank
  referencing old table as old_rows new table as new_rows
  for each statement execute function private.rusi_trki_bank_changed();

drop trigger if exists rusi_trki_bank_sync_del on public.trki_question_bank;
create trigger rusi_trki_bank_sync_del after delete on public.trki_question_bank
  referencing old table as old_rows
  for each statement execute function private.rusi_trki_bank_changed();

-- Tên sau "trg_sync_trki_test" để chạy sau (trigger BEFORE chạy theo thứ tự tên)
drop trigger if exists trki_tests_parts_from_bank on public.trki_tests;
create trigger trki_tests_parts_from_bank before insert or update on public.trki_tests
  for each row execute function private.rusi_trki_tests_from_bank();
