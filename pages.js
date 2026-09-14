function el(sel) {
  return document.querySelector(sel);
}

function lessonCardHtml(lesson, kindLabel) {
  const done = Progress.doneList("vocabDone").includes(lesson.id) ? 100 : 0;
  return `
  <article class="lesson-card" data-lesson="${lesson.id}">
    <div class="done-bar" style="width:${done}%"></div>
    <div class="lesson-thumb">${lesson.scene}</div>
    <span class="ep-tag">${kindLabel}</span>
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
        <div class="scene-area" id="sceneIcon">${current.scene}</div>
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
          Progress.markDone("vocabDone", current.id);
          Progress.addXp(20);
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
        <article class="lesson-card" data-g="${l.id}">
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
          Progress.markDone("grammarDone", lesson.id);
          Progress.addXp(15);
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
        Progress.addXp(15);
        Progress.markDone("listenDone", current.id + "_blank");
      } else {
        toast(`${ok}/${current.blanks.length} đúng — nghe lại nhé!`);
      }
    };
  };

  const modeDict = (mb) => {
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
        if (sim < 80) {
          badge.insertAdjacentHTML(
            "afterend",
            `<p class="ru" style="color:var(--green);font-size:.9rem">Đáp án: ${esc(current.dictation[i])}</p>`
          );
        } else {
          Progress.addXp(5);
        }
      };
    });
  };

  const modeCheck = (mb) => {
    quizEngine(mb, current.questions, {
      onFinish: (pct) => {
        if (pct >= 60) {
          Progress.markDone("listenDone", current.id + "_check");
          Progress.addXp(15);
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
          if (sim >= 70) Progress.addXp(10);
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
        Progress.addXp(25);
        Progress.markDone("writeDone", task.id);
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
        group.forEach((g) => g.classList.remove("correct", "wrong"));
        btn.classList.add("correct");
        const [pid, qi] = id.split("_");
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
        <div class="lesson-thumb">${p.icon}</div>
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
  el("#pwBest").textContent = STORE.get("bestTest", 0) + "%";
}
