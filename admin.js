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
        { key: "id", label: "Mã đề thi (ID duy nhất / Code)", type: "text", required: true, help: "Ví dụ: trki_a1, trki_b1_de1" },
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

    VOCABULARIES: {
      slug: "VOCABULARIES",
      group: "study",
      label: "Kho 5000+ Từ vựng",
      singular: "Từ vựng",
      icon: "book-open",
      webUrl: "vocabulary.html",
      source: () => (window.VOCABULARIES || window.VOCABULARIES_DATA || []),
      desc: "Kho từ vựng tiếng Nga toàn diện có trọng âm, từ loại, phiên âm IPA, giải nghĩa và bảng chia từ.",
      createDefault: () => ({
        id: "voc_" + Date.now().toString().slice(-6),
        word_with_stress: "студе́нт",
        word_normalized: "студент",
        pos: "noun",
        meaning_vi: "sinh viên nam",
        meaning_ru: "учащийся вуза",
        level: "A1",
        gender: "m",
        transcription: "stʊˈdʲent",
        notes: "Danh từ đực, biến đổi đuôi phụ âm cứng.",
        audio_url: "",
        publication_status: "published"
      }),
      fields: [
        { key: "id", label: "Mã từ vựng / UUID", type: "text", required: true, help: "UUID hoặc mã định danh duy nhất" },
        { key: "word_with_stress", label: "Từ tiếng Nga (Có trọng âm)", type: "text", required: true, help: "Ví dụ: студе́нт, кни́га, изуча́ть" },
        { key: "meaning_vi", label: "Nghĩa tiếng Việt", type: "text", required: true },
        {
          key: "pos",
          label: "Từ loại (Part of Speech)",
          type: "select",
          options: [
            { v: "noun", l: "Danh từ (существительное)" },
            { v: "verb", l: "Động từ (глагол)" },
            { v: "adj", l: "Tính từ (прилагательное)" },
            { v: "adv", l: "Phó từ (наречие)" },
            { v: "prep", l: "Giới từ (предлог)" },
            { v: "conj", l: "Liên từ (союз)" },
            { v: "pronoun", l: "Đại từ (местоимение)" },
            { v: "particle", l: "Trợ từ (частица)" }
          ],
          defaultValue: "noun"
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
            { v: "m", l: "Giống đực (мужской род — он)" },
            { v: "f", l: "Giống cái (женский род — она)" },
            { v: "n", l: "Giống trung (средний род — оно)" }
          ]
        },
        {
          key: "aspect",
          label: "Thể (Dành cho động từ)",
          type: "select",
          options: [
            { v: "", l: "Không áp dụng" },
            { v: "impf", l: "Chưa hoàn thành thể (НСВ)" },
            { v: "pf", l: "Hoàn thành thể (СВ)" }
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
      createDefault: () => ({
        id: "jar_" + Date.now().toString().slice(-4),
        name: "Lọ từ vựng mới",
        level: "A1",
        levelName: "Sơ cấp A1",
        color: "#102a4c",
        desc: "Từ vựng sinh hoạt và giao tiếp sống còn.",
        icon: "archive-jar",
        is_pro_only: false,
        publication_status: "published",
        words: [
          { ru: "сло́во", vi: "từ ngữ", note: "сущ. ср. (оно)", ex: "Русское слово." },
          { ru: "кни́га", vi: "quyển sách", note: "сущ. ж. (она)", ex: "Я читаю интересную книгу." }
        ]
      }),
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

    JAR_ITEMS: {
      slug: "JAR_ITEMS",
      group: "system",
      label: "Liên kết Từ - Lọ",
      singular: "Mục gán lọ",
      icon: "archive-jar",
      webUrl: "vocabulary.html",
      source: () => (window.JAR_ITEMS || []),
      desc: "Bảng gán liên kết giữa kho từ vựng và từng lọ từ vựng theo thứ tự hiển thị.",
      createDefault: () => ({
        id: "ji_" + Date.now().toString().slice(-6),
        jar_id: "",
        vocab_id: "",
        position: 0
      }),
      fields: [
        { key: "id", label: "ID liên kết", type: "text", required: true },
        { key: "jar_id", label: "UUID Lọ từ vựng (jar_id)", type: "text", required: true, help: "UUID của lọ trong bảng vocab_jars" },
        { key: "vocab_id", label: "UUID Từ vựng (vocab_id)", type: "text", required: true, help: "UUID của từ trong bảng vocabularies" },
        { key: "position", label: "Thứ tự sắp xếp trong lọ (Position)", type: "number", defaultValue: 0 }
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
        return Object.keys(raw).map((k) => ({
          id: k,
          title: raw[k].title || raw[k].name || ("Bài học: " + k),
          level: raw[k].level || "A1",
          intro: raw[k].intro || "",
          content: raw[k].content_md || raw[k].content || raw[k].content_markdown || "",
          content_md: raw[k].content_md || raw[k].content || raw[k].content_markdown || "",
          content_markdown: raw[k].content_md || raw[k].content || raw[k].content_markdown || "",
          audioUrl: raw[k].audioUrl || raw[k].audio_url || "",
          culturalTip: raw[k].cultural_tip || raw[k].culturalTip || "",
          dialogues: Array.isArray(raw[k].dialogues) ? raw[k].dialogues : [],
          grammar: raw[k].grammar || { title: "", rule: "", examples: [] },
          grammarNotes: Array.isArray(raw[k].grammarNotes) ? raw[k].grammarNotes : (Array.isArray(raw[k].grammar_notes) ? raw[k].grammar_notes : []),
          vocabTable: Array.isArray(raw[k].vocabTable) ? raw[k].vocabTable : []
        }));
      },
      createDefault: () => ({
        id: "chu_de_moi_" + Date.now().toString().slice(-4),
        title: "Bài học chủ đề mới",
        level: "A1",
        intro: "Giới thiệu bối cảnh thực tế đời sống sinh viên và giao tiếp tại Nga...",
        culturalTip: "Tại Nga, khi bước vào căn hộ hoặc ký túc xá, bạn luôn cần cởi giày ngoài hành lang (Прихожая) và mang dép đi trong nhà (Тапочки).",
        audioUrl: "",
        content_md: `# Bài học: Giao tiếp & Đời sống thực tế tại Nga

## I. Bối cảnh & Tình huống giao tiếp
Chủ đề này giúp bạn làm quen và tự tin xử lý các tình huống giao tiếp thường nhật khi sinh sống và du học tại Liên bang Nga.

> [!NOTE]
> Hãy chú ý trọng âm của từ vựng tiếng Nga. Trọng âm chuẩn xác giúp người bản xứ hiểu ngay ý bạn muốn diễn đạt.

## II. Hội thoại mẫu điển hình
- **Анна**: Привет! Как твои дела? *(Chào bạn! Bạn khỏe không?)*
- **Максим**: Всё отлично, спасибо! А у тебя? *(Mọi thứ đều tuyệt, cảm ơn bạn! Còn bạn thì sao?)*

## III. Bảng từ vựng cốt lõi
| Từ tiếng Nga | Loại từ | Nghĩa tiếng Việt | Câu ví dụ |
| --- | --- | --- | --- |
| **студе́нт** | сущ. м. | sinh viên nam | Он русский студент. |
| **кни́га** | сущ. ж. | quyển sách | Я читаю интересную книгу. |
| **изуча́ть** | глаг. | học tập, nghiên cứu | Мы изучаем русский язык в университете. |

> [!TIP]
> Sử dụng các cụm từ trong ngoặc kép «...» để ghi nhớ các cụm thành ngữ hoặc quán ngữ phổ biến!
`
      }),
      fields: [
        { key: "id", label: "Mã chủ đề (khớp với ID Lọ từ vựng)", type: "text", required: true, help: "Ví dụ: bo_phan_co_the, jar_auchan, jar_chemodan..." },
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
        { key: "intro", label: "Đoạn văn bối cảnh giới thiệu tóm tắt", type: "textarea", rows: 3 },
        { key: "culturalTip", label: "Mẹo văn hóa & Giao tiếp thực tế tại Nga (Cultural Tip)", type: "textarea", rows: 2, help: "Lưu ý văn hóa và thói quen bản xứ khi giao tiếp trong ngữ cảnh này." },
        { key: "audioUrl", label: "URL File âm thanh (tùy chọn)", type: "text", placeholder: "https://..." },
        { key: "content_md", label: "Nội dung bài học chuyên sâu (.md Markdown)", type: "markdown", required: true, help: "Hỗ trợ tiêu đề (#, ##), danh sách, bảng biểu, trích dẫn (>), code block và callout (> [!TIP])." }
      ]
    },

    GRAMMAR_LESSONS: {
      slug: "GRAMMAR_LESSONS",
      group: "study",
      label: "Ngữ pháp chuyên sâu",
      singular: "Bài ngữ pháp",
      icon: "sparkles-clean",
      webUrl: "vocabulary.html",
      desc: "Tổng hợp các bài học ngữ pháp chuyên sâu: Các Cách (Падежи), Thể động từ, Giới từ và bảng chia mẫu.",
      source: () => (window.GRAMMAR_LESSONS || []),
      createDefault: () => ({
        id: "grammar_" + Date.now().toString().slice(-4),
        title: "Bài ngữ pháp mới",
        vi: "Ý nghĩa và cách dùng trong giao tiếp",
        level: "A1",
        topic: "Danh từ & 6 Cách",
        summary: "Quy tắc ngữ pháp cốt lõi và lưu ý trọng âm khi biến đổi từ.",
        publication_status: "published",
        content_md: `# Bài học Ngữ pháp: Cách dùng và Quy tắc

## 1. Bản chất và Ý nghĩa ngữ pháp
Quy tắc ngữ pháp này giúp bạn biểu đạt chính xác hành động và tân ngữ trong câu tiếng Nga.

## 2. Bảng biến đổi đuôi từ mẫu
| Dạng nguyên mẫu | Biến đổi | Ví dụ trong câu |
| --- | --- | --- |
| **студент** (đực) | **студента** | Я вижу студента. |
| **книга** (nữ) | **книгу** | Мы читаем книгу. |
| **письмо** (trung) | **письмо** | Он пишет письмо. |

> [!TIP]
> Luôn chú ý quy tắc chính tả sau các phụ âm đặc biệt (ж, ш, ч, щ, ц, г, к, х)!
`,
        rules: [
          "Quy tắc 1: Cách dùng cơ bản trong câu.",
          "Quy tắc 2: Quy tắc biến đổi đuôi từ."
        ],
        table: {
          head: ["Nguyên mẫu", "Dạng biến đổi", "Ví dụ"],
          rows: [
            ["книга (nữ)", "книгу", "Я читаю книгу."]
          ]
        },
        quickQuiz: [
          {
            q: "Chọn dạng đúng của từ...",
            options: ["книга", "книгу", "книге", "книгой"],
            a: 1,
            explain: "Tân ngữ trực tiếp dùng cách 4: đuôi -а đổi thành -у."
          }
        ]
      }),
      fields: [
        { key: "id", label: "Mã bài học (ID / Code)", type: "text", required: true, help: "Ví dụ: accusative, genitive, verb_aspect..." },
        { key: "title", label: "Tiêu đề tiếng Nga", type: "text", required: true },
        { key: "vi", label: "Ý nghĩa & diễn giải tiếng Việt", type: "text", required: true },
        {
          key: "level",
          label: "Trình độ CEFR",
          type: "select",
          options: [
            { v: "A1", l: "A1 (Sơ cấp)" },
            { v: "A2", l: "A2 (Cơ bản)" },
            { v: "B1", l: "B1 (Trung cấp 1)" },
            { v: "B2", l: "B2 (Trung cấp 2)" }
          ],
          defaultValue: "A1"
        },
        { key: "topic", label: "Chủ đề liên quan", type: "text", defaultValue: "Danh từ & 6 Cách" },
        { key: "summary", label: "Tóm tắt quy tắc cốt lõi", type: "textarea", rows: 2 },
        { key: "content_md", label: "Nội dung phân tích chuyên sâu (.md Markdown)", type: "markdown", help: "Giải thích chi tiết, bảng chia mẫu và mẹo dùng trong giao tiếp." },
        {
          key: "publication_status",
          label: "Trạng thái",
          type: "select",
          options: [
            { v: "published", l: "Công khai (Published)" },
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
      createDefault: () => ({
        id: "topic-lis-" + Date.now().toString().slice(-4),
        code: "topic-lis-" + Date.now().toString().slice(-4),
        title: "Chủ đề nghe mới",
        level: "A1",
        category: "airport",
        description: "Mô tả ngữ cảnh giao tiếp và tình huống đối thoại thực tế",
        icon: "headphones",
        sort_order: 10,
        is_pro_only: false
      }),
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
      createDefault: () => ({
        id: "lis_" + Date.now().toString().slice(-4),
        code: "lis_" + Date.now().toString().slice(-4),
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
      }),
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
      createDefault: () => ({
        id: "YT_SPEAKING_" + Date.now().toString(36).slice(-6),
        code: "YT_SPEAKING_" + Date.now().toString(36).slice(-6),
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
      }),
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
      createDefault: () => ({
        id: "wtk_" + Date.now().toString().slice(-4),
        code: "wtk_" + Date.now().toString().slice(-4),
        topic_id: "",
        title: "Bài luyện viết mới",
        level: "A1",
        level_name: "Sơ cấp A1",
        task_type: "picture_desc",
        category: "daily",
        image_url: "",
        prompt: "Посмотрите на фотографию и подробно опишите, что вы видите.",
        model_answer: "Вот семья. Утrom они завтракают на кухне...",
        min_words: 30,
        tips: ["Sử dụng cách 1 cho chủ ngữ", "Dùng cách 6 chỉ nơi chốn: в/на + giới cách"],
        ai_prompt: "Hãy đóng vai giám khảo TRKI chấm điểm bài viết tiếng Nga của học viên theo 4 tiêu chí TRKI...",
        suggested_words: ["семья", "завтракать", "кухня", "утром"],
        sort_order: 1,
        is_pro_only: false,
        publication_status: "published"
      }),
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
      createDefault: () => ({
        id: "topic_pic_" + Date.now().toString().slice(-4),
        code: "topic_pic_" + Date.now().toString().slice(-4),
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
      }),
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

    VOCAB_LESSONS: {
      slug: "VOCAB_LESSONS",
      group: "study",
      label: "Video «Хочу в Россию»",
      singular: "Tập phim",
      icon: "film",
      webUrl: "vocabulary.html",
      source: () => (window.VOCAB_LESSONS || []),
      desc: "Series video hoạt hình tình huống đời sống sinh viên du học tại Nga.",
      createDefault: () => ({
        id: "ep_" + Date.now().toString().slice(-4),
        type: "series",
        level: "A1",
        ep: 1,
        ru: "Новый день в Москве",
        vi: "Ngày mới ở Moskva",
        scene: "building-2",
        story: "Anya thức dậy tại ký túc xá và bắt đầu một ngày mới tại thủ đô.",
        video_url: "",
        publication_status: "published",
        is_pro_only: false,
        words: [
          { ru: "утро", vi: "buổi sáng", note: "danh từ trung" },
          { ru: "завтрак", vi: "bữa sáng", note: "danh từ đực" }
        ]
      }),
      fields: [
        { key: "id", label: "ID bài học / Code", type: "text", required: true },
        {
          key: "type",
          label: "Loại bài",
          type: "select",
          options: [{ v: "series", l: "Series theo tập" }, { v: "topic", l: "Chủ đề tự do" }],
          defaultValue: "series"
        },
        { key: "ep", label: "Số tập (Episode)", type: "number", defaultValue: 1 },
        { key: "ru", label: "Tiêu đề tiếng Nga", type: "text", required: true },
        { key: "vi", label: "Tiêu đề tiếng Việt", type: "text", required: true },
        { key: "story", label: "Cốt truyện / Bối cảnh", type: "textarea", rows: 3 },
        { key: "video_url", label: "URL Video (YouTube / MP4 / Cloudflare Stream)", type: "text" },
        { key: "scene", label: "Mã Icon Cảnh Phim", type: "text", defaultValue: "film" },
        {
          key: "is_pro_only",
          label: "Quyền truy cập",
          type: "select",
          options: [
            { v: "false", l: "Miễn phí (Free)" },
            { v: "true", l: "Khóa VIP (Chỉ dành cho PRO)" }
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

    // --- 2. BÀI NỘP & TIẾN ĐỘ (Submissions & Student Progress) ---
    WRITING_SUBMISSIONS: {
      slug: "WRITING_SUBMISSIONS",
      group: "submissions",
      label: "Bài nộp Luyện viết",
      singular: "Bài nộp viết",
      icon: "file-check",
      webUrl: "writing.html",
      source: () => (window.WRITING_SUBMISSIONS || []),
      desc: "Quản lý bài làm viết học viên nộp lên hệ thống, chấm điểm và phản hồi từ giáo viên & AI.",
      createDefault: () => ({
        id: "sub_" + Date.now().toString().slice(-6),
        user_id: "",
        task_id: "",
        student_text: "Меня зовут Антон. Я изучаю русский язык...",
        word_count: 50,
        overall_score: 85,
        status: "submitted",
        teacher_notes: "",
        submitted_at: new Date().toISOString()
      }),
      fields: [
        { key: "id", label: "ID Bài nộp (UUID)", type: "text", required: true },
        { key: "user_id", label: "UUID Học viên (user_id)", type: "text", required: true },
        { key: "task_id", label: "UUID Đề bài viết (task_id)", type: "text", required: true },
        { key: "student_text", label: "Bài viết của học viên", type: "textarea", required: true, rows: 5 },
        { key: "word_count", label: "Số từ thực tế (Word Count)", type: "number", defaultValue: 40 },
        { key: "overall_score", label: "Điểm chấm (Thang điểm 100)", type: "number" },
        {
          key: "status",
          label: "Trạng thái chấm",
          type: "select",
          options: [
            { v: "submitted", l: "Mới nộp (Chờ chấm)" },
            { v: "grading", l: "Đang chấm bài" },
            { v: "graded", l: "Đã hoàn thành chấm" }
          ],
          defaultValue: "submitted"
        },
        { key: "teacher_notes", label: "Nhận xét & Lời khuyên của Giáo viên", type: "textarea", rows: 3 },
        { key: "submitted_at", label: "Thời gian nộp bài", type: "text" }
      ]
    },

    TRKI_SUBMISSIONS: {
      slug: "TRKI_SUBMISSIONS",
      group: "submissions",
      label: "Kết quả thi TRKI",
      singular: "Kết quả thi",
      icon: "award",
      webUrl: "mock-test.html",
      source: () => (window.TRKI_SUBMISSIONS || []),
      desc: "Lịch sử và kết quả làm bài thi thử TRKI của từng học viên trên toàn hệ thống.",
      createDefault: () => ({
        id: "exam_sub_" + Date.now().toString().slice(-6),
        user_id: "",
        exam_id: "trki_a1",
        score_percent: 75,
        passed: true,
        time_spent_sec: 2400,
        submitted_at: new Date().toISOString()
      }),
      fields: [
        { key: "id", label: "ID Bài thi (UUID)", type: "text", required: true },
        { key: "user_id", label: "UUID Học viên (user_id)", type: "text", required: true },
        { key: "exam_id", label: "Mã đề thi TRKI (exam_id)", type: "text", required: true },
        { key: "score_percent", label: "Tỷ lệ điểm đạt được (%)", type: "number", required: true, defaultValue: 70 },
        {
          key: "passed",
          label: "Kết quả đạt chuẩn",
          type: "select",
          options: [
            { v: "true", l: "ĐẠT (Pass)" },
            { v: "false", l: "CHƯA ĐẠT (Fail)" }
          ],
          defaultValue: "true"
        },
        { key: "time_spent_sec", label: "Thời gian làm bài (giây)", type: "number", defaultValue: 2400 },
        { key: "submitted_at", label: "Thời gian hoàn thành", type: "text" }
      ]
    },

    USER_PROGRESS: {
      slug: "USER_PROGRESS",
      group: "submissions",
      label: "Tiến độ học viên (Progress)",
      singular: "Tiến độ",
      icon: "trending-up",
      webUrl: "index.html",
      source: () => (window.USER_PROGRESS || []),
      desc: "Thống kê tổng điểm kinh nghiệm XP, chuỗi ngày học (Streak) và trạng thái các kỹ năng.",
      createDefault: () => ({
        user_id: "usr_" + Date.now().toString().slice(-6),
        xp_total: 100,
        streak_count: 1,
        last_study_date: new Date().toISOString().slice(0, 10)
      }),
      fields: [
        { key: "user_id", label: "UUID Học viên (Khóa chính user_id)", type: "text", required: true },
        { key: "xp_total", label: "Tổng điểm kinh nghiệm (XP)", type: "number", required: true, defaultValue: 0 },
        { key: "streak_count", label: "Chuỗi ngày học liên tục (Streak)", type: "number", required: true, defaultValue: 0 },
        { key: "last_study_date", label: "Ngày học gần nhất (YYYY-MM-DD)", type: "text" }
      ]
    },

    USER_VOCAB_PROGRESS: {
      slug: "USER_VOCAB_PROGRESS",
      group: "submissions",
      label: "Tiến độ thẻ từ SM-2",
      singular: "Thẻ nhớ SM-2",
      icon: "repeat",
      webUrl: "vocabulary.html",
      source: () => (window.USER_VOCAB_PROGRESS || []),
      desc: "Dữ liệu thuật toán lặp lại ngắt quãng SuperMemo-2 (SM-2) theo từng từ vựng của học viên.",
      createDefault: () => ({
        id: "sm2_" + Date.now().toString().slice(-6),
        user_id: "",
        vocab_id: "",
        direction: 1,
        interval_days: 1,
        ease_factor: 2.5,
        review_count: 0,
        lapse_count: 0,
        next_review_at: new Date().toISOString()
      }),
      fields: [
        { key: "id", label: "ID Bản ghi tiến độ", type: "text", required: true },
        { key: "user_id", label: "UUID Học viên (user_id)", type: "text", required: true },
        { key: "vocab_id", label: "UUID Từ vựng (vocab_id)", type: "text", required: true },
        { key: "interval_days", label: "Khoảng cách ôn tập tiếp theo (ngày)", type: "number", defaultValue: 1 },
        { key: "ease_factor", label: "Hệ số dễ (Ease Factor, mặc định 2.5)", type: "number", defaultValue: 2.5 },
        { key: "review_count", label: "Số lần đã ôn tập (Review Count)", type: "number", defaultValue: 0 },
        { key: "lapse_count", label: "Số lần quên (Lapse Count)", type: "number", defaultValue: 0 },
        { key: "next_review_at", label: "Lịch ôn tập tiếp theo", type: "text" }
      ]
    },

    // --- 3. KINH DOANH & DỊCH VỤ (Commerce & Editorial) ---
    SHOP_PRODUCTS: {
      slug: "SHOP_PRODUCTS",
      group: "commerce",
      label: "Sản phẩm Shop Nga",
      singular: "Sản phẩm",
      icon: "shopping-bag-shop",
      webUrl: "shop.html",
      source: () => (window.SHOP_PRODUCTS || []),
      desc: "Sản phẩm bánh kẹo Alenka, mỹ phẩm Siberia và các gói dịch vụ Du học Nga.",
      createDefault: () => ({
        id: "prod_" + Date.now().toString().slice(-4),
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
      }),
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
      createDefault: () => ({
        id: "ORD-" + Date.now().toString().slice(-6),
        order_code: "ORD-" + Date.now().toString().slice(-6),
        userEmail: "",
        packageId: "pro_6m",
        packageName: "Gói Luyện Thi 6 Tháng",
        amount: 299000,
        paymentMethod: "VietQR",
        status: "pending",
        createdAt: new Date().toISOString()
      }),
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
      createDefault: () => ({
        slug: "bai-viet-moi-" + Date.now().toString().slice(-4),
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
      }),
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
        id: "usr_" + Date.now().toString().slice(-4),
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
      if (key && !deletedSet.has(key)) {
        map.set(key, { ...it, __source: "original" });
      }
    });

    admin.forEach((it) => {
      const clone = { ...it };
      delete clone.__admin;
      const key = clone.id || clone.slug || clone.title;
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
        State.currentDraft = col.createDefault ? col.createDefault() : { id: "item_" + Date.now().toString().slice(-4), title: "Mục mới" };
      } else {
        const item = getMergedList(State.currentSlug).find((it) => (it.id || it.slug || it.title) === State.currentDocId);
        State.currentDraft = item ? JSON.parse(JSON.stringify(stripSource(item))) : (col.createDefault ? col.createDefault() : {});
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

  function renderSidebarLists() {
    const listStudy = document.getElementById("navListStudy");
    const listSubmissions = document.getElementById("navListSubmissions");
    const listCommerce = document.getElementById("navListCommerce");

    if (listStudy) listStudy.innerHTML = "";
    if (listSubmissions) listSubmissions.innerHTML = "";
    if (listCommerce) listCommerce.innerHTML = "";

    const countStudy = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "study").length;
    const countCommerce = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "commerce").length;
    const countSubmissions = COLLECTION_KEYS.filter((k) => COLLECTIONS[k].group === "submissions").length;
    const bStudy = document.getElementById("badgeCountStudy");
    const bCommerce = document.getElementById("badgeCountCommerce");
    const bSubmissions = document.getElementById("badgeCountSubmissions");
    if (bStudy) bStudy.textContent = countStudy;
    if (bCommerce) bCommerce.textContent = countCommerce;
    if (bSubmissions) bSubmissions.textContent = countSubmissions;

    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      if (col.group === "system") return;

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

      const listSubmissions = document.getElementById("navListSubmissions");
      if (col.group === "study" && listStudy) listStudy.appendChild(li);
      else if (col.group === "commerce" && listCommerce) listCommerce.appendChild(li);
      else if (col.group === "submissions" && listSubmissions) listSubmissions.appendChild(li);
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
      const tablePill = mapping ? `<span class="p-pill p-pill-success" style="font-size:11px;padding:3px 8px;display:inline-flex;align-items:center;gap:4px" title="Bảng đích trên Supabase">${window.RusiIcons ? RusiIcons.get("database-tests", { size: 12 }) : ""} ${mapping.table}</span>` : "";
      primaryBtn = `<button class="p-btn p-btn-primary p-btn-sm" id="btnSaveDoc" type="button" title="Lưu và tiếp tục chỉnh sửa (Ctrl+S)">${window.RusiIcons ? RusiIcons.get("save", { size: 14 }) : ""} Lưu thay đổi</button>`;
      secondaryBtn = `${tablePill}<button class="p-btn p-btn-secondary p-btn-sm" id="btnSaveAndClose" type="button" title="Lưu và quay lại danh sách">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Lưu &amp; Đóng</button><button class="p-btn p-btn-secondary p-btn-sm" id="btnOpenPreviewDrawer" type="button" title="Xem trước bài viết (Ctrl+P)">${window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : ""} Live Preview</button>`;
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
    if (btnPreview) btnPreview.onclick = openLivePreview;

    const btnSave = document.getElementById("btnSaveDoc");
    if (btnSave) btnSave.onclick = () => window.saveDocument(true);

    const btnSaveClose = document.getElementById("btnSaveAndClose");
    if (btnSaveClose) btnSaveClose.onclick = () => window.saveDocument(false);

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
    COLLECTION_KEYS.forEach((k) => totalDocs += getMergedList(k).length);

    const isSbConfigured = window.isSupabaseConfigured && window.isSupabaseConfigured();

    let collectionsHtml = "";
    COLLECTION_KEYS.forEach((key) => {
      const col = COLLECTIONS[key];
      const items = getMergedList(key);
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
        } else if (slug === "PACKAGES") {
          const pVnd = it.price_vnd || it.price;
          subText = `${pVnd ? Number(pVnd).toLocaleString("vi-VN") + " đ" : "Liên hệ"} • ${it.duration_days ? it.duration_days + " ngày" : "Trọn đời"} • ${(it.features || []).length} quyền lợi`;
        } else if (slug === "WRITING_SUBMISSIONS") {
          const uId = it.user_id ? String(it.user_id).slice(0, 8) + "..." : "Ẩn danh";
          subText = `Học viên: ${uId} • Số từ: ${it.word_count || 0} • Điểm: ${it.overall_score != null ? it.overall_score + "/100" : "Chờ chấm"}`;
        } else if (slug === "TRKI_SUBMISSIONS") {
          const uId = it.user_id ? String(it.user_id).slice(0, 8) + "..." : "Ẩn danh";
          subText = `Học viên: ${uId} • Điểm: ${it.score_percent}% • ${it.passed ? "ĐẠT" : "CHƯA ĐẠT"}`;
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
    if (!col || !State.currentDraft) return;

    const draft = State.currentDraft;

    // Crisp Notion 3.0 vector SVG icons
    const NOTION_ICONS = {
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
      zenExit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
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
        } else if (f.key === "jar_id" && slug === "JAR_ITEMS") {
          const jars = getMergedList("VOCAB_JARS");
          optsList = [
            { v: "", l: "-- Chọn Lọ từ vựng (Vocab Jar) --" },
            ...jars.map(j => ({
              v: j.id || j.code,
              code: j.code,
              l: `[${j.level || "A1"}] ${j.title || j.name || j.code}`
            }))
          ];
        }
        const opts = optsList.map((o) => {
          const isSelected = String(val) === String(o.v) || (o.code && String(val) === String(o.code));
          return `<option value="${escAttr(o.v)}" ${isSelected ? "selected" : ""}>${esc(o.l)}</option>`;
        }).join("");
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <select class="p-select live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}">${opts}</select>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "textarea") {
        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <textarea class="p-textarea live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" rows="4">${esc(val)}</textarea>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
        `;
      } else if (f.type === "list-lines") {
        const linesVal = Array.isArray(val) ? val.join("\n") : (val || "");
        formFieldsHtml += `
          <div class="p-form-group">
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
          <div class="p-form-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <label class="p-label" style="margin:0">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
              <div style="font-size:12px;color:var(--p-text-muted)">Định dạng: <strong>Markdown (.md) chuẩn Supabase (content_md)</strong></div>
            </div>
            <div class="p-md-editor-wrap" data-md-field="${escAttr(f.key)}">
              <!-- Notion-Inspired Modern Markdown Toolbar -->
              <div class="p-md-toolbar notion-toolbar">
                <div class="p-md-actions-row">
                  <!-- Notion Add Block Menu Button -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn notion-tb-primary-btn btn-notion-insert" title="Chèn khối Notion (Gõ / trong văn bản để mở)">
                      <span class="notion-tb-icon">${NOTION_ICONS.plus}</span>
                      <span>Chèn khối</span>
                      <span class="notion-tb-arrow">${NOTION_ICONS.chevron}</span>
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

                  <!-- Notion Turn Into Block Dropdown -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-turninto" title="Chuyển đổi kiểu dòng hiện tại (Turn into...)">
                      <span>${NOTION_ICONS.text}</span>
                      <span>Kiểu khối</span>
                      <span class="notion-tb-arrow">${NOTION_ICONS.chevron}</span>
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

                  <!-- Inline Typography (Notion Style) -->
                  <div class="p-md-group">
                    <button type="button" class="notion-tb-btn" data-action="bold" title="In đậm (Ctrl+B)">${NOTION_ICONS.bold}</button>
                    <button type="button" class="notion-tb-btn" data-action="italic" title="In nghiêng (Ctrl+I)">${NOTION_ICONS.italic}</button>
                    <button type="button" class="notion-tb-btn" data-action="strike" title="Gạch ngang (~~text~~)">${NOTION_ICONS.strike}</button>
                    <button type="button" class="notion-tb-btn" data-action="mark" title="Đánh dấu nổi bật (Highlight)">${NOTION_ICONS.highlight}</button>
                    <button type="button" class="notion-tb-btn" data-action="code-inline" title="Mã trong dòng (inline code)">${NOTION_ICONS.code}</button>
                    <button type="button" class="notion-tb-btn" data-action="link" title="Chèn liên kết (Ctrl+K)">${NOTION_ICONS.link}</button>
                  </div>

                  <span class="p-md-sep"></span>

                  <!-- Russian Accents Dropdown Palette -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-stress" title="Bảng ký tự trọng âm tiếng Nga (Ctrl+Shift+S)">
                      <span class="notion-ru-tb-icon">á</span>
                      <span>Trọng âm</span>
                      <span class="notion-tb-arrow">${NOTION_ICONS.chevron}</span>
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

                  <!-- Callouts Dropdown -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-callout" title="Chèn hộp ghi chú Callout">
                      ${NOTION_ICONS.callout}
                      <span>Callout</span>
                      <span class="notion-tb-arrow">${NOTION_ICONS.chevron}</span>
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

                  <!-- Tables Dropdown -->
                  <div class="notion-dropdown-wrap">
                    <button type="button" class="notion-tb-btn btn-notion-table" title="Chèn bảng dữ liệu hoặc từ vựng">
                      ${NOTION_ICONS.table}
                      <span>Bảng</span>
                      <span class="notion-tb-arrow">${NOTION_ICONS.chevron}</span>
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

                  <!-- Modes & Zen (Right-aligned) -->
                  <div class="notion-view-modes" style="margin-left:auto">
                    <button type="button" class="notion-view-btn" data-mode="edit" title="Chỉ hiện ô soạn thảo">${NOTION_ICONS.edit}<span>Soạn</span></button>
                    <button type="button" class="notion-view-btn active" data-mode="split" title="Chia đôi màn hình">${NOTION_ICONS.split}<span>Chia đôi</span></button>
                    <button type="button" class="notion-view-btn" data-mode="preview" title="Chỉ hiện bản xem trước">${NOTION_ICONS.preview}<span>Xem trước</span></button>
                    <span class="notion-view-sep"></span>
                    <button type="button" class="notion-zen-btn" data-action="zen" title="Toàn màn hình không xao nhãng (Esc)">${NOTION_ICONS.zen}</button>
                  </div>
                </div>
              </div>

              <!-- Panes with Synced Scrolling -->
              <div class="p-md-panes split-mode">
                <div class="p-md-editor-pane">
                  <textarea class="p-md-textarea live-draft-field live-markdown-input" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" placeholder="Soạn thảo nội dung bài viết bằng cú pháp Markdown...">${esc(mdVal)}</textarea>
                </div>
                <div class="p-md-preview-pane">
                  <div class="p-md-preview-header">
                    <span class="p-md-preview-title">BẢN XEM TRƯỚC</span>
                    <span class="notion-live-pill"><span class="notion-live-dot"></span> Trực tiếp</span>
                  </div>
                  <div class="rusi-md-rendered p-md-preview-body">
                    ${renderedMd}
                  </div>
                </div>
              </div>

              <!-- Status bar -->
              <div class="p-md-statusbar">
                <div class="p-md-counters">
                  <span><b class="md-word-count">${wordCountVal}</b> từ</span>
                  <span class="md-counter-sep">·</span>
                  <span><b class="md-char-count">${String(mdVal).length}</b> ký tự</span>
                  <span class="md-counter-sep">·</span>
                  <span><b class="md-line-count">${lineCountVal}</b> dòng</span>
                  <span class="md-counter-sep">·</span>
                  <span class="md-read-time">~${readTimeVal} phút đọc</span>
                </div>
                <div class="p-md-statusbar-hints">
                  <span>Gõ <code>/</code> chèn khối</span>
                  <span class="md-counter-sep">·</span>
                  <span><code>Ctrl+Shift+S</code> trọng âm</span>
                  <span class="md-counter-sep">·</span>
                  <span>Markdown Supabase</span>
                </div>
              </div>
            </div>
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
          </div>
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

        formFieldsHtml += `
          <div class="p-form-group">
            <label class="p-label">${esc(f.label)} ${f.required ? '<span class="p-label-req">*</span>' : ""}</label>
            <input type="${f.type === "number" ? "number" : "text"}" class="p-input live-draft-field" name="${escAttr(f.key)}" data-key="${escAttr(f.key)}" value="${escAttr(val)}" ${isIdDisabled ? "readonly style='background:var(--p-surface-hover);cursor:not-allowed'" : ""} />
            ${f.help ? `<div class="p-help">${esc(f.help)}</div>` : ""}
            ${mediaPreview}
          </div>
        `;
      }
    });

    if (slug === "TOPIC_ARTICLES" && State.activeEditorTab === "structure") {
      State.activeEditorTab = "content";
    }

    const structureHtml = slug !== "TOPIC_ARTICLES" ? renderActiveStructureBuilder(slug, draft) : "";
    const jsonString = JSON.stringify(draft, null, 2);

    container.innerHTML = `
      <div class="payload-doc-editor">
        <!-- Main Content Area -->
        <div class="payload-doc-main">
          <!-- Editor Tabs -->
          <div class="payload-editor-tabs">
            <button class="payload-editor-tab ${State.activeEditorTab === "content" ? "active" : ""}" data-tab="content" type="button" onclick="window.switchEditorTab('content')">
              ${window.RusiIcons ? RusiIcons.get("file-text", { size: 14 }) : ""} Nội dung chính
            </button>
            ${slug !== "TOPIC_ARTICLES" ? `
            <button class="payload-editor-tab ${State.activeEditorTab === "structure" ? "active" : ""}" data-tab="structure" type="button" onclick="window.switchEditorTab('structure')">
              ${window.RusiIcons ? RusiIcons.get("flashcards-layers", { size: 14 }) : ""} ${
                slug === "TRKI_BANK" ? "5 Phân hệ thi TRKI &amp; Đáp án" :
                slug === "VOCAB_JARS" ? "Danh sách từ vựng trong lọ" :
                slug === "LISTENING_LESSONS" ? "Lời thoại chính tả &amp; Trắc nghiệm" :
                slug === "SPEAKING_SETS" ? "Danh sách câu luyện nói Shadowing" :
                slug === "GRAMMAR_LESSONS" ? "Quy tắc ngữ pháp &amp; Trắc nghiệm" :
                slug === "WRITING_TASKS" ? "Gợi ý, Từ vựng &amp; AI Rubric" :
                slug === "PACKAGES" ? "Danh sách quyền lợi gói" :
                slug === "SHOP_PRODUCTS" ? "Thông số &amp; Quyền lợi sách" :
                slug === "WRITING_SUBMISSIONS" ? "Chấm bài &amp; Nhận xét" :
                "Cấu trúc Array Builder"
              }
            </button>
            ` : ""}
            <button class="payload-editor-tab ${State.activeEditorTab === "json" ? "active" : ""}" data-tab="json" type="button" onclick="window.switchEditorTab('json')">
              ${window.RusiIcons ? RusiIcons.get("keyboard-cyrillic", { size: 14 }) : ""} JSON / Mã nguồn
            </button>
          </div>

          <!-- Tab 1: Content Fields -->
          <div id="tabContent" style="display:${State.activeEditorTab === "content" ? "block" : "none"}">
            <form id="docForm">
              ${formFieldsHtml}
            </form>
          </div>

          <!-- Tab 2: Structure / Array Builder (khi không phải TOPIC_ARTICLES) -->
          ${slug !== "TOPIC_ARTICLES" ? `
          <div id="tabStructure" style="display:${State.activeEditorTab === "structure" ? "block" : "none"}">
            ${structureHtml}
          </div>
          ` : ""}

          <!-- Tab 3: JSON / Code Editor -->
          <div id="tabJson" style="display:${State.activeEditorTab === "json" ? "block" : "none"}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:12.5px;color:var(--p-text-muted)">Chỉnh sửa JSON trực tiếp với kiểm tra cú pháp thời gian thực:</span>
              <button class="p-btn p-btn-secondary p-btn-sm" type="button" onclick="window.formatJsonEditor()">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Format JSON</button>
            </div>
            <textarea class="payload-code-editor" id="jsonEditorArea">${esc(jsonString)}</textarea>
          </div>
        </div>

        <!-- Single Clean Sidebar Focused on CRUD -->
        <div class="payload-doc-sidebar">
          <div class="payload-doc-card">
            <div class="payload-doc-card-title">
              <span>Hành động &amp; Xuất bản</span>
              ${State.isCreating ? '<span class="p-pill p-pill-warning">Mới</span>' : '<span class="p-pill p-pill-info">Đang sửa</span>'}
            </div>

            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
              <button class="p-btn p-btn-primary" id="btnSidebarSave" type="button" onclick="window.saveDocument(true)" style="width:100%;padding:10px 14px;font-size:13.5px">
                ${window.RusiIcons ? RusiIcons.get("save", { size: 15 }) : ""} Lưu thay đổi (Ctrl+S)
              </button>
              <button class="p-btn p-btn-secondary" id="btnSidebarSaveClose" type="button" onclick="window.saveDocument(false)" style="width:100%;padding:8px 12px;font-size:13px">
                ${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Lưu &amp; Đóng
              </button>
              <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.openLivePreview()" style="width:100%;color:var(--p-primary);margin-top:2px">
                ${window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : ""} Xem trước (Live Preview)
              </button>
            </div>

            <div class="p-meta-summary">
              <div class="p-meta-row">
                <span>Mã ID:</span>
                <code>${esc(draft.id || draft.slug || draft.title || "(Chưa đặt)")}</code>
              </div>
              <div class="p-meta-row">
                <span>Phân hệ:</span>
                <span style="font-weight:600;color:var(--p-text)">${esc(col.label)}</span>
              </div>
              <div class="p-meta-row">
                <span>Cơ sở dữ liệu:</span>
                <span style="color:var(--p-success);font-weight:600">● Supabase Cloud</span>
              </div>
            </div>

            <div class="p-sidebar-divider"></div>

            <div style="display:flex;justify-content:space-between;align-items:center">
              <a class="p-btn p-btn-ghost p-btn-sm" href="#collection/${slug}">← Quay lại</a>
              ${!State.isCreating && State.currentDocId ? `
                <button class="p-btn p-btn-ghost p-btn-sm" type="button" onclick="window.deleteDocument('${escAttr(slug)}', '${escAttr(State.currentDocId)}')" style="color:var(--p-danger)">
                  ${window.RusiIcons ? RusiIcons.get("trash-2", { size: 14 }) : ""} Xóa tài liệu
                </button>
              ` : ""}
            </div>
          </div>
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
            const prefix = slug === "TRKI_BANK" ? "trki_" : slug === "VOCAB_JARS" ? "jar_" : (slug.toLowerCase() + "_");
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

    // Bind Modern Markdown editors with live preview, synced scrolling & formatting toolbar
    document.querySelectorAll(".p-md-editor-wrap").forEach((wrap) => {
      const fieldKey = wrap.dataset.mdField;
      const textarea = wrap.querySelector(".live-markdown-input");
      const previewBody = wrap.querySelector(".p-md-preview-body");
      const charCount = wrap.querySelector(".md-char-count");
      const wordCount = wrap.querySelector(".md-word-count");
      const lineCount = wrap.querySelector(".md-line-count");
      const readTime = wrap.querySelector(".md-read-time");
      const panes = wrap.querySelector(".p-md-panes");

      const updatePreview = () => {
        if (!textarea) return;
        const text = textarea.value;
        State.currentDraft[fieldKey] = text;
        // Tự động đồng bộ các trường content_md, content, content_markdown
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

        if (previewBody && window.RusiMarkdown && typeof window.RusiMarkdown.render === "function") {
          previewBody.innerHTML = window.RusiMarkdown.render(text);
        }
      };

      if (textarea) {
        textarea.addEventListener("input", updatePreview);

        // Cuộn đồng bộ giữa khung soạn thảo và bản xem trước
        let isSyncingEditor = false;
        let isSyncingPreview = false;

        textarea.addEventListener("scroll", () => {
          if (isSyncingEditor || !panes || !panes.classList.contains("split-mode") || !previewBody) return;
          isSyncingPreview = true;
          const maxScrollTop = textarea.scrollHeight - textarea.clientHeight;
          if (maxScrollTop > 0) {
            const scrollRatio = textarea.scrollTop / maxScrollTop;
            const previewMax = previewBody.scrollHeight - previewBody.clientHeight;
            previewBody.scrollTop = scrollRatio * previewMax;
          }
          requestAnimationFrame(() => { isSyncingPreview = false; });
        });

        if (previewBody) {
          previewBody.addEventListener("scroll", () => {
            if (isSyncingPreview || !panes || !panes.classList.contains("split-mode")) return;
            isSyncingEditor = true;
            const maxScrollTop = previewBody.scrollHeight - previewBody.clientHeight;
            if (maxScrollTop > 0) {
              const scrollRatio = previewBody.scrollTop / maxScrollTop;
              const editorMax = textarea.scrollHeight - textarea.clientHeight;
              textarea.scrollTop = scrollRatio * editorMax;
            }
            requestAnimationFrame(() => { isSyncingEditor = false; });
          });
        }

        // Phím tắt thông minh trong khung soạn thảo
        textarea.addEventListener("keydown", (e) => {
          // Tab / Shift+Tab thụt lề
          if (e.key === "Tab") {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const val = textarea.value;

            if (e.shiftKey) {
              const before = val.substring(0, start);
              if (before.endsWith("  ")) {
                textarea.value = val.substring(0, start - 2) + val.substring(start);
                textarea.setSelectionRange(start - 2, end - 2);
              }
            } else {
              textarea.value = val.substring(0, start) + "  " + val.substring(end);
              textarea.setSelectionRange(start + 2, start + 2);
            }
            updatePreview();
            return;
          }

          // Ctrl/Cmd + B => Bold
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
            e.preventDefault();
            insertSnippet("**", "**", "in đậm");
            return;
          }

          // Ctrl/Cmd + I => Italic
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
            e.preventDefault();
            insertSnippet("*", "*", "in nghiêng");
            return;
          }

          // Ctrl/Cmd + K => Link
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            insertSnippet("[", "](https://rusitrki.com)", "tiêu đề liên kết");
            return;
          }

          // Ctrl/Cmd + Shift + S => Trọng âm tiếng Nga
          if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s") {
            e.preventDefault();
            insertRussianChar("\u0301");
            return;
          }

          // Esc => Thoát chế độ toàn màn hình & đóng menu Notion
          if (e.key === "Escape") {
            hideAllNotionPopovers();
            if (wrap.classList.contains("fullscreen-mode")) {
              e.preventDefault();
              wrap.classList.remove("fullscreen-mode");
              const zenBtn = wrap.querySelector(".p-md-zen-btn");
              if (zenBtn) zenBtn.innerHTML = "⛶ Toàn màn hình";
            }
            return;
          }
        });
      }

      // Notion Popovers & Dropdowns
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
        if (!isShown) menu.style.display = "block";
      };

      if (btnInsert && blockMenu) {
        btnInsert.onclick = (e) => { e.stopPropagation(); toggleMenu(blockMenu); };
      }
      if (btnTurnInto && turnIntoMenu) {
        btnTurnInto.onclick = (e) => { e.stopPropagation(); toggleMenu(turnIntoMenu); };
      }
      if (btnStress && stressMenu) {
        btnStress.onclick = (e) => { e.stopPropagation(); toggleMenu(stressMenu); };
      }
      if (btnCallout && calloutMenu) {
        btnCallout.onclick = (e) => { e.stopPropagation(); toggleMenu(calloutMenu); };
      }
      if (btnTable && tableMenu) {
        btnTable.onclick = (e) => { e.stopPropagation(); toggleMenu(tableMenu); };
      }

      // Notion Slash Command (/) tracking
      let isSlashActive = false;
      let slashPos = -1;

      if (textarea) {
        textarea.addEventListener("input", () => {
          const val = textarea.value;
          const cursor = textarea.selectionStart;
          if (cursor > 0 && val[cursor - 1] === "/") {
            const charBefore = cursor >= 2 ? val[cursor - 2] : "\n";
            if (charBefore === "\n" || charBefore === " " || cursor === 1) {
              isSlashActive = true;
              slashPos = cursor - 1;
              if (blockMenu) {
                hideAllNotionPopovers();
                blockMenu.style.display = "block";
              }
              return;
            }
          }
          if (isSlashActive) {
            if (slashPos < 0 || val[slashPos] !== "/" || cursor < slashPos) {
              isSlashActive = false;
              slashPos = -1;
              hideAllNotionPopovers();
            }
          }
        });
      }

      const onDocClick = (e) => {
        if (!wrap.contains(e.target)) {
          hideAllNotionPopovers();
        }
      };
      document.addEventListener("click", onDocClick);

      // Notion "Turn Into..." logic
      const turnCurrentLineInto = (type) => {
        if (!textarea) return;
        const start = textarea.selectionStart;
        const val = textarea.value;
        const lineStart = val.lastIndexOf("\n", start - 1) + 1;
        let lineEnd = val.indexOf("\n", start);
        if (lineEnd === -1) lineEnd = val.length;

        const currentLine = val.substring(lineStart, lineEnd);
        const cleanLine = currentLine
          .replace(/^#{1,6}\s+/, "")
          .replace(/^>\s*(\[!.*\]\s*)?/, "")
          .replace(/^(\d+\.|[-*•]|\-\s*\[\s*\])\s+/, "")
          .trim();

        let newLine = cleanLine;
        if (type === "h1") newLine = "# " + cleanLine;
        else if (type === "h2") newLine = "## " + cleanLine;
        else if (type === "h3") newLine = "### " + cleanLine;
        else if (type === "ul") newLine = "- " + cleanLine;
        else if (type === "ol") newLine = "1. " + cleanLine;
        else if (type === "task") newLine = "- [ ] " + cleanLine;
        else if (type === "quote") newLine = "> " + cleanLine;
        else if (type === "tip") newLine = "> [!TIP]\n> " + cleanLine;
        else if (type === "note") newLine = "> [!NOTE]\n> " + cleanLine;
        else if (type === "p") newLine = cleanLine;

        textarea.value = val.substring(0, lineStart) + newLine + val.substring(lineEnd);
        const newPos = lineStart + newLine.length;
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
        updatePreview();
      };

      // Mode switch buttons (Soạn thảo, Chia đôi, Xem trước, Zen)
      wrap.querySelectorAll(".p-md-mode-btn[data-mode], .notion-view-btn[data-mode]").forEach((btn) => {
        btn.onclick = () => {
          wrap.querySelectorAll(".p-md-mode-btn[data-mode], .notion-view-btn[data-mode]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const mode = btn.dataset.mode;
          panes.classList.remove("split-mode", "edit-only", "preview-only");
          if (mode === "edit") panes.classList.add("edit-only");
          else if (mode === "preview") panes.classList.add("preview-only");
          else panes.classList.add("split-mode");
        };
      });

      // Chế độ toàn màn hình không xao nhãng (Zen Mode)
      const zenBtn = wrap.querySelector(".p-md-zen-btn, .notion-zen-btn");
      if (zenBtn) {
        zenBtn.onclick = () => {
          const isFs = wrap.classList.toggle("fullscreen-mode");
          zenBtn.innerHTML = isFs ? NOTION_ICONS.zenExit : NOTION_ICONS.zen;
          if (isFs) {
            toast("Đã bật Chế độ toàn màn hình (Nhấn Esc hoặc bấm nút để thoát).");
          }
        };
      }

      // Chèn ký tự / trọng âm tiếng Nga vào vị trí con trỏ
      const insertRussianChar = (charVal) => {
        if (!textarea) return;
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
        updatePreview();
      };

      wrap.querySelectorAll("[data-ru-char]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          insertRussianChar(btn.dataset.ruChar);
        };
      });

      // Insert markdown syntax helper
      const insertSnippet = (prefix, suffix, defaultTxt) => {
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = textarea.value;
        const selected = val.substring(start, end) || defaultTxt;
        const replacement = prefix + selected + suffix;
        textarea.value = val.substring(0, start) + replacement + val.substring(end);
        const newCursor = start + prefix.length + selected.length;
        textarea.setSelectionRange(newCursor, newCursor);
        textarea.focus();
        updatePreview();
      };

      // Xử lý action chung (Toolbar buttons & Notion Menu Items)
      const triggerAction = (act) => {
        if (act === "bold") insertSnippet("**", "**", "in đậm");
        else if (act === "italic") insertSnippet("*", "*", "in nghiêng");
        else if (act === "strike") insertSnippet("~~", "~~", "văn bản gạch ngang");
        else if (act === "mark") insertSnippet("<mark>", "</mark>", "văn bản nổi bật");
        else if (act === "code-inline") insertSnippet("`", "`", "mã nguồn");
        else if (act === "h1") insertSnippet("\n# ", "\n", "Tiêu đề chính bài viết");
        else if (act === "h2") insertSnippet("\n## ", "\n", "Tiêu đề phần");
        else if (act === "h3") insertSnippet("\n### ", "\n", "Tiêu đề mục con");
        else if (act === "ul") insertSnippet("\n- ", "\n", "Mục danh sách");
        else if (act === "ol") insertSnippet("\n1. ", "\n", "Bước thực hiện");
        else if (act === "task") insertSnippet("\n- [ ] ", "\n", "Mục công việc cần kiểm tra");
        else if (act === "quote") insertSnippet("\n> ", "\n", "Đoạn trích dẫn văn bản");
        else if (act === "tip") insertSnippet("\n> [!TIP]\n> ", "\n", "Ghi nhớ mẹo học tiếng Nga tại đây");
        else if (act === "note") insertSnippet("\n> [!NOTE]\n> ", "\n", "Ghi chú bối cảnh và giải thích thêm");
        else if (act === "important") insertSnippet("\n> [!IMPORTANT]\n> ", "\n", "Kiến thức trọng tâm bắt buộc ghi nhớ");
        else if (act === "warning") insertSnippet("\n> [!WARNING]\n> ", "\n", "Cảnh báo ngoại lệ và bẫy hay gặp trong đề thi");
        else if (act === "ru-quote") insertSnippet("«", "»", "cụm từ tiếng Nga");
        else if (act === "table") {
          const tbl = `\n| Cột 1 | Cột 2 | Cột 3 |\n| --- | --- | --- |\n| Dòng 1 | Nội dung A | Ví dụ minh họa |\n| Dòng 2 | Nội dung B | Ví dụ minh họa |\n`;
          insertSnippet(tbl, "", "");
        } else if (act === "table-vocab") {
          const vocabTbl = `\n| Từ tiếng Nga (Trọng âm) | Từ loại | Nghĩa tiếng Việt | Câu ví dụ song ngữ |\n| --- | --- | --- | --- |\n| **студе́нт** | сущ. м. | sinh viên nam | Он ру́сский студе́нт. |\n| **кни́га** | сущ. ж. | quyển sách | Я чита́ю интере́сную кни́гу. |\n| **изуча́ть** | глаг. | học tập, nghiên cứu | Мы изуча́ем ру́сский язы́к. |\n`;
          insertSnippet(vocabTbl, "", "");
        } else if (act === "code") insertSnippet("\n```\n", "\n```\n", "console.log('RUSI TRKI');");
        else if (act === "link") insertSnippet("[", "](https://rusitrki.com)", "Tiêu đề liên kết");
        else if (act === "img") insertSnippet("![", "](assets/red-square.jpg)", "Mô tả hình ảnh");
        else if (act === "audio") insertSnippet('\n<audio controls src="', '"></audio>\n', "assets/audio/lesson.mp3");
        else if (act === "hr") insertSnippet("\n---\n", "", "");
        else if (act === "template-article") {
          if (textarea.value.trim() && !confirm("Chèn mẫu bài học TRKI sẽ thêm bố cục chuẩn vào bài viết. Bạn có muốn tiếp tục?")) return;
          const template = `# Bài học: Giao tiếp & Đời sống thực tế tại Nga

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
          if (!textarea.value.trim()) {
            textarea.value = template;
          } else {
            textarea.value = textarea.value.trim() + "\n\n" + template;
          }
          textarea.focus();
          updatePreview();
          toast("Đã chèn mẫu bài học TRKI chuẩn 5 phần thành công!");
        }
      };

      const runActionWithSlashCleanup = (act) => {
        if (isSlashActive && slashPos >= 0 && textarea) {
          const val = textarea.value;
          if (val[slashPos] === "/") {
            textarea.value = val.substring(0, slashPos) + val.substring(slashPos + 1);
            textarea.setSelectionRange(slashPos, slashPos);
          }
        }
        isSlashActive = false;
        slashPos = -1;
        hideAllNotionPopovers();
        triggerAction(act);
      };

      // Xử lý các nút thanh công cụ
      wrap.querySelectorAll("[data-action]").forEach((btn) => {
        btn.onclick = () => {
          triggerAction(btn.dataset.action);
        };
      });

      // Xử lý các mục trong Notion Block Menu
      wrap.querySelectorAll("[data-notion-action]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          runActionWithSlashCleanup(btn.dataset.notionAction);
        };
      });

      // Xử lý các mục trong Notion Turn Into Menu
      wrap.querySelectorAll("[data-notion-turn]").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          hideAllNotionPopovers();
          turnCurrentLineInto(btn.dataset.notionTurn);
        };
      });
    });
  }

  window.switchEditorTab = function (tab) {
    State.activeEditorTab = tab;

    // Sync state before switching
    if (tab === "json") {
      const jsonArea = document.getElementById("jsonEditorArea");
      if (jsonArea) {
        jsonArea.value = JSON.stringify(State.currentDraft, null, 2);
      }
    } else if (tab === "structure") {
      const tabS = document.getElementById("tabStructure");
      if (tabS && State.currentSlug && State.currentDraft) {
        tabS.innerHTML = renderActiveStructureBuilder(State.currentSlug, State.currentDraft);
      }
    }

    const tabC = document.getElementById("tabContent");
    const tabS = document.getElementById("tabStructure");
    const tabJ = document.getElementById("tabJson");

    if (tabC) tabC.style.display = tab === "content" ? "block" : "none";
    if (tabS) tabS.style.display = tab === "structure" ? "block" : "none";
    if (tabJ) tabJ.style.display = tab === "json" ? "block" : "none";

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
    if (slug === "TRKI_BANK") {
      return renderTrkiPartsBuilder(draft.parts || [], draft);
    } else if (slug === "VOCAB_JARS" || slug === "VOCAB_LESSONS") {
      return renderVocabWordsBuilder(draft.words || []);
    } else if (slug === "GRAMMAR_LESSONS") {
      const rules = Array.isArray(draft.rules) ? draft.rules : [];
      const tableData = draft.table_data || draft.table || {};
      const questions = Array.isArray(draft.questions) ? draft.questions : (Array.isArray(draft.quickQuiz) ? draft.quickQuiz : []);
      return renderGrammarBuilder(rules, tableData, questions);
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
    } else if (slug === "WRITING_SUBMISSIONS") {
      return renderWritingGradingBuilder(draft);
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

  // --- Teacher Writing Grading Studio ---
  function renderWritingGradingBuilder(draft) {
    const studentText = draft.student_text || draft.content_ru || "";
    const words = studentText ? studentText.trim().split(/\s+/).filter(Boolean).length : 0;
    const scoreVal = draft.overall_score != null ? draft.overall_score : "";
    const statusVal = draft.status || "submitted";
    const notesVal = draft.teacher_notes || "";

    return `
      <div class="payload-array-container" style="background:var(--p-surface-elevated, #fff);border:1px solid var(--p-border-subtle, rgba(0,0,0,0.08));border-radius:12px;padding:18px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--p-border-subtle, rgba(0,0,0,0.08));">
          <div>
            <h3 style="margin:0 0 4px 0;font-size:16px;font-weight:700">Studio Chấm bài Luyện viết (Письмо)</h3>
            <p style="margin:0;font-size:12.5px;color:var(--p-text-muted)">Học viên: <code>${esc(draft.user_id || "Chưa định danh")}</code> • Mã đề: <code>${esc(draft.task_id || "Tự do")}</code></p>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="p-pill ${statusVal === "graded" ? "p-pill-success" : statusVal === "grading" ? "p-pill-warning" : "p-pill-info"}">
              ${statusVal === "graded" ? "Đã chấm điểm" : statusVal === "grading" ? "Đang chấm" : "Chờ chấm"}
            </span>
          </div>
        </div>

        <div style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <label style="font-size:13px;font-weight:700">Bài làm của học viên:</label>
            <span class="p-pill p-pill-muted">Độ dài: <b>${words} từ</b></span>
          </div>
          <div style="padding:14px 16px;background:var(--p-surface-subtle, rgba(0,0,0,0.02));border:1px solid var(--p-border-subtle, rgba(0,0,0,0.08));border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap;max-height:280px;overflow-y:auto;font-family:inherit;">
            ${esc(studentText) || '<em style="color:var(--p-text-muted)">Học viên chưa nhập nội dung bài viết.</em>'}
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;margin-bottom:16px">
          <div>
            <label class="p-label" style="font-weight:700">Điểm số tổng kết (Thang 100):</label>
            <input type="number" min="0" max="100" class="p-input" id="gradingScoreInput" value="${escAttr(scoreVal)}" placeholder="Ví dụ: 85" oninput="if(State.currentDraft) State.currentDraft.overall_score = parseFloat(this.value)||0;" style="font-size:16px;font-weight:700" />
          </div>
          <div>
            <label class="p-label" style="font-weight:700">Trạng thái bài làm:</label>
            <select class="p-select" id="gradingStatusSelect" onchange="if(State.currentDraft) State.currentDraft.status = this.value;">
              <option value="submitted" ${statusVal === "submitted" ? "selected" : ""}>Mới nộp (Chờ chấm)</option>
              <option value="grading" ${statusVal === "grading" ? "selected" : ""}>Đang chấm bài</option>
              <option value="graded" ${statusVal === "graded" ? "selected" : ""}>Đã hoàn thành chấm</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <label class="p-label" style="font-weight:700">Nhận xét &amp; Gợi ý sửa lỗi của Giáo viên:</label>
            <div style="display:flex;gap:6px">
              <button type="button" class="p-btn p-btn-ghost p-btn-xs" onclick="window.appendQuickTeacherNote('Bài viết tốt, bố cục rõ ràng!')">+ Tốt</button>
              <button type="button" class="p-btn p-btn-ghost p-btn-xs" onclick="window.appendQuickTeacherNote('Cần chú ý chia động từ và giống danh từ.')">+ Ngữ pháp</button>
              <button type="button" class="p-btn p-btn-ghost p-btn-xs" onclick="window.appendQuickTeacherNote('Nên bổ sung thêm liên từ nối câu (потому что, поэтому, однако).')">+ Liên từ</button>
            </div>
          </div>
          <textarea class="p-textarea" id="gradingNotesInput" rows="5" placeholder="Ghi nhận xét chi tiết, chỉ ra lỗi dùng từ, chia cách hoặc gợi ý cách viết tự nhiên hơn..." oninput="if(State.currentDraft) State.currentDraft.teacher_notes = this.value;">${esc(notesVal)}</textarea>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:10px">
          <button class="p-btn p-btn-primary" type="button" onclick="window.submitGradingResult()">${window.RusiIcons ? RusiIcons.get("check-circle", { size: 14 }) : ""} Lưu điểm &amp; Hoàn tất chấm</button>
        </div>
      </div>
    `;
  }

  window.appendQuickTeacherNote = function (note) {
    const area = document.getElementById("gradingNotesInput");
    if (!area || !State.currentDraft) return;
    area.value = (area.value ? area.value + "\n" : "") + note;
    State.currentDraft.teacher_notes = area.value;
  };

  window.submitGradingResult = function () {
    if (!State.currentDraft) return;
    const scoreInp = document.getElementById("gradingScoreInput");
    const notesInp = document.getElementById("gradingNotesInput");
    const statusSel = document.getElementById("gradingStatusSelect");
    if (scoreInp) State.currentDraft.overall_score = parseFloat(scoreInp.value) || 0;
    if (notesInp) State.currentDraft.teacher_notes = notesInp.value;
    if (statusSel) State.currentDraft.status = statusSel.value || "graded";
    State.currentDraft.graded_at = new Date().toISOString();
    window.saveDocument();
    toast("Đã lưu điểm và hoàn tất chấm bài cho học viên!");
  };

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

      VOCABULARIES: {
        table: "vocabularies",
        conflict: "id",
        deleteCol: "id",
        label: "Kho từ điển",
        idKey: (doc) => doc.id || doc.word_with_stress,
        toRow: (doc) => {
          const w = String(doc.word_with_stress || doc.ru || doc.word || "").trim();
          return {
            id: (doc.id && String(doc.id).includes("-")) ? doc.id : undefined,
            word_with_stress: w || "сло́во",
            pos: doc.pos || doc.type || "noun",
            meaning_vi: doc.meaning_vi || doc.vi || "từ ngữ",
            meaning_ru: doc.meaning_ru || null,
            level: doc.level || "A1",
            gender: doc.gender || null,
            aspect: doc.aspect || null,
            transcription: doc.transcription || doc.ipa || null,
            notes: doc.notes || doc.note || null,
            structures: Array.isArray(doc.structures) ? doc.structures : [],
            examples: Array.isArray(doc.examples) ? doc.examples : (doc.ex ? [{ ru: doc.ex, vi: doc.ex_vi || "" }] : []),
            collocations: (doc.collocations && typeof doc.collocations === "object") ? doc.collocations : {},
            cases_table: (doc.cases_table && typeof doc.cases_table === "object") ? doc.cases_table : {},
            conjugation_data: (doc.conjugation_data && typeof doc.conjugation_data === "object") ? doc.conjugation_data : {},
            audio_url: doc.audio_url || doc.audioUrl || null,
            publication_status: doc.publication_status || "published",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id || row.source_key || row.word_with_stress,
          word_with_stress: row.word_with_stress,
          ru: row.word_with_stress,
          word_normalized: row.word_normalized,
          pos: row.pos,
          meaning_vi: row.meaning_vi,
          vi: row.meaning_vi,
          meaning_ru: row.meaning_ru || "",
          level: row.level || "A1",
          gender: row.gender || "",
          aspect: row.aspect || "",
          transcription: row.transcription || "",
          ipa: row.transcription || "",
          notes: row.notes || "",
          audio_url: row.audio_url || "",
          publication_status: row.publication_status || "published",
          examples: Array.isArray(row.examples) ? row.examples : []
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
          return {
            code: String(doc.id || doc.code).trim(),
            name: jarName,
            jar_name: jarName,
            level: doc.level || "A1",
            level_name: doc.levelName || doc.level_name || ("Sơ cấp " + (doc.level || "A1")),
            description: doc.desc || doc.description || "",
            icon: doc.icon || "archive-jar",
            icon_slug: doc.icon || "archive-jar",
            color_code: doc.color || doc.color_code || "#102a4c",
            is_system: true,
            is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
            words: wordsArr,
            words_summary: wordsArr.slice(0, 5),
            word_count: wordsArr.length,
            article: doc.article || null,
            publication_status: doc.publication_status || "published",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          code: row.code || row.id,
          name: row.name || row.jar_name || "Lọ từ vựng",
          jar_name: row.jar_name || row.name || "Lọ từ vựng",
          level: row.level || "A1",
          levelName: row.level_name || (row.level === "B2" ? "Nâng cao B2" : row.level === "B1" ? "Trung cấp B1" : row.level === "A2" ? "Cơ bản A2" : "Sơ cấp A1"),
          desc: row.description || "",
          icon: row.icon || row.icon_slug || "archive-jar",
          color: row.color_code || "#102a4c",
          is_pro_only: Boolean(row.is_pro_only),
          publication_status: row.publication_status || "published",
          words: Array.isArray(row.words) ? row.words : [],
          article: row.article || null
        })
      },

      JAR_ITEMS: {
        table: "jar_items",
        conflict: "jar_id,vocab_id",
        deleteCol: "jar_id",
        label: "Liên kết Từ - Lọ",
        idKey: (doc) => doc.id || (doc.jar_id + "_" + doc.vocab_id),
        toRow: (doc) => ({
          jar_id: doc.jar_id,
          vocab_id: doc.vocab_id,
          position: Number(doc.position) || 0,
          added_at: doc.added_at || new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.jar_id + "_" + row.vocab_id,
          jar_id: row.jar_id,
          vocab_id: row.vocab_id,
          position: Number(row.position) || 0,
          added_at: row.added_at
        })
      },

      TOPIC_ARTICLES: {
        table: "topic_articles",
        conflict: "id",
        deleteCol: "id",
        label: "Bài học chủ đề (Article)",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const dialogues = Array.isArray(doc.dialogues) ? doc.dialogues.map(d => ({
            speaker: (d.speaker || d.who || "Người nói").trim(),
            who: (d.speaker || d.who || "Người nói").trim(),
            role: (d.role || "").trim(),
            ru: d.ru || "",
            vi: d.vi || ""
          })) : [];
          const grammarNotes = Array.isArray(doc.grammarNotes) ? doc.grammarNotes : (Array.isArray(doc.grammar_notes) ? doc.grammar_notes : (doc.grammar ? [{ title: doc.grammar.title || "", content: doc.grammar.rule || "" }] : []));
          const actionChains = Array.isArray(doc.actionChains) ? doc.actionChains : (Array.isArray(doc.action_chains) ? doc.action_chains : []);
          const mdContent = doc.content_md != null ? doc.content_md : (doc.content != null ? doc.content : (doc.content_markdown || ""));
          return {
            id: String(doc.id).trim(),
            title: doc.title || ("Bài học: " + doc.id),
            level: doc.level || "A1",
            intro: doc.intro || "",
            content_md: mdContent,
            audio_url: doc.audioUrl || doc.audio_url || null,
            dialogues: dialogues,
            grammar_notes: grammarNotes,
            action_chains: actionChains,
            cultural_tip: doc.culturalTip || doc.cultural_tip || "",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => {
          const art = row.article || {};
          const rowDia = Array.isArray(row.dialogues) ? row.dialogues : (Array.isArray(art.dialogues) ? art.dialogues : []);
          const normDia = rowDia.map(d => ({
            speaker: d.speaker || d.who || "",
            who: d.speaker || d.who || "",
            role: d.role || "",
            ru: d.ru || "",
            vi: d.vi || ""
          }));
          const mdContent = row.content_md || art.content_md || art.content || art.content_markdown || "";
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

      LISTENING_TOPICS: {
        table: "listening_topics",
        conflict: "code",
        deleteCol: "code",
        label: "Chủ đề luyện nghe",
        idKey: (doc) => doc.code || doc.id,
        toRow: (doc) => ({
          id: (doc.id && String(doc.id).includes("-")) ? doc.id : undefined,
          code: String(doc.code || doc.id || "").trim(),
          title: doc.title || "Chủ đề luyện nghe",
          level: doc.level || "A1",
          category: doc.category || "airport",
          description: doc.description || "",
          icon: doc.icon || "headphones",
          sort_order: Number(doc.sort_order) || 0,
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          updated_at: new Date().toISOString()
        }),
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
        toRow: (doc) => ({
          code: String(doc.code || doc.id).trim(),
          topic_id: (doc.topic_id && String(doc.topic_id).includes("-")) ? doc.topic_id : (doc.topic_id || null),
          title: doc.title || "Bài luyện nghe",
          vi: doc.vi || "",
          translation_vi: doc.vi || "",
          level: doc.level || "A1",
          level_name: doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
          category: doc.category || "comprehension",
          category_name: doc.categoryName || "Nghe hiểu",
          audio_url: doc.audio_url || doc.audioUrl || null,
          duration_seconds: Number(doc.duration_seconds || doc.durationSeconds) || 30,
          lines: Array.isArray(doc.lines) ? doc.lines : [],
          questions: Array.isArray(doc.questions) ? doc.questions : [],
          sort_order: Number(doc.sort_order) || 1,
          is_pro_only: Boolean(doc.is_pro_only === true || doc.is_pro_only === "true"),
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.code || row.id,
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
          return {
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
          return {
            code: String(doc.code || doc.id).trim(),
            topic_id: (doc.topic_id && String(doc.topic_id).includes("-")) ? doc.topic_id : (doc.topic_id || null),
            title: doc.title || "Bài luyện viết",
            level: doc.level || "A1",
            level_name: doc.levelName || ("Sơ cấp " + (doc.level || "A1")),
            task_type: doc.task_type || "picture_desc",
            category: doc.category || "daily",
            category_name: doc.categoryName || "Sinh hoạt",
            image_url: doc.image_url || null,
            prompt: promptText,
            prompt_text: promptText,
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
        toRow: (doc) => ({
          id: (doc.id && String(doc.id).includes("-")) ? doc.id : undefined,
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
        }),
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

      WRITING_SUBMISSIONS: {
        table: "writing_submissions",
        conflict: "id",
        deleteCol: "id",
        label: "Bài nộp Luyện viết",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const isUuid = (str) => typeof str === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str.trim());
          return {
            id: (doc.id && isUuid(doc.id)) ? doc.id : undefined,
            user_id: (doc.user_id && isUuid(doc.user_id)) ? doc.user_id : null,
            task_id: (doc.task_id && isUuid(doc.task_id)) ? doc.task_id : null,
            student_text: doc.student_text || doc.content_ru || "",
            content_ru: doc.student_text || doc.content_ru || "",
            word_count: Number(doc.word_count) || (doc.student_text ? doc.student_text.trim().split(/\s+/).length : 0),
            overall_score: doc.overall_score != null ? Number(doc.overall_score) : null,
            status: doc.status || "submitted",
            teacher_notes: doc.teacher_notes || "",
            submitted_at: doc.submitted_at || new Date().toISOString(),
            graded_at: doc.graded_at || null,
            ai_feedback: (doc.ai_feedback && typeof doc.ai_feedback === "object") ? doc.ai_feedback : {}
          };
        },
        fromRow: (row) => ({
          id: row.id || ("sub_" + row.user_id + "_" + row.task_id),
          user_id: row.user_id,
          task_id: row.task_id,
          student_text: row.student_text || row.content_ru || "",
          word_count: Number(row.word_count) || 0,
          overall_score: row.overall_score != null ? Number(row.overall_score) : null,
          status: row.status || "submitted",
          teacher_notes: row.teacher_notes || "",
          submitted_at: row.submitted_at,
          graded_at: row.graded_at,
          ai_feedback: row.ai_feedback || {}
        })
      },

      TRKI_SUBMISSIONS: {
        table: "trki_submissions",
        conflict: "id",
        deleteCol: "id",
        label: "Kết quả thi TRKI",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const isUuid = (str) => typeof str === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str.trim());
          return {
            id: (doc.id && isUuid(doc.id)) ? doc.id : undefined,
            user_id: (doc.user_id && isUuid(doc.user_id)) ? doc.user_id : null,
            exam_id: doc.exam_id || "trki_a1",
            score_percent: Number(doc.score_percent) || 0,
            passed: Boolean(doc.passed === true || doc.passed === "true"),
            section_scores: (doc.section_scores && typeof doc.section_scores === "object") ? doc.section_scores : {},
            user_answers: (doc.user_answers && typeof doc.user_answers === "object") ? doc.user_answers : {},
            time_spent_sec: Number(doc.time_spent_sec) || 0,
            submitted_at: doc.submitted_at || new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id || ("exam_" + row.user_id + "_" + row.exam_id),
          user_id: row.user_id,
          exam_id: row.exam_id,
          score_percent: Number(row.score_percent) || 0,
          passed: Boolean(row.passed),
          time_spent_sec: Number(row.time_spent_sec) || 0,
          submitted_at: row.submitted_at
        })
      },

      VOCAB_LESSONS: {
        table: "vocab_lessons",
        conflict: "code",
        deleteCol: "code",
        label: "Video «Хочу в Россию»",
        idKey: (doc) => doc.id || doc.code,
        toRow: (doc) => {
          const storyContent = doc.content_md || doc.story || ("# " + (doc.ru || "") + "\n\n" + (doc.vi || "") + "\n\n" + (doc.story || ""));
          return {
            code: String(doc.id).trim(),
            title: doc.ru || doc.title || "Tập phim «Хочу в Россию»",
            level: doc.level || "A1",
            content_md: storyContent,
            publication_status: "published",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.code || row.id,
          ru: row.title || "",
          title: row.title || "",
          level: row.level || "A1",
          story: row.content_md || "",
          content_md: row.content_md || ""
        })
      },

      USER_PROGRESS: {
        table: "user_progress",
        conflict: "user_id",
        deleteCol: "user_id",
        label: "Tiến độ học tập",
        idKey: (doc) => doc.user_id || doc.id,
        toRow: (doc) => ({
          user_id: doc.user_id || doc.id,
          xp_total: Number(doc.xp_total) || 0,
          streak_count: Number(doc.streak_count) || 0,
          last_study_date: doc.last_study_date || new Date().toISOString().slice(0, 10),
          vocab_stats: (doc.vocab_stats && typeof doc.vocab_stats === "object") ? doc.vocab_stats : { due: 0, learning: 0, mastered: 0 },
          done_list: (doc.done_list && typeof doc.done_list === "object") ? doc.done_list : { trkiDone: [], speakDone: [], vocabDone: [], writeDone: [], listenDone: [] },
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.user_id,
          user_id: row.user_id,
          xp_total: Number(row.xp_total) || 0,
          streak_count: Number(row.streak_count) || 0,
          last_study_date: row.last_study_date || "",
          vocab_stats: row.vocab_stats || {},
          done_list: row.done_list || {}
        })
      },

      USER_VOCAB_PROGRESS: {
        table: "user_vocab_progress",
        conflict: "user_id,vocab_id,direction",
        deleteCol: "user_id",
        label: "Tiến độ thẻ từ SM-2",
        idKey: (doc) => doc.id || (doc.user_id + "_" + doc.vocab_id),
        toRow: (doc) => ({
          user_id: doc.user_id,
          vocab_id: doc.vocab_id,
          direction: Number(doc.direction) || 1,
          learning_state: Number(doc.learning_state) || 1,
          interval_seconds: (Number(doc.interval_days) || 1) * 86400,
          interval_days: Number(doc.interval_days) || 1,
          ease_factor: Number(doc.ease_factor) || 2.5,
          next_review_at: doc.next_review_at || new Date().toISOString(),
          review_count: Number(doc.review_count) || 0,
          lapse_count: Number(doc.lapse_count) || 0,
          is_suspended: Boolean(doc.is_suspended),
          row_version: 1,
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.user_id + "_" + row.vocab_id,
          user_id: row.user_id,
          vocab_id: row.vocab_id,
          direction: Number(row.direction) || 1,
          interval_days: Number(row.interval_days) || 1,
          ease_factor: Number(row.ease_factor) || 2.5,
          next_review_at: row.next_review_at,
          review_count: Number(row.review_count) || 0,
          lapse_count: Number(row.lapse_count) || 0
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
          const pId = String(doc.id || doc.code).trim();
          return {
            id: pId,
            code: pId,
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
          const slugVal = String(doc.slug || doc.id || ("post_" + Date.now())).trim();
          return {
            id: slugVal,
            slug: slugVal,
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

      GRAMMAR_LESSONS: {
        table: "grammar_lessons",
        conflict: "id",
        deleteCol: "id",
        label: "Bài học Ngữ pháp",
        idKey: (doc) => doc.id,
        toRow: (doc) => {
          const rulesArr = Array.isArray(doc.rules) ? doc.rules : [];
          const examplesArr = Array.isArray(doc.examples) ? doc.examples : [];
          return {
            id: String(doc.id).trim(),
            title: doc.title || "Bài học ngữ pháp",
            vi: doc.vi || "",
            level: doc.level || "A1",
            topic: doc.topic || "Danh từ & 6 Cách",
            category: doc.category || doc.topic || "Danh từ & 6 Cách",
            summary: doc.summary || doc.vi || "",
            content_md: doc.content_md || doc.content || "",
            rules: rulesArr,
            examples: examplesArr,
            table_data: doc.table_data || doc.table || null,
            questions: Array.isArray(doc.questions || doc.quickQuiz) ? (doc.questions || doc.quickQuiz) : [],
            publication_status: doc.publication_status || "published",
            updated_at: new Date().toISOString()
          };
        },
        fromRow: (row) => ({
          id: row.id,
          title: row.title || "",
          vi: row.vi || "",
          level: row.level || "A1",
          topic: row.topic || "Danh từ & 6 Cách",
          summary: row.summary || "",
          content_md: row.content_md || "",
          content: row.content_md || "",
          publication_status: row.publication_status || "published",
          rules: Array.isArray(row.rules) ? row.rules : [],
          examples: Array.isArray(row.examples) ? row.examples : [],
          table: row.table_data || null,
          table_data: row.table_data || null,
          quickQuiz: Array.isArray(row.questions) ? row.questions : []
        })
      },

      USERS: {
        table: "profiles",
        conflict: "id",
        deleteCol: "id",
        label: "Học viên & Quản trị",
        idKey: (doc) => doc.id,
        toRow: (doc) => ({
          id: String(doc.id).trim(),
          full_name: doc.full_name || doc.name || "",
          avatar_url: doc.avatar_url || null,
          timezone: "Asia/Ho_Chi_Minh",
          role: doc.role || "student",
          is_pro: Boolean(doc.is_pro === true || doc.is_pro === "true"),
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.id,
          email: row.email || "",
          full_name: row.full_name || "",
          role: row.role || "student",
          is_pro: Boolean(row.is_pro),
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
        toRow: (doc) => ({
          order_code: String(doc.order_code || doc.id || ("ORD-" + Date.now().toString().slice(-6))).trim(),
          user_id: doc.userId || null,
          package_id: doc.packageId || doc.package_id || "",
          amount: Number(doc.amount) || 0,
          amount_minor: (Number(doc.amount) || 0) * 100,
          currency: "VND",
          payment_method: String(doc.paymentMethod || doc.payment_method || "VIETQR").toUpperCase(),
          status: String(doc.status || "pending").toLowerCase(),
          expires_at: doc.expires_at || new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        }),
        fromRow: (row) => ({
          id: row.order_code || row.id,
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

        // Đồng bộ gương song song cho 18 tables
        if (slug === "TOPIC_ARTICLES") {
          try {
            await sb.from("vocab_jars").update({
              article: {
                id: doc.id,
                title: doc.title,
                level: doc.level,
                intro: doc.intro,
                content: doc.content || doc.content_markdown,
                audioUrl: doc.audioUrl,
                dialogues: doc.dialogues,
                grammar: doc.grammar,
                grammarNotes: doc.grammarNotes,
                vocabTable: doc.vocabTable,
                actionChains: doc.actionChains,
                culturalTip: doc.culturalTip
              },
              updated_at: new Date().toISOString()
            }).eq("code", String(doc.id).trim());
          } catch (_) {}
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
        const { error } = await sb
          .from(mapping.table)
          .delete()
          .eq(mapping.deleteCol, idKey);

        if (error) {
          console.error(`[SupabaseSyncEngine] Lỗi xoá bảng ${mapping.table}:`, error);
          return { ok: false, error, message: error.message };
        }

        if (slug === "TOPIC_ARTICLES") {
          try {
            await sb.from("vocab_jars").update({ article: null, updated_at: new Date().toISOString() }).eq("code", idKey);
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
          const { data, error } = await sb.from(mapping.table).select("*");
          if (error) {
            console.warn(`[SupabaseSyncEngine] Lỗi pull bảng ${mapping.table}:`, error.message);
            continue;
          }

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
    }

    const data = State.currentDraft;

    // Form validation: Kiểm tra các trường bắt buộc
    for (const f of col.fields) {
      if (f.required) {
        const val = data[f.key];
        if (val === undefined || val === null || String(val).trim() === "") {
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
        let obj;
        if (/^[\[{]/.test(text.replace(/^\s*\/\/.*$/gm, "").trim())) {
          obj = JSON.parse(text.replace(/^\s*\/\/.*$/gm, ""));
        } else {
          const fn = new Function(text + `\n;return { ${COLLECTION_KEYS.join(", ")} };`);
          obj = fn();
        }
        importToStore(obj);
      } catch (err) {
        toast("File không hợp lệ: " + err.message);
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
        const sVal = (serviceInp?.value || "").trim();
        const aVal = (anonInp?.value || "").trim();

        if (sVal) {
          localStorage.setItem("trki_sb_service_key", sVal);
        } else {
          localStorage.removeItem("trki_sb_service_key");
        }

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
        const sql = `-- RUSI TRKI: CẤP TOÀN QUYỀN ĐỌC GHI CHO CMS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER TABLE IF EXISTS public.trki_tests DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocabularies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocab_jars DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.jar_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.topic_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.listening_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.speaking_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.writing_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.writing_topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.grammar_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shop_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vocab_lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.writing_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.trki_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_vocab_progress DISABLE ROW LEVEL SECURITY;`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(sql).then(() => {
            toast("Đã sao chép SQL mở quyền! Dán vào Supabase SQL Editor và bấm RUN.");
          }).catch(() => {
            prompt("Sao chép mã SQL mở quyền Supabase:", sql);
          });
        } else {
          prompt("Sao chép mã SQL mở quyền Supabase:", sql);
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
      msg.textContent = "Vui lòng nhập Service Role Key hoặc Anon Key từ Supabase Dashboard.";
      return;
    }

    const hasServiceKey = Boolean(localStorage.getItem("trki_sb_service_key"));

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

      if (hasServiceKey) {
        badge.textContent = `Admin Sẵn Sàng (${latency}ms)`;
        badge.className = "p-pill p-pill-success";
        msg.textContent = "Đang dùng Service Role Key: Toàn quyền Thêm / Sửa / Xóa không bị RLS chặn.";
      } else {
        badge.textContent = `Anon Key Kết Nối (${latency}ms)`;
        badge.className = "p-pill p-pill-info";
        msg.textContent = "Kết nối tốt. Nếu đẩy bị lỗi phân quyền 401, hãy dán Service Role Key hoặc bấm 'Sao chép SQL' để mở quyền ghi.";
      }
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

  function isUserAdmin(user) {
    if (!user) return false;
    const role = String(user.role || "").toLowerCase().trim();
    if (role === "academic_admin" || role === "super_admin") return true;

    const email = String(user.email || "").toLowerCase().trim();
    if (email && DEFAULT_ADMIN_EMAILS.includes(email)) return true;

    try {
      const extra = JSON.parse(localStorage.getItem("rusi_admin_emails") || "[]");
      if (Array.isArray(extra) && extra.map((e) => String(e).toLowerCase().trim()).includes(email)) {
        return true;
      }
    } catch (_) {}

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

    const isDevMode = localStorage.getItem(DEV_MODE_KEY) === "true";

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

    // Nút Dev Mode Bypass (cục bộ)
    const onDevBypass = () => {
      localStorage.setItem(DEV_MODE_KEY, "true");
      toast("Đã kích hoạt chế độ Quản trị Cục bộ (Local Dev)!");
      applyAuthState(true);
    };
    const dev1 = document.getElementById("btnDevBypass");
    if (dev1) dev1.onclick = onDevBypass;
    const dev2 = document.getElementById("btnDevBypass2");
    if (dev2) dev2.onclick = onDevBypass;

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
})();
