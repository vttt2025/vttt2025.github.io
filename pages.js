
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
      ‹
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
      ›
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
      <span>${window.RusiIcons ? RusiIcons.get("file-text", { size: 14 }) : ""} ${lesson.words.length} từ</span>
      <span>${window.RusiIcons ? RusiIcons.get("help-circle", { size: 14 }) : ""} ${lesson.quiz.length} câu</span>
      <span>${done === 100 ? `${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Hoàn thành` : `${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Chưa học`}</span>
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
      name: "Lọ từ vựng yêu thích",
      icon: "archive-jar",
      desc: "Lọ chứa các từ vựng bạn yêu thích và đã lưu",
      words: [],
      level: "custom",
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
          <span style="display:inline-flex;align-items:center">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""}</span> Lưu vào Lọ từ vựng cá nhân
        </h3>
        <button type="button" class="btn btn-soft btn-sm" id="closeAddJarModal" style="padding:4px 8px;border-radius:50%;font-size:1rem;line-height:1">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
      </div>

      <div class="add-jar-preview">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="ru-word ru">${esc(stress || ru)}</div>
            ${note ? `<span style="display:inline-block;font-size:0.75rem;padding:2px 8px;border-radius:6px;background:var(--primary-soft);color:var(--primary);margin-top:4px;font-weight:600">${esc(note)}</span>` : ""}
          </div>
          <button type="button" class="btn btn-soft btn-sm" id="previewSpeakBtn" style="padding:6px 10px;border-radius:50%" title="Nghe phát âm">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : "Nghe"}</button>
        </div>
        <div class="vi-word">${esc(vi)}</div>
        ${ex ? `<div style="font-size:0.82rem;color:var(--muted);margin-top:6px;border-top:1px dashed var(--border);padding-top:6px;font-style:italic">«${esc(ex)}»</div>` : ""}
      </div>

      <label style="display:block;margin-bottom:12px">
        <span style="font-size:0.85rem;font-weight:700;display:block;margin-bottom:6px">Chọn Lọ từ vựng muốn lưu vào:</span>
        <select id="selectTargetJar" style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:0.92rem;background:var(--surface);color:var(--text)">
          ${customJars.map(j => `
            <option value="${esc(j.id)}">${esc(j.name)} (${(j.words || []).length} từ)</option>
          `).join("")}
          <option value="__NEW_JAR__">+ [Tạo Lọ mới ngay...]</option>
        </select>
      </label>

      <div id="inlineNewJarGroup" style="display:none;background:var(--bg);border:1px dashed var(--border);border-radius:10px;padding:10px 12px;margin-bottom:12px">
        <span style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px">Tên Lọ mới:</span>
        <div style="display:flex;gap:8px">
          <input type="text" id="inlineNewJarName" placeholder="Ví dụ: Từ vựng thi TRKI 1..." style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;font-size:0.9rem" />
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px">
        <button type="button" class="btn btn-outline btn-sm" id="btnCancelAddJar">Hủy</button>
        <button type="button" class="btn btn-primary btn-sm" id="btnConfirmAddJar">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu vào Lọ</button>
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
      if (!createdName) {
        toast("Vui lòng nhập tên cho Lọ từ vựng mới!");
        newName.focus();
        return;
      }
      jarId = "custom-jar-" + Date.now();
      const newJar = {
        id: jarId,
        name: createdName,
        icon: "archive-jar", // Mặc định không cho tạo icon
        desc: "Lọ từ vựng cá nhân",
        words: [],
        level: "custom",
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
      toast(`Đã cập nhật từ «${ru}» trong lọ «${jar.name}»!`);
    } else {
      jar.words.push(wordPayload);
      toast(`Đã lưu «${ru}» vào «${jar.name}» thành công!`);
    }

        if (typeof STORE !== "undefined") {
      STORE.set("custom_jars", currentCustomJars);
    }
    playQuizletSound("correct");
    modal.remove();

    // Nếu người dùng đang học trong một lọ (in-workspace):
    // Giữ nguyên giao diện học tập hiện tại, tuyệt đối KHÔNG đóng lọ hay chuyển tab!
    const detailHost = document.getElementById("jarDetailHost");
    const inWorkspace = document.body.classList.contains("in-workspace") || (detailHost && !detailHost.classList.contains("hidden"));
    if (inWorkspace) {
      // Nếu từ vừa lưu vào chính lọ hiện đang mở, cập nhật từ mà vẫn giữ nguyên tab hiện tại
      if (window.currentActiveJarId === jarId && typeof window.refreshActiveWorkspace === "function") {
        window.refreshActiveWorkspace();
      }
    } else if (typeof window.refreshVocabViews === "function") {
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
        <h3 style="margin:0;font-size:1.15rem;display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("plus", { size: 16 }) : "+"} Thêm từ mới vào Lọ</h3>
        <button type="button" class="btn btn-soft btn-sm" id="closeAddWordModal" style="padding:4px 8px;border-radius:50%">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""}</button>
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
        <button type="button" class="btn btn-primary btn-sm" id="saveAddWord">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu từ này</button>
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
    toast(`Đã thêm từ «${ru}» vào lọ thành công!`);
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

  const getWordType = (w) => {
    if (!w) return "";
    const parts = [];
    if (w.pos) parts.push(w.pos);
    if (w.gender) parts.push(w.gender);
    if (parts.length > 0) return parts.join(", ");
    return w.note || "";
  };

  const words = (rawWords || []).map((w, idx) => ({
    id: w.id || w.vocab_id || "w-" + idx,
    ru: (w.ru || "").trim(),
    stress: (w.stress || w.ru || "").trim(),
    vi: (w.vi || w.meaning || "").trim(),
    note: (w.note || w.pos || w.trans || "").trim(),
    pos: (w.pos || "").trim(),
    gender: (w.gender || "").trim(),
    ex: (w.ex || "").trim(),
    ex_vi: (w.ex_vi || "").trim(),
    collocation: (w.collocation || "").trim(),
    verb_obj: (w.verb_obj || w.gov || "").trim(),
    gov: (w.gov || "").trim(),
    syn: (w.syn || "").trim(),
    ant: (w.ant || "").trim()
  }));

  if (words.length === 0) {
    container.innerHTML = `
      <div class="quizlet-empty-jar">
        <div style="margin-bottom:12px;color:var(--primary)">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 48 }) : ""}</div>
        <h3 style="margin-bottom:8px">Lọ từ vựng này đang trống</h3>
        <p style="color:var(--muted);max-width:460px;margin:0 auto 20px;font-size:0.95rem">
          Bạn chưa có từ vựng nào trong lọ này. Hãy nhấn nút bên dưới để thêm từ mới, hoặc nhấn nút <b>+ Lưu</b> từ bất kỳ bài học nào trên hệ thống!
        </p>
        ${isCustomJar ? `<button class="btn btn-primary btn-sm" id="btnEmptyAddWord">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm từ mới thủ công ngay</button>` : ""}
      </div>
    `;
    const btnAdd = container.querySelector("#btnEmptyAddWord");
    if (btnAdd) {
      btnAdd.onclick = () => openAddWordToJarModal(jarId, () => { if (onWordListChange) onWordListChange(currentMode); });
    }
    return;
  }

  const initialMode = (options && options.initialMode) ? options.initialMode : "list";

  container.innerHTML = `
    <div class="quizlet-suite">
      <div class="quizlet-mode-bar">
        <button type="button" class="quizlet-mode-btn ${initialMode === "list" ? "active" : ""}" data-mode="list">
          ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách từ (${words.length})</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "flashcard" ? "active" : ""}" data-mode="flashcard">
          ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Thẻ ghi nhớ (Flashcard)</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "learn" ? "active" : ""}" data-mode="learn">
          ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "match" ? "active" : ""}" data-mode="match">
          ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép thẻ</span>
        </button>
      </div>

      <div class="qmode-pane ${initialMode === "list" ? "active" : ""}" id="paneList"></div>
      <div class="qmode-pane ${initialMode === "flashcard" ? "active" : ""}" id="paneFlashcard"></div>
      <div class="qmode-pane ${initialMode === "learn" ? "active" : ""}" id="paneLearn"></div>
      <div class="qmode-pane ${initialMode === "match" ? "active" : ""}" id="paneMatch"></div>
    </div>
  `;

  // Mode switching
  let currentMode = initialMode;
  let matchTimerInterval = null;

  // Lấy các nút chế độ trong top bar (nếu có) và trong container
  const topbarModeBtns = Array.from(document.querySelectorAll("#dauTopbarModes .quizlet-mode-btn"));
  const innerModeBar = container.querySelector(".quizlet-mode-bar");
  if (topbarModeBtns.length > 0 && innerModeBar) {
    innerModeBar.style.display = "none";
  }

  const innerModeBtns = Array.from(container.querySelectorAll(".quizlet-mode-bar .quizlet-mode-btn"));
  const allModeBtns = topbarModeBtns.length > 0 ? topbarModeBtns : innerModeBtns;

  const panes = {
    list: container.querySelector("#paneList"),
    flashcard: container.querySelector("#paneFlashcard"),
    learn: container.querySelector("#paneLearn"),
    match: container.querySelector("#paneMatch")
  };

  const switchMode = (mode) => {
    if (matchTimerInterval) {
      clearInterval(matchTimerInterval);
      matchTimerInterval = null;
    }
    currentMode = mode;
    allModeBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
    innerModeBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));
    topbarModeBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));

    Object.keys(panes).forEach(k => {
      if (panes[k]) panes[k].classList.toggle("active", k === mode);
    });

    if (mode === "flashcard") renderFlashcardMode();
    if (mode === "learn") renderLearnMode();
    if (mode === "match") renderMatchMode();
    if (mode === "list") renderListMode();
  };

  allModeBtns.forEach(btn => {
    btn.onclick = () => switchMode(btn.dataset.mode);
  });
  innerModeBtns.forEach(btn => {
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
        toast("Chưa có từ nào được gắn sao! Hãy bấm nút Ngôi sao trên thẻ để đánh dấu từ khó.");
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
          <!-- FRONT FACE (RU) — Chuẩn quốc tế Anki/Quizlet: Từ vựng to rõ, có nút phát âm, ghi chú từ loại & tra 6 cách -->
          <div class="quizlet-card-face quizlet-card-front">
            <div class="qcard-top-row">
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-addjar" id="qAddJarFront" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 15 }) : ""} <span class="btn-text">+ Lưu</span></button>
              </div>
            </div>

            <div class="qcard-main">
              <div class="qcard-word ru">${esc(currentWord.stress || currentWord.ru)}</div>
              ${getWordType(currentWord) ? `<div class="qcard-pos-line">(${esc(getWordType(currentWord))})</div>` : ""}
              <button type="button" class="qcard-audio-btn" id="qAudioFront" title="Phát âm tiếng Nga">
                ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 20 }) : ""}
              </button>
            </div>

          </div>

          <!-- BACK FACE (VI) — ĐẦY ĐỦ NỘI DUNG THEO PROJECT_SPEC -->
          <div class="quizlet-card-face quizlet-card-back">
            <div class="qcard-top-row">
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-addjar" id="qAddJarBack" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 15 }) : ""} <span class="btn-text">+ Lưu</span></button>
              </div>
            </div>

            <div class="qcard-main">
              <!-- NGHĨA TIẾNG VIỆT CHÍNH -->
              <div class="qcard-meaning">${esc(currentWord.vi)}</div>

              <!-- VÍ DỤ CÂU THỰC TẾ SONG NGỮ NGA - VIỆT -->
              ${currentWord.ex ? `
                <div class="qcard-ex-box">
                  <div class="qcard-ex-header">
                    <span class="qcard-ex-label">Ví dụ ngữ cảnh</span>
                  </div>
                  <div class="qcard-ex-text ru">«${esc(currentWord.ex)}»</div>
                  ${currentWord.ex_vi ? `<div class="qcard-ex-trans">${esc(currentWord.ex_vi)}</div>` : ""}
                </div>
              ` : ""}

              <!-- CHI TIẾT NGỮ PHÁP (CỤM ĐỘNG TỪ, QUẢN CÁCH, ĐỒNG/TRÁI NGHĨA, GHI CHÚ) -->
              ${(currentWord.collocation || currentWord.verb_obj || currentWord.gov || currentWord.syn || currentWord.ant || currentWord.note) ? `
                <div class="qcard-details-grid">
                  ${(currentWord.collocation || currentWord.verb_obj || currentWord.gov) ? `
                    <div class="qcard-detail-item">
                      <span class="qcard-detail-label">Cụm từ / Quản cách:</span>
                      <span class="qcard-detail-val ru">${esc(currentWord.collocation || currentWord.verb_obj || currentWord.gov)}</span>
                    </div>
                  ` : ""}
                  ${currentWord.syn ? `
                    <div class="qcard-detail-item">
                      <span class="qcard-detail-label">Đồng nghĩa:</span>
                      <span class="qcard-detail-val ru">${esc(currentWord.syn)}</span>
                    </div>
                  ` : ""}
                  ${currentWord.ant ? `
                    <div class="qcard-detail-item">
                      <span class="qcard-detail-label">Trái nghĩa:</span>
                      <span class="qcard-detail-val ru">${esc(currentWord.ant)}</span>
                    </div>
                  ` : ""}
                  ${currentWord.note ? `
                    <div class="qcard-detail-item">
                      <span class="qcard-detail-label">Ghi chú:</span>
                      <span class="qcard-detail-val">${esc(currentWord.note)}</span>
                    </div>
                  ` : ""}
                </div>
              ` : ""}
            </div>

          </div>
        </div>
      </div>

      <!-- CONTROLS: CĂN GIỮA TUYỆT ĐỐI THEO CARD < 1/26 > (Req 6) -->
      <div class="quizlet-controls" style="display:flex;justify-content:center;align-items:center;margin:20px auto;width:100%;max-width:860px;box-sizing:border-box">
        <div class="quizlet-nav-wrap" style="margin:0 auto;display:inline-flex;align-items:center;justify-content:center;gap:18px">
          <button type="button" class="quizlet-nav-btn" id="qNavPrev" title="Thẻ trước (Phím ←)">‹</button>
          <div class="quizlet-counter" style="font-weight:700;font-size:1.15rem;min-width:80px;text-align:center">${fIdx + 1} / ${fActiveWords.length}</div>
          <button type="button" class="quizlet-nav-btn" id="qNavNext" title="Thẻ sau (Phím →)">›</button>
        </div>
      </div>

      <!-- SRS SPACED REPETITION RATING BAR: Căn đều 860px chuẩn card -->
      <div class="qcard-srs-rating-bar" style="margin:16px auto 0;max-width:860px;width:100%;box-sizing:border-box">
        <button type="button" class="btn-srs-rate btn-srs-again" data-rate="again" title="Chưa nhớ - Ôn lại">
          <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""} Quên</span>
        </button>
        <button type="button" class="btn-srs-rate btn-srs-hard" data-rate="hard" title="Khó nhớ - Ôn lại sớm">
          <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} Khó</span>
        </button>
        <button type="button" class="btn-srs-rate btn-srs-good" data-rate="good" title="Nhớ tốt">
          <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Tốt</span>
        </button>
        <button type="button" class="btn-srs-rate btn-srs-easy" data-rate="easy" title="Rất dễ">
          <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("star", { size: 14 }) : ""} Dễ</span>
        </button>
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

    // SRS Spaced Repetition Rating
    pane.querySelectorAll(".btn-srs-rate").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const rating = b.dataset.rate;
        if (typeof SRS !== "undefined" && typeof SRS.ensureCard === "function") {
          const cardId = SRS.ensureCard(currentWord);
          if (typeof SRS.review === "function") {
            SRS.review(cardId, rating);
          }
          // Theo dõi tiến độ trong phiên học Flashcard: PHẢI HOÀN THÀNH HẾT THẺ MỚI CÓ ĐIỂM CỘNG
          let reviewed = STORE.get("flash_rev_" + jarId, []);
          if (!reviewed.includes(currentWord.ru)) {
            reviewed.push(currentWord.ru);
            STORE.set("flash_rev_" + jarId, reviewed);
          }

          if (reviewed.length >= fActiveWords.length) {
            const today = new Date().toDateString();
            const sessKey = "flash_done_" + jarId + "_" + today;
            if (!STORE.get(sessKey, false)) {
              STORE.set(sessKey, true);
              STORE.set("flash_rev_" + jarId, []); // reset cho các lượt ôn tập sau
              Progress.markDone("vocabDone", jarId);
              Progress.addXp(15);
              toast("Chúc mừng! Bạn đã hoàn thành toàn bộ thẻ trong lọ từ vựng (+15 XP)!");
            }
          }
        }
        playQuizletSound(rating === "again" ? "wrong" : "correct");
        nextCard();
      };
    });


    // Audio
    pane.querySelector("#qAudioFront").onclick = (e) => {
      e.stopPropagation();
      speak(currentWord.ru);
    };

    // Add to jar
    const addJarCurrent = (e) => {
      e.stopPropagation();
      window.openAddToJarModal(currentWord);
    };
    const ajFront = pane.querySelector("#qAddJarFront");
    if (ajFront) ajFront.onclick = addJarCurrent;
    const ajBack = pane.querySelector("#qAddJarBack");
    if (ajBack) ajBack.onclick = addJarCurrent;
  };

  // Keyboard shortcut listener for Flashcards & List Preview (Spec 1, Dòng 50 & 64)
  const handleKeydown = (e) => {
    const isEditing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (isEditing) return;

    // Phím Space trong giao diện danh sách từ vựng: lật thẻ xem nhanh (.dau-vocab-preview-box), phím mũi tên chuyển từ
    if (currentMode === "list") {
      if (e.code === "Space") {
        e.preventDefault();
        const pCard = container.querySelector("#dauPreviewCard");
        if (pCard) {
          pCard.classList.toggle("flipped");
          playQuizletSound("flip");
        }
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        const nextBtn = container.querySelector("#btnPreviewNext");
        if (nextBtn) nextBtn.click();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        const prevBtn = container.querySelector("#btnPreviewPrev");
        if (prevBtn) prevBtn.click();
      }
      return;
    }

    if (currentMode !== "flashcard") return;

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
          <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get(pct >= 80 ? "trophy-reward" : pct >= 50 ? "award-badge" : "book-open-blog", { size: 48 }) : ""}</div>
          <h2 style="margin:0 0 8px">Hoàn thành bài Học thông minh!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đạt <b>${lScore}</b> / ${lQueue.length} câu chính xác (${pct}%)
            ${pct >= 70 ? ` · <span style="color:#16a34a;font-weight:700">+15 XP ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""}</span>` : ""}
          </p>

          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            ${lWrongWords.length > 0 ? `
              <button class="btn btn-primary" id="btnLearnRetryWrong">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Ôn lại ${lWrongWords.length} từ chưa nhớ</button>
            ` : ""}
            <button class="btn btn-outline" id="btnLearnRestart">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Học lại tất cả</button>
            <button class="btn btn-soft" id="btnLearnToFlash">${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} Về thẻ ghi nhớ</button>
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
          <button type="button" class="btn btn-soft btn-sm" id="btnLearnAudio" style="margin-top:6px;display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe phát âm</button>
        </div>

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
          <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 48 }) : ""}</div>
          <h2 style="margin:0 0 8px">Hoàn thành phần Gõ từ & Chính tả!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đã gõ đúng <b>${wCorrect}</b> / ${wQueue.length} từ vựng (${pct}%)
          </p>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" id="btnWriteRestart">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Luyện lại từ đầu</button>
            <button class="btn btn-soft" id="btnWriteToFlash">${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} Về thẻ ghi nhớ</button>
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
            <button type="button" class="btn btn-soft btn-sm" id="btnWriteSpeak">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} <span class="btn-text">Nghe</span> phát âm gợi ý</button>
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
        resBox.innerHTML = `<b>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Tuyệt vời! Hoàn toàn chính xác!</b>`;
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
          </div>
          <div class="match-timer" id="matchTimer">${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 16 }) : ""} 0.0s</div>
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
      if (timerElem) timerElem.innerHTML = (window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : "") + " " + elapsed + "s";
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
                  <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 48 }) : ""}</div>
                  <h2 style="margin:0 0 8px">${isNewRecord ? "KỶ LỤC MỚI CỦA BẠN!" : "Tuyệt vời! Hoàn thành xuất sắc!"}</h2>
                  <p style="font-size:1.4rem;font-weight:800;color:var(--secondary);margin:10px 0">
                    ${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 16 }) : ""} Thời gian: ${finalTime} giây
                  </p>
                  <p style="color:var(--muted);margin-bottom:20px">+25 XP thưởng tốc độ ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""}</p>
                  <div style="display:flex;gap:12px;justify-content:center">
                    <button class="btn btn-primary" id="btnMatchAgain">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Chơi lại ván mới</button>
                    <button class="btn btn-soft" id="btnMatchToFlash">${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} Về thẻ ghi nhớ</button>
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
            <h3 style="margin:0;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 20 }) : ""} Bài kiểm tra từ vựng: ${esc(jarTitle)}</h3>
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
                    <span>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Đúng</span>
                  </label>
                  <label style="flex:1;display:flex;align-items:center;gap:8px;padding:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;cursor:pointer">
                    <input type="radio" name="q_${q.id}" value="false" required />
                    <span>${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""} Sai</span>
                  </label>
                </div>
              `}
            </div>
          `).join("")}

          <div style="text-align:center;margin-top:20px">
            <button type="submit" class="btn btn-primary btn-lg">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Nộp bài kiểm tra</button>
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
          <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get(pct >= 80 ? "trophy-reward" : pct >= 50 ? "award-badge" : "book-open-blog", { size: 48 }) : ""}</div>
          <h2 style="margin:0 0 8px">Kết quả: ${pct}% (${correct}/${questions.length} câu đúng)</h2>
          <p style="color:var(--muted);margin-bottom:20px">
            ${pct >= 80 ? "Xuất sắc! Bạn đã làm chủ rất tốt các từ vựng này." : pct >= 50 ? "Khá tốt! Hãy ôn lại các từ chưa vững nhé." : "Cần rèn luyện thêm, hãy dùng thẻ ghi nhớ để ôn lại."}
          </p>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" id="btnTestAgain">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Làm lại bài kiểm tra</button>
            <button class="btn btn-soft" id="btnTestToFlash">${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} Về thẻ ghi nhớ</button>
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
    let showDetails = true;
    const expandedWordKeys = new Set();
    let filterMode = "all"; // "all" | "starred" | "mastered"
    let sortMode = "original"; // "original" | "alphabetical"

    // Mini-flashcard preview state
    let previewIdx = 0;
    let previewFlipped = false;
    let previewShuffled = false;
    let previewWords = [...words];

    // Helper to get mastered words
    const getMasteredWords = () => (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
    const toggleMasteredWord = (ruWord) => {
      let list = getMasteredWords();
      const norm = (ruWord || "").toLowerCase().trim();
      const idx = list.findIndex(w => w.toLowerCase().trim() === norm);
      let isMastered = false;
      if (idx !== -1) {
        list.splice(idx, 1);
        if (typeof SRS !== "undefined" && typeof SRS.unmarkMastered === "function") {
          SRS.unmarkMastered(norm);
        }
      } else {
        list.push(ruWord);
        isMastered = true;
        if (typeof SRS !== "undefined" && typeof SRS.markMastered === "function") {
          SRS.markMastered(norm);
        }
      }
      if (typeof STORE !== "undefined") STORE.set("vocab_mastered_words", list);
      window.dispatchEvent(new CustomEvent("trki:progress-updated"));
      return isMastered;
    };

    const renderListUI = () => {
      const starredList = getQuizletStarred().map(s => s.toLowerCase());
      const masteredList = getMasteredWords().map(s => s.toLowerCase().trim());

      const starredCount = words.filter(w => starredList.includes(w.ru.toLowerCase())).length;
      const masteredCount = words.filter(w => masteredList.includes(w.ru.toLowerCase().trim())).length;

      // Filter and sort words
      const qNorm = dauNormalize(searchTxt);
      let filtered = words.filter(w => {
        if (filterMode === "starred" && !starredList.includes(w.ru.toLowerCase())) return false;
        if (filterMode === "mastered" && !masteredList.includes(w.ru.toLowerCase().trim())) return false;
        if (!qNorm) return true;
        const hay = dauNormalize(w.ru + " " + (w.stress || "") + " " + w.vi + " " + (w.note || "") + " " + (w.ex || "") + " " + (w.syn || ""));
        return hay.includes(qNorm);
      });

      if (sortMode === "alphabetical") {
        filtered = [...filtered].sort((a, b) => a.ru.localeCompare(b.ru, "ru"));
      }

      // Current preview card word
      if (previewIdx >= previewWords.length) previewIdx = 0;
      const curPreviewWord = previewWords[previewIdx] || words[0];
      const isCurStarred = starredList.includes(curPreviewWord.ru.toLowerCase());

      pane.innerHTML = `
        <div class="dau-vocab-test-container">
          <!-- TOP INTERACTIVE FLASHCARD PREVIEW CHUẨN PROJECT_SPEC -->
          <div class="dau-vocab-preview-box" id="dauPreviewBox">
            <div class="dau-vocab-preview-card ${previewFlipped ? "flipped" : ""}" id="dauPreviewCard">
              <!-- FRONT FACE -->
              <div class="dau-preview-face dau-preview-front">
                <div class="dau-preview-body">
                  <div class="dau-preview-word ru">${esc(curPreviewWord.stress || curPreviewWord.ru)}</div>
                  ${getWordType(curPreviewWord) ? `<div class="dau-preview-pos-line">(${esc(getWordType(curPreviewWord))})</div>` : ""}
                  <button type="button" class="dau-preview-audio-btn" id="btnPreviewAudio" title="Phát âm tiếng Nga">
                    ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 18 }) : ""}
                  </button>
                </div>
              </div>

              <!-- BACK FACE (ĐẦY ĐỦ NỘI DUNG THEO PROJECT_SPEC) -->
              <div class="dau-preview-face dau-preview-back">
                <div class="dau-preview-top">
                  <div class="dau-preview-actions">
                    <button type="button" class="dau-preview-audio-btn" id="btnPreviewAudioBack" title="Phát âm tiếng Nga">
                      ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 18 }) : ""}
                    </button>
                  </div>
                </div>
                <div class="dau-preview-body">
                  <div class="dau-preview-meaning">${esc(curPreviewWord.vi)}</div>
                  ${curPreviewWord.ex ? `
                    <div class="dau-preview-ex-wrap">
                      <div class="dau-preview-ex ru">«${esc(curPreviewWord.ex)}»</div>
                      ${curPreviewWord.ex_vi ? `<div class="dau-preview-ex-vi">${esc(curPreviewWord.ex_vi)}</div>` : ""}
                    </div>
                  ` : ""}
                  ${(curPreviewWord.collocation || curPreviewWord.verb_obj || curPreviewWord.gov || curPreviewWord.syn || curPreviewWord.ant || curPreviewWord.note) ? `
                    <div class="dau-preview-details-grid">
                      ${curPreviewWord.collocation ? `
                        <div class="dau-preview-detail-row">
                          <span class="dau-preview-detail-lbl">Cụm động từ:</span>
                          <span class="dau-preview-detail-val ru">${esc(curPreviewWord.collocation)}</span>
                        </div>
                      ` : ""}
                      ${(curPreviewWord.verb_obj || curPreviewWord.gov) ? `
                        <div class="dau-preview-detail-row">
                          <span class="dau-preview-detail-lbl">Tân ngữ trực tiếp / Quản cách:</span>
                          <span class="dau-preview-detail-val ru">${esc(curPreviewWord.verb_obj || curPreviewWord.gov)}</span>
                        </div>
                      ` : ""}
                      ${curPreviewWord.syn ? `
                        <div class="dau-preview-detail-row">
                          <span class="dau-preview-detail-lbl">Đồng nghĩa:</span>
                          <span class="dau-preview-detail-val ru">${esc(curPreviewWord.syn)}</span>
                        </div>
                      ` : ""}
                      ${curPreviewWord.ant ? `
                        <div class="dau-preview-detail-row">
                          <span class="dau-preview-detail-lbl">Trái nghĩa / Gần nghĩa:</span>
                          <span class="dau-preview-detail-val ru">${esc(curPreviewWord.ant)}</span>
                        </div>
                      ` : ""}
                      ${curPreviewWord.note ? `
                        <div class="dau-preview-detail-row">
                          <span class="dau-preview-detail-lbl">Ghi chú:</span>
                          <span class="dau-preview-detail-val">${esc(curPreviewWord.note)}</span>
                        </div>
                      ` : ""}
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>

            <!-- PREVIEW CARD CONTROLS -->
            <div class="dau-preview-nav">
              <button type="button" class="dau-preview-nav-btn" id="btnPreviewPrev" title="Từ trước (Phím ←)">‹</button>
              <div class="dau-preview-counter">${previewIdx + 1} / ${previewWords.length}</div>
              <button type="button" class="dau-preview-nav-btn" id="btnPreviewNext" title="Từ tiếp theo (Phím →)">›</button>
              <button type="button" class="dau-preview-nav-btn" id="btnPreviewAudioNav" title="Phát âm tiếng Nga">
                ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""}
              </button>
            </div>
          </div>

          <!-- THANH CÔNG CỤ LỌC CHUẨN PROJECT_SPEC (DÒNG 50) -->
          <div class="dau-vocab-toolbar">
            <div class="dau-toolbar-left">
              <h3 class="dau-toolbar-heading">
                Danh sách từ vựng <span class="dau-count-muted">(${words.length})</span>
              </h3>
            </div>

            <div class="dau-toolbar-right">
              <!-- SEARCH INPUT -->
              <div class="dau-vocab-search-wrap">
                <span class="dau-vocab-search-icon">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 14 }) : "🔍"}</span>
                <input type="text" class="dau-vocab-search-input" id="listSearchInput" placeholder="Tìm từ Nga hoặc Việt..." value="${esc(searchTxt)}" />
                ${searchTxt ? `<button type="button" class="dau-vocab-search-clear" id="listSearchClear">×</button>` : ""}
              </div>

              <!-- FILTER PILLS & CTA ĐÚNG THEO SPEC 1 (DÒNG 50) -->
              <div class="dau-vocab-pills-wrap">
                <button type="button" class="dau-vocab-pill ${showDetails ? "active" : ""}" id="btnToggleDetails" title="Bật/tắt chi tiết: cụm động từ, tân ngữ, đồng nghĩa, trái nghĩa, ghi chú">
                  <span>${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 14 }) : ""}</span> Chi tiết
                </button>
                <button type="button" class="dau-vocab-pill ${filterMode === "mastered" ? "active" : ""}" id="btnFilterMastered" ${masteredCount === 0 && filterMode !== "mastered" ? "disabled" : ""}>
                  <span>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""}</span> ✓ Đã thuộc (${masteredCount})
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-flash-cta" id="btnListToStudy" style="font-weight:700">
                  ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">⚡Flashcard ngay →</span>
                </button>
              </div>
            </div>
          </div>

          <!-- WORD ROW CARDS LIST (DauEnglish style với hỗ trợ Click mở rộng chi tiết) -->
          <div class="dau-vocab-list-wrap" id="dauVocabRowsList">
            ${filtered.length === 0 ? `
              <div class="dau-vocab-empty">
                <div style="margin-bottom:8px;color:var(--muted)">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 40 }) : ""}</div>
                <h4 style="margin:0 0 4px;font-size:1.1rem;color:var(--text)">Không tìm thấy từ vựng</h4>
                <p style="margin:0;font-size:0.88rem;color:var(--muted)">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
              </div>
            ` : filtered.map((w, idx) => {
              const isStarred = starredList.includes(w.ru.toLowerCase());
              const isMastered = masteredList.includes(w.ru.toLowerCase().trim());
              const isExpanded = showDetails;
              const displayWord = w.stress || w.ru;
              return `
                <div class="dau-vocab-row-card ${isMastered ? "mastered" : ""} ${isExpanded ? "is-expanded" : ""}" data-ru="${esc(w.ru)}" data-idx="${idx}">
                  <!-- SPEC 1: BỐ CỤC 3 PHẦN TRỰC QUAN -->
                  <div class="dau-row-main-grid">
                    <!-- CỘT 1 (TRÁI): TỪ TIẾNG NGA IN ĐẬM KÈM TRỌNG ÂM & TỪ LOẠI -->
                    <div class="dau-row-col-ru">
                      <div class="dau-row-ru-header">
                        <span class="dau-row-index">#${idx + 1}</span>
                        <span class="dau-row-ru ru">${esc(displayWord)}</span>
                      </div>
                    </div>

                    <!-- CỘT 2 (GIỮA): NGHĨA TIẾNG VIỆT & CÂU VÍ DỤ SONG NGỮ, CỤM ĐỘNG TỪ, QUẢN CÁCH, ĐỒNG/TRÁI NGHĨA, GHI CHÚ -->
                    <div class="dau-row-col-vi">
                      <div class="dau-row-vi-text">${esc(w.vi)}</div>
                      ${w.ex ? `
                        <div class="dau-row-ex-wrap">
                          <div class="dau-row-ex-line">
                            <span class="dau-row-ex ru">«${esc(w.ex)}»</span>
                          </div>
                          ${w.ex_vi ? `<div class="dau-row-ex-vi">${esc(w.ex_vi)}</div>` : ""}
                        </div>
                      ` : ""}
                      ${isExpanded ? `
                        <div class="dau-row-expanded-details">
                          ${w.collocation ? `
                            <div class="dau-row-extra-line">
                              <span class="dau-row-extra-label">Cụm động từ:</span>
                              <span class="dau-row-extra-val ru">${esc(w.collocation)}</span>
                            </div>
                          ` : ""}
                          ${(w.verb_obj || w.gov) ? `
                            <div class="dau-row-extra-line">
                              <span class="dau-row-extra-label">Tân ngữ trực tiếp / Quản cách:</span>
                              <span class="dau-row-extra-val ru">${esc(w.verb_obj || w.gov)}</span>
                            </div>
                          ` : ""}
                          ${w.syn ? `
                            <div class="dau-row-extra-line">
                              <span class="dau-row-extra-label">Đồng nghĩa:</span>
                              <span class="dau-row-extra-val ru">${esc(w.syn)}</span>
                            </div>
                          ` : ""}
                          ${w.ant ? `
                            <div class="dau-row-extra-line">
                              <span class="dau-row-extra-label">Trái nghĩa / Gần nghĩa:</span>
                              <span class="dau-row-extra-val ru">${esc(w.ant)}</span>
                            </div>
                          ` : ""}
                          ${w.note ? `
                            <div class="dau-row-extra-line">
                              <span class="dau-row-extra-label">Ghi chú:</span>
                              <span class="dau-row-extra-val">${esc(w.note)}</span>
                            </div>
                          ` : ""}
                        </div>
                      ` : (!w.ex && w.note) ? `
                        <div class="dau-row-note-short">${esc(w.note)}</div>
                      ` : ""}
                    </div>

                    <!-- CỘT 3 (PHẢI): BỘ NÚT HÀNH ĐỘNG (AUDIO, ĐÃ THUỘC, TRA CÁCH CHIA, LƯU LỌ) -->
                    <div class="dau-row-col-actions">
                      <button type="button" class="dau-action-icon-btn btn-speak-item" data-ru="${esc(w.ru)}" title="Phát âm tiếng Nga (icon volume-high)">
                        ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""}
                      </button>
                      <button type="button" class="dau-action-icon-btn btn-master-item ${isMastered ? "mastered" : ""}" data-ru="${esc(w.ru)}" title="${isMastered ? "Đã thuộc (Nhấn để hủy)" : "Đánh dấu đã thuộc"}">
                        ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""}
                      </button>
                      <button type="button" class="dau-action-icon-btn btn-addjar-item" data-ru="${esc(w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" data-ex="${esc(w.ex || "")}" title="Lưu vào Lọ cá nhân (icon archive-jar)">
                        ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""}
                      </button>
                      ${isCustomJar ? `
                        <button type="button" class="dau-action-icon-btn btn-delword-item" style="color:var(--red)" data-ru="${esc(w.ru)}" title="Xóa từ khỏi lọ này">
                          ${window.RusiIcons ? RusiIcons.get("trash-2", { size: 16 }) : ""}
                        </button>
                      ` : ""}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;

      bindListEvents();
    };

    const bindListEvents = () => {
      // Preview card flip
      const pCard = pane.querySelector("#dauPreviewCard");
      if (pCard) {
        pCard.onclick = (e) => {
          if (e.target.closest("button")) return;
          previewFlipped = !previewFlipped;
          pCard.classList.toggle("flipped", previewFlipped);
        };
      }

      // Preview Audio (hỗ trợ nút ở mặt trước, mặt sau và thanh điều khiển)
      pane.querySelectorAll(".dau-preview-audio-btn, #btnPreviewAudioNav").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const curWord = previewWords[previewIdx];
          if (curWord) speak(curWord.ru);
        };
      });

      // Preview Star
      const btnPStar = pane.querySelector("#btnPreviewStar");
      const btnPStarBack = pane.querySelector("#btnPreviewStarBack");
      const handlePStar = (e) => {
        e.stopPropagation();
        const curWord = previewWords[previewIdx];
        if (curWord) {
          const starred = toggleQuizletStarred(curWord.ru);
          btnPStar?.classList.toggle("starred", starred);
          btnPStarBack?.classList.toggle("starred", starred);
          renderListUI();
        }
      };
      if (btnPStar) btnPStar.onclick = handlePStar;
      if (btnPStarBack) btnPStarBack.onclick = handlePStar;

      // Preview Add Jar
      const btnPAdd = pane.querySelector("#btnPreviewAddJar");
      const btnPAddBack = pane.querySelector("#btnPreviewAddJarBack");
      const handlePAdd = (e) => {
        e.stopPropagation();
        const curWord = previewWords[previewIdx];
        if (curWord) {
          window.openAddToJarModal({
            ru: curWord.ru,
            vi: curWord.vi,
            note: curWord.note,
            ex: curWord.ex
          });
        }
      };
      if (btnPAdd) btnPAdd.onclick = handlePAdd;
      if (btnPAddBack) btnPAddBack.onclick = handlePAdd;

      // Preview Prev / Next
      const btnPPrev = pane.querySelector("#btnPreviewPrev");
      if (btnPPrev) {
        btnPPrev.onclick = () => {
          previewIdx = (previewIdx - 1 + previewWords.length) % previewWords.length;
          previewFlipped = false;
          renderListUI();
        };
      }

      const btnPNext = pane.querySelector("#btnPreviewNext");
      if (btnPNext) {
        btnPNext.onclick = () => {
          previewIdx = (previewIdx + 1) % previewWords.length;
          previewFlipped = false;
          renderListUI();
        };
      }

      // Search input
      const sinp = pane.querySelector("#listSearchInput");
      const sclear = pane.querySelector("#listSearchClear");
      if (sinp) {
        sinp.oninput = (e) => {
          searchTxt = e.target.value;
          renderListUI();
        };
      }
      if (sclear) {
        sclear.onclick = () => {
          searchTxt = "";
          renderListUI();
        };
      }

      // Toggle details
      const btnDetails = pane.querySelector("#btnToggleDetails");
      if (btnDetails) {
        btnDetails.onclick = () => {
          showDetails = !showDetails;
          if (!showDetails) {
            expandedWordKeys.clear();
          }
          renderListUI();
        };
      }

      // Filter starred
      const btnFStarred = pane.querySelector("#btnFilterStarred");
      if (btnFStarred) {
        btnFStarred.onclick = () => {
          filterMode = filterMode === "starred" ? "all" : "starred";
          renderListUI();
        };
      }

      // Filter mastered
      const btnFMastered = pane.querySelector("#btnFilterMastered");
      if (btnFMastered) {
        btnFMastered.onclick = () => {
          filterMode = filterMode === "mastered" ? "all" : "mastered";
          renderListUI();
        };
      }

      // Toggle sort
      const btnSort = pane.querySelector("#btnToggleSort");
      if (btnSort) {
        btnSort.onclick = () => {
          sortMode = sortMode === "original" ? "alphabetical" : "original";
          renderListUI();
        };
      }

      // Study flashcard CTA
      const btnStudy = pane.querySelector("#btnListToStudy");
      if (btnStudy) {
        btnStudy.onclick = () => switchMode("flashcard");
      }

      // Row card click to preview word in top box
      pane.querySelectorAll(".dau-vocab-row-card").forEach((card) => {
        card.onclick = (e) => {
          if (e.target.closest("button") || e.target.closest("a") || e.target.closest("input")) return;
          const ru = card.dataset.ru;
          if (!ru) return;
          const pIdx = previewWords.findIndex(pw => pw.ru === ru);
          if (pIdx !== -1) {
            previewIdx = pIdx;
            previewFlipped = false;
            renderListUI();
          }
        };
      });

      // Sync preview flashcard button
      pane.querySelectorAll(".btn-sync-preview").forEach((b) => {
        b.onclick = (e) => {
          e.stopPropagation();
          const idx = parseInt(b.dataset.idx, 10);
          const targetWord = filtered[idx];
          if (targetWord) {
            const pIdx = previewWords.findIndex(pw => pw.ru === targetWord.ru);
            if (pIdx !== -1) {
              previewIdx = pIdx;
              previewFlipped = false;
              renderListUI();
              const pBox = pane.querySelector(".dau-vocab-preview-box");
              if (pBox) pBox.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        };
      });

      // Row item actions
      pane.querySelectorAll(".btn-speak-item").forEach((b) => {
        b.onclick = (e) => {
          e.stopPropagation();
          b.classList.add("playing");
          speak(b.dataset.ru);
          setTimeout(() => b.classList.remove("playing"), 1000);
        };
      });


      pane.querySelectorAll(".btn-star-item").forEach((b) => {
        b.onclick = (e) => {
          e.stopPropagation();
          const starred = toggleQuizletStarred(b.dataset.ru);
          b.classList.toggle("starred", starred);
          renderListUI();
        };
      });

      pane.querySelectorAll(".btn-master-item").forEach((b) => {
        b.onclick = (e) => {
          e.stopPropagation();
          const isMastered = toggleMasteredWord(b.dataset.ru);
          b.classList.toggle("mastered", isMastered);
          if (isMastered) toast("Đã đánh dấu thuộc từ này!");
          renderListUI();
        };
      });

      pane.querySelectorAll(".btn-addjar-item").forEach((b) => {
        b.onclick = (e) => {
          e.stopPropagation();
          window.openAddToJarModal({
            ru: b.dataset.ru,
            vi: b.dataset.vi,
            note: b.dataset.note,
            ex: b.dataset.ex
          });
        };
      });

      if (isCustomJar) {
        pane.querySelectorAll(".btn-delword-item").forEach((b) => {
          b.onclick = (e) => {
            e.stopPropagation();
            const wordRu = b.dataset.ru;
            if (confirm(`Bạn có chắc muốn xóa từ «${wordRu}» khỏi lọ này không?`)) {
              let jars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
              const target = jars.find(j => j.id === jarId);
              if (target && target.words) {
                target.words = target.words.filter(w => (w.ru || "").trim() !== wordRu.trim());
                STORE.set("custom_jars", jars);
                toast(`Đã xóa từ «${wordRu}» khỏi lọ!`);
                words = target.words;
                previewWords = [...words];
                if (onWordListChange) onWordListChange(currentMode);
                renderListUI();
              }
            }
          };
        });
      }
    };

    renderListUI();
  };

  // Fix: activate initialMode directly so clicking "Xem từ" immediately displays the word list!
  switchMode(initialMode);
};

function initVocabPage() {
  let algorithmInited = false;

  const showMainLayout = () => {
    document.body.classList.remove("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.remove("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.add("hidden");
      detail.innerHTML = "";
    }
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const shelfHost = el("#jarsShelfHost");
    if (shelfHost) shelfHost.classList.remove("hidden");
    renderVocabHub();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.exitSrsToVocab = showMainLayout;

  const showSrsWorkspace = () => {
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
              stress: c.stress || orig.stress || c.ru || orig.ru,
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

    // Nếu chưa có thẻ đến hạn từ SRS, gom các từ cốt lõi từ các lọ để sẵn sàng học ngay
    if (!reviewWords.length) {
      allJars.forEach(j => {
        if (j.raw && Array.isArray(j.raw.words)) {
          j.raw.words.forEach(w => {
            if (reviewWords.length < 30) reviewWords.push({ ...w });
          });
        }
      });
    }

    // Mở trực tiếp không gian học Flashcard chuẩn y hệt như ở Lọ từ vựng (Chuẩn yêu cầu người dùng)
    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.remove("hidden");
      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR WITH EMBEDDED MODES (SINGLE LINE) -->
        <div class="dau-workspace-back-bar dau-quizlet-bar" id="dauQuizletBackBar">
          <button type="button" class="dau-back-btn" id="btnBackJars" title="Quay lại kho từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 16 }) : "←"} <span class="btn-text">Quay lại kho từ vựng</span>
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge dau-badge-a1">SRS</span>
            <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 18 }) : ""} Ôn tập (${reviewWords.length} từ)</span>
          </div>
          <div class="quizlet-mode-bar dau-topbar-modes" id="dauTopbarModes">
            <button type="button" class="quizlet-mode-btn" data-mode="list" title="Danh sách từ (${reviewWords.length})">
              ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách (${reviewWords.length})</span>
            </button>
            <button type="button" class="quizlet-mode-btn active" data-mode="flashcard" title="Thẻ ghi nhớ Flashcard">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Flashcard</span>
            </button>
            <button type="button" class="quizlet-mode-btn" data-mode="learn" title="Trắc nghiệm">
              ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
            </button>
            <button type="button" class="quizlet-mode-btn" data-mode="match" title="Ghép từ">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép từ</span>
            </button>
          </div>
        </div>

        <div class="workspace" style="padding:14px 4px;border:none;background:transparent;box-shadow:none">
          <div id="jarQuizletSuiteHost"></div>
        </div>
      `;

      el("#btnBackJars").onclick = () => {
        showMainLayout();
      };

      window.initQuizletSuite(el("#jarQuizletSuiteHost"), reviewWords, {
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
  let cloudJars = null;

  const loadCloudJars = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.jars.getSystemJars();
        if (remote && remote.length) {
          cloudJars = remote;
          console.log(`[Supabase] Đã kết nối & lấy ${remote.length} lọ từ vựng từ Database!`);
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
    const localJars = typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : [];
    let baseJars = localJars;
    if (cloudJars && cloudJars.length) {
      const cloudMap = new Map();
      cloudJars.forEach(j => cloudMap.set(j.code || j.id, j));
      const merged = [...cloudJars];
      localJars.forEach(j => {
        if (!cloudMap.has(j.code || j.id)) merged.push(j);
      });
      baseJars = merged;
    }
    // Loai bo toan bo lo tu ca nhan khoi danh sach bai hoc theo cap do (A1, A2...)
    const systemJars = baseJars.filter(j => j.is_system !== false && !String(j.id).startsWith("custom-"));
    const jars = systemJars.map(j => ({
      id: j.id,
      kind: "jar",
      level: j.level || "A1",
      levelName: j.levelName || (j.level === "B2" ? "Trung cấp cao B2" : j.level === "B1" ? "Trung cấp B1" : j.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
      title: j.name || j.title,
      desc: j.desc || j.description || "",
      icon: j.icon || "archive-jar",
      wordsCount: (j.words || []).length,
      is_pro_only: Boolean(j.is_pro_only || j.is_vip || (j.level === "B2" && j.id !== "jar_travel") || j.id === "jar_bank" || j.id === "jar_hospital" || j.id === "jar_dekanat"),
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

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="topic-empty-state" style="grid-column:1/-1;text-align:center;padding:48px 24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);border-radius:20px;color:#fff">
          <div style="margin-bottom:12px;color:#8dbcef">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 48 }) : ""}</div>
          <h3 style="margin:0 0 8px;color:#fff;font-size:1.2rem">Chưa có lọ từ vựng cho cấp độ này</h3>
          <p style="color:#8094a9;font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((item, idx) => {
        const isDone = Progress.doneList("vocabDone").includes(item.id);
        const isPro = Boolean(item.is_pro_only);
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String((currentPage - 1) * PAGE_SIZE + idx + 1).padStart(2, "0");
        const wordsCount = item.wordsCount || (item.words ? item.words.length : 0);
        const lessonsCount = Math.ceil(wordsCount / 10) || 1;
        const topicDesc = item.desc || `${wordsCount} từ vựng cốt lõi · ${lessonsCount} bài học`;

        const masteredSet = new Set((typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : []);
        let masteredInJar = 0;
        if (Array.isArray(item.words) && item.words.length > 0) {
          item.words.forEach(w => {
            const k = (w.ru || "").trim().toLowerCase();
            if (masteredSet.has(k)) masteredInJar++;
          });
        }
        const progressPercent = isDone ? 100 : (wordsCount > 0 ? Math.min(100, Math.round((masteredInJar / wordsCount) * 100)) : 0);
        const isFinished = isDone || (progressPercent === 100 && wordsCount > 0);

        return `
          <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .dau-card-compact (Đồng bộ toàn hệ thống, không có thanh tiến độ) -->
          <article class="dau-card dau-card-compact ${isFinished ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''}" data-vocab-id="${item.id}" data-kind="jar" data-pro="${isPro}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                ${window.RusiIcons ? RusiIcons.get(item.icon || "archive-jar", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(item.title)}</h3>
                  ${isFinished ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : ""}
                </div>
                <div class="dau-card-subinfo">
                  <span>${item.level || currentLevel}</span>
                  <span class="dau-card-sep">•</span>
                  <span class="dau-card-count">${wordsCount} từ vựng</span>
                </div>
              </div>
            </div>

            <!-- CHÂN THẺ -->
            <div class="dau-card-footer" style="margin-top:auto;padding-top:10px">
              <div class="dau-card-status">
                <span style="font-size:0.8rem;font-weight:600;color:var(--muted)">${isFinished ? "Đã hoàn thành" : isPro ? "Dành cho thành viên" : "Sẵn sàng để học"}</span>
              </div>
              <div class="topic-footer-actions">
                <button type="button" class="btn-jar-list topic-text-btn" data-jar-id="${item.id}" title="Mở danh sách Lọ từ vựng để học Flashcard Spaced Repetition">
                  ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} Lọ từ vựng
                </button>
                <button type="button" class="btn-topic-article topic-circle-btn" data-jar-id="${item.id}" title="Xem bài học chủ đề">
                  ${isPro && !isUnlocked ? (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 16 }) : "") : (window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : "")}
                </button>
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

      gridHost.querySelectorAll(".dau-card, .topic-card").forEach(card => {
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

    renderDauPagination(el("#vocabPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderVocabCards();
      const topEl = el("#vocabSection") || el("#jarsShelfHost");
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

    let section = el("#vocabSection");
    if (!section) {
      shelfHost.innerHTML = `
        <section class="vocabulary-section" id="vocabSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  CHINH PHỤC 5.000 TỪ TIẾNG NGA<br />
                  <span>Học Chủ Đề &amp; Chuỗi Hành Động</span>
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
            <div class="dau-pagination" id="vocabPagination"></div>

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
    const sidebarHost = el("#vocSidebarHost");
    if (!progressHost && !userJarsHost && !sidebarHost) return;

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
        name: "Lọ từ vựng yêu thích",
        icon: "archive-jar",
        desc: "Lọ chứa các từ vựng bạn yêu thích và đã lưu",
        words: [],
        level: "custom",
        is_system: false
      }];
      if (typeof STORE !== "undefined") STORE.set("custom_jars", customJars);
    } else {
      // Xóa dấu sao khỏi tên và đổi icon cho lọ yêu thích mặc định
      let changed = false;
      customJars.forEach(j => {
        if (j.id === "custom-jar-default") {
          const cleaned = (j.name || "Lọ từ vựng yêu thích").replace(/[★⭐*]/g, "").trim();
          if (j.name !== cleaned || j.icon !== "archive-jar") {
            j.name = cleaned;
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
          <!-- CỤM TRÁI: ICON + TIÊU ĐỀ + PHỤ ĐỀ (Figma: archive jar icon + Tiến Độ Học Ôn + Lặp lại ngắt quãng SM-2) -->
          <div class="voc-progress-figma-left">
            <span class="voc-progress-figma-icon">
              ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 20 }) : `<svg aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24"><path d="M7 3h10M8 3v4L6 9v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9l-2-2V3"></path><path d="M6 11h12"></path></svg>`}
            </span>
            <div>
              <strong class="voc-progress-figma-title">Tiến Độ</strong>
            </div>
          </div>

          <!-- 4 Ô CHỈ SỐ THỐNG KÊ (Đồng bộ màu chuẩn với trang vocabulary) -->
          <div class="voc-progress-figma-stat">
            <strong class="voc-progress-figma-num val-mastered">${stats.mastered || 0}</strong>
            <span class="voc-progress-figma-label">ĐÃ THUỘC</span>
          </div>

          <div class="voc-progress-figma-stat ${dueCount > 0 ? "is-due" : ""}">
            <strong class="voc-progress-figma-num val-due">${dueCount}</strong>
            <span class="voc-progress-figma-label">CẦN ÔN</span>
          </div>

          <div class="voc-progress-figma-stat">
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
              return `
                <div class="voc-user-jar-card" data-jar-id="${esc(j.id)}">
                  <div class="voc-user-jar-card-top">
                    <div class="voc-user-jar-card-icon">
                      ${window.RusiIcons ? RusiIcons.get(j.icon || "archive-jar", { size: 20 }) : ""}
                    </div>
                    <div style="flex:1;min-width:0">
                      <div class="voc-user-jar-card-name" title="${esc(j.name)}">${esc(j.name)}</div>
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

            <div class="voc-user-jar-card voc-user-jar-card-add" id="btnSidebarCreateJarBottom" style="border:1.5px dashed var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:110px;text-align:center">
              <span style="color:var(--primary);font-weight:700;font-size:0.95rem;display:flex;align-items:center;gap:6px">
                ${window.RusiIcons ? RusiIcons.get("plus", { size: 16 }) : ""} Thêm lọ từ vựng mới
              </span>
            </div>
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

    const btnCreateTop = el("#btnSidebarCreateJar") || el("#btnSidebarCreateJarTop");
    if (btnCreateTop) {
      btnCreateTop.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCreateJarModal();
      };
    }

    const btnCreateBottom = el("#btnSidebarCreateJarBottom");
    if (btnCreateBottom) {
      btnCreateBottom.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCreateJarModal();
      };
    }

    const jarsContainer = userJarsHost || sidebarHost;
    if (jarsContainer) {
      // Cho phép bấm trực tiếp vào bất kỳ vị trí nào trên thẻ Lọ từ vựng (bỏ qua nút tạo lọ)
      jarsContainer.querySelectorAll(".voc-user-jar-card").forEach(card => {
        if (card.id === "btnSidebarCreateJarBottom" || card.classList.contains("voc-user-jar-card-add")) return;
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
          if (confirm(`Bạn có chắc muốn xóa lọ «${jName}» không?`)) {
            let jars = STORE.get("custom_jars", []);
            jars = jars.filter(j => j.id !== jId);
            STORE.set("custom_jars", jars);
            toast(`Đã xóa lọ «${jName}»`);
            renderVocabCards();
          }
        };
      });
    }
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
      <div class="anticheat-modal-box" style="text-align:left;max-width:440px">
        <h3 style="margin-bottom:12px;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 20 }) : ""} Tạo Lọ Từ Vựng Cá Nhân</h3>
        <p style="font-size:0.85rem;color:var(--muted);margin:0 0 16px">Gom nhóm các từ vựng theo chủ đề riêng của bạn để dễ dàng ôn tập theo Spaced Repetition.</p>
        <label style="display:block;margin-bottom:16px">
          <span style="font-size:0.85rem;font-weight:700;display:block;margin-bottom:6px">Tên lọ từ vựng:</span>
          <input type="text" id="newJarName" placeholder="Ví dụ: Từ vựng KTX & Nấu ăn" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;font-size:0.95rem;box-sizing:border-box" autofocus />
        </label>
        <div style="display:flex;gap:10px;justify-content:flex-end">
          <button type="button" class="btn btn-outline btn-sm" id="cancelJar">Hủy</button>
          <button type="button" class="btn btn-primary btn-sm" id="saveJar">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Tạo lọ ngay</button>
        </div>
      </div>
    `;
    m.onclick = (e) => {
      if (e.target === m) m.remove();
    };
    document.getElementById("cancelJar").onclick = () => m.remove();
    document.getElementById("saveJar").onclick = () => {
      const name = document.getElementById("newJarName").value.trim();
      if (!name) { toast("Vui lòng nhập tên lọ từ vựng"); document.getElementById("newJarName").focus(); return; }
      const customJars = STORE.get("custom_jars", []);
      customJars.push({
        id: "custom-jar-" + Date.now(),
        name,
        icon: "archive-jar", // Mặc định không cho tạo icon
        desc: "Lọ từ vựng cá nhân do học viên tạo",
        words: [],
        level: "custom",
        is_system: false
      });
      STORE.set("custom_jars", customJars);
      toast("Đã tạo lọ từ vựng mới thành công!");
      m.remove();
      renderVocabHub();
    };
  };

const showTopicArticle = (jarId) => {
    const allJars = getVocabJars();
    const item = allJars.find(j => j.id === jarId);
    if (!item) return;
    const jar = item.raw || item;

    // Kiểm tra quyền truy cập PRO
    if (item.is_pro_only && !Monetization.isPro()) {
      Monetization.showProGateModal(
        "Nội dung dành cho PRO",
        "Nâng cấp lên gói PRO để mở khóa toàn bộ bài học chủ đề chuyên sâu, tài liệu PDF và kho từ vựng nâng cao."
      );
      return;
    }

    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (!detail) return;
    detail.classList.remove("hidden");

    // Lấy nội dung bài học chuyên sâu
    const articlesMap = (typeof TOPIC_ARTICLES !== "undefined") ? TOPIC_ARTICLES : {};
    const customArticle = jar.article || articlesMap[jar.id] || null;

    const words = jar.words || [];
    const levelBadgeClass = jar.level === "A2" ? "dau-badge-a2" : jar.level === "B1" ? "dau-badge-b1" : jar.level === "B2" ? "dau-badge-b2" : "dau-badge-a1";
    const levelLabel = jar.level === "A1" ? "Sơ cấp" : jar.level === "A2" ? "Cơ bản" : jar.level === "B1" ? "Trung cấp" : "Trung cấp cao";
    const isUserPro = Boolean(typeof Monetization !== "undefined" && Monetization.isPro && Monetization.isPro());
    const printDate = new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });

    // Tạo nội dung hội thoại mẫu
    let dialoguesHtml = "";
    if (customArticle && customArticle.dialogues && customArticle.dialogues.length) {
      dialoguesHtml = customArticle.dialogues.map((d, i) => `
        <div class="topic-dialogue-line">
          <div class="topic-speaker-avatar ${i % 2 === 0 ? 'speaker-a' : 'speaker-b'}" title="${esc(d.role || d.speaker)}">
            ${esc((d.speaker || 'AB').slice(0, 2))}
          </div>
          <div class="topic-dialogue-content">
            <div style="font-size:0.75rem;font-weight:700;color:var(--muted);margin-bottom:2px">${esc(d.speaker)} ${d.role ? `<span style="font-weight:400;font-size:0.7rem">(${esc(d.role)})</span>` : ''}</div>
            <div class="topic-dialogue-ru">${esc(d.ru)}</div>
            <div class="topic-dialogue-vi">${esc(d.vi)}</div>
          </div>
        </div>
      `).join("");
    } else {
      const sampleWords = words.slice(0, 5);
      dialoguesHtml = sampleWords.map((w, i) => `
        <div class="topic-dialogue-line">
          <div class="topic-speaker-avatar ${i % 2 === 0 ? 'speaker-a' : 'speaker-b'}">
            ${i % 2 === 0 ? 'A' : 'B'}
          </div>
          <div class="topic-dialogue-content">
            <div class="topic-dialogue-ru">${esc(w.ex || w.ru)}</div>
            <div class="topic-dialogue-vi">${esc(w.vi)} ${w.note ? `— <em>${esc(w.note)}</em>` : ''}</div>
          </div>
        </div>
      `).join("");
    }

    // Điểm ngữ pháp cốt lõi
    let grammarHtml = "";
    if (customArticle && customArticle.grammarNotes && customArticle.grammarNotes.length) {
      grammarHtml = `
        <div class="topic-grammar-cards">
          ${customArticle.grammarNotes.map(g => `
            <div class="topic-grammar-card">
              <h4>${esc(g.title)}</h4>
              <p style="white-space:pre-line">${esc(g.content)}</p>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      grammarHtml = `
        <div class="topic-grammar-cards">
          <div class="topic-grammar-card">
            <h4>1. Phân loại từ vựng &amp; Giống ngữ pháp</h4>
            <p>Ghi nhớ chính xác giống của danh từ trong chủ đề (он, она, оно) để phối hợp chuẩn xác với tính từ và đại từ chỉ định.</p>
          </div>
          <div class="topic-grammar-card">
            <h4>2. Mẫu câu ứng dụng theo ngữ cảnh</h4>
            <p>Vận dụng các cụm động từ đi kèm trong các câu ví dụ thực tế giúp hình thành phản xạ ngôn ngữ tự nhiên.</p>
          </div>
        </div>
      `;
    }

    // Bảng từ vựng chi tiết
    const vocabRowsHtml = words.map((w, idx) => `
      <tr>
        <td style="width:40px;color:#94a3b8;font-weight:700;text-align:center">${idx + 1}</td>
        <td style="min-width:140px">
          <div class="topic-word-ru">${esc(w.ru)}</div>
          ${w.note ? `<span class="topic-word-note">${esc(w.note)}</span>` : ''}
        </td>
        <td style="min-width:130px" class="topic-word-vi">${esc(w.vi)}</td>
        <td class="topic-word-ex">${w.ex ? esc(w.ex) : '—'}</td>
      </tr>
    `).join("");

    detail.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar topic-article-nav-bar no-print">
        <button type="button" class="dau-back-btn" id="btnBackFromArticle">
          ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 16 }) : ""} <span class="btn-text">Quay lại danh sách chủ đề</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${levelBadgeClass}">${jar.level || "A1"} · ${levelLabel}</span>
          <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(jar.icon || "archive-jar", { size: 20 }) : ""} ${esc(jar.name)}</span>
        </div>
        <div class="topic-article-top-actions">
          <button type="button" class="btn btn-outline btn-sm is-pro-action" id="btnPrintTopicArticle" title="${isUserPro ? "Xuất PDF / In bài học (PRO)" : "Xuất PDF bài học (Dành riêng cho Hội viên PRO)"}">
            ${isUserPro ? (window.RusiIcons ? RusiIcons.get("download", { size: 15 }) : "") : (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 15 }) : "")} <span class="btn-text">Xuất PDF</span>
            <span class="dau-pro-mini-badge" style="font-size:0.62rem;font-weight:800;background:linear-gradient(135deg,#c52233,#800020);color:#fff;padding:1px 5px;border-radius:4px;margin-left:4px">PRO</span>
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btnOpenJarFromArticleTop" title="Xem lọ từ vựng (${words.length} từ)">
            ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 15 }) : ""} <span class="btn-text">Xem lọ từ vựng (${words.length} từ)</span>
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
        <header class="topic-article-hero">
          <span class="topic-article-eyebrow">
            ${window.RusiIcons ? RusiIcons.get("book-open", { size: 14 }) : ""} BÀI HỌC CHỦ ĐỀ · ${jar.level} (${levelLabel})
          </span>
          <h1 class="topic-article-title">${esc(jar.name)}</h1>
          <p class="topic-article-desc">${esc(jar.desc || "Khám phá vốn từ vựng và mẫu câu giao tiếp then chốt về chủ đề " + jar.name)}</p>
          <div class="topic-article-meta-row">
            <span>${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} ${words.length} từ vựng cốt lõi</span>
            <span>${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} 15–20 phút học</span>
            <span>${window.RusiIcons ? RusiIcons.get("award", { size: 14 }) : ""} Chuẩn TRKI ${jar.level}</span>
          </div>
        </header>

        <!-- PHẦN 1: BỐI CẢNH & TÌNH HUỐNG THỰC TẾ -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">I</span> Bối cảnh &amp; Tình huống giao tiếp thực tế
          </h2>
          <div style="font-size:0.95rem;line-height:1.7;color:#334155;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px">
            ${customArticle && customArticle.intro ? esc(customArticle.intro) : `
              Chủ đề <strong>«${esc(jar.name)}»</strong> đóng vai trò vô cùng thiết yếu trong đời sống và giao tiếp tiếng Nga trình độ ${jar.level}. 
              Nắm vững hệ thống từ vựng và cấu trúc diễn đạt của chủ đề này giúp bạn tự tin xử lý mọi tình huống thực tế khi du học, công tác hoặc thi chứng chỉ TRKI.
            `}
          </div>
        </section>

        <!-- PHẦN 2: HỘI THOẠI MẪU & CÂU GIAO TIẾP THEN CHỐT -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">II</span> Hội thoại mẫu &amp; Mẫu câu then chốt
          </h2>
          <div class="topic-dialogue-box">
            ${dialoguesHtml}
          </div>
        </section>

        <!-- PHẦN 3: ĐIỂM NGỮ PHÁP & LƯU Ý VĂN HÓA -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">III</span> Điểm ngữ pháp &amp; Bí kíp sinh tồn
          </h2>
          ${grammarHtml}
          ${customArticle && customArticle.culturalTip ? `
            <div style="margin-top:16px;background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:10px;padding:14px 18px;font-size:0.88rem;color:#92400e;line-height:1.55">
              <strong>${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Mẹo văn hóa thực tế:</strong> ${esc(customArticle.culturalTip)}
            </div>
          ` : ''}
        </section>

        <!-- PHẦN 4: BẢNG TỪ VỰNG TRỌNG TÂM -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">IV</span> Bảng từ vựng trọng tâm (${words.length} từ)
          </h2>
          <div class="topic-vocab-table-wrapper">
            <table class="topic-vocab-table">
              <thead>
                <tr>
                  <th style="width:40px;text-align:center">#</th>
                  <th>Từ tiếng Nga</th>
                  <th>Nghĩa tiếng Việt</th>
                  <th>Ví dụ &amp; Ngữ cảnh</th>
                </tr>
              </thead>
              <tbody>
                ${vocabRowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- PHẦN 5: MỤC XEM LỌ TỪ VỰNG & LUYỆN FLASHCARD -->
        <section class="topic-article-section topic-article-footer-cta">
          <div class="topic-article-footer-cta-info">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="color:var(--russia-blue, #1757a6)">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 24 }) : ""}</span>
              <h3 style="margin:0;font-size:1.15rem;color:#0f1f38">Lọ từ vựng «${esc(jar.name)}»</h3>
            </div>
            <p>Đã sẵn sàng ghi nhớ bền vững ${words.length} từ vựng với mô hình Lọ Từ Vựng độc quyền và thuật toán Spaced Repetition (SM-2)?</p>
          </div>
          <button type="button" class="btn btn-primary" id="btnOpenJarFromArticleBottom" style="white-space:nowrap;font-weight:700;padding:12px 22px">
            ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Mở Lọ &amp; Học Flashcard ngay →
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
              "Tính năng Xuất PDF dành riêng cho Hội viên PRO",
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
    const customJars = STORE.get("custom_jars", []);
    const localJars = typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : [];
    let baseJars = localJars;
    if (cloudJars && cloudJars.length) {
      const cloudMap = new Map();
      cloudJars.forEach(j => {
        const local = localJars.find(lj => lj.id === j.id || lj.code === j.code);
        const words = (j.words && j.words.length > 0) ? j.words : (local && local.words ? local.words : []);
        cloudMap.set(j.code || j.id, { ...j, words });
      });
      const merged = Array.from(cloudMap.values());
      localJars.forEach(j => {
        if (!cloudMap.has(j.code || j.id)) merged.push(j);
      });
      baseJars = merged;
    }
    let jar = [...baseJars, ...customJars].find((j) => j.id === jarId || j.code === jarId);
    if (!jar && localJars.length > 0) {
      jar = localJars.find((j) => j.id === jarId || j.code === jarId);
    }
    if (!jar) {
      console.warn("Không tìm thấy lọ từ vựng:", jarId);
      return;
    }

    // Kiểm tra quyền truy cập PRO
    const isProJar = Boolean(jar.is_pro_only || jar.is_vip || (jar.level === "B2" && jar.id !== "jar_travel") || jar.id === "jar_bank" || jar.id === "jar_hospital" || jar.id === "jar_dekanat");
    if (isProJar && !Monetization.isPro()) {
      Monetization.showProGateModal("Nội dung dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng nâng cao và ôn tập không giới hạn.");
      return;
    }

    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (detail) {
      detail.classList.remove("hidden");
      const isCustom = jar.is_system === false || String(jar.id).startsWith("custom-") || jar.level === "custom";

      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR WITH EMBEDDED MODES (SINGLE LINE) -->
        <div class="dau-workspace-back-bar dau-quizlet-bar" id="dauQuizletBackBar">
          <button type="button" class="dau-back-btn" id="btnBackJars" title="Quay lại kho từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 16 }) : "←"} <span class="btn-text">Quay lại kho Lọ từ vựng</span>
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge ${isCustom ? "dau-badge-custom" : jar.level === "A2" ? "dau-badge-a2" : jar.level === "B1" ? "dau-badge-b1" : jar.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${isCustom ? "LỌ CỦA TÔI" : (jar.level || "A1")}</span>
            <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(jar.icon || "archive-jar", { size: 18 }) : ""} ${esc(jar.name)}</span>
          </div>

          <!-- 4 CHẾ ĐỘ HỌC TẬP GOM TRỰC TIẾP VÀO 1 DÒNG TOP BAR DUY NHẤT -->
          <div class="quizlet-mode-bar dau-topbar-modes" id="dauTopbarModes">
            <button type="button" class="quizlet-mode-btn ${initialMode === "list" ? "active" : ""}" data-mode="list" title="Danh sách từ (${(jar.words || []).length})">
              ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách (${(jar.words || []).length})</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "flashcard" ? "active" : ""}" data-mode="flashcard" title="Thẻ ghi nhớ (Flashcard)">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Flashcard</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "learn" ? "active" : ""}" data-mode="learn" title="Trắc nghiệm">
              ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
            </button>
            <button type="button" class="quizlet-mode-btn ${initialMode === "match" ? "active" : ""}" data-mode="match" title="Ghép từ">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép từ</span>
            </button>
            ${isCustom ? `
              <button type="button" class="btn btn-outline btn-sm dau-top-btn" id="btnAddWordCustom" title="Thêm từ mới">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"}</button>
              <button type="button" class="btn btn-soft btn-sm dau-top-btn" id="btnDeleteCustomJar" style="color:var(--red)" title="Xóa lọ này">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""}</button>
            ` : `
              <button type="button" class="btn btn-soft btn-sm dau-top-btn" id="btnViewArticleFromJar" title="Xem bài học chủ đề">${window.RusiIcons ? RusiIcons.get("book-open", { size: 14 }) : ""}</button>
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

      if (isCustom) {
        const btnAdd = el("#btnAddWordCustom");
        if (btnAdd) {
          btnAdd.onclick = () => openAddWordToJarModal(jar.id, () => showJarDetail(jar.id, getActiveWorkspaceMode()));
        }
        const btnDel = el("#btnDeleteCustomJar");
        if (btnDel) {
          btnDel.onclick = () => {
            if (confirm(`Bạn có chắc muốn xóa lọ «${jar.name}» không?`)) {
              let jars = STORE.get("custom_jars", []);
              jars = jars.filter(j => j.id !== jar.id);
              STORE.set("custom_jars", jars);
              toast(`Đã xóa lọ «${jar.name}» thành công!`);
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
        onWordListChange: () => {
          showJarDetail(jar.id, "list");
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showLesson = (id) => {
    const found = VOCAB_LESSONS.find(l => l.id === id);
    if (!found) return;
    document.body.classList.add("in-workspace");
    const mainLayout = el("#vocMainLayout");
    if (mainLayout) mainLayout.classList.add("hidden");
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (!detail) return;
    detail.classList.remove("hidden");

    let currentScriptIdx = 0;
    let playTimer = null;

    const renderLessonView = (activeTab = "video") => {
      detail.innerHTML = `
        <!-- STICKY TOP BACK BAR -->
        <div class="dau-workspace-back-bar">
          <button type="button" class="dau-back-btn" id="btnBackLessons">
            <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Quay lại danh sách từ vựng</span>
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge ${found.level === "A2" ? "dau-badge-a2" : found.level === "B1" ? "dau-badge-b1" : found.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${found.level || "A1"}</span>
            <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(found.scene || "book-open-blog", { size: 22 }) : ""} ${esc(found.ru)}</span>
          </div>
          <span class="dau-workspace-meta" style="font-size:0.85rem;color:var(--muted)">${found.words.length} từ vựng trọng tâm</span>
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
                    <div class="scroll-pos">${esc(w.note || "")}</div>
                  </div>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="btn btn-soft btn-sm btn-speak-w" data-ru="${esc(w.ru)}" style="padding:4px 8px" title="Phát âm">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</button>
                    <button type="button" class="btn btn-soft btn-sm btn-add-w-jar" data-ru="${esc(w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" style="padding:4px 8px" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} + Lưu</button>
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
              toast("Chúc mừng! Bạn đã hoàn thành bài học từ vựng (+20 XP)");
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
  });

  renderVocabHub();
}


/* =====================================================================
 * CHUYÊN MỤC 6: LUYỆN NGHE CHÉP CHÍNH TẢ 4 PART (CEFR FORMAT)
 * ===================================================================== */
function initListeningPage() {
  const host = el("#listenHost");
  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let currentSpeed = 1.0;
  let showSub = true;
  let currentLesson = null;
  let cloudListening = null;

  const getListeningLessons = () => {
    return (cloudListening && cloudListening.length) ? cloudListening : (typeof LISTENING_LESSONS !== "undefined" ? LISTENING_LESSONS : []);
  };

  const loadCloudListening = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.listening.getAll();
        if (remote && remote.length) {
          cloudListening = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài nghe từ Database!`);
          if (!currentLesson && !document.body.classList.contains("in-workspace")) {
            renderListeningCards();
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài nghe từ cloud:", err);
      }
    }
  };
  loadCloudListening();

  const renderListeningCards = () => {
    const gridHost = el("#lisCardsGrid");
    if (!gridHost) return;

    const all = getListeningLessons();
    const countA1 = all.filter(l => l.level === "A1").length;
    const countA2 = all.filter(l => l.level === "A2").length;
    const countB1 = all.filter(l => l.level === "B1").length;
    const countB2 = all.filter(l => l.level === "B2").length;
    const countC1 = all.filter(l => l.level === "C1").length;
    const countC2 = all.filter(l => l.level === "C2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#lisCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#lisCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#lisCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#lisCountB2"); if (cB2) cB2.textContent = countB2;
    const cC1 = el("#lisCountC1"); if (cC1) cC1.textContent = countC1;
    const cC2 = el("#lisCountC2"); if (cC2) cC2.textContent = countC2;

    // Update active class on level tabs
    host.querySelectorAll(".level-tab").forEach(b => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = all.filter(l => l.level === currentLevel);

    const doneCount = filtered.filter(l => Progress.doneList("listenDone").includes(l.id + "_check") || Progress.doneList("listenDone").includes(l.id + "_video")).length;
    const totalCount = filtered.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="topic-empty-state" style="grid-column:1/-1;text-align:center;padding:48px 24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);border-radius:20px;color:#fff">
          <div style="margin-bottom:12px;color:#8dbcef">${window.RusiIcons ? RusiIcons.get("headphones", { size: 48 }) : ""}</div>
          <h3 style="margin:0 0 8px;color:#fff;font-size:1.2rem">Chưa có bài nghe cho cấp độ này</h3>
          <p style="color:#8094a9;font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((l, idx) => {
        const isDone = Progress.doneList("listenDone").includes(l.id + "_check") || Progress.doneList("listenDone").includes(l.id + "_video");
        const isPro = l.is_pro_only || l.level === "B1" || l.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String((currentPage - 1) * PAGE_SIZE + idx + 1).padStart(2, "0");
        const qCount = (l.questions && l.questions.length) ? l.questions.length : (l.script && l.script.length) ? l.script.length : 5;
        const russianCategory = `АУДИРОВАНИЕ · ${l.level}`;

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''}" data-listen-id="${l.id}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(2,132,199,0.08);color:#0284c7">
                ${window.RusiIcons ? RusiIcons.get(l.icon || "headphones", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(l.title)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : `
                    <span class="topic-status topic-status-level" style="flex-shrink:0">${l.level}</span>
                  `}
                </div>
                <div class="dau-card-subinfo">
                  <span>${l.level}</span>
                  <span class="dau-card-sep">|</span>
                  <span class="dau-card-count">${qCount} câu</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer">
              <span style="font-size:0.84rem;color:var(--muted)">${isDone ? "Đã hoàn thành" : isPro ? "Dành cho thành viên" : "Sẵn sàng để luyện"}</span>
              <button type="button" class="btn btn-primary btn-sm btn-listen-action" data-listen-id="${l.id}" style="display:inline-flex;align-items:center;gap:6px;font-weight:700">
                ${isPro && !isUnlocked ? (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 14 }) : "") : ""} Vào luyện nghe ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : "→"}
              </button>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-listen-action").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.listenId;
          const lesson = all.find(x => x.id === id);
          if (!lesson) return;
          const isPro = lesson.is_pro_only || lesson.level === "B1" || lesson.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung nghe dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nghe trung & nâng cao kèm audio chất lượng cao.");
            return;
          }
          openListeningWorkspace(lesson);
        };
      });

      gridHost.querySelectorAll(".topic-card, .dau-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button")) return;
          const id = card.dataset.listenId;
          const lesson = all.find(x => x.id === id);
          if (!lesson) return;
          const isPro = lesson.is_pro_only || lesson.level === "B1" || lesson.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung nghe dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nghe trung & nâng cao kèm audio chất lượng cao.");
            return;
          }
          openListeningWorkspace(lesson);
        };
      });
    }

    renderDauPagination(el("#lisPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderListeningCards();
      const topEl = el("#lisSection") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    document.body.classList.remove("in-workspace");
    currentLesson = null;
    const all = getListeningLessons();
    const countA1 = all.filter(l => l.level === "A1").length;
    const countA2 = all.filter(l => l.level === "A2").length;
    const countB1 = all.filter(l => l.level === "B1").length;
    const countB2 = all.filter(l => l.level === "B2").length;

    let section = host.querySelector("#lisSection");
    if (!section) {
      host.innerHTML = `
        <section class="vocabulary-section rusi-topic-section" id="lisSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  CHINH PHỤC KỸ NĂNG NGHE<br />
                  <span>YouTube Shadowing, Nghe hiểu, Nghe chép chính tả</span>
                </h1>
              </div>
            </div>

            <div class="level-tabs" role="tablist" aria-label="Chọn cấp độ nghe" id="lisLevelTabs">
              <button class="level-tab ${currentLevel === "A1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A1">
                <span class="level-code">A1</span>
                <small>Sơ cấp</small>
                <span class="level-tab-count" id="lisCountA1">${countA1}</span>
              </button>
              <button class="level-tab ${currentLevel === "A2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A2">
                <span class="level-code">A2</span>
                <small>Cơ bản</small>
                <span class="level-tab-count" id="lisCountA2">${countA2}</span>
              </button>
              <button class="level-tab ${currentLevel === "B1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B1">
                <span class="level-code">B1</span>
                <small>Trung cấp</small>
                <span class="level-tab-count" id="lisCountB1">${countB1}</span>
              </button>
              <button class="level-tab ${currentLevel === "B2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B2">
                <span class="level-code">B2</span>
                <small>Trung cấp cao</small>
                <span class="level-tab-count" id="lisCountB2">${countB2}</span>
              </button>
              <button class="level-tab ${currentLevel === "C1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C1">
                <span class="level-code">C1</span>
                <small>Cao cấp</small>
                <span class="level-tab-count" id="lisCountC1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C2">
                <span class="level-code">C2</span>
                <small>Thành thạo</small>
                <span class="level-tab-count" id="lisCountC2">0</span>
              </button>
            </div>

            <div class="topic-grid" id="lisCardsGrid"></div>
            <div class="dau-pagination" id="lisPagination"></div>
          </div>
        </section>
      `;

      // Level tabs
      host.querySelectorAll(".level-tab").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderListeningCards();
        };
      });
    }

    renderListeningCards();
  };

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const openListeningWorkspace = (lesson, initialMode = "video") => {
    currentLesson = lesson;
    let activeMode = initialMode;
    const initializedModes = {};
    let currentSpeakTimer = null;

    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackLisList">
          <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Quay lại danh sách bài nghe</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${lesson.level === "A2" ? "dau-badge-a2" : lesson.level === "B1" ? "dau-badge-b1" : lesson.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${lesson.level}</span>
          <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(lesson.icon || "headphones", { size: 22 }) : ""} Part ${lesson.partNumber || 1} · ${esc(lesson.title)}</span>
        </div>
        <div class="dau-workspace-controls" style="display:flex;align-items:center;gap:8px;margin-left:auto;flex-wrap:wrap">
          <div class="speed-pills">
            <button class="speed-pill ${currentSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
            <button class="speed-pill ${currentSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
            <button class="speed-pill ${currentSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
          </div>
          <button class="btn btn-outline btn-sm dau-top-btn" id="btnToggleSub" title="${showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa"}">${window.RusiIcons ? RusiIcons.get("languages", { size: 15 }) : ""} <span class="btn-text">${showSub ? "Ẩn dịch" : "Dịch nghĩa"}</span></button>
          <button class="btn btn-primary btn-sm dau-top-btn" id="lisPlayAll" title="Nghe toàn bài">${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} <span class="btn-text">Nghe toàn bài</span></button>
        </div>
      </div>

      <div class="workspace" style="max-width:1080px;margin:0 auto">
        <div class="tabs" id="lisTabs" style="justify-content:center;margin:0 0 20px;flex-wrap:wrap">
          <button class="tab ${activeMode === "video" ? "active" : ""}" data-m="video">${window.RusiIcons ? RusiIcons.get("film", { size: 14 }) : ""} Shadowing Video (1-5 phút)</button>
          <button class="tab ${activeMode === "full" ? "active" : ""}" data-m="full">Nghe Full</button>
          <button class="tab ${activeMode === "blank" ? "active" : ""}" data-m="blank">Điền Từ</button>
          <button class="tab ${activeMode === "dict" ? "active" : ""}" data-m="dict">Nghe Chép Chính Tả</button>
          <button class="tab ${activeMode === "check" ? "active" : ""}" data-m="check">Trắc Nghiệm Check</button>
        </div>

        <div id="modeBody">
          <div id="lisPane_video" class="lis-mode-panel lis-mode-panel-video"></div>
          <div id="lisPane_full" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_blank" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_dict" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_check" class="lis-mode-panel hidden-pane"></div>
        </div>
      </div>
    `;

    // Unified translation toggling function - updates DOM in-place without touching video iframe
    const setTranslationVisible = (visible) => {
      showSub = visible;
      const topSubBtn = host.querySelector("#btnToggleSub");
      if (topSubBtn) topSubBtn.textContent = showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa";

      const videoSubBtn = host.querySelector("#btnToggleSubTrans");
      if (videoSubBtn) videoSubBtn.innerHTML = showSub ? ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Ẩn dịch") : ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Hiện dịch");

      const subVi = host.querySelector("#dauSubVi");
      if (subVi) {
        subVi.classList.toggle("hidden", !showSub);
        subVi.style.display = showSub ? "" : "none";
      }

      const curVi = host.querySelector("#dauCurVi");
      if (curVi) {
        curVi.classList.toggle("hidden", !showSub);
        curVi.style.display = showSub ? "" : "none";
      }

      host.querySelectorAll(".dau-item-vi").forEach((el) => {
        el.classList.toggle("hidden", !showSub);
        el.style.display = showSub ? "" : "none";
      });

      host.querySelectorAll(".line-vi").forEach((el) => {
        el.classList.toggle("hidden", !showSub);
        el.style.display = showSub ? "" : "none";
      });
    };

    // Mode switching function - switches active tab and panel without destroying video iframe
    const switchMode = (newMode) => {
      activeMode = newMode;
      host.querySelectorAll("#lisTabs [data-m]").forEach((b) => {
        b.classList.toggle("active", b.dataset.m === newMode);
      });

      const paneVideo = host.querySelector("#lisPane_video");
      const paneFull = host.querySelector("#lisPane_full");
      const paneBlank = host.querySelector("#lisPane_blank");
      const paneDict = host.querySelector("#lisPane_dict");
      const paneCheck = host.querySelector("#lisPane_check");

      // Video panel is kept mounted off-screen so YouTube player state is NOT lost and does not reset to start
      if (paneVideo) {
        if (newMode === "video") {
          paneVideo.classList.remove("panel-hidden-video");
          paneVideo.style.display = "";
          paneVideo.style.position = "";
          paneVideo.style.left = "";
          paneVideo.style.top = "";
          paneVideo.style.width = "";
          paneVideo.style.height = "";
          paneVideo.style.overflow = "";
          paneVideo.style.opacity = "";
          paneVideo.style.pointerEvents = "";
          paneVideo.style.visibility = "";
        } else {
          paneVideo.classList.add("panel-hidden-video");
          paneVideo.style.position = "absolute";
          paneVideo.style.left = "-9999px";
          paneVideo.style.top = "-9999px";
          paneVideo.style.width = "1px";
          paneVideo.style.height = "1px";
          paneVideo.style.overflow = "hidden";
          paneVideo.style.opacity = "0";
          paneVideo.style.pointerEvents = "none";
          paneVideo.style.visibility = "hidden";
        }
      }

      if (paneFull) {
        paneFull.classList.toggle("hidden-pane", newMode !== "full");
        paneFull.style.display = newMode === "full" ? "block" : "none";
        if (newMode === "full" && !initializedModes.full) {
          modeFull(paneFull, lesson);
          initializedModes.full = true;
        }
      }

      if (paneBlank) {
        paneBlank.classList.toggle("hidden-pane", newMode !== "blank");
        paneBlank.style.display = newMode === "blank" ? "block" : "none";
        if (newMode === "blank" && !initializedModes.blank) {
          modeBlank(paneBlank, lesson);
          initializedModes.blank = true;
        }
      }

      if (paneDict) {
        paneDict.classList.toggle("hidden-pane", newMode !== "dict");
        paneDict.style.display = newMode === "dict" ? "block" : "none";
        if (newMode === "dict" && !initializedModes.dict) {
          modeDict(paneDict, lesson);
          initializedModes.dict = true;
        }
      }

      if (paneCheck) {
        paneCheck.classList.toggle("hidden-pane", newMode !== "check");
        paneCheck.style.display = newMode === "check" ? "block" : "none";
        if (newMode === "check" && !initializedModes.check) {
          modeCheck(paneCheck, lesson);
          initializedModes.check = true;
        }
      }
    };

    // Back button
    el("#btnBackLisList").onclick = () => {
      if (window._dauShadowKeyHandler) {
        window.removeEventListener("keydown", window._dauShadowKeyHandler);
        window._dauShadowKeyHandler = null;
      }
      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Tab buttons
    host.querySelectorAll("#lisTabs [data-m]").forEach((b) => {
      b.addEventListener("click", () => {
        switchMode(b.dataset.m);
      });
    });

    // Speed pills in header
    host.querySelectorAll(".ws-head [data-sp]").forEach((b) => {
      b.addEventListener("click", () => {
        currentSpeed = parseFloat(b.dataset.sp);
        host.querySelectorAll(".ws-head [data-sp]").forEach((s) => s.classList.remove("active"));
        b.classList.add("active");

        // Sync with video speed pills if present
        host.querySelectorAll(".btn-yt-sp").forEach((s) => {
          s.classList.toggle("active", parseFloat(s.dataset.sp) === currentSpeed);
        });

        const iframe = host.querySelector("#lisYtIframe");
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "setPlaybackRate",
            args: [currentSpeed]
          }), "*");
        }

        toast(`Tốc độ đọc: ${currentSpeed}x`);
      });
    });

    // Subtitle toggle button in ws-head
    const subBtn = el("#btnToggleSub");
    if (subBtn) {
      subBtn.onclick = () => {
        setTranslationVisible(!showSub);
      };
    }

    // Play all button
    el("#lisPlayAll").onclick = () => {
      const full = lesson.lines.map((l) => l.ru).join(" ");
      speak(full, "ru-RU", currentSpeed);
    };

    // Initialize initial mode
    const paneVideo = host.querySelector("#lisPane_video");
    modeVideo(paneVideo, lesson, setTranslationVisible, () => activeMode);
    initializedModes.video = true;

    if (activeMode !== "video") {
      switchMode(activeMode);
    }
  };

  const modeVideo = (mb, lesson, setTranslationVisible, getActiveMode) => {
    // Default video segments (1-5 min) per level
    const defaultVideos = {
      A1: { youtubeId: "e6lFvAQp0LE", startSec: 15, endSec: 195, durationLabel: "3 phút (180 giây)" },
      A2: { youtubeId: "e6lFvAQp0LE", startSec: 200, endSec: 380, durationLabel: "3 phút (180 giây)" },
      B1: { youtubeId: "e6lFvAQp0LE", startSec: 390, endSec: 570, durationLabel: "3 phút (180 giây)" },
      B2: { youtubeId: "e6lFvAQp0LE", startSec: 15, endSec: 255, durationLabel: "4 phút (240 giây)" }
    };

    const vConfig = lesson.video || defaultVideos[lesson.level] || defaultVideos.A1;
    const ytId = vConfig.youtubeId || "e6lFvAQp0LE";
    const start = vConfig.startSec || 15;
    const end = vConfig.endSec || 195;
    const durationLabel = vConfig.durationLabel || `${Math.round((end - start) / 60)} phút`;

    const videoQuestions = (lesson.video && lesson.video.questions) || [
      {
        q: `1. Trong đoạn video giao tiếp "${lesson.title}", nhân vật chính đang ở tình huống nào?`,
        options: [
          lesson.vi || "Tình huống giao tiếp tiếng Nga đời thường",
          "Thảo luận về thời sự quốc tế và khoa học vũ trụ",
          "Hướng dẫn công thức nấu món súp truyền thống Nga",
          "Tham quan triển lãm nghệ thuật cổ điển Ermitage"
        ],
        a: 0,
        explain: `Bối cảnh chính của bài nghe là: ${lesson.vi}`
      },
      {
        q: `2. Trong đoạn hội thoại có xuất hiện câu thoại nào dưới đây?`,
        options: [
          lesson.lines[0]?.ru || "Здравствуйте! Скажите, пожалуйста...",
          "Я совершенно не понимаю ни слова по-русски.",
          "Вчера в Москве была очень снежная погода.",
          "Поезд дальнего следования отправляется через час."
        ],
        a: 0,
        explain: `Nhân vật bắt đầu cuộc trao đổi với câu: "${lesson.lines[0]?.ru || "Здравствуйте!"}"`
      },
      {
        q: `3. Từ vựng hoặc cụm từ trọng tâm nào được nhấn mạnh trong đoạn băng?`,
        options: [
          lesson.blanks?.[0]?.blank ? `Cụm từ liên quan đến: "${lesson.blanks[0].blank}"` : (lesson.lines[1]?.ru || "Hỏi thông tin và cảm ơn lịch sự"),
          "Du hành thám hiểm sao Hỏa bằng tên lửa",
          "Đổi tiền ngoại tệ tại chi nhánh ngân hàng",
          "Thủ tục cấp visa du lịch dài hạn"
        ],
        a: 0,
        explain: `Từ khóa then chốt được dùng nhiều lần trong bối cảnh giao tiếp này.`
      }
    ];

    // State for DauEnglish Shadowing Studio
    let activeSentenceIdx = 0;
    const totalSentences = lesson.lines.length;
    const scores = {};
    let localSpeed = currentSpeed || 1.0;
    let repeatCount = 1;
    let isRecRunning = false;
    let currentSpeakTimer = null;

    // Load saved scores
    for (let i = 0; i < totalSentences; i++) {
      const savedScore = STORE.get("lis_shadow_" + lesson.id + "_" + i, null);
      if (savedScore !== null) scores[i] = savedScore;
    }

    const getPassedCount = () => Object.values(scores).filter((s) => s >= 70).length;

    const curLine = lesson.lines[0] || { ru: "", vi: "", who: "" };
    const curScore = scores[0];
    const passedCount = getPassedCount();
    const progressPct = Math.round((passedCount / totalSentences) * 100);

    // Render DauEnglish-style 2-column layout ONCE - video iframe is NEVER re-created on interactions
    mb.innerHTML = `
      <div class="dau-shadow-studio">
        <!-- 2-COLUMN STUDIO WORKSPACE -->
        <div class="dau-shadow-grid">
          <!-- LEFT COLUMN: VIDEO + ACTIVE SENTENCE CARD + QUIZ -->
          <div class="dau-shadow-left-col">
            <!-- YOUTUBE VIDEO 16:9 CONTAINER WITH SUBTITLE OVERLAY -->
            <div class="dau-shadow-video-wrap">
              <iframe
                id="lisYtIframe"
                src="https://www.youtube-nocookie.com/embed/${ytId}?start=${start}&end=${end}&enablejsapi=1&rel=0&modestbranding=1"
                title="Russian Shadowing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>

              <!-- SUBTITLE OVERLAY (DauEnglish style) -->
              <div class="dau-shadow-sub-overlay" id="dauSubOverlay">
                <p class="sub-ru ru" id="dauSubRu">${esc(curLine.ru)}</p>
                <p class="sub-vi ${showSub && curLine.vi ? "" : "hidden"}" id="dauSubVi">${esc(curLine.vi || "")}</p>
              </div>
            </div>

            <!-- VIDEO CONTROLS STRIP -->
            <div class="dau-video-meta-bar">
              <div class="dau-meta-left">
                <span class="dau-meta-pill" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Thời lượng: <b>${durationLabel}</b></span>
                <span class="dau-meta-pill text-primary">${window.RusiIcons ? RusiIcons.get("target", { size: 14 }) : ""} Giọng Moscow chuẩn</span>
              </div>
              <div class="dau-meta-right">
                <span class="dau-speed-label">Tốc độ:</span>
                <div class="speed-pills">
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
                </div>
                <button type="button" class="btn btn-outline btn-sm" id="btnToggleSubTrans">
                  ${showSub ? ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Ẩn dịch") : ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Hiện dịch")}
                </button>
              </div>
            </div>

            <!-- ACTIVE SENTENCE PRACTICE CARD (SHADOWING HERO) -->
            <div class="dau-sentence-card" id="dauActiveCard">
              <div class="dau-sentence-card-head">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="dau-badge-sentence" id="dauCurSentenceIdx">Câu 1 / ${totalSentences}</span>
                  <span class="dau-speaker-pill" id="dauCurSpeaker" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} ${esc(curLine.who)}</span>
                  <span id="dauCurScoreBadgeWrap">
                    ${curScore !== undefined ? `
                      <span class="dau-score-badge ${curScore >= 70 ? "pass" : "retry"}">
                        ${curScore >= 70 ? `Đạt ${curScore}%` : `${curScore}% (luyện lại)`}
                      </span>
                    ` : ""}
                  </span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="dau-repeat-group" title="Số lần tự lặp khi nghe câu">
                    <span style="font-size:0.75rem;color:var(--muted);font-weight:600">Lặp:</span>
                    <button type="button" class="dau-repeat-btn ${repeatCount === 1 ? "active" : ""}" data-rep="1">1×</button>
                    <button type="button" class="dau-repeat-btn ${repeatCount === 2 ? "active" : ""}" data-rep="2">2×</button>
                    <button type="button" class="dau-repeat-btn ${repeatCount === 3 ? "active" : ""}" data-rep="3">3×</button>
                  </div>
                </div>
              </div>

              <!-- SENTENCE RUSSIAN & VIETNAMESE TEXT -->
              <div class="dau-sentence-text-box">
                <h3 class="dau-active-ru ru" id="dauCurRu">${esc(curLine.ru)}</h3>
                <p class="dau-active-vi ${showSub && curLine.vi ? "" : "hidden"}" id="dauCurVi">${esc(curLine.vi || "")}</p>
              </div>

              <!-- WAVEFORM AUDIO BOX -->
              <div id="shadowWaveBox" class="waveform-box">
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
              </div>

              <!-- SHADOWING ACTIONS: PLAY AUDIO & MIC BUTTON -->
              <div class="dau-sentence-actions">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                  <button type="button" class="btn btn-primary" id="btnPlayActiveLine">
                    <span>${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe câu</span>
                  </button>
                  <button type="button" class="mic-btn" id="btnMicActiveLine" title="Bấm để nói và nhận diện chấm điểm (R)">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 20 }) : ""}</button>
                  <div class="dau-mic-status" id="dauMicStatus">
                    ${curScore !== undefined ? `Điểm gần nhất: <b>${curScore}%</b>` : `Bấm nút <b>Micro</b> và đọc nhại lại câu tiếng Nga`}
                  </div>
                </div>

                <div id="dauScoreRingWrap">
                  ${curScore !== undefined ? `
                    <div class="score-ring ${curScore >= 80 ? "" : curScore >= 50 ? "mid" : "low"}" title="Độ chính xác">${curScore}%</div>
                  ` : ""}
                </div>
              </div>

              <!-- RECOGNITION HEARD BOX (FEEDBACK) -->
              <div id="dauHeardFeedback" class="dau-heard-box hidden"></div>
            </div>

            <!-- VIDEO QUIZ COMPREHENSION (Giữ nguyên vẹn 100% nội dung câu hỏi) -->
            <div class="lis-video-quiz-box" style="margin-top:20px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
                <div>
                  <h3 style="margin:0 0 4px;font-size:1.15rem;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("brain", { size: 18 }) : ""} Bài trắc nghiệm kiểm tra sau khi xem video</h3>
                  <p style="margin:0;font-size:0.85rem;color:var(--muted)">Xem kỹ đoạn trích video trên và chọn đáp án đúng nhất cho các câu hỏi sau:</p>
                </div>
                <div id="videoQuizScore" class="dau-meta-pill" style="font-weight:700;color:var(--primary)">
                  Tiến độ: 0/${videoQuestions.length} câu
                </div>
              </div>

              <div class="lis-video-questions-list">
                ${videoQuestions.map((q, qIdx) => `
                  <div class="lis-video-q-card" data-q-idx="${qIdx}">
                    <div class="lis-video-q-title">${esc(q.q)}</div>
                    <div class="lis-video-opt-list">
                      ${q.options.map((opt, optIdx) => `
                        <button type="button" class="lis-video-opt-btn" data-opt-idx="${optIdx}">
                          <span style="font-weight:700;color:var(--muted)">${String.fromCharCode(65 + optIdx)}.</span>
                          <span>${esc(opt)}</span>
                        </button>
                      `).join("")}
                    </div>
                    <div class="lis-video-feedback hidden"></div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: SENTENCES LIST (DAUENGLISH SIDE PANEL) -->
          <div class="dau-shadow-right-col">
            <div class="dau-side-header">
              <div>
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} Danh sách câu</h4>
                <span style="font-size:0.75rem;color:var(--muted)">Bấm câu để luyện ngay</span>
              </div>
              <div class="dau-side-counter">
                Đã đạt: <b id="dauSidePassed" class="text-primary">${passedCount}</b>/${totalSentences}
              </div>
            </div>

            <!-- MINI PROGRESS BAR -->
            <div class="dau-side-progress-bar">
              <div class="dau-side-progress-fill" id="dauProgressFill" style="width: ${progressPct}%"></div>
            </div>

            <!-- SCROLLABLE SENTENCE LIST -->
            <div class="dau-sentence-scroll-list" id="dauSentenceList">
              ${lesson.lines.map((l, idx) => {
                const sScore = scores[idx];
                const isActive = idx === 0;
                return `
                  <button type="button" class="dau-sentence-item ${isActive ? "active" : ""}" data-sentence-idx="${idx}">
                    <div class="dau-item-idx ${isActive ? "active" : ""}">#${idx + 1}</div>
                    <div class="dau-item-body">
                      <div class="dau-item-speaker">${esc(l.who)}</div>
                      <div class="dau-item-ru ru">${esc(l.ru)}</div>
                      <div class="dau-item-vi ${showSub && l.vi ? "" : "hidden"}">${esc(l.vi || "")}</div>
                    </div>
                    <div class="dau-item-status">
                      ${sScore !== undefined ? `
                        <span class="dau-mini-score ${sScore >= 70 ? "pass" : "retry"}">${sScore}%</span>
                      ` : `
                        <span class="dau-mini-play">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</span>
                      `}
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- STICKY BOTTOM TOOLBAR (DauEnglish style) -->
        <div class="dau-shadow-bottom-bar">
          <div class="dau-bot-left">
            <button type="button" class="btn btn-outline btn-sm" id="btnPrevSentence" disabled>
              ← Câu trước
            </button>
          </div>

          <div class="dau-bot-center">
            <button type="button" class="btn btn-primary btn-sm" id="btnBottomPlay">
              ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe lại (Space)
            </button>
            <button type="button" class="btn btn-soft btn-sm" id="btnBottomMic">
              ${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 16 }) : ""} Luyện nói (R)
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="btnNextSentence" ${totalSentences <= 1 ? "disabled" : ""}>
              Câu tiếp theo →
            </button>
          </div>

          <div class="dau-bot-right">
            <div class="dau-shortcuts-hint">
              <kbd>Space</kbd> Nghe · <kbd>R</kbd> Mic · <kbd>←</kbd> <kbd>→</kbd> Chuyển câu
            </div>
          </div>
        </div>
      </div>
    `;

    // Play active sentence with repeat and waveform animation
    const playCurrentSentence = () => {
      const curLine = lesson.lines[activeSentenceIdx];
      if (!curLine) return;
      const waveBox = mb.querySelector("#shadowWaveBox");
      if (waveBox) waveBox.classList.add("active");

      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }

      let remainingRepeats = repeatCount;
      const doSpeak = () => {
        speak(curLine.ru, "ru-RU", localSpeed);
        remainingRepeats--;
        if (remainingRepeats > 0) {
          currentSpeakTimer = setTimeout(doSpeak, 1800);
        } else {
          currentSpeakTimer = setTimeout(() => {
            if (waveBox) waveBox.classList.remove("active");
            currentSpeakTimer = null;
          }, 1500);
        }
      };
      doSpeak();
    };

    // Select sentence and update UI in place (zero lag, zero iframe reload)
    const selectSentence = (idx, autoPlay = true) => {
      if (idx < 0 || idx >= totalSentences) return;
      activeSentenceIdx = idx;
      const curLine = lesson.lines[activeSentenceIdx] || lesson.lines[0];
      const curScore = scores[activeSentenceIdx];

      // Update active card elements in place without touching iframe
      const idxEl = mb.querySelector("#dauCurSentenceIdx");
      if (idxEl) idxEl.textContent = `Câu ${activeSentenceIdx + 1} / ${totalSentences}`;

      const speakerEl = mb.querySelector("#dauCurSpeaker");
      if (speakerEl) speakerEl.innerHTML = (window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : "") + " " + esc(curLine.who);

      const badgeWrap = mb.querySelector("#dauCurScoreBadgeWrap");
      if (badgeWrap) {
        badgeWrap.innerHTML = curScore !== undefined ? `
          <span class="dau-score-badge ${curScore >= 70 ? "pass" : "retry"}">
            ${curScore >= 70 ? `Đạt ${curScore}%` : `${curScore}% (luyện lại)`}
          </span>
        ` : "";
      }

      const ruEl = mb.querySelector("#dauCurRu");
      if (ruEl) ruEl.textContent = curLine.ru;

      const viEl = mb.querySelector("#dauCurVi");
      if (viEl) {
        viEl.textContent = curLine.vi || "";
        viEl.classList.toggle("hidden", !showSub || !curLine.vi);
      }

      const subRu = mb.querySelector("#dauSubRu");
      if (subRu) subRu.textContent = curLine.ru;

      const subVi = mb.querySelector("#dauSubVi");
      if (subVi) {
        subVi.textContent = curLine.vi || "";
        subVi.classList.toggle("hidden", !showSub || !curLine.vi);
      }

      const micStatus = mb.querySelector("#dauMicStatus");
      if (micStatus) {
        micStatus.innerHTML = curScore !== undefined ? `Điểm gần nhất: <b>${curScore}%</b>` : `Bấm nút <b>Micro</b> và đọc nhại lại câu tiếng Nga`;
      }

      const scoreRingWrap = mb.querySelector("#dauScoreRingWrap");
      if (scoreRingWrap) {
        scoreRingWrap.innerHTML = curScore !== undefined ? `
          <div class="score-ring ${curScore >= 80 ? "" : curScore >= 50 ? "mid" : "low"}" title="Độ chính xác">${curScore}%</div>
        ` : "";
      }

      const heardBox = mb.querySelector("#dauHeardFeedback");
      if (heardBox) {
        heardBox.classList.add("hidden");
        heardBox.innerHTML = "";
      }

      const waveBox = mb.querySelector("#shadowWaveBox");
      if (waveBox) waveBox.classList.remove("active");

      // Bottom bar buttons
      const btnPrev = mb.querySelector("#btnPrevSentence");
      if (btnPrev) btnPrev.disabled = activeSentenceIdx === 0;

      const btnNext = mb.querySelector("#btnNextSentence");
      if (btnNext) btnNext.disabled = activeSentenceIdx === totalSentences - 1;

      // Sentence list highlight
      mb.querySelectorAll(".dau-sentence-item").forEach((item) => {
        const itemIdx = parseInt(item.dataset.sentenceIdx, 10);
        const isAct = itemIdx === activeSentenceIdx;
        item.classList.toggle("active", isAct);
        const numBox = item.querySelector(".dau-item-idx");
        if (numBox) numBox.classList.toggle("active", isAct);
      });

      const list = mb.querySelector("#dauSentenceList");
      const activeItem = mb.querySelector(`.dau-sentence-item[data-sentence-idx="${activeSentenceIdx}"]`);
      if (list && activeItem) {
        const itemTop = activeItem.offsetTop - list.offsetTop;
        list.scrollTo({ top: Math.max(0, itemTop - 20), behavior: "smooth" });
      }

      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }

      if (autoPlay) {
        playCurrentSentence();
      }
    };

    // Microphone shadowing recording & evaluation
    const triggerMicShadowing = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        toast("Trình duyệt không hỗ trợ nhận dạng giọng nói — hãy dùng Chrome hoặc Edge.");
        return;
      }
      if (isRecRunning) return;

      const curLine = lesson.lines[activeSentenceIdx];
      if (!curLine) return;

      const micBtn = mb.querySelector("#btnMicActiveLine");
      const bottomMicBtn = mb.querySelector("#btnBottomMic");
      const micStatus = mb.querySelector("#dauMicStatus");
      const waveBox = mb.querySelector("#shadowWaveBox");
      const heardBox = mb.querySelector("#dauHeardFeedback");
      const scoreRingWrap = mb.querySelector("#dauScoreRingWrap");

      isRecRunning = true;
      if (micBtn) micBtn.classList.add("rec");
      if (bottomMicBtn) bottomMicBtn.classList.add("btn-danger");
      if (waveBox) waveBox.classList.add("active");
      if (micStatus) micStatus.innerHTML = (window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 14 }) : "") + " <i>Đang nghe... hãy đọc to câu tiếng Nga trên</i>";

      const rec = new SR();
      rec.lang = "ru-RU";
      rec.interimResults = false;
      rec.maxAlternatives = 3;

      rec.onresult = (ev) => {
        const heard = ev.results[0][0].transcript;
        const sim = similarity(heard, curLine.ru);

        scores[activeSentenceIdx] = sim;
        STORE.set("lis_shadow_" + lesson.id + "_" + activeSentenceIdx, sim);

        if (scoreRingWrap) {
          scoreRingWrap.innerHTML = `<div class="score-ring ${sim >= 80 ? "" : sim >= 50 ? "mid" : "low"}" title="Độ chính xác">${sim}%</div>`;
        }

        if (heardBox) {
          heardBox.classList.remove("hidden");
          heardBox.innerHTML = `
            <div style="font-size:0.85rem">
              AI nghe được: <b style="color:var(--text)">"${esc(heard)}"</b>
              <span class="dau-sim-pill ${sim >= 70 ? "pass" : "retry"}">${sim}% khớp</span>
            </div>
          `;
        }

        if (micStatus) {
          micStatus.innerHTML = sim >= 70 ?
            `${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} <b style="color:var(--green)">Xuất sắc! Đạt ${sim}%</b>` :
            `${window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 16 }) : ""} <b>Đạt ${sim}%</b> — nghe lại và thử phát âm rõ hơn nhé`;
        }

        // Award XP if first time passed
        if (sim >= 70) {
          const passKey = lesson.id + "_shadow_" + activeSentenceIdx;
          if (!Progress.doneList("listenDone").includes(passKey)) {
            Progress.markDone("listenDone", passKey);
            Progress.addXp(10);
            toast("Tuyệt vời! Phát âm chuẩn (+10 XP)");
          }
        }

        // Update active sentence score badge in card head
        const badgeWrap = mb.querySelector("#dauCurScoreBadgeWrap");
        if (badgeWrap) {
          badgeWrap.innerHTML = `
            <span class="dau-score-badge ${sim >= 70 ? "pass" : "retry"}">
              ${sim >= 70 ? `Đạt ${sim}%` : `${sim}% (luyện lại)`}
            </span>
          `;
        }

        // Update side panel counters
        const passedCount = getPassedCount();
        const sidePassedEl = mb.querySelector("#dauSidePassed");
        const progFill = mb.querySelector("#dauProgressFill");
        if (sidePassedEl) sidePassedEl.textContent = passedCount;
        if (progFill) progFill.style.width = Math.round((passedCount / totalSentences) * 100) + "%";

        // Update active item status in list
        const activeListItem = mb.querySelector(`.dau-sentence-item[data-sentence-idx="${activeSentenceIdx}"] .dau-item-status`);
        if (activeListItem) {
          activeListItem.innerHTML = `<span class="dau-mini-score ${sim >= 70 ? "pass" : "retry"}">${sim}%</span>`;
        }
      };

      rec.onerror = (err) => {
        console.warn("SpeechRec error:", err);
        if (micStatus) micStatus.innerHTML = (window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 14 }) : "") + " Chưa nhận diện được âm thanh. Hãy thử lại.";
      };

      rec.onend = () => {
        isRecRunning = false;
        if (micBtn) micBtn.classList.remove("rec");
        if (bottomMicBtn) bottomMicBtn.classList.remove("btn-danger");
        if (waveBox) waveBox.classList.remove("active");
      };

      try {
        rec.start();
      } catch (err) {
        isRecRunning = false;
        if (micBtn) micBtn.classList.remove("rec");
        if (bottomMicBtn) bottomMicBtn.classList.remove("btn-danger");
        if (waveBox) waveBox.classList.remove("active");
      }
    };

    // Bind all interactive events
    const bindShadowingEvents = () => {
      // Play sentence button
      const btnPlay = mb.querySelector("#btnPlayActiveLine");
      if (btnPlay) btnPlay.onclick = () => playCurrentSentence();

      const btnBottomPlay = mb.querySelector("#btnBottomPlay");
      if (btnBottomPlay) btnBottomPlay.onclick = () => playCurrentSentence();

      // Mic buttons
      const btnMic = mb.querySelector("#btnMicActiveLine");
      if (btnMic) btnMic.onclick = () => triggerMicShadowing();

      const btnBottomMic = mb.querySelector("#btnBottomMic");
      if (btnBottomMic) btnBottomMic.onclick = () => triggerMicShadowing();

      // Prev / Next buttons
      const btnPrev = mb.querySelector("#btnPrevSentence");
      if (btnPrev) btnPrev.onclick = () => selectSentence(activeSentenceIdx - 1);

      const btnNext = mb.querySelector("#btnNextSentence");
      if (btnNext) btnNext.onclick = () => selectSentence(activeSentenceIdx + 1);

      // Repeat buttons
      mb.querySelectorAll(".dau-repeat-btn").forEach((btn) => {
        btn.onclick = () => {
          repeatCount = parseInt(btn.dataset.rep, 10);
          mb.querySelectorAll(".dau-repeat-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          toast(`Tự động lặp lại: ${repeatCount} lần`);
        };
      });

      // Speed pills
      mb.querySelectorAll(".btn-yt-sp").forEach((btn) => {
        btn.onclick = () => {
          localSpeed = parseFloat(btn.dataset.sp);
          currentSpeed = localSpeed;
          mb.querySelectorAll(".btn-yt-sp").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          // Sync with header speed pills
          host.querySelectorAll(".ws-head [data-sp]").forEach((s) => {
            s.classList.toggle("active", parseFloat(s.dataset.sp) === localSpeed);
          });

          const iframe = mb.querySelector("#lisYtIframe");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({
              event: "command",
              func: "setPlaybackRate",
              args: [localSpeed]
            }), "*");
          }
          toast(`Tốc độ phát: ${localSpeed}x`);
        };
      });

      // Toggle translation button in video bar
      const btnSub = mb.querySelector("#btnToggleSubTrans");
      if (btnSub) {
        btnSub.onclick = () => {
          setTranslationVisible(!showSub);
        };
      }

      // Sentence list item click
      mb.querySelectorAll(".dau-sentence-item").forEach((item) => {
        item.onclick = () => {
          const sIdx = parseInt(item.dataset.sentenceIdx, 10);
          selectSentence(sIdx, true);
        };
      });

      // Quiz comprehension evaluation
      let answeredCount = 0;
      let correctCount = 0;
      const scorePill = mb.querySelector("#videoQuizScore");

      mb.querySelectorAll(".lis-video-q-card").forEach((card, qIdx) => {
        const qData = videoQuestions[qIdx];
        const optBtns = card.querySelectorAll(".lis-video-opt-btn");
        const fbBox = card.querySelector(".lis-video-feedback");

        optBtns.forEach((btn) => {
          btn.onclick = () => {
            if (card.dataset.answered === "true") return;
            card.dataset.answered = "true";
            answeredCount++;

            const selectedIdx = parseInt(btn.dataset.optIdx, 10);
            const isCorrect = selectedIdx === qData.a;

            if (isCorrect) {
              btn.classList.add("correct");
              correctCount++;
            } else {
              btn.classList.add("wrong");
              optBtns[qData.a]?.classList.add("correct");
            }

            if (fbBox) {
              fbBox.classList.remove("hidden");
              fbBox.style.background = isCorrect ? "#ecfdf5" : "#fef2f2";
              fbBox.style.color = isCorrect ? "#065f46" : "#991b1b";
              fbBox.style.border = isCorrect ? "1px solid #10b981" : "1px solid #ef4444";
              fbBox.innerHTML = `
                <div style="font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:4px">${isCorrect ? `${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Chính xác!` : `${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""} Chưa chính xác!`}</div>
                <div>${esc(qData.explain)}</div>
              `;
            }

            if (scorePill) {
              scorePill.textContent = `Đúng: ${correctCount}/${answeredCount} (Tổng ${videoQuestions.length} câu)`;
            }

            if (answeredCount === videoQuestions.length) {
              const pct = (correctCount / videoQuestions.length) * 100;
              if (pct >= 60) {
                const key = lesson.id + "_video";
                if (!Progress.doneList("listenDone").includes(key)) {
                  Progress.addXp(20);
                  Progress.markDone("listenDone", key);
                }
                toast(`Xuất sắc! Bạn trả lời đúng ${correctCount}/${videoQuestions.length} câu (+20 XP)!`);
              } else {
                toast(`Bạn đạt ${correctCount}/${videoQuestions.length} câu. Hãy xem lại video để hiểu rõ hơn nhé!`);
              }
            }
          };
        });
      });
    };

    // Keyboard navigation handler (DauEnglish shortcuts)
    const handleKeyNav = (e) => {
      if (typeof getActiveMode === "function" && getActiveMode() !== "video") return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) || e.target.isContentEditable) return;
      if (e.code === "Space") {
        e.preventDefault();
        playCurrentSentence();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        triggerMicShadowing();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeSentenceIdx > 0) selectSentence(activeSentenceIdx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeSentenceIdx < totalSentences - 1) selectSentence(activeSentenceIdx + 1);
      }
    };

    if (window._dauShadowKeyHandler) {
      window.removeEventListener("keydown", window._dauShadowKeyHandler);
      window._dauShadowKeyHandler = null;
    }
    window._dauShadowKeyHandler = handleKeyNav;
    window.addEventListener("keydown", handleKeyNav);

    // Initial event binding
    bindShadowingEvents();
  };

  const modeFull = (mb, lesson) => {
    mb.innerHTML = lesson.lines
      .map(
        (l) => `
      <div class="dialogue-line">
        <span class="who">${esc(l.who)}</span>
        <span class="line-ru ru">${esc(l.ru)}
          <button class="btn btn-outline btn-sm speak-line" style="margin-left:8px;padding:2px 10px">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</button>
        </span>
        <span class="line-vi ${showSub && l.vi ? "" : "hidden"}">${esc(l.vi || "")}</span>
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
        <p style="color:var(--muted);font-size:.85rem;display:flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Gợi ý: ${esc(b.hint)}</p>
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
        toast("Xuất sắc! Điền đúng 100% (+15 XP)");
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
          <button class="btn btn-soft btn-sm play-dict">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} <span class="btn-text">Nghe</span> câu ${i + 1}</button>
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
 * CHUYÊN MỤC 7: LUYỆN NÓI SHADOWING & AI CHẤM ÂM VỊ
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
  let cloudSpeaking = null;

  const getSpeakingSets = () => {
    return (cloudSpeaking && cloudSpeaking.length) ? cloudSpeaking : (typeof SPEAKING_SETS !== "undefined" ? SPEAKING_SETS : []);
  };

  const loadCloudSpeaking = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.speaking.getAll();
        if (remote && remote.length) {
          cloudSpeaking = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài nói từ Database!`);
          if (!document.body.classList.contains("in-workspace")) {
            renderSpeakingCards();
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài nói từ cloud:", err);
      }
    }
  };
  loadCloudSpeaking();

  const renderSpeakingCards = () => {
    const gridHost = el("#spCardsGrid");
    if (!gridHost) return;

    const all = getSpeakingSets();
    const countA1 = all.filter(s => s.level === "A1").length;
    const countA2 = all.filter(s => s.level === "A2").length;
    const countB1 = all.filter(s => s.level === "B1").length;
    const countB2 = all.filter(s => s.level === "B2").length;
    const countC1 = all.filter(s => s.level === "C1").length;
    const countC2 = all.filter(s => s.level === "C2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#spCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#spCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#spCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#spCountB2"); if (cB2) cB2.textContent = countB2;
    const cC1 = el("#spCountC1"); if (cC1) cC1.textContent = countC1;
    const cC2 = el("#spCountC2"); if (cC2) cC2.textContent = countC2;

    // Update active class on level tabs
    host.querySelectorAll(".level-tab").forEach(b => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = all.filter(s => s.level === currentLevel);

    const doneCount = filtered.filter(s => Progress.doneList("speakDone").includes(s.id)).length;
    const totalCount = filtered.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="topic-empty-state" style="grid-column:1/-1;text-align:center;padding:48px 24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);border-radius:20px;color:#fff">
          <div style="margin-bottom:12px;color:#8dbcef">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 48 }) : ""}</div>
          <h3 style="margin:0 0 8px;color:#fff;font-size:1.2rem">Chưa có bài nói cho cấp độ này</h3>
          <p style="color:#8094a9;font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((s, idx) => {
        const isDone = Progress.doneList("speakDone").includes(s.id);
        const isPro = s.is_pro_only || s.level === "B1" || s.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String((currentPage - 1) * PAGE_SIZE + idx + 1).padStart(2, "0");
        const russianCategory = `ГОВОРЕНИЕ · ${s.level}`;

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''}" data-speak-id="${s.id}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(234,88,12,0.08);color:#ea580c">
                ${window.RusiIcons ? RusiIcons.get(s.icon || "mic-speaking", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(s.title)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : `
                    <span class="topic-status topic-status-level" style="flex-shrink:0">${s.level}</span>
                  `}
                </div>
                <div class="dau-card-subinfo">
                  <span>${s.level}</span>
                  <span class="dau-card-sep">|</span>
                  <span class="dau-card-count">${(s.items || []).length} câu</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer">
              <span style="font-size:0.84rem;color:var(--muted)">${isDone ? "Đã luyện tập" : isPro ? "Dành cho thành viên" : "Sẵn sàng để nói"}</span>
              <button type="button" class="btn btn-primary btn-sm btn-speak-action" data-speak-id="${s.id}" style="display:inline-flex;align-items:center;gap:6px;font-weight:700">
                ${isPro && !isUnlocked ? (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 14 }) : "") : ""} Luyện nói ngay ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : "→"}
              </button>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-speak-action").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.speakId;
          const s = all.find(x => x.id === id);
          if (!s) return;
          const isPro = s.is_pro_only || s.level === "B1" || s.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung luyện nói dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn.");
            return;
          }
          openSpeakingWorkspace(s);
        };
      });

      gridHost.querySelectorAll(".topic-card, .dau-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button")) return;
          const id = card.dataset.speakId;
          const s = all.find(x => x.id === id);
          if (!s) return;
          const isPro = s.is_pro_only || s.level === "B1" || s.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung luyện nói dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nói chuyên sâu kèm trợ lý AI sửa phát âm chuẩn.");
            return;
          }
          openSpeakingWorkspace(s);
        };
      });
    }

    renderDauPagination(el("#spPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderSpeakingCards();
      const topEl = el("#spSection") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    const all = getSpeakingSets();
    const countA1 = all.filter(s => s.level === "A1").length;
    const countA2 = all.filter(s => s.level === "A2").length;
    const countB1 = all.filter(s => s.level === "B1").length;
    const countB2 = all.filter(s => s.level === "B2").length;

    let section = host.querySelector("#spSection");
    if (!section) {
      host.innerHTML = `
        <section class="vocabulary-section rusi-topic-section" id="spSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  LUYỆN NÓI SHADOWING<br />
                  <span>Shadowing, AI chấm điểm, phân tích phát âm</span>
                </h1>
              </div>
            </div>

            <div class="level-tabs" role="tablist" aria-label="Chọn cấp độ nói" id="spLevelTabs">
              <button class="level-tab ${currentLevel === "A1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A1">
                <span class="level-code">A1</span>
                <small>Sơ cấp</small>
                <span class="level-tab-count" id="spCountA1">${countA1}</span>
              </button>
              <button class="level-tab ${currentLevel === "A2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A2">
                <span class="level-code">A2</span>
                <small>Cơ bản</small>
                <span class="level-tab-count" id="spCountA2">${countA2}</span>
              </button>
              <button class="level-tab ${currentLevel === "B1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B1">
                <span class="level-code">B1</span>
                <small>Trung cấp</small>
                <span class="level-tab-count" id="spCountB1">${countB1}</span>
              </button>
              <button class="level-tab ${currentLevel === "B2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B2">
                <span class="level-code">B2</span>
                <small>Trung cấp cao</small>
                <span class="level-tab-count" id="spCountB2">${countB2}</span>
              </button>
              <button class="level-tab ${currentLevel === "C1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C1">
                <span class="level-code">C1</span>
                <small>Cao cấp</small>
                <span class="level-tab-count" id="spCountC1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C2">
                <span class="level-code">C2</span>
                <small>Thành thạo</small>
                <span class="level-tab-count" id="spCountC2">0</span>
              </button>
            </div>

            <div class="topic-grid" id="spCardsGrid"></div>
            <div class="dau-pagination" id="spPagination"></div>
          </div>
        </section>
      `;

      // Level tabs
      host.querySelectorAll(".level-tab").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderSpeakingCards();
        };
      });
    }

    document.body.classList.remove("in-workspace");
    renderSpeakingCards();
  };

  const openSpeakingWorkspace = (set) => {
    document.body.classList.add("in-workspace");
    const todayKey = "speak_today_" + new Date().toDateString();
    const attemptsToday = STORE.get(todayKey, 0);

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackSpList">
          <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Quay lại danh sách chủ đề nói</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${set.level === "A2" ? "dau-badge-a2" : set.level === "B1" ? "dau-badge-b1" : set.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${set.level}</span>
          <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(set.icon || "mic-speaking", { size: 22 }) : ""} ${esc(set.title)}</span>
        </div>
        <div class="dau-workspace-meta" style="font-size:0.85rem;color:var(--muted);margin-left:auto">
          Đã luyện hôm nay: <b>${attemptsToday}/2 lượt miễn phí</b> ${Monetization.isPro() ? '<b style="color:var(--green)">(PRO Không giới hạn)</b>' : ""}
        </div>
      </div>

      <div class="workspace" style="max-width:920px;margin:0 auto">
        <div style="text-align:center;margin-bottom:18px">
          <p style="color:var(--muted);font-size:0.92rem;margin:0;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} ${esc(set.phonemeTarget || "Bấm nút nghe để nghe phát âm mẫu, sau đó bấm nút micro và đọc to câu tiếng Nga.")}</p>
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
            <div class="speak-item" data-i="${i}" style="text-align:center">
              <p class="target ru" style="font-size:1.35rem;font-weight:700;line-height:1.55;margin-bottom:8px">
                ${esc(item.ru)} <button type="button" class="btn btn-outline btn-sm btn-tts" style="margin-left:8px;vertical-align:middle">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} <span class="btn-text">Nghe mẫu</span></button>
              </p>
              <p class="target-vi" style="font-size:0.95rem;margin-bottom:14px;color:var(--muted)">${esc(item.vi)}</p>
              <div style="display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:10px">
                <button class="mic-btn" aria-label="Nói">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 22 }) : ""}</button>
                ${best !== null ? `<div class="score-ring ${best >= 80 ? "" : best >= 50 ? "mid" : "low"}" title="Kết quả tốt nhất">${best}%</div>` : ""}
                <span class="speak-status" style="color:var(--muted);font-size:.88rem">Bấm mic và đọc câu tiếng Nga</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    el("#btnBackSpList").onclick = () => {
      document.body.classList.remove("in-workspace");
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
            Monetization.showProGateModal("Lượt luyện nói hôm nay đã hết", "Bạn đã dùng hết 2 lượt luyện nói miễn phí hôm nay. Nâng cấp lên gói PRO để mở khóa AI chấm âm vị không giới hạn số lượt.");
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
        status.innerHTML = (window.RusiIcons ? RusiIcons.get("waveform-audio", { size: 14 }) : "") + " Đang nghe... hãy đọc rõ từng từ câu trên";
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
              ${window.RusiIcons ? RusiIcons.get("bot-rusika", { size: 16 }) : ""} AI nhận dạng: <b class="ru" style="color:var(--primary)">${esc(heard)}</b><br>
              ${window.RusiIcons ? RusiIcons.get("target", { size: 16 }) : ""} Độ chuẩn âm vị: <b>${sim}%</b> ${sim >= 80 ? "— Phát âm rất chuẩn!" : "— Lưu ý trọng âm và biến âm"}
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
          status.textContent = sim >= 80 ? "Xuất sắc! Luyện tiếp câu dưới nhé" : "Bấm nghe lại mẫu rồi thử lại nhé!";
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
 * CHUYÊN MỤC 5: LUYỆN VIẾT TẢ TRANH (ПИСЬМО TRKI) & BÀN PHÍM ẢO CYRILLIC
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
  let cloudWriting = null;

  const getWritingTasks = () => {
    return (cloudWriting && cloudWriting.length) ? cloudWriting : (typeof WRITING_TASKS !== "undefined" ? WRITING_TASKS : []);
  };

  const loadCloudWriting = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.writing.getAll();
        if (remote && remote.length) {
          cloudWriting = remote;
          console.log(`[Supabase] Đã tải ${remote.length} đề viết từ Database!`);
          if (!document.body.classList.contains("in-workspace")) {
            renderWritingCards();
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải đề viết từ cloud:", err);
      }
    }
  };
  loadCloudWriting();

  const renderWritingCards = () => {
    const gridHost = el("#wCardsGrid");
    if (!gridHost) return;

    const all = getWritingTasks();
    const countA1 = all.filter(t => t.level === "A1").length;
    const countA2 = all.filter(t => t.level === "A2").length;
    const countB1 = all.filter(t => t.level === "B1").length;
    const countB2 = all.filter(t => t.level === "B2").length;
    const countC1 = all.filter(t => t.level === "C1").length;
    const countC2 = all.filter(t => t.level === "C2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#wCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#wCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#wCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#wCountB2"); if (cB2) cB2.textContent = countB2;
    const cC1 = el("#wCountC1"); if (cC1) cC1.textContent = countC1;
    const cC2 = el("#wCountC2"); if (cC2) cC2.textContent = countC2;

    // Update active class on level tabs
    host.querySelectorAll(".level-tab").forEach(b => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = all.filter(t => t.level === currentLevel);

    const doneCount = filtered.filter(t => Progress.doneList("writeDone").includes(t.id)).length;
    const totalCount = filtered.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="topic-empty-state" style="grid-column:1/-1;text-align:center;padding:48px 24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);border-radius:20px;color:#fff">
          <div style="margin-bottom:12px;color:#8dbcef">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 48 }) : ""}</div>
          <h3 style="margin:0 0 8px;color:#fff;font-size:1.2rem">Chưa có đề viết cho cấp độ này</h3>
          <p style="color:#8094a9;font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((t, idx) => {
        const isDone = Progress.doneList("writeDone").includes(t.id);
        const isPro = t.is_pro_only || t.level === "B1" || t.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String((currentPage - 1) * PAGE_SIZE + idx + 1).padStart(2, "0");
        const russianCategory = `ПИСЬМО · ${t.level}`;

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''}" data-write-id="${t.id}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                ${window.RusiIcons ? RusiIcons.get(t.icon || "pen-tool", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(t.title)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : `
                    <span class="topic-status topic-status-level" style="flex-shrink:0">${t.level}</span>
                  `}
                </div>
                <div class="dau-card-subinfo">
                  <span>${t.level}</span>
                  <span class="dau-card-sep">|</span>
                  <span class="dau-card-count">${t.minWords || 40} từ</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer">
              <span style="font-size:0.84rem;color:var(--muted)">${isDone ? "Đã nộp bài" : isPro ? "Dành cho thành viên" : "Sẵn sàng làm bài"}</span>
              <button type="button" class="btn btn-primary btn-sm btn-write-action" data-write-id="${t.id}" style="display:inline-flex;align-items:center;gap:6px;font-weight:700">
                ${isPro && !isUnlocked ? (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 14 }) : "") : ""} Bắt đầu viết ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : "→"}
              </button>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-write-action").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.writeId;
          const task = all.find(x => x.id === id);
          if (!task) return;
          const isPro = task.is_pro_only || task.level === "B1" || task.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề luyện viết dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ đề thi viết TRKI chuyên sâu và trợ lý AI chữa ngữ pháp không giới hạn.");
            return;
          }
          openWritingWorkspace(task);
        };
      });

      gridHost.querySelectorAll(".topic-card, .dau-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button")) return;
          const id = card.dataset.writeId;
          const task = all.find(x => x.id === id);
          if (!task) return;
          const isPro = task.is_pro_only || task.level === "B1" || task.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề luyện viết dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ đề thi viết TRKI chuyên sâu và trợ lý AI chữa ngữ pháp không giới hạn.");
            return;
          }
          openWritingWorkspace(task);
        };
      });
    }

    renderDauPagination(el("#wPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderWritingCards();
      const topEl = el("#wSection") || host;
      if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderHub = () => {
    const all = getWritingTasks();
    const countA1 = all.filter(t => t.level === "A1").length;
    const countA2 = all.filter(t => t.level === "A2").length;
    const countB1 = all.filter(t => t.level === "B1").length;
    const countB2 = all.filter(t => t.level === "B2").length;

    let section = host.querySelector("#wSection");
    if (!section) {
      host.innerHTML = `
        <section class="vocabulary-section rusi-topic-section" id="wSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  LUYỆN VIẾT CHUẨN TRKI<br />
                  <span>Tả tranh, viết tóm tắt, viết theo chủ đề</span>
                </h1>
              </div>
            </div>

            <div class="level-tabs" role="tablist" aria-label="Chọn cấp độ viết" id="wLevelTabs">
              <button class="level-tab ${currentLevel === "A1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A1">
                <span class="level-code">A1</span>
                <small>Sơ cấp</small>
                <span class="level-tab-count" id="wCountA1">${countA1}</span>
              </button>
              <button class="level-tab ${currentLevel === "A2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A2">
                <span class="level-code">A2</span>
                <small>Cơ bản</small>
                <span class="level-tab-count" id="wCountA2">${countA2}</span>
              </button>
              <button class="level-tab ${currentLevel === "B1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B1">
                <span class="level-code">B1</span>
                <small>Trung cấp</small>
                <span class="level-tab-count" id="wCountB1">${countB1}</span>
              </button>
              <button class="level-tab ${currentLevel === "B2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B2">
                <span class="level-code">B2</span>
                <small>Trung cấp cao</small>
                <span class="level-tab-count" id="wCountB2">${countB2}</span>
              </button>
              <button class="level-tab ${currentLevel === "C1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C1">
                <span class="level-code">C1</span>
                <small>Cao cấp</small>
                <span class="level-tab-count" id="wCountC1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C2">
                <span class="level-code">C2</span>
                <small>Thành thạo</small>
                <span class="level-tab-count" id="wCountC2">0</span>
              </button>
            </div>

            <div class="topic-grid" id="wCardsGrid"></div>
            <div class="dau-pagination" id="wPagination"></div>
          </div>
        </section>
      `;

      // Level tabs
      host.querySelectorAll(".level-tab").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderWritingCards();
        };
      });
    }

    document.body.classList.remove("in-workspace");
    renderWritingCards();
  };

  const openWritingWorkspace = (t) => {
    document.body.classList.add("in-workspace");
    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackWriteList">
          <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Quay lại danh sách bài viết</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${t.level === "A2" ? "dau-badge-a2" : t.level === "B1" ? "dau-badge-b1" : t.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${t.level}</span>
          <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(t.icon || "pen-tool", { size: 22 }) : ""} ${esc(t.title)}</span>
        </div>
        <span class="dau-workspace-meta" style="font-size:0.85rem;color:var(--muted);margin-left:auto">Mục tiêu: tối thiểu <b>${t.minWords} từ</b></span>
      </div>

      <div class="workspace" data-w="${t.id}" style="max-width:980px;margin:0 auto">
        ${t.image_url ? `<div class="writing-photo-card" style="text-align:center;margin-bottom:16px"><img src="${esc(t.image_url)}" class="writing-photo-img" style="max-height:280px;border-radius:12px;box-shadow:var(--shadow)" alt="Bối cảnh tả tranh" /></div>` : ""}

        <div class="ru" style="background:var(--bg);padding:16px 20px;border-radius:12px;border:1px solid var(--border);margin-bottom:14px">
          <div style="font-size:1.05rem;font-weight:700;line-height:1.6;margin-bottom:6px;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("map-pin", { size: 16 }) : ""} <b>Đề bài:</b> ${esc(t.prompt)}</div>
          ${t.vi ? `<div style="font-size:0.9rem;color:var(--muted);line-height:1.5">${esc(t.vi)}</div>` : ""}
        </div>

        ${
          t.suggested_words && t.suggested_words.length
            ? `<div style="margin-bottom:8px;font-size:0.84rem;font-weight:700;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Gợi ý từ vựng (Bấm để chèn nhanh vào bài):</div>
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
          <span>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Tự động lưu trên trình duyệt</span>
        </div>

        <div class="checklist" style="margin-top:12px">
          <div style="font-size:0.85rem;font-weight:700;margin-bottom:6px">Checklist tiêu chuẩn chấm bài TRKI:</div>
          ${t.tips.map((tip) => `<label><input type="checkbox"> ${esc(tip)}</label>`).join("")}
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
          <button class="btn btn-primary btn-submit">${window.RusiIcons ? RusiIcons.get("bot-rusika", { size: 16 }) : ""} AI Rusika Chấm Điểm 4 Tiêu Chí</button>
          <button class="btn btn-outline btn-model">Xem bài mẫu chuẩn</button>
        </div>

        <div class="ai-score-box hidden"></div>

        <div class="model-answer hidden" style="margin-top:16px">
          <h4 style="display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 18 }) : ""} Bài văn mẫu đạt điểm tối đa TRKI</h4>
          <p class="ru" style="line-height:1.7">${esc(t.model)}</p>
        </div>
      </div>
    `;

    el("#btnBackWriteList").onclick = () => {
      document.body.classList.remove("in-workspace");
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
        Monetization.showProGateModal("Nội dung dành cho PRO", "Bài viết này yêu cầu gói PRO để mở khóa AI Rusika chấm chi tiết theo chuẩn ТРКИ.");
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
              ${total}/100 đ ${total >= 66 ? "ĐẠT" : "CẦN CỐ GẮNG"}
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
            <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("cat-mascot", { size: 16 }) : ""} <b>Nhận xét từ Mèo Rusika:</b></span> <i>"Bài viết của bạn bám sát yêu cầu đề bài ${esc(t.title)}, câu văn diễn đạt rõ ràng. Bạn đã dùng tốt vốn từ chỉ hoạt động thực tế. Tiếp tục phát huy nhé!"</i>
          </div>
        </div>
      `;

      const first = !Progress.doneList("writeDone").includes(t.id);
      if (first) Progress.addXp(20);
      Progress.markDone("writeDone", t.id);
      toast("AI Rusika đã chấm xong bài viết của bạn (+20 XP)!");
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
 * CHUYÊN MỤC 1: PHÒNG THI MÔ PHỎNG TRKI CHUẨN CEFR (CHỐNG GIAN LẬN)
 * ===================================================================== */
function initMockTestPage() {
  const host = el("#testHost");
  let bank = typeof TRKI_BANK !== "undefined" ? TRKI_BANK : [MOCK_TEST];

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

  const loadCloudTests = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.tests.getPublished();
        if (remote && remote.length) {
          if (started) return;
          const remoteIds = new Set(remote.map(r => r.id));
          const localOnly = (typeof TRKI_BANK !== "undefined" ? TRKI_BANK : []).filter(t => !remoteIds.has(t.id));
          bank = [...remote, ...localOnly];
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

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const renderTrkiCards = () => {
    const gridHost = el("#trkiCardsGrid");
    if (!gridHost) return;

    const countA1 = bank.filter(t => t.level === "A1").length;
    const countA2 = bank.filter(t => t.level === "A2").length;
    const countB1 = bank.filter(t => t.level === "B1").length;
    const countB2 = bank.filter(t => t.level === "B2").length;
    const countC1 = bank.filter(t => t.level === "C1").length;
    const countC2 = bank.filter(t => t.level === "C2").length;

    // Cập nhật số lượng trên các nút cấp độ
    const cA1 = el("#trkiCountA1"); if (cA1) cA1.textContent = countA1;
    const cA2 = el("#trkiCountA2"); if (cA2) cA2.textContent = countA2;
    const cB1 = el("#trkiCountB1"); if (cB1) cB1.textContent = countB1;
    const cB2 = el("#trkiCountB2"); if (cB2) cB2.textContent = countB2;
    const cC1 = el("#trkiCountC1"); if (cC1) cC1.textContent = countC1;
    const cC2 = el("#trkiCountC2"); if (cC2) cC2.textContent = countC2;

    // Update active class on level tabs
    host.querySelectorAll(".level-tab").forEach(b => {
      const isActive = b.dataset.level === currentLevel;
      b.classList.toggle("level-tab-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const filtered = bank.filter(t => t.level === currentLevel);

    const doneCount = filtered.filter(t => Progress.doneList("trkiDone").includes(t.id)).length;
    const totalCount = filtered.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="topic-empty-state" style="grid-column:1/-1;text-align:center;padding:48px 24px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);border-radius:20px;color:#fff">
          <div style="margin-bottom:12px;color:#8dbcef">${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 48 }) : ""}</div>
          <h3 style="margin:0 0 8px;color:#fff;font-size:1.2rem">Chưa có đề thi cho cấp độ này</h3>
          <p style="color:#8094a9;font-size:0.9rem;margin:0">Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((t, idx) => {
        const isDone = Progress.doneList("trkiDone").includes(t.id);
        const isPro = t.is_pro_only || t.level === "B1" || t.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String((currentPage - 1) * PAGE_SIZE + idx + 1).padStart(2, "0");
        const russianCategory = `ТРКИ · ${t.level}`;
        const qCount = t.questionsCount || (t.questions ? t.questions.length : 15);
        const durMin = Math.round((t.durationSeconds || 1800) / 60);

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''}" data-trki-id="${t.id}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(197,34,51,0.08);color:var(--russia-red)">
                ${window.RusiIcons ? RusiIcons.get(t.icon || "award-badge", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(t.title)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : `
                    <span class="topic-status topic-status-level" style="flex-shrink:0">${t.level}</span>
                  `}
                </div>
                <div class="dau-card-subinfo">
                  <span>${t.level}</span>
                  <span class="dau-card-sep">|</span>
                  <span class="dau-card-count">${qCount} câu</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer">
              <span style="font-size:0.84rem;color:var(--muted)">${isDone ? "Đã hoàn thành" : isPro ? "Dành cho thành viên" : "Sẵn sàng thi thử"}</span>
              <button type="button" class="btn btn-primary btn-sm btn-trki-action" data-trki-id="${t.id}" style="display:inline-flex;align-items:center;gap:6px;font-weight:700">
                ${isPro && !isUnlocked ? (window.RusiIcons ? RusiIcons.get("lock-pro", { size: 14 }) : "") : ""} Vào phòng thi ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : "→"}
              </button>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-trki-action").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const id = btn.dataset.trkiId;
          const test = bank.find(x => x.id === id);
          if (!test) return;
          const isPro = test.is_pro_only || test.level === "B1" || test.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề thi TRKI dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ phòng thi mô phỏng ТРКИ chuẩn quốc tế và nhận phân tích chi tiết.");
            return;
          }
          currentTest = test;
          startTest();
        };
      });

      gridHost.querySelectorAll(".topic-card, .dau-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button")) return;
          const id = card.dataset.trkiId;
          const test = bank.find(x => x.id === id);
          if (!test) return;
          const isPro = test.is_pro_only || test.level === "B1" || test.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề thi TRKI dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ phòng thi mô phỏng ТРКИ chuẩn quốc tế và nhận phân tích chi tiết.");
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
      const topEl = el("#trkiSection") || host;
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

    let section = host.querySelector("#trkiSection");
    if (!section) {
      host.innerHTML = `
        <section class="vocabulary-section rusi-topic-section" id="trkiSection">
          <div class="vocabulary-inner">
            <div class="vocabulary-heading">
              <div class="page-title-box">
                <h1 class="page-main-hero-title">
                  THI THỬ TRKI<br />
                  <span>Mô phỏng đề thi A1, A2, B1, B2, C1, C2 chuẩn CEFR</span>
                </h1>
              </div>
            </div>

            <div class="level-tabs" role="tablist" aria-label="Chọn cấp độ thi TRKI" id="trkiLevelTabs">
              <button class="level-tab ${currentLevel === "A1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A1">
                <span class="level-code">A1</span>
                <small>ТЭУ</small>
                <span class="level-tab-count" id="trkiCountA1">${countA1}</span>
              </button>
              <button class="level-tab ${currentLevel === "A2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="A2">
                <span class="level-code">A2</span>
                <small>ТБУ</small>
                <span class="level-tab-count" id="trkiCountA2">${countA2}</span>
              </button>
              <button class="level-tab ${currentLevel === "B1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B1">
                <span class="level-code">B1</span>
                <small>TRKI-1</small>
                <span class="level-tab-count" id="trkiCountB1">${countB1}</span>
              </button>
              <button class="level-tab ${currentLevel === "B2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="B2">
                <span class="level-code">B2</span>
                <small>TRKI-2</small>
                <span class="level-tab-count" id="trkiCountB2">${countB2}</span>
              </button>
              <button class="level-tab ${currentLevel === "C1" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C1">
                <span class="level-code">C1</span>
                <small>Cao cấp</small>
                <span class="level-tab-count" id="trkiCountC1">0</span>
              </button>
              <button class="level-tab ${currentLevel === "C2" ? "level-tab-active" : ""}" type="button" role="tab" data-level="C2">
                <span class="level-code">C2</span>
                <small>Thành thạo</small>
                <span class="level-tab-count" id="trkiCountC2">0</span>
              </button>
            </div>

            <div class="topic-grid" id="trkiCardsGrid"></div>
            <div class="dau-pagination" id="trkiPagination"></div>
          </div>
        </section>
      `;

      // Level tabs
      host.querySelectorAll(".level-tab").forEach(btn => {
        btn.onclick = () => {
          currentLevel = btn.dataset.level;
          currentPage = 1;
          renderTrkiCards();
        };
      });
    }

    document.body.classList.remove("in-workspace");
    renderTrkiCards();
  };

  const startTest = () => {
    document.body.classList.add("in-workspace");
    started = true;
    tabSwitches = 0;

    const storageKey = "trki_exam_" + currentTest.id;
    try { sessionStorage.setItem("trki_active_exam_id", currentTest.id); } catch(e) {}

    // Đồng hồ Timestamp chống reload theo PROJECT_SPEC line 118
    const now = Date.now();
    let storedEndTime = 0;
    try { storedEndTime = parseInt(sessionStorage.getItem(storageKey + "_endTime") || "0", 10); } catch(e) {}
    if (!storedEndTime || storedEndTime <= now) {
      storedEndTime = now + (currentTest.durationMin || 30) * 60 * 1000;
      try { sessionStorage.setItem(storageKey + "_endTime", String(storedEndTime)); } catch(e) {}
    }
    timeLeft = Math.max(0, Math.floor((storedEndTime - now) / 1000));

    // Khôi phục câu trả lời nếu đã lưu trong session
    answers = {};
    try {
      const savedAnswers = sessionStorage.getItem(storageKey + "_answers");
      if (savedAnswers) answers = JSON.parse(savedAnswers);
    } catch(e) {
      answers = {};
    }

    renderTestRoom();

    visibilityHandler = () => {
      if (!started) return;
      if (document.hidden) {
        tabSwitches++;
        showAntiCheatAlert();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      const remainingMs = storedEndTime - Date.now();
      timeLeft = Math.max(0, Math.floor(remainingMs / 1000));
      const t = el("#timerVal");
      if (t) {
        t.textContent = fmt(timeLeft);
        t.classList.toggle("warn", timeLeft < 300);
      }
      const tSidebar = el("#timerValSidebar");
      if (tSidebar) {
        tSidebar.textContent = fmt(timeLeft);
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
        <div style="margin-bottom:12px;color:var(--red)">${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 48 }) : ""}</div>
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
    if (!currentTest || !Array.isArray(currentTest.parts)) {
      console.warn("Đề thi thiếu dữ liệu parts hợp lệ, quay về danh sách.");
      renderHub();
      return;
    }
    const totalQuestions = currentTest.parts.reduce((acc, p) => acc + ((p && p.questions) ? p.questions.length : 0), 0);

    let html = `
      <!-- STICKY TOP BACK BAR WITH TIMER -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnExitTest">
          <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Thoát phòng thi</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${currentTest.level === "A2" ? "dau-badge-a2" : currentTest.level === "B1" ? "dau-badge-b1" : currentTest.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${currentTest.level}</span>
          <span class="dau-workspace-title">${esc(currentTest.title)}</span>
        </div>
        <div class="dau-workspace-controls" style="display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0">
          <div class="dau-exam-timer" style="font-weight:700;font-size:1.05rem;color:var(--secondary);display:inline-flex;align-items:center;gap:4px">
            ${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 16 }) : ""} <span id="timerVal">${fmt(timeLeft)}</span>
          </div>
          <button class="btn btn-primary btn-sm dau-top-btn" id="btnSubmitTop" style="background:var(--secondary);border-color:var(--secondary)" title="Nộp bài thi">${window.RusiIcons ? RusiIcons.get("check-circle", { size: 15 }) : ""} <span class="btn-text">Nộp bài thi</span></button>
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
            <button class="btn btn-primary btn-sm" id="playAudio">${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} Phát đoạn ghi âm hội thoại</button>
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
            <span>${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 16 }) : ""} Chuyển tab:</span>
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
        try {
          sessionStorage.removeItem("trki_active_exam_id");
          if (currentTest && currentTest.id) {
            sessionStorage.removeItem("trki_exam_" + currentTest.id + "_endTime");
            sessionStorage.removeItem("trki_exam_" + currentTest.id + "_answers");
          }
        } catch(e) {}
        clearInterval(timer);
        if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
        document.body.classList.remove("in-workspace");
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
        try {
          sessionStorage.setItem("trki_exam_" + currentTest.id + "_answers", JSON.stringify(answers));
        } catch(e) {}

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
    try {
      sessionStorage.removeItem("trki_active_exam_id");
      if (currentTest && currentTest.id) {
        sessionStorage.removeItem("trki_exam_" + currentTest.id + "_endTime");
        sessionStorage.removeItem("trki_exam_" + currentTest.id + "_answers");
      }
    } catch(e) {}
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
      Progress.addXp(30);
      Progress.markDone("testsDone", currentTest.title);
    }

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnReviewBack">
          <i data-rusi-icon="arrow-left" data-size="16"></i> <span class="btn-text">Quay lại danh sách đề thi</span>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-badge ${currentTest.level === "A2" ? "dau-badge-a2" : currentTest.level === "B1" ? "dau-badge-b1" : currentTest.level === "B2" ? "dau-badge-b2" : "dau-badge-a1"}">${currentTest.level}</span>
          <span class="dau-workspace-title">Kết quả khảo thí: ${esc(currentTest.title)}</span>
        </div>
        <button class="btn btn-primary btn-sm dau-top-btn" id="btnRetryTop" title="Thi lại đề này">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 15 }) : ""} <span class="btn-text">Thi lại đề này</span></button>
      </div>

      <div class="workspace" style="padding:32px 24px">
        <div style="text-align:center;margin-bottom:28px">
          <div style="margin-bottom:12px;color:${passed ? "var(--primary)" : "var(--muted)"}">${window.RusiIcons ? RusiIcons.get(passed ? "trophy-reward" : "sparkles-clean", { size: 54 }) : ""}</div>
          <span class="pro-chip">${esc(currentTest.level)} · KẾT QUẢ KHẢO THÍ CHÍNH THỨC</span>
          <h2 style="font-size:1.8rem;margin:8px 0">${correct}/${total} câu đúng — ${pct}%</h2>
          <p style="margin:6px 0 16px;color:var(--muted)">Điểm cao nhất cấp độ này: <b>${best}%</b></p>
          <div class="pass-badge ${passed ? "yes" : "no"}" style="font-size:1rem;padding:8px 20px">
            ${passed ? "ĐẠT CHUẨN NĂNG LỰC TRKI " + currentTest.level : "CHƯA ĐẠT (Yêu cầu chuẩn ≥ " + currentTest.passPercent + "%)"}
          </div>
        </div>

        <h3 style="margin:24px 0 12px;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("bar-chart-2", { size: 20 }) : ""} Thống kê tỷ lệ đạt theo từng kỹ năng:</h3>
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

        <h3 style="margin:28px 0 14px;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("file-text", { size: 20 }) : ""} Bảng phân tích đáp án & giải thích ngữ pháp chi tiết:</h3>
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
            ${ok ? '<span style="color:var(--green)"> (Chính xác)</span>' : '<span style="color:var(--red)"> (Sai)</span>'}
          </div>
          ${ok ? "" : `<div style="font-size:.9rem;margin-bottom:8px">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></div>`}
          <div class="explain">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} <b>Giải thích quy tắc:</b> ${esc(q.ex || "Áp dụng cấu trúc ngữ pháp chuẩn theo bảng biến cách.")}</div>
        </div>`;
        })
        .join("");
    });

    el("#btnReviewBack").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    el("#btnRetryTop").onclick = startTest;
    el("#retryTest").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); };
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkResumeActiveExam = () => {
    try {
      const activeId = sessionStorage.getItem("trki_active_exam_id");
      if (activeId) {
        const found = bank.find(t => t.id === activeId);
        const storedEndTime = parseInt(sessionStorage.getItem("trki_exam_" + activeId + "_endTime") || "0", 10);
        if (found && storedEndTime > Date.now()) {
          currentTest = found;
          startTest();
          return true;
        }
      }
    } catch(e) {}
    return false;
  };

  if (!checkResumeActiveExam()) {
    renderHub();
  }
}


/* =====================================================================
 * CHUYÊN MỤC 3: BLOG DU HỌC & KIẾN THỨC NGA (THEO SEO CLUSTERS)
 * ===================================================================== */
function initBlogPage() {
  const host = el("#blogHost");
  let selectedCategory = "all";
  let cloudPosts = null;

  const loadCloudPosts = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.blog.getAll();
        if (remote && remote.length) {
          cloudPosts = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài blog từ Database!`);
          renderBlog();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài blog từ cloud:", err);
      }
    }
  };
  loadCloudPosts();

  const renderBlog = () => {
    const posts = (cloudPosts && cloudPosts.length) ? cloudPosts : (typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : []);
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
          <article class="product-card blog-card" data-slug="${p.slug || i}" onclick="window.location.href='blog-post.html?slug=' + encodeURIComponent('${p.slug || i}')" style="cursor:pointer">
            <div class="product-img-wrap">
              <img src="${esc(p.cover || "assets/red-square.jpg")}" class="product-img" alt="${esc(p.title)}" />
              <span class="product-badge">${esc(p.categoryName || "Du học")}</span>
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.date || "")} · ${esc(p.readTime || "5 phút đọc")}</div>
              <h3 class="product-title" style="font-size:1.05rem">
                <a href="blog-post.html?slug=${encodeURIComponent(p.slug || i)}" style="color:inherit;text-decoration:none">${esc(p.title)}</a>
              </h3>
              <p class="product-desc">${esc(p.excerpt)}</p>
              <a href="blog-post.html?slug=${encodeURIComponent(p.slug || i)}" class="btn btn-primary btn-sm btn-read-post" style="margin-top:auto;text-decoration:none">
                Đọc bài viết →
              </a>
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
 * CHUYÊN MỤC 2: SHOP NGA & DỊCH VỤ LIÊN KẾT DU HỌC (VIETQR CHECKOUT)
 * ===================================================================== */
function initShopPage() {
  const host = el("#shopHost");
  if (!host) return;
  let currentCat = "all";
  let cart = STORE.get("shop_cart", []);
  let cloudProducts = null;

  const loadCloudProducts = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.shop.getAll();
        if (remote && remote.length) {
          cloudProducts = remote;
          console.log(`[Supabase] Đã tải ${remote.length} sản phẩm shop từ Database!`);
          renderShop();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải sản phẩm shop từ cloud:", err);
      }
    }
  };
  loadCloudProducts();

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
    btn.innerHTML = `${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 16 }) : ""} Giỏ hàng (<span id="cartCount">${count}</span>)`;
    btn.style.display = count > 0 ? "flex" : "none";
  };

  const renderShop = () => {
    const products = (cloudProducts && cloudProducts.length) ? cloudProducts : (typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : []);
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
          <div class="product-card shop-product-card" data-id="${esc(p.id)}" onclick="window.location.href='product-detail.html?id=' + encodeURIComponent('${p.id}')" style="cursor:pointer">
            <div class="product-img-wrap">
              <img src="${esc(p.image)}" class="product-img" alt="${esc(p.title)}" />
              ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ""}
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.categoryName)}</div>
              <h3 class="product-title">
                <a href="product-detail.html?id=${encodeURIComponent(p.id)}" style="color:inherit;text-decoration:none">${esc(p.title)}</a>
              </h3>
              <p class="product-desc">${esc(p.desc)}</p>
              <div class="product-pricing">
                <span class="product-price">${p.price.toLocaleString("vi-VN")} đ</span>
                ${p.priceRub ? `<span class="product-rub">(≈ ${p.priceRub} ₽)</span>` : ""}
                ${p.originalPrice ? `<span class="product-old-price">${p.originalPrice.toLocaleString("vi-VN")} đ</span>` : ""}
              </div>
              <button class="btn btn-primary btn-sm btn-add-cart" data-id="${p.id}" style="margin-top:auto" onclick="event.stopPropagation()">
                ${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 16 }) : ""} ${p.category === "dich_vu_du_hoc" ? "Đăng ký tư vấn" : "Thêm vào giỏ"}
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
      btn.onclick = (e) => {
        if (e) e.stopPropagation();
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
        <h3 style="margin:0;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 20 }) : ""} Giỏ hàng của bạn</h3>
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
        <h3 style="margin-bottom:12px">${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 20 }) : ""} Đặt Hàng & Thanh Toán VietQR</h3>
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
            ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Đã chuyển khoản xong
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
      toast(`Cảm ơn ${name}! Đơn hàng ${orderId} đã được ghi nhận.`);
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

  // Nút bong bóng chat nổi Mascot Rusika ở góc dưới bên phải màn hình
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
    const rawPkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);
    const seenPkgs = new Set();
    const pkgs = rawPkgs.filter(p => {
      const pid = (p.id || "").toLowerCase();
      if (!pid || seenPkgs.has(pid)) return false;
      seenPkgs.add(pid);
      return true;
    });

    // Banner thông tin trạng thái học viên phía trên bảng giá
    const alertBannerHtml = `
      <div class="pricing-auth-banner logged-in" style="grid-column:1/-1">
        <div style="display:flex;align-items:center;gap:8px">
          <span>${window.RusiIcons ? RusiIcons.get("users-students", { size: 16 }) : ""}</span>
          <span>Đang chọn gói cho tài khoản: <b>${esc(user.name || "Học viên")}</b> <code style="background:rgba(0,0,0,0.06);padding:2px 6px;border-radius:4px">${esc(user.email || "Khách")}</code></span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          ${isPro ? `<span class="pro-chip-header" style="font-size:0.75rem;padding:3px 10px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 13 }) : ""} PRO VIP (${esc(proInfo ? proInfo.pkgTitle : "Active")})</span>` : `<span class="user-tier-badge tier-free" style="font-size:0.75rem;padding:3px 9px">Học viên Free</span>`}
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
            ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói bạn đang sử dụng
          </button>`;
      } else {
        actionBtnHtml = `
          <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-upgrade-pkg" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
            ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Kích hoạt qua VietQR ngay
          </button>`;
      }

      return `
      <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrentPlan ? "is-current" : ""}">
        ${isCurrentPlan ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG</div>` : (pkg.popular ? `<div class="pricing-popular-badge">PHỔ BIẾN NHẤT</div>` : "")}
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
          ${(pkg.features || []).map((f) => `<li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> <span>${esc(f)}</span></li>`).join("")}
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

  // Khởi tạo chạy tự động 5 feedback học viên (Testimonial Auto-carousel)
  const initTestimonialCarousel = () => {
    const track = el("#testimonialTrack");
    const dotsHost = el("#testimonialDots");
    const prevBtn = el("#btnTestimonialPrev");
    const nextBtn = el("#btnTestimonialNext");
    const slider = el("#testimonialSlider");
    if (!track) return;

    const feedbacks = [
      {
        quote: "Sau 3 tháng học tại Rusi TRKI, mình đã tự tin đỗ chứng chỉ ТРКИ-1 và hoàn thành hồ sơ học bổng Hiệp định sang MGU. Điều mình thích nhất là giao diện thi thử mô phỏng y như phòng thi thật và các lọ từ vựng cực kỳ thực tế.",
        author: "Lan Hương",
        role: "Học viên xuất sắc đỗ học bổng MGU Moscow 2026",
        badge: "Học bổng Hiệp định MGU",
        initials: "LH",
        color: "#ff9f64"
      },
      {
        quote: "Luyện nghe 4 Part CEFR và phần phát âm Shadowing trên Rusi giúp mình cải thiện rõ rệt từ một người rất ngại nói. Nhờ đó mình vượt qua bài phỏng vấn du học của ĐH Tổng hợp Saint Petersburg (SPbU) với điểm số tuyệt đối.",
        author: "Minh Tuấn",
        role: "Du học sinh SPbU Saint Petersburg",
        badge: "Du học sinh SPbU",
        initials: "MT",
        color: "#2563eb"
      },
      {
        quote: "Tính năng Lọ từ vựng Spaced Repetition cứu cánh cho mình khi học 6 cách và động từ chuyển động. Trước đây học trước quên sau, giờ từ vựng tự động nhắc đúng thời điểm cần ôn tập, học cực kỳ nhàn mà nhớ sâu.",
        author: "Phương Anh",
        role: "Đỗ chứng chỉ ТРКИ A2 (89/100 điểm)",
        badge: "ТРКИ A2 89/100",
        initials: "PA",
        color: "#7c3aed"
      },
      {
        quote: "Bộ đề thi thử TRKI ở đây cực kỳ chuẩn cấu trúc, có đồng hồ bấm giờ và cảnh báo chống gian lận giúp rèn tâm lý phòng thi nghiêm túc. Phần giải thích ngữ pháp chi tiết từng câu sau khi nộp bài rất đáng giá.",
        author: "Đức Hải",
        role: "Sinh viên năm nhất HSE Moscow",
        badge: "Du học sinh HSE",
        initials: "ĐH",
        color: "#059669"
      },
      {
        quote: "Từ một người mất gốc tiếng Nga, nhờ phương pháp học qua bối cảnh đời sống thực tế và sự đồng hành của AI Rusika, mình đã đạt mục tiêu sang Nga học dự bị chỉ sau 4 tháng đồng hành cùng Rusi.",
        author: "Thanh Thảo",
        role: "Học viên nhận học bổng RUDN University",
        badge: "Học bổng RUDN",
        initials: "TT",
        color: "#e11d48"
      }
    ];

    let currentIndex = 0;
    let timer = null;
    const INTERVAL = 4500; // 4.5 giây tự động đổi

    track.innerHTML = feedbacks
      .map(
        (f, idx) => `
        <div class="testimonial-slide ${idx === 0 ? "active" : ""}" data-idx="${idx}">
          <div class="testimonial-badge">${esc(f.badge)}</div>
          <div class="testimonial-stars" style="display:inline-flex;gap:3px;color:#f59e0b">${Array(5).fill(window.RusiIcons ? RusiIcons.get("star", { size: 16 }) : "").join("")}</div>
          <blockquote>${esc(f.quote)}</blockquote>
          <div class="student">
            <span class="student-avatar" style="background:${f.color}">${esc(f.initials)}</span>
            <p>
              <strong>${esc(f.author)}</strong>
              <small>${esc(f.role)}</small>
            </p>
          </div>
        </div>
      `
      )
      .join("");

    if (dotsHost) {
      dotsHost.innerHTML = feedbacks
        .map(
          (_, idx) => `
          <button type="button" class="testimonial-dot ${idx === 0 ? "active" : ""}" data-idx="${idx}" aria-label="Feedback ${idx + 1}"></button>
        `
        )
        .join("");
    }

    const showSlide = (idx) => {
      currentIndex = (idx + feedbacks.length) % feedbacks.length;
      track.querySelectorAll(".testimonial-slide").forEach((s, i) => {
        s.classList.toggle("active", i === currentIndex);
      });
      if (dotsHost) {
        dotsHost.querySelectorAll(".testimonial-dot").forEach((d, i) => {
          d.classList.toggle("active", i === currentIndex);
        });
      }
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    const startTimer = () => {
      stopTimer();
      timer = setInterval(nextSlide, INTERVAL);
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        prevSlide();
        startTimer();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        nextSlide();
        startTimer();
      };
    }

    if (dotsHost) {
      dotsHost.querySelectorAll(".testimonial-dot").forEach((d) => {
        d.onclick = () => {
          const idx = parseInt(d.dataset.idx, 10);
          showSlide(idx);
          startTimer();
        };
      });
    }

    if (slider) {
      slider.onmouseenter = stopTimer;
      slider.onmouseleave = startTimer;
      slider.ontouchstart = stopTimer;
      slider.ontouchend = startTimer;
    }

    startTimer();
  };

  initTestimonialCarousel();
}

/* =====================================================================
 * TRANG NÂNG CẤP TÀI KHOẢN PRO (upgrade.html - Chuẩn DauEnglish)
 * ===================================================================== */
function initUpgradePage() {
  const host = el("#upgradeHost");
  if (!host) return;

  const loadCloudPackages = async () => {
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.packages.getAll();
        if (remote && remote.length) {
          window.PACKAGES = remote;
          console.log(`[Supabase] Đã tải ${remote.length} gói cước từ Database!`);
          render();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải gói cước từ cloud:", err);
      }
    }
  };
  loadCloudPackages();

  const render = () => {
    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    const isPro = typeof Monetization !== "undefined" ? Monetization.isPro() : false;
    const proInfo = typeof Monetization !== "undefined" ? Monetization.getProInfo() : null;
    const pkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);

    // 1. KHI CHƯA ĐĂNG NHẬP: Hiển thị giao diện mời đăng nhập chuẩn
    if (!user) {
      host.innerHTML = `
        <div class="upgrade-hero">
          <span class="upgrade-kicker">NÂNG CẤP TÀI KHOẢN PRO</span>
          <h1>Mở Khóa Toàn Bộ Đề Thi TRKI</h1>
          <p>Trang nâng cấp tài khoản dành cho học viên RusiTRKI. Vui lòng đăng nhập để xem thông tin gói cước và ưu đãi dành riêng cho bạn.</p>
        </div>

        <div class="upgrade-auth-box">
          <div class="upgrade-auth-icon">${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 36 }) : ""}</div>
          <h2>Đăng nhập để xem bảng giá & ưu đãi</h2>
          <p>Để lưu trữ trọn đời kết quả luyện thi, đồng bộ tiến độ trên mọi thiết bị và gắn quyền PRO vào tài khoản chính chủ, vui lòng đăng nhập trước.</p>
          <div class="upgrade-auth-actions">
            <a class="btn btn-primary btn-lg" href="login.html?redirect=upgrade.html" style="text-decoration:none">
              Đăng nhập với Google / Email
            </a>
            <a class="btn btn-outline btn-lg" href="signup.html?redirect=upgrade.html" style="text-decoration:none">
              Đăng ký tài khoản mới
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
        <span class="upgrade-kicker">BẢNG GIÁ DỊCH VỤ & GÓI HỌC VIÊN PRO</span>
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
              Cấp độ tài khoản: ${isPro ? `<span class="user-tier-badge tier-pro">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""} PRO MEMBER (${esc(proInfo ? proInfo.pkgTitle : "Active")})</span>` : `<span class="user-tier-badge tier-free">Học viên Free</span>`}
            </div>
          </div>
        </div>

        ${isPro ? `
          <div class="upgrade-pro-active-box">
            <span>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói đang dùng: <b>${esc(proInfo ? proInfo.pkgTitle : "PRO VIP")}</b> (${esc((proInfo && proInfo.expiresFormatted) || "Đang kích hoạt")})</span>
            <button class="btn btn-sm btn-outline" id="btnManageUpgradePage" style="white-space:nowrap">Quản lý gói</button>
          </div>
        ` : `
          <div class="upgrade-discount-countdown">
            ${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 16 }) : ""} Ưu đãi 50% dành riêng cho tài khoản của bạn hôm nay
          </div>
        `}
      </div>

      <!-- PRICING CARDS GRID -->
      <div class="pricing-grid" style="margin-bottom:60px">
        ${pkgs.map((pkg) => {
          const isCurrent = isPro && proInfo && (pkg.id || "").toLowerCase() === (proInfo.pkgId || "").toLowerCase();
          return `
          <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrent ? "is-current" : ""}">
            ${isCurrent ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG</div>` : (pkg.popular ? `<div class="pricing-popular-badge" style="display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 13 }) : ""} PHỔ BIẾN NHẤT</div>` : (pkg.id === "pro_vip" ? `<div class="pricing-popular-badge" style="background:linear-gradient(135deg, #d97706, #b45309);display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 13 }) : ""} VIP QUYỀN NĂNG</div>` : ""))}
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
              ${(pkg.features || []).map((f) => `<li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> <span>${esc(f)}</span></li>`).join("")}
            </ul>
            ${isCurrent ? `
              <button class="btn btn-outline" disabled style="width:100%;background:rgba(16,185,129,0.1);color:#059669;border-color:#10b981;cursor:default;font-weight:800">
                ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói bạn đang sử dụng
              </button>
            ` : `
              <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-select-upgrade" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
                ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Kích hoạt qua VietQR ngay
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
                <th class="col-pro"><span class="pro-crown">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 16 }) : ""}</span> Gói PRO VIP (Khuyên dùng)</th>
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
                <td class="col-free"><span style="display:inline-flex;align-items:center;gap:4px;color:#94a3b8">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""} Không hỗ trợ</span></td>
                <td class="col-pro"><b style="color:#059669;display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Ưu tiên hỗ trợ 1-1</b> qua nhóm Zalo VIP cùng cựu du học sinh</td>
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
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("target", { size: 28 }) : ""}</div>
            <div class="step-title">Chọn Gói Cước</div>
            <div class="step-desc">Chọn gói 6 Tháng, 1 Năm hoặc Trọn Đời phù hợp nhất với mục tiêu học tập của bạn.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">02</span>
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("qr-code-vietqr", { size: 28 }) : ""}</div>
            <div class="step-title">Quét Mã VietQR</div>
            <div class="step-desc">Mở app Mobile Banking bất kỳ, quét mã VietQR tự động điền sẵn số tài khoản và cú pháp.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">03</span>
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 28 }) : ""}</div>
            <div class="step-title">Mở Khóa Tức Thì</div>
            <div class="step-desc">Hệ thống xác thực chữ ký điện tử và kích hoạt tài khoản PRO ngay trong 3 giây.</div>
          </div>
        </div>
      </section>

      <!-- CAM KẾT & ĐẢM BẢO -->
      <div class="guarantees-grid">
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 28 }) : ""}</div>
          <div class="guarantee-title">Kích Hoạt Tức Thì</div>
          <div class="guarantee-desc">Tự động 24/7 kể cả ban đêm và ngày nghỉ.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 28 }) : ""}</div>
          <div class="guarantee-title">An Toàn Tuyệt Đối</div>
          <div class="guarantee-desc">Cổng VietinBank chuẩn bảo mật liên ngân hàng NAPAS.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 28 }) : ""}</div>
          <div class="guarantee-title">Hỗ Trợ 1-1</div>
          <div class="guarantee-desc">Giảng viên và cựu du học sinh Nga trực tiếp đồng hành.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 28 }) : ""}</div>
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
        <div style="margin-bottom:8px;color:var(--muted)">${window.RusiIcons ? RusiIcons.get("inbox", { size: 48 }) : ""}</div>
        <p>Chưa có từ nào trong bộ lọc này. Bấm <b>Học</b> để bắt đầu!</p>
      </div>`;
      return;
    }

    el("#vocabList").innerHTML = filtered
      .map((c) => {
        const status = c.mastered ? (window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) + " Đã thuộc" : "Đã thuộc") : c.isNew ? (window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) + " Mới" : "Mới") : c.learningStep === 1 ? (window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) + " Đang học" : "Đang học") : (window.RusiIcons ? RusiIcons.get("book-open-blog", { size: 14 }) + " Ôn tập" : "Ôn tập");
        const dueText = c.mastered
          ? "—"
          : c.dueDate <= Date.now()
          ? (window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) + " Tới hạn ngay" : "Tới hạn ngay")
          : (window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) + " " : "") + SRS.formatInterval((c.dueDate - Date.now()) / 3600000);
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
              : `<button class="btn btn-mastered btn-sm vocab-master" data-id="${c.id}">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Thuộc</button>`
            }
            <button class="btn btn-outline btn-sm vocab-speak" data-ru="${esc(c.ru)}" title="Phát âm">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : "Nghe"}</button>
            <button class="btn btn-outline btn-sm vocab-detail" data-ru="${esc(c.ru)}" title="Chi tiết từ">${window.RusiIcons ? RusiIcons.get("book-open-blog", { size: 14 }) : "Chi tiết"}</button>
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
        toast("Đã thêm vào Đã thuộc");
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
    el("#modeLabel").textContent = "Flashcard Ôn tập";

    showNextCard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function startSession({ level, newLimit, mode, onlyDue = false }) {
    let st = SRS.getState();
    let due = SRS.getDueCards(st, 50);
    let news = onlyDue ? [] : SRS.getNewCards(st, level, newLimit);
    if (due.length === 0 && news.length === 0) {
      toast("Không có từ để học — hãy đợi từ tới hạn hoặc thêm từ mới");
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
      flashcard: "Flashcard",
      typing: "Gõ từ",
      choice: "Trắc nghiệm",
      speak: "Phát âm"
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
              <p class="hint">Bấm để lật xem nghĩa ${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : ""}</p>
            </div>
            <div class="flash-face flash-back">
              <p class="word" style="font-size:1.8rem;color:var(--primary)">${esc(card.vi)}</p>
              <p class="pos">${esc(card.pos || "")}</p>
              <p class="note">${esc(card.ex || "")}</p>
            </div>
          </div>
        </div>
        <div class="srs-quick-actions">
          <button class="btn btn-soft btn-sm" id="speakNow">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe phát âm</button>
          <button class="btn btn-soft btn-sm" id="wordDetail">${window.RusiIcons ? RusiIcons.get("book-open-blog", { size: 16 }) : ""} Chi tiết từ</button>
          <button class="btn btn-soft btn-sm" id="srsAddJar">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""} Lưu vào Lọ</button>
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
          <button class="btn btn-soft" id="typingShow">${window.RusiIcons ? RusiIcons.get("eye", { size: 16 }) : ""} Hiện đáp án</button>
          <button class="btn btn-outline" id="typingSpeak">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe</button>
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
        fb.innerHTML = `<span class="fb-ok" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Chính xác 100%!</span>`;
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
          <button class="btn btn-outline" id="choiceSpeak">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe</button>
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
          ? `<span class="fb-ok" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Đúng rồi!</span>`
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
          <button class="mic-btn big" id="speakMic" aria-label="Nói">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 28 }) : ""}</button>
          <button class="btn btn-outline" id="speakListen">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe mẫu</button>
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
      el("#speakFeedback").innerHTML = `<span class="fb-empty">${window.RusiIcons ? RusiIcons.get("waveform-audio", { size: 16 }) : ""} Đang nghe — đọc rõ ràng...</span>`;
      const rec = new SR();
      rec.lang = "ru-RU";
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      rec.onresult = (ev) => {
        const heard = ev.results[0][0].transcript;
        const sim = similarity(heard, card.ru);
        el("#speakFeedback").innerHTML =
          `<span class="${sim >= 80 ? "fb-ok" : sim >= 50 ? "fb-mid" : "fb-bad"}">` +
          `${window.RusiIcons ? RusiIcons.get("bot-rusika", { size: 14 }) : ""} Nghe được: <b class="ru">${esc(heard)}</b><br>` +
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
      el("#speakFeedback").innerHTML = `<span class="fb-empty">Bấm mic và đọc to. Nếu trình duyệt không hỗ trợ, bấm "Nghe mẫu" và "Dễ" để bỏ qua.</span>`;
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
          <div style="margin-bottom:8px;color:var(--muted)">${window.RusiIcons ? RusiIcons.get("folder", { size: 48 }) : ""}</div>
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
        <div style="margin-bottom:8px;color:var(--muted)">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 48 }) : ""}</div>
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
        const statusIcon = st === "mastered" ? (window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : "") :
                           st === "learning" ? (window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : "") :
                           st === "reviewing" ? (window.RusiIcons ? RusiIcons.get("book-open-blog", { size: 14 }) : "") :
                           st === "new" ? (window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : "") : "·";
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
            <button class="dict-speak" data-ru="${esc(w.ru)}" title="Nghe">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : "Nghe"}</button>
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
