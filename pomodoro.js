/**
 * ============================================================================
 * RUSI TRKI — TÍNH NĂNG ĐỒNG HỒ TẬP TRUNG POMODORO TIMER
 * Quy chuẩn:
 * - Chỉ hiển thị khi người dùng đã đăng nhập tài khoản.
 * - Khi click vào nút Pomodoro: Hiển thị dropdown popover nhỏ gọn ngay dưới nút,
 *   gồm 3 thanh kéo nhỏ bé (Tập trung, Nghỉ ngơi, Chu kỳ), đồng hồ hiển thị và nút điều khiển.
 * - Đồng bộ thời gian thực cho TẤT CẢ các tab qua localStorage và timestamp targetEndTime.
 * - Không bị mất thời gian khi chuyển trang hoặc reload.
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
        playTone(523.25, 0, 0.45, 0.35);
        playTone(659.25, 0.22, 0.7, 0.35);
      } else if (type === "break_end") {
        playTone(587.33, 0, 0.3, 0.3);
        playTone(739.99, 0.16, 0.3, 0.3);
        playTone(880.00, 0.32, 0.8, 0.35);
      }
    } catch (_) {}
  }

  const STORAGE_KEY = "rusi_pomodoro_state";

  const Pomodoro = {
    focusMin: 25,
    breakMin: 5,
    totalCycles: 4,

    currentCycle: 1,
    phase: "idle", // 'idle' | 'focus' | 'break' | 'completed'
    remainingSeconds: 25 * 60,
    targetEndTime: null, // Timestamp ms khi đang chạy
    isRunning: false,
    timerId: null,

    init: function () {
      this.loadState();
      this.createDOM();
      this.bindEvents();
      this.bindStorageSync();
      this.updateUI();
    },

    loadState: function () {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        if (saved.focusMin) this.focusMin = Number(saved.focusMin) || 25;
        if (saved.breakMin) this.breakMin = Number(saved.breakMin) || 5;
        if (saved.totalCycles) this.totalCycles = Number(saved.totalCycles) || 4;
        if (saved.currentCycle) this.currentCycle = Number(saved.currentCycle) || 1;
        if (saved.phase) this.phase = saved.phase;

        if (saved.isRunning && saved.targetEndTime) {
          const now = Date.now();
          const diff = Math.round((saved.targetEndTime - now) / 1000);
          if (diff > 0) {
            this.remainingSeconds = diff;
            this.targetEndTime = saved.targetEndTime;
            this.isRunning = true;
            this.startTicker();
          } else {
            // Hết giờ trong lúc chuyển trang
            this.isRunning = false;
            this.targetEndTime = null;
            if (this.phase === "focus") {
              this.onFocusEnded();
            } else if (this.phase === "break") {
              this.onBreakEnded();
            } else {
              this.remainingSeconds = this.focusMin * 60;
              this.phase = "idle";
            }
          }
        } else {
          this.isRunning = false;
          this.targetEndTime = null;
          this.remainingSeconds = typeof saved.remainingSeconds === "number" ? saved.remainingSeconds : (this.focusMin * 60);
        }
      } catch (_) {
        this.remainingSeconds = this.focusMin * 60;
      }
    },

    saveState: function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          focusMin: this.focusMin,
          breakMin: this.breakMin,
          totalCycles: this.totalCycles,
          currentCycle: this.currentCycle,
          phase: this.phase,
          remainingSeconds: this.remainingSeconds,
          targetEndTime: this.targetEndTime,
          isRunning: this.isRunning,
          updatedAt: Date.now()
        }));
      } catch (_) {}
    },

    bindStorageSync: function () {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.loadState();
          this.updateUI();
        }
      });
    },

    createDOM: function () {
      // Ẩn modal cũ nếu còn tồn tại
      const oldModal = document.getElementById("pomoModalBackdrop");
      if (oldModal) oldModal.remove();

      // Dropdown Popover nhỏ gọn được gắn vào header
      let popover = document.getElementById("pomoPopoverDropdown");
      if (!popover) {
        popover = document.createElement("div");
        popover.id = "pomoPopoverDropdown";
        popover.className = "pomo-popover-dropdown";
        popover.style.display = "none";
        popover.innerHTML = `
          <div class="pomo-pop-header">
            <span class="pomo-pop-title">🍅 Đồng Hồ Pomodoro</span>
            <button type="button" class="pomo-pop-close" id="pomoPopClose" title="Đóng">&times;</button>
          </div>

          <!-- 3 THANH KÉO NHỎ BÉ -->
          <div class="pomo-pop-sliders" id="pomoPopSlidersBox">
            <div class="pomo-pop-slider-row">
              <div class="pomo-pop-slider-info">
                <span>Tập trung</span>
                <b id="pomoPopFocusBadge">${this.focusMin} phút</b>
              </div>
              <input type="range" min="5" max="60" step="5" value="${this.focusMin}" class="pomo-pop-range" id="pomoPopFocusRange">
            </div>

            <div class="pomo-pop-slider-row">
              <div class="pomo-pop-slider-info">
                <span>Nghỉ ngơi</span>
                <b id="pomoPopBreakBadge">${this.breakMin} phút</b>
              </div>
              <input type="range" min="1" max="30" step="1" value="${this.breakMin}" class="pomo-pop-range" id="pomoPopBreakRange">
            </div>

            <div class="pomo-pop-slider-row">
              <div class="pomo-pop-slider-info">
                <span>Chu kỳ</span>
                <b id="pomoPopCyclesBadge">${this.totalCycles} chu kỳ</b>
              </div>
              <input type="range" min="1" max="8" step="1" value="${this.totalCycles}" class="pomo-pop-range" id="pomoPopCyclesRange">
            </div>
          </div>

          <!-- THỜI GIAN VÀ ĐIỀU KHIỂN GỌN GÀNG -->
          <div class="pomo-pop-controls">
            <div class="pomo-pop-timer-box">
              <div class="pomo-pop-phase-badge" id="pomoPopPhase">SẴN SÀNG</div>
              <div class="pomo-pop-time" id="pomoPopTime">${this.formatTime(this.remainingSeconds)}</div>
              <div class="pomo-pop-cycle-text" id="pomoPopCycle">Chu kỳ ${this.currentCycle} / ${this.totalCycles}</div>
            </div>

            <div class="pomo-pop-btn-group">
              <button type="button" class="btn btn-primary btn-sm pomo-pop-btn-main" id="pomoPopStart">Bắt đầu học</button>
              <button type="button" class="btn btn-soft btn-sm pomo-pop-btn-reset" id="pomoPopReset">Reset</button>
            </div>
          </div>
        `;
        document.body.appendChild(popover);
      }
    },

    bindEvents: function () {
      const popover = document.getElementById("pomoPopoverDropdown");
      const btnClose = document.getElementById("pomoPopClose");
      const btnStart = document.getElementById("pomoPopStart");
      const btnReset = document.getElementById("pomoPopReset");

      const sFocus = document.getElementById("pomoPopFocusRange");
      const sBreak = document.getElementById("pomoPopBreakRange");
      const sCycles = document.getElementById("pomoPopCyclesRange");

      // Định vị và toggle popover dưới nút Pomodoro
      const togglePopover = () => {
        if (!popover) return;
        const hBtn = document.getElementById("headerPomoBtn");
        if (!hBtn) return;

        const isVisible = popover.style.display === "block";
        if (isVisible) {
          popover.style.display = "none";
        } else {
          const rect = hBtn.getBoundingClientRect();
          popover.style.display = "block";
          popover.style.top = (rect.bottom + 8) + "px";
          // Căn phải khớp với mép phải của nút
          const rightOffset = window.innerWidth - rect.right;
          popover.style.right = Math.max(12, rightOffset) + "px";
          popover.style.left = "auto";
        }
      };

      const bindHeader = () => {
        const hBtn = document.getElementById("headerPomoBtn");
        if (hBtn) {
          hBtn.onclick = (e) => {
            e.stopPropagation();
            togglePopover();
          };
        }
      };
      bindHeader();

      if (btnClose && popover) {
        btnClose.onclick = () => {
          popover.style.display = "none";
        };
      }

      // Đóng khi click ra ngoài
      document.addEventListener("click", (e) => {
        if (!popover || popover.style.display === "none") return;
        const hBtn = document.getElementById("headerPomoBtn");
        if (popover.contains(e.target) || (hBtn && hBtn.contains(e.target))) return;
        popover.style.display = "none";
      });

      // Slider Focus
      if (sFocus) {
        sFocus.oninput = (e) => {
          this.focusMin = Number(e.target.value);
          const badge = document.getElementById("pomoPopFocusBadge");
          if (badge) badge.textContent = this.focusMin + " phút";
          if (this.phase === "idle" && !this.isRunning) {
            this.remainingSeconds = this.focusMin * 60;
          }
          this.saveState();
          this.updateUI();
        };
      }

      // Slider Break
      if (sBreak) {
        sBreak.oninput = (e) => {
          this.breakMin = Number(e.target.value);
          const badge = document.getElementById("pomoPopBreakBadge");
          if (badge) badge.textContent = this.breakMin + " phút";
          this.saveState();
          this.updateUI();
        };
      }

      // Slider Cycles
      if (sCycles) {
        sCycles.oninput = (e) => {
          this.totalCycles = Number(e.target.value);
          const badge = document.getElementById("pomoPopCyclesBadge");
          if (badge) badge.textContent = this.totalCycles + " chu kỳ";
          this.saveState();
          this.updateUI();
        };
      }

      // Nút Bắt đầu / Tạm dừng
      if (btnStart) {
        btnStart.onclick = () => {
          if (this.isRunning) {
            this.pause();
          } else {
            this.start();
          }
        };
      }

      // Nút Reset
      if (btnReset) {
        btnReset.onclick = () => {
          this.reset();
        };
      }
    },

    startTicker: function () {
      clearInterval(this.timerId);
      this.timerId = setInterval(() => this.tick(), 1000);
    },

    start: function () {
      if (this.phase === "idle") {
        this.phase = "focus";
        this.remainingSeconds = this.focusMin * 60;
      }
      this.isRunning = true;
      this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);
      this.saveState();
      this.startTicker();
      this.updateUI();
    },

    pause: function () {
      this.isRunning = false;
      if (this.targetEndTime) {
        this.remainingSeconds = Math.max(0, Math.round((this.targetEndTime - Date.now()) / 1000));
      }
      this.targetEndTime = null;
      clearInterval(this.timerId);
      this.saveState();
      this.updateUI();
    },

    reset: function () {
      this.isRunning = false;
      clearInterval(this.timerId);
      this.phase = "idle";
      this.currentCycle = 1;
      this.remainingSeconds = this.focusMin * 60;
      this.targetEndTime = null;
      document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
      this.saveState();
      this.updateUI();
    },

    tick: function () {
      if (!this.isRunning || !this.targetEndTime) return;

      const now = Date.now();
      const diff = Math.round((this.targetEndTime - now) / 1000);

      if (diff > 0) {
        this.remainingSeconds = diff;
        this.updateUI();
      } else {
        this.remainingSeconds = 0;
        if (this.phase === "focus") {
          this.onFocusEnded();
        } else if (this.phase === "break") {
          this.onBreakEnded();
        }
      }
    },

    onFocusEnded: function () {
      playPomoSound("focus_end");

      if (this.currentCycle >= this.totalCycles) {
        this.phase = "completed";
        this.isRunning = false;
        this.targetEndTime = null;
        clearInterval(this.timerId);
        alert("🎉 Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ " + this.totalCycles + " chu kỳ Pomodoro!");
        if (typeof window.XP !== "undefined" && window.XP.add) {
          window.XP.add(25);
        }
        this.reset();
        return;
      }

      // Sang giờ nghỉ
      this.phase = "break";
      this.remainingSeconds = this.breakMin * 60;
      this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);
      this.isRunning = true;
      this.saveState();
      this.startTicker();
      this.updateUI();
    },

    onBreakEnded: function () {
      playPomoSound("break_end");

      this.currentCycle++;
      this.phase = "focus";
      this.remainingSeconds = this.focusMin * 60;
      this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);
      this.isRunning = true;
      this.saveState();
      this.startTicker();
      this.updateUI();
    },

    formatTime: function (secs) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    },

    updateUI: function () {
      const timeStr = this.formatTime(this.remainingSeconds);

      // 1. Kiểm tra đăng nhập: CHỈ HIỂN THỊ POMODORO KHI ĐÃ ĐĂNG NHẬP
      const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
      const hBtn = document.getElementById("headerPomoBtn");
      const popover = document.getElementById("pomoPopoverDropdown");

      if (hBtn) {
        hBtn.style.display = user ? "inline-flex" : "none";
        hBtn.classList.toggle("is-running", this.isRunning && this.phase === "focus");
        hBtn.classList.toggle("is-break", this.isRunning && this.phase === "break");
        hBtn.title = this.isRunning
          ? `Đang chạy: ${timeStr} (${this.phase === "break" ? "Nghỉ" : "Tập trung"}) · Bấm để xem`
          : `Đồng hồ Pomodoro · Bấm để mở`;
      }

      if (!user && popover) {
        popover.style.display = "none";
      }

      // 2. Chip trên Header
      const hTime = document.getElementById("headerPomoTime");
      const hIcon = document.getElementById("headerPomoIcon");
      if (hTime) hTime.textContent = timeStr;
      if (hIcon) hIcon.textContent = (this.phase === "break") ? "☕" : "🍅";

      // 3. Trong Popover dropdown
      const popTime = document.getElementById("pomoPopTime");
      const popPhase = document.getElementById("pomoPopPhase");
      const popCycle = document.getElementById("pomoPopCycle");
      const btnStart = document.getElementById("pomoPopStart");
      const slidersBox = document.getElementById("pomoPopSlidersBox");

      if (popTime) popTime.textContent = timeStr;
      if (popCycle) popCycle.textContent = `Chu kỳ ${this.currentCycle} / ${this.totalCycles}`;

      if (popPhase) {
        if (this.phase === "focus") {
          popPhase.textContent = "🧠 ĐANG TẬP TRUNG";
          popPhase.style.background = "#e0f2fe";
          popPhase.style.color = "#0284c7";
        } else if (this.phase === "break") {
          popPhase.textContent = "☕ NGHỈ GIẢI LAO";
          popPhase.style.background = "#dcfce7";
          popPhase.style.color = "#16a34a";
        } else {
          popPhase.textContent = "SẴN SÀNG";
          popPhase.style.background = "#f1f5f9";
          popPhase.style.color = "#64748b";
        }
      }

      if (btnStart) {
        if (this.isRunning) {
          btnStart.textContent = "Tạm dừng";
          btnStart.style.background = "#ea580c";
          btnStart.style.borderColor = "#ea580c";
        } else {
          btnStart.textContent = (this.phase === "focus" || this.phase === "break") ? "Tiếp tục" : "Bắt đầu học";
          btnStart.style.background = "#c52233";
          btnStart.style.borderColor = "#c52233";
        }
      }

      if (slidersBox) {
        slidersBox.style.opacity = (this.isRunning || this.phase !== "idle") ? "0.55" : "1";
        slidersBox.style.pointerEvents = (this.isRunning || this.phase !== "idle") ? "none" : "auto";
      }

      // 4. Tiêu đề Tab trình duyệt
      if (this.isRunning) {
        document.title = `(${timeStr}) Pomodoro · RUSI TRKI`;
      } else {
        document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
      }
    }
  };

  window.RusiPomodoro = Pomodoro;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Pomodoro.init();
    });
  } else {
    Pomodoro.init();
  }
})();
