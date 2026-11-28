
function rusiNormalize(str) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/й/g, "\u0000") // giữ й: NFD tách й thành и + dấu U+0306, bước bỏ dấu sẽ biến й thành и
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0000/g, "й")
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

function generateUUID() {
  if (typeof window !== "undefined" && window.RusiUUID && typeof window.RusiUUID.generate === "function") {
    return window.RusiUUID.generate();
  }
  if (typeof window !== "undefined" && window.RusiSupabase && typeof window.RusiSupabase.generateUUID === "function") {
    return window.RusiSupabase.generateUUID();
  }
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isValidUUID(str) {
  if (typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str.trim());
}

function renderRusiPagination(containerEl, currentPage, totalPages, onPageChange, options) {
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
    <button type="button" class="rusi-load-more-btn" aria-label="Xem thêm ${remaining} ${unit}">
      ${downIcon}
      <span>Xem thêm (${remaining} ${unit})</span>
    </button>
  `;

  const btn = containerEl.querySelector(".rusi-load-more-btn");
  if (btn) {
    btn.onclick = (e) => {
      e.preventDefault();
      onPageChange(currentPage + 1);
    };
  }
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
    } else if (type === "victory" || type === "fanfare") {
      const notes = [
        { freq: 523.25, time: 0, dur: 0.16, vol: 0.15 },
        { freq: 659.25, time: 0.12, dur: 0.16, vol: 0.15 },
        { freq: 783.99, time: 0.24, dur: 0.18, vol: 0.18 },
        { freq: 1046.50, time: 0.38, dur: 0.65, vol: 0.22 },
        { freq: 1318.51, time: 0.44, dur: 0.55, vol: 0.15 }
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        const t = now + n.time;
        osc.frequency.setValueAtTime(n.freq, t);
        gain.gain.setValueAtTime(n.vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + n.dur);
      });
    }
  } catch (e) {
    // Non-fatal if browser limits audio context
  }
}
window.playQuizletSound = playQuizletSound;

function rusiConfetti(options = {}) {
  try {
    const old = document.getElementById("rusiConfettiCanvas");
    if (old) old.remove();

    const canvas = document.createElement("canvas");
    canvas.id = "rusiConfettiCanvas";
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999999;";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ["#1757a6", "#c52233", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#38bdf8"];
    const count = options.count || 85;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const fromLeft = i % 2 === 0;
      particles.push({
        x: fromLeft ? width * 0.15 + (Math.random() * 60 - 30) : width * 0.85 + (Math.random() * 60 - 30),
        y: height * 0.9,
        vx: fromLeft ? (Math.random() * 9 + 4) : -(Math.random() * 9 + 4),
        vy: -(Math.random() * 15 + 10),
        w: Math.random() * 8 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
        opacity: 1
      });
    }

    const startTime = performance.now();
    const duration = options.duration || 3200;

    function render(now) {
      const elapsed = now - startTime;
      if (elapsed >= duration) {
        canvas.remove();
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const fadeProgress = elapsed / duration;
      const globalAlpha = fadeProgress > 0.65 ? (1 - (fadeProgress - 0.65) / 0.35) : 1;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.36; // trọng lực rơi
        p.vx *= 0.985; // lực cản không khí
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.wobble), 1);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, globalAlpha * p.opacity);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  } catch (err) {
    // Graceful fallback nếu trình duyệt không hỗ trợ canvas
  }
}
window.rusiConfetti = rusiConfetti;

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
  if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html")) return;
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
  const stress = rusiStressCase(wordData.stress || ru, ru);
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
    const newJarId = generateUUID();
    const newJar = {
      id: newJarId,
      uuid: newJarId,
      code: "custom_" + newJarId.slice(0, 8),
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
    if (typeof toast === "function") toast(`Đã tạo lọ “${createdName}” thành công!`);
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
      id: (existingIdx >= 0 && jar.words[existingIdx].id && isValidUUID(jar.words[existingIdx].id)) ? jar.words[existingIdx].id : generateUUID(),
      ru: ru,
      vi: finalVi,
      stress: stress,
      note: note,
      ex: ex,
      ex_vi: ex_vi
    };

    if (existingIdx >= 0) {
      jar.words[existingIdx] = Object.assign({}, jar.words[existingIdx], wordPayload);
      if (typeof toast === "function") toast(`Đã cập nhật từ “${ru}” trong lọ “${jar.name}”!`);
    } else {
      jar.words.push(wordPayload);
      if (typeof toast === "function") toast(`Đã lưu “${ru}” vào “${jar.name}” thành công!`);
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
  if (typeof window.requireAuth === "function" && !window.requireAuth("vocabulary.html?jar=" + encodeURIComponent(jarId || ""))) return;
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

      <div class="add-word-form">
        <div class="add-word-row">
          <label class="add-word-field">
            <span class="add-word-label">Từ tiếng Nga (*)</span>
            <input type="text" id="newWordRu" class="add-jar-input" placeholder="Ví dụ: спасибо" autocomplete="off" lang="ru" />
          </label>
          <label class="add-word-field">
            <span class="add-word-label">Trọng âm (tùy chọn)</span>
            <input type="text" id="newWordStress" class="add-jar-input" placeholder="Ví dụ: спаси́бо" autocomplete="off" lang="ru" />
          </label>
        </div>
        <div class="add-word-lookup" id="newWordLookupStatus" role="status" aria-live="polite"></div>

        <div class="add-word-row">
          <label class="add-word-field">
            <span class="add-word-label">Nghĩa tiếng Việt (*)</span>
            <input type="text" id="newWordVi" class="add-jar-input" placeholder="Ví dụ: cảm ơn" autocomplete="off" />
          </label>
          <div class="add-word-field">
            <span class="add-word-label" id="newWordPosLabel">Từ loại</span>
            <select id="newWordPos" class="add-jar-input" aria-labelledby="newWordPosLabel">
              <option value="">— Chọn từ loại —</option>
              ${(window.RusiVocabLookup ? RusiVocabLookup.POS_OPTIONS : []).map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("")}
            </select>
          </div>
        </div>

        <label class="add-word-field">
          <span class="add-word-label">Câu ví dụ tiếng Nga</span>
          <input type="text" id="newWordEx" class="add-jar-input" placeholder="Ví dụ: Большое спасибо за помощь!" autocomplete="off" lang="ru" />
        </label>

        <label class="add-word-field">
          <span class="add-word-label">Dịch câu ví dụ (tiếng Việt)</span>
          <input type="text" id="newWordExVi" class="add-jar-input" placeholder="Ví dụ: Cảm ơn rất nhiều vì đã giúp đỡ!" autocomplete="off" />
        </label>

        <label class="add-word-field">
          <span class="add-word-label">Ghi chú (tùy chọn)</span>
          <input type="text" id="newWordNote" class="add-jar-input" placeholder="Ví dụ: dùng trong giao tiếp lịch sự" autocomplete="off" />
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

  // Tự điền từ dữ liệu hệ thống khi học viên nhập xong từ tiếng Nga (rời ô / Enter).
  // Chỉ điền ô còn trống hoặc ô do hệ thống điền trước đó — không ghi đè chữ học viên tự gõ.
  const lookup = window.RusiVocabLookup;
  const statusEl = m.querySelector("#newWordLookupStatus");
  const autoFields = {
    stress: m.querySelector("#newWordStress"),
    vi: m.querySelector("#newWordVi"),
    pos: m.querySelector("#newWordPos"),
    ex: m.querySelector("#newWordEx"),
    ex_vi: m.querySelector("#newWordExVi")
  };
  Object.values(autoFields).forEach(f => {
    f.addEventListener("input", () => { delete f.dataset.auto; });
    f.addEventListener("change", () => { delete f.dataset.auto; if (f._rusiSync) f._rusiSync(); });
  });
  if (lookup && typeof lookup.enhancePosSelect === "function") lookup.enhancePosSelect(autoFields.pos);
  const setStatus = (text, kind) => {
    statusEl.textContent = text;
    statusEl.dataset.kind = kind || "";
  };
  let lookedUp = "";
  let lookupSeq = 0;
  const runLookup = async () => {
    if (!lookup) return;
    const ru = (ruInput.value || "").trim();
    const key = lookup.norm(ru);
    if (key === lookedUp) return;
    lookedUp = key;
    const seq = ++lookupSeq;
    // Đổi sang từ khác → bỏ các giá trị hệ thống đã điền cho từ trước
    Object.values(autoFields).forEach(f => { if (f.dataset.auto) { f.value = ""; delete f.dataset.auto; if (f._rusiSync) f._rusiSync(); } });
    if (!key) { setStatus("", ""); return; }
    setStatus("Đang tìm trong từ điển hệ thống…", "loading");
    let found = null;
    try {
      found = await lookup.find(ru);
    } catch (err) {
      console.warn("[AddWord] Lỗi tra từ điển:", err);
    }
    if (seq !== lookupSeq || !m.isConnected) return;
    if (!found) {
      setStatus("Không có trong từ điển hệ thống — hãy tự nhập các ô còn lại.", "miss");
      return;
    }
    const values = {
      stress: found.stress && lookup.norm(found.stress) === key ? found.stress : "",
      vi: found.vi,
      pos: lookup.posValue(found),
      ex: stripQuotes(found.ex || ""),
      ex_vi: stripQuotes(found.ex_vi || "")
    };
    let filled = 0;
    Object.keys(autoFields).forEach(k => {
      const f = autoFields[k];
      if (!values[k] || (f.value && !f.dataset.auto)) return;
      f.value = values[k];
      f.dataset.auto = "1";
      if (f._rusiSync) f._rusiSync();
      filled++;
    });
    setStatus(filled ? "Đã tự điền từ từ điển hệ thống — bạn có thể sửa lại." : "Từ có trong từ điển hệ thống.", "hit");
  };
  ruInput.addEventListener("change", runLookup);
  ruInput.addEventListener("blur", runLookup);
  if (lookup) lookup.preload();

  const closeModal = () => {
    document.removeEventListener("keydown", onKey);
    m.remove();
  };

  const onKey = (e) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Enter ở ô từ tiếng Nga: tra từ rồi chuyển sang ô nghĩa thay vì lưu ngay
      if (document.activeElement === ruInput) {
        runLookup();
        m.querySelector("#newWordVi").focus();
        return;
      }
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
    const ex_vi = (m.querySelector("#newWordExVi").value || "").trim();
    const posSel = window.RusiVocabLookup ? RusiVocabLookup.parsePos(m.querySelector("#newWordPos").value) : { pos: "", gender: "", aspect: "" };

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
    const existingIdx = jar.words.findIndex(w => (w.ru || "").trim().toLowerCase() === ru.toLowerCase());
    const wordPayload = {
      id: (existingIdx >= 0 && jar.words[existingIdx].id && isValidUUID(jar.words[existingIdx].id)) ? jar.words[existingIdx].id : generateUUID(),
      ru,
      stress,
      vi,
      pos: posSel.pos,
      gender: posSel.gender,
      aspect: posSel.aspect,
      note,
      ex,
      ex_vi
    };

    if (existingIdx >= 0) {
      jar.words[existingIdx] = Object.assign({}, jar.words[existingIdx], wordPayload);
      if (typeof toast === "function") toast(`Đã cập nhật từ “${ru}” trong lọ “${jar.name}”!`);
    } else {
      jar.words.push(wordPayload);
      if (typeof toast === "function") toast(`Đã thêm từ “${ru}” vào lọ “${jar.name}” thành công!`);
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
  // Tên lọ ghi lên thẻ SRS (phiên ôn SRS "srs_..." không phải lọ nên không ghi)
  const srsJarTitle = options.jarTitle && !String(jarId).startsWith("srs_") ? options.jarTitle : null;
  const withJar = (w) => (srsJarTitle && w && typeof w === "object" ? { ...w, jarTitle: srsJarTitle } : w);
  const isCustomJar = Boolean(options.isCustomJar);
  // Mốc XP "1 lần/ngày/lọ": mọi lọ tự tạo dùng chung 1 lượt (tạo nhiều lọ nhỏ không nhân XP)
  const xpJarId = isCustomJar ? "custom" : jarId;
  const onWordListChange = options.onWordListChange;
  // Live Preview CMS (options.isPreview): che STORE/Progress/SRS bằng bản tạm trên RAM — không ghi tiến độ, XP, thẻ SRS hay localStorage
  const isPreview = Boolean(options.isPreview);
  const previewMem = {};
  const STORE = isPreview ? Object.assign(Object.create(window.STORE), {
    get: (k, fallback) => (Object.prototype.hasOwnProperty.call(previewMem, k) ? previewMem[k] : window.STORE.get(k, fallback)),
    set: (k, v) => { previewMem[k] = v; }
  }) : window.STORE;
  const Progress = isPreview ? Object.assign(Object.create(window.Progress), {
    addXp: () => {}, markDone: () => {}, syncToCloud: () => {}
  }) : window.Progress;
  const SRS = (isPreview && window.SRS) ? Object.assign(Object.create(window.SRS), {
    ensureCard: (w) => (w && typeof w === "object" ? (w.id || w.ru) : w),
    review: () => null, markMastered: () => {}, unmarkMastered: () => {}
  }) : window.SRS;

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

  // Khử từ vựng trùng lặp trong lọ nếu có
  const seenWordKeys = new Set();
  const uniqueRawWords = [];
  (rawWords || []).forEach((w) => {
    const k = ((w && (w.ru || w.word_normalized)) || "").trim().toLowerCase();
    if (k && seenWordKeys.has(k)) return;
    if (k) seenWordKeys.add(k);
    uniqueRawWords.push(w);
  });

  let words = uniqueRawWords.map((w, idx) => ({
    ...w,
    id: w.id || w.vocab_id || "w-" + idx,
    ru: (w.ru || "").trim(),
    stress: rusiStressCase(w.stress || w.ru || "", w.ru),
    vi: (w.vi || w.meaning || "").trim(),
    note: (w.note || w.notes || w.trans || "").trim(),
    notes: (w.notes || w.note || "").trim(),
    pos: (w.pos || "").trim(),
    gender: (w.gender || "").trim(),
    ex: stripQuotes(w.ex),
    ex_vi: (w.ex_vi || "").trim(),
    collocation: stripQuotes(w.collocation),
    structures: Array.isArray(w.structures) ? w.structures : (w.structures ? [w.structures] : []),
    verb_obj: (w.verb_obj || w.gov || "").trim(),
    gov: (w.gov || "").trim(),
    syn: stripQuotes(w.syn || (Array.isArray(w.synonyms) ? w.synonyms.join(", ") : "")),
    ant: stripQuotes(w.ant || (Array.isArray(w.antonyms) ? w.antonyms.join(", ") : ""))
  }));

  const initialMode = (options && options.initialMode) ? options.initialMode : "list";
  let currentMode = initialMode;

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

  const hasTopbarModes = Boolean(document.querySelector("#rusiTopbarModes .quizlet-mode-btn"));

  container.innerHTML = `
    <div class="quizlet-suite">
      <div class="quizlet-mode-bar" ${hasTopbarModes ? 'style="display:none"' : ''}>
        <button type="button" class="quizlet-mode-btn ${initialMode === "list" ? "active" : ""}" data-mode="list">
          ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} <span class="btn-text">Danh sách từ (${words.length})</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "flashcard" ? "active" : ""}" data-mode="flashcard">
          ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 16 }) : ""} <span class="btn-text">Thẻ ghi nhớ (Flashcard)</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "learn" ? "active" : ""}" data-mode="learn">
          ${window.RusiIcons ? RusiIcons.get("brain", { size: 16 }) : ""} <span class="btn-text">Trắc nghiệm</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "write" ? "active" : ""}" data-mode="write">
          ${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 16 }) : ""} <span class="btn-text">Gõ từ</span>
        </button>
        <button type="button" class="quizlet-mode-btn ${initialMode === "match" ? "active" : ""}" data-mode="match">
          ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} <span class="btn-text">Ghép thẻ</span>
        </button>
      </div>

      <div class="qmode-pane ${initialMode === "list" ? "active" : ""}" id="paneList"></div>
      <div class="qmode-pane ${initialMode === "flashcard" ? "active" : ""}" id="paneFlashcard"></div>
      <div class="qmode-pane ${initialMode === "learn" ? "active" : ""}" id="paneLearn"></div>
      <div class="qmode-pane ${initialMode === "write" ? "active" : ""}" id="paneWrite"></div>
      <div class="qmode-pane ${initialMode === "match" ? "active" : ""}" id="paneMatch"></div>
    </div>
  `;

  // Mode switching
  currentMode = initialMode;
  let matchTimerInterval = null;

  // Lấy các nút chế độ trong top bar (nếu có) và trong container
  const topbarModeBtns = Array.from(document.querySelectorAll("#rusiTopbarModes .quizlet-mode-btn"));
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
    write: container.querySelector("#paneWrite"),
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
    if (mode === "write") renderWriteMode();
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
  let fCompleted = false;
  let fXpAwarded = false; // +15 XP hoàn thành chỉ hiện khi lượt này thực sự được cộng
  let fAutoAudio = (typeof STORE !== "undefined") ? STORE.get("quizlet_auto_audio", true) : true;

  // Mặt trước hiện "Chưa thuộc / Đã thuộc", mặt sau hiện Quên/Khó/Tốt/Dễ
  const syncAnswerZone = () => {
    const zone = panes.flashcard && panes.flashcard.querySelector("#qAnswerZone");
    if (zone) zone.classList.toggle("is-flipped", fFlipped);
  };

  const renderFlashcardMode = () => {
    const pane = panes.flashcard;
    if (!pane) return;

    if (fCompleted) {
      const starred = getQuizletStarred().map(s => s.toLowerCase());
      const starredInJar = fActiveWords.filter(w => starred.includes(w.ru.toLowerCase())).length;

      pane.innerHTML = `
        <div class="quizlet-progress-bar">
          <div class="quizlet-progress-fill" style="width:100%"></div>
        </div>

        <div class="quizlet-summary-box" style="margin-top:24px;padding:36px 24px">
          <div class="quizlet-summary-trophy" style="color:#f59e0b;font-size:4.2rem;margin-bottom:14px">
            ${window.RusiIcons ? RusiIcons.get("trophy-reward", { size: 68 }) : "🏆"}
          </div>
          <h2 style="margin:0 0 10px;font-size:1.85rem;color:var(--text, #0f1f38)">Chúc mừng bạn đã hoàn thành!</h2>
          <p style="color:var(--muted);font-size:1.08rem;margin:0 0 20px;line-height:1.55">
            Bạn đã học xong toàn bộ <b>${new Set(fActiveWords.map(w => w.ru)).size}</b> thẻ từ vựng trong lọ này.
          </p>

          ${fXpAwarded ? `<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.25);border-radius:999px;color:#16a34a;font-weight:700;font-size:0.95rem;margin-bottom:28px">
            ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : "⚡"} +15 XP Hoàn thành Thẻ ghi nhớ
          </div>` : ""}

          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button type="button" class="btn btn-primary" id="btnFlashRestart">
              ${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : ""} Học lại từ đầu
            </button>
            ${starredInJar > 0 ? `
              <button type="button" class="btn btn-outline" id="btnFlashReviewStarred">
                ${window.RusiIcons ? RusiIcons.get("star", { size: 16 }) : "⭐"} Ôn ${starredInJar} từ khó đã gắn sao
              </button>
            ` : ""}
            <button type="button" class="btn btn-soft" id="btnFlashToMatch">
              ${window.RusiIcons ? RusiIcons.get("puzzle-match", { size: 16 }) : ""} Ghép thẻ
            </button>
            <button type="button" class="btn btn-soft" id="btnFlashToList">
              ${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} Danh sách từ
            </button>
          </div>
        </div>
      `;

      pane.querySelector("#btnFlashRestart").onclick = () => {
        fActiveWords = [...words]; // bỏ các thẻ chèn lại (Quên/Khó) của lượt trước
        fIdx = 0;
        fCompleted = false;
        fXpAwarded = false;
        fFlipped = false;
        renderFlashcardMode();
      };

      const btnStar = pane.querySelector("#btnFlashReviewStarred");
      if (btnStar) {
        btnStar.onclick = () => {
          fStarredOnly = true;
          fIdx = 0;
          fCompleted = false;
          fXpAwarded = false;
          fFlipped = false;
          renderFlashcardMode();
        };
      }

      pane.querySelector("#btnFlashToMatch").onclick = () => switchMode("match");
      pane.querySelector("#btnFlashToList").onclick = () => switchMode("list");
      return;
    }

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

          <!-- BACK FACE (VI) — THIẾT KẾ 4 TẦNG: NGHĨA -> NGỮ PHÁP -> CẤU TRÚC -> VÍ DỤ -> MỞ RỘNG -->
          <div class="quizlet-card-face quizlet-card-back">
            <div class="qcard-top-row">
              <div class="qcard-actions">
                <button type="button" class="qcard-btn-addjar qcard-icon-only" id="qAddJarBack" title="Lưu vào Lọ cá nhân">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""}</button>
              </div>
            </div>

            <div class="qcard-main">
              ${(() => {
                const viMeaning = currentWord.meaning_vi || currentWord.vi || "";

                // TẦNG 1: BADGES (POS, GENDER, ASPECT, LEVEL)
                const badges = [];
                const posRaw = (currentWord.pos || "").trim().toLowerCase();
                const gRaw = (currentWord.gender || "").trim().toLowerCase();
                const aspRaw = (currentWord.aspect || currentWord.gram || "").trim().toLowerCase();

                let posLabel = "";
                let isNoun = false;
                let isVerb = false;

                if (posRaw.includes("сущ") || posRaw.includes("noun") || posRaw.includes("danh")) {
                  posLabel = "Danh từ";
                  isNoun = true;
                } else if (posRaw.includes("гл") || posRaw.includes("verb") || posRaw.includes("động")) {
                  posLabel = "Động từ";
                  isVerb = true;
                } else if (posRaw.includes("прил") || posRaw.includes("adj") || posRaw.includes("tính")) {
                  posLabel = "Tính từ";
                } else if (posRaw.includes("нар") || posRaw.includes("adv") || posRaw.includes("phó") || posRaw.includes("trạng")) {
                  posLabel = "Trạng từ";
                } else if (posRaw.includes("предл") || posRaw.includes("prep") || posRaw.includes("giới")) {
                  posLabel = "Giới từ";
                } else if (posRaw.includes("союз") || posRaw.includes("conj") || posRaw.includes("liên")) {
                  posLabel = "Liên từ";
                } else if (posRaw.includes("мест") || posRaw.includes("pronoun") || posRaw.includes("đại")) {
                  posLabel = "Đại từ";
                } else if (posRaw.includes("част") || posRaw.includes("trợ")) {
                  posLabel = "Trợ từ";
                } else if (posRaw.includes("межд") || posRaw.includes("thán")) {
                  posLabel = "Thán từ";
                } else if (currentWord.pos) {
                  posLabel = currentWord.pos;
                } else if (gRaw) {
                  posLabel = "Danh từ";
                  isNoun = true;
                }

                if (posLabel) {
                  badges.push({ text: posLabel, cls: "pos" });
                }

                // Thuộc tính ngữ pháp: Danh từ có Giống (đực/cái/trung/đực-cái)
                if (isNoun || gRaw) {
                  if (gRaw.includes("м./ж") || gRaw.includes("m/f") || gRaw.includes("общ") || posRaw.includes("м./ж")) {
                    badges.push({ text: "Giống đực/cái (м./ж.)", cls: "gender-mf" });
                  } else if (gRaw.includes("ср") || gRaw === "с" || gRaw === "n" || gRaw.includes("neut") || gRaw.includes("trung") || posRaw.includes("ср")) {
                    badges.push({ text: "Giống trung (ср.р)", cls: "gender-n" });
                  } else if (gRaw.includes("ж") || gRaw === "f" || gRaw.includes("fem") || gRaw.includes("cái") || posRaw.includes("ж.")) {
                    badges.push({ text: "Giống cái (ж.р)", cls: "gender-f" });
                  } else if (gRaw.includes("м") || gRaw === "m" || gRaw.includes("masc") || gRaw.includes("đực") || posRaw.includes("м.")) {
                    badges.push({ text: "Giống đực (м.р)", cls: "gender-m" });
                  }
                }

                // Thuộc tính ngữ pháp: Động từ có Thể (Hoàn thành / Chưa hoàn thành)
                if (isVerb || aspRaw) {
                  if (aspRaw.includes("нсв/св") || aspRaw.includes("двувид")) {
                    badges.push({ text: "Lưỡng thể (НСВ/СВ)", cls: "aspect-both" });
                  } else if (aspRaw.includes("нсв") || aspRaw.includes("impf") || aspRaw.includes("ipfv") || aspRaw.includes("chưa")) {
                    badges.push({ text: "Chưa hoàn thành (НСВ)", cls: "aspect-ipfv" });
                  } else if (aspRaw.includes("св") || aspRaw.includes("pf") || aspRaw.includes("hoàn thành")) {
                    badges.push({ text: "Hoàn thành (СВ)", cls: "aspect-pf" });
                  } else if (currentWord.aspect) {
                    badges.push({ text: `Thể: ${currentWord.aspect}`, cls: "aspect-custom" });
                  }
                }


                // TẦNG 2: CẤU TRÚC NGỮ PHÁP (STRUCTURES)
                let structList = [];
                if (Array.isArray(currentWord.structures) && currentWord.structures.length > 0) {
                  structList = currentWord.structures.map(s => {
                    if (typeof s === "string") return s.trim();
                    if (s && typeof s === "object") {
                      const text = s.structure || s.ru || s.text || s.pattern || "";
                      const meaning = s.vi || s.meaning || s.translation || "";
                      return meaning ? `${text} (${meaning})` : text;
                    }
                    return "";
                  }).filter(Boolean);
                } else if (typeof currentWord.structures === "string" && currentWord.structures.trim()) {
                  structList = [currentWord.structures.trim()];
                } else if (currentWord.collocation || currentWord.verb_obj || currentWord.gov) {
                  const fallbackStruct = [currentWord.collocation, currentWord.verb_obj, currentWord.gov].filter(Boolean).join(" · ");
                  if (fallbackStruct) structList = [fallbackStruct];
                }
                // Khử trùng lặp giữa các cấu trúc
                structList = Array.from(new Set(structList.map(s => (s || "").trim()))).filter(Boolean);

                // TẦNG 3: VÍ DỤ NGỮ CẢNH (EXAMPLES)
                let exList = [];
                if (Array.isArray(currentWord.examples) && currentWord.examples.length > 0) {
                  exList = currentWord.examples.map(ex => {
                    if (typeof ex === "string") return { ru: ex.trim(), vi: "" };
                    if (ex && typeof ex === "object") {
                      return {
                        ru: (ex.stress || ex.ru || ex.text || "").trim(),
                        vi: (ex.vi || ex.translation || "").trim()
                      };
                    }
                    return null;
                  }).filter(x => x && x.ru);
                }
                if (exList.length === 0 && currentWord.ex) {
                  exList.push({
                    ru: (currentWord.ex_stress || currentWord.ex).trim(),
                    vi: (currentWord.ex_vi || "").trim()
                  });
                }
                const firstEx = exList[0] || null;
                const remainingEx = exList.slice(1);

                // TẦNG 4: ĐỒNG/TRÁI NGHĨA & LƯU Ý (SYNONYMS, ANTONYMS, NOTES)
                let syn = "";
                if (Array.isArray(currentWord.synonyms) && currentWord.synonyms.length > 0) {
                  syn = currentWord.synonyms.map(s => typeof s === "string" ? s : (s.ru || s.word || "")).filter(Boolean).join(", ");
                } else if (currentWord.syn) {
                  syn = currentWord.syn.trim();
                }

                let ant = "";
                if (Array.isArray(currentWord.antonyms) && currentWord.antonyms.length > 0) {
                  ant = currentWord.antonyms.map(a => typeof a === "string" ? a : (a.ru || a.word || "")).filter(Boolean).join(", ");
                } else if (currentWord.ant) {
                  ant = currentWord.ant.trim();
                }

                // Khử trùng lặp ghi chú nếu nội dung trùng với từ loại đã hiển thị ở Tầng 1
                const rawNotes = (currentWord.notes || currentWord.note || "").trim();
                const posClean = (currentWord.pos || "").trim().toLowerCase();
                const wordTypeClean = (getWordType(currentWord) || "").trim().toLowerCase();
                const posLabelClean = (posLabel || "").trim().toLowerCase();
                const isNoteRedundant = rawNotes && (
                  rawNotes.toLowerCase() === posClean ||
                  rawNotes.toLowerCase() === posLabelClean ||
                  (posLabelClean && posLabelClean.includes(rawNotes.toLowerCase())) ||
                  (wordTypeClean && wordTypeClean.includes(rawNotes.toLowerCase())) ||
                  rawNotes.toLowerCase() === (currentWord.gender || "").trim().toLowerCase()
                );
                const notes = isNoteRedundant ? "" : rawNotes;
                const hasSynAnt = Boolean(syn || ant);

                return `
                  <!-- TẦNG 1: BẢN CHẤT CỐT LÕI & TỪ LOẠI -->
                  <div class="qcard-tier-core">
                    <div class="qcard-meaning">${esc(viMeaning)}</div>
                    ${badges.length > 0 ? `
                      <div class="qcard-badges-row">
                        ${badges.map(b => `<span class="qcard-pill ${b.cls}">${esc(b.text)}</span>`).join("")}
                      </div>
                    ` : ""}
                  </div>

                  <!-- TẦNG 2: CẤU TRÚC NGỮ PHÁP (STRUCTURES) -->
                  ${structList.length > 0 ? `
                    <div class="qcard-struct-chips">
                      ${structList.map(st => `
                        <div class="qcard-struct-chip ru">
                          <span class="qcard-chip-dot"></span>
                          <span class="qcard-struct-text">${esc(st)}</span>
                        </div>
                      `).join("")}
                    </div>
                  ` : ""}

                  <!-- TẦNG 3: NGỮ CẢNH & VÍ DỤ THỰC TẾ -->
                  ${firstEx ? `
                    <div class="qcard-example-card">
                      <div class="qcard-ex-ru ru">${esc(firstEx.ru)}</div>
                      ${firstEx.vi ? `<div class="qcard-ex-vi">${esc(firstEx.vi)}</div>` : ""}
                      ${remainingEx.length > 0 ? `
                        <button type="button" class="qcard-btn-more-ex" id="qMoreExToggle" data-expanded="false" data-count="${remainingEx.length}">
                          <span class="qcard-more-ex-text">+ Xem thêm ${remainingEx.length} ví dụ khác ▾</span>
                        </button>
                        <div class="qcard-more-ex-list hidden" id="qMoreExList">
                          ${remainingEx.map(item => `
                            <div class="qcard-more-ex-item">
                              <div class="qcard-ex-ru ru">${esc(item.ru)}</div>
                              ${item.vi ? `<div class="qcard-ex-vi">${esc(item.vi)}</div>` : ""}
                            </div>
                          `).join("")}
                        </div>
                      ` : ""}
                    </div>
                  ` : ""}

                  <!-- TẦNG 4: TỪ ĐỒNG NGHĨA, TRÁI NGHĨA & LƯU Ý -->
                  ${(hasSynAnt || notes) ? `
                    <div class="qcard-footer-meta">
                      ${hasSynAnt ? `
                        <div class="qcard-meta-syn-ant">
                          ${syn ? `<span><span class="meta-label">Syn:</span> <span class="ru">${esc(syn)}</span></span>` : ""}
                          ${syn && ant ? `<span class="meta-sep">·</span>` : ""}
                          ${ant ? `<span><span class="meta-label">Ant:</span> <span class="ru">${esc(ant)}</span></span>` : ""}
                        </div>
                      ` : ""}
                      ${notes ? `
                        <div class="qcard-meta-note">
                          <span class="note-bullet">${typeof RusiIcons !== "undefined" ? RusiIcons.get("lightbulb", { size: 14 }) : "💡"}</span>
                          <span class="note-content">${esc(notes)}</span>
                        </div>
                      ` : ""}
                    </div>
                  ` : ""}
                `;
              })()}
            </div>

          </div>
        </div>
      </div>

      <!-- CONTROLS: CĂN GIỮA TUYỆT ĐỐI THEO CARD < 1/26 > (Req 6) -->
      <div class="quizlet-controls" style="display:flex;justify-content:center;align-items:center;margin:20px auto;width:100%;max-width:860px;box-sizing:border-box">
        <div class="quizlet-nav-wrap" style="margin:0 auto;display:inline-flex;align-items:center;justify-content:center;gap:18px">
          <button type="button" class="quizlet-nav-btn" id="qNavPrev" title="Thẻ trước (Phím ←)">${window.RusiIcons ? RusiIcons.get("chevron-left", { size: 22 }) : "‹"}</button>
          <div class="quizlet-counter" style="font-weight:700;font-size:1.15rem;min-width:80px;text-align:center">${fIdx + 1} / ${fActiveWords.length}</div>
          <button type="button" class="quizlet-nav-btn" id="qNavNext" title="${fIdx === fActiveWords.length - 1 ? 'Hoàn thành lượt học' : 'Thẻ sau (Phím →)'}">${fIdx === fActiveWords.length - 1 ? (window.RusiIcons ? RusiIcons.get("check", { size: 22 }) : "✓") : (window.RusiIcons ? RusiIcons.get("chevron-right", { size: 22 }) : "›")}</button>
        </div>
      </div>

      <!-- Mặt trước: hỏi Đã thuộc / Chưa thuộc; lật thẻ rồi mới chấm Quên/Khó/Tốt/Dễ -->
      <div class="qcard-answer-zone ${fFlipped ? "is-flipped" : ""}" id="qAnswerZone">
      <div class="qcard-know-bar">
        <button type="button" class="btn-know btn-know-no" id="qKnowNo" title="Chưa thuộc — lật thẻ xem nghĩa rồi tự chấm (Phím Space)">
          ${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : ""} Chưa thuộc
        </button>
        <button type="button" class="btn-know btn-know-yes" id="qKnowYes" title="Đã thuộc — đánh dấu thuộc và sang thẻ tiếp">
          ${window.RusiIcons ? RusiIcons.get("check", { size: 16 }) : ""} Đã thuộc
        </button>
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
      </div>
    `;

    // Bind card flip
    const card = pane.querySelector("#qCard");
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      fFlipped = !fFlipped;
      card.classList.toggle("flipped", fFlipped);
      syncAnswerZone();
      playQuizletSound("flip");
    };

    // Chưa thuộc → lật thẻ, hiện 4 nút chấm SRS
    pane.querySelector("#qKnowNo").onclick = (e) => {
      e.stopPropagation();
      if (!fFlipped) {
        fFlipped = true;
        card.classList.add("flipped");
        playQuizletSound("flip");
      }
      syncAnswerZone();
    };

    // Đã chấm SRS mọi từ khác nhau của lượt học này chưa (thẻ chèn lại không tính riêng)
    const fAllRated = () => {
      const reviewed = STORE.get("flash_rev_" + jarId, []);
      return fActiveWords.every(w => reviewed.includes(w.ru));
    };

    // Hàm hiển thị màn hình hoàn thành chúc mừng kèm pháo giấy & âm thanh
    const showFlashcardCompletion = () => {
      fCompleted = true;
      const today = new Date().toDateString();
      const sessKey = "flash_done_" + xpJarId + "_" + today;
      if (!STORE.get(sessKey, false) && fAllRated()) {
        STORE.set(sessKey, true);
        STORE.set("flash_rev_" + jarId, []);
        if (typeof Progress !== "undefined") {
          Progress.markDone("vocabDone", jarId);
          Progress.addXp(15);
          fXpAwarded = true;
        }
      }

      playQuizletSound("victory");
      if (typeof window.rusiConfetti === "function") {
        window.rusiConfetti();
      }

      renderFlashcardMode();
    };

    // Navigation
    const nextCard = () => {
      if (fIdx >= fActiveWords.length - 1) {
        showFlashcardCompletion();
        return;
      }
      fIdx++;
      fFlipped = false;
      renderFlashcardMode();
      if (fAutoAudio) {
        if (typeof playWordAudio === "function") playWordAudio(fActiveWords[fIdx]);
        else speak(fActiveWords[fIdx].ru);
      }
    };
    const prevCard = () => {
      if (fCompleted) {
        fCompleted = false;
        fIdx = fActiveWords.length - 1;
        fFlipped = false;
        renderFlashcardMode();
        return;
      }
      fIdx = (fIdx - 1 + fActiveWords.length) % fActiveWords.length;
      fFlipped = false;
      renderFlashcardMode();
      if (fAutoAudio) {
        if (typeof playWordAudio === "function") playWordAudio(fActiveWords[fIdx]);
        else speak(fActiveWords[fIdx].ru);
      }
    };

    pane.querySelector("#qNavNext").onclick = nextCard;
    pane.querySelector("#qNavPrev").onclick = prevCard;

    // SRS Spaced Repetition Rating
    pane.querySelectorAll(".btn-srs-rate").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const rating = b.dataset.rate;
        if (typeof SRS !== "undefined" && typeof SRS.ensureCard === "function") {
          const cardId = SRS.ensureCard(withJar(currentWord));
          const result = typeof SRS.review === "function" ? SRS.review(cardId, rating) : null;
          // Quên/khó → cho thẻ xuất hiện lại sau vài thẻ nữa trong phiên này
          if (result && result.requeue) {
            const after = typeof SRS_AGAIN_REINSERT_AFTER === "number" ? SRS_AGAIN_REINSERT_AFTER : 5;
            fActiveWords.splice(Math.min(fIdx + 1 + after, fActiveWords.length), 0, currentWord);
          }
          trackFlashReviewed();
        }
        if (fIdx < fActiveWords.length - 1) {
          playQuizletSound(rating === "again" ? "wrong" : "correct");
        }
        nextCard();
      };
    });

    // Theo dõi tiến độ trong phiên học Flashcard: PHẢI HOÀN THÀNH HẾT THẺ MỚI CÓ ĐIỂM CỘNG
    function trackFlashReviewed() {
      let reviewed = STORE.get("flash_rev_" + jarId, []);
      if (!reviewed.includes(currentWord.ru)) {
        reviewed.push(currentWord.ru);
        STORE.set("flash_rev_" + jarId, reviewed);
      }

      // fActiveWords có thể chứa thẻ lặp lại (requeue) → so theo từ khác nhau
      if (fAllRated()) {
        const today = new Date().toDateString();
        const sessKey = "flash_done_" + xpJarId + "_" + today;
        if (!STORE.get(sessKey, false)) {
          STORE.set(sessKey, true);
          STORE.set("flash_rev_" + jarId, []); // reset cho các lượt ôn tập sau
          Progress.markDone("vocabDone", jarId);
          Progress.addXp(15);
          fXpAwarded = true;
          toast("Chúc mừng! Bạn đã hoàn thành toàn bộ thẻ trong lọ từ vựng (+15 XP)!");
        }
      }
    }

    // Đã thuộc → đánh dấu thuộc (như nút ✓ ở Danh sách), tính là đã học thẻ này, sang thẻ tiếp
    pane.querySelector("#qKnowYes").onclick = (e) => {
      e.stopPropagation();
      if (typeof SRS !== "undefined" && typeof SRS.markMastered === "function") {
        SRS.markMastered(withJar(currentWord));
        trackFlashReviewed();
        if (typeof Progress !== "undefined" && typeof Progress.syncToCloud === "function") Progress.syncToCloud();
        window.dispatchEvent(new CustomEvent("trki:progress-updated"));
      }
      if (fIdx < fActiveWords.length - 1) playQuizletSound("correct");
      nextCard();
    };


    // Audio
    pane.querySelector("#qAudioFront").onclick = (e) => {
      e.stopPropagation();
      if (typeof playWordAudio === "function") playWordAudio(currentWord);
      else speak(currentWord.ru);
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

    // Toggle mở rộng / thu gọn ví dụ phụ ở mặt sau
    const moreExBtn = pane.querySelector("#qMoreExToggle");
    if (moreExBtn) {
      moreExBtn.onclick = (e) => {
        e.stopPropagation();
        const moreBox = pane.querySelector("#qMoreExList");
        if (!moreBox) return;
        const isExp = moreExBtn.dataset.expanded === "true";
        moreExBtn.dataset.expanded = isExp ? "false" : "true";
        moreBox.classList.toggle("hidden", isExp);
        const textSpan = moreExBtn.querySelector(".qcard-more-ex-text");
        const remainingCount = Number(moreExBtn.dataset.count || 1);
        if (textSpan) {
          textSpan.textContent = isExp ? `+ Xem thêm ${remainingCount} ví dụ khác ▾` : `Thu gọn ví dụ ▴`;
        }
      };
    }
  };

  // Keyboard shortcut listener for Flashcards & List Preview (Spec 1, Dòng 50 & 64)
  const handleKeydown = (e) => {
    // Bộ học đã bị thay (về hub / mở lọ khác) → gỡ listener cũ
    if (!container.isConnected) {
      document.removeEventListener("keydown", handleKeydown);
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const isEditing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (isEditing) return;

    // Phím Space trong giao diện danh sách từ vựng: lật thẻ xem nhanh (.rusi-vocab-preview-box), phím mũi tên chuyển từ
    if (currentMode === "list") {
      if (e.code === "Space") {
        e.preventDefault();
        const pCard = container.querySelector("#rusiPreviewCard");
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
        syncAnswerZone();
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
  // Mỗi lần mở bộ học tạo hàm mới → gỡ listener của lần mở trước qua biến dùng chung
  if (window.__quizletKeydown) document.removeEventListener("keydown", window.__quizletKeydown);
  window.__quizletKeydown = handleKeydown;
  document.addEventListener("keydown", handleKeydown);

  /* ---------------- MODE 2: LEARN (4 OPTIONS) ---------------- */
  let lQueue = [];
  let lIdx = 0;
  let lScore = 0;
  let lWrongWords = [];
  let lIsRetry = false; // vòng "Ôn lại từ chưa nhớ" không cộng XP
  let lKeydown = null;

  const startLearn = (customList = null) => {
    lQueue = customList ? [...customList] : qShuffleArray([...words]);
    lIsRetry = Boolean(customList);
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
      if (lKeydown) document.removeEventListener("keydown", lKeydown);
      const pct = Math.round((lScore / lQueue.length) * 100);
      // +15 XP tối đa 1 lần/ngày/lọ, không tính vòng ôn lại từ sai
      const learnKey = "learn_done_" + xpJarId + "_" + new Date().toDateString();
      let lXpAwarded = false;
      if (pct >= 70 && !lIsRetry && typeof Progress !== "undefined" && !STORE.get(learnKey, false)) {
        STORE.set(learnKey, true);
        Progress.addXp(15);
        lXpAwarded = true;
      }
      pane.innerHTML = `
        <div class="quizlet-summary-box">
          <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get(pct >= 80 ? "trophy-reward" : pct >= 50 ? "award-badge" : "book-open-blog", { size: 48 }) : ""}</div>
          <h2 style="margin:0 0 8px">Hoàn thành bài Học thông minh!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đạt <b>${lScore}</b> / ${lQueue.length} câu chính xác (${pct}%)
            ${lXpAwarded ? ` · <span style="color:#16a34a;font-weight:700">+15 XP ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""}</span>` : ""}
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

    pane.querySelector("#btnLearnAudio").onclick = () => {
      if (typeof playWordAudio === "function") playWordAudio(currentWord);
      else speak(currentWord.ru);
    };

    const checkAnswer = (chosenOpt, btnElem) => {
      if (answered) return;
      answered = true;
      document.removeEventListener("keydown", learnKeydown);

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
      if (answered || !container.isConnected) {
        document.removeEventListener("keydown", learnKeydown);
        return;
      }
      if (currentMode !== "learn" || e.ctrlKey || e.metaKey || e.altKey) return;
      const active = document.activeElement;
      if (active && (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) || active.isContentEditable)) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const btn = pane.querySelector(`.learn-opt-btn[data-key="${e.key}"]`);
        if (btn) btn.click();
      }
    };
    if (lKeydown) document.removeEventListener("keydown", lKeydown);
    lKeydown = learnKeydown;
    document.addEventListener("keydown", learnKeydown);
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
      // XP Gõ từ: tối đa 1 lần/ngày/lọ (cùng cách với learn_done_ / match_done_)
      const writeKey = "write_done_" + xpJarId + "_" + new Date().toDateString();
      if (pct >= 70 && typeof Progress !== "undefined" && !STORE.get(writeKey, false)) {
        STORE.set(writeKey, true);
        Progress.addXp(20);
      }
      pane.innerHTML = `
        <div class="quizlet-summary-box">
          <div class="quizlet-summary-trophy">${window.RusiIcons ? RusiIcons.get("pen-tool", { size: 48 }) : ""}</div>
          <h2 style="margin:0 0 8px">Hoàn thành phần Gõ từ & Chính tả!</h2>
          <p style="color:var(--muted);font-size:1.1rem;margin:0 0 20px">
            Bạn đã gõ đúng <b>${wCorrect}</b> / ${wQueue.length} từ vựng (${pct}%)
          </p>
          <div class="quizlet-summary-actions" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
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
            <button type="button" class="btn btn-soft btn-sm" id="btnWriteSpeak">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} <span>Nghe phát âm gợi ý</span></button>
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

    pane.querySelector("#btnWriteSpeak").onclick = () => {
      if (typeof playWordAudio === "function") playWordAudio(currentWord);
      else speak(currentWord.ru);
    };

    // Cyrillic keys insert
    pane.querySelectorAll(".cyrillic-key").forEach(kBtn => {
      kBtn.onclick = () => {
        const char = kBtn.dataset.char;
        const start = inp.selectionStart ?? inp.value.length;
        const end = inp.selectionEnd ?? inp.value.length;
        const val = inp.value;
        inp.value = val.substring(0, start) + char + val.substring(end);
        inp.focus();
        inp.setSelectionRange(start + char.length, start + char.length);
      };
    });

    const normalizeWriteAnswer = (str) => {
      const base = (typeof SRS !== "undefined" && typeof SRS._norm === "function")
        ? SRS._norm(str)
        : String(str || "").replace(/[\u0300\u0301]/g, "").toLowerCase().trim();
      return rusiNormalize(base.normalize("NFC")).replace(/\s+/g, " ");
    };

    const form = pane.querySelector("#writeForm");
    form.onsubmit = (e) => {
      if (e) e.preventDefault();
      if (submitted) return false;
      submitted = true;

      const userVal = inp.value.trim();
      const normUser = normalizeWriteAnswer(userVal);
      const normTarget = normalizeWriteAnswer(currentWord.ru || currentWord.stress);
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
          <div style="font-size:1.2rem;font-weight:800;color:var(--primary);margin:6px 0">Đáp án đúng: ${esc(currentWord.stress || currentWord.ru)}</div>
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
              // +25 XP tối đa 1 lần/ngày/lọ
              const matchKey = "match_done_" + xpJarId + "_" + new Date().toDateString();
              let matchXpAwarded = false;
              if (typeof Progress !== "undefined" && !STORE.get(matchKey, false)) {
                STORE.set(matchKey, true);
                Progress.addXp(25);
                matchXpAwarded = true;
              }

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
                  ${matchXpAwarded ? `<p style="color:var(--muted);margin-bottom:20px">+25 XP thưởng tốc độ ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""}</p>` : ""}
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
          // Truyền object từ đầy đủ (ru/vi/pos/ex) để thẻ SRS mới không thiếu nghĩa
          const wordObj = words.find(w => (w.ru || "").toLowerCase().trim() === norm);
          SRS.markMastered(withJar(wordObj) || ruWord);
        }
      }
      if (typeof STORE !== "undefined") STORE.set("vocab_mastered_words", list);
      if (typeof Progress !== "undefined" && typeof Progress.syncToCloud === "function") {
        Progress.syncToCloud();
      }
      window.dispatchEvent(new CustomEvent("trki:progress-updated"));
      return isMastered;
    };

    const renderListUI = () => {
      const starredList = getQuizletStarred().map(s => s.toLowerCase());
      const masteredList = getMasteredWords().map(s => s.toLowerCase().trim());

      const starredCount = words.filter(w => starredList.includes(w.ru.toLowerCase())).length;
      const masteredCount = words.filter(w => masteredList.includes(w.ru.toLowerCase().trim())).length;

      // Filter and sort words
      const qNorm = rusiNormalize(searchTxt);
      let filtered = words.filter(w => {
        if (filterMode === "starred" && !starredList.includes(w.ru.toLowerCase())) return false;
        if (filterMode === "mastered" && !masteredList.includes(w.ru.toLowerCase().trim())) return false;
        if (!qNorm) return true;
        const hay = rusiNormalize(w.ru + " " + (w.stress || "") + " " + w.vi + " " + (w.note || "") + " " + (w.ex || "") + " " + (w.syn || ""));
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
        <div class="rusi-vocab-test-container">
          <!-- WORD ROW CARDS LIST (RUSI style với hỗ trợ Click mở rộng chi tiết) -->
          <div class="rusi-vocab-list-wrap" id="rusiVocabRowsList">
            ${filtered.length === 0 ? `
              <div class="rusi-vocab-empty">
                <div style="margin-bottom:8px;color:var(--muted)">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 40 }) : ""}</div>
                <h4 style="margin:0 0 4px;font-size:1.1rem;color:var(--text)">Không tìm thấy từ vựng</h4>
                <p style="margin:0;font-size:0.88rem;color:var(--muted)">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
              </div>
            ` : filtered.map((w, idx) => {
              const isStarred = starredList.includes(w.ru.toLowerCase());
              const isMastered = masteredList.includes(w.ru.toLowerCase().trim());
              const displayWord = w.stress || w.ru;
              const structStr = (Array.isArray(w.structures) && w.structures.length)
                ? w.structures.map(s => typeof s === "string" ? s : (s && (s.structure || s.ru || s.text) || "")).filter(Boolean).join(" · ")
                : (w.verb_obj || w.gov || "");

              // Khử trùng lặp giữa Cụm từ và Cấu trúc
              const collClean = (w.collocation || "").trim();
              const structClean = (structStr || "").trim();
              const isCollDuplicate = collClean && structClean && (
                collClean.toLowerCase() === structClean.toLowerCase() ||
                structClean.toLowerCase().includes(collClean.toLowerCase())
              );
              const showCollocation = collClean && !isCollDuplicate;
              const showStruct = Boolean(structClean);

              // Khử trùng lặp Ghi chú nếu nội dung trùng với từ loại ở Cột 1
              const noteClean = (w.note || "").trim();
              const wordTypeStr = (getWordType(w) || "").trim().toLowerCase();
              const posClean = (w.pos || "").trim().toLowerCase();
              const isNoteSameAsType = noteClean && (
                noteClean.toLowerCase() === posClean ||
                noteClean.toLowerCase() === wordTypeStr ||
                (wordTypeStr && wordTypeStr.includes(noteClean.toLowerCase())) ||
                (posClean && posClean.includes(noteClean.toLowerCase()))
              );
              const hasNote = Boolean(noteClean && !isNoteSameAsType);
              const hasExtras = Boolean(showCollocation || showStruct || w.syn || w.ant || hasNote);

              return `
                <div class="rusi-vocab-row-card ${isMastered ? "mastered" : ""}" data-ru="${esc(w.ru)}" data-idx="${idx}">
                  <!-- SPEC 1: BỐ CỤC 3 PHẦN TRỰC QUAN -->
                  <div class="rusi-row-main-grid">
                    <!-- CỘT 1 (TRÁI): TỪ TIẾNG NGA IN ĐẬM KÈM TRỌNG ÂM & TỪ LOẠI -->
                    <div class="rusi-row-col-ru">
                      <div class="rusi-row-ru-header">
                        <span class="rusi-row-ru ru">${esc(displayWord)}</span>
                      </div>
                      ${getWordType(w) ? `<div class="rusi-row-pos-line">(${esc(getWordType(w))})</div>` : ""}
                    </div>

                    <!-- CỘT 2 (GIỮA): NGHĨA TIẾNG VIỆT & CÂU VÍ DỤ SONG NGỮ, CỤM TỪ, CẤU TRÚC / QUẢN CÁCH, ĐỒNG/TRÁI NGHĨA, GHI CHÚ (HIỂN THỊ ĐẦY ĐỦ TRỰC TIẾP) -->
                    <div class="rusi-row-col-vi">
                      <div class="rusi-row-vi-text">${esc(w.vi)}</div>
                      ${w.ex ? `
                        <div class="rusi-row-ex-wrap">
                          <div class="rusi-row-ex-line">
                            <span class="rusi-row-ex ru">${esc(w.ex)}</span>
                          </div>
                          ${w.ex_vi ? `<div class="rusi-row-ex-vi">${esc(w.ex_vi)}</div>` : ""}
                        </div>
                      ` : ""}
                      ${hasExtras ? `
                        <div class="rusi-row-expanded-details" style="display:block">
                          ${showCollocation ? `
                            <div class="rusi-row-extra-line">
                              <span class="rusi-row-extra-label">Cụm từ:</span>
                              <span class="rusi-row-extra-val ru">${esc(collClean)}</span>
                            </div>
                          ` : ""}
                          ${showStruct ? `
                            <div class="rusi-row-extra-line">
                              <span class="rusi-row-extra-label">Cấu trúc / Quản cách:</span>
                              <span class="rusi-row-extra-val ru">${esc(structClean)}</span>
                            </div>
                          ` : ""}
                          ${w.syn ? `
                            <div class="rusi-row-extra-line">
                              <span class="rusi-row-extra-label">Đồng nghĩa:</span>
                              <span class="rusi-row-extra-val ru">${esc(w.syn)}</span>
                            </div>
                          ` : ""}
                          ${w.ant ? `
                            <div class="rusi-row-extra-line">
                              <span class="rusi-row-extra-label">Trái nghĩa / Gần nghĩa:</span>
                              <span class="rusi-row-extra-val ru">${esc(w.ant)}</span>
                            </div>
                          ` : ""}
                          ${hasNote ? `
                            <div class="rusi-row-extra-line">
                              <span class="rusi-row-extra-label">Ghi chú:</span>
                              <span class="rusi-row-extra-val">${esc(w.note)}</span>
                            </div>
                          ` : ""}
                        </div>
                      ` : ""}
                    </div>

                    <!-- CỘT 3 (PHẢI): BỘ NÚT HÀNH ĐỘNG (AUDIO, ĐÃ THUỘC, TRA CÁCH CHIA, LƯU LỌ) -->
                    <div class="rusi-row-col-actions">
                      <button type="button" class="rusi-action-icon-btn btn-speak-item" data-ru="${esc(w.ru)}" data-audio="${esc(w.audio_url || w.audio || '')}" title="Phát âm tiếng Nga (icon volume-high)">
                        ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""}
                      </button>
                      <button type="button" class="rusi-action-icon-btn btn-master-item ${isMastered ? "mastered" : ""}" data-ru="${esc(w.ru)}" title="${isMastered ? "Đã thuộc (Nhấn để hủy)" : "Đánh dấu đã thuộc"}">
                        ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""}
                      </button>
                      <button type="button" class="rusi-action-icon-btn btn-addjar-item" data-ru="${esc(w.ru)}" data-stress="${esc(w.stress || w.ru)}" data-vi="${esc(w.vi)}" data-note="${esc(w.note || "")}" data-ex="${esc(w.ex || "")}" data-exvi="${esc(w.ex_vi || "")}" title="Lưu vào Lọ cá nhân (icon archive-jar)">
                        ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""}
                      </button>
                      ${isCustomJar ? `
                        <button type="button" class="rusi-action-icon-btn btn-delword-item" style="color:var(--red)" data-ru="${esc(w.ru)}" title="Xóa từ khỏi lọ này">
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
      const pCard = pane.querySelector("#rusiPreviewCard");
      if (pCard) {
        pCard.onclick = (e) => {
          if (e.target.closest("button")) return;
          previewFlipped = !previewFlipped;
          pCard.classList.toggle("flipped", previewFlipped);
        };
      }

      // Preview Audio (hỗ trợ nút ở mặt trước, mặt sau và thanh điều khiển)
      pane.querySelectorAll(".rusi-preview-audio-btn, #btnPreviewAudioNav").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const curWord = previewWords[previewIdx];
          if (curWord) {
            if (typeof playWordAudio === "function") playWordAudio(curWord);
            else speak(curWord.ru);
          }
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

      // Row card click to preview word in top box (nếu có khung preview trên cùng)
      const pCardElem = pane.querySelector("#rusiPreviewCard");
      if (pCardElem) {
        pane.querySelectorAll(".rusi-vocab-row-card").forEach((card) => {
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
      }

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
              const pBox = pane.querySelector(".rusi-vocab-preview-box");
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
          if (typeof playWordAudio === "function") {
            playWordAudio(b.dataset.ru, b.dataset.audio);
          } else {
            speak(b.dataset.ru);
          }
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
            if (confirm(`Bạn có chắc muốn xóa từ “${wordRu}” khỏi lọ này không?`)) {
              let jars = (typeof STORE !== "undefined") ? STORE.get("custom_jars", []) : [];
              const target = jars.find(j => String(j.id) === String(jarId));
              if (target && target.words) {
                target.words = target.words.filter(w => (w.ru || "").trim() !== wordRu.trim());
                STORE.set("custom_jars", jars);
                toast(`Đã xóa từ “${wordRu}” khỏi lọ!`);
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


/* =====================================================================
 * RUSI MODULAR PAGE ROUTER & DYNAMIC MODULE LOADER
 * Tự động nạp module chuyên biệt theo nhu cầu của từng trang (0-Latency)
 * ===================================================================== */
function _loadPageModule(moduleSrc, callback) {
  if (document.querySelector('script[src*="' + moduleSrc + '"]')) {
    if (callback) callback();
    return;
  }
  let root = '';
  if (typeof window !== 'undefined') {
    const path = window.location.pathname || '';
    if (path.startsWith('/rusitrki/')) root = '/rusitrki/';
    else {
      const segs = path.replace(/^\//, '').split('/').filter(Boolean);
      if (segs.length > 1) root = '/';
    }
  }
  const s = document.createElement("script");
  s.src = root + moduleSrc + "?v=1.0";
  s.onload = () => { if (callback) callback(); };
  s.onerror = (e) => console.error("[RusiRouter] Không thể nạp module: " + moduleSrc, e);
  document.head.appendChild(s);
}

window.initVocabPage = function(...args) {
  _loadPageModule("js/pages/page-vocab.js", () => {
    if (typeof window._initVocabPage === "function") window._initVocabPage(...args);
    else if (typeof initVocabPage === "function" && initVocabPage !== window.initVocabPage) initVocabPage(...args);
  });
};

window.initListeningPage = function(...args) {
  _loadPageModule("js/pages/page-listening.js", () => {
    if (typeof window._initListeningPage === "function") window._initListeningPage(...args);
    else if (typeof initListeningPage === "function" && initListeningPage !== window.initListeningPage) initListeningPage(...args);
  });
};

window.initSpeakingPage = function(...args) {
  _loadPageModule("js/pages/page-speaking.js", () => {
    if (typeof window._initSpeakingPage === "function") window._initSpeakingPage(...args);
    else if (typeof initSpeakingPage === "function" && initSpeakingPage !== window.initSpeakingPage) initSpeakingPage(...args);
  });
};

window.initWritingPage = function(...args) {
  _loadPageModule("js/pages/page-writing.js", () => {
    if (typeof window._initWritingPage === "function") window._initWritingPage(...args);
    else if (typeof initWritingPage === "function" && initWritingPage !== window.initWritingPage) initWritingPage(...args);
  });
};

window.initMockTestPage = function(...args) {
  _loadPageModule("js/pages/page-mock-test.js", () => {
    if (typeof window._initMockTestPage === "function") window._initMockTestPage(...args);
    else if (typeof initMockTestPage === "function" && initMockTestPage !== window.initMockTestPage) initMockTestPage(...args);
  });
};

window.initBlogPage = function(...args) {
  _loadPageModule("js/pages/page-blog.js", () => {
    if (typeof window._initBlogPage === "function") window._initBlogPage(...args);
    else if (typeof initBlogPage === "function" && initBlogPage !== window.initBlogPage) initBlogPage(...args);
  });
};

window.initShopPage = function(...args) {
  _loadPageModule("js/pages/page-shop.js", () => {
    if (typeof window._initShopPage === "function") window._initShopPage(...args);
    else if (typeof initShopPage === "function" && initShopPage !== window.initShopPage) initShopPage(...args);
  });
};

window.initIndexPage = function(...args) {
  _loadPageModule("js/pages/page-index.js", () => {
    if (typeof window._initIndexPage === "function") window._initIndexPage(...args);
    else if (typeof initIndexPage === "function" && initIndexPage !== window.initIndexPage) initIndexPage(...args);
  });
};

window.initUpgradePage = function(...args) {
  _loadPageModule("js/pages/page-upgrade.js", () => {
    if (typeof window._initUpgradePage === "function") window._initUpgradePage(...args);
    else if (typeof initUpgradePage === "function" && initUpgradePage !== window.initUpgradePage) initUpgradePage(...args);
  });
};
