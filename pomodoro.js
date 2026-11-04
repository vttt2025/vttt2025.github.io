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

      // Dropdown Popover tối giản, nhẹ nhàng gắn vào body (position: fixed)
      let popover = document.getElementById("pomoPopoverDropdown");
      if (!popover) {
        popover = document.createElement("div");
        popover.id = "pomoPopoverDropdown";
        popover.className = "pomo-popover-dropdown";
        popover.style.display = "none";
        popover.setAttribute("role", "dialog");
        popover.setAttribute("aria-label", "Đồng hồ Pomodoro tập trung");
        popover.innerHTML = `
          <!-- 1. HEADER: TỐI GIẢN & THANH THOÁT -->
          <div class="pomo-pop-header">
            <div class="pomo-pop-title-wrap">
              <span class="pomo-pop-title-dot" aria-hidden="true"></span>
              <span class="pomo-pop-title">Pomodoro Timer</span>
            </div>
            <div class="pomo-pop-header-actions">
              <button type="button" class="pomo-pop-icon-btn" id="pomoPopToggleSettings" title="Tùy chỉnh thời gian" aria-label="Tùy chỉnh thời gian">
                ${window.RusiIcons ? RusiIcons.get("settings", { size: 15 }) : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'}
              </button>
              <button type="button" class="pomo-pop-icon-btn pomo-pop-close" id="pomoPopClose" title="Đóng" aria-label="Đóng">
                ${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
              </button>
            </div>
          </div>

          <!-- 2. HERO TIMER: TRUNG TÂM TẬP TRUNG, KHÔNG GIAN THOÁNG ĐÃNG -->
          <div class="pomo-pop-hero">
            <div class="pomo-pop-phase-pill" id="pomoPopPhase">
              <span class="pomo-phase-dot" id="pomoPhaseDot"></span>
              <span class="pomo-phase-text" id="pomoPopPhaseText">Sẵn sàng</span>
            </div>
            <div class="pomo-pop-time" id="pomoPopTime">${this.formatTime(this.remainingSeconds)}</div>
            <div class="pomo-pop-cycle-row">
              <div class="pomo-cycle-dots" id="pomoCycleDots" aria-label="Chu kỳ tiến độ"></div>
              <span class="pomo-pop-cycle-text" id="pomoPopCycle">Chu kỳ ${this.currentCycle} / ${this.totalCycles}</span>
            </div>
          </div>

          <!-- 3. BỘ NÚT ĐIỀU KHIỂN GỌN GÀNG -->
          <div class="pomo-pop-actions">
            <button type="button" class="pomo-btn-main" id="pomoPopStart">
              <span class="pomo-btn-icon" id="pomoPopStartIcon">
                ${window.RusiIcons ? RusiIcons.get("play", { size: 13 }) : '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'}
              </span>
              <span id="pomoPopStartText">Bắt đầu học</span>
            </button>
            <button type="button" class="pomo-btn-reset" id="pomoPopReset" title="Đặt lại đồng hồ" aria-label="Đặt lại">
              ${window.RusiIcons ? RusiIcons.get("rotate-ccw", { size: 15 }) : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>'}
            </button>
          </div>

          <!-- 4. TÙY CHỈNH THỜI GIAN (COLLAPSIBLE / TIẾT KIỆM KHÔNG GIAN) -->
          <div class="pomo-pop-settings" id="pomoPopSlidersBox" style="display:none;">
            <div class="pomo-presets-row">
              <button type="button" class="pomo-preset-btn" data-focus="25" data-break="5">25 / 5m</button>
              <button type="button" class="pomo-preset-btn" data-focus="45" data-break="10">45 / 10m</button>
              <button type="button" class="pomo-preset-btn" data-focus="50" data-break="10">50 / 10m</button>
            </div>
            <div class="pomo-sliders-list">
              <div class="pomo-slider-item">
                <div class="pomo-slider-info">
                  <span class="pomo-slider-label">Tập trung</span>
                  <span class="pomo-slider-val" id="pomoPopFocusBadge">${this.focusMin} phút</span>
                </div>
                <input type="range" min="5" max="60" step="5" value="${this.focusMin}" class="pomo-range" id="pomoPopFocusRange">
              </div>
              <div class="pomo-slider-item">
                <div class="pomo-slider-info">
                  <span class="pomo-slider-label">Nghỉ ngơi</span>
                  <span class="pomo-slider-val" id="pomoPopBreakBadge">${this.breakMin} phút</span>
                </div>
                <input type="range" min="1" max="30" step="1" value="${this.breakMin}" class="pomo-range" id="pomoPopBreakRange">
              </div>
              <div class="pomo-slider-item">
                <div class="pomo-slider-info">
                  <span class="pomo-slider-label">Chu kỳ</span>
                  <span class="pomo-slider-val" id="pomoPopCyclesBadge">${this.totalCycles} chu kỳ</span>
                </div>
                <input type="range" min="1" max="8" step="1" value="${this.totalCycles}" class="pomo-range" id="pomoPopCyclesRange">
              </div>
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
      const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
      const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : false;
      if (!user || !isPro) return;

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
        popover.style.width = "min(calc(100vw - 24px), 300px)";
        popover.style.maxWidth = "calc(100vw - 24px)";
      } else if (hBtn) {
        const rect = hBtn.getBoundingClientRect();
        popover.style.top = (rect.bottom + 8) + "px";
        const rightOffset = window.innerWidth - rect.right;
        const maxRight = window.innerWidth - 300;
        popover.style.right = Math.min(Math.max(12, rightOffset), Math.max(12, maxRight)) + "px";
        popover.style.left = "auto";
        popover.style.width = "280px";
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
          const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
          const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : false;
          if (!user || !isPro) return;
          that.togglePopover();
          return;
        }

        const toggleSettingsBtn = e.target.closest("#pomoPopToggleSettings");
        if (toggleSettingsBtn) {
          e.preventDefault();
          const box = document.getElementById("pomoPopSlidersBox");
          if (box) {
            const isHidden = box.style.display === "none";
            box.style.display = isHidden ? "block" : "none";
            toggleSettingsBtn.classList.toggle("is-active", isHidden);
          }
          return;
        }

        const presetBtn = e.target.closest(".pomo-preset-btn");
        if (presetBtn && (!that.isRunning || that.phase === "idle" || that.phase === "completed")) {
          e.preventDefault();
          that.focusMin = Number(presetBtn.dataset.focus) || 25;
          that.breakMin = Number(presetBtn.dataset.break) || 5;
          if (!that.isRunning) {
            that.remainingSeconds = that.focusMin * 60;
          }
          that.saveState();
          that.updateUI();
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

      // Reposition khi cuộn trang trên Desktop / Tablet
      window.addEventListener("scroll", function () {
        const popover = document.getElementById("pomoPopoverDropdown");
        if (popover && popover.style.display === "block" && window.innerWidth > 768) {
          that.positionPopover();
        }
      }, { passive: true });

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
      if (typeof document.title === "string") {
        document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
      }
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

      // 1. Kiểm tra đăng nhập VÀ PRO: Chỉ hiển thị khi đã đăng nhập và là Pro
      const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
      const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : false;
      const canShow = Boolean(user && isPro);
      const hBtn = document.getElementById("headerPomoBtn");
      const popover = document.getElementById("pomoPopoverDropdown");

      if (hBtn) {
        hBtn.style.display = canShow ? "inline-flex" : "none";
        hBtn.classList.toggle("is-running", this.isRunning && this.phase === "focus");
        hBtn.classList.toggle("is-break", this.isRunning && this.phase === "break");
        hBtn.title = this.isRunning
          ? `Đang chạy: ${timeStr} (${this.phase === "break" ? "Nghỉ giải lao" : "Tập trung"}) · Chu kỳ ${this.currentCycle}/${this.totalCycles}`
          : `Đồng hồ Pomodoro · Bấm để mở`;
      }

      if (!canShow && popover) {
        popover.style.display = "none";
      }

      // 2. Chip trên Header: Trạng thái tinh tế, nhẹ nhàng
      const hTime = document.getElementById("headerPomoTime");
      const hDot = document.getElementById("headerPomoDot");
      if (hTime) hTime.textContent = timeStr;
      if (hDot) {
        hDot.className = "header-pomo-dot" + (this.isRunning && this.phase === "focus" ? " is-focus" : this.isRunning && this.phase === "break" ? " is-break" : "");
      }

      // 3. Trong Popover dropdown
      const popTime = document.getElementById("pomoPopTime");
      const popPhase = document.getElementById("pomoPopPhase");
      const popPhaseText = document.getElementById("pomoPopPhaseText");
      const popCycle = document.getElementById("pomoPopCycle");
      const cycleDotsHost = document.getElementById("pomoCycleDots");
      const btnStart = document.getElementById("pomoPopStart");
      const btnStartText = document.getElementById("pomoPopStartText");
      const btnStartIcon = document.getElementById("pomoPopStartIcon");
      const slidersBox = document.getElementById("pomoPopSlidersBox");

      if (popTime) popTime.textContent = timeStr;
      if (popCycle) popCycle.textContent = `Chu kỳ ${this.currentCycle} / ${this.totalCycles}`;

      // Render các chấm chu kỳ tiến độ
      if (cycleDotsHost) {
        let dotsHtml = "";
        for (let i = 1; i <= this.totalCycles; i++) {
          const dotState = (i < this.currentCycle) ? "is-done" : (i === this.currentCycle ? (this.isRunning ? "is-active running" : "is-active") : "is-pending");
          dotsHtml += `<span class="pomo-cycle-dot ${dotState}" title="Chu kỳ ${i}"></span>`;
        }
        cycleDotsHost.innerHTML = dotsHtml;
      }

      // Cập nhật Phase Pill nhã nhặn
      if (popPhase) {
        popPhase.className = "pomo-pop-phase-pill " + (this.phase || "idle") + (this.isRunning ? " is-running" : "");
      }
      if (popPhaseText) {
        if (this.phase === "focus") {
          popPhaseText.textContent = this.isRunning ? "Đang tập trung" : "Tạm dừng tập trung";
        } else if (this.phase === "break") {
          popPhaseText.textContent = this.isRunning ? "Nghỉ giải lao" : "Tạm dừng nghỉ";
        } else if (this.phase === "completed") {
          popPhaseText.textContent = "Hoàn thành xuất sắc";
        } else {
          popPhaseText.textContent = "Sẵn sàng";
        }
      }

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

      // Đánh dấu active trên preset buttons
      const presets = document.querySelectorAll(".pomo-preset-btn");
      presets.forEach(p => {
        const isMatch = Number(p.dataset.focus) === this.focusMin && Number(p.dataset.break) === this.breakMin;
        p.classList.toggle("is-active", isMatch);
      });

      // Nút Start / Pause với Icon chuẩn Lucide từ thư viện
      const playSvg = window.RusiIcons ? RusiIcons.get("play", { size: 13 }) : `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      const pauseSvg = window.RusiIcons ? RusiIcons.get("pause", { size: 13 }) : `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

      if (btnStart) {
        btnStart.className = "pomo-btn-main " + (this.phase || "idle") + (this.isRunning ? " is-running" : "");
        if (this.isRunning) {
          if (btnStartText) btnStartText.textContent = "Tạm dừng";
          if (btnStartIcon) btnStartIcon.innerHTML = pauseSvg;
        } else if (this.phase === "focus") {
          if (btnStartText) btnStartText.textContent = "Tiếp tục học";
          if (btnStartIcon) btnStartIcon.innerHTML = playSvg;
        } else if (this.phase === "break") {
          if (btnStartText) btnStartText.textContent = "Tiếp tục nghỉ";
          if (btnStartIcon) btnStartIcon.innerHTML = playSvg;
        } else if (this.phase === "completed") {
          if (btnStartText) btnStartText.textContent = "Bắt đầu lại";
          if (btnStartIcon) btnStartIcon.innerHTML = playSvg;
        } else {
          if (btnStartText) btnStartText.textContent = "Bắt đầu học";
          if (btnStartIcon) btnStartIcon.innerHTML = playSvg;
        }
      }

      if (slidersBox) {
        const disableSliders = this.isRunning || this.phase === "focus" || this.phase === "break";
        slidersBox.style.opacity = disableSliders ? "0.6" : "1";
        slidersBox.style.pointerEvents = disableSliders ? "none" : "auto";
      }

      // 4. Tiêu đề Tab trình duyệt
      if (this.isRunning) {
        document.title = `(${timeStr}) Pomodoro · RUSI TRKI`;
      } else {
        if (typeof document.title === "string") {
        document.title = document.title.replace(/^\([0-9:]+\)\s*/, "");
      }
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
