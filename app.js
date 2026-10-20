const STORE = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("trki_" + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem("trki_" + key, JSON.stringify(val));
    } catch (e) {}
  }
};

const Progress = {
  addXp(n) {
    const xp = STORE.get("xp", 0) + n;
    STORE.set("xp", xp);
    updateHeaderChips();
    toast(`+${n} XP! 🎉`);
  },
  touchStreak() {
    const today = new Date().toDateString();
    const last = STORE.get("lastDay", "");
    if (last === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const streak = STORE.get("streak", 0);
    STORE.set("streak", last === yesterday ? streak + 1 : 1);
    STORE.set("lastDay", today);
    updateHeaderChips();
  },
  markDone(kind, id) {
    const done = STORE.get(kind, []);
    if (!done.includes(id)) {
      done.push(id);
      STORE.set(kind, done);
    }
  },
  doneList(kind) {
    return STORE.get(kind, []);
  }
};

function updateHeaderChips() {
  const xp = STORE.get("xp", 0);
  const streak = STORE.get("streak", 0);
  const xpChip = document.getElementById("chipXp");
  const streakChip = document.getElementById("chipStreak");
  const mascotChip = document.getElementById("chipMascot");
  if (xpChip) xpChip.textContent = "⚡ " + xp + " XP";
  if (streakChip) streakChip.textContent = "🔥 " + streak + " ngày";
  if (mascotChip && typeof MascotRusika !== "undefined") {
    const lvl = MascotRusika.getLevel();
    mascotChip.innerHTML = `${MascotRusika.getSvg(lvl, currentSeason())} <span>Rusika Lv.${lvl}</span>`;
    mascotChip.title = MascotRusika.getTitle(lvl) + " (" + MascotRusika.getOutfit(currentSeason()) + ") — Bấm để xem";
  }
}

// ============================================================================
// MASCOT RUSIKA (BLUE-EYED RUSSIAN CAT) & 4-SEASON DYNAMIC OUTFIT
// ============================================================================
const MascotRusika = {
  getLevel() {
    const xp = STORE.get("xp", 0);
    if (xp >= 1500) return 5;
    if (xp >= 700) return 4;
    if (xp >= 300) return 3;
    if (xp >= 100) return 2;
    return 1;
  },
  getTitle(level) {
    const titles = {
      1: "Mèo con Rusika (Cấp 1)",
      2: "Mèo học trò Rusika (Cấp 2)",
      3: "Mèo thông thái Rusika (Cấp 3)",
      4: "Học sĩ Rusika (Cấp 4)",
      5: "Đại hiệp Mèo Nga Rusika (Cấp 5)"
    };
    return titles[level] || titles[1];
  },
  getOutfit(season) {
    const outfits = {
      winter: "Mũ lông Ushanka & Áo len tuyết ấm áp ❄️",
      spring: "Vòng hoa xuân tươi mát & Khăn len nhẹ 🌸",
      summer: "Kính râm sành điệu & Mũ cói đi biển ☀️",
      autumn: "Khăn len ấm áp & Chiếc lá phong vàng 🍂"
    };
    return outfits[season] || outfits.winter;
  },
  getQuote() {
    const quotes = [
      "«Повторение — мать учения!» (Ôn tập là mẹ của sự học thành công!)",
      "Hôm nay bạn đã ôn tập các từ trong Lọ từ vựng chưa nào?",
      "Luyện phát âm câu nói mỗi ngày để ngữ điệu mềm mại chuẩn người Moskva nhé!",
      "Chứng chỉ ТРКИ không hề khó khi bạn luyện đề đều đặn với Rusika!",
      "«Терпение и труд всё перетрут» (Có công mài sắt, có ngày nên kim)!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },
  getSvg(level, season) {
    const eyeColor = "#0284c7";
    const furColor = "#94a3b8";
    const earInner = "#f472b6";
    let accessory = "";
    if (season === "winter") {
      accessory = `<path d="M10 13 Q24 7 38 13 L39 19 Q24 15 9 19 Z" fill="#334155"/><rect x="21" y="9" width="6" height="6" rx="1.5" fill="#D52B1E"/><polygon points="24,10 24.8,11.8 26.5,11.8 25.2,12.8 25.8,14.5 24,13.5 22.2,14.5 22.8,12.8 21.5,11.8 23.2,11.8" fill="#ffffff"/>`;
    } else if (season === "summer") {
      accessory = `<rect x="13" y="19" width="9" height="6" rx="2" fill="#0f172a"/><rect x="26" y="19" width="9" height="6" rx="2" fill="#0f172a"/><line x1="22" y1="22" x2="26" y2="22" stroke="#0f172a" stroke-width="2"/>`;
    } else if (season === "autumn") {
      accessory = `<path d="M14 36 Q24 40 34 36 Q32 44 24 43 Q16 44 14 36 Z" fill="#d97706"/><circle cx="34" cy="38" r="4" fill="#b45309"/>`;
    } else {
      accessory = `<circle cx="16" cy="12" r="3" fill="#ec4899"/><circle cx="24" cy="10" r="3.5" fill="#f43f5e"/><circle cx="32" cy="12" r="3" fill="#ec4899"/>`;
    }
    return `
    <svg viewBox="0 0 48 48" style="width:24px;height:24px;display:inline-block;vertical-align:middle" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,22 16,6 23,17" fill="${furColor}" />
      <polygon points="12,20 16,9 21,17" fill="${earInner}" />
      <polygon points="38,22 32,6 25,17" fill="${furColor}" />
      <polygon points="36,20 32,9 27,17" fill="${earInner}" />
      <ellipse cx="24" cy="27" rx="16" ry="14" fill="${furColor}" />
      <ellipse cx="14" cy="30" rx="3" ry="2" fill="#fbcfe8" opacity="0.6"/>
      <ellipse cx="34" cy="30" rx="3" ry="2" fill="#fbcfe8" opacity="0.6"/>
      <circle cx="18" cy="24" r="3.6" fill="${eyeColor}" />
      <circle cx="30" cy="24" r="3.6" fill="${eyeColor}" />
      <circle cx="19" cy="23" r="1.3" fill="#ffffff" />
      <circle cx="31" cy="23" r="1.3" fill="#ffffff" />
      <polygon points="23,28 25,28 24,29.5" fill="#f43f5e" />
      <path d="M21 31 Q24 33 24 30 Q24 33 27 31" stroke="#334155" stroke-width="1.2" stroke-linecap="round" />
      <line x1="8" y1="26" x2="14" y2="27" stroke="#64748b" stroke-width="1"/>
      <line x1="8" y1="29" x2="14" y2="29" stroke="#64748b" stroke-width="1"/>
      <line x1="40" y1="26" x2="34" y2="27" stroke="#64748b" stroke-width="1"/>
      <line x1="40" y1="29" x2="34" y2="29" stroke="#64748b" stroke-width="1"/>
      ${accessory}
    </svg>`;
  },
  showModal() {
    const lvl = this.getLevel();
    const season = currentSeason();
    let m = document.getElementById("mascotModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "mascotModal";
      m.className = "anticheat-modal";
      document.body.appendChild(m);
    }
    m.innerHTML = `
    <div class="anticheat-modal-box" style="border-top-color:var(--primary);text-align:left">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
        <div style="width:72px;height:72px;flex-shrink:0">
          ${this.getSvg(lvl, season)}
        </div>
        <div>
          <span class="pro-chip" style="font-size:0.75rem">BẠN ĐỒNG HÀNH AI</span>
          <h3 style="margin:4px 0 2px">${this.getTitle(lvl)}</h3>
          <p style="font-size:0.85rem;color:var(--muted)">Trang phục: ${this.getOutfit(season)}</p>
        </div>
      </div>
      <div style="background:var(--bg);border-radius:10px;padding:12px;margin-bottom:16px">
        <div style="font-size:0.88rem;color:var(--text);font-style:italic">
          💬 ${this.getQuote()}
        </div>
      </div>
      <div style="font-size:0.85rem;color:var(--muted);line-height:1.5;margin-bottom:20px">
        <b>Hệ thống cấp bậc Rusika:</b><br>
        • Cấp 1: 0 – 99 XP (Mèo con)<br>
        • Cấp 2: 100 – 299 XP (Mèo học trò)<br>
        • Cấp 3: 300 – 699 XP (Mèo thông thái)<br>
        • Cấp 4: 700 – 1499 XP (Học sĩ Rusika)<br>
        • Cấp 5: 1500+ XP (Đại hiệp Mèo Nga)<br>
        <i>Tiếp tục luyện tập từ vựng, nghe, nói, viết và thi thử TRKI để mèo Rusika lớn dần!</i>
      </div>
      <button class="btn btn-primary" style="width:100%" id="closeMascotModal">Đóng</button>
    </div>`;
    document.getElementById("closeMascotModal").onclick = () => m.remove();
  }
};

// ============================================================================
// HỆ THỐNG GÓI CƯỚC & THANH TOÁN VIETQR TỰ ĐỘNG (INSTANT VIETQR ACTIVATION)
// ============================================================================
const Monetization = {
  isPro() {
    return Boolean(STORE.get("is_pro", false));
  },
  setPro(status = true) {
    STORE.set("is_pro", status);
    if (status) {
      STORE.set("pro_expires", new Date(Date.now() + 365 * 86400000).toISOString());
    }
    updateHeaderChips();
    const btn = document.getElementById("btnUpgradeHeader");
    if (btn) {
      btn.outerHTML = `<span class="pro-chip" title="Tài khoản PRO đã kích hoạt">⭐ PRO MEMBER</span>`;
    }
  },
  openUpgradeModal(pkgId = "PRO_1Y") {
    let ordNum = STORE.get("last_order_num", 1092) + 1;
    STORE.set("last_order_num", ordNum);
    const orderId = "RUSI_ORD" + ordNum;
    const pkg = (typeof PACKAGES !== "undefined" ? PACKAGES : []).find((p) => p.id === pkgId) || {
      id: "PRO_1Y",
      title: "Gói 1 Năm (PRO-1Y)",
      price: 699000
    };
    const qrUrl = `https://img.vietqr.io/image/vietinbank-108873919999-compact2.png?amount=${pkg.price}&addInfo=${orderId}&accountName=RUSI%20TRKI%20PLATFORM`;

    let modal = document.getElementById("vietqrModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "vietqrModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }
    modal.innerHTML = `
    <div class="vietqr-card">
      <button class="vietqr-close" id="closeVietQr">&times;</button>
      <div style="text-align:center;margin-bottom:12px">
        <span class="pro-chip">⚡ NÂNG CẤP PRO KÍCH HOẠT TỨC THÌ</span>
        <h3 style="margin:8px 0 4px;font-size:1.3rem">${esc(pkg.title)}</h3>
        <p style="color:var(--muted);font-size:0.88rem">Quét mã VietQR bằng app ngân hàng bất kỳ để mở khóa trọn bộ tính năng</p>
      </div>
      <div class="vietqr-img-box">
        <img class="vietqr-img" src="${qrUrl}" alt="VietQR Payment" />
      </div>
      <div style="margin-bottom:16px">
        <div class="vietqr-info-row"><span>Ngân hàng:</span><b>VietinBank (Ngân hàng Công Thương)</b></div>
        <div class="vietqr-info-row"><span>Số tài khoản:</span><b>108873919999</b></div>
        <div class="vietqr-info-row"><span>Chủ tài khoản:</span><b>RUSI TRKI PLATFORM</b></div>
        <div class="vietqr-info-row"><span>Số tiền:</span><b style="color:var(--secondary);font-size:1.15rem">${pkg.price.toLocaleString("vi-VN")} đ</b></div>
        <div class="vietqr-info-row"><span>Cú pháp CK:</span><span class="vietqr-code-copy" id="btnCopyOrderId">${orderId} 📋</span></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn btn-primary btn-lg" id="btnConfirmPaid" style="background:var(--green);border-color:var(--green)">
          ✅ Tôi đã chuyển khoản xong (Kích hoạt ngay)
        </button>
        <p style="text-align:center;font-size:0.78rem;color:var(--muted)">Xác thực tự động (Signature Verification) kích hoạt tức thì không cần F5 hay chờ duyệt tay.</p>
      </div>
    </div>`;

    document.getElementById("closeVietQr").onclick = () => modal.remove();
    document.getElementById("btnCopyOrderId").onclick = () => {
      navigator.clipboard?.writeText(orderId);
      toast("Đã sao chép mã đơn: " + orderId);
    };
    document.getElementById("btnConfirmPaid").onclick = () => {
      Monetization.setPro(true);
      modal.remove();
      toast("🎉 Chúc mừng! Tài khoản đã được nâng cấp lên PRO thành công.");
      setTimeout(() => {
        if (typeof renderUserArea === "function") renderUserArea();
      }, 300);
    };
  }
};

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function detectLang(text) {
  if (/[\u0400-\u04FF]/.test(text)) return "ru-RU";
  if (/[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(text)) return "vi-VN";
  return "ru-RU";
}

/* Chọn giọng đọc tốt nhất cho mỗi ngôn ngữ — ưu tiên giọng tự nhiên. */
const SPEAK_VOICE_PREF = [
  /milena/i, /yuri/i, /katya/i, /alyona/i, /tatyana/i, /pavel/i, /dmitri/i, // tiếng Nga
  /google/i, /microsoft/i, /siri/i, /namminh/i, /hosaminh/i, /giahuy/i, /linhsan/i, // tiếng Việt
];
const _voiceCache = {};

function pickVoice(lang) {
  if (!("speechSynthesis" in window)) return null;
  const voices = speechSynthesis.getVoices().filter((v) =>
    v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase())
  );
  if (!voices.length) return null;
  const c = _voiceCache[lang];
  if (c && voices.includes(c)) return c;
  let best = null;
  for (const pref of SPEAK_VOICE_PREF) {
    best = voices.find((v) => pref.test(v.name));
    if (best) break;
  }
  if (!best) best = voices.find((v) => v.localService) || voices[0];
  _voiceCache[lang] = best;
  return best;
}

function speak(text, lang = null, rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    toast("Trình duyệt không hỗ trợ đọc — hãy dùng Chrome/Edge.");
    return;
  }
  const l = lang || detectLang(text);
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = l;
  u.rate = rate;
  const voice = pickVoice(l);
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

/** Nghe phát âm chậm — dùng trong modal chi tiết từ. */
function speakSlow(text, lang = null) {
  speak(text, lang, 0.5);
}

// Một số trình duyệt nạp danh sách giọng bất đồng bộ — nạp sớm để chọn được giọng tốt.
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => {
    Object.keys(_voiceCache).forEach((k) => delete _voiceCache[k]);
  };
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return d[m][n];
}

function similarity(a, b) {
  const norm = (s) =>
    s.toLowerCase().replace(/[.,!?;:«»"']/g, "").replace(/\s+/g, " ").trim();
  const x = norm(a);
  const y = norm(b);
  if (!x && !y) return 100;
  if (!x || !y) return 0;
  const dist = levenshtein(x, y);
  return Math.max(0, Math.round(100 - (dist / Math.max(x.length, y.length)) * 100));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/**
 * NAV_LINKS — cấu trúc mảng các cấp:
 *   ["url.html", "Label"]         → liên kết đơn
 *   ["url.html", "Label", [...]]  → liên kết có dropdown con (các mục con cùng cấu trúc)
 * Sub-items có thể trỏ đến hash trên cùng trang (vd "vocabulary.html#algorithm").
 */
const NAV_LINKS = [
  ["mock-test.html", "TRKI"],
  ["vocabulary.html", "Từ vựng"],
  ["listening.html", "Nghe"],
  ["speaking.html", "Nói"],
  ["writing.html", "Viết"],
  ["shop.html", "Shop"],
  ["blog.html", "Blog"]
];

const SEASON_ORDER = ["winter"];

const SEASON_META = {
  winter: { icon: "❄️", label: "Mùa đông", fx: ["❄️", "•", "❄️", "•"] }
};

function autoSeason() {
  return "winter";
}

function currentSeason() {
  return "winter";
}

/** Giao diện Sáng cố định (Russian Winter Cool Blue) */
function applyLightTheme() {
  document.documentElement.setAttribute("data-theme", "light");
  document.body.setAttribute("data-theme", "light");
  document.body.dataset.season = "winter";
}

function applySeason(season = "winter") {
  document.body.dataset.season = "winter";

  let fx = document.getElementById("seasonFx");
  if (!fx) {
    fx = document.createElement("div");
    fx.id = "seasonFx";
    fx.className = "season-fx";
    fx.setAttribute("aria-hidden", "true");
    document.body.appendChild(fx);
  }
  fx.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.textContent = i % 2 === 0 ? "❄️" : "•";
    s.style.fontSize = i % 2 === 0 ? (9 + Math.random() * 8 + "px") : "5px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.setProperty("--drift", Math.round(Math.random() * 100 - 50) + "px");
    const dur = 7 + Math.random() * 6;
    s.style.animationDuration = dur.toFixed(2) + "s";
    s.style.animationDelay = (-Math.random() * dur).toFixed(2) + "s";
    fx.appendChild(s);
  }
}

function cycleSeason() {}

/** Hộp thoại Đăng nhập / Đăng ký hiện đại */
const AuthModal = {
  open(initialTab = "login") {
    let modal = document.getElementById("authModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "authModal";
      modal.className = "modal-overlay";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card auth-modal-card">
        <button class="modal-close" id="authModalClose" type="button" aria-label="Đóng">&times;</button>
        <div class="auth-modal-header">
          <div class="auth-modal-logo">
            <span class="brand-mark">Я</span>
            <span class="brand-text">Rusi<span>TRKI</span></span>
          </div>
          <h2 id="authModalTitle">${initialTab === "register" ? "Đăng ký tài khoản học viên" : "Đăng nhập Rusi TRKI"}</h2>
          <p id="authModalDesc">Luyện thi TRKI & học tiếng Nga toàn diện chuẩn CEFR</p>
        </div>

        <div class="auth-modal-tabs">
          <button class="auth-tab ${initialTab === "login" ? "active" : ""}" id="tabAuthLogin" type="button">Đăng nhập</button>
          <button class="auth-tab ${initialTab === "register" ? "active" : ""}" id="tabAuthRegister" type="button">Đăng ký mới</button>
        </div>

        <div class="auth-modal-body">
          <div class="auth-features-preview">
            <div class="auth-feat-item">⚡ <span>Lưu chuỗi ngày Streak & tích lũy XP</span></div>
            <div class="auth-feat-item">🏺 <span>Đồng bộ Lọ từ vựng Spaced Repetition (SM-2)</span></div>
            <div class="auth-feat-item">📝 <span>Lưu kết quả & báo cáo làm bài thi thử TRKI</span></div>
          </div>

          <button class="btn-google-auth" id="btnGoogleAction" type="button">
            <svg class="g-icon" viewBox="0 0 48 48" aria-hidden="true" width="22" height="22">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 36.7 44 31 44 24c0-1.2-.1-2.4-.4-3.5z"/>
            </svg>
            <span id="googleActionText">${initialTab === "register" ? "Đăng ký nhanh với Google" : "Đăng nhập nhanh với Google"}</span>
          </button>

          <div class="auth-divider"><span>hoặc</span></div>

          <button class="btn btn-outline btn-block" id="btnGuestAction" type="button" style="width:100%;justify-content:center;padding:10px 14px;border-radius:10px;font-weight:600">
            👤 Trải nghiệm nhanh với tư cách Khách
          </button>
        </div>
      </div>
    `;

    modal.classList.add("open");

    const closeBtn = modal.querySelector("#authModalClose");
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });

    const tabLogin = modal.querySelector("#tabAuthLogin");
    const tabRegister = modal.querySelector("#tabAuthRegister");
    const title = modal.querySelector("#authModalTitle");
    const gText = modal.querySelector("#googleActionText");

    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      title.textContent = "Đăng nhập Rusi TRKI";
      gText.textContent = "Đăng nhập nhanh với Google";
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      title.textContent = "Đăng ký tài khoản học viên";
      gText.textContent = "Đăng ký nhanh với Google";
    });

    modal.querySelector("#btnGoogleAction").addEventListener("click", () => {
      modal.classList.remove("open");
      if (window.Auth) window.Auth.signInWithGoogle();
    });

    modal.querySelector("#btnGuestAction").addEventListener("click", () => {
      const guest = {
        uid: "guest_" + Date.now(),
        name: "Học viên Khách",
        email: "khach@rusitrki.com",
        photo: "",
        provider: "guest"
      };
      STORE.set("auth_user", guest);
      if (window.Auth) window.Auth.user = guest;
      renderUserArea();
      modal.classList.remove("open");
      if (typeof toast === "function") toast("Chào mừng bạn trải nghiệm với tư cách Khách! 👋");
    });
  }
};

function renderHeader() {
  const host = document.getElementById("app-header");
  if (!host) return;
  const page = document.body.dataset.page;
  const isPro = Monetization.isPro();
  const proButtonHtml = isPro
    ? `<span class="pro-chip" style="font-size:0.75rem;padding:5px 9px" title="Tài khoản PRO đã kích hoạt">⭐ PRO</span>`
    : `<button class="btn btn-sm" id="btnUpgradeHeader" type="button" style="background:var(--russia-red);color:#fff;border-color:var(--russia-red);font-size:0.8rem;padding:6px 12px;border-radius:10px">⭐ Gói PRO</button>`;

  const MAX_PRIMARY = 7;
  const primaryLinks = NAV_LINKS.slice(0, MAX_PRIMARY);
  const overflowLinks = NAV_LINKS.slice(MAX_PRIMARY);

  let navLinksHtml = primaryLinks.map((item) => renderNavLink(item, page)).join("");

  if (overflowLinks.length > 0) {
    const moreItems = overflowLinks.map(([href, label]) => {
      const isActive = page && (href === page + ".html" || href.startsWith(page + ".html"));
      return `<a class="nav-dropdown-item ${isActive ? "active" : ""}" href="${href}">${label}</a>`;
    }).join("");
    navLinksHtml += `
      <div class="nav-dropdown nav-more" id="navMoreDropdown">
        <button class="nav-dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false">
          <span>More</span>
          <svg viewBox="0 0 16 16" width="12" height="12"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        </button>
        <div class="nav-dropdown-menu">
          ${moreItems}
        </div>
      </div>
    `;
  }

  host.innerHTML = `
  <header class="header">
    <div class="header-inner">
      <div class="header-left">
        <a class="brand" href="index.html" aria-label="Rusi TRKI - Trang chủ">
          <span class="brand-mark">Я</span>
          <span class="brand-text">Rusi<span>TRKI</span></span>
        </a>
      </div>

      <nav class="nav header-center" id="mainNav" aria-label="Điều hướng chính">
        ${navLinksHtml}
      </nav>

      <div class="header-right header-actions">
        ${proButtonHtml}
        <div id="userArea" class="user-area"></div>
        <button class="menu-button" id="mobileMenuBtn" type="button" aria-label="Mở menu" aria-expanded="false">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>`;

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      mobileBtn.setAttribute("aria-expanded", String(open));
    });
  }

  const upgradeBtn = document.getElementById("btnUpgradeHeader");
  if (upgradeBtn) upgradeBtn.addEventListener("click", () => Monetization.openUpgradeModal());

  initNavDropdowns();
  renderUserArea();
}

/** Render một mục nav đơn (không có phần con). */
function renderNavLink(item, page) {
  const [href, label] = item;
  const isActive = page && (href === page + ".html" || href.startsWith(page + ".html"));
  return `<a href="${href}" class="${isActive ? "active" : ""}">${label}</a>`;
}

/** Khởi tạo hành vi hover/click cho các nav dropdown. */
function initNavDropdowns() {
  document.querySelectorAll(".nav-dropdown").forEach((dd) => {
    const trigger = dd.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    let hoverTimer = null;
    const open = () => {
      document.querySelectorAll(".nav-dropdown.open").forEach((o) => {
        if (o !== dd) o.classList.remove("open");
      });
      dd.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      dd.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dd.classList.contains("open") ? close() : open();
    });
    dd.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimer);
      open();
    });
    dd.addEventListener("mouseleave", () => {
      hoverTimer = setTimeout(close, 180);
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown.open").forEach((o) => o.classList.remove("open"));
  });
}

/**
 * Render khu vực tài khoản ở header:
 * - Khi CHƯA login: 2 nút [Đăng nhập] và [Đăng ký] (Bỏ nút học miễn phí, không hiện XP/streak ra ngoài)
 * - Khi ĐÃ login: avatar + tên + dropdown chứa XP, Streak và menu quản lý cá nhân.
 */
function renderUserArea() {
  const host = document.getElementById("userArea");
  if (!host) return;

  const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);

  if (!user) {
    const pageName = window.location.pathname.split("/").pop() || "index.html";
    const currentRedirect = encodeURIComponent(pageName + window.location.search);
    host.innerHTML = `
      <div class="auth-buttons-group">
        <a class="btn-auth-login" id="btnLogin" href="login.html?redirect=${currentRedirect}">Đăng nhập</a>
        <a class="btn-auth-register" id="btnRegister" href="signup.html?redirect=${currentRedirect}">Đăng ký</a>
      </div>`;
    return;
  }

  // Đã đăng nhập: avatar + menu thả xuống chứa điểm XP & chuỗi Streak
  const initials = (user.name || user.email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const avatar = user.photo
    ? `<img class="user-avatar" src="${esc(user.photo)}" alt="${esc(user.name)}" referrerpolicy="no-referrer" />`
    : `<span class="user-avatar user-avatar-fallback">${esc(initials)}</span>`;
  const shortName = (user.name || "Học viên").split(/\s+/)[0];

  const adminEmails = (window.ADMIN_EMAILS || []).map(e => String(e).toLowerCase().trim());
  const isAdmin = user.email && adminEmails.includes(String(user.email).toLowerCase().trim());

  host.innerHTML = `
    <div class="user-menu" id="userMenu">
      <button class="user-trigger" id="userTrigger" type="button" aria-haspopup="true" aria-expanded="false">
        ${avatar}
        <span class="user-name-short">${esc(shortName)}</span>
        <span class="caret" aria-hidden="true">▾</span>
      </button>
      <div class="user-dropdown" id="userDropdown" role="menu">
        <div class="user-dropdown-head">
          ${avatar}
          <div class="user-head-info">
            <div class="user-fullname">${esc(user.name || "Học viên Rusi")}</div>
            <div class="user-email">${esc(user.email || "")}</div>
          </div>
        </div>

        <!-- PHẦN ĐIỂM XP VÀ CHUỖI STREAK HIỂN THỊ TRANG TRỌNG TRONG MENU TÀI KHOẢN -->
        <div class="user-stats-bar">
          <div class="user-stat-card">
            <span class="user-stat-icon">⚡</span>
            <div>
              <div class="user-stat-val" id="userMenuXp">${STORE.get("xp", 0)} XP</div>
              <div class="user-stat-lbl">Kinh nghiệm</div>
            </div>
          </div>
          <div class="user-stat-card">
            <span class="user-stat-icon">🔥</span>
            <div>
              <div class="user-stat-val" id="userMenuStreak">${STORE.get("streak", 0)} ngày</div>
              <div class="user-stat-lbl">Chuỗi học Streak</div>
            </div>
          </div>
        </div>

        <div class="user-dropdown-divider"></div>

        <a class="user-dropdown-item" href="index.html#progress" role="menuitem">
          <span>📊</span>
          <span>Tiến độ của tôi</span>
        </a>
        <a class="user-dropdown-item" href="vocabulary.html" role="menuitem">
          <span>🏺</span>
          <span>Lọ từ vựng & Flashcard</span>
        </a>
        <a class="user-dropdown-item" href="mock-test.html" role="menuitem">
          <span>📝</span>
          <span>Luyện thi TRKI</span>
        </a>
        ${isAdmin ? `
        <a class="user-dropdown-item" href="admin.html" role="menuitem">
          <span>🛠️</span>
          <span>Quản trị hệ thống</span>
        </a>` : ""}

        <div class="user-dropdown-divider"></div>

        <button class="user-dropdown-item user-dropdown-signout" id="btnSignOut" type="button" role="menuitem">
          <span>🚪</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>`;

  const trigger = host.querySelector("#userTrigger");
  const dropdown = host.querySelector("#userDropdown");
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = dropdown.classList.toggle("open");
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  if (renderUserArea._outsideClick) {
    document.removeEventListener("click", renderUserArea._outsideClick);
  }
  renderUserArea._outsideClick = () => {
    dropdown.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  };
  document.addEventListener("click", renderUserArea._outsideClick);

  host.querySelector("#btnSignOut").addEventListener("click", () => {
    dropdown.classList.remove("open");
    STORE.set("auth_user", null);
    if (window.Auth) window.Auth.signOut();
  });
}

/**
 * Cầu nối: khi trạng thái auth đổi, re-render khu vực user trong header.
 * An toàn nếu Auth chưa được tải (chỉ chạy khi đã có cả 2).
 */
function bindAuthToHeader() {
  if (!window.Auth) return;
  window.Auth.onChange((u) => {
    // Lưu/xoá cache user để lần tải trang sau render avatar NGAY,
    // không phải chờ Firebase phản hồi (tránh header nhảy nút Đăng nhập ↔ avatar).
    STORE.set("auth_user", u || null);
    renderUserArea();
  });
}

function renderFooter() {
  const host = document.getElementById("app-footer");
  if (!host) return;
  host.innerHTML = `
  <footer>
    <a class="brand footer-brand" href="index.html">
      <span class="brand-mark">Я</span>
      <span>Rusi<span style="color:#8dbcef">TRKI</span></span>
    </a>
    <p>Học tiếng Nga hiện đại, dễ hiểu và đầy cảm hứng. Hệ sinh thái học tập toàn diện phục vụ luyện thi chứng chỉ, du học và đời sống tại Liên bang Nga.</p>
    <div class="footer-links">
      <a href="mock-test.html">TRKI</a>
      <a href="vocabulary.html">Từ vựng</a>
      <a href="listening.html">Nghe</a>
      <a href="speaking.html">Nói</a>
      <a href="writing.html">Viết</a>
      <a href="shop.html">Shop</a>
      <a href="blog.html">Blog</a>
      <a href="admin.html">Quản trị</a>
    </div>
    <small>© 2026 RUSI TRKI. Made for curious minds. Đồng hành cùng Mascot Rusika mắt xanh.</small>
  </footer>`;
}

function quizEngine(container, questions, { onFinish } = {}) {
  container.innerHTML = "";
  // Lọc bỏ câu lỗi (thiếu options / đáp án sai chỉ số) — phòng dữ liệu admin hỏng
  questions = (Array.isArray(questions) ? questions : []).filter(
    (q) => q && Array.isArray(q.options) && q.options.length >= 2 && Number.isInteger(q.a) && q.a >= 0 && q.a < q.options.length
  );
  let correct = 0;
  let index = 0;

  // Không có câu hỏi nào: tránh chia 0 (NaN%) và treo màn hình
  if (questions.length === 0) {
    container.innerHTML = `<div class="quiz-result"><p>Chưa có câu hỏi cho bài này.</p></div>`;
    if (onFinish) onFinish(0, 0);
    return;
  }

  const renderQ = () => {
    if (index >= questions.length) {
      const pct = Math.round((correct / questions.length) * 100);
      container.innerHTML = `
        <div class="quiz-result">
          <p class="big">${correct}/${questions.length}</p>
          <p>${pct >= 80 ? "Xuất sắc! 🎉" : pct >= 50 ? "Khá tốt — luyện thêm nhé!" : "Đừng lo, thử lại sau khi học kỹ hơn nhé!"}</p>
          <button class="btn btn-soft" id="quizRetry">Làm lại</button>
        </div>`;
      container.querySelector("#quizRetry").onclick = () => {
        correct = 0;
        index = 0;
        renderQ();
      };
      if (onFinish) onFinish(pct, correct);
      return;
    }
    const item = questions[index];
    const opts = item.options.map((text, i) => ({ text, correct: i === item.a })).slice();
    const mixed = shuffle(opts);
    container.innerHTML = `
      <div class="quiz-q">
        <p class="q-text">Câu ${index + 1}/${questions.length}. ${item.ru ? `<span class="ru">${esc(item.ru)}</span><br>` : ""}${esc(item.q)}</p>
        <div class="options">
          ${mixed.map((o) => `<button class="option ru" data-ok="${o.correct ? 1 : 0}">${esc(o.text)}</button>`).join("")}
        </div>
        <div id="explainBox"></div>
      </div>`;
    container.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ok = btn.dataset.ok === "1";
        container.querySelectorAll(".option").forEach((b) => {
          b.disabled = true;
          if (b.dataset.ok === "1") b.classList.add("correct");
        });
        if (!ok) btn.classList.add("wrong");
        if (ok) correct++;
        if (item.ex) {
          container.querySelector("#explainBox").innerHTML =
            `<div class="explain">💡 ${esc(item.ex)}</div>`;
        }
        index++;
        setTimeout(renderQ, ok && !item.ex ? 650 : 1400);
      });
    });
  };
  renderQ();
}

document.addEventListener("DOMContentLoaded", () => {
  applyLightTheme();
  renderHeader();
  renderFooter();
  applySeason("winter");
  Progress.touchStreak();
  bindAuthToHeader();
  mergeAdminData();
  if (typeof initPage === "function") initPage();
});

/**
 * Gộp dữ liệu admin từ localStorage vào các mảng toàn cục (TRKI_BANK,
 * VOCAB_JARS, SHOP_PRODUCTS, PACKAGES, VOCAB_LESSONS, ...).
 * Hỗ trợ ghi đè theo ID, thêm mới, hoặc ẩn/xóa (soft delete).
 * Dùng .splice() để đột biến mảng in-place giúp các module đang tham chiếu
 * lập tức nhận dữ liệu mới mà không cần re-bind biến toàn cục.
 */
function mergeAdminData() {
  let store;
  try {
    store = JSON.parse(localStorage.getItem("trki_admin_data") || "{}");
  } catch (e) {
    return;
  }
  if (!store || typeof store !== "object") return;
  const arrays = [
    "TRKI_BANK",
    "VOCAB_JARS",
    "SHOP_PRODUCTS",
    "PACKAGES",
    "BLOG_POSTS",
    "LISTENING_LESSONS",
    "SPEAKING_SETS",
    "WRITING_TASKS",
    "VOCAB_LESSONS"
  ];
  const deletedMap = store.__deleted || {};

  arrays.forEach((name) => {
    const list = store[name];
    const target = window[name];
    if (!Array.isArray(target)) return;

    const deletedSet = new Set(deletedMap[name] || []);
    const map = new Map();

    // Nạp item gốc trừ các item đã bị đánh dấu xoá
    target.forEach((it) => {
      const key = it.id || it.title;
      if (key && !deletedSet.has(key)) {
        map.set(key, it);
      }
    });

    // Merge/ghi đè các item từ admin
    if (Array.isArray(list)) {
      list.forEach((it) => {
        const clean = { ...it };
        delete clean.__admin;
        delete clean.__source;
        const key = clean.id || clean.title;
        if (!key || deletedSet.has(key)) return;
        map.set(key, clean);
      });
    }

    // Đột biến mảng in-place
    const updated = Array.from(map.values());
    target.splice(0, target.length, ...updated);
  });

  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    try {
      window.dispatchEvent(new CustomEvent("trki:data-updated"));
    } catch (e) {}
  }
}

// Lắng nghe sự kiện storage giữa các tab: Khi Admin lưu dữ liệu ở 1 tab,
// tất cả các tab khác (mock-test.html, shop.html, v.v.) sẽ tự động merge ngay.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "trki_admin_data") {
      mergeAdminData();
    }
  });
}
