# -*- coding: utf-8 -*-
"""
Tải dump Wiktionary (kaikki.org, phần tiếng Nga, ~940MB) theo kiểu streaming
và trích xuất CHỈ các trường cần thiết cho những từ có trong từ điển dự án:

  - synonyms  (đồng nghĩa)
  - antonyms  (trái nghĩa)
  - derived   (họ từ — "Derived terms")
  - sounds    (link audio ghi âm thật trên Wikimedia Commons)

Kết quả: data/_kaikki_ru.json  (map: từ -> {syn, ant, der, audio})

Chạy:  python scripts/parse_kaikki.py
"""

import io
import json
import os
import sys
import urllib.request

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")

try:
    import orjson
    def jloads(b):
        return orjson.loads(b)
except ImportError:
    def jloads(b):
        return json.loads(b.decode("utf-8"))

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "data", "_kaikki_ru.json")
URL = "https://kaikki.org/dictionary/Russian/kaikki.org-dictionary-Russian.jsonl"

CHUNK = 1 << 20  # 1MB


def load_dict_words():
    """Tập từ Nga trong từ điển dự án (hướng ru-vi) + lemma từ SRS pool."""
    with open(os.path.join(ROOT, "data", "dict-ru-vi.json"), encoding="utf-8") as f:
        j = json.load(f)
    words = set()
    for r in j["rows"]:
        w = r[0].strip().lower()
        if w:
            words.add(w)
    return words


def flatten_terms(field):
    """wiktextract: synonyms/antonyms/derived là list phẳng hoặc list lồng theo nghĩa."""
    out = []
    if not isinstance(field, list):
        return out
    for item in field:
        if isinstance(item, dict):
            w = item.get("word")
            if w:
                out.append(w)
            ws = item.get("words")
            if isinstance(ws, list):
                for sub in ws:
                    if isinstance(sub, dict) and sub.get("word"):
                        out.append(sub["word"])
        elif isinstance(item, str):
            out.append(item)
    return out


def clean_term(t):
    t = t.strip()
    # bỏ chú thích như "что (chữ Nga)", dấu + đầu dòng,template remnant
    if t.startswith(("ЖЕ:", "ШАБЛОН", "РФИ:", "*")):
        return ""
    if any(c in t for c in "[]{}<>|"):
        return ""
    if len(t) > 40:
        return ""
    return t


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    wanted = load_dict_words()
    print(f"Từ điển dự án: {len(wanted)} từ")

    result = {}
    stats = {"lines": 0, "matched": 0, "json_errors": 0}

    req = urllib.request.Request(URL, headers={"User-Agent": "MishkaTRKI/1.0 (dict build)"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        total = int(resp.headers.get("Content-Length", 0))
        buf = b""
        done = 0
        last_pct = -1
        while True:
            chunk = resp.read(CHUNK)
            if not chunk:
                break
            done += len(chunk)
            buf += chunk
            # xử lý các dòng hoàn chỉnh
            start = 0
            while True:
                nl = buf.find(b"\n", start)
                if nl == -1:
                    break
                line = buf[start:nl]
                start = nl + 1
                stats["lines"] += 1
                if not line.strip():
                    continue
                try:
                    e = jloads(line)
                except Exception:
                    stats["json_errors"] += 1
                    continue
                w = (e.get("word") or "").strip().lower()
                if not w or w not in wanted:
                    continue
                stats["matched"] += 1
                slot = result.setdefault(w, {})
                # các thuộc tính có thể xuất hiện trên entry hoặc trong sense list
                senses = e.get("senses")
                pools = [e]
                if isinstance(senses, list):
                    pools.extend(s for s in senses if isinstance(s, dict))
                for pool in pools:
                    for key, short in (("synonyms", "syn"), ("antonyms", "ant"), ("derived", "der")):
                        terms = flatten_terms(pool.get(key))
                        if terms:
                            cur = slot.setdefault(short, [])
                            for t in terms:
                                t = clean_term(t)
                                if t and t.lower() != w and t not in cur:
                                    cur.append(t)
                            del cur[12:]
                    for s in (pool.get("sounds") if isinstance(pool.get("sounds"), list) else []):
                        if not isinstance(s, dict):
                            continue
                        ogg = s.get("ogg_url") or ""
                        mp3 = s.get("mp3_url") or ""
                        if ogg or mp3:
                            slot["audio"] = {"ogg": ogg, "mp3": mp3}
                            break
            buf = buf[start:]
            pct = int(done * 100 / total) if total else 0
            if pct != last_pct and pct % 2 == 0:
                last_pct = pct
                print(f"  {pct:3d}%  ({done/1e6:.0f}/{total/1e6:.0f} MB)  khớp: {stats['matched']}", flush=True)

    # ghi kết quả compact
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("{")
        first = True
        for w, d in result.items():
            if not any(d.values()):
                continue
            if not first:
                f.write(",")
            first = False
            f.write(json.dumps(w, ensure_ascii=False) + ":" + json.dumps(d, ensure_ascii=False, separators=(",", ":")))
        f.write("}")

    mb = os.path.getsize(OUT) / 1e6
    print(f"Hoàn tất: {stats}")
    print(f"→ {OUT}: {len(result)} từ ({mb:.1f} MB)")


if __name__ == "__main__":
    main()
