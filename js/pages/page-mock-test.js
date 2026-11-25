/**
 * RUSI TRKI — page-mock-test.js
 * Phân hệ trang: initMockTestPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initMockTestPage() {
  const host = el("#testHost");
  if (!host) return;
  const icon = (name, size = 18) => (window.RusiIcons ? RusiIcons.get(name, { size }) : "");

  const LEVELS = [
    ["A1", "ТЭУ"],
    ["A2", "ТБУ"],
    ["B1", "TRKI-1"],
    ["B2", "TRKI-2"],
    ["C1", "TRKI-3"],
    ["C2", "TRKI-4"],
    ["VNZh", "ВЖ"]
  ];

  const MODE_INFO = {
    practice: {
      title: "Luyện tập",
      subtitle: "Ôn tập từng phần, làm bài linh hoạt không áp lực thời gian và xem giải thích chi tiết",
      icon: "target"
    },
    exam: {
      title: "Luyện thi",
      subtitle: "Mô phỏng phòng thi thật chuẩn ТРКИ, bấm giờ thực tế và chấm điểm nghiêm ngặt",
      icon: "graduation-cap"
    }
  };

  const cachedTests = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("tests:all") : null;
  const fullBank = (typeof window !== "undefined" && Array.isArray(window.TRKI_BANK) && window.TRKI_BANK.length) ? window.TRKI_BANK : [];
  const indexBank = (typeof window !== "undefined" && Array.isArray(window.TRKI_INDEX) && window.TRKI_INDEX.length) ? window.TRKI_INDEX : [];
  let bank = fullBank.length ? fullBank : (indexBank.length ? indexBank : ((cachedTests && cachedTests.length) ? cachedTests : []));

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;

  let currentTest = bank[0] || null;
  let activePartId = null; // null = thi full toan bo de; hoac "gram", "reading", "listening"
  let examMode = "practice"; // "practice" (Luyện tập) | "exam" (Luyện thi)
  let answers = {};
  let flagged = {};
  let timeLeft = 0;
  let timer = null;
  let started = false;
  let tabSwitches = 0;
  let visibilityHandler = null;
  // Dọn audio + phím tắt của phòng thi hiện tại (gán trong renderTestRoom, gọi khi nộp bài / render lại).
  let workspaceTeardown = null;
  const runWorkspaceTeardown = () => {
    if (workspaceTeardown) {
      try { workspaceTeardown(); } catch (_) {}
      workspaceTeardown = null;
    }
  };
  let shuffleOptionsEnabled = typeof STORE !== "undefined" ? STORE.get("trki_shuffle_options", true) : true;
  let sessionOptionOrders = {};

  const checkUrlExam = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = (k) => (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || urlParams.get(k);
      const targetLevel = getParam("level");
      if (targetLevel && ["A1", "A2", "B1", "B2", "C1", "C2"].includes(targetLevel.toUpperCase())) {
        currentLevel = targetLevel.toUpperCase();
      }
      const targetId = getParam("exam") || getParam("test") || getParam("id");
      const urlMode = urlParams.get("mode");
      if (urlMode === "exam" || urlMode === "practice") {
        examMode = urlMode;
      }
      if (targetId) {
        const found = bank.find(t => t.id === targetId || t.code === targetId);
        if (found) {
          const isPro = Boolean(found.is_pro_only || found.is_pro);
          if (isPro && typeof Monetization !== "undefined" && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề thi TRKI dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ phòng thi mô phỏng ТРКИ chuẩn quốc tế và nhận phân tích chi tiết.");
            return true;
          }
          openExamBriefing(found, null, examMode);
          return true;
        }
      }
    } catch (_) {}
    return false;
  };

  const loadCloudTests = async () => {
    // 0-Egress rule: Bỏ qua truy vấn Supabase nếu đã có mục lục hoặc ngân hàng đề thi trong RAM/IndexedDB
    if ((window.TRKI_BANK && window.TRKI_BANK.length > 0) || (window.TRKI_INDEX && window.TRKI_INDEX.length > 0)) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.tests.getPublished();
        if (remote && remote.length) {
          if (started) return;
          bank = remote;
          if (!currentTest || !bank.some(t => t.id === currentTest.id)) {
            currentTest = bank[0];
          }
          console.log(`[Supabase] Đã nạp & đồng bộ ${bank.length} đề thi TRKI!`);
          if (!document.body.classList.contains("in-workspace")) {
            renderTrkiCards();
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải đề thi TRKI từ cloud:", err);
      }
    }
  };
  loadCloudTests();

  if (window.RusiDataLoader && !bank.length) {
    const modKey = window.RusiDataLoader.isLoaded("TRKI_BANK") ? "TRKI_BANK" : "TRKI_INDEX";
    window.RusiDataLoader.load(modKey).then((loaded) => {
      if (loaded && loaded.length && (!bank || !bank.length)) {
        bank = loaded;
        if (!currentTest || !bank.some(t => t.id === currentTest.id)) {
          currentTest = bank[0];
        }
        if (!document.body.classList.contains("in-workspace")) {
          renderTrkiCards();
        }
      }
    });
  }

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const matchesTestMode = (t, mode) => {
    const tm = (t.test_mode || t.mode || "").toLowerCase();
    const isFull = (t.sub_test_type === "full" || t.sub_test_type === "integrated") && t.sub_test_type !== "mock" && tm !== "practice";
    if (mode === "exam") return isFull;
    // Chế độ Luyện tập: hiển thị đề chuyên đề, đề thi thử rút gọn và cho phép C2/VNZh hiển thị để luyện tập tự do
    return !isFull || t.level === "C2" || t.level === "VNZh";
  };

  const renderTrkiCards = () => {
    const gridHost = el("#trkiCardsGrid");
    if (!gridHost) return;

    // Cập nhật trạng thái active của 2 thẻ chọn Mode
    host.querySelectorAll(".trki-mode-card").forEach((button) => {
      const active = button.dataset.mode === examMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // Cập nhật số lượng trên các nút cấp độ
    LEVELS.forEach(([level]) => {
      const count = bank.filter(t => t.level === level && matchesTestMode(t, examMode)).length;
      const countNode = host.querySelector(`[data-trki-count="${level}"]`);
      if (countNode) countNode.textContent = count;
    });

    // Update active class on level tabs
    host.querySelectorAll(".trki-level-tab").forEach(b => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = bank.filter(t => t.level === currentLevel && matchesTestMode(t, examMode));

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state trki-empty-state topic-empty-state">
          <span class="writing-empty-icon trki-empty-icon">${icon(MODE_INFO[examMode].icon, 34)}</span>
          <h3>Chưa có đề ${MODE_INFO[examMode].title.toLowerCase()} cho cấp độ ${currentLevel}</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
      const pagEl = el("#trkiPagination");
      if (pagEl) pagEl.innerHTML = "";
    } else {
      gridHost.innerHTML = pageItems.map((t) => {
        const isDone = Progress.doneList("trkiDone").includes(t.id);
        const isPro = Boolean(t.is_pro_only || t.is_pro);
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const qCount = t.questionCount || t.questionsCount || (t.questions ? t.questions.length : (t.parts ? t.parts.reduce((a, b) => a + (b.questions ? b.questions.length : 0), 0) : 34));
        const durMin = t.durationSeconds 
          ? Math.round(t.durationSeconds / 60) 
          : (t.duration_min || t.durationMin || (Array.isArray(t.parts) ? t.parts.reduce((a, b) => a + (b.durationMin || b.duration_min || 0), 0) : 0) || 60);
        const cleanTitle = (t.title || "").trim();
        const countLabel = examMode === "practice" ? `${qCount} câu hỏi · Luyện tập tự do` : `Chuẩn 5 phần · ${qCount} câu · ${durMin} phút`;
        const actionLabel = isDone ? "Đã hoàn thành" : (examMode === "practice" ? "Vào luyện tập" : "Vào luyện thi");
        const iconKey = examMode === "practice" ? "target" : (t.icon || "graduation-cap");

        return `
          <article class="rusi-card rusi-card-compact trki-topic-card ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-trki-id="${t.id}" tabindex="0">
            <div class="rusi-card-header">
              <div class="rusi-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                ${icon(iconKey, 24)}
              </div>
              <div class="rusi-card-header-main">
                <div class="rusi-card-title-row">
                  <h3 class="rusi-card-ru" title="${esc(cleanTitle)}">${esc(cleanTitle)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${icon("check", 12)} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : ""}
                </div>
                <div class="rusi-card-subinfo">
                  <span>${t.level}</span>
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
                  <button type="button" class="btn-trki-action topic-text-btn" data-trki-id="${t.id}" title="${actionLabel}">
                    ${actionLabel} ${icon("arrow-right", 14)}
                  </button>
                `}
              </div>
            </div>
          </article>
        `;
      }).join("");

      // Action: Click "Vào luyện tập / Vào luyện thi" or card

      // Action: Click "Vào luyện tập / Vào luyện thi" or card -> Mở màn hình Briefing thông báo & kiểm tra thiết bị
      // Action: Click "Vào luyện tập / Vào luyện thi" or card -> Mở màn hình Briefing thông báo & kiểm tra thiết bị
      const openExam = (id) => {
        const test = bank.find(x => x.id === id);
        if (!test) return;
        const isPro = Boolean(test.is_pro_only || test.is_pro);
        if (isPro && typeof Monetization !== "undefined" && !Monetization.isPro()) {
          Monetization.showProGateModal("Đề thi TRKI dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ phòng thi mô phỏng ТРКИ chuẩn quốc tế và nhận phân tích chi tiết.");
          return;
        }
        openExamBriefing(test, null, examMode);
      };

      gridHost.querySelectorAll(".btn-trki-action, .btn-trki-circle").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          openExam(btn.dataset.trkiId);
        };
      });

      gridHost.querySelectorAll(".topic-card, .rusi-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button") || e.target.closest("a")) return;
          openExam(card.dataset.trkiId);
        };
        card.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openExam(card.dataset.trkiId);
          }
        };
      });
    }

    renderRusiPagination(el("#trkiPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderTrkiCards();
    }, { remainingCount, unit: "đề thi" });
  };

  const renderHub = () => {
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/mock-test');
    }
    started = false;
    answers = {};
    flagged = {};
    sessionOptionOrders = {};
    tabSwitches = 0;
    cleanupHardwareTests();
    if (timer) clearInterval(timer);
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }
    document.body.classList.remove("in-workspace", "cbt-fullscreen-mode");

    host.innerHTML = `
      <section class="writing-hub listening-hub trki-hub" id="trkiHub">
        <header class="writing-hub-header listening-hub-header trki-hub-header">
          <h1>Chọn cách bạn muốn ôn luyện TRKI</h1>
          <p>Ôn tập từng kỹ năng với chế độ Luyện tập hoặc thử sức với phòng thi Luyện thi chuẩn quốc tế ТРКИ.</p>
        </header>

        <div class="writing-mode-grid listening-mode-grid trki-mode-grid" aria-label="Chọn hình thức ôn luyện TRKI">
          ${Object.entries(MODE_INFO).map(([key, info]) => `
            <button type="button" class="writing-mode-card listening-mode-card trki-mode-card ${key === examMode ? "active" : ""}" data-mode="${key}" aria-pressed="${key === examMode}">
              <span class="writing-mode-icon listening-mode-icon trki-mode-icon">${icon(info.icon, 28)}</span>
              <span class="writing-mode-copy listening-mode-copy trki-mode-copy">
                <strong>${info.title}</strong>
                <small>${info.subtitle}</small>
              </span>
              <span class="writing-mode-arrow listening-mode-arrow">${icon("arrow-right", 18)}</span>
            </button>
          `).join("")}
        </div>

        <div class="level-tabs writing-level-tabs listening-level-tabs trki-level-tabs" role="tablist" aria-label="Lọc đề thi theo cấp độ" id="trkiLevelTabs">
          ${LEVELS.map(([level, label]) => `
            <button type="button" class="level-tab writing-level-tab listening-level-tab trki-level-tab ${level === currentLevel ? "level-tab-active active" : ""}" data-level="${level}" role="tab" aria-selected="${level === currentLevel ? "true" : "false"}">
              <span class="level-code">${level}</span>
              <small>${label}</small>
              <span class="level-tab-count" data-trki-count="${level}">0</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-topic-grid listening-topic-grid trki-topic-grid" id="trkiCardsGrid" style="margin-top:24px"></div>
        <div class="rusi-pagination" id="trkiPagination"></div>
      </section>
    `;

    // Click đổi mode Luyện tập / Luyện thi
    host.querySelectorAll(".trki-mode-card").forEach((button) => {
      button.onclick = () => {
        const newMode = button.dataset.mode;
        if (newMode === examMode) return;
        examMode = newMode;
        renderTrkiCards();
      };
    });

    // Click tab cấp độ
    host.querySelectorAll(".trki-level-tab").forEach((btn) => {
      btn.onclick = () => {
        currentLevel = btn.dataset.level;
        currentPage = 1;
        renderTrkiCards();
      };
    });

    renderTrkiCards();
  };

  const getExamPartList = () => {
    if (!activePartId || activePartId === "full") return null;
    if (Array.isArray(activePartId)) return activePartId;
    if (typeof activePartId === "string") return activePartId.split(",");
    return null;
  };

  const getExamStorageKey = () => {
    const list = getExamPartList();
    const pKey = list ? list.join("-") : "full";
    return "trki_exam_" + currentTest.id + "_" + pKey + "_" + examMode;
  };

  // Hàm chuẩn hoá options: đảm bảo luôn trả về array dù DB lưu string hay array
  const normalizeOptions = (opts) => {
    if (Array.isArray(opts)) return opts;
    if (typeof opts === "string" && opts.trim()) return opts.trim().split(/\s{2,}|\t|\n/).map(s => s.trim()).filter(Boolean);
    return [];
  };

  // Fetch câu hỏi từ trki_question_bank và merge vào parts của test (Bug #1 fix)
  const loadQBankIntoTest = async (test) => {
    if (!test || !test.code) return;
    if (!window.RusiSupabase || !window.RusiSupabase.isReady()) return;
    try {
      const rows = await window.RusiSupabase.questionBank.getByTest(test.code);
      if (!rows || !rows.length) return;
      const mapped = rows
        .sort((x, y) => (x.order_index || 0) - (y.order_index || 0))
        .map(r => ({
          q: r.prompt || r.question_text || "",
          options: normalizeOptions(r.options),
          a: typeof r.correct_index === "number" ? r.correct_index : undefined,
          ex: r.explanation || "",
          topic: r.topic || ""
        }))
        .filter(r => r.q && r.options.length >= 2);
      if (!mapped.length) return;
      const existingCount = (test.parts && test.parts[0] && Array.isArray(test.parts[0].questions)) ? test.parts[0].questions.length : 0;
      if (!Array.isArray(test.parts) || !test.parts.length) {
        test.parts = [{ id: "gram", name: "Лексика и грамматика", vi: "Từ vựng và ngữ pháp", durationMin: 60, questions: mapped }];
      } else if (existingCount === 0 || mapped.length >= existingCount) {
        test.parts[0].questions = mapped;
      }
    } catch (e) {
      console.warn("[TRKI] Không tải được câu hỏi từ ngân hàng:", e);
    }
  };

  // Quản lý tài nguyên Microphone và Loa
  let activeMicStream = null;
  let activeAudioCtx = null;
  let micAnimFrame = null;
  const cleanupHardwareTests = () => {
    if (window._mockTestSpeakRecorder) {
      try { if (window._mockTestSpeakRecorder.state !== "inactive") window._mockTestSpeakRecorder.stop(); } catch(_) {}
      window._mockTestSpeakRecorder = null;
    }
    if (activeMicStream) {
      try {
        activeMicStream.getTracks().forEach(t => t.stop());
      } catch(_) {}
      activeMicStream = null;
    }
    if (activeAudioCtx) {
      try {
        activeAudioCtx.close();
      } catch(_) {}
      activeAudioCtx = null;
    }
    if (micAnimFrame) {
      cancelAnimationFrame(micAnimFrame);
      micAnimFrame = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Thi thử bắt buộc đăng nhập: RPC chấm bài (rusi_grade_trki_submission / rusi_check_trki_question)
  // chỉ cấp cho tài khoản đã đăng nhập.
  const requireExamLogin = () => {
    if (typeof Monetization === "undefined" || typeof Monetization.getCurrentUser !== "function") return true;
    const user = Monetization.getCurrentUser();
    const isGuest = user && (String(user.id || user.uid || "").startsWith("guest_") || user.isGuest);
    if (user && !isGuest) return true;
    Monetization.showAuthRequiredModal("Đăng nhập để vào phòng thi", "Bạn cần đăng nhập để làm bài thi thử TRKI và lưu kết quả chấm điểm.");
    return false;
  };

  /* =====================================================================
   * GIAI ĐOẠN 1: CỬA SỔ THÔNG BÁO BÀI THI & KIỂM TRA THIẾT BỊ (BRIEFING)
   * ===================================================================== */
  const openExamBriefing = async (test, partId = null, mode = "exam") => {
    if (!requireExamLogin()) return;
    if (window.setRusiDeepUrl && test) {
      window.setRusiDeepUrl('/mock-test/de_thi/' + encodeURIComponent(test.id || test.code));
    }
    if (test) currentTest = test;
    activePartId = partId;
    examMode = mode || "exam";

    cleanupHardwareTests();
    document.body.classList.add("in-workspace", "cbt-fullscreen-mode");

    // Nạp chi tiết câu hỏi từ TRKI_BANK theo nhu cầu (On-Demand Lazy Load) khi chọn từ mục lục nhẹ
    if (currentTest && (currentTest._isIndexOnly || !Array.isArray(currentTest.parts) || !currentTest.parts.length)) {
      host.innerHTML = `<div style="padding:80px 24px;text-align:center;color:var(--muted)"><div class="rusi-skeleton-hero" style="max-width:520px;margin:0 auto 16px"></div><p>Đang tải nội dung đề thi...</p></div>`;
      if (window.RusiDataLoader && typeof window.RusiDataLoader.load === "function") {
        const loadedFull = await window.RusiDataLoader.load("TRKI_BANK");
        if (Array.isArray(loadedFull) && loadedFull.length) {
          bank = loadedFull;
          const match = loadedFull.find(t => t.id === currentTest.id || t.code === currentTest.code);
          if (match) currentTest = match;
        }
      }
    }

    if (currentTest && currentTest.code && currentTest.code.startsWith("trki_zlat")) {
      if (!(currentTest.parts && currentTest.parts[0] && Array.isArray(currentTest.parts[0].questions) && currentTest.parts[0].questions.length > 0)) {
        await loadQBankIntoTest(currentTest);
      }
    }

    const isPractice = (examMode === "practice");
    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);

    const activeParts = isSubset
      ? (currentTest.parts || []).filter(p => selectedPartList.includes(p.id))
      : (currentTest.parts || []);

    const totalQuestions = activeParts.reduce((acc, p) => {
      if (p && Array.isArray(p.questions)) return acc + p.questions.length;
      if (p && Array.isArray(p.writing_tasks)) return acc + p.writing_tasks.length;
      if (p && Array.isArray(p.speaking_tasks)) return acc + p.speaking_tasks.length;
      return acc;
    }, 0);

    const examDurationMin = isSubset
      ? activeParts.reduce((acc, p) => acc + (p.durationMin || 15), 0)
      : (currentTest.duration_min || currentTest.durationMin || (activeParts.length ? activeParts.reduce((acc, p) => acc + (p.durationMin || p.duration_min || 0), 0) : 0) || 60);

    const passPct = currentTest.pass_percent || currentTest.passPercent || 66;

    // RENDER TOÀN MÀN HÌNH KHÔNG XUNG ĐỘT (CBT PORTAL SUITE)
    host.innerHTML = `
      <div class="cbt-app-portal" id="cbtPortalRoot">
        <!-- TOP BAR DÀI RỘNG TRÊN ĐỈNH THAY THẾ HEADER WEBSITE -->
        <header class="cbt-portal-header" role="banner">
          <div class="cbt-header-left">
            <button type="button" class="cbt-btn-icon" id="btnBriefingBack" title="Quay lại danh sách đề thi" aria-label="Quay lại danh sách đề thi">
              ${icon("arrow-left", 18)}
            </button>
            <div class="cbt-header-info">
              <div class="cbt-header-title-row">
                <span class="cbt-level-pill">ТРКИ-${currentTest.level}</span>
                <span class="cbt-test-name-text" title="${esc(currentTest.title)}">${esc(currentTest.title)}</span>
              </div>
              <span class="cbt-subtest-label">${isPractice ? "Chế độ: Luyện tập tự do" : "Kỳ thi mô phỏng khảo thí CBT chuẩn quốc tế"}</span>
            </div>
          </div>

          <div class="cbt-header-center">
            <div class="cbt-clock-pill cbt-practice-pill" style="font-size:0.95rem;color:var(--primary)">
              ${icon(isPractice ? "target" : "graduation-cap", 16)}
              <span>${isPractice ? "Luyện tập tự do" : "Mô phỏng khảo thí CBT"}</span>
            </div>
          </div>

          <div class="cbt-header-right">
            <button type="button" class="cbt-btn-fullscreen" id="btnBriefingFullscreen" title="Bật/Tắt Toàn màn hình">
              ${icon("maximize", 15)} <span>Toàn màn hình</span>
            </button>
          </div>
        </header>

        <!-- KHUNG CHÍNH Ở GIỮA: CỬA SỔ BRIEFING THÔNG BÁO VÀ TEST THIẾT BỊ -->
        <div class="cbt-portal-content">
          <div class="cbt-briefing-stage">
            <div class="cbt-briefing-card">
              <div class="cbt-briefing-hero">
                <div class="cbt-briefing-eyebrow">
                  ${isPractice ? `${icon("target", 14)} CHẾ ĐỘ LUYỆN TẬP TỰ DO` : `${icon("shield-anti-cheat", 14)} HỆ THỐNG KHẢO THÍ CHUẨN QUỐC TẾ LIÊN BANG NGA`}
                </div>
                <h1 class="cbt-briefing-heading">${esc(currentTest.title)}</h1>
                <p class="cbt-briefing-lead">
                  ${isPractice
                    ? `Cấp độ <b>ТРКИ-${currentTest.level}</b> · Luyện tập theo cấu trúc đề ТРКИ (TORFL), không giới hạn thời gian. Chọn đáp án là thấy ngay đúng/sai và giải thích. Bạn có thể chọn riêng từng phần muốn luyện bên dưới.`
                    : `Cấp độ <b>ТРКИ-${currentTest.level}</b> · Bài kiểm tra khảo thí mô phỏng cấu trúc kỳ thi quốc gia ТРКИ (TORFL). Vui lòng kiểm tra cấu trúc bài thi và thiết bị âm thanh, micro trước khi bắt đầu.`}
                </p>
              </div>

              <!-- 4 THẺ CHỈ SỐ TÓM TẮT BÀI THI -->
              <div class="cbt-matrix-summary-row">
                <div class="cbt-summary-cell">
                  <div class="cbt-summary-num">${examDurationMin} phút</div>
                  <div class="cbt-summary-txt">${isPractice ? "Thời lượng gợi ý" : "Thời gian làm bài"}</div>
                </div>
                <div class="cbt-summary-cell">
                  <div class="cbt-summary-num">${totalQuestions} câu</div>
                  <div class="cbt-summary-txt">Tổng số câu hỏi</div>
                </div>
                <div class="cbt-summary-cell">
                  <div class="cbt-summary-num">${activeParts.length} phần</div>
                  <div class="cbt-summary-txt">Số phân môn (Subtests)</div>
                </div>
                <div class="cbt-summary-cell">
                  <div class="cbt-summary-num">≥ ${passPct}%</div>
                  <div class="cbt-summary-txt">Chuẩn đạt (Сдано)</div>
                </div>
              </div>

              <!-- BẢNG CẤU TRÚC PHÂN MÔN -->
              <div class="cbt-subtest-overview-box">
                <div class="cbt-box-header-title">
                  <span>${icon("list", 16)} CẤU TRÚC CÁC PHÂN MÔN KHẢO THÍ</span>
                  <span style="font-size:0.78rem;color:var(--muted)">${isPractice ? "Bấm để chọn phần muốn luyện" : "Chuẩn CEFR Châu Âu & Nga"}</span>
                </div>
                <div class="cbt-subtest-items-grid">
                  ${(isPractice ? (currentTest.parts || []) : activeParts).map((p, pIdx) => {
                    const qCount = (p.questions ? p.questions.length : (p.writing_tasks ? p.writing_tasks.length : (p.speaking_tasks ? p.speaking_tasks.length : 0)));
                    const dur = p.durationMin || p.duration_min || Math.round(examDurationMin / activeParts.length);
                    const included = activeParts.includes(p);
                    const rowTag = isPractice ? "label" : "div";
                    const rowStyle = isPractice ? ` style="display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:44px;cursor:pointer;${included ? "" : "opacity:0.55;"}"` : "";
                    return `
                      <${rowTag} class="cbt-subtest-row-item"${rowStyle}>
                        <div class="cbt-row-left">
                          ${isPractice ? `<input type="checkbox" class="cbt-part-pick" data-part-id="${esc(p.id)}" ${included ? "checked" : ""} style="width:18px;height:18px;flex-shrink:0;accent-color:var(--primary)">` : ""}
                          <span class="cbt-part-circle-num">${pIdx + 1}</span>
                          <div>
                            <span class="cbt-row-title-ru ru">${esc(p.name || "Субтест " + (pIdx + 1))}</span>
                            <span class="cbt-row-title-vi"> — ${esc(p.vi || "")}</span>
                          </div>
                        </div>
                        <div class="cbt-row-right">
                          <span>${qCount} câu</span>
                          <span>•</span>
                          <span>${dur} phút</span>
                        </div>
                      </${rowTag}>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- HỆ THỐNG KIỂM TRA THIẾT BỊ PHẦN CỨNG (LOA & MICRO) -->
              <div class="cbt-hw-check-row">
                <!-- 1. KIỂM TRA LOA / TAI NGHE -->
                <div class="cbt-hw-card">
                  <div class="cbt-hw-title-row">
                    ${icon("volume-2", 18)} <span>Kiểm tra Loa / Tai nghe</span>
                  </div>
                  <p class="cbt-hw-desc">Nghe đoạn thoại phát âm tiếng Nga bản xứ để đảm bảo âm lượng phần Nghe hiểu rõ ràng.</p>
                  <div class="cbt-hw-action-line">
                    <button type="button" class="cbt-btn-test-action" id="btnTestSpeaker">
                      ${icon("play-control", 14)} <span>Phát âm thanh mẫu</span>
                    </button>
                    <span class="cbt-status-pill-check idle" id="speakerStatusBadge">Chưa kiểm tra</span>
                  </div>
                </div>

                <!-- 2. KIỂM TRA MICROPHONE -->
                <div class="cbt-hw-card">
                  <div class="cbt-hw-title-row">
                    ${icon("mic-speaking", 18)} <span>Kiểm tra Microphone</span>
                  </div>
                  <p class="cbt-hw-desc">Bấm kiểm tra và nói thử vào micro: <i>«Здравствуйте!»</i> để kiểm tra độ nhạy.</p>
                  <div class="cbt-hw-action-line">
                    <button type="button" class="cbt-btn-test-action" id="btnTestMic">
                      ${icon("mic-speaking", 14)} <span>Kiểm tra Micro</span>
                    </button>
                    <span class="cbt-status-pill-check idle" id="micStatusBadge">Chưa kiểm tra</span>
                  </div>
                </div>
              </div>

              <!-- NÚT BẮT ĐẦU LÀM BÀI CHÍNH -->
              <div class="cbt-launch-row">
                <button type="button" class="cbt-btn-start-now" id="btnStartExamNow">
                  ${icon("play-control", 18)}
                  <span>${isPractice ? "BẮT ĐẦU LUYỆN TẬP" : "BẮT ĐẦU LÀM BÀI THI CHÍNH THỨC"} ➜</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.RusiIcons && typeof RusiIcons.replace === "function") {
      RusiIcons.replace(host);
    }

    // 1. Back button: Thoát về hub
    el("#btnBriefingBack").onclick = () => {
      cleanupHardwareTests();
      renderHub();
    };

    // 2. Fullscreen toggle
    const btnFs = el("#btnBriefingFullscreen");
    if (btnFs) {
      btnFs.onclick = () => {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
          document.body.classList.add("cbt-fullscreen-mode");
        } else {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          document.body.classList.remove("cbt-fullscreen-mode");
        }
      };
    }

    // 3. Speaker Test Event
    const btnSpeaker = el("#btnTestSpeaker");
    const speakerBadge = el("#speakerStatusBadge");
    let isSpeakerPlaying = false;

    if (btnSpeaker) {
      btnSpeaker.onclick = () => {
        if (isSpeakerPlaying) {
          if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
          isSpeakerPlaying = false;
          btnSpeaker.innerHTML = `${icon("play-control", 14)} <span>Phát âm thanh mẫu</span>`;
          if (window.RusiIcons) RusiIcons.replace(btnSpeaker);
          return;
        }

        const testPhrase = "Здравствуйте! Это проверка звука в системе тестирования РУСИ ТРКИ. Вы готовы начать экзамен?";
        isSpeakerPlaying = true;
        btnSpeaker.innerHTML = `${icon("pause-control", 14)} <span>Đang phát...</span>`;
        if (window.RusiIcons) RusiIcons.replace(btnSpeaker);

        if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(testPhrase);
          u.lang = "ru-RU";
          u.rate = 0.9;
          if (typeof pickVoice === "function") {
            const v = pickVoice("ru-RU");
            if (v) u.voice = v;
          }
          u.onend = () => {
            isSpeakerPlaying = false;
            btnSpeaker.innerHTML = `${icon("check", 14)} <span>Phát lại</span>`;
            speakerBadge.className = "cbt-status-pill-check ok";
            speakerBadge.innerHTML = `${icon("check-circle-correct", 13)} Âm thanh tốt ✓`;
            if (window.RusiIcons) RusiIcons.replace(host);
          };
          u.onerror = () => {
            isSpeakerPlaying = false;
            btnSpeaker.innerHTML = `${icon("play-control", 14)} <span>Phát lại</span>`;
            speakerBadge.className = "cbt-status-pill-check ok";
            speakerBadge.innerHTML = `${icon("check-circle-correct", 13)} Âm thanh sẵn sàng ✓`;
            if (window.RusiIcons) RusiIcons.replace(host);
          };
          window.speechSynthesis.speak(u);
        } else {
          setTimeout(() => {
            isSpeakerPlaying = false;
            speakerBadge.className = "cbt-status-pill-check ok";
            speakerBadge.innerHTML = `${icon("check-circle-correct", 13)} Âm thanh sẵn sàng ✓`;
            if (window.RusiIcons) RusiIcons.replace(host);
          }, 1500);
        }
      };
    }

    // 4. Microphone Test Event (Web Audio Analyser)
    const btnMic = el("#btnTestMic");
    const micBadge = el("#micStatusBadge");

    if (btnMic) {
      btnMic.onclick = async () => {
        if (activeMicStream) {
          cleanupHardwareTests();
          btnMic.innerHTML = `${icon("mic-speaking", 14)} <span>Kiểm tra lại Micro</span>`;
          if (window.RusiIcons) RusiIcons.replace(btnMic);
          return;
        }

        try {
          btnMic.innerHTML = `${icon("refresh-cw", 14)} <span>Đang kết nối...</span>`;
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          activeMicStream = stream;

          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            activeAudioCtx = new AudioContextClass();
            const source = activeAudioCtx.createMediaStreamSource(stream);
            const analyser = activeAudioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            btnMic.classList.add("active");
            btnMic.innerHTML = `${icon("mic-speaking", 14)} <span>Đang lắng nghe...</span>`;

            let hasDetectedVoice = false;
            const updateMeter = () => {
              if (!activeMicStream) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              const pct = Math.min(100, Math.round((avg / 128) * 100));

              if (pct > 15 && !hasDetectedVoice) {
                hasDetectedVoice = true;
                micBadge.className = "cbt-status-pill-check ok";
                micBadge.innerHTML = `${icon("check-circle-correct", 13)} Micro hoạt động tốt ✓`;
                if (window.RusiIcons) RusiIcons.replace(micBadge);
              }

              micAnimFrame = requestAnimationFrame(updateMeter);
            };
            updateMeter();
          } else {
            micBadge.className = "cbt-status-pill-check ok";
            micBadge.innerHTML = `${icon("check-circle-correct", 13)} Micro sẵn sàng ✓`;
          }
        } catch (err) {
          console.warn("[TRKI Mic Test] Không thể truy cập mic:", err);
          micBadge.className = "cbt-status-pill-check idle";
          micBadge.innerHTML = "Không tìm thấy mic (Có thể bỏ qua)";
          btnMic.innerHTML = `${icon("mic-speaking", 14)} <span>Thử lại Micro</span>`;
        }
        if (window.RusiIcons) RusiIcons.replace(host);
      };
    }

    // 5. Nút Bắt đầu làm bài -> Chuyển sang CBT Exam Room chính thức
    el("#btnStartExamNow").onclick = () => {
      cleanupHardwareTests();
      startTest(currentTest, activePartId, examMode);
    };

    // 6. Luyện tập: chọn phần muốn luyện (dùng lại cơ chế thi từng phần qua activePartId)
    host.querySelectorAll(".cbt-part-pick").forEach((cb) => {
      cb.onchange = () => {
        const ids = Array.from(host.querySelectorAll(".cbt-part-pick:checked")).map((x) => x.dataset.partId);
        if (!ids.length) {
          cb.checked = true;
          toast("Cần chọn ít nhất 1 phần để luyện tập.");
          return;
        }
        cleanupHardwareTests();
        openExamBriefing(currentTest, ids.length === (currentTest.parts || []).length ? null : ids.join(","), "practice");
      };
    });
  };

  /* =====================================================================
   * GIAI ĐOẠN 2: BẮT ĐẦU TÍNH GIỜ & KHỞI TẠO PHIÊN THI (START TEST)
   * ===================================================================== */
  const startTest = async (test = null, partId = null, mode = "exam") => {
    if (!requireExamLogin()) return;
    if (test) currentTest = test;
    activePartId = partId;
    examMode = mode || "exam";

    cleanupHardwareTests();
    document.body.classList.add("in-workspace", "cbt-fullscreen-mode");
    started = true;
    tabSwitches = 0;

    // Bug #1 fix: Nạp câu hỏi từ trki_question_bank nếu test có code trki_zlat_*
    if (currentTest && currentTest.code && currentTest.code.startsWith("trki_zlat")) {
      await loadQBankIntoTest(currentTest);
    }

    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);
    const storageKey = getExamStorageKey();

    try {
      sessionStorage.setItem("trki_active_exam_id", currentTest.id);
      sessionStorage.setItem("trki_active_part_id", isSubset ? selectedPartList.join(",") : "full");
      sessionStorage.setItem("trki_exam_mode", examMode);
    } catch(e) {}

    const activeParts = isSubset
      ? (currentTest.parts || []).filter(p => selectedPartList.includes(p.id))
      : (currentTest.parts || []);
    const examDurationMin = isSubset
      ? activeParts.reduce((acc, p) => acc + (p.durationMin || 15), 0)
      : (currentTest.duration_min || currentTest.durationMin || (activeParts.length ? activeParts.reduce((acc, p) => acc + (p.durationMin || p.duration_min || 0), 0) : 0) || 60);

    // Timestamp chống reload
    const now = Date.now();
    let storedEndTime = 0;
    try { storedEndTime = parseInt(sessionStorage.getItem(storageKey + "_endTime") || "0", 10); } catch(e) {}
    if (!storedEndTime || storedEndTime <= now) {
      storedEndTime = now + examDurationMin * 60 * 1000;
      try { sessionStorage.setItem(storageKey + "_endTime", String(storedEndTime)); } catch(e) {}
    }
    timeLeft = Math.max(0, Math.floor((storedEndTime - now) / 1000));
    try {
      if (!sessionStorage.getItem(storageKey + "_startTime")) sessionStorage.setItem(storageKey + "_startTime", String(now));
    } catch(e) {}

    // Khôi phục câu trả lời nếu đã lưu
    answers = {};
    try {
      const savedAnswers = sessionStorage.getItem(storageKey + "_answers");
      if (savedAnswers) answers = JSON.parse(savedAnswers);
    } catch(e) {
      answers = {};
    }

    // Khôi phục cờ đánh dấu
    flagged = {};
    try {
      const savedFlagged = sessionStorage.getItem(storageKey + "_flagged");
      if (savedFlagged) flagged = JSON.parse(savedFlagged);
    } catch(e) {
      flagged = {};
    }

    // Cơ chế đáp án ngẫu nhiên
    const savedAnswers = sessionStorage.getItem(storageKey + "_answers");
    if (!savedAnswers || Object.keys(answers).length === 0) {
      sessionOptionOrders = {};
      try { sessionStorage.removeItem(storageKey + "_opt_orders"); } catch(e) {}
    } else {
      try {
        const savedOrders = sessionStorage.getItem(storageKey + "_opt_orders");
        sessionOptionOrders = savedOrders ? JSON.parse(savedOrders) : {};
      } catch(e) {
        sessionOptionOrders = {};
      }
    }

    renderTestRoom();

    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }
    if (examMode === "exam") {
      visibilityHandler = () => {
        if (!started) return;
        if (document.hidden) {
          tabSwitches++;
          showAntiCheatAlert();
        }
      };
      document.addEventListener("visibilitychange", visibilityHandler);
    }

    if (timer) clearInterval(timer);
    if (examMode === "exam") {
      timer = setInterval(() => {
        const remainingMs = storedEndTime - Date.now();
        timeLeft = Math.max(0, Math.floor(remainingMs / 1000));
        const t = el("#timerVal");
        if (t) {
          t.textContent = fmt(timeLeft);
          const timerBox = el("#cbtTimerBox");
          if (timerBox) timerBox.classList.toggle("warn", timeLeft < 300);
        }
        if (timeLeft <= 0) {
          clearInterval(timer);
          toast("Hết thời gian làm bài! Đang nộp bài...");
          submit();
        }
      }, 1000);
    }
  };

  const showAntiCheatAlert = () => {
    let alertBox = document.getElementById("antiCheatModal");
    if (!alertBox) {
      alertBox = document.createElement("div");
      alertBox.id = "antiCheatModal";
      alertBox.className = "anticheat-modal";
      document.body.appendChild(alertBox);
    }
    const left = 3 - tabSwitches;
    alertBox.innerHTML = `
      <div class="anticheat-modal-box">
        <div style="margin-bottom:12px;color:var(--red)">${icon("shield-anti-cheat", 48)}</div>
        <h3>CẢNH BÁO VI PHẠM QUY CHẾ THI</h3>
        <p style="margin:12px 0;line-height:1.6">
          Hệ thống phát hiện bạn vừa rời khỏi màn hình bài thi (chuyển tab hoặc thu nhỏ trình duyệt).
          <br>Số lần vi phạm: <b style="color:var(--red)">${tabSwitches}/3 lần</b>.
        </p>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:16px">
          ${left > 0 ? `Nếu chuyển tab thêm ${left} lần nữa, bài thi sẽ bị tự động hủy và nộp ngay lập tức!` : "Bạn đã vi phạm quá 3 lần. Hệ thống tự động nộp bài thi ngay bây giờ!"}
        </p>
        <button class="btn btn-primary" id="ackAntiCheat" style="min-width:160px">
          ${left > 0 ? "Tôi cam kết tiếp tục làm bài" : "Xem kết quả"}
        </button>
      </div>
    `;
    document.getElementById("ackAntiCheat").onclick = () => {
      alertBox.remove();
      if (tabSwitches >= 3) {
        submit();
      }
    };
  };

  /* =====================================================================
   * GIAI ĐOẠN 3: PHÒNG THI CHUẨN CBT (SPLIT-PANE 4/6, RESIZER, BOTTOM BAR & DRAWER)
   * ===================================================================== */
  const renderTestRoom = () => {
    runWorkspaceTeardown();
    if (!currentTest || !Array.isArray(currentTest.parts)) {
      console.warn("Đề thi thiếu dữ liệu parts hợp lệ, quay về danh sách.");
      renderHub();
      return;
    }

    const isPractice = (examMode === "practice");
    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);
    const storageKey = getExamStorageKey();

    const activeParts = isSubset
      ? currentTest.parts.filter(p => selectedPartList.includes(p.id))
      : currentTest.parts;

    // Tính chỉ số câu hỏi toàn cục theo toàn bộ đề thi (đồng bộ chính xác với RPC chấm thi server-side)
    const partQuestionOffsets = new Map();
    let runningGlobalIdx = 0;
    (currentTest.parts || []).forEach((p) => {
      partQuestionOffsets.set(p.id, runningGlobalIdx);
      if (Array.isArray(p.questions)) runningGlobalIdx += p.questions.length;
    });

    // Xây dựng mảng tuần tự tất cả câu hỏi của đề thi
    const examItems = [];
    activeParts.forEach((part, pi) => {
      const baseGlobalIdx = partQuestionOffsets.get(part.id) || 0;
      if (Array.isArray(part.questions) && part.questions.length > 0) {
        part.questions.forEach((q, qi) => {
          examItems.push({
            type: "question",
            id: part.id + "_" + qi,
            partId: part.id,
            partIndex: pi,
            part: part,
            qi: qi,
            globalQIdx: baseGlobalIdx + qi,
            q: q
          });
        });
      } else if (Array.isArray(part.writing_tasks) && part.writing_tasks.length > 0) {
        part.writing_tasks.forEach((wt, wti) => {
          examItems.push({
            type: "writing",
            id: "write_" + part.id + "_" + wti,
            partId: part.id,
            partIndex: pi,
            part: part,
            qi: wti,
            wt: wt
          });
        });
      } else if (Array.isArray(part.speaking_tasks) && part.speaking_tasks.length > 0) {
        part.speaking_tasks.forEach((st, sti) => {
          examItems.push({
            type: "speaking",
            id: "speak_" + part.id + "_" + sti,
            partId: part.id,
            partIndex: pi,
            part: part,
            qi: sti,
            st: st
          });
        });
      }
    });

    const totalQuestions = examItems.length;
    if (totalQuestions === 0) {
      host.innerHTML = `
        <div style="padding:60px 24px;text-align:center;max-width:480px;margin:0 auto">
          <div style="margin-bottom:16px;color:var(--muted)">${icon("inbox", 48)}</div>
          <h3 style="margin-bottom:8px">Chưa có câu hỏi cho đề thi này</h3>
          <p style="color:var(--muted);margin-bottom:20px">Ngân hàng câu hỏi đang được cập nhật. Vui lòng thử lại sau ít phút.</p>
          <button class="btn btn-primary" id="btnBackFromEmpty" style="display:inline-flex;align-items:center;gap:6px;margin:0 auto">${icon("arrow-left", 16)} Quay lại danh sách đề</button>
        </div>
      `;
      document.body.classList.remove("in-workspace", "cbt-fullscreen-mode");
      started = false;
      const btn = host.querySelector("#btnBackFromEmpty");
      if (btn) btn.onclick = () => renderHub();
      return;
    }

    // Chỉ số câu hỏi hiện tại (bắt đầu từ câu đầu tiên chưa làm, hoặc câu 0)
    let currentItemIndex = 0;
    const firstUndone = examItems.findIndex(item => answers[item.id] === undefined);
    if (firstUndone !== -1) currentItemIndex = firstUndone;

    // Tỷ lệ độ rộng cột trái mặc định (40% theo yêu cầu của học viên)
    let splitterPct = 40;
    try {
      const savedPct = parseFloat(localStorage.getItem("trki_splitter_pct"));
      if (savedPct >= 25 && savedPct <= 75) splitterPct = savedPct;
    } catch(_) {}

    // RENDER KHUNG GIAO DIỆN CBT PORTAL CHUẨN QUỐC TẾ
    host.innerHTML = `
      <div class="cbt-app-portal" id="cbtPortalRoot">
        <!-- TẦNG 1: TOP BAR DÀI TOÀN MÀN HÌNH THAY CHO HEADER TRANG WEB -->
        <header class="cbt-portal-header" role="banner">
          <div class="cbt-header-left">
            <button type="button" class="cbt-btn-icon" id="btnExitTest" title="Rời khỏi phòng thi" aria-label="Rời khỏi phòng thi">
              ${icon("arrow-left", 18)}
            </button>
            <div class="cbt-header-info">
              <div class="cbt-header-title-row">
                <span class="cbt-level-pill">ТРКИ-${currentTest.level}</span>
                <span class="cbt-test-name-text" title="${esc(currentTest.title)}">${esc(currentTest.title)}</span>
              </div>
              <span class="cbt-subtest-label" id="cbtTopSubtestName">Phần 1</span>
            </div>
          </div>

          <div class="cbt-header-center">
            ${isPractice ? `
              <div class="cbt-clock-pill cbt-practice-pill" style="color:var(--primary);font-size:0.95rem" title="Luyện tập tự do" aria-label="Luyện tập tự do">
                ${icon("sparkles-clean", 16)} <span>Luyện tập tự do</span>
              </div>
            ` : `
              <div class="cbt-clock-pill" id="cbtTimerBox" title="Thời gian còn lại của bài thi">
                ${icon("timer-clock", 18)} <span id="timerVal">${fmt(timeLeft)}</span>
              </div>
            `}
          </div>

          <div class="cbt-header-right">
            <div class="cbt-progress-badge" id="cbtProgressPill">
              Câu <b id="cbtCurrentNum">1</b> / ${totalQuestions}
            </div>
            <button type="button" class="cbt-btn-fullscreen" id="btnToggleFullScreen" title="Toàn màn hình">
              ${icon("maximize", 15)} <span>Toàn màn hình</span>
            </button>
            <button type="button" class="cbt-btn-submit-header" id="btnSubmitTop" title="${isPractice ? 'Hoàn thành bài luyện' : 'Nộp bài thi'}">
              ${icon("check-circle", 15)} <span>${isPractice ? 'Hoàn thành' : 'Nộp bài'}</span>
            </button>
          </div>
        </header>

        <!-- TẦNG 2: SPLIT-PANE 2 CỘT CÓ THANH RESIZER KÉO DI CHUYỂN ĐƯỢC 4/6 -->
        <div class="cbt-portal-content">
          <div class="cbt-workspace-split" id="cbtWorkspaceSplit">
            <!-- CỘT TRÁI: NGỮ CẢNH / BÀI ĐỌC / AUDIO / TÓM TẮT PHÂN MÔN -->
            <section class="cbt-split-left" id="cbtSplitLeft" style="width: ${splitterPct}%" aria-label="Tài liệu ngữ cảnh bài thi">
              <div id="cbtSplitLeftContent"></div>
            </section>

            <!-- THANH RESIZER ĐIỀU CHỈNH ĐỘ RỘNG 4/6 -->
            <div class="cbt-split-gutter" id="cbtSplitGutter" role="separator" aria-orientation="vertical" title="Kéo chuột sang trái hoặc phải để điều chỉnh tỷ lệ hiển thị">
              <div class="cbt-gutter-handle"></div>
            </div>

            <!-- CỘT PHẢI: CÂU HỎI & CÁC LỰA CHỌN ĐÁP ÁN -->
            <section class="cbt-split-right" id="cbtSplitRight" aria-label="Nội dung câu hỏi và đáp án">
              <div class="cbt-question-box-wrap" id="cbtRightQuestionBox"></div>
            </section>
          </div>
        </div>

        <!-- TẦNG 3: BOTTOM NAVIGATION BAR CỐ ĐỊNH Ở ĐÁY -->
        <footer class="cbt-portal-footer" role="navigation" aria-label="Điều hướng bài thi">
          <div class="cbt-footer-nav-left">
            <button type="button" class="cbt-btn-nav-step" id="btnPrevQ" title="Câu hỏi trước (Phím ←)">
              ${icon("chevron-left", 16)} <span>Câu trước</span>
            </button>
          </div>

          <div class="cbt-footer-nav-center">
            <button type="button" class="cbt-btn-drawer-trigger" id="btnOpenMatrixDrawer" title="Mở danh sách câu hỏi (Phím M)">
              ${icon("list-tasks", 16)} <span class="drawer-text">Bảng câu hỏi</span> (<span id="cbtDrawerAnsweredCount" class="cbt-drawer-count-badge">0</span>/${totalQuestions}) <span class="cbt-drawer-caret">▴</span>
            </button>
          </div>

          <div class="cbt-footer-nav-right">
            <button type="button" class="cbt-btn-nav-step cbt-btn-next" id="btnNextQ" title="Câu hỏi kế tiếp (Phím →)">
              <span>Câu sau</span> ${icon("chevron-right", 16)}
            </button>
          </div>
        </footer>

        <!-- DRAWER MA TRẬN BẢNG CÂU HỎI TRƯỢT LÊN TỪ ĐÁY -->
        <div class="cbt-matrix-backdrop-mask" id="cbtMatrixBackdrop">
          <div class="cbt-matrix-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="matrixDrawerTitle">
            <div class="cbt-matrix-head-line">
              <div class="cbt-matrix-title-txt" id="matrixDrawerTitle">
                ${icon("list-tasks", 20)} <span>Danh sách câu hỏi & Trạng thái bài thi</span>
              </div>
              <button type="button" class="cbt-matrix-close-icon-btn" id="btnCloseMatrixDrawer" title="Đóng bảng câu hỏi">
                ${icon("x", 18)}
              </button>
            </div>

            <div class="cbt-matrix-legend-strip">
              <div class="cbt-legend-tags-wrap">
                <span><span class="cbt-status-dot-circle unanswered"></span> Chưa làm</span>
                <span><span class="cbt-status-dot-circle answered"></span> Đã trả lời</span>
                <span><span class="cbt-status-dot-circle flagged"></span> Gắn cờ</span>
                <span><span class="cbt-status-dot-circle current"></span> Đang làm</span>
              </div>

              <div class="cbt-filter-buttons-row" role="tablist">
                <button type="button" class="cbt-filter-badge-btn active" data-matrix-filter="all">Tất cả (${totalQuestions})</button>
                <button type="button" class="cbt-filter-badge-btn" data-matrix-filter="answered">Đã làm (<span id="countDoneDrawer">0</span>)</button>
                <button type="button" class="cbt-filter-badge-btn" data-matrix-filter="unanswered">Chưa làm (<span id="countUndoneDrawer">${totalQuestions}</span>)</button>
                <button type="button" class="cbt-filter-badge-btn" data-matrix-filter="flagged">Gắn cờ (<span id="countFlagDrawer">0</span>)</button>
              </div>
            </div>

            <div class="cbt-matrix-scroll-body" id="cbtMatrixBody"></div>
          </div>
        </div>
      </div>
    `;

    // Helper format thời gian audio mm:ss
    const fmtAudioTime = (s) => {
      if (!s || isNaN(s) || s < 0) return "00:00";
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m < 10 ? '0' : ''}${m}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // Quản lý Audio cho phần Nghe hiểu (Аудирование)
    let activeCbtAudio = null;
    let isCbtAudioPlaying = false;
    let cbtAudioSpeed = 1.0;

    const stopCbtAudio = () => {
      if (activeCbtAudio) {
        try {
          activeCbtAudio.pause();
          activeCbtAudio.currentTime = 0;
        } catch(_) {}
        activeCbtAudio = null;
      }
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch(_) {}
      }
      isCbtAudioPlaying = false;
      const playBtn = el("#btnPlayCbtAudio");
      if (playBtn) {
        playBtn.classList.remove("is-playing");
        playBtn.innerHTML = icon("play-control", 20);
        if (window.RusiIcons) RusiIcons.replace(playBtn);
      }
    };

    // Tạm dừng: giữ nguyên vị trí phát để bấm Play tiếp tục từ chỗ cũ.
    // Giọng đọc dự phòng (speechSynthesis) không resume ổn định nên vẫn dừng hẳn.
    const pauseCbtAudio = () => {
      if (!activeCbtAudio) {
        stopCbtAudio();
        return;
      }
      try { activeCbtAudio.pause(); } catch(_) {}
      isCbtAudioPlaying = false;
      const playBtn = el("#btnPlayCbtAudio");
      if (playBtn) {
        playBtn.classList.remove("is-playing");
        playBtn.innerHTML = icon("play-control", 20);
        if (window.RusiIcons) RusiIcons.replace(playBtn);
      }
    };

    // CẬP NHẬT GIAO DIỆN CÂU HỎI & NGỮ CẢNH THEO INDEX
    let currentRenderedPartId = null;

    // Helper render Lộ trình bài thi & Mini Palette khi ở Phần Ngữ pháp & Từ vựng (Focus Mode)
    const renderLeftPaneGrammarRoadmap = (curItem) => {
      const leftHost = el("#cbtSplitLeftContent");
      if (!leftHost) return;

      const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== "").length;

      const roadmapPartsHtml = activeParts.map((p, pIdx) => {
        const isActive = (pIdx === curItem.partIndex);
        const pItems = examItems.filter(it => it.partIndex === pIdx);
        const pDone = pItems.filter(it => answers[it.id] !== undefined && answers[it.id] !== "").length;
        return `
          <div class="cbt-roadmap-part-row ${isActive ? 'active' : ''}">
            <div class="cbt-roadmap-part-num">${pIdx + 1}</div>
            <div class="cbt-roadmap-part-meta">
              <span class="cbt-roadmap-part-name">${esc(p.vi || p.name || `Phần ${pIdx + 1}`)}</span>
              <span class="cbt-roadmap-part-sub">${pDone}/${pItems.length} câu · ${p.durationMin || 15}p</span>
            </div>
            ${isActive ? '<span class="cbt-part-current-dot"></span>' : ''}
          </div>
        `;
      }).join("");

      const miniChipsHtml = examItems.map((it, idx) => {
        const isDone = (answers[it.id] !== undefined && answers[it.id] !== "");
        const isFl = !!flagged[it.id];
        const isCur = (idx === currentItemIndex);
        let chipCls = "cbt-mini-chip";
        if (isDone) chipCls += " answered";
        if (isFl) chipCls += " flagged";
        if (isCur) chipCls += " current";
        return `<button type="button" class="${chipCls}" data-jump-mini="${idx}" title="Câu ${idx + 1}">${idx + 1}</button>`;
      }).join("");

      leftHost.innerHTML = `
        <div class="cbt-grammar-roadmap">
          <div class="cbt-left-header-row">
            <span class="cbt-left-badge-tag">${icon("layers", 13)} Lộ trình khảo thí</span>
            <span class="cbt-subtest-stat">Phần ${curItem.partIndex + 1}/${activeParts.length}</span>
          </div>

          <div class="cbt-roadmap-subtests-list">
            ${roadmapPartsHtml}
          </div>

          <!-- Bảng chọn câu hỏi nhanh Mini Palette -->
          <div class="cbt-nav-mini-palette">
            <div class="cbt-mini-palette-head">
              <span>Bảng câu hỏi</span>
              <span class="cbt-mini-answered-count" id="cbtMiniAnsweredCount">${answeredCount}/${totalQuestions}</span>
            </div>
            <div class="cbt-mini-chips-grid">
              ${miniChipsHtml}
            </div>
          </div>

          <!-- Phím tắt bàn phím tiện ích -->
          <div class="cbt-shortcuts-card">
            <div class="cbt-shortcuts-head">
              ${icon("sparkles-clean", 13)} <span>Phím tắt thao tác nhanh:</span>
            </div>
            <div class="cbt-shortcuts-list">
              <div><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> : Chọn nhanh đáp án</div>
              <div><kbd>←</kbd> <kbd>→</kbd> : Câu trước / Câu sau</div>
              <div><kbd>F</kbd> : Đặt cờ câu hỏi</div>
              <div><kbd>M</kbd> : Mở bảng ma trận</div>
            </div>
          </div>
        </div>
      `;

      leftHost.querySelectorAll("[data-jump-mini]").forEach(btn => {
        btn.onclick = () => {
          const targetIdx = parseInt(btn.dataset.jumpMini, 10);
          renderQuestionAt(targetIdx);
        };
      });
    };

    const renderQuestionAt = (index) => {
      if (index < 0) index = 0;
      if (index >= totalQuestions) index = totalQuestions - 1;
      currentItemIndex = index;

      const item = examItems[currentItemIndex];
      const part = item.part;
      const id = item.id;
      const isFlag = !!flagged[id];

      // 1. Cập nhật Top bar
      const topSubtest = el("#cbtTopSubtestName");
      if (topSubtest) {
        topSubtest.textContent = `Phần ${item.partIndex + 1}: ${part.vi || part.name}`;
      }
      const curNum = el("#cbtCurrentNum");
      if (curNum) curNum.textContent = String(currentItemIndex + 1);

      // 2. Cập nhật Bottom bar
      const btnPrev = el("#btnPrevQ");
      if (btnPrev) btnPrev.disabled = (currentItemIndex === 0);

      const btnNext = el("#btnNextQ");
      if (btnNext) {
        if (currentItemIndex === totalQuestions - 1) {
          btnNext.innerHTML = `<span>${isPractice ? 'Hoàn thành' : 'Nộp bài'}</span> ${icon("check-circle", 16)}`;
          btnNext.classList.add("cbt-btn-finish");
        } else {
          btnNext.innerHTML = `<span>Câu sau</span> ${icon("chevron-right", 16)}`;
          btnNext.classList.remove("cbt-btn-finish");
        }
      }

      // 3. Phân biệt chế độ Focus Mode (Part 1 Grammar) vs Split Mode (Reading / Audio / Writing / Speaking)
      const qPassage = item.q && (item.q.passage || item.q.reading_passage);
      const isReading = !!(part.text || qPassage);
      const isListening = !!(part.audio_url || part.lines);
      const isWriting = !!part.writing_tasks;
      const isSpeaking = !!part.speaking_tasks;
      const hasContext = isReading || isListening || isWriting || isSpeaking;

      const workspaceSplit = el("#cbtWorkspaceSplit");
      if (workspaceSplit) {
        if (hasContext) {
          workspaceSplit.classList.add("cbt-mode-split");
          workspaceSplit.classList.remove("cbt-mode-focus");
        } else {
          workspaceSplit.classList.add("cbt-mode-focus");
          workspaceSplit.classList.remove("cbt-mode-split");
        }
      }

      // 4. Render Cột Trái (Left Pane)
      const leftHost = el("#cbtSplitLeftContent");
      if (leftHost) {
        if (!hasContext) {
          // Ngữ pháp & Từ vựng: Hiển thị Live Exam Roadmap & Mini Question Palette
          if (currentRenderedPartId !== part.id) stopCbtAudio();
          renderLeftPaneGrammarRoadmap(item);
          currentRenderedPartId = part.id;
        } else if (currentRenderedPartId !== part.id) {
          stopCbtAudio();
          currentRenderedPartId = part.id;

          if (isReading) {
            // Phần ĐỌC HIỂU (ЧТЕНИЕ)
            const pRu = (part.text && (part.text.ru || part.text)) || qPassage || "";
            const pVi = (part.text && part.text.vi) || "";
            const wordCount = pRu.trim() ? pRu.trim().split(/\s+/).length : 0;

            leftHost.innerHTML = `
              <div class="cbt-left-header-row">
                <span class="cbt-left-badge-tag">${icon("book-open", 13)} Текст для чтения · Đọc hiểu</span>
                <div class="cbt-passage-toolbar">
                  <span class="cbt-subtest-stat">${wordCount} từ</span>
                  <div class="cbt-font-stepper">
                    <button type="button" class="cbt-tool-btn" id="btnPassageFontDec" title="Thu nhỏ cỡ chữ">A⁻</button>
                    <button type="button" class="cbt-tool-btn" id="btnPassageFontInc" title="Phóng to cỡ chữ">A⁺</button>
                  </div>
                  ${pVi ? `
                    <button type="button" class="cbt-btn-trans" id="btnPassageTrans" title="Bản dịch tiếng Việt">
                      ${icon("globe", 13)} <span>Bản dịch</span>
                    </button>
                  ` : ''}
                </div>
              </div>
              <div class="cbt-reading-passage-text ru" id="cbtPassageText">${esc(pRu)}</div>
              ${pVi ? `
                <div class="reading-vi-trans hidden" id="cbtPassageViTrans">
                  <div class="cbt-trans-header">${icon("check-circle", 14)} Bản dịch tiếng Việt đối chiếu</div>
                  <div class="cbt-trans-body">${esc(pVi)}</div>
                </div>
              ` : ''}
            `;

            const pText = el("#cbtPassageText");
            const btnInc = el("#btnPassageFontInc");
            const btnDec = el("#btnPassageFontDec");
            const btnTrans = el("#btnPassageTrans");

            if (btnInc && pText) {
              btnInc.onclick = () => {
                const cur = parseFloat(window.getComputedStyle(pText).fontSize) || 17;
                if (cur < 26) pText.style.fontSize = (cur + 2) + "px";
              };
            }
            if (btnDec && pText) {
              btnDec.onclick = () => {
                const cur = parseFloat(window.getComputedStyle(pText).fontSize) || 17;
                if (cur > 13) pText.style.fontSize = (cur - 2) + "px";
              };
            }
            if (btnTrans) {
              btnTrans.onclick = () => {
                const transBox = el("#cbtPassageViTrans");
                if (transBox) {
                  transBox.classList.toggle("hidden");
                  btnTrans.classList.toggle("active", !transBox.classList.contains("hidden"));
                }
              };
            }
          } else if (isListening) {
            // Phần NGHE HIỂU (АУДИРОВАНИЕ)
            leftHost.innerHTML = `
              <div class="cbt-left-header-row">
                <span class="cbt-left-badge-tag">${icon("headphones", 13)} Аудирование · Nghe hiểu</span>
                <span class="cbt-audio-status-pill">${icon("shield-check", 12)} Giọng bản ngữ</span>
              </div>

              <div class="cbt-audio-console-card">
                <div class="cbt-audio-main-row">
                  <button type="button" class="cbt-btn-play-hero" id="btnPlayCbtAudio" title="Phát / Dừng Audio">
                    ${icon("play-control", 20)}
                  </button>
                  <div class="cbt-audio-track-wrap">
                    <div class="cbt-audio-time-row">
                      <span class="cbt-audio-title">Đoạn hội thoại tiếng Nga</span>
                      <span class="cbt-audio-timer-digits" id="cbtAudioTimerDigits">00:00 / 00:00</span>
                    </div>
                    <div class="cbt-audio-scrubber-bar" id="cbtAudioScrubber" title="Nhấp chuột để tua nhanh">
                      <div class="cbt-audio-progress-fill" id="cbtAudioProgressFill" style="width: 0%"></div>
                    </div>
                  </div>
                  <button type="button" class="cbt-btn-speed-toggle" id="btnCbtAudioSpeed" title="Tốc độ phát">1.0x</button>
                </div>
              </div>

              ${(part.lines && Array.isArray(part.lines) && part.lines.length) ? `
                <div class="cbt-dialogue-transcript-card">
                  <div class="cbt-dialogue-head">
                    <span>${icon("message-square", 14)} Lời thoại hội thoại</span>
                    <button type="button" class="cbt-btn-toggle-subtitles" id="btnToggleSubtitles">
                      ${icon("eye", 13)} <span>Xem lời thoại</span>
                    </button>
                  </div>
                  <div class="cbt-dialogue-lines-list hidden" id="cbtDialogueLinesList">
                    ${part.lines.map((l, lIdx) => `
                      <div class="cbt-dialogue-bubble">
                        <div class="cbt-dialogue-speaker">${esc(l.who || `Người ${lIdx + 1}`)}:</div>
                        <div class="cbt-dialogue-text ru">${esc(l.ru || "")}</div>
                        ${l.vi ? `<div class="cbt-dialogue-vi">${esc(l.vi)}</div>` : ''}
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}
            `;

            const playBtn = el("#btnPlayCbtAudio");
            const scrubber = el("#cbtAudioScrubber");
            const fill = el("#cbtAudioProgressFill");
            const timerDigits = el("#cbtAudioTimerDigits");
            const speedBtn = el("#btnCbtAudioSpeed");
            const toggleSubs = el("#btnToggleSubtitles");
            const linesList = el("#cbtDialogueLinesList");

            if (toggleSubs && linesList) {
              toggleSubs.onclick = () => {
                linesList.classList.toggle("hidden");
                toggleSubs.innerHTML = linesList.classList.contains("hidden")
                  ? `${icon("eye", 13)} <span>Xem lời thoại</span>`
                  : `${icon("eye-off", 13)} <span>Ẩn lời thoại</span>`;
                if (window.RusiIcons) RusiIcons.replace(toggleSubs);
              };
            }

            if (speedBtn) {
              speedBtn.onclick = () => {
                if (cbtAudioSpeed === 1.0) cbtAudioSpeed = 0.85;
                else if (cbtAudioSpeed === 0.85) cbtAudioSpeed = 1.15;
                else cbtAudioSpeed = 1.0;
                speedBtn.textContent = cbtAudioSpeed + "x";
                if (activeCbtAudio) activeCbtAudio.playbackRate = cbtAudioSpeed;
              };
            }

            if (playBtn) {
              playBtn.onclick = () => {
                if (isCbtAudioPlaying) {
                  pauseCbtAudio();
                  return;
                }

                if (part.audio_url) {
                  try {
                    isCbtAudioPlaying = true;
                    playBtn.classList.add("is-playing");
                    playBtn.innerHTML = icon("pause-control", 20);
                    if (window.RusiIcons) RusiIcons.replace(playBtn);

                    if (!activeCbtAudio) {
                      activeCbtAudio = new Audio(part.audio_url);
                      activeCbtAudio.playbackRate = cbtAudioSpeed;
                      activeCbtAudio.ontimeupdate = () => {
                        if (!activeCbtAudio) return;
                        const cur = activeCbtAudio.currentTime || 0;
                        const dur = activeCbtAudio.duration || 0;
                        if (fill && dur > 0) fill.style.width = ((cur / dur) * 100) + "%";
                        if (timerDigits) timerDigits.textContent = `${fmtAudioTime(cur)} / ${dur > 0 ? fmtAudioTime(dur) : '00:00'}`;
                      };
                      activeCbtAudio.onended = () => {
                        stopCbtAudio();
                      };
                    }
                    activeCbtAudio.play().catch(() => fallbackSpeech());
                  } catch(_) {
                    fallbackSpeech();
                  }
                } else {
                  fallbackSpeech();
                }

                function fallbackSpeech() {
                  const speechText = (part.lines && Array.isArray(part.lines))
                    ? part.lines.map(l => l.ru || "").join(" ")
                    : "Здравствуйте, слушайте внимательно диалог.";
                  isCbtAudioPlaying = true;
                  playBtn.classList.add("is-playing");
                  playBtn.innerHTML = icon("pause-control", 20);
                  if (window.RusiIcons) RusiIcons.replace(playBtn);

                  if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(speechText);
                    u.lang = "ru-RU";
                    u.rate = cbtAudioSpeed * 0.9;
                    u.onend = () => {
                      stopCbtAudio();
                    };
                    window.speechSynthesis.speak(u);
                  }
                }
              };
            }

            if (scrubber) {
              scrubber.onclick = (ev) => {
                if (activeCbtAudio && activeCbtAudio.duration) {
                  const rect = scrubber.getBoundingClientRect();
                  const pos = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                  activeCbtAudio.currentTime = pos * activeCbtAudio.duration;
                }
              };
            }
          } else if (isWriting) {
            // Phần VIẾT (ПИСЬМО)
            leftHost.innerHTML = `
              <div class="cbt-left-header-row">
                <span class="cbt-left-badge-tag">${icon("pen-tool", 13)} Субтест Письмо · Kỹ năng viết</span>
              </div>
              <div style="background:var(--surface);border-radius:12px;padding:18px;border:1px solid var(--border)">
                <h4 style="font-weight:800;font-size:1.02rem;color:var(--text);margin-bottom:8px">Hướng dẫn làm bài thi Viết:</h4>
                <p style="font-size:0.88rem;color:var(--muted);line-height:1.6;margin-bottom:10px">
                  Học viên đọc kỹ yêu cầu của từng chủ đề ở cột bên phải và nhập trực tiếp văn bản tiếng Nga vào ô soạn thảo.
                </p>
                <div style="font-size:0.82rem;color:var(--primary);font-weight:700">
                  Thời lượng phần thi: ${part.durationMin || 25} phút
                </div>
              </div>
            `;
          } else if (isSpeaking) {
            // Phần NÓI (ГОВОРЕНИЕ)
            leftHost.innerHTML = `
              <div class="cbt-left-header-row">
                <span class="cbt-left-badge-tag">${icon("mic-speaking", 13)} Субтест Говорение · Kỹ năng nói</span>
              </div>
              <div style="background:var(--surface);border-radius:12px;padding:18px;border:1px solid var(--border)">
                <h4 style="font-weight:800;font-size:1.02rem;color:var(--text);margin-bottom:8px">Hướng dẫn làm bài thi Nói:</h4>
                <p style="font-size:0.88rem;color:var(--muted);line-height:1.6;margin-bottom:10px">
                  Nghe câu hỏi hoặc đọc tình huống bên phải, chuẩn bị ý và bấm nút ghi âm microphone để luyện phản xạ nói tiếng Nga.
                </p>
                <div style="font-size:0.82rem;color:var(--secondary);font-weight:700">
                  Thời lượng phần thi: ${part.durationMin || 15} phút
                </div>
              </div>
            `;
          }
        }
      }

      // 5. Render Câu hỏi Cột Phải
      const rightBox = el("#cbtRightQuestionBox");
      if (!rightBox) return;

      if (item.type === "question") {
        const q = item.q;
        const userAns = answers[id];
        const hasAnswered = (userAns !== undefined);
        const hasServerKey = (typeof q.a === "number");
        const isCorrect = hasAnswered && hasServerKey && (userAns === q.a);
        // Luyện tập: đã hiện đáp án đúng thì khoá câu, không cho chọn lại để "sửa" điểm.
        const isLocked = isPractice && hasAnswered && hasServerKey;

        const rawOpts = normalizeOptions(q.options);
        if (!sessionOptionOrders[id] || sessionOptionOrders[id].length !== rawOpts.length) {
          const indices = rawOpts.map((_, idx) => idx);
          sessionOptionOrders[id] = (rawOpts.length >= 2) ? qShuffleArray(indices) : indices;
          try { sessionStorage.setItem(storageKey + "_opt_orders", JSON.stringify(sessionOptionOrders)); } catch(e) {}
        }
        const order = sessionOptionOrders[id] || rawOpts.map((_, idx) => idx);
        const letters = ["A", "B", "C", "D", "E", "F"];

        // Format khoảng trống ___ cho nổi bật trực quan
        const formattedPrompt = esc(q.q || "").replace(/___+/g, '<span class="cbt-fill-slot">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');

        rightBox.innerHTML = `
          <div class="cbt-question-header-line">
            <span class="cbt-q-number-pill">${icon("help-circle", 15)} Câu ${currentItemIndex + 1} / ${totalQuestions} · ${esc(part.vi || part.name || "")}</span>
            <button type="button" class="cbt-btn-flag-toggle ${isFlag ? 'is-flagged' : ''}" id="btnFlagRight" title="Đặt cờ xem lại (Phím F)">
              ${icon("flag", 14)} <span>${isFlag ? 'Đã đặt cờ' : 'Đặt cờ'}</span>
            </button>
          </div>

          <div class="cbt-q-prompt-text ru">${formattedPrompt}</div>

          <div class="cbt-options-card-list" role="radiogroup" aria-label="Các lựa chọn đáp án">
            ${order.map((oi, lIdx) => {
              const optText = rawOpts[oi] || "";
              let cardClass = "cbt-choice-card";
              if (isPractice && hasAnswered && hasServerKey) {
                if (oi === q.a) cardClass += " correct";
                else if (oi === userAns && !isCorrect) cardClass += " wrong";
              } else if (userAns === oi) {
                cardClass += " selected";
              }
              return `
                <button type="button" class="${cardClass}" data-oi="${oi}" role="radio" aria-checked="${userAns === oi ? 'true' : 'false'}"${isLocked ? ' disabled aria-disabled="true"' : ''}>
                  <span class="cbt-choice-circle-letter">${letters[lIdx] || (lIdx + 1)}</span>
                  <span class="cbt-choice-body-text ru">${esc(optText)}</span>
                  <span class="cbt-choice-kbd-hint">[${lIdx + 1}]</span>
                </button>
              `;
            }).join("")}
          </div>

          ${isPractice && hasAnswered ? (hasServerKey ? `
            <div class="trki-practice-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}" style="margin-top:20px">
              <div class="feedback-badge-row">
                <span class="feedback-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
                  ${isCorrect ? '✓ Đúng' : '✕ Sai'}
                </span>
                ${!isCorrect ? `<span class="feedback-correct-answer">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(rawOpts[q.a] || q._correctAnswer || "")}</b></span>` : ''}
              </div>
              ${q.ex ? `
              <div class="feedback-ex">
                <b>Giải thích:</b> ${esc(q.ex)}
              </div>` : ''}
            </div>
          ` : `
            <div class="trki-practice-feedback" style="margin-top:20px;color:var(--muted)">
              ${q._checkFailed ? 'Không thể kết nối máy chủ kiểm tra đáp án lúc này. Vui lòng thử chọn lại.' : 'Đang đối chiếu đáp án từ máy chủ...'}
            </div>
          `) : ""}
        `;

        // Chế độ Luyện tập: Kiểm tra đáp án 1 câu qua RPC bảo mật (Zero-Answer Leak)
        if (isPractice && hasAnswered && !hasServerKey && !q._checking) {
          q._checking = true;
          q._checkFailed = false;
          const checkCode = currentTest.code || currentTest.id;
          const qIdx = typeof item.globalQIdx === "number" ? item.globalQIdx : currentItemIndex;
          const checkFn = window.RusiSupabase && window.RusiSupabase.questionBank && window.RusiSupabase.questionBank.checkQuestion;
          if (typeof checkFn === "function") {
            checkFn(checkCode, qIdx, userAns).then((res) => {
              q._checking = false;
              if (res && res.found && typeof res.correct_index === "number") {
                q.a = res.correct_index;
                q._correctAnswer = res.correct_answer || "";
                q.ex = res.explanation || "";
              } else {
                q._checkFailed = true;
              }
              if (examItems[currentItemIndex] === item) renderQuestionAt(currentItemIndex);
            }).catch(() => {
              q._checking = false;
              q._checkFailed = true;
              if (examItems[currentItemIndex] === item) renderQuestionAt(currentItemIndex);
            });
          } else {
            q._checking = false;
            q._checkFailed = true;
          }
        }

        // Bắt sự kiện chọn đáp án
        rightBox.querySelectorAll(".cbt-choice-card").forEach(optBtn => {
          optBtn.onclick = () => {
            if (isLocked) return;
            const oi = parseInt(optBtn.dataset.oi, 10);
            answers[id] = oi;
            q._checkFailed = false;
            try { sessionStorage.setItem(storageKey + "_answers", JSON.stringify(answers)); } catch(e) {}
            refreshMatrixCounts();
            renderQuestionAt(currentItemIndex);
          };
        });
      } else if (item.type === "writing") {
        const wt = item.wt;
        const savedText = answers[id] || "";
        const wordCount = savedText.trim() ? savedText.trim().split(/\s+/).length : 0;

        rightBox.innerHTML = `
          <div class="cbt-question-header-line">
            <span class="cbt-q-number-pill">${icon("pen-tool", 16)} Bài viết ${item.qi + 1}</span>
            <button type="button" class="cbt-btn-flag-toggle ${isFlag ? 'is-flagged' : ''}" id="btnFlagRight">
              ${icon("flag", 14)} <span>${isFlag ? 'Đã đặt cờ' : 'Đặt cờ'}</span>
            </button>
          </div>

          <div style="background:var(--bg);padding:18px;border-radius:12px;margin-bottom:18px;border:1px solid var(--border)">
            <h4 style="font-size:1.05rem;font-weight:800;color:var(--text);margin-bottom:6px">${esc(wt.title)}</h4>
            <div class="ru" style="font-size:1.1rem;font-weight:600;line-height:1.7;color:var(--text);margin-bottom:12px">${esc(wt.prompt)}</div>
            ${wt.hints && Array.isArray(wt.hints) ? `
              <div style="font-size:0.86rem;color:var(--muted);background:var(--surface);padding:10px 14px;border-radius:8px;margin-bottom:12px;border:1px dashed var(--border)">
                <b>Gợi ý triển khai:</b>
                <ul style="margin:4px 0 0 16px;padding:0">
                  ${wt.hints.map(h => `<li class="ru">${esc(h)}</li>`).join("")}
                </ul>
              </div>
            ` : ''}
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.84rem;color:var(--muted)">
              <span id="cbtWordCountBadge">Dung lượng: <b>${wordCount} từ</b> (Tối thiểu ${wt.minWords || 35} từ)</span>
              <span style="color:var(--primary);font-weight:700">Nhập văn bản tiếng Nga</span>
            </div>
          </div>

          <textarea class="cbt-writing-textarea ru" id="cbtWritingInput" placeholder="Введите ваш текст на русском языке здесь..." rows="12" style="width:100%;padding:16px;border-radius:10px;border:1.5px solid var(--border);font-size:1.05rem;line-height:1.7;background:var(--surface);color:var(--text);font-family:var(--font-ru, 'PT Sans', serif);box-sizing:border-box">${esc(savedText)}</textarea>
        `;

        const textarea = el("#cbtWritingInput");
        if (textarea) {
          textarea.oninput = () => {
            const val = textarea.value;
            answers[id] = val;
            try { sessionStorage.setItem(storageKey + "_answers", JSON.stringify(answers)); } catch(e) {}
            const wc = val.trim() ? val.trim().split(/\s+/).length : 0;
            const wcBadge = el("#cbtWordCountBadge");
            if (wcBadge) wcBadge.innerHTML = `Dung lượng: <b>${wc} từ</b> (Tối thiểu ${wt.minWords || 35} từ)`;
            refreshMatrixCounts();
          };
        }
      } else if (item.type === "speaking") {
        const st = item.st;
        rightBox.innerHTML = `
          <div class="cbt-question-header-line">
            <span class="cbt-q-number-pill">${icon("mic-speaking", 16)} Bài luyện nói ${item.qi + 1}</span>
            <button type="button" class="cbt-btn-flag-toggle ${isFlag ? 'is-flagged' : ''}" id="btnFlagRight">
              ${icon("flag", 14)} <span>${isFlag ? 'Đã đặt cờ' : 'Đặt cờ'}</span>
            </button>
          </div>

          <div style="background:var(--bg);padding:18px;border-radius:12px;margin-bottom:18px;border:1px solid var(--border)">
            <h4 style="font-size:1.05rem;font-weight:800;color:var(--text);margin-bottom:6px">${esc(st.title)}</h4>
            <div class="ru" style="font-size:1.15rem;font-weight:600;line-height:1.7;color:var(--text);margin-bottom:8px">${esc(st.prompt)}</div>
            <div style="font-size:0.88rem;color:var(--muted);margin-bottom:14px">${esc(st.vi)}</div>

            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <button type="button" class="btn btn-outline btn-sm" id="btnToggleSpeakSample">
                ${icon("sparkles-clean", 14)} Câu gợi ý phản xạ
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="btnSpeakRecord">
                ${icon("mic-speaking", 14)} Luyện phát âm / Ghi âm
              </button>
              <span id="speakRecStatus" style="font-size:0.84rem;color:var(--muted)"></span>
            </div>
            <div class="hidden" id="speakSampleBox" style="margin-top:14px;padding:12px 14px;background:var(--surface);border:1px dashed var(--border);border-radius:8px;font-size:0.95rem">
              <strong style="color:var(--primary)">Gợi ý mẫu:</strong> <span class="ru">${esc(st.suggested || "")}</span>
            </div>
          </div>
        `;

        const btnSample = el("#btnToggleSpeakSample");
        if (btnSample) {
          btnSample.onclick = () => {
            const box = el("#speakSampleBox");
            if (box) box.classList.toggle("hidden");
          };
        }

        const btnSpeakRec = el("#btnSpeakRecord");
        const speakStatus = el("#speakRecStatus");
        if (btnSpeakRec) {
          btnSpeakRec.onclick = async () => {
            if (window._mockTestSpeakRecorder && window._mockTestSpeakRecorder.state === "recording") {
              try { window._mockTestSpeakRecorder.stop(); } catch(_) {}
              btnSpeakRec.innerHTML = `${icon("mic-speaking", 14)} Luyện phát âm / Ghi âm`;
              btnSpeakRec.classList.remove("is-recording");
              if (speakStatus) speakStatus.textContent = "Đã ghi âm xong.";
              return;
            }
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              activeMicStream = stream;
              const chunks = [];
              const recorder = new MediaRecorder(stream);
              window._mockTestSpeakRecorder = recorder;
              recorder.ondataavailable = (ev) => { if (ev.data.size > 0) chunks.push(ev.data); };
              recorder.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                activeMicStream = null;
                answers[id] = true;
                refreshMatrixCounts();
              };
              recorder.start();
              btnSpeakRec.innerHTML = `${icon("mic-speaking", 14)} Đang ghi âm... (Bấm dừng)`;
              btnSpeakRec.classList.add("is-recording");
              if (speakStatus) speakStatus.textContent = "Đang ghi âm câu trả lời của bạn...";
            } catch(recErr) {
              if (speakStatus) speakStatus.textContent = "Không thể truy cập microphone.";
            }
          };
        }
      }

      // Bắt sự kiện cờ bên phải
      const btnFlagRight = el("#btnFlagRight");
      if (btnFlagRight) {
        btnFlagRight.onclick = () => toggleFlag(id);
      }

      if (window.RusiIcons && typeof RusiIcons.replace === "function") {
        RusiIcons.replace(host);
      }
      refreshMatrixCounts();
    };

    // Global jump helper
    window._cbtJumpToQuestion = (targetIdx) => {
      if (typeof targetIdx === "number") renderQuestionAt(targetIdx);
    };

    // Toggle cờ xem lại
    const toggleFlag = (id) => {
      flagged[id] = !flagged[id];
      try { sessionStorage.setItem(storageKey + "_flagged", JSON.stringify(flagged)); } catch(e) {}
      renderQuestionAt(currentItemIndex);
    };

    // Nút Next & Prev
    const btnPrev = el("#btnPrevQ");
    if (btnPrev) {
      btnPrev.onclick = () => {
        if (currentItemIndex > 0) renderQuestionAt(currentItemIndex - 1);
      };
    }

    const btnNext = el("#btnNextQ");
    if (btnNext) {
      btnNext.onclick = () => {
        if (currentItemIndex < totalQuestions - 1) {
          renderQuestionAt(currentItemIndex + 1);
        } else {
          openSubmitConfirmModal();
        }
      };
    }

    // Phím tắt bàn phím toàn diện (1, 2, 3, 4, Mũi tên trái/phải, F, M)
    const handleKeyNav = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT" || e.target.isContentEditable) return;
      // Không chặn phím tắt trình duyệt/hệ điều hành (Ctrl+C, Ctrl+F, Cmd+A...).
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (typeof e.key !== "string") return;

      const key = e.key.toLowerCase();
      const item = examItems[currentItemIndex];

      // Phím 1, 2, 3, 4 hoặc a, b, c, d chọn đáp án
      if (item && item.type === "question") {
        const q = item.q;
        const rawOpts = normalizeOptions(q.options);
        const order = sessionOptionOrders[item.id] || rawOpts.map((_, idx) => idx);
        let selectedOrderIndex = -1;
        if (key === "1" || key === "a") selectedOrderIndex = 0;
        else if (key === "2" || key === "b") selectedOrderIndex = 1;
        else if (key === "3" || key === "c") selectedOrderIndex = 2;
        else if (key === "4" || key === "d") selectedOrderIndex = 3;

        const practiceLocked = isPractice && answers[item.id] !== undefined && typeof q.a === "number";
        if (selectedOrderIndex >= 0 && selectedOrderIndex < order.length && !practiceLocked) {
          e.preventDefault();
          const oi = order[selectedOrderIndex];
          answers[item.id] = oi;
          q._checkFailed = false;
          try { sessionStorage.setItem(storageKey + "_answers", JSON.stringify(answers)); } catch(err) {}
          refreshMatrixCounts();
          renderQuestionAt(currentItemIndex);
          return;
        }
      }

      // Phím F: Đặt / Bỏ cờ
      if (key === "f") {
        e.preventDefault();
        if (item) toggleFlag(item.id);
        return;
      }

      // Phím M: Mở / Đóng drawer ma trận câu hỏi
      if (key === "m") {
        e.preventDefault();
        const drawerBackdrop = el("#cbtMatrixBackdrop");
        if (drawerBackdrop && drawerBackdrop.classList.contains("open")) {
          closeDrawer();
        } else {
          openDrawer();
        }
        return;
      }

      // Phím mũi tên sang trái / sang phải
      if (e.key === "ArrowLeft" && currentItemIndex > 0) {
        e.preventDefault();
        renderQuestionAt(currentItemIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentItemIndex < totalQuestions - 1) {
          renderQuestionAt(currentItemIndex + 1);
        } else {
          openSubmitConfirmModal();
        }
      }
    };
    document.addEventListener("keydown", handleKeyNav);
    workspaceTeardown = () => {
      stopCbtAudio();
      document.removeEventListener("keydown", handleKeyNav);
    };

    // KÉO DI CHUYỂN THANH RESIZER 4/6 (DRAGGABLE SPLITTER)
    const splitter = el("#cbtSplitGutter");
    const leftPane = el("#cbtSplitLeft");
    const container = el("#cbtWorkspaceSplit");
    let isDragging = false;

    if (splitter && leftPane && container) {
      const startDrag = (e) => {
        isDragging = true;
        try { splitter.setPointerCapture(e.pointerId); } catch(_) {}
        document.body.classList.add("cbt-resizing");
      };

      const doDrag = (e) => {
        if (!isDragging || !container) return;
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let pct = (offsetX / rect.width) * 100;
        if (pct < 25) pct = 25;
        if (pct > 75) pct = 75;
        leftPane.style.width = pct + "%";
        try { localStorage.setItem("trki_splitter_pct", pct.toFixed(1)); } catch(_) {}
      };

      const stopDrag = (e) => {
        if (isDragging) {
          isDragging = false;
          try { splitter.releasePointerCapture(e.pointerId); } catch(_) {}
          document.body.classList.remove("cbt-resizing");
        }
      };

      splitter.addEventListener("pointerdown", startDrag);
      window.addEventListener("pointermove", doDrag);
      window.addEventListener("pointerup", stopDrag);
      window.addEventListener("pointercancel", stopDrag);
    }

    // QUẢN LÝ DRAWER MA TRẬN BẢNG CÂU HỎI
    const drawerBackdrop = el("#cbtMatrixBackdrop");
    const btnOpenDrawer = el("#btnOpenMatrixDrawer");
    const btnCloseDrawer = el("#btnCloseMatrixDrawer");

    let currentMatrixFilter = "all";

    const renderMatrixDrawer = () => {
      const matrixBody = el("#cbtMatrixBody");
      if (!matrixBody) return;

      let html = "";
      activeParts.forEach((part, pi) => {
        const partItems = examItems.filter(item => item.partIndex === pi);
        if (!partItems.length) return;

        const firstNum = examItems.indexOf(partItems[0]) + 1;
        const lastNum = examItems.indexOf(partItems[partItems.length - 1]) + 1;

        html += `
          <div class="cbt-matrix-subtest-group">
            <div class="cbt-matrix-subtest-caption">
              <span>Phần ${pi + 1}: ${esc(part.vi || part.name)} (Câu ${firstNum} - ${lastNum})</span>
              <span>${partItems.length} câu</span>
            </div>
            <div class="cbt-matrix-cells-grid">
        `;

        partItems.forEach(item => {
          const globalIdx = examItems.indexOf(item);
          const qNum = globalIdx + 1;
          const userAns = answers[item.id];
          const isDone = (userAns !== undefined && userAns !== "");
          const isFlag = !!flagged[item.id];
          const isCurrent = (globalIdx === currentItemIndex);

          let filterMatch = true;
          if (currentMatrixFilter === "answered") filterMatch = isDone;
          else if (currentMatrixFilter === "unanswered") filterMatch = !isDone;
          else if (currentMatrixFilter === "flagged") filterMatch = isFlag;

          let btnClass = "cbt-matrix-q-btn";
          if (isDone) btnClass += " answered";
          if (isFlag) btnClass += " flagged";
          if (isCurrent) btnClass += " current";
          if (!filterMatch) btnClass += " hidden";

          html += `
            <button type="button" class="${btnClass}" data-jump-idx="${globalIdx}" title="Câu ${qNum}">
              ${qNum}
            </button>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      matrixBody.innerHTML = html;

      // Click nút câu hỏi -> Nhảy ngay đến câu đó & đóng drawer
      matrixBody.querySelectorAll("[data-jump-idx]").forEach(btn => {
        btn.onclick = () => {
          const targetIdx = parseInt(btn.dataset.jumpIdx, 10);
          renderQuestionAt(targetIdx);
          closeDrawer();
        };
      });
    };

    const openDrawer = () => {
      renderMatrixDrawer();
      if (drawerBackdrop) drawerBackdrop.classList.add("open");
    };

    const closeDrawer = () => {
      if (drawerBackdrop) drawerBackdrop.classList.remove("open");
    };

    if (btnOpenDrawer) btnOpenDrawer.onclick = openDrawer;
    if (btnCloseDrawer) btnCloseDrawer.onclick = closeDrawer;
    if (drawerBackdrop) {
      drawerBackdrop.onclick = (e) => {
        if (e.target === drawerBackdrop) closeDrawer();
      };
    }

    // Bộ lọc trạng thái trong Drawer
    host.querySelectorAll(".cbt-filter-badge-btn").forEach(btn => {
      btn.onclick = () => {
        host.querySelectorAll(".cbt-filter-badge-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMatrixFilter = btn.dataset.matrixFilter || "all";
        renderMatrixDrawer();
      };
    });

    const refreshMatrixCounts = () => {
      const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== "").length;
      const unDoneCount = Math.max(0, totalQuestions - answeredCount);
      const flagCount = Object.keys(flagged).filter(k => flagged[k]).length;

      const badge = el("#cbtDrawerAnsweredCount");
      if (badge) badge.textContent = String(answeredCount);
      const doneBadge = el("#countDoneDrawer");
      if (doneBadge) doneBadge.textContent = String(answeredCount);
      const undoneBadge = el("#countUndoneDrawer");
      if (undoneBadge) undoneBadge.textContent = String(unDoneCount);
      const flagBadge = el("#countFlagDrawer");
      if (flagBadge) flagBadge.textContent = String(flagCount);

      // Cập nhật số lượng trên mini palette nếu đang hiển thị
      const miniCount = el("#cbtMiniAnsweredCount");
      if (miniCount) miniCount.textContent = `${answeredCount}/${totalQuestions}`;

      host.querySelectorAll(".cbt-mini-chip").forEach(chip => {
        const qIdx = parseInt(chip.dataset.jumpMini, 10);
        const it = examItems[qIdx];
        if (!it) return;
        const isDone = (answers[it.id] !== undefined && answers[it.id] !== "");
        const isFl = !!flagged[it.id];
        const isCur = (qIdx === currentItemIndex);
        chip.className = `cbt-mini-chip ${isDone ? 'answered' : ''} ${isFl ? 'flagged' : ''} ${isCur ? 'current' : ''}`.trim();
      });
    };

    // Toàn màn hình toggle
    const btnFs = el("#btnToggleFullScreen");
    if (btnFs) {
      btnFs.onclick = () => {
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
          document.body.classList.add("cbt-fullscreen-mode");
          btnFs.innerHTML = `${icon("minimize", 15)} <span>Thu nhỏ</span>`;
        } else {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          document.body.classList.remove("cbt-fullscreen-mode");
          btnFs.innerHTML = `${icon("maximize", 15)} <span>Toàn màn hình</span>`;
        }
      };
    }

    // Thoát bài thi
    el("#btnExitTest").onclick = () => {
      const exitMsg = isPractice
        ? "Bạn có chắc chắn muốn kết thúc bài luyện tập?"
        : "Bạn có chắc chắn muốn rời khỏi phòng thi? Kết quả hiện tại sẽ không được lưu.";
      if (confirm(exitMsg)) {
        stopCbtAudio();
        cleanupHardwareTests();
        document.removeEventListener("keydown", handleKeyNav);
        try {
          sessionStorage.removeItem("trki_active_exam_id");
          sessionStorage.removeItem("trki_active_part_id");
          sessionStorage.removeItem("trki_exam_mode");
          if (currentTest && currentTest.id) {
            sessionStorage.removeItem(storageKey + "_endTime");
            sessionStorage.removeItem(storageKey + "_startTime");
            sessionStorage.removeItem(storageKey + "_answers");
            sessionStorage.removeItem(storageKey + "_flagged");
          }
        } catch(e) {}
        clearInterval(timer);
        if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
        document.body.classList.remove("in-workspace", "cbt-fullscreen-mode");
        renderHub();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // Modal xác nhận nộp bài thi
    const openSubmitConfirmModal = () => {
      const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== "").length;
      const unDoneCount = Math.max(0, totalQuestions - answeredCount);
      const flagCount = Object.keys(flagged).filter(k => flagged[k]).length;

      let modal = document.getElementById("cbtSubmitModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "cbtSubmitModal";
        modal.className = "anticheat-modal";
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="anticheat-modal-box" style="border-top-color:var(--secondary);max-width:440px">
          <div style="margin-bottom:12px;color:var(--secondary)">
            ${icon("check-circle-correct", 48)}
          </div>
          <h3 style="font-size:1.3rem;font-weight:800;color:var(--text);margin-bottom:8px">${isPractice ? "HOÀN THÀNH BÀI LUYỆN TẬP?" : "XÁC NHẬN NỘP BÀI THI"}</h3>
          <p style="color:var(--muted);font-size:0.92rem;margin-bottom:18px">
            ${isPractice ? "Kiểm tra lại các câu chưa làm trước khi xem kết quả luyện tập." : "Vui lòng kiểm tra lại tiến độ làm bài trước khi kết thúc phiên thi khảo thí CBT."}
          </p>
          
          <div style="background:var(--bg);border-radius:12px;padding:14px 18px;margin-bottom:20px;text-align:left;border:1px solid var(--border)">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.92rem">
              <span>Tổng số câu hỏi:</span>
              <b>${totalQuestions} câu</b>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.92rem;color:var(--green)">
              <span>Đã hoàn thành:</span>
              <b>${answeredCount} câu</b>
            </div>
            ${unDoneCount > 0 ? `
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.92rem;color:var(--red)">
                <span>Chưa trả lời:</span>
                <b>${unDoneCount} câu ⚠️</b>
              </div>
            ` : ""}
            ${flagCount > 0 ? `
              <div style="display:flex;justify-content:space-between;font-size:0.92rem;color:#b45309">
                <span>Đang gắn cờ xem lại:</span>
                <b>${flagCount} câu 🚩</b>
              </div>
            ` : ""}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:10px">
            <button type="button" class="btn btn-outline" id="btnCancelSubmit" style="height:44px;font-weight:700">
              Tiếp tục làm bài
            </button>
            <button type="button" class="btn btn-primary" id="btnConfirmSubmit" style="height:44px;font-weight:800;background:var(--secondary);border-color:var(--secondary)">
              ${isPractice ? "Xem kết quả" : "Nộp bài ngay"}
            </button>
          </div>
        </div>
      `;

      document.getElementById("btnCancelSubmit").onclick = () => modal.remove();
      document.getElementById("btnConfirmSubmit").onclick = () => {
        modal.remove();
        document.removeEventListener("keydown", handleKeyNav);
        submit();
      };
    };

    const topSub = el("#btnSubmitTop");
    if (topSub) {
      topSub.onclick = () => openSubmitConfirmModal();
    }

    // Khởi tạo câu hỏi đầu tiên
    renderQuestionAt(currentItemIndex);
  };

  const submit = async () => {
    runWorkspaceTeardown();
    document.body.classList.remove("cbt-fullscreen-mode");

    started = false;
    clearInterval(timer);

    const storageKey = getExamStorageKey();
    const isPracticeMode = examMode === "practice";
    let timeSpentSec = 0;
    try {
      const startedAt = parseInt(sessionStorage.getItem(storageKey + "_startTime") || "0", 10);
      if (startedAt > 0) timeSpentSec = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    } catch(e) {}
    try {
      sessionStorage.removeItem("trki_active_exam_id");
      sessionStorage.removeItem("trki_active_part_id");
      if (currentTest && currentTest.id) {
        sessionStorage.removeItem(storageKey + "_endTime");
        sessionStorage.removeItem(storageKey + "_startTime");
        sessionStorage.removeItem(storageKey + "_answers");
        sessionStorage.removeItem(storageKey + "_flagged");
        sessionStorage.removeItem(storageKey + "_opt_orders");
      }
    } catch(e) {}
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }

    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);
    const activeParts = isSubset
      ? currentTest.parts.filter(p => selectedPartList.includes(p.id))
      : currentTest.parts;

    // Chấm thi Server-Side bảo mật qua RPC (Zero-Answer Leak — đồng bộ đúng offset khi thi từng phần)
    if (window.RusiSupabase && window.RusiSupabase.questionBank && typeof window.RusiSupabase.questionBank.gradeSubmission === "function" && currentTest && (currentTest.code || currentTest.id)) {
      try {
        const timeSpent = timeSpentSec;
        const answersPayload = {};
        let fullIdx = 0;
        const partBaseOffsets = new Map();
        (currentTest.parts || []).forEach(p => {
          partBaseOffsets.set(p.id, fullIdx);
          (p.questions || []).forEach((q, qi) => {
            const ans = answers[p.id + "_" + qi];
            if (ans !== undefined) {
              answersPayload[String(fullIdx)] = ans;
              if (q.code) answersPayload[q.code] = ans;
              if (q.id) answersPayload[String(q.id)] = ans;
            }
            fullIdx++;
          });
        });
        const serverGradeResult = await window.RusiSupabase.questionBank.gradeSubmission(currentTest.code || currentTest.id, answersPayload, timeSpent);
        if (serverGradeResult && serverGradeResult.success && Array.isArray(serverGradeResult.reviews)) {
          activeParts.forEach(p => {
            const base = partBaseOffsets.get(p.id) || 0;
            (p.questions || []).forEach((q, qi) => {
              const rev = serverGradeResult.reviews[base + qi];
              if (rev && typeof rev.correct_index === "number") {
                q.a = rev.correct_index;
                q.ex = rev.explanation || q.ex || "";
              }
            });
          });
        }
      } catch (errGrade) {
        console.warn("[TRKI] Server grading error:", errGrade);
      }
    }

    const detail = [];
    let total = 0;
    let correct = 0;
    activeParts.forEach((part) => {
      let pc = 0;
      const questions = Array.isArray(part.questions) ? part.questions : [];
      // Phần Viết/Nói chưa có chấm tự động: không tính vào điều kiện đạt.
      if (!questions.length) return;
      questions.forEach((q, qi) => {
        total++;
        const given = answers[part.id + "_" + qi];
        if (given === q.a) {
          correct++;
          pc++;
        }
      });
      const pct = questions.length > 0 ? Math.round((pc / questions.length) * 100) : 100;
      detail.push({
        part,
        pct,
        count: pc,
        total: questions.length,
        passed: pct >= (currentTest.pass_percent || currentTest.passPercent || 66)
      });
    });

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const requiredPassPct = currentTest.pass_percent || currentTest.passPercent || 66;

    // Check TRKI Official Passing Standards
    const ungradedParts = activeParts.filter(p => !(Array.isArray(p.questions) && p.questions.length));
    const allSubtestsPassed = detail.length > 0 && detail.every(d => d.pct >= requiredPassPct);
    const failedParts = detail.filter(d => d.pct < requiredPassPct);
    const singleRetakeEligible = !isPracticeMode && !isSubset && failedParts.length === 1 && failedParts[0].pct >= 60;

    let examStatus = "fail";
    let statusBadgeText = `НЕ СДАНО (CHƯA ĐẠT · Chuẩn ≥ ${requiredPassPct}%)`;
    let statusDesc = `Theo chuẩn ТРКИ, bạn cần đạt tối thiểu ${requiredPassPct}% để đạt yêu cầu. Hãy rà soát lại các câu sai bên dưới để ôn luyện bổ sung.`;

    const pKeyStr = isSubset ? selectedPartList.join("-") : "full";

    if (allSubtestsPassed) {
      examStatus = "pass";
      statusBadgeText = isSubset
        ? (activeParts.length === 1 ? `СДАНО · ĐẠT YÊU CẦU ${activeParts[0].vi}` : `СДАНО · ĐẠT YÊU CẦU (${activeParts.length} PHẦN)`)
        : `СДАНО · ĐẠT CHỨNG CHỈ ТРКИ ${currentTest.level}`;
      statusDesc = isSubset
        ? `Chúc mừng! Bạn đã hoàn thành tốt các phân môn đã chọn với tỷ lệ đạt ${pct}%. Bạn có thể tiếp tục luyện các phần khác hoặc thi toàn diện!`
        : `Chúc mừng! Bạn đã vượt qua tất cả các phân môn khảo thí với điểm số ≥ ${requiredPassPct}% theo chuẩn quốc gia Liên bang Nga.`;
      if (!isPracticeMode && !isSubset && ungradedParts.length) {
        statusBadgeText = `СДАНО PHẦN TRẮC NGHIỆM · VIẾT/NÓI CHƯA CHẤM`;
      }
      if (isPracticeMode) {
        statusBadgeText = `HOÀN THÀNH BÀI LUYỆN TẬP · ĐẠT ${pct}%`;
      }
      // Luyện tập chỉ nhận mức XP của bài thi từng phần, kể cả khi làm cả đề.
      const testXp = (isSubset || isPracticeMode)
        ? (typeof RUSI_XP_RULES !== "undefined" ? RUSI_XP_RULES.TRKI_SUBTEST_PASS : 20)
        : (typeof RUSI_XP_RULES !== "undefined" ? RUSI_XP_RULES.TRKI_FULL_PASS : 50);
      if (typeof Progress !== "undefined") {
        Progress.addXp(testXp, {
          title: `Khảo thí: ${currentTest.title}`,
          skill_type: "mock-test",
          item_id: currentTest.id + "_" + pKeyStr,
          score: pct
        });
        Progress.markDone(isSubset ? "trkiSubDone" : "trkiDone", currentTest.id + (isSubset ? "_" + pKeyStr : ""), {
          skill_type: "mock-test",
          item_id: currentTest.id + "_" + pKeyStr,
          score: pct,
          xp_earned: testXp
        });
      }
    } else if (singleRetakeEligible) {
      examStatus = "retake";
      statusBadgeText = `BẢO LƯU KẾT QUẢ · ĐƯỢC THI LẠI 1 PHÂN MÔN`;
      statusDesc = `Theo quy chế TRKI chính thức, bạn đạt chuẩn ${detail.length - 1}/${detail.length} phân môn và phân môn "${failedParts[0].part.vi}" đạt ${failedParts[0].pct}% (ngưỡng 60%-65%). Bạn đủ điều kiện bảo lưu và chỉ phải thi lại riêng phân môn này!`;
      if (typeof Progress !== "undefined") {
        Progress.syncToCloud({
          skill_type: "mock-test",
          item_id: currentTest.id + "_" + pKeyStr,
          item_title: `Khảo thí (Bảo lưu): ${currentTest.title}`,
          score: pct,
          xp_earned: 0
        });
      }
    } else {
      if (!detail.length) {
        examStatus = "pending";
        statusBadgeText = "ĐÃ NỘP BÀI · PHẦN VIẾT/NÓI CHƯA CHẤM ĐIỂM";
      } else if (isPracticeMode) {
        statusBadgeText = `KẾT QUẢ LUYỆN TẬP · ${pct}% (CHUẨN ≥ ${requiredPassPct}%)`;
      }
      if (typeof Progress !== "undefined") {
        Progress.syncToCloud({
          skill_type: "mock-test",
          item_id: currentTest.id + "_" + pKeyStr,
          item_title: `Khảo thí: ${currentTest.title}`,
          score: pct,
          xp_earned: 0
        });
      }
    }
    const bestKey = "bestTest_" + currentTest.id + "_" + pKeyStr;
    const best = Math.max(pct, STORE.get(bestKey, 0));
    STORE.set(bestKey, best);
    STORE.set("bestTest", Math.max(pct, STORE.get("bestTest", 0)));

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <header class="cbt-top-bar" role="banner">
        <div class="cbt-top-bar-left">
          <button type="button" class="cbt-back-btn" id="btnReviewBack" title="Quay lại danh sách đề thi" aria-label="Quay lại danh sách đề thi">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="cbt-title-group">
            <div class="cbt-title-row">
              <span class="cbt-part-badge">ТРКИ-${currentTest.level}</span>
              <span class="cbt-exam-title">${esc(currentTest.title)}</span>
            </div>
            <span class="cbt-subtest-name">Kết quả khảo thí & Giải thích đáp án chi tiết</span>
          </div>
        </div>

        <div class="cbt-top-bar-right">
          <button class="btn btn-primary btn-sm btn-cbt-submit-top" id="btnRetryTop" title="Làm lại đề thi này">
            ${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 15 }) : ""} <span>Làm lại đề</span>
          </button>
        </div>
      </header>

      <div class="trki-workspace-result">
        <!-- 1. THẺ HERO KẾT QUẢ ĐÁNH GIÁ (GỌN GÀNG, HIỆN ĐẠI, 1 KHỐI DUY NHẤT) -->
        <div class="trki-hero-eval-card ${examStatus === 'pass' ? 'is-pass' : 'is-fail'}">
          <div class="trki-eval-top">
            <div class="trki-eval-top-info">
              <div class="trki-eval-status-pill ${examStatus === 'pass' ? 'pass' : examStatus === 'retake' ? 'retake' : 'fail'}">
                ${window.RusiIcons ? RusiIcons.get(examStatus === "pass" ? "check-circle-correct" : examStatus === "retake" ? "rotate-ccw" : "alert-triangle", { size: 15 }) : ""}
                <span>${statusBadgeText}</span>
              </div>
              <h2 class="trki-eval-title">${esc(currentTest.title)}</h2>
              <p class="trki-eval-subtitle">
                ${isSubset ? esc(activeParts.map(p => p.vi).join(" · ")) : `Khảo thí chuẩn quốc tế ТРКИ · Cấp độ ${esc(currentTest.level)}`}
              </p>
            </div>
            <div class="trki-eval-top-score">
              <span class="trki-score-num ${examStatus === 'pass' ? 'pass' : 'fail'}">${pct}%</span>
              <span class="trki-score-ratio">${correct}/${total} câu đúng</span>
            </div>
          </div>

          ${(detail.length > 0 || ungradedParts.length > 0) ? `
            <div class="trki-subtest-compact-grid">
              ${detail.map((d) => `
                <div class="trki-subtest-compact-item ${d.passed ? 'is-pass' : 'is-fail'}">
                  <div class="trki-subtest-compact-row">
                    <span class="trki-subtest-compact-name">${esc(d.part.vi)}</span>
                    <span class="trki-subtest-compact-score ${d.passed ? 'pass' : 'fail'}">${d.count}/${d.total} (${d.pct}%)</span>
                  </div>
                  <div class="trki-subtest-compact-track">
                    <div class="trki-subtest-compact-fill ${d.passed ? 'pass' : 'fail'}" style="width:${d.pct}%"></div>
                  </div>
                </div>
              `).join("")}
              ${ungradedParts.map((p) => `
                <div class="trki-subtest-compact-item">
                  <div class="trki-subtest-compact-row">
                    <span class="trki-subtest-compact-name">${esc(p.vi || p.name || "")}</span>
                    <span class="trki-subtest-compact-score">Chưa chấm</span>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>

        <!-- 2. BẢNG PHÂN TÍCH ĐÁP ÁN & GIẢI THÍCH LỜI GIẢI THÀNH 1 KHỐI DUY NHẤT -->
        <div class="trki-unified-review-card">
          <div class="trki-review-card-head">
            <div class="trki-review-card-title">
              ${window.RusiIcons ? RusiIcons.get("file-text", { size: 18 }) : ""}
              <span>Phân tích đáp án & giải thích lời giải chi tiết</span>
            </div>
            <span class="trki-review-count-badge">${total} câu hỏi</span>
          </div>
          <div id="reviewHost" class="trki-review-items-list"></div>
        </div>
      </div>
    `;

    const review = el("#reviewHost");
    activeParts.forEach((part) => {
      if (activeParts.length > 1) {
        review.innerHTML += `
          <div class="trki-part-divider-row">
            <span class="trki-part-divider-title">${esc(part.name)} — ${esc(part.vi)}</span>
          </div>`;
      }
      if (Array.isArray(part.questions) && part.questions.length > 0) {
        review.innerHTML += part.questions
          .map((q, qi) => {
            const given = answers[part.id + "_" + qi];
            const ok = given === q.a;
            return `
          <div class="trki-review-row ${ok ? 'is-correct' : 'is-wrong'}">
            <div class="trki-review-row-header">
              <div class="trki-review-num-wrap">
                <span class="trki-review-num">Câu ${qi + 1}</span>
                <span class="trki-review-pill ${ok ? 'pass' : 'fail'}">
                  ${ok ? '✓ Đúng' : '✕ Sai'}
                </span>
              </div>
            </div>
            <p class="trki-review-prompt ru">${esc(q.q)}</p>
            <div class="trki-review-answers-grid">
              <div class="trki-review-ans-col">
                <span class="trki-ans-label">Bạn chọn:</span>
                <span class="trki-ans-val ru ${ok ? 'pass' : 'fail'}">${given !== undefined ? esc(q.options[given]) : "— bỏ trống —"}</span>
              </div>
              ${ok ? "" : `
                <div class="trki-review-ans-col">
                  <span class="trki-ans-label">Đáp án đúng:</span>
                  <span class="trki-ans-val ru pass">${esc(q.options[q.a])}</span>
                </div>
              `}
            </div>
            ${q.ex ? `
            <div class="trki-review-expl">
              <span class="trki-expl-icon">${typeof RusiIcons !== "undefined" ? RusiIcons.get("lightbulb", { size: 16 }) : "💡"}</span>
              <div class="trki-expl-content">
                <b class="trki-expl-title">Giải thích:</b>
                <span class="trki-expl-text">${esc(q.ex)}</span>
              </div>
            </div>` : ""}
          </div>`;
          })
          .join("");
      } else if (Array.isArray(part.writing_tasks)) {
        review.innerHTML += part.writing_tasks.map((wt, wti) => {
          const wId = "write_" + part.id + "_" + wti;
          const userText = answers[wId] || "";
          return `
            <div class="trki-review-row" style="border-left-color: var(--primary)">
              <div class="trki-review-row-header">
                <div class="trki-review-num-wrap">
                  <span class="trki-review-num">Bài tự luận ${wti + 1}</span>
                  <span class="trki-review-pill pass" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                    ${esc(wt.type || "Tự luận")}
                  </span>
                </div>
              </div>
              <p class="trki-review-prompt ru">${esc(wt.title)}</p>
              <div class="trki-review-expl">
                <div class="trki-expl-content">
                  <b class="trki-expl-title">Bài làm đã nộp của bạn:</b>
                  <div class="trki-expl-text" style="white-space:pre-wrap;margin-top:4px">${esc(userText) || "— Chưa nộp bài viết —"}</div>
                </div>
              </div>
            </div>`;
        }).join("");
      }
    });

    el("#btnReviewBack").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    el("#btnRetryTop").onclick = () => startTest(currentTest, activePartId, examMode);
    if (el("#retryTest")) el("#retryTest").onclick = () => startTest(currentTest, activePartId, examMode);
    if (el("#btnBackToHub")) el("#btnBackToHub").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); };
    if (window.RusiIcons && typeof RusiIcons.replace === "function") {
      RusiIcons.replace(host);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkResumeActiveExam = () => {
    try {
      const activeId = sessionStorage.getItem("trki_active_exam_id");
      const activePart = sessionStorage.getItem("trki_active_part_id");
      const activeMode = sessionStorage.getItem("trki_exam_mode") || "exam";
      if (activeId) {
        const found = bank.find(t => t.id === activeId);
        const partParam = (!activePart || activePart === "full")
          ? null
          : (activePart.includes(",") ? activePart.split(",") : [activePart]);
        const pKeyStr = partParam ? partParam.join("-") : "full";
        const storageKey = "trki_exam_" + activeId + "_" + pKeyStr + "_" + activeMode;
        const storedEndTime = parseInt(sessionStorage.getItem(storageKey + "_endTime") || "0", 10);
        if (found && (activeMode === "practice" || storedEndTime > Date.now())) {
          startTest(found, partParam, activeMode);
          return true;
        }
      }
    } catch(e) {}
    return false;
  };

  if (!checkUrlExam() && !checkResumeActiveExam()) {
    renderHub();
  }
}
window.initMockTestPage = initMockTestPage;
window._initMockTestPage = initMockTestPage;
