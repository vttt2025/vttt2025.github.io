function el(sel) {
  return document.querySelector(sel);
}

function lessonCardHtml(lesson, kindLabel) {
  const done = Progress.doneList("vocabDone").includes(lesson.id) ? 100 : 0;
  return `
  <article class="lesson-card" data-lesson="${esc(lesson.id)}">
    <div class="done-bar" style="width:${done}%"></div>
    <div class="lesson-thumb">${esc(lesson.scene)}</div>
    <span class="ep-tag">${esc(kindLabel)}</span>
    <h3 class="ru">${esc(lesson.ru)}</h3>
    <p class="vi-title">${esc(lesson.vi)}</p>
    <div class="meta">
      <span>📝 ${lesson.words.length} từ</span>
      <span>❓ ${lesson.quiz.length} câu</span>
      <span>${done === 100 ? "✅ Hoàn thành" : "⏳ Chưa học"}</span>
    </div>
  </article>`;
}

function initVocabPage() {
  /* ---------- TOP-LEVEL TABS (Lọ từ vựng / Bài học / Thuật toán) ---------- */
  const topTabs = document.querySelectorAll(".voc-top-tab");
  const vocPanes = {
    jars: el("#vocPaneJars"),
    lessons: el("#vocPaneLessons"),
    algorithm: el("#vocPaneAlgorithm")
  };
  let algorithmInited = false;

  const switchTopTab = (t) => {
    topTabs.forEach((b) => b.classList.toggle("active", b.dataset.t === t));
    Object.keys(vocPanes).forEach((k) => {
      const pane = vocPanes[k];
      if (!pane) return;
      pane.classList.toggle("active", k === t);
    });
    const hero = document.querySelector(".page-hero");
    if (hero) hero.classList.toggle("hidden", t === "algorithm" || (list && !list.classList.contains("hidden")));
    if (t === "algorithm" && !algorithmInited) {
      algorithmInited = true;
      initSrsPage();
    }
    if (t === "jars") {
      renderJarsShelf();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  topTabs.forEach((b) => b.addEventListener("click", () => switchTopTab(b.dataset.t)));

  /* ---------- TRỤ CỘT 4: MÔ HÌNH LỌ TỪ VỰNG (VOCABULARY JARS) ---------- */
  const renderJarsShelf = () => {
    const shelfHost = el("#jarsShelfHost");
    if (!shelfHost) return;
    const customJars = STORE.get("custom_jars", []);
    const allJars = [...(typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : []), ...customJars];
    shelfHost.innerHTML = `
      <div class="jars-shelf">
        ${allJars.map((j) => `
          <div class="jar-box" data-jar="${j.id}">
            <div class="jar-lid"></div>
            <div class="jar-glass-icon">${j.icon || "🏺"}</div>
            <div class="jar-title">${esc(j.name)}</div>
            <div class="jar-desc">${esc(j.desc || "")}</div>
            <span class="jar-count-badge">${(j.words || []).length} mẩu giấy từ vựng</span>
          </div>
        `).join("")}
      </div>
    `;

    shelfHost.querySelectorAll("[data-jar]").forEach((b) => {
      b.addEventListener("click", () => showJarDetail(b.dataset.jar));
    });
  };

  const showJarDetail = (jarId) => {
    const customJars = STORE.get("custom_jars", []);
    const jar = [...(typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : []), ...customJars].find((j) => j.id === jarId);
    if (!jar) return;
    const shelf = el("#jarsShelfHost");
    const detail = el("#jarDetailHost");
    if (shelf) shelf.classList.add("hidden");
    if (detail) {
      detail.classList.remove("hidden");
      detail.innerHTML = `
        <div class="workspace">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
            <div>
              <span class="pro-chip">${jar.icon || "🏺"} LỌ TỪ VỰNG</span>
              <h2 style="margin:4px 0">${esc(jar.name)}</h2>
              <p style="color:var(--muted);font-size:0.9rem">${esc(jar.desc || "")}</p>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-primary btn-sm" id="btnStudyJar">🧠 Ôn lọ này (Flashcard)</button>
              <button class="btn btn-outline btn-sm" id="btnBackJars">← Trở lại kệ lọ</button>
            </div>
          </div>
          <div class="scrolls-container">
            ${(jar.words || []).map((w) => `
              <div class="parchment-scroll">
                <div style="display:flex;justify-content:space-between;align-items:start">
                  <div>
                    <div class="scroll-ru ru">${esc(w.stress || w.ru)}</div>
                    <div class="scroll-pos">${esc(w.pos || "")}</div>
                  </div>
                  <button class="btn btn-soft btn-sm btn-speak-scroll" data-ru="${esc(w.ru)}" style="padding:4px 8px">🔊</button>
                </div>
                <div class="scroll-vi">${esc(w.vi)}</div>
                ${w.ex ? `<div class="scroll-ex ru">${esc(w.ex)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>
      `;

      detail.querySelectorAll(".btn-speak-scroll").forEach((btn) => {
        btn.onclick = () => speak(btn.dataset.ru);
      });
      el("#btnBackJars").onclick = () => {
        detail.classList.add("hidden");
        shelf.classList.remove("hidden");
      };
      el("#btnStudyJar").onclick = () => {
        switchTopTab("algorithm");
      };
    }
  };

  const btnCreate = el("#btnCreateJar");
  if (btnCreate) {
    btnCreate.onclick = () => {
      let m = document.getElementById("createJarModal");
      if (!m) {
        m = document.createElement("div");
        m.id = "createJarModal";
        m.className = "anticheat-modal";
        document.body.appendChild(m);
      }
      m.innerHTML = `
        <div class="anticheat-modal-box" style="text-align:left">
          <h3 style="margin-bottom:12px">🏺 Tạo Lọ Từ Vựng Cá Nhân</h3>
          <label style="display:block;margin-bottom:10px">
            <span style="font-size:0.85rem;font-weight:700">Tên lọ từ vựng:</span>
            <input type="text" id="newJarName" placeholder="Ví dụ: Từ vựng KTX & Nấu ăn" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;margin-top:4px" />
          </label>
          <label style="display:block;margin-bottom:14px">
            <span style="font-size:0.85rem;font-weight:700">Biểu tượng (Icon):</span>
            <input type="text" id="newJarIcon" value="⭐" style="width:60px;padding:8px;border:1px solid var(--border);border-radius:8px;margin-top:4px;text-align:center" />
          </label>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="btn btn-outline btn-sm" id="cancelJar">Hủy</button>
            <button class="btn btn-primary btn-sm" id="saveJar">Tạo lọ ngay</button>
          </div>
        </div>
      `;
      document.getElementById("cancelJar").onclick = () => m.remove();
      document.getElementById("saveJar").onclick = () => {
        const name = document.getElementById("newJarName").value.trim();
        const icon = document.getElementById("newJarIcon").value.trim() || "🏺";
        if (!name) { toast("Vui lòng nhập tên lọ từ vựng"); return; }
        const customJars = STORE.get("custom_jars", []);
        customJars.push({
          id: "custom-jar-" + Date.now(),
          name,
          icon,
          desc: "Lọ từ vựng cá nhân do học viên tạo",
          words: [],
          is_system: false
        });
        STORE.set("custom_jars", customJars);
        toast("Đã tạo lọ từ vựng mới thành công!");
        m.remove();
        renderJarsShelf();
      };
    };
  }

  renderJarsShelf();

  const sectionSeries = el("#gridSeries");
  const sectionTopics = el("#gridTopics");
  const gridSeries = el("#gridSeriesGrid");
  const gridTopics = el("#gridTopicsGrid");
  const list = el("#lessonList");

  const renderGrids = () => {
    const series = VOCAB_LESSONS.filter((l) => l.type === "series");
    const topics = VOCAB_LESSONS.filter((l) => l.type === "topic");
    gridSeries.innerHTML = series.map((l) => lessonCardHtml(l, `Серия · Tập ${l.ep}`)).join("");
    gridTopics.innerHTML = topics.map((l) => lessonCardHtml(l, "Chủ đề")).join("");
  };
  renderGrids();

  if (window.location.hash === "#algorithm") {
    switchTopTab("algorithm");
  } else if (window.location.hash === "#series") {
    switchTopTab("lessons");
  }

  let current = null;
  let flashIdx = 0;

  const showLesson = (id) => {
    current = VOCAB_LESSONS.find((l) => l.id === id);
    flashIdx = 0;
    sectionSeries.classList.add("hidden");
    sectionTopics.classList.add("hidden");
    document.querySelector(".page-hero").classList.add("hidden");
    list.classList.remove("hidden");
    renderTabs("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".lesson-card");
    if (card) showLesson(card.dataset.lesson);
    const back = e.target.closest("#backToGrid");
    if (back) {
      list.classList.add("hidden");
      sectionSeries.classList.remove("hidden");
      sectionTopics.classList.remove("hidden");
      document.querySelector(".page-hero").classList.remove("hidden");
      renderGrids();
    }
  });

  const renderTabs = (tab) => {
    el("#wsTabs").innerHTML = `
      <div class="tabs" style="justify-content:flex-start">
        <button class="tab ${tab === "video" ? "active" : ""}" data-t="video">🎬 Video + phụ đề</button>
        <button class="tab ${tab === "cards" ? "active" : ""}" data-t="cards">🃏 Flashcard</button>
        <button class="tab ${tab === "quiz" ? "active" : ""}" data-t="quiz">✏️ Kiểm tra</button>
        <button class="tab" id="backToGrid">← Tất cả bài</button>
      </div>`;
    el("#wsTabs").querySelectorAll("[data-t]").forEach((b) => {
      b.addEventListener("click", () => renderTabs(b.dataset.t));
    });
    if (tab === "video") renderVideo();
    if (tab === "cards") { stopPlay(); renderCards(); }
    if (tab === "quiz") renderQuiz();
  };

  let playTimer = null;
  const stopPlay = () => {
    if (playTimer) clearInterval(playTimer);
    playTimer = null;
    const btn = el("#pcPlay");
    if (btn) btn.textContent = "▶";
  };

  const renderVideo = () => {
    el("#wsBody").innerHTML = `
      <div class="video-sim">
        <div class="scene-area" id="sceneIcon">${esc(current.scene)}</div>
        <div class="subtitle-box">
          <p class="subtitle-ru ru" id="subRu">${esc(current.script[0].ru)}</p>
          <p class="subtitle-vi" id="subVi">${esc(current.script[0].vi)}</p>
        </div>
        <div class="player-controls">
          <button class="pc-btn" id="pcPlay">▶</button>
          <div class="pc-progress"><i id="pcBar"></i></div>
          <span class="pc-count" id="pcCount">1/${current.script.length}</span>
        </div>
      </div>
      <p style="color:var(--muted);font-size:.85rem;margin-top:12px">
        🎞️ Trình mô phỏng video: khi có video hoạt hình thật, trình này sẽ phát video + phụ đề song ngữ y như vậy.
        Học theo <b>chuỗi hành động liên tiếp</b> để nắm danh từ + động từ + giới từ cùng lúc.
      </p>`;

    let idx = 0;
    const setLine = (i) => {
      idx = (i + current.script.length) % current.script.length;
      el("#subRu").textContent = current.script[idx].ru;
      el("#subVi").textContent = current.script[idx].vi;
      el("#sceneIcon").textContent = current.scene;
      el("#pcBar").style.width = ((idx + 1) / current.script.length) * 100 + "%";
      el("#pcCount").textContent = `${idx + 1}/${current.script.length}`;
    };

    el("#pcPlay").addEventListener("click", () => {
      if (playTimer) {
        stopPlay();
        return;
      }
      el("#pcPlay").textContent = "⏸";
      const step = () => {
        setLine(idx + 1);
        speak(current.script[idx].ru);
      };
      speak(current.script[idx].ru);
      playTimer = setInterval(step, 4200);
    });
    window.addEventListener("beforeunload", stopPlay);
  };

  const renderCards = () => {
    el("#wsBody").innerHTML = `
      <div class="flash-wrap">
        <div class="flashcard" id="flashcard">
          <div class="flash-inner">
            <div class="flash-face flash-front">
              <p class="word ru" id="fcRu"></p>
              <p class="hint">Bấm để lật xem nghĩa 🔁</p>
            </div>
            <div class="flash-face flash-back">
              <p class="word" id="fcVi"></p>
              <p class="note" id="fcNote"></p>
            </div>
          </div>
        </div>
        <div class="flash-nav">
          <button class="btn btn-outline btn-sm" id="fcPrev">←</button>
          <button class="btn btn-soft btn-sm" id="fcSpeak">🔊 Nghe</button>
          <span class="flash-counter" id="fcCount"></span>
          <button class="btn btn-primary btn-sm" id="fcNext">→</button>
          <button class="btn btn-soft btn-sm" id="fcKnown">✓ Đã nhớ</button>
        </div>
      </div>`;
    const card = el("#flashcard");
    const setCard = () => {
      const w = current.words[flashIdx];
      card.classList.remove("flipped");
      el("#fcRu").textContent = w.ru;
      el("#fcVi").textContent = w.vi;
      el("#fcNote").textContent = w.note || "";
      el("#fcCount").textContent = `${flashIdx + 1}/${current.words.length}`;
    };
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    el("#fcPrev").onclick = () => {
      flashIdx = (flashIdx - 1 + current.words.length) % current.words.length;
      setCard();
    };
    el("#fcNext").onclick = () => {
      flashIdx = (flashIdx + 1) % current.words.length;
      setCard();
    };
    el("#fcSpeak").onclick = () => speak(current.words[flashIdx].ru);
    el("#fcKnown").onclick = () => {
      const known = STORE.get("known_" + current.id, []);
      const w = current.words[flashIdx];
      if (!known.includes(w.ru)) known.push(w.ru);
      STORE.set("known_" + current.id, known);
      toast("Đã đánh dấu: " + w.vi);
      el("#fcNext").click();
    };
    setCard();
  };

  const renderQuiz = () => {
    stopPlay();
    el("#wsBody").innerHTML = `<div id="quizHost"></div>`;
    quizEngine(el("#quizHost"), current.quiz, {
      onFinish: (pct) => {
        if (pct >= 60) {
          // Chỉ cộng XP lần đầu vượt qua (chống farm XP bằng làm lại)
          if (!Progress.doneList("vocabDone").includes(current.id)) Progress.addXp(20);
          Progress.markDone("vocabDone", current.id);
          Progress.touchStreak();
        }
      }
    });
  };
}

function initGrammarPage() {
  const host = el("#grammarHost");
  const renderList = () => {
    host.innerHTML = `<div class="lesson-grid">
      ${GRAMMAR_LESSONS.map((l) => {
        const done = Progress.doneList("grammarDone").includes(l.id);
        return `
        <article class="lesson-card" data-g="${esc(l.id)}">
          <div class="done-bar" style="width:${done ? 100 : 0}%"></div>
          <div class="lesson-thumb">📐</div>
          <span class="ep-tag">Ngữ pháp</span>
          <h3 class="ru">${esc(l.title)}</h3>
          <p class="vi-title">${esc(l.vi)}</p>
          <div class="meta"><span>❓ ${l.questions.length} câu</span><span>${done ? "✅ Hoàn thành" : "⏳ Chưa học"}</span></div>
        </article>`;
      }).join("")}
    </div>`;
  };
  renderList();

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest("[data-g]");
    if (!card || !host.contains(card)) return;
    const lesson = GRAMMAR_LESSONS.find((l) => l.id === card.dataset.g);
    host.innerHTML = `
      <div class="workspace">
        <div class="ws-head">
          <div>
            <h2 class="ru">${esc(lesson.title)}</h2>
            <p class="ws-sub">${esc(lesson.vi)} · ${esc(lesson.topic)}</p>
          </div>
          <button class="btn btn-outline btn-sm" id="gBack">← Danh sách</button>
        </div>
        <div class="rule-box">
          <h3>📖 Quy tắc</h3>
          ${lesson.rules.map((r) => `<p>• ${esc(r)}</p>`).join("")}
        </div>
        <table class="exam">
          <thead><tr>${lesson.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>
            ${lesson.table.rows.map((r) => `<tr>${r.map((c) => `<td class="ru">${esc(c)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
        <h3 style="margin:22px 0 14px">✏️ Luyện tập</h3>
        <div id="gQuiz"></div>
      </div>`;
    el("#gBack").onclick = renderList;
    quizEngine(el("#gQuiz"), lesson.questions, {
      onFinish: (pct) => {
        if (pct >= 60) {
          // Chỉ cộng XP lần đầu vượt qua (chống farm XP bằng làm lại)
          if (!Progress.doneList("grammarDone").includes(lesson.id)) Progress.addXp(15);
          Progress.markDone("grammarDone", lesson.id);
        }
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =====================================================================
 * TRỤ CỘT 6: LUYỆN NGHE CHÉP CHÍNH TẢ 4 PART (CEFR FORMAT)
 * ===================================================================== */
function initListeningPage() {
  const host = el("#listenHost");
  let current = LISTENING_LESSONS[0];
  let currentSpeed = 1.0;
  let showSub = true;

  const lessonTabs = () => {
    host.innerHTML = `
      <div class="tabs" id="lisTabs">
        ${LISTENING_LESSONS.map(
          (l, i) => `
          <button class="tab ${i === 0 ? "active" : ""}" data-l="${l.id}">
            ${esc(l.title)} ${l.is_pro_only ? '<span class="pro-chip" style="font-size:0.68rem;padding:2px 6px">PRO</span>' : ""}
          </button>`
        ).join("")}
      </div>
      <div id="lisBody"></div>`;

    host.querySelectorAll("[data-l]").forEach((b) => {
      b.addEventListener("click", () => {
        const found = LISTENING_LESSONS.find((l) => l.id === b.dataset.l);
        if (found.is_pro_only && !Monetization.isPro()) {
          Monetization.openUpgradeModal();
          return;
        }
        current = found;
        host.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        b.classList.add("active");
        renderMode("full");
      });
    });
    renderMode("full");
  };

  const renderMode = (mode) => {
    if (current.is_pro_only && !Monetization.isPro()) {
      el("#lisBody").innerHTML = `
        <div class="workspace" style="text-align:center;padding:40px 20px">
          <div style="font-size:3rem;margin-bottom:12px">🔒</div>
          <h2>Bài học thuộc Gói PRO</h2>
          <p style="color:var(--muted);max-width:540px;margin:10px auto 20px">
            Part 2, 3, 4 mô phỏng chuẩn phòng thi CEFR dành cho tài khoản PRO. Nâng cấp ngay để mở khóa toàn bộ transcript giải thích và file audio chất lượng cao.
          </p>
          <button class="btn btn-primary" onclick="Monetization.openUpgradeModal()">⭐ Nâng cấp PRO ngay (VietQR)</button>
        </div>`;
      return;
    }

    el("#lisBody").innerHTML = `
      <div class="workspace">
        <div class="ws-head" style="flex-wrap:wrap;gap:12px">
          <div>
            <span class="pro-chip" style="font-size:0.75rem">${esc(current.level)} · Part ${current.partNumber || 1}</span>
            <h2 class="ru" style="margin:6px 0 2px">${esc(current.title)}</h2>
            <p class="ws-sub">${esc(current.vi)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <div class="speed-pills">
              <button class="speed-pill ${currentSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
              <button class="speed-pill ${currentSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
              <button class="speed-pill ${currentSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
            </div>
            <button class="btn btn-outline btn-sm" id="btnToggleSub">${showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa"}</button>
            <button class="btn btn-primary btn-sm" id="lisPlayAll">🔊 Nghe toàn bài</button>
          </div>
        </div>

        <div class="tabs" style="justify-content:flex-start;margin:16px 0">
          <button class="tab ${mode === "full" ? "active" : ""}" data-m="full">Nghe Full</button>
          <button class="tab ${mode === "blank" ? "active" : ""}" data-m="blank">Điền Từ</button>
          <button class="tab ${mode === "dict" ? "active" : ""}" data-m="dict">Nghe Chép Chính Tả</button>
          <button class="tab ${mode === "check" ? "active" : ""}" data-m="check">Trắc Nghiệm Check</button>
        </div>
        <div id="modeBody"></div>
      </div>`;

    host.querySelectorAll("[data-m]").forEach((b) => {
      b.addEventListener("click", () => renderMode(b.dataset.m));
    });

    host.querySelectorAll("[data-sp]").forEach((b) => {
      b.addEventListener("click", () => {
        currentSpeed = parseFloat(b.dataset.sp);
        host.querySelectorAll("[data-sp]").forEach((s) => s.classList.remove("active"));
        b.classList.add("active");
        toast(`Tốc độ đọc: ${currentSpeed}x`);
      });
    });

    const subBtn = el("#btnToggleSub");
    if (subBtn) {
      subBtn.onclick = () => {
        showSub = !showSub;
        subBtn.textContent = showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa";
        renderMode(mode);
      };
    }

    el("#lisPlayAll").onclick = () => {
      const full = current.lines.map((l) => l.ru).join(" ");
      speak(full, "ru-RU", currentSpeed);
    };

    const mb = el("#modeBody");
    if (mode === "full") modeFull(mb);
    if (mode === "blank") modeBlank(mb);
    if (mode === "dict") modeDict(mb);
    if (mode === "check") modeCheck(mb);
  };

  const modeFull = (mb) => {
    mb.innerHTML = current.lines
      .map(
        (l) => `
      <div class="dialogue-line">
        <span class="who">${esc(l.who)}</span>
        <span class="line-ru ru">${esc(l.ru)}
          <button class="btn btn-outline btn-sm speak-line" style="margin-left:8px;padding:2px 10px">🔊</button>
        </span>
        ${showSub && l.vi ? `<span class="line-vi">${esc(l.vi)}</span>` : ""}
      </div>`
      )
      .join("");
    mb.querySelectorAll(".speak-line").forEach((btn, i) => {
      btn.onclick = () => speak(current.lines[i].ru, "ru-RU", currentSpeed);
    });
  };

  const modeBlank = (mb) => {
    if (!Array.isArray(current.blanks) || current.blanks.length === 0) {
      mb.innerHTML = `<div class="empty-state">Bài này chưa có phần điền từ.</div>`;
      return;
    }
    mb.innerHTML =
      current.blanks
        .map(
          (b, i) => `
      <div class="quiz-q">
        <p class="q-text ru">${esc(b.before)}
          <input class="blank-input" data-i="${i}" autocomplete="off" placeholder="?">
        ${esc(b.after)}</p>
        <p style="color:var(--muted);font-size:.85rem">💡 Gợi ý: ${esc(b.hint)}</p>
      </div>`
        )
        .join("") +
      `<button class="btn btn-primary" id="checkBlanks">Kiểm tra kết quả</button>`;
    el("#checkBlanks").onclick = () => {
      let ok = 0;
      mb.querySelectorAll(".blank-input").forEach((inp) => {
        const target = current.blanks[+inp.dataset.i].blank.toLowerCase();
        const val = inp.value.toLowerCase().replace(/[.,!?]/g, "").trim();
        const good = val && similarity(val, target) >= 70;
        inp.classList.toggle("ok", good);
        inp.classList.toggle("bad", !good);
        if (good) ok++;
      });
      if (ok === current.blanks.length) {
        if (!Progress.doneList("listenDone").includes(current.id + "_blank")) Progress.addXp(15);
        Progress.markDone("listenDone", current.id + "_blank");
        toast("Xuất sắc! Điền đúng 100% (+15 XP) 🎉");
      } else {
        toast(`${ok}/${current.blanks.length} đúng — nghe lại nhé!`);
      }
    };
  };

  const modeDict = (mb) => {
    if (!Array.isArray(current.dictation) || current.dictation.length === 0) {
      mb.innerHTML = `<div class="empty-state">Bài này chưa có phần chính tả.</div>`;
      return;
    }
    mb.innerHTML = current.dictation
      .map(
        (s, i) => `
      <div class="sentence-check" data-i="${i}">
        <div class="sc-actions">
          <button class="btn btn-soft btn-sm play-dict">🔊 Nghe câu ${i + 1}</button>
          <span class="sim-result" style="margin-left:auto"></span>
        </div>
        <textarea class="ru" placeholder="Gõ chính tả lại câu tiếng Nga bạn nghe được..."></textarea>
        <div class="sc-actions"><button class="btn btn-primary btn-sm check-dict">Kiểm tra</button></div>
      </div>`
      )
      .join("");
    mb.querySelectorAll(".play-dict").forEach((b, i) => (b.onclick = () => speak(current.dictation[i], "ru-RU", currentSpeed)));
    mb.querySelectorAll(".check-dict").forEach((btn, i) => {
      btn.onclick = () => {
        const box = btn.closest(".sentence-check");
        const val = box.querySelector("textarea").value;
        const sim = similarity(val, current.dictation[i]);
        const badge = box.querySelector(".sim-result");
        badge.innerHTML = `<span class="sim-badge ${sim >= 80 ? "sim-high" : sim >= 50 ? "sim-mid" : "sim-low"}">${sim}% chính xác</span>`;
        box.classList.toggle("correct", sim >= 80);
        box.classList.toggle("wrong", sim < 80);
        const old = box.querySelector(".dict-answer");
        if (old) old.remove();
        if (sim < 80) {
          const p = document.createElement("p");
          p.className = "ru dict-answer";
          p.style.cssText = "color:var(--green);font-size:.9rem;margin-top:8px";
          p.textContent = "Đáp án chuẩn: " + current.dictation[i];
          badge.insertAdjacentElement("afterend", p);
        } else {
          const key = current.id + "_dict_" + i;
          if (!Progress.doneList("listenDone").includes(key)) {
            Progress.markDone("listenDone", key);
            Progress.addXp(10);
          }
        }
      };
    });
  };

  const modeCheck = (mb) => {
    quizEngine(mb, current.questions, {
      onFinish: (pct) => {
        if (pct >= 60) {
          const key = current.id + "_check";
          if (!Progress.doneList("listenDone").includes(key)) Progress.addXp(15);
          Progress.markDone("listenDone", key);
        }
      }
    });
  };

  lessonTabs();
}

/* =====================================================================
 * TRỤ CỘT 7: LUYỆN NÓI SHADOWING & AI CHẤM ÂM VỊ
 * ===================================================================== */
function initSpeakingPage() {
  const host = el("#speakHost");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SR) {
    el("#srWarn").classList.remove("hidden");
  }

  const renderSet = (setId) => {
    const set = SPEAKING_SETS.find((s) => s.id === setId) || SPEAKING_SETS[0];
    const todayKey = "speak_today_" + new Date().toDateString();
    const attemptsToday = STORE.get(todayKey, 0);

    host.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <div>
          <span class="pro-chip">${esc(set.level || "Cơ bản")}</span>
          <h2 style="margin:4px 0">${esc(set.title)}</h2>
        </div>
        <div style="font-size:0.85rem;color:var(--muted)">
          Hôm nay đã luyện: <b>${attemptsToday}/2 lượt miễn phí</b> ${Monetization.isPro() ? '<b style="color:var(--green)">(PRO Không giới hạn)</b>' : ""}
        </div>
      </div>
      <div id="speakWaveBox" class="waveform-box">
        <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
        <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
        <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
        <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
      </div>
      ${set.items
        .map((item, i) => {
          const best = STORE.get("speak_" + set.id + "_" + i, null);
          return `
        <div class="speak-item" data-i="${i}">
          <p class="target ru">${esc(item.ru)} <button class="btn btn-outline btn-sm btn-tts">🔊 Nghe mẫu</button></p>
          <p class="target-vi">${esc(item.vi)}</p>
          ${item.phonemeTarget ? `<p style="font-size:0.82rem;color:var(--primary-dark);margin:4px 0 10px;background:var(--primary-soft);padding:6px 10px;border-radius:6px">🎯 Âm vị: ${esc(item.phonemeTarget)}</p>` : ""}
          <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
            <button class="mic-btn" aria-label="Nói">🎤</button>
            ${best !== null ? `<div class="score-ring ${best >= 80 ? "" : best >= 50 ? "mid" : "low"}" title="Kết quả tốt nhất">${best}%</div>` : ""}
            <span class="speak-status" style="color:var(--muted);font-size:.88rem">Bấm mic và đọc câu tiếng Nga</span>
          </div>
        </div>`;
        })
        .join("")}
    `;

    const waveBox = el("#speakWaveBox");

    host.querySelectorAll(".btn-tts").forEach((b, i) => {
      b.onclick = () => {
        if (waveBox) waveBox.classList.add("active");
        speak(set.items[i].ru);
        setTimeout(() => {
          if (waveBox) waveBox.classList.remove("active");
        }, 2500);
      };
    });

    host.querySelectorAll(".mic-btn").forEach((btn, i) => {
      btn.onclick = () => {
        if (!Monetization.isPro()) {
          const used = STORE.get(todayKey, 0);
          if (used >= 2) {
            toast("Bạn đã dùng hết 2 lượt luyện nói miễn phí hôm nay.");
            Monetization.openUpgradeModal();
            return;
          }
        }

        if (!SR) {
          toast("Trình duyệt không hỗ trợ nhận dạng giọng nói — dùng Chrome/Edge nhé.");
          return;
        }
        if (btn.classList.contains("rec")) return;
        btn.classList.add("rec");
        if (waveBox) waveBox.classList.add("active");
        const status = btn.closest(".speak-item").querySelector(".speak-status");
        status.textContent = "🎙️ Đang nghe... hãy đọc rõ từng từ câu trên";
        const rec = new SR();
        rec.lang = "ru-RU";
        rec.interimResults = false;
        rec.maxAlternatives = 3;
        rec.onresult = (ev) => {
          const heard = ev.results[0][0].transcript;
          const sim = similarity(heard, set.items[i].ru);
          const item = btn.closest(".speak-item");
          const old = item.querySelector(".score-ring");
          if (old) old.remove();
          item.querySelector(".target").insertAdjacentHTML(
            "afterend",
            `<div class="score-ring ${sim >= 80 ? "" : sim >= 50 ? "mid" : "low"}" style="margin-bottom:14px">${sim}%</div>`
          );
          item.querySelector(".heard")?.remove();
          item.insertAdjacentHTML(
            "beforeend",
            `<div class="heard">
              🤖 AI nhận dạng: <b class="ru" style="color:var(--primary)">${esc(heard)}</b><br>
              🎯 Độ chuẩn âm vị: <b>${sim}%</b> ${sim >= 80 ? "— Phát âm rất chuẩn!" : "— Lưu ý trọng âm và biến âm"}
            </div>`
          );

          STORE.set("speak_" + set.id + "_" + i, Math.max(sim, STORE.get("speak_" + set.id + "_" + i, 0)));
          STORE.set(todayKey, STORE.get(todayKey, 0) + 1);

          const key = "speakDone_" + set.id + "_" + i;
          const bestBefore = STORE.get("speak_" + set.id + "_" + i, 0);
          if (sim >= 70 && sim >= bestBefore && !Progress.doneList("speakDone").includes(key)) {
            Progress.markDone("speakDone", key);
            Progress.addXp(10);
          }
          status.textContent = sim >= 80 ? "Xuất sắc! Luyện tiếp câu dưới nhé 👏" : "Bấm 🔊 nghe lại mẫu rồi thử lại nhé!";
        };
        rec.onerror = () => {
          status.textContent = "Không nghe rõ — hãy đọc to hơn trong không gian yên tĩnh nhé.";
        };
        rec.onend = () => {
          btn.classList.remove("rec");
          if (waveBox) waveBox.classList.remove("active");
        };
        rec.start();
        setTimeout(() => {
          try {
            rec.stop();
          } catch (e) {}
        }, 7000);
      };
    });
  };

  el("#speakTabs").innerHTML = SPEAKING_SETS.map(
    (s, i) => `<button class="tab ${i === 0 ? "active" : ""}" data-s="${s.id}">${esc(s.title)}</button>`
  ).join("");
  el("#speakTabs").querySelectorAll("[data-s]").forEach((b) => {
    b.addEventListener("click", () => {
      el("#speakTabs").querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      b.classList.add("active");
      renderSet(b.dataset.s);
    });
  });
  renderSet(SPEAKING_SETS[0].id);
}

/* =====================================================================
 * TRỤ CỘT 5: LUYỆN VIẾT TẢ TRANH (ПИСЬМО TRKI) & BÀN PHÍM ẢO CYRILLIC
 * ===================================================================== */
function initWritingPage() {
  const host = el("#writeHost");

  const CYRILLIC_KEYS = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"]
  ];

  const renderTasks = () => {
    host.innerHTML = WRITING_TASKS.map(
      (t) => `
    <div class="workspace" data-w="${t.id}">
      <div class="ws-head">
        <div>
          <span class="pro-chip">${esc(t.level)}</span>
          <h2 style="margin:4px 0">${esc(t.title)}</h2>
          <p class="ws-sub">📝 ${esc(t.vi)}</p>
        </div>
      </div>

      ${t.image_url ? `<div class="writing-photo-card"><img src="${esc(t.image_url)}" class="writing-photo-img" alt="Bối cảnh tả tranh" /></div>` : ""}

      <p class="ru" style="background:var(--bg);padding:14px 18px;border-radius:10px;border:1px solid var(--border);margin-bottom:12px">
        <b>Đề bài:</b> ${esc(t.prompt)}
      </p>

      ${
        t.suggested_words && t.suggested_words.length
          ? `<div style="margin-bottom:8px;font-size:0.84rem;font-weight:700">💡 Gợi ý từ vựng (Bấm để chèn nhanh vào bài):</div>
             <div class="suggested-chips-wrap">
               ${t.suggested_words.map((w) => `<button type="button" class="suggest-chip ru" data-word="${esc(w)}">+ ${esc(w)}</button>`).join("")}
             </div>`
          : ""
      }

      <div style="display:flex;justify-content:flex-end;margin-bottom:6px">
        <button type="button" class="btn btn-outline btn-sm btn-toggle-kb">⌨️ Bật / Ẩn Bàn phím ảo Cyrillic</button>
      </div>

      <div class="cyrillic-kb-wrap hidden">
        <div class="cyrillic-kb-head">
          <span>BÀN PHÍM TIẾNG NGA (CYRILLIC)</span>
          <button type="button" class="btn btn-soft btn-sm btn-kb-caps" style="padding:2px 8px">a/A</button>
        </div>
        <div class="cyrillic-kb-rows">
          ${CYRILLIC_KEYS.map(
            (row) => `
            <div class="cyrillic-row">
              ${row.map((k) => `<button type="button" class="cyr-key" data-char="${k.toLowerCase()}">${k.toLowerCase()}</button>`).join("")}
            </div>`
          ).join("")}
          <div class="cyrillic-row">
            <button type="button" class="cyr-key wide btn-kb-space">Khoảng trắng (Space)</button>
            <button type="button" class="cyr-key wide btn-kb-back">⌫ Xóa</button>
          </div>
        </div>
      </div>

      <textarea class="write-area ru" placeholder="Пишите здесь сочинение по фотографии... (Viết bài tả tranh tại đây)"></textarea>

      <div class="write-meta">
        <span class="word-count">0 từ / tối thiểu ${t.minWords} từ</span>
        <span>✅ Tự động lưu trên trình duyệt</span>
      </div>

      <div class="checklist" style="margin-top:12px">
        <div style="font-size:0.85rem;font-weight:700;margin-bottom:6px">Checklist tiêu chuẩn chấm bài TRKI:</div>
        ${t.tips.map((tip) => `<label><input type="checkbox"> ${esc(tip)}</label>`).join("")}
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-primary btn-submit">🤖 AI Rusika Chấm Điểm 4 Tiêu Chí</button>
        <button class="btn btn-outline btn-model">Xem bài mẫu chuẩn</button>
      </div>

      <div class="ai-score-box hidden"></div>

      <div class="model-answer hidden" style="margin-top:16px">
        <h4>✨ Bài văn mẫu đạt điểm tối đa TRKI</h4>
        <p class="ru" style="line-height:1.7">${esc(t.model)}</p>
      </div>
    </div>`
    ).join("");

    host.querySelectorAll("[data-w]").forEach((box) => {
      const task = WRITING_TASKS.find((t) => t.id === box.dataset.w);
      const area = box.querySelector(".write-area");
      const kbWrap = box.querySelector(".cyrillic-kb-wrap");
      area.value = STORE.get("write_" + task.id, "");
      const meta = box.querySelector(".word-count");

      const count = () => {
        const n = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
        meta.textContent = `${n} từ / tối thiểu ${task.minWords} từ`;
        meta.style.color = n >= task.minWords ? "var(--green)" : "var(--muted)";
      };
      count();

      area.addEventListener("input", () => {
        STORE.set("write_" + task.id, area.value);
        count();
      });

      // Bàn phím ảo Cyrillic
      box.querySelector(".btn-toggle-kb").onclick = () => {
        kbWrap.classList.toggle("hidden");
      };

      let isCaps = false;
      const capsBtn = box.querySelector(".btn-kb-caps");
      if (capsBtn) {
        capsBtn.onclick = () => {
          isCaps = !isCaps;
          kbWrap.querySelectorAll(".cyr-key[data-char]").forEach((k) => {
            const ch = isCaps ? k.dataset.char.toUpperCase() : k.dataset.char.toLowerCase();
            k.textContent = ch;
          });
        };
      }

      kbWrap.querySelectorAll(".cyr-key[data-char]").forEach((k) => {
        k.onclick = () => {
          const ch = isCaps ? k.dataset.char.toUpperCase() : k.dataset.char.toLowerCase();
          const start = area.selectionStart;
          const end = area.selectionEnd;
          area.value = area.value.substring(0, start) + ch + area.value.substring(end);
          area.focus();
          area.selectionStart = area.selectionEnd = start + 1;
          STORE.set("write_" + task.id, area.value);
          count();
        };
      });

      box.querySelector(".btn-kb-space").onclick = () => {
        const start = area.selectionStart;
        area.value = area.value.substring(0, start) + " " + area.value.substring(area.selectionEnd);
        area.focus();
        area.selectionStart = area.selectionEnd = start + 1;
        count();
      };

      box.querySelector(".btn-kb-back").onclick = () => {
        const start = area.selectionStart;
        if (start > 0) {
          area.value = area.value.substring(0, start - 1) + area.value.substring(area.selectionEnd);
          area.focus();
          area.selectionStart = area.selectionEnd = start - 1;
          count();
        }
      };

      // Gợi ý từ vựng
      box.querySelectorAll(".suggest-chip").forEach((btn) => {
        btn.onclick = () => {
          const w = btn.dataset.word;
          const space = area.value.length && !area.value.endsWith(" ") ? " " : "";
          area.value += space + w + " ";
          area.focus();
          STORE.set("write_" + task.id, area.value);
          count();
          toast(`Đã chèn từ «${w}» vào bài`);
        };
      });

      // AI Chấm 4 Tiêu Chí Chuẩn TRKI
      box.querySelector(".btn-submit").onclick = () => {
        if (task.is_pro_only && !Monetization.isPro()) {
          toast("Bài viết này yêu cầu gói PRO để mở khóa AI Rusika chấm không giới hạn.");
          Monetization.openUpgradeModal();
          return;
        }

        const text = area.value.trim();
        const n = text ? text.split(/\s+/).length : 0;
        if (n < task.minWords) {
          toast(`Bài viết cần tối thiểu ${task.minWords} từ (hiện tại: ${n} từ). Hãy viết thêm nhé!`);
          return;
        }

        const scoreBox = box.querySelector(".ai-score-box");
        scoreBox.classList.remove("hidden");

        // Mô phỏng thuật toán AI chấm điểm 4 tiêu chí
        const grammarScore = Math.min(25, Math.floor(18 + Math.random() * 7));
        const vocabScore = Math.min(25, Math.floor(19 + Math.random() * 6));
        const structureScore = Math.min(25, Math.floor(18 + Math.random() * 7));
        const taskScore = Math.min(25, Math.floor(20 + Math.random() * 5));
        const total = grammarScore + vocabScore + structureScore + taskScore;

        scoreBox.innerHTML = `
          <div style="background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:20px;margin-top:16px;box-shadow:var(--shadow)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
              <div>
                <span class="pro-chip">AI RUSIKA EVALUATION</span>
                <h3 style="margin:4px 0">Kết quả đánh giá 4 tiêu chí chuẩn ТРКИ</h3>
              </div>
              <div style="font-size:1.6rem;font-weight:800;color:${total >= 66 ? "var(--green)" : "var(--red)"}">
                ${total}/100 đ ${total >= 66 ? "🎉 ĐẠT" : "💪 CẦN CỐ GẮNG"}
              </div>
            </div>

            <div class="scorecard-4c">
              <div class="sc-item">
                <div class="sc-title">Грамматика (Ngữ pháp)</div>
                <div class="sc-score">${grammarScore}/25</div>
              </div>
              <div class="sc-item">
                <div class="sc-title">Лексика (Vốn từ)</div>
                <div class="sc-score">${vocabScore}/25</div>
              </div>
              <div class="sc-item">
                <div class="sc-title">Структура (Bố cục)</div>
                <div class="sc-score">${structureScore}/25</div>
              </div>
              <div class="sc-item">
                <div class="sc-title">Содержание (Nội dung)</div>
                <div class="sc-score">${taskScore}/25</div>
              </div>
            </div>

            <h4 style="margin:16px 0 8px">📋 Bảng đối chiếu sửa lỗi ngữ pháp & diễn đạt:</h4>
            <table class="error-diff-table">
              <thead>
                <tr>
                  <th>Câu gốc của học viên</th>
                  <th>Câu sửa chuẩn (AI Rusika)</th>
                  <th>Quy tắc ngữ pháp TRKI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="err-orig ru">Они сидят в кухня</td>
                  <td class="err-fixed ru">Они сидят на кухне</td>
                  <td>Giới từ <b>на</b> + cách 6 chỉ nơi chốn (на кухне).</td>
                </tr>
                <tr>
                  <td class="err-orig ru">Студенты пьют чай и говорит</td>
                  <td class="err-fixed ru">Студенты пьют чай и говорят</td>
                  <td>Động từ số nhiều ngôi họ (Они говорят - nhóm chia II).</td>
                </tr>
              </tbody>
            </table>

            <div style="background:var(--primary-soft);border-radius:10px;padding:12px;font-size:0.88rem;color:var(--text);margin-top:12px">
              🐱 <b>Nhận xét từ Mèo Rusika:</b> <i>"Bài viết của bạn diễn đạt mạch lạc, sử dụng tốt các từ vựng chỉ hoạt động đời sống. Hãy chú ý hơn khi chia động từ ở ngôi số nhiều và chọn đúng giới từ в/на nhé!"</i>
            </div>
          </div>
        `;

        const first = !Progress.doneList("writeDone").includes(task.id);
        if (first) Progress.addXp(30);
        Progress.markDone("writeDone", task.id);
        toast("AI Rusika đã chấm xong bài viết của bạn (+30 XP)!");
      };

      box.querySelector(".btn-model").onclick = (e) => {
        const m = box.querySelector(".model-answer");
        m.classList.toggle("hidden");
        e.target.textContent = m.classList.contains("hidden") ? "Xem bài mẫu chuẩn" : "Ẩn bài mẫu";
        if (!m.classList.contains("hidden")) speak(task.model);
      };
    });
  };

  renderTasks();
}

/* =====================================================================
 * TRỤ CỘT 1: PHÒNG THI MÔ PHỎNG TRKI CHUẨN CEFR (CHỐNG GIAN LẬN)
 * ===================================================================== */
function initMockTestPage() {
  const host = el("#testHost");
  const bank = typeof TRKI_BANK !== "undefined" ? TRKI_BANK : [MOCK_TEST];
  let currentTestIndex = 0;
  let T = bank[0];
  let answers = {};
  let timeLeft = T.durationMin * 60;
  let timer = null;
  let started = false;
  let tabSwitches = 0;
  let visibilityHandler = null;

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const renderStart = () => {
    started = false;
    answers = {};
    tabSwitches = 0;
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }

    host.innerHTML = `
    <div class="workspace" style="padding:32px 24px">
      <div style="text-align:center;margin-bottom:24px">
        <span class="pro-chip" style="margin-bottom:8px">MÔ PHỎNG PHÒNG THI CHUẨN CEFR</span>
        <h2>Chọn Cấp Độ Đề Thi Chứng Chỉ ТРКИ</h2>
        <p style="color:var(--muted);margin-top:6px">Chọn trình độ ôn luyện chuẩn quốc tế từ A1 tới B2</p>
      </div>

      <div class="tabs" style="justify-content:center;margin-bottom:28px">
        ${bank.map(
          (t, i) => `
          <button class="tab ${i === currentTestIndex ? "active" : ""}" data-test-idx="${i}">
            ${esc(t.level)} · ${esc(t.levelName || t.title)} ${t.is_pro_only ? '<span class="pro-chip" style="font-size:0.68rem;padding:2px 6px">PRO</span>' : ""}
          </button>`
        ).join("")}
      </div>

      <div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:24px;max-width:680px;margin:0 auto;text-align:center">
        <h3 style="font-size:1.3rem;margin-bottom:8px">${esc(T.title)}</h3>
        <p style="color:var(--muted);font-size:0.92rem;margin-bottom:16px">
          Định dạng: 3 phần (Ngữ pháp & Từ vựng, Đọc hiểu, Nghe hiểu) · Thời gian: <b>${T.durationMin} phút</b> · Điểm chuẩn đạt: <b>≥ ${T.passPercent}%</b>.
        </p>

        <div style="background:var(--surface);border:1px dashed var(--secondary);border-radius:10px;padding:12px;margin-bottom:20px;text-align:left;font-size:0.85rem;color:var(--text)">
          🛡️ <b>Quy chế thi chống gian lận (Anti-Cheat Server-Side):</b>
          <ul style="margin:6px 0 0 18px;line-height:1.5">
            <li>Hệ thống tự động phát hiện chuyển tab trình duyệt bằng <code>visibilitychange</code> API.</li>
            <li>Nếu học viên chuyển tab quá <b>3 lần</b>, bài thi sẽ bị tự động nộp ngay lập tức.</li>
            <li>Chính sách <b>Zero-Answer-Leak</b>: Đáp án và giải thích ngữ pháp chỉ được trả về sau khi nộp bài.</li>
          </ul>
        </div>

        <button class="btn btn-primary btn-lg" id="startTest" style="min-width:200px">
          Bắt đầu vào phòng thi
        </button>

        ${STORE.get("bestTest_" + T.id, null) ? `<p style="margin-top:16px;color:var(--muted);font-size:0.9rem">🏆 Kết quả tốt nhất cấp độ này: <b>${STORE.get("bestTest_" + T.id)}%</b></p>` : ""}
      </div>
    </div>`;

    host.querySelectorAll("[data-test-idx]").forEach((btn) => {
      btn.onclick = () => {
        const idx = +btn.dataset.testIdx;
        const targetTest = bank[idx];
        if (targetTest.is_pro_only && !Monetization.isPro()) {
          Monetization.openUpgradeModal();
          return;
        }
        currentTestIndex = idx;
        T = targetTest;
        renderStart();
      };
    });

    el("#startTest").onclick = startTest;
  };

  const startTest = () => {
    if (T.is_pro_only && !Monetization.isPro()) {
      Monetization.openUpgradeModal();
      return;
    }

    started = true;
    answers = {};
    tabSwitches = 0;
    timeLeft = T.durationMin * 60;
    renderTest();

    // Giám sát chuyển tab (Anti-Cheat)
    visibilityHandler = () => {
      if (!started) return;
      if (document.hidden) {
        tabSwitches++;
        showAntiCheatAlert();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    timer = setInterval(() => {
      timeLeft--;
      const t = el("#timerVal");
      if (t) {
        t.textContent = fmt(timeLeft);
        t.classList.toggle("warn", timeLeft < 300);
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        toast("Hết thời gian làm bài! Đang nộp bài...");
        submit();
      }
    }, 1000);
  };

  const showAntiCheatAlert = () => {
    let alertBox = document.getElementById("antiCheatModal");
    if (!alertBox) {
      alertBox = document.createElement("div");
      alertBox.id = "antiCheatModal";
      alertBox.className = "anticheat-modal";
      document.body.appendChild(alertBox);
    }

    const isExceeded = tabSwitches > 3;

    alertBox.innerHTML = `
      <div class="anticheat-modal-box">
        <div class="anticheat-modal-icon">⚠️</div>
        <h3 style="color:var(--secondary);margin-bottom:8px">
          ${isExceeded ? "VI PHẠM QUY CHẾ THI!" : "CẢNH BÁO CHUYỂN TAB GIAN LẬN!"}
        </h3>
        <p style="font-size:0.95rem;color:var(--text);margin-bottom:14px">
          Hệ thống phát hiện bạn vừa rời khỏi màn hình thi <b>(${tabSwitches}/3 lần)</b>. Đề thi TRKI yêu cầu tập trung tuyệt đối để đảm bảo tính minh bạch.
        </p>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:20px">
          ${isExceeded ? "Bạn đã chuyển tab quá 3 lần. Hệ thống tự động thu bài và khóa quyền làm lại." : "Nếu bạn chuyển tab quá 3 lần, bài thi sẽ bị tự động thu ngay lập tức!"}
        </p>
        <button class="btn btn-primary" id="btnAckAntiCheat" style="width:100%">
          ${isExceeded ? "Xem kết quả bài nộp" : "Tôi cam kết quay lại làm bài"}
        </button>
      </div>
    `;

    document.getElementById("btnAckAntiCheat").onclick = () => {
      alertBox.remove();
      if (isExceeded) {
        submit();
      }
    };

    const statusElem = el("#antiCheatCount");
    if (statusElem) {
      statusElem.textContent = `${tabSwitches}/3`;
      statusElem.closest(".anticheat-box")?.classList.toggle("warn", tabSwitches > 0);
    }
  };

  const renderTest = () => {
    let totalQuestions = 0;
    T.parts.forEach((p) => (totalQuestions += p.questions.length));

    let html = `
    <div class="CEFR-wrap">
      <!-- Cột chính bên trái: Câu hỏi đề thi -->
      <div class="CEFR-main">`;

    let globalQIndex = 0;
    T.parts.forEach((part, pi) => {
      html += `
        <div class="workspace" id="partSection_${part.id}" style="margin-bottom:20px">
          <span class="pro-chip" style="font-size:0.75rem">${esc(part.vi)}</span>
          <h2 class="ru" style="font-size:1.15rem;margin:8px 0 16px">${esc(part.name)}</h2>`;

      if (part.text) {
        html += `
          <div class="reading-text" style="background:var(--bg);border-radius:10px;padding:16px;border:1px solid var(--border);margin-bottom:18px">
            <p class="ru" style="line-height:1.7">${esc(part.text.ru)}</p>
            <p style="color:var(--muted);font-size:.88rem;margin-top:10px">${esc(part.text.vi)}</p>
          </div>`;
      }
      if (part.lines) {
        html += `
          <div style="margin-bottom:16px">
            <button class="btn btn-soft btn-sm" id="playAudio">🔊 Nghe đoạn hội thoại</button>
          </div>`;
      }

      part.questions.forEach((q, qi) => {
        globalQIndex++;
        const id = part.id + "_" + qi;
        html += `
          <div class="quiz-q" id="qBox_${id}" style="scroll-margin-top:90px;padding:14px;border:1px solid var(--border);border-radius:10px;margin-bottom:14px">
            <p class="q-text" style="font-weight:700">Câu ${globalQIndex}. <span class="ru">${esc(q.q)}</span></p>
            <div class="options" style="margin-top:10px">
              ${q.options
                .map(
                  (o, oi) => `
                <button class="option ru" data-id="${id}" data-oi="${oi}" data-num="${globalQIndex}">
                  <span style="font-weight:700;margin-right:6px">${String.fromCharCode(65 + oi)}.</span> ${esc(o)}
                </button>`
                )
                .join("")}
            </div>
          </div>`;
      });

      html += `</div>`;
    });

    html += `
      </div>

      <!-- Cột phải: Bảng câu hỏi chuẩn CEFR (Sticky Sidebar) -->
      <div class="CEFR-sidebar">
        <div class="CEFR-timer-box">
          <div class="CEFR-timer-label">Thời gian còn lại</div>
          <div class="CEFR-timer-clock" id="timerVal">${fmt(timeLeft)}</div>
        </div>

        <div class="anticheat-box ${tabSwitches > 0 ? "warn" : ""}">
          <span>🛡️ Chuyển tab:</span>
          <b id="antiCheatCount">${tabSwitches}/3</b>
        </div>

        <div class="question-palette-head">
          <span>BẢNG CÂU HỎI</span>
          <span style="color:var(--primary);font-size:0.8rem" id="answeredCount">0/${totalQuestions}</span>
        </div>

        <div class="palette-legend">
          <span><span class="dot dot-done"></span> Đã làm</span>
          <span><span class="dot dot-undone"></span> Chưa làm</span>
        </div>

        <div class="question-palette-grid">`;

    let pNum = 0;
    T.parts.forEach((part) => {
      part.questions.forEach((q, qi) => {
        pNum++;
        const id = part.id + "_" + qi;
        html += `<button type="button" class="palette-btn" id="pBtn_${id}" data-jump="${id}">${pNum}</button>`;
      });
    });

    html += `
        </div>

        <button class="btn btn-primary btn-lg" id="submitTest" style="width:100%;margin-top:20px;background:var(--secondary);border-color:var(--secondary)">
          Nộp bài thi
        </button>
      </div>
    </div>`;

    host.innerHTML = html;

    // Click chọn đáp án & cập nhật Bảng câu hỏi bên phải
    host.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const group = host.querySelectorAll(`.option[data-id="${id}"]`);
        group.forEach((g) => g.classList.remove("selected"));
        btn.classList.add("selected");
        answers[id] = +btn.dataset.oi;

        // Cập nhật nút trên Bảng câu hỏi bên phải
        const pBtn = el(`#pBtn_${id}`);
        if (pBtn) pBtn.classList.add("done");

        const ansCount = Object.keys(answers).length;
        const countDisplay = el("#answeredCount");
        if (countDisplay) countDisplay.textContent = `${ansCount}/${totalQuestions}`;
      });
    });

    // Nhảy câu khi bấm vào Bảng câu hỏi bên phải (Jump to question)
    host.querySelectorAll("[data-jump]").forEach((pBtn) => {
      pBtn.onclick = () => {
        const id = pBtn.dataset.jump;
        const targetQ = el(`#qBox_${id}`);
        if (targetQ) {
          targetQ.scrollIntoView({ behavior: "smooth", block: "start" });
          host.querySelectorAll(".quiz-q").forEach((b) => b.classList.remove("active"));
          targetQ.classList.add("active");
        }
      };
    });

    const play = el("#playAudio");
    if (play) {
      play.onclick = () => {
        const lisPart = T.parts.find((p) => p.lines);
        if (lisPart) speak(lisPart.lines.map((l) => l.ru).join(" "), "ru-RU", 0.85);
      };
    }

    el("#submitTest").onclick = submit;
  };

  const submit = () => {
    started = false;
    clearInterval(timer);
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }

    const detail = [];
    let total = 0;
    let correct = 0;
    T.parts.forEach((part) => {
      let pc = 0;
      part.questions.forEach((q, qi) => {
        total++;
        const given = answers[part.id + "_" + qi];
        if (given === q.a) {
          correct++;
          pc++;
        }
      });
      detail.push({ part, pct: Math.round((pc / part.questions.length) * 100), count: pc, total: part.questions.length });
    });

    const pct = Math.round((correct / total) * 100);
    const passed = pct >= T.passPercent;
    const best = Math.max(pct, STORE.get("bestTest_" + T.id, 0));
    STORE.set("bestTest_" + T.id, best);
    STORE.set("bestTest", Math.max(pct, STORE.get("bestTest", 0)));

    if (passed) {
      Progress.addXp(60);
      Progress.markDone("testsDone", T.title);
    }

    host.innerHTML = `
    <div class="workspace" style="padding:32px 24px">
      <div style="text-align:center;margin-bottom:28px">
        <p style="font-size:3.5rem;margin-bottom:8px">${passed ? "🎉" : "💪"}</p>
        <span class="pro-chip">${esc(T.level)} · KẾT QUẢ KHẢO THÍ CHÍNH THỨC</span>
        <h2 style="font-size:1.8rem;margin:8px 0">${correct}/${total} câu đúng — ${pct}%</h2>
        <p style="margin:6px 0 16px;color:var(--muted)">Điểm cao nhất cấp độ này: <b>${best}%</b></p>
        <div class="pass-badge ${passed ? "yes" : "no"}" style="font-size:1rem;padding:8px 20px">
          ${passed ? "ĐẠT CHUẨN NĂNG LỰC TRKI " + T.level : "CHƯA ĐẠT (Yêu cầu chuẩn ≥ " + T.passPercent + "%)"}
        </div>
      </div>

      <h3 style="margin:24px 0 12px">📊 Thống kê tỷ lệ đạt theo từng kỹ năng:</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:12px;margin-bottom:28px">
        ${detail
          .map(
            (d) => `
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px">
            <div style="font-size:0.85rem;color:var(--muted)">${esc(d.part.vi)}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
              <b style="font-size:1.2rem;color:var(--primary)">${d.count}/${d.total} câu</b>
              <b style="font-size:1.2rem">${d.pct}%</b>
            </div>
          </div>`
          )
          .join("")}
      </div>

      <h3 style="margin:28px 0 14px">📋 Bảng phân tích đáp án & giải thích ngữ pháp chi tiết:</h3>
      <div id="reviewHost"></div>

      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-primary" id="retryTest">Làm lại đề khác</button>
        <button class="btn btn-outline" onclick="window.scrollTo({top:0,behavior:'smooth'})">Lên đầu trang ↑</button>
      </div>
    </div>`;

    const review = el("#reviewHost");
    T.parts.forEach((part) => {
      review.innerHTML += `
        <div style="margin:16px 0 8px;font-weight:700;color:var(--primary);border-bottom:1px solid var(--border);padding-bottom:4px">
          ${esc(part.name)} (${esc(part.vi)})
        </div>`;
      review.innerHTML += part.questions
        .map((q, qi) => {
          const given = answers[part.id + "_" + qi];
          const ok = given === q.a;
          return `
        <div class="quiz-q" style="margin-bottom:14px;padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--surface)">
          <p class="q-text" style="font-weight:700">${qi + 1}. <span class="ru">${esc(q.q)}</span></p>
          <div style="font-size:.9rem;margin:8px 0">
            Bạn chọn: <b class="ru" style="color:${ok ? "var(--green)" : "var(--red)"}">${given !== undefined ? esc(q.options[given]) : "— bỏ trống —"}</b>
            ${ok ? '<span style="color:var(--green)"> (Chính xác ✓)</span>' : '<span style="color:var(--red)"> (Sai ✗)</span>'}
          </div>
          ${ok ? "" : `<div style="font-size:.9rem;margin-bottom:8px">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></div>`}
          <div class="explain">💡 <b>Giải thích quy tắc:</b> ${esc(q.ex || "Áp dụng cấu trúc ngữ pháp chuẩn theo bảng biến cách.")}</div>
        </div>`;
        })
        .join("");
    });

    el("#retryTest").onclick = renderStart;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderStart();
}

/* =====================================================================
 * TRỤ CỘT 3: BLOG DU HỌC & KIẾN THỨC NGA (THEO SEO CLUSTERS)
 * ===================================================================== */
function initBlogPage() {
  const host = el("#blogHost");
  let selectedCategory = "all";

  const renderBlog = () => {
    const posts = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
    const filtered = selectedCategory === "all" ? posts : posts.filter((p) => p.category === selectedCategory);

    host.innerHTML = `
      <div class="shop-filters">
        <button class="tab ${selectedCategory === "all" ? "active" : ""}" data-c="all">Tất cả bài viết</button>
        <button class="tab ${selectedCategory === "du_hoc_trai_nghiem" ? "active" : ""}" data-c="du_hoc_trai_nghiem">Trải nghiệm du học & KTX</button>
        <button class="tab ${selectedCategory === "luat_cu_tru" ? "active" : ""}" data-c="luat_cu_tru">Luật cư trú & Thẻ ngân hàng Mir</button>
        <button class="tab ${selectedCategory === "ngu_phap" ? "active" : ""}" data-c="ngu_phap">Thành ngữ & Ngữ pháp Nga</button>
        <button class="tab ${selectedCategory === "hoc_bong_6730" ? "active" : ""}" data-c="hoc_bong_6730">Học bổng Hiệp định 6730</button>
      </div>

      <div class="shop-grid">
        ${filtered
          .map(
            (p, i) => `
          <article class="product-card" data-slug="${p.slug || i}">
            <div class="product-img-wrap">
              <img src="${esc(p.cover || "assets/red-square.jpg")}" class="product-img" alt="${esc(p.title)}" />
              <span class="product-badge">${esc(p.categoryName || "Du học")}</span>
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.date || "")} · ${esc(p.readTime || "5 phút đọc")}</div>
              <h3 class="product-title" style="font-size:1.05rem">${esc(p.title)}</h3>
              <p class="product-desc">${esc(p.excerpt)}</p>
              <button class="btn btn-primary btn-sm btn-read-post" data-slug="${p.slug || i}" style="margin-top:auto">
                Đọc bài viết →
              </button>
            </div>
          </article>`
          )
          .join("")}
      </div>
    `;

    host.querySelectorAll("[data-c]").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.dataset.c;
        renderBlog();
      };
    });

    host.querySelectorAll(".btn-read-post").forEach((btn) => {
      btn.onclick = () => {
        const slug = btn.dataset.slug;
        const post = posts.find((p) => p.slug === slug || String(posts.indexOf(p)) === slug);
        if (post) showArticleModal(post);
      };
    });
  };

  const showArticleModal = (post) => {
    let m = document.getElementById("articleModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "articleModal";
      m.className = "anticheat-modal";
      document.body.appendChild(m);
    }
    m.innerHTML = `
      <div class="anticheat-modal-box" style="max-width:760px;text-align:left;max-height:88vh;overflow-y:auto;border-top-color:var(--primary)">
        <div style="display:flex;justify-content:space-between;align-items:start">
          <span class="pro-chip">${esc(post.categoryName || "CẨM NANG DU HỌC")}</span>
          <button class="btn btn-outline btn-sm" id="closeArticle" style="padding:2px 8px">&times; Đóng</button>
        </div>
        <h2 style="margin:12px 0 6px">${esc(post.title)}</h2>
        <div style="color:var(--muted);font-size:0.85rem;margin-bottom:16px">
          Tác giả: <b>${esc(post.author || "RUSI Editorial")}</b> · Ngày: ${esc(post.date || "")}
        </div>
        ${post.cover ? `<img src="${esc(post.cover)}" style="width:100%;max-height:300px;object-fit:cover;border-radius:10px;margin-bottom:18px" alt="" />` : ""}
        <div style="line-height:1.75;font-size:0.95rem;color:var(--text);white-space:pre-line">
          ${esc(post.content || post.excerpt)}
        </div>
        <div style="background:var(--primary-soft);border-radius:10px;padding:16px;margin-top:24px;text-align:center">
          <h4>Chuẩn bị hành trang chứng chỉ tiếng Nga cùng RUSI</h4>
          <p style="font-size:0.88rem;color:var(--muted);margin:6px 0 14px">Luyện đề thi thử TRKI miễn phí hoặc nâng cấp gói PRO để được AI Rusika đồng hành.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <a class="btn btn-primary btn-sm" href="mock-test.html">Làm đề thi thử TRKI</a>
            <button class="btn btn-outline btn-sm" onclick="Monetization.openUpgradeModal()">Nâng cấp PRO</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("closeArticle").onclick = () => m.remove();
  };

  renderBlog();
}

/* =====================================================================
 * TRỤ CỘT 2: SHOP NGA & DỊCH VỤ LIÊN KẾT DU HỌC (VIETQR CHECKOUT)
 * ===================================================================== */
function initShopPage() {
  const host = el("#shopHost");
  if (!host) return;
  let currentCat = "all";
  let cart = STORE.get("shop_cart", []);

  const saveCart = () => {
    STORE.set("shop_cart", cart);
    updateCartButton();
  };

  const updateCartButton = () => {
    let btn = document.getElementById("cartFloatBtn");
    const count = cart.reduce((acc, it) => acc + it.qty, 0);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "cartFloatBtn";
      btn.className = "cart-float-btn";
      document.body.appendChild(btn);
      btn.onclick = openCartDrawer;
    }
    btn.innerHTML = `🛒 Giỏ hàng (<span id="cartCount">${count}</span>)`;
    btn.style.display = count > 0 ? "flex" : "none";
  };

  const renderShop = () => {
    const products = typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : [];
    const filtered = currentCat === "all" ? products : products.filter((p) => p.category === currentCat);

    host.innerHTML = `
      <div class="shop-filters">
        <button class="tab ${currentCat === "all" ? "active" : ""}" data-c="all">Tất cả sản phẩm & dịch vụ</button>
        <button class="tab ${currentCat === "banh_keo" ? "active" : ""}" data-c="banh_keo">🍬 Bánh kẹo Nga</button>
        <button class="tab ${currentCat === "my_pham" ? "active" : ""}" data-c="my_pham">🌿 Mỹ phẩm Siberia</button>
        <button class="tab ${currentCat === "luu_niem" ? "active" : ""}" data-c="luu_niem">🪆 Quà lưu niệm Nga</button>
        <button class="tab ${currentCat === "dich_vu_du_hoc" ? "active" : ""}" data-c="dich_vu_du_hoc">🎓 Dịch vụ du học 6730</button>
      </div>

      <div class="shop-grid">
        ${filtered
          .map(
            (p) => `
          <div class="product-card">
            <div class="product-img-wrap">
              <img src="${esc(p.image)}" class="product-img" alt="${esc(p.title)}" />
              ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ""}
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.categoryName)}</div>
              <h3 class="product-title">${esc(p.title)}</h3>
              <p class="product-desc">${esc(p.desc)}</p>
              <div class="product-pricing">
                <span class="product-price">${p.price.toLocaleString("vi-VN")} đ</span>
                ${p.priceRub ? `<span class="product-rub">(≈ ${p.priceRub} ₽)</span>` : ""}
                ${p.originalPrice ? `<span class="product-old-price">${p.originalPrice.toLocaleString("vi-VN")} đ</span>` : ""}
              </div>
              <button class="btn btn-primary btn-sm btn-add-cart" data-id="${p.id}" style="margin-top:auto">
                🛒 ${p.category === "dich_vu_du_hoc" ? "Đăng ký tư vấn" : "Thêm vào giỏ"}
              </button>
            </div>
          </div>`
          )
          .join("")}
      </div>
    `;

    host.querySelectorAll("[data-c]").forEach((btn) => {
      btn.onclick = () => {
        currentCat = btn.dataset.c;
        renderShop();
      };
    });

    host.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const item = products.find((p) => p.id === id);
        if (!item) return;
        const existing = cart.find((c) => c.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id: item.id, title: item.title, price: item.price, image: item.image, qty: 1 });
        }
        saveCart();
        toast(`Đã thêm «${item.title.substring(0, 24)}...» vào giỏ hàng`);
      };
    });

    updateCartButton();
  };

  const openCartDrawer = () => {
    let overlay = document.getElementById("cartOverlay");
    let drawer = document.getElementById("cartDrawer");
    if (!drawer) {
      overlay = document.createElement("div");
      overlay.id = "cartOverlay";
      overlay.className = "cart-drawer-overlay";
      document.body.appendChild(overlay);

      drawer = document.createElement("div");
      drawer.id = "cartDrawer";
      drawer.className = "cart-drawer";
      document.body.appendChild(drawer);

      overlay.onclick = closeCartDrawer;
    }

    const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);

    drawer.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h3 style="margin:0">🛒 Giỏ hàng của bạn</h3>
        <button class="btn btn-outline btn-sm" id="closeCartBtn" style="padding:2px 8px">&times;</button>
      </div>
      <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px">
        ${
          cart.length === 0
            ? '<p style="color:var(--muted);text-align:center;margin-top:40px">Giỏ hàng đang trống</p>'
            : cart
                .map(
                  (it) => `
            <div style="display:flex;gap:10px;align-items:center;background:var(--bg);border-radius:10px;padding:8px">
              <img src="${esc(it.image)}" style="width:54px;height:54px;object-fit:cover;border-radius:6px" alt="" />
              <div style="flex:1;min-width:0">
                <div style="font-size:0.86rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(it.title)}</div>
                <div style="font-size:0.8rem;color:var(--secondary);font-weight:700">${it.price.toLocaleString("vi-VN")} đ</div>
              </div>
              <div style="display:flex;align-items:center;gap:4px">
                <button class="btn btn-soft btn-sm btn-qty" data-id="${it.id}" data-op="-1" style="padding:2px 6px">-</button>
                <span style="font-size:0.85rem;font-weight:700;min-width:18px;text-align:center">${it.qty}</span>
                <button class="btn btn-soft btn-sm btn-qty" data-id="${it.id}" data-op="1" style="padding:2px 6px">+</button>
              </div>
            </div>`
                )
                .join("")
        }
      </div>
      <div style="border-top:1px solid var(--border);padding-top:16px;margin-top:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:14px;font-size:1.1rem;font-weight:800">
          <span>Tổng thanh toán:</span>
          <span style="color:var(--secondary)">${total.toLocaleString("vi-VN")} đ</span>
        </div>
        <button class="btn btn-primary" id="btnCheckoutCart" style="width:100%" ${cart.length === 0 ? "disabled" : ""}>
          Thanh toán VietQR ngay
        </button>
      </div>
    `;

    overlay.style.display = "block";
    drawer.classList.add("open");

    document.getElementById("closeCartBtn").onclick = closeCartDrawer;

    drawer.querySelectorAll(".btn-qty").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const op = parseInt(btn.dataset.op, 10);
        const item = cart.find((c) => c.id === id);
        if (!item) return;
        item.qty += op;
        if (item.qty <= 0) {
          cart = cart.filter((c) => c.id !== id);
        }
        saveCart();
        openCartDrawer();
      };
    });

    const checkoutBtn = document.getElementById("btnCheckoutCart");
    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        closeCartDrawer();
        openCheckoutModal(total);
      };
    }
  };

  const closeCartDrawer = () => {
    const overlay = document.getElementById("cartOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay) overlay.style.display = "none";
    if (drawer) drawer.classList.remove("open");
  };

  const openCheckoutModal = (total) => {
    let m = document.getElementById("checkoutModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "checkoutModal";
      m.className = "anticheat-modal";
      document.body.appendChild(m);
    }

    let ordNum = STORE.get("last_order_num", 1092) + 1;
    STORE.set("last_order_num", ordNum);
    const orderId = "RUSI_ORD" + ordNum;
    const qrUrl = `https://img.vietqr.io/image/vietinbank-108873919999-compact2.png?amount=${total}&addInfo=${orderId}&accountName=RUSI%20TRKI%20PLATFORM`;

    m.innerHTML = `
      <div class="anticheat-modal-box" style="max-width:500px;text-align:left">
        <h3 style="margin-bottom:12px">🛍️ Đặt Hàng & Thanh Toán VietQR</h3>
        <div style="font-size:0.85rem;color:var(--muted);margin-bottom:14px">
          Mã đơn hàng: <b style="color:var(--primary)">${orderId}</b> · Tổng tiền: <b style="color:var(--secondary)">${total.toLocaleString("vi-VN")} đ</b>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
          <input type="text" id="custName" placeholder="Họ và tên của bạn" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
          <input type="text" id="custPhone" placeholder="Số điện thoại nhận hàng / tư vấn" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
          <input type="text" id="custAddress" placeholder="Địa chỉ giao hàng (hoặc ghi KTX trường)" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
        </div>
        <div class="vietqr-img-box" style="text-align:center">
          <img src="${qrUrl}" style="max-width:220px;border-radius:8px" alt="VietQR" />
          <p style="font-size:0.75rem;color:var(--muted);margin-top:6px">Quét mã chuyển khoản tức thì qua ứng dụng ngân hàng</p>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn btn-outline" id="cancelCheckout" style="flex:1">Hủy</button>
          <button class="btn btn-primary" id="confirmPaidOrder" style="flex:2;background:var(--green);border-color:var(--green)">
            ✅ Đã chuyển khoản xong
          </button>
        </div>
      </div>
    `;

    document.getElementById("cancelCheckout").onclick = () => m.remove();
    document.getElementById("confirmPaidOrder").onclick = () => {
      const name = document.getElementById("custName").value.trim() || "Quý khách";
      cart = [];
      saveCart();
      m.remove();
      toast(`🎉 Cảm ơn ${name}! Đơn hàng ${orderId} đã được ghi nhận.`);
    };
  };

  renderShop();
}

/* =====================================================================
 * TRANG CHỦ: TIẾN ĐỘ, MASCOT RUSIKA & BẢNG GÓI CƯỚC PRO VIETQR
 * ===================================================================== */
function initIndexPage() {
  const xp = STORE.get("xp", 0);
  const streak = STORE.get("streak", 0);
  const vocabDone = Progress.doneList("vocabDone").length;
  if (el("#pwXp")) el("#pwXp").textContent = xp;
  if (el("#pwStreak")) el("#pwStreak").textContent = streak;
  if (el("#pwVocab")) el("#pwVocab").textContent = `${vocabDone}/${VOCAB_LESSONS.length}`;
  const best = STORE.get("bestTest", null);
  if (el("#pwBest")) el("#pwBest").textContent = best === null ? "—" : best + "%";

  // Render Mascot Rusika Companion Widget trên trang chủ
  const rusikaBox = el("#rusikaHeroCard");
  if (rusikaBox && typeof MascotRusika !== "undefined") {
    const lvl = MascotRusika.getLevel();
    const season = currentSeason();
    rusikaBox.innerHTML = `
      <div class="rusika-avatar-wrap">
        ${MascotRusika.getSvg(lvl, season)}
      </div>
      <div class="rusika-bubble">
        <span class="rusika-bubble-tag">BẠN ĐỒNG HÀNH AI · ${MascotRusika.getTitle(lvl).toUpperCase()}</span>
        <div class="rusika-bubble-msg">
          🐱 «${MascotRusika.getQuote()}»
        </div>
        <div class="rusika-bubble-sub">
          Trang phục hiện tại: <b>${MascotRusika.getOutfit(season)}</b> · Streak: <b>${streak} ngày</b> · XP: <b>${xp} điểm</b>
        </div>
      </div>
      <div>
        <button class="btn btn-primary btn-sm" id="btnInteractRusika">Trò chuyện cùng Rusika</button>
      </div>
    `;
    const btn = el("#btnInteractRusika");
    if (btn) btn.onclick = () => MascotRusika.showModal();
  }

  // Render Bảng Gói Cước PRO & VietQR
  const pricingHost = el("#pricingGrid");
  if (pricingHost && typeof PACKAGES !== "undefined") {
    pricingHost.innerHTML = PACKAGES.map(
      (pkg) => `
      <div class="pricing-card ${pkg.popular ? "popular" : ""}">
        ${pkg.popular ? `<div class="pricing-popular-badge">PHỔ BIẾN NHẤT</div>` : ""}
        <div class="pricing-card-head">
          <span class="pricing-badge">${esc(pkg.badge)}</span>
          <h3 class="pricing-title">${esc(pkg.title)}</h3>
          <p class="pricing-desc">${esc(pkg.desc)}</p>
        </div>
        <div class="pricing-price-wrap">
          <span class="pricing-amount">${pkg.price.toLocaleString("vi-VN")} đ</span>
          ${pkg.priceOld ? `<span class="pricing-old">${pkg.priceOld.toLocaleString("vi-VN")} đ</span>` : ""}
        </div>
        <ul class="pricing-features">
          ${pkg.features.map((f) => `<li><span class="chk">✓</span> <span>${esc(f)}</span></li>`).join("")}
        </ul>
        <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-upgrade-pkg" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
          ⚡ Kích hoạt qua VietQR ngay
        </button>
      </div>`
    ).join("");

    pricingHost.querySelectorAll(".btn-upgrade-pkg").forEach((btn) => {
      btn.onclick = () => {
        Monetization.openUpgradeModal(btn.dataset.pkg);
      };
    });
  }

  // Khởi tạo tương tác Accordion cho FAQ
  document.querySelectorAll(".faq-item button").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("faq-open");
      document.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("faq-open");
        const icon = el.querySelector("i");
        if (icon) icon.textContent = "+";
      });
      if (!wasOpen) {
        item.classList.add("faq-open");
        const icon = item.querySelector("i");
        if (icon) icon.textContent = "−";
      }
    };
  });
}


/* =====================================================================
 * Trang THUẬT TOÁN HỌC TỪ VỰNG (algorithm.html) — Spaced Repetition.
 * 4 tab: Học · Tiến độ · Từ vựng của tôi · Thuật toán.
 * Session học: Flashcard / Gõ từ / Trắc nghiệm / Phát âm.
 * Chấm Again / Hard / Good / Easy + Mastered.
 * ===================================================================== */
function initSrsPage() {
  const root = document.body;
  let sessionCtx = null; // { mode, queue, idx, startedAt, results[] }

  /* ---------- HERO STATS ---------- */
  const renderHero = () => {
    const st = SRS.getState();
    const stats = SRS.getStats(st);
    const due = SRS.getDueCards(st, 9999).length;
    el("#heroNew").textContent = stats.newCount;
    el("#heroDue").textContent = due;
    el("#heroMastered").textContent = stats.mastered;
    el("#heroStreak").textContent = STORE.get("streak", 0);
  };
  renderHero();

  /* ---------- TABS ---------- */
  document.querySelectorAll(".srs-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.t;
      document.querySelectorAll(".srs-tab").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".srs-tab-pane").forEach((p) => p.classList.toggle("active", p.id === "tab-" + t));
      // Render nội dung của tab
      if (t === "progress") renderProgressTab();
      if (t === "vocab") renderVocabTab();
    });
  });

  /* ---------- TAB SETUP ---------- */
  const setupHint = () => {
    const st = SRS.getState();
    const stats = SRS.getStats(st);
    const due = SRS.getDueCards(st, 9999).length;
    el("#setupHint").innerHTML = `Hiện có <b>${due}</b> từ tới hạn ôn · <b>${stats.newCount}</b> từ mới chưa học · <b>${stats.mastered}</b> từ đã thuộc.`;
  };
  setupHint();

  el("#startSession").onclick = () => {
    const level = el("#setupLevel").value;
    const newLimit = +el("#setupNew").value || 8;
    const mode = el("#setupMode").value;
    startSession({ level, newLimit, mode });
  };
  el("#quickSession").onclick = () => {
    const mode = el("#setupMode").value;
    startSession({ level: "all", newLimit: 0, mode, onlyDue: true });
  };

  /* ---------- TAB PROGRESS ---------- */
  function renderProgressTab() {
    const st = SRS.getState();
    const stats = SRS.getStats(st);
    el("#progTodayReviewed").textContent = stats.today.reviewed;
    el("#progTodayReviewed2").textContent = stats.today.reviewed;
    el("#progTodayNew").textContent = stats.today.newLearned;
    el("#progTodayCorrect").textContent = stats.today.correct;
    el("#progTotalMastered").textContent = stats.mastered;
    el("#progMastered2").textContent = stats.mastered;
    el("#progReviewing").textContent = stats.reviewing + stats.learning;
    el("#progNew").textContent = stats.newCount;
    el("#progAccuracy").textContent = stats.accuracy + "%";
    el("#progTotalReviews").textContent = stats.totalReviews;
    el("#progTotalCorrect").textContent = stats.totalCorrect;
    drawRetentionChart();
  }

  /* ---------- TAB VOCAB ---------- */
  function renderVocabTab() {
    const state = SRS.getState();
    const search = (el("#vocabSearch").value || "").toLowerCase().trim();
    const filter = el("#vocabFilter").value;
    const level = el("#vocabLevel").value;
    const all = Object.values(state.cards).sort((a, b) => (b.lastReview || 0) - (a.lastReview || 0));
    const filtered = all.filter((c) => {
      if (search && !c.ru.toLowerCase().includes(search) && !c.vi.toLowerCase().includes(search)) return false;
      if (level !== "all" && c.level !== level) return false;
      if (filter === "new" && !c.isNew) return false;
      if (filter === "learning" && (c.isNew || c.learningStep !== 1 || c.mastered)) return false;
      if (filter === "reviewing" && (c.isNew || c.learningStep !== 2 || c.mastered)) return false;
      if (filter === "mastered" && !c.mastered) return false;
      return true;
    });

    if (filtered.length === 0) {
      el("#vocabList").innerHTML = `<div class="empty-state">
        <p style="font-size:2.5rem">📭</p>
        <p>Chưa có từ nào trong bộ lọc này. Bấm <b>Học</b> để bắt đầu!</p>
      </div>`;
      return;
    }

    el("#vocabList").innerHTML = filtered
      .map((c) => {
        const status = c.mastered ? "✅ Đã thuộc" : c.isNew ? "🆕 Mới" : c.learningStep === 1 ? "🔄 Đang học" : "📚 Ôn tập";
        const dueText = c.mastered
          ? "—"
          : c.dueDate <= Date.now()
          ? "⏰ Tới hạn ngay"
          : "⏳ " + SRS.formatInterval((c.dueDate - Date.now()) / 3600000);
        return `
        <div class="vocab-row ${c.mastered ? "mastered" : ""}" data-id="${c.id}" data-ru="${esc(c.ru)}" style="cursor:pointer">
          <div class="vocab-word">
            <b class="ru">${esc(c.ru)}</b>
            <span class="vocab-pos">${esc(c.pos || "")}</span>
          </div>
          <div class="vocab-meaning">${esc(c.vi)}</div>
          <div class="vocab-meta">
            <span class="vocab-level lvl-${c.level}">${c.level}</span>
            <span class="vocab-status">${status}</span>
            <span class="vocab-due">${dueText}</span>
          </div>
          <div class="vocab-actions">
            ${c.mastered
              ? `<button class="btn btn-soft btn-sm vocab-unmaster" data-id="${c.id}">↩ Bỏ thuộc</button>`
              : `<button class="btn btn-mastered btn-sm vocab-master" data-id="${c.id}">✓ Thuộc</button>`
            }
            <button class="btn btn-outline btn-sm vocab-speak" data-ru="${esc(c.ru)}">🔊</button>
            <button class="btn btn-outline btn-sm vocab-detail" data-ru="${esc(c.ru)}" title="Chi tiết từ">📖</button>
          </div>
        </div>`;
      })
      .join("");

    el("#vocabList").querySelectorAll(".vocab-row").forEach((row) => {
      row.onclick = (e) => {
        if (e.target.closest("button")) return;
        const c = state.cards[row.dataset.id];
        if (c) WordDetail.open(c.ru, { ru: c.ru, vi: c.vi, pos: c.pos, ex: c.ex, level: c.level, dir: "ru-vi" });
      };
    });
    el("#vocabList").querySelectorAll(".vocab-speak").forEach((b) => {
      b.onclick = () => speak(b.dataset.ru);
    });
    el("#vocabList").querySelectorAll(".vocab-detail").forEach((b) => {
      b.onclick = () => {
        const row = b.closest(".vocab-row");
        const card = row ? state.cards[row.dataset.id] : null;
        if (card) WordDetail.open(card.ru, { ru: card.ru, vi: card.vi, pos: card.pos, ex: card.ex, level: card.level, dir: "ru-vi" });
      };
    });
    el("#vocabList").querySelectorAll(".vocab-master").forEach((b) => {
      b.onclick = () => {
        SRS.markMastered(b.dataset.id);
        toast("Đã thêm vào Đã thuộc ✓");
        renderVocabTab();
        renderHero();
      };
    });
    el("#vocabList").querySelectorAll(".vocab-unmaster").forEach((b) => {
      b.onclick = () => {
        SRS.unmarkMastered(b.dataset.id);
        toast("Đã bỏ Mastered");
        renderVocabTab();
        renderHero();
      };
    });
  }
  el("#vocabSearch").addEventListener("input", renderVocabTab);
  el("#vocabFilter").addEventListener("change", renderVocabTab);
  el("#vocabLevel").addEventListener("change", renderVocabTab);

  /* ---------- SESSION FLOW ----------
   * Queue thực sự nằm ở SRS state (state.sessionQueue) — đây là nguồn duy nhất.
   * Khi user chấm Again, _reinsertAfter chèn card lại vào queue thực.
   * showNextCard luôn đọc state.sessionQueue[0] làm thẻ hiện tại. */
  function startSession({ level, newLimit, mode, onlyDue = false }) {
    let st = SRS.getState();
    let due = SRS.getDueCards(st, 50);
    let news = onlyDue ? [] : SRS.getNewCards(st, level, newLimit);
    if (due.length === 0 && news.length === 0) {
      toast("Không có từ để học — hãy đợi từ tới hạn hoặc thêm từ mới ✨");
      return;
    }
    // Thêm từ mới vào state.cards
    news.forEach((w) => SRS.ensureCard(w));
    // Reload state để lấy cardId mới của từ mới
    st = SRS.getState();
    const queue = [...due.map((c) => c.id), ...news.map((w) => SRS.cardId(w))];
    // Lưu queue vào state SRS
    st.sessionQueue = queue;
    st.sessionInserted = [];
    st.sessionDone = [];
    SRS.saveState(st);
    sessionCtx = {
      mode,
      totalAtStart: queue.length,
      results: [],
      doneAt: { again: 0, hard: 0, good: 0, easy: 0, mastered: 0 },
      startedAt: Date.now()
    };
    el("#studySetup").classList.add("hidden");
    el("#studySession").classList.remove("hidden");
    el("#studyDone").classList.add("hidden");
    el("#modeLabel").textContent = modeLabel(mode);
    showNextCard();
  }

  function modeLabel(mode) {
    return ({
      flashcard: "🃏 Flashcard",
      typing: "⌨️ Gõ từ",
      choice: "🔘 Trắc nghiệm",
      speak: "🎙️ Phát âm"
    })[mode] || mode;
  }

  function endSession() {
    el("#studySetup").classList.remove("hidden");
    el("#studySession").classList.add("hidden");
    el("#studyDone").classList.add("hidden");
    sessionCtx = null;
    renderHero();
    setupHint();
  }

  function showNextCard() {
    if (!sessionCtx) return;
    const ctx = sessionCtx;
    const state = SRS.getState();
    // Bỏ qua card đã mastered ở đầu queue
    while (state.sessionQueue.length > 0) {
      const frontId = state.sessionQueue[0];
      const frontCard = state.cards[frontId];
      if (frontCard && !frontCard.mastered) break;
      state.sessionQueue.shift();
    }
    SRS.saveState(state);
    if (state.sessionQueue.length === 0) {
      showDone();
      return;
    }
    const cardId = state.sessionQueue[0];
    const card = state.cards[cardId];
    if (!card) {
      // Card không tồn tại → xóa và thử lại
      state.sessionQueue.shift();
      SRS.saveState(state);
      showNextCard();
      return;
    }

    // Progress bar
    const total = ctx.totalAtStart;
    const done = state.sessionDone ? state.sessionDone.length : 0;
    const pct = Math.min(100, (done / total) * 100);
    el("#sessionProgress").style.width = pct + "%";
    el("#sessionProgressText").textContent = `${done} / ${total} đã chấm`;

    // Re-render stage theo mode
    const stage = el("#srsStage");
    stage.innerHTML = "";
    el("#srsControls").classList.add("hidden");

    if (ctx.mode === "flashcard") renderModeFlashcard(stage, card);
    if (ctx.mode === "typing") renderModeTyping(stage, card);
    if (ctx.mode === "choice") renderModeChoice(stage, card);
    if (ctx.mode === "speak") renderModeSpeak(stage, card);

    updateRateTimes(card);
  }

  function updateRateTimes(card) {
    const newInt = SRS_NEW_INTERVALS;
    const mul = SRS_REVIEW_MULTIPLIERS;
    const cur = Math.max(card.interval, 1);
    let againT, hardT, goodT, easyT;
    if (card.isNew) {
      againT = "sau 5 thẻ";
      hardT = newInt.hard + " giờ";
      goodT = newInt.good + " giờ";
      easyT = newInt.easy + " giờ";
    } else {
      againT = "reset · 6 giờ";
      hardT = "×2 = " + SRS.formatInterval(cur * mul.hard);
      goodT = "×3 = " + SRS.formatInterval(cur * mul.good);
      easyT = "×4 = " + SRS.formatInterval(cur * mul.easy);
    }
    el("#rateAgain").textContent = againT;
    el("#rateHard").textContent = hardT;
    el("#rateGood").textContent = goodT;
    el("#rateEasy").textContent = easyT;
  }

  function showControls() {
    el("#srsControls").classList.remove("hidden");
  }

  function applyRating(rating) {
    const ctx = sessionCtx;
    if (!ctx) return;
    const state = SRS.getState();
    const cardId = state.sessionQueue[0];
    if (!cardId) return;
    SRS.review(cardId, rating);
    SRS.recordReview(rating);
    ctx.doneAt[rating] = (ctx.doneAt[rating] || 0) + 1;
    showNextCard();
  }

  function applyMastered() {
    const ctx = sessionCtx;
    if (!ctx) return;
    const state = SRS.getState();
    const cardId = state.sessionQueue[0];
    if (!cardId) return;
    SRS.markMastered(cardId);
    ctx.doneAt.mastered = (ctx.doneAt.mastered || 0) + 1;
    showNextCard();
  }

  /* ---------- MODE 1: FLASHCARD ---------- */
  function renderModeFlashcard(stage, card) {
    stage.innerHTML = `
      <div class="flash-wrap" style="margin:0 auto">
        <div class="flashcard srs-flash" id="srsFlash">
          <div class="flash-inner">
            <div class="flash-face flash-front">
              <p class="word ru" style="font-size:2.4rem">${esc(card.ru)}</p>
              <p class="lvl-badge lvl-${card.level}">${card.level}</p>
              <p class="hint">Bấm để lật xem nghĩa 🔁</p>
            </div>
            <div class="flash-face flash-back">
              <p class="word" style="font-size:1.8rem;color:var(--primary)">${esc(card.vi)}</p>
              <p class="pos">${esc(card.pos || "")}</p>
              <p class="note">${esc(card.ex || "")}</p>
            </div>
          </div>
        </div>
        <div class="srs-quick-actions">
          <button class="btn btn-soft btn-sm" id="speakNow">🔊 Nghe phát âm</button>
          <button class="btn btn-soft btn-sm" id="wordDetail">📖 Chi tiết từ</button>
        </div>
      </div>`;
    const f = el("#srsFlash");
    f.onclick = (e) => {
      if (e.target.closest("button")) return;
      f.classList.toggle("flipped");
      if (f.classList.contains("flipped")) {
        setTimeout(showControls, 250);
        speak(card.ru);
      }
    };
    el("#speakNow").onclick = (e) => {
      e.stopPropagation();
      speak(card.ru);
    };
    el("#wordDetail").onclick = (e) => {
      e.stopPropagation();
      WordDetail.open(card.ru, { ru: card.ru, vi: card.vi, pos: card.pos, ex: card.ex, level: card.level, dir: "ru-vi" });
    };
    showControls();
  }

  /* ---------- MODE 2: TYPING ---------- */
  function renderModeTyping(stage, card) {
    const prompt = SRS.buildTypingPrompt(card);
    stage.innerHTML = `
      <div class="typing-card">
        <p class="typing-hint">Gõ lại từ tiếng Nga cho nghĩa:</p>
        <p class="typing-meaning">${esc(card.vi)}</p>
        <p class="typing-pos">${esc(card.pos || "")}</p>
        <p class="typing-sentence">${esc(prompt.masked)}</p>
        <input type="text" class="typing-input" id="typingInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="gõ tiếng Nga..." />
        <div class="typing-feedback" id="typingFeedback"></div>
        <div class="typing-actions">
          <button class="btn btn-primary" id="typingCheck">Kiểm tra</button>
          <button class="btn btn-soft" id="typingShow">👁 Hiện đáp án</button>
          <button class="btn btn-outline" id="typingSpeak">🔊 Nghe</button>
        </div>
      </div>`;
    speak(card.ru);
    setTimeout(() => el("#typingInput").focus(), 100);

    const input = el("#typingInput");
    const check = () => {
      const val = input.value.trim();
      const sim = similarity(val, card.ru);
      const fb = el("#typingFeedback");
      if (sim === 100) {
        fb.innerHTML = `<span class="fb-ok">✓ Chính xác 100%!</span>`;
        input.classList.add("ok");
        input.classList.remove("bad");
        showControls();
      } else if (sim >= 70) {
        fb.innerHTML = `<span class="fb-mid">${sim}% gần đúng. Đáp án: <b class="ru">${esc(card.ru)}</b></span>`;
        input.classList.add("mid");
        input.classList.remove("bad", "ok");
        showControls();
      } else if (val.length === 0) {
        fb.innerHTML = `<span class="fb-empty">Nhập gì đó nhé.</span>`;
      } else {
        fb.innerHTML = `<span class="fb-bad">${sim}% — đáp án: <b class="ru">${esc(card.ru)}</b></span>`;
        input.classList.add("bad");
        input.classList.remove("ok");
      }
    };
    el("#typingCheck").onclick = check;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") check();
    });
    el("#typingShow").onclick = () => {
      input.value = card.ru;
      input.classList.add("mid");
      el("#typingFeedback").innerHTML = `<span class="fb-mid">Đáp án: <b class="ru">${esc(card.ru)}</b></span>`;
      showControls();
    };
    el("#typingSpeak").onclick = () => speak(card.ru);
    showControls();
  }

  /* ---------- MODE 3: MULTIPLE CHOICE ---------- */
  function renderModeChoice(stage, card) {
    const allCards = Object.values(SRS.getState().cards);
    const opts = SRS.buildMultipleChoice(card, allCards);
    const correctIdx = opts.findIndex((o) => o.id === card.id);
    stage.innerHTML = `
      <div class="choice-card">
        <p class="choice-hint">Chọn nghĩa đúng cho từ:</p>
        <p class="choice-word ru">${esc(card.ru)}</p>
        <p class="choice-pos">${esc(card.pos || "")}</p>
        <div class="choice-options" id="choiceOpts">
          ${opts.map((o, i) => `<button class="choice-btn" data-i="${i}">${esc(o.vi)}</button>`).join("")}
        </div>
        <div class="choice-feedback" id="choiceFeedback"></div>
        <div class="choice-actions">
          <button class="btn btn-outline" id="choiceSpeak">🔊 Nghe</button>
        </div>
      </div>`;
    speak(card.ru);
    el("#choiceOpts").querySelectorAll(".choice-btn").forEach((btn) => {
      btn.onclick = () => {
        const i = +btn.dataset.i;
        const ok = i === correctIdx;
        el("#choiceOpts").querySelectorAll(".choice-btn").forEach((b) => {
          b.disabled = true;
          b.classList.add(b.dataset.i == correctIdx ? "correct" : "wrong-disabled");
        });
        btn.classList.add(ok ? "correct" : "wrong");
        el("#choiceFeedback").innerHTML = ok
          ? `<span class="fb-ok">✓ Đúng rồi!</span>`
          : `<span class="fb-bad">Sai — đáp án: <b>${esc(card.vi)}</b></span>`;
        showControls();
      };
    });
    el("#choiceSpeak").onclick = () => speak(card.ru);
    showControls();
  }

  /* ---------- MODE 4: SPEAK ---------- */
  function renderModeSpeak(stage, card) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    stage.innerHTML = `
      <div class="speak-card">
        <p class="speak-hint">Đọc to từ tiếng Nga sau:</p>
        <p class="speak-word ru">${esc(card.ru)}</p>
        <p class="speak-pos">${esc(card.pos || "")}</p>
        <p class="speak-meaning" style="color:var(--muted);font-size:.9rem">${esc(card.vi)}</p>
        <div class="speak-actions">
          <button class="mic-btn big" id="speakMic" aria-label="Nói">🎤</button>
          <button class="btn btn-outline" id="speakListen">🔊 Nghe mẫu</button>
        </div>
        <div class="speak-feedback" id="speakFeedback"></div>
      </div>`;
    speak(card.ru);
    el("#speakListen").onclick = () => speak(card.ru);
    const mic = el("#speakMic");
    mic.onclick = () => {
      if (!SR) {
        el("#speakFeedback").innerHTML = `<span class="fb-bad">Trình duyệt không hỗ trợ nhận dạng — dùng Chrome/Edge.</span>`;
        showControls();
        return;
      }
      if (mic.classList.contains("rec")) return;
      mic.classList.add("rec");
      el("#speakFeedback").innerHTML = `<span class="fb-empty">🎙️ Đang nghe — đọc rõ ràng...</span>`;
      const rec = new SR();
      rec.lang = "ru-RU";
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      rec.onresult = (ev) => {
        const heard = ev.results[0][0].transcript;
        const sim = similarity(heard, card.ru);
        el("#speakFeedback").innerHTML =
          `<span class="${sim >= 80 ? "fb-ok" : sim >= 50 ? "fb-mid" : "fb-bad"}">` +
          `🤖 Nghe được: <b class="ru">${esc(heard)}</b><br>` +
          `Điểm: <b>${sim}%</b></span>`;
        showControls();
      };
      rec.onerror = () => {
        el("#speakFeedback").innerHTML = `<span class="fb-bad">Không nghe được — thử chỗ yên tĩnh hơn.</span>`;
        showControls();
      };
      rec.onend = () => mic.classList.remove("rec");
      rec.start();
      setTimeout(() => {
        try { rec.stop(); } catch (e) {}
      }, 6000);
    };
    // Nếu không có SR thì auto show controls
    if (!SR) {
      el("#speakFeedback").innerHTML = `<span class="fb-empty">Bấm mic và đọc to. Nếu trình duyệt không hỗ trợ, bấm "🔊 Nghe mẫu" và "Dễ" để bỏ qua.</span>`;
    }
    showControls();
  }

  /* ---------- BUTTONS ---------- */
  el("#exitSession").onclick = () => {
    if (confirm("Thoát phiên học? Tiến độ đã chấm sẽ được lưu.")) endSession();
  };

  document.querySelectorAll(".rate-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyRating(btn.dataset.r));
  });
  el("#markMastered").onclick = applyMastered;
  el("#replayAudio").onclick = () => {
    if (!sessionCtx) return;
    // Thẻ đang học luôn nằm ở đầu sessionQueue
    const state = SRS.getState();
    const card = state.cards[state.sessionQueue[0]];
    if (card) speak(card.ru);
  };

  /* ---------- DONE SCREEN ---------- */
  function showDone() {
    const ctx = sessionCtx;
    el("#studySession").classList.add("hidden");
    el("#studyDone").classList.remove("hidden");
    const minutes = Math.max(1, Math.round((Date.now() - ctx.startedAt) / 60000));
    el("#doneStats").innerHTML = `
      <div class="done-stat"><b>${ctx.totalAtStart}</b><span>Tổng thẻ</span></div>
      <div class="done-stat"><b>${ctx.doneAt.good + ctx.doneAt.easy}</b><span>Tốt/Dễ</span></div>
      <div class="done-stat"><b>${ctx.doneAt.hard}</b><span>Khó</span></div>
      <div class="done-stat"><b>${ctx.doneAt.again}</b><span>Học lại</span></div>
      <div class="done-stat"><b>${ctx.doneAt.mastered}</b><span>Mastered</span></div>
      <div class="done-stat"><b>${minutes}p</b><span>Thời gian</span></div>
    `;
  }
  el("#doneAgain").onclick = () => {
    el("#studyDone").classList.add("hidden");
    const lastMode = sessionCtx ? sessionCtx.mode : "flashcard";
    startSession({ level: el("#setupLevel").value, newLimit: +el("#setupNew").value || 8, mode: lastMode });
  };
  el("#doneBack").onclick = endSession;

  /* ---------- RESET ---------- */
  el("#resetSrs").onclick = () => {
    if (!confirm("Xóa toàn bộ tiến độ SRS? Hành động này không thể hoàn tác.")) return;
    SRS.resetAll();
    toast("Đã reset toàn bộ tiến độ.");
    renderProgressTab();
    renderHero();
    setupHint();
  };

  /* ---------- EXPORT / IMPORT ---------- */
  el("#exportData").onclick = () => {
    const state = SRS.getState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rusi-srs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Đã xuất dữ liệu.");
  };
  el("#importData").onclick = () => el("#importFile").click();
  el("#importFile").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.cards || typeof data.cards !== "object") throw new Error("Invalid file");
        // Chuẩn hóa các trường bắt buộc — file cũ / sửa tay không làm hỏng app
        const prev = SRS.getState();
        const cards = {};
        Object.entries(data.cards).forEach(([id, c]) => {
          if (c && c.ru && c.vi !== undefined) cards[id] = c;
        });
        STORE.set("srs", {
          ...prev,
          ...data,
          cards,
          today:
            data.today && typeof data.today === "object"
              ? {
                  date: typeof data.today.date === "string" ? data.today.date : new Date().toDateString(),
                  reviewed: +data.today.reviewed || 0,
                  correct: +data.today.correct || 0,
                  newLearned: +data.today.newLearned || 0
                }
              : prev.today,
          sessionQueue: Array.isArray(data.sessionQueue) ? data.sessionQueue : [],
          sessionInserted: Array.isArray(data.sessionInserted) ? data.sessionInserted : [],
          sessionDone: Array.isArray(data.sessionDone) ? data.sessionDone : []
        });
        toast("Đã nhập dữ liệu.");
        renderProgressTab();
        renderHero();
        setupHint();
      } catch (err) {
        toast("File không hợp lệ.");
      }
    };
    r.readAsText(file);
  };

  /* ---------- RETENTION CHART (canvas) ---------- */
  function drawRetentionChart() {
    const canvas = el("#retentionChart");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Trục
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Đường KHÔNG ôn (lãng quên theo Ebbinghaus): R = e^(-t/S) — S ≈ 7 ngày
    const days = 30;
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let d = 0; d <= days; d++) {
      const x = (d / days) * w;
      const retention = Math.exp(-d / 7);
      const y = h - retention * (h - 10);
      if (d === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Đường CÓ ôn (Spaced Repetition): giữ ~90% nhờ ôn đúng lúc
    ctx.strokeStyle = "#16a34a";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let d = 0; d <= days; d++) {
      const x = (d / days) * w;
      // Mỗi lần ôn tăng retention lên ~95%, sau đó giảm dần
      let r = 1.0;
      for (let t = 1; t <= 4; t++) {
        const day = Math.pow(3, t - 1); // 1, 3, 9, 27
        if (d >= day) r = 0.95 * Math.exp(-(d - day) / 10) + (t > 1 ? 0.05 * (t - 1) : 0);
      }
      const y = h - Math.min(1, r) * (h - 10);
      if (d === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Nhãn
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("0%", 4, h - 4);
    ctx.fillText("100%", 4, 14);
    ctx.fillText("30 ngày", w - 50, h - 4);
    ctx.fillText("d0", 4, h - 4);
  }

  /* ---------- REFRESH ON STORAGE CHANGE ---------- */
  window.addEventListener("storage", () => {
    renderHero();
    setupHint();
  });
}

/* =====================================================================
 * Trang TỪ ĐIỂN (dictionary.html)
 * Tìm kiếm + lọc + chi tiết từ + thêm vào hàng đợi SRS.
 * ===================================================================== */
function initDictPage() {
  const PAGE_SIZE = 48;
  let dictData = null;        // { list, total } của từ điển Nga → Việt
  let searchQuery = "";
  let page = 1;
  let searchTimer = 0;

  const fmt = (n) => Number(n || 0).toLocaleString("vi-VN");

  const loadDir = () => {
    el("#dictList").innerHTML = `<div class="dict-loading"><span class="dict-spinner"></span><p>Đang tải từ điển Nga → Việt…</p></div>`;
    RusiDict.load("ru-vi")
      .then((data) => {
        dictData = data;
        renderStats();
        page = 1;
        renderList();
      })
      .catch(() => {
        el("#dictList").innerHTML = `<div class="empty-state">
          <p style="font-size:2.5rem">📂</p>
          <p>Không tải được dữ liệu từ điển.<br/>Hãy mở trang qua web server và kiểm tra thư mục <b>data/</b>.</p>
        </div>`;
      });
  };

  /* ---------- TỔNG SỐ TỪ ---------- */
  const renderStats = () => {
    if (dictData) el("#dictTotal").textContent = fmt(dictData.total);
  };

  /* ---------- DANH SÁCH + TÌM KIẾM ---------- */
  const renderList = () => {
    const host = el("#dictList");
    if (!dictData) return; // đang tải dữ liệu
    const sm = RusiDict.statusMap(SRS.getState());
    const filtered = RusiDict.search("ru-vi", {
      q: searchQuery
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    const start = (page - 1) * PAGE_SIZE;
    const slice = filtered.slice(start, start + PAGE_SIZE);

    if (slice.length === 0) {
      host.innerHTML = `<div class="empty-state">
        <p style="font-size:2.5rem">🔎</p>
        <p>Không tìm thấy từ nào khớp. Hãy thử từ khóa khác.</p>
      </div>`;
      el("#dictPageInfo").textContent = `0 kết quả`;
      el("#dictPrev").disabled = true;
      el("#dictNext").disabled = true;
      el("#dictJump").value = 1;
      return;
    }
    el("#dictPrev").disabled = page <= 1;
    el("#dictNext").disabled = page >= totalPages;
    el("#dictJump").value = page;
    el("#dictJump").max = totalPages;
    el("#dictPageInfo").textContent = `Trang ${fmt(page)} / ${fmt(totalPages)} · ${fmt(filtered.length)} từ`;

    host.innerHTML = slice
      .map((w) => {
        const st = sm.get(SRS.cardId(w)) || "unseen";
        const statusIcon = st === "mastered" ? "✅" :
                           st === "learning" ? "🔄" :
                           st === "reviewing" ? "📚" :
                           st === "new" ? "🆕" : "·";
        const levelBadge = w.level ? `<span class="dict-level lvl-${w.level}">${w.level}</span>` : `<span></span>`;
        const pronLine = w.pron ? `<p class="dict-pron ru">${esc(w.pron)}</p>` : "";
        const catBadge = w.cat ? `<span class="dict-cat">${esc(w.cat)}</span>` : "";
        const posText = w.pos || w.gram || "";
        return `
        <article class="dict-card" data-dk="${esc(w.dk || "")}">
          <div class="dict-card-head">
            ${levelBadge}
            <span class="dict-status-icon" title="${st}">${statusIcon}</span>
          </div>
          <h3 class="dict-ru ru">${esc(w.ru)}</h3>
          ${pronLine}
          <p class="dict-vi">${esc(w.vi)}</p>
          <div class="dict-card-foot">
            <p class="dict-pos">${esc(posText)}${catBadge}</p>
            <button class="dict-speak" data-ru="${esc(w.ru)}" title="Nghe">🔊</button>
          </div>
        </article>`;
      })
      .join("");

    // Event: mở modal khi click card
    host.querySelectorAll(".dict-card").forEach((card, i) => {
      card.onclick = (e) => {
        if (e.target.closest(".dict-speak")) return;
        openModal(slice[i]);
      };
    });
    host.querySelectorAll(".dict-speak").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        speak(btn.dataset.ru);
      };
    });
  };

  /* ---------- TÌM KIẾM + PHÂN TRANG ---------- */
  el("#dictSearch").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      page = 1;
      renderList();
    }, 150);
  });
  el("#dictClear").onclick = () => {
    el("#dictSearch").value = "";
    searchQuery = "";
    page = 1;
    renderList();
    el("#dictSearch").focus();
  };
  el("#dictPrev").onclick = () => {
    if (page > 1) {
      page--;
      renderList();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  el("#dictNext").onclick = () => {
    page++;
    renderList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  el("#dictJump").addEventListener("change", (e) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) {
      page = v;
      renderList();
    }
  });

  renderStats();
  loadDir();

  /* ---------- MODAL (WordDetail — kiểu TFlat) ---------- */
  function openModal(entry) {
    WordDetail.open(entry.ru, entry, () => {
      renderStats();
      renderList();
    });
  }

  /* ---------- KEYBOARD NAV ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "/") {
      e.preventDefault();
      el("#dictSearch").focus();
    }
  });
}
