/**
 * ============================================================================
 * RUSI TRKI — TÍNH NĂNG ĐỒNG HỒ TẬP TRUNG POMODORO TIMER
 * Quy chuẩn:
 * - Chỉ hiển thị khi người dùng đã đăng nhập tài khoản.
 * - Khi click vào nút Pomodoro: Hiển thị dropdown popover nhỏ gọn ngay dưới nút,
 *   gồm 3 thanh kéo tùy chỉnh (Tập trung, Nghỉ ngơi, Chu kỳ), đồng hồ hiển thị và nút điều khiển.
 * - Đồng bộ thời gian thực cho TẤT CẢ các tab qua localStorage và timestamp targetEndTime.
 * - Không bị mất thời gian khi chuyển trang hoặc reload.
 * - Tương thích 100% Mobile / Tablet, Event Delegation chống mất listener khi re-render.
 * ============================================================================
 */

(function () {
  "use strict";

  // Web Audio Context (mở khóa an toàn trên user gesture)
  let sharedAudioCtx = null;
  function ensureAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!sharedAudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
      if (sharedAudioCtx.state === "suspended") {
        sharedAudioCtx.resume();
      }
      return sharedAudioCtx;
    } catch (_) {
      return null;
    }
  }

  function playPomoSound(type) {
    try {
      const ctx = ensureAudioContext();
      if (!ctx) return;

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
        // Chuông báo kết thúc tập trung: 2 nốt ngân cao sáng
        playTone(523.25, 0, 0.45, 0.35); // C5
        playTone(659.25, 0.22, 0.7, 0.35); // E5
      } else if (type === "break_end") {
        // Chuông báo kết thúc giải lao: 3 nốt vươn lên phấn chấn
        playTone(587.33, 0, 0.3, 0.3); // D5
        playTone(739.99, 0.16, 0.3, 0.3); // F#5
        playTone(880.00, 0.32, 0.8, 0.35); // A5
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
            // Hết giờ trong lúc chuyển trang hoặc reload
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
          if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
          }
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

      // Dropdown Popover nhỏ gọn được gắn vào body (position: fixed)
      let popover = document.getElementById("pomoPopoverDropdown");
      if (!popover) {
        popover = document.createElement("div");
        popover.id = "pomoPopoverDropdown";
        popover.className = "pomo-popover-dropdown";
        popover.style.display = "none";
        popover.setAttribute("role", "dialog");
        popover.setAttribute("aria-label", "Đồng hồ Pomodoro tập trung");
        popover.innerHTML = `
          <div class="pomo-pop-header">
            <span class="pomo-pop-title">🍅 Đồng Hồ Pomodoro</span>
            <button type="button" class="pomo-pop-close" id="pomoPopClose" title="Đóng">&times;</button>
          </div>

          <!-- 3 THANH KÉO TÙY CHỈNH THỜI GIAN -->
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

    toggle: function () {
      this.togglePopover();
    },

    open: function () {
      this.openPopover();
    },

    close: function () {
      this.closePopover();
    },

    togglePopover: function () {
      let popover = document.getElementById("pomoPopoverDropdown");
      if (!popover) {
        this.createDOM();
        popover = document.getElementById("pomoPopoverDropdown");
      }
      if (!popover) return;

      const isVisible = popover.style.display === "block";
      if (isVisible) {
        this.closePopover();
      } else {
        this.openPopover();
      }
    },

    openPopover: function () {
      ensureAudioContext();
      let popover = document.getElementById("pomoPopoverDropdown");
      if (!popover) {
        this.createDOM();
        popover = document.getElementById("pomoPopoverDropdown");
      }
      if (!popover) return;

      // MUTUAL EXCLUSION: Đóng User dropdown và Mobile drawer nếu đang mở
      const userDd = document.getElementById("userDropdown");
      if (userDd) userDd.classList.remove("open");
      const userTrigger = document.getElementById("userTrigger");
      if (userTrigger) userTrigger.setAttribute("aria-expanded", "false");
      const nav = document.getElementById("mainNav");
      if (nav) nav.classList.remove("nav-open");
      const mobileBtn = document.getElementById("mobileMenuBtn");
      if (mobileBtn) {
        mobileBtn.classList.remove("is-open");
        mobileBtn.setAttribute("aria-expanded", "false");
      }
      document.body.classList.remove("menu-locked");

      popover.style.display = "block";
      this.positionPopover();
      this.updateUI();
    },

    closePopover: function () {
      const popover = document.getElementById("pomoPopoverDropdown");
      if (popover) {
        popover.style.display = "none";
      }
    },

    positionPopover: function () {
      const popover = document.getElementById("pomoPopoverDropdown");
      const hBtn = document.getElementById("headerPomoBtn");
      if (!popover) return;

      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // Định vị an toàn trên điện thoại
        popover.style.top = "64px";
        popover.style.right = "12px";
        popover.style.left = "auto";
        popover.style.width = "min(calc(100vw - 24px), 320px)";
        popover.style.maxWidth = "calc(100vw - 24px)";
      } else if (hBtn) {
        const rect = hBtn.getBoundingClientRect();
        popover.style.top = (rect.bottom + 8) + "px";
        const rightOffset = window.innerWidth - rect.right;
        const maxRight = window.innerWidth - 310;
        popover.style.right = Math.min(Math.max(12, rightOffset), Math.max(12, maxRight)) + "px";
        popover.style.left = "auto";
        popover.style.width = "290px";
      }
    },

    bindEvents: function () {
      const that = this;

      // SỰ KIỆN TOÀN CỤC: Bấm vào #headerPomoBtn luôn kích hoạt (ngay cả khi header re-render)
      document.addEventListener("click", function (e) {
        const hBtn = e.target.closest("#headerPomoBtn");
        if (hBtn) {
          e.preventDefault();
          e.stopPropagation();
          that.togglePopover();
          return;
        }

        const closeBtn = e.target.closest("#pomoPopClose");
        if (closeBtn) {
          e.preventDefault();
          that.closePopover();
          return;
        }

        // Bấm ra ngoài popover -> đóng popover
        const popover = document.getElementById("pomoPopoverDropdown");
        if (popover && popover.style.display === "block") {
          if (!popover.contains(e.target)) {
            that.closePopover();
          }
        }
      });

      // Reposition khi resize màn hình hoặc xoay điện thoại
      window.addEventListener("resize", function () {
        const popover = document.getElementById("pomoPopoverDropdown");
        if (popover && popover.style.display === "block") {
          that.positionPopover();
        }
      });

      // Slider Focus / Break / Cycles qua Event Delegation
      document.addEventListener("input", function (e) {
        if (e.target.id === "pomoPopFocusRange") {
          that.focusMin = Number(e.target.value);
          const badge = document.getElementById("pomoPopFocusBadge");
          if (badge) badge.textContent = that.focusMin + " phút";
          if (!that.isRunning && (that.phase === "idle" || that.phase === "completed")) {
            that.remainingSeconds = that.focusMin * 60;
          }
          that.saveState();
          that.updateUI();
        } else if (e.target.id === "pomoPopBreakRange") {
          that.breakMin = Number(e.target.value);
          const badge = document.getElementById("pomoPopBreakBadge");
          if (badge) badge.textContent = that.breakMin + " phút";
          if (!that.isRunning && that.phase === "break") {
            that.remainingSeconds = that.breakMin * 60;
          }
          that.saveState();
          that.updateUI();
        } else if (e.target.id === "pomoPopCyclesRange") {
          that.totalCycles = Number(e.target.value);
          const badge = document.getElementById("pomoPopCyclesBadge");
          if (badge) badge.textContent = that.totalCycles + " chu kỳ";
          that.saveState();
          that.updateUI();
        }
      });

      // Nút Start / Pause / Reset qua Event Delegation
      document.addEventListener("click", function (e) {
        if (e.target.id === "pomoPopStart" || e.target.closest("#pomoPopStart")) {
          e.preventDefault();
          ensureAudioContext();
          if (that.isRunning) {
            that.pause();
          } else {
            that.start();
          }
        } else if (e.target.id === "pomoPopReset" || e.target.closest("#pomoPopReset")) {
          e.preventDefault();
          that.reset();
        }
      });
    },

    startTicker: function () {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.timerId = setInterval(() => this.tick(), 1000);
    },

    start: function () {
      ensureAudioContext();
      if (this.phase === "idle" || this.phase === "completed") {
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
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.saveState();
      this.updateUI();
    },

    reset: function () {
      this.isRunning = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
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
        if (this.timerId) {
          clearInterval(this.timerId);
          this.timerId = null;
        }

        // Thông báo hoàn thành tinh tế & cộng XP
        if (typeof window.toast === "function") {
          window.toast("🎉 Xuất sắc! Bạn đã hoàn thành toàn bộ " + this.totalCycles + " chu kỳ Pomodoro (+25 XP)!");
        }
        if (typeof window.XP !== "undefined" && window.XP.add) {
          window.XP.add(25);
        }

        this.remainingSeconds = this.focusMin * 60;
        this.saveState();
        this.updateUI();
        return;
      }

      // Sang giờ nghỉ giải lao
      this.phase = "break";
      this.remainingSeconds = this.breakMin * 60;
      this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);
      this.isRunning = true;

      if (typeof window.toast === "function") {
        window.toast("☕ Hết giờ tập trung! Bắt đầu nghỉ giải lao (" + this.breakMin + " phút).");
      }

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

      if (typeof window.toast === "function") {
        window.toast("🧠 Hết giờ nghỉ! Bắt đầu chu kỳ tập trung " + this.currentCycle + " / " + this.totalCycles + ".");
      }

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

      // 1. Kiểm tra đăng nhập
      const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
      const hBtn = document.getElementById("headerPomoBtn");
      const popover = document.getElementById("pomoPopoverDropdown");

      if (hBtn) {
        hBtn.style.display = user ? "inline-flex" : "none";
        hBtn.classList.toggle("is-running", this.isRunning && this.phase === "focus");
        hBtn.classList.toggle("is-break", this.isRunning && this.phase === "break");
        hBtn.title = this.isRunning
          ? `Đang chạy: ${timeStr} (${this.phase === "break" ? "Nghỉ giải lao" : "Tập trung"}) · Chu kỳ ${this.currentCycle}/${this.totalCycles}`
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

      // Đồng bộ Sliders & Badges
      const sFocus = document.getElementById("pomoPopFocusRange");
      const bFocus = document.getElementById("pomoPopFocusBadge");
      const sBreak = document.getElementById("pomoPopBreakRange");
      const bBreak = document.getElementById("pomoPopBreakBadge");
      const sCycles = document.getElementById("pomoPopCyclesRange");
      const bCycles = document.getElementById("pomoPopCyclesBadge");

      if (sFocus && document.activeElement !== sFocus) sFocus.value = this.focusMin;
      if (bFocus) bFocus.textContent = this.focusMin + " phút";
      if (sBreak && document.activeElement !== sBreak) sBreak.value = this.breakMin;
      if (bBreak) bBreak.textContent = this.breakMin + " phút";
      if (sCycles && document.activeElement !== sCycles) sCycles.value = this.totalCycles;
      if (bCycles) bCycles.textContent = this.totalCycles + " chu kỳ";

      if (popPhase) {
        if (this.phase === "focus") {
          popPhase.textContent = "🧠 ĐANG TẬP TRUNG";
          popPhase.style.background = "#e0f2fe";
          popPhase.style.color = "#0284c7";
        } else if (this.phase === "break") {
          popPhase.textContent = "☕ NGHỈ GIẢI LAO";
          popPhase.style.background = "#dcfce7";
          popPhase.style.color = "#16a34a";
        } else if (this.phase === "completed") {
          popPhase.textContent = "🏆 HOÀN THÀNH XUẤT SẮC";
          popPhase.style.background = "#fef3c7";
          popPhase.style.color = "#b45309";
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
        } else if (this.phase === "focus") {
          btnStart.textContent = "Tiếp tục học";
          btnStart.style.background = "#16a34a";
          btnStart.style.borderColor = "#16a34a";
        } else if (this.phase === "break") {
          btnStart.textContent = "Tiếp tục nghỉ";
          btnStart.style.background = "#0284c7";
          btnStart.style.borderColor = "#0284c7";
        } else if (this.phase === "completed") {
          btnStart.textContent = "Bắt đầu lại";
          btnStart.style.background = "#c52233";
          btnStart.style.borderColor = "#c52233";
        } else {
          btnStart.textContent = "Bắt đầu học";
          btnStart.style.background = "#c52233";
          btnStart.style.borderColor = "#c52233";
        }
      }

      if (slidersBox) {
        const disableSliders = this.isRunning || this.phase === "focus" || this.phase === "break";
        slidersBox.style.opacity = disableSliders ? "0.55" : "1";
        slidersBox.style.pointerEvents = disableSliders ? "none" : "auto";
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
