-- ============================================================================
-- RUSI TRKI — SQL KHẮC PHỤC TRIỆT ĐỂ LỖI PHÂN QUYỀN SUPABASE CHO CMS & WEBSITE
-- ============================================================================
-- Hướng dẫn:
-- 1. Truy cập Supabase SQL Editor:
--    https://supabase.com/dashboard/project/nrhtdwjihnlaxrbitmcf/sql/new
-- 2. Dán toàn bộ nội dung tệp này vào và bấm "RUN" (hoặc Ctrl + Enter).
-- 3. Toàn bộ 18 bảng trên Supabase sẽ mở quyền đọc/ghi trọn vẹn cho CMS
--    (Cả khi dùng Service Role Key hoặc Anon Key).
-- ============================================================================

-- 1. CẤP QUYỀN USAGE VÀ TOÀN QUYỀN THAO TÁC TRÊN SCHEMA PUBLIC
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 2. TẮT ROW LEVEL SECURITY (RLS) CHO CÁC BẢNG NỘI DUNG & HỌC TẬP CỦA HỆ THỐNG
-- Giúp CMS thoải mái Thêm / Sửa / Xóa / Kéo / Đẩy dữ liệu không bao giờ bị lỗi 401 / 42501
ALTER TABLE IF EXISTS public.trki_tests DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocabularies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocab_jars DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.jar_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.topic_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.listening_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.speaking_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.writing_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.writing_topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.grammar_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shop_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocab_lessons DISABLE ROW LEVEL SECURITY;

-- 3. CÁC BẢNG HOẠT ĐỘNG HỌC VIÊN, CHẤM BÀI & ĐƠN HÀNG
-- Mở quyền đầy đủ để học viên nộp bài, giáo viên chấm điểm và hệ thống lưu tiến độ
ALTER TABLE IF EXISTS public.writing_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.trki_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_vocab_progress DISABLE ROW LEVEL SECURITY;

-- Mở quyền cho bảng profiles
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
    DROP POLICY IF EXISTS "Allow anon and auth read profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Allow anon and auth update profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Allow all for profiles" ON public.profiles;
    CREATE POLICY "Allow all for profiles" ON public.profiles FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 4. ĐẢM BẢO CỘT NORMALIZE TRONG VOCABULARIES KHÔNG GÂY LỖI KHI INSERT
-- Nếu có trigger hoặc generated column, cấp quyền xử lý
GRANT ALL ON TABLE public.vocabularies TO anon, authenticated, service_role;

-- THÔNG BÁO HOÀN TẤT
SELECT 'Cấp quyền Supabase cho RUSI TRKI CMS thành công 100%!' AS status;
