-- Khoá nội dung PRO thật sự — bước hỗ trợ (26/11/2026). Idempotent. CHỈ THÊM HÀM, không đổi quyền đọc hiện có.
--   1. public.rusi_has_pro(): phiên hiện tại có được công nhận PRO phía server không
--      (private.rusi_user_is_pro: PRO còn hạn + phiên gắn thiết bị đang hoạt động; admin luôn true; anon false).
--      Dùng trong policy SELECT của bảng nội dung (migration 20261126040000_pro_content_rls.sql).
--   2. public.rusi_pro_catalog(): metadata (KHÔNG nội dung) của các bài PRO để scripts/publish-content.js dựng thẻ
--      khoá trên danh sách — chạy được bằng anon key cả trước lẫn sau khi siết RLS.
--      Không trả: sentences/items/lines/questions/words/prompt/model_answer/tips/parts/content_md/intro/audio/video.

create or replace function public.rusi_has_pro()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.rusi_user_is_pro(auth.uid()), false);
$$;
revoke all on function public.rusi_has_pro() from public;
grant execute on function public.rusi_has_pro() to anon, authenticated, service_role;

-- Mảng jsonb an toàn (null / không phải mảng → [])
create or replace function private.rusi_jsonb_arr(j jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select case when jsonb_typeof(j) = 'array' then j else '[]'::jsonb end;
$$;

create or replace function public.rusi_pro_catalog()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    -- Lọ từ hệ thống PRO (số từ = số jar_items có từ vựng, như builder đếm words)
    'vocab_jars', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', j.id, 'code', j.code, 'name', j.name, 'level', j.level, 'icon', j.icon, 'is_system', j.is_system,
        'is_pro', j.is_pro, 'created_at', j.created_at,
        'word_count', (select count(*) from public.jar_items ji join public.vocabularies v on v.id = ji.vocab_id where ji.jar_id = j.id)
      ) order by j.created_at, j.code)
      from public.vocab_jars j
      where j.is_system = true and j.is_pro = true
    ), '[]'::jsonb),
    -- Bài chủ đề của lọ PRO (id bài = code hoặc id của lọ)
    'topic_articles', coalesce((
      select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'level', a.level) order by a.id)
      from public.topic_articles a
      where exists (select 1 from public.vocab_jars j
                    where j.is_pro = true and (j.code = a.id or j.id::text = a.id))
    ), '[]'::jsonb),
    'listening_lessons', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', l.id, 'code', l.code, 'topic_id', l.topic_id, 'title', l.title, 'vi', l.vi, 'level', l.level,
        'level_name', l.level_name, 'category', l.category, 'category_name', l.category_name,
        'part_number', l.part_number, 'duration_seconds', l.duration_seconds, 'est_minutes', l.est_minutes,
        'is_pro_only', l.is_pro_only, 'sort_order', l.sort_order,
        'topic', case when t.id is null then null else jsonb_build_object(
          'title', t.title, 'description', t.description, 'level', t.level, 'category', t.category, 'is_pro_only', t.is_pro_only) end,
        'question_count', jsonb_array_length(x.questions),
        'line_count', jsonb_array_length(x.lines),
        'dictation_count', case when jsonb_array_length(private.rusi_jsonb_arr(l.raw_data -> 'dictation')) > 0
          then jsonb_array_length(private.rusi_jsonb_arr(l.raw_data -> 'dictation'))
          else (select count(*) from jsonb_array_elements(x.lines) e
                where coalesce(nullif(e ->> 'text_ru', ''), nullif(e ->> 'ru', '')) is not null) end
      ) order by l.sort_order, l.code)
      from public.listening_lessons l
      left join public.listening_topics t on t.id = l.topic_id
      cross join lateral (select
        case when jsonb_array_length(private.rusi_jsonb_arr(l.lines)) > 0 then l.lines
             else private.rusi_jsonb_arr(l.raw_data -> 'lines') end as lines,
        case when jsonb_array_length(private.rusi_jsonb_arr(l.questions)) > 0 then l.questions
             else private.rusi_jsonb_arr(l.raw_data -> 'questions') end as questions) x
      where coalesce(l.is_pro_only, false) or coalesce(t.is_pro_only, false)
    ), '[]'::jsonb),
    'speaking_lessons', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'code', s.code, 'title', s.title, 'level', s.level, 'level_name', s.level_name,
        'category', s.category, 'category_name', s.category_name, 'speaking_mode', s.speaking_mode,
        'description', s.description, 'phoneme_target', s.phoneme_target, 'icon', s.icon,
        'is_pro_only', s.is_pro_only, 'sort_order', s.sort_order,
        'sentence_count', case
          when jsonb_array_length(private.rusi_jsonb_arr(s.sentences)) > 0 then jsonb_array_length(s.sentences)
          when jsonb_array_length(private.rusi_jsonb_arr(s.items)) > 0 then jsonb_array_length(s.items)
          else jsonb_array_length(private.rusi_jsonb_arr(s.raw_data -> 'items')) end
      ) order by s.sort_order, s.code)
      from public.speaking_lessons s
      where s.is_pro_only = true
    ), '[]'::jsonb),
    'writing_tasks', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', w.id, 'code', w.code, 'title', w.title, 'level', w.level, 'level_name', w.level_name,
        'category', w.category, 'category_name', w.category_name, 'image_url', w.image_url,
        'min_words', w.min_words, 'is_pro_only', w.is_pro_only, 'sort_order', w.sort_order,
        'topic', case when t.id is null then null else jsonb_build_object(
          'title', t.title, 'category_name', t.category_name, 'level', t.level, 'category', t.category, 'is_pro_only', t.is_pro_only) end
      ) order by w.sort_order, w.code)
      from public.writing_tasks w
      left join public.writing_topics t on t.id = w.topic_id
      where w.publication_status = 'published'
        and (coalesce(w.is_pro_only, false) or coalesce(t.is_pro_only, false))
    ), '[]'::jsonb),
    'writing_topics', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', w.id, 'code', w.code, 'title', w.title, 'level', w.level, 'level_name', w.level_name,
        'category', w.category, 'category_name', w.category_name, 'vi', w.vi, 'min_words', w.min_words,
        'image_url', w.image_url, 'icon', w.icon, 'sort_order', w.sort_order, 'is_pro_only', w.is_pro_only
      ) order by w.sort_order, w.code)
      from public.writing_topics w
      where w.is_pro_only = true
    ), '[]'::jsonb),
    'grammar_lessons', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', g.id, 'code', g.code, 'title', g.title, 'level', g.level, 'category', g.category,
        'topic', g.topic, 'vi', g.vi, 'order_index', g.order_index, 'is_pro_only', g.is_pro_only
      ) order by g.order_index, g.code)
      from public.grammar_lessons g
      where g.publication_status = 'published' and g.is_pro_only = true
    ), '[]'::jsonb),
    -- Đề TRKI PRO đã xuất bản + tóm tắt phần thi (id/name/vi/số câu) cho trki_index.json
    'trki_tests', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', t.id, 'code', t.code, 'title', t.title, 'level', t.level, 'level_name', t.level_name,
        'category', t.category, 'sub_test_type', t.sub_test_type, 'duration_min', t.duration_min,
        'pass_percent', t.pass_percent, 'is_pro_only', t.is_pro_only, 'is_published', t.is_published,
        'test_mode', t.test_mode,
        'part_summaries', coalesce((
          select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('id', p -> 'id', 'name', p -> 'name', 'vi', p -> 'vi'))
                 || jsonb_build_object('questionCount', case
                      when jsonb_array_length(private.rusi_jsonb_arr(p -> 'questions')) > 0 then jsonb_array_length(p -> 'questions')
                      when jsonb_array_length(private.rusi_jsonb_arr(p -> 'writing_tasks')) > 0 then jsonb_array_length(p -> 'writing_tasks')
                      else jsonb_array_length(private.rusi_jsonb_arr(p -> 'speaking_tasks')) end)
                 order by ord)
          from jsonb_array_elements(case
            when jsonb_array_length(private.rusi_jsonb_arr(t.parts)) > 0 then t.parts
            when jsonb_typeof(t.raw_data -> 'parts') = 'array' then t.raw_data -> 'parts'
            else private.rusi_jsonb_arr(t.sections) end) with ordinality as e(p, ord)
        ), '[]'::jsonb)
      ) order by t.level, t.code)
      from public.trki_tests t
      where t.is_published = true and t.is_pro_only = true
    ), '[]'::jsonb)
  );
$$;
revoke all on function public.rusi_pro_catalog() from public;
grant execute on function public.rusi_pro_catalog() to anon, authenticated, service_role;
