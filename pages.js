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
  /* ---------- TOP-LEVEL TABS (Bài học / Thuật toán) ---------- */
  const topTabs = document.querySelectorAll(".voc-top-tab");
  const vocPanes = {
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
    // Ẩn/hiện page-hero để tránh 2 hero chồng lên nhau:
    //   - Tab Bài học: hiện page-hero (giới thiệu video lessons)
    //   - Tab Thuật toán: ẩn page-hero, dùng srs-hero riêng bên trong pane
    //   - Đang mở lesson workspace thì hero cũng phải giữ ẩn
    const hero = document.querySelector(".page-hero");
    if (hero) hero.classList.toggle("hidden", t === "algorithm" || !list.classList.contains("hidden"));
    // Lazy-init thuật toán chỉ khi chuyển sang lần đầu
    if (t === "algorithm" && !algorithmInited) {
      algorithmInited = true;
      initSrsPage();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  topTabs.forEach((b) => b.addEventListener("click", () => switchTopTab(b.dataset.t)));

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

  // Nếu URL có hash #algorithm → mở thẳng tab Thuật toán
  // (đặt sau khi các phần tử trong tab Bài học đã init xong)
  if (window.location.hash === "#algorithm") {
    switchTopTab("algorithm");
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

function initListeningPage() {
  const host = el("#listenHost");
  let current = LISTENING_LESSONS[0];

  const lessonTabs = () => {
    host.innerHTML = `
      <div class="tabs" id="lisTabs">
        ${LISTENING_LESSONS.map((l, i) => `<button class="tab ${i === 0 ? "active" : ""}" data-l="${l.id}">${esc(l.vi)}</button>`).join("")}
      </div>
      <div id="lisBody"></div>`;
    host.querySelectorAll("[data-l]").forEach((b) => {
      b.addEventListener("click", () => {
        current = LISTENING_LESSONS.find((l) => l.id === b.dataset.l);
        host.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        b.classList.add("active");
        renderMode("full");
      });
    });
    renderMode("full");
  };

  const renderMode = (mode) => {
    el("#lisBody").innerHTML = `
      <div class="workspace">
        <div class="ws-head">
          <div>
            <h2 class="ru">${esc(current.title)}</h2>
            <p class="ws-sub">${esc(current.vi)} · ${esc(current.level)}</p>
          </div>
          <button class="btn btn-soft btn-sm" id="lisPlayAll">🔊 Nghe toàn bộ</button>
        </div>
        <div class="tabs" style="justify-content:flex-start">
          <button class="tab ${mode === "full" ? "active" : ""}" data-m="full">Nghe Full</button>
          <button class="tab ${mode === "blank" ? "active" : ""}" data-m="blank">Điền Từ</button>
          <button class="tab ${mode === "dict" ? "active" : ""}" data-m="dict">Nghe Chép</button>
          <button class="tab ${mode === "check" ? "active" : ""}" data-m="check">Nghe Check</button>
        </div>
        <div id="modeBody"></div>
      </div>`;
    host.querySelectorAll("[data-m]").forEach((b) => {
      b.addEventListener("click", () => renderMode(b.dataset.m));
    });
    el("#lisPlayAll").onclick = () => {
      const full = current.lines.map((l) => l.ru).join(" ");
      speak(full);
    };
    const mb = el("#modeBody");
    if (mode === "full") modeFull(mb);
    if (mode === "blank") modeBlank(mb);
    if (mode === "dict") modeDict(mb);
    if (mode === "check") modeCheck(mb);
  };

  const modeFull = (mb) => {
    mb.innerHTML =
      current.lines
        .map(
          (l) => `
      <div class="dialogue-line">
        <span class="who">${esc(l.who)}</span>
        <span class="line-ru ru">${esc(l.ru)}
          <button class="btn btn-outline btn-sm speak-line" style="margin-left:8px;padding:2px 10px">🔊</button>
        </span>
        <span class="line-vi">${esc(l.vi)}</span>
      </div>`
        )
        .join("");
    mb.querySelectorAll(".speak-line").forEach((btn, i) => {
      btn.onclick = () => speak(current.lines[i].ru);
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
        <p style="color:var(--muted);font-size:.85rem">Gợi ý: ${esc(b.hint)}</p>
      </div>`
        )
        .join("") +
      `<button class="btn btn-primary" id="checkBlanks">Kiểm tra</button>`;
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
        // Chỉ cộng XP lần đầu hoàn thành (chống farm XP)
        if (!Progress.doneList("listenDone").includes(current.id + "_blank")) Progress.addXp(15);
        Progress.markDone("listenDone", current.id + "_blank");
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
    mb.innerHTML =
      current.dictation
        .map(
          (s, i) => `
      <div class="sentence-check" data-i="${i}">
        <div class="sc-actions">
          <button class="btn btn-soft btn-sm play-dict">🔊 Nghe</button>
          <span style="color:var(--muted);font-size:.85rem">Câu ${i + 1}</span>
          <span class="sim-result" style="margin-left:auto"></span>
        </div>
        <textarea placeholder="Gõ lại những gì bạn nghe được..."></textarea>
        <div class="sc-actions"><button class="btn btn-primary btn-sm check-dict">Kiểm tra</button></div>
      </div>`
        )
        .join("");
    mb.querySelectorAll(".play-dict").forEach((b, i) => (b.onclick = () => speak(current.dictation[i])));
    mb.querySelectorAll(".check-dict").forEach((btn, i) => {
      btn.onclick = () => {
        const box = btn.closest(".sentence-check");
        const val = box.querySelector("textarea").value;
        const sim = similarity(val, current.dictation[i]);
        const badge = box.querySelector(".sim-result");
        badge.innerHTML = `<span class="sim-badge ${sim >= 80 ? "sim-high" : sim >= 50 ? "sim-mid" : "sim-low"}">${sim}% giống</span>`;
        box.classList.toggle("correct", sim >= 80);
        box.classList.toggle("wrong", sim < 80);
        // Xóa "Đáp án" cũ trước khi thêm mới (tránh lặp mỗi lần bấm kiểm tra)
        const old = box.querySelector(".dict-answer");
        if (old) old.remove();
        if (sim < 80) {
          const p = document.createElement("p");
          p.className = "ru dict-answer";
          p.style.cssText = "color:var(--green);font-size:.9rem";
          p.textContent = "Đáp án: " + current.dictation[i];
          badge.insertAdjacentElement("afterend", p);
        } else {
          // Chỉ cộng XP lần đầu mỗi câu (chống farm XP)
          const key = current.id + "_dict_" + i;
          if (!Progress.doneList("listenDone").includes(key)) {
            Progress.markDone("listenDone", key);
            Progress.addXp(5);
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
          // Chỉ cộng XP lần đầu vượt qua (chống farm XP bằng làm lại)
          if (!Progress.doneList("listenDone").includes(key)) Progress.addXp(15);
          Progress.markDone("listenDone", key);
        }
      }
    });
  };

  lessonTabs();
}

function initSpeakingPage() {
  const host = el("#speakHost");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SR) {
    el("#srWarn").classList.remove("hidden");
  }

  const renderSet = (setId) => {
    const set = SPEAKING_SETS.find((s) => s.id === setId) || SPEAKING_SETS[0];
    host.innerHTML = set.items
      .map((item, i) => {
        const best = STORE.get("speak_" + set.id + "_" + i, null);
        return `
      <div class="speak-item" data-i="${i}">
        <p class="target ru">${esc(item.ru)} <button class="btn btn-outline btn-sm btn-tts">🔊</button></p>
        <p class="target-vi">${esc(item.vi)}</p>
        <div style="display:flex;gap:16px;align-items:center">
          <button class="mic-btn" aria-label="Nói">🎤</button>
          ${best !== null ? `<div class="score-ring ${best >= 80 ? "" : best >= 50 ? "mid" : "low"}" title="Kết quả tốt nhất">${best}%</div>` : ""}
          <span class="speak-status" style="color:var(--muted);font-size:.88rem">Bấm mic và đọc câu trên</span>
        </div>
      </div>`;
      })
      .join("");

    host.querySelectorAll(".btn-tts").forEach((b, i) => {
      b.onclick = () => speak(set.items[i].ru);
    });

    host.querySelectorAll(".mic-btn").forEach((btn, i) => {
      btn.onclick = () => {
        if (!SR) {
          toast("Trình duyệt không hỗ trợ nhận dạng giọng nói — dùng Chrome/Edge nhé.");
          return;
        }
        if (btn.classList.contains("rec")) return;
        btn.classList.add("rec");
        const status = btn.closest(".speak-item").querySelector(".speak-status");
        status.textContent = "🎙️ Đang nghe... hãy đọc rõ câu trên";
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
            `<div class="heard">🤖 AI nghe được: <b class="ru">${esc(heard)}</b><br>Mục tiêu: <span class="ru">${esc(set.items[i].ru)}</span></div>`
          );
          STORE.set("speak_" + set.id + "_" + i, Math.max(sim, STORE.get("speak_" + set.id + "_" + i, 0)));
          // Chỉ cộng XP khi lần này đạt điểm CAO hơn lần trước tốt nhất (chống farm)
          const key = "speakDone_" + set.id + "_" + i;
          const bestBefore = STORE.get("speak_" + set.id + "_" + i, 0);
          if (sim >= 70 && sim >= bestBefore && !Progress.doneList("speakDone").includes(key)) {
            Progress.markDone("speakDone", key);
            Progress.addXp(10);
          }
          status.textContent = sim >= 80 ? "Tuyệt vời! Lại câu tiếp nhé 👏" : "Nghe lại mẫu 🔊 và thử lần nữa!";
        };
        rec.onerror = () => {
          status.textContent = "Không nghe được — thử lại trong chỗ yên tĩnh nhé.";
        };
        rec.onend = () => btn.classList.remove("rec");
        rec.start();
        setTimeout(() => {
          try { rec.stop(); } catch (e) {}
        }, 6000);
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

function initWritingPage() {
  const host = el("#writeHost");
  const renderTasks = () => {
    host.innerHTML = WRITING_TASKS.map(
      (t) => `
    <div class="workspace" data-w="${t.id}">
      <div class="ws-head">
        <div>
          <span class="part-tag">${esc(t.level)}</span>
          <h2>${esc(t.title)}</h2>
          <p class="ws-sub">📝 ${esc(t.vi)}</p>
        </div>
      </div>
      <p class="ru" style="background:var(--bg);padding:14px 18px;border-radius:10px;border:1px solid var(--border)">${esc(t.prompt)}</p>
      <textarea class="write-area ru" placeholder="Пишите здесь... (viết tiếng Nga tại đây)"></textarea>
      <div class="write-meta">
        <span class="word-count">0 từ / tối thiểu ${t.minWords} từ</span>
        <span>✅ Đã lưu tự động</span>
      </div>
      <div class="checklist">
        ${t.tips.map((tip) => `<label><input type="checkbox"> ${esc(tip)}</label>`).join("")}
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary btn-submit">Nộp bài (thêm XP)</button>
        <button class="btn btn-outline btn-model">Xem bài mẫu</button>
      </div>
      <div class="model-answer hidden">
        <h4>✨ Bài mẫu</h4>
        <p class="ru">${esc(t.model)}</p>
      </div>
    </div>`
    ).join("");

    host.querySelectorAll("[data-w]").forEach((box) => {
      const task = WRITING_TASKS.find((t) => t.id === box.dataset.w);
      const area = box.querySelector(".write-area");
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
      box.querySelector(".btn-submit").onclick = () => {
        const n = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
        if (n < task.minWords) {
          toast(`Cần ít nhất ${task.minWords} từ — hiện tại ${n} từ.`);
          return;
        }
        // Chỉ cộng XP lần đầu nộp bài này (chống farm XP bằng cách bấm lại)
        const first = !Progress.doneList("writeDone").includes(task.id);
        if (first) Progress.addXp(25);
        Progress.markDone("writeDone", task.id);
        toast(first ? "+25 XP! Bài viết đã được lưu." : "Bài viết đã được cập nhật.");
      };
      box.querySelector(".btn-model").onclick = (e) => {
        const m = box.querySelector(".model-answer");
        m.classList.toggle("hidden");
        e.target.textContent = m.classList.contains("hidden") ? "Xem bài mẫu" : "Ẩn bài mẫu";
        if (!m.classList.contains("hidden")) speak(task.model);
      };
    });
  };
  renderTasks();
}

function initMockTestPage() {
  const host = el("#testHost");
  const T = MOCK_TEST;
  let answers = {};
  let timeLeft = T.durationMin * 60;
  let timer = null;
  let started = false;

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const renderStart = () => {
    host.innerHTML = `
    <div class="workspace" style="text-align:center;padding:44px 28px">
      <h2>${esc(T.title)}</h2>
      <p style="color:var(--muted);margin:12px 0 24px">3 phần · ${T.durationMin} phút · Điểm đạt ≥ ${T.passPercent}%.
      Phần nghe dùng giọng đọc máy tiếng Nga (khi có audio thật sẽ thay thế).</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" id="startTest">Bắt đầu làm bài</button>
      </div>
      ${STORE.get("bestTest", null) ? `<p style="margin-top:18px;color:var(--muted)">🏆 Kết quả tốt nhất của bạn: <b>${STORE.get("bestTest")}%</b></p>` : ""}
    </div>`;
    el("#startTest").onclick = startTest;
  };

  const startTest = () => {
    started = true;
    answers = {};
    timeLeft = T.durationMin * 60;
    renderTest();
    timer = setInterval(() => {
      timeLeft--;
      const t = el("#timerVal");
      if (t) {
        t.textContent = fmt(timeLeft);
        t.classList.toggle("warn", timeLeft < 300);
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        submit();
      }
    }, 1000);
  };

  const renderTest = () => {
    let html = `
    <div class="test-timer">
      <span>⏱ Thời gian còn lại: <span class="timer-val" id="timerVal">${fmt(timeLeft)}</span></span>
      <button class="btn btn-primary btn-sm" id="submitTest">Nộp bài</button>
    </div>`;
    T.parts.forEach((part) => {
      html += `<div class="workspace">
        <span class="part-tag">${esc(part.vi)}</span>
        <h2 class="ru" style="font-size:1.15rem;margin-bottom:16px">${esc(part.name)}</h2>`;
      if (part.text) {
        html += `<div class="reading-text"><p class="ru">${esc(part.text.ru)}</p><p style="color:var(--muted);font-size:.88rem;margin-top:10px">${esc(part.text.vi)}</p></div>`;
      }
      if (part.lines) {
        html += `<button class="btn btn-soft btn-sm" id="playAudio">🔊 Nghe (đọc lại)</button>`;
      }
      part.questions.forEach((q, qi) => {
        const id = part.id + "_" + qi;
        html += `
        <div class="quiz-q">
          <p class="q-text">${qi + 1}. <span class="ru">${esc(q.q)}</span></p>
          <div class="options">
            ${q.options.map((o, oi) => `
              <button class="option ru" data-id="${id}" data-oi="${oi}">${esc(o)}</button>`).join("")}
          </div>
        </div>`;
      });
      html += `</div>`;
    });
    host.innerHTML = html;

    host.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const group = host.querySelectorAll(`.option[data-id="${id}"]`);
        // "selected" = lựa chọn của user (chưa biết đúng/sai đến khi nộp bài)
        group.forEach((g) => g.classList.remove("selected"));
        btn.classList.add("selected");
        answers[id] = +btn.dataset.oi;
      });
    });

    const play = el("#playAudio");
    if (play) play.onclick = () => speak(T.parts.find((p) => p.id === "listening").lines.map((l) => l.ru).join(" "), "ru-RU", 0.85);

    el("#submitTest").onclick = submit;
  };

  const submit = () => {
    clearInterval(timer);
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
      detail.push({ part, pct: Math.round((pc / part.questions.length) * 100) });
    });
    const pct = Math.round((correct / total) * 100);
    const passed = pct >= T.passPercent;
    const best = Math.max(pct, STORE.get("bestTest", 0));
    STORE.set("bestTest", best);
    if (passed) {
      Progress.addXp(50);
      Progress.markDone("testsDone", T.title);
    }

    host.innerHTML = `
    <div class="workspace">
      <div style="text-align:center;margin-bottom:28px">
        <p style="font-size:3rem">${passed ? "🎉" : "💪"}</p>
        <h2>${correct}/${total} câu đúng — ${pct}%</h2>
        <p style="margin:8px 0 18px;color:var(--muted)">Kết quả tốt nhất: <b>${best}%</b></p>
        <div class="pass-badge ${passed ? "yes" : "no"}">${passed ? "ĐẠT chuẩn ТЭУ" : "CHƯA ĐẠT — cần ≥ " + T.passPercent + "%"}</div>
      </div>
      ${detail.map((d) => `<div class="result-part"><span>${esc(d.part.vi)}</span><b>${d.pct}%</b></div>`).join("")}
      <h3 style="margin:26px 0 14px">📋 Xem lại chi tiết</h3>
      <div id="reviewHost"></div>
      <div style="margin-top:22px;display:flex;gap:10px">
        <button class="btn btn-primary" id="retryTest">Làm lại đề khác</button>
      </div>
    </div>`;

    const review = el("#reviewHost");
    T.parts.forEach((part) => {
      review.innerHTML += part.questions
        .map((q, qi) => {
          const given = answers[part.id + "_" + qi];
          const ok = given === q.a;
          return `
        <div class="quiz-q">
          <p class="q-text">${part.id === "gram" ? qi + 1 + ". " : ""}<span class="ru">${esc(q.q)}</span></p>
          <p style="font-size:.9rem;margin-bottom:8px">Bạn chọn: <b class="ru" style="color:${ok ? "var(--green)" : "var(--red)"}">${given !== undefined ? esc(q.options[given]) : "— bỏ trống —"}</b></p>
          ${ok ? "" : `<p style="font-size:.9rem;margin-bottom:8px">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></p>`}
          <div class="explain">💡 ${esc(q.ex || "")}</div>
        </div>`;
        })
        .join("");
    });
    el("#retryTest").onclick = renderStart;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderStart();
}

function initBlogPage() {
  const host = el("#blogHost");
  host.innerHTML = `<div class="lesson-grid">
    ${BLOG_POSTS.map((p) => `
      <article class="lesson-card" style="cursor:default">
        <div class="lesson-thumb">${esc(p.icon)}</div>
        <span class="ep-tag">${esc(p.date)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="vi-title" style="margin-top:6px">${esc(p.excerpt)}</p>
      </article>`).join("")}
  </div>`;
}

function initIndexPage() {
  const xp = STORE.get("xp", 0);
  const vocabDone = Progress.doneList("vocabDone").length;
  el("#pwXp").textContent = xp;
  el("#pwStreak").textContent = STORE.get("streak", 0);
  el("#pwVocab").textContent = `${vocabDone}/${VOCAB_LESSONS.length}`;
  const best = STORE.get("bestTest", null);
  el("#pwBest").textContent = best === null ? "—" : best + "%";
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
    a.download = `mishka-srs-${new Date().toISOString().slice(0, 10)}.json`;
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
  let dir = "ru-vi";          // hướng từ điển đang hiển thị
  let dictData = null;        // { list, total } của hướng đang chọn
  let filterLevel = "all";
  let filterPos = "all";
  let filterStatus = "all";
  let searchQuery = "";
  let page = 1;
  let searchTimer = 0;

  const fmt = (n) => Number(n || 0).toLocaleString("vi-VN");

  /* ---------- HƯỚNG TỪ ĐIỂN ---------- */
  const DIR_META = {
    "ru-vi": {
      tag: "📖 Từ điển Nga — Việt",
      title: 'Tra cứu <span class="hl">từ vựng tiếng Nga</span>',
      placeholder: "Tìm tiếng Nga hoặc tiếng Việt, ví dụ..."
    },
    "vi-ru": {
      tag: "📖 Từ điển Việt — Nga",
      title: 'Tra cứu <span class="hl">từ vựng tiếng Việt</span>',
      placeholder: "Tìm tiếng Việt hoặc tiếng Nga, ví dụ..."
    }
  };

  const applyDirUi = () => {
    const meta = DIR_META[dir];
    el("#dictTag").textContent = meta.tag;
    el("#dictTitle").innerHTML = meta.title;
    el("#dictSearch").placeholder = meta.placeholder;
    el("#levelFilterGroup").style.display = dir === "ru-vi" ? "" : "none";
    document.querySelectorAll(".dict-tab").forEach((b) =>
      b.classList.toggle("active", b.dataset.dir === dir)
    );
  };

  const loadDir = (d) => {
    applyDirUi();
    el("#dictList").innerHTML = `<div class="dict-loading"><span class="dict-spinner"></span><p>Đang tải từ điển ${d === "ru-vi" ? "Nga → Việt" : "Việt → Nga"}…</p></div>`;
    MishkaDict.load(d)
      .then((data) => {
        if (dir !== d) return; // người dùng đã đổi hướng trong lúc tải
        dictData = data;
        renderStats();
        page = 1;
        renderList();
      })
      .catch(() => {
        if (dir !== d) return;
        el("#dictList").innerHTML = `<div class="empty-state">
          <p style="font-size:2.5rem">📂</p>
          <p>Không tải được dữ liệu từ điển.<br/>Hãy mở trang qua web server và kiểm tra thư mục <b>data/</b>.</p>
        </div>`;
      });
  };

  /* ---------- HERO STATS ---------- */
  const renderStats = () => {
    let total = null;
    let mastered = 0;
    let learning = 0;
    if (dictData) {
      const c = MishkaDict.counts(dir, SRS.getState());
      if (c) {
        total = c.total;
        mastered = c.mastered;
        learning = c.new + c.learning + c.reviewing;
      }
    }
    const ru = MishkaDict._cache["ru-vi"];
    const vr = MishkaDict._cache["vi-ru"];
    if (ru && vr) el("#dictTotal").textContent = fmt(ru.total + vr.total);
    el("#statTotal").textContent = total === null ? "…" : fmt(total);
    el("#statMastered").textContent = fmt(mastered);
    el("#statLearning").textContent = fmt(learning);
    el("#statQueue").textContent = fmt(SRS.getDueCards().length);
  };

  /* ---------- DANH SÁCH + TÌM KIẾM ---------- */
  const renderList = () => {
    const host = el("#dictList");
    if (!dictData) return; // đang tải dữ liệu
    const sm = MishkaDict.statusMap(SRS.getState());
    const filtered = MishkaDict.search(dir, {
      q: searchQuery,
      level: filterLevel,
      pos: filterPos,
      status: filterStatus,
      statusMap: sm
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    if (page < 1) page = 1;
    const start = (page - 1) * PAGE_SIZE;
    const slice = filtered.slice(start, start + PAGE_SIZE);

    if (slice.length === 0) {
      host.innerHTML = `<div class="empty-state">
        <p style="font-size:2.5rem">🔎</p>
        <p>Không có từ nào khớp với bộ lọc. Hãy thử bỏ bớt điều kiện.</p>
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

  /* ---------- FILTERS ---------- */
  document.querySelectorAll(".chip-level").forEach((b) => {
    b.onclick = () => {
      filterLevel = b.dataset.l;
      document.querySelectorAll(".chip-level").forEach((x) => x.classList.toggle("active", x === b));
      page = 1;
      renderList();
    };
  });
  document.querySelectorAll(".chip-pos").forEach((b) => {
    b.onclick = () => {
      filterPos = b.dataset.p;
      document.querySelectorAll(".chip-pos").forEach((x) => x.classList.toggle("active", x === b));
      page = 1;
      renderList();
    };
  });
  document.querySelectorAll(".chip-status").forEach((b) => {
    b.onclick = () => {
      filterStatus = b.dataset.s;
      document.querySelectorAll(".chip-status").forEach((x) => x.classList.toggle("active", x === b));
      page = 1;
      renderList();
    };
  });
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
  document.querySelectorAll(".dict-suggest-chip").forEach((b) => {
    b.onclick = () => {
      el("#dictSearch").value = b.dataset.q;
      searchQuery = b.dataset.q;
      page = 1;
      renderList();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
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

  /* ---------- ĐỔI HƯỚNG TỪ ĐIỂN ---------- */
  document.querySelectorAll(".dict-tab").forEach((b) => {
    b.onclick = () => {
      const d = b.dataset.dir;
      if (d === dir) return;
      dir = d;
      // Cấp độ CEFR chỉ có ở hướng Nga → Việt
      filterLevel = "all";
      document.querySelectorAll(".chip-level").forEach((x) =>
        x.classList.toggle("active", x.dataset.l === "all")
      );
      page = 1;
      const cached = MishkaDict._cache[d];
      if (cached) {
        dictData = cached;
        applyDirUi();
        renderStats();
        renderList();
      } else {
        loadDir(d);
      }
    };
  });

  applyDirUi();
  renderStats();
  loadDir(dir);

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
