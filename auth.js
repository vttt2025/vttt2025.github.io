/**
 * auth.js — Module đăng nhập/đăng xuất bằng Google và Email qua Firebase.
 *
 * Phụ thuộc:
 *   - firebase-config.js  (window.FIREBASE_CONFIG, window.FIREBASE_ENABLED)
 *   - Firebase SDK compat (firebase-app-compat.js, firebase-auth-compat.js)
 *     được thêm trước file này trong từng trang HTML.
 *
 * Cung cấp:
 *   - window.Auth.user                 : thông tin user hiện tại hoặc null
 *   - window.Auth.signInWithGoogle()   : mở popup chọn tài khoản Google
 *   - window.Auth.signInWithEmail()    : đăng nhập bằng Email/Mật khẩu
 *   - window.Auth.signUpWithEmail()    : đăng ký tài khoản Email/Mật khẩu
 *   - window.Auth.continueAsGuest()    : trải nghiệm nhanh chế độ Khách
 *   - window.Auth.signOut()            : đăng xuất sạch khỏi phiên
 *   - window.Auth.onChange(callback)   : đăng ký nhận sự kiện đổi trạng thái
 *   - window.Auth.isReady()            : Promise resolve khi Auth đã sẵn sàng
 */

(function () {
  "use strict";

  /** Lấy bộ lưu trữ STORE hoặc fallback an toàn trực tiếp localStorage */
  function getStore() {
    if (typeof window !== "undefined" && window.STORE) return window.STORE;
    if (typeof STORE !== "undefined") return STORE;
    return {
      get(key, fallback) {
        try {
          const v = localStorage.getItem("trki_" + key);
          return v === null ? fallback : JSON.parse(v);
        } catch (_) {
          return fallback;
        }
      },
      set(key, val) {
        try {
          if (val === null || val === undefined) {
            localStorage.removeItem("trki_" + key);
          } else {
            localStorage.setItem("trki_" + key, JSON.stringify(val));
          }
        } catch (_) {}
      }
    };
  }

  /** Chuẩn hóa đối tượng người dùng từ Firebase User */
  function formatFirebaseUser(u) {
    if (!u) return null;
    const providerId =
      (u.providerData && u.providerData[0] && u.providerData[0].providerId) ||
      (u.email ? "password" : "custom");
    const defaultName =
      providerId === "google.com"
        ? "Người dùng Google"
        : (u.email ? u.email.split("@")[0] : "Học viên");

    return {
      uid: u.uid,
      name: u.displayName || defaultName,
      email: u.email || "",
      photo: u.photoURL || "",
      provider: providerId
    };
  }

  const Auth = {
    user: null,
    _listeners: [],
    _readyPromise: null,
    _isReadyState: false,

    /** Trả về Promise resolve khi Firebase Auth đã khởi tạo xong (hoặc fallback). */
    isReady() {
      if (this._readyPromise) return this._readyPromise;
      this._readyPromise = new Promise((resolve) => {
        const store = getStore();
        // Nạp phiên đăng nhập đã lưu trong cache để hiển thị avatar ngay (chống flash)
        const cached = store.get("auth_user", null);
        if (cached) {
          if (cached.provider === "guest" || String(cached.uid || "").startsWith("guest_")) {
            store.set("auth_user", null);
            this.user = null;
          } else {
            this.user = cached;
          }
        }

        // Nếu không bật Firebase (chưa cấu hình), báo ready ngay với user trong cache.
        if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
          this._isReadyState = true;
          this._emit(this.user);
          resolve();
          return;
        }

        try {
          if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
          const auth = firebase.auth();
          // Dùng ngôn ngữ thiết bị cho popup Google
          auth.useDeviceLanguage();

          auth.onAuthStateChanged((u) => {
            if (u) {
              this.user = formatFirebaseUser(u);
              store.set("auth_user", this.user);
              if (window.RusiSupabase && window.RusiSupabase.isReady() && this.user && this.user.uid) {
                window.RusiSupabase.profile.upsert({
                  id: this.user.uid,
                  email: this.user.email,
                  full_name: this.user.name,
                  avatar_url: this.user.photo
                }).catch(() => {});
              }
            } else {
              // Khi Firebase không có phiên đăng nhập
              this.user = null;
              store.set("auth_user", null);
            }
            this._isReadyState = true;
            this._emit(this.user);
          });

          resolve();
        } catch (err) {
          console.error("[Auth] Khởi tạo Firebase thất bại:", err);
          if (typeof toast === "function") toast("Lỗi khởi tạo đăng nhập — kiểm tra firebase-config.js");
          this._isReadyState = true;
          this._emit(this.user);
          resolve();
        }
      });
      return this._readyPromise;
    },

    /** Đăng ký callback nhận sự kiện khi user thay đổi (login / logout / restore). */
    onChange(cb) {
      this._listeners.push(cb);
      // Nếu trạng thái ban đầu đã sẵn sàng, gọi ngay callback với user hiện tại
      if (this._isReadyState) {
        try {
          cb(this.user);
        } catch (e) {
          console.error("[Auth] onChange initial call error:", e);
        }
      } else if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
        this.isReady().then(() => cb(this.user));
      }
      // Trả về hàm huỷ đăng ký.
      return () => {
        this._listeners = this._listeners.filter((fn) => fn !== cb);
      };
    },

    _emit(user) {
      this._listeners.forEach((fn) => {
        try {
          fn(user);
        } catch (e) {
          console.error("[Auth] listener error:", e);
        }
      });
    },

    /** Bắt đầu đăng nhập bằng Google thông qua popup. */
    async signInWithGoogle() {
      const store = getStore();
      if (!window.FIREBASE_ENABLED) {
        if (typeof toast === "function") {
          toast("Chưa cấu hình Firebase — mở firebase-config.js để bật đăng nhập Gmail.");
        }
        return { user: null, error: { message: "Firebase chưa được bật." } };
      }
      if (!window.firebase || !window.firebase.auth) {
        if (typeof toast === "function") toast("Firebase chưa tải xong, thử lại sau giây lát.");
        return { user: null, error: { message: "Firebase chưa tải xong." } };
      }
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        // Luôn nhắc user chọn tài khoản để có thể chuyển đổi nhanh
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await firebase.auth().signInWithPopup(provider);
        this.user = formatFirebaseUser(result.user);
        store.set("auth_user", this.user);
        this._emit(this.user);
        if (typeof toast === "function") {
          toast(`Xin chào ${this.user.name || "bạn"}!`);
        }
        return { user: this.user, error: null };
      } catch (err) {
        // Người dùng tự đóng popup — không coi là lỗi
        if (err && err.code === "auth/popup-closed-by-user") return { user: null, error: null };
        console.error("[Auth] signIn error:", err);
        let msg = "Đăng nhập thất bại, vui lòng thử lại.";
        if (err && err.code === "auth/unauthorized-domain") {
          msg = "Domain này chưa được phép — thêm vào Firebase > Authentication > Authorized domains.";
        } else if (err && err.code === "auth/network-request-failed") {
          msg = "Lỗi kết nối mạng khi liên lạc với máy chủ Google.";
        }
        if (typeof toast === "function") toast(msg);
        return { user: null, error: { message: msg, code: err && err.code } };
      }
    },

    /** Đăng nhập bằng Email & Mật khẩu */
    async signInWithEmail(email, password) {
      const store = getStore();
      if (!email || !password) {
        return { user: null, error: { message: "Vui lòng nhập đầy đủ email và mật khẩu." } };
      }
      if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
        const guestName = email.split("@")[0];
        const simulatedUser = {
          uid: "local_" + btoa(encodeURIComponent(email)).slice(0, 12),
          name: guestName,
          email: email,
          photo: "",
          provider: "password"
        };
        this.user = simulatedUser;
        store.set("auth_user", simulatedUser);
        this._emit(this.user);
        if (typeof toast === "function") toast(`Xin chào ${guestName}!`);
        return { user: this.user, error: null };
      }
      try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        this.user = formatFirebaseUser(result.user);
        store.set("auth_user", this.user);
        this._emit(this.user);
        if (typeof toast === "function") {
          toast(`Xin chào ${this.user.name || result.user.email}!`);
        }
        return { user: this.user, error: null };
      } catch (err) {
        console.error("[Auth] signInWithEmail error:", err);
        let msg = "Đăng nhập thất bại, vui lòng thử lại.";
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
          msg = "Email hoặc mật khẩu không chính xác.";
        } else if (err.code === "auth/invalid-email") {
          msg = "Địa chỉ email không hợp lệ.";
        } else if (err.code === "auth/too-many-requests") {
          msg = "Quá nhiều lần thử thất bại. Vui lòng thử lại sau ít phút.";
        } else if (err.code === "auth/operation-not-allowed") {
          msg = "Phương thức Email/Mật khẩu chưa được bật trên Firebase Console. Vui lòng đăng nhập bằng Google hoặc kích hoạt Email/Password trong Firebase.";
        } else if (err.code === "auth/network-request-failed") {
          msg = "Lỗi kết nối mạng, vui lòng kiểm tra đường truyền.";
        }
        return { user: null, error: { message: msg, code: err.code } };
      }
    },

    /** Đăng ký tài khoản mới bằng Email & Mật khẩu */
    async signUpWithEmail(email, password) {
      const store = getStore();
      if (!email || !password) {
        return { user: null, error: { message: "Vui lòng nhập đầy đủ email và mật khẩu." } };
      }
      if (password.length < 6) {
        return { user: null, error: { message: "Mật khẩu phải có tối thiểu 6 ký tự." } };
      }
      if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
        const guestName = email.split("@")[0];
        const simulatedUser = {
          uid: "local_" + btoa(encodeURIComponent(email)).slice(0, 12),
          name: guestName,
          email: email,
          photo: "",
          provider: "password"
        };
        this.user = simulatedUser;
        store.set("auth_user", simulatedUser);
        this._emit(this.user);
        if (typeof toast === "function") toast(`Tạo tài khoản thành công! Xin chào ${guestName}!`);
        return { user: this.user, error: null };
      }
      try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const guestName = email.split("@")[0];
        try {
          await result.user.updateProfile({ displayName: guestName });
        } catch (_) {}
        this.user = formatFirebaseUser(result.user);
        if (!this.user.name || this.user.name === "Học viên") this.user.name = guestName;
        store.set("auth_user", this.user);
        this._emit(this.user);
        if (typeof toast === "function") {
          toast("Tạo tài khoản thành công! Chào mừng bạn!");
        }
        return { user: this.user, error: null };
      } catch (err) {
        console.error("[Auth] signUpWithEmail error:", err);
        let msg = "Đăng ký thất bại, vui lòng thử lại.";
        if (err.code === "auth/email-already-in-use") {
          msg = "Email này đã được sử dụng. Vui lòng chuyển sang Đăng nhập.";
        } else if (err.code === "auth/weak-password") {
          msg = "Mật khẩu quá yếu (cần tối thiểu 6 ký tự).";
        } else if (err.code === "auth/invalid-email") {
          msg = "Địa chỉ email không hợp lệ.";
        } else if (err.code === "auth/operation-not-allowed") {
          msg = "Phương thức đăng ký Email chưa được bật trên Firebase Console. Vui lòng đăng nhập nhanh bằng Google hoặc kích hoạt Email/Password trong Firebase.";
        } else if (err.code === "auth/network-request-failed") {
          msg = "Lỗi kết nối mạng, vui lòng kiểm tra đường truyền.";
        }
        return { user: null, error: { message: msg, code: err.code } };
      }
    },

    /** Đăng nhập nhanh với tư cách Khách */
    continueAsGuest() {
      const store = getStore();
      const guest = {
        uid: "guest_" + Date.now(),
        name: "Học viên Khách",
        email: "khach@rusitrki.com",
        photo: "",
        provider: "guest"
      };
      this.user = guest;
      store.set("auth_user", guest);
      this._emit(guest);
      if (typeof toast === "function") toast("Chào mừng bạn trải nghiệm với tư cách Khách!");
      return guest;
    },

    /** Đăng xuất khỏi Firebase và xóa phiên cục bộ. */
    async signOut() {
      const store = getStore();
      this.user = null;
      store.set("auth_user", null);
      if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
        this._emit(null);
        return;
      }
      try {
        await firebase.auth().signOut();
        this._emit(null);
        if (typeof toast === "function") toast("Đã đăng xuất.");
      } catch (err) {
        console.error("[Auth] signOut error:", err);
        this._emit(null);
        if (typeof toast === "function") toast("Đăng xuất thất bại, thử lại sau.");
      }
    }
  };

  window.Auth = Auth;
  // Khởi tạo ngay khi script load.
  Auth.isReady();
})();
