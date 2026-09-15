# -*- coding: utf-8 -*-
"""
Xuất 2 file SQLite từ điển ra JSON tĩnh cho trang web.

Nguồn:  ngaviet_dictionary.db  (Nga -> Việt)
        vietnga_dictionary.db  (Việt -> Nga)
Đích:   data/dict-ru-vi.json
        data/dict-vi-ru.json

Mỗi file JSON: { "dir": "...", "n": <số từ>, "rows": [[word, pron, pos, cat, def, ex, gram], ...] }
- rows đã sắp xếp theo từ (bỏ dấu) để trình duyệt chỉ cần dùng thẳng thứ tự này.
- pos được chuẩn hoá về nhãn tiếng Việt để khớp chip lọc của trang từ điển.
- pron lưu rỗng nếu trùng với word (bản Việt->Nga lặp lại word).

Chạy:  python scripts/export_dict.py
"""

import json
import os
import re
import sqlite3
import sys
import unicodedata

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- pos mapping
EXACT_POS = {
    # danh từ (giống / số nhiều / không biến đổi)
    "м.": "danh từ", "ж.": "danh từ", "с.": "danh từ", "мн.": "danh từ",
    "мн.ч.": "danh từ", "нескл.": "danh từ", "неизм.": "danh từ",
    "сущ.": "danh từ", "существительное": "danh từ",
    "danh từ": "danh từ", "местн.": "danh từ",
    # động từ
    "несов.": "động từ", "сов.": "động từ", "гл.": "động từ",
    "глаг.": "động từ", "сказ.": "động từ", "сказуемое": "động từ",
    "động từ": "động từ",
    # tính từ
    "прил.": "tính từ", "прич.": "tính từ", "присл.": "tính từ",
    "прилг.": "tính từ", "tính từ": "tính từ",
    # phó từ
    "нареч.": "phó từ", "trạng từ": "phó từ",
    # giới từ
    "предлог": "giới từ", "предлог.": "giới từ", "предлог. (в)": "giới từ",
    "предл.": "giới từ", "giới từ": "giới từ",
    # đại từ
    "мест.": "đại từ", "местоим.": "đại từ", "pron.": "đại từ",
    "đại từ": "đại từ",
    # số từ
    "числ.": "số từ", "число": "số từ", "числительное": "số từ",
    "số từ": "số từ",
    # thán từ
    "межд.": "thán từ", "thán từ": "thán từ",
    # liên từ / trợ từ
    "союз": "liên từ", "liên từ": "liên từ",
    "частица": "trợ từ", "частица выделительная": "trợ từ", "trợ từ": "trợ từ",
    # thành ngữ
    "идиома": "thành ngữ", "фразеологизм": "thành ngữ", "идм.": "thành ngữ",
    # nhiễu / không phải loại từ -> rỗng
    "": "", "напр.": "", "нпр.": "", "в знач.": "", "перен.": "",
    "вводн. сл.": "", "д": "", "производство": "", "меланоратия": "",
}

# tiền tố (kiểm tra theo thứ tự) — dùng cho giá trị ghép như "нареч. (о людях)"
PREFIX_POS = [
    ("местн.", "danh từ"),      # đặt TRƯỚC "мест" để không nhầm với đại từ
    ("местоим", "đại từ"),
    ("мест.", "đại từ"),
    ("существительн", "danh từ"),
    ("сущ", "danh từ"),
    ("сказ", "động từ"),
    ("глаг", "động từ"),
    ("гл.", "động từ"),
    ("прил", "tính từ"),
    ("прич", "tính từ"),
    ("числ", "số từ"),
    ("нареч", "phó từ"),
    ("предлог", "giới từ"),
    ("предл", "giới từ"),
    ("межд", "thán từ"),
    ("частиц", "trợ từ"),
    ("союз", "liên từ"),
    ("идиома", "thành ngữ"),
    ("фразеолог", "thành ngữ"),
    ("идм", "thành ngữ"),
    ("соч", "thành ngữ"),
    ("pron", "đại từ"),
]


def map_pos(gram):
    """Chuẩn hoá grammar (ж., гл., сущ., 'tính từ', ...) về nhãn tiếng Việt."""
    g = (gram or "").strip().lower()
    if g in EXACT_POS:
        return EXACT_POS[g]
    for prefix, pos in PREFIX_POS:
        if g.startswith(prefix):
            return pos
    return ""


def fold(s):
    """Chuỗi so sánh: bỏ dấu + lowercase (để sắp xếp bảng chữ cái gần đúng)."""
    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("đ", "d").replace("Đ", "D")
    return s.lower().strip()


NOISE_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def clean(s):
    if not s:
        return ""
    return NOISE_RE.sub("", s.replace("\r\n", "\n").replace("\r", "\n")).strip()


def export(db_file, out_file, direction):
    src = os.path.join(ROOT, db_file)
    dst = os.path.join(ROOT, out_file)
    con = sqlite3.connect(src)
    cur = con.cursor()
    rows = cur.execute(
        "SELECT word, pronunciation, grammar, category, definition, examples FROM words"
    ).fetchall()
    con.close()

    entries = []
    seen = set()
    for word, pron, gram, cat, definition, examples in rows:
        word = clean(word)
        if not word:
            continue
        pron = clean(pron)
        if pron == word:
            pron = ""
        cat = clean(cat)
        definition = clean(definition) or word
        examples = clean(examples)
        pos = map_pos(gram)
        gram = clean(gram)
        sort_key = fold(word)
        key = word.lower()  # chỉ gộp trùng chữ gốc, giữ nguyên biến thể dấu
        if key in seen:
            continue
        seen.add(key)
        entries.append([word, pron, pos, cat, definition, examples, gram, sort_key])

    entries.sort(key=lambda e: e[7])
    for e in entries:
        del e[7]  # bỏ key sắp xếp trước khi ghi

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w", encoding="utf-8", newline="\n") as f:
        f.write('{"dir":"%s","n":%d,"rows":[' % (direction, len(entries)))
        first = True
        for e in entries:
            if not first:
                f.write(",")
            first = False
            f.write(json.dumps(e, ensure_ascii=False, separators=(",", ":")))
        f.write("]}")

    size_mb = os.path.getsize(dst) / 1e6
    print(f"{db_file} -> {out_file}: {len(entries)} từ ({size_mb:.1f} MB)")


if __name__ == "__main__":
    export("ngaviet_dictionary.db", os.path.join("data", "dict-ru-vi.json"), "ru-vi")
    export("vietnga_dictionary.db", os.path.join("data", "dict-vi-ru.json"), "vi-ru")
