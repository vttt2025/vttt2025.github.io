/**
 * auth-page.js — Xử lý logic cho trang Đăng nhập (login.html) và Đăng ký (signup.html)
 * Tương đồng hành vi của https://dauenglish.com/login?redirect=%2F và /signup?redirect=%2F
 */

(function () {
  "use strict";

  const IGNORED_REDIRECTS = [
    "/login",
    "/signup",
    "login.html",
    "signup.html",
    "/login.html",
    "/signup.html",
    "login",
    "signup"
  ];

  let isRedirecting = false;
  let autoRedirectTimer = null;

  function isGuestUser(u) {
    return Boolean(u && (u.provider === "guest" || String(u.uid || "").startsWith("guest_")));
  }

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

  /** Lấy URL cần chuyển tiếp tới sau khi đăng nhập */
  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("redirect");
    let saved = null;
    try {
      saved = localStorage.getItem("auth_redirect");
    } catch (_) {}

    let target = param || saved || "index.html";

    // Tránh vòng lặp redirect vô tận vào chính trang login / signup
    for (const ign of IGNORED_REDIRECTS) {
      if (
        target === ign ||
        target.startsWith(ign + "?") ||
        target.endsWith(ign) ||
        target.includes(ign)
      ) {
        target = "index.html";
        break;
      }
    }

    // Đảm bảo target hợp lệ
    if (!target || target === "/" || target === "") target = "index.html";
    return target;
  }

  /** Lưu lại redirect param nếu có trên URL */
  function saveRedirectFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect");
      if (r && !IGNORED_REDIRECTS.some((ign) => r.includes(ign))) {
        localStorage.setItem("auth_redirect", r);
      }
    } catch (_) {}
  }

  /** Điều hướng sang trang đích sau khi xác thực thành công */
  function executeRedirect() {
    if (isRedirecting) return;
    isRedirecting = true;
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      autoRedirectTimer = null;
    }
    const target = getRedirectTarget();
    try {
      localStorage.removeItem("auth_redirect");
    } catch (_) {}
    window.location.href = target;
  }

  /** Cập nhật query param ?redirect=... cho các link chéo (Đăng ký <-> Đăng nhập) */
  function updateCrossLinks() {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("redirect");
    if (!r) return;

    const query = `?redirect=${encodeURIComponent(r)}`;
    const linkSignup = document.getElementById("linkToSignup");
    if (linkSignup) linkSignup.href = `signup.html${query}`;

    const linkLogin = document.getElementById("linkToLogin");
    if (linkLogin) linkLogin.href = `login.html${query}`;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Khởi tạo trang Auth */
  function initAuthPage() {
    saveRedirectFromUrl();
    updateCrossLinks();

    const isSignupPage = document.body.dataset.page === "signup";
    const store = getStore();

    // Supabase trả lỗi OAuth qua query hoặc hash; hiển thị thay vì để trang im lặng.
    const callbackParams = new URLSearchParams(
      window.location.search || (window.location.hash.startsWith("#") ? "?" + window.location.hash.slice(1) : "")
    );
    const callbackError = callbackParams.get("error_description") || callbackParams.get("error");
    if (callbackError) {
      const errorBox = document.getElementById("authErrorMsg");
      if (errorBox) {
        errorBox.textContent = decodeURIComponent(callbackError.replace(/\+/g, " "));
        errorBox.style.display = "block";
      }
    }

    // 1. Kiểm tra trạng thái đăng nhập hiện tại
    const currentUser = (window.Auth && window.Auth.user) || store.get("auth_user", null);

    if (currentUser && !isGuestUser(currentUser)) {
      const banner = document.getElementById("alreadyLoggedInBanner");
      if (banner) {
        banner.style.display = "block";
        const userName = escapeHtml(currentUser.email || currentUser.name || "bạn");
        banner.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
            <span>Bạn đang đăng nhập với <strong>${userName}</strong>.</span>
            <div style="display:flex;align-items:center;gap:10px">
              <button type="button" id="btnSwitchAccountInBanner" style="background:none;border:none;color:var(--russia-red);font-weight:700;cursor:pointer;padding:0;text-decoration:underline;font-family:inherit;font-size:13px">Đổi tài khoản</button>
              <button type="button" id="btnProceedInBanner" style="background:var(--russia-blue);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit">Tiếp tục học →</button>
            </div>
          </div>`;

        const btnSwitch = document.getElementById("btnSwitchAccountInBanner");
        if (btnSwitch) {
          btnSwitch.addEventListener("click", () => {
            if (autoRedirectTimer) {
              clearTimeout(autoRedirectTimer);
              autoRedirectTimer = null;
            }
            if (window.Auth) window.Auth.signOut();
            banner.style.display = "none";
          });
        }

        const btnProceed = document.getElementById("btnProceedInBanner");
        if (btnProceed) {
          btnProceed.addEventListener("click", () => executeRedirect());
        }

        // Tự động chuyển tiếp sau 1.5 giây nếu người dùng không thao tác đổi tài khoản
        autoRedirectTimer = setTimeout(executeRedirect, 1500);
        return;
      }
    } else if (currentUser && isGuestUser(currentUser)) {
      // Xóa phiên Khách cũ nếu có để người dùng đăng nhập chính thống
      store.set("auth_user", null);
      if (window.Auth) window.Auth.user = null;
    }

    // Lắng nghe sự kiện đăng nhập từ Firebase Auth
    if (window.Auth && typeof window.Auth.onChange === "function") {
      window.Auth.onChange((u) => {
        if (u && !isGuestUser(u)) {
          executeRedirect();
        }
      });
    }

    // 2. Xử lý nút Google Sign-In
    const btnGoogle = document.getElementById("btnGoogleAction");
    if (btnGoogle) {
      btnGoogle.addEventListener("click", async () => {
        btnGoogle.disabled = true;
        btnGoogle.classList.add("loading");
        try {
          if (window.Auth && typeof window.Auth.signInWithGoogle === "function") {
            const res = await window.Auth.signInWithGoogle();
            if (res && res.error) {
              showError(res.error.message || "Đăng nhập Google thất bại.");
              return;
            }
            if (res && res.user) {
              executeRedirect();
              return;
            }
          }
        } catch (err) {
          console.error("[AuthPage] Google auth error:", err);
        } finally {
          btnGoogle.disabled = false;
          btnGoogle.classList.remove("loading");
        }
      });
    }

    // 2. Xử lý Accordion ẩn/hiện form Email & Mật khẩu
    const btnToggleEmail = document.getElementById("btnToggleEmail");
    const emailForm = document.getElementById("emailAuthForm");
    if (btnToggleEmail && emailForm) {
      btnToggleEmail.addEventListener("click", () => {
        const isClosed = emailForm.style.display === "none" || !emailForm.style.display;
        if (isClosed) {
          emailForm.style.display = "block";
          btnToggleEmail.setAttribute("aria-expanded", "true");
          btnToggleEmail.classList.add("active");
          const firstInput = emailForm.querySelector("input");
          if (firstInput) firstInput.focus();
        } else {
          emailForm.style.display = "none";
          btnToggleEmail.setAttribute("aria-expanded", "false");
          btnToggleEmail.classList.remove("active");
        }
      });
    }

    // 5. Xử lý Submit Form Email & Mật khẩu
    if (emailForm) {
      emailForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const errorBox = document.getElementById("authErrorMsg");
        if (errorBox) {
          errorBox.style.display = "none";
          errorBox.textContent = "";
        }

        const emailInput = document.getElementById("authEmail");
        const passwordInput = document.getElementById("authPassword");
        const email = (emailInput ? emailInput.value : "").trim();
        const password = passwordInput ? passwordInput.value : "";

        if (!email || !password) {
          showError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showError("Địa chỉ email không đúng định dạng (ví dụ: you@example.com).");
          return;
        }

        if (isSignupPage) {
          const confirmInput = document.getElementById("authConfirmPassword");
          const confirmPassword = confirmInput ? confirmInput.value : "";
          if (password !== confirmPassword) {
            showError("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
            return;
          }
          if (password.length < 6) {
            showError("Mật khẩu phải có tối thiểu 6 ký tự.");
            return;
          }
        }

        const submitBtn = document.getElementById("btnSubmitEmail");
        const spinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
        if (submitBtn) submitBtn.disabled = true;
        if (spinner) spinner.style.display = "inline-block";

        try {
          let res;
          if (isSignupPage) {
            res = await window.Auth.signUpWithEmail(email, password);
          } else {
            res = await window.Auth.signInWithEmail(email, password);
          }

          if (res && res.needsEmailConfirmation) {
            showError(res.error?.message || "Vui lòng kiểm tra email để xác nhận tài khoản.");
          } else if (res && res.error) {
            showError(res.error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
          } else if (res && res.user) {
            executeRedirect();
          }
        } catch (err) {
          console.error("[AuthPage] Submit error:", err);
          showError("Không thể hoàn tất thao tác. Vui lòng thử lại sau.");
        } finally {
          if (submitBtn) submitBtn.disabled = false;
          if (spinner) spinner.style.display = "none";
        }
      });
    }

    function showError(msg) {
      const errorBox = document.getElementById("authErrorMsg");
      if (errorBox) {
        errorBox.textContent = msg;
        errorBox.style.display = "block";
      } else if (typeof toast === "function") {
        toast(msg);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuthPage);
  } else {
    initAuthPage();
  }
})();
