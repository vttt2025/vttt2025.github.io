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

  /** Lấy URL cần chuyển tiếp tới sau khi đăng nhập */
  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("redirect");
    let saved = null;
    try {
      saved = localStorage.getItem("auth_redirect");
    } catch (_) {}

    let target = param || saved || "index.html";

    // Tránh vòng lặp redirect vô tận vào trang login / signup
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

  /** Khởi tạo trang Auth */
  function initAuthPage() {
    saveRedirectFromUrl();
    updateCrossLinks();

    const isSignupPage = document.body.dataset.page === "signup";

    // 1. Nếu đã đăng nhập từ trước, tự động chuyển tiếp
    const currentUser = (window.Auth && window.Auth.user) || (window.STORE && STORE.get("auth_user", null));
    if (currentUser) {
      const banner = document.getElementById("alreadyLoggedInBanner");
      if (banner) {
        banner.style.display = "block";
        banner.innerHTML = `Bạn đang đăng nhập với <strong>${currentUser.email || currentUser.name}</strong>. Đang chuyển hướng...`;
      }
      setTimeout(executeRedirect, 700);
      return;
    }

    // Lắng nghe sự kiện đăng nhập từ Firebase Auth
    if (window.Auth && typeof window.Auth.onChange === "function") {
      window.Auth.onChange((u) => {
        if (u) {
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

    // 3. Xử lý Trải nghiệm Khách (Guest mode)
    const btnGuest = document.getElementById("btnGuestAction");
    if (btnGuest) {
      btnGuest.addEventListener("click", () => {
        if (window.Auth && typeof window.Auth.continueAsGuest === "function") {
          window.Auth.continueAsGuest();
        } else if (window.STORE) {
          window.STORE.set("auth_user", {
            uid: "guest_" + Date.now(),
            name: "Học viên Khách",
            email: "khach@rusitrki.com",
            photo: "",
            provider: "guest"
          });
        }
        executeRedirect();
      });
    }

    // 4. Xử lý Accordion ẩn/hiện form Email & Mật khẩu
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

          if (res && res.error) {
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
