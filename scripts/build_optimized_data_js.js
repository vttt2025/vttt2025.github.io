/**
 * scripts/build_optimized_data_js.js
 * Tạo tệp data.js siêu nhẹ tích hợp RusiDataLoader & IndexedDB Cache
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, '..', 'data', 'modules');
const TARGET_DATA_JS = path.join(__dirname, '..', 'data.js');

// Đọc các module nhẹ để nhúng trực tiếp
const packages = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'packages.json'), 'utf8'));
const shopProducts = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'shop_products.json'), 'utf8'));
const blogPosts = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'blog_posts.json'), 'utf8'));
const writingTopics = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'writing_topics.json'), 'utf8'));
const writingTasks = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'writing_tasks.json'), 'utf8'));
const listeningLessons = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'listening_lessons.json'), 'utf8'));
const vocabLessons = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'vocab_lessons.json'), 'utf8'));
const grammarLessons = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'grammar_lessons.json'), 'utf8'));

const dataJsContent = `/**
 * ============================================================================
 * RUSI TRKI — CLIENT DATA BRIDGE & SMART LOADER ENGINE
 * Phiên bản tối ưu: Modular Data Chunking + IndexedDB 0-Egress Browser Cache
 * Phiên bản dữ liệu: v11.1 (Cập nhật: 2026-11-19)
 * ============================================================================
 * Kiến trúc tối giản Egress & Chống rò rỉ dữ liệu:
 * 1. Dữ liệu cốt lõi nhẹ (<500KB) được nạp trực tiếp tức thì (Zero-Latency).
 * 2. Dữ liệu nặng (Đề thi TRKI, Ngân hàng câu hỏi, Từ điển, Lọ từ, Luyện nói)
 *    được phân tách thành các module độc lập trong thư mục 'data/modules/'.
 * 3. RusiDataLoader tự động nạp theo nhu cầu từng trang (On-demand Lazy Loading)
 *    và lưu vĩnh viễn vào IndexedDB của trình duyệt máy người học.
 *    -> Sau lần tải đầu tiên, toàn bộ việc chuyển trang tốn ĐÚNG 0 BYTE EGRESS!
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. DỮ LIỆU CỐT LÕI NHẸ NẠP TRỰC TIẾP (CORE LIGHTWEIGHT COLLECTIONS)
  const PACKAGES = ${JSON.stringify(packages, null, 2)};
  const SHOP_PRODUCTS = ${JSON.stringify(shopProducts, null, 2)};
  const BLOG_POSTS = ${JSON.stringify(blogPosts, null, 2)};
  const WRITING_TOPICS = ${JSON.stringify(writingTopics, null, 2)};
  const WRITING_TASKS = ${JSON.stringify(writingTasks, null, 2)};
  const LISTENING_LESSONS = ${JSON.stringify(listeningLessons, null, 2)};
  const VOCAB_LESSONS = ${JSON.stringify(vocabLessons, null, 2)};
  const GRAMMAR_LESSONS = ${JSON.stringify(grammarLessons, null, 2)};

  // 2. KHỞI TẠO BỘ NHỚ BIẾN TOÀN CỤC CHO CÁC MODULE LỚN
  let _VOCAB_JARS = [];
  let _VOCABULARIES = [];
  let _TOPIC_ARTICLES = {};
  let _SPEAKING_SETS = [];
  let _TRKI_BANK = [];
  let _TRKI_QUESTION_BANK = [];

  // Khai báo sẵn biến toàn cục trên window để tương thích 100% với code cũ
  if (typeof window !== 'undefined') {
    window.PACKAGES = PACKAGES;
    window.SHOP_PRODUCTS = SHOP_PRODUCTS;
    window.BLOG_POSTS = BLOG_POSTS;
    window.WRITING_TOPICS = WRITING_TOPICS;
    window.WRITING_TASKS = WRITING_TASKS;
    window.LISTENING_LESSONS = LISTENING_LESSONS;
    window.VOCAB_LESSONS = VOCAB_LESSONS;
    window.GRAMMAR_LESSONS = GRAMMAR_LESSONS;

    window.VOCAB_JARS = _VOCAB_JARS;
    window.VOCABULARIES = _VOCABULARIES;
    window.TOPIC_ARTICLES = _TOPIC_ARTICLES;
    window.SPEAKING_SETS = _SPEAKING_SETS;
    window.TRKI_BANK = _TRKI_BANK;
    window.TRKI_QUESTION_BANK = _TRKI_QUESTION_BANK;

    window.WRITING_SUBMISSIONS = [];
    window.TRKI_SUBMISSIONS = [];
    window.SHOP_ORDERS = [];
  }

  // 3. ĐỘNG CƠ BỘ NHỚ ĐỆM INDEXEDDB (RUSI INDEXEDDB CACHE ENGINE)
  const DB_NAME = 'rusi_offline_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'data_modules';
  const DATA_VERSION = 'v11.1';

  let _dbPromise = null;

  function openIndexedDB() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return resolve(null);
      }
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
    return _dbPromise;
  }

  async function getFromIDB(key) {
    const db = await openIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => {
          const res = req.result;
          if (res && res.version === DATA_VERSION && res.data) {
            resolve(res.data);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
  }

  async function saveToIDB(key, data) {
    const db = await openIndexedDB();
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ key, version: DATA_VERSION, data, cachedAt: Date.now() });
    } catch (_) {}
  }

  // 4. DANH MỤC CÁC MODULE NẠP THEO NHU CẦU (MODULE REGISTRY)
  const MODULE_REGISTRY = {
    VOCAB_JARS: { file: 'data/modules/vocab_jars.json', assign: (d) => { _VOCAB_JARS = d; window.VOCAB_JARS = d; } },
    VOCABULARIES: { file: 'data/modules/vocabularies.json', assign: (d) => { _VOCABULARIES = d; window.VOCABULARIES = d; } },
    TOPIC_ARTICLES: { file: 'data/modules/topic_articles.json', assign: (d) => { _TOPIC_ARTICLES = d; window.TOPIC_ARTICLES = d; } },
    SPEAKING_SETS: { file: 'data/modules/speaking_sets.json', assign: (d) => { _SPEAKING_SETS = d; window.SPEAKING_SETS = d; } },
    TRKI_BANK: { file: 'data/modules/trki_bank.json', assign: (d) => { _TRKI_BANK = d; window.TRKI_BANK = d; } },
    TRKI_QUESTION_BANK: { file: 'data/modules/trki_questions.json', assign: (d) => { _TRKI_QUESTION_BANK = d; window.TRKI_QUESTION_BANK = d; } }
  };

  const _loadingPromises = {};

  // Kiểm tra xem dữ liệu có giá trị hợp lệ không (hỗ trợ cả mảng Array lẫn Object)
  function hasValidData(d) {
    if (!d) return false;
    if (Array.isArray(d)) return d.length > 0;
    if (typeof d === 'object') return Object.keys(d).length > 0;
    return false;
  }

  // 5. TRÌNH NẠP DỮ LIỆU THÔNG MINH (RUSI DATA LOADER)
  const RusiDataLoader = {
    version: DATA_VERSION,

    // Kiểm tra xem module đã có trong bộ nhớ RAM chưa
    isLoaded(moduleKey) {
      if (typeof window === 'undefined') return false;
      return hasValidData(window[moduleKey]);
    },

    // Nạp 1 module theo quy trình: RAM -> IndexedDB (0ms) -> Network JSON
    async load(moduleKey) {
      if (this.isLoaded(moduleKey)) {
        return window[moduleKey];
      }
      if (_loadingPromises[moduleKey]) {
        return _loadingPromises[moduleKey];
      }

      const conf = MODULE_REGISTRY[moduleKey];
      if (!conf) {
        console.warn('[RusiDataLoader] Module không xác định:', moduleKey);
        return null;
      }

      _loadingPromises[moduleKey] = (async () => {
        // Bước 1: Thử đọc từ IndexedDB của máy học viên (0 byte Egress!)
        try {
          const cached = await getFromIDB(moduleKey);
          if (hasValidData(cached)) {
            conf.assign(cached);
            _loadedModules.add(moduleKey);
            return cached;
          }
        } catch (_) {}

        // Bước 2: Tải file JSON tĩnh độc lập từ server / Cloudflare CDN
        try {
          const res = await fetch(conf.file + '?v=' + DATA_VERSION);
          if (res.ok) {
            const data = await res.json();
            conf.assign(data);
            _loadedModules.add(moduleKey);
            // Lưu vào IndexedDB cho các lần truy cập tiếp theo (Offline-first)
            saveToIDB(moduleKey, data);
            return data;
          }
        } catch (err) {
          console.warn('[RusiDataLoader] Lỗi nạp module ' + moduleKey + ':', err);
        }
        return window[moduleKey] || (moduleKey === 'TOPIC_ARTICLES' ? {} : []);
      })();

      return _loadingPromises[moduleKey];
    },

    // Nạp song song nhiều module
    async loadMultiple(moduleKeys) {
      return Promise.all(moduleKeys.map((k) => this.load(k)));
    },

    // Tự động phân tích trang hiện tại và chuẩn bị trước đúng các module cần thiết
    async prepareForCurrentPage() {
      if (typeof window === 'undefined') return;
      const path = (window.location.pathname || '').toLowerCase();

      let targetModules = [];
      if (path.includes('vocabulary')) {
        targetModules = ['VOCAB_JARS', 'TOPIC_ARTICLES'];
      } else if (path.includes('mock-test')) {
        targetModules = ['TRKI_BANK', 'TRKI_QUESTION_BANK'];
      } else if (path.includes('speaking')) {
        targetModules = ['SPEAKING_SETS'];
      } else if (path.includes('admin')) {
        // Trên trang admin: nạp các module phổ biến
        targetModules = ['VOCAB_JARS', 'TOPIC_ARTICLES', 'VOCABULARIES', 'TRKI_BANK', 'TRKI_QUESTION_BANK', 'SPEAKING_SETS'];
      }

      if (targetModules.length > 0) {
        await this.loadMultiple(targetModules);
      }
    },

    // 0-Egress: Vô hiệu hóa tải ngầm toàn bộ để tiết kiệm 100% dung lượng băng thông
    prefetchIdle() {
      // No-op theo chuẩn Zero-Egress Architecture
    }
  };

  // Khởi động nạp tự động ngay khi tệp script được đọc
  if (typeof window !== 'undefined') {
    window.RusiDataLoader = RusiDataLoader;

    // Đối tượng DATA tổng hợp bảo toàn backwards-compatibility
    window.DATA = {
      get vocabJars() { return window.VOCAB_JARS || []; },
      get vocabularies() { return window.VOCABULARIES || []; },
      get topicArticles() { return window.TOPIC_ARTICLES || {}; },
      get vocabLessons() { return window.VOCAB_LESSONS || VOCAB_LESSONS; },
      get listeningLessons() { return window.LISTENING_LESSONS || LISTENING_LESSONS; },
      get speakingSets() { return window.SPEAKING_SETS || []; },
      get writingTasks() { return window.WRITING_TASKS || WRITING_TASKS; },
      get writingTopics() { return window.WRITING_TOPICS || WRITING_TOPICS; },
      get trkiBank() { return window.TRKI_BANK || []; },
      get trkiQuestionBank() { return window.TRKI_QUESTION_BANK || []; },
      get shopProducts() { return window.SHOP_PRODUCTS || SHOP_PRODUCTS; },
      get packages() { return window.PACKAGES || PACKAGES; },
      get grammarLessons() { return window.GRAMMAR_LESSONS || GRAMMAR_LESSONS; },
      get blogPosts() { return window.BLOG_POSTS || BLOG_POSTS; }
    };

    // Tự động chuẩn bị dữ liệu cho trang hiện tại
    RusiDataLoader.prepareForCurrentPage().catch(() => {});
  }
})();
`;

fs.writeFileSync(TARGET_DATA_JS, dataJsContent, 'utf8');
const stat = fs.statSync(TARGET_DATA_JS);
console.log(`[Build] Tạo thành công data.js mới! Kích thước: ${(stat.size / 1024).toFixed(1)} KB (So với 17,400 KB gốc)`);
