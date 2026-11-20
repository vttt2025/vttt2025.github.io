/**
 * auth.js — Lớp xác thực Supabase duy nhất cho toàn bộ website.
 *
 * Giữ nguyên API window.Auth để các trang hiện có tiếp tục hoạt động:
 * signInWithGoogle, signInWithEmail, signUpWithEmail, signOut,
 * onChange, isReady và refreshProfile.
 */
(function () {
  "use strict";

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
    } catch (_) {}
    if (fp) return fp;

    const components = [
      navigator.userAgent,
      screen.width + "x" + screen.height,
      screen.colorDepth,
      navigator.hardwareConcurrency || 2,
      Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      navigator.language || ""
    ].join("###");

    let hash = 0;
    for (let i = 0; i < components.length; i++) {
      hash = ((hash << 5) - hash) + components.charCodeAt(i);
      hash |= 0;
    }
    const randPart = Math.random().toString(36).substring(2, 10);
    fp = "dev_" + Math.abs(hash).toString(16) + "_" + randPart;
    try {
      localStorage.setItem("rusi_device_fp", fp);
    } catch (_) {}
    return fp;
  }

  function getDeviceInfo() {
    const ua = navigator.userAgent || "";
    let deviceType = "desktop";
    if (/Mobi|Android/i.test(ua) || window.innerWidth <= 768) {
      deviceType = "mobile";
    } else if (/iPad|Tablet/i.test(ua) || (window.innerWidth <= 1024 && window.innerWidth > 768)) {
      deviceType = "tablet";
    }

    let os = "Khác";
    if (/Win/i.test(ua)) os = "Windows";
    else if (/Mac/i.test(ua)) os = "macOS";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/Linux/i.test(ua)) os = "Linux";

    let browser = "Trình duyệt";
    if (/Edg/i.test(ua)) browser = "Edge";
    else if (/Chrome/i.test(ua)) browser = "Chrome";
    else if (/Safari/i.test(ua)) browser = "Safari";
    else if (/Firefox/i.test(ua)) browser = "Firefox";

    const deviceName = (deviceType === "mobile" ? "Điện thoại" : (deviceType === "tablet" ? "Máy tính bảng" : "Máy tính")) + " " + os + " (" + browser + ")";

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

    async verifyDeviceGuard() {
      if (!this.user || !window.RusiSupabase || !window.RusiSupabase.deviceGuard) return true;
      if (this.user.provider === "guest" || (typeof this.user.uid === "string" && this.user.uid.startsWith("guest_"))) return true;
      const info = getDeviceInfo();
      try {
        const res = await window.RusiSupabase.deviceGuard.register(info);
        if (res && res.allowed === false && res.reason === "device_limit_exceeded") {
          this._showDeviceLimitModal(res);
          return false;
        }
        return true;
      } catch (e) {
        console.warn("[DeviceGuard] Lỗi xác thực thiết bị:", e);
        return true;
      }
    },

    _showDeviceLimitModal(limitData) {
      const existing = document.getElementById("rusiDeviceLimitModal");
      if (existing) existing.remove();

      const modal = document.createElement("div");
      modal.id = "rusiDeviceLimitModal";
      modal.className = "anticheat-modal";
      modal.style.zIndex = "999999";

      const devices = Array.isArray(limitData.devices) ? limitData.devices : [];

      modal.innerHTML = `
        <div class="anticheat-modal-box" style="border-top-color:#e11d48;max-width:480px;text-align:left">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(225,29,72,0.1);color:#e11d48;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
              🛡️
            </div>
            <div>
              <h3 style="font-size:1.15rem;font-weight:800;color:var(--text);margin:0">GIỚI HẠN THIẾT BỊ TIN CẬY</h3>
              <span style="font-size:0.8rem;color:var(--muted)">RUSI TRKI Device Guard</span>
            </div>
          </div>

          <p style="font-size:0.88rem;color:var(--text);line-height:1.55;margin-bottom:16px">
            Tài khoản của bạn đã đạt giới hạn <b>tối đa ${limitData.max_devices || 2} thiết bị</b> đăng nhập đồng thời (theo chính sách bảo vệ tài khoản PRO). Vui lòng đăng xuất bớt một thiết bị cũ bên dưới để tiếp tục:
          </p>

          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
            ${devices.map(d => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px">
                <div>
                  <div style="font-weight:700;font-size:0.88rem;color:var(--text)">${d.device_name || "Thiết bị"}</div>
                  <div style="font-size:0.75rem;color:var(--muted)">Hoạt động: ${d.last_active_at ? new Date(d.last_active_at).toLocaleString('vi-VN') : 'Gần đây'}</div>
                </div>
                <button type="button" class="btn btn-outline btn-revoke-device" data-id="${d.id}" style="padding:6px 12px;font-size:0.8rem;color:#e11d48;border-color:#e11d48">
                  Đăng xuất
                </button>
              </div>
            `).join("")}
          </div>

          <div style="display:flex;justify-content:flex-end;gap:10px">
            <button type="button" class="btn btn-outline" id="btnDeviceModalSignOut" style="padding:8px 16px;font-size:0.85rem">
              Đăng xuất tài khoản
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelectorAll(".btn-revoke-device").forEach(btn => {
        btn.onclick = async () => {
          const id = btn.dataset.id;
          btn.textContent = "Đang xử lý...";
          btn.disabled = true;
          const ok = await window.RusiSupabase.deviceGuard.revoke(id);
          if (ok) {
            modal.remove();
            if (typeof window.toast === "function") window.toast("✓ Đã đăng xuất thiết bị cũ.");
            Auth.verifyDeviceGuard();
          } else {
            btn.textContent = "Thử lại";
            btn.disabled = false;
          }
        };
      });

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
        if (typeof Progress !== "undefined" && typeof Progress.syncToCloud === "function") {
          await Progress.syncToCloud();
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
      const preserveKeys = new Set([
        "data-theme", "rusi_theme", "theme",
        "trki_sb_anon_key", "trki_sb_service_key", "rusi_supabase_anon_key"
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
    window.location.href = `login.html?redirect=${encodeURIComponent(target)}`;
    return false;
  }

  Auth.isLoggedIn = isUserLoggedIn;
  Auth.requireAuth = requireAuth;
  window.isUserLoggedIn = isUserLoggedIn;
  window.requireAuth = requireAuth;

  Auth.isReady();
})();
