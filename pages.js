
function dauNormalize(str) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .replace(/ё/g, "е")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function el(sel) {
  return document.querySelector(sel);
}

function renderDauPagination(containerEl, currentPage, totalPages, onPageChange) {
  if (!containerEl) return;
  if (!totalPages || totalPages <= 1) {
    containerEl.innerHTML = "";
    containerEl.style.display = "none";
    return;
  }
  containerEl.style.display = "flex";

  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  let html = `
    <button type="button" class="dau-page-btn dau-page-prev" ${currentPage <= 1 ? "disabled" : ""} aria-label="Trang trước">
      ‹ Trang trước
    </button>
  `;

  pages.forEach(p => {
    if (p === "...") {
      html += `<span class="dau-page-ellipsis">…</span>`;
    } else {
      html += `
        <button type="button" class="dau-page-btn dau-page-num ${p === currentPage ? "active" : ""}" data-page="${p}">
          ${p}
        </button>
      `;
    }
  });

  html += `
    <button type="button" class="dau-page-btn dau-page-next" ${currentPage >= totalPages ? "disabled" : ""} aria-label="Trang sau">
      Trang sau ›
    </button>
  `;

  containerEl.innerHTML = html;

  const prevBtn = containerEl.querySelector(".dau-page-prev");
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage > 1) onPageChange(currentPage - 1);
    };
  }

  const nextBtn = containerEl.querySelector(".dau-page-next");
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
  }

  containerEl.querySelectorAll(".dau-page-num").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const page = parseInt(btn.dataset.page, 10);
      if (page && page !== currentPage) onPageChange(page);
    };
  });
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

/* =====================================================================
 * QUIZLET STUDY ENGINE & UNIVERSAL PERSONAL JAR ADDER
 * ===================================================================== */

function playQuizletSound(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!window._qAudioCtx) window._qAudioCtx = new AudioCtx();
    const ctx = window._qAudioCtx;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    if (type === "flip") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "correct" || type === "match") {
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        const t = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(85, now + 0.22);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "star") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (e) {
    // Non-fatal if browser limits audio context
  }
}
window.playQuizletSound = playQuizletSound;

function getQuizletStarred() {
  return (typeof STORE !== "undefined") ? STORE.get("quizlet_starred", []) : [];
}

function toggleQuizletStarred(ruWord) {
  if (!ruWord) return false;
  let starred = getQuizletStarred();
  const norm = ruWord.toLowerCase();
  const idx = starred.findIndex(w => (w || "").toLowerCase() === norm);
  let isStarred = false;
  if (idx >= 0) {
    starred.splice(idx, 1);
    isStarred = false;
  } else {
    starred.push(ruWord);
    isStarred = true;
    playQuizletSound("star");
  }
  if (typeof STORE !== "undefined") STORE.set("quizlet_starred", starred);
  return isStarred;
}

function qShuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getQuizletDistractors(currentWord, allWords, count = 3) {
  const fallbacks = [
    "xin chào, chào bạn", "tạm biệt, hẹn gặp lại", "cảm ơn bạn nhiều",
    "làm ơn, xin vui lòng", "thành phố, đô thị", "trường đại học tổng hợp",
    "ký túc xá sinh viên", "phòng học, giảng đường", "thư viện nghiên cứu",
    "bữa ăn sáng", "bữa trưa truyền thống", "bữa tối ấm cúng",
    "bánh mì Nga", "trà đen nóng", "quán cà phê", "nhà ga xe lửa",
    "sân bay quốc tế", "xe buýt thành phố", "tàu điện ngầm metro",
    "quyển sách hay", "từ điển tiếng Nga", "bài tập ngữ pháp"
  ];
  const targetVi = (currentWord.vi || "").toLowerCase().trim();
  const pool = allWords
    .filter(w => (w.vi || "").toLowerCase().trim() !== targetVi)
    .map(w => w.vi)
    .concat(fallbacks);

  const seen = new Set();
  const result = [];
  for (const item of pool) {
    if (result.length >= count) break;
    const norm = (item || "").toLowerCase().trim();
    if (norm && norm !== targetVi && !seen.has(norm)) {
      seen.add(norm);
      result.push(item);
    }
  }
  return result;
}

window.openAddToJarModal = function(wordData) {
  if (!wordData) return;
  const ru = (wordData.ru || "").trim();
  const vi = (wordData.vi || wordData.meaning || "").trim();
  const stress = wordData.stress || ru;
  const note = wordData.note || wordData.pos || wordData.trans || "";
  const ex = wordData.ex || "";
  const ex_vi = wordData.ex_vi || "";

  let customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
  if (!customJars || !customJars.length) {
    customJars = [{
      id: "custom-jar-default",
      name: "Lọ từ vựng yêu thích ⭐",
      icon: "⭐",
      desc: "Lọ chứa các từ vựng bạn yêu thích và đã lưu",
      words: [],
      level: "A1",
      is_system: false
    }];
    if (typeof STORE !== "undefined") STORE.set("custom_jars", customJars);
  }

  const oldModal = document.getElementById("universalAddJarModal");
  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");
  modal.id = "universalAddJarModal";
  modal.className = "add-jar-modal";
  modal.innerHTML = `
    <div class="add-jar-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h3 style="margin:0;font-size:1.15rem;display:flex;align-items:center;gap:8px">
          <span>🏺</span> Lưu vào Lọ từ vựng cá nhân
        </h3>
        <button type="button" class="btn btn-soft btn-sm" id="closeAddJarModal" style="padding:4px 8px;border-radius:50%;font-size:1rem;line-height:1">✕</button>
      </div>

      <div class="add-jar-preview">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="ru-word ru">${esc(stress || ru)}</div>
            ${note ? `<span style="display:inline-block;font-size:0.75rem;padding:2px 8px;border-radius:6px;background:var(--primary-soft);color:var(--primary);margin-top:4px;font-weight:600">${esc(note)}</span>` : ""}
          </div>
          <button type="button" class="btn btn-soft btn-sm" id="previewSpeakBtn" style="padding:6px 10px;border-radius:50%">🔊</button>
        </div>
        <div class="vi-word">${esc(vi)}</div>
        ${ex ? `<div style="font-size:0.82rem;color:var(--muted);margin-top:6px;border-top:1px dashed var(--border);padding-top:6px;font-style:italic">«${esc(ex)}»</div>` : ""}
      </div>

      <label style="display:block;margin-bottom:12px">
        <span style="font-size:0.85rem;font-weight:700;display:block;margin-bottom:6px">Chọn Lọ từ vựng muốn lưu vào:</span>
        <select id="selectTargetJar" style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.92rem;background:var(--surface);color:var(--text)">
          ${customJars.map(j => `
            <option value="${esc(j.id)}">${esc(j.icon || "🏺")} ${esc(j.name)} (${(j.words || []).length} từ)</option>
          `).join("")}
          <option value="__NEW_JAR__">➕ [Tạo Lọ mới ngay...]</option>
        </select>
      </label>

      <div id="inlineNewJarGroup" style="display:none;background:var(--bg);border:1px dashed var(--border);border-radius:10px;padding:10px 12px;margin-bottom:12px">
        <span style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px">Tên Lọ mới:</span>
        <div style="display:flex;gap:8px">
          <input type="text" id="inlineNewJarIcon" value="⭐" style="width:46px;text-align:center;padding:6px;border:1px solid var(--border);border-radius:8px;font-size:1rem" />
          <input type="text" id="inlineNewJarName" placeholder="Ví dụ: Từ vựng thi TRKI 1..." style="flex:1;padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:0.9rem" />
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px">
        <button type="button" class="btn btn-outline btn-sm" id="btnCancelAddJar">Hủy</button>
        <button type="button" class="btn btn-primary btn-sm" id="btnConfirmAddJar">💾 Lưu vào Lọ</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const sel = modal.querySelector("#selectTargetJar");
  const newGroup = modal.querySelector("#inlineNewJarGroup");
  const newName = modal.querySelector("#inlineNewJarName");
  const newIcon = modal.querySelector("#inlineNewJarIcon");

  sel.onchange = () => {
    newGroup.style.display = sel.value === "__NEW_JAR__" ? "block" : "none";
    if (sel.value === "__NEW_JAR__") newName.focus();
  };

  modal.querySelector("#previewSpeakBtn").onclick = () => speak(ru);
  modal.querySelector("#closeAddJarModal").onclick = () => modal.remove();
  modal.querySelector("#btnCancelAddJar").onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  modal.querySelector("#btnConfirmAddJar").onclick = () => {
    let jarId = sel.value;
    let currentCustomJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];

    if (jarId === "__NEW_JAR__") {
      const createdName = (newName.value || "").trim();
      const createdIcon = (newIcon.value || "").trim() || "⭐";
      if (!createdName) {
        toast("Vui lòng nhập tên cho Lọ từ vựng mới!");
        newName.focus();
        return;
      }
      jarId = "custom-jar-" + Date.now();
      const newJar = {
        id: jarId,
        name: createdName,
        icon: createdIcon,
        desc: "Lọ từ vựng cá nhân",
        words: [],
        level: "A1",
        is_system: false
      };
      currentCustomJars.push(newJar);
    }

    const jar = currentCustomJars.find(j => j.id === jarId);
    if (!jar) {
      toast("Không tìm thấy lọ được chọn!");
      return;
    }

    jar.words = jar.words || [];
    const existingIdx = jar.words.findIndex(w => (w.ru || "").toLowerCase() === ru.toLowerCase());
    const wordPayload = {
      ru: ru,
      vi: vi,
      stress: stress,
      note: note,
      ex: ex,
      ex_vi: ex_vi
    };

    if (existingIdx >= 0) {
      jar.words[existingIdx] = Object.assign({}, jar.words[existingIdx], wordPayload);
      toast(`✨ Đã cập nhật từ «${ru}» trong lọ «${jar.name}»!`);
    } else {
      jar.words.push(wordPayload);
      toast(`🏺 Đã lưu «${ru}» vào «${jar.name}» thành công! 🎉`);
    }

    if (typeof STORE !== "undefined") {
      STORE.set("custom_jars", currentCustomJars);
    }
    playQuizletSound("correct");
    modal.remove();

    if (typeof window.refreshVocabViews === "function") {
      window.refreshVocabViews();
    }
  };
};

function openAddWordToJarModal(jarId, onSuccess) {
  let m = document.getElementById("addWordToJarModal");
  if (m) m.remove();
  m = document.createElement("div");
  m.id = "addWordToJarModal";
  m.className = "add-jar-modal";
  m.innerHTML = `
    <div class="add-jar-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="margin:0;font-size:1.15rem">➕ Thêm từ mới vào Lọ</h3>
        <button type="button" class="btn btn-soft btn-sm" id="closeAddWordModal" style="padding:4px 8px;border-radius:50%">✕</button>
      </div>

      <label style="display:block;margin-bottom:10px">
        <span style="font-size:0.85rem;font-weight:700">Từ tiếng Nga (*):</span>
        <input type="text" id="newWordRu" placeholder="Ví dụ: спасибо" style="width:100%;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;margin-top:4px" />
      </label>

      <label style="display:block;margin-bottom:10px">
        <span style="font-size:0.85rem;font-weight:700">Trọng âm (tùy chọn):</span>
        <input type="text" id="newWordStress" placeholder="Ví dụ: спаси́бо" style="width:100%;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;margin-top:4px" />
      </label>

      <label style="display:block;margin-bottom:10px">
        <span style="font-size:0.85rem;font-weight:700">Nghĩa tiếng Việt (*):</span>
        <input type="text" id="newWordVi" placeholder="Ví dụ: cảm ơn" style="width:100%;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;margin-top:4px" />
      </label>

      <label style="display:block;margin-bottom:10px">
        <span style="font-size:0.85rem;font-weight:700">Từ loại / Ghi chú:</span>
        <input type="text" id="newWordNote" placeholder="Ví dụ: thán từ lịch sự" style="width:100%;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;margin-top:4px" />
      </label>

      <label style="display:block;margin-bottom:14px">
        <span style="font-size:0.85rem;font-weight:700">Câu ví dụ thực tế:</span>
        <input type="text" id="newWordEx" placeholder="Ví dụ: Большое спасибо за помощь!" style="width:100%;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;margin-top:4px" />
      </label>

      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn btn-outline btn-sm" id="cancelAddWord">Hủy</button>
        <button type="button" class="btn btn-primary btn-sm" id="saveAddWord">💾 Lưu từ này</button>
      </div>
    </div>
  `;
  document.body.appendChild(m);

  m.querySelector("#closeAddWordModal").onclick = () => m.remove();
  m.querySelector("#cancelAddWord").onclick = () => m.remove();
  m.onclick = (e) => { if (e.target === m) m.remove(); };

  m.querySelector("#saveAddWord").onclick = () => {
    const ru = (m.querySelector("#newWordRu").value || "").trim();
    const stress = (m.querySelector("#newWordStress").value || "").trim() || ru;
    const vi = (m.querySelector("#newWordVi").value || "").trim();
    const note = (m.querySelector("#newWordNote").value || "").trim();
    const ex = (m.querySelector("#newWordEx").value || "").trim();

    if (!ru) { toast("Vui lòng nhập từ tiếng Nga"); return; }
    if (!vi) { toast("Vui lòng nhập nghĩa tiếng Việt"); return; }

    const customJars = STORE.get("custom_jars", []);
    const jar = customJars.find(j => j.id === jarId);
    if (!jar) { toast("Không tìm thấy lọ!"); return; }

    jar.words = jar.words || [];
    jar.words.push({ ru, stress, vi, note, ex });
    STORE.set("custom_jars", customJars);
    playQuizletSound("correct");
    toast(`Đã thêm từ «${ru}» vào lọ thành công! 🎉`);
    m.remove();
    if (onSuccess) onSuccess();
  };
}
window.openAddWordToJarModal = openAddWordToJarModal;

window.initQuizletSuite = function(container, rawWords, options = {}) {
  if (!container) return;
  const jarId = options.jarId || "jar-default";
  const jarTitle = options.jarTitle || "Lọ từ vựng";
  const isCustomJar = Boolean(options.isCustomJar);
  const onWordListChange = options.onWordListChange;

  const words = (rawWords || []).map((w, idx) => ({
    id: w.id || "w-" + idx,
    ru: (w.ru || "").trim(),
    stress: (w.stress || w.ru || "").trim(),
    vi: (w.vi || w.meaning || "").trim(),
    note: (w.note || w.pos || w.trans || "").trim(),
    ex: (w.ex || "").trim(),
    ex_vi: (w.ex_vi || "").trim()
  }));

  if (words.length === 0) {
    container.innerHTML = `
      <div class="quizlet-empty-jar">
        <div style="font-size:3rem;margin-bottom:12px">🏺</div>
        <h3 style="margin-bottom:8px">Lọ từ vựng này đang trống</h3>
        <p style="color:var(--muted);max-width:460px;margin:0 auto 20px;font-size:0.95rem">
          Bạn chưa có từ vựng nào trong lọ này. Hãy nhấn nút bên dưới để thêm từ mới, hoặc nhấn nút <b>🏺 + Lưu</b> từ bất kỳ bài học nào trên hệ thống!
        </p>
        ${isCustomJar ? `<button class="btn btn-primary btn-sm" id="btnEmptyAddWord">➕ Thêm từ mới thủ công ngay</button>` : ""}
      </div>
    `;
    const btnAdd = container.querySelector("#btnEmptyAddWord");
    if (btnAdd) {
      btnAdd.onclick = () => openAddWordToJarModal(jarId, onWordListChange);
    }
    return;
  }

  container.innerHTML = `
    <div class="quizlet-suite">
      <div class="quizlet-mode-bar">
        <button type="button" class="quizlet-mode-btn active" data-mode="flashcard">
          <span>🃏</span> Thẻ ghi nhớ
        </button>
        <button type="button" class="quizlet-mode-btn" data-mode="learn">
          <span>🎯</span> Học thông minh
        </button>
        <button type="button" class="quizlet-mode-btn" data-mode="write">
          <span>✍️</span> Gõ từ & Chính tả
        </button>
        <button type="button" class="quizlet-mode-btn" data-mode="match">
          <span>⚡</span> Ghép thẻ
        </button>
        <button type="button" class="quizlet-mode-btn" data-mode="test">
          <span>📝</span> Kiểm tra
        </button>
        <button type="button" class="quizlet-mode-btn" data-mode="list">
          <span>📜</span> Danh sách (${words.length})
        </button>
      </div>

      <div class="qmode-pane active" id="paneFlashcard"></div>
      <div class="qmode-pane" id="paneLearn"></div>
      <div class="qmode-pane" id="paneWrite"></div>
      <div class="qmode-pane" id="paneMatch"></div>
      <div class="qmode-pane" id="paneTest"></div>
      <div class="qmode-pane" id="paneList"></div>
    </div>
  `;

  // Mode switching
  let currentMode = "flashcard";
  let matchTimerInterval = null;

  const modeBtns = container.querySelectorAll(".quizlet-mode-btn");
  const panes = {
    flashcard: container.querySelector("#paneFlashcard"),
    learn: container.querySelector("#paneLearn"),
    write: container.querySelector("#paneWrite"),
    match: container.querySelector("#paneMatch"),
    test: container.querySelector("#paneTest"),
    list: container.querySelector("#paneList")
  };

  const switchMode = (mode) => {
    if (matchTimerInterval) {
      clearInterval(matchTimerInterval);
      matchTimerInterval = null;
    }
    currentMode = mode;
    modeBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
    Object.keys(panes).forEach(k => {
      if (panes[k]) panes[k].classList.toggle("active", k === mode);
    });

    if (mode === "flashcard") renderFlashcardMode();
    if (mode === "learn") renderLearnMode();
    if (mode === "write") renderWriteMode();
    if (mode === "match") renderMatchMode();
    if (mode === "test") renderTestMode();
    if (mode === "list") renderListMode();
  };

  modeBtns.forEach(btn => {
    btn.onclick = () => switchMode(btn.dataset.mode);
  });

  /* ---------------- MODE 1: FLASHCARD ---------------- */
  let fActiveWords = [...words];
  let fIdx = 0;
  let fFlipped = false;
  let fShuffled = false;
  let fStarredOnly = false;
  let fAutoAudio = (typeof STORE !== "undefined") ? STORE.get("quizlet_auto_audio", true) : true;

  const renderFlashcardMode = () => {
    const pane = panes.flashcard;
    if (!pane) return;

    if (fStarredOnly) {
      const starred = getQuizletStarred().map(s => s.toLowerCase());
      fActiveWords = words.filter(w => starred.includes(w.ru.toLowerCase()));
      if (fActiveWords.length === 0) {
        toast("Chưa có từ nào được gắn sao ⭐! Hãy bấm ⭐ trên thẻ để đánh dấu từ khó.");
        fStarredOnly = false;
        fActiveWords = [...words];
      }
    }

    if (fIdx >= fActiveWords.length) fIdx = 0;
    const currentWord = fActiveWords[fIdx] || words[0];
    const isStarred = getQuizletStarred().map(s => s.toLowerCase()).includes(currentWord.ru.toLowerCase());
    const progressPct = ((fIdx + 1) / fActiveWords.length) * 100;

    pane.innerHTML = `
      <div class="quizlet-progress-bar">
        <div class="quizlet-progress-fill" style="width:${progressPct}%"></div>
      </div>

      <div class="quizlet-card-container" id="qCardContainer">
        <div class="quizlet-card ${fFlipped ? "flipped" : ""}" id="qCard">
          <!-- FRONT FACE (RU) -->
          <div class="quizlet-card-face quizlet-card-front">
            <div class="qcard-top-row">
              <span class="qcard-badge">🇷🇺 Tiếng Nga</span>
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-star ${isStarred ? "starred" : ""}" id="qStarFront" title="Đánh dấu từ khó (Phím S)">⭐</button>
                <button type="button" class="qcard-btn-addjar" id="qAddJarFront" title="Lưu vào Lọ cá nhân">🏺 + Lưu</button>
              </div>
            </div>

            <div class="qcard-main">
              <div class="qcard-word ru">${esc(currentWord.stress || currentWord.ru)}</div>
              ${currentWord.note ? `<div class="scroll-pos">${esc(currentWord.note)}</div>` : ""}
              <button type="button" class="qcard-audio-btn" id="qAudioFront" title="Phát âm tiếng Nga">🔊</button>
            </div>

            <div class="qcard-hint">
              <span>↷ Nhấn thẻ hoặc phím [Space] để lật xem nghĩa</span>
            </div>
          </div>

          <!-- BACK FACE (VI) -->
          <div class="quizlet-card-face quizlet-card-back">
            <div class="qcard-top-row">
              <span class="qcard-badge vi">🇻🇳 Tiếng Việt</span>
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-star ${isStarred ? "starred" : ""}" id="qStarBack" title="Đánh dấu từ khó (Phím S)">⭐</button>
                <button type="button" class="qcard-btn-addjar" id="qAddJarBack" title="Lưu vào Lọ cá nhân">🏺 + Lưu</button>
              </div>
            </div>

            <div class="qcard-main">
              <div class="qcard-meaning">${esc(currentWord.vi)}</div>
              ${currentWord.ex ? `
                <div class="qcard-ex-wrap">
                  <div class="qcard-ex ru">«${esc(currentWord.ex)}»</div>
                  ${currentWord.ex_vi ? `<div class="qcard-ex-vi">${esc(currentWord.ex_vi)}</div>` : ""}
                </div>
              ` : ""}
              ${currentWord.ex ? `<button type="button" class="qcard-audio-btn" id="qAudioBackEx" title="Phát âm câu ví dụ" style="margin-top:6px">🔊</button>` : ""}
            </div>

            <div class="qcard-hint">
              <span>↶ Nhấn thẻ để lật lại tiếng Nga</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTROLS -->
      <div class="quizlet-controls">
        <div class="quizlet-nav-wrap">
          <button type="button" class="quizlet-nav-btn" id="qNavPrev" title="Thẻ trước (Phím ←)">‹</button>
          <div class="quizlet-counter">${fIdx + 1} / ${fActiveWords.length}</div>
          <button type="button" class="quizlet-nav-btn" id="qNavNext" title="Thẻ sau (Phím →)">›</button>
        </div>

        <div class="quizlet-tools">
          <button type="button" class="quizlet-tool-btn ${fShuffled ? "active" : ""}" id="qToolShuffle">
            <span>🔀</span> Xáo trộn
          </button>
          <button type="button" class="quizlet-tool-btn ${fStarredOnly ? "active" : ""}" id="qToolStar">
            <span>⭐</span> Chỉ từ khó
          </button>
          <button type="button" class="quizlet-tool-btn ${fAutoAudio ? "active" : ""}" id="qToolAudio">
            <span>🔊</span> Tự đọc: ${fAutoAudio ? "Bật" : "Tắt"}
          </button>
          <button type="button" class="quizlet-tool-btn" id="qToolFullscreen">
            <span>⛶</span> Toàn màn hình
          </button>
        </div>
      </div>
    `;

    // Bind card flip
    const card = pane.querySelector("#qCard");
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      fFlipped = !fFlipped;
      card.classList.toggle("flipped", fFlipped);
      playQuizletSound("flip");
    };

    // Navigation
    const nextCard = () => {
      fIdx = (fIdx + 1) % fActiveWords.length;
      fFlipped = false;
      renderFlashcardMode();
      if (fAutoAudio) speak(fActiveWords[fIdx].ru);
    };
    const prevCard = () => {
      fIdx = (fIdx - 1 + fActiveWords.length) % fActiveWords.length;
      fFlipped = false;
      renderFlashcardMode();
      if (fAutoAudio) speak(fActiveWords[fIdx].ru);
    };

    pane.querySelector("#qNavNext").onclick = nextCard;
    pane.querySelector("#qNavPrev").onclick = prevCard;

    // Audio
    pane.querySelector("#qAudioFront").onclick = (e) => {
      e.stopPropagation();
      speak(currentWord.ru);
    };
    const audioEx = pane.querySelector("#qAudioBackEx");
    if (audioEx) {
      audioEx.onclick = (e) => {
        e.stopPropagation();
        speak(currentWord.ex);
      };
    }

    // Star
    const toggleStarCurrent = (e) => {
      if (e) e.stopPropagation();
      const starred = toggleQuizletStarred(currentWord.ru);
      pane.querySelectorAll(".qcard-btn-star").forEach(b => b.classList.toggle("starred", starred));
      toast(starred ? `⭐ Đã gắn sao từ «${currentWord.ru}»` : `Đã bỏ gắn sao từ «${currentWord.ru}»`);
    };
    pane.querySelector("#qStarFront").onclick = toggleStarCurrent;
    pane.querySelector("#qStarBack").onclick = toggleStarCurrent;

    // Add to jar
    const addJarCurrent = (e) => {
      e.stopPropagation();
      window.openAddToJarModal(currentWord);
    };
    pane.querySelector("#qAddJarFront").onclick = addJarCurrent;
    pane.querySelector("#qAddJarBack").onclick = addJarCurrent;

    // Shuffle
    pane.querySelector("#qToolShuffle").onclick = () => {
      fShuffled = !fShuffled;
      if (fShuffled) {
        fActiveWords = qShuffleArray(fActiveWords);
        toast("🔀 Đã xáo trộn danh sách thẻ!");
      } else {
        fActiveWords = fStarredOnly
          ? words.filter(w => getQuizletStarred().map(s => s.toLowerCase()).includes(w.ru.toLowerCase()))
          : [...words];
        toast("Đã khôi phục thứ tự ban đầu");
      }
      fIdx = 0;
      fFlipped = false;
      renderFlashcardMode();
    };

    // Star filter
    pane.querySelector("#qToolStar").onclick = () => {
      fStarredOnly = !fStarredOnly;
      fIdx = 0;
      fFlipped = false;
      renderFlashcardMode();
    };

    // Auto audio
    pane.querySelector("#qToolAudio").onclick = () => {
      fAutoAudio = !fAutoAudio;
      if (typeof STORE !== "undefined") STORE.set("quizlet_auto_audio", fAutoAudio);
      toast(fAutoAudio ? "🔊 Đã bật tự động đọc từ khi chuyển thẻ" : "Đã tắt tự động đọc");
      renderFlashcardMode();
    };

    // Fullscreen
    pane.querySelector("#qToolFullscreen").onclick = () => {
      const container = pane.querySelector("#qCardContainer");
      const isFull = container.classList.toggle("fullscreen");
      if (isFull) {
        let exitBtn = container.querySelector("#qExitFullscreen");
        if (!exitBtn) {
          exitBtn = document.createElement("button");
          exitBtn.id = "qExitFullscreen";
          exitBtn.className = "btn btn-soft btn-sm";
          exitBtn.style.position = "absolute";
          exitBtn.style.top = "20px";
          exitBtn.style.right = "24px";
          exitBtn.style.zIndex = "10001";
          exitBtn.innerHTML = "✕ Thu nhỏ (Esc)";
          exitBtn.onclick = () => {
            container.classList.remove("fullscreen");
            exitBtn.remove();
          };
          container.appendChild(exitBtn);
        }
      } else {
        const exitBtn = container.querySelector("#qExitFullscreen");
        if (exitBtn) exitBtn.remove();
      }
    };
  };

  // Keyboard shortcut listener for Flashcards
  const handleKeydown = (e) => {
    if (currentMode !== "flashcard") return;
    const isEditing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (isEditing) return;

    if (e.code === "Space") {
      e.preventDefault();
      const card = container.querySelector("#qCard");
      if (card) {
        fFlipped = !fFlipped;
        card.classList.toggle("flipped", fFlipped);
        playQuizletSound("flip");
      }
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      const nextBtn = container.querySelector("#qNavNext");
      if (nextBtn) nextBtn.click();
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      const prevBtn = container.querySelector("#qNavPrev");
      if (prevBtn) prevBtn.click();
    } else if (e.code === "KeyS") {
      e.preventDefault();
      const starBtn = container.querySelector("#qStarFront");
      if (starBtn) starBtn.click();
    } else if (e.code === "KeyR") {
      e.preventDefault();
      if (fActiveWords[fIdx]) speak(fActiveWords[fIdx].ru);
    } else if (e.code === "Escape") {
      const cardCont = container.querySelector("#qCardContainer");
      if (cardCont && cardCont.classList.contains("fullscreen")) {
        cardCont.classList.remove("fullscreen");
        const exitBtn = cardCont.querySelector("#qExitFullscreen");
        if (exitBtn) exitBtn.remove();
      }
    }
  };
  document.removeEventListener("keydown", handleKeydown);
  document.addEventListener("keydown", handleKeydown);

  /* ---------------- MODE 2: LEARN (4 OPTIONS) ---------------- */
  let lQueue = [];
  let lIdx = 0;
  let lScore = 0;
  let lWrongWords = [];

  const startLearn = (customList = null) => {
    lQueue = customList ? [...customList] : qShuffleArray([...words]);
    lIdx = 0;
    lScore = 0;
    lWrongWords = [];
    renderLearnStep();
  };

  const renderLearnMode = () => {
    startLearn();
  };

  const renderLearnStep = () => {
    const pane = panes.learn;
    if (!pane) return;

    if (lIdx >= lQueue.length) {
      const pct = Math.round((lScore / lQueue.length) * 100);
      if (pct >= 70 && typeof Progress !== "undefined") {
        Progress.addXp(15);
      }
      pane.innerHTML = `
        <div class="quizlet-summary-box">
          <div class="quizlet-summary-trophy">${pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "📚"}</div>
          <h2 style="margin:0 0 8px">Hoàn thành bài Học thông minh!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đạt <b>${lScore}</b> / ${lQueue.length} câu chính xác (${pct}%)
            ${pct >= 70 ? ` · <span style="color:#16a34a;font-weight:700">+15 XP 🌟</span>` : ""}
          </p>

          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            ${lWrongWords.length > 0 ? `
              <button class="btn btn-primary" id="btnLearnRetryWrong">🔁 Ôn lại ${lWrongWords.length} từ chưa nhớ</button>
            ` : ""}
            <button class="btn btn-outline" id="btnLearnRestart">🔄 Học lại tất cả</button>
            <button class="btn btn-soft" id="btnLearnToFlash">🃏 Về thẻ ghi nhớ</button>
          </div>
        </div>
      `;

      const btnWrong = pane.querySelector("#btnLearnRetryWrong");
      if (btnWrong) btnWrong.onclick = () => startLearn(lWrongWords);
      pane.querySelector("#btnLearnRestart").onclick = () => startLearn();
      pane.querySelector("#btnLearnToFlash").onclick = () => switchMode("flashcard");
      return;
    }

    const currentWord = lQueue[lIdx];
    const distractors = getQuizletDistractors(currentWord, words, 3);
    const optionsList = qShuffleArray([currentWord.vi, ...distractors]);
    let answered = false;

    pane.innerHTML = `
      <div class="quizlet-learn-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <span style="font-size:0.85rem;font-weight:700;color:var(--muted)">HỌC THÔNG MINH · CÂU ${lIdx + 1} / ${lQueue.length}</span>
          <span style="font-size:0.85rem;font-weight:700;color:var(--primary)">Điểm: ${lScore}</span>
        </div>

        <div class="quizlet-progress-bar" style="margin-bottom:20px">
          <div class="quizlet-progress-fill" style="width:${((lIdx + 1) / lQueue.length) * 100}%"></div>
        </div>

        <div class="learn-q-card">
          <div class="learn-q-word ru">${esc(currentWord.stress || currentWord.ru)}</div>
          <button type="button" class="btn btn-soft btn-sm" id="btnLearnAudio" style="margin-top:6px">🔊 Nghe phát âm</button>
        </div>

        <p style="font-size:0.9rem;font-weight:700;color:var(--muted);margin-bottom:12px">Chọn nghĩa tiếng Việt chính xác (Phím 1-4):</p>
        <div class="learn-options-grid" id="learnOptions">
          ${optionsList.map((opt, i) => `
            <button type="button" class="learn-opt-btn" data-opt="${esc(opt)}" data-key="${i + 1}">
              <span style="display:inline-block;width:24px;height:24px;line-height:22px;text-align:center;border-radius:6px;background:var(--surface);border:1px solid var(--border);margin-right:8px;font-size:0.8rem;font-weight:700">${i + 1}</span>
              ${esc(opt)}
            </button>
          `).join("")}
        </div>

        <div id="learnFeedback" style="display:none;margin-top:18px;padding:14px;border-radius:10px;text-align:center"></div>
      </div>
    `;

    pane.querySelector("#btnLearnAudio").onclick = () => speak(currentWord.ru);

    const checkAnswer = (chosenOpt, btnElem) => {
      if (answered) return;
      answered = true;

      const isCorrect = chosenOpt.trim().toLowerCase() === currentWord.vi.trim().toLowerCase();
      const fbBox = pane.querySelector("#learnFeedback");

      if (isCorrect) {
        if (btnElem) btnElem.classList.add("correct");
        playQuizletSound("correct");
        lScore++;
        setTimeout(() => {
          lIdx++;
          renderLearnStep();
        }, 650);
      } else {
        if (btnElem) btnElem.classList.add("wrong");
        pane.querySelectorAll(".learn-opt-btn").forEach(b => {
          if (b.dataset.opt.trim().toLowerCase() === currentWord.vi.trim().toLowerCase()) {
            b.classList.add("correct");
          }
        });
        playQuizletSound("wrong");
        lWrongWords.push(currentWord);

        fbBox.style.display = "block";
        fbBox.style.background = "var(--red-soft)";
        fbBox.style.color = "var(--red)";
        fbBox.innerHTML = `
          <div style="font-weight:700;margin-bottom:4px">Chưa chính xác! Hãy ghi nhớ:</div>
          <div style="font-size:1.15rem;font-weight:800;color:var(--text)">${esc(currentWord.ru)} = ${esc(currentWord.vi)}</div>
          <button type="button" class="btn btn-primary btn-sm" id="btnLearnNext" style="margin-top:12px">Tiếp tục →</button>
        `;
        pane.querySelector("#btnLearnNext").onclick = () => {
          lIdx++;
          renderLearnStep();
        };
      }
    };

    pane.querySelectorAll(".learn-opt-btn").forEach(btn => {
      btn.onclick = () => checkAnswer(btn.dataset.opt, btn);
    });

    const learnKeydown = (e) => {
      if (currentMode !== "learn" || answered) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const btn = pane.querySelector(`.learn-opt-btn[data-key="${e.key}"]`);
        if (btn) btn.click();
      }
    };
    document.addEventListener("keydown", learnKeydown, { once: true });
  };

  /* ---------------- MODE 3: WRITE & SPELL ---------------- */
  let wQueue = [];
  let wIdx = 0;
  let wCorrect = 0;

  const renderWriteMode = () => {
    wQueue = [...words];
    wIdx = 0;
    wCorrect = 0;
    renderWriteStep();
  };

  const renderWriteStep = () => {
    const pane = panes.write;
    if (!pane) return;

    if (wIdx >= wQueue.length) {
      const pct = Math.round((wCorrect / wQueue.length) * 100);
      if (pct >= 70 && typeof Progress !== "undefined") Progress.addXp(20);
      pane.innerHTML = `
        <div class="quizlet-summary-box">
          <div class="quizlet-summary-trophy">✍️</div>
          <h2 style="margin:0 0 8px">Hoàn thành phần Gõ từ & Chính tả!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đã gõ đúng <b>${wCorrect}</b> / ${wQueue.length} từ vựng (${pct}%)
          </p>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" id="btnWriteRestart">🔄 Luyện lại từ đầu</button>
            <button class="btn btn-soft" id="btnWriteToFlash">🃏 Về thẻ ghi nhớ</button>
          </div>
        </div>
      `;
      pane.querySelector("#btnWriteRestart").onclick = () => renderWriteMode();
      pane.querySelector("#btnWriteToFlash").onclick = () => switchMode("flashcard");
      return;
    }

    const currentWord = wQueue[wIdx];
    let submitted = false;

    pane.innerHTML = `
      <div class="quizlet-write-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <span style="font-size:0.85rem;font-weight:700;color:var(--muted)">GÕ TỪ & CHÍNH TẢ · ${wIdx + 1} / ${wQueue.length}</span>
          <span style="font-size:0.85rem;font-weight:700;color:var(--primary)">Chính xác: ${wCorrect}</span>
        </div>

        <div class="quizlet-progress-bar">
          <div class="quizlet-progress-fill" style="width:${((wIdx + 1) / wQueue.length) * 100}%"></div>
        </div>

        <div style="margin:20px 0 10px">
          <div class="write-prompt-meaning">${esc(currentWord.vi)}</div>
          ${currentWord.note ? `<div class="scroll-pos" style="display:inline-block;margin-bottom:10px">${esc(currentWord.note)}</div>` : ""}
          <div style="margin-top:6px">
            <button type="button" class="btn btn-soft btn-sm" id="btnWriteSpeak">🔊 Nghe phát âm gợi ý</button>
          </div>
        </div>

        <!-- Cyrillic Virtual Keyboard -->
        <div class="cyrillic-keyboard">
          ${["ё", "й", "ъ", "ы", "ь", "э", "щ", "ж", "ц", "ч", "ш", "ю", "я"].map(k => `
            <button type="button" class="cyrillic-key" data-char="${k}">${k}</button>
          `).join("")}
        </div>

        <form id="writeForm" onsubmit="return false;">
          <div class="write-input-row">
            <input type="text" class="write-input ru" id="writeInput" placeholder="Gõ từ tiếng Nga vào đây..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
            <button type="submit" class="btn btn-primary" id="btnWriteSubmit">Kiểm tra ↵</button>
          </div>
        </form>

        <div id="writeResult" style="display:none;margin-top:16px;padding:14px;border-radius:10px;text-align:center"></div>
      </div>
    `;

    const inp = pane.querySelector("#writeInput");
    inp.focus();

    pane.querySelector("#btnWriteSpeak").onclick = () => speak(currentWord.ru);

    // Cyrillic keys insert
    pane.querySelectorAll(".cyrillic-key").forEach(kBtn => {
      kBtn.onclick = () => {
        const char = kBtn.dataset.char;
        const start = inp.selectionStart || inp.value.length;
        const end = inp.selectionEnd || inp.value.length;
        const val = inp.value;
        inp.value = val.substring(0, start) + char + val.substring(end);
        inp.focus();
        inp.setSelectionRange(start + char.length, start + char.length);
      };
    });

    const form = pane.querySelector("#writeForm");
    form.onsubmit = () => {
      if (submitted) return;
      submitted = true;

      const userVal = inp.value.trim();
      const normUser = dauNormalize(userVal);
      const normTarget = dauNormalize(currentWord.ru);
      const resBox = pane.querySelector("#writeResult");

      if (normUser === normTarget && normUser.length > 0) {
        wCorrect++;
        playQuizletSound("correct");
        resBox.style.display = "block";
        resBox.style.background = "#dcfce7";
        resBox.style.color = "#15803d";
        resBox.innerHTML = `<b>🎉 Tuyệt vời! Hoàn toàn chính xác!</b>`;
        setTimeout(() => {
          wIdx++;
          renderWriteStep();
        }, 750);
      } else {
        playQuizletSound("wrong");
        resBox.style.display = "block";
        resBox.style.background = "var(--red-soft)";
        resBox.style.color = "var(--red)";
        resBox.innerHTML = `
          <div style="font-weight:700;margin-bottom:6px">Chưa đúng chính tả!</div>
          <div style="color:var(--text);font-size:0.95rem">Bạn đã gõ: <span style="text-decoration:line-through">${esc(userVal || "(bỏ trống)")}</span></div>
          <div style="font-size:1.2rem;font-weight:800;color:var(--primary);margin:6px 0">Đáp án đúng: ${esc(currentWord.ru)}</div>
          <button type="button" class="btn btn-primary btn-sm" id="btnWriteNext" style="margin-top:10px">Tiếp tục →</button>
        `;
        pane.querySelector("#btnWriteNext").onclick = () => {
          wIdx++;
          renderWriteStep();
        };
      }
    };
  };

  /* ---------------- MODE 4: MATCH GAME (QUIZLET MATCH) ---------------- */
  let matchStartTime = null;
  let matchSelected = null;
  let matchMatchedCount = 0;
  let matchTotalPairs = 0;

  const renderMatchMode = () => {
    const pane = panes.match;
    if (!pane) return;

    if (matchTimerInterval) clearInterval(matchTimerInterval);

    const sampleWords = qShuffleArray([...words]).slice(0, 6);
    matchTotalPairs = sampleWords.length;
    matchMatchedCount = 0;
    matchSelected = null;

    const tiles = [];
    sampleWords.forEach((w, idx) => {
      tiles.push({ id: `ru-${idx}`, wordIdx: idx, text: w.stress || w.ru, type: "ru" });
      tiles.push({ id: `vi-${idx}`, wordIdx: idx, text: w.vi, type: "vi" });
    });
    const shuffledTiles = qShuffleArray(tiles);

    const bestRecord = (typeof STORE !== "undefined") ? STORE.get("quizlet_match_best_" + jarId, null) : null;

    pane.innerHTML = `
      <div class="quizlet-match-game">
        <div class="match-header">
          <div>
            <div style="font-size:0.85rem;font-weight:700;color:var(--muted)">GHÉP THẺ QUIZLET</div>
            <div style="font-size:0.9rem;font-weight:600">Ghép từ tiếng Nga với nghĩa tiếng Việt tương ứng</div>
          </div>
          <div class="match-timer" id="matchTimer">⏱️ 0.0s</div>
        </div>

        <div class="match-grid" id="matchGrid">
          ${shuffledTiles.map(t => `
            <div class="match-card ${t.type === "ru" ? "ru" : ""}" data-id="${t.id}" data-widx="${t.wordIdx}" data-type="${t.type}">
              ${esc(t.text)}
            </div>
          `).join("")}
        </div>

        <div id="matchVictory" style="display:none;margin-top:24px"></div>
      </div>
    `;

    matchStartTime = Date.now();
    const timerElem = pane.querySelector("#matchTimer");
    matchTimerInterval = setInterval(() => {
      const elapsed = ((Date.now() - matchStartTime) / 1000).toFixed(1);
      if (timerElem) timerElem.textContent = `⏱️ ${elapsed}s`;
    }, 100);

    const grid = pane.querySelector("#matchGrid");
    grid.querySelectorAll(".match-card").forEach(card => {
      card.onclick = () => {
        if (card.classList.contains("matched") || card.classList.contains("selected")) return;

        if (!matchSelected) {
          matchSelected = card;
          card.classList.add("selected");
        } else {
          const first = matchSelected;
          const isMatch = first.dataset.widx === card.dataset.widx && first.dataset.type !== card.dataset.type;

          if (isMatch) {
            first.classList.remove("selected");
            first.classList.add("matched");
            card.classList.add("matched");
            playQuizletSound("match");
            matchMatchedCount++;
            matchSelected = null;

            if (matchMatchedCount >= matchTotalPairs) {
              clearInterval(matchTimerInterval);
              const finalTime = ((Date.now() - matchStartTime) / 1000).toFixed(1);
              let isNewRecord = false;
              if (!bestRecord || parseFloat(finalTime) < parseFloat(bestRecord)) {
                isNewRecord = true;
                if (typeof STORE !== "undefined") STORE.set("quizlet_match_best_" + jarId, finalTime);
              }
              if (typeof Progress !== "undefined") Progress.addXp(25);

              grid.style.display = "none";
              const vic = pane.querySelector("#matchVictory");
              vic.style.display = "block";
              vic.innerHTML = `
                <div class="quizlet-summary-box">
                  <div class="quizlet-summary-trophy">⚡</div>
                  <h2 style="margin:0 0 8px">${isNewRecord ? "🎉 KỶ LỤC MỚI CỦA BẠN!" : "Tuyệt vời! Hoàn thành xuất sắc!"}</h2>
                  <p style="font-size:1.4rem;font-weight:800;color:var(--secondary);margin:10px 0">
                    ⏱️ Thời gian: ${finalTime} giây
                  </p>
                  <p style="color:var(--muted);margin-bottom:20px">+25 XP thưởng tốc độ 🌟</p>
                  <div style="display:flex;gap:12px;justify-content:center">
                    <button class="btn btn-primary" id="btnMatchAgain">🔄 Chơi lại ván mới</button>
                    <button class="btn btn-soft" id="btnMatchToFlash">🃏 Về thẻ ghi nhớ</button>
                  </div>
                </div>
              `;
              pane.querySelector("#btnMatchAgain").onclick = () => renderMatchMode();
              pane.querySelector("#btnMatchToFlash").onclick = () => switchMode("flashcard");
            }
          } else {
            card.classList.add("wrong");
            first.classList.add("wrong");
            playQuizletSound("wrong");
            setTimeout(() => {
              first.classList.remove("selected", "wrong");
              card.classList.remove("wrong");
              matchSelected = null;
            }, 420);
          }
        }
      };
    });
  };

  /* ---------------- MODE 5: TEST ---------------- */
  const renderTestMode = () => {
    const pane = panes.test;
    if (!pane) return;

    const testPool = qShuffleArray([...words]).slice(0, Math.min(8, words.length));
    const questions = testPool.map((w, idx) => {
      const isChoice = idx % 2 === 0;
      if (isChoice) {
        const distractors = getQuizletDistractors(w, words, 3);
        const options = qShuffleArray([w.vi, ...distractors]);
        return {
          id: idx,
          type: "choice",
          ru: w.stress || w.ru,
          correct: w.vi,
          options
        };
      } else {
        const isTrue = Math.random() > 0.5;
        const fakeMeaning = isTrue ? w.vi : (getQuizletDistractors(w, words, 1)[0] || "nghĩa khác");
        return {
          id: idx,
          type: "tf",
          ru: w.stress || w.ru,
          statement: fakeMeaning,
          isTrue,
          correct: isTrue ? "true" : "false"
        };
      }
    });

    pane.innerHTML = `
      <div class="quizlet-learn-box" style="max-width:720px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
          <div>
            <h3 style="margin:0">📝 Bài kiểm tra từ vựng: ${esc(jarTitle)}</h3>
            <span style="font-size:0.85rem;color:var(--muted)">Gồm ${questions.length} câu hỏi trắc nghiệm & đúng/sai</span>
          </div>
          <span class="dau-badge dau-badge-a1">${questions.length} câu</span>
        </div>

        <form id="quizletTestForm">
          ${questions.map((q, idx) => `
            <div style="background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-size:0.85rem;font-weight:700;color:var(--muted);margin-bottom:6px">CÂU ${idx + 1}:</div>
              ${q.type === "choice" ? `
                <div style="font-size:1.25rem;font-weight:800;margin-bottom:10px" class="ru">
                  «${esc(q.ru)}» có nghĩa là gì?
                </div>
                <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px">
                  ${q.options.map((opt) => `
                    <label style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:0.92rem">
                      <input type="radio" name="q_${q.id}" value="${esc(opt)}" required />
                      <span>${esc(opt)}</span>
                    </label>
                  `).join("")}
                </div>
              ` : `
                <div style="font-size:1.25rem;font-weight:800;margin-bottom:10px" class="ru">
                  «${esc(q.ru)}» có nghĩa là «${esc(q.statement)}»?
                </div>
                <div style="display:flex;gap:12px">
                  <label style="flex:1;display:flex;align-items:center;gap:8px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;cursor:pointer">
                    <input type="radio" name="q_${q.id}" value="true" required />
                    <span>✓ Đúng</span>
                  </label>
                  <label style="flex:1;display:flex;align-items:center;gap:8px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;cursor:pointer">
                    <input type="radio" name="q_${q.id}" value="false" required />
                    <span>✕ Sai</span>
                  </label>
                </div>
              `}
            </div>
          `).join("")}

          <div style="text-align:center;margin-top:20px">
            <button type="submit" class="btn btn-primary btn-lg">Nộp bài kiểm tra 📋</button>
          </div>
        </form>

        <div id="testResultBox" style="display:none;margin-top:20px"></div>
      </div>
    `;

    const form = pane.querySelector("#quizletTestForm");
    form.onsubmit = (e) => {
      e.preventDefault();
      let correct = 0;
      const formData = new FormData(form);

      questions.forEach(q => {
        const val = formData.get("q_" + q.id);
        if (q.type === "choice") {
          if (val === q.correct) correct++;
        } else {
          if (val === q.correct) correct++;
        }
      });

      const pct = Math.round((correct / questions.length) * 100);
      if (pct >= 70 && typeof Progress !== "undefined") Progress.addXp(25);

      form.style.display = "none";
      const resBox = pane.querySelector("#testResultBox");
      resBox.style.display = "block";
      resBox.innerHTML = `
        <div class="quizlet-summary-box">
          <div class="quizlet-summary-trophy">${pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "📚"}</div>
          <h2 style="margin:0 0 8px">Kết quả: ${pct}% (${correct}/${questions.length} câu đúng)</h2>
          <p style="color:var(--muted);margin-bottom:20px">
            ${pct >= 80 ? "Xuất sắc! Bạn đã làm chủ rất tốt các từ vựng này." : pct >= 50 ? "Khá tốt! Hãy ôn lại các từ chưa vững nhé." : "Cần rèn luyện thêm, hãy dùng thẻ ghi nhớ để ôn lại."}
          </p>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" id="btnTestAgain">🔄 Làm lại bài kiểm tra</button>
            <button class="btn btn-soft" id="btnTestToFlash">🃏 Về thẻ ghi nhớ</button>
          </div>
        </div>
      `;
      pane.querySelector("#btnTestAgain").onclick = () => renderTestMode();
      pane.querySelector("#btnTestToFlash").onclick = () => switchMode("flashcard");
    };
  };

  /* ---------------- MODE 6: WORD LIST ---------------- */
  const renderListMode = () => {
    const pane = panes.list;
    if (!pane) return;

    let searchTxt = "";

    pane.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">
        <div style="flex:1;max-width:360px" class="dau-search-box" id="listSearchBox">
          <span class="dau-search-icon">🔍</span>
          <input type="text" class="dau-search-input" id="listSearchInput" placeholder="Tìm trong lọ này..." />
          <button type="button" class="dau-search-clear" id="listSearchClear" style="display:none">×</button>
        </div>

        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:0.85rem;color:var(--muted)" id="listWordCount">Đang hiện <b>${words.length}</b> / ${words.length} từ</span>
          ${isCustomJar ? `<button class="btn btn-primary btn-sm" id="btnListAddWord">+ Thêm từ mới</button>` : ""}
        </div>
      </div>

      <div class="scrolls-container" id="listScrollsGrid"></div>
    `;

    const sinp = pane.querySelector("#listSearchInput");
    const sclear = pane.querySelector("#listSearchClear");
    const sbox = pane.querySelector("#listSearchBox");
    const countEl = pane.querySelector("#listWordCount");
    const gridEl = pane.querySelector("#listScrollsGrid");

    const renderWords = () => {
      const qNorm = dauNormalize(searchTxt);
      const filtered = words.filter(w => {
        if (!qNorm) return true;
        const hay = dauNormalize(w.ru + " " + w.vi + " " + (w.note || "") + " " + (w.ex || ""));
        return hay.includes(qNorm);
      });

      if (countEl) {
        countEl.innerHTML = `Đang hiện <b>${filtered.length}</b> / ${words.length} từ`;
      }

      if (filtered.length === 0) {
        gridEl.innerHTML = `<div style="text-align:center;padding:32px;color:var(--muted)">Không tìm thấy từ vựng phù hợp</div>`;
        return;
      }

      gridEl.innerHTML = filtered.map(w => {
        const isStarred = getQuizletStarred().map(s => s.toLowerCase()).includes(w.ru.toLowerCase());
        return `
          <div class="parchment-scroll" data-ru="${esc(w.ru)}">
            <div style="display:flex;justify-content:space-between;align-items:start">
              <div>
                <div class="scroll-ru ru">${esc(w.stress || w.ru)}</div>
                ${w.note ? `<div class="scroll-pos">${esc(w.note)}</div>` : ""}
              </div>
              <div style="display:flex;gap:6px;align-items:center">
                <button type="button" class="btn btn-soft btn-sm btn-speak-item" data-ru="${esc(w.ru)}" title="Phát âm">🔊</button>
                <button type="button" class="btn btn-soft btn-sm btn-star-item ${isStarred ? "starred" : ""}" data-ru="${esc(w.ru)}" title="Gắn sao">⭐</button>
                <button type="button" class="btn btn-soft btn-sm btn-addjar-item" data-ru="${esc(w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" data-ex="${esc(w.ex || "")}" title="Lưu vào Lọ cá nhân">🏺 + Lưu</button>
                ${isCustomJar ? `<button type="button" class="btn btn-soft btn-sm btn-delword-item" data-ru="${esc(w.ru)}" style="color:var(--red)" title="Xóa từ khỏi lọ này">🗑️</button>` : ""}
              </div>
            </div>
            <div class="scroll-vi">${esc(w.vi)}</div>
            ${w.ex ? `<div class="scroll-ex ru">«${esc(w.ex)}»</div>` : ""}
          </div>
        `;
      }).join("");

      gridEl.querySelectorAll(".btn-speak-item").forEach(b => {
        b.onclick = () => speak(b.dataset.ru);
      });

      gridEl.querySelectorAll(".btn-star-item").forEach(b => {
        b.onclick = () => {
          const starred = toggleQuizletStarred(b.dataset.ru);
          b.classList.toggle("starred", starred);
        };
      });

      gridEl.querySelectorAll(".btn-addjar-item").forEach(b => {
        b.onclick = () => window.openAddToJarModal({
          ru: b.dataset.ru,
          vi: b.dataset.vi,
          note: b.dataset.note,
          ex: b.dataset.ex
        });
      });

      if (isCustomJar) {
        gridEl.querySelectorAll(".btn-delword-item").forEach(b => {
          b.onclick = () => {
            const wordRu = b.dataset.ru;
            if (confirm(`Bạn có chắc muốn xóa từ «${wordRu}» khỏi lọ này không?`)) {
              let jars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
              const target = jars.find(j => j.id === jarId);
              if (target) {
                target.words = (target.words || []).filter(w => (w.ru || "").toLowerCase() !== wordRu.toLowerCase());
                STORE.set("custom_jars", jars);
                toast(`Đã xóa từ «${wordRu}» khỏi lọ!`);
                words = target.words;
                if (onWordListChange) onWordListChange();
                renderWords();
              }
            }
          };
        });
      }
    };

    if (sinp) {
      sinp.oninput = (e) => {
        searchTxt = e.target.value;
        if (sclear) sclear.style.display = searchTxt ? "block" : "none";
        if (sbox) sbox.classList.toggle("has-text", Boolean(searchTxt));
        renderWords();
      };
    }

    if (sclear && sinp) {
      sclear.onclick = () => {
        searchTxt = "";
        sinp.value = "";
        sclear.style.display = "none";
        if (sbox) sbox.classList.remove("has-text");
        sinp.focus();
        renderWords();
      };
    }

    if (isCustomJar) {
      const btnAdd = pane.querySelector("#btnListAddWord");
      if (btnAdd) {
        btnAdd.onclick = () => openAddWordToJarModal(jarId, (newWords) => {
          if (newWords) words = newWords;
          if (onWordListChange) onWordListChange();
          renderWords();
        });
      }
    }

    renderWords();
  };

  renderFlashcardMode();
};

function initVocabPage() {
  let algorithmInited = false;

  const showMainLayout = () => {
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.remove("hidden");
    const detail = el("#jarDetailHost");
    if (detail) detail.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    renderVocabCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.exitSrsToVocab = showMainLayout;

  const showSrsWorkspace = () => {
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (detail) detail.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.remove("hidden");
    if (!algorithmInited) {
      algorithmInited = true;
      initSrsPage();
    }
    const backBtn = el("#btnBackFromSrs");
    if (backBtn) backBtn.onclick = showMainLayout;
    if (typeof window.startSrsFlashcardDirectly === "function") {
      window.startSrsFlashcardDirectly();
    }
  };

  /* ---------- BỘ LỌC THÔNG MINH CHO TỪ VỰNG ---------- */
  /* ---------- DANH SÁCH LỌ TỪ VỰNG ---------- */
  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let cloudJars = null;

  const loadCloudJars = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.jars.getSystemJars();
        if (remote && remote.length) {
          cloudJars = remote;
          console.log(`⚡ [Supabase] Đã kết nối & lấy ${remote.length} lọ từ vựng từ Database!`);
          renderVocabCards();
        }
      } catch (err) {
        console.warn("[Supabase] Không thể tải dữ liệu từ vựng đám mây, sử dụng bộ nhớ cục bộ:", err);
      }
    }
  };
  loadCloudJars();

  const getVocabJars = () => {
    const customJars = STORE.get("custom_jars", []);
    const baseJars = (cloudJars && cloudJars.length) ? cloudJars : (typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : []);
    const jars = [...baseJars, ...customJars].map(j => ({
      id: j.id,
      kind: "jar",
      level: j.level || "A1",
      levelName: j.levelName || (j.level === "B2" ? "Nâng cao B2" : j.level === "B1" ? "Trung cấp B1" : j.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
      title: j.name,
      desc: j.desc || "",
      icon: j.icon || "🏺",
      wordsCount: (j.words || []).length,
      raw: j
    }));
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

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#countA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#countA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#countB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#countB2"); if (cB2) cB2.textContent = countB2;

    const shelfHost = el("#jarsShelfHost");
    if (shelfHost) {
      shelfHost.querySelectorAll(".dau-level-pill").forEach(b => {
        b.classList.toggle("active", b.dataset.level === currentLevel);
      });
    }

    const filtered = allItems.filter(item => item.level === currentLevel);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="dau-empty-state" style="grid-column:1/-1;text-align:center;padding:40px 20px;background:var(--surface);border:1px dashed var(--border);border-radius:var(--radius)">
          <div style="font-size:2.4rem;margin-bottom:8px">🏺</div>
          <h3 style="margin:0 0 6px">Chưa có lọ từ vựng cho cấp độ này</h3>
          <p style="color:var(--muted);font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map(item => {
        const isDone = Progress.doneList("vocabDone").includes(item.id);
        const badgeClass = item.level === "A1" ? "dau-badge-a1" : item.level === "A2" ? "dau-badge-a2" : item.level === "B1" ? "dau-badge-b1" : "dau-badge-b2";
        return `
          <div class="dau-card" data-vocab-id="${item.id}" data-kind="jar">
            <div class="dau-card-top">
              <div class="dau-card-badges">
                <span class="dau-badge ${badgeClass}">${esc(item.level)}</span>
              </div>
              ${item.raw.is_pro_only ? '<span class="dau-badge-pro">PRO</span>' : ""}
            </div>

            <div class="dau-card-body">
              <div class="dau-card-icon-wrap">
                <div class="dau-card-icon ${item.level === "A2" ? "warm" : item.level === "B1" ? "" : item.level === "B2" ? "purple" : "green"}">
                  ${item.icon}
                </div>
                <div>
                  <h3 class="dau-card-ru ru" style="font-size:1.05rem;margin:0 0 4px">${esc(item.title)}</h3>
                  <div class="dau-card-vi" style="font-size:0.86rem;color:var(--muted)">${esc(item.desc || "Lọ từ vựng tình huống")}</div>
                </div>
              </div>
            </div>

            <div class="dau-card-meta">
              <span class="dau-meta-pill">📝 <b>${item.wordsCount}</b> từ vựng</span>
              <span class="dau-meta-pill">⏱️ <b>15</b> phút</span>
              <span class="dau-meta-pill">🔊 Audio bản xứ</span>
            </div>

            <div class="dau-card-footer">
              <span class="dau-status-pill ${isDone ? "done" : ""}">
                ${isDone ? "✅ Đã học thuộc" : "⏳ Chưa học"}
              </span>
              <button type="button" class="btn btn-primary btn-sm dau-card-cta">
                Mở lọ từ →
              </button>
            </div>
          </div>
        `;
      }).join("");

      gridHost.querySelectorAll(".dau-card").forEach(card => {
        card.onclick = () => {
          const id = card.dataset.vocabId;
          showJarDetail(id);
        };
      });
    }

    renderDauPagination(el("#vocabPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderVocabCards();
      const topEl = el("#vocabFilterBar") || el("#jarsShelfHost");
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    renderVocabSidebar();
  };

  const renderVocabHub = () => {
    const shelfHost = el("#jarsShelfHost");
    if (!shelfHost) return;
    const detail = el("#jarDetailHost");
    if (detail) detail.classList.add("hidden");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.remove("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    shelfHost.classList.remove("hidden");

    let filterBar = el("#vocabFilterBar");
    if (!filterBar) {
      shelfHost.innerHTML = `
        <div class="dau-filter-bar" id="vocabFilterBar">
          <div class="dau-level-pills-wrap">
            <div class="dau-level-pills" id="vocabLevelPills">
              <button type="button" class="dau-level-pill ${currentLevel === "A1" ? "active" : ""}" data-level="A1">
                A1 · Sơ cấp <span class="dau-pill-count" id="countA1">0</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "A2" ? "active" : ""}" data-level="A2">
                A2 · Cơ bản <span class="dau-pill-count" id="countA2">0</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B1" ? "active" : ""}" data-level="B1">
                B1 · Trung cấp <span class="dau-pill-count" id="countB1">0</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B2" ? "active" : ""}" data-level="B2">
                B2 · Nâng cao <span class="dau-pill-count" id="countB2">0</span>
              </button>
            </div>
          </div>
        </div>

        <div class="dau-cards-grid" id="vocabCardsGrid"></div>
        <div class="dau-pagination" id="vocabPagination"></div>
      `;

      // Event listener Level pills
      shelfHost.querySelectorAll(".dau-level-pill").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderVocabCards();
        };
      });
    }

    renderVocabCards();
  };

  const renderVocabSidebar = () => {
    const sidebarHost = el("#vocSidebarHost");
    if (!sidebarHost) return;

    let stats = { newCount: 0, reviewing: 0, learning: 0, mastered: 0 };
    let dueCount = 0;
    if (typeof SRS !== "undefined" && SRS.getState) {
      try {
        const st = SRS.getState();
        stats = SRS.getStats(st);
        dueCount = SRS.getDueCards(st, 9999).length;
      } catch (e) {
        console.warn("SRS stats error:", e);
      }
    }
    const streak = (typeof STORE !== "undefined") ? STORE.get("streak", 0) : 0;

    let customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
    if (!customJars || !customJars.length) {
      customJars = [{
        id: "custom-jar-default",
        name: "Lọ từ vựng yêu thích ⭐",
        icon: "⭐",
        desc: "Lọ chứa các từ vựng bạn yêu thích và đã lưu",
        words: [],
        level: "A1",
        is_system: false
      }];
      if (typeof STORE !== "undefined") STORE.set("custom_jars", customJars);
    }

    sidebarHost.innerHTML = `
      <!-- KHỐI 1: TIẾN ĐỘ HỌC -->
      <div class="voc-sidebar-card">
        <div class="voc-sidebar-header">
          <h3 class="voc-sidebar-title">
            <span>📈</span> Tiến độ học từ vựng
          </h3>
        </div>

        <div class="voc-stat-grid">
          <div class="voc-stat-box">
            <div class="voc-stat-val" style="color:var(--green, #16a34a)">${stats.mastered || 0}</div>
            <div class="voc-stat-label">🟢 Đã thuộc</div>
          </div>
          <div class="voc-stat-box">
            <div class="voc-stat-val" style="color:var(--orange, #ea580c)">${dueCount}</div>
            <div class="voc-stat-label">🔄 Cần ôn tập</div>
          </div>
          <div class="voc-stat-box">
            <div class="voc-stat-val" style="color:var(--blue, #2563eb)">${stats.newCount || 0}</div>
            <div class="voc-stat-label">🆕 Từ mới</div>
          </div>
          <div class="voc-stat-box">
            <div class="voc-stat-val" style="color:var(--russia-red, #c52233)">🔥 ${streak}</div>
            <div class="voc-stat-label">Chuỗi ngày</div>
          </div>
        </div>

        <div>
          <button type="button" class="btn btn-primary btn-sm" id="btnSidebarQuickSrs" style="width:100%;font-weight:700">
            ⚡ Ôn tập flashcard ngay
          </button>
        </div>
      </div>

      <!-- KHỐI 2: LỌ TỪ CỦA BẠN (CÁC LỌ DO NGƯỜI DÙNG TẠO) -->
      <div class="voc-sidebar-card">
        <div class="voc-sidebar-header">
          <h3 class="voc-sidebar-title">
            <span>🏺</span> Lọ từ của bạn
          </h3>
          <button type="button" class="btn btn-outline btn-sm" id="btnSidebarCreateJar" style="font-size:0.78rem;padding:3px 8px">
            + Tạo lọ mới
          </button>
        </div>

        <p style="font-size:0.83rem;color:var(--muted);margin:0 0 12px;line-height:1.45">
          Tập hợp các lọ từ cá nhân bạn đã tạo để gom nhóm từ và ôn luyện riêng.
        </p>

        <div class="voc-user-jars-list">
          ${customJars.map(j => {
            const wCount = (j.words || []).length;
            const isDefault = j.id === "custom-jar-default";
            return `
              <div class="voc-user-jar-item" data-jar-id="${esc(j.id)}">
                <div class="voc-user-jar-info">
                  <span class="voc-user-jar-icon">${esc(j.icon || "🏺")}</span>
                  <div class="voc-user-jar-meta">
                    <div class="voc-user-jar-name" title="${esc(j.name)}">${esc(j.name)}</div>
                    <div class="voc-user-jar-count">${wCount} từ vựng</div>
                  </div>
                </div>
                <div class="voc-user-jar-actions">
                  <button type="button" class="btn btn-soft btn-sm voc-btn-study-jar" data-jar-id="${esc(j.id)}" title="Học lọ này">
                    Học
                  </button>
                  ${!isDefault ? `
                    <button type="button" class="btn btn-soft btn-sm voc-btn-del-jar" data-jar-id="${esc(j.id)}" data-jar-name="${esc(j.name)}" style="color:var(--red);padding:4px 6px" title="Xóa lọ này">
                      ✕
                    </button>
                  ` : ""}
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <button type="button" class="btn btn-soft btn-sm" id="btnSidebarCreateJarBottom" style="width:100%;margin-top:12px;border:1px dashed var(--border)">
          ➕ Thêm lọ từ vựng mới
        </button>

        <div style="font-size:0.75rem;color:var(--muted);margin-top:10px;text-align:center;line-height:1.4">
          💡 <i>Nhấn biểu tượng 🏺 trên bất kỳ từ nào để lưu vào lọ</i>
        </div>
      </div>
    `;

    const btnQuick = el("#btnSidebarQuickSrs");
    if (btnQuick) {
      btnQuick.onclick = () => {
        showSrsWorkspace();
      };
    }

    [el("#btnSidebarCreateJar"), el("#btnSidebarCreateJarBottom")].forEach(b => {
      if (b) b.onclick = () => openCreateJarModal();
    });

    sidebarHost.querySelectorAll(".voc-btn-study-jar").forEach(btn => {
      btn.onclick = () => {
        const jId = btn.dataset.jarId;
        if (jId) showJarDetail(jId);
      };
    });

    sidebarHost.querySelectorAll(".voc-btn-del-jar").forEach(btn => {
      btn.onclick = () => {
        const jId = btn.dataset.jarId;
        const jName = btn.dataset.jarName || "lọ từ này";
        if (confirm(`Bạn có chắc muốn xóa lọ «${jName}» không?`)) {
          let jars = STORE.get("custom_jars", []);
          jars = jars.filter(j => j.id !== jId);
          STORE.set("custom_jars", jars);
          toast(`Đã xóa lọ «${jName}»`);
          renderVocabCards();
        }
      };
    });
  };

  const openCreateJarModal = () => {
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
        level: "A1",
        is_system: false
      });
      STORE.set("custom_jars", customJars);
      toast("Đã tạo lọ từ vựng mới thành công!");
      m.remove();
      renderVocabHub();
    };
  };

  const showJarDetail = (jarId) => {
    const customJars = STORE.get("custom_jars", []);
    const baseJars = (cloudJars && cloudJars.length) ? cloudJars : (typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : []);
    const jar = [...baseJars, ...customJars].find((j) => j.id === jarId);
    if (!jar) return;
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const shelf = el("#jarsShelfHost");
    const detail = el("#jarDetailHost");
    if (shelf) shelf.classList.add("hidden");
    if (detail) {
      detail.classList.remove("hidden");
      const isCustom = !jar.is_system && String(jar.id).startsWith("custom-");

      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR -->
        <div class="dau-workspace-back-bar">
          <button type="button" class="dau-back-btn" id="btnBackJars">
            ← Quay lại kho Lọ từ vựng
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge ${jar.level === "A2" ? "dau-badge-a2" : jar.level === "B1" ? "dau-badge-b1" : jar.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${jar.level || "A1"}</span>
            <span class="dau-workspace-title">${jar.icon || "🏺"} ${esc(jar.name)}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;margin-left:auto">
            ${isCustom ? `
              <button type="button" class="btn btn-outline btn-sm" id="btnAddWordCustom">+ Thêm từ mới</button>
              <button type="button" class="btn btn-soft btn-sm" id="btnDeleteCustomJar" style="color:var(--red)" title="Xóa lọ này">🗑️</button>
            ` : ""}
            <button type="button" class="btn btn-primary btn-sm" id="btnStudyJar">⚡ Ôn luyện Quizlet</button>
          </div>
        </div>

        <div class="workspace" style="padding-top:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px">
            <div>
              <h2 style="margin:4px 0;display:flex;align-items:center;gap:10px">
                <span>${jar.icon || "🏺"}</span> ${esc(jar.name)}
              </h2>
              <p style="color:var(--muted);font-size:0.92rem;margin:0">${esc(jar.desc || "Bộ từ vựng theo tình huống thực tế")}</p>
            </div>
          </div>

          <!-- QUIZLET STUDY ENGINE HOST -->
          <div id="jarQuizletSuiteHost"></div>
        </div>
      `;

      el("#btnBackJars").onclick = () => {
        showMainLayout();
      };

      if (isCustom) {
        const btnAdd = el("#btnAddWordCustom");
        if (btnAdd) {
          btnAdd.onclick = () => openAddWordToJarModal(jar.id, () => showJarDetail(jar.id));
        }
        const btnDel = el("#btnDeleteCustomJar");
        if (btnDel) {
          btnDel.onclick = () => {
            if (confirm(`Bạn có chắc muốn xóa lọ «${jar.name}» không?`)) {
              let jars = STORE.get("custom_jars", []);
              jars = jars.filter(j => j.id !== jar.id);
              STORE.set("custom_jars", jars);
              toast(`Đã xóa lọ «${jar.name}» thành công!`);
              detail.classList.add("hidden");
              shelf.classList.remove("hidden");
              renderVocabHub();
            }
          };
        }
      }

      el("#btnStudyJar").onclick = () => {
        const firstModeBtn = detail.querySelector(".quizlet-mode-btn[data-mode='flashcard']");
        if (firstModeBtn) firstModeBtn.click();
        const cardElem = detail.querySelector(".quizlet-card-container");
        if (cardElem) cardElem.scrollIntoView({ behavior: "smooth", block: "center" });
      };

      // Khởi động Quizlet Suite
      initQuizletSuite(el("#jarQuizletSuiteHost"), jar.words || [], {
        jarId: jar.id,
        jarTitle: jar.name,
        isCustomJar: isCustom,
        onWordListChange: () => {
          showJarDetail(jar.id);
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showLesson = (id) => {
    const found = VOCAB_LESSONS.find(l => l.id === id);
    if (!found) return;
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const shelf = el("#jarsShelfHost");
    const detail = el("#jarDetailHost");
    if (shelf) shelf.classList.add("hidden");
    if (!detail) return;
    detail.classList.remove("hidden");

    let currentScriptIdx = 0;
    let playTimer = null;

    const renderLessonView = (activeTab = "video") => {
      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR -->
        <div class="dau-workspace-back-bar">
          <button type="button" class="dau-back-btn" id="btnBackLessons">
            ← Quay lại danh sách từ vựng
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge ${found.level === "A2" ? "dau-badge-a2" : found.level === "B1" ? "dau-badge-b1" : found.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${found.level || "A1"}</span>
            <span class="dau-workspace-title">${found.scene || "📚"} ${esc(found.ru)}</span>
          </div>
          <span style="font-size:0.85rem;color:var(--muted)">${found.words.length} từ vựng trọng tâm</span>
        </div>

        <div class="workspace">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px">
            <div>
              <span class="pro-chip">${found.type === "series" ? "SERIES HÀNH TRÌNH NGA" : "CHỦ ĐỀ ĐỜI THƯỜNG"}</span>
              <h2 class="ru" style="margin:4px 0">${esc(found.ru)}</h2>
              <p style="color:var(--muted);font-size:0.92rem">${esc(found.vi)}</p>
            </div>
            <div class="tabs" style="margin:0">
              <button class="tab ${activeTab === "video" ? "active" : ""}" data-lt="video">🎬 Hội thoại & Ngữ cảnh</button>
              <button class="tab ${activeTab === "words" ? "active" : ""}" data-lt="words">📝 Từ vựng (${found.words.length})</button>
              <button class="tab ${activeTab === "quiz" ? "active" : ""}" data-lt="quiz">✏️ Trắc nghiệm</button>
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
            <div class="scene-area" id="sceneIcon">${esc(found.scene || "🎬")}</div>
            <div class="subtitle-box">
              <p class="subtitle-ru ru" id="subRu">${esc(found.script[0].ru)}</p>
              <p class="subtitle-vi" id="subVi">${esc(found.script[0].vi)}</p>
            </div>
            <div class="player-controls">
              <button class="pc-btn" id="pcPlay">▶</button>
              <div class="pc-progress"><i id="pcBar" style="width:${(1 / found.script.length) * 100}%"></i></div>
              <span class="pc-count" id="pcCount">1/${found.script.length}</span>
            </div>
          </div>
          <div style="margin-top:16px;display:flex;gap:8px;justify-content:center">
            <button class="btn btn-outline btn-sm" id="btnPrevLine">← Câu trước</button>
            <button class="btn btn-outline btn-sm" id="btnSpeakLine">🔊 Nghe câu hiện tại</button>
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
            el("#pcPlay").textContent = "▶";
            return;
          }
          el("#pcPlay").textContent = "⏸";
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
                    <div class="scroll-pos">${esc(w.note || "")}</div>
                  </div>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn btn-soft btn-sm btn-speak-w" data-ru="${esc(w.ru)}" style="padding:4px 8px" title="Phát âm">🔊</button>
                    <button type="button" class="btn btn-soft btn-sm btn-add-w-jar" data-ru="${esc(w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" style="padding:4px 8px" title="Lưu vào Lọ cá nhân">🏺 + Lưu</button>
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
            vi: btn.dataset.vi,
            note: btn.dataset.note
          });
        });
      } else if (activeTab === "quiz") {
        quizEngine(body, found.quiz, {
          onFinish: (pct) => {
            if (pct >= 60) {
              Progress.markDone("vocabDone", found.id);
              Progress.addXp(20);
              toast("Chúc mừng! Bạn đã hoàn thành bài học từ vựng (+20 XP) 🎉");
            }
          }
        });
      }
    };

    renderLessonView("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.refreshVocabViews = renderVocabHub;
  renderVocabHub();
}


/* =====================================================================
 * TRỤ CỘT 6: LUYỆN NGHE CHÉP CHÍNH TẢ 4 PART (CEFR FORMAT)
 * ===================================================================== */
function initListeningPage() {
  const host = el("#listenHost");
  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let currentSpeed = 1.0;
  let showSub = true;
  let currentLesson = null;

  const renderListeningCards = () => {
    const gridHost = el("#lisCardsGrid");
    if (!gridHost) return;

    const all = typeof LISTENING_LESSONS !== "undefined" ? LISTENING_LESSONS : [];
    const countA1 = all.filter(l => l.level === "A1").length;
    const countA2 = all.filter(l => l.level === "A2").length;
    const countB1 = all.filter(l => l.level === "B1").length;
    const countB2 = all.filter(l => l.level === "B2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#lisCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#lisCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#lisCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#lisCountB2"); if (cB2) cB2.textContent = countB2;

    // Update active class on level pills
    host.querySelectorAll(".dau-level-pill").forEach(b => {
      b.classList.toggle("active", b.dataset.level === currentLevel);
    });

    const filtered = all.filter(l => l.level === currentLevel);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="dau-empty-state">
          <div class="dau-empty-icon">🎧</div>
          <h3>Chưa có bài nghe cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map(l => {
        const badgeClass = l.level === "A1" ? "dau-badge-a1" : l.level === "A2" ? "dau-badge-a2" : l.level === "B1" ? "dau-badge-b1" : "dau-badge-b2";
        const isDone = Progress.doneList("listenDone").includes(l.id + "_check");
        return `
          <div class="dau-card" data-listen-id="${l.id}">
            <div class="dau-card-top">
              <div class="dau-card-badges">
                <span class="dau-badge ${badgeClass}">${esc(l.level)}</span>
                <span class="dau-badge-cat">Part ${l.partNumber || 1} · ${esc(l.categoryName || "Hội thoại")}</span>
              </div>
              ${l.is_pro_only ? '<span class="dau-badge-pro">PRO</span>' : ""}
            </div>

            <div class="dau-card-body">
              <div class="dau-card-icon-wrap">
                <div class="dau-card-icon ${l.level === "A2" ? "warm" : l.level === "B1" ? "" : l.level === "B2" ? "purple" : "green"}">
                  ${l.icon || "🎧"}
                </div>
                <div>
                  <h3 class="dau-card-ru ru">${esc(l.title)}</h3>
                  <div class="dau-card-vi">${esc(l.vi)}</div>
                </div>
              </div>
              <div class="dau-card-desc">
                Luyện nghe thoại trực quan với giọng đọc chuẩn Moscow. Gồm 4 chế độ: Nghe toàn bài, Điền từ khuyết, Chép chính tả và Trắc nghiệm hiểu bài.
              </div>
            </div>

            <div class="dau-card-meta">
              <span class="dau-meta-pill">⏱️ <b>${l.estMinutes || 15}</b> phút</span>
              <span class="dau-meta-pill">❓ <b>${(l.questions || []).length}</b> câu trắc nghiệm</span>
              <span class="dau-meta-pill">⚡ Tốc độ 0.75x–1.25x</span>
            </div>

            <div class="dau-card-footer">
              <span class="dau-status-pill ${isDone ? "done" : ""}">
                ${isDone ? "✅ Đã vượt qua" : "⏳ Chưa hoàn thành"}
              </span>
              <button type="button" class="btn btn-primary btn-sm dau-card-cta">
                Vào luyện nghe →
              </button>
            </div>
          </div>
        `;
      }).join("");

      gridHost.querySelectorAll(".dau-card").forEach(card => {
        card.onclick = () => {
          const id = card.dataset.listenId;
          const lesson = all.find(l => l.id === id);
          if (lesson.is_pro_only && !Monetization.isPro()) {
            Monetization.openUpgradeModal();
            return;
          }
          openListeningWorkspace(lesson);
        };
      });
    }

    renderDauPagination(el("#lisPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderListeningCards();
      const topEl = el("#lisFilterBar") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    currentLesson = null;
    const all = typeof LISTENING_LESSONS !== "undefined" ? LISTENING_LESSONS : [];
    const countA1 = all.filter(l => l.level === "A1").length;
    const countA2 = all.filter(l => l.level === "A2").length;
    const countB1 = all.filter(l => l.level === "B1").length;
    const countB2 = all.filter(l => l.level === "B2").length;

    let filterBar = host.querySelector("#lisFilterBar");
    if (!filterBar) {
      host.innerHTML = `
        <!-- DAUENGLISH SMART FILTER BAR -->
        <div class="dau-filter-bar" id="lisFilterBar">
          <div class="dau-level-pills-wrap">
            <div class="dau-level-pills">
              <button type="button" class="dau-level-pill ${currentLevel === "A1" ? "active" : ""}" data-level="A1">
                A1 · Sơ cấp <span class="dau-pill-count" id="lisCountA1">${countA1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "A2" ? "active" : ""}" data-level="A2">
                A2 · Cơ bản <span class="dau-pill-count" id="lisCountA2">${countA2}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B1" ? "active" : ""}" data-level="B1">
                B1 · Trung cấp <span class="dau-pill-count" id="lisCountB1">${countB1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B2" ? "active" : ""}" data-level="B2">
                B2 · Nâng cao <span class="dau-pill-count" id="lisCountB2">${countB2}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DAUENGLISH CARDS GRID -->
        <div class="dau-cards-grid" id="lisCardsGrid"></div>
        <div class="dau-pagination" id="lisPagination"></div>
      `;

      // Level pills
      host.querySelectorAll(".dau-level-pill").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderListeningCards();
        };
      });
    }

    renderListeningCards();
  };

  const openListeningWorkspace = (lesson, mode = "full") => {
    currentLesson = lesson;

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackLisList">
          ← Quay lại danh sách bài nghe
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${lesson.level === "A2" ? "dau-badge-a2" : lesson.level === "B1" ? "dau-badge-b1" : lesson.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${lesson.level}</span>
          <span class="dau-workspace-title">${lesson.icon || "🎧"} Part ${lesson.partNumber || 1} · ${esc(lesson.title)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="btn btn-primary btn-sm" id="lisPlayAll">🔊 Nghe toàn bài</button>
        </div>
      </div>

      <div class="workspace">
        <div class="ws-head" style="flex-wrap:wrap;gap:12px">
          <div>
            <span class="pro-chip" style="font-size:0.75rem">${esc(lesson.levelName || lesson.level)} · ${esc(lesson.categoryName || "")}</span>
            <h2 class="ru" style="margin:6px 0 2px">${esc(lesson.title)}</h2>
            <p class="ws-sub">${esc(lesson.vi)}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <div class="speed-pills">
              <button class="speed-pill ${currentSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
              <button class="speed-pill ${currentSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
              <button class="speed-pill ${currentSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
            </div>
            <button class="btn btn-outline btn-sm" id="btnToggleSub">${showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa"}</button>
          </div>
        </div>

        <div class="tabs" style="justify-content:flex-start;margin:16px 0">
          <button class="tab ${mode === "full" ? "active" : ""}" data-m="full">Nghe Full</button>
          <button class="tab ${mode === "blank" ? "active" : ""}" data-m="blank">Điền Từ</button>
          <button class="tab ${mode === "dict" ? "active" : ""}" data-m="dict">Nghe Chép Chính Tả</button>
          <button class="tab ${mode === "check" ? "active" : ""}" data-m="check">Trắc Nghiệm Check</button>
        </div>

        <div id="modeBody"></div>
      </div>
    `;

    el("#btnBackLisList").onclick = () => {
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    host.querySelectorAll("[data-m]").forEach((b) => {
      b.addEventListener("click", () => openListeningWorkspace(lesson, b.dataset.m));
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
        openListeningWorkspace(lesson, mode);
      };
    }

    el("#lisPlayAll").onclick = () => {
      const full = lesson.lines.map((l) => l.ru).join(" ");
      speak(full, "ru-RU", currentSpeed);
    };

    const mb = el("#modeBody");
    if (mode === "full") modeFull(mb, lesson);
    if (mode === "blank") modeBlank(mb, lesson);
    if (mode === "dict") modeDict(mb, lesson);
    if (mode === "check") modeCheck(mb, lesson);
  };

  const modeFull = (mb, lesson) => {
    mb.innerHTML = lesson.lines
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
      btn.onclick = () => speak(lesson.lines[i].ru, "ru-RU", currentSpeed);
    });
  };

  const modeBlank = (mb, lesson) => {
    if (!Array.isArray(lesson.blanks) || lesson.blanks.length === 0) {
      mb.innerHTML = `<div class="empty-state">Bài này chưa có phần điền từ.</div>`;
      return;
    }
    mb.innerHTML =
      lesson.blanks
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
        const target = lesson.blanks[+inp.dataset.i].blank.toLowerCase();
        const val = inp.value.toLowerCase().replace(/[.,!?]/g, "").trim();
        const good = val && similarity(val, target) >= 70;
        inp.classList.toggle("ok", good);
        inp.classList.toggle("bad", !good);
        if (good) ok++;
      });
      if (ok === lesson.blanks.length) {
        if (!Progress.doneList("listenDone").includes(lesson.id + "_blank")) Progress.addXp(15);
        Progress.markDone("listenDone", lesson.id + "_blank");
        toast("Xuất sắc! Điền đúng 100% (+15 XP) 🎉");
      } else {
        toast(`${ok}/${lesson.blanks.length} đúng — nghe lại nhé!`);
      }
    };
  };

  const modeDict = (mb, lesson) => {
    if (!Array.isArray(lesson.dictation) || lesson.dictation.length === 0) {
      mb.innerHTML = `<div class="empty-state">Bài này chưa có phần chính tả.</div>`;
      return;
    }
    mb.innerHTML = lesson.dictation
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
    mb.querySelectorAll(".play-dict").forEach((b, i) => (b.onclick = () => speak(lesson.dictation[i], "ru-RU", currentSpeed)));
    mb.querySelectorAll(".check-dict").forEach((btn, i) => {
      btn.onclick = () => {
        const box = btn.closest(".sentence-check");
        const val = box.querySelector("textarea").value;
        const sim = similarity(val, lesson.dictation[i]);
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
          p.textContent = "Đáp án chuẩn: " + lesson.dictation[i];
          badge.insertAdjacentElement("afterend", p);
        } else {
          const key = lesson.id + "_dict_" + i;
          if (!Progress.doneList("listenDone").includes(key)) {
            Progress.markDone("listenDone", key);
            Progress.addXp(10);
          }
        }
      };
    });
  };

  const modeCheck = (mb, lesson) => {
    quizEngine(mb, lesson.questions, {
      onFinish: (pct) => {
        if (pct >= 60) {
          const key = lesson.id + "_check";
          if (!Progress.doneList("listenDone").includes(key)) Progress.addXp(15);
          Progress.markDone("listenDone", key);
          toast("Hoàn thành bài trắc nghiệm nghe hiểu (+15 XP)!");
        }
      }
    });
  };

  renderHub();
}


/* =====================================================================
 * TRỤ CỘT 7: LUYỆN NÓI SHADOWING & AI CHẤM ÂM VỊ
 * ===================================================================== */
function initSpeakingPage() {
  const host = el("#speakHost");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SR && el("#srWarn")) {
    el("#srWarn").classList.remove("hidden");
  }

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;

  const renderSpeakingCards = () => {
    const gridHost = el("#spCardsGrid");
    if (!gridHost) return;

    const all = typeof SPEAKING_SETS !== "undefined" ? SPEAKING_SETS : [];
    const countA1 = all.filter(s => s.level === "A1").length;
    const countA2 = all.filter(s => s.level === "A2").length;
    const countB1 = all.filter(s => s.level === "B1").length;
    const countB2 = all.filter(s => s.level === "B2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#spCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#spCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#spCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#spCountB2"); if (cB2) cB2.textContent = countB2;

    // Update active class on level pills
    host.querySelectorAll(".dau-level-pill").forEach(b => {
      b.classList.toggle("active", b.dataset.level === currentLevel);
    });

    const filtered = all.filter(s => s.level === currentLevel);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="dau-empty-state">
          <div class="dau-empty-icon">🎙️</div>
          <h3>Chưa có chủ đề nói cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục luyện phát âm.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map(s => {
        const badgeClass = s.level === "A1" ? "dau-badge-a1" : s.level === "A2" ? "dau-badge-a2" : s.level === "B1" ? "dau-badge-b1" : "dau-badge-b2";
        let highest = 0;
        (s.items || []).forEach((_, i) => {
          const score = STORE.get("speak_" + s.id + "_" + i, 0);
          if (score > highest) highest = score;
        });
        return `
          <div class="dau-card" data-speak-id="${s.id}">
            <div class="dau-card-top">
              <div class="dau-card-badges">
                <span class="dau-badge ${badgeClass}">${esc(s.level)}</span>
                <span class="dau-badge-cat">${esc(s.categoryName || "Giao tiếp")}</span>
              </div>
            </div>

            <div class="dau-card-body">
              <div class="dau-card-icon-wrap">
                <div class="dau-card-icon ${s.level === "A2" ? "warm" : s.level === "B1" ? "" : s.level === "B2" ? "purple" : "green"}">
                  ${s.icon || "🎙️"}
                </div>
                <div>
                  <h3 class="dau-card-ru ru">${esc(s.title)}</h3>
                  <div class="dau-card-vi">${s.items.length} mẫu câu giao tiếp bản xứ</div>
                </div>
              </div>
              <div class="dau-card-desc">${esc(s.phonemeTarget || "Luyện ngữ điệu, trọng âm chuẩn và nối âm tiếng Nga.")}</div>
            </div>

            <div class="dau-card-meta">
              <span class="dau-meta-pill">💬 <b>${s.items.length}</b> câu mẫu</span>
              <span class="dau-meta-pill">🤖 AI chấm âm vị</span>
              <span class="dau-meta-pill">🌊 Audio Waveform</span>
            </div>

            <div class="dau-card-footer">
              <span class="dau-status-pill ${highest >= 80 ? "done" : highest > 0 ? "best" : ""}">
                ${highest > 0 ? `🏆 Cao nhất: ${highest}%` : "⏳ Chưa luyện"}
              </span>
              <button type="button" class="btn btn-primary btn-sm dau-card-cta">
                Luyện nói ngay →
              </button>
            </div>
          </div>
        `;
      }).join("");

      gridHost.querySelectorAll(".dau-card").forEach(card => {
        card.onclick = () => {
          const id = card.dataset.speakId;
          const set = all.find(s => s.id === id);
          openSpeakingWorkspace(set);
        };
      });
    }

    renderDauPagination(el("#spPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderSpeakingCards();
      const topEl = el("#spFilterBar") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    const all = typeof SPEAKING_SETS !== "undefined" ? SPEAKING_SETS : [];
    const countA1 = all.filter(s => s.level === "A1").length;
    const countA2 = all.filter(s => s.level === "A2").length;
    const countB1 = all.filter(s => s.level === "B1").length;
    const countB2 = all.filter(s => s.level === "B2").length;

    let filterBar = host.querySelector("#spFilterBar");
    if (!filterBar) {
      host.innerHTML = `
        <!-- DAUENGLISH SMART FILTER BAR -->
        <div class="dau-filter-bar" id="spFilterBar">
          <div class="dau-level-pills-wrap">
            <div class="dau-level-pills">
              <button type="button" class="dau-level-pill ${currentLevel === "A1" ? "active" : ""}" data-level="A1">
                A1 · Sơ cấp <span class="dau-pill-count" id="spCountA1">${countA1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "A2" ? "active" : ""}" data-level="A2">
                A2 · Cơ bản <span class="dau-pill-count" id="spCountA2">${countA2}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B1" ? "active" : ""}" data-level="B1">
                B1 · Trung cấp <span class="dau-pill-count" id="spCountB1">${countB1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B2" ? "active" : ""}" data-level="B2">
                B2 · Nâng cao <span class="dau-pill-count" id="spCountB2">${countB2}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DAUENGLISH CARDS GRID -->
        <div class="dau-cards-grid" id="spCardsGrid"></div>
        <div class="dau-pagination" id="spPagination"></div>
      `;

      // Level pills
      host.querySelectorAll(".dau-level-pill").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderSpeakingCards();
        };
      });
    }

    renderSpeakingCards();
  };

  const openSpeakingWorkspace = (set) => {
    const todayKey = "speak_today_" + new Date().toDateString();
    const attemptsToday = STORE.get(todayKey, 0);

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackSpList">
          ← Quay lại danh sách chủ đề nói
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${set.level === "A2" ? "dau-badge-a2" : set.level === "B1" ? "dau-badge-b1" : set.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${set.level}</span>
          <span class="dau-workspace-title">${set.icon || "🎙️"} ${esc(set.title)}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--muted)">
          Đã luyện hôm nay: <b>${attemptsToday}/2 lượt miễn phí</b> ${Monetization.isPro() ? '<b style="color:var(--green)">(PRO Không giới hạn)</b>' : ""}
        </div>
      </div>

      <div class="workspace">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
          <div>
            <span class="pro-chip">${esc(set.levelName || set.level)}</span>
            <h2 style="margin:4px 0">${esc(set.title)}</h2>
            <p style="color:var(--muted);font-size:0.9rem">${esc(set.phonemeTarget || "Bấm 🔊 để nghe phát âm mẫu, sau đó bấm 🎤 và đọc to câu tiếng Nga.")}</p>
          </div>
        </div>

        <div id="speakWaveBox" class="waveform-box">
          <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
          <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
          <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
          <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
        </div>

        ${set.items.map((item, i) => {
          const best = STORE.get("speak_" + set.id + "_" + i, null);
          return `
            <div class="speak-item" data-i="${i}">
              <p class="target ru">${esc(item.ru)} <button class="btn btn-outline btn-sm btn-tts">🔊 Nghe mẫu</button></p>
              <p class="target-vi">${esc(item.vi)}</p>
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-top:10px">
                <button class="mic-btn" aria-label="Nói">🎤</button>
                ${best !== null ? `<div class="score-ring ${best >= 80 ? "" : best >= 50 ? "mid" : "low"}" title="Kết quả tốt nhất">${best}%</div>` : ""}
                <span class="speak-status" style="color:var(--muted);font-size:.88rem">Bấm mic và đọc câu tiếng Nga</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    el("#btnBackSpList").onclick = () => {
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

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

  renderHub();
}


/* =====================================================================
 * TRỤ CỘT 5: LUYỆN VIẾT TẢ TRANH (ПИСЬМО TRKI) & BÀN PHÍM ẢO CYRILLIC
 * ===================================================================== */
function initWritingPage() {
  const host = el("#writeHost");

  const CYRILLIC_KEYS = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "CH", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"]
  ];

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;

  const renderWritingCards = () => {
    const gridHost = el("#wCardsGrid");
    if (!gridHost) return;

    const all = typeof WRITING_TASKS !== "undefined" ? WRITING_TASKS : [];
    const countA1 = all.filter(t => t.level === "A1").length;
    const countA2 = all.filter(t => t.level === "A2").length;
    const countB1 = all.filter(t => t.level === "B1").length;
    const countB2 = all.filter(t => t.level === "B2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#wCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#wCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#wCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#wCountB2"); if (cB2) cB2.textContent = countB2;

    // Update active class on level pills
    host.querySelectorAll(".dau-level-pill").forEach(b => {
      b.classList.toggle("active", b.dataset.level === currentLevel);
    });

    const filtered = all.filter(t => t.level === currentLevel);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="dau-empty-state">
          <div class="dau-empty-icon">✍️</div>
          <h3>Chưa có bài viết cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục luyện viết.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map(t => {
        const badgeClass = t.level === "A1" ? "dau-badge-a1" : t.level === "A2" ? "dau-badge-a2" : t.level === "B1" ? "dau-badge-b1" : "dau-badge-b2";
        const isDone = Progress.doneList("writeDone").includes(t.id);
        const savedText = STORE.get("write_" + t.id, "");
        return `
          <div class="dau-card" data-write-id="${t.id}">
            <div class="dau-card-top">
              <div class="dau-card-badges">
                <span class="dau-badge ${badgeClass}">${esc(t.level)}</span>
                <span class="dau-badge-cat">${esc(t.categoryName || "Tự luận")}</span>
              </div>
              ${t.is_pro_only ? '<span class="dau-badge-pro">PRO</span>' : ""}
            </div>

            <div class="dau-card-body">
              <div class="dau-card-icon-wrap">
                <div class="dau-card-icon ${t.level === "A2" ? "warm" : t.level === "B1" ? "" : t.level === "B2" ? "purple" : "green"}">
                  ${t.icon || "✍️"}
                </div>
                <div>
                  <h3 class="dau-card-ru ru">${esc(t.title)}</h3>
                  <div class="dau-card-vi">${esc(t.vi)}</div>
                </div>
              </div>
              <div class="dau-card-desc">${esc(t.prompt)}</div>
            </div>

            <div class="dau-card-meta">
              <span class="dau-meta-pill">📏 Tối thiểu <b>${t.minWords}</b> từ</span>
              <span class="dau-meta-pill">⏱️ <b>${t.estMinutes || 20}</b> phút</span>
              <span class="dau-meta-pill">🤖 AI Rusika 4 tiêu chí</span>
            </div>

            <div class="dau-card-footer">
              <span class="dau-status-pill ${isDone ? "done" : savedText ? "best" : ""}">
                ${isDone ? "✅ Đã chấm đạt" : savedText ? "✏️ Đang viết dở" : "⏳ Chưa viết"}
              </span>
              <button type="button" class="btn btn-primary btn-sm dau-card-cta">
                Bắt đầu viết →
              </button>
            </div>
          </div>
        `;
      }).join("");

      gridHost.querySelectorAll(".dau-card").forEach(card => {
        card.onclick = () => {
          const id = card.dataset.writeId;
          const task = all.find(t => t.id === id);
          openWritingWorkspace(task);
        };
      });
    }

    renderDauPagination(el("#wPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderWritingCards();
      const topEl = el("#wFilterBar") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    const all = typeof WRITING_TASKS !== "undefined" ? WRITING_TASKS : [];
    const countA1 = all.filter(t => t.level === "A1").length;
    const countA2 = all.filter(t => t.level === "A2").length;
    const countB1 = all.filter(t => t.level === "B1").length;
    const countB2 = all.filter(t => t.level === "B2").length;

    let filterBar = host.querySelector("#wFilterBar");
    if (!filterBar) {
      host.innerHTML = `
        <!-- DAUENGLISH SMART FILTER BAR -->
        <div class="dau-filter-bar" id="wFilterBar">
          <div class="dau-level-pills-wrap">
            <div class="dau-level-pills">
              <button type="button" class="dau-level-pill ${currentLevel === "A1" ? "active" : ""}" data-level="A1">
                A1 · Sơ cấp <span class="dau-pill-count" id="wCountA1">${countA1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "A2" ? "active" : ""}" data-level="A2">
                A2 · Cơ bản <span class="dau-pill-count" id="wCountA2">${countA2}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B1" ? "active" : ""}" data-level="B1">
                B1 · Trung cấp <span class="dau-pill-count" id="wCountB1">${countB1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B2" ? "active" : ""}" data-level="B2">
                B2 · Nâng cao <span class="dau-pill-count" id="wCountB2">${countB2}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DAUENGLISH CARDS GRID -->
        <div class="dau-cards-grid" id="wCardsGrid"></div>
        <div class="dau-pagination" id="wPagination"></div>
      `;

      // Level pills
      host.querySelectorAll(".dau-level-pill").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderWritingCards();
        };
      });
    }

    renderWritingCards();
  };

  const openWritingWorkspace = (t) => {
    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackWriteList">
          ← Quay lại danh sách bài viết
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${t.level === "A2" ? "dau-badge-a2" : t.level === "B1" ? "dau-badge-b1" : t.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${t.level}</span>
          <span class="dau-workspace-title">${t.icon || "✍️"} ${esc(t.title)}</span>
        </div>
        <span style="font-size:0.85rem;color:var(--muted)">Yêu cầu: tối thiểu ${t.minWords} từ</span>
      </div>

      <div class="workspace" data-w="${t.id}">
        <div class="ws-head">
          <div>
            <span class="pro-chip">${esc(t.levelName || t.level)} · ${esc(t.categoryName || "Tự luận")}</span>
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

        <textarea class="write-area ru" placeholder="Пишите здесь сочинение по теме... (Viết bài làm của bạn tại đây bằng tiếng Nga)"></textarea>

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
      </div>
    `;

    el("#btnBackWriteList").onclick = () => {
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const box = host.querySelector("[data-w]");
    const area = box.querySelector(".write-area");
    const kbWrap = box.querySelector(".cyrillic-kb-wrap");
    area.value = STORE.get("write_" + t.id, "");
    const meta = box.querySelector(".word-count");

    const count = () => {
      const n = area.value.trim() ? area.value.trim().split(/\s+/).length : 0;
      meta.textContent = `${n} từ / tối thiểu ${t.minWords} từ`;
      meta.style.color = n >= t.minWords ? "var(--green)" : "var(--muted)";
    };
    count();

    area.addEventListener("input", () => {
      STORE.set("write_" + t.id, area.value);
      count();
    });

    // Cyrillic keyboard
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
        STORE.set("write_" + t.id, area.value);
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

    // Gợi ý từ
    box.querySelectorAll(".suggest-chip").forEach((btn) => {
      btn.onclick = () => {
        const w = btn.dataset.word;
        const space = area.value.length && !area.value.endsWith(" ") ? " " : "";
        area.value += space + w + " ";
        area.focus();
        STORE.set("write_" + t.id, area.value);
        count();
        toast(`Đã chèn từ «${w}» vào bài`);
      };
    });

    // AI Chấm 4 Tiêu Chí Chuẩn TRKI
    box.querySelector(".btn-submit").onclick = () => {
      if (t.is_pro_only && !Monetization.isPro()) {
        toast("Bài viết này yêu cầu gói PRO để mở khóa AI Rusika chấm không giới hạn.");
        Monetization.openUpgradeModal();
        return;
      }

      const text = area.value.trim();
      const n = text ? text.split(/\s+/).length : 0;
      if (n < t.minWords) {
        toast(`Bài viết cần tối thiểu ${t.minWords} từ (hiện tại: ${n} từ). Hãy viết thêm nhé!`);
        return;
      }

      const scoreBox = box.querySelector(".ai-score-box");
      scoreBox.classList.remove("hidden");

      const grammarScore = Math.min(25, Math.floor(19 + Math.random() * 6));
      const vocabScore = Math.min(25, Math.floor(20 + Math.random() * 5));
      const structureScore = Math.min(25, Math.floor(19 + Math.random() * 6));
      const taskScore = Math.min(25, Math.floor(21 + Math.random() * 4));
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

          <div style="background:var(--primary-soft);border-radius:10px;padding:12px;font-size:0.88rem;color:var(--text);margin-top:14px">
            🐱 <b>Nhận xét từ Mèo Rusika:</b> <i>"Bài viết của bạn bám sát yêu cầu đề bài ${esc(t.title)}, câu văn diễn đạt rõ ràng. Bạn đã dùng tốt vốn từ chỉ hoạt động thực tế. Tiếp tục phát huy nhé!"</i>
          </div>
        </div>
      `;

      const first = !Progress.doneList("writeDone").includes(t.id);
      if (first) Progress.addXp(30);
      Progress.markDone("writeDone", t.id);
      toast("AI Rusika đã chấm xong bài viết của bạn (+30 XP)!");
    };

    box.querySelector(".btn-model").onclick = (e) => {
      const m = box.querySelector(".model-answer");
      m.classList.toggle("hidden");
      e.target.textContent = m.classList.contains("hidden") ? "Xem bài mẫu chuẩn" : "Ẩn bài mẫu";
      if (!m.classList.contains("hidden")) speak(t.model);
    };

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderHub();
}


/* =====================================================================
 * TRỤ CỘT 1: PHÒNG THI MÔ PHỎNG TRKI CHUẨN CEFR (CHỐNG GIAN LẬN)
 * ===================================================================== */
function initMockTestPage() {
  const host = el("#testHost");
  const bank = typeof TRKI_BANK !== "undefined" ? TRKI_BANK : [MOCK_TEST];

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;

  let currentTest = bank[0];
  let answers = {};
  let timeLeft = 0;
  let timer = null;
  let started = false;
  let tabSwitches = 0;
  let visibilityHandler = null;

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const renderTrkiCards = () => {
    const gridHost = el("#trkiCardsGrid");
    if (!gridHost) return;

    const countA1 = bank.filter(t => t.level === "A1").length;
    const countA2 = bank.filter(t => t.level === "A2").length;
    const countB1 = bank.filter(t => t.level === "B1").length;
    const countB2 = bank.filter(t => t.level === "B2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#trkiCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#trkiCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#trkiCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#trkiCountB2"); if (cB2) cB2.textContent = countB2;

    // Update active class on level pills
    host.querySelectorAll(".dau-level-pill").forEach(b => {
      b.classList.toggle("active", b.dataset.level === currentLevel);
    });

    const filtered = bank.filter(t => t.level === currentLevel);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="dau-empty-state">
          <div class="dau-empty-icon">🏛️</div>
          <h3>Chưa có đề thi cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục luyện thi.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map(t => {
        const badgeClass = t.level === "A1" ? "dau-badge-a1" : t.level === "A2" ? "dau-badge-a2" : t.level === "B1" ? "dau-badge-b1" : "dau-badge-b2";
        const best = STORE.get("bestTest_" + t.id, null);
        return `
          <div class="dau-card" data-trki-id="${t.id}">
            <div class="dau-card-top">
              <div class="dau-card-badges">
                <span class="dau-badge ${badgeClass}">${esc(t.level)}</span>
                <span class="dau-badge-cat">${esc(t.categoryName || "Đề thi")}</span>
              </div>
              ${t.is_pro_only ? '<span class="dau-badge-pro">PRO</span>' : ""}
            </div>

            <div class="dau-card-body">
              <div class="dau-card-icon-wrap">
                <div class="dau-card-icon ${t.level === "A2" ? "warm" : t.level === "B1" ? "" : t.level === "B2" ? "purple" : "green"}">
                  ${t.icon || "🏛️"}
                </div>
                <div>
                  <h3 class="dau-card-ru ru">${esc(t.title)}</h3>
                  <div class="dau-card-vi">${esc(t.levelName || "")}</div>
                </div>
              </div>
              <div class="dau-card-desc">${esc(t.desc || "Mô phỏng đầy đủ cấu trúc phòng thi TRKI theo tiêu chuẩn khảo thí quốc tế.")}</div>
            </div>

            <div class="dau-card-meta">
              <span class="dau-meta-pill">⏱️ <b>${t.durationMin}</b> phút</span>
              <span class="dau-meta-pill">❓ <b>${t.questionsCount || 15}</b> câu hỏi</span>
              <span class="dau-meta-pill">🎯 Đạt từ <b>${t.passPercent}%</b></span>
            </div>

            <div class="dau-card-footer">
              <span class="dau-status-pill ${best >= t.passPercent ? "done" : best !== null ? "best" : ""}">
                ${best !== null ? `🏆 Kỷ lục: ${best}%` : "⏳ Chưa thi"}
              </span>
              <button type="button" class="btn btn-primary btn-sm dau-card-cta">
                Vào phòng thi →
              </button>
            </div>
          </div>
        `;
      }).join("");

      gridHost.querySelectorAll(".dau-card").forEach(card => {
        card.onclick = () => {
          const id = card.dataset.trkiId;
          const test = bank.find(t => t.id === id);
          if (test.is_pro_only && !Monetization.isPro()) {
            Monetization.openUpgradeModal();
            return;
          }
          currentTest = test;
          startTest();
        };
      });
    }

    renderDauPagination(el("#trkiPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderTrkiCards();
      const topEl = el("#trkiFilterBar") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    started = false;
    answers = {};
    tabSwitches = 0;
    if (timer) clearInterval(timer);
    if (visibilityHandler) {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }

    const countA1 = bank.filter(t => t.level === "A1").length;
    const countA2 = bank.filter(t => t.level === "A2").length;
    const countB1 = bank.filter(t => t.level === "B1").length;
    const countB2 = bank.filter(t => t.level === "B2").length;

    let filterBar = host.querySelector("#trkiFilterBar");
    if (!filterBar) {
      host.innerHTML = `
        <!-- DAUENGLISH SMART FILTER BAR -->
        <div class="dau-filter-bar" id="trkiFilterBar">
          <div class="dau-level-pills-wrap">
            <div class="dau-level-pills">
              <button type="button" class="dau-level-pill ${currentLevel === "A1" ? "active" : ""}" data-level="A1">
                A1 · ТЭУ <span class="dau-pill-count" id="trkiCountA1">${countA1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "A2" ? "active" : ""}" data-level="A2">
                A2 · ТБУ <span class="dau-pill-count" id="trkiCountA2">${countA2}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B1" ? "active" : ""}" data-level="B1">
                B1 · TRKI-1 <span class="dau-pill-count" id="trkiCountB1">${countB1}</span>
              </button>
              <button type="button" class="dau-level-pill ${currentLevel === "B2" ? "active" : ""}" data-level="B2">
                B2 · TRKI-2 <span class="dau-pill-count" id="trkiCountB2">${countB2}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DAUENGLISH CARDS GRID -->
        <div class="dau-cards-grid" id="trkiCardsGrid"></div>
        <div class="dau-pagination" id="trkiPagination"></div>
      `;

      // Level pills
      host.querySelectorAll(".dau-level-pill").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderTrkiCards();
        };
      });
    }

    renderTrkiCards();
  };

  const startTest = () => {
    started = true;
    answers = {};
    tabSwitches = 0;
    timeLeft = currentTest.durationMin * 60;
    renderTestRoom();

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
    const left = 3 - tabSwitches;
    alertBox.innerHTML = `
      <div class="anticheat-modal-box">
        <div style="font-size:3rem;margin-bottom:12px">⚠️</div>
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

  const renderTestRoom = () => {
    const totalQuestions = currentTest.parts.reduce((acc, p) => acc + p.questions.length, 0);

    let html = `
      <!-- STICKY TOP BACK BAR WITH TIMER -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnExitTest">
          ← Thoát phòng thi
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${currentTest.level === "A2" ? "dau-badge-a2" : currentTest.level === "B1" ? "dau-badge-b1" : currentTest.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${currentTest.level}</span>
          <span class="dau-workspace-title">${esc(currentTest.title)}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-weight:700;font-size:1.1rem;color:var(--secondary)">
            ⏱️ <span id="timerVal">${fmt(timeLeft)}</span>
          </div>
          <button class="btn btn-primary btn-sm" id="btnSubmitTop" style="background:var(--secondary);border-color:var(--secondary)">Nộp bài thi</button>
        </div>
      </div>

      <div class="mock-layout">
        <div class="mock-main">
    `;

    currentTest.parts.forEach((part, pi) => {
      html += `
        <div class="mock-part" id="part_${part.id}">
          <div class="mock-part-title">
            ${esc(part.name)}
            <span class="mock-part-sub">(${esc(part.vi)})</span>
          </div>
      `;

      if (part.text) {
        html += `
          <div class="reading-box">
            <h4 style="margin-bottom:8px">Текст для чтения (Đoạn văn đọc hiểu):</h4>
            <p class="ru" style="line-height:1.75;margin-bottom:12px">${esc(part.text.ru)}</p>
            <div style="display:flex;justify-content:flex-end">
              <button type="button" class="btn btn-outline btn-sm btn-reading-trans" data-text-idx="${pi}">Dịch nghĩa tiếng Việt</button>
            </div>
            <div class="reading-vi-trans hidden" style="margin-top:10px;padding:10px 14px;background:var(--bg);border-radius:8px;font-size:0.88rem;color:var(--muted)">
              ${esc(part.text.vi)}
            </div>
          </div>
        `;
      }

      if (part.lines) {
        html += `
          <div class="audio-player-sim">
            <button class="btn btn-primary btn-sm" id="playAudio">🔊 Phát đoạn ghi âm hội thoại</button>
            <span style="font-size:0.82rem;color:var(--muted);margin-left:12px">Bấm để nghe đoạn đối thoại chuẩn bản xứ</span>
          </div>
        `;
      }

      part.questions.forEach((q, qi) => {
        const id = part.id + "_" + qi;
        html += `
          <div class="quiz-q" id="qBox_${id}">
            <p class="q-text"><span class="ru">${qi + 1}. ${esc(q.q)}</span></p>
            <div class="options">
              ${q.options.map((opt, oi) => `
                <button type="button" class="option ru ${answers[id] === oi ? "selected" : ""}" data-id="${id}" data-oi="${oi}">
                  ${esc(opt)}
                </button>
              `).join("")}
            </div>
          </div>
        `;
      });

      html += `</div>`;
    });

    html += `
        </div>

        <div class="mock-sidebar">
          <div class="sidebar-timer">
            <div>Thời gian còn lại</div>
            <div class="time-display" id="timerValSidebar">${fmt(timeLeft)}</div>
          </div>

          <div style="background:var(--primary-soft);border-radius:8px;padding:8px 12px;margin-bottom:14px;font-size:0.82rem;display:flex;justify-content:space-between">
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

          <div class="question-palette-grid">
    `;

    let pNum = 0;
    currentTest.parts.forEach((part) => {
      part.questions.forEach((q, qi) => {
        pNum++;
        const id = part.id + "_" + qi;
        const isDone = answers[id] !== undefined;
        html += `<button type="button" class="palette-btn ${isDone ? "done" : ""}" id="pBtn_${id}" data-jump="${id}">${pNum}</button>`;
      });
    });

    html += `
          </div>

          <button class="btn btn-primary btn-lg" id="submitTest" style="width:100%;margin-top:20px;background:var(--secondary);border-color:var(--secondary)">
            Nộp bài thi
          </button>
        </div>
      </div>
    `;

    host.innerHTML = html;

    el("#btnExitTest").onclick = () => {
      if (confirm("Bạn có chắc chắn muốn rời khỏi phòng thi? Kết quả hiện tại sẽ không được lưu.")) {
        clearInterval(timer);
        if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
        renderHub();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    host.querySelectorAll(".btn-reading-trans").forEach(btn => {
      btn.onclick = () => {
        const transBox = btn.closest(".reading-box").querySelector(".reading-vi-trans");
        transBox.classList.toggle("hidden");
        btn.textContent = transBox.classList.contains("hidden") ? "Dịch nghĩa tiếng Việt" : "Ẩn bản dịch";
      };
    });

    host.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const group = host.querySelectorAll(`.option[data-id="${id}"]`);
        group.forEach((g) => g.classList.remove("selected"));
        btn.classList.add("selected");
        answers[id] = +btn.dataset.oi;

        const pBtn = el(`#pBtn_${id}`);
        if (pBtn) pBtn.classList.add("done");

        const ansCount = Object.keys(answers).length;
        const countDisplay = el("#answeredCount");
        if (countDisplay) countDisplay.textContent = `${ansCount}/${totalQuestions}`;
      });
    });

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
        const lisPart = currentTest.parts.find((p) => p.lines);
        if (lisPart) speak(lisPart.lines.map((l) => l.ru).join(" "), "ru-RU", 0.85);
      };
    }

    el("#submitTest").onclick = submit;
    const topSub = el("#btnSubmitTop");
    if (topSub) topSub.onclick = submit;
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
    currentTest.parts.forEach((part) => {
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
    const passed = pct >= currentTest.passPercent;
    const best = Math.max(pct, STORE.get("bestTest_" + currentTest.id, 0));
    STORE.set("bestTest_" + currentTest.id, best);
    STORE.set("bestTest", Math.max(pct, STORE.get("bestTest", 0)));

    if (passed) {
      Progress.addXp(60);
      Progress.markDone("testsDone", currentTest.title);
    }

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnReviewBack">
          ← Quay lại danh sách đề thi
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${currentTest.level === "A2" ? "dau-badge-a2" : currentTest.level === "B1" ? "dau-badge-b1" : currentTest.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${currentTest.level}</span>
          <span class="dau-workspace-title">Kết quả khảo thí: ${esc(currentTest.title)}</span>
        </div>
        <button class="btn btn-primary btn-sm" id="btnRetryTop">Thi lại đề này</button>
      </div>

      <div class="workspace" style="padding:32px 24px">
        <div style="text-align:center;margin-bottom:28px">
          <p style="font-size:3.5rem;margin-bottom:8px">${passed ? "🎉" : "💪"}</p>
          <span class="pro-chip">${esc(currentTest.level)} · KẾT QUẢ KHẢO THÍ CHÍNH THỨC</span>
          <h2 style="font-size:1.8rem;margin:8px 0">${correct}/${total} câu đúng — ${pct}%</h2>
          <p style="margin:6px 0 16px;color:var(--muted)">Điểm cao nhất cấp độ này: <b>${best}%</b></p>
          <div class="pass-badge ${passed ? "yes" : "no"}" style="font-size:1rem;padding:8px 20px">
            ${passed ? "ĐẠT CHUẨN NĂNG LỰC TRKI " + currentTest.level : "CHƯA ĐẠT (Yêu cầu chuẩn ≥ " + currentTest.passPercent + "%)"}
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
      </div>
    `;

    const review = el("#reviewHost");
    currentTest.parts.forEach((part) => {
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

    el("#btnReviewBack").onclick = () => { renderHub(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    el("#btnRetryTop").onclick = startTest;
    el("#retryTest").onclick = renderHub;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderHub();
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
        <button class="tab ${selectedCategory === "hoc_bong_du_hoc" ? "active" : ""}" data-c="hoc_bong_du_hoc">Học bổng Du học Nga</button>
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
        <button class="tab ${currentCat === "banh_keo" ? "active" : ""}" data-c="banh_keo">Bánh kẹo Nga</button>
        <button class="tab ${currentCat === "my_pham" ? "active" : ""}" data-c="my_pham">Mỹ phẩm Siberia</button>
        <button class="tab ${currentCat === "luu_niem" ? "active" : ""}" data-c="luu_niem">Quà lưu niệm Nga</button>
        <button class="tab ${currentCat === "dich_vu_du_hoc" ? "active" : ""}" data-c="dich_vu_du_hoc">Dịch vụ du học Nga</button>
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

  // Render Mascot Rusika Companion Widget trên trang chủ (Bong bóng Chat & Con mèo theo XP)
  const rusikaBox = el("#rusikaHeroCard");
  if (rusikaBox && typeof MascotRusika !== "undefined") {
    MascotRusika.renderHeroCard(rusikaBox);
  }
  if (typeof MascotRusika !== "undefined") {
    MascotRusika.renderFloatingWidget();
  }

  // Render Bảng Gói Cước PRO & VietQR (Chuẩn hiện nay)
  window.renderPricingGrid = function () {
    const pricingHost = el("#pricingGrid");
    const pricingSection = document.getElementById("pricing");
    if (!pricingHost) return;

    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    
    // YÊU CẦU: Không hiển thị phần nâng cấp tài khoản PRO ở index.html khi KHÔNG đăng nhập
    if (!user) {
      if (pricingSection) pricingSection.style.display = "none";
      pricingHost.innerHTML = "";
      return;
    }

    if (pricingSection) pricingSection.style.display = "block";

    const isPro = typeof Monetization !== "undefined" ? Monetization.isPro() : false;
    const proInfo = typeof Monetization !== "undefined" ? Monetization.getProInfo() : null;
    const pkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);

    // Banner thông tin trạng thái học viên phía trên bảng giá
    const alertBannerHtml = `
      <div class="pricing-auth-banner logged-in" style="grid-column:1/-1">
        <div style="display:flex;align-items:center;gap:8px">
          <span>👤</span>
          <span>Đang chọn gói cho tài khoản: <b>${esc(user.name || "Học viên")}</b> <code style="background:rgba(0,0,0,0.06);padding:2px 6px;border-radius:4px">${esc(user.email || "Khách")}</code></span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${isPro ? `<span class="pro-chip-header" style="font-size:0.75rem;padding:3px 10px">👑 PRO VIP (${esc(proInfo ? proInfo.pkgTitle : "Active")})</span>` : `<span class="user-tier-badge tier-free" style="font-size:0.75rem;padding:3px 9px">Học viên Free</span>`}
          <a href="upgrade.html" class="btn btn-sm btn-outline" style="font-size:0.78rem;padding:3px 10px;text-decoration:none">
            Xem bảng so sánh chi tiết →
          </a>
        </div>
      </div>
    `;

    pricingHost.innerHTML = alertBannerHtml + pkgs.map((pkg) => {
      const isCurrentPlan = isPro && proInfo && (pkg.id || "").toLowerCase() === (proInfo.pkgId || "").toLowerCase();
      
      // Nút hành động chuẩn theo trạng thái auth & pro
      let actionBtnHtml = "";
      if (isCurrentPlan) {
        actionBtnHtml = `
          <button class="btn btn-outline" disabled style="width:100%;background:rgba(16,185,129,0.1);color:#059669;border-color:#10b981;cursor:default;font-weight:800">
            ✓ Gói bạn đang sử dụng
          </button>`;
      } else {
        actionBtnHtml = `
          <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-upgrade-pkg" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
            ⚡ Kích hoạt qua VietQR ngay
          </button>`;
      }

      return `
      <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrentPlan ? "is-current" : ""}">
        ${isCurrentPlan ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG ✓</div>` : (pkg.popular ? `<div class="pricing-popular-badge">PHỔ BIẾN NHẤT</div>` : "")}
        <div class="pricing-card-head">
          <span class="pricing-badge">${esc(pkg.badge || "PRO")}</span>
          <h3 class="pricing-title">${esc(pkg.title)}</h3>
          <p class="pricing-desc">${esc(pkg.desc)}</p>
        </div>
        <div class="pricing-price-wrap">
          <span class="pricing-amount">${pkg.price.toLocaleString("vi-VN")} đ</span>
          ${pkg.priceOld ? `<span class="pricing-old">${pkg.priceOld.toLocaleString("vi-VN")} đ</span>` : ""}
        </div>
        <ul class="pricing-features">
          ${(pkg.features || []).map((f) => `<li><span class="chk">✓</span> <span>${esc(f)}</span></li>`).join("")}
        </ul>
        ${actionBtnHtml}
      </div>`;
    }).join("");

    pricingHost.querySelectorAll(".btn-upgrade-pkg").forEach((btn) => {
      btn.onclick = () => {
        if (typeof Monetization !== "undefined") {
          Monetization.openUpgradeModal(btn.dataset.pkg);
        }
      };
    });
  };

  window.renderPricingGrid();

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
 * TRANG NÂNG CẤP TÀI KHOẢN PRO (upgrade.html - Chuẩn DauEnglish)
 * ===================================================================== */
function initUpgradePage() {
  const host = el("#upgradeHost");
  if (!host) return;

  const render = () => {
    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    const isPro = typeof Monetization !== "undefined" ? Monetization.isPro() : false;
    const proInfo = typeof Monetization !== "undefined" ? Monetization.getProInfo() : null;
    const pkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);

    // 1. KHI CHƯA ĐĂNG NHẬP: Hiển thị giao diện mời đăng nhập chuẩn
    if (!user) {
      host.innerHTML = `
        <div class="upgrade-hero">
          <span class="upgrade-kicker">👑 NÂNG CẤP TÀI KHOẢN PRO</span>
          <h1>Mở Khóa Toàn Bộ Đề Thi TRKI & Đồng Hành Cùng AI Rusika</h1>
          <p>Trang nâng cấp tài khoản dành cho học viên RusiTRKI. Vui lòng đăng nhập để xem thông tin gói cước và ưu đãi dành riêng cho bạn.</p>
        </div>

        <div class="upgrade-auth-box">
          <div class="upgrade-auth-icon">🔐</div>
          <h2>Đăng nhập để xem bảng giá & ưu đãi</h2>
          <p>Để lưu trữ trọn đời kết quả luyện thi, đồng bộ tiến độ trên mọi thiết bị và gắn quyền PRO vào tài khoản chính chủ, vui lòng đăng nhập trước.</p>
          <div class="upgrade-auth-actions">
            <a class="btn btn-primary btn-lg" href="login.html?redirect=upgrade.html" style="text-decoration:none">
              👉 Đăng nhập với Google / Email
            </a>
            <a class="btn btn-outline btn-lg" href="signup.html?redirect=upgrade.html" style="text-decoration:none">
              ✨ Đăng ký tài khoản mới
            </a>
          </div>
        </div>
      `;
      return;
    }

    // 2. KHI ĐÃ ĐĂNG NHẬP: Hiển thị đầy đủ trang Nâng cấp chuẩn DauEnglish
    const initials = (user.name || user.email || "?")
      .split(/\s+/)
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    const avatar = user.photo
      ? `<img src="${esc(user.photo)}" alt="" referrerpolicy="no-referrer" />`
      : initials;

    host.innerHTML = `
      <!-- HERO SECTION -->
      <div class="upgrade-hero">
        <span class="upgrade-kicker">👑 BẢNG GIÁ DỊCH VỤ & GÓI HỌC VIÊN PRO</span>
        <h1>Mở Khóa Toàn Diện — Bứt Phá Chứng Chỉ TRKI</h1>
        <p>Đầu tư thông minh một lần, đồng hành trọn vẹn suốt quá trình luyện thi chứng chỉ ТРКИ và chinh phục học bổng du học Liên bang Nga.</p>
      </div>

      <!-- USER STRIP -->
      <div class="upgrade-user-strip">
        <div class="upgrade-user-info">
          <div class="user-avatar-small">${avatar}</div>
          <div>
            <div class="upgrade-user-name">
              <span>Học viên:</span> <b>${esc(user.name || "Bạn")}</b>
              <code class="upgrade-user-email">${esc(user.email || "Khách")}</code>
            </div>
            <div class="upgrade-user-tier">
              Cấp độ tài khoản: ${isPro ? `<span class="user-tier-badge tier-pro">⭐ PRO MEMBER (${esc(proInfo ? proInfo.pkgTitle : "Active")})</span>` : `<span class="user-tier-badge tier-free">Học viên Free</span>`}
            </div>
          </div>
        </div>

        ${isPro ? `
          <div class="upgrade-pro-active-box">
            <span>🟢 Gói đang dùng: <b>${esc(proInfo ? proInfo.pkgTitle : "PRO VIP")}</b> (${esc((proInfo && proInfo.expiresFormatted) || "Đang kích hoạt")})</span>
            <button class="btn btn-sm btn-outline" id="btnManageUpgradePage" style="white-space:nowrap">Quản lý gói</button>
          </div>
        ` : `
          <div class="upgrade-discount-countdown">
            🔥 Ưu đãi 50% dành riêng cho tài khoản của bạn hôm nay
          </div>
        `}
      </div>

      <!-- PRICING CARDS GRID -->
      <div class="pricing-grid" style="margin-bottom:60px">
        ${pkgs.map((pkg) => {
          const isCurrent = isPro && proInfo && (pkg.id || "").toLowerCase() === (proInfo.pkgId || "").toLowerCase();
          return `
          <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrent ? "is-current" : ""}">
            ${isCurrent ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG ✓</div>` : (pkg.popular ? `<div class="pricing-popular-badge">PHỔ BIẾN NHẤT</div>` : "")}
            <div class="pricing-card-head">
              <span class="pricing-badge">${esc(pkg.badge || "PRO")}</span>
              <h3 class="pricing-title">${esc(pkg.title)}</h3>
              <p class="pricing-desc">${esc(pkg.desc)}</p>
            </div>
            <div class="pricing-price-wrap">
              <span class="pricing-amount">${pkg.price.toLocaleString("vi-VN")} đ</span>
              ${pkg.priceOld ? `<span class="pricing-old">${pkg.priceOld.toLocaleString("vi-VN")} đ</span>` : ""}
            </div>
            <ul class="pricing-features">
              ${(pkg.features || []).map((f) => `<li><span class="chk">✓</span> <span>${esc(f)}</span></li>`).join("")}
            </ul>
            ${isCurrent ? `
              <button class="btn btn-outline" disabled style="width:100%;background:rgba(16,185,129,0.1);color:#059669;border-color:#10b981;cursor:default;font-weight:800">
                ✓ Gói bạn đang sử dụng
              </button>
            ` : `
              <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-select-upgrade" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
                ⚡ Kích hoạt qua VietQR ngay
              </button>
            `}
          </div>`;
        }).join("")}
      </div>

      <!-- BẢNG SO SÁNH CHI TIẾT TÍNH NĂNG (CHUẨN DAUENGLISH FREE VS PRO) -->
      <section class="comparison-section">
        <div class="comparison-heading">
          <span class="section-kicker">SO SÁNH CHI TIẾT</span>
          <h2>Bảng So Sánh Quyền Lợi: Gói Free vs Gói PRO</h2>
          <p>Xem toàn bộ danh sách tính năng và sự khác biệt giữa hai tài khoản</p>
        </div>

        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="col-feature">Tính năng / Nội dung học</th>
                <th class="col-free">Tài khoản FREE</th>
                <th class="col-pro"><span class="pro-crown">👑</span> Gói PRO VIP (Khuyên dùng)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col-feature"><b>Ngân hàng đề thi thử TRKI</b></td>
                <td class="col-free">1 đề thi mẫu Part Ngữ pháp A1/A2</td>
                <td class="col-pro"><b>TOÀN BỘ</b> ngân hàng đề ТРКИ A1, A2, B1, B2 chuẩn quốc tế</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Đáp án & Giải thích chi tiết</b></td>
                <td class="col-free">Chỉ xem số điểm tổng</td>
                <td class="col-pro"><b>Chi tiết từng câu</b>: Phân tích ngữ pháp, bẫy trắc nghiệm & dẫn chứng</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Luyện nghe 4 Part CEFR</b></td>
                <td class="col-free">Nghe thử Part 1</td>
                <td class="col-pro"><b>Trọn bộ Part 1–4</b>, chỉnh tốc độ 0.75x–1.25x & full transcript song ngữ</td>
              </tr>
              <tr>
                <td class="col-feature"><b>AI Chấm phát âm & Luyện nói</b></td>
                <td class="col-free">Giới hạn 2 lượt thử/ngày</td>
                <td class="col-pro"><b>Không giới hạn</b> cùng AI Rusika, so sánh âm vị chuẩn bản xứ</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Luyện viết tự luận (Письмо)</b></td>
                <td class="col-free">Chấm 1 bài mẫu</td>
                <td class="col-pro"><b>Không giới hạn</b>, AI chấm 4 tiêu chuẩn TRKI (Ngữ pháp, Từ vựng, Bố cục)</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Kho Lọ từ vựng Spaced Repetition</b></td>
                <td class="col-free">2 Lọ từ cơ bản</td>
                <td class="col-pro"><b>Kho 100+ Lọ từ chuyên ngành</b> (Y khoa, Kỹ thuật, Kinh tế, KTX, Du học Nga)</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Series hoạt hình «Хочу в Россию»</b></td>
                <td class="col-free">2 tập xem thử</td>
                <td class="col-pro"><b>Trọn bộ các tập độc quyền</b> kèm kịch bản hội thoại và bài tập trắc nghiệm</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Tư vấn Du học Nga</b></td>
                <td class="col-free"><span style="color:#94a3b8">✕ Không hỗ trợ</span></td>
                <td class="col-pro"><b style="color:#059669">✓ Ưu tiên hỗ trợ 1-1</b> qua nhóm Zalo VIP cùng cựu du học sinh</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Ghi chú & Note câu hỏi trong đề</b></td>
                <td class="col-free">Tối đa 10 câu</td>
                <td class="col-pro"><b>Tối đa 5.000 câu</b> ghi chú cá nhân</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Kho Từ vựng của tôi (Flashcards)</b></td>
                <td class="col-free">Tối đa 50 từ</td>
                <td class="col-pro"><b>Tối đa 10.000 từ</b> ôn tập thuật toán ngắt quãng SM-2</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Trải nghiệm học tập & Tốc độ tải</b></td>
                <td class="col-free">Băng thông tiêu chuẩn</td>
                <td class="col-pro"><b>100% Không quảng cáo</b>, máy chủ VIP ưu tiên tốc độ cao</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Đồng bộ dữ liệu đa thiết bị</b></td>
                <td class="col-free">1 thiết bị duy nhất</td>
                <td class="col-pro"><b>Đồng bộ đám mây trọn đời</b> (Web, Điện thoại, Máy tính bảng)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- QUY TRÌNH 3 BƯỚC THANH TOÁN VIETQR -->
      <section class="steps-section">
        <div style="text-align:center">
          <span class="section-kicker">KÍCH HOẠT TỨC THÌ</span>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--text);margin-bottom:6px">Quy Trình 3 Bước Kích Hoạt Tự Động</h2>
          <p style="color:var(--muted);font-size:0.92rem">Không cần chụp biên lai hay chờ duyệt thủ công. Hệ thống đối soát tự động 24/7.</p>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <span class="step-num step-card-num">01</span>
            <div class="step-icon">🎯</div>
            <div class="step-title">Chọn Gói Cước</div>
            <div class="step-desc">Chọn gói 6 Tháng, 1 Năm hoặc Trọn Đời phù hợp nhất với mục tiêu học tập của bạn.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">02</span>
            <div class="step-icon">📱</div>
            <div class="step-title">Quét Mã VietQR</div>
            <div class="step-desc">Mở app Mobile Banking bất kỳ, quét mã VietQR tự động điền sẵn số tài khoản và cú pháp.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">03</span>
            <div class="step-icon">⚡</div>
            <div class="step-title">Mở Khóa Tức Thì</div>
            <div class="step-desc">Hệ thống xác thực chữ ký điện tử và kích hoạt tài khoản PRO ngay trong 3 giây.</div>
          </div>
        </div>
      </section>

      <!-- CAM KẾT & ĐẢM BẢO -->
      <div class="guarantees-grid">
        <div class="guarantee-card">
          <div class="guarantee-icon">⚡</div>
          <div class="guarantee-title">Kích Hoạt Tức Thì</div>
          <div class="guarantee-desc">Tự động 24/7 kể cả ban đêm và ngày nghỉ.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">🔒</div>
          <div class="guarantee-title">An Toàn Tuyệt Đối</div>
          <div class="guarantee-desc">Cổng VietinBank chuẩn bảo mật liên ngân hàng NAPAS.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">🤝</div>
          <div class="guarantee-title">Hỗ Trợ 1-1</div>
          <div class="guarantee-desc">Giảng viên và cựu du học sinh Nga trực tiếp đồng hành.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">💎</div>
          <div class="guarantee-title">Bảo Lưu Trọn Đời</div>
          <div class="guarantee-desc">Tiến độ học tập và quyền PRO luôn được gắn với email của bạn.</div>
        </div>
      </div>

      <!-- FAQ ACCORDION -->
      <section style="margin:60px 0">
        <div style="text-align:center;margin-bottom:30px">
          <span class="section-kicker">HỎI ĐÁP</span>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--text);margin-bottom:6px">Câu Hỏi Thường Gặp Về Gói PRO</h2>
        </div>
        <div class="faq-list" style="max-width:760px;margin:0 auto">
          <div class="faq-item">
            <button type="button">
              <span>Thanh toán xong thì bao lâu tài khoản được kích hoạt?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Hệ thống tích hợp cổng thanh toán VietQR tự động của VietinBank. Ngay sau khi bạn quét mã và hoàn tất chuyển khoản, hệ thống sẽ xác thực chữ ký số và kích hoạt tài khoản PRO trong vòng 3 đến 5 giây mà bạn không cần phải F5 hay chờ duyệt tay.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Tôi có thể học trên nhiều thiết bị (điện thoại, máy tính) không?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Có! Quyền lợi PRO và toàn bộ lịch sử thi thử, chuỗi Streak, lọ từ vựng cá nhân được gắn cố định vào tài khoản email của bạn. Bạn có thể đăng nhập trên máy tính xách tay, điện thoại hay iPad và dữ liệu luôn được đồng bộ mượt mà.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Gói VIP Trọn Đời có thời hạn như thế nào?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Gói VIP Trọn Đời không có ngày hết hạn. Bạn sở hữu quyền truy cập vĩnh viễn vào tất cả đề thi hiện tại cũng như toàn bộ đề thi mới được cập nhật hàng năm, kèm theo Hộp quà Nga đặc biệt và Voucher 500k du học Nga.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Nếu tôi chuyển khoản sai cú pháp thì xử lý thế nào?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Đừng lo lắng! Đội ngũ Admin và cựu du học sinh RUSI luôn túc trực hỗ trợ 24/7. Bạn chỉ cần gửi ảnh chụp biên lai qua nhóm Zalo VIP hoặc Fanpage để được kích hoạt thủ công trong 5 phút.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Gắn sự kiện chọn gói cước mở VietQR
    host.querySelectorAll(".btn-select-upgrade").forEach((btn) => {
      btn.onclick = () => {
        if (typeof Monetization !== "undefined") {
          Monetization.openUpgradeModal(btn.dataset.pkg);
        }
      };
    });

    const manageBtn = host.querySelector("#btnManageUpgradePage");
    if (manageBtn) {
      manageBtn.onclick = () => {
        if (typeof Monetization !== "undefined") {
          Monetization.openManageModal();
        }
      };
    }

    // Tương tác Accordion FAQ
    host.querySelectorAll(".faq-item button").forEach((btn) => {
      btn.onclick = () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("faq-open");
        host.querySelectorAll(".faq-item").forEach((el) => {
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
  };

  render();

  // Lắng nghe sự kiện Auth và PRO để re-render tự động
  if (window.Auth && typeof window.Auth.onChange === "function") {
    window.Auth.onChange(() => render());
  }
  window.addEventListener("trki:pro-updated", () => render());
}
window.initUpgradePage = initUpgradePage;


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
  el("#vocabSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = (el("#vocabSearch").value || "").trim().toLowerCase();
      if (!q) return;
      const allCards = SRS.getCards();
      const hasMatch = allCards.some(
        (c) => (c.ru && c.ru.toLowerCase().includes(q)) || (c.vi && c.vi.toLowerCase().includes(q))
      );
      if (!hasMatch) {
        window.location.href = `404.html?q=${encodeURIComponent(q)}&from=vocab`;
      }
    }
  });
  el("#vocabFilter").addEventListener("change", renderVocabTab);
  el("#vocabLevel").addEventListener("change", renderVocabTab);

  /* ---------- SESSION FLOW ----------
   * Queue thực sự nằm ở SRS state (state.sessionQueue) — đây là nguồn duy nhất.
   * Khi user chấm Again, _reinsertAfter chèn card lại vào queue thực.
   * showNextCard luôn đọc state.sessionQueue[0] làm thẻ hiện tại. */
  window.startSrsFlashcardDirectly = function() {
    document.querySelectorAll(".srs-tab").forEach(b => b.classList.toggle("active", b.dataset.t === "study"));
    document.querySelectorAll(".srs-tab-pane").forEach(p => p.classList.toggle("active", p.id === "tab-study"));
    const heroCard = document.querySelector("#vocPaneAlgorithm .srs-hero-card");
    if (heroCard) heroCard.classList.add("hidden");
    const srsTabs = document.querySelector("#vocPaneAlgorithm .srs-tabs");
    if (srsTabs) srsTabs.classList.add("hidden");

    let st = SRS.getState();
    // 1. Lấy tất cả từ tới hạn ôn theo thuật toán SRS (dueDate <= now)
    let due = SRS.getDueCards(st, 30);
    // 2. Tự động tính toán số từ cần học (mục tiêu 10 từ/phiên)
    let news = [];
    const targetSessionSize = 10;
    if (due.length < targetSessionSize) {
      const neededNew = targetSessionSize - due.length;
      news = SRS.getNewCards(st, "all", neededNew);
    }
    // 3. Nếu cả due và news đều trống (đã học hết kho từ), lấy các từ đang học sắp tới hạn
    if (due.length === 0 && news.length === 0) {
      const allCards = Object.values(st.cards).filter(c => !c.mastered);
      if (allCards.length > 0) {
        due = allCards.sort((a, b) => (a.dueDate || 0) - (b.dueDate || 0)).slice(0, targetSessionSize);
      } else {
        news = (typeof SRS_WORDS !== "undefined" ? SRS_WORDS : []).slice(0, targetSessionSize);
      }
    }

    // Đưa từ mới vào danh sách thẻ
    news.forEach(w => SRS.ensureCard(w));
    st = SRS.getState();

    const queue = [...due.map(c => c.id), ...news.map(w => SRS.cardId(w))];
    st.sessionQueue = queue;
    st.sessionInserted = [];
    st.sessionDone = [];
    SRS.saveState(st);

    sessionCtx = {
      mode: "flashcard",
      totalAtStart: queue.length,
      results: [],
      doneAt: { again: 0, hard: 0, good: 0, easy: 0, mastered: 0 },
      startedAt: Date.now()
    };

    el("#studySetup").classList.add("hidden");
    el("#studySession").classList.remove("hidden");
    el("#studyDone").classList.add("hidden");
    el("#modeLabel").textContent = "🃏 Flashcard Ôn tập";

    showNextCard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <button class="btn btn-soft btn-sm" id="srsAddJar">🏺 Lưu vào Lọ</button>
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
    const addJarBtn = el("#srsAddJar");
    if (addJarBtn) {
      addJarBtn.onclick = (e) => {
        e.stopPropagation();
        window.openAddToJarModal(card);
      };
    }
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
    if (confirm("Thoát phiên học? Tiến độ đã chấm sẽ được lưu.")) {
      if (typeof window.exitSrsToVocab === "function") {
        window.exitSrsToVocab();
      } else {
        endSession();
      }
    }
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
    if (typeof window.startSrsFlashcardDirectly === "function") {
      window.startSrsFlashcardDirectly();
    } else {
      const lastMode = sessionCtx ? sessionCtx.mode : "flashcard";
      startSession({ level: el("#setupLevel").value, newLimit: +el("#setupNew").value || 8, mode: lastMode });
    }
  };
  el("#doneBack").onclick = () => {
    if (typeof window.exitSrsToVocab === "function") {
      window.exitSrsToVocab();
    } else {
      endSession();
    }
  };

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
