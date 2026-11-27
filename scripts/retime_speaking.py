# -*- coding: utf-8 -*-
"""
Dựng lại mốc thời gian câu cho bài Shadowing (giữ nguyên chữ), kèm kiểm chứng từng đoạn.

Vì sao cần: nhận dạng cả video một lượt (whisperx_align_speaking.py) có thể trôi mốc
10–20 giây sau đoạn nhạc/ảo giác của Whisper → học viên bấm câu thì video phát nhầm đoạn.

Cách làm cho mỗi bài:
  1. Nhận dạng theo cửa sổ 30 s (bước 20 s), chỉ giữ từ ở phần giữa cửa sổ → mốc không trôi.
  2. Tìm từng câu `ru` theo đúng thứ tự (so khớp mờ), đệm đầu 0,25 s / cuối 0,35 s, không chồng câu sau.
  3. Cắt đúng đoạn [start, end], nhận dạng lại và chấm điểm so với chữ của câu (cột `nghe`).
  4. Xuất báo cáo + SQL chỉ đổi start/startSec/start_sec/end/endSec/end_sec.

Script KHÔNG ghi Supabase. Đọc báo cáo, sửa tay câu điểm thấp bằng --override, rồi chạy SQL
(trigger xuất bản sẽ cập nhật data/modules/speaking_sets.json).

Cài đặt: xem whisperx_align_speaking.py (cần faster-whisper, rapidfuzz, yt-dlp, imageio-ffmpeg).
Ví dụ:
  python scripts/retime_speaking.py --code YT_SPEAKING_mBKbcxorZWg
  python scripts/retime_speaking.py --code YT_SPEAKING_EOXmclbJXkM --override 4=101.95:106.4
Kết quả: .tmp/whisperx/retime_<code>.json, retime_<code>.sql
"""

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from whisperx_align_speaking import MODULE, OUT, SAMPLE_RATE, fetch_audio, load_wav  # noqa: E402

WIN, STEP, EDGE = 30.0, 20.0, 5.0
START_PAD, END_PAD, GAP = 0.25, 0.35, 0.1
SEARCH_AHEAD = 90.0   # chỉ tìm câu kế tiếp trong 90 s sau câu trước
MIN_MATCH = 60
NUM = {"1": "один", "2": "два", "3": "три",
       "4": "четыре", "5": "пять"}

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


def nw(t):
    t = re.sub(r"[^\w]", "", t.lower().replace("ё", "е").replace("́", ""))
    return NUM.get(t, t)


def toks(text):
    return [w for w in (nw(x) for x in (text or "").split()) if w]


def words_windowed(model, a):
    dur = len(a) / SAMPLE_RATE
    out, st = [], 0.0
    while st < dur:
        en = min(dur, st + WIN)
        segs, _ = model.transcribe(a[int(st * SAMPLE_RATE):int(en * SAMPLE_RATE)], language="ru", beam_size=5,
                                   word_timestamps=True, condition_on_previous_text=False)
        lo = st + (EDGE if st > 0 else 0)
        hi = en - (EDGE if en < dur else 0)
        for s in segs:
            for x in s.words:
                ws = x.start + st
                if lo <= ws < hi and nw(x.word):
                    out.append({"w": nw(x.word), "s": round(ws, 2), "e": round(x.end + st, 2)})
        st += STEP
    return sorted(out, key=lambda x: x["s"])


def locate(items, W):
    from rapidfuzz import fuzz
    rows, ptr = [], 0
    for it in items:
        tgt = toks(it.get("ru"))
        n, best = len(tgt), (0, None, None)
        base = W[ptr]["s"] if ptr < len(W) else 0
        for i in range(ptr, len(W)):
            if W[i]["s"] > base + SEARCH_AHEAD:
                break
            for L in range(max(1, n - 2), n + 3):
                if i + L > len(W):
                    break
                sc = fuzz.ratio(" ".join(tgt), " ".join(x["w"] for x in W[i:i + L]))
                if sc > best[0] + 0.5:
                    best = (sc, i, i + L)
        sc, i0, i1 = best
        if i0 is None or sc < MIN_MATCH:
            rows.append({"id": it["id"], "ru": it["ru"], "s": None, "e": None, "match": round(sc)})
            continue
        rows.append({"id": it["id"], "ru": it["ru"], "s": W[i0]["s"], "e": min(W[i1 - 1]["e"], W[i0]["s"] + 30), "match": round(sc)})
        ptr = i1
    for k, r in enumerate(rows):  # đệm và chống chồng câu
        if r["s"] is None:
            continue
        prev_e = max([x["e"] for x in rows[:k] if x["s"] is not None] or [0])
        nxt = next((x["s"] for x in rows[k + 1:] if x["s"] is not None), None)
        r["s"] = round(max(r["s"] - START_PAD, prev_e, 0), 2)
        r["e"] = round(r["e"] + END_PAD if nxt is None else min(r["e"] + END_PAD, nxt - GAP), 2)
    return rows


def verify(model, a, s, e, ru):
    from rapidfuzz import fuzz
    segs, _ = model.transcribe(a[int(s * SAMPLE_RATE):int(e * SAMPLE_RATE)], language="ru", beam_size=5,
                               condition_on_previous_text=False)
    heard = " ".join(x.text.strip() for x in segs)
    return round(fuzz.ratio(" ".join(toks(ru)), " ".join(toks(heard)))), heard


def build_sql(code, rows):
    n = len(rows)
    S = ",".join(str(r["s"]) for r in rows)
    E = ",".join(str(r["e"]) for r in rows)
    return f"""WITH t AS (SELECT s, e, o FROM unnest(ARRAY[{S}]::numeric[], ARRAY[{E}]::numeric[]) WITH ORDINALITY u(s,e,o)),
x AS (SELECT jsonb_agg(el || jsonb_build_object('start',t.s,'startSec',t.s,'start_sec',t.s,'end',t.e,'endSec',t.e,'end_sec',t.e) ORDER BY a.o) j
 FROM public.speaking_lessons sl, jsonb_array_elements(sl.items) WITH ORDINALITY a(el,o) JOIN t ON t.o = a.o
 WHERE sl.code = '{code}' AND jsonb_array_length(sl.items) = {n})
UPDATE public.speaking_lessons s SET items = x.j, sentences = x.j,
 raw_data = COALESCE(s.raw_data,'{{}}'::jsonb) || jsonb_build_object('items',x.j,'sentences',x.j), updated_at = now()
FROM x WHERE s.code = '{code}' AND jsonb_array_length(x.j) = {n};
"""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--code", action="append", required=True, help="mã bài, vd YT_SPEAKING_mBKbcxorZWg (lặp lại được)")
    ap.add_argument("--model", default="medium", help="model faster-whisper (mặc định medium)")
    ap.add_argument("--override", action="append", default=[], help="ID=START:END đặt tay mốc một câu (áp cho mọi --code)")
    args = ap.parse_args()

    from faster_whisper import WhisperModel
    model = WhisperModel(args.model, device="cpu", compute_type="int8")
    lessons = {l["code"]: l for l in json.loads(MODULE.read_text(encoding="utf-8"))}
    ov = {}
    for o in args.override:
        i, se = o.split("=")
        s, e = se.split(":")
        ov[int(i)] = (float(s), float(e))

    for code in args.code:
        lesson = lessons[code]
        yt = code.replace("YT_SPEAKING_", "", 1)
        a = load_wav(fetch_audio(yt))
        rows = locate(lesson["items"], words_windowed(model, a))
        for r in rows:
            if r["id"] in ov:
                r["s"], r["e"] = ov[r["id"]]
            if r["s"] is not None:
                r["verify"], r["heard"] = verify(model, a, r["s"], r["e"], r["ru"])
            old = next(x for x in lesson["items"] if x["id"] == r["id"])
            flag = "KHONG_TIM_THAY" if r["s"] is None else ("NGHE_LAI" if r["verify"] < 85 else "")
            print(f"{code} #{r['id']} cu {old.get('start_sec')}-{old.get('end_sec')} moi {r['s']}-{r['e']} "
                  f"tim={r['match']} nghe={r.get('verify')} {flag} | {r['ru'][:50]} || {r.get('heard', '')[:60]}", flush=True)
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / f"retime_{code}.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
        if any(r["s"] is None for r in rows):
            print(f"{code}: còn câu chưa tìm thấy → thêm --override rồi chạy lại; chưa sinh SQL.")
            continue
        (OUT / f"retime_{code}.sql").write_text(build_sql(code, rows), encoding="utf-8")
        print(f"{code}: SQL -> {OUT / f'retime_{code}.sql'}")


if __name__ == "__main__":
    main()
