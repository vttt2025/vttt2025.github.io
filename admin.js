/**
 * admin.js — Payload CMS Web Studio Engine for RUSI TRKI Platform
 * 
 * Architecture based on Payload CMS (payloadcms.com) v3 Open Source:
 * - Reactive State Engine (State.currentDraft with two-way binding)
 * - Complete Array Builder Suite (TRKI Parts, Vocab Words, Listening Dialogs, Speaking Sets)
 * - Hash Router (Dashboard, Collection List, Document 2-Column Editor, Globals, API Explorer, Supabase Sync)
 * - Payload Table with Search, Level/PRO Filters, Bulk Operations, Pagination
 * - Payload 3.0 Live Preview Split Drawer with context URL injection
 * - Interactive REST API & Schema Explorer with live JSON viewer & cURL generator
 * - Supabase Cloud PostgreSQL Sync & In-place Runtime Mutation (window.mergeAdminData)
 * - Full Mobile/Tablet Responsiveness & "More..." Kebab Overflow Pattern
 */

(function () {
  "use strict";

  const STORE_KEY = "trki_admin_data";
  const THEME_KEY = "payload_theme";
  const DEV_MODE_KEY = "trki_dev_mode";

  // Trình sinh và kiểm tra mã UUID v4 chuẩn RFC 4122 cho toàn bộ hệ thống Admin CMS & Supabase
  function generateUUID() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      try {
        return crypto.randomUUID();
      } catch (_) {}
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function isValidUUID(str) {
    if (!str || typeof str !== "string") return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str.trim());
  }

  function buildTopicArticleMarkdown(art, key) {
    if (!art || typeof art !== "object") return "";
    if (art.content_md && typeof art.content_md === "string" && art.content_md.trim()) {
      return art.content_md.trim();
    }
    if (art.content && typeof art.content === "string" && art.content.trim()) {
      return art.content.trim();
    }
    if (art.content_markdown && typeof art.content_markdown === "string" && art.content_markdown.trim()) {
      return art.content_markdown.trim();
    }

    const sections = [];
    sections.push(`# Bài học: ${art.title || art.name || key}`);

    if (art.intro || art.desc) {
      sections.push(`## I. Bối cảnh & Tình huống giao tiếp\n\n${(art.intro || art.desc).trim()}`);
    }

    const cTip = art.culturalTip || art.cultural_tip;
    if (cTip) {
      sections.push(`> [!NOTE]\n> **Mẹo văn hóa thực tế:** ${cTip.trim()}`);
    }

    const aChains = Array.isArray(art.actionChains) ? art.actionChains : (Array.isArray(art.action_chains) ? art.action_chains : []);
    if (aChains.length) {
      sections.push(`## II. Chuỗi hành động đời sống & Cụm từ ngữ cảnh`);
      aChains.forEach((group, gIdx) => {
        const gTitle = group.subTopic || (`Chuỗi hành động ${gIdx + 1}`);
        let block = `### ${gTitle}\n\n`;
        if (group.items && group.items.length) {
          block += `| Đối tượng / Từ vựng | Hành động | Ngữ cảnh | Ví dụ thực tế |\n| --- | --- | --- | --- |\n`;
          group.items.forEach(it => {
            const target = [it.target, it.target_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
            const action = [it.action, it.action_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
            const place = [it.place, it.place_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
            const ex = [it.ex, it.ex_vi].filter(Boolean).join(" — ").replace(/\n+/g, " ");
            block += `| ${target || "—"} | ${action || "—"} | ${place || "—"} | ${ex || "—"} |\n`;
          });
        }
        sections.push(block.trim());
      });
    }

    const dialogues = Array.isArray(art.dialogues) ? art.dialogues : [];
    if (dialogues.length) {
      let diaBlock = `## III. Hội thoại mẫu điển hình\n\n`;
      dialogues.forEach(d => {
        const who = d.speaker || d.who || "Người nói";
        const role = d.role ? ` *(${d.role})*` : "";
        diaBlock += `- **${who}**${role}: ${d.ru} *(“${d.vi}”)*\n`;
      });
      sections.push(diaBlock.trim());
    }

    const gNotes = Array.isArray(art.grammarNotes) ? art.grammarNotes : (Array.isArray(art.grammar_notes) ? art.grammar_notes : []);
    if (gNotes.length) {
      let gBlock = `## IV. Điểm ngữ pháp trọng tâm & Bẫy kỳ thi\n\n`;
      gNotes.forEach((g, idx) => {
        gBlock += `### ${g.title || `Quy tắc ${idx + 1}`}\n\n${g.content || ""}\n\n`;
      });
      sections.push(gBlock.trim());
    }

    return sections.join("\n\n");
  }

  // =========================================================================
  // 1. SCHEMAS REGISTRY (10 COLLECTIONS & GLOBALS MATCHING DATA.JS)
  // =========================================================================

  const SAMPLE_TRKI_PARTS = [
    {
      id: "gram",
      name: "Часть 1. Лексика и грамматика",
      vi: "Phần 1. Từ vựng và ngữ pháp",
      questions: [
        {
          q: "Мы познакомились с новым ___. (преподаватель)",
          options: ["преподавателем", "преподавателя", "преподавателю", "преподаватель"],
          a: 0,
          ex: "с + cách 5 (danh từ đực mềm -ель -> -елем)."
        },
        {
          q: "Антон звонит своей ___. (сестра)",
          options: ["сестре", "сестру", "сестрой", "сестра"],
          a: 0,
          ex: "звонить + cách 3 (сестра -> сестре)."
        }
      ]
    },
    {
      id: "reading",
      name: "Часть 2. Чтение",
      vi: "Phần 2. Đọc hiểu",
      text: {
        ru: "Москва — столица Российской Федерации. Это крупнейший культурный и научный центр страны. В Москве учится много иностранных студентов.",
        vi: "Moskva là thủ đô của Liên bang Nga. Đây là trung tâm văn hóa và khoa học lớn nhất cả nước. Rất nhiều sinh viên quốc tế học tập tại Moskva."
      },
      questions: [
        {
          q: "Какой город является столицей России?",
          options: ["Москва", "Санкт-Петербург", "Казань", "Новосибирск"],
          a: 0,
          ex: "'Москва — столица Российской Федерации.'"
        }
      ]
    },
    {
      id: "listening",
      name: "Часть 3. Аудирование",
      vi: "Phần 3. Nghe hiểu",
      lines: [
        { who: "Анна", ru: "Привет! Куда ты идёшь?", vi: "Chào cậu! Cậu đang đi đâu thế?" },
        { who: "Максим", ru: "Я иду в библиотеку готовиться к экзамену.", vi: "Mình đang đến thư viện ôn thi." }
      ],
      questions: [
        {
          q: "Куда идёт Максим?",
          options: ["В библиотеку", "В общежитие", "В столовую", "В кино"],
          a: 0,
          ex: "'Я иду в библиотеку...'"
        }
      ]
    }
  ];

  const COLLECTIONS = {
    // --- 1. HỌC TẬP & KHẢO THÍ (Core Learning & Tests) ---
    TRKI_BANK: {
      slug: "TRKI_BANK",
      group: "study",
      label: "Đề thi TRKI",
      singular: "Đề thi",
      icon: "graduation-cap",
      webUrl: "mock-test.html",
      source: () => (window.TRKI_BANK || []),
      desc: "Ngân hàng đề thi chuẩn TRKI A1, A2, B1, B2 với 5 phần thi: Từ vựng & Ngữ pháp, Đọc hiểu, Nghe hiểu (Audio Supabase), Viết tự luận, Nói theo tình huống.",
      createDefault: () => ({
        id: "trki_de_" + Date.now().toString().slice(-4),
        title: "Đề thi TRKI Mới",
        level: "A1",
        levelName: "Sơ cấp A1 (ТЭУ)",
        sub_test_type: "full",
        category: "full",
        categoryName: "Đề thi toàn diện (5 phần)",
        durationMin: 45,
        passPercent: 66,
        is_pro_only: false,
        is_published: true,
        parts: JSON.parse(JSON.stringify(SAMPLE_TRKI_PARTS))
      }),
      fields: [
        { key: "id", label: "Mã đề thi (ID duy nhất / Code)", type: "text", required: true, help: "Ví dụ: trki_zlat_a1_elem, trki_zlat_a2_t1, trki_custom_01" },
        { key: "title", label: "Tiêu đề đề thi", type: "text", required: true },
        {
          key: "level",
          label: "Cấp độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (ТЭУ) — Sơ cấp" },
            { v: "A2", l: "A2 (ТБУ) — Cơ bản" },
            { v: "B1", l: "B1 (ТРКИ-1) — Trung cấp 1" },
            { v: "B2", l: "B2 (ТРКИ-2) — Trung cấp 2" },
            { v: "C1", l: "C1 (ТРКИ-3) — Cao cấp" },
            { v: "C2", l: "C2 (ТРКИ-4) — Thành thạo" }
          ],
          defaultValue: "A1"
        },
        { key: "levelName", label: "Tên cấp độ hiển thị", type: "text", defaultValue: "Sơ cấp A1 (ТЭУ)" },
        {
          key: "sub_test_type",
          label: "Phân hệ thi (Sub-test)",
          type: "select",
          options: [
            { v: "full", l: "Đề thi toàn diện (Full TRKI 3-5 phần)" },
            { v: "lexis_grammar", l: "Từ vựng & Ngữ pháp (Лексика и Грамматика)" },
            { v: "reading", l: "Đọc hiểu (Чтение)" },
            { v: "listening", l: "Nghe hiểu (Аудирование)" },
            { v: "writing", l: "Viết (Письмо)" },
            { v: "speaking", l: "Nói (Говорение)" }
          ],
          defaultValue: "full"
        },
        { key: "categoryName", label: "Tên phân loại đề", type: "text", defaultValue: "Đề thi toàn diện (3 phần)" },
        { key: "durationMin", label: "Thời gian làm bài (phút)", type: "number", defaultValue: 45 },
        { key: "passPercent", label: "Điểm chuẩn đạt (%)", type: "number", defaultValue: 66 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ],
          defaultValue: "false"
        },
        {
          key: "is_published",
          label: "Trạng thái hiển thị",
          type: "select",
          options: [
            { v: "true", l: "Công khai (Published)" },
            { v: "false", l: "Lưu nháp (Draft)" }
          ],
          defaultValue: "true"
        }
      ]
    },

    TRKI_QUESTION_BANK: {
      slug: "TRKI_QUESTION_BANK",
      group: "study",
      label: "Ngân hàng 1870+ Câu hỏi TRKI",
      singular: "Câu hỏi TRKI",
      icon: "help-circle",
      webUrl: "mock-test.html",
      source: () => (window.TRKI_QUESTION_BANK || []),
      desc: "Ngân hàng 1870+ câu hỏi trắc nghiệm TRKI các cấp độ A1, A2, B1, B2 theo từng mã đề Zlatoust và chuyên đề ngữ pháp/đọc hiểu/nghe hiểu.",
      createDefault: () => ({
        id: generateUUID(),
        code: "TRKI_Q_" + Date.now().toString().slice(-4),
        test_code: "trki_zlat_a1_elem",
        level: "A1",
        sub_test: "lexis_grammar",
        part_number: 1,
        question_type: "multiple_choice",
        order_index: 1,
        prompt: "Анна читает ___ (книга).",
        options: ["книгу", "книги", "книге"],
        correct_index: 0,
        correct_answer: "книгу",
        explanation: "Động từ читать đi với Cách 4 (Винительный падеж) chỉ đối tượng trực tiếp: читает книгу.",
        topic: "Cách 4 đối tượng trực tiếp",
        difficulty: 2,
        points: 1.0,
        is_published: true,
        is_pro_only: false
      }),
      fields: [
        { key: "id", label: "Mã UUID câu hỏi", type: "text", required: true, help: "UUID chuẩn RFC 4122" },
        { key: "code", label: "Mã định danh câu hỏi (Code)", type: "text", required: true, help: "Ví dụ: A1_ELEM_Q001, B1_TEST7_Q053" },
        {
          key: "test_code",
          label: "Thuộc Đề thi TRKI (Test Code - Bảng trki_tests)",
          type: "select",
          dynamicOptions: "TRKI_BANK",
          help: "Chọn đề thi cha trực thuộc trong ngân hàng đề thi TRKI",
          options: [
            { v: "trki_zlat_a1_elem", l: "A1 Elem — 100 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t1", l: "A2 Test 1 — 75 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t2", l: "A2 Test 2 — 70 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t3", l: "A2 Test 3 — 160 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t4", l: "A2 Test 4 — 80 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t5", l: "A2 Test 5 — 100 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t6", l: "A2 Test 6 — 100 câu (Zlatoust)" },
            { v: "trki_zlat_a2_t7", l: "A2 Test 7 — 100 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t1", l: "B1 Test 1 — 100 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t2", l: "B1 Test 2 — 100 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t3", l: "B1 Test 3 — 75 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t4", l: "B1 Test 4 — 85 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t5", l: "B1 Test 5 — 60 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t6", l: "B1 Test 6 — 80 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t7", l: "B1 Test 7 — 55 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t8", l: "B1 Test 8 — 90 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t9", l: "B1 Test 9 — 70 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t10", l: "B1 Test 10 — 110 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t11", l: "B1 Test 11 — 130 câu (Zlatoust)" },
            { v: "trki_zlat_b1_t12", l: "B1 Test 12 — 130 câu (Zlatoust)" }
          ],
          defaultValue: "trki_zlat_a1_elem"
        },
        {
          key: "level",
          label: "Cấp độ CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 — Sơ cấp" },
            { v: "A2", l: "A2 — Cơ bản" },
            { v: "B1", l: "B1 — Trung cấp 1" },
            { v: "B2", l: "B2 — Trung cấp 2" }
          ],
          defaultValue: "A1"
        },
        {
          key: "sub_test",
          label: "Phân hệ bài thi",
          type: "select",
          options: [
            { v: "lexis_grammar", l: "Từ vựng & Ngữ pháp (Лексика и Грамматика)" },
            { v: "reading", l: "Đọc hiểu (Чтение)" },
            { v: "listening", l: "Nghe hiểu (Аудирование)" },
            { v: "writing", l: "Viết (Письмо)" },
            { v: "speaking", l: "Nói (Говорение)" }
          ],
          defaultValue: "lexis_grammar"
        },
        { key: "order_index", label: "Thứ tự câu hỏi trong đề (Số thứ tự)", type: "number", defaultValue: 1 },
        { key: "prompt", label: "Nội dung câu hỏi / Câu khuyết", type: "textarea", rows: 3, required: true, placeholder: "Ví dụ: Вы умеете читать ... ?" },
        { key: "options", label: "Các phương án lựa chọn (mỗi dòng 1 phương án)", type: "list-lines", required: true, placeholder: "русский язык\nпо-русски\nрусский" },
        {
          key: "correct_index",
          label: "Vị trí đáp án đúng (Bắt đầu từ 0)",
          type: "select",
          options: [
            { v: 0, l: "Phương án 1 (Dòng 1)" },
            { v: 1, l: "Phương án 2 (Dòng 2)" },
            { v: 2, l: "Phương án 3 (Dòng 3)" },
            { v: 3, l: "Phương án 4 (Dòng 4)" }
          ],
          defaultValue: 0
        },
        { key: "correct_answer", label: "Từ/câu đáp án đúng", type: "text", placeholder: "Ví dụ: по-русски" },
        { key: "explanation", label: "Giải thích đáp án & Căn cứ ngữ pháp", type: "textarea", rows: 3, placeholder: "Ví dụ: Động từ читать đi với trạng từ chỉ ngôn ngữ по-русски." },
        { key: "topic", label: "Chuyên điểm ngữ pháp / Chủ đề", type: "text", placeholder: "Ví dụ: Đại từ quan hệ, Biến cách Cách 2, Thể động từ..." },
        {
          key: "grammar_case",
          label: "Cách ngữ pháp liên quan",
          type: "select",
          options: [
            { v: "", l: "— Không áp dụng —" },
            { v: "C1", l: "Cách 1 (Danh cách — Именительный)" },
            { v: "C2", l: "Cách 2 (Sinh cách — Родительный)" },
            { v: "C3", l: "Cách 3 (Dữ cách — Дательный)" },
            { v: "C4", l: "Cách 4 (Đối cách — Винительный)" },
            { v: "C5", l: "Cách 5 (Tạo cách — Творительный)" },
            { v: "C6", l: "Cách 6 (Giới cách — Предложный)" }
          ],
          defaultValue: ""
        },
        {
          key: "difficulty",
          label: "Độ khó câu hỏi (1 - 5 sao)",
          type: "select",
          options: [
            { v: 1, l: "⭐ Cực kỳ dễ (Cơ bản nhận biết)" },
            { v: 2, l: "⭐⭐ Dễ (Hiểu & điền trực tiếp)" },
            { v: 3, l: "⭐⭐⭐ Trung bình (Tiêu chuẩn đề thi)" },
            { v: 4, l: "⭐⭐⭐⭐ Khá (Bẫy ngữ pháp, biến cách)" },
            { v: 5, l: "⭐⭐⭐⭐⭐ Khó (Ngoại lệ, văn phong bản xứ)" }
          ],
          defaultValue: 3
        },
        { key: "passage", label: "Đoạn văn đọc hiểu (Nếu câu hỏi thuộc bài đọc)", type: "textarea", rows: 4 },
        { key: "audio_url", label: "URL File âm thanh (Nếu câu hỏi thuộc bài nghe)", type: "text", placeholder: "https://...supabase.co/storage/v1/object/public/trki-audio/..." },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free)" },
            { v: "true", l: "Khóa VIP PRO" }
          ],
          defaultValue: "false"
        },
        {
          key: "is_published",
          label: "Trạng thái xuất bản",
          type: "select",
          options: [
            { v: "true", l: "Công khai (Published)" },
            { v: "false", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "true"
        }
      ]
    },

    VOCABULARIES: {
      slug: "VOCABULARIES",
      group: "study",
      label: "Kho 5000+ Từ vựng",
      singular: "Từ vựng",
      icon: "book-open",
      webUrl: "vocabulary.html",
      source: () => {
        if (Array.isArray(window.VOCABULARIES) && window.VOCABULARIES.length > 0) return window.VOCABULARIES;
        if (Array.isArray(window.VOCABULARIES_DATA) && window.VOCABULARIES_DATA.length > 0) return window.VOCABULARIES_DATA;
        // Trích xuất tự động từ window.VOCAB_JARS làm nguồn dữ liệu dự phòng an toàn
        const map = new Map();
        (window.VOCAB_JARS || []).forEach((j) => {
          (j.words || []).forEach((w) => {
            if (w && (w.ru || w.word_with_stress)) {
              const key = w.id || w.word_with_stress || w.ru;
              if (!map.has(key)) {
                map.set(key, {
                  id: w.id || generateUUID(),
                  word_with_stress: w.word_with_stress || w.stress || w.ru,
                  word_normalized: w.word_normalized || w.ru || "",
                  ru: w.ru || w.word_with_stress,
                  meaning_vi: w.meaning_vi || w.vi || "",
                  vi: w.vi || w.meaning_vi || "",
                  pos: w.pos || w.type || "сущ.",
                  level: w.level || j.level || "A1",
                  gender: w.gender || "",
                  aspect: w.aspect || "",
                  structures: Array.isArray(w.structures) ? w.structures : [],
                  examples: Array.isArray(w.examples) ? w.examples : (w.ex ? [{ ru: w.ex, vi: w.ex_vi || "" }] : []),
                  synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
                  antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
                  notes: w.notes || w.note || "",
                  audio_url: w.audio_url || w.audio || "",
                  publication_status: "published"
                });
              }
            }
          });
        });
        const words = Array.from(map.values());
        if (typeof window !== "undefined" && words.length > 0) window.VOCABULARIES = words;
        return words;
      },
      desc: "Kho từ vựng tiếng Nga toàn diện có trọng âm, từ loại, phiên âm IPA, giải nghĩa và bảng chia từ.",
      createDefault: () => ({
        id: generateUUID(),
        word_with_stress: "студе́нт",
        word_normalized: "студент",
        pos: "сущ.",
        meaning_vi: "sinh viên nam",
        meaning_ru: "учащийся вуза",
        level: "A1",
        gender: "м.",
        transcription: "stʊˈdʲent",
        notes: "Danh từ đực, biến đổi đuôi phụ âm cứng.",
        audio_url: "",
        examples: [
          { ru: "Я студе́нт.", vi: "Tôi là sinh viên." }
        ],
        structures: [],
        synonyms: [],
        antonyms: [],
        publication_status: "published"
      }),
      fields: [
        { key: "id", label: "Mã từ vựng / UUID", type: "text", required: true, help: "UUID hoặc mã định danh duy nhất (tự động sinh theo chuẩn RFC 4122)" },
        { key: "word_with_stress", label: "Từ tiếng Nga (Có trọng âm)", type: "text", required: true, help: "Ví dụ: студе́нт, кни́га, изуча́ть" },
        { key: "meaning_vi", label: "Nghĩa tiếng Việt", type: "text", required: true },
        {
          key: "jar_id",
          label: "Thuộc Lọ từ vựng (Bảng liên kết jar_items)",
          type: "select",
          dynamicOptions: "VOCAB_JARS",
          help: "Chọn lọ từ vựng nếu muốn gán từ này vào Lọ ôn tập tương ứng"
        },
        {
          key: "pos",
          label: "Từ loại (Part of Speech)",
          type: "select",
          options: [
            { v: "сущ.", l: "Danh từ (существительное — сущ.)" },
            { v: "гл.", l: "Động từ (глагол — гл.)" },
            { v: "прил.", l: "Tính từ (прилагательное — прил.)" },
            { v: "нар.", l: "Phó từ (наречие — нар.)" },
            { v: "предл.", l: "Giới từ (предлог — предл.)" },
            { v: "союз", l: "Liên từ (союз)" },
            { v: "мест.", l: "Đại từ (местоимение — мест.)" },
            { v: "част.", l: "Trợ từ (частица — част.)" },
            { v: "межд.", l: "Thán từ (междометие — межд.)" },
            { v: "noun", l: "Danh từ (noun)" },
            { v: "verb", l: "Động từ (verb)" },
            { v: "adj", l: "Tính từ (adj)" },
            { v: "adv", l: "Phó từ (adv)" },
            { v: "prep", l: "Giới từ (prep)" },
            { v: "conj", l: "Liên từ (conj)" },
            { v: "pronoun", l: "Đại từ (pronoun)" }
          ],
          defaultValue: "сущ."
        },
        {
          key: "level",
          label: "Trình độ CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" },
            { v: "C1", l: "C1 (Cao cấp)" },
            { v: "C2", l: "C2 (Thành thạo)" }
          ],
          defaultValue: "A1"
        },
        {
          key: "gender",
          label: "Giống (Dành cho danh từ)",
          type: "select",
          options: [
            { v: "", l: "Không áp dụng" },
            { v: "м.", l: "Giống đực (мужской род — м. / он)" },
            { v: "ж.", l: "Giống cái (женский род — ж. / она)" },
            { v: "ср.", l: "Giống trung (средний род — ср. / оно)" },
            { v: "m", l: "Giống đực (m)" },
            { v: "f", l: "Giống cái (f)" },
            { v: "n", l: "Giống trung (n)" }
          ]
        },
        {
          key: "aspect",
          label: "Thể (Dành cho động từ)",
          type: "select",
          options: [
            { v: "", l: "Không áp dụng" },
            { v: "НСВ", l: "Chưa hoàn thành thể (НСВ)" },
            { v: "СВ", l: "Hoàn thành thể (СВ)" },
            { v: "impf", l: "Chưa hoàn thành thể (impf / НСВ)" },
            { v: "pf", l: "Hoàn thành thể (pf / СВ)" }
          ]
        },
        { key: "transcription", label: "Phiên âm quốc tế IPA", type: "text", placeholder: "stʊˈdʲent" },
        { key: "meaning_ru", label: "Giải nghĩa bằng tiếng Nga", type: "text" },
        { key: "audio_url", label: "URL Audio phát âm chuẩn", type: "text", placeholder: "https://..." },
        { key: "notes", label: "Ghi chú ngữ pháp & cách dùng", type: "textarea", rows: 2 },
        {
          key: "publication_status",
          label: "Trạng thái",
          type: "select",
          options: [
            { v: "published", l: "Đã xuất bản (Công khai)" },
            { v: "draft", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    VOCAB_JARS: {
      slug: "VOCAB_JARS",
      group: "study",
      label: "Lọ từ vựng",
      singular: "Lọ từ",
      icon: "archive-jar",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_JARS || []),
      desc: "Kho lọ từ vựng theo chuỗi hành động và ngữ cảnh sống còn tại Nga, tích hợp thuật toán lặp lại ngắt quãng SM-2.",
      createDefault: () => {
        const jarCode = "jar_" + Date.now().toString().slice(-4);
        return {
          id: jarCode,
          code: jarCode,
          uuid: generateUUID(),
          name: "Lọ từ vựng mới",
          level: "A1",
          levelName: "Sơ cấp A1",
          color: "#102a4c",
          desc: "Từ vựng sinh hoạt và giao tiếp sống còn.",
          icon: "archive-jar",
          is_pro_only: false,
          publication_status: "published",
          words: [
            { id: generateUUID(), ru: "сло́во", vi: "từ ngữ", note: "сущ. ср. (оно)", ex: "Русское слово." },
            { id: generateUUID(), ru: "кни́га", vi: "quyển sách", note: "сущ. ж. (она)", ex: "Я читаю интересную книгу." }
          ]
        };
      },
      fields: [
        { key: "id", label: "Mã lọ (Code ID duy nhất)", type: "text", required: true, help: "Ví dụ: jar_auchan, jar_chemodan" },
        { key: "name", label: "Tên lọ từ vựng", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" },
            { v: "C1", l: "C1 (Cao cấp)" },
            { v: "C2", l: "C2 (Thành thạo)" }
          ],
          defaultValue: "A1"
        },
        { key: "levelName", label: "Tên hiển thị cấp độ", type: "text", defaultValue: "Sơ cấp A1" },
        { key: "color", label: "Mã màu chủ đề (Hex)", type: "text", defaultValue: "#102a4c" },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "archive-jar" },
        { key: "desc", label: "Mô tả ngữ cảnh sử dụng & mục tiêu", type: "textarea", rows: 3 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free)" },
            { v: "true", l: "Chỉ dành cho PRO" }
          ],
          defaultValue: "false"
        },
        {
          key: "publication_status",
          label: "Trạng thái",
          type: "select",
          options: [
            { v: "published", l: "Đã xuất bản (Công khai)" },
            { v: "draft", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    TOPIC_ARTICLES: {
      slug: "TOPIC_ARTICLES",
      group: "study",
      label: "Bài học chủ đề (Article)",
      singular: "Bài học chủ đề",
      icon: "book-open-blog",
      webUrl: "vocabulary.html",
      desc: "Nội dung bài học chuyên sâu theo chủ đề được biên soạn bằng Markdown (.md) chuẩn Supabase.",
      source: () => {
        const raw = window.TOPIC_ARTICLES || {};
        return Object.keys(raw).map((k) => {
          const item = raw[k] || {};
          const mdContent = buildTopicArticleMarkdown(item, k);
          return {
            id: k,
            title: item.title || item.name || ("Bài học: " + k),
            level: item.level || "A1",
            intro: item.intro || item.desc || "",
            content: mdContent,
            content_md: mdContent,
            content_markdown: mdContent,
            audioUrl: item.audioUrl || item.audio_url || "",
            culturalTip: item.cultural_tip || item.culturalTip || "",
            dialogues: Array.isArray(item.dialogues) ? item.dialogues : [],
            grammarNotes: Array.isArray(item.grammarNotes) ? item.grammarNotes : (Array.isArray(item.grammar_notes) ? item.grammar_notes : []),
            actionChains: Array.isArray(item.actionChains) ? item.actionChains : (Array.isArray(item.action_chains) ? item.action_chains : [])
          };
        });
      },
      createDefault: () => ({
        id: "chu_de_moi_" + Date.now().toString().slice(-4),
        title: "Bài học chủ đề mới",
        level: "A1",
        intro: "Giới thiệu bối cảnh thực tế đời sống sinh viên và giao tiếp tại Nga...",
        audioUrl: "",
        content_md: `# Bài học: Giao tiếp & Đời sống thực tế tại Nga

## I. Bối cảnh & Tình huống giao tiếp
Chủ đề này giúp bạn làm quen và tự tin xử lý các tình huống giao tiếp thường nhật khi sinh sống, học tập và du học tại Liên bang Nga.

> [!NOTE]
> **Mẹo văn hóa thực tế:** Hãy chú ý trọng âm của từ vựng tiếng Nga. Trọng âm chuẩn xác giúp người bản xứ hiểu ngay ý bạn muốn diễn đạt.

## II. Chuỗi hành động đời sống & Từ vựng theo ngữ cảnh

### Tình huống 1: Sinh hoạt thường nhật

| Đối tượng / Từ vựng | Hành động | Ngữ cảnh | Ví dụ thực tế |
| --- | --- | --- | --- |
| **студе́нт** (sinh viên) | изуча́ть (học tập) | в университе́те (ở trường ĐH) | Студе́нт у́чится в университе́те. |
| **кни́га** (quyển sách) | чита́ть (đọc) | в библиоте́ке (ở thư viện) | Я чита́ю интере́сную кни́гу. |

## III. Hội thoại mẫu điển hình
- **Анна**: Приве́т! Как твои́ дела́? *(Chào bạn! Bạn khỏe không?)*
- **Макси́м**: Всё отли́чно, спаси́бо! А у тебя́? *(Mọi thứ đều tuyệt, cảm ơn bạn! Còn bạn thì sao?)*
- **Анна**: Я иду́ в библиоте́ку гото́виться к экза́мену по ру́сскому языку́. *(Mình đang đến thư viện ôn thi tiếng Nga.)*

## IV. Điểm ngữ pháp trọng tâm & Bẫy kỳ thi
### 1. Cấu trúc ngữ pháp cơ bản
- Mẫu câu: \`Chủ ngữ + Động từ + Tân ngữ\`
- Ví dụ: \`Мы изучаем русский язык.\` (Chúng tôi học tiếng Nga.)

> [!TIP]
> Sử dụng các cụm từ trong ngoặc kép «...» để ghi nhớ các cụm thành ngữ hoặc quán ngữ phổ biến!

> [!WARNING]
> Cẩn thận phân biệt giữa động từ chưa hoàn thành thể (НСВ) và hoàn thành thể (СВ).
`
      }),
      fields: [
        {
          key: "id",
          label: "Mã chủ đề (khớp với ID Lọ từ vựng / Topic ID)",
          type: "text",
          required: true,
          help: "Ví dụ: bo_phan_co_the, con_vat, do_an_uong, jar_auchan, phuong_tien_giao_thong..."
        },
        { key: "title", label: "Tiêu đề bài học chủ đề", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ TRKI",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" },
            { v: "C1", l: "C1 (Cao cấp)" },
            { v: "C2", l: "C2 (Thành thạo)" }
          ],
          defaultValue: "A1"
        },
        { key: "intro", label: "Đoạn văn tóm tắt bối cảnh (Intro)", type: "textarea", rows: 2, help: "Tùy chọn. Nếu để trống, hệ thống sẽ tự động lấy đoạn mở đầu của bài viết." },
        { key: "audioUrl", label: "URL File âm thanh (tùy chọn)", type: "text", placeholder: "https://..." },
        {
          key: "content_md",
          label: "Nội dung bài học chuyên sâu (.md Markdown)",
          type: "markdown",
          required: true,
          help: "Soạn thảo toàn bộ nội dung bài học bằng Markdown: Tiêu đề (#, ##), chuỗi hành động, bảng từ vựng 4 cột, hội thoại, mẹo ghi nhớ (> [!TIP], > [!NOTE], > [!WARNING])."
        }
      ]
    },

    GRAMMAR_LESSONS: {
      slug: "GRAMMAR_LESSONS",
      group: "study",
      label: "Chuyên đề Ngữ pháp (6 Cách)",
      singular: "Bài giảng Ngữ pháp",
      icon: "book-open-blog",
      webUrl: "index.html",
      source: () => (window.GRAMMAR_LESSONS || []),
      desc: "Kho 27 chuyên đề ngữ pháp tiếng Nga chuyên sâu chuẩn CEFR A1-B2: Hệ thống 6 Cách, Động từ chuyển động, Cặp thể động từ (НСВ/СВ), Câu phức và Bảng biến cách.",
      createDefault: () => ({
        id: "lesson_grammar_" + Date.now().toString().slice(-4),
        code: "bai_" + Date.now().toString().slice(-4),
        title: "BÀI HỌC NGỮ PHÁP MỚI",
        level: "A1",
        category: "Hệ thống 6 Cách",
        topic: "Hệ thống 6 Cách",
        summary: "Tóm tắt mục tiêu bài học và kiến thức trọng tâm cần nắm vững.",
        content_md: "# BÀI HỌC: TIÊU ĐỀ BÀI HỌC\n\n## 1. Mục tiêu bài học\n- Nắm vững quy tắc biến cách...\n\n## 2. Bảng quy tắc chia đuôi\n\n| Giống | Số ít | Số nhiều |\n|---|---|---|\n| Giống đực | ... | ... |\n\n## 3. Bài tập củng cố\n",
        order_index: 1,
        publication_status: "published",
        access_entitlement: "free"
      }),
      fields: [
        { key: "id", label: "Mã định danh duy nhất (ID)", type: "text", required: true, help: "Ví dụ: lesson_grammar_01, lesson_grammar_09" },
        { key: "code", label: "Mã bài học (Code)", type: "text", required: true, help: "Ví dụ: bai_01, bai_09" },
        { key: "title", label: "Tiêu đề bài học tiếng Nga & Việt", type: "text", required: true, placeholder: "BÀI 09: CÁCH 2 (РОДИТЕЛЬНЫЙ ПАДЕЖ) – SINH CÁCH" },
        {
          key: "level",
          label: "Cấp độ ngữ pháp chuẩn",
          type: "select",
          options: [
            { v: "A1", l: "A1 — Sơ cấp (Bảng chữ cái, Cách 1, Cách 6 cơ bản)" },
            { v: "A2", l: "A2 — Cơ bản (6 Cách số ít, Động từ chuyển động không tiền tố)" },
            { v: "B1", l: "B1 — Trung cấp (6 Cách số nhiều, Thể động từ НСВ/СВ, Tiền tố chuyển động)" },
            { v: "B2", l: "B2 — Nâng cao (Phân từ, Phụ gia phân từ, Câu phức)" }
          ],
          defaultValue: "A1"
        },
        {
          key: "category",
          label: "Nhóm chuyên đề ngữ pháp",
          type: "select",
          options: [
            { v: "Hệ thống 6 Cách", l: "Hệ thống 6 Cách (Падежи русского языка)" },
            { v: "Động từ chuyển động", l: "Động từ chuyển động (Глаголы движения)" },
            { v: "Thể động từ", l: "Thể động từ (Виды глаголов НСВ / СВ)" },
            { v: "Cú pháp & Câu phức", l: "Cú pháp & Câu phức (Сложное предложение)" },
            { v: "Phân từ & Trạng từ", l: "Phân từ & Trạng từ (Причастия и деепричастия)" },
            { v: "Ngữ pháp tổng quan", l: "Ngữ pháp tổng quan & Phát âm" }
          ],
          defaultValue: "Hệ thống 6 Cách"
        },
        { key: "summary", label: "Tóm tắt ngắn / Mục tiêu bài học", type: "textarea", rows: 3, placeholder: "Tóm tắt các chức năng ngữ pháp và quy tắc cốt lõi..." },
        { key: "content_md", label: "Nội dung bài học chuyên sâu (Markdown WYSIWYG)", type: "markdown", required: true, help: "Biên tập trực quan với tiêu đề, bảng, Mermaid flowcharts, code blocks và bài tập." },
        { key: "order_index", label: "Thứ tự sắp xếp bài giảng", type: "number", defaultValue: 1 },
        {
          key: "access_entitlement",
          label: "Quyền truy cập bài giảng",
          type: "select",
          options: [
            { v: "free", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "pro", l: "Chuyên sâu PRO (Chỉ học viên VIP)" }
          ],
          defaultValue: "free"
        },
        {
          key: "publication_status",
          label: "Trạng thái xuất bản",
          type: "select",
          options: [
            { v: "published", l: "Đã xuất bản (Published)" },
            { v: "draft", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    LISTENING_TOPICS: {
      slug: "LISTENING_TOPICS",
      group: "study",
      label: "Chủ đề Luyện nghe",
      singular: "Chủ đề nghe",
      icon: "headphones",
      webUrl: "listening.html",
      source: () => (window.LISTENING_TOPICS || []),
      desc: "Chủ đề luyện nghe hiểu & chép chính tả phân theo cấp độ A1–B2 và ngữ cảnh thực tế tại Nga.",
      createDefault: () => {
        const topCode = "topic-lis-" + Date.now().toString().slice(-4);
        return {
          id: topCode,
          code: topCode,
          uuid: generateUUID(),
          title: "Chủ đề nghe mới",
          level: "A1",
          category: "airport",
          description: "Mô tả ngữ cảnh giao tiếp và tình huống đối thoại thực tế",
          icon: "headphones",
          sort_order: 10,
          is_pro_only: false
        };
      },
      fields: [
        { key: "code", label: "Mã chủ đề (Code duy nhất)", type: "text", required: true, help: "Ví dụ: topic-lis-a1-airport, topic-lis-a1-shop" },
        { key: "title", label: "Tên chủ đề nghe", type: "text", required: true, placeholder: "Ví dụ: Ở sân bay (В аэропорту)" },
        {
          key: "level",
          label: "Trình độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp — Элементарный)" },
            { v: "A2", l: "A2 (Cơ bản — Базовый)" },
            { v: "B1", l: "B1 (Trung cấp 1 — I Сертификационный)" },
            { v: "B2", l: "B2 (Trung cấp 2 — II Сертификационный)" }
          ],
          defaultValue: "A1"
        },
        { key: "category", label: "Phân loại danh mục", type: "text", defaultValue: "airport", help: "airport, shop, dorm, cafe, campus, metro, interview..." },
        { key: "description", label: "Mô tả ngữ cảnh giao tiếp", type: "textarea", rows: 3 },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "headphones" },
        { key: "sort_order", label: "Thứ tự sắp xếp", type: "number", defaultValue: 10 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ],
          defaultValue: "false"
        }
      ]
    },

    LISTENING_LESSONS: {
      slug: "LISTENING_LESSONS",
      group: "study",
      label: "Bài nghe & chép chính tả",
      singular: "Bài nghe",
      icon: "headphones",
      webUrl: "listening.html",
      source: () => (window.LISTENING_LESSONS || []),
      desc: "Bài luyện nghe hiểu và nghe chép chính tả thống nhất kèm audio Supabase Storage (listening-audio) và trắc nghiệm.",
      createDefault: () => {
        const lisCode = "lis_" + Date.now().toString().slice(-4);
        return {
          id: lisCode,
          code: lisCode,
          lesson_uuid: generateUUID(),
          topic_id: "",
          title: "Bài nghe mới",
          vi: "Tiêu đề tiếng Việt",
          level: "A1",
          levelName: "Sơ cấp A1",
          category: "comprehension",
          categoryName: "Nghe hiểu",
          audio_url: "",
          duration_seconds: 30,
          sort_order: 1,
          is_pro_only: false,
          lines: [
            { who: "Người 1", ru: "Здравствуйте!", vi: "Xin chào!", start_sec: 0, end_sec: 2.5, words: [] }
          ],
          questions: [
            { q: "Câu hỏi trắc nghiệm?", options: ["Đáp án 1", "Đáp án 2", "Đáp án 3"], a: 0, ex: "Giải thích..." }
          ]
        };
      },
      fields: [
        { key: "code", label: "Mã bài nghe (Code duy nhất)", type: "text", required: true, help: "Ví dụ: lis-airport, lis-shop, lis-cafe" },
        {
          key: "topic_id",
          label: "Thuộc Chủ đề nghe (Listening Topic)",
          type: "select",
          dynamicOptions: "LISTENING_TOPICS",
          help: "Chọn chủ đề cha trong danh sách Chủ đề luyện nghe"
        },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text", required: true, placeholder: "Ví dụ: В аэропорту" },
        { key: "vi", label: "Tiêu đề tiếng Việt & Ngữ cảnh", type: "text", required: true, placeholder: "Ví dụ: Ở sân bay làm thủ tục" },
        {
          key: "level",
          label: "Trình độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp — Элементарный)" },
            { v: "A2", l: "A2 (Cơ bản — Базовый)" },
            { v: "B1", l: "B1 (Trung cấp 1 — I Сертификационный)" },
            { v: "B2", l: "B2 (Trung cấp 2 — II Сертификационный)" }
          ],
          defaultValue: "A1"
        },
        {
          key: "category",
          label: "Phân loại chế độ",
          type: "select",
          options: [
            { v: "comprehension", l: "Nghe hiểu toàn diện (Comprehension)" },
            { v: "dictation", l: "Nghe chép chính tả (Dictation)" },
            { v: "dialogue", l: "Hội thoại đối đáp tình huống ngắn" }
          ],
          defaultValue: "comprehension"
        },
        {
          key: "audio_url",
          label: "URL File Audio MP3 (Storage bucket 'listening-audio')",
          type: "text",
          placeholder: "https://...supabase.co/storage/v1/object/public/listening-audio/...",
          help: "Audio MP3 lưu trữ trên Supabase Storage bucket listening-audio"
        },
        { key: "youtube_id", label: "Mã YouTube Video ID (tùy chọn)", type: "text", placeholder: "Ví dụ: 5KOKztPa1yI", help: "Dành cho bài nghe có video minh họa trên YouTube" },
        { key: "duration_seconds", label: "Thời lượng Audio (giây)", type: "number", defaultValue: 30 },
        { key: "sort_order", label: "Thứ tự sắp xếp", type: "number", defaultValue: 1 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ],
          defaultValue: "false"
        }
      ]
    },

    SPEAKING_SETS: {
      slug: "SPEAKING_SETS",
      group: "study",
      label: "Luyện nói Shadowing",
      singular: "Bộ câu nói",
      icon: "mic-speaking",
      webUrl: "speaking.html",
      source: () => (window.SPEAKING_SETS || []),
      desc: "Kho mẫu câu luyện nói phản xạ, ngữ điệu và phát âm tiếng Nga có AI chấm điểm âm vị.",
      createDefault: () => {
        const spCode = "speaking_" + Date.now().toString(36).slice(-6);
        return {
          id: spCode,
          code: spCode,
          uuid: generateUUID(),
          title: "Bài luyện nói Shadowing mới",
          level: "A1",
          levelName: "Sơ cấp A1",
          category: "shadowing_youtube",
          categoryName: "Shadowing qua phim hoạt hình",
          sentence_ru: "Привет! Как тебя зовут?",
          phonemeTarget: "Luyện ngữ điệu kể chuyện, trọng âm từ và ngắt nhịp tự nhiên",
          youtubeId: "",
          video_url: "",
          icon: "youtube",
          is_pro_only: false,
          sort_order: 10,
          items: [
            {
              id: 1,
              order: 1,
              who: "Người nói 1",
              ru: "Привет! Как тебя зовут?",
              text_ru: "Привет! Как тебя зовут?",
              text_stressed: "Приве́т! Как тебя́ зову́т?",
              vi: "Xin chào! Bạn tên là gì?",
              translation_vi: "Xin chào! Bạn tên là gì?",
              start: 0,
              end: 4.5,
              startSec: 0,
              endSec: 4.5
            }
          ]
        };
      },
      fields: [
        { key: "id", label: "Mã bài luyện nói (Code / Slug)", type: "text", required: true, help: "Ví dụ: YT_SPEAKING_5KOKztPa1yI, sp_basic_01" },
        { key: "title", label: "Tên bài luyện nói", type: "text", required: true, placeholder: "Ví dụ: Цып-Цып: Знакомство — Làm quen" },
        {
          key: "level",
          label: "Trình độ TRKI",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp — Элементарный)" },
            { v: "A2", l: "A2 (Cơ bản — Базовый)" },
            { v: "B1", l: "B1 (Trung cấp 1 — I Сертификационный)" },
            { v: "B2", l: "B2 (Trung cấp 2 — II Сертификационный)" },
            { v: "C1", l: "C1 (Cao cấp — III Сертификационный)" }
          ],
          defaultValue: "A1"
        },
        { key: "levelName", label: "Tên hiển thị trình độ", type: "text", defaultValue: "Sơ cấp A1" },
        {
          key: "category",
          label: "Mã phân loại Shadowing",
          type: "select",
          options: [
            { v: "shadowing_youtube", l: "Shadowing qua phim / YouTube (Khuyên dùng)" },
            { v: "cartoon", l: "Phim hoạt hình thiếu nhi Nga (Цып-Цып, v.v.)" },
            { v: "dialogue", l: "Hội thoại đối đáp tình huống thực tế" },
            { v: "basic", l: "Mẫu câu giao tiếp cơ bản hàng ngày" },
            { v: "pronunciation", l: "Luyện phát âm & cặp âm đối lập (Cứng/Mềm)" }
          ],
          defaultValue: "shadowing_youtube"
        },
        { key: "categoryName", label: "Tên nhóm giao tiếp", type: "text", defaultValue: "Shadowing qua phim hoạt hình" },
        { key: "youtubeId", label: "YouTube Video ID (cho Shadowing)", type: "text", placeholder: "Ví dụ: 5KOKztPa1yI (11 ký tự sau watch?v=)" },
        { key: "video_url", label: "URL Video mẫu trực tiếp / Embed (tùy chọn)", type: "text", placeholder: "https://www.youtube.com/embed/..." },
        { key: "sentence_ru", label: "Câu thoại tiêu biểu (trích đoạn hiển thị trên thẻ)", type: "text", placeholder: "Ví dụ: Привет! Как тебя зовут?" },
        { key: "phonemeTarget", label: "Mục tiêu âm vị / Trọng âm cần chú ý", type: "text", defaultValue: "Ngữ điệu kể chuyện, trọng âm từ và ngắt nhịp tự nhiên" },
        { key: "sort_order", label: "Thứ tự sắp xếp (Sort Order)", type: "number", defaultValue: 10 },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "youtube" },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí" },
            { v: "true", l: "Chỉ dành cho PRO" }
          ],
          defaultValue: "false"
        }
      ]
    },

    WRITING_TASKS: {
      slug: "WRITING_TASKS",
      group: "study",
      label: "Bài luyện viết (Tả tranh & Dịch)",
      singular: "Bài luyện viết",
      icon: "pen-tool",
      webUrl: "writing.html",
      source: () => (window.WRITING_TASKS || []),
      desc: "Bài luyện tập con thuộc Chủ đề viết (kèm ảnh Storage bucket writing-images, bài mẫu chuẩn TRKI, gợi ý và AI Prompt).",
      createDefault: () => {
        const taskCode = "wtk_" + Date.now().toString().slice(-4);
        return {
          id: taskCode,
          code: taskCode,
          taskId: generateUUID(),
          topic_id: "",
          title: "Bài luyện viết mới",
          level: "A1",
          level_name: "Sơ cấp A1",
          task_type: "picture_desc",
          category: "daily",
          image_url: "",
          prompt: "Посмотрите на фотографию и подробно опишите, что вы видите.",
          model_answer: "Вот семья. Утром они завтракают на кухне...",
          min_words: 30,
          tips: ["Sử dụng cách 1 cho chủ ngữ", "Dùng cách 6 chỉ nơi chốn: в/на + giới cách"],
          ai_prompt: "Hãy đóng vai giám khảo TRKI chấm điểm bài viết tiếng Nga của học viên theo 4 tiêu chí TRKI...",
          suggested_words: ["семья", "завтракать", "кухня", "утром"],
          sort_order: 1,
          is_pro_only: false,
          publication_status: "published"
        };
      },
      fields: [
        { key: "code", label: "Mã bài viết (Code duy nhất)", type: "text", required: true, help: "Ví dụ: pic_a1_01, trans_a1_01" },
        {
          key: "topic_id",
          label: "Thuộc Chủ đề cha (Writing Topic)",
          type: "select",
          dynamicOptions: "WRITING_TOPICS",
          help: "Chọn chủ đề cha trong danh sách Chủ đề Luyện viết & Dịch"
        },
        { key: "title", label: "Tên bài luyện viết", type: "text", required: true, placeholder: "Ví dụ: Bài 1: Bữa sáng của gia đình" },
        {
          key: "level",
          label: "Trình độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp — Элементарный)" },
            { v: "A2", l: "A2 (Cơ bản — Базовый)" },
            { v: "B1", l: "B1 (Trung cấp 1 — I Сертификационный)" },
            { v: "B2", l: "B2 (Trung cấp 2 — II Сертификационный)" }
          ],
          defaultValue: "A1"
        },
        {
          key: "task_type",
          label: "Loại bài tập viết",
          type: "select",
          options: [
            { v: "picture_desc", l: "Tả tranh ảnh (Письмо по картинке)" },
            { v: "translation", l: "Luyện dịch câu / đoạn (Перевод по темам)" }
          ],
          defaultValue: "picture_desc"
        },
        {
          key: "image_url",
          label: "URL Ảnh đề bài (Storage bucket 'writing-images')",
          type: "text",
          placeholder: "https://...supabase.co/storage/v1/object/public/writing-images/...",
          help: "Ảnh lưu từ Supabase Storage bucket writing-images (dành cho bài Tả tranh)"
        },
        { key: "prompt", label: "Đề bài (tiếng Nga cho tả tranh / tiếng Việt cho luyện dịch)", type: "textarea", required: true, rows: 3 },
        { key: "model_answer", label: "Bài viết mẫu chuẩn TRKI (Model Essay)", type: "textarea", rows: 4 },
        { key: "min_words", label: "Số từ tối thiểu (min_words)", type: "number", defaultValue: 30 },
        { key: "tips", label: "Gợi ý làm bài & định hướng (tips — mỗi dòng 1 gợi ý)", type: "list-lines", rows: 3 },
        { key: "suggested_words", label: "Từ vựng nên dùng (suggested_words — mỗi dòng 1 từ)", type: "list-lines", rows: 3 },
        { key: "ai_prompt", label: "Prompt tiêu chuẩn để AI chấm điểm (Rubric)", type: "textarea", rows: 4, help: "Hướng dẫn rubric TRKI cho trợ lý AI Rusika chấm điểm 4 tiêu chí" },
        { key: "sort_order", label: "Thứ tự sắp xếp", type: "number", defaultValue: 1 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ],
          defaultValue: "false"
        },
        {
          key: "publication_status",
          label: "Trạng thái",
          type: "select",
          options: [
            { v: "published", l: "Đã xuất bản (Công khai)" },
            { v: "draft", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    WRITING_TOPICS: {
      slug: "WRITING_TOPICS",
      group: "study",
      label: "Chủ đề Luyện viết & Dịch",
      singular: "Chủ đề viết",
      icon: "file-text",
      webUrl: "writing.html",
      source: () => (window.WRITING_TOPICS || []),
      desc: "Chủ đề luyện viết cấp độ A1–B2 chia theo 2 chế độ: Tả tranh (picture) và Luyện dịch (translation).",
      createDefault: () => {
        const topicCode = "topic_pic_" + Date.now().toString().slice(-4);
        return {
          id: topicCode,
          code: topicCode,
          uuid: generateUUID(),
          title: "Chủ đề viết mới",
          level: "A1",
          level_name: "Sơ cấp A1",
          type: "picture",
          category: "daily",
          category_name: "Sinh hoạt thường nhật",
          description: "Mô tả bối cảnh và định hướng luyện tập cho học viên",
          icon: "timer-clock",
          sort_order: 10,
          is_pro_only: false
        };
      },
      fields: [
        { key: "code", label: "Mã chủ đề (Code ID duy nhất)", type: "text", required: true, help: "Ví dụ: topic_pic_daily_a1, topic_trans_comm_a1" },
        { key: "title", label: "Tên chủ đề bài viết", type: "text", required: true, placeholder: "Ví dụ: Sinh hoạt thường nhật & Gia đình" },
        {
          key: "level",
          label: "Trình độ chuẩn CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp — Элементарный)" },
            { v: "A2", l: "A2 (Cơ bản — Базовый)" },
            { v: "B1", l: "B1 (Trung cấp 1 — I Сертификационный)" },
            { v: "B2", l: "B2 (Trung cấp 2 — II Сертификационный)" }
          ],
          defaultValue: "A1"
        },
        {
          key: "type",
          label: "Chế độ luyện viết",
          type: "select",
          options: [
            { v: "picture", l: "Tả tranh (Письмо по картинке)" },
            { v: "translation", l: "Luyện dịch (Перевод по темам)" }
          ],
          defaultValue: "picture"
        },
        { key: "category", label: "Mã phân loại danh mục", type: "text", defaultValue: "daily", help: "daily, dorm, travel, shopping, communication..." },
        { key: "category_name", label: "Tên phân loại hiển thị", type: "text", defaultValue: "Sinh hoạt thường nhật" },
        { key: "description", label: "Mô tả ngữ cảnh chủ đề", type: "textarea", rows: 3 },
        { key: "icon", label: "Mã Icon Lucide", type: "text", defaultValue: "timer-clock" },
        { key: "sort_order", label: "Thứ tự sắp xếp", type: "number", defaultValue: 10 },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free cho mọi học viên)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho tài khoản PRO)" }
          ],
          defaultValue: "false"
        }
      ]
    },

    // --- 2. KINH DOANH & DỊCH VỤ (Commerce & Editorial) ---
    SHOP_PRODUCTS: {
      slug: "SHOP_PRODUCTS",
      group: "commerce",
      label: "Sản phẩm Shop Nga",
      singular: "Sản phẩm",
      icon: "shopping-bag-shop",
      webUrl: "shop.html",
      source: () => (window.SHOP_PRODUCTS || []),
      desc: "Sản phẩm bánh kẹo Alenka, mỹ phẩm Siberia và các gói dịch vụ Du học Nga.",
      createDefault: () => {
        const prodCode = "prod_" + Date.now().toString().slice(-4);
        return {
          id: prodCode,
          code: prodCode,
          uuid: generateUUID(),
          category: "banh_keo",
          categoryName: "Bánh kẹo Nga",
          product_type: "physical",
          title: "Bánh kẹo Nga nhập khẩu mới",
          desc: "Sản phẩm chính hãng nội địa Nga thơm ngon, hạn sử dụng mới nhất.",
          price: 55000,
          priceOld: 70000,
          stock: 100,
          image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
          badge: "Mới",
          status: "published"
        };
      },
      fields: [
        { key: "id", label: "Mã SKU / Code sản phẩm", type: "text", required: true, help: "Ví dụ: prod_alenka, prod_tea, prod_book_a1" },
        { key: "title", label: "Tên sản phẩm / dịch vụ", type: "text", required: true },
        {
          key: "category",
          label: "Ngành hàng",
          type: "select",
          options: [
            { v: "banh_keo", l: "Bánh kẹo & Thực phẩm Nga" },
            { v: "my_pham", l: "Mỹ phẩm Siberia" },
            { v: "luu_niem", l: "Quà lưu niệm & Búp bê Matryoshka" },
            { v: "sach_giao_trinh", l: "Sách & Giáo trình tiếng Nga" },
            { v: "dich_vu_du_hoc", l: "Dịch vụ & Hồ sơ Du học Nga" }
          ],
          defaultValue: "banh_keo"
        },
        { key: "categoryName", label: "Tên ngành hàng hiển thị", type: "text", defaultValue: "Bánh kẹo Nga" },
        {
          key: "product_type",
          label: "Loại sản phẩm",
          type: "select",
          options: [
            { v: "physical", l: "Hàng vật lý (Giao tận nhà)" },
            { v: "digital", l: "Tài liệu số / Ebook tải ngay" },
            { v: "service", l: "Dịch vụ tư vấn / Thủ tục" }
          ],
          defaultValue: "physical"
        },
        { key: "price", label: "Giá bán (VNĐ)", type: "number", required: true },
        { key: "priceOld", label: "Giá gốc niêm yết (VNĐ)", type: "number" },
        { key: "stock", label: "Số lượng tồn kho", type: "number", defaultValue: 100 },
        { key: "image", label: "URL ảnh sản phẩm", type: "text" },
        { key: "badge", label: "Huy hiệu (Bán chạy / Mới / Hot / Giảm giá)", type: "text" },
        { key: "desc", label: "Mô tả sản phẩm", type: "textarea", rows: 3 },
        {
          key: "status",
          label: "Trạng thái bán",
          type: "select",
          options: [
            { v: "published", l: "Đang mở bán (Published)" },
            { v: "draft", l: "Lưu nháp / Ngừng bán (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    PACKAGES: {
      slug: "PACKAGES",
      group: "commerce",
      label: "Gói cước PRO",
      singular: "Gói cước",
      icon: "crown-vip",
      webUrl: "index.html#pricing",
      source: () => (window.PACKAGES || []),
      desc: "Bảng giá và quyền lợi các gói hội viên VIP PRO (6 tháng, 1 năm, trọn đời).",
      createDefault: () => ({
        id: "pro_" + Date.now().toString().slice(-4),
        title: "Gói Trải Nghiệm 3 Tháng",
        name: "Gói Trải Nghiệm 3 Tháng",
        badge: "3 THÁNG",
        months: 3,
        desc: "Dành cho người mới bắt đầu tiếp cận tiếng Nga và chuẩn bị thi A1.",
        price: 199000,
        priceOld: 390000,
        popular: false,
        is_lifetime: false,
        status: "published",
        features: [
          "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1",
          "Luyện nghe 4 Part CEFR không giới hạn",
          "Tạo Lọ từ vựng cá nhân",
          "Sửa phát âm AI"
        ]
      }),
      fields: [
        { key: "id", label: "Mã gói cước (pro_3m, pro_6m, pro_1y, pro_vip)", type: "text", required: true },
        { key: "title", label: "Tên gói cước", type: "text", required: true },
        { key: "badge", label: "Huy hiệu thời hạn", type: "text", defaultValue: "6 THÁNG" },
        { key: "months", label: "Thời hạn (số tháng)", type: "number", defaultValue: 6 },
        { key: "price", label: "Giá ưu đãi (VNĐ)", type: "number", required: true },
        { key: "priceOld", label: "Giá gốc niêm yết (VNĐ)", type: "number" },
        {
          key: "popular",
          label: "Đánh dấu gói Nổi bật nhất",
          type: "select",
          options: [
            { v: "false", l: "Gói tiêu chuẩn" },
            { v: "true", l: "Gói phổ biến nhất (Popular)" }
          ],
          defaultValue: "false"
        },
        {
          key: "is_lifetime",
          label: "Gói Trọn Đời (Lifetime)",
          type: "select",
          options: [
            { v: "false", l: "Có thời hạn" },
            { v: "true", l: "Trọn đời vĩnh viễn" }
          ],
          defaultValue: "false"
        },
        {
          key: "status",
          label: "Trạng thái",
          type: "select",
          options: [
            { v: "published", l: "Đang mở bán (Published)" },
            { v: "draft", l: "Lưu nháp (Draft)" }
          ],
          defaultValue: "published"
        },
        { key: "desc", label: "Mô tả mục tiêu phù hợp", type: "textarea", rows: 3 }
      ]
    },

    ORDERS: {
      slug: "ORDERS",
      group: "commerce",
      label: "Đơn hàng & Giao dịch",
      singular: "Đơn hàng",
      icon: "shopping-bag",
      webUrl: "index.html#pricing",
      source: () => (window.SHOP_ORDERS || []),
      desc: "Quản lý đơn hàng mua gói học PRO, sách và giáo trình tiếng Nga qua VietQR.",
      createDefault: () => {
        const ordCode = "ORD-" + Date.now().toString().slice(-6);
        return {
          id: ordCode,
          order_code: ordCode,
          uuid: generateUUID(),
          userEmail: "",
          packageId: "pro_6m",
          packageName: "Gói Luyện Thi 6 Tháng",
          amount: 299000,
          paymentMethod: "VietQR",
          status: "pending",
          createdAt: new Date().toISOString()
        };
      },
      fields: [
        { key: "id", label: "Mã đơn hàng / Order Code", type: "text", required: true },
        { key: "userEmail", label: "Email học viên", type: "text", required: true },
        { key: "packageId", label: "Mã gói / Mã sách", type: "text", required: true },
        { key: "packageName", label: "Tên gói cước", type: "text", required: true },
        { key: "amount", label: "Số tiền thanh toán (VNĐ)", type: "number", required: true },
        {
          key: "paymentMethod",
          label: "Phương thức thanh toán",
          type: "select",
          options: [
            { v: "VIETQR", l: "VietQR Chuyển khoản" },
            { v: "MOMO", l: "Ví MoMo" },
            { v: "CARD", l: "Thẻ ngân hàng / Visa" }
          ],
          defaultValue: "VIETQR"
        },
        {
          key: "status",
          label: "Trạng thái thanh toán",
          type: "select",
          options: [
            { v: "pending", l: "Chờ thanh toán (Pending)" },
            { v: "paid", l: "Đã kích hoạt PRO (Paid)" },
            { v: "cancelled", l: "Đã hủy (Cancelled)" }
          ],
          defaultValue: "pending"
        },
        { key: "createdAt", label: "Thời gian tạo đơn", type: "text" }
      ]
    },

    BLOG_POSTS: {
      slug: "BLOG_POSTS",
      group: "commerce",
      label: "Cẩm nang Blog",
      singular: "Bài viết",
      icon: "book-open-blog",
      webUrl: "blog.html",
      source: () => (window.BLOG_POSTS || []),
      desc: "Kinh nghiệm xin học bổng chính phủ, đời sống ký túc xá và thủ tục du học Nga.",
      createDefault: () => {
        const slugCode = "bai-viet-moi-" + Date.now().toString().slice(-4);
        return {
          id: slugCode,
          slug: slugCode,
          uuid: generateUUID(),
          title: "Bài viết cẩm nang mới",
          category: "du_hoc",
          categoryName: "CẨM NANG DU HỌC NGA",
          author: "Ban Biên Tập RUSI TRKI",
          cover_url: "assets/red-square.jpg",
          summary: "Tóm tắt ngắn gọn nội dung bài viết về kinh nghiệm học tập và đời sống tại Nga.",
          publication_status: "published",
          content_md: `# Tiêu đề bài viết cẩm nang du học

## 1. Giới thiệu tổng quan
Hành trình du học tại Liên bang Nga luôn mở ra nhiều cơ hội quý báu để tiếp cận nền giáo dục đại học hàng đầu thế giới.

> [!NOTE]
> Sinh viên quốc tế được hưởng nhiều chính sách ưu đãi về thị thực và ký túc xá khi trúng tuyển học bổng chính phủ.

## 2. Các bước chuẩn bị then chốt
- **Hồ sơ học tập**: Bảng điểm dịch công chứng và hợp pháp hóa lãnh sự.
- **Chứng chỉ ngoại ngữ**: Chuẩn bị thi chứng chỉ quốc tế «ТРКИ».
- **Hành lý & Đời sống**: Chuẩn bị trang phục mùa đông và đồ dùng sinh hoạt.

| Hạng mục | Thời gian chuẩn bị | Lưu ý quan trọng |
| --- | --- | --- |
| Dịch thuật công chứng | 2 - 3 tuần | Cần dịch sang tiếng Nga |
| Khám sức khỏe & HIV | 1 tuần | Có giá trị trong 3 tháng |
| Vé máy bay & Ký túc xá | 1 tháng trước bay | Liên hệ trước với phòng Dekanat |

> [!TIP]
> Hãy chủ động kết nối với hội sinh viên Việt Nam tại trường bạn sắp theo học để được hỗ trợ đón sân bay và làm thủ tục nhập học nhanh chóng.
`
        };
      },
      fields: [
        { key: "slug", label: "Slug URL bài viết", type: "text", required: true, help: "Ví dụ: kinh-nghiem-xin-hoc-bong-nga" },
        { key: "title", label: "Tiêu đề bài viết", type: "text", required: true },
        {
          key: "category",
          label: "Chuyên mục bài viết",
          type: "select",
          options: [
            { v: "du_hoc", l: "Cẩm nang Du học Nga" },
            { v: "hoc_bong", l: "Học bổng Chính phủ Nga" },
            { v: "kinh_nghiem", l: "Kinh nghiệm sống & KTX" },
            { v: "tieng_nga", l: "Phương pháp học tiếng Nga & Thi TRKI" },
            { v: "thu_tuc", l: "Thủ tục visa & Giấy tờ" }
          ],
          defaultValue: "du_hoc"
        },
        { key: "author", label: "Tác giả bài viết", type: "text", defaultValue: "Ban Biên Tập RUSI TRKI" },
        { key: "cover_url", label: "URL Ảnh bìa (Cover Image)", type: "text", defaultValue: "assets/red-square.jpg" },
        { key: "summary", label: "Tóm tắt bài viết hiển thị ngoài danh sách", type: "textarea", rows: 3 },
        { key: "content_md", label: "Nội dung bài viết chi tiết (.md Markdown)", type: "markdown", required: true, help: "Hỗ trợ tiêu đề (#, ##), danh sách, bảng biểu, trích dẫn (>), code block và callout (> [!TIP])." },
        {
          key: "publication_status",
          label: "Trạng thái xuất bản",
          type: "select",
          options: [
            { v: "published", l: "Đã xuất bản (Published)" },
            { v: "draft", l: "Bản nháp (Draft)" }
          ],
          defaultValue: "published"
        }
      ]
    },

    // --- 4. HỆ THỐNG & QUẢN TRỊ (System) ---
    USERS: {
      slug: "USERS",
      group: "system",
      label: "Học viên & Quản trị",
      singular: "Người dùng",
      icon: "users-students",
      webUrl: "index.html",
      source: () => {
        const store = loadAdminStore();
        return Array.isArray(store.USERS) ? store.USERS : [
          { id: "usr_admin", email: "admin@rusitrki.com", full_name: "Tổng Quản Trị RUSI", role: "super_admin", is_pro: true, streak: 128, xp: 9500 },
          { id: "usr_academic", email: "academic@rusitrki.com", full_name: "Quản trị Học thuật", role: "academic_admin", is_pro: true, streak: 45, xp: 4200 }
        ];
      },
      createDefault: () => ({
        id: generateUUID(),
        email: "student@example.com",
        full_name: "Học viên mới",
        role: "student",
        is_pro: false,
        streak: 1,
        xp: 100
      }),
      fields: [
        { key: "id", label: "User ID", type: "text", required: true },
        { key: "email", label: "Email Gmail", type: "text", required: true },
        { key: "full_name", label: "Họ và tên", type: "text" },
        {
          key: "role",
          label: "Vai trò quản trị (RBAC)",
          type: "select",
          options: [
            { v: "student", l: "Học viên (Student)" },
            { v: "teacher", l: "Giáo viên chấm bài (Teacher)" },
            { v: "academic_admin", l: "Quản trị học thuật (Academic Admin)" },
            { v: "super_admin", l: "Tổng quản trị (Super Admin)" }
          ],
          defaultValue: "student"
        },
        {
          key: "is_pro",
          label: "Trạng thái VIP PRO",
          type: "select",
          options: [
            { v: "false", l: "Tài khoản thường" },
            { v: "true", l: "Đã kích hoạt PRO" }
          ],
          defaultValue: "false"
        },
        { key: "pro_expires_at", label: "Thời hạn VIP PRO (Hết hạn)", type: "text", placeholder: "2026-12-31T23:59:59Z", help: "Thời điểm hết hạn gói VIP (chuẩn ISO date, để trống nếu vĩnh viễn)" },
        { key: "avatar_url", label: "URL Ảnh đại diện (avatar_url)", type: "text", placeholder: "https://..." },
        { key: "streak", label: "Chuỗi ngày học liên tục (Streak)", type: "number", defaultValue: 0 },
        { key: "xp", label: "Điểm kinh nghiệm (XP)", type: "number", defaultValue: 0 }
      ]
    }
  };

  const COLLECTION_KEYS = Object.keys(COLLECTIONS);

  // =========================================================================
  // 2. STATE STORE & IN-PLACE RUNTIME PROPAGATION
  // =========================================================================

  const State = {
    currentRoute: "dashboard",
    currentSlug: null,
    currentDocId: null,
    isCreating: false,
    currentDraft: null, // Active live editing buffer
    activeEditorTab: "content",
    searchQuery: "",
    filterLevel: "all",
    filterPro: "all",
    filterSource: "all",
    currentPage: 1,
    pageSize: 10,
    selectedRows: new Set(),
    devMode: false
  };

  function loadAdminStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveAdminStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  const OBSOLETE_MOCK_TEST_IDS = new Set(["trki_a1", "trki_gram_a1a2", "trki_a2", "trki_reading_b1", "trki_b1", "trki_b2"]);

  function getMergedList(slug) {
    const col = COLLECTIONS[slug];
    if (!col) return [];
    const original = col.source() || [];
    const store = loadAdminStore();
    const admin = store[slug] || [];
    const deletedSet = new Set((store.__deleted && store.__deleted[slug]) || []);

    const map = new Map();
    original.forEach((it) => {
      const key = it.id || it.slug || it.title;
      if (slug === "TRKI_BANK" && OBSOLETE_MOCK_TEST_IDS.has(key)) return;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...it, __source: "original" });
      }
    });

    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      const key = clone.id || clone.slug || clone.title;
      if (slug === "TRKI_BANK" && OBSOLETE_MOCK_TEST_IDS.has(key)) return;
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...clone, __source: "admin" });
      }
    });

    return Array.from(map.values());
  }

  function getDeletedList(slug) {
    const col = COLLECTIONS[slug];
    if (!col) return [];
    const original = col.source() || [];
    const store = loadAdminStore();
    const admin = store[slug] || [];
    const deletedList = (store.__deleted && store.__deleted[slug]) || [];
    if (!Array.isArray(deletedList) || deletedList.length === 0) return [];
    const deletedSet = new Set(deletedList);

    const map = new Map();
    original.forEach((it) => {
      const key = it.id || it.slug || it.title;
      if (key && deletedSet.has(key)) {
        map.set(key, { ...it, __source: "deleted_original" });
      }
    });
    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      const key = clone.id || clone.slug || clone.title;
      if (key && deletedSet.has(key)) {
        map.set(key, { ...clone, __source: "deleted_admin" });
      }
    });
    deletedList.forEach((key) => {
      if (!map.has(key)) {
        map.set(key, { id: key, title: `Tài liệu đã xóa (${key})`, __source: "deleted" });
      }
    });

    return Array.from(map.values());
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 45);
  }

  function syncDataToWeb() {
    if (window.RusiSupabase && typeof window.RusiSupabase.clearCache === "function") {
      window.RusiSupabase.clearCache();
    }
    if (typeof window.mergeAdminData === "function") {
      window.mergeAdminData();
    }
    if (typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("trki:data-updated", { detail: { timestamp: Date.now() } }));
    }
  }

  function stripSource(it) {
    if (!it || typeof it !== "object") return it;
    const out = { ...it };
    delete out.__source;
    delete out.__admin;
    return out;
  }

  // =========================================================================
  // 3. ROUTER & CONTROLLER
  // =========================================================================

  function parseHash() {
    const hash = (window.location.hash || "#dashboard").replace(/^#/, "");
    const parts = hash.split("/");

    if (parts[0] === "dashboard" || !parts[0]) {
      return { route: "dashboard" };
    }
    if (parts[0] === "collection" && parts[1]) {
      if (parts[2] === "create") {
        return { route: "editor", slug: parts[1], docId: null, isCreating: true };
      }
      if (parts[2] === "edit" && parts[3]) {
        return { route: "editor", slug: parts[1], docId: decodeURIComponent(parts[3]), isCreating: false };
      }
      return { route: "list", slug: parts[1] };
    }
    if (parts[0] === "globals" && parts[1]) {
      return { route: "globals", slug: parts[1] };
    }
    if (parts[0] === "supabase-sync") {
      return { route: "supabase-sync" };
    }
    if (parts[0] === "api-explorer") {
      return { route: "api-explorer" };
    }
    return { route: "dashboard" };
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function handleRoute() {
    const parsed = parseHash();
    State.currentRoute = parsed.route;
    State.currentSlug = parsed.slug || null;
    State.currentDocId = parsed.docId || null;
    State.isCreating = !!parsed.isCreating;
    State.selectedRows.clear();
    State.currentPage = 1;

    // Initialize or load draft buffer
    if (State.currentRoute === "editor" && State.currentSlug) {
      const col = COLLECTIONS[State.currentSlug];
      if (State.isCreating) {
        State.currentDraft = (col && col.createDefault) ? col.createDefault() : { id: "item_" + Date.now().toString().slice(-4), title: "Mục mới" };
      } else {
        const targetId = String(State.currentDocId || "").trim();
        const item = getMergedList(State.currentSlug).find((it) => {
          if (!it) return false;
          const k1 = it.id != null ? String(it.id).trim() : "";
          const k2 = it.slug != null ? String(it.slug).trim() : "";
          const k3 = it.code != null ? String(it.code).trim() : "";
          const k4 = it.title != null ? String(it.title).trim() : "";
          const k5 = it.uuid != null ? String(it.uuid).trim() : "";
          const k6 = it.word_with_stress != null ? String(it.word_with_stress).trim() : "";
          return k1 === targetId || k2 === targetId || k3 === targetId || k4 === targetId || k5 === targetId || k6 === targetId;
        });
        State.currentDraft = item ? JSON.parse(JSON.stringify(stripSource(item))) : ((col && col.createDefault) ? col.createDefault() : {});
      }
    } else {
      State.currentDraft = null;
    }

    updateSidebarNav();
    updateBreadcrumbs();
    updateTopbarActions();

    const container = document.getElementById("payloadViewContainer");
    if (!container) return;

    if (State.currentRoute === "dashboard") {
      renderDashboard(container);
    } else if (State.currentRoute === "list") {
      renderCollectionView(container, State.currentSlug);
    } else if (State.currentRoute === "editor") {
      renderDocumentEditor(container, State.currentSlug);
    } else if (State.currentRoute === "globals") {
      renderGlobalsView(container, State.currentSlug);
    } else if (State.currentRoute === "supabase-sync") {
      renderSupabaseSyncView(container);
    } else if (State.currentRoute === "api-explorer") {
      renderApiExplorer(container);
    }

    closeMobileSidebar();
  }

  // =========================================================================
  // 4. SIDEBAR & BREADCRUMBS
  // =========================================================================

  // Danh sách các bộ sưu tập phân cấp phụ ẩn khỏi sidebar (đã tích hợp trong dropdown bài học)
  const HIDDEN_CMS_KEYS = new Set([
    "LISTENING_TOPICS",    // Chủ đề luyện nghe phụ (đã tích hợp chọn trong LISTENING_LESSONS)
    "WRITING_TOPICS"       // Chủ đề luyện viết phụ (đã tích hợp chọn trong WRITING_TASKS)
  ]);

  function renderSidebarLists() {
    const listStudy = document.getElementById("navListStudy");
    const listCommerce = document.getElementById("navListCommerce");

    if (listStudy) listStudy.innerHTML = "";
    if (listCommerce) listCommerce.innerHTML = "";

    const countStudy = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "study" && !HIDDEN_CMS_KEYS.has(k)).length;
    const countCommerce = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "commerce" && !HIDDEN_CMS_KEYS.has(k)).length;
    const bStudy = document.getElementById("badgeCountStudy");
    const bCommerce = document.getElementById("badgeCountCommerce");
    if (bStudy) bStudy.textContent = countStudy;
    if (bCommerce) bCommerce.textContent = countCommerce;

    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      if (col.group === "system" || col.group === "submissions" || HIDDEN_CMS_KEYS.has(key)) return;

      const items = getMergedList(key);
      const li = document.createElement("li");
      li.className = "payload-nav-item";
      li.innerHTML = `
        <a class="payload-nav-link" data-nav="collection:${col.slug}" href="#collection/${col.slug}">
          <span class="payload-nav-icon">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 18 }) : col.icon}</span>
          <span class="payload-nav-label">${esc(col.label)}</span>
          <span class="payload-nav-badge" id="badge_${col.slug}">${items.length}</span>
        </a>
      `;

      if (col.group === "study" && listStudy) listStudy.appendChild(li);
      else if (col.group === "commerce" && listCommerce) listCommerce.appendChild(li);
      else if (listStudy) listStudy.appendChild(li);
    });

    const userCountEl = document.getElementById("navBadgeUsers");
    if (userCountEl) {
      userCountEl.textContent = getMergedList("USERS").length;
    }
  }

  function updateSidebarNav() {
    document.querySelectorAll(".payload-nav-link").forEach((link) => {
      const target = link.getAttribute("data-nav");
      let isActive = false;

      if (State.currentRoute === "dashboard" && target === "dashboard") isActive = true;
      else if ((State.currentRoute === "list" || State.currentRoute === "editor") && target === `collection:${State.currentSlug}`) isActive = true;
      else if (State.currentRoute === "globals" && target === `globals:${State.currentSlug}`) isActive = true;
      else if (State.currentRoute === "supabase-sync" && target === "supabase-sync") isActive = true;
      else if (State.currentRoute === "api-explorer" && target === "api-explorer") isActive = true;

      link.classList.toggle("active", isActive);
    });
  }

  function updateBreadcrumbs() {
    const nav = document.getElementById("breadcrumbsNav");
    if (!nav) return;

    const sep = `<svg class="payload-crumb-sep" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    const homeIcon = `<svg class="payload-crumb-home" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;

    if (State.currentRoute === "dashboard") {
      nav.innerHTML = `<span class="payload-crumb-item active">${homeIcon} Bảng điều khiển (Dashboard)</span>`;
    } else if (State.currentRoute === "list") {
      const col = COLLECTIONS[State.currentSlug];
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">${homeIcon} Dashboard</a>
        ${sep}
        <span class="payload-crumb-item active">${col ? esc(col.label) : esc(State.currentSlug)}</span>
      `;
    } else if (State.currentRoute === "editor") {
      const col = COLLECTIONS[State.currentSlug];
      const title = State.isCreating ? "Tạo mới" : esc(State.currentDocId);
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">${homeIcon} Dashboard</a>
        ${sep}
        <a class="payload-crumb-item" href="#collection/${State.currentSlug}">${col ? esc(col.label) : esc(State.currentSlug)}</a>
        ${sep}
        <span class="payload-crumb-item active">${title}</span>
      `;
    } else if (State.currentRoute === "globals") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">${homeIcon} Dashboard</a>
        ${sep}
        <span class="payload-crumb-item active">Cấu hình hệ thống</span>
      `;
    } else if (State.currentRoute === "supabase-sync") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">${homeIcon} Dashboard</a>
        ${sep}
        <span class="payload-crumb-item active">Supabase Cloud Engine</span>
      `;
    } else if (State.currentRoute === "api-explorer") {
      nav.innerHTML = `
        <a class="payload-crumb-item" href="#dashboard">${homeIcon} Dashboard</a>
        ${sep}
        <span class="payload-crumb-item active">REST API & Schema Explorer</span>
      `;
    }
  }

  // =========================================================================
  // 5. TOPBAR ACTIONS & KEBAB MENU ("MORE..." RULE COMPLIANCE)
  // =========================================================================

  function updateTopbarActions() {
    const area = document.getElementById("topbarActions");
    if (!area) return;

    let primaryBtn = "";
    let secondaryBtn = "";

    if (State.currentRoute === "list") {
      primaryBtn = `<a class="p-btn p-btn-primary p-btn-sm" href="#collection/${State.currentSlug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Tạo mới</a>`;
      secondaryBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnSyncWeb" type="button" title="Đồng bộ vào runtime web">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} Đẩy về Web</button>`;
      if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(State.currentSlug)) {
        secondaryBtn += `<button class="p-btn p-btn-secondary p-btn-sm" id="btnSyncCloudSingle" type="button" title="Đẩy toàn bộ collection này lên Supabase">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Lưu Cloud</button>`;
      }
    } else if (State.currentRoute === "editor") {
      const mapping = SupabaseSyncEngine && SupabaseSyncEngine.MAPPINGS[State.currentSlug];
      const tablePill = mapping ? `<span class="p-pill p-pill-success" style="font-size:11px;padding:3px 7px;display:inline-flex;align-items:center;gap:4px" title="Bảng đích Supabase">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 12 }) : ""} ${mapping.table}</span>` : "";
      const statusPill = `<span class="p-pill ${State.isCreating ? "p-pill-warning" : "p-pill-info"}" style="font-size:11px;padding:3px 7px">${State.isCreating ? "Mới" : "Đang sửa"}</span>`;
      const docIdStr = State.currentDocId || (State.currentDraft ? (State.currentDraft.id || State.currentDraft.slug || "") : "");
      const idTag = docIdStr ? `<span style="font-size:11px;color:var(--p-text-muted);font-family:ui-monospace,monospace;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:2px 6px;background:var(--p-surface-subtle,#f1f5f9);border-radius:4px;border:1px solid var(--p-border-subtle,#e2e8f0)" title="Mã ID: ${escAttr(docIdStr)}">ID: ${esc(docIdStr)}</span>` : "";

      primaryBtn = `<button class="p-btn p-btn-primary p-btn-sm" id="btnSaveDoc" type="button" title="Lưu thay đổi (Ctrl+S)">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu thay đổi</button>`;

      const backBtn = `<a class="p-btn p-btn-ghost p-btn-sm" href="#collection/${State.currentSlug}" title="Quay lại danh sách">← Quay lại</a>`;
      const previewBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnOpenPreviewDrawer" type="button" onclick="window.openPreviewInNewTab()" title="Xem trước bài viết trên tab mới (Ctrl+P)">${window.RusiIcons ? RusiIcons.get("external-link", { size: 13 }) : ""} Xem trước ↗</button>`;
      const saveCloseBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnSaveAndClose" type="button" title="Lưu và quay lại danh sách">${window.RusiIcons ? RusiIcons.get("check", { size: 13 }) : ""} Lưu &amp; Đóng</button>`;
      const deleteBtn = (!State.isCreating && State.currentDocId)
        ? `<button class="p-btn p-btn-ghost p-btn-sm" id="btnDeleteDocTopbar" type="button" title="Xóa tài liệu này" style="color:var(--p-danger,#ef4444)">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 13 }) : ""} Xóa</button>`
        : "";

      secondaryBtn = `${backBtn}${statusPill}${idTag}${tablePill}${deleteBtn}${previewBtn}${saveCloseBtn}`;
    } else {
      primaryBtn = `<button class="p-btn p-btn-primary p-btn-sm" id="btnSyncWeb" type="button">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 14 }) : ""} Đẩy về Web</button>`;
      secondaryBtn = `<button class="p-btn p-btn-secondary p-btn-sm" id="btnOpenSupabaseModal" type="button">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 14 }) : ""} Supabase</button>`;
    }

    const kebabHtml = `
      <div class="payload-kebab-menu" id="topbarKebab">
        <button class="p-btn-icon" id="btnKebabToggle" type="button" aria-label="Thao tác khác" title="Thêm thao tác">···</button>
        <div class="payload-kebab-dropdown" id="kebabDropdown">
          ${State.currentSlug && SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(State.currentSlug) ? `
            <button class="payload-kebab-item" id="kebabPushSingleBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Đẩy ${State.currentSlug} lên Cloud</button>
            <button class="payload-kebab-item" id="kebabPullSingleBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Kéo ${State.currentSlug} từ Cloud</button>
            <div class="payload-kebab-divider"></div>
          ` : ""}
          <a class="payload-kebab-item" href="index.html" target="_blank">${window.RusiIcons ? RusiIcons.get("external-link", { size: 14 }) : ""} Mở Web học viên</a>
          <button class="payload-kebab-item" id="kebabSbBtn" type="button">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 14 }) : ""} Cấu hình Supabase</button>
          <button class="payload-kebab-item" id="kebabExportBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Export JSON / data.js</button>
          <button class="payload-kebab-item" id="kebabImportBtn" type="button">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Import Backup JSON</button>
          <div class="payload-kebab-divider"></div>
          <button class="payload-kebab-item danger" id="kebabResetBtn" type="button">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Khôi phục gốc (Reset)</button>
        </div>
      </div>
    `;

    area.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        ${primaryBtn}
        ${secondaryBtn}
        ${kebabHtml}
      </div>
    `;

    // Bind event listeners
    const btnSync = document.getElementById("btnSyncWeb");
    if (btnSync) btnSync.onclick = () => {
      syncDataToWeb();
      toast("Đã cập nhật và đột biến dữ liệu runtime thành công trên toàn bộ website!");
    };

    const btnSyncCloud = document.getElementById("btnSyncCloudSingle");
    if (btnSyncCloud) btnSyncCloud.onclick = () => window.syncSingleCollection(State.currentSlug);

    const kebabPush = document.getElementById("kebabPushSingleBtn");
    if (kebabPush) kebabPush.onclick = () => window.syncSingleCollection(State.currentSlug);

    const kebabPull = document.getElementById("kebabPullSingleBtn");
    if (kebabPull) kebabPull.onclick = () => window.pullSingleCollection(State.currentSlug);

    const btnSbModal = document.getElementById("btnOpenSupabaseModal");
    if (btnSbModal) btnSbModal.onclick = openSupabaseModal;

    const btnPreview = document.getElementById("btnOpenPreviewDrawer");
    if (btnPreview) btnPreview.onclick = window.openPreviewInNewTab;

    const btnSave = document.getElementById("btnSaveDoc");
    if (btnSave) btnSave.onclick = () => window.saveDocument(true);

    const btnSaveClose = document.getElementById("btnSaveAndClose");
    if (btnSaveClose) btnSaveClose.onclick = () => window.saveDocument(false);

    const btnDeleteTop = document.getElementById("btnDeleteDocTopbar");
    if (btnDeleteTop) btnDeleteTop.onclick = () => window.deleteDocument(State.currentSlug, State.currentDocId);

    const kebabBtn = document.getElementById("btnKebabToggle");
    const kebabDropdown = document.getElementById("kebabDropdown");
    if (kebabBtn && kebabDropdown) {
      kebabBtn.onclick = (e) => {
        e.stopPropagation();
        kebabDropdown.classList.toggle("open");
      };
      document.addEventListener("click", () => kebabDropdown.classList.remove("open"));
    }

    const kebabSb = document.getElementById("kebabSbBtn");
    if (kebabSb) kebabSb.onclick = openSupabaseModal;

    const kebabExp = document.getElementById("kebabExportBtn");
    if (kebabExp) kebabExp.onclick = exportData;

    const kebabImp = document.getElementById("kebabImportBtn");
    if (kebabImp) kebabImp.onclick = () => document.getElementById("importFileInput").click();

    const kebabRst = document.getElementById("kebabResetBtn");
    if (kebabRst) kebabRst.onclick = resetAdminData;
  }

  // =========================================================================
  // 6. VIEW 1: DASHBOARD (OVERVIEW)
  // =========================================================================

  function renderDashboard(container) {
    let totalDocs = 0;
    const isSbConfigured = window.isSupabaseConfigured && window.isSupabaseConfigured();

    let collectionsHtml = "";
    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      if (col.group === "system" || col.group === "submissions" || HIDDEN_CMS_KEYS.has(key)) return;

      const items = getMergedList(key);
      totalDocs += items.length;
      collectionsHtml += `
        <div class="payload-collection-card">
          <div class="payload-collection-card-head">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="payload-card-icon-wrap">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 20 }) : col.icon}</div>
              <div>
                <h3 class="payload-card-title">${esc(col.label)}</h3>
                <span class="p-card-count">${items.length} tài liệu</span>
              </div>
            </div>
          </div>
          <p class="payload-card-desc">${esc(col.desc || "Quản lý dữ liệu phân hệ.")}</p>
          <div class="payload-card-foot">
            <a class="p-btn p-btn-primary p-btn-sm" href="#collection/${col.slug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm mới</a>
            <a class="p-btn p-btn-secondary p-btn-sm" href="#collection/${col.slug}">Danh sách →</a>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="payload-dash-header">
        <div>
          <h1 class="payload-dash-title">Quản trị nội dung</h1>
          <p class="payload-dash-desc">Thêm mới, chỉnh sửa và quản lý dữ liệu trên hệ thống.</p>
        </div>
        <div class="payload-dash-meta">
          <span class="p-pill p-pill-neutral"><b>${totalDocs}</b> tài liệu</span>
          ${isSbConfigured ? '<span class="p-pill p-pill-success">● Supabase Cloud</span>' : '<span class="p-pill p-pill-warning">● Offline</span>'}
        </div>
      </div>

      <div class="payload-collections-grid">
        ${collectionsHtml}
      </div>
    `;
  }

  // =========================================================================
  // 7. VIEW 2: COLLECTION LIST (TABLE VIEW)
  // =========================================================================

  function renderCollectionView(container, slug) {
    const col = COLLECTIONS[slug];
    if (!col) {
      container.innerHTML = `<div style="padding:40px;text-align:center">Collection không tồn tại. <a href="#dashboard">Quay lại Dashboard</a></div>`;
      return;
    }

    const isTrashMode = State.filterSource === "trash";
    const allItems = isTrashMode ? getDeletedList(slug) : getMergedList(slug);

    let filtered = allItems.filter((item) => {
      const q = State.searchQuery.toLowerCase();
      const textToSearch = [
        item.id,
        item.code,
        item.slug,
        item.title,
        item.name,
        item.ru,
        item.vi,
        item.test_code,
        item.prompt,
        item.explanation,
        item.topic,
        item.summary,
        item.categoryName,
        item.category,
        item.youtubeId,
        item.youtube_id,
        item.sentence_ru,
        item.desc, item.level, item.word_with_stress, item.meaning_vi, item.student_text, item.exam_id, item.user_id].filter(Boolean).join(" ").toLowerCase();

      if (q && !textToSearch.includes(q)) return false;

      if (State.filterLevel !== "all" && item.level) {
        if (!item.level.toLowerCase().includes(State.filterLevel.toLowerCase())) return false;
      }

      if (State.filterPro === "pro" && String(item.is_pro_only) !== "true") return false;
      if (State.filterPro === "free" && String(item.is_pro_only) === "true") return false;

      if (!isTrashMode) {
        if (State.filterSource === "admin" && item.__source !== "admin") return false;
        if (State.filterSource === "original" && item.__source !== "original") return false;
      }

      return true;
    });

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / State.pageSize));
    State.currentPage = Math.min(State.currentPage, totalPages);
    const startIndex = (State.currentPage - 1) * State.pageSize;
    const paginatedItems = filtered.slice(startIndex, startIndex + State.pageSize);

    let rowsHtml = "";
    if (paginatedItems.length === 0) {
      rowsHtml = `
        <tr>
          <td colspan="7" style="text-align:center;padding:48px 20px;color:var(--p-text-muted)">
            <div style="margin-bottom:8px;color:var(--p-text-muted)">${window.RusiIcons ? RusiIcons.get(isTrashMode ? "trash-2" : "search-icon", { size: 36 }) : ""}</div>
            <div>${isTrashMode ? "Thùng rác trống. Không có tài liệu nào bị xóa." : "Không tìm thấy tài liệu nào phù hợp với bộ lọc hiện tại."}</div>
            <button class="p-btn p-btn-secondary p-btn-sm" style="margin-top:12px" onclick="window.clearFilters()">Xóa bộ lọc</button>
          </td>
        </tr>
      `;
    } else {
      paginatedItems.forEach((it) => {
        const idKey = it.id || it.slug || it.title;
        const isChecked = State.selectedRows.has(idKey);
        const titleText = it.title || it.name || it.ru || it.word_with_stress || it.exam_id || it.user_id || it.id;
        let subText = "";
        if (slug === "SPEAKING_SETS") {
          const itemsCount = (it.sentences || it.items || (it.raw_data && it.raw_data.items) || []).length;
          const yt = it.youtubeId || it.youtube_id || (it.raw_data && it.raw_data.youtube_video_id) || "";
          subText = `${itemsCount} câu thoại • ${it.categoryName || it.category || "Shadowing"}${yt ? " • Video: " + yt : ""}`;
        } else if (slug === "LISTENING_TOPICS") {
          subText = `Chủ đề nghe • ${it.level || "A1"} • ${it.category || "general"} • ${it.description ? it.description.slice(0, 50) + "..." : "Nghe hiểu & chép chính tả"}`;
        } else if (slug === "LISTENING_LESSONS") {
          const linesCount = (it.lines || (it.raw_data && it.raw_data.lines) || []).length;
          const qCount = (it.questions || (it.raw_data && it.raw_data.questions) || []).length;
          const dur = it.duration_seconds ? ` • ⏱️ ${it.duration_seconds}s` : "";
          subText = `${linesCount} câu thoại chính tả • ${qCount} câu trắc nghiệm${dur} • ${it.level || "A1"}`;
        } else if (slug === "TRKI_BANK") {
          const partsCount = (it.parts || (it.raw_data && it.raw_data.parts) || it.sections || []).length || 5;
          subText = `Chuẩn 5 Phân hệ (${partsCount} subtests) • ${it.durationMin || it.duration_min || 45} phút • Điểm đỗ: ${it.passPercent || it.pass_percent || 66}%`;
        } else if (slug === "WRITING_TOPICS") {
          const typeLabel = it.type === "picture" ? "Письмо по картинке (Tả tranh)" : "Перевод (Luyện dịch)";
          subText = `${typeLabel} • ${it.level || "A1"} • ${it.category_name || it.category || "Chủ đề"}`;
        } else if (slug === "WRITING_TASKS") {
          const typeLabel = it.task_type === "picture_desc" ? "Tả tranh" : "Luyện dịch";
          const wordsCount = (it.suggested_words || []).length;
          subText = `${typeLabel} • ${it.level || "A1"} • Min ${it.min_words || 30} từ • ${wordsCount} từ gợi ý`;
        } else if (slug === "VOCAB_JARS") {
          subText = `${it.word_count || (it.words || []).length} từ vựng trong lọ • ${it.levelName || it.level || "A1"}`;
        } else if (slug === "VOCABULARIES") {
          subText = `${it.meaning_vi || it.meaning_ru || ""} • ${it.pos || ""} ${it.gender ? "(" + it.gender + ")" : ""}`;
        } else if (slug === "SHOP_PRODUCTS") {
          const pVnd = it.price_vnd || it.price;
          subText = `${pVnd ? Number(pVnd).toLocaleString("vi-VN") + " đ" : "Miễn phí"} • Kho: ${it.stock != null ? it.stock : 50} sp • ${it.category_name || it.category || ""}`;
        } else if (slug === "TRKI_QUESTION_BANK") {
          const ansText = it.correct_answer || (Array.isArray(it.options) && it.options[it.correct_index]) || "";
          subText = `Đề: ${it.test_code || "—"} • ${it.sub_test || "grammar"} • ĐA: [${it.correct_index != null ? it.correct_index : "—"}] ${ansText} • ${it.topic || it.prompt ? (it.prompt.slice(0, 45) + "...") : ""}`;
        } else if (slug === "GRAMMAR_LESSONS") {
          subText = `Chuyên đề: ${it.category || it.topic || "Ngữ pháp"} • Cấp độ: ${it.level || "A1"} • Thứ tự: #${it.order_index || 1}`;
        } else if (slug === "PACKAGES") {
          const pVnd = it.price_vnd || it.price;
          subText = `${pVnd ? Number(pVnd).toLocaleString("vi-VN") + " đ" : "Liên hệ"} • ${it.duration_days ? it.duration_days + " ngày" : "Trọn đời"} • ${(it.features || []).length} quyền lợi`;
        } else {
          subText = it.desc || it.vi || it.meaning_vi || it.student_text || (it.score_percent !== undefined ? ("Điểm: " + it.score_percent + "%") : "") || (it.parts ? (it.parts.length + " phần thi") : "");
        }
        const levelBadge = it.level ? `<span class="p-pill p-pill-info">${esc(it.level)}</span>` : "";
        const proBadge = (String(it.is_pro_only) === "true" || it.is_pro) ? `<span class="p-pill p-pill-warning">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 12 }) : ""} PRO</span>` : "";
        const sourceBadge = isTrashMode
          ? `<span class="p-pill p-pill-danger">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 11 }) : ""} Đã xóa</span>`
          : (it.__source === "admin" ? `<span class="p-pill p-pill-violet">Đã sửa</span>` : "");

        rowsHtml += `
          <tr class="payload-table-row" onclick="if(!event.target.closest('input,button,a')) window.location.hash='#collection/${slug}/edit/${encodeURIComponent(idKey)}'">
            <td class="payload-table-check">
              <input type="checkbox" class="row-checkbox" data-id="${escAttr(idKey)}" ${isChecked ? "checked" : ""} />
            </td>
            <td>
              <div style="font-weight:600;font-size:13.5px">${esc(titleText)}</div>
              ${subText ? `<div style="font-size:12px;color:var(--p-text-muted);margin-top:2px;max-width:320px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(subText)}</div>` : ""}
            </td>
            <td><code>${esc(idKey)}</code></td>
            <td>${levelBadge || "—"}</td>
            <td>${proBadge || "—"}</td>
            <td>${sourceBadge || "—"}</td>
            <td>
              <div class="payload-row-actions">
                ${isTrashMode ? `
                  <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.restoreDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Khôi phục tài liệu này">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 13 }) : ""} Khôi phục</button>
                  <button class="p-btn p-btn-danger p-btn-sm" type="button" onclick="window.permanentDeleteDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Xóa vĩnh viễn">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 13 }) : ""} Xóa hẳn</button>
                ` : `
                  <a class="p-btn p-btn-secondary p-btn-sm" href="#collection/${slug}/edit/${encodeURIComponent(idKey)}" title="Chỉnh sửa">${window.RusiIcons ? RusiIcons.get("edit-3", { size: 13 }) : ""} Sửa</a>
                  <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.deleteDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Xóa tài liệu" style="color:var(--p-danger)">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 13 }) : ""} Xóa</button>
                  <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.cloneDocument('${escAttr(slug)}', '${escAttr(idKey)}')" title="Nhân bản">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : ""}</button>
                `}
              </div>
            </td>
          </tr>
        `;
      });
    }

    container.innerHTML = `
      <div class="payload-list-header">
        <div class="payload-list-title-wrap">
          <span style="font-size:24px;display:inline-flex;align-items:center">${window.RusiIcons ? RusiIcons.get(col.icon, { size: 28 }) : col.icon}</span>
          <h1 class="payload-list-title">${esc(col.label)}</h1>
          <span class="p-pill p-pill-neutral">${allItems.length}</span>
          ${isTrashMode ? '<span class="p-pill p-pill-danger" style="margin-left:6px">Thùng rác</span>' : ''}
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <a class="p-btn p-btn-primary" href="#collection/${slug}/create">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm mới</a>
          <a class="p-btn p-btn-secondary" href="${col.webUrl}" target="_blank" title="Mở trang tương ứng của học viên">${window.RusiIcons ? RusiIcons.get("external-link", { size: 14 }) : ""} Xem trên web</a>
        </div>
      </div>

      <div class="payload-toolbar">
        <div class="payload-toolbar-left">
          <div class="payload-search-box">
            <span class="payload-search-icon">${window.RusiIcons ? RusiIcons.get("search-icon", { size: 16 }) : ""}</span>
            <input type="text" class="payload-search-input" id="tableSearch" placeholder="Tìm kiếm theo tiêu đề, ID, từ khóa..." value="${escAttr(State.searchQuery)}" />
          </div>

          <select class="payload-filter-select" id="filterLevel">
            <option value="all" ${State.filterLevel === "all" ? "selected" : ""}>Tất cả cấp độ</option>
            <option value="A1" ${State.filterLevel === "A1" ? "selected" : ""}>Cấp độ A1</option>
            <option value="A2" ${State.filterLevel === "A2" ? "selected" : ""}>Cấp độ A2</option>
            <option value="B1" ${State.filterLevel === "B1" ? "selected" : ""}>Cấp độ B1</option>
            <option value="B2" ${State.filterLevel === "B2" ? "selected" : ""}>Cấp độ B2</option>
          </select>

          <select class="payload-filter-select" id="filterPro">
            <option value="all" ${State.filterPro === "all" ? "selected" : ""}>Tất cả gói</option>
            <option value="free" ${State.filterPro === "free" ? "selected" : ""}>Chỉ Miễn phí</option>
            <option value="pro" ${State.filterPro === "pro" ? "selected" : ""}>Chỉ VIP PRO</option>
          </select>

          <select class="payload-filter-select" id="filterSource">
            <option value="all" ${State.filterSource === "all" ? "selected" : ""}>Tất cả nguồn đang dùng</option>
            <option value="original" ${State.filterSource === "original" ? "selected" : ""}>Bản gốc data.js</option>
            <option value="admin" ${State.filterSource === "admin" ? "selected" : ""}>Admin đã sửa</option>
            <option value="trash" ${State.filterSource === "trash" ? "selected" : ""}>🗑️ Thùng rác (Đã xóa)</option>
          </select>
        </div>
      </div>

      <div class="payload-bulk-bar" id="bulkBar">
        <div style="font-weight:600;font-size:13px" id="bulkCountText">Đã chọn 0 mục</div>
        <div style="display:flex;gap:8px">
          ${isTrashMode ? `
            <button class="p-btn p-btn-primary p-btn-sm" id="btnBulkRestore" type="button" onclick="window.bulkRestore('${escAttr(slug)}')">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : ""} Khôi phục đã chọn</button>
            <button class="p-btn p-btn-danger p-btn-sm" id="btnBulkPermanentDelete" type="button" onclick="window.bulkPermanentDelete('${escAttr(slug)}')">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Xóa vĩnh viễn đã chọn</button>
          ` : `
            <button class="p-btn p-btn-danger p-btn-sm" id="btnBulkDelete" type="button">${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Xoá mục đã chọn</button>
            <button class="p-btn p-btn-secondary p-btn-sm" id="btnBulkMakePro" type="button">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""} Đặt thành PRO</button>
            <button class="p-btn p-btn-secondary p-btn-sm" id="btnBulkMakeFree" type="button">${window.RusiIcons ? RusiIcons.get("award-badge", { size: 14 }) : ""} Đặt thành Miễn phí</button>
          `}
        </div>
      </div>

      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table">
            <thead>
              <tr>
                <th class="payload-table-check">
                  <input type="checkbox" id="selectAllCheckbox" />
                </th>
                <th>Tiêu Đề / Tên Gọi</th>
                <th>Mã ID</th>
                <th>Cấp Độ</th>
                <th>Quyền Hạn</th>
                <th>Nguồn Dữ Liệu</th>
                <th style="text-align:right">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <div class="payload-pagination">
        <div>
          Hiển thị <strong>${totalItems === 0 ? 0 : startIndex + 1}</strong> – <strong>${Math.min(startIndex + State.pageSize, totalItems)}</strong> trên <strong>${totalItems}</strong> mục
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnPrevPage" ${State.currentPage <= 1 ? "disabled" : ""}>← Trang trước</button>
          <span style="font-family:var(--p-font-mono)">Trang ${State.currentPage} / ${totalPages}</span>
          <button class="p-btn p-btn-secondary p-btn-sm" id="btnNextPage" ${State.currentPage >= totalPages ? "disabled" : ""}>Trang sau →</button>
        </div>
      </div>
    `;

    // Search input handler
    const searchInp = document.getElementById("tableSearch");
    if (searchInp) {
      let timer;
      searchInp.oninput = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          State.searchQuery = e.target.value.trim();
          State.currentPage = 1;
          renderCollectionView(container, slug);
        }, 200);
      };
    }

    const fLevel = document.getElementById("filterLevel");
    if (fLevel) fLevel.onchange = (e) => { State.filterLevel = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    const fPro = document.getElementById("filterPro");
    if (fPro) fPro.onchange = (e) => { State.filterPro = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    const fSource = document.getElementById("filterSource");
    if (fSource) fSource.onchange = (e) => { State.filterSource = e.target.value; State.currentPage = 1; renderCollectionView(container, slug); };

    // Select All
    const chkAll = document.getElementById("selectAllCheckbox");
    if (chkAll) {
      chkAll.onchange = (e) => {
        document.querySelectorAll(".row-checkbox").forEach((cb) => {
          cb.checked = e.target.checked;
          const id = cb.getAttribute("data-id");
          if (e.target.checked) State.selectedRows.add(id);
          else State.selectedRows.delete(id);
        });
        updateBulkBar();
      };
    }

    document.querySelectorAll(".row-checkbox").forEach((cb) => {
      cb.onchange = (e) => {
        const id = cb.getAttribute("data-id");
        if (e.target.checked) State.selectedRows.add(id);
        else State.selectedRows.delete(id);
        updateBulkBar();
      };
    });

    const btnPrev = document.getElementById("btnPrevPage");
    if (btnPrev) btnPrev.onclick = () => { if (State.currentPage > 1) { State.currentPage--; renderCollectionView(container, slug); } };

    const btnNext = document.getElementById("btnNextPage");
    if (btnNext) btnNext.onclick = () => { if (State.currentPage < totalPages) { State.currentPage++; renderCollectionView(container, slug); } };

    const btnBulkDel = document.getElementById("btnBulkDelete");
    if (btnBulkDel) btnBulkDel.onclick = () => bulkDelete(slug);

    const btnBulkPro = document.getElementById("btnBulkMakePro");
    if (btnBulkPro) btnBulkPro.onclick = () => bulkUpdateField(slug, "is_pro_only", true);

    const btnBulkFree = document.getElementById("btnBulkMakeFree");
    if (btnBulkFree) btnBulkFree.onclick = () => bulkUpdateField(slug, "is_pro_only", false);

    updateBulkBar();
  }

  function updateBulkBar() {
    const bar = document.getElementById("bulkBar");
    const txt = document.getElementById("bulkCountText");
    if (!bar || !txt) return;

    if (State.selectedRows.size > 0) {
      bar.classList.add("visible");
      txt.textContent = `Đã chọn ${State.selectedRows.size} tài liệu`;
    } else {
      bar.classList.remove("visible");
    }
  }

  window.clearFilters = function () {
    State.searchQuery = "";
    State.filterLevel = "all";
    State.filterPro = "all";
    State.filterSource = "all";
    State.currentPage = 1;
    handleRoute();
  };

  // =========================================================================
  // 8. VIEW 3: DOCUMENT EDITOR (PAYLOAD 2-COLUMN WITH LIVE BINDING)
  // =========================================================================

  function renderDocumentEditor(container, slug) {
    const col = COLLECTIONS[slug];
    if (!col) {
      container.innerHTML = `<div style="padding:40px;text-align:center">Collection không tồn tại. <a href="#dashboard">Quay lại Dashboard</a></div>`;
      return;
    }
    if (!State.currentDraft) {
      container.innerHTML = `
        <div style="padding:48px 20px;text-align:center">
          <div style="font-size:32px;margin-bottom:12px">⚠️</div>
          <div style="font-size:16px;font-weight:600;margin-bottom:6px">Không tìm thấy bản ghi dữ liệu</div>
          <div style="color:var(--p-text-muted);font-size:13px;margin-bottom:16px">Mã bản ghi: <code>${esc(State.currentDocId || "")}</code></div>
          <a class="p-btn p-btn-secondary" href="#collection/${escAttr(slug)}">Quay lại danh sách</a>
        </div>
      `;
      return;
    }

    const draft = State.currentDraft;

    // Crisp Notion 3.0 vector SVG icons
    const NOTION_ICONS = {
      undo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>`,
      redo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>`,
      plus: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
      chevron: `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
      text: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
      bold: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>`,
      italic: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>`,
      strike: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4M4 12h16M7 16a3 3 0 0 0 3 4h4a3 3 0 0 0 2.83-2"></path></svg>`,
      highlight: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l-5 14h10l-5-14z"></path><line x1="2" y1="21" x2="22" y2="21" stroke="#f59e0b" stroke-width="3"></line></svg>`,
      code: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      link: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
      callout: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.7 3.5 5.7V17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.3c2-.9 3.5-3.2 3.5-5.7a7 7 0 0 0-7-7z"></path></svg>`,
      table: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M3 15h18M9 3v18M15 3v18"></path></svg>`,
      template: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
      tip: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      note: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      important: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      warning: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      audio: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
      image: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
      ul: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"></line><line x1="9" y1="12" x2="20" y2="12"></line><line x1="9" y1="18" x2="20" y2="18"></line><circle cx="4" cy="6" r="1.5" fill="currentColor"></circle><circle cx="4" cy="12" r="1.5" fill="currentColor"></circle><circle cx="4" cy="18" r="1.5" fill="currentColor"></circle></svg>`,
      ol: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4M4 10h2"></path></svg>`,
      task: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"></rect><polyline points="9 12 11 14 15 9"></polyline></svg>`,
      quote: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1 6-1 8zm14 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2 0 4-1 6-1 8z"></path></svg>`,
      hr: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line></svg>`,
      split: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>`,
      edit: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
      preview: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
      zen: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`,
      zenExit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
      alignLeft: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>`,
      alignCenter: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="18" y1="14" x2="6" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>`,
      alignRight: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="7" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>`,
      eraser: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>`,
      codeSnippet: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
    };

    // Build form field inputs with two-way binding
    let formFieldsHtml = "";
    col.fields.forEach((f) => {
      const val = draft[f.key] != null ? draft[f.key] : (f.defaultValue != null ? f.defaultValue : "");

      if (f.type === "select") {
        let optsList = f.options || [];
        if (typeof optsList === "function") {
          optsList = optsList(draft);
        } else if (f.dynamicOptions === "WRITING_TOPICS" || (f.key === "topic_id" && slug === "WRITING_TASKS")) {
          const topics = getMergedList("WRITING_TOPICS");
          optsList = [
            { v: "", l: "-- Chọn Chủ đề viết (Writing Topic cha) --" },
            ...topics.map(t => ({
              v: t.id || t.code,
              code: t.code,
              l: `[${t.type === "picture" ? "Tả tranh" : "Luyện dịch"} | ${t.level || "A1"}] ${t.title || t.code}`
            }))
          ];
        } else if (f.dynamicOptions === "LISTENING_TOPICS" || (f.key === "topic_id" && slug === "LISTENING_LESSONS")) {
          const topics = getMergedList("LISTENING_TOPICS");
          optsList = [
            { v: "", l: "-- Chọn Chủ đề nghe (Listening Topic cha) --" },
            ...topics.map(t => ({
              v: t.id || t.code,
              code: t.code,
              l: `[${t.level || "A1"}] ${t.title || t.code}`
            }))
          ];
        } else if (f.dynamicOptions === "TRKI_BANK" || (f.key === "test_code" && slug === "TRKI_QUESTION_BANK")) {
          const tests = getMergedList("TRKI_BANK");
          optsList = [
            { v: "", l: "-- Chọn Đề thi TRKI cha liên quan (Bảng trki_tests) --" },
            ...tests.map(t => ({
              v: t.code || t.id,
              code: t.code || t.id,
              l: `[${t.level || "A1"}] ${t.title || t.code || t.id}`
            }))
          ];
        } else if (f.dynamicOptions === "VOCAB_JARS" || f.key === "jar_id") {
          const jars = getMergedList("VOCAB_JARS");
          optsList = [
            { v: "", l: "-- Không thuộc lọ nào (Chỉ lưu trong Kho từ điển) --" },
            ...jars.map(j => ({
              v: j.uuid || j.id || j.code,
              code: j.code,
              l: `[${j.level || "A1"}] ${j.name || j.title || j.code}`
            }))
          ];
        }
        const opts = optsList.map((o) => {
          const isSelected = String(val) === String(o.v) || (o.code && String(val) === String(o.code));
          return `<option value="${escAttr(o.v)}" ${isSelected ? "selected" : ""}>${esc(o.l)}</option>`;
        }).join("");
        formFieldsHtml += `
          <div class="p-field-row">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <select class="p-select live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}">${opts}</select>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "textarea") {
        formFieldsHtml += `
          <div class="p-field-row">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <textarea class="p-textarea live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" rows="4">${esc(val)}</textarea>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "list-lines") {
        const linesVal = Array.isArray(val) ? val.join("\n") : (val || "");
        formFieldsHtml += `
          <div class="p-field-row">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <textarea class="p-textarea live-draft-field-lines" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" rows="5" placeholder="Mỗi dòng là một mục...">${esc(linesVal)}</textarea>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "markdown") {
        const mdVal = draft[f.key] != null
          ? draft[f.key]
          : (draft.content_md != null
            ? draft.content_md
            : (draft.content != null
              ? draft.content
              : (draft.content_markdown != null ? draft.content_markdown : (f.defaultValue != null ? f.defaultValue : ""))));

        const renderedMd = (window.RusiMarkdown && typeof window.RusiMarkdown.render === "function")
          ? window.RusiMarkdown.render(mdVal)
          : `<p>${esc(mdVal)}</p>`;

        const wordCountVal = String(mdVal).trim() ? String(mdVal).trim().split(/\s+/).length : 0;
        const lineCountVal = String(mdVal).split("\n").length;
        const readTimeVal = Math.max(1, Math.ceil(wordCountVal / 180));

        formFieldsHtml += `
            <div class="p-md-editor-wrap" data-md-field="${escAttr(f.key)}">
              <!-- Notion-Inspired Modern Markdown Toolbar (100% Icon Only) -->
              <div class="p-md-toolbar notion-toolbar">
                <div class="p-md-actions-row">
                  <!-- Block insertion menu (icon-only button) -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn notion-tb-primary-btn btn-notion-insert" title="Chèn khối nhanh (/ hoặc click)">
                      ${NOTION_ICONS.plus}
                    </button>
                    <!-- Notion Block Menu Popover -->
                    <div class="notion-menu-popover notion-block-menu" style="display:none">
                      <div class="notion-menu-group-label">MẪU BÀI HỌC TRKI</div>
                      <button type="button" class="notion-menu-item" data-notion-action="template-article">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.template}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Mẫu bài học TRKI chuẩn 5 phần</div>
                          <div class="notion-menu-item-desc">Bối cảnh, Hội thoại mẫu, Bảng từ, Ngữ pháp &amp; Bài tập</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/mau</span>
                      </button>

                      <div class="notion-menu-group-label">HỘP GHI CHÚ CALLOUT</div>
                      <button type="button" class="notion-menu-item" data-notion-action="tip">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.tip}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Mẹo ghi nhớ (Tip)</div>
                          <div class="notion-menu-item-desc">Ghi nhớ mẹo học và bí quyết ngôn ngữ</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/tip</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="note">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.note}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Ghi chú bối cảnh (Note)</div>
                          <div class="notion-menu-item-desc">Giải thích văn hóa và ngữ cảnh giao tiếp</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/note</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="important">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.important}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Lưu ý trọng tâm (Important)</div>
                          <div class="notion-menu-item-desc">Kiến thức quan trọng thi cử cần nhớ</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/luuy</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="warning">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.warning}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Cảnh báo bẫy thi (Warning)</div>
                          <div class="notion-menu-item-desc">Lỗi người học hay sai trong bài kiểm tra</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/baythi</span>
                      </button>

                      <div class="notion-menu-group-label">BẢNG &amp; MEDIA</div>
                      <button type="button" class="notion-menu-item" data-notion-action="table-vocab">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.table}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Bảng từ vựng tiếng Nga 4 cột</div>
                          <div class="notion-menu-item-desc">Từ có trọng âm, loại từ, nghĩa tiếng Việt và ví dụ</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/bangtu</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="table">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.table}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Bảng dữ liệu 3x3</div>
                          <div class="notion-menu-item-desc">Bảng tiêu chuẩn dạng lưới Markdown</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/bang</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="audio">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.audio}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Khung nghe Audio</div>
                          <div class="notion-menu-item-desc">Chèn audio phát âm tiếng Nga trực tiếp</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/audio</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="img">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.image}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Hình ảnh minh họa</div>
                          <div class="notion-menu-item-desc">Chèn ảnh trực quan vào bài đọc</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/anh</span>
                      </button>

                      <div class="notion-menu-group-label">KHỐI CƠ BẢN</div>
                      <button type="button" class="notion-menu-item" data-notion-action="h1">
                        <span class="notion-menu-item-icon"><span class="notion-tag-h">H1</span></span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Tiêu đề 1</div><div class="notion-menu-item-desc">Tiêu đề phần lớn</div></div>
                        <span class="notion-menu-item-shortcut">#</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="h2">
                        <span class="notion-menu-item-icon"><span class="notion-tag-h">H2</span></span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Tiêu đề 2</div><div class="notion-menu-item-desc">Tiêu đề mục vừa</div></div>
                        <span class="notion-menu-item-shortcut">##</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="h3">
                        <span class="notion-menu-item-icon"><span class="notion-tag-h">H3</span></span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Tiêu đề 3</div><div class="notion-menu-item-desc">Tiêu đề mục nhỏ</div></div>
                        <span class="notion-menu-item-shortcut">###</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="ul">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.ul}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Danh sách chấm</div><div class="notion-menu-item-desc">Liệt kê không thứ tự</div></div>
                        <span class="notion-menu-item-shortcut">-</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="ol">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.ol}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Danh sách số</div><div class="notion-menu-item-desc">Liệt kê theo thứ tự từng bước</div></div>
                        <span class="notion-menu-item-shortcut">1.</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="task">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.task}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Việc cần làm (To-do)</div><div class="notion-menu-item-desc">Checklist có ô tích hoàn thành</div></div>
                        <span class="notion-menu-item-shortcut">[]</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="quote">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.quote}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Trích dẫn (Quote)</div><div class="notion-menu-item-desc">Đoạn văn trích dẫn nổi bật</div></div>
                        <span class="notion-menu-item-shortcut">&gt;</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="code">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.code}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Khối mã nguồn (Code)</div><div class="notion-menu-item-desc">Mã hoặc định dạng chuyên biệt</div></div>
                        <span class="notion-menu-item-shortcut">/code</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="hr">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.hr}</span>
                        <div class="notion-menu-item-info"><div class="notion-menu-item-title">Đường phân cách (Divider)</div><div class="notion-menu-item-desc">Phân đoạn nội dung</div></div>
                        <span class="notion-menu-item-shortcut">---</span>
                      </button>
                    </div>
                  </div>

                  <!-- Notion Turn Into Block Dropdown (icon-only button) -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-turninto" title="Chuyển kiểu dòng (Turn into...)">
                      ${NOTION_ICONS.text}
                    </button>
                    <div class="notion-menu-popover notion-turninto-menu" style="display:none;width:220px">
                      <div class="notion-menu-group-label">CHUYỂN KIỂU (TURN INTO)</div>
                      <button type="button" class="notion-menu-item" data-notion-turn="p"><span class="notion-menu-item-icon">${NOTION_ICONS.text}</span><span>Văn bản thường</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="h1"><span class="notion-menu-item-icon"><span class="notion-tag-h">H1</span></span><span>Tiêu đề 1</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="h2"><span class="notion-menu-item-icon"><span class="notion-tag-h">H2</span></span><span>Tiêu đề 2</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="h3"><span class="notion-menu-item-icon"><span class="notion-tag-h">H3</span></span><span>Tiêu đề 3</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="ul"><span class="notion-menu-item-icon">${NOTION_ICONS.ul}</span><span>Danh sách chấm</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="ol"><span class="notion-menu-item-icon">${NOTION_ICONS.ol}</span><span>Danh sách số</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="task"><span class="notion-menu-item-icon">${NOTION_ICONS.task}</span><span>To-do checklist</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="quote"><span class="notion-menu-item-icon">${NOTION_ICONS.quote}</span><span>Trích dẫn</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="tip"><span class="notion-menu-item-icon">${NOTION_ICONS.tip}</span><span>Hộp Tip</span></button>
                      <button type="button" class="notion-menu-item" data-notion-turn="note"><span class="notion-menu-item-icon">${NOTION_ICONS.note}</span><span>Hộp Note</span></button>
                    </div>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Direct Headings & Structure Blocks (All Icon Only) -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn" data-notion-turn="h1" title="Tiêu đề 1 (#)"><strong style="font-size:11px">H1</strong></button>
                    <button type="button" class="notion-tb-btn" data-notion-turn="h2" title="Tiêu đề 2 (##)"><strong style="font-size:11px">H2</strong></button>
                    <button type="button" class="notion-tb-btn" data-notion-turn="h3" title="Tiêu đề 3 (###)"><strong style="font-size:11px">H3</strong></button>
                    <button type="button" class="notion-tb-btn" data-notion-action="ul" title="Danh sách chấm (-)">${NOTION_ICONS.ul}</button>
                    <button type="button" class="notion-tb-btn" data-notion-action="ol" title="Danh sách số (1.)">${NOTION_ICONS.ol}</button>
                    <button type="button" class="notion-tb-btn" data-notion-action="task" title="Việc cần làm (Checklist)">${NOTION_ICONS.task}</button>
                    <button type="button" class="notion-tb-btn" data-notion-action="quote" title="Trích dẫn (&gt;)">${NOTION_ICONS.quote}</button>
                    <button type="button" class="notion-tb-btn" data-notion-action="hr" title="Đường phân cách (---)">${NOTION_ICONS.hr}</button>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Undo / Redo (Notion Style) -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn btn-notion-undo" title="Hoàn tác (Ctrl+Z)">${NOTION_ICONS.undo}</button>
                    <button type="button" class="notion-tb-btn btn-notion-redo" title="Làm lại (Ctrl+Y / Ctrl+Shift+Z)">${NOTION_ICONS.redo}</button>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Inline Typography (Notion Style) -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn" data-action="bold" title="In đậm (Ctrl+B)">${NOTION_ICONS.bold}</button>
                    <button type="button" class="notion-tb-btn" data-action="italic" title="In nghiêng (Ctrl+I)">${NOTION_ICONS.italic}</button>
                    <button type="button" class="notion-tb-btn" data-action="strike" title="Gạch ngang (~~text~~)">${NOTION_ICONS.strike}</button>
                    <button type="button" class="notion-tb-btn" data-action="mark" title="Đánh dấu nổi bật (Highlight)">${NOTION_ICONS.highlight}</button>
                    <button type="button" class="notion-tb-btn" data-action="code-inline" title="Mã trong dòng (inline code)">${NOTION_ICONS.code}</button>
                    <button type="button" class="notion-tb-btn" data-action="link" title="Chèn liên kết (Ctrl+K)">${NOTION_ICONS.link}</button>
                    <button type="button" class="notion-tb-btn" data-action="clear-format" title="Xóa định dạng (Eraser)">${NOTION_ICONS.eraser}</button>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Text Alignment -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn" data-action="align-left" title="Căn lề trái">${NOTION_ICONS.alignLeft}</button>
                    <button type="button" class="notion-tb-btn" data-action="align-center" title="Căn giữa">${NOTION_ICONS.alignCenter}</button>
                    <button type="button" class="notion-tb-btn" data-action="align-right" title="Căn lề phải">${NOTION_ICONS.alignRight}</button>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Russian Accents Dropdown Palette (icon-only button) -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-stress" title="Trọng âm &amp; Ký tự tiếng Nga (Ctrl+Shift+S)">
                      <span class="notion-ru-tb-icon">á</span>
                    </button>
                    <div class="notion-menu-popover notion-stress-menu" style="display:none;width:290px;padding:12px">
                      <div class="notion-stress-header">
                        <span>TRỌNG ÂM TIẾNG NGA</span>
                        <span class="notion-stress-kbd">Ctrl+Shift+S</span>
                      </div>
                      <button type="button" class="notion-stress-quick-apply" data-ru-char="&#769;" title="Dấu trọng âm kết hợp (Ctrl+Shift+S)">
                        <span class="notion-ru-tb-icon">á</span>
                        <span>Gắn dấu trọng âm vào chữ trước</span>
                      </button>
                      <div class="notion-stress-section-sub">NGUYÊN ÂM CÓ TRỌNG ÂM</div>
                      <div class="notion-stress-grid">
                        <button type="button" class="notion-stress-vowel" data-ru-char="а́">а́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="е́">е́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="и́">и́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="о́">о́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="у́">у́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="ы́">ы́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="э́">э́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="ю́">ю́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="я́">я́</button>
                        <button type="button" class="notion-stress-vowel" data-ru-char="ё">ё</button>
                      </div>
                      <div class="notion-stress-section-sub">DẤU CÂU THOẠI &amp; NGOẶC</div>
                      <div class="notion-stress-punct-row">
                        <button type="button" class="notion-stress-punct" data-action="ru-quote" title="Ngoặc kép tiếng Nga">« » <span>Ngoặc kép</span></button>
                        <button type="button" class="notion-stress-punct" data-ru-char="—" title="Gạch ngang thoại tiếng Nga">— <span>Gạch thoại</span></button>
                      </div>
                    </div>
                  </div>

                  <!-- Callouts Dropdown (icon-only button) -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-callout" title="Chèn hộp ghi chú Callout">
                      ${NOTION_ICONS.callout}
                    </button>
                    <div class="notion-menu-popover notion-callout-menu" style="display:none;width:250px">
                      <button type="button" class="notion-menu-item" data-notion-action="tip">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.tip}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Mẹo học (Tip)</div>
                          <div class="notion-menu-item-desc">&gt; [!TIP]</div>
                        </div>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="note">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.note}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Ghi chú (Note)</div>
                          <div class="notion-menu-item-desc">&gt; [!NOTE]</div>
                        </div>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="important">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.important}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Lưu ý trọng tâm</div>
                          <div class="notion-menu-item-desc">&gt; [!IMPORTANT]</div>
                        </div>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="warning">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.warning}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Cảnh báo bẫy thi</div>
                          <div class="notion-menu-item-desc">&gt; [!WARNING]</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Tables Dropdown (icon-only button) -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-table" title="Chèn bảng dữ liệu hoặc từ vựng">
                      ${NOTION_ICONS.table}
                    </button>
                    <div class="notion-menu-popover notion-table-menu" style="display:none;width:260px">
                      <button type="button" class="notion-menu-item" data-notion-action="table-vocab">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.table}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Bảng từ vựng 4 cột</div>
                          <div class="notion-menu-item-desc">Song ngữ Nga - Việt có trọng âm</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/bangtu</span>
                      </button>
                      <button type="button" class="notion-menu-item" data-notion-action="table">
                        <span class="notion-menu-item-icon">${NOTION_ICONS.table}</span>
                        <div class="notion-menu-item-info">
                          <div class="notion-menu-item-title">Bảng dữ liệu 3x3</div>
                          <div class="notion-menu-item-desc">Bảng lưới Markdown tiêu chuẩn</div>
                        </div>
                        <span class="notion-menu-item-shortcut">/bang</span>
                      </button>
                    </div>
                  </div>

                  <!-- Media Buttons -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn" data-notion-action="img" title="Chèn hình ảnh minh họa">${NOTION_ICONS.image}</button>
                    <button type="button" class="notion-tb-btn" data-notion-action="audio" title="Khung nghe Audio tiếng Nga">${NOTION_ICONS.audio}</button>
                  </div>

                  <!-- Modes & Zen (Right-aligned, icon-only) -->
                  <div class="notion-view-modes" style="margin-left:auto">
                    <button type="button" class="notion-view-btn active" data-canvas-mode="wysiwyg" title="Soạn thảo trực quan chuẩn Notion">
                      ${NOTION_ICONS.edit}
                    </button>
                    <button type="button" class="notion-view-btn" data-canvas-mode="raw" title="Xem &amp; sửa mã nguồn Markdown (.md)">
                      ${NOTION_ICONS.codeSnippet}
                    </button>
                    <span class="notion-view-sep"></span>
                    <button type="button" class="notion-zen-btn" data-action="zen" title="Toàn màn hình không xao nhãng (Esc)">${NOTION_ICONS.zen}</button>
                  </div>
                </div>
              </div>

              <!-- Notion Single-Column Document Surface (NO split screen!) -->
              <div class="notion-editor-surface">
                <div class="notion-doc-paper">
                  <div class="notion-canvas rusi-md-rendered" contenteditable="true" spellcheck="false" data-placeholder="Gõ '/' để chèn bảng, callout, ngữ pháp hoặc bắt đầu viết...">
                    ${renderedMd}
                  </div>
                </div>
              </div>

              <!-- Raw Markdown Pane (Hidden by default, for viewing/pasting raw markdown) -->
              <div class="notion-raw-pane" style="display:none">
                <textarea class="p-md-textarea live-draft-field live-markdown-input" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" placeholder="Soạn thảo nội dung bài viết bằng cú pháp Markdown...">${esc(mdVal)}</textarea>
              </div>

              <!-- Floating Slash Palette (Positioned dynamically near cursor) -->
              <div class="notion-slash-palette" style="display:none">
                <div class="notion-slash-header">
                  <span class="notion-slash-icon">/</span>
                  <input type="text" class="notion-slash-filter" placeholder="Tìm khối (bảng, mẹo, ghi chú, h1, h2...)" />
                  <span class="notion-slash-kbd">ESC đóng</span>
                </div>
                <div class="notion-slash-list">
                  <div class="notion-menu-group-label">BẢNG DỮ LIỆU &amp; TỪ VỰNG</div>
                  <button type="button" class="notion-slash-item" data-notion-action="table-vocab">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.table}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Bảng từ vựng tiếng Nga 4 cột</div>
                      <div class="notion-slash-item-desc">Từ trọng âm, loại từ, nghĩa tiếng Việt, ví dụ song ngữ</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/bangtu</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="table">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.table}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Bảng dữ liệu 3x3</div>
                      <div class="notion-slash-item-desc">Bảng bảng biểu tiêu chuẩn</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/bang</span>
                  </button>

                  <div class="notion-menu-group-label">HỘP GHI CHÚ CALLOUT</div>
                  <button type="button" class="notion-slash-item" data-notion-action="tip">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.tip}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Mẹo ghi nhớ (Tip)</div>
                      <div class="notion-slash-item-desc">Hộp mẹo học và bí quyết ngôn ngữ</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/tip</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="note">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.note}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Ghi chú bối cảnh (Note)</div>
                      <div class="notion-slash-item-desc">Giải thích văn hóa và ngữ cảnh giao tiếp</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/note</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="important">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.important}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Lưu ý trọng tâm (Important)</div>
                      <div class="notion-slash-item-desc">Kiến thức thi cử quan trọng</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/luuy</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="warning">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.warning}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Cảnh báo bẫy thi (Warning)</div>
                      <div class="notion-slash-item-desc">Lỗi người học hay sai</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/baythi</span>
                  </button>

                  <div class="notion-menu-group-label">MẪU BÀI HỌC TRKI</div>
                  <button type="button" class="notion-slash-item" data-notion-action="template-article">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.template}</span>
                    <div class="notion-slash-item-info">
                      <div class="notion-slash-item-title">Mẫu bài học TRKI 5 phần</div>
                      <div class="notion-slash-item-desc">Bối cảnh, Hội thoại, Bảng từ, Ngữ pháp, Bài tập</div>
                    </div>
                    <span class="notion-slash-item-shortcut">/mau</span>
                  </button>

                  <div class="notion-menu-group-label">KHỐI VĂN BẢN &amp; TIÊU ĐỀ</div>
                  <button type="button" class="notion-slash-item" data-notion-action="h1">
                    <span class="notion-slash-item-icon"><span class="notion-tag-h">H1</span></span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Tiêu đề 1</div><div class="notion-slash-item-desc">Tiêu đề lớn</div></div>
                    <span class="notion-slash-item-shortcut">#</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="h2">
                    <span class="notion-slash-item-icon"><span class="notion-tag-h">H2</span></span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Tiêu đề 2</div><div class="notion-slash-item-desc">Tiêu đề mục vừa</div></div>
                    <span class="notion-slash-item-shortcut">##</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="h3">
                    <span class="notion-slash-item-icon"><span class="notion-tag-h">H3</span></span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Tiêu đề 3</div><div class="notion-slash-item-desc">Tiêu đề mục nhỏ</div></div>
                    <span class="notion-slash-item-shortcut">###</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="ul">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.ul}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Danh sách chấm</div><div class="notion-slash-item-desc">Liệt kê không thứ tự</div></div>
                    <span class="notion-slash-item-shortcut">-</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="ol">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.ol}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Danh sách số</div><div class="notion-slash-item-desc">Liệt kê theo thứ tự từng bước</div></div>
                    <span class="notion-slash-item-shortcut">1.</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="task">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.task}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Việc cần làm (To-do)</div><div class="notion-slash-item-desc">Checklist có ô tích hoàn thành</div></div>
                    <span class="notion-slash-item-shortcut">[]</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="quote">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.quote}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Trích dẫn (Quote)</div><div class="notion-slash-item-desc">Đoạn văn trích dẫn nổi bật</div></div>
                    <span class="notion-slash-item-shortcut">&gt;</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="hr">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.hr}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Đường phân cách (Divider)</div><div class="notion-slash-item-desc">Phân chia các phần bài viết</div></div>
                    <span class="notion-slash-item-shortcut">---</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="audio">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.audio}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Khung nghe Audio</div><div class="notion-slash-item-desc">Chèn audio phát âm tiếng Nga</div></div>
                    <span class="notion-slash-item-shortcut">/audio</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="img">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.image}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Hình ảnh minh họa</div><div class="notion-slash-item-desc">Chèn ảnh trực quan vào bài đọc</div></div>
                    <span class="notion-slash-item-shortcut">/anh</span>
                  </button>
                  <button type="button" class="notion-slash-item" data-notion-action="code">
                    <span class="notion-slash-item-icon">${NOTION_ICONS.code}</span>
                    <div class="notion-slash-item-info"><div class="notion-slash-item-title">Khối mã nguồn (Code)</div><div class="notion-slash-item-desc">Mã hoặc định dạng chuyên biệt</div></div>
                    <span class="notion-slash-item-shortcut">/code</span>
                  </button>
                </div>
              </div>
            </div>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
        `;
      } else {
        const isIdDisabled = !State.isCreating && (f.key === "id" || f.key === "slug");
        let mediaPreview = "";
        if (f.key === "image_url" && val && typeof val === "string" && val.startsWith("http")) {
          mediaPreview = `
            <div style="margin-top:8px;display:flex;align-items:center;gap:12px;background:var(--p-surface-subtle,#f9fafb);padding:8px 12px;border-radius:8px;border:1px solid var(--p-border-subtle,#e5e7eb)">
              <img src="${escAttr(val)}" alt="Xem trước ảnh đề bài" style="max-height:80px;max-width:140px;border-radius:6px;object-fit:cover;box-shadow:0 2px 4px rgba(0,0,0,0.1)" onerror="this.style.display='none'" />
              <div>
                <div style="font-size:12px;font-weight:600;color:var(--p-text,#1f2937)">Xem trước ảnh đề bài (Storage writing-images)</div>
                <a href="${escAttr(val)}" target="_blank" rel="noopener" style="font-size:11.5px;color:var(--p-primary,#0039A6)">Mở ảnh kích thước gốc ↗</a>
              </div>
            </div>
          `;
        } else if ((f.key === "audio_url" || f.key === "audioUrl") && val && typeof val === "string" && val.startsWith("http")) {
          mediaPreview = `
            <div style="margin-top:8px;background:var(--p-surface-subtle,#f9fafb);padding:8px 12px;border-radius:8px;border:1px solid var(--p-border-subtle,#e5e7eb)">
              <div style="font-size:12px;font-weight:600;margin-bottom:4px;color:var(--p-text,#1f2937)">Nghe thử Audio đề bài:</div>
              <audio controls src="${escAttr(val)}" style="width:100%;height:32px"></audio>
            </div>
          `;
        }

        let uploadBtn = "";
        const isMediaField = (f.key === "audio_url" || f.key === "audioUrl" || f.key === "image_url" || f.key === "image" || f.key === "cover_url" || f.key === "cover" || f.key === "avatar_url");
        if (isMediaField) {
          uploadBtn = `
            <div style="margin-top:6px;display:flex;align-items:center;gap:8px">
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.triggerMediaUpload('${escAttr(f.key)}')" style="font-size:11.5px;padding:4px 10px">
                ${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 13 }) : "☁️"} Tải file lên Supabase Storage
              </button>
              <span id="uploadStatus_${escAttr(f.key)}" style="font-size:11px;color:var(--p-text-muted)"></span>
            </div>
          `;
        }

        formFieldsHtml += `
          <div class="p-field-row">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <input type="${f.type === "number" ? "number" : "text"}" class="p-input live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" value="${escAttr(val)}" ${isIdDisabled ? "readonly style='background:var(--p-surface-hover);cursor:not-allowed'" : ""} />
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
            ${uploadBtn}
            ${mediaPreview}
          </div>
        `;
      }
    });

    const structureHtml = (typeof renderActiveStructureBuilder === "function")
      ? renderActiveStructureBuilder(slug, draft)
      : "";

    if ((slug === "TOPIC_ARTICLES" || !structureHtml) && State.activeEditorTab === "structure") {
      State.activeEditorTab = "content";
    }

    const hasStructure = Boolean(slug !== "TOPIC_ARTICLES" && structureHtml && structureHtml.trim());

    const tabsHtml = hasStructure ? `
      <!-- Editor Tabs -->
      <div class="payload-editor-tabs">
        <button class="payload-editor-tab ${State.activeEditorTab === "content" ? "active" : ""}" data-tab="content" type="button" onclick="window.switchEditorTab('content')">
          ${window.RusiIcons ? RusiIcons.get("file-text", { size: 14 }) : ""} Nội dung chính
        </button>
        <button class="payload-editor-tab ${State.activeEditorTab === "structure" ? "active" : ""}" data-tab="structure" type="button" onclick="window.switchEditorTab('structure')">
          ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 14 }) : ""} ${
            slug === "TRKI_BANK" ? "5 Phân hệ thi TRKI &amp; Đáp án" :
            slug === "VOCABULARIES" ? "Ví dụ câu &amp; Cấu trúc ngữ pháp" :
            slug === "VOCAB_JARS" ? "Danh sách từ vựng trong lọ" :
            slug === "LISTENING_LESSONS" ? "Lời thoại chính tả &amp; Trắc nghiệm" :
            slug === "SPEAKING_SETS" ? "Danh sách câu luyện nói Shadowing" :
            slug === "WRITING_TASKS" ? "Gợi ý, Từ vựng &amp; AI Rubric" :
            slug === "PACKAGES" ? "Danh sách quyền lợi gói" :
            slug === "SHOP_PRODUCTS" ? "Thông số &amp; Quyền lợi sách" :
            "Cấu trúc dữ liệu chi tiết"
          }
        </button>
      </div>
    ` : "";

    container.innerHTML = `
      <div class="payload-doc-editor is-article-studio">
        <!-- Main Content Area -->
        <div class="payload-doc-main">
          ${tabsHtml}

          <!-- Tab 1: Content Fields -->
          <div id="tabContent" style="display:${State.activeEditorTab === "content" ? "block" : "none"}">
            <form id="docForm">
              ${formFieldsHtml}
            </form>
          </div>

          <!-- Tab 2: Structure / Array Builder (khi có cấu trúc chi tiết) -->
          ${hasStructure ? `
          <div id="tabStructure" style="display:${State.activeEditorTab === "structure" ? "block" : "none"}">
            ${structureHtml}
          </div>
          ` : ""}
        </div>
      </div>
    `;

    // Bind two-way live field inputs
    document.querySelectorAll(".live-draft-field").forEach((inp) => {
      inp.oninput = (e) => {
        const key = e.target.getAttribute("data-key");
        const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        State.currentDraft[key] = val;
      };
      inp.onchange = (e) => {
        const key = e.target.getAttribute("data-key");
        const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        State.currentDraft[key] = val;
      };
    });

    document.querySelectorAll(".live-draft-field-lines").forEach((inp) => {
      inp.oninput = (e) => {
        const key = e.target.getAttribute("data-key");
        State.currentDraft[key] = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean);
      };
    });

    // Auto-generate Slug/ID thông minh khi tạo mới
    if (State.isCreating) {
      const titleInp = document.querySelector('.live-draft-field[data-key="title"]') || document.querySelector('.live-draft-field[data-key="name"]');
      const idInp = document.querySelector('.live-draft-field[data-key="id"]') || document.querySelector('.live-draft-field[data-key="slug"]');
      if (titleInp && idInp) {
        let manualChanged = false;
        idInp.addEventListener("input", () => { manualChanged = true; });
        titleInp.addEventListener("input", (e) => {
          if (!manualChanged) {
            const prefix = slug === "TRKI_BANK" ? "trki_" : slug === "VOCAB_JARS" ? "jar_" : (slug === "TOPIC_ARTICLES" ? "" : (slug.toLowerCase() + "_"));
            const generated = prefix + slugify(e.target.value);
            if (generated.length > prefix.length) {
              idInp.value = generated;
              State.currentDraft[idInp.getAttribute("data-key")] = generated;
            }
          }
        });
      }
    }

    const jsonArea = document.getElementById("jsonEditorArea");
    if (jsonArea) {
      jsonArea.onchange = () => {
        try {
          const parsed = JSON.parse(jsonArea.value);
          State.currentDraft = parsed;
        } catch (e) {
          // Keep draft as is
        }
      };
    }

    // =========================================================================
    // NOTION-STYLE WYSIWYG DOCUMENT CANVAS & TWO-WAY MARKDOWN SYNC
    // =========================================================================
    function inlineNodeToMarkdown(node) {
      if (!node) return "";
      if (node.nodeType === 3) return node.nodeValue;
      if (node.nodeType !== 1) return "";

      const tag = node.tagName.toLowerCase();
      if (node.classList && (
        node.classList.contains("notion-ui-helper") ||
        node.classList.contains("notion-table-toolbar") ||
        node.classList.contains("notion-callout-del") ||
        node.classList.contains("notion-slash-palette")
      )) {
        return "";
      }

      if (tag === "br") return "\n";

      const inner = Array.from(node.childNodes).map(inlineNodeToMarkdown).join("");

      if (tag === "strong" || tag === "b") return `**${inner.trim()}**`;
      if (tag === "em" || tag === "i") return `*${inner.trim()}*`;
      if (tag === "del" || tag === "s" || tag === "strike") return `~~${inner.trim()}~~`;
      if (tag === "code" && !node.closest("pre")) return `\`${inner.trim()}\``;
      if (tag === "a") {
        const href = node.getAttribute("href") || "#";
        return `[${inner.trim() || href}](${href})`;
      }
      if (tag === "img") {
        const src = node.getAttribute("src") || "";
        const alt = node.getAttribute("alt") || "";
        return `![${alt}](${src})`;
      }
      if (tag === "mark") return `<mark>${inner.trim()}</mark>`;

      return inner;
    }

    function blockNodeToMarkdown(node) {
      if (!node) return "";
      if (node.nodeType === 3) {
        const text = node.nodeValue.trim();
        return text ? `${text}\n\n` : "";
      }
      if (node.nodeType !== 1) return "";

      if (node.classList && (
        node.classList.contains("notion-ui-helper") ||
        node.classList.contains("notion-slash-palette") ||
        node.classList.contains("notion-table-toolbar")
      )) {
        return "";
      }

      const tag = node.tagName.toLowerCase();

      // Headings
      if (tag === "h1") return `# ${inlineNodeToMarkdown(node).trim()}\n\n`;
      if (tag === "h2") return `## ${inlineNodeToMarkdown(node).trim()}\n\n`;
      if (tag === "h3") return `### ${inlineNodeToMarkdown(node).trim()}\n\n`;
      if (tag === "h4") return `#### ${inlineNodeToMarkdown(node).trim()}\n\n`;

      // Horizontal rule
      if (tag === "hr") return `---\n\n`;

      // Code block
      if (tag === "pre") {
        const codeEl = node.querySelector("code");
        const codeText = codeEl ? codeEl.textContent : node.textContent;
        return "```\n" + codeText.trim() + "\n```\n\n";
      }

      // Audio tag
      if (tag === "audio") {
        const src = node.getAttribute("src") || "";
        return `<audio controls src="${src}"></audio>\n\n`;
      }

      // Callout box
      if (node.classList && node.classList.contains("rusi-md-callout")) {
        let alertType = "NOTE";
        if (node.classList.contains("rusi-md-callout-tip")) alertType = "TIP";
        else if (node.classList.contains("rusi-md-callout-warning")) alertType = "WARNING";
        else if (node.classList.contains("rusi-md-callout-important")) alertType = "IMPORTANT";
        else if (node.classList.contains("rusi-md-callout-caution")) alertType = "CAUTION";

        const textEl = node.querySelector(".rusi-md-callout-text") || node.querySelector(".rusi-md-callout-body") || node;
        const rawText = inlineNodeToMarkdown(textEl).trim();
        const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) return `> [!${alertType}]\n> \n\n`;
        const quoteLines = lines.map(l => `> ${l}`).join("\n");
        return `> [!${alertType}]\n${quoteLines}\n\n`;
      }

      // Blockquote
      if (tag === "blockquote") {
        const rawText = inlineNodeToMarkdown(node).trim();
        const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) return "";
        const quoteLines = lines.map(l => `> ${l}`).join("\n");
        return `${quoteLines}\n\n`;
      }

      // Tables
      let tableEl = tag === "table" ? node : node.querySelector("table");
      if (tableEl) {
        const rows = Array.from(tableEl.querySelectorAll("tr"));
        if (rows.length === 0) return "";
        let tableMd = "";
        let colCount = 0;
        rows.forEach((tr, rIdx) => {
          if (tr.classList.contains("notion-ui-helper")) return;
          const cells = Array.from(tr.querySelectorAll("th, td"));
          if (cells.length === 0) return;
          if (rIdx === 0) colCount = cells.length;
          const rowText = cells.map(c => inlineNodeToMarkdown(c).trim().replace(/\|/g, "\\|")).join(" | ");
          tableMd += `| ${rowText} |\n`;
          if (rIdx === 0) {
            const sep = Array(cells.length || colCount || 3).fill("---").join(" | ");
            tableMd += `| ${sep} |\n`;
          }
        });
        return `${tableMd}\n`;
      }

      // Lists
      if (tag === "ul") {
        const items = Array.from(node.querySelectorAll(":scope > li"));
        let listMd = "";
        items.forEach(li => {
          const text = inlineNodeToMarkdown(li).trim();
          if (text) listMd += `- ${text}\n`;
        });
        return listMd ? `${listMd}\n` : "";
      }

      if (tag === "ol") {
        const items = Array.from(node.querySelectorAll(":scope > li"));
        let listMd = "";
        items.forEach((li, idx) => {
          const text = inlineNodeToMarkdown(li).trim();
          if (text) listMd += `${idx + 1}. ${text}\n`;
        });
        return listMd ? `${listMd}\n` : "";
      }

      // Standard paragraph or div container
      if (tag === "p" || tag === "div") {
        const blockTags = ["H1","H2","H3","H4","P","DIV","TABLE","UL","OL","BLOCKQUOTE","PRE","HR"];
        const hasBlockChildren = Array.from(node.children).some(child => blockTags.includes(child.tagName));
        if (hasBlockChildren) {
          return Array.from(node.childNodes).map(blockNodeToMarkdown).join("");
        }
        const pText = inlineNodeToMarkdown(node).trim();
        return pText ? `${pText}\n\n` : "";
      }

      const defaultText = inlineNodeToMarkdown(node).trim();
      return defaultText ? `${defaultText}\n\n` : "";
    }

    window.domToMarkdown = function(canvasEl) {
      if (!canvasEl) return "";
      let md = "";
      Array.from(canvasEl.childNodes).forEach(node => {
        md += blockNodeToMarkdown(node);
      });
      return md.replace(/\n{3,}/g, "\n\n").trim();
    };

    // Helper: Enhance visual elements (interactive table controls & callouts)
    function enhanceCanvasElements(canvas) {
      if (!canvas) return;

      // Enhance tables ("như bảng là ra bảng liền")
      canvas.querySelectorAll("table").forEach((tbl) => {
        tbl.classList.add("rusi-md-table", "notion-interactive-table");
        tbl.setAttribute("contenteditable", "true");

        // Đảm bảo từng ô có contenteditable
        tbl.querySelectorAll("th, td").forEach((cell) => {
          cell.setAttribute("contenteditable", "true");
        });

        // Bọc trong .notion-table-wrapper nếu chưa có
        let wrapper = tbl.closest(".notion-table-wrapper");
        if (!wrapper) {
          wrapper = document.createElement("div");
          wrapper.className = "topic-vocab-table-wrapper notion-table-wrapper";
          wrapper.setAttribute("contenteditable", "false");
          tbl.parentNode.insertBefore(wrapper, tbl);
          wrapper.appendChild(tbl);
        }

        // Gắn thanh công cụ bảng nếu chưa có
        if (!wrapper.querySelector(".notion-table-toolbar")) {
          const tb = document.createElement("div");
          tb.className = "notion-table-toolbar notion-ui-helper";
          tb.setAttribute("contenteditable", "false");
          tb.innerHTML = `
            <button type="button" class="notion-tbl-btn btn-add-row" title="Thêm 1 dòng mới vào cuối bảng">+ Thêm dòng</button>
            <button type="button" class="notion-tbl-btn btn-add-col" title="Thêm 1 cột mới vào bên phải">+ Thêm cột</button>
            <button type="button" class="notion-tbl-btn btn-del-row" title="Xóa dòng hiện tại">- Xóa dòng</button>
            <button type="button" class="notion-tbl-btn btn-del-tbl" title="Xóa toàn bộ bảng này">🗑️ Xóa bảng</button>
          `;
          wrapper.insertBefore(tb, wrapper.firstChild);
        }
      });

      // Enhance callout blocks
      canvas.querySelectorAll(".rusi-md-callout").forEach((callout) => {
        callout.classList.add("notion-callout-block");
        callout.setAttribute("contenteditable", "false");

        const textEl = callout.querySelector(".rusi-md-callout-text") || callout.querySelector(".rusi-md-callout-body");
        if (textEl) {
          textEl.setAttribute("contenteditable", "true");
        }

        if (!callout.querySelector(".notion-callout-del")) {
          const delBtn = document.createElement("button");
          delBtn.type = "button";
          delBtn.className = "notion-callout-del notion-ui-helper";
          delBtn.title = "Xóa hộp ghi chú này";
          delBtn.innerHTML = "✕";
          callout.appendChild(delBtn);
        }
      });
    }

    // Bind Modern Notion WYSIWYG Markdown editors
    document.querySelectorAll(".p-md-editor-wrap").forEach((wrap) => {
      const fieldKey = wrap.dataset.mdField;
      const canvas = wrap.querySelector(".notion-canvas");
      const textarea = wrap.querySelector(".live-markdown-input");
      const surface = wrap.querySelector(".notion-editor-surface");
      const rawPane = wrap.querySelector(".notion-raw-pane");
      const slashPalette = wrap.querySelector(".notion-slash-palette");
      const slashFilter = wrap.querySelector(".notion-slash-filter");
      const charCount = wrap.querySelector(".md-char-count");
      const wordCount = wrap.querySelector(".md-word-count");
      const lineCount = wrap.querySelector(".md-line-count");
      const readTime = wrap.querySelector(".md-read-time");

      // =========================================================================
      // NOTION HISTORY MANAGER (UNDO / REDO STACK)
      // =========================================================================
      const historyStack = [];
      let historyIndex = -1;
      let isRestoringHistory = false;
      const MAX_HISTORY = 60;

      const pushHistorySnapshot = () => {
        if (!canvas || isRestoringHistory) return;
        const currentHtml = canvas.innerHTML;
        if (historyIndex >= 0 && historyStack[historyIndex] === currentHtml) return;
        historyStack.splice(historyIndex + 1);
        historyStack.push(currentHtml);
        if (historyStack.length > MAX_HISTORY) {
          historyStack.shift();
        } else {
          historyIndex++;
        }
      };

      const doUndo = () => {
        if (!canvas) return;
        if (historyIndex > 0) {
          historyIndex--;
          isRestoringHistory = true;
          canvas.innerHTML = historyStack[historyIndex];
          enhanceCanvasElements(canvas);
          syncCanvasToMarkdown();
          isRestoringHistory = false;
          toast("Đã hoàn tác (Undo)");
        } else {
          toast("Không còn thao tác nào để hoàn tác", "info");
        }
      };

      const doRedo = () => {
        if (!canvas) return;
        if (historyIndex < historyStack.length - 1) {
          historyIndex++;
          isRestoringHistory = true;
          canvas.innerHTML = historyStack[historyIndex];
          enhanceCanvasElements(canvas);
          syncCanvasToMarkdown();
          isRestoringHistory = false;
          toast("Đã làm lại (Redo)");
        } else {
          toast("Không còn thao tác nào để làm lại", "info");
        }
      };

      // Khởi tạo các phần tử tương tác trên canvas & lưu snapshot đầu tiên
      if (canvas) {
        enhanceCanvasElements(canvas);
        pushHistorySnapshot();
      }

      // Hàm đồng bộ canvas sang markdown và State.currentDraft
      const syncCanvasToMarkdown = (shouldUpdateCounters = true) => {
        if (!canvas) return "";
        const md = window.domToMarkdown(canvas);
        if (textarea) textarea.value = md;
        State.currentDraft[fieldKey] = md;
        if (fieldKey === "content_md" || fieldKey === "content" || fieldKey === "content_markdown") {
          State.currentDraft.content_md = md;
          State.currentDraft.content = md;
          State.currentDraft.content_markdown = md;
        }

        if (shouldUpdateCounters) {
          const words = md.trim() ? md.trim().split(/\s+/).length : 0;
          const lines = md.split("\n").length;
          if (charCount) charCount.textContent = md.length;
          if (wordCount) wordCount.textContent = words;
          if (lineCount) lineCount.textContent = lines;
          if (readTime) readTime.textContent = `~${Math.max(1, Math.ceil(words / 180))} phút đọc`;
        }
        return md;
      };

      // Tự động đồng bộ từ textarea khi người dùng sửa ở tab mã Markdown
      const syncTextareaToDraft = () => {
        if (!textarea) return;
        const text = textarea.value;
        State.currentDraft[fieldKey] = text;
        if (fieldKey === "content_md" || fieldKey === "content" || fieldKey === "content_markdown") {
          State.currentDraft.content_md = text;
          State.currentDraft.content = text;
          State.currentDraft.content_markdown = text;
        }
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split("\n").length;
        if (charCount) charCount.textContent = text.length;
        if (wordCount) wordCount.textContent = words;
        if (lineCount) lineCount.textContent = lines;
        if (readTime) readTime.textContent = `~${Math.max(1, Math.ceil(words / 180))} phút đọc`;
      };

      if (textarea) {
        textarea.addEventListener("input", syncTextareaToDraft);
      }

      // Lắng nghe thay đổi nội dung trực tiếp trên Notion Canvas
      let inputDebounceTimer = null;
      let historyDebounceTimer = null;
      if (canvas) {
        canvas.addEventListener("input", () => {
          clearTimeout(inputDebounceTimer);
          inputDebounceTimer = setTimeout(() => {
            syncCanvasToMarkdown();
          }, 150);

          clearTimeout(historyDebounceTimer);
          historyDebounceTimer = setTimeout(() => {
            pushHistorySnapshot();
          }, 350);
        });
      }

      // Xử lý các thao tác click trực tiếp trên bảng & callout
      if (canvas) {
        canvas.addEventListener("click", (e) => {
          const btnAddRow = e.target.closest(".btn-add-row");
          const btnAddCol = e.target.closest(".btn-add-col");
          const btnDelRow = e.target.closest(".btn-del-row");
          const btnDelTbl = e.target.closest(".btn-del-tbl");
          const btnDelCallout = e.target.closest(".notion-callout-del");

          if (btnAddRow) {
            e.preventDefault();
            const wrapTbl = btnAddRow.closest(".notion-table-wrapper");
            if (!wrapTbl) return;
            const tbl = wrapTbl.querySelector("table");
            if (!tbl) return;
            let tbody = tbl.querySelector("tbody");
            if (!tbody) {
              tbody = document.createElement("tbody");
              tbl.appendChild(tbody);
            }
            const colCount = (tbl.querySelector("thead tr") ? tbl.querySelector("thead tr").children.length : 4) || 4;
            const newTr = document.createElement("tr");
            for (let c = 0; c < colCount; c++) {
              const td = document.createElement("td");
              td.setAttribute("contenteditable", "true");
              td.innerHTML = "&nbsp;";
              newTr.appendChild(td);
            }
            tbody.appendChild(newTr);
            const firstTd = newTr.querySelector("td");
            if (firstTd) firstTd.focus();
            syncCanvasToMarkdown();
            pushHistorySnapshot();
            return;
          }

          if (btnAddCol) {
            e.preventDefault();
            const wrapTbl = btnAddCol.closest(".notion-table-wrapper");
            if (!wrapTbl) return;
            const tbl = wrapTbl.querySelector("table");
            if (!tbl) return;
            const theadTr = tbl.querySelector("thead tr");
            if (theadTr) {
              const th = document.createElement("th");
              th.setAttribute("contenteditable", "true");
              th.textContent = `Cột ${theadTr.children.length + 1}`;
              theadTr.appendChild(th);
            }
            const bodyRows = tbl.querySelectorAll("tbody tr");
            bodyRows.forEach((tr) => {
              const td = document.createElement("td");
              td.setAttribute("contenteditable", "true");
              td.innerHTML = "&nbsp;";
              tr.appendChild(td);
            });
            syncCanvasToMarkdown();
            pushHistorySnapshot();
            return;
          }

          if (btnDelRow) {
            e.preventDefault();
            const wrapTbl = btnDelRow.closest(".notion-table-wrapper");
            if (!wrapTbl) return;
            const tbl = wrapTbl.querySelector("table");
            if (!tbl) return;
            const tbody = tbl.querySelector("tbody");
            if (!tbody || tbody.rows.length <= 1) {
              toast("Bảng cần giữ lại ít nhất 1 dòng nội dung.", "warning");
              return;
            }
            const activeEl = document.activeElement;
            let targetTr = activeEl && activeEl.closest("tbody tr");
            if (!targetTr || !tbody.contains(targetTr)) {
              targetTr = tbody.rows[tbody.rows.length - 1];
            }
            if (targetTr) targetTr.remove();
            syncCanvasToMarkdown();
            pushHistorySnapshot();
            return;
          }

          if (btnDelTbl) {
            e.preventDefault();
            const wrapTbl = btnDelTbl.closest(".notion-table-wrapper");
            if (wrapTbl && confirm("Bạn có chắc chắn muốn xóa toàn bộ bảng này không?")) {
              wrapTbl.remove();
              syncCanvasToMarkdown();
              pushHistorySnapshot();
            }
            return;
          }

          if (btnDelCallout) {
            e.preventDefault();
            const callout = btnDelCallout.closest(".rusi-md-callout");
            if (callout) {
              callout.remove();
              syncCanvasToMarkdown();
              pushHistorySnapshot();
            }
            return;
          }
        });
      }

      // Click trên notion-doc-paper hoặc notion-editor-surface để focus vào cuối canvas
      const paper = wrap.querySelector(".notion-doc-paper");
      if (paper && canvas) {
        paper.addEventListener("click", (e) => {
          if (e.target.closest("button, a, input, select, textarea, .notion-ui-helper, .notion-table-toolbar, .notion-callout-del, table, th, td")) {
            return;
          }
          if (e.target === paper || e.target === surface || e.target === canvas) {
            canvas.focus();
            const lastChild = canvas.lastElementChild;
            const sel = window.getSelection();
            const range = document.createRange();
            if (!lastChild) {
              const p = document.createElement("p");
              p.innerHTML = "<br>";
              canvas.appendChild(p);
              range.selectNodeContents(p);
              range.collapse(false);
            } else if (lastChild.classList.contains("notion-table-wrapper") || lastChild.classList.contains("notion-callout-block") || lastChild.tagName === "PRE" || lastChild.tagName === "HR") {
              const p = document.createElement("p");
              p.innerHTML = "<br>";
              canvas.appendChild(p);
              range.selectNodeContents(p);
              range.collapse(false);
            } else {
              range.selectNodeContents(lastChild);
              range.collapse(false);
            }
            if (sel) {
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
        });
      }

      // Xử lý phím tắt trong Canvas (Tab bảng, Esc, Enter Slash, Ctrl+Z, Ctrl+Y)
      const handleEditorKeydown = (e) => {
        // Ctrl/Cmd + Z => Undo (khi không giữ Shift)
        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
          if (canvas && (!rawPane || rawPane.style.display !== "block")) {
            e.preventDefault();
            doUndo();
            return;
          }
        }

        // Ctrl/Cmd + Y hoặc Ctrl/Cmd + Shift + Z => Redo
        if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
            ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")) {
          if (canvas && (!rawPane || rawPane.style.display !== "block")) {
            e.preventDefault();
            doRedo();
            return;
          }
        }

        // Tab chuyển ô trong bảng và tự thêm dòng ở ô cuối cùng
        if (e.key === "Tab") {
          const cell = document.activeElement && document.activeElement.closest("th, td");
          if (cell) {
            const table = cell.closest("table");
            if (table) {
              e.preventDefault();
              const allCells = Array.from(table.querySelectorAll("th, td"));
              const currIdx = allCells.indexOf(cell);
              if (!e.shiftKey) {
                if (currIdx < allCells.length - 1) {
                  allCells[currIdx + 1].focus();
                } else {
                  // Auto-append new row when pressing Tab on the last cell!
                  const wrapTbl = table.closest(".notion-table-wrapper");
                  const btnAdd = wrapTbl ? wrapTbl.querySelector(".btn-add-row") : null;
                  if (btnAdd) btnAdd.click();
                }
              } else {
                if (currIdx > 0) {
                  allCells[currIdx - 1].focus();
                }
              }
              return;
            }
          }
        }

        // Phím tắt Ctrl/Cmd + B / I / Shift+S
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
          e.preventDefault();
          document.execCommand("bold");
          syncCanvasToMarkdown();
          pushHistorySnapshot();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
          e.preventDefault();
          document.execCommand("italic");
          syncCanvasToMarkdown();
          pushHistorySnapshot();
          return;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s") {
          e.preventDefault();
          insertRussianChar("\u0301");
          return;
        }

        // Phím Esc đóng menu và thoát Zen mode
        if (e.key === "Escape") {
          hideSlashPalette();
          hideAllNotionPopovers();
          if (wrap.classList.contains("fullscreen-mode")) {
            e.preventDefault();
            wrap.classList.remove("fullscreen-mode");
            const zenBtn = wrap.querySelector(".p-md-zen-btn, .notion-zen-btn");
            if (zenBtn) zenBtn.innerHTML = NOTION_ICONS.zen;
          }
          return;
        }

        // Điều hướng phím mũi tên và Enter khi menu Slash đang mở
        if (slashPalette && slashPalette.style.display !== "none") {
          const visibleItems = Array.from(slashPalette.querySelectorAll(".notion-slash-item")).filter(it => it.style.display !== "none");
          let activeIdx = visibleItems.findIndex(it => it.classList.contains("active"));

          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (activeIdx < visibleItems.length - 1) activeIdx++;
            else activeIdx = 0;
            visibleItems.forEach((it, i) => it.classList.toggle("active", i === activeIdx));
            if (visibleItems[activeIdx]) visibleItems[activeIdx].scrollIntoView({ block: "nearest" });
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeIdx > 0) activeIdx--;
            else activeIdx = visibleItems.length - 1;
            visibleItems.forEach((it, i) => it.classList.toggle("active", i === activeIdx));
            if (visibleItems[activeIdx]) visibleItems[activeIdx].scrollIntoView({ block: "nearest" });
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            const selectedItem = visibleItems[activeIdx] || visibleItems[0];
            if (selectedItem) {
              executeBlockAction(selectedItem.dataset.notionAction);
            }
            return;
          }
        }
      };

      if (canvas) {
        canvas.addEventListener("keydown", handleEditorKeydown);
      }
      wrap.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "y")) {
          handleEditorKeydown(e);
        }
      });

      // Gắn sự kiện các nút Hoàn tác & Làm lại trên toolbar
      const btnUndo = wrap.querySelector(".btn-notion-undo");
      const btnRedo = wrap.querySelector(".btn-notion-redo");
      if (btnUndo) btnUndo.onclick = () => doUndo();
      if (btnRedo) btnRedo.onclick = () => doRedo();

      // Xử lý Floating Slash Command Menu (Gõ '/' là ra ngay)
      let slashTextNode = null;
      let slashCharIndex = -1;

      const hideSlashPalette = () => {
        if (!slashPalette) return;
        slashPalette.style.display = "none";
        if (slashFilter) slashFilter.value = "";
      };

      const showSlashPaletteNearCursor = (range, query = "") => {
        if (!slashPalette) return;

        let rect = null;
        if (slashTextNode && slashCharIndex >= 0) {
          try {
            const charRange = document.createRange();
            charRange.setStart(slashTextNode, slashCharIndex);
            charRange.setEnd(slashTextNode, Math.min(slashTextNode.nodeValue.length, slashCharIndex + 1));
            const cr = charRange.getBoundingClientRect();
            if (cr && (cr.width > 0 || cr.height > 0 || cr.top > 0 || cr.left > 0)) {
              rect = cr;
            }
          } catch (err) {}
        }
        if (!rect || (rect.width === 0 && rect.height === 0 && rect.top === 0 && rect.left === 0)) {
          const r = range.getBoundingClientRect();
          if (r && (r.width > 0 || r.height > 0 || r.top > 0 || r.left > 0)) {
            rect = r;
          }
        }
        if (!rect || (rect.width === 0 && rect.height === 0 && rect.top === 0 && rect.left === 0)) {
          if (range.startContainer && range.startContainer.parentElement) {
            rect = range.startContainer.parentElement.getBoundingClientRect();
          }
        }

        const wrapRect = wrap.getBoundingClientRect();
        if (!rect || (rect.top === 0 && rect.bottom === 0)) {
          rect = { top: wrapRect.top + 50, bottom: wrapRect.top + 70, left: wrapRect.left + 20, right: wrapRect.left + 40, width: 20, height: 20 };
        }

        const paletteWidth = 330;
        const paletteHeight = 360;

        let top = (rect.bottom - wrapRect.top + 6);
        let left = (rect.left - wrapRect.left);

        // If near bottom of browser viewport, flip above cursor
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 340 && rect.top > 320) {
          top = Math.max(10, rect.top - wrapRect.top - paletteHeight - 6);
        }

        // Ensure inside wrap bounds
        if (left + paletteWidth > wrapRect.width - 16) {
          left = Math.max(12, wrapRect.width - paletteWidth - 16);
        }
        if (left < 12) left = 12;

        slashPalette.style.top = `${Math.round(top)}px`;
        slashPalette.style.left = `${Math.round(left)}px`;
        slashPalette.style.display = "flex";

        filterSlashItems(query);
      };

      const filterSlashItems = (query = "") => {
        if (!slashPalette) return;
        const cleanQ = query.trim().toLowerCase();
        const items = slashPalette.querySelectorAll(".notion-slash-item");
        let hasMatch = false;

        items.forEach((it, idx) => {
          const title = (it.querySelector(".notion-slash-item-title")?.textContent || "").toLowerCase();
          const desc = (it.querySelector(".notion-slash-item-desc")?.textContent || "").toLowerCase();
          const shortcut = (it.querySelector(".notion-slash-item-shortcut")?.textContent || "").toLowerCase();
          const action = (it.dataset.notionAction || "").toLowerCase();

          const isMatch = !cleanQ || title.includes(cleanQ) || desc.includes(cleanQ) || shortcut.includes(cleanQ) || action.includes(cleanQ);
          it.style.display = isMatch ? "flex" : "none";
          if (isMatch && !hasMatch) {
            it.classList.add("active");
            hasMatch = true;
          } else {
            it.classList.remove("active");
          }
        });

        // Ẩn nhóm nếu không có item nào hiển thị
        slashPalette.querySelectorAll(".notion-menu-group-label").forEach((lbl) => {
          let next = lbl.nextElementSibling;
          let groupHasVisible = false;
          while (next && !next.classList.contains("notion-menu-group-label")) {
            if (next.classList.contains("notion-slash-item") && next.style.display !== "none") {
              groupHasVisible = true;
              break;
            }
            next = next.nextElementSibling;
          }
          lbl.style.display = groupHasVisible ? "block" : "none";
        });
      };

      // Bắt sự kiện gõ '/' trong canvas
      if (canvas) {
        canvas.addEventListener("keyup", (e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === "Escape") return;
          const sel = window.getSelection();
          if (!sel || sel.rangeCount === 0) return;
          const range = sel.getRangeAt(0);
          const node = range.startContainer;

          if (node.nodeType === 3) {
            const text = node.nodeValue;
            const offset = range.startOffset;
            const lastSlash = text.lastIndexOf("/", offset - 1);
            if (lastSlash !== -1) {
              const charBefore = lastSlash > 0 ? text[lastSlash - 1] : "\n";
              if (charBefore === " " || charBefore === "\n" || charBefore === "\u00A0" || lastSlash === 0) {
                slashTextNode = node;
                slashCharIndex = lastSlash;
                const query = text.substring(lastSlash + 1, offset);
                showSlashPaletteNearCursor(range, query);
                return;
              }
            }
          }
          hideSlashPalette();
        });
      }

      // Xử lý ô tìm kiếm trong slash palette nếu gõ trực tiếp vào
      if (slashFilter) {
        slashFilter.addEventListener("input", () => {
          filterSlashItems(slashFilter.value);
        });
      }

      // Chèn khối visual HTML trực tiếp vào vị trí con trỏ ("như bảng là ra bảng liền")
      const insertVisualBlockHtml = (html) => {
        // Dọn dẹp ký tự '/' và từ khóa tìm kiếm đã gõ
        if (slashTextNode && slashCharIndex >= 0) {
          try {
            const sel = window.getSelection();
            const currOffset = (sel && sel.rangeCount > 0) ? sel.getRangeAt(0).startOffset : slashCharIndex + 1;
            const original = slashTextNode.nodeValue;
            slashTextNode.nodeValue = original.substring(0, slashCharIndex) + original.substring(currOffset);
          } catch (err) {
            // fallback
          }
        }
        hideSlashPalette();
        slashTextNode = null;
        slashCharIndex = -1;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const frag = document.createDocumentFragment();
        let firstFocusable = null;

        while (tempDiv.firstChild) {
          const child = tempDiv.firstChild;
          frag.appendChild(child);
          if (!firstFocusable && child.nodeType === 1) {
            firstFocusable = child.querySelector("th, td, .rusi-md-callout-text, p, h1, h2, h3, li") || child;
          }
        }

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && canvas.contains(sel.getRangeAt(0).commonAncestorContainer)) {
          const range = sel.getRangeAt(0);
          range.collapse(false);
          range.insertNode(frag);
        } else {
          canvas.appendChild(frag);
        }

        enhanceCanvasElements(canvas);

        if (firstFocusable) {
          firstFocusable.focus();
        }
        syncCanvasToMarkdown();
        pushHistorySnapshot();
      };

      // Hành động chèn khối tương tác
      const executeBlockAction = (act) => {
        hideAllNotionPopovers();
        hideSlashPalette();

        if (act === "table-vocab") {
          // Bảng từ vựng 4 cột song ngữ tiếng Nga có trọng âm ("như bảng là ra bảng liền")
          const vocabTblHtml = `
            <div class="topic-vocab-table-wrapper notion-table-wrapper" contenteditable="false">
              <div class="notion-table-toolbar notion-ui-helper" contenteditable="false">
                <button type="button" class="notion-tbl-btn btn-add-row" title="Thêm 1 dòng mới vào cuối bảng">+ Thêm dòng</button>
                <button type="button" class="notion-tbl-btn btn-add-col" title="Thêm 1 cột mới vào bên phải">+ Thêm cột</button>
                <button type="button" class="notion-tbl-btn btn-del-row" title="Xóa dòng hiện tại">- Xóa dòng</button>
                <button type="button" class="notion-tbl-btn btn-del-tbl" title="Xóa toàn bộ bảng">🗑️ Xóa bảng</button>
              </div>
              <table class="topic-vocab-table rusi-md-table notion-interactive-table" contenteditable="true">
                <thead>
                  <tr>
                    <th contenteditable="true">Từ tiếng Nga (Trọng âm)</th>
                    <th contenteditable="true">Từ loại</th>
                    <th contenteditable="true">Nghĩa tiếng Việt</th>
                    <th contenteditable="true">Câu ví dụ song ngữ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td contenteditable="true"><strong>студе́нт</strong></td>
                    <td contenteditable="true">сущ. м.</td>
                    <td contenteditable="true">sinh viên nam</td>
                    <td contenteditable="true">Он ру́сский студе́нт.</td>
                  </tr>
                  <tr>
                    <td contenteditable="true"><strong>кни́га</strong></td>
                    <td contenteditable="true">сущ. ж.</td>
                    <td contenteditable="true">quyển sách</td>
                    <td contenteditable="true">Я чита́ю интере́сную кни́гу.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="rusi-md-p"><br></p>
          `;
          insertVisualBlockHtml(vocabTblHtml);
          toast("Đã chèn bảng từ vựng 4 cột tương tác trực tiếp!");
          return;
        }

        if (act === "table") {
          // Bảng tiêu chuẩn 3x3
          const tblHtml = `
            <div class="topic-vocab-table-wrapper notion-table-wrapper" contenteditable="false">
              <div class="notion-table-toolbar notion-ui-helper" contenteditable="false">
                <button type="button" class="notion-tbl-btn btn-add-row" title="Thêm dòng">+ Thêm dòng</button>
                <button type="button" class="notion-tbl-btn btn-add-col" title="Thêm cột">+ Thêm cột</button>
                <button type="button" class="notion-tbl-btn btn-del-row" title="Xóa dòng">- Xóa dòng</button>
                <button type="button" class="notion-tbl-btn btn-del-tbl" title="Xóa bảng">🗑️ Xóa bảng</button>
              </div>
              <table class="topic-vocab-table rusi-md-table notion-interactive-table" contenteditable="true">
                <thead>
                  <tr>
                    <th contenteditable="true">Cột 1</th>
                    <th contenteditable="true">Cột 2</th>
                    <th contenteditable="true">Cột 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td contenteditable="true">Dòng 1</td>
                    <td contenteditable="true">Nội dung A</td>
                    <td contenteditable="true">Ví dụ minh họa</td>
                  </tr>
                  <tr>
                    <td contenteditable="true">Dòng 2</td>
                    <td contenteditable="true">Nội dung B</td>
                    <td contenteditable="true">Ví dụ minh họa</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="rusi-md-p"><br></p>
          `;
          insertVisualBlockHtml(tblHtml);
          return;
        }

        if (act === "tip") {
          insertVisualBlockHtml(`
            <div class="rusi-md-callout rusi-md-callout-tip notion-callout-block" contenteditable="false">
              <span class="rusi-md-callout-icon">💡</span>
              <div class="rusi-md-callout-body">
                <div class="rusi-md-callout-title">Mẹo ghi nhớ</div>
                <div class="rusi-md-callout-text" contenteditable="true">Ghi nhớ mẹo học hoặc cấu trúc tiếng Nga tại đây...</div>
              </div>
              <button type="button" class="notion-callout-del notion-ui-helper" title="Xóa hộp này">✕</button>
            </div>
            <p class="rusi-md-p"><br></p>
          `);
          return;
        }

        if (act === "note") {
          insertVisualBlockHtml(`
            <div class="rusi-md-callout rusi-md-callout-note notion-callout-block" contenteditable="false">
              <span class="rusi-md-callout-icon">📌</span>
              <div class="rusi-md-callout-body">
                <div class="rusi-md-callout-title">Ghi chú bối cảnh</div>
                <div class="rusi-md-callout-text" contenteditable="true">Giải thích văn hóa và ngữ cảnh giao tiếp tại đây...</div>
              </div>
              <button type="button" class="notion-callout-del notion-ui-helper" title="Xóa hộp này">✕</button>
            </div>
            <p class="rusi-md-p"><br></p>
          `);
          return;
        }

        if (act === "important") {
          insertVisualBlockHtml(`
            <div class="rusi-md-callout rusi-md-callout-important notion-callout-block" contenteditable="false">
              <span class="rusi-md-callout-icon">⚡</span>
              <div class="rusi-md-callout-body">
                <div class="rusi-md-callout-title">Lưu ý trọng tâm</div>
                <div class="rusi-md-callout-text" contenteditable="true">Kiến thức quan trọng thi cử cần nhớ tại đây...</div>
              </div>
              <button type="button" class="notion-callout-del notion-ui-helper" title="Xóa hộp này">✕</button>
            </div>
            <p class="rusi-md-p"><br></p>
          `);
          return;
        }

        if (act === "warning") {
          insertVisualBlockHtml(`
            <div class="rusi-md-callout rusi-md-callout-warning notion-callout-block" contenteditable="false">
              <span class="rusi-md-callout-icon">⚠️</span>
              <div class="rusi-md-callout-body">
                <div class="rusi-md-callout-title">Cảnh báo bẫy thi</div>
                <div class="rusi-md-callout-text" contenteditable="true">Lỗi người học hay sai trong bài kiểm tra...</div>
              </div>
              <button type="button" class="notion-callout-del notion-ui-helper" title="Xóa hộp này">✕</button>
            </div>
            <p class="rusi-md-p"><br></p>
          `);
          return;
        }

        if (act === "dialogue") {
          insertVisualBlockHtml(`
            <p class="rusi-md-p"><strong>Анна</strong>: Приве́т! Как твои́ дела́? <em>(Chào bạn! Bạn khỏe không?)</em></p>
            <p class="rusi-md-p"><strong>Макси́м</strong>: Всё отли́чно, спаси́бо! А у тебя́? <em>(Mọi thứ đều tuyệt, cảm ơn bạn! Còn bạn?)</em></p>
            <p class="rusi-md-p"><br></p>
          `);
          return;
        }

        if (act === "h1") {
          insertVisualBlockHtml(`<h1 class="rusi-md-h1">Tiêu đề chính</h1><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "h2") {
          insertVisualBlockHtml(`<h2 class="rusi-md-h2">Tiêu đề phần</h2><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "h3") {
          insertVisualBlockHtml(`<h3 class="rusi-md-h3">Tiêu đề mục nhỏ</h3><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "ul") {
          insertVisualBlockHtml(`<ul class="rusi-md-ul"><li>Mục danh sách 1</li><li>Mục danh sách 2</li></ul><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "ol") {
          insertVisualBlockHtml(`<ol class="rusi-md-ol"><li>Bước thực hiện 1</li><li>Bước thực hiện 2</li></ol><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "quote") {
          insertVisualBlockHtml(`<blockquote class="rusi-md-quote">Đoạn trích dẫn văn bản tại đây...</blockquote><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "hr") {
          insertVisualBlockHtml(`<hr class="rusi-md-divider"><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "audio") {
          insertVisualBlockHtml(`<div class="topic-audio-box" style="margin:16px 0"><audio controls src="assets/audio/lesson.mp3"></audio></div><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "task") {
          insertVisualBlockHtml(`<p class="rusi-md-task"><input type="checkbox" /> <span>Việc cần hoàn thành...</span></p><p class="rusi-md-p"><br></p>`);
          return;
        }
        if (act === "img") {
          const url = prompt("Nhập đường dẫn hình ảnh (URL):", "assets/images/demo.jpg");
          if (url) {
            insertVisualBlockHtml(`<figure class="rusi-md-figure" style="text-align:center;margin:16px 0"><img src="${escAttr(url)}" alt="Hình ảnh minh họa" style="max-width:100%;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08)" /><figcaption style="font-size:12px;color:#64748b;margin-top:6px">Chú thích hình ảnh</figcaption></figure><p class="rusi-md-p"><br></p>`);
          }
          return;
        }
        if (act === "code") {
          insertVisualBlockHtml(`<pre class="rusi-md-pre"><code class="rusi-md-code">// Khối mã nguồn hoặc nội dung chuyên biệt tại đây...</code></pre><p class="rusi-md-p"><br></p>`);
          return;
        }

        if (act === "template-article") {
          if (canvas.textContent.trim() && !confirm("Chèn mẫu bài học TRKI sẽ thêm bố cục chuẩn vào bài viết. Bạn có muốn tiếp tục?")) return;
          const templateMd = `# Bài học: Giao tiếp & Đời sống thực tế tại Nga

## I. Bối cảnh & Tình huống giao tiếp
Chủ đề này giúp bạn làm quen và tự tin xử lý các tình huống giao tiếp thường nhật khi sinh sống và du học tại Liên bang Nga.

> [!NOTE]
> Chú ý cách phát âm và trọng âm chuẩn xác của từ vựng tiếng Nga để người bản xứ dễ hiểu ngay.

## II. Hội thoại mẫu điển hình
- **Анна**: Приве́т! Как твои́ дела́? *(Chào bạn! Bạn khỏe không?)*
- **Макси́м**: Всё отли́чно, спаси́бо! А у тебя́? *(Mọi thứ đều tuyệt, cảm ơn bạn! Còn bạn thì sao?)*
- **Анна**: Я иду́ в библиоте́ку гото́виться к экза́мену по ру́сскому языку́. *(Mình đang đến thư viện ôn thi tiếng Nga.)*

## III. Bảng từ vựng cốt lõi
| Từ tiếng Nga (Trọng âm) | Từ loại | Nghĩa tiếng Việt | Câu ví dụ song ngữ |
| --- | --- | --- | --- |
| **студе́нт** | сущ. м. | sinh viên nam | Он ру́сский студе́нт. *(Anh ấy là sinh viên Nga.)* |
| **кни́га** | сущ. ж. | quyển sách | Я чита́ю интере́сную кни́гу. *(Tôi đọc quyển sách hay.)* |
| **изуча́ть** | глаг. нсв | học tập, nghiên cứu | Мы изуча́ем ру́сский язы́к. *(Chúng tôi học tiếng Nga.)* |

> [!TIP]
> Sử dụng các cụm từ trong ngoặc kép «...» để ghi nhớ các quán ngữ phổ biến!

## IV. Điểm ngữ pháp trọng tâm & Bẫy kỳ thi
1. **Quy tắc sử dụng:**
   - Cấu trúc: \`Động từ + Giới từ + Cách\`
   - Ví dụ: \`поступить в университет\` (đỗ vào trường đại học).

> [!WARNING]
> Cẩn thận phân biệt giữa động từ chưa hoàn thành thể (НСВ) và hoàn thành thể (СВ).

## V. Lời khuyên văn hóa (Культурный совет)
Khi gặp gỡ người lớn tuổi hoặc thầy cô giáo tại Nga, luôn nhớ xưng hô bằng họ tên đệm (Имя và Отчество) và dùng đại từ «Вы».
`;
          const templateHtml = (window.RusiMarkdown && typeof window.RusiMarkdown.render === "function")
            ? window.RusiMarkdown.render(templateMd)
            : `<p>${templateMd}</p>`;

          insertVisualBlockHtml(templateHtml);
          toast("Đã chèn mẫu bài học TRKI chuẩn 5 phần thành công!");
          return;
        }
      };

      // Xử lý chèn ký tự và trọng âm tiếng Nga (Ctrl+Shift+S)
      const insertRussianChar = (charVal) => {
        // Nếu đang mở tab mã markdown thô
        if (rawPane && rawPane.style.display !== "none" && textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const original = textarea.value;

          if (charVal === "\u0301" || charVal === "&#769;") {
            const combiningAccent = "\u0301";
            if (start !== end) {
              const selected = original.substring(start, end);
              textarea.value = original.substring(0, start) + selected + combiningAccent + original.substring(end);
              textarea.setSelectionRange(end + 1, end + 1);
            } else {
              textarea.value = original.substring(0, start) + combiningAccent + original.substring(end);
              textarea.setSelectionRange(start + 1, start + 1);
            }
          } else {
            textarea.value = original.substring(0, start) + charVal + original.substring(end);
            const newCursor = start + charVal.length;
            textarea.setSelectionRange(newCursor, newCursor);
          }
          textarea.focus();
          syncTextareaToDraft();
          return;
        }

        // Chèn vào vị trí con trỏ trên Notion Canvas hoặc ô bảng
        if (canvas) {
          if (charVal === "\u0301" || charVal === "&#769;") {
            document.execCommand("insertText", false, "\u0301");
          } else {
            document.execCommand("insertText", false, charVal);
          }
          syncCanvasToMarkdown();
          pushHistorySnapshot();
        }
      };

      wrap.querySelectorAll("[data-ru-char]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          insertRussianChar(btn.dataset.ruChar);
        };
      });

      // Format inline commands: bold, italic, underline, highlight, link
      const triggerInlineAction = (act) => {
        if (rawPane && rawPane.style.display !== "none" && textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const val = textarea.value;
          const sel = val.substring(start, end) || "nội dung";
          let rep = sel;
          if (act === "bold") rep = `**${sel}**`;
          else if (act === "italic") rep = `*${sel}*`;
          else if (act === "strike") rep = `~~${sel}~~`;
          else if (act === "mark") rep = `<mark>${sel}</mark>`;
          else if (act === "code-inline") rep = `\`${sel}\``;
          else if (act === "link") rep = `[${sel}](https://rusitrki.com)`;
          else if (act === "ru-quote") rep = `«${sel}»`;
          else if (act === "align-center") rep = `<div align="center">\n${sel}\n</div>`;
          else if (act === "align-right") rep = `<div align="right">\n${sel}\n</div>`;
          else if (act === "align-left") rep = `<div align="left">\n${sel}\n</div>`;
          else if (act === "clear-format") rep = sel.replace(/[*_~`#><[\]()]/g, "");

          textarea.value = val.substring(0, start) + rep + val.substring(end);
          textarea.setSelectionRange(start + rep.length, start + rep.length);
          textarea.focus();
          syncTextareaToDraft();
          return;
        }

        if (act === "bold") document.execCommand("bold");
        else if (act === "italic") document.execCommand("italic");
        else if (act === "strike") document.execCommand("strikeThrough");
        else if (act === "code-inline") {
          const sel = window.getSelection();
          if (sel && sel.toString()) {
            document.execCommand("insertHTML", false, `<code class="rusi-md-inline-code">${sel.toString()}</code>`);
          }
        } else if (act === "mark") {
          const sel = window.getSelection();
          if (sel && sel.toString()) {
            document.execCommand("insertHTML", false, `<mark>${sel.toString()}</mark>`);
          }
        } else if (act === "link") {
          const url = prompt("Nhập địa chỉ liên kết (URL):", "https://rusitrki.com");
          if (url) document.execCommand("createLink", false, url);
        } else if (act === "ru-quote") {
          const sel = window.getSelection();
          if (sel && sel.toString()) {
            document.execCommand("insertText", false, `«${sel.toString()}»`);
          } else {
            document.execCommand("insertText", false, "«»");
          }
        } else if (act === "clear-format") {
          document.execCommand("removeFormat");
          document.execCommand("unlink");
        } else if (act === "align-left") {
          document.execCommand("justifyLeft");
        } else if (act === "align-center") {
          document.execCommand("justifyCenter");
        } else if (act === "align-right") {
          document.execCommand("justifyRight");
        }
        syncCanvasToMarkdown();
        pushHistorySnapshot();
      };

      wrap.querySelectorAll("[data-action]").forEach((btn) => {
        const act = btn.dataset.action;
        if (act === "zen") {
          btn.onclick = () => {
            const isFs = wrap.classList.toggle("fullscreen-mode");
            btn.innerHTML = isFs ? NOTION_ICONS.zenExit : NOTION_ICONS.zen;
            if (isFs) toast("Đã mở Chế độ tập trung toàn màn hình Notion (Esc để thoát).");
          };
        } else {
          btn.onclick = () => triggerInlineAction(act);
        }
      });

      // Notion Popovers toggle
      const blockMenu = wrap.querySelector(".notion-block-menu");
      const turnIntoMenu = wrap.querySelector(".notion-turninto-menu");
      const stressMenu = wrap.querySelector(".notion-stress-menu");
      const calloutMenu = wrap.querySelector(".notion-callout-menu");
      const tableMenu = wrap.querySelector(".notion-table-menu");

      const btnInsert = wrap.querySelector(".btn-notion-insert");
      const btnTurnInto = wrap.querySelector(".btn-notion-turninto");
      const btnStress = wrap.querySelector(".btn-notion-stress");
      const btnCallout = wrap.querySelector(".btn-notion-callout");
      const btnTable = wrap.querySelector(".btn-notion-table");

      const hideAllNotionPopovers = () => {
        if (blockMenu) blockMenu.style.display = "none";
        if (turnIntoMenu) turnIntoMenu.style.display = "none";
        if (stressMenu) stressMenu.style.display = "none";
        if (calloutMenu) calloutMenu.style.display = "none";
        if (tableMenu) tableMenu.style.display = "none";
      };

      const toggleMenu = (menu) => {
        if (!menu) return;
        const isShown = menu.style.display === "block";
        hideAllNotionPopovers();
        hideSlashPalette();
        if (!isShown) menu.style.display = "block";
      };

      if (btnInsert && blockMenu) btnInsert.onclick = (e) => { e.stopPropagation(); toggleMenu(blockMenu); };
      if (btnTurnInto && turnIntoMenu) btnTurnInto.onclick = (e) => { e.stopPropagation(); toggleMenu(turnIntoMenu); };
      if (btnStress && stressMenu) btnStress.onclick = (e) => { e.stopPropagation(); toggleMenu(stressMenu); };
      if (btnCallout && calloutMenu) btnCallout.onclick = (e) => { e.stopPropagation(); toggleMenu(calloutMenu); };
      if (btnTable && tableMenu) btnTable.onclick = (e) => { e.stopPropagation(); toggleMenu(tableMenu); };

      // Giữ focus và vùng bôi đen (selection) khi nhấn các nút trên thanh công cụ
      const toolbarEl = wrap.querySelector(".p-md-toolbar");
      if (toolbarEl) {
        toolbarEl.addEventListener("mousedown", (e) => {
          const btn = e.target.closest("button");
          if (btn && !btn.closest(".notion-slash-filter")) {
            e.preventDefault();
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".notion-dropdown-wrap")) {
          hideAllNotionPopovers();
        }
        if (!e.target.closest(".notion-slash-palette")) {
          hideSlashPalette();
        }
      });

      // Notion Turn Into logic
      const turnCurrentSelectionInto = (type) => {
        if (rawPane && rawPane.style.display !== "none" && textarea) {
          // Handled for raw mode
          return;
        }
        if (canvas) {
          canvas.focus();
          if (type === "h1") document.execCommand("formatBlock", false, "h1");
          else if (type === "h2") document.execCommand("formatBlock", false, "h2");
          else if (type === "h3") document.execCommand("formatBlock", false, "h3");
          else if (type === "p") document.execCommand("formatBlock", false, "p");
          else if (type === "ul") document.execCommand("insertUnorderedList");
          else if (type === "ol") document.execCommand("insertOrderedList");
          else if (type === "quote") document.execCommand("formatBlock", false, "blockquote");
          else if (type === "tip") executeBlockAction("tip");
          else if (type === "note") executeBlockAction("note");
          syncCanvasToMarkdown();
          pushHistorySnapshot();
        }
      };

      wrap.querySelectorAll("[data-notion-turn]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          hideAllNotionPopovers();
          turnCurrentSelectionInto(btn.dataset.notionTurn);
        };
      });

      // Xử lý các mục trong Popovers & Slash Palette
      wrap.querySelectorAll("[data-notion-action]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          executeBlockAction(btn.dataset.notionAction);
        };
      });

      // Chuyển đổi chế độ: [Soạn trực quan Notion] vs [Mã Markdown .md]
      wrap.querySelectorAll("[data-canvas-mode]").forEach((btn) => {
        btn.onclick = () => {
          wrap.querySelectorAll("[data-canvas-mode]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const mode = btn.dataset.canvasMode;

          if (mode === "raw") {
            syncCanvasToMarkdown();
            if (surface) surface.style.display = "none";
            if (rawPane) rawPane.style.display = "block";
            if (textarea) textarea.focus();
          } else {
            // Chuyển về chế độ trực quan Notion
            const md = textarea ? textarea.value : "";
            if (window.RusiMarkdown && typeof window.RusiMarkdown.render === "function") {
              canvas.innerHTML = window.RusiMarkdown.render(md);
            } else {
              canvas.textContent = md;
            }
            enhanceCanvasElements(canvas);
            pushHistorySnapshot();
            if (rawPane) rawPane.style.display = "none";
            if (surface) surface.style.display = "block";
            canvas.focus();
          }
        };
      });
    });
  }

  window.switchEditorTab = function (tab) {
    State.activeEditorTab = tab;

    if (tab === "structure") {
      const tabS = document.getElementById("tabStructure");
      if (tabS && State.currentSlug && State.currentDraft) {
        tabS.innerHTML = renderActiveStructureBuilder(State.currentSlug, State.currentDraft);
      }
    }

    const tabC = document.getElementById("tabContent");
    const tabS = document.getElementById("tabStructure");

    if (tabC) tabC.style.display = tab === "content" ? "block" : "none";
    if (tabS) tabS.style.display = tab === "structure" ? "block" : "none";

    document.querySelectorAll(".payload-editor-tab").forEach((btn) => {
      const tabAttr = btn.getAttribute("data-tab");
      btn.classList.toggle("active", tabAttr ? tabAttr === tab : false);
    });
  };

  window.formatJsonEditor = function () {
    const el = document.getElementById("jsonEditorArea");
    if (!el) return;
    try {
      const obj = JSON.parse(el.value);
      State.currentDraft = obj;
      el.value = JSON.stringify(obj, null, 2);
      toast("Đã định dạng JSON chuẩn.");
    } catch (e) {
      toast("Lỗi cú pháp JSON: " + e.message);
    }
  };

  // =========================================================================
  // 9. ARRAY BUILDERS (TRKI, VOCAB, LISTENING, SPEAKING, PACKAGES)
  // =========================================================================

  // =========================================================================
  // 9. ARRAY BUILDERS (TRKI 5-SUBTESTS, VOCAB, LISTENING, SPEAKING, WRITING)
  // =========================================================================

  function renderActiveStructureBuilder(slug, draft) {
    if (slug === "VOCABULARIES") {
      return renderVocabDetailsBuilder(draft);
    } else if (slug === "TRKI_BANK") {
      return renderTrkiPartsBuilder(draft.parts || [], draft);
    } else if (slug === "VOCAB_JARS") {
      return renderVocabWordsBuilder(draft.words || []);
    } else if (slug === "LISTENING_LESSONS") {
      const lines = (Array.isArray(draft.lines) && draft.lines.length) ? draft.lines : ((draft.raw_data && Array.isArray(draft.raw_data.lines)) ? draft.raw_data.lines : []);
      const questions = (Array.isArray(draft.questions) && draft.questions.length) ? draft.questions : ((draft.raw_data && Array.isArray(draft.raw_data.questions)) ? draft.raw_data.questions : []);
      if (!Array.isArray(draft.lines) || draft.lines.length === 0) draft.lines = lines;
      if (!Array.isArray(draft.questions) || draft.questions.length === 0) draft.questions = questions;
      return renderListeningBuilder(draft.lines, draft.questions, draft);
    } else if (slug === "SPEAKING_SETS") {
      const spItems = (Array.isArray(draft.sentences) && draft.sentences.length) ? draft.sentences : ((Array.isArray(draft.items) && draft.items.length) ? draft.items : ((draft.raw_data && Array.isArray(draft.raw_data.items)) ? draft.raw_data.items : []));
      if (!Array.isArray(draft.items) || draft.items.length === 0) draft.items = spItems;
      return renderSpeakingBuilder(draft.items || [], draft);
    } else if (slug === "PACKAGES") {
      const features = (Array.isArray(draft.features) && draft.features.length) ? draft.features : (Array.isArray(draft.feature_list) ? draft.feature_list : []);
      if (!Array.isArray(draft.features) || draft.features.length === 0) draft.features = features;
      return renderPackagesFeaturesBuilder(draft.features);
    } else if (slug === "WRITING_TASKS") {
      return renderWritingTaskBuilder(draft);
    } else if (slug === "WRITING_TOPICS" || slug === "LISTENING_TOPICS") {
      return `
        <div style="padding:28px 20px;text-align:center;background:var(--p-surface-subtle,#f9fafb);border:1px dashed var(--p-border-subtle,#e5e7eb);border-radius:12px;margin:12px 0;">
          <div style="font-size:24px;margin-bottom:8px">📂</div>
          <div style="font-weight:700;font-size:14px;color:var(--p-text,#1f2937);margin-bottom:4px">Chủ đề phân cấp độc lập</div>
          <div style="font-size:13px;color:var(--p-text-muted,#6b7280);max-width:480px;margin:0 auto;line-height:1.5">
            Chủ đề này đóng vai trò phân nhóm danh mục cha. Các bài luyện tập con (Writing Tasks / Listening Lessons) sẽ được liên kết trực tiếp tới chủ đề này qua trường <code>topic_id</code>. Hãy chỉnh sửa thông tin chủ đề tại tab <strong>Nội dung chính</strong> hoặc <strong>JSON</strong>.
          </div>
        </div>
      `;
    } else if (slug === "SHOP_PRODUCTS") {
      const specs = (Array.isArray(draft.features) && draft.features.length) ? draft.features : (Array.isArray(draft.specs) ? draft.specs : []);
      if (!Array.isArray(draft.features) || draft.features.length === 0) draft.features = specs;
      return renderShopSpecsBuilder(draft.features);
    } else {
      return `<div style="padding:24px;color:var(--p-text-muted)">Phân hệ này không yêu cầu Array Builder phức tạp. Vui lòng chỉnh sửa tại tab Nội dung chính hoặc JSON.</div>`;
    }
  }

  // --- TRKI 5-Subtests Standard Exam Builder ---
  function normalizeTrkiDraftParts(draft) {
    if (!draft) return;
    const partsArr = Array.isArray(draft.parts) ? draft.parts : [];
    if (!draft.part1) {
      draft.part1 = partsArr[0] || {
        id: "gram", name: "Часть 1. Лексика и грамматика", vi: "Phần 1. Từ vựng & Ngữ pháp", questions: []
      };
    }
    if (!draft.part2) {
      draft.part2 = partsArr[1] || {
        id: "reading", name: "Часть 2. Чтение", vi: "Phần 2. Đọc hiểu văn bản", text: { ru: "", vi: "" }, questions: []
      };
    }
    if (!draft.part3) {
      draft.part3 = partsArr[2] || {
        id: "listening", name: "Часть 3. Аудирование", vi: "Phần 3. Nghe hiểu", audio_url: "", lines: [], questions: []
      };
    }
    if (!draft.part4) {
      draft.part4 = partsArr[3] || {
        id: "writing", name: "Часть 4. Письмо", vi: "Phần 4. Viết tự luận", writing_tasks: []
      };
    }
    if (!draft.part5) {
      draft.part5 = partsArr[4] || {
        id: "speaking", name: "Часть 5. Говорение", vi: "Phần 5. Nói theo tình huống", speaking_tasks: []
      };
    }
    draft.parts = [draft.part1, draft.part2, draft.part3, draft.part4, draft.part5];
    if (!draft.answers || typeof draft.answers !== "object") draft.answers = {};
  }

  function renderTrkiPartsBuilder(parts, draft) {
    draft = draft || State.currentDraft;
    if (!draft) return "";
    normalizeTrkiDraftParts(draft);

    const activeTab = (typeof State.activeTrkiSubtest === "number") ? State.activeTrkiSubtest : 0;

    const q1Count = (draft.part1 && Array.isArray(draft.part1.questions)) ? draft.part1.questions.length : 0;
    const q2Count = (draft.part2 && Array.isArray(draft.part2.questions)) ? draft.part2.questions.length : 0;
    const q3Count = (draft.part3 && Array.isArray(draft.part3.questions)) ? draft.part3.questions.length : 0;
    const t4Count = (draft.part4 && Array.isArray(draft.part4.writing_tasks)) ? draft.part4.writing_tasks.length : ((draft.part4 && Array.isArray(draft.part4.tasks)) ? draft.part4.tasks.length : 0);
    const t5Count = (draft.part5 && Array.isArray(draft.part5.speaking_tasks)) ? draft.part5.speaking_tasks.length : ((draft.part5 && Array.isArray(draft.part5.tasks)) ? draft.part5.tasks.length : 0);

    const navTabs = [
      { id: 0, label: `📝 Phần 1: Ngữ pháp (${q1Count})`, title: "Лексика и грамматика" },
      { id: 1, label: `📖 Phần 2: Đọc hiểu (${q2Count})`, title: "Чтение" },
      { id: 2, label: `🎧 Phần 3: Nghe hiểu (${q3Count})`, title: "Аудирование" },
      { id: 3, label: `✍️ Phần 4: Viết (${t4Count})`, title: "Письмо" },
      { id: 4, label: `🗣️ Phần 5: Nói (${t5Count})`, title: "Говорение" },
      { id: 5, label: `🔑 Đáp án (Answers)`, title: "Bảng đáp án đề thi" }
    ];

    const tabsHtml = navTabs.map(t => `
      <button type="button" class="p-btn ${activeTab === t.id ? 'p-btn-primary' : 'p-btn-secondary'} p-btn-sm" onclick="window.switchTrkiSubtest(${t.id})" title="${escAttr(t.title)}" style="font-size:12px;padding:6px 12px;border-radius:8px">
        ${t.label}
      </button>
    `).join("");

    let subtestBodyHtml = "";

    // -------------------------------------------------------------
    // SUBTEST 0: NGỮ PHÁP (Part 1 Grammar)
    // -------------------------------------------------------------
    if (activeTab === 0) {
      const qList = (draft.part1 && Array.isArray(draft.part1.questions)) ? draft.part1.questions : [];
      let rowsHtml = "";
      qList.forEach((q, qIdx) => {
        const opts = (q.options || []).join("\n");
        rowsHtml += `
          <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">Câu ${qIdx + 1}</span>
              <div style="display:flex;gap:4px">
                <button class="p-btn-icon" type="button" onclick="window.cloneTrkiQuestion(0, ${qIdx})" title="Nhân bản câu này">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : "📋"}</button>
                <button class="p-btn-icon" type="button" onclick="window.removeTrkiQuestion(0, ${qIdx})" title="Xoá câu này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
              </div>
            </div>
            <div class="payload-array-row-fields" style="display:flex;flex-direction:column;gap:8px">
              <input type="text" class="p-input" placeholder="Câu hỏi hoặc câu khuyết: ví dụ: Анна идёт в ___ (магазин)." value="${escAttr(q.q || "")}" oninput="window.updateTrkiQuestion(0, ${qIdx}, 'q', this.value)" style="font-size:13.5px;font-weight:600" />
              <div style="display:flex;gap:10px;align-items:flex-start">
                <textarea class="p-textarea" rows="3" placeholder="Các phương án (mỗi dòng 1 phương án)..." oninput="window.updateTrkiQuestionOptions(0, ${qIdx}, this.value)" style="flex:1;font-size:13px">${esc(opts)}</textarea>
                <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                  <label class="p-label" style="font-size:11.5px">Đáp án đúng:</label>
                  <select class="p-select" onchange="window.updateTrkiQuestion(0, ${qIdx}, 'a', Number(this.value))">
                    <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                    <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                    <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                    <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                  </select>
                </div>
              </div>
              <input type="text" class="p-input" placeholder="Giải thích ngữ pháp / căn cứ chia cách: ví dụ: Động từ chuyển động đi vào đâu dùng cách 4: в магазин." value="${escAttr(q.ex || "")}" oninput="window.updateTrkiQuestion(0, ${qIdx}, 'ex', this.value)" style="font-size:12.5px" />
            </div>
          </div>
        `;
      });

      subtestBodyHtml = `
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div>
              <div style="font-weight:700;font-size:15px">Phần 1: Từ vựng &amp; Ngữ pháp (Часть 1. Лексика и грамматика)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Tổng số: ${qList.length} câu hỏi trắc nghiệm</div>
            </div>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiQuestion(0)">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
          </div>
          <div class="payload-array-items">
            ${rowsHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có câu hỏi nào. Bấm "+ Thêm câu hỏi" để bắt đầu.</div>'}
          </div>
        </div>
      `;

    // -------------------------------------------------------------
    // SUBTEST 1: ĐỌC HIỂU (Part 2 Reading)
    // -------------------------------------------------------------
    } else if (activeTab === 1) {
      const p2 = draft.part2 || {};
      const passageRu = (p2.text && p2.text.ru) || p2.text_ru || p2.passage || "";
      const passageVi = (p2.text && p2.text.vi) || p2.text_vi || "";
      const qList = Array.isArray(p2.questions) ? p2.questions : [];

      let rowsHtml = "";
      qList.forEach((q, qIdx) => {
        const opts = (q.options || []).join("\n");
        rowsHtml += `
          <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">Câu đọc hiểu ${qIdx + 1}</span>
              <div style="display:flex;gap:4px">
                <button class="p-btn-icon" type="button" onclick="window.cloneTrkiQuestion(1, ${qIdx})" title="Nhân bản câu này">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : "📋"}</button>
                <button class="p-btn-icon" type="button" onclick="window.removeTrkiQuestion(1, ${qIdx})" title="Xoá câu này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
              </div>
            </div>
            <div class="payload-array-row-fields" style="display:flex;flex-direction:column;gap:8px">
              <input type="text" class="p-input" placeholder="Câu hỏi đọc hiểu: ví dụ: Куда поехал Антон летом?" value="${escAttr(q.q || "")}" oninput="window.updateTrkiQuestion(1, ${qIdx}, 'q', this.value)" style="font-size:13.5px;font-weight:600" />
              <div style="display:flex;gap:10px;align-items:flex-start">
                <textarea class="p-textarea" rows="3" placeholder="Các phương án (mỗi dòng 1 phương án)..." oninput="window.updateTrkiQuestionOptions(1, ${qIdx}, this.value)" style="flex:1;font-size:13px">${esc(opts)}</textarea>
                <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                  <label class="p-label" style="font-size:11.5px">Đáp án đúng:</label>
                  <select class="p-select" onchange="window.updateTrkiQuestion(1, ${qIdx}, 'a', Number(this.value))">
                    <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                    <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                    <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                    <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                  </select>
                </div>
              </div>
              <input type="text" class="p-input" placeholder="Căn cứ trong bài đọc: ví dụ: Trong đoạn 2 tác giả viết: 'Антон поехал в Санкт-Петербург'." value="${escAttr(q.ex || "")}" oninput="window.updateTrkiQuestion(1, ${qIdx}, 'ex', this.value)" style="font-size:12.5px" />
            </div>
          </div>
        `;
      });

      subtestBodyHtml = `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px;padding:16px">
            <div style="font-weight:700;font-size:14px;margin-bottom:8px">Đoạn văn bản Đọc hiểu (Passage Text):</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px">
              <div>
                <label class="p-label" style="font-size:12px">Văn bản tiếng Nga chuẩn (*):</label>
                <textarea class="p-textarea" rows="7" placeholder="Dán đoạn văn tiếng Nga vào đây..." oninput="window.updateTrkiPassage('ru', this.value)" style="font-size:13.5px;line-height:1.6">${esc(passageRu)}</textarea>
              </div>
              <div>
                <label class="p-label" style="font-size:12px">Bản dịch tiếng Việt tham khảo:</label>
                <textarea class="p-textarea" rows="7" placeholder="Bản dịch tiếng Việt đối chiếu..." oninput="window.updateTrkiPassage('vi', this.value)" style="font-size:13px;line-height:1.6">${esc(passageVi)}</textarea>
              </div>
            </div>
          </div>

          <div class="payload-array-container">
            <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div>
                <div style="font-weight:700;font-size:15px">Câu hỏi trắc nghiệm Đọc hiểu (Часть 2. Чтение)</div>
                <div style="font-size:12px;color:var(--p-text-muted)">Tổng số: ${qList.length} câu hỏi</div>
              </div>
              <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiQuestion(1)">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi đọc hiểu</button>
            </div>
            <div class="payload-array-items">
              ${rowsHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có câu hỏi đọc hiểu. Bấm "+ Thêm câu hỏi" để tạo.</div>'}
            </div>
          </div>
        </div>
      `;

    // -------------------------------------------------------------
    // SUBTEST 2: NGHE HIỂU (Part 3 Listening)
    // -------------------------------------------------------------
    } else if (activeTab === 2) {
      const p3 = draft.part3 || {};
      const audioUrl = p3.audio_url || p3.audioUrl || "";
      const lines = Array.isArray(p3.lines) ? p3.lines : [];
      const qList = Array.isArray(p3.questions) ? p3.questions : [];

      let linesHtml = "";
      lines.forEach((l, lIdx) => {
        linesHtml += `
          <div class="payload-array-row" style="margin-bottom:8px;padding:8px 12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:8px">
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
              <span class="payload-array-row-num" style="min-width:26px">#${lIdx + 1}</span>
              <input type="text" class="p-input" placeholder="Người nói..." value="${escAttr(l.who || "")}" oninput="window.updateTrkiListeningLine(${lIdx}, 'who', this.value)" style="width:120px;font-size:12px" />
              <div style="display:flex;align-items:center;gap:4px;font-size:11.5px;color:var(--p-text-muted)">
                <span>Từ:</span>
                <input type="number" step="0.5" class="p-input" value="${l.start_sec !== undefined ? l.start_sec : 0}" oninput="window.updateTrkiListeningLine(${lIdx}, 'start_sec', parseFloat(this.value)||0)" style="width:60px;font-size:12px;padding:2px 4px;text-align:center" />
                <span>Đến:</span>
                <input type="number" step="0.5" class="p-input" value="${l.end_sec !== undefined ? l.end_sec : 5}" oninput="window.updateTrkiListeningLine(${lIdx}, 'end_sec', parseFloat(this.value)||0)" style="width:60px;font-size:12px;padding:2px 4px;text-align:center" />
                <span>giây</span>
              </div>
              <button class="p-btn-icon" type="button" onclick="window.removeTrkiListeningLine(${lIdx})" title="Xoá dòng này" style="margin-left:auto;color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 13 }) : "✕"}</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
              <input type="text" class="p-input" placeholder="Câu thoại tiếng Nga..." value="${escAttr(l.ru || "")}" oninput="window.updateTrkiListeningLine(${lIdx}, 'ru', this.value)" style="font-size:13px" />
              <input type="text" class="p-input" placeholder="Bản dịch tiếng Việt..." value="${escAttr(l.vi || "")}" oninput="window.updateTrkiListeningLine(${lIdx}, 'vi', this.value)" style="font-size:12.5px" />
            </div>
          </div>
        `;
      });

      let qHtml = "";
      qList.forEach((q, qIdx) => {
        const opts = (q.options || []).join("\n");
        qHtml += `
          <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">Câu nghe ${qIdx + 1}</span>
              <div style="display:flex;gap:4px">
                <button class="p-btn-icon" type="button" onclick="window.cloneTrkiQuestion(2, ${qIdx})" title="Nhân bản câu này">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 13 }) : "📋"}</button>
                <button class="p-btn-icon" type="button" onclick="window.removeTrkiQuestion(2, ${qIdx})" title="Xoá câu này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
              </div>
            </div>
            <div class="payload-array-row-fields" style="display:flex;flex-direction:column;gap:8px">
              <input type="text" class="p-input" placeholder="Câu hỏi nghe hiểu: ví dụ: Что хочет купить Анна?" value="${escAttr(q.q || "")}" oninput="window.updateTrkiQuestion(2, ${qIdx}, 'q', this.value)" style="font-size:13.5px;font-weight:600" />
              <div style="display:flex;gap:10px;align-items:flex-start">
                <textarea class="p-textarea" rows="3" placeholder="Các phương án (mỗi dòng 1 phương án)..." oninput="window.updateTrkiQuestionOptions(2, ${qIdx}, this.value)" style="flex:1;font-size:13px">${esc(opts)}</textarea>
                <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                  <label class="p-label" style="font-size:11.5px">Đáp án đúng:</label>
                  <select class="p-select" onchange="window.updateTrkiQuestion(2, ${qIdx}, 'a', Number(this.value))">
                    <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                    <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                    <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                    <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                  </select>
                </div>
              </div>
              <input type="text" class="p-input" placeholder="Căn cứ hội thoại: ví dụ: Người nói 1 đã hỏi..." value="${escAttr(q.ex || "")}" oninput="window.updateTrkiQuestion(2, ${qIdx}, 'ex', this.value)" style="font-size:12.5px" />
            </div>
          </div>
        `;
      });

      subtestBodyHtml = `
        <div style="display:flex;flex-direction:column;gap:16px">
          <!-- Audio File Config -->
          <div style="background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px;padding:16px">
            <div style="font-weight:700;font-size:14px;margin-bottom:6px">File Audio Nghe hiểu (Storage bucket: <code>trki-audio</code>):</div>
            <input type="text" class="p-input" placeholder="https://...supabase.co/storage/v1/object/public/trki-audio/..." value="${escAttr(audioUrl)}" oninput="window.updateTrkiAudioUrl(this.value)" style="font-size:13px" />
            ${audioUrl ? `
              <div style="margin-top:8px">
                <audio controls src="${escAttr(audioUrl)}" style="width:100%;height:32px"></audio>
              </div>
            ` : '<div style="font-size:12px;color:var(--p-text-muted);margin-top:4px">Chưa có URL Audio. Nhập link MP3 từ bucket trki-audio.</div>'}
          </div>

          <!-- Dialogue Lines -->
          <div class="payload-array-container">
            <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <div>
                <span style="font-weight:700;font-size:14px">Lời thoại hội thoại (Dialogue Lines — ${lines.length} câu)</span>
                <span style="font-size:11.5px;color:var(--p-text-muted);margin-left:8px">(Khớp mốc thời gian Audio)</span>
              </div>
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addTrkiListeningLine()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu thoại</button>
            </div>
            <div class="payload-array-items">
              ${linesHtml || '<div style="padding:16px;text-align:center;color:var(--p-text-muted)">Chưa có lời thoại.</div>'}
            </div>
          </div>

          <!-- Listening Questions -->
          <div class="payload-array-container">
            <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div>
                <div style="font-weight:700;font-size:15px">Câu hỏi trắc nghiệm Nghe hiểu (Часть 3. Аудирование)</div>
                <div style="font-size:12px;color:var(--p-text-muted)">Tổng số: ${qList.length} câu hỏi</div>
              </div>
              <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiQuestion(2)">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi nghe</button>
            </div>
            <div class="payload-array-items">
              ${qHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có câu hỏi nghe hiểu. Bấm "+ Thêm câu hỏi nghe" để tạo.</div>'}
            </div>
          </div>
        </div>
      `;

    // -------------------------------------------------------------
    // SUBTEST 3: VIẾT TỰ LUẬN (Part 4 Writing)
    // -------------------------------------------------------------
    } else if (activeTab === 3) {
      const p4 = draft.part4 || {};
      const wTasks = Array.isArray(p4.writing_tasks) ? p4.writing_tasks : (Array.isArray(p4.tasks) ? p4.tasks : []);

      let tasksHtml = "";
      wTasks.forEach((t, tIdx) => {
        const hintsVal = Array.isArray(t.hints) ? t.hints.join("\n") : (t.hints || "");
        tasksHtml += `
          <div class="payload-array-row" style="margin-bottom:16px;padding:16px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--p-border-subtle,#e5e7eb)">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6);font-size:14px">Đề bài viết #${tIdx + 1}</span>
              <button class="p-btn-icon" type="button" onclick="window.removeTrkiWritingTask(${tIdx})" title="Xoá đề bài viết này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <div style="display:grid;grid-template-columns:1fr 140px;gap:10px">
                <div>
                  <label class="p-label" style="font-size:12px">Tiêu đề đề bài:</label>
                  <input type="text" class="p-input" placeholder="Ví dụ: Задание 1. Письмо другу" value="${escAttr(t.title || "")}" oninput="window.updateTrkiWritingTask(${tIdx}, 'title', this.value)" style="font-weight:600" />
                </div>
                <div>
                  <label class="p-label" style="font-size:12px">Số từ tối thiểu:</label>
                  <input type="number" class="p-input" value="${t.minWords || t.min_words || 35}" oninput="window.updateTrkiWritingTask(${tIdx}, 'minWords', parseInt(this.value)||30)" />
                </div>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Đề bài tiếng Nga (*):</label>
                <textarea class="p-textarea" rows="3" placeholder="Đề bài tiếng Nga..." oninput="window.updateTrkiWritingTask(${tIdx}, 'prompt', this.value)" style="font-size:13.5px">${esc(t.prompt || "")}</textarea>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Hướng dẫn / Dịch tiếng Việt:</label>
                <textarea class="p-textarea" rows="2" placeholder="Hướng dẫn tiếng Việt..." oninput="window.updateTrkiWritingTask(${tIdx}, 'vi', this.value)" style="font-size:13px">${esc(t.vi || "")}</textarea>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Bài viết mẫu chuẩn TRKI (Sample Essay):</label>
                <textarea class="p-textarea" rows="4" placeholder="Bài mẫu đạt điểm tối đa..." oninput="window.updateTrkiWritingTask(${tIdx}, 'sample_text', this.value)" style="font-size:13px;line-height:1.6">${esc(t.sample_text || t.sample_essay || "")}</textarea>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Gợi ý &amp; Cấu trúc làm bài (mỗi dòng 1 gợi ý):</label>
                <textarea class="p-textarea" rows="2" placeholder="Gợi ý câu mở đầu, kết thư..." oninput="window.updateTrkiWritingTaskHints(${tIdx}, this.value)" style="font-size:12.5px">${esc(hintsVal)}</textarea>
              </div>
            </div>
          </div>
        `;
      });

      subtestBodyHtml = `
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div>
              <div style="font-weight:700;font-size:15px">Phần 4: Viết tự luận (Часть 4. Письмо)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Tổng số: ${wTasks.length} bài viết</div>
            </div>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiWritingTask()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm đề bài viết</button>
          </div>
          <div class="payload-array-items">
            ${tasksHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có đề bài viết nào. Bấm "+ Thêm đề bài viết" để tạo.</div>'}
          </div>
        </div>
      `;

    // -------------------------------------------------------------
    // SUBTEST 4: NÓI THEO TÌNH HUỐNG (Part 5 Speaking)
    // -------------------------------------------------------------
    } else if (activeTab === 4) {
      const p5 = draft.part5 || {};
      const sTasks = Array.isArray(p5.speaking_tasks) ? p5.speaking_tasks : (Array.isArray(p5.tasks) ? p5.tasks : []);

      let tasksHtml = "";
      sTasks.forEach((t, tIdx) => {
        tasksHtml += `
          <div class="payload-array-row" style="margin-bottom:16px;padding:16px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--p-border-subtle,#e5e7eb)">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6);font-size:14px">Tình huống nói #${tIdx + 1}</span>
              <button class="p-btn-icon" type="button" onclick="window.removeTrkiSpeakingTask(${tIdx})" title="Xoá tình huống này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <div style="display:grid;grid-template-columns:1fr 120px 120px;gap:10px">
                <div>
                  <label class="p-label" style="font-size:12px">Tiêu đề tình huống:</label>
                  <input type="text" class="p-input" placeholder="Ví dụ: Ситуация 1. Знакомство в деканате" value="${escAttr(t.title || "")}" oninput="window.updateTrkiSpeakingTask(${tIdx}, 'title', this.value)" style="font-weight:600" />
                </div>
                <div>
                  <label class="p-label" style="font-size:12px">Chuẩn bị (s):</label>
                  <input type="number" class="p-input" value="${t.prepTimeSec || 60}" oninput="window.updateTrkiSpeakingTask(${tIdx}, 'prepTimeSec', parseInt(this.value)||60)" />
                </div>
                <div>
                  <label class="p-label" style="font-size:12px">Nói (s):</label>
                  <input type="number" class="p-input" value="${t.talkTimeSec || 90}" oninput="window.updateTrkiSpeakingTask(${tIdx}, 'talkTimeSec', parseInt(this.value)||90)" />
                </div>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Nội dung tình huống tiếng Nga (*):</label>
                <textarea class="p-textarea" rows="3" placeholder="Вы находитесь в деканате. Познакомьтесь с секретарём..." oninput="window.updateTrkiSpeakingTask(${tIdx}, 'prompt', this.value)" style="font-size:13.5px">${esc(t.prompt || "")}</textarea>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Dịch nghĩa tiếng Việt:</label>
                <textarea class="p-textarea" rows="2" placeholder="Bạn đang ở văn phòng khoa. Hãy làm quen..." oninput="window.updateTrkiSpeakingTask(${tIdx}, 'vi', this.value)" style="font-size:13px">${esc(t.vi || "")}</textarea>
              </div>

              <div>
                <label class="p-label" style="font-size:12px">Gợi ý phản xạ &amp; Mẫu trả lời đạt chuẩn TRKI:</label>
                <textarea class="p-textarea" rows="3" placeholder="Здравствуйте! Меня зовут... Я студент первого курса..." oninput="window.updateTrkiSpeakingTask(${tIdx}, 'suggested', this.value)" style="font-size:13px;line-height:1.6">${esc(t.suggested || t.sample_text || "")}</textarea>
              </div>
            </div>
          </div>
        `;
      });

      subtestBodyHtml = `
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div>
              <div style="font-weight:700;font-size:15px">Phần 5: Nói theo tình huống (Часть 5. Говорение)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Tổng số: ${sTasks.length} tình huống</div>
            </div>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addTrkiSpeakingTask()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm tình huống nói</button>
          </div>
          <div class="payload-array-items">
            ${tasksHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted)">Chưa có tình huống nói. Bấm "+ Thêm tình huống nói" để tạo.</div>'}
          </div>
        </div>
      `;

    // -------------------------------------------------------------
    // SUBTEST 5: ĐÁP ÁN ANSWERS (Answers Table)
    // -------------------------------------------------------------
    } else if (activeTab === 5) {
      const answers = draft.answers || {};
      const a1 = Array.isArray(answers.part1) ? answers.part1 : [];
      const a2 = Array.isArray(answers.part2) ? answers.part2 : [];
      const a3 = Array.isArray(answers.part3) ? answers.part3 : [];

      subtestBodyHtml = `
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div>
              <div style="font-weight:700;font-size:15px">Bảng đáp án chính thức (Official Answer Keys)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Dùng đối soát kết quả trắc nghiệm các Phần 1, 2, 3</div>
            </div>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.autoGenerateTrkiAnswers()">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 13 }) : "🔄"} Tự động sinh từ câu hỏi</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px;padding:12px">
            <div>
              <label class="p-label" style="font-weight:700">Đáp án Phần 1 (Ngữ pháp — mảng số index 0..3):</label>
              <input type="text" class="p-input" value="${escAttr(JSON.stringify(a1))}" oninput="window.updateTrkiAnswerKey('part1', this.value)" style="font-family:monospace;font-size:13px" />
            </div>
            <div>
              <label class="p-label" style="font-weight:700">Đáp án Phần 2 (Đọc hiểu — mảng số index 0..3):</label>
              <input type="text" class="p-input" value="${escAttr(JSON.stringify(a2))}" oninput="window.updateTrkiAnswerKey('part2', this.value)" style="font-family:monospace;font-size:13px" />
            </div>
            <div>
              <label class="p-label" style="font-weight:700">Đáp án Phần 3 (Nghe hiểu — mảng số index 0..3):</label>
              <input type="text" class="p-input" value="${escAttr(JSON.stringify(a3))}" oninput="window.updateTrkiAnswerKey('part3', this.value)" style="font-family:monospace;font-size:13px" />
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div style="display:flex;flex-direction:column;gap:16px">
        <!-- Subtests Navigation Bar -->
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:var(--p-surface-subtle,#f9fafb);padding:10px 12px;border-radius:10px;border:1px solid var(--p-border-subtle,#e5e7eb)">
          ${tabsHtml}
        </div>
        ${subtestBodyHtml}
      </div>
    `;
  }

  // Window helpers for TRKI Builder
  window.switchTrkiSubtest = function (idx) {
    State.activeTrkiSubtest = idx;
    refreshStructureTab();
  };

  window.updateTrkiPassage = function (lang, val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.part2.text = State.currentDraft.part2.text || {};
    State.currentDraft.part2.text[lang] = val;
    State.currentDraft.parts[1].text = State.currentDraft.part2.text;
  };

  window.updateTrkiAudioUrl = function (val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.part3.audio_url = val;
    State.currentDraft.parts[2].audio_url = val;
    refreshStructureTab();
  };

  window.addTrkiQuestion = function (partIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const targetPart = partIdx === 0 ? State.currentDraft.part1 : (partIdx === 1 ? State.currentDraft.part2 : State.currentDraft.part3);
    targetPart.questions = targetPart.questions || [];
    targetPart.questions.push({
      q: "",
      options: ["", "", "", ""],
      a: 0,
      ex: ""
    });
    State.currentDraft.parts[partIdx].questions = targetPart.questions;
    refreshStructureTab();
  };

  window.removeTrkiQuestion = function (partIdx, qIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const targetPart = partIdx === 0 ? State.currentDraft.part1 : (partIdx === 1 ? State.currentDraft.part2 : State.currentDraft.part3);
    if (targetPart && targetPart.questions) {
      targetPart.questions.splice(qIdx, 1);
      State.currentDraft.parts[partIdx].questions = targetPart.questions;
      refreshStructureTab();
    }
  };

  window.cloneTrkiQuestion = function (partIdx, qIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const targetPart = partIdx === 0 ? State.currentDraft.part1 : (partIdx === 1 ? State.currentDraft.part2 : State.currentDraft.part3);
    if (targetPart && targetPart.questions && targetPart.questions[qIdx]) {
      const clone = JSON.parse(JSON.stringify(targetPart.questions[qIdx]));
      targetPart.questions.splice(qIdx + 1, 0, clone);
      State.currentDraft.parts[partIdx].questions = targetPart.questions;
      refreshStructureTab();
      toast("Đã nhân bản câu hỏi thành công!");
    }
  };

  window.updateTrkiQuestion = function (partIdx, qIdx, field, val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const targetPart = partIdx === 0 ? State.currentDraft.part1 : (partIdx === 1 ? State.currentDraft.part2 : State.currentDraft.part3);
    if (targetPart && targetPart.questions && targetPart.questions[qIdx]) {
      targetPart.questions[qIdx][field] = val;
      State.currentDraft.parts[partIdx].questions = targetPart.questions;
    }
  };

  window.updateTrkiQuestionOptions = function (partIdx, qIdx, textVal) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const targetPart = partIdx === 0 ? State.currentDraft.part1 : (partIdx === 1 ? State.currentDraft.part2 : State.currentDraft.part3);
    if (targetPart && targetPart.questions && targetPart.questions[qIdx]) {
      targetPart.questions[qIdx].options = textVal.split("\n").map(s => s.trim()).filter(Boolean);
      State.currentDraft.parts[partIdx].questions = targetPart.questions;
    }
  };

  window.addTrkiListeningLine = function () {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.part3.lines = State.currentDraft.part3.lines || [];
    State.currentDraft.part3.lines.push({ who: "Người nói", ru: "", vi: "", start_sec: 0, end_sec: 5 });
    State.currentDraft.parts[2].lines = State.currentDraft.part3.lines;
    refreshStructureTab();
  };

  window.removeTrkiListeningLine = function (lIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    if (State.currentDraft.part3 && State.currentDraft.part3.lines) {
      State.currentDraft.part3.lines.splice(lIdx, 1);
      State.currentDraft.parts[2].lines = State.currentDraft.part3.lines;
      refreshStructureTab();
    }
  };

  window.updateTrkiListeningLine = function (lIdx, field, val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    if (State.currentDraft.part3 && State.currentDraft.part3.lines && State.currentDraft.part3.lines[lIdx]) {
      State.currentDraft.part3.lines[lIdx][field] = val;
      State.currentDraft.parts[2].lines = State.currentDraft.part3.lines;
    }
  };

  window.addTrkiWritingTask = function () {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.part4.writing_tasks = State.currentDraft.part4.writing_tasks || State.currentDraft.part4.tasks || [];
    State.currentDraft.part4.writing_tasks.push({
      title: `Задание ${State.currentDraft.part4.writing_tasks.length + 1}`,
      prompt: "",
      vi: "",
      minWords: 35,
      sample_text: "",
      hints: []
    });
    State.currentDraft.parts[3].writing_tasks = State.currentDraft.part4.writing_tasks;
    refreshStructureTab();
  };

  window.removeTrkiWritingTask = function (tIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const list = State.currentDraft.part4.writing_tasks || State.currentDraft.part4.tasks || [];
    list.splice(tIdx, 1);
    State.currentDraft.parts[3].writing_tasks = list;
    refreshStructureTab();
  };

  window.updateTrkiWritingTask = function (tIdx, field, val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const list = State.currentDraft.part4.writing_tasks || State.currentDraft.part4.tasks || [];
    if (list[tIdx]) {
      list[tIdx][field] = val;
      State.currentDraft.parts[3].writing_tasks = list;
    }
  };

  window.updateTrkiWritingTaskHints = function (tIdx, textVal) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const list = State.currentDraft.part4.writing_tasks || State.currentDraft.part4.tasks || [];
    if (list[tIdx]) {
      list[tIdx].hints = textVal.split("\n").map(s => s.trim()).filter(Boolean);
      State.currentDraft.parts[3].writing_tasks = list;
    }
  };

  window.addTrkiSpeakingTask = function () {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.part5.speaking_tasks = State.currentDraft.part5.speaking_tasks || State.currentDraft.part5.tasks || [];
    State.currentDraft.part5.speaking_tasks.push({
      title: `Ситуация ${State.currentDraft.part5.speaking_tasks.length + 1}`,
      prompt: "",
      vi: "",
      prepTimeSec: 60,
      talkTimeSec: 90,
      suggested: ""
    });
    State.currentDraft.parts[4].speaking_tasks = State.currentDraft.part5.speaking_tasks;
    refreshStructureTab();
  };

  window.removeTrkiSpeakingTask = function (tIdx) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const list = State.currentDraft.part5.speaking_tasks || State.currentDraft.part5.tasks || [];
    list.splice(tIdx, 1);
    State.currentDraft.parts[4].speaking_tasks = list;
    refreshStructureTab();
  };

  window.updateTrkiSpeakingTask = function (tIdx, field, val) {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    const list = State.currentDraft.part5.speaking_tasks || State.currentDraft.part5.tasks || [];
    if (list[tIdx]) {
      list[tIdx][field] = val;
      State.currentDraft.parts[4].speaking_tasks = list;
    }
  };

  window.updateTrkiAnswerKey = function (partKey, jsonText) {
    if (!State.currentDraft) return;
    try {
      State.currentDraft.answers = State.currentDraft.answers || {};
      State.currentDraft.answers[partKey] = JSON.parse(jsonText);
    } catch (_) {}
  };

  window.autoGenerateTrkiAnswers = function () {
    if (!State.currentDraft) return;
    normalizeTrkiDraftParts(State.currentDraft);
    State.currentDraft.answers = State.currentDraft.answers || {};
    const q1 = (State.currentDraft.part1 && State.currentDraft.part1.questions) || [];
    const q2 = (State.currentDraft.part2 && State.currentDraft.part2.questions) || [];
    const q3 = (State.currentDraft.part3 && State.currentDraft.part3.questions) || [];

    State.currentDraft.answers.part1 = q1.map(q => Number(q.a) || 0);
    State.currentDraft.answers.part2 = q2.map(q => Number(q.a) || 0);
    State.currentDraft.answers.part3 = q3.map(q => Number(q.a) || 0);
    refreshStructureTab();
    toast("Đã tự động tạo mảng đáp án từ câu hỏi!");
  };

  // --- Upgraded Listening Builder (with Timestamps & Dictation words) ---
  function renderListeningBuilder(lines, questions, draft) {
    draft = draft || State.currentDraft || {};
    lines = lines || draft.lines || [];
    questions = questions || draft.questions || [];
    const audioUrl = draft.audio_url || draft.audioUrl || "";

    let linesHtml = "";
    lines.forEach((l, idx) => {
      const startVal = typeof l.start_sec === "number" ? l.start_sec : (typeof l.start === "number" ? l.start : 0);
      const endVal = typeof l.end_sec === "number" ? l.end_sec : (typeof l.end === "number" ? l.end : 5);
      const wordsVal = Array.isArray(l.words) ? l.words.map(w => typeof w === "string" ? w : (w.ru || "")).filter(Boolean).join(", ") : (typeof l.words === "string" ? l.words : "");

      linesHtml += `
        <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6);min-width:28px">#${idx + 1}</span>
              <input type="text" class="p-input" placeholder="Người nói..." value="${escAttr(l.who || "")}" oninput="window.updateListeningLine(${idx}, 'who', this.value)" style="width:130px;font-size:12.5px" />
              <div style="display:flex;align-items:center;gap:4px;font-size:11.5px;color:var(--p-text-muted);background:var(--p-surface-subtle,#f9fafb);padding:2px 8px;border-radius:6px;border:1px solid var(--p-border-subtle,#e5e7eb)">
                <button type="button" class="p-btn p-btn-ghost p-btn-xs" style="padding:1px 5px;font-size:11px;color:var(--p-primary,#0039A6);font-weight:700" onclick="window.seekListeningAudio(${startVal})" title="Nghe thử từ ${startVal}s">▶</button>
                <span>Từ:</span>
                <input type="number" step="0.5" class="p-input" value="${startVal}" oninput="window.updateListeningLine(${idx}, 'start_sec', parseFloat(this.value)||0)" style="width:58px;padding:2px 4px;text-align:center;font-size:12px" />
                <button type="button" class="p-btn p-btn-ghost p-btn-xs" style="padding:1px 4px;font-size:10px" onclick="window.nudgeListeningLine(${idx}, 'start_sec', -0.5)">-0.5</button>
                <button type="button" class="p-btn p-btn-ghost p-btn-xs" style="padding:1px 4px;font-size:10px" onclick="window.nudgeListeningLine(${idx}, 'start_sec', 0.5)">+0.5</button>
                <span>Đến:</span>
                <input type="number" step="0.5" class="p-input" value="${endVal}" oninput="window.updateListeningLine(${idx}, 'end_sec', parseFloat(this.value)||0)" style="width:58px;padding:2px 4px;text-align:center;font-size:12px" />
                <button type="button" class="p-btn p-btn-ghost p-btn-xs" style="padding:1px 4px;font-size:10px" onclick="window.nudgeListeningLine(${idx}, 'end_sec', -0.5)">-0.5</button>
                <button type="button" class="p-btn p-btn-ghost p-btn-xs" style="padding:1px 4px;font-size:10px" onclick="window.nudgeListeningLine(${idx}, 'end_sec', 0.5)">+0.5</button>
              </div>
            </div>
            <button class="p-btn-icon" type="button" onclick="window.removeListeningLine(${idx})" title="Xoá câu thoại này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>

          <div style="display:flex;flex-direction:column;gap:6px">
            <input type="text" class="p-input" placeholder="Câu thoại tiếng Nga (dùng cho Nghe chép chính tả)..." value="${escAttr(l.ru || "")}" oninput="window.updateListeningLine(${idx}, 'ru', this.value)" style="font-size:13.5px;font-weight:600" />
            <input type="text" class="p-input" placeholder="Dịch nghĩa tiếng Việt..." value="${escAttr(l.vi || "")}" oninput="window.updateListeningLine(${idx}, 'vi', this.value)" style="font-size:13px" />
            <input type="text" class="p-input" placeholder="Từ vựng trọng tâm câu này (ngăn cách bởi dấu phẩy): ví dụ: паспорт, билет..." value="${escAttr(wordsVal)}" oninput="window.updateListeningLineWords(${idx}, this.value)" style="font-size:12px" />
          </div>
        </div>
      `;
    });

    let qHtml = "";
    questions.forEach((q, qIdx) => {
      const opts = (q.options || []).join("\n");
      qHtml += `
        <div class="payload-array-row" style="margin-bottom:12px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">Q${qIdx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeListeningQuestion(${qIdx})" title="Xoá câu hỏi này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div class="payload-array-row-fields" style="display:flex;flex-direction:column;gap:8px">
            <input type="text" class="p-input" placeholder="Câu hỏi nghe hiểu: ví dụ: Куда летит пассажир?" value="${escAttr(q.q || "")}" oninput="window.updateListeningQuestion(${qIdx}, 'q', this.value)" style="font-size:13.5px;font-weight:600" />
            <div style="display:flex;gap:10px;align-items:flex-start">
              <textarea class="p-textarea" rows="3" placeholder="Các đáp án (mỗi dòng 1 đáp án)..." oninput="window.updateListeningQuestionOpts(${qIdx}, this.value)" style="flex:1;font-size:13px">${esc(opts)}</textarea>
              <div style="width:160px;display:flex;flex-direction:column;gap:6px">
                <label class="p-label" style="font-size:11.5px">Đáp án đúng:</label>
                <select class="p-select" onchange="window.updateListeningQuestion(${qIdx}, 'a', Number(this.value))">
                  <option value="0" ${q.a === 0 ? "selected" : ""}>Dòng 1</option>
                  <option value="1" ${q.a === 1 ? "selected" : ""}>Dòng 2</option>
                  <option value="2" ${q.a === 2 ? "selected" : ""}>Dòng 3</option>
                  <option value="3" ${q.a === 3 ? "selected" : ""}>Dòng 4</option>
                </select>
              </div>
            </div>
            <input type="text" class="p-input" placeholder="Căn cứ / Giải thích câu thoại..." value="${escAttr(q.ex || "")}" oninput="window.updateListeningQuestion(${qIdx}, 'ex', this.value)" style="font-size:12.5px" />
          </div>
        </div>
      `;
    });

    return `
      <div style="display:flex;flex-direction:column;gap:20px">
        ${audioUrl ? `
          <div style="background:var(--p-surface-elevated,#fff);padding:12px 16px;border-radius:10px;border:1px solid var(--p-border-subtle,#e5e7eb);display:flex;flex-direction:column;gap:6px">
            <div style="font-size:12.5px;font-weight:700">Audio đang nạp (Storage: listening-audio):</div>
            <audio controls src="${escAttr(audioUrl)}" style="width:100%;height:32px"></audio>
          </div>
        ` : ""}

        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <span style="font-weight:700;font-size:15px">Lời thoại &amp; Mốc thời gian nghe chép chính tả (${lines.length} câu)</span>
              <span style="font-size:12px;color:var(--p-text-muted);margin-left:8px">(Dùng cho Luyện nghe &amp; Dictation)</span>
            </div>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addListeningLine()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu thoại</button>
          </div>
          <div class="payload-array-items">
            ${linesHtml || '<div style="text-align:center;padding:24px;color:var(--p-text-muted)">Chưa có câu thoại. Bấm "+ Thêm câu thoại" để tạo.</div>'}
          </div>
        </div>

        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <span style="font-weight:700;font-size:15px">Câu hỏi trắc nghiệm nghe hiểu (${questions.length} câu)</span>
              <span style="font-size:12px;color:var(--p-text-muted);margin-left:8px">(Dùng cho Comprehension Test)</span>
            </div>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addListeningQuestion()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu hỏi</button>
          </div>
          <div class="payload-array-items">
            ${qHtml || '<div style="text-align:center;padding:24px;color:var(--p-text-muted)">Chưa có câu hỏi trắc nghiệm. Bấm "+ Thêm câu hỏi" để tạo.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  // Listening helpers
  window.addListeningLine = function () {
    if (!State.currentDraft) return;
    State.currentDraft.lines = State.currentDraft.lines || [];
    State.currentDraft.lines.push({ who: "Người nói", ru: "", vi: "", start_sec: 0, end_sec: 5, words: [] });
    refreshStructureTab();
  };

  window.removeListeningLine = function (idx) {
    if (!State.currentDraft || !State.currentDraft.lines) return;
    State.currentDraft.lines.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateListeningLine = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.lines || !State.currentDraft.lines[idx]) return;
    State.currentDraft.lines[idx][field] = val;
    if (field === "start_sec") State.currentDraft.lines[idx].start = val;
    if (field === "end_sec") State.currentDraft.lines[idx].end = val;
  };

  window.seekListeningAudio = function (sec) {
    const audio = document.querySelector("#tabStructure audio");
    if (audio) {
      audio.currentTime = Math.max(0, Number(sec) || 0);
      audio.play().catch(() => {});
    }
  };

  window.nudgeListeningLine = function (idx, field, delta) {
    if (!State.currentDraft || !State.currentDraft.lines || !State.currentDraft.lines[idx]) return;
    const cur = parseFloat(State.currentDraft.lines[idx][field]) || 0;
    const nxt = Math.max(0, Math.round((cur + delta) * 10) / 10);
    const line = State.currentDraft.lines[idx];
    line[field] = nxt;
    if (field === "start_sec") {
      line.start = nxt;
      if (typeof line.end_sec === "number" && line.end_sec < nxt) {
        line.end_sec = nxt;
        line.end = nxt;
      }
    }
    if (field === "end_sec") {
      line.end = nxt;
      if (typeof line.start_sec === "number" && line.start_sec > nxt) {
        line.start_sec = nxt;
        line.start = nxt;
      }
    }
    refreshStructureTab();
  };

  window.updateListeningLineWords = function (idx, textVal) {
    if (!State.currentDraft || !State.currentDraft.lines || !State.currentDraft.lines[idx]) return;
    State.currentDraft.lines[idx].words = textVal.split(",").map(s => s.trim()).filter(Boolean);
  };

  window.addListeningQuestion = function () {
    if (!State.currentDraft) return;
    State.currentDraft.questions = State.currentDraft.questions || [];
    State.currentDraft.questions.push({
      q: "",
      options: ["", "", "", ""],
      a: 0,
      ex: ""
    });
    refreshStructureTab();
  };

  window.removeListeningQuestion = function (idx) {
    if (!State.currentDraft || !State.currentDraft.questions) return;
    State.currentDraft.questions.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateListeningQuestion = function (idx, field, val) {
    if (!State.currentDraft || !State.currentDraft.questions || !State.currentDraft.questions[idx]) return;
    State.currentDraft.questions[idx][field] = val;
  };

  window.updateListeningQuestionOpts = function (idx, textVal) {
    if (!State.currentDraft || !State.currentDraft.questions || !State.currentDraft.questions[idx]) return;
    State.currentDraft.questions[idx].options = textVal.split("\n").map(s => s.trim()).filter(Boolean);
  };

  // --- Upgraded Writing Task Builder (Image preview, Vocab, Tips, AI Prompt) ---
  function renderWritingTaskBuilder(draft) {
    draft = draft || State.currentDraft || {};
    const wordsArr = Array.isArray(draft.suggested_words) ? draft.suggested_words : [];
    const tipsArr = Array.isArray(draft.tips) ? draft.tips : [];
    const wordsVal = wordsArr.map(w => {
      if (!w) return "";
      if (typeof w === "string") return w;
      if (typeof w === "object") {
        return w.ru ? (w.vi ? `${w.ru} - ${w.vi}` : w.ru) : (w.word || JSON.stringify(w));
      }
      return String(w);
    }).filter(Boolean).join("\n");
    const tipsVal = tipsArr.join("\n");
    const aiPromptVal = draft.ai_prompt || "";
    const isPicture = draft.task_type === "picture_desc";

    return `
      <div style="display:flex;flex-direction:column;gap:18px">
        <!-- Task Header Banner -->
        <div style="background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
          <div>
            <div style="font-weight:700;font-size:15px;color:var(--p-text,#1f2937)">${esc(draft.title || "Bài luyện viết")}</div>
            <div style="font-size:12.5px;color:var(--p-text-muted)">
              Cấp độ: <strong>${esc(draft.level || "A1")}</strong> • Thể loại: <strong>${isPicture ? "Tả tranh (Письмо по картинке)" : "Luyện dịch (Перевод)"}</strong> • Tối thiểu: <strong>${draft.min_words || 30} từ</strong>
            </div>
          </div>
          ${draft.image_url ? `
            <div style="display:flex;align-items:center;gap:10px">
              <img src="${escAttr(draft.image_url)}" alt="Đề bài" style="height:60px;width:90px;object-fit:cover;border-radius:6px;box-shadow:0 2px 4px rgba(0,0,0,0.1)" onerror="this.style.display='none'" />
              <div style="font-size:11.5px;color:var(--p-primary,#0039A6)">Ảnh Supabase Storage ↗</div>
            </div>
          ` : ""}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px">
          <!-- Suggested Words -->
          <div class="p-form-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <label class="p-label" style="font-weight:700">1. Từ vựng trọng tâm (suggested_words):</label>
              <span class="p-pill p-pill-info" style="font-size:11px">${wordsArr.length} từ</span>
            </div>
            <textarea class="p-textarea" rows="5" placeholder="Mỗi dòng là một từ hoặc cụm từ (VD: Стол hoặc Стол - Cái bàn)..." oninput="State.currentDraft.suggested_words = this.value.split('\n').map(s => s.trim()).filter(Boolean).map(line => { const parts = line.split(/\s*[-—:]\s*/); if (parts.length >= 2) return { ru: parts[0].trim(), vi: parts.slice(1).join(' - ').trim() }; return { ru: line.trim() }; });">${esc(wordsVal)}</textarea>
            <div class="p-help">Các từ này liên kết với kho từ điển để học viên tra cứu nhanh khi viết.</div>
          </div>

          <!-- Guiding Tips -->
          <div class="p-form-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <label class="p-label" style="font-weight:700">2. Mẹo &amp; Câu hỏi định hướng (tips):</label>
              <span class="p-pill p-pill-info" style="font-size:11px">${tipsArr.length} mẹo</span>
            </div>
            <textarea class="p-textarea" rows="5" placeholder="Mỗi dòng là một mẹo làm bài..." oninput="State.currentDraft.tips = this.value.split('\n').map(s => s.trim()).filter(Boolean);">${esc(tipsVal)}</textarea>
            <div class="p-help">Định hướng ngữ pháp và cấu trúc câu giúp học viên đạt điểm TRKI cao.</div>
          </div>
        </div>

        <!-- AI Scoring Prompt Rubric -->
        <div class="p-form-group">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <label class="p-label" style="font-weight:700">3. Prompt AI chấm điểm theo tiêu chí TRKI (ai_prompt):</label>
            <button type="button" class="p-btn p-btn-secondary p-btn-xs" id="btnInsertRubric" onclick="window.insertStandardTrkiRubric()">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 12 }) : "📋"} Dán Rubric AI TRKI mẫu</button>
          </div>
          <textarea class="p-textarea" rows="6" id="txtWritingAiPrompt" placeholder="Dán prompt hướng dẫn AI Rusika chấm điểm 4 tiêu chí..." oninput="State.currentDraft.ai_prompt = this.value;" style="font-size:13px;line-height:1.5">${esc(aiPromptVal)}</textarea>
          <div class="p-help">Rubric này gửi cho mô hình AI khi học viên nộp bài để trả về điểm số và nhận xét chi tiết.</div>
        </div>

        <!-- Model Essay Preview -->
        <div class="p-form-group">
          <label class="p-label" style="font-weight:700">4. Bài viết mẫu tham khảo (Model Answer):</label>
          <textarea class="p-textarea" rows="4" placeholder="Bài viết mẫu chuẩn TRKI..." oninput="State.currentDraft.model_answer = this.value; State.currentDraft.sample_essay = this.value;" style="font-size:13px;line-height:1.6">${esc(draft.model_answer || draft.sample_essay || "")}</textarea>
        </div>
      </div>
    `;
  }

  // Alias for backward compatibility
  function renderWritingTipsBuilder(words, tips) {
    return renderWritingTaskBuilder(State.currentDraft);
  }

  window.insertStandardTrkiRubric = function () {
    if (!State.currentDraft) return;
    const lvl = State.currentDraft.level || "A1";
    const minW = State.currentDraft.min_words || 30;
    const rubric = `Hãy đóng vai giám khảo TRKI chấm bài viết tiếng Nga cấp độ ${lvl} theo đúng quy chuẩn 4 tiêu chí:
1. Giải quyết nhiệm vụ giao tiếp (Решение коммуникативной задачи): đúng chủ đề, đạt tối thiểu ${minW} từ.
2. Tính liên kết và bố cục (Связность и композиция текста): mở bài, thân bài, kết bài mạch lạc.
3. Độ chuẩn xác Từ vựng & Ngữ pháp (Лексико-грамматическое оформление): đúng giống, số, cách của danh từ/tính từ, chia động từ chuẩn.
4. Chính tả và dấu câu (Орфография и пунктуация): viết hoa, trọng âm, ngắt câu chuẩn.
Cho điểm tổng kết từ 0 đến 100 kèm phân tích lỗi sai và đề xuất viết lại câu hoàn chỉnh.`;
    State.currentDraft.ai_prompt = rubric;
    const txt = document.getElementById("txtWritingAiPrompt");
    if (txt) txt.value = rubric;
    const btn = document.getElementById("btnInsertRubric");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = `✓ Đã dán Rubric TRKI!`;
      btn.style.borderColor = "#10b981";
      btn.style.color = "#10b981";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.borderColor = "";
        btn.style.color = "";
      }, 1500);
    }
    toast("Đã dán mẫu Rubric AI TRKI thành công!", "success");
  };


  // --- Shop Product Specs Builder ---
  function renderShopSpecsBuilder(specs) {
    let rowsHtml = "";
    (specs || []).forEach((spec, idx) => {
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:8px">
          <span class="payload-array-row-num">#${idx + 1}</span>
          <div class="payload-array-row-fields">
            <input type="text" class="p-input" placeholder="Ví dụ: Bìa mềm 350 trang, Tặng kèm audio MP3..." value="${escAttr(spec)}" oninput="window.updateShopSpecItem(${idx}, this.value)" />
          </div>
          <button class="p-btn-icon" type="button" onclick="window.removeShopSpecItem(${idx})">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <span style="font-weight:700">Thông số kỹ thuật &amp; Quyền lợi kèm theo (${(specs || []).length} mục)</span>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addShopSpecItem()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm mục</button>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="padding:20px;text-align:center;color:var(--p-text-muted)">Chưa có thông số nào. Bấm "+ Thêm mục" để tạo (ví dụ: Số trang, Định dạng sách, File nghe đính kèm).</div>'}
        </div>
      </div>
    `;
  }

  window.addShopSpecItem = function () {
    if (!State.currentDraft) return;
    State.currentDraft.features = State.currentDraft.features || State.currentDraft.specs || [];
    State.currentDraft.features.push("");
    refreshStructureTab();
  };

  window.removeShopSpecItem = function (idx) {
    if (!State.currentDraft) return;
    const list = State.currentDraft.features || State.currentDraft.specs || [];
    list.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateShopSpecItem = function (idx, val) {
    if (!State.currentDraft) return;
    State.currentDraft.features = State.currentDraft.features || State.currentDraft.specs || [];
    State.currentDraft.features[idx] = val;
  };

  // --- Kho từ vựng: Chi tiết Ví dụ câu & Cấu trúc ngữ pháp ---
  function renderVocabDetailsBuilder(draft) {
    if (!draft) return "";
    draft.examples = Array.isArray(draft.examples) ? draft.examples : [];
    draft.structures = Array.isArray(draft.structures) ? draft.structures : [];
    draft.synonyms = Array.isArray(draft.synonyms) ? draft.synonyms : [];
    draft.antonyms = Array.isArray(draft.antonyms) ? draft.antonyms : [];

    let exRowsHtml = "";
    draft.examples.forEach((ex, idx) => {
      const ruVal = typeof ex === "string" ? ex : (ex.ru || "");
      const viVal = typeof ex === "string" ? "" : (ex.vi || "");
      exRowsHtml += `
        <div class="payload-array-row" style="margin-bottom:10px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">Ví dụ #${idx + 1}</span>
            <button class="p-btn-icon" type="button" onclick="window.removeVocabExample(${idx})" title="Xóa ví dụ này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div>
              <label class="p-label" style="font-size:11.5px">Câu tiếng Nga (Có trọng âm):</label>
              <input type="text" class="p-input" placeholder="Ví dụ: Мо́ре о́чень споко́йное сего́дня." value="${escAttr(ruVal)}" oninput="window.updateVocabExample(${idx}, 'ru', this.value)" style="font-size:13.5px" />
            </div>
            <div>
              <label class="p-label" style="font-size:11.5px">Dịch nghĩa tiếng Việt:</label>
              <input type="text" class="p-input" placeholder="Ví dụ: Biển hôm nay rất yên bình." value="${escAttr(viVal)}" oninput="window.updateVocabExample(${idx}, 'vi', this.value)" style="font-size:13px" />
            </div>
          </div>
        </div>
      `;
    });

    let strRowsHtml = "";
    draft.structures.forEach((st, idx) => {
      const patVal = typeof st === "string" ? st : (st.pattern || st.structure || "");
      const meanVal = typeof st === "string" ? "" : (st.meaning || st.vi || "");
      strRowsHtml += `
        <div class="payload-array-row" style="margin-bottom:8px;padding:10px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:8px">
          <div style="display:flex;gap:8px;align-items:center">
            <span class="payload-array-row-num">#${idx + 1}</span>
            <input type="text" class="p-input" placeholder="Mẫu cụm: e.g. плавать в + Cách 6" value="${escAttr(patVal)}" oninput="window.updateVocabStructure(${idx}, 'pattern', this.value)" style="flex:1;font-size:13px" />
            <input type="text" class="p-input" placeholder="Ý nghĩa / giải thích..." value="${escAttr(meanVal)}" oninput="window.updateVocabStructure(${idx}, 'meaning', this.value)" style="flex:1;font-size:13px" />
            <button class="p-btn-icon" type="button" onclick="window.removeVocabStructure(${idx})" title="Xóa cụm từ này" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
          </div>
        </div>
      `;
    });

    const synText = draft.synonyms.join(", ");
    const antText = draft.antonyms.join(", ");

    return `
      <div style="display:flex;flex-direction:column;gap:18px">
        <!-- Section 1: Examples -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <div style="font-weight:700;font-size:15px;color:var(--p-text)">Câu ví dụ thực tế (Examples — ${draft.examples.length} câu)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Các câu văn minh họa cách dùng từ trong ngữ cảnh đời sống thực tế</div>
            </div>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addVocabExample()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu ví dụ</button>
          </div>
          <div class="payload-array-items">
            ${exRowsHtml || '<div style="padding:24px;text-align:center;color:var(--p-text-muted);border:1px dashed var(--p-border-subtle);border-radius:8px">Chưa có câu ví dụ nào. Bấm "+ Thêm câu ví dụ" để bổ sung ví dụ minh họa.</div>'}
          </div>
        </div>

        <!-- Section 2: Structures / Collocations -->
        <div class="payload-array-container">
          <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div>
              <div style="font-weight:700;font-size:15px;color:var(--p-text)">Cụm từ &amp; Cấu trúc kết hợp (Structures &amp; Collocations — ${draft.structures.length} cụm)</div>
              <div style="font-size:12px;color:var(--p-text-muted)">Các mẫu kết hợp giới từ, cách ngữ pháp và quán ngữ thường gặp</div>
            </div>
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.addVocabStructure()">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm cấu trúc mẫu</button>
          </div>
          <div class="payload-array-items">
            ${strRowsHtml || '<div style="padding:20px;text-align:center;color:var(--p-text-muted);border:1px dashed var(--p-border-subtle);border-radius:8px">Chưa có cấu trúc mẫu nào. Bấm "+ Thêm cấu trúc mẫu" để bổ sung.</div>'}
          </div>
        </div>

        <!-- Section 3: Synonyms & Antonyms -->
        <div style="background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px;padding:16px">
          <div style="font-weight:700;font-size:14px;margin-bottom:12px;color:var(--p-text)">Từ đồng nghĩa &amp; Trái nghĩa (Synonyms &amp; Antonyms)</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:14px">
            <div>
              <label class="p-label" style="font-size:12px">Từ đồng nghĩa (Phân cách bằng dấu phẩy):</label>
              <input type="text" class="p-input" placeholder="Ví dụ: студент, учащийся..." value="${escAttr(synText)}" oninput="window.updateVocabSynonyms(this.value)" style="font-size:13px" />
              <div style="font-size:11px;color:var(--p-text-muted);margin-top:4px">Lưu trữ dưới dạng mảng chuỗi <code>text[]</code> trong Supabase</div>
            </div>
            <div>
              <label class="p-label" style="font-size:12px">Từ trái nghĩa (Phân cách bằng dấu phẩy):</label>
              <input type="text" class="p-input" placeholder="Ví dụ: преподаватель, профессор..." value="${escAttr(antText)}" oninput="window.updateVocabAntonyms(this.value)" style="font-size:13px" />
              <div style="font-size:11px;color:var(--p-text-muted);margin-top:4px">Lưu trữ dưới dạng mảng chuỗi <code>text[]</code> trong Supabase</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.addVocabExample = function () {
    if (!State.currentDraft) return;
    State.currentDraft.examples = Array.isArray(State.currentDraft.examples) ? State.currentDraft.examples : [];
    State.currentDraft.examples.push({ ru: "", vi: "" });
    refreshStructureTab();
  };

  window.removeVocabExample = function (idx) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.examples)) return;
    State.currentDraft.examples.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateVocabExample = function (idx, field, val) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.examples) || !State.currentDraft.examples[idx]) return;
    if (typeof State.currentDraft.examples[idx] === "string") {
      State.currentDraft.examples[idx] = { ru: State.currentDraft.examples[idx], vi: "" };
    }
    State.currentDraft.examples[idx][field] = val;
  };

  window.addVocabStructure = function () {
    if (!State.currentDraft) return;
    State.currentDraft.structures = Array.isArray(State.currentDraft.structures) ? State.currentDraft.structures : [];
    State.currentDraft.structures.push({ pattern: "", meaning: "" });
    refreshStructureTab();
  };

  window.removeVocabStructure = function (idx) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.structures)) return;
    State.currentDraft.structures.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateVocabStructure = function (idx, field, val) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.structures) || !State.currentDraft.structures[idx]) return;
    if (typeof State.currentDraft.structures[idx] === "string") {
      State.currentDraft.structures[idx] = { pattern: State.currentDraft.structures[idx], meaning: "" };
    }
    State.currentDraft.structures[idx][field] = val;
  };

  window.updateVocabSynonyms = function (val) {
    if (!State.currentDraft) return;
    State.currentDraft.synonyms = String(val || "").split(",").map(s => s.trim()).filter(Boolean);
  };

  window.updateVocabAntonyms = function (val) {
    if (!State.currentDraft) return;
    State.currentDraft.antonyms = String(val || "").split(",").map(s => s.trim()).filter(Boolean);
  };

  // --- Lọ từ vựng: Danh sách từ trong lọ (VOCAB_JARS) ---
  function renderVocabWordsBuilder(words) {
    const wordList = Array.isArray(words) ? words : [];
    let rowsHtml = "";
    wordList.forEach((w, idx) => {
      const ruVal = w.stress || w.word_with_stress || w.ru || "";
      const viVal = w.meaning_vi || w.vi || "";
      const posVal = w.pos || w.note || "";
      const exVal = w.ex || (Array.isArray(w.examples) && w.examples[0] ? w.examples[0].ru : "");
      const exViVal = w.ex_vi || (Array.isArray(w.examples) && w.examples[0] ? w.examples[0].vi : "");
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:10px;padding:12px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="payload-array-row-num" style="font-weight:700;color:var(--p-primary,#0039A6)">#${idx + 1}</span>
              <span style="font-weight:600;font-size:14px">${esc(ruVal || "Từ mới")}</span>
              ${w.level ? `<span class="p-pill p-pill-info" style="font-size:10px">${esc(w.level)}</span>` : ""}
            </div>
            <div style="display:flex;gap:4px">
              <button class="p-btn-icon" type="button" onclick="window.removeVocabJarWord(${idx})" title="Xóa từ khỏi lọ" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;margin-bottom:8px">
            <div>
              <label class="p-label" style="font-size:11px">Từ tiếng Nga (Có trọng âm):</label>
              <input type="text" class="p-input" placeholder="студе́нт" value="${escAttr(ruVal)}" oninput="window.updateVocabJarWord(${idx}, 'ru', this.value)" style="font-size:13.5px" />
            </div>
            <div>
              <label class="p-label" style="font-size:11px">Nghĩa tiếng Việt:</label>
              <input type="text" class="p-input" placeholder="sinh viên nam" value="${escAttr(viVal)}" oninput="window.updateVocabJarWord(${idx}, 'vi', this.value)" style="font-size:13px" />
            </div>
            <div>
              <label class="p-label" style="font-size:11px">Từ loại / Giống / Ghi chú:</label>
              <input type="text" class="p-input" placeholder="сущ. м. (он)" value="${escAttr(posVal)}" oninput="window.updateVocabJarWord(${idx}, 'pos', this.value)" style="font-size:12.5px" />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:8px">
            <input type="text" class="p-input" placeholder="Câu ví dụ tiếng Nga..." value="${escAttr(exVal)}" oninput="window.updateVocabJarWord(${idx}, 'ex', this.value)" style="font-size:12.5px" />
            <input type="text" class="p-input" placeholder="Bản dịch tiếng Việt ví dụ..." value="${escAttr(exViVal)}" oninput="window.updateVocabJarWord(${idx}, 'ex_vi', this.value)" style="font-size:12.5px" />
          </div>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div>
            <div style="font-weight:700;font-size:15px;color:var(--p-text)">Danh sách từ vựng trong lọ (${wordList.length} từ)</div>
            <div style="font-size:12px;color:var(--p-text-muted)">Các từ vựng cốt lõi liên kết trong lọ, tự động đồng bộ sang bảng jar_items &amp; vocabularies</div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.openVocabPickerModal()" style="font-size:12px;padding:6px 12px">
              ${window.RusiIcons ? RusiIcons.get("search-icon", { size: 14 }) : "🔍"} Chọn từ có sẵn từ Kho từ vựng (2000+ từ)
            </button>
            <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.addVocabJarWord()" style="font-size:12px;padding:6px 12px">
              ${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm từ mới vào lọ
            </button>
          </div>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="padding:28px;text-align:center;color:var(--p-text-muted);border:1px dashed var(--p-border-subtle);border-radius:8px">Lọ từ chưa có từ vựng nào. Bấm "+ Thêm từ vào lọ" để thêm.</div>'}
        </div>
      </div>
    `;
  }

  window.addVocabJarWord = function () {
    if (!State.currentDraft) return;
    State.currentDraft.words = Array.isArray(State.currentDraft.words) ? State.currentDraft.words : [];
    State.currentDraft.words.push({
      id: generateUUID(),
      word_with_stress: "",
      ru: "",
      meaning_vi: "",
      vi: "",
      pos: "сущ.",
      level: State.currentDraft.level || "A1",
      ex: "",
      ex_vi: ""
    });
    refreshStructureTab();
  };

  window.removeVocabJarWord = function (idx) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.words)) return;
    State.currentDraft.words.splice(idx, 1);
    refreshStructureTab();
  };

  window.updateVocabJarWord = function (idx, field, val) {
    if (!State.currentDraft || !Array.isArray(State.currentDraft.words) || !State.currentDraft.words[idx]) return;
    const item = State.currentDraft.words[idx];
    item[field] = val;
    if (field === "ru") {
      item.word_with_stress = val;
      item.stress = val;
    }
    if (field === "vi") {
      item.meaning_vi = val;
    }
  };

  window.openVocabPickerModal = function () {
    const existing = document.getElementById("vocabPickerModal");
    if (existing) existing.remove();

    const vocabList = getMergedList("VOCABULARIES");
    const modal = document.createElement("div");
    modal.id = "vocabPickerModal";
    modal.className = "payload-modal-backdrop";
    modal.style.cssText = "display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;backdrop-filter:blur(4px);";

    modal.innerHTML = `
      <div class="payload-modal" style="width:90%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;background:var(--p-surface-elevated,#fff);border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.3);border:1px solid var(--p-border-subtle,#e5e7eb);overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--p-border-subtle,#e5e7eb)">
          <div>
            <div style="font-weight:700;font-size:16px;color:var(--p-text,#1f2937)">Chọn từ vựng từ Kho từ điển toàn hệ thống</div>
            <div style="font-size:12px;color:var(--p-text-muted,#6b7280)">Kho từ điển hiện có ${vocabList.length} từ. Gõ để tìm kiếm nhanh và gán vào Lọ.</div>
          </div>
          <button type="button" class="p-btn-icon" onclick="document.getElementById('vocabPickerModal').remove()" style="font-size:18px">✕</button>
        </div>
        <div style="padding:12px 20px;border-bottom:1px solid var(--p-border-subtle,#e5e7eb);background:var(--p-surface-subtle,#f9fafb)">
          <input type="text" id="vocabPickerSearchInput" class="p-input" placeholder="Nhập từ tiếng Nga hoặc nghĩa tiếng Việt để tìm..." style="font-size:14px;padding:8px 12px" />
        </div>
        <div id="vocabPickerResults" style="flex:1;overflow-y:auto;padding:10px 20px;max-height:480px">
          <!-- Rendered items -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const input = document.getElementById("vocabPickerSearchInput");
    const resultsContainer = document.getElementById("vocabPickerResults");

    const renderResults = (query = "") => {
      const q = query.toLowerCase().trim();
      const currentWordsInJar = new Set((State.currentDraft.words || []).map(w => w.id || w.ru || w.word_with_stress));
      const filtered = vocabList.filter(v => {
        if (!q) return true;
        const ru = (v.word_with_stress || v.ru || "").toLowerCase();
        const vi = (v.meaning_vi || v.vi || "").toLowerCase();
        return ru.includes(q) || vi.includes(q);
      }).slice(0, 30);

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div style="padding:40px;text-align:center;color:var(--p-text-muted,#6b7280)">Không tìm thấy từ nào phù hợp với "${esc(q)}".</div>`;
        return;
      }

      resultsContainer.innerHTML = filtered.map(v => {
        const ru = v.word_with_stress || v.ru || "";
        const vi = v.meaning_vi || v.vi || "";
        const alreadyInJar = currentWordsInJar.has(v.id) || currentWordsInJar.has(ru);
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;margin-bottom:6px;border-radius:8px;border:1px solid var(--p-border-subtle,#e5e7eb);background:var(--p-surface,#fff);transition:background 0.15s">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-weight:700;font-size:14.5px;color:var(--p-text,#1f2937)">${esc(ru)}</span>
                ${v.pos ? `<span style="font-size:11px;color:var(--p-text-muted,#6b7280)">[${esc(v.pos)}]</span>` : ""}
                ${v.level ? `<span class="p-pill p-pill-info" style="font-size:10px">${esc(v.level)}</span>` : ""}
              </div>
              <div style="font-size:12.5px;color:var(--p-text-muted,#4b5563);margin-top:2px">${esc(vi)}</div>
            </div>
            <div>
              ${alreadyInJar
                ? `<span style="font-size:11.5px;color:var(--p-success,#10b981);font-weight:600">✓ Đã có trong lọ</span>`
                : `<button type="button" class="p-btn p-btn-secondary p-btn-sm" style="font-size:11.5px;padding:4px 10px" onclick="window.pickVocabIntoJar('${escAttr(v.id)}')">+ Chọn từ này</button>`
              }
            </div>
          </div>
        `;
      }).join("");
    };

    input.oninput = (e) => renderResults(e.target.value);
    renderResults();
    input.focus();
  };

  window.pickVocabIntoJar = function (vocabId) {
    const vocabList = getMergedList("VOCABULARIES");
    const v = vocabList.find(x => x.id === vocabId);
    if (!v || !State.currentDraft) return;

    State.currentDraft.words = Array.isArray(State.currentDraft.words) ? State.currentDraft.words : [];
    State.currentDraft.words.push({
      id: v.id || generateUUID(),
      word_with_stress: v.word_with_stress || v.ru || "",
      ru: v.word_with_stress || v.ru || "",
      meaning_vi: v.meaning_vi || v.vi || "",
      vi: v.meaning_vi || v.vi || "",
      pos: v.pos || "сущ.",
      level: v.level || State.currentDraft.level || "A1",
      ex: (Array.isArray(v.examples) && v.examples[0]) ? (v.examples[0].ru || "") : "",
      ex_vi: (Array.isArray(v.examples) && v.examples[0]) ? (v.examples[0].vi || "") : ""
    });

    const modal = document.getElementById("vocabPickerModal");
    if (modal) modal.remove();

    refreshStructureTab();
    toast(`Đã thêm từ "${v.word_with_stress || v.ru}" vào lọ!`, "success");
  };

  // --- Speaking Sets Builder ---
  function renderSpeakingBuilder(items, draft) {
    let rowsHtml = "";
    (items || []).forEach((it, idx) => {
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:8px;padding:10px;background:var(--p-surface-elevated,#fff);border:1px solid var(--p-border-subtle,#e5e7eb);border-radius:8px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
            <span class="payload-array-row-num">#${idx + 1}</span>
            <input type="text" class="p-input" placeholder="Người nói..." value="${escAttr(it.who || "")}" oninput="if(State.currentDraft && State.currentDraft.items && State.currentDraft.items[${idx}]) State.currentDraft.items[${idx}].who = this.value;" style="width:130px;font-size:12px" />
            <input type="number" step="0.5" class="p-input" placeholder="Từ giây" value="${it.startSec != null ? it.startSec : (it.start || 0)}" oninput="if(State.currentDraft && State.currentDraft.items && State.currentDraft.items[${idx}]) { State.currentDraft.items[${idx}].startSec = parseFloat(this.value)||0; State.currentDraft.items[${idx}].start = parseFloat(this.value)||0; }" style="width:70px;font-size:12px;text-align:center" />
            <input type="number" step="0.5" class="p-input" placeholder="Đến giây" value="${it.endSec != null ? it.endSec : (it.end || 5)}" oninput="if(State.currentDraft && State.currentDraft.items && State.currentDraft.items[${idx}]) { State.currentDraft.items[${idx}].endSec = parseFloat(this.value)||0; State.currentDraft.items[${idx}].end = parseFloat(this.value)||0; }" style="width:70px;font-size:12px;text-align:center" />
            <button class="p-btn-icon" type="button" onclick="if(State.currentDraft && State.currentDraft.items) { State.currentDraft.items.splice(${idx}, 1); refreshStructureTab(); }" title="Xóa câu" style="margin-left:auto;color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 13 }) : "✕"}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <input type="text" class="p-input" placeholder="Câu tiếng Nga (Có trọng âm)..." value="${escAttr(it.text_stressed || it.text_ru || it.ru || "")}" oninput="if(State.currentDraft && State.currentDraft.items && State.currentDraft.items[${idx}]) { State.currentDraft.items[${idx}].text_stressed = this.value; State.currentDraft.items[${idx}].text_ru = this.value; State.currentDraft.items[${idx}].ru = this.value; }" style="font-size:13px" />
            <input type="text" class="p-input" placeholder="Bản dịch tiếng Việt..." value="${escAttr(it.translation_vi || it.vi || "")}" oninput="if(State.currentDraft && State.currentDraft.items && State.currentDraft.items[${idx}]) { State.currentDraft.items[${idx}].translation_vi = this.value; State.currentDraft.items[${idx}].vi = this.value; }" style="font-size:12.5px" />
          </div>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <div style="font-weight:700;font-size:14.5px">Danh sách câu thoại Shadowing (${(items || []).length} câu)</div>
            <div style="font-size:12px;color:var(--p-text-muted)">Khớp theo mốc thời gian phụ đề video YouTube</div>
          </div>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="if(State.currentDraft) { State.currentDraft.items = Array.isArray(State.currentDraft.items) ? State.currentDraft.items : []; State.currentDraft.items.push({ id: Date.now(), who: 'Người nói', startSec: 0, endSec: 5, start: 0, end: 5, ru: '', text_ru: '', text_stressed: '', vi: '', translation_vi: '' }); refreshStructureTab(); }">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm câu thoại</button>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="padding:20px;text-align:center;color:var(--p-text-muted)">Chưa có câu thoại nào. Bấm "+ Thêm câu thoại" để tạo.</div>'}
        </div>
      </div>
    `;
  }

  // --- Packages Features Builder ---
  function renderPackagesFeaturesBuilder(features) {
    let rowsHtml = "";
    (features || []).forEach((feat, idx) => {
      rowsHtml += `
        <div class="payload-array-row" style="margin-bottom:8px;display:flex;gap:8px;align-items:center">
          <span class="payload-array-row-num">#${idx + 1}</span>
          <input type="text" class="p-input" placeholder="Ví dụ: Mở khóa trọn bộ 10 lọ từ vựng..." value="${escAttr(feat)}" oninput="if(State.currentDraft && State.currentDraft.features) State.currentDraft.features[${idx}] = this.value;" style="flex:1;font-size:13px" />
          <button class="p-btn-icon" type="button" onclick="if(State.currentDraft && State.currentDraft.features) { State.currentDraft.features.splice(${idx}, 1); refreshStructureTab(); }" title="Xóa quyền lợi" style="color:var(--p-danger,#dc2626)">${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : "✕"}</button>
        </div>
      `;
    });

    return `
      <div class="payload-array-container">
        <div class="payload-array-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <div style="font-weight:700;font-size:14.5px">Danh sách quyền lợi gói (${(features || []).length} mục)</div>
            <div style="font-size:12px;color:var(--p-text-muted)">Hiển thị trên bảng giá và trang thanh toán</div>
          </div>
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="if(State.currentDraft) { State.currentDraft.features = Array.isArray(State.currentDraft.features) ? State.currentDraft.features : []; State.currentDraft.features.push('Quyền lợi mới'); refreshStructureTab(); }">${window.RusiIcons ? RusiIcons.get("plus", { size: 14 }) : "+"} Thêm quyền lợi</button>
        </div>
        <div class="payload-array-items">
          ${rowsHtml || '<div style="padding:20px;text-align:center;color:var(--p-text-muted)">Chưa có quyền lợi nào. Bấm "+ Thêm quyền lợi" để tạo.</div>'}
        </div>
      </div>
    `;
  }

  function refreshStructureTab() {
    const tabS = document.getElementById("tabStructure");
    if (tabS && State.currentSlug && State.currentDraft) {
      tabS.innerHTML = renderActiveStructureBuilder(State.currentSlug, State.currentDraft);
    }
  }

  // =========================================================================
  // SUPABASE POSTGRESQL SYNC ENGINE (TWO-WAY CLOUD INTEGRATION)
  // =========================================================================

  const SupabaseSyncEngine = {
    MAPPINGS: {
      TRKI_BANK: {
        table: "trki_tests",
        conflict: "id",
        deleteCol: "id",
        label: "Đề thi TRKI",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const partsArr = Array.isArray(doc.parts) ? doc.parts : (Array.isArray(doc.sections) ? doc.sections : []);
          const p1 = doc.part1 || (partsArr[0] || {});
          const p2 = doc.part2 || (partsArr[1] || {});
          const p3 = doc.part3 || (partsArr[2] || {});
          const p4 = doc.part4 || (partsArr[3] || {});
          const p5 = doc.part5 || (partsArr[4] || {});
          const subType = doc.sub_test_type || doc.category || "full";
          const dur = Number(doc.durationMin || doc.duration_min || doc.duration_minutes) || 45;
          const pass = Number(doc.passPercent || doc.pass_percent || doc.passing_score) || 66;
          return {
            id: String(doc.id).trim(),
            code: String(doc.code || doc.id).trim(),
            title: doc.title || "Đề thi TRKI",
            level: doc.level || "A1",
            level_name: doc.levelName || doc.level_name || ("Sơ cấp " + (doc.level || "A1")),
            category: subType,
            sub_test_type: subType,
            duration_min: dur,
            duration_minutes: dur,
            pass_percent: pass,
            passing_score: pass,
            sections: partsArr,
            parts: partsArr,
            part1: p1,
            part2: p2,
            part3: p3,
            part4: p4,
            part5: p5,
            answers: doc.answers || {},
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            is_published: Boolean(doc.is_published === undefined ? true : (doc.is_published === true || doc.is_published === "true")),
            raw_data: { parts: partsArr },
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          const partsArr = (Array.isArray(row.parts) && row.parts.length)
            ? row.parts
            : ((row.raw_data && Array.isArray(row.raw_data.parts))
              ? row.raw_data.parts
              : (Array.isArray(row.sections) ? row.sections : []));
          const subType = row.sub_test_type || row.category || "full";
          return {
            id: row.code || row.id,
            uuid: row.id,
            code: row.code || row.id,
            title: row.title || "Đề thi TRKI",
            level: row.level || "A1",
            levelName: row.level_name || ("TRKI " + (row.level || "A1")),
            category: subType,
            sub_test_type: subType,
            categoryName: row.categoryName || (subType === "full" ? "Đề thi toàn diện (5 phần)" : subType),
            durationMin: Number(row.duration_min || row.duration_minutes) || 45,
            passPercent: Number(row.pass_percent || row.passing_score) || 66,
            is_pro_only: Boolean(row.is_pro_only),
            is_published: row.is_published !== undefined ? Boolean(row.is_published) : true,
            icon: row.icon || "award-badge",
            parts: partsArr,
            part1: row.part1 || (partsArr[0] || null),
            part2: row.part2 || (partsArr[1] || null),
            part3: row.part3 || (partsArr[2] || null),
            part4: row.part4 || (partsArr[3] || null),
            part5: row.part5 || (partsArr[4] || null),
            answers: row.answers || null
          };
        }
      },

      TRKI_QUESTION_BANK: {
        table: "trki_question_bank",
        conflict: "id",
        deleteCol: "id",
        label: "Ngân hàng câu hỏi TRKI",
        idKey: (doc) => doc.id || doc.code,
        toRow: (doc) => {
          const qId = (doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID();
          doc.id = qId;
          const opts = Array.isArray(doc.options)
            ? doc.options
            : (typeof doc.options === "string" ? doc.options.split("\n").map(s => s.trim()).filter(Boolean) : []);
          const correctIdx = Number(doc.correct_index != null ? doc.correct_index : 0);
          const correctAns = doc.correct_answer || (opts[correctIdx] || "");
          const orderIdx = Number(doc.order_index != null ? doc.order_index : (doc.question_number != null ? doc.question_number : 1));
          return {
            id: qId,
            code: doc.code || ("TRKI_Q_" + Date.now().toString().slice(-4)),
            test_code: doc.test_code || "",
            test_id: doc.test_code || doc.test_id || null,
            level: doc.level || "A1",
            sub_test: doc.sub_test || doc.sub_test_type || "lexis_grammar",
            part_number: Number(doc.part_number) || 1,
            question_type: doc.question_type || "multiple_choice",
            order_index: orderIdx,
            prompt: doc.prompt || "",
            prompt_vi: doc.prompt_vi || null,
            passage: doc.passage || doc.reading_text || null,
            audio_url: doc.audio_url || null,
            image_url: doc.image_url || null,
            options: opts,
            correct_index: correctIdx,
            correct_answer: correctAns,
            explanation: doc.explanation || null,
            topic: doc.topic || null,
            grammar_case: doc.grammar_case || null,
            difficulty: Number(doc.difficulty) || 2,
            points: Number(doc.points) || 1.0,
            is_published: Boolean(doc.is_published === undefined ? (doc.is_active !== undefined ? doc.is_active : true) : (doc.is_published === true || doc.is_published === "true")),
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id,
          uuid: row.id,
          code: row.code || row.id,
          test_code: row.test_code || "",
          test_id: row.test_id || row.test_code || "",
          level: row.level || "A1",
          sub_test: row.sub_test || "lexis_grammar",
          part_number: Number(row.part_number) || 1,
          question_type: row.question_type || "multiple_choice",
          order_index: Number(row.order_index) || 1,
          prompt: row.prompt || "",
          prompt_vi: row.prompt_vi || "",
          passage: row.passage || "",
          audio_url: row.audio_url || "",
          image_url: row.image_url || "",
          options: Array.isArray(row.options) ? row.options : [],
          correct_index: row.correct_index != null ? Number(row.correct_index) : 0,
          correct_answer: row.correct_answer || "",
          explanation: row.explanation || "",
          topic: row.topic || "",
          grammar_case: row.grammar_case || "",
          difficulty: Number(row.difficulty) || 2,
          points: Number(row.points) || 1.0,
          is_published: row.is_published !== undefined ? Boolean(row.is_published) : true,
          is_pro_only: Boolean(row.is_pro_only)
        })
      },

      VOCABULARIES: {
        table: "vocabularies",
        conflict: "id",
        deleteCol: "id",
        label: "Kho từ điển",
        idKey: (doc) => doc.id || doc.word_with_stress,
        toRow: (doc) => {
          const w = String(doc.word_with_stress || doc.ru || doc.word || "").trim();
          const vId = (doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID();
          doc.id = vId;
          return {
            id: vId,
            word_with_stress: w || "сло́во",
            pos: doc.pos || doc.type || "сущ.",
            meaning_vi: doc.meaning_vi || doc.vi || "từ ngữ",
            level: doc.level || "A1",
            gender: doc.gender || null,
            aspect: doc.aspect || null,
            notes: doc.notes || doc.note || null,
            structures: Array.isArray(doc.structures) ? doc.structures : [],
            examples: Array.isArray(doc.examples) ? doc.examples : (doc.ex ? [{ ru: doc.ex, vi: doc.ex_vi || "" }] : []),
            synonyms: Array.isArray(doc.synonyms) ? doc.synonyms : [],
            antonyms: Array.isArray(doc.antonyms) ? doc.antonyms : [],
            audio_url: doc.audio_url || doc.audioUrl || null,
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id,
          uuid: row.id,
          jar_id: (Array.isArray(row.jar_items) && row.jar_items[0] && row.jar_items[0].jar_id) ? row.jar_items[0].jar_id : "",
          word_with_stress: row.word_with_stress,
          ru: row.word_with_stress,
          word_normalized: row.word_normalized,
          pos: row.pos,
          meaning_vi: row.meaning_vi,
          vi: row.meaning_vi,
          level: row.level || "A1",
          gender: row.gender || "",
          aspect: row.aspect || "",
          notes: row.notes || "",
          audio_url: row.audio_url || "",
          examples: Array.isArray(row.examples) ? row.examples : [],
          structures: Array.isArray(row.structures) ? row.structures : [],
          synonyms: Array.isArray(row.synonyms) ? row.synonyms : [],
          antonyms: Array.isArray(row.antonyms) ? row.antonyms : [],
          publication_status: "published"
        })
      },

      VOCAB_JARS: {
        table: "vocab_jars",
        conflict: "code",
        deleteCol: "code",
        label: "Lọ từ vựng",
        idKey: (doc) => doc.id || doc.code,
        toRow: (doc) => {
          const wordsArr = Array.isArray(doc.words) ? doc.words : [];
          const jarName = doc.name || doc.jar_name || doc.title || "Lọ từ vựng";
          const jarUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = jarUuid;
          const jarCode = String(doc.code || doc.id).trim();
          return {
            id: jarUuid,
            code: jarCode,
            name: jarName,
            level: doc.level || "A1",
            icon: doc.icon || "archive-jar",
            is_system: true,
            is_pro: Boolean(doc.is_pro === true || doc.is_pro_only === true || doc.is_pro_only === "true"),
            word_count: wordsArr.length,
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          let wordsArr = Array.isArray(row.words) ? row.words : [];
          if ((!wordsArr || wordsArr.length === 0) && Array.isArray(row.jar_items)) {
            wordsArr = row.jar_items
              .slice()
              .sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0))
              .map(item => {
                const v = item.vocabularies || item.vocabulary || item;
                return {
                  id: v.id || item.vocab_id,
                  ru: v.word_with_stress || v.ru || v.word || "",
                  word_with_stress: v.word_with_stress || v.ru || "",
                  vi: v.meaning_vi || v.vi || "",
                  meaning_vi: v.meaning_vi || v.vi || "",
                  pos: v.pos || "сущ.",
                  level: v.level || row.level || "A1",
                  notes: v.notes || "",
                  gender: v.gender || null,
                  aspect: v.aspect || null,
                  audio_url: v.audio_url || null,
                  structures: v.structures || [],
                  examples: v.examples || []
                };
              });
          }
          return {
            id: row.code || row.id,
            uuid: row.id,
            code: row.code || row.id,
            name: row.name || row.jar_name || "Lọ từ vựng",
            jar_name: row.jar_name || row.name || "Lọ từ vựng",
            level: row.level || "A1",
            levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
            desc: "Lọ từ vựng chủ đề",
            icon: row.icon || "archive-jar",
            is_pro_only: Boolean(row.is_pro),
            word_count: wordsArr.length || Number(row.word_count) || 0,
            words: wordsArr
          };
        }
      },

      TOPIC_ARTICLES: {
        table: "topic_articles",
        conflict: "id",
        deleteCol: "id",
        label: "Bài học chủ đề (Article)",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const mdContent = doc.content_md != null ? doc.content_md : (doc.content != null ? doc.content : (doc.content_markdown || ""));
          let intro = (doc.intro || "").trim();
          if (!intro && mdContent) {
            const p = mdContent.split("\n\n").find(x => x.trim() && !x.trim().startsWith("#") && !x.trim().startsWith(">") && !x.trim().startsWith("|") && !x.trim().startsWith("-"));
            if (p) intro = p.trim().slice(0, 300);
          }
          let cTip = (doc.culturalTip || doc.cultural_tip || "").trim();
          if (!cTip && mdContent) {
            const tipMatch = mdContent.match(/>\s*\[!(?:NOTE|TIP)\][\s\S]*?(?=\n\n|$)/i);
            if (tipMatch) cTip = tipMatch[0].replace(/>\s*(\[!.*\]\s*)?/g, "").trim().slice(0, 300);
          }
          const dialogues = Array.isArray(doc.dialogues) ? doc.dialogues.map(d => ({
            speaker: (d.speaker || d.who || "Người nói").trim(),
            who: (d.speaker || d.who || "Người nói").trim(),
            role: (d.role || "").trim(),
            ru: d.ru || "",
            vi: d.vi || ""
          })) : [];
          const grammarNotes = Array.isArray(doc.grammarNotes) ? doc.grammarNotes : (Array.isArray(doc.grammar_notes) ? doc.grammar_notes : (doc.grammar ? [{ title: doc.grammar.title || "", content: doc.grammar.rule || "" }] : []));
          const actionChains = Array.isArray(doc.actionChains) ? doc.actionChains : (Array.isArray(doc.action_chains) ? doc.action_chains : []);
          return {
            id: String(doc.id || doc.code || "").trim(),
            title: doc.title || ("Bài học: " + doc.id),
            level: doc.level || "A1",
            intro: intro,
            content_md: mdContent,
            audio_url: doc.audioUrl || doc.audio_url || null,
            dialogues: dialogues,
            grammar_notes: grammarNotes,
            action_chains: actionChains,
            cultural_tip: cTip,
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          const art = row.article || {};
          let mdContent = row.content_md || art.content_md || art.content || art.content_markdown || "";
          if (!mdContent && typeof buildTopicArticleMarkdown === "function") {
            mdContent = buildTopicArticleMarkdown(row, row.id || row.code);
          }
          const rowDia = Array.isArray(row.dialogues) ? row.dialogues : (Array.isArray(art.dialogues) ? art.dialogues : []);
          const normDia = rowDia.map(d => ({
            speaker: d.speaker || d.who || "",
            who: d.speaker || d.who || "",
            role: d.role || "",
            ru: d.ru || "",
            vi: d.vi || ""
          }));
          return {
            id: row.id || row.code,
            title: row.title || art.title || ("Bài học: " + (row.id || row.code)),
            level: row.level || "A1",
            intro: row.intro || art.intro || "",
            content: mdContent,
            content_md: mdContent,
            content_markdown: mdContent,
            audioUrl: row.audio_url || art.audioUrl || "",
            culturalTip: row.cultural_tip || art.culturalTip || "",
            dialogues: normDia,
            grammarNotes: Array.isArray(row.grammar_notes) ? row.grammar_notes : (Array.isArray(art.grammarNotes) ? art.grammarNotes : []),
            actionChains: Array.isArray(row.action_chains) ? row.action_chains : (Array.isArray(art.actionChains) ? art.actionChains : [])
          };
        }
      },

      GRAMMAR_LESSONS: {
        table: "grammar_lessons",
        conflict: "id",
        deleteCol: "id",
        label: "Bài học ngữ pháp",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const gId = (doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID();
          doc.id = gId;
          const mdContent = doc.content_md != null ? doc.content_md : (doc.content != null ? doc.content : (doc.content_markdown || ""));
          return {
            id: gId,
            level: doc.level || "A1",
            title: doc.title || "Bài học ngữ pháp",
            topic: doc.topic || "Ngữ pháp căn bản",
            summary: doc.summary || "",
            content_md: mdContent,
            sort_order: Number(doc.sort_order) || 1,
            is_published: Boolean(doc.is_published === undefined ? true : (doc.is_published === true || doc.is_published === "true")),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          const mdContent = row.content_md || row.content || "";
          return {
            id: row.id,
            uuid: row.id,
            level: row.level || "A1",
            title: row.title || "Bài học ngữ pháp",
            topic: row.topic || "",
            summary: row.summary || "",
            content_md: mdContent,
            content: mdContent,
            content_markdown: mdContent,
            sort_order: Number(row.sort_order) || 1,
            is_published: row.is_published !== undefined ? Boolean(row.is_published) : true
          };
        }
      },

      LISTENING_TOPICS: {
        table: "listening_topics",
        conflict: "code",
        deleteCol: "code",
        label: "Chủ đề luyện nghe",
        idKey: (doc) => doc.code || doc.id,
        toRow: (doc) => {
          const topUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = topUuid;
          return {
            id: topUuid,
            code: String(doc.code || doc.id || "").trim(),
            title: doc.title || "Chủ đề luyện nghe",
            level: doc.level || "A1",
            category: doc.category || "airport",
            description: doc.description || "",
            icon: doc.icon || "headphones",
            sort_order: Number(doc.sort_order) || 0,
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          uuid: row.id,
          code: row.code || row.id,
          title: row.title || "",
          level: row.level || "A1",
          category: row.category || "airport",
          description: row.description || "",
          icon: row.icon || "headphones",
          sort_order: Number(row.sort_order) || 0,
          is_pro_only: Boolean(row.is_pro_only)
        })
      },

      LISTENING_LESSONS: {
        table: "listening_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Bài luyện nghe & chính tả",
        idKey: (doc) => doc.code || doc.id,
        toRow: (doc) => {
          const lesUuid = (doc.lesson_uuid && isValidUUID(doc.lesson_uuid)) ? doc.lesson_uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.lesson_uuid = lesUuid;
          return {
            id: lesUuid,
            code: String(doc.code || doc.id).trim(),
            topic_id: (doc.topic_id && isValidUUID(doc.topic_id)) ? doc.topic_id : null,
            title: doc.title || "Bài luyện nghe",
            vi: doc.vi || "",
            translation_vi: doc.vi || "",
            level: doc.level || "A1",
            level_name: doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
            category: doc.category || "comprehension",
            category_name: doc.categoryName || "Nghe hiểu",
            audio_url: doc.audio_url || doc.audioUrl || null,
            youtube_id: doc.youtube_id || doc.youtubeId || null,
            video_youtube_id: doc.youtube_id || doc.youtubeId || null,
            duration_seconds: Number(doc.duration_seconds || doc.durationSeconds) || 30,
            lines: Array.isArray(doc.lines) ? doc.lines : [],
            questions: Array.isArray(doc.questions) ? doc.questions : [],
            sort_order: Number(doc.sort_order) || 1,
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          uuid: row.id,
          lesson_uuid: row.id,
          code: row.code || row.id,
          topic_id: row.topic_id || "",
          title: row.title || "",
          vi: row.vi || row.translation_vi || "",
          level: row.level || "A1",
          levelName: row.level_name || ("Sơ cấp " + (row.level || "A1")),
          category: row.category || "comprehension",
          categoryName: row.category_name || "Nghe hiểu",
          audio_url: row.audio_url || "",
          audioUrl: row.audio_url || "",
          youtube_id: row.youtube_id || row.video_youtube_id || "",
          youtubeId: row.youtube_id || row.video_youtube_id || "",
          duration_seconds: Number(row.duration_seconds) || 30,
          sort_order: Number(row.sort_order) || 1,
          is_pro_only: Boolean(row.is_pro_only),
          lines: Array.isArray(row.lines) ? row.lines : [],
          questions: Array.isArray(row.questions) ? row.questions : []
        })
      },

      SPEAKING_SETS: {
        table: "speaking_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Bài luyện nói",
        idKey: (doc) => doc.id || doc.code,
        toRow: (doc) => {
          const raw = doc.raw_data || {};
          const ytId = doc.youtubeId || doc.youtube_id || raw.youtube_video_id || "";
          const itemsArr = Array.isArray(doc.sentences) && doc.sentences.length ? doc.sentences : (Array.isArray(doc.items) ? doc.items : []);
          const spUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = spUuid;
          return {
            id: spUuid,
            code: String(doc.id || doc.code).trim(),
            title: doc.title || "Bài luyện nói",
            level: doc.level || "A1",
            level_name: doc.levelName || doc.level_name || ("Sơ cấp " + (doc.level || "A1")),
            category: doc.category || (ytId ? "shadowing" : "basic"),
            category_name: doc.categoryName || doc.category_name || (ytId ? "Luyện nói Shadowing qua Video" : "Giao tiếp cơ bản"),
            phoneme_target: doc.phonemeTarget || doc.phoneme_target || "",
            icon: doc.icon || (ytId ? "youtube" : "mic-speaking"),
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            sentence_ru: doc.sentence_ru || (itemsArr[0] && (itemsArr[0].ru || itemsArr[0].text_ru)) || "",
            sort_order: typeof doc.sort_order === "number" ? doc.sort_order : (parseInt(doc.sort_order, 10) || 10),
            youtube_id: ytId || null,
            youtube_url: ytId ? `https://www.youtube.com/watch?v=${ytId}` : null,
            video_sample_url: ytId ? `https://www.youtube-nocookie.com/embed/${ytId}?enablejsapi=1&rel=0&modestbranding=1` : (doc.video_url || null),
            sentences: itemsArr,
            items: itemsArr,
            description: doc.description || "",
            raw_data: {
              ...raw,
              youtube_video_id: ytId || undefined,
              items: itemsArr,
              sentences: itemsArr
            },
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          const raw = row.raw_data || {};
          const ytId = row.youtube_id || raw.youtube_video_id || raw.youtubeId || (row.video_sample_url && row.video_sample_url.includes("youtube") ? (row.video_sample_url.match(/(?:embed\/|v=|watch\?v=)([a-zA-Z0-9_-]{11})/)||[])[1] : "");
          let itemsList = [];
          if (Array.isArray(row.sentences) && row.sentences.length) {
            itemsList = row.sentences;
          } else if (Array.isArray(row.items) && row.items.length) {
            itemsList = row.items;
          } else if (typeof row.sentences === "string") {
            try { itemsList = JSON.parse(row.sentences); } catch (_) {}
          } else if (typeof row.items === "string") {
            try { itemsList = JSON.parse(row.items); } catch (_) {}
          } else if (raw && Array.isArray(raw.items) && raw.items.length) {
            itemsList = raw.items;
          } else if (row.sentence_ru) {
            itemsList = [{ ru: row.sentence_ru, vi: "", start: 0, end: 5 }];
          }

          const cleanItems = itemsList.map((it, idx) => ({
            id: it.id || idx + 1,
            order: it.order || idx + 1,
            who: it.who || it.speaker || "",
            ru: it.ru || it.text_ru || it.text || "",
            text_ru: it.text_ru || it.ru || it.text || "",
            text_stressed: it.text_stressed || it.ru || it.text_ru || it.text || "",
            vi: it.vi || it.translation_vi || it.translation || "",
            translation_vi: it.translation_vi || it.vi || it.translation || "",
            start: typeof it.start === "number" ? it.start : (typeof it.startSec === "number" ? it.startSec : 0),
            end: typeof it.end === "number" ? it.end : (typeof it.endSec === "number" ? it.endSec : 5),
            startSec: typeof it.startSec === "number" ? it.startSec : (typeof it.start === "number" ? it.start : 0),
            endSec: typeof it.endSec === "number" ? it.endSec : (typeof it.end === "number" ? it.end : 5),
            duration: typeof it.duration === "number" ? it.duration : 0
          }));

          return {
            id: row.code || row.id,
            code: row.code || row.id,
            title: row.title || "",
            full_title: row.title || "",
            level: row.level || "A1",
            levelName: row.level_name || ("Sơ cấp " + (row.level || "A1")),
            category: row.category || (ytId ? "shadowing_youtube" : "basic"),
            categoryName: row.category_name || (ytId ? "Shadowing qua phim hoạt hình" : "Giao tiếp cơ bản"),
            phonemeTarget: row.phoneme_target || "",
            sentence_ru: row.sentence_ru || "",
            sort_order: typeof row.sort_order === "number" ? row.sort_order : 10,
            icon: row.icon || (ytId ? "youtube" : "mic-speaking"),
            is_pro_only: Boolean(row.is_pro_only),
            youtubeId: ytId || "",
            youtube_id: ytId || "",
            video_url: row.video_sample_url || (ytId ? `https://www.youtube-nocookie.com/embed/${ytId}?enablejsapi=1&rel=0&modestbranding=1` : ""),
            video_sample_url: row.video_sample_url || "",
            items: cleanItems
          };
        }
      },

      WRITING_TASKS: {
        table: "writing_tasks",
        conflict: "code",
        deleteCol: "code",
        label: "Bài luyện viết (Tả tranh & Dịch)",
        idKey: (doc) => doc.code || doc.id,
        toRow: (doc) => {
          const modelText = doc.model_answer || doc.sample_essay || doc.model || "";
          const promptText = doc.prompt || doc.prompt_text || "";
          const tipsArr = Array.isArray(doc.tips) ? doc.tips : (typeof doc.tips === "string" ? doc.tips.split("\n").map(s => s.trim()).filter(Boolean) : []);
          const wordsArr = Array.isArray(doc.suggested_words) ? doc.suggested_words : (typeof doc.suggested_words === "string" ? doc.suggested_words.split("\n").map(s => s.trim()).filter(Boolean) : []);
          const taskUuid = (doc.taskId && isValidUUID(doc.taskId)) ? doc.taskId : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.taskId = taskUuid;
          return {
            id: taskUuid,
            code: String(doc.code || doc.id).trim(),
            topic_id: (doc.topic_id && isValidUUID(doc.topic_id)) ? doc.topic_id : null,
            title: doc.title || "Bài luyện viết",
            level: doc.level || "A1",
            level_name: doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
            task_type: doc.task_type || "picture_desc",
            category: doc.category || "daily",
            category_name: doc.categoryName || "Sinh hoạt",
            image_url: doc.image_url || null,
            prompt: promptText,
            prompt_text: promptText,
            source_text: doc.source_text || (doc.task_type === "translation" ? promptText : null),
            model_answer: modelText,
            sample_essay: modelText,
            min_words: Number(doc.min_words || doc.minWords) || 30,
            tips: tipsArr,
            suggested_words: wordsArr,
            ai_prompt: doc.ai_prompt || null,
            sort_order: Number(doc.sort_order) || 1,
            publication_status: doc.publication_status || "published",
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          uuid: row.id,
          taskId: row.id,
          code: row.code || row.id,
          topic_id: row.topic_id || "",
          title: row.title || "",
          level: row.level || "A1",
          levelName: row.level_name || ("Sơ cấp " + (row.level || "A1")),
          task_type: row.task_type || "picture_desc",
          category: row.category || "daily",
          categoryName: row.category_name || "Sinh hoạt",
          image_url: row.image_url || "",
          prompt: row.prompt || row.prompt_text || "",
          model_answer: row.model_answer || row.sample_essay || row.sample_text || "",
          min_words: Number(row.min_words) || 30,
          minWords: Number(row.min_words) || 30,
          tips: Array.isArray(row.tips) ? row.tips : [],
          suggested_words: Array.isArray(row.suggested_words) ? row.suggested_words : [],
          ai_prompt: row.ai_prompt || "",
          sort_order: Number(row.sort_order) || 1,
          is_pro_only: Boolean(row.is_pro_only),
          publication_status: row.publication_status || "published"
        })
      },

      WRITING_TOPICS: {
        table: "writing_topics",
        conflict: "code",
        deleteCol: "code",
        label: "Chủ đề luyện viết & dịch",
        idKey: (doc) => doc.code || doc.id,
        toRow: (doc) => {
          const wtUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = wtUuid;
          return {
            id: wtUuid,
            code: String(doc.code || doc.id || "").trim(),
            title: doc.title || "Chủ đề viết",
            level: doc.level || "A1",
            level_name: doc.level_name || doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
            type: doc.type || "picture",
            category: doc.category || "daily",
            category_name: doc.category_name || doc.categoryName || "Sinh hoạt thường nhật",
            description: doc.description || "",
            icon: doc.icon || "timer-clock",
            sort_order: Number(doc.sort_order) || 0,
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          uuid: row.id,
          code: row.code || row.id,
          title: row.title || "",
          level: row.level || "A1",
          level_name: row.level_name || "",
          levelName: row.level_name || "",
          type: row.type || "picture",
          category: row.category || "daily",
          category_name: row.category_name || "Sinh hoạt",
          categoryName: row.category_name || "Sinh hoạt",
          description: row.description || "",
          icon: row.icon || "timer-clock",
          sort_order: Number(row.sort_order) || 0,
          is_pro_only: Boolean(row.is_pro_only)
        })
      },

      SHOP_PRODUCTS: {
        table: "shop_products",
        conflict: "code",
        deleteCol: "code",
        label: "Cửa hàng & Giáo trình",
        idKey: (doc) => doc.id || doc.code,
        toRow: (doc) => {
          const pr = Number(doc.price) || 0;
          const origPr = Number(doc.priceOld || doc.original_price || doc.origPrice) || 0;
          const prodTitle = doc.title || doc.name || "Sản phẩm";
          const imgUrl = doc.image || doc.image_url || "";
          const prodCode = String(doc.code || doc.id || ("prod_" + Date.now().toString().slice(-4))).trim();
          const prodUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = prodUuid;
          return {
            id: prodUuid,
            code: prodCode,
            name: prodTitle,
            title: prodTitle,
            category: doc.category || "banh_keo",
            category_name: doc.categoryName || "Bánh kẹo Nga",
            product_type: doc.product_type || "physical",
            price_vnd: pr,
            price: pr,
            price_minor: pr * 100,
            original_price: origPr,
            currency: "VND",
            description: doc.desc || doc.description || "",
            image: imgUrl,
            image_url: imgUrl,
            image_urls: imgUrl ? [imgUrl] : [],
            stock: Number(doc.stock || doc.sold) || 100,
            badge: doc.badge || "",
            status: (doc.status === "out_of_stock" || doc.status === "pre_order") ? doc.status : "in_stock",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          uuid: row.id,
          code: row.code || row.id,
          title: row.title || row.name || "",
          name: row.title || row.name || "",
          category: row.category || "banh_keo",
          categoryName: row.category_name || "Bánh kẹo Nga",
          product_type: row.product_type || "physical",
          price: Number(row.price_vnd || row.price) || 0,
          priceOld: Number(row.original_price) || 0,
          origPrice: Number(row.original_price) || 0,
          stock: Number(row.stock) || 100,
          badge: row.badge || "",
          image: row.image || row.image_url || (Array.isArray(row.image_urls) ? row.image_urls[0] : "") || "",
          desc: row.description || "",
          status: row.status || "published"
        })
      },

      PACKAGES: {
        table: "packages",
        conflict: "id",
        deleteCol: "id",
        label: "Gói Premium PRO",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const pr = Number(doc.price) || 0;
          const origPr = Number(doc.priceOld || doc.price_old || doc.origPrice) || 0;
          const pkgTitle = doc.title || doc.name || "Gói học PRO";
          const featArr = Array.isArray(doc.features)
            ? doc.features
            : (typeof doc.features === "string" ? doc.features.split("\n").map(s => s.trim()).filter(Boolean) : []);
          const monthsNum = Number(doc.months || doc.duration_months) || 1;
          const isLife = Boolean(doc.is_lifetime === true || doc.is_lifetime === "true" || doc.id === "pro_vip");
          return {
            id: String(doc.id).trim(),
            name: pkgTitle,
            title: pkgTitle,
            price_vnd: pr,
            price: pr,
            price_minor: pr * 100,
            price_old: origPr,
            currency: "VND",
            duration_months: monthsNum,
            duration_days: monthsNum * 30,
            is_lifetime: isLife,
            status: doc.status || "published",
            badge: doc.badge || "",
            description: doc.desc || doc.description || "",
            popular: Boolean(doc.popular === true || doc.is_popular === true || doc.popular === "true"),
            features: featArr,
            feature_list: featArr,
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id,
          name: row.name || row.title || "",
          title: row.title || row.name || "",
          price: Number(row.price_vnd || row.price) || 0,
          priceOld: Number(row.price_old) || 0,
          origPrice: Number(row.price_old) || 0,
          badge: row.badge || "",
          months: Number(row.duration_months) || Math.max(1, Math.round((Number(row.duration_days) || 30) / 30)),
          is_lifetime: Boolean(row.is_lifetime),
          popular: Boolean(row.popular),
          status: row.status || "published",
          desc: row.description || "",
          features: Array.isArray(row.features) && row.features.length ? row.features : (Array.isArray(row.feature_list) ? row.feature_list : [])
        })
      },

      BLOG_POSTS: {
        table: "blog_posts",
        conflict: "slug",
        deleteCol: "slug",
        label: "Bài viết Blog",
        idKey: (doc) => doc.slug || doc.id,
        toRow: (doc) => {
          const mdContent = doc.content_md != null ? doc.content_md : (doc.content != null ? doc.content : (doc.content_markdown || ""));
          const coverImg = doc.cover_url || doc.cover || doc.cover_image || "assets/red-square.jpg";
          const isPub = (doc.publication_status === "published" || doc.published === true || doc.publication_status === undefined);
          const slugVal = String(doc.slug || doc.id || ("post-" + Date.now())).trim();
          const postUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = postUuid;
          return {
            id: postUuid,
            slug: slugVal,
            code: slugVal,
            title: doc.title || "Bài viết Blog",
            category: doc.category || doc.tag || "du_hoc",
            author: doc.author || "Ban Biên Tập RUSI TRKI",
            cover_url: coverImg,
            summary: doc.summary || doc.excerpt || "",
            content_md: mdContent,
            tags: Array.isArray(doc.tags) ? doc.tags : (doc.tag ? [doc.tag] : ["Du học Nga"]),
            publication_status: isPub ? "published" : "draft",
            published_at: isPub ? (doc.published_at || new Date().toISOString()) : null,
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          slug: row.slug,
          id: row.slug,
          uuid: row.id,
          title: row.title || "",
          category: row.category || "du_hoc",
          author: row.author || "Ban Biên Tập RUSI TRKI",
          cover_url: row.cover_url || "assets/red-square.jpg",
          cover: row.cover_url || "assets/red-square.jpg",
          summary: row.summary || "",
          excerpt: row.summary || "",
          content_md: row.content_md || "",
          content: row.content_md || "",
          content_markdown: row.content_md || "",
          publication_status: row.publication_status || "published",
          published: row.publication_status === "published"
        })
      },

      USERS: {
        table: "profiles",
        conflict: "id",
        deleteCol: "id",
        label: "Học viên & Quản trị",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          id: (doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID(),
          full_name: doc.full_name || doc.name || "",
          avatar_url: doc.avatar_url || null,
          timezone: doc.timezone || "Asia/Ho_Chi_Minh",
          role: doc.role || "student",
          is_pro: Boolean(doc.is_pro === true || doc.is_pro === "true"),
          pro_expires_at: doc.pro_expires_at ? new Date(doc.pro_expires_at).toISOString() : null,
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.id,
          email: row.email || "",
          full_name: row.full_name || "",
          avatar_url: row.avatar_url || "",
          timezone: row.timezone || "Asia/Ho_Chi_Minh",
          role: row.role || "student",
          is_pro: Boolean(row.is_pro),
          pro_expires_at: row.pro_expires_at || "",
          streak: 0,
          xp: 0
        })
      },

      ORDERS: {
        table: "orders",
        conflict: "order_code",
        deleteCol: "order_code",
        label: "Đơn hàng & Giao dịch",
        idKey: (doc) => doc.order_code || doc.id,
        toRow: (doc) => {
          const ordCode = String(doc.order_code || doc.id || ("ORD-" + Date.now().toString().slice(-6))).trim();
          const ordUuid = (doc.uuid && isValidUUID(doc.uuid)) ? doc.uuid : ((doc.id && isValidUUID(doc.id)) ? doc.id : generateUUID());
          doc.uuid = ordUuid;
          return {
            id: ordUuid,
            order_code: ordCode,
            user_id: (doc.userId && isValidUUID(doc.userId)) ? doc.userId : null,
            package_id: doc.packageId || doc.package_id || "",
            amount: Number(doc.amount) || 0,
            amount_minor: (Number(doc.amount) || 0) * 100,
            currency: "VND",
            payment_method: String(doc.paymentMethod || doc.payment_method || "VIETQR").toUpperCase(),
            status: String(doc.status || "pending").toLowerCase(),
            expires_at: doc.expires_at || new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.order_code || row.id,
          uuid: row.id,
          order_code: row.order_code || row.id,
          userId: row.user_id || "",
          userEmail: row.customer_email || "",
          packageId: row.package_id || "",
          packageName: row.package_id || "",
          amount: Number(row.amount || (row.amount_minor ? row.amount_minor / 100 : 0)) || 0,
          paymentMethod: row.payment_method || "VIETQR",
          status: String(row.status || "pending").toLowerCase(),
          createdAt: row.created_at || ""
        })
      }
    },

    hasMapping(slug) {
      return Boolean(this.MAPPINGS[slug]);
    },

    getClient() {
      // 1. Service Role Key (quyền Admin cao nhất, tự động bypass Row-Level Security)
      const serviceKey = localStorage.getItem("trki_sb_service_key") || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.serviceRoleKey);
      if (serviceKey && typeof window.supabase !== "undefined" && window.SUPABASE_CONFIG) {
        return window.supabase.createClient(window.SUPABASE_CONFIG.url, serviceKey.trim());
      }

      // 2. Client từ window.RusiSupabase
      if (window.RusiSupabase && window.RusiSupabase.getClient) {
        const client = window.RusiSupabase.getClient();
        if (client) return client;
      }

      // 3. Anon Key công khai
      if (typeof window.supabase !== "undefined" && window.SUPABASE_CONFIG) {
        const key = localStorage.getItem("trki_sb_anon_key") || window.SUPABASE_CONFIG.anonKey;
        if (key && !key.includes("DÁN_ANON_KEY")) {
          return window.supabase.createClient(window.SUPABASE_CONFIG.url, key);
        }
      }
      return null;
    },

    async upsertDoc(slug, doc) {
      const mapping = this.MAPPINGS[slug];
      if (!mapping) return { ok: true, skipped: true, message: `Collection ${slug} không map tới bảng Supabase.` };

      const sb = this.getClient();
      if (!sb) {
        return { ok: false, message: "Supabase client chưa sẵn sàng. Hãy kiểm tra Anon Key." };
      }

      try {
        const row = mapping.toRow(doc);
        const { data, error } = await sb
          .from(mapping.table)
          .upsert(row, { onConflict: mapping.conflict })
          .select();

        if (error) {
          console.error(`[SupabaseSyncEngine] Lỗi upsert bảng ${mapping.table}:`, error);
          return { ok: false, error, message: error.message || "Lỗi Supabase" };
        }

        // Đồng bộ gương song song cho các bảng liên kết
        if (slug === "VOCAB_JARS") {
          try {
            const words = Array.isArray(doc.words) ? doc.words : [];
            if (words.length > 0) {
              const jarId = (data && data[0] && data[0].id) || row.id;
              const itemsToInsert = [];
              const wordsToUpsert = [];
              for (let idx = 0; idx < words.length; idx++) {
                const w = words[idx];
                if (!w) continue;
                const wId = (w.id && isValidUUID(w.id)) ? w.id : generateUUID();
                w.id = wId;
                wordsToUpsert.push({
                  id: wId,
                  word_with_stress: w.stress || w.word_with_stress || w.ru || "сло́во",
                  meaning_vi: w.meaning_vi || w.vi || "",
                  pos: w.pos || "сущ.",
                  level: w.level || doc.level || "A1",
                  gender: w.gender || null,
                  aspect: w.aspect || null,
                  notes: w.notes || w.note || null,
                  structures: Array.isArray(w.structures) ? w.structures : [],
                  examples: Array.isArray(w.examples) ? w.examples : (w.ex ? [{ ru: w.ex, vi: w.ex_vi || "" }] : []),
                  updated_at: new Date().toISOString()
                });
                itemsToInsert.push({
                  jar_id: jarId,
                  vocab_id: wId,
                  position: idx + 1
                });
              }
              if (wordsToUpsert.length > 0) {
                await sb.from("vocabularies").upsert(wordsToUpsert, { onConflict: "id" });
              }
              // Đồng bộ sạch bảng liên kết jar_items: xóa toàn bộ cũ của jarId và ghi lại danh sách mới
              await sb.from("jar_items").delete().eq("jar_id", jarId);
              if (itemsToInsert.length > 0) {
                await sb.from("jar_items").insert(itemsToInsert);
              }
            }
          } catch (e) {
            console.warn("[SupabaseSyncEngine] Đồng bộ jar_items cảnh báo:", e);
          }
        }

        if (slug === "VOCABULARIES" && doc.jar_id && isValidUUID(doc.jar_id)) {
          try {
            const vId = (data && data[0] && data[0].id) || row.id;
            if (vId && isValidUUID(vId)) {
              await sb.from("jar_items").upsert({
                jar_id: doc.jar_id,
                vocab_id: vId,
                position: 999
              }, { onConflict: "jar_id,vocab_id" });
            }
          } catch (e) {
            console.warn("[SupabaseSyncEngine] Gán jar_items cảnh báo:", e);
          }
        }

        return { ok: true, table: mapping.table, data };
      } catch (err) {
        console.error(`[SupabaseSyncEngine] Ngoại lệ khi upsert:`, err);
        return { ok: false, error: err, message: err.message };
      }
    },

    async deleteDoc(slug, idKey) {
      const mapping = this.MAPPINGS[slug];
      if (!mapping) return { ok: true, skipped: true };

      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      try {
        let query = sb.from(mapping.table).delete();
        if (isValidUUID(idKey)) {
          if (mapping.deleteCol === "id") {
            query = query.eq("id", idKey);
          } else {
            query = query.or(`id.eq.${idKey},${mapping.deleteCol}.eq.${idKey}`);
          }
        } else {
          if (mapping.deleteCol === "id") {
            if (mapping.conflict && mapping.conflict !== "id" && !mapping.conflict.includes(",")) {
              query = query.eq(mapping.conflict, idKey);
            } else {
              query = query.eq(mapping.deleteCol, idKey);
            }
          } else {
            query = query.eq(mapping.deleteCol, idKey);
          }
        }

        const { error } = await query;

        if (error) {
          console.error(`[SupabaseSyncEngine] Lỗi xoá bảng ${mapping.table}:`, error);
          return { ok: false, error, message: error.message };
        }

        if (slug === "VOCAB_JARS" && isValidUUID(idKey)) {
          try {
            await sb.from("jar_items").delete().eq("jar_id", idKey);
          } catch (_) {}
        }

        return { ok: true, table: mapping.table };
      } catch (err) {
        console.error(`[SupabaseSyncEngine] Ngoại lệ khi xoá:`, err);
        return { ok: false, error: err, message: err.message };
      }
    },

    async syncAllCollections(onProgress) {
      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      const results = {};
      let totalSuccess = 0;
      let totalErrors = 0;
      const slugs = Object.keys(this.MAPPINGS);

      for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const mapping = this.MAPPINGS[slug];
        const items = getMergedList(slug).map(stripSource);
        results[slug] = { total: items.length, synced: 0, errors: 0 };

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "syncing", current: 0, total: items.length });
        }

        for (const item of items) {
          try {
            const row = mapping.toRow(item);
            const { error } = await sb
              .from(mapping.table)
              .upsert(row, { onConflict: mapping.conflict });

            if (error) {
              console.warn(`[SupabaseSyncEngine] Lỗi sync ${slug}/${item.id || item.slug}:`, error.message);
              results[slug].errors++;
              totalErrors++;
            } else {
              results[slug].synced++;
              totalSuccess++;
            }
          } catch (err) {
            results[slug].errors++;
            totalErrors++;
          }
        }

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "done", current: results[slug].synced, total: items.length });
        }
      }

      return { ok: totalErrors === 0, totalSuccess, totalErrors, results };
    },

    async fetchAllTableRows(sb, table, select = "*", pageSize = 1000) {
      let allRows = [];
      let page = 0;
      let hasMore = true;
      while (hasMore) {
        const from = page * pageSize;
        const to = from + pageSize - 1;
        const { data, error } = await sb
          .from(table)
          .select(select)
          .range(from, to);
        if (error) {
          console.warn(`[SupabaseSyncEngine] Lỗi phân trang bảng ${table} (offset ${from}):`, error.message);
          throw error;
        }
        if (Array.isArray(data) && data.length > 0) {
          allRows.push(...data);
          if (data.length < pageSize) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }
      return allRows;
    },

    async pullAllCollections(onProgress) {
      const sb = this.getClient();
      if (!sb) return { ok: false, message: "Supabase client chưa sẵn sàng." };

      const store = loadAdminStore();
      let totalPulled = 0;
      const slugs = Object.keys(this.MAPPINGS);

      for (let i = 0; i < slugs.length; i++) {
        const slug = slugs[i];
        const mapping = this.MAPPINGS[slug];

        if (typeof onProgress === "function") {
          onProgress({ index: i + 1, totalSlugs: slugs.length, slug, label: mapping.label, status: "fetching" });
        }

        try {
          let selectQuery = "*";
          if (slug === "VOCAB_JARS") selectQuery = "*, jar_items(position, vocabularies(*))";
          else if (slug === "VOCABULARIES") selectQuery = "*, jar_items(jar_id)";
          const data = await this.fetchAllTableRows(sb, mapping.table, selectQuery);

          if (Array.isArray(data) && data.length > 0) {
            store[slug] = store[slug] || [];
            data.forEach((row) => {
              const doc = mapping.fromRow(row);
              const idKey = mapping.idKey(doc);
              if (!idKey) return;

              const idx = store[slug].findIndex((x) => mapping.idKey(x) === idKey);
              if (idx >= 0) {
                store[slug][idx] = { ...doc, __admin: true, __fromSupabase: true };
              } else {
                store[slug].push({ ...doc, __admin: true, __fromSupabase: true });
              }
              totalPulled++;
            });
          }
        } catch (err) {
          console.warn(`[SupabaseSyncEngine] Ngoại lệ pull bảng ${mapping.table}:`, err);
        }
      }

      saveAdminStore(store);
      syncDataToWeb();
      renderSidebarLists();
      handleRoute();

      return { ok: true, totalPulled };
    },

    async fetchStats() {
      const sb = this.getClient();
      if (!sb) return null;
      const stats = {};
      const slugs = Object.keys(this.MAPPINGS);
      for (const slug of slugs) {
        const mapping = this.MAPPINGS[slug];
        try {
          const { count, error } = await sb.from(mapping.table).select("*", { count: "exact", head: true });
          stats[slug] = error ? 0 : (count || 0);
        } catch (_) {
          stats[slug] = 0;
        }
      }
      return stats;
    }
  };
  window.SupabaseSyncEngine = SupabaseSyncEngine;

  window.triggerMediaUpload = function (fieldKey) {
    const sb = window.SupabaseSyncEngine && window.SupabaseSyncEngine.getClient ? window.SupabaseSyncEngine.getClient() : null;
    if (!sb) {
      toast("Supabase client chưa sẵn sàng. Vui lòng kiểm tra kết nối API.", "error");
      return;
    }

    const isAudio = fieldKey.toLowerCase().includes("audio");
    const isCover = fieldKey.toLowerCase().includes("cover");
    let bucket = "writing-images";
    if (isAudio) {
      bucket = "listening-audio";
    } else if (isCover) {
      bucket = "blog-covers";
    } else if (State.currentSlug === "SHOP_PRODUCTS") {
      bucket = "product-images";
    }

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = isAudio ? "audio/*,.mp3,.wav,.ogg,.m4a" : "image/*,.jpg,.jpeg,.png,.webp,.svg";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.onchange = async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) {
        if (fileInput.parentNode) fileInput.parentNode.removeChild(fileInput);
        return;
      }

      toast(`Đang tải file lên bucket "${bucket}"...`, "info");
      try {
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `${Date.now()}_${cleanName}`;
        const { data: uploadData, error: uploadError } = await sb.storage.from(bucket).upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });

        if (uploadError) {
          console.error("[Storage Upload Error]:", uploadError);
          toast("Lỗi tải lên: " + uploadError.message, "error");
          return;
        }

        const { data: urlData } = sb.storage.from(bucket).getPublicUrl(filePath);
        const publicUrl = urlData ? urlData.publicUrl : "";

        if (publicUrl) {
          if (State.currentDraft) {
            State.currentDraft[fieldKey] = publicUrl;
          }
          const targetInp = document.querySelector(`input[name="${fieldKey}"], input[data-key="${fieldKey}"]`);
          if (targetInp) {
            targetInp.value = publicUrl;
            targetInp.dispatchEvent(new Event("input", { bubbles: true }));
          }
          toast("✓ Đã tải file lên thành công!", "success");
        }
      } catch (err) {
        console.error("[Storage Upload Exception]:", err);
        toast("Ngoại lệ khi upload: " + err.message, "error");
      } finally {
        if (fileInput.parentNode) {
          fileInput.parentNode.removeChild(fileInput);
        }
      }
    };

    fileInput.click();
  };

  // =========================================================================
  // 10. SAVE, DELETE, CLONE & BULK ACTIONS
  // =========================================================================

  window.saveDocument = async function (stayOnDoc = true) {
    const slug = State.currentSlug;
    const col = COLLECTIONS[slug];
    if (!col || !State.currentDraft) return;

    // Visual button loading state
    const saveBtns = [
      document.getElementById("btnSaveDoc"),
      document.getElementById("btnSidebarSave"),
      document.getElementById("btnSaveAndClose"),
      document.getElementById("btnSidebarSaveClose")
    ].filter(Boolean);

    const origHtmls = saveBtns.map(b => b.innerHTML);
    saveBtns.forEach(b => {
      b.disabled = true;
      b.style.opacity = "0.75";
      b.innerHTML = `<span class="p-spinner-sm"></span> Đang lưu...`;
    });

    const restoreButtons = (success = false) => {
      saveBtns.forEach((b, i) => {
        if (success) {
          b.innerHTML = `✓ Đã lưu!`;
          b.style.borderColor = "#10b981";
          b.style.color = "#10b981";
          setTimeout(() => {
            b.disabled = false;
            b.style.opacity = "1";
            b.style.borderColor = "";
            b.style.color = "";
            b.innerHTML = origHtmls[i] || "Lưu thay đổi";
          }, 1200);
        } else {
          b.disabled = false;
          b.style.opacity = "1";
          b.innerHTML = origHtmls[i] || "Lưu thay đổi";
        }
      });
    };

    // If on JSON tab, ensure JSON parse
    if (State.activeEditorTab === "json") {
      const jsonEl = document.getElementById("jsonEditorArea");
      try {
        State.currentDraft = JSON.parse(jsonEl.value);
      } catch (err) {
        restoreButtons(false);
        toast("Lỗi cú pháp JSON: " + err.message, "error");
        return;
      }
    } else {
      // Đồng bộ tức thời tất cả các input DOM vào State.currentDraft trước khi lưu
      document.querySelectorAll(".live-draft-field").forEach((inp) => {
        const k = inp.getAttribute("data-key") || inp.name;
        if (k) {
          State.currentDraft[k] = inp.type === "number" ? Number(inp.value) : inp.value;
        }
      });
      document.querySelectorAll(".live-draft-field-lines").forEach((inp) => {
        const k = inp.getAttribute("data-key") || inp.name;
        if (k) {
          State.currentDraft[k] = inp.value.split("\n").map((s) => s.trim()).filter(Boolean);
        }
      });
      // Nếu có canvas Notion trực quan, đồng bộ canvas sang markdown trước khi lưu
      const canvasEl = document.querySelector(".notion-canvas");
      if (canvasEl && typeof window.domToMarkdown === "function") {
        const md = window.domToMarkdown(canvasEl);
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) mdInp.value = md;
        State.currentDraft.content_md = md;
        State.currentDraft.content = md;
        State.currentDraft.content_markdown = md;
      } else {
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) {
          const val = mdInp.value;
          State.currentDraft.content_md = val;
          State.currentDraft.content = val;
          State.currentDraft.content_markdown = val;
        }
      }
    }

    const data = State.currentDraft;

    if (slug === "TOPIC_ARTICLES") {
      if (!data.intro && data.content_md) {
        const matchIntro = data.content_md.split("\n\n").find(p => p.trim() && !p.trim().startsWith("#") && !p.trim().startsWith(">") && !p.trim().startsWith("|") && !p.trim().startsWith("-"));
        if (matchIntro) data.intro = matchIntro.trim().slice(0, 300);
      }
    }

    // Form validation: Kiểm tra các trường bắt buộc
    for (const f of col.fields) {
      if (f.required) {
        const val = data[f.key];
        if (val === undefined || val === null || String(val).trim() === "") {
          if (f.key === "id" && (slug === "VOCABULARIES" || slug === "VOCAB_JARS")) {
            data.id = generateUUID();
            continue;
          }
          restoreButtons(false);
          toast(`Vui lòng nhập trường bắt buộc: "${f.label}"`, "warning");
          const inp = document.querySelector(`[data-key="${f.key}"]`);
          if (inp) {
            inp.focus();
            inp.style.borderColor = "var(--p-danger)";
            setTimeout(() => { if (inp) inp.style.borderColor = ""; }, 3000);
          }
          return;
        }
      }
    }

    if (slug === "VOCABULARIES") {
      if (!data.id || !isValidUUID(data.id)) {
        data.id = (data.uuid && isValidUUID(data.uuid)) ? data.uuid : generateUUID();
      }
    }

    if (slug === "TRKI_QUESTION_BANK") {
      if (!data.id || !isValidUUID(data.id)) {
        data.id = (data.uuid && isValidUUID(data.uuid)) ? data.uuid : generateUUID();
      }
      const opts = Array.isArray(data.options)
        ? data.options
        : (typeof data.options === "string" ? data.options.split("\n").map(s => s.trim()).filter(Boolean) : []);
      data.options = opts;
      const cIdx = Number(data.correct_index != null ? data.correct_index : 0);
      if (opts[cIdx]) {
        data.correct_answer = opts[cIdx];
      }
      if (!data.code) {
        data.code = "TRKI_Q_" + Date.now().toString().slice(-4);
      }
      if (!data.sub_test) {
        data.sub_test = "lexis_grammar";
      }
      if (data.order_index == null) {
        data.order_index = 1;
      }
    }

    let idKey = data.id || data.slug || data.title;
    if (!idKey) {
      idKey = slug.toLowerCase() + "_" + Date.now().toString().slice(-6);
      data.id = idKey;
    }

    const store = loadAdminStore();
    store[slug] = store[slug] || [];

    if (State.isCreating) {
      const exists = getMergedList(slug).some((it) => (it.id || it.slug || it.title) === idKey);
      if (exists) {
        restoreButtons(false);
        toast(`Mã ID "${idKey}" đã tồn tại. Vui lòng chọn mã khác.`, "error");
        const inp = document.querySelector(`[data-key="id"]`);
        if (inp) {
          inp.focus();
          inp.style.borderColor = "var(--p-danger)";
        }
        return;
      }
      store[slug].push({ ...data, __admin: true });
    } else {
      const idx = store[slug].findIndex((it) => (it.id || it.slug || it.title) === (State.currentDocId || idKey));
      const updated = { ...data, __admin: true };
      if (idx >= 0) store[slug][idx] = updated;
      else store[slug].push(updated);
    }

    store.__deleted = store.__deleted || {};
    if (Array.isArray(store.__deleted[slug])) {
      store.__deleted[slug] = store.__deleted[slug].filter((k) => k !== idKey);
    }

    // 1. Lưu cục bộ trước (offline-first, bảo đảm không bao giờ mất dữ liệu)
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    // 2. Đồng bộ đám mây Supabase PostgreSQL nếu collection có cấu hình
    if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(slug)) {
      try {
        const syncRes = await SupabaseSyncEngine.upsertDoc(slug, data);
        if (syncRes.ok) {
          if (syncRes.data && syncRes.data[0]) {
            const returnedRow = syncRes.data[0];
            if (returnedRow.id) {
              data.uuid = returnedRow.id;
              if (isValidUUID(returnedRow.id) && (!data.id || isValidUUID(data.id))) {
                data.id = returnedRow.id;
                idKey = returnedRow.id;
              }
              const curStore = loadAdminStore();
              if (curStore[slug]) {
                const docIdx = curStore[slug].findIndex(it => (it.id || it.slug || it.title) === (State.currentDocId || idKey));
                if (docIdx >= 0) {
                  curStore[slug][docIdx] = { ...curStore[slug][docIdx], ...data };
                  saveAdminStore(curStore);
                }
              }
            }
          }
          toast(`Đã lưu & đồng bộ thành công lên Supabase (bảng ${syncRes.table})!`, "success");
        } else {
          toast(`Đã lưu trên máy. Supabase phản hồi: ${syncRes.message}`, "warning");
        }
      } catch (err) {
        toast(`Đã lưu trên máy. Lỗi Supabase: ${err.message}`, "error");
      }
    } else {
      toast(State.isCreating ? "Đã tạo mới tài liệu và đồng bộ về website!" : "Đã lưu thay đổi thành công!", "success");
    }

    restoreButtons(true);

    if (stayOnDoc) {
      if (State.isCreating) {
        State.isCreating = false;
        State.currentDocId = idKey;
        window.location.hash = `#collection/${slug}/edit/${idKey}`;
      }
    } else {
      navigateTo(`#collection/${slug}`);
    }
  };

  window.deleteDocument = async function (slug, idKey) {
    if (!confirm(`Bạn có chắc chắn muốn chuyển tài liệu "${idKey}" vào Thùng rác? (Có thể khôi phục bất cứ lúc nào)`)) return;

    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    store.__deleted[slug] = store.__deleted[slug] || [];
    if (!store.__deleted[slug].includes(idKey)) {
      store.__deleted[slug].push(idKey);
    }

    if (Array.isArray(store[slug])) {
      store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== idKey);
    }

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    // Đồng bộ xoá trên Supabase Cloud
    if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(slug)) {
      toast(`Đang xoá "${idKey}" trên Supabase Cloud...`);
      try {
        const delRes = await SupabaseSyncEngine.deleteDoc(slug, idKey);
        if (delRes.ok) {
          toast(`Đã chuyển vào Thùng rác (và xoá trên Cloud bảng ${delRes.table}).`);
        } else {
          toast(`Đã chuyển vào Thùng rác. Supabase: ${delRes.message}`);
        }
      } catch (e) {
        toast(`Đã chuyển vào Thùng rác. Lỗi Supabase: ${e.message}`);
      }
    } else {
      toast(`Đã chuyển tài liệu "${idKey}" vào Thùng rác.`);
    }

    if (State.currentRoute === "editor") {
      navigateTo(`#collection/${slug}`);
    } else {
      renderCollectionView(document.getElementById("payloadViewContainer"), slug);
    }
  };

  window.restoreDocument = function (slug, idKey) {
    const store = loadAdminStore();
    if (store.__deleted && Array.isArray(store.__deleted[slug])) {
      store.__deleted[slug] = store.__deleted[slug].filter((id) => id !== idKey);
      saveAdminStore(store);
      syncDataToWeb();
      renderSidebarLists();
      toast(`Đã khôi phục tài liệu "${idKey}" thành công!`);
      renderCollectionView(document.getElementById("payloadViewContainer"), slug);
    }
  };

  window.permanentDeleteDocument = async function (slug, idKey) {
    if (!confirm(`CẢNH BÁO: Bạn có chắc chắn muốn XÓA VĨNH VIỄN tài liệu "${idKey}"? Hành động này sẽ loại bỏ hoàn toàn khỏi bộ nhớ.`)) return;

    const store = loadAdminStore();
    if (Array.isArray(store[slug])) {
      store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== idKey);
    }
    store.__deleted = store.__deleted || {};
    store.__deleted[slug] = store.__deleted[slug] || [];
    if (!store.__deleted[slug].includes(idKey)) {
      store.__deleted[slug].push(idKey);
    }

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    if (SupabaseSyncEngine && SupabaseSyncEngine.hasMapping(slug)) {
      try {
        await SupabaseSyncEngine.deleteDoc(slug, idKey);
      } catch (_) {}
    }

    toast(`Đã xóa vĩnh viễn tài liệu "${idKey}".`);
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  };

  window.bulkRestore = function (slug) {
    if (State.selectedRows.size === 0) return;
    const store = loadAdminStore();
    if (store.__deleted && Array.isArray(store.__deleted[slug])) {
      store.__deleted[slug] = store.__deleted[slug].filter((id) => !State.selectedRows.has(id));
      saveAdminStore(store);
      syncDataToWeb();
      renderSidebarLists();
      State.selectedRows.clear();
      toast("Đã khôi phục thành công các mục được chọn!");
      renderCollectionView(document.getElementById("payloadViewContainer"), slug);
    }
  };

  window.bulkPermanentDelete = function (slug) {
    if (State.selectedRows.size === 0) return;
    if (!confirm(`CẢNH BÁO: Bạn có chắc chắn muốn XÓA VĨNH VIỄN ${State.selectedRows.size} mục đã chọn?`)) return;

    const store = loadAdminStore();
    State.selectedRows.forEach((id) => {
      if (Array.isArray(store[slug])) {
        store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== id);
      }
      store.__deleted = store.__deleted || {};
      store.__deleted[slug] = store.__deleted[slug] || [];
      if (!store.__deleted[slug].includes(id)) store.__deleted[slug].push(id);
    });

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();
    State.selectedRows.clear();
    toast("Đã xóa vĩnh viễn các mục được chọn.");
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  };

  window.resetDocumentToDefault = function () {
    const slug = State.currentSlug;
    const docId = State.currentDocId;
    const col = COLLECTIONS[slug];
    if (!col || !docId) return;

    const originalList = col.source() || [];
    const original = originalList.find((it) => (it.id || it.slug || it.title) === docId);
    if (!original) {
      toast("Tài liệu này được tạo mới bởi admin, không có bản gốc trong data.js.");
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn khôi phục tài liệu "${docId}" về nội dung ban đầu từ data.js? Toàn bộ sửa đổi của quản trị viên sẽ bị hủy bỏ.`)) return;

    const store = loadAdminStore();
    if (Array.isArray(store[slug])) {
      store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== docId);
    }
    if (store.__deleted && Array.isArray(store.__deleted[slug])) {
      store.__deleted[slug] = store.__deleted[slug].filter((k) => k !== docId);
    }

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    State.currentDraft = JSON.parse(JSON.stringify(stripSource(original)));
    toast(`Đã khôi phục tài liệu "${docId}" về dữ liệu gốc mặc định!`);
    renderDocumentEditor(document.getElementById("payloadViewContainer"), slug);
  };

  window.cloneDocument = function (slug, idKey) {
    const list = getMergedList(slug);
    const item = list.find((it) => (it.id || it.slug || it.title) === idKey);
    if (!item) return;

    const clone = JSON.parse(JSON.stringify(stripSource(item)));
    const newId = `${idKey}_copy_${Date.now().toString().slice(-4)}`;
    if (clone.id) clone.id = newId;
    if (clone.slug) clone.slug = newId;
    if (clone.title) clone.title = `${clone.title} (Bản sao)`;
    clone.__admin = true;

    const store = loadAdminStore();
    store[slug] = store[slug] || [];
    store[slug].push(clone);
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();

    toast(`Đã nhân bản thành công "${newId}"!`);
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  };

  function bulkDelete(slug) {
    if (State.selectedRows.size === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xoá ${State.selectedRows.size} tài liệu đã chọn?`)) return;

    const store = loadAdminStore();
    store.__deleted = store.__deleted || {};
    store.__deleted[slug] = store.__deleted[slug] || [];

    State.selectedRows.forEach((id) => {
      if (!store.__deleted[slug].includes(id)) store.__deleted[slug].push(id);
      if (Array.isArray(store[slug])) {
        store[slug] = store[slug].filter((it) => (it.id || it.slug || it.title) !== id);
      }
    });

    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();
    State.selectedRows.clear();

    toast("Đã xoá hàng loạt các mục được chọn!");
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  }

  function bulkUpdateField(slug, field, value) {
    if (State.selectedRows.size === 0) return;

    const store = loadAdminStore();
    store[slug] = store[slug] || [];
    const list = getMergedList(slug);

    State.selectedRows.forEach((id) => {
      const orig = list.find((it) => (it.id || it.slug || it.title) === id);
      if (!orig) return;
      const clone = { ...orig, [field]: value, __admin: true };
      delete clone.__source;
      const idx = store[slug].findIndex((it) => (it.id || it.slug || it.title) === id);
      if (idx >= 0) store[slug][idx] = clone;
      else store[slug].push(clone);
    });

    saveAdminStore(store);
    syncDataToWeb();
    State.selectedRows.clear();

    toast("Đã cập nhật trạng thái cho các mục được chọn!");
    renderCollectionView(document.getElementById("payloadViewContainer"), slug);
  }

  // =========================================================================
  // 11. VIEW 4: LIVE PREVIEW DRAWER (PAYLOAD 3.0 SIGNATURE)
  // =========================================================================

  function openLivePreview() {
    const drawer = document.getElementById("previewDrawer");
    const backdrop = document.getElementById("payloadBackdrop");
    const iframe = document.getElementById("previewIframe");
    const selector = document.getElementById("previewPageSelector");

    if (!drawer || !backdrop) return;

    // Flush current DOM input values into draft buffer
    if (State.currentDraft && State.activeEditorTab !== "json") {
      document.querySelectorAll(".live-draft-field").forEach((inp) => {
        const k = inp.getAttribute("data-key") || inp.name;
        if (k) State.currentDraft[k] = inp.type === "number" ? Number(inp.value) : inp.value;
      });
      // Nếu có canvas Notion trực quan, đồng bộ canvas sang markdown trước khi lưu
      const canvasEl = document.querySelector(".notion-canvas");
      if (canvasEl && typeof window.domToMarkdown === "function") {
        const md = window.domToMarkdown(canvasEl);
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) mdInp.value = md;
        State.currentDraft.content_md = md;
        State.currentDraft.content = md;
        State.currentDraft.content_markdown = md;
      } else {
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) {
          const val = mdInp.value;
          State.currentDraft.content_md = val;
          State.currentDraft.content = val;
          State.currentDraft.content_markdown = val;
        }
      }
    }

    // Temporary sync draft data to local cache so preview iframe reads latest changes
    if (State.currentDraft && State.currentSlug) {
      const store = loadAdminStore();
      store[State.currentSlug] = store[State.currentSlug] || [];
      const idKey = State.currentDraft.id || State.currentDraft.slug || State.currentDraft.title;
      if (idKey) {
        const idx = store[State.currentSlug].findIndex((it) => (it.id || it.slug || it.title) === idKey);
        if (idx >= 0) store[State.currentSlug][idx] = { ...State.currentDraft, __admin: true };
        else store[State.currentSlug].push({ ...State.currentDraft, __admin: true });
        saveAdminStore(store);
        syncDataToWeb();
      }

      // Lưu trữ bản nháp xem trước thời gian thực vào sessionStorage và localStorage
      try {
        const previewPayload = {
          slug: State.currentSlug,
          docId: idKey,
          doc: State.currentDraft,
          timestamp: Date.now()
        };
        sessionStorage.setItem("rusi_live_preview_draft", JSON.stringify(previewPayload));
        localStorage.setItem("rusi_live_preview_draft", JSON.stringify(previewPayload));
      } catch (_) {}
    }

    let targetUrl = "mock-test.html";
    if (State.currentSlug && COLLECTIONS[State.currentSlug]) {
      const base = COLLECTIONS[State.currentSlug].webUrl;
      const docId = State.currentDraft ? (State.currentDraft.id || State.currentDraft.slug) : State.currentDocId;

      if (State.currentSlug === "TRKI_BANK" && docId) targetUrl = `mock-test.html?test=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "VOCAB_JARS" && docId) targetUrl = `vocabulary.html?topic=${encodeURIComponent(docId)}&mode=article&preview=1`;
      else if (State.currentSlug === "TOPIC_ARTICLES" && docId) targetUrl = `vocabulary.html?topic=${encodeURIComponent(docId)}&mode=article&preview=1`;
      else if (State.currentSlug === "BLOG_POSTS" && docId) targetUrl = `blog-post.html?slug=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "LISTENING_LESSONS" && docId) targetUrl = `listening.html?lesson=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "SPEAKING_SETS" && docId) targetUrl = `speaking.html?set=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "WRITING_TASKS" && docId) targetUrl = `writing.html?task=${encodeURIComponent(docId)}&preview=1`;
      else targetUrl = base;
    }

    if (selector) selector.value = targetUrl.split("?")[0];
    if (iframe) iframe.src = targetUrl;

    drawer.classList.add("open");
    backdrop.classList.add("open");

    const closeBtn = document.getElementById("btnClosePreview");
    if (closeBtn) closeBtn.onclick = closeLivePreview;

    const refreshBtn = document.getElementById("btnRefreshPreview");
    if (refreshBtn) refreshBtn.onclick = () => { if (iframe) iframe.src = iframe.src; };

    if (selector) selector.onchange = (e) => { if (iframe) iframe.src = e.target.value; };

    backdrop.onclick = closeLivePreview;
  }

  window.openPreviewInNewTab = function () {
    // Flush current DOM input values into draft buffer
    if (State.currentDraft && State.activeEditorTab !== "json") {
      document.querySelectorAll(".live-draft-field").forEach((inp) => {
        const k = inp.getAttribute("data-key") || inp.name;
        if (k) State.currentDraft[k] = inp.type === "number" ? Number(inp.value) : inp.value;
      });
      // Nếu có canvas Notion trực quan, đồng bộ canvas sang markdown trước khi lưu
      const canvasEl = document.querySelector(".notion-canvas");
      if (canvasEl && typeof window.domToMarkdown === "function") {
        const md = window.domToMarkdown(canvasEl);
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) mdInp.value = md;
        State.currentDraft.content_md = md;
        State.currentDraft.content = md;
        State.currentDraft.content_markdown = md;
      } else {
        const mdInp = document.querySelector(".live-markdown-input");
        if (mdInp) {
          const val = mdInp.value;
          State.currentDraft.content_md = val;
          State.currentDraft.content = val;
          State.currentDraft.content_markdown = val;
        }
      }
    }

    const docId = State.currentDraft ? (State.currentDraft.id || State.currentDraft.slug) : State.currentDocId;
    let targetUrl = "index.html";
    if (State.currentSlug && COLLECTIONS[State.currentSlug]) {
      const base = COLLECTIONS[State.currentSlug].webUrl;
      if (State.currentSlug === "TRKI_BANK" && docId) targetUrl = `mock-test.html?test=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "VOCAB_JARS" && docId) targetUrl = `vocabulary.html?topic=${encodeURIComponent(docId)}&mode=article&preview=1`;
      else if (State.currentSlug === "TOPIC_ARTICLES" && docId) targetUrl = `vocabulary.html?topic=${encodeURIComponent(docId)}&mode=article&preview=1`;
      else if (State.currentSlug === "BLOG_POSTS" && docId) targetUrl = `blog-post.html?slug=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "LISTENING_LESSONS" && docId) targetUrl = `listening.html?lesson=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "SPEAKING_SETS" && docId) targetUrl = `speaking.html?set=${encodeURIComponent(docId)}&preview=1`;
      else if (State.currentSlug === "WRITING_TASKS" && docId) targetUrl = `writing.html?task=${encodeURIComponent(docId)}&preview=1`;
      else targetUrl = base;
    }

    if (State.currentDraft && State.currentSlug) {
      try {
        const idKey = State.currentDraft.id || State.currentDraft.slug || State.currentDraft.title;
        const previewPayload = {
          slug: State.currentSlug,
          docId: idKey,
          doc: State.currentDraft,
          timestamp: Date.now()
        };
        sessionStorage.setItem("rusi_live_preview_draft", JSON.stringify(previewPayload));
        localStorage.setItem("rusi_live_preview_draft", JSON.stringify(previewPayload));
      } catch (_) {}
    }
    window.open(targetUrl, "_blank");
  };

  function closeLivePreview() {
    const drawer = document.getElementById("previewDrawer");
    const backdrop = document.getElementById("payloadBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  // =========================================================================
  // 12. VIEW 5: REST API & SCHEMA EXPLORER
  // =========================================================================

  function renderApiExplorer(container) {
    const origin = window.location.origin;
    let cardsHtml = "";

    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      const items = getMergedList(key);
      const restPath = `/api/${col.slug.toLowerCase().replace(/_/g, "-")}`;

      cardsHtml += `
        <div style="background:var(--p-surface-elevated);border:1px solid var(--p-border);border-radius:var(--p-radius-lg);padding:18px;margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <span class="p-pill p-pill-info" style="font-size:11px">GET</span>
              <code style="font-size:14px;font-weight:700">${restPath}</code>
              <span class="p-pill p-pill-neutral">${items.length} tài liệu</span>
            </div>
            <div style="display:flex;gap:6px">
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="navigator.clipboard.writeText('curl -X GET ${origin}${restPath}');window.toast('Đã copy cURL command!')">Copy cURL</button>
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.downloadCollectionJson('${col.slug}')">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Tải JSON</button>
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="document.getElementById('apiJson_${col.slug}').style.display = document.getElementById('apiJson_${col.slug}').style.display === 'none' ? 'block' : 'none'">Xem JSON ${window.RusiIcons ? RusiIcons.get("chevron-down", { size: 12 }) : ""}</button>
            </div>
          </div>
          <p style="font-size:12.5px;color:var(--p-text-muted);margin:0 0 10px 0">${esc(col.desc || "REST endpoint simulation.")}</p>
          <div id="apiJson_${col.slug}" style="display:none;margin-top:10px">
            <textarea class="payload-code-editor" style="min-height:160px" readonly>${esc(JSON.stringify({ total: items.length, docs: items.map(stripSource) }, null, 2))}</textarea>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("waveform-audio", { size: 24 }) : ""} Payload REST API & Schema Explorer</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Mô phỏng các điểm cuối REST và GraphQL của Payload CMS. Hỗ trợ truy vấn dữ liệu từ xa cho ứng dụng Mobile hoặc Web bên ngoài.</p>
      </div>

      <div>
        ${cardsHtml}
      </div>
    `;
  }

  window.downloadCollectionJson = function (slug) {
    const items = getMergedList(slug).map(stripSource);
    const content = JSON.stringify(items, null, 2);
    downloadFile(`rusitrki-${slug.toLowerCase()}.json`, content, "application/json");
  };

  // =========================================================================
  // 13. VIEW 6: SUPABASE CLOUD & GLOBALS
  // =========================================================================

  function renderSupabaseSyncView(container) {
    const isReady = SupabaseSyncEngine.getClient() != null;
    const cfg = window.SUPABASE_CONFIG || {};
    const url = cfg.url || "https://nrhtdwjihnlaxrbitmcf.supabase.co";
    const anonKey = localStorage.getItem("trki_sb_anon_key") || cfg.anonKey || "";
    const maskedKey = anonKey ? (anonKey.slice(0, 14) + "..." + anonKey.slice(-10)) : "(Chưa cấu hình)";

    const mappings = SupabaseSyncEngine.MAPPINGS;
    const slugs = Object.keys(mappings);

    const rowsHtml = slugs.map((slug) => {
      const m = mappings[slug];
      const col = COLLECTIONS[slug] || {};
      const localCount = getMergedList(slug).length;
      return `
        <tr>
          <td>
            <div style="font-weight:700;display:flex;align-items:center;gap:8px">
              <span style="display:inline-flex;align-items:center">${window.RusiIcons ? RusiIcons.get(col.icon || "file-text", { size: 18 }) : ""}</span>
              <span>${esc(m.label)}</span>
            </div>
          </td>
          <td><code>${esc(m.table)}</code></td>
          <td style="font-weight:600">${localCount}</td>
          <td><span id="sbCloudCount_${slug}" class="p-pill p-pill-neutral">Đang nạp...</span></td>
          <td><span class="p-pill p-pill-success" style="display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Mapped</span></td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.syncSingleCollection('${slug}')" title="Đẩy bộ sưu tập này lên Supabase">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Đẩy</button>
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.pullSingleCollection('${slug}')" title="Kéo dữ liệu bảng này từ Supabase về">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Kéo</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 24 }) : ""} Supabase PostgreSQL Cloud Hub</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Cơ chế đồng bộ cơ sở dữ liệu đám mây hai chiều giữa Payload CMS và Supabase Cloud (Project: <code>nrhtdwjihnlaxrbitmcf</code>).</p>
      </div>

      <div class="payload-doc-card" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-weight:700;font-size:14px;margin-bottom:2px">Trạng thái kết nối Cloud:</div>
            <div style="font-size:12px;color:var(--p-text-muted)">Máy chủ: <code>${esc(url)}</code> &bull; Anon Key: <code>${esc(maskedKey)}</code></div>
          </div>
          <span id="sbHubConnBadge" class="p-pill ${isReady ? "p-pill-success" : "p-pill-warning"}">${isReady ? `<span style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 12 }) : ""} Supabase Sẵn Sàng</span>` : "Chưa có Anon Key"}</span>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
          <button class="p-btn p-btn-primary p-btn-sm" type="button" onclick="window.openSupabaseModal()">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 14 }) : ""} Cấu hình Anon Key</button>
          <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.syncAllToSupabase()">${window.RusiIcons ? RusiIcons.get("cloud-upload", { size: 14 }) : ""} Đẩy toàn bộ lên Supabase (Push All)</button>
          <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.pullAllFromSupabase()">${window.RusiIcons ? RusiIcons.get("cloud-download", { size: 14 }) : ""} Kéo toàn bộ về Web (Pull All)</button>
          <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.refreshSupabaseStats()">${window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : ""} Làm mới số lượng</button>
        </div>
      </div>

      <div id="sbSyncProgressBox" style="display:none;background:var(--p-surface-elevated);border:1px solid var(--p-border);border-radius:var(--p-radius-md);padding:16px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <span id="sbProgressTitle" style="font-weight:700;font-size:13px">Đang đồng bộ...</span>
          <span id="sbProgressPercent" class="p-pill p-pill-info">0%</span>
        </div>
        <div style="height:6px;background:var(--p-border);border-radius:3px;overflow:hidden;margin-bottom:8px">
          <div id="sbProgressBar" style="height:100%;width:0%;background:var(--p-primary);transition:width 0.2s ease"></div>
        </div>
        <div id="sbProgressDetail" style="font-size:12px;color:var(--p-text-muted)">Đang chuẩn bị dữ liệu...</div>
      </div>

      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table">
            <thead>
              <tr>
                <th>Bộ sưu tập (Collection)</th>
                <th>Bảng PostgreSQL</th>
                <th>Web / Local</th>
                <th>Supabase Cloud</th>
                <th>Ánh xạ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    window.refreshSupabaseStats();
  }

  window.refreshSupabaseStats = async function () {
    const stats = await SupabaseSyncEngine.fetchStats();
    if (!stats) return;
    Object.keys(stats).forEach((slug) => {
      const el = document.getElementById(`sbCloudCount_${slug}`);
      if (el) {
        const cnt = stats[slug];
        el.textContent = `${cnt} dòng`;
        el.className = "p-pill p-pill-info";
      }
    });
  };

  window.syncAllToSupabase = async function () {
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key trước khi đồng bộ đám mây.");
      openSupabaseModal();
      return;
    }

    const box = document.getElementById("sbSyncProgressBox");
    const pTitle = document.getElementById("sbProgressTitle");
    const pPercent = document.getElementById("sbProgressPercent");
    const pBar = document.getElementById("sbProgressBar");
    const pDetail = document.getElementById("sbProgressDetail");

    if (box) box.style.display = "block";
    if (pTitle) pTitle.textContent = "Đang đẩy dữ liệu lên Supabase Cloud...";

    toast("Bắt đầu đồng bộ 8 bảng lên Supabase Cloud...");

    const res = await SupabaseSyncEngine.syncAllCollections((prog) => {
      const pct = Math.round((prog.index / prog.totalSlugs) * 100);
      if (pPercent) pPercent.textContent = `${pct}%`;
      if (pBar) pBar.style.width = `${pct}%`;
      if (pDetail) pDetail.textContent = `[${prog.index}/${prog.totalSlugs}] ${prog.label} (${prog.current}/${prog.total} bản ghi)...`;
    });

    if (res.ok) {
      toast(`Đã đẩy thành công ${res.totalSuccess} tài liệu lên Supabase Cloud!`);
      if (pTitle) pTitle.textContent = "Đẩy dữ liệu hoàn tất!";
      if (pDetail) pDetail.textContent = `Tổng cộng ${res.totalSuccess} tài liệu đã đồng bộ thành công vào 8 bảng PostgreSQL.`;
    } else {
      toast(`Đã đồng bộ ${res.totalSuccess} bản ghi (${res.totalErrors} lỗi).`);
      if (pTitle) pTitle.textContent = "Hoàn tất có cảnh báo";
      if (pDetail) pDetail.textContent = `Thành công: ${res.totalSuccess}, lỗi: ${res.totalErrors}.`;
    }

    window.refreshSupabaseStats();
    setTimeout(() => { if (box) box.style.display = "none"; }, 5000);
  };

  window.pullAllFromSupabase = async function () {
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key trước khi kéo dữ liệu.");
      openSupabaseModal();
      return;
    }

    if (!confirm("Kéo toàn bộ dữ liệu từ Supabase Cloud về máy? Dữ liệu mới nhất trên đám mây sẽ cập nhật vào website.")) return;

    const box = document.getElementById("sbSyncProgressBox");
    const pTitle = document.getElementById("sbProgressTitle");
    const pPercent = document.getElementById("sbProgressPercent");
    const pBar = document.getElementById("sbProgressBar");
    const pDetail = document.getElementById("sbProgressDetail");

    if (box) box.style.display = "block";
    if (pTitle) pTitle.textContent = "Đang kéo dữ liệu từ Supabase Cloud về...";

    toast("Đang tải dữ liệu từ Supabase PostgreSQL...");

    const res = await SupabaseSyncEngine.pullAllCollections((prog) => {
      const pct = Math.round((prog.index / prog.totalSlugs) * 100);
      if (pPercent) pPercent.textContent = `${pct}%`;
      if (pBar) pBar.style.width = `${pct}%`;
      if (pDetail) pDetail.textContent = `[${prog.index}/${prog.totalSlugs}] Đang tải ${prog.label}...`;
    });

    if (res.ok) {
      toast(`Đã kéo thành công ${res.totalPulled} tài liệu từ Supabase về Web!`);
      if (pTitle) pTitle.textContent = "Kéo dữ liệu hoàn tất!";
      if (pDetail) pDetail.textContent = `Đã cập nhật ${res.totalPulled} tài liệu vào bộ nhớ máy và website.`;
    }

    window.refreshSupabaseStats();
    setTimeout(() => { if (box) box.style.display = "none"; }, 4000);
  };

  window.syncSingleCollection = async function (slug) {
    const mapping = SupabaseSyncEngine.MAPPINGS[slug];
    if (!mapping) return;
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key.");
      openSupabaseModal();
      return;
    }
    toast(`Đang đẩy ${mapping.label} lên Supabase Cloud...`);
    const items = getMergedList(slug).map(stripSource);
    let okCount = 0;
    for (const it of items) {
      const res = await SupabaseSyncEngine.upsertDoc(slug, it);
      if (res.ok) okCount++;
    }
    toast(`Đã đồng bộ ${okCount}/${items.length} bản ghi ${mapping.label} lên bảng [${mapping.table}]!`);
    window.refreshSupabaseStats();
  };

  window.pullSingleCollection = async function (slug) {
    const mapping = SupabaseSyncEngine.MAPPINGS[slug];
    if (!mapping) return;
    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      toast("Vui lòng cấu hình Supabase Anon Key.");
      openSupabaseModal();
      return;
    }
    toast(`Đang kéo dữ liệu ${mapping.label} từ Supabase...`);
    try {
      const { data, error } = await sb.from(mapping.table).select("*");
      if (error) throw error;
      if (Array.isArray(data)) {
        const store = loadAdminStore();
        store[slug] = store[slug] || [];
        data.forEach((row) => {
          const doc = mapping.fromRow(row);
          const idKey = mapping.idKey(doc);
          if (!idKey) return;
          const idx = store[slug].findIndex((x) => mapping.idKey(x) === idKey);
          if (idx >= 0) store[slug][idx] = { ...doc, __admin: true, __fromSupabase: true };
          else store[slug].push({ ...doc, __admin: true, __fromSupabase: true });
        });
        saveAdminStore(store);
        syncDataToWeb();
        renderSidebarLists();
        toast(`Đã kéo ${data.length} bản ghi ${mapping.label} từ Cloud về máy!`);
        window.refreshSupabaseStats();
      }
    } catch (err) {
      toast(`Lỗi kéo dữ liệu: ${err.message}`);
    }
  };

  function renderGlobalsView(container, slug) {
    const store = loadAdminStore();
    const settings = store.__siteSettings || {
      site_title: "RUSI TRKI — Nền tảng Ôn thi & Du học Nga",
      slogan: "Chinh phục tiếng Nga từ số 0 đến B2",
      contact_zalo: "0988.xxx.xxx",
      contact_email: "support@rusitrki.com",
      social_telegram: "https://t.me/rusitrki",
      social_facebook: "https://facebook.com/rusitrki",
      social_youtube: "https://youtube.com/@rusitrki",
      bank_name: "MB Bank (Quân Đội)",
      bank_account: "0988888888",
      bank_holder: "RUSI TRKI VIETNAM",
      transfer_syntax: "RUSI PRO {user_id}",
      banner_enabled: true,
      banner_text: "🔥 Ưu đãi 50% Gói PRO Chinh phục TRKI B2 - Mở khóa toàn bộ ngân hàng đề thi!",
      banner_link: "upgrade.html",
      rusika_greeting: "Привет! Hôm nay bạn muốn chinh phục bài học nào cùng Rusika?",
      rusika_motivation: "Mỗi ngày 15 phút, chứng chỉ TRKI nằm trong tầm tay bạn!",
      xp_per_lesson: 15,
      streak_milestone_bonus: 50,
      pomodoro_work_mins: 25,
      pomodoro_break_mins: 5
    };

    container.innerHTML = `
      <div style="margin-bottom:24px">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px 0;display:flex;align-items:center;gap:10px">${window.RusiIcons ? RusiIcons.get("settings-gear", { size: 24 }) : ""} Cấu hình Hệ thống Toàn diện (Globals)</h1>
        <p style="color:var(--p-text-muted);font-size:13.5px;margin:0">Cấu hình thông tin thương hiệu, tài khoản VietQR, thanh thông báo banner và trợ lý AI Mèo Rusika.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:20px;max-width:960px;">
        <!-- Card 1: Thương hiệu & Liên hệ -->
        <div class="payload-doc-card">
          <h2 style="font-size:16px;font-weight:700;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--p-border-subtle, rgba(0,0,0,0.08))">
            ${window.RusiIcons ? RusiIcons.get("globe", { size: 18 }) : "🌐"} 1. Thương hiệu &amp; Kênh liên hệ
          </h2>
          <div class="p-form-row">
            <div>
              <label class="p-label">Tên Website:</label>
              <input type="text" class="p-input" id="cfgSiteTitle" value="${escAttr(settings.site_title || '')}" />
            </div>
            <div>
              <label class="p-label">Khẩu hiệu Slogan:</label>
              <input type="text" class="p-input" id="cfgSlogan" value="${escAttr(settings.slogan || '')}" />
            </div>
          </div>
          <div class="p-form-row" style="margin-top:12px">
            <div>
              <label class="p-label">Hotline / Zalo hỗ trợ:</label>
              <input type="text" class="p-input" id="cfgZalo" value="${escAttr(settings.contact_zalo || '')}" />
            </div>
            <div>
              <label class="p-label">Email hỗ trợ:</label>
              <input type="text" class="p-input" id="cfgEmail" value="${escAttr(settings.contact_email || '')}" />
            </div>
          </div>
          <div class="p-form-row" style="margin-top:12px">
            <div>
              <label class="p-label">Kênh Telegram:</label>
              <input type="text" class="p-input" id="cfgTelegram" value="${escAttr(settings.social_telegram || '')}" placeholder="https://t.me/..." />
            </div>
            <div>
              <label class="p-label">Facebook Fanpage:</label>
              <input type="text" class="p-input" id="cfgFacebook" value="${escAttr(settings.social_facebook || '')}" placeholder="https://facebook.com/..." />
            </div>
          </div>
        </div>

        <!-- Card 2: Tài khoản VietQR & Ngân hàng -->
        <div class="payload-doc-card">
          <h2 style="font-size:16px;font-weight:700;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--p-border-subtle, rgba(0,0,0,0.08))">
            ${window.RusiIcons ? RusiIcons.get("credit-card", { size: 18 }) : "💳"} 2. Cổng thanh toán &amp; Tài khoản VietQR
          </h2>
          <div class="p-form-row">
            <div>
              <label class="p-label">Ngân hàng:</label>
              <input type="text" class="p-input" id="cfgBankName" value="${escAttr(settings.bank_name || '')}" placeholder="MB Bank, Vietcombank..." />
            </div>
            <div>
              <label class="p-label">Số tài khoản:</label>
              <input type="text" class="p-input" id="cfgBankAccount" value="${escAttr(settings.bank_account || '')}" />
            </div>
            <div>
              <label class="p-label">Tên chủ tài khoản:</label>
              <input type="text" class="p-input" id="cfgBankHolder" value="${escAttr(settings.bank_holder || '')}" />
            </div>
          </div>
          <div style="margin-top:12px">
            <label class="p-label">Cú pháp chuyển khoản mẫu:</label>
            <input type="text" class="p-input" id="cfgTransferSyntax" value="${escAttr(settings.transfer_syntax || 'RUSI PRO {user_id}')}" />
            <div class="p-help">Hệ thống sẽ thay thế <code>{user_id}</code> bằng mã học viên tương ứng khi tạo mã QR VietQR.</div>
          </div>
        </div>

        <!-- Card 3: Thanh thông báo đầu trang (Announcement Banner) -->
        <div class="payload-doc-card">
          <h2 style="font-size:16px;font-weight:700;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--p-border-subtle, rgba(0,0,0,0.08))">
            ${window.RusiIcons ? RusiIcons.get("bell", { size: 18 }) : "📢"} 3. Thanh thông báo khuyến mãi (Announcement Banner)
          </h2>
          <div style="margin-bottom:12px">
            <label style="display:inline-flex;align-items:center;gap:8px;font-weight:600;cursor:pointer">
              <input type="checkbox" id="cfgBannerEnabled" ${settings.banner_enabled ? "checked" : ""} style="width:18px;height:18px" />
              <span>Hiển thị thanh thông báo khuyến mãi ở đầu toàn bộ các trang</span>
            </label>
          </div>
          <div class="p-form-group">
            <label class="p-label">Nội dung thông báo:</label>
            <input type="text" class="p-input" id="cfgBannerText" value="${escAttr(settings.banner_text || '')}" placeholder="Ví dụ: 🔥 Ưu đãi 50% Gói PRO Chinh phục TRKI B2..." />
          </div>
          <div class="p-form-group">
            <label class="p-label">Link chuyển hướng khi click:</label>
            <input type="text" class="p-input" id="cfgBannerLink" value="${escAttr(settings.banner_link || 'upgrade.html')}" placeholder="upgrade.html hoặc https://..." />
          </div>
        </div>

        <!-- Card 4: Trợ lý ảo AI Mèo Rusika & Gamification -->
        <div class="payload-doc-card">
          <h2 style="font-size:16px;font-weight:700;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--p-border-subtle, rgba(0,0,0,0.08))">
            ${window.RusiIcons ? RusiIcons.get("cat-mascot", { size: 18 }) : "🐱"} 4. Trợ lý AI Mèo Rusika &amp; Gamification (XP / Streak)
          </h2>
          <div class="p-form-group">
            <label class="p-label">Lời chào mặc định của Mèo Rusika:</label>
            <input type="text" class="p-input" id="cfgRusikaGreeting" value="${escAttr(settings.rusika_greeting || '')}" />
          </div>
          <div class="p-form-group">
            <label class="p-label">Khẩu hiệu động viên hàng ngày:</label>
            <input type="text" class="p-input" id="cfgRusikaMotivation" value="${escAttr(settings.rusika_motivation || '')}" />
          </div>
          <div class="p-form-row">
            <div>
              <label class="p-label">Điểm thưởng XP mỗi bài học:</label>
              <input type="number" class="p-input" id="cfgXpPerLesson" value="${escAttr(settings.xp_per_lesson || 15)}" />
            </div>
            <div>
              <label class="p-label">Thưởng chuỗi Streak 7 ngày (XP):</label>
              <input type="number" class="p-input" id="cfgStreakBonus" value="${escAttr(settings.streak_milestone_bonus || 50)}" />
            </div>
            <div>
              <label class="p-label">Thời gian Pomodoro (phút):</label>
              <input type="number" class="p-input" id="cfgPomodoroMins" value="${escAttr(settings.pomodoro_work_mins || 25)}" />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div style="display:flex;justify-content:flex-end">
          <button class="p-btn p-btn-primary p-btn-lg" type="button" onclick="window.saveSiteSettings()">${window.RusiIcons ? RusiIcons.get("save", { size: 16 }) : ""} Lưu toàn bộ cấu hình hệ thống</button>
        </div>
      </div>
    `;
  }

  window.saveSiteSettings = function () {
    const store = loadAdminStore();
    const settings = {
      site_title: document.getElementById("cfgSiteTitle")?.value || "",
      slogan: document.getElementById("cfgSlogan")?.value || "",
      contact_zalo: document.getElementById("cfgZalo")?.value || "",
      contact_email: document.getElementById("cfgEmail")?.value || "",
      social_telegram: document.getElementById("cfgTelegram")?.value || "",
      social_facebook: document.getElementById("cfgFacebook")?.value || "",
      bank_name: document.getElementById("cfgBankName")?.value || "",
      bank_account: document.getElementById("cfgBankAccount")?.value || "",
      bank_holder: document.getElementById("cfgBankHolder")?.value || "",
      transfer_syntax: document.getElementById("cfgTransferSyntax")?.value || "RUSI PRO {user_id}",
      banner_enabled: Boolean(document.getElementById("cfgBannerEnabled")?.checked),
      banner_text: document.getElementById("cfgBannerText")?.value || "",
      banner_link: document.getElementById("cfgBannerLink")?.value || "upgrade.html",
      rusika_greeting: document.getElementById("cfgRusikaGreeting")?.value || "",
      rusika_motivation: document.getElementById("cfgRusikaMotivation")?.value || "",
      xp_per_lesson: parseInt(document.getElementById("cfgXpPerLesson")?.value, 10) || 15,
      streak_milestone_bonus: parseInt(document.getElementById("cfgStreakBonus")?.value, 10) || 50,
      pomodoro_work_mins: parseInt(document.getElementById("cfgPomodoroMins")?.value, 10) || 25
    };
    store.__siteSettings = settings;
    saveAdminStore(store);
    try {
      localStorage.setItem("rusi_site_settings", JSON.stringify(settings));
    } catch (_) {}
    window.SITE_SETTINGS = settings;
    syncDataToWeb();
    toast("Đã lưu toàn bộ cấu hình hệ thống thành công!");
  };

  // =========================================================================
  // 14. EXPORT, IMPORT & RESET
  // =========================================================================

  function exportData() {
    const payload = {};
    COLLECTION_KEYS.forEach((k) => {
      payload[k] = getMergedList(k).map(stripSource);
    });

    const body = COLLECTION_KEYS.map((k) => `const ${k} = ${JSON.stringify(payload[k], null, 2)};`).join("\n\n");
    const today = new Date().toISOString().slice(0, 10);
    const content = `// Auto-generated by Payload CMS Studio on ${today}\n// Có thể dán trực tiếp vào data.js để lưu vĩnh viễn vào mã nguồn.\n\n${body}\n`;

    downloadFile(`rusitrki-data-export-${today}.js`, content, "application/javascript");
    toast("Đã tải về file export. Dán nội dung vào data.js khi muốn commit git.");
  }

  function downloadFile(name, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function onImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        let text = String(reader.result).trim();
        let cleaned = text.replace(/^\s*\/\/.*$/gm, "").trim();
        if (cleaned.startsWith("const ") || cleaned.startsWith("var ") || cleaned.startsWith("let ") || cleaned.startsWith("window.")) {
          const jsonMatch = cleaned.match(/=\s*([\[{][\s\S]*);?\s*$/);
          if (jsonMatch) cleaned = jsonMatch[1].trim();
        }
        const obj = JSON.parse(cleaned);
        importToStore(obj);
      } catch (err) {
        toast("File không hợp lệ hoặc sai định dạng JSON: " + err.message, "error");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  }

  function importToStore(obj) {
    if (!obj || typeof obj !== "object") {
      toast("File không chứa dữ liệu hợp lệ.");
      return;
    }
    const store = loadAdminStore();
    let count = 0;
    COLLECTION_KEYS.forEach((k) => {
      if (Array.isArray(obj[k])) {
        store[k] = store[k] || [];
        obj[k].forEach((it) => {
          const idKey = it.id || it.slug || it.title;
          if (!idKey) return;
          const idx = store[k].findIndex((x) => (x.id || x.slug || x.title) === idKey);
          if (idx >= 0) store[k][idx] = { ...it, __admin: true };
          else store[k].push({ ...it, __admin: true });
          count++;
        });
      }
    });
    saveAdminStore(store);
    syncDataToWeb();
    renderSidebarLists();
    handleRoute();
    toast(`Đã import thành công ${count} tài liệu và đồng bộ về website!`);
  }

  function resetAdminData() {
    if (!confirm("Khôi phục TOÀN BỘ dữ liệu về mặc định gốc (từ data.js)? Tất cả chỉnh sửa admin sẽ được đặt lại.")) return;
    localStorage.removeItem(STORE_KEY);
    syncDataToWeb();
    renderSidebarLists();
    handleRoute();
    toast("Đã khôi phục dữ liệu gốc từ data.js!");
  }

  // =========================================================================
  // 15. SUPABASE CONNECTION MODAL
  // =========================================================================

  function openSupabaseModal() {
    const drawer = document.getElementById("modalSupabaseDrawer");
    const backdrop = document.getElementById("modalSupabaseBackdrop");
    if (!drawer || !backdrop) return;

    drawer.classList.add("open");
    backdrop.classList.add("open");

    const closeBtn = document.getElementById("modalSbClose");
    if (closeBtn) closeBtn.onclick = closeSupabaseModal;
    backdrop.onclick = closeSupabaseModal;

    const serviceInp = document.getElementById("sbServiceKeyInput");
    if (serviceInp) {
      serviceInp.value = localStorage.getItem("trki_sb_service_key") || "";
    }

    const anonInp = document.getElementById("sbAnonKeyInput");
    if (anonInp && window.SUPABASE_CONFIG) {
      anonInp.value = localStorage.getItem("trki_sb_anon_key") || window.SUPABASE_CONFIG.anonKey || "";
    }

    testSupabaseConn();

    const saveBtn = document.getElementById("btnSaveSbKey");
    if (saveBtn) {
      saveBtn.onclick = () => {
        // Tự động dọn dẹp khóa service_role khỏi LocalStorage trình duyệt để bảo vệ an toàn
        localStorage.removeItem("trki_sb_service_key");

        const aVal = (anonInp?.value || "").trim();
        if (aVal) {
          if (window.SUPABASE_CONFIG) window.SUPABASE_CONFIG.anonKey = aVal;
          localStorage.setItem("trki_sb_anon_key", aVal);
          localStorage.setItem("rusi_supabase_anon_key", aVal);
        }

        if (window.RusiSupabase && window.RusiSupabase.resetClient) {
          window.RusiSupabase.resetClient();
        }

        testSupabaseConn();
        toast("Đã lưu cấu hình kết nối Supabase!");
      };
    }

    const testBtn = document.getElementById("btnTestSbConn");
    if (testBtn) testBtn.onclick = testSupabaseConn;

    const pushBtn = document.getElementById("btnPushAllToSb");
    if (pushBtn) pushBtn.onclick = () => window.syncAllToSupabase();

    const pullBtn = document.getElementById("btnPullAllFromSb");
    if (pullBtn) pullBtn.onclick = () => window.pullAllFromSupabase();

    const copySqlBtn = document.getElementById("btnCopyFixSql");
    if (copySqlBtn) {
      copySqlBtn.onclick = () => {
        const sql = `-- RUSI TRKI: CẤP QUYỀN QUẢN TRỊ VIÊN AN TOÀN (CHUẨN BẢO MẬT RLS)
-- Thay thế YOUR_EMAIL bằng email quản trị viên của bạn:
UPDATE public.profiles 
SET role = 'super_admin', updated_at = now() 
WHERE email = 'YOUR_EMAIL';

-- Đảm bảo quyền kiểm tra Admin:
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, anon;`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(sql).then(() => {
            toast("Đã sao chép SQL cấp quyền Quản trị! Dán vào Supabase SQL Editor và bấm RUN.");
          }).catch(() => {
            prompt("Sao chép mã SQL cấp quyền Supabase:", sql);
          });
        } else {
          prompt("Sao chép mã SQL cấp quyền Supabase:", sql);
        }
      };
    }
  }

  function closeSupabaseModal() {
    const drawer = document.getElementById("modalSupabaseDrawer");
    const backdrop = document.getElementById("modalSupabaseBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  async function testSupabaseConn() {
    const badge = document.getElementById("sbConnStatusBadge");
    const msg = document.getElementById("sbConnMessage");
    if (!badge || !msg) return;

    badge.textContent = "Đang kiểm tra...";
    badge.className = "p-pill p-pill-warning";
    msg.textContent = "Đang kiểm tra kết nối và quyền ghi cơ sở dữ liệu...";

    const sb = SupabaseSyncEngine.getClient();
    if (!sb) {
      badge.textContent = "Chưa có Key";
      badge.className = "p-pill p-pill-warning";
      msg.textContent = "Vui lòng nhập Anon Key từ Supabase Dashboard.";
      return;
    }

    try {
      const startTime = Date.now();
      const { data, error } = await sb.from("trki_tests").select("id").limit(1);
      const latency = Date.now() - startTime;

      if (error) {
        badge.textContent = "Lỗi kết nối";
        badge.className = "p-pill p-pill-danger";
        msg.textContent = error.message;
        return;
      }

      badge.textContent = `Kết nối tốt (${latency}ms)`;
      badge.className = "p-pill p-pill-success";
      msg.textContent = "Kết nối Supabase thành công. Quyền đọc/ghi được kiểm soát an toàn bởi tài khoản Quản trị & Row Level Security (RLS).";
    } catch (e) {
      badge.textContent = "Lỗi ngoại lệ";
      badge.className = "p-pill p-pill-danger";
      msg.textContent = e.message;
    }
  }

  // =========================================================================
  // 16. MOBILE DRAWER & THEME SWITCHER
  // =========================================================================

  function initMobileDrawer() {
    const toggleBtn = document.getElementById("btnMenuToggle");
    const sidebar = document.getElementById("payloadSidebar");
    const backdrop = document.getElementById("payloadBackdrop");
    const closeBtn = document.getElementById("sidebarCloseBtn");

    if (toggleBtn && sidebar && backdrop) {
      toggleBtn.onclick = () => {
        sidebar.classList.add("open");
        backdrop.classList.add("open");
        backdrop.onclick = closeMobileSidebar;
      };
    }

    if (closeBtn) closeBtn.onclick = closeMobileSidebar;
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("payloadSidebar");
    const backdrop = document.getElementById("payloadBackdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggleBtn = document.getElementById("btnToggleTheme");
    if (toggleBtn) {
      toggleBtn.innerHTML = savedTheme === "dark" ? (window.RusiIcons ? RusiIcons.get("moon", { size: 16 }) : "") : (window.RusiIcons ? RusiIcons.get("sun", { size: 16 }) : "");
      toggleBtn.onclick = () => {
        const cur = document.documentElement.getAttribute("data-theme") || "dark";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(THEME_KEY, next);
        toggleBtn.innerHTML = next === "dark" ? (window.RusiIcons ? RusiIcons.get("moon", { size: 16 }) : "") : (window.RusiIcons ? RusiIcons.get("sun", { size: 16 }) : "");
      };
    }
  }

  // =========================================================================
  // 17. AUTH & GATE LOGIC
  // =========================================================================

  const DEFAULT_ADMIN_EMAILS = [
    "admin@rusitrki.com",
    "academic@rusitrki.com",
    "tuadenzettt@gmail.com"
  ];

  function isLocalEnvironment() {
    try {
      const host = window.location.hostname;
      return host === "localhost" || host === "127.0.0.1" || host === "::1" || window.location.protocol === "file:";
    } catch (_) {
      return false;
    }
  }

  function isUserAdmin(user) {
    if (!user) return false;
    const role = String(user.role || "").toLowerCase().trim();
    if (role === "academic_admin" || role === "super_admin") return true;

    const email = String(user.email || "").toLowerCase().trim();
    if (email && DEFAULT_ADMIN_EMAILS.includes(email)) return true;

    return false;
  }

  function showLoginAlert(message, type = "error") {
    const el = document.getElementById("loginGateAlert");
    if (!el) return;
    el.className = `payload-gate-alert alert-${type}`;
    el.innerHTML = message;
    el.style.display = "block";
  }

  function hideLoginAlert() {
    const el = document.getElementById("loginGateAlert");
    if (el) el.style.display = "none";
  }

  async function handleEmailLogin() {
    const emailInput = document.getElementById("adminEmailInput");
    const passInput = document.getElementById("adminPasswordInput");
    const submitBtn = document.getElementById("btnAdminEmailLogin");
    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim();
    const password = passInput.value;

    if (!email) {
      showLoginAlert("Vui lòng nhập địa chỉ email quản trị viên.", "error");
      emailInput.focus();
      return;
    }
    if (!password) {
      showLoginAlert("Vui lòng nhập mật khẩu tài khoản.", "error");
      passInput.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Đang xác thực...";
    }
    showLoginAlert("Đang kết nối tới Supabase Auth...", "info");

    try {
      if (!window.Auth || typeof window.Auth.signInWithEmail !== "function") {
        throw new Error("Lớp xác thực Auth chưa sẵn sàng.");
      }

      const res = await window.Auth.signInWithEmail(email, password);
      if (res && res.error) {
        showLoginAlert(res.error.message || "Email hoặc mật khẩu không chính xác.", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("key", { size: 16 }) : "") + " Đăng nhập Studio";
        }
      } else if (res && res.user) {
        showLoginAlert("Đăng nhập thành công! Đang tải dữ liệu quản trị...", "success");
        setTimeout(() => {
          applyAuthState(true);
        }, 200);
      } else {
        showLoginAlert("Không nhận được phản hồi từ hệ thống xác thực.", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("key", { size: 16 }) : "") + " Đăng nhập Studio";
        }
      }
    } catch (err) {
      showLoginAlert("Lỗi đăng nhập: " + (err.message || err), "error");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("key", { size: 16 }) : "") + " Đăng nhập Studio";
      }
    }
  }

  function applyAuthState(isAuthed) {
    const loginGate = document.getElementById("loginGate");
    const deniedGate = document.getElementById("deniedGate");
    const appEl = document.getElementById("payloadApp");

    const isDevMode = isLocalEnvironment() && localStorage.getItem(DEV_MODE_KEY) === "true";

    if (isDevMode) {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "flex";

      const nameEl = document.getElementById("sidebarUserName");
      const avatarEl = document.getElementById("sidebarAvatar");
      const roleEl = document.getElementById("sidebarUserRole");
      if (nameEl) nameEl.textContent = "Quản trị viên (Dev Mode)";
      if (avatarEl) avatarEl.textContent = "D";
      if (roleEl) roleEl.textContent = "Super Admin (Local)";
      return;
    }

    if (!isAuthed || !window.Auth || !window.Auth.user) {
      if (loginGate) loginGate.style.display = "flex";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "none";
      return;
    }

    const user = window.Auth.user;
    const email = String(user.email || "").toLowerCase().trim();
    const isAdmin = isUserAdmin(user);

    if (isAdmin) {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "none";
      if (appEl) appEl.style.display = "flex";

      const nameEl = document.getElementById("sidebarUserName");
      const avatarEl = document.getElementById("sidebarAvatar");
      const roleEl = document.getElementById("sidebarUserRole");
      if (nameEl) nameEl.textContent = user.displayName || user.name || email;
      if (avatarEl) avatarEl.textContent = (user.displayName || user.name || email)[0].toUpperCase();
      if (roleEl) {
        roleEl.textContent = (user.role === "super_admin" || DEFAULT_ADMIN_EMAILS.includes(email))
          ? "Super Admin"
          : "Academic Admin";
      }
    } else {
      if (loginGate) loginGate.style.display = "none";
      if (deniedGate) deniedGate.style.display = "flex";
      if (appEl) appEl.style.display = "none";

      const deniedInfo = document.getElementById("deniedInfo");
      if (deniedInfo) deniedInfo.textContent = `Tài khoản: ${email}`;

      const deniedRole = document.getElementById("deniedRole");
      if (deniedRole) {
        deniedRole.innerHTML = `Vai trò hiện tại: <span class="p-pill p-pill-neutral">${esc(user.role || "student")}</span>`;
      }

      const sqlSnippet = document.getElementById("sqlRoleSnippet");
      if (sqlSnippet) {
        sqlSnippet.textContent = `UPDATE profiles SET role = 'super_admin' WHERE email = '${email}';`;
      }
    }
  }

  // =========================================================================
  // 18. TOAST NOTIFICATIONS & UTILS
  // =========================================================================

  function toast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const lower = String(message || "").toLowerCase();
    if (type === "info") {
      if (lower.includes("lỗi") || lower.includes("thất bại") || lower.includes("failed") || lower.includes("error")) type = "error";
      else if (lower.includes("thành công") || lower.includes("đã lưu") || lower.includes("success") || lower.includes("hoàn tất") || lower.includes("đồng bộ thành công")) type = "success";
      else if (lower.includes("cảnh báo") || lower.includes("warning") || lower.includes("chú ý")) type = "warning";
    }

    const icons = {
      success: window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : "✓",
      error: window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 16 }) : "✕",
      warning: window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 16 }) : "⚠",
      info: window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 16 }) : "ℹ"
    };

    const el = document.createElement("div");
    el.className = `payload-toast payload-toast-${type}`;
    el.innerHTML = `
      <span class="payload-toast-icon">${icons[type] || icons.info}</span>
      <span class="payload-toast-msg">${esc(message)}</span>
      <button type="button" class="payload-toast-close" title="Đóng" onclick="this.closest('.payload-toast').remove()">✕</button>
    `;
    container.appendChild(el);

    const timeout = type === "error" ? 4500 : 3200;
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      el.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      setTimeout(() => el.remove(), 260);
    }, timeout);
  }
  toast.success = (msg) => toast(msg, "success");
  toast.error = (msg) => toast(msg, "error");
  toast.warning = (msg) => toast(msg, "warning");
  toast.info = (msg) => toast(msg, "info");
  window.toast = toast;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function escAttr(s) {
    return esc(s);
  }

  // =========================================================================
  // 19. INITIALIZATION
  // =========================================================================

  function init() {
    initTheme();
    initMobileDrawer();
    renderSidebarLists();

    const impInput = document.getElementById("importFileInput");
    if (impInput) impInput.addEventListener("change", onImportFile);

    // Form Đăng nhập Email
    const loginForm = document.getElementById("adminEmailLoginForm");
    if (loginForm) {
      loginForm.onsubmit = (e) => {
        e.preventDefault();
        handleEmailLogin();
      };
    }
    const btnEmailLogin = document.getElementById("btnAdminEmailLogin");
    if (btnEmailLogin) btnEmailLogin.onclick = handleEmailLogin;

    // Toggle ẩn/hiện mật khẩu
    const togglePassBtn = document.getElementById("btnTogglePassword");
    const passInput = document.getElementById("adminPasswordInput");
    if (togglePassBtn && passInput) {
      togglePassBtn.onclick = () => {
        const isPass = passInput.type === "password";
        passInput.type = isPass ? "text" : "password";
        togglePassBtn.innerHTML = window.RusiIcons
          ? RusiIcons.get(isPass ? "eye-off" : "eye", { size: 16 })
          : (isPass ? "🔒" : "👁️");
      };
    }

    // Đăng nhập Google
    const googleLoginBtn = document.getElementById("adminLoginBtn");
    if (googleLoginBtn) {
      googleLoginBtn.onclick = () => window.Auth && window.Auth.signInWithGoogle();
    }

    // Đổi tài khoản ở Denied Gate
    const switchBtn = document.getElementById("btnSwitchAccount");
    if (switchBtn) {
      switchBtn.onclick = async () => {
        if (window.Auth && window.Auth.signOut) await window.Auth.signOut();
        applyAuthState(false);
      };
    }

    // Nút Kiểm tra lại Auth ở Denied Gate
    const recheckBtn = document.getElementById("btnRecheckAuth");
    if (recheckBtn) {
      recheckBtn.onclick = async () => {
        recheckBtn.disabled = true;
        recheckBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 14 }) : "") + " Đang kiểm tra...";
        try {
          if (window.Auth && window.Auth.refreshProfile) {
            await window.Auth.refreshProfile();
          }
          applyAuthState(!!(window.Auth && window.Auth.user));
          toast("Đã làm mới thông tin xác thực.");
        } finally {
          recheckBtn.disabled = false;
          recheckBtn.innerHTML = (window.RusiIcons ? RusiIcons.get("refresh-cw", { size: 16 }) : "") + " Đã cấp quyền, kiểm tra lại ngay";
        }
      };
    }

    // Nút Copy câu lệnh SQL ở Denied Gate
    const copySqlBtn = document.getElementById("btnCopySqlRole");
    if (copySqlBtn) {
      copySqlBtn.onclick = () => {
        const snippet = document.getElementById("sqlRoleSnippet");
        if (snippet) {
          navigator.clipboard.writeText(snippet.textContent.trim()).then(() => {
            toast("Đã sao chép câu lệnh SQL cấp quyền!");
          }).catch(() => {
            toast("Không thể tự sao chép, vui lòng bôi đen và nhấn Ctrl+C.");
          });
        }
      };
    }

    // Nút Dev Mode Bypass (chỉ hiển thị và hoạt động trên môi trường cục bộ localhost)
    const dev1 = document.getElementById("btnDevBypass");
    const dev2 = document.getElementById("btnDevBypass2");
    if (isLocalEnvironment()) {
      const onDevBypass = () => {
        localStorage.setItem(DEV_MODE_KEY, "true");
        toast("Đã kích hoạt chế độ Quản trị Cục bộ (Local Dev)!");
        applyAuthState(true);
      };
      if (dev1) {
        dev1.style.display = "";
        dev1.onclick = onDevBypass;
      }
      if (dev2) {
        dev2.style.display = "";
        dev2.onclick = onDevBypass;
      }
    } else {
      if (dev1) dev1.style.display = "none";
      if (dev2) dev2.style.display = "none";
    }

    // Supabase Cloud Buttons
    const pushSb = document.getElementById("btnPushAllToSb");
    if (pushSb) pushSb.onclick = () => window.syncAllToSupabase();

    const pullSb = document.getElementById("btnPullAllFromSb");
    if (pullSb) pullSb.onclick = () => window.pullAllFromSupabase();

    // Sign Out
    const signoutBtn = document.getElementById("btnSignOut");
    if (signoutBtn) {
      signoutBtn.onclick = async () => {
        if (!confirm("Bạn có chắc chắn muốn đăng xuất khỏi Payload Studio?")) return;
        localStorage.removeItem(DEV_MODE_KEY);
        if (window.Auth && window.Auth.signOut) await window.Auth.signOut();
        applyAuthState(false);
        toast("Đã đăng xuất tài khoản.");
      };
    }

    // Auth readiness listener
    if (window.Auth && window.Auth.isReady) {
      window.Auth.isReady().then(() => {
        applyAuthState(!!window.Auth.user);
        window.Auth.onChange((u) => applyAuthState(!!u));
      });
    } else {
      applyAuthState(false);
    }

    // Global Keyboard Shortcuts (International Studio UX)
    document.addEventListener("keydown", (e) => {
      // 1. Ctrl+S or Cmd+S => Save current document (stay on doc)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        if (State.currentRoute === "editor" && State.currentDraft) {
          e.preventDefault();
          window.saveDocument(true);
          return;
        }
      }

      // 2. Ctrl+P or Cmd+P => Toggle Live Preview
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        if (State.currentRoute === "editor") {
          e.preventDefault();
          const drawer = document.getElementById("previewDrawer");
          if (drawer && drawer.classList.contains("open")) {
            closeLivePreview();
          } else {
            openLivePreview();
          }
          return;
        }
      }

      // 3. Escape => Close Live Preview drawer, modals, or dropdowns
      if (e.key === "Escape") {
        const drawer = document.getElementById("previewDrawer");
        if (drawer && drawer.classList.contains("open")) {
          closeLivePreview();
          return;
        }
        const modalSb = document.getElementById("modalSupabaseKey");
        if (modalSb && modalSb.classList.contains("visible")) {
          modalSb.classList.remove("visible");
          return;
        }
        const kebabDropdown = document.getElementById("kebabDropdown");
        if (kebabDropdown && kebabDropdown.classList.contains("open")) {
          kebabDropdown.classList.remove("open");
          return;
        }
      }

      // 4. Slash / or Ctrl+K => Focus collection search input (when not actively typing in an input/textarea)
      if ((e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        const searchInput = document.getElementById("searchInput") || document.querySelector("input[name='search']");
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    window.addEventListener("storage", (e) => {
      if (e.key === STORE_KEY) {
        renderSidebarLists();
        handleRoute();
      }
    });

    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.openSupabaseModal = openSupabaseModal;
  window.openLivePreview = openLivePreview;
  window.getMergedList = getMergedList;
  window.COLLECTIONS = COLLECTIONS;
  window.State = State;
  window.SupabaseSyncEngine = SupabaseSyncEngine;
  window.handleRoute = handleRoute;
  window.renderActiveStructureBuilder = renderActiveStructureBuilder;
})();
