
// Chống clickjacking: GitHub Pages không gửi được header X-Frame-Options / CSP frame-ancestors (meta CSP bỏ qua chỉ thị này)
// → trang bị nhúng trong iframe của site khác thì thoát ra cửa sổ chính, không được thì ẩn trang.
if (window.top !== window.self) {
  let rusiSameOriginFrame = false; // CMS xem trước trang bằng iframe cùng tên miền → cho phép
  try { rusiSameOriginFrame = window.top.location.origin === window.location.origin; } catch (_) {}
  if (!rusiSameOriginFrame) {
    try { window.top.location.href = window.self.location.href; } catch (_) { document.documentElement.style.display = "none"; }
  }
}

// Universal DOM Helpers (Phòng ngừa lỗi ReferenceError trên mọi trang)
window.el = window.el || function(sel) { return document.querySelector(sel); };
window.getRusiAppRoot = function() {
  if (typeof window === "undefined") return "/";
  if (window.location.protocol === "file:") return "";
  return window.location.pathname.indexOf("/rusitrki/") === 0 ? "/rusitrki/" : "/";
};
window.esc = window.esc || function(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};
// =========================================================================
// RUSI TRKI — CLEAN & DEEP URL ROUTING ENGINE
// =========================================================================
(function initCleanUrls() {
  if (typeof window === "undefined") return;
  try {
    const rawStoredParams = sessionStorage.getItem("rusi_route_params");
    if (rawStoredParams) {
      window.__RUSI_DEEP_PARAMS__ = JSON.parse(rawStoredParams);
      sessionStorage.removeItem("rusi_route_params");
    }
  } catch (_) {}

  // Phòng vệ: Không thay đổi URL nếu đang chạy file:// hoặc trên localhost dev server (tránh Live Server 404 trắng trang)
  const isLocalDev = window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "0.0.0.0";
  if (isLocalDev) return;

  if (window.history && window.history.replaceState) {
    try {
      const stored = sessionStorage.getItem("rusi_clean_url");
      if (stored) {
        sessionStorage.removeItem("rusi_clean_url");
        const cleanStored = stored.replace(/\/+$/, '') || '/';
        window.history.replaceState(null, document.title, cleanStored);
      } else {
        const path = window.location.pathname;
        if (path.endsWith(".html")) {
          const cleanPath = path.slice(0, -5);
          const target = (cleanPath === "/index" ? "/" : (cleanPath.endsWith("/index") ? cleanPath.slice(0, -5) : cleanPath)) + window.location.search + window.location.hash;
          window.history.replaceState(null, document.title, target);
        }
      }
    } catch (_) {}
  }
})();

// Hàm toàn cục lấy tham số điều hướng từ query param, session params hoặc deep pathname
window.getRusiRouteParam = function(key) {
  if (typeof window === "undefined") return null;
  try {
    const sp = new URLSearchParams(window.location.search);
    if (sp.has(key)) return sp.get(key);
  } catch (_) {}
  if (window.__RUSI_DEEP_PARAMS__ && window.__RUSI_DEEP_PARAMS__[key] !== undefined) {
    return window.__RUSI_DEEP_PARAMS__[key];
  }
  try {
    const root = (window.__RUSI_APP_ROOT__ || '/');
    let p = window.location.pathname;
    if (root !== '/' && p.indexOf(root) === 0) p = '/' + p.slice(root.length);
    const clean = p.replace(/[\/.]+$/, '');
    const rawSegments = clean.split('/').filter(Boolean);
    const segments = clean.split('/').filter(Boolean);
    const first = (segments[0] || '').toLowerCase();
    const second = (segments[1] || '').toLowerCase();
    const third = (segments[2] || '').toLowerCase();
    const fourth = (segments[3] || '').toLowerCase();
    const rawSecond = rawSegments[1] || '';
    const rawThird = rawSegments[2] || '';
    const rawFourth = rawSegments[3] || '';

    if (first === 'vocabulary' || first === 'vocab' || first === 'tu-vung') {
      if (key === 'srs' && second === 'srs') return '1';
      if (key === 'mode') {
        if (fourth || (second && third && second !== 'chu_de') || second === 'lo_tu' || second === 'lo-tu' || second === 'jar') return 'jar';
      }
      if (key === 'jar') {
        if ((second === 'lo_tu' || second === 'lo-tu' || second === 'jar') && third) return rawThird;
        if (second === 'chu_de' && third && fourth) return rawFourth;
        if (second === 'chu_de' && third) return rawThird;
        if (second && third) return rawThird;
        if (second && second !== 'srs' && second !== 'chu_de') return rawSecond;
      }
      if (key === 'topic' || key === 'article') {
        if (second === 'chu_de' && third) return rawThird;
        if (second !== 'lo_tu' && second !== 'lo-tu' && second !== 'jar' && second !== 'srs') {
          if (third) return rawSecond;
          return rawSecond;
        }
      }
    } else if (first === 'speaking' || first === 'speak' || first === 'noi') {
      if (key === 'mode' && (second === 'shadowing' || second === 'reflex')) return second;
      if (key === 'set' || key === 'id') return rawThird || (second !== 'shadowing' && second !== 'reflex' ? rawSecond : null);
    } else if (first === 'listening' || first === 'listen' || first === 'nghe') {
      if (key === 'mode' && (second === 'dictation' || second === 'comprehension')) return second;
      if (key === 'lesson' || key === 'id') return rawThird || (second !== 'dictation' && second !== 'comprehension' && second !== 'bai_hoc' && second !== 'bai-hoc' ? rawSecond : null);
    } else if (first === 'writing' || first === 'write' || first === 'viet') {
      if (key === 'mode' && (second === 'picture' || second === 'translation')) return second;
      if (key === 'task' || key === 'id') return rawThird || (second !== 'picture' && second !== 'translation' && second !== 'bai_viet' && second !== 'bai-viet' ? rawSecond : null);
    } else if (first === 'mock-test' || first === 'trki' || first === 'test' || first === 'exam' || first === 'thi-thu') {
      if (key === 'level' && ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].includes(second)) return second.toUpperCase();
      if (key === 'test' || key === 'exam' || key === 'id') return rawThird || (!['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'de_thi', 'de-thi'].includes(second) ? rawSecond : null);
    }
  } catch (_) {}
  return null;
};

// Cập nhật thanh địa chỉ URL ngữ nghĩa mượt mà không reload trang
window.setRusiDeepUrl = function(path) {
  if (typeof window === "undefined" || !window.history || !window.history.pushState) return;
  try {
    // Không pushState khi ở local server để tránh Live Server 404 khi tải lại
    const isLocalDev = window.location.protocol === "file:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "0.0.0.0";
    if (isLocalDev) return;

    window.__RUSI_DEEP_PARAMS__ = null;
    const root = (window.__RUSI_APP_ROOT__ || (window.location.pathname.startsWith('/rusitrki/') ? '/rusitrki/' : '/'));
    const cleanPath = path.replace(/^[\/]+/, '');
    const finalUrl = (root === '/' ? '/' : root) + cleanPath;
    if (window.location.pathname + window.location.search !== finalUrl) {
      window.history.pushState(null, document.title, finalUrl);
    }
  } catch (_) {}
};

const STORE = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("trki_" + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, val) {
    if (!VOCAB_SYNC_KEYS.has(key)) {
      this._write(key, val);
      return;
    }
    // Ghi lại đúng giá trị cũ (vd. trang tự tạo lọ mặc định khi mở) không tính là thay đổi
    let unchanged = false;
    try {
      const prev = localStorage.getItem("trki_" + key);
      unchanged = (val === null || val === undefined) ? prev === null : prev === JSON.stringify(val);
    } catch (_) {}
    if (unchanged) return;
    if (this._write(key, val)) {
      // Đánh dấu tiến độ từ vựng đã đổi để vocab-sync.js đẩy lên cloud
      // Luôn > mốc đã đồng bộ (mốc này có thể đến từ đồng hồ máy khác) để thay đổi không bị coi là "cũ"
      this._write("vocab_changed_at", Math.max(Date.now(), (Number(this.get("vocab_synced_at", 0)) || 0) + 1));
      if (window.Progress && typeof window.Progress.syncToCloud === "function") window.Progress.syncToCloud();
    }
  },
  /** Ghi thẳng vào localStorage (không đánh dấu thay đổi). Trả về false nếu ghi lỗi. */
  _write(key, val) {
    try {
      if (val === null || val === undefined) {
        localStorage.removeItem("trki_" + key);
      } else {
        localStorage.setItem("trki_" + key, JSON.stringify(val));
      }
      return true;
    } catch (e) {
      console.error("[STORE] Không lưu được '" + key + "':", e);
      if (!STORE._warnedWriteError && typeof toast === "function") {
        STORE._warnedWriteError = true;
        toast("Không lưu được tiến độ: bộ nhớ trình duyệt đã đầy hoặc bị chặn.");
      }
      return false;
    }
  }
};
// Các khóa localStorage thuộc tiến độ từ vựng, được đồng bộ qua user_progress.vocab_state
const VOCAB_SYNC_KEYS = new Set(["srs", "srs_totalReviews", "srs_totalCorrect", "vocab_mastered_words", "custom_jars", "quizlet_starred"]);
window.STORE = STORE;

// Chuẩn hóa ngày địa phương YYYY-MM-DD theo Spec Mục 8.12
const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Tính khoảng cách ngày theo UTC 00:00:00 chống lệch múi giờ
const getDiffDays = (dayStr1, dayStr2) => {
  if (!dayStr1 || !dayStr2) return 999;
  const parseToUtc = (str) => {
    if (str.includes('-')) {
      const parts = str.split('-').map(Number);
      return Date.UTC(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(str);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  };
  const t1 = parseToUtc(dayStr1);
  const t2 = parseToUtc(dayStr2);
  return Math.round(Math.abs(t1 - t2) / 86400000);
};

// ============================================================================
// HỆ THỐNG QUY TẮC ĐIỂM KINH NGHIỆM CHUẨN TOÀN DỰ ÁN (RUSI XP SYSTEM)
// ============================================================================
const RUSI_XP_RULES = {
  VOCAB_CARD_REVIEW: 10,
  VOCAB_QUIZ_PASS: 15,
  LISTENING_QUIZ_PASS: 15,
  LISTENING_DICTATION_PASS: 20,
  SPEAKING_ITEM_PASS: 10,
  SPEAKING_TOPIC_PASS: 25,
  WRITING_SUBMIT: 15,
  WRITING_PASS_BONUS: 15, // Đạt chuẩn >= 66% được thưởng thêm 15 XP (Tổng 30 XP)
  TRKI_SUBTEST_PASS: 20,
  TRKI_FULL_PASS: 50,
  STUDY_5MIN_DAILY: 10
};
window.RUSI_XP_RULES = RUSI_XP_RULES;

const Progress = {

  /**
   * Xác nhận chuỗi Streak ngày học (XP-Gated Streak & 5-Min Rule).
   * Yêu cầu: Đã hoàn thành 1 bài luyện bất kỳ HOẶC học liên tục >= 5 phút trong ngày.
   */
  validateTodayStreak(reason = "activity") {
    const todayStr = getLocalDateString();
    const lastValidDay = STORE.get("lastStreakDay", STORE.get("lastXpDay", ""));
    let currentStreak = STORE.get("streak", 0);

    if (lastValidDay !== todayStr) {
      if (!lastValidDay) {
        currentStreak = 1;
      } else {
        const diffDays = getDiffDays(todayStr, lastValidDay);
        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      }
      STORE.set("streak", currentStreak);
      STORE.set("lastStreakDay", todayStr);
      STORE.set("lastXpDay", todayStr);
      STORE.set("lastDay", todayStr);
      updateHeaderChips();
      this.syncToCloud();
    }
  },

  /**
   * Cộng XP chuẩn hoá và đồng bộ Streak, đám mây Supabase
   */
  addXp(n, meta = null) {
    if (!n || n <= 0) return;
    const xp = STORE.get("xp", 0) + n;
    STORE.set("xp", xp);

    // Kích hoạt tính ngày cho Streak
    this.validateTodayStreak((meta && meta.skill_type) || "xp");

    updateHeaderChips();
    toast(`+${n} XP!`);

    // Ghi nhận nhật ký luyện tập lên Supabase
    const logData = meta ? { ...meta, xp_earned: n } : null;
    this.syncToCloud(logData);

    // Bắn sự kiện cập nhật tiến độ thời gian thực cho các trang đang mở
    window.dispatchEvent(new CustomEvent("trki:progress-updated", { detail: { xp, streak: STORE.get("streak", 0) } }));
  },

  /**
   * Đánh dấu hoàn thành bài học, phân môn và lưu log lên Supabase
   */
  markDone(kind, id, meta = null) {
    const done = STORE.get(kind, []);
    if (!done.includes(id)) {
      done.push(id);
      STORE.set(kind, done);
    }

    // Hoàn thành 1 bài luyện -> đủ điều kiện có thêm streak ngày hôm nay
    this.validateTodayStreak("activity_" + kind);

    const logData = {
      skill_type: kind === "listenDone" ? "listening"
                : kind === "speakDone" ? "speaking"
                : kind === "writeDone" ? "writing"
                : kind === "trkiDone" ? "trki"
                : kind === "vocabDone" ? "vocab" : "practice",
      item_id: String(id),
      item_title: meta && meta.title ? String(meta.title) : String(id),
      score: meta && typeof meta.score === "number" ? meta.score : null,
      xp_earned: meta && typeof meta.xp === "number" ? meta.xp : 0,
      details: meta || {}
    };
    this.syncToCloud(logData);
    window.dispatchEvent(new CustomEvent("trki:progress-updated"));
  },

  doneList(kind) {
    return STORE.get(kind, []);
  },

  checkStreakStatus() {
    const todayStr = getLocalDateString();
    const lastValidDay = STORE.get("lastStreakDay", STORE.get("lastXpDay", STORE.get("lastDay", "")));

    if (lastValidDay && lastValidDay !== todayStr) {
      const diffDays = getDiffDays(todayStr, lastValidDay);
      if (diffDays > 1) {
        STORE.set("streak", 0);
      }
    }
    updateHeaderChips();
  },

  touchStreak() {
    this.checkStreakStatus();
  },

  /** userId hợp lệ khi đã đăng nhập Supabase, ngược lại null. */
  _cloudUserId() {
    const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);
    const userId = user && (user.uid || user.id);
    const isUUID = userId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId);
    return (window.RusiSupabase && window.RusiSupabase.isReady() && isUUID) ? userId : null;
  },

  /**
   * Đồng bộ tiến độ lên Supabase. Nhật ký luyện tập ghi ngay; bản tổng hợp user_progress
   * được gom lại (debounce) để nhiều thay đổi liên tiếp chỉ tạo một lần ghi.
   */
  async syncToCloud(practiceLog = null) {
    const userId = this._cloudUserId();
    if (!userId) return;
    if (practiceLog && window.RusiSupabase.userProgress && typeof window.RusiSupabase.userProgress.logPractice === "function") {
      window.RusiSupabase.userProgress.logPractice(userId, practiceLog).catch(() => {});
    }
    clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => { this.flushSync(); }, 2000);
  },

  /** Ghi ngay bản tổng hợp tiến độ (dùng khi rời trang, đăng xuất). */
  async flushSync() {
    clearTimeout(this._syncTimer);
    this._syncTimer = null;
    const userId = this._cloudUserId();
    // Chưa kéo bản cloud của đúng tài khoản này về → không ghi, tránh đè done_list/streak trên cloud bằng bản máy cũ.
    // Thay đổi vẫn nằm trên máy và được đẩy lên sau khi syncFromCloud xong.
    if (userId && this._pulledUid !== userId) return;
    if (userId) {
      // Gộp thay đổi từ thiết bị/tab khác kể từ lần kéo trước (vd. tab mở lâu) rồi mới ghi đè bản tổng hợp
      try {
        const remote = await window.RusiSupabase.userProgress.get(userId);
        if (remote) this._applyRemote(remote);
        if (remote && window.RusiVocabSync && window.RusiVocabSync.isDirty()) {
          await window.RusiVocabSync.refresh(userId, remote.vocab_updated_at);
        }
      } catch (err) {
        console.warn("[RusiSupabase] Không đọc được tiến độ trên cloud, hoãn đồng bộ:", err);
        return;
      }
      const streak = STORE.get("streak", 0);
      const xp = STORE.get("xp", 0);
      const doneList = {
        listenDone: STORE.get("listenDone", []),
        speakDone: STORE.get("speakDone", []),
        writeDone: STORE.get("writeDone", []),
        trkiDone: STORE.get("trkiDone", []),
        trkiSubDone: STORE.get("trkiSubDone", []),
        vocabDone: STORE.get("vocabDone", [])
      };
      const vocabStats = (typeof window.getSynchronizedVocabStats === "function") ? window.getSynchronizedVocabStats({ forCloud: true }) : {};
      // Khối tiến độ từ vựng chỉ gửi khi đã kéo bản cloud về và có thay đổi (xem vocab-sync.js)
      const vocabState = window.RusiVocabSync ? window.RusiVocabSync.payloadForPush(userId) : null;

      // 1. Lưu hồ sơ tổng hợp vào user_progress
      if (window.RusiSupabase.userProgress && typeof window.RusiSupabase.userProgress.save === "function") {
        const ok = await window.RusiSupabase.userProgress.save(userId, {
          xp_total: xp,
          streak_count: streak,
          // Ngày chuỗi học đã được tính (không phải "hôm nay"): ghi sớm ngày hôm nay khi chuỗi chưa +1 sẽ khiến server không nhận +1
          last_study_date: STORE.get("lastStreakDay", "") || getLocalDateString(),
          vocab_stats: vocabStats,
          done_list: doneList,
          vocab_state: vocabState
        });
        if (ok && vocabState) window.RusiVocabSync.markPushed(vocabState);
      }

      // 2. Đồng bộ gamification vào profiles
      if (window.RusiSupabase.profile && typeof window.RusiSupabase.profile.syncGamification === "function") {
        const lvl = typeof MascotRusika !== "undefined" ? MascotRusika.getLevel(xp) : 1;
        window.RusiSupabase.profile.syncGamification(userId, streak, xp, lvl).catch(() => {});
      }
    }
  },

  /** Gộp bản tổng hợp trên cloud vào máy. Trả true nếu máy có dữ liệu cloud chưa có (cần đẩy lên). */
  _applyRemote(remote) {
    let needPush = false;
    const localXp = STORE.get("xp", 0);
    if (typeof remote.xp_total === "number" && remote.xp_total > localXp) STORE.set("xp", remote.xp_total);
    else if (localXp > (Number(remote.xp_total) || 0)) needPush = true;
    const localStreak = STORE.get("streak", 0);
    if (typeof remote.streak_count === "number" && remote.streak_count > localStreak) STORE.set("streak", remote.streak_count);
    else if (localStreak > (Number(remote.streak_count) || 0)) needPush = true;
    // Chỉ nhận ngày học trên cloud khi mới hơn bản máy (ngày cũ hơn sẽ khiến chuỗi bị +1 lần nữa trong cùng ngày)
    if (remote.last_study_date) {
      if (remote.last_study_date > STORE.get("lastStreakDay", "")) STORE.set("lastStreakDay", remote.last_study_date);
      if (remote.last_study_date > STORE.get("lastXpDay", "")) STORE.set("lastXpDay", remote.last_study_date);
    }
    const remoteDone = (remote.done_list && typeof remote.done_list === "object") ? remote.done_list : {};
    ["listenDone", "speakDone", "writeDone", "trkiDone", "trkiSubDone", "vocabDone"].forEach(k => {
      const localList = STORE.get(k, []);
      const remoteList = Array.isArray(remoteDone[k]) ? remoteDone[k] : [];
      const merged = Array.from(new Set([...localList, ...remoteList]));
      if (merged.length !== localList.length) STORE.set(k, merged);
      if (merged.length > remoteList.length) needPush = true;
    });
    return needPush;
  },

  async syncFromCloud() {
    const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);
    const userId = user && (user.uid || user.id);
    const isUUID = userId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId);

    if (window.RusiSupabase && window.RusiSupabase.isReady() && isUUID && window.RusiSupabase.userProgress) {
      try {
        const remote = await window.RusiSupabase.userProgress.get(userId);
        // Máy này có tiến độ cloud chưa có (vd. học khi chưa đăng nhập, hay ghi bị hoãn) → đẩy lên sau khi gộp
        const needPush = remote ? this._applyRemote(remote) : true;
        this._pulledUid = userId;
        // Tiến độ từ vựng: chỉ tải khối vocab_state khi bản cloud mới hơn lần đồng bộ trước
        if (window.RusiVocabSync) {
          await window.RusiVocabSync.pull(userId, remote ? remote.vocab_updated_at : 0);
        }
        if (needPush) this.syncToCloud();
        this.checkStreakStatus();
        updateHeaderChips();
        window.dispatchEvent(new CustomEvent("trki:progress-updated"));
      } catch (err) {
        console.warn("[RusiSupabase] Lỗi đồng bộ tiến độ từ cloud:", err);
      }
    }
  }
};

function updateHeaderChips() {
  const xp = STORE.get("xp", 0);
  const streak = STORE.get("streak", 0);
  const xpChip = document.getElementById("chipXp");
  const streakChip = document.getElementById("chipStreak");
  const mascotChip = document.getElementById("chipMascot");
  if (xpChip) xpChip.innerHTML = (window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : "") + " " + xp + " XP";
  if (streakChip) streakChip.innerHTML = (window.RusiIcons ? RusiIcons.get("flame-streak", { size: 14 }) : "") + " " + streak + " ngày";
  if (mascotChip && typeof MascotRusika !== "undefined") {
    const lvl = MascotRusika.getLevel();
    mascotChip.innerHTML = `${MascotRusika.getSvg(lvl, currentSeason())} <span>Rusika Lv.${lvl}</span>`;
    mascotChip.title = MascotRusika.getTitle(lvl) + " (" + MascotRusika.getOutfit(currentSeason()) + ") — Bấm để xem";
  }
}

// ============================================================================
// MASCOT RUSIKA (BLUE-EYED RUSSIAN CAT) & 4-SEASON DYNAMIC OUTFIT
// ============================================================================
const MascotRusika = {
  getLevel(xp = null) {
    const val = xp !== null ? xp : (typeof STORE !== "undefined" ? STORE.get("xp", 0) : 0);
    if (val >= 1500) return 5;
    if (val >= 700) return 4;
    if (val >= 300) return 3;
    if (val >= 100) return 2;
    return 1;
  },

  getLevelInfo(xp = null) {
    const currentXp = xp !== null ? xp : (typeof STORE !== "undefined" ? STORE.get("xp", 0) : 0);
    const lvl = this.getLevel(currentXp);
    const thresholds = [
      { lvl: 1, min: 0, next: 100, title: "Mèo con Rusika (Cấp 1)", shortTitle: "Mèo con", badge: "Sơ cấp", desc: "Mèo con đeo chuông đỏ đáng yêu, tò mò khám phá bảng chữ cái Cyrillic" },
      { lvl: 2, min: 100, next: 300, title: "Mèo học trò Rusika (Cấp 2)", shortTitle: "Mèo học trò", badge: "Tập sự", desc: "Đeo kính vàng thông thái & cà vạt Nga, nắm vững từ vựng A1 và ngữ pháp căn bản" },
      { lvl: 3, min: 300, next: 700, title: "Mèo thông thái Rusika (Cấp 3)", shortTitle: "Mèo thông thái", badge: "Thông thái", desc: "Đội mũ cử nhân & nơ xanh lịch lãm, làm chủ 6 Cách và luyện nghe 4 Part CEFR" },
      { lvl: 4, min: 700, next: 1500, title: "Học sĩ Rusika (Cấp 4)", shortTitle: "Học sĩ Nga", badge: "Chuyên gia", desc: "Đội mũ lông Ushanka ấm áp & khăn len tuyết, tự tin giải trọn bộ đề thi TRKI B1" },
      { lvl: 5, min: 1500, next: null, title: "Đại hiệp Mèo Nga Rusika (Cấp 5)", shortTitle: "Đại hiệp Mèo", badge: "Huyền thoại", desc: "Đội vương miện Sa hoàng rực rỡ & áo choàng hoàng gia, bậc thầy TRKI đỉnh cao" }
    ];
    const item = thresholds[lvl - 1];
    let percent = 100;
    let remaining = 0;
    if (item.next !== null) {
      const range = item.next - item.min;
      const progress = Math.max(0, currentXp - item.min);
      percent = Math.min(100, Math.round((progress / range) * 100));
      remaining = Math.max(0, item.next - currentXp);
    }
    return {
      level: lvl,
      xp: currentXp,
      title: item.title,
      shortTitle: item.shortTitle,
      badge: item.badge,
      desc: item.desc,
      minXp: item.min,
      nextXp: item.next,
      percent,
      remaining
    };
  },

  getTitle(level) {
    const titles = {
      1: "Mèo con Rusika (Cấp 1)",
      2: "Mèo học trò Rusika (Cấp 2)",
      3: "Mèo thông thái Rusika (Cấp 3)",
      4: "Học sĩ Rusika (Cấp 4)",
      5: "Đại hiệp Mèo Nga Rusika (Cấp 5)"
    };
    return titles[level] || titles[1];
  },

  getShortTitle(level) {
    const titles = {
      1: "Mèo con",
      2: "Mèo học trò",
      3: "Mèo thông thái",
      4: "Học sĩ Nga",
      5: "Đại hiệp Mèo"
    };
    return titles[level] || titles[1];
  },

  getOutfit(season) {
    const outfits = {
      winter: "Mũ lông Ushanka & Áo len tuyết ấm áp",
      spring: "Vòng hoa xuân tươi mát & Khăn len nhẹ",
      summer: "Kính râm sành điệu & Mũ cói đi biển",
      autumn: "Khăn len ấm áp & Chiếc lá phong vàng"
    };
    return outfits[season] || outfits.winter;
  },

  getQuote() {
    const quotes = [
      "“Повторение — мать учения!” (Ôn tập là mẹ của sự học thành công!)",
      "Hôm nay bạn đã ôn tập các từ trong Lọ từ vựng chưa nào?",
      "Luyện phát âm câu nói mỗi ngày để ngữ điệu mềm mại chuẩn người Moskva nhé!",
      "Chứng chỉ ТРКИ không hề khó khi bạn luyện đề đều đặn với Rusika!",
      "“Терпение и труд всё перетрут” (Có công mài sắt, có ngày nên kim)!",
      "Mỗi ngày một chút, tiếng Nga sẽ trở thành người bạn thân của bạn!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  getSvg(level = 1, season = "winter", size = 64) {
    const uid = Math.random().toString(36).substring(2, 7);
    const lvl = Number(level) || 1;
    let accessorySvg = "";
    let auraSvg = "";

    if (lvl === 1) {
      accessorySvg = `
        <path d="M30 73 Q50 82 70 73" stroke="#e11d48" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <circle cx="50" cy="78" r="4.5" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
        <circle cx="50" cy="79" r="1.2" fill="#78350f"/>
      `;
    } else if (lvl === 2) {
      accessorySvg = `
        <circle cx="37" cy="49" r="10.5" stroke="#f59e0b" stroke-width="2.2" fill="rgba(254,243,199,0.25)"/>
        <circle cx="63" cy="49" r="10.5" stroke="#f59e0b" stroke-width="2.2" fill="rgba(254,243,199,0.25)"/>
        <path d="M47.5 49 Q50 46 52.5 49" stroke="#f59e0b" stroke-width="2.2" fill="none"/>
        <path d="M32 73 Q50 81 68 73" stroke="#1757a6" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <polygon points="46,75 54,75 52,89 48,89" fill="#dc2626"/>
        <rect x="47" y="75" width="6" height="4" fill="#ffffff"/>
      `;
    } else if (lvl === 3) {
      accessorySvg = `
        <polygon points="50,11 78,21 50,30 22,21" fill="#1e293b"/>
        <polygon points="36,25 64,25 61,33 39,33" fill="#0f172a"/>
        <circle cx="50" cy="20.5" r="2.2" fill="#f59e0b"/>
        <path d="M50 20.5 Q66 22 72 32" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <polygon points="70,32 74,32 72,39" fill="#f59e0b"/>
        <polygon points="43,72 43,82 50,77" fill="#1757a6"/>
        <polygon points="57,72 57,82 50,77" fill="#1757a6"/>
        <circle cx="50" cy="77" r="3" fill="#f59e0b"/>
      `;
    } else if (lvl === 4) {
      accessorySvg = `
        <path d="M24 35 Q50 16 76 35 L78 44 Q50 38 22 44 Z" fill="#334155"/>
        <path d="M18 39 Q20 59 27 57 Q30 45 29 39 Z" fill="#475569"/>
        <path d="M82 39 Q80 59 73 57 Q70 45 71 39 Z" fill="#475569"/>
        <circle cx="50" cy="31" r="5" fill="#dc2626"/>
        <polygon points="50,27.5 51.5,30 54.5,30 52,31.8 53,34.5 50,32.8 47,34.5 48,31.8 45.5,30 48.5,30" fill="#fef08a"/>
        <path d="M25 71 Q50 84 75 71" stroke="#dc2626" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M29 71 Q50 84 71 71" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,3" fill="none"/>
      `;
    } else {
      auraSvg = `
        <circle cx="16" cy="26" r="2" fill="#f59e0b" opacity="0.8"/>
        <circle cx="84" cy="26" r="2" fill="#f59e0b" opacity="0.8"/>
        <polygon points="85,38 87,42 91,42 88,44 89,48 85,46 81,48 82,44 79,42 83,42" fill="#f59e0b" opacity="0.75"/>
        <polygon points="15,38 17,42 21,42 18,44 19,48 15,46 11,48 12,44 9,42 13,42" fill="#f59e0b" opacity="0.75"/>
      `;
      accessorySvg = `
        <polygon points="32,24 38,9 50,17 62,9 68,24" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="38" cy="9" r="2.4" fill="#ef4444"/>
        <circle cx="50" cy="17" r="2.4" fill="#0284c7"/>
        <circle cx="62" cy="9" r="2.4" fill="#ef4444"/>
        <rect x="34" y="22" width="32" height="4.5" rx="1.5" fill="#b45309"/>
        <path d="M24 70 Q50 86 76 70" stroke="#991b1b" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M27 70 Q50 84 73 70" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <circle cx="50" cy="80" r="5" fill="#f59e0b" stroke="#b45309" stroke-width="1.2"/>
        <polygon points="50,77 51,79 53,79 51.5,80.5 52,82.5 50,81.5 48,82.5 48.5,80.5 47,79 49,79" fill="#991b1b"/>
      `;
    }

    const svgStyle = size ? `width:${size}px;height:${size}px;display:inline-block;vertical-align:middle;flex-shrink:0` : `width:100%;height:100%;display:block`;

    return `
    <svg viewBox="0 0 100 100" style="${svgStyle}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mascot Rusika Cấp ${lvl}">
      <defs>
        <linearGradient id="fur_${uid}" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop stop-color="#94a3b8"/>
          <stop offset="1" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="eye_${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#38bdf8"/>
          <stop offset="1" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      ${auraSvg}
      <polygon points="22,42 30,13 46,31" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <polygon points="26,38 32,19 42,31" fill="#f472b6" opacity="0.8"/>
      <polygon points="78,42 70,13 54,31" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <polygon points="74,38 68,19 58,31" fill="#f472b6" opacity="0.8"/>
      <ellipse cx="50" cy="54" rx="34" ry="29" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <ellipse cx="29" cy="62" rx="7" ry="4.5" fill="#fbcfe8" opacity="0.65"/>
      <ellipse cx="71" cy="62" rx="7" ry="4.5" fill="#fbcfe8" opacity="0.65"/>
      <ellipse cx="37" cy="49" rx="7.5" ry="8.5" fill="url(#eye_${uid})"/>
      <ellipse cx="63" cy="49" rx="7.5" ry="8.5" fill="url(#eye_${uid})"/>
      <ellipse cx="37" cy="49" rx="4.5" ry="6" fill="#0369a1"/>
      <ellipse cx="63" cy="49" rx="4.5" ry="6" fill="#0369a1"/>
      <circle cx="39.5" cy="46" r="2.8" fill="#ffffff"/>
      <circle cx="65.5" cy="46" r="2.8" fill="#ffffff"/>
      <circle cx="34.5" cy="52" r="1.3" fill="#ffffff"/>
      <circle cx="60.5" cy="52" r="1.3" fill="#ffffff"/>
      <polygon points="48,58 52,58 50,61" fill="#f43f5e"/>
      <path d="M44 63 Q47 66.5 50 63 Q53 66.5 56 63" stroke="#334155" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <line x1="15" y1="58" x2="28" y2="60" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="14" y1="64" x2="28" y2="63" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="85" y1="58" x2="72" y2="60" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="86" y1="64" x2="72" y2="63" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <ellipse cx="34" cy="80" rx="9" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
      <ellipse cx="66" cy="80" rx="9" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
      ${accessorySvg}
    </svg>`;
  },

  renderHeroCard(container) {
    if (!container) return;
    const xp = STORE.get("xp", 0);
    const streak = STORE.get("streak", 0);
    const lvl = this.getLevel(xp);
    const info = this.getLevelInfo(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    container.innerHTML = `
      <div class="rusika-card-inner">
        <!-- CỘT CON MÈO RUSIKA TIẾN HÓA THEO XP -->
        <div class="rusika-character-col">
          <div class="rusika-avatar-stage" id="rusikaAvatarStage" title="Bấm để trò chuyện với Rusi AI">
            <div class="rusika-avatar-glow"></div>
            <div class="rusika-avatar-svg-wrap">
              ${this.getSvg(lvl, season, 96)}
            </div>
            <span class="rusika-online-badge">
              <span class="online-dot"></span> Đang trực tuyến
            </span>
          </div>
          <div class="rusika-level-pill">
            <span class="pill-lvl">Cấp ${lvl}</span>
            <span class="pill-name">${esc(info.shortTitle)}</span>
          </div>
          <div class="rusika-xp-progress-wrap" title="${info.nextXp ? `Cần thêm ${info.remaining} XP để lên Cấp ${lvl + 1}` : 'Đã đạt cấp tối thượng!'}">
            <div class="rusika-xp-bar">
              <div class="rusika-xp-fill" style="width:${info.percent}%"></div>
            </div>
            <div class="rusika-xp-text">
              <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${xp} XP</span>
              <span>${info.nextXp ? `${info.percent}% (${info.remaining} XP lên Lv.${lvl + 1})` : `MAX ${window.RusiIcons ? RusiIcons.get('crown-vip', { size: 14 }) : ''}`}</span>
            </div>
          </div>
        </div>

        <!-- BONG BÓNG CHAT RUSIKA -->
        <div class="rusika-bubble-col">
          <div class="rusika-comic-bubble">
            <div class="rusika-bubble-header">
              <span class="bubble-tag">${window.RusiIcons ? RusiIcons.get("cat-mascot", { size: 14 }) : ""} BẠN ĐỒNG HÀNH AI · ${this.getTitle(lvl).toUpperCase()}</span>
              <span class="bubble-streak">${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 14 }) : ""} Chuỗi học: <b>${streak} ngày</b></span>
            </div>
            <div class="rusika-bubble-message">
              “Привет! Mình là Rusi AI. Hôm nay bạn muốn luyện từ vựng, nghe 4 Part CEFR hay sửa phát âm cùng mình? Nhấn vào đây để trò chuyện nhé! 🐾”
            </div>

            <!-- GỢI Ý CÂU HỎI TRỰC QUAN -->
            <div class="rusika-quick-prompts">
              <span class="prompts-label">Gợi ý chủ đề:</span>
              <div class="prompts-pills">
                <button type="button" class="btn-prompt-chip" data-prompt="Gợi ý đề thi TRKI A1–B2 phù hợp cho mình">Đề thi TRKI</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Quy tắc đánh trọng âm và phát âm tiếng Nga chuẩn">Luyện phát âm</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Giải thích 6 Cách trong tiếng Nga ngắn gọn dễ hiểu">6 Cách tiếng Nga</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Cách chia động từ tiếng Nga theo ngôi và thể">Chia động từ</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Điều kiện và kinh nghiệm xin học bổng Du học Nga">Học bổng Du học Nga</button>
              </div>
            </div>

            <div class="rusika-bubble-cta-row">
              <button class="btn btn-primary btn-chat-trigger" id="btnInteractRusika" type="button">
                <span>Mở cửa sổ trò chuyện với Rusika</span>
                <span class="cta-arrow">${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : "→"}</span>
              </button>
              <span class="cta-hint">Hoàn toàn miễn phí · Phản hồi tức thì</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const btn = container.querySelector("#btnInteractRusika");
    if (btn) btn.onclick = () => this.openChat();

    const stage = container.querySelector("#rusikaAvatarStage");
    if (stage) stage.onclick = () => this.openChat();

    container.querySelectorAll(".btn-prompt-chip").forEach((chip) => {
      chip.onclick = (e) => {
        e.stopPropagation();
        this.openChat(chip.dataset.prompt);
      };
    });
  },

  renderFloatingWidget() {
    const p = document.body ? document.body.dataset.page : "";
    const learningPages = ["vocabulary", "listening", "speaking", "writing", "mock-test", "admin", "login", "signup"];
    if (learningPages.includes(p) || (document.body && document.body.classList.contains("in-workspace"))) {
      const existing = document.getElementById("rusikaFloatingWidget");
      if (existing) existing.remove();
      return;
    }
    let widget = document.getElementById("rusikaFloatingWidget");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "rusikaFloatingWidget";
      widget.className = "rusika-floating-widget";
      document.body.appendChild(widget);
    }
    const xp = STORE.get("xp", 0);
    const lvl = this.getLevel(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    widget.innerHTML = `
      <div class="rusika-float-tooltip" id="rusikaFloatTooltip">
        <span>Мяу! Trò chuyện cùng Rusika nhé</span>
        <button class="rusika-tooltip-close" id="rusikaTooltipClose" type="button" aria-label="Đóng">&times;</button>
      </div>
      <button class="rusika-float-btn" id="rusikaFloatBtn" type="button" title="Mở hộp trò chuyện với Rusi AI (Lv.${lvl})">
        <div class="rusika-float-avatar">
          ${this.getSvg(lvl, season, 52)}
        </div>
        <span class="rusika-float-badge">Lv.${lvl}</span>
        <span class="rusika-float-pulse"></span>
      </button>
    `;

    const btn = widget.querySelector("#rusikaFloatBtn");
    if (btn) {
      btn.onclick = () => this.toggleChat();
    }
    const closeBtn = widget.querySelector("#rusikaTooltipClose");
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        const tooltip = document.getElementById("rusikaFloatTooltip");
        if (tooltip) {
          tooltip.style.display = "none";
          tooltip.dataset.closedByUser = "true";
        }
      };
    }
  },

  openChat(initialPrompt = null) {
    let overlay = document.getElementById("rusikaChatOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "rusikaChatOverlay";
      overlay.className = "rusika-chat-overlay";
      document.body.appendChild(overlay);

      const xp = STORE.get("xp", 0);
      const lvl = this.getLevel(xp);
      const info = this.getLevelInfo(xp);
      const season = typeof currentSeason === "function" ? currentSeason() : "winter";

      overlay.innerHTML = `
        <div class="rusika-chat-window" id="rusikaChatWindow">
          <div class="rusika-chat-drag-handle"></div>
          <div class="rusika-chat-header">
            <div class="rusika-chat-header-info">
              <div class="rusika-chat-avatar-mini" id="chatHeaderAvatar">
                ${this.getSvg(lvl, season, 42)}
              </div>
              <div>
                <div class="chat-header-title">
                  <b>Rusi AI</b>
                  <span class="chat-online-dot" title="Đang trực tuyến"></span>
                </div>
                <div class="chat-header-sub" id="chatHeaderSub">
                  <span>${esc(info.shortTitle)} · Cấp ${lvl}</span> • <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${info.xp} XP</span>
                </div>
              </div>
            </div>
            <div class="rusika-chat-header-actions">
              <button class="chat-action-btn" id="closeRusikaChat" type="button" aria-label="Đóng">&times;</button>
            </div>
          </div>

          <div class="rusika-chat-body" id="rusikaChatMessages">
            <div class="chat-msg msg-ai">
              <div class="msg-avatar" id="msgAvatarInitial">${this.getSvg(lvl, season, 32)}</div>
              <div class="msg-bubble">
                <p><b>Привет!</b> Mình là <b>Rusi AI</b> — bạn đồng hành luyện thi tiếng Nga của bạn.</p>
                <p>Hôm nay bạn muốn luyện nghe, giải thích ngữ pháp hay tìm đề thi TRKI nào? Hãy nhấn gợi ý bên dưới hoặc gõ tin nhắn cho mình nhé!</p>
              </div>
            </div>

            <div class="chat-chips-container" id="chatQuickChips">
              <button type="button" class="chat-chip-btn" data-query="Gợi ý đề thi TRKI A1–B2 phù hợp cho mình">Đề thi TRKI</button>
              <button type="button" class="chat-chip-btn" data-query="Quy tắc đánh trọng âm và phát âm tiếng Nga">Luyện phát âm</button>
              <button type="button" class="chat-chip-btn" data-query="Giải thích 6 Cách trong tiếng Nga ngắn gọn">6 Cách tiếng Nga</button>
              <button type="button" class="chat-chip-btn" data-query="Cách chia động từ tiếng Nga theo ngôi">Chia động từ</button>
              <button type="button" class="chat-chip-btn" data-query="Điều kiện và kinh nghiệm xin học bổng Du học Nga">Học bổng Du học Nga</button>
              <button type="button" class="chat-chip-btn" data-query="Làm thế nào để Rusi AI tăng cấp XP?">Tăng cấp Rusi AI</button>
            </div>
          </div>

          <form class="rusika-chat-footer" id="rusikaChatForm">
            <input type="text" id="rusikaChatInput" placeholder="Nhập câu hỏi bằng tiếng Việt hoặc tiếng Nga..." autocomplete="off" />
            <button type="submit" id="btnSendRusikaChat" aria-label="Gửi tin nhắn">
              ${window.RusiIcons ? RusiIcons.get("send", { size: 18 }) : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`}
            </button>
          </form>
        </div>
      `;

      overlay.querySelector("#closeRusikaChat").onclick = () => this.closeChat();
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeChat();
      });

      const form = overlay.querySelector("#rusikaChatForm");
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = overlay.querySelector("#rusikaChatInput");
        const val = input.value.trim();
        if (val) {
          input.value = "";
          this.sendUserMessage(val);
        }
      };

      overlay.querySelectorAll(".chat-chip-btn").forEach((chip) => {
        chip.onclick = () => {
          this.sendUserMessage(chip.dataset.query);
        };
      });
    }

    overlay.style.display = "flex";
    document.body.classList.add("rusika-chat-open");

    const tooltip = document.getElementById("rusikaFloatTooltip");
    if (tooltip) tooltip.style.display = "none";

    const messages = document.getElementById("rusikaChatMessages");
    if (messages) messages.scrollTop = messages.scrollHeight;

    const input = document.getElementById("rusikaChatInput");
    if (input) {
      if (initialPrompt) {
        input.value = initialPrompt;
        const form = document.getElementById("rusikaChatForm");
        if (form) form.dispatchEvent(new Event("submit"));
      } else {
        setTimeout(() => input.focus(), 150);
      }
    }
  },

  closeChat() {
    const overlay = document.getElementById("rusikaChatOverlay");
    if (overlay) overlay.style.display = "none";
    document.body.classList.remove("rusika-chat-open");
    const tooltip = document.getElementById("rusikaFloatTooltip");
    if (tooltip && !tooltip.dataset.closedByUser && !document.body.classList.contains("in-workspace")) {
      tooltip.style.display = "";
    }
  },

  toggleChat() {
    const overlay = document.getElementById("rusikaChatOverlay");
    if (overlay && overlay.style.display === "flex") {
      this.closeChat();
    } else {
      this.openChat();
    }
  },

  showModal() {
    this.openChat();
  },

  sendUserMessage(text) {
    const messages = document.getElementById("rusikaChatMessages");
    if (!messages) return;

    // 1. Thêm tin nhắn của người dùng
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg msg-user";
    userMsg.innerHTML = `<div class="msg-bubble">${esc(text)}</div>`;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    // 2. Thêm chỉ báo Rusika đang gõ
    const xp = STORE.get("xp", 0);
    const oldLvl = this.getLevel(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    const typingMsg = document.createElement("div");
    typingMsg.className = "chat-msg msg-ai msg-typing";
    typingMsg.id = "rusikaTypingIndicator";
    typingMsg.innerHTML = `
      <div class="msg-avatar">${this.getSvg(oldLvl, season, 32)}</div>
      <div class="msg-bubble">
        <div class="rusika-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messages.appendChild(typingMsg);
    messages.scrollTop = messages.scrollHeight;

    // 3. Phản hồi thông minh sau 400ms
    setTimeout(() => {
      const typing = document.getElementById("rusikaTypingIndicator");
      if (typing) typing.remove();

      const reply = this.generateAiReply(text);

      // Chat với Rusika không cộng XP (XP chỉ đến từ hoạt động học có kiểm chứng)
      const aiMsg = document.createElement("div");
      aiMsg.className = "chat-msg msg-ai";
      aiMsg.innerHTML = `
        <div class="msg-avatar">${this.getSvg(oldLvl, season, 32)}</div>
        <div class="msg-bubble">
          <div class="reply-title"><b>${esc(reply.title)}</b></div>
          <div class="reply-text">${reply.text.replace(/\n/g, "<br>")}</div>
        </div>
      `;
      messages.appendChild(aiMsg);

      this.updateAllViews();
      messages.scrollTop = messages.scrollHeight;
    }, 450);
  },

  generateAiReply(q) {
    const query = (q || "").toLowerCase().trim();
    if (/trki|đề thi|thi thử|chứng chỉ|torfl/i.test(query)) {
      return {
        title: "Cẩm nang Đề thi TRKI chuẩn quốc tế",
        text: "Hệ thống chứng chỉ TRKI (TORFL) gồm các cấp độ từ A1 đến B2:\n• <b>TRKI A1 (Элементарный)</b>: Yêu cầu ~780 từ vựng, giao tiếp sinh hoạt và xã hội căn bản.\n• <b>TRKI A2 (Базовый)</b>: ~1.300 từ vựng, chuẩn đủ điều kiện học khoa dự bị tại các trường ĐH Nga.\n• <b>TRKI B1 (Первый)</b>: ~2.300 từ vựng, điều kiện bắt buộc nhập học Đại học chính quy tại LB Nga.\n• <b>TRKI B2 (Второй)</b>: ~10.000 từ vựng, chuẩn tốt nghiệp cử nhân và thạc sĩ tại Nga.\n\n👉 Điểm đạt là <b>66%</b> trên mỗi bài thi con. Hãy vào mục <b>“Thi thử TRKI”</b> trên website để làm quen với ngân hàng đề thi chuẩn nhé!"
      };
    } else if (/phát âm|trọng âm|ударение|đọc/i.test(query)) {
      return {
        title: "Quy tắc Phát âm & Trọng âm tiếng Nga",
        text: "Trọng âm (Ударение) là linh hồn của phát âm tiếng Nga:\n1. <b>Biến âm chữ О</b>: Khi có trọng âm phát âm rõ [O]. Khi không mang trọng âm giảm thành âm [A] ngắn (vd: молоко đọc là [mə-la-kó]).\n2. <b>Biến âm chữ Е/Я</b>: Khi không mang trọng âm phát âm nhẹ gần như âm [I] (vd: река đọc là [ri-ká]).\n3. <b>Âm câm & biến đổi cuối từ</b>: Các phụ âm vang (звонкие: б, в, г, д, ж, з) đứng cuối từ sẽ bị vô thanh hóa (г -> к, д -> т, б -> п, vd: хлеб đọc là [khlep]).\n\n👉 Hãy vào mục <b>“Luyện nói & AI Rusika”</b> để Rusika trực tiếp sửa lỗi phát âm cho bạn nhé!"
      };
    } else if (/chia động từ|động từ|ngôi|спряжение/i.test(query)) {
      return {
        title: "Cách chia Động từ tiếng Nga (Спряжение)",
        text: "Tiếng Nga có 2 nhóm chia động từ chính theo ngôi:\n• <b>Nhóm I (Спряжение I)</b>: Tận cùng -ать, -ять, -еть -> đuôi chia: <b>-ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут</b> (Ví dụ: Читать -> читаю, читаешь, читает, читаем, читаете, читают).\n• <b>Nhóm II (Спряжение II)</b>: Thường tận cùng -ить -> đuôi chia: <b>-ю/-у, -ишь, -ит, -им, -ите, -ят/-ат</b> (Ví dụ: Говорить -> говорю, говоришь, говорит, говорим, говорите, говорят).\n\n💡 Lưu ý cặp thể động từ <b>НСВ</b> (chưa hoàn thành: quá trình, lặp đi lặp lại) và <b>СВ</b> (hoàn thành: kết quả duy nhất)!"
      };
    } else if (/cách|падеж|biến cách|danh từ/i.test(query)) {
      return {
        title: "Hệ thống 6 Cách trong tiếng Nga (6 Падежей)",
        text: "6 Cách là xương sống của ngữ pháp tiếng Nga:\n• <b>Cách 1 (Именительный)</b>: Chủ ngữ trong câu (Кто? Что?)\n• <b>Cách 2 (Родительный)</b>: Sở hữu, phủ định 'нет', số lượng (Кого? Чего? Откуда?)\n• <b>Cách 3 (Дательный)</b>: Người nhận, tuổi tác, gián tiếp (Кому? Чему?)\n• <b>Cách 4 (Винительный)</b>: Bổ ngữ trực tiếp, hướng chuyển động (Кого? Что? Куда?)\n• <b>Cách 5 (Творительный)</b>: Phương tiện, công cụ, nghề nghiệp, đi cùng ai (Кем? Чем? С кем?)\n• <b>Cách 6 (Предложный)</b>: Địa điểm ở đâu, chủ đề suy nghĩ/nói (Где? О ком? О чём?)"
      };
    } else if (/học bổng|du học|nga/i.test(query)) {
      return {
        title: "Học bổng Du học Nga",
        text: "Học bổng Hiệp định giữa Bộ GD&ĐT Việt Nam và Liên bang Nga:\n• <b>Quyền lợi</b>: Miễn 100% học phí suốt 4–6 năm, đài thọ ký túc xá, bảo hiểm y tế và cấp sinh hoạt phí hàng tháng song phương (từ cả phía Nga và phía Việt Nam).\n• <b>Tiêu chuẩn</b>: Điểm trung bình GPA THPT hoặc Đại học từ 7.0+ (khuyên dùng 8.0+ để cạnh tranh hồ sơ).\n• <b>Trình độ tiếng</b>: Chưa biết tiếng Nga vẫn nộp được vì bạn sẽ được đài thọ 1 năm học tiếng Nga dự bị tại các trường danh tiếng như MGU, SPbU, Bauman, HSE..."
      };
    } else if (/tăng cấp|tiến hóa|xp|cấp độ|mèo/i.test(query)) {
      return {
        title: "Hệ thống Tiến hóa của Mèo Rusika",
        text: "Rusika sẽ lớn lên và thay đổi trang phục theo điểm XP của bạn:\n• <b>Cấp 1 (0–99 XP)</b>: Mèo con đeo chuông đỏ đáng yêu 🌱\n• <b>Cấp 2 (100–299 XP)</b>: Mèo học trò kính vàng & cà vạt Nga 📚\n• <b>Cấp 3 (300–699 XP)</b>: Mèo thông thái mũ cử nhân & nơ xanh 🎓\n• <b>Cấp 4 (700–1499 XP)</b>: Học sĩ Mũ lông Ushanka ấm áp ❄️\n• <b>Cấp 5 (1500+ XP)</b>: Đại hiệp Mèo Vương miện Hoàng gia Sa hoàng 👑\n\n👉 Nhận XP bằng cách: Học Lọ từ vựng (+10 XP), làm bài thi thử (+50 XP) và viết bài luận (+30 XP)!"
      };
    } else {
      return {
        title: "Rusika luôn sẵn sàng hỗ trợ bạn!",
        text: "Мяу! Rất vui được đồng hành cùng bạn học tiếng Nga! Phương pháp tốt nhất là <b>học đều đặn 15 phút mỗi ngày</b>.\n\nBạn có thể hỏi Rusika về <b>Đề thi TRKI</b>, <b>Ngữ pháp 6 Cách</b>, <b>Cách chia động từ</b>, <b>Quy tắc trọng âm</b> hoặc kinh nghiệm <b>Du học Nga</b> nhé! Rusika luôn sẵn sàng giải đáp! ✨"
      };
    }
  },

  updateAllViews() {
    const xp = STORE.get("xp", 0);
    const lvl = this.getLevel(xp);
    const info = this.getLevelInfo(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    // 1. Cập nhật chip header
    const chipXp = document.getElementById("chipXp");
    if (chipXp) chipXp.innerHTML = (window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : "") + " " + xp + " XP";
    const chipMascot = document.getElementById("chipMascot");
    if (chipMascot) {
      chipMascot.innerHTML = `${this.getSvg(lvl, season, 22)} <span>Rusika Lv.${lvl}</span>`;
      chipMascot.title = this.getTitle(lvl);
    }

    // 2. Cập nhật hero card nếu đang ở index
    const heroCard = document.getElementById("rusikaHeroCard");
    if (heroCard) {
      this.renderHeroCard(heroCard);
    }

    // 3. Cập nhật floating widget
    const floatBtn = document.getElementById("rusikaFloatBtn");
    if (floatBtn) {
      const avatarWrap = floatBtn.querySelector(".rusika-float-avatar");
      if (avatarWrap) avatarWrap.innerHTML = this.getSvg(lvl, season, 52);
      const badge = floatBtn.querySelector(".rusika-float-badge");
      if (badge) badge.textContent = `Lv.${lvl}`;
    }

    // 4. Cập nhật chat header
    const chatAvatar = document.getElementById("chatHeaderAvatar");
    if (chatAvatar) chatAvatar.innerHTML = this.getSvg(lvl, season, 42);
    const chatSub = document.getElementById("chatHeaderSub");
    if (chatSub) chatSub.innerHTML = `<span>${esc(info.shortTitle)} · Cấp ${lvl}</span> • <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${info.xp} XP</span>`;

    // 5. Cập nhật pwXp nếu có
    const pwXp = document.getElementById("pwXp");
    if (pwXp) pwXp.textContent = xp;
  }
};

// ============================================================================
// HỆ THỐNG GÓI CƯỚC & THANH TOÁN VIETQR TỰ ĐỘNG CHUẨN HIỆN NAY (MONETIZATION 2.0)
// ============================================================================
const Monetization = {
  _timerInterval: null,

  /** Lấy thông tin người dùng hiện tại (từ Auth hoặc STORE) */
  getCurrentUser() {
    return (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
  },

  /** Kiểm tra trạng thái PRO của người dùng hiện tại */
  isPro() {
    const user = this.getCurrentUser();
    if (!user || !user.is_pro) return false;
    if (user.pro_expires_at && new Date(user.pro_expires_at).getTime() < Date.now()) return false;
    return true;
  },

  /** Lấy thông tin chi tiết gói PRO đã kích hoạt */
  getProInfo() {
    if (!this.isPro()) return null;
    const user = this.getCurrentUser();
    if (!user) return null;
    const proData = {
      active: true,
      // Gói đã xác nhận; nếu admin duyệt khi modal đã đóng thì dùng gói vừa đặt gần nhất
      pkgId: STORE.get("pro_active_pkg", STORE.get("pro_pending_pkg", "pro_1y")),
      pkgTitle: "Gói PRO",
      expiresAt: user.pro_expires_at,
      isLifetime: !user.pro_expires_at,
      activatedAt: null
    };

    // Tên gói thật: chỉ khi đã biết chắc gói đang dùng (đơn đã xác nhận), không đoán theo gói mặc định
    const confirmedPkgId = STORE.get("pro_active_pkg", null);
    const confirmedPkg = confirmedPkgId && Array.isArray(window.PACKAGES) ? window.PACKAGES.find((p) => p && p.id === confirmedPkgId) : null;
    if (confirmedPkg && (confirmedPkg.title || confirmedPkg.name)) proData.pkgTitle = confirmedPkg.title || confirmedPkg.name;

    // Số ngày còn lại (làm tròn lên; 0 = hết hạn trong hôm nay)
    let daysRemaining = null;
    if (proData.expiresAt && !proData.isLifetime) {
      const ms = new Date(proData.expiresAt).getTime() - Date.now();
      if (Number.isFinite(ms)) daysRemaining = Math.max(0, Math.ceil(ms / 86400000));
    }

    let expiresFormatted = "Đang kích hoạt";
    if (proData.isLifetime || proData.pkgId === "pro_vip") {
      expiresFormatted = "Vĩnh viễn (Trọn đời)";
    } else if (proData.expiresAt) {
      try {
        const d = new Date(proData.expiresAt);
        expiresFormatted = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      } catch (_) {}
    }

    return {
      active: true,
      pkgId: proData.pkgId || "pro_1y",
      pkgTitle: proData.pkgTitle || "Gói PRO",
      expiresAt: proData.expiresAt,
      expiresFormatted,
      daysRemaining,
      isLifetime: Boolean(proData.isLifetime || proData.pkgId === "pro_vip"),
      activatedAt: proData.activatedAt
    };
  },

  /** Quyền PRO chỉ được cập nhật từ profiles sau khi quản trị duyệt đơn. */
  async setPro() {
    if (window.Auth && typeof window.Auth.refreshProfile === "function") {
      await window.Auth.refreshProfile();
    }
    updateHeaderChips();
    if (typeof renderUserArea === "function") renderUserArea();
    if (typeof window.renderPricingGrid === "function") window.renderPricingGrid();
    return this.isPro();
  },

  /** Lấy danh sách gói cước chuẩn */
  getPackages() {
    let raw = [];
    if (typeof window !== "undefined" && window.PACKAGES && window.PACKAGES.length > 0) {
      raw = window.PACKAGES;
    } else if (typeof PACKAGES !== "undefined" && PACKAGES.length > 0) {
      raw = PACKAGES;
    } else {
      raw = [
      {
        id: "pro_1m",
        badge: "NƯỚC RÚT",
        title: "Gói Nước Rút 1 Tháng",
        desc: "Phù hợp cho học viên còn 2–4 tuần nữa vào phòng thi thật, cần cày đề cấp tốc để quen áp lực phòng thi.",
        price: 399000,
        priceOld: 590000,
        popular: false,
        features: [
          "Mở khóa toàn bộ 91 đề thi TRKI A1–C2 (6.600+ câu hỏi)",
          "Bấm giờ phòng thi thật & chấm điểm tự động chuẩn CBT",
          "Tùy chọn đảo ngẫu nhiên đáp án chống học vẹt",
          "Đáp án & giải thích ngữ pháp 6 cách chi tiết",
          "AI nhận diện & chấm điểm phát âm cơ bản",
          "Đồng bộ tiến độ học tập trên mọi thiết bị"
        ]
      },
      {
        id: "pro_3m",
        badge: "PHỔ BIẾN NHẤT",
        title: "Gói Bứt Phá 3 Tháng",
        desc: "Chu kỳ vàng hoàn thành 1 cấp độ (A1→A2 hoặc A2→B1), sinh viên ôn thi học phần và săn học bổng Nga.",
        price: 899000,
        priceOld: 1450000,
        popular: true,
        features: [
          "Tất cả quyền lợi của gói 1 Tháng",
          "Luyện nói Shadowing cùng AI toàn bộ 28 bài học",
          "Kho 33 Lọ từ vựng hệ thống & 5.000+ từ vựng chuẩn TRKI",
          "Không giới hạn tạo Lọ từ vựng cá nhân (thuật toán SM-2)",
          "Mở khóa trọn bộ kho Luyện nghe CEFR",
          "Biểu đồ radar phân tích điểm mạnh / điểm yếu từng kỹ năng",
          "Tiết kiệm 25% chi phí so với mua lẻ từng tháng"
        ]
      },
      {
        id: "pro_1y",
        badge: "GIÁ TRỊ CAO NHẤT",
        title: "Gói Toàn Diện 1 Năm",
        desc: "Đồng hành trọn vẹn 1 năm Khoa dự bị (Подфак) tại Nga hoặc cả năm học chuyên ngành đại học.",
        price: 1899000,
        priceOld: 3500000,
        popular: false,
        features: [
          "Tất cả quyền lợi của gói 3 Tháng",
          "Mở khóa toàn bộ 11 đề Luyện viết tự luận (Письмо) với 20 lượt chấm AI mỗi ngày",
          "Đặc quyền kho 5.000+ từ vựng & phân tích ngữ pháp chuyên sâu",
          "Tặng bộ cẩm nang sinh tồn & kinh nghiệm du học Nga",
          "Ưu tiên hỗ trợ kỹ thuật và học thuật 1-1",
          "Tiết kiệm tới 60% chi phí (~158.000đ / tháng)"
        ]
      }
    ];
    }
    const seen = new Set();
    const result = [];
    for (const p of raw) {
      const pid = (p.id || "").toLowerCase();
      if (!pid || seen.has(pid)) continue;
      seen.add(pid);
      result.push(p);
    }
    return result;
  },

  /**
   * Popup cửa sổ "Nội dung dành cho PRO" khi người dùng chưa mua kích vào xem.
   * Có 2 lựa chọn: "Tìm hiểu gói PRO" (chuyển sang upgrade.html) và "Để sau" (đóng cửa sổ).
   */
  showProGateModal(customTitle = "Nội dung dành riêng cho Hội viên PRO", customDesc = "") {
    let modal = document.getElementById("proGateModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "proGateModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    const defaultDesc = "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng B1–B2, đề thi thử ТРКИ chuẩn quốc tế, bài luyện nghe video thực tế, AI chấm bài tự luận (20 lượt mỗi ngày) và nhận diện phát âm không giới hạn.";
    const descText = customDesc || defaultDesc;
    const user = this.getCurrentUser();

    modal.innerHTML = `
      <div class="vietqr-card pro-gate-card">
        <button class="vietqr-close" id="closeProGate" title="Đóng">&times;</button>
        
        <div class="pro-gate-header">
          <div class="pro-gate-crown-badge">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 24 }) : ""}</div>
          <span class="pro-gate-kicker">RUSI TRKI • ĐẶC QUYỀN HỘI VIÊN</span>
          <h3 class="pro-gate-title">${esc(customTitle)}</h3>
        </div>

        <div class="pro-gate-body">
          <p class="pro-gate-desc">${esc(descText)}</p>
        </div>

        <div class="pro-gate-actions">
          <button type="button" class="btn btn-outline pro-gate-btn-dismiss" id="btnProGateDismiss">
            Để sau
          </button>
          ${user ? `
            <button type="button" class="btn btn-primary pro-gate-btn-upgrade" id="btnProGateQuickPay" style="display:inline-flex;align-items:center;gap:6px">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Kích hoạt ngay
            </button>
          ` : `
            <a href="upgrade.html" class="btn btn-primary pro-gate-btn-upgrade" id="btnProGateUpgrade" style="display:inline-flex;align-items:center;gap:6px">
              Xem bảng giá & ưu đãi ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : "→"}
            </a>
          `}
        </div>
        ${user ? `
          <div style="text-align:center;margin-top:12px;font-size:0.86rem">
            <a href="upgrade.html" style="color:var(--muted);text-decoration:underline">Xem so sánh chi tiết các gói cước →</a>
          </div>
        ` : ""}
      </div>
    `;

    const closeModal = () => {
      modal.remove();
      document.removeEventListener("keydown", handleEsc);
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.getElementById("closeProGate").onclick = closeModal;
    document.getElementById("btnProGateDismiss").onclick = closeModal;
    const quickPayBtn = document.getElementById("btnProGateQuickPay");
    if (quickPayBtn) {
      quickPayBtn.onclick = () => {
        closeModal();
        Monetization.openUpgradeModal("pro_3m");
      };
    }
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
    document.addEventListener("keydown", handleEsc);
  },

  /** Modal nhắc nhở người dùng chưa đăng nhập khi bấm vào tính năng nâng cấp / paywall */
  showAuthRequiredModal(title = "Nâng cấp tài khoản PRO", reason = "Vui lòng đăng nhập để gắn quyền PRO vào tài khoản và bảo lưu quyền lợi trọn đời.", targetPkg = "") {
    let modal = document.getElementById("authReqModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "authReqModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    const hash = window.location.hash || "";
    let cleanPath = (window.location.pathname + window.location.search).replace(/^\//, '') || "index.html";
    if (targetPkg) {
      const sep = cleanPath.includes("?") ? "&" : "?";
      cleanPath = `${cleanPath}${sep}pkg=${encodeURIComponent(targetPkg)}`;
    }
    const redirectTarget = cleanPath + hash;
    const currentRedirect = encodeURIComponent(redirectTarget);

    modal.innerHTML = `
      <div class="vietqr-card" style="max-width:480px">
        <button class="vietqr-close" id="closeAuthReq">&times;</button>
        <div class="auth-req-card">
          <div class="auth-req-icon">${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 48 }) : ""}</div>
          <h3>${esc(title)}</h3>
          <p>${esc(reason)}</p>
          <div class="auth-req-buttons">
            <a class="btn btn-primary btn-lg" href="login.html?redirect=${currentRedirect}" style="text-decoration:none">
              Đăng nhập tài khoản
            </a>
            <a class="btn btn-outline" href="signup.html?redirect=${currentRedirect}" style="text-decoration:none">
              Đăng ký tài khoản mới
            </a>
          </div>
        </div>
      </div>
    `;

    document.getElementById("closeAuthReq").onclick = () => modal.remove();
  },

  /**
   * Mở Modal Thanh Toán VietQR 2.0 Chuẩn Hiện Nay:
   * - Hiển thị tài khoản người dùng thụ hưởng
   * - Hỗ trợ Tabs chuyển đổi linh hoạt 3 gói cước (1 Tháng / 3 Tháng / 1 Năm)
   * - Sinh mã QR và cú pháp định danh theo tài khoản
   * - Bộ đếm ngược 15:00
   * - Sao chép 1-chạm thông minh
   * - Kích hoạt tự động kèm hiệu ứng chúc mừng (Confetti)
   */
  openUpgradeModal(pkgId = "pro_3m") {
    const user = this.getCurrentUser();
    const isGuest = user && (String(user.id || user.uid || "").startsWith("guest_") || user.isGuest);
    // Chuẩn hiện nay: Nâng cấp yêu cầu phiên đăng nhập để gắn quyền PRO
    if (!user || isGuest) {
      this.showAuthRequiredModal("Đăng nhập để Nâng cấp PRO", "Để kích hoạt và bảo lưu gói PRO vĩnh viễn trên mọi thiết bị, bạn cần đăng nhập tài khoản trước.", pkgId);
      return;
    }

    const pkgs = this.getPackages();
    let normId = (pkgId || "pro_3m").toLowerCase();
    let currentPkg = pkgs.find((p) => (p.id || "").toLowerCase() === normId) || pkgs[1] || pkgs[0];

    // Đơn được ghi lên server ngay khi hiện mã QR (mỗi gói một đơn trong phiên này): học viên chuyển khoản rồi đóng tab
    // vẫn có đơn để đối soát. Mã đơn (nội dung CK), số tiền và hạn do server quyết định.
    const orderByPkg = {};
    const ensureOrder = async (pkg) => {
      const key = pkg.id;
      if (orderByPkg[key] && !orderByPkg[key].error) return;
      orderByPkg[key] = { loading: true };
      const res = await window.RusiSupabase?.orders?.createPending({ userId: user.uid, packageId: pkg.id });
      if (res && res.ok && res.data && res.data.order_code) {
        orderByPkg[key] = {
          code: res.data.order_code,
          amount: Number(res.data.amount) || pkg.price,
          expiresAt: Date.parse(res.data.expires_at) || (Date.now() + 24 * 3600 * 1000)
        };
      } else {
        orderByPkg[key] = { error: (res && res.message) || "Không tạo được mã thanh toán. Vui lòng kiểm tra kết nối và thử lại." };
        console.error("[Thanh toán] Không tạo được đơn hàng:", res);
      }
      if (modal.isConnected && currentPkg.id === key) renderModalContent();
    };

    let modal = document.getElementById("vietqrModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "vietqrModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    // Hạn thanh toán = hạn của đơn trên server (24 giờ kể từ khi tạo)
    const orderTimeLeft = () => {
      const ord = orderByPkg[currentPkg.id];
      return ord && ord.expiresAt ? Math.max(0, Math.floor((ord.expiresAt - Date.now()) / 1000)) : null;
    };
    if (this._timerInterval) clearInterval(this._timerInterval);
    if (this._pollInterval) clearInterval(this._pollInterval);

    const renderModalContent = () => {
      const ord = orderByPkg[currentPkg.id] || {};
      const orderReady = Boolean(ord.code);
      const orderId = ord.code || "";
      const payAmount = orderReady ? ord.amount : currentPkg.price;
      const timeLeft = orderTimeLeft();
      const qrUrl = orderReady
        ? `https://img.vietqr.io/image/vietinbank-108873919999-compact2.png?amount=${payAmount}&addInfo=${encodeURIComponent(orderId)}&accountName=RUSI%20TRKI%20PLATFORM`
        : "";
      const formatTime = (sec) => {
        if (sec === null || sec === undefined) return "--:--";
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
      };

      modal.innerHTML = `
      <div class="vietqr-card">
        <button class="vietqr-close" id="closeVietQr" title="Đóng">&times;</button>
        
        <div class="vietqr-header">
          <div class="vietqr-header-title">
            <span class="vietqr-badge-pro">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 13 }) : ""} RUSI PRO</span>
            <h3>Thanh toán qua VietQR</h3>
          </div>
          <div class="vietqr-user-context">
            <span>Tài khoản:</span>
            <b>${esc(user.name || "Học viên")}</b>
            <span class="vietqr-user-email">(${esc(user.email || "Khách")})</span>
          </div>
        </div>

        <!-- BỘ CHỌN GÓI CƯỚC TINH GỌN (SEGMENTED TABS) -->
        <div class="vietqr-pkg-tabs" role="tablist">
          ${pkgs.map((p) => {
            const isActive = (p.id || "").toLowerCase() === (currentPkg.id || "").toLowerCase();
            return `
            <button type="button" class="vietqr-pkg-tab ${isActive ? "active" : ""}" data-pkg-select="${p.id}">
              <div class="vietqr-pkg-tab-main">
                <span class="vietqr-pkg-tab-title">${esc(p.title)}</span>
                <span class="vietqr-pkg-tab-price">${p.price.toLocaleString("vi-VN")} đ</span>
              </div>
              ${p.popular ? `<span class="vietqr-pkg-tab-hot">Phổ biến</span>` : (p.id === "pro_1y" ? `<span class="vietqr-pkg-tab-hot vip">Giá trị nhất</span>` : "")}
            </button>`;
          }).join("")}
        </div>

        <!-- KHUNG 2 CỘT QUÉT QR & THÔNG TIN CHUYỂN KHOẢN -->
        <div class="vietqr-body-grid">
          <!-- CỘT 1: ẢNH QR & ĐỒNG HỒ PHIÊN -->
          <div class="vietqr-scan-card">
            <div class="vietqr-scan-box">
              ${orderReady
                ? `<img class="vietqr-img" id="vietqrImgTag" src="${qrUrl}" alt="VietQR Thanh toán Rusi TRKI" />`
                : `<div class="vietqr-img" style="display:grid;place-items:center;text-align:center;padding:16px;color:var(--muted)">${ord.error ? esc(ord.error) : "Đang tạo mã thanh toán..."}</div>`}
            </div>
            <div class="vietqr-scan-meta">
              <div class="vietqr-timer-badge">
                ${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 13 }) : ""}
                <span>Hết hạn:</span>
                <b id="vietqrTimerDisplay">${formatTime(timeLeft)}</b>
              </div>
              <div class="vietqr-live-status">
                <span class="vietqr-pulse-dot"></span>
                <span>Chờ quét mã</span>
              </div>
            </div>
          </div>

          <!-- CỘT 2: CHI TIẾT CHUYỂN KHOẢN & 1-CLICK COPY -->
          <div class="vietqr-details-card">
            <div class="vietqr-info-table">
              <div class="vietqr-info-row">
                <span class="lbl">Ngân hàng</span>
                <span class="val">VietinBank (Công Thương)</span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Số tài khoản</span>
                <span class="val">
                  <b class="vietqr-highlight-num">108873919999</b>
                  <button class="vietqr-copy-btn" data-copy="108873919999" type="button" title="Sao chép số tài khoản">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : ""} Chép</button>
                </span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Chủ tài khoản</span>
                <span class="val">RUSI TRKI PLATFORM</span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Số tiền</span>
                <span class="val vietqr-amount-val">
                  <b>${payAmount.toLocaleString("vi-VN")} đ</b>
                  <button class="vietqr-copy-btn" data-copy="${payAmount}" type="button" title="Sao chép số tiền">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : ""} Chép</button>
                </span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Nội dung CK</span>
                <span class="val">
                  <code class="vietqr-memo-code">${orderReady ? esc(orderId) : "..."}</code>
                  <button class="vietqr-copy-btn" data-copy="${esc(orderId)}" type="button" title="Sao chép nội dung"${orderReady ? "" : " disabled"}>${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : ""} Chép</button>
                </span>
              </div>
            </div>

            <!-- NÚT KÍCH HOẠT & CAM KẾT AN TOÀN -->
            <div class="vietqr-action-box">
              <button class="btn-confirm-vietqr" id="btnConfirmPaid" type="button"${orderReady && timeLeft !== 0 ? "" : " disabled"}>
                ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Tôi đã chuyển khoản xong
              </button>
              <div class="vietqr-guarantee">
                ${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 13 }) : ""} Kích hoạt sau khi đối soát, trong giờ làm việc
              </div>
            </div>
          </div>
        </div>
      </div>`;

      // Đóng modal
      document.getElementById("closeVietQr").onclick = () => {
        clearInterval(this._timerInterval);
        if (this._pollInterval) clearInterval(this._pollInterval);
        modal.remove();
      };

      // Xử lý chuyển đổi gói cước tương tác
      modal.querySelectorAll("[data-pkg-select]").forEach((tabBtn) => {
        tabBtn.onclick = () => {
          const chosenId = tabBtn.dataset.pkgSelect;
          const found = pkgs.find((p) => p.id === chosenId);
          if (found && found.id !== currentPkg.id) {
            currentPkg = found;
            renderModalContent();
            ensureOrder(found);
          }
        };
      });

      // Xử lý 1-click copy
      modal.querySelectorAll(".vietqr-copy-btn").forEach((copyBtn) => {
        copyBtn.onclick = () => {
          const text = copyBtn.dataset.copy;
          navigator.clipboard?.writeText(text);
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : "") + " Đã chép";
          copyBtn.classList.add("copied");
          toast("Đã sao chép: " + text);
          setTimeout(() => {
            copyBtn.innerHTML = original;
            copyBtn.classList.remove("copied");
          }, 1800);
        };
      });

      // Đơn đã có trên server từ lúc hiện mã QR — nút này chỉ chuyển sang màn hình chờ quản trị xác nhận.
      const confirmBtn = document.getElementById("btnConfirmPaid");
      if (confirmBtn) {
        confirmBtn.onclick = async () => {
          if (!orderReady) return;
          // Đơn CHỜ DUYỆT: chưa phải gói đang dùng — chỉ ghi "pro_active_pkg" khi đơn được xác nhận đã thanh toán
          STORE.set("pro_pending_pkg", currentPkg.id);
          clearInterval(Monetization._timerInterval);
          modal.innerHTML = `
            <div class="vietqr-card" style="max-width:540px">
              <div class="vietqr-success-card">
                <div class="vietqr-success-icon">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 48 }) : ""}</div>
                <h3>Đã Ghi Nhận Thanh Toán</h3>
                <p>Đơn của <b>${esc(user.name || user.email)}</b> đang chờ quản trị xác nhận.</p>
                <div class="vietqr-success-box">
                  <div class="vietqr-success-row"><span>Gói đăng ký:</span><b>${esc(currentPkg.title)}</b></div>
                  <div class="vietqr-success-row"><span>Mã giao dịch:</span><code>${esc(orderId)}</code></div>
                  <div class="vietqr-success-row"><span>Trạng thái:</span><b>CHỜ DUYỆT</b></div>
                </div>
                <button class="btn btn-primary btn-lg" id="btnVietQrFinish" style="width:100%;margin-top:20px">
                  Đóng
                </button>
              </div>
            </div>`;
          document.getElementById("btnVietQrFinish").onclick = () => {
            clearInterval(Monetization._timerInterval);
            if (Monetization._pollInterval) clearInterval(Monetization._pollInterval);
            modal.remove();
          };
        };
      }
    };

    renderModalContent();
    ensureOrder(currentPkg);

    // Đồng hồ đếm ngược tới hạn của đơn trên server
    this._timerInterval = setInterval(() => {
      const timeLeft = orderTimeLeft();
      if (timeLeft === null) return;
      const disp = document.getElementById("vietqrTimerDisplay");
      if (disp) {
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0");
        const s = (timeLeft % 60).toString().padStart(2, "0");
        disp.textContent = h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
      }
      if (timeLeft <= 0) {
        clearInterval(this._timerInterval);
        if (this._pollInterval) clearInterval(this._pollInterval);
        const scanBox = modal.querySelector(".vietqr-scan-box");
        if (scanBox) {
          scanBox.style.opacity = "0.2";
          scanBox.style.filter = "grayscale(1)";
        }
        const confirmBtnEl = document.getElementById("btnConfirmPaid");
        if (confirmBtnEl) {
          // Mã hết hạn → tạo đơn mới ngay trong modal (PROJECT_SPEC: nút [Tạo mã thanh toán mới])
          confirmBtnEl.disabled = false;
          confirmBtnEl.textContent = "Tạo mã thanh toán mới";
          confirmBtnEl.onclick = () => this.openUpgradeModal(currentPkg.id);
        }
        modal.querySelectorAll("[data-pkg-select]").forEach(b => b.disabled = true);
        toast("Phiên thanh toán đã hết hạn — Vui lòng tạo lại mã đơn mới.");
      }
    }, 1000);

    // Polling tự động kiểm tra trạng thái giao dịch qua Webhook / Casso (PROJECT_SPEC line 198)
    const pollPaymentStatus = async () => {
      if (!modal.isConnected) {
        if (this._pollInterval) clearInterval(this._pollInterval);
        return;
      }
      // Kiểm tra mọi đơn đã tạo trong phiên (học viên có thể đổi gói sau khi đã chuyển khoản)
      const codes = Object.keys(orderByPkg).filter((k) => orderByPkg[k] && orderByPkg[k].code);
      if (!codes.length) return;
      try {
        if (window.RusiSupabase && window.RusiSupabase.orders && typeof window.RusiSupabase.orders.checkStatus === "function") {
          let paidPkg = null;
          for (const k of codes) {
            const res = await window.RusiSupabase.orders.checkStatus(orderByPkg[k].code);
            if (res && String(res.status).toLowerCase() === "paid") { paidPkg = k; break; }
          }
          if (paidPkg) {
            clearInterval(this._pollInterval);
            clearInterval(this._timerInterval);
            STORE.set("pro_active_pkg", paidPkg);
            await Monetization.setPro();
            toast("Đơn hàng đã được duyệt. Quyền PRO đã cập nhật.");
            modal.remove();
          }
        }
      } catch(e) {}
    };
    this._pollInterval = setInterval(pollPaymentStatus, 3000);
  },

  /** Modal Quản Lý Gói PRO (Dành cho thành viên đã là PRO) */
  openManageModal() {
    const user = this.getCurrentUser();
    const proInfo = this.getProInfo();
    if (!proInfo) {
      this.openUpgradeModal();
      return;
    }

    let modal = document.getElementById("manageProModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "manageProModal";
      modal.className = "modal-overlay";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "manageProHeading");
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card manage-pro-modal-card">
        <div class="manage-pro-header">
          <div class="manage-pro-badge-pill">
            ${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""}
            <span>HỘI VIÊN CHÍNH THỨC</span>
          </div>
          <button class="manage-pro-close-btn" id="closeManagePro" type="button" aria-label="Đóng cửa sổ">
            ${window.RusiIcons ? RusiIcons.get("x", { size: 18 }) : "✕"}
          </button>
        </div>

        <div class="manage-pro-body">
          <div class="manage-pro-hero-box">
            <div class="manage-pro-hero-main">
              <div class="manage-pro-hero-icon">
                ${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 28 }) : "👑"}
              </div>
              <div class="manage-pro-hero-details">
                <div class="manage-pro-status-tag">
                  <span class="manage-pro-dot"></span> ĐANG HOẠT ĐỘNG
                </div>
                <h3 class="manage-pro-pkg-title" id="manageProHeading">${esc(proInfo.pkgTitle)}</h3>
                <div class="manage-pro-user-email">
                  ${window.RusiIcons ? RusiIcons.get("user-avatar-default", { size: 13 }) : ""}
                  <span>${esc((user && user.email) || (user && user.name) || "Học viên RUSI")}</span>
                </div>
              </div>
            </div>

            <div class="manage-pro-expiry-card">
              <div class="manage-pro-expiry-lbl">Thời hạn sử dụng</div>
              <div class="manage-pro-expiry-val">
                ${proInfo.isLifetime ? "Vĩnh viễn (Trọn đời)" : esc(proInfo.expiresFormatted)}
              </div>
              ${(typeof proInfo.daysRemaining === "number" && !proInfo.isLifetime) ? `
                <div class="manage-pro-expiry-days ${proInfo.daysRemaining <= 7 ? "is-urgent" : ""}">
                  ${proInfo.daysRemaining === 0 ? "Hết hạn hôm nay" : `Còn ${proInfo.daysRemaining} ngày`}
                </div>
              ` : ""}
            </div>
          </div>

          <div class="manage-pro-perks-section">
            <h4 class="manage-pro-section-title">
              ${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 16 }) : ""} Đặc quyền VIP đang kích hoạt trên tài khoản:
            </h4>
            <div class="manage-pro-perks-grid">
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("award-badge", { size: 16 }) : "🎯"}</span>
                <div class="perk-info">
                  <strong>100% Đề thi TRKI (A1 - C2)</strong>
                  <span>Đầy đủ 5 phân môn, thi mô phỏng CBT &amp; chấm tự động</span>
                </div>
              </div>
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 16 }) : "🎙️"}</span>
                <div class="perk-info">
                  <strong>AI Rusika Chấm Phát Âm</strong>
                  <span>Không giới hạn số lượt chấm âm vị &amp; so khớp ngữ điệu</span>
                </div>
              </div>
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("edit-pencil", { size: 16 }) : "✍️"}</span>
                <div class="perk-info">
                  <strong>AI Chữa Bài Viết (Письмо)</strong>
                  <span>Sửa lỗi biến cách, ngữ pháp và gợi ý nâng cấp câu</span>
                </div>
              </div>
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("headphones", { size: 16 }) : "🎧"}</span>
                <div class="perk-info">
                  <strong>Nghe Hiểu &amp; Chép Chính Tả</strong>
                  <span>Audio bản xứ chuẩn studio, transcript phân tích chi tiết</span>
                </div>
              </div>
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : "📚"}</span>
                <div class="perk-info">
                  <strong>100+ Lọ Từ Vựng &amp; Xuất PDF</strong>
                  <span>Mở khóa toàn bộ từ vựng chuyên ngành &amp; in PDF chuẩn A4</span>
                </div>
              </div>
              <div class="manage-pro-perk-item">
                <span class="perk-icon">${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 16 }) : "🍅"}</span>
                <div class="perk-info">
                  <strong>Pomodoro &amp; Gamification PRO</strong>
                  <span>Nhân đôi XP, chuông tập trung &amp; huy hiệu VIP nổi bật</span>
                </div>
              </div>
            </div>
          </div>

          <div class="manage-pro-footer-actions">
            <div class="manage-pro-support-hint">
              ${window.RusiIcons ? RusiIcons.get("help-circle", { size: 14 }) : ""}
              <span>Cần hỗ trợ kích hoạt hay hóa đơn? <a href="https://zalo.me/0339933999" target="_blank" rel="noopener noreferrer">Liên hệ ban học vụ ↗</a></span>
            </div>
            <div class="manage-pro-btn-group">
              <button class="btn btn-outline btn-sm" id="btnCloseManageProBtn" type="button">Đóng</button>
              <a class="btn btn-primary btn-sm" id="btnManageUpgradePage" href="upgrade.html" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
                ${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 15 }) : ""} Gia hạn / Nâng cấp gói
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeModal = () => {
      document.removeEventListener("keydown", onEsc);
      modal.remove();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEsc);

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    const closeBtn = document.getElementById("closeManagePro");
    if (closeBtn) closeBtn.onclick = closeModal;

    const closeFooterBtn = document.getElementById("btnCloseManageProBtn");
    if (closeFooterBtn) closeFooterBtn.onclick = closeModal;

    const upgradeLink = document.getElementById("btnManageUpgradePage");
    if (upgradeLink) {
      upgradeLink.onclick = () => {
        closeModal();
      };
    }
  }
};

// Gắn đối tượng toàn cục
if (typeof window !== "undefined") {
  window.Monetization = Monetization;
}

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function detectLang(text) {
  if (/[\u0400-\u04FF]/.test(text)) return "ru-RU";
  if (/[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(text)) return "vi-VN";
  return "ru-RU";
}

/* Chọn giọng đọc tốt nhất cho mỗi ngôn ngữ — ưu tiên giọng tự nhiên. */
const SPEAK_VOICE_PREF = [
  /milena/i, /yuri/i, /katya/i, /alyona/i, /tatyana/i, /pavel/i, /dmitri/i, // tiếng Nga
  /google/i, /microsoft/i, /siri/i, /namminh/i, /hosaminh/i, /giahuy/i, /linhsan/i, // tiếng Việt
];
const _voiceCache = {};

function pickVoice(lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices().filter((v) =>
    v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase())
  );
  if (!voices.length) return null;
  const c = _voiceCache[lang];
  if (c && voices.includes(c)) return c;
  let best = null;
  for (const pref of SPEAK_VOICE_PREF) {
    best = voices.find((v) => pref.test(v.name));
    if (best) break;
  }
  if (!best) best = voices.find((v) => v.localService) || voices[0];
  _voiceCache[lang] = best;
  return best;
}

let _wordAudioLookupCache = null;
let _currentNativeAudio = null;
let _lastVocabJarsLen = -1;
let _lastVocabulariesLen = -1;

function getWordAudioUrl(word) {
  if (!word || typeof word !== "string") return "";
  const currentJarsLen = (typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS)) ? VOCAB_JARS.length : 0;
  const currentVocabLen = (typeof VOCABULARIES !== "undefined" && Array.isArray(VOCABULARIES)) ? VOCABULARIES.length : 0;
  if (!_wordAudioLookupCache || currentJarsLen !== _lastVocabJarsLen || currentVocabLen !== _lastVocabulariesLen) {
    _lastVocabJarsLen = currentJarsLen;
    _lastVocabulariesLen = currentVocabLen;
    _wordAudioLookupCache = new Map();
    _wordAudioLookupCache = new Map();
    const cleanFn = (s) => (s || "").replace(/[\u0300-\u036f́̀]/g, "").replace(/[«»""''„“]/g, "").replace(/^[(\[]|[)\]]$/g, "").trim().toLowerCase();

    if (typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS)) {
      VOCAB_JARS.forEach((jar) => {
        (jar.words || []).forEach((w) => {
          const audio = w.audio_url || w.audio;
          if (audio) {
            const key = cleanFn(w.word_normalized || w.ru || w.word_with_stress);
            if (key && !_wordAudioLookupCache.has(key)) _wordAudioLookupCache.set(key, audio);
          }
        });
      });
    }

    if (typeof VOCABULARIES !== "undefined" && Array.isArray(VOCABULARIES)) {
      VOCABULARIES.forEach((v) => {
        const audio = v.audio_url || v.audio;
        if (audio) {
          const key = cleanFn(v.word_normalized || v.ru || v.word_with_stress);
          if (key && !_wordAudioLookupCache.has(key)) _wordAudioLookupCache.set(key, audio);
        }
      });
    }
  }

  const cleanKey = (word || "").replace(/[\u0300-\u036f́̀]/g, "").replace(/[«»""''„“]/g, "").replace(/^[(\[]|[)\]]$/g, "").trim().toLowerCase();
  return _wordAudioLookupCache.get(cleanKey) || "";
}

function playWordAudio(wordOrRu, maybeAudioUrl = "", options = {}) {
  let ru = "";
  let audioUrl = maybeAudioUrl || "";

  if (typeof wordOrRu === "object" && wordOrRu !== null) {
    ru = wordOrRu.ru || wordOrRu.word_normalized || wordOrRu.word_with_stress || "";
    audioUrl = audioUrl || wordOrRu.audio_url || wordOrRu.audio || "";
  } else if (typeof wordOrRu === "string") {
    ru = wordOrRu;
  }

  if (!audioUrl) {
    audioUrl = getWordAudioUrl(ru);
  }

  if (audioUrl) {
    try {
      if (_currentNativeAudio) {
        _currentNativeAudio.pause();
        _currentNativeAudio.currentTime = 0;
      }
      const audio = new Audio(audioUrl);
      _currentNativeAudio = audio;
      if (options.playbackRate) audio.playbackRate = options.playbackRate;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to Web Speech API
          speak(ru, "ru-RU", options.rate || 0.9, false);
        });
      }
      return audio;
    } catch (e) {
      speak(ru, "ru-RU", options.rate || 0.9, false);
      return null;
    }
  }

  speak(ru, "ru-RU", options.rate || 0.9, false);
  return null;
}

function speak(text, lang = null, rate = 0.9, checkNativeWord = true) {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.speechSynthesis) {
    toast("Trình duyệt không hỗ trợ đọc — hãy dùng Chrome/Edge.");
    return;
  }
  const l = lang || detectLang(text);

  // If Russian and checkNativeWord is true, check if it's a known vocabulary word with native MP3
  if (checkNativeWord && (l === "ru-RU" || l === "ru") && text && typeof text === "string" && text.length < 50 && !text.includes("\n")) {
    const nativeAudio = getWordAudioUrl(text);
    if (nativeAudio) {
      playWordAudio(text, nativeAudio, { playbackRate: rate, rate: rate });
      return;
    }
  }

  if (_currentNativeAudio) {
    _currentNativeAudio.pause();
    _currentNativeAudio.currentTime = 0;
  }

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = l;
  u.rate = rate;
  const voice = pickVoice(l);
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

/** Nghe phát âm chậm — dùng trong modal chi tiết từ. */
function speakSlow(text, lang = null) {
  speak(text, lang, 0.5);
}

if (typeof window !== "undefined") {
  window.speak = speak;
  window.speakSlow = speakSlow;
  window.playWordAudio = playWordAudio;
  window.getWordAudioUrl = getWordAudioUrl;
}

// Một số trình duyệt nạp danh sách giọng bất đồng bộ — nạp sớm để chọn được giọng tốt.
if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    Object.keys(_voiceCache).forEach((k) => delete _voiceCache[k]);
  };
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return d[m][n];
}

function similarity(a, b) {
  const norm = (s) =>
    s.toLowerCase().replace(/[.,!?;:«»"']/g, "").replace(/\s+/g, " ").trim();
  const x = norm(a);
  const y = norm(b);
  if (!x && !y) return 100;
  if (!x || !y) return 0;
  const dist = levenshtein(x, y);
  return Math.max(0, Math.round(100 - (dist / Math.max(x.length, y.length)) * 100));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Chữ có dấu trọng âm hiển thị theo đúng chữ hoa/thường của từ gốc.
 * Dữ liệu cũ hay ghi stress viết hoa đầu ("Мо́ре") trong khi ru là "море" → danh sách lẫn hoa/thường.
 * Chỉ đổi khi hai chuỗi trùng nhau sau khi bỏ dấu (không ép khi stress là dạng khác của từ).
 */
function rusiStressCase(stress, ru) {
  const st = String(stress || "").trim();
  const base = String(ru || "").trim();
  if (!st || !base) return st || base;
  const plain = st.replace(/[̀́]/g, "");
  if (plain === base || plain.toLowerCase() !== base.toLowerCase()) return st;
  let out = "";
  let j = 0;
  for (const ch of st) {
    if (ch === "́" || ch === "̀") { out += ch; continue; }
    const r = base[j++];
    out += (r !== undefined && r !== ch && r.toLowerCase() === ch.toLowerCase()) ? r : ch;
  }
  return out;
}
window.rusiStressCase = rusiStressCase;

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
window.esc = esc;

/**
 * NAV_LINKS — cấu trúc mảng các cấp:
 *   ["url.html", "Label"]         → liên kết đơn
 *   ["url.html", "Label", [...]]  → liên kết có dropdown con (các mục con cùng cấu trúc)
 * Sub-items có thể trỏ đến hash trên cùng trang (vd "vocabulary.html#algorithm").
 */
const NAV_LINKS = [
  ["vocabulary.html", "Từ vựng"],
  ["writing.html", "Viết"],
  ["listening.html", "Nghe"],
  ["speaking.html", "Nói"],
  ["mock-test.html", "TRKI"],
  ["blog.html", "Blog"],
  ["upgrade.html", "Gói PRO"]
];

const SEASON_ORDER = ["winter"];

const SEASON_META = {
  winter: { icon: "snowflake", label: "Mùa đông", fx: ["*", "•", "*", "•"] }
};

function currentSeason() {
  return "winter";
}

/** Giao diện Sáng / Tối / Theo hệ thống — do js/theme.js quản lý (thiếu file đó thì giữ Sáng như trước) */
function applyLightTheme() {
  if (typeof document === "undefined") return;
  if (window.RusiTheme && typeof window.RusiTheme.apply === "function") {
    window.RusiTheme.apply();
  } else {
    if (document.documentElement) document.documentElement.setAttribute("data-theme", "light");
    if (document.body) document.body.setAttribute("data-theme", "light");
  }
  if (document.body) document.body.dataset.season = "winter";
}

function applySeason(season = "winter") {
  if (typeof document === "undefined" || !document.body) return;
  document.body.dataset.season = "winter";

  let fx = document.getElementById("seasonFx");
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    if (fx) fx.innerHTML = "";
    return;
  }

  if (!fx) {
    fx = document.createElement("div");
    fx.id = "seasonFx";
    fx.className = "season-fx";
    fx.setAttribute("aria-hidden", "true");
    document.body.appendChild(fx);
  }
  if (!fx) return;
  fx.innerHTML = "";

  const SNOW_COUNT = 8;
  for (let i = 0; i < SNOW_COUNT; i++) {
    const s = document.createElement("span");
    s.textContent = i % 2 === 0 ? "*" : "•";
    s.style.fontSize = i % 2 === 0 ? (9 + Math.random() * 8 + "px") : "5px";
    s.style.left = Math.random() * 100 + "vw";
    if (s.style && typeof s.style.setProperty === "function") {
      s.style.setProperty("--drift", Math.round(Math.random() * 100 - 50) + "px");
    }
    const dur = 7 + Math.random() * 6;
    s.style.animationDuration = dur.toFixed(2) + "s";
    s.style.animationDelay = (-Math.random() * dur).toFixed(2) + "s";
    fx.appendChild(s);
  }
}

/** Hộp thoại Đăng nhập / Đăng ký hiện đại */
const AuthModal = {
  open(initialTab = "login") {
    let modal = document.getElementById("authModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "authModal";
      modal.className = "modal-overlay";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card auth-modal-card">
        <button class="modal-close" id="authModalClose" type="button" aria-label="Đóng">&times;</button>
        <div class="auth-modal-header">
          <div class="auth-modal-logo">
            <span class="brand-mark">Я</span>
            <span class="brand-text">Rusi<span>TRKI</span></span>
          </div>
          <h2 id="authModalTitle">${initialTab === "register" ? "Đăng ký tài khoản học viên" : "Đăng nhập Rusi TRKI"}</h2>
          <p id="authModalDesc">Luyện thi TRKI & học tiếng Nga toàn diện chuẩn CEFR</p>
        </div>

        <div class="auth-modal-tabs">
          <button class="auth-tab ${initialTab === "login" ? "active" : ""}" id="tabAuthLogin" type="button">Đăng nhập</button>
          <button class="auth-tab ${initialTab === "register" ? "active" : ""}" id="tabAuthRegister" type="button">Đăng ký mới</button>
        </div>

        <div class="auth-modal-body">
          <div class="auth-features-preview">
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 16 }) : ""} <span>Lưu chuỗi ngày Streak & tích lũy XP</span></div>
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""} <span>Đồng bộ Lọ từ vựng Spaced Repetition (SM-2)</span></div>
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 16 }) : ""} <span>Lưu kết quả & báo cáo làm bài thi thử TRKI</span></div>
          </div>

          <button class="btn-google-auth" id="btnGoogleAction" type="button">
            <svg class="g-icon" viewBox="0 0 48 48" aria-hidden="true" width="22" height="22">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 36.7 44 31 44 24c0-1.2-.1-2.4-.4-3.5z"/>
            </svg>
            <span id="googleActionText">${initialTab === "register" ? "Đăng ký nhanh với Google" : "Đăng nhập nhanh với Google"}</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.add("open");

    const closeBtn = modal.querySelector("#authModalClose");
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });

    const tabLogin = modal.querySelector("#tabAuthLogin");
    const tabRegister = modal.querySelector("#tabAuthRegister");
    const title = modal.querySelector("#authModalTitle");
    const gText = modal.querySelector("#googleActionText");

    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      title.textContent = "Đăng nhập Rusi TRKI";
      gText.textContent = "Đăng nhập nhanh với Google";
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      title.textContent = "Đăng ký tài khoản học viên";
      gText.textContent = "Đăng ký nhanh với Google";
    });

    modal.querySelector("#btnGoogleAction").addEventListener("click", () => {
      modal.classList.remove("open");
      if (window.Auth) window.Auth.signInWithGoogle();
    });
  }
};

function renderHeader() {
  const host = document.getElementById("app-header");
  if (!host) return;
  const page = document.body.dataset.page;

  const MAX_PRIMARY = 7;
  const primaryLinks = NAV_LINKS.slice(0, MAX_PRIMARY);
  const overflowLinks = NAV_LINKS.slice(MAX_PRIMARY);

  let navLinksHtml = primaryLinks.map((item) => renderNavLink(item, page)).join("");

  if (overflowLinks.length > 0) {
    const moreItems = overflowLinks.map(([href, label]) => {
      const isActive = page && (href === page + ".html" || href.startsWith(page + ".html"));
      return `<a class="nav-dropdown-item ${isActive ? "active" : ""}" href="${href}">${label}</a>`;
    }).join("");
    navLinksHtml += `
      <div class="nav-dropdown nav-more" id="navMoreDropdown">
        <button class="nav-dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false">
          <span>More</span>
          ${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg>'}
        </button>
        <div class="nav-dropdown-menu">
          ${moreItems}
        </div>
      </div>
    `;
  }

  host.innerHTML = `
  <div class="header-backdrop" id="headerBackdrop" aria-hidden="true"></div>
  <header class="header">
    <div class="header-inner">
      <div class="header-left">
        <a class="brand" href="index.html" aria-label="Rusi TRKI - Trang chủ">
          <span class="brand-mark">Я</span>
          <span class="brand-text">Rusi<span>TRKI</span></span>
        </a>
      </div>

      <nav class="nav header-center" id="mainNav" aria-label="Điều hướng chính">
        ${navLinksHtml}
      </nav>

      <div class="header-right header-actions">
        <button type="button" class="header-pomo-chip" id="headerPomoBtn" title="Đồng hồ Pomodoro tập trung" style="display:none" aria-label="Đồng hồ Pomodoro tập trung">
          <span class="header-pomo-dot" id="headerPomoDot" aria-hidden="true"></span>
          <span class="header-pomo-time" id="headerPomoTime">25:00</span>
        </button>
        <button type="button" class="theme-toggle-btn" id="themeToggleBtn"></button>
        <div id="userArea" class="user-area"></div>
        <button class="menu-button" id="mobileMenuBtn" type="button" aria-label="Mở menu" aria-expanded="false">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>`;

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn && window.RusiTheme) window.RusiTheme.bind(themeBtn);
  else if (themeBtn) themeBtn.remove();

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  const backdrop = document.getElementById("headerBackdrop");

  const closeMobileMenu = () => {
    if (nav) nav.classList.remove("nav-open");
    if (mobileBtn) {
      mobileBtn.classList.remove("is-open");
      mobileBtn.setAttribute("aria-expanded", "false");
    }
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("menu-locked");
    document.documentElement.classList.remove("menu-locked");
  };

  const openMobileMenu = () => {
    // Đóng Pomodoro popover và User dropdown nếu đang mở (Mutual Exclusion - Spec 3.3)
    const pomoPop = document.getElementById("pomoPopoverDropdown");
    if (pomoPop) pomoPop.style.display = "none";
    const userDd = document.getElementById("userDropdown");
    if (userDd) userDd.classList.remove("open");
    const userTrigger = document.getElementById("userTrigger");
    if (userTrigger) userTrigger.setAttribute("aria-expanded", "false");

    if (nav) nav.classList.add("nav-open");
    if (mobileBtn) {
      mobileBtn.classList.add("is-open");
      mobileBtn.setAttribute("aria-expanded", "true");
    }
    if (backdrop) backdrop.classList.add("is-open");
    document.body.classList.add("menu-locked");
    document.documentElement.classList.add("menu-locked");
  };

  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = nav.classList.contains("nav-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileMenu);
  }

  // Tự động đóng menu khi bấm phím Escape hoặc xoay màn hình sang desktop
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav && nav.classList.contains("nav-open")) {
      closeMobileMenu();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && nav && nav.classList.contains("nav-open")) {
      closeMobileMenu();
    }
  });

  if (nav) {
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMobileMenu();
    });
  }

  if (!window._headerListenersBound) {
    window._headerListenersBound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMobileMenu();
    });
  }

  initNavDropdowns();
  renderUserArea();
  if (window.RusiPomodoro && typeof window.RusiPomodoro.updateUI === "function") {
    window.RusiPomodoro.updateUI();
  }
}

/** Render một mục nav đơn (không có phần con). */
function renderNavLink(item, page) {
  const [href, label] = item;
  const isActive = page && (href === page + ".html" || href.startsWith(page + ".html"));
  return `<a href="${href}" class="${isActive ? "active" : ""}">${label}</a>`;
}

/** Khởi tạo hành vi hover/click cho các nav dropdown. */
function initNavDropdowns() {
  document.querySelectorAll(".nav-dropdown").forEach((dd) => {
    const trigger = dd.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    let hoverTimer = null;
    const open = () => {
      document.querySelectorAll(".nav-dropdown.open").forEach((o) => {
        if (o !== dd) o.classList.remove("open");
      });
      dd.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      dd.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dd.classList.contains("open") ? close() : open();
    });
    dd.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimer);
      open();
    });
    dd.addEventListener("mouseleave", () => {
      hoverTimer = setTimeout(close, 180);
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown.open").forEach((o) => o.classList.remove("open"));
  });
}

/**
 * Render khu vực tài khoản ở header theo chuẩn hiện đại:
 * - Khi CHƯA login: 2 nút [Đăng nhập] và [Đăng ký]. KHÔNG hiển thị nút nâng cấp PRO bừa bãi.
 * - Khi ĐÃ login:
 *     + Nếu Free: Hiển thị nút nổi bật [⚡ Nâng cấp PRO] + Avatar + Dropdown có Card CTA VIP
 *     + Nếu PRO: Hiển thị Huy hiệu danh dự [👑 PRO MEMBER] + Avatar + Dropdown có Card quản lý PRO
 */
function renderUserArea() {
  const host = document.getElementById("userArea");
  if (!host) return;

  const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);
  const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : false;
  const proInfo = typeof Monetization !== "undefined" && typeof Monetization.getProInfo === "function" ? Monetization.getProInfo() : null;
  const canShowPomo = Boolean(user && isPro);

  // 1. KHI CHƯA ĐĂNG NHẬP HOẶC KHÔNG PHẢI PRO: Ẩn Pomodoro
  const pomoBtn = document.getElementById("headerPomoBtn");
  const pomoPop = document.getElementById("pomoPopoverDropdown");
  if (!canShowPomo) {
    if (pomoBtn) pomoBtn.style.display = "none";
    if (pomoPop) pomoPop.style.display = "none";
  }

  const isGuest = user && (String(user.id || user.uid || "").startsWith("guest_") || user.isGuest);

  // 1. KHI CHƯA ĐĂNG NHẬP HOẶC LÀ GUEST: Duy nhất 2 nút Đăng nhập & Đăng ký
  if (!user || isGuest) {
    renderIndexProgressIfLoggedIn(null);

    const fullCurrentPath = (window.location.pathname + window.location.search + window.location.hash).replace(/^\//, '') || "index.html";
    const currentRedirect = encodeURIComponent(fullCurrentPath);
    host.innerHTML = `
      <div class="auth-buttons-group">
        <a class="btn-auth-login" id="btnLogin" href="login.html?redirect=${currentRedirect}">Đăng nhập</a>
        <a class="btn-auth-register" id="btnRegister" href="signup.html?redirect=${currentRedirect}">Đăng ký</a>
      </div>`;
    return;
  }

  // Khi đã đăng nhập: CHỈ hiển thị Pomodoro nếu là tài khoản PRO
  if (pomoBtn) pomoBtn.style.display = canShowPomo ? "inline-flex" : "none";
  if (canShowPomo && window.RusiPomodoro && typeof window.RusiPomodoro.updateUI === "function") {
    window.RusiPomodoro.updateUI();
  }
  renderIndexProgressIfLoggedIn(user);

  // 2. KHI ĐÃ ĐĂNG NHẬP: Avatar + Tên + Nút Nâng cấp PRO / Huy hiệu PRO
  const initials = (user.name || user.email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const avatar = user.photo
    ? `<img class="user-avatar ${isPro ? "is-pro" : ""}" src="${esc(user.photo)}" alt="${esc(user.name)}" referrerpolicy="no-referrer" />`
    : `<span class="user-avatar user-avatar-fallback ${isPro ? "is-pro" : ""}">${esc(initials)}</span>`;
  const shortName = (user.name || "Học viên").split(/\s+/)[0];

  // Chỉ để ẩn/hiện link CMS: theo role phía server (profiles.role), không theo email; quyền thật do RLS/is_admin() kiểm tra
  const isAdmin = ["academic_admin", "super_admin"].includes(String(user.role || "").toLowerCase().trim());

  host.innerHTML = `
    <div class="user-area-authenticated">
      <!-- PHẦN NÂNG CẤP PRO: Khi đã là PRO thì KHÔNG hiển thị nút PRO MEMBER ngoài header (Req 1), viền bo avatar tự động chuyển màu vàng (Req 4) -->
      ${isPro ? "" : `
        <button class="btn-upgrade-pro-header" id="btnUpgradeHeader" type="button" title="Mở khóa 100% đề thi TRKI và AI">
          <span class="btn-upgrade-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""}</span>
          <span class="btn-upgrade-text">Nâng cấp PRO</span>
        </button>
      `}

      <div class="user-menu" id="userMenu">
        <button class="user-trigger ${isPro ? "is-pro" : ""}" id="userTrigger" type="button" aria-haspopup="true" aria-expanded="false" title="${isPro ? "Học viên PRO (Viền vàng) — Bấm để mở menu" : "Tài khoản học viên"}">
          ${avatar}
          <span class="user-name-short">${esc(shortName)}</span>
          <span class="caret" aria-hidden="true">${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : ""}</span>
        </button>
        <div class="user-dropdown" id="userDropdown" role="menu">
          <div class="user-dropdown-head">
            ${avatar}
            <div class="user-head-info">
              <div class="user-fullname">${esc(user.name || "Học viên Rusi")}</div>
              <div class="user-email">${esc(user.email || "")}</div>
            </div>
            ${isPro ? `<span class="user-tier-badge tier-pro" style="display:inline-flex;align-items:center;gap:3px;font-size:0.68rem;padding:2px 7px;flex-shrink:0">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 11 }) : ""} PRO</span>` : `<span class="user-tier-badge tier-free" style="font-size:0.68rem;padding:2px 6px;flex-shrink:0">Free</span>`}
          </div>

          <!-- COMPACT STATS ROW -->
          <div class="user-stats-bar-compact">
            <span class="user-stat-pill">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 13 }) : ""}
              <b>${STORE.get("xp", 0)} XP</b>
            </span>
            <span class="user-stat-pill">
              ${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 13 }) : ""}
              <b>${STORE.get("streak", 0)} ngày</b>
            </span>
          </div>

          <div class="user-dropdown-divider"></div>

          <!-- COMPACT ACTION ITEMS: KHÔNG TRÙNG LẶP -->
          <a class="user-dropdown-item" href="index.html#progress" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("layout-dashboard", { size: 16 }) : ""}</span>
            <span>Tiến độ học tập</span>
          </a>

          ${!isPro ? `
            <a class="user-dropdown-item user-dropdown-upgrade" id="btnUserMenuUpgrade" href="upgrade.html" role="menuitem" style="color:var(--primary);font-weight:700">
              <span>${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 16 }) : ""}</span>
              <span>Nâng cấp PRO</span>
            </a>
          ` : `
            <div class="user-dropdown-item user-dropdown-manage-pro" id="btnUserMenuManagePro" role="menuitem" style="cursor:pointer;color:#059669;font-weight:700">
              <span>${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 16 }) : ""}</span>
              <span>Quản lý gói PRO</span>
            </div>
          `}

          ${isAdmin ? `
            <a class="user-dropdown-item" href="admin.html" role="menuitem">
              <span>${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 16 }) : ""}</span>
              <span>Quản trị hệ thống</span>
            </a>
          ` : ""}

          <div class="user-dropdown-divider"></div>

          <button class="user-dropdown-item user-dropdown-signout" id="btnSignOut" type="button" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("log-out", { size: 16 }) : ""}</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>`;

  // Gắn sự kiện cho nút Upgrade / Manage ở Header
  const upgradeBtn = host.querySelector("#btnUpgradeHeader");
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", () => {
      window.location.href = "upgrade.html";
    });
  }
  const manageBtn = host.querySelector("#btnManageProHeader");
  if (manageBtn) {
    manageBtn.addEventListener("click", () => Monetization.openManageModal());
  }

  // Gắn sự kiện cho các Card trong Dropdown
  const cardProgress = host.querySelector('a[href*="#progress"]');
  if (cardProgress) {
    cardProgress.addEventListener("click", (e) => {
      const dd = host.querySelector("#userDropdown");
      if (dd) dd.classList.remove("open");
      const progEl = document.getElementById("indexUserProgressHost");
      if (progEl && progEl.style.display !== "none") {
        e.preventDefault();
        progEl.scrollIntoView({ behavior: "smooth", block: "start" });
        try { history.pushState(null, "", "#progress"); } catch (_) {}
      }
    });
  }

  const cardUpgrade = host.querySelector("#btnUserMenuUpgrade");
  if (cardUpgrade) {
    cardUpgrade.addEventListener("click", () => {
      const dd = host.querySelector("#userDropdown");
      if (dd) dd.classList.remove("open");
      window.location.href = "upgrade.html";
    });
  }
  const cardManage = host.querySelector("#btnUserMenuManagePro");
  if (cardManage) {
    cardManage.addEventListener("click", () => {
      const dd = host.querySelector("#userDropdown");
      if (dd) dd.classList.remove("open");
      Monetization.openManageModal();
    });
  }

  // Tương tác Dropdown
  const trigger = host.querySelector("#userTrigger");
  const dropdown = host.querySelector("#userDropdown");
  if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        // Đóng Pomodoro popover và Mobile drawer khi mở User menu (Mutual Exclusion)
        const pomoPop = document.getElementById("pomoPopoverDropdown");
        if (pomoPop) pomoPop.style.display = "none";
        const nav = document.getElementById("mainNav");
        if (nav) nav.classList.remove("nav-open");
        const mobileBtn = document.getElementById("mobileMenuBtn");
        if (mobileBtn) {
          mobileBtn.classList.remove("is-open");
          mobileBtn.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("menu-locked");
      }
    });
  }

  if (renderUserArea._outsideClick) {
    document.removeEventListener("click", renderUserArea._outsideClick);
  }
  renderUserArea._outsideClick = () => {
    if (dropdown) dropdown.classList.remove("open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  };
  document.addEventListener("click", renderUserArea._outsideClick);

  const signOutBtn = host.querySelector("#btnSignOut");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", async () => {
      if (dropdown) dropdown.classList.remove("open");
      try {
        if (window.Auth && typeof window.Auth.signOut === "function") {
          await window.Auth.signOut();
        }
      } catch (e) {
        console.error("[Auth] Lỗi đăng xuất:", e);
      }
      // Tải lại trang chủ ở trạng thái khách hoàn toàn trắng sạch
      window.location.href = "index.html";
    });
  }
}

/**
 * Hàm tính toán tiến độ học chuẩn xác, đồng bộ giữa SRS và danh sách từ đã thuộc (Req 5 & Spec Mục 1).
 */
function getSynchronizedVocabStats(opts = {}) {
  let stats = { newCount: 0, reviewing: 0, learning: 0, mastered: 0 };
  let dueCount = 0;
  let st = null;
  if (typeof SRS !== "undefined" && SRS.getState) {
    try {
      st = SRS.getState();
      stats = SRS.getStats(st);
      dueCount = SRS.getDueCards(st, 9999).length;
    } catch (e) {
      console.warn("SRS stats error:", e);
    }
  } else if (typeof STORE !== "undefined") {
    try {
      st = STORE.get("srs", null);
      if (st && st.cards) {
        const now = Date.now();
        Object.values(st.cards).forEach((c) => {
          if (c.mastered) stats.mastered = (stats.mastered || 0) + 1;
          else if (c.dueDate && c.dueDate <= now) dueCount++;
        });
      }
    } catch (_) {}
  }

  const masteredWords = (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
  // So khớp không phân biệt hoa/thường và dấu nhấn
  const normRu = (w) => String(w || "").replace(/[\u0300\u0301]/g, "").toLowerCase().trim();

  // Đếm từ mới trong phạm vi học tập thực tế của người dùng:
  // Thẻ isNew trong deck SRS + các từ người dùng đã lưu vào Lọ cá nhân / Lọ yêu thích
  // Từ đã thuộc = hợp của danh sách "vocab_mastered_words" và thẻ SRS mastered (không đếm trùng)
  const masteredSet = new Set((masteredWords || []).map(normRu).filter(Boolean));
  if (st && st.cards) {
    Object.values(st.cards).forEach(c => {
      if (c.mastered && c.ru) masteredSet.add(normRu(c.ru));
    });
  }
  const totalMastered = masteredSet.size;

  const newWordsSet = new Set();
  if (st && st.cards) {
    Object.values(st.cards).forEach(c => {
      if ((c.isNew || c.repetitions === 0) && !c.mastered && c.ru) {
        const k = normRu(c.ru);
        if (!masteredSet.has(k)) newWordsSet.add(k);
      }
    });
  }

  const customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
  (customJars || []).forEach(j => {
    (j.words || []).forEach(w => {
      if (!w || !w.ru) return;
      const k = normRu(w.ru);
      if (!masteredSet.has(k) && !newWordsSet.has(k)) {
        newWordsSet.add(k);
      }
    });
  });

  let calculatedNew = newWordsSet.size;
  // Nếu người dùng mới tinh (chưa lưu từ nào vào Lọ cá nhân và chưa bắt đầu thẻ SRS), hiển thị 10 từ khởi đầu.
  // Con số gợi ý này chỉ để hiển thị, không ghi lên cloud.
  if (!opts.forCloud && calculatedNew === 0 && totalMastered === 0 && dueCount === 0) {
    calculatedNew = 10;
  }

  const streak = (typeof STORE !== "undefined") ? STORE.get("streak", 0) : 0;

  return {
    mastered: totalMastered,
    dueCount,
    newCount: calculatedNew,
    streak
  };
}
window.getSynchronizedVocabStats = getSynchronizedVocabStats;

/**
 * Hiển thị thẻ Tiến độ trên trang index.html khi người dùng đã đăng nhập thành công (Chuẩn Spec Mục 1).
 */
function renderIndexProgressIfLoggedIn(user) {
  const host = document.getElementById("indexUserProgressHost");
  if (!host) return;
  const isGuest = user && (String(user.id || user.uid || "").startsWith("guest_") || user.isGuest);
  document.body.classList.toggle("index-personalized", Boolean(user && !isGuest));
  document.documentElement.classList.toggle("index-personalized", Boolean(user && !isGuest));
  if (!user || isGuest) {
    delete host.dataset.renderedKey;
    host.style.display = "none";
    host.innerHTML = "";
    return;
  }

  const rawName = user.displayName || user.name || (user.email ? user.email.split("@")[0] : "");
  const userName = rawName ? rawName.trim() : "Học viên";
  const stats = getSynchronizedVocabStats();
  const xp = (typeof STORE !== "undefined") ? STORE.get("xp", 0) : 0;

  // 1. Dữ liệu thực tế kỹ năng Từ vựng
  const completedJars = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("vocabDone").length : 0;

  // 2. Dữ liệu thực tế kỹ năng Luyện nghe
  const listenItems = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("listenDone") : [];
  const uniqueListenLessons = new Set();
  listenItems.forEach(k => {
    const base = String(k).split("_")[0];
    if (base) uniqueListenLessons.add(base);
  });
  const listenCount = listenItems.length;
  const listenLessonsCount = uniqueListenLessons.size;

  // 3. Dữ liệu thực tế kỹ năng Luyện nói (cả bài hoàn thành & số câu luyện đạt chuẩn >= 70%)
  const speakDoneSets = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("speakDone") : [];
  let speakPassedSentences = 0;
  let speakTotalSentences = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("trki_speak_") && !k.includes("completed")) {
        const val = JSON.parse(localStorage.getItem(k));
        if (typeof val === "number") {
          speakTotalSentences++;
          if (val >= 70) speakPassedSentences++;
        }
      }
    }
  } catch (_) {}
  const speakHasActivity = speakDoneSets.length > 0 || speakTotalSentences > 0;

  // 4. Dữ liệu thực tế kỹ năng Luyện viết (cả bài AI đã chấm & bài đang viết dở)
  const writeDoneTasks = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("writeDone") : [];
  let writeDraftCount = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("trki_write_") && !k.startsWith("trki_writeDone")) {
        const val = JSON.parse(localStorage.getItem(k));
        if (typeof val === "string" && val.trim().length >= 10) {
          writeDraftCount++;
        }
      }
    }
  } catch (_) {}
  const writeHasActivity = writeDoneTasks.length > 0 || writeDraftCount > 0;

  // 5. Dữ liệu thực tế Thi TRKI (cả đề thi đầy đủ & bài thi phân môn, điểm thi cao nhất)
  const trkiDoneFull = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("trkiDone") : [];
  const trkiDoneSub = (typeof Progress !== "undefined" && Progress.doneList) ? Progress.doneList("trkiSubDone") : [];
  const allTrkiKeys = new Set([...trkiDoneFull, ...trkiDoneSub]);
  const trkiCount = allTrkiKeys.size;
  const bestTest = (typeof STORE !== "undefined") ? STORE.get("bestTest", null) : null;
  const trkiHasActivity = trkiCount > 0 || bestTest !== null;

  // Tránh re-render trùng lặp gây nhấp nháy, nhưng đảm bảo cập nhật ngay khi có bất kỳ dữ liệu thực tế nào thay đổi
  const currentKey = `${user.uid || user.id || user.email}_${stats.streak}_${xp}_${stats.mastered}_${stats.dueCount}_${stats.newCount}_${listenCount}_${speakDoneSets.length}_${speakPassedSentences}_${writeDoneTasks.length}_${writeDraftCount}_${trkiCount}_${bestTest}_${completedJars}`;
  if (host.dataset.renderedKey === currentKey && host.firstElementChild) {
    host.style.display = "";
    return;
  }
  host.dataset.renderedKey = currentKey;

  const levelInfo = (typeof MascotRusika !== "undefined" && MascotRusika.getLevelInfo)
    ? MascotRusika.getLevelInfo(xp)
    : { level: 1, shortTitle: "Mèo con", nextXp: 100, percent: 0 };
  const icon = (name, size = 18) => window.RusiIcons ? RusiIcons.get(name, { size }) : "";
  const xpTarget = levelInfo.nextXp ? `${xp} / ${levelInfo.nextXp} XP` : `${xp} XP`;

  const skills = [
    {
      icon: "archive-jar",
      title: "Từ vựng",
      count: stats.mastered > 0
        ? `${stats.mastered} từ đã thuộc${completedJars > 0 ? ` (${completedJars} lọ xong)` : ""}`
        : (completedJars > 0 ? `${completedJars} lọ từ đã hoàn thành` : `${stats.newCount || 10} từ mới sẵn sàng`),
      note: stats.dueCount > 0
        ? `${stats.dueCount} từ đã đến hạn ôn tập`
        : (stats.newCount > 0 ? `${stats.newCount} từ mới sẵn sàng để học` : "Đã duy trì lịch ôn Spaced Repetition"),
      href: "vocabulary.html",
      action: "Học từ vựng",
      attention: stats.dueCount > 0
    },
    {
      icon: "headphones",
      title: "Luyện nghe",
      count: listenCount > 0
        ? (listenLessonsCount > 0 ? `${listenLessonsCount} bài học (${listenCount} lượt xong)` : `${listenCount} hoạt động đã hoàn thành`)
        : "Chưa bắt đầu luyện nghe",
      note: listenCount > 0 ? "Tiếp tục luyện nghe hiểu và chép chính tả" : "Bắt đầu với bài luyện nghe video & chép chính tả",
      href: "listening.html",
      action: "Luyện nghe",
      attention: listenCount === 0
    },
    {
      icon: "mic-speaking",
      title: "Luyện nói",
      count: speakDoneSets.length > 0
        ? `${speakDoneSets.length} bài hoàn thành${speakPassedSentences > 0 ? ` (${speakPassedSentences} câu đạt chuẩn)` : ""}`
        : (speakPassedSentences > 0 ? `${speakPassedSentences} câu luyện đạt chuẩn` : (speakTotalSentences > 0 ? `${speakTotalSentences} câu đã thử sức` : "Chưa bắt đầu luyện nói")),
      note: speakHasActivity ? "Tiếp tục luyện phát âm và phản xạ nói" : "Bắt đầu bài luyện phát âm AI & Shadowing",
      href: "speaking.html",
      action: "Luyện nói",
      attention: !speakHasActivity
    },
    {
      icon: "pen-tool",
      title: "Luyện viết",
      count: writeDoneTasks.length > 0
        ? `${writeDoneTasks.length} bài AI đã chấm điểm`
        : (writeDraftCount > 0 ? `${writeDraftCount} bài đang viết dở` : "Chưa có bài viết"),
      note: writeDoneTasks.length > 0
        ? "Tiếp tục viết bài theo cấp độ hiện tại"
        : (writeDraftCount > 0 ? "Đang có bản nháp chưa gửi, tiếp tục hoàn thiện" : "Chọn đề viết theo cấp độ để bắt đầu"),
      href: "writing.html",
      action: "Luyện viết",
      attention: !writeHasActivity
    },
    {
      icon: "graduation-cap",
      title: "Thi TRKI",
      count: trkiCount > 0
        ? `${trkiCount} đề & bài thi đã nộp`
        : (bestTest !== null ? `Đã thi thử (Điểm: ${bestTest}%)` : "Chưa có kết quả thi thử"),
      note: bestTest !== null ? `Điểm tốt nhất: ${bestTest}%` : (trkiCount > 0 ? "Đã nộp bài khảo thí TRKI" : "Làm đề thi thử để đánh giá năng lực TRKI"),
      href: "mock-test.html",
      action: "Luyện thi",
      attention: !trkiHasActivity
    }
  ];

  host.style.display = "";
  host.innerHTML = `
    <div class="index-progress-wrapper" id="progress">
      <div class="index-progress-head">
        <h2 class="index-progress-title">Chào mừng trở lại, <span class="index-user-name">${esc(userName)}</span>!</h2>
        <p class="index-progress-desc">Theo dõi toàn bộ quá trình học và biết nội dung cần ưu tiên tiếp theo.</p>
      </div>

      <div class="index-progress-metrics">
        <div class="index-metric-card stat-streak">
          <div class="index-metric-icon">${icon("flame-streak", 20)}</div>
          <div class="index-metric-info">
            <span class="index-metric-num">${stats.streak} <small>ngày</small></span>
            <span class="index-metric-label">Chuỗi streak</span>
          </div>
        </div>

        <div class="index-metric-card stat-xp">
          <div class="index-metric-icon">${icon("zap-xp", 20)}</div>
          <div class="index-metric-info">
            <span class="index-metric-num">${Number(xp).toLocaleString("vi-VN")} <small>XP</small></span>
            <span class="index-metric-label">XP tích lũy</span>
          </div>
        </div>

        <div class="index-metric-card stat-mastered">
          <div class="index-metric-icon">${icon("check-circle-correct", 20)}</div>
          <div class="index-metric-info">
            <span class="index-metric-num">${stats.mastered} <small>từ</small></span>
            <span class="index-metric-label">Từ đã thuộc</span>
          </div>
        </div>

        <div class="index-metric-card stat-due">
          <div class="index-metric-icon">${icon("archive-jar", 20)}</div>
          <div class="index-metric-info">
            <span class="index-metric-num">${stats.dueCount > 0 ? stats.dueCount : stats.newCount} <small>từ</small></span>
            <span class="index-metric-label">${stats.dueCount > 0 ? "Cần ôn tập" : "Từ mới sẵn sàng"}</span>
          </div>
        </div>
      </div>

      <div class="index-skills-section">
        <div class="index-skills-head">
          <h3 class="index-skills-heading">Tiến độ theo kỹ năng</h3>
          <p class="index-skills-caption">Các kết quả được cập nhật tự động sau mỗi hoạt động học.</p>
        </div>

        <div class="index-skills-grid">
          ${skills.map((skill) => `
            <a class="index-skill-card" href="${skill.href}">
              <div class="index-skill-card-top">
                <div class="index-skill-icon-bubble">${icon(skill.icon, 30)}</div>
                <div class="index-skill-meta">
                  <h4 class="index-skill-title">${skill.title}</h4>
                  <div class="index-skill-count">${skill.count}</div>
                </div>
              </div>
              <div class="index-skill-card-footer">
                <span class="index-skill-action-text">${skill.action}</span>
                <span class="index-skill-arrow-icon">${icon("arrow-right", 14)}</span>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  if (window.location.hash === "#progress") {
    setTimeout(() => {
      try {
        host.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (_) {}
    }, 150);
  }
}

// Lắng nghe sự kiện đồng bộ tiến độ thời gian thực
window.addEventListener("trki:progress-updated", () => {
  const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
  if (user) {
    renderIndexProgressIfLoggedIn(user);
  }
});

/**
 * Cầu nối: khi trạng thái auth đổi, re-render khu vực user trong header.
 * An toàn nếu Auth chưa được tải (chỉ chạy khi đã có cả 2).
 */
function bindAuthToHeader() {
  if (!window.Auth) return;
  window.Auth.onChange((u) => {
    // Lưu/xoá cache user để lần tải trang sau render avatar NGAY,
    // không phải chờ Firebase phản hồi (tránh header nhảy nút Đăng nhập ↔ avatar).
    STORE.set("auth_user", u || null);
    renderUserArea();
    if (typeof window.renderPricingGrid === "function") {
      window.renderPricingGrid();
    }
    if (u && typeof Progress !== "undefined" && typeof Progress.syncFromCloud === "function") {
      Progress.syncFromCloud().then(() => {
        if (typeof renderIndexProgressIfLoggedIn === "function") {
          renderIndexProgressIfLoggedIn(u);
        }
      });
    }
  });

  // Lắng nghe sự kiện cập nhật trạng thái PRO
  window.addEventListener("trki:pro-updated", () => {
    renderUserArea();
    if (typeof window.renderPricingGrid === "function") {
      window.renderPricingGrid();
    }
  });
}

// ============================================================================
// HỆ THỐNG ĐO THỜI GIAN HỌC CHUYÊN CẦN (5 PHÚT / NGÀY -> TÍNH 1 STREAK & XP)
// ============================================================================
(function initDailyStudyTimer() {
  if (typeof window === "undefined") return;
  const STUDY_PAGES = ["vocabulary", "listening", "speaking", "writing", "mock-test"];
  const page = document.body ? document.body.dataset.page : "";
  const isStudyPage = STUDY_PAGES.some(p => page === p || (window.location && window.location.pathname.includes(p)));
  if (!isStudyPage) return;

  const todayStr = (typeof getLocalDateString === "function") ? getLocalDateString() : new Date().toISOString().split("T")[0];
  const timeKey = "study_secs_" + todayStr;
  let activeSecs = (typeof STORE !== "undefined") ? STORE.get(timeKey, 0) : 0;
  const creditedKey = "study_5min_credited_" + todayStr;

  setInterval(() => {
    if (document.visibilityState !== "visible") return;
    activeSecs += 5;
    if (typeof STORE !== "undefined") STORE.set(timeKey, activeSecs);

    if (activeSecs >= 300 && typeof STORE !== "undefined" && !STORE.get(creditedKey, false)) {
      STORE.set(creditedKey, true);
      if (typeof Progress !== "undefined") {
        Progress.addXp(10, {
          skill_type: "study_session",
          item_id: "daily_5min",
          item_title: "Chuyên cần 5 phút luyện tập hôm nay",
          duration_seconds: activeSecs
        });
        toast("🔥 Bạn đã học tập chăm chỉ đủ 5 phút hôm nay! Chuỗi Streak +1 (+10 XP)!");
      }
    }
  }, 5000);
})();

function renderFooter() {
  const host = document.getElementById("app-footer");
  if (!host) return;
  host.innerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col-brand">
        <a class="brand footer-brand" href="index.html" aria-label="Rusi TRKI - Trang chủ">
          <span class="brand-mark">Я</span>
          <span class="footer-brand-text">Rusi<span>TRKI</span></span>
        </a>
      </div>
      <p class="footer-desc">Học tiếng Nga hiện đại, dễ hiểu và đầy cảm hứng. Hệ sinh thái học tập toàn diện phục vụ luyện thi chứng chỉ, du học và đời sống tại Liên bang Nga.</p>
      <div class="footer-links" aria-label="Điều hướng chân trang">
        <a href="vocabulary.html">Từ vựng</a>
        <a href="writing.html">Viết</a>
        <a href="listening.html">Nghe</a>
        <a href="speaking.html">Nói</a>
        <a href="mock-test.html">TRKI</a>
        <a href="blog.html">Blog</a>
        <a href="upgrade.html">Gói PRO</a>
      </div>
      <div class="footer-copyright">
        <small>© 2026 RUSI TRKI. Mọi quyền được bảo lưu.</small>
      </div>
    </div>
  </footer>`;
}

function quizEngine(container, questions, { onFinish } = {}) {
  container.innerHTML = "";
  // Lọc bỏ câu lỗi (thiếu options / đáp án sai chỉ số) — phòng dữ liệu admin hỏng
  questions = (Array.isArray(questions) ? questions : []).filter(
    (q) => q && Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.a) && q.a >= 0 && q.a < q.options.length
  );
  let correct = 0;
  let index = 0;

  // Không có câu hỏi nào: tránh chia 0 (NaN%) và treo màn hình
  if (questions.length === 0) {
    container.innerHTML = `<div class="quiz-result"><p>Chưa có câu hỏi cho bài này.</p></div>`;
    if (onFinish) onFinish(0, 0);
    return;
  }

  const renderQ = () => {
    if (index >= questions.length) {
      const pct = Math.round((correct / questions.length) * 100);
      container.innerHTML = `
        <div class="quiz-result">
          <p class="big">${correct}/${questions.length}</p>
          <p>${pct >= 80 ? "Xuất sắc!" : pct >= 50 ? "Khá tốt — luyện thêm nhé!" : "Đừng lo, thử lại sau khi học kỹ hơn nhé!"}</p>
          <button class="btn btn-soft" id="quizRetry">Làm lại</button>
        </div>`;
      container.querySelector("#quizRetry").onclick = () => {
        correct = 0;
        index = 0;
        renderQ();
      };
      if (onFinish) onFinish(pct, correct);
      return;
    }
    const item = questions[index];
    const opts = item.options.map((text, i) => ({ text, correct: i === item.a })).slice();
    const mixed = shuffle(opts);
    container.innerHTML = `
      <div class="quiz-q">
        <p class="q-text">Câu ${index + 1}/${questions.length}. ${item.ru ? `<span class="ru">${esc(item.ru)}</span><br>` : ""}${esc(item.q)}</p>
        <div class="options">
          ${mixed.map((o) => `<button class="option ru" data-ok="${o.correct ? 1 : 0}">${esc(o.text)}</button>`).join("")}
        </div>
        <div id="explainBox"></div>
      </div>`;
    container.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ok = btn.dataset.ok === "1";
        container.querySelectorAll(".option").forEach((b) => {
          b.disabled = true;
          if (b.dataset.ok === "1") b.classList.add("correct");
        });
        if (!ok) btn.classList.add("wrong");
        if (ok) correct++;
        if (item.ex) {
          container.querySelector("#explainBox").innerHTML =
            `<div class="explain">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} ${esc(item.ex)}</div>`;
        }
        index++;
        setTimeout(renderQ, ok && !item.ex ? 650 : 1400);
      });
    });
  };
  renderQ();
}

let _appBooted = false;
let _pageInited = false;

async function triggerPageInit() {
  if (_pageInited) return;
  const curPage = (document.body && document.body.dataset && document.body.dataset.page) || "";
  const NO_INIT_PAGES = ["admin", "login", "signup", "how-to-study", "404"];
  if (NO_INIT_PAGES.includes(curPage) && typeof window.initPage !== "function") {
    _pageInited = true;
    return;
  }
  if (typeof window.initPage === "function") {
    _pageInited = true;
    try {
      if (window.RusiDataLoader && typeof window.RusiDataLoader.prepareForCurrentPage === "function") {
        await window.RusiDataLoader.prepareForCurrentPage();
      }
      window.initPage();
    } catch (err) {
      console.error("[App] Lỗi khi thực thi initPage():", err);
    }
  } else {
    let retries = 0;
    const retryTimer = setInterval(async () => {
      retries++;
      if (typeof window.initPage === "function") {
        clearInterval(retryTimer);
        if (!_pageInited) {
          _pageInited = true;
          try {
            if (window.RusiDataLoader && typeof window.RusiDataLoader.prepareForCurrentPage === "function") {
              await window.RusiDataLoader.prepareForCurrentPage();
            }
            window.initPage();
          } catch (err) {
            console.error("[App] Lỗi khi thực thi initPage() (retry):", err);
          }
        }
      } else if (retries >= 150) {
        clearInterval(retryTimer);
        try {
          document.querySelectorAll(".rusi-skeleton-hub").forEach(s => s.style.display = "none");
        } catch (_) {}
      }
    }, 40);
  }
}
window.triggerPageInit = triggerPageInit;

function bootApp() {
  if (_appBooted) {
    triggerPageInit();
    return;
  }
  _appBooted = true;

  try { applyLightTheme(); } catch (e) { console.error("[Boot] applyLightTheme:", e); }
  try { renderHeader(); } catch (e) { console.error("[Boot] renderHeader:", e); }
  try { renderFooter(); } catch (e) { console.error("[Boot] renderFooter:", e); }
  try { applySeason("winter"); } catch (e) { console.error("[Boot] applySeason:", e); }
  try { Progress.checkStreakStatus(); } catch (e) { console.error("[Boot] checkStreakStatus:", e); }
  try { bindAuthToHeader(); } catch (e) { console.error("[Boot] bindAuthToHeader:", e); }
  // Dọn dẹp triệt để dữ liệu mock/cũ của client, chỉ sử dụng dữ liệu từ Supabase Cloud
  try {
    localStorage.removeItem("trki_local_data");
    localStorage.removeItem("rusi_local_data");
    const isPreview = window.location && window.location.search && window.location.search.includes("preview=1");
    if (!isPreview) {
      sessionStorage.removeItem("rusi_live_preview_draft");
      localStorage.removeItem("rusi_live_preview_draft");
    }
    // Xoá bộ nhớ đệm sessionStorage cũ của các phiên bản trước
    if (typeof sessionStorage !== "undefined") {
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const sk = sessionStorage.key(i);
        if (sk && (sk.startsWith("rusi_sb_cache_v5:") || sk.startsWith("rusi_local_") || sk.startsWith("trki_local_"))) {
          sessionStorage.removeItem(sk);
        }
      }
    }
  } catch (_) {}
  try { warmBrowserCache(); } catch (e) { console.warn("[Boot] warmBrowserCache:", e); }
  try {
    if (typeof MascotRusika !== "undefined" && typeof MascotRusika.renderFloatingWidget === "function") {
      const p = document.body ? document.body.dataset.page : "";
      const learningPages = ["vocabulary", "listening", "speaking", "writing", "mock-test", "admin", "login", "signup"];
      if (!learningPages.includes(p) && !document.body.classList.contains("in-workspace")) {
        MascotRusika.renderFloatingWidget();
      }
    }
  } catch (e) {
    console.error("[Boot] MascotRusika:", e);
  }

  triggerPageInit();

  try {
    if (
      "serviceWorker" in navigator &&
      (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ) {
      const swRoot = (typeof window.getRusiAppRoot === "function") ? window.getRusiAppRoot() : "";
      const registerSw = () => navigator.serviceWorker.register(swRoot + "sw.js").catch(() => {});
      if (document.readyState === "complete") registerSw();
      else window.addEventListener("load", registerSw, { once: true });
    }
  } catch (_) {}
}
window.bootApp = bootApp;

/**
 * Bộ nhớ đệm theo nhu cầu (No-op giữ tương thích API).
 * Mỗi trang chỉ nạp đúng module cần thiết qua RusiDataLoader.prepareForCurrentPage().
 */
function warmBrowserCache() {
  // No-op: Không tải nền 15.5MB và không gọi Supabase packages.getAll() lặp lại trên mỗi trang.
}
window.warmBrowserCache = warmBrowserCache;

// Đảm bảo app boot dù document đã ready hay chưa
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  // DOMContentLoaded đã kết thúc, chạy ngay tức thì!
  bootApp();
}

// Bắt sự kiện pageshow để hỗ trợ Back/Forward Cache (bfcache) của trình duyệt
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    bootApp();
  }
});

function mergeAdminData() {
  // Đã loại bỏ hoàn toàn việc đọc/gộp dữ liệu từ localStorage theo yêu cầu kiến trúc đám mây 100%
}

// =====================================================================
// RUSI TRKI — BỘ BIÊN DỊCH MARKDOWN (.MD) TOÀN HỆ THỐNG
// Hỗ trợ Blog, Bài học chủ đề từ vựng và CMS Live Preview
// =====================================================================
const RusiMarkdown = {
  render(text) {
    if (!text || typeof text !== "string") return "";

    let src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    // Code blocks ```lang ... ```
    const codeBlocks = [];
    src = src.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const idx = codeBlocks.length;
      codeBlocks.push(`<pre class="rusi-code-block"><code class="language-${lang || 'plaintext'}">${this.escapeHtml(code.trim())}</code></pre>`);
      return `@@CODEBLOCK${idx}@@`;
    });

    const lines = src.split("\n");
    const out = [];
    let inTable = false;
    let tableRows = [];
    let tableAligns = [];
    // Danh sách lồng nhau: mỗi phần tử { type: "ul"|"ol", indent } — thụt lề sâu hơn mở danh sách con trong <li>
    const listStack = [];

    const flushList = () => {
      while (listStack.length) {
        out.push("</li>" + (listStack.pop().type === "ol" ? "</ol>" : "</ul>"));
      }
    };

    const pushListItem = (type, indent, html, attrs) => {
      while (listStack.length && (listStack[listStack.length - 1].indent > indent ||
        (listStack[listStack.length - 1].indent === indent && listStack[listStack.length - 1].type !== type))) {
        out.push("</li>" + (listStack.pop().type === "ol" ? "</ol>" : "</ul>"));
      }
      const top = listStack[listStack.length - 1];
      if (!top || top.indent < indent) {
        // Danh sách gốc vốn thụt lề: ghi lại để trình soạn admin lưu đúng khoảng trắng
        const indentAttr = !top && indent > 0 ? ` data-indent="${indent}"` : "";
        out.push(`<${type} class="rusi-md-${type}"${attrs.list || ""}${indentAttr}>`);
        listStack.push({ type, indent });
      } else {
        out.push("</li>");
      }
      out.push(`<li${attrs.item || ""}>${html}`);
    };

    // Ô bảng: tách theo "|" chưa escape; "\|" là ký tự | trong nội dung ô
    // (không dùng regex lookbehind: Safari iOS < 16.4 sẽ lỗi cú pháp toàn bộ app.js)
    const splitCells = (row) => row.replace(/\\\|/g, "\u0001").split("|").map(c => c.replace(/\u0001/g, "|"));
    const alignAttr = (idx) => {
      const a = tableAligns[idx];
      return a ? ` data-align="${a}"${a === "left" ? "" : ` style="text-align:${a}"`}` : "";
    };

    const flushTable = () => {
      if (inTable) {
        if (tableRows.length > 0) {
          let tblHtml = '<div class="topic-vocab-table-wrapper" style="overflow-x:auto;margin:16px 0"><table class="topic-vocab-table rusi-md-table">';
          tableRows.forEach((row, rIdx) => {
            if (rIdx === 0) {
              tblHtml += '<thead><tr>' + row.map((c, ci) => `<th${alignAttr(ci)}>${this.formatInline(c.trim())}</th>`).join('') + '</tr></thead><tbody>';
            } else {
              tblHtml += '<tr>' + row.map((c, ci) => `<td${alignAttr(ci)}>${this.formatInline(c.trim())}</td>`).join('') + '</tr>';
            }
          });
          tblHtml += '</tbody></table></div>';
          out.push(tblHtml);
        }
        inTable = false;
        tableRows = [];
        tableAligns = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        flushTable();
        continue;
      }

      // Table row: | col1 | col2 |
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushList();
        // Separator row: |---|:---:|---:| → căn lề từng cột
        if (/^\|(\s*[-:]+[-| :]*)\|$/.test(trimmed)) {
          tableAligns = trimmed.slice(1, -1).split("|").map((s) => {
            const t = s.trim();
            if (t.startsWith(":") && t.endsWith(":")) return "center";
            if (t.endsWith(":")) return "right";
            if (t.startsWith(":")) return "left";
            return "";
          });
          continue;
        }
        const cells = splitCells(trimmed.slice(1, -1));
        inTable = true;
        tableRows.push(cells);
        continue;
      } else {
        flushTable();
      }

      // Horizontal rule: --- or ***
      if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
        flushList();
        out.push('<hr class="rusi-md-divider" />');
        continue;
      }

      // Headers: #, ##, ###, ####
      const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (hMatch) {
        flushList();
        const level = hMatch[1].length;
        const tag = "h" + level;
        out.push(`<${tag} class="rusi-md-${tag}">${this.formatInline(hMatch[2])}</${tag}>`);
        continue;
      }

      // Blockquotes & Alerts: > text or > [!NOTE] or > [!TIP] or > [!WARNING]
      if (trimmed.startsWith(">")) {
        flushList();
        flushTable();
        const quoteLines = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
          i++;
        }
        i--;

        const first = quoteLines[0] || "";
        const alertMatch = first.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/i);
        if (alertMatch) {
          const alertType = alertMatch[1].toUpperCase();
          const firstContent = alertMatch[2] ? alertMatch[2].trim() : "";
          const rest = quoteLines.slice(1);
          if (firstContent) rest.unshift(firstContent);
          const fullContent = rest.map(l => this.formatInline(l)).join("<br/>");

          let icon = (typeof RusiIcons !== "undefined") ? RusiIcons.get("bookmark", { size: 18 }) : "📌";
          let typeClass = "rusi-md-callout-note";
          let typeTitle = "Ghi chú";
          if (alertType === "TIP") {
            icon = (typeof RusiIcons !== "undefined") ? RusiIcons.get("lightbulb", { size: 18 }) : "💡";
            typeClass = "rusi-md-callout-tip";
            typeTitle = "Mẹo ghi nhớ";
          } else if (alertType === "WARNING") {
            icon = (typeof RusiIcons !== "undefined") ? RusiIcons.get("alert-triangle", { size: 18 }) : "⚠️";
            typeClass = "rusi-md-callout-warning";
            typeTitle = "Cảnh báo";
          } else if (alertType === "IMPORTANT") {
            icon = (typeof RusiIcons !== "undefined") ? RusiIcons.get("zap", { size: 18 }) : "⚡";
            typeClass = "rusi-md-callout-important";
            typeTitle = "Lưu ý trọng tâm";
          } else if (alertType === "CAUTION") {
            icon = (typeof RusiIcons !== "undefined") ? RusiIcons.get("alert-circle", { size: 18 }) : "🛑";
            typeClass = "rusi-md-callout-warning";
            typeTitle = "Cẩn trọng";
          }

          out.push(`
            <div class="rusi-md-callout ${typeClass}" data-alert="${alertType}">
              <span class="rusi-md-callout-icon">${icon}</span>
              <div class="rusi-md-callout-body">
                <div class="rusi-md-callout-title">${typeTitle}</div>
                <div class="rusi-md-callout-text">${fullContent}</div>
              </div>
            </div>
          `);
        } else {
          out.push(`<blockquote class="rusi-md-quote">${quoteLines.map(l => this.formatInline(l)).join("<br/>")}</blockquote>`);
        }
        continue;
      }

      const indent = (line.match(/^[ \t]*/)[0] || "").replace(/\t/g, "    ").length;

      // Ordered list: 1. 2. 3. (giữ số bắt đầu qua thuộc tính start)
      const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      if (olMatch) {
        const start = Number(olMatch[1]);
        pushListItem("ol", indent, this.formatInline(olMatch[2]), { list: start !== 1 ? ` start="${start}"` : "" });
        continue;
      }

      // Unordered list: - * • (ghi nhớ ký hiệu gốc để trình soạn admin lưu lại đúng)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
        const marker = trimmed[0];
        pushListItem("ul", indent, this.formatInline(trimmed.slice(2)), { item: marker === "-" ? "" : ` data-marker="${marker}"` });
        continue;
      }

      // Audio nhúng (trình soạn admin tạo ra): chỉ nhận nguồn http(s) hoặc đường dẫn tương đối an toàn
      const audioMatch = trimmed.match(/^<audio\b[^>]*\bsrc="([^"]+)"[^>]*>\s*<\/audio>$/i);
      if (audioMatch) {
        flushList();
        const safeSrc = this._safeUrl(audioMatch[1]);
        if (safeSrc !== "#" && !/^(mailto:|#)/i.test(safeSrc)) {
          out.push(`<audio class="rusi-md-audio" controls preload="none" src="${safeSrc}"></audio>`);
          continue;
        }
      }

      // Normal paragraph or standalone codeblock
      flushList();
      if (/^@@CODEBLOCK\d+@@$/.test(trimmed)) {
        out.push(trimmed);
      } else {
        out.push(`<p class="rusi-md-p">${this.formatInline(trimmed)}</p>`);
      }
    }

    flushList();
    flushTable();

    let html = out.join("\n");
    html = html.replace(/@@CODEBLOCK(\d+)@@/g, (match, idx) => codeBlocks[Number(idx)] || "");
    return html;
  },

  _safeUrl(url) {
    if (!url || typeof url !== "string") return "#";
    const raw = url
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
    if (!raw || /[\x00-\x1f\x7f"'<>`]/.test(raw) || /^[\/\\][\/\\]/.test(raw) || /\\/.test(raw)) return "#";
    const normalized = raw.replace(/\s+/g, "").toLowerCase();
    if (/^(javascript|vbscript|data):/.test(normalized)) return "#";
    const hasSafePrefix = /^(https?:\/\/|mailto:|\/|\.\/|\.\.\/|#)/i.test(raw);
    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(normalized);
    if (!hasSafePrefix && hasScheme) return "#";
    return this.escapeHtml(raw);
  },

  // Chỉ chấp nhận "color:X" và/hoặc "background-color:X" với X là mã hex hoặc rgb()/rgba(); ngược lại null
  _safeColorStyle(style) {
    if (style === undefined || style === null) return "";
    const COLOR = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\))$/i;
    const parts = String(style).split(";").map(s => s.trim()).filter(Boolean);
    if (!parts.length) return null;
    const safe = [];
    for (const p of parts) {
      const m = p.match(/^(color|background-color)\s*:\s*(.+)$/i);
      if (!m || !COLOR.test(m[2].trim())) return null;
      safe.push(`${m[1].toLowerCase()}:${m[2].trim()}`);
    }
    return safe.join(";");
  },

  formatInline(str) {
    if (!str) return "";
    const tokens = [];
    const stash = (html) => {
      const idx = tokens.length;
      tokens.push(html);
      return `\u0000MDTOK${idx}\u0000`;
    };

    let out = this.escapeHtml(str).replace(/\u0000/g, "").replace(/&lt;br\s*\/?&gt;/gi, "<br/>");

    // Inline code: `code`
    out = out.replace(/`([^`]+)`/g, (_, code) =>
      stash(`<code class="rusi-md-inline-code">${code}</code>`)
    );
    // Images: ![alt](url)
    out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) =>
      stash(`<img src="${this._safeUrl(url)}" alt="${alt}" class="rusi-md-img" loading="lazy" />`)
    );
    // Links: [text](url)
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const fmtLabel = label
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
      return stash(`<a href="${this._safeUrl(url)}" target="_blank" rel="noopener noreferrer" class="rusi-md-link">${fmtLabel}</a>`);
    });
    // Bold: **text** or __text__
    out = out
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // Italic: *text* or _text_ (non-word boundary to protect snake_case)
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/(^|[^\w])_([^_\n]+)_(?=[^\w]|$)/g, '$1<em>$2</em>')
      // Strikethrough: ~~text~~
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      // Quotes: “text” or «text» (giữ nguyên ký tự ngoặc gốc)
      .replace(/([«“])(.*?)([»”])/g, '<span class="rusi-quote-highlight">$1$2$3</span>');

    // Thẻ màu do trình soạn admin tạo ra: chỉ khôi phục <mark>/<span> khi style là màu hợp lệ
    // (văn bản đã escape ở trên nên mọi thuộc tính khác vẫn hiện dạng chữ, không thành HTML)
    out = out
      .replace(/&lt;(mark|span)(?: style=&quot;([^&]*)&quot;)?&gt;([\s\S]*?)&lt;\/\1&gt;/g, (m, tag, style, inner) => {
        const safeStyle = this._safeColorStyle(style);
        if (style !== undefined && safeStyle === null) return m;
        if (tag === "span" && !safeStyle) return m;
        return `<${tag}${safeStyle ? ` style="${safeStyle}"` : ""}>${inner}</${tag}>`;
      });

    let restored = out;
    for (let pass = 0; pass < 5; pass++) {
      if (!/\u0000MDTOK\d+\u0000/.test(restored)) break;
      restored = restored.replace(/\u0000MDTOK(\d+)\u0000/g, (_, idx) => tokens[Number(idx)] || "");
    }
    return restored;
  },

  escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
};
window.RusiMarkdown = RusiMarkdown;

// Universal Global Exports
window.Progress = Progress;
// Rời trang/ẩn tab khi còn lần ghi đang chờ → ghi ngay để không mất tiến độ
const flushPendingProgress = () => {
  if (Progress._syncTimer) Progress.flushSync();
};
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushPendingProgress();
});
window.addEventListener("pagehide", flushPendingProgress);
if (typeof MascotRusika !== "undefined") window.MascotRusika = MascotRusika;
if (typeof AuthModal !== "undefined") window.AuthModal = AuthModal;
if (typeof currentSeason !== "undefined") window.currentSeason = currentSeason;
if (typeof renderHeader !== "undefined") window.renderHeader = renderHeader;
if (typeof renderFooter !== "undefined") window.renderFooter = renderFooter;
