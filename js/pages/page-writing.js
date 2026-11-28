/**
 * RUSI TRKI — page-writing.js
 * Phân hệ trang: initWritingPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initWritingPage() {
  const host = el("#writeHost");
  if (!host) return;

  const LEVELS = [
    ["A1", "Sơ cấp"],
    ["A2", "Cơ bản"],
    ["B1", "Trung cấp"],
    ["B2", "Trung cấp cao"],
    ["C1", "Cao cấp"],
    ["C2", "Thành thạo"]
  ];
  const MODE_INFO = {
    picture: {
      title: "Tả tranh",
      subtitle: "Quan sát hình ảnh và diễn đạt bằng tiếng Nga",
      icon: "image"
    },
    translation: {
      title: "Luyện dịch",
      subtitle: "Luyện chuyển ý và viết câu tiếng Nga theo chủ đề",
      icon: "book-open-blog"
    }
  };
  const PICTURE_FALLBACK = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=82";
  const TRANSLATION_FALLBACK = "https://images.unsplash.com/photo-1514369118554-e20d93546b30?auto=format&fit=crop&w=1200&q=82";
  const CYRILLIC_KEYS = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"]
  ];

  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const isPreviewUrl = Boolean(urlParams && urlParams.get("preview") === "1");
  const initialMode = (urlParams && urlParams.get("mode")) ? urlParams.get("mode") : "picture";
  let currentMode = MODE_INFO[initialMode] ? initialMode : "picture";
  let cloudWriting = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("writing:all") : null;

  const icon = (name, size) => window.RusiIcons ? RusiIcons.get(name, { size }) : "";
  const readWritingPreviewDraft = (targetId) => {
    if (!isPreviewUrl) return null;
    try {
      const raw = sessionStorage.getItem("rusi_live_preview_draft") || localStorage.getItem("rusi_live_preview_draft");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.slug !== "WRITING_TASKS" || !parsed.doc || typeof parsed.doc !== "object") return null;
      const d = parsed.doc;
      const docKey = String(parsed.docId || d.id || d.code || "").trim();
      if (targetId && docKey && docKey !== String(targetId) && String(d.id || "") !== String(targetId) && String(d.code || "") !== String(targetId)) {
        return null;
      }
      const cloned = JSON.parse(JSON.stringify(d));
      cloned.id = cloned.id || cloned.code || targetId || "preview-writing";
      cloned.code = cloned.code || cloned.id;
      cloned.title = cloned.title || "Bản nháp luyện viết";
      cloned.level = cloned.level || "A1";
      cloned.prompt = cloned.prompt || cloned.prompt_text || "";
      cloned.vi = cloned.vi || cloned.prompt_vi || "";
      cloned.minWords = Number(cloned.minWords || cloned.min_words || 35) || 35;
      cloned.content_locked = false;
      cloned._isPreview = true;
      return cloned;
    } catch (err) {
      console.warn("[LivePreview] Không đọc được bản nháp bài viết:", err);
      return null;
    }
  };
  const getTasks = () => {
    if (cloudWriting && cloudWriting.length) return cloudWriting;
    if (typeof window !== "undefined" && window.WRITING_TASKS && window.WRITING_TASKS.length) return window.WRITING_TASKS;
    if (typeof WRITING_TASKS !== "undefined" && Array.isArray(WRITING_TASKS) && WRITING_TASKS.length) return WRITING_TASKS;
    return [];
  };
  const taskMode = (task) => {
    if (task.topicType === "picture" || task.topicType === "translation") return task.topicType;
    if (task.task_type === "picture_desc" || task.category === "photo" || (task.title && task.title.toLowerCase().includes("tả tranh"))) return "picture";
    if (task.task_type === "translation") return "translation";
    if (task.image_url || task.image) return "picture";
    return "translation";
  };

  const getFirstLevelWithTasks = (mode) => {
    const tasks = getTasks();
    const found = LEVELS.find(([lvl]) => tasks.some((t) => t.level === lvl && taskMode(t) === mode));
    return found ? found[0] : "A1";
  };

  let currentLevel = getFirstLevelWithTasks(currentMode);
  const minWords = (task) => task.minWords || task.min_words || 20;
  const modelAnswer = (task) => task.model || task.model_answer || "";
  const taskTips = (task) => {
    if (!task) return [];
    if (Array.isArray(task.tips) && task.tips.length) return task.tips;
    if (typeof task.tips === "string" && task.tips.trim()) {
      try {
        const parsed = JSON.parse(task.tips);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (_) {
        return task.tips.split(/\n+/).map((s) => s.trim()).filter(Boolean);
      }
    }
    if (task.raw_data) {
      try {
        const raw = typeof task.raw_data === "string" ? JSON.parse(task.raw_data) : task.raw_data;
        if (raw && Array.isArray(raw.tips) && raw.tips.length) return raw.tips;
      } catch (_) {}
    }
    return [];
  };
  const taskWords = (task) => {
    if (!task) return [];
    if (Array.isArray(task.suggested_words) && task.suggested_words.length) return task.suggested_words;
    if (typeof task.suggested_words === "string" && task.suggested_words.trim()) {
      try {
        const parsed = JSON.parse(task.suggested_words);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (_) {
        const splitted = task.suggested_words.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
        if (splitted.length) return splitted;
      }
    }
    if (task.raw_data) {
      try {
        const raw = typeof task.raw_data === "string" ? JSON.parse(task.raw_data) : task.raw_data;
        if (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length) return raw.suggested_words;
      } catch (_) {}
    }
    if (Array.isArray(task.suggestedWords) && task.suggestedWords.length) return task.suggestedWords;
    return [];
  };

  const COMMON_WRITING_MEANINGS = {
    "меня зовут": "Tôi tên là / Tên tôi là...",
    "я из вьетнама": "Tôi đến từ Việt Nam",
    "я студент": "Tôi là sinh viên",
    "я изучаю": "Tôi đang học / nghiên cứu...",
    "я живу в москве": "Tôi sống ở Moskva",
    "я живу в ханое": "Tôi sống ở Hà Nội",
    "утром": "Vào buổi sáng",
    "завтракать": "Ăn bữa sáng",
    "университет": "Trường đại học",
    "библиотека": "Thư viện",
    "готовить ужин": "Nấu bữa tối",
    "дорогой друг": "Bạn thân mến / Bạn quý mến",
    "северная столица": "Thủ đô phương Bắc (Sankt-Peterburg)",
    "эрмитаж": "Bảo tàng viện Hermitage",
    "белые ночи": "Những đêm trắng",
    "незабываемо": "Thật khó quên / Đáng nhớ",
    "здоровый образ жизни": "Lối sống lành mạnh",
    "учебная нагрузка": "Áp lực / khối lượng học tập",
    "заниматься спортом": "Tập luyện thể dục thể thao",
    "энергия и бодрость": "Năng lượng và sự sảng khoái",
    "по моему мнению": "Theo quan điểm / ý kiến của tôi",
    "на картинке видно": "Trên bức tranh có thể thấy...",
    "за столом": "Ngồi bên bàn",
    "готовятся к тесту": "Đang ôn luyện cho bài kiểm tra",
    "пьют горячий чай": "Uống trà nóng",
    "дружная атмосфера": "Không khí chan hòa, thân ái",
    "привет!": "Chào bạn! / Xin chào!",
    "привет": "Chào bạn! / Xin chào!",
    "я ушёл в библиотеку": "Tôi đi đến thư viện rồi",
    "купи, пожалуйста": "Làm ơn mua giúp...",
    "вернусь в": "Tôi sẽ quay về lúc...",
    "спасибо!": "Cảm ơn!",
    "спасибо": "Cảm ơn!",
    "искусственный интеллект": "Trí tuệ nhân tạo (AI)",
    "автоматизация": "Tự động hóa",
    "критическое мышление": "Tư duy phản biện",
    "с одной стороны": "Một mặt...",
    "с другой стороны": "Mặt khác...",
    "в заключение": "Để kết luận / Tóm lại",
    "уважаемые господа": "Kính gửi quý cơ quan / quý ngài",
    "прошу рассмотреть мою кандидатуру": "Kính xin quý vị xem xét hồ sơ ứng tuyển của tôi",
    "профессиональные навыки": "Kỹ năng chuyên môn",
    "готов внести вклад": "Sẵn sàng cống hiến / đóng góp",
    "с уважением": "Trân trọng"
  };

  const getWordVi = (w) => {
    if (typeof w === "object" && w !== null) {
      if (w.vi) return w.vi;
      if (w.meaning) return w.meaning;
    }
    const str = String(w).trim();
    const clean = str.toLowerCase().replace(/[!.,?]/g, "").trim();
    if (COMMON_WRITING_MEANINGS[clean]) return COMMON_WRITING_MEANINGS[clean];
    if (COMMON_WRITING_MEANINGS[str.toLowerCase()]) return COMMON_WRITING_MEANINGS[str.toLowerCase()];
    if (window.RusiDict && typeof window.RusiDict.lookup === "function") {
      try {
        const found = window.RusiDict.lookup(clean);
        if (found && found.vi) return found.vi;
      } catch (_) {}
    }
    return "Từ vựng gợi ý cho bài viết";
  };
  const taskImage = (task) => task.image_url || (taskMode(task) === "picture" ? PICTURE_FALLBACK : TRANSLATION_FALLBACK);
  // URL đưa vào url('...') của CSS: mã hoá ký tự có thể đóng chuỗi/hàm
  const cssUrl = (url) => String(url || "").replace(/['"()\\\s]/g, (c) => encodeURIComponent(c));
  const topicKey = (task) => task.topicKey || task.category || task.category_name || task.categoryName || task.id;
  const topicName = (task) => task.topicName || task.categoryName || task.category_name || task.title;

  const filteredTasks = () => getTasks().filter((task) =>
    task.level === currentLevel && taskMode(task) === currentMode
  );

  const groupedTopics = () => {
    const groups = new Map();
    filteredTasks().forEach((task) => {
      const key = topicKey(task);
      if (!groups.has(key)) groups.set(key, { key, name: topicName(task), tasks: [] });
      groups.get(key).tasks.push(task);
    });
    groups.forEach((g) => {
      g.tasks.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    });
    return Array.from(groups.values());
  };

  const canOpen = (task) => {
    const isPro = Boolean(task.is_pro_only || task.is_pro);
    if (isPro && !Monetization.isPro()) {
      Monetization.showProGateModal(
        "Đề luyện viết dành cho PRO",
        "Nâng cấp lên gói PRO để mở khóa toàn bộ đề thi viết TRKI chuyên sâu và trợ lý AI chữa ngữ pháp 20 lượt mỗi ngày."
      );
      return false;
    }
    return true;
  };

  const renderTopics = () => {
    const grid = host.querySelector("#writingTopicGrid");
    if (!grid) return;

    host.querySelectorAll(".writing-mode-card").forEach((button) => {
      const active = button.dataset.mode === currentMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    host.querySelectorAll(".writing-level-tab").forEach((button) => {
      const active = button.dataset.level === currentLevel;
      button.classList.toggle("active", active);
      button.classList.toggle("level-tab-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    LEVELS.forEach(([level]) => {
      const count = getTasks().filter((task) => task.level === level && taskMode(task) === currentMode).length;
      const countNode = host.querySelector(`[data-writing-count="${level}"]`);
      if (countNode) countNode.textContent = count;
    });

    const topics = groupedTopics();
    if (!topics.length) {
      grid.innerHTML = `
        <div class="writing-empty-state">
          <span class="writing-empty-icon">${icon(MODE_INFO[currentMode].icon, 34)}</span>
          <h3>Chưa có chủ đề ${MODE_INFO[currentMode].title.toLowerCase()} ở cấp ${currentLevel}</h3>
          <p>Hãy chọn một cấp độ khác để tiếp tục luyện tập.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = topics.map((topic) => {
      const done = topic.tasks.filter((task) => Progress.doneList("writeDone").includes(task.id)).length;
      const first = topic.tasks[0];
      const pro = topic.tasks.some((task) => Boolean(task.is_pro_only || task.is_pro));
      const isUnlocked = !pro || (typeof Monetization !== "undefined" && Monetization.isPro());
      const isAllDone = done === topic.tasks.length && topic.tasks.length > 0;
      const actionLabel = isAllDone ? "Đã hoàn thành" : (currentMode === "picture" ? "Vào tả tranh" : "Vào luyện dịch");

      const getWritingIconKey = (t, item) => {
        const key = (((t && t.key) || "") + " " + ((item && item.category) || "")).toLowerCase();
        if (key.includes("daily") || key.includes("routine") || key.includes("time")) return "timer-clock";
        if (key.includes("travel") || key.includes("trip")) return "plane";
        if (key.includes("study") || key.includes("school") || key.includes("exam")) return "graduation-cap";
        if (key.includes("city") || key.includes("home") || key.includes("house")) return "building-2";
        if (key.includes("work") || key.includes("job") || key.includes("career")) return "briefcase";
        if (key.includes("food") || key.includes("cafe")) return "utensils";
        if (key.includes("family") || key.includes("friend")) return "heart";
        if (item && item.icon && window.RusiIcons && RusiIcons.has && RusiIcons.has(item.icon)) return item.icon;
        if (currentMode === "picture") return "image";
        if (currentMode === "translation") return "book-open-blog";
        return "pen-tool";
      };

      const iconKey = getWritingIconKey(topic, first);
      const iconSvg = window.RusiIcons ? RusiIcons.get(iconKey, { size: 24 }) : icon("pen-tool", 24);

      return `
        <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .rusi-card-compact (Đồng bộ từ vựng, dùng 100% SVG RusiIcons) -->
        <article class="rusi-card rusi-card-compact writing-topic-card ${isAllDone ? 'topic-completed' : ''} ${pro ? 'topic-pro' : ''} ${pro && !isUnlocked ? 'topic-locked' : ''}" data-topic="${esc(topic.key)}" tabindex="0">
          <div class="rusi-card-header">
            <div class="rusi-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
              ${iconSvg}
            </div>
            <div class="rusi-card-header-main">
              <div class="rusi-card-title-row">
                <h3 class="rusi-card-ru" title="${esc(topic.name)}">${esc(topic.name)}</h3>
                ${isAllDone ? `
                  <span class="topic-status topic-status-completed" style="flex-shrink:0">
                    ${icon("check", 12)} Hoàn thành
                  </span>
                ` : pro ? `
                  <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                ` : ""}
              </div>
              <div class="rusi-card-subinfo">
                <span>${currentLevel}</span>
                <span class="rusi-card-sep">•</span>
                <span class="rusi-card-count">${topic.tasks.length} bài luyện</span>
                ${done > 0 ? `
                  <span class="rusi-card-sep">•</span>
                  <span style="color:#10b981;font-weight:400">${done}/${topic.tasks.length} xong</span>
                ` : ""}
              </div>
            </div>
          </div>

          <div class="rusi-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
            <div class="topic-footer-actions">
              ${pro && !isUnlocked ? `
                <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                  ${icon("lock-pro", 16) || icon("lock", 16)}
                </span>
              ` : `
                <button type="button" class="btn-write-action topic-text-btn" data-topic="${esc(topic.key)}" title="${actionLabel}">
                  ${actionLabel} ${icon("arrow-right", 14)}
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    const openTopic = (card) => {
      if (typeof window.requireAuth === "function" && !window.requireAuth("writing.html?topic=" + encodeURIComponent(card.dataset.topic || ""))) return;
      const topic = topics.find((item) => item.key === card.dataset.topic);
      if (!topic || !topic.tasks.length || !canOpen(topic.tasks[0])) return;
      openWorkspace(topic, topic.tasks[0]);
    };
    grid.querySelectorAll(".writing-topic-card").forEach((card) => {
      card.onclick = () => openTopic(card);
      card.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTopic(card);
        }
      };
    });
    grid.querySelectorAll(".btn-write-action, .topic-circle-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = btn.closest(".writing-topic-card");
        if (card) openTopic(card);
      };
    });
  };

  let openWritingIds = null; // id đề/chủ đề đang mở trong workspace (dùng cho nút Back của trình duyệt)

  const renderHub = () => {
    openWritingIds = null;
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/writing');
    }
    document.body.classList.remove("in-workspace");
    host.innerHTML = `
      <section class="writing-hub" id="writingHub">
        <header class="writing-hub-header">
          <h1>Chọn cách bạn muốn luyện viết</h1>
          <p>Rèn luyện khả năng quan sát, chuyển ý và diễn đạt tiếng Nga theo từng cấp độ.</p>
        </header>

        <div class="writing-mode-grid" aria-label="Chọn dạng luyện viết">
          ${Object.entries(MODE_INFO).map(([key, info]) => `
            <button type="button" class="writing-mode-card ${key === currentMode ? "active" : ""}" data-mode="${key}" aria-pressed="${key === currentMode}">
              <span class="writing-mode-icon">${icon(info.icon, 28)}</span>
              <span class="writing-mode-copy">
                <strong>${info.title}</strong>
                <small>${info.subtitle}</small>
              </span>
              <span class="writing-mode-arrow">${icon("arrow-right", 18)}</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-filter-head">
          <label class="writing-level-select-wrap" style="display:none">
            <span>Cấp độ</span>
            <select id="writingLevelSelect" aria-label="Chọn cấp độ viết">
              ${LEVELS.map(([level, label]) => `<option value="${level}" ${level === currentLevel ? "selected" : ""}>${level} · ${label}</option>`).join("")}
            </select>
          </label>
        </div>

        <div class="level-tabs writing-level-tabs" role="tablist" aria-label="Lọc chủ đề theo cấp độ" id="writingLevelTabs">
          ${LEVELS.map(([level, label]) => `
            <button type="button" class="level-tab writing-level-tab ${level === currentLevel ? "level-tab-active" : ""}" data-level="${level}" role="tab" aria-selected="${level === currentLevel ? "true" : "false"}">
              <span class="level-code">${level}</span>
              <small>${label}</small>
              <span class="level-tab-count" data-writing-count="${level}">0</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-topic-grid" id="writingTopicGrid"></div>
      </section>
    `;

    host.querySelectorAll(".writing-mode-card").forEach((button) => {
      button.onclick = () => {
        currentMode = button.dataset.mode;
        if (!getTasks().some((t) => t.level === currentLevel && taskMode(t) === currentMode)) {
          currentLevel = getFirstLevelWithTasks(currentMode);
        }
        const heading = host.querySelector(".writing-filter-head h2");
        if (heading) heading.textContent = `${MODE_INFO[currentMode].title} theo cấp độ`;
        renderTopics();
      };
    });
    host.querySelectorAll(".writing-level-tab").forEach((button) => {
      button.onclick = () => {
        currentLevel = button.dataset.level;
        const select = host.querySelector("#writingLevelSelect");
        if (select) select.value = currentLevel;
        renderTopics();
      };
    });
    const select = host.querySelector("#writingLevelSelect");
    if (select) {
      select.onchange = (event) => {
        currentLevel = event.target.value;
        renderTopics();
      };
    }
    renderTopics();
  };

  const openWorkspace = (topic, initialTask) => {
    const isPreviewSession = Boolean(initialTask && initialTask._isPreview);
    if (!isPreviewSession && window.setRusiDeepUrl && initialTask) {
      window.setRusiDeepUrl('/writing/bai_viet/' + encodeURIComponent(initialTask.id || initialTask.code || (topic && topic.key)));
    }
    // Trang đích sau đăng nhập: mở lại đúng đề đang chọn (không chỉ đề đầu tiên của chủ đề). Xem trước CMS không cần đăng nhập.
    const authTarget = (initialTask && (initialTask.id || initialTask.code))
      ? "writing.html?task=" + encodeURIComponent(initialTask.id || initialTask.code)
      : "writing.html?topic=" + encodeURIComponent((topic && (topic.key || topic.id || topic.title)) || "");
    if (!isPreviewSession && typeof window.requireAuth === "function" && !window.requireAuth(authTarget)) return;
    // Đề PRO: file công khai chỉ có metadata — tải nội dung mọi đề khoá của chủ đề bằng phiên PRO rồi mở lại
    // (chưa PRO: chỉ xét đề đang mở, để vẫn mở được đề miễn phí trong chủ đề có đề PRO)
    const isProUser = typeof Monetization !== "undefined" && Monetization.isPro();
    const lockedTasks = isPreviewSession ? [] : (isProUser ? ((topic && topic.tasks) || []) : []).concat(initialTask || []).filter((task) => task && task.content_locked);
    if (lockedTasks.length && window.RusiProContent) {
      window.RusiProContent.ensureFullList("WRITING_TASKS", lockedTasks, { title: "Đề luyện viết dành cho PRO", desc: "Nâng cấp lên gói PRO để mở khóa toàn bộ đề thi viết TRKI chuyên sâu và trợ lý AI chữa ngữ pháp 20 lượt mỗi ngày." })
        .then((ok) => { if (ok) openWorkspace(topic, initialTask); });
      return;
    }
    openWritingIds = [initialTask && initialTask.id, initialTask && initialTask.code, topic && topic.key];
    document.body.classList.add("in-workspace");
    let currentTask = initialTask;

    const renderTask = () => {
      const t = currentTask;
      const isPreviewTask = Boolean(isPreviewSession || (t && t._isPreview));
      const words = taskWords(t);
      const tips = taskTips(t);
      host.innerHTML = `
        <div class="writing-workspace-shell">
          <div class="writing-workspace-topbar">
            <button type="button" class="writing-icon-button" id="writingBack" aria-label="Quay lại danh sách chủ đề" title="Quay lại">
              ${icon("arrow-left", 20)}
            </button>
            <button type="button" class="writing-icon-button writing-exercise-menu-button" id="writingExerciseMenu" aria-label="Mở danh sách bài luyện" title="Danh sách bài luyện">
              ${icon("list-tasks", 20) || icon("menu", 20)}
            </button>
            <div class="writing-workspace-heading">
              <strong>
                <span class="writing-heading-mode">${MODE_INFO[currentMode].title}</span>
                <span class="writing-heading-sep">—</span>
                <span class="writing-heading-topic">${esc(topic.name)}</span>
              </strong>
            </div>
            <span class="writing-target">${topic.tasks.length} ${currentMode === "picture" ? "tranh" : "bài"}</span>
          </div>

          <div class="writing-workspace-grid">
            <aside class="writing-exercise-sidebar" id="writingExerciseSidebar" aria-label="Danh sách bài luyện">
              <div class="writing-sidebar-head">
                <div>
                  <span>CHỦ ĐỀ</span>
                  <strong>${esc(topic.name)}</strong>
                </div>
                <button type="button" class="writing-icon-button writing-sidebar-close" id="writingSidebarClose" aria-label="Đóng danh sách">
                  ${icon("x", 18)}
                </button>
              </div>
              <div class="writing-exercise-list">
                ${topic.tasks.map((task, index) => {
                  const active = task.id === t.id;
                  const done = Progress.doneList("writeDone").includes(task.id);
                  return `
                    <button type="button" class="writing-exercise-item ${active ? "active" : ""}" data-task-id="${esc(task.id)}">
                      <span class="writing-exercise-index">${String(index + 1).padStart(2, "0")}</span>
                      <span class="writing-exercise-title">
                        <strong>${esc(task.title || `Bài luyện ${index + 1}`)}</strong>
                      </span>
                      <span class="writing-exercise-status">${done ? icon("check-circle-correct", 16) : icon("arrow-right", 15)}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>
            <div class="writing-sidebar-scrim" id="writingSidebarScrim"></div>

            <section class="writing-practice-panel" data-writing-task="${esc(t.id)}">
              ${isPreviewTask ? `
                <div class="topic-preview-badge-row" role="status" style="margin-bottom:16px">
                  <span aria-hidden="true">${icon("eye", 18) || "👁️"}</span>
                  <div style="min-width:0;flex:1">
                    <strong>Chế độ Xem trước CMS (Live Preview)</strong>
                    <div style="font-size:0.8rem;opacity:0.9;font-weight:400">Đang hiển thị bản nháp chưa xuất bản từ CMS. Chế độ xem trước không lưu bài viết, tiến độ, XP hay gửi chấm AI.</div>
                  </div>
                </div>
              ` : ""}
              ${taskMode(t) === "picture" ? `
                <div class="writing-prompt-box">
                  <div class="writing-prompt-copy">
                    <span class="writing-section-label">Đề bài</span>
                    <p class="ru">${esc(t.prompt || "")}</p>
                    ${t.vi ? `<p>${esc(t.vi)}</p>` : ""}
                  </div>
                </div>

                <figure class="writing-prompt-figure" style="--writing-img:url('${esc(cssUrl(taskImage(t)))}')">
                  <img src="${esc(taskImage(t))}" alt="${esc(t.title)}" />
                </figure>
              ` : `
                <!-- DẠNG LUYỆN DỊCH: THIẾT KẾ TỐI GIẢN HIỆN ĐẠI, KHÔNG LỒNG KHỐI BÊN TRONG -->
                <div class="writing-translation-card">
                  <div class="writing-translation-head">
                    <span class="writing-section-label">${icon("book-open-blog", 15)} Đề bài</span>
                  </div>
                  <p class="writing-translation-text ru">${esc(t.prompt || "")}</p>
                </div>
              `}

              <div class="writing-answer-head">
                <div>
                  <span class="writing-section-label">CÂU TRẢ LỜI CỦA BẠN</span>
                </div>
              </div>

              <textarea class="write-area ru writing-input-textarea" placeholder="Пишите здесь...">${esc(isPreviewTask ? "" : STORE.get("write_" + t.id, ""))}</textarea>
              <!-- Bàn phím Cyrillic ảo (PROJECT_SPEC): gập/mở, dùng cho máy chưa cài bộ gõ tiếng Nga -->
              <div class="writing-cyr-kbd-wrap">
                <button type="button" class="writing-cyr-toggle" id="writingKbdToggle" aria-expanded="false" aria-controls="writingCyrKbd">
                  ${icon("keyboard-cyrillic", 16)} <span>Bàn phím tiếng Nga</span>
                </button>
                <div class="writing-cyr-kbd hidden" id="writingCyrKbd" role="group" aria-label="Bàn phím tiếng Nga ảo">
                  ${CYRILLIC_KEYS.map((row) => `<div class="writing-cyr-row">${row.map((k) => `<button type="button" class="writing-cyr-key ru" data-key="${k}">${k.toLowerCase()}</button>`).join("")}</div>`).join("")}
                  <div class="writing-cyr-row">
                    <button type="button" class="writing-cyr-key writing-cyr-key--fn" data-action="shift" aria-pressed="false" title="Chữ hoa / chữ thường">Aa</button>
                    <button type="button" class="writing-cyr-key writing-cyr-key--fn writing-cyr-key--space" data-action="space" title="Dấu cách">␣</button>
                    <button type="button" class="writing-cyr-key writing-cyr-key--fn" data-action="back" title="Xoá ký tự trước" aria-label="Xoá ký tự trước">⌫</button>
                  </div>
                </div>
              </div>
              <div class="write-meta">
                <span class="word-count">0 từ / tối thiểu ${minWords(t)} từ</span>
                <span>${icon("check-circle-correct", 14)} Tự động lưu trên trình duyệt</span>
              </div>

              <!-- THANH THAO TÁC LUYỆN VIẾT & HẠN MỨC AI TỐI GIẢN, HIỆN ĐẠI -->
              <div class="writing-primary-actions writing-action-bar">
                <div class="writing-bar-left">
                  <button type="button" class="btn btn-primary btn-submit" title="Chấm điểm và nhận xét AI" aria-label="Chấm AI">
                    ${icon("bot-rusika", 17)}
                    <span class="writing-btn-text">Chấm AI</span>
                  </button>
                  <div class="writing-quota-pill" id="writingAiQuotaBadge" title="Hạn mức chấm điểm AI hôm nay (tự động làm mới mỗi ngày)">
                    <span class="writing-quota-icon">${icon("zap-xp", 14)}</span>
                    <span id="writingAiQuotaText">
                      <span class="quota-txt">3 lượt/ngày</span>
                    </span>
                  </div>
                </div>

                <div class="writing-bar-divider" aria-hidden="true"></div>

                <div class="writing-bar-right">
                  <button type="button" class="btn btn-outline btn-model" title="Bài văn mẫu TRKI" aria-label="Bài mẫu">
                    ${icon("eye", 15)} <span class="writing-btn-text">Bài mẫu</span>
                  </button>
                  ${tips.length ? `
                    <button type="button" class="btn btn-outline btn-writing-hint" id="writingHintToggle" aria-expanded="false" aria-controls="writingHints" title="Hiển thị câu hỏi gợi ý" aria-label="Gợi ý">
                      ${icon("help-circle", 15)} <span class="writing-btn-text">Gợi ý</span>
                    </button>
                  ` : ""}
                  ${words.length ? `
                    <button type="button" class="btn btn-outline btn-writing-vocab" id="btnWritingVocabToggle" title="Xem từ vựng gợi ý (${words.length})" aria-label="Từ vựng gợi ý (${words.length})">
                      <span class="writing-btn-icon-wrap">
                        ${icon("archive-jar", 15)}
                        <span class="writing-vocab-pill-count">${words.length}</span>
                      </span>
                      <span class="writing-btn-text">Từ vựng</span>
                    </button>
                  ` : ""}
                </div>
              </div>

              <div class="ai-score-box hidden"></div>
              <div class="model-answer hidden">
                <h4>${icon("sparkles-clean", 18)} Bài văn mẫu đạt điểm tối đa TRKI</h4>
                <p class="ru">${esc(modelAnswer(t))}</p>
              </div>

              ${tips.length ? `
                <div class="writing-hints hidden" id="writingHints">
                  <h4>${icon("sparkles-clean", 18)} Câu hỏi và ý gợi mở</h4>
                  <ul>${tips.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
                </div>
              ` : ""}

              ${words.length ? `
                <div class="writing-vocab-popover-card hidden" id="writingVocabDropdownBox">
                  <div class="writing-vocab-pop-header">
                    <div class="pomo-pop-title-wrap">
                      <span class="pomo-pop-title-dot" style="background:var(--primary)"></span>
                      <span class="writing-vocab-pop-title">Từ vựng gợi ý &amp; Lọ từ vựng</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="writing-vocab-count-badge">${words.length} từ</span>
                      <button type="button" class="pomo-pop-icon-btn" id="btnCloseWritingVocab" title="Đóng danh sách" aria-label="Đóng danh sách">
                        ${icon("x", 14)}
                      </button>
                    </div>
                  </div>
                  <div class="rusi-vocab-list-wrap" id="writingVocabList" style="margin-top: 0;">
                    ${words.map((word, idx) => {
                      const wordRu = typeof word === "object" && word !== null ? (word.ru || word.word || "") : String(word);
                      const wordVi = getWordVi(word);
                      const wordPos = typeof word === "object" && word !== null && word.pos ? word.pos : "";
                      const audioUrl = typeof word === "object" && word !== null && word.audio_url ? word.audio_url : "";
                      return `
                        <div class="rusi-vocab-row-card" data-ru="${esc(wordRu)}" data-idx="${idx}">
                          <div class="rusi-row-main-grid">
                            <div class="rusi-row-col-ru">
                              <div class="rusi-row-ru-header">
                                <span class="rusi-row-ru ru">${esc(wordRu)}</span>
                                ${wordPos ? `<span class="rusi-row-pos" style="font-size:0.75rem;padding:2px 6px;border-radius:4px;background:rgba(23,87,166,0.08);color:var(--primary);margin-left:6px">${esc(wordPos)}</span>` : ""}
                              </div>
                            </div>
                            <div class="rusi-row-col-vi">
                              <div class="rusi-row-vi-text">${esc(wordVi)}</div>
                            </div>
                            <div class="rusi-row-col-actions">
                              <button type="button" class="rusi-action-icon-btn writing-vocab-speak" data-word="${esc(wordRu)}" ${audioUrl ? `data-audio="${esc(audioUrl)}"` : ""} aria-label="Nghe phát âm ${esc(wordRu)}" title="Phát âm tiếng Nga">
                                ${icon("volume-high", 16)}
                              </button>
                              <button type="button" class="rusi-action-icon-btn writing-vocab-add" data-word="${esc(wordRu)}" data-vi="${esc(wordVi)}" aria-label="Thêm ${esc(wordRu)} vào lọ từ" title="Lưu vào Lọ cá nhân">
                                ${icon("archive-jar", 16)}
                              </button>
                            </div>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              ` : ""}
            </section>
          </div>
        </div>
      `;

      const panel = host.querySelector("[data-writing-task]");
      const area = panel.querySelector(".write-area");
      const countNode = panel.querySelector(".word-count");
      const sidebar = host.querySelector("#writingExerciseSidebar");
      const scrim = host.querySelector("#writingSidebarScrim");

      const closeSidebar = () => {
        sidebar.classList.remove("open");
        scrim.classList.remove("open");
        document.body.classList.remove("writing-drawer-open");
      };
      const updateCount = () => {
        const count = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
        countNode.textContent = `${count} từ / tối thiểu ${minWords(t)} từ`;
        countNode.classList.toggle("complete", count >= minWords(t));
      };
      const insertText = (text) => {
        const start = area.selectionStart;
        const end = area.selectionEnd;
        area.value = area.value.slice(0, start) + text + area.value.slice(end);
        area.focus();
        area.selectionStart = area.selectionEnd = start + text.length;
        if (!isPreviewTask) STORE.set("write_" + t.id, area.value);
        updateCount();
      };

      // Bàn phím Cyrillic ảo: chèn chữ qua insertText(); gập/mở và nhớ trạng thái trên máy này
      const kbdToggle = panel.querySelector("#writingKbdToggle");
      const kbd = panel.querySelector("#writingCyrKbd");
      if (kbdToggle && kbd) {
        let upper = false;
        const isTouch = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
        const setKbdOpen = (open) => {
          kbd.classList.toggle("hidden", !open);
          kbdToggle.setAttribute("aria-expanded", String(open));
          kbdToggle.classList.toggle("is-active", open);
          // Màn cảm ứng: khi đang mở bàn phím ảo thì không bật bàn phím hệ thống che màn hình
          if (isTouch) {
            if (open) area.setAttribute("inputmode", "none");
            else area.removeAttribute("inputmode");
          }
          STORE.set("writing_kbd_open", open);
        };
        setKbdOpen(Boolean(STORE.get("writing_kbd_open", false)));
        kbdToggle.onclick = () => setKbdOpen(kbd.classList.contains("hidden"));
        // Giữ con trỏ trong ô viết khi bấm phím ảo
        kbd.addEventListener("mousedown", (e) => e.preventDefault());
        kbd.onclick = (e) => {
          const keyBtn = e.target.closest(".writing-cyr-key");
          if (!keyBtn) return;
          const action = keyBtn.dataset.action;
          if (action === "shift") {
            upper = !upper;
            keyBtn.setAttribute("aria-pressed", String(upper));
            keyBtn.classList.toggle("is-active", upper);
            kbd.querySelectorAll(".writing-cyr-key[data-key]").forEach((b) => {
              b.textContent = upper ? b.dataset.key : b.dataset.key.toLowerCase();
            });
          } else if (action === "space") {
            insertText(" ");
          } else if (action === "back") {
            const start = area.selectionStart;
            const end = area.selectionEnd;
            if (start === end && start > 0) area.selectionStart = start - 1;
            if (area.selectionStart !== area.selectionEnd) insertText("");
          } else if (keyBtn.dataset.key) {
            insertText(upper ? keyBtn.dataset.key : keyBtn.dataset.key.toLowerCase());
          }
        };
      }

      host.querySelector("#writingBack").onclick = () => {
        closeSidebar();
        renderHub();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      host.querySelector("#writingExerciseMenu").onclick = () => {
        sidebar.classList.add("open");
        scrim.classList.add("open");
        document.body.classList.add("writing-drawer-open");
      };
      host.querySelector("#writingSidebarClose").onclick = closeSidebar;
      scrim.onclick = closeSidebar;
      host.querySelectorAll(".writing-exercise-item").forEach((button) => {
        button.onclick = () => {
          const next = topic.tasks.find((task) => task.id === button.dataset.taskId);
          if (!next || next.id === t.id || !canOpen(next)) return;
          currentTask = next;
          closeSidebar();
          renderTask();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      });

      const hintButton = panel.querySelector("#writingHintToggle");
      if (hintButton) {
        hintButton.onclick = () => {
          const hints = panel.querySelector("#writingHints");
          if (!hints) return;
          const open = hints.classList.toggle("hidden") === false;
          hintButton.setAttribute("aria-expanded", open ? "true" : "false");
          hintButton.classList.toggle("active", open);
          const textSpan = hintButton.querySelector(".writing-btn-text");
          if (textSpan) {
            textSpan.textContent = open ? "Ẩn gợi ý" : "Gợi ý";
          }
          if (open) {
            hints.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        };
      }

      area.oninput = () => {
        if (!isPreviewTask) STORE.set("write_" + t.id, area.value);
        updateCount();
      };
      updateCount();

      const vocabBtn = panel.querySelector("#btnWritingVocabToggle");
      const vocabBox = panel.querySelector("#writingVocabDropdownBox");
      const btnCloseVocab = panel.querySelector("#btnCloseWritingVocab");

      if (vocabBtn && vocabBox) {
        vocabBtn.onclick = () => {
          const isHidden = vocabBox.classList.toggle("hidden");
          vocabBtn.classList.toggle("active", !isHidden);
          if (!isHidden) {
            vocabBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        };
      }
      if (btnCloseVocab && vocabBox) {
        btnCloseVocab.onclick = () => {
          vocabBox.classList.add("hidden");
          if (vocabBtn) vocabBtn.classList.remove("active");
        };
      }
      panel.querySelectorAll(".writing-vocab-speak").forEach((button) => {
        button.onclick = () => {
          if (button.dataset.audio) {
            const audio = new Audio(button.dataset.audio);
            audio.play().catch(() => speak(button.dataset.word));
          } else {
            speak(button.dataset.word);
          }
        };
      });
      panel.querySelectorAll(".writing-vocab-add").forEach((button) => {
        button.onclick = () => window.openAddToJarModal({
          ru: button.dataset.word,
          vi: button.dataset.vi || "Từ gợi ý cho bài viết",
          note: `${(MODE_INFO[currentMode] && MODE_INFO[currentMode].title) ? MODE_INFO[currentMode].title : "Luyện viết"} · ${topic.name || ""}`
        });
      });

      // --- CẬP NHẬT HIỂN THỊ HẠN MỨC CHẤM AI TRÊN SUPABASE (3 lượt/ngày Free, 20 lượt/ngày PRO) ---
      const updateQuotaDisplay = async () => {
        const quotaBadge = panel.querySelector("#writingAiQuotaBadge");
        const quotaText = panel.querySelector("#writingAiQuotaText");
        if (!quotaText) return;
        if (isPreviewTask) {
          quotaText.innerHTML = `<span class="quota-txt" style="color:var(--muted)">Xem trước</span>`;
          if (quotaBadge) {
            quotaBadge.classList.remove("is-active", "is-empty");
            quotaBadge.classList.add("is-off");
            quotaBadge.title = "Chế độ Xem trước CMS: không gọi AI và không trừ lượt";
          }
          return;
        }
        const curUser = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
        const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : Boolean(curUser?.is_pro);
        if (!curUser) {
          quotaText.innerHTML = `<span class="quota-txt" style="color:var(--muted)">3 lượt/ngày</span>`;
          if (quotaBadge) {
            quotaBadge.classList.remove("is-active", "is-empty");
            quotaBadge.classList.add("is-off");
            quotaBadge.title = "Đăng nhập để nhận 3 lượt chấm AI mỗi ngày";
          }
          return;
        }
        if (window.RusiSupabase?.aiQuota?.get) {
          try {
            const q = await window.RusiSupabase.aiQuota.get(curUser.id || curUser.uid, isPro);
            const isZero = q.remaining <= 0;
            if (quotaBadge) {
              quotaBadge.classList.remove("is-off");
              quotaBadge.classList.toggle("is-empty", isZero);
              quotaBadge.classList.toggle("is-active", !isZero);
              quotaBadge.title = `Hạn mức AI: Còn ${q.remaining}/${q.max_limit} lượt hôm nay (Tự động làm mới mỗi ngày)`;
            }
            const tierBadge = isPro
              ? '<span class="user-tier-badge tier-pro" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">PRO</span>'
              : '<span class="user-tier-badge tier-free" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">Free</span>';
            quotaText.innerHTML = `<span class="quota-txt"><b>${Number(q.remaining) || 0}/${Number(q.max_limit) || 0}</b> lượt ${tierBadge}</span>`;
          } catch (_) {
            if (quotaBadge) {
              quotaBadge.classList.remove("is-off", "is-empty");
              quotaBadge.classList.add("is-active");
            }
            const remaining = isPro ? 20 : 3;
            const tierBadge = isPro
              ? '<span class="user-tier-badge tier-pro" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">PRO</span>'
              : '<span class="user-tier-badge tier-free" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">Free</span>';
            quotaText.innerHTML = `<span class="quota-txt"><b>${remaining}</b> lượt ${tierBadge}</span>`;
          }
        } else {
          if (quotaBadge) {
            quotaBadge.classList.remove("is-off", "is-empty");
            quotaBadge.classList.add("is-active");
          }
          const remaining = isPro ? 20 : 3;
          const tierBadge = isPro
            ? '<span class="user-tier-badge tier-pro" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">PRO</span>'
            : '<span class="user-tier-badge tier-free" style="font-size:0.65rem;padding:1px 4px;margin-left:3px;border-radius:4px;font-weight:700">Free</span>';
          quotaText.innerHTML = `<span class="quota-txt"><b>${remaining}</b> lượt ${tierBadge}</span>`;
        }
      };
      updateQuotaDisplay();

      const quotaBadgeEl = panel.querySelector("#writingAiQuotaBadge");
      if (quotaBadgeEl) {
        quotaBadgeEl.addEventListener("click", () => {
          if (typeof toast === "function") {
            toast(quotaBadgeEl.title || "Hạn mức chấm điểm AI hôm nay");
          }
        });
      }

      panel.querySelector(".btn-submit").onclick = async () => {
        if (isPreviewTask) {
          toast("Chế độ Xem trước CMS: không gửi chấm AI và không lưu tiến độ hay XP.");
          return;
        }
        const curUser = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
        const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : Boolean(curUser?.is_pro);

        // Bắt buộc đăng nhập để xác thực danh tính và giới hạn 3 lượt/ngày
        if (!curUser) {
          toast("Vui lòng đăng nhập tài khoản để sử dụng tính năng chấm điểm AI (Miễn phí 3 lượt/ngày)!");
          if (typeof AuthModal !== "undefined" && typeof AuthModal.open === "function") {
            AuthModal.open();
          } else {
            setTimeout(() => {
              window.location.href = (window.rusiRootUrl ? window.rusiRootUrl("login.html") : "login.html") + "?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
            }, 1200);
          }
          return;
        }

        if (t.is_pro_only && !isPro) {
          Monetization.showProGateModal("Nội dung dành cho PRO", "Bài viết này yêu cầu gói PRO để mở khóa AI Rusika chấm chi tiết theo chuẩn ТРКИ.");
          return;
        }
        const text = area.value.trim();
        const wordsArr = text.split(/\s+/).filter(Boolean);
        const count = wordsArr.length;
        const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
        if (count < minWords(t)) {
          toast(`Bài viết cần tối thiểu ${minWords(t)} từ (hiện tại: ${count} từ). Hãy viết thêm nhé!`);
          return;
        }

        // --- ĐÁNH GIÁ CHUẨN XÁC THEO 4 TIÊU CHÍ CEFR CHO BÀI VIẾT TIẾNG NGA ---
        const cyrillicRegex = /[\u0400-\u04FF]/g;
        const cyrillicChars = text.match(cyrillicRegex) || [];
        const latinChars = text.match(/[a-zA-Z]/g) || [];

        if (cyrillicChars.length < 10) {
          toast("Bài viết cần được viết bằng tiếng Nga (ký tự Cyrillic).");
          return;
        }

        const scoreBox = panel.querySelector(".ai-score-box");
        const submitBtn = panel.querySelector(".btn-submit");

        // Hiển thị trạng thái đang phân tích với hiệu ứng loading
        if (scoreBox) {
          scoreBox.classList.remove("hidden");
          scoreBox.innerHTML = `
            <div class="writing-score-result ai-review-loading">
              <div class="rusi-ai-spinner"></div>
              <div style="font-weight:700;color:var(--text);font-size:1.05rem;">Mèo Rusika AI đang đọc và chấm bài viết...</div>
              <div style="font-size:0.88rem;color:var(--muted);margin-top:2px;">Đang phân tích biến cách (падежи), giống số và vốn từ vựng bằng Groq Qwen 27B</div>
            </div>
          `;
          scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        if (submitBtn) submitBtn.disabled = true;

        // Không chấm được: giữ khung kết quả với thông báo cố định + nút thử lại (toast tự tắt sau ~2 giây, dễ bỏ lỡ)
        const showReviewError = (msg) => {
          if (typeof toast === "function") toast(msg);
          if (!scoreBox) return;
          scoreBox.classList.remove("hidden");
          scoreBox.innerHTML = `
            <div class="writing-score-result ai-review-error" role="alert">
              <div style="font-weight:700;color:var(--text);font-size:1.02rem;">${icon("alert-triangle", 18)} Chưa chấm được bài viết</div>
              <div style="font-size:0.9rem;color:var(--muted);margin-top:4px;">${esc(msg)}</div>
              ${/giữ nguyên/.test(msg) ? "" : `<div style="font-size:0.9rem;color:var(--muted);margin-top:2px;">Bài viết của bạn vẫn được giữ nguyên trong ô trả lời.</div>`}
              <button type="button" class="btn btn-primary btn-sm" data-ai-retry style="min-height:44px;margin-top:12px">${icon("refresh-cw", 15)} Thử chấm lại</button>
            </div>
          `;
          const retryBtn = scoreBox.querySelector("[data-ai-retry]");
          if (retryBtn && submitBtn) retryBtn.onclick = () => submitBtn.click();
          scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        };

        try {
          let total = null;
          let scores = [0, 0, 0, 0];
          let feedbackComment = "";
          let quotaInfo = null;
          let isFallback = false; // máy chủ trả điểm ước tính (không gọi được AI)
          let serverSubmissionId = null; // Edge Function mới tự lưu writing_submissions (B-05)
          const clientSubmissionId = (window.RusiSupabase && typeof window.RusiSupabase.generateUUID === "function") ? window.RusiSupabase.generateUUID() : "";
          const taskCode = String(t.code || t.id || "");
          const FALLBACK_NOTE = "Đây là điểm ước tính tự động, chưa được AI chấm.";

          const modelAns = modelAnswer(t);
          const taskTipsList = taskTips(t);
          const taskWordsList = taskWords(t).map(w => typeof w === "object" && w ? (w.ru || w.word || "") : String(w)).filter(Boolean);
          const isPicture = taskMode(t) === "picture";

          // Ưu tiên gọi Groq AI (Qwen 3.8 27B) chấm bài chuyên sâu đối chiếu sát bức ảnh và bài mẫu
          if (window.RusiAI && typeof RusiAI.reviewWriting === "function") {
            try {
              const aiRes = await RusiAI.reviewWriting({
                text,
                level: t.level || currentLevel,
                taskTitle: (t.title || "Bài luyện viết") + (t.category_name ? ` (${t.category_name})` : ""),
                prompt: (t.prompt || "") + (t.vi ? ` (${t.vi})` : ""),
                minWords: minWords(t),
                modelAnswer: modelAns,
                imageDesc: taskTipsList.join(". "),
                suggestedWords: taskWordsList.join(", "),
                taskType: isPicture ? "picture" : "translation",
                imageUrl: isPicture ? taskImage(t) : "",
                userId: curUser.id || curUser.uid,
                isPro: isPro,
                taskId: t.uuid || "",
                taskCode,
                clientSubmissionId
              });

              if (aiRes) {
                // Kiểm tra giới hạn lượt chấm AI hôm nay
                if (aiRes.limitReached) {
                  if (scoreBox) scoreBox.classList.add("hidden");
                  if (submitBtn) submitBtn.disabled = false;
                  if (!isPro && typeof Monetization !== "undefined" && typeof Monetization.showProGateModal === "function") {
                    Monetization.showProGateModal(
                      "Hết lượt chấm AI hôm nay (3/3 lượt)",
                      "Bạn đã sử dụng hết 3 lượt chấm AI miễn phí hôm nay. Nâng cấp tài khoản PRO ngay để nhận 20 lượt chấm AI/ngày và mở khóa toàn bộ tính năng cao cấp!"
                    );
                  } else {
                    toast(aiRes.message || "Bạn đã dùng hết 20 lượt chấm AI hôm nay. Lượt chấm sẽ tự động làm mới vào ngày mai!");
                  }
                  updateQuotaDisplay();
                  return;
                }

                if (aiRes.serverError) {
                  if (submitBtn) submitBtn.disabled = false;
                  showReviewError(aiRes.message || "Máy chủ AI đang bảo trì. Vui lòng thử lại sau.");
                  return;
                }

                if (aiRes.requireAuth) {
                  if (scoreBox) scoreBox.classList.add("hidden");
                  if (submitBtn) submitBtn.disabled = false;
                  toast(aiRes.message || "Vui lòng đăng nhập để sử dụng tính năng chấm điểm AI!");
                  return;
                }

                if (aiRes.success) {
                  isFallback = Boolean(aiRes.fallback);
                  total = Number(aiRes.total);
                  scores = [Number(aiRes.grammar) || 0, Number(aiRes.lexis) || 0, Number(aiRes.structure) || 0, Number(aiRes.content) || 0];
                  feedbackComment = aiRes.feedback;
                  quotaInfo = aiRes.quota;
                  serverSubmissionId = aiRes.submissionId || null;
                }
              }
            } catch (aiErr) {
              console.warn("Groq AI lỗi kết nối, không chấm được bài viết:", aiErr);
            }
          }

          // Không chấm được bằng AI (lỗi mạng/timeout/phản hồi lỗi): báo lỗi, giữ nguyên bài viết, không chấm điểm/XP
          if (total === null || total === undefined || !Number.isFinite(total)) {
            showReviewError("Không kết nối được máy chủ chấm AI nên chưa chấm được bài viết. Bài viết của bạn vẫn được giữ nguyên, vui lòng thử lại sau!");
            return;
          }

          // Lưu bài nộp (B-05): Edge Function mới đã lưu thì bỏ qua; bản cũ/chấm dự phòng → client tự lưu (không chặn hiển thị điểm)
          if (!serverSubmissionId && window.RusiSupabase && window.RusiSupabase.writing && typeof window.RusiSupabase.writing.saveSubmission === "function") {
            window.RusiSupabase.writing.saveSubmission({
              taskId: t.uuid || "",
              taskCode,
              title: t.title || "",
              level: t.level || currentLevel,
              text,
              wordCount: count,
              clientSubmissionId,
              review: { total, grammar: scores[0], lexis: scores[1], structure: scores[2], content: scores[3], feedback: feedbackComment, fallback: isFallback }
            }).then((res) => {
              if (!res || !res.ok) {
                console.error("[Writing] Không lưu được bài nộp lên máy chủ:", res && res.message);
                toast("Đã chấm xong nhưng chưa lưu được bài lên máy chủ. Hãy chép lại bài viết nếu cần giữ.");
              }
            });
          }

          // Điểm fallback (máy chủ không gọi được AI) chỉ là ước tính: không tính đạt, không thưởng điểm đạt/markDone
          const isPassed = !isFallback && total >= 66;
          // XP: chỉ cộng lần đầu đạt một đề; lần nộp chưa đạt chỉ cộng WRITING_SUBMIT tối đa 1 lần/đề/ngày
          const xpRules = typeof RUSI_XP_RULES !== "undefined" ? RUSI_XP_RULES : { WRITING_SUBMIT: 0, WRITING_PASS_BONUS: 0 };
          const hasProgress = typeof Progress !== "undefined";
          const alreadyDone = hasProgress && Progress.doneList("writeDone").map(String).includes(String(t.id));
          const submitXpKey = `write_xp_${t.id}_${typeof getLocalDateString === "function" ? getLocalDateString() : new Date().toISOString().split("T")[0]}`;
          let earnedXp = 0;
          if (hasProgress && !alreadyDone) {
            if (isPassed) earnedXp = xpRules.WRITING_SUBMIT + xpRules.WRITING_PASS_BONUS;
            else if (!STORE.get(submitXpKey, false)) earnedXp = xpRules.WRITING_SUBMIT;
          }

          scoreBox.innerHTML = `
            <div class="rusi-ai-review-card ${isPassed ? 'is-pass' : 'is-retry'}">
              <!-- Top Bar: Điểm số & Đánh giá chung -->
              <div class="rusi-ai-eval-header">
                <div class="rusi-ai-eval-lead">
                  <div class="rusi-ai-status-pill ${isPassed ? 'pass' : 'retry'}">
                    ${icon(isPassed ? 'check-circle-correct' : 'alert-triangle', 15)}
                    <span>${isFallback ? 'Điểm ước tính' : (isPassed ? 'Đạt yêu cầu' : 'Chưa đạt (Cần ≥ 66 điểm)')}</span>
                  </div>
                  <div class="rusi-ai-meta-line">
                    <span><b>${count}</b> từ</span>
                    <span class="rusi-meta-dot">·</span>
                    <span><b>${sentences.length}</b> câu</span>
                    ${earnedXp > 0 ? `
                    <span class="rusi-meta-dot">·</span>
                    <span class="rusi-xp-text">+${earnedXp} XP</span>
                    ` : ""}
                    ${quotaInfo ? `
                      <span class="rusi-meta-dot">·</span>
                      <span style="color:var(--primary);font-weight:700">${icon('bot-rusika', 13)} Còn ${Number(quotaInfo.remaining) || 0}/${Number(quotaInfo.max_limit) || 0} lượt</span>
                    ` : ""}
                  </div>
                </div>
                <div class="rusi-ai-score-box">
                  <span class="rusi-ai-score-num ${isPassed ? 'pass' : 'retry'}">${total}</span>
                  <span class="rusi-ai-score-max">/100</span>
                </div>
              </div>

              <!-- 4 Tiêu chí đánh giá (Chỉ Tiếng Việt) -->
              <div class="rusi-ai-criteria-grid">
                ${[
                  ["Ngữ pháp", scores[0]],
                  ["Vốn từ", scores[1]],
                  ["Bố cục", scores[2]],
                  ["Nội dung", scores[3]]
                ].map(([lbl, sc]) => `
                  <div class="rusi-crit-card">
                    <div class="rusi-crit-header">
                      <span class="rusi-crit-title">${lbl}</span>
                      <span class="rusi-crit-score"><b>${sc}</b>/25</span>
                    </div>
                    <div class="rusi-crit-track">
                      <div class="rusi-crit-fill ${sc >= 17 ? 'good' : 'mid'}" style="width:${Math.round((sc / 25) * 100)}%"></div>
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- Nhận xét chi tiết từ AI -->
              <div class="rusi-ai-feedback-section">
                <div class="rusi-ai-feedback-title-bar">
                  <span class="rusi-ai-feedback-icon">${icon('bot-rusika', 16)}</span>
                  <span class="rusi-ai-feedback-heading">Nhận xét chi tiết</span>
                </div>
                <div class="rusi-ai-feedback-content">
                  ${esc(feedbackComment)}
                </div>
                ${isFallback ? `<div class="rusi-ai-meta-line">${icon('alert-triangle', 13)} <span>${FALLBACK_NOTE}</span></div>` : ""}
              </div>
            </div>
          `;
          if (hasProgress) {
            const logTitle = `Bài viết: ${t.title || t.id}`;
            if (isPassed) {
              // markDone ghi 1 dòng practice_logs đầy đủ; addXp không kèm meta để tránh ghi dòng thứ 2
              Progress.addXp(earnedXp);
              Progress.markDone("writeDone", t.id, { title: logTitle, score: total, xp: earnedXp });
            } else if (earnedXp > 0) {
              STORE.set(submitXpKey, true);
              Progress.addXp(earnedXp, {
                skill_type: "writing",
                item_id: String(t.id),
                item_title: logTitle,
                score: total
              });
            }
          }
          toast(isFallback ? FALLBACK_NOTE : `AI Rusika đã phân tích và chấm xong bài viết${earnedXp > 0 ? ` (+${earnedXp} XP)` : ""}!`);
          updateQuotaDisplay();
          scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (submitErr) {
          console.error("Lỗi khi xử lý bài viết:", submitErr);
          showReviewError("Có lỗi xảy ra khi chấm bài viết. Vui lòng thử lại!");
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
        scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      const modelButton = panel.querySelector(".btn-model");
      if (modelButton) {
        modelButton.onclick = () => {
          const answer = panel.querySelector(".model-answer");
          if (!answer) return;
          const open = answer.classList.toggle("hidden") === false;
          modelButton.classList.toggle("active", open);
          modelButton.setAttribute("aria-expanded", open ? "true" : "false");
          const textSpan = modelButton.querySelector(".writing-btn-text");
          if (textSpan) {
            textSpan.textContent = open ? "Ẩn bài mẫu" : "Bài mẫu";
          } else {
            modelButton.innerHTML = `${icon("eye", 18)} <span class="writing-btn-text">${open ? "Ẩn bài mẫu" : "Bài mẫu"}</span>`;
          }
          if (open) {
            answer.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        };
      }
    };

    renderTask();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadCloudWriting = async () => {
    if (isPreviewUrl && document.body.classList.contains("in-workspace")) return;
    // 0-Egress rule: Nạp từ RAM/IndexedDB/CDN JSON trước, bỏ qua truy vấn Supabase nếu đã có đề viết
    if (window.RusiDataLoader && !window.RusiDataLoader.isLoaded("WRITING_TASKS")) {
      await window.RusiDataLoader.loadMultiple(["WRITING_TASKS", "WRITING_TOPICS"]);
      if (window.WRITING_TASKS && window.WRITING_TASKS.length > 0) {
        if (!getTasks().some((t) => t.level === currentLevel && taskMode(t) === currentMode)) {
          currentLevel = getFirstLevelWithTasks(currentMode);
        }
        if (!document.body.classList.contains("in-workspace")) { if (!checkUrlTask()) renderHub(); }
        return;
      }
    }
    if (window.WRITING_TASKS && window.WRITING_TASKS.length > 0) return;
    if (!window.RusiSupabase || !window.RusiSupabase.isReady || !window.RusiSupabase.isReady()) return;
    try {
      const remote = await window.RusiSupabase.writing.getAll();
      if (remote && remote.length) {
        cloudWriting = remote;
        if (!getTasks().some((t) => t.level === currentLevel && taskMode(t) === currentMode)) {
          currentLevel = getFirstLevelWithTasks(currentMode);
        }
        if (!document.body.classList.contains("in-workspace")) { if (!checkUrlTask()) renderHub(); }
      }
    } catch (error) {
      console.warn("[Supabase] Lỗi tải đề viết từ cloud:", error);
    }
  };

  const checkUrlTask = () => {
    try {
      const getParam = (k) => (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || (urlParams ? urlParams.get(k) : null);
      const targetTask = getParam("task") || getParam("id") || getParam("topic");
      if (isPreviewUrl) {
        const draftTask = readWritingPreviewDraft(targetTask);
        if (draftTask) {
          const mode = taskMode(draftTask);
          currentMode = mode;
          currentLevel = draftTask.level || currentLevel;
          const previewTopic = {
            key: draftTask.category || "preview",
            name: draftTask.categoryName || draftTask.title || "Luyện viết",
            tasks: [draftTask]
          };
          openWorkspace(previewTopic, draftTask);
          return true;
        }
      }
      if (targetTask) {
        const allTasks = getTasks();
        const found = allTasks.find(t => t.id === targetTask || t.code === targetTask || (t.category && t.category === targetTask));
        if (found) {
          if (!canOpen(found)) {
            if (window.Monetization && window.Monetization.openUpgradeModal) window.Monetization.openUpgradeModal("pro");
            return false;
          }
          const mode = taskMode(found);
          currentMode = mode;
          currentLevel = found.level || currentLevel;
          const topics = groupedTopics();
          const topic = topics.find(tp => tp.tasks.some(t => t.id === found.id)) || {
            key: found.category || "custom",
            name: found.title || "Luyện viết",
            tasks: [found]
          };
          openWorkspace(topic, found);
          return true;
        }
      }
    } catch (_) {}
    return false;
  };

  // Nút Back trình duyệt/Android: URL đổi (pushState) nhưng workspace vẫn mở → chạy đúng thao tác của nút Back trong trang
  if (window._rusiWritePopHandler) window.removeEventListener("popstate", window._rusiWritePopHandler);
  window._rusiWritePopHandler = () => {
    if (!openWritingIds || !document.body.classList.contains("in-workspace")) return;
    const ids = openWritingIds.filter(Boolean).map((v) => String(v).toLowerCase());
    let urlIds = [];
    try {
      urlIds = window.location.pathname.split("/").concat(Array.from(new URLSearchParams(window.location.search).values()))
        .map((v) => { try { return decodeURIComponent(v).toLowerCase(); } catch (_) { return String(v).toLowerCase(); } });
    } catch (_) {}
    if (ids.some((id) => urlIds.includes(id))) return;
    const backBtn = host.querySelector("#writingBack");
    if (backBtn) backBtn.click();
  };
  window.addEventListener("popstate", window._rusiWritePopHandler);

  if (!checkUrlTask()) {
    renderHub();
  }
  loadCloudWriting();
}
window.initWritingPage = initWritingPage;
window._initWritingPage = initWritingPage;
