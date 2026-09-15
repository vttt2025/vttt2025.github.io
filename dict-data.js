/* =====================================================================
 * MishkaDict — dữ liệu từ điển đầy đủ (Nga→Việt & Việt→Nga)
 * Nguồn: data/dict-ru-vi.json (~81.000 từ), data/dict-vi-ru.json (~91.700 từ)
 * Tải lazily theo hướng đang chọn, dựng index tìm kiếm ở máy khách.
 * API:
 *   MishkaDict.load(dir)                 -> Promise<{dir, list, total}>
 *   MishkaDict.search(dir, opts)         -> mảng entry (đã lọc + xếp hạng)
 *   MishkaDict.lookup(word)              -> entry khớp chính xác (nếu đã tải)
 *   MishkaDict.statusMap(state)          -> Map(cardId -> trạng thái SRS)
 *   MishkaDict.counts(dir, state)        -> {total, unseen, learning, mastered}
 * ===================================================================== */
const MishkaDict = {
  _cache: {},
  _loading: {},

  /** Chuỗi so sánh: lowercase + bỏ dấu (đ, ô, ả... -> d, o, a). */
  fold(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  },

  /** Tải (và cache) một hướng từ điển. */
  load(dir) {
    if (this._cache[dir]) return Promise.resolve(this._cache[dir]);
    if (this._loading[dir]) return this._loading[dir];
    this._loading[dir] = fetch("data/dict-" + dir + ".json")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data) => {
        const built = this._build(data);
        this._cache[dir] = built;
        return built;
      })
      .finally(() => {
        delete this._loading[dir];
      });
    return this._loading[dir];
  },

  _build(data) {
    const srsLevels = {};
    if (typeof SRS_WORDS !== "undefined") {
      for (const w of SRS_WORDS) {
        if (w.level) srsLevels[w.ru.toLowerCase()] = w.level;
      }
    }
    const list = [];
    const map = new Map();
    const dir = data.dir || "";

    data.rows.forEach((r, i) => {
      const sl = srsLevels[r[0].toLowerCase()] || "";
      const e = {
        // Từ thuộc pool SRS_WORDS: bỏ dk để cardId dùng scheme cũ "srs_...",
        // khớp với card người dùng đã thêm từ trước.
        dk: sl ? null : dir + ":" + i,
        dir,
        ru: r[0],
        pron: r[1],
        pos: r[2],
        cat: r[3],
        vi: r[4],
        ex: r[5],
        gram: r[6],
        level: sl
      };
      e._w = this.fold(e.ru);
      e.hay = this.fold(e.ru + " " + e.pron + " " + e.cat + " " + e.vi + " " + e.ex);
      list.push(e);
      const key = e.ru.toLowerCase();
      if (!map.has(key)) map.set(key, e);
    });

    // Bổ sung từ SRS_WORDS chưa có trong từ điển để không mất pool có cấp độ
    if (dir === "ru-vi" && typeof SRS_WORDS !== "undefined") {
      SRS_WORDS.forEach((w) => {
        if (!map.has(w.ru.toLowerCase())) {
          const e = {
            dk: null,
            dir: "ru-vi",
            ru: w.ru,
            pron: "",
            pos: w.pos || "",
            cat: "",
            vi: w.vi || "",
            ex: w.ex || "",
            gram: "",
            level: w.level || ""
          };
          e._w = this.fold(e.ru);
          e.hay = this.fold(e.ru + " " + e.vi + " " + e.ex);
          list.push(e);
          map.set(e.ru.toLowerCase(), e);
        }
      });
    }

    // Sắp xếp: từ có cấp độ CEFR lên trước, rồi theo bảng chữ cái
    const rank = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, "": 9 };
    list.sort((a, b) => {
      const d = (rank[a.level] ?? 9) - (rank[b.level] ?? 9);
      return d !== 0 ? d : a._w < b._w ? -1 : a._w > b._w ? 1 : 0;
    });

    return { dir, list, map, total: list.length };
  },

  /** Entry khớp chính xác theo từ (ưu tiên hướng đã tải). */
  lookup(word) {
    const key = (word || "").toLowerCase().trim();
    if (!key) return null;
    for (const dir of ["ru-vi", "vi-ru"]) {
      const c = this._cache[dir];
      if (c) {
        const e = c.map.get(key);
        if (e) return e;
      }
    }
    return null;
  },

  /** Map cardId -> trạng thái học, dựng 1 lần từ state SRS. */
  statusMap(state) {
    const m = new Map();
    for (const id in state.cards) {
      const c = state.cards[id];
      m.set(
        id,
        c.mastered ? "mastered" : c.isNew ? "new" : c.learningStep === 1 ? "learning" : "reviewing"
      );
    }
    return m;
  },

  /**
   * Tìm kiếm + lọc trên một hướng từ điển đã tải.
   * opts: { q, level, pos, status, statusMap }
   * Trả về mảng entry: từ khớp đầu từ trước, rồi khớp trong nghĩa, giữ thứ tự bảng chữ cái.
   */
  search(dir, opts = {}) {
    const c = this._cache[dir];
    if (!c) return null;
    const q = this.fold(opts.q || "").trim();
    const lvl = opts.level || "all";
    const pos = (opts.pos || "all").toLowerCase();
    const status = opts.status || "all";
    const sm = opts.statusMap;
    const out = [];

    for (const e of c.list) {
      if (lvl !== "all" && e.level !== lvl) continue;
      if (pos !== "all" && !(e.pos || "").toLowerCase().includes(pos)) continue;
      if (status !== "all" && sm) {
        const st = sm.get(SRS.cardId(e)) || "unseen";
        if (status === "new" ? st !== "unseen" && st !== "new" : st !== status) continue;
      }
      if (!q) {
        out.push(e);
        continue;
      }
      if (e._w.startsWith(q)) {
        e._sc = 0;
        out.push(e);
      } else if (e._w.includes(q)) {
        e._sc = 1;
        out.push(e);
      } else if (e.hay.includes(q)) {
        e._sc = 2;
        out.push(e);
      }
    }
    if (q) out.sort((a, b) => a._sc - b._sc); // ổn định: giữ thứ tự bảng chữ cái trong cùng mức
    return out;
  },

  /** Đếm số từ theo trạng thái học trên toàn bộ một hướng từ điển. */
  counts(dir, state) {
    const c = this._cache[dir];
    if (!c || !state) return null;
    const sm = this.statusMap(state);
    const res = { total: c.list.length, unseen: 0, new: 0, learning: 0, reviewing: 0, mastered: 0 };
    for (const e of c.list) {
      const st = sm.get(SRS.cardId(e)) || "unseen";
      res[st]++;
    }
    return res;
  },

  /**
   * Extra — dữ liệu bổ sung cho chi tiết từ (kiểu TFlat):
   *   forms (bảng chia 6 cách), syn/ant (đồng/trái nghĩa),
   *   fam (họ từ), gov (kết cấu đi kèm), au (audio ghi âm).
   * Chia bucket theo chữ cái đầu — chỉ tải bucket của từ đang xem.
   */
  Extra: {
    _fam: null,
    _rel: {},          // letter -> {word: {s,a,d,fg,au,gv}}
    _forms: {},        // letter -> {word: {n|a|sa|v|pn}}
    _pending: {},

    /** Bỏ dấu nhấn (кни́га -> книга) để tra/so khớp. */
    stripStress(s) {
      return (s || "").replace(/\u0301/g, "");
    },

    /** Chữ cái bucket của một từ (ё -> е; trả về null nếu không phải Cyrillic). */
    letter(word) {
      const w = this.stripStress(word).toLowerCase().replace(/ё/g, "е");
      return /^[а-я]/.test(w) ? w[0] : null;
    },

    _fetchJson(url) {
      return fetch(url).then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      });
    },

    loadFam() {
      if (this._fam) return Promise.resolve(this._fam);
      return this._fetchJson("data/dict-fam.json").then((j) => {
        this._fam = j;
        return j;
      }).catch(() => {
        this._fam = { g: [] };
        return this._fam;
      });
    },

    /** Tải (và cache) bucket rel + forms của một chữ cái. */
    loadBucket(letter) {
      if (this._rel[letter] && this._forms[letter]) {
        return Promise.resolve();
      }
      if (this._pending[letter]) return this._pending[letter];
      this._pending[letter] = Promise.all([
        this._rel[letter]
          ? Promise.resolve()
          : this._fetchJson("data/dict-rel-" + letter + ".json")
              .then((j) => { this._rel[letter] = j; })
              .catch(() => { this._rel[letter] = {}; }),
        this._forms[letter]
          ? Promise.resolve()
          : this._fetchJson("data/dict-forms-" + letter + ".json")
              .then((j) => { this._forms[letter] = j; })
              .catch(() => { this._forms[letter] = {}; })
      ]).finally(() => {
        delete this._pending[letter];
      });
      return this._pending[letter];
    },

    /**
     * Lấy toàn bộ dữ liệu bổ sung của một từ Nga.
     * Trả về: { ru, forms, syn, ant, der, fam, gov, audio } (các mục có thể null).
     */
    async for(word) {
      const ru = this.stripStress(word).toLowerCase().trim();
      if (!ru) return null;
      const letter = this.letter(ru);
      if (!letter) return null;
      await Promise.all([this.loadFam(), this.loadBucket(letter)]);
      const slot = (this._rel[letter] || {})[ru] || {};
      const forms = (this._forms[letter] || {})[ru] || null;
      return {
        ru,
        forms: forms,
        syn: slot.s || null,
        ant: slot.a || null,
        der: slot.d || null,
        fam: slot.fg != null && this._fam ? this._fam.g[slot.fg] || null : null,
        gov: slot.gv || null,
        audio: slot.au || null
      };
    }
  }
};

window.MishkaDict = MishkaDict;
