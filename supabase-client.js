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
 *   - window.RusiSupabase.orders: { createPending, checkStatus, getMine }
 */

(function () {
  "use strict";

  var client = null;

  // Kiểm tra định dạng UUID hợp lệ (ngăn ngừa lỗi 400 Bad Request từ PostgreSQL khi dùng Firebase Auth UID)
  function isValidUUID(str) {
    if (!str || typeof str !== "string") return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
  }

  // Wrapper timeout cho các query Supabase nhằm tránh treo vĩnh viễn khi mạng gián đoạn
  function withTimeout(promise, ms) {
    if (!promise || typeof promise.then !== "function") return promise;
    var timer = null;
    var timeout = new Promise(function (_, reject) {
      timer = setTimeout(function () {
        reject(new Error("Supabase query timeout after " + (ms || 3500) + "ms"));
      }, ms || 3500);
    });
    return Promise.race([
      Promise.resolve(promise).then(function (res) {
        if (timer) clearTimeout(timer);
        return res;
      }, function (err) {
        if (timer) clearTimeout(timer);
        throw err;
      }),
      timeout
    ]);
  }

  /* =========================================================================
   * BỘ NHỚ ĐỆM TRÌNH DUYỆT (BROWSER CACHE FOR 0ms INSTANT NAVIGATION)
   * Lưu tạm thời dữ liệu Supabase vào Memory + SessionStorage để tăng tốc chuyển trang tức thì
   * ========================================================================= */
  var DEFAULT_CACHE_TTL_MS = 15 * 60 * 1000; // 15 phút
  var _memoryCache = new Map();
  var CACHE_PREFIX = "rusi_sb_cache:";

  var RusiCache = {
    get: function (key) {
      if (!key) return null;
      var now = Date.now();
      // 1. Kiểm tra RAM Memory Cache trước (0ms)
      if (_memoryCache.has(key)) {
        var memEntry = _memoryCache.get(key);
        if (memEntry && memEntry.expiresAt > now) {
          return memEntry.data;
        }
        _memoryCache.delete(key);
      }
      // 2. Kiểm tra SessionStorage (giữ dữ liệu trong phiên duyệt web)
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          var raw = window.sessionStorage.getItem(CACHE_PREFIX + key);
          if (raw) {
            var item = JSON.parse(raw);
            if (item && item.expiresAt > now) {
              _memoryCache.set(key, item);
              return item.data;
            }
            window.sessionStorage.removeItem(CACHE_PREFIX + key);
          }
        }
      } catch (_) {}
      return null;
    },

    set: function (key, data, ttlMs) {
      if (!key || data === undefined || data === null) return;
      var ttl = typeof ttlMs === "number" ? ttlMs : DEFAULT_CACHE_TTL_MS;
      var entry = {
        data: data,
        expiresAt: Date.now() + ttl,
        cachedAt: Date.now()
      };
      _memoryCache.set(key, entry);
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
        }
      } catch (_) {}
    },

    clear: function () {
      _memoryCache.clear();
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          var toRemove = [];
          for (var i = 0; i < window.sessionStorage.length; i++) {
            var k = window.sessionStorage.key(i);
            if (k && k.indexOf(CACHE_PREFIX) === 0) {
              toRemove.push(k);
            }
          }
          toRemove.forEach(function (k) {
            window.sessionStorage.removeItem(k);
          });
        }
      } catch (_) {}
    },

    invalidate: function (prefix) {
      if (!prefix) return RusiCache.clear();
      _memoryCache.forEach(function (_, k) {
        if (k.indexOf(prefix) === 0) _memoryCache.delete(k);
      });
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          var toRemove = [];
          for (var i = 0; i < window.sessionStorage.length; i++) {
            var k = window.sessionStorage.key(i);
            if (k && k.indexOf(CACHE_PREFIX + prefix) === 0) {
              toRemove.push(k);
            }
          }
          toRemove.forEach(function (k) {
            window.sessionStorage.removeItem(k);
          });
        }
      } catch (_) {}
    },

    withCache: async function (key, fetcher, ttlMs) {
      var cached = RusiCache.get(key);
      if (cached !== null) {
        return cached;
      }
      try {
        var data = await fetcher();
        if (data !== null && data !== undefined && (!Array.isArray(data) || data.length > 0)) {
          RusiCache.set(key, data, ttlMs);
        }
        return data;
      } catch (err) {
        var fallback = _memoryCache.has(key) ? _memoryCache.get(key).data : null;
        if (fallback) return fallback;
        throw err;
      }
    }
  };

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
            detectSessionInUrl: true,
            // Authorization Code + PKCE: token không xuất hiện trong URL callback.
            flowType: "pkce"
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

  function sanitizeVocabRow(w) {
    if (!w) return w;
    if (typeof window !== "undefined" && typeof window.formatRussianGrammar === "function") {
      if (w.pos) w.pos = window.formatRussianGrammar(w.pos);
      if (w.gender) w.gender = window.formatRussianGrammar(null, null, w.gender);
    }
    if (w.example_ru) {
      w.example_ru = w.example_ru.replace(/\u00E9/g, "е\u0301").replace(/\u00E1/g, "а\u0301")
        .replace(/редаќции/g, "реда́кции").replace(/овощи́/g, "о́вощи")
        .replace(/создаёт оде́жды/g, "создаёт оде́жду")
        .replace(/рабо́той в фирме\./g, "рабо́той в фи́рме.");
    }
    if (w.example_vi) {
      w.example_vi = w.example_vi.replace(/trên buổi concert/g, "tại buổi hòa nhạc");
    }
    if (w.word_with_stress) {
      w.word_with_stress = w.word_with_stress.replace(/\bC(?=[а-яА-ЯёЁ\u0301])/g, "С")
        .replace(/\bO(?=[а-яА-ЯёЁ\u0301])/g, "О")
        .replace(/\bB(?=[а-яА-ЯёЁ\u0301])/g, "В")
        .replace(/собира́ть данны\b/g, "собира́ть да́нные")
        .replace(/анализи́ровать данны\b/g, "анализи́ровать да́нные");
    }
    if (w.word_normalized === "школьник") {
      w.example_ru = "Шко́льник у́чится в шко́ле.";
      w.example_vi = "Học sinh đang học ở trường học.";
      w.gender = "м./ж.";
    }
    if (w.word_normalized === "художник") {
      w.example_ru = "Худо́жник рису́ет карти́ны в мастерско́й.";
      w.example_vi = "Họa sĩ đang vẽ tranh ở xưởng vẽ.";
      w.gender = "м./ж.";
    }
    if (["студент", "преподаватель", "учитель", "спортсмен", "артист", "журналист", "переводчик", "писатель"].indexOf(w.word_normalized) !== -1) {
      w.gender = "м./ж.";
    }
    return w;
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
      RusiCache.clear();
      return getClient();
    },

    /** Truy cập trực tiếp vào hệ thống Browser Cache */
    cache: RusiCache,

    /** Xóa toàn bộ dữ liệu lưu tạm trong Cache trình duyệt */
    clearCache: function () {
      RusiCache.clear();
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
          message: "Kết nối thành công tới " + cfg.url + " (" + elapsed + "ms)"
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
        if (!sb || !userId || !isValidUUID(userId)) return null;
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
        if (!sb || !profileData || !profileData.id || !isValidUUID(profileData.id)) return false;
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
        if (!sb || !userId || !isValidUUID(userId)) return false;
        try {
          var res = await sb.rpc("sync_my_progress", {
            p_streak: Number(streak) || 0,
            p_xp: Number(xp) || 0,
            p_mascot_level: Number(mascotLevel) || 1
          });
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
        return RusiCache.withCache("jars:system", async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var res = await withTimeout(sb.from("vocab_jars").select("*").eq("is_system", true).order("created_at", { ascending: true }), 3500);
            if (res.error || !res.data) return [];
            return (res.data || []).map(function (row) {
              return {
                id: row.code || row.id,
                code: row.code || row.id,
                name: row.jar_name,
                title: row.jar_name,
                level: row.level || "A1",
                levelName: row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1",
                desc: row.description || "",
                icon: row.icon || "archive-jar",
                is_system: true,
                words: (Array.isArray(row.words) ? row.words : []).map(function (w) {
                  if (typeof window !== "undefined" && typeof window.formatRussianGrammar === "function") {
                    if (w.pos) w.pos = window.formatRussianGrammar(w.pos);
                    if (w.gender) w.gender = window.formatRussianGrammar(null, null, w.gender);
                  }
                  // Chuẩn hóa và làm sạch lỗi ký tự Latin / trọng âm / ví dụ lệch giống
                  if (w.ex) {
                    w.ex = w.ex.replace(/\u00E9/g, "е\u0301").replace(/\u00E1/g, "а\u0301")
                      .replace(/редаќции/g, "реда́кции").replace(/овощи́/g, "о́вощи")
                      .replace(/создаёт оде́жды/g, "создаёт оде́жду")
                      .replace(/рабо́той в фирме\./g, "рабо́той в фи́рме.");
                  }
                  if (w.ex_vi) {
                    w.ex_vi = w.ex_vi.replace(/trên buổi concert/g, "tại buổi hòa nhạc");
                  }
                  if (w.ru) {
                    w.ru = w.ru.replace(/\bC(?=[а-яА-ЯёЁ\u0301])/g, "С")
                      .replace(/\bO(?=[а-яА-ЯёЁ\u0301])/g, "О")
                      .replace(/\bB(?=[а-яА-ЯёЁ\u0301])/g, "В")
                      .replace(/собира́ть данны\b/g, "собира́ть да́нные")
                      .replace(/анализи́ровать данны\b/g, "анализи́ровать да́нные");
                    if (w.ru.includes("Шко́льник") && w.ex && w.ex.includes("Шко́льница")) {
                      w.ex = "Шко́льник у́чится в шко́ле.";
                      w.ex_vi = "Học sinh đang học ở trường học.";
                    }
                    if (w.ru.includes("Худо́жник") && w.ex && w.ex.includes("Худо́жница")) {
                      w.ex = "Худо́жник рису́ет карти́ны в мастерско́й.";
                      w.ex_vi = "Họa sĩ đang vẽ tranh ở xưởng vẽ.";
                    }
                  }
                  return w;
                }),
                article: (function (art) {
                  if (!art) return null;
                  try {
                    var str = JSON.stringify(art);
                    str = str.replace(/\u00E9/g, "е\u0301").replace(/\u00E1/g, "а\u0301")
                      .replace(/редаќции/g, "реда́кции").replace(/овощи́/g, "о́вощи")
                      .replace(/создаёт оде́жды/g, "создаёт оде́жду")
                      .replace(/рисова́ть  карти́ны/g, "рисова́ть карти́ны")
                      .replace(/рабо́той в фирме\./g, "рабо́той в фи́рме.")
                      .replace(/клие́нта в юриди́ческой фи́рме\./g, "клие́нта в фи́рме.")
                      .replace(/trên buổi concert/g, "tại buổi hòa nhạc");
                    var parsed = JSON.parse(str);
                    if (parsed.actionChains) {
                      parsed.actionChains.forEach(function (ac) {
                        (ac.items || []).forEach(function (it) {
                          if (it.target && it.target.indexOf("Шко́льник") !== -1) {
                            it.ex = "Шко́льник у́чится в шко́ле.";
                            it.ex_vi = "Học sinh đang học ở trường học.";
                          }
                          if (it.target && it.target.indexOf("Худо́жник") !== -1) {
                            it.ex = "Худо́жник рису́ет карти́ны в мастерско́й.";
                            it.ex_vi = "Họa sĩ đang vẽ tranh ở xưởng vẽ.";
                          }
                        });
                      });
                    }
                    return parsed;
                  } catch (_) {
                    return art;
                  }
                })(row.article)
              };
            });
          } catch (_) {
            return [];
          }
        });
      },

      getAll: async function (userId) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return [];
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
        if (!sb || !userId || !jar || !isValidUUID(userId)) return false;
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
        if (!sb || !userId || !jarId || !isValidUUID(userId)) return false;
        try {
          var res = await sb.from("vocab_jars").delete().eq("id", jarId).eq("user_id", userId);
          return !res.error;
        } catch (_) {
          return false;
        }
      },

      syncLocalJarsToCloud: async function (userId, localJars) {
        var sb = getClient();
        if (!sb || !userId || !Array.isArray(localJars) || !isValidUUID(userId)) return false;
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
     * 2.1 KHO TỪ VỰNG THEO CHỦ ĐỀ & TỪ ĐIỂN (VOCABULARIES)
     * ========================================================================= */
    vocabularies: {
      getByTopic: async function (topicId) {
        if (!topicId) return [];
        return RusiCache.withCache("vocab:topic:" + topicId, async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var res = await sb.from("vocabularies").select("*").eq("topic_id", topicId).order("created_at", { ascending: true });
            var data = res.data || [];
            return data.map(sanitizeVocabRow);
          } catch (_) {
            return [];
          }
        });
      },

      getByTopicCode: async function (topicCode) {
        if (!topicCode) return [];
        return RusiCache.withCache("vocab:topic_code:" + topicCode, async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var res = await sb.from("vocabularies").select("*").eq("topic_code", topicCode).order("created_at", { ascending: true });
            var data = res.data || [];
            return data.map(sanitizeVocabRow);
          } catch (_) {
            return [];
          }
        });
      },

      search: async function (keyword) {
        var sb = getClient();
        if (!sb || !keyword) return [];
        try {
          var k = keyword.trim().toLowerCase();
          var res = await sb.from("vocabularies").select("*").or("word_normalized.ilike.%" + k + "%,meaning_vi.ilike.%" + k + "%").limit(50);
          return (res.data || []).map(sanitizeVocabRow);
        } catch (_) {
          return [];
        }
      }
    },

    /* =========================================================================
     * 3. ĐỀ THI TRKI & LỊCH SỬ THI
     * ========================================================================= */
    tests: {
      getPublished: async function (level) {
        var cacheKey = "tests:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("trki_tests").select("*").eq("is_published", true);
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 3500);
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
                icon: row.icon || "graduation-cap",
                parts: raw.parts || []
              };
            });
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy đề thi TRKI:", e);
            return null;
          }
        });
      },

      saveResult: async function (userId, testId, resultData) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return false;
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
        var cacheKey = "listening:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("listening_lessons").select("*").order("part_number", { ascending: true });
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 3500);
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
                icon: row.icon || "headphones",
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
        });
      }
    },

    /* =========================================================================
     * 5. BÀI LUYỆN NÓI & PHÁT ÂM (SPEAKING LESSONS)
     * ========================================================================= */
    speaking: {
      getAll: async function (level) {
        var cacheKey = "speaking:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("speaking_lessons").select("*");
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 3500);
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
                icon: row.icon || "mic-speaking",
                is_pro_only: Boolean(row.is_pro_only),
                items: raw.items || (row.sentence_ru ? [{ ru: row.sentence_ru, vi: "" }] : [])
              };
            });
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy bài nói:", e);
            return null;
          }
        });
      }
    },

    /* =========================================================================
     * 6. ĐỀ LUYỆN VIẾT & TẢ TRANH (WRITING TOPICS)
     * ========================================================================= */
    writing: {
      getAll: async function (level) {
        var cacheKey = "writing:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("writing_topics").select("*");
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 3500);
            if (res.error || !res.data) return null;
            return res.data.map(function (row) {
              var raw = row.raw_data || {};
              if (typeof raw === "string") {
                try { raw = JSON.parse(raw); } catch (_) { raw = {}; }
              }
              var wordsList = (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length)
                ? raw.suggested_words
                : (Array.isArray(row.suggested_words) ? row.suggested_words : []);
              var tipsList = (raw && Array.isArray(raw.tips) && raw.tips.length)
                ? raw.tips
                : (Array.isArray(row.tips) ? row.tips : []);
              return {
                id: row.code || row.id,
                level: row.level || "A1",
                levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
                category: row.category || "intro",
                categoryName: row.category_name || "Tự giới thiệu",
                task_type: raw.task_type || (row.category === "photo" ? "picture_desc" : "summary"),
                icon: row.icon || "pen-tool",
                estMinutes: row.est_minutes || 15,
                title: row.title,
                prompt: row.prompt || "",
                vi: row.vi || "",
                image_url: row.image_url || raw.image_url || "",
                minWords: row.min_words || 20,
                suggested_words: wordsList,
                tips: tipsList,
                model: raw.model || row.model_answer || "",
                is_pro_only: Boolean(row.is_pro_only)
              };
            });
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy đề viết:", e);
            return null;
          }
        });
      }
    },

    /* =========================================================================
     * 7. BÀI VIẾT BLOG & CẨM NANG (BLOG POSTS)
     * ========================================================================= */
    blog: {
      getAll: async function (category) {
        var cacheKey = "blog:" + (category || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
            if (category && category !== "all") q = q.eq("category", category);
            var res = await withTimeout(q, 3500);
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
                icon: row.icon || "book-open-blog",
                author: row.author || "RUSI Editorial",
                readTime: row.read_time || "5 phút đọc"
              };
            });
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy bài blog:", e);
            return null;
          }
        });
      }
    },

    /* =========================================================================
     * 8. SẢN PHẨM CỬA HÀNG (SHOP PRODUCTS)
     * ========================================================================= */
    shop: {
      getAll: async function (category) {
        var cacheKey = "shop:" + (category || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("shop_products").select("*").order("price", { ascending: true });
            if (category && category !== "all") q = q.eq("category", category);
            var res = await withTimeout(q, 3500);
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
        });
      }
    },

    /* =========================================================================
     * 9. BÀI HỌC NGỮ PHÁP (GRAMMAR LESSONS)
     * ========================================================================= */
    grammar: {
      getAll: async function () {
        return RusiCache.withCache("grammar:all", async function () {
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
        });
      }
    },

    /* =========================================================================
     * 10. GÓI DỊCH VỤ & KHÓA HỌC PRO (PACKAGES)
     * ========================================================================= */
    packages: {
      getAll: async function () {
        return RusiCache.withCache("packages:all", async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var res = await sb.from("packages").select("*").order("price", { ascending: true });
            if (res.error || !res.data) return null;
            var seen = {};
            var list = [];
            res.data.forEach(function (row) {
              var rawId = (row.id || "").toLowerCase();
              if (!rawId || seen[rawId]) return;
              seen[rawId] = true;
              list.push({
                id: rawId,
                badge: row.badge || "",
                title: row.title,
                desc: row.description || "",
                price: Number(row.price),
                priceOld: row.price_old ? Number(row.price_old) : undefined,
                popular: Boolean(row.popular),
                features: Array.isArray(row.feature_list) ? row.feature_list : (row.features && row.features.list) || []
              });
            });
            return list;
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy gói cước:", e);
            return null;
          }
        });
      }
    },

    /* =========================================================================
     * 11. ĐƠN HÀNG VIETQR — CHỈ TẠO CHỜ DUYỆT, KHÔNG TỰ KÍCH HOẠT PRO
     * ========================================================================= */
    orders: {
      createPending: async function (order) {
        var sb = getClient();
        if (!sb || !order || !order.id || !order.userId) {
          return { ok: false, message: "Thiếu thông tin đơn hàng." };
        }
        try {
          var row = {
            id: order.id,
            user_id: order.userId,
            package_id: order.packageId,
            amount: Number(order.amount) || 0,
            payment_method: "VIETQR",
            status: "pending"
          };
          var res = await sb.from("orders").insert(row).select().single();
          if (res.error) return { ok: false, message: res.error.message, error: res.error };
          return { ok: true, data: res.data };
        } catch (error) {
          return { ok: false, message: error.message, error: error };
        }
      },

      checkStatus: async function (orderId) {
        var sb = getClient();
        if (!sb || !orderId) return null;
        try {
          var res = await sb.from("orders").select("id,status,package_id,amount,paid_at").eq("id", orderId).maybeSingle();
          return res.error ? null : res.data;
        } catch (_) {
          return null;
        }
      },

      getMine: async function () {
        var sb = getClient();
        if (!sb) return [];
        try {
          var res = await sb.from("orders").select("*").order("created_at", { ascending: false });
          return res.error ? [] : (res.data || []);
        } catch (_) {
          return [];
        }
      },

      createShopPending: async function (order) {
        var sb = getClient();
        if (!sb || !order || !order.id || !order.userId) {
          return { ok: false, message: "Thiếu thông tin đơn hàng." };
        }
        try {
          var row = {
            id: order.id,
            user_id: order.userId,
            amount: Number(order.amount) || 0,
            items: Array.isArray(order.items) ? order.items : [],
            customer_name: order.customerName || "",
            customer_phone: order.customerPhone || "",
            delivery_address: order.deliveryAddress || "",
            status: "pending"
          };
          var res = await sb.from("shop_orders").insert(row).select().single();
          if (res.error) return { ok: false, message: res.error.message, error: res.error };
          return { ok: true, data: res.data };
        } catch (error) {
          return { ok: false, message: error.message, error: error };
        }
      }
    },

    /* =========================================================================
     * 12. SUPABASE AUTH
     * ========================================================================= */
    auth: {
      signInGoogle: async function (redirectTo) {
        var sb = getClient();
        if (!sb) throw new Error("Supabase client chưa khởi tạo.");
        var target = redirectTo;
        if (!target && typeof window !== "undefined") {
          if (window.location.protocol === "file:") {
            var msg = "Không thể đăng nhập Google khi mở file trực tiếp (file://). Vui lòng chạy máy chủ web cục bộ (ví dụ: python server.py) và truy cập qua http://localhost:8000";
            alert(msg);
            throw new Error(msg);
          }
          target = window.location.origin + window.location.pathname;
        }
        return await sb.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: target
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
