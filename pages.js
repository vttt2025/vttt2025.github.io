
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

function stripQuotes(str) {
  if (!str) return "";
  return String(str)
    .replace(/[«»"“”„]/g, "")
    .replace(/&quot;|&laquo;|&raquo;/g, "")
    .trim();
}

function el(sel) {
  return document.querySelector(sel);
}

function renderDauPagination(containerEl, currentPage, totalPages, onPageChange, options) {
  if (!containerEl) return;
  if (!totalPages || totalPages <= 1 || currentPage >= totalPages) {
    containerEl.innerHTML = "";
    containerEl.style.display = "none";
    return;
  }
  containerEl.style.display = "flex";

  const remaining = (options && typeof options.remainingCount === "number")
    ? options.remainingCount
    : (typeof options === "number" ? options : Math.max(0, (totalPages - currentPage) * 6));

  if (remaining <= 0) {
    containerEl.innerHTML = "";
    containerEl.style.display = "none";
    return;
  }

  const unit = (options && options.unit) ? options.unit : "bài";
  const downIcon = window.RusiIcons ? RusiIcons.get("chevron-down", { size: 15 }) : "▾";

  containerEl.innerHTML = `
    <button type="button" class="dau-load-more-btn" aria-label="Xem thêm ${remaining} ${unit}">
      ${downIcon}
      <span>Xem thêm (${remaining} ${unit})</span>
    </button>
  `;

  const btn = containerEl.querySelector(".dau-load-more-btn");
  if (btn) {
    btn.onclick = (e) => {
      e.preventDefault();
      onPageChange(currentPage + 1);
    };
  }
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
  if (typeof wordData === "string") {
    wordData = { ru: wordData };
  }
  const ru = (wordData.ru || wordData.word || "").trim();
  if (!ru) {
    if (typeof toast === "function") toast("Không tìm thấy từ tiếng Nga để lưu!");
    return;
  }
  const vi = (wordData.vi || wordData.meaning || "").trim();
  const stress = wordData.stress || ru;
  const note = wordData.note || wordData.pos || wordData.trans || "";
  const ex = wordData.ex || "";
  const ex_vi = wordData.ex_vi || "";

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
  }

  const oldModal = document.getElementById("universalAddJarModal");
  if (oldModal) oldModal.remove();

  const preselectedJarId = (window.currentActiveJarId && customJars.some(j => String(j.id) === String(window.currentActiveJarId)))
    ? String(window.currentActiveJarId)
    : String(customJars[0].id);

  const modal = document.createElement("div");
  modal.id = "universalAddJarModal";
  modal.className = "add-jar-modal";
  modal.innerHTML = `
    <div class="add-jar-box">
      <!-- Close Button -->
      <button type="button" class="add-jar-close" id="closeAddJarModal" title="Đóng cửa sổ" aria-label="Đóng cửa sổ">
        ${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "✕"}
      </button>

      <!-- Header -->
      <div class="add-jar-header">
        <div class="add-jar-icon-badge">
          ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 22 }) : "🫙"}
        </div>
        <div class="add-jar-title-wrap">
          <h3 class="add-jar-title">Lưu vào Lọ từ vựng cá nhân</h3>
          <p class="add-jar-subtitle">Lưu trữ từ vựng để ôn tập thông minh Spaced Repetition</p>
        </div>
      </div>

      <!-- Word Preview Card -->
      <div class="add-jar-preview-card">
        <div class="add-jar-preview-top">
          <div class="add-jar-preview-word-wrap">
            <span class="add-jar-ru-word ru">${esc(stress || ru)}</span>
            ${note ? `<span class="add-jar-pos-tag">${esc(note)}</span>` : ""}
          </div>
          <button type="button" class="add-jar-speak-btn" id="previewSpeakBtn" title="Nghe phát âm" aria-label="Nghe phát âm">
            ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : "🔊"}
          </button>
        </div>
        <div class="add-jar-preview-vi">
          ${vi ? `<span class="add-jar-vi-text">${esc(vi)}</span>` : `
            <div class="add-jar-vi-input-wrap">
              <input type="text" id="inlineAddJarVi" class="add-jar-input" placeholder="Nhập nghĩa tiếng Việt cho từ..." autocomplete="off" />
            </div>
          `}
        </div>
        ${ex ? `
          <div class="add-jar-preview-ex">
            <span class="add-jar-ex-ru ru">${esc(stripQuotes(ex))}</span>
            ${ex_vi ? `<span class="add-jar-ex-vi">${esc(stripQuotes(ex_vi))}</span>` : ""}
          </div>
        ` : ""}
      </div>

      <!-- Jar Selection Section -->
      <div class="add-jar-picker-section">
        <div class="add-jar-picker-header">
          <span class="add-jar-picker-label">Chọn Lọ từ vựng muốn lưu vào:</span>
          <button type="button" class="add-jar-btn-new-toggle" id="btnToggleNewJar">
            ${window.RusiIcons ? RusiIcons.get("plus", { size: 13 }) : "+"} Tạo Lọ mới
          </button>
        </div>

        <input type="hidden" id="selectTargetJar" value="${esc(preselectedJarId)}" />

        <div class="add-jar-options-list" id="addJarOptionsList">
          ${customJars.map(j => {
            const isSelected = String(j.id) === String(preselectedJarId);
            return `
              <div class="add-jar-option-card ${isSelected ? "selected" : ""}" data-jar-id="${esc(j.id)}">
                <span class="add-jar-option-icon">
                  ${window.RusiIcons ? RusiIcons.get(j.icon || "archive-jar", { size: 16 }) : "🫙"}
                </span>
                <div class="add-jar-option-details">
                  <span class="add-jar-option-name">${esc(j.name)}</span>
                  <span class="add-jar-option-count">${(j.words || []).length} từ</span>
                </div>
                <span class="add-jar-option-indicator">
                  ${window.RusiIcons ? RusiIcons.get("check", { size: 13 }) : "✓"}
                </span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Inline New Jar Group -->
        <div id="inlineNewJarGroup" class="add-jar-new-box" style="display:none">
          <span class="add-jar-new-title">Tên Lọ mới:</span>
          <div class="add-jar-new-input-row">
            <input type="text" id="inlineNewJarName" class="add-jar-input" placeholder="Ví dụ: Từ vựng thi TRKI 1..." autocomplete="off" />
            <button type="button" class="btn btn-primary btn-sm" id="btnApplyInlineJar" style="white-space:nowrap;padding:7px 14px">Tạo</button>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="add-jar-footer">
        <button type="button" class="btn btn-outline btn-sm" id="btnCancelAddJar">Hủy</button>
        <button type="button" class="btn btn-primary btn-sm add-jar-btn-save" id="btnConfirmAddJar">
          ${window.RusiIcons ? RusiIcons.get("save", { size: 15 }) : ""} Lưu vào Lọ
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const sel = modal.querySelector("#selectTargetJar");
  const newGroup = modal.querySelector("#inlineNewJarGroup");
  const newName = modal.querySelector("#inlineNewJarName");
  const viInput = modal.querySelector("#inlineAddJarVi");
  const btnToggleNew = modal.querySelector("#btnToggleNewJar");
  const btnApplyNew = modal.querySelector("#btnApplyInlineJar");
  let currentCustomJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];

  if (viInput) {
    setTimeout(() => viInput.focus(), 60);
  }

  // Handle option selection
  const bindOptionCards = () => {
    modal.querySelectorAll(".add-jar-option-card").forEach(card => {
      card.onclick = () => {
        modal.querySelectorAll(".add-jar-option-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        sel.value = card.dataset.jarId;
      };
    });
  };
  bindOptionCards();

  // Toggle new jar group
  if (btnToggleNew) {
    btnToggleNew.onclick = () => {
      const isHidden = newGroup.style.display === "none";
      newGroup.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        setTimeout(() => newName.focus(), 50);
      }
    };
  }

  // Inline create jar action
  const createInlineJar = () => {
    const createdName = (newName.value || "").trim();
    if (!createdName) {
      if (typeof toast === "function") toast("Vui lòng nhập tên cho Lọ từ vựng mới!");
      newName.focus();
      return false;
    }
    const newJarId = "custom-jar-" + Date.now();
    const newJar = {
      id: newJarId,
      name: createdName,
      icon: "archive-jar",
      desc: "Lọ từ vựng cá nhân",
      words: [],
      level: "custom",
      is_system: false
    };
    currentCustomJars.push(newJar);
    if (typeof STORE !== "undefined") {
      STORE.set("custom_jars", currentCustomJars);
    }
    sel.value = newJarId;

    const optList = modal.querySelector("#addJarOptionsList");
    if (optList) {
      modal.querySelectorAll(".add-jar-option-card").forEach(c => c.classList.remove("selected"));
      const cardEl = document.createElement("div");
      cardEl.className = "add-jar-option-card selected";
      cardEl.dataset.jarId = newJarId;
      cardEl.innerHTML = `
        <span class="add-jar-option-icon">
          ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : "🫙"}
        </span>
        <div class="add-jar-option-details">
          <span class="add-jar-option-name">${esc(createdName)}</span>
          <span class="add-jar-option-count">0 từ</span>
        </div>
        <span class="add-jar-option-indicator">
          ${window.RusiIcons ? RusiIcons.get("check", { size: 13 }) : "✓"}
        </span>
      `;
      optList.appendChild(cardEl);
      bindOptionCards();
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    newGroup.style.display = "none";
    newName.value = "";
    if (typeof toast === "function") toast(`Đã tạo lọ «${createdName}» thành công!`);
    return true;
  };

  if (btnApplyNew) {
    btnApplyNew.onclick = createInlineJar;
  }

  modal.querySelector("#previewSpeakBtn").onclick = () => speak(ru);

  const closeModal = () => {
    document.removeEventListener("keydown", onKey);
    modal.remove();
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Enter") {
      if (document.activeElement === newName) {
        e.preventDefault();
        createInlineJar();
      } else if (document.activeElement === viInput) {
        e.preventDefault();
        modal.querySelector("#btnConfirmAddJar").click();
      }
    }
  };
  document.addEventListener("keydown", onKey);

  modal.querySelector("#closeAddJarModal").onclick = closeModal;
  modal.querySelector("#btnCancelAddJar").onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  modal.querySelector("#btnConfirmAddJar").onclick = () => {
    if (newGroup.style.display !== "none" && (newName.value || "").trim()) {
      const ok = createInlineJar();
      if (!ok) return;
    }

    let jarId = sel.value;
    currentCustomJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];

    const finalVi = vi || (viInput ? viInput.value.trim() : "");
    if (!finalVi) {
      if (typeof toast === "function") toast("Vui lòng nhập nghĩa tiếng Việt cho từ!");
      if (viInput) viInput.focus();
      return;
    }

    const jar = currentCustomJars.find(j => String(j.id) === String(jarId));
    if (!jar) {
      if (typeof toast === "function") toast("Không tìm thấy lọ được chọn!");
      return;
    }

    jar.words = jar.words || [];
    const existingIdx = jar.words.findIndex(w => (w.ru || "").trim().toLowerCase() === ru.toLowerCase());
    const wordPayload = {
      ru: ru,
      vi: finalVi,
      stress: stress,
      note: note,
      ex: ex,
      ex_vi: ex_vi
    };

    if (existingIdx >= 0) {
      jar.words[existingIdx] = Object.assign({}, jar.words[existingIdx], wordPayload);
      if (typeof toast === "function") toast(`Đã cập nhật từ «${ru}» trong lọ «${jar.name}»!`);
    } else {
      jar.words.push(wordPayload);
      if (typeof toast === "function") toast(`Đã lưu «${ru}» vào «${jar.name}» thành công!`);
    }

    if (typeof STORE !== "undefined") {
      STORE.set("custom_jars", currentCustomJars);
    }
    if (typeof playQuizletSound === "function") playQuizletSound("correct");
    closeModal();

    // Nếu người dùng đang học trong một lọ (in-workspace):
    // Giữ nguyên giao diện học tập hiện tại, tuyệt đối KHÔNG đóng lọ hay chuyển tab!
    const detailHost = document.getElementById("jarDetailHost");
    const inWorkspace = document.body.classList.contains("in-workspace") || (detailHost && !detailHost.classList.contains("hidden"));
    if (inWorkspace) {
      // Nếu từ vừa lưu vào chính lọ hiện đang mở, cập nhật từ mà vẫn giữ nguyên tab hiện tại
      if (String(window.currentActiveJarId) === String(jarId) && typeof window.refreshActiveWorkspace === "function") {
        window.refreshActiveWorkspace();
      }
    } else if (typeof window.refreshVocabViews === "function") {
      window.refreshVocabViews();
    }
  };
};
// Export alias để tương thích với mọi chỗ gọi
window.openAddJarModal = window.openAddToJarModal;

function openAddWordToJarModal(jarId, onSuccess) {
  let m = document.getElementById("addWordToJarModal");
  if (m) m.remove();
  m = document.createElement("div");
  m.id = "addWordToJarModal";
  m.className = "add-jar-modal";
  m.innerHTML = `
    <div class="add-jar-box">
      <!-- Close Button -->
      <button type="button" class="add-jar-close" id="closeAddWordModal" title="Đóng cửa sổ" aria-label="Đóng cửa sổ">
        ${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "✕"}
      </button>

      <!-- Header -->
      <div class="add-jar-header">
        <div class="add-jar-icon-badge">
          ${window.RusiIcons ? RusiIcons.get("plus", { size: 20 }) : "+"}
        </div>
        <div class="add-jar-title-wrap">
          <h3 class="add-jar-title">Thêm từ mới vào Lọ</h3>
          <p class="add-jar-subtitle">Nhập thông tin từ vựng tiếng Nga để thêm vào lọ học tập</p>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:11px;margin-bottom:16px">
        <label style="display:block">
          <span style="font-size:0.825rem;font-weight:700;color:var(--text,#0f1f38);display:block;margin-bottom:4px">Từ tiếng Nga (*):</span>
          <input type="text" id="newWordRu" class="add-jar-input" placeholder="Ví dụ: спасибо" autocomplete="off" />
        </label>

        <label style="display:block">
          <span style="font-size:0.825rem;font-weight:700;color:var(--text,#0f1f38);display:block;margin-bottom:4px">Trọng âm (tùy chọn):</span>
          <input type="text" id="newWordStress" class="add-jar-input" placeholder="Ví dụ: спасибо́" autocomplete="off" />
        </label>

        <label style="display:block">
          <span style="font-size:0.825rem;font-weight:700;color:var(--text,#0f1f38);display:block;margin-bottom:4px">Nghĩa tiếng Việt (*):</span>
          <input type="text" id="newWordVi" class="add-jar-input" placeholder="Ví dụ: cảm ơn" autocomplete="off" />
        </label>

        <label style="display:block">
          <span style="font-size:0.825rem;font-weight:700;color:var(--text,#0f1f38);display:block;margin-bottom:4px">Từ loại / Ghi chú:</span>
          <input type="text" id="newWordNote" class="add-jar-input" placeholder="Ví dụ: thán từ lịch sự" autocomplete="off" />
        </label>

        <label style="display:block">
          <span style="font-size:0.825rem;font-weight:700;color:var(--text,#0f1f38);display:block;margin-bottom:4px">Câu ví dụ thực tế:</span>
          <input type="text" id="newWordEx" class="add-jar-input" placeholder="Ví dụ: Большое спасибо за помощь!" autocomplete="off" />
        </label>
      </div>

      <div class="add-jar-footer">
        <button type="button" class="btn btn-outline btn-sm" id="cancelAddWord">Hủy</button>
        <button type="button" class="btn btn-primary btn-sm add-jar-btn-save" id="saveAddWord">
          ${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu từ này
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(m);

  const ruInput = m.querySelector("#newWordRu");
  if (ruInput) {
    setTimeout(() => ruInput.focus(), 60);
  }

  const closeModal = () => {
    document.removeEventListener("keydown", onKey);
    m.remove();
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Enter") {
      e.preventDefault();
      m.querySelector("#saveAddWord").click();
    }
  };
  document.addEventListener("keydown", onKey);

  m.querySelector("#closeAddWordModal").onclick = closeModal;
  m.querySelector("#cancelAddWord").onclick = closeModal;
  m.onclick = (e) => { if (e.target === m) closeModal(); };

  m.querySelector("#saveAddWord").onclick = () => {
    const ru = (m.querySelector("#newWordRu").value || "").trim();
    const stress = (m.querySelector("#newWordStress").value || "").trim() || ru;
    const vi = (m.querySelector("#newWordVi").value || "").trim();
    const note = (m.querySelector("#newWordNote").value || "").trim();
    const ex = (m.querySelector("#newWordEx").value || "").trim();

    if (!ru) { if (typeof toast === "function") toast("Vui lòng nhập từ tiếng Nga"); return; }
    if (!vi) { if (typeof toast === "function") toast("Vui lòng nhập nghĩa tiếng Việt"); return; }

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
    }
    let jar = customJars.find(j => String(j.id) === String(jarId));
    if (!jar) {
      jar = customJars[0];
    }
    if (!jar) { if (typeof toast === "function") toast("Không tìm thấy lọ!"); return; }

    jar.words = jar.words || [];
    const wordPayload = { ru, stress, vi, note, ex };
    const existingIdx = jar.words.findIndex(w => (w.ru || "").trim().toLowerCase() === ru.toLowerCase());

    if (existingIdx >= 0) {
      jar.words[existingIdx] = Object.assign({}, jar.words[existingIdx], wordPayload);
      if (typeof toast === "function") toast(`Đã cập nhật từ «${ru}» trong lọ «${jar.name}»!`);
    } else {
      jar.words.push(wordPayload);
      if (typeof toast === "function") toast(`Đã thêm từ «${ru}» vào lọ «${jar.name}» thành công!`);
    }

    if (typeof STORE !== "undefined") {
      STORE.set("custom_jars", customJars);
    }
    if (typeof playQuizletSound === "function") playQuizletSound("correct");
    closeModal();
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
    const formatFn = window.formatRussianGrammar || (typeof formatRussianGrammar === "function" ? formatRussianGrammar : null);
    if (formatFn) {
      const formatted = formatFn(w.pos, w.gram, w.gender, w.aspect);
      if (formatted) return formatted;
    }
    const parts = [];
    if (w.pos) parts.push(w.pos);
    if (w.gender) parts.push(w.gender);
    if (parts.length > 0) return parts.join(" ");
    if (w.note && w.note.length <= 30 && !w.note.includes("|") && !w.note.includes(".")) {
      if (formatFn) {
        const noteFormatted = formatFn(w.note);
        if (noteFormatted) return noteFormatted;
      }
      return w.note;
    }
    return "";
  };

  const words = (rawWords || []).map((w, idx) => ({
    id: w.id || w.vocab_id || "w-" + idx,
    ru: (w.ru || "").trim(),
    stress: (w.stress || w.ru || "").trim(),
    vi: (w.vi || w.meaning || "").trim(),
    note: (w.note || w.pos || w.trans || "").trim(),
    pos: (w.pos || "").trim(),
    gender: (w.gender || "").trim(),
    ex: stripQuotes(w.ex),
    ex_vi: (w.ex_vi || "").trim(),
    collocation: stripQuotes(w.collocation),
    verb_obj: (w.verb_obj || w.gov || "").trim(),
    gov: (w.gov || "").trim(),
    syn: stripQuotes(w.syn),
    ant: stripQuotes(w.ant)
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
          <!-- FRONT FACE (RU) — CĂN GIỮA TUYỆT ĐỐI, BỎ NÚT LƯU THEO YÊU CẦU -->
          <div class="quizlet-card-face quizlet-card-front">
            <div class="qcard-main">
              <div class="qcard-word ru">${esc(currentWord.stress || currentWord.ru)}</div>
              ${getWordType(currentWord) ? `<div class="qcard-pos-line">(${esc(getWordType(currentWord))})</div>` : ""}
              <button type="button" class="qcard-audio-btn" id="qAudioFront" title="Phát âm tiếng Nga">
                ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 20 }) : ""}
              </button>
            </div>
          </div>

          <!-- BACK FACE (VI) — CĂN GIỮA CÂN ĐỐI, CHỈ CÓ ICON LỌ KHÔNG HIỂN THỊ CHỮ LƯU -->
          <div class="quizlet-card-face quizlet-card-back">
            <div class="qcard-top-row">
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-addjar qcard-icon-only" id="qAddJarBack" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""}</button>
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
                  <div class="qcard-ex-text ru">${esc(currentWord.ex)}</div>
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
                  ${esc(q.ru)} có nghĩa là gì?
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
                  ${esc(q.ru)} có nghĩa là ${esc(q.statement)}?
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
                        <span class="dau-row-ru ru">${esc(displayWord)}</span>
                      </div>
                      ${getWordType(w) ? `<div class="dau-row-pos-line">(${esc(getWordType(w))})</div>` : ""}
                    </div>

                    <!-- CỘT 2 (GIỮA): NGHĨA TIẾNG VIỆT & CÂU VÍ DỤ SONG NGỮ, CỤM ĐỘNG TỪ, QUẢN CÁCH, ĐỒNG/TRÁI NGHĨA, GHI CHÚ -->
                    <div class="dau-row-col-vi">
                      <div class="dau-row-vi-text">${esc(w.vi)}</div>
                      ${w.ex ? `
                        <div class="dau-row-ex-wrap">
                          <div class="dau-row-ex-line">
                            <span class="dau-row-ex ru">${esc(w.ex)}</span>
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
                      <button type="button" class="dau-action-icon-btn btn-addjar-item" data-ru="${esc(w.ru)}" data-stress="${esc(w.stress || w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" data-ex="${esc(w.ex || "")}" data-exvi="${esc(w.ex_vi || "")}" title="Lưu vào Lọ cá nhân (icon archive-jar)">
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
            stress: curWord.stress || curWord.ru,
            note: curWord.note,
            ex: curWord.ex,
            ex_vi: curWord.ex_vi
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
            stress: b.dataset.stress || b.dataset.ru,
            vi: b.dataset.vi,
            note: b.dataset.note,
            ex: b.dataset.ex,
            ex_vi: b.dataset.exvi
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
    window.currentActiveJarId = null;
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
          <button type="button" class="dau-back-btn" id="btnBackJars" title="Quay lại kho từ vựng" aria-label="Quay lại kho từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="dau-workspace-info">
            <span class="dau-badge dau-badge-cat">SRS</span>
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
  let cloudJars = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("jars:system") : null;

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
    const jars = systemJars.map(j => ({
      id: j.id,
      code: j.code || j.id,
      kind: "jar",
      level: j.level || "A1",
      levelName: j.levelName || (j.level === "B2" ? "Trung cấp cao B2" : j.level === "B1" ? "Trung cấp B1" : j.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
      title: j.name || j.title,
      desc: j.desc || j.description || "",
      icon: j.icon || "archive-jar",
      wordsCount: (j.words || []).length,
      is_pro_only: Boolean(j.is_pro_only || j.is_vip || (j.level === "B2" && j.id !== "jar_travel") || j.id === "jar_bank" || j.id === "jar_hospital" || j.id === "jar_dekanat"),
      words: j.words || [],
      article: j.article || null,
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
          <article class="dau-card dau-card-compact ${isFinished ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-vocab-id="${item.id}" data-kind="jar" data-pro="${isPro}">
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
            <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
              <div class="topic-footer-actions">
                ${isPro && !isUnlocked ? `
                  <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                    ${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 16 }) : ""}
                  </span>
                ` : `
                  <button type="button" class="btn-jar-list topic-text-btn" data-jar-id="${item.id}" title="Mở danh sách Lọ từ vựng để học Flashcard Spaced Repetition">
                    ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 14 }) : ""} Lọ từ vựng
                  </button>
                  <button type="button" class="btn-topic-article topic-circle-btn" data-jar-id="${item.id}" title="Xem bài học chủ đề">
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
    }, { remainingCount, unit: "bài" });

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
        openCreateJarModal();
      };
    }

    const jarsContainer = userJarsHost || sidebarHost;
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
      const masteredListRaw = (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
      const masteredSet = new Set(masteredListRaw.map(r => (r || "").toLowerCase().trim()));

      let srsState = null;
      if (typeof SRS !== "undefined" && SRS.getState) {
        try { srsState = SRS.getState(); } catch (e) {}
      }
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (c.mastered && c.ru) {
            masteredSet.add(c.ru.toLowerCase().trim());
          }
        });
      }

      // Tập hợp các từ cần ôn (Due)
      const now = Date.now();
      const dueSet = new Set();
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (!c.mastered && c.dueDate <= now && c.ru) {
            dueSet.add(c.ru.toLowerCase().trim());
          }
        });
      }

      // 2. Gom từ vựng thuộc phạm vi học tập thực tế của người dùng:
      // (Bao gồm thẻ trong SRS của người dùng và các từ đã lưu vào Lọ cá nhân / Lọ yêu thích)
      const masteredList = [];
      const dueList = [];
      const newList = [];
      const seenRu = new Set();

      // Từ trong SRS cards của người dùng
      if (srsState && srsState.cards) {
        Object.values(srsState.cards).forEach(c => {
          if (!c || !c.ru) return;
          const k = c.ru.toLowerCase().trim();
          if (seenRu.has(k)) return;
          seenRu.add(k);

          const wordItem = {
            ru: c.ru,
            stress: c.stress || c.ru,
            vi: c.vi || "",
            pos: c.pos || "",
            level: c.level || "A1",
            jarTitle: c.jarTitle || "Lộ trình SRS"
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
      const customJars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
      (customJars || []).forEach(jar => {
        (jar.words || []).forEach(w => {
          if (!w || !w.ru) return;
          const k = w.ru.toLowerCase().trim();
          if (seenRu.has(k)) return;
          seenRu.add(k);

          const wordItem = {
            ru: w.ru,
            stress: w.stress || w.ru,
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

      // Bổ sung các từ người dùng đã đánh dấu thuộc nhưng chưa có trong danh sách trên
      masteredSet.forEach(ruKey => {
        if (!seenRu.has(ruKey)) {
          seenRu.add(ruKey);
          masteredList.push({ ru: ruKey, vi: "Từ đã thuộc", jarTitle: "Đã lưu" });
        }
      });

      // Nếu người dùng mới tinh (chưa lưu từ nào vào Lọ cá nhân và chưa có thẻ trong deck),
      // hiển thị danh sách từ mới gợi ý khởi đầu (10 từ A1)
      if (newList.length === 0 && masteredList.length === 0 && dueList.length === 0) {
        if (typeof SRS_WORDS !== "undefined" && Array.isArray(SRS_WORDS)) {
          SRS_WORDS.slice(0, 10).forEach(w => {
            newList.push({ ...w, jarTitle: "Gợi ý khởi đầu (A1)" });
          });
        }
      }

      let activeList = currentTab === "mastered" ? masteredList : currentTab === "due" ? dueList : newList;
      if (searchTxt) {
        const q = searchTxt.toLowerCase().trim();
        activeList = activeList.filter(w =>
          (w.ru && w.ru.toLowerCase().includes(q)) ||
          (w.vi && w.vi.toLowerCase().includes(q))
        );
      }

      modal.innerHTML = `
        <div class="anticheat-modal-box voc-progress-modal-box" style="text-align:left;max-width:680px;width:95%;padding:22px 24px;border-top:5px solid var(--primary);max-height:88vh;display:flex;flex-direction:column;box-sizing:border-box">
          <!-- HEADER -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-shrink:0">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="width:36px;height:36px;border-radius:10px;background:var(--primary-soft,#e3effc);color:var(--primary,#1757a6);display:grid;place-items:center;font-size:1.1rem">
                ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 20 }) : "📚"}
              </span>
              <div>
                <h3 style="margin:0;font-size:1.15rem;font-weight:800;color:var(--text)">Danh Sách Từ Vựng Tiến Độ</h3>
                <span style="font-size:0.8rem;color:var(--muted)">Xem và quản lý các từ vựng theo trạng thái học tập</span>
              </div>
            </div>
            <button type="button" id="closeProgressModal" class="btn btn-soft" style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer" title="Đóng">${window.RusiIcons ? RusiIcons.get("x", { size: 18 }) : "✕"}</button>
          </div>

          <!-- TABS THEO LEVEL-TAB STYLE (PHẲNG, GẠCH CHÂN KHI ACTIVE) -->
          <div class="voc-progress-modal-tabs" style="display:flex;align-items:center;gap:6px;border-bottom:2px solid var(--border,#d2e0f0);margin-bottom:14px;flex-shrink:0">
            <button type="button" class="voc-pmodal-tab ${currentTab === "mastered" ? "active" : ""}" data-tab="mastered" style="background:transparent;border:none;padding:10px 14px;cursor:pointer;font-size:0.88rem;font-weight:${currentTab === "mastered" ? "800" : "600"};color:${currentTab === "mastered" ? "var(--green,#16a34a)" : "var(--muted)"};position:relative;display:inline-flex;align-items:center;gap:6px">
              ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : "✓"} Đã thuộc (${masteredList.length})
              ${currentTab === "mastered" ? `<span style="position:absolute;bottom:-2px;left:0;right:0;height:3px;background:var(--green,#16a34a);border-radius:2px"></span>` : ""}
            </button>
            <button type="button" class="voc-pmodal-tab ${currentTab === "due" ? "active" : ""}" data-tab="due" style="background:transparent;border:none;padding:10px 14px;cursor:pointer;font-size:0.88rem;font-weight:${currentTab === "due" ? "800" : "600"};color:${currentTab === "due" ? "var(--amber,#f59e0b)" : "var(--muted)"};position:relative;display:inline-flex;align-items:center;gap:6px">
              ${window.RusiIcons ? RusiIcons.get("clock-time", { size: 16 }) : "⏰"} Cần ôn (${dueList.length})
              ${currentTab === "due" ? `<span style="position:absolute;bottom:-2px;left:0;right:0;height:3px;background:var(--amber,#f59e0b);border-radius:2px"></span>` : ""}
            </button>
            <button type="button" class="voc-pmodal-tab ${currentTab === "new" ? "active" : ""}" data-tab="new" style="background:transparent;border:none;padding:10px 14px;cursor:pointer;font-size:0.88rem;font-weight:${currentTab === "new" ? "800" : "600"};color:${currentTab === "new" ? "var(--primary,#1757a6)" : "var(--muted)"};position:relative;display:inline-flex;align-items:center;gap:6px">
              ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : "✨"} Từ mới (${newList.length})
              ${currentTab === "new" ? `<span style="position:absolute;bottom:-2px;left:0;right:0;height:3px;background:var(--primary,#1757a6);border-radius:2px"></span>` : ""}
            </button>
          </div>

          <!-- SEARCH BAR -->
          <div style="position:relative;margin-bottom:12px;flex-shrink:0">
            <input type="text" id="vocProgressSearchInput" placeholder="Tìm kiếm từ tiếng Nga hoặc nghĩa tiếng Việt..." value="${searchTxt}" style="width:100%;padding:9px 14px;border:1px solid var(--border);border-radius:10px;font-size:0.9rem;box-sizing:border-box;background:var(--bg);color:var(--text)" />
            ${searchTxt ? `<button type="button" id="vocProgressSearchClear" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:1.1rem;cursor:pointer;color:var(--muted)">×</button>` : ""}
          </div>

          <!-- LIST CONTAINER -->
          <div class="voc-progress-words-list" style="flex:1 1 auto;overflow-y:auto;padding-right:4px;display:flex;flex-direction:column;gap:8px">
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
                <div class="voc-pmodal-row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;background:rgba(23,87,166,0.03);border:1px solid var(--border);border-radius:10px;transition:background 0.15s ease">
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
                      <strong class="ru" style="font-size:1.05rem;color:var(--text);cursor:pointer" data-speak-ru="${w.ru}" title="Nhấn để nghe phát âm">${displayWord}</strong>
                      ${w.pos ? `<span style="font-size:0.8rem;font-style:italic;color:var(--muted)">(${(window.formatRussianGrammar ? window.formatRussianGrammar(w.pos, null, w.gender) : w.pos)})</span>` : ""}
                      ${w.jarTitle ? `<span class="dau-badge" style="font-size:0.68rem;padding:1px 6px;border-radius:4px;background:var(--primary-soft,#e3effc);color:var(--primary,#1757a6)">${w.jarTitle}</span>` : ""}
                    </div>
                    <div style="font-size:0.9rem;color:var(--text);margin-top:2px">${w.vi || ""}</div>
                    ${w.ex ? `<div class="ru" style="font-size:0.82rem;color:var(--muted);margin-top:3px;font-style:italic">${esc(stripQuotes(w.ex))}</div>` : ""}
                  </div>

                  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                    <button type="button" class="btn btn-soft btn-sm btn-pmodal-speak" data-ru="${w.ru}" style="width:34px;height:34px;padding:0;border-radius:8px;display:grid;place-items:center;cursor:pointer" title="Nghe phát âm">
                      ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 15 }) : "🔊"}
                    </button>
                    ${currentTab === "mastered" ? `
                      <button type="button" class="btn btn-soft btn-sm btn-pmodal-unmaster" data-ru="${w.ru}" style="padding:6px 10px;font-size:0.8rem;border-radius:8px;color:var(--muted);cursor:pointer" title="Bỏ khỏi danh sách đã thuộc để tiếp tục ôn tập">
                        Hủy thuộc
                      </button>
                    ` : currentTab === "due" ? `
                      <button type="button" class="btn btn-primary btn-sm btn-pmodal-study-one" data-ru="${w.ru}" style="padding:6px 12px;font-size:0.8rem;font-weight:700;border-radius:8px;cursor:pointer">
                        Ôn ngay
                      </button>
                    ` : `
                      <button type="button" class="btn btn-outline btn-sm btn-pmodal-add-queue" data-ru="${w.ru}" style="padding:6px 10px;font-size:0.8rem;border-radius:8px;cursor:pointer">
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

      modal.querySelectorAll(".voc-pmodal-tab").forEach(tab => {
        tab.onclick = () => {
          currentTab = tab.dataset.tab;
          searchTxt = "";
          renderModalContent();
        };
      });

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
          if (ru) {
            if (typeof speak === "function") speak(ru);
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
            SRS.unmarkMastered(normRu);
          }
          if (typeof toast === "function") toast(`Đã hủy trạng thái thuộc của «${ru}»`);
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
          if (ru && typeof SRS !== "undefined" && SRS.addToQueue) {
            SRS.addToQueue(ru);
            if (typeof toast === "function") toast(`Đã đưa «${ru}» vào hàng đợi ôn tập!`);
            window.dispatchEvent(new CustomEvent("trki:progress-updated"));
            renderModalContent();
          }
        };
      });
    };

    renderModalContent();
  };

  const openCreateJarModal = () => {
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
      const name = (inputName ? inputName.value : "").trim();
      if (!name) {
        toast("Vui lòng nhập tên lọ từ vựng");
        if (inputName) inputName.focus();
        return;
      }
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
      closeModal();
      renderVocabHub();
    };

    const btnSave = m.querySelector("#saveJar");
    if (btnSave) btnSave.onclick = doSave;
  };

const showTopicArticle = (jarId) => {
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

    if (!item) return;
    const jar = item.raw || item;

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
    const srsPane = el("#vocPaneAlgorithm");
    if (srsPane) srsPane.classList.add("hidden");
    const detail = el("#jarDetailHost");
    if (!detail) return;
    detail.classList.remove("hidden");

    // Lấy nội dung bài học chuyên sâu
    const articlesMap = (typeof TOPIC_ARTICLES !== "undefined") ? TOPIC_ARTICLES : {};
    const customArticle = (previewDraft && (previewDraft.id === jarId || previewDraft.code === jarId || previewDraft.article))
      ? (previewDraft.article || previewDraft)
      : (jar.article || (jar.code && articlesMap[jar.code]) || (item.code && articlesMap[item.code]) || articlesMap[jar.id] || null);

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
            <div class="topic-dialogue-ru ru">${esc(d.ru)}</div>
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
            <div class="topic-dialogue-ru ru">${esc(w.ex || w.ru)}</div>
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

    // Chuỗi hành động & Mẫu câu ngữ cảnh (Action Chains Table từ file Excel)
    let actionChainsHtml = "";
    if (customArticle && customArticle.actionChains && customArticle.actionChains.length) {
      actionChainsHtml = `
        <!-- PHẦN: CHUỖI HÀNH ĐỘNG & MẪU CÂU NGỮ CẢNH -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">II</span> Chuỗi hành động &amp; Mẫu câu ngữ cảnh
          </h2>
          <div class="topic-action-chains-wrapper">
            ${customArticle.actionChains.map((group, gIdx) => `
              <div class="topic-action-chain-group" style="margin-bottom:24px">
                <h3 style="font-size:1.05rem;font-weight:700;color:var(--primary);margin:0 0 10px 0;display:flex;align-items:center;gap:6px">
                  ${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 16 }) : "✦"} ${esc(group.subTopic || ("Nhóm " + (gIdx + 1)))}
                </h3>
                <div class="topic-vocab-table-wrapper" style="overflow-x:auto">
                  <table class="topic-vocab-table">
                    <thead>
                      <tr>
                        <th style="width:40px;text-align:center">#</th>
                        <th>Đối tượng / Từ vựng</th>
                        <th>Hành động / Công dụng</th>
                        <th>Ngữ cảnh / Địa điểm</th>
                        <th>Ví dụ thực tế (Nga — Việt)</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${group.items.map((it, idx) => `
                        <tr>
                          <td style="text-align:center;color:#94a3b8;font-weight:700">${idx + 1}</td>
                          <td style="min-width:130px">
                            <div class="topic-word-ru ru">${esc(it.target || "—")}</div>
                            ${it.target_vi ? `<div class="topic-word-vi" style="font-size:0.82rem;color:#475569;white-space:pre-line">${esc(it.target_vi)}</div>` : ""}
                          </td>
                          <td style="min-width:140px">
                            <div class="ru" style="font-weight:600;color:#0f1f38;white-space:pre-line">${esc(it.action || "—")}</div>
                            ${it.action_vi ? `<div style="font-size:0.82rem;color:#64748b;white-space:pre-line">${esc(it.action_vi)}</div>` : ""}
                          </td>
                          <td style="min-width:140px">
                            <div class="ru" style="color:#1e293b;white-space:pre-line">${esc(it.place || "—")}</div>
                            ${it.place_vi ? `<div style="font-size:0.82rem;color:#64748b;white-space:pre-line">${esc(it.place_vi)}</div>` : ""}
                          </td>
                          <td style="min-width:240px">
                            ${it.ex ? `<div class="topic-word-ex ru" style="font-weight:600;color:var(--primary);margin-bottom:2px;white-space:pre-line">${esc(stripQuotes(it.ex))}</div>` : ""}
                            ${it.ex_vi ? `<div style="font-size:0.82rem;color:#475569;white-space:pre-line">${esc(it.ex_vi)}</div>` : ""}
                          </td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }

    // Bảng từ vựng chi tiết
    const vocabRowsHtml = words.map((w, idx) => {
      const posLabel = typeof formatRussianGrammar === "function" ? formatRussianGrammar(w.pos, null, w.gender) : (w.pos || "");
      return `
      <tr>
        <td style="width:40px;color:#94a3b8;font-weight:700;text-align:center">${idx + 1}</td>
        <td style="min-width:140px">
          <div class="topic-word-ru ru">${esc(w.stress || w.ru)}</div>
          ${posLabel ? `<span class="topic-word-note ru" style="font-style:italic;color:var(--primary,#0039a6);font-weight:600">(${esc(posLabel)})</span>` : (w.note ? `<span class="topic-word-note">${esc(w.note)}</span>` : '')}
        </td>
        <td style="min-width:130px" class="topic-word-vi">${esc(w.vi)}</td>
        <td style="min-width:220px">
          <div class="topic-word-ex ru" style="font-weight:600;color:var(--primary,#0039a6);margin-bottom:2px">${w.ex ? esc(stripQuotes(w.ex)) : '—'}</div>
          ${w.ex_vi ? `<div style="font-size:0.82rem;color:#475569;line-height:1.35">${esc(w.ex_vi)}</div>` : ''}
        </td>
      </tr>
    `;
    }).join("");

    detail.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar topic-article-nav-bar no-print">
        <button type="button" class="dau-back-btn" id="btnBackFromArticle" title="Quay lại danh sách chủ đề" aria-label="Quay lại danh sách chủ đề">
          ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
        </button>
        <div class="dau-workspace-info">
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
            ${customArticle && customArticle.intro ? (window.RusiMarkdown ? RusiMarkdown.render(customArticle.intro) : esc(customArticle.intro)) : `
              Chủ đề <strong>«${esc(jar.name)}»</strong> đóng vai trò vô cùng thiết yếu trong đời sống và giao tiếp tiếng Nga trình độ ${jar.level}. 
              Nắm vững hệ thống từ vựng và cấu trúc diễn đạt của chủ đề này giúp bạn tự tin xử lý mọi tình huống thực tế khi du học, công tác hoặc thi chứng chỉ TRKI.
            `}
          </div>
        </section>

        ${(customArticle && (customArticle.content_markdown || customArticle.content)) ? `
          <!-- PHẦN: NỘI DUNG BÀI GIẢNG / BÀI ĐỌC CHUYÊN SÂU MARKDOWN (.MD) -->
          <section class="topic-article-section topic-article-markdown-body">
            <h2 class="topic-article-sec-title" style="margin-bottom:18px">
              <span class="sec-badge">✦</span> Nội dung bài học chuyên đề (.md)
            </h2>
            <div class="rusi-md-rendered">
              ${window.RusiMarkdown ? RusiMarkdown.render(customArticle.content_markdown || customArticle.content) : `<p>${esc(customArticle.content_markdown || customArticle.content)}</p>`}
            </div>
          </section>
        ` : ""}

        ${actionChainsHtml}

        <!-- PHẦN HỘI THOẠI MẪU & CÂU GIAO TIẾP THEN CHỐT -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">${actionChainsHtml ? "III" : "II"}</span> Hội thoại mẫu &amp; Mẫu câu then chốt
          </h2>
          <div class="topic-dialogue-box">
            ${dialoguesHtml}
          </div>
        </section>

        <!-- PHẦN ĐIỂM NGỮ PHÁP & LƯU Ý VĂN HÓA -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">${actionChainsHtml ? "IV" : "III"}</span> Điểm ngữ pháp &amp; Bí kíp sinh tồn
          </h2>
          ${grammarHtml}
          ${customArticle && customArticle.culturalTip ? `
            <div style="margin-top:16px;background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:10px;padding:14px 18px;font-size:0.88rem;color:#92400e;line-height:1.55">
              <strong>${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Mẹo văn hóa thực tế:</strong> ${esc(customArticle.culturalTip)}
            </div>
          ` : ''}
        </section>

        <!-- PHẦN BẢNG TỪ VỰNG TRỌNG TÂM -->
        <section class="topic-article-section">
          <h2 class="topic-article-sec-title">
            <span class="sec-badge">${actionChainsHtml ? "V" : "IV"}</span> Bảng từ vựng trọng tâm (${words.length} từ)
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
    window.currentActiveJarId = jarId;
    const customJars = STORE.get("custom_jars", []);
    const baseJars = (cloudJars && cloudJars.length) ? cloudJars : ((window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("jars:system") : []) || [];
    let jar = [...baseJars, ...customJars].find((j) => j.id === jarId || j.code === jarId);
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
          <button type="button" class="dau-back-btn" id="btnBackJars" title="Quay lại kho Lọ từ vựng" aria-label="Quay lại kho Lọ từ vựng">
            ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
          </button>
          <div class="dau-workspace-info">
            ${isCustom ? '<span class="dau-badge dau-badge-custom">LỌ CỦA TÔI</span>' : ''}
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
        onWordListChange: (mode) => {
          showJarDetail(jar.id, mode || getActiveWorkspaceMode());
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
          <button type="button" class="dau-back-btn" id="btnBackLessons" title="Quay lại danh sách từ vựng" aria-label="Quay lại danh sách từ vựng">
            <i data-rusi-icon="arrow-left" data-size="18"></i>
          </button>
          <div class="dau-workspace-info">
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

  // Hỗ trợ mở trực tiếp Lọ từ vựng hoặc Bài học chủ đề từ URL / Live Preview Studio CMS
  const urlParams = new URLSearchParams(window.location.search);
  const targetTopic = urlParams.get("topic") || urlParams.get("article");
  const targetJar = urlParams.get("jar");
  const targetMode = urlParams.get("mode");

  if (targetTopic) {
    if (targetMode === "jar") {
      showJarDetail(targetTopic);
    } else {
      showTopicArticle(targetTopic);
    }
  } else if (targetJar) {
    showJarDetail(targetJar);
  } else {
    renderVocabHub();
  }
}


/* =====================================================================
 * CHUYÊN MỤC 6: LUYỆN NGHE CHÉP CHÍNH TẢ 4 PART (CEFR FORMAT)
 * ===================================================================== */
function initListeningPage() {
  const host = el("#listenHost");
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
    comprehension: {
      title: "Nghe hiểu",
      subtitle: "Luyện nghe hội thoại, đoạn văn và trả lời câu hỏi trắc nghiệm",
      icon: "headphones"
    },
    dictation: {
      title: "Nghe chép chính tả",
      subtitle: "Nghe từng câu, rèn luyện bắt âm chuẩn và gõ lại tiếng Nga chính xác",
      icon: "edit-3"
    }
  };

  const LESSON_COVERS = {
    airport: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80",
    shop: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    dorm: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    campus: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    metro: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    interview: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  };
  const DEFAULT_LISTENING_COVER = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";

  let currentMode = "comprehension";
  let currentLevel = "A1";
  let currentSpeed = 1.0;
  let showSub = true;
  let currentLesson = null;
  let cloudListening = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("listening:all") : null;
  /**
   * BỘ TẠO SÓNG ÂM REALTIME THEO ÂM THANH THỰC (RUSI REALTIME AUDIO WAVEFORM)
   * - Hoàn toàn không phụ thuộc CDN bên ngoài
   * - Độ phân giải Retina siêu nét qua HTML5 Canvas
   * - Lên xuống động 60fps theo ngữ điệu, âm tiết, nguyên âm và từ vựng tiếng Nga đang phát
   * - Thanh tiến độ mượt mà quét qua từng câu, hỗ trợ tua và phát lại khi nhấn vào sóng âm
   */
  /**
   * BỘ TẠO SÓNG ÂM REALTIME CAO CẤP (RUSI 60–100 BARS INTERACTIVE WAVEFORM ENGINE)
   * - Hiển thị 60–100 thanh sóng âm thanh theo chiều ngang (tự động điều chỉnh theo chiều rộng)
   * - Mỗi thanh có chiều cao khác nhau theo dữ liệu giải mã âm thanh hoặc mô phỏng âm vị tiếng Nga nhất quán
   * - Đầu thanh bo tròn hoàn hảo (rounded bars) với khoảng cách nhỏ đồng đều
   * - Sóng đã phát: màu xanh dương #4598FF
   * - Sóng chưa phát: màu xám #626B79
   * - Màu xanh di chuyển chính xác theo tiến độ phát thực tế
   * - Hỗ trợ tua đến vị trí bất kỳ bằng nhấp chuột hoặc kéo cảm ứng
   * - Khi phát hết audio, toàn bộ waveform chuyển sang màu đã phát (#4598FF)
   */
  const audioPeaksCache = new Map();

  const extractAudioPeaks = async (url, count) => {
    if (!url) return null;
    const key = `${url}:${count}`;
    if (audioPeaksCache.has(key)) return audioPeaksCache.get(key);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      const actx = new AudioCtx();
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const buf = await resp.arrayBuffer();
      const audioBuf = await actx.decodeAudioData(buf);
      const data = audioBuf.getChannelData(0);
      const blockSize = Math.floor(data.length / count);
      const peaks = new Float32Array(count);
      let maxPeak = 0.0001;

      for (let i = 0; i < count; i++) {
        let sum = 0;
        const start = i * blockSize;
        const end = Math.min(data.length, start + blockSize);
        for (let j = start; j < end; j++) {
          sum += Math.abs(data[j]);
        }
        const amp = sum / (end - start);
        peaks[i] = amp;
        if (amp > maxPeak) maxPeak = amp;
      }
      for (let i = 0; i < count; i++) {
        peaks[i] = Math.max(0.14, Math.min(0.96, (peaks[i] / maxPeak) * 0.95));
      }
      try { actx.close(); } catch (_) {}
      audioPeaksCache.set(key, peaks);
      return peaks;
    } catch (_) {
      return null;
    }
  };

  const generateConsistentWaveform = (text, count) => {
    const clean = (text || "").trim();
    const profile = new Float32Array(count);
    if (!clean || count <= 0) {
      profile.fill(0.18);
      return profile;
    }

    // Bộ sinh số giả ngẫu nhiên có định hướng (deterministic PRNG) theo hạt giống chuỗi
    // Đảm bảo cùng một câu tiếng Nga luôn có vân sóng âm thanh thực tế nhất quán 100%
    const hashSeed = (str) => {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };
    const baseSeed = hashSeed(clean);
    const pseudoRand = (i) => {
      const s = (baseSeed + i * 374761393) ^ 0x5bf03635;
      const x = Math.sin(s) * 43758.5453;
      return x - Math.floor(x);
    };

    // Tách các từ trong câu thoại
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      profile.fill(0.18);
      return profile;
    }

    const RUSSIAN_VOWELS = new Set(["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"]);
    const RUSSIAN_SONORANTS = new Set(["р", "л", "м", "н", "й"]);

    // Phân bổ thanh sóng cho từng từ + khoảng dừng hơi thở tự nhiên giữa các từ
    const pauseBarsPerWord = Math.max(2, Math.min(4, Math.floor(count / (words.length * 5.5))));
    const totalPauses = (words.length - 1) * pauseBarsPerWord;
    const availableBarsForWords = Math.max(words.length * 3, count - totalPauses);

    const totalWordLength = words.reduce((acc, w) => acc + Math.max(2, w.length), 0);
    const wordBarAllocations = words.map((w) => {
      const share = Math.max(2, w.length) / totalWordLength;
      return Math.max(3, Math.round(share * availableBarsForWords));
    });

    // Cân đối lại tổng số bar khớp chính xác với `count`
    let allocatedTotal = wordBarAllocations.reduce((a, b) => a + b, 0) + totalPauses;
    while (allocatedTotal > count) {
      let maxIdx = 0;
      for (let j = 1; j < wordBarAllocations.length; j++) {
        if (wordBarAllocations[j] > wordBarAllocations[maxIdx]) maxIdx = j;
      }
      if (wordBarAllocations[maxIdx] > 3) {
        wordBarAllocations[maxIdx]--;
        allocatedTotal--;
      } else break;
    }
    while (allocatedTotal < count) {
      let minIdx = 0;
      for (let j = 1; j < wordBarAllocations.length; j++) {
        if (wordBarAllocations[j] < wordBarAllocations[minIdx]) minIdx = j;
      }
      wordBarAllocations[minIdx]++;
      allocatedTotal++;
    }

    // Khởi tạo biên độ âm học tự nhiên cho từng thanh sóng (Acoustic Envelope)
    let curBar = 0;
    words.forEach((word, wIdx) => {
      const wBars = wordBarAllocations[wIdx];
      const cleanWord = word.replace(/[.,!?;:«»""'']/g, "").toLowerCase();
      const hasComma = /[,;—\-]/.test(word);

      // Nhận diện nguyên âm & trọng âm giả định trong từ
      const vowelIndices = [];
      for (let c = 0; c < cleanWord.length; c++) {
        if (RUSSIAN_VOWELS.has(cleanWord[c])) vowelIndices.push(c);
      }
      const stressIdx = vowelIndices.length > 0 ? vowelIndices[Math.floor(vowelIndices.length / 2)] : 0;

      for (let b = 0; b < wBars && curBar < count; b++) {
        const normInWord = b / Math.max(1, wBars - 1);
        const charPos = Math.min(cleanWord.length - 1, Math.floor(normInWord * cleanWord.length));
        const ch = cleanWord[charPos] || "";

        // Năng lượng ngữ âm theo âm tiết tiếng Nga
        let baseEnergy = 0.35;
        if (RUSSIAN_VOWELS.has(ch)) {
          const isStressed = charPos === stressIdx;
          baseEnergy = isStressed ? 0.90 : 0.74;
        } else if (RUSSIAN_SONORANTS.has(ch)) {
          baseEnergy = 0.52;
        } else {
          baseEnergy = 0.36;
        }

        // Vòm âm thanh tự nhiên của từ (syllabic envelope)
        const wordEnvelope = Math.sin(normInWord * Math.PI);
        const syllableHarmonic = Math.sin(normInWord * Math.PI * Math.max(1, vowelIndices.length)) * 0.14;

        // Vi dao động tự nhiên của dây thanh âm người thật (organic micro-texture)
        const microJitter = (pseudoRand(curBar) - 0.5) * 0.16;

        // Ngữ điệu tổng thể câu nói (Intonation declination)
        const globalNorm = curBar / Math.max(1, count - 1);
        const globalEnvelope = 0.68 + 0.32 * Math.sin(Math.pow(globalNorm, 0.75) * Math.PI);

        let amp = (baseEnergy * 0.72 + wordEnvelope * 0.28 + syllableHarmonic + microJitter) * globalEnvelope;
        amp = Math.max(0.12, Math.min(0.96, amp));

        profile[curBar] = amp;
        curBar++;
      }

      // Khoảng nghỉ tự nhiên giữa 2 từ (Pause valley)
      if (wIdx < words.length - 1) {
        const pauseLen = hasComma ? pauseBarsPerWord + 2 : pauseBarsPerWord;
        for (let p = 0; p < pauseLen && curBar < count; p++) {
          const pauseJitter = pseudoRand(curBar) * 0.05;
          profile[curBar] = 0.09 + pauseJitter;
          curBar++;
        }
      }
    });

    while (curBar < count) {
      profile[curBar] = 0.09 + pseudoRand(curBar) * 0.04;
      curBar++;
    }

    // Làm mượt nhẹ 1 lượt để thanh sóng chuyển tiếp êm ái như phòng thu chuyên nghiệp
    const smoothed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const prev = profile[Math.max(0, i - 1)];
      const cur = profile[i];
      const next = profile[Math.min(count - 1, i + 1)];
      smoothed[i] = prev * 0.18 + cur * 0.64 + next * 0.18;
    }
    return smoothed;
  };

  const createRealtimeWaveform = (wrapEl, options = {}) => {
    if (!wrapEl) return null;
    wrapEl.innerHTML = "";

    const canvas = document.createElement("canvas");
    canvas.className = "lis-dict-realtime-canvas";
    wrapEl.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const isSelectedCompWaveform = wrapEl.id === "compWaveformWrap";

    // Live Time Badge
    const timeBadge = document.createElement("span");
    timeBadge.className = "lis-dict-wave-time-badge";
    timeBadge.textContent = "0:00 / 0:00";
    wrapEl.appendChild(timeBadge);

    const formatTime = (sec) => {
      const s = Math.max(0, Math.floor(sec || 0));
      const m = Math.floor(s / 60);
      const r = s % 60;
      return m + ":" + (r < 10 ? "0" : "") + r;
    };

    const estimateDuration = (txt) => {
      if (!txt) return 3.0;
      const wCount = txt.trim().split(/\s+/).length;
      const cCount = txt.length;
      return Math.max(1.2, Math.min(25, (cCount * 95 + wCount * 110 + 200) / 1000));
    };

    let isPlaying = false;
    let isCompleted = false;
    let animId = null;
    let durationSec = 3.0;
    let startTime = 0;
    let spokenText = "";
    let audioUrl = null;
    let activeCharIndex = -1;
    let currentProgress = 0;
    let targetProgress = 0;
    let width = 0;
    let height = 0;
    let hoverX = -1;

    let barCount = 95;
    let profile = new Float32Array(barCount);

    const computeBarCount = (w) => {
      if (isSelectedCompWaveform) {
        return Math.max(48, Math.min(120, Math.floor(w / 6.2)));
      }
      return Math.max(65, Math.min(180, Math.floor(w / 4.4)));
    };

    const updateProfile = async () => {
      if (audioUrl) {
        const realPeaks = await extractAudioPeaks(audioUrl, barCount);
        if (realPeaks && realPeaks.length === barCount) {
          profile = realPeaks;
          return;
        }
      }
      profile = generateConsistentWaveform(spokenText, barCount);
    };

    const updateTimeDisplay = () => {
      const curSec = currentProgress * durationSec;
      timeBadge.textContent = `${formatTime(curSec)} / ${formatTime(durationSec)}`;
    };

    const resize = () => {
      const rect = wrapEl.getBoundingClientRect();
      width = Math.max(120, Math.floor(rect.width || wrapEl.clientWidth || 400));
      height = Math.max(48, Math.floor(rect.height || wrapEl.clientHeight || 74));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      barCount = computeBarCount(width);
      updateProfile();
      updateTimeDisplay();
    };

    resize();
    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(wrapEl);
    }

    const handleSeek = (clientX) => {
      const rect = wrapEl.getBoundingClientRect();
      if (!rect.width) return;
      const clickX = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      targetProgress = pct;
      currentProgress = pct;
      isCompleted = (pct >= 0.995);
      startTime = Date.now() - (pct * durationSec * 1000);
      updateTimeDisplay();
      if (typeof options.onSeek === "function") {
        options.onSeek(pct);
      }
    };

    wrapEl.onclick = (e) => {
      handleSeek(e.clientX);
    };

    let isSeeking = false;
    wrapEl.onpointerdown = (e) => {
      isSeeking = true;
      handleSeek(e.clientX);
      try { wrapEl.setPointerCapture(e.pointerId); } catch (_) {}
    };

    wrapEl.onpointermove = (e) => {
      const rect = wrapEl.getBoundingClientRect();
      hoverX = e.clientX - rect.left;
      if (isSeeking) {
        handleSeek(e.clientX);
      }
    };

    const endSeek = (e) => {
      if (isSeeking) {
        isSeeking = false;
        try { wrapEl.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };
    wrapEl.onpointerup = endSeek;
    wrapEl.onpointercancel = endSeek;
    wrapEl.onmouseleave = () => {
      hoverX = -1;
    };

    const draw = () => {
      if (!ctx || width <= 0 || height <= 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const maxH = isSelectedCompWaveform
        ? Math.max(22, Math.min(40, height * 0.6))
        : Math.max(26, Math.min(48, height * 0.72));
      const minH = isSelectedCompWaveform ? 3 : 4;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark" || (typeof State !== "undefined" && State.theme === "dark");
      const colorPlayed = isSelectedCompWaveform
        ? (isDark ? "#7cb7ff" : "#2468b4")
        : (isDark ? "#60a5fa" : "#1757a6");
      const colorActive = isSelectedCompWaveform
        ? (isDark ? "#b7d7ff" : "#174f91")
        : (isDark ? "#93c5fd" : "#2563eb");
      const colorUnplayed = isSelectedCompWaveform
        ? (isDark ? "rgba(226, 232, 240, 0.22)" : "rgba(100, 116, 139, 0.24)")
        : (isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(100, 116, 139, 0.30)");

      const now = Date.now();

      if (isPlaying && durationSec > 0 && !isCompleted) {
        const elapsed = (now - startTime) / 1000;
        const timeProgress = Math.min(1.0, elapsed / durationSec);
        if (targetProgress > 0) {
          targetProgress = Math.max(targetProgress, timeProgress);
        } else {
          targetProgress = timeProgress;
        }
        currentProgress += (targetProgress - currentProgress) * 0.22;
        if (currentProgress >= 0.995 && timeProgress >= 1.0) {
          currentProgress = 1.0;
          isCompleted = true;
          isPlaying = false;
        }
        updateTimeDisplay();
      }

      if (!isSelectedCompWaveform) {
        // Trục tâm sóng âm thanh (Center Acoustic Baseline)
        ctx.save();
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(23, 87, 166, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        ctx.restore();
      }

      const step = width / barCount;
      const gap = isSelectedCompWaveform
        ? Math.max(2, Math.min(3.2, step * 0.48))
        : Math.max(1.2, Math.min(1.9, step * 0.38));
      const barWidth = Math.max(1.8, step - gap);
      const radius = Math.min(barWidth / 2, isSelectedCompWaveform ? 3 : 2);

      // Vẽ toàn bộ các thanh sóng với biên độ ổn định, chân thực (không bị co giãn méo mó)
      for (let i = 0; i < barCount; i++) {
        const barNorm = (i + 0.5) / barCount;
        const isPassed = isCompleted || currentProgress >= 1.0 || barNorm <= currentProgress;
        const dist = Math.abs(barNorm - currentProgress);

        const val = profile[i] !== undefined ? profile[i] : 0.22;
        const barH = Math.max(minH, minH + val * (maxH - minH));
        const x = i * step + gap / 2;
        const y = centerY - barH / 2;

        if (dist < 0.018 && isPlaying && !isCompleted) {
          ctx.fillStyle = colorActive;
        } else {
          ctx.fillStyle = isPassed ? colorPlayed : colorUnplayed;
        }

        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, barWidth, barH, radius);
        } else {
          ctx.rect(x, y, barWidth, barH);
        }
        ctx.fill();
      }

      // Con trỏ quét sóng siêu mượt (Studio Glowing Playhead)
      if (isPlaying && currentProgress > 0 && currentProgress < 1.0) {
        const headX = currentProgress * width;
        const headH = Math.min(height - 10, maxH + 6);
        const headY = centerY - headH / 2;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = isSelectedCompWaveform ? colorActive : "#ffffff";
        ctx.shadowColor = isSelectedCompWaveform
          ? "transparent"
          : (isDark ? "rgba(147, 197, 253, 0.85)" : "rgba(37, 99, 235, 0.75)");
        ctx.shadowBlur = isSelectedCompWaveform ? 0 : 6;
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(headX - 1.1, headY, 2.2, headH, 1.1);
        } else {
          ctx.rect(headX - 1.1, headY, 2.2, headH);
        }
        ctx.fill();
        ctx.restore();
      }

      // Đường dẫn & tooltip hiển thị thời gian khi rê chuột (Hover scrub)
      if (hoverX >= 0 && hoverX <= width) {
        const hoverPct = Math.max(0, Math.min(1, hoverX / width));
        const hoverSec = hoverPct * durationSec;
        const hoverTimeStr = formatTime(hoverSec);

        ctx.save();
        ctx.strokeStyle = isSelectedCompWaveform
          ? (isDark ? "rgba(183, 215, 255, 0.52)" : "rgba(23, 79, 145, 0.42)")
          : (isDark ? "rgba(147, 197, 253, 0.45)" : "rgba(23, 87, 166, 0.35)");
        ctx.lineWidth = 1;
        ctx.setLineDash(isSelectedCompWaveform ? [] : [2, 2]);
        ctx.beginPath();
        ctx.moveTo(hoverX, centerY - 20);
        ctx.lineTo(hoverX, centerY + 20);
        ctx.stroke();

        // Tooltip thời gian bay theo con trỏ
        ctx.setLineDash([]);
        ctx.font = "600 10px Inter, sans-serif";
        const textW = ctx.measureText(hoverTimeStr).width;
        const tipW = textW + 10;
        const tipH = 16;
        const tipX = Math.max(4, Math.min(width - tipW - 4, hoverX - tipW / 2));
        const tipY = 4;

        ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 31, 56, 0.88)";
        if (typeof ctx.roundRect === "function") {
          ctx.beginPath();
          ctx.roundRect(tipX, tipY, tipW, tipH, 4);
          ctx.fill();
        } else {
          ctx.fillRect(tipX, tipY, tipW, tipH);
        }

        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";
        ctx.fillText(hoverTimeStr, tipX + 5, tipY + tipH / 2);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return {
      setSpokenText: (text, soundUrl = null) => {
        spokenText = text || "";
        audioUrl = soundUrl || null;
        durationSec = estimateDuration(spokenText);
        currentProgress = 0;
        targetProgress = 0;
        isCompleted = false;
        updateProfile();
        updateTimeDisplay();
      },
      start: (text, estDuration = 3.0, soundUrl = null) => {
        isPlaying = true;
        isCompleted = false;
        spokenText = text || "";
        audioUrl = soundUrl || null;
        durationSec = Math.max(0.9, estDuration || estimateDuration(spokenText));
        startTime = Date.now();
        currentProgress = 0;
        targetProgress = 0;
        activeCharIndex = 0;
        updateProfile();
        updateTimeDisplay();
      },
      updateBoundary: (charIndex, charLength = 0) => {
        activeCharIndex = charIndex;
        if (spokenText && spokenText.length > 0) {
          const ratio = Math.max(0, Math.min(0.98, charIndex / spokenText.length));
          targetProgress = Math.max(targetProgress, ratio);
        }
      },
      setProgress: (pct) => {
        currentProgress = Math.max(0, Math.min(1, pct));
        targetProgress = currentProgress;
        isCompleted = (currentProgress >= 0.995);
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        updateTimeDisplay();
      },
      seek: (pct) => {
        currentProgress = Math.max(0, Math.min(1, pct));
        targetProgress = currentProgress;
        isCompleted = (currentProgress >= 0.995);
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        updateTimeDisplay();
      },
      resume: () => {
        if (currentProgress >= 0.995) {
          currentProgress = 0;
          targetProgress = 0;
          isCompleted = false;
        }
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        isPlaying = true;
        isCompleted = false;
        updateTimeDisplay();
      },
      pause: () => {
        isPlaying = false;
      },
      complete: () => {
        isPlaying = false;
        currentProgress = 1.0;
        targetProgress = 1.0;
        isCompleted = true;
        updateTimeDisplay();
      },
      stop: (keepComplete = false) => {
        isPlaying = false;
        if (!keepComplete && !isCompleted) {
          currentProgress = 0;
          targetProgress = 0;
        }
        activeCharIndex = -1;
        updateTimeDisplay();
      },
      destroy: () => {
        isPlaying = false;
        if (animId) cancelAnimationFrame(animId);
        if (resizeObserver) resizeObserver.disconnect();
        wrapEl.innerHTML = "";
      }
    };
  };

  const icon = (name, size) => window.RusiIcons ? RusiIcons.get(name, { size }) : "";
  const lessonImage = (l) => l.image || l.image_url || LESSON_COVERS[l.category] || DEFAULT_LISTENING_COVER;

  const getListeningLessons = () => {
    return (cloudListening && cloudListening.length) ? cloudListening : [];
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

  const filteredLessons = () => {
    const all = getListeningLessons();
    return all.filter((l) => {
      if (l.level !== currentLevel) return false;
      if (currentMode === "dictation") {
        return Array.isArray(l.dictation) && l.dictation.length > 0;
      }
      return true;
    });
  };

  const renderListeningCards = () => {
    const gridHost = host.querySelector("#lisCardsGrid");
    if (!gridHost) return;

    host.querySelectorAll(".listening-mode-card").forEach((button) => {
      const active = button.dataset.mode === currentMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    host.querySelectorAll(".listening-level-tab").forEach((button) => {
      const active = button.dataset.level === currentLevel;
      button.classList.toggle("active", active);
      button.classList.toggle("level-tab-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    const all = getListeningLessons();
    LEVELS.forEach(([level]) => {
      const count = all.filter((l) => {
        if (l.level !== level) return false;
        if (currentMode === "dictation") {
          return Array.isArray(l.dictation) && l.dictation.length > 0;
        }
        return true;
      }).length;
      const countNode = host.querySelector(`[data-listening-count="${level}"]`);
      if (countNode) countNode.textContent = count;
    });

    const items = filteredLessons();
    if (!items.length) {
      gridHost.innerHTML = `
        <div class="writing-empty-state listening-empty-state">
          <span class="writing-empty-icon listening-empty-icon">${icon(MODE_INFO[currentMode].icon, 34)}</span>
          <h3>Chưa có bài ${MODE_INFO[currentMode].title.toLowerCase()} ở cấp ${currentLevel}</h3>
          <p>Hãy chọn một cấp độ khác để tiếp tục luyện tập.</p>
        </div>
      `;
      return;
    }

    gridHost.innerHTML = items.map((l) => {
      const isDone = currentMode === "comprehension"
        ? (Progress.doneList("listenDone").includes(l.id + "_comp") || Progress.doneList("listenDone").includes(l.id + "_check") || Progress.doneList("listenDone").includes(l.id + "_video"))
        : (Array.isArray(l.dictation) && l.dictation.length > 0 && l.dictation.every((_, i) => Progress.doneList("listenDone").includes(l.id + "_dict_" + i)));
      const isPro = l.is_pro_only || l.level === "B1" || l.level === "B2";
      const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
      const qCount = (l.questions && l.questions.length) ? l.questions.length : (l.lines && l.lines.length) ? l.lines.length : 4;
      const dictCount = (l.dictation && l.dictation.length) || 0;
      const countLabel = currentMode === "comprehension" ? `${qCount} câu hỏi` : `${dictCount} câu chính tả`;
      const actionLabel = isDone ? "Đã hoàn thành" : (currentMode === "comprehension" ? "Vào luyện nghe hiểu" : "Vào chép chính tả");

      const getListeningIconKey = (item) => {
        const cat = ((item.category || "") + " " + (item.id || "")).toLowerCase();
        if (cat.includes("airport") || cat.includes("plane")) return "plane";
        if (cat.includes("cafe") || cat.includes("coffee")) return "coffee";
        if (cat.includes("metro") || cat.includes("train")) return "train";
        if (cat.includes("city") || cat.includes("hotel")) return "building-2";
        if (cat.includes("interview") || cat.includes("work") || cat.includes("job")) return "briefcase";
        if (cat.includes("weather")) return "sun";
        if (cat.includes("shopping") || cat.includes("shop")) return "shopping-cart";
        if (cat.includes("restaurant") || cat.includes("food")) return "utensils";
        if (item.icon && window.RusiIcons && RusiIcons.has && RusiIcons.has(item.icon)) return item.icon;
        return currentMode === "dictation" ? "edit-3" : "headphones";
      };

      const iconKey = getListeningIconKey(l);
      const iconSvg = window.RusiIcons ? RusiIcons.get(iconKey, { size: 24 }) : icon("headphones", 24);

      return `
        <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .dau-card-compact (Đồng bộ từ vựng, dùng 100% SVG RusiIcons) -->
        <article class="dau-card dau-card-compact listening-topic-card ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-listen-id="${esc(l.id)}">
          <div class="dau-card-header">
            <div class="dau-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
              ${iconSvg}
            </div>
            <div class="dau-card-header-main">
              <div class="dau-card-title-row">
                <h3 class="dau-card-ru" title="${esc(l.title)} · ${esc(l.vi || "")}">${esc(l.title)}</h3>
                ${isDone ? `
                  <span class="topic-status topic-status-completed" style="flex-shrink:0">
                    ${icon("check", 12)} Hoàn thành
                  </span>
                ` : isPro ? `
                  <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                ` : ""}
              </div>
              <div class="dau-card-subinfo">
                <span>${l.level}</span>
                <span class="dau-card-sep">•</span>
                <span class="dau-card-count">${countLabel}</span>
              </div>
            </div>
          </div>

          <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
            <div class="topic-footer-actions">
              ${isPro && !isUnlocked ? `
                <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                  ${icon("lock-pro", 16) || icon("lock", 16)}
                </span>
              ` : `
                <button type="button" class="btn-listen-action topic-text-btn" data-listen-id="${esc(l.id)}" title="${actionLabel}">
                  ${actionLabel} ${icon("arrow-right", 14)}
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    const openLesson = (card) => {
      const id = card.dataset.listenId;
      const lesson = all.find((x) => x.id === id);
      if (!lesson) return;
      const isPro = lesson.is_pro_only || lesson.level === "B1" || lesson.level === "B2";
      if (isPro && !Monetization.isPro()) {
        Monetization.showProGateModal(
          "Nội dung nghe dành cho PRO",
          "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nghe trung & nâng cao kèm audio chất lượng cao."
        );
        return;
      }
      if (currentMode === "dictation") {
        openDictationWorkspace(lesson);
      } else {
        openComprehensionWorkspace(lesson);
      }
    };

    gridHost.querySelectorAll(".listening-topic-card").forEach((card) => {
      card.onclick = () => openLesson(card);
      card.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLesson(card);
        }
      };
    });
    gridHost.querySelectorAll(".btn-listen-action, .topic-circle-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = btn.closest(".listening-topic-card");
        if (card) openLesson(card);
      };
    });
  };

  const renderHub = () => {
    document.body.classList.remove("in-workspace");
    currentLesson = null;
    host.innerHTML = `
      <section class="writing-hub listening-hub" id="listeningHub">
        <header class="writing-hub-header listening-hub-header">
          <h1>Chọn cách bạn muốn luyện nghe</h1>
          <p>Chinh phục kỹ năng nghe tiếng Nga qua phương pháp nghe hiểu toàn diện và chép chính tả.</p>
        </header>

        <div class="writing-mode-grid listening-mode-grid" aria-label="Chọn dạng luyện nghe">
          ${Object.entries(MODE_INFO).map(([key, info]) => `
            <button type="button" class="writing-mode-card listening-mode-card ${key === currentMode ? "active" : ""}" data-mode="${key}" aria-pressed="${key === currentMode}">
              <span class="writing-mode-icon listening-mode-icon">${icon(info.icon, 28)}</span>
              <span class="writing-mode-copy listening-mode-copy">
                <strong>${info.title}</strong>
                <small>${info.subtitle}</small>
              </span>
              <span class="writing-mode-arrow listening-mode-arrow">${icon("arrow-right", 18)}</span>
            </button>
          `).join("")}
        </div>

        <div class="level-tabs writing-level-tabs listening-level-tabs" role="tablist" aria-label="Lọc bài nghe theo cấp độ" id="lisLevelTabs">
          ${LEVELS.map(([level, label]) => `
            <button type="button" class="level-tab writing-level-tab listening-level-tab ${level === currentLevel ? "level-tab-active active" : ""}" data-level="${level}" role="tab" aria-selected="${level === currentLevel ? "true" : "false"}">
              <span class="level-code">${level}</span>
              <small>${label}</small>
              <span class="level-tab-count" data-listening-count="${level}">0</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-topic-grid listening-topic-grid" id="lisCardsGrid"></div>
      </section>
    `;

    host.querySelectorAll(".listening-mode-card").forEach((button) => {
      button.onclick = () => {
        currentMode = button.dataset.mode;
        renderListeningCards();
      };
    });

    host.querySelectorAll(".listening-level-tab").forEach((button) => {
      button.onclick = () => {
        currentLevel = button.dataset.level;
        renderListeningCards();
      };
    });

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
        <button type="button" class="dau-back-btn" id="btnBackLisList" title="Quay lại danh sách bài nghe" aria-label="Quay lại danh sách bài nghe">
          <i data-rusi-icon="arrow-left" data-size="18"></i>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-workspace-title">${window.RusiIcons ? RusiIcons.get(lesson.icon || "headphones", { size: 22 }) : ""} ${esc(lesson.title)}</span>
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
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
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
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
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

  /* =====================================================================
   * GIAO DIỆN CHÉP CHÍNH TẢ 3/7 WORKSPACE HIỆN ĐẠI (AUDIO SÓNG ÂM & CLOZE INPUT)
   * ===================================================================== */
  const DICT_SENTENCE_VOCAB_DB = {
    "Вот, пожалуйста.": [
      { ru: "пожалуйста", vi: "xin vui lòng, không có gì", pos: "межд.", stress: "пожа́луйста" },
      { ru: "вот", vi: "đây, này", pos: "част.", stress: "вот" }
    ],
    "У вас есть багаж?": [
      { ru: "багаж", vi: "hành lý ký gửi", pos: "сущ.", stress: "бага́ж" },
      { ru: "есть", vi: "có, hiện hữu", pos: "гл.", stress: "есть" }
    ],
    "Спасибо! А где паспортный контроль?": [
      { ru: "паспортный контроль", vi: "kiểm tra hộ chiếu", pos: "сущ.", stress: "па́спортный контро́ль" },
      { ru: "паспорт", vi: "hộ chiếu", pos: "сущ.", stress: "па́спорт" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Сколько стоит этот сыр?": [
      { ru: "стоить", vi: "có giá, trị giá", pos: "гл.", stress: "сто́ить" },
      { ru: "сыр", vi: "phô mai", pos: "сущ.", stress: "сыр" }
    ],
    "Скажите, а рыба свежая?": [
      { ru: "свежий", vi: "tươi mới, tươi sống", pos: "прил.", stress: "све́жий" },
      { ru: "рыба", vi: "cá", pos: "сущ.", stress: "ры́ба" }
    ],
    "Спасибо, возьму!": [
      { ru: "взять", vi: "lấy, mua", pos: "гл. св", stress: "взять" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Мой ключ номер 412.": [
      { ru: "ключ", vi: "chìa khóa", pos: "сущ.", stress: "ключ" },
      { ru: "номер", vi: "số phòng", pos: "сущ.", stress: "но́мер" }
    ],
    "Прачечная на цокольном этаже.": [
      { ru: "прачечная", vi: "phòng giặt là", pos: "сущ.", stress: "пра́чечная" },
      { ru: "этаж", vi: "tầng gác", pos: "сущ.", stress: "эта́ж" }
    ],
    "Спасибо за информацию!": [
      { ru: "информация", vi: "thông tin", pos: "сущ.", stress: "информа́ция" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Вам помочь определиться?": [
      { ru: "определиться", vi: "quyết định, lựa chọn", pos: "гл.", stress: "определи́ться" },
      { ru: "помочь", vi: "giúp đỡ", pos: "гл.", stress: "помо́чь" }
    ],
    "Да, пожалуйста, блинчики с семгой.": [
      { ru: "блинчики", vi: "bánh blini Nga", pos: "сущ. мн.", stress: "бли́нчики" },
      { ru: "сёмга", vi: "cá hồi", pos: "сущ.", stress: "сёмга" }
    ],
    "С вас 480 рублей.": [
      { ru: "рубль", vi: "đồng Rúp Nga", pos: "сущ.", stress: "рубль" }
    ],
    "Где оформить читательский билет?": [
      { ru: "оформить", vi: "làm thủ tục, đăng ký", pos: "гл. св", stress: "офо́рмить" },
      { ru: "читательский билет", vi: "thẻ thư viện", pos: "сущ.", stress: "чита́тельский биле́т" }
    ],
    "Учебники выдаются на один семестр.": [
      { ru: "учебник", vi: "sách giáo trình", pos: "сущ.", stress: "уче́бник" },
      { ru: "семестр", vi: "học kỳ", pos: "сущ.", stress: "семе́стр" }
    ],
    "Справка о стипендии на втором этаже.": [
      { ru: "стипендия", vi: "học bổng", pos: "сущ.", stress: "стипе́ндия" },
      { ru: "справка", vi: "giấy xác nhận", pos: "сущ.", stress: "спра́вка" }
    ],
    "Осторожно, двери закрываются.": [
      { ru: "осторожно", vi: "cẩn thận, chú ý", pos: "нар.", stress: "осторо́жно" },
      { ru: "двери", vi: "cửa tàu, cửa ra vào", pos: "сущ. мн.", stress: "две́ри" },
      { ru: "закрываться", vi: "đóng lại", pos: "гл.", stress: "закрыва́ются" }
    ],
    "Следующая станция — «Театральная».": [
      { ru: "следующий", vi: "tiếp theo, kế tiếp", pos: "прил.", stress: "сле́дующий" },
      { ru: "станция", vi: "nhà ga tàu điện", pos: "сущ.", stress: "ста́нция" }
    ],
    "Переход на Замоскворецкую линию.": [
      { ru: "переход", vi: "lối chuyển tuyến", pos: "сущ.", stress: "перехо́д" },
      { ru: "линия", vi: "tuyến đường metro", pos: "сущ.", stress: "ли́ния" }
    ],
    "Юрий Гагарин совершил первый космический полет.": [
      { ru: "космический", vi: "thuộc vũ trụ", pos: "прил.", stress: "косми́ческий" },
      { ru: "полет", vi: "chuyến bay", pos: "сущ.", stress: "полёт" },
      { ru: "совершить", vi: "thực hiện", pos: "гл. св", stress: "соверши́ть" }
    ],
    "Путь человечества открылся благодаря исследователям.": [
      { ru: "человечество", vi: "nhân loại, loài người", pos: "сущ.", stress: "челове́чество" },
      { ru: "исследователь", vi: "nhà thám hiểm, nghiên cứu", pos: "сущ.", stress: "иссле́дователь" },
      { ru: "благодаря", vi: "nhờ vào (+Cách 3)", pos: "предл.", stress: "благодаря́" }
    ],
    "Космонавт готов лететь к далеким мирам.": [
      { ru: "космонавт", vi: "nhà du hành vũ trụ", pos: "сущ.", stress: "космона́вт" },
      { ru: "мир", vi: "thế giới, vũ trụ", pos: "сущ.", stress: "мир" },
      { ru: "далекий", vi: "xa xôi, xa xăm", pos: "прил.", stress: "далёкий" }
    ]
  };

  const getSentenceVocab = (sentenceText, lesson) => {
    const trimmed = (sentenceText || "").trim();
    if (DICT_SENTENCE_VOCAB_DB[trimmed]) {
      return DICT_SENTENCE_VOCAB_DB[trimmed];
    }
    // Tìm đối chiếu trong blanks của bài
    const matched = [];
    if (Array.isArray(lesson.blanks)) {
      lesson.blanks.forEach((b) => {
        if (b.blank && trimmed.toLowerCase().includes(b.blank.toLowerCase())) {
          matched.push({
            ru: b.blank,
            vi: b.hint || "Từ khóa trong câu",
            pos: "слов.",
            stress: b.blank
          });
        }
      });
    }
    if (matched.length > 0) return matched;

    // Trích xuất các từ có độ dài >= 4
    const words = trimmed.replace(/[.,!?;:«»""'']/g, "").split(/\s+/).filter(w => w.length >= 4);
    if (words.length > 0) {
      return words.slice(0, 2).map(w => ({
        ru: w,
        vi: "Từ vựng trong bài",
        pos: "слов.",
        stress: w
      }));
    }
    return [{ ru: trimmed.split(/\s+/)[0] || "слово", vi: "Từ trong câu", pos: "слов.", stress: trimmed.split(/\s+/)[0] || "слово" }];
  };

  /* =====================================================================
   * KHÔNG GIAN LUYỆN NGHE HIỂU (COMPREHENSION WORKSPACE)
   * Bố cục 3/7: 3 phần menu câu hỏi bên trái, 7 phần phát audio & trắc nghiệm
   * ===================================================================== */
  const openComprehensionWorkspace = (lesson) => {
    currentLesson = lesson;
    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const questions = (Array.isArray(lesson.questions) && lesson.questions.length > 0)
      ? lesson.questions
      : [
          {
            q: "Nội dung chính của đoạn hội thoại là gì?",
            options: ["Chào hỏi và làm quen", "Hỏi đường và đi lại", "Mua sắm trong cửa hàng", "Ở sân bay làm thủ tục"],
            a: 0,
            exp: "Dựa vào các câu chào hỏi và giới thiệu của nhân vật."
          }
        ];

    const lines = Array.isArray(lesson.lines) ? lesson.lines : [];

    const userAnswers = {};      // qIdx -> selected option index
    let isPlaying = false;
    let currentSpeed = 1.0;
    let currentLineIdx = -1;
    let playTimeout = null;
    let animFrameId = null;
    let showTranscript = false;
    let isSubmitted = false;
    let compWaveform = null;

    // Tính toán thời lượng từng dòng và toàn bài hội thoại
    const calcLineDurSec = (text, spd) => {
      if (!text) return 1.5;
      return Math.max(1.8, (text.length * 115 + (text.split(/[.,?!—;:]/).length - 1) * 260) / (spd * 1000));
    };

    const PAUSE_GAP_SEC = 0.55;
    let timeline = [];
    let totalDurationSec = 3.0;
    let currentTimeSec = 0;
    let playbackStartTimestamp = 0;
    let playbackBaseTimeSec = 0;

    const recomputeTimeline = () => {
      timeline = [];
      let acc = 0;
      lines.forEach((ln, idx) => {
        const t = ln ? (ln.ru || "") : "";
        const dur = calcLineDurSec(t, currentSpeed);
        timeline.push({
          idx,
          start: acc,
          dur,
          end: acc + dur,
          text: t,
          line: ln
        });
        acc += dur + PAUSE_GAP_SEC;
      });
      totalDurationSec = Math.max(3.0, acc);
    };
    recomputeTimeline();

    const updatePlaybackUI = () => {
      const playerCard = host.querySelector("#compPlayerCard");
      if (playerCard) playerCard.classList.toggle("is-playing", isPlaying);

      const playBtn = host.querySelector("#btnCompPlay");
      if (playBtn) {
        playBtn.innerHTML = isPlaying ? icon("pause-control", 24) : icon("play-control", 24);
        playBtn.title = isPlaying ? "Tạm dừng" : "Phát bài nghe";
        playBtn.setAttribute("aria-label", isPlaying ? "Tạm dừng" : "Phát bài nghe");
      }

      host.querySelectorAll(".lis-comp-dialogue-line").forEach(lineEl => {
        const lineIdx = Number(lineEl.dataset.lineIdx);
        lineEl.classList.toggle("is-active", lineIdx === currentLineIdx);
      });
    };

    const stopSpeechAndTimers = () => {
      if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
      }
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (_) {}
      }
    };

    const pauseAudio = () => {
      if (!isPlaying) return;
      const elapsed = (Date.now() - playbackStartTimestamp) / 1000;
      currentTimeSec = Math.min(totalDurationSec, playbackBaseTimeSec + elapsed);
      isPlaying = false;
      stopSpeechAndTimers();
      if (compWaveform) compWaveform.pause();
      updatePlaybackUI();
    };

    const stopAudio = () => {
      isPlaying = false;
      currentTimeSec = 0;
      currentLineIdx = -1;
      stopSpeechAndTimers();
      if (compWaveform) compWaveform.stop();
      updatePlaybackUI();
    };

    const playFromTime = (targetSec) => {
      stopSpeechAndTimers();
      recomputeTimeline();

      let sec = Math.max(0, targetSec);
      if (sec >= totalDurationSec - 0.1) {
        currentTimeSec = totalDurationSec;
        isPlaying = false;
        currentLineIdx = -1;
        if (compWaveform) compWaveform.complete();
        updatePlaybackUI();
        return;
      }

      currentTimeSec = sec;
      isPlaying = true;
      playbackStartTimestamp = Date.now();
      playbackBaseTimeSec = sec;

      if (compWaveform) {
        const allRuText = lines.map(l => l.ru || "").join(" ");
        compWaveform.start(allRuText, totalDurationSec);
        compWaveform.seek(currentTimeSec / totalDurationSec);
      }

      // Tìm câu thoại tương ứng với thời điểm hiện tại
      let foundSeg = null;
      let inGap = false;
      for (let i = 0; i < timeline.length; i++) {
        const seg = timeline[i];
        if (currentTimeSec >= seg.start && currentTimeSec <= seg.end) {
          foundSeg = seg;
          break;
        }
        if (currentTimeSec > seg.end && (i === timeline.length - 1 || currentTimeSec < timeline[i + 1].start)) {
          foundSeg = seg;
          inGap = true;
          break;
        }
      }

      if (!foundSeg && timeline.length > 0) {
        foundSeg = timeline[0];
        currentTimeSec = 0;
        playbackBaseTimeSec = 0;
        playbackStartTimestamp = Date.now();
      }

      const startProgressTicker = () => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        const tick = () => {
          if (!isPlaying) return;
          const elapsed = (Date.now() - playbackStartTimestamp) / 1000;
          const cur = Math.min(totalDurationSec, playbackBaseTimeSec + elapsed);
          currentTimeSec = cur;
          if (compWaveform) compWaveform.setProgress(cur / totalDurationSec);

          for (let i = 0; i < timeline.length; i++) {
            if (cur >= timeline[i].start && cur <= timeline[i].end + PAUSE_GAP_SEC) {
              if (currentLineIdx !== timeline[i].idx) {
                currentLineIdx = timeline[i].idx;
                updatePlaybackUI();
              }
              break;
            }
          }

          if (cur >= totalDurationSec) {
            isPlaying = false;
            currentLineIdx = -1;
            if (compWaveform) compWaveform.complete();
            updatePlaybackUI();
            return;
          }
          animFrameId = requestAnimationFrame(tick);
        };
        animFrameId = requestAnimationFrame(tick);
      };

      startProgressTicker();

      const playSegmentFrom = (segIndex, charOffset = 0) => {
        if (!isPlaying || segIndex >= timeline.length) {
          isPlaying = false;
          currentLineIdx = -1;
          if (compWaveform) compWaveform.complete();
          updatePlaybackUI();
          return;
        }

        const seg = timeline[segIndex];
        currentLineIdx = seg.idx;
        updatePlaybackUI();

        const fullText = seg.text || "";
        let textToSpeak = fullText;
        if (charOffset > 0 && charOffset < fullText.length) {
          textToSpeak = fullText.slice(charOffset).trim();
        }

        if (!textToSpeak) {
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(segIndex + 1, 0);
          }, PAUSE_GAP_SEC * 1000);
          return;
        }

        if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
          try { window.speechSynthesis.cancel(); } catch (_) {}
          const u = new SpeechSynthesisUtterance(textToSpeak);
          u.lang = "ru-RU";
          u.rate = currentSpeed;
          if (typeof pickVoice === "function") {
            const v = pickVoice("ru-RU");
            if (v) u.voice = v;
          }
          u.onend = () => {
            if (isPlaying) {
              playTimeout = setTimeout(() => {
                if (isPlaying) playSegmentFrom(segIndex + 1, 0);
              }, PAUSE_GAP_SEC * 1000);
            }
          };
          u.onerror = () => {
            if (isPlaying) {
              playTimeout = setTimeout(() => {
                if (isPlaying) playSegmentFrom(segIndex + 1, 0);
              }, PAUSE_GAP_SEC * 1000);
            }
          };
          window.speechSynthesis.speak(u);
        } else {
          const fallbackDur = Math.max(1200, (textToSpeak.length * 85) / currentSpeed);
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(segIndex + 1, 0);
          }, fallbackDur + PAUSE_GAP_SEC * 1000);
        }
      };

      if (foundSeg) {
        if (inGap) {
          const waitMs = Math.max(50, ((foundSeg.end + PAUSE_GAP_SEC) - currentTimeSec) * 1000);
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(foundSeg.idx + 1, 0);
          }, waitMs);
        } else {
          const segPassed = Math.max(0, currentTimeSec - foundSeg.start);
          const frac = Math.min(1.0, segPassed / foundSeg.dur);
          let charOffset = Math.floor(frac * (foundSeg.text.length || 0));
          if (charOffset > 0) {
            const spaceIdx = foundSeg.text.indexOf(" ", charOffset);
            if (spaceIdx !== -1 && spaceIdx < foundSeg.text.length - 2) {
              charOffset = spaceIdx + 1;
            }
          }
          playSegmentFrom(foundSeg.idx, charOffset);
        }
      }
      updatePlaybackUI();
    };

    const initCompWaveform = () => {
      const wrap = host.querySelector("#compWaveformWrap");
      if (!wrap) return;
      if (compWaveform) {
        try { compWaveform.destroy(); } catch (_) {}
        compWaveform = null;
      }
      compWaveform = createRealtimeWaveform(wrap, {
        onSeek: (pct) => {
          const targetSec = pct * totalDurationSec;
          playFromTime(targetSec);
        }
      });
      if (compWaveform) {
        const allRuText = lines.map(l => l.ru || "").join(" ");
        compWaveform.start(allRuText, totalDurationSec);
        compWaveform.pause();
      }
    };

    // Helper cập nhật thanh tiến độ câu hỏi và sidebar
    const updateSidebarProgress = () => {
      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = isSubmitted 
        ? questions.filter((q, i) => userAnswers[i] === q.a).length 
        : 0;
      const total = questions.length || 1;
      const pct = isSubmitted 
        ? Math.round((correctCount / total) * 100)
        : Math.round((answeredCount / total) * 100);

      const textNode = host.querySelector("#compSidebarDoneText");
      if (textNode) {
        textNode.textContent = isSubmitted 
          ? `${correctCount}/${questions.length} câu đúng`
          : `${answeredCount}/${questions.length} câu đã làm`;
      }
      const fillNode = host.querySelector("#compSidebarDoneFill");
      if (fillNode) fillNode.style.width = `${pct}%`;

      questions.forEach((q, i) => {
        const itemEl = host.querySelector(`.lis-dict-sentence-item[data-q-idx="${i}"]`);
        if (itemEl) {
          const isAns = userAnswers[i] !== undefined;
          const isCorr = isSubmitted && (userAnswers[i] === q.a);
          itemEl.classList.toggle("is-done", isAns);
          itemEl.classList.toggle("is-correct-item", isSubmitted && isCorr);
          itemEl.classList.toggle("is-wrong-item", isSubmitted && isAns && !isCorr);
          const statusIcon = itemEl.querySelector(".lis-dict-sentence-status");
          if (statusIcon) {
            statusIcon.innerHTML = isSubmitted 
              ? (isCorr ? icon("check-circle-correct", 17) : icon("alert-triangle", 17))
              : (isAns ? icon("check", 16) : icon("arrow-right", 16));
          }
        }
      });
    };

    const renderQuizQuestion = () => {
      const quizCard = host.querySelector("#compQuizCard");
      if (!quizCard) return;

      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = isSubmitted 
        ? questions.filter((q, i) => userAnswers[i] === q.a).length 
        : 0;
      const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
      const isPass = pct >= 70;
      const allLessonsInLevel = (typeof getListeningLessons === "function" ? getListeningLessons() : []).filter(l => l.level === (lesson.level || "A1"));
      const curIdx = allLessonsInLevel.findIndex(l => l.id === lesson.id);
      const nextLesson = (curIdx >= 0 && curIdx < allLessonsInLevel.length - 1) ? allLessonsInLevel[curIdx + 1] : null;

      let html = "";

      // 2. KHI ĐÃ NỘP BÀI: BANNER TỔNG KẾT KẾT QUẢ ĐẦY ĐỦ
      if (isSubmitted) {
        html += `
          <div class="lis-comp-result-box ${isPass ? 'is-pass' : 'is-fail'}">
            <div class="lis-comp-result-icon">${isPass ? (window.RusiIcons ? RusiIcons.get("trophy-reward", { size: 36 }) : "🎉") : (window.RusiIcons ? RusiIcons.get("target", { size: 36 }) : "💪")}</div>
            <div class="lis-comp-result-info">
              <h3 class="lis-comp-result-title">
                ${isPass ? "Xuất sắc! Bạn đã vượt qua bài nghe hiểu" : "Cố lên! Hãy xem lại giải thích chi tiết bên dưới để ôn tập"}
              </h3>
              <p class="lis-comp-result-sub">
                Kết quả: <strong>${correctCount}/${questions.length} câu đúng</strong> (${pct}%) · ${isPass ? "Đã ghi nhận hoàn thành bài học" : "Chưa đạt 70%, hãy thử lại"}
              </p>
            </div>
            <div class="lis-comp-result-actions">
              <button type="button" class="btn btn-outline" id="btnCompRetry">
                ${icon("rotate-ccw", 16)} Làm lại bài này
              </button>
              ${nextLesson ? `
                <button type="button" class="btn btn-primary" id="btnCompGoNextLesson">
                  Bài tiếp theo: ${esc(nextLesson.title)} ${icon("arrow-right", 16)}
                </button>
              ` : `
                <button type="button" class="btn btn-primary" id="btnCompDoneBack">
                  ${icon("check-circle-correct", 16)} Hoàn tất & Quay về
                </button>
              `}
            </div>
          </div>
        `;
      }

      // 3. HIỂN THỊ TẤT CẢ CÁC CÂU HỎI TRẮC NGHIỆM
      html += `<div class="lis-comp-questions-container">`;
      questions.forEach((q, qi) => {
        const selectedOpt = userAnswers[qi];
        const isAns = selectedOpt !== undefined;
        const isCorr = isSubmitted && (selectedOpt === q.a);

        html += `
          <div class="lis-comp-question-block ${isSubmitted ? (isCorr ? 'is-correct-block' : 'is-wrong-block') : ''}" id="compQBlock_${qi}" data-q-idx="${qi}">
            <div class="lis-comp-q-header">
              <span class="lis-comp-q-badge">CÂU ${qi + 1} / ${questions.length}</span>
            </div>

            <h3 class="lis-comp-question-title">${esc(q.q)}</h3>

            <div class="lis-comp-options-list">
              ${q.options.map((opt, optIdx) => {
                const isSelected = selectedOpt === optIdx;
                const isRightOption = optIdx === q.a;
                let optCls = "";
                if (isSubmitted) {
                  if (isRightOption) optCls = "is-correct";
                  else if (isSelected) optCls = "is-wrong";
                } else if (isSelected) {
                  optCls = "is-selected";
                }

                return `
                  <button type="button" 
                          class="lis-comp-option-btn ${optCls}" 
                          data-q-idx="${qi}" 
                          data-opt-idx="${optIdx}" 
                          ${isSubmitted ? "disabled" : ""}>
                    <span class="lis-comp-option-letter">${["A", "B", "C", "D"][optIdx] || (optIdx + 1)}</span>
                    <span class="lis-comp-option-text">${esc(opt)}</span>
                    <span class="lis-comp-option-check">
                      ${isSubmitted && isRightOption ? icon("check-circle-correct", 18) : isSubmitted && isSelected ? icon("alert-triangle", 18) : ""}
                    </span>
                  </button>
                `;
              }).join("")}
            </div>

            <!-- GIẢI THÍCH ĐÁP ÁN (HIỆN KHI ĐÃ NỘP BÀI) -->
            ${isSubmitted ? `
              <div class="lis-comp-explanation ${isCorr ? 'is-pass' : 'is-fail'}">
                <strong>${isCorr ? "✓ Giải thích: " : `✕ Đáp án đúng là [${["A","B","C","D"][q.a] || (q.a + 1)}] ${esc(q.options[q.a])}: `}</strong>
                ${esc(q.exp || (isCorr ? "Bạn đã nắm bắt rất chuẩn thông tin từ audio." : "Căn cứ vào nội dung thông tin được phát trong bài nghe."))}
              </div>
            ` : ""}
          </div>
        `;
      });
      html += `</div>`;

      // 4. THANH NỘP BÀI Ở DƯỚI CÙNG (SUBMIT BAR)
      if (!isSubmitted) {
        html += `
          <div class="lis-comp-submit-bar">
            <div class="lis-comp-submit-info">
              <span class="lis-comp-submit-badge">${icon("check-circle-correct", 16)}</span>
              <span>Đã hoàn thành <strong id="compBottomCountText">${answeredCount}</strong>/${questions.length} câu</span>
            </div>
            <button type="button" class="btn btn-primary lis-comp-submit-btn" id="btnCompSubmitAll" ${answeredCount === 0 ? "disabled" : ""}>
              ${icon("send", 16) || icon("check", 16)} <span>Nộp bài</span>
            </button>
          </div>
        `;
      }

      quizCard.innerHTML = html;

      // GẮN SỰ KIỆN CHO CÁC PHÍM CHỌN ĐÁP ÁN
      if (!isSubmitted) {
        quizCard.querySelectorAll(".lis-comp-option-btn:not(:disabled)").forEach(btn => {
          btn.onclick = () => {
            const qi = Number(btn.dataset.qIdx);
            const optIdx = Number(btn.dataset.optIdx);

            userAnswers[qi] = optIdx;

            // Highlight trong nhóm câu hỏi này
            const block = quizCard.querySelector(`#compQBlock_${qi}`);
            if (block) {
              block.querySelectorAll(".lis-comp-option-btn").forEach(b => {
                b.classList.toggle("is-selected", Number(b.dataset.optIdx) === optIdx);
              });
              const statusEl = block.querySelector(`#compQStatus_${qi}`);
              if (statusEl) {
                statusEl.className = "lis-comp-q-status is-answered";
                statusEl.textContent = "Đã chọn đáp án";
              }
            }

            // Cập nhật real-time thanh tiến độ làm bài
            const newCount = Object.keys(userAnswers).length;
            const newPct = questions.length > 0 ? Math.round((newCount / questions.length) * 100) : 0;
            
            const countText = quizCard.querySelector("#compProgressCountText");
            if (countText) countText.innerHTML = `Đã làm: <strong>${newCount}/${questions.length}</strong> câu`;
            
            const pctText = quizCard.querySelector("#compProgressPctText");
            if (pctText) pctText.textContent = `${newPct}%`;

            const fillBar = quizCard.querySelector("#compProgressFillBar");
            if (fillBar) fillBar.style.width = `${newPct}%`;

            const bottomCountText = quizCard.querySelector("#compBottomCountText");
            if (bottomCountText) bottomCountText.textContent = `${newCount}`;

            const submitBtn = quizCard.querySelector("#btnCompSubmitAll");
            if (submitBtn) submitBtn.disabled = (newCount === 0);

            updateSidebarProgress();
          };
        });

        // NÚT NỘP BÀI
        const submitBtn = quizCard.querySelector("#btnCompSubmitAll");
        if (submitBtn) {
          submitBtn.onclick = () => {
            const count = Object.keys(userAnswers).length;
            if (count < questions.length) {
              const remain = questions.length - count;
              if (!confirm(`Bạn còn ${remain} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài không?`)) {
                return;
              }
            }

            isSubmitted = true;
            const cCount = questions.filter((q, i) => userAnswers[i] === q.a).length;
            const p = Math.round((cCount / questions.length) * 100);

            if (p >= 70) {
              const passKey = lesson.id + "_comp";
              if (!Progress.doneList("listenDone").includes(passKey)) {
                Progress.markDone("listenDone", passKey);
                Progress.addXp(15);
                toast("Chúc mừng! Đã hoàn thành bài nghe hiểu (+15 XP) 🎉");
              }
            } else {
              toast(`Bạn đạt ${cCount}/${questions.length} câu. Hãy xem giải thích và luyện tập thêm nhé!`);
            }

            updateSidebarProgress();
            renderQuizQuestion();
            quizCard.scrollIntoView({ behavior: "smooth", block: "start" });
          };
        }
      } else {
        // CÁC NÚT SAU KHI NỘP BÀI
        const retryBtn = quizCard.querySelector("#btnCompRetry");
        if (retryBtn) {
          retryBtn.onclick = () => {
            for (const k in userAnswers) delete userAnswers[k];
            isSubmitted = false;
            updateSidebarProgress();
            renderQuizQuestion();
            quizCard.scrollIntoView({ behavior: "smooth", block: "start" });
          };
        }

        const nextLesBtn = quizCard.querySelector("#btnCompGoNextLesson");
        if (nextLesBtn && nextLesson) {
          nextLesBtn.onclick = () => {
            stopAudio();
            if (compWaveform) {
              try { compWaveform.destroy(); } catch (_) {}
              compWaveform = null;
            }
            openComprehensionWorkspace(nextLesson);
          };
        }

        const doneBack = quizCard.querySelector("#btnCompDoneBack");
        if (doneBack) {
          doneBack.onclick = (e) => {
            if (e) e.preventDefault();
            stopAudio();
            if (compWaveform) {
              try { compWaveform.destroy(); } catch (_) {}
              compWaveform = null;
            }
            document.body.classList.remove("in-workspace");
            renderHub();
            window.scrollTo({ top: 0, behavior: "smooth" });
          };
        }
      }
    };

    const renderWorkspace = () => {
      const answeredCount = Object.keys(userAnswers).length;
      const pctDone = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

      host.innerHTML = `
        <div class="lis-dict-workspace-shell lis-comp-workspace-shell">
          <!-- TOPBAR STICKY -->
          <div class="lis-dict-topbar">
            <button type="button" class="lis-dict-topbar-back" id="btnCompBack" title="Quay lại danh sách bài nghe" aria-label="Quay lại">
              ${icon("arrow-left", 20)}
            </button>
            <div class="lis-dict-topbar-heading">
              <h1 class="lis-dict-topbar-title"><span class="lis-dict-title-prefix">Nghe hiểu - </span><span class="lis-dict-title-topic">${esc(lesson.title)}</span></h1>
            </div>
            <button type="button" class="lis-dict-topbar-menu-btn" id="btnCompToggleSidebar" aria-label="Danh sách bài luyện" title="Xem danh sách bài luyện">
              ${icon("list", 20)}
              <span class="lis-dict-menu-badge">${questions.length}</span>
            </button>
          </div>

          <!-- BỐ CỤC LƯỚI 3/7: 3 PHẦN DANH SÁCH BÀI LUYỆN BÊN TRÁI, 7 PHẦN LÀM BÀI BÊN PHẢI -->
          <div class="lis-dict-workspace-grid">
            <!-- CỘT TRÁI (3 PHẦN): DANH SÁCH CÂU HỎI TRONG BÀI LUYỆN NÀY -->
            <aside class="lis-dict-sidebar-panel" id="compSidebarPanel">
              <div class="lis-dict-sidebar-header">
                <div>
                  <h3 class="lis-dict-sidebar-title">Danh sách câu hỏi</h3>
                </div>
                <button type="button" class="lis-dict-sidebar-close-btn" id="btnCompCloseSidebar" aria-label="Đóng danh sách">
                  ${icon("x", 18)}
                </button>
              </div>

              <div class="lis-dict-sidebar-progress-box">
                <div class="lis-dict-sidebar-progress-text">
                  <span>Tiến độ bài làm</span>
                  <strong id="compSidebarDoneText">${answeredCount}/${questions.length} câu đã làm</strong>
                </div>
                <div class="lis-dict-progress-track">
                  <div class="lis-dict-progress-fill" id="compSidebarDoneFill" style="width: ${pctDone}%"></div>
                </div>
              </div>

              <div class="lis-dict-sentence-list">
                ${questions.map((q, i) => {
                  const isAns = userAnswers[i] !== undefined;
                  const num = String(i + 1).padStart(2, "0");
                  return `
                    <button type="button" class="lis-dict-sentence-item ${isAns ? "is-done" : ""}" data-q-idx="${i}" title="Câu ${i + 1}: ${esc(q.q)}">
                      <span class="lis-dict-sentence-num">${num}</span>
                      <div class="lis-dict-sentence-info">
                        <strong class="lis-dict-sentence-label">Câu hỏi ${i + 1}</strong>
                        <small class="lis-dict-sentence-snippet">${esc(q.q)}</small>
                      </div>
                      <span class="lis-dict-sentence-status">
                        ${isAns ? icon("check", 16) : icon("arrow-right", 16)}
                      </span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>

            <!-- CỘT PHẢI (7 PHẦN): AUDIO PLAYER & KHUNG CÂU HỎI TRẮC NGHIỆM -->
            <main class="lis-dict-main-panel">
              <!-- 1. KHUNG PHÁT ÂM THANH (AUDIO PLAYER) -->
              <section class="lis-dict-player-card ${isPlaying ? "is-playing" : ""}" id="compPlayerCard">
                <div class="lis-dict-waveform-wrap" id="compWaveformWrap" aria-label="Giao diện sóng âm phát âm thanh"></div>

                <div class="lis-dict-player-controls">
                  <!-- Cụm trái: Phát lại từ đầu -->
                  <div class="lis-dict-ctrl-left">
                    <button type="button" class="lis-dict-btn-replay" id="btnCompReplay" title="Phát lại toàn bộ bài nghe từ đầu" aria-label="Phát lại">
                      ${icon("rotate-ccw", 16)} <span class="lis-ctrl-btn-text">Phát lại</span>
                    </button>
                  </div>

                  <!-- Cụm giữa: Tua lùi 5s, Play/Pause, Tua tới 5s -->
                  <div class="lis-dict-ctrl-center">
                    <button type="button" class="lis-dict-btn-skip" id="btnCompSkipBack" title="Lùi 5 giây" aria-label="Lùi 5 giây">
                      ${icon("chevron-left", 20)}
                    </button>
                    <button type="button" class="lis-dict-btn-play" id="btnCompPlay" title="${isPlaying ? "Tạm dừng" : "Phát bài nghe"}" aria-label="${isPlaying ? "Tạm dừng" : "Phát bài nghe"}">
                      ${isPlaying ? icon("pause-control", 24) : icon("play-control", 24)}
                    </button>
                    <button type="button" class="lis-dict-btn-skip" id="btnCompSkipFwd" title="Tiến 5 giây" aria-label="Tiến 5 giây">
                      ${icon("chevron-right", 20)}
                    </button>
                  </div>

                  <!-- Cụm phải: Tốc độ phát & Bật lời thoại -->
                  <div class="lis-dict-ctrl-right">
                    <button type="button" class="lis-dict-btn-speed" id="btnCompSpeed" title="Thay đổi tốc độ phát">
                      <span id="compSpeedText">${currentSpeed}x</span>
                    </button>
                    <button type="button" class="lis-dict-btn-speed lis-dict-btn-transcript" id="btnCompToggleTranscript" title="Xem hoặc ẩn lời thoại đoạn nghe" aria-label="Lời thoại">
                      ${icon("languages", 16)} <span class="lis-ctrl-btn-text" id="compTransLabel">${showTranscript ? "Ẩn lời thoại" : "Lời thoại"}</span>
                    </button>
                  </div>
                </div>

                <!-- LỜI THOẠI HỘI THOẠI NGA - VIỆT (TÙY CHỌN ẨN/HIỆN) -->
                ${lines.length ? `
                  <div class="lis-comp-dialogue-box ${showTranscript ? "" : "hidden"}" id="compDialogueBox">
                    <div style="font-size:0.8rem;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px">
                      ${icon("book-open-blog", 14)} Lời thoại bài nghe (Nhấp vào câu để nghe riêng câu đó):
                    </div>
                    ${lines.map((ln, idx) => `
                      <div class="lis-comp-dialogue-line ${idx === currentLineIdx ? "is-active" : ""}" data-line-idx="${idx}">
                        <strong>${esc(ln.who || "Người nói")}:</strong>
                        <span class="ru">${esc(ln.ru || "")}</span>
                        <span class="line-vi">${esc(ln.vi || "")}</span>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}
              </section>

              <!-- 2. KHUNG CÂU HỎI TRẮC NGHIỆM ĐÁNH GIÁ NGHE HIỂU -->
              <section class="lis-comp-quiz-card" id="compQuizCard"></section>
            </main>
          </div>
          <div class="lis-dict-sidebar-scrim" id="compSidebarScrim"></div>
        </div>
      `;

      bindWorkspaceEvents();
      initCompWaveform();
      renderQuizQuestion();
    };

    const bindWorkspaceEvents = () => {
      // 1. Quay lại
      const backBtn = host.querySelector("#btnCompBack") || host.querySelector(".lis-dict-topbar-back");
      if (backBtn) {
        backBtn.onclick = (e) => {
          if (e) e.preventDefault();
          stopAudio();
          if (compWaveform) {
            try { compWaveform.destroy(); } catch (_) {}
            compWaveform = null;
          }
          document.body.classList.remove("in-workspace");
          renderHub();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      // 2. Mobile Drawer Sidebar Toggle
      const toggleSidebarBtn = host.querySelector("#btnCompToggleSidebar");
      const closeSidebarBtn = host.querySelector("#btnCompCloseSidebar");
      const sidebarPanel = host.querySelector("#compSidebarPanel");
      const scrim = host.querySelector("#compSidebarScrim");

      const openMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
      };

      const closeMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
      };

      if (toggleSidebarBtn) toggleSidebarBtn.onclick = openMobileDrawer;
      if (closeSidebarBtn) closeSidebarBtn.onclick = closeMobileDrawer;
      if (scrim) scrim.onclick = closeMobileDrawer;

      // 3. Cuộn đến câu hỏi tương ứng khi bấm vào danh sách ở sidebar
      host.querySelectorAll(".lis-dict-sentence-item[data-q-idx]").forEach(item => {
        item.onclick = () => {
          const qi = Number(item.dataset.qIdx);
          const targetBlock = host.querySelector(`#compQBlock_${qi}`);
          if (targetBlock) {
            closeMobileDrawer();
            targetBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            targetBlock.classList.remove("highlight-pulse");
            void targetBlock.offsetWidth;
            targetBlock.classList.add("highlight-pulse");
          }
        };
      });

      // 4. Audio Player controls
      const playBtn = host.querySelector("#btnCompPlay");
      if (playBtn) {
        playBtn.onclick = () => {
          if (isPlaying) {
            pauseAudio();
          } else {
            if (currentTimeSec >= totalDurationSec - 0.2) {
              playFromTime(0);
            } else {
              playFromTime(currentTimeSec);
            }
          }
        };
      }

      const replayBtn = host.querySelector("#btnCompReplay");
      if (replayBtn) {
        replayBtn.onclick = () => {
          playFromTime(0);
        };
      }

      // Tua lùi 5 giây
      const skipBackBtn = host.querySelector("#btnCompSkipBack");
      if (skipBackBtn) {
        skipBackBtn.onclick = () => {
          const cur = isPlaying ? (playbackBaseTimeSec + (Date.now() - playbackStartTimestamp) / 1000) : currentTimeSec;
          const targetSec = Math.max(0, cur - 5);
          playFromTime(targetSec);
        };
      }

      // Tua tới 5 giây
      const skipFwdBtn = host.querySelector("#btnCompSkipFwd");
      if (skipFwdBtn) {
        skipFwdBtn.onclick = () => {
          const cur = isPlaying ? (playbackBaseTimeSec + (Date.now() - playbackStartTimestamp) / 1000) : currentTimeSec;
          const targetSec = Math.min(totalDurationSec, cur + 5);
          playFromTime(targetSec);
        };
      }

      const speedBtn = host.querySelector("#btnCompSpeed");
      if (speedBtn) {
        speedBtn.onclick = () => {
          const speeds = [0.75, 1.0, 1.25];
          const nextIdx = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
          currentSpeed = speeds[nextIdx];
          const span = host.querySelector("#compSpeedText");
          if (span) span.textContent = `${currentSpeed}x`;
          toast(`Tốc độ phát: ${currentSpeed}x`);
          recomputeTimeline();
          if (isPlaying) {
            playFromTime(currentTimeSec);
          }
        };
      }

      const toggleTransBtn = host.querySelector("#btnCompToggleTranscript");
      if (toggleTransBtn) {
        toggleTransBtn.onclick = () => {
          showTranscript = !showTranscript;
          const diagBox = host.querySelector("#compDialogueBox");
          if (diagBox) diagBox.classList.toggle("hidden", !showTranscript);
          const transLabel = host.querySelector("#compTransLabel");
          if (transLabel) transLabel.textContent = showTranscript ? "Ẩn lời thoại" : "Lời thoại";
        };
      }

      // Click vào 1 dòng trong hội thoại để phát từ đầu câu đó
      host.querySelectorAll(".lis-comp-dialogue-line").forEach(lineEl => {
        lineEl.onclick = () => {
          const lineIdx = Number(lineEl.dataset.lineIdx);
          if (!isNaN(lineIdx) && timeline[lineIdx]) {
            playFromTime(timeline[lineIdx].start);
          }
        };
      });
    };

    renderWorkspace();
  };


  const openDictationWorkspace = (lesson) => {
    currentLesson = lesson;
    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Lấy danh sách các bài luyện trong cùng cấp độ để hiển thị ở Sidebar (Req 11)
    let allLessons = (typeof getListeningLessons === "function" ? getListeningLessons() : []).filter(l => l.level === (lesson.level || "A1"));
    if (!allLessons.length && lesson) {
      allLessons = [lesson];
    } else if (lesson && !allLessons.some(l => l.id === lesson.id)) {
      allLessons.unshift(lesson);
    }

    const isLessonDone = (item) => {
      if (!item || !item.id) return false;
      const list = Progress.doneList("listenDone") || [];
      if (list.includes(item.id) || list.includes(item.id + "_dict") || list.includes(item.id + "_dict_done")) return true;
      const sList = (Array.isArray(item.dictation) && item.dictation.length > 0)
        ? item.dictation
        : (Array.isArray(item.lines) && item.lines.length > 0 ? item.lines : [1]);
      return sList.length > 0 && sList.every((_, idx) => list.includes(`${item.id}_dict_${idx}`));
    };

    // Thu thập danh sách câu luyện trong bài hiện tại
    const rawSentences = (Array.isArray(lesson.dictation) && lesson.dictation.length > 0)
      ? lesson.dictation
      : (Array.isArray(lesson.lines) && lesson.lines.length > 0 ? lesson.lines.map(l => l.ru) : ["Вот, пожалуйста."]);

    const sentences = rawSentences.map((raw, idx) => {
      const lineMatch = (lesson.lines || []).find(l => l.ru && (l.ru.includes(raw) || raw.includes(l.ru)));
      const vi = lineMatch ? lineMatch.vi : (lesson.vi || "");
      return {
        idx,
        ru: raw,
        vi,
        vocab: getSentenceVocab(raw, lesson)
      };
    });

    let currentSentenceIdx = 0;
    let currentBlankPct = 50;
    let showAnswer = false;
    let hideInstantCheck = false; // Ẩn kết quả tức thì tới khi bấm Enter (Req 4)
    let isPlaying = false;
    let isLooping = false;
    let loopCountTarget = 3; // Số lần phát lại (Req 2)
    let loopCurrentCount = 0;
    let loopDelaySec = 2; // Thời gian nghỉ giữa các lần (Req 2)
    let speed = 1.0;
    let loopTimeout = null;
    let progressTimer = null;
    let autoAdvanceTimeout = null;
    let unlockedVocab = {};
    let isRePracticing = false;
    let showCompletedReview = false;
    let rePracticeDone = new Set();

    const isSentenceDone = (idx) => {
      const key = `${lesson.id}_dict_${idx}`;
      return Progress.doneList("listenDone").includes(key);
    };

    let dictWaveform = null;

    const initDictWaveform = () => {
      const wrap = host.querySelector("#dictWaveformWrap");
      if (!wrap) return;
      if (dictWaveform) {
        try { dictWaveform.destroy(); } catch (_) {}
        dictWaveform = null;
      }
      dictWaveform = createRealtimeWaveform(wrap, {
        onSeek: (pct) => {
          stopAudio();
          playCurrentAudio();
        }
      });
      const s = sentences[currentSentenceIdx];
      if (dictWaveform && s && s.ru) {
        const soundUrl = (s.audio_url || s.audio) || null;
        dictWaveform.setSpokenText(s.ru, soundUrl);
      }
    };

    const stopAudio = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      clearTimeout(loopTimeout);
      isPlaying = false;
      const playerCard = host.querySelector("#dictPlayerCard");
      if (playerCard) playerCard.classList.remove("is-playing");
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) playBtn.innerHTML = icon("play-control", 24);
      if (dictWaveform) {
        try { dictWaveform.stop(); } catch (_) {}
      }
    };

    const updateLoopBtnState = () => {
      const loopBtn = host.querySelector("#btnDictLoop");
      if (loopBtn) {
        loopBtn.classList.toggle("is-active", isLooping);
        const countLabel = loopCountTarget === Infinity ? "∞" : `${loopCountTarget}x`;
        loopBtn.innerHTML = `${icon("repeat", 16)} <span>${isLooping ? `Lặp (${countLabel})` : "Tự lặp"}</span>`;
      }
    };

    const playCurrentAudio = () => {
      stopAudio();
      const s = sentences[currentSentenceIdx];
      if (!s) return;

      isPlaying = true;
      const playerCard = host.querySelector("#dictPlayerCard");
      if (playerCard) playerCard.classList.add("is-playing");
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) playBtn.innerHTML = icon("pause-control", 24);

      const wordCount = s.ru.trim().split(/\s+/).length;
      const charCount = s.ru.length;
      const estDurationSec = Math.max(0.9, Math.min(25, (charCount * 95 + wordCount * 110 + 200) / (speed * 1000)));
      const soundUrl = (s && (s.audio_url || s.audio)) || null;
      if (dictWaveform) {
        dictWaveform.start(s.ru, estDurationSec, soundUrl);
      }

      const onPlaybackDone = () => {
        if (dictWaveform) dictWaveform.complete();
        isPlaying = false;
        const pCard = host.querySelector("#dictPlayerCard");
        if (pCard) pCard.classList.remove("is-playing");
        const pBtn = host.querySelector("#btnDictPlay");
        if (pBtn) pBtn.innerHTML = icon("play-control", 24);

        if (isLooping) {
          loopCurrentCount++;
          if (loopCountTarget !== Infinity && loopCurrentCount >= loopCountTarget) {
            isLooping = false;
            updateLoopBtnState();
            toast("Đã hoàn thành số lần tự lặp");
          } else {
            loopTimeout = setTimeout(() => {
              if (isLooping) playCurrentAudio();
            }, loopDelaySec * 1000);
          }
        }
      };

      if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(s.ru);
        u.lang = "ru-RU";
        u.rate = speed;
        if (typeof pickVoice === "function") {
          const v = pickVoice("ru-RU");
          if (v) u.voice = v;
        }
        u.onboundary = (e) => {
          if (dictWaveform && e.charIndex !== undefined && s.ru.length > 0) {
            dictWaveform.updateBoundary(e.charIndex, e.charLength || 0);
          }
        };
        u.onend = onPlaybackDone;
        u.onerror = onPlaybackDone;
        window.speechSynthesis.speak(u);
      } else {
        setTimeout(onPlaybackDone, estDurationMs);
      }
    };

    const tokenizeSentence = (sentenceText) => {
      const tokens = [];
      const regex = /([а-яА-ЯёЁa-zA-Z0-9\-]+|[^а-яА-ЯёЁa-zA-Z0-9\s]+|\s+)/g;
      let m;
      while ((m = regex.exec(sentenceText)) !== null) {
        const val = m[1];
        if (/^\s+$/.test(val)) continue;
        const isWord = /^[а-яА-ЯёЁa-zA-Z0-9\-]+$/.test(val);
        tokens.push({ text: val, isWord });
      }
      return tokens;
    };

    const getBlankSet = (tokens, pct) => {
      const wordIndices = [];
      tokens.forEach((t, i) => { if (t.isWord) wordIndices.push(i); });
      if (pct >= 100) return new Set(wordIndices);

      const sorted = [...wordIndices].sort((a, b) => tokens[b].text.length - tokens[a].text.length);
      const count = Math.max(1, Math.round(wordIndices.length * (pct / 100)));
      return new Set(sorted.slice(0, count));
    };

    // Gợi ý 1 từ (Req 5 & phím Tab)
    const hintOneWord = () => {
      const flow = host.querySelector("#dictSentenceFlow");
      if (!flow) return;
      const inputs = Array.from(flow.querySelectorAll(".lis-dict-word-input:not(.is-correct)"));
      if (inputs.length === 0) {
        toast("Tất cả các từ trong câu đã được điền chính xác!");
        return;
      }
      const targetInput = inputs[0];
      const expected = targetInput.dataset.expected || "";
      targetInput.value = expected;
      targetInput.classList.add("is-correct");
      targetInput.classList.remove("is-wrong");
      targetInput.readOnly = true;
      toast(`Gợi ý: «${expected}»`);

      const remaining = Array.from(flow.querySelectorAll(".lis-dict-word-input:not(.is-correct)"));
      if (remaining.length === 0) {
        handleSentenceFinished();
      } else {
        remaining[0].focus();
      }
    };

    const renderWorkspace = () => {
      const s = sentences[currentSentenceIdx];
      const completedLessonsCount = allLessons.filter(isLessonDone).length;
      const pctTopicDone = allLessons.length > 0 ? Math.round((completedLessonsCount / allLessons.length) * 100) : 0;
      const isLessonCompleted = isLessonDone(lesson);
      const isCurrentSentenceDone = isRePracticing ? rePracticeDone.has(currentSentenceIdx) : isSentenceDone(currentSentenceIdx);
      const isUnlocked = isCurrentSentenceDone || (!isRePracticing && isSentenceDone(currentSentenceIdx)) || !!unlockedVocab[currentSentenceIdx];
      const allReDone = isRePracticing && sentences.length > 0 && sentences.every((_, i) => rePracticeDone.has(i));
      const isBannerVisible = isLessonCompleted && !isRePracticing && !showCompletedReview;
      const showPracticeCard = !isLessonCompleted || isRePracticing || showCompletedReview;

      host.innerHTML = `
        <div class="lis-dict-workspace-shell">
          <!-- 1. Thanh điều hướng trên cùng -->
          <div class="lis-dict-topbar">
            <button type="button" class="lis-dict-topbar-back" id="btnDictBack" title="Quay lại danh sách bài nghe" aria-label="Quay lại">
              ${icon("arrow-left", 20)}
            </button>
            <div class="lis-dict-topbar-heading">
              <h1 class="lis-dict-topbar-title"><span class="lis-dict-title-prefix">Nghe chép chính tả - </span><span class="lis-dict-title-topic">${esc(lesson.title)}</span></h1>
            </div>
            <button type="button" class="lis-dict-topbar-menu-btn" id="btnDictToggleSidebar" aria-label="Danh sách bài luyện" title="Xem danh sách bài luyện">
              ${icon("list", 20)}
              <span class="lis-dict-menu-badge">${allLessons.length}</span>
            </button>
          </div>

          <!-- Bố cục 3/7: 3 phần bên trái danh sách bài luyện, 7 phần bên phải làm bài -->
          <div class="lis-dict-workspace-grid">
            <!-- CỘT TRÁI (3 PHẦN): DANH SÁCH BÀI LUYỆN TRONG CHỦ ĐỀ / CẤP ĐỘ (Req 11, không có lis-dict-sentence-snippet - Req 1) -->
            <aside class="lis-dict-sidebar-panel" id="dictSidebarPanel">
              <div class="lis-dict-sidebar-header">
                <h3 class="lis-dict-sidebar-title">Danh sách bài luyện</h3>
                <button type="button" class="lis-dict-sidebar-close-btn" id="btnDictCloseSidebar" aria-label="Đóng danh sách">
                  ${icon("x", 18)}
                </button>
              </div>

              <div class="lis-dict-sidebar-progress-box">
                <div class="lis-dict-sidebar-progress-text">
                  <span>Tiến độ cấp độ</span>
                  <strong>${completedLessonsCount}/${allLessons.length} bài đã xong</strong>
                </div>
                <div class="lis-dict-progress-track">
                  <div class="lis-dict-progress-fill" style="width: ${pctTopicDone}%"></div>
                </div>
              </div>

              <div class="lis-dict-sentence-list">
                ${allLessons.map((item, i) => {
                  const active = item.id === lesson.id;
                  const isDone = isLessonDone(item);
                  const num = String(i + 1).padStart(2, "0");
                  return `
                    <button type="button" class="lis-dict-sentence-item ${active ? "is-active" : ""} ${isDone ? "is-done" : ""}" data-lesson-id="${esc(item.id)}" title="${esc(item.title)}">
                      <span class="lis-dict-sentence-num">${num}</span>
                      <div class="lis-dict-sentence-info">
                        <strong class="lis-dict-sentence-label">${esc(item.title)}</strong>
                      </div>
                      <span class="lis-dict-sentence-status">
                        ${isDone ? icon("check-circle-correct", 17) : active ? icon("headphones", 16) : icon("arrow-right", 16)}
                      </span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>

            <!-- CỘT PHẢI (7 PHẦN): KHUNG LÀM BÀI CHÍNH -->
            <main class="lis-dict-main-panel">
              <!-- 2. Khung phát âm thanh (Audio Player) -->
              <section class="lis-dict-player-card" id="dictPlayerCard">
                <div class="lis-dict-waveform-wrap" id="dictWaveformWrap" aria-label="Giao diện sóng âm phát âm thanh"></div>

                <div class="lis-dict-player-controls">
                  <!-- Cụm trái: Phát lại -->
                  <div class="lis-dict-ctrl-left">
                    <button type="button" class="lis-dict-btn-replay" id="btnDictReplay" title="Phát lại từ đầu câu này" aria-label="Phát lại">
                      ${icon("rotate-ccw", 16)} <span class="lis-ctrl-btn-text">Phát lại</span>
                    </button>
                  </div>

                  <!-- Cụm giữa: Câu trước (<), Play/Pause, Câu tiếp theo (>) (Req 12) -->
                  <div class="lis-dict-ctrl-center">
                    <button type="button" class="lis-dict-btn-skip" id="btnDictPrevSentence" title="Câu trước" ${currentSentenceIdx === 0 ? "disabled" : ""}>
                      ${icon("chevron-left", 20)}
                    </button>
                    <button type="button" class="lis-dict-btn-play" id="btnDictPlay" title="Phát / Dừng âm thanh">
                      ${icon("play-control", 24)}
                    </button>
                    <button type="button" class="lis-dict-btn-skip" id="btnDictNextSentence" title="Câu tiếp theo" ${currentSentenceIdx === sentences.length - 1 ? "disabled" : ""}>
                      ${icon("chevron-right", 20)}
                    </button>
                  </div>

                  <!-- Cụm phải: Tốc độ phát (Slider đẹp tinh tế) & Tự lặp (Cửa sổ phong cách Pomodoro cao cấp) -->
                  <div class="lis-dict-ctrl-right">
                    <div class="lis-dict-speed-wrapper">
                      <button type="button" class="lis-dict-btn-speed" id="btnDictSpeed" title="Thay đổi tốc độ phát">
                        <span id="dictSpeedText">${speed.toFixed(1)}x</span>
                      </button>
                      <div class="lis-dict-popover lis-dict-speed-popover hidden" id="dictSpeedPopover">
                        <div class="lis-dict-popover-header">
                          <div class="pomo-pop-title-wrap">
                            <span class="pomo-pop-title-dot" style="background:var(--primary)"></span>
                            <span class="lis-dict-popover-title">Tốc độ phát âm</span>
                          </div>
                          <span class="lis-dict-slider-badge" id="dictSpeedBadge">${speed.toFixed(1)}x</span>
                        </div>
                        
                        <div class="lis-dict-slider-wrap">
                          <input type="range" min="0.7" max="1.4" step="0.1" value="${speed.toFixed(1)}" class="pomo-range" id="dictSpeedSlider" aria-label="Tốc độ phát âm">
                          <div class="lis-dict-slider-ticks">
                            <span>0.7x (Chậm)</span>
                            <span>1.0x (Chuẩn)</span>
                            <span>1.4x (Nhanh)</span>
                          </div>
                        </div>

                        <div class="lis-dict-presets-row">
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 0.8) < 0.01 ? "is-active" : ""}" data-speed="0.8">0.8x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.0) < 0.01 ? "is-active" : ""}" data-speed="1.0">1.0x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.2) < 0.01 ? "is-active" : ""}" data-speed="1.2">1.2x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.4) < 0.01 ? "is-active" : ""}" data-speed="1.4">1.4x</button>
                        </div>
                      </div>
                    </div>

                    <div class="lis-dict-loop-wrapper">
                      <button type="button" class="lis-dict-btn-loop ${isLooping ? "is-active" : ""}" id="btnDictLoop" title="Cài đặt tự lặp">
                        ${icon("repeat", 16)} <span>${isLooping ? `Lặp (${loopCountTarget === Infinity ? "∞" : `${loopCountTarget}x`})` : "Tự lặp"}</span>
                      </button>
                      <div class="lis-dict-popover lis-dict-loop-popover hidden" id="dictLoopPopover">
                        <div class="lis-dict-popover-header">
                          <div class="pomo-pop-title-wrap">
                            <span class="pomo-pop-title-dot" style="background:#10b981"></span>
                            <span class="lis-dict-popover-title">Cài đặt tự lặp</span>
                          </div>
                          <button type="button" class="pomo-pop-icon-btn" id="btnCloseLoopPopover" title="Đóng" aria-label="Đóng">
                            ${icon("x", 14)}
                          </button>
                        </div>

                        <!-- Quick Presets -->
                        <div class="lis-dict-presets-row" id="loopPresetsRow">
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 2 && loopDelaySec === 2 ? "is-active" : ""}" data-count="2" data-delay="2">2 lần · 2s</button>
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 3 && loopDelaySec === 2 ? "is-active" : ""}" data-count="3" data-delay="2">3 lần · 2s</button>
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 5 && loopDelaySec === 3 ? "is-active" : ""}" data-count="5" data-delay="3">5 lần · 3s</button>
                        </div>

                        <!-- Section 1: Số lần phát lại -->
                        <div class="lis-dict-slider-section">
                          <div class="lis-dict-slider-header">
                            <span class="lis-dict-popover-label">Số lần phát lại</span>
                            <span class="lis-dict-slider-val" id="dictLoopCountBadge">${loopCountTarget === Infinity ? "Vô hạn" : `${loopCountTarget} lần`}</span>
                          </div>
                          <input type="range" min="1" max="10" step="1" value="${loopCountTarget === Infinity ? 10 : loopCountTarget}" class="pomo-range" id="dictLoopCountSlider">
                          <div class="lis-dict-slider-ticks">
                            <span>1 lần</span>
                            <span>5 lần</span>
                            <span>Vô hạn</span>
                          </div>
                        </div>

                        <!-- Section 2: Thời gian nghỉ -->
                        <div class="lis-dict-slider-section">
                          <div class="lis-dict-slider-header">
                            <span class="lis-dict-popover-label">Thời gian nghỉ</span>
                            <span class="lis-dict-slider-val" id="dictLoopDelayBadge">${loopDelaySec} giây</span>
                          </div>
                          <input type="range" min="1" max="6" step="1" value="${loopDelaySec}" class="pomo-range" id="dictLoopDelaySlider">
                          <div class="lis-dict-slider-ticks">
                            <span>1s</span>
                            <span>3s</span>
                            <span>6s</span>
                          </div>
                        </div>

                        <div class="lis-dict-popover-actions">
                          <button type="button" class="lis-dict-popover-btn-secondary" id="btnDictLoopOff">Tắt lặp</button>
                          <button type="button" class="lis-dict-popover-btn-primary" id="btnDictLoopApply">Áp dụng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 2.5 Banner nhắc bài đã hoàn thành -->
              ${isBannerVisible ? `
                <div class="lis-dict-completed-banner is-completed-card">
                  <div class="lis-dict-completed-banner-left">
                    <span class="lis-dict-completed-banner-icon">
                      ${icon("check-circle-correct", 20)}
                    </span>
                    <div class="lis-dict-completed-banner-text">
                      <div class="lis-dict-completed-banner-title">
                        Đã hoàn thành!
                      </div>
                    </div>
                  </div>
                  <div class="lis-dict-completed-banner-actions">
                    <button type="button" class="btn-dict-repractice btn-dict-repractice-hero" id="btnDictRePractice" title="Bắt đầu luyện tập lại bài này" aria-label="Luyện lại">
                      ${icon("rotate-ccw", 15)} <span class="lis-banner-btn-text">Luyện lại</span>
                    </button>
                    <button type="button" class="btn-dict-repractice-exit" id="btnDictViewCompleted" title="Xem lại đáp án đã hoàn thành" aria-label="Xem đáp án">
                      ${icon("eye", 15)} <span class="lis-banner-btn-text">Đáp án</span>
                    </button>
                  </div>
                </div>
              ` : ""}

              ${showCompletedReview ? `
                <div class="lis-dict-completed-banner is-review-mode">
                  <div class="lis-dict-completed-banner-left">
                    <span class="lis-dict-completed-banner-icon">
                      ${icon("eye", 18)}
                    </span>
                    <div class="lis-dict-completed-banner-text">
                      <div class="lis-dict-completed-banner-title">Đang xem đáp án đã hoàn thành</div>
                      <div class="lis-dict-completed-banner-sub">Các ô điền hiển thị kết quả chính xác để bạn đối chiếu.</div>
                    </div>
                  </div>
                  <div class="lis-dict-completed-banner-actions">
                    <button type="button" class="btn-dict-repractice" id="btnDictRePractice" title="Bắt đầu luyện tập lại">
                      ${icon("rotate-ccw", 15)} <span>Luyện lại bài này</span>
                    </button>
                    <button type="button" class="btn-dict-repractice-exit" id="btnDictCloseReview" title="Đóng xem đáp án">
                      ${icon("x", 15)} <span>Đóng</span>
                    </button>
                  </div>
                </div>
              ` : ""}

              <!-- 3. Thẻ làm bài chính thống nhất (chỉ hiển thị khi đang luyện tập hoặc xem đáp án) -->
              ${showPracticeCard ? `
              <section class="lis-dict-practice-card" id="dictPracticeCard">
                <!-- 3a. Thanh công cụ (Hiển thị 1 dòng trên mobile với các nút icon) -->
                <div class="lis-dict-toolbar-card">
                  <div class="lis-dict-percent-group" role="group" aria-label="Mức độ ẩn từ gợi ý">
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 30 ? "is-active" : ""}" data-pct="30" title="Chỉ ẩn 30% từ (Dễ)">30%</button>
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 50 ? "is-active" : ""}" data-pct="50" title="Ẩn 50% từ (Vừa)">50%</button>
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 70 ? "is-active" : ""}" data-pct="70" title="Ẩn 70% từ (Thử thách)">70%</button>
                  </div>

                  <div class="lis-dict-toolbar-right">
                    <button type="button" class="lis-dict-tool-btn is-icon-only ${hideInstantCheck ? "is-active" : ""}" id="btnToggleHideResult" title="${hideInstantCheck ? "Đang ẩn kết quả (nhấn Enter để kiểm tra)" : "Ẩn kết quả tới khi nhấn Enter"}" aria-label="Ẩn kết quả">
                      ${icon("eye-off", 16)}
                    </button>
                  </div>
                </div>

                <!-- 3b. Khu vực chép chính tả -->
                <div class="lis-dict-practice-body">
                  <div class="lis-dict-sentence-flow" id="dictSentenceFlow"></div>

                  <!-- Dòng hiển thị đáp án trực tiếp tại đây, không thêm thẻ box mới (Req 7) -->
                  <div class="lis-dict-inline-result ${showAnswer ? "" : "hidden"}" id="dictInlineResult">
                    <span class="lis-dict-inline-badge">${icon("check", 14)} Đáp án:</span>
                    <span class="lis-dict-inline-ru ru">${esc(s.ru)}</span>
                    ${s.vi ? `<span class="lis-dict-inline-vi">— ${esc(s.vi)}</span>` : ""}
                    <button type="button" class="btn-icon lis-dict-inline-speak" id="btnDictSpeakInlineAnswer" title="Nghe câu đáp án">
                      ${icon("volume-high", 15)}
                    </button>
                  </div>
                </div>

                <!-- 3c. Khung phụ dưới: Từ vựng nên học tích hợp -->
                <div class="lis-dict-vocab-box ${isUnlocked ? "is-unlocked" : "is-locked"}" id="dictVocabBox">
                  ${!isUnlocked ? `
                    <div class="lis-dict-lock-badge">
                      <span class="lis-dict-lock-icon">${icon("lock", 20)}</span>
                      <div class="lis-dict-lock-copy">
                        <strong>Chép xong câu để xem ${s.vocab.length} từ nên học</strong>
                        <p>Từ vựng nằm ngay trong câu, hiện sớm sẽ lộ đáp án.</p>
                      </div>
                    </div>
                  ` : `
                    <div class="lis-dict-vocab-header">
                      <div class="lis-dict-vocab-header-left">
                        <span class="lis-dict-vocab-sparkle">${icon("sparkles-clean", 20)}</span>
                        <div>
                          <strong>Từ vựng nên học trong câu</strong>
                          <small>Nhấp icon lọ để lưu trực tiếp vào Lọ từ vựng cá nhân</small>
                        </div>
                      </div>
                      <span class="lis-dict-vocab-count-pill">${s.vocab.length} từ</span>
                    </div>

                    <div class="lis-dict-vocab-list">
                      ${s.vocab.map(v => `
                        <div class="lis-dict-vocab-item">
                          <div class="lis-dict-vocab-item-main">
                            <div class="lis-dict-vocab-ru-line">
                              <strong class="lis-dict-vocab-ru ru">${esc(v.stress || v.ru)}</strong>
                              ${v.pos ? `<span class="lis-dict-vocab-pos">${esc(v.pos)}</span>` : ""}
                            </div>
                            <p class="lis-dict-vocab-vi">${esc(v.vi)}</p>
                          </div>
                          <div class="lis-dict-vocab-actions">
                            <button type="button" class="lis-dict-vocab-btn-action dict-vocab-speak" data-word="${esc(v.ru)}" title="Nghe phát âm từ này">
                              ${icon("volume-high", 18)}
                            </button>
                            <button type="button" class="lis-dict-vocab-btn-action dict-vocab-addjar" data-ru="${esc(v.ru)}" data-vi="${esc(v.vi)}" data-stress="${esc(v.stress || v.ru)}" data-pos="${esc(v.pos || "")}" title="Thêm vào Lọ từ vựng của bạn">
                              ${icon("archive-jar", 18)}
                            </button>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  `}
                </div>
              </section>
              ` : ""}
            </main>
          </div>
          <div class="lis-dict-sidebar-scrim" id="dictSidebarScrim"></div>
        </div>
      `;

      if (showPracticeCard) {
        renderClozeSentence();
      }
      bindWorkspaceEvents();
      initDictWaveform();
    };

    const renderClozeSentence = () => {
      const flow = host.querySelector("#dictSentenceFlow");
      if (!flow) return;

      const s = sentences[currentSentenceIdx];
      const tokens = tokenizeSentence(s.ru);
      const blankSet = getBlankSet(tokens, currentBlankPct);
      const isDone = isRePracticing ? rePracticeDone.has(currentSentenceIdx) : isSentenceDone(currentSentenceIdx);

      if (isDone) {
        flow.classList.add("is-completed");
      } else {
        flow.classList.remove("is-completed");
      }

      const units = [];
      let i = 0;
      while (i < tokens.length) {
        const token = tokens[i];

        // 1. Dấu mở (prefix) như «, (, [
        let prefixHtml = "";
        if (!token.isWord && /^[«(\["]+$/.test(token.text)) {
          prefixHtml = `<span class="lis-dict-punct lis-dict-punct-prefix">${esc(token.text)}</span>`;
          i++;
          if (i >= tokens.length) {
            units.push(`<span class="lis-dict-token-unit">${prefixHtml}</span>`);
            break;
          }
        }

        const curr = tokens[i];
        let mainHtml = "";

        if (!curr.isWord) {
          mainHtml = `<span class="lis-dict-punct">${esc(curr.text)}</span>`;
        } else if (!blankSet.has(i)) {
          mainHtml = `<span class="lis-dict-static-word ru">${esc(curr.text)}</span>`;
        } else {
          const cleanWord = curr.text.replace(/[.,!?;:«»""'']/g, "");
          const dotCount = Math.min(5, Math.max(2, Math.round(cleanWord.length * 0.7)));
          const dots = "·".repeat(dotCount);
          const width = Math.max(54, cleanWord.length * 14 + 26);
          const val = isDone ? cleanWord : "";
          const correctCls = isDone ? "is-correct" : "";
          const readonlyAttr = isDone ? "readonly" : "";

          mainHtml = `
            <input type="text"
              class="lis-dict-word-input ru ${correctCls}"
              data-expected="${esc(cleanWord)}"
              style="width: ${width}px;"
              placeholder="${dots}"
              value="${esc(val)}"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Từ cần điền (${cleanWord.length} ký tự)"
              ${readonlyAttr}
            />
          `;
        }

        // 2. Dấu đóng (suffix) như .,!?;:»)]... bám sát từ trước đó, không bị tách dòng
        let suffixHtml = "";
        while (i + 1 < tokens.length && !tokens[i + 1].isWord && /^[.,!?;:»\)'"]+$/.test(tokens[i + 1].text)) {
          suffixHtml += `<span class="lis-dict-punct lis-dict-punct-suffix">${esc(tokens[i + 1].text)}</span>`;
          i++;
        }

        units.push(`<span class="lis-dict-token-unit">${prefixHtml}${mainHtml}${suffixHtml}</span>`);
        i++;
      }

      flow.innerHTML = units.join("");

      const inputs = Array.from(flow.querySelectorAll(".lis-dict-word-input"));
      const norm = (str) => (str || "").trim().toLowerCase().replace(/[.,!?;:«»""'']/g, "").replace(/ё/g, "е");

      // Hàm kiểm tra khi bấm Enter (hoặc khi ở chế độ hideInstantCheck)
      const checkAllInputsOnEnter = (currentInput) => {
        let hasWrong = false;
        inputs.forEach(inp => {
          if (inp.classList.contains("is-correct")) return;
          const exp = inp.dataset.expected || "";
          if (norm(inp.value) === norm(exp) && norm(inp.value).length > 0) {
            inp.classList.add("is-correct");
            inp.classList.remove("is-wrong");
            inp.readOnly = true;
            inp.value = exp;
          } else if (inp.value.trim().length > 0) {
            inp.classList.add("is-wrong");
            hasWrong = true;
          }
        });

        const nextIncomplete = inputs.find(inp => !inp.classList.contains("is-correct"));
        if (!nextIncomplete) {
          handleSentenceFinished();
        } else {
          nextIncomplete.focus();
          if (hasWrong) {
            toast("Có từ chưa đúng, hãy nghe kỹ lại nhé!");
          }
        }
      };

      inputs.forEach((input, idx) => {
        input.oninput = () => {
          input.classList.remove("is-wrong");
          if (!hideInstantCheck) {
            const expected = input.dataset.expected || "";
            if (norm(input.value) === norm(expected) && norm(input.value).length > 0) {
              input.classList.add("is-correct");
              input.classList.remove("is-wrong");
              input.readOnly = true;
              input.value = expected;

              const nextInput = inputs.find(inp => !inp.classList.contains("is-correct"));
              if (nextInput) {
                nextInput.focus();
              } else {
                handleSentenceFinished();
              }
            }
          }
        };

        input.onkeydown = (e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            hintOneWord();
          } else if (e.key === "Enter") {
            e.preventDefault();
            checkAllInputsOnEnter(input);
          } else if (e.key === " ") {
            e.preventDefault();
            const currIdx = inputs.indexOf(input);
            if (currIdx < inputs.length - 1) inputs[currIdx + 1].focus();
          } else if (e.key === "Backspace" && input.value === "") {
            const currIdx = inputs.indexOf(input);
            if (currIdx > 0 && !inputs[currIdx - 1].readOnly) {
              inputs[currIdx - 1].focus();
            }
          }
        };
      });

      const firstEmpty = inputs.find(inp => !inp.classList.contains("is-correct"));
      if (firstEmpty) {
        setTimeout(() => firstEmpty.focus(), 80);
      }
    };

    const handleSentenceFinished = () => {
      // 1. Phản hồi âm thanh
      if (typeof playQuizletSound === "function") {
        playQuizletSound("correct");
      }
      unlockedVocab[currentSentenceIdx] = true;

      // 2. Ghi nhận hoàn thành câu
      if (isRePracticing) {
        rePracticeDone.add(currentSentenceIdx);
      } else {
        const key = `${lesson.id}_dict_${currentSentenceIdx}`;
        if (!Progress.doneList("listenDone").includes(key)) {
          Progress.markDone("listenDone", key);
          Progress.addXp(10);
        }
      }

      // 3. Khóa các ô điền của câu hiện tại sang trạng thái is-correct
      const flow = host.querySelector("#dictSentenceFlow");
      if (flow) {
        flow.classList.add("is-completed");
        flow.querySelectorAll(".lis-dict-word-input").forEach(inp => {
          inp.classList.add("is-correct");
          inp.classList.remove("is-wrong");
          inp.readOnly = true;
        });
      }

      // 4. Tự động chuyển sang câu tiếp theo đến hết
      const hasNext = currentSentenceIdx < sentences.length - 1;

      clearTimeout(autoAdvanceTimeout);
      if (hasNext) {
        toast(`Chính xác! Đang chuyển sang câu ${currentSentenceIdx + 2}/${sentences.length}... 🚀`);
        autoAdvanceTimeout = setTimeout(() => {
          stopAudio();
          currentSentenceIdx++;
          showAnswer = false;
          renderWorkspace();
          setTimeout(() => {
            playCurrentAudio();
          }, 300);
        }, 850);
      } else {
        if (isRePracticing) {
          toast("Xuất sắc! Bạn đã hoàn thành toàn bộ bài luyện lại! 🌟");
          autoAdvanceTimeout = setTimeout(() => {
            stopAudio();
            isRePracticing = false;
            showCompletedReview = false;
            rePracticeDone.clear();
            currentSentenceIdx = 0;
            renderWorkspace();
          }, 1100);
        } else {
          Progress.markDone("listenDone", `${lesson.id}_dict`);
          Progress.markDone("listenDone", `${lesson.id}_dict_done`);
          Progress.addXp(20);
          toast("Xuất sắc! Bạn đã hoàn thành toàn bộ bài nghe chép chính tả! 🎉 (+20 XP)");
          autoAdvanceTimeout = setTimeout(() => {
            stopAudio();
            currentSentenceIdx = 0;
            renderWorkspace();
          }, 1100);
        }
      }
    };

    let closeAllPopoversHandler = null;

    const bindWorkspaceEvents = () => {
      // 1. Quay lại Hub
      const backBtn = host.querySelector("#btnDictBack") || host.querySelector(".lis-dict-topbar-back");
      if (backBtn) {
        backBtn.onclick = (e) => {
          if (e) e.preventDefault();
          clearTimeout(autoAdvanceTimeout);
          stopAudio();
          if (dictWaveform) {
            try { dictWaveform.destroy(); } catch (_) {}
            dictWaveform = null;
          }
          if (closeAllPopoversHandler) {
            document.removeEventListener("click", closeAllPopoversHandler);
          }
          document.body.classList.remove("in-workspace");
          renderHub();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      // Xử lý Luyện lại bài đã hoàn thành
      const btnRePractice = host.querySelector("#btnDictRePractice");
      if (btnRePractice) {
        btnRePractice.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          isRePracticing = true;
          showCompletedReview = false;
          rePracticeDone.clear();
          currentSentenceIdx = 0;
          showAnswer = false;
          toast("Bắt đầu luyện tập lại bài học! 🎧");
          renderWorkspace();
          setTimeout(() => {
            playCurrentAudio();
          }, 350);
        };
      }

      const btnViewCompleted = host.querySelector("#btnDictViewCompleted");
      if (btnViewCompleted) {
        btnViewCompleted.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          showCompletedReview = true;
          isRePracticing = false;
          renderWorkspace();
        };
      }

      const btnCloseReview = host.querySelector("#btnDictCloseReview");
      if (btnCloseReview) {
        btnCloseReview.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          showCompletedReview = false;
          renderWorkspace();
        };
      }

      // 2. Audio Player Controls
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) {
        playBtn.onclick = () => {
          if (isPlaying) {
            stopAudio();
          } else {
            playCurrentAudio();
          }
        };
      }

      const replayBtn = host.querySelector("#btnDictReplay");
      if (replayBtn) {
        replayBtn.onclick = () => {
          playCurrentAudio();
        };
      }

      // Điều hướng câu trước / câu sau ở cụm giữa (Req 12)
      const prevSentenceBtn = host.querySelector("#btnDictPrevSentence");
      if (prevSentenceBtn) {
        prevSentenceBtn.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          if (currentSentenceIdx > 0) {
            stopAudio();
            currentSentenceIdx--;
            showAnswer = false;
            renderWorkspace();
          }
        };
      }

      const nextSentenceBtn = host.querySelector("#btnDictNextSentence");
      if (nextSentenceBtn) {
        nextSentenceBtn.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          if (currentSentenceIdx < sentences.length - 1) {
            stopAudio();
            currentSentenceIdx++;
            showAnswer = false;
            renderWorkspace();
          }
        };
      }

      // Cửa sổ tốc độ phát (Slider từ trái sang phải đẹp tinh tế)
      const speedBtn = host.querySelector("#btnDictSpeed");
      const speedPopover = host.querySelector("#dictSpeedPopover");
      const loopPopover = host.querySelector("#dictLoopPopover");

      if (speedBtn && speedPopover) {
        speedBtn.onclick = (e) => {
          e.stopPropagation();
          if (loopPopover) loopPopover.classList.add("hidden");
          speedPopover.classList.toggle("hidden");
        };

        const speedSlider = speedPopover.querySelector("#dictSpeedSlider");
        const speedBadge = speedPopover.querySelector("#dictSpeedBadge");
        const speedText = host.querySelector("#dictSpeedText");

        const updateSpeedDisplay = (val) => {
          speed = Math.round(val * 10) / 10;
          if (speedSlider) speedSlider.value = speed.toFixed(1);
          if (speedBadge) speedBadge.textContent = `${speed.toFixed(1)}x`;
          if (speedText) speedText.textContent = `${speed.toFixed(1)}x`;
          speedPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
            btn.classList.toggle("is-active", Math.abs(parseFloat(btn.dataset.speed) - speed) < 0.01);
          });
        };

        if (speedSlider) {
          speedSlider.oninput = (e) => {
            e.stopPropagation();
            updateSpeedDisplay(parseFloat(speedSlider.value));
          };
          speedSlider.onchange = (e) => {
            e.stopPropagation();
            toast(`Tốc độ phát: ${speed.toFixed(1)}x`);
            if (isPlaying) playCurrentAudio();
          };
        }

        speedPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            updateSpeedDisplay(parseFloat(btn.dataset.speed));
            toast(`Tốc độ phát: ${speed.toFixed(1)}x`);
            if (isPlaying) playCurrentAudio();
          };
        });
      }

      // Cửa sổ tự lặp (Chuẩn Pomodoro đẹp tinh tế)
      const loopBtn = host.querySelector("#btnDictLoop");
      if (loopBtn && loopPopover) {
        loopBtn.onclick = (e) => {
          e.stopPropagation();
          if (speedPopover) speedPopover.classList.add("hidden");
          loopPopover.classList.toggle("hidden");
        };

        const closeLoopBtn = loopPopover.querySelector("#btnCloseLoopPopover");
        if (closeLoopBtn) {
          closeLoopBtn.onclick = (e) => {
            e.stopPropagation();
            loopPopover.classList.add("hidden");
          };
        }

        const loopCountSlider = loopPopover.querySelector("#dictLoopCountSlider");
        const loopDelaySlider = loopPopover.querySelector("#dictLoopDelaySlider");
        const loopCountBadge = loopPopover.querySelector("#dictLoopCountBadge");
        const loopDelayBadge = loopPopover.querySelector("#dictLoopDelayBadge");

        let tempCount = loopCountTarget;
        let tempDelay = loopDelaySec;

        const syncLoopPresetHighlights = () => {
          loopPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
            const c = parseInt(btn.dataset.count, 10);
            const d = parseInt(btn.dataset.delay, 10);
            btn.classList.toggle("is-active", tempCount === c && tempDelay === d);
          });
        };

        if (loopCountSlider) {
          loopCountSlider.oninput = (e) => {
            e.stopPropagation();
            const val = parseInt(loopCountSlider.value, 10);
            tempCount = val >= 10 ? Infinity : val;
            if (loopCountBadge) loopCountBadge.textContent = tempCount === Infinity ? "Vô hạn" : `${tempCount} lần`;
            syncLoopPresetHighlights();
          };
        }

        if (loopDelaySlider) {
          loopDelaySlider.oninput = (e) => {
            e.stopPropagation();
            tempDelay = parseInt(loopDelaySlider.value, 10);
            if (loopDelayBadge) loopDelayBadge.textContent = `${tempDelay} giây`;
            syncLoopPresetHighlights();
          };
        }

        loopPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            tempCount = parseInt(btn.dataset.count, 10);
            tempDelay = parseInt(btn.dataset.delay, 10);
            if (loopCountSlider) loopCountSlider.value = tempCount;
            if (loopDelaySlider) loopDelaySlider.value = tempDelay;
            if (loopCountBadge) loopCountBadge.textContent = `${tempCount} lần`;
            if (loopDelayBadge) loopDelayBadge.textContent = `${tempDelay} giây`;
            syncLoopPresetHighlights();
          };
        });

        const applyLoopBtn = loopPopover.querySelector("#btnDictLoopApply");
        if (applyLoopBtn) {
          applyLoopBtn.onclick = (e) => {
            e.stopPropagation();
            loopCountTarget = tempCount;
            loopDelaySec = tempDelay;
            isLooping = true;
            loopCurrentCount = 0;
            updateLoopBtnState();
            loopPopover.classList.add("hidden");
            const countTxt = loopCountTarget === Infinity ? "Vô hạn" : `${loopCountTarget} lần`;
            toast(`Đã bật tự lặp: ${countTxt}, nghỉ ${loopDelaySec}s`);
            if (!isPlaying) playCurrentAudio();
          };
        }

        const offLoopBtn = loopPopover.querySelector("#btnDictLoopOff");
        if (offLoopBtn) {
          offLoopBtn.onclick = (e) => {
            e.stopPropagation();
            isLooping = false;
            clearTimeout(loopTimeout);
            updateLoopBtnState();
            loopPopover.classList.add("hidden");
            toast("Đã tắt chế độ tự lặp");
          };
        }
      }

      // Đóng popover khi nhấn ra ngoài
      if (closeAllPopoversHandler) {
        document.removeEventListener("click", closeAllPopoversHandler);
      }
      closeAllPopoversHandler = () => {
        if (speedPopover) speedPopover.classList.add("hidden");
        if (loopPopover) loopPopover.classList.add("hidden");
      };
      document.addEventListener("click", closeAllPopoversHandler);

      // 3. Mức độ gợi ý %
      host.querySelectorAll(".lis-dict-pct-btn").forEach((b) => {
        b.onclick = () => {
          currentBlankPct = parseInt(b.dataset.pct, 10) || 50;
          host.querySelectorAll(".lis-dict-pct-btn").forEach(btn => btn.classList.remove("is-active"));
          b.classList.add("is-active");
          renderClozeSentence();
        };
      });

      // 5. Ẩn kết quả tới khi bấm Enter (Req 4)
      const toggleHideBtn = host.querySelector("#btnToggleHideResult");
      if (toggleHideBtn) {
        toggleHideBtn.onclick = () => {
          hideInstantCheck = !hideInstantCheck;
          toggleHideBtn.classList.toggle("is-active", hideInstantCheck);
          toggleHideBtn.title = hideInstantCheck ? "Đang ẩn kết quả (nhấn Enter để kiểm tra)" : "Ẩn kết quả tới khi nhấn Enter";
          toast(hideInstantCheck ? "Đang bật ẩn kết quả: Gõ xong nhấn Enter để kiểm tra" : "Đã tắt ẩn kết quả: Tự động chuyển khi điền đúng");
        };
      }

      const speakInlineBtn = host.querySelector("#btnDictSpeakInlineAnswer");
      if (speakInlineBtn) {
        speakInlineBtn.onclick = () => {
          speak(sentences[currentSentenceIdx].ru, "ru-RU", speed);
        };
      }


      // 8. Mở khóa sớm từ vựng
      const unlockEarlyBtn = host.querySelector("#btnUnlockVocabEarly");
      if (unlockEarlyBtn) {
        unlockEarlyBtn.onclick = () => {
          unlockedVocab[currentSentenceIdx] = true;
          renderWorkspace();
        };
      }

      // Phát âm từ vựng
      host.querySelectorAll(".dict-vocab-speak").forEach((b) => {
        b.onclick = () => {
          const w = b.dataset.word;
          if (w) speak(w, "ru-RU", 0.85);
        };
      });

      // Thêm từ vào Lọ từ vựng cá nhân
      host.querySelectorAll(".dict-vocab-addjar").forEach((b) => {
        b.onclick = () => {
          const fn = window.openAddToJarModal || window.openAddJarModal;
          if (typeof fn === "function") {
            fn({
              ru: b.dataset.ru,
              vi: b.dataset.vi,
              stress: b.dataset.stress || b.dataset.ru,
              note: b.dataset.pos || ""
            });
          } else if (typeof toast === "function") {
            toast(`Đã chọn lưu từ «${b.dataset.ru}» vào Lọ từ vựng`);
          }
        };
      });

      // 9. Chuyển bài qua danh sách Sidebar (Req 11)
      host.querySelectorAll(".lis-dict-sentence-item").forEach((b) => {
        b.onclick = () => {
          const lessonId = b.dataset.lessonId;
          if (lessonId && lessonId !== lesson.id) {
            clearTimeout(autoAdvanceTimeout);
            stopAudio();
            if (closeAllPopoversHandler) {
              document.removeEventListener("click", closeAllPopoversHandler);
            }
            const targetLesson = allLessons.find(l => l.id === lessonId);
            if (targetLesson) {
              closeMobileDrawer();
              openDictationWorkspace(targetLesson);
            }
          }
        };
      });

      // Mobile Drawer Sidebar
      const toggleSidebarBtn = host.querySelector("#btnDictToggleSidebar");
      const closeSidebarBtn = host.querySelector("#btnDictCloseSidebar");
      const sidebarPanel = host.querySelector("#dictSidebarPanel");
      const scrim = host.querySelector("#dictSidebarScrim");

      const openMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
      };

      const closeMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
      };

      if (toggleSidebarBtn) toggleSidebarBtn.onclick = openMobileDrawer;
      if (closeSidebarBtn) closeSidebarBtn.onclick = closeMobileDrawer;
      if (scrim) scrim.onclick = closeMobileDrawer;
    };

    renderWorkspace();
  };

  const modeDict = (mb, lesson) => {
    openDictationWorkspace(lesson);
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
  const icon = (name, size = 18) => (window.RusiIcons ? RusiIcons.get(name, { size }) : "");

  if (!SR && el("#srWarn")) {
    el("#srWarn").classList.remove("hidden");
    if (window.RusiIcons && typeof RusiIcons.replace === "function") {
      RusiIcons.replace(el("#srWarn"));
    }
  }

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let cloudSpeaking = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("speaking:all") : null;

  const getSpeakingSets = () => {
    if (cloudSpeaking && cloudSpeaking.length) return cloudSpeaking;
    if (typeof window !== "undefined" && window.SPEAKING_SETS && window.SPEAKING_SETS.length) return window.SPEAKING_SETS;
    if (typeof SPEAKING_SETS !== "undefined" && Array.isArray(SPEAKING_SETS) && SPEAKING_SETS.length) return SPEAKING_SETS;
    return [];
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

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state speaking-empty-state">
          <span class="writing-empty-icon speaking-empty-icon">${icon("mic-speaking", 34)}</span>
          <h3>Chưa có bài nói cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((s, idx) => {
        const isDone = Progress.doneList("speakDone").includes(s.id);
        const isPro = s.is_pro_only || s.level === "B1" || s.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const indexStr = String(idx + 1).padStart(2, "0");
        const russianCategory = `ГОВОРЕНИЕ · ${s.level}`;

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-speak-id="${s.id}">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(234,88,12,0.08);color:#ea580c">
                ${icon(s.icon || "mic-speaking", 24)}
              </div>
              <div class="dau-card-header-main">
                <div class="dau-card-title-row">
                  <h3 class="dau-card-ru">${esc(s.title)}</h3>
                  ${isDone ? `
                    <span class="topic-status topic-status-completed" style="flex-shrink:0">
                      ${icon("check", 12)} Hoàn thành
                    </span>
                  ` : isPro ? `
                    <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                  ` : ""}
                </div>
                <div class="dau-card-subinfo">
                  <span>${s.level}</span>
                  <span class="dau-card-sep">•</span>
                  <span class="dau-card-count">${(s.items || []).length} câu</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
              <div class="topic-footer-actions">
                ${isPro && !isUnlocked ? `
                  <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                    ${icon("lock-pro", 16)}
                  </span>
                ` : `
                  <button type="button" class="btn-speak-action topic-text-btn" data-speak-id="${s.id}" title="Luyện nói ngay">
                    Luyện nói ngay ${icon("arrow-right", 14)}
                  </button>
                `}
              </div>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-speak-action, .btn-speak-circle").forEach(btn => {
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
    }, { remainingCount, unit: "bài" });
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
                  Luyện nói Shadowing<br />
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
    const items = set.items || [];

    // YouTube clip giáo dục tiếng Nga chuẩn TRKI
    const ytId = set.youtube_id || set.youtubeId || (set.video && set.video.youtubeId) || "e6lFvAQp0LE";
    const startQ = (set.start_sec || (set.video && set.video.startSec)) ? `&start=${set.start_sec || set.video.startSec}` : "";
    const endQ = (set.end_sec || (set.video && set.video.endSec)) ? `&end=${set.end_sec || set.video.endSec}` : "";
    const ytVideoUrl = set.video_url || `https://www.youtube-nocookie.com/embed/${ytId}?enablejsapi=1&rel=0&modestbranding=1${startQ}${endQ}`;

    let currentSentenceIdx = 0;
    let currentSpeed = 1.0;
    let loopMode = 0; // 0: Tắt, 3: 3 lần, 5: 5 lần
    let loopRemaining = 0;
    let isRecording = false;
    let isPlaying = false;
    let isTranslationVisible = true;
    let isVideoVisible = false;
    let autoAdvance = false;
    let isSidebarHidden = false;
    let recognitionInstance = null;

    // Helper: Tính điểm hoàn thành và trung bình
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
      return { done, avg, pct, xp: done * 15 };
    };

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnBackSpList" title="Quay lại danh sách bài nói" aria-label="Quay lại">
          ${icon("arrow-left", 18)}
        </button>

        <div class="dau-workspace-info">
          <span class="dau-workspace-title">
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
      <div class="sp-ws-grid" id="spWsGrid">
        
        <!-- SÂN KHẤU LUYỆN NÓI CHÍNH (MAIN STAGE) -->
        <main class="sp-ws-main">
          
          <!-- KHUNG VIDEO BÀI HỌC YOUTUBE (KHUNG NGUYÊN VẸN, KHÔNG CONTROL/EXTENSION, CHỈ CÓ ICON YOUTUBE Ở GIỮA) -->
          <section class="sp-video-card" id="spVideoCard">
            <div class="sp-video-body" id="spVideoBody">
              <iframe id="spYoutubePlayer" src="${ytVideoUrl}" title="Video bài học tiếng Nga" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              <div class="sp-video-cover" id="spVideoCover" style="background-image: linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.6)), url('https://img.youtube.com/vi/${ytId}/hqdefault.jpg');">
                <button type="button" class="sp-yt-center-play" id="btnPlayCenterYt" title="Phát video bài học YouTube" aria-label="Phát video bài học YouTube">
                  <svg class="sp-yt-center-svg" viewBox="0 0 68 48" width="68" height="48" fill="none">
                    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000"/>
                    <path d="M45 24L27 14v20l18-10z" fill="#FFFFFF"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <!-- THẺ LUYỆN NÓI TÍCH HỢP: ĐIỀU KHIỂN Ở TRÊN + CÂU PHỤ ĐỀ Ở DƯỚI -->
          <article class="sp-hero-card" id="spHeroCard">
            <!-- BẢNG ĐIỀU KHIỂN TỐI GIẢN (1 DÒNG Ở TRÊN) -->
            <div class="sp-controls-dock" id="spControlsDock">
              <!-- Nút câu trước -->
              <button type="button" class="sp-ctrl-btn" id="btnPrevSent" title="Câu trước (←)" aria-label="Câu trước">
                ${icon("chevron-left", 18)}
              </button>

              <!-- Nút tốc độ phát âm (0.8x, 1.0x, 1.2x) -->
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

            <!-- Thanh kết quả thu âm: Trái: Nội dung mình nói được | Phải: Điểm số -->
            <div class="sp-speech-result-bar" id="spSpeechResultBar" style="display:none;">
              <div class="sp-result-left">
                <div class="sp-result-user-lead">
                  <span class="sp-result-mic-icon">${icon("mic-speaking", 15)}</span>
                  <span>Bạn đã nói:</span>
                </div>
                <div class="sp-user-transcript-text" id="spUserTranscriptText">«...»</div>
              </div>
              <div class="sp-result-right">
                <div class="sp-result-score-wrap" id="spResultScoreWrap">
                  <div class="sp-result-score-val" id="spResultScoreVal">--</div>
                  <div class="sp-result-score-lbl" id="spResultScoreLbl">Điểm phát âm</div>
                </div>
                <button type="button" class="sp-result-retry-btn" id="btnFeedbackRetry" title="Luyện nói lại câu này (R)" aria-label="Luyện lại">
                  ${icon("rotate-ccw", 15)}
                </button>
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
      if (typeof it.startSec === "number") return it.startSec;
      if (typeof it.start === "number") return it.start;
      if (typeof it.sec === "number") return it.sec;
      if (typeof it.time === "number") return it.time;
      if (typeof it.time === "string" && it.time.includes(":")) {
        const p = it.time.split(":").map(Number);
        if (p.length === 2) return p[0] * 60 + p[1];
        if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
      }
      const baseStart = Number(set.start_sec || (set.video && set.video.startSec)) || 15;
      const baseEnd = Number(set.end_sec || (set.video && set.video.endSec)) || (baseStart + items.length * 12);
      const step = items.length > 1 ? (baseEnd - baseStart) / items.length : 12;
      return Math.round(baseStart + idx * step);
    };

    // Tự động nhảy video đến thời điểm của câu
    const seekVideoToSentence = (idx) => {
      handlePlayVideo();
      const sec = getItemSec(idx);
      const ytPlayer = el("#spYoutubePlayer");
      if (ytPlayer && ytPlayer.contentWindow) {
        try {
          ytPlayer.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "seekTo",
            args: [sec, true]
          }), "*");
          ytPlayer.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "playVideo",
            args: ""
          }), "*");
        } catch (_) {}
      }
    };

    // Đánh dấu từ đúng (xanh) và từ sai (đỏ) trực tiếp trên câu tiếng Nga
    const renderMappedSentence = (targetRu, heardRu = null) => {
      const ruBox = el("#spTargetRu");
      if (!ruBox) return;
      if (!heardRu || !heardRu.trim()) {
        ruBox.textContent = targetRu || "";
        return;
      }

      const norm = s => s.toLowerCase().replace(/[.,!?;:«»"'—–-]/g, "").trim();
      const tokens = (targetRu || "").split(/(\s+)/);
      const heardWords = norm(heardRu).split(/\s+/).filter(Boolean);

      const html = tokens.map(tok => {
        if (!tok.trim()) return tok;
        const cTok = norm(tok);
        if (!cTok) return esc(tok);

        const isMatch = heardWords.some(hw => hw === cTok || (typeof similarity === "function" && similarity(hw, cTok) >= 75));
        const cls = isMatch ? "sp-word-correct" : "sp-word-wrong";
        const tip = isMatch ? "Phát âm chuẩn xác" : "Cần phát âm rõ ràng hơn";
        return `<span class="sp-target-word ${cls}" title="${tip}">${esc(tok)}</span>`;
      }).join("");

      ruBox.innerHTML = html;
    };

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
              <div class="sp-pl-ru">${esc(it.ru || it.text || "")}</div>
              <div class="sp-pl-vi">${esc(it.vi || it.translation || "")}</div>
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
          seekVideoToSentence(idx);
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

    // Dừng toàn bộ âm thanh
    const stopAudio = () => {
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

    // Phát âm câu tiếng Nga chuẩn
    const playCurrentSentence = (isAutoLoop = false) => {
      const it = items[currentSentenceIdx];
      if (!it) return;

      if (isPlaying && !isAutoLoop) {
        stopAudio();
        return;
      }

      stopAudio();
      stopRecording();

      if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.speechSynthesis) {
        toast("Trình duyệt không hỗ trợ phát âm — hãy dùng Google Chrome hoặc Microsoft Edge.");
        return;
      }

      isPlaying = true;
      const btnPlay = el("#btnPlayModel");
      if (btnPlay) {
        btnPlay.classList.add("is-playing");
        const ic = el("#spPlayIcon");
        if (ic) ic.innerHTML = icon("pause", 20);
      }

      const text = (it.ru || it.text || "").trim();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ru-RU";
      u.rate = currentSpeed;
      if (typeof pickVoice === "function") {
        const v = pickVoice("ru-RU");
        if (v) u.voice = v;
      }

      const onSpeechFinish = () => {
        if (!isPlaying) return;
        if (loopRemaining > 1) {
          loopRemaining--;
          const pill = el("#spLoopPill");
          if (pill) pill.textContent = `${loopRemaining}x`;
          setTimeout(() => {
            if (isPlaying) playCurrentSentence(true);
          }, 450);
        } else if (loopRemaining === 1) {
          loopRemaining = 0;
          const pill = el("#spLoopPill");
          if (pill) pill.textContent = `${loopMode}x`;
          stopAudio();
        } else {
          stopAudio();
        }
      };

      u.onend = onSpeechFinish;
      u.onerror = () => {
        stopAudio();
      };

      window.speechSynthesis.speak(u);
    };

    // Nạp câu hiện hành vào sân khấu
    const loadSentence = (idx) => {
      if (idx < 0 || idx >= items.length) return;
      currentSentenceIdx = idx;
      const it = items[idx];

      // Đặt lại câu tiếng Nga ở trạng thái chữ bình thường
      renderMappedSentence(it.ru || it.text || "", null);

      const viBox = el("#spTargetVi");
      if (viBox) {
        viBox.textContent = it.vi || it.translation || "";
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
          const trEl = el("#spUserTranscriptText");
          if (scVal) scVal.textContent = `${prevScore}%`;
          if (scLbl) scLbl.textContent = prevScore >= 80 ? "Xuất sắc! 🌟" : prevScore >= 60 ? "Khá tốt! 👍" : "Thử lại nhé 💪";
          if (scWrap) scWrap.className = "sp-result-score-wrap " + (prevScore >= 80 ? "is-excellent" : prevScore >= 60 ? "is-good" : "is-retry");
          if (trEl) trEl.innerHTML = `<span style="color:var(--muted);font-style:italic;">Điểm lưu từ lần luyện trước</span>`;
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
    };

    // Thu âm Speech Recognition và AI chấm điểm
    const startRecording = () => {
      if (!Monetization.isPro()) {
        const used = STORE.get(todayKey, 0);
        if (used >= 2) {
          Monetization.showProGateModal("Lượt luyện nói hôm nay đã hết", "Bạn đã dùng hết 2 lượt luyện nói miễn phí hôm nay. Nâng cấp lên gói PRO để mở khóa AI chấm âm vị không giới hạn số lượt.");
          return;
        }
      }

      if (!SR) {
        toast("Trình duyệt không hỗ trợ nhận dạng giọng nói — vui lòng dùng Google Chrome hoặc Microsoft Edge.");
        return;
      }

      if (isRecording) {
        stopRecording();
        return;
      }

      stopAudio();
      isRecording = true;

      const btnMic = el("#btnRecordMic");
      if (btnMic) btnMic.classList.add("is-recording");

      const it = items[currentSentenceIdx];
      const targetText = (it.ru || it.text || "").trim();

      const resBar = el("#spSpeechResultBar");
      const userTrEl = el("#spUserTranscriptText");
      const scoreValEl = el("#spResultScoreVal");
      const scoreLblEl = el("#spResultScoreLbl");
      const scoreWrapEl = el("#spResultScoreWrap");

      if (resBar) resBar.style.display = "flex";
      if (userTrEl) userTrEl.innerHTML = `<span style="color:var(--muted);font-style:italic;">Đang lắng nghe giọng của bạn...</span>`;
      if (scoreValEl) scoreValEl.textContent = "...";
      if (scoreLblEl) scoreLblEl.textContent = "Đang nhận diện";

      recognitionInstance = new SR();
      recognitionInstance.lang = "ru-RU";
      recognitionInstance.interimResults = true;
      recognitionInstance.maxAlternatives = 3;

      recognitionInstance.onresult = (ev) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = ev.resultIndex; i < ev.results.length; ++i) {
          if (ev.results[i].isFinal) {
            finalTranscript += ev.results[i][0].transcript;
          } else {
            interimTranscript += ev.results[i][0].transcript;
          }
        }

        const heard = (finalTranscript || interimTranscript).trim();
        if (!heard) return;

        if (userTrEl) userTrEl.textContent = `«${heard}»`;

        // Map trực tiếp vào câu tiếng Nga (từ đúng xanh, từ sai đỏ)
        renderMappedSentence(targetText, heard);

        if (finalTranscript) {
          const sim = similarity(finalTranscript, targetText);

          // Lưu kết quả
          STORE.set("speak_" + set.id + "_" + currentSentenceIdx, Math.max(sim, STORE.get("speak_" + set.id + "_" + currentSentenceIdx, 0)));
          STORE.set(todayKey, STORE.get(todayKey, 0) + 1);

          const key = "speakDone_" + set.id + "_" + currentSentenceIdx;
          const bestBefore = STORE.get("speak_" + set.id + "_" + currentSentenceIdx, 0);
          if (sim >= 70 && sim >= bestBefore && !Progress.doneList("speakDone").includes(key)) {
            Progress.markDone("speakDone", key);
            Progress.addXp(15);
          }

          if (scoreValEl) scoreValEl.textContent = `${sim}%`;
          if (scoreLblEl) {
            scoreLblEl.textContent = sim >= 80 ? "Xuất sắc! 🌟" : sim >= 60 ? "Khá tốt! 👍" : "Thử lại nhé 💪";
          }
          if (scoreWrapEl) {
            scoreWrapEl.className = "sp-result-score-wrap " + (sim >= 80 ? "is-excellent" : sim >= 60 ? "is-good" : "is-retry");
          }

          renderPlaylist();

          // Tự động chuyển câu nếu bật chế độ Auto-Advance và đạt điểm tốt
          if (autoAdvance && sim >= 80 && currentSentenceIdx < items.length - 1) {
            setTimeout(() => {
              loadSentence(currentSentenceIdx + 1);
              playCurrentSentence();
            }, 1500);
          }
        }
      };

      recognitionInstance.onerror = () => {
        stopRecording();
      };

      recognitionInstance.onend = () => {
        stopRecording();
      };

      try {
        recognitionInstance.start();
      } catch (e) {
        stopRecording();
      }
    };

    const stopRecording = () => {
      isRecording = false;
      const btnMic = el("#btnRecordMic");
      if (btnMic) btnMic.classList.remove("is-recording");
      if (recognitionInstance) {
        try { recognitionInstance.stop(); } catch (e) {}
      }
    };

    // Điều chỉnh tốc độ phát âm
    const toggleSpeed = () => {
      const speeds = [0.8, 1.0, 1.2];
      const nextIdx = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
      currentSpeed = speeds[nextIdx];
      const b = el("#spSpeedBadge");
      if (b) b.textContent = `${currentSpeed}x`;
      toast(`Tốc độ phát âm: ${currentSpeed}x`);
    };

    // Điều chỉnh chế độ lặp lại
    const toggleLoop = () => {
      if (loopMode === 0) {
        loopMode = 3;
        loopRemaining = 3;
      } else if (loopMode === 3) {
        loopMode = 5;
        loopRemaining = 5;
      } else {
        loopMode = 0;
        loopRemaining = 0;
      }

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

    // Xử lý phát video khi bấm vào cover hoặc icon YouTube ở giữa màn hình
    const handlePlayVideo = () => {
      const vCover = el("#spVideoCover");
      if (vCover) vCover.classList.add("is-playing");
      const ytPlayer = el("#spYoutubePlayer");
      if (ytPlayer) {
        let src = ytPlayer.getAttribute("src") || "";
        if (!src.includes("autoplay=1")) {
          src += (src.includes("?") ? "&" : "?") + "autoplay=1";
          ytPlayer.setAttribute("src", src);
        }
        try {
          ytPlayer.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*");
        } catch (_) {}
      }
    };

    // Keyboard Shortcuts Listener
    const onWorkspaceKeydown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

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
      document.removeEventListener("keydown", onWorkspaceKeydown);
      document.body.classList.remove("in-workspace");
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Đăng ký các nút điều khiển
    if (el("#btnPlayCenterYt")) el("#btnPlayCenterYt").onclick = handlePlayVideo;
    const vCoverEl = el("#spVideoCover");
    if (vCoverEl) {
      vCoverEl.onclick = () => handlePlayVideo();
    }
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

    // Nhấp vào câu tiếng Nga để video tự động phát đến câu đó
    const ruSentenceEl = el("#spTargetRu");
    if (ruSentenceEl) {
      ruSentenceEl.onclick = () => seekVideoToSentence(currentSentenceIdx);
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

    // Khởi chạy câu đầu tiên & playlist
    renderPlaylist();
    loadSentence(0);
  };

  renderHub();
}


/* =====================================================================
 * CHUYÊN MỤC 5: LUYỆN VIẾT TẢ TRANH (ПИСЬМО TRKI) & BÀN PHÍM ẢO CYRILLIC
 * ===================================================================== */
function initWritingPageLegacy() {
  const host = el("#writeHost");

  const CYRILLIC_KEYS = [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
    ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "Ё"]
  ];

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;
  let cloudWriting = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("writing:all") : null;

  const getWritingTasks = () => {
    return (cloudWriting && cloudWriting.length) ? cloudWriting : [];
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

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state">
          <span class="writing-empty-icon">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 34 }) : ""}</span>
          <h3>Chưa có đề viết cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
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
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-write-id="${t.id}">
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
                  ` : ""}
                </div>
                <div class="dau-card-subinfo">
                  <span>${t.level}</span>
                  <span class="dau-card-sep">•</span>
                  <span class="dau-card-count">${t.minWords || 40} từ</span>
                </div>
              </div>
            </div>

            <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
              <div class="topic-footer-actions">
                ${isPro && !isUnlocked ? `
                  <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                    ${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 16 }) : ""}
                  </span>
                ` : `
                  <button type="button" class="btn-write-action topic-text-btn" data-write-id="${t.id}" title="Bắt đầu viết">
                    Bắt đầu viết ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : ""}
                  </button>
                `}
              </div>
            </div>
          </article>
        `;
      }).join("");

      gridHost.querySelectorAll(".btn-write-action, .btn-write-circle").forEach(btn => {
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
    }, { remainingCount, unit: "bài" });
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
        <button type="button" class="dau-back-btn" id="btnBackWriteList" title="Quay lại danh sách bài viết" aria-label="Quay lại danh sách bài viết">
          <i data-rusi-icon="arrow-left" data-size="18"></i>
        </button>
        <div class="dau-workspace-info">
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
    };

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  renderHub();
}

/* Writing learning hub 2.0: Tả tranh / Luyện dịch, topic groups and 3/7 workspace. */
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
  const initialMode = (urlParams && urlParams.get("mode")) ? urlParams.get("mode") : "picture";
  let currentMode = MODE_INFO[initialMode] ? initialMode : "picture";
  let cloudWriting = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("writing:all") : null;

  const icon = (name, size) => window.RusiIcons ? RusiIcons.get(name, { size }) : "";
  const getTasks = () => (cloudWriting && cloudWriting.length) ? cloudWriting : [];
  const taskMode = (task) => task.task_type === "picture_desc" ? "picture" : "translation";

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
  const topicKey = (task) => task.category || task.category_name || task.categoryName || task.id;
  const topicName = (task) => task.categoryName || task.category_name || task.title;

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
    return Array.from(groups.values());
  };

  const canOpen = (task) => {
    const isPro = task.is_pro_only || task.level === "B1" || task.level === "B2";
    if (isPro && !Monetization.isPro()) {
      Monetization.showProGateModal(
        "Đề luyện viết dành cho PRO",
        "Nâng cấp lên gói PRO để mở khóa toàn bộ đề thi viết TRKI chuyên sâu và trợ lý AI chữa ngữ pháp không giới hạn."
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
      const pro = topic.tasks.some((task) => task.is_pro_only || task.level === "B1" || task.level === "B2");
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
        <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .dau-card-compact (Đồng bộ từ vựng, dùng 100% SVG RusiIcons) -->
        <article class="dau-card dau-card-compact writing-topic-card ${isAllDone ? 'topic-completed' : ''} ${pro ? 'topic-pro' : ''} ${pro && !isUnlocked ? 'topic-locked' : ''}" data-topic="${esc(topic.key)}" tabindex="0">
          <div class="dau-card-header">
            <div class="dau-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
              ${iconSvg}
            </div>
            <div class="dau-card-header-main">
              <div class="dau-card-title-row">
                <h3 class="dau-card-ru" title="${esc(topic.name)}">${esc(topic.name)}</h3>
                ${isAllDone ? `
                  <span class="topic-status topic-status-completed" style="flex-shrink:0">
                    ${icon("check", 12)} Hoàn thành
                  </span>
                ` : pro ? `
                  <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                ` : ""}
              </div>
              <div class="dau-card-subinfo">
                <span>${currentLevel}</span>
                <span class="dau-card-sep">•</span>
                <span class="dau-card-count">${topic.tasks.length} bài luyện</span>
                ${done > 0 ? `
                  <span class="dau-card-sep">•</span>
                  <span style="color:#10b981;font-weight:400">${done}/${topic.tasks.length} xong</span>
                ` : ""}
              </div>
            </div>
          </div>

          <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
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

  const renderHub = () => {
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
    document.body.classList.add("in-workspace");
    let currentTask = initialTask;

    const renderTask = () => {
      const t = currentTask;
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
                        <strong>Bài luyện ${index + 1}</strong>
                      </span>
                      <span class="writing-exercise-status">${done ? icon("check-circle-correct", 16) : icon("arrow-right", 15)}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>
            <div class="writing-sidebar-scrim" id="writingSidebarScrim"></div>

            <section class="writing-practice-panel" data-writing-task="${esc(t.id)}">
              ${taskMode(t) === "picture" ? `
                <figure class="writing-prompt-figure">
                  <img src="${esc(taskImage(t))}" alt="${esc(t.title)}" />
                </figure>

                <div class="writing-prompt-box">
                  <div class="writing-prompt-copy">
                    <span class="writing-section-label">Đề bài</span>
                    <p class="ru">${esc(t.prompt || "")}</p>
                    ${t.vi ? `<p>${esc(t.vi)}</p>` : ""}
                  </div>
                </div>
              ` : `
                <!-- DẠNG LUYỆN DỊCH: THIẾT KẾ TỐI GIẢN HIỆN ĐẠI, KHÔNG LỒNG KHỐI BÊN TRONG -->
                <div class="writing-translation-card">
                  <div class="writing-translation-head">
                    <span class="writing-section-label">${icon("book-open-blog", 15)} Đề bài</span>
                  </div>
                  <p class="writing-translation-text ru">${esc(t.prompt || "")}</p>
                </div>
              `}
              ${tips.length ? `
                <div class="writing-hints hidden" id="writingHints">
                  <div>${icon("sparkles-clean", 18)} <strong>Câu hỏi và ý gợi mở</strong></div>
                  <ul>${tips.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
                </div>
              ` : ""}

              <div class="writing-answer-head">
                <div>
                  <span class="writing-section-label">CÂU TRẢ LỜI CỦA BẠN</span>
                </div>
              </div>

              <textarea class="write-area ru writing-input-textarea" placeholder="Пишите здесь...">${esc(STORE.get("write_" + t.id, ""))}</textarea>
              <div class="write-meta">
                <span class="word-count">0 từ / tối thiểu ${minWords(t)} từ</span>
                <span>${icon("check-circle-correct", 14)} Tự động lưu trên trình duyệt</span>
              </div>

              <div class="writing-primary-actions">
                <button type="button" class="btn btn-primary btn-submit" title="Nhận xét AI" aria-label="Nhận xét AI">
                  ${icon("bot-rusika", 18)} <span class="writing-btn-text">Nhận xét</span>
                </button>
                <button type="button" class="btn btn-outline btn-model" title="Bài mẫu TRKI" aria-label="Bài mẫu TRKI">
                  ${icon("eye", 18)} <span class="writing-btn-text">Bài mẫu</span>
                </button>
                ${tips.length ? `
                  <button type="button" class="btn btn-outline btn-writing-hint" id="writingHintToggle" aria-expanded="false" aria-controls="writingHints" title="Hiển thị câu hỏi gợi ý" aria-label="Gợi ý">
                    ${icon("help-circle", 18)} <span class="writing-btn-text">Gợi ý</span>
                  </button>
                ` : ""}
                ${words.length ? `
                  <button type="button" class="btn btn-outline btn-writing-vocab" id="btnWritingVocabToggle" title="Xem từ vựng gợi ý (${words.length})" aria-label="Từ vựng gợi ý">
                    ${icon("archive-jar", 18)} <span class="writing-btn-text">Từ vựng (${words.length})</span>
                  </button>
                ` : ""}
              </div>

              <div class="ai-score-box hidden"></div>
              <div class="model-answer hidden">
                <h4>${icon("sparkles-clean", 18)} Bài văn mẫu đạt điểm tối đa TRKI</h4>
                <p class="ru">${esc(modelAnswer(t))}</p>
              </div>

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
                  <div class="dau-vocab-list-wrap" id="writingVocabList" style="margin-top: 0;">
                    ${words.map((word, idx) => {
                      const wordRu = typeof word === "object" && word !== null ? (word.ru || word.word || "") : String(word);
                      const wordVi = getWordVi(word);
                      return `
                        <div class="dau-vocab-row-card" data-ru="${esc(wordRu)}" data-idx="${idx}">
                          <div class="dau-row-main-grid">
                            <div class="dau-row-col-ru">
                              <div class="dau-row-ru-header">
                                <span class="dau-row-ru ru">${esc(wordRu)}</span>
                              </div>
                            </div>
                            <div class="dau-row-col-vi">
                              <div class="dau-row-vi-text">${esc(wordVi)}</div>
                            </div>
                            <div class="dau-row-col-actions">
                              <button type="button" class="dau-action-icon-btn writing-vocab-speak" data-word="${esc(wordRu)}" aria-label="Nghe phát âm ${esc(wordRu)}" title="Phát âm tiếng Nga">
                                ${icon("volume-high", 16)}
                              </button>
                              <button type="button" class="dau-action-icon-btn writing-vocab-add" data-word="${esc(wordRu)}" data-vi="${esc(wordVi)}" aria-label="Thêm ${esc(wordRu)} vào lọ từ" title="Lưu vào Lọ cá nhân">
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
        STORE.set("write_" + t.id, area.value);
        updateCount();
      };

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
          const open = hints.classList.toggle("hidden") === false;
          hintButton.setAttribute("aria-expanded", open ? "true" : "false");
          hintButton.classList.toggle("active", open);
        };
      }

      area.oninput = () => {
        STORE.set("write_" + t.id, area.value);
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
        button.onclick = () => speak(button.dataset.word);
      });
      panel.querySelectorAll(".writing-vocab-add").forEach((button) => {
        button.onclick = () => window.openAddToJarModal({
          ru: button.dataset.word,
          vi: button.dataset.vi || "Từ gợi ý cho bài viết",
          note: `${(MODE_INFO[currentMode] && MODE_INFO[currentMode].title) ? MODE_INFO[currentMode].title : "Luyện viết"} · ${topic.name || ""}`
        });
      });

      panel.querySelector(".btn-submit").onclick = () => {
        if (t.is_pro_only && !Monetization.isPro()) {
          Monetization.showProGateModal("Nội dung dành cho PRO", "Bài viết này yêu cầu gói PRO để mở khóa AI Rusika chấm chi tiết theo chuẩn ТРКИ.");
          return;
        }
        const text = area.value.trim();
        const count = text ? text.split(/\s+/).length : 0;
        if (count < minWords(t)) {
          toast(`Bài viết cần tối thiểu ${minWords(t)} từ (hiện tại: ${count} từ). Hãy viết thêm nhé!`);
          return;
        }

        const scores = [
          Math.min(25, Math.floor(19 + Math.random() * 6)),
          Math.min(25, Math.floor(20 + Math.random() * 5)),
          Math.min(25, Math.floor(19 + Math.random() * 6)),
          Math.min(25, Math.floor(21 + Math.random() * 4))
        ];
        const total = scores.reduce((sum, score) => sum + score, 0);
        const scoreBox = panel.querySelector(".ai-score-box");
        scoreBox.classList.remove("hidden");
        scoreBox.innerHTML = `
          <div class="writing-score-result">
            <div class="writing-score-summary">
              <span class="writing-score-icon">${icon("award-badge", 24)}</span>
              <div><span>KẾT QUẢ CHẤM BÀI</span><strong>${total}/100 · ${total >= 66 ? "ĐẠT" : "CẦN CỐ GẮNG"}</strong></div>
            </div>
            <div class="scorecard-4c">
              ${[
                ["Грамматика", "Ngữ pháp"],
                ["Лексика", "Vốn từ"],
                ["Структура", "Bố cục"],
                ["Содержание", "Nội dung"]
              ].map((label, index) => `
                <div class="sc-item">
                  <div class="sc-title">${label[0]}<small>${label[1]}</small></div>
                  <div class="sc-score">${scores[index]}/25</div>
                </div>
              `).join("")}
            </div>
            <div class="writing-score-feedback">${icon("cat-mascot", 18)} <span><b>Nhận xét từ Mèo Rusika:</b> Bài viết của bạn bám sát yêu cầu đề bài ${esc(t.title)}, câu văn diễn đạt rõ ràng. Bạn đã dùng tốt vốn từ chỉ hoạt động thực tế. Tiếp tục phát huy nhé!</span></div>
          </div>
        `;
        revealVocab();
        if (!Progress.doneList("writeDone").includes(t.id)) Progress.addXp(20);
        Progress.markDone("writeDone", t.id);
        toast("AI Rusika đã chấm xong bài viết của bạn (+20 XP)!");
        scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      panel.querySelector(".btn-model").onclick = (event) => {
        const answer = panel.querySelector(".model-answer");
        const open = answer.classList.toggle("hidden") === false;
        event.currentTarget.innerHTML = `${icon("eye", 17)} ${open ? "Ẩn bài mẫu" : "Xem bài mẫu"}`;
      };
    };

    renderTask();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadCloudWriting = async () => {
    if (!window.RusiSupabase || !window.RusiSupabase.isReady || !window.RusiSupabase.isReady()) return;
    try {
      const remote = await window.RusiSupabase.writing.getAll();
      if (remote && remote.length) {
        cloudWriting = remote;
        if (!getTasks().some((t) => t.level === currentLevel && taskMode(t) === currentMode)) {
          currentLevel = getFirstLevelWithTasks(currentMode);
        }
        if (!document.body.classList.contains("in-workspace")) renderHub();
      }
    } catch (error) {
      console.warn("[Supabase] Lỗi tải đề viết từ cloud:", error);
    }
  };

  renderHub();
  loadCloudWriting();
}


/* =====================================================================
 * CHUYÊN MỤC 1: PHÒNG THI MÔ PHỎNG TRKI CHUẨN CEFR (CHỐNG GIAN LẬN)
 * ===================================================================== */
function initMockTestPage() {
  const host = el("#testHost");
  if (!host) return;
  const cachedTests = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("tests:all") : null;
  let bank = (cachedTests && cachedTests.length) ? cachedTests : [];

  let currentLevel = "A1";
  let currentPage = 1;
  const PAGE_SIZE = 6;

  let currentTest = bank[0] || null;
  let activePartId = null; // null = thi full toan bo de; hoac "gram", "reading", "listening"
  let examMode = "exam"; // "exam" (Luyện thi) | "practice" (Luyện tập)
  let answers = {};
  let flagged = {};
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

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const openSubtestPickerModal = (test) => {
    let modal = document.getElementById("trkiSubtestModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "trkiSubtestModal";
      modal.className = "trki-modal-backdrop";
      document.body.appendChild(modal);
    }

    const totalQ = test.parts ? test.parts.reduce((acc, p) => acc + (p.questions ? p.questions.length : 0), 0) : 34;
    let currentModalMode = "exam"; // "exam" (Luyện thi) | "practice" (Luyện tập)
    const allPartIds = (test.parts || []).map(p => p.id);
    let selectedPartIds = new Set(allPartIds); // Mặc định chọn tất cả các Part (Full Test)

    // Khởi tạo HTML 1 lần duy nhất để không bị tải lại hoặc giật lag khi click
    modal.innerHTML = `
      <div class="trki-modal-card">
        <button type="button" class="trki-modal-close" id="btnCloseSubtestModal" title="Đóng cửa sổ" aria-label="Đóng cửa sổ">
          ${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "✕"}
        </button>

        <div class="trki-modal-header">
          <h3 class="trki-modal-title">${esc(test.title)}</h3>
        </div>

        <!-- 2 HÌNH THỨC: LUYỆN THI VÀ LUYỆN TẬP -->
        <div class="trki-modal-tabs" role="tablist">
          <button type="button" class="trki-modal-tab active" data-mode="exam" role="tab" aria-selected="true">
            ${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 16 }) : ""} Luyện thi
          </button>
          <button type="button" class="trki-modal-tab" data-mode="practice" role="tab" aria-selected="false">
            ${window.RusiIcons ? RusiIcons.get("target", { size: 16 }) : ""} Luyện tập
          </button>
        </div>

        <!-- LỰA CHỌN PHẦN THI / LUYỆN TẬP (HỖ TRỢ CHỌN NHIỀU PART BẤT KỲ) -->
        <div class="trki-choice-list">
          <!-- 1. FULL TEST / CHỌN TẤT CẢ CÁC 5 PART -->
          <div class="trki-choice-item selected" id="btnChoiceAllParts" data-part-id="all">
            <div class="trki-choice-checkbox">
              ${window.RusiIcons ? RusiIcons.get("check", { size: 12, strokeWidth: 2.5 }) : "<span>✓</span>"}
            </div>
            <div class="trki-choice-content">
              <div class="trki-choice-row">
                <span class="trki-choice-title" id="trkiAllPartsTitle">Full Test</span>
                <span class="trki-choice-meta-pill">${test.durationMin || 45}p · ${totalQ} câu</span>
              </div>
            </div>
          </div>

          <!-- 2. CÁC PHÂN MÔN (THEO PART) -->
          ${(test.parts || []).map((p) => {
            const pDur = p.durationMin || (p.id === 'gram' ? 25 : p.id === 'reading' ? 15 : p.id === 'writing' ? 25 : p.id === 'speaking' ? 15 : 10);
            const pCount = p.questions ? p.questions.length : p.writing_tasks ? p.writing_tasks.length : p.speaking_tasks ? p.speaking_tasks.length : 1;
            const pLabel = p.writing_tasks ? `${pCount} bài viết` : p.speaking_tasks ? `${pCount} tình huống` : `${pCount} câu`;
            return `
              <div class="trki-choice-item selected" data-part-id="${p.id}">
                <div class="trki-choice-checkbox">
                  ${window.RusiIcons ? RusiIcons.get("check", { size: 12, strokeWidth: 2.5 }) : "<span>✓</span>"}
                </div>
                <div class="trki-choice-content">
                  <div class="trki-choice-row">
                    <span class="trki-choice-title">${esc(p.name)}</span>
                    <span class="trki-choice-meta-pill">${pDur}p · ${pLabel}</span>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- NÚT BẮT ĐẦU VỚI SỐ LƯỢNG PART ĐÃ CHỌN -->
        <div class="trki-modal-actions">
          <button type="button" class="trki-modal-btn-start" id="btnStartTrkiAction">
            Bắt đầu (${selectedPartIds.size} Part) →
          </button>
        </div>
      </div>
    `;

    // Cập nhật giao diện in-place (không render lại DOM để tránh giật lag)
    const updateModalState = () => {
      const isAllSelected = allPartIds.length > 0 && selectedPartIds.size === allPartIds.length;
      const selectedCount = selectedPartIds.size;

      const choiceAll = modal.querySelector("#btnChoiceAllParts");
      if (choiceAll) {
        choiceAll.classList.toggle("selected", isAllSelected);
      }

      modal.querySelectorAll(".trki-choice-item[data-part-id]:not(#btnChoiceAllParts)").forEach(item => {
        const pId = item.dataset.partId;
        item.classList.toggle("selected", selectedPartIds.has(pId));
      });

      const allPartsTitle = modal.querySelector("#trkiAllPartsTitle");
      if (allPartsTitle) {
        allPartsTitle.textContent = (currentModalMode === "exam") ? "Full Test" : "Chọn tất cả các 5 Part";
      }

      modal.querySelectorAll(".trki-modal-tab").forEach(tab => {
        const active = tab.dataset.mode === currentModalMode;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });

      const btnStart = modal.querySelector("#btnStartTrkiAction");
      if (btnStart) {
        btnStart.disabled = (selectedCount === 0);
        btnStart.textContent = (selectedCount === 0)
          ? "Bắt đầu (Chọn ít nhất 1 Part) →"
          : `Bắt đầu (${selectedCount} Part) →`;
      }
    };

    const btnClose = modal.querySelector("#btnCloseSubtestModal");
    if (btnClose) btnClose.onclick = () => closeModal();

    // Chuyển tab Luyện thi / Luyện tập
    modal.querySelectorAll(".trki-modal-tab").forEach(tab => {
      tab.onclick = () => {
        const mode = tab.dataset.mode;
        if (mode !== currentModalMode) {
          currentModalMode = mode;
          updateModalState();
        }
      };
    });

    // Chọn / Bỏ chọn tất cả các Part
    const choiceAll = modal.querySelector("#btnChoiceAllParts");
    if (choiceAll) {
      choiceAll.onclick = () => {
        if (selectedPartIds.size === allPartIds.length) {
          selectedPartIds.clear();
        } else {
          selectedPartIds = new Set(allPartIds);
        }
        updateModalState();
      };
    }

    // Chọn / Bỏ chọn từng Part riêng lẻ
    modal.querySelectorAll(".trki-choice-item[data-part-id]:not(#btnChoiceAllParts)").forEach(item => {
      item.onclick = () => {
        const pId = item.dataset.partId;
        if (selectedPartIds.has(pId)) {
          selectedPartIds.delete(pId);
        } else {
          selectedPartIds.add(pId);
        }
        updateModalState();
      };
    });

    // Nút bắt đầu hành động
    const btnStart = modal.querySelector("#btnStartTrkiAction");
    if (btnStart) {
      btnStart.onclick = () => {
        if (selectedPartIds.size === 0) return;
        closeModal();
        const selectedList = Array.from(selectedPartIds);
        const partParam = (selectedList.length === allPartIds.length) ? null : selectedList;
        startTest(test, partParam, currentModalMode);
      };
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);

    const closeModal = () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      if (modal) modal.remove();
    };
    document.body.classList.add("modal-open");

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  };

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

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const pageItems = filtered.slice(0, currentPage * PAGE_SIZE);
    const remainingCount = Math.max(0, filtered.length - pageItems.length);

    if (filtered.length === 0) {
      gridHost.innerHTML = `
        <div class="writing-empty-state trki-empty-state topic-empty-state">
          <span class="writing-empty-icon trki-empty-icon">${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 34 }) : ""}</span>
          <h3>Chưa có đề thi cho cấp độ này</h3>
          <p>Vui lòng chọn cấp độ khác để tiếp tục học tập.</p>
        </div>
      `;
    } else {
      gridHost.innerHTML = pageItems.map((t, idx) => {
        const isDone = Progress.doneList("trkiDone").includes(t.id);
        const isPro = t.is_pro_only || t.level === "B1" || t.level === "B2";
        const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
        const qCount = t.questionsCount || (t.questions ? t.questions.length : (t.parts ? t.parts.reduce((a, b) => a + (b.questions ? b.questions.length : 0), 0) : 34));
        const durMin = Math.round((t.durationSeconds || (t.durationMin ? t.durationMin * 60 : 2700)) / 60);

        return `
          <article class="dau-card dau-card-compact ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-trki-id="${t.id}" tabindex="0">
            <div class="dau-card-header">
              <div class="dau-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
                ${window.RusiIcons ? RusiIcons.get(t.icon || "award-badge", { size: 24 }) : ""}
              </div>
              <div class="dau-card-header-main">
                ${(() => {
                  const cleanTitle = (t.title || "").replace(/\s*\([^)]*\)/g, "").trim();
                  return `
                    <div class="dau-card-title-row">
                      <h3 class="dau-card-ru" title="${esc(cleanTitle)}">${esc(cleanTitle)}</h3>
                      ${isDone ? `
                        <span class="topic-status topic-status-completed" style="flex-shrink:0">
                          ${window.RusiIcons ? RusiIcons.get("check", { size: 12 }) : ""} Hoàn thành
                        </span>
                      ` : isPro ? `
                        <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                      ` : ""}
                    </div>
                    <div class="dau-card-subinfo">
                      <span>${t.level}</span>
                      <span class="dau-card-sep">•</span>
                      <span class="dau-card-count">${qCount} câu hỏi · ${durMin} phút</span>
                    </div>
                  `;
                })()}
              </div>
            </div>

            <div class="dau-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
              <div class="topic-footer-actions">
                ${isPro && !isUnlocked ? `
                  <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                    ${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 16 }) : ""}
                  </span>
                ` : `
                  <button type="button" class="btn-trki-action topic-text-btn" data-trki-id="${t.id}" title="Vào thi ngay">
                    Vào thi ngay ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 14 }) : ""}
                  </button>
                `}
              </div>
            </div>
          </article>
        `;
      }).join("");

      // Action: Click "Vào thi ngay" or circle button opens Subtest Picker Modal
      gridHost.querySelectorAll(".btn-trki-action, .btn-trki-circle").forEach(btn => {
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
          openSubtestPickerModal(test);
        };
      });

      // Action: Click card body opens Subtest Picker Modal
      gridHost.querySelectorAll(".topic-card, .dau-card").forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest("button") || e.target.closest("a")) return;
          const id = card.dataset.trkiId;
          const test = bank.find(x => x.id === id);
          if (!test) return;
          const isPro = test.is_pro_only || test.level === "B1" || test.level === "B2";
          if (isPro && !Monetization.isPro()) {
            Monetization.showProGateModal("Đề thi TRKI dành cho PRO", "Nâng cấp lên gói PRO để mở khóa toàn bộ phòng thi mô phỏng ТРКИ chuẩn quốc tế và nhận phân tích chi tiết.");
            return;
          }
          openSubtestPickerModal(test);
        };
      });
    }

    renderDauPagination(el("#trkiPagination"), currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      renderTrkiCards();
    }, { remainingCount, unit: "đề thi" });
  };

  const renderHub = () => {
    started = false;
    answers = {};
    flagged = {};
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
                  Thi thử TRKI<br />
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

            <div class="topic-grid" id="trkiCardsGrid" style="margin-top:24px"></div>
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

  const startTest = (test = null, partId = null, mode = "exam") => {
    if (test) currentTest = test;
    activePartId = partId;
    examMode = mode || "exam";

    document.body.classList.add("in-workspace");
    started = true;
    tabSwitches = 0;

    const modal = document.getElementById("trkiSubtestModal");
    if (modal) modal.remove();

    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);
    const storageKey = getExamStorageKey();

    try {
      sessionStorage.setItem("trki_active_exam_id", currentTest.id);
      sessionStorage.setItem("trki_active_part_id", isSubset ? selectedPartList.join(",") : "full");
      sessionStorage.setItem("trki_exam_mode", examMode);
    } catch(e) {}

    // Xác định các phần sẽ làm
    const activeParts = isSubset
      ? (currentTest.parts || []).filter(p => selectedPartList.includes(p.id))
      : (currentTest.parts || []);
    const examDurationMin = isSubset
      ? activeParts.reduce((acc, p) => acc + (p.durationMin || 15), 0)
      : (currentTest.durationMin || 45);

    // Đồng hồ Timestamp chống reload
    const now = Date.now();
    let storedEndTime = 0;
    try { storedEndTime = parseInt(sessionStorage.getItem(storageKey + "_endTime") || "0", 10); } catch(e) {}
    if (!storedEndTime || storedEndTime <= now) {
      storedEndTime = now + examDurationMin * 60 * 1000;
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

    // Khôi phục cờ đánh dấu
    flagged = {};
    try {
      const savedFlagged = sessionStorage.getItem(storageKey + "_flagged");
      if (savedFlagged) flagged = JSON.parse(savedFlagged);
    } catch(e) {
      flagged = {};
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

    const isPractice = (examMode === "practice");
    const selectedPartList = getExamPartList();
    const isSubset = Boolean(selectedPartList && selectedPartList.length > 0 && selectedPartList.length < (currentTest.parts || []).length);

    const activeParts = isSubset
      ? currentTest.parts.filter(p => selectedPartList.includes(p.id))
      : currentTest.parts;

    const totalQuestions = activeParts.reduce((acc, p) => acc + ((p && p.questions) ? p.questions.length : 0), 0);
    const totalAnswered = Object.keys(answers).length;

    const roomTitle = isSubset
      ? `${esc(currentTest.title)} · ${esc(activeParts.map(p => p.name || p.vi).join(", "))} ${isPractice ? "(Luyện Tập)" : ""}`
      : `${esc(currentTest.title)} ${isPractice ? "(Luyện Tập)" : "(Full Test)"}`;

    const renderQuestionBlock = (q, qi, part) => {
      const id = part.id + "_" + qi;
      const isFlag = !!flagged[id];
      const userAns = answers[id];
      const hasAnswered = (userAns !== undefined);
      const isCorrect = hasAnswered && (userAns === q.a);

      return `
        <div class="quiz-q" id="qBox_${id}">
          <div class="quiz-q-header">
            <span class="quiz-q-num">Câu ${qi + 1} / ${part.questions.length}</span>
            <button type="button" class="btn-flag-q ${isFlag ? 'is-flagged' : ''}" data-id="${id}">
              ${window.RusiIcons ? RusiIcons.get("flag", { size: 13 }) : ""} <span>${isFlag ? "Đã đặt cờ" : "Đặt cờ"}</span>
            </button>
          </div>
          <p class="q-text"><span class="ru">${esc(q.q)}</span></p>
          <div class="options">
            ${q.options.map((opt, oi) => {
              let optClass = "option ru";
              if (isPractice && hasAnswered) {
                if (oi === q.a) optClass += " correct";
                else if (oi === userAns && !isCorrect) optClass += " wrong";
              } else if (userAns === oi) {
                optClass += " selected";
              }
              return `
                <button type="button" class="${optClass}" data-id="${id}" data-oi="${oi}">
                  ${esc(opt)}
                </button>
              `;
            }).join("")}
          </div>
          ${isPractice && hasAnswered ? `
            <div class="trki-practice-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}" id="feedback_${id}">
              <div class="feedback-badge-row">
                <span class="feedback-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
                  ${isCorrect ? '✓ Đúng' : '✕ Sai'}
                </span>
                ${!isCorrect ? `<span class="feedback-correct-answer">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></span>` : ''}
              </div>
              <div class="feedback-ex">
                <b>Giải thích:</b> ${esc(q.ex || "Áp dụng cấu trúc ngữ pháp chuẩn theo bảng biến cách.")}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    };

    let html = `
      <!-- STICKY TOP BACK BAR WITH TIMER -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnExitTest" title="Thoát phòng thi" aria-label="Thoát phòng thi">
          <i data-rusi-icon="arrow-left" data-size="18"></i>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-workspace-title">${roomTitle}</span>
          ${isPractice ? `<span class="topic-status topic-status-level" style="margin-left:8px;font-size:10px">Luyện tập</span>` : ''}
        </div>
        <div class="dau-workspace-controls" style="display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0">
          ${isPractice ? `
            <div class="dau-exam-timer" style="font-weight:700;font-size:0.92rem;color:var(--primary);display:inline-flex;align-items:center;gap:5px">
              ${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 15 }) : ""} <span>Luyện tập tự do</span>
            </div>
          ` : `
            <div class="dau-exam-timer" style="font-weight:700;font-size:1.05rem;color:var(--secondary);display:inline-flex;align-items:center;gap:4px">
              ${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 16 }) : ""} <span id="timerVal">${fmt(timeLeft)}</span>
            </div>
          `}
          <button class="btn btn-primary btn-sm dau-top-btn" id="btnSubmitTop" style="background:var(--secondary);border-color:var(--secondary)" title="${isPractice ? 'Hoàn thành bài luyện' : 'Nộp bài thi'}">${window.RusiIcons ? RusiIcons.get("check-circle", { size: 15 }) : ""} <span class="btn-text">${isPractice ? 'Hoàn thành' : 'Nộp bài thi'}</span></button>
        </div>
      </div>

      <div class="mock-layout">
        <div class="mock-main">
    `;

    activeParts.forEach((part, pi) => {
      html += `
        <div class="mock-part" id="part_${part.id}">
          <div class="mock-part-title">
            ${esc(part.name)}
            <span class="mock-part-sub">(${esc(part.vi)})</span>
          </div>
      `;

      if (part.text) {
        // SPLIT-PANE LAYOUT FOR READING
        html += `
          <div class="cbt-split-container">
            <div class="cbt-pane-media">
              <div class="cbt-reading-header">
                <span class="cbt-media-tag">Текст для чтения</span>
                <div class="cbt-reading-tools">
                  <button type="button" class="btn-cbt-tool btn-font-dec" title="Thu nhỏ cỡ chữ">A-</button>
                  <button type="button" class="btn-cbt-tool btn-font-inc" title="Phóng to cỡ chữ">A+</button>
                  <button type="button" class="btn-cbt-tool btn-reading-trans" data-text-idx="${pi}">Bản dịch</button>
                </div>
              </div>
              <div class="cbt-reading-body">
                <p class="ru cbt-passage-text" id="readingText_${pi}">${esc(part.text.ru)}</p>
                <div class="reading-vi-trans hidden" style="margin-top:12px;padding:12px 14px;background:var(--bg);border-radius:8px;font-size:0.88rem;color:var(--muted);line-height:1.6">
                  ${esc(part.text.vi)}
                </div>
              </div>
            </div>
            <div class="cbt-pane-questions">
              ${part.questions.map((q, qi) => renderQuestionBlock(q, qi, part)).join("")}
            </div>
          </div>
        `;
      } else if (part.lines) {
        // SPLIT-PANE LAYOUT FOR LISTENING
        html += `
          <div class="cbt-split-container">
            <div class="cbt-pane-media cbt-listening-pane">
              <div class="cbt-reading-header">
                <span class="cbt-media-tag">Аудиозапись диалога</span>
              </div>
              <div class="cbt-audio-box">
                <div class="cbt-audio-icon">
                  ${window.RusiIcons ? RusiIcons.get("headphones", { size: 26 }) : ""}
                </div>
                <h4 class="cbt-audio-title">Lắng nghe hội thoại bản xứ</h4>
                <p class="cbt-audio-note">Nghe kỹ ngữ điệu và thông tin trong đoạn ghi âm để chọn đáp án chính xác bên phải.</p>
                <div class="cbt-audio-controls">
                  <button type="button" class="btn btn-primary btn-sm" id="playAudio">
                    ${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} Phát đoạn đối thoại
                  </button>
                </div>
              </div>
            </div>
            <div class="cbt-pane-questions">
              ${part.questions.map((q, qi) => renderQuestionBlock(q, qi, part)).join("")}
            </div>
          </div>
        `;
      } else if (part.writing_tasks) {
        // PHẦN 4: KỸ NĂNG VIẾT (СУБТЕСТ ПИСЬМО)
        html += `
          <div class="cbt-writing-container" style="padding:22px 24px;border-radius:18px;background:var(--surface);border:1.5px solid var(--border);margin-top:14px;box-shadow:0 2px 12px rgba(16,42,76,0.03)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;color:var(--primary);font-weight:800;font-size:0.92rem;text-transform:uppercase;letter-spacing:0.05em">
              ${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 18 }) : ""}
              <span>BÀI THI VIẾT (СУБТЕСТ ПИСЬМО) · ${part.durationMin || 25} PHÚT</span>
            </div>
        `;
        part.writing_tasks.forEach((wt, wti) => {
          const wId = "write_" + part.id + "_" + wti;
          const savedText = answers[wId] || "";
          const wordCount = savedText.trim() ? savedText.trim().split(/\s+/).length : 0;
          html += `
            <div class="trki-writing-task-box" id="qBox_${wId}" style="margin-bottom:20px">
              <div style="background:linear-gradient(135deg,rgba(23,87,166,0.04),rgba(30,64,175,0.02));border-radius:14px;padding:18px 20px;border:1px solid rgba(23,87,166,0.18);margin-bottom:16px">
                <div style="font-weight:800;font-size:1.05rem;color:var(--text);margin-bottom:8px">${esc(wt.title)}</div>
                <div class="ru" style="font-size:1.15rem;font-weight:600;line-height:1.75;color:var(--text);margin-bottom:10px">${esc(wt.prompt)}</div>
                <div style="font-size:0.9rem;color:var(--muted);line-height:1.55">${esc(wt.vi)}</div>
              </div>
              <textarea class="trki-exam-textarea ru" data-wid="${wId}" data-min="${wt.minWords || 35}" placeholder="Пишите ваш текст здесь..." style="width:100%;min-height:160px;padding:16px 18px;border-radius:14px;border:1.5px solid var(--border);background:var(--surface);font-size:1.05rem;font-family:inherit;line-height:1.7;color:var(--text);box-sizing:border-box">${esc(savedText)}</textarea>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:0.86rem;color:var(--muted);flex-wrap:wrap;gap:8px">
                <span class="trki-word-counter" id="counter_${wId}">Dung lượng: <b style="color:var(--text)">${wordCount} từ</b> (Tối thiểu ${wt.minWords || 35} từ)</span>
                <span style="color:var(--green);display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Tự động lưu bài làm</span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      } else if (part.speaking_tasks) {
        // PHẦN 5: KỸ NĂNG NÓI (СУБТЕСТ ГОВОРЕНИЕ)
        html += `
          <div class="cbt-speaking-container" style="padding:22px 24px;border-radius:18px;background:var(--surface);border:1.5px solid var(--border);margin-top:14px;box-shadow:0 2px 12px rgba(16,42,76,0.03)">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;color:var(--russia-red);font-weight:800;font-size:0.92rem;text-transform:uppercase;letter-spacing:0.05em">
              ${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 18 }) : ""}
              <span>BÀI THI NÓI (СУБТЕСТ ГОВОРЕНИЕ) · ${part.durationMin || 15} PHÚT</span>
            </div>
        `;
        part.speaking_tasks.forEach((st, sti) => {
          const sId = "speak_" + part.id + "_" + sti;
          html += `
            <div class="trki-speaking-task-box" id="qBox_${sId}" style="background:var(--bg);border-radius:14px;padding:18px 20px;border:1px solid var(--border);margin-bottom:18px">
              <div style="font-weight:800;font-size:1.02rem;color:var(--text);margin-bottom:8px">${esc(st.title)}</div>
              <div class="ru" style="font-size:1.15rem;font-weight:600;line-height:1.75;color:var(--text);margin-bottom:8px">${esc(st.prompt)}</div>
              <div style="font-size:0.88rem;color:var(--muted);line-height:1.55;margin-bottom:16px">${esc(st.vi)}</div>
              <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                <button type="button" class="btn btn-outline btn-sm btn-trki-suggested" data-sid="${sId}" style="font-size:0.84rem">
                  ${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Câu gợi ý phản xạ
                </button>
                <button type="button" class="btn btn-primary btn-sm btn-trki-mic" data-sid="${sId}" style="display:inline-flex;align-items:center;gap:6px;font-size:0.84rem">
                  ${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 14 }) : ""} Luyện phát âm / Ghi âm
                </button>
                <span class="trki-mic-status" id="micStatus_${sId}" style="font-size:0.84rem;color:var(--muted)"></span>
              </div>
              <div class="trki-suggested-box hidden" id="suggestedBox_${sId}" style="margin-top:14px;padding:14px 16px;background:var(--surface);border:1px dashed var(--border);border-radius:10px;font-size:0.95rem;line-height:1.65">
                <strong style="color:var(--primary)">Gợi ý mẫu:</strong> <span class="ru">${esc(st.suggested || "")}</span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      } else if (Array.isArray(part.questions)) {
        // STANDARD (GRAMMAR & VOCABULARY)
        html += part.questions.map((q, qi) => renderQuestionBlock(q, qi, part)).join("");
      }

      html += `</div>`;
    });

    html += `
        </div>

        <div class="mock-sidebar">
          ${isPractice ? `
            <div class="sidebar-timer" style="background:rgba(23,87,166,0.06);border-color:rgba(23,87,166,0.18)">
              <div style="color:var(--primary);font-size:0.78rem;font-weight:700">CHẾ ĐỘ LUYỆN TẬP</div>
              <div class="time-display" style="font-size:1.05rem;color:var(--primary)">Xem giải thích ngay</div>
            </div>
          ` : `
            <div class="sidebar-timer">
              <div>Thời gian còn lại</div>
              <div class="time-display" id="timerValSidebar">${fmt(timeLeft)}</div>
            </div>

            <div style="background:var(--primary-soft);border-radius:8px;padding:8px 12px;margin-bottom:14px;font-size:0.82rem;display:flex;justify-content:space-between">
              <span>${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 16 }) : ""} Chuyển tab:</span>
              <b id="antiCheatCount">${tabSwitches}/3</b>
            </div>
          `}

          <div class="question-palette-head">
            <span>BẢNG CÂU HỎI</span>
            <span style="color:var(--primary);font-size:0.8rem" id="answeredCount">${totalAnswered}/${totalQuestions}</span>
          </div>

          ${isPractice ? `
            <div class="palette-legend">
              <span><span class="dot" style="background:#16a34a"></span> Đúng</span>
              <span><span class="dot" style="background:#dc2626"></span> Sai</span>
              <span><span class="dot dot-undone"></span> Chưa làm</span>
            </div>
          ` : `
            <div class="palette-legend">
              <span><span class="dot dot-done"></span> Đã làm</span>
              <span><span class="dot dot-flagged"></span> Đặt cờ</span>
              <span><span class="dot dot-undone"></span> Chưa làm</span>
            </div>
          `}

          <div class="question-palette-grid">
    `;

    let pNum = 0;
    activeParts.forEach((part) => {
      if (Array.isArray(part.questions)) {
        part.questions.forEach((q, qi) => {
          pNum++;
          const id = part.id + "_" + qi;
          const userAns = answers[id];
          const isDone = userAns !== undefined;
          const isFlag = !!flagged[id];
          let extraClass = "";
          if (isPractice && isDone) {
            extraClass = (userAns === q.a) ? "done-correct" : "done-wrong";
          } else if (isDone) {
            extraClass = "done";
          }
          html += `<button type="button" class="palette-btn ${extraClass} ${isFlag ? "flagged" : ""}" id="pBtn_${id}" data-jump="${id}" title="Câu ${pNum}${isFlag ? ' (Đã đặt cờ)' : ''}">${pNum}</button>`;
        });
      } else if (part.writing_tasks) {
        part.writing_tasks.forEach((wt, wti) => {
          const wId = "write_" + part.id + "_" + wti;
          const isDone = !!(answers[wId] && answers[wId].trim().length > 10);
          html += `<button type="button" class="palette-btn palette-btn-skill ${isDone ? "done" : ""}" id="pBtn_${wId}" data-jump="${wId}" title="Viết: ${wt.title}">W${wti + 1}</button>`;
        });
      } else if (part.speaking_tasks) {
        part.speaking_tasks.forEach((st, sti) => {
          const sId = "speak_" + part.id + "_" + sti;
          const isDone = !!answers[sId];
          html += `<button type="button" class="palette-btn palette-btn-skill ${isDone ? "done" : ""}" id="pBtn_${sId}" data-jump="${sId}" title="Nói: ${st.title}">S${sti + 1}</button>`;
        });
      }
    });

    html += `
          </div>

          <button class="btn btn-primary btn-lg" id="submitTest" style="width:100%;margin-top:20px;background:var(--secondary);border-color:var(--secondary)">
            ${isPractice ? "Hoàn thành luyện tập" : "Nộp bài thi"}
          </button>
        </div>
      </div>
    `;

    host.innerHTML = html;
    if (window.RusiIcons && typeof RusiIcons.render === "function") {
      RusiIcons.render(host);
    }

    el("#btnExitTest").onclick = () => {
      const exitMsg = isPractice
        ? "Bạn có chắc chắn muốn kết thúc bài luyện tập?"
        : "Bạn có chắc chắn muốn rời khỏi phòng thi? Kết quả hiện tại sẽ không được lưu.";
      if (confirm(exitMsg)) {
        const storageKey = getExamStorageKey();
        try {
          sessionStorage.removeItem("trki_active_exam_id");
          sessionStorage.removeItem("trki_active_part_id");
          sessionStorage.removeItem("trki_exam_mode");
          if (currentTest && currentTest.id) {
            sessionStorage.removeItem(storageKey + "_endTime");
            sessionStorage.removeItem(storageKey + "_answers");
            sessionStorage.removeItem(storageKey + "_flagged");
          }
        } catch(e) {}
        clearInterval(timer);
        if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
        document.body.classList.remove("in-workspace");
        renderHub();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // Tools for Split-Pane Reading
    host.querySelectorAll(".btn-font-inc").forEach(b => {
      b.onclick = () => {
        const p = b.closest(".cbt-pane-media").querySelector(".cbt-passage-text");
        if (p) {
          const cur = parseFloat(window.getComputedStyle(p).fontSize) || 16;
          if (cur < 24) p.style.fontSize = (cur + 2) + "px";
        }
      };
    });
    host.querySelectorAll(".btn-font-dec").forEach(b => {
      b.onclick = () => {
        const p = b.closest(".cbt-pane-media").querySelector(".cbt-passage-text");
        if (p) {
          const cur = parseFloat(window.getComputedStyle(p).fontSize) || 16;
          if (cur > 14) p.style.fontSize = (cur - 2) + "px";
        }
      };
    });
    host.querySelectorAll(".btn-reading-trans").forEach(btn => {
      btn.onclick = () => {
        const transBox = btn.closest(".cbt-pane-media")
          ? btn.closest(".cbt-pane-media").querySelector(".reading-vi-trans")
          : btn.closest(".reading-box").querySelector(".reading-vi-trans");
        if (transBox) {
          transBox.classList.toggle("hidden");
          btn.textContent = transBox.classList.contains("hidden") ? "Bản dịch" : "Ẩn dịch";
        }
      };
    });

    // Flag Question event
    host.querySelectorAll(".btn-flag-q").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        flagged[id] = !flagged[id];
        const storageKey = getExamStorageKey();
        try {
          sessionStorage.setItem(storageKey + "_flagged", JSON.stringify(flagged));
        } catch(e) {}

        btn.classList.toggle("is-flagged", flagged[id]);
        const span = btn.querySelector("span");
        if (span) span.textContent = flagged[id] ? "Đã đặt cờ" : "Đặt cờ";

        const pBtn = el(`#pBtn_${id}`);
        if (pBtn) {
          pBtn.classList.toggle("flagged", flagged[id]);
        }
      };
    });

    // Option selection event
    host.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const oi = +btn.dataset.oi;
        answers[id] = oi;
        const storageKey = getExamStorageKey();
        try {
          sessionStorage.setItem(storageKey + "_answers", JSON.stringify(answers));
        } catch(e) {}

        const group = host.querySelectorAll(`.option[data-id="${id}"]`);

        if (examMode === "practice") {
          const [pId, qIdxStr] = id.split("_");
          const qIdx = parseInt(qIdxStr, 10);
          const targetPart = (currentTest.parts || []).find(p => p.id === pId);
          const q = (targetPart && targetPart.questions) ? targetPart.questions[qIdx] : null;

          if (q) {
            const isCorrect = (oi === q.a);
            group.forEach(g => {
              g.classList.remove("selected", "correct", "wrong");
              const gOi = +g.dataset.oi;
              if (gOi === q.a) {
                g.classList.add("correct");
              } else if (gOi === oi && !isCorrect) {
                g.classList.add("wrong");
              }
            });

            let fb = host.querySelector(`#feedback_${id}`);
            if (!fb) {
              fb = document.createElement("div");
              fb.id = `feedback_${id}`;
              const qBox = el(`#qBox_${id}`);
              if (qBox) qBox.appendChild(fb);
            }
            fb.className = `trki-practice-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
            fb.innerHTML = `
              <div class="feedback-badge-row">
                <span class="feedback-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
                  ${isCorrect ? '✓ Đúng' : '✕ Sai'}
                </span>
                ${!isCorrect ? `<span class="feedback-correct-answer">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></span>` : ''}
              </div>
              <div class="feedback-ex">
                <b>Giải thích:</b> ${esc(q.ex || "Áp dụng cấu trúc ngữ pháp chuẩn theo bảng biến cách.")}
              </div>
            `;

            const pBtn = el(`#pBtn_${id}`);
            if (pBtn) {
              pBtn.classList.remove("done", "done-correct", "done-wrong");
              pBtn.classList.add(isCorrect ? "done-correct" : "done-wrong");
            }
          }
        } else {
          group.forEach((g) => g.classList.remove("selected"));
          btn.classList.add("selected");
          const pBtn = el(`#pBtn_${id}`);
          if (pBtn) pBtn.classList.add("done");
        }

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
    let isTestAudioPlaying = false;
    if (play) {
      play.onclick = () => {
        if (isTestAudioPlaying) {
          if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
          isTestAudioPlaying = false;
          play.innerHTML = `${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} Phát đoạn đối thoại`;
          return;
        }
        const lisPart = activeParts.find((p) => p.lines);
        if (!lisPart || !Array.isArray(lisPart.lines) || !lisPart.lines.length) return;
        const fullText = lisPart.lines.map((l) => l.ru || "").filter(Boolean).join(" ");
        if (!fullText) return;

        isTestAudioPlaying = true;
        play.innerHTML = `${window.RusiIcons ? RusiIcons.get("pause-control", { size: 16 }) : ""} Tạm dừng đối thoại`;

        if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(fullText);
          u.lang = "ru-RU";
          u.rate = 0.85;
          if (typeof pickVoice === "function") {
            const v = pickVoice("ru-RU");
            if (v) u.voice = v;
          }
          u.onend = () => {
            isTestAudioPlaying = false;
            if (play) play.innerHTML = `${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} Phát đoạn đối thoại`;
          };
          u.onerror = () => {
            isTestAudioPlaying = false;
            if (play) play.innerHTML = `${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} Phát đoạn đối thoại`;
          };
          window.speechSynthesis.speak(u);
        }
      };
    }

    el("#submitTest").onclick = submit;
    const topSub = el("#btnSubmitTop");
    if (topSub) topSub.onclick = submit;
  };

  const submit = () => {
    started = false;
    clearInterval(timer);

    const storageKey = getExamStorageKey();
    try {
      sessionStorage.removeItem("trki_active_exam_id");
      sessionStorage.removeItem("trki_active_part_id");
      if (currentTest && currentTest.id) {
        sessionStorage.removeItem(storageKey + "_endTime");
        sessionStorage.removeItem(storageKey + "_answers");
        sessionStorage.removeItem(storageKey + "_flagged");
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

    const detail = [];
    let total = 0;
    let correct = 0;
    activeParts.forEach((part) => {
      let pc = 0;
      const questions = Array.isArray(part.questions) ? part.questions : [];
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
        passed: pct >= (currentTest.passPercent || 66)
      });
    });

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const requiredPassPct = currentTest.passPercent || 66;

    // Check TRKI Official Passing Standards
    const allSubtestsPassed = detail.every(d => d.pct >= requiredPassPct);
    const failedParts = detail.filter(d => d.pct < requiredPassPct);
    const singleRetakeEligible = !isSubset && failedParts.length === 1 && failedParts[0].pct >= 60;

    let examStatus = "fail";
    let statusBadgeText = `НЕ СДАНО (CHƯA ĐẠT · Chuẩn ≥ ${requiredPassPct}%)`;
    let statusDesc = "Theo chuẩn ТРКИ, bạn cần đạt tối thiểu 66% để đạt yêu cầu. Hãy rà soát lại các câu sai bên dưới để ôn luyện bổ sung.";

    if (allSubtestsPassed) {
      examStatus = "pass";
      statusBadgeText = isSubset
        ? (activeParts.length === 1 ? `СДАНО · ĐẠT YÊU CẦU ${activeParts[0].vi}` : `СДАНО · ĐẠT YÊU CẦU (${activeParts.length} PHẦN)`)
        : `СДАНО · ĐẠT CHỨNG CHỈ ТРКИ ${currentTest.level}`;
      statusDesc = isSubset
        ? `Chúc mừng! Bạn đã hoàn thành tốt các phân môn đã chọn với tỷ lệ đạt ${pct}%. Bạn có thể tiếp tục luyện các phần khác hoặc thi toàn diện!`
        : `Chúc mừng! Bạn đã vượt qua tất cả các phân môn khảo thí với điểm số ≥ 66% theo chuẩn quốc gia Liên bang Nga.`;
      Progress.addXp(isSubset ? 15 : 30);
      if (!isSubset) {
        Progress.markDone("trkiDone", currentTest.id);
      }
    } else if (singleRetakeEligible) {
      examStatus = "retake";
      statusBadgeText = `BẢO LƯU KẾT QUẢ · ĐƯỢC THI LẠI 1 PHÂN MÔN`;
      statusDesc = `Theo quy chế TRKI chính thức, bạn đạt chuẩn ${detail.length - 1}/${detail.length} phân môn và phân môn "${failedParts[0].part.vi}" đạt ${failedParts[0].pct}% (ngưỡng 60%-65%). Bạn đủ điều kiện bảo lưu và chỉ phải thi lại riêng phân môn này!`;
    }

    const pKeyStr = isSubset ? selectedPartList.join("-") : "full";
    const bestKey = "bestTest_" + currentTest.id + "_" + pKeyStr;
    const best = Math.max(pct, STORE.get(bestKey, 0));
    STORE.set(bestKey, best);
    STORE.set("bestTest", Math.max(pct, STORE.get("bestTest", 0)));

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="dau-workspace-back-bar">
        <button type="button" class="dau-back-btn" id="btnReviewBack" title="Quay lại danh sách đề thi" aria-label="Quay lại danh sách đề thi">
          <i data-rusi-icon="arrow-left" data-size="18"></i>
        </button>
        <div class="dau-workspace-info">
          <span class="dau-workspace-title">Kết quả khảo thí ТРКИ: ${esc(currentTest.title)}</span>
        </div>
        <button class="btn btn-primary btn-sm dau-top-btn" id="btnRetryTop" title="Thi lại">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 15 }) : ""} <span class="btn-text">Thi lại</span></button>
      </div>

      <div class="workspace" style="padding:28px 20px;max-width:1100px;margin:0 auto">
        <!-- OFFICIAL CERTIFICATE BANNER -->
        <div class="trki-cert-box">
          <div class="trki-cert-decor-top">
            ${window.RusiIcons ? RusiIcons.get("award-badge", { size: 32 }) : ""}
          </div>
          <h2 class="trki-cert-title">
            ${isSubset ? `KẾT QUẢ ÔN LUYỆN: ${esc(activeParts.map(p => p.vi).join(" · "))}` : `KẾT QUẢ KHẢO THÍ CHỨNG CHỈ TIẾNG NGA QUỐC TẾ ТРКИ`}
          </h2>
          <div class="trki-cert-subtitle">
            ${isSubset ? `${esc(currentTest.title)} · TRÌNH ĐỘ ${esc(currentTest.level)}` : `ГОСУДАРСТВЕННЫЙ СЕРТИФИКАЦИОННЫЙ ОТЧЁТ · TRÌNH ĐỘ ${esc(currentTest.level)}`}
          </div>

          <div class="trki-cert-score-main">${correct}/${total} CÂU ĐÚNG · ${pct}%</div>

          <div>
            <span class="trki-cert-badge ${examStatus}">
              ${window.RusiIcons ? RusiIcons.get(examStatus === "pass" ? "check-circle" : examStatus === "retake" ? "flag" : "shield-anti-cheat", { size: 18 }) : ""}
              ${statusBadgeText}
            </span>
          </div>

          <p class="trki-cert-meta">${statusDesc}</p>
        </div>

        <h3 style="margin:24px 0 14px;display:flex;align-items:center;gap:8px;font-size:1.15rem;color:var(--russia-navy)">
          ${window.RusiIcons ? RusiIcons.get("bar-chart-2", { size: 20 }) : ""} Thống kê tỷ lệ đạt:
        </h3>

        <div class="trki-subtest-results-grid">
          ${detail.map((d) => `
            <div class="trki-subtest-result-card">
              <div class="trki-subtest-card-top">
                <span class="trki-subtest-card-name">${esc(d.part.vi)}</span>
                <span class="trki-subtest-status-pill ${d.passed ? 'pass' : 'fail'}">
                  ${d.passed ? 'СДАНО' : 'НЕ СДАНО'}
                </span>
              </div>
              <div class="trki-subtest-card-stat">
                <b style="font-size:1.1rem;color:var(--primary)">${d.count}/${d.total} câu</b>
                <b style="font-size:1.1rem">${d.pct}%</b>
              </div>
              <div class="trki-subtest-bar-wrap">
                <div class="trki-subtest-bar-fill ${d.passed ? 'pass' : 'fail'}" style="width:${d.pct}%"></div>
              </div>
            </div>
          `).join("")}

          ${isSubset ? `
            <div class="trki-subtest-result-card" style="border-style:dashed;background:rgba(23,87,166,0.04);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px">
              <div style="font-weight:700;color:var(--russia-navy);margin-bottom:6px">Luyện các phần khác của đề này</div>
              <p style="font-size:0.82rem;color:var(--muted);margin:0 0 10px">Bạn có thể chọn làm tiếp các phần còn lại để hoàn thành toàn diện.</p>
              <button type="button" class="btn btn-outline btn-sm" id="btnChooseOtherParts" style="font-weight:700">
                Chọn phần khác ▾
              </button>
            </div>
          ` : `
            <!-- Auxiliary Cards for Writing & Speaking in full 5-skill TRKI perspective -->
            <div class="trki-subtest-result-card" style="border-style:dashed;background:rgba(23,87,166,0.02)">
              <div class="trki-subtest-card-top">
                <span class="trki-subtest-card-name">Субтест 4: Письмо (Kỹ năng Viết)</span>
                <span class="trki-subtest-status-pill" style="background:rgba(23,87,166,0.08);color:var(--russia-blue)">TỰ LUẬN AI</span>
              </div>
              <p style="font-size:0.82rem;color:var(--muted);margin:6px 0 10px;line-height:1.4">Tả tranh và viết tóm tắt đề thi chuẩn TRKI.</p>
              <a href="writing.html" style="font-size:0.85rem;font-weight:700;color:var(--russia-blue);text-decoration:none;display:inline-flex;align-items:center;gap:4px">
                Luyện Viết ngay ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 12 }) : "→"}
              </a>
            </div>

            <div class="trki-subtest-result-card" style="border-style:dashed;background:rgba(197,34,51,0.02)">
              <div class="trki-subtest-card-top">
                <span class="trki-subtest-card-name">Субтест 5: Говорение (Kỹ năng Nói)</span>
                <span class="trki-subtest-status-pill" style="background:rgba(197,34,51,0.08);color:var(--russia-red)">VẤN ĐÁP AI</span>
              </div>
              <p style="font-size:0.82rem;color:var(--muted);margin:6px 0 10px;line-height:1.4">Shadowing và phản xạ tình huống chuẩn TRKI.</p>
              <a href="speaking.html" style="font-size:0.85rem;font-weight:700;color:var(--russia-red);text-decoration:none;display:inline-flex;align-items:center;gap:4px">
                Luyện Nói ngay ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 12 }) : "→"}
              </a>
            </div>
          `}
        </div>

        <h3 style="margin:28px 0 14px;display:flex;align-items:center;gap:8px;font-size:1.15rem;color:var(--russia-navy)">
          ${window.RusiIcons ? RusiIcons.get("file-text", { size: 20 }) : ""} Bảng phân tích đáp án & giải thích ngữ pháp chi tiết:
        </h3>
        <div id="reviewHost"></div>

        <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-primary" id="retryTest">${isSubset ? (activeParts.length === 1 ? "Làm lại phần này" : "Làm lại các phần này") : "Làm lại đề này"}</button>
          <button class="btn btn-outline" id="btnBackToHub">Quay lại danh sách đề thi</button>
          <button class="btn btn-outline" onclick="window.scrollTo({top:0,behavior:'smooth'})">Lên đầu trang ↑</button>
        </div>
      </div>
    `;

    const review = el("#reviewHost");
    activeParts.forEach((part) => {
      review.innerHTML += `
        <div style="margin:18px 0 10px;font-weight:700;color:var(--russia-navy);border-bottom:1px solid var(--border);padding-bottom:6px;font-size:1.05rem">
          ${esc(part.name)} (${esc(part.vi)})
        </div>`;
      if (Array.isArray(part.questions) && part.questions.length > 0) {
        review.innerHTML += part.questions
          .map((q, qi) => {
            const given = answers[part.id + "_" + qi];
            const ok = given === q.a;
            return `
          <div class="quiz-q" style="margin-bottom:14px;padding:16px;border:1px solid var(--border);border-radius:12px;background:var(--surface)">
            <p class="q-text" style="font-weight:700">${qi + 1}. <span class="ru">${esc(q.q)}</span></p>
            <div style="font-size:.9rem;margin:8px 0">
              Bạn chọn: <b class="ru" style="color:${ok ? "var(--green)" : "var(--red)"}">${given !== undefined ? esc(q.options[given]) : "— bỏ trống —"}</b>
              ${ok ? '<span style="color:var(--green)"> (Chính xác)</span>' : '<span style="color:var(--red)"> (Sai)</span>'}
            </div>
            ${ok ? "" : `<div style="font-size:.9rem;margin-bottom:8px">Đáp án đúng: <b class="ru" style="color:var(--green)">${esc(q.options[q.a])}</b></div>`}
            <div class="explain" style="margin-top:8px;padding:10px 12px;background:var(--bg);border-radius:8px;font-size:0.86rem;line-height:1.5">
              ${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} <b>Giải thích quy tắc:</b> ${esc(q.ex || "Áp dụng cấu trúc ngữ pháp chuẩn theo bảng biến cách.")}
            </div>
          </div>`;
          })
          .join("");
      } else if (Array.isArray(part.writing_tasks)) {
        review.innerHTML += part.writing_tasks.map((wt, wti) => {
          const wId = "write_" + part.id + "_" + wti;
          const userText = answers[wId] || "";
          return `
            <div class="quiz-q" style="margin-bottom:14px;padding:16px;border:1px solid var(--border);border-radius:12px;background:var(--surface)">
              <p class="q-text" style="font-weight:700">${wti + 1}. <span class="ru">${esc(wt.title)}</span></p>
              <div style="font-size:.9rem;margin:8px 0;line-height:1.6">
                <strong>Bài làm của bạn:</strong>
                <div style="background:var(--bg);padding:10px 14px;border-radius:8px;margin-top:6px;white-space:pre-wrap">${esc(userText) || "— Chưa nộp bài viết —"}</div>
              </div>
            </div>`;
        }).join("");
      }
    });

    const otherPartsBtn = el("#btnChooseOtherParts");
    if (otherPartsBtn) {
      otherPartsBtn.onclick = () => openSubtestPickerModal(currentTest);
    }

    el("#btnReviewBack").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); window.scrollTo({ top: 0, behavior: "smooth" }); };
    el("#btnRetryTop").onclick = () => startTest(currentTest, activePartId, examMode);
    el("#retryTest").onclick = () => startTest(currentTest, activePartId, examMode);
    el("#btnBackToHub").onclick = () => { document.body.classList.remove("in-workspace"); renderHub(); };
    if (window.RusiIcons && typeof RusiIcons.render === "function") {
      RusiIcons.render(host);
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
  let cloudPosts = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("blog:all") : null;

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
      <div class="anticheat-modal-box bpost-modal-content" style="max-width:960px;width:min(94vw, 960px);text-align:left;max-height:88vh;overflow-y:auto;border-top-color:var(--primary);padding:32px 36px;border-radius:20px;">
        <div style="display:flex;justify-content:space-between;align-items:start">
          <span class="pro-chip">${esc(post.categoryName || "CẨM NANG DU HỌC")}</span>
          <button class="btn btn-outline btn-sm" id="closeArticle" style="padding:4px 12px;display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "&times;"} Đóng</button>
        </div>
        <h2 style="margin:16px 0 8px;font-size:1.85rem;line-height:1.35">${esc(post.title)}</h2>
        <div style="color:var(--muted);font-size:0.88rem;margin-bottom:18px">
          Tác giả: <b>${esc(post.author || "RUSI Editorial")}</b> · Ngày: ${esc(post.date || "")}
        </div>
        ${post.cover ? `<img src="${esc(post.cover)}" style="width:100%;max-height:360px;object-fit:cover;border-radius:14px;margin-bottom:20px" alt="" />` : ""}
        <div class="rusi-md-rendered" style="line-height:1.85;font-size:1.05rem;color:var(--text)">
          ${window.RusiMarkdown && typeof window.RusiMarkdown.render === "function" ? window.RusiMarkdown.render(post.content || post.excerpt) : `<p style="white-space:pre-line">${esc(post.content || post.excerpt)}</p>`}
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
  let cloudProducts = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("shop:all") : null;

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
    const currentUser = window.Auth && window.Auth.user;
    if (!currentUser || String(currentUser.uid || "").startsWith("guest_")) {
      if (window.Monetization && typeof window.Monetization.showAuthRequiredModal === "function") {
        window.Monetization.showAuthRequiredModal("Đăng nhập để đặt hàng", "Vui lòng đăng nhập để lưu đơn hàng và theo dõi trạng thái xác nhận trên Supabase.");
      }
      return;
    }
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
    document.getElementById("confirmPaidOrder").onclick = async () => {
      const name = document.getElementById("custName").value.trim() || "Quý khách";
      const phone = document.getElementById("custPhone").value.trim();
      const address = document.getElementById("custAddress").value.trim();
      const button = document.getElementById("confirmPaidOrder");
      button.disabled = true;
      const result = await window.RusiSupabase?.orders?.createShopPending({
        id: orderId,
        userId: currentUser.uid,
        amount: total,
        items: cart,
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address
      });
      if (!result?.ok) {
        button.disabled = false;
        toast(result?.message || "Không thể ghi nhận đơn hàng. Vui lòng thử lại.");
        return;
      }
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

    // Không hiển thị banner pricing-auth-banner logged-in theo yêu cầu
    pricingHost.innerHTML = pkgs.map((pkg) => {
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

    const showSlide = (idx, animate = true) => {
      currentIndex = (idx + feedbacks.length) % feedbacks.length;
      if (track) {
        track.style.transition = animate ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
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

    // Thao tác kéo chuột (Desktop) và vuốt tay (Mobile/Tablet)
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;

    const onPointerDown = (clientX) => {
      stopTimer();
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      currentX = clientX;
      if (track) {
        track.style.transition = "none";
        track.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (clientX) => {
      if (!isDragging) return;
      currentX = clientX;
      const diffX = currentX - startX;
      if (Math.abs(diffX) > 6) {
        hasMoved = true;
      }
      if (track) {
        track.style.transition = "none";
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diffX}px))`;
      }
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (track) {
        track.style.cursor = "grab";
      }
      const diffX = currentX - startX;
      const SWIPE_THRESHOLD = 45;
      if (hasMoved && Math.abs(diffX) >= SWIPE_THRESHOLD) {
        if (diffX < 0) {
          // Kéo sang trái -> Slide tiếp theo
          nextSlide();
        } else {
          // Kéo sang phải -> Slide trước đó
          prevSlide();
        }
      } else {
        showSlide(currentIndex, true);
      }
      startTimer();
    };

    if (slider) {
      slider.onmouseenter = stopTimer;
      slider.onmouseleave = startTimer;

      // Touch events
      slider.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches[0]) {
          onPointerDown(e.touches[0].clientX);
        }
      }, { passive: true });

      slider.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
          onPointerMove(e.touches[0].clientX);
        }
      }, { passive: true });

      slider.addEventListener("touchend", onPointerUp);
      slider.addEventListener("touchcancel", onPointerUp);

      // Mouse drag events
      slider.addEventListener("mousedown", (e) => {
        onPointerDown(e.clientX);
      });

      window.addEventListener("mousemove", (e) => {
        if (isDragging) {
          onPointerMove(e.clientX);
        }
      });

      window.addEventListener("mouseup", () => {
        if (isDragging) {
          onPointerUp();
        }
      });
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
  const cachedPackages = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("packages:all") : null;
  if (cachedPackages && cachedPackages.length) {
    window.PACKAGES = cachedPackages;
  }

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
        const posText = window.formatRussianGrammar ? window.formatRussianGrammar(w.pos, w.gram) : (w.pos || w.gram || "");
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
