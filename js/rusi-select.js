/**
 * rusi-select.js — Ô chọn tự vẽ thay danh sách thả xuống mặc định của trình duyệt (không tuỳ biến được giao diện
 * và luôn có thanh cuộn hệ thống). Tự nâng cấp mọi <select> trong trang, kể cả select vẽ lại sau này (MutationObserver).
 *
 * - <select> gốc vẫn ở trong DOM (ẩn thị giác) và luôn giữ giá trị thật: mã đang đọc select.value, trình xử lý
 *   onchange / addEventListener vẫn chạy (chọn → gán value rồi phát sự kiện input + change).
 * - Danh sách: cuộn được nhưng ẩn thanh cuộn; hỗ trợ optgroup, mục disabled, phím ↑ ↓ Home End Enter Esc,
 *   gõ chữ để nhảy tới mục; tự lật lên trên khi thiếu chỗ phía dưới.
 * - Bỏ qua: select multiple / size > 1, data-native="1", select đã có ô tự vẽ riêng (.rusi-select).
 */
(function () {
  "use strict";

  const enhanced = new Map(); // select → { btn, label }
  let open = null; // { select, btn, pop, items, active }
  let uidSeq = 0;
  const CHEVRON = '<svg class="rsel-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  const CHECK = '<svg class="rsel-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

  function escHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function skip(sel) {
    return sel.multiple || (sel.size && sel.size > 1) || sel.dataset.native === "1" || sel.closest(".rusi-select") || enhanced.has(sel);
  }

  function selectedText(sel) {
    const o = sel.options[sel.selectedIndex];
    return o ? o.text : "";
  }

  function syncButton(sel) {
    const rec = enhanced.get(sel);
    if (!rec) return;
    const txt = selectedText(sel);
    if (rec.label.textContent !== txt) rec.label.textContent = txt;
    const placeholder = sel.selectedIndex >= 0 && sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].value === "";
    rec.btn.classList.toggle("rsel-placeholder", !!placeholder);
    if (rec.btn.disabled !== sel.disabled) rec.btn.disabled = sel.disabled;
    const cls = "rsel-btn " + Array.from(sel.classList).filter((c) => c !== "rsel-native" && c !== "live-draft-field").join(" ");
    if (rec.btn.className.replace(/ ?rsel-placeholder/, "") !== cls) {
      rec.btn.className = cls + (placeholder ? " rsel-placeholder" : "");
    }
  }

  function enhance(sel) {
    if (skip(sel)) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    const labelledBy = sel.getAttribute("aria-label");
    if (labelledBy) btn.setAttribute("aria-label", labelledBy);
    if (sel.title) btn.title = sel.title;
    btn.innerHTML = `<span class="rsel-value"></span>${CHEVRON}`;
    // Nhãn <label for=...> trỏ vào select → chuyển cho nút
    if (sel.id) {
      const lab = document.querySelector(`label[for="${CSS.escape(sel.id)}"]`);
      if (lab) lab.addEventListener("click", (e) => { e.preventDefault(); btn.focus(); });
    }
    sel.classList.add("rsel-native");
    sel.setAttribute("tabindex", "-1");
    sel.setAttribute("aria-hidden", "true");
    sel.insertAdjacentElement("afterend", btn);
    enhanced.set(sel, { btn, label: btn.querySelector(".rsel-value") });
    syncButton(sel);

    btn.addEventListener("click", () => (open && open.select === sel ? close(true) : openFor(sel)));
    btn.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openFor(sel);
      }
    });
    sel.addEventListener("change", () => syncButton(sel));
  }

  function buildItems(sel) {
    const items = [];
    let html = "";
    const addOpt = (o) => {
      const i = items.length;
      items.push(o);
      const isSel = o.index === sel.selectedIndex;
      html += `<div class="rsel-opt${isSel ? " is-selected" : ""}${o.disabled ? " is-disabled" : ""}" role="option" id="${open.uid}o${i}" data-i="${i}" aria-selected="${isSel}"${o.disabled ? ' aria-disabled="true"' : ""}><span class="rsel-opt-text">${escHtml(o.text)}</span>${isSel ? CHECK : ""}</div>`;
    };
    Array.from(sel.children).forEach((node) => {
      if (node.tagName === "OPTGROUP") {
        html += `<div class="rsel-group" role="group" aria-label="${escHtml(node.label)}"><div class="rsel-group-label" aria-hidden="true">${escHtml(node.label)}</div>`;
        Array.from(node.children).forEach((o) => { if (o.tagName === "OPTION" && !o.hidden) addOpt(o); });
        html += "</div>";
      } else if (node.tagName === "OPTION" && !node.hidden) {
        addOpt(node);
      }
    });
    return { items, html };
  }

  function position() {
    if (!open) return;
    const r = open.btn.getBoundingClientRect();
    const pop = open.pop;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const below = vh - r.bottom - 8;
    const above = r.top - 8;
    const want = Math.min(pop.scrollHeight, 320);
    const up = below < Math.min(want, 200) && above > below;
    const maxH = Math.max(120, Math.min(320, up ? above : below));
    pop.style.maxHeight = maxH + "px";
    const width = Math.min(Math.max(r.width, 200), vw - 16);
    pop.style.width = width + "px";
    pop.style.left = Math.max(8, Math.min(r.left, vw - width - 8)) + "px";
    if (up) {
      pop.style.top = "";
      pop.style.bottom = (vh - r.top + 4) + "px";
    } else {
      pop.style.bottom = "";
      pop.style.top = (r.bottom + 4) + "px";
    }
    pop.classList.toggle("is-up", up);
  }

  function setActive(i, scroll) {
    if (!open) return;
    const els = open.pop.querySelectorAll(".rsel-opt");
    els.forEach((el) => el.classList.toggle("is-active", Number(el.dataset.i) === i));
    open.active = i;
    const el = open.pop.querySelector(`.rsel-opt[data-i="${i}"]`);
    if (el) {
      open.pop.setAttribute("aria-activedescendant", el.id);
      if (scroll) el.scrollIntoView({ block: "nearest" });
    }
  }

  function step(dir) {
    if (!open) return;
    const n = open.items.length;
    let i = open.active;
    for (let k = 0; k < n; k++) {
      i = (i + dir + n) % n;
      if (!open.items[i].disabled) { setActive(i, true); return; }
    }
  }

  function choose(i) {
    if (!open) return;
    const o = open.items[i];
    if (!o || o.disabled) return;
    const sel = open.select;
    close(true);
    if (sel.selectedIndex !== o.index) {
      sel.selectedIndex = o.index;
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }
    syncButton(sel);
  }

  function openFor(sel) {
    if (sel.disabled) return;
    close(false);
    const rec = enhanced.get(sel);
    const uid = "rsel" + (++uidSeq);
    open = { select: sel, btn: rec.btn, pop: null, items: [], active: -1, uid, typed: "", typedAt: 0 };
    const { items, html } = buildItems(sel);
    const pop = document.createElement("div");
    pop.className = "rsel-pop";
    pop.id = uid;
    pop.setAttribute("role", "listbox");
    pop.tabIndex = -1;
    pop.innerHTML = html;
    // Theo giao diện sáng/tối của trang (biến màu đặt theo data-theme)
    document.body.appendChild(pop);
    open.pop = pop;
    open.items = items;
    rec.btn.setAttribute("aria-expanded", "true");
    rec.btn.setAttribute("aria-controls", uid);
    rec.btn.classList.add("is-open");
    position();
    const cur = items.findIndex((o) => o.index === sel.selectedIndex);
    setActive(cur >= 0 ? cur : items.findIndex((o) => !o.disabled), true);
    pop.focus({ preventScroll: true });

    pop.addEventListener("mousedown", (e) => e.preventDefault());
    pop.addEventListener("click", (e) => {
      const el = e.target.closest(".rsel-opt");
      if (el) choose(Number(el.dataset.i));
    });
    pop.addEventListener("mousemove", (e) => {
      const el = e.target.closest(".rsel-opt");
      if (el && !el.classList.contains("is-disabled") && Number(el.dataset.i) !== open.active) setActive(Number(el.dataset.i), false);
    });
    pop.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
      else if (e.key === "Home") { e.preventDefault(); setActive(items.findIndex((o) => !o.disabled), true); }
      else if (e.key === "End") { e.preventDefault(); for (let i = items.length - 1; i >= 0; i--) if (!items[i].disabled) { setActive(i, true); break; } }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(open.active); }
      else if (e.key === "Escape") { e.preventDefault(); close(true); }
      else if (e.key === "Tab") { close(false); }
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const now = Date.now();
        open.typed = (now - open.typedAt < 700 ? open.typed : "") + e.key.toLowerCase();
        open.typedAt = now;
        const hit = items.findIndex((o) => !o.disabled && o.text.toLowerCase().startsWith(open.typed));
        if (hit >= 0) setActive(hit, true);
      }
    });
    pop.addEventListener("blur", () => setTimeout(() => {
      if (open && open.pop === pop && !pop.contains(document.activeElement) && document.activeElement !== rec.btn) close(false);
    }, 0));
  }

  function close(refocus) {
    if (!open) return;
    const { pop, btn } = open;
    open = null;
    pop.remove();
    btn.setAttribute("aria-expanded", "false");
    btn.removeAttribute("aria-controls");
    btn.classList.remove("is-open");
    if (refocus && btn.isConnected) btn.focus({ preventScroll: true });
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    if (root.tagName === "SELECT") enhance(root);
    root.querySelectorAll("select").forEach(enhance);
  }

  function init() {
    scan(document.body);
    new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => { if (n.nodeType === 1) scan(n); });
        if (m.type === "childList" && m.target.tagName === "SELECT") syncButton(m.target);
      }
      // Select bị gỡ khỏi trang (vẽ lại) → bỏ khỏi danh sách; danh sách đang mở thì đóng
      enhanced.forEach((rec, sel) => {
        if (!sel.isConnected) {
          enhanced.delete(sel);
          if (open && open.select === sel) close(false);
        }
      });
    }).observe(document.body, { childList: true, subtree: true });

    // Gán select.value bằng mã (không phát sự kiện) → cập nhật nhãn nút
    setInterval(() => {
      if (document.hidden) return;
      enhanced.forEach((rec, sel) => syncButton(sel));
    }, 400);

    document.addEventListener("mousedown", (e) => {
      if (open && !open.pop.contains(e.target) && !open.btn.contains(e.target)) close(false);
    }, true);
    window.addEventListener("resize", () => position());
    document.addEventListener("scroll", (e) => {
      if (open && !open.pop.contains(e.target)) position();
    }, true);
    window.addEventListener("hashchange", () => close(false));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.RusiSelect = { refresh: syncButton, scan };
})();
