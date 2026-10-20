/**
 * auth.js — Module đăng nhập/đăng xuất bằng Google qua Firebase.
 *
 * Phụ thuộc:
 *   - firebase-config.js  (window.FIREBASE_CONFIG, window.FIREBASE_ENABLED)
 *   - Firebase SDK compat (firebase-app-compat.js, firebase-auth-compat.js)
 *     được thêm trước file này trong từng trang HTML.
 *
 * Cung cấp:
 *   - window.Auth.user          : thông tin user hiện tại hoặc null
 *   - window.Auth.signInWithGoogle()  : mở popup chọn tài khoản Google
 *   - window.Auth.signOut()           : đăng xuất
 *   - window.Auth.onChange(callback)   : đăng ký nhận sự kiện đổi trạng thái
 *   - window.Auth.isReady             : Promise resolve khi Firebase đã sẵn sàng
 */

(function () {
  "use strict";

  const Auth = {
    user: null,
    _listeners: [],
    _readyPromise: null,

    /** Trả về Promise resolve khi Firebase Auth đã khởi tạo xong (hoặc fallback). */
    isReady() {
      if (this._readyPromise) return this._readyPromise;
      this._readyPromise = new Promise((resolve) => {
        // Nếu không bật Firebase (chưa cấu hình), báo ready ngay với user = null.
        if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
          this._emit(null);
          resolve();
          return;
        }
        try {
          if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
          const auth = firebase.auth();
          // Dùng ngôn ngữ Việt cho popup Google.
          auth.useDeviceLanguage();
          auth.onAuthStateChanged((u) => {
            this.user = u
              ? {
                  uid: u.uid,
                  name: u.displayName || "Người dùng Google",
                  email: u.email || "",
                  photo: u.photoURL || "",
                  provider: "google.com"
                }
              : null;
            this._emit(this.user);
          });
          resolve();
        } catch (err) {
          console.error("[Auth] Khởi tạo Firebase thất bại:", err);
          if (typeof toast === "function") toast("Lỗi khởi tạo đăng nhập — kiểm tra firebase-config.js");
          this._emit(null);
          resolve();
        }
      });
      return this._readyPromise;
    },

    /** Đăng ký callback nhận sự kiện khi user thay đổi (login / logout / restore). */
    onChange(cb) {
      this._listeners.push(cb);
      // KHÔNG gọi cb ngay lập tức: khi Firebase bật, onAuthStateChanged sẽ tự
      // fire một lần đầu khi đăng ký (kể cả khi chưa đăng nhập). Gọi cb ngay
      // với this.user = null trước khi phiên được khôi phục sẽ gây "flash"
      // nút Đăng nhập ↔ avatar trên header mỗi lần chuyển trang.
      // Chỉ gọi ngay khi chạy chế độ khách (không có Firebase).
      if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
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
        // Luôn bắt user chọn lại tài khoản để có thể chuyển đổi nhanh.
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await firebase.auth().signInWithPopup(provider);
        if (typeof toast === "function") {
          toast(`Xin chào ${result.user.displayName || "bạn"}! 👋`);
        }
        return { user: result.user, error: null };
      } catch (err) {
        // Người dùng tự đóng popup — không coi là lỗi.
        if (err && err.code === "auth/popup-closed-by-user") return { user: null, error: null };
        console.error("[Auth] signIn error:", err);
        let msg = "Đăng nhập thất bại, thử lại sau.";
        if (err && err.code === "auth/unauthorized-domain") {
          msg = "Domain này chưa được phép — thêm vào Firebase > Authentication > Authorized domains.";
        }
        if (typeof toast === "function") toast(msg);
        return { user: null, error: { message: msg, code: err && err.code } };
      }
    },

    /** Đăng nhập bằng Email & Mật khẩu */
    async signInWithEmail(email, password) {
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
        if (window.STORE) window.STORE.set("auth_user", simulatedUser);
        this._emit(this.user);
        if (typeof toast === "function") toast(`Xin chào ${guestName}! 👋`);
        return { user: this.user, error: null };
      }
      try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (typeof toast === "function") {
          toast(`Xin chào ${result.user.displayName || result.user.email}! 👋`);
        }
        return { user: result.user, error: null };
      } catch (err) {
        console.error("[Auth] signInWithEmail error:", err);
        let msg = "Đăng nhập thất bại, vui lòng thử lại.";
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
          msg = "Email hoặc mật khẩu không chính xác.";
        } else if (err.code === "auth/invalid-email") {
          msg = "Địa chỉ email không hợp lệ.";
        } else if (err.code === "auth/too-many-requests") {
          msg = "Quá nhiều lần thử thất bại. Vui lòng thử lại sau ít phút.";
        }
        return { user: null, error: { message: msg, code: err.code } };
      }
    },

    /** Đăng ký tài khoản mới bằng Email & Mật khẩu */
    async signUpWithEmail(email, password) {
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
        if (window.STORE) window.STORE.set("auth_user", simulatedUser);
        this._emit(this.user);
        if (typeof toast === "function") toast(`Tạo tài khoản thành công! Xin chào ${guestName}! 👋`);
        return { user: this.user, error: null };
      }
      try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (typeof toast === "function") {
          toast("Tạo tài khoản thành công! Chào mừng bạn! 🎉");
        }
        return { user: result.user, error: null };
      } catch (err) {
        console.error("[Auth] signUpWithEmail error:", err);
        let msg = "Đăng ký thất bại, vui lòng thử lại.";
        if (err.code === "auth/email-already-in-use") {
          msg = "Email này đã được sử dụng. Vui lòng chuyển sang Đăng nhập.";
        } else if (err.code === "auth/weak-password") {
          msg = "Mật khẩu quá yếu (cần tối thiểu 6 ký tự).";
        } else if (err.code === "auth/invalid-email") {
          msg = "Địa chỉ email không hợp lệ.";
        }
        return { user: null, error: { message: msg, code: err.code } };
      }
    },

    /** Đăng nhập nhanh với tư cách Khách */
    continueAsGuest() {
      const guest = {
        uid: "guest_" + Date.now(),
        name: "Học viên Khách",
        email: "khach@rusitrki.com",
        photo: "",
        provider: "guest"
      };
      this.user = guest;
      if (window.STORE) window.STORE.set("auth_user", guest);
      this._emit(guest);
      if (typeof toast === "function") toast("Chào mừng bạn trải nghiệm với tư cách Khách! 👋");
      return guest;
    },

    /** Đăng xuất khỏi Firebase. */
    async signOut() {
      if (!window.FIREBASE_ENABLED || !window.firebase || !window.firebase.auth) {
        this.user = null;
        this._emit(null);
        return;
      }
      try {
        await firebase.auth().signOut();
        if (typeof toast === "function") toast("Đã đăng xuất.");
      } catch (err) {
        console.error("[Auth] signOut error:", err);
        if (typeof toast === "function") toast("Đăng xuất thất bại, thử lại sau.");
      }
    }
  };

  window.Auth = Auth;
  // Khởi tạo ngay khi script load.
  Auth.isReady();
})();
