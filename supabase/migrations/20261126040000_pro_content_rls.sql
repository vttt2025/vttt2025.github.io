-- Khoá nội dung PRO bằng RLS (26/11/2026). Idempotent. CẦN 20261126030000_pro_content_catalog.sql (public.rusi_has_pro).
-- CHỈ áp dụng SAU KHI: (1) client đã có js/pro-content.js trên production, (2) workflow xuất bản đã dựng lại
-- data/modules/*.json với bài PRO ở dạng metadata (content_locked) — nếu không, publish-content.js (anon) vẫn chạy
-- được nhờ rusi_pro_catalog() nhưng client cũ sẽ không mở được bài PRO.
--
-- Trước: policy SELECT của bảng nội dung là "true" cho anon/authenticated; view trki_*_public trả cả đề PRO.
-- Sau: dòng PRO chỉ đọc được khi public.rusi_has_pro() (PRO còn hạn + phiên gắn thiết bị đang hoạt động; admin luôn true).
--   Dòng miễn phí giữ nguyên quyền đọc. Policy "Admins manage ..." (ALL) và quyền ghi không đổi.
--   Bài thuộc chủ đề PRO (listening_topics / writing_topics.is_pro_only) cũng là PRO — như publish-content.js.

-- ---------- Hàm phụ (SECURITY DEFINER: không phụ thuộc RLS của bảng cha, tránh coi nhầm là miễn phí) ----------
create or replace function private.rusi_topic_article_is_pro(p_id text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.vocab_jars j where j.is_pro = true and (j.code = p_id or j.id::text = p_id));
$$;

create or replace function private.rusi_jar_is_pro(p_jar uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select j.is_pro from public.vocab_jars j where j.id = p_jar), false);
$$;

create or replace function private.rusi_listening_lesson_is_pro(p_lesson uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.listening_lessons l
    left join public.listening_topics t on t.id = l.topic_id
    where l.id = p_lesson and (coalesce(l.is_pro_only, false) or coalesce(t.is_pro_only, false))
  );
$$;

create or replace function private.rusi_writing_task_is_pro(p_task uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.writing_tasks w
    left join public.writing_topics t on t.id = w.topic_id
    where w.id = p_task and (coalesce(w.is_pro_only, false) or coalesce(t.is_pro_only, false))
  );
$$;

revoke all on function private.rusi_topic_article_is_pro(text) from public;
revoke all on function private.rusi_jar_is_pro(uuid) from public;
revoke all on function private.rusi_listening_lesson_is_pro(uuid) from public;
revoke all on function private.rusi_writing_task_is_pro(uuid) from public;
grant execute on function private.rusi_topic_article_is_pro(text) to anon, authenticated, service_role;
grant execute on function private.rusi_jar_is_pro(uuid) to anon, authenticated, service_role;
grant execute on function private.rusi_listening_lesson_is_pro(uuid) to anon, authenticated, service_role;
grant execute on function private.rusi_writing_task_is_pro(uuid) to anon, authenticated, service_role;

-- ---------- Policy SELECT ----------
-- vocab_jars (gồm cả lọ cá nhân không PRO — vẫn đọc được như cũ)
drop policy if exists "Public read vocab_jars" on public.vocab_jars;
create policy "Public read vocab_jars" on public.vocab_jars
  for select to public
  using (not coalesce(is_pro, false) or (select public.rusi_has_pro()));

drop policy if exists "Public read jar_items" on public.jar_items;
create policy "Public read jar_items" on public.jar_items
  for select to anon, authenticated
  using (not private.rusi_jar_is_pro(jar_id) or (select public.rusi_has_pro()));

drop policy if exists "Public read topic_articles" on public.topic_articles;
create policy "Public read topic_articles" on public.topic_articles
  for select to anon, authenticated
  using (not private.rusi_topic_article_is_pro(id) or (select public.rusi_has_pro()));

drop policy if exists "Public read listening_lessons" on public.listening_lessons;
create policy "Public read listening_lessons" on public.listening_lessons
  for select to anon, authenticated
  using (not private.rusi_listening_lesson_is_pro(id) or (select public.rusi_has_pro()));

-- Từ vựng gắn bài nghe / đề viết: theo quyền của bài cha
drop policy if exists "Public read listening_lesson_vocab" on public.listening_lesson_vocab;
create policy "Public read listening_lesson_vocab" on public.listening_lesson_vocab
  for select to anon, authenticated
  using (not private.rusi_listening_lesson_is_pro(lesson_id) or (select public.rusi_has_pro()));

drop policy if exists "Public read speaking_lessons" on public.speaking_lessons;
create policy "Public read speaking_lessons" on public.speaking_lessons
  for select to anon, authenticated
  using (not coalesce(is_pro_only, false) or (select public.rusi_has_pro()));

-- writing_tasks: giữ nguyên điều kiện cũ (đã xuất bản + quyền entitlement, hoặc academic_admin), thêm điều kiện PRO
drop policy if exists "rusi_read" on public.writing_tasks;
create policy "rusi_read" on public.writing_tasks
  for select to anon, authenticated
  using (
    ((publication_status = 'published') and private.rusi_can_access(access_entitlement)
      and (not private.rusi_writing_task_is_pro(id) or (select public.rusi_has_pro())))
    or (private.rusi_session_ok() and private.rusi_has_role(array['academic_admin'::text]))
  );

drop policy if exists "Public read writing_task_vocab" on public.writing_task_vocab;
create policy "Public read writing_task_vocab" on public.writing_task_vocab
  for select to public
  using (not private.rusi_writing_task_is_pro(task_id) or (select public.rusi_has_pro()));

drop policy if exists "Public read writing_topics" on public.writing_topics;
create policy "Public read writing_topics" on public.writing_topics
  for select to public
  using (not coalesce(is_pro_only, false) or (select public.rusi_has_pro()));

drop policy if exists "Public read grammar_lessons" on public.grammar_lessons;
create policy "Public read grammar_lessons" on public.grammar_lessons
  for select to anon, authenticated
  using ((publication_status = 'published') and (not coalesce(is_pro_only, false) or (select public.rusi_has_pro())));

-- ---------- View đề thi (security_invoker=false: chạy quyền chủ view, auth.uid() vẫn là người gọi) ----------
create or replace view public.trki_tests_public with (security_invoker = false) as
 select id,
    code,
    title,
    level,
    level_name,
    category,
    sub_test_type,
    duration_min,
    duration_minutes,
    pass_percent,
    passing_score,
    is_pro_only,
    is_published,
    test_mode,
    created_at,
    updated_at,
    private.rusi_strip_answer_keys(part1) as part1,
    private.rusi_strip_answer_keys(part2) as part2,
    private.rusi_strip_answer_keys(part3) as part3,
    private.rusi_strip_answer_keys(part4) as part4,
    private.rusi_strip_answer_keys(part5) as part5,
    private.rusi_strip_answer_keys(parts) as parts,
    private.rusi_strip_answer_keys(sections) as sections,
    private.rusi_strip_answer_keys(raw_data) as raw_data
   from public.trki_tests t
  where is_published = true
    and (not coalesce(is_pro_only, false) or public.rusi_has_pro());

create or replace view public.trki_questions_public with (security_invoker = false) as
 select id,
    code,
    level,
    sub_test,
    part_number,
    question_type,
    topic,
    grammar_case,
    difficulty,
    prompt,
    prompt_vi,
    passage,
    audio_url,
    image_url,
    options,
    points,
    test_code,
    test_id,
    order_index,
    is_published,
    is_pro_only,
    created_at,
    updated_at
   from public.trki_question_bank q
  where is_published = true
    -- PRO nếu chính câu gắn cờ PRO HOẶC câu thuộc một đề PRO (cờ PRO thường chỉ đặt ở đề)
    and ((not coalesce(q.is_pro_only, false)
          and not exists (select 1 from public.trki_tests t
                          where (t.code = q.test_code or t.id = q.test_code) and coalesce(t.is_pro_only, false)))
         or public.rusi_has_pro());
