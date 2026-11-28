/**
 * admin-monitor.js — Màn hình "Theo dõi học viên" của CMS (chỉ đọc).
 * Thiết bị đăng nhập, bài viết đã nộp, bài thi TRKI, hoạt động luyện tập, tiến độ, lượt chấm AI, nhật ký hoạt động.
 * Mỗi lần chỉ tải 1 trang (25 dòng, .range) — không quét cả bảng. Quyền đọc: RLS "Admins read ..." (is_admin)
 * và RPC rusi_admin_audit_logs / rusi_admin_user_emails (kiểm tra is_admin phía server).
 * Phụ thuộc: admin.js (window.RusiAdmin, window.SupabaseSyncEngine).
 */
(function () {
  "use strict";

  const PAGE = 25;
  const A = () => window.RusiAdmin || {};
  const esc = (s) => (A().esc ? A().esc(s) : String(s == null ? "" : s));
  const sbClient = () => (window.SupabaseSyncEngine && window.SupabaseSyncEngine.getClient ? window.SupabaseSyncEngine.getClient() : null);
  const fmt = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d) ? esc(iso) : d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const num = (v, suffix = "") => (v == null || v === "" ? "—" : esc(Number(v).toLocaleString("vi-VN")) + suffix);
  const yes = (v) => (v ? `<span class="p-pill p-pill-success">Có</span>` : `<span class="p-pill p-pill-neutral">Không</span>`);
  const dur = (sec) => {
    const s = Number(sec) || 0;
    if (!s) return "—";
    const m = Math.floor(s / 60);
    return m ? `${m} phút ${s % 60}s` : `${s}s`;
  };

  const people = new Map(); // user_id → { name, email }
  const state = { tab: "devices", page: 0, user: "", rows: [], total: null, loading: false, error: "" };

  const TABS = [
    {
      id: "devices", label: "Thiết bị đăng nhập", table: "user_device_sessions",
      select: "id,user_id,device_name,device_type,browser,os,ip_address,is_active,last_active_at,created_at",
      order: "last_active_at",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Thiết bị", (r) => `${esc(r.device_name || r.device_type || "—")}<div class="rusi-mon-sub">${esc([r.browser, r.os].filter(Boolean).join(" · "))}</div>`],
        ["IP", (r) => esc(r.ip_address || "—")],
        ["Đang dùng", (r) => yes(r.is_active)],
        ["Hoạt động cuối", (r) => fmt(r.last_active_at)]
      ]
    },
    {
      id: "writing", label: "Bài viết đã nộp", table: "writing_submissions",
      select: "id,user_id,prompt_snapshot,word_count,status,overall_score,submitted_at,graded_at,student_text,ai_feedback,teacher_notes",
      order: "submitted_at",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Đề bài", (r) => esc((r.prompt_snapshot && (r.prompt_snapshot.title || r.prompt_snapshot.code)) || "—")],
        ["Số từ", (r) => num(r.word_count)],
        ["Trạng thái", (r) => `<span class="p-pill p-pill-info">${esc(r.status || "—")}</span>`],
        ["Điểm", (r) => num(r.overall_score)],
        ["Nộp lúc", (r) => fmt(r.submitted_at)]
      ],
      detail: (r) => `
        <div class="rusi-mon-detail-block"><strong>Bài làm</strong><pre>${esc(r.student_text || "")}</pre></div>
        ${r.ai_feedback ? `<div class="rusi-mon-detail-block"><strong>Nhận xét AI</strong><pre>${esc(typeof r.ai_feedback === "string" ? r.ai_feedback : JSON.stringify(r.ai_feedback, null, 2))}</pre></div>` : ""}
        ${r.teacher_notes ? `<div class="rusi-mon-detail-block"><strong>Ghi chú giáo viên</strong><pre>${esc(r.teacher_notes)}</pre></div>` : ""}`
    },
    {
      id: "trki", label: "Bài thi TRKI", table: "trki_submissions",
      select: "id,user_id,exam_id,score_percent,passed,section_scores,time_spent_sec,submitted_at",
      order: "submitted_at",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Đề", (r) => `<code>${esc(r.exam_id || "—")}</code>`],
        ["Điểm", (r) => num(r.score_percent, "%")],
        ["Đạt", (r) => yes(r.passed)],
        ["Thời gian", (r) => dur(r.time_spent_sec)],
        ["Nộp lúc", (r) => fmt(r.submitted_at)]
      ],
      detail: (r) => `<div class="rusi-mon-detail-block"><strong>Điểm từng phần</strong><pre>${esc(JSON.stringify(r.section_scores || {}, null, 2))}</pre></div>`
    },
    {
      id: "practice", label: "Hoạt động luyện tập", table: "practice_logs",
      select: "id,user_id,skill_type,item_id,item_title,score,duration_seconds,xp_earned,created_at",
      order: "created_at",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Kỹ năng", (r) => esc(r.skill_type || "—")],
        ["Bài", (r) => esc(r.item_title || r.item_id || "—")],
        ["Điểm", (r) => num(r.score)],
        ["Thời lượng", (r) => dur(r.duration_seconds)],
        ["XP", (r) => num(r.xp_earned)],
        ["Lúc", (r) => fmt(r.created_at)]
      ]
    },
    {
      id: "progress", label: "Tiến độ", table: "user_progress",
      select: "user_id,xp_total,streak_count,last_study_date,updated_at",
      order: "updated_at",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Tổng XP", (r) => num(r.xp_total)],
        ["Chuỗi ngày", (r) => num(r.streak_count)],
        ["Học gần nhất", (r) => esc(r.last_study_date || "—")],
        ["Cập nhật", (r) => fmt(r.updated_at)]
      ]
    },
    {
      id: "ai", label: "Lượt chấm AI", table: "user_ai_usage",
      select: "id,user_id,usage_date,used_count,max_limit,is_pro,last_used_at",
      order: "usage_date",
      cols: [
        ["Học viên", (r) => who(r.user_id)],
        ["Ngày", (r) => esc(r.usage_date || "—")],
        ["Đã dùng", (r) => `${num(r.used_count)} / ${num(r.max_limit)}`],
        ["PRO", (r) => yes(r.is_pro)],
        ["Lần cuối", (r) => fmt(r.last_used_at)]
      ]
    },
    {
      id: "audit", label: "Nhật ký hoạt động", rpc: "rusi_admin_audit_logs", noUserFilter: true,
      cols: [
        ["Lúc", (r) => fmt(r.occurred_at)],
        ["Người thực hiện", (r) => (r.actor_id ? who(r.actor_id) : esc(r.db_role || "hệ thống"))],
        ["Hành động", (r) => `<span class="p-pill p-pill-info">${esc(r.action || "—")}</span>`],
        ["Bảng", (r) => `<code>${esc(r.entity_table || "—")}</code>`],
        ["Bản ghi", (r) => `<code class="rusi-mon-key">${esc(r.entity_key ? JSON.stringify(r.entity_key) : "—")}</code>`],
        ["Cột đổi", (r) => esc((r.changed_columns || []).join(", ") || "—")]
      ]
    }
  ];

  function who(uid) {
    if (!uid) return "—";
    const p = people.get(uid);
    const main = p && (p.email || p.name);
    return `${esc(main || String(uid).slice(0, 8) + "…")}${p && p.email && p.name ? `<div class="rusi-mon-sub">${esc(p.name)}</div>` : ""}`;
  }

  async function loadPeople(sb, ids) {
    const missing = Array.from(new Set(ids.filter((id) => id && !people.has(id))));
    if (!missing.length) return;
    const [{ data: profs }, { data: mails, error: mailErr }] = await Promise.all([
      sb.from("profiles").select("id,full_name").in("id", missing),
      sb.rpc("rusi_admin_user_emails", { p_ids: missing })
    ]);
    if (mailErr) console.warn("[Monitor] Không đọc được email:", mailErr);
    missing.forEach((id) => people.set(id, { name: "", email: "" }));
    (profs || []).forEach((p) => { people.get(p.id).name = p.full_name || ""; });
    (mails || []).forEach((m) => { if (people.has(m.id)) people.get(m.id).email = m.email || ""; });
  }

  async function loadUserOptions(sb) {
    if (state.userOptions) return;
    const { data, error } = await sb.from("profiles").select("id,full_name").order("full_name").limit(500);
    if (error) { console.warn("[Monitor] Không đọc được danh sách học viên:", error); state.userOptions = []; return; }
    state.userOptions = data || [];
    await loadPeople(sb, state.userOptions.map((p) => p.id));
  }

  async function fetchPage() {
    const sb = sbClient();
    if (!sb) { state.error = "Chưa kết nối Supabase."; return; }
    const tab = TABS.find((t) => t.id === state.tab);
    const from = state.page * PAGE;
    state.loading = true;
    state.error = "";
    try {
      await loadUserOptions(sb);
      if (tab.rpc) {
        const { data, error } = await sb.rpc(tab.rpc, { p_limit: PAGE + 1, p_offset: from });
        if (error) throw error;
        state.hasMore = (data || []).length > PAGE;
        state.rows = (data || []).slice(0, PAGE);
        state.total = null;
      } else {
        let q = sb.from(tab.table).select(tab.select, { count: "exact" }).order(tab.order, { ascending: false, nullsFirst: false }).range(from, from + PAGE - 1);
        if (state.user) q = q.eq("user_id", state.user);
        const { data, error, count } = await q;
        if (error) throw error;
        state.rows = data || [];
        state.total = count;
        state.hasMore = count != null ? from + PAGE < count : state.rows.length === PAGE;
      }
      await loadPeople(sb, state.rows.map((r) => r.user_id || r.actor_id));
    } catch (err) {
      console.error("[Monitor] Lỗi tải dữ liệu:", err);
      state.error = (err && err.message) || String(err);
      state.rows = [];
    } finally {
      state.loading = false;
    }
  }

  function draw(container) {
    const tab = TABS.find((t) => t.id === state.tab);
    const from = state.page * PAGE;
    const userOpts = (state.userOptions || []).map((p) => {
      const info = people.get(p.id) || {};
      return `<option value="${esc(p.id)}" ${state.user === p.id ? "selected" : ""}>${esc(info.email || p.full_name || p.id)}${info.email && p.full_name ? " — " + esc(p.full_name) : ""}</option>`;
    }).join("");
    container.innerHTML = `
      <div class="payload-list-header">
        <div class="payload-list-title-wrap">
          <h1 class="payload-list-title">Theo dõi học viên</h1>
          <span class="p-pill p-pill-neutral">Chỉ xem</span>
        </div>
      </div>
      <div class="rusi-mon-tabs" role="tablist">
        ${TABS.map((t) => `<button type="button" role="tab" class="rusi-mon-tab ${t.id === state.tab ? "active" : ""}" aria-selected="${t.id === state.tab}" data-tab="${t.id}">${esc(t.label)}</button>`).join("")}
      </div>
      <div class="rusi-mon-toolbar">
        ${tab.noUserFilter ? "" : `<label class="rusi-mon-filter"><span>Học viên</span>
          <select class="p-select" id="monUserFilter"><option value="">Tất cả</option>${userOpts}</select></label>`}
        <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="monRefresh">Tải lại</button>
      </div>
      ${state.error ? `<div class="rusi-mon-error">Không tải được dữ liệu: ${esc(state.error)}</div>` : ""}
      <div class="payload-table-wrapper">
        <div class="payload-table-scroll">
          <table class="payload-table rusi-mon-table">
            <thead><tr>${tab.cols.map((c) => `<th>${esc(c[0])}</th>`).join("")}${tab.detail ? "<th></th>" : ""}</tr></thead>
            <tbody>
              ${state.loading ? `<tr><td colspan="${tab.cols.length + 1}" class="rusi-mon-empty">Đang tải…</td></tr>` :
                (state.rows.length ? state.rows.map((r, i) => `
                  <tr>${tab.cols.map((c) => `<td data-label="${esc(c[0])}">${c[1](r)}</td>`).join("")}
                    ${tab.detail ? `<td><button type="button" class="p-btn p-btn-ghost p-btn-sm rusi-mon-more" data-i="${i}">Xem</button></td>` : ""}</tr>
                  ${tab.detail ? `<tr class="rusi-mon-detail" id="monDetail${i}" hidden><td colspan="${tab.cols.length + 1}">${tab.detail(r)}</td></tr>` : ""}`).join("")
                : `<tr><td colspan="${tab.cols.length + 1}" class="rusi-mon-empty">Chưa có dữ liệu.</td></tr>`)}
            </tbody>
          </table>
        </div>
      </div>
      <div class="payload-pagination">
        <div>${state.rows.length ? `Hiển thị <strong>${from + 1}</strong> – <strong>${from + state.rows.length}</strong>${state.total != null ? ` trên <strong>${state.total}</strong>` : ""}` : ""}</div>
        <div style="display:flex;gap:8px">
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="monPrev" ${state.page === 0 ? "disabled" : ""}>← Trang trước</button>
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" id="monNext" ${state.hasMore ? "" : "disabled"}>Trang sau →</button>
        </div>
      </div>`;

    container.querySelectorAll(".rusi-mon-tab").forEach((b) => {
      b.onclick = () => { state.tab = b.getAttribute("data-tab"); state.page = 0; Monitor.render(container); };
    });
    const uf = container.querySelector("#monUserFilter");
    if (uf) uf.onchange = () => { state.user = uf.value; state.page = 0; Monitor.render(container); };
    container.querySelector("#monRefresh").onclick = () => Monitor.render(container);
    container.querySelector("#monPrev").onclick = () => { if (state.page > 0) { state.page--; Monitor.render(container); } };
    container.querySelector("#monNext").onclick = () => { if (state.hasMore) { state.page++; Monitor.render(container); } };
    container.querySelectorAll(".rusi-mon-more").forEach((b) => {
      b.onclick = () => {
        const row = container.querySelector("#monDetail" + b.getAttribute("data-i"));
        if (row) { row.hidden = !row.hidden; b.textContent = row.hidden ? "Xem" : "Ẩn"; }
      };
    });
  }

  const Monitor = {
    async render(container) {
      if (!container) return;
      state.loading = true;
      draw(container);
      await fetchPage();
      if (container.isConnected) draw(container);
    }
  };

  window.RusiAdminMonitor = Monitor;
})();
