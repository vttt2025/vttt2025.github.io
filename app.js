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
  const xp = document.getElementById("chipXp");
  const st = document.getElementById("chipStreak");
  if (xp) xp.textContent = "⚡ " + STORE.get("xp", 0) + " XP";
  if (st) st.textContent = "🔥 " + STORE.get("streak", 0) + " ngày";
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

function speak(text, lang = "ru-RU", rate = 0.9) {
  if (!("speechSynthesis" in window)) {
    toast("Trình duyệt không hỗ trợ đọc — hãy dùng Chrome/Edge.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  const ruVoice = speechSynthesis
    .getVoices()
    .find((v) => v.lang && v.lang.toLowerCase().startsWith("ru"));
  if (ruVoice) u.voice = ruVoice;
  speechSynthesis.speak(u);
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

const NAV_LINKS = [
  ["vocabulary.html", "Từ vựng"],
  ["grammar.html", "Ngữ pháp"],
  ["listening.html", "Nghe"],
  ["speaking.html", "Nói"],
  ["writing.html", "Viết"],
  ["mock-test.html", "Đề thi TRKI"],
  ["blog.html", "Blog"]
];

function renderHeader() {
  const host = document.getElementById("app-header");
  if (!host) return;
  const page = document.body.dataset.page;
  const links = NAV_LINKS.map(
    ([href, label]) =>
      `<a href="${href}" class="${page && href.startsWith(page.replace(".html", "")) ? "active" : ""}">${label}</a>`
  ).join("");
  host.innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="index.html"><span class="logo-mark">ТР</span> Đậu <em>TRKI</em></a>
      <nav class="main-nav" id="mainNav">${links}</nav>
      <div class="header-actions">
        <span class="xp-chip" id="chipXp">⚡ 0 XP</span>
        <span class="streak-chip" id="chipStreak">🔥 0 ngày</span>
        <a class="btn btn-outline btn-sm" href="#" onclick="toast('Demo — đăng nhập sẽ làm ở backend');return false;">Đăng nhập</a>
        <a class="btn btn-primary btn-sm" href="mock-test.html">Luyện ngay</a>
        <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;
  const burger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");
  burger.addEventListener("click", () => nav.classList.toggle("open"));
  updateHeaderChips();
}

function renderFooter() {
  const host = document.getElementById("app-footer");
  if (!host) return;
  host.innerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="index.html"><span class="logo-mark">ТР</span> Đậu <em>TRKI</em></a>
        <p>Nền tảng luyện tiếng Nga & chuẩn bị thi chứng chỉ ТРКИ: từ vựng qua video, ngữ pháp, nghe, nói, viết — tất cả trong một.</p>
      </div>
      <div class="footer-col">
        <h4>Sản phẩm</h4>
        <a href="vocabulary.html">Từ vựng</a>
        <a href="grammar.html">Ngữ pháp</a>
        <a href="listening.html">Luyện nghe</a>
        <a href="mock-test.html">Đề thi thử</a>
      </div>
      <div class="footer-col">
        <h4>Kỹ năng</h4>
        <a href="speaking.html">Luyện nói AI</a>
        <a href="writing.html">Luyện viết</a>
        <a href="listening.html">Luyện nghe</a>
      </div>
      <div class="footer-col">
        <h4>Tài nguyên</h4>
        <a href="blog.html">Blog</a>
        <a href="vocabulary.html">Series video</a>
        <a href="mock-test.html">Đề ТРКИ</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>Dự án học tập — ТРКИ (TORFL) là kỳ thi nhà nước của Cộng hòa Liên bang Nga. Trang này không liên kết với tổ chức thi chính thức.</p>
    </div>
  </footer>`;
}

function quizEngine(container, questions, { onFinish } = {}) {
  container.innerHTML = "";
  let correct = 0;
  let index = 0;

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
  renderHeader();
  renderFooter();
  Progress.touchStreak();
  if (typeof initPage === "function") initPage();
});
