/**
 * ============================================================================
 * RUSI TRKI — TÍNH NĂNG ĐỒNG HỒ TẬP TRUNG POMODORO TIMER
 * Quy chuẩn: Thiết lập kéo thanh trượt sinh động, đếm ngược thời gian,
 *            màn hình nghỉ to toàn màn hình, nút bỏ qua nghỉ, nút đóng X,
 *            âm thanh Web Audio API & dòng trạng thái tiếp tục chu kỳ.
 * ============================================================================
 */

(function () {
  "use strict";

  // Web Audio Chime Generator
  function playPomoSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      function playTone(freq, start, duration, gainVal) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        gain.gain.setValueAtTime(gainVal || 0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      }

      if (type === "focus_end") {
        // Chuông báo hết giờ học, đến giờ nghỉ (523Hz -> 659Hz)
        playTone(523.25, 0, 0.5, 0.35);
        playTone(659.25, 0.22, 0.8, 0.35);
      } else if (type === "break_end") {
        // Chuông báo hết giờ nghỉ, sẵn sàng vào học (587Hz -> 740Hz -> 880Hz)
        playTone(587.33, 0, 0.35, 0.3);
        playTone(739.99, 0.18, 0.35, 0.3);
        playTone(880.00, 0.36, 0.9, 0.4);
      }
    } catch (_) {}
  }

  const STORAGE_KEY = "rusi_pomodoro_state";

  const Pomodoro = {
    // Cấu hình (phút)
    focusMin: 25,
    breakMin: 5,
    totalCycles: 4,

    // Trạng thái runtime
    currentCycle: 1,
    phase: "idle", // 'idle' | 'focus' | 'break' | 'completed'
    remainingSeconds: 25 * 60,
    isRunning: false,
    timerId: null,
    isBreakOverlayDismissed: false,

    init: function () {
      this.loadSettings();
      this.createDOM();
      this.bindEvents();
      this.updateUI();
    },

    loadSettings: function () {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        if (saved.focusMin) this.focusMin = Number(saved.focusMin) || 25;
        if (saved.breakMin) this.breakMin = Number(saved.breakMin) || 5;
        if (saved.totalCycles) this.totalCycles = Number(saved.totalCycles) || 4;
        this.remainingSeconds = this.focusMin * 60;
      } catch (_) {}
    },

    saveSettings: function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          focusMin: this.focusMin,
          breakMin: this.breakMin,
          totalCycles: this.totalCycles
        }));
      } catch (_) {}
    },

    createDOM: function () {
      // 1. Floating Launcher Button
      if (!document.getElementById("pomoFloatBtn")) {
        const floatBtn = document.createElement("button");
        floatBtn.id = "pomoFloatBtn";
        floatBtn.className = "pomo-float-btn";
        floatBtn.type = "button";
        floatBtn.innerHTML = `🍅 <span>Pomodoro</span>`;
        floatBtn.title = "Mở đồng hồ tập trung Pomodoro";
        document.body.appendChild(floatBtn);
      }

      // 2. Control Modal Backdrop
      if (!document.getElementById("pomoModalBackdrop")) {
        const modal = document.createElement("div");
        modal.id = "pomoModalBackdrop";
        modal.className = "pomo-modal-backdrop";
        modal.innerHTML = `
          <div class="pomo-modal-card">
            <div class="pomo-modal-header">
              <h3 class="pomo-modal-title">
                <span>🍅</span> Đồng Hồ Tập Trung Pomodoro
              </h3>
              <button type="button" class="pomo-modal-close" id="btnPomoCloseModal" title="Đóng">&times;</button>
            </div>

            <!-- SLIDERS CONFIG (CHỈNH SỬA KHI CHƯA CHẠY HOẶC IDLE) -->
            <div id="pomoSettingsPanel">
              <div class="pomo-slider-group">
                <div class="pomo-slider-label">
                  <span>Thời gian tập trung (Focus)</span>
                  <span class="pomo-slider-val-badge" id="valFocusBadge">25 phút</span>
                </div>
                <input type="range" min="5" max="60" step="5" value="25" class="pomo-range-input" id="sliderFocus">
              </div>

              <div class="pomo-slider-group">
                <div class="pomo-slider-label">
                  <span>Thời gian nghỉ ngơi (Break)</span>
                  <span class="pomo-slider-val-badge" id="valBreakBadge">5 phút</span>
                </div>
                <input type="range" min="1" max="30" step="1" value="5" class="pomo-range-input" id="sliderBreak">
              </div>

              <div class="pomo-slider-group">
                <div class="pomo-slider-label">
                  <span>Số chu kỳ Pomodoro</span>
                  <span class="pomo-slider-val-badge" id="valCyclesBadge">4 chu kỳ</span>
                </div>
                <input type="range" min="1" max="8" step="1" value="4" class="pomo-range-input" id="sliderCycles">
              </div>

              <div class="pomo-presets-row">
                <button type="button" class="pomo-preset-btn" data-f="25" data-b="5" data-c="4">Tiêu chuẩn: 25/5 · 4 chu kỳ</button>
                <button type="button" class="pomo-preset-btn" data-f="50" data-b="10" data-c="3">Chuyên sâu: 50/10 · 3 chu kỳ</button>
                <button type="button" class="pomo-preset-btn" data-f="15" data-b="3" data-c="4">Cấp tốc: 15/3 · 4 chu kỳ</button>
              </div>
            </div>

            <!-- COUNTDOWN DISPLAY -->
            <div class="pomo-display-box" id="pomoDisplayBox">
              <div class="pomo-display-phase" id="pomoPhaseText">SẴN SÀNG TẬP TRUNG</div>
              <div class="pomo-display-time" id="pomoTimeText">25:00</div>
              <div class="pomo-display-cycle" id="pomoCycleText">Chu kỳ 1 / 4</div>
            </div>

            <!-- CONTROLS ROW -->
            <div class="pomo-controls-row">
              <button type="button" class="pomo-btn-main" id="btnPomoStart">
                Bắt đầu học
              </button>
              <button type="button" class="pomo-btn-reset" id="btnPomoReset">
                Thiết lập lại
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      // 3. Big Break Screen Overlay (Màn hình nghỉ to toàn màn hình)
      if (!document.getElementById("pomoBreakOverlay")) {
        const breakOverlay = document.createElement("div");
        breakOverlay.id = "pomoBreakOverlay";
        breakOverlay.className = "pomo-break-overlay";
        breakOverlay.style.display = "none";
        breakOverlay.innerHTML = `
          <div class="pomo-break-box">
            <button type="button" class="pomo-break-close" id="btnPomoDismissBreak" title="Đóng màn hình nhưng vẫn tiếp tục chạy giờ nghỉ">&times;</button>
            <span class="pomo-break-badge">☕ ĐÃ ĐẾN GIỜ NGHỈ NGƠI!</span>
            <h2 class="pomo-break-title">Thư giãn và nạp lại năng lượng nhé</h2>
            <p class="pomo-break-desc">
              Hãy rời mắt khỏi màn hình, uống một ngụm nước ấm và thả lỏng vai gáy trong khoảng thời gian này.
            </p>
            <div class="pomo-break-countdown" id="pomoBreakCountdown">05:00</div>
            <div class="pomo-break-cycle-info" id="pomoBreakCycleInfo">Nghỉ giữa Chu kỳ 1 và Chu kỳ 2</div>
            <div class="pomo-break-quote">
              «Отдых — это не безделье, а смена деятельности.»<br>
              <span>(Nghỉ ngơi không phải là lười biếng, mà là chuyển đổi năng lượng để tiếp tục bứt phá.)</span>
            </div>
            <div class="pomo-break-actions">
              <button type="button" class="pomo-btn-skip" id="btnPomoSkipBreak">
                Bỏ qua không nghỉ (Bắt đầu chu kỳ tiếp theo →)
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(breakOverlay);
      }

      // 4. Toast Continue Bar (Khi hết giờ nghỉ)
      if (!document.getElementById("pomoToastContinue")) {
        const toast = document.createElement("div");
        toast.id = "pomoToastContinue";
        toast.className = "pomo-toast-continue";
        toast.style.display = "none";
        toast.innerHTML = `
          <span id="pomoToastText">🔔 <b>Đã hết giờ nghỉ!</b> Bạn đã sẵn sàng bước vào Chu kỳ tiếp theo chưa?</span>
          <button type="button" id="btnPomoContinueNext">Bắt đầu ngay →</button>
        `;
        document.body.appendChild(toast);
      }
    },

    bindEvents: function () {
      const floatBtn = document.getElementById("pomoFloatBtn");
      const modal = document.getElementById("pomoModalBackdrop");
      const btnClose = document.getElementById("btnPomoCloseModal");
      const btnStart = document.getElementById("btnPomoStart");
      const btnReset = document.getElementById("btnPomoReset");

      const sliderFocus = document.getElementById("sliderFocus");
      const sliderBreak = document.getElementById("sliderBreak");
      const sliderCycles = document.getElementById("sliderCycles");

      const btnDismissBreak = document.getElementById("btnPomoDismissBreak");
      const btnSkipBreak = document.getElementById("btnPomoSkipBreak");
      const btnContinueNext = document.getElementById("btnPomoContinueNext");

      // Toggle modal
      if (floatBtn && modal) {
        floatBtn.onclick = () => {
          modal.classList.add("open");
        };
      }
      if (btnClose && modal) {
        btnClose.onclick = () => {
          modal.classList.remove("open");
        };
      }
      if (modal) {
        modal.onclick = (e) => {
          if (e.target === modal) modal.classList.remove("open");
        };
      }

      // Sliders input
      if (sliderFocus) {
        sliderFocus.value = this.focusMin;
        sliderFocus.oninput = (e) => {
          this.focusMin = Number(e.target.value);
          document.getElementById("valFocusBadge").textContent = this.focusMin + " phút";
          if (this.phase === "idle") {
            this.remainingSeconds = this.focusMin * 60;
            this.updateUI();
          }
          this.saveSettings();
        };
      }

      if (sliderBreak) {
        sliderBreak.value = this.breakMin;
        sliderBreak.oninput = (e) => {
          this.breakMin = Number(e.target.value);
          document.getElementById("valBreakBadge").textContent = this.breakMin + " phút";
          this.saveSettings();
        };
      }

      if (sliderCycles) {
        sliderCycles.value = this.totalCycles;
        sliderCycles.oninput = (e) => {
          this.totalCycles = Number(e.target.value);
          document.getElementById("valCyclesBadge").textContent = this.totalCycles + " chu kỳ";
          this.updateUI();
          this.saveSettings();
        };
      }

      // Presets
      document.querySelectorAll(".pomo-preset-btn").forEach((btn) => {
        btn.onclick = () => {
          this.focusMin = Number(btn.dataset.f);
          this.breakMin = Number(btn.dataset.b);
          this.totalCycles = Number(btn.dataset.c);

          if (sliderFocus) sliderFocus.value = this.focusMin;
          if (sliderBreak) sliderBreak.value = this.breakMin;
          if (sliderCycles) sliderCycles.value = this.totalCycles;

          document.getElementById("valFocusBadge").textContent = this.focusMin + " phút";
          document.getElementById("valBreakBadge").textContent = this.breakMin + " phút";
          document.getElementById("valCyclesBadge").textContent = this.totalCycles + " chu kỳ";

          if (this.phase === "idle") {
            this.remainingSeconds = this.focusMin * 60;
            this.updateUI();
          }
          this.saveSettings();
        };
      });

      // Start / Pause
      if (btnStart) {
        btnStart.onclick = () => {
          if (this.isRunning) {
            this.pause();
          } else {
            this.start();
          }
        };
      }

      // Reset
      if (btnReset) {
        btnReset.onclick = () => {
          this.reset();
        };
      }

      // Dismiss break overlay (dấu X)
      if (btnDismissBreak) {
        btnDismissBreak.onclick = () => {
          this.isBreakOverlayDismissed = true;
          document.getElementById("pomoBreakOverlay").style.display = "none";
        };
      }

      // Bỏ qua không nghỉ
      if (btnSkipBreak) {
        btnSkipBreak.onclick = () => {
          this.skipBreak();
        };
      }

      // Tiếp tục chu kỳ tiếp theo từ toast
      if (btnContinueNext) {
        btnContinueNext.onclick = () => {
          document.getElementById("pomoToastContinue").style.display = "none";
          this.startNextFocusCycle();
        };
      }
    },

    start: function () {
      if (this.phase === "idle") {
        this.phase = "focus";
        this.remainingSeconds = this.focusMin * 60;
      }
      this.isRunning = true;
      clearInterval(this.timerId);
      this.timerId = setInterval(() => this.tick(), 1000);
      this.updateUI();
    },

    pause: function () {
      this.isRunning = false;
      clearInterval(this.timerId);
      this.updateUI();
    },

    reset: function () {
      this.isRunning = false;
      clearInterval(this.timerId);
      this.phase = "idle";
      this.currentCycle = 1;
      this.remainingSeconds = this.focusMin * 60;
      this.isBreakOverlayDismissed = false;
      document.getElementById("pomoBreakOverlay").style.display = "none";
      document.getElementById("pomoToastContinue").style.display = "none";
      document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
      this.updateUI();
    },

    tick: function () {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateUI();
      } else {
        // Hết thời gian của giai đoạn hiện tại
        if (this.phase === "focus") {
          this.onFocusEnded();
        } else if (this.phase === "break") {
          this.onBreakEnded();
        }
      }
    },

    onFocusEnded: function () {
      this.pause();
      playPomoSound("focus_end");

      if (this.currentCycle >= this.totalCycles) {
        // Đã hoàn thành toàn bộ chu kỳ
        this.phase = "completed";
        alert("🎉 Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ " + this.totalCycles + " chu kỳ Pomodoro hôm nay! Tinh thần tập trung tuyệt vời!");
        if (typeof window.XP !== "undefined" && window.XP.add) {
          window.XP.add(25);
        }
        this.reset();
        return;
      }

      // Chuyển sang giai đoạn nghỉ ngơi
      this.phase = "break";
      this.remainingSeconds = this.breakMin * 60;
      this.isBreakOverlayDismissed = false;
      this.isRunning = true;
      this.timerId = setInterval(() => this.tick(), 1000);

      // Hiển thị màn hình nghỉ to
      const breakOverlay = document.getElementById("pomoBreakOverlay");
      if (breakOverlay) {
        breakOverlay.style.display = "flex";
        const cycleInfo = document.getElementById("pomoBreakCycleInfo");
        if (cycleInfo) {
          cycleInfo.textContent = `Nghỉ giữa Chu kỳ ${this.currentCycle} và Chu kỳ ${this.currentCycle + 1} (${this.breakMin} phút)`;
        }
      }

      this.updateUI();
    },

    onBreakEnded: function () {
      this.pause();
      playPomoSound("break_end");

      document.getElementById("pomoBreakOverlay").style.display = "none";
      this.isBreakOverlayDismissed = false;

      this.currentCycle++;

      // Hiển thị 1 dòng trạng thái tiếp tục
      const toast = document.getElementById("pomoToastContinue");
      if (toast) {
        toast.style.display = "flex";
        const toastText = document.getElementById("pomoToastText");
        if (toastText) {
          toastText.innerHTML = `🔔 <b>Đã hết giờ nghỉ!</b> Bạn đã sẵn sàng bước vào <b>Chu kỳ ${this.currentCycle} / ${this.totalCycles}</b> chưa?`;
        }
      }

      this.phase = "idle";
      this.remainingSeconds = this.focusMin * 60;
      this.updateUI();
    },

    skipBreak: function () {
      this.pause();
      document.getElementById("pomoBreakOverlay").style.display = "none";
      this.isBreakOverlayDismissed = false;
      this.currentCycle++;
      this.startNextFocusCycle();
    },

    startNextFocusCycle: function () {
      document.getElementById("pomoToastContinue").style.display = "none";
      this.phase = "focus";
      this.remainingSeconds = this.focusMin * 60;
      this.start();
    },

    formatTime: function (secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    },

    updateUI: function () {
      const timeStr = this.formatTime(this.remainingSeconds);

      // 1. Time display
      const timeEl = document.getElementById("pomoTimeText");
      if (timeEl) timeEl.textContent = timeStr;

      const breakCountdown = document.getElementById("pomoBreakCountdown");
      if (breakCountdown) breakCountdown.textContent = timeStr;

      // 2. Phase text
      const phaseEl = document.getElementById("pomoPhaseText");
      if (phaseEl) {
        if (this.phase === "focus") {
          phaseEl.textContent = "🧠 ĐANG TẬP TRUNG HỌC";
          phaseEl.style.color = "#38bdf8";
        } else if (this.phase === "break") {
          phaseEl.textContent = "☕ ĐANG TRONG THỜI GIAN NGHỈ";
          phaseEl.style.color = "#4ade80";
        } else {
          phaseEl.textContent = "SẴN SÀNG TẬP TRUNG";
          phaseEl.style.color = "#94a3b8";
        }
      }

      // 3. Cycle text
      const cycleEl = document.getElementById("pomoCycleText");
      if (cycleEl) {
        cycleEl.textContent = `Chu kỳ ${this.currentCycle} / ${this.totalCycles}`;
      }

      // 4. Button Start/Pause text
      const btnStart = document.getElementById("btnPomoStart");
      if (btnStart) {
        if (this.isRunning) {
          btnStart.innerHTML = `Tạm dừng`;
          btnStart.style.background = "#ea580c";
        } else {
          btnStart.innerHTML = (this.phase === "focus" || this.phase === "break") ? `Tiếp tục` : `Bắt đầu học`;
          btnStart.style.background = "#c52233";
        }
      }

      // 5. Settings panel disabled while running
      const settingsPanel = document.getElementById("pomoSettingsPanel");
      if (settingsPanel) {
        settingsPanel.style.opacity = (this.isRunning || this.phase !== "idle") ? "0.45" : "1";
        settingsPanel.style.pointerEvents = (this.isRunning || this.phase !== "idle") ? "none" : "auto";
      }

      // 6. Floating button status
      const floatBtn = document.getElementById("pomoFloatBtn");
      if (floatBtn) {
        floatBtn.classList.toggle("is-running", this.isRunning && this.phase === "focus");
        floatBtn.classList.toggle("is-break", this.isRunning && this.phase === "break");

        if (this.isRunning) {
          floatBtn.innerHTML = `🍅 <span>${timeStr} (${this.currentCycle}/${this.totalCycles})</span>`;
          document.title = `(${timeStr}) Pomodoro · RUSI TRKI`;
        } else {
          floatBtn.innerHTML = `🍅 <span>Pomodoro</span>`;
          document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
        }
      }
    }
  };

  // Expose to window
  window.RusiPomodoro = Pomodoro;

  // Auto initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Pomodoro.init();
    });
  } else {
    Pomodoro.init();
  }
})();
