/**
 * RUSI TRKI — page-vocab.js
 * Phân hệ trang: initVocabPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initVocabPage() {
  let algorithmInited = false;

  const showMainLayout = () => {
    window.currentActiveJarId = null;
    document.body.classList.remove("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.remove("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.add("hidden");
      detail.innerHTML = "";
    }
    const shelfHost = el("#jarsShelfHost");
    if (shelfHost) shelfHost.classList.remove("hidden");
    renderVocabHub();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.exitSrsToVocab = showMainLayout;
  let srsReviewSnapshot = null;

  const showSrsWorkspace = () => {
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/vocabulary/srs');
    }
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?srs=1")) return;
    // Thu thập danh sách từ cần ôn tập theo Spaced Repetition (ưu tiên từ due / đang học)
    let reviewWords = [];
    const allJars = getVocabJars();
    const wordMap = new Map();
    allJars.forEach(j => {
      if (j.raw && Array.isArray(j.raw.words)) {
        j.raw.words.forEach(w => {
          if (w.ru) wordMap.set(w.ru.toLowerCase().trim(), w);
        });
      }
    });

    if (typeof SRS !== "undefined" && SRS.getState) {
      try {
        const st = SRS.getState();
        const dueCards = SRS.getDueCards(st, 50);
        if (dueCards && dueCards.length) {
          reviewWords = dueCards.map(c => {
            const orig = wordMap.get((c.ru || "").toLowerCase().trim()) || {};
            return {
              ...orig,
              ...c,
              ru: c.ru || orig.ru,
              stress: rusiStressCase(c.stress || orig.stress || c.ru || orig.ru, c.ru || orig.ru),
              vi: c.vi || orig.vi,
              pos: c.pos || orig.pos || "",
              gender: c.gender || orig.gender || "",
              note: c.note || orig.note || c.pos || "",
              ex: c.ex || orig.ex || "",
              ex_vi: c.ex_vi || orig.ex_vi || "",
              collocation: c.collocation || orig.collocation || "",
              syn: c.syn || orig.syn || "",
              ant: c.ant || orig.ant || ""
            };
          });
        }
      } catch (e) {
        console.warn("Lỗi lấy thẻ đến hạn:", e);
      }
    }

    // Không có thẻ đến hạn → hiện trạng thái trống (không lấy từ chưa đến hạn vào phiên ôn)
    const hasDue = reviewWords.length > 0;
    // Mốc để dựng lại khi dữ liệu cloud về trong lúc chưa chấm thẻ nào (xem trki:progress-updated)
    srsReviewSnapshot = {
      dueKey: reviewWords.map(w => w.id).join("|"),
      reviewed: (typeof SRS !== "undefined" && SRS.getState) ? SRS.getState().today.reviewed : 0,
      changedAt: STORE.get("vocab_changed_at", 0) // đổi khi học viên tự thao tác (chấm thẻ, đánh dấu thuộc...)
    };

    // Mở trực tiếp không gian học Flashcard chuẩn y hệt như ở Lọ từ vựng (Chuẩn yêu cầu người dùng)
    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.remove("hidden");
      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR WITH EMBEDDED MODES (SINGLE LINE) -->
        <div class="rusi-workspace-back-bar rusi-quizlet-bar" id="rusiQuizletBackBar">
          <button type="button" class="rusi-back-btn" id="btnBackJars" title="Quay lại kho từ vựng" aria-label="Quay lại kho từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="rusi-workspace-info">
            <span class="rusi-badge rusi-badge-cat" data-srs-review="1">SRS</span>
            <span class="rusi-workspace-title">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 18 }) : ""} Ôn tập (${reviewWords.length} từ)</span>
          </div>
          ${hasDue ? `<div class="quizlet-mode-bar rusi-topbar-modes" id="rusiTopbarModes">
            <button type="button" class="quizlet-mode-btn" data-mode="list" title="Danh sách từ (${reviewWords.length})">
              ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách (${reviewWords.length})</span>
            </button>
            <button type="button" class="quizlet-mode-btn active" data-mode="flashcard" title="Thẻ ghi nhớ Flashcard">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Flashcard</span>
            </button>
            <button type="button" class="quizlet-mode-btn" data-mode="learn" title="Trắc nghiệm">
              ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
            </button>
            <button type="button" class="quizlet-mode-btn" data-mode="write" title="Gõ từ & Chính tả">
              ${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 16 }) : ""} <span class="btn-text">Gõ từ</span>
            </button>
            <button type="button" class="quizlet-mode-btn" data-mode="match" title="Ghép từ">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép từ</span>
            </button>
          </div>` : ""}
        </div>

        <div class="workspace" style="padding:14px 4px;border:none;background:transparent;box-shadow:none">
          ${hasDue ? `<div id="jarQuizletSuiteHost"></div>` : `
          <div class="writing-empty-state vocab-empty-state topic-empty-state">
            <span class="writing-empty-icon vocab-empty-icon">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 34 }) : ""}</span>
            <h3>Không có từ nào tới hạn cần ôn tập hôm nay</h3>
            <p>Tuyệt vời! Bạn đã hoàn thành tất cả các phiên ôn tập hôm nay.</p>
            <button type="button" class="btn btn-primary" id="btnSrsEmptyToJars">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""} Quay lại kho từ vựng</button>
          </div>`}
        </div>
      `;

      el("#btnBackJars").onclick = () => {
        showMainLayout();
      };
      const btnEmpty = el("#btnSrsEmptyToJars");
      if (btnEmpty) btnEmpty.onclick = () => showMainLayout();

      if (hasDue) window.initQuizletSuite(el("#jarQuizletSuiteHost"), reviewWords, {
        jarId: "srs_quick_review",
        jarTitle: "Ôn tập Spaced Repetition",
        initialMode: "flashcard",
        onWordListChange: () => {
          showSrsWorkspace();
        }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ---------- BỘ LỌC THÔNG MINH CHO TỪ VỰNG ---------- */
  /* ---------- DANH SÁCH LỌ TỪ VỰNG ---------- */
  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let cloudJars = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("jars:system") : null;

  const loadCloudJars = async () => {
    // 0-Egress rule: Nạp từ RAM/IndexedDB/CDN JSON trước, chỉ truy vấn Supabase nếu vẫn chưa có dữ liệu
    if (window.RusiDataLoader && (!window.RusiDataLoader.isLoaded("VOCAB_JARS") || !window.RusiDataLoader.isLoaded("VOCAB_LESSONS"))) {
      await window.RusiDataLoader.loadMultiple(["VOCAB_JARS", "TOPIC_ARTICLES", "VOCAB_LESSONS"]);
      if (!document.body.classList.contains("in-workspace")) {
        renderVocabCards();
      }
    }
    if (window.VOCAB_JARS && window.VOCAB_JARS.length > 0) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.jars.getSystemJars();
        if (remote && remote.length) {
          cloudJars = remote;
          console.log(`[Supabase] Đã kết nối & lấy ${remote.length} lọ từ vựng từ Database!`);
          renderVocabCards();
        }
      } catch (err) {
        console.warn("[Supabase] Không thể tải dữ liệu từ vựng đám mây:", err);
      }
    }
  };
  loadCloudJars();

  const getVocabJars = () => {
    const customJars = STORE.get("custom_jars", []);
    const baseJars = (cloudJars && cloudJars.length) ? cloudJars : ((typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS)) ? VOCAB_JARS : []);
    // Loại bỏ toàn bộ lọ từ cá nhân khỏi danh sách bài học theo cấp độ (A1, A2...)
    const systemJars = baseJars.filter(j => j.is_system !== false && !String(j.id).startsWith("custom-"));
    const jars = systemJars.map(j => {
      const rawJarWords = (j.words && j.words.length)
        ? j.words
        : ((typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS))
          ? ((VOCAB_JARS.find(x => x.id === j.id || x.code === j.id || x.id === j.code || x.code === j.code) || {}).words || [])
          : []);
      // Khử từ vựng trùng lặp bên trong lọ nếu có
      const seenW = new Set();
      const jarWords = [];
      rawJarWords.forEach(w => {
        const k = ((w && (w.ru || w.word_normalized)) || "").trim().toLowerCase();
        if (k && seenW.has(k)) return;
        if (k) seenW.add(k);
        jarWords.push(w);
      });
      return {
        id: j.id,
        code: j.code || j.id,
        kind: "jar",
        level: j.level || "A1",
        levelName: j.levelName || (j.level === "B2" ? "Trung cấp cao B2" : j.level === "B1" ? "Trung cấp B1" : j.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
        title: j.name || j.title,
        name: j.name || j.title,
        desc: j.desc || j.description || "",
        icon: j.icon || "archive-jar",
        wordsCount: jarWords.length || j.word_count || 0,
        is_pro_only: Boolean(j.is_pro_only || j.is_pro || j.is_vip),
        words: jarWords,
        article: j.article || null,
        raw: j
      };
    });
    return jars;
  };

  const renderVocabCards = () => {
    const gridHost = el("#vocabCardsGrid");
    if (!gridHost) return;

    const allItems = getVocabJars();
    const countA1 = allItems.filter(i => i.level === "A1").length;
    const countA2 = allItems.filter(i => i.level === "A2").length;
    const countB1 = allItems.filter(i => i.level === "B1").length;
    const countB2 = allItems.filter(i => i.level === "B2").length;
    const countC1 = allItems.filter(i => i.level === "C1").length;
    const countC2 = allItems.filter(i => i.level === "C2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#countA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#countA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#countB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#countB2"); if (cB2) cB2.textContent = countB2;
    const cC1 = el("#countC1"); if (cC1) cC1.textContent = countC1;
    const cC2 = el("#countC2"); if (cC2) cC2.textContent = countC2;

    const shelfHost = el("#jarsShelfHost");
    if (shelfHost) {
      shelfHost.querySelectorAll(".level-tab").forEach(b => {
        const isActive = b.dataset.level === currentLevel;
        b.classList.toggle("level-tab-active", isActive);
        b.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }

    const filtered = allItems.filter(item => item.level === currentLevel);

    const doneCount = filtered.filter(item => Progress.doneList("vocabDone").includes(item.id)).length;
    const totalCount = filtered.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state vocab-empty-state topic-empty-state">
          <span class="writing-empty-icon vocab-empty-icon">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 34 }) : ""}</span>
          <h3>Chưa có lọ từ vựng cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((item, idx) => {
        const isDone = Progress.doneList("vocabDone").includes(item.id);
        const isPro = Boolean(item.is_pro_only);
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String(idx + 1).padStart(2, "0");
        const wordsCount = item.wordsCount || (item.words ? item.words.length : 0);
        const lessonsCount = Math.ceil(wordsCount / 10) || 1;
        const topicDesc = item.desc || `${wordsCount} từ vựng cốt lõi · ${lessonsCount} bài học`;

        // So khớp không phân biệt hoa thường/dấu nhấn (danh sách đã thuộc lưu từ như viết, vd. "Москва")
        const normWord = (s) => String(s || "").replace(/[\u0300\u0301]/g, "").trim().toLowerCase();
        const masteredSet = new Set(((typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : []).map(normWord));
        let masteredInJar = 0;
        if (Array.isArray(item.words) && item.words.length > 0) {
          item.words.forEach(w => {
            const k = normWord(w.ru);
            if (masteredSet.has(k)) masteredInJar++;
          });
        }
        const progressPercent = isDone ? 100 : (wordsCount > 0 ? Math.min(100, Math.round((masteredInJar / wordsCount) * 100)) : 0);
        const isFinished = isDone || (progressPercent === 100 && wordsCount > 0);

        return `
          <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .rusi-card-compact (Đồng bộ toàn hệ thống, không có thanh tiến độ) -->
          <article class="rusi-card rusi-card-compact ${isFinished ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-vocab-id="${esc(item.id)}" data-kind="jar" data-pro="${isPro}">
            <div class="rusi-card-header">
              <div class="rusi-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                ${window.RusiIcons ? RusiIcons.get(item.icon || "archive-jar", { size: 24 }) : ""}
              </div>
              <div class="rusi-card-header-main">
                <div class="rusi-card-title-row">
                  <h3 class="rusi-card-ru">${esc(item.title)}</h3>
                  ${isFinished ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : ""}
                </div>
                <div class="rusi-card-subinfo">
                  <span>${item.level || currentLevel}</span>
                  <span class="rusi-card-sep">•</span>
                  <span class="rusi-card-count">${wordsCount} từ vựng</span>
                </div>
              </div>
            </div>

            <!-- CHÂN THẺ -->
            <div class="rusi-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
              <div class="topic-footer-actions">
                ${isPro && !isUnlocked ? `
                  <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                    ${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 16 }) : ""}
                  </span>
                ` : `
                  <button type="button" class="btn-jar-list topic-text-btn" data-jar-id="${esc(item.id)}" title="Mở danh sách Lọ từ vựng để học Flashcard Spaced Repetition">
                    ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} Lọ từ vựng
                  </button>
                  <button type="button" class="btn-topic-article topic-circle-btn" data-jar-id="${esc(item.id)}" title="Xem bài học chủ đề">
                    ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : ""}
                  </button>
                `}
              </div>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-jar-list").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.jarId;
          const jar = allItems.find(j => j.id === id);
          if (jar && jar.is_pro_only && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng nâng cao và ôn tập không giới hạn.");
            return;
          }
          showJarDetail(id, "list");
        };
      });

      gridHost.querySelectorAll(".btn-topic-article").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.jarId;
          const jar = allItems.find(j => j.id === id);
          if (jar && jar.is_pro_only && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chủ đề và kho từ vựng nâng cao.");
            return;
          }
          showTopicArticle(id);
        };
      });

      gridHost.querySelectorAll(".rusi-card, .topic-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button")) return;
          const id = card.dataset.vocabId;
          const jar = allItems.find(j => j.id === id);
          if (jar && jar.is_pro_only && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chủ đề và kho từ vựng nâng cao.");
            return;
          }
          showTopicArticle(id);
        };
      });
    }

    renderRusiPagination(el("#vocabPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderVocabCards();
    }, { remainingCount, unit: "bài" });

    renderVocabSidebar();
  };

  const renderVocabHub = () => {
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/vocabulary');
    }
    const shelfHost = el("#jarsShelfHost");
    if (!shelfHost) return;
    const detail = el("#jarDetailHost");
    if (detail) detail.classList.add("hidden");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.remove("hidden");
    shelfHost.classList.remove("hidden");

    let section = el("#vocabSection");
    if (!section) {
      shelfHost.innerHTML = `
        <section class="vocabulary-section" id="vocabSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  Chinh phục 5.000 từ tiếng Nga<br />
                  <span>Học chủ đề &amp; chuỗi hành động</span>
                </h1>
              </div>
            </div>

            <!-- THẺ TIẾN ĐỘ HỌC TỪ VỰNG CHUẨN FIGMA (Đặt trước Level Tabs theo thiết kế https://rigor-hall-40167838.figma.site/vocabulary) -->
            <div id="vocabProgressHorizontalHost" style="margin-bottom: 28px;"></div>

            <div class="level-tabs" role="tablist" aria-label="Chọn cấp độ từ vựng" id="vocabLevelTabs">
              <button class="level-tab ${currentLevel === "A1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A1">
                <span class="level-code">A1</span>
                <small>Sơ cấp</small>
                <span class="level-tab-count" id="countA1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "A2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A2">
                <span class="level-code">A2</span>
                <small>Cơ bản</small>
                <span class="level-tab-count" id="countA2">0</span>
              </button>
              <button class="level-tab ${currentLevel === "B1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B1">
                <span class="level-code">B1</span>
                <small>Trung cấp</small>
                <span class="level-tab-count" id="countB1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "B2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B2">
                <span class="level-code">B2</span>
                <small>Trung cấp cao</small>
                <span class="level-tab-count" id="countB2">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C1">
                <span class="level-code">C1</span>
                <small>Cao cấp</small>
                <span class="level-tab-count" id="countC1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C2">
                <span class="level-code">C2</span>
                <small>Thành thạo</small>
                <span class="level-tab-count" id="countC2">0</span>
              </button>
            </div>

            <div class="topic-grid" id="vocabCardsGrid"></div>
            <div class="rusi-pagination" id="vocabPagination"></div>

            <!-- LỌ TỪ VỰNG CỦA BẠN (SAU THANH TIẾN ĐỘ) -->
            <div id="vocabUserJarsHost"></div>
          </div>
        </section>
      `;

      // Event listener Level tabs
      shelfHost.querySelectorAll(".level-tab").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderVocabCards();
        };
      });
    }

    renderVocabCards();
    renderVocabSidebar();
  };

  const renderVocabSidebar = () => {
    const progressHost = el("#vocabProgressHorizontalHost");
    const userJarsHost = el("#vocabUserJarsHost");
    if (!progressHost && !userJarsHost) return;

    const syncStats = (typeof window.getSynchronizedVocabStats === "function")
      ? window.getSynchronizedVocabStats()
      : { mastered: 0, dueCount: 0, newCount: 0, streak: 0 };
    const stats = { mastered: syncStats.mastered, newCount: syncStats.newCount };
    const dueCount = syncStats.dueCount;
    const streak = syncStats.streak;

    let customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
    if (!customJars || !customJars.length) {
      customJars = [{
        id: "custom-jar-default",
        name: "Lọ yêu thích",
        icon: "archive-jar",
        desc: "Lọ chứa các từ vựng bạn yêu thích và đã lưu",
        words: [],
        level: "custom",
        is_system: false
      }];
      if (typeof STORE !== "undefined") STORE.set("custom_jars", customJars);
    } else {
      // Đổi tên và icon thành "Lọ yêu thích" cho lọ mặc định
      let changed = false;
      customJars.forEach(j => {
        if (j.id === "custom-jar-default") {
          const targetName = "Lọ yêu thích";
          if (j.name !== targetName || j.icon !== "archive-jar") {
            j.name = targetName;
            j.icon = "archive-jar";
            changed = true;
          }
        }
              if (j.level === "A1" || j.level === "A2" || !j.level) {
          j.level = "custom";
          changed = true;
        }
        if (j.is_system !== false) {
          j.is_system = false;
          changed = true;
        }
      });
      if (changed && typeof STORE !== "undefined") STORE.set("custom_jars", customJars);
    }

    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    if (progressHost) {
      progressHost.style.display = "block";
      progressHost.innerHTML = `
        <div class="voc-progress-figma-card" id="vocProgressFigmaCard">
          <!-- CỤM TRÁI: ICON + TIÊU ĐỀ + PHỤ ĐỀ (Figma: progress icon + Tiến Độ Học Ôn + Lặp lại ngắt quãng SM-2) -->
          <div class="voc-progress-figma-left">
            <span class="voc-progress-figma-icon">
              ${window.RusiIcons ? RusiIcons.get("trending-up", { size: 20 }) : `<svg aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`}
            </span>
            <div>
              <strong class="voc-progress-figma-title">Tiến độ học từ vựng</strong>
            </div>
          </div>

          <!-- 4 Ô CHỈ SỐ THỐNG KÊ (Đồng bộ màu chuẩn với trang vocabulary, giữ nguyên giao diện gốc, nhấp xem danh sách từ) -->
          <div class="voc-progress-figma-stat" id="statMastered" style="cursor:pointer" title="Nhấp để xem danh sách từ đã thuộc">
            <strong class="voc-progress-figma-num val-mastered">${stats.mastered || 0}</strong>
            <span class="voc-progress-figma-label">ĐÃ THUỘC</span>
          </div>

          <div class="voc-progress-figma-stat ${dueCount > 0 ? "is-due" : ""}" id="statDue" style="cursor:pointer" title="Nhấp để xem danh sách từ cần ôn">
            <strong class="voc-progress-figma-num val-due">${dueCount}</strong>
            <span class="voc-progress-figma-label">CẦN ÔN</span>
          </div>

          <div class="voc-progress-figma-stat" id="statNew" style="cursor:pointer" title="Nhấp để xem danh sách từ mới">
            <strong class="voc-progress-figma-num val-new">${stats.newCount || 0}</strong>
            <span class="voc-progress-figma-label">TỪ MỚI</span>
          </div>

          <div class="voc-progress-figma-stat">
            <strong class="voc-progress-figma-num val-streak">${streak} ngày</strong>
            <span class="voc-progress-figma-label">CHUỖI NGÀY</span>
          </div>

          <!-- NÚT CTA (Figma: bg #c52233, rounded-xl, Ôn tập ngay) -->
          <button type="button" class="btn voc-progress-figma-btn" id="btnSidebarQuickSrs">
            Ôn tập ngay
          </button>
        </div>
      `;
    }

    if (userJarsHost) {
      userJarsHost.innerHTML = `
        <section class="voc-user-jars-section">
          <div class="voc-user-jars-header">
            <div class="voc-user-jars-header-text">
              <h3>${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 22 }) : ""} Lọ Từ Vựng Của Bạn</h3>
              <p>Tập hợp các lọ từ cá nhân bạn đã tạo để gom nhóm từ và ôn luyện riêng theo sở thích.</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm" id="btnSidebarCreateJar" style="font-weight:700;padding:8px 16px;border-radius:8px">
              + Tạo lọ mới
            </button>
          </div>

          <div class="voc-user-jars-grid">
            ${customJars.map(j => {
              const wCount = (j.words || []).length;
              const isDefault = j.id === "custom-jar-default";
              const jarDisplayName = isDefault ? "Lọ yêu thích" : (j.name || "Lọ từ vựng");
              return `
                <div class="voc-user-jar-card" data-jar-id="${esc(j.id)}">
                  <div class="voc-user-jar-card-top">
                    <div class="voc-user-jar-card-icon">
                      ${window.RusiIcons ? RusiIcons.get(j.icon || "archive-jar", { size: 20 }) : ""}
                    </div>
                    <div style="flex:1;min-width:0">
                      <div class="voc-user-jar-card-name" title="${esc(jarDisplayName)}">${esc(jarDisplayName)}</div>
                      <div class="voc-user-jar-card-count">${wCount} từ vựng</div>
                    </div>
                  </div>
                  <div class="voc-user-jar-card-actions">
                    <button type="button" class="btn btn-soft btn-sm voc-btn-study-jar" data-jar-id="${esc(j.id)}" style="flex:1;font-weight:700" title="Học lọ này">
                      Học flashcard
                    </button>
                    ${!isDefault ? `
                      <button type="button" class="btn btn-soft btn-sm voc-btn-del-jar" data-jar-id="${esc(j.id)}" data-jar-name="${esc(j.name)}" style="color:var(--red);padding:6px 10px" title="Xóa lọ này">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""}</button>
                    ` : ""}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </section>
      `;
    }

    const btnQuick = el("#btnSidebarQuickSrs");
    if (btnQuick) {
      btnQuick.onclick = () => {
        showSrsWorkspace();
      };
    }

    const statMastered = el("#statMastered");
    if (statMastered) {
      statMastered.onclick = () => window.openVocabProgressWordsModal("mastered");
    }
    const statDue = el("#statDue");
    if (statDue) {
      statDue.onclick = () => window.openVocabProgressWordsModal("due");
    }
    const statNew = el("#statNew");
    if (statNew) {
      statNew.onclick = () => window.openVocabProgressWordsModal("new");
    }

    const btnCreateTop = el("#btnSidebarCreateJar") || el("#btnSidebarCreateJarTop");
    if (btnCreateTop) {
      btnCreateTop.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html")) return;
        openCreateJarModal();
      };
    }

    const jarsContainer = userJarsHost;
    if (jarsContainer) {
      // Cho phép bấm trực tiếp vào bất kỳ vị trí nào trên thẻ Lọ từ vựng
      jarsContainer.querySelectorAll(".voc-user-jar-card").forEach(card => {
        card.style.cursor = "pointer";
        card.onclick = (e) => {
          if (e.target.closest("button") || e.target.closest(".voc-user-jar-card-actions")) return;
          const jId = card.dataset.jarId;
          if (jId) showJarDetail(jId, "list");
        };
      });

      jarsContainer.querySelectorAll(".voc-btn-study-jar").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const jId = btn.dataset.jarId;
          if (jId) showJarDetail(jId, "list");
        };
      });

      jarsContainer.querySelectorAll(".voc-btn-del-jar").forEach(btn => {
        btn.onclick = () => {
          const jId = btn.dataset.jarId;
          const jName = btn.dataset.jarName || "lọ từ này";
          if (confirm(`Bạn có chắc muốn xóa lọ “${jName}” không?`)) {
            let jars = STORE.get("custom_jars", []);
            jars = jars.filter(j => j.id !== jId);
            STORE.set("custom_jars", jars);
            toast(`Đã xóa lọ “${jName}”`);
            renderVocabCards();
          }
        };
      });
    }
  };

  
  /**
   * Modal xem danh sách từ vựng theo tiến độ: Đã thuộc · Cần ôn · Từ mới
   */
  window.openVocabProgressWordsModal = function(initialTab = "mastered") {
    let currentTab = initialTab;
    let searchTxt = "";

    let modal = document.getElementById("vocProgressWordsModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "vocProgressWordsModal";
      modal.className = "anticheat-modal";
      document.body.appendChild(modal);
    }

    const renderModalContent = () => {
      // 1. Phân loại theo tiến độ:
      // Tập hợp các từ đã thuộc (Mastered)
      // Khoá so khớp: bỏ dấu nhấn như SRS._norm để "собака" và "соба́ка" là một từ
      const normKey = (ru) => String(ru || "").replace(/[\u0300\u0301]/g, "").toLowerCase().trim();
      const masteredListRaw = (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
      const masteredSet = new Set(masteredListRaw.map(normKey));

      let srsState = null;
      if (typeof SRS !== "undefined" && SRS.getState) {
        try { srsState = SRS.getState(); } catch (e) {}
      }
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (c.mastered && c.ru) {
            masteredSet.add(normKey(c.ru));
          }
        });
      }

      // Tập hợp các từ cần ôn (Due)
      const now = Date.now();
      const dueSet = new Set();
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (!c.mastered && c.dueDate <= now && c.ru) {
            dueSet.add(normKey(c.ru));
          }
        });
      }

      // 2. Gom từ vựng thuộc phạm vi học tập thực tế của người dùng:
      // (Bao gồm thẻ trong SRS của người dùng và các từ đã lưu vào Lọ cá nhân / Lọ yêu thích)
      const masteredList = [];
      const dueList = [];
      const newList = [];
      const seenRu = new Set();
      const customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];

      // Danh sách chỉ gồm từ học viên học trong các lọ (lọ cá nhân ưu tiên, rồi lọ hệ thống).
      // Thẻ SRS không thuộc lọ nào (bộ từ khởi đầu, từ lọ cũ đã đổi) không hiện — dữ liệu SRS vẫn giữ nguyên.
      const jarOfWord = new Map();
      const indexJarWords = (jar) => (jar.words || []).forEach(w => {
        const k = w && normKey(w.ru);
        if (k && !jarOfWord.has(k)) jarOfWord.set(k, jar.name);
      });
      (customJars || []).forEach(jar => { if (jar && jar.name) indexJarWords(jar); });
      try { getVocabJars().forEach(jar => { if (jar && jar.name) indexJarWords(jar); }); }
      catch (e) { console.warn("Không dựng được bảng từ → lọ hệ thống:", e); }
      // Thẻ cũ dạng cặp "студе́нт — студе́нтка" khớp theo vế đầu khi lọ chỉ còn "студент"
      const jarNameOf = (ru) => {
        const k = normKey(ru);
        return jarOfWord.get(k) || jarOfWord.get(k.split(/\s+[—–-]\s+/)[0]) || "";
      };

      // Từ trong SRS cards của người dùng
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (!c || !c.ru) return;
          const k = normKey(c.ru);
          if (seenRu.has(k)) return;
          const jarName = jarNameOf(c.ru);
          if (!jarName) return;
          seenRu.add(k);

          const wordItem = {
            ru: c.ru,
            stress: rusiStressCase(c.stress || c.ru, c.ru),
            vi: c.vi || "",
            pos: c.pos || "",
            level: c.level || "A1",
            jarTitle: c.jarTitle || jarName
          };

          if (c.mastered || masteredSet.has(k)) {
            masteredList.push(wordItem);
          } else if (c.dueDate <= now) {
            dueList.push(wordItem);
          } else if (c.isNew || c.repetitions === 0) {
            newList.push(wordItem);
          }
        });
      }

      // Từ trong Lọ cá nhân / Lọ yêu thích của người dùng (custom_jars)
      (customJars || []).forEach(jar => {
        (jar.words || []).forEach(w => {
          if (!w || !w.ru) return;
          const k = normKey(w.ru);
          if (seenRu.has(k)) return;
          seenRu.add(k);

          const wordItem = {
            ru: w.ru,
            stress: rusiStressCase(w.stress || w.ru, w.ru),
            vi: w.vi || "",
            pos: w.pos || "",
            level: w.level || jar.level || "custom",
            jarTitle: jar.name || "Lọ cá nhân"
          };

          if (masteredSet.has(k)) {
            masteredList.push(wordItem);
          } else if (dueSet.has(k)) {
            dueList.push(wordItem);
          } else {
            newList.push(wordItem);
          }
        });
      });

      // Bổ sung các từ người dùng đã đánh dấu thuộc (chưa có thẻ SRS) — chỉ khi từ thuộc một lọ
      masteredSet.forEach(ruKey => {
        if (seenRu.has(ruKey)) return;
        const jarName = jarNameOf(ruKey);
        if (!jarName) return;
        seenRu.add(ruKey);
        masteredList.push({ ru: ruKey, vi: "Từ đã thuộc", jarTitle: jarName });
      });

      let activeList = currentTab === "mastered" ? masteredList : currentTab === "due" ? dueList : newList;
      if (searchTxt) {
        const q = searchTxt.toLowerCase().trim();
        activeList = activeList.filter(w =>
          (w.ru && w.ru.toLowerCase().includes(q)) ||
          (w.vi && w.vi.toLowerCase().includes(q))
        );
      }

      modal.innerHTML = `
        <div class="anticheat-modal-box voc-progress-modal-box">
          <!-- HEADER -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-shrink:0">
            <div style="display:flex;align-items:center;gap:12px">
              <span style="width:40px;height:40px;border-radius:12px;background:var(--primary-soft,#e3effc);color:var(--primary,#1757a6);display:grid;place-items:center">
                ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 20 }) : "📚"}
              </span>
              <div>
                <h3 style="margin:0;font-size:1.15rem;font-weight:800;color:var(--text)">Danh Sách Từ Vựng Tiến Độ</h3>
                <span style="font-size:0.8rem;color:var(--muted)">Đồng bộ thời gian thực với tài khoản & SRS Cloud</span>
              </div>
            </div>
            <button type="button" id="closeProgressModal" class="btn btn-soft" style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer" title="Đóng">${window.RusiIcons ? RusiIcons.get("x", { size: 18 }) : "✕"}</button>
          </div>

          <!-- TABS THEO LEVEL-TAB STYLE -->
          <div class="voc-progress-modal-tabs" role="tablist" aria-label="Danh sách từ theo tiến độ">
            <button type="button" class="voc-pmodal-tab ${currentTab === "mastered" ? "active" : ""}" data-tab="mastered" role="tab" aria-selected="${currentTab === "mastered"}" tabindex="${currentTab === "mastered" ? 0 : -1}">
              <span class="voc-pmodal-tab-label">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : "✓"} Đã thuộc</span> <span class="voc-pmodal-count">(${masteredList.length})</span>
              ${currentTab === "mastered" ? '<span class="voc-pmodal-tab-indicator"></span>' : ""}
            </button>
            <button type="button" class="voc-pmodal-tab ${currentTab === "due" ? "active" : ""}" data-tab="due" role="tab" aria-selected="${currentTab === "due"}" tabindex="${currentTab === "due" ? 0 : -1}">
              <span class="voc-pmodal-tab-label">${window.RusiIcons ? RusiIcons.get("clock-time", { size: 16 }) : "⏰"} Cần ôn</span> <span class="voc-pmodal-count">(${dueList.length})</span>
              ${currentTab === "due" ? '<span class="voc-pmodal-tab-indicator"></span>' : ""}
            </button>
            <button type="button" class="voc-pmodal-tab ${currentTab === "new" ? "active" : ""}" data-tab="new" role="tab" aria-selected="${currentTab === "new"}" tabindex="${currentTab === "new" ? 0 : -1}">
              <span class="voc-pmodal-tab-label">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : "✨"} Từ mới</span> <span class="voc-pmodal-count">(${newList.length})</span>
              ${currentTab === "new" ? '<span class="voc-pmodal-tab-indicator"></span>' : ""}
            </button>
          </div>

          <!-- SEARCH BAR -->
          <div style="position:relative;margin-bottom:14px;flex-shrink:0">
            <input type="text" id="vocProgressSearchInput" placeholder="Tìm kiếm từ tiếng Nga hoặc nghĩa tiếng Việt..." value="${esc(searchTxt)}" style="width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:12px;font-size:0.9rem;box-sizing:border-box;background:var(--bg);color:var(--text)" />
            ${searchTxt ? `<button type="button" id="vocProgressSearchClear" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:1.1rem;cursor:pointer;color:var(--muted)">×</button>` : ""}
          </div>

          <!-- LIST CONTAINER -->
          <div class="voc-progress-words-list" style="flex:1 1 auto;overflow-y:auto;padding-right:4px;display:flex;flex-direction:column;gap:10px">
            ${activeList.length === 0 ? `
              <div style="text-align:center;padding:36px 16px;color:var(--muted)">
                <div style="margin-bottom:12px;color:var(--primary);display:flex;justify-content:center">
                  ${window.RusiIcons ? (currentTab === "mastered" ? RusiIcons.get("trophy", { size: 44 }) : currentTab === "due" ? RusiIcons.get("check-circle-correct", { size: 44 }) : RusiIcons.get("book-open", { size: 44 })) : (currentTab === "mastered" ? "🏆" : currentTab === "due" ? "🎉" : "📖")}
                </div>
                <div style="font-weight:700;font-size:1rem;color:var(--text);margin-bottom:4px">
                  ${currentTab === "mastered" ? "Chưa có từ nào được đánh dấu đã thuộc" : currentTab === "due" ? "Không có từ nào tới hạn cần ôn tập hôm nay" : "Đã học toàn bộ từ vựng"}
                </div>
                <div style="font-size:0.85rem">
                  ${currentTab === "mastered" ? "Hãy nhấn dấu tích ✓ ở các từ vựng bạn đã nhớ trong danh sách hoặc flashcard để lưu vào đây!" : currentTab === "due" ? "Tuyệt vời! Bạn đã hoàn thành tất cả các phiên ôn tập hôm nay." : "Toàn bộ từ vựng đã được bắt đầu học hoặc đưa vào hàng đợi SRS."}
                </div>
              </div>
            ` : activeList.map((w, idx) => {
              const displayWord = w.stress || w.ru;
              return `
                <div class="voc-pmodal-row">
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
                      <strong class="ru voc-pmodal-word" data-speak-ru="${esc(w.ru)}" title="Nhấn để nghe phát âm">${esc(displayWord)}</strong>
                      ${w.pos ? `<span class="voc-pmodal-pos">(${esc(window.formatRussianGrammar ? window.formatRussianGrammar(w.pos, null, w.gender) : w.pos)})</span>` : ""}
                      ${w.jarTitle ? `<span class="voc-pmodal-tag">${esc(w.jarTitle)}</span>` : ""}
                    </div>
                    <div class="voc-pmodal-vi">${esc(w.vi || "")}</div>
                    ${w.ex ? `<div class="ru voc-pmodal-ex">${esc(stripQuotes(w.ex))}</div>` : ""}
                  </div>

                  <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <button type="button" class="btn btn-soft btn-sm btn-pmodal-speak" data-ru="${esc(w.ru)}" data-audio="${esc(w.audio_url || w.audio || '')}" style="width:36px;height:36px;padding:0;border-radius:10px;display:grid;place-items:center;cursor:pointer" title="Nghe phát âm">
                      ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : "🔊"}
                    </button>
                    ${currentTab === "mastered" ? `
                      <button type="button" class="btn btn-soft btn-sm btn-pmodal-unmaster" data-ru="${esc(w.ru)}" style="padding:6px 10px;font-size:0.8rem;border-radius:8px;color:var(--muted);cursor:pointer" title="Bỏ khỏi danh sách đã thuộc để tiếp tục ôn tập">
                        Hủy thuộc
                      </button>
                    ` : currentTab === "due" ? `
                      <button type="button" class="btn btn-primary btn-sm btn-pmodal-study-one" data-ru="${esc(w.ru)}" style="padding:6px 12px;font-size:0.8rem;font-weight:700;border-radius:8px;cursor:pointer">
                        Ôn ngay
                      </button>
                    ` : `
                      <button type="button" class="btn btn-outline btn-sm btn-pmodal-add-queue" data-ru="${esc(w.ru)}" style="padding:6px 10px;font-size:0.8rem;border-radius:8px;cursor:pointer">
                        + Học từ này
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;

      modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
      };
      const btnClose = modal.querySelector("#closeProgressModal");
      if (btnClose) btnClose.onclick = () => modal.remove();

      const selectTab = (tabKey) => {
        currentTab = tabKey;
        searchTxt = "";
        renderModalContent();
        // Modal được dựng lại → trả focus về tab vừa chọn (người dùng bàn phím không mất vị trí)
        const activeTab = modal.querySelector(`.voc-pmodal-tab[data-tab="${tabKey}"]`);
        if (activeTab) activeTab.focus();
      };
      const tabEls = Array.from(modal.querySelectorAll(".voc-pmodal-tab"));
      tabEls.forEach((tab, i) => {
        tab.onclick = () => selectTab(tab.dataset.tab);
        tab.onkeydown = (e) => {
          if (e.ctrlKey || e.metaKey || e.altKey) return;
          let next = -1;
          if (e.key === "ArrowRight") next = (i + 1) % tabEls.length;
          else if (e.key === "ArrowLeft") next = (i - 1 + tabEls.length) % tabEls.length;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = tabEls.length - 1;
          if (next < 0) return;
          e.preventDefault();
          selectTab(tabEls[next].dataset.tab);
        };
      });
      // Chỉ làm mờ mép phải khi dải tab thật sự tràn (cuộn ngang được)
      const tabBar = modal.querySelector(".voc-progress-modal-tabs");
      if (tabBar) {
        const markOverflow = () => tabBar.classList.toggle("is-overflowing", tabBar.scrollWidth - tabBar.clientWidth > 1 && tabBar.scrollLeft + tabBar.clientWidth < tabBar.scrollWidth - 1);
        markOverflow();
        tabBar.onscroll = markOverflow;
        const activeTab = tabBar.querySelector(".voc-pmodal-tab.active");
        if (activeTab && tabBar.scrollWidth > tabBar.clientWidth) activeTab.scrollIntoView({ block: "nearest", inline: "nearest" });
      }

      const inpSearch = modal.querySelector("#vocProgressSearchInput");
      if (inpSearch) {
        inpSearch.oninput = (e) => {
          searchTxt = e.target.value;
          renderModalContent();
          const nextInp = modal.querySelector("#vocProgressSearchInput");
          if (nextInp) {
            nextInp.focus();
            nextInp.selectionStart = nextInp.selectionEnd = nextInp.value.length;
          }
        };
      }
      const clearSearch = modal.querySelector("#vocProgressSearchClear");
      if (clearSearch) {
        clearSearch.onclick = () => {
          searchTxt = "";
          renderModalContent();
        };
      }

      modal.querySelectorAll("[data-speak-ru], .btn-pmodal-speak").forEach(el => {
        el.onclick = (e) => {
          e.stopPropagation();
          const ru = el.dataset.speakRu || el.dataset.ru;
          const audio = el.dataset.audio || "";
          if (ru) {
            if (typeof playWordAudio === "function") playWordAudio(ru, audio);
            else if (typeof speak === "function") speak(ru);
            else if (window.TTS && window.TTS.speakRu) window.TTS.speakRu(ru);
          }
        };
      });

      modal.querySelectorAll(".btn-pmodal-unmaster").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const ru = btn.dataset.ru;
          if (!ru) return;
          let list = (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
          const normRu = ru.toLowerCase().trim();
          list = list.filter(w => (w || "").toLowerCase().trim() !== normRu);
          if (typeof STORE !== "undefined") STORE.set("vocab_mastered_words", list);
          if (typeof SRS !== "undefined" && typeof SRS.unmarkMastered === "function") {
            // Truyền chữ tiếng Nga: unmarkMastered tự tìm thẻ dù id là "srs_..." hay "srsd_<dk>"
            SRS.unmarkMastered(ru);
          }
          if (typeof Progress !== "undefined" && typeof Progress.syncToCloud === "function") {
            Progress.syncToCloud();
          }
          if (typeof toast === "function") toast(`Đã hủy trạng thái thuộc của “${ru}”`);
          window.dispatchEvent(new CustomEvent("trki:progress-updated"));
          renderModalContent();
        };
      });

      modal.querySelectorAll(".btn-pmodal-study-one").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          modal.remove();
          if (typeof showSrsWorkspace === "function") showSrsWorkspace();
        };
      });

      modal.querySelectorAll(".btn-pmodal-add-queue").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const ru = btn.dataset.ru;
          if (ru && typeof SRS !== "undefined") {
            const wObj = activeList.find(x => (x.ru || "").toLowerCase().trim() === (ru || "").toLowerCase().trim());
            if (wObj && typeof SRS.ensureCard === "function") {
              SRS.ensureCard(wObj);
            } else if (typeof SRS.addToQueue === "function") {
              SRS.addToQueue(ru);
            }
            if (typeof toast === "function") toast(`Đã đưa “${ru}” vào hàng đợi ôn tập!`);
            window.dispatchEvent(new CustomEvent("trki:progress-updated"));
            renderModalContent();
          }
        };
      });
    };

    renderModalContent();
  };

  const openCreateJarModal = () => {
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html")) return;
    let m = document.getElementById("createJarModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "createJarModal";
      m.className = "create-jar-modal";
      document.body.appendChild(m);
    }
    m.innerHTML = `
      <div class="create-jar-box">
        <button type="button" class="create-jar-close" id="closeCreateJarModal" title="Đóng cửa sổ" aria-label="Đóng cửa sổ">
          ${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "✕"}
        </button>

        <div class="create-jar-header">
          <div class="create-jar-icon">
            ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 22 }) : ""}
          </div>
          <div>
            <h3 class="create-jar-title">Tạo Lọ Từ Vựng Cá Nhân</h3>
            <p class="create-jar-desc">Gom nhóm các từ vựng theo chủ đề riêng của bạn để dễ dàng ôn tập theo Spaced Repetition.</p>
          </div>
        </div>

        <div class="create-jar-body">
          <label class="create-jar-label" for="newJarName">
            <span>Tên lọ từ vựng:</span>
            <input type="text" id="newJarName" class="create-jar-input" placeholder="Ví dụ: Từ vựng KTX & Nấu ăn" autocomplete="off" autofocus />
          </label>
        </div>

        <div class="create-jar-actions">
          <button type="button" class="btn btn-outline btn-sm create-jar-btn-cancel" id="cancelJar">Hủy</button>
          <button type="button" class="btn btn-primary btn-sm create-jar-btn-save" id="saveJar">
            ${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Tạo lọ ngay
          </button>
        </div>
      </div>
    `;

    const closeModal = () => {
      document.removeEventListener("keydown", onKeyDown);
      m.remove();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);

    m.onclick = (e) => {
      if (e.target === m) closeModal();
    };

    const btnClose = m.querySelector("#closeCreateJarModal");
    if (btnClose) btnClose.onclick = closeModal;

    const btnCancel = m.querySelector("#cancelJar");
    if (btnCancel) btnCancel.onclick = closeModal;

    const inputName = m.querySelector("#newJarName");
    if (inputName) {
      setTimeout(() => inputName.focus(), 60);
      inputName.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          doSave();
        }
      };
    }

    const doSave = () => {
      if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html")) return;
      const name = (inputName ? inputName.value : "").trim();
      if (!name) {
        toast("Vui lòng nhập tên lọ từ vựng");
        if (inputName) inputName.focus();
        return;
      }
      const customJars = STORE.get("custom_jars", []);
      const newJarId = generateUUID();
      const newJar = {
        id: newJarId,
        uuid: newJarId,
        code: "custom_" + newJarId.slice(0, 8),
        name,
        icon: "archive-jar", // Mặc định không cho tạo icon
        desc: "Lọ từ vựng cá nhân do học viên tạo",
        words: [],
        level: "custom",
        is_system: false
      };
      customJars.push(newJar);
      STORE.set("custom_jars", customJars);
      toast("Đã tạo lọ từ vựng mới thành công!");
      closeModal();
      renderVocabHub();
    };

    const btnSave = m.querySelector("#saveJar");
    if (btnSave) btnSave.onclick = doSave;
  };

const showTopicArticle = (jarId) => {
    if (window.setRusiDeepUrl && jarId) {
      window.setRusiDeepUrl('/vocabulary/chu_de/' + encodeURIComponent(jarId));
    }
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?topic=" + encodeURIComponent(jarId || ""))) return;
    // 1. Kiểm tra bản nháp xem trước thời gian thực từ CMS (sessionStorage / localStorage)
    let previewDraft = null;
    try {
      const rawPreview = sessionStorage.getItem("rusi_live_preview_draft") || localStorage.getItem("rusi_live_preview_draft");
      if (rawPreview) {
        const parsed = JSON.parse(rawPreview);
        if (parsed && (parsed.slug === "TOPIC_ARTICLES" || parsed.slug === "VOCAB_JARS")) {
          if (!jarId || parsed.docId === jarId || (parsed.doc && (parsed.doc.id === jarId || parsed.doc.code === jarId))) {
            previewDraft = parsed.doc;
          }
        }
      }
    } catch (_) {}

    const allJars = getVocabJars();
    let item = allJars.find(j => j.id === jarId || j.code === jarId || (j.raw && (j.raw.code === jarId || j.raw.id === jarId)));

    // Fallback: nếu chưa có trong allJars, kiểm tra previewDraft hoặc admin store
    if (!item && previewDraft) {
      item = {
        id: previewDraft.id || previewDraft.code || jarId,
        code: previewDraft.code || previewDraft.id || jarId,
        name: previewDraft.title || previewDraft.name || "Bài học chủ đề",
        title: previewDraft.title || previewDraft.name || "Bài học chủ đề",
        level: previewDraft.level || "A1",
        desc: previewDraft.desc || previewDraft.intro || "",
        words: Array.isArray(previewDraft.words) ? previewDraft.words : (Array.isArray(previewDraft.vocabTable) ? previewDraft.vocabTable : []),
        article: previewDraft.article || previewDraft,
        is_preview: true
      };
    } else if (!item) {
      try {
        const ad = JSON.parse(localStorage.getItem("trki_admin_data") || "{}");
        const list = (ad.TOPIC_ARTICLES || []).concat(ad.VOCAB_JARS || []);
        const found = list.find(x => (x.id || x.code) === jarId);
        if (found) {
          item = {
            id: found.id || found.code || jarId,
            code: found.code || found.id || jarId,
            name: found.title || found.name || "Bài học chủ đề",
            title: found.title || found.name || "Bài học chủ đề",
            level: found.level || "A1",
            desc: found.desc || found.intro || "",
            words: Array.isArray(found.words) ? found.words : (Array.isArray(found.vocabTable) ? found.vocabTable : []),
            article: found.article || found
          };
        }
      } catch (_) {}
    }

    if (!item) { renderVocabHub(); return; }
    const jar = item.raw || item;
    // Lọ/bài chủ đề PRO: file công khai chỉ có metadata — tải nội dung bằng phiên PRO rồi mở lại
    if (!jar.is_preview && jar.content_locked && window.RusiProContent) {
      window.RusiProContent.ensureFull("VOCAB_JARS", jar, { title: "Nội dung dành cho PRO", desc: "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chủ đề chuyên sâu, tài liệu PDF và kho từ vựng nâng cao." })
        .then((full) => { if (full && !full.content_locked) showTopicArticle(jarId); });
      return;
    }

    // Kiểm tra quyền truy cập PRO (bỏ qua khi đang xem trước CMS)
    if (!jar.is_preview && item.is_pro_only && !Monetization.isPro()) {
      Monetization.showProGateModal(
        "Nội dung dành cho PRO",
        "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chủ đề chuyên sâu, tài liệu PDF và kho từ vựng nâng cao."
      );
      return;
    }

    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (!detail) return;
    detail.classList.remove("hidden");

    // Lấy nội dung bài học chuyên sâu
    const articlesMap = (typeof TOPIC_ARTICLES !== "undefined") ? TOPIC_ARTICLES : {};
    const customArticle = (previewDraft && (previewDraft.id === jarId || previewDraft.code === jarId || previewDraft.article))
      ? (previewDraft.article || previewDraft)
      : (jar.article || (jar.code && articlesMap[jar.code]) || (item.code && articlesMap[item.code]) || articlesMap[jar.id] || null);

    const words = jar.words || [];
    const levelBadgeClass = jar.level === "A2" ? "rusi-badge-a2" : jar.level === "B1" ? "rusi-badge-b1" : jar.level === "B2" ? "rusi-badge-b2" : "rusi-badge-a1";
    const levelLabel = jar.level === "A1" ? "Sơ cấp" : jar.level === "A2" ? "Cơ bản" : jar.level === "B1" ? "Trung cấp" : "Trung cấp cao";
    const isUserPro = Boolean(typeof Monetization !== "undefined" && Monetization.isPro && Monetization.isPro());
    const printDate = new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });

    // 1. Lấy nội dung Markdown bài học (.content_md / .content_markdown / .content)
    let articleMd = (customArticle && (customArticle.content_md || customArticle.content_markdown || customArticle.content)) || "";
    articleMd = typeof articleMd === "string" ? articleMd.trim() : "";

    // 2. Fallback sạch sẽ nếu chưa có content_md sẵn: tự động kết hợp từ các dữ liệu thực của chủ đề (intro, actionChains, grammar, mẹo văn hóa), tuyệt đối không sinh nội dung giả/thừa:
    if (!articleMd) {
      const mdSections = [];
      if (customArticle && customArticle.intro) {
        mdSections.push(customArticle.intro.trim());
      } else if (jar && jar.desc) {
        mdSections.push(jar.desc.trim());
      }

      const aChains = (customArticle && (customArticle.actionChains || customArticle.action_chains)) || [];
      if (aChains.length) {
        aChains.forEach((group, gIdx) => {
          const groupTitle = group.subTopic || ("Chuỗi hành động ngữ cảnh " + (gIdx + 1));
          mdSections.push(`### ${groupTitle}`);
          if (group.items && group.items.length) {
            mdSections.push("| Đối tượng / Từ vựng | Hành động | Ngữ cảnh | Ví dụ thực tế |");
            mdSections.push("| --- | --- | --- | --- |");
            group.items.forEach(it => {
              const target = [it.target, it.target_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
              const action = [it.action, it.action_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
              const place = [it.place, it.place_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
              const ex = [it.ex, it.ex_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
              mdSections.push(`| ${target || "—"} | ${action || "—"} | ${place || "—"} | ${ex || "—"} |`);
            });
          }
        });
      }

      if (customArticle && customArticle.dialogues && customArticle.dialogues.length) {
        mdSections.push(`### Hội thoại mẫu`);
        customArticle.dialogues.forEach(d => {
          mdSections.push(`- **${d.speaker || "Người nói"}**${d.role ? ` *(${d.role})*` : ""}: ${d.ru} *(“${d.vi}”)*`);
        });
      }

      const gNotes = (customArticle && (customArticle.grammarNotes || customArticle.grammar_notes)) || [];
      if (gNotes.length) {
        mdSections.push(`### Điểm ngữ pháp trọng tâm`);
        gNotes.forEach(g => {
          mdSections.push(`#### ${g.title}\n\n${g.content}`);
        });
      }

      const cTip = customArticle && (customArticle.culturalTip || customArticle.cultural_tip);
      if (cTip) {
        mdSections.push(`> [!TIP]\n> **Mẹo văn hóa thực tế:** ${cTip}`);
      }

      articleMd = mdSections.join("\n\n");
    }

    const renderedContent = (articleMd && window.RusiMarkdown)
      ? RusiMarkdown.render(articleMd)
      : (articleMd ? `<div class="rusi-md-p">${esc(articleMd)}</div>` : `<p style="color:var(--muted);font-style:italic">Nội dung bài học chủ đề đang được biên soạn bằng Markdown (.md) trên CMS Studio.</p>`);

    detail.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="rusi-workspace-back-bar topic-article-nav-bar no-print">
        <button type="button" class="rusi-back-btn" id="btnBackFromArticle" title="Quay lại danh sách chủ đề" aria-label="Quay lại danh sách chủ đề">
          ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
        </button>
        <div class="rusi-workspace-info">
          <span class="rusi-workspace-title">${window.RusiIcons ? RusiIcons.get(jar.icon || "archive-jar", { size: 20 }) : ""} ${esc(jar.name)}</span>
        </div>
        <div class="topic-article-top-actions">
          <button type="button" class="btn btn-outline btn-sm is-pro-action" id="btnPrintTopicArticle" title="${isUserPro ? "Lưu bài học (PDF / In) — PRO" : "Lưu bài học (Dành riêng cho Hội viên PRO)"}">
            ${isUserPro ? (window.RusiIcons ? RusiIcons.get("download", { size: 15 }) : "") : (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 15 }) : "")} <span class="btn-text">Lưu bài học</span>
            <span class="rusi-pro-mini-badge" style="font-size:0.62rem;font-weight:800;background:linear-gradient(135deg,#facc15,#eab308);color:#78350f;padding:1px 5px;border-radius:4px;margin-left:4px">PRO</span>
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btnOpenJarFromArticleTop" title="Mở lọ từ vựng (${words.length} từ) để học flashcard">
            ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 15 }) : ""} <span class="btn-text">Lọ từ vựng · ${words.length}</span>
          </button>
        </div>
      </div>

      <!-- MAIN ARTICLE BODY CONTAINER -->
      <article class="topic-article-container">
        <!-- HEADER DÀNH RIÊNG KHI XUẤT PDF / IN ẤN -->
        <div class="topic-article-print-header">
          <div class="print-header-inner">
            <div class="print-brand-col">
              <div class="print-brand-badge">
                <svg class="print-brand-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 44" width="220" height="40" fill="none" aria-label="Logo RUSI TRKI">
                  <defs>
                    <linearGradient id="rusiPdfMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#0039A6" />
                      <stop offset="100%" stop-color="#D52B1E" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="4" width="36" height="36" rx="9" fill="url(#rusiPdfMarkGrad)" />
                  <text x="20" y="29" font-family="'Inter', -apple-system, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">Я</text>
                  <text x="46" y="24" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="900" letter-spacing="-0.5">
                    <tspan fill="#0f1f38">Rusi</tspan><tspan fill="#c52233">TRKI</tspan>
                  </text>
                  <rect x="46" y="28" width="30" height="2.5" fill="#cbd5e1" rx="1" />
                  <rect x="76" y="28" width="30" height="2.5" fill="#0039A6" rx="1" />
                  <rect x="106" y="28" width="30" height="2.5" fill="#c52233" rx="1" />
                  <text x="46" y="39" font-family="'Inter', -apple-system, sans-serif" font-size="6.5" font-weight="700" fill="#475569" letter-spacing="0.4">HỆ THỐNG ĐÀO TẠO &amp; KHẢO THÍ TIẾNG NGA</text>
                </svg>
              </div>
              <h1 class="print-doc-heading">TÀI LIỆU BÀI HỌC CHỦ ĐỀ: ${esc(jar.name).toUpperCase()}</h1>
              <div class="print-meta-pills">
                <span class="print-pill">Trình độ: <strong>TRKI ${jar.level} (${levelLabel})</strong></span>
                <span class="print-pill">Quy mô: <strong>${words.length} từ vựng cốt lõi</strong></span>
                <span class="print-pill">Hệ thống: <strong>rusitrki.com</strong></span>
              </div>
            </div>
            <div class="print-date-col">
              <div class="print-doc-date">Ngày xuất: <strong>${printDate}</strong></div>
            </div>
          </div>
        </div>

        <!-- HERO HEADER -->
        ${(previewDraft || jar.is_preview) ? `
          <div class="topic-preview-badge-row" style="margin-bottom:20px">
            <span style="font-size:1.2rem">👁️</span>
            <div>
              <strong>Chế độ Xem Trước Thời Gian Thực (Live Preview Studio)</strong>
              <div style="font-size:0.8rem;opacity:0.9;font-weight:400">Đang hiển thị bản nháp bài học chủ đề từ CMS RUSI TRKI. Nhấn "Lưu &amp; Đồng bộ Cloud" trong CMS để cập nhật vĩnh viễn lên Supabase.</div>
            </div>
          </div>
        ` : ""}

        <header class="topic-article-hero">
          <h1 class="topic-article-title">Bài học chủ đề: ${esc(jar.name)}</h1>
          ${jar.desc ? `<p class="topic-article-desc">${esc(jar.desc)}</p>` : ""}
        </header>

        <!-- NỘI DUNG BÀI HỌC CHÍNH PHỤ THUỘC VÀO CONTENT.MD MARKDOWN -->
        <div class="topic-article-body rusi-md-rendered">
          ${renderedContent}
        </div>

        <!-- MỤC XEM LỌ TỪ VỰNG & LUYỆN FLASHCARD -->
        <section class="topic-article-footer-cta no-print">
          <div class="topic-article-footer-cta-info">
            <span class="topic-cta-icon">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 20 }) : ""}</span>
            <h3>Lọ từ vựng “${esc(jar.name)}”</h3>
            <span class="topic-cta-count">${words.length} từ</span>
          </div>
          <button type="button" class="btn btn-primary" id="btnOpenJarFromArticleBottom">
            ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Học flashcard →
          </button>
        </section>

        <!-- CHÂN TRANG KHI IN / XUẤT PDF -->
        <div class="topic-article-print-footer">
          <div class="print-footer-simple">
            <span>RUSI TRKI · Hệ thống đào tạo &amp; khảo thí tiếng Nga chuẩn TRKI</span>
            <span>rusitrki.com</span>
          </div>
        </div>
      </article>
    `;

    // Event listeners
    const backBtn = el("#btnBackFromArticle");
    if (backBtn) {
      backBtn.onclick = () => showMainLayout();
    }

    const printBtn = el("#btnPrintTopicArticle");
    if (printBtn) {
      printBtn.onclick = () => {
        const isPro = Boolean(typeof Monetization !== "undefined" && Monetization.isPro && Monetization.isPro());
        if (!isPro) {
          if (typeof Monetization !== "undefined" && typeof Monetization.showProGateModal === "function") {
            Monetization.showProGateModal(
              "Tính năng Lưu bài học dành riêng cho Hội viên PRO",
              "Nâng cấp lên gói PRO để tải xuống và in toàn bộ tài liệu bài học chủ đề tiếng Nga định dạng PDF chuẩn A4 chất lượng cao từ RUSI TRKI."
            );
          } else {
            toast("Tính năng tải tài liệu PDF chỉ dành riêng cho hội viên PRO.");
          }
          return;
        }
        window.print();
      };
    }

    const openJarTop = el("#btnOpenJarFromArticleTop");
    if (openJarTop) {
      openJarTop.onclick = () => showJarDetail(jar.id, "list");
    }

    const openJarBottom = el("#btnOpenJarFromArticleBottom");
    if (openJarBottom) {
      openJarBottom.onclick = () => showJarDetail(jar.id, "list");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showJarDetail = (jarId, initialMode = "list") => {
    if (window.setRusiDeepUrl && jarId) {
      window.setRusiDeepUrl('/vocabulary/lo_tu/' + encodeURIComponent(jarId));
    }
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?jar=" + encodeURIComponent(jarId || ""))) return;
    window.currentActiveJarId = jarId;
    const customJars = STORE.get("custom_jars", []);
    const baseJars = (cloudJars && cloudJars.length)
      ? cloudJars
      : ((typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS))
        ? VOCAB_JARS
        : (((window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("jars:system") : []) || []));
    let jar = [...baseJars, ...customJars].find((j) => j.id === jarId || j.code === jarId);
    if (!jar) {
      console.warn("Không tìm thấy lọ từ vựng:", jarId);
      renderVocabHub();
      return;
    }
    // Lọ PRO: file công khai chỉ có metadata — tải nội dung bằng phiên PRO rồi mở lại
    if (jar.content_locked && window.RusiProContent) {
      window.RusiProContent.ensureFull("VOCAB_JARS", jar, { title: "Nội dung dành cho PRO", desc: "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng nâng cao và ôn tập không giới hạn." })
        .then((full) => { if (full && !full.content_locked) showJarDetail(jarId, initialMode); });
      return;
    }
    if (!jar.words || !jar.words.length) {
      if (typeof VOCAB_JARS !== "undefined" && Array.isArray(VOCAB_JARS)) {
        const localMatch = VOCAB_JARS.find(j => j.id === jar.id || j.code === jar.id || j.id === jar.code || j.code === jar.code);
        if (localMatch && Array.isArray(localMatch.words)) jar.words = localMatch.words;
      }
    }

    // Khử từ vựng trùng lặp bên trong lọ nếu có
    if (Array.isArray(jar.words) && jar.words.length > 0) {
      const seenW = new Set();
      const dedupWords = [];
      jar.words.forEach(w => {
        const k = ((w && (w.ru || w.word_normalized)) || "").trim().toLowerCase();
        if (k && seenW.has(k)) return;
        if (k) seenW.add(k);
        dedupWords.push(w);
      });
      jar.words = dedupWords;
    }

    // Kiểm tra quyền truy cập PRO
    const isProJar = Boolean(jar.is_pro_only || jar.is_pro || jar.is_vip);
    if (isProJar && !Monetization.isPro()) {
      Monetization.showProGateModal("Nội dung dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng nâng cao và ôn tập không giới hạn.");
      return;
    }

    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.remove("hidden");
      const isCustom = jar.is_system === false || String(jar.id).startsWith("custom-") || jar.level === "custom";

      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR WITH EMBEDDED MODES (SINGLE LINE) -->
        <div class="rusi-workspace-back-bar rusi-quizlet-bar" id="rusiQuizletBackBar">
          <button type="button" class="rusi-back-btn" id="btnBackJars" title="Quay lại kho Lọ từ vựng" aria-label="Quay lại kho Lọ từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="rusi-workspace-info">
            <span class="rusi-workspace-title">${window.RusiIcons ? RusiIcons.get(jar.icon || "archive-jar", { size: 18 }) : ""} ${esc(jar.name)}</span>
          </div>

          <!-- 5 CHẾ ĐỘ HỌC TẬP GOM TRỰC TIẾP VÀO 1 DÒNG TOP BAR DUY NHẤT -->
          <div class="quizlet-mode-bar rusi-topbar-modes" id="rusiTopbarModes">
            <button type="button" class="quizlet-mode-btn ${initialMode === "list" ? "active" : ""}" data-mode="list" title="Danh sách từ (${(jar.words || []).length})">
              ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách (${(jar.words || []).length})</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "flashcard" ? "active" : ""}" data-mode="flashcard" title="Thẻ ghi nhớ (Flashcard)">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Flashcard</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "learn" ? "active" : ""}" data-mode="learn" title="Trắc nghiệm">
              ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "write" ? "active" : ""}" data-mode="write" title="Gõ từ & Chính tả">
              ${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 16 }) : ""} <span class="btn-text">Gõ từ</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "match" ? "active" : ""}" data-mode="match" title="Ghép từ">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép từ</span>
            </button>
            ${isCustom ? `
              <button type="button" class="btn btn-outline btn-sm rusi-top-btn" id="btnAddWordCustom" title="Thêm từ mới">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"}</button>
              <button type="button" class="btn btn-soft btn-sm rusi-top-btn" id="btnDeleteCustomJar" style="color:var(--red)" title="Xóa lọ này">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""}</button>
            ` : `
              <button type="button" class="btn btn-soft btn-sm rusi-top-btn" id="btnViewArticleFromJar" title="Xem bài học chủ đề">${window.RusiIcons ? RusiIcons.get("book-open", { size: 14 }) : ""}</button>
            `}
          </div>
        </div>

        <div class="workspace" style="padding:14px 4px;border:none;background:transparent;box-shadow:none">
          <!-- QUIZLET STUDY ENGINE HOST -->
          <div id="jarQuizletSuiteHost"></div>
        </div>
      `;

      el("#btnBackJars").onclick = () => {
        showMainLayout();
      };

      const getActiveWorkspaceMode = () => {
        const activeBtn = detail.querySelector(".quizlet-mode-btn.active");
        return activeBtn ? (activeBtn.dataset.mode || "list") : "list";
      };
      window.getActiveWorkspaceMode = getActiveWorkspaceMode;

      window.refreshActiveWorkspace = () => {
        showJarDetail(jar.id, getActiveWorkspaceMode());
      };

      if (isCustom) {
        const btnAdd = el("#btnAddWordCustom");
        if (btnAdd) {
          btnAdd.onclick = () => openAddWordToJarModal(jar.id, () => showJarDetail(jar.id, getActiveWorkspaceMode()));
        }
        const btnDel = el("#btnDeleteCustomJar");
        if (btnDel) {
          btnDel.onclick = () => {
            if (confirm(`Bạn có chắc muốn xóa lọ “${jar.name}” không?`)) {
              let jars = STORE.get("custom_jars", []);
              jars = jars.filter(j => j.id !== jar.id);
              STORE.set("custom_jars", jars);
              toast(`Đã xóa lọ “${jar.name}” thành công!`);
              showMainLayout();
            }
          };
        }
      }

      const btnArt = el("#btnViewArticleFromJar");
      if (btnArt) {
        btnArt.onclick = () => showTopicArticle(jar.id);
      }

      const btnStudy = el("#btnStudyJar");
      if (btnStudy) {
        btnStudy.onclick = () => {
          const flashBtn = detail.querySelector(".quizlet-mode-btn[data-mode='flashcard']");
          if (flashBtn) flashBtn.click();
          const cardElem = detail.querySelector(".quizlet-card-container");
          if (cardElem) cardElem.scrollIntoView({ behavior: "smooth", block: "center" });
        };
      }

      // Khởi động Quizlet Suite
      initQuizletSuite(el("#jarQuizletSuiteHost"), jar.words || [], {
        jarId: jar.id,
        jarTitle: jar.name,
        isCustomJar: isCustom,
        initialMode: initialMode || "list",
        onWordListChange: (mode) => {
          showJarDetail(jar.id, mode || getActiveWorkspaceMode());
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showLesson = (id) => {
    const lessons = (typeof window !== "undefined" && Array.isArray(window.VOCAB_LESSONS)) ? window.VOCAB_LESSONS : [];
    const found = lessons.find(l => l.id === id) || null;
    if (!found) return;
    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (!detail) return;
    detail.classList.remove("hidden");

    let currentScriptIdx = 0;
    let playTimer = null;

    const renderLessonView = (activeTab = "video") => {
      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR -->
        <div class="rusi-workspace-back-bar">
          <button type="button" class="rusi-back-btn" id="btnBackLessons" title="Quay lại danh sách từ vựng" aria-label="Quay lại danh sách từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="rusi-workspace-info">
            <span class="rusi-workspace-title">${window.RusiIcons ? RusiIcons.get(found.scene || "book-open-blog", { size: 22 }) : ""} ${esc(found.ru)}</span>
          </div>
          <span class="rusi-workspace-meta" style="font-size:0.85rem;color:var(--muted)">${found.words.length} từ vựng trọng tâm</span>
        </div>

        <div class="workspace">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
            <div>
              <span class="pro-chip">${found.type === "series" ? "SERIES HÀNH TRÌNH NGA" : "CHỦ ĐỀ ĐỜI THƯỜNG"}</span>
              <h2 class="ru" style="margin:4px 0">${esc(found.ru)}</h2>
              <p style="color:var(--muted);font-size:0.92rem">${esc(found.vi)}</p>
            </div>
            <div class="tabs" style="margin:0">
              <button class="tab ${activeTab === "video" ? "active" : ""}" data-lt="video">${window.RusiIcons ? RusiIcons.get("film", { size: 14 }) : ""} Hội thoại & Ngữ cảnh</button>
              <button class="tab ${activeTab === "words" ? "active" : ""}" data-lt="words">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 14 }) : ""} Từ vựng (${found.words.length})</button>
              <button class="tab ${activeTab === "quiz" ? "active" : ""}" data-lt="quiz">${window.RusiIcons ? RusiIcons.get("edit-3", { size: 16 }) : ""} Trắc nghiệm</button>
            </div>
          </div>

          <div id="lessonTabBody"></div>
        </div>
      `;

      el("#btnBackLessons").onclick = () => {
        if (playTimer) clearInterval(playTimer);
        showMainLayout();
      };

      detail.querySelectorAll("[data-lt]").forEach(btn => {
        btn.onclick = () => {
          if (playTimer) clearInterval(playTimer);
          renderLessonView(btn.dataset.lt);
        };
      });

      const body = el("#lessonTabBody");
      if (activeTab === "video") {
        body.innerHTML = `
          <div class="video-sim">
            <div class="scene-area" id="sceneIcon">${window.RusiIcons ? RusiIcons.get(found.scene || "film", { size: 40 }) : ""}</div>
            <div class="subtitle-box">
              <p class="subtitle-ru ru" id="subRu">${esc(found.script[0].ru)}</p>
              <p class="subtitle-vi" id="subVi">${esc(found.script[0].vi)}</p>
            </div>
            <div class="player-controls">
              <button class="pc-btn" id="pcPlay">${window.RusiIcons ? RusiIcons.get("play-control", { size: 18 }) : ""}</button>
              <div class="pc-progress"><i id="pcBar" style="width:${(1 / found.script.length) * 100}%"></i></div>
              <span class="pc-count" id="pcCount">1/${found.script.length}</span>
            </div>
          </div>
          <div style="margin-top:16px;display:flex;gap:8px;justify-content:center">
            <button class="btn btn-outline btn-sm" id="btnPrevLine">← Câu trước</button>
            <button class="btn btn-outline btn-sm" id="btnSpeakLine">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe câu hiện tại</button>
            <button class="btn btn-outline btn-sm" id="btnNextLine">Câu sau →</button>
          </div>
        `;

        const setLine = (i) => {
          currentScriptIdx = (i + found.script.length) % found.script.length;
          el("#subRu").textContent = found.script[currentScriptIdx].ru;
          el("#subVi").textContent = found.script[currentScriptIdx].vi;
          el("#pcBar").style.width = ((currentScriptIdx + 1) / found.script.length) * 100 + "%";
          el("#pcCount").textContent = `${currentScriptIdx + 1}/${found.script.length}`;
        };

        el("#btnPrevLine").onclick = () => setLine(currentScriptIdx - 1);
        el("#btnNextLine").onclick = () => setLine(currentScriptIdx + 1);
        el("#btnSpeakLine").onclick = () => speak(found.script[currentScriptIdx].ru);

        el("#pcPlay").onclick = () => {
          if (playTimer) {
            clearInterval(playTimer);
            playTimer = null;
            el("#pcPlay").innerHTML = window.RusiIcons ? RusiIcons.get("play-control", { size: 18 }) : "";
            return;
          }
          el("#pcPlay").innerHTML = window.RusiIcons ? RusiIcons.get("pause-control", { size: 18 }) : "";
          speak(found.script[currentScriptIdx].ru);
          playTimer = setInterval(() => {
            setLine(currentScriptIdx + 1);
            speak(found.script[currentScriptIdx].ru);
          }, 4200);
        };
      } else if (activeTab === "words") {
        body.innerHTML = `
          <div class="scrolls-container">
            ${found.words.map(w => `
              <div class="parchment-scroll">
                <div style="display:flex;justify-content:space-between;align-items:start">
                  <div>
                    <div class="scroll-ru ru">${esc(w.ru)}</div>
                    <div class="scroll-pos">${esc((window.formatRussianGrammar ? window.formatRussianGrammar(w.note || w.pos, null, w.gender) : "") || w.note || "")}</div>
                  </div>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn btn-soft btn-sm btn-speak-w" data-ru="${esc(w.ru)}" style="padding:4px 8px" title="Phát âm">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</button>
                    <button type="button" class="btn btn-soft btn-sm btn-add-w-jar" data-ru="${esc(w.ru)}" data-stress="${esc(w.stress || w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" data-ex="${esc(w.ex || "")}" style="padding:4px 8px" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} + Lưu</button>
                  </div>
                </div>
                <div class="scroll-vi">${esc(w.vi)}</div>
              </div>
            `).join("")}
          </div>
        `;
        body.querySelectorAll(".btn-speak-w").forEach(btn => {
          btn.onclick = () => speak(btn.dataset.ru);
        });
        body.querySelectorAll(".btn-add-w-jar").forEach(btn => {
          btn.onclick = () => window.openAddToJarModal({
            ru: btn.dataset.ru,
            stress: btn.dataset.stress || btn.dataset.ru,
            vi: btn.dataset.vi,
            note: btn.dataset.note,
            ex: btn.dataset.ex || ""
          });
        });
      } else if (activeTab === "quiz") {
        quizEngine(body, found.quiz, {
          onFinish: (pct) => {
            if (pct >= 60) {
              // XP chỉ cộng lần đầu hoàn thành bài (nút "Làm lại" không được cộng lặp)
              const firstTime = !(STORE.get("vocabDone", []) || []).includes(found.id);
              Progress.markDone("vocabDone", found.id);
              if (firstTime) {
                Progress.addXp(20);
                toast("Chúc mừng! Bạn đã hoàn thành bài học từ vựng (+20 XP)");
              }
            }
          }
        });
      }
    };

    renderLessonView("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.refreshVocabViews = () => {
    const detail = el("#jarDetailHost");
    const inWorkspace = document.body.classList.contains("in-workspace") || (detail && !detail.classList.contains("hidden"));
    if (inWorkspace) {
      // Đang học trong một Lọ: Tuyệt đối KHÔNG đóng lọ hay reset view/tab
      return;
    }
    renderVocabHub();
  };

  // Lắng nghe sự kiện đồng bộ tiến độ thời gian thực để cập nhật thanh tiến độ
  window.addEventListener("trki:progress-updated", () => {
    if (typeof renderVocabSidebar === "function") {
      renderVocabSidebar();
    }
    // Đang ở phiên ôn SRS mà chưa chấm thẻ nào: dữ liệu cloud vừa về làm đổi thẻ đến hạn → dựng lại danh sách ôn
    const detail = el("#jarDetailHost");
    if (srsReviewSnapshot && detail && !detail.classList.contains("hidden") && detail.querySelector("[data-srs-review]") &&
        typeof SRS !== "undefined" && SRS.getState) {
      const st = SRS.getState();
      const dueKey = SRS.getDueCards(st, 50).map(c => c.id).join("|");
      if (st.today.reviewed === srsReviewSnapshot.reviewed && STORE.get("vocab_changed_at", 0) === srsReviewSnapshot.changedAt &&
          dueKey !== srsReviewSnapshot.dueKey) {
        showSrsWorkspace();
      }
    }
  });

  // Hỗ trợ mở trực tiếp Lọ từ vựng hoặc Bài học chủ đề từ URL / Live Preview Studio CMS / Deep Link
  const urlParams = new URLSearchParams(window.location.search);
  const getParam = (k) => (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || urlParams.get(k);
  const targetTopic = getParam("topic") || getParam("article");
  const targetJar = getParam("jar") || getParam("lo_tu") || getParam("id");
  const targetMode = getParam("mode");

  if (targetTopic) {
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?topic=" + encodeURIComponent(targetTopic))) return;
    if (targetMode === "jar") {
      showJarDetail(targetTopic);
    } else {
      showTopicArticle(targetTopic);
    }
  } else if (targetJar) {
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?jar=" + encodeURIComponent(targetJar))) return;
    showJarDetail(targetJar);
  } else if (getParam("srs")) {
    if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?srs=1")) return;
    showSrsWorkspace();
  } else {
    renderVocabHub();
  }
}
window.initVocabPage = initVocabPage;
window._initVocabPage = initVocabPage;
