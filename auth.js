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
      // Gọi ngay với trạng thái hiện tại nếu đã sẵn sàng.
      if (this._readyPromise) {
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
        return;
      }
      if (!window.firebase || !window.firebase.auth) {
        if (typeof toast === "function") toast("Firebase chưa tải xong, thử lại sau giây lát.");
        return;
      }
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        // Luôn bắt user chọn lại tài khoản để có thể chuyển đổi nhanh.
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await firebase.auth().signInWithPopup(provider);
        if (typeof toast === "function") {
          toast(`Xin chào ${result.user.displayName || "bạn"}! 👋`);
        }
      } catch (err) {
        // Người dùng tự đóng popup — không coi là lỗi.
        if (err && err.code === "auth/popup-closed-by-user") return;
        console.error("[Auth] signIn error:", err);
        if (typeof toast === "function") {
          const msg =
            err && err.code === "auth/unauthorized-domain"
              ? "Domain này chưa được phép — thêm vào Firebase > Authentication > Authorized domains."
              : "Đăng nhập thất bại, thử lại sau.";
          toast(msg);
        }
      }
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
