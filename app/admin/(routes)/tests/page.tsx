"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Lock,
  Unlock,
  Volume2,
  Image as ImageIcon,
  Search,
  Filter,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  History,
  Check,
  AlertTriangle,
  PlayCircle,
  Flag,
  ArrowRight
} from "lucide-react";

// =============================================================================
// 1. SUPABASE DATABASE SCHEMA TYPES (PROJECT_SPEC.md SECTION 4)
// =============================================================================

export type UserRole = "student" | "teacher" | "academic_admin" | "super_admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  mascot_level: number;
  current_season_outfit?: string;
  is_pro: boolean;
}

export type TRKILevel = "A1" | "A2" | "B1" | "B2";

export type TRKISubTestType =
  | "grammar_vocab"
  | "reading"
  | "listening"
  | "writing"
  | "speaking";

export interface TRKITest {
  id: string;
  level: TRKILevel;
  title: string;
  sub_test_type: TRKISubTestType;
  duration_minutes: number;
  passing_score: number;
  is_published: boolean;
  is_pro_only: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface TRKIQuestion {
  id: string;
  test_id: string;
  part_number: number;
  question_order: number;
  prompt_text: string;
  image_url?: string;
  audio_url?: string;
  options: string[]; // ["A. дом", "B. дома", "C. дому", "D. доме"]
  correct_option: string; // "A" | "B" | "C" | "D" (Zero-Answer-Leak)
  explanation_text: string;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action_type:
    | "CREATE_TEST"
    | "UPDATE_TEST"
    | "DELETE_TEST"
    | "PUBLISH_TEST"
    | "UNPUBLISH_TEST"
    | "CREATE_QUESTION"
    | "UPDATE_QUESTION"
    | "DELETE_QUESTION";
  target_table: "trki_tests" | "trki_questions";
  target_record_id: string;
  old_data?: any;
  new_data?: any;
  ip_address: string;
  created_at: string;
}

// =============================================================================
// 2. MOCK SEED DATA (ALIGNED WITH TRKI_BANK IN DATA.JS)
// =============================================================================

const INITIAL_TESTS: TRKITest[] = [
  {
    id: "test-a1-gv-01",
    level: "A1",
    title: "Đề thi thử A1 (ТЭУ) — Ngữ pháp & Từ vựng căn bản",
    sub_test_type: "grammar_vocab",
    duration_minutes: 50,
    passing_score: 66,
    is_published: true,
    is_pro_only: false,
    created_at: "2026-09-01T10:00:00Z",
    updated_at: "2026-10-18T14:20:00Z"
  },
  {
    id: "test-a2-gv-01",
    level: "A2",
    title: "Đề thi thử A2 (ТБУ) — Biến cách 6 cách & Thể động từ",
    sub_test_type: "grammar_vocab",
    duration_minutes: 60,
    passing_score: 66,
    is_published: true,
    is_pro_only: false,
    created_at: "2026-09-10T09:00:00Z",
    updated_at: "2026-10-15T11:10:00Z"
  },
  {
    id: "test-b1-gv-01",
    level: "B1",
    title: "Đề thi chính thức B1 (ТРКИ-1) — Ngữ pháp tổng hợp & Động từ chuyển động",
    sub_test_type: "grammar_vocab",
    duration_minutes: 60,
    passing_score: 66,
    is_published: true,
    is_pro_only: true,
    created_at: "2026-09-20T08:30:00Z",
    updated_at: "2026-10-19T16:45:00Z"
  },
  {
    id: "test-b2-gv-01",
    level: "B2",
    title: "Đề thi thử B2 (ТРКИ-2) — Cú pháp phức & Phân từ/Phó từ phân từ",
    sub_test_type: "grammar_vocab",
    duration_minutes: 90,
    passing_score: 66,
    is_published: false,
    is_pro_only: true,
    created_at: "2026-10-05T14:00:00Z",
    updated_at: "2026-10-20T09:30:00Z"
  }
];

const INITIAL_QUESTIONS: TRKIQuestion[] = [
  {
    id: "q-a1-1",
    test_id: "test-a1-gv-01",
    part_number: 1,
    question_order: 1,
    prompt_text: "Анна читает интересную ______ в библиотеке.",
    options: ["A. книга", "B. книги", "C. книгу", "D. книге"],
    correct_option: "C",
    explanation_text:
      "Động từ 'читать' đòi hỏi bổ ngữ trực tiếp ở Cách 4 (Винительный падеж). Danh từ giống cái tận cùng -а chuyển thành -у: книга ➔ интересную книгу.",
    created_at: "2026-09-01T10:05:00Z",
    updated_at: "2026-09-01T10:05:00Z"
  },
  {
    id: "q-a1-2",
    test_id: "test-a1-gv-01",
    part_number: 1,
    question_order: 2,
    prompt_text: "Мы сейчас живём и учимся в ______.",
    options: ["A. Москва", "B. Москву", "C. Москве", "D. Москвы"],
    correct_option: "C",
    explanation_text:
      "Giới từ 'в' chỉ địa điểm nơi chốn (ở đâu? - где?) đi với Cách 6 (Предложный падеж). Danh từ giống cái tận cùng -а đổi thành -е: Москва ➔ в Москве.",
    created_at: "2026-09-01T10:06:00Z",
    updated_at: "2026-09-01T10:06:00Z"
  },
  {
    id: "q-a1-3",
    test_id: "test-a1-gv-01",
    part_number: 2,
    question_order: 3,
    prompt_text: "Вчера вечером Виктор долго ______ новое домашнее задание.",
    options: ["A. сделал", "B. делал", "C. сделает", "D. делает"],
    correct_option: "B",
    explanation_text:
      "Trạng từ 'долго' (lâu, trong thời gian dài) chỉ quá trình hành động kéo dài, đòi hỏi thể chưa hoàn thành (НСВ) ở thì quá khứ: делал.",
    created_at: "2026-09-01T10:07:00Z",
    updated_at: "2026-09-01T10:07:00Z"
  },
  {
    id: "q-b1-1",
    test_id: "test-b1-gv-01",
    part_number: 1,
    question_order: 1,
    prompt_text: "Несмотря на сильный дождь, туристы решили ______ в горы пешком.",
    options: ["A. пойти", "B. поехать", "C. идти", "D. уйти"],
    correct_option: "A",
    explanation_text:
      "Cụm từ 'решили + СВ' chỉ quyết định khởi đầu một hành động cụ thể, 'пешком' đòi hỏi nhóm động từ đi bộ. Tiền tố 'по-' chỉ bắt đầu chuyển động: пойти.",
    created_at: "2026-09-20T08:35:00Z",
    updated_at: "2026-09-20T08:35:00Z"
  }
];

const INITIAL_LOGS: AdminAuditLog[] = [
  {
    id: "log-1",
    admin_id: "adm-super-01",
    admin_name: "Super Admin (Rusi Lead)",
    action_type: "PUBLISH_TEST",
    target_table: "trki_tests",
    target_record_id: "test-b1-gv-01",
    new_data: { is_published: true },
    ip_address: "14.238.10.22",
    created_at: "2026-10-19T16:45:00Z"
  },
  {
    id: "log-2",
    admin_id: "adm-super-01",
    admin_name: "Super Admin (Rusi Lead)",
    action_type: "CREATE_QUESTION",
    target_table: "trki_questions",
    target_record_id: "q-b1-1",
    new_data: { test_id: "test-b1-gv-01", prompt: "Несмотря на сильный дождь..." },
    ip_address: "14.238.10.22",
    created_at: "2026-10-19T16:40:00Z"
  }
];

// Cyrillic quick input letters for Russian test writing
const CYRILLIC_KEYS = [
  "ё", "ж", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "́"
];

// =============================================================================
// 3. MAIN TRKI TESTS ADMIN PAGE COMPONENT
// =============================================================================

export default function TRKITestsAdminPage() {
  // Current admin session state (RBAC)
  const [currentAdmin] = useState<Profile>({
    id: "adm-acad-01",
    email: "academic.admin@rusitrki.com",
    full_name: "Nguyễn Văn Nga (Quản trị học thuật)",
    role: "academic_admin",
    mascot_level: 5,
    current_season_outfit: "Mũ lông Ushanka ❄️",
    is_pro: true
  });

  // Database state
  const [tests, setTests] = useState<TRKITest[]>(INITIAL_TESTS);
  const [questions, setQuestions] = useState<TRKIQuestion[]>(INITIAL_QUESTIONS);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(INITIAL_LOGS);

  // Active navigation / tab
  const [activeTab, setActiveTab] = useState<"tests" | "questions" | "audit">("tests");

  // Filtering
  const [filterLevel, setFilterLevel] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTestId, setSelectedTestId] = useState<string>(INITIAL_TESTS[0]?.id || "");

  // Modals & Panels
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [editingTest, setEditingTest] = useState<Partial<TRKITest> | null>(null);

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<TRKIQuestion> | null>(null);

  // Preview Exam Modal (CEFR Format Simulation)
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewTest, setPreviewTest] = useState<TRKITest | null>(null);
  const [previewQuestionIndex, setPreviewQuestionIndex] = useState<number>(0);
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>({});
  const [previewFlagged, setPreviewFlagged] = useState<Record<string, boolean>>({});
  const [previewAdminInspector, setPreviewAdminInspector] = useState<boolean>(true);
  const [previewTimerSec, setPreviewTimerSec] = useState<number>(3000);

  // Active question prompt textarea ref for Cyrillic insertion
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);

  // RBAC Permission Check
  const hasAdminAccess = useMemo(() => {
    return (
      currentAdmin.role === "academic_admin" ||
      currentAdmin.role === "super_admin"
    );
  }, [currentAdmin.role]);

  // Audit Log Recorder
  const recordAudit = (
    action: AdminAuditLog["action_type"],
    table: AdminAuditLog["target_table"],
    recordId: string,
    oldData?: any,
    newData?: any
  ) => {
    const newLog: AdminAuditLog = {
      id: "log-" + Date.now(),
      admin_id: currentAdmin.id,
      admin_name: currentAdmin.full_name,
      action_type: action,
      target_table: table,
      target_record_id: recordId,
      old_data: oldData,
      new_data: newData,
      ip_address: "127.0.0.1 (Client Session)",
      created_at: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Filtered Tests
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchLevel = filterLevel === "ALL" || t.level === filterLevel;
      const matchStatus =
        filterStatus === "ALL" ||
        (filterStatus === "PUBLISHED" && t.is_published) ||
        (filterStatus === "DRAFT" && !t.is_published) ||
        (filterStatus === "PRO" && t.is_pro_only) ||
        (filterStatus === "FREE" && !t.is_pro_only);
      const matchSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchStatus && matchSearch;
    });
  }, [tests, filterLevel, filterStatus, searchQuery]);

  // Questions belonging to currently selected test
  const currentTestQuestions = useMemo(() => {
    return questions
      .filter((q) => q.test_id === selectedTestId)
      .sort((a, b) => a.part_number - b.part_number || a.question_order - b.question_order);
  }, [questions, selectedTestId]);

  // Active test object
  const activeTestObj = useMemo(() => {
    return tests.find((t) => t.id === selectedTestId) || null;
  }, [tests, selectedTestId]);

  // ---------------------------------------------------------------------------
  // Handlers: Tests CRUD
  // ---------------------------------------------------------------------------

  const handleOpenCreateTest = () => {
    setEditingTest({
      id: "test-" + Date.now(),
      level: "A1",
      title: "",
      sub_test_type: "grammar_vocab",
      duration_minutes: 60,
      passing_score: 66,
      is_published: false,
      is_pro_only: true
    });
    setIsTestModalOpen(true);
  };

  const handleOpenEditTest = (test: TRKITest) => {
    setEditingTest({ ...test });
    setIsTestModalOpen(true);
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest || !editingTest.title) return;

    const exists = tests.some((t) => t.id === editingTest.id);
    const now = new Date().toISOString();

    if (exists) {
      const old = tests.find((t) => t.id === editingTest.id);
      const updated = tests.map((t) =>
        t.id === editingTest.id ? ({ ...t, ...editingTest, updated_at: now } as TRKITest) : t
      );
      setTests(updated);
      recordAudit("UPDATE_TEST", "trki_tests", editingTest.id!, old, editingTest);
    } else {
      const newTest: TRKITest = {
        id: editingTest.id || "test-" + Date.now(),
        level: editingTest.level || "A1",
        title: editingTest.title || "Đề thi mới",
        sub_test_type: editingTest.sub_test_type || "grammar_vocab",
        duration_minutes: Number(editingTest.duration_minutes) || 60,
        passing_score: Number(editingTest.passing_score) || 66,
        is_published: Boolean(editingTest.is_published),
        is_pro_only: Boolean(editingTest.is_pro_only),
        created_at: now,
        updated_at: now
      };
      setTests([...tests, newTest]);
      setSelectedTestId(newTest.id);
      recordAudit("CREATE_TEST", "trki_tests", newTest.id, null, newTest);
    }

    setIsTestModalOpen(false);
    setEditingTest(null);
  };

  const handleDeleteTest = (id: string) => {
    const testToDelete = tests.find((t) => t.id === id);
    if (!testToDelete) return;
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa đề thi: "${testToDelete.title}" cùng toàn bộ câu hỏi liên quan?`
      )
    )
      return;

    setTests(tests.filter((t) => t.id !== id));
    setQuestions(questions.filter((q) => q.test_id !== id));
    if (selectedTestId === id) {
      const remaining = tests.filter((t) => t.id !== id);
      setSelectedTestId(remaining[0]?.id || "");
    }
    recordAudit("DELETE_TEST", "trki_tests", id, testToDelete, null);
  };

  const handleTogglePublish = (test: TRKITest) => {
    const nextState = !test.is_published;
    const now = new Date().toISOString();
    setTests(
      tests.map((t) =>
        t.id === test.id ? { ...t, is_published: nextState, updated_at: now } : t
      )
    );
    recordAudit(
      nextState ? "PUBLISH_TEST" : "UNPUBLISH_TEST",
      "trki_tests",
      test.id,
      { is_published: test.is_published },
      { is_published: nextState }
    );
  };

  // ---------------------------------------------------------------------------
  // Handlers: Questions CRUD
  // ---------------------------------------------------------------------------

  const handleOpenAddQuestion = () => {
    if (!selectedTestId) {
      alert("Vui lòng chọn hoặc tạo đề thi trước khi thêm câu hỏi.");
      return;
    }
    const nextOrder = currentTestQuestions.length + 1;
    setEditingQuestion({
      id: "q-" + Date.now(),
      test_id: selectedTestId,
      part_number: 1,
      question_order: nextOrder,
      prompt_text: "",
      options: ["A. ", "B. ", "C. ", "D. "],
      correct_option: "A",
      explanation_text: ""
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: TRKIQuestion) => {
    setEditingQuestion({ ...q, options: [...q.options] });
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion || !editingQuestion.prompt_text) return;

    const exists = questions.some((q) => q.id === editingQuestion.id);
    const now = new Date().toISOString();

    if (exists) {
      const old = questions.find((q) => q.id === editingQuestion.id);
      const updated = questions.map((q) =>
        q.id === editingQuestion.id
          ? ({ ...q, ...editingQuestion, updated_at: now } as TRKIQuestion)
          : q
      );
      setQuestions(updated);
      recordAudit("UPDATE_QUESTION", "trki_questions", editingQuestion.id!, old, editingQuestion);
    } else {
      const newQ: TRKIQuestion = {
        id: editingQuestion.id || "q-" + Date.now(),
        test_id: editingQuestion.test_id || selectedTestId,
        part_number: Number(editingQuestion.part_number) || 1,
        question_order: Number(editingQuestion.question_order) || currentTestQuestions.length + 1,
        prompt_text: editingQuestion.prompt_text,
        image_url: editingQuestion.image_url || undefined,
        audio_url: editingQuestion.audio_url || undefined,
        options: editingQuestion.options || ["A. ", "B. ", "C. ", "D. "],
        correct_option: editingQuestion.correct_option || "A",
        explanation_text: editingQuestion.explanation_text || "",
        created_at: now,
        updated_at: now
      };
      setQuestions([...questions, newQ]);
      recordAudit("CREATE_QUESTION", "trki_questions", newQ.id, null, newQ);
    }

    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    const qToDelete = questions.find((q) => q.id === id);
    if (!qToDelete) return;
    if (!confirm(`Bạn có chắc muốn xóa câu hỏi số ${qToDelete.question_order}?`)) return;

    setQuestions(questions.filter((q) => q.id !== id));
    recordAudit("DELETE_QUESTION", "trki_questions", id, qToDelete, null);
  };

  const handleInsertCyrillic = (char: string) => {
    if (!editingQuestion) return;
    const currentPrompt = editingQuestion.prompt_text || "";
    const el = promptTextareaRef.current;
    if (el) {
      const start = el.selectionStart || currentPrompt.length;
      const end = el.selectionEnd || currentPrompt.length;
      const nextText =
        currentPrompt.substring(0, start) + char + currentPrompt.substring(end);
      setEditingQuestion({ ...editingQuestion, prompt_text: nextText });
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + char.length, start + char.length);
      }, 50);
    } else {
      setEditingQuestion({ ...editingQuestion, prompt_text: currentPrompt + char });
    }
  };

  // ---------------------------------------------------------------------------
  // Handlers: CEFR Exam Preview Simulation
  // ---------------------------------------------------------------------------

  const handleOpenPreview = (test: TRKITest) => {
    setPreviewTest(test);
    setSelectedTestId(test.id);
    setPreviewQuestionIndex(0);
    setPreviewAnswers({});
    setPreviewFlagged({});
    setPreviewTimerSec(test.duration_minutes * 60);
    setIsPreviewOpen(true);
  };

  // Preview countdown timer
  useEffect(() => {
    if (!isPreviewOpen) return;
    const interval = setInterval(() => {
      setPreviewTimerSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPreviewOpen]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Preview Questions List
  const previewQuestions = useMemo(() => {
    if (!previewTest) return [];
    return questions
      .filter((q) => q.test_id === previewTest.id)
      .sort((a, b) => a.part_number - b.part_number || a.question_order - b.question_order);
  }, [previewTest, questions]);

  const currentPreviewQ = previewQuestions[previewQuestionIndex];

  // If unauthorized
  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Truy Cập Bị Từ Chối</h2>
          <p className="text-sm text-slate-600 mb-6">
            Tài khoản của bạn ({currentAdmin.email}) không có vai trò <b>academic_admin</b> hoặc{" "}
            <b>super_admin</b> theo quy định RBAC tại <b>PROJECT_SPEC.md Mục 3</b>.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0039A6] rounded-lg hover:bg-[#002d80] transition"
          >
            Quay lại Trang Chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-16 font-sans">
      {/* =====================================================================
          TOP HEADER: RUSI TRKI ADMIN CMS
      ====================================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#0039A6] via-[#0039A6] to-[#D52B1E] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              🇷🇺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  RUSI <span className="text-[#0039A6]">TRKI</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-[#0039A6] border border-blue-200">
                  <ShieldCheck className="w-3 h-3" />
                  Academic CMS
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Quản lý ngân hàng đề thi chuẩn CEFR & Giám sát học thuật
              </p>
            </div>
          </div>

          {/* Admin Profile & Mascot Chip */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{currentAdmin.full_name}</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#D52B1E] font-semibold uppercase">{currentAdmin.role}</span>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-sm" title="Mascot Rusika Lv.5">
                🐱
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="font-bold text-slate-800">Rusika Lv.{currentAdmin.mascot_level}</div>
                <div className="text-slate-500">{currentAdmin.current_season_outfit}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          PAGE TITLE & SUB-NAV
      ====================================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0039A6] uppercase tracking-wider mb-1">
                <span>Trụ cột 1</span>
                <span>•</span>
                <span>Luyện thi TRKI (Exam Simulation)</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Quản Trị Ngân Hàng Đề Thi & Câu Hỏi
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Đặc tả kỹ thuật bảng <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">trki_tests</code>,{" "}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">trki_questions</code>, và nhật ký{" "}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">admin_audit_logs</code>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenCreateTest}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0039A6] hover:bg-[#002d80] text-white text-sm font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                Tạo Đề Thi Mới
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 -mb-5">
            <button
              onClick={() => setActiveTab("tests")}
              className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
                activeTab === "tests"
                  ? "border-[#0039A6] text-[#0039A6]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              Danh Sách Đề Thi ({tests.length})
            </button>

            <button
              onClick={() => setActiveTab("questions")}
              className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
                activeTab === "questions"
                  ? "border-[#0039A6] text-[#0039A6]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Soạn Thảo Câu Hỏi (
              {activeTestObj ? `${currentTestQuestions.length} câu` : "Chọn đề"})
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
                activeTab === "audit"
                  ? "border-[#0039A6] text-[#0039A6]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <History className="w-4 h-4" />
              Nhật Ký Audit Logs ({auditLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN CONTENT AREA
      ====================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Tổng số đề thi</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{tests.length}</div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {tests.filter((t) => t.is_published).length} đề đã phát hành
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Tổng số câu hỏi</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{questions.length}</div>
            <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Ngân hàng A1 ➔ B2
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Phân loại PRO / Free</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {tests.filter((t) => t.is_pro_only).length} / {tests.filter((t) => !t.is_pro_only).length}
            </div>
            <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Khóa Paywall PRO
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase">Audit Records</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{auditLogs.length}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              Được bảo vệ toàn vẹn
            </div>
          </div>
        </div>

        {/* =====================================================================
            TAB 1: TESTS LIST & MANAGEMENT TABLE
        ====================================================================== */}
        {activeTab === "tests" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên đề hoặc ID..."
                    className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0039A6] w-48 sm:w-64"
                  />
                </div>

                {/* Level Filter */}
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                >
                  <option value="ALL">Mọi cấp độ (A1-B2)</option>
                  <option value="A1">A1 (ТЭУ)</option>
                  <option value="A2">A2 (ТБУ)</option>
                  <option value="B1">B1 (ТРКИ-1)</option>
                  <option value="B2">B2 (ТРКИ-2)</option>
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                >
                  <option value="ALL">Mọi trạng thái</option>
                  <option value="PUBLISHED">Đã phát hành</option>
                  <option value="DRAFT">Bản nháp</option>
                  <option value="PRO">Khóa PRO</option>
                  <option value="FREE">Miễn phí (Free)</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Hiển thị <b>{filteredTests.length}</b> / {tests.length} đề thi
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Cấp độ</th>
                    <th className="py-3 px-4">Tên Đề Thi</th>
                    <th className="py-3 px-4">Kỹ Năng</th>
                    <th className="py-3 px-4">Thời Gian</th>
                    <th className="py-3 px-4">Điểm Đậu</th>
                    <th className="py-3 px-4">Câu Hỏi</th>
                    <th className="py-3 px-4">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTests.map((test) => {
                    const testQCount = questions.filter((q) => q.test_id === test.id).length;
                    return (
                      <tr key={test.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded font-black text-xs ${
                              test.level === "A1"
                                ? "bg-emerald-100 text-emerald-800"
                                : test.level === "A2"
                                ? "bg-blue-100 text-blue-800"
                                : test.level === "B1"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {test.level}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs sm:max-w-md">
                          <div className="truncate">{test.title}</div>
                          <div className="text-xs font-mono text-slate-400 font-normal">{test.id}</div>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-xs font-medium text-slate-600">
                          {test.sub_test_type === "grammar_vocab" && "📐 Ngữ pháp & Từ vựng"}
                          {test.sub_test_type === "reading" && "📖 Đọc hiểu (Чтение)"}
                          {test.sub_test_type === "listening" && "🎧 Nghe hiểu (Аудирование)"}
                          {test.sub_test_type === "writing" && "✍️ Viết (Письмо)"}
                          {test.sub_test_type === "speaking" && "🎙️ Nói (Говорение)"}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600">
                          {test.duration_minutes} phút
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-xs font-bold text-slate-700">
                          {test.passing_score}%
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-xs font-medium">
                          <span className="inline-flex items-center gap-1 text-[#0039A6]">
                            <b>{testQCount}</b> câu
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1 items-start">
                            <button
                              onClick={() => handleTogglePublish(test)}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                                test.is_published
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200"
                              }`}
                              title="Click để đổi trạng thái phát hành"
                            >
                              {test.is_published ? (
                                <>
                                  <Check className="w-3 h-3" /> Đã phát hành
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" /> Bản nháp
                                </>
                              )}
                            </button>

                            {test.is_pro_only ? (
                              <span className="text-[10px] font-bold text-[#D52B1E] flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> Gói PRO
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-0.5">
                                <Unlock className="w-2.5 h-2.5" /> Miễn phí
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Preview Button */}
                            <button
                              onClick={() => handleOpenPreview(test)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                              title="Xem trước phòng thi CEFR"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Manage Questions */}
                            <button
                              onClick={() => {
                                setSelectedTestId(test.id);
                                setActiveTab("questions");
                              }}
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                              title="Soạn câu hỏi cho đề này"
                            >
                              <HelpCircle className="w-4 h-4" />
                            </button>

                            {/* Edit Test Metadata */}
                            <button
                              onClick={() => handleOpenEditTest(test)}
                              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                              title="Sửa thông tin đề thi"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete Test */}
                            <button
                              onClick={() => handleDeleteTest(test.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                              title="Xóa đề thi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredTests.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        Không tìm thấy đề thi nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: QUESTION BANK & EDITOR FOR CURRENT TEST
        ====================================================================== */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {/* Test Selector Banner */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0039A6] flex items-center justify-center font-bold text-lg">
                  📝
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Đang soạn câu hỏi cho đề:</div>
                  <div className="font-extrabold text-base text-slate-900">
                    {activeTestObj ? activeTestObj.title : "Chưa chọn đề thi"}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Cấp độ: <b>{activeTestObj?.level}</b> • Thời gian: <b>{activeTestObj?.duration_minutes} phút</b> •
                    Tổng số câu: <b>{currentTestQuestions.length}</b>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
                >
                  {tests.map((t) => (
                    <option key={t.id} value={t.id}>
                      [{t.level}] {t.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleOpenAddQuestion}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Thêm Câu Hỏi
                </button>

                {activeTestObj && (
                  <button
                    onClick={() => handleOpenPreview(activeTestObj)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#0039A6] border border-blue-200 hover:bg-blue-100 text-xs font-semibold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview CEFR
                  </button>
                )}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {currentTestQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                        #{q.question_order || idx + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#0039A6] border border-blue-100">
                        Part {q.part_number}
                      </span>
                      {q.image_url && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Ảnh minh họa
                        </span>
                      )}
                      {q.audio_url && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                          <Volume2 className="w-3 h-3" /> Audio R2
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditQuestion(q)}
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                        title="Sửa câu hỏi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Prompt Text */}
                  <div className="text-base font-medium text-slate-900 mb-3 font-serif">
                    {q.prompt_text}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const letter = ["A", "B", "C", "D"][optIdx];
                      const isCorrect = q.correct_option === letter;
                      return (
                        <div
                          key={optIdx}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between ${
                            isCorrect
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                              : "bg-slate-50 border-slate-200 text-slate-700"
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Đáp án chuẩn
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Banner */}
                  {q.explanation_text && (
                    <div className="bg-slate-50 border-l-4 border-[#0039A6] p-3 rounded-r-lg text-xs text-slate-600">
                      <span className="font-bold text-[#0039A6] block mb-0.5">
                        💡 Giải thích ngữ pháp (Zero-Answer-Leak - chỉ hiển thị sau khi nộp bài):
                      </span>
                      {q.explanation_text}
                    </div>
                  )}
                </div>
              ))}

              {currentTestQuestions.length === 0 && (
                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">Chưa có câu hỏi nào trong đề thi này</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Nhấn nút bên dưới để thêm câu hỏi đầu tiên theo đúng format chuẩn TRKI.
                  </p>
                  <button
                    onClick={handleOpenAddQuestion}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm câu hỏi mới
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: AUDIT LOGS (PROJECT_SPEC.md SECTION 3.3 & RULE 5)
        ====================================================================== */}
        {activeTab === "audit" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Nhật Ký Kiểm Toán Toàn Vẹn Hệ Thống (admin_audit_logs)
                </h3>
                <p className="text-xs text-slate-500">
                  Ghi lại 100% mọi thao tác Thêm / Sửa / Xóa đề thi và câu hỏi cùng địa chỉ IP và Admin ID.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                {auditLogs.length} sự kiện
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Thời gian</th>
                    <th className="py-3 px-4">Hành động</th>
                    <th className="py-3 px-4">Bảng tác động</th>
                    <th className="py-3 px-4">Mã bản ghi (ID)</th>
                    <th className="py-3 px-4">Người thực hiện</th>
                    <th className="py-3 px-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                        {new Date(log.created_at).toLocaleString("vi-VN")}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-sans font-bold text-[11px] ${
                            log.action_type.includes("CREATE")
                              ? "bg-emerald-100 text-emerald-800"
                              : log.action_type.includes("UPDATE") || log.action_type.includes("PUBLISH")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.action_type}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap font-bold text-slate-800">
                        {log.target_table}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                        {log.target_record_id}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap font-sans text-slate-700">
                        {log.admin_name}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                        {log.ip_address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL: THÊM / SỬA ĐỀ THI (trki_tests)
      ====================================================================== */}
      {isTestModalOpen && editingTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0039A6]" />
                {tests.some((t) => t.id === editingTest.id) ? "Chỉnh Sửa Đề Thi" : "Tạo Đề Thi Mới"}
              </h3>
              <button
                onClick={() => setIsTestModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTest} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tên đề thi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingTest.title || ""}
                  onChange={(e) => setEditingTest({ ...editingTest, title: e.target.value })}
                  placeholder="Ví dụ: Đề thi thử A1 (ТЭУ) — Ngữ pháp & Từ vựng căn bản"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cấp độ TRKI</label>
                  <select
                    value={editingTest.level || "A1"}
                    onChange={(e) => setEditingTest({ ...editingTest, level: e.target.value as TRKILevel })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                  >
                    <option value="A1">A1 (ТЭУ - Nhập môn)</option>
                    <option value="A2">A2 (ТБУ - Cơ bản)</option>
                    <option value="B1">B1 (ТРКИ-1 - Du học)</option>
                    <option value="B2">B2 (ТРКИ-2 - Chuyên nghiệp)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phân hệ kỹ năng</label>
                  <select
                    value={editingTest.sub_test_type || "grammar_vocab"}
                    onChange={(e) =>
                      setEditingTest({
                        ...editingTest,
                        sub_test_type: e.target.value as TRKISubTestType
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                  >
                    <option value="grammar_vocab">Ngữ pháp & Từ vựng</option>
                    <option value="reading">Đọc hiểu (Чтение)</option>
                    <option value="listening">Nghe hiểu (Аудирование)</option>
                    <option value="writing">Viết (Письмо)</option>
                    <option value="speaking">Nói (Говорение)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Thời gian làm bài (phút)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={180}
                    value={editingTest.duration_minutes || 60}
                    onChange={(e) =>
                      setEditingTest({
                        ...editingTest,
                        duration_minutes: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Điểm phần trăm đạt (%)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={editingTest.passing_score || 66}
                    onChange={(e) =>
                      setEditingTest({
                        ...editingTest,
                        passing_score: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0039A6]"
                  />
                  <span className="text-[11px] text-slate-400">Chuẩn TRKI: tối thiểu 66%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTest.is_pro_only ?? true}
                    onChange={(e) =>
                      setEditingTest({ ...editingTest, is_pro_only: e.target.checked })
                    }
                    className="w-4 h-4 text-[#0039A6] rounded border-slate-300 focus:ring-[#0039A6]"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Khóa nội dung gói PRO (Paywall - chỉ học viên PRO mới được thi)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTest.is_published ?? false}
                    onChange={(e) =>
                      setEditingTest({ ...editingTest, is_published: e.target.checked })
                    }
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Xuất bản ngay (Public ra ngoài trang chủ cho học viên thấy)
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0039A6] hover:bg-[#002d80] rounded-lg transition flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Lưu Đề Thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: THÊM / SỬA CÂU HỎI (trki_questions) + CYRILLIC KEYBAR
      ====================================================================== */}
      {isQuestionModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                {questions.some((q) => q.id === editingQuestion.id)
                  ? `Chỉnh Sửa Câu Hỏi #${editingQuestion.question_order}`
                  : "Thêm Câu Hỏi Mới Chuẩn TRKI"}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Part & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Part (Phần thi 1..4)
                  </label>
                  <select
                    value={editingQuestion.part_number || 1}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        part_number: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={1}>Part 1: Câu đơn ngữ pháp</option>
                    <option value={2}>Part 2: Điền từ vào đoạn hội thoại</option>
                    <option value={3}>Part 3: Đọc hiểu văn bản</option>
                    <option value={4}>Part 4: Cú pháp phức & Chuyên ngành</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Thứ tự câu hỏi (Order)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingQuestion.question_order || 1}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        question_order: Number(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Prompt Text with Cyrillic Keys */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Đề bài / Câu hỏi tiếng Nga <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Dùng ô trống: _______</span>
                </div>

                {/* Cyrillic Quick Keys Bar */}
                <div className="flex items-center gap-1 flex-wrap mb-2 p-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase px-1">Chèn nhanh:</span>
                  {CYRILLIC_KEYS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => handleInsertCyrillic(k)}
                      className="w-6 h-6 rounded bg-white hover:bg-blue-50 text-slate-800 hover:text-[#0039A6] font-bold text-xs border border-slate-300 flex items-center justify-center transition active:scale-95 shadow-2xs"
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <textarea
                  ref={promptTextareaRef}
                  required
                  rows={3}
                  value={editingQuestion.prompt_text || ""}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      prompt_text: e.target.value
                    })
                  }
                  placeholder="Ví dụ: Анна читаet интересную ______ в библиотеке."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-serif leading-relaxed"
                />
              </div>

              {/* Media URLs (Image / Audio Cloudflare R2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Image URL (Tùy chọn)
                  </label>
                  <input
                    type="url"
                    value={editingQuestion.image_url || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        image_url: e.target.value
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Audio URL R2 (Tùy chọn)
                  </label>
                  <input
                    type="url"
                    value={editingQuestion.audio_url || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        audio_url: e.target.value
                      })
                    }
                    placeholder="https://stream.rusitrki.com/..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Options Builder (A, B, C, D) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  4 Lựa chọn trả lời & Đáp án đúng (Zero-Answer-Leak)
                </label>
                {["A", "B", "C", "D"].map((letter, optIdx) => (
                  <div key={letter} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuestion({
                          ...editingQuestion,
                          correct_option: letter
                        })
                      }
                      className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center border transition flex-shrink-0 ${
                        editingQuestion.correct_option === letter
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
                      }`}
                      title={`Nhấp để chọn ${letter} là đáp án đúng`}
                    >
                      {letter}
                    </button>

                    <input
                      type="text"
                      required
                      value={editingQuestion.options?.[optIdx] || ""}
                      onChange={(e) => {
                        const nextOptions = [...(editingQuestion.options || ["", "", "", ""])];
                        nextOptions[optIdx] = e.target.value;
                        setEditingQuestion({
                          ...editingQuestion,
                          options: nextOptions
                        });
                      }}
                      placeholder={`Nội dung phương án ${letter}...`}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-serif"
                    />

                    {editingQuestion.correct_option === letter && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 flex-shrink-0">
                        ✓ Đúng
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Detailed Explanation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Giải thích quy tắc ngữ pháp chi tiết
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation_text || ""}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      explanation_text: e.target.value
                    })
                  }
                  placeholder="Giải thích vì sao chọn đáp án này, biến cách 6 cách hoặc quy tắc thể động từ..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  Lưu Câu Hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CEFR EXAM SIMULATION PREVIEW (FULLSCREEN PREVIEW)
      ====================================================================== */}
      {isPreviewOpen && previewTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col">
          {/* Top CEFR Simulation Header */}
          <header className="h-14 bg-[#0039A6] text-white px-4 sm:px-6 flex items-center justify-between shadow-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-black bg-white text-[#0039A6]">
                {previewTest.level} PREVIEW
              </span>
              <div className="font-bold text-sm truncate max-w-sm sm:max-w-md">
                {previewTest.title}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Server Countdown Mock */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-black/25 rounded-lg text-sm font-mono font-bold text-amber-300 border border-white/10">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(previewTimerSec)}</span>
              </div>

              {/* Admin Inspector Toggle */}
              <label className="hidden sm:flex items-center gap-1.5 text-xs font-semibold cursor-pointer bg-white/15 px-2.5 py-1 rounded-lg hover:bg-white/20 transition">
                <input
                  type="checkbox"
                  checked={previewAdminInspector}
                  onChange={(e) => setPreviewAdminInspector(e.target.checked)}
                  className="rounded text-[#D52B1E]"
                />
                <span>Admin Inspector (Hiện đáp án đúng)</span>
              </label>

              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition"
                title="Đóng preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Exam Body (Two Column Layout: Question Area + Question Palette) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
            {/* Left Column: Question Prompt & Answer Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
              {currentPreviewQ ? (
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 my-auto">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="font-bold text-xs uppercase text-[#0039A6]">
                      Câu hỏi {previewQuestionIndex + 1} / {previewQuestions.length} • Part {currentPreviewQ.part_number}
                    </span>

                    <button
                      onClick={() =>
                        setPreviewFlagged((prev) => ({
                          ...prev,
                          [currentPreviewQ.id]: !prev[currentPreviewQ.id]
                        }))
                      }
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition ${
                        previewFlagged[currentPreviewQ.id]
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {previewFlagged[currentPreviewQ.id] ? "Đã đặt cờ" : "Đặt cờ xem lại"}
                    </button>
                  </div>

                  {/* Optional Image */}
                  {currentPreviewQ.image_url && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 max-h-64 flex items-center justify-center bg-slate-50">
                      <img
                        src={currentPreviewQ.image_url}
                        alt="Đề bài"
                        className="object-contain max-h-64"
                      />
                    </div>
                  )}

                  {/* Optional Audio */}
                  {currentPreviewQ.audio_url && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-[#0039A6]" />
                      <div className="flex-1 text-xs text-slate-700 font-mono truncate">
                        {currentPreviewQ.audio_url}
                      </div>
                      <button className="px-3 py-1 bg-[#0039A6] text-white rounded text-xs font-semibold">
                        Phát audio
                      </button>
                    </div>
                  )}

                  {/* Question Prompt */}
                  <h2 className="text-xl font-serif text-slate-900 leading-relaxed mb-6 font-medium">
                    {currentPreviewQ.prompt_text}
                  </h2>

                  {/* Options Radio List */}
                  <div className="space-y-3 mb-6">
                    {currentPreviewQ.options.map((opt, optIdx) => {
                      const letter = ["A", "B", "C", "D"][optIdx];
                      const isSelected = previewAnswers[currentPreviewQ.id] === letter;
                      const isCorrect = currentPreviewQ.correct_option === letter;

                      return (
                        <div
                          key={letter}
                          onClick={() =>
                            setPreviewAnswers((prev) => ({
                              ...prev,
                              [currentPreviewQ.id]: letter
                            }))
                          }
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                            isSelected
                              ? "border-[#0039A6] bg-blue-50/50"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          } ${
                            previewAdminInspector && isCorrect
                              ? "ring-2 ring-emerald-500 ring-offset-1"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 font-serif text-slate-900 text-sm">
                            <span
                              className={`w-6 h-6 rounded-full font-sans font-bold text-xs flex items-center justify-center ${
                                isSelected
                                  ? "bg-[#0039A6] text-white"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {letter}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {previewAdminInspector && isCorrect && (
                            <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              ✓ Đáp án đúng
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Admin Inspector Explanation Box */}
                  {previewAdminInspector && currentPreviewQ.explanation_text && (
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed mb-6">
                      <b className="block text-amber-800 mb-1">
                        🛠️ Admin Inspector — Phân tích đáp án:
                      </b>
                      {currentPreviewQ.explanation_text}
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      disabled={previewQuestionIndex === 0}
                      onClick={() => setPreviewQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Câu trước
                    </button>

                    <button
                      disabled={previewQuestionIndex === previewQuestions.length - 1}
                      onClick={() =>
                        setPreviewQuestionIndex((prev) =>
                          Math.min(previewQuestions.length - 1, prev + 1)
                        )
                      }
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0039A6] hover:bg-[#002d80] disabled:opacity-40 transition flex items-center gap-1"
                    >
                      Câu kế tiếp
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-auto text-center text-slate-500">
                  Đề thi này chưa có câu hỏi nào để preview.
                </div>
              )}
            </div>

            {/* Right Column: Question Palette (CEFR Format) */}
            <aside className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-4 sm:p-5 flex flex-col flex-shrink-0">
              <div className="font-extrabold text-xs text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Bảng Câu Hỏi (Palette)</span>
                <span className="text-slate-400 font-normal">
                  {Object.keys(previewAnswers).length} / {previewQuestions.length} đã làm
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] text-slate-500 pb-3 mb-3 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600"></span> Đang làm
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Đã trả lời
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Đặt cờ
                </span>
              </div>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-64 md:max-h-none flex-1 content-start">
                {previewQuestions.map((q, idx) => {
                  const isCurrent = idx === previewQuestionIndex;
                  const isAnswered = Boolean(previewAnswers[q.id]);
                  const isFlagged = Boolean(previewFlagged[q.id]);

                  return (
                    <button
                      key={q.id}
                      onClick={() => setPreviewQuestionIndex(idx)}
                      className={`h-9 rounded-lg font-bold text-xs transition flex items-center justify-center relative border ${
                        isCurrent
                          ? "bg-[#0039A6] text-white border-[#0039A6] shadow-sm"
                          : isAnswered
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Simulated Submit Button */}
              <div className="pt-4 mt-auto border-t border-slate-100">
                <button
                  onClick={() => {
                    alert(
                      `Mô phỏng nộp bài TRKI thành công!\nTổng câu đã làm: ${
                        Object.keys(previewAnswers).length
                      }/${previewQuestions.length}`
                    );
                    setIsPreviewOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#D52B1E] to-[#B31F14] hover:opacity-95 shadow-sm transition"
                >
                  Nộp Bài Thi Thử
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
