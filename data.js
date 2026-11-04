/**
 * data.js — RUSI TRKI Client Bridge
 *
 * Dữ liệu toàn bộ dự án hiện được đồng bộ 100% từ Supabase Cloud Database:
 * (vocab_jars, vocabularies, listening_lessons, speaking_lessons, writing_topics,
 * trki_tests, shop_products, packages, blog_posts, grammar_lessons).
 *
 * Mọi trang web tải dữ liệu trực tiếp qua window.RusiSupabase kết hợp Browser Cache
 * (RusiCache trong RAM + SessionStorage) cho tốc độ chuyển trang tức thì (0ms).
 */

const VOCAB_LESSONS = [];
const MOCK_TEST = { parts: [] };
const BLOG_POSTS = [];
const TRKI_BANK = [];
const VOCAB_JARS = [];
const GRAMMAR_LESSONS = [];
const LISTENING_LESSONS = [];
const SPEAKING_SETS = [];
const WRITING_TASKS = [];
const SHOP_PRODUCTS = [];
const PACKAGES = [];
const TOPIC_ARTICLES = {};

function formatRussianGrammar(rawPos, rawGram, rawGender, rawAspect) {
  const p = (rawPos || "").trim().toLowerCase();
  const g = (rawGram || "").trim().toLowerCase();
  const gen = (rawGender || "").trim().toLowerCase();
  const asp = (rawAspect || "").trim().toLowerCase();

  // 1. Thực từ & Hư từ (POS)
  let pos = "";
  if (/^(сущ|noun|danh từ|cụm danh từ)/i.test(p) || /^(сущ|danh từ)/i.test(g)) {
    pos = "сущ.";
  } else if (/^(гл|verb|động từ)/i.test(p) || /^(гл|động từ)/i.test(g)) {
    pos = "гл.";
  } else if (/^(прил|adj|tính từ)/i.test(p) || /^(прил|tính từ)/i.test(g)) {
    pos = "прил.";
  } else if (/^(нар|adv|нареч|phó từ|trạng từ)/i.test(p) || /^(нар|нареч|trạng từ)/i.test(g)) {
    pos = "нар.";
  } else if (/^(мест|pronoun|đại từ)/i.test(p) || /^(мест|đại từ)/i.test(g)) {
    pos = "мест.";
  } else if (/^(числ|numeral|số từ)/i.test(p) || /^(числ|số từ)/i.test(g)) {
    pos = "числ.";
  } else if (/^(предл|prep|giới từ)/i.test(p) || /^(предл|предлог|giới từ)/i.test(g)) {
    pos = "предл.";
  } else if (/^(союз|conj|liên từ)/i.test(p) || /^(союз|liên từ)/i.test(g)) {
    pos = "союз";
  } else if (/^(част|part|trợ từ|tiểu từ)/i.test(p) || /^(част|частица|trợ từ)/i.test(g)) {
    pos = "част.";
  } else if (/^(межд|interj|thán từ)/i.test(p) || /^(межд|thán từ)/i.test(g)) {
    pos = "межд.";
  } else if (/^(прич|tính động từ)/i.test(p) || /^(прич)/i.test(g)) {
    pos = "прич.";
  } else if (/^(деепр|trạng động từ)/i.test(p) || /^(деепр)/i.test(g)) {
    pos = "деепр.";
  }

  // 2. Chi tiết: Giống & Số hoặc Thể
  const details = [];
  const combined = `${p} ${g} ${gen} ${asp}`;

  if (pos === "сущ." || !pos) {
    if (combined.includes("m/f") || combined.includes("м./ж.") || combined.includes("общ") || combined.includes("cả nam và nữ")) {
      details.push("м./ж.");
    } else if (g === "м." || g === "м" || gen === "м." || gen === "м" || /(?:^|\s)(m|nam|đực)(?:\s|$)/i.test(combined)) {
      details.push("м.");
    } else if (g === "ж." || g === "ж" || gen === "ж." || gen === "ж" || /(?:^|\s)(f|nữ|cái)(?:\s|$)/i.test(combined)) {
      details.push("ж.");
    } else if (g === "с." || g === "с" || g === "ср." || g === "ср" || gen === "с." || gen === "ср." || gen === "ср" || /(?:^|\s)(n|trung)(?:\s|$)/i.test(combined)) {
      details.push("ср.");
    }
    if (g.includes("мн") || gen.includes("мн") || combined.includes("số nhiều")) {
      if (!details.includes("мн.")) details.push("мн.");
    }
    if (combined.includes("одуш") && !combined.includes("неодуш")) {
      details.push("одуш.");
    } else if (combined.includes("неодуш")) {
      details.push("неодуш.");
    }
    if (combined.includes("нескл") || combined.includes("không biến đổi")) {
      details.push("нескл.");
    }
  }

  if (pos === "гл." || !pos) {
    if (g.includes("несов") || combined.includes("нсв") || combined.includes("chưa hoàn thành") || combined.includes("chưa ht")) {
      details.push("нсв");
    } else if (g.includes("сов") || combined.includes("св") || combined.includes("hoàn thành") || combined.includes("ht")) {
      details.push("св");
    }
  }

  if (pos && details.length > 0) {
    return `${pos} ${details.join(" ")}`;
  }
  if (pos) return pos;
  if (details.length > 0) return details.join(" ");
  return rawPos || rawGram || rawGender || "";
}

// GẮN TẤT CẢ DỮ LIỆU LÊN WINDOW ĐỂ ĐỒNG BỘ RUNTIME TOÀN DỰ ÁN
if (typeof window !== "undefined") {
  window.formatRussianGrammar = formatRussianGrammar;
  window.VOCAB_LESSONS = typeof VOCAB_LESSONS !== "undefined" ? VOCAB_LESSONS : [];
  window.GRAMMAR_LESSONS = typeof GRAMMAR_LESSONS !== "undefined" ? GRAMMAR_LESSONS : [];
  window.LISTENING_LESSONS = typeof LISTENING_LESSONS !== "undefined" ? LISTENING_LESSONS : [];
  window.SPEAKING_SETS = typeof SPEAKING_SETS !== "undefined" ? SPEAKING_SETS : [];
  window.WRITING_TASKS = typeof WRITING_TASKS !== "undefined" ? WRITING_TASKS : [];
  window.MOCK_TEST = typeof MOCK_TEST !== "undefined" ? MOCK_TEST : {};
  window.TRKI_BANK = typeof TRKI_BANK !== "undefined" ? TRKI_BANK : [];
  window.VOCAB_JARS = typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : [];
  window.TOPIC_ARTICLES = typeof TOPIC_ARTICLES !== "undefined" ? TOPIC_ARTICLES : {};
  window.SHOP_PRODUCTS = typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : [];
  window.PACKAGES = typeof PACKAGES !== "undefined" ? PACKAGES : [];
  window.BLOG_POSTS = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
  window.DATA = {
    vocabJars: window.VOCAB_JARS,
    listening: window.LISTENING_LESSONS,
    speaking: window.SPEAKING_SETS,
    writing: window.WRITING_TASKS,
    tests: window.TRKI_BANK,
    grammar: window.GRAMMAR_LESSONS,
    shop: window.SHOP_PRODUCTS,
    packages: window.PACKAGES,
    blog: window.BLOG_POSTS
  };
}
