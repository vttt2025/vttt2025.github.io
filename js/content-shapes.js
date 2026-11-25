/**
 * js/content-shapes.js — Chuyển dòng Supabase → item nội dung (dùng chung cho Node và trình duyệt).
 *
 * - scripts/publish-content.js: require('../js/content-shapes.js') để dựng data/modules/*.json.
 * - Trình duyệt: window.RusiContentShapes — js/pro-content.js dùng cùng select + shape để tải bài PRO
 *   bằng phiên đăng nhập (RLS), nên bài PRO tải về có đúng định dạng như file JSON công khai trước đây.
 * - Bài PRO trong file công khai chỉ còn metadata (lockedItem) với `content_locked: true`.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RusiContentShapes = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Trường đáp án tuyệt đối không được xuất hiện trong file công khai của đề thi TRKI.
  const ANSWER_KEYS = new Set(['a', 'ex', 'ans', 'answer', 'answers', 'answer_key', 'official_key',
    'correct_answer', 'correct_index', 'correct_option', 'correctIndex', 'explanation']);

  function stripAnswers(value) {
    return JSON.parse(JSON.stringify(value, (k, v) => (ANSWER_KEYS.has(k) ? undefined : v)));
  }
  function findAnswerKeys(value, found = new Set()) {
    if (Array.isArray(value)) value.forEach((v) => findAnswerKeys(v, found));
    else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) { if (ANSWER_KEYS.has(k)) found.add(k); findAnswerKeys(v, found); }
    }
    return found;
  }

  // Select PostgREST dùng chung cho publish (anon) và tải bài PRO (phiên đăng nhập)
  const SELECTS = {
    vocab_jars: 'id,code,name,level,icon,word_count,is_system,is_pro,jar_items(position,vocabularies(*))',
    topic_articles: '*',
    listening_lessons: '*,topic:listening_topics(*),vocab_items:listening_lesson_vocab(sort_order,line_index,vocab:vocabularies(*))',
    speaking_lessons: '*',
    writing_tasks: '*,topic:writing_topics(*),vocab_items:writing_task_vocab(sort_order,vocab:vocabularies(*))',
    writing_topics: '*',
    grammar_lessons: '*',
    trki_tests_public: '*'
  };

  function sanitizeWord(w) {
    if (!w) return null;
    const ex0 = (Array.isArray(w.examples) && w.examples[0]) ? w.examples[0] : null;
    const rawWord = w.word_normalized || (w.word_with_stress ? w.word_with_stress.replace(/[̀́]/g, '') : '');
    const stressWord = w.word_with_stress || w.word_normalized || '';
    return {
      id: w.id, ru: rawWord, stress: stressWord, word_with_stress: stressWord, word_normalized: rawWord,
      vi: w.meaning_vi || '', meaning_vi: w.meaning_vi || '', pos: w.pos || '', gender: w.gender || '',
      aspect: w.aspect || '', level: w.level || 'A1', audio: w.audio_url || '', audio_url: w.audio_url || '',
      ex: ex0 ? (ex0.ru || '') : '', ex_vi: ex0 ? (ex0.vi || '') : '',
      examples: Array.isArray(w.examples) ? w.examples : [],
      ant: (Array.isArray(w.antonyms) && w.antonyms.length) ? w.antonyms.join(', ') : '',
      antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
      syn: (Array.isArray(w.synonyms) && w.synonyms.length) ? w.synonyms.join(', ') : '',
      synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
      structures: Array.isArray(w.structures) ? w.structures : [],
      notes: w.notes || ''
    };
  }

  function formatArticle(art, fallbackLevel) {
    return {
      id: art.id, title: art.title, level: art.level || fallbackLevel || 'A1',
      intro: art.intro || '', desc: art.intro || '',
      culturalTip: art.cultural_tip || '', cultural_tip: art.cultural_tip || '',
      audio_url: art.audio_url || '',
      actionChains: Array.isArray(art.action_chains) ? art.action_chains : [],
      action_chains: Array.isArray(art.action_chains) ? art.action_chains : [],
      dialogues: Array.isArray(art.dialogues) ? art.dialogues : [],
      grammarNotes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
      grammar_notes: Array.isArray(art.grammar_notes) ? art.grammar_notes : [],
      content_md: art.content_md || ''
    };
  }

  // articles: map id → dòng topic_articles (chưa format)
  function vocabJar(row, articles) {
    const code = row.code || row.id;
    const art = (articles && (articles[code] || articles[row.id])) || null;
    const items = (Array.isArray(row.jar_items) ? row.jar_items : []).sort((a, b) => (a.position || 0) - (b.position || 0));
    const words = items.map((it) => sanitizeWord(it.vocabularies)).filter(Boolean);
    const article = art ? formatArticle(art, row.level) : null;
    return {
      id: code, code, uuid: row.id, name: row.name || code, title: row.name || code,
      level: row.level || 'A1', desc: (article && article.intro) || '', icon: row.icon || 'archive-jar',
      color: '#0039A6', word_count: words.length || row.word_count || 0, is_system: true,
      is_pro: Boolean(row.is_pro), words, article
    };
  }

  function listeningLesson(row) {
    const raw = row.raw_data || {};
    const t = row.topic || {};
    const lines = (Array.isArray(row.lines) && row.lines.length) ? row.lines : (raw.lines || []);
    const questions = (Array.isArray(row.questions) && row.questions.length) ? row.questions : (raw.questions || []);
    const dictation = (raw.dictation && raw.dictation.length) ? raw.dictation : (Array.isArray(lines) ? lines.map((l) => l.text_ru || l.ru || '').filter(Boolean) : []);
    const ytId = row.youtube_id || row.video_youtube_id || (raw.youtube_video_id || '');
    return {
      id: row.code || row.id, lesson_uuid: row.id, code: row.code || row.id, topic_id: row.topic_id,
      title: row.title, vi: row.vi || t.description || '',
      translation_vi: row.translation_vi || row.vi || '', transcript_ru: row.transcript_ru || '',
      level: row.level || t.level || 'A1', level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
      category: t.category || row.category || 'general', category_name: t.title || row.category_name || 'Luyện nghe hiểu',
      part_type: 'part' + (row.part_number || 1), part_number: row.part_number || 1,
      youtube_id: ytId, video_youtube_id: ytId, audio_url: row.audio_url || '',
      duration_seconds: row.duration_seconds || 120, est_minutes: row.est_minutes || 12,
      is_pro_only: Boolean(row.is_pro_only || t.is_pro_only),
      lines, questions, dictation, blanks: raw.blanks || [], vocab_items: row.vocab_items || [], raw_data: raw
    };
  }

  function speakingSet(row) {
    const raw = row.raw_data || {};
    const sentences = Array.isArray(row.sentences) && row.sentences.length ? row.sentences : (Array.isArray(row.items) && row.items.length ? row.items : (raw.items || []));
    const ytId = row.youtube_id || raw.youtube_video_id || raw.youtubeId || (row.video_sample_url && row.video_sample_url.includes('youtube') ? (row.video_sample_url.match(/(?:embed\/|v=|watch\?v=)([a-zA-Z0-9_-]{11})/) || [])[1] : '');
    return {
      id: row.code || row.id, code: row.code || row.id, title: row.title, level: row.level || 'A1',
      level_name: row.level_name || (row.level === 'B2' ? 'Nâng cao B2' : row.level === 'B1' ? 'Trung cấp B1' : row.level === 'A2' ? 'Cơ bản A2' : 'Sơ cấp A1'),
      category: row.category || 'shadowing', category_name: row.category_name || 'Luyện nói Shadowing',
      speaking_mode: row.speaking_mode || (row.category === 'speech_studio' || row.category === 'reflex' ? 'reflex' : 'shadowing'),
      description: row.description || '', phonemeTarget: row.phoneme_target || '',
      icon: row.icon || (ytId ? 'youtube' : 'mic-speaking'), is_pro_only: Boolean(row.is_pro_only),
      sentences, items: sentences, youtube_id: ytId,
      youtube_url: row.youtube_url || (ytId ? ('https://www.youtube.com/watch?v=' + ytId) : ''),
      video_sample_url: row.video_sample_url || (ytId ? ('https://www.youtube.com/embed/' + ytId + '?enablejsapi=1&rel=0&modestbranding=1&playsinline=1') : ''),
      start_sec: row.start_sec || 0, end_sec: row.end_sec || 0, sort_order: row.sort_order || 0, raw_data: raw
    };
  }

  function writingTask(row) {
    const raw = row.raw_data || {};
    let words;
    if (Array.isArray(row.vocab_items) && row.vocab_items.length) {
      words = row.vocab_items.filter((it) => it && it.vocab).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(({ vocab: v }) => ({
        id: v.id, ru: v.word_with_stress || v.word_normalized, word: v.word_with_stress || v.word_normalized,
        word_normalized: v.word_normalized, vi: v.meaning_vi || '', pos: v.pos || '', level: v.level || '', audio_url: v.audio_url || ''
      }));
    } else {
      words = (raw && Array.isArray(raw.suggested_words) && raw.suggested_words.length) ? raw.suggested_words : (Array.isArray(row.suggested_words) ? row.suggested_words : []);
    }
    let tips = [];
    if (Array.isArray(row.tips) && row.tips.length) tips = row.tips;
    else if (typeof row.tips === 'string' && row.tips.trim()) { try { tips = JSON.parse(row.tips); } catch (_) { tips = [row.tips]; } }
    const topic = row.topic || {};
    const model = row.model_answer || row.sample_essay || raw.model || '';
    return {
      id: row.code || row.id, code: row.code || row.id, title: row.title, level: row.level || topic.level || 'A1',
      level_name: row.level_name || ('Sơ cấp ' + (row.level || 'A1')),
      category: topic.category || row.category || 'picture',
      category_name: topic.title || topic.category_name || row.category_name || 'Tả tranh & Giới thiệu',
      prompt: row.prompt || row.prompt_text || '', prompt_text: row.prompt_text || row.prompt || '',
      image_url: row.image_url || '', min_words: row.min_words || 20, suggested_words: words, tips,
      sample_essay: model, model_answer: model, is_pro_only: Boolean(row.is_pro_only || topic.is_pro_only), raw_data: raw
    };
  }

  function writingTopic(w) {
    const raw = w.raw_data || {};
    return {
      id: w.code || w.id, code: w.code || w.id, title: w.title, level: w.level || 'A1',
      level_name: w.level_name || ('Sơ cấp ' + (w.level || 'A1')), category: w.category || 'essay',
      category_name: w.category_name || 'Chủ đề viết', prompt: w.prompt || '', vi: w.vi || '',
      min_words: w.min_words || 25,
      suggested_words: (Array.isArray(w.suggested_words) && w.suggested_words.length) ? w.suggested_words : (raw.suggested_words || []),
      tips: (Array.isArray(w.tips) && w.tips.length) ? w.tips : (raw.tips || []),
      model_answer: w.model_answer || (raw.model || ''), image_url: w.image_url || '', icon: w.icon || '📝',
      sort_order: typeof w.sort_order === 'number' ? w.sort_order : 10, is_pro_only: Boolean(w.is_pro_only), raw_data: raw
    };
  }

  function grammarLesson(g) {
    return {
      id: g.code || g.id, code: g.code || g.id, title: g.title, level: g.level || 'A1', category: g.category || 'case',
      topic: g.topic || 'Ngữ pháp cơ bản', vi: g.vi || '', summary: g.summary || g.vi || '', content_md: g.content_md || '',
      rules: Array.isArray(g.rules) ? g.rules : [], table_data: g.table_data || {},
      questions: Array.isArray(g.questions) ? g.questions : [], order_index: g.order_index || 0, is_pro_only: Boolean(g.is_pro_only)
    };
  }

  // Dòng từ view trki_tests_public (đã xoá khoá đáp án phía server) — xoá thêm lần nữa ở đây
  function trkiTest(t) {
    const raw = t.raw_data || {};
    const parts = (Array.isArray(t.parts) && t.parts.length) ? t.parts : (raw.parts || t.sections || []);
    return stripAnswers({
      id: t.code || t.id, code: t.code || t.id, title: t.title, level: t.level || 'A1',
      level_name: t.level_name || ('Trình độ ' + (t.level || 'A1')), category: t.category || 'full',
      sub_test_type: t.sub_test_type || 'full', duration_min: t.duration_min || 45, pass_percent: t.pass_percent || 60,
      is_pro_only: Boolean(t.is_pro_only), is_published: Boolean(t.is_published !== false), test_mode: t.test_mode || 'practice',
      parts, part1: t.part1 || raw.part1, part2: t.part2 || raw.part2, part3: t.part3 || raw.part3,
      part4: t.part4 || raw.part4, part5: t.part5 || raw.part5
    });
  }

  // Tóm tắt phần thi cho mục lục (đếm cả bài viết/nói như màn hình chuẩn bị phòng thi)
  function trkiPartSummaries(parts) {
    return (Array.isArray(parts) ? parts : []).map((p) => ({
      id: p.id, name: p.name, vi: p.vi,
      questionCount: (p.questions || []).length || (p.writing_tasks || []).length || (p.speaking_tasks || []).length
    }));
  }

  // ---------------------------------------------------------------------------
  // Bài PRO trong file công khai: chỉ metadata, nội dung tải sau bằng phiên PRO (js/pro-content.js)
  // ---------------------------------------------------------------------------
  // Trường nội dung phải rỗng ở item `content_locked` (kiểm tra trong npm test và trước khi ghi file)
  const LOCKED_HEAVY_FIELDS = {
    'vocab_jars.json': ['words', 'article', 'desc'],
    'topic_articles.json': ['intro', 'desc', 'culturalTip', 'cultural_tip', 'audio_url', 'actionChains', 'action_chains', 'dialogues', 'grammarNotes', 'grammar_notes', 'content_md'],
    'listening_lessons.json': ['translation_vi', 'transcript_ru', 'youtube_id', 'video_youtube_id', 'audio_url', 'lines', 'questions', 'dictation', 'blanks', 'vocab_items', 'raw_data'],
    'speaking_sets.json': ['sentences', 'items', 'youtube_id', 'youtube_url', 'video_sample_url', 'start_sec', 'end_sec', 'raw_data'],
    'writing_tasks.json': ['prompt', 'prompt_text', 'suggested_words', 'tips', 'sample_essay', 'model_answer', 'raw_data'],
    'writing_topics.json': ['prompt', 'suggested_words', 'tips', 'model_answer', 'raw_data'],
    'grammar_lessons.json': ['content_md', 'rules', 'table_data', 'questions'],
    'trki_bank.json': ['parts', 'part1', 'part2', 'part3', 'part4', 'part5', 'sections']
  };

  const isEmptyValue = (v) => v === undefined || v === null || v === '' || v === 0 ||
    (Array.isArray(v) && v.length === 0) || (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0);

  // Danh sách "id.trường" của item khoá còn nội dung (rỗng = an toàn)
  function findLockedLeaks(file, data) {
    const fields = LOCKED_HEAVY_FIELDS[file];
    if (!fields || !data) return [];
    const items = Array.isArray(data) ? data : Object.values(data);
    const leaks = [];
    items.forEach((it) => {
      if (!it || !it.content_locked) return;
      fields.forEach((f) => { if (!isEmptyValue(it[f])) leaks.push(`${it.id}.${f}`); });
    });
    return leaks;
  }

  // Item mang cờ PRO nhưng chưa bị khoá (rỗng = an toàn)
  function findUnlockedPro(file, data) {
    if (!LOCKED_HEAVY_FIELDS[file] || !data) return [];
    const items = Array.isArray(data) ? data : Object.values(data);
    return items.filter((it) => it && (it.is_pro || it.is_pro_only) && !it.content_locked).map((it) => `${it.id}(chưa khoá)`);
  }

  function clearHeavy(file, item) {
    (LOCKED_HEAVY_FIELDS[file] || []).forEach((f) => {
      const v = item[f];
      if (Array.isArray(v)) item[f] = [];
      else if (v && typeof v === 'object') item[f] = f === 'article' ? null : {};
      else if (typeof v === 'number') item[f] = 0;
      else if (v !== undefined && v !== null) item[f] = '';
    });
    return item;
  }

  // Dòng metadata (từ public.rusi_pro_catalog()) → item khoá cùng định dạng file module
  const LOCKED_BUILDERS = {
    'vocab_jars.json': (row) => vocabJar({ ...row, jar_items: [] }, {}),
    'topic_articles.json': (row) => formatArticle(row),
    'listening_lessons.json': (row) => Object.assign(listeningLesson(row), {
      question_count: row.question_count || 0, line_count: row.line_count || 0, dictation_count: row.dictation_count || 0
    }),
    'speaking_sets.json': (row) => Object.assign(speakingSet(row), { sentence_count: row.sentence_count || 0 }),
    'writing_tasks.json': (row) => writingTask(row),
    'writing_topics.json': (row) => writingTopic(row),
    'grammar_lessons.json': (row) => grammarLesson(row),
    // jsonb sắp xếp lại khoá → đưa về đúng thứ tự của trkiPartSummaries
    'trki_bank.json': (row) => Object.assign(trkiTest(row), {
      part_summaries: (Array.isArray(row.part_summaries) ? row.part_summaries : [])
        .map((p) => ({ id: p.id, name: p.name, vi: p.vi, questionCount: p.questionCount || 0 }))
    })
  };

  function lockedItem(file, row) {
    const build = LOCKED_BUILDERS[file];
    if (!build) throw new Error('lockedItem: module không hỗ trợ ' + file);
    const item = clearHeavy(file, build(row));
    item.uuid = row.id;
    item.content_locked = true;
    return item;
  }

  return {
    ANSWER_KEYS, stripAnswers, findAnswerKeys, SELECTS,
    sanitizeWord, formatArticle, vocabJar, listeningLesson, speakingSet, writingTask, writingTopic,
    grammarLesson, trkiTest, trkiPartSummaries,
    LOCKED_HEAVY_FIELDS, findLockedLeaks, findUnlockedPro, lockedItem
  };
});
