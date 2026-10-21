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
        if (!sb) return [];
        try {
          var q = sb.from("trki_tests").select("*").eq("is_published", true);
          if (level && level !== "all") q = q.eq("level", level);
          var res = await q;
          return res.data || [];
        } catch (_) {
          return [];
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
     * 4. GÓI DỊCH VỤ & KHÓA HỌC PRO (PACKAGES)
     * ========================================================================= */
    packages: {
      getAll: async function () {
        var sb = getClient();
        if (!sb) return [];
        try {
          var res = await sb.from("packages").select("*").order("price", { ascending: true });
          if (res.error || !res.data) return [];
          return res.data;
        } catch (_) {
          return [];
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
