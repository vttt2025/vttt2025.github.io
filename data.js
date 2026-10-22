const VOCAB_LESSONS = [
  {
    id: "ep1",
    type: "series",
    level: "A1",
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
    level: "A1",
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
    level: "A2",
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
    level: "A1",
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
    level: "A1",
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
    level: "A2",
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
  },
  {
    id: "ep4",
    type: "series",
    level: "B1",
    ep: 4,
    ru: "В поликлинике и аптеке",
    vi: "Tập 4 — Khám bệnh & Mua thuốc",
    scene: "🏥",
    story: "Mùa đông tuyết rơi, Anya bị cảm sốt và đến phòng khám sinh viên khám, sau đó ra hiệu thuốc mua thuốc theo đơn.",
    script: [
      { ru: "На улице мороз минус двадцать градусов. Аня простудилась.", vi: "Ngoài trời rét âm 20 độ. Anya bị cảm lạnh." },
      { ru: "У неё высокая температура, болит горло и сильный кашель.", vi: "Cô bị sốt cao, đau họng và ho nhiều." },
      { ru: "Она берёт студенческий полис и идёт в поликлинику к терапевту.", vi: "Cô cầm thẻ bảo hiểm y tế sinh viên và tới phòng khám gặp bác sĩ đa khoa." },
      { ru: "Врач слушает лёгкие и выписывает рецепт на антибиотики и сироп.", vi: "Bác sĩ nghe phổi và kê đơn thuốc kháng sinh cùng si-rô ho." },
      { ru: "В аптеке фармацевт объясняет, как принимать лекарство: два раза в день после еды.", vi: "Ở hiệu thuốc, dược sĩ hướng dẫn cách uống thuốc: 2 lần mỗi ngày sau ăn." },
      { ru: "Через три дня Ане стало намного лучше!", vi: "Sau ba ngày, Anya đã đỡ hơn rất nhiều!" }
    ],
    words: [
      { ru: "простудиться", vi: "bị cảm lạnh", note: "động từ hoàn thành thể" },
      { ru: "температура", vi: "nhiệt độ, sốt", note: "высокая температура = sốt cao" },
      { ru: "болеть", vi: "bị đau / ốm", note: "у меня болит голова/горло" },
      { ru: "терапевт", vi: "bác sĩ nội khoa", note: "danh từ nam" },
      { ru: "выписать рецепт", vi: "kê đơn thuốc", note: "cụm động từ" },
      { ru: "аптека", vi: "hiệu thuốc", note: "danh từ nữ" },
      { ru: "лекарство", vi: "thuốc men", note: "danh từ trung" },
      { ru: "принимать лекарство", vi: "uống thuốc", note: "принимать два раза в день" },
      { ru: "выздороветь", vi: "khỏi bệnh", note: "động từ hoàn thành thể" },
      { ru: "кашель / насморк", vi: "cơn ho / sổ mũi", note: "triệu chứng cảm lạnh" }
    ],
    quiz: [
      { q: "«болит горло» nghĩa là gì?", options: ["đau bụng", "đau họng", "đau đầu", "đau chân"], a: 1 },
      { q: "«выписать рецепт» là hành động của ai?", options: ["bệnh nhân", "bác sĩ", "dược sĩ", "lễ tân"], a: 1 },
      { ru: "Нужно принимать лекарство два раза в день ___ еды.", q: "Điền giới từ đúng: ... ___ еды. (sau bữa ăn)", options: ["после", "до", "во время", "без"], a: 0, ex: "после + cách 2: sau khi..." },
      { q: "Anya đi đâu mua thuốc?", options: ["В магазин", "В аптеку", "В деканат", "В библиотеку"], a: 1 }
    ]
  },
  {
    id: "ep5",
    type: "series",
    level: "B1",
    ep: 5,
    ru: "Оформление визы и регистрации",
    vi: "Tập 5 — Gia hạn Visa & Thủ tục cư trú",
    scene: "🏛️",
    story: "Hết hạn visa 90 ngày, Anya lên phòng quan hệ quốc tế làm thủ tục gia hạn visa du học 1 năm và đăng ký tạm trú.",
    script: [
      { ru: "Первая учебная виза выдаётся только на девяносто дней.", vi: "Thị thực du học ban đầu chỉ có giá trị 90 ngày." },
      { ru: "Аня идёт в отдел международных связей университета.", vi: "Anya đến phòng hợp tác quốc tế của trường." },
      { ru: "Инспектор проверяет миграционную карту, паспорт и договор на обучение.", vi: "Chuyên viên kiểm tra tờ khai di trú, hộ chiếu và hợp đồng đào tạo." },
      { ru: "Нужно оплатить госпошлину за многократную визу в банке.", vi: "Cần nộp lệ phí nhà nước cho thị thực nhiều lần tại ngân hàng." },
      { ru: "Через две недели Аня получает паспорт с новой годовой визой.", vi: "Sau hai tuần, Anya nhận lại hộ chiếu với visa mới thời hạn 1 năm." },
      { ru: "Теперь она может спокойно учиться и путешествовать по России!", vi: "Giờ cô có thể yên tâm học tập và du lịch khắp nước Nga!" }
    ],
    words: [
      { ru: "виза", vi: "thị thực, visa", note: "учебная виза = visa du học" },
      { ru: "регистрация", vi: "đăng ký tạm trú", note: "thủ tục bắt buộc tại Nga" },
      { ru: "миграционная карта", vi: "tờ khai xuất nhập cảnh", note: "cần giữ cẩn thận" },
      { ru: "продление", vi: "sự gia hạn", note: "продление визы" },
      { ru: "госпошлина", vi: "lệ phí nhà nước", note: "nộp qua ngân hàng Sber" },
      { ru: "многократная виза", vi: "visa nhiều lần", note: "cho phép xuất nhập cảnh tự do" },
      { ru: "паспортный стол", vi: "bộ phận quản lý cư trú", note: "tại ký túc xá hoặc trường" },
      { ru: "срок действия", vi: "thời hạn hiệu lực", note: "hạn sử dụng của visa" }
    ],
    quiz: [
      { q: "«многократная виза» cho phép điều gì?", options: ["Chỉ nhập cảnh 1 lần", "Xuất nhập cảnh nhiều lần", "Không cần hộ chiếu", "Miễn thị thực"], a: 1 },
      { q: "«госпошлина» là gì?", options: ["Lệ phí nhà nước", "Học phí", "Tiền ký túc xá", "Tiền bảo hiểm"], a: 0 },
      { q: "Tờ giấy nào được phát khi nhập cảnh ở sân bay Nga?", options: ["Thẻ sinh viên", "Миграционная карта", "Bằng tốt nghiệp", "Hóa đơn"], a: 1 }
    ]
  },
  {
    id: "culture",
    type: "topic",
    level: "B2",
    ru: "Русский балет и Большой театр",
    vi: "Chủ đề — Nghệ thuật & Nhà hát Bolshoi",
    scene: "🎭",
    story: "Khám phá cái nôi của nghệ thuật kinh điển Nga: từ vở ba lê Hồ Thiên Nga đến kiến trúc tráng lệ của Nhà hát Lớn Moskva.",
    script: [
      { ru: "Большой театр — один из старейших и самых знаменитых театров оперы и балета в мире.", vi: "Nhà hát Lớn là một trong những nhà hát opera và ballet cổ kính và nổi tiếng nhất thế giới." },
      { ru: "Здание театра украшает знаменитая квадрига Аполлона скульптора Клодта.", vi: "Tòa nhà nhà hát được trang trí bởi cỗ xe tứ mã nổi tiếng của thần Apollo do nhà điêu khắc Klodt tạo tác." },
      { ru: "Сегодня дают балет Петра Ильича Чайковского «Лебединое озеро».", vi: "Hôm nay công diễn vở múa ba lê «Hồ thiên nga» của Pyotr Ilyich Tchaikovsky." },
      { ru: "Зрители в вечерних нарядах занимают места в партере и ложах.", vi: "Khán giả trong trang phục dạ hội trang trọng ngồi vào ghế ở tầng trệt và các khán phòng riêng." },
      { ru: "Великолепная музыка оркестра и грация балерин вызывают бурные аплодисменты.", vi: "Âm nhạc tuyệt mỹ của dàn nhạc giao hưởng và nét duyên dáng của các vũ công tạo nên tràng pháo tay vang dội." },
      { ru: "В антракте посетители прогуливаются по залам и пьют кофе в буфете.", vi: "Trong giờ giải lao, du khách dạo bước quanh các đại sảnh và thưởng thức cà phê tại quầy trà." }
    ],
    words: [
      { ru: "балет", vi: "vở ba-lê", note: "nghệ thuật múa cổ điển Nga" },
      { ru: "партер", vi: "tầng trệt rạp hát", note: "vị trí hàng ghế chính" },
      { ru: "ложа", vi: "khán phòng riêng", note: "danh từ nữ" },
      { ru: "антракт", vi: "giờ nghỉ giữa hiệp", note: "giải lao trong kịch" },
      { ru: "аплодисменты", vi: "tràng vỗ tay", note: "danh từ số nhiều" },
      { ru: "оркестр", vi: "dàn nhạc giao hưởng", note: "danh từ nam" },
      { ru: "премьера", vi: "buổi công chiếu đầu tiên", note: "danh từ nữ" },
      { ru: "восторженный", vi: "hào hứng, say mê", note: "tính từ" }
    ],
    quiz: [
      { q: "Ai sáng tác vở ba-lê «Лебединое озеро»?", options: ["П. И. Чайковский", "А. С. Пушкин", "Л. Н. Толстой", "С. В. Рахманинов"], a: 0 },
      { q: "«антракт» trong rạp hát là gì?", options: ["Màn mở đầu", "Giờ giải lao giữa các hồi", "Buổi biểu diễn lại", "Vé mời"], a: 1 },
      { q: "«партер» là vị trí nào?", options: ["Hàng ghế dưới mặt sàn rạp", "Trên ban công cao nhất", "Hậu trường", "Sân khấu"], a: 0 }
    ]
  },
  {
    id: "career",
    type: "topic",
    level: "B2",
    ru: "Собеседование и резюме",
    vi: "Chủ đề — Phỏng vấn & Hồ sơ việc làm",
    scene: "💼",
    story: "Kinh nghiệm phỏng vấn tuyển dụng, viết резюме chuẩn Nga và đàm phán hợp đồng lao động tại các tập đoàn quốc tế.",
    script: [
      { ru: "Перед собеседованием важно грамотно составить резюме на русском языке.", vi: "Trước buổi phỏng vấn, điều cốt yếu là soạn thảo một bản CV chuẩn mực bằng tiếng Nga." },
      { ru: "В резюме указывают образование, опыт работы, ключевые навыки и знание языков.", vi: "Trong CV nêu rõ học vấn, kinh nghiệm công tác, kỹ năng trọng tâm và trình độ ngoại ngữ." },
      { ru: "Рекрутер задаёт вопросы о ваших профессиональных достижениях и сильных сторонах.", vi: "Nhà tuyển dụng đặt câu hỏi về thành tựu chuyên môn và thế mạnh của bạn." },
      { ru: "«Почему вы хотите работать именно в нашей IT-компании?» — стандартный вопрос.", vi: "«Vì sao bạn muốn cống hiến cho công ty công nghệ của chúng tôi?» — một câu hỏi điển hình." },
      { ru: "Кандидат уверенно рассказывает о своих успешных проектах и готовности развиваться.", vi: "Ứng viên tự tin thuyết minh về những dự án thành công và tinh thần học hỏi." },
      { ru: "После встречи стороны обсуждают испытательный срок и уровень заработной платы.", vi: "Sau cuộc trao đổi, hai bên thảo luận về thời gian thử việc và mức lương đãi ngộ." }
    ],
    words: [
      { ru: "собеседование", vi: "buổi phỏng vấn xin việc", note: "danh từ trung" },
      { ru: "резюме", vi: "sơ yếu lý lịch, CV", note: "không biến cách" },
      { ru: "вакансия", vi: "vị trí tuyển dụng còn trống", note: "danh từ nữ" },
      { ru: "работодатель", vi: "nhà tuyển dụng", note: "danh từ nam" },
      { ru: "испытательный срок", vi: "thời gian thử việc", note: "thường là 3 tháng" },
      { ru: "заработная плата", vi: "tiền lương (зарплата)", note: "danh từ nữ" },
      { ru: "навык", vi: "kỹ năng", note: "профессиональные навыки" },
      { ru: "достижение", vi: "thành tích, thành tựu", note: "danh từ trung" }
    ],
    quiz: [
      { q: "«резюме» trong ngữ cảnh tìm việc là gì?", options: ["Đơn xin nghỉ phép", "CV / Sơ yếu lý lịch ứng tuyển", "Hợp đồng thuê nhà", "Bằng lái xe"], a: 1 },
      { q: "«испытательный срок» nghĩa là gì?", options: ["Thời gian thử việc", "Hạn nộp hồ sơ", "Giờ làm thêm", "Kỳ nghỉ phép năm"], a: 0 },
      { ru: "Кандидат успешно прошёл ___.", q: "Điền từ đúng: ... прошёл ___. (vượt qua buổi phỏng vấn)", options: ["собеседование", "билет", "чемодан", "вокзал"], a: 0 }
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
    vi: "Ở sân bay — làm thủ tục, kiểm tra an ninh",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "airport",
    categoryName: "Sân bay & Du lịch",
    estMinutes: 12,
    icon: "✈️",
    partNumber: 1,
    is_pro_only: false,
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
    vi: "Ở siêu thị — hỏi giá hàng & thanh toán",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "shop",
    categoryName: "Mua sắm & Siêu thị",
    estMinutes: 12,
    icon: "🛒",
    partNumber: 1,
    is_pro_only: false,
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
  },
  {
    id: "lis-dorm",
    title: "В общежитии",
    vi: "Tại ký túc xá — nhận chìa khóa, nội quy sinh hoạt",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "dorm",
    categoryName: "Ký túc xá & Đời sống",
    estMinutes: 15,
    icon: "🏢",
    partNumber: 2,
    is_pro_only: false,
    lines: [
      { who: "Комендант", ru: "Здравствуйте! Вот ваш ключ от комнаты 412.", vi: "Chào em! Đây là chìa khóa phòng 412 của em." },
      { who: "Студент", ru: "Спасибо! А на каком этаже прачечная?", vi: "Cảm ơn cô! Còn phòng giặt là ở tầng mấy ạ?" },
      { who: "Комендант", ru: "Прачечная на цокольном этаже, работает с восьми утра до десяти вечера.", vi: "Phòng giặt ở tầng bán hầm, mở từ 8h sáng tới 10h tối." },
      { who: "Студент", ru: "Нужно ли записываться заранее?", vi: "Có cần đăng ký trước không ạ?" },
      { who: "Комендант", ru: "Да, журнал записи лежит у дежурного на вахте.", vi: "Có, sổ đăng ký để ở chỗ bảo vệ trực cổng." },
      { who: "Студент", ru: "Понятно, спасибо за информацию!", vi: "Em hiểu rồi, cảm ơn cô đã hướng dẫn!" }
    ],
    blanks: [
      { before: "Вот ваш ключ от", blank: "комнаты", after: "412.", hint: "phòng" },
      { before: "Прачечная на", blank: "цокольном", after: "этаже.", hint: "bán hầm" },
      { before: "Журнал записи лежит у", blank: "дежурного", after: "на вахте.", hint: "người trực" }
    ],
    dictation: [
      "Вот ваш ключ от комнаты 412.",
      "Прачечная на цокольном этаже.",
      "Спасибо за информацию!"
    ],
    questions: [
      { q: "Phòng của sinh viên ở số mấy?", options: ["312", "412", "512", "214"], a: 1 },
      { q: "Phòng giặt là mở cửa đến mấy giờ?", options: ["Đến 20:00", "Đến 21:00", "Đến 22:00 (mười giờ tối)", "Mở 24/7"], a: 2 },
      { q: "Sổ đăng ký giặt nằm ở đâu?", options: ["Trong phòng sinh viên", "Ở phòng dekanat", "Ở quầy trực bảo vệ (вахта)", "Trên tầng 4"], a: 2 }
    ]
  },
  {
    id: "lis-cafe",
    title: "В кафе «Теремок»",
    vi: "Tại quán ăn Nga — gọi bánh xèo blini & nước uống",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "cafe",
    categoryName: "Ẩm thực & Quán ăn",
    estMinutes: 15,
    icon: "🥞",
    partNumber: 2,
    is_pro_only: false,
    lines: [
      { who: "Кассир", ru: "Добрый день! Что будете заказывать?", vi: "Kính chào quý khách! Quý khách muốn dùng gì ạ?" },
      { who: "Аня", ru: "Мне, пожалуйста, блин с ветчиной и сыром, и тарелку борща.", vi: "Cho tôi một bánh blini kẹp giăm bông phô mai và một bát súp củ dền borscht." },
      { who: "Кассир", ru: "Сметану к борщу добавить?", vi: "Có cho thêm váng sữa smetana vào súp không ạ?" },
      { who: "Аня", ru: "Да, обязательно. И горячий морс, пожалуйста.", vi: "Vâng, chắc chắn rồi ạ. Và một ly nước ép quả mọng nóng nữa." },
      { who: "Кассир", ru: "С вас 480 рублей. Оплата картой?", vi: "Của bạn hết 480 rúp. Bạn thanh toán thẻ chứ ạ?" },
      { who: "Аня", ru: "Да, приложила карту. Спасибо!", vi: "Vâng, tôi đã chạm thẻ. Cảm ơn bạn!" }
    ],
    blanks: [
      { before: "Мне, пожалуйста,", blank: "блин", after: "с ветчиной и сыром.", hint: "bánh xèo blini" },
      { before: "Сметану к борщу", blank: "добавить", after: "?", hint: "thêm vào" },
      { before: "И горячий", blank: "морс", after: ", пожалуйста.", hint: "nước quả mọng" }
    ],
    dictation: [
      "Что будете заказывать?",
      "Мне, пожалуйста, тарелку борща.",
      "С вас 480 рублей."
    ],
    questions: [
      { q: "Anya gọi loại bánh xèo blini nào?", options: ["Nhân ngọt mật ong", "Nhân cá hồi", "Nhân giăm bông & phô mai", "Nhân nấm"], a: 2 },
      { q: "Món đồ uống nào được gọi kèm?", options: ["Trà đen", "Cà phê sữa", "Mors nóng (nước quả mọng)", "Nước khoáng"], a: 2 },
      { q: "Tổng số tiền bữa ăn là bao nhiêu?", options: ["350 rúp", "480 rúp", "520 rúp", "600 rúp"], a: 1 }
    ]
  },
  {
    id: "lis-campus",
    title: "В деканате и библиотеке",
    vi: "Tại phòng giáo vụ & thư viện — làm thẻ bạn đọc",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "campus",
    categoryName: "Trường học & Thư viện",
    estMinutes: 18,
    icon: "📚",
    partNumber: 3,
    is_pro_only: true,
    lines: [
      { who: "Сотрудник", ru: "Здравствуйте! Для оформления читательского билета нужен студенческий билет и одна фотография.", vi: "Chào bạn! Để làm thẻ thư viện cần thẻ sinh viên và một tấm ảnh." },
      { who: "Студент", ru: "Вот документы. Скажите, на какой срок выдаются учебники?", vi: "Đây là giấy tờ ạ. Xin hỏi giáo trình được mượn trong bao lâu?" },
      { who: "Сотрудник", ru: "Учебная литература выдаётся на весь семестр, а художественная — на две недели с правом продления.", vi: "Sách giáo trình được mượn trọn học kỳ, còn tác phẩm văn học là 2 tuần và có thể gia hạn." },
      { who: "Студент", ru: "Есть ли доступ к электронным базам данных?", vi: "Thư viện có quyền truy cập cơ sở dữ liệu điện tử không ạ?" },
      { who: "Сотрудник", ru: "Да, логин и пароль вы получите по университетской электронной почте.", vi: "Có, bạn sẽ nhận được tài khoản và mật khẩu qua email sinh viên của trường." }
    ],
    blanks: [
      { before: "Для оформления", blank: "читательского билета", after: "нужен студенческий.", hint: "thẻ bạn đọc" },
      { before: "Учебная литература выдаётся на весь", blank: "семестр", after: ".", hint: "học kỳ" },
      { before: "Есть ли доступ к электронным", blank: "базам данных", after: "?", hint: "cơ sở dữ liệu" }
    ],
    dictation: [
      "Для оформления читательского билета нужен студенческий.",
      "Учебная литература выдаётся на весь семестр.",
      "Логин и пароль вы получите по почте."
    ],
    questions: [
      { q: "Giấy tờ nào cần thiết để làm thẻ thư viện?", options: ["Hộ chiếu và visa", "Thẻ sinh viên và một bức ảnh", "Học bạ THPT", "Giấy khám sức khỏe"], a: 1 },
      { q: "Sách giáo trình được mượn trong thời hạn bao lâu?", options: ["1 tháng", "2 tuần", "Suốt cả học kỳ", "1 năm"], a: 2 },
      { q: "Thông tin đăng nhập thư viện số được gửi qua đâu?", options: ["Qua tin nhắn SMS", "Trực tiếp qua thư ký", "Qua email của trường", "Qua Zalo"], a: 2 }
    ]
  },
  {
    id: "lis-metro",
    title: "Объявления в метро",
    vi: "Thông báo trên tàu điện ngầm Moskva — đổi tuyến & hướng đi",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "metro",
    categoryName: "Giao thông công cộng",
    estMinutes: 15,
    icon: "🚇",
    partNumber: 3,
    is_pro_only: true,
    lines: [
      { who: "Диктор", ru: "Осторожно, двери закрываются. Следующая станция — «Театральная».", vi: "Xin chú ý, cửa đang đóng. Ga tiếp theo là «Teatralnaya»." },
      { who: "Диктор", ru: "Станция «Театральная». Переход на станции «Охотный ряд» и «Площадь Революции».", vi: "Ga «Teatralnaya». Chuyển sang tuyến ga «Okhotny Ryad» và ga «Quảng trường Cách mạng»." },
      { who: "Пассажир", ru: "Молодой человек, вы выходите на следующей станции?", vi: "Bạn trẻ ơi, bạn có xuống ở ga tiếp theo không?" },
      { who: "Студент", ru: "Да, выхожу. Проходите, пожалуйста.", vi: "Dạ có, cháu xuống ạ. Xin mời bác đi lên trước." }
    ],
    blanks: [
      { before: "Осторожно,", blank: "двери закрываются", after: ".", hint: "cửa đang đóng" },
      { before: "Переход на станции", blank: "Охотный ряд", after: ".", hint: "tên ga chuyển" },
      { before: "Вы выходите на", blank: "следующей", after: "станции?", hint: "tiếp theo" }
    ],
    dictation: [
      "Осторожно, двери закрываются.",
      "Следующая станция — Театральная.",
      "Переход на станцию Охотный ряд."
    ],
    questions: [
      { q: "Câu nói quen thuộc của loa phát thanh tàu điện ngầm là gì?", options: ["Поезд прибывает", "Осторожно, двери закрываются", "Вход свободный", "Конечная остановка"], a: 1 },
      { q: "Ở ga Teatralnaya có thể chuyển sang tuyến ga nào?", options: ["Arbatskaya", "Okhotny Ryad & Ploshchad Revolyutsii", "Universitet", "VDNKh"], a: 1 },
      { q: "Hành khách thường hỏi câu gì khi chuẩn bị xuống ga đông người?", options: ["Сколько времени?", "Вы выходите на следующей станции?", "Где метро?", "Как дела?"], a: 1 }
    ]
  },
  {
    id: "lis-interview",
    title: "Интервью о космонавтике",
    vi: "Phỏng vấn giáo sư Đại học Quốc gia Nga — ngành vũ trụ",
    level: "B2",
    levelName: "Nâng cao B2",
    category: "interview",
    categoryName: "Phỏng vấn chuyên sâu",
    estMinutes: 20,
    icon: "🚀",
    partNumber: 4,
    is_pro_only: true,
    lines: [
      { who: "Ведущий", ru: "Здравствуйте, уважаемые радиослушатели! Сегодня наш гость — профессор МГУ, специалист по астрофизике.", vi: "Kính chào quý thính giả! Vị khách hôm nay là giáo sư MGU, chuyên gia vật lý thiên văn." },
      { who: "Профессор", ru: "Добрый день! Освоение космоса остаётся одним из главных приоритетов фундаментальной науки в России.", vi: "Chào quý vị! Chinh phục không gian vẫn là một trong những ưu tiên hàng đầu của khoa học cơ bản tại Nga." },
      { who: "Ведущий", ru: "Какие перспективы открываются для иностранных студентов, обучающихся по техническим специальностям?", vi: "Có những triển vọng nào mở ra cho sinh viên quốc tế theo học các khối ngành kỹ thuật?" },
      { who: "Профессор", ru: "Наши лаборатории оснащены новейшим оборудованием, и студенты имеют доступ к реальным спутниковым данным.", vi: "Phòng thí nghiệm của chúng tôi trang bị thiết bị hiện đại nhất, sinh viên được tiếp cận dữ liệu vệ tinh thực tế." },
      { who: "Ведущий", ru: "Благодарим вас за содержательную и вдохновляющую беседу!", vi: "Xin chân thành cảm ơn giáo sư vì buổi đàm thoại sâu sắc và đầy cảm hứng!" }
    ],
    blanks: [
      { before: "Освоение космоса остаётся одним из главных", blank: "приоритетов", after: "науки.", hint: "ưu tiên" },
      { before: "Студенты имеют доступ к реальным", blank: "спутниковым данным", after: ".", hint: "dữ liệu vệ tinh" },
      { before: "Благодарим вас за", blank: "содержательную", after: "беседу!", hint: "sâu sắc, bổ ích" }
    ],
    dictation: [
      "Освоение космоса остаётся главным приоритетом науки.",
      "Наши лаборатории оснащены новейшим оборудованием.",
      "Студенты имеют доступ к реальным данным."
    ],
    questions: [
      { q: "Chuyên môn nghiên cứu của giáo sư là gì?", options: ["Lịch sử văn học", "Vật lý thiên văn & vũ trụ", "Kinh tế đối ngoại", "Y sinh"], a: 1 },
      { q: "Sinh viên ngành kỹ thuật có cơ hội tiếp cận điều gì?", options: ["Chỉ lý thuyết sách giáo khoa", "Dữ liệu vệ tinh thực tế và phòng lab hiện đại", "Chuyến bay vũ trụ du lịch", "Thực tập ở nước ngoài"], a: 1 },
      { q: "Nhận xét của người dẫn chương trình về cuộc trò chuyện là gì?", options: ["Nhàm chán", "Khó hiểu", "Sâu sắc và truyền cảm hứng (содержательная и вдохновляющая)", "Quá ngắn"], a: 2 }
    ]
  }
];

const SPEAKING_SETS = [
  {
    id: "sp-basic",
    title: "Chào hỏi & Giới thiệu bản thân",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "greeting",
    categoryName: "Chào hỏi cơ bản",
    phonemeTarget: "Luyện âm ngắt và trọng âm cơ bản: [прив'эт], [зват']",
    icon: "🤝",
    items: [
      { ru: "Привет! Меня зовут Аня.", vi: "Chào bạn! Mình tên là Anya." },
      { ru: "Очень приятно познакомиться!", vi: "Rất vui được làm quen với bạn!" },
      { ru: "Я студентка из Вьетнама.", vi: "Mình là sinh viên đến từ Việt Nam." },
      { ru: "Я изучаю русский язык в университете.", vi: "Mình đang học tiếng Nga tại trường đại học." },
      { ru: "Как вас зовут?", vi: "Bạn tên là gì ạ?" },
      { ru: "Спасибо большое, до свидания!", vi: "Cảm ơn nhiều, tạm biệt bạn!" }
    ]
  },
  {
    id: "sp-travel",
    title: "Ở sân bay & Trên chuyến bay",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "travel",
    categoryName: "Du lịch & Sân bay",
    phonemeTarget: "Luyện phát âm phụ âm mềm [л'], [р'], [т']: [б'ил'эт], [м'эста]",
    icon: "✈️",
    items: [
      { ru: "Вот мой паспорт и посадочный талон.", vi: "Đây là hộ chiếu và thẻ lên máy bay của tôi." },
      { ru: "У меня только один чемодан и ручная кладь.", vi: "Tôi chỉ có một vali và hành lý xách tay." },
      { ru: "Подскажите, где паспортный контроль?", vi: "Xin hỏi kiểm tra hộ chiếu ở đâu ạ?" },
      { ru: "Я лечу в Москву с пересадкой.", vi: "Tôi bay tới Moskva có điểm quá cảnh." },
      { ru: "Моё место двадцать один А около окна.", vi: "Chỗ của tôi là 21A cạnh cửa sổ." },
      { ru: "Спасибо за помощь, всего доброго!", vi: "Cảm ơn bạn đã hỗ trợ, chúc mọi điều tốt lành!" }
    ]
  },
  {
    id: "sp-campus",
    title: "Ở trường học & Ký túc xá",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "campus",
    categoryName: "Ký túc xá & Trường học",
    phonemeTarget: "Phân biệt phụ âm [ж] và [ш]: [апщ'ижыт'ийэ], [страхофка]",
    icon: "🎓",
    items: [
      { ru: "Я живу в студенческом общежитии на четвёртом этаже.", vi: "Tôi sống ở ký túc xá sinh viên trên tầng bốn." },
      { ru: "Сегодня у нашей группы медосмотр в поликлинике.", vi: "Hôm nay nhóm chúng tôi có buổi khám sức khỏe ở phòng khám." },
      { ru: "Подскажите, пожалуйста, где находится деканат?", vi: "Xin hỏi phòng giáo vụ (dekanat) nằm ở đâu ạ?" },
      { ru: "У меня есть годовая медицинская страховка.", vi: "Tôi có thẻ bảo hiểm y tế thời hạn một năm." },
      { ru: "Когда начинается первая пара по расписанию?", vi: "Khi nào tiết học đầu tiên bắt đầu theo thời khóa biểu?" },
      { ru: "Мне нужно взять учебники в библиотеке.", vi: "Tôi cần mượn giáo trình trong thư viện." }
    ]
  },
  {
    id: "sp-dining",
    title: "Gọi món & Ẩm thực Nga",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "dining",
    categoryName: "Gọi món & Quán ăn",
    phonemeTarget: "Luyện nguyên âm căng [ы]: [сыр], [рыба], [быстро]",
    icon: "🍽️",
    items: [
      { ru: "Дайте, пожалуйста, меню на русском языке.", vi: "Xin vui lòng cho tôi xem thực đơn tiếng Nga." },
      { ru: "Что вы посоветуете из традиционных русских блюд?", vi: "Bạn có gợi ý món nào trong ẩm thực truyền thống Nga không?" },
      { ru: "Я хочу заказать тарелку горячего борща и блинчики.", vi: "Tôi muốn gọi một đĩa súp củ dền nóng và bánh blini." },
      { ru: "Принесите, пожалуйста, счёт.", vi: "Xin vui lòng mang cho tôi hóa đơn tính tiền." },
      { ru: "Всё было очень вкусно, спасибо шеф-повару!", vi: "Mọi món đều rất ngon, cảm ơn đầu bếp!" }
    ]
  },
  {
    id: "sp-direction",
    title: "Hỏi đường & Đi lại ở Moskva",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "direction",
    categoryName: "Hỏi đường & Giao thông",
    phonemeTarget: "Phát âm chuẩn âm rung [р]: [красная], [площад'], [переход]",
    icon: "🗺️",
    items: [
      { ru: "Извините, как быстрее добраться до Красной площади?", vi: "Xin lỗi, làm cách nào nhanh nhất đến Quảng trường Đỏ?" },
      { ru: "Вам нужно доехать на метро до станции Охотный ряд.", vi: "Bạn cần đi tàu điện ngầm tới ga Okhotny Ryad." },
      { ru: "Где здесь вход в метро и переход на другую линию?", vi: "Ở đây lối vào tàu điện ngầm và lối chuyển tuyến ở đâu ạ?" },
      { ru: "Вы можете пополнить карту Тройка в автомате.", vi: "Bạn có thể nạp tiền vào thẻ Troika tại cây bán vé tự động." },
      { ru: "Идите прямо два квартала, затем поверните направо.", vi: "Hãy đi thẳng hai khối nhà, sau đó rẽ phải." }
    ]
  },
  {
    id: "sp-presentation",
    title: "Thuyết trình & Ý kiến học thuật",
    level: "B2",
    levelName: "Nâng cao B2",
    category: "academic",
    categoryName: "Thuyết trình học thuật",
    phonemeTarget: "Ngữ điệu khẳng định IK-1 và nghi vấn IK-3 chuẩn ngữ âm Nga",
    icon: "🎤",
    items: [
      { ru: "Тема моего сегодняшнего доклада посвящена развитию науки.", vi: "Chủ đề bài báo cáo hôm nay của tôi dành cho sự phát triển khoa học." },
      { ru: "Позвольте обратить ваше внимание на приведённые графики.", vi: "Cho phép tôi hướng sự chú ý của quý vị vào các biểu đồ dưới đây." },
      { ru: "Исходя из полученных данных, мы можем сделать следующий вывод.", vi: "Xuất phát từ các dữ liệu thu được, chúng ta có thể rút ra kết luận sau." },
      { ru: "Я готов ответить на все ваши вопросы и комментарии.", vi: "Tôi sẵn sàng giải đáp tất cả câu hỏi và đóng góp ý kiến của quý vị." },
      { ru: "Благодарю аудиторию за проявленное внимание и интерес!", vi: "Xin chân thành cảm ơn khán phòng đã quan tâm theo dõi!" }
    ]
  }
];

const WRITING_TASKS = [
  {
    id: "w1",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "intro",
    categoryName: "Tự giới thiệu",
    icon: "📝",
    estMinutes: 15,
    title: "Bức tự giới thiệu ngắn (Меня зовут...)",
    prompt: "Расскажите о себе: как вас зовут, откуда вы, где вы живёте и что вы изучаете. (4–6 câu)",
    vi: "Giới thiệu về bản thân: tên, quê quán, đang sống ở đâu, đang học gì. (4–6 câu)",
    minWords: 20,
    suggested_words: ["Меня зовут", "Я из Вьетнама", "Я студент", "Я изучаю", "Я живу в Москве"],
    tips: [
      "Dùng cấu trúc: Меня зовут... (tôi tên là...)",
      "Dùng Я живу в... + cách 6 (в общежитии, в Ханое)",
      "Dùng Я изучаю + cách 4 (русский язык)"
    ],
    model: "Меня зовут Минь. Я из Вьетнама. Сейчас я живу в общежитии в Москве. Я студент первого курса. Я изучаю русский язык. Я очень рад, что я в России!"
  },
  {
    id: "w2",
    level: "A1",
    levelName: "Sơ cấp A1",
    category: "daily",
    categoryName: "Sinh hoạt hằng ngày",
    icon: "⏰",
    estMinutes: 15,
    title: "Mô tả một ngày của bạn (Мой день)",
    prompt: "Напишите о вашем дне: во сколько вы встаёте, что вы делаете утром, днём и вечером.",
    vi: "Viết về một ngày của bạn: mấy giờ dậy, buổi sáng/trưa/tối làm gì.",
    minWords: 30,
    suggested_words: ["утром", "завтракать", "университет", "библиотека", "готовить ужин"],
    tips: [
      "Dùng trạng từ thời gian: утром, днём, вечером",
      "Dùng động từ: вставать, завтракать, учиться, готовить, смотреть",
      "Dùng «сначала... потом...» (đầu tiên... sau đó...)"
    ],
    model: "Я встаю в семь часов. Сначала я завтракаю: я ем хлеб с сыром и пью чай. Потом я иду в университет. Днём я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю фильм."
  },
  {
    id: "w5",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "photo",
    categoryName: "Tả tranh bối cảnh",
    icon: "🖼️",
    estMinutes: 20,
    title: "Tả tranh: Buổi sáng ở ký túc xá",
    prompt: "Опишите картинку: комната общежития, за столом сидят студенты, пьют чай и готовятся к экзамену. (6–8 câu)",
    vi: "Mô tả bức tranh: phòng ký túc xá, sinh viên ngồi quanh bàn uống trà và ôn thi. (6–8 câu)",
    minWords: 35,
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    suggested_words: ["на картинке видно", "за столом", "готовятся к тесту", "пьют горячий чай", "дружная атмосфера"],
    tips: [
      "Mở đầu bằng: На этой фотографии я вижу...",
      "Sử dụng vị trí nơi chốn: справа, слева, в центре, на столе",
      "Dùng thì hiện tại của động từ: сидят, разговаривают, читают"
    ],
    model: "На этой фотографии я вижу уютную комнату в студенческом общежитии. В центре комнаты стоит большой стол. За столом сидят двое студентов. Они пьют горячий чай и читают учебник по русскому языку. Справа на столе лежит ноутбук и словарь. Студенты готовятся к трудному экзамену. В комнате царит тёплая и дружеская атмосфера."
  },
  {
    id: "w6",
    level: "A2",
    levelName: "Cơ bản A2",
    category: "letter",
    categoryName: "Tin nhắn & Ghi chú",
    icon: "📌",
    estMinutes: 20,
    title: "Viết mẩu giấy để lại cho bạn cùng phòng (Записка)",
    prompt: "Напишите записку соседу по комнате: вы ушли в библиотеку, вернётесь в 18:00, попросите его купить хлеб и молоко. (4–5 câu)",
    vi: "Viết mẩu giấy cho bạn cùng phòng: bạn đi thư viện, 18h về, nhờ bạn mua bánh mì và sữa.",
    minWords: 30,
    suggested_words: ["Привет!", "Я ушёл в библиотеку", "Купи, пожалуйста", "Вернусь в", "Спасибо!"],
    tips: [
      "Chào thân mật: Привет,... / Здравствуй,...",
      "Dùng thể mệnh lệnh lịch sự: Купи, пожалуйста... / Не забудь...",
      "Ký tên ở cuối mẩu giấy"
    ],
    model: "Привет, Антон! Я ушёл в университетскую библиотеку заниматься. Я вернусь домой около шести часов вечера. Купи, пожалуйста, в магазине свежий хлеб и пакет молока. Деньги лежат на столе около ноутбука. Большое спасибо! До вечера, Минь."
  },
  {
    id: "w3",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "letter",
    categoryName: "Email & Thư từ",
    icon: "✉️",
    estMinutes: 25,
    title: "Thư cho bạn kể về chuyến du lịch Peterburg",
    prompt: "Напишите другу письмо о вашей поездке в Санкт-Петербург: что вы видели, какая была погода, что вам больше всего понравилось. (8–10 câu)",
    vi: "Viết thư cho bạn kể về chuyến đi Sankt-Peterburg: đã tham quan gì, thời tiết ra sao, thích điều gì nhất.",
    minWords: 50,
    suggested_words: ["Дорогой друг", "Северная столица", "Эрмитаж", "Белые ночи", "Незабываемо"],
    tips: [
      "Mở thư: Здравствуй, дорогой друг! / Как твои дела?",
      "Dùng quá khứ hoàn thành СВ: посетил, увидел, сфотографировал",
      "Bày tỏ cảm xúc: Это произвело на меня огромное впечатление"
    ],
    model: "Здравствуй, Денис! На прошлых выходных я ездил в Санкт-Петербург. Это потрясающий город с богатой историей. Погода была солнечной и тёплой. Я побывал в Эрмитаже и увидел шедевры мирового искусства. Вечером мы катались на теплоходе по рекам и каналам и любовались разводными мостами. Петербург оставил незабываемые впечатления! А как твои дела? Напиши мне. До скорой встречи!"
  },
  {
    id: "w4",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "essay",
    categoryName: "Nghị luận xã hội",
    icon: "🏅",
    estMinutes: 25,
    title: "Nghị luận: Thể thao và lối sống lành mạnh của sinh viên",
    prompt: "Напишите небольшой текст о спорте в жизни студента: почему важно заниматься физической культурой при высокой учебной нагрузке? (70–90 từ)",
    vi: "Viết đoạn văn về thể thao trong đời sống sinh viên: vì sao rèn luyện thân thể quan trọng khi áp lực học tập cao?",
    minWords: 60,
    suggested_words: ["здоровый образ жизни", "учебная нагрузка", "заниматься спортом", "энергия и бодрость", "по моему мнению"],
    tips: [
      "Dùng từ nối lập luận: Во-первых, во-вторых, кроме того, следовательно",
      "Nêu dẫn chứng bản thân: Например, я играю в волейбол два раза в неделю",
      "Kết luận khẳng định tầm quan trọng của thể dục"
    ],
    model: "Спорт играет ключевую роль в жизни современного студента. Учёба в университете требует огромных интеллектуальных усилий и связана со стрессом. Физические упражнения помогают не только поддерживать тело в тонусе, но и отлично снимают умственную усталость. Например, регулярные пробежки или игра в волейбол заряжают энергией и улучшают концентрацию. По моему мнению, каждый студент должен находить время для спорта, ведь здоровье — основа будущих успехов."
  },
  {
    id: "w7",
    level: "B2",
    levelName: "Nâng cao B2",
    category: "essay",
    categoryName: "Luận học thuật",
    icon: "🤖",
    estMinutes: 30,
    title: "Bài luận học thuật: Trí tuệ nhân tạo (AI) trong giáo dục",
    prompt: "Напишите эссе на тему: «Плюсы и минусы использования искусственного интеллекта в университетском образовании». Аргументируйте свою позицию. (100–120 từ)",
    vi: "Viết bài luận: «Ưu và nhược điểm của việc ứng dụng AI trong giáo dục đại học». Lập luận bảo vệ quan điểm.",
    minWords: 90,
    suggested_words: ["искусственный интеллект", "автоматизация", "критическое мышление", "с одной стороны", "с другой стороны", "в заключение"],
    tips: [
      "Cấu trúc học thuật: Đặt vấn đề (Введение) -> 2 luận điểm đối lập -> Kết luận tổng hòa",
      "Dùng quán ngữ học thuật: Нельзя отрицать тот факт, что... / Возникает вопрос...",
      "Giữ thái độ khách quan, khoa học"
    ],
    model: "Внедрение искусственного интеллекта в систему высшего образования вызывает оживлённые научные дискуссии. С одной стороны, интеллектуальные алгоритмы открывают невероятные возможности: они персонализируют процесс обучения, мгновенно проверяют задания и помогают находить релевантную научную литературу. С другой стороны, чрезмерное доверие нейросетям может снизить уровень критического мышления студентов и привести к плагиату. В заключение хочу подчеркнуть, что искусственный интеллект должен служить эффективным инструментом исследователя, но не заменять живой творческий поиск и глубокий самостоятельный анализ."
  },
  {
    id: "w8",
    level: "B2",
    levelName: "Nâng cao B2",
    category: "letter",
    categoryName: "Thư ứng tuyển",
    icon: "💼",
    estMinutes: 30,
    title: "Thư động lực ứng tuyển thực tập sinh IT (Мотивационное письмо)",
    prompt: "Напишите официальное мотивационное письмо в компанию для прохождения стажировки: образование, навыки, почему именно вы подходите на эту роль. (90–110 từ)",
    vi: "Viết thư động lực trang trọng xin thực tập tại công ty: học vấn, kỹ năng, vì sao bạn phù hợp với vị trí.",
    minWords: 80,
    suggested_words: ["Уважаемые господа", "прошу рассмотреть мою кандидатуру", "профессиональные навыки", "готов внести вклад", "С уважением"],
    tips: [
      "Văn phong hành chính công vụ trang trọng: Уважаемый(ая)... / С уважением",
      "Khẳng định điểm mạnh và sự nhiệt huyết đối với dự án",
      "Lời kết mong đợi buổi phỏng vấn trực tiếp"
    ],
    model: "Уважаемый руководитель отдела кадров! Прошу рассмотреть мою кандидатуру на позицию стажёра-разработчика. В настоящее время я обучаюсь на третьем курсе факультета вычислительной математики. В ходе учёбы я успешно освоил современные языки программирования и участвовал в командной разработке веб-сервисов. Меня вдохновляют инновационные проекты вашей компании, и я готов применить свои знания для решения практических задач. Буду искренне признателен за возможность пройти личное собеседование. С уважением, Нгуен Ван Минь."
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
    level: "A1",
    levelName: "Sơ cấp A1 (ТЭУ)",
    category: "full",
    categoryName: "Đề thi toàn diện (3 phần)",
    title: "Đề thi thử ТРКИ ТЭУ (Trình độ sơ cấp A1)",
    desc: "Mô phỏng đầy đủ 3 phần thi: Từ vựng & Ngữ pháp, Đọc hiểu, Nghe hiểu theo chuẩn Viện Pushkin.",
    durationMin: 45,
    passPercent: 60,
    questionsCount: 21,
    is_pro_only: false,
    icon: "🥉",
    parts: MOCK_TEST.parts
  },
  {
    id: "trki_a2",
    level: "A2",
    levelName: "Cơ bản A2 (ТБУ)",
    category: "full",
    categoryName: "Đề thi toàn diện (3 phần)",
    title: "Đề thi thử ТРКИ ТБУ (Trình độ cơ bản A2)",
    desc: "Chứng chỉ điều kiện tốt nghiệp hệ dự bị đại học Nga. Bao gồm các chủ đề du lịch Sankt-Peterburg.",
    durationMin: 50,
    passPercent: 66,
    questionsCount: 13,
    is_pro_only: false,
    icon: "🥈",
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
    id: "trki_gram_a1a2",
    level: "A2",
    levelName: "Cơ bản A1-A2",
    category: "grammar",
    categoryName: "Chuyên đề Ngữ pháp",
    title: "Chuyên đề: 6 Cách & Động từ chuyển động (A1-A2)",
    desc: "Bộ 15 câu hỏi trọng điểm kiểm tra hệ thống 6 cách, biến cách tính từ và cặp động từ đi bộ / đi xe.",
    durationMin: 35,
    passPercent: 70,
    questionsCount: 8,
    is_pro_only: false,
    icon: "📖",
    parts: [
      {
        id: "gram",
        name: "Часть 1. Лексика и грамматика",
        vi: "Phần 1. Trắc nghiệm ngữ pháp chuyên đề",
        questions: [
          { q: "Мария подарила цветы своей любимой ___. (подруга)", options: ["подруге", "подругу", "подругой", "подруги"], a: 0, ex: "подарить + cách 3 (подруга -> подруге)." },
          { q: "Мы часто гуляем по ___ парку. (красивый)", options: ["красивому", "красивым", "красивом", "красивого"], a: 0, ex: "по + cách 3 số ít giống đực (-ому)." },
          { q: "Летом студенты поедут ___ море.", options: ["на", "в", "к", "по"], a: 0, ex: "ехать на море (hướng đi với danh từ biển dùng giới từ на)." },
          { q: "Каждое утро мой отец ___ пешком на работу.", options: ["ходит", "идёт", "пошёл", "ездит"], a: 0, ex: "Thói quen lặp lại thường xuyên bằng chân -> dùng НСВ đa hướng: ходить (ходит)." },
          { q: "После школы брат поступил в ___. (университет)", options: ["университет", "университете", "университету", "университетом"], a: 0, ex: "поступить В + cách 4 bất động vật -> giữ nguyên." },
          { q: "Антон увлекается ___. (классическая музыка)", options: ["классической музыкой", "классическую музыку", "классической музыки", "классическая музыка"], a: 0, ex: "увлекаться + cách 5 giống cái (-ой/-ей)." },
          { q: "Сколько ___ прошло с тех пор?", options: ["лет", "года", "год", "годы"], a: 0, ex: "Сколько + cách 2 số nhiều (лет)." },
          { q: "Я хочу пожелать вам крепкого ___. (здоровье)", options: ["здоровья", "здоровью", "здоровьем", "здоровье"], a: 0, ex: "пожелать + cách 2 (здоровье -> здоровья)." }
        ]
      }
    ]
  },
  {
    id: "trki_b1",
    level: "B1",
    levelName: "Trung cấp B1 (ТРКИ-1)",
    category: "full",
    categoryName: "Đề thi toàn diện (3 phần)",
    title: "Đề thi chuẩn quốc tế ТРКИ-1 (Đầu vào Đại học Nga)",
    desc: "Chứng chỉ chuẩn quốc gia Liên bang Nga đủ điều kiện nhập học Cử nhân/Thạc sĩ bằng tiếng Nga.",
    durationMin: 60,
    passPercent: 66,
    questionsCount: 8,
    is_pro_only: true,
    icon: "🥇",
    parts: [
      {
        id: "gram",
        name: "Часть 1. Лексика и грамматика",
        vi: "Phần 1. Từ vựng và ngữ pháp chuyên sâu",
        questions: [
          { q: "Несмотря на ___, студенты успешно сдали все экзамены.", options: ["трудности", "трудностей", "трудностям", "трудностями"], a: 0, ex: "Несмотря на + cách 4 (трудности danh từ số nhiều bất động vật)." },
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
    id: "trki_reading_b1",
    level: "B1",
    levelName: "Trung cấp B1",
    category: "reading",
    categoryName: "Chuyên đề Đọc hiểu",
    title: "Chuyên đề: Đọc hiểu văn bản xã hội & Báo chí Nga (Чтение B1)",
    desc: "Phát triển kỹ năng đọc lướt (skimming) và đọc chi tiết (scanning) đối với các bài báo về văn hóa, xã hội và công nghệ.",
    durationMin: 40,
    passPercent: 66,
    questionsCount: 4,
    is_pro_only: true,
    icon: "📰",
    parts: [
      {
        id: "reading",
        name: "Часть 2. Чтение",
        vi: "Phần 2. Đọc hiểu báo chí",
        text: {
          ru: "Транспортная система Москвы за последние десять лет претерпела масштабную модернизацию. Запуск Московских центральных диаметров (МЦД) и Большой кольцевой линии (БКЛ) связал отдалённые районы столицы с Подмосковьем. Пассажиры отмечают удобство единой системы оплаты, современные поезда с климат-контролем и бесплатный Wi-Fi на всём протяжении пути.",
          vi: "Hệ thống giao thông của Moskva trong mười năm qua đã trải qua quá trình hiện đại hóa quy mô lớn. Việc đưa vào vận hành Tuyến đường kính trung tâm (MCD) và Tuyến vành đai lớn (BKL) đã kết nối các khu vực xa xôi của thủ đô với vùng ngoại ô Podmoskovye. Hành khách đánh giá cao sự tiện lợi của hệ thống vé tích hợp đồng nhất, các đoàn tàu hiện đại có điều hòa không khí và Wi-Fi miễn phí trên suốt hành trình."
        },
        questions: [
          { q: "Что связало отдалённые районы столицы с Подмосковьем?", options: ["МЦД и БКЛ", "Только речные трамваи", "Новая автомагистраль", "Канатная дорога"], a: 0, ex: "'Запуск Московских центральных диаметров (МЦД) и Большой кольцевой линии (БКЛ)...'" },
          { q: "Что отмечают пассажиры в современных поездах?", options: ["Климат-контроль и бесплатный Wi-Fi", "Бесплатную еду", "Телевизоры в каждом купе", "Библиотеку"], a: 0, ex: "'...современные поезда с климат-контролем и бесплатный Wi-Fi...'" },
          { q: "За какой период произошла модернизация системы?", options: ["За последние 10 лет", "За 50 лет", "За один год", "В прошлом веке"], a: 0, ex: "'...за последние десять лет...'" },
          { q: "Какова главная мысль текста?", options: ["Giao thông Moskva hiện đại, đồng bộ và tiện nghi vượt bậc", "Vé tàu ngày càng đắt đỏ", "Ngoại ô không có tàu điện", "Tàu điện ngầm quá tải"], a: 0, ex: "Bài viết tổng quan về những thành tựu hiện đại hóa hệ thống giao thông thủ đô." }
        ]
      }
    ]
  },
  {
    id: "trki_b2",
    level: "B2",
    levelName: "Nâng cao B2 (ТРКИ-2)",
    category: "full",
    categoryName: "Đề thi toàn diện (3 phần)",
    title: "Đề thi nâng cao ТРКИ-2 (Tốt nghiệp Đại học / Thạc sĩ)",
    desc: "Trình độ cao cấp dành cho giảng viên, nghiên cứu sinh, chuyên viên dịch thuật tiếng Nga chuyên nghiệp.",
    durationMin: 75,
    passPercent: 66,
    questionsCount: 6,
    is_pro_only: true,
    icon: "💎",
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
    "id": "jar_auchan",
    "name": "Lọ mua sắm Auchan",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Từ vựng siêu thị, thực phẩm, cân đo, thanh toán sống còn khi mới sang Nga.",
    "icon": "🛒",
    "words": [
      {
        "ru": "хлеб",
        "vi": "bánh mì",
        "note": "danh từ giống đực (он)",
        "ex": "Я покупаю свежий хлеб каждый день."
      },
      {
        "ru": "молоко́",
        "vi": "sữa tươi",
        "note": "danh từ giống trung (оно)",
        "ex": "Пакет молока стоит 80 рублей."
      },
      {
        "ru": "сыр",
        "vi": "phô mai",
        "note": "danh từ giống đực (он)",
        "ex": "Российский сыр очень вкусный."
      },
      {
        "ru": "колбаса́",
        "vi": "xúc xích, giò",
        "note": "danh từ giống cái (она)",
        "ex": "В магазине есть докторская колбаса."
      },
      {
        "ru": "чек",
        "vi": "hóa đơn thanh toán",
        "note": "cần giữ khi qua cổng bảo vệ",
        "ex": "Возьмите ваш чек, пожалуйста."
      },
      {
        "ru": "паке́т",
        "vi": "túi nilông",
        "note": "thu ngân thường hỏi: 'Пакет нужен?'",
        "ex": "Дайте мне один большой пакет."
      },
      {
        "ru": "ка́рта",
        "vi": "thẻ ngân hàng",
        "note": "оплата картой (quẹt thẻ)",
        "ex": "Вы будете платить картой или наличными?"
      },
      {
        "ru": "ски́дка",
        "vi": "giảm giá / khuyến mại",
        "note": "thẻ tích điểm siêu thị",
        "ex": "Студентам предоставляется скидка 10%."
      }
    ]
  },
  {
    "id": "jar_chemodan",
    "name": "Lọ vali hành lý du học",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Đồ dùng cá nhân, quần áo giữ nhiệt, giấy tờ bắt buộc chuẩn bị từ Việt Nam sang.",
    "icon": "🧳",
    "words": [
      {
        "ru": "чемода́н",
        "vi": "vali hành lý",
        "note": "chuẩn ký gửi 23kg",
        "ex": "Мой чемодан весит двадцать два килограмма."
      },
      {
        "ru": "па́спорт",
        "vi": "hộ chiếu quốc tế",
        "note": "luôn mang bản gốc bên người",
        "ex": "Покажите, пожалуйста, ваш паспорт."
      },
      {
        "ru": "ви́за",
        "vi": "thị thực du học",
        "note": "thời hạn nhập cảnh lần đầu 90 ngày",
        "ex": "У меня учебная виза в Россию."
      },
      {
        "ru": "биле́т",
        "vi": "vé máy bay / xe khách",
        "note": "vé điện tử in sẵn giấy",
        "ex": "Я купил билет на самолёт до Москвы."
      },
      {
        "ru": "тёплая ку́ртка",
        "vi": "áo khoác ấm đại hàn",
        "note": "chịu nhiệt độ âm 20-30 độ",
        "ex": "Зимой в Москве обязательно нужна тёплая куртка."
      },
      {
        "ru": "ша́пка",
        "vi": "mũ len trùm tai",
        "note": "bảo vệ đầu chống lạnh buốt",
        "ex": "Надень шапку, на улице сильный мороз!"
      },
      {
        "ru": "перча́тки",
        "vi": "găng tay ấm",
        "note": "loại chống gió tuyết và cảm ứng",
        "ex": "Кожаные перчатки отлично согревают руки."
      },
      {
        "ru": "лека́рства",
        "vi": "thuốc men dự phòng",
        "note": "hạ sốt, cảm cúm, men tiêu hóa mang từ VN",
        "ex": "В поездку я всегда беру домашние лекарства."
      }
    ]
  },
  {
    "id": "jar_airport",
    "name": "Lọ sân bay Sheremetyevo",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Thủ tục check-in, ký gửi hành lý, cửa ra tàu bay và hải quan nhập cảnh Nga.",
    "icon": "✈️",
    "words": [
      {
        "ru": "аэропо́рт",
        "vi": "sân bay / phi trường",
        "note": "ở Moskva có Sheremetyevo, Domodedovo, Vnukovo",
        "ex": "Мы прилетели в международный аэропорт Шереметьево."
      },
      {
        "ru": "термина́л",
        "vi": "nhà ga sân bay",
        "note": "chú ý chữ cái Terminal B, C, D, E, F",
        "ex": "Международные рейсы вылетают из терминала C."
      },
      {
        "ru": "регистра́ция",
        "vi": "thủ tục check-in",
        "note": "mở trước giờ bay 2-3 tiếng",
        "ex": "Где находится стойка регистрации на рейс?"
      },
      {
        "ru": "поса́дочный тало́н",
        "vi": "thẻ lên máy bay (boarding pass)",
        "note": "giữ cùng hộ chiếu để qua cửa gate",
        "ex": "Предъявите посадочный талон при входе в самолёт."
      },
      {
        "ru": "бага́ж",
        "vi": "hành lý ký gửi",
        "note": "nhận tại băng chuyền sân bay",
        "ex": "Где выдают багаж после рейса из Ханоя?"
      },
      {
        "ru": "ручна́я кладь",
        "vi": "hành lý xách tay",
        "note": "tối đa 8-10kg tùy hãng",
        "ex": "Ручную кладь можно взять с собой в салон."
      },
      {
        "ru": "вы́ход на поса́дку",
        "vi": "cửa ra máy bay (gate)",
        "note": "theo dõi màn hình thông báo cửa",
        "ex": "Посадка начинается у выхода номер тридцать два."
      },
      {
        "ru": "тамо́жня",
        "vi": "hải quan sân bay",
        "note": "khai báo nếu mang đồ vượt hạn mức",
        "ex": "Мы быстро прошли паспортный контроль и таможню."
      }
    ]
  },
  {
    "id": "jar_family",
    "name": "Lọ gia đình & người thân",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Mối quan hệ thân thuộc, xưng hô gia đình và tình bạn bè quốc tế.",
    "icon": "👨‍👩‍👧",
    "words": [
      {
        "ru": "семья́",
        "vi": "gia đình",
        "note": "danh từ giống cái (она)",
        "ex": "У меня большая и дружная семья во Вьетнаме."
      },
      {
        "ru": "роди́тели",
        "vi": "bố mẹ / phụ huynh",
        "note": "luôn dùng số nhiều (они)",
        "ex": "Мои родители звонят мне по видеосвязи каждый вечер."
      },
      {
        "ru": "оте́ц",
        "vi": "bố / người cha",
        "note": "dạng thân mật: папа",
        "ex": "Мой отец работает инженером."
      },
      {
        "ru": "мать",
        "vi": "mẹ / người mẹ",
        "note": "dạng thân mật: мама",
        "ex": "Моя мама готовит самые вкусные вьетнамские блюда."
      },
      {
        "ru": "брат",
        "vi": "anh / em trai",
        "note": "старший брат (anh), младший брат (em)",
        "ex": "Мой старший брат тоже учился за границей."
      },
      {
        "ru": "сестра́",
        "vi": "chị / em gái",
        "note": "старшая сестра (chị), младшая сестра (em)",
        "ex": "Моя сестра учит русский язык в школе."
      },
      {
        "ru": "друг",
        "vi": "bạn thân / người bạn nam",
        "note": "số nhiều: друзья",
        "ex": "Антон — мой лучший русский друг в университете."
      },
      {
        "ru": "подру́га",
        "vi": "bạn nữ / bạn gái",
        "note": "danh từ giống cái (она)",
        "ex": "Моя подруга Лена помогает мне с русским произношением."
      }
    ]
  },
  {
    "id": "jar_daily",
    "name": "Lọ sinh hoạt hằng ngày",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Các buổi trong ngày, nếp sống học tập, ăn uống và giờ giấc nghỉ ngơi.",
    "icon": "⏰",
    "words": [
      {
        "ru": "у́тро",
        "vi": "buổi sáng",
        "note": "Доброе утро! (Chào buổi sáng!)",
        "ex": "Каждое утро я встаю в семь часов и делаю зарядку."
      },
      {
        "ru": "день",
        "vi": "buổi trưa / ban ngày",
        "note": "Добрый день! (Chào buổi trưa/chiều!)",
        "ex": "Днём у нас обычно три пары в институте."
      },
      {
        "ru": "ве́чер",
        "vi": "buổi tối",
        "note": "Добрый вечер! (Chào buổi tối!)",
        "ex": "Вечером студенты повторяют новые слова и делают уроки."
      },
      {
        "ru": "ночь",
        "vi": "ban đêm",
        "note": "Спокойной ночи! (Chúc ngủ ngon!)",
        "ex": "Ночью в общежитии тихо, все отдыхают."
      },
      {
        "ru": "за́втрак",
        "vi": "bữa ăn sáng",
        "note": "động từ: завтракать",
        "ex": "На завтрак я ем овсяную кашу и пью кофе."
      },
      {
        "ru": "обе́д",
        "vi": "bữa ăn trưa",
        "note": "động từ: обедать",
        "ex": "Мы идём на обед в университетскую столовую."
      },
      {
        "ru": "у́жин",
        "vi": "bữa ăn tối",
        "note": "động từ: ужинать",
        "ex": "После занятий мы вместе готовим вкусный ужин."
      },
      {
        "ru": "отды́х",
        "vi": "sự nghỉ ngơi / thư giãn",
        "note": "động từ: отдыхать",
        "ex": "В воскресенье у нас свободное время и хороший отдых."
      }
    ]
  },
  {
    "id": "jar_weather",
    "name": "Lọ thời tiết & 4 mùa Nga",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Bốn mùa đặc trưng xứ sở Bạch Dương: tuyết trắng, lá vàng, mưa phùn và nắng hè.",
    "icon": "❄️",
    "words": [
      {
        "ru": "пого́да",
        "vi": "thời tiết",
        "note": "Какая сегодня погода? (Thời tiết hôm nay thế nào?)",
        "ex": "Сегодня на улице прекрасная солнечная погода."
      },
      {
        "ru": "зима́",
        "vi": "mùa đông",
        "note": "trạng từ: зимой (vào mùa đông)",
        "ex": "Русская зима очень холодная, но невероятно красивая."
      },
      {
        "ru": "снег",
        "vi": "tuyết / bông tuyết",
        "note": "идёт снег (tuyết đang rơi)",
        "ex": "Зимой в Москве почти каждый день идёт белый снег."
      },
      {
        "ru": "моро́з",
        "vi": "giá rét / sương giá",
        "note": "nhiệt độ dưới 0°C buốt da",
        "ex": "Сегодня на улице мороз минус пятнадцать градусов."
      },
      {
        "ru": "весна́",
        "vi": "mùa xuân",
        "note": "trạng từ: весной (vào mùa xuân)",
        "ex": "Весной тает снег и распускаются первые листья."
      },
      {
        "ru": "ле́то",
        "vi": "mùa hè",
        "note": "trạng từ: летом (vào mùa hè)",
        "ex": "Летом в Санкт-Петербурге начинаются белые ночи."
      },
      {
        "ru": "о́сень",
        "vi": "mùa thu",
        "note": "trạng từ: осенью (vào mùa thu)",
        "ex": "Золотая осень в России — любимое время поэтов."
      },
      {
        "ru": "дождь",
        "vi": "cơn mưa",
        "note": "идёт дождь (trời đang mưa)",
        "ex": "Возьми зонт, на улице идёт сильный дождь."
      }
    ]
  },
  {
    "id": "jar_city",
    "name": "Lọ thành phố & hỏi đường",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Đường phố, quảng trường, phương hướng trái phải và cách hỏi đường người bản xứ.",
    "icon": "🗺️",
    "words": [
      {
        "ru": "го́род",
        "vi": "thành phố / đô thị",
        "note": "số nhiều: города",
        "ex": "Москва — огромный и современный европейский город."
      },
      {
        "ru": "у́лица",
        "vi": "con đường / tuyến phố",
        "note": "на улице (ở ngoài phố)",
        "ex": "Наш университет находится на тихой красивой улице."
      },
      {
        "ru": "пло́щадь",
        "vi": "quảng trường",
        "note": "danh từ giống cái (она)",
        "ex": "Красная площадь — главное историческое место столицы."
      },
      {
        "ru": "остано́вка",
        "vi": "điểm dừng xe buýt / trạm đón",
        "note": "автобусная остановка",
        "ex": "Автобусная остановка находится прямо напротив общежития."
      },
      {
        "ru": "пра́во",
        "vi": "bên phải",
        "note": "направо (rẽ sang phải)",
        "ex": "Поверните направо возле большого торгового центра."
      },
      {
        "ru": "ле́во",
        "vi": "bên trái",
        "note": "налево (rẽ sang trái)",
        "ex": "Аптека расположена слева от входа в метро."
      },
      {
        "ru": "пря́мо",
        "vi": "đi thẳng",
        "note": "идите прямо (hãy đi thẳng)",
        "ex": "Идите прямо двести метров, и вы увидите парк."
      },
      {
        "ru": "центр",
        "vi": "trung tâm thành phố",
        "note": "в центре (ở trung tâm)",
        "ex": "Мы любим гулять в центре Москвы по выходным."
      }
    ]
  },
  {
    "id": "jar_dorm",
    "name": "Lọ ký túc xá & phòng ở",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Cuộc sống tự lập ở KTX Nga: chìa khóa, nội quy, giặt giũ, nấu nướng.",
    "icon": "🏢",
    "words": [
      {
        "ru": "общежи́тие",
        "vi": "ký túc xá sinh viên",
        "note": "viết tắt thường gọi: общага",
        "ex": "Наше студенческое общежитие находится недалеко от метро."
      },
      {
        "ru": "ко́мната",
        "vi": "phòng ở sinh viên",
        "note": "thường xếp 2-3 bạn một phòng",
        "ex": "В нашей комнате живут студенты из Вьетнама и Китая."
      },
      {
        "ru": "ключ",
        "vi": "chìa khóa phòng",
        "note": "gửi chìa khóa ở quầy trực khi ra ngoài",
        "ex": "Не забудьте сдать ключ на вахту дежурному."
      },
      {
        "ru": "сосе́д",
        "vi": "bạn cùng phòng nam",
        "note": "соседка (bạn nữ)",
        "ex": "Мой сосед по комнате отлично говорит по-русски."
      },
      {
        "ru": "ку́хня",
        "vi": "bếp ăn chung",
        "note": "mỗi tầng thường có 1-2 bếp chung",
        "ex": "На кухне установлены две газовые плиты и мойка."
      },
      {
        "ru": "пра́чечная",
        "vi": "phòng giặt là tự động",
        "note": "máy giặt công cộng đặt dưới tầng hầm",
        "ex": "В прачечной можно постирать постельное бельё за жетон."
      },
      {
        "ru": "дежу́рный",
        "vi": "bác bảo vệ / quản lý trực ban",
        "note": "người quản lý cổng ra vào",
        "ex": "Дежурный проверяет пропуска у всех входящих."
      },
      {
        "ru": "про́пуск",
        "vi": "thẻ ra vào KTX",
        "note": "quẹt thẻ từ khi qua cửa kiểm soát",
        "ex": "Всегда носите пропуск с собой при выходе на улицу."
      }
    ]
  },
  {
    "id": "jar_kafe",
    "name": "Lọ quán ăn & ẩm thực Nga",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Thực đơn món Nga truyền thống, cách gọi món và tính tiền lịch sự.",
    "icon": "🍽️",
    "words": [
      {
        "ru": "меню́",
        "vi": "thực đơn",
        "note": "'Дайте, пожалуйста, меню'",
        "ex": "Официант принёс нам меню на русском языке."
      },
      {
        "ru": "борщ",
        "vi": "súp củ dền đỏ truyền thống",
        "note": "ăn kèm váng sữa сметана và tỏi",
        "ex": "Горячий борщ со сметаной — лучшее блюдо в холодную зиму."
      },
      {
        "ru": "блины́",
        "vi": "bánh xèo blini",
        "note": "nhân mặn thịt băm hoặc nhân ngọt mứt dâu",
        "ex": "На Масленицу в России пекут и едят вкусные блины."
      },
      {
        "ru": "пельме́ни",
        "vi": "sủi cảo thịt kiểu Nga",
        "note": "món ăn nhanh phổ biến nhất của sinh viên",
        "ex": "Мы сварили пачку пельменей на скорый обед."
      },
      {
        "ru": "смета́на",
        "vi": "kem chua váng sữa",
        "note": "danh từ giống cái (она)",
        "ex": "Борщ всегда подают со свежей сметаной и зеленью."
      },
      {
        "ru": "чай с лимо́ном",
        "vi": "trà đen kèm lát chanh tươi",
        "note": "thức uống sưởi ấm mùa đông yêu thích của người Nga",
        "ex": "После мороза приятно выпить горячий чай с лимоном."
      },
      {
        "ru": "официа́нт",
        "vi": "người phục vụ bàn",
        "note": "nữ: официантка",
        "ex": "Мы подозвали официанта и сделали заказ."
      },
      {
        "ru": "счёт",
        "vi": "hóa đơn tính tiền",
        "note": "'Дайте, пожалуйста, счёт'",
        "ex": "Принесите, пожалуйста, счёт: мы платим раздельно."
      }
    ]
  },
  {
    "id": "jar_metro",
    "name": "Lọ tàu điện ngầm Moskva",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Bản đồ ngầm, quẹt thẻ Troika, chuyển tuyến đường tròn Koltsevaya.",
    "icon": "🚇",
    "words": [
      {
        "ru": "ста́нция",
        "vi": "nhà ga tàu điện ngầm",
        "note": "nhiều ga là kiệt tác kiến trúc cung điện ngầm",
        "ex": "Станция Маяковская признана одной из красивейших в мире."
      },
      {
        "ru": "перехо́д",
        "vi": "lối chuyển tuyến giữa các ga",
        "note": "theo dõi biển chỉ dẫn màu sắc đường kính",
        "ex": "Здесь удобный переход на кольцевую коричневую ветку."
      },
      {
        "ru": "ка́рта Тро́йка",
        "vi": "thẻ giao thông Troika",
        "note": "thẻ tích hợp đi tàu điện ngầm, xe buýt, tramvaj",
        "ex": "Я пополнил карту Тройка на месяц по студенческому тарифу."
      },
      {
        "ru": "турнике́т",
        "vi": "cổng kiểm soát vé tự động",
        "note": "chạm thẻ vào vòng tròn sáng xanh",
        "ex": "Приложите карту к валидатору турникета для прохода."
      },
      {
        "ru": "эскала́тор",
        "vi": "thang cuốn sâu lòng đất",
        "note": "quy tắc vàng: đứng bên phải, nhường đi bên trái",
        "ex": "Стойте справа на эскалаторе, чтобы пропустить спешащих."
      },
      {
        "ru": "по́езд",
        "vi": "đoàn tàu điện ngầm",
        "note": "khoảng cách giữa các chuyến chỉ 90 giây",
        "ex": "Следующий поезд прибудет через полторы минуты."
      },
      {
        "ru": "ваго́н",
        "vi": "toa tàu ngầm",
        "note": "toa mới có điều hòa và cổng sạc USB",
        "ex": "В современных вагонах метро есть бесплатный Wi-Fi."
      },
      {
        "ru": "вы́ход в го́род",
        "vi": "lối ra khỏi ga lên mặt đất",
        "note": "xem số thứ tự cửa ra theo biển chỉ dẫn",
        "ex": "Вам нужен выход в город номер три к главному входу в парк."
      }
    ]
  },
  {
    "id": "jar_bank",
    "name": "Lọ ngân hàng & thẻ Sberbank",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Mở tài khoản sinh viên, rút tiền ATM, chuyển khoản qua số điện thoại và bảo mật thẻ.",
    "icon": "💳",
    "words": [
      {
        "ru": "банк",
        "vi": "ngân hàng",
        "note": "các ngân hàng phổ biến: Sberbank, VTB, Tinkoff",
        "ex": "Студенты открывают карты в отделении Сбербанка."
      },
      {
        "ru": "банкома́т",
        "vi": "cây rút tiền tự động ATM",
        "note": "có chức năng nạp tiền (внесение) và rút tiền (снятие)",
        "ex": "Я снял наличные рубли в ближайшем банкомате."
      },
      {
        "ru": "перево́д",
        "vi": "lệnh chuyển tiền / chuyển khoản",
        "note": "chuyển khoản qua số điện thoại (СБП)",
        "ex": "Я отправил перевод соседу через систему быстрых платежей."
      },
      {
        "ru": "нали́чные",
        "vi": "tiền mặt giấy và xu",
        "note": "luôn dùng số nhiều (они)",
        "ex": "В некоторых киосках принимают только наличные деньги."
      },
      {
        "ru": "бала́нс",
        "vi": "số dư tài khoản ngân hàng",
        "note": "kiểm tra qua tin nhắn hoặc app",
        "ex": "Какой у меня текущий баланс на карте Мир?"
      },
      {
        "ru": "приложе́ние",
        "vi": "ứng dụng di động (app)",
        "note": "app ngân hàng di động",
        "ex": "Мобильное приложение банка позволяет оплачивать связь и интернет."
      },
      {
        "ru": "пин-код",
        "vi": "mã số bí mật PIN của thẻ",
        "note": "không bao giờ tiết lộ cho người lạ",
        "ex": "Никому не сообщайте пин-код và mã bí mật."
      },
      {
        "ru": "коми́ссия",
        "vi": "phí giao dịch ngân hàng",
        "note": "miễn phí khi chuyển qua SBP dưới hạn mức",
        "ex": "Перевод между своими счетами выполняется без комиссии."
      }
    ]
  },
  {
    "id": "jar_post",
    "name": "Lọ bưu điện Pochta Rossii & gửi đồ",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Nhận bưu kiện từ Việt Nam, gửi quà lưu niệm, tra mã tracking bưu chính.",
    "icon": "📦",
    "words": [
      {
        "ru": "по́чта",
        "vi": "bưu điện quốc gia Pochta Rossii",
        "note": "trực thuộc bưu chính Nga",
        "ex": "Отделение почты находится на соседней улице."
      },
      {
        "ru": "посы́лка",
        "vi": "bưu kiện hàng gửi đóng thùng",
        "note": "hàng gửi gia đình từ quê sang",
        "ex": "Мне пришла долгожданная посылка с вьетнамским кофе."
      },
      {
        "ru": "письмо́",
        "vi": "thư từ / bì thư gửi bưu điện",
        "note": "số nhiều: письма",
        "ex": "Я отправил заказное письмо с документами в консульство."
      },
      {
        "ru": "адре́с",
        "vi": "địa chỉ cư trú người nhận",
        "note": "ghi tên đường, số nhà, số phòng KTX",
        "ex": "Укажите точный почтовый адрес и номер комнаты."
      },
      {
        "ru": "и́ндекс",
        "vi": "mã bưu chính (ZIP code)",
        "note": "gồm 6 chữ số bưu cục Nga",
        "ex": "Шестизначный почтовый индекс обязателен для доставки."
      },
      {
        "ru": "трек-но́мер",
        "vi": "mã số tra cứu đơn vận (tracking)",
        "note": "tra cứu trên app Pochta",
        "ex": "По трек-номеру видно, что посылка прибыла в Москву."
      },
      {
        "ru": "извеще́ние",
        "vi": "giấy báo / thông báo nhận hàng",
        "note": "thông báo điện tử qua app hoặc SMS",
        "ex": "Покажите электронное извещение и паспорт оператору."
      },
      {
        "ru": "опера́тор",
        "vi": "giao dịch viên bưu điện",
        "note": "người tiếp nhận và phát bưu phẩm",
        "ex": "Оператор почты быстро выдал посылку по штрихкоду."
      }
    ]
  },
  {
    "id": "jar_hospital",
    "name": "Lọ y tế & phòng khám поликлиника",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "desc": "Bảo hiểm y tế, mô tả bệnh án, đơn thuốc bác sĩ và tiêm phòng.",
    "icon": "💊",
    "words": [
      {
        "ru": "поликли́ника",
        "vi": "phòng khám đa khoa sinh viên",
        "note": "nơi khám chữa bệnh ban đầu của trường",
        "ex": "Студенческая поликлиника принимает с восьми утра."
      },
      {
        "ru": "медици́нский по́лис",
        "vi": "thẻ bảo hiểm y tế bắt buộc",
        "note": "bắt buộc mang khi đi khám bệnh viện",
        "ex": "Прикрепитесь к поликлинике по полису ДМС."
      },
      {
        "ru": "терапе́вт",
        "vi": "bác sĩ nội khoa tổng quát",
        "note": "khám ban đầu và chuyển tuyến chuyên khoa",
        "ex": "Терапевт выслушал жалобы и измерил артериальное давление."
      },
      {
        "ru": "реце́пт",
        "vi": "đơn thuốc kê bởi bác sĩ",
        "note": "nhiều loại kháng sinh chỉ bán khi có đơn",
        "ex": "Этот антибиотик в аптеке отпускается только по рецепту."
      },
      {
        "ru": "симпто́мы",
        "vi": "các triệu chứng lâm sàng",
        "note": "sốt, ho, nhức đầu, mệt mỏi",
        "ex": "Опишите врачу основные симптомы вашего недомогания."
      },
      {
        "ru": "спра́вка",
        "vi": "giấy chứng nhận nghỉ ốm y tế",
        "note": "nộp cho dekanat để miễn buổi học",
        "ex": "Врач выписал официальную справку об освобождении от занятий."
      },
      {
        "ru": "температу́ра",
        "vi": "thân nhiệt / cơn sốt",
        "note": "высокая температура (sốt cao)",
        "ex": "У меня поднялась высокая температура до тридцати восьми градусов."
      },
      {
        "ru": "апте́ка",
        "vi": "hiệu thuốc tây",
        "note": "ký hiệu chữ thập xanh lá cây",
        "ex": "Круглосуточная дежурная аптека расположена возле метро."
      }
    ]
  },
  {
    "id": "jar_dekanat",
    "name": "Lọ khoa & giáo vụ Dekanat",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "desc": "Thủ tục học vụ, lịch thi cử, sổ điểm zachotka và xin gia hạn visa du học.",
    "icon": "🏛️",
    "words": [
      {
        "ru": "декана́т",
        "vi": "văn phòng khoa đại học",
        "note": "giải quyết hồ sơ học bổng, điểm và giấy tờ",
        "ex": "Студенты обращаются в деканат за учебными справками."
      },
      {
        "ru": "дека́н",
        "vi": "trưởng khoa",
        "note": "lãnh đạo cao nhất của khoa",
        "ex": "Приказ о переводе на следующий курс подписан деканом."
      },
      {
        "ru": "расписа́ние",
        "vi": "thời khóa biểu môn học",
        "note": "lịch học được niêm yết online",
        "ex": "По расписанию первая пара начинается в девять утра."
      },
      {
        "ru": "зачётная кни́жка",
        "vi": "sổ điểm sinh viên (zachotka)",
        "note": "bảo bối thi cử của mọi sinh viên Nga",
        "ex": "Преподаватель поставил отлично в зачётную книжку."
      },
      {
        "ru": "экза́мен",
        "vi": "kỳ thi kết thúc học phần (cho điểm)",
        "note": "thang điểm 5: 5 (отл), 4 (хор), 3 (удовл), 2 (неуд)",
        "ex": "Зимняя сессия состоит из четырёх трудных экзаменов."
      },
      {
        "ru": "зачёт",
        "vi": "bài kiểm tra điều kiện (đạt/không đạt)",
        "note": "ghi là 'зачтено' nếu vượt qua",
        "ex": "Чтобы получить допуск к экзамену, нужно сдать зачёт."
      },
      {
        "ru": "аудито́рия",
        "vi": "giảng đường / phòng học lý thuyết",
        "note": "đánh số theo tầng và tòa nhà",
        "ex": "Лекция по высшей математике пройдёт в большой аудитории 305."
      },
      {
        "ru": "стипе́ндия",
        "vi": "học bổng nhà nước cấp hằng tháng",
        "note": "chuyển thẳng vào thẻ ngân hàng",
        "ex": "Студенты-отличники получают повышенную академическую стипендию."
      }
    ]
  },
  {
    "id": "jar_travel",
    "name": "Lọ du lịch & khám phá nước Nga",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "desc": "Tàu hỏa xuyên Siberia, đặt phòng khách sạn, khám phá kỳ quan thiên nhiên Baikal, Kazan, SPb.",
    "icon": "🚂",
    "words": [
      {
        "ru": "путеше́ствие",
        "vi": "chuyến du lịch trải nghiệm",
        "note": "du lịch xuyên các múi giờ nước Nga",
        "ex": "Путешествие на поезде через всю Россию оставляет яркие впечатления."
      },
      {
        "ru": "плацка́рт",
        "vi": "khoang giường nằm tàu hỏa mở",
        "note": "loại vé phổ thông quen thuộc nhất của sinh viên",
        "ex": "Билет в плацкартный вагон стоит значительно дешевле купе."
      },
      {
        "ru": "проводни́к",
        "vi": "nhân viên phụ trách toa tàu",
        "note": "phục vụ trà bằng cốc có giá kim loại podstakannik",
        "ex": "Проводник принёс горячий чай в традиционном подстаканнике."
      },
      {
        "ru": "гости́ница",
        "vi": "khách sạn lưu trú du lịch",
        "note": "đồng nghĩa: отель",
        "ex": "Мы забронировали недорогую гостиницу в центре Казани."
      },
      {
        "ru": "брони́рование",
        "vi": "việc đặt chỗ trước",
        "note": "đặt vé tàu xe và phòng ở",
        "ex": "Подтверждение бронирования пришло на электронную почту."
      },
      {
        "ru": "достопримеча́тельность",
        "vi": "danh lam thắng cảnh / di tích lịch sử",
        "note": "từ ghép B1 rất thông dụng",
        "ex": "В Санкт-Петербурге огромное количество всемирно известных достопримечательностей."
      },
      {
        "ru": "экску́рсия",
        "vi": "chuyến tham quan có hướng dẫn viên",
        "note": "đi bảo tàng Hermitage, Kremlin",
        "ex": "Гид провёл увлекательную экскурсию по залам Эрмитажа."
      },
      {
        "ru": "сувени́р",
        "vi": "quà lưu niệm kỉ niệm",
        "note": "búp bê Matryoshka, khăn Pavlovo Posad",
        "ex": "Туристы часто покупают матрёшек в качестве русского сувенира."
      }
    ]
  },
  {
    "id": "jar_academic",
    "name": "Lọ học thuật & nghiên cứu luận văn",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "desc": "Thuật ngữ luận văn, bảo vệ đề tài, phản biện khoa học và trích dẫn theo chuẩn GOST.",
    "icon": "🎓",
    "words": [
      {
        "ru": "дипло́мная рабо́та",
        "vi": "khóa luận tốt nghiệp đại học",
        "note": "công trình bảo vệ năm cuối cử nhân/thạc sĩ",
        "ex": "Тема моей дипломной работы утверждена на заседании кафедры."
      },
      {
        "ru": "нау́чный руководи́тель",
        "vi": "giáo viên hướng dẫn khoa học",
        "note": "giáo sư định hướng đề tài nghiên cứu",
        "ex": "Научный руководитель одобрил структуру второй главы исследования."
      },
      {
        "ru": "актуа́льность",
        "vi": "tính cấp thiết của đề tài",
        "note": "phần mở đầu bắt buộc của mọi luận văn",
        "ex": "Актуальность темы обусловлена быстрым развитием искусственного интеллекта."
      },
      {
        "ru": "библиогра́фия",
        "vi": "danh mục tài liệu tham khảo",
        "note": "trích dẫn theo quy chuẩn GOST Nga",
        "ex": "В конце диссертации приведена обширная библиография из сотни источников."
      },
      {
        "ru": "защи́та дипло́ма",
        "vi": "buổi lễ bảo vệ đồ án tốt nghiệp",
        "note": "thuyết trình trước hội đồng giám khảo nhà nước",
        "ex": "Защита диплома прошла успешно с оценкой отлично."
      },
      {
        "ru": "реце́нзия",
        "vi": "bài nhận xét, phản biện khoa học độc lập",
        "note": "đánh giá từ chuyên gia phản biện",
        "ex": "Официальный оппонент подготовил положительную рецензию на исследование."
      },
      {
        "ru": "гипо́теза",
        "vi": "giả thuyết nghiên cứu khoa học",
        "note": "được kiểm chứng qua thực nghiệm",
        "ex": "Экспериментальные данные полностью подтвердили выдвинутую гипотезу."
      },
      {
        "ru": "моногра́фия",
        "vi": "công trình chuyên khảo học thuật",
        "note": "ấn phẩm nghiên cứu chuyên sâu một chủ đề",
        "ex": "Профессор опубликовал фундаментальную монографию по славянской филологии."
      }
    ]
  },
  {
    "id": "jar_interview",
    "name": "Lọ phỏng vấn xin việc & công sở Nga",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "desc": "Tuyển dụng, sơ yếu lý lịch CV, hợp đồng lao động và văn hóa làm việc văn phòng Nga.",
    "icon": "💼",
    "words": [
      {
        "ru": "собесе́дование",
        "vi": "buổi phỏng vấn tuyển dụng việc làm",
        "note": "gặp gỡ ban nhân sự HR",
        "ex": "Кандидат успешно прошёл техническое собеседование в IT-компании."
      },
      {
        "ru": "резюме́",
        "vi": "sơ yếu lý lịch, CV ứng tuyển",
        "note": "tóm tắt kinh nghiệm và kỹ năng",
        "ex": "Отправьте ваше подробное резюме на электронную почту рекрутера."
      },
      {
        "ru": "вака́нсия",
        "vi": "vị trí tuyển dụng đang mở",
        "note": "tìm kiếm trên HeadHunter (hh.ru)",
        "ex": "Компания открыла привлекательную вакансию для русскоязычных переводчиков."
      },
      {
        "ru": "квалифика́ция",
        "vi": "trình độ chuyên môn năng lực",
        "note": "bằng cấp và kỹ năng chứng minh",
        "ex": "Высокая квалификация специалиста подтверждена международными сертификатами."
      },
      {
        "ru": "испыта́тельный срок",
        "vi": "thời gian thử việc công ty",
        "note": "thường kéo dài 1-3 tháng theo luật lao động Nga",
        "ex": "После успешного прохождения испытательного срока сотруднику повышают оклад."
      },
      {
        "ru": "контра́кт",
        "vi": "hợp đồng lao động chính thức",
        "note": "ký kết giữa người lao động và chủ sử dụng",
        "ex": "Трудовой договор и контракт подписаны обеими сторонами."
      },
      {
        "ru": "зарпла́та",
        "vi": "mức lương tháng thỏa thuận",
        "note": "thường chia thành avans và oklad",
        "ex": "Заработная плата перечисляется на банковскую карту два раза в месяц."
      },
      {
        "ru": "колле́га",
        "vi": "đồng nghiệp cơ quan",
        "note": "dùng chung cho cả nam và nữ",
        "ex": "Мои российские коллеги всегда готовы помочь советом в сложной задаче."
      }
    ]
  },
  {
    "id": "jar_media",
    "name": "Lọ báo chí, truyền thông & dư luận",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "desc": "Tin tức thời sự, báo chí phân tích, xu hướng truyền thông và bình luận xã hội.",
    "icon": "📰",
    "words": [
      {
        "ru": "сре́дства ма́ссовой информа́ции",
        "vi": "phương tiện truyền thông đại chúng (SMI)",
        "note": "báo chí, đài truyền hình, mạng xã hội",
        "ex": "Ведущие средства массовой информации оперативно освещают мировые события."
      },
      {
        "ru": "публика́ция",
        "vi": "bài báo xuất bản / ấn phẩm phát hành",
        "note": "trên các tạp chí uy tín",
        "ex": "Статья вызвала большой резонанс сразу после первой публикации."
      },
      {
        "ru": "исто́чник",
        "vi": "nguồn thông tin dữ liệu",
        "note": "độ tin cậy của nguồn tin",
        "ex": "Журналист ссылается исключительно на официальные и проверенные источники."
      },
      {
        "ru": "обще́ственное мне́ние",
        "vi": "dư luận xã hội / công luận",
        "note": "khảo sát ý kiến người dân",
        "ex": "Результаты социологического опроса отражают актуальное общественное мнение."
      },
      {
        "ru": "ана́лиз",
        "vi": "phân tích chuyên sâu vấn đề",
        "note": "đánh giá đa chiều",
        "ex": "Эксперт представил глубокий аналитический обзор экономической ситуации."
      },
      {
        "ru": "прогно́з",
        "vi": "dự báo xu hướng phát triển",
        "note": "dự báo tương lai",
        "ex": "Позитивный прогноз аналитиков предсказывает устойчивый рост отрасли."
      },
      {
        "ru": "тенде́нция",
        "vi": "khuynh hướng / xu thế tất yếu",
        "note": "sự dịch chuyển của dòng chảy xã hội",
        "ex": "Цифровизация образования — ключевая глобальная тенденция современности."
      },
      {
        "ru": "диску́ссия",
        "vi": "cuộc thảo luận / tọa đàm tranh luận",
        "note": "trao đổi quan điểm học thuật",
        "ex": "На конференции развернулась оживлённая дискуссия по актуальным проблемам науки."
      }
    ]
  }
];

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
    id: "tuvan-duhoc",
    category: "dich_vu_du_hoc",
    categoryName: "Dịch vụ Du học Nga",
    title: "Gói tư vấn & hỗ trợ hồ sơ Du học Nga",
    desc: "Định hướng chọn trường top (MGU, HSE, SPbGU), tối ưu bài luận và nộp hồ sơ chuẩn chỉ tiêu 1000 suất.",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    badge: "Hot"
  },
  {
    id: "dich-thuat-nga",
    category: "dich_vu_du_hoc",
    categoryName: "Dịch vụ Du học Nga",
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
      "Ưu tiên hỗ trợ hồ sơ học bổng Du học Nga",
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
