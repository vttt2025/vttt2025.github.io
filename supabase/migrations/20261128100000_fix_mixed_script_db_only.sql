-- =============================================================================
-- Đợt 2: lỗi chữ trộn bảng chữ chỉ có trong cơ sở dữ liệu (bài PRO, đề chưa công khai) — người dùng duyệt 28/11/2026.
-- Bổ sung cho 20261128090000_fix_mixed_script_and_stress.sql (cùng cách thay nguyên từ; chuỗi dạng U&'\XXXX').
--  1. Đề B2 TRKI_B2_MINOBR_Q059/61/63/64/67/71/73: câu bị tách phần gạch chân khi nhập từ sách -> thay cả câu
--     (ghép lại theo các phương án trả lời), chỉ khi câu cũ còn dấu hỏng "V ".
--  2. Thay nguyên từ ở trki_question_bank, topic_articles, grammar_lessons.
--  3. trki_tests: trigger trki_tests_parts_from_bank dựng lại câu hỏi từ ngân hàng nhưng giữ các khoá khác
--     (vd "topic") từ bản CŨ, nên UPDATE thường không sửa được. Tạm tắt riêng trigger này trong lúc sửa rồi bật lại.
--  4. Chạm lại các đề có câu vừa sửa trong ngân hàng để trigger dựng lại phần câu hỏi (đề bài) từ ngân hàng.
-- Idempotent: chuỗi cũ không còn thì không đổi gì.
-- =============================================================================

-- 1. Câu đề B2 bị tách
update public.trki_question_bank set prompt = U&'\041F\0440\0435\043C\0438\044F \201C\041D\0438\043A\0430\201D \2014 \044D\0442\043E \0432\044B\0441\0448\0430\044F \043D\0430\0433\0440\0430\0434\0430, \043F\0440\0438\0441\0443\0436\0434\0430\0435\043C\0430\044F \0437\0430 \0432\044B\0434\0430\044E\0449\0438\0435\0441\044F \0434\043E\0441\0442\0438\0436\0435\043D\0438\044F \0432 \043E\0431\043B\0430\0441\0442\0438 \043A\0438\043D\043E\0438\0441\043A\0443\0441\0441\0442\0432\0430.'
 where code = 'TRKI_B2_MINOBR_Q059' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\0417\0430 \0433\0440\0430\043D\0438\0446\0443 \0440\0430\0437\0440\0435\0448\0430\0435\0442\0441\044F \0432\044B\0432\043E\0437\0438\0442\044C \0442\043E\043B\044C\043A\043E \0432\0430\043B\044E\0442\0443, \0437\0430\0440\0435\0433\0438\0441\0442\0440\0438\0440\043E\0432\0430\043D\043D\0443\044E \0432 \0442\0430\043C\043E\0436\043D\0435.'
 where code = 'TRKI_B2_MINOBR_Q061' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\0412\043E\043F\0440\043E\0441, \043A\043E\0442\043E\0440\044B\0439 \0441\0435\0439\0447\0430\0441 \043E\0431\0441\0443\0436\0434\0430\0435\0442\0441\044F, \043A\0430\0441\0430\0435\0442\0441\044F \043F\043E\0434\043F\0438\0441\0430\043D\0438\044F \0434\043E\0433\043E\0432\043E\0440\0430 \043E\0431 \0443\043D\0438\0447\0442\043E\0436\0435\043D\0438\0438 \0445\0438\043C\0438\0447\0435\0441\043A\043E\0433\043E \043E\0440\0443\0436\0438\044F.'
 where code = 'TRKI_B2_MINOBR_Q063' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\0426\0435\043D\0430 \0432 \0444\0438\0440\043C\0435, \043A\043E\0442\043E\0440\0430\044F \0432\044B\043F\0443\0441\043A\0430\0435\0442 \0430\043D\0430\043B\043E\0433\0438\0447\043D\0443\044E \043F\0440\043E\0434\0443\043A\0446\0438\044E, \0437\043D\0430\0447\0438\0442\0435\043B\044C\043D\043E \043D\0438\0436\0435.'
 where code = 'TRKI_B2_MINOBR_Q064' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\041F\0440\043E\0430\043D\0430\043B\0438\0437\0438\0440\043E\0432\0430\0432 \043F\0435\0440\0432\044B\0435 \0440\0435\0437\0443\043B\044C\0442\0430\0442\044B, \0443\0447\0435\043D\044B\0435 \0440\0435\0448\0438\043B\0438 \043F\0440\043E\0434\043E\043B\0436\0430\0442\044C \044D\043A\0441\043F\0435\0440\0438\043C\0435\043D\0442\044B.'
 where code = 'TRKI_B2_MINOBR_Q067' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\0410\043D\0434\0440\0435\0439 \0442\043E\043B\044C\043A\043E \043E\0434\0438\043D \0440\0430\0437 \043F\043E\0441\043C\043E\0442\0440\0435\043B \0432 \0441\043B\043E\0432\0430\0440\044C, \043A\043E\0433\0434\0430 \043F\0435\0440\0435\0432\043E\0434\0438\043B \0441\0442\0430\0442\044C\044E.'
 where code = 'TRKI_B2_MINOBR_Q071' and strpos(prompt, 'V ') > 0;
update public.trki_question_bank set prompt = U&'\0420\0435\0431\0435\043D\043E\043A \0437\0430\043F\043B\0430\043A\0430\043B, \0442\0430\043A \043A\0430\043A \0438\0441\043F\0443\0433\0430\043B\0441\044F.'
 where code = 'TRKI_B2_MINOBR_Q073' and strpos(prompt, 'V ') > 0;

-- 2. Bảng cặp trước -> sau
drop table if exists pg_temp.rusi_text_fix;
create temporary table rusi_text_fix (before text primary key, after text not null);
insert into rusi_text_fix (before, after) values
  (U&'\0444\0440\0430\0433H \043C\0435\043D\0442\043E\0432', U&'\0444\0440\0430\0433\043C\0435\043D\0442\043E\0432'),
  (U&'\043E\0444\0438\0446\0438\00E1\043D\0442\0430', U&'\043E\0444\0438\0446\0438\0430\0301\043D\0442\0430'),
  (U&'\043E\0444\0438\0446\0438\00E1\043D\0442\0443', U&'\043E\0444\0438\0446\0438\0430\0301\043D\0442\0443'),
  (U&'\0441\0432\044FH \0437\0430\043D\0430', U&'\0441\0432\044F\0437\0430\043D\0430'),
  (U&'\0445\0430\0440\00F3\0448\044D\0432\0430', U&'\0445\0430\0440\043E\0301\0448\044D\0432\0430'),
  (U&'\0421\0435\0439\0447\0430\0301s', U&'\0421\0435\0439\0447\0430\0301\0441'),
  (U&'\043F\043E\0434\0440\0443ga', U&'\043F\043E\0434\0440\0443\0433\0430'),
  (U&'\0442\0432\0430\0439\044D\0432\00F3', U&'\0442\0432\0430\0439\044D\0432\043E\0301'),
  (U&'\043C\0430\0439\044D\0432\00F3', U&'\043C\0430\0439\044D\0432\043E\0301'),
  (U&'\043F\043E\0439\0434\00E9m', U&'\043F\043E\0439\0434\0451\043C'),
  (U&'\0423\0447\0451ba', U&'\0423\0447\0451\0431\0430'),
  (U&'\043F\0430\0434\0435\017E', U&'\043F\0430\0434\0435\0436'),
  (U&'\0439\044D\0432\00F3', U&'\0439\044D\0432\043E\0301'),
  (U&'\0425\0425I', 'XXI');

do $chk$
begin
  if (select md5(string_agg(before || '=>' || after, E'\n' order by before collate "C")) from rusi_text_fix)
     is distinct from '2df8b0b0edbfe932dc38513326f22e8e' then
    raise exception 'rusi_text_fix: danh sách cặp không khớp bản đã duyệt';
  end if;
end
$chk$;

create or replace function pg_temp.rusi_fix_text(t text) returns text
language plpgsql stable as $fn$
declare
  r record;
  b constant text := '[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0400-\u04FF\u0300-\u036F]';
begin
  if t is null then return t; end if;
  for r in select f.before, f.after from rusi_text_fix f order by length(f.before) desc, f.before loop
    if strpos(t, r.before) > 0 then
      t := regexp_replace(t, '(?<!' || b || ')' || regexp_replace(r.before, '([.^$*+?()\[\]{}|\\])', '\\\1', 'g') || '(?!' || b || ')', replace(r.after, '\', '\\'), 'g');
    end if;
  end loop;
  return t;
end;
$fn$;

create or replace function pg_temp.rusi_fix_table(tbl text) returns void
language plpgsql as $ft$
declare
  sets text;
  diffs text;
begin
  select string_agg(format(
           case
             when c.data_type = 'jsonb' then '%1$I = pg_temp.rusi_fix_text(%1$I::text)::jsonb'
             when c.data_type = 'ARRAY' then '%1$I = (select array_agg(pg_temp.rusi_fix_text(x) order by o) from unnest(%1$I) with ordinality u(x, o))'
             else '%1$I = pg_temp.rusi_fix_text(%1$I)'
           end, c.column_name), ', '),
         string_agg(format(
           case
             when c.data_type = 'jsonb' then '%1$I::text is distinct from pg_temp.rusi_fix_text(%1$I::text)'
             when c.data_type = 'ARRAY' then '%1$I is distinct from (select array_agg(pg_temp.rusi_fix_text(x) order by o) from unnest(%1$I) with ordinality u(x, o))'
             else '%1$I is distinct from pg_temp.rusi_fix_text(%1$I)'
           end, c.column_name), ' or ')
    into sets, diffs
    from information_schema.columns c
   where c.table_schema = 'public' and c.table_name = tbl
     and c.is_generated = 'NEVER'
     and (c.data_type in ('text', 'character varying', 'jsonb') or (c.data_type = 'ARRAY' and c.udt_name = '_text'));
  if sets is not null then
    execute format('update public.%I set %s where %s', tbl, sets, diffs);
  end if;
end;
$ft$;

select pg_temp.rusi_fix_table('trki_question_bank');
select pg_temp.rusi_fix_table('topic_articles');
select pg_temp.rusi_fix_table('grammar_lessons');

-- 3. trki_tests (tạm tắt trigger dựng-từ-ngân-hàng; cùng transaction nên lỗi thì hoàn tác cả)
alter table public.trki_tests disable trigger trki_tests_parts_from_bank;
select pg_temp.rusi_fix_table('trki_tests');
alter table public.trki_tests enable trigger trki_tests_parts_from_bank;

-- 4. Dựng lại câu hỏi của các đề có câu vừa sửa trong ngân hàng
update public.trki_tests t
   set parts = t.parts
 where t.code in (select distinct q.test_code from public.trki_question_bank q where q.code in ('TRKI_B2_MINOBR_Q059', 'TRKI_B2_MINOBR_Q061', 'TRKI_B2_MINOBR_Q063', 'TRKI_B2_MINOBR_Q064', 'TRKI_B2_MINOBR_Q067', 'TRKI_B2_MINOBR_Q071', 'TRKI_B2_MINOBR_Q073', 'TRKI_C2_MINOBR_LIST_Q009', 'TRKI_C2_MINOBR_READ_Q001', 'B1_TEST5_Q013', 'B1_TEST2_Q031', 'TRKI_C1_MINOBR_Q019'));

drop function if exists pg_temp.rusi_fix_table(text);
drop function if exists pg_temp.rusi_fix_text(text);
drop table if exists pg_temp.rusi_text_fix;
