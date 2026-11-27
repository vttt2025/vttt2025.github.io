/**
 * Giao diện Sáng / Tối / Theo hệ thống cho trang học viên.
 * Nạp đồng bộ trong <head> (không defer) để đặt data-theme trước khi vẽ trang — tránh nháy nền sáng.
 * Mặc định Sáng. Lựa chọn lưu ở localStorage "rusi_theme" (auth.js giữ khoá này khi đăng xuất).
 */
(function () {
  "use strict";
  var KEY = "rusi_theme";
  var MODES = ["light", "dark", "system"]; // thứ tự vòng bấm: Sáng → Tối → Theo hệ thống
  var LABELS = { system: "Theo hệ thống", light: "Sáng", dark: "Tối" };
  var ICONS = {
    light: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    dark: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    system: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'
  };
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var memMode = null; // lựa chọn trong phiên khi localStorage bị chặn (duyệt riêng tư)

  function getMode() {
    var m = null;
    try { m = localStorage.getItem(KEY); } catch (e) { m = memMode; }
    return MODES.indexOf(m) >= 0 ? m : "light"; // mặc định Sáng; người dùng tự chọn Tối / Theo hệ thống
  }

  function resolved(mode) {
    return mode === "dark" || (mode === "system" && media && media.matches) ? "dark" : "light";
  }

  function apply() {
    var theme = resolved(getMode());
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    if (document.body) document.body.setAttribute("data-theme", theme);
    updateButtons();
    return theme;
  }

  function updateButtons() {
    var mode = getMode();
    var next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    var btns = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].innerHTML = ICONS[mode];
      btns[i].title = "Giao diện: " + LABELS[mode] + " — bấm để chuyển sang " + LABELS[next];
      btns[i].setAttribute("aria-label", btns[i].title);
    }
  }

  function setMode(mode) {
    if (MODES.indexOf(mode) < 0) return;
    memMode = mode;
    try { localStorage.setItem(KEY, mode); } catch (e) { console.warn("[Theme] Không lưu được lựa chọn giao diện (chỉ giữ trong phiên này):", e); }
    apply();
    try { window.dispatchEvent(new CustomEvent("rusi:theme-change", { detail: { mode: mode, theme: resolved(mode) } })); } catch (e) { /* trình duyệt cũ */ }
  }

  function cycle() {
    var next = MODES[(MODES.indexOf(getMode()) + 1) % MODES.length];
    setMode(next);
    if (typeof window.toast === "function") window.toast("Giao diện: " + LABELS[next]);
  }

  /** Gắn nút đổi giao diện (header gọi sau khi vẽ). */
  function bind(btn) {
    if (!btn || btn.dataset.themeBound) return;
    btn.dataset.themeBound = "1";
    btn.setAttribute("data-theme-toggle", "");
    btn.addEventListener("click", cycle);
    updateButtons();
  }

  if (media) {
    var onSys = function () { if (getMode() === "system") apply(); };
    if (media.addEventListener) media.addEventListener("change", onSys);
    else if (media.addListener) media.addListener(onSys);
  }
  // Đổi ở tab khác → áp theo
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(); });

  // In / Lưu bài học (PDF): luôn in giao diện Sáng dù đang dùng Tối, in xong trả lại (không đổi lựa chọn đã lưu)
  var printing = false;
  function beforePrint() {
    if (printing) return;
    printing = true;
    document.documentElement.classList.add("rusi-printing");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
    if (document.body) document.body.setAttribute("data-theme", "light");
  }
  function afterPrint() {
    if (!printing) return;
    printing = false;
    document.documentElement.classList.remove("rusi-printing");
    apply();
  }
  window.addEventListener("beforeprint", beforePrint);
  window.addEventListener("afterprint", afterPrint);
  // Trình duyệt cũ không có beforeprint/afterprint: theo dõi media print
  var printMq = window.matchMedia ? window.matchMedia("print") : null;
  if (printMq) {
    var onPrintMq = function (e) { if (e.matches) beforePrint(); else afterPrint(); };
    if (printMq.addEventListener) printMq.addEventListener("change", onPrintMq);
    else if (printMq.addListener) printMq.addListener(onPrintMq);
  }

  window.RusiTheme = { getMode: getMode, setMode: setMode, cycle: cycle, apply: apply, bind: bind, resolved: function () { return resolved(getMode()); } };
  apply();
})();
