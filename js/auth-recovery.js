/**
 * js/auth-recovery.js — Luồng "Quên mật khẩu" cho tài khoản Email (login.html).
 *
 * 1. Bấm "Quên mật khẩu?" → nhập email → supabase.auth.resetPasswordForEmail(email, { redirectTo: origin + "/login" }).
 *    Luôn báo cùng một câu dù email có tồn tại hay không (không lộ thông tin tài khoản).
 * 2. Mở liên kết trong email → quay lại /login?code=... (PKCE). Supabase client (detectSessionInUrl) đổi mã lấy phiên;
 *    trang nhận biết đây là phiên khôi phục nhờ cờ đã ghi ở bước 1 (cùng trình duyệt — PKCE bắt buộc) hoặc tham số
 *    type=recovery / token_hash (nếu mẫu email dùng {{ .TokenHash }}) → hiện form đặt mật khẩu mới → auth.updateUser.
 * Trong lúc khôi phục, auth-page.js KHÔNG tự chuyển trang (kiểm tra window.RusiAuthRecovery.isActive()).
 * Phụ thuộc: supabase-client.js (RusiSupabase.getClient), auth.js (RusiAuthCallbackAtLoad, Auth.isReady), app.js (toast).
 */
(function () {
  "use strict";

  const FLAG_KEY = "rusi_pw_reset_requested_at";
  const FLAG_TTL_MS = 24 * 3600 * 1000;
  const MIN_PASSWORD = 6;
  const GENERIC_SENT_MSG = "Nếu email này đã đăng ký, bạn sẽ nhận được thư có liên kết đặt lại mật khẩu trong vài phút. Hãy kiểm tra cả mục Spam.";

  const cb = window.RusiAuthCallbackAtLoad || { hasCode: false, tokenHash: "", type: "" };

  function readFlag() {
    try {
      const at = Number(localStorage.getItem(FLAG_KEY) || 0);
      return at > 0 && Date.now() - at < FLAG_TTL_MS;
    } catch (_) {
      return false;
    }
  }
  function setFlag(on) {
    try {
      if (on) localStorage.setItem(FLAG_KEY, String(Date.now()));
      else localStorage.removeItem(FLAG_KEY);
    } catch (_) {}
  }

  const isRecoveryType = cb.type === "recovery";
  // Quyết định ngay khi nạp script để auth-page.js (nạp sau) không tự chuyển trang
  let active = Boolean((cb.tokenHash && isRecoveryType) || isRecoveryType || (cb.hasCode && readFlag()));

  window.RusiAuthRecovery = { isActive: () => active };

  const $ = (id) => document.getElementById(id);
  const notify = (msg) => {
    if (typeof window.toast === "function") window.toast(msg);
    else if (typeof toast === "function") toast(msg);
  };
  const getClient = () => (window.RusiSupabase && window.RusiSupabase.getClient ? window.RusiSupabase.getClient() : null);
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function setBusy(btn, busy) {
    if (!btn) return;
    btn.disabled = busy;
    const sp = btn.querySelector(".btn-spinner");
    if (sp) sp.style.display = busy ? "inline-block" : "none";
  }

  function showLoginChrome(show) {
    document.querySelectorAll(".auth-heading-block, .auth-main-action, .auth-accordion-wrap, .auth-footer-crosslink")
      .forEach((el) => { el.style.display = show ? "" : "none"; });
    const banner = $("alreadyLoggedInBanner");
    if (banner && !show) banner.style.display = "none";
  }

  function hideLoginFormKeepAccordionOpen() {
    const form = $("emailAuthForm");
    const trigger = $("btnToggleEmail");
    if (trigger) { trigger.setAttribute("aria-expanded", "true"); trigger.classList.add("active"); }
    if (form) form.style.display = "none";
  }

  function showForgotForm(prefillEmail) {
    showLoginChrome(true);
    const reset = $("resetPasswordForm");
    if (reset) reset.style.display = "none";
    hideLoginFormKeepAccordionOpen();
    const forgot = $("forgotPasswordForm");
    if (!forgot) return;
    forgot.style.display = "block";
    const input = $("forgotEmail");
    if (input) {
      if (prefillEmail && !input.value) input.value = prefillEmail;
      input.focus();
    }
  }

  function showLoginForm() {
    const forgot = $("forgotPasswordForm");
    const login = $("emailAuthForm");
    if (forgot) forgot.style.display = "none";
    if (login) login.style.display = "block";
    const pw = $("authPassword");
    if (pw) pw.focus();
  }

  function wireForgot() {
    const link = $("btnForgotPassword");
    if (link) link.addEventListener("click", () => showForgotForm(($("authEmail") && $("authEmail").value || "").trim()));
    const back = $("btnBackToLogin");
    if (back) back.addEventListener("click", showLoginForm);
    // Bấm thanh "Đăng nhập bằng email" khi đang ở form quên mật khẩu → đóng form này (auth-page.js tự bật/tắt form đăng nhập)
    const trigger = $("btnToggleEmail");
    if (trigger) trigger.addEventListener("click", () => { const f = $("forgotPasswordForm"); if (f) f.style.display = "none"; });

    const form = $("forgotPasswordForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = (($("forgotEmail") && $("forgotEmail").value) || "").trim();
      if (!isValidEmail(email)) {
        notify("Địa chỉ email không đúng định dạng (ví dụ: you@example.com).");
        return;
      }
      const client = getClient();
      if (!client) {
        notify("Chưa kết nối được máy chủ. Vui lòng thử lại sau.");
        return;
      }
      const btn = $("btnSendResetEmail");
      setBusy(btn, true);
      try {
        setFlag(true); // ghi trước: Supabase lưu code_verifier PKCE ngay trong lời gọi này
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/login" });
        if (error && (error.status === 429 || /rate limit|security purposes|seconds/i.test(error.message || ""))) {
          notify("Bạn vừa yêu cầu gần đây. Vui lòng đợi khoảng 1 phút rồi thử lại.");
          return;
        }
        if (error) console.warn("[AuthRecovery] resetPasswordForEmail:", error.message || error);
        // Không phân biệt email có tồn tại hay không
        notify(GENERIC_SENT_MSG);
        showLoginForm();
      } catch (err) {
        console.error("[AuthRecovery] Lỗi gửi email đặt lại mật khẩu:", err);
        notify("Không gửi được yêu cầu (lỗi mạng). Vui lòng thử lại.");
      } finally {
        setBusy(btn, false);
      }
    });
  }

  function cleanRecoveryParams() {
    try {
      const sp = new URLSearchParams(window.location.search || "");
      ["code", "token_hash", "type"].forEach((k) => sp.delete(k));
      const q = sp.toString();
      window.history.replaceState(null, document.title, window.location.pathname + (q ? "?" + q : ""));
    } catch (_) {}
  }

  function updatePasswordErrorText(error) {
    const m = String((error && error.message) || "").toLowerCase();
    if (m.includes("different from the old") || m.includes("should be different")) return "Mật khẩu mới phải khác mật khẩu cũ.";
    if (m.includes("weak") || m.includes("at least") || m.includes("characters")) return "Mật khẩu chưa đủ mạnh. Hãy dùng ít nhất 6 ký tự, nên có cả chữ và số.";
    if (m.includes("session") || m.includes("jwt") || m.includes("expired")) return "Phiên đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu gửi lại liên kết.";
    return "Không lưu được mật khẩu mới. Vui lòng thử lại.";
  }

  async function startRecovery() {
    showLoginChrome(false);
    const form = $("resetPasswordForm");
    const status = $("resetPasswordStatus");
    const saveBtn = $("btnSaveNewPassword");
    const resendBtn = $("btnResendReset");
    if (!form) return;
    form.style.display = "block";

    const fail = (msg) => {
      if (status) status.textContent = msg;
      if (saveBtn) { saveBtn.disabled = true; saveBtn.style.display = "none"; }
      form.querySelectorAll(".auth-form-group").forEach((g) => { g.style.display = "none"; });
      if (resendBtn) resendBtn.style.display = "";
    };

    let hasSession = false;
    try {
      const client = getClient();
      if (!client) throw new Error("no client");
      if (cb.tokenHash) {
        // Mẫu email dùng {{ .TokenHash }}: xác minh trực tiếp, mở được trên trình duyệt khác
        const { data, error } = await client.auth.verifyOtp({ token_hash: cb.tokenHash, type: "recovery" });
        hasSession = Boolean(!error && data && data.session);
      } else {
        if (window.Auth && typeof window.Auth.isReady === "function") await window.Auth.isReady();
        const { data } = await client.auth.getSession();
        hasSession = Boolean(data && data.session);
      }
    } catch (err) {
      console.error("[AuthRecovery] Không xác minh được liên kết khôi phục:", err);
    }
    cleanRecoveryParams();

    if (!hasSession) {
      fail("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Hãy yêu cầu gửi lại và mở thư trên chính trình duyệt đã gửi yêu cầu.");
      return;
    }
    if (status) status.textContent = "Nhập mật khẩu mới cho tài khoản của bạn.";
    if (saveBtn) saveBtn.disabled = false;
    const first = $("newPassword");
    if (first) first.focus();
  }

  function wireReset() {
    const form = $("resetPasswordForm");
    if (!form) return;
    const resendBtn = $("btnResendReset");
    if (resendBtn) resendBtn.addEventListener("click", () => { active = false; setFlag(false); showForgotForm(""); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const pw = ($("newPassword") && $("newPassword").value) || "";
      const pw2 = ($("newPasswordConfirm") && $("newPasswordConfirm").value) || "";
      if (pw.length < MIN_PASSWORD) { notify(`Mật khẩu phải có tối thiểu ${MIN_PASSWORD} ký tự.`); return; }
      if (pw !== pw2) { notify("Mật khẩu nhập lại không khớp."); return; }
      const client = getClient();
      if (!client) { notify("Chưa kết nối được máy chủ. Vui lòng thử lại sau."); return; }
      const btn = $("btnSaveNewPassword");
      setBusy(btn, true);
      try {
        const { error } = await client.auth.updateUser({ password: pw });
        if (error) {
          console.warn("[AuthRecovery] updateUser:", error.message || error);
          notify(updatePasswordErrorText(error));
          setBusy(btn, false);
          return;
        }
        setFlag(false);
        active = false;
        notify("Đã đặt mật khẩu mới thành công! Đang chuyển trang…");
        const target = typeof window.getRedirectTarget === "function" ? window.getRedirectTarget() : "index.html";
        setTimeout(() => { window.location.href = target; }, 1200);
      } catch (err) {
        console.error("[AuthRecovery] Lỗi đặt mật khẩu mới:", err);
        notify("Không lưu được mật khẩu mới (lỗi mạng). Vui lòng thử lại.");
        setBusy(btn, false);
      }
    });
  }

  function init() {
    if (document.body.dataset.page !== "login") return;
    wireForgot();
    wireReset();
    if (active) startRecovery();
    // Đăng nhập lại bằng mật khẩu cũ / Google thì không còn chờ email khôi phục
    const loginForm = $("emailAuthForm");
    if (loginForm) loginForm.addEventListener("submit", () => { if (!active) setFlag(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
