-- =============================================================================
-- RUSI TRKI — SUPABASE DATABASE SCHEMA INITIALIZATION
-- Project URL: https://nrhtdwjihnlaxrbitmcf.supabase.co
-- Hướng dẫn: Mở https://supabase.com/dashboard/project/nrhtdwjihnlaxrbitmcf/sql/new
-- và dán toàn bộ nội dung script này rồi bấm RUN để khởi tạo cơ sở dữ liệu.
-- =============================================================================

-- 0. KÍCH HOẠT EXTENSION HỖ TRỢ UUID & TÌM KIẾM
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. AUTH, ROLES & GAMIFICATION (PROFILES, RBAC, STREAK)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'academic_admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    streak_count INT DEFAULT 0,
    last_study_date DATE,
    xp_points INT DEFAULT 0,
    mascot_level INT DEFAULT 1,          -- Cấp độ lớn dần của mèo Rusika
    current_season_outfit TEXT,          -- Trang phục theo mùa: xuân, hạ, thu, đông
    is_pro BOOLEAN DEFAULT FALSE,
    pro_expires_at TIMESTAMPTZ,
    current_session_id TEXT,             -- Quản lý Single Active Session chống share tài khoản
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger tự động tạo profile khi người dùng đăng ký qua auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. TỪ VỰNG & TỪ ĐIỂN OFFLINE (VOCABULARIES)
CREATE TABLE IF NOT EXISTS vocabularies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_with_stress TEXT NOT NULL,      -- vd: соба́ка
    word_normalized TEXT NOT NULL,       -- vd: собака (chuyển ё về e, bỏ trọng âm để tìm kiếm)
    transcription TEXT,                  -- Phiên âm
    pos TEXT NOT NULL,                   -- Noun, Verb, Adj, Adverb, Preposition...
    gender TEXT,                         -- 'm' (đực), 'f' (cái), 'n' (trung), 'pl' (số nhiều), 'm/f'
    aspect TEXT,                         -- 'perfective' (CB) / 'imperfective' (NCB)
    meaning_vi TEXT NOT NULL,
    topic_id UUID REFERENCES vocab_jars(id) ON DELETE CASCADE, -- Ánh xạ trực tiếp đến chủ đề (vocab_jars)
    topic_code TEXT,                     -- Mã chủ đề (vd: do_an_uong, nghe_nghiep...)
    sub_topic TEXT,                      -- Nhóm nhỏ trong chủ đề (vd: Món chính và món phụ, Rau củ quả...)
    examples JSONB DEFAULT '[]'::jsonb,  -- Danh sách câu ví dụ [{ru, vi}]
    example_ru TEXT,                     -- Câu ví dụ tiếng Nga mẫu
    example_vi TEXT,                     -- Câu ví dụ dịch tiếng Việt
    collocations JSONB DEFAULT '{}'::jsonb, -- Động từ thao tác, công dụng, ngữ cảnh collocations
    level TEXT DEFAULT 'A1',             -- Cấp độ CEFR (A1, A2, B1, B2)
    cases_table JSONB,                   -- Bảng chia 6 cách
    conjugation_data JSONB,              -- Chia động từ các thì
    structures JSONB,                    -- vd: ["перекусить чем? (ăn nhẹ cái gì)"]
    synonyms TEXT[],                     -- Từ đồng nghĩa
    antonyms TEXT[],                     -- Từ trái nghĩa
    family_words TEXT[],                 -- Họ từ
    audio_url TEXT,                      -- Link audio Cloudflare R2 / CDN
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vocab_normalized ON vocabularies USING gin (word_normalized gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_vocab_topic_id ON vocabularies(topic_id);
CREATE INDEX IF NOT EXISTS idx_vocab_topic_code ON vocabularies(topic_code);

-- 3. LỌ TỪ VỰNG CÁ NHÂN & CHỦ ĐỀ HỆ THỐNG (VOCAB JARS)
CREATE TABLE IF NOT EXISTS vocab_jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    jar_name TEXT NOT NULL,              -- Tên lọ / chủ đề: vd "Đồ ăn - Đồ uống", "Mua sắm ở Auchan"
    code TEXT,                           -- Mã chủ đề định danh: vd "do_an_uong", "nghe_nghiep"
    level TEXT DEFAULT 'A1',             -- Khung CEFR A1 - B2
    icon TEXT DEFAULT '🫙',              -- Icon đại diện (emoji)
    description TEXT,                    -- Mô tả nội dung chủ đề
    color_code TEXT DEFAULT '#0039A6',
    is_system BOOLEAN DEFAULT FALSE,     -- Lọ hệ thống chuẩn hóa hay do học viên tự tạo
    sub_topics JSONB DEFAULT '[]'::jsonb, -- Danh sách các nhóm chủ đề nhỏ
    word_count INT DEFAULT 0,            -- Tổng số lượng từ vựng trong chủ đề
    words JSONB DEFAULT '[]'::jsonb,     -- Danh sách tóm tắt từ trong lọ [{vocab_id, ru, vi, note, ex, stress}]
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_vocab_jars_code ON vocab_jars(code) WHERE code IS NOT NULL;

CREATE TABLE IF NOT EXISTS jar_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jar_id UUID REFERENCES vocab_jars(id) ON DELETE CASCADE,
    vocab_id UUID REFERENCES vocabularies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    box_level INT DEFAULT 1,             -- Hộp lặp lại ngắt quãng SM-2 (1 -> 5)
    interval_days INT DEFAULT 1,
    ease_factor NUMERIC(3,2) DEFAULT 2.5,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jar_items_review ON jar_items (user_id, next_review_at);

-- 4. BỘ ĐỀ THI THỬ TRKI & CÂU HỎI (TRKI SIMULATION)
CREATE TABLE IF NOT EXISTS trki_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,                           -- vd: 'trki_a1', 'trki_a2'
    level TEXT NOT NULL,                 -- 'A1', 'A2', 'B1', 'B2'
    level_name TEXT,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'full',
    sub_test_type TEXT NOT NULL,         -- 'grammar_vocab', 'reading', 'listening', 'writing', 'speaking', 'full'
    duration_minutes INT NOT NULL,
    passing_score INT DEFAULT 66,
    is_published BOOLEAN DEFAULT TRUE,   -- Quản trị CMS: Bản nháp hoặc đã phát hành
    is_pro_only BOOLEAN DEFAULT FALSE,   -- Khóa nội dung (Content Paywall)
    icon TEXT DEFAULT '🏛️',
    raw_data JSONB,                      -- Cấu trúc 3 Part của đề thi
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trki_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES trki_tests(id) ON DELETE CASCADE,
    part_number INT NOT NULL,            -- Part 1..4
    question_order INT NOT NULL,
    prompt_text TEXT,
    image_url TEXT,
    audio_url TEXT,
    options JSONB,                       -- vd: ["A. дом", "B. дома", "C. дому", "D. доме"]
    correct_option TEXT NOT NULL,        -- BẢO MẬT: Chỉ server/admin đọc khi chấm điểm
    explanation_text TEXT,               -- BẢO MẬT: Trả về sau khi nộp bài
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trki_test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    test_id UUID REFERENCES trki_tests(id) ON DELETE CASCADE,
    user_answers JSONB NOT NULL,         -- { "q_id": "A", "q_id_2": "C" }
    score_percentage NUMERIC(5,2),
    passed BOOLEAN,
    tab_switch_count INT DEFAULT 0,      -- Theo dõi hành vi gian lận chuyển tab
    time_spent_seconds INT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LUYỆN NGHE & LUYỆN NÓI (AUDIO/VIDEO DICTATION & SHADOWING)
CREATE TABLE IF NOT EXISTS listening_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,                           -- vd: 'lis-airport'
    level TEXT DEFAULT 'A1',             -- 'A1', 'A2', 'B1', 'B2'
    level_name TEXT,
    category TEXT,
    category_name TEXT,
    part_number INT DEFAULT 1,
    part_type TEXT NOT NULL,             -- 'part_1_single', 'part_2_dialogue', 'part_3_passage', 'part_4_specialized'
    title TEXT NOT NULL,
    vi TEXT,
    video_youtube_id TEXT,
    audio_url TEXT,
    est_minutes INT DEFAULT 10,
    duration_seconds INT,
    transcript_ru TEXT,
    translation_vi TEXT,
    icon TEXT DEFAULT '🎧',
    raw_data JSONB,                      -- Lưu lines hội thoại, blanks, dictation và questions trắc nghiệm
    is_pro_only BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS speaking_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,                           -- vd: 'sp-basic'
    level TEXT DEFAULT 'A1',
    level_name TEXT,
    category TEXT,
    category_name TEXT,
    title TEXT NOT NULL,
    icon TEXT DEFAULT '🗣️',
    video_sample_url TEXT,
    sentence_ru TEXT,
    phoneme_target TEXT,
    raw_data JSONB,                      -- Danh sách các mẫu câu items
    is_pro_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS speaking_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES speaking_lessons(id) ON DELETE CASCADE,
    recorded_audio_url TEXT,
    pronunciation_score NUMERIC(4,1),
    fluency_score NUMERIC(4,1),
    mistake_words JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LUYỆN VIẾT TẢ TRANH (WRITING & HUMAN/AI EVALUATION)
CREATE TABLE IF NOT EXISTS writing_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,                           -- vd: 'w1'
    level TEXT NOT NULL,                 -- 'A1', 'A2', 'B1', 'B2'
    level_name TEXT,
    category TEXT,
    category_name TEXT,
    title TEXT NOT NULL,
    prompt TEXT,
    vi TEXT,
    min_words INT DEFAULT 20,
    est_minutes INT DEFAULT 15,
    icon TEXT DEFAULT '📝',
    image_url TEXT,
    suggested_words TEXT[],
    tips TEXT[],
    model_answer TEXT,
    raw_data JSONB,
    is_pro_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES writing_topics(id) ON DELETE CASCADE,
    user_essay TEXT NOT NULL,
    score_grammar INT,
    score_vocab INT,
    score_structure INT,
    score_task_completion INT,
    ai_feedback_json JSONB,
    teacher_feedback TEXT,
    graded_by UUID REFERENCES profiles(id),
    status TEXT DEFAULT 'ai_graded',     -- 'pending', 'ai_graded', 'teacher_reviewed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BLOG & E-COMMERCE SHOP NGA
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT,
    cover_image TEXT,
    excerpt TEXT,
    content_markdown TEXT,
    date TEXT,
    icon TEXT DEFAULT '📰',
    author TEXT DEFAULT 'RUSI Editorial',
    read_time TEXT DEFAULT '5 phút đọc',
    published BOOLEAN DEFAULT TRUE,
    author_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shop_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    category TEXT NOT NULL,
    category_name TEXT,
    badge TEXT,
    image TEXT,
    image_urls TEXT[],
    stock INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GÓI DỊCH VỤ, ĐƠN HÀNG & THANH TOÁN (ORDERS & VIETQR)
CREATE TABLE IF NOT EXISTS packages (
    id VARCHAR(50) PRIMARY KEY,          -- 'PRO_6M', 'PRO_1Y', 'PRO_VIP'
    title TEXT NOT NULL,
    badge TEXT,
    description TEXT,
    price NUMERIC NOT NULL,
    price_old NUMERIC,
    popular BOOLEAN DEFAULT FALSE,
    duration_days INT,
    feature_list JSONB DEFAULT '[]'::jsonb,
    features JSONB NOT NULL
);

-- 8b. BÀI HỌC NGỮ PHÁP (GRAMMAR LESSONS)
CREATE TABLE IF NOT EXISTS grammar_lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    vi TEXT,
    topic TEXT,
    rules JSONB DEFAULT '[]'::jsonb,
    table_data JSONB,
    questions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,          -- vd: 'RUSI_ORD1092' (Cú pháp CK VietQR)
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id VARCHAR(50) REFERENCES packages(id),
    amount NUMERIC NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'VIETQR',
    status VARCHAR(20) DEFAULT 'PENDING',-- 'PENDING', 'PAID', 'CANCELLED'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- 9. AUDIT LOGS & SYSTEM MONITORING
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    target_table TEXT NOT NULL,
    target_record_id TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CHÍNH SÁCH BẢO MẬT DỮ LIỆU TẦNG CƠ SỞ (ROW LEVEL SECURITY - RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabularies ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocab_jars ENABLE ROW LEVEL SECURITY;
ALTER TABLE jar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Hàm kiểm tra quyền Admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role IN ('academic_admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies: Profiles
CREATE POLICY "Public profiles can be read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: Public Read cho tài liệu học tập
CREATE POLICY "Public read vocabularies" ON vocabularies FOR SELECT USING (true);
CREATE POLICY "Public read vocab_jars" ON vocab_jars FOR SELECT USING (true);
CREATE POLICY "Public read TRKI tests" ON trki_tests FOR SELECT USING (true);
CREATE POLICY "Public read TRKI questions" ON trki_questions FOR SELECT USING (true);
CREATE POLICY "Public read listening lessons" ON listening_lessons FOR SELECT USING (true);
CREATE POLICY "Public read speaking lessons" ON speaking_lessons FOR SELECT USING (true);
CREATE POLICY "Public read writing topics" ON writing_topics FOR SELECT USING (true);
CREATE POLICY "Public read blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read shop products" ON shop_products FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);

-- RLS Policies: Dữ liệu cá nhân học viên
CREATE POLICY "Users manage own vocab jars" ON vocab_jars FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own jar items" ON jar_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own test results" ON trki_test_results FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own speaking submissions" ON speaking_submissions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own writing submissions" ON writing_submissions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies: Quyền Admin toàn quyền quản lý dữ liệu
CREATE POLICY "Admins full manage vocabularies" ON vocabularies FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage TRKI tests" ON trki_tests FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage TRKI questions" ON trki_questions FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage listening lessons" ON listening_lessons FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage speaking lessons" ON speaking_lessons FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage writing topics" ON writing_topics FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage blog posts" ON blog_posts FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage shop products" ON shop_products FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins full manage orders" ON orders FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Super Admins view audit logs" ON admin_audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
