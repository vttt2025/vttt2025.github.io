/**
 * admin-subtitle-import.js — Modal "Nhập phụ đề" (importSpeakingTranscriptModal) cho trình dựng Luyện nói (SPEAKING_SETS).
 *
 * Dán hoặc chọn file SRT / VTT / JSON → tách thành câu thoại (mốc giây, người nói, câu Nga, bản dịch Việt)
 * → xem trước + danh sách lỗi → bấm Áp dụng mới ghi vào State.currentDraft.items (chưa lưu Cloud cho tới khi bấm Lưu).
 * Phụ thuộc: admin.js (window.State, window.RusiAdmin, window.refreshStructureTab).
 */
(function () {
  "use strict";

  const MODAL_ID = "importSpeakingTranscriptModal";
  const CYR = /[Ѐ-ӿ]/;
  const A = () => window.RusiAdmin || {};
  const esc = (s) => (A().esc ? A().esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])));
  const toast = (msg, type) => (A().toast ? A().toast(msg, type) : console.log(msg));
  const round2 = (n) => Math.round(n * 100) / 100;

  // "01:02:03,450" | "02:03.450" | "3.5" | 3.5 → giây (số) hoặc null nếu không đọc được
  function parseTime(v) {
    if (typeof v === "number") return Number.isFinite(v) && v >= 0 ? v : null;
    const s = String(v == null ? "" : v).trim();
    if (!s) return null;
    if (/^\d+(\.\d+)?$/.test(s)) return Number(s);
    const m = s.match(/^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/);
    if (!m) return null;
    const ms = m[4] ? Number((m[4] + "00").slice(0, 3)) : 0;
    return (Number(m[1] || 0) * 3600) + (Number(m[2]) * 60) + Number(m[3]) + ms / 1000;
  }

  function cleanLine(line) {
    return String(line)
      .replace(/\{\\[^}]*\}/g, "")          // {\an8} của SRT
      .replace(/<\/?(?:i|b|u|c|ruby|rt|lang)[^>]*>/gi, "")
      .replace(/<\d{1,2}:\d{2}[^>]*>/g, "")  // mốc karaoke trong VTT
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .trim();
  }

  function makeItem(i, start, end, who, ru, vi) {
    return {
      id: Date.now() + i,
      who: who || "",
      startSec: round2(start), endSec: round2(end), start: round2(start), end: round2(end),
      ru, text_ru: ru, text_stressed: ru,
      vi: vi || "", translation_vi: vi || ""
    };
  }

  // Dòng có chữ Kirin → câu Nga; dòng còn lại → bản dịch. "<v Tên>" (VTT) hoặc "Tên: ..." (≤ 30 ký tự) → người nói
  function splitCueText(lines) {
    let who = "";
    const ru = [];
    const vi = [];
    lines.forEach((raw) => {
      let line = raw;
      const v = line.match(/<v(?:\.[^\s>]+)?\s+([^>]+)>/i);
      if (v) { if (!who) who = v[1].trim(); line = line.replace(/<\/?v[^>]*>/gi, ""); }
      line = cleanLine(line);
      if (!line) return;
      const sp = line.match(/^([^:]{1,30}):\s+(.+)$/);
      if (sp && !/\d/.test(sp[1]) && sp[1].trim().split(/\s+/).length <= 3 && ru.length === 0 && vi.length === 0) { if (!who) who = sp[1].trim(); line = sp[2]; }
      (CYR.test(line) ? ru : vi).push(line);
    });
    return { who, ru: ru.join(" ").trim(), vi: vi.join(" ").trim() };
  }

  function parseCues(text, isVtt) {
    const items = [];
    const errors = [];
    const blocks = text.replace(/\r\n?/g, "\n").split(/\n[ \t]*\n+/);
    blocks.forEach((block, bi) => {
      const lines = block.split("\n").map((l) => l.replace(/\s+$/, "")).filter((l) => l.trim() !== "");
      if (!lines.length) return;
      if (isVtt && (/^WEBVTT/.test(lines[0]) || /^(NOTE|STYLE|REGION)\b/.test(lines[0]))) return;
      const ti = lines.findIndex((l) => l.includes("-->"));
      const label = `Khối ${bi + 1}`;
      if (ti === -1) { errors.push(`${label}: không có dòng mốc thời gian "00:00:01,000 --> 00:00:03,000".`); return; }
      const [a, b] = lines[ti].split("-->");
      const start = parseTime(a);
      const end = parseTime(String(b || "").trim().split(/\s+/)[0]);
      if (start == null || end == null) { errors.push(`${label}: mốc thời gian không hợp lệ "${lines[ti].trim()}".`); return; }
      if (end <= start) { errors.push(`${label}: thời điểm kết thúc (${round2(end)}s) phải lớn hơn bắt đầu (${round2(start)}s).`); return; }
      const cue = splitCueText(lines.slice(ti + 1));
      if (!cue.ru) { errors.push(`${label} (${round2(start)}s): không có câu tiếng Nga (chữ Kirin).`); return; }
      items.push(makeItem(items.length, start, end, cue.who, cue.ru, cue.vi));
    });
    return { items, errors };
  }

  function parseJson(text) {
    let data;
    try { data = JSON.parse(text); } catch (err) { return { items: [], errors: ["JSON không hợp lệ: " + err.message] }; }
    const arr = Array.isArray(data) ? data : (data && (data.items || data.sentences || data.lines || data.segments));
    if (!Array.isArray(arr)) return { items: [], errors: ["JSON phải là mảng câu, hoặc đối tượng có khoá items / sentences."] };
    const items = [];
    const errors = [];
    arr.forEach((o, i) => {
      const label = `Phần tử ${i + 1}`;
      if (!o || typeof o !== "object") { errors.push(`${label}: không phải đối tượng.`); return; }
      const start = parseTime(o.startSec ?? o.start_sec ?? o.start ?? o.from);
      let end = parseTime(o.endSec ?? o.end_sec ?? o.end ?? o.to);
      if (end == null && start != null && o.duration != null) { const d = parseTime(o.duration); if (d != null) end = start + d; }
      if (start == null || end == null) { errors.push(`${label}: thiếu hoặc sai start/end.`); return; }
      if (end <= start) { errors.push(`${label}: end (${round2(end)}s) phải lớn hơn start (${round2(start)}s).`); return; }
      const ru = cleanLine(o.text_stressed || o.text_ru || o.ru || o.text || "");
      if (!ru) { errors.push(`${label} (${round2(start)}s): thiếu câu tiếng Nga (ru / text_ru / text).`); return; }
      items.push(makeItem(items.length, start, end, String(o.who || o.speaker || "").trim(), ru, cleanLine(o.translation_vi || o.vi || "")));
    });
    return { items, errors };
  }

  function parse(text) {
    const t = String(text || "").replace(/^﻿/, "").trim();
    if (!t) return { format: "", items: [], errors: ["Chưa có nội dung phụ đề."] };
    let res;
    let format;
    if (t[0] === "[" || t[0] === "{") { format = "JSON"; res = parseJson(t); }
    else if (/^WEBVTT/.test(t)) { format = "VTT"; res = parseCues(t, true); }
    else { format = "SRT"; res = parseCues(t, false); }
    res.items.sort((x, y) => x.startSec - y.startSec);
    if (!res.items.length && !res.errors.length) res.errors.push("Không tìm thấy câu thoại nào.");
    return { format, items: res.items, errors: res.errors };
  }

  function renderPreview(box, result) {
    const errHtml = result.errors.length ? `
      <div role="alert" style="margin-bottom:10px;padding:10px 12px;border-radius:8px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.35);color:var(--p-danger,#dc2626);font-size:12.5px">
        <strong>${result.errors.length} lỗi — các khối này sẽ bị bỏ qua:</strong>
        <ul style="margin:6px 0 0 18px;padding:0">${result.errors.slice(0, 30).map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
        ${result.errors.length > 30 ? `<div>… và ${result.errors.length - 30} lỗi khác.</div>` : ""}
      </div>` : "";
    const rows = result.items.map((it, i) => `
      <div style="padding:8px 10px;margin-bottom:6px;border-radius:8px;border:1px solid var(--p-border-subtle,#e5e7eb);background:var(--p-surface,#fff)">
        <div style="font-size:11.5px;color:var(--p-text-muted,#6b7280)">#${i + 1} · ${it.startSec}s → ${it.endSec}s${it.who ? " · " + esc(it.who) : ""}</div>
        <div style="font-size:13.5px;font-weight:600;color:var(--p-text,#1f2937);overflow-wrap:anywhere">${esc(it.ru)}</div>
        ${it.vi ? `<div style="font-size:12.5px;color:var(--p-text-muted,#4b5563);overflow-wrap:anywhere">${esc(it.vi)}</div>` : ""}
      </div>`).join("");
    box.innerHTML = `
      ${result.format ? `<div style="font-size:12.5px;margin-bottom:8px;color:var(--p-text,#1f2937)">Định dạng: <strong>${result.format}</strong> · Đọc được <strong>${result.items.length}</strong> câu.</div>` : ""}
      ${errHtml}${rows}`;
  }

  function open() {
    const State = window.State;
    if (!State || !State.currentDraft) { toast("Chưa mở bài Luyện nói nào để nhập phụ đề.", "error"); return; }
    const old = document.getElementById(MODAL_ID);
    if (old) old.remove();
    const existing = Array.isArray(State.currentDraft.items) ? State.currentDraft.items.length : 0;
    let result = null;

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.className = "payload-modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.style.cssText = "display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;backdrop-filter:blur(4px);padding:12px;box-sizing:border-box";
    modal.innerHTML = `
      <div class="payload-modal" style="width:100%;max-width:760px;max-height:90vh;display:flex;flex-direction:column;background:var(--p-surface-elevated,#fff);border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.3);border:1px solid var(--p-border-subtle,#e5e7eb);overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:14px 16px;border-bottom:1px solid var(--p-border-subtle,#e5e7eb)">
          <div style="min-width:0">
            <div style="font-weight:700;font-size:16px;color:var(--p-text,#1f2937)">Nhập phụ đề SRT / VTT / JSON</div>
            <div style="font-size:12px;color:var(--p-text-muted,#6b7280)">Dòng có chữ Kirin là câu tiếng Nga, dòng còn lại là bản dịch. Xem trước rồi mới áp dụng.</div>
          </div>
          <button type="button" class="p-btn-icon" data-act="close" aria-label="Đóng" style="font-size:18px;min-width:44px;min-height:44px">✕</button>
        </div>
        <div style="flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            <input type="file" accept=".srt,.vtt,.json,.txt" data-act="file" class="p-input" style="flex:1;min-width:200px;font-size:13px" />
            <select data-act="mode" class="p-input" style="font-size:13px;width:auto">
              <option value="replace"${existing ? "" : " selected"}>Thay thế toàn bộ câu hiện có</option>
              <option value="append"${existing ? " selected" : ""}>Nối vào sau ${existing} câu hiện có</option>
            </select>
          </div>
          <textarea data-act="text" class="p-input" rows="8" spellcheck="false" placeholder="1&#10;00:00:01,000 --> 00:00:03,500&#10;Câu tiếng Nga&#10;Bản dịch tiếng Việt" style="font-family:monospace;font-size:13px;min-height:140px;resize:vertical"></textarea>
          <div data-act="preview"></div>
        </div>
        <div style="display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;padding:12px 16px;border-top:1px solid var(--p-border-subtle,#e5e7eb)">
          <button type="button" class="p-btn p-btn-secondary p-btn-sm" data-act="parse">Phân tích &amp; xem trước</button>
          <button type="button" class="p-btn p-btn-primary p-btn-sm" data-act="apply" disabled>Áp dụng</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const q = (a) => modal.querySelector(`[data-act="${a}"]`);
    const ta = q("text");
    const applyBtn = q("apply");
    const close = () => { modal.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const invalidate = () => { result = null; applyBtn.disabled = true; applyBtn.textContent = "Áp dụng"; q("preview").innerHTML = ""; };
    const runParse = () => {
      result = parse(ta.value);
      renderPreview(q("preview"), result);
      applyBtn.disabled = !result.items.length;
      applyBtn.textContent = result.items.length ? `Áp dụng ${result.items.length} câu` : "Áp dụng";
    };

    q("close").onclick = close;
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    ta.addEventListener("input", invalidate);
    q("parse").onclick = runParse;
    q("file").onchange = (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (f.size > 2 * 1024 * 1024) { toast("File phụ đề quá lớn (tối đa 2MB).", "error"); e.target.value = ""; return; }
      const reader = new FileReader();
      reader.onload = () => { ta.value = String(reader.result || ""); runParse(); };
      reader.onerror = () => toast("Không đọc được file: " + (reader.error ? reader.error.message : f.name), "error");
      reader.readAsText(f, "utf-8");
    };
    applyBtn.onclick = () => {
      if (!result || !result.items.length) return;
      const d = window.State && window.State.currentDraft;
      if (!d) { toast("Bài đang soạn đã đóng — không áp dụng được.", "error"); return; }
      const cur = Array.isArray(d.items) ? d.items : [];
      const append = q("mode").value === "append";
      if (!append && cur.length && !confirm(`Thay thế ${cur.length} câu hiện có bằng ${result.items.length} câu từ phụ đề?`)) return;
      d.items = append ? cur.concat(result.items) : result.items;
      d.sentences = d.items;
      close();
      if (typeof window.refreshStructureTab === "function") window.refreshStructureTab();
      toast(`Đã nhập ${result.items.length} câu thoại từ phụ đề${result.errors.length ? ` (bỏ qua ${result.errors.length} khối lỗi)` : ""}. Bấm Lưu để ghi lên Cloud.`, "success");
    };
    ta.focus();
  }

  window.RusiSubtitleImport = { parse, parseTime };
  window.openImportSpeakingTranscriptModal = open;
})();
