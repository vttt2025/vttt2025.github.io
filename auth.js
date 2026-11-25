/**
 * auth.js — Lớp xác thực Supabase duy nhất cho toàn bộ website.
 *
 * Giữ nguyên API window.Auth để các trang hiện có tiếp tục hoạt động:
 * signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
 * onChange, isReady và refreshProfile.
 */
(function () {
  "use strict";

  try { localStorage.removeItem("trki_sb_service_key"); } catch (_) {}

  function safeEsc(val) {
    if (typeof esc === "function") return esc(val);
    return String(val == null ? "" : val).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function getStore() {
    if (typeof window !== "undefined" && window.STORE) return window.STORE;
    return {
      get(key, fallback) {
        try {
          const value = localStorage.getItem("trki_" + key);
          return value === null ? fallback : JSON.parse(value);
        } catch (_) {
          return fallback;
        }
      },
      set(key, value) {
        try {
          if (value === null || value === undefined) localStorage.removeItem("trki_" + key);
          else localStorage.setItem("trki_" + key, JSON.stringify(value));
        } catch (_) {}
      }
    };
  }

  function getClient() {
    return window.RusiSupabase && window.RusiSupabase.getClient
      ? window.RusiSupabase.getClient()
      : null;
  }

  function clearSensitiveAuthUrl() {
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    const hasSensitiveHash = /(?:access_token|refresh_token|provider_token)=/i.test(hash);
    const hasAuthCode = /(?:^|[?&])code=/.test(search);
    if (!hasSensitiveHash && !hasAuthCode) return;

    const params = new URLSearchParams(search);
    params.delete("code");
    const cleanSearch = params.toString();
    window.history.replaceState(
      null,
      document.title,
      window.location.pathname + (cleanSearch ? "?" + cleanSearch : "")
    );
  }

  function formatUser(user, profile) {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return {
      uid: user.id,
      id: user.id,
      name: profile?.full_name || meta.full_name || meta.name || user.email?.split("@")[0] || "Học viên",
      email: user.email || "",
      photo: profile?.avatar_url || meta.avatar_url || meta.picture || "",
      provider: user.app_metadata?.provider || "email",
      role: profile?.role || "student",
      is_pro: Boolean(profile?.is_pro),
      pro_expires_at: profile?.pro_expires_at || null,
      streak_count: Number(profile?.streak_count || 0),
      xp_points: Number(profile?.xp_points || 0)
    };
  }

  function normalizeAuthError(error) {
    if (!error) return null;
    const message = String(error.message || error);
    const lower = message.toLowerCase();
    if (lower.includes("invalid login credentials")) {
      return { ...error, message: "Email hoặc mật khẩu không chính xác, hoặc tài khoản chưa được tạo trên Supabase." };
    }
    if (lower.includes("email not confirmed")) {
      return { ...error, message: "Email chưa được xác nhận. Vui lòng mở email xác nhận rồi đăng nhập lại." };
    }
    if (lower.includes("user already registered")) {
      return { ...error, message: "Email này đã được đăng ký. Vui lòng chuyển sang trang đăng nhập." };
    }
    return error;
  }


  function getDeviceFingerprint() {
    let fp = "";
    try {
      fp = localStorage.getItem("rusi_device_fp");
      // Chỉ dùng lại mã có phần ngẫu nhiên riêng của bản cài (dev_<hash>_<rand>).
      // Mã tất định cũ (dev_<hash>) bị trùng giữa các máy cùng model → tạo lại.
      if (fp && /^dev_[0-9a-f]+_[0-9a-z]+$/.test(fp)) return fp;
    } catch (_) {}

    const components = [
      navigator.userAgent || "",
      (window.screen ? screen.width + "x" + screen.height : ""),
      (window.screen ? screen.colorDepth : ""),
      navigator.hardwareConcurrency || 2,
      Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      navigator.language || ""
    ].join("###");

    let hash = 0;
    for (let i = 0; i < components.length; i++) {
      hash = ((hash << 5) - hash) + components.charCodeAt(i);
      hash |= 0;
    }
    // Hash phần cứng + phần ngẫu nhiên riêng cho mỗi bản cài: hai máy cùng model/OS vẫn ra hai mã khác nhau.
    // Tính ổn định do localStorage đảm bảo (mã được lưu và dùng lại ở trên).
    let randPart = "";
    try {
      const buf = new Uint32Array(2);
      crypto.getRandomValues(buf);
      randPart = buf[0].toString(36) + buf[1].toString(36);
    } catch (_) {
      randPart = Math.random().toString(36).substring(2, 12);
    }
    fp = "dev_" + Math.abs(hash).toString(16) + "_" + randPart;
    try {
      localStorage.setItem("rusi_device_fp", fp);
    } catch (_) {}
    return fp;
  }

  function getDeviceInfo() {
    const ua = navigator.userAgent || "";
    let os = "Khác";
    if (/Win/i.test(ua)) os = "Windows";
    else if (/iPhone|iPod/i.test(ua)) os = "iOS";
    else if (/iPad/i.test(ua)) os = "iPadOS";
    else if (/Mac/i.test(ua)) os = "macOS";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/Linux/i.test(ua)) os = "Linux";

    let deviceType = "desktop";
    if (/iPhone|iPod|Android.*Mobile/i.test(ua)) {
      deviceType = "mobile";
    } else if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) {
      deviceType = "tablet";
    }

    let browser = "Trình duyệt";
    if (/Edg/i.test(ua)) browser = "Edge";
    else if (/Chrome|CriOS/i.test(ua)) browser = "Chrome";
    else if (/Safari/i.test(ua)) browser = "Safari";
    else if (/Firefox|FxiOS/i.test(ua)) browser = "Firefox";

    const typeLabel = deviceType === "mobile" ? "Điện thoại" : (deviceType === "tablet" ? "Máy tính bảng" : "Máy tính");
    const deviceName = typeLabel + " " + os + " (" + browser + ")";

    return {
      fingerprint: getDeviceFingerprint(),
      deviceName: deviceName,
      deviceType: deviceType,
      browser: browser,
      os: os
    };
  }

  const Auth = {
    user: (function () {
      try {
        return getStore().get("auth_user", null);
      } catch (_) {
        return null;
      }
    })(),
    _listeners: [],
    _readyPromise: null,
    _subscription: null,
    _isVerifyingDevice: false,

    async verifyDeviceGuard() {
      if (!this.user || !window.RusiSupabase || !window.RusiSupabase.deviceGuard) return true;
      if (this.user.provider === "guest" || (typeof this.user.uid === "string" && this.user.uid.startsWith("guest_"))) return true;
      // Admin hoặc giáo viên được miễn giới hạn thiết bị
      const role = String(this.user.role || "").toLowerCase();
      if (role === "admin" || role === "super_admin" || role === "academic_admin" || role === "teacher") {
        return true;
      }
      // Tính năng Device Guard chỉ bảo vệ tài khoản PRO tránh chia sẻ lậu
      if (!this.user.is_pro) return true;

      if (this._isVerifyingDevice) return true;
      this._isVerifyingDevice = true;

      const info = getDeviceInfo();
      try {
        const res = await window.RusiSupabase.deviceGuard.register(info);
        if (res && res.allowed === false && res.reason === "device_limit_exceeded") {
          this._showDeviceLimitModal(res);
          return false;
        }
        // Nếu trước đó đang mở modal giới hạn mà giờ đã hợp lệ thì đóng modal
        const existing = document.getElementById("rusiDeviceLimitModal");
        if (existing) existing.remove();
        return true;
      } catch (e) {
        console.warn("[DeviceGuard] Lỗi xác thực thiết bị:", e);
        return true;
      } finally {
        this._isVerifyingDevice = false;
      }
    },

    _showDeviceLimitModal(limitData) {
      let modal = document.getElementById("rusiDeviceLimitModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "rusiDeviceLimitModal";
        modal.className = "modal-overlay";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "deviceLimitHeading");
        document.body.appendChild(modal);
      }

      const devices = Array.isArray(limitData.devices) ? limitData.devices : [];

      function formatRelativeTime(dateStr) {
        if (!dateStr) return "Gần đây";
        try {
          const d = new Date(dateStr);
          const diffMs = Date.now() - d.getTime();
          const diffMin = Math.floor(diffMs / 60000);
          if (diffMin < 2) return "Vừa mới xong";
          if (diffMin < 60) return `${diffMin} phút trước`;
          const diffHr = Math.floor(diffMin / 60);
          if (diffHr < 24) return `${diffHr} giờ trước`;
          const diffDay = Math.floor(diffHr / 24);
          if (diffDay < 7) return `${diffDay} ngày trước`;
          return d.toLocaleDateString("vi-VN");
        } catch (_) {
          return "Gần đây";
        }
      }

      function getDeviceIcon(type) {
        if (type === "mobile") return "📱";
        if (type === "tablet") return "📟";
        return "💻";
      }

      modal.innerHTML = `
        <div class="modal-card device-limit-modal-card">
          <div class="device-limit-header">
            <div class="device-limit-badge">
              ${window.RusiIcons ? RusiIcons.get("shield-check", { size: 14 }) : "🛡️"}
              <span>RUSI DEVICE GUARD</span>
            </div>
          </div>

          <div class="device-limit-body">
            <div class="device-limit-hero">
              <div class="device-limit-hero-icon">
                ${window.RusiIcons ? RusiIcons.get("shield-check", { size: 30 }) : "🛡️"}
              </div>
              <div class="device-limit-hero-text">
                <h3 class="device-limit-title" id="deviceLimitHeading">Giới Hạn Thiết Bị Tin Cậy</h3>
                <p class="device-limit-desc">
                  Tài khoản PRO của bạn đạt giới hạn <b>tối đa ${limitData.max_devices || 2} thiết bị</b> đăng nhập đồng thời. Vui lòng đăng xuất bớt một thiết bị cũ bên dưới để tiếp tục học trên thiết bị này:
                </p>
              </div>
            </div>

            <div class="device-limit-list-title">
              <span>Thiết bị đang chiếm phiên học (${devices.length}):</span>
            </div>

            <div class="device-limit-list">
              ${devices.length === 0 ? `
                <div class="device-limit-empty">Chưa có thông tin phiên thiết bị cũ. Bấm nút bên dưới để giải phóng ngay.</div>
              ` : devices.map(d => `
                <div class="device-limit-item">
                  <div class="device-item-left">
                    <span class="device-item-icon">${getDeviceIcon(d.device_type)}</span>
                    <div class="device-item-info">
                      <div class="device-item-name">${safeEsc(d.device_name) || "Thiết bị"}</div>
                      <div class="device-item-time">Hoạt động: <b>${formatRelativeTime(d.last_active_at)}</b></div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-sm btn-revoke-device" data-id="${safeEsc(d.id)}" aria-label="Đăng xuất thiết bị này">
                    Đăng xuất
                  </button>
                </div>
              `).join("")}
            </div>

            <div class="device-limit-footer">
              <div class="device-limit-footer-main">
                <button type="button" class="btn btn-primary" id="btnDeviceRevokeAll" style="width:100%">
                  ${window.RusiIcons ? RusiIcons.get("refresh", { size: 14 }) : "⚡"} Đăng xuất tất cả thiết bị khác & Tiếp tục
                </button>
              </div>
              <div class="device-limit-footer-sub">
                <button type="button" class="btn btn-ghost" id="btnDeviceModalSignOut">
                  Đăng xuất tài khoản này
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      // 1. Xử lý nút đăng xuất từng thiết bị lẻ
      modal.querySelectorAll(".btn-revoke-device").forEach(btn => {
        btn.onclick = async () => {
          const id = btn.dataset.id;
          btn.textContent = "Đang xử lý...";
          btn.disabled = true;
          try {
            const ok = await window.RusiSupabase.deviceGuard.revoke(id);
            if (ok) {
              if (typeof window.toast === "function") window.toast("✓ Đã đăng xuất thiết bị cũ thành công.");
              modal.remove();
              Auth.verifyDeviceGuard();
            } else {
              btn.textContent = "Thử lại";
              btn.disabled = false;
              if (typeof window.toast === "function") window.toast("Không thể đăng xuất thiết bị, vui lòng thử lại.", "error");
            }
          } catch (err) {
            btn.textContent = "Thử lại";
            btn.disabled = false;
          }
        };
      });

      // 2. Xử lý nút Đăng xuất tất cả thiết bị khác (1-Click Giải phóng nhanh nhất)
      const btnRevokeAll = modal.querySelector("#btnDeviceRevokeAll");
      if (btnRevokeAll) {
        btnRevokeAll.onclick = async () => {
          btnRevokeAll.textContent = "Đang giải phóng phiên...";
          btnRevokeAll.disabled = true;
          try {
            const ok = await window.RusiSupabase.deviceGuard.revokeAll();
            if (ok) {
              if (typeof window.toast === "function") window.toast("✓ Đã đăng xuất toàn bộ thiết bị cũ! Bắt đầu học trên thiết bị này.");
              modal.remove();
              Auth.verifyDeviceGuard();
            } else {
              btnRevokeAll.textContent = "Thử lại";
              btnRevokeAll.disabled = false;
            }
          } catch (_) {
            btnRevokeAll.textContent = "Thử lại";
            btnRevokeAll.disabled = false;
          }
        };
      }

      // 3. Xử lý nút Đăng xuất tài khoản này
      const signOutBtn = modal.querySelector("#btnDeviceModalSignOut");
      if (signOutBtn) {
        signOutBtn.onclick = () => {
          modal.remove();
          Auth.signOut();
        };
      }
    },

    async _hydrateUser(supabaseUser) {
      if (!supabaseUser) {
        this.user = null;
        getStore().set("auth_user", null);
        return null;
      }

      let profile = null;
      if (window.RusiSupabase?.profile?.get) {
        profile = await window.RusiSupabase.profile.get(supabaseUser.id);
      }
      this.user = formatUser(supabaseUser, profile);
      getStore().set("auth_user", this.user);
      if (this.user) {
        setTimeout(() => this.verifyDeviceGuard(), 800);
      }
      return this.user;
    },

    _emit(user) {
      this._listeners.slice().forEach((listener) => {
        try {
          listener(user);
        } catch (error) {
          console.error("[Auth] listener error:", error);
        }
      });
    },

    isReady() {
      if (this._readyPromise) return this._readyPromise;
      this._readyPromise = (async () => {
        const client = getClient();
        if (!client) {
          this.user = null;
          getStore().set("auth_user", null);
          return;
        }

        const { data } = await client.auth.getSession();
        await this._hydrateUser(data?.session?.user || null);
        clearSensitiveAuthUrl();

        if (!this._subscription) {
          const result = client.auth.onAuthStateChange((_event, session) => {
            if (_event === "INITIAL_SESSION") return;
            if (_event === "SIGNED_OUT") {
              if (this._deviceGuardTimer) {
                clearInterval(this._deviceGuardTimer);
                this._deviceGuardTimer = null;
              }
            }
            setTimeout(async () => {
              const user = await this._hydrateUser(session?.user || null);
              this._emit(user);
            }, 0);
          });
          this._subscription = result?.data?.subscription || null;
        }
      })().catch((error) => {
        console.error("[Auth] Không thể khởi tạo Supabase Auth:", error);
        this.user = null;
      });
      return this._readyPromise;
    },

    onChange(callback) {
      this._listeners.push(callback);
      if (this._readyPromise) this._readyPromise.then(() => callback(this.user));
      return () => {
        this._listeners = this._listeners.filter((listener) => listener !== callback);
      };
    },

    async refreshProfile() {
      const client = getClient();
      if (!client) return null;
      const { data } = await client.auth.getUser();
      const user = await this._hydrateUser(data?.user || null);
      this._emit(user);
      return user;
    },

    async signInWithGoogle() {
      const client = getClient();
      if (!client) return { user: null, error: { message: "Supabase chưa sẵn sàng." } };
      if (typeof window !== "undefined" && window.location.protocol === "file:") {
        const msg = "Không thể đăng nhập Google khi mở file trực tiếp (file://). Vui lòng chạy máy chủ web cục bộ (ví dụ chạy lệnh: python server.py) và truy cập qua http://localhost:8000";
        alert(msg);
        return { user: null, error: { message: msg } };
      }
      // OAuth callback chỉ dùng URL sạch; auth-page.js đã lưu đích cuối vào localStorage.
      const redirectTo = window.location.origin + window.location.pathname;
      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });
      return { user: data?.user || null, error: normalizeAuthError(error) };
    },

    async signInWithEmail(email, password) {
      const client = getClient();
      if (!client) return { user: null, error: { message: "Supabase chưa sẵn sàng." } };
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) return { user: null, error: normalizeAuthError(error) };
      const user = await this._hydrateUser(data.user);
      this._emit(user);
      return { user, error: null };
    },

    async signUpWithEmail(email, password) {
      const client = getClient();
      if (!client) return { user: null, error: { message: "Supabase chưa sẵn sàng." } };
      const fullName = email.split("@")[0];
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) return { user: null, error: normalizeAuthError(error) };
      if (!data.session) {
        return {
          user: null,
          error: { message: "Tài khoản đã được tạo. Vui lòng kiểm tra email để xác nhận trước khi đăng nhập." },
          needsEmailConfirmation: true
        };
      }
      const user = await this._hydrateUser(data.user);
      this._emit(user);
      return { user, error: null, needsEmailConfirmation: false };
    },

    continueAsGuest() {
      const guest = {
        uid: "guest_" + Date.now(),
        name: "Học viên Khách",
        email: "",
        photo: "",
        provider: "guest",
        role: "student",
        is_pro: false
      };
      this.user = guest;
      getStore().set("auth_user", guest);
      this._emit(guest);
      return guest;
    },

    async signOut() {
      // 1. Đồng bộ tiến trình lần cuối lên Supabase trước khi đăng xuất
      try {
        if (typeof Progress !== "undefined" && typeof Progress.flushSync === "function") {
          await Progress.flushSync();
        }
      } catch (_) {}

      // 1b. Giải phóng thiết bị hiện tại khỏi danh sách giới hạn thiết bị
      try {
        if (window.RusiSupabase?.deviceGuard?.revokeCurrent) {
          await window.RusiSupabase.deviceGuard.revokeCurrent(getDeviceFingerprint());
        }
      } catch (_) {}

      // 2. Đăng xuất phiên Supabase
      const client = getClient();
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn("[Auth] Lỗi Supabase signOut:", e);
        }
      }

      // 3. Xóa sạch 100% toàn bộ dữ liệu cá nhân của người dùng trên trình duyệt
      clearBrowserUserData();

      this.user = null;
      this._emit(null);
    }
  };

  /**
   * Xóa sạch toàn bộ dữ liệu người dùng trên trình duyệt (localStorage, sessionStorage, in-memory)
   * Đảm bảo tính riêng tư, bảo mật tuyệt đối, chống rò rỉ tiến trình học sang tài khoản khác.
   */
  function clearBrowserUserData() {
    try {
      try { localStorage.removeItem("trki_sb_service_key"); } catch (_) {}
      try {
        localStorage.removeItem("rusi_pomodoro_state");
        if (window.RusiPomodoro && typeof window.RusiPomodoro.reset === "function") window.RusiPomodoro.reset();
        if (window.RusiSupabase && typeof window.RusiSupabase.clearCache === "function") window.RusiSupabase.clearCache();
      } catch (_) {}

      const preserveKeys = new Set([
        "data-theme", "rusi_theme", "theme",
        "trki_sb_anon_key", "rusi_supabase_anon_key"
      ]);

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (preserveKeys.has(key)) continue;

        if (
          key.startsWith("trki_") ||
          key.startsWith("rusi_cache:") ||
          key.startsWith("sb-") ||
          key.startsWith("supabase.auth.") ||
          key === "auth_user" ||
          key === "auth_redirect" ||
          key === "rusi_groq_api_key" ||
          key === "rusi_live_preview_draft"
        ) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((k) => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      try {
        sessionStorage.clear();
      } catch (_) {}

      if (typeof window !== "undefined") {
        if (window.STORE && typeof window.STORE.set === "function") {
          window.STORE.set("auth_user", null);
          window.STORE.set("xp", 0);
          window.STORE.set("streak", 0);
          window.STORE.set("listenDone", []);
          window.STORE.set("speakDone", []);
          window.STORE.set("writeDone", []);
          window.STORE.set("trkiDone", []);
          window.STORE.set("vocabDone", []);
          window.STORE.set("custom_jars", []);
        }
      }
      console.log("[Auth] Đã xóa sạch 100% dữ liệu người dùng trên trình duyệt sau khi đăng xuất.");
    } catch (e) {
      console.warn("[Auth] Lỗi khi xóa dữ liệu trình duyệt:", e);
    }
  }

  Auth.clearLocalData = clearBrowserUserData;
  window.Auth = Auth;

  function isUserLoggedIn() {
    const user = (Auth && Auth.user) || (getStore().get("auth_user", null));
    if (!user) return false;
    // Guest không được tính là tài khoản đã đăng nhập thành công
    if (user.provider === "guest" || (typeof user.uid === "string" && user.uid.startsWith("guest_"))) {
      return false;
    }
    return Boolean(user.uid || user.id || user.email);
  }

  function requireAuth(redirectTarget) {
    if (isUserLoggedIn()) return true;
    let target = redirectTarget;
    if (!target) {
      target = (window.location.pathname + window.location.search + window.location.hash).replace(/^\//, '') || "index.html";
    }
    const root = (typeof window.getRusiAppRoot === "function") ? window.getRusiAppRoot() : "/";
    window.location.href = `${root}login.html?redirect=${encodeURIComponent(target)}`;
    return false;
  }

  Auth.isLoggedIn = isUserLoggedIn;
  Auth.requireAuth = requireAuth;
  window.isUserLoggedIn = isUserLoggedIn;
  window.requireAuth = requireAuth;

  Auth.isReady();
})();
