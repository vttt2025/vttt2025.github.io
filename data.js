const VOCAB_LESSONS = [
  {
    id: "ep1",
    type: "series",
    ep: 1,
    ru: "Собираю чемодан",
    vi: "Tập 1 — Chuẩn bị hành lý",
    scene: "🧳",
    story: "Anya, du học sinh tương lai, đang xếp vali chuẩn bị bay tới Nga học tập.",
    script: [
      { ru: "Меня зовут Аня. Скоро я поеду учиться в Россию!", vi: "Tôi tên là Anya. Sắp tới tôi sẽ sang Nga du học!" },
      { ru: "Я собираю чемодан. Сначала я кладу одежду и обувь.", vi: "Tôi xếp vali. Đầu tiên tôi để quần áo và giày dép." },
      { ru: "В Россию холодно, поэтому я беру тёплую куртку.", vi: "Nga lạnh, nên tôi mang theo áo khoác ấm." },
      { ru: "Потом я кладу книгу и зарядку для телефона.", vi: "Sau đó tôi để sách và sạc điện thoại." },
      { ru: "Паспорт, визу и билет я кладу в маленькую сумку.", vi: "Hộ chiếu, visa và vé tôi để vào túi nhỏ." },
      { ru: "Ещё я беру подарки для новых друзей.", vi: "Tôi còn mang quà cho những người bạn mới." },
      { ru: "Готово! Я готова к поездке!", vi: "Xong! Tôi đã sẵn sàng cho chuyến đi!" }
    ],
    words: [
      { ru: "чемодан", vi: "vali", note: "danh từ nam" },
      { ru: "виза", vi: "visa", note: "danh từ nữ" },
      { ru: "паспорт", vi: "hộ chiếu", note: "danh từ nam" },
      { ru: "билет", vi: "vé", note: "danh từ nam" },
      { ru: "одежда", vi: "quần áo", note: "danh từ nữ" },
      { ru: "обувь", vi: "giày dép", note: "danh từ nữ" },
      { ru: "тёплая куртка", vi: "áo khoác ấm", note: "tính từ + danh từ nữ" },
      { ru: "зарядка", vi: "dây sạc", note: "danh từ nữ" },
      { ru: "собирать / собрать", vi: "xếp, thu dọn", note: "động từ chưa hoàn thành / hoàn thành" },
      { ru: "класть / положить", vi: "để, đặt vào", note: "động từ chưa hoàn thành / hoàn thành" }
    ],
    quiz: [
      { q: "«чемодан» nghĩa là gì?", options: ["vali", "hộ chiếu", "vé máy bay", "quà"], a: 0 },
      { q: "«паспорт» nghĩa là gì?", options: ["visa", "hộ chiếu", "vali", "sách"], a: 1 },
      { ru: "Я ___ чемодан.", q: "Chọn từ đúng: Я ___ чемодан. (tôi xếp vali)", options: ["собираю", "кладу", "беру", "готовлю"], a: 0, ex: "собирать чемодан = xếp vali" },
      { ru: "Я ___ паспорт в сумку.", q: "Chọn từ đúng: Я ___ паспорт в сумку. (tôi để hộ chiếu vào túi)", options: ["положу", "собираю", "лечу", "еду"], a: 0, ex: "положить что-то куда-то = để cái gì đó vào đâu" }
    ]
  },
  {
    id: "ep2",
    type: "series",
    ep: 2,
    ru: "В самолёте",
    vi: "Tập 2 — Trên chuyến bay",
    scene: "✈️",
    story: "Anya làm thủ tục, qua kiểm tra hộ chiếu và lên máy bay — hành trình có quá cảnh ở Moskva.",
    script: [
      { ru: "Аня идёт в аэропорт. Это её первый рейс в Россию.", vi: "Anya đi tới sân bay. Đây là chuyến bay đầu tiên của cô tới Nga." },
      { ru: "— Ваш паспорт и билет, пожалуйста. — Вот, пожалуйста.", vi: "— Hộ chiếu và vé của cô ạ. — Đây ạ." },
      { ru: "У вас есть багаж? — Да, один чемодан. Это ручная кладь.", vi: "Cô có hành lý ký gửi không? — Có, một vali. Còn đây là hành lý xách tay." },
      { ru: "Ваше место — 21А. Рейс с пересадкой в Москве.", vi: "Chỗ của cô là 21A. Chuyến có quá cảnh ở Moskva." },
      { ru: "Объявление: «Регистрация на рейс закончится через 30 минут».", vi: "Thông báo: «Làm thủ tục lên máy bay sẽ kết thúc sau 30 phút»." },
      { ru: "Стюардесса говорит: «Пристегните ремни, пожалуйста».", vi: "Tiếp viên nói: «Xin vui lòng thắt dây an toàn»." },
      { ru: "Аня смотрит в окно и думает: «Скоро я в России!»", vi: "Anya nhìn ra cửa sổ và nghĩ: «Sắp tới Nga rồi!»" }
    ],
    words: [
      { ru: "самолёт", vi: "máy bay", note: "danh từ nam" },
      { ru: "аэропорт", vi: "sân bay", note: "danh từ nam" },
      { ru: "стюардесса", vi: "tiếp viên hàng không", note: "danh từ nữ" },
      { ru: "регистрация", vi: "thủ tục check-in", note: "danh từ nữ" },
      { ru: "посадочный талон", vi: "thẻ lên máy bay", note: "boarding pass" },
      { ru: "багаж", vi: "hành lý ký gửi", note: "danh từ nam" },
      { ru: "ручная кладь", vi: "hành lý xách tay", note: "carry-on" },
      { ru: "паспортный контроль", vi: "kiểm tra hộ chiếu", note: "immigration" },
      { ru: "пересадка", vi: "quá cảnh, chuyển tuyến", note: "transfer" },
      { ru: "объявление", vi: "thông báo (loa)", note: "announcement" }
    ],
    quiz: [
      { q: "«пересадка» nghĩa là gì?", options: ["xuất cảnh", "quá cảnh", "nhập cảnh", "làm thủ tục"], a: 1 },
      { q: "«ручная кладь» là gì?", options: ["Hành lý ký gửi", "Hành lý xách tay", "Thẻ lên máy bay", "Hộ chiếu"], a: 1 },
      { ru: "Пристегните ___, пожалуйста.", q: "Chọn từ đúng: Пристегните ___, пожалуйста. (Xin thắt dây an toàn)", options: ["ремни", "багаж", "место", "талон"], a: 0, ex: "ремень = dây (an toàn)" },
      { q: "Ai nói «Пристегните ремни»?", options: ["Hải quan", "Tiếp viên hàng không", "Lễ tân", "Bác sĩ"], a: 1 }
    ]
  },
  {
    id: "ep3",
    type: "series",
    ep: 3,
    ru: "Первый день в университете",
    vi: "Tập 3 — Ngày đầu nhập học",
    scene: "🎓",
    story: "Anya tới trường, làm thủ tục vào ký túc xá, khám sức khỏe và nhận thời khóa biểu.",
    script: [
      { ru: "Сегодня Аня первый раз в университете. Она немного волнуется.", vi: "Hôm nay Anya lần đầu tới trường. Cô hơi lo lắng." },
      { ru: "Сначала она идёт в деканат и показывает документы.", vi: "Đầu tiên cô tới phòng Dean (dekanat) và xuất trình giấy tờ." },
      { ru: "Потом она идёт в общежитие. Комната маленькая, но уютная.", vi: "Sau đó cô tới ký túc xá. Phòng nhỏ nhưng ấm cúng." },
      { ru: "Завтра медосмотр: нужно сдать кровь и сделать рентген.", vi: "Mai khám sức khỏe: cần lấy máu và chụp X-quang phổi." },
      { ru: "Ещё нужна медицинская страховка. Её делают в первый день.", vi: "Còn cần bảo hiểm y tế nữa. Họ làm nó vào ngày đầu." },
      { ru: "Вечером Аня знакомится с соседкой по комнате.", vi: "Tối đến Anya làm quen với bạn cùng phòng." },
      { ru: "«Привет! Меня зовут Аня. Теперь мы соседи!»", vi: "«Chào bạn! Mình tên Anya. Giờ chúng ta là hàng xóm rồi!»" }
    ],
    words: [
      { ru: "университет", vi: "trường đại học", note: "danh từ nam" },
      { ru: "общежитие", vi: "ký túc xá", note: "danh từ trung" },
      { ru: "медосмотр", vi: "khám sức khỏe", note: "medical check-up" },
      { ru: "сдавать кровь", vi: "lấy máu", note: "làm xét nghiệm máu" },
      { ru: "рентген", vi: "chụp X-quang (phổi)", note: "danh từ nam" },
      { ru: "медицинская страховка", vi: "bảo hiểm y tế", note: "danh từ nữ" },
      { ru: "деканат", vi: "phòng dekanat (giáo vụ)", note: "danh từ nam" },
      { ru: "документы", vi: "giấy tờ", note: "số nhiều" },
      { ru: "расписание", vi: "thời khóa biểu", note: "danh từ trung" },
      { ru: "сосед / соседка", vi: "bạn cùng phòng (nam/nữ)", note: "neighbor" }
    ],
    quiz: [
      { q: "«общежитие» nghĩa là gì?", options: ["Giảng đường", "Ký túc xá", "Thư viện", "Bệnh viện"], a: 1 },
      { q: "«медосмотр» nghĩa là gì?", options: ["Khám sức khỏe", "Học kỳ", "Thời khóa biểu", "Hợp đồng"], a: 0 },
      { ru: "Нужно ___ кровь.", q: "Chọn từ đúng: Нужно ___ кровь. (cần lấy máu)", options: ["сдавать", "давать", "брать", "ехать"], a: 0, ex: "сдавать кровь = lấy máu (xét nghiệm)" },
      { q: "Ở đâu Anya xuất trình giấy tờ?", options: ["Ở ký túc xá", "Ở dekanat", "Ở sân bay", "Ở bệnh viện"], a: 1 }
    ]
  },
  {
    id: "sport",
    type: "topic",
    ru: "Спорт",
    vi: "Chủ đề — Thể thao",
    scene: "⚽",
    story: "Buổi chiều chơi bóng chuyền cùng bạn mới — học từ vựng qua chuỗi hành động.",
    script: [
      { ru: "После занятий мы идём на площадку играть в волейбол.", vi: "Sau giờ học chúng tôi ra sân chơi bóng chuyền." },
      { ru: "Мяч летит высоко. Я прыгаю и бью по мячу.", vi: "Quả bóng bay cao. Tôi nhảy lên và đánh bóng." },
      { ru: "Мой друг подаёт, а я пасую.", vi: "Bạn tôi phát bóng, còn tôi chuyền bóng." },
      { ru: "Мяч в сетке! Как жалко!", vi: "Bóng vào lưới rồi! Tiếc quá!" },
      { ru: "Последний гол — и наша команда побеждает!", vi: "Bàn thắng cuối cùng — và đội của chúng tôi thắng!" },
      { ru: "Мы бегаем, прыгаем и смеёмся. Это отличная тренировка!", vi: "Chúng tôi chạy, cười. Một buổi tập tuyệt vời!" }
    ],
    words: [
      { ru: "спорт", vi: "thể thao", note: "danh từ nam" },
      { ru: "футбол", vi: "bóng đá", note: "играть в футбол" },
      { ru: "волейбол", vi: "bóng chuyền", note: "играть в волейбол" },
      { ru: "мяч", vi: "quả bóng", note: "danh từ nam" },
      { ru: "команда", vi: "đội, đội bóng", note: "danh từ nữ" },
      { ru: "тренировка", vi: "buổi tập", note: "danh từ nữ" },
      { ru: "прыгать / прыгнуть", vi: "nhảy", note: "chưa HT / hoàn thành" },
      { ru: "побеждать / победить", vi: "thắng", note: "chưa HT / hoàn thành" },
      { ru: "гол", vi: "bàn thắng", note: "danh từ nam" },
      { ru: "бегать", vi: "chạy (nhiều lần)", note: "động từ chuyển động" }
    ],
    quiz: [
      { q: "«мяч» nghĩa là gì?", options: ["bàn thắng", "quả bóng", "đội bóng", "sân chơi"], a: 1 },
      { ru: "Мы играем в ___.", q: "Chọn từ đúng: Мы играем в ___. (chúng tôi chơi bóng chuyền)", options: ["волейбол", "волейболе", "волейболу", "волейболом"], a: 0, ex: "играть В + cách 4: играть в волейбол" },
      { q: "«команда побеждает» nghĩa là gì?", options: ["Đội thua", "Đội thắng", "Đội tập luyện", "Đội bắt đầu"], a: 1 },
      { ru: "Мяч летит ___.", q: "Chọn từ đúng: Мяч летит ___. (bóng bay cao)", options: ["высоко", "высокий", "высота", "выше"], a: 0, ex: "высоко = trạng từ «cao»" }
    ]
  },
  {
    id: "food",
    type: "topic",
    ru: "Готовим обед",
    vi: "Chủ đề — Ăn uống, nấu ăn",
    scene: "🍲",
    story: "Anya học nấu món súp đầu tiên trong căn bếp nhỏ của ký túc xá.",
    script: [
      { ru: "Утром я готовлю завтрак: хлеб с сыром и чай с молоком.", vi: "Buổi sáng tôi nấu bữa sáng: bánh mì với phô mai và trà sữa." },
      { ru: "Я режу хлеб и кладу сыр на хлеб.", vi: "Tôi cắt bánh mì và đặt phô mai lên trên." },
      { ru: "Вечером мы с соседкой готовим суп.", vi: "Buổi tối tôi và bạn cùng phòng nấu súp." },
      { ru: "Сначала чистим картошку и режем её. Потом варим.", vi: "Đầu tiên gọt khoai tây và cắt nhỏ. Sau đó luộc." },
      { ru: "Не забудь соль! Без соли суп невкусный.", vi: "Đừng quên muối! Súp không có muối thì nhạt lắm." },
      { ru: "Готово! Как вкусно! За обедом мы говорим о доме.", vi: "Xong rồi! Ngon quá! Trong bữa ăn chúng tôi kể chuyện về nhà." }
    ],
    words: [
      { ru: "готовить / приготовить", vi: "nấu, chuẩn bị", note: "chưa HT / hoàn thành" },
      { ru: "завтрак / обед / ужин", vi: "bữa sáng / trưa / tối", note: "3 bữa chính" },
      { ru: "хлеб", vi: "bánh mì", note: "danh từ nam" },
      { ru: "сыр", vi: "phô mai", note: "danh từ nam" },
      { ru: "молоко", vi: "sữa", note: "danh từ trung" },
      { ru: "суп", vi: "súp, canh", note: "danh từ nam" },
      { ru: "соль", vi: "muối", note: "danh từ nữ" },
      { ru: "вкусно", vi: "ngon", note: "trạng từ" },
      { ru: "резать", vi: "cắt", note: "động từ" },
      { ru: "пить чай", vi: "uống trà", note: "пить + cách 4" }
    ],
    quiz: [
      { q: "«хлеб» nghĩa là gì?", options: ["bánh mì", "phô mai", "sữa", "muối"], a: 0 },
      { ru: "Я пью чай ___ молоком.", q: "Chọn cách đúng: Я пью чай ___ молоком. (trà với sữa)", options: ["с", "в", "на", "по"], a: 0, ex: "«với» + cách 5 (Творительный): с молоком" },
      { q: "«без соли суп невкусный» nghĩa là gì?", options: ["Súp ngon", "Súp mặn", "Súp không muối thì nhạt", "Cần thêm muối ngay"], a: 2 },
      { q: "Bữa tối tiếng Nga là gì?", options: ["завтрак", "обед", "ужин", "полдник"], a: 2 }
    ]
  },
  {
    id: "shop",
    type: "topic",
    ru: "В магазине",
    vi: "Chủ đề — Mua sắm",
    scene: "🛒",
    story: "Cuối tuần Anya ra siêu thị mua đồ ăn cho cả tuần.",
    script: [
      { ru: "В субботу я иду в магазин недалеко от общежития.", vi: "Thứ bảy tôi đi siêu thị gần ký túc xá." },
      { ru: "Я беру корзину и иду по отделам.", vi: "Tôi lấy một chiếc giỏ và đi qua các quầy." },
      { ru: "Я покупаю хлеб, молоко, сыр и яблоки.", vi: "Tôi mua bánh mì, sữa, phô mai và táo." },
      { ru: "Хлеб стоит 50 рублей. Это дёшево!", vi: "Bánh mì giá 50 rúp. Rẻ quá!" },
      { ru: "Яблоки дорогие, но очень вкусные.", vi: "Táo đắt, nhưng rất ngon." },
      { ru: "На кассе я плачу и кладу продукты в пакет.", vi: "Ở quầy thu ngân tôi thanh toán và bỏ đồ vào túi." }
    ],
    words: [
      { ru: "магазин", vi: "cửa hàng, siêu thị", note: "danh từ nam" },
      { ru: "покупать / купить", vi: "mua", note: "chưa HT / hoàn thành" },
      { ru: "деньги", vi: "tiền", note: "luôn số nhiều" },
      { ru: "платить / заплатить", vi: "trả tiền", note: "платить за что-то" },
      { ru: "цена", vi: "giá", note: "danh từ nữ" },
      { ru: "дорого / дёшево", vi: "đắt / rẻ", note: "trạng từ" },
      { ru: "касса", vi: "quầy thanh toán", note: "danh từ nữ" },
      { ru: "пакет", vi: "túi ni-lông", note: "danh từ nam" },
      { ru: "корзина", vi: "giỏ hàng", note: "danh từ nữ" },
      { ru: "стоит", vi: "giá... (đáng giá)", note: "Сколько стоит?" }
    ],
    quiz: [
      { q: "«Сколько стоит хлеб?» nghĩa là gì?", options: ["Bánh mì ở đâu?", "Bánh mì giá bao nhiêu?", "Bánh mì ngon không?", "Mua bánh mì nhé?"], a: 1 },
      { ru: "Я ___ хлеб и молоко.", q: "Chọn từ đúng: Я ___ хлеб и молоко. (tôi mua bánh mì và sữa)", options: ["покупаю", "плачу", "стою", "иду"], a: 0, ex: "покупать = mua; платить = trả tiền" },
      { q: "«дёшево» nghĩa là gì?", options: ["Đắt", "Rẻ", "Giảm giá", "Miễn phí"], a: 1 },
      { ru: "Я плачу ___ кассе.", q: "Chọn giới từ đúng: Я плачу ___ кассе. (tôi thanh toán ở quầy)", options: ["на", "в", "о", "за"], a: 0, ex: "на кассе — cách 6, nơi chốn" }
    ]
  }
];

const GRAMMAR_LESSONS = [
  {
    id: "gender",
    title: "Род существительных",
    vi: "Giống của danh từ",
    topic: "Chủ đề liên quan: Chuẩn bị hành lý",
    rules: [
      "Danh từ giống nam: thường kết thúc bằng phụ âm (паспорт, чемодан, аэропорт).",
      "Danh từ giống nữ: kết thúc bằng -а / -я (виза, одежда, касса).",
      "Danh từ giống trung: kết thúc bằng -о / -е (молоко, общежитие, расписание).",
      "Tính từ phải hòa hợp với giống của danh từ: тёплый чай, тёплая куртка, тёплое молоко."
    ],
    table: {
      head: ["Giống", "Kết thúc", "Ví dụ"],
      rows: [
        ["Nam (он)", "phụ âm", "чемодан, паспорт, суп"],
        ["Nữ (она)", "-а / -я", "виза, одежда, касса"],
        ["Trung (оно)", "-о / -е", "молоко, общежитие"]
      ]
    },
    questions: [
      { q: "«виза» là danh từ giống gì?", options: ["Nam", "Nữ", "Trung", "Không có giống"], a: 1, ex: "Kết thúc bằng -а → giống nữ." },
      { q: "«общежитие» là danh từ giống gì?", options: ["Nam", "Nữ", "Trung", "Số nhiều"], a: 2, ex: "Kết thúc bằng -е → giống trung." },
      { q: "Điền tính từ đúng: тёплая ___.", options: ["чай", "куртка", "молоко", "чемодан"], a: 1, ex: "тёплая + danh từ nữ (куртка)." },
      { q: "«молоко» là danh từ giống gì?", options: ["Nam", "Nữ", "Trung", "Không có giống"], a: 2, ex: "Kết thúc bằng -о → giống trung." }
    ]
  },
  {
    id: "accusative",
    title: "Винительный падеж (Cách 4)",
    vi: "Cách đối tượng — mua gì? xem gì?",
    topic: "Chủ đề liên quan: Mua sắm",
    rules: [
      "Cách 4 dùng cho tân ngữ trực tiếp: Я покупаю хлеб (tôi mua bánh mì).",
      "Danh từ nam vô tri (đồ vật): giữ nguyên. Я покупаю хлеб, сыр.",
      "Danh từ nữ: -а → -у, -я → -ю. книга → книгу, куртка → куртку.",
      "Danh từ trung: không đổi. Я пью молоко."
    ],
    table: {
      head: ["Nguyên mẫu", "Cách 4", "Ví dụ"],
      rows: [
        ["книга (nữ)", "книгу", "Я читаю книгу."],
        ["куртка (nữ)", "куртку", "Я покупаю куртку."],
        ["хлеб (nam)", "хлеб", "Я покупаю хлеб."],
        ["молоко (trung)", "молоко", "Я пью молоко."]
      ]
    },
    questions: [
      { q: "Я читаю ___. (книга)", options: ["книга", "книгу", "книге", "книги"], a: 1, ex: "Danh từ nữ -а → -у ở cách 4: книгу." },
      { q: "Я покупаю ___. (куртка)", options: ["куртка", "куртку", "куртке", "куртки"], a: 1, ex: "куртка → куртку." },
      { q: "Я пью ___. (молоко)", options: ["молоко", "молоку", "молока", "молоке"], a: 0, ex: "Danh từ trung không đổi ở cách 4." },
      { q: "Я вижу ___. (чемодан)", options: ["чемодан", "чемодану", "чемодана", "чемодане"], a: 0, ex: "Danh từ nam vô tri giữ nguyên." }
    ]
  },
  {
    id: "prepositional",
    title: "Предложный падеж (Cách 6)",
    vi: "Cách nơi chốn — ở đâu?",
    topic: "Chủ đề liên quan: Nhập học, Mua sắm",
    rules: [
      "Dùng để chỉ nơi chốn, luôn đi với giới từ В (trong) hoặc НА (trên): Где? — ở đâu?",
      "Danh từ thêm -е: в университете, в магазине, в самолёте.",
      "Danh từ nữ -а/-я → -е: в кассе... nhưng -ия → -ии: в России.",
      "Ví dụ mẫu: Я живу в общежитии. Я покупаю хлеб в магазине."
    ],
    table: {
      head: ["Nguyên mẫu", "Cách 6 (ở đâu?)", "Nghĩa"],
      rows: [
        ["университет", "в университете", "ở trường đại học"],
        ["магазин", "в магазине", "ở cửa hàng"],
        ["общежитие", "в общежитии", "ở ký túc xá"],
        ["самолёт", "в самолёте", "trên máy bay"]
      ]
    },
    questions: [
      { q: "Я живу в ___. (общежитие)", options: ["общежитие", "общежитии", "общежитию", "общежития"], a: 1, ex: "-ие → -ии: в общежитии." },
      { q: "Я покупаю хлеб в ___. (магазин)", options: ["магазин", "магазина", "магазине", "магазину"], a: 2, ex: "в магазине — nơi mua sắm." },
      { q: "Сейчас мы в ___. (самолёт)", options: ["самолёт", "самолёта", "самолёте", "самолёту"], a: 2, ex: "в самолёте — trên máy bay." },
      { q: "Анна учится в ___. (университет)", options: ["университет", "университете", "университета", "университету"], a: 1, ex: "в университете." }
    ]
  },
  {
    id: "motion",
    title: "Глаголы движения: идти / ехать",
    vi: "Động từ chuyển động: đi bộ / đi xe",
    topic: "Chủ đề liên quan: Cả series",
    rules: [
      "идти (đi bộ): Я иду в университет. (gần, đi bộ)",
      "ехать (đi xe): Я еду в аэропорт. (xa, đi xe/máy bay)",
      "Плыть (đi thuyền): Мы плывём на пароме.",
      "Quá khứ: шла/шёл (đi bộ), ехала/ехал (đi xe)."
    ],
    table: {
      head: ["Hiện tại", "Quá khứ", "Nghĩa"],
      rows: [
        ["иду, идёшь, идут", "шла / шёл", "đi bộ"],
        ["еду, едешь, едут", "ехала / ехал", "đi xe"],
        ["плыву, плывёшь", "плыла / плыл", "đi thuyền"]
      ]
    },
    questions: [
      { q: "Университет рядом, я ___ туда каждый день.", options: ["иду", "еду", "лечу", "плыву"], a: 0, ex: "Gần → đi bộ → иду." },
      { q: "Аэропорт далеко, поэтому я ___ на такси.", options: ["иду", "еду", "бегу", "хожу"], a: 1, ex: "Đi taxi → ехать → еду." },
      { q: "Вчера мы ___ в Москву на поезде.", options: ["шли", "ехали", "плыли", "летели"], a: 1, ex: "Tàu hỏa → ехали." },
      { q: "Анна ___ в аэропорт пешком.", options: ["идёт", "едет", "плывёт", "летит"], a: 0, ex: "пешком = đi bộ → идёт." }
    ]
  },
  {
    id: "aspect",
    title: "Вид глагола: делать / сделать",
    vi: "Thể chưa hoàn thành / hoàn thành",
    topic: "Chủ đề liên quan: Mua sắm, Xếp vali",
    rules: [
      "Chưa hoàn thành (НСВ): quá trình, lặp lại — собирать чемодан, покупать хлеб.",
      "Hoàn thành (СВ): kết quả, một lần — собрать чемодан, купить хлеб.",
      "Только СВ dùng cho quá khứ kết quả: Вчера я купил хлеб. (đã mua xong)",
      "Только НСВ dùng cho hiện tại: Сейчас я покупаю хлеб."
    ],
    table: {
      head: ["НСВ (quá trình)", "СВ (kết quả)", "Ví dụ СВ"],
      rows: [
        ["собирать", "собрать", "Я собрал чемодан."],
        ["покупать", "купить", "Я купил молоко."],
        ["делать", "сделать", "Я сделал задание."],
        ["готовить", "приготовить", "Мама приготовила суп."]
      ]
    },
    questions: [
      { q: "Вчера я ___ хлеб и молоко.", options: ["купил", "покупаю", "куплю", "покупал бы"], a: 0, ex: "Quá khứ có kết quả → СВ: купил." },
      { q: "Сейчас я ___ суп.", options: ["приготовил", "готовлю", "приготовлю", "готов"], a: 1, ex: "Hiện tại → chỉ НСВ: готовлю." },
      { q: "Завтра я ___ чемодан.", options: ["соберу", "собираю", "собирал", "буду собирать"], a: 0, ex: "Tương lai một lần → СВ: соберу." },
      { q: "Мама уже ___ суп.", options: ["приготовила", "готовит", "готовит ещё", "готовить"], a: 0, ex: "«уже» = đã xong → СВ: приготовила." }
    ]
  }
];

const LISTENING_LESSONS = [
  {
    id: "lis-airport",
    title: "В аэропорту",
    vi: "Ở sân bay — hội thoại nhập môn",
    level: "ТРКИ ТЭУ (Sơ cấp)",
    lines: [
      { who: "Nhân viên", ru: "Ваш паспорт и билет, пожалуйста.", vi: "Xin hộ chiếu và vé của anh/chị." },
      { who: "Аня", ru: "Вот, пожалуйста.", vi: "Đây ạ." },
      { who: "Nhân viên", ru: "У вас есть багаж?", vi: "Anh/chị có hành lý ký gửi không?" },
      { who: "Аня", ru: "Да, один чемодан. Это ручная кладь.", vi: "Có, một vali. Còn đây là hành lý xách tay." },
      { who: "Nhân viên", ru: "Ваше место — 21А. Рейс с пересадкой в Москве.", vi: "Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva." },
      { who: "Аня", ru: "Спасибо! А где паспортный контроль?", vi: "Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?" },
      { who: "Nhân viên", ru: "Там, направо. Ваш рейс через два часа.", vi: "Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa." }
    ],
    blanks: [
      { before: "Ваш", blank: "паспорт", after: "и билет, пожалуйста.", hint: "hộ chiếu" },
      { before: "У вас есть", blank: "багаж", after: "?", hint: "hành lý ký gửi" },
      { before: "Это", blank: "ручная кладь", after: ".", hint: "hành lý xách tay" },
      { before: "Ваше", blank: "место", after: "— 21А.", hint: "chỗ ngồi" },
      { before: "Рейс с", blank: "пересадкой", after: "в Москве.", hint: "quá cảnh" }
    ],
    dictation: [
      "Вот, пожалуйста.",
      "У вас есть багаж?",
      "Спасибо! А где паспортный контроль?"
    ],
    questions: [
      { q: "Chỗ ngồi của Anya là số nào?", options: ["12Б", "21А", "21Б", "20А"], a: 1 },
      { q: "Chuyến bay của Anya có điểm gì đặc biệt?", options: ["Bay thẳng", "Quá cảnh ở Moskva", "Bị hoãn", "Bay đêm"], a: 1 },
      { q: "Anya có mấy vali ký gửi?", options: ["Không có", "Một", "Hai", "Ba"], a: 1 },
      { q: "Kiểm tra hộ chiếu ở đâu?", options: ["Bên trái", "Đi thẳng", "Bên phải", "Ở tầng hai"], a: 2 }
    ]
  },
  {
    id: "lis-shop",
    title: "В магазине",
    vi: "Ở cửa hàng — hỏi giá, mua đồ",
    level: "ТРКИ ТЭУ (Sơ cấp)",
    lines: [
      { who: "Аня", ru: "Извините, сколько стоит хлеб?", vi: "Xin lỗi, bánh mì giá bao nhiêu ạ?" },
      { who: "Nhân viên", ru: "Хлеб стоит 50 рублей.", vi: "Bánh mì giá 50 rúp." },
      { who: "Аня", ru: "Хорошо, я беру хлеб. И молоко тоже есть?", vi: "Được ạ, tôi lấy bánh mì. Còn có sữa không ạ?" },
      { who: "Nhân viên", ru: "Конечно. Молоко вон там, слева.", vi: "Tất nhiên. Sữa ở kia, bên trái." },
      { who: "Аня", ru: "Спасибо большое!", vi: "Cảm ơn nhiều ạ!" },
      { who: "Nhân viên", ru: "Платите на кассе, пожалуйста. Всего доброго!", vi: "Xin thanh toán ở quầy thu ngân. Chào tạm biệt!" }
    ],
    blanks: [
      { before: "Сколько", blank: "стоит", after: "хлеб?", hint: "giá là" },
      { before: "Хлеб стоит", blank: "50 рублей", after: ".", hint: "50 rúp" },
      { before: "Молоко вон там,", blank: "слева", after: ".", hint: "bên trái" },
      { before: "Платите на", blank: "кассе", after: ", пожалуйста.", hint: "quầy thu ngân" }
    ],
    dictation: [
      "Сколько стоит хлеб?",
      "Хорошо, я беру хлеб.",
      "Спасибо большое!"
    ],
    questions: [
      { q: "Bánh mì giá bao nhiêu?", options: ["15 rúp", "50 rúp", "50 kopek", "100 rúp"], a: 1 },
      { q: "Sữa ở đâu trong cửa hàng?", options: ["Bên phải", "Bên trái", "Ở quầy thu ngân", "Tầng hai"], a: 1 },
      { q: "Khách thanh toán ở đâu?", options: ["Tại chỗ", "Ở cửa ra", "Ở quầy thu ngân (касса)", "Gửi tiền trước"], a: 2 }
    ]
  }
];

const SPEAKING_SETS = [
  {
    id: "sp-basic",
    title: "Chào hỏi & giới thiệu",
    items: [
      { ru: "Привет! Меня зовут Аня.", vi: "Chào bạn! Mình tên là Anya." },
      { ru: "Очень приятно!", vi: "Rất vui được gặp bạn!" },
      { ru: "Я студентка из Вьетнама.", vi: "Mình là sinh viên đến từ Việt Nam." },
      { ru: "Я изучаю русский язык.", vi: "Mình đang học tiếng Nga." },
      { ru: "Как вас зовут?", vi: "Bạn tên là gì ạ?" },
      { ru: "Спасибо большое!", vi: "Cảm ơn nhiều!" }
    ]
  },
  {
    id: "sp-travel",
    title: "Ở sân bay & trên máy bay",
    items: [
      { ru: "Вот мой паспорт и билет.", vi: "Đây là hộ chiếu và vé của tôi." },
      { ru: "У меня один чемодан.", vi: "Tôi có một cái vali." },
      { ru: "Где паспортный контроль?", vi: "Kiểm tra hộ chiếu ở đâu ạ?" },
      { ru: "Я лечу в Москву с пересадкой.", vi: "Tôi bay tới Moskva với một điểm quá cảnh." },
      { ru: "Моё место — двадцать один А.", vi: "Chỗ của tôi là 21A." },
      { ru: "Спасибо, всего доброго!", vi: "Cảm ơn, chào tạm biệt!" }
    ]
  },
  {
    id: "sp-campus",
    title: "Ở trường & ký túc xá",
    items: [
      { ru: "Я живу в общежитии.", vi: "Tôi sống ở ký túc xá." },
      { ru: "Сегодня у нас медосмотр.", vi: "Hôm nay chúng tôi có khám sức khỏe." },
      { ru: "Где деканат университета?", vi: "Phòng dekanat của trường ở đâu ạ?" },
      { ru: "У меня есть медицинская страховка.", vi: "Tôi có bảo hiểm y tế." },
      { ru: "Когда начинается занятие?", vi: "Khi nào tiết học bắt đầu ạ?" },
      { ru: "Мне нужно расписание.", vi: "Tôi cần thời khóa biểu." }
    ]
  }
];

const WRITING_TASKS = [
  {
    id: "w1",
    level: "ТЭУ — Sơ cấp",
    title: "Bức tự giới thiệu ngắn",
    prompt: "Расскажите о себе: как вас зовут, откуда вы, где вы живёте и что вы изучаете. (4–6 câu)",
    vi: "Giới thiệu về bản thân: tên, quê quán, đang sống ở đâu, đang học gì. (4–6 câu)",
    minWords: 20,
    tips: [
      "Dùng cấu trúc: Меня зовут... (tôi tên là...)",
      "Dùng Я живу в... + cách 6 (в общежитии, в Ханое)",
      "Dùng Я изучаю + cách 4 (русский язык)"
    ],
    model: "Меня зовут Минь. Я из Вьетнама. Сейчас я живу в общежитии в Москве. Я студент первого курса. Я изучаю русский язык. Я очень рад, что я в России!"
  },
  {
    id: "w2",
    level: "ТЭУ — Sơ cấp",
    title: "Mô tả một ngày của bạn",
    prompt: "Напишите о вашем дне: во сколько вы встаёте, что вы делаете утром, днём и вечером.",
    vi: "Viết về một ngày của bạn: mấy giờ dậy, buổi sáng/trưa/tối làm gì.",
    minWords: 30,
    tips: [
      "Dùng trạng từ thời gian: утром, днём, вечером",
      "Dùng động từ: вставать, завтракать, учиться, готовить, смотреть",
      "Dùng «сначала... потом...» (đầu tiên... sau đó...)"
    ],
    model: "Я встаю в семь часов. Сначала я завтракаю: я ем хлеб с сыром и пью чай. Потом я иду в университет. Днём я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю фильм."
  },
  {
    id: "w3",
    level: "ТРКИ-1 — Trung cấp thấp",
    title: "Thư cho bạn kể về việc mua sắm",
    prompt: "Напишите другу письмо о том, как вы ходили в магазин вчера. Что вы покупали? Сколько стоили продукты?",
    vi: "Viết thư cho bạn kể về buổi đi mua sắm hôm qua. Mua gì? Giá bao nhiêu?",
    minWords: 40,
    tips: [
      "Mở thư: Привет,... / Здравствуй,...",
      "Dùng quá khứ СВ: купил(а), заплатил(а)",
      "Dùng: Мне нравится... / Это было дёшево, но вкусно"
    ],
    model: "Привет, Лан! Вчера я ходила в магазин около общежития. Я купила хлеб, молоко, сыр и яблоки. Хлеб стоил 50 рублей, это дёшево. Яблоки были дорогие, но очень вкусные. Я заплатила 400 рублей. Мне нравится этот магазин. До встречи!"
  },
  {
    id: "w4",
    level: "ТРКИ-1 — Trung cấp thấp",
    title: "Bài viết ngắn về chủ đề «Thể thao và sức khỏe»",
    prompt: "Напишите небольшой текст о спорте в вашей жизни. Каким спортом вы занимались? Почему спорт важен?",
    vi: "Viết đoạn văn ngắn về thể thao trong cuộc sống của bạn. Bạn từng chơi môn gì? Vì sao thể thao quan trọng?",
    minWords: 50,
    tips: [
      "Dùng играть В + cách 4: играть в футбол, в волейбол",
      "Dùng НСВ для thói quen: я бегаю, я плаваю",
      "Kết bài với ý kiến: Я думаю, что спорт очень важен, потому что..."
    ],
    model: "Я очень люблю спорт. В школе я играл(а) в футбол, а сейчас я играю в волейбол с друзьями из общежития. Мы тренируемся два раза в неделю. Спорт помогает мне быть здоровым и весёлым. Я думаю, что каждый студент должен заниматься спортом, потому что учёба — это тоже большая нагрузка."
  }
];

const MOCK_TEST = {
  title: "Đề thi thử ТРКИ ТЭУ (Trình độ sơ cấp)",
  durationMin: 45,
  passPercent: 60,
  parts: [
    {
      id: "gram",
      name: "Часть 1. Лексика и грамматика",
      vi: "Phần 1. Từ vựng và ngữ pháp",
      questions: [
        { q: "Вот ___. (словарь)", options: ["словарь", "словаря", "словаре", "словару"], a: 0, ex: "Вот + cách 1 (dạng gốc)." },
        { q: "Я студент. ___ зовут Антон.", options: ["Меня", "Мне", "Мой", "Я"], a: 0, ex: "Меня зовут... = tên tôi là..." },
        { q: "Антон живёт в ___. (общежитие)", options: ["общежитие", "общежитии", "общежитию", "общежития"], a: 1, ex: "в + cách 6: -ие → -ии." },
        { q: "Я читаю ___. (книга)", options: ["книга", "книгу", "книге", "книги"], a: 1, ex: "Cách 4, nữ -а → -у." },
        { q: "Вчера мы ___ в кино.", options: ["ходим", "ходили", "пришли", "заходили"], a: 1, ex: "Quá khứ НСВ của ходить → ходили." },
        { q: "Студент ___ домашнее задание.", options: ["делает", "даёт", "играет", "стоит"], a: 0, ex: "делать задание = làm bài tập." },
        { q: "У ___ есть брат.", options: ["я", "меня", "мне", "мой"], a: 1, ex: "У + cách 2 (меня): у меня есть." },
        { q: "Сколько ___ этот телефон?", options: ["стоит", "стоят", "стоил", "стоять"], a: 0, ex: "Сколько стоит + danh từ số ít?" },
        { q: "Мы ___ в Москву на поезде.", options: ["идём", "едем", "плывём", "бежим"], a: 1, ex: "Tàu hỏa → ехать." },
        { q: "Вчера я ___ хлеб и молоко.", options: ["куплю", "купил", "покупаю", "покупаю бы"], a: 1, ex: "Quá khứ kết quả → СВ: купил." },
        { q: "Сестра работает в ___. (больница)", options: ["больница", "больнице", "больницу", "больницы"], a: 1, ex: "в + cách 6: -а → -е." },
        { q: "Анна любит ___ кофе утром.", options: ["пить", "пьёт", "пьют", "пил"], a: 0, ex: "любить + НСВ nguyên mẫu." }
      ]
    },
    {
      id: "reading",
      name: "Часть 2. Чтение",
      vi: "Phần 2. Đọc hiểu",
      text: {
        ru: "Меня зовут Хай. Я студент из Вьетнама. Сейчас я живу в России, в Москве. Я учусь в университете на первом курсе. Я живу в общежитии. Комната небольшая, но удобная. Утром я встаю в семь часов, завтракаю и иду в университет. После занятий я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю русские фильмы. По субботам я играю в волейбол с друзьями. Мне нравится жизнь в Москве!",
        vi: "Tôi tên là Hải. Tôi là sinh viên người Việt Nam. Hiện tôi đang sống ở Nga, tại Moskva. Tôi học năm nhất ở trường đại học. Tôi sống ở ký túc xá. Phòng không rộng lắm nhưng tiện nghi. Buổi sáng tôi dậy lúc 7 giờ, ăn sáng rồi đi bộ tới trường. Buổi chiều tôi học ở thư viện. Buổi tối tôi nấu bữa tối và xem phim Nga. Thứ bảy tôi chơi bóng chuyền với bạn. Tôi thích cuộc sống ở Moskva!"
      },
      questions: [
        { q: "Откуда Хай?", options: ["Из Китая", "Из Вьетнама", "Из России", "Из Кореи"], a: 1, ex: "«Я студент из Вьетнама»." },
        { q: "Где живёт Хай?", options: ["В гостинице", "В общежитии", "Дома", "У друзей"], a: 1, ex: "«Я живу в общежитии»." },
        { q: "Когда Хай встаёт?", options: ["В шесть часов", "В семь часов", "В восемь часов", "В девять часов"], a: 1, ex: "«Я встаю в семь часов»." },
        { q: "Где Хай занимается днём?", options: ["В общежитии", "Дома", "В библиотеке", "В магазине"], a: 2, ex: "«Я занимаюсь в библиотеке»." },
        { q: "Каким спортом Хай занимается по субботам?", options: ["Футболом", "Теннисом", "Волейболом", "Плаванием"], a: 2, ex: "«По субботам я играю в волейбол»." }
      ]
    },
    {
      id: "listening",
      name: "Часть 3. Аудирование",
      vi: "Phần 3. Nghe hiểu (bấm 🔊 để nghe)",
      lines: [
        { who: "Аня", ru: "Извините, сколько стоит этот словарь?", vi: "" },
        { who: "Продавец", ru: "Этот словарь стоит 300 рублей.", vi: "" },
        { who: "Аня", ru: "Хорошо. А где русские книги?", vi: "" },
        { who: "Продавец", ru: "Русские книги слева, на втором этаже.", vi: "" },
        { who: "Аня", ru: "Спасибо большое!", vi: "" },
        { who: "Продавец", ru: "Пожалуйста! Платите наверху, на кассе.", vi: "" }
      ],
      questions: [
        { q: "Что хочет купить Аня?", options: ["Книгу", "Словарь", "Хлеб", "Куртку"], a: 1, ex: "«Сколько стоит этот словарь?»" },
        { q: "Сколько стоит словарь?", options: ["200 рублей", "250 рублей", "300 рублей", "350 рублей"], a: 2, ex: "«Словарь стоит 300 рублей»." },
        { q: "Где русские книги?", options: ["Справа, на первом этаже", "Слева, на втором этаже", "В центре, на третьем этаже", "На кассе"], a: 1, ex: "«Русские книги слева, на втором этаже»." },
        { q: "Где Аня платит?", options: ["Наверху, на кассе", "Дома", "В другом магазине", "В библиотеке"], a: 0, ex: "«Платите наверху, на кассе»." }
      ]
    }
  ]
};

const BLOG_POSTS = [
  {
    title: "Lộ trình ôn ТРКИ ТЭУ trong 3 tháng",
    tag: "Lộ trình",
    date: "Tháng 9, 2026",
    excerpt: "Tháng 1: bảng chữ cái + từ vựng sống còn qua video series. Tháng 2: 6 cách + động từ chuyển động. Tháng 3: luyện đề mỗi tuần và sửa phát âm bằng AI.",
    icon: "🗺️"
  },
  {
    title: "Học từ vựng qua chuỗi hành động — vì sao hiệu quả?",
    date: "Tháng 8, 2026",
    excerpt: "Thay vì học «bánh mì» đơn lẻ, hãy học cả câu: «Я режу хлеб и кладу сыр на хлеб» — một câu có danh từ, động từ và giới từ cùng lúc.",
    icon: "🎬"
  },
  {
    title: "5 lỗi phát âm tiếng Nga của người Việt",
    date: "Tháng 8, 2026",
    excerpt: "Ы, р, мягкий знак — ba «hung thủ» quen thuộc. Dùng chế độ luyện nói của trang để AI chấm điểm từng câu và theo dõi tiến bộ.",
    icon: "🎙️"
  }
];


// =======================================================================
// NGÂN HÀNG ĐỀ THI TRKI CHUẨN QUỐC TẾ (TRKI_BANK)
// =======================================================================
const TRKI_BANK = [
  {
    id: "trki_a1",
    level: "A1 (ТЭУ)",
    levelName: "Trình độ sơ cấp A1",
    title: "Đề thi thử ТРКИ ТЭУ (Trình độ sơ cấp)",
    durationMin: 45,
    passPercent: 60,
    is_pro_only: false,
    parts: MOCK_TEST.parts
  },
  {
    id: "trki_a2",
    level: "A2 (ТБУ)",
    levelName: "Trình độ cơ bản A2",
    title: "Đề thi thử ТРКИ ТБУ (Trình độ cơ bản)",
    durationMin: 50,
    passPercent: 66,
    is_pro_only: false,
    parts: [
      {
        id: "gram",
        name: "Часть 1. Лексика и грамматика",
        vi: "Phần 1. Từ vựng và ngữ pháp",
        questions: [
          { q: "Мы познакомились с новым ___. (преподаватель)", options: ["преподавателем", "преподавателя", "преподавателю", "преподаватель"], a: 0, ex: "с + cách 5 (kết thúc phụ âm mềm -ель -> -елем)." },
          { q: "Анна часто звонит своей ___. (мать)", options: ["матери", "матерью", "мать", "матере"], a: 0, ex: "звонить + cách 3 (мать -> матери)." },
          { q: "Вчера я долго ___ эту сложную книгу.", options: ["читал", "прочитал", "прочту", "почитаю"], a: 0, ex: "долго + động từ chưa hoàn thành thể (НСВ) ở quá khứ." },
          { q: "Когда мы пришли на вокзал, поезд уже ___.", options: ["ушёл", "уходил", "идёт", "поедет"], a: 0, ex: "Hành động tàu rời ga đã hoàn tất trước đó -> dùng СВ quá khứ (ушёл)." },
          { q: "Он спросил меня, ___ я поеду на экскурсию.", options: ["поеду ли", "что", "как", "чтобы"], a: 0, ex: "Câu hỏi gián tiếp có/không -> dùng tiểu từ 'ли' đặt sau động từ." },
          { q: "Если завтра будет хорошая погода, мы ___ за город.", options: ["поедем", "ехали", "ездим", "будем ехать"], a: 0, ex: "Điều kiện tương lai một lần -> dùng động từ chuyển động СВ 'поедем'." }
        ]
      },
      {
        id: "reading",
        name: "Часть 2. Чтение",
        vi: "Phần 2. Đọc hiểu",
        text: {
          ru: "Санкт-Петербург — один из самых красивых городов мира. Его основал царь Пётр Первый в 1703 году. Город называют 'Северной столицей' России. В Петербурге много музеев, театров и памятников архитектуры. Самый известный музей — Эрмитаж, в котором собраны миллионы произведений искусства. Каждый год миллионы туристов приезжают сюда, особенно летом во время знаменитых Белых ночей.",
          vi: "Sankt-Peterburg là một trong những thành phố đẹp nhất thế giới. Sa hoàng Pyotr Đại đế đã thành lập thành phố vào năm 1703. Thành phố được gọi là 'Thủ đô phía Bắc' của nước Nga. Tại Peterburg có rất nhiều bảo tàng, nhà hát và di tích kiến trúc. Bảo tàng nổi tiếng nhất là Hermitage, nơi quy tụ hàng triệu tác phẩm nghệ thuật. Hàng năm có hàng triệu du khách đến đây, đặc biệt vào mùa hè trong dịp Đêm Trắng nổi tiếng."
        },
        questions: [
          { q: "Кто и когда основал Санкт-Петербург?", options: ["Пётр Первый в 1703 году", "Екатерина Вторая в 1750 году", "Иван Грозный в 1650 году", "Александр Первый в 1812 году"], a: 0, ex: "'Его основал царь Пётр Первый в 1703 году.'" },
          { q: "Как часто называют Санкт-Петербург?", options: ["Северной столицей", "Золотым кольцом", "Южной гаванью", "Старым кремлём"], a: 0, ex: "'Город называют Северной столицей России.'" },
          { q: "Какой музей самый известный в городе?", options: ["Эрмитаж", "Третьяковская галерея", "Русский музей", "Пушкинский музей"], a: 0, ex: "'Самый известный музей — Эрмитаж.'" },
          { q: "Когда особенно много туристов приезжает в город?", options: ["Летом во время Белых ночей", "Зимой на Новый год", "Осенью в октябре", "Весной в марте"], a: 0, ex: "'...особенно летом во время знаменитых Белых ночей.'" }
        ]
      },
      {
        id: "listening",
        name: "Часть 3. Аудирование",
        vi: "Phần 3. Nghe hiểu",
        lines: [
          { who: "Пассажир", ru: "Скажите, пожалуйста, как доехать до Красной площади?", vi: "Xin hỏi làm thế nào để đi tới Quảng trường Đỏ?" },
          { who: "Дежурный", ru: "Вам нужно сесть на метро на станцию 'Университет' и доехать до станции 'Охотный ряд'.", vi: "Bạn cần lên tàu điện ngầm ở ga 'Đại học' và đi đến ga 'Okhotny Ryad'." },
          { who: "Пассажир", ru: "Это прямая линия или нужно делать пересадку?", vi: "Đây là tuyến thẳng hay phải đổi chuyến ạ?" },
          { who: "Дежурный", ru: "Это прямая Сокольническая линия, пересадка не нужна. Время в пути около 15 минут.", vi: "Đây là tuyến Sokolnicheskaya thẳng, không cần đổi tàu. Thời gian đi khoảng 15 phút." }
        ],
        questions: [
          { q: "Куда хочет поехать пассажир?", options: ["На Красную площадь", "В университет", "В музей Эрмитаж", "На вокзал"], a: 0, ex: "'как доехать до Красной площади?'" },
          { q: "На какую станцию метро нужно доехать?", options: ["Охотный ряд", "Университет", "Арбатская", "Театральная"], a: 0, ex: "'доехать до станции Охотный ряд'" },
          { q: "Нужна ли пассажиру пересадка?", options: ["Нет, это прямая линия", "Да, одна пересадка", "Да, две пересадки", "Нужно ехать на автобусе"], a: 0, ex: "'пересадка не нужна'" }
        ]
      }
    ]
  },
  {
    id: "trki_b1",
    level: "B1 (ТРКИ-1)",
    levelName: "Chứng chỉ ТРКИ-1 (Vào đại học)",
    title: "Đề thi chuẩn quốc tế ТРКИ-1 (Đầu vào Đại học Nga)",
    durationMin: 60,
    passPercent: 66,
    is_pro_only: true,
    parts: [
      {
        id: "gram",
        name: "Часть 1. Лексика и грамматика",
        vi: "Phần 1. Từ vựng và ngữ pháp chuyên sâu",
        questions: [
          { q: "Несмотря на ___, студенты успешно сдали все экзамены.", options: ["трудности", "trudnostey", "трудностям", "трудностями"], a: 0, ex: "Несмотря на + cách 4 (трудности danh từ số nhiều bất động vật)." },
          { q: "Благодаря ___ преподавателя группа отлично подготовилась к тесту.", options: ["помощи", "помощь", "помощью", "о помощи"], a: 0, ex: "Благодаря + cách 3 (помощь -> помощи)." },
          { q: "Мы гордимся ___ нашей научной лаборатории.", options: ["достижениями", "достижения", "достижений", "достижениям"], a: 0, ex: "гордиться + cách 5 số nhiều (-ами/-ями)." }
        ]
      },
      {
        id: "reading",
        name: "Часть 2. Чтение",
        vi: "Phần 2. Đọc hiểu văn bản học thuật",
        text: {
          ru: "Научные исследования в области искусственного интеллекта в российских университетах развиваются стремительными темпами. Ведущие центры в Москве и Санкт-Петербурге разрабатывают новые модели машинного обучения для медицины, транспорта и лингвистики. Студенты бакалавриата и магистратуры имеют возможность участвовать в реальных проектах с первого года обучения.",
          vi: "Các nghiên cứu khoa học trong lĩnh vực trí tuệ nhân tạo tại các trường đại học Nga đang phát triển với tốc độ nhanh chóng. Các trung tâm hàng đầu tại Moskva và Saint Petersburg đang phát triển các mô hình học máy mới cho y học, giao thông và ngôn ngữ học. Sinh viên đại học và cao học có cơ hội tham gia vào các dự án thực tế ngay từ năm thứ nhất."
        },
        questions: [
          { q: "В каких сферах разрабатываются модели машинного обучения?", options: ["В медицине, транспорте и лингвистике", "В сельском хозяйстве и туризме", "Только в военной отрасли", "В строительстве дорог"], a: 0, ex: "'...для медицины, транспорта и лингвистики.'" },
          { q: "С какого времени студенты могут участвовать в проектах?", options: ["С первого года обучения", "Только в аспирантуре", "После окончания университета", "С третьего курса"], a: 0, ex: "'...с первого года обучения.'" }
        ]
      },
      {
        id: "listening",
        name: "Часть 3. Аудирование",
        vi: "Phần 3. Nghe hiểu bài giảng",
        lines: [
          { who: "Профессор", ru: "Тема нашей сегодняшней лекции — структура научного доклада и требования к дипломной работе.", vi: "Chủ đề bài giảng hôm nay của chúng ta là cấu trúc báo cáo khoa học và yêu cầu đối với khóa luận tốt nghiệp." },
          { who: "Студент", ru: "Профессор, каков рекомендуемый объём введения?", vi: "Thưa giáo sư, dung lượng khuyến nghị của phần mở đầu là bao nhiêu ạ?" },
          { who: "Профессор", ru: "Введение должно составлять от трёх до пяти страниц печатного текста.", vi: "Phần mở đầu nên chiếm từ ba đến năm trang văn bản in." }
        ],
        questions: [
          { q: "О чём лекция профессора?", options: ["О структуре научного доклада и диплома", "Об истории языка", "О правилах сдачи экзамена", "О поступлении в вуз"], a: 0, ex: "'Тема нашей сегодняшней лекции — структура научного доклада...'" },
          { q: "Какой объём введения рекомендует профессор?", options: ["От 3 до 5 страниц", "Более 20 страниц", "Ровно 1 страницу", "10-15 страниц"], a: 0, ex: "'от трёх до пяти страниц печатного текста'" }
        ]
      }
    ]
  },
  {
    id: "trki_b2",
    level: "B2 (ТРКИ-2)",
    levelName: "Trình độ nâng cao B2",
    title: "Đề thi nâng cao ТРКИ-2 (Tốt nghiệp Đại học / Thạc sĩ)",
    durationMin: 75,
    passPercent: 66,
    is_pro_only: true,
    parts: [
      {
        id: "gram",
        name: "Часть 1. Лексика и грамматика",
        vi: "Phần 1. Cấu trúc câu phức & thành ngữ",
        questions: [
          { q: "Вопреки ___ экспертов, экономика продемонстрировала устойчивый рост.", options: ["ожиданиям", "ожиданий", "ожиданиями", "ожидания"], a: 0, ex: "Вопреки + cách 3 số nhiều (-ам/-ям)." },
          { q: "Статья посвящена проблеме, решение ___ имеет ключевое значение для науки.", options: ["которой", "которая", "которую", "о которой"], a: 0, ex: "решение (của cái gì -> cách 2 giống cái: которой)." }
        ]
      },
      {
        id: "reading",
        name: "Часть 2. Чтение",
        vi: "Phần 2. Đọc hiểu bài luận & phân tích",
        text: {
          ru: "Культурный диалог между Россией и Вьетнамом имеет глубокие исторические корни. Образовательные программы, межвузовские обмены и совместные научно-технические конференции служат прочным мостом дружбы. Выпускники российских вузов вносят весомый вклад в модернизацию ключевых отраслей промышленности Вьетнама.",
          vi: "Đối thoại văn hóa giữa Nga và Việt Nam có nguồn gốc lịch sử sâu sắc. Các chương trình giáo dục, trao đổi giữa các trường đại học và hội nghị khoa học kỹ thuật chung đóng vai trò là cây cầu hữu nghị vững chắc. Cựu sinh viên các trường đại học Nga đóng góp to lớn vào công cuộc hiện đại hóa các ngành công nghiệp trọng điểm của Việt Nam."
        },
        questions: [
          { q: "Что служит мостом дружбы между странами?", options: ["Образовательные программы и научные конференции", "Только коммерческая торговля", "Спортивные турниры", "Туристические агентства"], a: 0, ex: "'...Образовательные программы, межвузовские обмены и совместные научно-технические конференции...'" }
        ]
      },
      {
        id: "listening",
        name: "Часть 3. Аудирование",
        vi: "Phần 3. Nghe hiểu phỏng vấn chuyên gia",
        lines: [
          { who: "Ведущий", ru: "Сегодня у нас в студии эксперт по международным образовательным грантам.", vi: "Hôm nay trong trường quay của chúng ta có chuyên gia về học bổng giáo dục quốc tế." },
          { who: "Эксперт", ru: "Главное требование к кандидатам — высокий уровень владения русским языком и сильная мотивация.", vi: "Yêu cầu hàng đầu đối với ứng viên là trình độ tiếng Nga vững vàng và động lực mạnh mẽ." }
        ],
        questions: [
          { q: "Какое главное требование к кандидатам?", options: ["Высокий уровень языка и мотивация", "Наличие стажа работы от 10 лет", "Умение играть на инструментах", "Возраст старше 35 лет"], a: 0, ex: "'...высокий уровень владения русским языком и сильная мотивация.'" }
        ]
      }
    ]
  }
];

// =======================================================================
// LỌ TỪ VỰNG CHỦ ĐỀ (VOCAB_JARS)
// =======================================================================
const VOCAB_JARS = [
  {
    id: "jar_auchan",
    name: "Lọ mua sắm Auchan",
    desc: "Từ vựng siêu thị, thực phẩm, cân đo, thanh toán sống còn khi mới sang Nga.",
    icon: "🛒",
    words: [
      { ru: "хлеб", vi: "bánh mì", note: "danh từ giống đực (он)" },
      { ru: "молоко", vi: "sữa tươi", note: "danh từ giống trung (оно)" },
      { ru: "сыр", vi: "phô mai", note: "danh từ giống đực (он)" },
      { ru: "колбаса", vi: "xúc xích, giò", note: "danh từ giống cái (она)" },
      { ru: "чек", vi: "hóa đơn mua hàng", note: "cần giữ khi qua cổng bảo vệ" },
      { ru: "пакет", vi: "túi nilông", note: "thu ngân thường hỏi: 'Пакет нужен?'" },
      { ru: "карта", vi: "thẻ ngân hàng", note: "оплата картой (quẹt thẻ)" },
      { ru: "скидка", vi: "giảm giá / khuyến mại", note: "thẻ tích điểm siêu thị" }
    ]
  },
  {
    id: "jar_chemodan",
    name: "Lọ vali hành lý du học",
    desc: "Đồ dùng cá nhân, quần áo giữ nhiệt, giấy tờ bắt buộc chuẩn bị từ Việt Nam sang.",
    icon: "🧳",
    words: [
      { ru: "чемодан", vi: "vali hành lý", note: "chuẩn ký gửi 23kg" },
      { ru: "паспорт", vi: "hộ chiếu quốc tế", note: "luôn mang bản gốc bên người" },
      { ru: "виза", vi: "thị thực du học", note: "thời hạn nhập cảnh lần đầu 90 ngày" },
      { ru: "куртка", vi: "áo khoác mùa đông", note: "áo lông vũ chịu -20°C" },
      { ru: "шапка", vi: "mũ len che tai", note: "vật dụng bắt buộc mùa tuyết" },
      { ru: "лекарство", vi: "thuốc men cá nhân", note: "thuốc cảm, kháng sinh quen dùng" }
    ]
  },
  {
    id: "jar_dorm",
    name: "Lọ ký túc xá (Общежитие)",
    desc: "Vật dụng phòng ở, nhà bếp chung, thủ tục đăng ký tạm trú với ban quản lý KTX.",
    icon: "🏢",
    words: [
      { ru: "общежитие", vi: "ký túc xá (KTX)", note: "sinh viên gọi tắt là 'общага'" },
      { ru: "комната", vi: "phòng ở", note: "thường ở 2-3 người một phòng" },
      { ru: "вахтёр", vi: "bác bảo vệ / trực nhật", note: "quản lý cửa ra vào KTX" },
      { ru: "пропуск", vi: "thẻ sinh viên / thẻ vào cửa", note: "phải quẹt thẻ khi vào cổng" },
      { ru: "кухня", vi: "bếp chung tầng", note: "dùng xong phải tắt bếp và dọn dẹp" },
      { ru: "сосед", vi: "bạn cùng phòng", note: "thường là du học sinh quốc tế" }
    ]
  },
  {
    id: "jar_cafe",
    name: "Lọ căng tin & Trà bánh Nga",
    desc: "Cách gọi món ở căng tin đại học (Столовая), quán trà bánh và nhà hàng Nga.",
    icon: "☕",
    words: [
      { ru: "столовая", vi: "căng tin ăn trưa", note: "giá sinh viên, tự bưng khay" },
      { ru: "борщ", vi: "súp củ dền đỏ Borodino", note: "ăn kèm kem chua сметана" },
      { ru: "гречка", vi: "cháo kiều mạch", note: "món ăn quốc dân giàu dinh dưỡng" },
      { ru: "чай", vi: "trà đen", note: "người Nga uống trà nóng quanh năm" },
      { ru: "счёт", vi: "hóa đơn tính tiền", note: "'Дайте, пожалуйста, счёт'" }
    ]
  }
];

// =======================================================================
// SẢN PHẨM SHOP NGA & DỊCH VỤ DU HỌC (SHOP_PRODUCTS)
// =======================================================================
const SHOP_PRODUCTS = [
  {
    id: "alenka-100g",
    category: "banh_keo",
    categoryName: "Bánh kẹo Nga",
    title: "Socola Alenka truyền thống 100g",
    desc: "Socola sữa béo ngậy biểu tượng nước Nga từ năm 1965, hình em bé quấn khăn quen thuộc.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
    badge: "Bán chạy"
  },
  {
    id: "mishka-kosolapy",
    category: "banh_keo",
    categoryName: "Bánh kẹo Nga",
    title: "Kẹo gấu Mishka Kosolapy Nga 250g",
    desc: "Kẹo socola hạnh nhân giòn tan gắn liền với kiệt tác hội họa 'Buổi sáng trong rừng thông'.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80",
    badge: "Truyền thống"
  },
  {
    id: "korovka-waffle",
    category: "banh_keo",
    categoryName: "Bánh kẹo Nga",
    title: "Bánh xốp sữa bò Korovka 150g",
    desc: "Bánh xốp giòn rụm ngậy vị sữa tươi đun cô đặc vùng nông thôn Nga, hoàn hảo khi thưởng trà.",
    price: 55000,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "siberia-cream",
    category: "my_pham",
    categoryName: "Mỹ phẩm Siberia",
    title: "Kem dưỡng ẩm thảo mộc Siberia 75ml",
    desc: "Chiết xuất hắc mai biển và tinh dầu thông tuyết Taiga, chống nẻ và dưỡng da mềm mịn mùa đông.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    badge: "Thảo mộc"
  },
  {
    id: "babushka-shampoo",
    category: "my_pham",
    categoryName: "Mỹ phẩm Siberia",
    title: "Dầu gội thảo dược Bà già Agafia 350ml",
    desc: "Công thức cổ truyền 37 loại thảo mộc vùng Taiga, kích thích mọc tóc và nuôi dưỡng chân tóc dày khỏe.",
    price: 175000,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    badge: "Organic"
  },
  {
    id: "matryoshka-5pcs",
    category: "luu_niem",
    categoryName: "Quà lưu niệm Nga",
    title: "Búp bê Matryoshka vẽ tay truyền thống 5 lớp",
    desc: "Gỗ bồ đề tự nhiên mài thủ công, sơn bóng hoa văn hoa cúc rực rỡ, biểu tượng may mắn gia đình.",
    price: 290000,
    image: "https://images.unsplash.com/photo-1572945753563-804f5e5d6674?auto=format&fit=crop&w=600&q=80",
    badge: "Thủ công"
  },
  {
    id: "cheburashka-plush",
    category: "luu_niem",
    categoryName: "Quà lưu niệm Nga",
    title: "Gấu bông Cheburashka tai to 20cm",
    desc: "Nhân vật hoạt hình quốc dân Nga với đôi tai to ngộ nghĩnh, chất lông mịn cao cấp an toàn.",
    price: 210000,
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tuvan-6730",
    category: "dich_vu_du_hoc",
    categoryName: "Dịch vụ du học 6730",
    title: "Gói tư vấn & hỗ trợ hồ sơ Hiệp định 6730",
    desc: "Định hướng chọn trường top (MGU, HSE, SPbGU), tối ưu bài luận và nộp hồ sơ chuẩn chỉ tiêu 1000 suất.",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    badge: "Hot"
  },
  {
    id: "dich-thuat-nga",
    category: "dich_vu_du_hoc",
    categoryName: "Dịch vụ du học 6730",
    title: "Dịch thuật công chứng hồ sơ sang tiếng Nga",
    desc: "Dịch chuẩn xác học bạ, bằng tốt nghiệp, lý lịch tư pháp bởi dịch giả chuyên ngữ có dấu công chứng tư pháp.",
    price: 350000,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
  }
];

// =======================================================================
// BẢNG GÓI CƯỚC TÀI KHOẢN PRO (PACKAGES)
// =======================================================================
const PACKAGES = [
  {
    id: "pro_6m",
    badge: "6 THÁNG",
    title: "Gói Bứt Phá 6 Tháng",
    desc: "Phù hợp cho học viên ôn thi cấp tốc chuẩn bị du học hoặc thi chứng chỉ ТЭУ/ТБУ.",
    price: 299000,
    priceOld: 590000,
    popular: false,
    features: [
      "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1, A2",
      "Đáp án giải thích ngữ pháp chi tiết từng câu",
      "Luyện nghe 4 Part CEFR không giới hạn",
      "Tạo không giới hạn Lọ từ vựng cá nhân",
      "Phát hiện & sửa lỗi phát âm AI"
    ]
  },
  {
    id: "pro_1y",
    badge: "1 NĂM",
    title: "Gói Chuyên Nghiệp 1 Năm",
    desc: "Lựa chọn hàng đầu cho sinh viên chuẩn bị sang Nga học dự bị và đại học.",
    price: 499000,
    priceOld: 990000,
    popular: true,
    features: [
      "Mở khóa TOÀN BỘ ngân hàng đề thi ТРКИ A1, A2, B1, B2",
      "Phân tích chuyên sâu đề thi & dự đoán điểm đỗ",
      "Chấm bài tự luận Viết (Письмо) có nhận xét của giảng viên",
      "Kho 100+ Lọ từ vựng chuyên ngành (Y khoa, Kỹ thuật, Kinh tế)",
      "Ưu tiên hỗ trợ hồ sơ học bổng du học Nga 6730",
      "Hỗ trợ 1-1 qua nhóm Zalo VIP"
    ]
  },
  {
    id: "pro_vip",
    badge: "TRỌN ĐỜI",
    title: "Gói VIP Trọn Đời",
    desc: "Đồng hành trọn vẹn suốt 4-6 năm học tập và sinh sống tại Liên bang Nga.",
    price: 899000,
    priceOld: 1800000,
    popular: false,
    features: [
      "Tất cả quyền lợi của gói 1 Năm vĩnh viễn",
      "Cập nhật miễn phí đề thi ТРКИ mới nhất mỗi năm",
      "Tặng Voucher 500k khi đặt dịch vụ du học & visa Nga",
      "Tặng Hộp quà Nga đặc biệt (Socola Alenka + Trà Ivan-chay)",
      "Cố vấn học thuật trực tiếp định kỳ"
    ]
  }
];

// =======================================================================
// GẮN TẤT CẢ DỮ LIỆU LÊN WINDOW ĐỂ ĐỒNG BỘ RUNTIME TOÀN DỰ ÁN
// =======================================================================
if (typeof window !== "undefined") {
  window.VOCAB_LESSONS = typeof VOCAB_LESSONS !== "undefined" ? VOCAB_LESSONS : [];
  window.GRAMMAR_LESSONS = typeof GRAMMAR_LESSONS !== "undefined" ? GRAMMAR_LESSONS : [];
  window.LISTENING_LESSONS = typeof LISTENING_LESSONS !== "undefined" ? LISTENING_LESSONS : [];
  window.SPEAKING_SETS = typeof SPEAKING_SETS !== "undefined" ? SPEAKING_SETS : [];
  window.WRITING_TASKS = typeof WRITING_TASKS !== "undefined" ? WRITING_TASKS : [];
  window.MOCK_TEST = typeof MOCK_TEST !== "undefined" ? MOCK_TEST : {};
  window.TRKI_BANK = typeof TRKI_BANK !== "undefined" ? TRKI_BANK : [];
  window.VOCAB_JARS = typeof VOCAB_JARS !== "undefined" ? VOCAB_JARS : [];
  window.SHOP_PRODUCTS = typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : [];
  window.PACKAGES = typeof PACKAGES !== "undefined" ? PACKAGES : [];
  window.BLOG_POSTS = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
}
