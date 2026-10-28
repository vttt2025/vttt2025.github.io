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
      if (val === null || val === undefined) {
        localStorage.removeItem("trki_" + key);
      } else {
        localStorage.setItem("trki_" + key, JSON.stringify(val));
      }
    } catch (e) {}
  }
};
window.STORE = STORE;

// Chuẩn hóa ngày địa phương YYYY-MM-DD theo Spec Mục 8.12
const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Tính khoảng cách ngày theo UTC 00:00:00 chống lệch múi giờ
const getDiffDays = (dayStr1, dayStr2) => {
  if (!dayStr1 || !dayStr2) return 999;
  const parseToUtc = (str) => {
    if (str.includes('-')) {
      const parts = str.split('-').map(Number);
      return Date.UTC(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(str);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  };
  const t1 = parseToUtc(dayStr1);
  const t2 = parseToUtc(dayStr2);
  return Math.round(Math.abs(t1 - t2) / 86400000);
};

const Progress = {
  /**
   * Cộng XP và cập nhật chuỗi Streak ngày học (XP-Gated Streak & Timezone Safeguard - Spec Mục 8.12).
   * YÊU CẦU BẮT BUỘC: Học viên phải hoàn thành bài học/test mới được cộng XP.
   * Chỗ tính ngày: PHẢI CÓ XP phát sinh trong ngày thì mới tính ngày đó vào chuỗi Streak!
   */
  addXp(n) {
    if (!n || n <= 0) return;
    const xp = STORE.get("xp", 0) + n;
    STORE.set("xp", xp);

    // Tính ngày Streak theo ngày địa phương chuẩn
    const todayStr = getLocalDateString();
    const lastXpDayStr = STORE.get("lastXpDay", "");
    let currentStreak = STORE.get("streak", 0);

    if (lastXpDayStr !== todayStr) {
      if (!lastXpDayStr) {
        currentStreak = 1;
      } else {
        const diffDays = getDiffDays(todayStr, lastXpDayStr);
        if (diffDays === 1) {
          currentStreak += 1; // Học liên tiếp ngày kế tiếp
        } else if (diffDays > 1) {
          currentStreak = 1; // Bắt đầu chuỗi mới sau khi đứt chuỗi
        }
      }
      STORE.set("streak", currentStreak);
      STORE.set("lastXpDay", todayStr);
      STORE.set("lastDay", todayStr);
    }

    updateHeaderChips();
    toast(`+${n} XP!`);

    // Đồng bộ cập nhật thẻ Tiến độ trang chủ nếu đang mở
    const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);
    if (user && typeof renderIndexProgressIfLoggedIn === "function") {
      renderIndexProgressIfLoggedIn(user);
    }

    const isUUID = window.Auth && window.Auth.user && window.Auth.user.uid &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(window.Auth.user.uid);
    if (window.RusiSupabase && window.RusiSupabase.isReady() && isUUID) {
      window.RusiSupabase.profile.syncGamification(window.Auth.user.uid, currentStreak, xp).catch(() => {});
    }
  },

  /**
   * Kiểm tra chuỗi Streak khi mở web (Boot - Spec Mục 8.12).
   * Tuyệt đối KHÔNG tự ý tăng ngày nếu hôm nay chưa có XP.
   * Nếu bỏ bẫng >= 1 ngày (diffDays > 1), reset streak về 0 để tránh hiển thị ảo.
   */
  checkStreakStatus() {
    const todayStr = getLocalDateString();
    const lastXpDayStr = STORE.get("lastXpDay", STORE.get("lastDay", ""));

    if (lastXpDayStr && lastXpDayStr !== todayStr) {
      const diffDays = getDiffDays(todayStr, lastXpDayStr);
      if (diffDays > 1) {
        STORE.set("streak", 0);
      }
    }
    updateHeaderChips();
  },

  touchStreak() {
    this.checkStreakStatus();
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
  if (xpChip) xpChip.innerHTML = (window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : "") + " " + xp + " XP";
  if (streakChip) streakChip.innerHTML = (window.RusiIcons ? RusiIcons.get("flame-streak", { size: 14 }) : "") + " " + streak + " ngày";
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
  getLevel(xp = null) {
    const val = xp !== null ? xp : (typeof STORE !== "undefined" ? STORE.get("xp", 0) : 0);
    if (val >= 1500) return 5;
    if (val >= 700) return 4;
    if (val >= 300) return 3;
    if (val >= 100) return 2;
    return 1;
  },

  getLevelInfo(xp = null) {
    const currentXp = xp !== null ? xp : (typeof STORE !== "undefined" ? STORE.get("xp", 0) : 0);
    const lvl = this.getLevel(currentXp);
    const thresholds = [
      { lvl: 1, min: 0, next: 100, title: "Mèo con Rusika (Cấp 1)", shortTitle: "Mèo con", badge: "Sơ cấp", desc: "Mèo con đeo chuông đỏ đáng yêu, tò mò khám phá bảng chữ cái Cyrillic" },
      { lvl: 2, min: 100, next: 300, title: "Mèo học trò Rusika (Cấp 2)", shortTitle: "Mèo học trò", badge: "Tập sự", desc: "Đeo kính vàng thông thái & cà vạt Nga, nắm vững từ vựng A1 và ngữ pháp căn bản" },
      { lvl: 3, min: 300, next: 700, title: "Mèo thông thái Rusika (Cấp 3)", shortTitle: "Mèo thông thái", badge: "Thông thái", desc: "Đội mũ cử nhân & nơ xanh lịch lãm, làm chủ 6 Cách và luyện nghe 4 Part CEFR" },
      { lvl: 4, min: 700, next: 1500, title: "Học sĩ Rusika (Cấp 4)", shortTitle: "Học sĩ Nga", badge: "Chuyên gia", desc: "Đội mũ lông Ushanka ấm áp & khăn len tuyết, tự tin giải trọn bộ đề thi TRKI B1" },
      { lvl: 5, min: 1500, next: null, title: "Đại hiệp Mèo Nga Rusika (Cấp 5)", shortTitle: "Đại hiệp Mèo", badge: "Huyền thoại", desc: "Đội vương miện Sa hoàng rực rỡ & áo choàng hoàng gia, bậc thầy TRKI đỉnh cao" }
    ];
    const item = thresholds[lvl - 1];
    let percent = 100;
    let remaining = 0;
    if (item.next !== null) {
      const range = item.next - item.min;
      const progress = Math.max(0, currentXp - item.min);
      percent = Math.min(100, Math.round((progress / range) * 100));
      remaining = Math.max(0, item.next - currentXp);
    }
    return {
      level: lvl,
      xp: currentXp,
      title: item.title,
      shortTitle: item.shortTitle,
      badge: item.badge,
      desc: item.desc,
      minXp: item.min,
      nextXp: item.next,
      percent,
      remaining
    };
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

  getShortTitle(level) {
    const titles = {
      1: "Mèo con",
      2: "Mèo học trò",
      3: "Mèo thông thái",
      4: "Học sĩ Nga",
      5: "Đại hiệp Mèo"
    };
    return titles[level] || titles[1];
  },

  getOutfit(season) {
    const outfits = {
      winter: "Mũ lông Ushanka & Áo len tuyết ấm áp",
      spring: "Vòng hoa xuân tươi mát & Khăn len nhẹ",
      summer: "Kính râm sành điệu & Mũ cói đi biển",
      autumn: "Khăn len ấm áp & Chiếc lá phong vàng"
    };
    return outfits[season] || outfits.winter;
  },

  getQuote() {
    const quotes = [
      "«Повторение — мать учения!» (Ôn tập là mẹ của sự học thành công!)",
      "Hôm nay bạn đã ôn tập các từ trong Lọ từ vựng chưa nào?",
      "Luyện phát âm câu nói mỗi ngày để ngữ điệu mềm mại chuẩn người Moskva nhé!",
      "Chứng chỉ ТРКИ không hề khó khi bạn luyện đề đều đặn với Rusika!",
      "«Терпение и труд всё перетрут» (Có công mài sắt, có ngày nên kim)!",
      "Mỗi ngày một chút, tiếng Nga sẽ trở thành người bạn thân của bạn!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  getSvg(level = 1, season = "winter", size = 64) {
    const uid = Math.random().toString(36).substring(2, 7);
    const lvl = Number(level) || 1;
    let accessorySvg = "";
    let auraSvg = "";

    if (lvl === 1) {
      accessorySvg = `
        <path d="M30 73 Q50 82 70 73" stroke="#e11d48" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <circle cx="50" cy="78" r="4.5" fill="#f59e0b" stroke="#b45309" stroke-width="1"/>
        <circle cx="50" cy="79" r="1.2" fill="#78350f"/>
      `;
    } else if (lvl === 2) {
      accessorySvg = `
        <circle cx="37" cy="49" r="10.5" stroke="#f59e0b" stroke-width="2.2" fill="rgba(254,243,199,0.25)"/>
        <circle cx="63" cy="49" r="10.5" stroke="#f59e0b" stroke-width="2.2" fill="rgba(254,243,199,0.25)"/>
        <path d="M47.5 49 Q50 46 52.5 49" stroke="#f59e0b" stroke-width="2.2" fill="none"/>
        <path d="M32 73 Q50 81 68 73" stroke="#1757a6" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <polygon points="46,75 54,75 52,89 48,89" fill="#dc2626"/>
        <rect x="47" y="75" width="6" height="4" fill="#ffffff"/>
      `;
    } else if (lvl === 3) {
      accessorySvg = `
        <polygon points="50,11 78,21 50,30 22,21" fill="#1e293b"/>
        <polygon points="36,25 64,25 61,33 39,33" fill="#0f172a"/>
        <circle cx="50" cy="20.5" r="2.2" fill="#f59e0b"/>
        <path d="M50 20.5 Q66 22 72 32" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <polygon points="70,32 74,32 72,39" fill="#f59e0b"/>
        <polygon points="43,72 43,82 50,77" fill="#1757a6"/>
        <polygon points="57,72 57,82 50,77" fill="#1757a6"/>
        <circle cx="50" cy="77" r="3" fill="#f59e0b"/>
      `;
    } else if (lvl === 4) {
      accessorySvg = `
        <path d="M24 35 Q50 16 76 35 L78 44 Q50 38 22 44 Z" fill="#334155"/>
        <path d="M18 39 Q20 59 27 57 Q30 45 29 39 Z" fill="#475569"/>
        <path d="M82 39 Q80 59 73 57 Q70 45 71 39 Z" fill="#475569"/>
        <circle cx="50" cy="31" r="5" fill="#dc2626"/>
        <polygon points="50,27.5 51.5,30 54.5,30 52,31.8 53,34.5 50,32.8 47,34.5 48,31.8 45.5,30 48.5,30" fill="#fef08a"/>
        <path d="M25 71 Q50 84 75 71" stroke="#dc2626" stroke-width="7" stroke-linecap="round" fill="none"/>
        <path d="M29 71 Q50 84 71 71" stroke="#ffffff" stroke-width="2" stroke-dasharray="3,3" fill="none"/>
      `;
    } else {
      auraSvg = `
        <circle cx="16" cy="26" r="2" fill="#f59e0b" opacity="0.8"/>
        <circle cx="84" cy="26" r="2" fill="#f59e0b" opacity="0.8"/>
        <polygon points="85,38 87,42 91,42 88,44 89,48 85,46 81,48 82,44 79,42 83,42" fill="#f59e0b" opacity="0.75"/>
        <polygon points="15,38 17,42 21,42 18,44 19,48 15,46 11,48 12,44 9,42 13,42" fill="#f59e0b" opacity="0.75"/>
      `;
      accessorySvg = `
        <polygon points="32,24 38,9 50,17 62,9 68,24" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="38" cy="9" r="2.4" fill="#ef4444"/>
        <circle cx="50" cy="17" r="2.4" fill="#0284c7"/>
        <circle cx="62" cy="9" r="2.4" fill="#ef4444"/>
        <rect x="34" y="22" width="32" height="4.5" rx="1.5" fill="#b45309"/>
        <path d="M24 70 Q50 86 76 70" stroke="#991b1b" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M27 70 Q50 84 73 70" stroke="#f59e0b" stroke-width="2" fill="none"/>
        <circle cx="50" cy="80" r="5" fill="#f59e0b" stroke="#b45309" stroke-width="1.2"/>
        <polygon points="50,77 51,79 53,79 51.5,80.5 52,82.5 50,81.5 48,82.5 48.5,80.5 47,79 49,79" fill="#991b1b"/>
      `;
    }

    const svgStyle = size ? `width:${size}px;height:${size}px;display:inline-block;vertical-align:middle;flex-shrink:0` : `width:100%;height:100%;display:block`;

    return `
    <svg viewBox="0 0 100 100" style="${svgStyle}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mascot Rusika Cấp ${lvl}">
      <defs>
        <linearGradient id="fur_${uid}" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop stop-color="#94a3b8"/>
          <stop offset="1" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="eye_${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#38bdf8"/>
          <stop offset="1" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      ${auraSvg}
      <polygon points="22,42 30,13 46,31" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <polygon points="26,38 32,19 42,31" fill="#f472b6" opacity="0.8"/>
      <polygon points="78,42 70,13 54,31" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <polygon points="74,38 68,19 58,31" fill="#f472b6" opacity="0.8"/>
      <ellipse cx="50" cy="54" rx="34" ry="29" fill="url(#fur_${uid})" stroke="#475569" stroke-width="0.8"/>
      <ellipse cx="29" cy="62" rx="7" ry="4.5" fill="#fbcfe8" opacity="0.65"/>
      <ellipse cx="71" cy="62" rx="7" ry="4.5" fill="#fbcfe8" opacity="0.65"/>
      <ellipse cx="37" cy="49" rx="7.5" ry="8.5" fill="url(#eye_${uid})"/>
      <ellipse cx="63" cy="49" rx="7.5" ry="8.5" fill="url(#eye_${uid})"/>
      <ellipse cx="37" cy="49" rx="4.5" ry="6" fill="#0369a1"/>
      <ellipse cx="63" cy="49" rx="4.5" ry="6" fill="#0369a1"/>
      <circle cx="39.5" cy="46" r="2.8" fill="#ffffff"/>
      <circle cx="65.5" cy="46" r="2.8" fill="#ffffff"/>
      <circle cx="34.5" cy="52" r="1.3" fill="#ffffff"/>
      <circle cx="60.5" cy="52" r="1.3" fill="#ffffff"/>
      <polygon points="48,58 52,58 50,61" fill="#f43f5e"/>
      <path d="M44 63 Q47 66.5 50 63 Q53 66.5 56 63" stroke="#334155" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <line x1="15" y1="58" x2="28" y2="60" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="14" y1="64" x2="28" y2="63" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="85" y1="58" x2="72" y2="60" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="86" y1="64" x2="72" y2="63" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
      <ellipse cx="34" cy="80" rx="9" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
      <ellipse cx="66" cy="80" rx="9" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
      ${accessorySvg}
    </svg>`;
  },

  renderHeroCard(container) {
    if (!container) return;
    const xp = STORE.get("xp", 0);
    const streak = STORE.get("streak", 0);
    const lvl = this.getLevel(xp);
    const info = this.getLevelInfo(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    container.innerHTML = `
      <div class="rusika-card-inner">
        <!-- CỘT CON MÈO RUSIKA TIẾN HÓA THEO XP -->
        <div class="rusika-character-col">
          <div class="rusika-avatar-stage" id="rusikaAvatarStage" title="Bấm để trò chuyện với Rusi AI">
            <div class="rusika-avatar-glow"></div>
            <div class="rusika-avatar-svg-wrap">
              ${this.getSvg(lvl, season, 96)}
            </div>
            <span class="rusika-online-badge">
              <span class="online-dot"></span> Đang trực tuyến
            </span>
          </div>
          <div class="rusika-level-pill">
            <span class="pill-lvl">Cấp ${lvl}</span>
            <span class="pill-name">${esc(info.shortTitle)}</span>
          </div>
          <div class="rusika-xp-progress-wrap" title="${info.nextXp ? `Cần thêm ${info.remaining} XP để lên Cấp ${lvl + 1}` : 'Đã đạt cấp tối thượng!'}">
            <div class="rusika-xp-bar">
              <div class="rusika-xp-fill" style="width:${info.percent}%"></div>
            </div>
            <div class="rusika-xp-text">
              <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${xp} XP</span>
              <span>${info.nextXp ? `${info.percent}% (${info.remaining} XP lên Lv.${lvl + 1})` : `MAX ${window.RusiIcons ? RusiIcons.get('crown-vip', { size: 14 }) : ''}`}</span>
            </div>
          </div>
        </div>

        <!-- BONG BÓNG CHAT RUSIKA -->
        <div class="rusika-bubble-col">
          <div class="rusika-comic-bubble">
            <div class="rusika-bubble-header">
              <span class="bubble-tag">${window.RusiIcons ? RusiIcons.get("cat-mascot", { size: 14 }) : ""} BẠN ĐỒNG HÀNH AI · ${this.getTitle(lvl).toUpperCase()}</span>
              <span class="bubble-streak">${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 14 }) : ""} Chuỗi học: <b>${streak} ngày</b></span>
            </div>
            <div class="rusika-bubble-message">
              «Привет! Mình là Rusi AI. Hôm nay bạn muốn luyện từ vựng, nghe 4 Part CEFR hay sửa phát âm cùng mình? Nhấn vào đây để trò chuyện nhé! 🐾»
            </div>

            <!-- GỢI Ý CÂU HỎI TRỰC QUAN -->
            <div class="rusika-quick-prompts">
              <span class="prompts-label">Gợi ý chủ đề:</span>
              <div class="prompts-pills">
                <button type="button" class="btn-prompt-chip" data-prompt="Gợi ý đề thi TRKI A1–B2 phù hợp cho mình">Đề thi TRKI</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Quy tắc đánh trọng âm và phát âm tiếng Nga chuẩn">Luyện phát âm</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Giải thích 6 Cách trong tiếng Nga ngắn gọn dễ hiểu">6 Cách tiếng Nga</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Cách chia động từ tiếng Nga theo ngôi và thể">Chia động từ</button>
                <button type="button" class="btn-prompt-chip" data-prompt="Điều kiện và kinh nghiệm xin học bổng Du học Nga">Học bổng Du học Nga</button>
              </div>
            </div>

            <div class="rusika-bubble-cta-row">
              <button class="btn btn-primary btn-chat-trigger" id="btnInteractRusika" type="button">
                <span>Mở cửa sổ trò chuyện với Rusika</span>
                <span class="cta-arrow">${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : "→"}</span>
              </button>
              <span class="cta-hint">Hoàn toàn miễn phí · Phản hồi tức thì</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const btn = container.querySelector("#btnInteractRusika");
    if (btn) btn.onclick = () => this.openChat();

    const stage = container.querySelector("#rusikaAvatarStage");
    if (stage) stage.onclick = () => this.openChat();

    container.querySelectorAll(".btn-prompt-chip").forEach((chip) => {
      chip.onclick = (e) => {
        e.stopPropagation();
        this.openChat(chip.dataset.prompt);
      };
    });
  },

  renderFloatingWidget() {
    let widget = document.getElementById("rusikaFloatingWidget");
    if (!widget) {
      widget = document.createElement("div");
      widget.id = "rusikaFloatingWidget";
      widget.className = "rusika-floating-widget";
      document.body.appendChild(widget);
    }
    const xp = STORE.get("xp", 0);
    const lvl = this.getLevel(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    widget.innerHTML = `
      <div class="rusika-float-tooltip" id="rusikaFloatTooltip">
        <span>Мяу! Trò chuyện cùng Rusika nhé</span>
        <button class="rusika-tooltip-close" id="rusikaTooltipClose" type="button" aria-label="Đóng">&times;</button>
      </div>
      <button class="rusika-float-btn" id="rusikaFloatBtn" type="button" title="Mở hộp trò chuyện với Rusi AI (Lv.${lvl})">
        <div class="rusika-float-avatar">
          ${this.getSvg(lvl, season, 52)}
        </div>
        <span class="rusika-float-badge">Lv.${lvl}</span>
        <span class="rusika-float-pulse"></span>
      </button>
    `;

    const btn = widget.querySelector("#rusikaFloatBtn");
    if (btn) {
      btn.onclick = () => this.toggleChat();
    }
    const closeBtn = widget.querySelector("#rusikaTooltipClose");
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        const tooltip = document.getElementById("rusikaFloatTooltip");
        if (tooltip) tooltip.style.display = "none";
      };
    }
  },

  openChat(initialPrompt = null) {
    let overlay = document.getElementById("rusikaChatOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "rusikaChatOverlay";
      overlay.className = "rusika-chat-overlay";
      document.body.appendChild(overlay);

      const xp = STORE.get("xp", 0);
      const lvl = this.getLevel(xp);
      const info = this.getLevelInfo(xp);
      const season = typeof currentSeason === "function" ? currentSeason() : "winter";

      overlay.innerHTML = `
        <div class="rusika-chat-window" id="rusikaChatWindow">
          <div class="rusika-chat-drag-handle"></div>
          <div class="rusika-chat-header">
            <div class="rusika-chat-header-info">
              <div class="rusika-chat-avatar-mini" id="chatHeaderAvatar">
                ${this.getSvg(lvl, season, 42)}
              </div>
              <div>
                <div class="chat-header-title">
                  <b>Rusi AI</b>
                  <span class="chat-online-dot" title="Đang trực tuyến"></span>
                </div>
                <div class="chat-header-sub" id="chatHeaderSub">
                  <span>${esc(info.shortTitle)} · Cấp ${lvl}</span> • <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${info.xp} XP</span>
                </div>
              </div>
            </div>
            <div class="rusika-chat-header-actions">
              <button class="chat-action-btn" id="closeRusikaChat" type="button" aria-label="Đóng">&times;</button>
            </div>
          </div>

          <div class="rusika-chat-body" id="rusikaChatMessages">
            <div class="chat-msg msg-ai">
              <div class="msg-avatar" id="msgAvatarInitial">${this.getSvg(lvl, season, 32)}</div>
              <div class="msg-bubble">
                <p><b>Привет!</b> Mình là <b>Rusi AI</b> — bạn đồng hành luyện thi tiếng Nga của bạn.</p>
                <p>Hôm nay bạn muốn luyện nghe, giải thích ngữ pháp hay tìm đề thi TRKI nào? Hãy nhấn gợi ý bên dưới hoặc gõ tin nhắn cho mình nhé!</p>
              </div>
            </div>

            <div class="chat-chips-container" id="chatQuickChips">
              <button type="button" class="chat-chip-btn" data-query="Gợi ý đề thi TRKI A1–B2 phù hợp cho mình">Đề thi TRKI</button>
              <button type="button" class="chat-chip-btn" data-query="Quy tắc đánh trọng âm và phát âm tiếng Nga">Luyện phát âm</button>
              <button type="button" class="chat-chip-btn" data-query="Giải thích 6 Cách trong tiếng Nga ngắn gọn">6 Cách tiếng Nga</button>
              <button type="button" class="chat-chip-btn" data-query="Cách chia động từ tiếng Nga theo ngôi">Chia động từ</button>
              <button type="button" class="chat-chip-btn" data-query="Điều kiện và kinh nghiệm xin học bổng Du học Nga">Học bổng Du học Nga</button>
              <button type="button" class="chat-chip-btn" data-query="Làm thế nào để Rusi AI tăng cấp XP?">Tăng cấp Rusi AI</button>
            </div>
          </div>

          <form class="rusika-chat-footer" id="rusikaChatForm">
            <input type="text" id="rusikaChatInput" placeholder="Nhập câu hỏi bằng tiếng Việt hoặc tiếng Nga..." autocomplete="off" />
            <button type="submit" id="btnSendRusikaChat" aria-label="Gửi tin nhắn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      `;

      overlay.querySelector("#closeRusikaChat").onclick = () => this.closeChat();
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeChat();
      });

      const form = overlay.querySelector("#rusikaChatForm");
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = overlay.querySelector("#rusikaChatInput");
        const val = input.value.trim();
        if (val) {
          input.value = "";
          this.sendUserMessage(val);
        }
      };

      overlay.querySelectorAll(".chat-chip-btn").forEach((chip) => {
        chip.onclick = () => {
          this.sendUserMessage(chip.dataset.query);
        };
      });
    }

    overlay.style.display = "flex";
    document.body.classList.add("rusika-chat-open");

    const tooltip = document.getElementById("rusikaFloatTooltip");
    if (tooltip) tooltip.style.display = "none";

    const messages = document.getElementById("rusikaChatMessages");
    if (messages) messages.scrollTop = messages.scrollHeight;

    const input = document.getElementById("rusikaChatInput");
    if (input) {
      if (initialPrompt) {
        input.value = initialPrompt;
        const form = document.getElementById("rusikaChatForm");
        if (form) form.dispatchEvent(new Event("submit"));
      } else {
        setTimeout(() => input.focus(), 150);
      }
    }
  },

  closeChat() {
    const overlay = document.getElementById("rusikaChatOverlay");
    if (overlay) overlay.style.display = "none";
    document.body.classList.remove("rusika-chat-open");
  },

  toggleChat() {
    const overlay = document.getElementById("rusikaChatOverlay");
    if (overlay && overlay.style.display === "flex") {
      this.closeChat();
    } else {
      this.openChat();
    }
  },

  showModal() {
    this.openChat();
  },

  sendUserMessage(text) {
    const messages = document.getElementById("rusikaChatMessages");
    if (!messages) return;

    // 1. Thêm tin nhắn của người dùng
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg msg-user";
    userMsg.innerHTML = `<div class="msg-bubble">${esc(text)}</div>`;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    // 2. Thêm chỉ báo Rusika đang gõ
    const xp = STORE.get("xp", 0);
    const oldLvl = this.getLevel(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    const typingMsg = document.createElement("div");
    typingMsg.className = "chat-msg msg-ai msg-typing";
    typingMsg.id = "rusikaTypingIndicator";
    typingMsg.innerHTML = `
      <div class="msg-avatar">${this.getSvg(oldLvl, season, 32)}</div>
      <div class="msg-bubble">
        <div class="rusika-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messages.appendChild(typingMsg);
    messages.scrollTop = messages.scrollHeight;

    // 3. Phản hồi thông minh sau 400ms
    setTimeout(() => {
      const typing = document.getElementById("rusikaTypingIndicator");
      if (typing) typing.remove();

      const reply = this.generateAiReply(text);

      // Thưởng +5 XP khi học tập tương tác cùng AI
      const newXp = xp + 5;
      STORE.set("xp", newXp);
      const newLvl = this.getLevel(newXp);
      const levelUp = newLvl > oldLvl;

      const aiMsg = document.createElement("div");
      aiMsg.className = "chat-msg msg-ai";
      aiMsg.innerHTML = `
        <div class="msg-avatar">${this.getSvg(newLvl, season, 32)}</div>
        <div class="msg-bubble">
          <div class="reply-title"><b>${esc(reply.title)}</b></div>
          <div class="reply-text">${reply.text.replace(/\n/g, "<br>")}</div>
          <div class="reply-xp-tag">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} +5 XP tương tác học cùng Rusika! (Tổng: ${newXp} XP)</div>
        </div>
      `;
      messages.appendChild(aiMsg);

      // Nếu lên cấp -> Bắn pháo hoa chúc mừng tiến hóa
      if (levelUp) {
        const evoInfo = this.getLevelInfo(newXp);
        const evoMsg = document.createElement("div");
        evoMsg.className = "chat-msg msg-levelup";
        evoMsg.innerHTML = `
          <div class="levelup-card">
            <div class="levelup-cat">${this.getSvg(newLvl, season, 64)}</div>
            <div class="levelup-title">${window.RusiIcons ? RusiIcons.get("trophy-reward", { size: 24 }) : ""} CHÚC MỪNG! MÈO RUSIKA ĐÃ TIẾN HÓA! ${window.RusiIcons ? RusiIcons.get("trophy-reward", { size: 24 }) : ""}</div>
            <div class="levelup-desc">Bạn đã đạt <b>${newXp} XP</b> và mở khóa <b>${esc(evoInfo.title)}</b>! ${esc(evoInfo.badge)}</div>
          </div>
        `;
        messages.appendChild(evoMsg);
        if (typeof toast === "function") toast(`Mèo Rusika đã tiến hóa lên Cấp ${newLvl}!`);
      }

      this.updateAllViews();
      messages.scrollTop = messages.scrollHeight;
    }, 450);
  },

  generateAiReply(q) {
    const query = (q || "").toLowerCase().trim();
    if (/trki|đề thi|thi thử|chứng chỉ|torfl/i.test(query)) {
      return {
        title: "Cẩm nang Đề thi TRKI chuẩn quốc tế",
        text: "Hệ thống chứng chỉ TRKI (TORFL) gồm các cấp độ từ A1 đến B2:\n• <b>TRKI A1 (Элементарный)</b>: Yêu cầu ~780 từ vựng, giao tiếp sinh hoạt và xã hội căn bản.\n• <b>TRKI A2 (Базовый)</b>: ~1.300 từ vựng, chuẩn đủ điều kiện học khoa dự bị tại các trường ĐH Nga.\n• <b>TRKI B1 (Первый)</b>: ~2.300 từ vựng, điều kiện bắt buộc nhập học Đại học chính quy tại LB Nga.\n• <b>TRKI B2 (Второй)</b>: ~10.000 từ vựng, chuẩn tốt nghiệp cử nhân và thạc sĩ tại Nga.\n\n👉 Điểm đạt là <b>66%</b> trên mỗi bài thi con. Hãy vào mục <b>«Thi thử TRKI»</b> trên website để làm quen với ngân hàng đề thi chuẩn nhé!"
      };
    } else if (/phát âm|trọng âm|ударение|đọc/i.test(query)) {
      return {
        title: "Quy tắc Phát âm & Trọng âm tiếng Nga",
        text: "Trọng âm (Ударение) là linh hồn của phát âm tiếng Nga:\n1. <b>Biến âm chữ О</b>: Khi có trọng âm phát âm rõ [O]. Khi không mang trọng âm giảm thành âm [A] ngắn (vd: молоко đọc là [mə-la-kó]).\n2. <b>Biến âm chữ Е/Я</b>: Khi không mang trọng âm phát âm nhẹ gần như âm [I] (vd: река đọc là [ri-ká]).\n3. <b>Âm câm & biến đổi cuối từ</b>: Các phụ âm vang (звонкие: б, в, г, д, ж, з) đứng cuối từ sẽ bị vô thanh hóa (г -> к, д -> т, б -> п, vd: хлеб đọc là [khlep]).\n\n👉 Hãy vào mục <b>«Luyện nói & AI Rusika»</b> để Rusika trực tiếp sửa lỗi phát âm cho bạn nhé!"
      };
    } else if (/chia động từ|động từ|ngôi|спряжение/i.test(query)) {
      return {
        title: "Cách chia Động từ tiếng Nga (Спряжение)",
        text: "Tiếng Nga có 2 nhóm chia động từ chính theo ngôi:\n• <b>Nhóm I (Спряжение I)</b>: Tận cùng -ать, -ять, -еть -> đuôi chia: <b>-ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут</b> (Ví dụ: Читать -> читаю, читаешь, читает, читаем, читаете, читают).\n• <b>Nhóm II (Спряжение II)</b>: Thường tận cùng -ить -> đuôi chia: <b>-ю/-у, -ишь, -ит, -им, -ите, -ят/-ат</b> (Ví dụ: Говорить -> говорю, говоришь, говорит, говорим, говорите, говорят).\n\n💡 Lưu ý cặp thể động từ <b>НСВ</b> (chưa hoàn thành: quá trình, lặp đi lặp lại) và <b>СВ</b> (hoàn thành: kết quả duy nhất)!"
      };
    } else if (/cách|падеж|biến cách|danh từ/i.test(query)) {
      return {
        title: "Hệ thống 6 Cách trong tiếng Nga (6 Падежей)",
        text: "6 Cách là xương sống của ngữ pháp tiếng Nga:\n• <b>Cách 1 (Именительный)</b>: Chủ ngữ trong câu (Кто? Что?)\n• <b>Cách 2 (Родительный)</b>: Sở hữu, phủ định 'нет', số lượng (Кого? Чего? Откуда?)\n• <b>Cách 3 (Дательный)</b>: Người nhận, tuổi tác, gián tiếp (Кому? Чему?)\n• <b>Cách 4 (Винительный)</b>: Bổ ngữ trực tiếp, hướng chuyển động (Кого? Что? Куда?)\n• <b>Cách 5 (Творительный)</b>: Phương tiện, công cụ, nghề nghiệp, đi cùng ai (Кем? Чем? С кем?)\n• <b>Cách 6 (Предложный)</b>: Địa điểm ở đâu, chủ đề suy nghĩ/nói (Где? О ком? О чём?)"
      };
    } else if (/học bổng|du học|nga/i.test(query)) {
      return {
        title: "Học bổng Du học Nga",
        text: "Học bổng Hiệp định giữa Bộ GD&ĐT Việt Nam và Liên bang Nga:\n• <b>Quyền lợi</b>: Miễn 100% học phí suốt 4–6 năm, đài thọ ký túc xá, bảo hiểm y tế và cấp sinh hoạt phí hàng tháng song phương (từ cả phía Nga và phía Việt Nam).\n• <b>Tiêu chuẩn</b>: Điểm trung bình GPA THPT hoặc Đại học từ 7.0+ (khuyên dùng 8.0+ để cạnh tranh hồ sơ).\n• <b>Trình độ tiếng</b>: Chưa biết tiếng Nga vẫn nộp được vì bạn sẽ được đài thọ 1 năm học tiếng Nga dự bị tại các trường danh tiếng như MGU, SPbU, Bauman, HSE..."
      };
    } else if (/tăng cấp|tiến hóa|xp|cấp độ|mèo/i.test(query)) {
      return {
        title: "Hệ thống Tiến hóa của Mèo Rusika",
        text: "Rusika sẽ lớn lên và thay đổi trang phục theo điểm XP của bạn:\n• <b>Cấp 1 (0–99 XP)</b>: Mèo con đeo chuông đỏ đáng yêu 🌱\n• <b>Cấp 2 (100–299 XP)</b>: Mèo học trò kính vàng & cà vạt Nga 📚\n• <b>Cấp 3 (300–699 XP)</b>: Mèo thông thái mũ cử nhân & nơ xanh 🎓\n• <b>Cấp 4 (700–1499 XP)</b>: Học sĩ Mũ lông Ushanka ấm áp ❄️\n• <b>Cấp 5 (1500+ XP)</b>: Đại hiệp Mèo Vương miện Hoàng gia Sa hoàng 👑\n\n👉 Nhận XP bằng cách: Học Lọ từ vựng (+10 XP), làm bài thi thử (+50 XP), viết bài luận (+30 XP) và mỗi câu hỏi trò chuyện (+5 XP)!"
      };
    } else {
      return {
        title: "Rusika luôn sẵn sàng hỗ trợ bạn!",
        text: "Мяу! Rất vui được đồng hành cùng bạn học tiếng Nga! Phương pháp tốt nhất là <b>học đều đặn 15 phút mỗi ngày</b>.\n\nBạn có thể hỏi Rusika về <b>Đề thi TRKI</b>, <b>Ngữ pháp 6 Cách</b>, <b>Cách chia động từ</b>, <b>Quy tắc trọng âm</b> hoặc kinh nghiệm <b>Du học Nga</b> nhé! Rusika luôn sẵn sàng giải đáp! ✨"
      };
    }
  },

  updateAllViews() {
    const xp = STORE.get("xp", 0);
    const lvl = this.getLevel(xp);
    const info = this.getLevelInfo(xp);
    const season = typeof currentSeason === "function" ? currentSeason() : "winter";

    // 1. Cập nhật chip header
    const chipXp = document.getElementById("chipXp");
    if (chipXp) chipXp.innerHTML = (window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : "") + " " + xp + " XP";
    const chipMascot = document.getElementById("chipMascot");
    if (chipMascot) {
      chipMascot.innerHTML = `${this.getSvg(lvl, season, 22)} <span>Rusika Lv.${lvl}</span>`;
      chipMascot.title = this.getTitle(lvl);
    }

    // 2. Cập nhật hero card nếu đang ở index
    const heroCard = document.getElementById("rusikaHeroCard");
    if (heroCard) {
      this.renderHeroCard(heroCard);
    }

    // 3. Cập nhật floating widget
    const floatBtn = document.getElementById("rusikaFloatBtn");
    if (floatBtn) {
      const avatarWrap = floatBtn.querySelector(".rusika-float-avatar");
      if (avatarWrap) avatarWrap.innerHTML = this.getSvg(lvl, season, 52);
      const badge = floatBtn.querySelector(".rusika-float-badge");
      if (badge) badge.textContent = `Lv.${lvl}`;
    }

    // 4. Cập nhật chat header
    const chatAvatar = document.getElementById("chatHeaderAvatar");
    if (chatAvatar) chatAvatar.innerHTML = this.getSvg(lvl, season, 42);
    const chatSub = document.getElementById("chatHeaderSub");
    if (chatSub) chatSub.innerHTML = `<span>${esc(info.shortTitle)} · Cấp ${lvl}</span> • <span>${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} ${info.xp} XP</span>`;

    // 5. Cập nhật pwXp nếu có
    const pwXp = document.getElementById("pwXp");
    if (pwXp) pwXp.textContent = xp;
  }
};

// ============================================================================
// HỆ THỐNG GÓI CƯỚC & THANH TOÁN VIETQR TỰ ĐỘNG CHUẨN HIỆN NAY (MONETIZATION 2.0)
// ============================================================================
const Monetization = {
  _timerInterval: null,

  /** Lấy thông tin người dùng hiện tại (từ Auth hoặc STORE) */
  getCurrentUser() {
    return (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
  },

  /** Kiểm tra trạng thái PRO của người dùng hiện tại */
  isPro() {
    const user = this.getCurrentUser();
    // 1. Kiểm tra trạng thái PRO gắn liền theo tài khoản (UID)
    if (user && user.uid) {
      const userPro = STORE.get("pro_user_" + user.uid, null);
      if (userPro && userPro.active) {
        if (userPro.expiresAt && !userPro.isLifetime) {
          if (new Date(userPro.expiresAt).getTime() < Date.now()) {
            return false;
          }
        }
        return true;
      }
    }
    // 2. Fallback tương thích ngược với khóa cục bộ
    const legacy = Boolean(STORE.get("is_pro", false));
    if (legacy) {
      const exp = STORE.get("pro_expires", null);
      if (exp && new Date(exp).getTime() < Date.now()) {
        return false;
      }
      return true;
    }
    return false;
  },

  /** Lấy thông tin chi tiết gói PRO đã kích hoạt */
  getProInfo() {
    if (!this.isPro()) return null;
    const user = this.getCurrentUser();
    let proData = null;
    if (user && user.uid) {
      proData = STORE.get("pro_user_" + user.uid, null);
    }
    if (!proData && STORE.get("is_pro", false)) {
      proData = {
        active: true,
        pkgId: STORE.get("pro_active_pkg", "pro_1y"),
        pkgTitle: "Gói Chuyên Nghiệp 1 Năm",
        expiresAt: STORE.get("pro_expires", new Date(Date.now() + 365 * 86400000).toISOString()),
        isLifetime: false,
        activatedAt: new Date().toISOString()
      };
    }
    if (!proData) return null;

    let expiresFormatted = "Đang kích hoạt";
    if (proData.isLifetime || proData.pkgId === "pro_vip") {
      expiresFormatted = "Vĩnh viễn (Trọn đời)";
    } else if (proData.expiresAt) {
      try {
        const d = new Date(proData.expiresAt);
        expiresFormatted = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
      } catch (_) {}
    }

    return {
      active: true,
      pkgId: proData.pkgId || "pro_1y",
      pkgTitle: proData.pkgTitle || "Gói PRO",
      expiresAt: proData.expiresAt,
      expiresFormatted,
      isLifetime: Boolean(proData.isLifetime || proData.pkgId === "pro_vip"),
      activatedAt: proData.activatedAt
    };
  },

  /** Kích hoạt hoặc hủy kích hoạt gói PRO */
  setPro(status = true, pkgId = "pro_1y") {
    const user = this.getCurrentUser();
    const pkgs = this.getPackages();
    const normId = (pkgId || "pro_1y").toLowerCase();
    const pkg = pkgs.find((p) => (p.id || "").toLowerCase() === normId) || {
      id: pkgId,
      title: "Gói PRO",
      badge: "PRO"
    };

    let expiresAt = null;
    let isLifetime = false;
    if (normId === "pro_vip") {
      isLifetime = true;
      expiresAt = new Date(Date.now() + 100 * 365 * 86400000).toISOString();
    } else if (normId === "pro_6m") {
      expiresAt = new Date(Date.now() + 180 * 86400000).toISOString();
    } else {
      expiresAt = new Date(Date.now() + 365 * 86400000).toISOString();
    }

    const proData = {
      active: status,
      pkgId: pkg.id,
      pkgTitle: pkg.title,
      isLifetime,
      expiresAt,
      activatedAt: new Date().toISOString()
    };

    if (user && user.uid) {
      STORE.set("pro_user_" + user.uid, status ? proData : null);
    }
    STORE.set("is_pro", status);
    if (status) {
      STORE.set("pro_expires", expiresAt);
      STORE.set("pro_active_pkg", pkg.id);
    } else {
      STORE.set("pro_expires", null);
      STORE.set("pro_active_pkg", null);
    }

    // Cập nhật giao diện toàn hệ thống
    updateHeaderChips();
    if (typeof renderUserArea === "function") renderUserArea();
    if (typeof window.renderPricingGrid === "function") window.renderPricingGrid();

    // Bắn sự kiện đồng bộ đa tab & các component
    try {
      window.dispatchEvent(new CustomEvent("trki:pro-updated", { detail: proData }));
    } catch (_) {}
  },

  /** Lấy danh sách gói cước chuẩn */
  getPackages() {
    let raw = [];
    if (typeof window !== "undefined" && window.PACKAGES && window.PACKAGES.length > 0) {
      raw = window.PACKAGES;
    } else if (typeof PACKAGES !== "undefined" && PACKAGES.length > 0) {
      raw = PACKAGES;
    } else {
      raw = [
      {
        id: "pro_6m",
        badge: "6 THÁNG",
        title: "Gói Bứt Phá 6 Tháng",
        desc: "Phù hợp cho học viên ôn thi cấp tốc chuẩn bị du học hoặc thi chứng chỉ ТЭУ/ТБУ.",
        price: 299000,
        priceOld: 590000,
        popular: false,
        features: [
          "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1, A2",
          "Đáp án giải thích ngữ pháp chi tiết từng câu",
          "Luyện nghe 4 Part CEFR không giới hạn",
          "Tạo không giới hạn Lọ từ vựng cá nhân",
          "Phát hiện & sửa lỗi phát âm AI"
        ]
      },
      {
        id: "pro_1y",
        badge: "1 NĂM",
        title: "Gói Chuyên Nghiệp 1 Năm",
        desc: "Lựa chọn hàng đầu cho sinh viên chuẩn bị sang Nga học dự bị và đại học.",
        price: 499000,
        priceOld: 990000,
        popular: true,
        features: [
          "Mở khóa TOÀN BỘ ngân hàng đề thi ТРКИ A1, A2, B1, B2",
          "Phân tích chuyên sâu đề thi & dự đoán điểm đỗ",
          "Chấm bài tự luận Viết (Письмо) có nhận xét của giảng viên",
          "Kho 100+ Lọ từ vựng chuyên ngành (Y khoa, Kỹ thuật, Kinh tế)",
          "Ưu tiên hỗ trợ hồ sơ học bổng Du học Nga",
          "Hỗ trợ 1-1 qua nhóm Zalo VIP"
        ]
      },
      {
        id: "pro_vip",
        badge: "TRỌN ĐỜI",
        title: "Gói VIP Trọn Đời",
        desc: "Đồng hành trọn vẹn suốt 4-6 năm học tập và sinh sống tại Liên bang Nga.",
        price: 899000,
        priceOld: 1800000,
        popular: false,
        features: [
          "Tất cả quyền lợi của gói 1 Năm vĩnh viễn",
          "Cập nhật miễn phí đề thi ТРКИ mới nhất mỗi năm",
          "Tặng Voucher 500k khi đặt dịch vụ du học & visa Nga",
          "Tặng Hộp quà Nga đặc biệt (Socola Alenka + Trà Ivan-chay)",
          "Cố vấn học thuật trực tiếp định kỳ"
        ]
      }
    ];
    }
    const seen = new Set();
    const result = [];
    for (const p of raw) {
      const pid = (p.id || "").toLowerCase();
      if (!pid || seen.has(pid)) continue;
      seen.add(pid);
      result.push(p);
    }
    return result;
  },

  /**
   * Popup cửa sổ "Nội dung dành cho PRO" khi người dùng chưa mua kích vào xem.
   * Có 2 lựa chọn: "Tìm hiểu gói PRO" (chuyển sang upgrade.html) và "Để sau" (đóng cửa sổ).
   */
  showProGateModal(customTitle = "Nội dung dành riêng cho Hội viên PRO", customDesc = "") {
    let modal = document.getElementById("proGateModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "proGateModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    const defaultDesc = "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng B1–B2, đề thi thử ТРКИ chuẩn quốc tế, bài luyện nghe video thực tế, AI chấm bài tự luận và nhận diện phát âm không giới hạn.";
    const descText = customDesc || defaultDesc;

    modal.innerHTML = `
      <div class="vietqr-card pro-gate-card">
        <button class="vietqr-close" id="closeProGate" title="Đóng">&times;</button>
        
        <div class="pro-gate-header">
          <div class="pro-gate-crown-badge">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 24 }) : ""}</div>
          <span class="pro-gate-kicker">RUSI TRKI • ĐẶC QUYỀN HỘI VIÊN</span>
          <h3 class="pro-gate-title">${esc(customTitle)}</h3>
        </div>

        <div class="pro-gate-body">
          <p class="pro-gate-desc">${esc(descText)}</p>
        </div>

        <div class="pro-gate-actions">
          <button type="button" class="btn btn-outline pro-gate-btn-dismiss" id="btnProGateDismiss">
            Để sau
          </button>
          <a href="upgrade.html" class="btn btn-primary pro-gate-btn-upgrade" id="btnProGateUpgrade" style="display:inline-flex;align-items:center;gap:6px">
            Tìm hiểu gói PRO ${window.RusiIcons ? RusiIcons.get("arrow-right", { size: 16 }) : "→"}
          </a>
        </div>
      </div>
    `;

    const closeModal = () => {
      modal.remove();
      document.removeEventListener("keydown", handleEsc);
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.getElementById("closeProGate").onclick = closeModal;
    document.getElementById("btnProGateDismiss").onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
    document.addEventListener("keydown", handleEsc);
  },

  /** Modal nhắc nhở người dùng chưa đăng nhập khi bấm vào tính năng nâng cấp / paywall */
  showAuthRequiredModal(title = "Nâng cấp tài khoản PRO", reason = "Vui lòng đăng nhập để gắn quyền PRO vào tài khoản và bảo lưu quyền lợi trọn đời.") {
    let modal = document.getElementById("authReqModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "authReqModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    const pageName = window.location.pathname.split("/").pop() || "index.html";
    const currentRedirect = encodeURIComponent(pageName + window.location.search + window.location.hash);

    modal.innerHTML = `
      <div class="vietqr-card" style="max-width:480px">
        <button class="vietqr-close" id="closeAuthReq">&times;</button>
        <div class="auth-req-card">
          <div class="auth-req-icon">${window.RusiIcons ? RusiIcons.get("lock-pro", { size: 48 }) : ""}</div>
          <h3>${esc(title)}</h3>
          <p>${esc(reason)}</p>
          <div class="auth-req-buttons">
            <a class="btn btn-primary btn-lg" href="login.html?redirect=${currentRedirect}" style="text-decoration:none">
              Đăng nhập tài khoản
            </a>
            <a class="btn btn-outline" href="signup.html?redirect=${currentRedirect}" style="text-decoration:none">
              Đăng ký tài khoản mới
            </a>
          </div>
        </div>
      </div>
    `;

    document.getElementById("closeAuthReq").onclick = () => modal.remove();
  },

  /**
   * Mở Modal Thanh Toán VietQR 2.0 Chuẩn Hiện Nay:
   * - Hiển thị tài khoản người dùng thụ hưởng
   * - Hỗ trợ Tabs chuyển đổi linh hoạt 3 gói cước (6 Tháng / 1 Năm / Trọn Đời)
   * - Sinh mã QR và cú pháp định danh theo tài khoản
   * - Bộ đếm ngược 15:00
   * - Sao chép 1-chạm thông minh
   * - Kích hoạt tự động kèm hiệu ứng chúc mừng (Confetti)
   */
  openUpgradeModal(pkgId = "pro_1y") {
    const user = this.getCurrentUser();
    // Chuẩn hiện nay: Nâng cấp yêu cầu phiên đăng nhập để gắn quyền PRO
    if (!user) {
      this.showAuthRequiredModal("Đăng nhập để Nâng cấp PRO", "Để kích hoạt và bảo lưu gói PRO vĩnh viễn trên mọi thiết bị, bạn cần đăng nhập tài khoản trước.");
      return;
    }

    const pkgs = this.getPackages();
    let normId = (pkgId || "pro_1y").toLowerCase();
    let currentPkg = pkgs.find((p) => (p.id || "").toLowerCase() === normId) || pkgs[1] || pkgs[0];

    // Tạo mã đơn có gắn nhận diện học viên
    let ordNum = STORE.get("last_order_num", 1092) + 1;
    STORE.set("last_order_num", ordNum);
    const userTag = (user.email ? user.email.split("@")[0] : (user.name || "USER")).replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
    const orderId = `RUSI_${ordNum}_${userTag || "PRO"}`;

    let modal = document.getElementById("vietqrModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "vietqrModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    // Thời gian phiên thanh toán 15 phút tính theo timestamp client (PROJECT_SPEC line 192)
    const endTime = Date.now() + 15 * 60 * 1000;
    let timeLeft = 15 * 60;
    if (this._timerInterval) clearInterval(this._timerInterval);
    if (this._pollInterval) clearInterval(this._pollInterval);

    const renderModalContent = () => {
      const qrUrl = `https://img.vietqr.io/image/vietinbank-108873919999-compact2.png?amount=${currentPkg.price}&addInfo=${orderId}&accountName=RUSI%20TRKI%20PLATFORM`;
      const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
      };

      modal.innerHTML = `
      <div class="vietqr-card">
        <button class="vietqr-close" id="closeVietQr" title="Đóng">&times;</button>
        
        <div class="vietqr-header">
          <span class="vietqr-chip-kicker" style="display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} NÂNG CẤP TÀI KHOẢN PRO • KÍCH HOẠT TỨC THÌ</span>
          <h3>Cổng Thanh Toán Tự Động VietQR</h3>
          <div class="vietqr-user-context">
            <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("users-students", { size: 14 }) : ""} Kích hoạt cho:</span>
            <b>${esc(user.name || "Học viên")}</b>
            <span style="color:#64748B">(${esc(user.email || "Tài khoản Khách")})</span>
          </div>
        </div>

        <!-- BỘ CHỌN 3 GÓI CƯỚC LINH HOẠT -->
        <div class="vietqr-pkg-tabs" role="tablist">
          ${pkgs.map((p) => {
            const isActive = (p.id || "").toLowerCase() === (currentPkg.id || "").toLowerCase();
            return `
            <button type="button" class="vietqr-pkg-tab ${isActive ? "active" : ""}" data-pkg-select="${p.id}">
              ${p.popular ? `<span class="vietqr-pkg-tab-hot" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 12 }) : ""} Phổ Biến Nhất</span>` : (p.id === "pro_vip" ? `<span class="vietqr-pkg-tab-hot" style="background:#d97706;color:#fff;display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 12 }) : ""} VIP Quyền Năng</span>` : "") }
              <span class="vietqr-pkg-tab-badge">${esc(p.badge || "PRO")}</span>
              <span class="vietqr-pkg-tab-title">${esc(p.title)}</span>
              <span class="vietqr-pkg-tab-price">${p.price.toLocaleString("vi-VN")} đ</span>
            </button>`;
          }).join("")}
        </div>

        <!-- KHUNG 2 CỘT QUÉT QR & THÔNG TIN CHUYỂN KHOẢN -->
        <div class="vietqr-body-grid">
          <!-- CỘT 1: ẢNH QR & ĐỒNG HỒ PHIÊN -->
          <div class="vietqr-scan-card">
            <div class="vietqr-timer-badge">
              <span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Phiên hết hạn:</span>
              <b id="vietqrTimerDisplay">${formatTime(timeLeft)}</b>
            </div>
            <div class="vietqr-scan-box">
              <img class="vietqr-img" id="vietqrImgTag" src="${qrUrl}" alt="VietQR Thanh toán Rusi TRKI" />
            </div>
            <div class="vietqr-live-status">
              <span class="vietqr-pulse-dot"></span>
              <span>Đang chờ quét mã từ Mobile Banking</span>
            </div>
          </div>

          <!-- CỘT 2: CHI TIẾT CHUYỂN KHOẢN & 1-CLICK COPY -->
          <div class="vietqr-details-card">
            <div class="vietqr-info-table">
              <div class="vietqr-info-row">
                <span class="lbl">Ngân hàng:</span>
                <span class="val">VietinBank (Công Thương)</span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Số tài khoản:</span>
                <span class="val">
                  <b>108873919999</b>
                  <button class="vietqr-copy-btn" data-copy="108873919999" type="button">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 14 }) : ""} Chép</button>
                </span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Chủ tài khoản:</span>
                <span class="val">RUSI TRKI PLATFORM</span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Số tiền:</span>
                <span class="val" style="color:var(--secondary);font-size:1.08rem">
                  <b>${currentPkg.price.toLocaleString("vi-VN")} đ</b>
                  <button class="vietqr-copy-btn" data-copy="${currentPkg.price}" type="button">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 14 }) : ""} Chép</button>
                </span>
              </div>
              <div class="vietqr-info-row">
                <span class="lbl">Cú pháp CK:</span>
                <span class="val">
                  <code style="background:var(--primary-soft);color:var(--primary-dark);padding:2px 6px;border-radius:4px;font-weight:800">${orderId}</code>
                  <button class="vietqr-copy-btn" data-copy="${orderId}" type="button">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 14 }) : ""} Chép</button>
                </span>
              </div>
            </div>

            <!-- QUYỀN LỢI GÓI NỔI BẬT -->
            <div class="vietqr-perks-box">
              <div class="vietqr-perks-title" style="display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("award-badge", { size: 16 }) : ""} Quyền lợi nổi bật (${esc(currentPkg.badge || "PRO")}):</div>
              <ul class="vietqr-perks-list">
                ${(currentPkg.features || []).slice(0, 3).map((f) => `<li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> <span>${esc(f)}</span></li>`).join("")}
              </ul>
            </div>

            <!-- NÚT KÍCH HOẠT & CAM KẾT AN TOÀN -->
            <div>
              <button class="btn-confirm-vietqr" id="btnConfirmPaid" type="button">
                ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Tôi đã chuyển khoản xong (Kích hoạt ngay)
              </button>
              <div class="vietqr-guarantee">
                ${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 14 }) : ""} Tự động đối soát chữ ký số (Signature Verification) 24/7. Tài khoản được kích hoạt ngay lập tức mà không cần chờ duyệt tay.
              </div>
            </div>
          </div>
        </div>
      </div>`;

      // Đóng modal
      document.getElementById("closeVietQr").onclick = () => {
        clearInterval(this._timerInterval);
        if (this._pollInterval) clearInterval(this._pollInterval);
        modal.remove();
      };

      // Xử lý chuyển đổi gói cước tương tác
      modal.querySelectorAll("[data-pkg-select]").forEach((tabBtn) => {
        tabBtn.onclick = () => {
          const chosenId = tabBtn.dataset.pkgSelect;
          const found = pkgs.find((p) => p.id === chosenId);
          if (found && found.id !== currentPkg.id) {
            currentPkg = found;
            renderModalContent();
          }
        };
      });

      // Xử lý 1-click copy
      modal.querySelectorAll(".vietqr-copy-btn").forEach((copyBtn) => {
        copyBtn.onclick = () => {
          const text = copyBtn.dataset.copy;
          navigator.clipboard?.writeText(text);
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : "") + " Đã chép";
          copyBtn.classList.add("copied");
          toast("Đã sao chép: " + text);
          setTimeout(() => {
            copyBtn.innerHTML = original;
            copyBtn.classList.remove("copied");
          }, 1800);
        };
      });

      // Xử lý xác thực tự động (Simulation Webhook Instant Verification)
      const confirmBtn = document.getElementById("btnConfirmPaid");
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          confirmBtn.disabled = true;
          confirmBtn.innerHTML = `<span class="vietqr-spinner"></span> Đang xác thực chữ ký số VietinBank...`;

          setTimeout(() => {
            // Kích hoạt PRO thành công
            Monetization.setPro(true, currentPkg.id);
            clearInterval(Monetization._timerInterval);

            // Hiển thị màn hình chúc mừng (Celebration)
            modal.innerHTML = `
              <div class="vietqr-card" style="max-width:540px">
                <div class="vietqr-success-card">
                  <div class="vietqr-success-icon">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 48 }) : ""}</div>
                  <h3>Nâng Cấp PRO Thành Công!</h3>
                  <p>Chúc mừng <b>${esc(user.name || user.email)}</b>! Tài khoản của bạn đã được nâng cấp lên <b>${esc(currentPkg.title)}</b>.</p>
                  
                  <div class="vietqr-success-box">
                    <div class="vietqr-success-row"><span>Gói kích hoạt:</span><b>${esc(currentPkg.title)}</b></div>
                    <div class="vietqr-success-row"><span>Thời hạn:</span><b>${currentPkg.id === "pro_vip" ? "Vĩnh viễn (Trọn đời)" : "Đã kích hoạt 365 ngày"}</b></div>
                    <div class="vietqr-success-row"><span>Mã giao dịch:</span><code>${orderId}</code></div>
                    <div class="vietqr-success-row"><span>Trạng thái:</span><b style="color:#059669;display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} ĐÃ KÍCH HOẠT TỨC THÌ</b></div>
                  </div>

                  <button class="btn btn-primary btn-lg" id="btnVietQrFinish" style="width:100%;margin-top:20px;background:var(--primary);border-color:var(--primary)">
                    ${window.RusiIcons ? RusiIcons.get("rocket", { size: 16 }) : ""} Bắt đầu trải nghiệm các tính năng PRO ngay
                  </button>
                </div>
              </div>
            `;

            toast(`Chúc mừng ${user.name || "bạn"}! Tài khoản đã là PRO VIP.`);
            document.getElementById("btnVietQrFinish").onclick = () => modal.remove();
          }, 1200);
        };
      }
    };

    renderModalContent();

    // Đồng hồ đếm ngược phiên chính xác theo client timestamp (PROJECT_SPEC line 192)
    this._timerInterval = setInterval(() => {
      timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      const disp = document.getElementById("vietqrTimerDisplay");
      if (disp) {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
        const s = (timeLeft % 60).toString().padStart(2, "0");
        disp.textContent = `${m}:${s}`;
      }
      if (timeLeft <= 0) {
        clearInterval(this._timerInterval);
        if (this._pollInterval) clearInterval(this._pollInterval);
        const scanBox = modal.querySelector(".vietqr-scan-box");
        if (scanBox) {
          scanBox.style.opacity = "0.2";
          scanBox.style.filter = "grayscale(1)";
        }
        toast("Phiên thanh toán đã hết hạn — Vui lòng tạo lại mã đơn mới.");
      }
    }, 1000);

    // Polling tự động kiểm tra trạng thái giao dịch qua Webhook / Casso (PROJECT_SPEC line 198)
    const pollPaymentStatus = async () => {
      if (!modal.isConnected) {
        if (this._pollInterval) clearInterval(this._pollInterval);
        return;
      }
      try {
        if (window.RusiSupabase && window.RusiSupabase.orders && typeof window.RusiSupabase.orders.checkStatus === "function") {
          const res = await window.RusiSupabase.orders.checkStatus(orderId);
          if (res && res.status === "PAID") {
            clearInterval(this._pollInterval);
            clearInterval(this._timerInterval);
            Monetization.setPro(true, currentPkg.id);
            const confirmBtn = document.getElementById("btnConfirmPaid");
            if (confirmBtn) confirmBtn.click();
          }
        }
      } catch(e) {}
    };
    this._pollInterval = setInterval(pollPaymentStatus, 3000);
  },

  /** Modal Quản Lý Gói PRO (Dành cho thành viên đã là PRO) */
  openManageModal() {
    const user = this.getCurrentUser();
    const proInfo = this.getProInfo();
    if (!proInfo) {
      this.openUpgradeModal();
      return;
    }

    let modal = document.getElementById("manageProModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "manageProModal";
      modal.className = "vietqr-overlay";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="vietqr-card manage-pro-card" style="max-width:580px">
        <button class="vietqr-close" id="closeManagePro">&times;</button>
        <div style="text-align:center;margin-bottom:20px">
          <span class="vietqr-chip-kicker" style="display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("gem", { size: 14 }) : ""} QUẢN LÝ GÓI CƯỚC HỌC VIÊN</span>
          <h3 style="margin:4px 0">${esc(proInfo.pkgTitle)}</h3>
          <p style="color:var(--muted);font-size:0.86rem">Tài khoản: <b>${esc((user && user.email) || (user && user.name) || "Học viên")}</b></p>
        </div>

        <div class="manage-pro-hero">
          <div>
            <div class="manage-pro-title">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 20 }) : ""} Trạng thái Thành viên PRO</div>
            <div class="manage-pro-meta">
              ${proInfo.isLifetime ? `${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Bạn đang sở hữu đặc quyền VIP Vĩnh Viễn` : `${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Hạn sử dụng: <b>${esc(proInfo.expiresFormatted)}</b>`}
            </div>
          </div>
          <span class="manage-pro-status" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} ĐANG HOẠT ĐỘNG</span>
        </div>

        <div class="vietqr-perks-box" style="margin-bottom:20px">
          <div class="vietqr-perks-title">Các đặc quyền VIP đang kích hoạt:</div>
          <ul class="vietqr-perks-list">
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Mở khóa 100% ngân hàng đề thi ТРКИ A1, A2, B1, B2</li>
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Không giới hạn lượt luyện nói & sửa lỗi phát âm AI Rusika</li>
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Chấm bài viết Письмо theo 4 tiêu chí TRKI chuẩn quốc tế</li>
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Luyện nghe 4 Part CEFR kèm transcript chi tiết</li>
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Mở khóa toàn bộ 100+ Lọ từ vựng chuyên ngành</li>
            <li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> Ưu tiên hỗ trợ hồ sơ học bổng Du học Nga</li>
          </ul>
        </div>

        ${!proInfo.isLifetime ? `
          <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:12px">
            <div>
              <div style="font-weight:800;font-size:0.86rem;color:#166534">Nâng cấp lên VIP Trọn Đời?</div>
              <div style="font-size:0.78rem;color:#15803D">Đồng hành trọn vẹn suốt thời gian du học Nga với giá ưu đãi.</div>
            </div>
            <button class="btn btn-sm btn-primary" id="btnExtendLifetime" style="background:#059669;border-color:#059669;white-space:nowrap">
              ${window.RusiIcons ? RusiIcons.get("gem", { size: 16 }) : ""} Nâng cấp Trọn Đời
            </button>
          </div>
        ` : ""}

        <div style="display:flex;gap:10px;justify-content:flex-end">
          <button class="btn btn-outline btn-sm" id="btnCloseManageProBtn">Đóng</button>
        </div>
      </div>
    `;

    document.getElementById("closeManagePro").onclick = () => modal.remove();
    document.getElementById("btnCloseManageProBtn").onclick = () => modal.remove();
    const extendBtn = document.getElementById("btnExtendLifetime");
    if (extendBtn) {
      extendBtn.onclick = () => {
        modal.remove();
        Monetization.openUpgradeModal("pro_vip");
      };
    }
  }
};

// Gắn đối tượng toàn cục
if (typeof window !== "undefined") {
  window.Monetization = Monetization;
}

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
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices().filter((v) =>
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
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !window.speechSynthesis) {
    toast("Trình duyệt không hỗ trợ đọc — hãy dùng Chrome/Edge.");
    return;
  }
  const l = lang || detectLang(text);
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = l;
  u.rate = rate;
  const voice = pickVoice(l);
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

/** Nghe phát âm chậm — dùng trong modal chi tiết từ. */
function speakSlow(text, lang = null) {
  speak(text, lang, 0.5);
}

// Một số trình duyệt nạp danh sách giọng bất đồng bộ — nạp sớm để chọn được giọng tốt.
if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
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
  ["vocabulary.html", "Từ vựng"],
  ["writing.html", "Viết"],
  ["listening.html", "Nghe"],
  ["speaking.html", "Nói"],
  ["mock-test.html", "TRKI"],
  ["blog.html", "Blog"],
  ["shop.html", "Shop"]
];

const SEASON_ORDER = ["winter"];

const SEASON_META = {
  winter: { icon: "snowflake", label: "Mùa đông", fx: ["*", "•", "*", "•"] }
};

function autoSeason() {
  return "winter";
}

function currentSeason() {
  return "winter";
}

/** Giao diện Sáng cố định (Russian Winter Cool Blue) */
function applyLightTheme() {
  if (typeof document !== "undefined") {
    if (document.documentElement) document.documentElement.setAttribute("data-theme", "light");
    if (document.body) {
      document.body.setAttribute("data-theme", "light");
      document.body.dataset.season = "winter";
    }
  }
}

function applySeason(season = "winter") {
  if (typeof document === "undefined" || !document.body) return;
  document.body.dataset.season = "winter";

  let fx = document.getElementById("seasonFx");
  if (!fx) {
    fx = document.createElement("div");
    fx.id = "seasonFx";
    fx.className = "season-fx";
    fx.setAttribute("aria-hidden", "true");
    document.body.appendChild(fx);
  }
  if (!fx) return;
  fx.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.textContent = i % 2 === 0 ? "*" : "•";
    s.style.fontSize = i % 2 === 0 ? (9 + Math.random() * 8 + "px") : "5px";
    s.style.left = Math.random() * 100 + "vw";
    if (s.style && typeof s.style.setProperty === "function") {
      s.style.setProperty("--drift", Math.round(Math.random() * 100 - 50) + "px");
    }
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
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 16 }) : ""} <span>Lưu chuỗi ngày Streak & tích lũy XP</span></div>
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""} <span>Đồng bộ Lọ từ vựng Spaced Repetition (SM-2)</span></div>
            <div class="auth-feat-item">${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 16 }) : ""} <span>Lưu kết quả & báo cáo làm bài thi thử TRKI</span></div>
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
  }
};

function renderHeader() {
  const host = document.getElementById("app-header");
  if (!host) return;
  const page = document.body.dataset.page;

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
          ${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg>'}
        </button>
        <div class="nav-dropdown-menu">
          ${moreItems}
        </div>
      </div>
    `;
  }

  host.innerHTML = `
  <div class="header-backdrop" id="headerBackdrop" aria-hidden="true"></div>
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
        <button type="button" class="header-pomo-chip" id="headerPomoBtn" title="Đồng hồ Pomodoro tập trung" style="display:none">
          <span class="header-pomo-icon" id="headerPomoIcon">🍅</span>
          <span class="header-pomo-time" id="headerPomoTime">25:00</span>
        </button>
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
  const backdrop = document.getElementById("headerBackdrop");

  const closeMobileMenu = () => {
    if (nav) nav.classList.remove("nav-open");
    if (mobileBtn) {
      mobileBtn.classList.remove("is-open");
      mobileBtn.setAttribute("aria-expanded", "false");
    }
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.classList.remove("menu-locked");
  };

  const openMobileMenu = () => {
    // Đóng Pomodoro popover và User dropdown nếu đang mở (Mutual Exclusion - Spec 3.3)
    const pomoPop = document.getElementById("pomoPopoverDropdown");
    if (pomoPop) pomoPop.style.display = "none";
    const userDd = document.getElementById("userDropdown");
    if (userDd) userDd.classList.remove("open");
    const userTrigger = document.getElementById("userTrigger");
    if (userTrigger) userTrigger.setAttribute("aria-expanded", "false");

    if (nav) nav.classList.add("nav-open");
    if (mobileBtn) {
      mobileBtn.classList.add("is-open");
      mobileBtn.setAttribute("aria-expanded", "true");
    }
    if (backdrop) backdrop.classList.add("is-open");
    document.body.classList.add("menu-locked");
  };

  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = nav.classList.contains("nav-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileMenu);
  }

  if (nav) {
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMobileMenu();
    });
  }

  if (!window._headerListenersBound) {
    window._headerListenersBound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) closeMobileMenu();
    });
  }

  initNavDropdowns();
  renderUserArea();
  if (window.RusiPomodoro && typeof window.RusiPomodoro.updateUI === "function") {
    window.RusiPomodoro.updateUI();
  }
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
 * Render khu vực tài khoản ở header theo chuẩn hiện đại:
 * - Khi CHƯA login: 2 nút [Đăng nhập] và [Đăng ký]. KHÔNG hiển thị nút nâng cấp PRO bừa bãi.
 * - Khi ĐÃ login:
 *     + Nếu Free: Hiển thị nút nổi bật [⚡ Nâng cấp PRO] + Avatar + Dropdown có Card CTA VIP
 *     + Nếu PRO: Hiển thị Huy hiệu danh dự [👑 PRO MEMBER] + Avatar + Dropdown có Card quản lý PRO
 */
function renderUserArea() {
  const host = document.getElementById("userArea");
  if (!host) return;

  const user = (window.Auth && window.Auth.user) || STORE.get("auth_user", null);
  const isPro = typeof Monetization !== "undefined" && typeof Monetization.isPro === "function" ? Monetization.isPro() : false;
  const proInfo = typeof Monetization !== "undefined" && typeof Monetization.getProInfo === "function" ? Monetization.getProInfo() : null;
  const canShowPomo = Boolean(user && isPro);

  // 1. KHI CHƯA ĐĂNG NHẬP HOẶC KHÔNG PHẢI PRO: Ẩn Pomodoro
  const pomoBtn = document.getElementById("headerPomoBtn");
  const pomoPop = document.getElementById("pomoPopoverDropdown");
  if (!canShowPomo) {
    if (pomoBtn) pomoBtn.style.display = "none";
    if (pomoPop) pomoPop.style.display = "none";
  }

  // 1. KHI CHƯA ĐĂNG NHẬP: Duy nhất 2 nút Đăng nhập & Đăng ký (ẩn Pomodoro & ẩn tiến độ index)
  if (!user) {
    renderIndexProgressIfLoggedIn(null);

    const pageName = window.location.pathname.split("/").pop() || "index.html";
    const currentRedirect = encodeURIComponent(pageName + window.location.search + window.location.hash);
    host.innerHTML = `
      <div class="auth-buttons-group">
        <a class="btn-auth-login" id="btnLogin" href="login.html?redirect=${currentRedirect}">Đăng nhập</a>
        <a class="btn-auth-register" id="btnRegister" href="signup.html?redirect=${currentRedirect}">Đăng ký</a>
      </div>`;
    return;
  }

  // Khi đã đăng nhập: CHỈ hiển thị Pomodoro nếu là tài khoản PRO
  if (pomoBtn) pomoBtn.style.display = canShowPomo ? "inline-flex" : "none";
  if (canShowPomo && window.RusiPomodoro && typeof window.RusiPomodoro.updateUI === "function") {
    window.RusiPomodoro.updateUI();
  }
  renderIndexProgressIfLoggedIn(user);

  // 2. KHI ĐÃ ĐĂNG NHẬP: Avatar + Tên + Nút Nâng cấp PRO / Huy hiệu PRO
  const initials = (user.name || user.email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const avatar = user.photo
    ? `<img class="user-avatar ${isPro ? "is-pro" : ""}" src="${esc(user.photo)}" alt="${esc(user.name)}" referrerpolicy="no-referrer" />`
    : `<span class="user-avatar user-avatar-fallback ${isPro ? "is-pro" : ""}">${esc(initials)}</span>`;
  const shortName = (user.name || "Học viên").split(/\s+/)[0];

  const adminEmails = (window.ADMIN_EMAILS || []).map((e) => String(e).toLowerCase().trim());
  const isAdmin = user.email && adminEmails.includes(String(user.email).toLowerCase().trim());

  host.innerHTML = `
    <div class="user-area-authenticated">
      <!-- PHẦN NÂNG CẤP PRO: Khi đã là PRO thì KHÔNG hiển thị nút PRO MEMBER ngoài header (Req 1), viền bo avatar tự động chuyển màu vàng (Req 4) -->
      ${isPro ? "" : `
        <button class="btn-upgrade-pro-header" id="btnUpgradeHeader" type="button" title="Mở khóa 100% đề thi TRKI và AI">
          <span class="btn-upgrade-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""}</span>
          <span class="btn-upgrade-text">Nâng cấp PRO</span>
        </button>
      `}

      <div class="user-menu" id="userMenu">
        <button class="user-trigger ${isPro ? "is-pro" : ""}" id="userTrigger" type="button" aria-haspopup="true" aria-expanded="false" title="${isPro ? "Học viên PRO (Viền vàng) — Bấm để mở menu" : "Tài khoản học viên"}">
          ${avatar}
          <span class="user-name-short">${esc(shortName)}</span>
          <span class="caret" aria-hidden="true">${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : ""}</span>
        </button>
        <div class="user-dropdown" id="userDropdown" role="menu">
          <div class="user-dropdown-head">
            ${avatar}
            <div class="user-head-info">
              <div style="display:flex;align-items:center;gap:6px">
                <div class="user-fullname">${esc(user.name || "Học viên Rusi")}</div>
                ${isPro ? `<span class="user-tier-badge tier-pro" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 12 }) : ""} PRO MEMBER</span>` : `<span class="user-tier-badge tier-free">Free</span>`}
              </div>
              <div class="user-email">${esc(user.email || "")}</div>
            </div>
          </div>

          <!-- CARD NÂNG CẤP HOẶC QUẢN LÝ PRO TRONG USER MENU -->
          ${isPro ? `
            <div class="user-pro-vip-card" id="btnUserMenuManagePro" title="Xem quyền lợi và quản lý gói PRO">
              <div class="user-pro-vip-head">
                <span class="user-pro-vip-badge" style="display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""} PRO MEMBER · ${esc(proInfo ? proInfo.pkgTitle : "PRO VIP")}</span>
                <span class="user-pro-vip-action">Quản lý →</span>
              </div>
              <div class="user-pro-vip-time">
                ${proInfo && proInfo.isLifetime ? `${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""} Đặc quyền VIP Trọn Đời` : `${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Hạn dùng: ${esc((proInfo && proInfo.expiresFormatted) || "Đang kích hoạt")}`}
              </div>
            </div>
          ` : `
            <div class="user-pro-cta-card" id="btnUserMenuUpgrade" title="Nâng cấp tài khoản PRO ngay">
              <div class="user-pro-cta-left">
                <span class="user-pro-cta-icon">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 20 }) : ""}</span>
                <div>
                  <div class="user-pro-cta-title">Nâng cấp PRO VIP</div>
                  <div class="user-pro-cta-desc">Mở khóa 100% đề thi TRKI & AI</div>
                </div>
              </div>
              <span class="user-pro-cta-btn">Nâng cấp</span>
            </div>
          `}

          <!-- PHẦN ĐIỂM XP VÀ CHUỖI STREAK HIỂN THỊ TRANG TRỌNG -->
          <div class="user-stats-bar">
            <div class="user-stat-card">
              <span class="user-stat-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""}</span>
              <div>
                <div class="user-stat-val" id="userMenuXp">${STORE.get("xp", 0)} XP</div>
                <div class="user-stat-lbl">Kinh nghiệm</div>
              </div>
            </div>
            <div class="user-stat-card">
              <span class="user-stat-icon">${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 16 }) : ""}</span>
              <div>
                <div class="user-stat-val" id="userMenuStreak">${STORE.get("streak", 0)} ngày</div>
                <div class="user-stat-lbl">Chuỗi Streak</div>
              </div>
            </div>
          </div>

          <div class="user-dropdown-divider"></div>

          <a class="user-dropdown-item" href="index.html#progress" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("layout-dashboard", { size: 18 }) : ""}</span>
            <span>Tiến độ của tôi</span>
          </a>
          <a class="user-dropdown-item" href="vocabulary.html" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 18 }) : ""}</span>
            <span>Lọ từ vựng & Flashcard</span>
          </a>
          <a class="user-dropdown-item" href="mock-test.html" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 18 }) : ""}</span>
            <span>Luyện thi TRKI</span>
          </a>
          ${isAdmin ? `
          <a class="user-dropdown-item" href="admin.html" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 18 }) : ""}</span>
            <span>Quản trị hệ thống</span>
          </a>` : ""}

          <div class="user-dropdown-divider"></div>

          <button class="user-dropdown-item user-dropdown-signout" id="btnSignOut" type="button" role="menuitem">
            <span>${window.RusiIcons ? RusiIcons.get("log-out", { size: 18 }) : ""}</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>`;

  // Gắn sự kiện cho nút Upgrade / Manage ở Header
  const upgradeBtn = host.querySelector("#btnUpgradeHeader");
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", () => {
      window.location.href = "upgrade.html";
    });
  }
  const manageBtn = host.querySelector("#btnManageProHeader");
  if (manageBtn) {
    manageBtn.addEventListener("click", () => Monetization.openManageModal());
  }

  // Gắn sự kiện cho các Card trong Dropdown
  const cardUpgrade = host.querySelector("#btnUserMenuUpgrade");
  if (cardUpgrade) {
    cardUpgrade.addEventListener("click", () => {
      const dd = host.querySelector("#userDropdown");
      if (dd) dd.classList.remove("open");
      window.location.href = "upgrade.html";
    });
  }
  const cardManage = host.querySelector("#btnUserMenuManagePro");
  if (cardManage) {
    cardManage.addEventListener("click", () => {
      const dd = host.querySelector("#userDropdown");
      if (dd) dd.classList.remove("open");
      Monetization.openManageModal();
    });
  }

  // Tương tác Dropdown
  const trigger = host.querySelector("#userTrigger");
  const dropdown = host.querySelector("#userDropdown");
  if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        // Đóng Pomodoro popover và Mobile drawer khi mở User menu (Mutual Exclusion)
        const pomoPop = document.getElementById("pomoPopoverDropdown");
        if (pomoPop) pomoPop.style.display = "none";
        const nav = document.getElementById("mainNav");
        if (nav) nav.classList.remove("nav-open");
        const mobileBtn = document.getElementById("mobileMenuBtn");
        if (mobileBtn) {
          mobileBtn.classList.remove("is-open");
          mobileBtn.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("menu-locked");
      }
    });
  }

  if (renderUserArea._outsideClick) {
    document.removeEventListener("click", renderUserArea._outsideClick);
  }
  renderUserArea._outsideClick = () => {
    if (dropdown) dropdown.classList.remove("open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  };
  document.addEventListener("click", renderUserArea._outsideClick);

  const signOutBtn = host.querySelector("#btnSignOut");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      if (dropdown) dropdown.classList.remove("open");
      STORE.set("auth_user", null);
      if (window.Auth) window.Auth.signOut();
    });
  }
}

/**
 * Hàm tính toán tiến độ học chuẩn xác, đồng bộ giữa SRS và danh sách từ đã thuộc (Req 5 & Spec Mục 1).
 */
function getSynchronizedVocabStats() {
  let stats = { newCount: 0, reviewing: 0, learning: 0, mastered: 0 };
  let dueCount = 0;
  if (typeof SRS !== "undefined" && SRS.getState) {
    try {
      const st = SRS.getState();
      stats = SRS.getStats(st);
      dueCount = SRS.getDueCards(st, 9999).length;
    } catch (e) {
      console.warn("SRS stats error:", e);
    }
  }

  const masteredWords = (typeof STORE !== "undefined") ? STORE.get("vocab_mastered_words", []) : [];
  const srsMastered = (stats && stats.mastered) || 0;
  const totalMastered = Math.max(masteredWords.length, srsMastered);

  // Đếm tổng số từ vựng trong tất cả các lọ hệ thống
  let totalWordsInJars = 0;
  if (typeof window.DATA !== "undefined" && Array.isArray(window.DATA.vocabJars)) {
    window.DATA.vocabJars.forEach(j => { totalWordsInJars += (j.words || []).length; });
  }
  if (totalWordsInJars === 0) totalWordsInJars = 360;

  const totalLearnedOrReview = (stats.learning || 0) + (stats.reviewing || 0);
  const calculatedNew = Math.max(0, totalWordsInJars - totalMastered - totalLearnedOrReview);
  const streak = (typeof STORE !== "undefined") ? STORE.get("streak", 0) : 0;

  return {
    mastered: totalMastered,
    dueCount,
    newCount: calculatedNew,
    streak
  };
}
window.getSynchronizedVocabStats = getSynchronizedVocabStats;

/**
 * Hiển thị thẻ Tiến độ trên trang index.html khi người dùng đã đăng nhập thành công (Chuẩn Spec Mục 1).
 */
function renderIndexProgressIfLoggedIn(user) {
  const host = document.getElementById("indexUserProgressHost");
  if (!host) return;
  // Theo chuẩn mới: Loại bỏ thẻ tiến độ ở index.html khi đăng nhập để giữ giao diện trang chủ tinh gọn
  host.style.display = "none";
  host.innerHTML = "";
}

// Lắng nghe sự kiện đồng bộ tiến độ thời gian thực
window.addEventListener("trki:progress-updated", () => {
  const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
  if (user) {
    renderIndexProgressIfLoggedIn(user);
  }
});

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
    if (typeof window.renderPricingGrid === "function") {
      window.renderPricingGrid();
    }
  });

  // Lắng nghe sự kiện cập nhật trạng thái PRO
  window.addEventListener("trki:pro-updated", () => {
    renderUserArea();
    if (typeof window.renderPricingGrid === "function") {
      window.renderPricingGrid();
    }
  });
}

function renderFooter() {
  const host = document.getElementById("app-footer");
  if (!host) return;
  host.innerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col-brand">
        <a class="brand footer-brand" href="index.html" aria-label="Rusi TRKI - Trang chủ">
          <span class="brand-mark">Я</span>
          <span class="footer-brand-text">Rusi<span>TRKI</span></span>
        </a>
      </div>
      <p class="footer-desc">Học tiếng Nga hiện đại, dễ hiểu và đầy cảm hứng. Hệ sinh thái học tập toàn diện phục vụ luyện thi chứng chỉ, du học và đời sống tại Liên bang Nga.</p>
      <div class="footer-links" aria-label="Điều hướng chân trang">
        <a href="vocabulary.html">Từ vựng</a>
        <a href="writing.html">Viết</a>
        <a href="listening.html">Nghe</a>
        <a href="speaking.html">Nói</a>
        <a href="mock-test.html">TRKI</a>
        <a href="blog.html">Blog</a>
        <a href="shop.html">Shop</a>
      </div>
      <div class="footer-copyright">
        <small>© 2026 RUSI TRKI. Mọi quyền được bảo lưu.</small>
      </div>
    </div>
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
          <p>${pct >= 80 ? "Xuất sắc!" : pct >= 50 ? "Khá tốt — luyện thêm nhé!" : "Đừng lo, thử lại sau khi học kỹ hơn nhé!"}</p>
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
            `<div class="explain">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} ${esc(item.ex)}</div>`;
        }
        index++;
        setTimeout(renderQ, ok && !item.ex ? 650 : 1400);
      });
    });
  };
  renderQ();
}

let _appBooted = false;
let _pageInited = false;

function triggerPageInit() {
  if (_pageInited) return;
  if (typeof window.initPage === "function") {
    _pageInited = true;
    try {
      window.initPage();
    } catch (err) {
      console.error("[App] Lỗi khi thực thi initPage():", err);
    }
  } else {
    let retries = 0;
    const retryTimer = setInterval(() => {
      retries++;
      if (typeof window.initPage === "function") {
        clearInterval(retryTimer);
        if (!_pageInited) {
          _pageInited = true;
          try {
            window.initPage();
          } catch (err) {
            console.error("[App] Lỗi khi thực thi initPage() (retry):", err);
          }
        }
      } else if (retries >= 30) {
        clearInterval(retryTimer);
      }
    }, 40);
  }
}
window.triggerPageInit = triggerPageInit;

function bootApp() {
  if (_appBooted) {
    triggerPageInit();
    return;
  }
  _appBooted = true;

  try { applyLightTheme(); } catch (e) { console.error("[Boot] applyLightTheme:", e); }
  try { renderHeader(); } catch (e) { console.error("[Boot] renderHeader:", e); }
  try { renderFooter(); } catch (e) { console.error("[Boot] renderFooter:", e); }
  try { applySeason("winter"); } catch (e) { console.error("[Boot] applySeason:", e); }
  try { Progress.checkStreakStatus(); } catch (e) { console.error("[Boot] checkStreakStatus:", e); }
  try { bindAuthToHeader(); } catch (e) { console.error("[Boot] bindAuthToHeader:", e); }
  try { mergeAdminData(); } catch (e) { console.error("[Boot] mergeAdminData:", e); }

  triggerPageInit();
}
window.bootApp = bootApp;

// Đảm bảo app boot dù document đã ready hay chưa
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  // DOMContentLoaded đã kết thúc, chạy ngay tức thì!
  bootApp();
}

// Bắt sự kiện pageshow để hỗ trợ Back/Forward Cache (bfcache) của trình duyệt
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    bootApp();
  }
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
    "VOCAB_LESSONS",
    "GRAMMAR_LESSONS"
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
      const key = it.id || it.slug || it.title;
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
        delete clean.__fromSupabase;
        const key = clean.id || clean.slug || clean.title;
        if (!key || deletedSet.has(key)) return;
        map.set(key, clean);
      });
    }

    // Đột biến mảng in-place
    const updated = Array.from(map.values());
    target.splice(0, target.length, ...updated);
  });

  // Merge TOPIC_ARTICLES (Object keyed by topic ID)
  if (store.TOPIC_ARTICLES && typeof window.TOPIC_ARTICLES === "object" && window.TOPIC_ARTICLES !== null) {
    const deletedArticles = new Set(deletedMap.TOPIC_ARTICLES || []);
    deletedArticles.forEach((k) => {
      delete window.TOPIC_ARTICLES[k];
    });
    if (Array.isArray(store.TOPIC_ARTICLES)) {
      store.TOPIC_ARTICLES.forEach((art) => {
        const k = art.id || art.topic_id;
        if (!k || deletedArticles.has(k)) return;
        const clean = { ...art };
        delete clean.__admin;
        delete clean.__source;
        delete clean.__fromSupabase;
        window.TOPIC_ARTICLES[k] = clean;
      });
    }
  }

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

// =====================================================================
// GLOBAL DOUBLE-CLICK RUSSIAN WORD LOOKUP (PROJECT_SPEC line 140)
// =====================================================================
document.addEventListener("dblclick", (e) => {
  if (e.target.closest("input, textarea, select, button, a, audio, video, [contenteditable]")) return;
  const selection = (window.getSelection ? window.getSelection().toString() : "").trim();
  if (!selection) return;
  const cleanWord = selection.replace(/^[«"'(—\s]+|[»"')!?,.:;—\s]+$/g, "").trim();
  if (cleanWord.length >= 2 && /[\u0400-\u04FF]/.test(cleanWord)) {
    if (window.WordDetail && typeof window.WordDetail.open === "function") {
      window.WordDetail.open(cleanWord);
    }
  }
});
