# -*- coding: utf-8 -*-
"""
Căn mốc thời gian câu cho bài luyện nói Shadowing bằng WhisperX.

Quy trình cho mỗi bài có YouTube ID:
  1. Tải âm thanh (yt-dlp) -> chuyển WAV 16 kHz mono (ffmpeg của imageio-ffmpeg).
  2. WhisperX nhận dạng tiếng Nga + căn thời gian từng từ (wav2vec2).
  3. So khớp mờ từng câu `ru` của bài với chuỗi từ nhận dạng (theo thứ tự).
  4. Xuất báo cáo cũ/mới + file SQL cập nhật `public.speaking_lessons`.

Lưu ý: nhận dạng cả video một lượt có thể trôi mốc 10–20 s sau đoạn nhạc. Dùng
scripts/retime_speaking.py để dựng lại và kiểm chứng mốc trước khi xuất bản.

Script KHÔNG ghi gì vào Supabase. Xem báo cáo, rồi tự chạy file SQL
(SQL editor / MCP); trigger xuất bản sẽ cập nhật data/modules/speaking_sets.json.

Cài đặt (một lần, Python 3.10–3.12):
  py -3.10 -m venv %USERPROFILE%\\.venvs\\whisperx
  %USERPROFILE%\\.venvs\\whisperx\\Scripts\\pip install whisperx "yt-dlp[default]" deno imageio-ffmpeg rapidfuzz

Ví dụ:
  python scripts/whisperx_align_speaking.py --code YT_SPEAKING_BNyUiuPj0C8
  python scripts/whisperx_align_speaking.py --all --model medium
Kết quả nằm trong .tmp/whisperx/ (đã gitignore).
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent.parent
MODULE = ROOT / "data" / "modules" / "speaking_sets.json"
OUT = ROOT / ".tmp" / "whisperx"
SAMPLE_RATE = 16000

START_PAD = 0.15   # lùi đầu câu một chút để không mất phụ âm đầu
END_PAD = 0.30     # kéo dài cuối câu để không cụt âm cuối
MIN_SCORE = 70     # dưới ngưỡng này giữ mốc cũ, đánh dấu cần kiểm tra tay

TIME_KEYS_START = ("start", "startSec", "start_sec")
TIME_KEYS_END = ("end", "endSec", "end_sec")


def norm_token(t):
    t = t.lower().replace("ё", "е").replace("́", "")  # ё -> е, bỏ dấu trọng âm
    return re.sub(r"[^\w]", "", t)


def tokens(text):
    return [w for w in (norm_token(x) for x in (text or "").split()) if w]


def sentence_text(it):
    return it.get("ru") or it.get("text_ru") or it.get("text") or ""


def old_time(it, keys):
    for k in keys:
        if isinstance(it.get(k), (int, float)):
            return float(it[k])
    return None


# ---------- 1. Âm thanh ----------

def fetch_audio(yt_id):
    import imageio_ffmpeg
    import yt_dlp

    wav = OUT / f"{yt_id}.wav"
    if wav.exists():
        return wav
    OUT.mkdir(parents=True, exist_ok=True)
    opts = {
        "format": "bestaudio/best",
        "outtmpl": str(OUT / f"{yt_id}.src.%(ext)s"),
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        # YouTube cần JS runtime để giải challenge; deno cài kèm venv (pip install deno).
        # Biến thể player "tv" tránh lỗi solver với player mặc định (11/2026).
        "extractor_args": {"youtube": {"player_js_variant": ["tv"]}},
    }
    deno = Path(sys.executable).parent / ("deno.exe" if sys.platform == "win32" else "deno")
    if deno.exists():
        opts["js_runtimes"] = {"deno": {"path": str(deno)}}
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(f"https://www.youtube.com/watch?v={yt_id}", download=True)
        src = Path(ydl.prepare_filename(info))
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run([ffmpeg, "-y", "-loglevel", "error", "-i", str(src),
                    "-ac", "1", "-ar", str(SAMPLE_RATE), str(wav)], check=True)
    src.unlink(missing_ok=True)
    return wav


def load_wav(path):
    import wave
    import numpy as np

    with wave.open(str(path), "rb") as w:
        frames = w.readframes(w.getnframes())
    return np.frombuffer(frames, np.int16).astype(np.float32) / 32768.0


# ---------- 2. WhisperX ----------

_models = {}


def transcribe_words(yt_id, model_name, initial_prompt):
    cache = OUT / f"{yt_id}.{model_name}.words.json"
    if cache.exists():
        return json.loads(cache.read_text(encoding="utf-8"))

    import whisperx

    audio = load_wav(fetch_audio(yt_id))
    if model_name not in _models:
        _models[model_name] = whisperx.load_model(
            model_name, device="cpu", compute_type="int8", language="ru",
            asr_options={"initial_prompt": initial_prompt} if initial_prompt else None)
    if "align" not in _models:
        _models["align"] = whisperx.load_align_model(language_code="ru", device="cpu")
    result = _models[model_name].transcribe(audio, batch_size=8, language="ru")
    align_model, meta = _models["align"]
    aligned = whisperx.align(result["segments"], align_model, meta, audio, "cpu",
                             return_char_alignments=False)
    words = [{"w": w["word"], "s": w.get("start"), "e": w.get("end")}
             for w in aligned.get("word_segments", [])]
    cache.write_text(json.dumps(words, ensure_ascii=False, indent=0), encoding="utf-8")
    return words


# ---------- 3. So khớp câu ----------

def match_sentences(items, words):
    from rapidfuzz import fuzz

    wt = [norm_token(w["w"]) for w in words]
    cursor = 0
    out = []
    for it in items:
        toks = tokens(sentence_text(it))
        best = None
        if toks:
            target = " ".join(toks)
            n = len(toks)
            for i in range(cursor, len(words)):
                for L in range(max(1, n - 2), n + 3):
                    j = i + L
                    if j > len(words):
                        break
                    score = fuzz.ratio(target, " ".join(wt[i:j]))
                    if best is None or score > best[0]:
                        best = (score, i, j)
        if best and best[0] >= MIN_SCORE:
            score, i, j = best
            starts = [w["s"] for w in words[i:j] if w["s"] is not None]
            ends = [w["e"] for w in words[i:j] if w["e"] is not None]
            if starts and ends:
                out.append({"score": round(score), "start": starts[0], "end": ends[-1],
                            "heard": " ".join(w["w"] for w in words[i:j])})
                cursor = j
                continue
        out.append({"score": round(best[0]) if best else 0, "start": None, "end": None,
                    "heard": " ".join(w["w"] for w in words[best[1]:best[2]]) if best else ""})
    # Đệm đầu/cuối, không để câu sau chồng lên câu trước
    for k, m in enumerate(out):
        if m["start"] is None:
            continue
        prev_end = next((p["end"] for p in reversed(out[:k]) if p["end"] is not None), 0.0)
        nxt = next((q["start"] for q in out[k + 1:] if q["start"] is not None), None)
        m["start"] = round(max(m["start"] - START_PAD, prev_end, 0.0), 2)
        m["end"] = round(m["end"] + END_PAD if nxt is None else min(m["end"] + END_PAD, nxt - START_PAD), 2)
    return out


# ---------- 4. Báo cáo + SQL ----------

def sql_literal(s):
    return "'" + s.replace("'", "''") + "'"


def build_sql(code, n_items, patch):
    # patch: mảng cùng độ dài items, phần tử null = giữ nguyên câu đó
    p = sql_literal(json.dumps(patch, ensure_ascii=False)) + "::jsonb"

    def merged(expr):
        return (f"(SELECT jsonb_agg(CASE WHEN p.v IS NULL OR p.v = 'null'::jsonb THEN e ELSE e || p.v END ORDER BY a.ord) "
                f"FROM jsonb_array_elements({expr}) WITH ORDINALITY a(e, ord) "
                f"LEFT JOIN jsonb_array_elements({p}) WITH ORDINALITY p(v, pord) ON p.pord = a.ord)")

    def raw_part(key):
        expr = f"raw_data->'{key}'"
        return (f"    || CASE WHEN jsonb_typeof({expr}) = 'array' "
                f"THEN jsonb_build_object('{key}', {merged(expr)}) ELSE '{{}}'::jsonb END")

    return (
        f"-- {code}\n"
        f"UPDATE public.speaking_lessons SET\n"
        f"  items = {merged('items')},\n"
        f"  sentences = {merged('sentences')},\n"
        f"  raw_data = COALESCE(raw_data, '{{}}'::jsonb)\n"
        f"{raw_part('items')}\n"
        f"{raw_part('sentences')},\n"
        f"  updated_at = now()\n"
        f"WHERE code = {sql_literal(code)}\n"
        f"  AND jsonb_array_length(items) = {n_items}\n"
        f"  AND jsonb_array_length(sentences) = {n_items};\n"
    )


def process(lesson, model_name):
    code = lesson.get("code") or lesson.get("id")
    yt_id = lesson.get("youtube_id")
    items = lesson.get("items") or lesson.get("sentences") or []
    initial_prompt = " ".join(sentence_text(it) for it in items)[:800]
    words = transcribe_words(yt_id, model_name, initial_prompt)
    matches = match_sentences(items, words)

    rows, patch = [], []
    for idx, (it, m) in enumerate(zip(items, matches), 1):
        os_, oe = old_time(it, TIME_KEYS_START), old_time(it, TIME_KEYS_END)
        ok = m["start"] is not None
        rows.append({"idx": idx, "ru": sentence_text(it), "old": [os_, oe],
                     "new": [m["start"], m["end"]] if ok else None,
                     "score": m["score"], "heard": m["heard"]})
        if ok and (os_ != m["start"] or oe != m["end"]):
            v = {k: m["start"] for k in TIME_KEYS_START}
            v.update({k: m["end"] for k in TIME_KEYS_END})
            if "duration" in it:
                v["duration"] = round(m["end"] - m["start"], 2)
            patch.append(v)
        else:
            patch.append(None)

    # Lời thoại thật theo câu (mốc giây) — nguồn để soạn lại bài khi câu trong bài không có trong video
    lines, cur = [], []
    for w in words:
        cur.append(w)
        if w["w"].rstrip().endswith((".", "!", "?", "…")):
            lines.append(cur)
            cur = []
    if cur:
        lines.append(cur)
    transcript = []
    for ln in lines:
        s = next((w["s"] for w in ln if w["s"] is not None), None)
        e = next((w["e"] for w in reversed(ln) if w["e"] is not None), None)
        transcript.append({"start": s, "end": e, "text": " ".join(w["w"] for w in ln)})
    (OUT / f"{code}.transcript.txt").write_text(
        "\n".join(f"{t['start'] if t['start'] is not None else -1:7.2f} - {t['end'] if t['end'] is not None else -1:7.2f}  {t['text']}"
                  for t in transcript), encoding="utf-8")

    report = {"code": code, "youtube_id": yt_id, "model": model_name, "sentences": rows, "transcript": transcript}
    (OUT / f"{code}.align.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    matched = sum(1 for r in rows if r["new"])
    # Khớp dưới 80% thường là lời trong bài không phải lời thoại của video → không sinh SQL, cần soạn lại bài
    sql = build_sql(code, len(items), patch) if any(patch) and matched >= 0.8 * len(items) else ""
    if any(patch) and not sql:
        print(f"    !! Chỉ {matched}/{len(items)} câu có trong video — KHÔNG sinh SQL; xem {code}.transcript.txt để soạn lại bài.")

    def fmt(t):
        return "   -  " if t is None else f"{t:6.2f}"

    print(f"\n=== {code} ({yt_id}) — {lesson.get('title', '')}")
    for r in rows:
        o, n = r["old"], r["new"] or [None, None]
        flag = "" if r["new"] else "  << KIỂM TRA TAY"
        print(f"{r['idx']:>3}. {fmt(o[0])}-{fmt(o[1])}  ->  {fmt(n[0])}-{fmt(n[1])}  [{r['score']:>3}]  {r['ru'][:50]}{flag}")
    print(f"    {sum(1 for p in patch if p)}/{len(items)} câu đổi mốc; "
          f"{sum(1 for r in rows if not r['new'])} câu không khớp (giữ mốc cũ).")
    return sql


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--code", action="append", help="mã bài (lặp lại được), vd YT_SPEAKING_BNyUiuPj0C8")
    g.add_argument("--all", action="store_true", help="mọi bài có youtube_id và có câu")
    ap.add_argument("--model", default="medium", help="model Whisper: small | medium | large-v3 (mặc định medium)")
    args = ap.parse_args()

    lessons = json.loads(MODULE.read_text(encoding="utf-8"))
    pick = [l for l in lessons if l.get("youtube_id") and (l.get("items") or l.get("sentences"))
            and (args.all or (l.get("code") or l.get("id")) in args.code)]
    if not pick:
        sys.exit("Không có bài nào khớp (cần youtube_id và danh sách câu; bài PRO bị khoá không có câu trong file công khai).")

    OUT.mkdir(parents=True, exist_ok=True)
    sqls = []
    for l in pick:
        try:
            s = process(l, args.model)
            if s:
                sqls.append(s)
        except Exception as e:
            print(f"\n!!! {l.get('code')}: lỗi {type(e).__name__}: {e}")
    sql_path = OUT / "update_speaking_timestamps.sql"
    sql_path.write_text("BEGIN;\n\n" + "\n".join(sqls) + "\nCOMMIT;\n", encoding="utf-8")
    print(f"\nBáo cáo: {OUT}\\<code>.align.json\nSQL ({len(sqls)} bài): {sql_path}")


if __name__ == "__main__":
    main()
