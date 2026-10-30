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

  const Auth = {
    user: null,
    _listeners: [],
    _readyPromise: null,
    _subscription: null,

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
      const client = getClient();
      if (client) await client.auth.signOut();
      this.user = null;
      getStore().set("auth_user", null);
      this._emit(null);
    }
  };

  window.Auth = Auth;
  Auth.isReady();
})();
