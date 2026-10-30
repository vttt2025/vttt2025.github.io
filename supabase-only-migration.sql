-- RUSI TRKI — Supabase-only additive migration
-- Safe posture: no table or content deletion. Run after supabase-schema.sql.

-- Stable upsert keys used by the existing browser CMS.
CREATE UNIQUE INDEX IF NOT EXISTS idx_trki_tests_code_unique
  ON public.trki_tests(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_listening_lessons_code_unique
  ON public.listening_lessons(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_speaking_lessons_code_unique
  ON public.speaking_lessons(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_writing_topics_code_unique
  ON public.writing_topics(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_shop_products_code_unique
  ON public.shop_products(code) WHERE code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_vocab_jars_code_full_unique
  ON public.vocab_jars(code);

ALTER TABLE public.vocab_jars
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.listening_lessons
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.speaking_lessons
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.writing_topics
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Profiles are private. Admins may inspect profiles; learners only see themselves.
DROP POLICY IF EXISTS "Public profiles can be read" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "Admins can read profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Never let a browser update role/is_pro directly. Progress uses a narrow RPC.
REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;
GRANT SELECT ON public.profiles TO authenticated;

CREATE OR REPLACE FUNCTION public.sync_my_progress(
  p_streak integer,
  p_xp integer,
  p_mascot_level integer DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  UPDATE public.profiles
  SET streak_count = GREATEST(0, LEAST(COALESCE(p_streak, 0), 100000)),
      xp_points = GREATEST(xp_points, LEAST(COALESCE(p_xp, 0), 100000000)),
      mascot_level = GREATEST(1, LEAST(COALESCE(p_mascot_level, 1), 5)),
      last_study_date = current_date,
      updated_at = now()
  WHERE id = auth.uid();
END;
$$;

REVOKE ALL ON FUNCTION public.sync_my_progress(integer, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sync_my_progress(integer, integer, integer) TO authenticated;

-- Content administration policies required by admin.html.
DROP POLICY IF EXISTS "Admins full manage vocab jars" ON public.vocab_jars;
CREATE POLICY "Admins full manage vocab jars"
  ON public.vocab_jars FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins full manage packages" ON public.packages;
CREATE POLICY "Admins full manage packages"
  ON public.packages FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins full manage grammar lessons" ON public.grammar_lessons;
ALTER TABLE public.grammar_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read grammar lessons"
  ON public.grammar_lessons FOR SELECT USING (true);
CREATE POLICY "Admins full manage grammar lessons"
  ON public.grammar_lessons FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Learners create and read only their own pending orders. Only admins update status.
DROP POLICY IF EXISTS "Users create own orders" ON public.orders;
DROP POLICY IF EXISTS "Users view own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins full manage orders" ON public.orders;
CREATE POLICY "Users create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND lower(status) = 'pending'
  );
CREATE POLICY "Users view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Admins full manage orders"
  ON public.orders FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Physical-product checkout stays separate from PRO package orders.
CREATE TABLE IF NOT EXISTS public.shop_orders (
  id varchar(80) PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount >= 0),
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  customer_name text,
  customer_phone text,
  delivery_address text,
  status varchar(20) NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users create own shop orders" ON public.shop_orders;
DROP POLICY IF EXISTS "Users view own shop orders" ON public.shop_orders;
DROP POLICY IF EXISTS "Admins full manage shop orders" ON public.shop_orders;
CREATE POLICY "Users create own shop orders"
  ON public.shop_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id AND lower(status) = 'pending');
CREATE POLICY "Users view own shop orders"
  ON public.shop_orders FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Admins full manage shop orders"
  ON public.shop_orders FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Never expose answer columns directly to learners.
DROP POLICY IF EXISTS "Public read TRKI questions" ON public.trki_questions;
DROP POLICY IF EXISTS "Admins full manage TRKI questions" ON public.trki_questions;
CREATE POLICY "Admins full manage TRKI questions"
  ON public.trki_questions FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Approving a package order is the only database path that activates PRO.
CREATE OR REPLACE FUNCTION public.activate_pro_from_paid_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  package_days integer;
BEGIN
  IF lower(NEW.status) = 'paid'
     AND lower(COALESCE(OLD.status, '')) <> 'paid' THEN
    SELECT duration_days INTO package_days
    FROM public.packages
    WHERE id = NEW.package_id;

    UPDATE public.profiles
    SET is_pro = true,
        pro_expires_at = CASE
          WHEN package_days IS NULL OR package_days <= 0 THEN NULL
          ELSE GREATEST(COALESCE(pro_expires_at, now()), now())
               + make_interval(days => package_days)
        END,
        updated_at = now()
    WHERE id = NEW.user_id;

    NEW.paid_at = COALESCE(NEW.paid_at, now());
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS activate_pro_after_order_approval ON public.orders;
CREATE TRIGGER activate_pro_after_order_approval
  BEFORE UPDATE OF status ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.activate_pro_from_paid_order();

-- Admin helper: authenticated caller must already carry an admin role in profiles.
CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(auth.uid());
$$;

GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO authenticated;
