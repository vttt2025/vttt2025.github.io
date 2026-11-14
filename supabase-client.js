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
 *   - window.RusiSupabase.questionBank: { getAll, getByTest, getRandom }
 *   - window.RusiSupabase.auth: { signInGoogle, signInEmail, signUpEmail, signOut, getSession }
 *   - window.RusiSupabase.orders: { createPending, checkStatus, getMine }
 */

(function () {
  "use strict";

  var client = null;

  // Kiểm tra định dạng UUID hợp lệ (ngăn ngừa lỗi 400 Bad Request từ PostgreSQL khi dùng Firebase Auth UID)
  function isValidUUID(str) {
    if (!str || typeof str !== "string") return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str.trim());
  }

  // Trình sinh mã định danh chuẩn UUID v4 (RFC 4122) bảo đảm đồng bộ 100% với PostgreSQL gen_random_uuid()
  function generateUUID() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      try {
        return crypto.randomUUID();
      } catch (_) {}
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
  var CACHE_PREFIX = "rusi_sb_cache_v6:";

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
            if (k && (k.indexOf(CACHE_PREFIX) === 0 || k.indexOf("rusi_sb_cache_") === 0)) {
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
    // Chuẩn hóa và làm sạch lỗi ký tự Latin / trọng âm / ví dụ
    var cleanEx = function (text) {
      if (!text) return "";
      return text.replace(/\u00E9/g, "е\u0301").replace(/\u00E1/g, "а\u0301")
        .replace(/редаќции/g, "реда́кции").replace(/овощи́/g, "о́вощи")
        .replace(/создаёт оде́жды/g, "создаёт оде́жду")
        .replace(/рабо́той в фирме\./g, "рабо́той в фи́рме.");
    };
    if (w.ex) w.ex = cleanEx(w.ex);
    if (w.example_ru) w.example_ru = cleanEx(w.example_ru);
    if (w.ex_vi) w.ex_vi = w.ex_vi.replace(/trên buổi concert/g, "tại buổi hòa nhạc");
    if (w.example_vi) w.example_vi = w.example_vi.replace(/trên buổi concert/g, "tại buổi hòa nhạc");

    var cleanRu = function (text) {
      if (!text) return "";
      return text.replace(/\bC(?=[а-яА-ЯёЁ\u0301])/g, "С")
        .replace(/\bO(?=[а-яА-ЯёЁ\u0301])/g, "О")
        .replace(/\bB(?=[а-яА-ЯёЁ\u0301])/g, "В")
        .replace(/собира́ть данны\b/g, "собира́ть да́нные")
        .replace(/анализи́ровать данны\b/g, "анализи́ровать да́нные");
    };
    if (w.stress) w.stress = cleanRu(w.stress);
    if (w.ru) w.ru = cleanRu(w.ru);
    if (w.word_with_stress) w.word_with_stress = cleanRu(w.word_with_stress);

    var norm = (w.word_normalized || w.ru || "").toLowerCase().trim();
    if (norm === "школьник") {
      w.ex = "Шко́льник у́чится в шко́ле.";
      w.example_ru = "Шко́льник у́чится в шко́ле.";
      w.ex_vi = "Học sinh đang học ở trường học.";
      w.example_vi = "Học sinh đang học ở trường học.";
      w.gender = "м./ж.";
    }
    if (norm === "художник") {
      w.ex = "Худо́жник рису́ет карти́ны в мастерско́й.";
      w.example_ru = "Худо́жник рису́ет карти́ны в мастерско́й.";
      w.ex_vi = "Họa sĩ đang vẽ tranh ở xưởng vẽ.";
      w.example_vi = "Họa sĩ đang vẽ tranh ở xưởng vẽ.";
      w.gender = "м./ж.";
    }
    if (["студент", "преподаватель", "учитель", "спортсмен", "артист", "журналист", "переводчик", "писатель"].indexOf(norm) !== -1) {
      w.gender = "м./ж.";
    }
    return w;
  }

  function mapVocabRow(v, posIndex) {
    if (!v) return null;
    var ex0 = (Array.isArray(v.examples) && v.examples[0]) ? v.examples[0] : null;
    var rawWord = v.word_normalized || (v.word_with_stress ? v.word_with_stress.replace(/[\u0300\u0301]/g, "") : "");
    var stressWord = v.word_with_stress || v.word_normalized || "";
    var w = {
      id: v.id,
      position: typeof posIndex === "number" ? posIndex : 0,
      ru: rawWord,
      stress: stressWord,
      word_with_stress: stressWord,
      word_normalized: rawWord,
      vi: v.meaning_vi || "",
      meaning_vi: v.meaning_vi || "",
      pos: v.pos || "",
      gender: v.gender || "",
      aspect: v.aspect || "",
      level: v.level || "A1",
      audio: v.audio_url || "",
      audio_url: v.audio_url || "",
      ex: ex0 ? (ex0.ru || "") : "",
      ex_vi: ex0 ? (ex0.vi || "") : "",
      examples: Array.isArray(v.examples) ? v.examples : [],
      ant: (Array.isArray(v.antonyms) && v.antonyms.length) ? v.antonyms.join(", ") : "",
      antonyms: Array.isArray(v.antonyms) ? v.antonyms : [],
      syn: (Array.isArray(v.synonyms) && v.synonyms.length) ? v.synonyms.join(", ") : "",
      synonyms: Array.isArray(v.synonyms) ? v.synonyms : [],
      structures: Array.isArray(v.structures) ? v.structures : [],
      notes: v.notes || "",
      note: v.notes || ""
    };
    return sanitizeVocabRow(w);
  }

  var RusiSupabase = {
    /** Tiện ích sinh mã định danh chuẩn UUID v4 */
    generateUUID: generateUUID,

    /** Kiểm tra định dạng chuỗi UUID hợp lệ */
    isValidUUID: isValidUUID,

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
          // Nếu bảng chưa được tạo (lỗi 42P01: relation does not exist), báo cụ thể để khởi tạo schema
          if (res.error.code === "42P01" || (res.error.message && res.error.message.includes("does not exist"))) {
            return {
              ok: true,
              tablesMissing: true,
              latency: elapsed,
              message: "Kết nối Supabase thành công! (Lưu ý: Bảng 'profiles' chưa tạo, hãy khởi tạo schema trong Supabase SQL Editor)."
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
            var jarsPromise = withTimeout(
              sb.from("vocab_jars")
                .select("id, code, name, level, icon, word_count, is_system, is_pro, jar_items(position, vocabularies(*))")
                .eq("is_system", true)
                .order("created_at", { ascending: true }),
              5000
            );
            var articlesPromise = withTimeout(
              sb.from("topic_articles").select("*"),
              3500
            );

            var results = await Promise.all([jarsPromise, articlesPromise]);
            var jarsRes = results[0];
            var articlesRes = results[1];

            if (jarsRes.error || !jarsRes.data) return [];
            var articlesList = (articlesRes && articlesRes.data) ? articlesRes.data : [];
            var articlesMap = {};
            articlesList.forEach(function (a) {
              articlesMap[a.id] = a;
            });

            return (jarsRes.data || []).map(function (row) {
              var jarCode = row.code || row.id;
              var art = articlesMap[jarCode] || articlesMap[row.id] || null;

              var items = Array.isArray(row.jar_items) ? row.jar_items : [];
              items.sort(function (a, b) {
                return (a.position || 0) - (b.position || 0);
              });

              var mappedWords = items.map(function (it) {
                return mapVocabRow(it.vocabularies, it.position);
              }).filter(Boolean);

              // Dự phòng từ vựng theo lọ nếu DB chưa gán jar_items
              if (!mappedWords.length && typeof window !== "undefined" && Array.isArray(window.VOCAB_JARS)) {
                var localMatch = window.VOCAB_JARS.find(function (j) {
                  return j.id === jarCode || j.code === jarCode;
                });
                if (localMatch && Array.isArray(localMatch.words)) {
                  mappedWords = localMatch.words.map(sanitizeVocabRow);
                }
              }

              var mappedArticle = art ? {
                id: art.id,
                title: art.title,
                level: art.level || row.level || "A1",
                intro: art.intro || "",
                desc: art.intro || "",
                culturalTip: art.cultural_tip || "",
                cultural_tip: art.cultural_tip || "",
                audio_url: art.audio_url || "",
                actionChains: Array.isArray(art.action_chains) ? art.action_chains : [],
                action_chains: Array.isArray(art.action_chains) ? art.action_chains : [],
                dialogues: Array.isArray(art.dialogues) ? art.dialogues : [],
                grammarNotes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
                grammar_notes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
                content_md: art.content_md || "",
                content_markdown: art.content_md || "",
                content: art.content_md || ""
              } : null;

              return {
                id: jarCode,
                code: jarCode,
                uuid: row.id,
                name: row.name || jarCode,
                title: row.name || jarCode,
                level: row.level || "A1",
                levelName: row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1",
                desc: (mappedArticle && mappedArticle.intro) || "",
                icon: row.icon || "archive-jar",
                word_count: mappedWords.length || row.word_count || 0,
                wordsCount: mappedWords.length || row.word_count || 0,
                is_system: true,
                is_pro: Boolean(row.is_pro),
                is_pro_only: Boolean(row.is_pro),
                words: mappedWords,
                article: mappedArticle,
                raw: row
              };
            });
          } catch (err) {
            console.warn("[RusiSupabase] Lỗi lấy lọ từ vựng:", err);
            return [];
          }
        });
      },

      getAll: async function (userId) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return [];
        try {
          var res = await sb.from("vocab_jars")
            .select("id, code, name, level, icon, word_count, is_system, is_pro, jar_items(position, vocabularies(*))")
            .eq("owner_id", userId)
            .order("created_at", { ascending: false });
          if (res.error) return [];
          return (res.data || []).map(function (row) {
            var items = Array.isArray(row.jar_items) ? row.jar_items : [];
            items.sort(function (a, b) { return (a.position || 0) - (b.position || 0); });
            var words = items.map(function (it) { return mapVocabRow(it.vocabularies, it.position); }).filter(Boolean);
            return {
              id: row.id,
              code: row.code || row.id,
              name: row.name || "Lọ của tôi",
              title: row.name || "Lọ của tôi",
              level: row.level || "A1",
              icon: row.icon || "archive-jar",
              is_system: Boolean(row.is_system),
              word_count: words.length || row.word_count || 0,
              words: words
            };
          });
        } catch (_) {
          return [];
        }
      },

      save: async function (userId, jar) {
        var sb = getClient();
        if (!sb || !userId || !jar || !isValidUUID(userId)) return false;
        try {
          if (!jar.id || !isValidUUID(jar.id)) {
            jar.id = generateUUID();
          }
          var row = {
            id: jar.id,
            owner_id: userId,
            name: jar.name || jar.title || "Lọ từ vựng",
            icon: jar.icon || "archive-jar",
            level: jar.level || "A1",
            is_system: Boolean(jar.is_system),
            is_pro: false,
            word_count: Array.isArray(jar.words) ? jar.words.length : 0,
            updated_at: new Date().toISOString()
          };
          var res = await sb.from("vocab_jars").upsert(row).select().single();
          if (res.error || !res.data) return false;
          var jarId = res.data.id;
          jar.id = jarId;
          jar.uuid = jarId;

          // Nếu có danh sách từ, bảo đảm các từ có UUID hợp lệ và liên kết qua jar_items
          if (Array.isArray(jar.words) && jar.words.length > 0) {
            var itemsToInsert = [];
            var wordsToUpsert = [];
            for (var idx = 0; idx < jar.words.length; idx++) {
              var w = jar.words[idx];
              if (!w) continue;
              if (!w.id || !isValidUUID(w.id)) {
                w.id = generateUUID();
              }
              wordsToUpsert.push({
                id: w.id,
                word_with_stress: w.stress || w.word_with_stress || w.ru || "сло́во",
                meaning_vi: w.meaning_vi || w.vi || "",
                pos: w.pos || "noun",
                level: w.level || jar.level || "A1",
                updated_at: new Date().toISOString()
              });
              itemsToInsert.push({
                jar_id: jarId,
                vocab_id: w.id,
                position: idx + 1
              });
            }
            if (wordsToUpsert.length > 0) {
              await sb.from("vocabularies").upsert(wordsToUpsert, { onConflict: "id" });
            }
            if (itemsToInsert.length > 0) {
              await sb.from("jar_items").upsert(itemsToInsert, { onConflict: "jar_id,vocab_id" });
            }
          }
          return true;
        } catch (_) {
          return false;
        }
      },

      delete: async function (userId, jarId) {
        var sb = getClient();
        if (!sb || !userId || !jarId || !isValidUUID(userId)) return false;
        try {
          if (isValidUUID(jarId)) {
            await sb.from("jar_items").delete().eq("jar_id", jarId);
            var res = await sb.from("vocab_jars").delete().eq("id", jarId).eq("owner_id", userId);
            return !res.error;
          } else {
            await sb.from("vocab_jars").delete().eq("code", jarId).eq("owner_id", userId);
            return true;
          }
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
        return RusiSupabase.vocabularies.getByTopicCode(topicId);
      },

      getByTopicCode: async function (topicCode) {
        if (!topicCode) return [];
        return RusiCache.withCache("vocab:topic_code:" + topicCode, async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var jarQ = sb.from("vocab_jars")
              .select("id, code, jar_items(position, vocabularies(*))");
            if (isValidUUID(topicCode)) {
              jarQ = jarQ.or("id.eq." + topicCode + ",code.eq." + topicCode);
            } else {
              jarQ = jarQ.eq("code", topicCode);
            }
            var jarRes = await withTimeout(jarQ.maybeSingle(), 3500);
            if (jarRes.error || !jarRes.data) return [];
            var items = jarRes.data.jar_items || [];
            items.sort(function (a, b) { return (a.position || 0) - (b.position || 0); });
            return items.map(function (it) {
              return mapVocabRow(it.vocabularies, it.position);
            }).filter(Boolean);
          } catch (_) {
            return [];
          }
        });
      },

      getAll: async function (level) {
        var cacheKey = "vocabularies:all:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var q = sb.from("vocabularies").select("*").order("word_normalized", { ascending: true });
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 4000);
            if (res.error || !res.data) return [];
            return res.data.map(function (row, idx) {
              return mapVocabRow(row, idx + 1);
            });
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
          var res = await sb.from("vocabularies")
            .select("*")
            .or("word_normalized.ilike.%" + k + "%,meaning_vi.ilike.%" + k + "%,word_with_stress.ilike.%" + k + "%")
            .limit(50);
          return (res.data || []).map(function (row, idx) {
            return mapVocabRow(row, idx + 1);
          });
        } catch (_) {
          return [];
        }
      }
    },

    /* =========================================================================
     * 2.2 BÀI HỌC CHỦ ĐỀ CHUYÊN SÂU (TOPIC ARTICLES)
     * ========================================================================= */
    topicArticles: {
      getAll: async function () {
        return RusiCache.withCache("topic_articles:all", async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var res = await withTimeout(sb.from("topic_articles").select("*").order("id", { ascending: true }), 3500);
            if (res.error || !res.data) return [];
            return res.data.map(function (art) {
              return {
                id: art.id,
                title: art.title,
                level: art.level || "A1",
                intro: art.intro || "",
                desc: art.intro || "",
                culturalTip: art.cultural_tip || "",
                cultural_tip: art.cultural_tip || "",
                audio_url: art.audio_url || "",
                actionChains: Array.isArray(art.action_chains) ? art.action_chains : [],
                action_chains: Array.isArray(art.action_chains) ? art.action_chains : [],
                dialogues: Array.isArray(art.dialogues) ? art.dialogues : [],
                grammarNotes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
                grammar_notes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
                content_md: art.content_md || "",
                content_markdown: art.content_md || "",
                content: art.content_md || ""
              };
            });
          } catch (_) {
            return [];
          }
        });
      },

      getById: async function (articleId) {
        if (!articleId) return null;
        var all = await RusiSupabase.topicArticles.getAll();
        return all.find(function (a) { return a.id === articleId; }) || null;
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
              var partsArr = (Array.isArray(row.parts) && row.parts.length)
                ? row.parts
                : (row.sections || (raw && raw.parts) || []);
              if (!partsArr.length && row.part1 && row.part1.id) {
                partsArr = [row.part1, row.part2, row.part3, row.part4, row.part5].filter(Boolean);
              }
              return {
                id: row.code || row.id,
                uuid: row.id,
                code: row.code,
                level: row.level,
                levelName: row.level_name || ("TRKI " + row.level),
                category: row.category || row.sub_test_type || "full",
                title: row.title,
                durationMin: row.duration_min || row.duration_minutes || 45,
                passPercent: row.pass_percent || row.passing_score || 60,
                is_pro_only: Boolean(row.is_pro_only),
                icon: row.icon || "award-badge",
                parts: partsArr,
                part1: row.part1 || null,
                part2: row.part2 || null,
                part3: row.part3 || null,
                part4: row.part4 || null,
                part5: row.part5 || null,
                answers: row.answers || null
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
            exam_id: testId,
            score_percent: Number(resultData.score || resultData.scorePercent) || 0,
            passed: Boolean(resultData.passed),
            section_scores: resultData.sectionScores || {},
            user_answers: resultData.answers || resultData.userAnswers || {},
            time_spent_sec: Number(resultData.timeSpent || resultData.timeSpentSeconds) || 0,
            submitted_at: new Date().toISOString()
          };
          var res = await sb.from("trki_submissions").insert(payload);
          return !res.error;
        } catch (_) {
          return false;
        }
      }
    },

    /* =========================================================================
     * 3b. NGÂN HÀNG CÂU HỎI TRKI CỐT LÕI (CORE QUESTION BANK)
     * ========================================================================= */
    questionBank: {
      getAll: async function (opts) {
        opts = opts || {};
        var cacheKey = "question_bank:" + (opts.level || "all") + ":" + (opts.sub_test || "all") + ":" + (opts.limit || 200);
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return [];
          try {
            var q = sb.from("trki_question_bank").select("*").eq("is_published", true).order("order_index", { ascending: true });
            if (opts.level && opts.level !== "all") q = q.eq("level", opts.level);
            if (opts.sub_test && opts.sub_test !== "all") q = q.eq("sub_test", opts.sub_test);
            if (opts.test_code) q = q.eq("test_code", opts.test_code);
            if (opts.topic) q = q.ilike("topic", "%" + opts.topic + "%");
            if (opts.grammar_case) q = q.eq("grammar_case", opts.grammar_case);
            if (opts.limit) q = q.limit(opts.limit);
            var res = await withTimeout(q, 4500);
            if (res.error || !res.data) return [];
            return res.data;
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy ngân hàng câu hỏi:", e);
            return [];
          }
        });
      },

      getByTest: async function (testCode) {
        var sb = getClient();
        if (!sb || !testCode) return [];
        try {
          var res = await sb.from("trki_question_bank")
            .select("*")
            .eq("test_code", testCode)
            .eq("is_published", true)
            .order("order_index", { ascending: true });
          return res.data || [];
        } catch (_) {
          return [];
        }
      },

      getRandom: async function (opts) {
        opts = opts || {};
        var all = await RusiSupabase.questionBank.getAll({ level: opts.level, sub_test: opts.sub_test, limit: 150 });
        if (!all || !all.length) return [];
        var shuffled = all.slice().sort(function () { return 0.5 - Math.random(); });
        return shuffled.slice(0, opts.count || 10);
      }
    },

    /* =========================================================================
     * 4. BÀI LUYỆN NGHE & CHÉP CHÍNH TẢ (LISTENING & DICTATION)
     * ========================================================================= */
    listening: {
      getAll: async function (level) {
        var cacheKey = "listening:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb
              .from("listening_lessons")
              .select("*, topic:listening_topics(*), vocab_items:listening_lesson_vocab(sort_order, line_index, vocab:vocabularies(*))")
              .order("sort_order", { ascending: true });
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 4000);
            if (res.error || !res.data) return null;
            return res.data.map(function (row) {
              var raw = row.raw_data || {};
              var t = row.topic || {};
              var linesList = (Array.isArray(row.lines) && row.lines.length) ? row.lines : (raw.lines || []);
              var questionsList = (Array.isArray(row.questions) && row.questions.length) ? row.questions : (raw.questions || []);
              var dictList = (raw.dictation && raw.dictation.length) ? raw.dictation : (Array.isArray(linesList) ? linesList.map(function(l) { return l.text_ru || l.ru || ""; }).filter(Boolean) : []);
              return {
                id: row.code || row.id,
                lesson_uuid: row.id,
                code: row.code || row.id,
                topic_id: row.topic_id,
                topic: t,
                title: row.title,
                vi: row.vi || row.translation_vi || t.description || "",
                level: row.level || t.level || "A1",
                levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
                category: t.category || row.category || "airport",
                categoryName: t.title || row.category_name || "Bài nghe",
                icon: t.icon || row.icon || "headphones",
                audio_url: row.audio_url || "",
                duration_seconds: row.duration_seconds || 25,
                estMinutes: row.est_minutes || Math.max(3, Math.ceil((row.duration_seconds || 30) / 60) * 3),
                is_pro_only: Boolean(row.is_pro_only || t.is_pro_only),
                transcript_ru: row.transcript_ru || "",
                translation_vi: row.translation_vi || "",
                lines: linesList,
                questions: questionsList,
                dictation: dictList,
                blanks: raw.blanks || [],
                vocab_items: row.vocab_items || [],
                raw_data: raw
              };
            });
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy bài nghe:", e);
            return null;
          }
        });
      },

      getTopics: async function (level) {
        var cacheKey = "listening_topics:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb
              .from("listening_topics")
              .select("*, lessons:listening_lessons(*, vocab_items:listening_lesson_vocab(sort_order, line_index, vocab:vocabularies(*)))")
              .order("sort_order", { ascending: true });
            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 4000);
            if (res.error || !res.data) return null;
            return res.data;
          } catch (e) {
            console.warn("[RusiSupabase] Lỗi lấy chủ đề nghe:", e);
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
              var sentencesList = Array.isArray(row.sentences) && row.sentences.length ? row.sentences : (Array.isArray(row.items) && row.items.length ? row.items : (raw.items || []));
              var ytId = row.youtube_id || raw.youtube_video_id || raw.youtubeId || (row.video_sample_url && row.video_sample_url.includes("youtube") ? (row.video_sample_url.match(/(?:embed\/|v=|watch\?v=)([a-zA-Z0-9_-]{11})/)||[])[1] : "");
              var ytUrl = row.youtube_url || (ytId ? ("https://www.youtube.com/watch?v=" + ytId) : "");
              var embedUrl = row.video_sample_url || (ytId ? ("https://www.youtube.com/embed/" + ytId + "?enablejsapi=1&rel=0&modestbranding=1&playsinline=1") : "");
              return {
                id: row.code || row.id,
                code: row.code || row.id,
                title: row.title,
                level: row.level || "A1",
                levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
                category: row.category || "shadowing",
                categoryName: row.category_name || "Luyện nói Shadowing",
                description: row.description || "",
                phonemeTarget: row.phoneme_target || "",
                icon: row.icon || (ytId ? "youtube" : "mic-speaking"),
                is_pro_only: Boolean(row.is_pro_only),
                is_vip: Boolean(row.is_vip || row.is_pro_only),
                sentences: sentencesList,
                items: sentencesList,
                youtube_id: ytId,
                youtubeId: ytId,
                youtube_url: ytUrl,
                video_url: embedUrl,
                video_sample_url: embedUrl,
                start_sec: row.start_sec || 0,
                end_sec: row.end_sec || 0,
                sort_order: row.sort_order || 0,
                raw_data: raw
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
     * 6. ĐỀ LUYỆN VIẾT & TẢ TRANH (WRITING TOPICS & TASKS)
     * ========================================================================= */
    writing: {
      getAll: async function (level) {
        var cacheKey = "writing:" + (level || "all");
        return RusiCache.withCache(cacheKey, async function () {
          var sb = getClient();
          if (!sb) return null;
          try {
            var q = sb.from("writing_tasks").select(`
              id,
              code,
              title,
              level,
              level_name,
              task_type,
              category,
              category_name,
              image_url,
              prompt,
              prompt_text,
              model_answer,
              sample_essay,
              tips,
              ai_prompt,
              min_words,
              sort_order,
              is_pro_only,
              raw_data,
              topic:writing_topics(
                id,
                code,
                title,
                level,
                type,
                category,
                category_name,
                icon,
                description
              ),
              vocab_items:writing_task_vocab(
                sort_order,
                vocab:vocabularies(
                  id,
                  word_with_stress,
                  word_normalized,
                  pos,
                  meaning_vi,
                  level,
                  audio_url,
                  structures,
                  examples
                )
              )
            `).order("sort_order", { ascending: true });

            if (level && level !== "all") q = q.eq("level", level);
            var res = await withTimeout(q, 4500);

            if (res.error || !res.data) {
              console.warn("[RusiSupabase] Query writing_tasks fallback:", res.error);
              var fb = await withTimeout(sb.from("writing_topics").select("*"), 3500);
              if (fb.error || !fb.data) return null;
              return fb.data;
            }

            return res.data.map(function (row) {
              var raw = row.raw_data || {};
              if (typeof raw === "string") {
                try { raw = JSON.parse(raw); } catch (_) { raw = {}; }
              }

              // Extract vocabulary from linked dictionary vocabularies
              var wordsList = [];
              if (Array.isArray(row.vocab_items) && row.vocab_items.length) {
                wordsList = row.vocab_items
                  .filter(function (item) { return item && item.vocab; })
                  .sort(function (a, b) { return (a.sort_order || 0) - (b.sort_order || 0); })
                  .map(function (item) {
                    var v = item.vocab;
                    return {
                      id: v.id,
                      ru: v.word_with_stress || v.word_normalized,
                      word: v.word_with_stress || v.word_normalized,
                      word_normalized: v.word_normalized,
                      vi: v.meaning_vi || "",
                      pos: v.pos || "",
                      level: v.level || "",
                      audio_url: v.audio_url || "",
                      structures: v.structures || null,
                      examples: v.examples || null
                    };
                  });
              } else {
                wordsList = (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length)
                  ? raw.suggested_words
                  : (Array.isArray(row.suggested_words) ? row.suggested_words : []);
              }

              // Extract tips
              var tipsList = [];
              if (Array.isArray(row.tips) && row.tips.length) {
                tipsList = row.tips;
              } else if (typeof row.tips === "string" && row.tips.trim()) {
                try {
                  var parsedTips = JSON.parse(row.tips);
                  if (Array.isArray(parsedTips)) tipsList = parsedTips;
                  else tipsList = [row.tips];
                } catch (_) {
                  tipsList = row.tips.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
                }
              }

              var topic = row.topic || {};
              var topicCategory = topic.category || row.category || "general";
              var topicCategoryName = topic.title || topic.category_name || row.category_name || "Luyện viết";
              var topicKey = topic.code || topic.id || topicCategory;
              var topicType = topic.type || (row.task_type === "picture_desc" ? "picture" : "translation");

              return {
                id: row.code || row.id,
                taskId: row.id,
                code: row.code || row.id,
                level: row.level || topic.level || "A1",
                levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
                category: topicCategory,
                categoryName: topicCategoryName,
                topicKey: topicKey,
                topicName: topicCategoryName,
                topicType: topicType,
                task_type: row.task_type || (topicType === "picture" ? "picture_desc" : "translation"),
                icon: topic.icon || (topicType === "picture" ? "image" : "book-open-blog"),
                estMinutes: row.est_minutes || topic.est_minutes || 15,
                title: row.title,
                prompt: row.prompt || row.prompt_text || "",
                vi: row.prompt_text || "",
                image_url: row.image_url || "",
                minWords: row.min_words || 25,
                suggested_words: wordsList,
                tips: tipsList,
                ai_prompt: row.ai_prompt || "",
                model: row.model_answer || row.sample_essay || raw.model || "",
                model_answer: row.model_answer || row.sample_essay || "",
                is_pro_only: Boolean(row.is_pro_only || topic.is_pro_only),
                sort_order: row.sort_order || 0
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
            var q = sb.from("blog_posts").select("*").order("created_at", { ascending: false });
            if (category && category !== "all") q = q.eq("category", category);
            var res = await withTimeout(q, 3500);
            if (res.error || !res.data) return null;
            return res.data.map(function (row) {
              return {
                slug: row.slug,
                title: row.title,
                category: row.category,
                categoryName: row.category_name || row.category,
                cover: row.cover_url || row.cover_image || "assets/red-square.jpg",
                excerpt: row.summary || row.excerpt || "",
                content: row.content_md || row.content_markdown || row.summary || row.excerpt || "",
                date: row.published_at ? new Date(row.published_at).toLocaleDateString("vi-VN") : (row.date || new Date(row.created_at).toLocaleDateString("vi-VN")),
                icon: row.icon || "book-open-blog",
                author: row.author || "RUSI Editorial",
                readTime: row.reading_time || row.read_time || "5 phút đọc"
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
            var res = await sb.from("grammar_lessons").select("*").order("order_index", { ascending: true });
            if (res.error || !res.data) return null;
            return res.data.map(function (row) {
              return {
                id: row.id,
                code: row.code || row.id,
                title: row.title,
                level: row.level || "A1",
                category: row.category || row.topic || "",
                summary: row.summary || "",
                content_md: row.content_md || "",
                order_index: row.order_index || 0,
                vi: row.vi || row.title,
                topic: row.topic || row.category || "",
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
                price: Number(row.price_vnd || row.price || row.price_minor || 0),
                priceOld: row.price_old ? Number(row.price_old) : undefined,
                popular: Boolean(row.popular),
                features: Array.isArray(row.features) ? row.features : (Array.isArray(row.feature_list) ? row.feature_list : (row.features && row.features.list) || [])
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
        if (!sb || !order) {
          return { ok: false, message: "Thiếu thông tin đơn hàng." };
        }
        try {
          var code = order.orderCode || order.code || (typeof order.id === "string" && !isValidUUID(order.id) ? order.id : ("ORD-" + Date.now().toString(36).toUpperCase()));
          var row = {
            order_code: code,
            user_id: isValidUUID(order.userId) ? order.userId : null,
            package_id: order.packageId || null,
            amount: Number(order.amount) || 0,
            amount_minor: (Number(order.amount) || 0) * 100,
            currency: "VND",
            payment_method: order.paymentMethod || "VIETQR",
            status: "pending",
            expires_at: order.expiresAt || new Date(Date.now() + 24 * 3600 * 1000).toISOString()
          };
          if (isValidUUID(order.id)) row.id = order.id;
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
        if (!sb || !order) {
          return { ok: false, message: "Thiếu thông tin đơn hàng." };
        }
        try {
          var code = order.orderCode || order.code || (typeof order.id === "string" && !isValidUUID(order.id) ? order.id : ("SHOP-" + Date.now().toString(36).toUpperCase()));
          var row = {
            order_code: code,
            user_id: isValidUUID(order.userId) ? order.userId : null,
            amount: Number(order.amount) || 0,
            amount_minor: (Number(order.amount) || 0) * 100,
            currency: "VND",
            payment_method: order.paymentMethod || "VIETQR",
            status: "pending",
            expires_at: order.expiresAt || new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
            shipping_address: {
              customer_name: order.customerName || "",
              customer_phone: order.customerPhone || "",
              delivery_address: order.deliveryAddress || "",
              items: Array.isArray(order.items) ? order.items : []
            }
          };
          if (isValidUUID(order.id)) row.id = order.id;
          var res = await sb.from("orders").insert(row).select().single();
          if (res.error) return { ok: false, message: res.error.message, error: res.error };
          return { ok: true, data: res.data };
        } catch (error) {
          return { ok: false, message: error.message, error: error };
        }
      }
    },

    /* =========================================================================
     * 11B. TRUY XUẤT DỮ LIỆU PHÂN HỆ ĐỒNG BỘ (fetchModuleData)
     * ========================================================================= */
    fetchModuleData: async function (moduleKey) {
      if (!moduleKey) return null;
      var k = String(moduleKey).toLowerCase().trim();
      if (k === "speaking" || k === "speaking_sets" || k === "speaking_lessons") {
        return await RusiSupabase.speaking.getAll();
      }
      if (k === "listening" || k === "listening_lessons") {
        return await RusiSupabase.listening.getAll();
      }
      if (k === "writing" || k === "writing_tasks" || k === "writing_topics") {
        return await RusiSupabase.writing.getAll();
      }
      if (k === "trki" || k === "tests" || k === "trki_bank") {
        return await RusiSupabase.trki.getAll();
      }
      if (k === "vocab" || k === "jars" || k === "vocab_jars") {
        return await RusiSupabase.jars.getSystemJars();
      }
      if (k === "vocabularies" || k === "words") {
        return await RusiSupabase.vocabularies.getAll();
      }
      if (k === "articles" || k === "topic_articles") {
        return await RusiSupabase.topicArticles.getAll();
      }
      if (k === "grammar" || k === "grammar_lessons") {
        return await RusiSupabase.grammar.getAll();
      }
      return null;
    },

    /* =========================================================================
     * 12. TIẾN ĐỘ & NHẬT KÝ LUYỆN TẬP TOÀN DIỆN (USER PROGRESS & PRACTICE LOGS)
     * ========================================================================= */
    userProgress: {
      get: async function (userId) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return null;
        try {
          var res = await sb.from("user_progress").select("*").eq("user_id", userId).maybeSingle();
          return res.data || null;
        } catch (_) {
          return null;
        }
      },

      save: async function (userId, data) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return false;
        try {
          var row = {
            user_id: userId,
            xp_total: Number(data.xp || data.xp_total) || 0,
            streak_count: Number(data.streak || data.streak_count) || 0,
            last_study_date: data.last_study_date || (new Date().toISOString().split("T")[0]),
            vocab_stats: data.vocab_stats || {},
            done_list: data.done_list || {},
            updated_at: new Date().toISOString()
          };
          var res = await sb.from("user_progress").upsert(row);
          return !res.error;
        } catch (_) {
          return false;
        }
      },

      logPractice: async function (userId, logData) {
        var sb = getClient();
        if (!sb || !userId || !isValidUUID(userId)) return false;
        try {
          var payload = {
            user_id: userId,
            skill_type: logData.skill_type || "general",
            item_id: String(logData.item_id || ""),
            item_title: String(logData.item_title || ""),
            score: typeof logData.score === "number" ? logData.score : null,
            duration_seconds: Number(logData.duration_seconds) || 0,
            xp_earned: Number(logData.xp_earned) || 0,
            details: logData.details || {},
            created_at: new Date().toISOString()
          };
          var res = await sb.from("practice_logs").insert(payload);
          return !res.error;
        } catch (_) {
          return false;
        }
      }
    },

    /* =========================================================================
     * 13. SUPABASE AUTH
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
  window.RusiUUID = generateUUID;

  // Tự động kiểm tra kết nối nền khi tài liệu nạp xong
  document.addEventListener("DOMContentLoaded", function () {
    if (window.isSupabaseConfigured && window.isSupabaseConfigured()) {
      getClient();
    }
  });
})();
