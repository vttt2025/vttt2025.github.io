/**
 * supabase-client.js — Thư viện kết nối & đồng bộ dữ liệu Supabase cho RUSI TRKI.
 *
 * Yêu cầu:
 *   - supabase-config.js (window.SUPABASE_CONFIG)
 *   - @supabase/supabase-js (tải qua CDN https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2)
 *
 * Cung cấp:
 *   - window.RusiSupabase.isReady()
 *   - window.RusiSupabase.getClient()
 *   - window.RusiSupabase.testConnection()
 *   - window.RusiSupabase.profile: { get, upsert, updateGamification }
 *   - window.RusiSupabase.jars: { getAll, save, delete, syncAll }
 *   - window.RusiSupabase.tests: { getPublished, saveResult, getHistory }
 *   - window.RusiSupabase.auth: { signInGoogle, signInEmail, signUpEmail, signOut, getSession }
 */

(function () {
  "use strict";

  var client = null;

  function getClient() {
    if (client) return client;
    if (typeof window.supabase === "undefined" || !window.supabase.createClient) {
      return null;
    }
    if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
      return null;
    }
    try {
      client = window.supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );
      window.supabaseClient = client;
      return client;
    } catch (err) {
      console.warn("[RusiSupabase] Lỗi khởi tạo Supabase Client:", err);
      return null;
    }
  }

  var RusiSupabase = {
    /** Kiểm tra xem Client đã sẵn sàng hoạt động chưa */
    isReady: function () {
      return Boolean(getClient());
    },

    /** Lấy đối tượng Supabase JS gốc */
    getClient: getClient,

    /** Đặt lại client khi thay đổi key hoặc cấu hình */
    resetClient: function () {
      client = null;
      return getClient();
    },

    /**
     * Kiểm tra trạng thái kết nối tới Database Supabase
     * Trả về: { ok: boolean, latency: number, message: string, details?: any }
     */
    testConnection: async function () {
      var startTime = Date.now();
      var cfg = window.SUPABASE_CONFIG;

      if (!cfg || !cfg.url) {
        return { ok: false, message: "Chưa cấu hình URL Supabase trong supabase-config.js" };
      }

      if (!window.isSupabaseConfigured()) {
        return {
          ok: false,
          needsKey: true,
          message: "Chưa có Anon Key hợp lệ. Vui lòng lấy từ Supabase Dashboard > Settings > API."
        };
      }

      var sb = getClient();
      if (!sb) {
        return { ok: false, message: "Không thể nạp thư viện Supabase JS Client (@supabase/supabase-js)" };
      }

      try {
        // Thử truy vấn kiểm tra bảng profiles hoặc bảng hệ thống
        var res = await sb.from("profiles").select("id", { count: "exact", head: true });
        var elapsed = Date.now() - startTime;

        if (res.error) {
          // Nếu bảng chưa được tạo (lỗi 42P01: relation does not exist), báo cụ thể để chạy schema.sql
          if (res.error.code === "42P01" || (res.error.message && res.error.message.includes("does not exist"))) {
            return {
              ok: true,
              tablesMissing: true,
              latency: elapsed,
              message: "Kết nối Supabase thành công! (Lưu ý: Bảng 'profiles' chưa tạo, hãy chạy supabase-schema.sql trong SQL Editor)."
            };
          }
          return {
            ok: false,
            latency: elapsed,
            message: "Lỗi kết nối từ Supabase: " + (res.error.message || res.error.details || JSON.stringify(res.error))
          };
        }

        return {
          ok: true,
          latency: elapsed,
          message: "Kết nối thành công tới " + cfg.url + " (" + elapsed + "ms) ⚡"
        };
      } catch (e) {
        return {
          ok: false,
          latency: Date.now() - startTime,
          message: "Ngoại lệ khi kết nối: " + (e.message || String(e))
        };
      }
    },

    /* =========================================================================
     * 1. PROFILES & GAMIFICATION (XP, STREAK, PRO)
     * ========================================================================= */
    profile: {
      get: async function (userId) {
        var sb = getClient();
        if (!sb || !userId) return null;
        try {
          var res = await sb.from("profiles").select("*").eq("id", userId).single();
          if (res.error) return null;
          return res.data;
        } catch (_) {
          return null;
        }
      },

      upsert: async function (profileData) {
        var sb = getClient();
        if (!sb || !profileData || !profileData.id) return false;
        try {
          profileData.updated_at = new Date().toISOString();
          var res = await sb.from("profiles").upsert(profileData);
          return !res.error;
        } catch (_) {
          return false;
        }
      },

      syncGamification: async function (userId, streak, xp, mascotLevel) {
        var sb = getClient();
        if (!sb || !userId) return false;
        try {
          var payload = {
            id: userId,
            streak_count: streak || 0,
            xp_points: xp || 0,
            last_study_date: new Date().toISOString().split("T")[0],
            updated_at: new Date().toISOString()
          };
          if (mascotLevel) payload.mascot_level = mascotLevel;
          var res = await sb.from("profiles").upsert(payload);
          return !res.error;
        } catch (_) {
          return false;
        }
      }
    },

    /* =========================================================================
     * 2. LỌ TỪ VỰNG CÁ NHÂN & SPACED REPETITION (VOCAB JARS)
     * ========================================================================= */
    jars: {
      getSystemJars: async function () {
        var sb = getClient();
        if (!sb) return [];
        try {
          var res = await sb.from("vocab_jars").select("*").eq("is_system", true).order("created_at", { ascending: true });
          if (res.error || !res.data) return [];
          return (res.data || []).map(function (row) {
            return {
              id: row.id,
              name: row.jar_name,
              level: row.level || "A1",
              levelName: row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1",
              desc: row.description || "",
              icon: row.icon || "🏺",
              is_system: true,
              words: Array.isArray(row.words) ? row.words : []
            };
          });
        } catch (_) {
          return [];
        }
      },

      getAll: async function (userId) {
        var sb = getClient();
        if (!sb || !userId) return [];
        try {
          var res = await sb.from("vocab_jars").select("*").eq("user_id", userId).order("created_at", { ascending: false });
          if (res.error) return [];
          return res.data || [];
        } catch (_) {
          return [];
        }
      },

      save: async function (userId, jar) {
        var sb = getClient();
        if (!sb || !userId || !jar) return false;
        try {
          var row = {
            id: jar.id || undefined,
            user_id: userId,
            jar_name: jar.name || jar.title || "Lọ từ vựng",
            color_code: jar.color || "#0039A6",
            is_system: Boolean(jar.is_system),
            words: jar.words || []
          };
          var res = await sb.from("vocab_jars").upsert(row);
          return !res.error;
        } catch (_) {
          return false;
        }
      },

      delete: async function (userId, jarId) {
        var sb = getClient();
        if (!sb || !userId || !jarId) return false;
        try {
          var res = await sb.from("vocab_jars").delete().eq("id", jarId).eq("user_id", userId);
          return !res.error;
        } catch (_) {
          return false;
        }
      },

      syncLocalJarsToCloud: async function (userId, localJars) {
        var sb = getClient();
        if (!sb || !userId || !Array.isArray(localJars)) return false;
        try {
          for (var i = 0; i < localJars.length; i++) {
            await RusiSupabase.jars.save(userId, localJars[i]);
          }
          return true;
        } catch (_) {
          return false;
        }
      }
    },

    /* =========================================================================
     * 3. ĐỀ THI TRKI & LỊCH SỬ THI
     * ========================================================================= */
    tests: {
      getPublished: async function (level) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("trki_tests").select("*").eq("is_published", true);
          if (level && level !== "all") q = q.eq("level", level);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            var raw = row.raw_data || {};
            return {
              id: row.code || row.id,
              level: row.level,
              levelName: row.level_name || ("TRKI " + row.level),
              category: row.category || row.sub_test_type || "full",
              title: row.title,
              durationMin: row.duration_minutes || 45,
              passPercent: row.passing_score || 60,
              is_pro_only: Boolean(row.is_pro_only),
              icon: row.icon || "🏛️",
              parts: raw.parts || []
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy đề thi TRKI:", e);
          return null;
        }
      },

      saveResult: async function (userId, testId, resultData) {
        var sb = getClient();
        if (!sb || !userId) return false;
        try {
          var payload = {
            user_id: userId,
            test_id: testId,
            user_answers: resultData.answers || {},
            score_percentage: resultData.score || 0,
            passed: Boolean(resultData.passed),
            tab_switch_count: resultData.tabSwitches || 0,
            time_spent_seconds: resultData.timeSpent || 0,
            submitted_at: new Date().toISOString()
          };
          var res = await sb.from("trki_test_results").insert(payload);
          return !res.error;
        } catch (_) {
          return false;
        }
      }
    },

    /* =========================================================================
     * 4. BÀI LUYỆN NGHE (LISTENING LESSONS)
     * ========================================================================= */
    listening: {
      getAll: async function (level) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("listening_lessons").select("*").order("part_number", { ascending: true });
          if (level && level !== "all") q = q.eq("level", level);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            var raw = row.raw_data || {};
            return {
              id: row.code || row.id,
              title: row.title,
              vi: row.vi || row.translation_vi || "",
              level: row.level || "A1",
              levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
              category: row.category || "airport",
              categoryName: row.category_name || "Bài nghe",
              estMinutes: row.est_minutes || 10,
              icon: row.icon || "🎧",
              partNumber: row.part_number || 1,
              is_pro_only: Boolean(row.is_pro_only),
              lines: raw.lines || [],
              blanks: raw.blanks || [],
              dictation: raw.dictation || [],
              questions: raw.questions || []
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy bài nghe:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 5. BÀI LUYỆN NÓI & PHÁT ÂM (SPEAKING LESSONS)
     * ========================================================================= */
    speaking: {
      getAll: async function (level) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("speaking_lessons").select("*");
          if (level && level !== "all") q = q.eq("level", level);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            var raw = row.raw_data || {};
            return {
              id: row.code || row.id,
              title: row.title,
              level: row.level || "A1",
              levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
              category: row.category || "greeting",
              categoryName: row.category_name || "Chào hỏi",
              phonemeTarget: row.phoneme_target || "",
              icon: row.icon || "🗣️",
              is_pro_only: Boolean(row.is_pro_only),
              items: raw.items || (row.sentence_ru ? [{ ru: row.sentence_ru, vi: "" }] : [])
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy bài nói:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 6. ĐỀ LUYỆN VIẾT & TẢ TRANH (WRITING TOPICS)
     * ========================================================================= */
    writing: {
      getAll: async function (level) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("writing_topics").select("*");
          if (level && level !== "all") q = q.eq("level", level);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            var raw = row.raw_data || {};
            return {
              id: row.code || row.id,
              level: row.level || "A1",
              levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
              category: row.category || "intro",
              categoryName: row.category_name || "Tự giới thiệu",
              icon: row.icon || "📝",
              estMinutes: row.est_minutes || 15,
              title: row.title,
              prompt: row.prompt || "",
              vi: row.vi || "",
              minWords: row.min_words || 20,
              suggested_words: raw.suggested_words || row.suggested_words || [],
              tips: raw.tips || row.tips || [],
              model: raw.model || row.model_answer || "",
              is_pro_only: Boolean(row.is_pro_only)
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy đề viết:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 7. BÀI VIẾT BLOG & CẨM NANG (BLOG POSTS)
     * ========================================================================= */
    blog: {
      getAll: async function (category) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
          if (category && category !== "all") q = q.eq("category", category);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            return {
              slug: row.slug,
              title: row.title,
              category: row.category,
              categoryName: row.category_name || row.category,
              cover: row.cover_image || "assets/red-square.jpg",
              excerpt: row.excerpt || "",
              content: row.content_markdown || row.excerpt || "",
              date: row.date || new Date(row.created_at).toLocaleDateString("vi-VN"),
              icon: row.icon || "📰",
              author: row.author || "RUSI Editorial",
              readTime: row.read_time || "5 phút đọc"
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy bài blog:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 8. SẢN PHẨM CỬA HÀNG (SHOP PRODUCTS)
     * ========================================================================= */
    shop: {
      getAll: async function (category) {
        var sb = getClient();
        if (!sb) return null;
        try {
          var q = sb.from("shop_products").select("*").order("price", { ascending: true });
          if (category && category !== "all") q = q.eq("category", category);
          var res = await q;
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            return {
              id: row.code || row.id,
              category: row.category,
              categoryName: row.category_name || "",
              title: row.title,
              desc: row.description || "",
              price: Number(row.price),
              priceOld: row.original_price ? Number(row.original_price) : undefined,
              image: row.image || (row.image_urls && row.image_urls[0]) || "",
              badge: row.badge || ""
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy sản phẩm shop:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 9. BÀI HỌC NGỮ PHÁP (GRAMMAR LESSONS)
     * ========================================================================= */
    grammar: {
      getAll: async function () {
        var sb = getClient();
        if (!sb) return null;
        try {
          var res = await sb.from("grammar_lessons").select("*").order("id", { ascending: true });
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            return {
              id: row.id,
              title: row.title,
              vi: row.vi || "",
              topic: row.topic || "",
              rules: Array.isArray(row.rules) ? row.rules : [],
              table: row.table_data || {},
              questions: Array.isArray(row.questions) ? row.questions : []
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy bài ngữ pháp:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 10. GÓI DỊCH VỤ & KHÓA HỌC PRO (PACKAGES)
     * ========================================================================= */
    packages: {
      getAll: async function () {
        var sb = getClient();
        if (!sb) return null;
        try {
          var res = await sb.from("packages").select("*").order("price", { ascending: true });
          if (res.error || !res.data) return null;
          return res.data.map(function (row) {
            return {
              id: (row.id || "").toLowerCase(),
              badge: row.badge || "",
              title: row.title,
              desc: row.description || "",
              price: Number(row.price),
              priceOld: row.price_old ? Number(row.price_old) : undefined,
              popular: Boolean(row.popular),
              features: Array.isArray(row.feature_list) ? row.feature_list : (row.features && row.features.list) || []
            };
          });
        } catch (e) {
          console.warn("[RusiSupabase] Lỗi lấy gói cước:", e);
          return null;
        }
      }
    },

    /* =========================================================================
     * 5. SUPABASE AUTH BRIDGES
     * ========================================================================= */
    auth: {
      signInGoogle: async function (redirectTo) {
        var sb = getClient();
        if (!sb) throw new Error("Supabase client chưa khởi tạo.");
        return await sb.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: redirectTo || window.location.origin + window.location.pathname
          }
        });
      },

      signInEmail: async function (email, password) {
        var sb = getClient();
        if (!sb) throw new Error("Supabase client chưa khởi tạo.");
        return await sb.auth.signInWithPassword({ email: email, password: password });
      },

      signUpEmail: async function (email, password, fullName) {
        var sb = getClient();
        if (!sb) throw new Error("Supabase client chưa khởi tạo.");
        return await sb.auth.signUp({
          email: email,
          password: password,
          options: {
            data: { full_name: fullName || "" }
          }
        });
      },

      signOut: async function () {
        var sb = getClient();
        if (!sb) return;
        return await sb.auth.signOut();
      },

      getSession: async function () {
        var sb = getClient();
        if (!sb) return null;
        var res = await sb.auth.getSession();
        return (res.data && res.data.session) || null;
      }
    }
  };

  window.RusiSupabase = RusiSupabase;

  // Tự động kiểm tra kết nối nền khi tài liệu nạp xong
  document.addEventListener("DOMContentLoaded", function () {
    if (window.isSupabaseConfigured && window.isSupabaseConfigured()) {
      getClient();
    }
  });
})();
