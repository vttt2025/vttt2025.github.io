/* =====================================================================
 * WordDetail — modal chi tiết từ vựng kiểu TFlat cho Mishka TRKI
 *
 * Khi bấm vào một từ, modal hiện các mục nhỏ gập/mở được:
 *   📖 Nghĩa · 💬 Ví dụ · 🧩 Kết cấu đi kèm · ↔️ Đồng/Trái nghĩa ·
 *   🌳 Họ từ · 📊 Chia 6 cách · 📈 Học từ này
 *
 * - Tự động phát âm khi mở (ưu tiên ghi âm thật trên Wikimedia Commons,
 *   fallback tổng hợp giọng đọc của trình duyệt).
 * - Mỗi từ liên quan đều bấm được để mở tiếp từ đó (điều hướng như TFlat).
 * - Dữ liệu bổ sung tải lười theo bucket chữ cái (dict-rel-*, dict-forms-*).
 * ===================================================================== */

const WordDetail = (() => {
  const STRESS = /\u0301/g;

  const CASE_ROWS = [
    { key: "nomn", ru: "Именительный", vn: "cách 1 — ai? cái gì?", q: "кто? что?" },
    { key: "gent", ru: "Родительный", vn: "cách 2 — của ai? của cái gì?", q: "кого? чего?" },
    { key: "datv", ru: "Дательный", vn: "cách 3 — cho ai? cho cái gì?", q: "кому? чему?" },
    { key: "accs", ru: "Винительный", vn: "cách 4 — ai? cái gì? (đối tượng)", q: "кого? что?" },
    { key: "ablt", ru: "Творительный", vn: "cách 5 — bằng ai? bằng cái gì?", q: "кем? чем?" },
    { key: "loct", ru: "Предложный", vn: "cách 6 — về ai? về cái gì?", q: "о ком? о чём?" }
  ];

  const GOV_CASE_VN = {
    gen: "cách 2 (Родительный)",
    dat: "cách 3 (Дательный)",
    acc: "cách 4 (Винительный)",
    ins: "cách 5 (Творительный)",
    prep: "cách 6 (Предложный)"
  };
  const GOV_CASE_Q = {
    gen: "кого? / чего?",
    dat: "кому? / чему?",
    acc: "кого? / что?",
    ins: "кем? / чем?",
    prep: "о ком? / о чём?"
  };

  let shell = null;
  let body = null;
  let audioEl = null;
  let current = null;      // { ru, entry, audio, extraDone }
  let onClosedHook = null; // callback refresh danh sách sau khi đóng

  /* ---------- tiện ích ---------- */
  const stripStress = (s) => (s || "").replace(STRESS, "");

  function genderLabel(gram) {
    const g = (gram || "").trim();
    if (g === "м.") return "giống đực (м.)";
    if (g === "ж.") return "giống nữ (ж.)";
    if (g === "с.") return "giống trung (с.)";
    if (g === "мн." || g === "мн.ч.") return "số nhiều (мн.)";
    if (g === "нескл." || g === "неизм.") return "không biến đổi";
    return "";
  }

  function fmtPosBits(entry) {
    const bits = [entry.pos];
    const gen = genderLabel(entry.gram);
    if (gen) bits.push(gen);
    return bits.filter(Boolean).join(" · ");
  }

  /* ---------- audio ---------- */
  function pulseSpeaker(btn) {
    if (!btn) return;
    btn.classList.remove("playing");
    void btn.offsetWidth; // restart animation
    btn.classList.add("playing");
    setTimeout(() => btn.classList.remove("playing"), 1400);
  }

  function playAudio(word, slow = false) {
    const btn = shell && shell.querySelector(slow ? "#wdSlow" : "#wdSpeak");
    pulseSpeaker(btn);
    const cur = current;
    if (cur && cur.audio && cur.audio.m) {
      if (!audioEl) audioEl = new Audio();
      audioEl.src = cur.audio.m;
      audioEl.playbackRate = slow ? 0.5 : 1;
      audioEl.play().catch(() => speak(word, null, slow ? 0.5 : 0.9));
      return;
    }
    speak(word, null, slow ? 0.5 : 0.9);
  }

  /* ---------- shell ---------- */
  function ensureShell() {
    if (shell) return;
    shell = document.createElement("div");
    shell.id = "wdModal";
    shell.className = "dict-modal hidden";
    shell.setAttribute("aria-hidden", "true");
    shell.innerHTML = `
      <div class="dict-modal-backdrop" id="wdBackdrop"></div>
      <div class="dict-modal-card" role="dialog" aria-modal="true">
        <div id="wdBody"></div>
      </div>`;
    document.body.appendChild(shell);
    body = shell.querySelector("#wdBody");
    shell.querySelector("#wdBackdrop").addEventListener("click", close);
    shell.addEventListener("click", (e) => {
      if (e.target.closest("#wdClose")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !shell.classList.contains("hidden")) close();
    });
  }

  function openShell() {
    shell.classList.remove("hidden");
    shell.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!shell) return;
    shell.classList.add("hidden");
    shell.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (audioEl) { audioEl.pause(); }
    const hook = onClosedHook;
    onClosedHook = null;
    if (hook) hook();
  }

  /* ---------- HTML các khối ---------- */
  function chipList(words, cls = "") {
    if (!words || !words.length) return "";
    return words
      .map((w) => {
        const base = stripStress(w);
        const known = window.MishkaDict && MishkaDict.lookup(base);
        return `<button class="wd-chip ru ${cls}" data-w="${esc(base)}" title="${known ? "Xem chi tiết" : ""}">${esc(w)}</button>`;
      })
      .join("");
  }

  function meaningHTML(entry) {
    const vi = (entry.vi || "").trim() || "(chưa có nghĩa)";
    const lines = vi.split("\n").filter((l) => l.trim());
    if (lines.length <= 1) {
      return `<div class="wd-meaning">${esc(vi)}</div>`;
    }
    return `<ul class="wd-meaning-list">${lines.map((l) => `<li>${esc(l.trim())}</li>`).join("")}</ul>`;
  }

  function examplesHTML(entry) {
    const ex = (entry.ex || "").trim();
    if (!ex) return `<p class="wd-empty">Chưa có ví dụ.</p>`;
    const srcCls = entry.dir === "vi-ru" ? "" : "ru";
    const dstCls = entry.dir === "vi-ru" ? "ru" : "";
    return ex
      .split("\n")
      .filter((l) => l.trim())
      .slice(0, 10)
      .map((line) => {
        const idx = line.indexOf("→");
        if (idx === -1) {
          return `<div class="ex-line"><span class="${srcCls}">${esc(line.trim())}</span></div>`;
        }
        return `<div class="ex-line"><span class="ex-src ${srcCls}">${esc(line.slice(0, idx).trim())}</span><span class="ex-arrow">→</span><span class="ex-dst ${dstCls}">${esc(line.slice(idx + 1).trim())}</span></div>`;
      })
      .join("");
  }

  function govHTML(gov, word) {
    if (!gov) return "";
    const q = gov.q || "";
    const rows = (gov.p || []).map((p, i) => {
      const prep = p.p ? `<b class="wd-gov-prep">${esc(p.p)}</b> ` : "";
      const note = (gov.n && gov.n[i]) || GOV_CASE_VN[p.c] || "";
      return `<div class="wd-gov-item"><span class="wd-gov-q">${prep}${esc(GOV_CASE_Q[p.c] || "")}</span><span class="wd-gov-note">${esc(note)}</span></div>`;
    }).join("");
    return `
      <div class="wd-gov-line ru">${esc(stripStress(word))} ${q ? "+ " + esc(q) : ""}</div>
      <div class="wd-gov-vi">→ ${esc(gov.vi || "")}</div>
      ${rows}`;
  }

  function relHTML(extra) {
    const syn = chipList(extra.syn, "wd-chip-syn");
    const ant = chipList(extra.ant, "wd-chip-ant");
    if (!syn && !ant) return "";
    return `
      ${syn ? `<div class="wd-rel-group"><span class="wd-rel-label">🟢 Đồng nghĩa</span><div class="wd-chips">${syn}</div></div>` : ""}
      ${ant ? `<div class="wd-rel-group"><span class="wd-rel-label">🔴 Trái nghĩa</span><div class="wd-chips">${ant}</div></div>` : ""}`;
  }

  function famHTML(extra, word) {
    const self = stripStress(word).toLowerCase();
    const seen = new Set([self]);
    const items = [];
    for (const w of (extra.der || []).concat(extra.fam || [])) {
      const base = stripStress(w);
      const key = base.toLowerCase();
      if (!key || seen.has(key) || key === self) continue;
      // bỏ từ ghép chứa chính từ này ("книга-книга") và cụm quá dài
      if (base.length > 24) continue;
      seen.add(key);
      items.push(w);
    }
    items.sort((a, b) => stripStress(a).length - stripStress(b).length);
    const chips = chipList(items.slice(0, 24));
    return chips ? `<div class="wd-chips">${chips}</div>` : "";
  }

  function declHTML(forms) {
    if (!forms) return "";
    let out = "";
    if (forms.n) {
      out = declTable(CASE_ROWS.map((c) => [c, forms.n.s ? forms.n.s[idx(c.key)] : "", forms.n.p ? forms.n.p[idx(c.key)] : ""]), ["", "Số ít", "Số nhiều"]);
    } else if (forms.pn) {
      out = declTable(CASE_ROWS.map((c) => [c, forms.pn.s ? forms.pn.s[idx(c.key)] : "", forms.pn.p ? forms.pn.p[idx(c.key)] : ""]), ["", "Số ít", "Số nhiều"]);
    } else if (forms.a) {
      out = declTable(CASE_ROWS.map((c) => [c, forms.a.m[idx(c.key)], forms.a.f[idx(c.key)], forms.a.n[idx(c.key)], forms.a.p[idx(c.key)]]),
        ["", "Giống đực", "Giống nữ", "Trung", "Số nhiều"]);
    } else if (forms.sa) {
      out = `<div class="wd-sa-grid">
        <div><span class="meta-label">Он (anh ấy)</span><b class="ru">${esc(forms.sa.m)}</b></div>
        <div><span class="meta-label">Она (cô ấy)</span><b class="ru">${esc(forms.sa.f)}</b></div>
        <div><span class="meta-label">Оно</span><b class="ru">${esc(forms.sa.n)}</b></div>
        <div><span class="meta-label">Они (họ)</span><b class="ru">${esc(forms.sa.p)}</b></div>
      </div>`;
    } else if (forms.v) {
      out = verbHTML(forms.v);
    }
    return out;
  }

  function idx(caseKey) {
    return CASE_ROWS.findIndex((c) => c.key === caseKey);
  }

  function declTable(rows, headers) {
    // bỏ cột rỗng toàn bộ (vd: макароны chỉ có số nhiều)
    const nCols = headers.length - 1;
    const keep = [];
    for (let c = 0; c < nCols; c++) {
      keep.push(rows.some((r) => r[c + 1]));
    }
    const cols = [];
    for (let c = 0; c < nCols; c++) if (keep[c]) cols.push(c);
    const thead = `<tr>${headers
      .filter((_, i) => i === 0 || keep[i - 1])
      .map((h) => `<th>${esc(h)}</th>`)
      .join("")}</tr>`;
    const tbody = rows
      .map((r) => {
        const cells = cols.map((c) => `<td class="ru">${esc(r[c + 1] || "—")}</td>`).join("");
        const c0 = r[0];
        return `<tr><th class="wd-case"><b class="ru">${esc(c0.ru)}</b><span>${esc(c0.vn)}</span></th>${cells}</tr>`;
      })
      .join("");
    return `<table class="wd-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
  }

  function verbHTML(v) {
    const persons = ["я", "ты", "он / она", "мы", "вы", "они"];
    const aspect = v.perf
      ? `<span class="wd-aspect">совершенный вид · chia <b>tương lai</b></span>`
      : `<span class="wd-aspect">несовершенный вид · chia <b>hiện tại</b></span>`;
    let html = aspect;
    if (v.pres && v.pres.some(Boolean)) {
      html += `<table class="wd-table"><thead><tr><th>${v.perf ? "Будущее — tương lai" : "Настоящее — hiện tại"}</th><th></th></tr></thead><tbody>
        ${persons.map((p, i) => `<tr><th class="wd-case">${esc(p)}</th><td class="ru">${esc(v.pres[i] || "—")}</td></tr>`).join("")}
      </tbody></table>`;
    }
    if (v.past && (v.past.m || v.past.f || v.past.n || v.past.p)) {
      html += `<table class="wd-table"><thead><tr><th>Прошедшее — quá khứ</th><th></th></tr></thead><tbody>
        <tr><th class="wd-case">он</th><td class="ru">${esc(v.past.m || "—")}</td></tr>
        <tr><th class="wd-case">она</th><td class="ru">${esc(v.past.f || "—")}</td></tr>
        <tr><th class="wd-case">оно</th><td class="ru">${esc(v.past.n || "—")}</td></tr>
        <tr><th class="wd-case">они</th><td class="ru">${esc(v.past.p || "—")}</td></tr>
      </tbody></table>`;
    }
    if (v.imp && (v.imp.s || v.imp.p)) {
      html += `<table class="wd-table"><thead><tr><th>Повелительное — mệnh lệnh</th><th></th></tr></thead><tbody>
        ${v.imp.s ? `<tr><th class="wd-case">ты</th><td class="ru">${esc(v.imp.s)}</td></tr>` : ""}
        ${v.imp.p ? `<tr><th class="wd-case">вы</th><td class="ru">${esc(v.imp.p)}</td></tr>` : ""}
      </tbody></table>`;
    }
    return html;
  }

  /* ---------- accordion ---------- */
  function sectionHTML(id, icon, title, innerHTML, open = false, badge = "") {
    if (!innerHTML || !innerHTML.trim()) return "";
    return `
      <div class="wd-section ${open ? "open" : ""}" data-sec="${id}">
        <button class="wd-sec-head" type="button">
          <span class="wd-sec-title"><span class="wd-sec-icon">${icon}</span>${esc(title)}${badge ? `<span class="wd-badge">${badge}</span>` : ""}</span>
          <span class="wd-sec-arrow">▾</span>
        </button>
        <div class="wd-sec-body"><div class="wd-sec-inner">${innerHTML}</div></div>
      </div>`;
  }

  function bindAccordions(root) {
    root.querySelectorAll(".wd-sec-head").forEach((h) => {
      h.addEventListener("click", () => {
        h.closest(".wd-section").classList.toggle("open");
      });
    });
    root.querySelectorAll(".wd-chip[data-w]").forEach((b) => {
      b.addEventListener("click", () => openChipWord(b.dataset.w));
    });
    const sp = root.querySelector("#wdSpeak");
    if (sp) sp.addEventListener("click", (e) => { e.stopPropagation(); playAudio(current.ru); });
    const sl = root.querySelector("#wdSlow");
    if (sl) sl.addEventListener("click", (e) => { e.stopPropagation(); playAudio(current.ru, true); });
  }

  /* ---------- SRS ---------- */
  function srsHTML(entry) {
    let canonical = entry;
    let id = null;
    if (window.SRS) {
      canonical = SRS.findWord(entry.ru) || entry;
      id = SRS.cardId(canonical);
    }
    const card = id && window.SRS ? SRS.getState().cards[id] : null;
    const status = !card ? "Chưa học" :
      card.mastered ? "Đã thuộc" :
      card.isNew ? "Mới" :
      card.learningStep === 1 ? "Đang học" : "Đang ôn";
    const due = !card ? "Chưa có lịch ôn" :
      card.mastered ? "Không còn nhắc ôn" :
      card.dueDate <= Date.now() ? "⏰ Tới hạn ngay" :
      "⏳ " + SRS.formatInterval((card.dueDate - Date.now()) / 3600000);
    return `
      <div class="wd-srs-meta">
        <div><span class="meta-label">Trạng thái</span><b>${status}</b></div>
        <div><span class="meta-label">Ôn tập</span><b>${due}</b></div>
        <div><span class="meta-label">Lặp lại</span><b>${card ? card.repetitions || 0 : 0} lần</b></div>
        <div><span class="meta-label">Quên</span><b>${card ? card.lapses || 0 : 0} lần</b></div>
      </div>
      <div class="wd-srs-actions">
        ${card && card.mastered
          ? `<button class="btn btn-soft btn-sm" id="wdUnmaster">↩ Bỏ Mastered</button>`
          : card
          ? `<button class="btn btn-mastered btn-sm" id="wdMaster">✓ Tick · Đã thuộc</button>`
          : `<button class="btn btn-outline btn-sm" id="wdAdd">+ Thêm vào hàng đợi học</button>`}
        <button class="btn btn-soft btn-sm" id="wdStudy">📚 Học bằng flashcard</button>
      </div>`;
  }

  function bindSrs(root, entry) {
    if (!window.SRS) return;
    const add = root.querySelector("#wdAdd");
    if (add) add.addEventListener("click", () => {
      const r = SRS.addToQueue(entry.ru);
      if (r.ok) {
        toast(`Đã thêm "${entry.ru}" vào hàng đợi — sẽ xuất hiện ở phiên học kế tiếp ✨`);
        rerender();
      }
    });
    const master = root.querySelector("#wdMaster");
    if (master) master.addEventListener("click", () => {
      const canonical = SRS.findWord(entry.ru) || entry;
      const id = SRS.cardId(canonical);
      const card = SRS.getState().cards[id];
      if (card && card.mastered) {
        SRS.unmarkMastered(id);
        toast("Đã bỏ Mastered");
      } else {
        SRS.markMastered(id);
        toast("Đã đánh dấu Mastered ✓");
      }
      rerender();
      if (onClosedHook) onClosedHook();
    });
    const unmaster = root.querySelector("#wdUnmaster");
    if (unmaster) unmaster.addEventListener("click", () => {
      const canonical = SRS.findWord(entry.ru) || entry;
      SRS.unmarkMastered(SRS.cardId(canonical));
      toast("Đã bỏ Mastered");
      rerender();
    });
    const study = root.querySelector("#wdStudy");
    if (study) study.addEventListener("click", () => {
      window.location.href = "vocabulary.html#algorithm";
    });
  }

  /* ---------- render chính ---------- */
  function render(entry, extra) {
    const isRu = /^[\u0400-\u04FF]/.test(entry.ru || "");
    const ex = entry.ex || "";
    const e2 = { ...entry, ex };
    const level = entry.level ? `<span class="dict-level lvl-${entry.level}">${entry.level}</span>` : "";
    const posBits = fmtPosBits(entry);
    const catChip = entry.cat ? `<span class="dict-cat">${esc(entry.cat)}</span>` : "";
    const pron = entry.pron ? `<p class="wd-hero-pron ru">${esc(entry.pron)}</p>` : "";
    const meaningLines = (entry.vi || "").split("\n").filter((l) => l.trim());
    const firstMeaning = meaningLines[0] ? meaningLines[0].trim() : "";
    // Nghĩa ngắn (1 dòng) đã hiển thị trên hero — chỉ hiện mục "Tất cả nghĩa" khi có nhiều dòng
    const meaningSec =
      meaningLines.length > 1 ? sectionHTML("meaning", "📖", "Tất cả nghĩa", meaningHTML(e2), true) : "";

    const head = `
      <div class="wd-hero">
        <div class="wd-hero-top">
          <div class="wd-hero-meta">
            ${level}
            ${posBits ? `<span class="wd-hero-pos">${esc(posBits)}${catChip}</span>` : ""}
          </div>
        </div>
        <h2 class="wd-hero-ru ru">${esc(entry.ru)}</h2>
        ${pron}
        ${firstMeaning ? `<p class="wd-hero-vi">${esc(firstMeaning)}</p>` : ""}
        <div class="wd-hero-actions">
          <button class="wd-speak-btn" id="wdSpeak" title="Nghe phát âm">🔊</button>
          <button class="wd-speak-btn slow" id="wdSlow" title="Nghe chậm">🐢</button>
        </div>
      </div>`;

    const secs = [
      meaningSec,
      isRu && extra && extra.gov ? sectionHTML("gov", "🧩", "Kết cấu đi kèm", govHTML(extra.gov, entry.ru), true) : "",
      sectionHTML("ex", "💬", "Ví dụ", examplesHTML(e2)),
      extra && (extra.syn || extra.ant) ? sectionHTML("rel", "↔️", "Đồng nghĩa · Trái nghĩa", relHTML(extra)) : "",
      extra && ((extra.der && extra.der.length) || (extra.fam && extra.fam.length)) ? sectionHTML("fam", "🌳", "Họ từ", famHTML(extra, entry.ru)) : "",
      extra && extra.forms ? sectionHTML("forms", "📊", "Chia 6 cách", declHTML(extra.forms)) : "",
      window.SRS ? sectionHTML("srs", "📈", "Học từ này", srsHTML(e2), true) : ""
    ].join("");

    body.innerHTML = `
      <div class="dict-modal-float">
        <button class="dict-modal-close" id="wdClose" aria-label="Đóng">×</button>
      </div>
      ${head}
      <div class="wd-content">${secs}</div>`;
    bindAccordions(body);
    bindSrs(body, e2);
  }

  function rerender() {
    if (current) render(current.entry, current.extra || null);
  }

  /* ---------- API công khai ---------- */
  /**
   * Mở modal chi tiết một từ.
   * @param word  từ tiếng Nga (hoặc entry.ru)
   * @param entry dữ liệu hiển thị ngay (từ list/card); thiếu sẽ tra từ điển cache
   * @param onClose callback gọi khi đóng (để refresh danh sách)
   */
  async function open(word, entry, onClose) {
    ensureShell();
    onClosedHook = onClose || onClosedHook || null;
    const ru = stripStress(word).trim();
    if (!entry && window.MishkaDict) entry = MishkaDict.lookup(ru);
    if (!entry) entry = { ru, vi: "", pos: "", ex: "", gram: "" };

    current = { ru, entry, audio: null, extra: null };

    render(entry, null);
    openShell();

    // phát âm ngay khi mở (như TFlat)
    setTimeout(() => playAudio(ru), 250);

    if (!isCyrillic(ru)) return;

    // tải dữ liệu bổ sung rồi render lại
    try {
      if (window.MishkaDict && MishkaDict.Extra) {
        const extra = await MishkaDict.Extra.for(ru);
        if (current && current.ru === ru) {
          if (extra && extra.audio) current.audio = extra.audio;
          current.extra = extra;
          render(entry, extra);
        }
      }
    } catch (e) {
      /* im lặng — modal vẫn hoạt động với dữ liệu cơ bản */
    }
  }

  function isCyrillic(s) {
    return /^[\u0400-\u04FF]/.test(s || "");
  }

  /**
   * Mở từ liên quan khi bấm chip. Nếu từ điển chưa được tải (trang vocabulary)
   * thì tải hướng Nga→Việt một lần rồi tra lại.
   */
  async function openChipWord(w) {
    let entry = null;
    if (window.MishkaDict) {
      entry = MishkaDict.lookup(w);
      if (!entry) {
        toast("Đang tải dữ liệu từ điển…");
        try {
          await MishkaDict.load("ru-vi");
          entry = MishkaDict.lookup(w);
        } catch (e) { /* bỏ qua */ }
      }
    }
    if (!entry && !isCyrillic(w)) {
      toast(`"${w}" chưa có trong từ điển`);
      return;
    }
    open(w, entry, onClosedHook);
  }

  return { open, close, playAudio };
})();

window.WordDetail = WordDetail;
