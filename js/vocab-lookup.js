/* =====================================================================
 * RusiVocabLookup — tra một từ tiếng Nga trong dữ liệu từ vựng của hệ thống
 * để tự điền cửa sổ "Thêm từ mới vào Lọ".
 * Thứ tự: lọ hệ thống (VOCAB_JARS, đã nạp sẵn) → Kho từ vựng (VOCABULARIES, file tĩnh,
 * nạp khi mở cửa sổ, có cache IndexedDB) → pool SRS / từ điển lớn (chỉ khi trang đã nạp sẵn,
 * không tự tải file từ điển 18MB).
 * ===================================================================== */
(function () {
  "use strict";

  // Từ loại chuẩn theo dữ liệu hệ thống: giá trị = "pos|gender|aspect"
  const POS_OPTIONS = [
    { value: "сущ.|м.|", group: "Danh từ", name: "Giống đực", abbr: "сущ. м." },
    { value: "сущ.|ж.|", group: "Danh từ", name: "Giống cái", abbr: "сущ. ж." },
    { value: "сущ.|ср.|", group: "Danh từ", name: "Giống trung", abbr: "сущ. ср." },
    { value: "сущ.|мн.|", group: "Danh từ", name: "Chỉ số nhiều", abbr: "сущ. мн." },
    { value: "гл.||НСВ", group: "Động từ", name: "Thể chưa hoàn thành", abbr: "гл. НСВ" },
    { value: "гл.||СВ", group: "Động từ", name: "Thể hoàn thành", abbr: "гл. СВ" },
    { value: "гл.||НСВ/СВ", group: "Động từ", name: "Hai thể", abbr: "гл. НСВ/СВ" },
    { value: "прил.||", group: "Từ loại khác", name: "Tính từ", abbr: "прил." },
    { value: "нареч.||", group: "Từ loại khác", name: "Trạng từ", abbr: "нареч." },
    { value: "мест.||", group: "Từ loại khác", name: "Đại từ", abbr: "мест." },
    { value: "числ.||", group: "Từ loại khác", name: "Số từ", abbr: "числ." },
    { value: "предл.||", group: "Từ loại khác", name: "Giới từ", abbr: "предл." },
    { value: "союз||", group: "Từ loại khác", name: "Liên từ", abbr: "союз" },
    { value: "частица||", group: "Từ loại khác", name: "Tiểu từ", abbr: "частица" },
    { value: "межд.||", group: "Từ loại khác", name: "Thán từ", abbr: "межд." },
    { value: "вводн.||", group: "Từ loại khác", name: "Từ chêm", abbr: "вводн." },
    { value: "фраза||", group: "Cụm từ", name: "Cụm từ", abbr: "фраза" },
    { value: "фразеол.||", group: "Cụm từ", name: "Thành ngữ", abbr: "фразеол." }
  ].map((o) => ({ ...o, label: (o.group === "Danh từ" || o.group === "Động từ" ? o.group + " – " + o.name.toLowerCase() : o.name) + " (" + o.abbr + ")" }));

  const norm = (s) => String(s || "")
    .replace(/[̀́]/g, "")
    .replace(/[“”«»"']/g, "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();

  /** Giá trị option khớp với từ (pos/gender/aspect), hoặc "" nếu không xác định được. */
  function posValue(w) {
    if (!w) return "";
    const pos = String(w.pos || "").trim();
    if (!pos) return "";
    const gender = String(w.gender || "").trim();
    const aspect = String(w.aspect || "").trim();
    const exact = POS_OPTIONS.find((o) => o.value === pos + "|" + gender + "|" + aspect);
    if (exact) return exact.value;
    // Danh từ thiếu giống / động từ thiếu thể: chỉ chọn khi option duy nhất khớp từ loại
    const same = POS_OPTIONS.filter((o) => o.value.split("|")[0] === pos);
    return same.length === 1 ? same[0].value : "";
  }

  function parsePos(value) {
    const [pos = "", gender = "", aspect = ""] = String(value || "").split("|");
    return { pos, gender, aspect };
  }

  const pick = (w) => w && {
    ru: w.ru || "",
    stress: (typeof window.rusiStressCase === "function" ? window.rusiStressCase : (s) => s)(w.stress || w.word_with_stress || "", w.ru || ""),
    vi: w.vi || w.meaning_vi || w.meaning || "",
    pos: w.pos || "",
    gender: w.gender || "",
    aspect: w.aspect || "",
    ex: w.ex || "",
    ex_vi: w.ex_vi || ""
  };

  // Ưu tiên bản có nghĩa + câu ví dụ đầy đủ nhất
  const score = (w) => (w.vi ? 4 : 0) + (w.ex ? 2 : 0) + (w.ex_vi ? 1 : 0) + (w.pos ? 1 : 0);

  function findIn(list, key) {
    let best = null;
    (list || []).forEach((w) => {
      if (!w || norm(w.ru || w.word_normalized) !== key) return;
      const p = pick(w);
      if (!best || score(p) > score(best)) best = p;
    });
    return best;
  }

  function findInJars(key) {
    const jars = (typeof window.VOCAB_JARS !== "undefined" && Array.isArray(window.VOCAB_JARS)) ? window.VOCAB_JARS : [];
    let best = null;
    jars.forEach((j) => {
      const hit = findIn(j && j.words, key);
      if (hit && (!best || score(hit) > score(best))) best = hit;
    });
    return best;
  }

  let vocabPromise = null;
  /** Nạp Kho từ vựng (gọi sớm khi mở cửa sổ để lúc tra không phải chờ). */
  function preload() {
    if (!vocabPromise && window.RusiDataLoader && typeof window.RusiDataLoader.load === "function") {
      vocabPromise = window.RusiDataLoader.load("VOCABULARIES").catch((err) => {
        console.warn("[RusiVocabLookup] Không nạp được Kho từ vựng:", err);
        vocabPromise = null;
        return [];
      });
    }
    return vocabPromise || Promise.resolve(window.VOCABULARIES || []);
  }

  /** Tra từ; trả về { ru, stress, vi, pos, gender, aspect, ex, ex_vi } hoặc null. */
  async function find(ru) {
    const key = norm(ru);
    if (!key) return null;
    let best = findInJars(key);
    if (best && best.vi && best.ex) return best;

    const vocab = await preload();
    const fromVocab = findIn(Array.isArray(vocab) ? vocab : window.VOCABULARIES, key);
    if (fromVocab && (!best || score(fromVocab) > score(best))) best = fromVocab;
    if (best) return best;

    // Pool SRS + từ điển lớn (nếu trang đã nạp) — không tự tải thêm
    // srs.js khai báo "const SRS" ở phạm vi toàn cục (không gắn vào window)
    const srs = typeof SRS !== "undefined" ? SRS : window.SRS;
    if (srs && typeof srs.findWord === "function") {
      const w = srs.findWord(ru);
      if (w) {
        const p = pick(w);
        // Từ điển lớn ghi pos dạng đã định dạng sẵn → để học viên tự chọn từ loại
        if (!posValue(p)) { p.pos = ""; p.gender = ""; p.aspect = ""; }
        return p;
      }
    }
    return null;
  }

  const escHtml = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CHEVRON = '<svg class="rusi-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  let selectSeq = 0;
  // Nhãn gọn trên nút: "Danh từ đực", "Động từ НСВ"...
  const SHORT = { "Giống đực": "đực", "Giống cái": "cái", "Giống trung": "trung", "Chỉ số nhiều": "số nhiều", "Thể chưa hoàn thành": "НСВ", "Thể hoàn thành": "СВ", "Hai thể": "hai thể" };
  const shortLabel = (o) => (o.group === "Danh từ" || o.group === "Động từ") ? o.group + " " + (SHORT[o.name] || o.name.toLowerCase()) : o.name;

  /**
   * Thay giao diện thả xuống mặc định của <select> từ loại bằng danh sách chia nhóm.
   * <select> gốc vẫn giữ giá trị (ẩn đi); gọi select._rusiSync() sau khi đổi value bằng code.
   */
  function enhancePosSelect(select) {
    if (!select || select._rusiSync) return;
    const uid = "rusiSel" + (++selectSeq);
    const placeholder = (select.options[0] && !select.options[0].value) ? select.options[0].textContent : "— Chọn —";
    const wrap = document.createElement("div");
    wrap.className = "rusi-select";
    const groups = [];
    POS_OPTIONS.forEach((o) => {
      let g = groups.find((x) => x.name === o.group);
      if (!g) { g = { name: o.group, items: [] }; groups.push(g); }
      g.items.push(o);
    });
    let idx = 0;
    wrap.innerHTML = `
      <button type="button" class="add-jar-input rusi-select-btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${uid}List">
        <span class="rusi-select-value"></span>${CHEVRON}
      </button>
      <div class="rusi-select-pop" id="${uid}List" role="listbox" tabindex="-1" hidden>
        <div class="rusi-select-opt rusi-select-clear" role="option" id="${uid}o${idx++}" data-value="">${escHtml(placeholder)}</div>
        ${groups.map((g) => `
          <div class="rusi-select-group" role="group" aria-label="${escHtml(g.name)}">
            <div class="rusi-select-group-label" aria-hidden="true">${escHtml(g.name)}</div>
            ${g.items.map((o) => `
              <div class="rusi-select-opt" role="option" id="${uid}o${idx++}" data-value="${escHtml(o.value)}">
                <span class="rusi-select-opt-name">${escHtml(o.name)}</span>
                <span class="rusi-select-opt-abbr" lang="ru">${escHtml(o.abbr)}</span>
              </div>`).join("")}
          </div>`).join("")}
      </div>`;
    select.insertAdjacentElement("afterend", wrap);
    // Danh sách gắn vào body khi mở: cửa sổ cha có transform (animation) làm position:fixed bị tính theo hộp cha
    const popEl = wrap.querySelector(".rusi-select-pop");
    popEl.remove();
    select.hidden = true;
    select.tabIndex = -1;

    const btn = wrap.querySelector(".rusi-select-btn");
    const pop = popEl;
    const valueEl = wrap.querySelector(".rusi-select-value");
    const opts = Array.from(pop.querySelectorAll(".rusi-select-opt"));
    // Trình đọc màn hình: đọc nhãn ô + giá trị đang chọn
    valueEl.id = uid + "Val";
    const labelledBy = select.getAttribute("aria-labelledby");
    if (labelledBy) btn.setAttribute("aria-labelledby", labelledBy + " " + valueEl.id);
    let active = -1;

    const sync = () => {
      const o = POS_OPTIONS.find((x) => x.value === select.value);
      valueEl.innerHTML = o
        ? escHtml(shortLabel(o))
        : `<span class="rusi-select-placeholder">${escHtml(placeholder)}</span>`;
      if (select.dataset.auto) btn.dataset.auto = select.dataset.auto; else delete btn.dataset.auto;
      opts.forEach((el) => el.setAttribute("aria-selected", el.dataset.value === select.value ? "true" : "false"));
    };
    select._rusiSync = sync;

    const setActive = (i) => {
      active = Math.max(0, Math.min(opts.length - 1, i));
      opts.forEach((el, k) => el.classList.toggle("is-active", k === active));
      btn.setAttribute("aria-activedescendant", opts[active].id);
      opts[active].scrollIntoView({ block: "nearest" });
    };
    const place = () => {
      const r = btn.getBoundingClientRect();
      const spaceBelow = window.innerHeight - r.bottom;
      const h = Math.min(320, Math.max(spaceBelow, r.top) - 16);
      pop.style.width = Math.max(r.width, 290) + "px";
      pop.style.maxHeight = h + "px";
      pop.style.left = Math.min(r.left, window.innerWidth - Math.max(r.width, 290) - 8) + "px";
      if (spaceBelow >= Math.min(320, pop.scrollHeight) + 16 || spaceBelow >= r.top) {
        pop.style.top = (r.bottom + 6) + "px";
        pop.style.bottom = "auto";
      } else {
        pop.style.top = "auto";
        pop.style.bottom = (window.innerHeight - r.top + 6) + "px";
      }
    };
    const onOutside = (e) => { if (!wrap.contains(e.target) && !pop.contains(e.target)) close(); };
    const onScroll = (e) => { if (!pop.contains(e.target)) place(); };
    function open() {
      if (!pop.hidden) return;
      if (!wrap.isConnected) return;
      document.body.appendChild(pop);
      pop.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      place();
      const cur = opts.findIndex((el) => el.dataset.value === select.value);
      setActive(cur >= 0 ? cur : 0);
      document.addEventListener("mousedown", onOutside, true);
      document.addEventListener("touchstart", onOutside, true);
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", close);
    }
    function close() {
      if (pop.hidden) return;
      pop.hidden = true;
      pop.remove();
      btn.setAttribute("aria-expanded", "false");
      btn.removeAttribute("aria-activedescendant");
      document.removeEventListener("mousedown", onOutside, true);
      document.removeEventListener("touchstart", onOutside, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", close);
    }
    const choose = (el) => {
      select.value = el.dataset.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      sync();
      close();
      btn.focus();
    };

    btn.addEventListener("click", () => (pop.hidden ? open() : close()));
    pop.addEventListener("click", (e) => {
      const el = e.target.closest(".rusi-select-opt");
      if (el) choose(el);
    });
    pop.addEventListener("mousemove", (e) => {
      const el = e.target.closest(".rusi-select-opt");
      if (el) { const i = opts.indexOf(el); if (i !== active) setActive(i); }
    });
    btn.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const isOpen = !pop.hidden;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) open(); else setActive(active + (e.key === "ArrowDown" ? 1 : -1));
      } else if (e.key === "Home" && isOpen) { e.preventDefault(); setActive(0); }
      else if (e.key === "End" && isOpen) { e.preventDefault(); setActive(opts.length - 1); }
      else if (e.key === "Enter" || e.key === " ") {
        // Chặn Enter lan ra cửa sổ (Enter ở cửa sổ = Lưu)
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) choose(opts[active]); else open();
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        close();
      } else if (e.key === "Tab" && isOpen) {
        close();
      }
    });
    select.addEventListener("change", sync);
    sync();
  }

  window.RusiVocabLookup = { POS_OPTIONS, posValue, parsePos, find, preload, norm, enhancePosSelect };
})();
