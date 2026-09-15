# -*- coding: utf-8 -*-
"""
Dựng dữ liệu bổ sung cho từ điển Mishka:

  data/dict-forms.json  — bảng biến thể từ:
        danh từ / đại từ / số từ : 6 cách × số ít / số nhiều
        tính từ / phân từ        : 6 cách × giống đực / nữ / trung / số nhiều
        động từ                  : nguyên mẫu, hiện tại/tương lai (6 ngôi),
                                   quá khứ (4), mệnh lệnh (2)
  data/dict-rel.json    — quan hệ & phương tiện:
        syn / ant   (đồng nghĩa, trái nghĩa — từ Wiktionary)
        fam         (họ từ — nhóm chia sẻ gốc từ trong từ điển)
        der         (họ từ chất lượng cao — "Derived terms" Wiktionary)
        gov         (kết cấu đi kèm: перекусить чем? — ăn nhẹ cái gì)
        audio       (link ghi âm thật trên Wikimedia Commons)

Nguồn:
  data/dict-ru-vi.json      (81.062 từ của dự án)
  data/_kaikki_ru.json      (đã dựng bằng scripts/parse_kaikki.py)
  pymorphy3 + OpenCorpora   (bảng biến thể)

Chạy:  python scripts/build_dict_extra.py
"""

import json
import os
import re
import sys
from collections import defaultdict

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")

import pymorphy3
import pymorphy3_dicts_ru

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

DICT_PATH = os.path.join(DATA, "dict-ru-vi.json")
KAIKKI_PATH = os.path.join(DATA, "_kaikki_ru.json")
FORMS_OUT = os.path.join(DATA, "dict-forms.json")
REL_OUT = os.path.join(DATA, "dict-rel.json")

morph = pymorphy3.MorphAnalyzer(
    path=os.path.join(os.path.dirname(pymorphy3_dicts_ru.__file__), "data")
)

# Thứ tự 6 cách: Ім. Род. Дат. Вин. Твор. Предл.
CASES = ["nomn", "gent", "datv", "accs", "ablt", "loct"]

SKIP_WORDS = re.compile(r"^[0-9@#%&*?.,!«»\"'\-()_/\\+=:;]+$")


def g(grammeme):
    """pymorphy3 trả về TypedGrammeme — ép về chuỗi an toàn."""
    return str(grammeme) if grammeme else ""


def first_valid(sets):
    """Chọn biến thể phổ biến hơn (bỏ biến thể cổ 'книгою', ưu tiên 'книгой')."""
    if not sets:
        return ""
    return min(sets, key=lambda w: (w.endswith(("ою", "ею")), len(w), w))


# ----------------------------------------------------------- danh từ
def build_noun_forms(word):
    p = morph.parse(word)[0]
    if p.tag.POS != "NOUN" or not p.tag.number:
        return None
    plut = g(p.tag.number) == "plur"  # chỉ có số nhiều: макароны, ножницы
    cells = {("s", c): set() for c in CASES}
    cells.update({("p", c): set() for c in CASES})
    for f in p.lexeme:
        if f.tag.POS != "NOUN":
            continue
        nums = g(f.tag.number) or ("plur" if plut else "")
        if not nums:
            continue
        for n in [nums]:
            key = "s" if n == "sing" else "p"
            for c in CASES:
                if c in g(f.tag.case):
                    cells[(key, c)].add(f.word)
    table = {}
    if not plut and any(cells[("s", c)] for c in CASES):
        table["s"] = [first_valid(cells[("s", c)]) for c in CASES]
    if any(cells[("p", c)] for c in CASES):
        table["p"] = [first_valid(cells[("p", c)]) for c in CASES]
    return {"n": table} if table else None


# ----------------------------------------------------------- tính từ / phân từ
def build_adj_forms(word):
    p = morph.parse(word)[0]
    if p.tag.POS == "ADJS":
        # dạng ngắn: рад, горд… — bảng 4 ô
        m = {"m": "", "f": "", "n": "", "p": ""}
        for f in p.lexeme:
            if f.tag.POS != "ADJS":
                continue
            num = g(f.tag.number) or "sing"
            if num == "plur":
                m["p"] = m["p"] or f.word
            else:
                gg = g(f.tag.gender)
                gk = "m" if "masc" in gg else "f" if "femn" in gg else "n"
                m[gk] = m[gk] or f.word
        if not any(m.values()):
            return None
        return {"sa": m}
    if p.tag.POS not in ("ADJF", "PRTF"):
        return None
    cells = {k: ["" for _ in CASES] for k in ("m", "f", "n", "p")}
    for f in p.lexeme:
        if f.tag.POS not in ("ADJF", "PRTF"):
            continue
        num = g(f.tag.number)
        if not num:
            continue
        cases = g(f.tag.case)
        if num == "plur":
            for c in CASES:
                if c in cases and not cells["p"][CASES.index(c)]:
                    cells["p"][CASES.index(c)] = f.word
        else:
            gg = g(f.tag.gender)
            gr = "m" if "masc" in gg else "f" if "femn" in gg else "n"
            for c in CASES:
                if c in cases and not cells[gr][CASES.index(c)]:
                    cells[gr][CASES.index(c)] = f.word
    if not any(any(v) for v in cells.values()):
        return None
    return {"a": cells}


# ----------------------------------------------------------- động từ
def build_verb_forms(word):
    p = morph.parse(word)[0]
    if p.tag.POS != "INFN":
        return None
    perf = 1 if "perf" in g(p.tag.aspect) else 0
    pres = ["", "", "", "", "", ""]  # я, ты, он/она, мы, вы, они
    past = {"m": "", "f": "", "n": "", "p": ""}
    imp = {"s": "", "p": ""}
    for f in p.lexeme:
        t = f.tag
        if t.POS != "VERB":
            continue
        if "imprt" in g(t.mood):
            num = g(t.number) or "sing"
            if num == "plur":
                imp["p"] = imp["p"] or f.word
            else:
                imp["s"] = imp["s"] or f.word
            continue
        if "past" in g(t.tense):
            num = g(t.number) or "sing"
            if num == "plur":
                past["p"] = past["p"] or f.word
            else:
                gg = g(t.gender)
                gk = "m" if "masc" in gg else "f" if "femn" in gg else "n"
                past[gk] = past[gk] or f.word
            continue
        persons = g(t.person)
        num = g(t.number)
        if not persons or not num:
            continue
        for per in persons.split():
            i = {"1per": 0, "2per": 1, "3per": 2}.get(per)
            j = 0 if num == "sing" else 3
            if i is not None and not pres[i + j]:
                pres[i + j] = f.word
    if not any(pres) and not any(past.values()):
        return None
    return {"v": {"inf": word, "perf": perf, "pres": pres, "past": past, "imp": imp}}


# ----------------------------------------------------------- đại từ / số từ
def build_pron_num_forms(word):
    p = morph.parse(word)[0]
    if p.tag.POS not in ("NPRO", "NUMR"):
        return None
    cells = {"s": ["" for _ in CASES], "p": ["" for _ in CASES]}
    for f in p.lexeme:
        t = f.tag
        if t.POS not in ("NPRO", "NUMR"):
            continue
        cases = g(t.case)
        num = g(t.number) or "sing"
        for n in [num]:
            key = "s" if n == "sing" else "p"
            for c in CASES:
                if c in cases and not cells[key][CASES.index(c)]:
                    cells[key][CASES.index(c)] = f.word
    if not any(any(v) for v in cells.values()):
        return None
    return {"pn": cells}


# ----------------------------------------------------------- kết cấu (gov)
CASE_VN = {
    "gen": "cách 2 (Родительный)",
    "dat": "cách 3 (Дательный)",
    "acc": "cách 4 (Винительный)",
    "ins": "cách 5 (Творительный)",
    "prep": "cách 6 (Предложный)",
}
CASE_Q = {
    "gen": "кого? / чего?",
    "dat": "кому? / чему?",
    "acc": "кого? / что?",
    "ins": "кем? / чем?",
    "prep": "о ком? / о чём?",
}

# Kết cấu đi kèm cho từ thông dụng TRKI — bổ sung dần được.
# từ -> {"c": [pattern], "vi": chú thích tiếng Việt}; pattern: {"p": giới từ|"", "c": cách}
GOV = {
    # --- ăn uống với cách 5 ---
    "перекусить": {"c": [{"c": "ins"}], "vi": "ăn nhẹ (món gì đó)"},
    "перекусывать": {"c": [{"c": "ins"}], "vi": "ăn nhẹ (món gì đó)"},
    "позавтракать": {"c": [{"c": "ins"}], "vi": "ăn sáng (món gì đó)"},
    "завтракать": {"c": [{"c": "ins"}], "vi": "ăn sáng (món gì đó)"},
    "пообедать": {"c": [{"c": "ins"}], "vi": "ăn trưa (món gì đó)"},
    "обедать": {"c": [{"c": "ins"}], "vi": "ăn trưa (món gì đó)"},
    "поужинать": {"c": [{"c": "ins"}], "vi": "ăn tối (món gì đó)"},
    "ужинать": {"c": [{"c": "ins"}], "vi": "ăn tối (món gì đó)"},
    "угостить": {"c": [{"c": "acc"}, {"c": "ins"}], "vi": "đãi ai món gì"},
    "угощать": {"c": [{"c": "acc"}, {"c": "ins"}], "vi": "đãi ai món gì"},
    "наслаждаться": {"c": [{"c": "ins"}], "vi": "tận hưởng cái gì"},
    "насладиться": {"c": [{"c": "ins"}], "vi": "tận hưởng cái gì"},
    "любоваться": {"c": [{"c": "ins"}], "vi": "ngắm ai/cái gì"},
    "полюбоваться": {"c": [{"c": "ins"}], "vi": "ngắm ai/cái gì"},
    # --- cách 5: trở thành / coi là ---
    "гордиться": {"c": [{"c": "ins"}], "vi": "tự hào về ai/cái gì"},
    "заниматься": {"c": [{"c": "ins"}], "vi": "học/tập/làm gì, môn thể thao gì"},
    "заняться": {"c": [{"c": "ins"}], "vi": "học/tập/làm gì, môn thể thao gì"},
    "интересоваться": {"c": [{"c": "ins"}], "vi": "quan tâm đến cái gì"},
    "увлекаться": {"c": [{"c": "ins"}], "vi": "say mê cái gì"},
    "увлечься": {"c": [{"c": "ins"}], "vi": "say mê cái gì"},
    "пользоваться": {"c": [{"c": "ins"}], "vi": "dùng cái gì"},
    "воспользоваться": {"c": [{"c": "ins"}], "vi": "tận dụng cái gì"},
    "обладать": {"c": [{"c": "ins"}], "vi": "sở hữu cái gì"},
    "являться": {"c": [{"c": "ins"}], "vi": "là (ai/cái gì)"},
    "становиться": {"c": [{"c": "ins"}], "vi": "trở thành ai/cái gì"},
    "стать": {"c": [{"c": "ins"}], "vi": "trở thành ai/cái gì"},
    "казаться": {"c": [{"c": "ins"}], "vi": "có vẻ như (ai/cái gì)"},
    "показаться": {"c": [{"c": "ins"}], "vi": "có vẻ như (ai/cái gì)"},
    "считать": {"c": [{"c": "acc"}, {"c": "ins"}], "vi": "coi ai/cái gì là…"},
    "называть": {"c": [{"c": "acc"}, {"c": "ins"}], "vi": "gọi ai/cái gì là…"},
    "назвать": {"c": [{"c": "acc"}, {"c": "ins"}], "vi": "gọi ai/cái gì là…"},
    "рисковать": {"c": [{"c": "ins"}], "vi": "mạo hiểm (cái gì)"},
    # --- с + cách 5 ---
    "встретиться": {"c": [{"p": "с", "c": "ins"}], "vi": "gặp gỡ với ai"},
    "встречаться": {"c": [{"p": "с", "c": "ins"}], "vi": "gặp gỡ với ai"},
    "познакомиться": {"c": [{"p": "с", "c": "ins"}], "vi": "làm quen với ai"},
    "знакомиться": {"c": [{"p": "с", "c": "ins"}], "vi": "làm quen với ai"},
    "проститься": {"c": [{"p": "с", "c": "ins"}], "vi": "chia tay với ai"},
    "прощаться": {"c": [{"p": "с", "c": "ins"}], "vi": "chia tay với ai"},
    "поздравить": {"c": [{"c": "acc"}, {"p": "с", "c": "ins"}], "vi": "chúc mừng ai (dịp gì)"},
    "поздравлять": {"c": [{"c": "acc"}, {"p": "с", "c": "ins"}], "vi": "chúc mừng ai (dịp gì)"},
    "согласиться": {"c": [{"p": "с", "c": "ins"}], "vi": "đồng ý với ai/cái gì"},
    "соглашаться": {"c": [{"p": "с", "c": "ins"}], "vi": "đồng ý với ai/cái gì"},
    "поговорить": {"c": [{"p": "с", "c": "ins"}], "vi": "nói chuyện với ai"},
    "посоветоваться": {"c": [{"p": "с", "c": "ins"}], "vi": "hỏi ý kiến ai"},
    "советоваться": {"c": [{"p": "с", "c": "ins"}], "vi": "hỏi ý kiến ai"},
    "привыкнуть": {"c": [{"p": "к", "c": "dat"}], "vi": "quen với cái gì"},
    # --- cách 2 (Родительный) ---
    "бояться": {"c": [{"c": "gen"}], "vi": "sợ ai/cái gì"},
    "достигнуть": {"c": [{"c": "gen"}], "vi": "đạt tới cái gì"},
    "достичь": {"c": [{"c": "gen"}], "vi": "đạt tới cái gì"},
    "достигать": {"c": [{"c": "gen"}], "vi": "đạt tới cái gì"},
    "добиться": {"c": [{"c": "gen"}], "vi": "giành được cái gì"},
    "добиваться": {"c": [{"c": "gen"}], "vi": "giành được, đòi cái gì"},
    "касаться": {"c": [{"c": "gen"}], "vi": "liên quan đến cái gì"},
    "коснуться": {"c": [{"c": "gen"}], "vi": "chạm đến cái gì"},
    "избегать": {"c": [{"c": "gen"}], "vi": "tránh cái gì"},
    "избежать": {"c": [{"c": "gen"}], "vi": "tránh cái gì"},
    "слушаться": {"c": [{"c": "gen"}], "vi": "vâng lời ai"},
    "требовать": {"c": [{"c": "gen"}, {"p": "от", "c": "gen"}], "vi": "đòi hỏi cái gì (từ ai)"},
    # --- от / из / у + cách 2 ---
    "зависеть": {"c": [{"p": "от", "c": "gen"}], "vi": "phụ thuộc vào ai/cái gì"},
    "отказаться": {"c": [{"p": "от", "c": "gen"}], "vi": "từ chối cái gì"},
    "отказываться": {"c": [{"p": "от", "c": "gen"}], "vi": "từ chối cái gì"},
    "избавиться": {"c": [{"p": "от", "c": "gen"}], "vi": "thoát khỏi cái gì"},
    "избавляться": {"c": [{"p": "от", "c": "gen"}], "vi": "thoát khỏi cái gì"},
    "защитить": {"c": [{"c": "acc"}, {"p": "от", "c": "gen"}], "vi": "bảo vệ ai khỏi cái gì"},
    "защищать": {"c": [{"c": "acc"}, {"p": "от", "c": "gen"}], "vi": "bảo vệ ai khỏi cái gì"},
    "купить": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "mua cái gì (từ ai)"},
    "покупать": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "mua cái gì (từ ai)"},
    "взять": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "lấy cái gì (từ ai)"},
    "брать": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "lấy cái gì (từ ai)"},
    "одолжить": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "mượn cái gì (của ai)"},
    "одалживать": {"c": [{"c": "acc"}, {"p": "у", "c": "gen"}], "vi": "mượn cái gì (của ai)"},
    # --- cách 3 (Дательный) ---
    "помочь": {"c": [{"c": "dat"}], "vi": "giúp đỡ ai"},
    "помогать": {"c": [{"c": "dat"}], "vi": "giúp đỡ ai"},
    "позвонить": {"c": [{"c": "dat"}], "vi": "gọi điện cho ai"},
    "звонить": {"c": [{"c": "dat"}], "vi": "gọi điện cho ai"},
    "верить": {"c": [{"c": "dat"}], "vi": "tin ai/cái gì"},
    "поверить": {"c": [{"c": "dat"}], "vi": "tin ai/cái gì"},
    "радоваться": {"c": [{"c": "dat"}], "vi": "vui mừng về cái gì"},
    "обрадоваться": {"c": [{"c": "dat"}], "vi": "vui mừng về cái gì"},
    "удивиться": {"c": [{"c": "dat"}], "vi": "ngạc nhiên về cái gì"},
    "удивляться": {"c": [{"c": "dat"}], "vi": "ngạc nhiên về cái gì"},
    "желать": {"c": [{"c": "dat"}, {"c": "gen"}], "vi": "chúc ai điều gì"},
    "пожелать": {"c": [{"c": "dat"}, {"c": "gen"}], "vi": "chúc ai điều gì"},
    "мешать": {"c": [{"c": "dat"}], "vi": "cản trở, làm phiền ai"},
    "вредить": {"c": [{"c": "dat"}], "vi": "gây hại cho ai/cái gì"},
    "объяснить": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "giải thích cho ai (cái gì)"},
    "объяснять": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "giải thích cho ai (cái gì)"},
    "предложить": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "đề nghị với ai (cái gì)"},
    "предлагать": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "đề nghị với ai (cái gì)"},
    "разрешить": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "cho phép ai (cái gì)"},
    "разрешать": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "cho phép ai (cái gì)"},
    "запретить": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "cấm ai (cái gì)"},
    "запрещать": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "cấm ai (cái gì)"},
    "простить": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "tha thứ cho ai (cái gì)"},
    "прощать": {"c": [{"c": "dat"}, {"c": "acc"}], "vi": "tha thứ cho ai (cái gì)"},
    "напомнить": {"c": [{"c": "dat"}, {"p": "о", "c": "prep"}], "vi": "nhắc ai (về cái gì)"},
    "напоминать": {"c": [{"c": "dat"}, {"p": "о", "c": "prep"}], "vi": "nhắc ai (về cái gì)"},
    "привыкать": {"c": [{"p": "к", "c": "dat"}], "vi": "quen với cái gì"},
    "подойти": {"c": [{"p": "к", "c": "dat"}], "vi": "đến gần ai/cái gì"},
    "подходить": {"c": [{"p": "к", "c": "dat"}], "vi": "đến gần ai/cái gì"},
    "готовиться": {"c": [{"p": "к", "c": "dat"}], "vi": "chuẩn bị cho cái gì"},
    "подготовиться": {"c": [{"p": "к", "c": "dat"}], "vi": "chuẩn bị cho cái gì"},
    "стремиться": {"c": [{"p": "к", "c": "dat"}], "vi": "phấn đấu tới cái gì"},
    # --- cách 4 (Винительный) / на + cách 4 ---
    "ждать": {"c": [{"c": "acc"}, {"c": "gen"}], "vi": "chờ ai/cái gì"},
    "надеяться": {"c": [{"p": "на", "c": "acc"}], "vi": "hy vọng vào cái gì"},
    "смотреть": {"c": [{"p": "на", "c": "acc"}], "vi": "nhìn vào ai/cái gì"},
    "посмотреть": {"c": [{"p": "на", "c": "acc"}], "vi": "nhìn vào ai/cái gì"},
    "жаловаться": {"c": [{"c": "dat"}, {"p": "на", "c": "acc"}], "vi": "kêu than với ai (về cái gì)"},
    "пожаловаться": {"c": [{"c": "dat"}, {"p": "на", "c": "acc"}], "vi": "phàn nàn với ai (về cái gì)"},
    "сердиться": {"c": [{"p": "на", "c": "acc"}], "vi": "giận ai"},
    "рассердиться": {"c": [{"p": "на", "c": "acc"}], "vi": "giận ai"},
    "злиться": {"c": [{"p": "на", "c": "acc"}], "vi": "giận ai"},
    "обидеться": {"c": [{"p": "на", "c": "acc"}], "vi": "bực tức với ai"},
    "обижаться": {"c": [{"p": "на", "c": "acc"}], "vi": "bực tức với ai"},
    "опоздать": {"c": [{"p": "на", "c": "acc"}], "vi": "đến trễ (chuyến gì)"},
    "опаздывать": {"c": [{"p": "на", "c": "acc"}], "vi": "đến trễ (chuyến gì)"},
    "повлиять": {"c": [{"p": "на", "c": "acc"}], "vi": "ảnh hưởng đến ai/cái gì"},
    "влиять": {"c": [{"p": "на", "c": "acc"}], "vi": "ảnh hưởng đến ai/cái gì"},
    "похожий": {"c": [{"p": "на", "c": "acc"}], "vi": "giống (với ai/cái gì)"},
    "благодарить": {"c": [{"c": "acc"}, {"p": "за", "c": "acc"}], "vi": "cảm ơn ai (vì cái gì)"},
    "поблагодарить": {"c": [{"c": "acc"}, {"p": "за", "c": "acc"}], "vi": "cảm ơn ai (vì cái gì)"},
    "спасибо": {"c": [{"p": "за", "c": "acc"}], "vi": "cảm ơn (vì cái gì)"},
    "заплатить": {"c": [{"p": "за", "c": "acc"}], "vi": "trả tiền (vì cái gì)"},
    "платить": {"c": [{"c": "dat"}, {"p": "за", "c": "acc"}], "vi": "trả tiền cho ai (vì cái gì)"},
    # --- о + cách 6 ---
    "думать": {"c": [{"p": "о", "c": "prep"}], "vi": "nghĩ về ai/cái gì"},
    "забыть": {"c": [{"p": "о", "c": "prep"}], "vi": "quên (về) ai/cái gì"},
    "забывать": {"c": [{"p": "о", "c": "prep"}], "vi": "quên (về) ai/cái gì"},
    "мечтать": {"c": [{"p": "о", "c": "prep"}], "vi": "mơ ước về cái gì"},
    "заботиться": {"c": [{"p": "о", "c": "prep"}], "vi": "quan tâm, lo cho ai"},
    "позаботиться": {"c": [{"p": "о", "c": "prep"}], "vi": "quan tâm, lo cho ai"},
    "беспокоиться": {"c": [{"p": "о", "c": "prep"}], "vi": "lo lắng về ai/cái gì"},
    "спросить": {"c": [{"c": "acc"}, {"p": "о", "c": "prep"}], "vi": "hỏi ai (về cái gì)"},
    "спрашивать": {"c": [{"c": "acc"}, {"p": "о", "c": "prep"}], "vi": "hỏi ai (về cái gì)"},
    "отвечать": {"c": [{"c": "dat"}, {"p": "на", "c": "acc"}], "vi": "trả lời ai (về cái gì)"},
    "ответить": {"c": [{"c": "dat"}, {"p": "на", "c": "acc"}], "vi": "trả lời ai (về cái gì)"},
    # --- в + cách 6 ---
    "участвовать": {"c": [{"p": "в", "c": "prep"}], "vi": "tham gia vào cái gì"},
    "нуждаться": {"c": [{"p": "в", "c": "prep"}], "vi": "cần cái gì"},
    "уверен": {"c": [{"p": "в", "c": "prep"}], "vi": "tin chắc về cái gì"},
    "уверенный": {"c": [{"p": "в", "c": "prep"}], "vi": "tin chắc về cái gì"},
    # --- tính từ ngắn & khác ---
    "довольный": {"c": [{"c": "ins"}], "vi": "hài lòng với cái gì"},
    "доволен": {"c": [{"c": "ins"}], "vi": "hài lòng với cái gì"},
    "недоволен": {"c": [{"c": "ins"}], "vi": "không hài lòng với cái gì"},
    "полный": {"c": [{"c": "gen"}], "vi": "đầy cái gì"},
    "полон": {"c": [{"c": "gen"}], "vi": "đầy cái gì"},
    "полна": {"c": [{"c": "gen"}], "vi": "đầy cái gì"},
    "богатый": {"c": [{"c": "ins"}], "vi": "giàu (cái gì)"},
    "богат": {"c": [{"c": "ins"}], "vi": "giàu (cái gì)"},
    "известный": {"c": [{"c": "ins"}], "vi": "nổi tiếng (với cái gì)"},
    "известен": {"c": [{"c": "ins"}], "vi": "nổi tiếng (với cái gì)"},
    "знаменитый": {"c": [{"c": "ins"}], "vi": "nổi tiếng (với cái gì)"},
    "готовый": {"c": [{"p": "к", "c": "dat"}], "vi": "sẵn sàng cho cái gì"},
    "готов": {"c": [{"p": "к", "c": "dat"}], "vi": "sẵn sàng cho cái gì"},
    "готовы": {"c": [{"p": "к", "c": "dat"}], "vi": "sẵn sàng cho cái gì"},
    "рад": {"c": [{"c": "dat"}], "vi": "vui (gặp ai)"},
    "рада": {"c": [{"c": "dat"}], "vi": "vui (gặp ai)"},
    "занят": {"c": [{"c": "ins"}], "vi": "bận (việc gì)"},
    "занята": {"c": [{"c": "ins"}], "vi": "bận (việc gì)"},
    "близкий": {"c": [{"p": "к", "c": "dat"}], "vi": "gần gũi với ai"},
    # --- cách 4 trần ---
    "искать": {"c": [{"c": "acc"}], "vi": "tìm cái gì"},
    "найти": {"c": [{"c": "acc"}], "vi": "tìm thấy cái gì"},
    "заказать": {"c": [{"c": "acc"}], "vi": "đặt (món/cái gì)"},
    "заказывать": {"c": [{"c": "acc"}], "vi": "đặt (món/cái gì)"},
    "попробовать": {"c": [{"c": "acc"}], "vi": "thử (cái gì)"},
    "пробовать": {"c": [{"c": "acc"}], "vi": "thử (cái gì)"},
    "проверить": {"c": [{"c": "acc"}], "vi": "kiểm tra cái gì"},
    "проверять": {"c": [{"c": "acc"}], "vi": "kiểm tra cái gì"},
    "сдать": {"c": [{"c": "acc"}], "vi": "thi/nộp (cái gì)"},
    "сдавать": {"c": [{"c": "acc"}], "vi": "thi/nộp (cái gì)"},
    "лишить": {"c": [{"c": "acc"}, {"c": "gen"}], "vi": "tước của ai (cái gì)"},
    "лишать": {"c": [{"c": "acc"}, {"c": "gen"}], "vi": "tước của ai (cái gì)"},
    "научить": {"c": [{"c": "acc"}, {"c": "dat"}], "vi": "dạy ai (cái gì)"},
    "научиться": {"c": [{"c": "dat"}], "vi": "học được (việc gì)"},
}


CYR_RE = re.compile(r"^[А-ЯЁа-яё][А-ЯЁа-яё\- ]*$")
STRESS = "\u0301"


def clean_terms(terms, limit):
    """Lọc thuật ngữ Wiktionary: chỉ giữ từ/cụm tiếng Nga, bỏ phiên âm la-tin."""
    out = []
    seen = set()
    for t in terms:
        base = t.replace(STRESS, "").strip()
        if not base or base.lower() in seen:
            continue
        if not CYR_RE.match(base):
            continue
        if base.count(" ") > 2:  # bỏ cụm quá dài
            continue
        seen.add(base.lower())
        out.append(t)
        if len(out) >= limit:
            break
    return out


def build_gov(wanted):
    gov = {}
    for w, d in GOV.items():
        key = w.lower().strip()
        if key not in wanted:
            continue
        pats = d.get("c") or []
        if not pats:
            continue
        q = " + ".join(
            ((p["p"] + " ") if p.get("p") else "") + CASE_Q[p["c"]] for p in pats
        )
        notes = [((p.get("p", "") + " ") if p.get("p") else "") + CASE_VN[p["c"]] for p in pats]
        gov[key] = {"q": q, "vi": d["vi"], "p": pats, "n": notes}
    return gov


# ----------------------------------------------------------- họ từ (family)
# Ghép nhóm từ cùng gốc: cùng 4 ký tự đầu, cho phép biến đổi phụ âm cuối
# (книга → книжный: г/ж), dùng union-find để nối các key tương đương.
ALT4 = {"г": ["ж", "ч"], "х": ["ш", "с"], "д": ["ж"], "т": ["ч"], "с": ["ш"], "з": ["ж", "зж"], "к": ["ч"], "ц": ["ч", "тч"]}


def build_families(dict_words):
    groups = defaultdict(list)
    for w in dict_words:
        if len(w) >= 5 and re.match(r"^[а-яё]+$", w):
            groups[w[:4]].append(w)
    # union-find trên các key
    parent = {k: k for k in groups}

    def find(x):
        while parent.setdefault(x, x) != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for k in list(groups.keys()):
        if k[3] in ALT4:
            for alt in ALT4[k[3]]:
                k2 = k[:3] + alt
                if k2 in groups and k2 != k:
                    union(k, k2)
    fam = defaultdict(list)
    for k, ws in groups.items():
        fam[find(k)].extend(ws)
    out = []
    for ws in fam.values():
        ws = sorted(set(ws), key=lambda x: (len(x), x))
        if 2 <= len(ws) <= 40:
            out.append(ws[:20])
        elif len(ws) > 40:
            out.append(ws[:20])
    out.sort(key=lambda g: (-len(g), g[0]))
    return out


# ---------------------------------------------------------------- main
def main():
    print("1) Nạp từ điển dự án…")
    with open(DICT_PATH, encoding="utf-8") as f:
        dictj = json.load(f)
    words = [r[0].strip() for r in dictj["rows"]]
    wanted = {w.lower() for w in words if w}
    print(f"   {len(wanted)} từ")

    print("2) Bảng biến thể (pymorphy)…")
    forms = {}
    for i, w in enumerate(words):
        lw = w.lower()
        if SKIP_WORDS.match(w) or len(w) < 2:
            continue
        try:
            t = None
            pos = morph.parse(lw)[0].tag.POS
            if pos == "NOUN":
                t = build_noun_forms(lw)
            elif pos in ("ADJF", "ADJS", "PRTF"):
                t = build_adj_forms(lw)
            elif pos == "INFN":
                t = build_verb_forms(lw)
            elif pos in ("NPRO", "NUMR"):
                t = build_pron_num_forms(lw)
            if t:
                forms[lw] = t
        except Exception:
            pass
        if (i + 1) % 15000 == 0:
            print(f"   {i + 1}/{len(words)}…", flush=True)
    print(f"   Có bảng biến thể: {len(forms)}")

    print("3) Nạp dữ liệu Wiktionary…")
    kaikki = {}
    if os.path.exists(KAIKKI_PATH):
        with open(KAIKKI_PATH, encoding="utf-8") as f:
            kaikki = json.load(f)
    print(f"   {len(kaikki)} từ có dữ liệu Wiktionary")

    print("4) Kết cấu đi kèm…")
    gov = build_gov(wanted)
    print(f"   {len(gov)} từ có kết cấu")

    print("5) Nhóm họ từ…")
    fam_groups = build_families([w.lower() for w in words])
    print(f"   {len(fam_groups)} nhóm")
    index_rel = {}

    print("6) Ghi dữ liệu quan hệ (chia theo chữ cái đầu)…")
    rel_buckets = defaultdict(dict)
    n_syn = n_ant = n_der = n_au = n_fam = n_gov = 0
    fam_pos = {w: gi for gi, g in enumerate(fam_groups) for w in g}
    for w, d in kaikki.items():
        if w not in wanted:
            continue
        slot = {}
        syn = clean_terms(d.get("syn") or [], 8)
        ant = clean_terms(d.get("ant") or [], 6)
        der = clean_terms(d.get("der") or [], 15)
        if syn:
            slot["s"] = syn
            n_syn += 1
        if ant:
            slot["a"] = ant
            n_ant += 1
        if der:
            slot["d"] = der
            n_der += 1
        if d.get("audio") and d["audio"].get("mp3"):
            slot["au"] = {"m": d["audio"]["mp3"], "o": d["audio"].get("ogg", "")}
            n_au += 1
        gi = fam_pos.get(w)
        if gi is not None:
            slot["fg"] = gi
            n_fam += 1
        if slot:
            rel_buckets[w[0].replace("ё", "е")][w] = slot
    for w, d in gov.items():
        key = w[0].replace("ё", "е")
        slot = rel_buckets.setdefault(key, {}).setdefault(w, {})
        slot["gv"] = d
        n_gov += 1
    for letter, chunk in sorted(rel_buckets.items()):
        path = os.path.join(DATA, f"dict-rel-{letter}.json")
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(chunk, f, ensure_ascii=False, separators=(",", ":"))
        index_rel[letter] = round(os.path.getsize(path) / 1024)
    # nhóm họ từ toàn cục
    with open(os.path.join(DATA, "dict-fam.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump({"g": fam_groups}, f, ensure_ascii=False, separators=(",", ":"))
    with open(os.path.join(DATA, "dict-rel-index.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(index_rel, f, ensure_ascii=False, separators=(",", ":"))
    fam_mb = os.path.getsize(os.path.join(DATA, "dict-fam.json")) / 1e6
    print(f"   → {len(rel_buckets)} bucket rel + dict-fam.json {fam_mb:.2f} MB")
    print(f"      syn:{n_syn} ant:{n_ant} der:{n_der} audio:{n_au} fam:{n_fam} gov:{n_gov}")

    print("7) Ghi bảng biến thể (chia theo chữ cái đầu)…")
    buckets = defaultdict(dict)
    for w, t in forms.items():
        first = w[0].replace("ё", "е")
        buckets[first][w] = t
    index = {}
    for letter, chunk in sorted(buckets.items()):
        path = os.path.join(DATA, f"dict-forms-{letter}.json")
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(chunk, f, ensure_ascii=False, separators=(",", ":"))
        index[letter] = {"n": len(chunk), "kb": round(os.path.getsize(path) / 1024)}
    with open(os.path.join(DATA, "dict-forms-index.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(index, f, ensure_ascii=False, separators=(",", ":"))
    total_mb = sum(v["kb"] for v in index.values()) / 1000
    print(f"   → {len(buckets)} bucket, tổng {total_mb:.1f} MB (avg {total_mb / max(1, len(buckets)):.2f} MB/bucket)")
    for k, v in sorted(index.items())[:6]:
        print(f"      {k}: {v['n']} từ, {v['kb']} KB")

    for w in ("книга", "перекусить", "красивый", "стол", "они", "рад", "макароны"):
        lw = w.lower()
        print("SAMPLE", w, "=>", json.dumps(forms.get(lw), ensure_ascii=False)[:260])
    print("GOV перекусить:", json.dumps(gov.get("перекусить"), ensure_ascii=False))


if __name__ == "__main__":
    main()
