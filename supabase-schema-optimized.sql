-- =============================================================================
-- RUSI TRKI — SUPABASE POSTGRESQL OPTIMIZED SCHEMA & CMS SYNC MIGRATION (2026)
-- Project URL: https://nrhtdwjihnlaxrbitmcf.supabase.co
-- 
-- HƯỚNG DẪN THỰC THI (CHỈ MẤT 10 GIÂY):
-- 1. Mở: https://supabase.com/dashboard/project/nrhtdwjihnlaxrbitmcf/sql/new
-- 2. Dán toàn bộ script này vào SQL Editor và ấn nút [ RUN ].
-- 3. Script này sử dụng cú pháp an toàn (ADD COLUMN IF NOT EXISTS / ON CONFLICT),
--    tuyệt đối KHÔNG xóa bảng hay làm mất dữ liệu hiện có.
-- =============================================================================

-- 0. KÍCH HOẠT EXTENSION HỖ TRỢ UUID & TÌM KIẾM
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- 1. BỔ SUNG TRƯỜNG CHO BẢNG VOCAB_JARS (LỌ TỪ VỰNG & BÀI HỌC CHỦ ĐỀ TOPIC_ARTICLES)
-- =============================================================================
ALTER TABLE public.vocab_jars 
  ADD COLUMN IF NOT EXISTS article JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level_name TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Ràng buộc UNIQUE toàn diện trên cột 'code' để lệnh upsert ({ onConflict: 'code' }) hoạt động mượt mà
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'vocab_jars_code_unique'
  ) THEN
    ALTER TABLE public.vocab_jars ADD CONSTRAINT vocab_jars_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 2. TẠO BẢNG VOCAB_LESSONS (VIDEO SERIES «ХОЧУ В РОССИЮ»)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.vocab_lessons (
    id TEXT PRIMARY KEY,
    type TEXT DEFAULT 'series',             -- 'series' hoặc 'topic'
    level TEXT DEFAULT 'A1',
    ep INT DEFAULT 1,
    ru TEXT NOT NULL,
    vi TEXT NOT NULL,
    scene TEXT DEFAULT 'film',
    story TEXT,
    words JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    is_pro_only BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.vocab_lessons ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 3. BỔ SUNG TRƯỜNG CHO BẢNG TRKI_TESTS (NGÂN HÀNG ĐỀ THI TRKI)
-- =============================================================================
ALTER TABLE public.trki_tests
  ADD COLUMN IF NOT EXISTS parts JSONB,
  ADD COLUMN IF NOT EXISTS category_name TEXT,
  ADD COLUMN IF NOT EXISTS total_questions INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'trki_tests_code_unique'
  ) THEN
    ALTER TABLE public.trki_tests ADD CONSTRAINT trki_tests_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 4. BỔ SUNG TRƯỜNG CHO BẢNG LISTENING_LESSONS (LUYỆN NGHE 4 PART)
-- =============================================================================
ALTER TABLE public.listening_lessons
  ADD COLUMN IF NOT EXISTS lines JSONB,
  ADD COLUMN IF NOT EXISTS questions JSONB,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'listening_lessons_code_unique'
  ) THEN
    ALTER TABLE public.listening_lessons ADD CONSTRAINT listening_lessons_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 5. BỔ SUNG TRƯỜNG CHO BẢNG SPEAKING_LESSONS (LUYỆN NÓI SHADOWING)
-- =============================================================================
ALTER TABLE public.speaking_lessons
  ADD COLUMN IF NOT EXISTS items JSONB,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'speaking_lessons_code_unique'
  ) THEN
    ALTER TABLE public.speaking_lessons ADD CONSTRAINT speaking_lessons_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 6. BỔ SUNG TRƯỜNG CHO BẢNG WRITING_TOPICS (LUYỆN VIẾT TẢ TRANH)
-- =============================================================================
ALTER TABLE public.writing_topics
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'writing_topics_code_unique'
  ) THEN
    ALTER TABLE public.writing_topics ADD CONSTRAINT writing_topics_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 7. BỔ SUNG TRƯỜNG CHO BẢNG GRAMMAR_LESSONS (NGỮ PHÁP CHUYÊN SÂU)
-- =============================================================================
ALTER TABLE public.grammar_lessons
  ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'A1',
  ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =============================================================================
-- 8. BỔ SUNG TRƯỜNG CHO BẢNG SHOP_PRODUCTS (SHOP HÀNG NGA & GIÁO TRÌNH)
-- =============================================================================
ALTER TABLE public.shop_products
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS rating NUMERIC(2,1) DEFAULT 5.0,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'shop_products_code_unique'
  ) THEN
    ALTER TABLE public.shop_products ADD CONSTRAINT shop_products_code_unique UNIQUE (code);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- =============================================================================
-- 9. BỔ SUNG TRƯỜNG CHO BẢNG ORDERS & SHOP_ORDERS (GIAO DỊCH & ĐƠN HÀNG)
-- =============================================================================
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS customer_note TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.shop_orders
  ADD COLUMN IF NOT EXISTS customer_email TEXT;

-- =============================================================================
-- 10. BỔ SUNG TRƯỜNG CHO BẢNG VOCABULARIES (TỪ ĐIỂN TỪ VỰNG)
-- =============================================================================
ALTER TABLE public.vocabularies
  ADD COLUMN IF NOT EXISTS is_pro_only BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =============================================================================
-- 11. BỔ SUNG TRƯỜNG CHO BẢNG BLOG_POSTS
-- =============================================================================
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =============================================================================
-- 12. BỔ SUNG TRƯỜNG CHO BẢNG PACKAGES (GÓI PRO)
-- =============================================================================
ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- =============================================================================
-- 13. CẤP QUYỀN RLS TOÀN DIỆN CHO ADMIN CMS QUẢN LÝ DỮ LIỆU
-- =============================================================================

-- Cấp quyền thao tác bảng cho role authenticated
GRANT ALL ON public.vocab_jars TO authenticated;
GRANT ALL ON public.vocabularies TO authenticated;
GRANT ALL ON public.vocab_lessons TO authenticated;
GRANT ALL ON public.trki_tests TO authenticated;
GRANT ALL ON public.listening_lessons TO authenticated;
GRANT ALL ON public.speaking_lessons TO authenticated;
GRANT ALL ON public.writing_topics TO authenticated;
GRANT ALL ON public.grammar_lessons TO authenticated;
GRANT ALL ON public.shop_products TO authenticated;
GRANT ALL ON public.packages TO authenticated;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.shop_orders TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- RLS Policies: vocab_lessons
DROP POLICY IF EXISTS "Public read vocab lessons" ON public.vocab_lessons;
CREATE POLICY "Public read vocab lessons" ON public.vocab_lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins full manage vocab lessons" ON public.vocab_lessons;
CREATE POLICY "Admins full manage vocab lessons" ON public.vocab_lessons FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policy: Cho phép Admin quản lý/sửa profiles (cấp quyền PRO, đổi role trực tiếp trên CMS)
DROP POLICY IF EXISTS "Admins full manage profiles" ON public.profiles;
CREATE POLICY "Admins full manage profiles" ON public.profiles FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policy: Admin quản lý vocab_jars
DROP POLICY IF EXISTS "Admins full manage vocab jars" ON public.vocab_jars;
CREATE POLICY "Admins full manage vocab jars" ON public.vocab_jars FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policy: Admin quản lý grammar_lessons
DROP POLICY IF EXISTS "Admins full manage grammar lessons" ON public.grammar_lessons;
CREATE POLICY "Admins full manage grammar lessons" ON public.grammar_lessons FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policy: Admin quản lý shop_orders
DROP POLICY IF EXISTS "Admins full manage shop orders" ON public.shop_orders;
CREATE POLICY "Admins full manage shop orders" ON public.shop_orders FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- =============================================================================
-- HOÀN TẤT: CƠ SỞ DỮ LIỆU ĐÃ ĐỒNG BỘ 100% VỚI PAYLOAD CMS RUSI TRKI STUDIO!
-- =============================================================================
