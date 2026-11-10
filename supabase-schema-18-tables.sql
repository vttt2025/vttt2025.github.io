-- =============================================================================
-- RUSI TRKI — PRAGMATIC POSTGRESQL SCHEMA (18 CORE TABLES + SECURITY DEFINER RPC)
-- Target Project : https://nrhtdwjihnlaxrbitmcf.supabase.co
-- Standard Spec  : PROJECT_SPEC.md (Mục 7 — 18 Tables Pragmatic Architecture)
-- Design Rules   : Andrej Karpathy (Simplicity First, Surgical, Idempotent)
-- =============================================================================

-- 0. EXTENSIONS & PRIVATE SCHEMA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE SCHEMA IF NOT EXISTS private;

-- =============================================================================
-- PHÂN HỆ I: NGƯỜI DÙNG, PHÂN QUYỀN & TIẾN ĐỘ HỌC TẬP
-- =============================================================================

-- 1. BẢNG PROFILES (Học viên & Quản trị)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'super_admin')),
    is_pro BOOLEAN NOT NULL DEFAULT false,
    pro_expires_at TIMESTAMPTZ,
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS full_name TEXT,
    ADD COLUMN IF NOT EXISTS avatar_url TEXT,
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student',
    ADD COLUMN IF NOT EXISTS is_pro BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS pro_expires_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 2. BẢNG USER_PROGRESS (Tổng XP, Streak & Danh sách hoàn thành)
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    xp_total BIGINT NOT NULL DEFAULT 0,
    streak_count INT NOT NULL DEFAULT 0,
    last_study_date DATE,
    vocab_stats JSONB NOT NULL DEFAULT '{"mastered": 0, "learning": 0, "due": 0}'::jsonb,
    done_list JSONB NOT NULL DEFAULT '{"vocabDone": [], "listenDone": [], "speakDone": [], "writeDone": [], "trkiDone": []}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_progress
    ADD COLUMN IF NOT EXISTS xp_total BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS streak_count INT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_study_date DATE,
    ADD COLUMN IF NOT EXISTS vocab_stats JSONB NOT NULL DEFAULT '{"mastered": 0, "learning": 0, "due": 0}'::jsonb,
    ADD COLUMN IF NOT EXISTS done_list JSONB NOT NULL DEFAULT '{"vocabDone": [], "listenDone": [], "speakDone": [], "writeDone": [], "trkiDone": []}'::jsonb,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- =============================================================================
-- PHÂN HỆ II: TỪ VỰNG TIẾNG NGA CHUYÊN SÂU & LỌ TỪ VỰNG
-- =============================================================================

-- 4. BẢNG VOCABULARIES (Kho từ vựng cốt lõi tiếng Nga - 16 thuộc tính ngôn ngữ)
CREATE TABLE IF NOT EXISTS public.vocabularies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word_with_stress TEXT NOT NULL,
    word_normalized TEXT NOT NULL,
    pos TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    gender TEXT,
    aspect TEXT,
    meaning_vi TEXT NOT NULL,
    meaning_ru TEXT,
    transcription TEXT,
    examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    collocations JSONB NOT NULL DEFAULT '{}'::jsonb,
    inflection_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    cases_table JSONB DEFAULT '{}'::jsonb,
    conjugation_data JSONB DEFAULT '{}'::jsonb,
    structures JSONB DEFAULT '[]'::jsonb,
    synonyms TEXT[] DEFAULT '{}',
    antonyms TEXT[] DEFAULT '{}',
    family_words TEXT[] DEFAULT '{}',
    audio_url TEXT,
    topic_id TEXT,
    topic_code TEXT,
    sub_topic TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.vocabularies
    ADD COLUMN IF NOT EXISTS word_with_stress TEXT,
    ADD COLUMN IF NOT EXISTS word_normalized TEXT,
    ADD COLUMN IF NOT EXISTS pos TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS gender TEXT,
    ADD COLUMN IF NOT EXISTS aspect TEXT,
    ADD COLUMN IF NOT EXISTS meaning_vi TEXT,
    ADD COLUMN IF NOT EXISTS meaning_ru TEXT,
    ADD COLUMN IF NOT EXISTS transcription TEXT,
    ADD COLUMN IF NOT EXISTS examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS collocations JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS inflection_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS cases_table JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS conjugation_data JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS structures JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS synonyms TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS antonyms TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS family_words TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS audio_url TEXT,
    ADD COLUMN IF NOT EXISTS topic_id TEXT,
    ADD COLUMN IF NOT EXISTS topic_code TEXT,
    ADD COLUMN IF NOT EXISTS sub_topic TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Nới lỏng các ràng buộc cũ nếu có
DO $$
BEGIN
    ALTER TABLE public.vocabularies ALTER COLUMN source_key DROP NOT NULL;
    ALTER TABLE public.vocabularies ALTER COLUMN source_key SET DEFAULT gen_random_uuid()::text;
    ALTER TABLE public.vocabularies ALTER COLUMN publication_status DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_vocab_normalized ON public.vocabularies(word_normalized);
CREATE INDEX IF NOT EXISTS idx_vocab_level ON public.vocabularies(level);
CREATE INDEX IF NOT EXISTS idx_vocab_topic_code ON public.vocabularies(topic_code);

-- 3. BẢNG USER_VOCAB_PROGRESS (Tiến độ SRS SM-2 theo từng từ vựng)
CREATE TABLE IF NOT EXISTS public.user_vocab_progress (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE,
    learning_state SMALLINT NOT NULL DEFAULT 0,
    interval_days INT NOT NULL DEFAULT 1,
    ease_factor REAL NOT NULL DEFAULT 2.5,
    next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    review_count INT NOT NULL DEFAULT 0,
    last_reviewed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, vocab_id)
);

ALTER TABLE public.user_vocab_progress
    ADD COLUMN IF NOT EXISTS learning_state SMALLINT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS interval_days INT NOT NULL DEFAULT 1,
    ADD COLUMN IF NOT EXISTS ease_factor REAL NOT NULL DEFAULT 2.5,
    ADD COLUMN IF NOT EXISTS next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS review_count INT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ;

-- Nới lỏng ràng buộc cũ nếu có
DO $$
BEGIN
    ALTER TABLE public.user_vocab_progress ALTER COLUMN direction DROP NOT NULL;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN direction SET DEFAULT 1;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN interval_seconds DROP NOT NULL;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN interval_seconds SET DEFAULT 86400;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN lapse_count DROP NOT NULL;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN lapse_count SET DEFAULT 0;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN is_suspended DROP NOT NULL;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN is_suspended SET DEFAULT false;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN row_version DROP NOT NULL;
    ALTER TABLE public.user_vocab_progress ALTER COLUMN row_version SET DEFAULT 1;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_vocab_due ON public.user_vocab_progress(user_id, next_review_at);

-- 5. BẢNG VOCAB_JARS (Lọ từ vựng hệ thống & Lọ cá nhân)
CREATE TABLE IF NOT EXISTS public.vocab_jars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,
    name TEXT,
    jar_name TEXT,
    level TEXT NOT NULL DEFAULT 'A1',
    icon TEXT NOT NULL DEFAULT 'archive-jar',
    color_code TEXT NOT NULL DEFAULT '#0039A6',
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT true,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    word_count INT NOT NULL DEFAULT 0,
    words_summary JSONB DEFAULT '[]'::jsonb,
    words JSONB DEFAULT '[]'::jsonb,
    article JSONB DEFAULT '{}'::jsonb,
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.vocab_jars
    ADD COLUMN IF NOT EXISTS code TEXT,
    ADD COLUMN IF NOT EXISTS name TEXT,
    ADD COLUMN IF NOT EXISTS jar_name TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'archive-jar',
    ADD COLUMN IF NOT EXISTS color_code TEXT DEFAULT '#0039A6',
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS word_count INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS words_summary JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS words JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS article JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS level_name TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
    ALTER TABLE public.vocab_jars ALTER COLUMN name DROP NOT NULL;
    ALTER TABLE public.vocab_jars ALTER COLUMN level DROP NOT NULL;
    ALTER TABLE public.vocab_jars ALTER COLUMN icon_slug DROP NOT NULL;
    ALTER TABLE public.vocab_jars ALTER COLUMN publication_status DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

UPDATE public.vocab_jars SET name = jar_name WHERE (name IS NULL OR name = '') AND jar_name IS NOT NULL;
UPDATE public.vocab_jars SET jar_name = name WHERE (jar_name IS NULL OR jar_name = '') AND name IS NOT NULL;

-- 6. BẢNG JAR_ITEMS (Bảng liên kết Nhiều - Nhiều giữa Lọ và Từ vựng)
CREATE TABLE IF NOT EXISTS public.jar_items (
    jar_id UUID NOT NULL REFERENCES public.vocab_jars(id) ON DELETE CASCADE,
    vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE,
    position INT NOT NULL DEFAULT 0,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (jar_id, vocab_id)
);

CREATE INDEX IF NOT EXISTS idx_jar_items_jar ON public.jar_items(jar_id);
CREATE INDEX IF NOT EXISTS idx_jar_items_vocab ON public.jar_items(vocab_id);

-- =============================================================================
-- PHÂN HỆ III: CÁC BÀI HỌC KỸ NĂNG CHUYÊN SÂU
-- =============================================================================

-- 7. BẢNG TOPIC_ARTICLES (Bài học chủ đề chuyên sâu Markdown & Chuỗi hành động)
CREATE TABLE IF NOT EXISTS public.topic_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    intro TEXT,
    content_md TEXT NOT NULL DEFAULT '',
    audio_url TEXT,
    action_chains JSONB DEFAULT '[]'::jsonb,
    dialogues JSONB DEFAULT '[]'::jsonb,
    grammar_notes JSONB DEFAULT '[]'::jsonb,
    cultural_tip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.topic_articles
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS intro TEXT,
    ADD COLUMN IF NOT EXISTS content_md TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS audio_url TEXT,
    ADD COLUMN IF NOT EXISTS action_chains JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS dialogues JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS grammar_notes JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS cultural_tip TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 8. BẢNG GRAMMAR_LESSONS (Kho bài học ngữ pháp 6 cách & cú pháp)
CREATE TABLE IF NOT EXISTS public.grammar_lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    category TEXT NOT NULL DEFAULT 'grammar',
    summary TEXT,
    content_md TEXT NOT NULL DEFAULT '',
    rules JSONB NOT NULL DEFAULT '[]'::jsonb,
    table_data JSONB DEFAULT '[]'::jsonb,
    questions JSONB DEFAULT '[]'::jsonb,
    vi TEXT,
    topic TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.grammar_lessons
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'grammar',
    ADD COLUMN IF NOT EXISTS summary TEXT,
    ADD COLUMN IF NOT EXISTS content_md TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS rules JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS table_data JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS questions JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS vi TEXT,
    ADD COLUMN IF NOT EXISTS topic TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
    ALTER TABLE public.grammar_lessons ALTER COLUMN content_md DROP NOT NULL;
    ALTER TABLE public.grammar_lessons ALTER COLUMN order_index DROP NOT NULL;
    ALTER TABLE public.grammar_lessons ALTER COLUMN row_version DROP NOT NULL;
    ALTER TABLE public.grammar_lessons ALTER COLUMN publication_status DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 9.1. BẢNG LISTENING_TOPICS (Chủ đề luyện nghe & chép chính tả đồng bộ)
CREATE TABLE IF NOT EXISTS public.listening_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    category TEXT,
    description TEXT,
    icon TEXT DEFAULT 'headphones',
    sort_order INT DEFAULT 0,
    is_pro_only BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9.2. BẢNG LISTENING_LESSONS (Bài luyện nghe hiểu & nghe chép chính tả thống nhất)
CREATE TABLE IF NOT EXISTS public.listening_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.listening_topics(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    level_name TEXT,
    category TEXT NOT NULL DEFAULT 'comprehension',
    category_name TEXT,
    part_type TEXT,
    part_number INT,
    youtube_id TEXT,
    video_youtube_id TEXT,
    audio_url TEXT,
    duration_seconds INT,
    est_minutes INT,
    lines JSONB NOT NULL DEFAULT '[]'::jsonb,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    transcript_ru TEXT,
    translation_vi TEXT,
    vi TEXT,
    sort_order INT DEFAULT 0,
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9.3. BẢNG LISTENING_LESSON_VOCAB (Từ vựng gợi ý theo từng câu lấy từ từ điển vocabularies)
CREATE TABLE IF NOT EXISTS public.listening_lesson_vocab (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.listening_lessons(id) ON DELETE CASCADE,
    vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE,
    line_index INT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT listening_lesson_vocab_unique UNIQUE (lesson_id, vocab_id, line_index)
);

ALTER TABLE public.listening_lessons
    ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES public.listening_topics(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS code TEXT,
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS level_name TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'comprehension',
    ADD COLUMN IF NOT EXISTS category_name TEXT,
    ADD COLUMN IF NOT EXISTS part_type TEXT,
    ADD COLUMN IF NOT EXISTS part_number INT,
    ADD COLUMN IF NOT EXISTS youtube_id TEXT,
    ADD COLUMN IF NOT EXISTS video_youtube_id TEXT,
    ADD COLUMN IF NOT EXISTS audio_url TEXT,
    ADD COLUMN IF NOT EXISTS duration_seconds INT,
    ADD COLUMN IF NOT EXISTS est_minutes INT,
    ADD COLUMN IF NOT EXISTS lines JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS transcript_ru TEXT,
    ADD COLUMN IF NOT EXISTS translation_vi TEXT,
    ADD COLUMN IF NOT EXISTS vi TEXT,
    ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS raw_data JSONB,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
    ALTER TABLE public.listening_lessons ALTER COLUMN lesson_type DROP NOT NULL;
    ALTER TABLE public.listening_lessons ALTER COLUMN lesson_type SET DEFAULT 'comprehension';
    ALTER TABLE public.listening_lessons ALTER COLUMN publication_status DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 10. BẢNG SPEAKING_LESSONS (Luyện nói Shadowing qua Video YouTube)
CREATE TABLE IF NOT EXISTS public.speaking_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1' CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    level_name TEXT,
    category TEXT NOT NULL DEFAULT 'shadowing',
    category_name TEXT DEFAULT 'Luyện nói Shadowing qua Video',
    youtube_id TEXT NOT NULL,
    youtube_url TEXT,
    video_sample_url TEXT,
    description TEXT,
    sentences JSONB NOT NULL DEFAULT '[]'::jsonb,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    icon TEXT NOT NULL DEFAULT 'youtube',
    sort_order INT DEFAULT 0,
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    raw_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.speaking_lessons
    ADD COLUMN IF NOT EXISTS sentences JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS youtube_url TEXT,
    ADD COLUMN IF NOT EXISTS description TEXT;

-- 10. BẢNG WRITING_TOPICS (Chủ đề luyện viết: Tả tranh & Luyện dịch)
CREATE TABLE IF NOT EXISTS public.writing_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    level_name TEXT,
    type TEXT NOT NULL DEFAULT 'picture', -- 'picture' (Tả tranh) | 'translation' (Luyện dịch)
    category TEXT,
    category_name TEXT,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    est_minutes INT DEFAULT 15,
    sort_order INT DEFAULT 0,
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.writing_topics
    ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'picture',
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS icon TEXT,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 11. BẢNG WRITING_TASKS (Đề bài luyện tập: Tả tranh & Luyện dịch theo chủ đề)
CREATE TABLE IF NOT EXISTS public.writing_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.writing_topics(id) ON DELETE CASCADE,
    code TEXT UNIQUE,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    level_name TEXT,
    task_type TEXT NOT NULL DEFAULT 'picture_desc', -- 'picture_desc' | 'translation'
    category TEXT,
    category_name TEXT,
    image_url TEXT, -- Ảnh lưu từ Supabase Storage (bucket writing-images)
    prompt_text TEXT DEFAULT '',
    prompt TEXT NOT NULL, -- Đề bài (tiếng Nga cho tả tranh, tiếng Việt cho luyện dịch)
    model_answer TEXT, -- Bài mẫu chuẩn TRKI
    sample_essay TEXT,
    tips JSONB DEFAULT '[]'::jsonb, -- Gợi ý, câu hỏi định hướng, cấu trúc gợi ý
    ai_prompt TEXT, -- Prompt tiêu chuẩn để AI chấm điểm (rubric, tiêu chí TRKI)
    min_words INT NOT NULL DEFAULT 30,
    suggested_words TEXT[] DEFAULT '{}',
    rubric JSONB DEFAULT '{}'::jsonb,
    sort_order INT DEFAULT 0,
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.writing_tasks
    ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES public.writing_topics(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS code TEXT,
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS level_name TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT,
    ADD COLUMN IF NOT EXISTS category_name TEXT,
    ADD COLUMN IF NOT EXISTS task_type TEXT DEFAULT 'picture_desc',
    ADD COLUMN IF NOT EXISTS prompt_text TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS prompt TEXT,
    ADD COLUMN IF NOT EXISTS image_url TEXT,
    ADD COLUMN IF NOT EXISTS min_words INT DEFAULT 30,
    ADD COLUMN IF NOT EXISTS model_answer TEXT,
    ADD COLUMN IF NOT EXISTS sample_essay TEXT,
    ADD COLUMN IF NOT EXISTS tips TEXT,
    ADD COLUMN IF NOT EXISTS ai_prompt TEXT,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS raw_data JSONB,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 11B. BẢNG WRITING_TASK_VOCAB (Danh sách từ vựng lấy trực tiếp từ từ điển vocabularies)
CREATE TABLE IF NOT EXISTS public.writing_task_vocab (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.writing_tasks(id) ON DELETE CASCADE,
    vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT writing_task_vocab_unique UNIQUE (task_id, vocab_id)
);

CREATE INDEX IF NOT EXISTS idx_writing_task_vocab_task_id ON public.writing_task_vocab(task_id);
CREATE INDEX IF NOT EXISTS idx_writing_task_vocab_vocab_id ON public.writing_task_vocab(vocab_id);

-- Xóa các ràng buộc cũ gắt gao của FK4 trên writing_tasks
DO $$
BEGIN
    ALTER TABLE public.writing_tasks DROP CONSTRAINT IF EXISTS writing_tasks_access_entitlement_fkey CASCADE;
    ALTER TABLE public.writing_tasks DROP CONSTRAINT IF EXISTS writing_tasks_image_asset_id_fkey CASCADE;
    ALTER TABLE public.writing_tasks DROP CONSTRAINT IF EXISTS writing_tasks_check CASCADE;
    ALTER TABLE public.writing_tasks DROP CONSTRAINT IF EXISTS writing_tasks_check1 CASCADE;
    ALTER TABLE public.writing_tasks DROP CONSTRAINT IF EXISTS writing_tasks_task_type_check CASCADE;
    ALTER TABLE public.writing_tasks ALTER COLUMN task_type SET DEFAULT 'picture_desc';
    ALTER TABLE public.writing_tasks ALTER COLUMN min_words SET DEFAULT 40;
    ALTER TABLE public.writing_tasks ALTER COLUMN prompt_text DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Đồng bộ dữ liệu cũ từ writing_topics sang writing_tasks
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'writing_topics') THEN
        INSERT INTO public.writing_tasks (
            id, code, title, level, level_name, category, category_name,
            task_type, prompt_text, prompt, image_url, min_words, suggested_words,
            model_answer, sample_essay, tips, is_pro_only, raw_data, created_at, updated_at
        )
        SELECT 
            wt.id, wt.code, wt.title, wt.level, wt.level_name, wt.category, wt.category_name,
            'picture_desc',
            COALESCE(wt.prompt, wt.title), wt.prompt, wt.image_url, COALESCE(wt.min_words, 40), COALESCE(wt.suggested_words, '{}'),
            wt.model_answer, wt.model_answer, wt.tips, COALESCE(wt.is_pro_only, false), wt.raw_data, wt.created_at, wt.updated_at
        FROM public.writing_topics wt
        ON CONFLICT (id) DO UPDATE SET
            prompt_text = EXCLUDED.prompt_text,
            prompt = EXCLUDED.prompt,
            image_url = EXCLUDED.image_url,
            model_answer = EXCLUDED.model_answer,
            sample_essay = EXCLUDED.sample_essay,
            updated_at = NOW();
    END IF;
END $$;

-- 12. BẢNG WRITING_SUBMISSIONS (Bài nộp tự luận & AI Chấm điểm)
CREATE TABLE IF NOT EXISTS public.writing_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES public.writing_tasks(id) ON DELETE CASCADE,
    content_ru TEXT,
    word_count INT NOT NULL DEFAULT 0,
    overall_score NUMERIC(5,2),
    ai_feedback JSONB DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.writing_submissions
    ADD COLUMN IF NOT EXISTS content_ru TEXT,
    ADD COLUMN IF NOT EXISTS word_count INT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS overall_score NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS ai_feedback JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
    ALTER TABLE public.writing_submissions ALTER COLUMN task_version DROP NOT NULL;
    ALTER TABLE public.writing_submissions ALTER COLUMN client_submission_id DROP NOT NULL;
    ALTER TABLE public.writing_submissions ALTER COLUMN prompt_snapshot DROP NOT NULL;
    ALTER TABLE public.writing_submissions ALTER COLUMN student_text DROP NOT NULL;
    ALTER TABLE public.writing_submissions ALTER COLUMN status SET DEFAULT 'submitted';
    ALTER TABLE public.writing_submissions ALTER COLUMN status DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_writing_submissions_user ON public.writing_submissions(user_id);

-- =============================================================================
-- PHÂN HỆ IV: KHẢO THÍ TRKI & BẢO VỆ ĐÁP ÁN (ZERO-LEAK)
-- =============================================================================

-- 13. BẢNG TRKI_TESTS (Ngân hàng đề thi chuẩn TRKI 5 Phân môn)
CREATE TABLE IF NOT EXISTS public.trki_tests (
    id TEXT PRIMARY KEY,
    code TEXT,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'A1',
    level_name TEXT,
    category TEXT,
    sub_test_type TEXT,
    duration_min INT NOT NULL DEFAULT 45,
    duration_minutes INT,
    pass_percent INT NOT NULL DEFAULT 66,
    passing_score INT,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    parts JSONB,
    part1 JSONB NOT NULL DEFAULT '{}'::jsonb, -- Phần 1: Từ vựng & Ngữ pháp (questions)
    part2 JSONB NOT NULL DEFAULT '{}'::jsonb, -- Phần 2: Đọc hiểu văn bản (text: {ru, vi}, questions)
    part3 JSONB NOT NULL DEFAULT '{}'::jsonb, -- Phần 3: Nghe hiểu (audio_url từ bucket trki-audio, lines, questions)
    part4 JSONB NOT NULL DEFAULT '{}'::jsonb, -- Phần 4: Viết tự luận (writing_tasks: [{title, prompt, vi, minWords, sample_text}])
    part5 JSONB NOT NULL DEFAULT '{}'::jsonb, -- Phần 5: Nói tình huống (speaking_tasks: [{title, prompt, vi, suggested}])
    answers JSONB NOT NULL DEFAULT '{}'::jsonb, -- Bảng đáp án chi tiết cho cả 5 phần thi
    is_pro_only BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.trki_tests
    ADD COLUMN IF NOT EXISTS code TEXT,
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'A1',
    ADD COLUMN IF NOT EXISTS level_name TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT,
    ADD COLUMN IF NOT EXISTS sub_test_type TEXT,
    ADD COLUMN IF NOT EXISTS duration_min INT NOT NULL DEFAULT 45,
    ADD COLUMN IF NOT EXISTS duration_minutes INT,
    ADD COLUMN IF NOT EXISTS pass_percent INT NOT NULL DEFAULT 66,
    ADD COLUMN IF NOT EXISTS passing_score INT,
    ADD COLUMN IF NOT EXISTS sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS parts JSONB,
    ADD COLUMN IF NOT EXISTS part1 JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS part2 JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS part3 JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS part4 JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS part5 JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN IF NOT EXISTS raw_data JSONB,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- TRIGGER ĐỒNG BỘ 5 PHẦN THI TRKI & ANSWERS TỰ ĐỘNG
CREATE OR REPLACE FUNCTION private.rusi_sync_trki_test()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (NEW.parts IS NOT NULL AND jsonb_array_length(NEW.parts) >= 3) AND 
     (NEW.part1 = '{}'::jsonb OR NEW.part1 IS NULL) THEN
    NEW.part1 := COALESCE(NEW.parts->0, '{}'::jsonb);
    NEW.part2 := COALESCE(NEW.parts->1, '{}'::jsonb);
    NEW.part3 := COALESCE(NEW.parts->2, '{}'::jsonb);
    NEW.part4 := COALESCE(NEW.parts->3, '{}'::jsonb);
    NEW.part5 := COALESCE(NEW.parts->4, '{}'::jsonb);
  END IF;

  IF NEW.part1 IS NOT NULL AND NEW.part1 <> '{}'::jsonb THEN
    IF NOT (NEW.part1 ? 'id') THEN NEW.part1 := jsonb_set(NEW.part1, '{id}', '"gram"'); END IF;
    IF NOT (NEW.part1 ? 'name') THEN NEW.part1 := jsonb_set(NEW.part1, '{name}', '"Часть 1. Лексика и грамматика"'); END IF;
    IF NOT (NEW.part1 ? 'vi') THEN NEW.part1 := jsonb_set(NEW.part1, '{vi}', '"Phần 1. Từ vựng và ngữ pháp"'); END IF;
  END IF;

  IF NEW.part2 IS NOT NULL AND NEW.part2 <> '{}'::jsonb THEN
    IF NOT (NEW.part2 ? 'id') THEN NEW.part2 := jsonb_set(NEW.part2, '{id}', '"reading"'); END IF;
    IF NOT (NEW.part2 ? 'name') THEN NEW.part2 := jsonb_set(NEW.part2, '{name}', '"Часть 2. Чтение"'); END IF;
    IF NOT (NEW.part2 ? 'vi') THEN NEW.part2 := jsonb_set(NEW.part2, '{vi}', '"Phần 2. Đọc hiểu"'); END IF;
  END IF;

  IF NEW.part3 IS NOT NULL AND NEW.part3 <> '{}'::jsonb THEN
    IF NOT (NEW.part3 ? 'id') THEN NEW.part3 := jsonb_set(NEW.part3, '{id}', '"listening"'); END IF;
    IF NOT (NEW.part3 ? 'name') THEN NEW.part3 := jsonb_set(NEW.part3, '{name}', '"Часть 3. Аудирование"'); END IF;
    IF NOT (NEW.part3 ? 'vi') THEN NEW.part3 := jsonb_set(NEW.part3, '{vi}', '"Phần 3. Nghe hiểu"'); END IF;
  END IF;

  IF NEW.part4 IS NOT NULL AND NEW.part4 <> '{}'::jsonb THEN
    IF NOT (NEW.part4 ? 'id') THEN NEW.part4 := jsonb_set(NEW.part4, '{id}', '"writing"'); END IF;
    IF NOT (NEW.part4 ? 'name') THEN NEW.part4 := jsonb_set(NEW.part4, '{name}', '"Часть 4. Письмо"'); END IF;
    IF NOT (NEW.part4 ? 'vi') THEN NEW.part4 := jsonb_set(NEW.part4, '{vi}', '"Phần 4. Luyện viết tự luận"'); END IF;
  END IF;

  IF NEW.part5 IS NOT NULL AND NEW.part5 <> '{}'::jsonb THEN
    IF NOT (NEW.part5 ? 'id') THEN NEW.part5 := jsonb_set(NEW.part5, '{id}', '"speaking"'); END IF;
    IF NOT (NEW.part5 ? 'name') THEN NEW.part5 := jsonb_set(NEW.part5, '{name}', '"Часть 5. Говорение"'); END IF;
    IF NOT (NEW.part5 ? 'vi') THEN NEW.part5 := jsonb_set(NEW.part5, '{vi}', '"Phần 5. Đề bài tình huống & Nói"'); END IF;
  END IF;

  NEW.parts := '[]'::jsonb;
  IF NEW.part1 IS NOT NULL AND NEW.part1 <> '{}'::jsonb THEN NEW.parts := NEW.parts || jsonb_build_array(NEW.part1); END IF;
  IF NEW.part2 IS NOT NULL AND NEW.part2 <> '{}'::jsonb THEN NEW.parts := NEW.parts || jsonb_build_array(NEW.part2); END IF;
  IF NEW.part3 IS NOT NULL AND NEW.part3 <> '{}'::jsonb THEN NEW.parts := NEW.parts || jsonb_build_array(NEW.part3); END IF;
  IF NEW.part4 IS NOT NULL AND NEW.part4 <> '{}'::jsonb THEN NEW.parts := NEW.parts || jsonb_build_array(NEW.part4); END IF;
  IF NEW.part5 IS NOT NULL AND NEW.part5 <> '{}'::jsonb THEN NEW.parts := NEW.parts || jsonb_build_array(NEW.part5); END IF;

  NEW.sections := NEW.parts;

  IF NEW.answers IS NULL OR NEW.answers = '{}'::jsonb THEN
    NEW.answers := jsonb_build_object(
      'part1', COALESCE((
        SELECT jsonb_agg(jsonb_build_object('index', (ord - 1), 'correct', (elem->>'a')::int, 'answer', elem->'options'->((elem->>'a')::int), 'ex', elem->>'ex'))
        FROM jsonb_array_elements(NEW.part1->'questions') WITH ORDINALITY arr(elem, ord)
      ), '[]'::jsonb),
      'part2', COALESCE((
        SELECT jsonb_agg(jsonb_build_object('index', (ord - 1), 'correct', (elem->>'a')::int, 'answer', elem->'options'->((elem->>'a')::int), 'ex', elem->>'ex'))
        FROM jsonb_array_elements(NEW.part2->'questions') WITH ORDINALITY arr(elem, ord)
      ), '[]'::jsonb),
      'part3', COALESCE((
        SELECT jsonb_agg(jsonb_build_object('index', (ord - 1), 'correct', (elem->>'a')::int, 'answer', elem->'options'->((elem->>'a')::int), 'ex', elem->>'ex'))
        FROM jsonb_array_elements(NEW.part3->'questions') WITH ORDINALITY arr(elem, ord)
      ), '[]'::jsonb),
      'part4', COALESCE(NEW.part4->'writing_tasks', '[]'::jsonb),
      'part5', COALESCE(NEW.part5->'speaking_tasks', '[]'::jsonb)
    );
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_trki_test ON public.trki_tests;
CREATE TRIGGER trg_sync_trki_test
  BEFORE INSERT OR UPDATE ON public.trki_tests
  FOR EACH ROW
  EXECUTE FUNCTION private.rusi_sync_trki_test();

-- 14. BẢNG PRIVATE.EXAM_ANSWER_KEYS (Giấu đáp án đúng & Lời giải sư phạm)
DROP TABLE IF EXISTS private.exam_answer_keys CASCADE;
CREATE TABLE private.exam_answer_keys (
    exam_id TEXT PRIMARY KEY REFERENCES public.trki_tests(id) ON DELETE CASCADE,
    keys JSONB NOT NULL DEFAULT '{}'::jsonb,
    explanations JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. BẢNG TRKI_SUBMISSIONS (Lịch sử nộp bài thi thử TRKI)
CREATE TABLE IF NOT EXISTS public.trki_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_id TEXT NOT NULL REFERENCES public.trki_tests(id) ON DELETE CASCADE,
    score_percent NUMERIC(5,2) NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT false,
    section_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    user_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    time_spent_sec INT NOT NULL DEFAULT 0,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.trki_submissions
    ADD COLUMN IF NOT EXISTS score_percent NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS passed BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS section_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS user_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS time_spent_sec INT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_trki_submissions_user ON public.trki_submissions(user_id);

-- =============================================================================
-- PHÂN HỆ V: GIAO DỊCH, HỘI VIÊN PRO & THƯƠNG MẠI
-- =============================================================================

-- 16. BẢNG PACKAGES (3 gói cước hội viên PRO)
CREATE TABLE IF NOT EXISTS public.packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    title TEXT,
    price_vnd BIGINT NOT NULL DEFAULT 0,
    price BIGINT,
    price_old BIGINT,
    duration_months INT,
    duration_days INT,
    is_lifetime BOOLEAN NOT NULL DEFAULT false,
    badge TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    feature_list JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.packages
    ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS price_vnd BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS price BIGINT,
    ADD COLUMN IF NOT EXISTS price_old BIGINT,
    ADD COLUMN IF NOT EXISTS duration_months INT,
    ADD COLUMN IF NOT EXISTS duration_days INT,
    ADD COLUMN IF NOT EXISTS is_lifetime BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS badge TEXT,
    ADD COLUMN IF NOT EXISTS features JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS feature_list JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS popular BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

UPDATE public.packages SET title = name WHERE (title IS NULL OR title = '') AND name IS NOT NULL;
UPDATE public.packages SET price_vnd = price_minor WHERE (price_vnd IS NULL OR price_vnd = 0) AND price_minor IS NOT NULL;

-- 17. BẢNG ORDERS (Đơn hàng VietQR & Kích hoạt bản quyền)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    package_id TEXT NOT NULL REFERENCES public.packages(id),
    amount BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'cancelled')),
    payment_method TEXT NOT NULL DEFAULT 'vietqr',
    casso_trans_id TEXT,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '15 minutes'),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders
    ADD COLUMN IF NOT EXISTS order_code TEXT,
    ADD COLUMN IF NOT EXISTS package_id TEXT,
    ADD COLUMN IF NOT EXISTS amount BIGINT,
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'vietqr',
    ADD COLUMN IF NOT EXISTS casso_trans_id TEXT,
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

DO $$
BEGIN
    ALTER TABLE public.orders ALTER COLUMN client_order_key DROP NOT NULL;
    ALTER TABLE public.orders ALTER COLUMN amount_minor DROP NOT NULL;
    ALTER TABLE public.orders ALTER COLUMN currency DROP NOT NULL;
    ALTER TABLE public.orders ALTER COLUMN currency SET DEFAULT 'VND';
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_code ON public.orders(order_code);

-- 18. BẢNG SHOP_PRODUCTS (Sản phẩm hàng Nga & Dịch vụ du học)
CREATE TABLE IF NOT EXISTS public.shop_products (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE,
    name TEXT NOT NULL DEFAULT '',
    title TEXT,
    category TEXT NOT NULL DEFAULT 'souvenir',
    category_name TEXT,
    price_vnd BIGINT NOT NULL DEFAULT 0,
    price BIGINT,
    original_price BIGINT,
    image_url TEXT,
    image TEXT,
    image_urls JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    stock INT DEFAULT 100,
    badge TEXT,
    status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'out_of_stock', 'pre_order')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.shop_products
    ADD COLUMN IF NOT EXISTS code TEXT,
    ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'souvenir',
    ADD COLUMN IF NOT EXISTS category_name TEXT,
    ADD COLUMN IF NOT EXISTS price_vnd BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS price BIGINT,
    ADD COLUMN IF NOT EXISTS original_price BIGINT,
    ADD COLUMN IF NOT EXISTS image_url TEXT,
    ADD COLUMN IF NOT EXISTS image TEXT,
    ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS stock INT DEFAULT 100,
    ADD COLUMN IF NOT EXISTS badge TEXT,
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'in_stock',
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
    ALTER TABLE public.shop_products ALTER COLUMN product_type DROP NOT NULL;
    ALTER TABLE public.shop_products ALTER COLUMN product_type SET DEFAULT 'physical';
    ALTER TABLE public.shop_products ALTER COLUMN price_minor DROP NOT NULL;
    ALTER TABLE public.shop_products ALTER COLUMN price_minor SET DEFAULT 0;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

UPDATE public.shop_products SET title = name WHERE (title IS NULL OR title = '') AND name IS NOT NULL;
UPDATE public.shop_products SET name = title WHERE (name IS NULL OR name = '') AND title IS NOT NULL;
UPDATE public.shop_products SET price_vnd = price_minor WHERE (price_vnd IS NULL OR price_vnd = 0) AND price_minor IS NOT NULL;

-- =============================================================================
-- PHÂN HỆ VI: CẨM NANG DU HỌC & HỆ THỐNG
-- =============================================================================

-- 19. BẢNG BLOG_POSTS (Cẩm nang du học, KTX & Đời sống Nga)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    summary TEXT NOT NULL DEFAULT '',
    content_md TEXT NOT NULL DEFAULT '',
    cover_url TEXT,
    author TEXT NOT NULL DEFAULT 'Ban Biên Tập RUSI TRKI',
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS title TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS summary TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS content_md TEXT NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS cover_url TEXT,
    ADD COLUMN IF NOT EXISTS author TEXT NOT NULL DEFAULT 'Ban Biên Tập RUSI TRKI',
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 20. BẢNG PRIVATE.AUDIT_LOGS (Ghi nhật ký bảo mật & sự kiện hệ thống)
CREATE TABLE IF NOT EXISTS private.audit_logs (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    user_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- CÁC HÀM RPC BẢO MẬT (SECURITY DEFINER RPC FUNCTIONS)
-- =============================================================================

-- 1. RPC: CHẤM THI TRẮC NGHIỆM TRKI (ZERO-LEAK ANSWER KEY)
CREATE OR REPLACE FUNCTION public.rusi_grade_trki_exam(
    p_test_id TEXT,
    p_user_answers JSONB,
    p_time_spent_sec INT DEFAULT 0
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
DECLARE
    v_user_id UUID;
    v_keys JSONB;
    v_explanations JSONB;
    v_total_questions INT := 0;
    v_correct_count INT := 0;
    v_score_percent NUMERIC(5,2) := 0;
    v_passed BOOLEAN := false;
    v_submission_id UUID;
    v_key_item RECORD;
    v_user_val TEXT;
    v_correct_val TEXT;
BEGIN
    -- 1. Xác thực học viên đã đăng nhập
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Bạn cần đăng nhập để nộp bài thi.';
    END IF;

    -- 2. Đọc đáp án bí mật từ private schema
    SELECT keys, explanations INTO v_keys, v_explanations
    FROM private.exam_answer_keys
    WHERE exam_id = p_test_id;

    IF v_keys IS NULL THEN
        v_keys := '{}'::jsonb;
    END IF;

    -- 3. So khớp đáp án
    FOR v_key_item IN SELECT key, value FROM jsonb_each_text(v_keys)
    LOOP
        v_total_questions := v_total_questions + 1;
        v_correct_val := v_key_item.value;
        v_user_val := p_user_answers ->> v_key_item.key;

        IF v_user_val IS NOT NULL AND TRIM(v_user_val) = TRIM(v_correct_val) THEN
            v_correct_count := v_correct_count + 1;
        END IF;
    END LOOP;

    IF v_total_questions > 0 THEN
        v_score_percent := ROUND((v_correct_count::NUMERIC / v_total_questions::NUMERIC) * 100, 2);
    ELSE
        v_score_percent := 0;
    END IF;

    -- Chuẩn đạt TRKI: >= 66%
    IF v_score_percent >= 66.0 THEN
        v_passed := true;
    END IF;

    -- 4. Lưu bài nộp vào public.trki_submissions
    INSERT INTO public.trki_submissions (
        user_id, exam_id, score_percent, passed, user_answers, time_spent_sec, submitted_at
    ) VALUES (
        v_user_id, p_test_id, v_score_percent, v_passed, p_user_answers, p_time_spent_sec, NOW()
    ) RETURNING id INTO v_submission_id;

    -- 5. Thưởng XP và cập nhật tiến độ
    INSERT INTO public.user_progress (user_id, xp_total, updated_at)
    VALUES (v_user_id, 30, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
        xp_total = public.user_progress.xp_total + 30,
        done_list = jsonb_set(
            public.user_progress.done_list,
            '{trkiDone}',
            (public.user_progress.done_list->'trkiDone') || to_jsonb(p_test_id),
            true
        ),
        updated_at = NOW();

    -- 6. Ghi log kiểm toán
    INSERT INTO private.audit_logs (event_type, user_id, details)
    VALUES ('TRKI_EXAM_SUBMITTED', v_user_id, jsonb_build_object(
        'test_id', p_test_id,
        'submission_id', v_submission_id,
        'score', v_score_percent,
        'passed', v_passed
    ));

    RETURN jsonb_build_object(
        'submission_id', v_submission_id,
        'score_percent', v_score_percent,
        'passed', v_passed,
        'correct_count', v_correct_count,
        'total_questions', v_total_questions,
        'xp_earned', 30,
        'explanations', COALESCE(v_explanations, '{}'::jsonb)
    );
END;
$$;

-- 2. RPC: GHI NHẬN ÔN TẬP TỪ VỰNG THEO THUẬT TOÁN SRS (SM-2)
CREATE OR REPLACE FUNCTION public.rusi_submit_srs_review(
    p_vocab_id UUID,
    p_rating SMALLINT -- 1: Again, 2: Hard, 3: Good, 4: Easy
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_current_interval INT := 1;
    v_current_ease REAL := 2.5;
    v_review_count INT := 0;
    v_learning_state SMALLINT := 1;
    v_next_review TIMESTAMPTZ;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Cần đăng nhập để lưu kết quả ôn tập.';
    END IF;

    -- Lấy thông số hiện tại (nếu có)
    SELECT interval_days, ease_factor, review_count, learning_state
    INTO v_current_interval, v_current_ease, v_review_count, v_learning_state
    FROM public.user_vocab_progress
    WHERE user_id = v_user_id AND vocab_id = p_vocab_id;

    IF NOT FOUND THEN
        v_current_interval := 1;
        v_current_ease := 2.5;
        v_review_count := 0;
        v_learning_state := 0;
    END IF;

    -- Thuật toán SM-2 tinh gọn
    IF p_rating = 1 THEN -- Again
        v_current_interval := 1;
        v_learning_state := 1; -- Learning
        v_current_ease := GREATEST(1.3, v_current_ease - 0.2);
    ELSIF p_rating = 2 THEN -- Hard
        v_current_interval := GREATEST(1, ROUND(v_current_interval * 1.2));
        v_learning_state := 2; -- Reviewing
        v_current_ease := GREATEST(1.3, v_current_ease - 0.15);
    ELSIF p_rating = 3 THEN -- Good
        IF v_current_interval = 1 THEN
            v_current_interval := 3;
        ELSE
            v_current_interval := ROUND(v_current_interval * v_current_ease);
        END IF;
        v_learning_state := 2; -- Reviewing
    ELSE -- Easy (4)
        IF v_current_interval = 1 THEN
            v_current_interval := 5;
        ELSE
            v_current_interval := ROUND(v_current_interval * v_current_ease * 1.3);
        END IF;
        v_current_ease := v_current_ease + 0.15;
        IF v_current_interval >= 21 THEN
            v_learning_state := 3; -- Mastered
        END IF;
    END IF;

    v_review_count := v_review_count + 1;
    v_next_review := NOW() + (v_current_interval || ' days')::INTERVAL;

    -- Lưu tiến độ
    INSERT INTO public.user_vocab_progress (
        user_id, vocab_id, learning_state, interval_days, ease_factor,
        next_review_at, review_count, last_reviewed_at
    ) VALUES (
        v_user_id, p_vocab_id, v_learning_state, v_current_interval, v_current_ease,
        v_next_review, v_review_count, NOW()
    )
    ON CONFLICT (user_id, vocab_id) DO UPDATE SET
        learning_state = EXCLUDED.learning_state,
        interval_days = EXCLUDED.interval_days,
        ease_factor = EXCLUDED.ease_factor,
        next_review_at = EXCLUDED.next_review_at,
        review_count = EXCLUDED.review_count,
        last_reviewed_at = NOW();

    -- Thưởng XP hoàn thành
    INSERT INTO public.user_progress (user_id, xp_total, updated_at)
    VALUES (v_user_id, 5, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
        xp_total = public.user_progress.xp_total + 5,
        updated_at = NOW();

    RETURN jsonb_build_object(
        'vocab_id', p_vocab_id,
        'state', v_learning_state,
        'interval_days', v_current_interval,
        'next_review_at', v_next_review
    );
END;
$$;

-- 3. RPC: KÍCH HOẠT ĐƠN HÀNG HỘI VIÊN PRO QUA VIETQR / CASSO
CREATE OR REPLACE FUNCTION public.rusi_activate_order(
    p_order_code TEXT,
    p_casso_ref TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
DECLARE
    v_order RECORD;
    v_pkg RECORD;
    v_expires TIMESTAMPTZ;
BEGIN
    SELECT * INTO v_order FROM public.orders WHERE order_code = p_order_code;
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Không tìm thấy đơn hàng');
    END IF;

    IF v_order.status = 'paid' THEN
        RETURN jsonb_build_object('success', true, 'message', 'Đơn hàng đã được kích hoạt trước đó');
    END IF;

    SELECT * INTO v_pkg FROM public.packages WHERE id = v_order.package_id;

    IF v_pkg.is_lifetime OR v_pkg.duration_months IS NULL THEN
        v_expires := NULL; -- Vĩnh viễn
    ELSE
        v_expires := NOW() + (v_pkg.duration_months || ' months')::INTERVAL;
    END IF;

    -- Cập nhật đơn hàng
    UPDATE public.orders
    SET status = 'paid', casso_trans_id = p_casso_ref, paid_at = NOW()
    WHERE id = v_order.id;

    -- Cập nhật hồ sơ PRO
    UPDATE public.profiles
    SET is_pro = true, pro_expires_at = v_expires, updated_at = NOW()
    WHERE id = v_order.user_id;

    -- Ghi audit log
    INSERT INTO private.audit_logs (event_type, user_id, details)
    VALUES ('PRO_SUBSCRIPTION_ACTIVATED', v_order.user_id, jsonb_build_object(
        'order_code', p_order_code,
        'package_id', v_order.package_id,
        'expires_at', v_expires
    ));

    RETURN jsonb_build_object(
        'success', true,
        'user_id', v_order.user_id,
        'expires_at', v_expires
    );
END;
$$;

-- =============================================================================
-- THIẾT LẬP ROW LEVEL SECURITY (RLS) & PHÂN QUYỀN
-- =============================================================================

-- 1. Bật RLS trên toàn bộ các bảng public
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_vocab_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabularies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocab_jars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trki_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trki_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 2. Cấp quyền USAGE trên SCHEMA
GRANT USAGE ON SCHEMA public TO anon, authenticated;
REVOKE ALL ON SCHEMA private FROM anon, authenticated;
GRANT ALL ON SCHEMA private TO postgres, service_role;

-- 3. CHÍNH SÁCH ĐỌC CÔNG KHAI (PUBLIC SELECT)
DROP POLICY IF EXISTS "Public read vocabularies" ON public.vocabularies;
CREATE POLICY "Public read vocabularies" ON public.vocabularies FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read vocab_jars" ON public.vocab_jars;
CREATE POLICY "Public read vocab_jars" ON public.vocab_jars FOR SELECT TO anon, authenticated USING (is_system = true OR owner_id = auth.uid());

DROP POLICY IF EXISTS "Public read jar_items" ON public.jar_items;
CREATE POLICY "Public read jar_items" ON public.jar_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read topic_articles" ON public.topic_articles;
CREATE POLICY "Public read topic_articles" ON public.topic_articles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read grammar_lessons" ON public.grammar_lessons;
CREATE POLICY "Public read grammar_lessons" ON public.grammar_lessons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read listening_topics" ON public.listening_topics;
CREATE POLICY "Public read listening_topics" ON public.listening_topics FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read listening_lessons" ON public.listening_lessons;
CREATE POLICY "Public read listening_lessons" ON public.listening_lessons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read listening_lesson_vocab" ON public.listening_lesson_vocab;
CREATE POLICY "Public read listening_lesson_vocab" ON public.listening_lesson_vocab FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read speaking_lessons" ON public.speaking_lessons;
CREATE POLICY "Public read speaking_lessons" ON public.speaking_lessons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read writing_tasks" ON public.writing_tasks;
CREATE POLICY "Public read writing_tasks" ON public.writing_tasks FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read trki_tests" ON public.trki_tests;
CREATE POLICY "Public read trki_tests" ON public.trki_tests FOR SELECT TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "Public read packages" ON public.packages;
CREATE POLICY "Public read packages" ON public.packages FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read shop_products" ON public.shop_products;
CREATE POLICY "Public read shop_products" ON public.shop_products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read blog_posts" ON public.blog_posts;
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (true);

-- 4. CHÍNH SÁCH DỮ LIỆU CÁ NHÂN (USER PRIVATE DATA)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read own progress" ON public.user_progress;
CREATE POLICY "Users can read own progress" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own vocab progress" ON public.user_vocab_progress;
CREATE POLICY "Users can read own vocab progress" ON public.user_vocab_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own writing submissions" ON public.writing_submissions;
CREATE POLICY "Users can read own writing submissions" ON public.writing_submissions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own writing submissions" ON public.writing_submissions;
CREATE POLICY "Users can insert own writing submissions" ON public.writing_submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own trki submissions" ON public.trki_submissions;
CREATE POLICY "Users can read own trki submissions" ON public.trki_submissions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;
CREATE POLICY "Users can read own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Cấp quyền thực thi các hàm RPC cho authenticated users
GRANT EXECUTE ON FUNCTION public.rusi_grade_trki_exam(TEXT, JSONB, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rusi_submit_srs_review(UUID, SMALLINT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rusi_activate_order(TEXT, TEXT) TO authenticated, service_role;

-- Cấp quyền SELECT cơ bản trên các bảng public cho anon và authenticated
GRANT SELECT ON public.vocabularies TO anon, authenticated;
GRANT SELECT ON public.vocab_jars TO anon, authenticated;
GRANT SELECT ON public.jar_items TO anon, authenticated;
GRANT SELECT ON public.topic_articles TO anon, authenticated;
GRANT SELECT ON public.grammar_lessons TO anon, authenticated;
GRANT SELECT ON public.listening_topics TO anon, authenticated;
GRANT SELECT ON public.listening_lessons TO anon, authenticated;
GRANT SELECT ON public.listening_lesson_vocab TO anon, authenticated;
GRANT SELECT ON public.speaking_lessons TO anon, authenticated;
GRANT SELECT ON public.writing_topics TO anon, authenticated;
GRANT SELECT ON public.writing_tasks TO anon, authenticated;
GRANT SELECT ON public.writing_task_vocab TO anon, authenticated;
GRANT SELECT ON public.trki_tests TO anon, authenticated;
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT SELECT ON public.shop_products TO anon, authenticated;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_vocab_progress TO authenticated;
GRANT SELECT, INSERT ON public.writing_submissions TO authenticated;
GRANT SELECT, INSERT ON public.trki_submissions TO authenticated;
GRANT SELECT, INSERT ON public.orders TO authenticated;
