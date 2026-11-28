/**
 * RUSI TRKI — page-speaking.js
 * Phân hệ trang: initSpeakingPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initSpeakingPage() {
  const el = window.el || function(sel) { return document.querySelector(sel); };
  // Ghi nhớ tham số điều hướng NGAY khi khởi động: renderHub() gọi setRusiDeepUrl('/speaking') trên tên miền thật,
  // làm mất ?set= / ?mode= / ?level= trước khi checkUrlSet() kịp đọc (localhost không đổi URL nên không thấy lỗi)
  const initialRoute = (() => {
    const sp = new URLSearchParams(window.location.search);
    const read = (k) => (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || sp.get(k);
    return { mode: read("mode"), level: read("level"), set: read("set"), id: read("id") };
  })();
  const host = el("#speakHost");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const icon = (name, size = 18) => (window.RusiIcons ? RusiIcons.get(name, { size }) : "");
  // XP khi hoàn thành trọn một bài luyện nói — theo quy tắc chuẩn RUSI_XP_RULES (app.js)
  const SPEAK_LESSON_XP = (typeof RUSI_XP_RULES !== "undefined" && RUSI_XP_RULES.SPEAKING_TOPIC_PASS) || 25;

  // Kiểm tra cảnh báo thiết bị & trình duyệt theo chuẩn DauEnglish
  if (typeof RusiAudioRecorder !== "undefined" && RusiAudioRecorder.getBrowserAdvice) {
    const advice = RusiAudioRecorder.getBrowserAdvice();
    const warnEl = el("#srWarn");
    if (advice && warnEl) {
      warnEl.innerHTML = `<i data-rusi-icon="info" data-size="16"></i> ${advice}`;
      warnEl.classList.remove("hidden");
      if (window.RusiIcons && typeof RusiIcons.replace === "function") {
        RusiIcons.replace(warnEl);
      }
    }
  } else if (!SR && el("#srWarn")) {
    el("#srWarn").classList.remove("hidden");
    if (window.RusiIcons && typeof RusiIcons.replace === "function") {
      RusiIcons.replace(el("#srWarn"));
    }
  }

  const LEVELS = [
    ["A1", "Sơ cấp"],
    ["A2", "Cơ bản"],
    ["B1", "Trung cấp"],
    ["B2", "Trung cấp cao"],
    ["C1", "Cao cấp"],
    ["C2", "Thành thạo"]
  ];

  const MODE_INFO = {
    shadowing: {
      title: "Shadowing – Nghe và nói nhại",
      subtitle: "Nghe người bản xứ nói, nhại lại ngữ điệu và AI nhận diện âm vị sửa lỗi phát âm",
      icon: "mic-speaking"
    },
    reflex: {
      title: "Luyện phản xạ",
      subtitle: "Hội thoại tình huống đời sống, phỏng vấn và phản xạ giao tiếp tự nhiên",
      icon: "zap-xp"
    }
  };

  let currentMode = "shadowing";
  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let cloudSpeaking = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("speaking:all") : null;

  const getSpeakingSets = () => {
    // Ưu tiên module (có thẻ PRO dạng khoá); danh sách lấy thẳng từ bảng bị RLS bỏ bài PRO nên chỉ dùng khi module trống
    if (typeof window !== "undefined" && window.SPEAKING_SETS && window.SPEAKING_SETS.length) return window.SPEAKING_SETS;
    if (cloudSpeaking && cloudSpeaking.length) return cloudSpeaking;
    if (typeof SPEAKING_SETS !== "undefined" && Array.isArray(SPEAKING_SETS) && SPEAKING_SETS.length) return SPEAKING_SETS;
    return [];
  };

  const matchesSpeakingMode = (s, mode) => {
    const sm = (s.speaking_mode || s.mode || "").toLowerCase();
    if (sm) return sm === mode;
    const cat = (s.category || "").toLowerCase();
    if (mode === "reflex") {
      return cat === "speech_studio" || cat === "reflex" || cat === "conversation";
    }
    return cat === "shadowing" || (!cat && cat !== "speech_studio" && cat !== "reflex" && cat !== "conversation");
  };

  const checkUrlSet = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = (k) => initialRoute[k] || (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || urlParams.get(k);
      const modeParam = (getParam("mode") || "").toLowerCase();
      if (modeParam === "shadowing" || modeParam === "reflex") {
        currentMode = modeParam;
      }
      const lvlParam = (getParam("level") || "").toUpperCase();
      if (lvlParam && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(lvlParam)) {
        currentLevel = lvlParam;
      }
      const targetId = getParam("set") || getParam("id");
      if (targetId) {
        if (typeof window.requireAuth === "function" && !window.requireAuth("speaking.html?set=" + encodeURIComponent(targetId))) return true;
        const all = getSpeakingSets();
        const found = all.find(s => String(s.id).toLowerCase() === String(targetId).toLowerCase() || String(s.code || "").toLowerCase() === String(targetId).toLowerCase());
        if (found && Boolean(found.is_pro_only || found.is_pro) && !Monetization.isPro()) {
          initialRoute.set = initialRoute.id = null; // hiện modal PRO 1 lần
          Monetization.showProGateModal("Nội dung luyện nói dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn.");
          return false;
        }
        if (found) {
          if (matchesSpeakingMode(found, "reflex")) {
            currentMode = "reflex";
          } else {
            currentMode = "shadowing";
          }
          currentLevel = found.level || currentLevel;
          initialRoute.set = initialRoute.id = null; // đã mở: không tự mở lại khi dữ liệu tải xong muộn
          openSpeakingWorkspace(found, currentMode);
          return true;
        }
      }
    } catch (err) {
      console.error("[Speaking] Không mở được bài từ link:", err);
    }
    return false;
  };

  const loadCloudSpeaking = async () => {
    // 0-Egress rule: Bỏ qua truy vấn Supabase nếu đã có bài luyện nói trong RAM/IndexedDB/file module
    if (window.SPEAKING_SETS && window.SPEAKING_SETS.length > 0) return;
    // Chờ module nạp xong trước (đúng thứ tự như trang Nghe) — chỉ truy vấn bảng khi module thật sự trống
    if (window.RusiDataLoader && !window.RusiDataLoader.isLoaded("SPEAKING_SETS")) {
      try { await window.RusiDataLoader.load("SPEAKING_SETS"); } catch (err) { console.warn("[Speaking] Lỗi nạp module SPEAKING_SETS:", err); }
      if (window.SPEAKING_SETS && window.SPEAKING_SETS.length > 0) return;
    }
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.speaking.getAll();
        if (remote && remote.length) {
          cloudSpeaking = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài nói từ Database!`);
          if (!document.body.classList.contains("in-workspace")) {
            if (!checkUrlSet()) {
              renderSpeakingCards();
            }
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài nói từ cloud:", err);
      }
    }
  };
  loadCloudSpeaking();

  if (window.RusiDataLoader && !window.RusiDataLoader.isLoaded("SPEAKING_SETS")) {
    window.RusiDataLoader.load("SPEAKING_SETS").then(() => {
      if (!document.body.classList.contains("in-workspace")) {
        if (!checkUrlSet()) {
          renderSpeakingCards();
        }
      }
    });
  }

  const filteredSets = () => {
    const all = getSpeakingSets();
    const urlParams = new URLSearchParams(window.location.search);
    const targetCat = (urlParams.get("cat") || urlParams.get("category") || "").toLowerCase().trim();

    return all.filter((s) => {
      if (s.level !== currentLevel) return false;
      if (!matchesSpeakingMode(s, currentMode)) return false;
      if (targetCat) {
        const sCat = (s.topic || s.category || s.genre || "").toLowerCase();
        if (sCat && !sCat.includes(targetCat)) return false;
      }
      return true;
    });
  };

  const renderSpeakingCards = () => {
    const gridHost = el("#spCardsGrid");
    if (!gridHost) return;

    const all = getSpeakingSets();

    // Cập nhật trạng thái active của 2 thẻ chọn Mode
    host.querySelectorAll(".speaking-mode-card").forEach((button) => {
      const active = button.dataset.mode === currentMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // Cập nhật số lượng bài học theo Mode hiện tại trên từng tab cấp độ
    LEVELS.forEach(([level]) => {
      const count = all.filter((s) => s.level === level && matchesSpeakingMode(s, currentMode)).length;
      const countNode = host.querySelector(`[data-speaking-count="${level}"]`);
      if (countNode) countNode.textContent = count;
    });

    // Cập nhật trạng thái active của các tab cấp độ
    host.querySelectorAll(".speaking-level-tab").forEach((b) => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = filteredSets();

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state speaking-empty-state">
          <span class="writing-empty-icon speaking-empty-icon">${icon(MODE_INFO[currentMode].icon, 34)}</span>
          <h3>Chưa có bài ${currentMode === "shadowing" ? "Shadowing" : "luyện phản xạ"} ở cấp ${currentLevel}</h3>
          <p>Hãy chọn một cấp độ khác để tiếp tục luyện tập.</p>
        </div>
      `;
      const pagEl = el("#spPagination");
      if (pagEl) pagEl.innerHTML = "";
      return;
    }

    gridHost.innerHTML = pageItems.map((s) => {
      const isDone = Progress.doneList("speakDone").includes(s.id);
      const isPro = Boolean(s.is_pro_only || s.is_pro);
      const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
      const sentenceCount = (s.items || s.sentences || (s.raw_data && s.raw_data.items) || []).length || s.sentence_count || 0;
      const countLabel = `${sentenceCount} câu ${currentMode === "shadowing" ? "shadowing" : "phản xạ"}`;
      const actionLabel = isDone ? "Đã hoàn thành" : (currentMode === "shadowing" ? "Vào luyện Shadowing" : "Vào luyện phản xạ");
      const iconKey = currentMode === "reflex" ? "zap-xp" : (s.icon || "mic-speaking");

      return `
        <article class="rusi-card rusi-card-compact speaking-topic-card ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-speak-id="${s.id}">
          <div class="rusi-card-header">
            <div class="rusi-card-icon" style="background:rgba(234,88,12,0.08);color:#ea580c">
              ${icon(iconKey, 24)}
            </div>
            <div class="rusi-card-header-main">
              <div class="rusi-card-title-row">
                <h3 class="rusi-card-ru" title="${esc(s.title)}">${esc(s.title)}</h3>
                ${isDone ? `
                  <span class="topic-status topic-status-completed" style="flex-shrink:0">
                    ${icon("check", 12)} Hoàn thành
                  </span>
                ` : isPro ? `
                  <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                ` : ""}
              </div>
              <div class="rusi-card-subinfo">
                <span>${s.level}</span>
                <span class="rusi-card-sep">•</span>
                <span class="rusi-card-count">${countLabel}</span>
              </div>
            </div>
          </div>

          <div class="rusi-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
            <div class="topic-footer-actions">
              ${isPro && !isUnlocked ? `
                <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                  ${icon("lock-pro", 16) || icon("lock", 16)}
                </span>
              ` : `
                <button type="button" class="btn-speak-action topic-text-btn" data-speak-id="${s.id}" title="${actionLabel}">
                  ${actionLabel} ${icon("arrow-right", 14)}
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    const openLesson = (id) => {
      const s = all.find(x => x.id === id);
      if (!s) return;
      const isPro = Boolean(s.is_pro_only || s.is_pro);
      if (isPro && !Monetization.isPro()) {
        Monetization.showProGateModal("Nội dung luyện nói dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn.");
        return;
      }
      openSpeakingWorkspace(s, currentMode);
    };

    gridHost.querySelectorAll(".btn-speak-action").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        openLesson(btn.dataset.speakId);
      };
    });

    gridHost.querySelectorAll(".speaking-topic-card").forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest("button")) return;
        openLesson(card.dataset.speakId);
      };
    });

    renderRusiPagination(el("#spPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderSpeakingCards();
    }, { remainingCount, unit: "bài" });
  };

  let openSpeakingSet = null; // bài đang mở trong workspace (dùng cho nút Back của trình duyệt)

  const renderHub = () => {
    openSpeakingSet = null;
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/speaking');
    }
    document.body.classList.remove("in-workspace");
    host.innerHTML = `
      <section class="writing-hub listening-hub speaking-hub" id="speakingHub">
        <header class="writing-hub-header listening-hub-header speaking-hub-header">
          <h1>Chọn cách bạn muốn luyện nói</h1>
          <p>Rèn luyện phát âm chuẩn bản xứ qua phương pháp Shadowing và phản xạ giao tiếp thực tế.</p>
        </header>

        <div class="writing-mode-grid listening-mode-grid speaking-mode-grid" aria-label="Chọn dạng luyện nói">
          ${Object.entries(MODE_INFO).map(([key, info]) => `
            <button type="button" class="writing-mode-card listening-mode-card speaking-mode-card ${key === currentMode ? "active" : ""}" data-mode="${key}" aria-pressed="${key === currentMode}">
              <span class="writing-mode-icon listening-mode-icon speaking-mode-icon">${icon(info.icon, 28)}</span>
              <span class="writing-mode-copy listening-mode-copy speaking-mode-copy">
                <strong>${info.title}</strong>
                <small>${info.subtitle}</small>
              </span>
              <span class="writing-mode-arrow listening-mode-arrow">${icon("arrow-right", 18)}</span>
            </button>
          `).join("")}
        </div>

        <div class="level-tabs writing-level-tabs listening-level-tabs speaking-level-tabs" role="tablist" aria-label="Lọc bài nói theo cấp độ" id="spLevelTabs">
          ${LEVELS.map(([level, label]) => `
            <button type="button" class="level-tab writing-level-tab listening-level-tab speaking-level-tab ${level === currentLevel ? "level-tab-active active" : ""}" data-level="${level}" role="tab" aria-selected="${level === currentLevel ? "true" : "false"}">
              <span class="level-code">${level}</span>
              <small>${label}</small>
              <span class="level-tab-count" data-speaking-count="${level}">0</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-topic-grid listening-topic-grid speaking-topic-grid" id="spCardsGrid"></div>
        <div class="rusi-pagination" id="spPagination"></div>
      </section>
    `;

    // Click đổi mode
    host.querySelectorAll(".speaking-mode-card").forEach((button) => {
      button.onclick = () => {
        const newMode = button.dataset.mode;
        if (newMode === currentMode) return;
        currentMode = newMode;
        currentPage = 1;

        // Tự động chuyển level nếu level hiện tại không có bài của mode mới
        const all = getSpeakingSets();
        const hasCurrentLevel = all.some((s) => s.level === currentLevel && matchesSpeakingMode(s, currentMode));
        if (!hasCurrentLevel) {
          const firstLevelWithLessons = LEVELS.find(([lvl]) => all.some((s) => s.level === lvl && matchesSpeakingMode(s, currentMode)));
          if (firstLevelWithLessons) {
            currentLevel = firstLevelWithLessons[0];
          }
        }

        renderSpeakingCards();
      };
    });

    // Click tab cấp độ
    host.querySelectorAll(".speaking-level-tab").forEach((btn) => {
      btn.onclick = () => {
        currentLevel = btn.dataset.level;
        currentPage = 1;
        renderSpeakingCards();
      };
    });

    renderSpeakingCards();
  };

const openSpeakingWorkspace = (set, mode = currentMode) => {
    if (typeof window.requireAuth === "function" && !window.requireAuth("speaking.html?set=" + encodeURIComponent((set && (set.id || set.code)) || ""))) return;
    // Bài PRO: file công khai chỉ có metadata — tải nội dung bằng phiên PRO rồi mở lại
    if (set && set.content_locked && window.RusiProContent) {
      window.RusiProContent.ensureFull("SPEAKING_SETS", set, { title: "Nội dung luyện nói dành cho PRO", desc: "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn." })
        .then((full) => { if (full && !full.content_locked) openSpeakingWorkspace(full, mode); });
      return;
    }
    if (window.setRusiDeepUrl && set) {
      window.setRusiDeepUrl('/speaking/' + (mode || 'shadowing') + '/' + encodeURIComponent(set.id || set.code));
    }
    openSpeakingSet = set;
    document.body.classList.add("in-workspace");
    const todayKey = "speak_today_" + new Date().toDateString();
    const attemptsToday = STORE.get(todayKey, 0);
    const items = (Array.isArray(set.sentences) && set.sentences.length) ? set.sentences : ((Array.isArray(set.items) && set.items.length) ? set.items : ((set.raw_data && set.raw_data.items) || []));

    // Phân tích YouTube video nếu bài học là dạng YouTube Shadowing
    const parseYoutubeId = (obj) => {
      if (!obj) return "";
      if (typeof obj === "string") {
        const m = obj.match(/(?:embed\/|v=|vi\/|youtu\.be\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
        return m ? m[1] : (obj.length === 11 ? obj : "");
      }
      if (obj.youtube_id) return obj.youtube_id;
      if (obj.youtubeId) return obj.youtubeId;
      if (obj.raw_data && (obj.raw_data.youtube_video_id || obj.raw_data.youtubeId)) {
        return obj.raw_data.youtube_video_id || obj.raw_data.youtubeId;
      }
      if (obj.video && obj.video.youtubeId) return obj.video.youtubeId;
      const anyUrl = obj.video_url || obj.video_sample_url || (obj.raw_data && obj.raw_data.youtube_url) || "";
      const m = anyUrl.match(/(?:embed\/|v=|vi\/|youtu\.be\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : "";
    };

    // ID YouTube luôn gồm đúng 11 ký tự [A-Za-z0-9_-]; giá trị khác bị bỏ qua để không chèn chuỗi lạ vào src
    const ytIdRaw = String(parseYoutubeId(set) || "").trim();
    const ytId = /^[A-Za-z0-9_-]{11}$/.test(ytIdRaw) ? ytIdRaw : "";
    // Video do RusiYtPlayer (js/rusi-yt-player.js) dựng: ẩn giao diện YouTube, điều khiển qua IFrame API
    const hasVideo = Boolean(ytId) && Boolean(window.RusiYtPlayer);
    const YT_ORIGIN = "https://www.youtube-nocookie.com";
    const setStartSec = Math.floor(Number(set.start_sec || (set.video && set.video.startSec)) || 0);
    const setEndSec = Math.floor(Number(set.end_sec || (set.video && set.video.endSec)) || 0);

    // Trạng thái YouTube IFrame API (YT.Player): biết player sẵn sàng, đọc thời điểm phát thật
    let ytCtl = null;          // bộ điều khiển RusiYtPlayer
    let ytPlayer = null;
    let ytReady = false;
    let ytApiFailed = false;   // không tải được API → điều khiển bằng postMessage, thời gian ước lượng
    let ytVideoBroken = false; // video lỗi/không cho nhúng → dùng giọng đọc máy
    let ytPendingPlay = false; // người dùng bấm phát khi player chưa sẵn sàng

    // Gửi lệnh tới YouTube player (API nếu sẵn sàng, ngược lại postMessage tới đúng origin của iframe)
    const sendYtCommand = (func, args = []) => {
      const list = Array.isArray(args) ? args : [args];
      if (ytReady && ytPlayer && typeof ytPlayer[func] === "function") {
        try { ytPlayer[func](...list); } catch (err) { console.warn("[Speaking] YouTube " + func, err); }
        return;
      }
      if (!ytApiFailed) return; // API đang tải: lệnh phát được giữ lại qua ytPendingPlay
      const frame = el("#spYoutubePlayer");
      if (frame && frame.contentWindow) {
        try {
          frame.contentWindow.postMessage(JSON.stringify({ event: "listening" }), YT_ORIGIN);
          frame.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: list }), YT_ORIGIN);
        } catch (err) { console.warn("[Speaking] YouTube postMessage " + func, err); }
      }
    };

    let currentSentenceIdx = 0;
    let playingSentenceIdx = -1; // câu đang phát (để phân biệt "bấm lại để dừng" với "chuyển câu")
    let recordingSentenceIdx = null;
    let autoAdvanceTimer = null;
    let loopReplayTimer = null; // hẹn giờ phát lại câu khi bật lặp
    let currentSpeed = 1.0;
    let loopMode = 0; // 0: Tắt, 3: 3 lần, 5: 5 lần
    let loopRemaining = 0;
    let isRecording = false;
    let isPlaying = false;
    let isTranslationVisible = true;
    let autoAdvance = false;
    let isSidebarHidden = false;
    let recognitionInstance = null;

    // Quản lý Voice Memo (Chuẩn WAV 16kHz PCM & Hardware VAD từ DauEnglish)
    let audioRecorderInstance = null;
    let voiceStartTime = 0;
    const userVoiceMemos = {}; // idx -> { url, duration, blob }
    let activeVmAudio = null;

    const formatVmTime = (sec) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const stopActiveVmAudio = () => {
      if (activeVmAudio) {
        try { activeVmAudio.pause(); } catch (_) {}
        activeVmAudio = null;
      }
      const widget = el("#spSpeechResultBar");
      if (widget) widget.classList.remove("is-playing");
      const iconWrap = el("#spVmPlayIcon");
      if (iconWrap) iconWrap.innerHTML = icon("play", 16);
    };

    const playVoiceMemo = (idx) => {
      const memo = userVoiceMemos[idx];
      if (!memo || !memo.url) return;

      if (activeVmAudio) {
        stopActiveVmAudio();
        return;
      }

      stopVideoSegment();
      stopAudio();

      const audio = new Audio(memo.url);
      activeVmAudio = audio;

      const widget = el("#spSpeechResultBar");
      if (widget) widget.classList.add("is-playing");
      const iconWrap = el("#spVmPlayIcon");
      if (iconWrap) iconWrap.innerHTML = icon("pause", 16);

      audio.onended = () => {
        stopActiveVmAudio();
      };
      audio.onerror = () => {
        stopActiveVmAudio();
        toast("Không thể phát lại bản ghi âm.");
      };
      audio.play().catch(() => stopActiveVmAudio());
    };

    const renderVoiceMemoUI = (idx) => {
      const bar = el("#spSpeechResultBar");
      const playBtn = el("#btnVmPlay");
      const liveInd = el("#spRecLiveInd");
      const delBtn = el("#btnVmDelete");
      const durEl = el("#spVmDuration");
      const trackEl = el("#spVmAudioTrack");
      const memo = userVoiceMemos[idx];
      if (memo && memo.url) {
        if (bar) bar.style.display = "flex";
        if (playBtn) playBtn.style.display = "inline-flex";
        if (liveInd) liveInd.style.display = "none";
        if (delBtn) delBtn.style.display = "inline-flex";
        if (trackEl) trackEl.style.display = "inline-flex";
        if (durEl) {
          durEl.style.display = "inline-block";
          durEl.textContent = formatVmTime(memo.duration || 0);
        }
        stopActiveVmAudio();
      } else {
        if (playBtn) playBtn.style.display = "none";
        if (liveInd) liveInd.style.display = isRecording ? "inline-flex" : "none";
        if (delBtn) delBtn.style.display = "none";
        if (trackEl) trackEl.style.display = "none";
        if (durEl) durEl.style.display = "none";
        stopActiveVmAudio();
      }
    };

    // Helper: Tính điểm hoàn thành và trung bình (Completion-Only)
    const getStats = () => {
      let done = 0;
      let totalScore = 0;
      let scoredCount = 0;
      items.forEach((_, idx) => {
        const sc = STORE.get("speak_" + set.id + "_" + idx, null);
        if (sc !== null) {
          totalScore += sc;
          scoredCount++;
          if (sc >= 70) done++;
        }
      });
      const avg = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;
      const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
      const compKey = "speak_completed_" + set.id;
      const isCompleted = Boolean(STORE.get(compKey, false));
      return { done, avg, pct, scoredCount, isCompleted, xp: isCompleted ? SPEAK_LESSON_XP : 0 };
    };

    const checkLessonCompletion = () => {
      const stats = getStats();
      if (stats.scoredCount >= items.length && items.length > 0 && stats.avg >= 70) {
        const compKey = "speak_completed_" + set.id;
        if (!STORE.get(compKey, false)) {
          STORE.set(compKey, true);
          if (typeof Progress !== "undefined" && typeof Progress.addXp === "function") {
            // markDone ghi practice_logs kèm tên bài, điểm và XP; addXp không kèm meta để không ghi log trùng
            Progress.markDone("speakDone", set.id, { title: set.title || set.id, score: stats.avg, xp: SPEAK_LESSON_XP });
            Progress.addXp(SPEAK_LESSON_XP);
            toast(`🎉 Chúc mừng! Bạn đã hoàn thành toàn bộ bài Shadowing với điểm TB ${stats.avg}%! Nhận +${SPEAK_LESSON_XP} XP`);
          }
        }
      }
    };
    window.checkLessonCompletion = checkLessonCompletion;

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="rusi-workspace-back-bar">
        <button type="button" class="rusi-back-btn" id="btnBackSpList" title="Quay lại danh sách bài nói" aria-label="Quay lại">
          ${icon("arrow-left", 18)}
        </button>

        <div class="rusi-workspace-info">
          <span class="rusi-workspace-title">
            ${esc(set.title)}
          </span>
        </div>

        <!-- Quick Top Actions -->
        <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
          <button type="button" class="sp-icon-btn is-active" id="btnToggleTransTop" title="Ẩn/Hiện bản dịch (T)" aria-label="Ẩn/Hiện bản dịch">
            ${icon("eye", 16)}
          </button>
          <button type="button" class="sp-icon-btn" id="btnToggleAutoAdv" title="Tự động chuyển câu khi đạt điểm cao" aria-label="Tự chuyển câu">
            ${icon("zap-xp", 15)}
          </button>
          <button type="button" class="sp-icon-btn" id="btnToggleSidebar" title="Đóng/mở danh sách bài học" aria-label="Danh sách câu">
            ${icon("list-tasks", 16)}
          </button>
        </div>
      </div>

      <!-- WORKSPACE CONTAINER (KHÔNG GIAN LUYỆN NÓI MỞ RỘNG) -->
      <div class="sp-ws-grid ${!hasVideo ? "sp-ws-no-video" : ""}" id="spWsGrid">
        
        <!-- SÂN KHẤU LUYỆN NÓI CHÍNH (MAIN STAGE) -->
        <main class="sp-ws-main">
          
          ${hasVideo ? `
            <!-- KHUNG VIDEO BÀI HỌC YOUTUBE (TỶ LỆ 16:9 CHUẨN, RÕ NÉT, TƯƠNG TÁC TRỰC TIẾP) -->
            <section class="sp-video-card" id="spVideoCard">
              <!-- Iframe + ảnh bìa do RusiYtPlayer.mount() tạo (ẩn giao diện YouTube) -->
              <div class="sp-video-body" id="spVideoBody"></div>
            </section>
          ` : ""}

          <!-- THẺ LUYỆN NÓI TÍCH HỢP: ĐIỀU KHIỂN Ở TRÊN + CÂU PHỤ ĐỀ Ở DƯỚI -->
          <article class="sp-hero-card" id="spHeroCard">
            <!-- BẢNG ĐIỀU KHIỂN TỐI GIẢN (1 DÒNG Ở TRÊN) -->
            <div class="sp-controls-dock" id="spControlsDock">
              <!-- Nút câu trước -->
              <button type="button" class="sp-ctrl-btn" id="btnPrevSent" title="Câu trước (←)" aria-label="Câu trước">
                ${icon("chevron-left", 18)}
              </button>

              <!-- Nút tốc độ phát âm (0.75x, 1.0x, 1.25x) -->
              <button type="button" class="sp-ctrl-btn" id="btnSpeedToggle" title="Tốc độ phát âm" aria-label="Tốc độ">
                <span class="sp-speed-badge" id="spSpeedBadge">1.0x</span>
              </button>

              <!-- Nút Nghe mẫu phát âm chuẩn (Play / Pause) -->
              <button type="button" class="sp-ctrl-play" id="btnPlayModel" title="Nghe phát âm chuẩn (Space)" aria-label="Nghe mẫu">
                <span id="spPlayIcon">${icon("volume-high", 20)}</span>
              </button>

              <!-- NÚT MICRO LUYỆN NÓI TRUNG TÂM (HERO BUTTON) -->
              <button type="button" class="sp-ctrl-mic" id="btnRecordMic" title="Bắt đầu luyện nói (Phím R)" aria-label="Thu âm giọng nói">
                ${icon("mic-speaking", 22)}
              </button>

              <!-- Nút Tự động lặp lại (Loop) -->
              <button type="button" class="sp-ctrl-btn" id="btnLoopToggle" title="Tự động lặp lại (L)" aria-label="Lặp lại">
                ${icon("rotate-ccw", 16)}
                <span class="sp-loop-pill" id="spLoopPill" style="display:none;">3x</span>
              </button>

              <!-- Nút câu sau -->
              <button type="button" class="sp-ctrl-btn" id="btnNextSent" title="Câu tiếp theo (→)" aria-label="Câu sau">
                ${icon("chevron-right", 18)}
              </button>
            </div>

            <!-- Câu tiếng Nga (Phụ đề video - Clickable) & Bản dịch tiếng Việt (Căn giữa, nhỏ gọn, hiện đại) -->
            <div class="sp-sentence-stage">
              <div class="sp-ru-sentence" id="spTargetRu" title="Nhấp vào câu để video tự động phát đến đoạn này"></div>
              <div class="sp-vi-translation" id="spTargetVi" title="Nhấn phím T để ẩn/hiện dịch"></div>
            </div>

            <!-- THẺ VOICE MEMO TỐI GIẢN (SLIM AUDIO CAPSULE, KHÔNG CHỮ RƯỜM RÀ) -->
            <div class="sp-voice-memo-widget" id="spSpeechResultBar" style="display:none;">
              <div class="sp-vm-left">
                <!-- Nút tròn Play/Pause nghe lại giọng mình -->
                <button type="button" class="sp-vm-play-btn" id="btnVmPlay" style="display:none;" title="Nghe lại" aria-label="Phát lại">
                  <span id="spVmPlayIcon">${icon("play", 13)}</span>
                </button>

                <!-- Vòng tròn đỏ nhấp nháy khi đang thu âm -->
                <div class="sp-rec-live-indicator" id="spRecLiveInd" style="display:none;" title="Đang ghi âm">
                  <span class="sp-rec-pulse-ring"></span>
                  <span class="sp-rec-pulse-core"></span>
                </div>
              </div>

              <!-- Nội dung lời thoại & Sóng âm thanh động -->
              <div class="sp-vm-center">
                <span class="sp-user-transcript-text ru" id="spUserTranscriptText">Đang nghe...</span>
                <div class="sp-vm-audio-track" id="spVmAudioTrack" style="display:none;">
                  <div class="sp-vm-waveform" id="spVmWaveform">
                    <span class="sp-vm-bar" style="--h: 30%"></span>
                    <span class="sp-vm-bar" style="--h: 70%"></span>
                    <span class="sp-vm-bar" style="--h: 40%"></span>
                    <span class="sp-vm-bar" style="--h: 90%"></span>
                    <span class="sp-vm-bar" style="--h: 60%"></span>
                    <span class="sp-vm-bar" style="--h: 100%"></span>
                    <span class="sp-vm-bar" style="--h: 50%"></span>
                    <span class="sp-vm-bar" style="--h: 85%"></span>
                    <span class="sp-vm-bar" style="--h: 40%"></span>
                    <span class="sp-vm-bar" style="--h: 65%"></span>
                  </div>
                  <span class="sp-vm-duration" id="spVmDuration">00:00</span>
                </div>
              </div>

              <!-- Thao tác bên phải: Điểm số & Các nút icon tròn tinh gọn -->
              <div class="sp-result-right">
                <div class="sp-score-badge" id="spResultScoreWrap" title="Điểm phát âm">
                  <span class="sp-score-num" id="spResultScoreVal">--</span>
                </div>
                <button type="button" class="sp-vm-btn-icon sp-btn-retry" id="btnFeedbackRetry" title="Nói lại (R)" aria-label="Nói lại">
                  ${icon("rotate-ccw", 14)}
                </button>
                <button type="button" class="sp-vm-btn-icon sp-btn-del" id="btnVmDelete" style="display:none;" title="Xóa bản ghi" aria-label="Xóa">
                  ${icon("trash-2", 14)}
                </button>
                <!-- Thẻ ẩn tương thích ngược cho JS -->
                <span id="spResultStatusLbl" style="display:none;"></span>
                <span id="spResultScoreLbl" style="display:none;"></span>
                <span id="spScoreSep" style="display:none;"></span>
                <span id="spResultDot" style="display:none;"></span>
                <span id="spScoreRing" style="display:none;"></span>
              </div>
            </div>

          </article>

        </main>

        <!-- CỘT PHẢI: PLAYLIST & TIẾN ĐỘ HỌC (SIDEBAR) -->
        <aside class="sp-ws-sidebar" id="spSidebarPanel">
          <div class="sp-sb-header">
            <div class="sp-sb-stats">
              <div class="sp-sb-stat">
                <span class="sp-sb-stat-val" id="spStatCompleted">0/${items.length}</span>
                <span class="sp-sb-stat-lbl">Hoàn thành</span>
              </div>
              <div class="sp-sb-stat">
                <span class="sp-sb-stat-val" id="spStatAvgScore">--</span>
                <span class="sp-sb-stat-lbl">Điểm TB</span>
              </div>
              <div class="sp-sb-stat">
                <span class="sp-sb-stat-val" id="spStatTotalXp" style="color:var(--amber);">+0</span>
                <span class="sp-sb-stat-lbl">Kinh nghiệm</span>
              </div>
            </div>
            <div class="sp-sb-progress-bar">
              <div class="sp-sb-progress-fill" id="spProgressFill"></div>
            </div>
          </div>

          <!-- Danh sách câu cuộn mượt -->
          <div class="sp-playlist-list" id="spPlaylistScroll"></div>
        </aside>

        <!-- Scrim nền cho Drawer trên Mobile -->
        <div class="sp-sidebar-scrim" id="spSidebarScrim"></div>

      </div>
    `;

    // Helper: Tìm thời gian phát (giây) của câu trong clip
    const getItemSec = (idx) => {
      const it = items[idx];
      if (!it) return 0;
      if (typeof it.start_sec === "number") return it.start_sec;
      if (typeof it.startSec === "number") return it.startSec;
      if (typeof it.start === "number") return it.start;
      if (typeof it.sec === "number") return it.sec;
      if (typeof it.time === "number") return it.time;
      if (typeof it.time === "string" && it.time.includes(":")) {
        const p = it.time.split(":").map(Number);
        if (p.length === 2) return p[0] * 60 + p[1];
        if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
      }
      // Không có mốc thời gian → không đoán (câu này sẽ phát bằng giọng đọc máy)
      return null;
    };

    const getItemEndSec = (idx) => {
      const start = getItemSec(idx);
      if (start === null) return null;
      const it = items[idx];
      if (typeof it.end_sec === "number") return it.end_sec;
      if (typeof it.endSec === "number") return it.endSec;
      if (typeof it.end === "number") return it.end;
      if (typeof it.duration === "number") return start + it.duration;
      const nextStart = getItemSec(idx + 1);
      if (nextStart !== null && nextStart > start) return nextStart;
      return start + 6;
    };

    let segmentTimer = null;

    // keepVideoPlaying: chuyển thẳng sang câu khác khi video đang chạy → không tạm dừng
    // (mỗi lần dừng rồi phát lại, YouTube hiện lại icon ⏸ và lớp nền tối giữa khung hình)
    const stopVideoSegment = (keepVideoPlaying = false) => {
      if (segmentTimer) {
        clearTimeout(segmentTimer);
        clearInterval(segmentTimer);
        segmentTimer = null;
      }
      ytPendingPlay = false;
      if (hasVideo && !keepVideoPlaying) sendYtCommand("pauseVideo", []);
      isPlaying = false;
      const btnPlay = el("#btnPlayModel");
      if (btnPlay) {
        btnPlay.classList.remove("is-playing");
        const ic = el("#spPlayIcon");
        if (ic) ic.innerHTML = icon("volume-high", 20);
      }
    };

    // Bảng chuẩn hóa số tiếng Nga (Google STT thường trả về dạng chữ số 1, 2, 20...)
    const RU_NUMBERS_MAP = {
      "0": "ноль", "1": "один", "2": "два", "3": "три", "4": "четыре", "5": "пять",
      "6": "шесть", "7": "семь", "8": "восемь", "9": "девять", "10": "десять",
      "11": "одиннадцать", "12": "двенадцать", "13": "тринадцать", "14": "четырнадцать",
      "15": "пятнадцать", "16": "шестнадцать", "17": "семнадцать", "18": "восемнадцать",
      "19": "девятнадцать", "20": "двадцать", "30": "тридцать", "40": "сорок",
      "50": "пятьдесят", "60": "шестьдесят", "70": "семьдесят", "80": "восемьдесят",
      "90": "девяносто", "100": "сто", "200": "двести", "300": "триста", "400": "четыреста",
      "500": "пятьсот", "600": "шестьсот", "700": "семьсот", "800": "восемьсот",
      "900": "девятьсот", "1000": "тысяча", "1-й": "первый", "2-й": "второй", "3-й": "третий"
    };
    // Từ đệm (filler words) người học thường nói ngập ngừng
    const RU_FILLER_WORDS = new Set(["э", "эм", "ээ", "ээм", "ну", "а", "мм", "хм", "типа", "вот", "значит"]);

    const cleanRussianToken = (s) => {
      const raw = (s || "")
        .toLowerCase()
        .replace(/[́]/g, "") // Bỏ dấu trọng âm
        .replace(/ё/g, "е")        // Chuẩn hóa ё -> е
        .replace(/[.,!?;:«»"'—–\-_()]/g, "")
        .trim();
      return RU_NUMBERS_MAP[raw] || raw;
    };

    // Thuật toán so khớp chuỗi từ Word Error Rate (WER) tiếng Nga chuẩn (Chuẩn hóa số & từ đệm)
    const computeWordErrorRate = (targetRu, heardRu) => {
      const refWords = (targetRu || "").split(/\s+/).map(cleanRussianToken).filter(Boolean);
      const hypWords = (heardRu || "").split(/\s+/).map(cleanRussianToken).filter(w => Boolean(w) && !RU_FILLER_WORDS.has(w));
      const n = refWords.length;
      const m = hypWords.length;

      if (n === 0) {
        return { wer: m === 0 ? 0 : 1, accuracy: m === 0 ? 100 : 0, alignments: [], refWords, hypWords };
      }

      const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
      for (let i = 0; i <= n; i++) dp[i][0] = i;
      for (let j = 0; j <= m; j++) dp[0][j] = j;

      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          const cost = refWords[i - 1] === hypWords[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + cost,
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1
          );
        }
      }

      const totalEdits = dp[n][m];
      const wer = Math.round((totalEdits / n) * 1000) / 1000;
      const accuracy = Math.max(0, Math.min(100, Math.round((1 - totalEdits / n) * 100)));

      // Backtracking để xác định từng từ đúng, sai, thiếu, thừa
      let i = n, j = m;
      const alignments = [];
      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && refWords[i - 1] === hypWords[j - 1]) {
          alignments.unshift({ word: refWords[i - 1], status: "correct" });
          i--; j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
          alignments.unshift({ word: refWords[i - 1], heard: hypWords[j - 1], status: "wrong" });
          i--; j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
          alignments.unshift({ word: refWords[i - 1], status: "missing" });
          i--;
        } else {
          alignments.unshift({ word: hypWords[j - 1], status: "extra" });
          j--;
        }
      }

      return { wer, accuracy, alignments, refWords, hypWords };
    };
    window.computeWordErrorRate = computeWordErrorRate;

    // Đánh dấu từ đúng (xanh) và từ sai (đỏ) trực tiếp trên câu tiếng Nga & hỗ trợ Karaoke
    const renderMappedSentence = (targetRu, heardRu = null) => {
      const ruBox = el("#spTargetRu");
      if (!ruBox) return null;
      if (!heardRu || !heardRu.trim()) {
        const tokens = (targetRu || "").split(/(\s+)/);
        let wCount = 0;
        ruBox.innerHTML = tokens.map(tok => {
          if (!tok.trim()) return tok;
          return `<span class="sp-target-word" data-word-idx="${wCount++}">${esc(tok)}</span>`;
        }).join("");
        return null;
      }

      const res = computeWordErrorRate(targetRu, heardRu);
      const tokens = (targetRu || "").split(/(\s+)/);

      let alignIdx = 0;
      let wCount = 0;
      const html = tokens.map(tok => {
        if (!tok.trim()) return tok;
        const cTok = cleanRussianToken(tok);
        const thisIdx = wCount++;
        if (!cTok) return esc(tok);

        let matched = null;
        for (let k = alignIdx; k < res.alignments.length; k++) {
          if (res.alignments[k].word === cTok && res.alignments[k].status !== "extra") {
            matched = res.alignments[k];
            alignIdx = k + 1;
            break;
          }
        }
        if (!matched) {
          matched = res.alignments.find(a => a.word === cTok && a.status !== "extra");
        }

        if (matched && matched.status === "correct") {
          return `<span class="sp-target-word sp-word-correct" data-word-idx="${thisIdx}" title="Phát âm chuẩn xác">${esc(tok)}</span>`;
        } else if (matched && matched.status === "missing") {
          return `<span class="sp-target-word sp-word-wrong" data-word-idx="${thisIdx}" style="opacity:0.75;text-decoration:underline dashed;" title="Chưa nhận diện được từ này">${esc(tok)}</span>`;
        } else if (matched && matched.status === "wrong") {
          const tip = matched.heard ? `Nhận diện: “${matched.heard}”` : "Cần phát âm rõ ràng hơn";
          return `<span class="sp-target-word sp-word-wrong" data-word-idx="${thisIdx}" title="${esc(tip)}">${esc(tok)}</span>`;
        } else {
          return `<span class="sp-target-word" data-word-idx="${thisIdx}" style="opacity:0.8;" title="Chưa phát âm">${esc(tok)}</span>`;
        }
      }).join("");

      ruBox.innerHTML = html;
      return res;
    };
    window.renderMappedSentence = renderMappedSentence;

    // Cập nhật thống kê header và thanh tiến độ
    const updateStatsUI = () => {
      const stats = getStats();
      const stComp = el("#spStatCompleted"); if (stComp) stComp.textContent = `${stats.done}/${items.length}`;
      const stAvg = el("#spStatAvgScore"); if (stAvg) stAvg.textContent = stats.avg > 0 ? `${stats.avg}%` : "--";
      const stXp = el("#spStatTotalXp"); if (stXp) stXp.textContent = `+${stats.xp} XP`;
      const fill = el("#spProgressFill"); if (fill) fill.style.width = `${stats.pct}%`;
    };

    // Render danh sách playlist
    const renderPlaylist = () => {
      const hostList = el("#spPlaylistScroll");
      if (!hostList) return;

      hostList.innerHTML = items.map((it, idx) => {
        const sc = STORE.get("speak_" + set.id + "_" + idx, null);
        const isDone = sc !== null && sc >= 70;
        const numStr = String(idx + 1).padStart(2, "0");
        const isActive = idx === currentSentenceIdx;

        return `
          <button type="button" class="sp-pl-item ${isActive ? "is-active" : ""}" data-idx="${idx}" id="spPlayItem_${idx}">
            <span class="sp-pl-idx">${numStr}</span>
            <div style="min-width:0;flex:1;">
              <div class="sp-pl-ru">${esc(it.ru || it.text_ru || it.text || "")}</div>
              <div class="sp-pl-vi">${esc(it.vi || it.translation_vi || it.translation || "")}</div>
            </div>
            <span class="sp-pl-score ${isDone ? "is-done" : ""}">
              ${sc !== null ? `${sc}%` : "--"}
            </span>
          </button>
        `;
      }).join("");

      hostList.querySelectorAll(".sp-pl-item").forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx, 10);
          loadSentence(idx);
          playCurrentSentence();
          // Đóng drawer trên mobile nếu đang mở
          const side = el("#spSidebarPanel");
          const scrim = el("#spSidebarScrim");
          if (side) side.classList.remove("is-open");
          if (scrim) scrim.classList.remove("is-open");
        };
      });

      updateStatsUI();
    };

    // Dừng toàn bộ âm thanh và xóa highlight Karaoke
    let karaokeTimer = null;
    const clearKaraoke = () => {
      if (karaokeTimer) {
        clearInterval(karaokeTimer);
        karaokeTimer = null;
      }
      document.querySelectorAll("#spTargetRu .sp-target-word").forEach(w => w.classList.remove("sp-karaoke-active"));
    };

    const stopAudio = (keepVideoPlaying = false) => {
      if (loopReplayTimer) { clearTimeout(loopReplayTimer); loopReplayTimer = null; }
      if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
      stopVideoSegment(keepVideoPlaying);
      clearKaraoke();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      isPlaying = false;
      const btnPlay = el("#btnPlayModel");
      if (btnPlay) {
        btnPlay.classList.remove("is-playing");
        const ic = el("#spPlayIcon");
        if (ic) ic.innerHTML = icon("volume-high", 20);
      }
    };

    // Phát âm câu tiếng Nga chuẩn: Hỗ trợ cả YouTube Video Shadowing và Speech Synthesis
    const playCurrentSentence = (isAutoLoop = false) => {
      const it = items[currentSentenceIdx];
      if (!it) return;

      // Bấm lại đúng câu đang phát = tạm dừng; chuyển sang câu khác (←/→, danh sách) = phát câu mới
      if (isPlaying && !isAutoLoop && playingSentenceIdx === currentSentenceIdx) {
        stopVideoSegment();
        stopAudio();
        return;
      }
      if (!isAutoLoop) {
        loopRemaining = loopMode;
        const pill = el("#spLoopPill");
        if (pill && loopMode > 0) pill.textContent = `${loopMode}x`;
      }

      const segStart = getItemSec(currentSentenceIdx);
      const useVideo = hasVideo && !ytVideoBroken && segStart !== null;

      // Đang phát video mà chuyển sang câu khác cũng phát bằng video → tua thẳng, không tạm dừng giữa chừng
      const videoWasPlaying = isPlaying && playingSentenceIdx !== -1 && hasVideo && !ytVideoBroken
        && getItemSec(playingSentenceIdx) !== null;
      stopAudio(useVideo && videoWasPlaying);
      stopRecording();

      // Player chưa sẵn sàng: giữ yêu cầu, onReady sẽ phát lại (không gửi lệnh vào iframe chưa nghe)
      if (useVideo && !ytReady && !ytApiFailed) {
        ytPendingPlay = true;
        toast("Video đang tải, sẽ phát ngay khi sẵn sàng...");
        return;
      }

      isPlaying = true;
      playingSentenceIdx = currentSentenceIdx;
      const btnPlay = el("#btnPlayModel");
      if (btnPlay) {
        btnPlay.classList.add("is-playing");
        const ic = el("#spPlayIcon");
        if (ic) ic.innerHTML = icon("pause", 20);
      }

      if (useVideo) {
        // 1. Phân hệ YouTube: Phát đoạn theo start - end
        const start = segStart;
        const end = getItemEndSec(currentSentenceIdx);
        const segLen = Math.max(1.0, end - start);

        sendYtCommand("setPlaybackRate", [currentSpeed]);
        sendYtCommand("seekTo", [start, true]);
        sendYtCommand("playVideo", []);

        // Karaoke: mốc bắt đầu mỗi từ tính theo giây trong video (it.w hoặc chia theo độ dài từ)
        clearKaraoke();
        const wordSpans = Array.from(document.querySelectorAll("#spTargetRu .sp-target-word"));
        const wordTimes = (Array.isArray(it.w) && it.w.length > 0)
          ? it.w.map(Number)
          : (() => {
              if (wordSpans.length === 0) return [];
              const totalChars = wordSpans.reduce((sum, sp) => sum + sp.textContent.length, 0) || 1;
              let accum = 0;
              return wordSpans.map(sp => {
                const frac = accum / totalChars;
                accum += sp.textContent.length;
                return start + frac * segLen;
              });
            })();
        const highlightAt = (videoSec) => {
          let activeIdx = -1;
          for (let wI = 0; wI < wordTimes.length; wI++) {
            if (videoSec >= wordTimes[wI]) activeIdx = wI;
            else break;
          }
          wordSpans.forEach((sp, idx) => {
            sp.classList.toggle("sp-karaoke-active", idx === activeIdx);
          });
        };

        if (segmentTimer) { clearTimeout(segmentTimer); clearInterval(segmentTimer); segmentTimer = null; }

        if (ytReady && ytPlayer) {
          // Theo dõi thời điểm phát thật của video → dừng đúng mốc kể cả khi đang tải chậm
          const startedAt = Date.now();
          const maxWaitMs = (segLen / currentSpeed) * 3000 + 15000;
          let settled = false; // đã thực sự phát trong đoạn của câu (bỏ qua thời điểm cũ trước khi tua)
          segmentTimer = setInterval(() => {
            if (!isPlaying) return;
            let state = -1;
            let t = start;
            try {
              state = ytPlayer.getPlayerState();
              t = Number(ytPlayer.getCurrentTime()) || 0;
            } catch (err) {
              console.warn("[Speaking] YouTube player state", err);
            }
            if (state === 1 && t >= start - 0.5 && t <= end + 0.5) settled = true;
            if (settled) {
              highlightAt(t);
              if (t >= end || state === 0) { finishVideoSegment(); return; }
              if (state === 2) { stopVideoSegment(); clearKaraoke(); return; } // người dùng tự tạm dừng trong khung video
            } else if (state === 0) {
              finishVideoSegment();
              return;
            }
            if (!settled && Date.now() - startedAt > 3000 && (state === -1 || state === 5)) {
              // iOS/Safari chặn tự phát khi chưa chạm vào video lần nào → bỏ lớp che để chạm thẳng vào video
              stopVideoSegment();
              clearKaraoke();
              if (ytCtl) ytCtl.allowDirectTap();
              toast("Trình duyệt chưa cho phát video. Chạm vào video một lần rồi thử lại.");
              return;
            }
            if (Date.now() - startedAt > maxWaitMs) finishVideoSegment();
          }, 100);
        } else {
          // Dự phòng khi không tải được IFrame API: ước lượng theo đồng hồ
          // Bù thêm 400ms đệm tránh YouTube đang tải buffering bị ngắt cụt câu
          const durationSec = (segLen / currentSpeed) + 0.4;
          const playStartTime = Date.now();
          karaokeTimer = setInterval(() => {
            if (!isPlaying) { clearKaraoke(); return; }
            highlightAt(start + ((Date.now() - playStartTime) / 1000) * currentSpeed);
          }, 80);
          segmentTimer = setTimeout(finishVideoSegment, Math.round(durationSec * 1000));
        }

      } else {
        playSentenceTts(it);
      }
    };

    // Kết thúc một đoạn video: lặp lại nếu còn lượt, ngược lại dừng
    const finishVideoSegment = () => {
          if (!isPlaying) return;
          clearKaraoke();
          if (loopRemaining > 1) {
            loopRemaining--;
            const pill = el("#spLoopPill");
            if (pill) pill.textContent = `${loopRemaining}x`;
            stopVideoSegment();
            loopReplayTimer = setTimeout(() => {
              loopReplayTimer = null;
              playCurrentSentence(true);
            }, 450);
          } else if (loopRemaining === 1) {
            loopRemaining = 0;
            const pill = el("#spLoopPill");
            if (pill) pill.textContent = loopMode > 0 ? `${loopMode}x` : "";
            stopVideoSegment();
          } else {
            stopVideoSegment();
          }
    };

    // 2. Phân hệ bài nói thông thường (hoặc câu không có mốc video): giọng đọc tiếng Nga qua Web SpeechSynthesis
    const playSentenceTts = (it) => {
        const textToSpeak = (it.ru || it.text_ru || it.text || "").trim();
        if (!textToSpeak) {
          stopAudio();
          return;
        }

        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          try { window.speechSynthesis.cancel(); } catch (_) {}
          const u = new SpeechSynthesisUtterance(textToSpeak);
          u.lang = "ru-RU";
          u.rate = currentSpeed;

          // Ưu tiên giọng tiếng Nga chuẩn nếu có trong hệ điều hành
          const voices = window.speechSynthesis.getVoices();
          const ruVoice = voices.find(v => v.lang && (v.lang === "ru-RU" || v.lang.startsWith("ru")));
          if (ruVoice) u.voice = ruVoice;

          u.onend = () => {
            if (!isPlaying) return;
            if (loopRemaining > 1) {
              loopRemaining--;
              const pill = el("#spLoopPill");
              if (pill) pill.textContent = `${loopRemaining}x`;
              stopAudio();
              loopReplayTimer = setTimeout(() => {
                loopReplayTimer = null;
                playCurrentSentence(true);
              }, 600);
            } else if (loopRemaining === 1) {
              loopRemaining = 0;
              const pill = el("#spLoopPill");
              if (pill) pill.textContent = loopMode > 0 ? `${loopMode}x` : "";
              stopAudio();
            } else {
              stopAudio();
            }
          };

          u.onerror = () => {
            stopAudio();
          };

          window.speechSynthesis.speak(u);
        } else {
          toast("Trình duyệt không hỗ trợ phát âm — hãy dùng Google Chrome hoặc Microsoft Edge.");
          stopAudio();
        }
    };

    // Nạp câu hiện hành vào sân khấu
    const loadSentence = (idx) => {
      if (isRecording) stopRecording();
      if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
      if (loopReplayTimer) { clearTimeout(loopReplayTimer); loopReplayTimer = null; }
      if (idx < 0 || idx >= items.length) return;
      currentSentenceIdx = idx;
      const it = items[idx];

      // Đặt lại câu tiếng Nga ở trạng thái chữ bình thường
      renderMappedSentence(it.ru || it.text_ru || it.text || "", null);

      const viBox = el("#spTargetVi");
      if (viBox) {
        viBox.textContent = it.vi || it.translation_vi || it.translation || "";
        viBox.classList.toggle("is-blurred", !isTranslationVisible);
      }

      // Hiển thị điểm đã lưu của câu (nếu có)
      const resBar = el("#spSpeechResultBar");
      const prevScore = STORE.get("speak_" + set.id + "_" + idx, null);

      if (resBar) {
        if (prevScore !== null) {
          resBar.style.display = "flex";
          const scVal = el("#spResultScoreVal");
          const scLbl = el("#spResultScoreLbl");
          const scWrap = el("#spResultScoreWrap");
          const ringEl = el("#spScoreRing");
          const trEl = el("#spUserTranscriptText");
          const statusLbl = el("#spResultStatusLbl");
          const dotEl = el("#spResultDot");

          if (scVal) scVal.textContent = `${prevScore}%`;
          if (scLbl) scLbl.textContent = prevScore >= 80 ? "Xuất sắc" : prevScore >= 60 ? "Khá tốt" : "Thử lại";
          if (statusLbl) statusLbl.textContent = "Điểm đã lưu";
          if (ringEl) {
            ringEl.textContent = `${prevScore}%`;
            ringEl.className = "score-ring " + (prevScore >= 80 ? "" : prevScore >= 60 ? "mid" : "low");
          }
          if (scWrap) scWrap.className = "sp-score-badge " + (prevScore >= 80 ? "is-excellent" : prevScore >= 60 ? "is-good" : "is-retry");
          if (dotEl) dotEl.className = "sp-result-dot " + (prevScore >= 80 ? "is-excellent" : prevScore >= 60 ? "is-good" : "is-retry");
          if (trEl) trEl.innerHTML = `<span class="sp-tr-empty">Bản ghi đã lưu</span>`;
        } else {
          resBar.style.display = "none";
        }
      }

      // Cập nhật active trong danh sách playlist
      document.querySelectorAll(".sp-pl-item").forEach((btn, i) => {
        btn.classList.toggle("is-active", i === idx);
      });
      const activeBtn = el(`#spPlayItem_${idx}`);
      if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Cập nhật trạng thái Voice Memo của câu hiện hành
      renderVoiceMemoUI(idx);
    };

    // Thu âm Speech Recognition và AI chấm điểm (Tối ưu Hardware VAD & 16kHz WAV theo chuẩn DauEnglish)
    let silenceTimer = null;
    let accumulatedTranscript = "";
    let lastHeardText = "";

    const clearSilenceTimer = () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        silenceTimer = null;
      }
    };

    const updateWaveformBars = (level) => {
      const bars = document.querySelectorAll("#spVmWaveform .sp-vm-bar");
      if (!bars || bars.length === 0) return;
      bars.forEach((bar, i) => {
        const waveFactor = 0.4 + 0.6 * Math.abs(Math.sin((i + 1) * 1.3));
        const h = Math.max(15, Math.min(100, Math.round(level * 100 * waveFactor)));
        bar.style.setProperty("--h", `${h}%`);
      });
      const wf = el("#spVmWaveform");
      if (wf) wf.classList.add("is-live");
    };

    let recordStartToken = 0; // tăng mỗi lần bắt đầu/dừng ghi âm → bỏ phiên cũ khi người dùng dừng trong lúc chờ mic
    const startRecording = async () => {
      // Kiểm tra khóa bài học dành cho PRO
      if ((set.is_pro_only || set.is_pro) && (typeof Monetization === "undefined" || !Monetization.isPro())) {
        Monetization.showProGateModal("Nội dung luyện nói dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn.");
        return;
      }
      // Hạn mức thực hành miễn phí trong ngày (đủ để học viên hoàn thành trọn vẹn bài học 25-30 câu)
      if (typeof Monetization !== "undefined" && !Monetization.isPro()) {
        const used = STORE.get(todayKey, 0);
        if (used >= 30) {
          Monetization.showProGateModal("Lượt luyện nói hôm nay đã hết", "Bạn đã dùng hết 30 lượt luyện nói miễn phí hôm nay. Nâng cấp lên gói PRO để mở khóa AI chấm âm vị không giới hạn số lượt.");
          return;
        }
      }

      if (isRecording) {
        stopRecording();
        return;
      }

      stopVideoSegment();
      stopAudio();
      stopActiveVmAudio();
      clearSilenceTimer();
      isRecording = true;
      accumulatedTranscript = "";
      lastHeardText = "";

      const it = items[currentSentenceIdx];
      const targetText = (it.ru || it.text_ru || it.text || "").trim();

      const resBar = el("#spSpeechResultBar");
      const userTrEl = el("#spUserTranscriptText");
      const scoreValEl = el("#spResultScoreVal");
      const scoreLblEl = el("#spResultScoreLbl");
      const scoreWrapEl = el("#spResultScoreWrap");
      const ringEl = el("#spScoreRing");
      const statusLbl = el("#spResultStatusLbl");
      const dotEl = el("#spResultDot");
      const liveInd = el("#spRecLiveInd");
      if (resBar) resBar.style.display = "flex";
      if (liveInd) liveInd.style.display = "inline-flex";
      const vmPlayBtn = el("#btnVmPlay");
      if (vmPlayBtn) vmPlayBtn.style.display = "none";
      const vmDelBtn = el("#btnVmDelete");
      if (vmDelBtn) vmDelBtn.style.display = "none";
      const vmTrack = el("#spVmAudioTrack");
      if (vmTrack) vmTrack.style.display = "inline-flex";
      const vmDur = el("#spVmDuration");
      if (vmDur) vmDur.style.display = "none";
      if (userTrEl) userTrEl.innerHTML = `<span class="sp-tr-placeholder">Đang nghe...</span>`;
      if (statusLbl) statusLbl.textContent = "Đang ghi âm";
      if (scoreValEl) scoreValEl.textContent = "...";
      if (scoreLblEl) scoreLblEl.textContent = "";
      if (ringEl) ringEl.textContent = "...";
      if (dotEl) dotEl.className = "sp-result-dot is-listening";
      if (scoreWrapEl) scoreWrapEl.className = "sp-score-badge is-pending";

      const btnMic = el("#btnRecordMic");
      if (btnMic) btnMic.classList.add("is-recording");

      recordingSentenceIdx = currentSentenceIdx;
      voiceStartTime = Date.now();
      const startToken = ++recordStartToken;

      // 1. Khởi động Hardware Audio Recorder (WAV 16kHz PCM + VAD theo chuẩn DauEnglish)
      if (typeof RusiAudioRecorder !== "undefined" && RusiAudioRecorder.startAudioRecording) {
        try {
          audioRecorderInstance = await RusiAudioRecorder.startAudioRecording({
            onLevel: (lvl) => {
              if (isRecording) updateWaveformBars(lvl);
            },
            silenceMs: 1800,
            maxMs: 14000,
            onAutoStop: () => {
              if (isRecording) stopRecording();
            }
          });

          // Người học đã dừng / rời bài trong lúc chờ quyền mic → huỷ bản ghi, không chạy nhận dạng
          if (startToken !== recordStartToken || !isRecording) {
            try { audioRecorderInstance.cancel(); } catch (_) {}
            audioRecorderInstance = null;
            return;
          }

          // Gắn bản ghi vào câu lúc bắt đầu ghi (người học có thể đã chuyển câu khi bản ghi xong)
          const memoIdx = recordingSentenceIdx;
          const memoStart = voiceStartTime;
          audioRecorderInstance.done.then((blob) => {
            if (blob && blob.size > 800) {
              if (userVoiceMemos[memoIdx]) {
                try { URL.revokeObjectURL(userVoiceMemos[memoIdx].url); } catch (_) {}
              }
              const url = URL.createObjectURL(blob);
              const durSec = Math.max(1, Math.round((Date.now() - memoStart) / 1000));
              userVoiceMemos[memoIdx] = { url, duration: durSec, blob };
              if (memoIdx === currentSentenceIdx) renderVoiceMemoUI(memoIdx);
            }
          });
        } catch (recErr) {
          if (startToken !== recordStartToken || !isRecording) return;
          console.warn("[RusiAudioRecorder] Mic access error:", recErr);
          toast(recErr.message || "Không thể mở microphone.");
          // Không mở được micro thì nhận dạng giọng nói cũng không chạy được → dừng luôn, tránh báo lỗi lần hai
          stopRecording();
          return;
        }
      }

      // 2. Chạy Web Speech Recognition (nếu trình duyệt hỗ trợ)
      if (SR) {
        recognitionInstance = new SR();
        recognitionInstance.lang = "ru-RU";
        try {
          recognitionInstance.continuous = true;
        } catch (_) {}
        recognitionInstance.interimResults = true;
        recognitionInstance.maxAlternatives = 3;

        // maxAlternatives = 3: chọn ứng viên khớp câu mẫu nhất (giảm chấm oan khi máy nghe gần đúng)
        const pickBestAlternative = (result, prefix) => {
          let best = result[0] ? result[0].transcript : "";
          if (result.length <= 1) return best;
          let bestAcc = -1;
          for (let a = 0; a < result.length; a++) {
            const alt = result[a] && result[a].transcript;
            if (!alt) continue;
            const acc = computeWordErrorRate(targetText, prefix + alt).accuracy;
            if (acc > bestAcc) { bestAcc = acc; best = alt; }
          }
          return best;
        };

        recognitionInstance.onresult = (ev) => {
          let interimChunk = "";
          for (let i = ev.resultIndex; i < ev.results.length; ++i) {
            if (ev.results[i].isFinal) {
              accumulatedTranscript += pickBestAlternative(ev.results[i], accumulatedTranscript) + " ";
            } else {
              interimChunk += pickBestAlternative(ev.results[i], accumulatedTranscript + interimChunk);
            }
          }

          const heard = (accumulatedTranscript + interimChunk).trim();
          if (!heard) return;

          lastHeardText = heard;
          if (userTrEl) userTrEl.textContent = heard;

          // Map trực tiếp vào câu tiếng Nga (từ đúng xanh, từ sai đỏ theo WER)
          const werResult = renderMappedSentence(targetText, heard);
          const sim = werResult ? werResult.accuracy : 0;

          if (scoreValEl) scoreValEl.textContent = `${sim}%`;
          if (ringEl) {
            ringEl.textContent = `${sim}%`;
            ringEl.className = "score-ring " + (sim >= 80 ? "" : sim >= 60 ? "mid" : "low");
          }
          if (scoreLblEl) {
            scoreLblEl.textContent = sim >= 80 ? "Xuất sắc" : sim >= 60 ? "Khá tốt" : "Thử lại";
          }
          if (scoreWrapEl) {
            scoreWrapEl.className = "sp-score-badge " + (sim >= 80 ? "is-excellent" : sim >= 60 ? "is-good" : "is-retry");
          }
          if (dotEl) {
            dotEl.className = "sp-result-dot " + (sim >= 80 ? "is-excellent" : sim >= 60 ? "is-good" : "is-retry");
          }
        };

        recognitionInstance.onerror = (e) => {
          if (e && e.error === "no-speech") return;
          stopRecording();
        };

        recognitionInstance.onend = () => {
          if (isRecording) {
            stopRecording();
          }
        };

        try {
          recognitionInstance.start();
        } catch (e) {
          console.warn("[SpeechRecognition] Start error:", e);
        }
      } else {
        // Chế độ Record-Only (Self-Shadowing) khi trình duyệt không hỗ trợ Web Speech API
        if (statusLbl) statusLbl.textContent = "Chế độ tự nghe lại (Không chấm điểm)";
        if (userTrEl) userTrEl.innerHTML = `<span class="sp-tr-placeholder">Đang thu âm giọng bạn... Hãy phát âm câu mẫu rồi bấm dừng để nghe lại.</span>`;
      }
    };

    const stopRecording = () => {
      clearSilenceTimer();
      if (!isRecording && !recognitionInstance && !audioRecorderInstance) return;
      isRecording = false;
      recordStartToken++;

      const btnMic = el("#btnRecordMic");
      if (btnMic) btnMic.classList.remove("is-recording");
      const liveInd = el("#spRecLiveInd");
      if (liveInd) liveInd.style.display = "none";
      const wf = el("#spVmWaveform");
      if (wf) wf.classList.remove("is-live");

      if (recognitionInstance) {
        try { recognitionInstance.stop(); } catch (e) {}
        recognitionInstance = null;
      }

      if (audioRecorderInstance) {
        try { audioRecorderInstance.finish(); } catch (e) {}
        audioRecorderInstance = null;
      }

      const statusLbl = el("#spResultStatusLbl");
      const dotEl = el("#spResultDot");

      if (lastHeardText) {
        const targetIdx = (recordingSentenceIdx !== null && recordingSentenceIdx < items.length) ? recordingSentenceIdx : currentSentenceIdx;
        const it = items[targetIdx];
        const targetText = (it.ru || it.text_ru || it.text || "").trim();
        const werResult = computeWordErrorRate(targetText, lastHeardText);
        const sim = werResult ? werResult.accuracy : 0;

        const bestScore = Math.max(sim, STORE.get("speak_" + set.id + "_" + targetIdx, 0));
        STORE.set("speak_" + set.id + "_" + targetIdx, bestScore);
        STORE.set(todayKey, STORE.get(todayKey, 0) + 1);

        if (statusLbl) statusLbl.textContent = "Đã đánh giá xong";
        if (dotEl) {
          dotEl.className = "sp-result-dot " + (sim >= 80 ? "is-excellent" : sim >= 60 ? "is-good" : "is-retry");
        }

        // Xét hoàn thành trước để ô "Kinh nghiệm" trong danh sách hiện đúng XP vừa nhận
        checkLessonCompletion();
        renderPlaylist();

        // Tự động chuyển câu nếu bật chế độ Auto-Advance và đạt điểm tốt
        if (autoAdvance && sim >= 80 && currentSentenceIdx < items.length - 1) {
          if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
          autoAdvanceTimer = setTimeout(() => {
            autoAdvanceTimer = null;
            loadSentence(currentSentenceIdx + 1);
            playCurrentSentence();
          }, 1500);
        }
      } else {
        if (!SR) {
          if (statusLbl) statusLbl.textContent = "Đã thu âm xong";
          if (dotEl) dotEl.className = "sp-result-dot is-good";
        } else {
          if (statusLbl) statusLbl.textContent = "Chưa nhận diện được âm thanh";
          if (dotEl) dotEl.className = "sp-result-dot";
        }
      }
    };

    // Điều chỉnh tốc độ phát âm
    const toggleSpeed = () => {
      const speeds = [0.75, 1.0, 1.25];
      const nextIdx = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
      currentSpeed = speeds[nextIdx];
      const b = el("#spSpeedBadge");
      if (b) b.textContent = `${currentSpeed}x`;
      toast(`Tốc độ phát âm: ${currentSpeed}x`);
    };

    // Điều chỉnh chế độ lặp lại
    const toggleLoop = () => {
      const loops = [0, 3, 5]; // Tắt → 3x → 5x (PROJECT_SPEC)
      const nextIdx = (loops.indexOf(loopMode) + 1) % loops.length;
      loopMode = loops[nextIdx];
      loopRemaining = loopMode;

      const pill = el("#spLoopPill");
      const btn = el("#btnLoopToggle");
      if (pill) {
        pill.style.display = loopMode > 0 ? "block" : "none";
        pill.textContent = `${loopMode}x`;
      }
      if (btn) btn.classList.toggle("is-looping", loopMode > 0);

      toast(loopMode > 0 ? `Tự động lặp: ${loopMode} lần` : "Đã tắt tự động lặp");
      if (loopMode > 0 && !isPlaying) {
        playCurrentSentence();
      }
    };

    // Bật/tắt bản dịch tiếng Việt
    const toggleTranslation = () => {
      isTranslationVisible = !isTranslationVisible;
      const viBox = el("#spTargetVi");
      if (viBox) viBox.classList.toggle("is-blurred", !isTranslationVisible);
      const topBtn = el("#btnToggleTransTop");
      if (topBtn) {
        topBtn.classList.toggle("is-active", isTranslationVisible);
        topBtn.innerHTML = icon(isTranslationVisible ? "eye" : "eye-off", 16);
      }
    };

    // Bật/tắt Auto Advance
    const toggleAutoAdvance = () => {
      autoAdvance = !autoAdvance;
      const btn = el("#btnToggleAutoAdv");
      if (btn) btn.classList.toggle("is-active", autoAdvance);
      toast(autoAdvance ? "Bật tự động chuyển câu khi đạt điểm cao" : "Tắt tự động chuyển câu");
    };

    // Bật/tắt ẩn hiện sidebar trên desktop
    const toggleSidebar = () => {
      // Trên mobile/tablet (<= 900px), mở drawer
      if (window.innerWidth <= 900) {
        const sidePnl = el("#spSidebarPanel");
        const sideScrim = el("#spSidebarScrim");
        if (sidePnl && sideScrim) {
          sidePnl.classList.toggle("is-open");
          sideScrim.classList.toggle("is-open");
        }
        return;
      }
      // Trên desktop, thu gọn sidebar để mở rộng tối đa không gian
      isSidebarHidden = !isSidebarHidden;
      const grid = el("#spWsGrid");
      const side = el("#spSidebarPanel");
      const btn = el("#btnToggleSidebar");
      if (grid) grid.classList.toggle("is-sidebar-hidden", isSidebarHidden);
      if (side) side.style.display = isSidebarHidden ? "none" : "flex";
      if (btn) btn.classList.toggle("is-active", !isSidebarHidden);
    };

    // Phím V: phát tiếp video tự do (không theo đoạn câu)
    const handlePlayVideo = () => {
      if (!hasVideo) return;
      sendYtCommand("playVideo", []);
    };

    // Keyboard Shortcuts Listener
    const onWorkspaceKeydown = (e) => {
      // Không chiếm tổ hợp phím của trình duyệt (Ctrl+R, Ctrl+T...) và không chặn gõ trong ô nhập liệu
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && t.closest && t.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')) return;
      // Space trên nút/link đang focus phải kích hoạt chính nút đó (người dùng bàn phím)
      if (e.code === "Space" && t && t.closest && t.closest('button, a, [role="button"]')) return;

      if (e.code === "Space") {
        e.preventDefault();
        playCurrentSentence();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        startRecording();
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        toggleLoop();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        if (currentSentenceIdx < items.length - 1) {
          loadSentence(currentSentenceIdx + 1);
          playCurrentSentence();
        }
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        if (currentSentenceIdx > 0) {
          loadSentence(currentSentenceIdx - 1);
          playCurrentSentence();
        }
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleTranslation();
      } else if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        handlePlayVideo();
      }
    };

    // Đăng ký sự kiện
    document.addEventListener("keydown", onWorkspaceKeydown);

    // Sự kiện nút quay lại (Back)
    el("#btnBackSpList").onclick = () => {
      stopAudio();
      stopRecording();
      // stopRecording có thể vừa hẹn tự chuyển câu → huỷ sau khi dừng ghi âm
      if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
      if (loopReplayTimer) { clearTimeout(loopReplayTimer); loopReplayTimer = null; }
      stopActiveVmAudio();
      Object.values(userVoiceMemos).forEach(m => {
        try { URL.revokeObjectURL(m.url); } catch (_) {}
      });
      if (ytCtl) {
        ytCtl.destroy();
        ytCtl = null;
      }
      ytPlayer = null;
      ytReady = false;
      document.removeEventListener("keydown", onWorkspaceKeydown);
      document.body.classList.remove("in-workspace");
      if (typeof window !== "undefined" && window.history && window.history.replaceState) {
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (_) {}
      }
      currentLevel = set.level || "A1";
      currentPage = 1;
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Đăng ký các nút điều khiển
    el("#btnPlayModel").onclick = () => playCurrentSentence();
    el("#btnRecordMic").onclick = startRecording;
    el("#btnSpeedToggle").onclick = toggleSpeed;
    el("#btnLoopToggle").onclick = toggleLoop;
    el("#btnToggleTransTop").onclick = toggleTranslation;
    el("#btnToggleAutoAdv").onclick = toggleAutoAdvance;
    el("#btnToggleSidebar").onclick = toggleSidebar;

    el("#btnNextSent").onclick = () => {
      if (currentSentenceIdx < items.length - 1) {
        loadSentence(currentSentenceIdx + 1);
        playCurrentSentence();
      } else {
        toast("Bạn đang ở câu cuối cùng của bài học!");
      }
    };

    el("#btnPrevSent").onclick = () => {
      if (currentSentenceIdx > 0) {
        loadSentence(currentSentenceIdx - 1);
        playCurrentSentence();
      }
    };

    // Feedback action buttons
    if (el("#btnFeedbackRetry")) el("#btnFeedbackRetry").onclick = startRecording;

    // Đăng ký các nút tương tác trên Widget Voice Memo Figma
    const btnVmPlay = el("#btnVmPlay");
    if (btnVmPlay) {
      btnVmPlay.onclick = () => playVoiceMemo(currentSentenceIdx);
    }
    const btnVmCompare = el("#btnVmCompare");
    if (btnVmCompare) {
      btnVmCompare.onclick = () => playCurrentSentence(false);
    }
    const btnVmDelete = el("#btnVmDelete");
    if (btnVmDelete) {
      btnVmDelete.onclick = () => {
        if (userVoiceMemos[currentSentenceIdx]) {
          try { URL.revokeObjectURL(userVoiceMemos[currentSentenceIdx].url); } catch (_) {}
          delete userVoiceMemos[currentSentenceIdx];
          renderVoiceMemoUI(currentSentenceIdx);
          toast("Đã xóa bản ghi âm.");
        }
      };
    }

    // Nhấp vào câu tiếng Nga để phát âm mẫu hoặc nghe video câu đó
    const ruSentenceEl = el("#spTargetRu");
    if (ruSentenceEl) {
      ruSentenceEl.onclick = () => {
        playCurrentSentence();
      };
    }

    // Mobile drawer backdrop click
    const sideScrim = el("#spSidebarScrim");
    if (sideScrim) {
      sideScrim.onclick = () => {
        const sidePnl = el("#spSidebarPanel");
        if (sidePnl) sidePnl.classList.remove("is-open");
        sideScrim.classList.remove("is-open");
      };
    }

    // Nhấp vào câu dịch khi bị mờ để hiển thị nhanh
    el("#spTargetVi").onclick = () => {
      if (!isTranslationVisible) toggleTranslation();
    };

    // Dựng video bằng RusiYtPlayer (ẩn giao diện YouTube); trang tự điều khiển theo câu nên ẩn thanh điều khiển chung.
    // Lỗi tải API → RusiYtPlayer trả giao diện YouTube gốc, trang dùng dự phòng postMessage.
    // Video chạy tự do (bấm ảnh bìa/khung video, phím V): đổi câu trên sân khấu theo thời điểm phát và chạy chữ đỏ.
    // Khi trang tự phát một câu (isPlaying) thì playCurrentSentence đã lo karaoke → bỏ qua.
    const syncFreePlay = (t) => {
      if (isPlaying || isRecording || ytVideoBroken || !ytPlayer) return;
      // Chỉ theo video khi nó thật sự đang chạy: lúc dừng sau một câu, mốc có thể đã chạm câu kế → không được tự đổi câu
      let state = -1;
      try { state = ytPlayer.getPlayerState(); } catch (_) {}
      if (state !== 1) return;
      let idx = -1;
      for (let i = 0; i < items.length; i++) {
        const s = getItemSec(i);
        if (s === null || t < s) continue;
        if (t < getItemEndSec(i)) { idx = i; break; }
      }
      if (idx === -1) { clearKaraoke(); return; } // khoảng lặng giữa hai câu: giữ câu cũ, tắt chữ đỏ
      if (idx !== currentSentenceIdx) loadSentence(idx);
      const s = getItemSec(idx);
      const segLen = Math.max(1.0, getItemEndSec(idx) - s);
      const it = items[idx];
      const spans = Array.from(document.querySelectorAll("#spTargetRu .sp-target-word"));
      const totalChars = spans.reduce((sum, sp) => sum + sp.textContent.length, 0) || 1;
      let accum = 0;
      let active = -1;
      spans.forEach((sp, i) => {
        const wt = (Array.isArray(it.w) && it.w.length > i) ? Number(it.w[i]) : s + (accum / totalChars) * segLen;
        accum += sp.textContent.length;
        if (t >= wt) active = i;
      });
      spans.forEach((sp, i) => sp.classList.toggle("sp-karaoke-active", i === active));
    };

    if (hasVideo) {
      // Bài không đặt start_sec → bắt đầu ngay ở câu đầu tiên, bỏ qua đoạn mở đầu của video
      const firstSentenceSec = getItemSec(0);
      ytCtl = window.RusiYtPlayer.mount(el("#spVideoBody"), {
        videoId: ytId,
        start: setStartSec || (firstSentenceSec > 0 ? Math.floor(firstSentenceSec) : 0),
        end: setEndSec,
        rate: currentSpeed,
        title: set.title,
        frameId: "spYoutubePlayer",
        showBar: false,
        onTime: syncFreePlay,
        revealDelayMs: 0, // câu chỉ 6–9 giây → thấy hình ngay, chấp nhận giao diện YouTube nháy đầu câu
        onReady: (player) => {
          ytPlayer = player;
          ytReady = true;
          if (ytPendingPlay) {
            ytPendingPlay = false;
            playCurrentSentence(true);
          }
        },
        onError: (code) => {
          // 2: ID sai, 5: lỗi HTML5, 100: video bị xoá, 101/150: chủ video không cho nhúng
          console.warn("[Speaking] YouTube player error", code);
          ytVideoBroken = true;
          const wasPlaying = isPlaying || ytPendingPlay;
          stopVideoSegment();
          clearKaraoke();
          toast("Video không phát được — chuyển sang giọng đọc mẫu.");
          if (wasPlaying) playCurrentSentence(true);
        },
        onApiFail: (err) => {
          console.warn("[Speaking] YouTube IFrame API không dùng được, chuyển sang chế độ dự phòng", err);
          ytApiFailed = true;
          if (ytPendingPlay) {
            ytPendingPlay = false;
            // đợi iframe gốc tải lại rồi mới gửi lệnh postMessage
            setTimeout(() => { if (el("#spYoutubePlayer")) playCurrentSentence(true); }, 1500);
          }
        }
      });
      if (!ytCtl) console.warn("[Speaking] Không khởi tạo được trình phát video", ytId);
    }

    // Khởi chạy câu đầu tiên & playlist
    renderPlaylist();
    loadSentence(0);
  };

  // Nút Back trình duyệt/Android: URL đổi (pushState) nhưng workspace vẫn mở → chạy đúng thao tác của nút Back trong trang
  if (window._rusiSpeakPopHandler) window.removeEventListener("popstate", window._rusiSpeakPopHandler);
  window._rusiSpeakPopHandler = () => {
    if (!openSpeakingSet || !document.body.classList.contains("in-workspace")) return;
    const ids = [openSpeakingSet.id, openSpeakingSet.code].filter(Boolean).map((v) => String(v).toLowerCase());
    let urlIds = [];
    try {
      urlIds = window.location.pathname.split("/").concat(Array.from(new URLSearchParams(window.location.search).values()))
        .map((v) => { try { return decodeURIComponent(v).toLowerCase(); } catch (_) { return String(v).toLowerCase(); } });
    } catch (_) {}
    if (ids.some((id) => urlIds.includes(id))) return;
    const backBtn = el("#btnBackSpList");
    if (backBtn) backBtn.click();
  };
  window.addEventListener("popstate", window._rusiSpeakPopHandler);

  renderHub();
  // checkUrlSet() đặt cấp độ/chế độ theo ?level= / ?mode= sau khi hub đã vẽ → vẽ lại nếu không mở bài nào
  if (!checkUrlSet() && (initialRoute.level || initialRoute.mode) && !document.body.classList.contains("in-workspace")) {
    renderHub();
  }
}
window.initSpeakingPage = initSpeakingPage;
window._initSpeakingPage = initSpeakingPage;
