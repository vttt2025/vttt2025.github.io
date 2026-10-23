/**
 * RUSI TRKI — DỮ LIỆU ĐỒNG BỘ TOÀN HỆ THỐNG (SUPABASE CANONICAL)
 * Tự động đồng bộ & hợp nhất với cơ sở dữ liệu Supabase Cloud
 * Ngày đồng bộ: 2026-10-23T17:51:35.227Z
 */

const VOCAB_LESSONS = [
  {
    "id": "ep1",
    "type": "series",
    "level": "A1",
    "ep": 1,
    "ru": "Собираю чемодан",
    "vi": "Tập 1 — Chuẩn bị hành lý",
    "scene": "briefcase",
    "story": "Anya, du học sinh tương lai, đang xếp vali chuẩn bị bay tới Nga học tập.",
    "script": [
      {
        "ru": "Меня зовут Аня. Скоро я поеду учиться в Россию!",
        "vi": "Tôi tên là Anya. Sắp tới tôi sẽ sang Nga du học!"
      },
      {
        "ru": "Я собираю чемодан. Сначала я кладу одежду и обувь.",
        "vi": "Tôi xếp vali. Đầu tiên tôi để quần áo và giày dép."
      },
      {
        "ru": "В Россию холодно, поэтому я беру тёплую куртку.",
        "vi": "Nga lạnh, nên tôi mang theo áo khoác ấm."
      },
      {
        "ru": "Потом я кладу книгу и зарядку для телефона.",
        "vi": "Sau đó tôi để sách và sạc điện thoại."
      },
      {
        "ru": "Паспорт, визу и билет я кладу в маленькую сумку.",
        "vi": "Hộ chiếu, visa và vé tôi để vào túi nhỏ."
      },
      {
        "ru": "Ещё я беру подарки для новых друзей.",
        "vi": "Tôi còn mang quà cho những người bạn mới."
      },
      {
        "ru": "Готово! Я готова к поездке!",
        "vi": "Xong! Tôi đã sẵn sàng cho chuyến đi!"
      }
    ],
    "words": [
      {
        "ru": "чемодан",
        "vi": "vali",
        "note": "danh từ nam"
      },
      {
        "ru": "виза",
        "vi": "visa",
        "note": "danh từ nữ"
      },
      {
        "ru": "паспорт",
        "vi": "hộ chiếu",
        "note": "danh từ nam"
      },
      {
        "ru": "билет",
        "vi": "vé",
        "note": "danh từ nam"
      },
      {
        "ru": "одежда",
        "vi": "quần áo",
        "note": "danh từ nữ"
      },
      {
        "ru": "обувь",
        "vi": "giày dép",
        "note": "danh từ nữ"
      },
      {
        "ru": "тёплая куртка",
        "vi": "áo khoác ấm",
        "note": "tính từ + danh từ nữ"
      },
      {
        "ru": "зарядка",
        "vi": "dây sạc",
        "note": "danh từ nữ"
      },
      {
        "ru": "собирать / собрать",
        "vi": "xếp, thu dọn",
        "note": "động từ chưa hoàn thành / hoàn thành"
      },
      {
        "ru": "класть / положить",
        "vi": "để, đặt vào",
        "note": "động từ chưa hoàn thành / hoàn thành"
      }
    ],
    "quiz": [
      {
        "q": "«чемодан» nghĩa là gì?",
        "options": [
          "vali",
          "hộ chiếu",
          "vé máy bay",
          "quà"
        ],
        "a": 0
      },
      {
        "q": "«паспорт» nghĩa là gì?",
        "options": [
          "visa",
          "hộ chiếu",
          "vali",
          "sách"
        ],
        "a": 1
      },
      {
        "ru": "Я ___ чемодан.",
        "q": "Chọn từ đúng: Я ___ чемодан. (tôi xếp vali)",
        "options": [
          "собираю",
          "кладу",
          "беру",
          "готовлю"
        ],
        "a": 0,
        "ex": "собирать чемодан = xếp vali"
      },
      {
        "ru": "Я ___ паспорт в сумку.",
        "q": "Chọn từ đúng: Я ___ паспорт в сумку. (tôi để hộ chiếu vào túi)",
        "options": [
          "положу",
          "собираю",
          "лечу",
          "еду"
        ],
        "a": 0,
        "ex": "положить что-то куда-то = để cái gì đó vào đâu"
      }
    ]
  },
  {
    "id": "ep2",
    "type": "series",
    "level": "A1",
    "ep": 2,
    "ru": "В самолёте",
    "vi": "Tập 2 — Trên chuyến bay",
    "scene": "plane",
    "story": "Anya làm thủ tục, qua kiểm tra hộ chiếu và lên máy bay — hành trình có quá cảnh ở Moskva.",
    "script": [
      {
        "ru": "Аня идёт в аэропорт. Это её первый рейс в Россию.",
        "vi": "Anya đi tới sân bay. Đây là chuyến bay đầu tiên của cô tới Nga."
      },
      {
        "ru": "— Ваш паспорт и билет, пожалуйста. — Вот, пожалуйста.",
        "vi": "— Hộ chiếu và vé của cô ạ. — Đây ạ."
      },
      {
        "ru": "У вас есть багаж? — Да, один чемодан. Это ручная кладь.",
        "vi": "Cô có hành lý ký gửi không? — Có, một vali. Còn đây là hành lý xách tay."
      },
      {
        "ru": "Ваше место — 21А. Рейс с пересадкой в Москве.",
        "vi": "Chỗ của cô là 21A. Chuyến có quá cảnh ở Moskva."
      },
      {
        "ru": "Объявление: «Регистрация на рейс закончится через 30 минут».",
        "vi": "Thông báo: «Làm thủ tục lên máy bay sẽ kết thúc sau 30 phút»."
      },
      {
        "ru": "Стюардесса говорит: «Пристегните ремни, пожалуйста».",
        "vi": "Tiếp viên nói: «Xin vui lòng thắt dây an toàn»."
      },
      {
        "ru": "Аня смотрит в окно и думает: «Скоро я в России!»",
        "vi": "Anya nhìn ra cửa sổ và nghĩ: «Sắp tới Nga rồi!»"
      }
    ],
    "words": [
      {
        "ru": "самолёт",
        "vi": "máy bay",
        "note": "danh từ nam"
      },
      {
        "ru": "аэропорт",
        "vi": "sân bay",
        "note": "danh từ nam"
      },
      {
        "ru": "стюардесса",
        "vi": "tiếp viên hàng không",
        "note": "danh từ nữ"
      },
      {
        "ru": "регистрация",
        "vi": "thủ tục check-in",
        "note": "danh từ nữ"
      },
      {
        "ru": "посадочный талон",
        "vi": "thẻ lên máy bay",
        "note": "boarding pass"
      },
      {
        "ru": "багаж",
        "vi": "hành lý ký gửi",
        "note": "danh từ nam"
      },
      {
        "ru": "ручная кладь",
        "vi": "hành lý xách tay",
        "note": "carry-on"
      },
      {
        "ru": "паспортный контроль",
        "vi": "kiểm tra hộ chiếu",
        "note": "immigration"
      },
      {
        "ru": "пересадка",
        "vi": "quá cảnh, chuyển tuyến",
        "note": "transfer"
      },
      {
        "ru": "объявление",
        "vi": "thông báo (loa)",
        "note": "announcement"
      }
    ],
    "quiz": [
      {
        "q": "«пересадка» nghĩa là gì?",
        "options": [
          "xuất cảnh",
          "quá cảnh",
          "nhập cảnh",
          "làm thủ tục"
        ],
        "a": 1
      },
      {
        "q": "«ручная кладь» là gì?",
        "options": [
          "Hành lý ký gửi",
          "Hành lý xách tay",
          "Thẻ lên máy bay",
          "Hộ chiếu"
        ],
        "a": 1
      },
      {
        "ru": "Пристегните ___, пожалуйста.",
        "q": "Chọn từ đúng: Пристегните ___, пожалуйста. (Xin thắt dây an toàn)",
        "options": [
          "ремни",
          "багаж",
          "место",
          "талон"
        ],
        "a": 0,
        "ex": "ремень = dây (an toàn)"
      },
      {
        "q": "Ai nói «Пристегните ремни»?",
        "options": [
          "Hải quan",
          "Tiếp viên hàng không",
          "Lễ tân",
          "Bác sĩ"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "ep3",
    "type": "series",
    "level": "A2",
    "ep": 3,
    "ru": "Первый день в университете",
    "vi": "Tập 3 — Ngày đầu nhập học",
    "scene": "graduation-cap",
    "story": "Anya tới trường, làm thủ tục vào ký túc xá, khám sức khỏe và nhận thời khóa biểu.",
    "script": [
      {
        "ru": "Сегодня Аня первый раз в университете. Она немного волнуется.",
        "vi": "Hôm nay Anya lần đầu tới trường. Cô hơi lo lắng."
      },
      {
        "ru": "Сначала она идёт в деканат и показывает документы.",
        "vi": "Đầu tiên cô tới phòng Dean (dekanat) và xuất trình giấy tờ."
      },
      {
        "ru": "Потом она идёт в общежитие. Комната маленькая, но уютная.",
        "vi": "Sau đó cô tới ký túc xá. Phòng nhỏ nhưng ấm cúng."
      },
      {
        "ru": "Завтра медосмотр: нужно сдать кровь и сделать рентген.",
        "vi": "Mai khám sức khỏe: cần lấy máu và chụp X-quang phổi."
      },
      {
        "ru": "Ещё нужна медицинская страховка. Её делают в первый день.",
        "vi": "Còn cần bảo hiểm y tế nữa. Họ làm nó vào ngày đầu."
      },
      {
        "ru": "Вечером Аня знакомится с соседкой по комнате.",
        "vi": "Tối đến Anya làm quen với bạn cùng phòng."
      },
      {
        "ru": "«Привет! Меня зовут Аня. Теперь мы соседи!»",
        "vi": "«Chào bạn! Mình tên Anya. Giờ chúng ta là hàng xóm rồi!»"
      }
    ],
    "words": [
      {
        "ru": "университет",
        "vi": "trường đại học",
        "note": "danh từ nam"
      },
      {
        "ru": "общежитие",
        "vi": "ký túc xá",
        "note": "danh từ trung"
      },
      {
        "ru": "медосмотр",
        "vi": "khám sức khỏe",
        "note": "medical check-up"
      },
      {
        "ru": "сдавать кровь",
        "vi": "lấy máu",
        "note": "làm xét nghiệm máu"
      },
      {
        "ru": "рентген",
        "vi": "chụp X-quang (phổi)",
        "note": "danh từ nam"
      },
      {
        "ru": "медицинская страховка",
        "vi": "bảo hiểm y tế",
        "note": "danh từ nữ"
      },
      {
        "ru": "деканат",
        "vi": "phòng dekanat (giáo vụ)",
        "note": "danh từ nam"
      },
      {
        "ru": "документы",
        "vi": "giấy tờ",
        "note": "số nhiều"
      },
      {
        "ru": "расписание",
        "vi": "thời khóa biểu",
        "note": "danh từ trung"
      },
      {
        "ru": "сосед / соседка",
        "vi": "bạn cùng phòng (nam/nữ)",
        "note": "neighbor"
      }
    ],
    "quiz": [
      {
        "q": "«общежитие» nghĩa là gì?",
        "options": [
          "Giảng đường",
          "Ký túc xá",
          "Thư viện",
          "Bệnh viện"
        ],
        "a": 1
      },
      {
        "q": "«медосмотр» nghĩa là gì?",
        "options": [
          "Khám sức khỏe",
          "Học kỳ",
          "Thời khóa biểu",
          "Hợp đồng"
        ],
        "a": 0
      },
      {
        "ru": "Нужно ___ кровь.",
        "q": "Chọn từ đúng: Нужно ___ кровь. (cần lấy máu)",
        "options": [
          "сдавать",
          "давать",
          "брать",
          "ехать"
        ],
        "a": 0,
        "ex": "сдавать кровь = lấy máu (xét nghiệm)"
      },
      {
        "q": "Ở đâu Anya xuất trình giấy tờ?",
        "options": [
          "Ở ký túc xá",
          "Ở dekanat",
          "Ở sân bay",
          "Ở bệnh viện"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "sport",
    "type": "topic",
    "level": "A1",
    "ru": "Спорт",
    "vi": "Chủ đề — Thể thao",
    "scene": "activity",
    "story": "Buổi chiều chơi bóng chuyền cùng bạn mới — học từ vựng qua chuỗi hành động.",
    "script": [
      {
        "ru": "После занятий мы идём на площадку играть в волейбол.",
        "vi": "Sau giờ học chúng tôi ra sân chơi bóng chuyền."
      },
      {
        "ru": "Мяч летит высоко. Я прыгаю и бью по мячу.",
        "vi": "Quả bóng bay cao. Tôi nhảy lên và đánh bóng."
      },
      {
        "ru": "Мой друг подаёт, а я пасую.",
        "vi": "Bạn tôi phát bóng, còn tôi chuyền bóng."
      },
      {
        "ru": "Мяч в сетке! Как жалко!",
        "vi": "Bóng vào lưới rồi! Tiếc quá!"
      },
      {
        "ru": "Последний гол — и наша команда побеждает!",
        "vi": "Bàn thắng cuối cùng — và đội của chúng tôi thắng!"
      },
      {
        "ru": "Мы бегаем, прыгаем и смеёмся. Это отличная тренировка!",
        "vi": "Chúng tôi chạy, cười. Một buổi tập tuyệt vời!"
      }
    ],
    "words": [
      {
        "ru": "спорт",
        "vi": "thể thao",
        "note": "danh từ nam"
      },
      {
        "ru": "футбол",
        "vi": "bóng đá",
        "note": "играть в футбол"
      },
      {
        "ru": "волейбол",
        "vi": "bóng chuyền",
        "note": "играть в волейбол"
      },
      {
        "ru": "мяч",
        "vi": "quả bóng",
        "note": "danh từ nam"
      },
      {
        "ru": "команда",
        "vi": "đội, đội bóng",
        "note": "danh từ nữ"
      },
      {
        "ru": "тренировка",
        "vi": "buổi tập",
        "note": "danh từ nữ"
      },
      {
        "ru": "прыгать / прыгнуть",
        "vi": "nhảy",
        "note": "chưa HT / hoàn thành"
      },
      {
        "ru": "побеждать / победить",
        "vi": "thắng",
        "note": "chưa HT / hoàn thành"
      },
      {
        "ru": "гол",
        "vi": "bàn thắng",
        "note": "danh từ nam"
      },
      {
        "ru": "бегать",
        "vi": "chạy (nhiều lần)",
        "note": "động từ chuyển động"
      }
    ],
    "quiz": [
      {
        "q": "«мяч» nghĩa là gì?",
        "options": [
          "bàn thắng",
          "quả bóng",
          "đội bóng",
          "sân chơi"
        ],
        "a": 1
      },
      {
        "ru": "Мы играем в ___.",
        "q": "Chọn từ đúng: Мы играем в ___. (chúng tôi chơi bóng chuyền)",
        "options": [
          "волейбол",
          "волейболе",
          "волейболу",
          "волейболом"
        ],
        "a": 0,
        "ex": "играть В + cách 4: играть в волейбол"
      },
      {
        "q": "«команда побеждает» nghĩa là gì?",
        "options": [
          "Đội thua",
          "Đội thắng",
          "Đội tập luyện",
          "Đội bắt đầu"
        ],
        "a": 1
      },
      {
        "ru": "Мяч летит ___.",
        "q": "Chọn từ đúng: Мяч летит ___. (bóng bay cao)",
        "options": [
          "высоко",
          "высокий",
          "высота",
          "выше"
        ],
        "a": 0,
        "ex": "высоко = trạng từ «cao»"
      }
    ]
  },
  {
    "id": "food",
    "type": "topic",
    "level": "A1",
    "ru": "Готовим обед",
    "vi": "Chủ đề — Ăn uống, nấu ăn",
    "scene": "utensils",
    "story": "Anya học nấu món súp đầu tiên trong căn bếp nhỏ của ký túc xá.",
    "script": [
      {
        "ru": "Утром я готовлю завтрак: хлеб с сыром и чай с молоком.",
        "vi": "Buổi sáng tôi nấu bữa sáng: bánh mì với phô mai và trà sữa."
      },
      {
        "ru": "Я режу хлеб и кладу сыр на хлеб.",
        "vi": "Tôi cắt bánh mì và đặt phô mai lên trên."
      },
      {
        "ru": "Вечером мы с соседкой готовим суп.",
        "vi": "Buổi tối tôi và bạn cùng phòng nấu súp."
      },
      {
        "ru": "Сначала чистим картошку и режем её. Потом варим.",
        "vi": "Đầu tiên gọt khoai tây và cắt nhỏ. Sau đó luộc."
      },
      {
        "ru": "Не забудь соль! Без соли суп невкусный.",
        "vi": "Đừng quên muối! Súp không có muối thì nhạt lắm."
      },
      {
        "ru": "Готово! Как вкусно! За обедом мы говорим о доме.",
        "vi": "Xong rồi! Ngon quá! Trong bữa ăn chúng tôi kể chuyện về nhà."
      }
    ],
    "words": [
      {
        "ru": "готовить / приготовить",
        "vi": "nấu, chuẩn bị",
        "note": "chưa HT / hoàn thành"
      },
      {
        "ru": "завтрак / обед / ужин",
        "vi": "bữa sáng / trưa / tối",
        "note": "3 bữa chính"
      },
      {
        "ru": "хлеб",
        "vi": "bánh mì",
        "note": "danh từ nam"
      },
      {
        "ru": "сыр",
        "vi": "phô mai",
        "note": "danh từ nam"
      },
      {
        "ru": "молоко",
        "vi": "sữa",
        "note": "danh từ trung"
      },
      {
        "ru": "суп",
        "vi": "súp, canh",
        "note": "danh từ nam"
      },
      {
        "ru": "соль",
        "vi": "muối",
        "note": "danh từ nữ"
      },
      {
        "ru": "вкусно",
        "vi": "ngon",
        "note": "trạng từ"
      },
      {
        "ru": "резать",
        "vi": "cắt",
        "note": "động từ"
      },
      {
        "ru": "пить чай",
        "vi": "uống trà",
        "note": "пить + cách 4"
      }
    ],
    "quiz": [
      {
        "q": "«хлеб» nghĩa là gì?",
        "options": [
          "bánh mì",
          "phô mai",
          "sữa",
          "muối"
        ],
        "a": 0
      },
      {
        "ru": "Я пью чай ___ молоком.",
        "q": "Chọn cách đúng: Я пью чай ___ молоком. (trà với sữa)",
        "options": [
          "с",
          "в",
          "на",
          "по"
        ],
        "a": 0,
        "ex": "«với» + cách 5 (Творительный): с молоком"
      },
      {
        "q": "«без соли суп невкусный» nghĩa là gì?",
        "options": [
          "Súp ngon",
          "Súp mặn",
          "Súp không muối thì nhạt",
          "Cần thêm muối ngay"
        ],
        "a": 2
      },
      {
        "q": "Bữa tối tiếng Nga là gì?",
        "options": [
          "завтрак",
          "обед",
          "ужин",
          "полдник"
        ],
        "a": 2
      }
    ]
  },
  {
    "id": "shop",
    "type": "topic",
    "level": "A2",
    "ru": "В магазине",
    "vi": "Chủ đề — Mua sắm",
    "scene": "shopping-cart",
    "story": "Cuối tuần Anya ra siêu thị mua đồ ăn cho cả tuần.",
    "script": [
      {
        "ru": "В субботу я иду в магазин недалеко от общежития.",
        "vi": "Thứ bảy tôi đi siêu thị gần ký túc xá."
      },
      {
        "ru": "Я беру корзину и иду по отделам.",
        "vi": "Tôi lấy một chiếc giỏ và đi qua các quầy."
      },
      {
        "ru": "Я покупаю хлеб, молоко, сыр и яблоки.",
        "vi": "Tôi mua bánh mì, sữa, phô mai và táo."
      },
      {
        "ru": "Хлеб стоит 50 рублей. Это дёшево!",
        "vi": "Bánh mì giá 50 rúp. Rẻ quá!"
      },
      {
        "ru": "Яблоки дорогие, но очень вкусные.",
        "vi": "Táo đắt, nhưng rất ngon."
      },
      {
        "ru": "На кассе я плачу и кладу продукты в пакет.",
        "vi": "Ở quầy thu ngân tôi thanh toán và bỏ đồ vào túi."
      }
    ],
    "words": [
      {
        "ru": "магазин",
        "vi": "cửa hàng, siêu thị",
        "note": "danh từ nam"
      },
      {
        "ru": "покупать / купить",
        "vi": "mua",
        "note": "chưa HT / hoàn thành"
      },
      {
        "ru": "деньги",
        "vi": "tiền",
        "note": "luôn số nhiều"
      },
      {
        "ru": "платить / заплатить",
        "vi": "trả tiền",
        "note": "платить за что-то"
      },
      {
        "ru": "цена",
        "vi": "giá",
        "note": "danh từ nữ"
      },
      {
        "ru": "дорого / дёшево",
        "vi": "đắt / rẻ",
        "note": "trạng từ"
      },
      {
        "ru": "касса",
        "vi": "quầy thanh toán",
        "note": "danh từ nữ"
      },
      {
        "ru": "пакет",
        "vi": "túi ni-lông",
        "note": "danh từ nam"
      },
      {
        "ru": "корзина",
        "vi": "giỏ hàng",
        "note": "danh từ nữ"
      },
      {
        "ru": "стоит",
        "vi": "giá... (đáng giá)",
        "note": "Сколько стоит?"
      }
    ],
    "quiz": [
      {
        "q": "«Сколько стоит хлеб?» nghĩa là gì?",
        "options": [
          "Bánh mì ở đâu?",
          "Bánh mì giá bao nhiêu?",
          "Bánh mì ngon không?",
          "Mua bánh mì nhé?"
        ],
        "a": 1
      },
      {
        "ru": "Я ___ хлеб и молоко.",
        "q": "Chọn từ đúng: Я ___ хлеб и молоко. (tôi mua bánh mì và sữa)",
        "options": [
          "покупаю",
          "плачу",
          "стою",
          "иду"
        ],
        "a": 0,
        "ex": "покупать = mua; платить = trả tiền"
      },
      {
        "q": "«дёшево» nghĩa là gì?",
        "options": [
          "Đắt",
          "Rẻ",
          "Giảm giá",
          "Miễn phí"
        ],
        "a": 1
      },
      {
        "ru": "Я плачу ___ кассе.",
        "q": "Chọn giới từ đúng: Я плачу ___ кассе. (tôi thanh toán ở quầy)",
        "options": [
          "на",
          "в",
          "о",
          "за"
        ],
        "a": 0,
        "ex": "на кассе — cách 6, nơi chốn"
      }
    ]
  },
  {
    "id": "ep4",
    "type": "series",
    "level": "B1",
    "ep": 4,
    "ru": "В поликлинике и аптеке",
    "vi": "Tập 4 — Khám bệnh & Mua thuốc",
    "scene": "building-2",
    "story": "Mùa đông tuyết rơi, Anya bị cảm sốt và đến phòng khám sinh viên khám, sau đó ra hiệu thuốc mua thuốc theo đơn.",
    "script": [
      {
        "ru": "На улице мороз минус двадцать градусов. Аня простудилась.",
        "vi": "Ngoài trời rét âm 20 độ. Anya bị cảm lạnh."
      },
      {
        "ru": "У неё высокая температура, болит горло и сильный кашель.",
        "vi": "Cô bị sốt cao, đau họng và ho nhiều."
      },
      {
        "ru": "Она берёт студенческий полис и идёт в поликлинику к терапевту.",
        "vi": "Cô cầm thẻ bảo hiểm y tế sinh viên và tới phòng khám gặp bác sĩ đa khoa."
      },
      {
        "ru": "Врач слушает лёгкие и выписывает рецепт на антибиотики и сироп.",
        "vi": "Bác sĩ nghe phổi và kê đơn thuốc kháng sinh cùng si-rô ho."
      },
      {
        "ru": "В аптеке фармацевт объясняет, как принимать лекарство: два раза в день после еды.",
        "vi": "Ở hiệu thuốc, dược sĩ hướng dẫn cách uống thuốc: 2 lần mỗi ngày sau ăn."
      },
      {
        "ru": "Через три дня Ане стало намного лучше!",
        "vi": "Sau ba ngày, Anya đã đỡ hơn rất nhiều!"
      }
    ],
    "words": [
      {
        "ru": "простудиться",
        "vi": "bị cảm lạnh",
        "note": "động từ hoàn thành thể"
      },
      {
        "ru": "температура",
        "vi": "nhiệt độ, sốt",
        "note": "высокая температура = sốt cao"
      },
      {
        "ru": "болеть",
        "vi": "bị đau / ốm",
        "note": "у меня болит голова/горло"
      },
      {
        "ru": "терапевт",
        "vi": "bác sĩ nội khoa",
        "note": "danh từ nam"
      },
      {
        "ru": "выписать рецепт",
        "vi": "kê đơn thuốc",
        "note": "cụm động từ"
      },
      {
        "ru": "аптека",
        "vi": "hiệu thuốc",
        "note": "danh từ nữ"
      },
      {
        "ru": "лекарство",
        "vi": "thuốc men",
        "note": "danh từ trung"
      },
      {
        "ru": "принимать лекарство",
        "vi": "uống thuốc",
        "note": "принимать два раза в день"
      },
      {
        "ru": "выздороветь",
        "vi": "khỏi bệnh",
        "note": "động từ hoàn thành thể"
      },
      {
        "ru": "кашель / насморк",
        "vi": "cơn ho / sổ mũi",
        "note": "triệu chứng cảm lạnh"
      }
    ],
    "quiz": [
      {
        "q": "«болит горло» nghĩa là gì?",
        "options": [
          "đau bụng",
          "đau họng",
          "đau đầu",
          "đau chân"
        ],
        "a": 1
      },
      {
        "q": "«выписать рецепт» là hành động của ai?",
        "options": [
          "bệnh nhân",
          "bác sĩ",
          "dược sĩ",
          "lễ tân"
        ],
        "a": 1
      },
      {
        "ru": "Нужно принимать лекарство два раза в день ___ еды.",
        "q": "Điền giới từ đúng: ... ___ еды. (sau bữa ăn)",
        "options": [
          "после",
          "до",
          "во время",
          "без"
        ],
        "a": 0,
        "ex": "после + cách 2: sau khi..."
      },
      {
        "q": "Anya đi đâu mua thuốc?",
        "options": [
          "В магазин",
          "В аптеку",
          "В деканат",
          "В библиотеку"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "ep5",
    "type": "series",
    "level": "B1",
    "ep": 5,
    "ru": "Оформление визы и регистрации",
    "vi": "Tập 5 — Gia hạn Visa & Thủ tục cư trú",
    "scene": "graduation-cap",
    "story": "Hết hạn visa 90 ngày, Anya lên phòng quan hệ quốc tế làm thủ tục gia hạn visa du học 1 năm và đăng ký tạm trú.",
    "script": [
      {
        "ru": "Первая учебная виза выдаётся только на девяносто дней.",
        "vi": "Thị thực du học ban đầu chỉ có giá trị 90 ngày."
      },
      {
        "ru": "Аня идёт в отдел международных связей университета.",
        "vi": "Anya đến phòng hợp tác quốc tế của trường."
      },
      {
        "ru": "Инспектор проверяет миграционную карту, паспорт и договор на обучение.",
        "vi": "Chuyên viên kiểm tra tờ khai di trú, hộ chiếu và hợp đồng đào tạo."
      },
      {
        "ru": "Нужно оплатить госпошлину за многократную визу в банке.",
        "vi": "Cần nộp lệ phí nhà nước cho thị thực nhiều lần tại ngân hàng."
      },
      {
        "ru": "Через две недели Аня получает паспорт с новой годовой визой.",
        "vi": "Sau hai tuần, Anya nhận lại hộ chiếu với visa mới thời hạn 1 năm."
      },
      {
        "ru": "Теперь она может спокойно учиться и путешествовать по России!",
        "vi": "Giờ cô có thể yên tâm học tập và du lịch khắp nước Nga!"
      }
    ],
    "words": [
      {
        "ru": "виза",
        "vi": "thị thực, visa",
        "note": "учебная виза = visa du học"
      },
      {
        "ru": "регистрация",
        "vi": "đăng ký tạm trú",
        "note": "thủ tục bắt buộc tại Nga"
      },
      {
        "ru": "миграционная карта",
        "vi": "tờ khai xuất nhập cảnh",
        "note": "cần giữ cẩn thận"
      },
      {
        "ru": "продление",
        "vi": "sự gia hạn",
        "note": "продление визы"
      },
      {
        "ru": "госпошлина",
        "vi": "lệ phí nhà nước",
        "note": "nộp qua ngân hàng Sber"
      },
      {
        "ru": "многократная виза",
        "vi": "visa nhiều lần",
        "note": "cho phép xuất nhập cảnh tự do"
      },
      {
        "ru": "паспортный стол",
        "vi": "bộ phận quản lý cư trú",
        "note": "tại ký túc xá hoặc trường"
      },
      {
        "ru": "срок действия",
        "vi": "thời hạn hiệu lực",
        "note": "hạn sử dụng của visa"
      }
    ],
    "quiz": [
      {
        "q": "«многократная виза» cho phép điều gì?",
        "options": [
          "Chỉ nhập cảnh 1 lần",
          "Xuất nhập cảnh nhiều lần",
          "Không cần hộ chiếu",
          "Miễn thị thực"
        ],
        "a": 1
      },
      {
        "q": "«госпошлина» là gì?",
        "options": [
          "Lệ phí nhà nước",
          "Học phí",
          "Tiền ký túc xá",
          "Tiền bảo hiểm"
        ],
        "a": 0
      },
      {
        "q": "Tờ giấy nào được phát khi nhập cảnh ở sân bay Nga?",
        "options": [
          "Thẻ sinh viên",
          "Миграционная карта",
          "Bằng tốt nghiệp",
          "Hóa đơn"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "culture",
    "type": "topic",
    "level": "B2",
    "ru": "Русский балет и Большой театр",
    "vi": "Chủ đề — Nghệ thuật & Nhà hát Bolshoi",
    "scene": "film",
    "story": "Khám phá cái nôi của nghệ thuật kinh điển Nga: từ vở ba lê Hồ Thiên Nga đến kiến trúc tráng lệ của Nhà hát Lớn Moskva.",
    "script": [
      {
        "ru": "Большой театр — один из старейших и самых знаменитых театров оперы и балета в мире.",
        "vi": "Nhà hát Lớn là một trong những nhà hát opera và ballet cổ kính và nổi tiếng nhất thế giới."
      },
      {
        "ru": "Здание театра украшает знаменитая квадрига Аполлона скульптора Клодта.",
        "vi": "Tòa nhà nhà hát được trang trí bởi cỗ xe tứ mã nổi tiếng của thần Apollo do nhà điêu khắc Klodt tạo tác."
      },
      {
        "ru": "Сегодня дают балет Петра Ильича Чайковского «Лебединое озеро».",
        "vi": "Hôm nay công diễn vở múa ba lê «Hồ thiên nga» của Pyotr Ilyich Tchaikovsky."
      },
      {
        "ru": "Зрители в вечерних нарядах занимают места в партере и ложах.",
        "vi": "Khán giả trong trang phục dạ hội trang trọng ngồi vào ghế ở tầng trệt và các khán phòng riêng."
      },
      {
        "ru": "Великолепная музыка оркестра и грация балерин вызывают бурные аплодисменты.",
        "vi": "Âm nhạc tuyệt mỹ của dàn nhạc giao hưởng và nét duyên dáng của các vũ công tạo nên tràng pháo tay vang dội."
      },
      {
        "ru": "В антракте посетители прогуливаются по залам и пьют кофе в буфете.",
        "vi": "Trong giờ giải lao, du khách dạo bước quanh các đại sảnh và thưởng thức cà phê tại quầy trà."
      }
    ],
    "words": [
      {
        "ru": "балет",
        "vi": "vở ba-lê",
        "note": "nghệ thuật múa cổ điển Nga"
      },
      {
        "ru": "партер",
        "vi": "tầng trệt rạp hát",
        "note": "vị trí hàng ghế chính"
      },
      {
        "ru": "ложа",
        "vi": "khán phòng riêng",
        "note": "danh từ nữ"
      },
      {
        "ru": "антракт",
        "vi": "giờ nghỉ giữa hiệp",
        "note": "giải lao trong kịch"
      },
      {
        "ru": "аплодисменты",
        "vi": "tràng vỗ tay",
        "note": "danh từ số nhiều"
      },
      {
        "ru": "оркестр",
        "vi": "dàn nhạc giao hưởng",
        "note": "danh từ nam"
      },
      {
        "ru": "премьера",
        "vi": "buổi công chiếu đầu tiên",
        "note": "danh từ nữ"
      },
      {
        "ru": "восторженный",
        "vi": "hào hứng, say mê",
        "note": "tính từ"
      }
    ],
    "quiz": [
      {
        "q": "Ai sáng tác vở ba-lê «Лебединое озеро»?",
        "options": [
          "П. И. Чайковский",
          "А. С. Пушкин",
          "Л. Н. Толстой",
          "С. В. Рахманинов"
        ],
        "a": 0
      },
      {
        "q": "«антракт» trong rạp hát là gì?",
        "options": [
          "Màn mở đầu",
          "Giờ giải lao giữa các hồi",
          "Buổi biểu diễn lại",
          "Vé mời"
        ],
        "a": 1
      },
      {
        "q": "«партер» là vị trí nào?",
        "options": [
          "Hàng ghế dưới mặt sàn rạp",
          "Trên ban công cao nhất",
          "Hậu trường",
          "Sân khấu"
        ],
        "a": 0
      }
    ]
  },
  {
    "id": "career",
    "type": "topic",
    "level": "B2",
    "ru": "Собеседование и резюме",
    "vi": "Chủ đề — Phỏng vấn & Hồ sơ việc làm",
    "scene": "briefcase",
    "story": "Kinh nghiệm phỏng vấn tuyển dụng, viết резюме chuẩn Nga và đàm phán hợp đồng lao động tại các tập đoàn quốc tế.",
    "script": [
      {
        "ru": "Перед собеседованием важно грамотно составить резюме на русском языке.",
        "vi": "Trước buổi phỏng vấn, điều cốt yếu là soạn thảo một bản CV chuẩn mực bằng tiếng Nga."
      },
      {
        "ru": "В резюме указывают образование, опыт работы, ключевые навыки и знание языков.",
        "vi": "Trong CV nêu rõ học vấn, kinh nghiệm công tác, kỹ năng trọng tâm và trình độ ngoại ngữ."
      },
      {
        "ru": "Рекрутер задаёт вопросы о ваших профессиональных достижениях и сильных сторонах.",
        "vi": "Nhà tuyển dụng đặt câu hỏi về thành tựu chuyên môn và thế mạnh của bạn."
      },
      {
        "ru": "«Почему вы хотите работать именно в нашей IT-компании?» — стандартный вопрос.",
        "vi": "«Vì sao bạn muốn cống hiến cho công ty công nghệ của chúng tôi?» — một câu hỏi điển hình."
      },
      {
        "ru": "Кандидат уверенно рассказывает о своих успешных проектах и готовности развиваться.",
        "vi": "Ứng viên tự tin thuyết minh về những dự án thành công và tinh thần học hỏi."
      },
      {
        "ru": "После встречи стороны обсуждают испытательный срок и уровень заработной платы.",
        "vi": "Sau cuộc trao đổi, hai bên thảo luận về thời gian thử việc và mức lương đãi ngộ."
      }
    ],
    "words": [
      {
        "ru": "собеседование",
        "vi": "buổi phỏng vấn xin việc",
        "note": "danh từ trung"
      },
      {
        "ru": "резюме",
        "vi": "sơ yếu lý lịch, CV",
        "note": "không biến cách"
      },
      {
        "ru": "вакансия",
        "vi": "vị trí tuyển dụng còn trống",
        "note": "danh từ nữ"
      },
      {
        "ru": "работодатель",
        "vi": "nhà tuyển dụng",
        "note": "danh từ nam"
      },
      {
        "ru": "испытательный срок",
        "vi": "thời gian thử việc",
        "note": "thường là 3 tháng"
      },
      {
        "ru": "заработная плата",
        "vi": "tiền lương (зарплата)",
        "note": "danh từ nữ"
      },
      {
        "ru": "навык",
        "vi": "kỹ năng",
        "note": "профессиональные навыки"
      },
      {
        "ru": "достижение",
        "vi": "thành tích, thành tựu",
        "note": "danh từ trung"
      }
    ],
    "quiz": [
      {
        "q": "«резюме» trong ngữ cảnh tìm việc là gì?",
        "options": [
          "Đơn xin nghỉ phép",
          "CV / Sơ yếu lý lịch ứng tuyển",
          "Hợp đồng thuê nhà",
          "Bằng lái xe"
        ],
        "a": 1
      },
      {
        "q": "«испытательный срок» nghĩa là gì?",
        "options": [
          "Thời gian thử việc",
          "Hạn nộp hồ sơ",
          "Giờ làm thêm",
          "Kỳ nghỉ phép năm"
        ],
        "a": 0
      },
      {
        "ru": "Кандидат успешно прошёл ___.",
        "q": "Điền từ đúng: ... прошёл ___. (vượt qua buổi phỏng vấn)",
        "options": [
          "собеседование",
          "билет",
          "чемодан",
          "вокзал"
        ],
        "a": 0
      }
    ]
  }
];

const MOCK_TEST = {
  "title": "Đề thi thử ТРКИ ТЭУ (Trình độ sơ cấp)",
  "durationMin": 45,
  "passPercent": 60,
  "parts": [
    {
      "id": "gram",
      "name": "Часть 1. Лексика и грамматика",
      "vi": "Phần 1. Từ vựng và ngữ pháp",
      "questions": [
        {
          "q": "Вот ___. (словарь)",
          "options": [
            "словарь",
            "словаря",
            "словаре",
            "словару"
          ],
          "a": 0,
          "ex": "Вот + cách 1 (dạng gốc)."
        },
        {
          "q": "Я студент. ___ зовут Антон.",
          "options": [
            "Меня",
            "Мне",
            "Мой",
            "Я"
          ],
          "a": 0,
          "ex": "Меня зовут... = tên tôi là..."
        },
        {
          "q": "Антон живёт в ___. (общежитие)",
          "options": [
            "общежитие",
            "общежитии",
            "общежитию",
            "общежития"
          ],
          "a": 1,
          "ex": "в + cách 6: -ие → -ии."
        },
        {
          "q": "Я читаю ___. (книга)",
          "options": [
            "книга",
            "книгу",
            "книге",
            "книги"
          ],
          "a": 1,
          "ex": "Cách 4, nữ -а → -у."
        },
        {
          "q": "Вчера мы ___ в кино.",
          "options": [
            "ходим",
            "ходили",
            "пришли",
            "заходили"
          ],
          "a": 1,
          "ex": "Quá khứ НСВ của ходить → ходили."
        },
        {
          "q": "Студент ___ домашнее задание.",
          "options": [
            "делает",
            "даёт",
            "играет",
            "стоит"
          ],
          "a": 0,
          "ex": "делать задание = làm bài tập."
        },
        {
          "q": "У ___ есть брат.",
          "options": [
            "я",
            "меня",
            "мне",
            "мой"
          ],
          "a": 1,
          "ex": "У + cách 2 (меня): у меня есть."
        },
        {
          "q": "Сколько ___ этот телефон?",
          "options": [
            "стоит",
            "стоят",
            "стоил",
            "стоять"
          ],
          "a": 0,
          "ex": "Сколько стоит + danh từ số ít?"
        },
        {
          "q": "Мы ___ в Москву на поезде.",
          "options": [
            "идём",
            "едем",
            "плывём",
            "бежим"
          ],
          "a": 1,
          "ex": "Tàu hỏa → ехать."
        },
        {
          "q": "Вчера я ___ хлеб и молоко.",
          "options": [
            "куплю",
            "купил",
            "покупаю",
            "покупаю бы"
          ],
          "a": 1,
          "ex": "Quá khứ kết quả → СВ: купил."
        },
        {
          "q": "Сестра работает в ___. (больница)",
          "options": [
            "больница",
            "больнице",
            "больницу",
            "больницы"
          ],
          "a": 1,
          "ex": "в + cách 6: -а → -е."
        },
        {
          "q": "Анна любит ___ кофе утром.",
          "options": [
            "пить",
            "пьёт",
            "пьют",
            "пил"
          ],
          "a": 0,
          "ex": "любить + НСВ nguyên mẫu."
        }
      ]
    },
    {
      "id": "reading",
      "name": "Часть 2. Чтение",
      "vi": "Phần 2. Đọc hiểu",
      "text": {
        "ru": "Меня зовут Хай. Я студент из Вьетнама. Сейчас я живу в России, в Москве. Я учусь в университете на первом курсе. Я живу в общежитии. Комната небольшая, но удобная. Утром я встаю в семь часов, завтракаю и иду в университет. После занятий я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю русские фильмы. По субботам я играю в волейбол с друзьями. Мне нравится жизнь в Москве!",
        "vi": "Tôi tên là Hải. Tôi là sinh viên người Việt Nam. Hiện tôi đang sống ở Nga, tại Moskva. Tôi học năm nhất ở trường đại học. Tôi sống ở ký túc xá. Phòng không rộng lắm nhưng tiện nghi. Buổi sáng tôi dậy lúc 7 giờ, ăn sáng rồi đi bộ tới trường. Buổi chiều tôi học ở thư viện. Buổi tối tôi nấu bữa tối và xem phim Nga. Thứ bảy tôi chơi bóng chuyền với bạn. Tôi thích cuộc sống ở Moskva!"
      },
      "questions": [
        {
          "q": "Откуда Хай?",
          "options": [
            "Из Китая",
            "Из Вьетнама",
            "Из России",
            "Из Кореи"
          ],
          "a": 1,
          "ex": "«Я студент из Вьетнама»."
        },
        {
          "q": "Где живёт Хай?",
          "options": [
            "В гостинице",
            "В общежитии",
            "Дома",
            "У друзей"
          ],
          "a": 1,
          "ex": "«Я живу в общежитии»."
        },
        {
          "q": "Когда Хай встаёт?",
          "options": [
            "В шесть часов",
            "В семь часов",
            "В восемь часов",
            "В девять часов"
          ],
          "a": 1,
          "ex": "«Я встаю в семь часов»."
        },
        {
          "q": "Где Хай занимается днём?",
          "options": [
            "В общежитии",
            "Дома",
            "В библиотеке",
            "В магазине"
          ],
          "a": 2,
          "ex": "«Я занимаюсь в библиотеке»."
        },
        {
          "q": "Каким спортом Хай занимается по субботам?",
          "options": [
            "Футболом",
            "Теннисом",
            "Волейболом",
            "Плаванием"
          ],
          "a": 2,
          "ex": "«По субботам я играю в волейбол»."
        }
      ]
    },
    {
      "id": "listening",
      "name": "Часть 3. Аудирование",
      "vi": "Phần 3. Nghe hiểu (bấm để nghe)",
      "lines": [
        {
          "who": "Аня",
          "ru": "Извините, сколько стоит этот словарь?",
          "vi": ""
        },
        {
          "who": "Продавец",
          "ru": "Этот словарь стоит 300 рублей.",
          "vi": ""
        },
        {
          "who": "Аня",
          "ru": "Хорошо. А где русские книги?",
          "vi": ""
        },
        {
          "who": "Продавец",
          "ru": "Русские книги слева, на втором этаже.",
          "vi": ""
        },
        {
          "who": "Аня",
          "ru": "Спасибо большое!",
          "vi": ""
        },
        {
          "who": "Продавец",
          "ru": "Пожалуйста! Платите наверху, на кассе.",
          "vi": ""
        }
      ],
      "questions": [
        {
          "q": "Что хочет купить Аня?",
          "options": [
            "Книгу",
            "Словарь",
            "Хлеб",
            "Куртку"
          ],
          "a": 1,
          "ex": "«Сколько стоит этот словарь?»"
        },
        {
          "q": "Сколько стоит словарь?",
          "options": [
            "200 рублей",
            "250 рублей",
            "300 рублей",
            "350 рублей"
          ],
          "a": 2,
          "ex": "«Словарь стоит 300 рублей»."
        },
        {
          "q": "Где русские книги?",
          "options": [
            "Справа, на первом этаже",
            "Слева, на втором этаже",
            "В центре, на третьем этаже",
            "На кассе"
          ],
          "a": 1,
          "ex": "«Русские книги слева, на втором этаже»."
        },
        {
          "q": "Где Аня платит?",
          "options": [
            "Наверху, на кассе",
            "Дома",
            "В другом магазине",
            "В библиотеке"
          ],
          "a": 0,
          "ex": "«Платите наверху, на кассе»."
        }
      ]
    }
  ]
};

const BLOG_POSTS = [
  {
    "id": "post-3",
    "slug": "post-3",
    "title": "5 lỗi phát âm tiếng Nga của người Việt",
    "category": "du_hoc",
    "categoryName": "Du học",
    "cover": "assets/red-square.jpg",
    "excerpt": "Ы, р, мягкий знак — ba «hung thủ» quen thuộc. Dùng chế độ luyện nói của trang để AI chấm điểm từng câu và theo dõi tiến bộ.",
    "content": "Ы, р, мягкий знак — ba «hung thủ» quen thuộc. Dùng chế độ luyện nói của trang để AI chấm điểm từng câu và theo dõi tiến bộ.",
    "date": "Tháng 8, 2026",
    "icon": "🎙️",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  },
  {
    "id": "post-2",
    "slug": "post-2",
    "title": "Học từ vựng qua chuỗi hành động — vì sao hiệu quả?",
    "category": "du_hoc",
    "categoryName": "Du học",
    "cover": "assets/red-square.jpg",
    "excerpt": "Thay vì học «bánh mì» đơn lẻ, hãy học cả câu: «Я режу хлеб и кладу сыр на хлеб» — một câu có danh từ, động từ và giới từ cùng lúc.",
    "content": "Thay vì học «bánh mì» đơn lẻ, hãy học cả câu: «Я режу хлеб и кладу сыр на хлеб» — một câu có danh từ, động từ và giới từ cùng lúc.",
    "date": "Tháng 8, 2026",
    "icon": "🎬",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  },
  {
    "id": "post-1",
    "slug": "post-1",
    "title": "Lộ trình A1",
    "category": "Lộ trình",
    "categoryName": "Lộ trình",
    "cover": "assets/red-square.jpg",
    "excerpt": "Tháng 1: bảng chữ cái + từ vựng sống còn qua video series. Tháng 2: 6 cách + động từ chuyển động. Tháng 3: luyện đề mỗi tuần và sửa phát âm bằng AI.",
    "content": "Tháng 1: bảng chữ cái + từ vựng sống còn qua video series. Tháng 2: 6 cách + động từ chuyển động. Tháng 3: luyện đề mỗi tuần và sửa phát âm bằng AI.",
    "date": "Tháng 9, 2026",
    "icon": "🗺️",
    "author": "RUSI Editorial",
    "readTime": "5 phút đọc"
  }
];

const TRKI_BANK = [
  {
    "id": "trki_a1",
    "level": "A1",
    "levelName": "Sơ cấp A1 (ТЭУ)",
    "category": "full",
    "categoryName": "Đề thi toàn diện (3 phần)",
    "title": "Đề thi thử ТРКИ ТЭУ (Trình độ sơ cấp A1)",
    "durationMin": 45,
    "passPercent": 60,
    "is_pro_only": false,
    "icon": "🥉",
    "parts": [
      {
        "id": "gram",
        "vi": "Phần 1. Từ vựng và ngữ pháp",
        "name": "Часть 1. Лексика и грамматика",
        "questions": [
          {
            "a": 0,
            "q": "Вот ___. (словарь)",
            "ex": "Вот + cách 1 (dạng gốc).",
            "options": [
              "словарь",
              "словаря",
              "словаре",
              "словару"
            ]
          },
          {
            "a": 0,
            "q": "Я студент. ___ зовут Антон.",
            "ex": "Меня зовут... = tên tôi là...",
            "options": [
              "Меня",
              "Мне",
              "Мой",
              "Я"
            ]
          },
          {
            "a": 1,
            "q": "Антон живёт в ___. (общежитие)",
            "ex": "в + cách 6: -ие → -ии.",
            "options": [
              "общежитие",
              "общежитии",
              "общежитию",
              "общежития"
            ]
          },
          {
            "a": 1,
            "q": "Я читаю ___. (книга)",
            "ex": "Cách 4, nữ -а → -у.",
            "options": [
              "книга",
              "книгу",
              "книге",
              "книги"
            ]
          },
          {
            "a": 1,
            "q": "Вчера мы ___ в кино.",
            "ex": "Quá khứ НСВ của ходить → ходили.",
            "options": [
              "ходим",
              "ходили",
              "пришли",
              "заходили"
            ]
          },
          {
            "a": 0,
            "q": "Студент ___ домашнее задание.",
            "ex": "делать задание = làm bài tập.",
            "options": [
              "делает",
              "даёт",
              "играет",
              "стоит"
            ]
          },
          {
            "a": 1,
            "q": "У ___ есть брат.",
            "ex": "У + cách 2 (меня): у меня есть.",
            "options": [
              "я",
              "меня",
              "мне",
              "мой"
            ]
          },
          {
            "a": 0,
            "q": "Сколько ___ этот телефон?",
            "ex": "Сколько стоит + danh từ số ít?",
            "options": [
              "стоит",
              "стоят",
              "стоил",
              "стоять"
            ]
          },
          {
            "a": 1,
            "q": "Мы ___ в Москву на поезде.",
            "ex": "Tàu hỏa → ехать.",
            "options": [
              "идём",
              "едем",
              "плывём",
              "бежим"
            ]
          },
          {
            "a": 1,
            "q": "Вчера я ___ хлеб и молоко.",
            "ex": "Quá khứ kết quả → СВ: купил.",
            "options": [
              "куплю",
              "купил",
              "покупаю",
              "покупаю бы"
            ]
          },
          {
            "a": 1,
            "q": "Сестра работает в ___. (больница)",
            "ex": "в + cách 6: -а → -е.",
            "options": [
              "больница",
              "больнице",
              "больницу",
              "больницы"
            ]
          },
          {
            "a": 0,
            "q": "Анна любит ___ кофе утром.",
            "ex": "любить + НСВ nguyên mẫu.",
            "options": [
              "пить",
              "пьёт",
              "пьют",
              "пил"
            ]
          }
        ]
      },
      {
        "id": "reading",
        "vi": "Phần 2. Đọc hiểu",
        "name": "Часть 2. Чтение",
        "text": {
          "ru": "Меня зовут Хай. Я студент из Вьетнама. Сейчас я живу в России, в Москве. Я учусь в университете на первом курсе. Я живу в общежитии. Комната небольшая, но удобная. Утром я встаю в семь часов, завтракаю и иду в университет. После занятий я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю русские фильмы. По субботам я играю в волейбол с друзьями. Мне нравится жизнь в Москве!",
          "vi": "Tôi tên là Hải. Tôi là sinh viên người Việt Nam. Hiện tôi đang sống ở Nga, tại Moskva. Tôi học năm nhất ở trường đại học. Tôi sống ở ký túc xá. Phòng không rộng lắm nhưng tiện nghi. Buổi sáng tôi dậy lúc 7 giờ, ăn sáng rồi đi bộ tới trường. Buổi chiều tôi học ở thư viện. Buổi tối tôi nấu bữa tối và xem phim Nga. Thứ bảy tôi chơi bóng chuyền với bạn. Tôi thích cuộc sống ở Moskva!"
        },
        "questions": [
          {
            "a": 1,
            "q": "Откуда Хай?",
            "ex": "«Я студент из Вьетнама».",
            "options": [
              "Из Китая",
              "Из Вьетнама",
              "Из России",
              "Из Кореи"
            ]
          },
          {
            "a": 1,
            "q": "Где живёт Хай?",
            "ex": "«Я живу в общежитии».",
            "options": [
              "В гостинице",
              "В общежитии",
              "Дома",
              "У друзей"
            ]
          },
          {
            "a": 1,
            "q": "Когда Хай встаёт?",
            "ex": "«Я встаю в семь часов».",
            "options": [
              "В шесть часов",
              "В семь часов",
              "В восемь часов",
              "В девять часов"
            ]
          },
          {
            "a": 2,
            "q": "Где Хай занимается днём?",
            "ex": "«Я занимаюсь в библиотеке».",
            "options": [
              "В общежитии",
              "Дома",
              "В библиотеке",
              "В магазине"
            ]
          },
          {
            "a": 2,
            "q": "Каким спортом Хай занимается по субботам?",
            "ex": "«По субботам я играю в волейбол».",
            "options": [
              "Футболом",
              "Теннисом",
              "Волейболом",
              "Плаванием"
            ]
          }
        ]
      },
      {
        "id": "listening",
        "vi": "Phần 3. Nghe hiểu (bấm 🔊 để nghe)",
        "name": "Часть 3. Аудирование",
        "lines": [
          {
            "ru": "Извините, сколько стоит этот словарь?",
            "vi": "",
            "who": "Аня"
          },
          {
            "ru": "Этот словарь стоит 300 рублей.",
            "vi": "",
            "who": "Продавец"
          },
          {
            "ru": "Хорошо. А где русские книги?",
            "vi": "",
            "who": "Аня"
          },
          {
            "ru": "Русские книги слева, на втором этаже.",
            "vi": "",
            "who": "Продавец"
          },
          {
            "ru": "Спасибо большое!",
            "vi": "",
            "who": "Аня"
          },
          {
            "ru": "Пожалуйста! Платите наверху, на кассе.",
            "vi": "",
            "who": "Продавец"
          }
        ],
        "questions": [
          {
            "a": 1,
            "q": "Что хочет купить Аня?",
            "ex": "«Сколько стоит этот словарь?»",
            "options": [
              "Книгу",
              "Словарь",
              "Хлеб",
              "Куртку"
            ]
          },
          {
            "a": 2,
            "q": "Сколько стоит словарь?",
            "ex": "«Словарь стоит 300 рублей».",
            "options": [
              "200 рублей",
              "250 рублей",
              "300 рублей",
              "350 рублей"
            ]
          },
          {
            "a": 1,
            "q": "Где русские книги?",
            "ex": "«Русские книги слева, на втором этаже».",
            "options": [
              "Справа, на первом этаже",
              "Слева, на втором этаже",
              "В центре, на третьем этаже",
              "На кассе"
            ]
          },
          {
            "a": 0,
            "q": "Где Аня платит?",
            "ex": "«Платите наверху, на кассе».",
            "options": [
              "Наверху, на кассе",
              "Дома",
              "В другом магазине",
              "В библиотеке"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trki_a2",
    "level": "A2",
    "levelName": "Cơ bản A2 (ТБУ)",
    "category": "full",
    "categoryName": "Đề thi toàn diện (3 phần)",
    "title": "Đề thi thử ТРКИ ТБУ (Trình độ cơ bản A2)",
    "durationMin": 50,
    "passPercent": 66,
    "is_pro_only": false,
    "icon": "🥈",
    "parts": [
      {
        "id": "gram",
        "vi": "Phần 1. Từ vựng và ngữ pháp",
        "name": "Часть 1. Лексика и грамматика",
        "questions": [
          {
            "a": 0,
            "q": "Мы познакомились с новым ___. (преподаватель)",
            "ex": "с + cách 5 (kết thúc phụ âm mềm -ель -> -елем).",
            "options": [
              "преподавателем",
              "преподавателя",
              "преподавателю",
              "преподаватель"
            ]
          },
          {
            "a": 0,
            "q": "Анна часто звонит своей ___. (мать)",
            "ex": "звонить + cách 3 (мать -> матери).",
            "options": [
              "матери",
              "матерью",
              "мать",
              "матере"
            ]
          },
          {
            "a": 0,
            "q": "Вчера я долго ___ эту сложную книгу.",
            "ex": "долго + động từ chưa hoàn thành thể (НСВ) ở quá khứ.",
            "options": [
              "читал",
              "прочитал",
              "прочту",
              "почитаю"
            ]
          },
          {
            "a": 0,
            "q": "Когда мы пришли на вокзал, поезд уже ___.",
            "ex": "Hành động tàu rời ga đã hoàn tất trước đó -> dùng СВ quá khứ (ушёл).",
            "options": [
              "ушёл",
              "уходил",
              "идёт",
              "поедет"
            ]
          },
          {
            "a": 0,
            "q": "Он спросил меня, ___ я поеду на экскурсию.",
            "ex": "Câu hỏi gián tiếp có/không -> dùng tiểu từ 'ли' đặt sau động từ.",
            "options": [
              "поеду ли",
              "что",
              "как",
              "чтобы"
            ]
          },
          {
            "a": 0,
            "q": "Если завтра будет хорошая погода, мы ___ за город.",
            "ex": "Điều kiện tương lai một lần -> dùng động từ chuyển động СВ 'поедем'.",
            "options": [
              "поедем",
              "ехали",
              "ездим",
              "будем ехать"
            ]
          }
        ]
      },
      {
        "id": "reading",
        "vi": "Phần 2. Đọc hiểu",
        "name": "Часть 2. Чтение",
        "text": {
          "ru": "Санкт-Петербург — один из самых красивых городов мира. Его основал царь Пётр Первый в 1703 году. Город называют 'Северной столицей' России. В Петербурге много музеев, театров и памятников архитектуры. Самый известный музей — Эрмитаж, в котором собраны миллионы произведений искусства. Каждый год миллионы туристов приезжают сюда, особенно летом во время знаменитых Белых ночей.",
          "vi": "Sankt-Peterburg là một trong những thành phố đẹp nhất thế giới. Sa hoàng Pyotr Đại đế đã thành lập thành phố vào năm 1703. Thành phố được gọi là 'Thủ đô phía Bắc' của nước Nga. Tại Peterburg có rất nhiều bảo tàng, nhà hát và di tích kiến trúc. Bảo tàng nổi tiếng nhất là Hermitage, nơi quy tụ hàng triệu tác phẩm nghệ thuật. Hàng năm có hàng triệu du khách đến đây, đặc biệt vào mùa hè trong dịp Đêm Trắng nổi tiếng."
        },
        "questions": [
          {
            "a": 0,
            "q": "Кто и когда основал Санкт-Петербург?",
            "ex": "'Его основал царь Пётр Первый в 1703 году.'",
            "options": [
              "Пётр Первый в 1703 году",
              "Екатерина Вторая в 1750 году",
              "Иван Грозный в 1650 году",
              "Александр Первый в 1812 году"
            ]
          },
          {
            "a": 0,
            "q": "Как часто называют Санкт-Петербург?",
            "ex": "'Город называют Северной столицей России.'",
            "options": [
              "Северной столицей",
              "Золотым кольцом",
              "Южной гаванью",
              "Старым кремлём"
            ]
          },
          {
            "a": 0,
            "q": "Какой музей самый известный в городе?",
            "ex": "'Самый известный музей — Эрмитаж.'",
            "options": [
              "Эрмитаж",
              "Третьяковская галерея",
              "Русский музей",
              "Пушкинский музей"
            ]
          },
          {
            "a": 0,
            "q": "Когда особенно много туристов приезжает в город?",
            "ex": "'...особенно летом во время знаменитых Белых ночей.'",
            "options": [
              "Летом во время Белых ночей",
              "Зимой на Новый год",
              "Осенью в октябре",
              "Весной в марте"
            ]
          }
        ]
      },
      {
        "id": "listening",
        "vi": "Phần 3. Nghe hiểu",
        "name": "Часть 3. Аудирование",
        "lines": [
          {
            "ru": "Скажите, пожалуйста, как доехать до Красной площади?",
            "vi": "Xin hỏi làm thế nào để đi tới Quảng trường Đỏ?",
            "who": "Пассажир"
          },
          {
            "ru": "Вам нужно сесть на метро на станцию 'Университет' и доехать до станции 'Охотный ряд'.",
            "vi": "Bạn cần lên tàu điện ngầm ở ga 'Đại học' và đi đến ga 'Okhotny Ryad'.",
            "who": "Дежурный"
          },
          {
            "ru": "Это прямая линия или нужно делать пересадку?",
            "vi": "Đây là tuyến thẳng hay phải đổi chuyến ạ?",
            "who": "Пассажир"
          },
          {
            "ru": "Это прямая Сокольническая линия, пересадка не нужна. Время в пути около 15 минут.",
            "vi": "Đây là tuyến Sokolnicheskaya thẳng, không cần đổi tàu. Thời gian đi khoảng 15 phút.",
            "who": "Дежурный"
          }
        ],
        "questions": [
          {
            "a": 0,
            "q": "Куда хочет поехать пассажир?",
            "ex": "'как доехать до Красной площади?'",
            "options": [
              "На Красную площадь",
              "В университет",
              "В музей Эрмитаж",
              "На вокзал"
            ]
          },
          {
            "a": 0,
            "q": "На какую станцию метро нужно доехать?",
            "ex": "'доехать до станции Охотный ряд'",
            "options": [
              "Охотный ряд",
              "Университет",
              "Арбатская",
              "Театральная"
            ]
          },
          {
            "a": 0,
            "q": "Нужна ли пассажиру пересадка?",
            "ex": "'пересадка не нужна'",
            "options": [
              "Нет, это прямая линия",
              "Да, одна пересадка",
              "Да, две пересадки",
              "Нужно ехать на автобусе"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trki_b1",
    "level": "B1",
    "levelName": "Trung cấp B1 (ТРКИ-1)",
    "category": "full",
    "categoryName": "Đề thi toàn diện (3 phần)",
    "title": "Đề thi chuẩn quốc tế ТРКИ-1 (Đầu vào Đại học Nga)",
    "durationMin": 60,
    "passPercent": 66,
    "is_pro_only": true,
    "icon": "🥇",
    "parts": [
      {
        "id": "gram",
        "vi": "Phần 1. Từ vựng và ngữ pháp chuyên sâu",
        "name": "Часть 1. Лексика и грамматика",
        "questions": [
          {
            "a": 0,
            "q": "Несмотря на ___, студенты успешно сдали все экзамены.",
            "ex": "Несмотря на + cách 4 (трудности danh từ số nhiều bất động vật).",
            "options": [
              "трудности",
              "трудностей",
              "трудностям",
              "трудностями"
            ]
          },
          {
            "a": 0,
            "q": "Благодаря ___ преподавателя группа отлично подготовилась к тесту.",
            "ex": "Благодаря + cách 3 (помощь -> помощи).",
            "options": [
              "помощи",
              "помощь",
              "помощью",
              "о помощи"
            ]
          },
          {
            "a": 0,
            "q": "Мы гордимся ___ нашей научной лаборатории.",
            "ex": "гордиться + cách 5 số nhiều (-ами/-ями).",
            "options": [
              "достижениями",
              "достижения",
              "достижений",
              "достижениям"
            ]
          }
        ]
      },
      {
        "id": "reading",
        "vi": "Phần 2. Đọc hiểu văn bản học thuật",
        "name": "Часть 2. Чтение",
        "text": {
          "ru": "Научные исследования в области искусственного интеллекта в российских университетах развиваются стремительными темпами. Ведущие центры в Москве и Санкт-Петербурге разрабатывают новые модели машинного обучения для медицины, транспорта и лингвистики. Студенты бакалавриата и магистратуры имеют возможность участвовать в реальных проектах с первого года обучения.",
          "vi": "Các nghiên cứu khoa học trong lĩnh vực trí tuệ nhân tạo tại các trường đại học Nga đang phát triển với tốc độ nhanh chóng. Các trung tâm hàng đầu tại Moskva và Saint Petersburg đang phát triển các mô hình học máy mới cho y học, giao thông và ngôn ngữ học. Sinh viên đại học và cao học có cơ hội tham gia vào các dự án thực tế ngay từ năm thứ nhất."
        },
        "questions": [
          {
            "a": 0,
            "q": "В каких сферах разрабатываются модели машинного обучения?",
            "ex": "'...для медицины, транспорта и лингвистики.'",
            "options": [
              "В медицине, транспорте и лингвистике",
              "В сельском хозяйстве и туризме",
              "Только в военной отрасли",
              "В строительстве дорог"
            ]
          },
          {
            "a": 0,
            "q": "С какого времени студенты могут участвовать в проектах?",
            "ex": "'...с первого года обучения.'",
            "options": [
              "С первого года обучения",
              "Только в аспирантуре",
              "После окончания университета",
              "С третьего курса"
            ]
          }
        ]
      },
      {
        "id": "listening",
        "vi": "Phần 3. Nghe hiểu bài giảng",
        "name": "Часть 3. Аудирование",
        "lines": [
          {
            "ru": "Тема нашей сегодняшней лекции — структура научного доклада и требования к дипломной работе.",
            "vi": "Chủ đề bài giảng hôm nay của chúng ta là cấu trúc báo cáo khoa học và yêu cầu đối với khóa luận tốt nghiệp.",
            "who": "Профессор"
          },
          {
            "ru": "Профессор, каков рекомендуемый объём введения?",
            "vi": "Thưa giáo sư, dung lượng khuyến nghị của phần mở đầu là bao nhiêu ạ?",
            "who": "Студент"
          },
          {
            "ru": "Введение должно составлять от трёх до пяти страниц печатного текста.",
            "vi": "Phần mở đầu nên chiếm từ ba đến năm trang văn bản in.",
            "who": "Профессор"
          }
        ],
        "questions": [
          {
            "a": 0,
            "q": "О чём лекция профессора?",
            "ex": "'Тема нашей сегодняшней лекции — структура научного доклада...'",
            "options": [
              "О структуре научного доклада и диплома",
              "Об истории языка",
              "О правилах сдачи экзамена",
              "О поступлении в вуз"
            ]
          },
          {
            "a": 0,
            "q": "Какой объём введения рекомендует профессор?",
            "ex": "'от трёх до пяти страниц печатного текста'",
            "options": [
              "От 3 до 5 страниц",
              "Более 20 страниц",
              "Ровно 1 страницу",
              "10-15 страниц"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trki_b2",
    "level": "B2",
    "levelName": "Nâng cao B2 (ТРКИ-2)",
    "category": "full",
    "categoryName": "Đề thi toàn diện (3 phần)",
    "title": "Đề thi nâng cao ТРКИ-2 (Tốt nghiệp Đại học / Thạc sĩ)",
    "durationMin": 75,
    "passPercent": 66,
    "is_pro_only": true,
    "icon": "💎",
    "parts": [
      {
        "id": "gram",
        "vi": "Phần 1. Cấu trúc câu phức & thành ngữ",
        "name": "Часть 1. Лексика и грамматика",
        "questions": [
          {
            "a": 0,
            "q": "Вопреки ___ экспертов, экономика продемонстрировала устойчивый рост.",
            "ex": "Вопреки + cách 3 số nhiều (-ам/-ям).",
            "options": [
              "ожиданиям",
              "ожиданий",
              "ожиданиями",
              "ожидания"
            ]
          },
          {
            "a": 0,
            "q": "Статья посвящена проблеме, решение ___ имеет ключевое значение для науки.",
            "ex": "решение (của cái gì -> cách 2 giống cái: которой).",
            "options": [
              "которой",
              "которая",
              "которую",
              "о которой"
            ]
          }
        ]
      },
      {
        "id": "reading",
        "vi": "Phần 2. Đọc hiểu bài luận & phân tích",
        "name": "Часть 2. Чтение",
        "text": {
          "ru": "Культурный диалог между Россией и Вьетнамом имеет глубокие исторические корни. Образовательные программы, межвузовские обмены и совместные научно-технические конференции служат прочным мостом дружбы. Выпускники российских вузов вносят весомый вклад в модернизацию ключевых отраслей промышленности Вьетнама.",
          "vi": "Đối thoại văn hóa giữa Nga và Việt Nam có nguồn gốc lịch sử sâu sắc. Các chương trình giáo dục, trao đổi giữa các trường đại học và hội nghị khoa học kỹ thuật chung đóng vai trò là cây cầu hữu nghị vững chắc. Cựu sinh viên các trường đại học Nga đóng góp to lớn vào công cuộc hiện đại hóa các ngành công nghiệp trọng điểm của Việt Nam."
        },
        "questions": [
          {
            "a": 0,
            "q": "Что служит мостом дружбы между странами?",
            "ex": "'...Образовательные программы, межвузовские обмены и совместные научно-технические конференции...'",
            "options": [
              "Образовательные программы и научные конференции",
              "Только коммерческая торговля",
              "Спортивные турниры",
              "Туристические агентства"
            ]
          }
        ]
      },
      {
        "id": "listening",
        "vi": "Phần 3. Nghe hiểu phỏng vấn chuyên gia",
        "name": "Часть 3. Аудирование",
        "lines": [
          {
            "ru": "Сегодня у нас в студии эксперт по международным образовательным грантам.",
            "vi": "Hôm nay trong trường quay của chúng ta có chuyên gia về học bổng giáo dục quốc tế.",
            "who": "Ведущий"
          },
          {
            "ru": "Главное требование к кандидатам — высокий уровень владения русским языком и сильная мотивация.",
            "vi": "Yêu cầu hàng đầu đối với ứng viên là trình độ tiếng Nga vững vàng và động lực mạnh mẽ.",
            "who": "Эксперт"
          }
        ],
        "questions": [
          {
            "a": 0,
            "q": "Какое главное требование к кандидатам?",
            "ex": "'...высокий уровень владения русским языком и сильная мотивация.'",
            "options": [
              "Высокий уровень языка и мотивация",
              "Наличие стажа работы от 10 лет",
              "Умение играть на инструментах",
              "Возраст старше 35 лет"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trki_gram_a1a2",
    "level": "A2",
    "levelName": "Cơ bản A1-A2",
    "category": "grammar",
    "categoryName": "grammar",
    "title": "Chuyên đề: 6 Cách & Động từ chuyển động (A1-A2)",
    "durationMin": 35,
    "passPercent": 70,
    "is_pro_only": false,
    "icon": "📖",
    "parts": [
      {
        "id": "gram",
        "vi": "Phần 1. Trắc nghiệm ngữ pháp chuyên đề",
        "name": "Часть 1. Лексика и грамматика",
        "questions": [
          {
            "a": 0,
            "q": "Мария подарила цветы своей любимой ___. (подруга)",
            "ex": "подарить + cách 3 (подруга -> подруге).",
            "options": [
              "подруге",
              "подругу",
              "подругой",
              "подруги"
            ]
          },
          {
            "a": 0,
            "q": "Мы часто гуляем по ___ парку. (красивый)",
            "ex": "по + cách 3 số ít giống đực (-ому).",
            "options": [
              "красивому",
              "красивым",
              "красивом",
              "красивого"
            ]
          },
          {
            "a": 0,
            "q": "Летом студенты поедут ___ море.",
            "ex": "ехать на море (hướng đi với danh từ biển dùng giới từ на).",
            "options": [
              "на",
              "в",
              "к",
              "по"
            ]
          },
          {
            "a": 0,
            "q": "Каждое утро мой отец ___ пешком на работу.",
            "ex": "Thói quen lặp lại thường xuyên bằng chân -> dùng НСВ đa hướng: ходить (ходит).",
            "options": [
              "ходит",
              "идёт",
              "пошёл",
              "ездит"
            ]
          },
          {
            "a": 0,
            "q": "После школы брат поступил в ___. (университет)",
            "ex": "поступить В + cách 4 bất động vật -> giữ nguyên.",
            "options": [
              "университет",
              "университете",
              "университету",
              "университетом"
            ]
          },
          {
            "a": 0,
            "q": "Антон увлекается ___. (классическая музыка)",
            "ex": "увлекаться + cách 5 giống cái (-ой/-ей).",
            "options": [
              "классической музыкой",
              "классическую музыку",
              "классической музыки",
              "классическая музыка"
            ]
          },
          {
            "a": 0,
            "q": "Сколько ___ прошло с тех пор?",
            "ex": "Сколько + cách 2 số nhiều (лет).",
            "options": [
              "лет",
              "года",
              "год",
              "годы"
            ]
          },
          {
            "a": 0,
            "q": "Я хочу пожелать вам крепкого ___. (здоровье)",
            "ex": "пожелать + cách 2 (здоровье -> здоровья).",
            "options": [
              "здоровья",
              "здоровью",
              "здоровьем",
              "здоровье"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "trki_reading_b1",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "reading",
    "categoryName": "reading",
    "title": "Chuyên đề: Đọc hiểu văn bản xã hội & Báo chí Nga (Чтение B1)",
    "durationMin": 40,
    "passPercent": 66,
    "is_pro_only": true,
    "icon": "📰",
    "parts": [
      {
        "id": "reading",
        "vi": "Phần 2. Đọc hiểu báo chí",
        "name": "Часть 2. Чтение",
        "text": {
          "ru": "Транспортная система Москвы за последние десять лет претерпела масштабную модернизацию. Запуск Московских центральных диаметров (МЦД) и Большой кольцевой линии (БКЛ) связал отдалённые районы столицы с Подмосковьем. Пассажиры отмечают удобство единой системы оплаты, современные поезда с климат-контролем и бесплатный Wi-Fi на всём протяжении пути.",
          "vi": "Hệ thống giao thông của Moskva trong mười năm qua đã trải qua quá trình hiện đại hóa quy mô lớn. Việc đưa vào vận hành Tuyến đường kính trung tâm (MCD) và Tuyến vành đai lớn (BKL) đã kết nối các khu vực xa xôi của thủ đô với vùng ngoại ô Podmoskovye. Hành khách đánh giá cao sự tiện lợi của hệ thống vé tích hợp đồng nhất, các đoàn tàu hiện đại có điều hòa không khí và Wi-Fi miễn phí trên suốt hành trình."
        },
        "questions": [
          {
            "a": 0,
            "q": "Что связало отдалённые районы столицы с Подмосковьем?",
            "ex": "'Запуск Московских центральных диаметров (МЦД) и Большой кольцевой линии (БКЛ)...'",
            "options": [
              "МЦД и БКЛ",
              "Только речные трамваи",
              "Новая автомагистраль",
              "Канатная дорога"
            ]
          },
          {
            "a": 0,
            "q": "Что отмечают пассажиры в современных поездах?",
            "ex": "'...современные поезда с климат-контролем и бесплатный Wi-Fi...'",
            "options": [
              "Климат-контроль и бесплатный Wi-Fi",
              "Бесплатную еду",
              "Телевизоры в каждом купе",
              "Библиотеку"
            ]
          },
          {
            "a": 0,
            "q": "За какой период произошла модернизация системы?",
            "ex": "'...за последние десять лет...'",
            "options": [
              "За последние 10 лет",
              "За 50 лет",
              "За один год",
              "В прошлом веке"
            ]
          },
          {
            "a": 0,
            "q": "Какова главная мысль текста?",
            "ex": "Bài viết tổng quan về những thành tựu hiện đại hóa hệ thống giao thông thủ đô.",
            "options": [
              "Giao thông Moskva hiện đại, đồng bộ và tiện nghi vượt bậc",
              "Vé tàu ngày càng đắt đỏ",
              "Ngoại ô không có tàu điện",
              "Tàu điện ngầm quá tải"
            ]
          }
        ]
      }
    ]
  }
];

const VOCAB_JARS = [
  {
    "id": "nghe_nghiep",
    "code": "nghe_nghiep",
    "name": "Nghề nghiệp",
    "title": "Nghề nghiệp",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Từ vựng các ngành nghề, chức vụ, nơi làm việc, các hành động nghiệp vụ và mẫu câu giao tiếp.",
    "icon": "💼",
    "color": "#0039A6",
    "sub_topics": [
      "Chủ đề nghề nghiệp"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Студе́нт у́чится в университе́те. (Sinh viên đang học ở trường đại học.)",
        "ru": "студе́нт — студе́нтка",
        "vi": "sinh viên nam - sinh viên nữ",
        "pos": "Noun",
        "note": "sinh viên nam - sinh viên nữ | Làm việc: ở trường đại học/ học viện | Hành động: học",
        "gender": "m/f",
        "stress": "студе́нт — студе́нтка",
        "vocab_id": "41810eb5-1ce2-4741-b9de-44b0440858c9",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Преподава́тель преподаёт ру́сский язы́к в университе́те. (Giảng viên đang dạy tiếng Nga ở trường đại học.)",
        "ru": "преподава́тель — преподава́тельница",
        "vi": "giảng viên nam - giảng viên nữ",
        "pos": "Noun",
        "note": "giảng viên nam - giảng viên nữ | Làm việc: ở trường đại học/ học viện | Hành động: dạy học",
        "gender": "f",
        "stress": "преподава́тель — преподава́тельница",
        "vocab_id": "0dc52773-0010-47e8-af9e-e50f8a9e1dbe",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Шко́льница у́чится в шко́ле. (Học sinh đang học ở trường học.)",
        "ru": "шко́льник — шко́льница",
        "vi": "học sinh nam - học sinh nữ",
        "pos": "Noun",
        "note": "học sinh nam - học sinh nữ | Làm việc: ở trường học | Hành động: học",
        "gender": "f",
        "stress": "шко́льник — шко́льница",
        "vocab_id": "8d56cc41-7c7b-49eb-ae02-3f358baa0355",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Учи́тель преподаёт в шко́ле. (Giáo viên đang dạy học ở trường học.)",
        "ru": "учи́тель — учи́тельница",
        "vi": "thầy giáo - cô giáo",
        "pos": "Noun",
        "note": "thầy giáo - cô giáo | Làm việc: ở trường học | Hành động: dạy học",
        "gender": "f",
        "stress": "учи́тель — учи́тельница",
        "vocab_id": "fa7eff8d-507b-4b7d-b00e-5cfa08441c98",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де. (Kỹ sư đang sửa chữa máy móc ở nhà máy.)",
        "ru": "инжене́р",
        "vi": "kỹ sư",
        "pos": "Noun",
        "note": "kỹ sư | Làm việc: ở nhà máy | Hành động: sửa chữa máy móc",
        "gender": "m",
        "stress": "инжене́р",
        "vocab_id": "32d14f2e-157d-45e8-ba8b-45a85677a6f9",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии. (Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.)",
        "ru": "хи́мик",
        "vi": "nhà hóa học",
        "pos": "Noun",
        "note": "nhà hóa học | Làm việc: ở phòng thí nghiệm | Hành động: nghiên cứu hóa học",
        "gender": "m",
        "stress": "хи́мик",
        "vocab_id": "9924deef-b4b4-4b77-9d0d-b9b2a879205b",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Био́лог изуча́ет расте́ния в лаборато́рии. (Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.)",
        "ru": "био́лог",
        "vi": "nhà sinh vật học",
        "pos": "Noun",
        "note": "nhà sinh vật học | Làm việc: ở phòng thí nghiệm | Hành động: nghiên cứu thực vật",
        "gender": "m",
        "stress": "био́лог",
        "vocab_id": "1ed8f1da-2b99-4473-9a63-fb2922c31984",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе. (Lập trình viên đang lập trình trên máy tính ở cơ quan.)",
        "ru": "программи́ст",
        "vi": "lập trình viên",
        "pos": "Noun",
        "note": "lập trình viên | Làm việc: ở văn phòng - trên máy tính | Hành động: lập trình",
        "gender": "m",
        "stress": "программи́ст",
        "vocab_id": "9c6dddb6-5afd-4296-9d22-ccb5368328a5",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе. (Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.)",
        "ru": "архите́ктор",
        "vi": "kiến trúc sư",
        "pos": "Noun",
        "note": "kiến trúc sư | Làm việc: ở văn phòng | Hành động: thiết kế tòa nhà",
        "gender": "m",
        "stress": "архите́ктор",
        "vocab_id": "2c5e2b10-4f49-442c-b825-3b2c9708d49c",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе. (Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.)",
        "ru": "экономи́ст",
        "vi": "nhà kinh tế học/chuyên viên kinh tế",
        "pos": "Noun",
        "note": "nhà kinh tế học/chuyên viên kinh tế | Làm việc: ở văn phòng | Hành động: thu thập và phân tích dữ liệu",
        "gender": "m",
        "stress": "экономи́ст",
        "vocab_id": "cd1f8fde-8797-4a78-a88f-8e796c6c592c",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Врач осма́тривает и лечи́т пациéнтов в больни́це. (Bác sĩ đáng khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.)",
        "ru": "врач",
        "vi": "bác sĩ",
        "pos": "Noun",
        "note": "bác sĩ | Làm việc: ở bệnh viện/ phòng khám | Hành động: - khám bệnh - chữa bệnh",
        "gender": "m",
        "stress": "врач",
        "vocab_id": "779d292c-6ba8-49f7-b103-3ec900882fb8",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме. (Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.)",
        "ru": "фе́рмер",
        "vi": "nông dân",
        "pos": "Noun",
        "note": "nông dân | Làm việc: ở trang trại | Hành động: - trông rau - chăn nuôi gia súc",
        "gender": "m",
        "stress": "фе́рмер",
        "vocab_id": "3f670ced-6e08-4154-b662-d81b7b7b896d",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом. (Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.)",
        "ru": "домохозя́йка",
        "vi": "nội trợ",
        "pos": "Noun",
        "note": "nội trợ | Làm việc: ở nhà | Hành động: - nấu ăn - dọn dẹp nhà cửa",
        "gender": "m",
        "stress": "домохозя́йка",
        "vocab_id": "21fdb6a0-b3f3-42f1-afc6-df87268ec049",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Дире́ктор руководи́т рабо́той в фирме. (Giám đốc đang lãnh đạo công việc ở công ty.)",
        "ru": "дире́ктор",
        "vi": "giám đốc/ hiệu trưởng",
        "pos": "Noun",
        "note": "giám đốc/ hiệu trưởng | Làm việc: ở công ty; ở trường học; ở đại học; ở học viện | Hành động: lãnh đạo",
        "gender": "m",
        "stress": "дире́ктор",
        "vocab_id": "af769b0a-fd8c-4bb6-8b87-6be375487a0a",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Юри́ст консульти́рует клие́нта в юриди́ческой фирме. (Luật sư đang tư vấn cho khách hàng ở công ty luật.)",
        "ru": "юри́ст",
        "vi": "luật sư",
        "pos": "Noun",
        "note": "luật sư | Làm việc: ở công ty/ văn phòng luật | Hành động: tư vấn khách hàng",
        "gender": "m",
        "stress": "юри́ст",
        "vocab_id": "eb11201f-2848-4a29-8507-99d9fc6309f9",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме. (Người doanh nhân đang gặp gỡ đối tác ở công ty.)",
        "ru": "бизнесме́н",
        "vi": "doanh nhân",
        "pos": "Noun",
        "note": "doanh nhân | Làm việc: ở công ty | Hành động: gặp gỡ đối tác",
        "gender": "m",
        "stress": "бизнесме́н",
        "vocab_id": "c60b9a5d-283e-4504-892d-8a9f47967919",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Служа́щий рабо́тает с документа́ми в о́фисе. (Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.)",
        "ru": "служа́щий",
        "vi": "nhân viên/ công chức",
        "pos": "Noun",
        "note": "nhân viên/ công chức | Làm việc: ở văn phòng/ cơ quan | Hành động: làm việc với giấy tờ",
        "gender": "m",
        "stress": "служа́щий",
        "vocab_id": "69a376a1-3081-49fd-b415-2dc470e1b7f7",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Продаве́ц продаёт това́ры в магази́не. (Người bán hàng đang bán hàng hóa ở cửa hàng.)",
        "ru": "продаве́ц",
        "vi": "người bán hàng nam",
        "pos": "Noun",
        "note": "người bán hàng nam | Làm việc: ở cửa hàng | Hành động: bán hàng",
        "gender": "m",
        "stress": "продаве́ц",
        "vocab_id": "be57a924-f719-44a1-8f71-46467d51f99c",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Журнали́ст пи́шет ста́тьи в редаќции. (Nhà báo đang viết báo ở tòa soạn.)",
        "ru": "журнали́ст — журнали́стка",
        "vi": "nhà báo nam - nhà báo nữ",
        "pos": "Noun",
        "note": "nhà báo nam - nhà báo nữ | Làm việc: ở tòa soạn | Hành động: viết báo",
        "gender": "m/f",
        "stress": "журнали́ст — журнали́стка",
        "vocab_id": "0cf79cd7-d236-4040-a744-76acdd7912d0",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Поэ́т пи́шет стихи́ до́ма. (Nhà thơ đang viết thơ ở nhà.)",
        "ru": "поэ́т",
        "vi": "nhà thơ",
        "pos": "Noun",
        "note": "nhà thơ | Làm việc: ở nhà | Hành động: viết thơ",
        "gender": "m",
        "stress": "поэ́т",
        "vocab_id": "0226867d-f80f-404b-8509-0e793bfcafd9",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Худо́жница рису́ет карти́ны в мастерско́й. (Họa sĩ đang vẽ tranh ở xưởng vẽ.)",
        "ru": "худо́жник — худо́жница",
        "vi": "họa sĩ nam - họa sĩ nữ",
        "pos": "Noun",
        "note": "họa sĩ nam - họa sĩ nữ | Làm việc: ở xưởng vẽ | Hành động: vẽ tranh",
        "gender": "f",
        "stress": "худо́жник — худо́жница",
        "vocab_id": "6441694c-c2db-4650-9daa-bba1fc810422",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Арти́ст выступа́ет в теа́тре. (Người nghệ sĩ đang biểu diễn ở nhà hát.)",
        "ru": "арти́ст — арти́стка",
        "vi": "nghệ sĩ nam - nghệ sĩ nữ",
        "pos": "Noun",
        "note": "nghệ sĩ nam - nghệ sĩ nữ | Làm việc: ở nhà hát/ trên buổi hòa nhà (concert) | Hành động: biểu diễn",
        "gender": "m/f",
        "stress": "арти́ст — арти́стка",
        "vocab_id": "9b40d429-be05-4476-9c30-eda27ffc9cb5",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Переводчи́к перево́дит те́ксты в бюро́ перево́дов. (Phiên dịch viên đang dịch các văn bản ở văn phòng dịch thuật.)",
        "ru": "переводчи́к — переводчи́ца",
        "vi": "phiên dịch viên nam - phiên dịch viên nữ",
        "pos": "Noun",
        "note": "phiên dịch viên nam - phiên dịch viên nữ | Làm việc: ở văn phòng dịch thuật | Hành động: dịch văn bản",
        "gender": "m/f",
        "stress": "переводчи́к — переводчи́ца",
        "vocab_id": "3ded112d-2585-4f39-b124-83a14bb52470",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Моделье́р создаёт моде́ли оде́жды в ателье́. (Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.)",
        "ru": "моделье́р",
        "vi": "nhà thiết kế thời trang",
        "pos": "Noun",
        "note": "nhà thiết kế thời trang | Làm việc: ở xưởng may/ nhà may | Hành động: thiết kế quần áo",
        "gender": "m",
        "stress": "моделье́р",
        "vocab_id": "9f32398b-b503-4032-b8a9-24ab0d294367",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Музыка́нт игра́ет на пиа́нино на конце́рте. (Nhạc công đang chơi nhạc cụ trên buổi concert.)",
        "ru": "музыка́нт",
        "vi": "nhạc sĩ/ nhạc công",
        "pos": "Noun",
        "note": "nhạc sĩ/ nhạc công | Làm việc: ở nhà hát/ trên buổi hòa nhà (concert) | Hành động: chơi nhạc cụ",
        "gender": "m",
        "stress": "музыка́нт",
        "vocab_id": "b7b5bad1-3602-4018-b556-beaa94d924f2",
        "sub_topic": "Nghề nghiệp"
      },
      {
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле. (Vận động viên đang luyện tập thể thao ở phòng tập thể thao.)",
        "ru": "спортсме́н — спортсме́нка",
        "vi": "vận động viên nam - vận động viên nữ",
        "pos": "Noun",
        "note": "vận động viên nam - vận động viên nữ | Làm việc: ở phòng tập thể thao | Hành động: luyện tập",
        "gender": "m/f",
        "stress": "спортсме́н — спортсме́нка",
        "vocab_id": "68b71bec-0642-45bb-9fba-0a7d088ddcba",
        "sub_topic": "Nghề nghiệp"
      }
    ]
  },
  {
    "id": "quan_ao",
    "code": "quan_ao",
    "name": "Quần áo, giày dép",
    "title": "Quần áo, giày dép",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Trang phục theo mùa nóng/lạnh, các động từ mặc/tháo/chăm sóc quần áo và chuỗi hành động mua sắm.",
    "icon": "👗",
    "color": "#0039A6",
    "sub_topics": [
      "Học theo thời tiết",
      "Học theo hành động liên tiếp nhau"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку. - Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф. (- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác - Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn.)",
        "ru": "Пальто́",
        "vi": "Áo măng tô",
        "pos": "Noun",
        "note": "Áo măng tô (Trang phục mùa lạnh)",
        "gender": "n",
        "stress": "Пальто́",
        "vocab_id": "59d79ff6-d489-49e7-9f28-9bc2e3103a16",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ куртка. (Khi trời lạnh, tôi thường mặc/mang áo khoác.)",
        "ru": "Ку́ртка",
        "vi": "Áo khoác",
        "pos": "Noun",
        "note": "Áo khoác (Trang phục mùa lạnh)",
        "gender": "f",
        "stress": "Ку́ртка",
        "vocab_id": "17f41b25-a137-4796-8394-93e46eef8015",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ свитер. (Khi trời lạnh, tôi thường mặc/mang áo len chui đầu.)",
        "ru": "Сви́тер",
        "vi": "Áo len chui đầu",
        "pos": "Noun",
        "note": "Áo len chui đầu (Trang phục mùa lạnh)",
        "gender": "m",
        "stress": "Сви́тер",
        "vocab_id": "5eee991c-cfe1-4a44-af50-f675e7e1f014",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ брюки. (Khi trời lạnh, tôi thường mặc/mang quần dài.)",
        "ru": "Брю́ки",
        "vi": "Quần dài",
        "pos": "Noun",
        "note": "Quần dài (Trang phục mùa lạnh)",
        "gender": "pl",
        "stress": "Брю́ки",
        "vocab_id": "06eca6da-5e32-48ad-b215-639e516577be",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ шапка. (Khi trời lạnh, tôi thường mặc/mang mũ len.)",
        "ru": "Ша́пка",
        "vi": "Mũ len",
        "pos": "Noun",
        "note": "Mũ len (Trang phục mùa lạnh)",
        "gender": "f",
        "stress": "Ша́пка",
        "vocab_id": "4e07d999-120a-4fc0-9fa1-5bbd48a85f13",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ шарф. (Khi trời lạnh, tôi thường mặc/mang khăn quàng.)",
        "ru": "Шарф",
        "vi": "Khăn quàng",
        "pos": "Noun",
        "note": "Khăn quàng (Trang phục mùa lạnh)",
        "gender": "m",
        "stress": "Шарф",
        "vocab_id": "eeb82b18-0a8d-4b75-92af-c5b068d75a96",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ перчатки. (Khi trời lạnh, tôi thường mặc/mang găng tay.)",
        "ru": "Перча́тки",
        "vi": "Găng tay",
        "pos": "Noun",
        "note": "Găng tay (Trang phục mùa lạnh)",
        "gender": "pl",
        "stress": "Перча́тки",
        "vocab_id": "8874f4ab-09ae-4afb-aa18-cafa21dccb22",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ носки. (Khi trời lạnh, tôi thường mặc/mang tất.)",
        "ru": "Носки́",
        "vi": "Tất",
        "pos": "Noun",
        "note": "Tất (Trang phục mùa lạnh)",
        "gender": "m",
        "stress": "Носки́",
        "vocab_id": "c13064e9-02c1-430c-8e48-8ddd997f509e",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ ботинки. (Khi trời lạnh, tôi thường mặc/mang giày bốt thấp cổ.)",
        "ru": "Боти́нки",
        "vi": "Giày bốt thấp cổ",
        "pos": "Noun",
        "note": "Giày bốt thấp cổ (Trang phục mùa lạnh)",
        "gender": "pl",
        "stress": "Боти́нки",
        "vocab_id": "9edc890b-5fb5-430e-9ebd-27a994c10a86",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "Когда́ хо́лодно, я обы́чно ношу́ сапоги. (Khi trời lạnh, tôi thường mặc/mang giày bốt cao cổ.)",
        "ru": "Сапоги́",
        "vi": "Giày bốt cao cổ",
        "pos": "Noun",
        "note": "Giày bốt cao cổ (Trang phục mùa lạnh)",
        "gender": "m",
        "stress": "Сапоги́",
        "vocab_id": "85f1eb06-62fb-4dab-aae3-798984e3c509",
        "sub_topic": "Học theo thời tiết (Trời lạnh)"
      },
      {
        "ex": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки. - Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии. (- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao. - Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal.)",
        "ru": "Футбо́лка",
        "vi": "Áo phông",
        "pos": "Noun",
        "note": "Áo phông (Trang phục mùa hè/nóng)",
        "gender": "f",
        "stress": "Футбо́лка",
        "vocab_id": "7bbacb95-3810-41ba-b71f-7d4109556216",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ шорты. (Khi trời nóng, tôi thường mặc/mang quần đùi.)",
        "ru": "Шо́рты",
        "vi": "Quần đùi",
        "pos": "Noun",
        "note": "Quần đùi (Trang phục mùa hè/nóng)",
        "gender": "pl",
        "stress": "Шо́рты",
        "vocab_id": "c1500a58-4227-4d84-bda1-b96ec75c2164",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ джинсы. (Khi trời nóng, tôi thường mặc/mang quần jean.)",
        "ru": "Джи́нсы",
        "vi": "Quần jean",
        "pos": "Noun",
        "note": "Quần jean (Trang phục mùa hè/nóng)",
        "gender": "pl",
        "stress": "Джи́нсы",
        "vocab_id": "a3c9b546-e2c9-45ce-895e-807fc5403cdf",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ платье. (Khi trời nóng, tôi thường mặc/mang đầm (váy liền).)",
        "ru": "Пла́тье",
        "vi": "Đầm (váy liền)",
        "pos": "Noun",
        "note": "Đầm (váy liền) (Trang phục mùa hè/nóng)",
        "gender": "n",
        "stress": "Пла́тье",
        "vocab_id": "a25246c6-2695-4137-8068-c3ae15221469",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ юбка. (Khi trời nóng, tôi thường mặc/mang chân váy.)",
        "ru": "Ю́бка",
        "vi": "Chân váy",
        "pos": "Noun",
        "note": "Chân váy (Trang phục mùa hè/nóng)",
        "gender": "f",
        "stress": "Ю́бка",
        "vocab_id": "b8a4fc28-2a2c-47f0-b61e-36c1fe9dfc13",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ рубашка. (Khi trời nóng, tôi thường mặc/mang áo sơ mi.)",
        "ru": "Руба́шка",
        "vi": "Áo sơ mi",
        "pos": "Noun",
        "note": "Áo sơ mi (Trang phục mùa hè/nóng)",
        "gender": "f",
        "stress": "Руба́шка",
        "vocab_id": "8c801d39-1010-4aae-89e5-0306d75586f8",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ сандалии. (Khi trời nóng, tôi thường mặc/mang dép sandal.)",
        "ru": "Санда́лии",
        "vi": "Dép sandal",
        "pos": "Noun",
        "note": "Dép sandal (Trang phục mùa hè/nóng)",
        "gender": "pl",
        "stress": "Санда́лии",
        "vocab_id": "aade6046-8116-4c79-900f-bd5eb0787b12",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Когда́ жа́рко, я обы́чно ношу́ кроссовки. (Khi trời nóng, tôi thường mặc/mang giày thể thao.)",
        "ru": "Кроссо́вки",
        "vi": "Giày thể thao",
        "pos": "Noun",
        "note": "Giày thể thao (Trang phục mùa hè/nóng)",
        "gender": "pl",
        "stress": "Кроссо́вки",
        "vocab_id": "fba5644c-c68b-4e45-a102-b15a97e1a230",
        "sub_topic": "Học theo thời tiết (Trời nóng)"
      },
      {
        "ex": "Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я сушу́ её на суши́лке для белья́. Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф. (Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.)",
        "ru": "гря́зная оде́жда",
        "vi": "quần áo bẩn",
        "pos": "Phrase",
        "note": "quần áo bẩn (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "гря́зная оде́жда",
        "vocab_id": "9b54d22f-331f-4752-bfa1-ee80beb385ee",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "",
        "ru": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не",
        "vi": "giặt bằng máy giặt",
        "pos": "Verb",
        "note": "giặt bằng máy giặt (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не",
        "vocab_id": "938aec1f-4bad-42d3-b7f1-4f17da0de633",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "",
        "ru": "суши́ть (оде́жду) на суши́лке",
        "vi": "phơi (quần áo) trên giàn phơi đồ",
        "pos": "Verb",
        "note": "phơi (quần áo) trên giàn phơi đồ (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "суши́ть (оде́жду) на суши́лке",
        "vocab_id": "f88ee476-a9ef-4c64-988c-0bb0773fc278",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "",
        "ru": "скла́дывать / сло́жить (оде́жду)",
        "vi": "gấp (quần áo)",
        "pos": "Verb",
        "note": "gấp (quần áo) (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "скла́дывать / сло́жить (оде́жду)",
        "vocab_id": "c3fbdec0-c301-4943-b680-69c39b28ae3c",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "",
        "ru": "ве́шать / повéсить (оде́жду) на ве́шалку",
        "vi": "treo (quần áo) lên móc",
        "pos": "Verb",
        "note": "treo (quần áo) lên móc (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "ве́шать / повéсить (оде́жду) на ве́шалку",
        "vocab_id": "ccb7274e-d7bb-422a-8983-04272895d40e",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "",
        "ru": "убира́ть / убра́ть (оде́жду) в шкаф",
        "vi": "cất (quần áo) vào tủ",
        "pos": "Verb",
        "note": "cất (quần áo) vào tủ (Giặt giũ & Bảo quản quần áo)",
        "gender": null,
        "stress": "убира́ть / убра́ть (оде́жду) в шкаф",
        "vocab_id": "d1681e1b-4393-462b-bd21-88a34dc30f9d",
        "sub_topic": "Giặt giũ & Bảo quản quần áo"
      },
      {
        "ex": "Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы оплати́ть покупку. Я плачу́ продавцу́ ба́нковской ка́ртой. (Tôi muốn mua quần áo. Chính vì vậy, tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi thanh toán cho người bán hàng bằng thẻ.)",
        "ru": "покупа́ть / купи́ть (оде́жду)",
        "vi": "mua (quần áo)",
        "pos": "Verb",
        "note": "mua (quần áo) (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "покупа́ть / купи́ть (оде́жду)",
        "vocab_id": "d2ade49c-7b9d-4be4-b56e-39ecb20ac06e",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "идти́ / е́хать магази́н оде́жды",
        "vi": "đi đến cửa hàng quần áo",
        "pos": "Verb",
        "note": "đi đến cửa hàng quần áo (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "идти́ / е́хать магази́н оде́жды",
        "vocab_id": "556643f1-35a4-4a89-a12a-5ce1ed907c9f",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "выбира́ть / вы́брать (оде́жду)",
        "vi": "chọn (quần áo)",
        "pos": "Verb",
        "note": "chọn (quần áo) (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "выбира́ть / вы́брать (оде́жду)",
        "vocab_id": "48845698-fe6e-433a-a203-d4a3bc0ba3c2",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "примеря́ть / приме́рить (оде́жду) в приме́рочной",
        "vi": "thử (quần áo) trong phòng thay đồ",
        "pos": "Verb",
        "note": "thử (quần áo) trong phòng thay đồ (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "примеря́ть / приме́рить (оде́жду) в приме́рочной",
        "vocab_id": "3bb41551-2469-4d6d-aa10-51022a6e1c05",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "(оде́жда) подходи́ть / подойти́ мне",
        "vi": "(quần áo) vừa với tôi",
        "pos": "Verb",
        "note": "(quần áo) vừa với tôi (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "(оде́жда) подходи́ть / подойти́ мне",
        "vocab_id": "a2648a7a-aa5a-4447-b480-8d0a161a80bd",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "идти́ на ка́ссу",
        "vi": "thanh toán ở quầy bán hàng",
        "pos": "Verb",
        "note": "thanh toán ở quầy bán hàng (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "идти́ на ка́ссу",
        "vocab_id": "0a721899-8d64-4080-bfa0-9933c51768c3",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "плати́ть / заплати́ть продавцу́",
        "vi": "thanh toán cho người bán hàng",
        "pos": "Verb",
        "note": "thanh toán cho người bán hàng (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "плати́ть / заплати́ть продавцу́",
        "vocab_id": "afa8ece1-255c-42b5-b54d-235f928a4ec4",
        "sub_topic": "Mua sắm quần áo giày dép"
      },
      {
        "ex": "",
        "ru": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными",
        "vi": "thanh toán bằng thẻ/ tiền mặt",
        "pos": "Verb",
        "note": "thanh toán bằng thẻ/ tiền mặt (Mua sắm quần áo giày dép)",
        "gender": null,
        "stress": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными",
        "vocab_id": "3837e2b5-68f7-469e-9ae4-d35f5bcc7b7d",
        "sub_topic": "Mua sắm quần áo giày dép"
      }
    ]
  },
  {
    "id": "do_dung_gia_dinh",
    "code": "do_dung_gia_dinh",
    "name": "Đồ dùng gia đình",
    "title": "Đồ dùng gia đình",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Nội thất, đồ gia dụng trong phòng khách, phòng bếp, phòng ngủ, phòng tắm, phòng giặt kèm thao tác sử dụng.",
    "icon": "🛋️",
    "color": "#0039A6",
    "sub_topics": [
      "Trong phòng khách",
      "Trong phòng bếp",
      "Trong phòng ngủ",
      "Trong phòng tắm",
      "Trong phòng giặt",
      "Động từ thao tác & công dụng"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть на нём и смотре́ть фильм. (Tôi đặt sopha ở phòng khách để ngồi trên nó xem phim)",
        "ru": "Дива́н",
        "vi": "ghế sopha",
        "pos": "Noun",
        "note": "ghế sopha (Trong phòng khách) | Thao tác: đặt để | Công dụng: ngồi, nằm, ngủ, nghỉ ngơi",
        "gender": "m",
        "stress": "Дива́н",
        "vocab_id": "28804b07-56ab-4ccc-b88d-a00af99e748d",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу. (Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.)",
        "ru": "Стол",
        "vi": "bàn",
        "pos": "Noun",
        "note": "bàn (Trong phòng khách) | Thao tác: đặt để, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: làm việc, ăn, đặt đồ",
        "gender": "m",
        "stress": "Стол",
        "vocab_id": "9ed6dab7-81c7-4023-bf54-ed2075dc8b21",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́. (Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào nó.)",
        "ru": "Ва́за",
        "vi": "bình hoa",
        "pos": "Noun",
        "note": "bình hoa (Trong phòng khách) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng/đặt nằm, - rửa >< lau khô (loại bỏ nước), - lau chùi (loại bỏ bụi bẩn) | Công dụng: trang trí, cắm hoa",
        "gender": "f",
        "stress": "Ва́за",
        "vocab_id": "b5fae03c-b72e-49df-b181-d4a730dda85a",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор. (Tôi đặt tủ ở phòng khách để đặt tivi lên nó.)",
        "ru": "Ту́мба",
        "vi": "tủ/kệ nhỏ có ngăn kéo",
        "pos": "Noun",
        "note": "tủ/kệ nhỏ có ngăn kéo (Trong phòng khách) | Thao tác: đặt để, lau chùi (loại bỏ bụi bẩn) | Công dụng: cất đồ, đặt đứng/đặt nằm",
        "gender": "f",
        "stress": "Ту́мба",
        "vocab_id": "ac21938b-9f9f-444b-b542-2340065023e8",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм. (Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim.)",
        "ru": "Телеви́зор",
        "vi": "ti vi",
        "pos": "Noun",
        "note": "ti vi (Trong phòng khách) | Thao tác: - đặt để, - bật >< tắt | Công dụng: xem",
        "gender": "m",
        "stress": "Телеви́зор",
        "vocab_id": "91e3b49d-a18b-4617-96fa-7ad99e294c27",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную. (Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.)",
        "ru": "Цвето́чный горшо́к",
        "vi": "chậu cây",
        "pos": "Noun",
        "note": "chậu cây (Trong phòng khách) | Thao tác: đặt để | Công dụng: trồng hoa, trang trí",
        "gender": "m",
        "stress": "Цвето́чный горшо́к",
        "vocab_id": "fe96cd3d-a17f-4e83-866b-df69507dbeaa",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф. (Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.)",
        "ru": "Ковёр",
        "vi": "thảm",
        "pos": "Noun",
        "note": "thảm (Trong phòng khách) | Thao tác: - lấy ra >< cất vào, - trải ra >< cuộn vào, - giặt >< phơi khô | Công dụng: ngồi",
        "gender": "m",
        "stress": "Ковёр",
        "vocab_id": "9976af2c-9452-4886-b0b3-58d61832dd7d",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я открыва́ю дверь, что́бы войти́ в дом. (Tôi mở cửa để đi vào trong nhà.)",
        "ru": "Дверь",
        "vi": "cửa ra vào",
        "pos": "Noun",
        "note": "cửa ra vào (Trong phòng khách) | Thao tác: mở >< đóng | Công dụng: vào, ra",
        "gender": "m",
        "stress": "Дверь",
        "vocab_id": "8a575d70-5a67-4676-ab20-c1bf632d0c26",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату. (Tôi mở cửa sổ vào buổi sáng để thông gió phòng.)",
        "ru": "Окно́",
        "vi": "cửa sổ",
        "pos": "Noun",
        "note": "cửa sổ (Trong phòng khách) | Thao tác: mở >< đóng | Công dụng: thông gió phòng",
        "gender": "m",
        "stress": "Окно́",
        "vocab_id": "eacb1550-7db8-4d56-b285-e8098d5d4f92",
        "sub_topic": "Trong phòng khách"
      },
      {
        "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним (3). (Tôi đặt bàn ở phòng bếp để ăn trên nó.)",
        "ru": "Стол",
        "vi": "Bàn",
        "pos": "Noun",
        "note": "Bàn (Trong phòng bếp) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: làm việc, ăn, đặt đứng/đặt nằm",
        "gender": "m",
        "stress": "Стол",
        "vocab_id": "55ae5d7e-3c27-416c-9831-decc99d1c46a",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и доста́ть кастрю́лю, а пото́м закрыва́ю его́. (Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại.)",
        "ru": "(Кухо́нный) шкаф",
        "vi": "Tủ bếp",
        "pos": "Noun",
        "note": "Tủ bếp (Trong phòng bếp) | Thao tác: - đặt đứng, treo, - mở >< đóng | Công dụng: đựng bát đĩa",
        "gender": "m",
        "stress": "(Кухо́нный) шкаф",
        "vocab_id": "684629ca-8692-437f-b4ab-eb31c04d62c3",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими. (Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.)",
        "ru": "Холоди́льник",
        "vi": "Tủ lạnh",
        "pos": "Noun",
        "note": "Tủ lạnh (Trong phòng bếp) | Thao tác: - đặt đứng, - mở >< đóng | Công dụng: bảo quản thực phẩm",
        "gender": "m",
        "stress": "Холоди́льник",
        "vocab_id": "62dc89ab-473d-4768-af26-7163753f8d92",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я варю́ суп на плите́. (Tôi nấu súp trên bếp.)",
        "ru": "Плита́",
        "vi": "Bếp",
        "pos": "Noun",
        "note": "Bếp (Trong phòng bếp) | Thao tác: - đặt đứng, - bật >< tắt, - lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: nấu, luộc, rán",
        "gender": "m",
        "stress": "Плита́",
        "vocab_id": "3ba1718d-91cc-472c-9eb7-204bd1c55ca1",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть в ней суп. (Tôi đặt nồi lên bếp để nấu súp trên nó.)",
        "ru": "Кастрю́ля",
        "vi": "Nồi",
        "pos": "Noun",
        "note": "Nồi (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên | Công dụng: luộc, nấu",
        "gender": "f",
        "stress": "Кастрю́ля",
        "vocab_id": "ade6e3a2-3f71-4eab-9932-69a31b10d890",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою её и уберу́ в шкаф. (Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa nó và cất vào trong tủ.)",
        "ru": "Сковорода́",
        "vi": "Chảo",
        "pos": "Noun",
        "note": "Chảo (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên | Công dụng: rán, nấu",
        "gender": "m",
        "stress": "Сковорода́",
        "vocab_id": "239e781e-fadd-4529-ae72-db7f9ddb2db8",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м. (Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.)",
        "ru": "Нож",
        "vi": "Dao",
        "pos": "Noun",
        "note": "Dao (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: cắt, thái, gọt, bổ",
        "gender": "m",
        "stress": "Нож",
        "vocab_id": "4e1361b5-ea65-41e8-8ca3-87ee9a393e52",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я ем суп ло́жкой. (Tôi ăn súp bằng thìa.)",
        "ru": "Ло́жка",
        "vi": "Thìa",
        "pos": "Noun",
        "note": "Thìa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: ăn",
        "gender": "f",
        "stress": "Ло́жка",
        "vocab_id": "ed5a7d0b-d2e3-4eaa-b921-6456b5bb0537",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я ем мя́со ви́лкой. (Tôi ăn thịt bằng dĩa.)",
        "ru": "Ви́лка",
        "vi": "Dĩa",
        "pos": "Noun",
        "note": "Dĩa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: ăn",
        "gender": "f",
        "stress": "Ви́лка",
        "vocab_id": "a3935754-ae5b-4966-b8b4-a910857a83b5",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́. (Tôi đặt đĩa lên bàn và đặt trứng rán lên nó.)",
        "ru": "Таре́лка",
        "vi": "Đĩa",
        "pos": "Noun",
        "note": "Đĩa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: ăn, đặt (đồ ăn) lên",
        "gender": "f",
        "stress": "Таре́лка",
        "vocab_id": "a4d23244-c2f4-4b53-9c2d-a7f91f7f08d2",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я налива́ю суп в ми́ску. (Tôi đổ súp và bát.)",
        "ru": "Ми́ска",
        "vi": "Bát",
        "pos": "Noun",
        "note": "Bát (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: ăn",
        "gender": "f",
        "stress": "Ми́ска",
        "vocab_id": "45671fcb-c09f-4551-b10a-4667806e3aec",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я налива́ю чай в ча́шку, что́бы пить. (Tôi rót trà vào tách để uống)",
        "ru": "Ча́шка",
        "vi": "Tách, chén",
        "pos": "Noun",
        "note": "Tách, chén (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: uống",
        "gender": "f",
        "stress": "Ча́шка",
        "vocab_id": "716fb49f-09a1-4571-bd5b-ab16f6af7d9e",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я налива́ю во́ду в стака́не, что́бы пить. (Tôi rót nước vào cốc để uống)",
        "ru": "Стака́н",
        "vi": "Cốc",
        "pos": "Noun",
        "note": "Cốc (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: uống",
        "gender": "m",
        "stress": "Стака́н",
        "vocab_id": "960783cb-1bbc-4f3d-b00a-b78337abdc5a",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней. (Tôi đặt thớt lên bàn để thái rau trên thớt.)",
        "ru": "(Раздело́чная) доска́",
        "vi": "Thớt",
        "pos": "Noun",
        "note": "Thớt (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: thái, bổ",
        "gender": "m",
        "stress": "(Раздело́чная) доска́",
        "vocab_id": "0a30c0e1-3aaa-44e4-84bd-a7ed52c89b61",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я мо́ю посу́ду в рако́вине. (Tôi rửa bát đĩa trong bồn rửa.)",
        "ru": "Рако́вина",
        "vi": "Bồn rửa",
        "pos": "Noun",
        "note": "Bồn rửa (Trong phòng bếp) | Thao tác: mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước) | Công dụng: rửa (bát đĩa,...)",
        "gender": "f",
        "stress": "Рако́вина",
        "vocab_id": "f6fe461c-589a-4838-a40b-a0c0816a99d2",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я сохраню́ проду́кты в корзи́ну. (Tôi đựng thực phẩm trong giỏ.)",
        "ru": "Корзи́на",
        "vi": "Giỏ",
        "pos": "Noun",
        "note": "Giỏ (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng | Công dụng: đựng (thực phẩm,...)",
        "gender": "f",
        "stress": "Корзи́на",
        "vocab_id": "bc41c504-dcfc-41ca-8888-4800dc0bffb2",
        "sub_topic": "Trong phòng bếp"
      },
      {
        "ex": "Я ложу́сь спать на крова́ти. (Tôi ngủ trên giường.)",
        "ru": "Крова́ть",
        "vi": "Giường",
        "pos": "Noun",
        "note": "Giường (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn) | Công dụng: ngủ, nằm, nghỉ ngơi",
        "gender": "m",
        "stress": "Крова́ть",
        "vocab_id": "5145ca73-7c56-463b-910c-a1da6441a290",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я открыва́ю шкаф, что́бы убра́ть в него́ оде́жду. (Tôi mở tủ quần áo ra để cất quần áo vào trong nó.)",
        "ru": "Шкаф",
        "vi": "Tủ quần áo",
        "pos": "Noun",
        "note": "Tủ quần áo (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: cất quần áo, treo quần áo",
        "gender": "m",
        "stress": "Шкаф",
        "vocab_id": "f502e813-eafb-4c73-b17e-90bfaad27bf0",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я включа́ю компью́тер, что́бы рабо́тать. (Tôi bật máy tính lên để làm việc.)",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "note": "Máy tính (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: làm việc, học, chơi điện tử",
        "gender": "m",
        "stress": "Компью́тер",
        "vocab_id": "9efbc541-c0c1-4289-91c5-51d11a0af66e",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу. (Tôi bật đèn lên để đọc sách.)",
        "ru": "Ла́мпа",
        "vi": "Đèn ngủ, đèn học",
        "pos": "Noun",
        "note": "Đèn ngủ, đèn học (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: đọc, làm việc",
        "gender": "f",
        "stress": "Ла́мпа",
        "vocab_id": "7a2a6c02-d012-48ce-af29-f23ab2a027d8",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату. (Tôi mở cửa sổ vào mỗi sáng để thông gió phòng.)",
        "ru": "Окно́",
        "vi": "Cửa sổ",
        "pos": "Noun",
        "note": "Cửa sổ (Trong phòng ngủ) | Thao tác: - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: thông gió phòng",
        "gender": "m",
        "stress": "Окно́",
        "vocab_id": "844242fa-e452-4b17-b332-1fdd92bfb0b3",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я учу́сь за (письме́нным) столо́м. (Tôi học tại bàn.)",
        "ru": "(Письме́нный) стол",
        "vi": "Bàn làm việc",
        "pos": "Noun",
        "note": "Bàn làm việc (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: học, viết, làm việc",
        "gender": "m",
        "stress": "(Письме́нный) стол",
        "vocab_id": "ec5d2685-30d4-41c1-9a69-2e5402e9b780",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я сижу́ за сту́лом, что́бы рабо́тать. (Tôi ngồi vào ghế để làm việc.)",
        "ru": "Стул",
        "vi": "Ghế",
        "pos": "Noun",
        "note": "Ghế (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn) | Công dụng: ngồi",
        "gender": "m",
        "stress": "Стул",
        "vocab_id": "955b2240-9c17-4476-89ca-2f9fc70fbeeb",
        "sub_topic": "Trong phòng ngủ"
      },
      {
        "ex": "Я вешаю́ зе́ркало на стену́, что́бы смотре́ть (в него́). (Tôi treo gương lên tường để soi gương.)",
        "ru": "Зе́ркало",
        "vi": "Gương",
        "pos": "Noun",
        "note": "Gương (Trong phòng tắm) | Thao tác: treo, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: soi gương",
        "gender": "n",
        "stress": "Зе́ркало",
        "vocab_id": "004d38b3-7c93-45ac-a925-f52711934282",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я вешаю́ по́лку в ва́нной ко́мнате, что́бы поста́вить на неё шампу́нь. (Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên kệ.)",
        "ru": "По́лка",
        "vi": "Kệ",
        "pos": "Noun",
        "note": "Kệ (Trong phòng tắm) | Thao tác: treo | Công dụng: đặt đứng/ đặt nằm (đồ vật)",
        "gender": "f",
        "stress": "По́лка",
        "vocab_id": "2291bc90-82f1-4b31-875e-275627221bd0",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я принима́ю ва́нну. (Tôi đang tắm.)",
        "ru": "Ва́нна",
        "vi": "Bồn tắm",
        "pos": "Noun",
        "note": "Bồn tắm (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: tằm (bồn)",
        "gender": "f",
        "stress": "Ва́нна",
        "vocab_id": "d5ac47dd-56d9-4c53-bf23-2d1fefadc1c5",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я ве́шаю крючо́к на стену́, что́бы веша́ть на него́ полоте́нце. (Tôi treo móc lên tường để treo khăn tắm lên nó.)",
        "ru": "Крючо́к",
        "vi": "Móc treo",
        "pos": "Noun",
        "note": "Móc treo (Trong phòng tắm) | Thao tác: treo | Công dụng: treo khăn, treo quần áo",
        "gender": "m",
        "stress": "Крючо́к",
        "vocab_id": "c80acc7e-6410-4114-9230-3aab81ef73a2",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться. (Tôi lấy khăn từ móc treo để lau người.)",
        "ru": "Полоте́нце",
        "vi": "Khăn tắm",
        "pos": "Noun",
        "note": "Khăn tắm (Trong phòng tắm) | Thao tác: treo, lấy, gấp | Công dụng: lau người, lau mặt",
        "gender": "n",
        "stress": "Полоте́нце",
        "vocab_id": "0869b03d-8f67-499f-a792-374316c12036",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з. (Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.)",
        "ru": "Унита́з",
        "vi": "Bồn cầu",
        "pos": "Noun",
        "note": "Bồn cầu (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: đi vệ sinh",
        "gender": "m",
        "stress": "Унита́з",
        "vocab_id": "e0f37bc5-929d-4607-aabf-50124e88c455",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я мо́ю лицо́ в рако́вине. (Tôi rửa mặt trong bồn rửa.)",
        "ru": "Рако́вина",
        "vi": "Bồn rửa",
        "pos": "Noun",
        "note": "Bồn rửa (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: rửa mặt, rửa tay",
        "gender": "f",
        "stress": "Рако́вина",
        "vocab_id": "df7acaa3-92b0-4704-b5b2-6d8ce9a43cd8",
        "sub_topic": "Trong phòng tắm"
      },
      {
        "ex": "Я стира́ю оде́жду в стира́льной маши́не. (Tôi giặt quần áo bằng máy giặt.)",
        "ru": "Стира́льная маши́на",
        "vi": "máy giặt",
        "pos": "Noun",
        "note": "máy giặt (Trong phòng giặt) | Thao tác: - đặt đứng, - mở >< đóng, - bật >< tắt | Công dụng: giặt quần áo",
        "gender": "f",
        "stress": "Стира́льная маши́на",
        "vocab_id": "d37320de-416a-45b2-a876-300364954ef5",
        "sub_topic": "Trong phòng giặt"
      },
      {
        "ex": "Я гла́жу руба́шку утюго́м. (Tôi là áo sơ mi bằng bàn là.)",
        "ru": "Утю́г",
        "vi": "bàn là",
        "pos": "Noun",
        "note": "bàn là (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng, - bật lên >< tắt đi | Công dụng: là quần áo",
        "gender": "m",
        "stress": "Утю́г",
        "vocab_id": "cdd7d8e4-2b0b-43b0-8612-e2609126a131",
        "sub_topic": "Trong phòng giặt"
      },
      {
        "ex": "Я гла́жу оде́жду на глади́льной доске́. (Tôi là quần áo trên cầu là.)",
        "ru": "Глади́льная доска́",
        "vi": "cầu là (bàn để là quần áo)",
        "pos": "Noun",
        "note": "cầu là (bàn để là quần áo) (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại | Công dụng: là quần áo",
        "gender": "m",
        "stress": "Глади́льная доска́",
        "vocab_id": "6ebc7287-0915-4dcc-b34f-76318b0d8d1e",
        "sub_topic": "Trong phòng giặt"
      },
      {
        "ex": "Я сушу́ оде́жду на су́шилке. (Tôi phơi quần áo trên giàn phơi đồ.)",
        "ru": "Су́шилка",
        "vi": "giàn phơi",
        "pos": "Noun",
        "note": "giàn phơi (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại | Công dụng: phơi khô quần áo",
        "gender": "f",
        "stress": "Су́шилка",
        "vocab_id": "0249d1aa-8644-46d4-9e59-c0935aed20c2",
        "sub_topic": "Trong phòng giặt"
      },
      {
        "ex": "",
        "ru": "мыть / вы́мыть >< вытира́ть / вы́тереть",
        "vi": "rửa >< lau khô (loại bỏ nước)",
        "pos": "Verb",
        "note": "rửa >< lau khô (loại bỏ nước) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "мыть / вы́мыть >< вытира́ть / вы́тереть",
        "vocab_id": "b12b3c0d-c878-43b0-9f16-b03362cb55a3",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "держа́ть / подержа́ть",
        "vi": "cầm",
        "pos": "Verb",
        "note": "cầm (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "держа́ть / подержа́ть",
        "vocab_id": "9419ebc5-24c5-441d-a427-b87225ab1ee5",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "брать / взять >< убира́ть / убра́ть",
        "vi": "lấy >< cất",
        "pos": "Verb",
        "note": "lấy >< cất (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "брать / взять >< убира́ть / убра́ть",
        "vocab_id": "210c5df5-4c53-476b-b878-7d2288cc0292",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "открыва́ть / откры́ть >< закрыва́ть / закры́ть",
        "vi": "mở >< đóng",
        "pos": "Verb",
        "note": "mở >< đóng (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "открыва́ть / откры́ть >< закрыва́ть / закры́ть",
        "vocab_id": "86cbc395-a8a6-4173-81ad-28357de6e872",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "включа́ть / включи́ть >< выключа́ть / вы́ключить",
        "vi": "bật >< tắt",
        "pos": "Verb",
        "note": "bật >< tắt (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "включа́ть / включи́ть >< выключа́ть / вы́ключить",
        "vocab_id": "363d27e6-456b-471c-93fa-583a022e77a8",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "стели́ть / постели́ть >< свора́чивать / сверну́ть",
        "vi": "trải >< cuộn",
        "pos": "Verb",
        "note": "trải >< cuộn (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "стели́ть / постели́ть >< свора́чивать / сверну́ть",
        "vocab_id": "1a08104f-c11f-42d4-a8d1-07737d111e18",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "стира́ть / постира́ть >< суши́ть / вы́сушить",
        "vi": "giặt >< phơi",
        "pos": "Verb",
        "note": "giặt >< phơi (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "стира́ть / постира́ть >< суши́ть / вы́сушить",
        "vocab_id": "2f392fff-03ea-48da-935a-bf70e5a1a502",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "раскла́дывать / разложи́ть >< скла́дывать / сложи́ть",
        "vi": "bày ra >< xếp lại",
        "pos": "Verb",
        "note": "bày ra >< xếp lại (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "раскла́дывать / разложи́ть >< скла́дывать / сложи́ть",
        "vocab_id": "f658ddff-371a-4c69-ac23-6b9407c97c0a",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "- ста́вить / поста́вить - класть / положи́ть",
        "vi": "- đặt đứng - đặt nằm",
        "pos": "Verb",
        "note": "- đặt đứng - đặt nằm (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "- ста́вить / поста́вить - класть / положи́ть",
        "vocab_id": "4aa504f3-db94-442e-b77c-b1915c632a7f",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "снима́ть / снять",
        "vi": "cởi; nhấc ra",
        "pos": "Verb",
        "note": "cởi; nhấc ra (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "снима́ть / снять",
        "vocab_id": "34124de6-0195-4ef2-b556-d62500645e1a",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "гла́дить / погла́дить (оде́жду)",
        "vi": "ủi (quần áo)",
        "pos": "Verb",
        "note": "ủi (quần áo) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "гла́дить / погла́дить (оде́жду)",
        "vocab_id": "6d9e5a79-9fba-4b07-89d9-f63ba708455d",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "протира́ть / протере́ть",
        "vi": "lau chùi (loại bỏ bụi bẩn)",
        "pos": "Verb",
        "note": "lau chùi (loại bỏ bụi bẩn) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "протира́ть / протере́ть",
        "vocab_id": "4f05e3e1-86b2-4ef0-9787-8a53580b9319",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "ве́шать / пове́сить",
        "vi": "treo",
        "pos": "Verb",
        "note": "treo (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "ве́шать / пове́сить",
        "vocab_id": "d9e1a93f-c964-42b2-990a-17b10fecc19b",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "чи́стить / почи́стить",
        "vi": "cọ rửa, làm sạch",
        "pos": "Verb",
        "note": "cọ rửa, làm sạch (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "чи́стить / почи́стить",
        "vocab_id": "5b13ed3d-b839-47cc-b5b2-1a4e02eeae03",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "сиде́ть",
        "vi": "ngồi",
        "pos": "Verb",
        "note": "ngồi (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "сиде́ть",
        "vocab_id": "bfd5b53d-c32e-4a07-99c7-a03932c56ef2",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "украша́ть / укра́сить",
        "vi": "trang trí",
        "pos": "Verb",
        "note": "trang trí (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "украша́ть / укра́сить",
        "vocab_id": "26ab179d-0f9d-4602-bf12-30e9f71b37da",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "лежа́ть",
        "vi": "nằm",
        "pos": "Verb",
        "note": "nằm (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "лежа́ть",
        "vocab_id": "7e97d4c6-7c64-4495-be80-e014f24b1280",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "храни́ть / сохрани́ть",
        "vi": "giữ gìn, cất giữ, lưu trữ",
        "pos": "Verb",
        "note": "giữ gìn, cất giữ, lưu trữ (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "храни́ть / сохрани́ть",
        "vocab_id": "50974908-c94b-4f5b-96b0-4dd3f2b4eb33",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "ложи́ться / лечь спать",
        "vi": "ngủ",
        "pos": "Verb",
        "note": "ngủ (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "ложи́ться / лечь спать",
        "vocab_id": "ddf34abf-0814-44cd-9e11-98a2df87ad75",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть",
        "vi": "xem",
        "pos": "Verb",
        "note": "xem (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть",
        "vocab_id": "1af74271-dd1a-407d-8d53-a1f960dcffc2",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "отдыха́ть / отдохну́ть",
        "vi": "nghỉ ngơi",
        "pos": "Verb",
        "note": "nghỉ ngơi (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "отдыха́ть / отдохну́ть",
        "vocab_id": "3038c747-80d1-4152-9e31-51392c5409cd",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "сажа́ть / посади́ть (цветы́)",
        "vi": "trồng (hoa)",
        "pos": "Verb",
        "note": "trồng (hoa) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "сажа́ть / посади́ть (цветы́)",
        "vocab_id": "3ea765dd-755c-4aa2-935d-dadc9423420b",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "рабо́тать",
        "vi": "làm việc",
        "pos": "Verb",
        "note": "làm việc (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "рабо́тать",
        "vocab_id": "454d0388-42e1-4b1e-9b59-adc8e440e28f",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "прове́тривать / прове́трить (ко́мнату)",
        "vi": "thông gió (phòng)",
        "pos": "Verb",
        "note": "thông gió (phòng) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "прове́тривать / прове́трить (ко́мнату)",
        "vocab_id": "b59a3d69-8a08-425a-b062-34d8b4745ae7",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "есть / съесть (блю́до)",
        "vi": "ăn (món ăn)",
        "pos": "Verb",
        "note": "ăn (món ăn) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "есть / съесть (блю́до)",
        "vocab_id": "ceb44524-488a-483e-8ed9-b9baa65a6144",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "гото́вить / приготов́ить (блю́до)",
        "vi": "nấu (món ăn)",
        "pos": "Verb",
        "note": "nấu (món ăn) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "гото́вить / приготов́ить (блю́до)",
        "vocab_id": "acb1f7c1-654a-4b98-ac2a-7bd8cd2b9e96",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "вари́ть / сва́рить",
        "vi": "luộc (nấu với nước)",
        "pos": "Verb",
        "note": "luộc (nấu với nước) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "вари́ть / сва́рить",
        "vocab_id": "b9f940bf-3be7-4310-84cf-fd680492d585",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "пить / вы́пить (воду́, чай)",
        "vi": "uống (nước, trà)",
        "pos": "Verb",
        "note": "uống (nước, trà) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "пить / вы́пить (воду́, чай)",
        "vocab_id": "257a9a17-4d30-42df-8e66-4cfb12efab56",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "жа́рить / поджа́рить (мя́со, ры́бу)",
        "vi": "rán (thịt, cá)",
        "pos": "Verb",
        "note": "rán (thịt, cá) (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "жа́рить / поджа́рить (мя́со, ры́бу)",
        "vocab_id": "3c2763c4-b1dc-4932-b206-f6cb1ba7cca8",
        "sub_topic": "Động từ thao tác & công dụng"
      },
      {
        "ex": "",
        "ru": "принима́ть / приня́ть (ванну)",
        "vi": "tắm bồn",
        "pos": "Verb",
        "note": "tắm bồn (Động từ đồ dùng gia đình)",
        "gender": null,
        "stress": "принима́ть / приня́ть (ванну)",
        "vocab_id": "79869d94-06e8-4bba-ae65-861a6476de47",
        "sub_topic": "Động từ thao tác & công dụng"
      }
    ]
  },
  {
    "id": "do_dung_hoc_tap",
    "code": "do_dung_hoc_tap",
    "name": "Đồ dùng học tập",
    "title": "Đồ dùng học tập",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Dụng cụ học tập, sách vở, tài liệu, thiết bị giảng đường và bảng lớp.",
    "icon": "🎒",
    "color": "#0039A6",
    "sub_topics": [
      "Nhóm sách và tài liệu",
      "Nhóm dụng cụ học tập trong cặp",
      "Thiết bị & dụng cụ lớp học",
      "Động từ thao tác học tập"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́. (Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp sách lại và đeo nó lên.)",
        "ru": "Рюкза́к",
        "vi": "cặp sách",
        "pos": "Noun",
        "note": "cặp sách (Nhóm sách và tài liệu)",
        "gender": "m",
        "stress": "Рюкза́к",
        "vocab_id": "36bdd998-c5af-492d-99d3-1937a3ecc0db",
        "sub_topic": "Nhóm sách và tài liệu"
      },
      {
        "ex": "Я достаю́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к (1). (Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.)",
        "ru": "Кни́га",
        "vi": "Sách",
        "pos": "Noun",
        "note": "Sách (Nhóm sách và tài liệu)",
        "gender": "f",
        "stress": "Кни́га",
        "vocab_id": "96c99871-b754-4b88-9c95-b363094052db",
        "sub_topic": "Nhóm sách và tài liệu"
      },
      {
        "ex": "Я достаю́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к. (Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.)",
        "ru": "Тетра́дь",
        "vi": "Vở",
        "pos": "Noun",
        "note": "Vở (Nhóm sách và tài liệu)",
        "gender": "m",
        "stress": "Тетра́дь",
        "vocab_id": "d4cf1438-a793-44e5-ba16-3bd2228fcd7b",
        "sub_topic": "Nhóm sách và tài liệu"
      },
      {
        "ex": "Я беру́ слова́рь в библиоте́ке, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ слова́рь. (Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.)",
        "ru": "Слова́рь",
        "vi": "Từ điển",
        "pos": "Noun",
        "note": "Từ điển (Nhóm sách và tài liệu)",
        "gender": "m",
        "stress": "Слова́рь",
        "vocab_id": "6fef2a22-f9b7-448c-ad5e-277dd0c06f34",
        "sub_topic": "Nhóm sách và tài liệu"
      },
      {
        "ex": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик. (Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.)",
        "ru": "Бума́га",
        "vi": "Giấy",
        "pos": "Noun",
        "note": "Giấy (Nhóm sách và tài liệu)",
        "gender": "f",
        "stress": "Бума́га",
        "vocab_id": "79965afd-2b2b-4266-8dab-3060dafe6a7b",
        "sub_topic": "Nhóm sách và tài liệu"
      },
      {
        "ex": "Я достаю́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к. (Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.)",
        "ru": "Пена́л",
        "vi": "Hộp bút",
        "pos": "Noun",
        "note": "Hộp bút (Nhóm dụng cụ học tập trong cặp)",
        "gender": "m",
        "stress": "Пена́л",
        "vocab_id": "d8a1aff3-6ccf-45ed-a1d5-9d5f74ee9f53",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Я достаю́ ру́чку из пенала́, что́бы писа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л. (Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.)",
        "ru": "Пена́л",
        "vi": "Bút bi",
        "pos": "Noun",
        "note": "Bút bi (Nhóm dụng cụ học tập trong cặp)",
        "gender": "m",
        "stress": "Пена́л",
        "vocab_id": "80e56c40-4477-415c-9535-69a00f62a52d",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Я достаю́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л. (Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.)",
        "ru": "Каранда́ш - Точи́лка",
        "vi": "Bút chì - gọt bút chì",
        "pos": "Noun",
        "note": "Bút chì - gọt bút chì (Nhóm dụng cụ học tập trong cặp)",
        "gender": "f",
        "stress": "Каранда́ш - Точи́лка",
        "vocab_id": "7764da51-f813-4516-8259-1716df669493",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть. (Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.)",
        "ru": "Ла́стик",
        "vi": "Tẩy",
        "pos": "Noun",
        "note": "Tẩy (Nhóm dụng cụ học tập trong cặp)",
        "gender": "m",
        "stress": "Ла́стик",
        "vocab_id": "03f08c07-b020-46ae-a21a-0db2238aa585",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её. (Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.)",
        "ru": "Лине́йка",
        "vi": "Thước kẻ",
        "pos": "Noun",
        "note": "Thước kẻ (Nhóm dụng cụ học tập trong cặp)",
        "gender": "f",
        "stress": "Лине́йка",
        "vocab_id": "f3f8e771-586d-4851-826f-05ddbb21be77",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я достаю́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок. (Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.)",
        "ru": "Цветны́е карандаши́",
        "vi": "Bút chì màu",
        "pos": "Noun",
        "note": "Bút chì màu (Nhóm dụng cụ học tập trong cặp)",
        "gender": "m",
        "stress": "Цветны́е карандаши́",
        "vocab_id": "97426807-f625-4969-b6ff-07ecc95f5056",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Мне ну́жно писа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы писа́ть им на бе́лой доске́. (Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.)",
        "ru": "Маркёр",
        "vi": "Bút dạ",
        "pos": "Noun",
        "note": "Bút dạ (Nhóm dụng cụ học tập trong cặp)",
        "gender": "m",
        "stress": "Маркёр",
        "vocab_id": "4f4820e9-51d1-4277-ba6e-720a2fc606e9",
        "sub_topic": "Nhóm dụng cụ học tập trong cặp"
      },
      {
        "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол. (Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.)",
        "ru": "Тря́пка",
        "vi": "Khăn lau",
        "pos": "Noun",
        "note": "Khăn lau (Thiết bị & dụng cụ lớp học)",
        "gender": "f",
        "stress": "Тря́пка",
        "vocab_id": "16f8d02c-e024-42fa-83d2-7a01d171a822",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка, ученики́ бу́дут протира́ть доску́ тря́пкой. (Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.)",
        "ru": "Чёрная доска́",
        "vi": "Bảng đen",
        "pos": "Noun",
        "note": "Bảng đen (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Чёрная доска́",
        "vocab_id": "0224cf11-1eab-4748-9d67-fb1cce458085",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на чёрной доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку. (Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.)",
        "ru": "Мел - Коробка (для ме́ла)",
        "vi": "Phấn - Hộp (phấn)",
        "pos": "Noun",
        "note": "Phấn - Hộp (phấn) (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Мел - Коробка (для ме́ла)",
        "vocab_id": "ebe9c649-a271-48f7-916b-0fe9da1ab033",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. После заня́тия, студе́нты бу́дут протира́ть доску́ гу́бкой. (Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.)",
        "ru": "Бе́лая доска́",
        "vi": "Bảng trắng",
        "pos": "Noun",
        "note": "Bảng trắng (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Бе́лая доска́",
        "vocab_id": "7ca4c91b-d83e-4080-8152-225194d86423",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Я протира́ю бе́лую доску́ губко́й. (Tôi đang lau bảng trắng bằng mút lau.)",
        "ru": "Губка́ (для доски́)",
        "vi": "Mút lau (bảng)",
        "pos": "Noun",
        "note": "Mút lau (bảng) (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Губка́ (для доски́)",
        "vocab_id": "7b9555d0-b939-4a9c-bdcc-c3e2bc191825",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром. (Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.)",
        "ru": "Маркёр",
        "vi": "Bút dạ",
        "pos": "Noun",
        "note": "Bút dạ (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Маркёр",
        "vocab_id": "b6fdf72b-8726-4f16-9438-13b4ca44d67b",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Преподава́тель обы́чно показыва́ет презента́цию прое́ктором. (Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.)",
        "ru": "Прое́ктор",
        "vi": "Máy chiếu",
        "pos": "Noun",
        "note": "Máy chiếu (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Прое́ктор",
        "vocab_id": "b517937c-5cf3-44b8-9a01-ed24ad2a67a4",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера. (Giảng viên bật máy tính và xem bài giảng trên màn hình (của) máy tính.)",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "note": "Máy tính (Thiết bị & dụng cụ lớp học)",
        "gender": "m",
        "stress": "Компью́тер",
        "vocab_id": "cce83641-ae9a-471d-8e34-8db14f925f3d",
        "sub_topic": "Thiết bị & dụng cụ lớp học"
      },
      {
        "ex": "",
        "ru": "брать / взять >< убира́ть / убра́ть",
        "vi": "lấy ra >< cất vào",
        "pos": "Verb",
        "note": "lấy ra >< cất vào (Động từ học tập)",
        "gender": null,
        "stress": "брать / взять >< убира́ть / убра́ть",
        "vocab_id": "aac9dcd4-1613-43c9-a756-ff0ecdf62df6",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "держа́ть / подержа́ть",
        "vi": "cầm",
        "pos": "Verb",
        "note": "cầm (Động từ học tập)",
        "gender": null,
        "stress": "держа́ть / подержа́ть",
        "vocab_id": "580914c0-93ac-4e5e-aba7-64e5f2472a42",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "- ста́вить / поста́вить - класть / положи́ть",
        "vi": "- đặt đứng - đặt nằm",
        "pos": "Verb",
        "note": "- đặt đứng - đặt nằm (Động từ học tập)",
        "gender": null,
        "stress": "- ста́вить / поста́вить - класть / положи́ть",
        "vocab_id": "594b98e6-98e6-407c-8c17-b24c1bbb951f",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "открыва́ть / откры́ть (колпачо́к) >< закрыва́ть / закры́ть (колпачо́к)",
        "vi": "mở (nắp) >< đóng (nắp)",
        "pos": "Verb",
        "note": "mở (nắp) >< đóng (nắp) (Động từ học tập)",
        "gender": null,
        "stress": "открыва́ть / откры́ть (колпачо́к) >< закрыва́ть / закры́ть (колпачо́к)",
        "vocab_id": "81cd4e3e-3dcc-4e61-b7e4-773215c32942",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "включа́ть / включа́ть >< выключа́ть / выклю́чить",
        "vi": "bật >< tắt",
        "pos": "Verb",
        "note": "bật >< tắt (Động từ học tập)",
        "gender": null,
        "stress": "включа́ть / включа́ть >< выключа́ть / выклю́чить",
        "vocab_id": "659808af-f9f5-4357-8b75-7e44ec203a52",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "складыва́ть >< сложи́ть",
        "vi": "gấp lại",
        "pos": "Verb",
        "note": "gấp lại (Động từ học tập)",
        "gender": null,
        "stress": "складыва́ть >< сложи́ть",
        "vocab_id": "62edad5f-2e6e-4025-9d37-7aca6b36bd25",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "протира́ть >< протере́ть доску́",
        "vi": "lau bảng",
        "pos": "Verb",
        "note": "lau bảng (Động từ học tập)",
        "gender": null,
        "stress": "протира́ть >< протере́ть доску́",
        "vocab_id": "c6ff789d-03ab-4f22-bc04-25de8ff3d9bb",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "надева́ть / наде́ть",
        "vi": "đeo, mặc, đội",
        "pos": "Verb",
        "note": "đeo, mặc, đội (Động từ học tập)",
        "gender": null,
        "stress": "надева́ть / наде́ть",
        "vocab_id": "3a240ccc-e420-45b6-9645-298bab5e5b63",
        "sub_topic": "Động từ thao tác học tập"
      },
      {
        "ex": "",
        "ru": "веша́ть / пове́сить",
        "vi": "treo",
        "pos": "Verb",
        "note": "treo (Động từ học tập)",
        "gender": null,
        "stress": "веша́ть / пове́сить",
        "vocab_id": "2ffc9497-9c07-4b97-b251-aa4fa538e574",
        "sub_topic": "Động từ thao tác học tập"
      }
    ]
  },
  {
    "id": "phuong_tien_giao_thong",
    "code": "phuong_tien_giao_thong",
    "name": "Phương tiện giao thông",
    "title": "Phương tiện giao thông",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Phương tiện công cộng và cá nhân, động từ chuyển động và bến bãi, nhà ga tại Nga.",
    "icon": "🚌",
    "color": "#0039A6",
    "sub_topics": [
      "Phương tiện công cộng",
      "Phương tiện cá nhân"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я е́ду в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе. (Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.)",
        "ru": "Авто́бус — остановка",
        "vi": "Xe buýt - điểm dừng",
        "pos": "Noun",
        "note": "Xe buýt - điểm dừng (Phương tiện công cộng) | Động từ: е́хать / е́здить",
        "gender": "m",
        "stress": "Авто́бус — остановка",
        "vocab_id": "5009b8bc-bee7-4986-85f1-1a9bda448e6c",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня е́ду домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е. (Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng xe điện.)",
        "ru": "Трамва́й — остановка",
        "vi": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng",
        "pos": "Noun",
        "note": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng (Phương tiện công cộng) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "Трамва́й — остановка",
        "vocab_id": "0e25bfa7-dcbb-407b-9f03-33fe8d2761ba",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я иду́ (пешко́м) на остано́вку от до́ма, потому́ что сего́дня я е́ду на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе. (Tôi đang đi bộ đến điểm dừng xe điện bánh hơi từ nhà, vì hôm nay tôi đi đến quảng trường bằng xe điện bánh hơi. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.)",
        "ru": "Тролле́йбус — остановка",
        "vi": "Xe điện (loại không có đường ray riêng) - điểm dừng",
        "pos": "Noun",
        "note": "Xe điện (loại không có đường ray riêng) - điểm dừng (Phương tiện công cộng) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "Тролле́йбус — остановка",
        "vocab_id": "7cda5e5d-5ceb-4452-be9f-cf6a1aa6cb78",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что сейча́с я е́ду на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты, я е́зжу на центра́льный ры́нок на метро́. (Tôi đang đi bộ đến ga tàu điện ngầm từ công ty, vì bây giờ tôi đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.)",
        "ru": "Метро́ — ста́нция метро́",
        "vi": "Tàu điện ngầm - ga tàu điện ngầm",
        "pos": "Noun",
        "note": "Tàu điện ngầm - ga tàu điện ngầm (Phương tiện công cộng) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "Метро́ — ста́нция метро́",
        "vocab_id": "68cce411-a8a3-489a-9c50-8872b3a83f76",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я е́ду в Москву́ на по́езде. Ка́ждую неде́лю, я е́зжу в Москву́ на по́езде и обра́тно. (Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.)",
        "ru": "По́езд — вокза́л",
        "vi": "Tàu hỏa - ga tàu hỏa",
        "pos": "Noun",
        "note": "Tàu hỏa - ga tàu hỏa (Phương tiện công cộng) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "По́езд — вокза́л",
        "vocab_id": "0b5461e4-a495-4594-a605-3f5ce6bfcbd3",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я лечу́ в Казань на самолёте. Ка́ждый ме́сяц, я лета́ю в Казань на самолёте и обра́тно. (Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.)",
        "ru": "Самолёт — аэропо́рт",
        "vi": "Máy bay - sân bay",
        "pos": "Noun",
        "note": "Máy bay - sân bay (Phương tiện công cộng) | Động từ: лете́ть / лета́ть",
        "gender": "m",
        "stress": "Самолёт — аэропо́рт",
        "vocab_id": "23874003-c1df-4f0c-bf56-731e926ad262",
        "sub_topic": "Phương tiện công cộng"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня е́ду на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не. (Tôi đi đến gara để lấy ô tô, vì hôm nay tôi đi làm bằng ô tô. Hằng ngày, tôi đều đi làm bằng ô tô.)",
        "ru": "Маши́на — гара́ж",
        "vi": "ô tô - gara",
        "pos": "Noun",
        "note": "ô tô - gara (Phương tiện cá nhân) | Động từ: е́хать / е́здить",
        "gender": "m",
        "stress": "Маши́на — гара́ж",
        "vocab_id": "391f112b-dbf4-40e9-94dc-839b79402e1b",
        "sub_topic": "Phương tiện cá nhân"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня е́ду в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле. (Tôi đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.)",
        "ru": "Мотоци́кл — гара́ж",
        "vi": "xe máy - gara",
        "pos": "Noun",
        "note": "xe máy - gara (Phương tiện cá nhân) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "Мотоци́кл — гара́ж",
        "vocab_id": "8040b45c-d60c-49f4-980a-7181530e58f8",
        "sub_topic": "Phương tiện cá nhân"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня е́ду в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку. (Tôi đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.)",
        "ru": "Велосипе́д — гара́ж",
        "vi": "xe đạp - gara",
        "pos": "Noun",
        "note": "xe đạp - gara (Phương tiện cá nhân) | Động từ: ехать / ездить",
        "gender": "m",
        "stress": "Велосипе́д — гара́ж",
        "vocab_id": "08c008a0-c59f-4f0a-9229-c928f85ec46e",
        "sub_topic": "Phương tiện cá nhân"
      }
    ]
  },
  {
    "id": "dia_diem_noi_chon",
    "code": "dia_diem_noi_chon",
    "name": "Địa điểm nơi chốn",
    "title": "Địa điểm nơi chốn",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Cơ sở học tập, y tế, thương mại dịch vụ, vui chơi giải trí, giao thông và các cảnh quan thiên nhiên.",
    "icon": "🏛️",
    "color": "#0039A6",
    "sub_topics": [
      "Cơ sở học tập",
      "Cơ sở y tế",
      "Cơ sở vui chơi giải trí, thể thao",
      "Cơ sở thương mại, dịch vụ, kinh tế",
      "Liên quan đến phương tiện giao thông",
      "Liên quan đến thiên nhiên",
      "Động từ thao tác & nơi chốn"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я иду́ в шко́лу/ акаде́мию/ институ́т/ университе́т, что́бы учи́ться. Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те. (Tôi đi đến trường học/ học viện/ viện/ đại học để học. Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học.)",
        "ru": "- В шко́ле (шко́ла) - В акаде́мии (акаде́мия) - В институ́те (институ́т) - В университе́те (университе́т)",
        "vi": "- Trường học - Học viện - Viện - Đại học",
        "pos": "Noun",
        "note": "- Trường học - Học viện - Viện - Đại học (Cơ sở học tập) | Hoạt động: học tập, học, nghiên cứu (học chuyên sâu)",
        "gender": null,
        "stress": "- В шко́ле (шко́ла) - В акаде́мии (акаде́мия) - В институ́те (институ́т) - В университе́те (университе́т)",
        "vocab_id": "40d5cb0a-f970-4612-87f5-ae1677ebc034",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке. (Tôi đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện.)",
        "ru": "В библиоте́ке (библиоте́ка)",
        "vi": "Thư viện",
        "pos": "Noun",
        "note": "Thư viện (Cơ sở học tập) | Hoạt động: đọc",
        "gender": null,
        "stress": "В библиоте́ке (библиоте́ка)",
        "vocab_id": "1cb43a25-116f-4607-9f33-48124d19e795",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Преподава́тели иду́т на кафе́дру, что́бы встре́титься. Они́ ча́сто встреча́ются на кафе́дре. (Các giảng viên đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.)",
        "ru": "На ка́федре (ка́федра)",
        "vi": "Phòng chuyên môn",
        "pos": "Noun",
        "note": "Phòng chuyên môn (Cơ sở học tập) | Hoạt động: gặp mặt, họp mặt",
        "gender": null,
        "stress": "На ка́федре (ка́федра)",
        "vocab_id": "cc412c17-6e73-47e5-a0a1-4b606217dae1",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческие биле́ты. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те. (Các sinh viên đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.)",
        "ru": "В декана́те (декана́т)",
        "vi": "Văn phòng khoa",
        "pos": "Noun",
        "note": "Văn phòng khoa (Cơ sở học tập) | Hoạt động: nộp (giấy tờ), nhận (giấy tờ)",
        "gender": null,
        "stress": "В декана́те (декана́т)",
        "vocab_id": "a5189af1-7be7-4adc-8899-9422814481e0",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Я живу́ в общежи́тии № 5. (Tôi sống ở ký túc xá số 5.)",
        "ru": "В общежи́тии (общежи́тие)",
        "vi": "Ký túc xá",
        "pos": "Noun",
        "note": "Ký túc xá (Cơ sở học tập) | Hoạt động: ở",
        "gender": null,
        "stress": "В общежи́тии (общежи́тие)",
        "vocab_id": "04cd927f-0ba1-4c07-81ea-0e45a56d059f",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́. - Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях. - Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах. (- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm. - Tôi đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường. - Tôi đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar.)",
        "ru": "- На заня́тии (заня́тие): + На ле́кции (ле́кция) + На семина́ре (семина́р)",
        "vi": "- Buổi học: + Giảng đường + Buổi thảo luận chuyên đề (seminar)",
        "pos": "Noun",
        "note": "- Buổi học: + Giảng đường + Buổi thảo luận chuyên đề (seminar) (Cơ sở học tập) | Hoạt động: nghe giảng - thuyết trình",
        "gender": null,
        "stress": "- На заня́тии (заня́тие): + На ле́кции (ле́кция) + На семина́ре (семина́р)",
        "vocab_id": "9979f43d-f3d6-4a0a-884d-10ecfec0e420",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Сего́дня я иду́ в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии. (Hôm nay tôi đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm.)",
        "ru": "В лаборато́рии (лаборато́рия)",
        "vi": "Phòng thí nghiệm",
        "pos": "Noun",
        "note": "Phòng thí nghiệm (Cơ sở học tập) | Hoạt động: nghiên cứu",
        "gender": null,
        "stress": "В лаборато́рии (лаборато́рия)",
        "vocab_id": "fc9b14d5-c44b-4b45-ac80-c3370d52edc8",
        "sub_topic": "Cơ sở học tập"
      },
      {
        "ex": "Когда я боле́ю, я иду́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це. (Khi tôi ốm, tôi đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.)",
        "ru": "В апте́ке (апте́ка)",
        "vi": "Hiệu thuốc",
        "pos": "Noun",
        "note": "Hiệu thuốc (Cơ sở y tế) | Hoạt động: mua thuốc",
        "gender": null,
        "stress": "В апте́ке (апте́ка)",
        "vocab_id": "bf67069b-c8e4-45cd-b97f-2fb40100becd",
        "sub_topic": "Cơ sở y tế"
      },
      {
        "ex": "",
        "ru": "- В поликли́нике (поликли́ника) - В больни́це (больни́ца)",
        "vi": "- Phòng khám - Bệnh viện",
        "pos": "Noun",
        "note": "- Phòng khám - Bệnh viện (Cơ sở y tế) | Hoạt động: đi gặp bác sĩ (đi khám bệnh)",
        "gender": null,
        "stress": "- В поликли́нике (поликли́ника) - В больни́це (больни́ца)",
        "vocab_id": "e92ff294-e6e5-494a-8f76-38e244224854",
        "sub_topic": "Cơ sở y tế"
      },
      {
        "ex": "Я иду́ в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках. (Tôi đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng ở những buổi triển lãm.)",
        "ru": "- В музе́е (музе́й) - На вы́ставке (вы́ставка)",
        "vi": "- Bảo tàng - Buổi triển lãm",
        "pos": "Noun",
        "note": "- Bảo tàng - Buổi triển lãm (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem tranh",
        "gender": null,
        "stress": "- В музе́е (музе́й) - На вы́ставке (вы́ставка)",
        "vocab_id": "c5cdcd77-258c-4958-a0c1-c1238aa41133",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре. (Tôi đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát.)",
        "ru": "В теа́тре (теа́тр)",
        "vi": "Nhà hát",
        "pos": "Noun",
        "note": "Nhà hát (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem vở kịch",
        "gender": null,
        "stress": "В теа́тре (теа́тр)",
        "vocab_id": "56d9949a-c0b7-445c-8733-dc6992bd7b5f",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах. (Tôi đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc.)",
        "ru": "На конце́рте (конце́рт)",
        "vi": "Buổi hòa nhạc",
        "pos": "Noun",
        "note": "Buổi hòa nhạc (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: nghe nhạc, xem biểu diễn",
        "gender": null,
        "stress": "На конце́рте (конце́рт)",
        "vocab_id": "58a926de-c115-42ae-b401-4a44128d052b",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре. (Tôi đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim.)",
        "ru": "В кинотеа́тре (кинотеа́тр)",
        "vi": "Rạp chiếu phim",
        "pos": "Noun",
        "note": "Rạp chiếu phim (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem phim",
        "gender": null,
        "stress": "В кинотеа́тре (кинотеа́тр)",
        "vocab_id": "929e1b79-eea9-4658-9a26-aedd33da13ff",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе. (Tôi đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ.)",
        "ru": "В клу́бе (клуб)",
        "vi": "Câu lạc bộ",
        "pos": "Noun",
        "note": "Câu lạc bộ (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: gặp gỡ ai?",
        "gender": null,
        "stress": "В клу́бе (клуб)",
        "vocab_id": "eb569da6-0901-40bd-b046-6d6b72d17145",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке. (Tôi đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường.)",
        "ru": "На дискоте́ке (дискоте́ка)",
        "vi": "Vũ trường",
        "pos": "Noun",
        "note": "Vũ trường (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: nhảy, nghe nhạc",
        "gender": null,
        "stress": "На дискоте́ке (дискоте́ка)",
        "vocab_id": "aa87dad3-67f6-4fc7-a0ee-fd0a6c964d89",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке. (Tôi đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc.)",
        "ru": "В ци́рке (цирк)",
        "vi": "Rạp xiếc",
        "pos": "Noun",
        "note": "Rạp xiếc (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem xiếc",
        "gender": null,
        "stress": "В ци́рке (цирк)",
        "vocab_id": "3d5de706-9ed4-4958-a682-ce5a02e0312d",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке. (Tôi đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú.)",
        "ru": "В зоопа́рке (зоопа́рк)",
        "vi": "Sở thú",
        "pos": "Noun",
        "note": "Sở thú (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem động vật",
        "gender": null,
        "stress": "В зоопа́рке (зоопа́рк)",
        "vocab_id": "ebb22024-7701-43db-be12-04044b2f08e8",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не. (Tôi đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động.)",
        "ru": "На стадио́не (стадио́н)",
        "vi": "Sân vận động",
        "pos": "Noun",
        "note": "Sân vận động (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem trận đấu, chơi cái gì?",
        "gender": null,
        "stress": "На стадио́не (стадио́н)",
        "vocab_id": "b641abf4-aa95-4830-abee-c1dd17dbcc74",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии. (Tôi đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan.)",
        "ru": "На экску́рсии (экску́рсия)",
        "vi": "Chuyến tham quan",
        "pos": "Noun",
        "note": "Chuyến tham quan (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: tham quan",
        "gender": null,
        "stress": "На экску́рсии (экску́рсия)",
        "vocab_id": "db3ba353-114a-4a29-b2e0-7be05960b88b",
        "sub_topic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "ex": "Я иду́ в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не. (Tôi đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng.)",
        "ru": "В магази́не (магази́н)",
        "vi": "Cửa hàng",
        "pos": "Noun",
        "note": "Cửa hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: mua",
        "gender": null,
        "stress": "В магази́не (магази́н)",
        "vocab_id": "5f925e58-1e66-49fd-a0bd-4cb3ea98da0d",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке. (Tôi đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng.)",
        "ru": "В ба́нке (банк)",
        "vi": "Ngân hàng",
        "pos": "Noun",
        "note": "Ngân hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: đổi tiền",
        "gender": null,
        "stress": "В ба́нке (банк)",
        "vocab_id": "90893123-b19a-4e90-bec6-37cfd4a6ed33",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я опя́ть иду́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте. (Tôi đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày tôi lại đến bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện.)",
        "ru": "На по́чте (по́чта)",
        "vi": "Bưu điện",
        "pos": "Noun",
        "note": "Bưu điện (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: gửi - nhận",
        "gender": null,
        "stress": "На по́чте (по́чта)",
        "vocab_id": "edbe8b03-d316-4ee1-bb56-c10eb9f700f4",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ в парк, что́бы гуля́ть, я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я иду́ в кио́ск, что́бы купи́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке. (Tôi đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.)",
        "ru": "В па́рке (парк) - В кио́ске (кио́ск)",
        "vi": "Công viên - Киоск",
        "pos": "Noun",
        "note": "Công viên - Киоск (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: mua",
        "gender": null,
        "stress": "В па́рке (парк) - В кио́ске (кио́ск)",
        "vocab_id": "8d101837-c2b5-4b78-bcec-a9d89e6a4d41",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ в рестора́н, что́бы поу́жинать с де́вушкой. Я ча́сто у́жинаю с де́вушкой в рестора́не. (Tôi đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng.)",
        "ru": "В рестора́не (рестора́н)",
        "vi": "Nhà hàng",
        "pos": "Noun",
        "note": "Nhà hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ăn",
        "gender": null,
        "stress": "В рестора́не (рестора́н)",
        "vocab_id": "021e6aa3-9c93-4976-abce-54f76c11561e",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "По́сле заня́тий, я иду́ в столову́ю, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой. (Sau buổi học, tôi đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.)",
        "ru": "В столово́й (столо́вая)",
        "vi": "Nhà ăn",
        "pos": "Noun",
        "note": "Nhà ăn (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ăn",
        "gender": null,
        "stress": "В столово́й (столо́вая)",
        "vocab_id": "8ea58219-a067-4cbb-9cfe-80492ba53f6b",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Сего́дня у́тром я иду́ в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро. (Sáng hôm nay tôi đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng.)",
        "ru": "В кафе́ (кафе́)",
        "vi": "Cafe",
        "pos": "Noun",
        "note": "Cafe (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: uống",
        "gender": null,
        "stress": "В кафе́ (кафе́)",
        "vocab_id": "19bedf55-0995-463a-bb80-68bb66649f3d",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ в фи́рму/ на заво́д/ на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день. (Tôi đi đến công ty/ nhà máy/ xưởng để làm việc. Tôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày.)",
        "ru": "- В фи́рме (фи́рма) - На заво́де (заво́д) - На фа́брике (фа́брика)",
        "vi": "- Công ty - Nhà máy - Xưởng sản xuất",
        "pos": "Noun",
        "note": "- Công ty - Nhà máy - Xưởng sản xuất (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: làm việc",
        "gender": null,
        "stress": "- В фи́рме (фи́рма) - На заво́де (заво́д) - На фа́брике (фа́брика)",
        "vocab_id": "c485540d-f161-4d8c-8ff4-c3c86dafc49f",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я живу́ в гости́нице. (Tôi đang ở khách sạn.)",
        "ru": "В гости́нице (гости́ница)",
        "vi": "Khách sạn",
        "pos": "Noun",
        "note": "Khách sạn (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ở",
        "gender": null,
        "stress": "В гости́нице (гости́ница)",
        "vocab_id": "dab5dd54-0b89-4e35-9b4a-aa6551671731",
        "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто храню́ их в гара́же. (Tôi đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường cất giữ chúng ở ga-ra.)",
        "ru": "В гараже́ (гара́ж)",
        "vi": "Ga-ra",
        "pos": "Noun",
        "note": "Ga-ra (Liên quan đến phương tiện giao thông) | Hoạt động: lấy (ô tô), cát (ô tô)",
        "gender": null,
        "stress": "В гараже́ (гара́ж)",
        "vocab_id": "fab4792c-4592-4337-8e47-aa36f745170b",
        "sub_topic": "Liên quan đến phương tiện giao thông"
      },
      {
        "ex": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус/ тролле́йбус/ трамва́й . Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке. (Tôi đi đến trạm dừng để đợi xe buýt / xe điện bánh hơi / tàu điện. Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng.)",
        "ru": "На остано́вке (остано́вка)",
        "vi": "Trạm buýt",
        "pos": "Noun",
        "note": "Trạm buýt (Liên quan đến phương tiện giao thông) | Hoạt động: đợi",
        "gender": null,
        "stress": "На остано́вке (остано́вка)",
        "vocab_id": "dc4d2618-0f13-4811-88d2-d4cd1e4bba75",
        "sub_topic": "Liên quan đến phương tiện giao thông"
      },
      {
        "ex": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции метро́. (Tôi đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.)",
        "ru": "На ста́нции (ста́нция)",
        "vi": "Trạm tàu điện ngầm",
        "pos": "Noun",
        "note": "Trạm tàu điện ngầm (Liên quan đến phương tiện giao thông) | Hoạt động: đợi",
        "gender": null,
        "stress": "На ста́нции (ста́нция)",
        "vocab_id": "7c5fd98d-0e51-453a-9c13-b00d35753d64",
        "sub_topic": "Liên quan đến phương tiện giao thông"
      },
      {
        "ex": "Я иду́ на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде. (Tôi đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.)",
        "ru": "На вокза́ле (вокза́л)",
        "vi": "Nhà ga",
        "pos": "Noun",
        "note": "Nhà ga (Liên quan đến phương tiện giao thông) | Hoạt động: đợi",
        "gender": null,
        "stress": "На вокза́ле (вокза́л)",
        "vocab_id": "2f13becf-b378-4994-8696-e6af9d912648",
        "sub_topic": "Liên quan đến phương tiện giao thông"
      },
      {
        "ex": "- Я иду́ на ре́ку, что́бы пойма́ть ры́бу. Я ча́сто ловлю́ ры́бу на реке́. - Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю на о́зере. (- Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông. - Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ.)",
        "ru": "На реке́ (река́), на о́зере (о́зеро)",
        "vi": "Sông, hồ",
        "pos": "Noun",
        "note": "Sông, hồ (Liên quan đến thiên nhiên) | Hoạt động: câu cá, bơi",
        "gender": null,
        "stress": "На реке́ (река́), на о́зере (о́зеро)",
        "vocab_id": "5618e40b-82cd-4ba6-8e50-abd81194f645",
        "sub_topic": "Liên quan đến thiên nhiên"
      },
      {
        "ex": "Я иду́ на мо́ре, что́бы смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре. (Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển.)",
        "ru": "На мо́ре (мо́ре)",
        "vi": "Biển",
        "pos": "Noun",
        "note": "Biển (Liên quan đến thiên nhiên) | Hoạt động: ngắm hoàng hôn",
        "gender": null,
        "stress": "На мо́ре (мо́ре)",
        "vocab_id": "d3d0b06c-a5f5-4ab0-846d-52c61b3d1919",
        "sub_topic": "Liên quan đến thiên nhiên"
      },
      {
        "ex": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́. (Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn.)",
        "ru": "В саду́ (сад)",
        "vi": "Vườn",
        "pos": "Noun",
        "note": "Vườn (Liên quan đến thiên nhiên) | Hoạt động: trồng hoa, trồng rau",
        "gender": null,
        "stress": "В саду́ (сад)",
        "vocab_id": "68248cde-1f5b-4663-b473-aeac28fff308",
        "sub_topic": "Liên quan đến thiên nhiên"
      },
      {
        "ex": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры. (Tôi đi lên núi để leo núi. Tôi rất thích leo núi.)",
        "ru": "В гора́х (гора́)",
        "vi": "Núi",
        "pos": "Noun",
        "note": "Núi (Liên quan đến thiên nhiên) | Hoạt động: leo núi",
        "gender": null,
        "stress": "В гора́х (гора́)",
        "vocab_id": "089732cd-ca15-4d17-8f00-586182535135",
        "sub_topic": "Liên quan đến thiên nhiên"
      },
      {
        "ex": "Я иду́ в лес, что́бы собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́. (Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng.)",
        "ru": "В лесу́ (лес)",
        "vi": "Rừng",
        "pos": "Noun",
        "note": "Rừng (Liên quan đến thiên nhiên) | Hoạt động: hái nấm",
        "gender": null,
        "stress": "В лесу́ (лес)",
        "vocab_id": "5208fe8b-5c37-4f24-a676-ab5e1005232d",
        "sub_topic": "Liên quan đến thiên nhiên"
      },
      {
        "ex": "",
        "ru": "- учи́ться в/на где?(С6) - учи́ть что?(С4)",
        "vi": "- học ở đâu? (C6) - học cái gì? (C4)",
        "pos": "Verb",
        "note": "- học ở đâu? (C6) - học cái gì? (C4) (Động từ nơi chốn)",
        "gender": null,
        "stress": "- учи́ться в/на где?(С6) - учи́ть что?(С4)",
        "vocab_id": "98bf535f-6d69-4e4a-a06c-c680e7193a98",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "изуча́ть / изучи́ть",
        "vi": "nghiên cứu",
        "pos": "Verb",
        "note": "nghiên cứu (Động từ nơi chốn)",
        "gender": null,
        "stress": "изуча́ть / изучи́ть",
        "vocab_id": "ca8b07b6-f263-45a6-8964-a59b9198d23f",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "чита́ть / прочита́ть",
        "vi": "đọc",
        "pos": "Verb",
        "note": "đọc (Động từ nơi chốn)",
        "gender": null,
        "stress": "чита́ть / прочита́ть",
        "vocab_id": "a347ccf7-6ad3-4ae4-86d4-9fae0d44dc28",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "встреча́ться / встре́титься с кем?",
        "vi": "gặp gỡ với ai?",
        "pos": "Verb",
        "note": "gặp gỡ với ai? (Động từ nơi chốn)",
        "gender": null,
        "stress": "встреча́ться / встре́титься с кем?",
        "vocab_id": "c7286fde-64f2-47db-b122-80e1398fca89",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "подава́ть / прода́ть (докуме́нты)",
        "vi": "nộp (tài liệu)",
        "pos": "Verb",
        "note": "nộp (tài liệu) (Động từ nơi chốn)",
        "gender": null,
        "stress": "подава́ть / прода́ть (докуме́нты)",
        "vocab_id": "39a6f8d8-0ab1-44cc-a62c-0a868e8377b0",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "получа́ть / получи́ть (докуме́нты)",
        "vi": "nhận (tài liệu)",
        "pos": "Verb",
        "note": "nhận (tài liệu) (Động từ nơi chốn)",
        "gender": null,
        "stress": "получа́ть / получи́ть (докуме́нты)",
        "vocab_id": "10ff874d-fa35-4570-b8f7-da0cc16c1833",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "жить",
        "vi": "sống",
        "pos": "Verb",
        "note": "sống (Động từ nơi chốn)",
        "gender": null,
        "stress": "жить",
        "vocab_id": "85638859-15b1-4829-b7d2-6db234071c73",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "слу́шать (ле́кцию, му́зыку)",
        "vi": "nghe (bài giảng, nhạc)",
        "pos": "Verb",
        "note": "nghe (bài giảng, nhạc) (Động từ nơi chốn)",
        "gender": null,
        "stress": "слу́шать (ле́кцию, му́зыку)",
        "vocab_id": "66ff2e26-4637-4d4d-9de7-6cf23233a35c",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "выступа́ть / вы́ступить",
        "vi": "phát biểu",
        "pos": "Verb",
        "note": "phát biểu (Động từ nơi chốn)",
        "gender": null,
        "stress": "выступа́ть / вы́ступить",
        "vocab_id": "8f1d5a4a-071e-4810-9336-8a94dfd0c950",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "иссле́довать",
        "vi": "nghiên cứu",
        "pos": "Verb",
        "note": "nghiên cứu (Động từ nơi chốn)",
        "gender": null,
        "stress": "иссле́довать",
        "vocab_id": "3ae9249e-266a-4d49-9d9c-555a6543e43f",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "покупа́ть / купи́ть лека́рства",
        "vi": "mua thuốc",
        "pos": "Verb",
        "note": "mua thuốc (Động từ nơi chốn)",
        "gender": null,
        "stress": "покупа́ть / купи́ть лека́рства",
        "vocab_id": "474dec24-de9f-401e-b0f2-a7e91dcd91a2",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "идти́/е́хать к врачу́",
        "vi": "đi đến chỗ bác sĩ",
        "pos": "Verb",
        "note": "đi đến chỗ bác sĩ (Động từ nơi chốn)",
        "gender": null,
        "stress": "идти́/е́хать к врачу́",
        "vocab_id": "48729cf8-335c-42fd-b54b-e4dfe9b14582",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть карти́ны",
        "vi": "xem tranh",
        "pos": "Verb",
        "note": "xem tranh (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть карти́ны",
        "vocab_id": "a278e8e8-1d52-4d5a-8acc-ae3c09fc4142",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть спекта́кль",
        "vi": "xem vở kịch",
        "pos": "Verb",
        "note": "xem vở kịch (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть спекта́кль",
        "vocab_id": "90d192dc-b1e1-4a04-b4c7-13adfc305879",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть выступле́ние",
        "vi": "xem buổi biểu diễn",
        "pos": "Verb",
        "note": "xem buổi biểu diễn (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть выступле́ние",
        "vocab_id": "ca769eaf-86ae-4422-b99b-5bfd444e4a9d",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть фильм",
        "vi": "xem phim",
        "pos": "Verb",
        "note": "xem phim (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть фильм",
        "vocab_id": "231f4156-36e0-4e9b-9862-7c1b7e3463dd",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "посеща́ть / посети́ть",
        "vi": "thăm",
        "pos": "Verb",
        "note": "thăm (Động từ nơi chốn)",
        "gender": null,
        "stress": "посеща́ть / посети́ть",
        "vocab_id": "24e7450c-21f1-401a-bcd3-d6ced5336acb",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "танцева́ть",
        "vi": "nhảy múa",
        "pos": "Verb",
        "note": "nhảy múa (Động từ nơi chốn)",
        "gender": null,
        "stress": "танцева́ть",
        "vocab_id": "df07ccf8-ffaa-495f-83b5-ff6649748096",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть цирк",
        "vi": "xem xiếc",
        "pos": "Verb",
        "note": "xem xiếc (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть цирк",
        "vocab_id": "c94a70ce-83f4-40fd-b9b7-3b492adaabc3",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть живо́тных",
        "vi": "xem động vật",
        "pos": "Verb",
        "note": "xem động vật (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть живо́тных",
        "vocab_id": "9a83ed5f-76bc-4eb4-bff9-d1b28771c54f",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "смотре́ть / посмотре́ть матч",
        "vi": "xem trận đấu",
        "pos": "Verb",
        "note": "xem trận đấu (Động từ nơi chốn)",
        "gender": null,
        "stress": "смотре́ть / посмотре́ть матч",
        "vocab_id": "11fdcbb3-7c7e-4632-8a40-29642417a75f",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "игра́ть / сыгра́ть в что?",
        "vi": "chơi cái gì?",
        "pos": "Verb",
        "note": "chơi cái gì? (Động từ nơi chốn)",
        "gender": null,
        "stress": "игра́ть / сыгра́ть в что?",
        "vocab_id": "61504da0-3198-485d-9c60-78228db4d206",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "меня́ть / поменя́ть де́ньги",
        "vi": "đổi tiền",
        "pos": "Verb",
        "note": "đổi tiền (Động từ nơi chốn)",
        "gender": null,
        "stress": "меня́ть / поменя́ть де́ньги",
        "vocab_id": "cbbc3768-9109-42f0-af99-cb1bef081c9c",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "отправля́ть / отпра́вить (письмо́)",
        "vi": "gửi (thư)",
        "pos": "Verb",
        "note": "gửi (thư) (Động từ nơi chốn)",
        "gender": null,
        "stress": "отправля́ть / отпра́вить (письмо́)",
        "vocab_id": "746100da-102a-40a5-bcba-43b12b29854b",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "гуля́ть / погуля́ть",
        "vi": "đi dạo",
        "pos": "Verb",
        "note": "đi dạo (Động từ nơi chốn)",
        "gender": null,
        "stress": "гуля́ть / погуля́ть",
        "vocab_id": "e1a29c5f-30d1-4496-ad9b-5ac2ed35fb8a",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "есть / съесть",
        "vi": "ăn",
        "pos": "Verb",
        "note": "ăn (Động từ nơi chốn)",
        "gender": null,
        "stress": "есть / съесть",
        "vocab_id": "d1936fc3-d4fb-49e3-a61a-f492b810c615",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "пить / вы́пить",
        "vi": "uống",
        "pos": "Verb",
        "note": "uống (Động từ nơi chốn)",
        "gender": null,
        "stress": "пить / вы́пить",
        "vocab_id": "1d337589-d1ef-4ca0-b670-7501312b736f",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "рабо́тать",
        "vi": "làm việc",
        "pos": "Verb",
        "note": "làm việc (Động từ nơi chốn)",
        "gender": null,
        "stress": "рабо́тать",
        "vocab_id": "40d6cd80-78db-47e6-83b5-c73f5cc1cb2a",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "брать / взять (маши́ну)",
        "vi": "lấy (xe)",
        "pos": "Verb",
        "note": "lấy (xe) (Động từ nơi chốn)",
        "gender": null,
        "stress": "брать / взять (маши́ну)",
        "vocab_id": "9c43bf1b-f1b0-40e5-9e8e-700463c4022d",
        "sub_topic": "Động từ thao tác & nơi chốn"
      },
      {
        "ex": "",
        "ru": "храни́ть / сохрани́ть (маши́ну)",
        "vi": "cất (xe)",
        "pos": "Verb",
        "note": "cất (xe) (Động từ nơi chốn)",
        "gender": null,
        "stress": "храни́ть / сохрани́ть (маши́ну)",
        "vocab_id": "21754774-7335-4a76-9bd0-2708ee883fb9",
        "sub_topic": "Động từ thao tác & nơi chốn"
      }
    ]
  },
  {
    "id": "do_an_uong",
    "code": "do_an_uong",
    "name": "Đồ ăn - Đồ uống",
    "title": "Đồ ăn - Đồ uống",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Món ăn chính, món tráng miệng, hoa quả, rau củ quả, đồ uống, phương tiện chế biến và thao tác nấu ăn.",
    "icon": "🍲",
    "color": "#0039A6",
    "sub_topics": [
      "Món chính và món phụ",
      "Món tráng miệng, ăn nhẹ",
      "Hoa quả",
      "Rau củ quả",
      "Đồ uống",
      "Động từ nấu nướng & chế biến"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом, потому́ что сего́дня хочу́ съесть суп с хле́бом. (Tôi đang nấu súp bằng nồi trên bếp. Tôi nấu súp để ăn với bánh mì, vì hôm nay tôi muốn ăn súp với bánh mì.)",
        "ru": "суп",
        "vi": "súp",
        "pos": "Noun",
        "note": "súp (Món chính/phụ) | Nấu bằng: - в кастрю́ле (bằng nồi) - на сковороде́ (bằng chảo) - в рисова́рке (bằng nồi cơm điện)",
        "gender": "m",
        "stress": "суп",
        "vocab_id": "864d4459-c5ec-4912-a182-9c7c8a33321d",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой, потому́ что я обы́чно у́жинаю рисом с ры́бой. (Tôi đang nấu cơm bằng nồi cơm điện. Tôi nấu cơm để ăn với cá, vì tôi thường ăn tối bằng cơm với cá.)",
        "ru": "рис",
        "vi": "cơm",
        "pos": "Noun",
        "note": "cơm (Món chính/phụ) | Nấu bằng: ",
        "gender": "m",
        "stress": "рис",
        "vocab_id": "0c3cb11d-a702-4f43-bc90-374b839b444e",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой, потому́ что я обы́чно ем мя́со с рисом и ры́бой на у́жин. (Tôi đang luộc thịt bằng nồi trên bếp. Tôi nấu thịt để ăn với cơm và với cá, vì tôi thường ăn thịt với cơm và với cá vào bữa tối.)",
        "ru": "мя́со",
        "vi": "thịt",
        "pos": "Noun",
        "note": "thịt (Món chính/phụ) | Nấu bằng: ",
        "gender": "n",
        "stress": "мя́со",
        "vocab_id": "23e08ab5-def3-444d-aa95-ae745716f013",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом, потому́ что я обы́чно завтра́каю пельме́нями с хле́бом. (Tôi đang luộc pelmeni bằng nồi trên bếp. Tôi nấu pelmeni để ăn với bánh mì, vì tôi thường ăn sáng bằng pelmeni với bánh mì.)",
        "ru": "пельме́ни",
        "vi": "sủi cảo Nga",
        "pos": "Noun",
        "note": "sủi cảo Nga (Món chính/phụ) | Nấu bằng: ",
        "gender": "pl",
        "stress": "пельме́ни",
        "vocab_id": "4b4c6aac-b81c-4f52-875b-64dff62adf80",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы есть её на за́втрак с тёплым молоко́м, потому́ что я обы́чно завтра́каю ка́шей с тёплым молоко́м. (Tôi đang nấu cháo bằng nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm, vì tôi thường ăn sáng bằng cháo với sữa ấm.)",
        "ru": "ка́ша",
        "vi": "cháo",
        "pos": "Noun",
        "note": "cháo (Món chính/phụ) | Nấu bằng: ",
        "gender": "f",
        "stress": "ка́ша",
        "vocab_id": "e7b38283-46f8-4511-a275-c61075110847",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом, потому́ что я обы́чно обе́даю ры́бой с рисом и мя́сом. (Tôi đang rán cá bằng chảo trên bếp. Tôi nấu cá để ăn với cơm và với thịt, vì tôi thường ăn trưa bằng cá với cơm và với thịt.)",
        "ru": "ры́ба",
        "vi": "cá",
        "pos": "Noun",
        "note": "cá (Món chính/phụ) | Nấu bằng: ",
        "gender": "f",
        "stress": "ры́ба",
        "vocab_id": "f28a367a-1119-4b8c-bcf1-79b14144d419",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том, потому́ что я обы́чно ем ку́рицу с сала́том на обе́д. (Tôi đang luộc gà bằng nồi trên bếp. Tôi luộc gà để ăn với salad, vì tôi thường ăn gà với salad vào bữa trưa.)",
        "ru": "ку́рица",
        "vi": "gà",
        "pos": "Noun",
        "note": "gà (Món chính/phụ) | Nấu bằng: ",
        "gender": "f",
        "stress": "ку́рица",
        "vocab_id": "213a487d-6fd6-4343-9f9c-3dd8106c3ba9",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом, потому́ что я люблю́ есть яйца́ с хле́бом. (Tôi đang luộc trứng bằng nồi trên bếp. Tôi luộc trứng để ăn với bánh mì, vì tôi thích ăn trứng với bánh mì.)",
        "ru": "яйцо́",
        "vi": "trứng",
        "pos": "Noun",
        "note": "trứng (Món chính/phụ) | Nấu bằng: ",
        "gender": "pl",
        "stress": "яйцо́",
        "vocab_id": "27074322-608f-4acb-ba88-c40cd6eed477",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м, потому́ что я люблю́ есть сала́т с яйцо́м. (Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng, vì tôi thích ăn salad với trứng.)",
        "ru": "сала́т",
        "vi": "salad",
        "pos": "Noun",
        "note": "salad (Món chính/phụ) | Nấu bằng: ",
        "gender": "m",
        "stress": "сала́т",
        "vocab_id": "63911cb9-74d4-43ee-b9ea-77ae1832193f",
        "sub_topic": "Món chính và món phụ"
      },
      {
        "ex": "После за́втрака (1) я обы́чно переку́сываю шоколáдом с йогу́ртом. (Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua)",
        "ru": "Шокола́д",
        "vi": "So cô la",
        "pos": "Noun",
        "note": "So cô la (Tráng miệng & Ăn nhẹ)",
        "gender": "m",
        "stress": "Шокола́д",
        "vocab_id": "f45e9927-48ca-46c9-a301-299336277bf7",
        "sub_topic": "Món tráng miệng, ăn nhẹ"
      },
      {
        "ex": "Ле́том (2) я обы́чно ем моро́женое. (Vào mùa hè, tôi thường ăn kem.)",
        "ru": "Моро́женое",
        "vi": "Kem",
        "pos": "Noun",
        "note": "Kem (Tráng miệng & Ăn nhẹ)",
        "gender": "n",
        "stress": "Моро́женое",
        "vocab_id": "03995c22-f5c3-40c0-9904-ec79bdb27eb0",
        "sub_topic": "Món tráng miệng, ăn nhẹ"
      },
      {
        "ex": "На ка́ждый мой день (3) рожде́ния мама покупа́ет мне торт. (Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi)",
        "ru": "Торт",
        "vi": "Bánh kem",
        "pos": "Noun",
        "note": "Bánh kem (Tráng miệng & Ăn nhẹ)",
        "gender": "m",
        "stress": "Торт",
        "vocab_id": "d7f717df-c0e1-48a7-af23-5c4497f13007",
        "sub_topic": "Món tráng miệng, ăn nhẹ"
      },
      {
        "ex": "Я обы́чно ем йогу́рт на полдни́к. (Tôi thường ăn nhẹ sữa chua vào bữa phụ.)",
        "ru": "Йогу́рт",
        "vi": "Sữa chua",
        "pos": "Noun",
        "note": "Sữa chua (Tráng miệng & Ăn nhẹ)",
        "gender": "m",
        "stress": "Йогу́рт",
        "vocab_id": "b43b80e1-ed5e-4b55-9617-beeda97382c3",
        "sub_topic": "Món tráng miệng, ăn nhẹ"
      },
      {
        "ex": "Я мо́ю я́блоки, гру́ши и манго́, чищу́ их, а зате́м нареза́ю их, что́бы съесть. (Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.)",
        "ru": "Я́блоко",
        "vi": "táo",
        "pos": "Noun",
        "note": "táo (Hoa quả)",
        "gender": "n",
        "stress": "Я́блоко",
        "vocab_id": "84495d5f-fdab-42e5-974d-a6fc92f06e90",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я люблю́ есть груша ка́ждый день. (Tôi thích ăn lê mỗi ngày.)",
        "ru": "Гру́ша",
        "vi": "lê",
        "pos": "Noun",
        "note": "lê (Hoa quả)",
        "gender": "f",
        "stress": "Гру́ша",
        "vocab_id": "433c8a35-867d-47b7-8274-c98053ea3662",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я люблю́ есть манго ка́ждый день. (Tôi thích ăn xoài mỗi ngày.)",
        "ru": "Манго́",
        "vi": "xoài",
        "pos": "Noun",
        "note": "xoài (Hoa quả)",
        "gender": "m",
        "stress": "Манго́",
        "vocab_id": "83cffcff-3d43-42f3-b33f-1062b7ba0275",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина. (Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.)",
        "ru": "Апельси́н",
        "vi": "cam",
        "pos": "Noun",
        "note": "cam (Hoa quả)",
        "gender": "m",
        "stress": "Апельси́н",
        "vocab_id": "51e20180-5610-4d9b-bdb0-7eb3b289fa2d",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я люблю́ есть мандарин ка́ждый день. (Tôi thích ăn quýt mỗi ngày.)",
        "ru": "Мандари́н",
        "vi": "quýt",
        "pos": "Noun",
        "note": "quýt (Hoa quả)",
        "gender": "m",
        "stress": "Мандари́н",
        "vocab_id": "19109965-228e-4187-9af7-68f37b0549c9",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я люблю́ есть банан ка́ждый день. (Tôi thích ăn chuối mỗi ngày.)",
        "ru": "Бана́н",
        "vi": "chuối",
        "pos": "Noun",
        "note": "chuối (Hoa quả)",
        "gender": "m",
        "stress": "Бана́н",
        "vocab_id": "e3244185-27f6-4d90-824c-5558ddd1190f",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й. (Tôi bổ quả dưa hấu để mời khách ăn.)",
        "ru": "Арбу́з",
        "vi": "dưa hấu",
        "pos": "Noun",
        "note": "dưa hấu (Hoa quả)",
        "gender": "m",
        "stress": "Арбу́з",
        "vocab_id": "14777c3f-e795-4d99-a143-8fa3938af0e7",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Я мо́ю виногра́д и кладу́ его́ на таре́лку. (Tôi rửa sạch nho và đặt lên đĩa.)",
        "ru": "Виногра́д",
        "vi": "nho",
        "pos": "Noun",
        "note": "nho (Hoa quả)",
        "gender": "m",
        "stress": "Виногра́д",
        "vocab_id": "92c1e4a3-cac1-4ff7-bf61-3cd36ef2c9ef",
        "sub_topic": "Hoa quả"
      },
      {
        "ex": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть. (Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ.)",
        "ru": "Карто́фель",
        "vi": "khoai tây",
        "pos": "Noun",
        "note": "khoai tây (Rau củ quả) | Chế biến: rửa sạch --> gọt vỏ --> thái",
        "gender": "m",
        "stress": "Карто́фель",
        "vocab_id": "2ebcd15b-54df-4269-9dc0-83ec2f754898",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Помо́йте помидо́ры, пото́м нарежьте их и измельчи́те. (Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng.)",
        "ru": "Помидо́р",
        "vi": "cà chua",
        "pos": "Noun",
        "note": "cà chua (Rau củ quả) | Chế biến: rửa sạch --> thái --> băm nhỏ",
        "gender": "m",
        "stress": "Помидо́р",
        "vocab_id": "4552c1b8-5b22-4d01-a6cc-1cde35d73e8a",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я мо́ю карто́шку, пото́м кладу́ её в кастрю́лю с водо́й и варю́. (Tôi rửa sạch khoai, sau đó cho vào nồi cùng với nước và nấu.)",
        "ru": "Бата́т",
        "vi": "khoai lang",
        "pos": "Noun",
        "note": "khoai lang (Rau củ quả) | Chế biến: rửa sạch --> thái",
        "gender": "m",
        "stress": "Бата́т",
        "vocab_id": "bfb5a9b3-d17f-40eb-8b02-ff4a9ac7c252",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом. (Tôi đang rửa sạch dưa chuột, sau đó tôi cắt nhỏ dưa chuột bằng dao.)",
        "ru": "Огуре́ц",
        "vi": "dưa chuột",
        "pos": "Noun",
        "note": "dưa chuột (Rau củ quả) | Chế biến: rửa sạch --> thái",
        "gender": "m",
        "stress": "Огуре́ц",
        "vocab_id": "6d09113f-1787-4a8c-bf31-41db7a42d1f2",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом. (Tôi đang rửa sạch hành lá, sau đó thái nhỏ bằng dao.)",
        "ru": "Зелёный лук",
        "vi": "hành lá",
        "pos": "Noun",
        "note": "hành lá (Rau củ quả) | Chế biến: rửa sạch --> thái",
        "gender": "m",
        "stress": "Зелёный лук",
        "vocab_id": "96d657bc-ad2a-43d3-ae8b-0e5864a56af9",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом. (Tôi đang bóc vỏ hành tây, sau đó bổ chúng và băm nhỏ chúng bằng dao.)",
        "ru": "Лук",
        "vi": "hành tây",
        "pos": "Noun",
        "note": "hành tây (Rau củ quả) | Chế biến: bóc vỏ --> thái --> băm nhỏ",
        "gender": "m",
        "stress": "Лук",
        "vocab_id": "a311be04-1cac-407f-abdf-af71ee4fbdcb",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я чищу́ чесно́к, пото́м раздавлива́ю его́ но́жом и измельча́ю. (Tôi bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng.)",
        "ru": "Чесно́к",
        "vi": "tỏi",
        "pos": "Noun",
        "note": "tỏi (Rau củ quả) | Chế biến: bóc vỏ --> đập --> băm nhỏ",
        "gender": "m",
        "stress": "Чесно́к",
        "vocab_id": "8c94d8e3-6b76-47bf-a7c5-586ddca448df",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю её и нареза́ю. (Tôi đang rửa sạch bắp cải, sau đó bổ chúng và thái nhỏ chúng.)",
        "ru": "Капу́ста",
        "vi": "bắp tỏi",
        "pos": "Noun",
        "note": "bắp tỏi (Rau củ quả) | Chế biến: rửa sạch --> bổ --> thái nhỏ",
        "gender": "f",
        "stress": "Капу́ста",
        "vocab_id": "b7b15f7d-2961-43ac-81a8-dfbd36903caa",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю её и нареза́ю. (Tôi đang rửa sạch bí đỏ và gọt vỏ chúng, sau đó bổ chúng và thái nhỏ chúng.)",
        "ru": "Ты́ква",
        "vi": "bí đỏ",
        "pos": "Noun",
        "note": "bí đỏ (Rau củ quả) | Chế biến: rửa sạch --> gọt vỏ --> bổ --> thái nhỏ.",
        "gender": "f",
        "stress": "Ты́ква",
        "vocab_id": "d7b78f5f-ac35-4961-afdd-b0679299853a",
        "sub_topic": "Rau củ quả"
      },
      {
        "ex": "Я налива́ю чай в стака́н и пью чай из стака́на. (Tôi rót trà vào cốc và uống trà bằng cốc.)",
        "ru": "Чай",
        "vi": "trà",
        "pos": "Noun",
        "note": "trà (Đồ uống)",
        "gender": "m",
        "stress": "Чай",
        "vocab_id": "b16b10f9-2a99-46e3-9abd-24a269b829c1",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю молоко в стака́н и пью молоко из стака́на. (Tôi rót sữa vào cốc và uống sữa từ cốc.)",
        "ru": "Молоко́",
        "vi": "sữa",
        "pos": "Noun",
        "note": "sữa (Đồ uống)",
        "gender": "m",
        "stress": "Молоко́",
        "vocab_id": "21585116-ff26-4518-a473-0d255d319aff",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю кока-кола в стака́н и пью кока-кола из стака́на. (Tôi rót coca-cola vào cốc và uống coca-cola từ cốc.)",
        "ru": "Кока-ко́ла",
        "vi": "Coca-cola",
        "pos": "Noun",
        "note": "Coca-cola (Đồ uống)",
        "gender": "f",
        "stress": "Кока-ко́ла",
        "vocab_id": "df793e21-3b65-466a-bd07-c95e763276db",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю пиво в стака́н и пью пиво из стака́на. (Tôi rót bia vào cốc và uống bia từ cốc.)",
        "ru": "Пи́во",
        "vi": "bia",
        "pos": "Noun",
        "note": "bia (Đồ uống)",
        "gender": "n",
        "stress": "Пи́во",
        "vocab_id": "e6306cbb-2cc8-487b-88d1-5aa19232a369",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю сок в стака́н и пью сок из стака́на. (Tôi rót nước ép vào cốc và uống nước ép từ cốc.)",
        "ru": "Сок",
        "vi": "nước ép",
        "pos": "Noun",
        "note": "nước ép (Đồ uống)",
        "gender": "m",
        "stress": "Сок",
        "vocab_id": "24ae9ab5-3f71-48a1-9629-3f34a04910e0",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю вода в стака́н и пью вода из стака́на. (Tôi rót nước vào cốc và uống nước từ cốc.)",
        "ru": "Вода́",
        "vi": "nước",
        "pos": "Noun",
        "note": "nước (Đồ uống)",
        "gender": "m",
        "stress": "Вода́",
        "vocab_id": "f9fd3142-10ca-407a-9dec-230281162d39",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "Я налива́ю вино́ в ча́шку и пью вино́ из ча́шки. (Tôi rót rượu vang vào chén và uống rượu bằng chén.)",
        "ru": "Алкого́ль / Вино́",
        "vi": "rượu/ rượu vang",
        "pos": "Noun",
        "note": "rượu/ rượu vang (Đồ uống)",
        "gender": "m",
        "stress": "Алкого́ль / Вино́",
        "vocab_id": "dab0d9f2-913e-45c8-bfee-6664d91e1a17",
        "sub_topic": "Đồ uống"
      },
      {
        "ex": "",
        "ru": "гото́вить / пригото́вить",
        "vi": "nấu",
        "pos": "Verb",
        "note": "nấu (Động từ nấu ăn)",
        "gender": null,
        "stress": "гото́вить / пригото́вить",
        "vocab_id": "9c9b5d99-388e-4286-87b3-c7a18a802a7d",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "вари́ть / свари́ть",
        "vi": "luộc",
        "pos": "Verb",
        "note": "luộc (Động từ nấu ăn)",
        "gender": null,
        "stress": "вари́ть / свари́ть",
        "vocab_id": "c99173ac-54bc-424a-98fc-992b96dc0ca8",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "жа́рить / изжа́рить",
        "vi": "rán, chiên",
        "pos": "Verb",
        "note": "rán, chiên (Động từ nấu ăn)",
        "gender": null,
        "stress": "жа́рить / изжа́рить",
        "vocab_id": "f1a9ce3c-7c52-4cfb-96fb-a819a34f4e3e",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "переку́сывать / перекуси́ть",
        "vi": "ăn nhẹ",
        "pos": "Verb",
        "note": "ăn nhẹ (Động từ nấu ăn)",
        "gender": null,
        "stress": "переку́сывать / перекуси́ть",
        "vocab_id": "1a112dd4-0b91-4177-8d29-f9def0704394",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "мыть / помы́ть",
        "vi": "rửa",
        "pos": "Verb",
        "note": "rửa (Động từ nấu ăn)",
        "gender": null,
        "stress": "мыть / помы́ть",
        "vocab_id": "7b1dd164-1f9e-4f74-ac78-f21af9350899",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "чи́стить / почи́стить",
        "vi": "gọt vỏ, làm sạch",
        "pos": "Verb",
        "note": "gọt vỏ, làm sạch (Động từ nấu ăn)",
        "gender": null,
        "stress": "чи́стить / почи́стить",
        "vocab_id": "f34a3683-2d2e-4bb2-9159-bdd4117d7784",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "ре́зать — разре́зать — нареза́ть — измельча́ть",
        "vi": "cắt - cắt đôi - thái lát - băm nhỏ",
        "pos": "Verb",
        "note": "cắt - cắt đôi - thái lát - băm nhỏ (Động từ nấu ăn)",
        "gender": null,
        "stress": "ре́зать — разре́зать — нареза́ть — измельча́ть",
        "vocab_id": "089fb8d2-f82f-47d0-927d-859c1f4e849b",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "есть / съесть",
        "vi": "ăn",
        "pos": "Verb",
        "note": "ăn (Động từ nấu ăn)",
        "gender": null,
        "stress": "есть / съесть",
        "vocab_id": "62e228ca-c717-4a81-a712-ed50ece28158",
        "sub_topic": "Động từ nấu nướng & chế biến"
      },
      {
        "ex": "",
        "ru": "измельча́ть / измельчи́ть",
        "vi": "băm nhỏ, nghiền nhỏ",
        "pos": "Verb",
        "note": "băm nhỏ, nghiền nhỏ (Động từ nấu ăn)",
        "gender": null,
        "stress": "измельча́ть / измельчи́ть",
        "vocab_id": "7648b91f-c2b7-42ec-8e9d-208743343ab5",
        "sub_topic": "Động từ nấu nướng & chế biến"
      }
    ]
  },
  {
    "id": "the_thao_am_nhac",
    "code": "the_thao_am_nhac",
    "name": "Thể thao - Âm nhạc",
    "title": "Thể thao - Âm nhạc",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Các môn thể thao phổ biến, sân bãi luyện tập, các loại nhạc cụ và lớp học âm nhạc.",
    "icon": "⚽",
    "color": "#0039A6",
    "sub_topics": [
      "Các môn thể thao",
      "Dụng cụ âm nhạc"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Я сейча́с игра́ю в электро́нные и́гры на компью́тере. (Tôi đang chơi điện tử trên máy tính.)",
        "ru": "электро́нные и́гры",
        "vi": "điện tử",
        "pos": "Noun",
        "note": "điện tử (Môn thể thao) | Địa điểm: на компью́тере (trên máy tính), на телефо́не (trên điện thoại)",
        "gender": "pl",
        "stress": "электро́нные и́гры",
        "vocab_id": "0f872af8-179a-4a4c-9f25-529aa3b777d8",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в шахма́ты с дру́гом в шахма́тном клубе. (Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.)",
        "ru": "шахма́ты",
        "vi": "cờ vua",
        "pos": "Noun",
        "note": "cờ vua (Môn thể thao) | Địa điểm: до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)",
        "gender": "pl",
        "stress": "шахма́ты",
        "vocab_id": "e11bf836-1c5f-4d34-9b80-47377f13ed4a",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с занима́юсь (1) футбо́лом со свои́ми друзья́ми на футбо́льном по́ле. (Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.)",
        "ru": "футбо́л",
        "vi": "bóng đá",
        "pos": "Noun",
        "note": "bóng đá (Môn thể thao) | Địa điểm: на футбо́льном поле́ (ở sân cỏ), на футбо́льной площа́дке (ở sân bóng đá), на стадио́не (ở sân vận động)",
        "gender": "m",
        "stress": "футбо́л",
        "vocab_id": "3810e7ca-b3c4-4946-92ef-db0cb781c2ea",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке. (Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.)",
        "ru": "хокке́й",
        "vi": "khúc côn cầu",
        "pos": "Noun",
        "note": "khúc côn cầu (Môn thể thao) | Địa điểm: на хокке́йной площа́дке (ở sân khúc côn cầu)",
        "gender": "m",
        "stress": "хокке́й",
        "vocab_id": "493f85b5-95c1-496f-8775-39aee7879f16",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке. (Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.)",
        "ru": "бадминто́н",
        "vi": "cầu lồng",
        "pos": "Noun",
        "note": "cầu lồng (Môn thể thao) | Địa điểm: - на спорти́вной площа́дке (ở sân vận động đa năng) - в спортза́ле (ở phòng tập thể thao)",
        "gender": "m",
        "stress": "бадминто́н",
        "vocab_id": "6f4d7ebf-f1b2-40aa-b4e7-6d16a39d7155",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке. (Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.)",
        "ru": "насто́льный тенни́с",
        "vi": "bóng bàn",
        "pos": "Noun",
        "note": "bóng bàn (Môn thể thao) | Địa điểm: ",
        "gender": "m",
        "stress": "насто́льный тенни́с",
        "vocab_id": "dc76d694-bea0-43c3-a148-2511fa15f425",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке. (Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.)",
        "ru": "те́ннис",
        "vi": "bóng quần vợt - tennis",
        "pos": "Noun",
        "note": "bóng quần vợt - tennis (Môn thể thao) | Địa điểm: на те́ннисном ко́рте (ở sân tennis)",
        "gender": "m",
        "stress": "те́ннис",
        "vocab_id": "dc827aa9-97aa-47b2-aaec-687e2b613992",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке. (Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.)",
        "ru": "баскетбо́л",
        "vi": "bóng rổ",
        "pos": "Noun",
        "note": "bóng rổ (Môn thể thao) | Địa điểm: на баскетбо́льной площа́дке (ở sân bóng rổ)",
        "gender": "m",
        "stress": "баскетбо́л",
        "vocab_id": "0ca35216-adb3-4e14-bef8-8ffc51cdbe10",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле. (Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.)",
        "ru": "волейбо́л",
        "vi": "bóng chuyền",
        "pos": "Noun",
        "note": "bóng chuyền (Môn thể thao) | Địa điểm: ",
        "gender": "m",
        "stress": "волейбо́л",
        "vocab_id": "d201b667-8ac1-4661-bff2-d26a364a4830",
        "sub_topic": "Các môn thể thao"
      },
      {
        "ex": "Я занима́юсь на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате. (Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.)",
        "ru": "пиани́но",
        "vi": "piano",
        "pos": "Noun",
        "note": "piano (Dụng cụ âm nhạc)",
        "gender": "n",
        "stress": "пиани́но",
        "vocab_id": "dff3c6c6-84de-4dcb-b382-24055b465e66",
        "sub_topic": "Dụng cụ âm nhạc"
      },
      {
        "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клубе университе́та. (Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.)",
        "ru": "гита́ра",
        "vi": "guitar",
        "pos": "Noun",
        "note": "guitar (Dụng cụ âm nhạc)",
        "gender": "f",
        "stress": "гита́ра",
        "vocab_id": "70a7e6df-22f4-4c8d-94da-ac20b15222df",
        "sub_topic": "Dụng cụ âm nhạc"
      }
    ]
  },
  {
    "id": "con_vat",
    "code": "con_vat",
    "name": "Con vật",
    "title": "Con vật",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Vật nuôi gia súc, động vật hoang dã, loài chim biết bay và động vật dưới nước.",
    "icon": "🐾",
    "color": "#0039A6",
    "sub_topics": [
      "Vật nuôi, gia súc",
      "Động vật hoang dã",
      "Con vật biết bay",
      "Con vật biết bơi"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "Кошка до́ма. Она́ хо́дит по до́му. (Con mèo đang ở nhà. Nó đang đi quanh nhà.)",
        "ru": "Кот — Ко́шка",
        "vi": "mèo đực - mèo cái",
        "pos": "Noun",
        "note": "mèo đực - mèo cái (Vật nuôi, gia súc) | Môi trường: до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...",
        "gender": "f",
        "stress": "Кот — Ко́шка",
        "vocab_id": "b1b5c2b8-03fd-43b7-83e6-31c0c5afa4d5",
        "sub_topic": "Vật nuôi, gia súc"
      },
      {
        "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку. (Con chó đang ở công viên. Nó đang đi dạo quanh công viên.)",
        "ru": "Соба́ка",
        "vi": "chó đực,cái",
        "pos": "Noun",
        "note": "chó đực,cái (Vật nuôi, gia súc) | Môi trường: ",
        "gender": "f",
        "stress": "Соба́ка",
        "vocab_id": "15f4b760-a57f-49a9-b7d9-499a8d0ede44",
        "sub_topic": "Vật nuôi, gia súc"
      },
      {
        "ex": "Свиньи́ на фе́рме. Они́ едя́т в хлеву́. (Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.)",
        "ru": "Свинья́ (con lợn",
        "vi": "Свинья́ (con lợn",
        "pos": "Noun",
        "note": "Свинья́ (con lợn (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)",
        "gender": "m",
        "stress": "Свинья́ (con lợn",
        "vocab_id": "99d180c5-f901-4f3c-a5a9-7af9f4615768",
        "sub_topic": "Vật nuôi, gia súc"
      },
      {
        "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́. (Những con gà đang ở vườn. Chúng đang chạy quanh vườn.)",
        "ru": "Кури́ца",
        "vi": "con gà",
        "pos": "Noun",
        "note": "con gà (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)",
        "gender": "f",
        "stress": "Кури́ца",
        "vocab_id": "899a03d3-8c47-4a2e-b591-726b48760741",
        "sub_topic": "Vật nuôi, gia súc"
      },
      {
        "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле. (Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.)",
        "ru": "Коро́ва",
        "vi": "con bò",
        "pos": "Noun",
        "note": "con bò (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на поле́ (trên cánh đồng)",
        "gender": "f",
        "stress": "Коро́ва",
        "vocab_id": "431c0d98-be68-464c-b788-1a49de240d14",
        "sub_topic": "Vật nuôi, gia súc"
      },
      {
        "ex": "Медве́дь ест, а пото́м спит. (Gấu ăn, sau đó ngủ.)",
        "ru": "Медве́дь — Медве́дица",
        "vi": "gấu đực - gấu cái",
        "pos": "Noun",
        "note": "gấu đực - gấu cái (Động vật hoang dã) | Môi trường: в лесу́ (ở trong rừng)",
        "gender": "f",
        "stress": "Медве́дь — Медве́дица",
        "vocab_id": "37224e6b-4298-4a0a-a61f-e8242e7b3a70",
        "sub_topic": "Động vật hoang dã"
      },
      {
        "ex": "Тигр бега́ет по лесу́, что́бы охо́титься. (Hổ đang chạy quanh khu rừng để săn mồi.)",
        "ru": "Тигр",
        "vi": "hổ",
        "pos": "Noun",
        "note": "hổ (Động vật hoang dã) | Môi trường: ",
        "gender": "m",
        "stress": "Тигр",
        "vocab_id": "2666c34d-e820-4cb9-9bbe-7396c4f6baad",
        "sub_topic": "Động vật hoang dã"
      },
      {
        "ex": "Лев гуля́ет по лесу́. (Sư rử đang đi dạo quanh khu rừng.)",
        "ru": "Лев",
        "vi": "sư tử",
        "pos": "Noun",
        "note": "sư tử (Động vật hoang dã) | Môi trường: ",
        "gender": "m",
        "stress": "Лев",
        "vocab_id": "79ef252d-4f89-4d07-82b3-c11cd1556768",
        "sub_topic": "Động vật hoang dã"
      },
      {
        "ex": "Пти́ца лети́т по не́бу. (Con chim đang bay trên bầu trời)",
        "ru": "Пти́ца",
        "vi": "con chim",
        "pos": "Noun",
        "note": "con chim (Con vật biết bay) | Môi trường: в не́бе (trên bầu trờ), на ве́тке (trên cành cây)",
        "gender": "f",
        "stress": "Пти́ца",
        "vocab_id": "ed50c50e-380c-4718-82f6-83e17a1515a2",
        "sub_topic": "Con vật biết bay"
      },
      {
        "ex": "Попуга́й стои́т на ве́тке. (Con vẹt đang đứng trên cành cây)",
        "ru": "Попуга́й",
        "vi": "con vẹt",
        "pos": "Noun",
        "note": "con vẹt (Con vật biết bay) | Môi trường: ",
        "gender": "m",
        "stress": "Попуга́й",
        "vocab_id": "0195e893-01a5-4a12-85ec-67e689c26fb7",
        "sub_topic": "Con vật biết bay"
      },
      {
        "ex": "Ры́ба плывёт в реке́. (Con cá đang bơi ở sông.)",
        "ru": "Ры́ба",
        "vi": "cá",
        "pos": "Noun",
        "note": "cá (Con vật biết bơi) | Môi trường: в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)",
        "gender": "f",
        "stress": "Ры́ба",
        "vocab_id": "b560d935-448b-4af1-8bd7-b4e10a3dcb8b",
        "sub_topic": "Con vật biết bơi"
      }
    ]
  },
  {
    "id": "bo_phan_co_the",
    "code": "bo_phan_co_the",
    "name": "Bộ phận cơ thể người",
    "title": "Bộ phận cơ thể người",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "desc": "Các bộ phận trên khuôn mặt, thân thể và các tính từ mô tả đặc điểm hình dáng, ngoại hình.",
    "icon": "👤",
    "color": "#0039A6",
    "sub_topics": [
      "Bộ phận trên khuôn mặt",
      "Bộ phận trên cơ thể",
      "Tính từ miêu tả ngoại hình"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ex": "У меня́ больша́я голова́. (Tôi có đầu to.)",
        "ru": "голова́",
        "vi": "đầu",
        "pos": "Noun",
        "note": "đầu (Bộ phận khuôn mặt) | Miêu tả: to >< nhỏ",
        "gender": "m",
        "stress": "голова́",
        "vocab_id": "b06422c2-a090-4867-9c0a-a2f5f8720e99",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё дли́нные густы́е во́лосы. (Cô ấy có mái tóc dài dày.)",
        "ru": "во́лосы",
        "vi": "tóc",
        "pos": "Noun",
        "note": "tóc (Bộ phận khuôn mặt) | Miêu tả: dài >< ngắn, dày >< thưa",
        "gender": "pl",
        "stress": "во́лосы",
        "vocab_id": "aff89385-810c-4df0-b323-ba88d815322f",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У него́ ма́ленькое краси́вое лицо́. (Anh ấy có khuôn mặt nhỏ đẹp.)",
        "ru": "лицо́",
        "vi": "mặt",
        "pos": "Noun",
        "note": "mặt (Bộ phận khuôn mặt) | Miêu tả: đẹp, nhỏ >< to",
        "gender": "m",
        "stress": "лицо́",
        "vocab_id": "3c6af0d8-4889-405a-9210-00f7d82f84f3",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У него́ высо́кий лоб. (Anh ấy có trán cao.)",
        "ru": "лоб",
        "vi": "trán",
        "pos": "Noun",
        "note": "trán (Bộ phận khuôn mặt) | Miêu tả: cao >< thấp",
        "gender": "m",
        "stress": "лоб",
        "vocab_id": "5b5b21d1-ede2-4473-88bf-e77132f5b77b",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё гу́стые бро́ви. (Cô ấy có lông mày dày.)",
        "ru": "бро́ви",
        "vi": "2 hàng lông mày",
        "pos": "Noun",
        "note": "2 hàng lông mày (Bộ phận khuôn mặt) | Miêu tả: dày >< thưa",
        "gender": "pl",
        "stress": "бро́ви",
        "vocab_id": "c731c0c8-ee6b-442e-80d4-a76d7017ad7d",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё больши́е краси́вые глаза́. (Cô ấy có đôi mắt to đẹp.)",
        "ru": "глаза́",
        "vi": "đôi mắt",
        "pos": "Noun",
        "note": "đôi mắt (Bộ phận khuôn mặt) | Miêu tả: to >< nhỏ, đẹp",
        "gender": "m",
        "stress": "глаза́",
        "vocab_id": "4a435f9e-1c5e-4d3b-9849-6905fb2b616e",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У него́ высо́кий пря́мой нос. (Anh ấy có mũi cao thẳng.)",
        "ru": "но́с",
        "vi": "mũi",
        "pos": "Noun",
        "note": "mũi (Bộ phận khuôn mặt) | Miêu tả: cao >< thấp, thẳng",
        "gender": "m",
        "stress": "но́с",
        "vocab_id": "f190c0eb-7701-448d-ae31-1f58241d23d7",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё румя́ные щёки. (Cô ấy có đôi má hồng hào.)",
        "ru": "щёки",
        "vi": "2 bên má",
        "pos": "Noun",
        "note": "2 bên má (Bộ phận khuôn mặt) | Miêu tả: hồng hào",
        "gender": "pl",
        "stress": "щёки",
        "vocab_id": "1ab32ef6-97e5-4af8-8353-915ea2af2be9",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё ма́ленький рот. (Cô ấy có khuôn miệng nhỏ.)",
        "ru": "рот",
        "vi": "khuôn miệng",
        "pos": "Noun",
        "note": "khuôn miệng (Bộ phận khuôn mặt) | Miêu tả: nhỏ, rộng",
        "gender": "m",
        "stress": "рот",
        "vocab_id": "e3e3f5b1-bc53-423e-b1a7-6ba9bb1e2c88",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё то́нкая краси́вые гу́бы. (Cô ấy có đôi môi mỏng đẹp.)",
        "ru": "гу́бы",
        "vi": "đôi môi",
        "pos": "Noun",
        "note": "đôi môi (Bộ phận khuôn mặt) | Miêu tả: dày, mỏng, đẹp",
        "gender": "pl",
        "stress": "гу́бы",
        "vocab_id": "33c19abf-3db8-4958-9861-2dbabc907a94",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У неё бе́лые здоро́вые зу́бы. (Cô ấy có hàm răng trắng khỏe.)",
        "ru": "зу́бы",
        "vi": "hàm răng",
        "pos": "Noun",
        "note": "hàm răng (Bộ phận khuôn mặt) | Miêu tả: trắng, đẹp, khỏe",
        "gender": "pl",
        "stress": "зу́бы",
        "vocab_id": "499e6113-0e44-4e51-b080-28c4f232c42e",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У него́ ма́ленькие у́ши. (Anh ấy có đôi tai nhỏ.)",
        "ru": "у́ши",
        "vi": "đôi tai",
        "pos": "Noun",
        "note": "đôi tai (Bộ phận khuôn mặt) | Miêu tả: nhỏ, to",
        "gender": "pl",
        "stress": "у́ши",
        "vocab_id": "61f24497-f107-455d-8bd2-2c5112dd16ad",
        "sub_topic": "Bộ phận trên khuôn mặt"
      },
      {
        "ex": "У меня́ больша́я голова́. (Tôi có đầu to.)",
        "ru": "голова́",
        "vi": "đầu",
        "pos": "Noun",
        "note": "đầu (Bộ phận cơ thể) | Miêu tả: to >< nhỏ",
        "gender": "m",
        "stress": "голова́",
        "vocab_id": "b4c024f7-ea48-49f4-a9bf-29c7ba64552c",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "У неё здоро́вые и си́льные ру́ки. (Cô ấy có đôi tay khỏe và mạnh mẽ.)",
        "ru": "ле́вая рука́ >< пра́вая рука́ - руки́",
        "vi": "tay trái >< tay phải - hai tay",
        "pos": "Noun",
        "note": "tay trái >< tay phải - hai tay (Bộ phận cơ thể) | Miêu tả: khỏe mạnh mẽ",
        "gender": "m",
        "stress": "ле́вая рука́ >< пра́вая рука́ - руки́",
        "vocab_id": "d0cff6c6-63c1-4843-a531-2fbef2554454",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "У него́ здоро́вые и си́льные но́ги. (Anh ấy có đôi chân khỏe và mạnh mẽ)",
        "ru": "ле́вая нога́ >< пра́вая нога́ - ноги́",
        "vi": "chân trái >< chân phải - hai chân",
        "pos": "Noun",
        "note": "chân trái >< chân phải - hai chân (Bộ phận cơ thể) | Miêu tả: ",
        "gender": "m",
        "stress": "ле́вая нога́ >< пра́вая нога́ - ноги́",
        "vocab_id": "eeaa9174-fa00-43be-aa90-6f2cafa0c141",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "У меня́ боли́т грудь. (Tôi đang đau ngực.)",
        "ru": "грудь",
        "vi": "ngực",
        "pos": "Noun",
        "note": "ngực (Bộ phận cơ thể) | Miêu tả: ",
        "gender": "f",
        "stress": "грудь",
        "vocab_id": "5188040e-c0c4-4024-8b16-fdb58a58e52f",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "У меня́ о́чень боли́т живо́т. (Tôi đang rất đau bụng)",
        "ru": "живо́т",
        "vi": "bụng",
        "pos": "Noun",
        "note": "bụng (Bộ phận cơ thể) | Miêu tả: ",
        "gender": "m",
        "stress": "живо́т",
        "vocab_id": "4b04a4a3-29b1-4893-a7f0-0833a6f6b5a1",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "У него́ то́лстая и широ́кая спина́. (Anh ấy có tấm lưng dày và rộng.)",
        "ru": "спина́",
        "vi": "lưng",
        "pos": "Noun",
        "note": "lưng (Bộ phận cơ thể) | Miêu tả: dày >< mỏng, rộng >< hẹp",
        "gender": "m",
        "stress": "спина́",
        "vocab_id": "d15c2193-d872-40c1-be38-10cb927349c0",
        "sub_topic": "Bộ phận trên cơ thể"
      },
      {
        "ex": "",
        "ru": "большо́й >< ма́ленький",
        "vi": "to >< nhỏ",
        "pos": "Adj",
        "note": "to >< nhỏ (Tính từ miêu tả)",
        "gender": "m",
        "stress": "большо́й >< ма́ленький",
        "vocab_id": "4555d447-694e-4a4f-971e-d9c47ef4b76a",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "дли́нный >< коро́ткий",
        "vi": "dài >< ngắn",
        "pos": "Adj",
        "note": "dài >< ngắn (Tính từ miêu tả)",
        "gender": "m",
        "stress": "дли́нный >< коро́ткий",
        "vocab_id": "5393af0e-c04e-4c59-b028-b556cf9d8893",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "густо́й >< ре́дкий",
        "vi": "dày >< thưa (nhấn mạnh mật độ, số lượng của vật)",
        "pos": "Adj",
        "note": "dày >< thưa (nhấn mạnh mật độ, số lượng của vật) (Tính từ miêu tả)",
        "gender": "m",
        "stress": "густо́й >< ре́дкий",
        "vocab_id": "a299082b-2f7d-4993-b305-af6f01818f05",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "высо́кий >< ни́зкий",
        "vi": "cao >< thấp",
        "pos": "Adj",
        "note": "cao >< thấp (Tính từ miêu tả)",
        "gender": "m",
        "stress": "высо́кий >< ни́зкий",
        "vocab_id": "5f08ff90-36c5-4ba0-bbc1-81fb3f672735",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "прямо́й",
        "vi": "thẳng",
        "pos": "Adj",
        "note": "thẳng (Tính từ miêu tả)",
        "gender": "m",
        "stress": "прямо́й",
        "vocab_id": "3044f72d-b8fa-4541-8e4f-4ea21ca4df6e",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "румя́ный",
        "vi": "hồng hào",
        "pos": "Adj",
        "note": "hồng hào (Tính từ miêu tả)",
        "gender": "m",
        "stress": "румя́ный",
        "vocab_id": "ebf1ede1-9b80-4899-bf87-25d6e07cd5aa",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "краси́вый",
        "vi": "đẹp",
        "pos": "Adj",
        "note": "đẹp (Tính từ miêu tả)",
        "gender": "m",
        "stress": "краси́вый",
        "vocab_id": "64fdd68b-5a9a-4749-845a-20c7eea0fc99",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "широ́кий >< у́зкий",
        "vi": "rộng >< hẹp",
        "pos": "Adj",
        "note": "rộng >< hẹp (Tính từ miêu tả)",
        "gender": "m",
        "stress": "широ́кий >< у́зкий",
        "vocab_id": "c7a2cbb4-3361-4b06-8b72-40cad4ecb4b3",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "то́лстый >< то́нкий",
        "vi": "dày >< mỏng (nhấn mạnh độ dày, độ lớn theo chiều ngang của vật)",
        "pos": "Adj",
        "note": "dày >< mỏng (nhấn mạnh độ dày, độ lớn theo chiều ngang của vật) (Tính từ miêu tả)",
        "gender": "m",
        "stress": "то́лстый >< то́нкий",
        "vocab_id": "1898476f-afd9-4a65-8b66-ba9585fb69d2",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "здоро́вый",
        "vi": "khỏe mạnh",
        "pos": "Adj",
        "note": "khỏe mạnh (Tính từ miêu tả)",
        "gender": "m",
        "stress": "здоро́вый",
        "vocab_id": "ee02037b-de59-4790-9e0c-a80011f36b60",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      },
      {
        "ex": "",
        "ru": "си́льный",
        "vi": "mạnh",
        "pos": "Adj",
        "note": "mạnh (Tính từ miêu tả)",
        "gender": "m",
        "stress": "си́льный",
        "vocab_id": "e9b1f30b-bcbd-4e1e-a59e-21392d42a974",
        "sub_topic": "Tính từ miêu tả ngoại hình"
      }
    ]
  },
  {
    "id": "jar_dorm",
    "name": "Lọ ký túc xá & phòng ở",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "desc": "Cuộc sống tự lập ở KTX Nga: chìa khóa, nội quy, giặt giũ, nấu nướng.",
    "icon": "building-2",
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
    "icon": "utensils",
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
    "icon": "train",
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
    "icon": "credit-card",
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
    "icon": "package-order",
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
    "icon": "pill",
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
    "icon": "graduation-cap",
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
    "icon": "train",
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
    "icon": "graduation-cap",
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
    "icon": "briefcase",
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
    "icon": "newspaper",
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

const GRAMMAR_LESSONS = [
  {
    "id": "accusative",
    "title": "Винительный падеж (Cách 4)",
    "vi": "Cách đối tượng — mua gì? xem gì?",
    "topic": "Chủ đề liên quan: Mua sắm",
    "rules": [
      "Cách 4 dùng cho tân ngữ trực tiếp: Я покупаю хлеб (tôi mua bánh mì).",
      "Danh từ nam vô tri (đồ vật): giữ nguyên. Я покупаю хлеб, сыр.",
      "Danh từ nữ: -а → -у, -я → -ю. книга → книгу, куртка → куртку.",
      "Danh từ trung: không đổi. Я пью молоко."
    ],
    "table": {
      "head": [
        "Nguyên mẫu",
        "Cách 4",
        "Ví dụ"
      ],
      "rows": [
        [
          "книга (nữ)",
          "книгу",
          "Я читаю книгу."
        ],
        [
          "куртка (nữ)",
          "куртку",
          "Я покупаю куртку."
        ],
        [
          "хлеб (nam)",
          "хлеб",
          "Я покупаю хлеб."
        ],
        [
          "молоко (trung)",
          "молоко",
          "Я пью молоко."
        ]
      ]
    },
    "questions": [
      {
        "a": 1,
        "q": "Я читаю ___. (книга)",
        "ex": "Danh từ nữ -а → -у ở cách 4: книгу.",
        "options": [
          "книга",
          "книгу",
          "книге",
          "книги"
        ]
      },
      {
        "a": 1,
        "q": "Я покупаю ___. (куртка)",
        "ex": "куртка → куртку.",
        "options": [
          "куртка",
          "куртку",
          "куртке",
          "куртки"
        ]
      },
      {
        "a": 0,
        "q": "Я пью ___. (молоко)",
        "ex": "Danh từ trung không đổi ở cách 4.",
        "options": [
          "молоко",
          "молоку",
          "молока",
          "молоке"
        ]
      },
      {
        "a": 0,
        "q": "Я вижу ___. (чемодан)",
        "ex": "Danh từ nam vô tri giữ nguyên.",
        "options": [
          "чемодан",
          "чемодану",
          "чемодана",
          "чемодане"
        ]
      }
    ]
  },
  {
    "id": "aspect",
    "title": "Вид глагола: делать / сделать",
    "vi": "Thể chưa hoàn thành / hoàn thành",
    "topic": "Chủ đề liên quan: Mua sắm, Xếp vali",
    "rules": [
      "Chưa hoàn thành (НСВ): quá trình, lặp lại — собирать чемодан, покупать хлеб.",
      "Hoàn thành (СВ): kết quả, một lần — собрать чемодан, купить хлеб.",
      "Только СВ dùng cho quá khứ kết quả: Вчера я купил хлеб. (đã mua xong)",
      "Только НСВ dùng cho hiện tại: Сейчас я покупаю хлеб."
    ],
    "table": {
      "head": [
        "НСВ (quá trình)",
        "СВ (kết quả)",
        "Ví dụ СВ"
      ],
      "rows": [
        [
          "собирать",
          "собрать",
          "Я собрал чемодан."
        ],
        [
          "покупать",
          "купить",
          "Я купил молоко."
        ],
        [
          "делать",
          "сделать",
          "Я сделал задание."
        ],
        [
          "готовить",
          "приготовить",
          "Мама приготовила суп."
        ]
      ]
    },
    "questions": [
      {
        "a": 0,
        "q": "Вчера я ___ хлеб и молоко.",
        "ex": "Quá khứ có kết quả → СВ: купил.",
        "options": [
          "купил",
          "покупаю",
          "куплю",
          "покупал бы"
        ]
      },
      {
        "a": 1,
        "q": "Сейчас я ___ суп.",
        "ex": "Hiện tại → chỉ НСВ: готовлю.",
        "options": [
          "приготовил",
          "готовлю",
          "приготовлю",
          "готов"
        ]
      },
      {
        "a": 0,
        "q": "Завтра я ___ чемодан.",
        "ex": "Tương lai một lần → СВ: соберу.",
        "options": [
          "соберу",
          "собираю",
          "собирал",
          "буду собирать"
        ]
      },
      {
        "a": 0,
        "q": "Мама уже ___ суп.",
        "ex": "«уже» = đã xong → СВ: приготовила.",
        "options": [
          "приготовила",
          "готовит",
          "готовит ещё",
          "готовить"
        ]
      }
    ]
  },
  {
    "id": "gender",
    "title": "Род существительных",
    "vi": "Giống của danh từ",
    "topic": "Chủ đề liên quan: Chuẩn bị hành lý",
    "rules": [
      "Danh từ giống nam: thường kết thúc bằng phụ âm (паспорт, чемодан, аэропорт).",
      "Danh từ giống nữ: kết thúc bằng -а / -я (виза, одежда, касса).",
      "Danh từ giống trung: kết thúc bằng -о / -е (молоко, общежитие, расписание).",
      "Tính từ phải hòa hợp với giống của danh từ: тёплый чай, тёплая куртка, тёплое молоко."
    ],
    "table": {
      "head": [
        "Giống",
        "Kết thúc",
        "Ví dụ"
      ],
      "rows": [
        [
          "Nam (он)",
          "phụ âm",
          "чемодан, паспорт, суп"
        ],
        [
          "Nữ (она)",
          "-а / -я",
          "виза, одежда, касса"
        ],
        [
          "Trung (оно)",
          "-о / -е",
          "молоко, общежитие"
        ]
      ]
    },
    "questions": [
      {
        "a": 1,
        "q": "«виза» là danh từ giống gì?",
        "ex": "Kết thúc bằng -а → giống nữ.",
        "options": [
          "Nam",
          "Nữ",
          "Trung",
          "Không có giống"
        ]
      },
      {
        "a": 2,
        "q": "«общежитие» là danh từ giống gì?",
        "ex": "Kết thúc bằng -е → giống trung.",
        "options": [
          "Nam",
          "Nữ",
          "Trung",
          "Số nhiều"
        ]
      },
      {
        "a": 1,
        "q": "Điền tính từ đúng: тёплая ___.",
        "ex": "тёплая + danh từ nữ (куртка).",
        "options": [
          "чай",
          "куртка",
          "молоко",
          "чемодан"
        ]
      },
      {
        "a": 2,
        "q": "«молоко» là danh từ giống gì?",
        "ex": "Kết thúc bằng -о → giống trung.",
        "options": [
          "Nam",
          "Nữ",
          "Trung",
          "Không có giống"
        ]
      }
    ]
  },
  {
    "id": "motion",
    "title": "Глаголы движения: идти / ехать",
    "vi": "Động từ chuyển động: đi bộ / đi xe",
    "topic": "Chủ đề liên quan: Cả series",
    "rules": [
      "идти (đi bộ): Я иду в университет. (gần, đi bộ)",
      "ехать (đi xe): Я еду в аэропорт. (xa, đi xe/máy bay)",
      "Плыть (đi thuyền): Мы плывём на пароме.",
      "Quá khứ: шла/шёл (đi bộ), ехала/ехал (đi xe)."
    ],
    "table": {
      "head": [
        "Hiện tại",
        "Quá khứ",
        "Nghĩa"
      ],
      "rows": [
        [
          "иду, идёшь, идут",
          "шла / шёл",
          "đi bộ"
        ],
        [
          "еду, едешь, едут",
          "ехала / ехал",
          "đi xe"
        ],
        [
          "плыву, плывёшь",
          "плыла / плыл",
          "đi thuyền"
        ]
      ]
    },
    "questions": [
      {
        "a": 0,
        "q": "Университет рядом, я ___ туда каждый день.",
        "ex": "Gần → đi bộ → иду.",
        "options": [
          "иду",
          "еду",
          "лечу",
          "плыву"
        ]
      },
      {
        "a": 1,
        "q": "Аэропорт далеко, поэтому я ___ на такси.",
        "ex": "Đi taxi → ехать → еду.",
        "options": [
          "иду",
          "еду",
          "бегу",
          "хожу"
        ]
      },
      {
        "a": 1,
        "q": "Вчера мы ___ в Москву на поезде.",
        "ex": "Tàu hỏa → ехали.",
        "options": [
          "шли",
          "ехали",
          "плыли",
          "летели"
        ]
      },
      {
        "a": 0,
        "q": "Анна ___ в аэропорт пешком.",
        "ex": "пешком = đi bộ → идёт.",
        "options": [
          "идёт",
          "едет",
          "плывёт",
          "летит"
        ]
      }
    ]
  },
  {
    "id": "prepositional",
    "title": "Предложный падеж (Cách 6)",
    "vi": "Cách nơi chốn — ở đâu?",
    "topic": "Chủ đề liên quan: Nhập học, Mua sắm",
    "rules": [
      "Dùng để chỉ nơi chốn, luôn đi với giới từ В (trong) hoặc НА (trên): Где? — ở đâu?",
      "Danh từ thêm -е: в университете, в магазине, в самолёте.",
      "Danh từ nữ -а/-я → -е: в кассе... nhưng -ия → -ии: в России.",
      "Ví dụ mẫu: Я живу в общежитии. Я покупаю хлеб в магазине."
    ],
    "table": {
      "head": [
        "Nguyên mẫu",
        "Cách 6 (ở đâu?)",
        "Nghĩa"
      ],
      "rows": [
        [
          "университет",
          "в университете",
          "ở trường đại học"
        ],
        [
          "магазин",
          "в магазине",
          "ở cửa hàng"
        ],
        [
          "общежитие",
          "в общежитии",
          "ở ký túc xá"
        ],
        [
          "самолёт",
          "в самолёте",
          "trên máy bay"
        ]
      ]
    },
    "questions": [
      {
        "a": 1,
        "q": "Я живу в ___. (общежитие)",
        "ex": "-ие → -ии: в общежитии.",
        "options": [
          "общежитие",
          "общежитии",
          "общежитию",
          "общежития"
        ]
      },
      {
        "a": 2,
        "q": "Я покупаю хлеб в ___. (магазин)",
        "ex": "в магазине — nơi mua sắm.",
        "options": [
          "магазин",
          "магазина",
          "магазине",
          "магазину"
        ]
      },
      {
        "a": 2,
        "q": "Сейчас мы в ___. (самолёт)",
        "ex": "в самолёте — trên máy bay.",
        "options": [
          "самолёт",
          "самолёта",
          "самолёте",
          "самолёту"
        ]
      },
      {
        "a": 1,
        "q": "Анна учится в ___. (университет)",
        "ex": "в университете.",
        "options": [
          "университет",
          "университете",
          "университета",
          "университету"
        ]
      }
    ]
  }
];

const LISTENING_LESSONS = [
  {
    "id": "lis-airport",
    "title": "Ở sân bay",
    "vi": "Ở sân bay — làm thủ tục, kiểm tra an ninh",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "airport",
    "categoryName": "Sân bay & Du lịch",
    "estMinutes": 12,
    "icon": "✈️",
    "partNumber": 1,
    "is_pro_only": false,
    "lines": [
      {
        "ru": "Ваш паспорт и билет, пожалуйста.",
        "vi": "Xin hộ chiếu và vé của anh/chị.",
        "who": "Nhân viên"
      },
      {
        "ru": "Вот, пожалуйста.",
        "vi": "Đây ạ.",
        "who": "Аня"
      },
      {
        "ru": "У вас есть багаж?",
        "vi": "Anh/chị có hành lý ký gửi không?",
        "who": "Nhân viên"
      },
      {
        "ru": "Да, один чемодан. Это ручная кладь.",
        "vi": "Có, một vali. Còn đây là hành lý xách tay.",
        "who": "Аня"
      },
      {
        "ru": "Ваше место — 21А. Рейс с пересадкой в Москве.",
        "vi": "Chỗ của anh/chị là 21A. Chuyến có quá cảnh ở Moskva.",
        "who": "Nhân viên"
      },
      {
        "ru": "Спасибо! А где паспортный контроль?",
        "vi": "Cảm ơn! Còn kiểm tra hộ chiếu ở đâu ạ?",
        "who": "Аня"
      },
      {
        "ru": "Там, направо. Ваш рейс через два часа.",
        "vi": "Bên kia, bên phải. Chuyến của anh/chị còn hai tiếng nữa.",
        "who": "Nhân viên"
      }
    ],
    "blanks": [
      {
        "hint": "hộ chiếu",
        "after": "и билет, пожалуйста.",
        "blank": "паспорт",
        "before": "Ваш"
      },
      {
        "hint": "hành lý ký gửi",
        "after": "?",
        "blank": "багаж",
        "before": "У вас есть"
      },
      {
        "hint": "hành lý xách tay",
        "after": ".",
        "blank": "ручная кладь",
        "before": "Это"
      },
      {
        "hint": "chỗ ngồi",
        "after": "— 21А.",
        "blank": "место",
        "before": "Ваше"
      },
      {
        "hint": "quá cảnh",
        "after": "в Москве.",
        "blank": "пересадкой",
        "before": "Рейс с"
      }
    ],
    "dictation": [
      "Вот, пожалуйста.",
      "У вас есть багаж?",
      "Спасибо! А где паспортный контроль?"
    ],
    "questions": [
      {
        "a": 1,
        "q": "Chỗ ngồi của Anya là số nào?",
        "options": [
          "12Б",
          "21А",
          "21Б",
          "20А"
        ]
      },
      {
        "a": 1,
        "q": "Chuyến bay của Anya có điểm gì đặc biệt?",
        "options": [
          "Bay thẳng",
          "Quá cảnh ở Moskva",
          "Bị hoãn",
          "Bay đêm"
        ]
      },
      {
        "a": 1,
        "q": "Anya có mấy vali ký gửi?",
        "options": [
          "Không có",
          "Một",
          "Hai",
          "Ba"
        ]
      },
      {
        "a": 2,
        "q": "Kiểm tra hộ chiếu ở đâu?",
        "options": [
          "Bên trái",
          "Đi thẳng",
          "Bên phải",
          "Ở tầng hai"
        ]
      }
    ]
  },
  {
    "id": "lis-shop",
    "title": "В магазине",
    "vi": "Ở siêu thị — hỏi giá hàng & thanh toán",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "shop",
    "categoryName": "Mua sắm & Siêu thị",
    "estMinutes": 12,
    "icon": "🛒",
    "partNumber": 1,
    "is_pro_only": false,
    "lines": [
      {
        "ru": "Извините, сколько стоит хлеб?",
        "vi": "Xin lỗi, bánh mì giá bao nhiêu ạ?",
        "who": "Аня"
      },
      {
        "ru": "Хлеб стоит 50 рублей.",
        "vi": "Bánh mì giá 50 rúp.",
        "who": "Nhân viên"
      },
      {
        "ru": "Хорошо, я беру хлеб. И молоко тоже есть?",
        "vi": "Được ạ, tôi lấy bánh mì. Còn có sữa không ạ?",
        "who": "Аня"
      },
      {
        "ru": "Конечно. Молоко вон там, слева.",
        "vi": "Tất nhiên. Sữa ở kia, bên trái.",
        "who": "Nhân viên"
      },
      {
        "ru": "Спасибо большое!",
        "vi": "Cảm ơn nhiều ạ!",
        "who": "Аня"
      },
      {
        "ru": "Платите на кассе, пожалуйста. Всего доброго!",
        "vi": "Xin thanh toán ở quầy thu ngân. Chào tạm biệt!",
        "who": "Nhân viên"
      }
    ],
    "blanks": [
      {
        "hint": "giá là",
        "after": "хлеб?",
        "blank": "стоит",
        "before": "Сколько"
      },
      {
        "hint": "50 rúp",
        "after": ".",
        "blank": "50 рублей",
        "before": "Хлеб стоит"
      },
      {
        "hint": "bên trái",
        "after": ".",
        "blank": "слева",
        "before": "Молоко вон там,"
      },
      {
        "hint": "quầy thu ngân",
        "after": ", пожалуйста.",
        "blank": "кассе",
        "before": "Платите на"
      }
    ],
    "dictation": [
      "Сколько стоит хлеб?",
      "Хорошо, я беру хлеб.",
      "Спасибо большое!"
    ],
    "questions": [
      {
        "a": 1,
        "q": "Bánh mì giá bao nhiêu?",
        "options": [
          "15 rúp",
          "50 rúp",
          "50 kopek",
          "100 rúp"
        ]
      },
      {
        "a": 1,
        "q": "Sữa ở đâu trong cửa hàng?",
        "options": [
          "Bên phải",
          "Bên trái",
          "Ở quầy thu ngân",
          "Tầng hai"
        ]
      },
      {
        "a": 2,
        "q": "Khách thanh toán ở đâu?",
        "options": [
          "Tại chỗ",
          "Ở cửa ra",
          "Ở quầy thu ngân (касса)",
          "Gửi tiền trước"
        ]
      }
    ]
  },
  {
    "id": "lis-dorm",
    "title": "В общежитии",
    "vi": "Tại ký túc xá — nhận chìa khóa, nội quy sinh hoạt",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "dorm",
    "categoryName": "Ký túc xá & Đời sống",
    "estMinutes": 15,
    "icon": "🏢",
    "partNumber": 2,
    "is_pro_only": false,
    "lines": [
      {
        "ru": "Здравствуйте! Вот ваш ключ от комнаты 412.",
        "vi": "Chào em! Đây là chìa khóa phòng 412 của em.",
        "who": "Комендант"
      },
      {
        "ru": "Спасибо! А на каком этаже прачечная?",
        "vi": "Cảm ơn cô! Còn phòng giặt là ở tầng mấy ạ?",
        "who": "Студент"
      },
      {
        "ru": "Прачечная на цокольном этаже, работает с восьми утра до десяти вечера.",
        "vi": "Phòng giặt ở tầng bán hầm, mở từ 8h sáng tới 10h tối.",
        "who": "Комендант"
      },
      {
        "ru": "Нужно ли записываться заранее?",
        "vi": "Có cần đăng ký trước không ạ?",
        "who": "Студент"
      },
      {
        "ru": "Да, журнал записи лежит у дежурного на вахте.",
        "vi": "Có, sổ đăng ký để ở chỗ bảo vệ trực cổng.",
        "who": "Комендант"
      },
      {
        "ru": "Понятно, спасибо за информацию!",
        "vi": "Em hiểu rồi, cảm ơn cô đã hướng dẫn!",
        "who": "Студент"
      }
    ],
    "blanks": [
      {
        "hint": "phòng",
        "after": "412.",
        "blank": "комнаты",
        "before": "Вот ваш ключ от"
      },
      {
        "hint": "bán hầm",
        "after": "этаже.",
        "blank": "цокольном",
        "before": "Прачечная на"
      },
      {
        "hint": "người trực",
        "after": "на вахте.",
        "blank": "дежурного",
        "before": "Журнал записи лежит у"
      }
    ],
    "dictation": [
      "Вот ваш ключ от комнаты 412.",
      "Прачечная на цокольном этаже.",
      "Спасибо за информацию!"
    ],
    "questions": [
      {
        "a": 1,
        "q": "Phòng của sinh viên ở số mấy?",
        "options": [
          "312",
          "412",
          "512",
          "214"
        ]
      },
      {
        "a": 2,
        "q": "Phòng giặt là mở cửa đến mấy giờ?",
        "options": [
          "Đến 20:00",
          "Đến 21:00",
          "Đến 22:00 (mười giờ tối)",
          "Mở 24/7"
        ]
      },
      {
        "a": 2,
        "q": "Sổ đăng ký giặt nằm ở đâu?",
        "options": [
          "Trong phòng sinh viên",
          "Ở phòng dekanat",
          "Ở quầy trực bảo vệ (вахта)",
          "Trên tầng 4"
        ]
      }
    ]
  },
  {
    "id": "lis-cafe",
    "title": "В кафе «Теремок»",
    "vi": "Tại quán ăn Nga — gọi bánh xèo blini & nước uống",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "cafe",
    "categoryName": "Ẩm thực & Quán ăn",
    "estMinutes": 15,
    "icon": "🥞",
    "partNumber": 2,
    "is_pro_only": false,
    "lines": [
      {
        "ru": "Добрый день! Что будете заказывать?",
        "vi": "Kính chào quý khách! Quý khách muốn dùng gì ạ?",
        "who": "Кассир"
      },
      {
        "ru": "Мне, пожалуйста, блин с ветчиной и сыром, и тарелку борща.",
        "vi": "Cho tôi một bánh blini kẹp giăm bông phô mai và một bát súp củ dền borscht.",
        "who": "Аня"
      },
      {
        "ru": "Сметану к борщу добавить?",
        "vi": "Có cho thêm váng sữa smetana vào súp không ạ?",
        "who": "Кассир"
      },
      {
        "ru": "Да, обязательно. И горячий морс, пожалуйста.",
        "vi": "Vâng, chắc chắn rồi ạ. Và một ly nước ép quả mọng nóng nữa.",
        "who": "Аня"
      },
      {
        "ru": "С вас 480 рублей. Оплата картой?",
        "vi": "Của bạn hết 480 rúp. Bạn thanh toán thẻ chứ ạ?",
        "who": "Кассир"
      },
      {
        "ru": "Да, приложила карту. Спасибо!",
        "vi": "Vâng, tôi đã chạm thẻ. Cảm ơn bạn!",
        "who": "Аня"
      }
    ],
    "blanks": [
      {
        "hint": "bánh xèo blini",
        "after": "с ветчиной и сыром.",
        "blank": "блин",
        "before": "Мне, пожалуйста,"
      },
      {
        "hint": "thêm vào",
        "after": "?",
        "blank": "добавить",
        "before": "Сметану к борщу"
      },
      {
        "hint": "nước quả mọng",
        "after": ", пожалуйста.",
        "blank": "морс",
        "before": "И горячий"
      }
    ],
    "dictation": [
      "Что будете заказывать?",
      "Мне, пожалуйста, тарелку борща.",
      "С вас 480 рублей."
    ],
    "questions": [
      {
        "a": 2,
        "q": "Anya gọi loại bánh xèo blini nào?",
        "options": [
          "Nhân ngọt mật ong",
          "Nhân cá hồi",
          "Nhân giăm bông & phô mai",
          "Nhân nấm"
        ]
      },
      {
        "a": 2,
        "q": "Món đồ uống nào được gọi kèm?",
        "options": [
          "Trà đen",
          "Cà phê sữa",
          "Mors nóng (nước quả mọng)",
          "Nước khoáng"
        ]
      },
      {
        "a": 1,
        "q": "Tổng số tiền bữa ăn là bao nhiêu?",
        "options": [
          "350 rúp",
          "480 rúp",
          "520 rúp",
          "600 rúp"
        ]
      }
    ]
  },
  {
    "id": "lis-campus",
    "title": "В деканате и библиотеке",
    "vi": "Tại phòng giáo vụ & thư viện — làm thẻ bạn đọc",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "campus",
    "categoryName": "Trường học & Thư viện",
    "estMinutes": 18,
    "icon": "📚",
    "partNumber": 3,
    "is_pro_only": true,
    "lines": [
      {
        "ru": "Здравствуйте! Для оформления читательского билета нужен студенческий билет и одна фотография.",
        "vi": "Chào bạn! Để làm thẻ thư viện cần thẻ sinh viên và một tấm ảnh.",
        "who": "Сотрудник"
      },
      {
        "ru": "Вот документы. Скажите, на какой срок выдаются учебники?",
        "vi": "Đây là giấy tờ ạ. Xin hỏi giáo trình được mượn trong bao lâu?",
        "who": "Студент"
      },
      {
        "ru": "Учебная литература выдаётся на весь семестр, а художественная — на две недели с правом продления.",
        "vi": "Sách giáo trình được mượn trọn học kỳ, còn tác phẩm văn học là 2 tuần và có thể gia hạn.",
        "who": "Сотрудник"
      },
      {
        "ru": "Есть ли доступ к электронным базам данных?",
        "vi": "Thư viện có quyền truy cập cơ sở dữ liệu điện tử không ạ?",
        "who": "Студент"
      },
      {
        "ru": "Да, логин и пароль вы получите по университетской электронной почте.",
        "vi": "Có, bạn sẽ nhận được tài khoản và mật khẩu qua email sinh viên của trường.",
        "who": "Сотрудник"
      }
    ],
    "blanks": [
      {
        "hint": "thẻ bạn đọc",
        "after": "нужен студенческий.",
        "blank": "читательского билета",
        "before": "Для оформления"
      },
      {
        "hint": "học kỳ",
        "after": ".",
        "blank": "семестр",
        "before": "Учебная литература выдаётся на весь"
      },
      {
        "hint": "cơ sở dữ liệu",
        "after": "?",
        "blank": "базам данных",
        "before": "Есть ли доступ к электронным"
      }
    ],
    "dictation": [
      "Для оформления читательского билета нужен студенческий.",
      "Учебная литература выдаётся на весь семестр.",
      "Логин и пароль вы получите по почте."
    ],
    "questions": [
      {
        "a": 1,
        "q": "Giấy tờ nào cần thiết để làm thẻ thư viện?",
        "options": [
          "Hộ chiếu và visa",
          "Thẻ sinh viên và một bức ảnh",
          "Học bạ THPT",
          "Giấy khám sức khỏe"
        ]
      },
      {
        "a": 2,
        "q": "Sách giáo trình được mượn trong thời hạn bao lâu?",
        "options": [
          "1 tháng",
          "2 tuần",
          "Suốt cả học kỳ",
          "1 năm"
        ]
      },
      {
        "a": 2,
        "q": "Thông tin đăng nhập thư viện số được gửi qua đâu?",
        "options": [
          "Qua tin nhắn SMS",
          "Trực tiếp qua thư ký",
          "Qua email của trường",
          "Qua Zalo"
        ]
      }
    ]
  },
  {
    "id": "lis-metro",
    "title": "Объявления в метро",
    "vi": "Thông báo trên tàu điện ngầm Moskva — đổi tuyến & hướng đi",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "metro",
    "categoryName": "Giao thông công cộng",
    "estMinutes": 15,
    "icon": "🚇",
    "partNumber": 3,
    "is_pro_only": true,
    "lines": [
      {
        "ru": "Осторожно, двери закрываются. Следующая станция — «Театральная».",
        "vi": "Xin chú ý, cửa đang đóng. Ga tiếp theo là «Teatralnaya».",
        "who": "Диктор"
      },
      {
        "ru": "Станция «Театральная». Переход на станции «Охотный ряд» и «Площадь Революции».",
        "vi": "Ga «Teatralnaya». Chuyển sang tuyến ga «Okhotny Ryad» và ga «Quảng trường Cách mạng».",
        "who": "Диктор"
      },
      {
        "ru": "Молодой человек, вы выходите на следующей станции?",
        "vi": "Bạn trẻ ơi, bạn có xuống ở ga tiếp theo không?",
        "who": "Пассажир"
      },
      {
        "ru": "Да, выхожу. Проходите, пожалуйста.",
        "vi": "Dạ có, cháu xuống ạ. Xin mời bác đi lên trước.",
        "who": "Студент"
      }
    ],
    "blanks": [
      {
        "hint": "cửa đang đóng",
        "after": ".",
        "blank": "двери закрываются",
        "before": "Осторожно,"
      },
      {
        "hint": "tên ga chuyển",
        "after": ".",
        "blank": "Охотный ряд",
        "before": "Переход на станции"
      },
      {
        "hint": "tiếp theo",
        "after": "станции?",
        "blank": "следующей",
        "before": "Вы выходите на"
      }
    ],
    "dictation": [
      "Осторожно, двери закрываются.",
      "Следующая станция — Театральная.",
      "Переход на станцию Охотный ряд."
    ],
    "questions": [
      {
        "a": 1,
        "q": "Câu nói quen thuộc của loa phát thanh tàu điện ngầm là gì?",
        "options": [
          "Поезд прибывает",
          "Осторожно, двери закрываются",
          "Вход свободный",
          "Конечная остановка"
        ]
      },
      {
        "a": 1,
        "q": "Ở ga Teatralnaya có thể chuyển sang tuyến ga nào?",
        "options": [
          "Arbatskaya",
          "Okhotny Ryad & Ploshchad Revolyutsii",
          "Universitet",
          "VDNKh"
        ]
      },
      {
        "a": 1,
        "q": "Hành khách thường hỏi câu gì khi chuẩn bị xuống ga đông người?",
        "options": [
          "Сколько времени?",
          "Вы выходите на следующей станции?",
          "Где метро?",
          "Как дела?"
        ]
      }
    ]
  },
  {
    "id": "lis-interview",
    "title": "Интервью о космонавтике",
    "vi": "Phỏng vấn giáo sư Đại học Quốc gia Nga — ngành vũ trụ",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "category": "interview",
    "categoryName": "Phỏng vấn chuyên sâu",
    "estMinutes": 20,
    "icon": "🚀",
    "partNumber": 4,
    "is_pro_only": true,
    "lines": [
      {
        "ru": "Здравствуйте, уважаемые радиослушатели! Сегодня наш гость — профессор МГУ, специалист по астрофизике.",
        "vi": "Kính chào quý thính giả! Vị khách hôm nay là giáo sư MGU, chuyên gia vật lý thiên văn.",
        "who": "Ведущий"
      },
      {
        "ru": "Добрый день! Освоение космоса остаётся одним из главных приоритетов фундаментальной науки в России.",
        "vi": "Chào quý vị! Chinh phục không gian vẫn là một trong những ưu tiên hàng đầu của khoa học cơ bản tại Nga.",
        "who": "Профессор"
      },
      {
        "ru": "Какие перспективы открываются для иностранных студентов, обучающихся по техническим специальностям?",
        "vi": "Có những triển vọng nào mở ra cho sinh viên quốc tế theo học các khối ngành kỹ thuật?",
        "who": "Ведущий"
      },
      {
        "ru": "Наши лаборатории оснащены новейшим оборудованием, и студенты имеют доступ к реальным спутниковым данным.",
        "vi": "Phòng thí nghiệm của chúng tôi trang bị thiết bị hiện đại nhất, sinh viên được tiếp cận dữ liệu vệ tinh thực tế.",
        "who": "Профессор"
      },
      {
        "ru": "Благодарим вас за содержательную и вдохновляющую беседу!",
        "vi": "Xin chân thành cảm ơn giáo sư vì buổi đàm thoại sâu sắc và đầy cảm hứng!",
        "who": "Ведущий"
      }
    ],
    "blanks": [
      {
        "hint": "ưu tiên",
        "after": "науки.",
        "blank": "приоритетов",
        "before": "Освоение космоса остаётся одним из главных"
      },
      {
        "hint": "dữ liệu vệ tinh",
        "after": ".",
        "blank": "спутниковым данным",
        "before": "Студенты имеют доступ к реальным"
      },
      {
        "hint": "sâu sắc, bổ ích",
        "after": "беседу!",
        "blank": "содержательную",
        "before": "Благодарим вас за"
      }
    ],
    "dictation": [
      "Освоение космоса остаётся главным приоритетом науки.",
      "Наши лаборатории оснащены новейшим оборудованием.",
      "Студенты имеют доступ к реальным данным."
    ],
    "questions": [
      {
        "a": 1,
        "q": "Chuyên môn nghiên cứu của giáo sư là gì?",
        "options": [
          "Lịch sử văn học",
          "Vật lý thiên văn & vũ trụ",
          "Kinh tế đối ngoại",
          "Y sinh"
        ]
      },
      {
        "a": 1,
        "q": "Sinh viên ngành kỹ thuật có cơ hội tiếp cận điều gì?",
        "options": [
          "Chỉ lý thuyết sách giáo khoa",
          "Dữ liệu vệ tinh thực tế và phòng lab hiện đại",
          "Chuyến bay vũ trụ du lịch",
          "Thực tập ở nước ngoài"
        ]
      },
      {
        "a": 2,
        "q": "Nhận xét của người dẫn chương trình về cuộc trò chuyện là gì?",
        "options": [
          "Nhàm chán",
          "Khó hiểu",
          "Sâu sắc và truyền cảm hứng (содержательная и вдохновляющая)",
          "Quá ngắn"
        ]
      }
    ]
  }
];

const SPEAKING_SETS = [
  {
    "id": "sp-basic",
    "title": "Chào hỏi",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "greeting",
    "categoryName": "Chào hỏi cơ bản",
    "phonemeTarget": "Luyện âm ngắt và trọng âm cơ bản: [прив'эт], [зват']",
    "icon": "🤝",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Привет! Меня зовут Аня.",
        "vi": "Chào bạn! Mình tên là Anya."
      },
      {
        "ru": "Очень приятно познакомиться!",
        "vi": "Rất vui được làm quen với bạn!"
      },
      {
        "ru": "Я студентка из Вьетнама.",
        "vi": "Mình là sinh viên đến từ Việt Nam."
      },
      {
        "ru": "Я изучаю русский язык в университете.",
        "vi": "Mình đang học tiếng Nga tại trường đại học."
      },
      {
        "ru": "Как вас зовут?",
        "vi": "Bạn tên là gì ạ?"
      },
      {
        "ru": "Спасибо большое, до свидания!",
        "vi": "Cảm ơn nhiều, tạm biệt bạn!"
      }
    ]
  },
  {
    "id": "sp-campus",
    "title": "Ở trường học & Ký túc xá",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "campus",
    "categoryName": "Ký túc xá & Trường học",
    "phonemeTarget": "Phân biệt phụ âm [ж] và [ш]: [апщ'ижыт'ийэ], [страхофка]",
    "icon": "🎓",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Я живу в студенческом общежитии на четвёртом этаже.",
        "vi": "Tôi sống ở ký túc xá sinh viên trên tầng bốn."
      },
      {
        "ru": "Сегодня у нашей группы медосмотр в поликлинике.",
        "vi": "Hôm nay nhóm chúng tôi có buổi khám sức khỏe ở phòng khám."
      },
      {
        "ru": "Подскажите, пожалуйста, где находится деканат?",
        "vi": "Xin hỏi phòng giáo vụ (dekanat) nằm ở đâu ạ?"
      },
      {
        "ru": "У меня есть годовая медицинская страховка.",
        "vi": "Tôi có thẻ bảo hiểm y tế thời hạn một năm."
      },
      {
        "ru": "Когда начинается первая пара по расписанию?",
        "vi": "Khi nào tiết học đầu tiên bắt đầu theo thời khóa biểu?"
      },
      {
        "ru": "Мне нужно взять учебники в библиотеке.",
        "vi": "Tôi cần mượn giáo trình trong thư viện."
      }
    ]
  },
  {
    "id": "sp-dining",
    "title": "Gọi món & Ẩm thực Nga",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "dining",
    "categoryName": "Gọi món & Quán ăn",
    "phonemeTarget": "Luyện nguyên âm căng [ы]: [сыр], [рыба], [быстро]",
    "icon": "🍽️",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Дайте, пожалуйста, меню на русском языке.",
        "vi": "Xin vui lòng cho tôi xem thực đơn tiếng Nga."
      },
      {
        "ru": "Что вы посоветуете из традиционных русских блюд?",
        "vi": "Bạn có gợi ý món nào trong ẩm thực truyền thống Nga không?"
      },
      {
        "ru": "Я хочу заказать тарелку горячего борща и блинчики.",
        "vi": "Tôi muốn gọi một đĩa súp củ dền nóng và bánh blini."
      },
      {
        "ru": "Принесите, пожалуйста, счёт.",
        "vi": "Xin vui lòng mang cho tôi hóa đơn tính tiền."
      },
      {
        "ru": "Всё было очень вкусно, спасибо шеф-повару!",
        "vi": "Mọi món đều rất ngon, cảm ơn đầu bếp!"
      }
    ]
  },
  {
    "id": "sp-direction",
    "title": "Hỏi đường & Đi lại ở Moskva",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "direction",
    "categoryName": "Hỏi đường & Giao thông",
    "phonemeTarget": "Phát âm chuẩn âm rung [р]: [красная], [площад'], [переход]",
    "icon": "🗺️",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Извините, как быстрее добраться до Красной площади?",
        "vi": "Xin lỗi, làm cách nào nhanh nhất đến Quảng trường Đỏ?"
      },
      {
        "ru": "Вам нужно доехать на метро до станции Охотный ряд.",
        "vi": "Bạn cần đi tàu điện ngầm tới ga Okhotny Ryad."
      },
      {
        "ru": "Где здесь вход в метро и переход на другую линию?",
        "vi": "Ở đây lối vào tàu điện ngầm và lối chuyển tuyến ở đâu ạ?"
      },
      {
        "ru": "Вы можете пополнить карту Тройка в автомате.",
        "vi": "Bạn có thể nạp tiền vào thẻ Troika tại cây bán vé tự động."
      },
      {
        "ru": "Идите прямо два квартала, затем поверните направо.",
        "vi": "Hãy đi thẳng hai khối nhà, sau đó rẽ phải."
      }
    ]
  },
  {
    "id": "sp-presentation",
    "title": "Thuyết trình & Ý kiến học thuật",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "category": "academic",
    "categoryName": "Thuyết trình học thuật",
    "phonemeTarget": "Ngữ điệu khẳng định IK-1 và nghi vấn IK-3 chuẩn ngữ âm Nga",
    "icon": "🎤",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Тема моего сегодняшнего доклада посвящена развитию науки.",
        "vi": "Chủ đề bài báo cáo hôm nay của tôi dành cho sự phát triển khoa học."
      },
      {
        "ru": "Позвольте обратить ваше внимание на приведённые графики.",
        "vi": "Cho phép tôi hướng sự chú ý của quý vị vào các biểu đồ dưới đây."
      },
      {
        "ru": "Исходя из полученных данных, мы можем сделать следующий вывод.",
        "vi": "Xuất phát từ các dữ liệu thu được, chúng ta có thể rút ra kết luận sau."
      },
      {
        "ru": "Я готов ответить на все ваши вопросы и комментарии.",
        "vi": "Tôi sẵn sàng giải đáp tất cả câu hỏi và đóng góp ý kiến của quý vị."
      },
      {
        "ru": "Благодарю аудиторию за проявленное внимание и интерес!",
        "vi": "Xin chân thành cảm ơn khán phòng đã quan tâm theo dõi!"
      }
    ]
  },
  {
    "id": "sp-travel",
    "title": "Ở sân bay & Trên chuyến bay",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "travel",
    "categoryName": "Du lịch & Sân bay",
    "phonemeTarget": "Luyện phát âm phụ âm mềm [л'], [р'], [т']: [б'ил'эт], [м'эста]",
    "icon": "✈️",
    "is_pro_only": false,
    "items": [
      {
        "ru": "Вот мой паспорт и посадочный талон.",
        "vi": "Đây là hộ chiếu và thẻ lên máy bay của tôi."
      },
      {
        "ru": "У меня только один чемодан и ручная кладь.",
        "vi": "Tôi chỉ có một vali và hành lý xách tay."
      },
      {
        "ru": "Подскажите, где паспортный контроль?",
        "vi": "Xin hỏi kiểm tra hộ chiếu ở đâu ạ?"
      },
      {
        "ru": "Я лечу в Москву с пересадкой.",
        "vi": "Tôi bay tới Moskva có điểm quá cảnh."
      },
      {
        "ru": "Моё место двадцать один А около окна.",
        "vi": "Chỗ của tôi là 21A cạnh cửa sổ."
      },
      {
        "ru": "Спасибо за помощь, всего доброго!",
        "vi": "Cảm ơn bạn đã hỗ trợ, chúc mọi điều tốt lành!"
      }
    ]
  }
];

const WRITING_TASKS = [
  {
    "id": "w1",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "intro",
    "categoryName": "Tự giới thiệu",
    "icon": "📝",
    "estMinutes": 15,
    "title": "Tự giới thiệu",
    "prompt": "Расскажите о себе: как вас зовут, откуда вы, где вы живёте и что вы изучаете. (4–6 câu)",
    "vi": "Giới thiệu về bản thân: tên, quê quán, đang sống ở đâu, đang học gì. (4–6 câu)",
    "minWords": 20,
    "suggested_words": [
      "Меня зовут",
      "Я из Вьетнама",
      "Я студент",
      "Я изучаю",
      "Я живу в Москве"
    ],
    "tips": [
      "Dùng cấu trúc: Меня зовут... (tôi tên là...)",
      "Dùng Я живу в... + cách 6 (в общежитии, в Ханое)",
      "Dùng Я изучаю + cách 4 (русский язык)"
    ],
    "model": "Меня зовут Минь. Я из Вьетнама. Сейчас я живу в общежитии в Москве. Я студент первого курса. Я изучаю русский язык. Я очень рад, что я в России!",
    "is_pro_only": false
  },
  {
    "id": "w2",
    "level": "A1",
    "levelName": "Sơ cấp A1",
    "category": "daily",
    "categoryName": "Sinh hoạt hằng ngày",
    "icon": "⏰",
    "estMinutes": 15,
    "title": "Mô tả một ngày của bạn (Мой день)",
    "prompt": "Напишите о вашем дне: во сколько вы встаёте, что вы делаете утром, днём и вечером.",
    "vi": "Viết về một ngày của bạn: mấy giờ dậy, buổi sáng/trưa/tối làm gì.",
    "minWords": 30,
    "suggested_words": [
      "утром",
      "завтракать",
      "университет",
      "библиотека",
      "готовить ужин"
    ],
    "tips": [
      "Dùng trạng từ thời gian: утром, днём, вечером",
      "Dùng động từ: вставать, завтракать, учиться, готовить, смотреть",
      "Dùng «сначала... потом...» (đầu tiên... sau đó...)"
    ],
    "model": "Я встаю в семь часов. Сначала я завтракаю: я ем хлеб с сыром и пью чай. Потом я иду в университет. Днём я занимаюсь в библиотеке. Вечером я готовлю ужин и смотрю фильм.",
    "is_pro_only": false
  },
  {
    "id": "w3",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "letter",
    "categoryName": "Email & Thư từ",
    "icon": "✉️",
    "estMinutes": 25,
    "title": "Thư cho bạn kể về chuyến du lịch Peterburg",
    "prompt": "Напишите другу письмо о вашей поездке в Санкт-Петербург: что вы видели, какая была погода, что вам больше всего понравилось. (8–10 câu)",
    "vi": "Viết thư cho bạn kể về chuyến đi Sankt-Peterburg: đã tham quan gì, thời tiết ra sao, thích điều gì nhất.",
    "minWords": 50,
    "suggested_words": [
      "Дорогой друг",
      "Северная столица",
      "Эрмитаж",
      "Белые ночи",
      "Незабываемо"
    ],
    "tips": [
      "Mở thư: Здравствуй, дорогой друг! / Как твои дела?",
      "Dùng quá khứ hoàn thành СВ: посетил, увидел, сфотографировал",
      "Bày tỏ cảm xúc: Это произвело на меня огромное впечатление"
    ],
    "model": "Здравствуй, Денис! На прошлых выходных я ездил в Санкт-Петербург. Это потрясающий город с богатой историей. Погода была солнечной и тёплой. Я побывал в Эрмитаже и увидел шедевры мирового искусства. Вечером мы катались на теплоходе по рекам и каналам и любовались разводными мостами. Петербург оставил незабываемые впечатления! А как твои дела? Напиши мне. До скорой встречи!",
    "is_pro_only": false
  },
  {
    "id": "w4",
    "level": "B1",
    "levelName": "Trung cấp B1",
    "category": "essay",
    "categoryName": "Nghị luận xã hội",
    "icon": "🏅",
    "estMinutes": 25,
    "title": "Nghị luận: Thể thao và lối sống lành mạnh của sinh viên",
    "prompt": "Напишите небольшой текст о спорте в жизни студента: почему важно заниматься физической культурой при высокой учебной нагрузке? (70–90 từ)",
    "vi": "Viết đoạn văn về thể thao trong đời sống sinh viên: vì sao rèn luyện thân thể quan trọng khi áp lực học tập cao?",
    "minWords": 60,
    "suggested_words": [
      "здоровый образ жизни",
      "учебная нагрузка",
      "заниматься спортом",
      "энергия и бодрость",
      "по моему мнению"
    ],
    "tips": [
      "Dùng từ nối lập luận: Во-первых, во-вторых, кроме того, следовательно",
      "Nêu dẫn chứng bản thân: Например, я играю в волейбол два раза в неделю",
      "Kết luận khẳng định tầm quan trọng của thể dục"
    ],
    "model": "Спорт играет ключевую роль в жизни современного студента. Учёба в университете требует огромных интеллектуальных усилий и связана со стрессом. Физические упражнения помогают не только поддерживать тело в тонусе, но и отлично снимают умственную усталость. Например, регулярные пробежки или игра в волейбол заряжают энергией и улучшают концентрацию. По моему мнению, каждый студент должен находить время для спорта, ведь здоровье — основа будущих успехов.",
    "is_pro_only": false
  },
  {
    "id": "w5",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "photo",
    "categoryName": "Tả tranh bối cảnh",
    "icon": "🖼️",
    "estMinutes": 20,
    "title": "Tả tranh: Buổi sáng ở ký túc xá",
    "prompt": "Опишите картинку: комната общежития, за столом сидят студенты, пьют чай и готовятся к экзамену. (6–8 câu)",
    "vi": "Mô tả bức tranh: phòng ký túc xá, sinh viên ngồi quanh bàn uống trà và ôn thi. (6–8 câu)",
    "minWords": 35,
    "suggested_words": [
      "на картинке видно",
      "за столом",
      "готовятся к тесту",
      "пьют горячий чай",
      "дружная атмосфера"
    ],
    "tips": [
      "Mở đầu bằng: На этой фотографии я вижу...",
      "Sử dụng vị trí nơi chốn: справа, слева, в центре, на столе",
      "Dùng thì hiện tại của động từ: сидят, разговаривают, читают"
    ],
    "model": "На этой фотографии я вижу уютную комнату в студенческом общежитии. В центре комнаты стоит большой стол. За столом сидят двое студентов. Они пьют горячий чай и читают учебник по русскому языку. Справа на столе лежит ноутбук и словарь. Студенты готовятся к трудному экзамену. В комнате царит тёплая и дружеская атмосфера.",
    "is_pro_only": false
  },
  {
    "id": "w6",
    "level": "A2",
    "levelName": "Cơ bản A2",
    "category": "letter",
    "categoryName": "Tin nhắn & Ghi chú",
    "icon": "📌",
    "estMinutes": 20,
    "title": "Viết mẩu giấy để lại cho bạn cùng phòng (Записка)",
    "prompt": "Напишите записку соседу по комнате: вы ушли в библиотеку, вернётесь в 18:00, попросите его купить хлеб и молоко. (4–5 câu)",
    "vi": "Viết mẩu giấy cho bạn cùng phòng: bạn đi thư viện, 18h về, nhờ bạn mua bánh mì và sữa.",
    "minWords": 30,
    "suggested_words": [
      "Привет!",
      "Я ушёл в библиотеку",
      "Купи, пожалуйста",
      "Вернусь в",
      "Спасибо!"
    ],
    "tips": [
      "Chào thân mật: Привет,... / Здравствуй,...",
      "Dùng thể mệnh lệnh lịch sự: Купи, пожалуйста... / Не забудь...",
      "Ký tên ở cuối mẩu giấy"
    ],
    "model": "Привет, Антон! Я ушёл в университетскую библиотеку заниматься. Я вернусь домой около шести часов вечера. Купи, пожалуйста, в магазине свежий хлеб и пакет молока. Деньги лежат на столе около ноутбука. Большое спасибо! До вечера, Минь.",
    "is_pro_only": false
  },
  {
    "id": "w7",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "category": "essay",
    "categoryName": "Luận học thuật",
    "icon": "🤖",
    "estMinutes": 30,
    "title": "Bài luận học thuật: Trí tuệ nhân tạo (AI) trong giáo dục",
    "prompt": "Напишите эссе на тему: «Плюсы и минусы использования искусственного интеллекта в университетском образовании». Аргументируйте свою позицию. (100–120 từ)",
    "vi": "Viết bài luận: «Ưu và nhược điểm của việc ứng dụng AI trong giáo dục đại học». Lập luận bảo vệ quan điểm.",
    "minWords": 90,
    "suggested_words": [
      "искусственный интеллект",
      "автоматизация",
      "критическое мышление",
      "с одной стороны",
      "с другой стороны",
      "в заключение"
    ],
    "tips": [
      "Cấu trúc học thuật: Đặt vấn đề (Введение) -> 2 luận điểm đối lập -> Kết luận tổng hòa",
      "Dùng quán ngữ học thuật: Нельзя отрицать тот факт, что... / Возникает вопрос...",
      "Giữ thái độ khách quan, khoa học"
    ],
    "model": "Внедрение искусственного интеллекта в систему высшего образования вызывает оживлённые научные дискуссии. С одной стороны, интеллектуальные алгоритмы открывают невероятные возможности: они персонализируют процесс обучения, мгновенно проверяют задания и помогают находить релевантную научную литературу. С другой стороны, чрезмерное доверие нейросетям может снизить уровень критического мышления студентов и привести к плагиату. В заключение хочу подчеркнуть, что искусственный интеллект должен служить эффективным инструментом исследователя, но не заменять живой творческий поиск и глубокий самостоятельный анализ.",
    "is_pro_only": false
  },
  {
    "id": "w8",
    "level": "B2",
    "levelName": "Nâng cao B2",
    "category": "letter",
    "categoryName": "Thư ứng tuyển",
    "icon": "💼",
    "estMinutes": 30,
    "title": "Thư động lực ứng tuyển thực tập sinh IT (Мотивационное письмо)",
    "prompt": "Напишите официальное мотивационное письмо в компанию для прохождения стажировки: образование, навыки, почему именно вы подходите на эту роль. (90–110 từ)",
    "vi": "Viết thư động lực trang trọng xin thực tập tại công ty: học vấn, kỹ năng, vì sao bạn phù hợp với vị trí.",
    "minWords": 80,
    "suggested_words": [
      "Уважаемые господа",
      "прошу рассмотреть мою кандидатуру",
      "профессиональные навыки",
      "готов внести вклад",
      "С уважением"
    ],
    "tips": [
      "Văn phong hành chính công vụ trang trọng: Уважаемый(ая)... / С уважением",
      "Khẳng định điểm mạnh và sự nhiệt huyết đối với dự án",
      "Lời kết mong đợi buổi phỏng vấn trực tiếp"
    ],
    "model": "Уважаемый руководитель отдела кадров! Прошу рассмотреть мою кандидатуру на позицию стажёра-разработчика. В настоящее время я обучаюсь на третьем курсе факультета вычислительной математики. В ходе учёбы я успешно освоил современные языки программирования и участвовал в командной разработке веб-сервисов. Меня вдохновляют инновационные проекты вашей компании, и я готов применить свои знания для решения практических задач. Буду искренне признателен за возможность пройти личное собеседование. С уважением, Нгуен Ван Минь.",
    "is_pro_only": false
  }
];

const SHOP_PRODUCTS = [
  {
    "id": "alenka-100g",
    "title": "Socola Alenka truyền thống 100g",
    "name": "Socola Alenka truyền thống 100g",
    "category": "banh_keo",
    "categoryName": "Bánh kẹo Nga",
    "badge": "Bán chạy",
    "price": 45000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80",
    "desc": "Socola sữa béo ngậy biểu tượng nước Nga từ năm 1965, hình em bé quấn khăn quen thuộc."
  },
  {
    "id": "korovka-waffle",
    "title": "Bánh xốp sữa bò Korovka 150g",
    "name": "Bánh xốp sữa bò Korovka 150g",
    "category": "banh_keo",
    "categoryName": "Bánh kẹo Nga",
    "badge": "",
    "price": 55000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    "desc": "Bánh xốp giòn rụm ngậy vị sữa tươi đun cô đặc vùng nông thôn Nga, hoàn hảo khi thưởng trà."
  },
  {
    "id": "mishka-kosolapy",
    "title": "Kẹo gấu Mishka Kosolapy Nga 250g",
    "name": "Kẹo gấu Mishka Kosolapy Nga 250g",
    "category": "banh_keo",
    "categoryName": "Bánh kẹo Nga",
    "badge": "Truyền thống",
    "price": 85000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80",
    "desc": "Kẹo socola hạnh nhân giòn tan gắn liền với kiệt tác hội họa 'Buổi sáng trong rừng thông'."
  },
  {
    "id": "siberia-cream",
    "title": "Kem dưỡng ẩm thảo mộc Siberia 75ml",
    "name": "Kem dưỡng ẩm thảo mộc Siberia 75ml",
    "category": "my_pham",
    "categoryName": "Mỹ phẩm Siberia",
    "badge": "Thảo mộc",
    "price": 120000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "desc": "Chiết xuất hắc mai biển và tinh dầu thông tuyết Taiga, chống nẻ và dưỡng da mềm mịn mùa đông."
  },
  {
    "id": "babushka-shampoo",
    "title": "Dầu gội thảo dược Bà già Agafia 350ml",
    "name": "Dầu gội thảo dược Bà già Agafia 350ml",
    "category": "my_pham",
    "categoryName": "Mỹ phẩm Siberia",
    "badge": "Organic",
    "price": 175000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    "desc": "Công thức cổ truyền 37 loại thảo mộc vùng Taiga, kích thích mọc tóc và nuôi dưỡng chân tóc dày khỏe."
  },
  {
    "id": "cheburashka-plush",
    "title": "Gấu bông Cheburashka tai to 20cm",
    "name": "Gấu bông Cheburashka tai to 20cm",
    "category": "luu_niem",
    "categoryName": "Quà lưu niệm Nga",
    "badge": "",
    "price": 210000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    "desc": "Nhân vật hoạt hình quốc dân Nga với đôi tai to ngộ nghĩnh, chất lông mịn cao cấp an toàn."
  },
  {
    "id": "matryoshka-5pcs",
    "title": "Búp bê Matryoshka vẽ tay truyền thống 5 lớp",
    "name": "Búp bê Matryoshka vẽ tay truyền thống 5 lớp",
    "category": "luu_niem",
    "categoryName": "Quà lưu niệm Nga",
    "badge": "Thủ công",
    "price": 290000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1572945753563-804f5e5d6674?auto=format&fit=crop&w=600&q=80",
    "desc": "Gỗ bồ đề tự nhiên mài thủ công, sơn bóng hoa văn hoa cúc rực rỡ, biểu tượng may mắn gia đình."
  },
  {
    "id": "dich-thuat-nga",
    "title": "Dịch thuật công chứng hồ sơ sang tiếng Nga",
    "name": "Dịch thuật công chứng hồ sơ sang tiếng Nga",
    "category": "dich_vu_du_hoc",
    "categoryName": "Dịch vụ Du học Nga",
    "badge": "",
    "price": 350000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    "desc": "Dịch chuẩn xác học bạ, bằng tốt nghiệp, lý lịch tư pháp bởi dịch giả chuyên ngữ có dấu công chứng tư pháp."
  },
  {
    "id": "tuvan-duhoc",
    "title": "Gói tư vấn & hỗ trợ hồ sơ Du học Nga",
    "name": "Gói tư vấn & hỗ trợ hồ sơ Du học Nga",
    "category": "dich_vu_du_hoc",
    "categoryName": "Dịch vụ Du học Nga",
    "badge": "Hot",
    "price": 1500000,
    "origPrice": 0,
    "rating": 5,
    "sold": 100,
    "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    "desc": "Định hướng chọn trường top (MGU, HSE, SPbGU), tối ưu bài luận và nộp hồ sơ chuẩn chỉ tiêu 1000 suất."
  }
];

const PACKAGES = [
  {
    "id": "pro_6m",
    "badge": "6 THÁNG",
    "title": "Gói Bứt Phá 6 Tháng",
    "desc": "Phù hợp cho học viên ôn thi cấp tốc chuẩn bị du học hoặc thi chứng chỉ ТЭУ/ТБУ.",
    "price": 299000,
    "priceOld": 590000,
    "popular": false,
    "features": [
      "Mở khóa toàn bộ ngân hàng đề thi ТРКИ A1, A2",
      "Đáp án giải thích ngữ pháp chi tiết từng câu",
      "Luyện nghe 4 Part CEFR không giới hạn",
      "Tạo không giới hạn Lọ từ vựng cá nhân",
      "Phát hiện & sửa lỗi phát âm AI"
    ]
  },
  {
    "id": "pro_1y",
    "badge": "1 NĂM",
    "title": "Gói Chuyên Nghiệp 1 Năm",
    "desc": "Lựa chọn hàng đầu cho sinh viên chuẩn bị sang Nga học dự bị và đại học.",
    "price": 499000,
    "priceOld": 990000,
    "popular": true,
    "features": [
      "Mở khóa TOÀN BỘ ngân hàng đề thi ТРКИ A1, A2, B1, B2",
      "Phân tích chuyên sâu đề thi & dự đoán điểm đỗ",
      "Chấm bài tự luận Viết (Письмо) có nhận xét của giảng viên",
      "Kho 100+ Lọ từ vựng chuyên ngành (Y khoa, Kỹ thuật, Kinh tế)",
      "Ưu tiên hỗ trợ hồ sơ học bổng Du học Nga",
      "Hỗ trợ 1-1 qua nhóm Zalo VIP"
    ]
  },
  {
    "id": "pro_vip",
    "badge": "TRỌN ĐỜI",
    "title": "Gói VIP Trọn Đời",
    "desc": "Đồng hành trọn vẹn suốt 4-6 năm học tập và sinh sống tại Liên bang Nga.",
    "price": 899000,
    "priceOld": 1800000,
    "popular": false,
    "features": [
      "Tất cả quyền lợi của gói 1 Năm vĩnh viễn",
      "Cập nhật miễn phí đề thi ТРКИ mới nhất mỗi năm",
      "Tặng Voucher 500k khi đặt dịch vụ du học & visa Nga",
      "Tặng Hộp quà Nga đặc biệt (Socola Alenka + Trà Ivan-chay)",
      "Cố vấn học thuật trực tiếp định kỳ"
    ]
  }
];

const TOPIC_ARTICLES = {
  "nghe_nghiep": {
    "intro": "Chủ đề Nghề nghiệp và việc làm trong tiếng Nga gắn liền với các câu hỏi cửa miệng như «Кто вы по профессии?» hay «Кем вы работаете?». Để giao tiếp tự nhiên trong môi trường học tập và công sở tại Nga, bạn cần thành thạo quy tắc biến đổi Cách 5 (Творительный падеж) khi nói về nghề nghiệp và biết cách gọi tên các chức danh chuyên môn chuẩn xác.",
    "dialogues": [
      {
        "speaker": "Артём",
        "role": "Kỹ sư trẻ",
        "ru": "Здравствуйте! Меня зовут Артём. Я работаю инженером-программистом в технологической компании.",
        "vi": "Xin chào! Tôi tên là Artyom. Tôi làm kỹ sư lập trình tại một công ty công nghệ."
      },
      {
        "speaker": "Анна",
        "role": "Bác sĩ thực tập",
        "ru": "Очень приятно! А я — Анна. Я окончила медицинский университет и сейчас работаю врачом в больнице.",
        "vi": "Rất vui được làm quen! Còn tôi là Anna. Tôi đã tốt nghiệp đại học y và hiện đang làm bác sĩ tại bệnh viện."
      },
      {
        "speaker": "Артём",
        "role": "Kỹ sư trẻ",
        "ru": "Это благородная и сложная профессия! Сколько часов длится ваша смена?",
        "vi": "Đó là một nghề rất cao quý và vất vả! Ca trực của bạn kéo dài bao nhiêu tiếng?"
      },
      {
        "speaker": "Анна",
        "role": "Bác sĩ thực tập",
        "ru": "Обычно двенадцать часов. Но я очень люблю свою работу и хочу стать отличным хирургом.",
        "vi": "Thường là 12 tiếng. Nhưng tôi rất yêu công việc của mình và muốn trở thành một bác sĩ phẫu thuật xuất sắc."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cách 5 với động từ «работать» (Làm nghề gì)",
        "content": "• Cấu trúc: «работать + кем?» (Cách 5 - Творительный падеж).\n• Giống đực: инжене́р → инжене́ром, преподава́тель → преподава́телем.\n• Giống cái: врач → врачо́м (dùng chung cho cả nam và nữ), студе́нтка → студе́нткой."
      },
      {
        "title": "2. Phân biệt «Кто вы по профессии?» và «Кем вы работаете?»",
        "content": "• «Кто вы по профессии?» hỏi về ngành nghề bạn được đào tạo chuyên môn: «По профессии я переводчик».\n• «Кем вы работаете?» hỏi về công việc thực tế bạn đang làm: «Сейчас я работаю менеджером»."
      }
    ],
    "culturalTip": "Tại Nga, khi xưng hô với thầy cô giáo, bác sĩ, giáo sư hoặc đối tác làm việc, bạn luôn phải dùng Tên gọi + Tên đệm cha (Имя и Отчество), ví dụ: Иван Сергеевич, Елена Васильевна, kết hợp với đại từ tôn kính «Вы»."
  },
  "quan_ao": {
    "intro": "Thời tiết tại Liên bang Nga thay đổi rõ rệt giữa mùa hè ấm áp và mùa đông tuyết trắng âm hàng chục độ C. Ngạn ngữ Nga có câu: «Сибиряк не тот, кто не мёрзнет, а тот, кто тепло одевается» (Người Siberia không phải là người không biết rét, mà là người biết mặc ấm). Nắm vững từ vựng trang phục giúp bạn tự tin chọn đồ giữ ấm và mua sắm dễ dàng tại các trung tâm thương mại.",
    "dialogues": [
      {
        "speaker": "Продавец",
        "role": "Nhân viên bán hàng",
        "ru": "Здравствуйте! Чем я могу вам помочь?",
        "vi": "Xin chào! Tôi có thể giúp gì cho quý khách ạ?"
      },
      {
        "speaker": "Линь",
        "role": "Du học sinh",
        "ru": "Добрый день! Я ищу тёплый зимний пуховик и шерстяной свитер. Скоро наступят морозы.",
        "vi": "Chào bạn! Tôi đang tìm một chiếc áo phao lông vũ mùa đông ấm và một chiếc áo len lông cừu. Sắp tới đợt rét rồi."
      },
      {
        "speaker": "Продавец",
        "role": "Nhân viên bán hàng",
        "ru": "Посмотрите эту модель: она с капюшоном, ветрозащитная и держит тепло до минус тридцати градусов.",
        "vi": "Bạn hãy xem mẫu này: áo có mũ trùm đầu, cản gió và giữ ấm tới âm ba mươi độ C."
      },
      {
        "speaker": "Линь",
        "role": "Du học sinh",
        "ru": "Отлично! Где у вас примерочная? Я хочу примерить размер М.",
        "vi": "Tuyệt quá! Phòng thử đồ ở đâu vậy ạ? Tôi muốn thử cỡ M."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt ba động từ mặc đồ quan trọng",
        "content": "• «надева́ть / наде́ть что на себя»: mặc cái gì lên người (Я надеваю тёплую куртку).\n• «одева́ть / оде́ть кого»: mặc đồ cho ai (Мама одевает ребёнка).\n• «носи́ть что»: mặc thường xuyên / mang trên người (Зимой я ношу шапку и шарф)."
      },
      {
        "title": "2. Sự hòa hợp tính từ chỉ màu sắc và chất liệu",
        "content": "• Giống đực: «тёплый свитер», «кожаный ремень».\n• Giống cái: «зимняя куртка», «шерстяная шапка».\n• Giống trung: «длинное пальто».\n• Số nhiều: «синие джинсы», «зимние сапоги»."
      }
    ],
    "culturalTip": "Văn hóa phòng gửi đồ (Гардероб): Khi bước vào bất kỳ trường đại học, nhà hát, bảo tàng hay nhà hàng nào ở Nga vào mùa lạnh, bạn bắt buộc phải cởi áo khoác ngoài, gửi tại quầy để nhận thẻ số (номерок). Mặc áo khoác mùa đông đi thẳng vào lớp học hay khán phòng bị coi là hành vi rất thiếu lịch sự."
  },
  "do_dung_gia_dinh": {
    "intro": "Sinh sống trong ký túc xá hay căn hộ thuê tại Nga đòi hỏi bạn làm quen với các thiết bị gia dụng và đồ nội thất trong từng không gian sinh hoạt: phòng khách (гостиная), phòng ngủ (спальня), nhà bếp (кухня) và phòng tắm (ванная). Hiểu rõ công năng đồ vật giúp bạn chủ động sắp xếp cuộc sống ngăn nắp, tiện nghi.",
    "dialogues": [
      {
        "speaker": "Михаил",
        "role": "Bạn cùng phòng",
        "ru": "Линь, ты не знаешь, где лежит чистая посуда и сковорода?",
        "vi": "Linh ơi, bạn có biết bát đĩa sạch và chảo rán để ở đâu không?"
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Вся посуда стоит в кухонном шкафу над раковиной, а сковорода — на плите.",
        "vi": "Tất cả bát đĩa để trong tủ bếp phía trên bồn rửa, còn chảo rán ở trên bếp ga nhé."
      },
      {
        "speaker": "Михаил",
        "role": "Bạn cùng phòng",
        "ru": "Спасибо! А когда освободится стиральная машина? Мне нужно постирать постельное бельё.",
        "vi": "Cảm ơn nhé! Còn máy giặt khi nào thì xong? Mình cần giặt ga trải giường."
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Стирка закончится через пятнадцать минут. Можешь пока включить чайник.",
        "vi": "Khoảng 15 phút nữa là giặt xong. Bạn có thể bật ấm đun nước trước đi."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Vị trí đồ vật với giới từ Cách 6 (Предложный падеж)",
        "content": "• «в чём»: в шкафу́ (đuôi -у́ có dấu nhấn đặc biệt), в холодильнике, в комнате.\n• «на чём»: на столе́, на полке, на подоконнике."
      },
      {
        "title": "2. Cặp động từ vị trí: Đứng, Nằm, Treo",
        "content": "• «стоять» (đứng thẳng): чайник стоит на столе, холодильник стоит на кухне.\n• «лежать» (nằm ngang): нож и вилка лежат на столе, книга лежит на диване.\n• «висеть» (treo): зеркало висит на стене, шторы висят на окне."
      }
    ],
    "culturalTip": "Người Nga luôn cởi giày ngay tại lối vào (прихожая) và đi dép đi trong nhà (тапочки) do chủ nhà đưa. Tuyệt đối không bao giờ đi giày dép ngoài đường vào sâu trong phòng khách hoặc phòng ngủ."
  },
  "do_dung_hoc_tap": {
    "intro": "Giảng đường đại học Nga đòi hỏi sự chuẩn bị chu đáo về tài liệu học thuật và đồ dùng học tập. Từ cuốn giáo trình (учебник), tập vở kẻ ô vuông (тетрадь в клетку), cây bút bi (ручка) đến chiếc máy tính xách tay (ноутбук) đều là công cụ đắc lực hỗ trợ bạn ghi chép bài giảng và làm bài tập nghiên cứu.",
    "dialogues": [
      {
        "speaker": "Даша",
        "role": "Bạn cùng lớp",
        "ru": "Привет! У тебя есть запасная синяя ручка и линейка? Я забыла свой пенал дома.",
        "vi": "Chào bạn! Bạn có chiếc bút bi xanh dự phòng và thước kẻ không? Mình để quên hộp bút ở nhà rồi."
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Да, держи ручку и линейку. А тетрадь по русской литературе у тебя с собой?",
        "vi": "Có đây, bạn cầm lấy bút và thước nhé. Bạn có mang theo vở ghi văn học Nga không?"
      },
      {
        "speaker": "Даша",
        "role": "Bạn cùng lớp",
        "ru": "Да, тетрадь и учебник я взяла. Профессор сегодня будет проверять конспекты лекций.",
        "vi": "Có, vở và giáo trình mình mang rồi. Hôm nay giáo sư sẽ kiểm tra vở ghi bài giảng đấy."
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Отлично! Давай сядем за первую парту, чтобы лучше слышать преподавателя.",
        "vi": "Tốt quá! Chúng mình ngồi bàn đầu nhé để nghe giảng viên nói rõ hơn."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu mượn đồ dùng học tập lịch sự",
        "content": "• «Дай(те), пожалуйста...» (Làm ơn cho tôi mượn... — Cách 4): Дайте, пожалуйста, словарь.\n• «Можно взять...?»: Можно взять твой карандаш? (Mình lấy cây bút chì của bạn một chút được không?).\n• «У вас есть...?» — «Да, возьмите, пожалуйста»."
      },
      {
        "title": "2. Giới từ «по» + Cách 3 chỉ môn học",
        "content": "• «учебник по грамматике» (giáo trình ngữ pháp).\n• «тетрадь по физике» (vở môn vật lý).\n• «экзамен по русскому языку» (kỳ thi tiếng Nga)."
      }
    ],
    "culturalTip": "Sổ điểm học tập cá nhân (Зачётная книжка - Зачётка): Vật quan trọng nhất của sinh viên đại học Nga trong mỗi mùa thi (сессия). Sinh viên luôn giữ gìn зачётка cẩn thận, không được làm rách hay đánh mất trước khi gặp hội đồng chấm thi."
  },
  "phuong_tien_giao_thong": {
    "intro": "Nga sở hữu mạng lưới giao thông công cộng quy mô và đúng giờ bậc nhất thế giới. Tàu điện ngầm Moskva (Московское метро), xe buýt điện (электробус), xe điện mặt đất (трамвай) và tàu hỏa đường dài (поезд РЖД) kết nối hàng nghìn km khắp đất nước. Chiếc thẻ từ thông minh Troika (Тройка) là vật bất ly thân của mọi người khi di chuyển.",
    "dialogues": [
      {
        "speaker": "Линь",
        "role": "Hành khách",
        "ru": "Извините, пожалуйста, как быстрее всего доехать до Красной площади?",
        "vi": "Làm ơn cho tôi hỏi, đi bằng phương tiện gì đến Quảng trường Đỏ nhanh nhất ạ?"
      },
      {
        "speaker": "Прохожий",
        "role": "Người đi đường",
        "ru": "Быстрее всего на метро. Садитесь на станции «Университет» и поезжайте прямо до «Охотного ряда».",
        "vi": "Nhanh nhất là đi tàu điện ngầm. Bạn lên tàu ở ga «Universitet» và đi thẳng đến ga «Okhotny Ryad»."
      },
      {
        "speaker": "Линь",
        "role": "Hành khách",
        "ru": "Нужно ли делать пересадку?",
        "vi": "Có phải đổi tuyến tàu không ạ?"
      },
      {
        "speaker": "Прохожий",
        "role": "Người đi đường",
        "ru": "Нет, это прямая линия. Поездка займёт около двадцати минут.",
        "vi": "Không, đây là tuyến thẳng. Chuyến đi mất khoảng hai mươi phút thôi."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Giới từ «на» + Cách 6 chỉ phương tiện giao thông",
        "content": "• «ехать на метро́» (đi bằng tàu điện ngầm — lưu ý từ metro không biến đuôi).\n• «ехать на автобусе, на троллейбусе, на трамвае, на поезде, на такси»."
      },
      {
        "title": "2. Phân biệt động từ chuyển động Đi bộ vs Đi xe",
        "content": "• Đi bộ một chiều: «идти» (Я иду в университет пешком).\n• Đi xe một chiều: «ехать» (Я еду на метро в центр).\n• Đi lại thường xuyên / khứ hồi: «ходить» (пешком) và «ездить» (на транспорте)."
      }
    ],
    "culturalTip": "Quy tắc thang cuốn tàu điện ngầm (Эскалатор): Khi đứng trên thang cuốn tàu điện ngầm tại Nga, bạn luôn phải đứng nép về phía bên phải (стойте справа). Phía bên trái (слева) luôn để trống dành riêng cho những người đang đi bộ gấp lên xuống."
  },
  "dia_diem_noi_chon": {
    "intro": "Đô thị tại Nga được quy hoạch bài bản với nhiều địa điểm văn hóa, học thuật và dịch vụ tiện ích: từ các trường đại học danh tiếng (университет), thư viện quốc gia (библиотека), nhà hát lớn (театр), đến hiệu thuốc (аптека), bưu điện (почта) và ngân hàng (банк). Việc hỏi đường và xác định vị trí là kỹ năng sống còn.",
    "dialogues": [
      {
        "speaker": "Турист",
        "role": "Du khách",
        "ru": "Скажите, пожалуйста, где находится ближайшая аптека и отделение Сбербанка?",
        "vi": "Làm ơn cho tôi hỏi, hiệu thuốc và chi nhánh ngân hàng Sberbank gần nhất ở đâu ạ?"
      },
      {
        "speaker": "Студент",
        "role": "Sinh viên",
        "ru": "Пройдите прямо сто метров до перекрёстка, затем поверните направо. Аптека находится напротив парка.",
        "vi": "Bạn đi thẳng một trăm mét đến ngã tư, sau đó rẽ phải. Hiệu thuốc nằm đối diện công viên nhé."
      },
      {
        "speaker": "Турист",
        "role": "Du khách",
        "ru": "А банк там же рядом?",
        "vi": "Thế ngân hàng cũng ở gần đó luôn ạ?"
      },
      {
        "speaker": "Студент",
        "role": "Sinh viên",
        "ru": "Да, банк прямо за углом, в большом стеклянном здании. Он открыт до восьми вечера.",
        "vi": "Vâng, ngân hàng ngay khúc cua, trong tòa nhà kính lớn. Ngân hàng mở cửa đến 8 giờ tối."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt câu hỏi «Где?» (Ở đâu) và «Куда?» (Đi đâu)",
        "content": "• «Где?» đòi hỏi Cách 6: «Я нахожусь в университете / на площади».\n• «Куда?» đòi hỏi Cách 4: «Я иду в университет / на площадь».\n• Quy ước dùng «в» (không gian kín, tòa nhà) vs «на» (không gian mở, sự kiện): в театр, в магазин; на площадь, на выставку."
      },
      {
        "title": "2. Từ vựng chỉ phương hướng và khoảng cách",
        "content": "• «прямо» (đi thẳng), «направо» (bên phải / rẽ phải), «налево» (bên trái / rẽ trái).\n• «рядом с...» (gần bên — Cách 5), «напротив...» (đối diện — Cách 2), «за углом» (ngay khúc quanh)."
      }
    ],
    "culturalTip": "Khi cần hỏi đường người lạ trên đường phố Nga, hãy bắt đầu bằng câu kính ngữ: «Извините, пожалуйста, не подскажете, как пройти к...?». Người Nga sẵn sàng dừng lại chỉ dẫn rất chi tiết, thậm chí dắt bạn đến tận nơi nếu bạn chưa rõ đường."
  },
  "do_an_uong": {
    "intro": "Ẩm thực Nga đậm đà bản sắc với các món súp củ dền truyền thống (борщ), bánh bao nhân thịt (пельмени), bánh xèo thơm lừng (блины), salad khoai tây Nga (оливье) và thức uống bánh mì lên men (квас). Nắm chắc từ vựng đồ ăn và mẫu câu gọi món giúp bạn tự tin dùng bữa tại các nhà hàng, quán ăn «Теремок» hay căng-tin sinh viên (столовая).",
    "dialogues": [
      {
        "speaker": "Официант",
        "role": "Bồi bàn",
        "ru": "Добрый день! Вы готовы сделать заказ?",
        "vi": "Xin chào quý khách! Quý khách đã sẵn sàng gọi món chưa ạ?"
      },
      {
        "speaker": "Линь",
        "role": "Thực khách",
        "ru": "Здравствуйте! Принесите, пожалуйста, тарелку горячего борща со сметаной и порцию сибирских пельменей.",
        "vi": "Xin chào! Cho tôi xin một bát súp borsch nóng ăn kèm kem chua smetana và một suất bánh bao pelmeni Siberia."
      },
      {
        "speaker": "Официант",
        "role": "Bồi bàn",
        "ru": "Прекрасный выбор! Что вы будете пить?",
        "vi": "Lựa chọn tuyệt vời ạ! Quý khách dùng đồ uống gì ạ?"
      },
      {
        "speaker": "Линь",
        "role": "Thực khách",
        "ru": "Чёрный чай с лимоном и сахаром, пожалуйста.",
        "vi": "Cho tôi một ly trà đen với chanh và đường nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu gọi món và yêu cầu trong nhà hàng",
        "content": "• «Принесите, пожалуйста...» (Làm ơn mang cho tôi... — Cách 4).\n• «Мне, пожалуйста...» (Cho tôi xin... — Cách 4): Мне, пожалуйста, кофе и блин с сыром.\n• «Сколько с меня?» hoặc «Можно счёт, пожалуйста?» (Làm ơn tính tiền giúp tôi)."
      },
      {
        "title": "2. Cụm từ chúc ngon miệng và khen ngợi",
        "content": "• Trước khi ăn: «Приятного аппетита!» (Chúc bạn ăn ngon miệng!).\n• Sau khi ăn: «Спасибо, всё было очень вкусно!» (Cảm ơn, mọi món đều rất ngon!)."
      }
    ],
    "culturalTip": "Văn hóa uống trà (Чаепитие): Người Nga uống trà vào mọi thời điểm trong ngày và luôn dùng kèm đồ ngọt (сладости) như kẹo socola, bánh quy (печенье) hoặc mứt quả (варенье). Không ai uống trà suông. Khi được người Nga mời đến nhà chơi, một hộp bánh hoặc socola làm quà biếu sẽ ghi điểm tuyệt đối."
  },
  "the_thao_am_nhac": {
    "intro": "Nga là cái nôi của nền âm nhạc cổ điển vĩ đại với những nhà soạn nhạc huyền thoại như Tchaikovsky, Rachmaninoff, đồng thời là cường quốc thể thao mùa đông với môn khúc côn cầu trên băng (хоккей) và trượt băng nghệ thuật (фигурное катание). Trò chuyện về thể thao và âm nhạc là nhịp cầu tuyệt vời để kết nối bạn bè Nga.",
    "dialogues": [
      {
        "speaker": "Иван",
        "role": "Bạn sinh viên",
        "ru": "Линь, чем ты любишь заниматься в свободное время?",
        "vi": "Linh ơi, lúc rảnh rỗi bạn thích làm gì nhất?"
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Я очень люблю спорт. По выходным я играю в футбол и хожу в бассейн. А ты?",
        "vi": "Mình rất thích thể thao. Cuối tuần mình thường đá bóng và đi bơi. Còn bạn?"
      },
      {
        "speaker": "Иван",
        "role": "Bạn sinh viên",
        "ru": "А я играю на акустической гитаре и часто хожу на концерты классической музыки в филармонию.",
        "vi": "Còn mình thì chơi đàn guitar acoustic và hay đi nghe các buổi hòa nhạc cổ điển tại nhà hòa nhạc."
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Здорово! Зимой давай вместе пойдём на каток в Парк Горького кататься на коньках!",
        "vi": "Tuyệt quá! Mùa đông này chúng mình cùng đến sân trượt băng ở Công viên Gorky trượt băng nhé!"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ «играть» đi với Thể thao vs Nhạc cụ",
        "content": "• Chơi môn thể thao: «играть во что» (Cách 4): играть в футбол, в волейбол, в шахматы (cờ vua).\n• Chơi nhạc cụ: «играть на чём» (Cách 6): играть на гитаре, на пианино, на скрипке."
      },
      {
        "title": "2. Cụm từ sở thích «увлекаться» và «любить»",
        "content": "• «любить делать что»: Я люблю плавать и слушать музыку.\n• «увлекаться чем» (Cách 5): Я увлекаюсь спортом, музыкой, фотографией."
      }
    ],
    "culturalTip": "Sân trượt băng mùa đông (Каток): Hàng năm từ tháng 12 đến tháng 3, các công viên lớn tại Nga (VDNKh, Gorky Park) đều biến thành sân trượt băng ngoài trời rộng lớn rực rỡ đèn hoa và âm nhạc rộn rã. Đây là hoạt động giải trí mùa đông được yêu thích nhất của mọi thế hệ người Nga."
  },
  "con_vat": {
    "intro": "Động vật và thiên nhiên Nga vô cùng phong phú, từ loài gấu nâu (бурый медведь) biểu tượng cho sức mạnh rừng taiga, sói xám (волк), cáo đỏ (лиса) đến những thú cưng được nâng niu trong mỗi gia đình như mèo (кошка) và chó (собака). Nắm bắt từ vựng về động vật giúp bạn làm giàu thêm vốn từ sinh động.",
    "dialogues": [
      {
        "speaker": "Алина",
        "role": "Bạn gái",
        "ru": "Линь, посмотри, какой красивый пушистый кот сидит у окна!",
        "vi": "Linh xem kìa, chú mèo lông xù ngồi bên cửa sổ trông mới đáng yêu làm sao!"
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "Да, замечательный котик! У меня дома во Вьетнаме тоже есть собака и кот.",
        "vi": "Ừ, chú mèo xinh quá! Ở nhà mình bên Việt Nam cũng nuôi một chú chó và một chú mèo."
      },
      {
        "speaker": "Алина",
        "role": "Bạn gái",
        "ru": "В России почти в каждой семье есть домашние питомцы. Мы очень заботимся о них.",
        "vi": "Ở Nga hầu như gia đình nào cũng nuôi thú cưng trong nhà. Mọi người chăm sóc chúng rất chu đáo."
      },
      {
        "speaker": "Линь",
        "role": "Sinh viên",
        "ru": "А в парке я часто вижу, как люди кормят птиц и белок семечками и орехами.",
        "vi": "Còn ở công viên mình rất hay thấy mọi người cho chim và sóc ăn hạt hướng dương với hạt dẻ."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Danh từ động vật có sự sống (Одушевлённые существительные) trong Cách 4",
        "content": "• Giống đực số ít có sự sống: đuôi đổi giống Cách 2 (Родительный):\n  - кот → Я вижу кота́.\n  - медведь → Я вижу медве́дя.\n• Số nhiều có sự sống: đuôi đổi giống Cách 2:\n  - птицы → кормить птиц (cho chim ăn).\n  - собаки → Я люблю собак."
      },
      {
        "title": "2. Tên gọi con thú non đáng yêu",
        "content": "• кошка → котёнок (mèo con)\n• собака → щено́к (chó con)\n• медведь → медвежо́нок (gấu con)"
      }
    ],
    "culturalTip": "Mèo Hermitage (Эрмитажные коты): Tại Bảo tàng Ermitage danh tiếng ở Saint Petersburg có một 'biệt đội' mèo được nuôi dưỡng chính thức từ thế kỷ 18 theo lệnh của Nữ hoàng Nga để bảo vệ các tác phẩm nghệ thuật vô giá khỏi loài chuột. Đến nay chúng vẫn được bảo tàng chăm sóc và coi như những 'nhân viên' đặc biệt."
  },
  "bo_phan_co_the": {
    "intro": "Hiểu rõ các bộ phận trên cơ thể (голова, глаза, руки, ноги, горло, сердце) giúp bạn tự tin miêu tả đặc điểm ngoại hình của một người và đặc biệt là biết cách diễn đạt triệu chứng sức khỏe khi cần đi khám bệnh tại phòng khám (поликлиника) hay mua thuốc tại hiệu thuốc (аптека).",
    "dialogues": [
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "Здравствуйте! Проходите, присаживайтесь. На что вы жалуетесь?",
        "vi": "Xin chào! Mời bạn vào, ngồi xuống đây. Bạn thấy không khỏe ở đâu?"
      },
      {
        "speaker": "Пациент",
        "role": "Sinh viên",
        "ru": "Доктор, у меня сильно болит голова и горло, а также поднялась высокая температура.",
        "vi": "Thưa bác sĩ, tôi bị đau đầu và đau họng dữ dội, ngoài ra còn bị sốt cao nữa ạ."
      },
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "Давайте я послушаю ваше дыхание и посмотрю горло. Откройте рот и скажите «А-а».",
        "vi": "Để tôi nghe nhịp thở và kiểm tra họng cho bạn. Mời bạn há to miệng và nói «A-a» nào."
      },
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "Горло красное, это простуда. Я выпишу вам рецепт на лекарства и дам справку на три дня.",
        "vi": "Họng bị sưng đỏ, bạn bị cảm lạnh rồi. Tôi sẽ kê đơn thuốc và cấp giấy xin nghỉ ốm 3 ngày cho bạn."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu diễn đạt cơn đau với động từ «болеть»",
        "content": "• Khi đau 1 bộ phận (danh từ số ít): «У меня боли́т голова / горло / зуб».\n• Khi đau nhiều bộ phận (danh từ số nhiều): «У меня боля́т глаза / ноги / уши».\n• Chú ý phân biệt trọng âm: боли́т (số ít) vs боля́т (số nhiều)."
      },
      {
        "title": "2. Các cặp danh từ số nhiều bất quy tắc chỉ cơ thể người",
        "content": "• глаз → глаза́ (mắt)\n• ухо → у́ши (tai)\n• плечо → пле́чи (vai)\n• колено → коле́ни (đầu gối)"
      }
    ],
    "culturalTip": "Phòng khám sinh viên và giấy nghỉ ốm (Справка): Mọi du học sinh tại Nga đều có thẻ bảo hiểm y tế. Khi cảm thấy không khỏe, bạn hãy đến ngay phòng khám sinh viên (Студенческая поликлиника) để được khám bệnh. Bác sĩ sẽ cấp giấy xác nhận ốm (Справка о болезни) để bạn nộp cho văn phòng khoa (Деканат), đảm bảo việc nghỉ học có lý do chính đáng và không bị trừ điểm chuyên cần."
  },
  "jar_auchan": {
    "intro": "Đi siêu thị tại Nga (Auchan, Pyaterochka, Perekrestok, Magnit) là trải nghiệm sinh hoạt thực tế đầu tiên của mọi du học sinh và người sinh sống tại Nga. Khác với nhiều siêu thị ở Việt Nam, hệ thống siêu thị Nga yêu cầu bạn tự cân rau củ quả tại cân điện tử và dán tem giá, tự mua túi nilông ở quầy thu ngân và ưu tiên thanh toán qua thẻ ngân hàng nội địa (Sberbank / Mir).",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Здравствуйте! Скажите, пожалуйста, где можно взвесить яблоки?",
        "vi": "Xin chào! Làm ơn cho tôi hỏi, tôi có thể cân táo ở đâu ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Nhân viên siêu thị",
        "ru": "Здравствуйте! Весы находятся вон там, рядом с овощами. Номер для этих яблок — 14.",
        "vi": "Chào bạn! Cân ở đằng kia, bên cạnh quầy rau củ. Mã số của loại táo này là 14."
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Спасибо большое! А сколько стоит докторская колбаса?",
        "vi": "Cảm ơn bạn nhiều! Cho tôi hỏi xúc xích giò Doktorskaya giá bao nhiêu ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Nhân viên siêu thị",
        "ru": "Она стоит двести сорок рублей за штуку.",
        "vi": "Loại đó giá 240 rúp một cây ạ."
      },
      {
        "speaker": "Кассир",
        "role": "Thu ngân",
        "ru": "Добрый день! Пакет нужен? Карта лояльности есть?",
        "vi": "Chào bạn! Bạn có cần túi không? Có thẻ tích điểm không?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Да, один большой пакет, пожалуйста. Карты нет. Я оплачу покупку картой.",
        "vi": "Vâng, cho tôi một túi lớn. Tôi không có thẻ tích điểm. Tôi thanh toán bằng thẻ ạ."
      },
      {
        "speaker": "Кассир",
        "role": "Thu ngân",
        "ru": "Приложите карту к терминалу. Возьмите ваш чек, пожалуйста. Хорошего дня!",
        "vi": "Mời bạn chạm thẻ vào máy. Xin hãy lấy hóa đơn của bạn. Chúc bạn một ngày tốt lành!"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Câu mệnh lệnh lịch sự trong mua bán",
        "content": "Luôn sử dụng động từ thể mệnh lệnh ngôi lịch sự (Вы) kết hợp với từ «пожалуйста»:\n• «Взвесьте, пожалуйста» (Làm ơn cân giúp tôi)\n• «Дайте, пожалуйста...» (Làm ơn cho tôi lấy...)\n• «Покажите, пожалуйста...» (Làm ơn cho tôi xem...)"
      },
      {
        "title": "2. Danh từ giống và cách dùng số lượng",
        "content": "Để ý đuôi giống đực (хлеб, сыр, чек), giống cái (колбаса, карта, скидка) và giống trung (молоко). Khi kết hợp số từ: 1 chiếc dùng Cách 1 (один пакет), 2-4 chiếc dùng Cách 2 số ít (два пакета), từ 5 chiếc trở lên dùng Cách 2 số nhiều (пять пакетов)."
      },
      {
        "title": "3. Các câu hỏi phản xạ tại quầy thu ngân",
        "content": "Thu ngân Nga thường dùng các câu rút gọn nhanh: «Пакет нужен?» (Cần túi không?), «Картой или наличными?» (Quẹt thẻ hay tiền mặt?). Bạn chỉ cần đáp nhanh: «Картой, пожалуйста» hoặc «Наличными»."
      }
    ],
    "culturalTip": "Sau khi thanh toán xong, luôn cầm hóa đơn giấy (чек) trong tay hoặc để ngay miệng túi cho đến khi ra hẳn khỏi cửa siêu thị. Nhân viên bảo vệ (охрана) có quyền kiểm tra đối chiếu hóa đơn nếu còi báo động cửa an ninh vô tình kêu."
  },
  "jar_chemodan": {
    "intro": "Chuẩn bị hành lý du học Nga là bước khởi đầu quyết định sự thuận lợi của cả kỳ học đầu tiên. Khí hậu mùa đông nước Nga có thể hạ xuống -20°C đến -30°C, vì vậy hành lý ký gửi tiêu chuẩn 23kg và xách tay 10kg cần được phân loại khoa học giữa trang phục giữ nhiệt, tài liệu học vụ gốc dịch công chứng và thuốc men dự phòng.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Мама, я собираю чемодан. Сколько килограммов можно взять?",
        "vi": "Mẹ ơi, con đang xếp vali. Được mang tối đa bao nhiêu cân ạ?"
      },
      {
        "speaker": "Мама",
        "role": "Mẹ",
        "ru": "В билете написано: одно место багажа до двадцати трёх килограммов.",
        "vi": "Trong vé ghi là: một kiện hành lý ký gửi tối đa 23 kg con nhé."
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Я уже положила тёплую зимнюю куртку, обувь и свитер. Куда положить паспорт и визу?",
        "vi": "Con đã để áo khoác ấm mùa đông, giày dép và áo len vào rồi. Hộ chiếu và visa để vào đâu ạ?"
      },
      {
        "speaker": "Мама",
        "role": "Mẹ",
        "ru": "Ни в коем случае не клади документы в багаж! Паспорт, визу и билеты возьми в ручную кладь.",
        "vi": "Tuyệt đối không được để giấy tờ vào hành lý ký gửi! Hộ chiếu, visa và vé hãy để vào túi xách tay."
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Поняла! Я положу их в маленькую сумку вместе с зарядкой для телефона.",
        "vi": "Con hiểu rồi! Con sẽ để chúng vào túi nhỏ cùng với sạc điện thoại."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cặp động từ đặt để: «класть / положить»",
        "content": "«Класть» (Chưa hoàn thành thể - diễn tả quá trình đang xếp vào): «Я кладу вещи в чемодан».\n«Положить» (Hoàn thành thể - đã đặt để xong một vật cụ thể): «Я уже положила паспорт в сумку»."
      },
      {
        "title": "2. Cặp động từ xếp dọn: «собирать / собрать»",
        "content": "Cụm từ cố định: «собирать чемодан» (xếp vali), «собираться в дорогу / в поездку» (chuẩn bị lên đường, chuẩn bị cho chuyến đi)."
      }
    ],
    "culturalTip": "Tất cả hồ sơ gốc (bằng tốt nghiệp, học bạ, giấy khai sinh, giấy khám sức khỏe và kết quả xét nghiệm HIV) bắt buộc phải để trong hành lý xách tay (ручная кладь) mang theo người, tuyệt đối không gửi trong vali ký gửi phòng trường hợp thất lạc hành lý."
  },
  "jar_airport": {
    "intro": "Hạ cánh xuống các sân bay quốc tế lớn của Moskva (như Sheremetyevo - SVO, Domodedovo - DME hoặc Vnukovo - VKO), du học sinh cần hoàn tất quy trình: kiểm tra an ninh, xếp hàng tại quầy kiểm soát hộ chiếu (паспортный контроль), nhận thẻ di trú (миграционная карта), lấy hành lý tại băng chuyền và qua cửa khẩu hải quan.",
    "dialogues": [
      {
        "speaker": "Пограничник",
        "role": "Sĩ quan biên phòng",
        "ru": "Здравствуйте! Ваш заграничный паспорт и посадочный талон, пожалуйста.",
        "vi": "Xin chào! Xin vui lòng xuất trình hộ chiếu và thẻ lên máy bay của bạn."
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Здравствуйте! Вот мой паспорт, виза и приглашение из университета.",
        "vi": "Xin chào! Đây là hộ chiếu, thị thực và giấy mời nhập học của trường đại học ạ."
      },
      {
        "speaker": "Пограничник",
        "role": "Sĩ quan biên phòng",
        "ru": "Цель вашей поездки в Российскую Федерацию?",
        "vi": "Mục đích chuyến đi của bạn đến Liên bang Nga là gì?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Учёба. Я поступила в Московский государственный университет.",
        "vi": "Đi học ạ. Em trúng tuyển vào Đại học Quốc gia Moskva (MGU)."
      },
      {
        "speaker": "Пограничник",
        "role": "Sĩ quan biên phòng",
        "ru": "Распишитесь на миграционной карте. Добро пожаловать в Россию!",
        "vi": "Mời bạn ký tên vào thẻ di trú. Chào mừng bạn đến với nước Nga!"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Большое спасибо! Подскажите, где выдача багажа рейса VN-62?",
        "vi": "Em cảm ơn nhiều ạ! Xin hỏi khu vực trả hành lý của chuyến bay VN-62 ở đâu ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Nhân viên mặt đất",
        "ru": "Пройдите прямо и поверните направо, лента номер четыре.",
        "vi": "Bạn đi thẳng rồi rẽ phải, băng chuyền số 4 nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu trả lời mục đích chuyến đi",
        "content": "Khi qua cửa khẩu hải quan, trả lời ngắn gọn, chuẩn xác bằng danh từ:\n• «Учёба» (Đi học)\n• «Туризм» (Du lịch)\n• «Работа / Деловая поездка» (Công tác, làm việc)"
      },
      {
        "title": "2. Hỏi phương hướng tại sân bay",
        "content": "• «Где выдача багажа?» (Nơi nhận hành lý ở đâu?)\n• «Пройдите прямо» (Đi thẳng)\n• «Поверните направо / налево» (Rẽ phải / rẽ trái)"
      }
    ],
    "culturalTip": "Tờ thẻ di trú (миграционная карта) mà hải quan kẹp vào hộ chiếu là văn bản pháp lý sống còn! Bạn phải giữ nó thật phẳng phiu, không được làm mất hay rách nát, vì phòng quản lý sinh viên quốc tế (Деканат) bắt buộc phải có giấy này để làm thủ tục đăng ký tạm trú (Регистрация)."
  },
  "jar_family": {
    "intro": "Chủ đề gia đình, người thân và mối quan hệ xã hội là nội dung giao tiếp nền tảng ở cấp độ A1. Tại Nga, người bản xứ rất trân trọng tình cảm gia đình, và việc bạn biết cách giới thiệu các thành viên, xưng hô tôn trọng và kể về công việc của cha mẹ sẽ tạo thiện cảm rất lớn.",
    "dialogues": [
      {
        "speaker": "Иван",
        "role": "Bạn học người Nga",
        "ru": "Аня, расскажи о своей семье. У тебя большая семья?",
        "vi": "Anya, hãy kể về gia đình bạn đi. Nhà bạn có đông người không?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Моя семья небольшая: папа, мама, младший брат и я.",
        "vi": "Gia đình mình không đông lắm: bố, mẹ, em trai và mình."
      },
      {
        "speaker": "Иван",
        "role": "Bạn học người Nga",
        "ru": "Кем работают твои родители?",
        "vi": "Bố mẹ bạn làm nghề gì?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Мой папа — инженер, а мама — учительница русского языка во Вьетнаме.",
        "vi": "Bố mình là kỹ sư, còn mẹ là giáo viên tiếng Nga tại Việt Nam."
      },
      {
        "speaker": "Иван",
        "role": "Bạn học người Nga",
        "ru": "Здорово! А сколько лет твоему брату?",
        "vi": "Tuyệt thật! Em trai bạn bao nhiêu tuổi rồi?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Ему пятнадцать лет, он учится в школе и тоже мечтает поехать в Россию.",
        "vi": "Em ấy 15 tuổi, đang học phổ thông và cũng ước mơ được sang Nga."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Nói về nghề nghiệp: «Кем работает...?»",
        "content": "Câu hỏi nghề nghiệp: «Кем работает ваш папа?» (Bố bạn làm nghề gì?) dùng Công cụ cách (Cách 5). Khi trả lời ở A1, bạn có thể nói danh từ đơn giản: «Мой папа — инженер»."
      },
      {
        "title": "2. Nói về tuổi tác: Đại từ Cách 3 (Dative)",
        "content": "Cấu trúc: «Кому сколько лет»: «Мне двадцать лет» (Tôi 20 tuổi), «Ему пятнадцать лет» (Cậu ấy 15 tuổi), «Ей сорок лет» (Bà ấy 40 tuổi)."
      }
    ],
    "culturalTip": "Trong tiếng Nga, họ tên đầy đủ gồm: Tên (Имя) + Tên đệm theo tên bố (Отчество) + Họ (Фамилия). Khi giao tiếp lịch sự với người lớn tuổi, giáo viên hoặc giáo sư đại học, luôn gọi bằng [Tên + Tên đệm] (ví dụ: Иван Сергеевич, Анна Петровна) thay vì chỉ gọi tên riêng."
  },
  "jar_daily": {
    "intro": "Thiết lập thời gian biểu và nếp sinh hoạt điều độ là chìa khóa để thích nghi với nhịp sống học tập cường độ cao tại Nga. Chủ đề sinh hoạt hằng ngày giúp bạn nắm chắc cách diễn đạt các hoạt động thức dậy, học tập, ăn uống và giải trí theo từng buổi trong ngày.",
    "dialogues": [
      {
        "speaker": "Иван",
        "role": "Bạn cùng phòng",
        "ru": "Во сколько ты обычно встаёшь утром?",
        "vi": "Cậu thường thức dậy lúc mấy giờ vào buổi sáng?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Я просыпаюсь в семь часов, принимаю душ и готовлю завтрак.",
        "vi": "Mình thức dậy lúc 7 giờ, tắm rửa và chuẩn bị bữa sáng."
      },
      {
        "speaker": "Иван",
        "role": "Bạn cùng phòng",
        "ru": "Когда начинаются занятия в университете?",
        "vi": "Mấy giờ thì bắt đầu tiết học ở trường đại học?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Первая пара начинается в девять часов утра. Обычно у нас три или четыре пары в день.",
        "vi": "Tiết học đầu tiên bắt đầu lúc 9 giờ sáng. Thường chúng mình có 3 hoặc 4 ca học mỗi ngày."
      },
      {
        "speaker": "Иван",
        "role": "Bạn cùng phòng",
        "ru": "Что ты делаешь вечером после пар?",
        "vi": "Buổi tối sau giờ học cậu làm gì?"
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Я делаю домашнее задание, учу новые русские слова и гуляю в парке.",
        "vi": "Mình làm bài tập về nhà, học từ vựng tiếng Nga mới và đi dạo trong công viên."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Nói về giờ giấc: «В каком часу? / Во сколько?»",
        "content": "Dùng giới từ «в / во» + Giờ (Cách 4):\n• в семь часов утра (vào 7 giờ sáng)\n• в девять часов (vào 9 giờ)\n• в полдень (vào giữa trưa)"
      },
      {
        "title": "2. Khái niệm «Пара» tại đại học Nga",
        "content": "Tại Nga, một tiết học đại học gọi là «пара» (cặp tiết), kéo dài 90 phút (bằng 2 tiết 45 phút ghép lại). Sinh viên thường học 3-4 cặp tiết (пары) mỗi ngày."
      }
    ],
    "culturalTip": "Mùa đông nước Nga trời tối rất sớm (khoảng 16:00 chiều đã tắt nắng), trong khi mùa hè đêm trắng (Белые ночи) đến 23:00 đêm vẫn sáng rực. Hãy điều chỉnh đồng hồ sinh học để duy trì giấc ngủ đủ 7-8 tiếng mỗi ngày."
  },
  "jar_weather": {
    "intro": "Thời tiết nước Nga nổi tiếng với 4 mùa rõ rệt, từ sắc vàng mùa thu (Золотая осень) thơ mộng đến mùa đông tuyết trắng âm hàng chục độ. Học từ vựng thời tiết giúp bạn biết cách theo dõi dự báo (прогноз погоды), lựa chọn trang phục phù hợp và tham gia các cuộc trò chuyện tự nhiên với người bản xứ.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Иван, какая погода сегодня на улице?",
        "vi": "Ivan ơi, thời tiết ngoài trời hôm nay thế nào?"
      },
      {
        "speaker": "Иван",
        "role": "Bạn người Nga",
        "ru": "Сегодня холодно и ветрено, идёт сильный снег. На термометре минус пятнадцать градусов.",
        "vi": "Hôm nay lạnh và nhiều gió, tuyết đang rơi dày. Trên nhiệt kế là âm 15 độ đấy."
      },
      {
        "speaker": "Anya",
        "role": "Du học sinh",
        "ru": "Ого! Мне нужно надеть тёплый шарф, перчатки и зимнюю шапку.",
        "vi": "Trời ơi! Mình phải đeo khăn ấm, găng tay và đội mũ len mùa đông mới được."
      },
      {
        "speaker": "Иван",
        "role": "Bạn người Nga",
        "ru": "Обязательно! И надень зимние ботинки с нескользящей подошвой — на дорогах гололёд.",
        "vi": "Nhất định rồi! Và nhớ đi giày chống trượt nữa — trên đường đang bị đóng băng trơn trượt đấy."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu vô nhân xưng mô tả thời tiết",
        "content": "Trong tiếng Nga, trạng thái thời tiết dùng phó từ không cần chủ ngữ:\n• «Сегодня холодно / тепло / ветрено / солнечно» (Hôm nay trời lạnh / ấm / nhiều gió / có nắng).\n• Hiện tượng thời tiết: «Идёт дождь» (Trời mưa), «Идёт снег» (Tuyết rơi)."
      },
      {
        "title": "2. Nói về nhiệt độ âm / dương",
        "content": "• «минус десять градусов» (âm 10 độ)\n• «плюс двадцать градусов» (dương 20 độ)\n• «ноль градусов» (0 độ)."
      }
    ],
    "culturalTip": "Hiện tượng «гололёд» (băng trơn mỏng trên vỉa hè) rất nguy hiểm vào đầu mùa đông và đầu xuân. Người Nga có dáng đi mùa đông gọi là dáng chim cánh cụt (походка пингвина) — bước ngắn, hơi đổ trọng tâm về phía trước để không bị trượt ngã."
  },
  "jar_city": {
    "intro": "Khi mới sang Nga, việc hỏi đường (как пройти / как доехать) là kỹ năng sống còn giúp bạn không bị lạc giữa những đại lộ thênh thang và quảng trường rộng lớn. Nắm chắc mẫu câu hỏi đường giúp bạn tự tin khám phá thành phố.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Du khách",
        "ru": "Извините, пожалуйста! Вы не подскажете, как пройти к Красной площади?",
        "vi": "Xin lỗi bạn! Bạn có thể chỉ giúp tôi đường đi đến Quảng trường Đỏ được không ạ?"
      },
      {
        "speaker": "Прохожий",
        "role": "Người qua đường",
        "ru": "Конечно! Идите прямо по этой улице до светофора, затем поверните налево.",
        "vi": "Tất nhiên rồi! Bạn đi thẳng theo con phố này đến cột đèn giao thông, sau đó rẽ trái."
      },
      {
        "speaker": "Anya",
        "role": "Du khách",
        "ru": "Это далеко отсюда? Можно дойти пешком?",
        "vi": "Chỗ đó có xa đây không ạ? Có thể đi bộ được không?"
      },
      {
        "speaker": "Прохожий",
        "role": "Người qua đường",
        "ru": "Нет, совсем рядом, минут десять пешком. Вы увидите Исторический музей прямо перед собой.",
        "vi": "Không, rất gần, khoảng 10 phút đi bộ. Bạn sẽ thấy Bảo tàng Lịch sử ngay trước mắt."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cặp câu hỏi đường lịch sự",
        "content": "• «Как пройти к...?» (Đi bộ đến đâu như thế nào?) — dùng «к» + Cách 3.\n• «Как доехать до...?» (Đi xe/tàu đến đâu như thế nào?) — dùng «до» + Cách 2."
      },
      {
        "title": "2. Chỉ dẫn phương hướng",
        "content": "• «Идите прямо» (Hãy đi thẳng)\n• «Поверните направо / налево» (Rẽ phải / rẽ trái)\n• «Перейдите улицу по пешеходному переходу» (Qua đường tại vạch cho người đi bộ)."
      }
    ],
    "culturalTip": "Khi nhờ người lạ trên đường giúp đỡ, luôn mở đầu bằng câu: «Извините, пожалуйста, вы не подскажете...» (Xin lỗi, bạn có thể chỉ giúp...). Cách nói phủ định «вы не подскажете» mang sắc thái cực kỳ mềm mỏng và lịch sự trong văn hóa Nga."
  },
  "jar_dorm": {
    "intro": "Ký túc xá (Общежитие, gọi thân mật là Obshaga) là ngôi nhà thứ hai của du học sinh tại Nga. Tại đây, bạn sẽ tiếp xúc hằng ngày với bảo vệ trực tầng (Дежурная / Вахтёрша), quản trị viên ký túc xá (Комендант), tuân thủ nội quy giờ giấc, sử dụng bếp chung và phòng giặt đồ tự động.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Здравствуйте! Я новая студентка из Вьетнама. Где сидит комендант?",
        "vi": "Cháu chào cô ạ! Cháu là sinh viên mới đến từ Việt Nam. Phòng quản lý KTX ở đâu ạ?"
      },
      {
        "speaker": "Дежурная",
        "role": "Bảo vệ trực ban",
        "ru": "Здравствуй! Кабинет коменданта на первом этаже, номер сто пять.",
        "vi": "Chào cháu! Phòng quản lý ở tầng 1, phòng số 105 nhé."
      },
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Здравствуйте! Вот мой ордер на заселение и направление из деканата.",
        "vi": "Cháu chào thầy! Đây là giấy tiếp nhận vào ở KTX và giấy giới thiệu từ khoa ạ."
      },
      {
        "speaker": "Комендант",
        "role": "Quản lý KTX",
        "ru": "Хорошо. Твоя комната — триста двенадцать на третьем этаже. Вот ключ и пропуск.",
        "vi": "Được rồi. Phòng của em là 312 ở tầng 3. Đây là chìa khóa và thẻ ra vào KTX."
      },
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Спасибо! Скажите, до скольких работает прачечная и общая кухня?",
        "vi": "Em cảm ơn ạ! Cho em hỏi phòng giặt đồ và bếp chung mở cửa đến mấy giờ ạ?"
      },
      {
        "speaker": "Комендант",
        "role": "Quản lý KTX",
        "ru": "Кухня открыта до двадцати трёх часов. После этого в общежитии должен быть порядок и тишина.",
        "vi": "Bếp mở đến 23 giờ. Sau giờ đó trong ký túc xá phải giữ trật tự và yên lặng."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cách nói tầng nhà trong tiếng Nga",
        "content": "Dùng số thứ tự kết hợp giới từ «на» + Cách 6 (Giới cách):\n• на первом этаже (ở tầng 1)\n• на втором этаже (ở tầng 2)\n• на третьем этаже (ở tầng 3)"
      },
      {
        "title": "2. Hỏi giờ giấc hoạt động «До скольких...?»",
        "content": "• «До скольких открыта кухня?» (Bếp mở cửa đến mấy giờ?)\n• «Кухня работает до одиннадцати вечера» (Bếp mở đến 11 giờ đêm)."
      }
    ],
    "culturalTip": "Luôn chào hỏi thật lễ phép với các bác trực ban (вахтёр / дежурная). Ở Nga, mối quan hệ tốt đẹp với bác trực ban tầng sẽ giúp bạn rất nhiều khi cần nhờ mở cửa lúc về muộn hoặc nhận bưu phẩm gửi đến KTX."
  },
  "jar_kafe": {
    "intro": "Thưởng thức ẩm thực Nga tại các quán cà phê, nhà hàng (Столовая, Кафе, Ресторан) là nét văn hóa thú vị. Bạn sẽ bắt gặp những món ăn truyền thống nổi tiếng như súp củ dền Borsch, bánh xếp Pelmeni, bánh xèo Blini và đồ uống trà nóng ấm áp.",
    "dialogues": [
      {
        "speaker": "Официант",
        "role": "Bồi bàn",
        "ru": "Добрый день! Вот меню. Вы уже готовы сделать заказ?",
        "vi": "Xin chào quý khách! Đây là thực đơn. Quý khách đã sẵn sàng gọi món chưa ạ?"
      },
      {
        "speaker": "Anya",
        "role": "Thực khách",
        "ru": "Да, пожалуйста. Принесите мне тарелку борща со сметаной и порцию сибирских пельменей.",
        "vi": "Vâng ạ. Làm ơn mang cho tôi một bát súp Borsch kèm váng sữa smetana và một suất bánh Pelmeni Siberia."
      },
      {
        "speaker": "Официант",
        "role": "Bồi bàn",
        "ru": "Что будете пить? Чай, кофе или клюквенный морс?",
        "vi": "Quý khách muốn dùng đồ uống gì ạ? Trà, cà phê hay nước trái cây việt quất mors?"
      },
      {
        "speaker": "Anya",
        "role": "Thực khách",
        "ru": "Чёрный чай с лимоном, пожалуйста. И принесите счёт сразу.",
        "vi": "Cho tôi trà đen với chanh. Và làm ơn mang hóa đơn ra cùng luôn nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Gọi món với «Принесите, пожалуйста...»",
        "content": "Dùng «Принесите...» + Danh từ Cách 4 (Đối cách): «тарелку борща», «порцию пельменей», «чашку кофе»."
      },
      {
        "title": "2. Cách gọi tính tiền lịch sự",
        "content": "«Счёт, пожалуйста!» (Làm ơn cho tôi xin hóa đơn / tính tiền ạ!) hoặc «Можно счёт?»."
      }
    ],
    "culturalTip": "Tại các nhà hàng Nga, tiền boa (чаевые) thường không bắt buộc ghi vào hóa đơn, nhưng thông lệ lịch sự là khách thường để lại 5-10% giá trị hóa đơn nếu hài lòng với phong cách phục vụ của nhân viên."
  },
  "jar_metro": {
    "intro": "Hệ thống tàu điện ngầm Moskva (Московский метрополитен) là một trong những mạng lưới giao thông ngầm đẹp và đồ sộ nhất thế giới. Đi metro là phương tiện di chuyển cốt lõi của sinh viên để đến trường học, thư viện và trung tâm thành phố. Bạn cần thành thạo quẹt thẻ Troika, nghe loa thông báo ga và nhận biết các tuyến chuyển tàu.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Hành khách",
        "ru": "Здравствуйте! Дайте, пожалуйста, карту «Тройка» и положите на неё пятьсот рублей.",
        "vi": "Chào chị! Làm ơn cho tôi mua thẻ Troika và nạp vào thẻ 500 rúp ạ."
      },
      {
        "speaker": "Кассир",
        "role": "Thu ngân vé",
        "ru": "Возьмите карту. Залог за карту — восемьдесят рублей, остальное на балансе.",
        "vi": "Cầm lấy thẻ nhé. Tiền cọc thẻ là 80 rúp, phần còn lại trong số dư tài khoản."
      },
      {
        "speaker": "Anya",
        "role": "Hành khách",
        "ru": "Спасибо! Скажите, как доехать до станции «Университет»?",
        "vi": "Cảm ơn chị! Cho em hỏi làm sao để đi đến ga Universitet ạ?"
      },
      {
        "speaker": "Пассажир",
        "role": "Người đi tàu",
        "ru": "Вам нужно сесть на поезд в сторону центра, потом на станции «Охотный ряд» сделать переход на красную линию.",
        "vi": "Bạn cần lên tàu hướng về trung tâm, sau đó ở ga Okhotny Ryad chuyển sang tuyến màu đỏ."
      },
      {
        "speaker": "Диктор",
        "role": "Loa phát thanh Metro",
        "ru": "Осторожно, двери закрываются! Следующая станция — «Университет».",
        "vi": "Chú ý, cửa đang đóng lại! Ga tiếp theo là — Universitet."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Câu thông báo kinh điển trên tàu Metro Nga",
        "content": "«Осторожно, двери закрываются! Следующая станция — ...» (Hãy cẩn thận, cửa đang đóng! Ga tiếp theo là...)\n«Переход на станцию ...» (Chuyển sang ga...)"
      },
      {
        "title": "2. Cách dùng động từ chuyển động «доехать» (đi đến nơi bằng phương tiện)",
        "content": "«Как доехать до станции...?» (Làm thế nào để đi xe/tàu đến ga...?) — luôn dùng «до» + Danh từ Cách 2."
      }
    ],
    "culturalTip": "Khi đứng trên thang cuốn (эскалатор) metro tại Nga, quy tắc bất thành văn là luôn luôn đứng nép về phía bên PHẢI, để làn bên TRÁI cho những người có việc gấp đi bộ vượt lên."
  },
  "jar_bank": {
    "intro": "Mở tài khoản và làm thẻ ngân hàng (đặc biệt là Sberbank, VTB hoặc Tinkoff) là việc cấp thiết để nhận học bổng, chuyển tiền sinh hoạt và chi tiêu không dùng tiền mặt tại Nga. Thủ tục ngân hàng đòi hỏi bạn có hộ chiếu gốc, bản dịch công chứng, thẻ di trú và giấy đăng ký tạm trú hợp lệ.",
    "dialogues": [
      {
        "speaker": "Сотрудник",
        "role": "Giao dịch viên",
        "ru": "Здравствуйте! Возьмите талон в электронной очереди. Чем могу помочь?",
        "vi": "Xin chào! Mời bạn lấy số thứ tự ở máy lấy vé. Tôi có thể giúp gì cho bạn?"
      },
      {
        "speaker": "Anya",
        "role": "Khách hàng",
        "ru": "Здравствуйте! Я иностранная студентка. Мне нужно открыть дебетовую карту «Мир» для получения стипендии.",
        "vi": "Chào anh! Tôi là sinh viên nước ngoài. Tôi cần mở thẻ ghi nợ Mir để nhận học bổng sinh viên ạ."
      },
      {
        "speaker": "Сотрудник",
        "role": "Giao dịch viên",
        "ru": "Пожалуйста, предоставьте ваш паспорт, нотариальный перевод и регистрацию.",
        "vi": "Xin vui lòng xuất trình hộ chiếu, bản dịch công chứng và giấy đăng ký tạm trú."
      },
      {
        "speaker": "Anya",
        "role": "Khách hàng",
        "ru": "Вот все документы. Сколько времени изготавливается пластиковая карта?",
        "vi": "Đây là toàn bộ giấy tờ ạ. Thẻ nhựa làm mất bao lâu thì xong ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Giao dịch viên",
        "ru": "Карта будет готова через три рабочих дня. Мы пришлём СМС на ваш российский номер телефона.",
        "vi": "Thẻ sẽ hoàn thành sau 3 ngày làm việc. Chúng tôi sẽ gửi tin nhắn SMS vào số điện thoại Nga của bạn."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Từ vựng ngân hàng thiết yếu",
        "content": "• «Открыть счёт / карту» (Mở tài khoản / mở thẻ)\n• «Снять наличные» (Rút tiền mặt tại cây ATM)\n• «Перевести деньги по номеру телефона» (Chuyển khoản theo số điện thoại qua hệ thống SBP)"
      },
      {
        "title": "2. Thời gian hoàn thành «через + Thời gian»",
        "content": "Dùng «через» + Danh từ Cách 4 để diễn tả sau bao lâu nữa một việc sẽ xảy ra: «через три дня» (sau 3 ngày nữa), «через неделю» (sau một tuần nữa)."
      }
    ],
    "culturalTip": "Hầu hết các giao dịch thanh toán cá nhân tại Nga hiện nay đều chuyển tiền qua số điện thoại (перевод по СБП). Bạn chỉ cần nhớ số điện thoại đăng ký ngân hàng của đối phương là có thể chuyển tiền tức thì 24/7."
  },
  "jar_post": {
    "intro": "Nhận bưu kiện (посылка) người nhà gửi từ Việt Nam sang hoặc gửi quà lưu niệm Nga về nước là hoạt động quen thuộc của du học sinh qua hệ thống Bưu điện Nga (Почта России). Bạn cần biết cách tra mã định danh bưu chính (трек-номер), xuất trình giấy tờ và điền phiếu nhận hàng.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Khách hàng",
        "ru": "Здравствуйте! Мне пришло уведомление о посылке из Вьетнама. Вот трек-номер и мой паспорт.",
        "vi": "Chào cô ạ! Cháu nhận được thông báo bưu phẩm từ Việt Nam. Đây là mã bưu gửi và hộ chiếu của cháu ạ."
      },
      {
        "speaker": "Оператор",
        "role": "Giao dịch viên bưu điện",
        "ru": "Сейчас проверю по базе данных. Да, посылка прибыла вчера. Распишитесь на извещении.",
        "vi": "Để tôi kiểm tra hệ thống. Đúng rồi, kiện hàng đến hôm qua. Cháu ký vào giấy báo nhận này nhé."
      },
      {
        "speaker": "Anya",
        "role": "Khách hàng",
        "ru": "Мне нужно что-то доплачивать за хранение или доставку?",
        "vi": "Cháu có cần thanh toán thêm phí lưu kho hay vận chuyển gì không ạ?"
      },
      {
        "speaker": "Оператор",
        "role": "Giao dịch viên bưu điện",
        "ru": "Нет, всё уже оплачено отправителем. Пожалуйста, вот ваша посылка. Вес — восемь килограммов.",
        "vi": "Không, người gửi đã thanh toán hết rồi. Đây là kiện hàng của cháu nhé. Cân nặng 8 kg."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Nhận bưu phẩm: Các động từ và cụm từ",
        "content": "• «Получить посылку» (Nhận bưu kiện)\n• «Отправить письмо / бандероль» (Gửi thư / bưu phẩm nhỏ)\n• «Отслеживать по трек-номеру» (Theo dõi bưu phẩm qua mã vận đơn)."
      },
      {
        "title": "2. Câu bị động trạng thái «оплачено»",
        "content": "«Всё уже оплачено» (Mọi chi phí đã được thanh toán xong) — dạng phân từ ngắn của động từ оплатить."
      }
    ],
    "culturalTip": "Bạn nên cài đặt ứng dụng di động Pochta Rossii và đăng ký dịch vụ nhận hàng bằng mã OTP (Простая электронная подпись). Khi đó bạn không cần mang theo giấy thông báo giấy mà chỉ cần đọc mã OTP nhận qua tin nhắn SMS là có thể lấy bưu phẩm rất nhanh."
  },
  "jar_hospital": {
    "intro": "Khám chữa bệnh tại phòng khám (Поликлиника) hoặc bệnh viện Nga là tình huống đòi hỏi vốn từ chuyên sâu về triệu chứng, thân nhiệt, toa thuốc và bảo hiểm y tế (ДМС / ОМС). Việc diễn đạt chính xác cơn đau giúp bác sĩ chẩn đoán đúng bệnh.",
    "dialogues": [
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "Здравствуйте! На что вы жалуетесь? Что у вас болит?",
        "vi": "Chào cháu! Cháu cảm thấy khó chịu ở đâu? Cháu bị đau chỗ nào?"
      },
      {
        "speaker": "Anya",
        "role": "Bệnh nhân",
        "ru": "Здравствуйте, доктор. У меня сильно болит горло, насморк и температура тридцать восемь и пять.",
        "vi": "Chào bác sĩ. Cháu bị đau họng dữ dội, sổ mũi và sốt 38.5 độ ạ."
      },
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "Давно это началось? Давайте послушаем ваши лёгкие. Дышите глубже.",
        "vi": "Triệu chứng bắt đầu từ bao giờ? Nào để bác nghe phổi nhé. Hít thở sâu vào nào."
      },
      {
        "speaker": "Anya",
        "role": "Bệnh nhân",
        "ru": "Вчера вечером после прогулки на морозе.",
        "vi": "Tối qua sau khi cháu đi dạo ngoài trời lạnh ạ."
      },
      {
        "speaker": "Врач",
        "role": "Bác sĩ",
        "ru": "У вас острая простуда. Вот рецепт: пейте много тёплого чая, принимайте жаропонижающее и оставайтесь в постели три дня.",
        "vi": "Cháu bị cảm lạnh cấp tính. Đây là đơn thuốc: uống nhiều trà ấm, uống thuốc hạ sốt và nghỉ ngơi trên giường 3 ngày nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc nói bị đau: «У меня болит / болят...»",
        "content": "• «У меня болит + Danh từ số ít»: «У меня болит голова» (Tôi đau đầu), «У меня болит горло» (Tôi đau họng).\n• «У меня болят + Danh từ số nhiều»: «У меня болят зубы» (Tôi đau răng), «У меня болят глаза» (Tôi đau mắt)."
      },
      {
        "title": "2. Cấu trúc nói nhiệt độ cơ thể",
        "content": "«У меня температура тридцать семь и два» (Tôi sốt 37.2 độ). Khi nói về sốt cao: «высокая температура»."
      }
    ],
    "culturalTip": "Sinh viên quốc tế tại Nga bắt buộc phải mua bảo hiểm y tế tự nguyện (ДМС). Khi có dấu hiệu ốm sốt, hãy gọi ngay số điện thoại hotline trên thẻ bảo hiểm để được điều phối bác sĩ khám miễn phí hoặc đến đúng phòng khám đối tác."
  },
  "jar_dekanat": {
    "intro": "Phòng Quản lý Đào tạo / Giáo vụ Khoa (Деканат) là cơ quan quản lý toàn bộ quá trình học tập của bạn tại trường đại học: lịch học, kỳ thi (сессия), sổ điểm (зачётка), học bổng và gia hạn thị thực sinh viên. Giao tiếp tại Dekanat cần thái độ chuẩn mực, đúng chức danh và thủ tục hành chính.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Здравствуйте! Извините, можно войти?",
        "vi": "Em chào các thầy cô! Xin lỗi cho em hỏi em có thể vào được không ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Cán bộ giáo vụ",
        "ru": "Да, проходите. Из какой вы группы и какой у вас вопрос?",
        "vi": "Vào đi em. Em ở lớp nào và có việc gì cần giải quyết?"
      },
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Я из группы 201. Мне нужна академическая справка для продления студенческой визы.",
        "vi": "Em ở lớp 201 ạ. Em cần xin giấy xác nhận sinh viên để làm thủ tục gia hạn visa du học."
      },
      {
        "speaker": "Сотрудник",
        "role": "Cán bộ giáo vụ",
        "ru": "Напишите заявление по образцу. Справка будет готова завтра после обеда.",
        "vi": "Em viết đơn theo mẫu này nhé. Giấy xác nhận sẽ có vào chiều mai sau giờ ăn trưa."
      },
      {
        "speaker": "Anya",
        "role": "Sinh viên",
        "ru": "Спасибо огромное! А когда начинается зимняя экзаменационная сессия?",
        "vi": "Em cảm ơn cô rất nhiều! Cho em hỏi kỳ thi học kỳ mùa đông khi nào bắt đầu ạ?"
      },
      {
        "speaker": "Сотрудник",
        "role": "Cán bộ giáo vụ",
        "ru": "Сессия начнётся десятого января. Расписание зачётов уже висит на стенде.",
        "vi": "Kỳ thi bắt đầu từ ngày 10 tháng 1. Lịch thi điều kiện (zachyot) đã dán trên bảng thông báo rồi em nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Xin phép lịch sự khi vào văn phòng",
        "content": "«Извините, можно войти?» (Xin lỗi, tôi có thể vào được không?)\n«Можно спросить?» (Tôi có thể hỏi một chút được không?)\n«Мне нужна справка...» (Tôi cần một giấy xác nhận... — dùng «нужна» vì «справка» là giống cái)."
      },
      {
        "title": "2. Phân biệt thi cử tại đại học Nga: «Зачёт» và «Экзамен»",
        "content": "• «Зачёт» (Thi điều kiện): chỉ có kết quả Đạt (зачтено) hoặc Không đạt (не зачтено).\n• «Экзамен» (Thi học phần): chấm theo thang điểm 5 (2 = Trượt, 3 = Trung bình, 4 = Khá, 5 = Giỏi/Xuất sắc)."
      }
    ],
    "culturalTip": "Để gia hạn visa sinh viên, bạn phải nộp hồ sơ lên Dekanat hoặc Phòng Hợp tác Quốc tế (Международный отдел) trước khi visa cũ hết hạn ít nhất 45 ngày làm việc. Quá hạn visa tại Nga có thể bị phạt hành chính và trục xuất rất nghiêm ngặt."
  },
  "jar_travel": {
    "intro": "Du lịch và khám phá lãnh thổ trải dài qua 11 múi giờ của nước Nga là ước mơ của mọi người học tiếng Nga. Từ chuyến tàu hỏa xuyên Siberia huyền thoại (Транссиб), hồ nước ngọt Baikal sâu nhất hành tinh, đến vẻ đẹp tráng lệ của cố đô Saint Petersburg hay thủ phủ Kazan ngàn năm.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Du khách",
        "ru": "Здравствуйте! Я хочу купить билет на поезд «Сапсан» из Москвы в Санкт-Петербург на пятницу.",
        "vi": "Xin chào! Tôi muốn mua vé tàu cao tốc Sapsan từ Moskva đi Saint Petersburg vào thứ Sáu ạ."
      },
      {
        "speaker": "Кассир РЖД",
        "role": "Thu ngân đường sắt",
        "ru": "Утренний рейс в семь сорок или дневной в тринадцать тридцать? Есть места у окна в вагоне эконом-класса.",
        "vi": "Chuyến sáng lúc 7:40 hay chuyến chiều lúc 13:30? Còn chỗ ngồi cạnh cửa sổ toa phổ thông ạ."
      },
      {
        "speaker": "Anya",
        "role": "Du khách",
        "ru": "Утренний рейс, пожалуйста. Сколько длится поездка?",
        "vi": "Cho tôi chuyến sáng ạ. Chuyến đi mất bao lâu thời gian ạ?"
      },
      {
        "speaker": "Кассир РЖД",
        "role": "Thu ngân đường sắt",
        "ru": "Поезд идёт ровно четыре часа. Прибытие на Московский вокзал Петербурга.",
        "vi": "Tàu chạy đúng 4 tiếng. Đến ga Moskovsky tại Petersburg nhé bạn."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mua vé tàu xe: Điểm đi và điểm đến",
        "content": "• «из Москвы в Санкт-Петербург» (từ Moskva đi Saint Petersburg) — dùng «из» + Cách 2 và «в» + Cách 4.\n• «билет на поезд / на самолёт» (vé đi tàu / vé máy bay) — dùng «на» + Cách 4."
      },
      {
        "title": "2. Nói về thời gian kéo dài của hành trình",
        "content": "«Сколько длится поездка? — Поездка длится четыре часа» (Chuyến đi kéo dài bao lâu? — Kéo dài 4 tiếng)."
      }
    ],
    "culturalTip": "Đi tàu hỏa đường dài tại Nga (РЖД), nét văn hóa đặc trưng là hành khách luôn chuẩn bị quần áo thoải mái để thay trên tàu, mang theo dép lê và cùng chia sẻ đồ ăn vặt, uống trà nóng từ chiếc cốc thủy tinh có giá đỡ kim loại truyền thống (подстаканник)."
  },
  "jar_academic": {
    "intro": "Ở cấp độ B2 (TRKI-2), sinh viên chuyển từ giao tiếp sinh hoạt sang nghiên cứu học thuật chuyên sâu: đọc hiểu bài báo khoa học, viết khóa luận cử nhân/thạc sĩ (дипломная работа), bảo vệ đề tài và trích dẫn tài liệu tham khảo theo quy chuẩn quốc gia GOST.",
    "dialogues": [
      {
        "speaker": "Anya",
        "role": "Học viên",
        "ru": "Здравствуйте, профессор! Я подготовила черновик первой главы моей дипломной работы.",
        "vi": "Kính chào Giáo sư! Em đã hoàn thành bản thảo chương 1 của luận văn tốt nghiệp ạ."
      },
      {
        "speaker": "Профессор",
        "role": "Giáo sư hướng dẫn",
        "ru": "Добрый день, Аня. Какова научная новизна и методология вашего исследования?",
        "vi": "Chào Anya. Tính mới khoa học và phương pháp luận trong nghiên cứu của em là gì?"
      },
      {
        "speaker": "Anya",
        "role": "Học viên",
        "ru": "В исследовании проведён сравнительный анализ данных и предложена новая математическая модель.",
        "vi": "Trong nghiên cứu đã tiến hành phân tích so sánh dữ liệu và đề xuất mô hình toán học mới ạ."
      },
      {
        "speaker": "Профессор",
        "role": "Giáo sư hướng dẫn",
        "ru": "Хорошо. Обратите внимание на оформление библиографического списка по стандарту ГОСТ.",
        "vi": "Tốt lắm. Em chú ý quy cách trình bày danh mục tài liệu tham khảo theo tiêu chuẩn GOST nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc học thuật văn phong viết (Научный стиль)",
        "content": "Văn phong khoa học tiếng Nga ưa chuộng câu bị động và danh từ hóa hành động:\n• «Проведён анализ...» (Đã tiến hành phân tích...)\n• «В работе рассматривается проблема...» (Trong công trình xem xét vấn đề...)\n• «Полученные результаты подтверждают...» (Các kết quả thu được khẳng định...)."
      },
      {
        "title": "2. Giới từ học thuật «согласно / в соответствии с»",
        "content": "• «согласно исследованию» (theo nghiên cứu — Cách 3)\n• «в соответствии с требованиями» (phù hợp với các yêu cầu — Cách 5)."
      }
    ],
    "culturalTip": "Khi bảo vệ luận văn (защита диплома) tại Nga, việc chuẩn bị bài phát biểu (доклад) ngắn gọn trong đúng 7-10 phút cùng slide trình chiếu chuẩn xác là yếu tố quyết định để Hội đồng chấm điểm cao nhất (Отлично)."
  },
  "jar_interview": {
    "intro": "Gia nhập thị trường việc làm hoặc thực tập tại các công ty Nga đòi hỏi bạn làm chủ quy trình phỏng vấn tuyển dụng: viết sơ yếu lý lịch CV chuẩn Nga (Резюме), đàm phán hợp đồng lao động (трудовой договор) và nắm vững văn hóa công sở.",
    "dialogues": [
      {
        "speaker": "HR-менеджер",
        "role": "Trưởng phòng nhân sự",
        "ru": "Здравствуйте, Аня! Расскажите кратко о вашем опыте работы и ключевых компетенциях.",
        "vi": "Xin chào Anya! Bạn hãy giới thiệu ngắn gọn về kinh nghiệm làm việc và các năng lực cốt lõi của mình."
      },
      {
        "speaker": "Anya",
        "role": "Ứng viên",
        "ru": "Здравствуйте! Я имею опыт работы в международной логистике, свободно владею русским и английским языками.",
        "vi": "Xin chào! Tôi có kinh nghiệm trong ngành logistics quốc tế, thông thạo tiếng Nga và tiếng Anh."
      },
      {
        "speaker": "HR-менеджер",
        "role": "Trưởng phòng nhân sự",
        "ru": "Каковы ваши ожидания по уровню заработной платы и графику работы?",
        "vi": "Kỳ vọng của bạn về mức lương và lịch làm việc như thế nào?"
      },
      {
        "speaker": "Anya",
        "role": "Ứng viên",
        "ru": "Я ориентируюсь на рынок и готова к полному рабочему дню с возможностью гибридного формата.",
        "vi": "Tôi hướng theo mặt bằng thị trường và sẵn sàng làm việc toàn thời gian với chế độ làm việc kết hợp linh hoạt ạ."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ diễn đạt kỹ năng và năng lực chuyên môn",
        "content": "• «Владеть языком / технологией» (Thông thạo ngôn ngữ / công nghệ — dùng Cách 5)\n• «Иметь опыт работы в сфере...» (Có kinh nghiệm làm việc trong lĩnh vực... — dùng Cách 6)\n• «Быть ответственным за...» (Chịu trách nhiệm về... — dùng Cách 4)."
      },
      {
        "title": "2. Mẫu câu trả lời phỏng vấn chuyên nghiệp",
        "content": "«Я стремлюсь к профессиональному росту...» (Tôi hướng tới sự phát triển nghề nghiệp...)\n«Моя цель — принести максимальную пользу компании» (Mục tiêu của tôi là mang lại giá trị tối đa cho công ty)."
      }
    ],
    "culturalTip": "Tại công sở Nga, tính thẳng thắn và sự minh bạch trong công việc được đánh giá rất cao. Khi phỏng vấn, hãy tự tin trả lời đúng trọng tâm câu hỏi, dẫn chứng cụ thể bằng số liệu thành tích thay vì nói chung chung."
  },
  "jar_media": {
    "intro": "Đọc hiểu báo chí, các kênh truyền thông chính thống và bình luận phân tích xã hội (như TASS, RIA Novosti, Kommersant, RT) là đỉnh cao của trình độ B2/C1. Bạn sẽ tiếp cận với ngôn ngữ báo chí chính luận hiện đại, các thuật ngữ kinh tế - ngoại giao và góc nhìn đa chiều.",
    "dialogues": [
      {
        "speaker": "Ведущий",
        "role": "Bình luận viên tin tức",
        "ru": "В эфире аналитическая программа «Главные события недели». Сегодня в фокусе — развитие международного сотрудничества.",
        "vi": "Quý vị đang theo dõi chương trình phân tích Thời sự tuần qua. Tâm điểm hôm nay là sự phát triển hợp tác quốc tế."
      },
      {
        "speaker": "Эксперт",
        "role": "Chuyên gia phân tích",
        "ru": "По последним данным статистики, товарооборот между странами вырос на двадцать процентов.",
        "vi": "Theo số liệu thống kê mới nhất, kim ngạch thương mại giữa các quốc gia đã tăng 20%."
      },
      {
        "speaker": "Ведущий",
        "role": "Bình luận viên tin tức",
        "ru": "Какие ключевые факторы повлияли на такую положительную динамику?",
        "vi": "Những nhân tố then chốt nào đã tác động đến xu hướng tích cực này thưa ông?"
      },
      {
        "speaker": "Эксперт",
        "role": "Chuyên gia phân tích",
        "ru": "Прежде всего — развитие новых логистических коридоров и расширение прямых расчётов в национальных валютах.",
        "vi": "Trước hết là việc phát triển các hành lang logistics mới và mở rộng thanh toán trực tiếp bằng đồng nội tệ."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Mẫu câu dẫn nguồn tin tức báo chí",
        "content": "• «По данным агентства...» (Theo số liệu của hãng thông tấn... — dùng Cách 3)\n• «Как сообщает источник...» (Như nguồn tin cho biết...)\n• «В соответствии с официальным заявлением...» (Phù hợp với tuyên bố chính thức...)."
      },
      {
        "title": "2. Từ ngữ biểu đạt xu hướng và biến động",
        "content": "• «рост / падение товарооборота» (sự tăng trưởng / sụt giảm kim ngạch)\n• «положительная / отрицательная динамика» (xu hướng tích cực / tiêu cực)\n• «повлиять на что-то» (tác động đến điều gì — dùng Cách 4)."
      }
    ],
    "culturalTip": "Để nâng cao khả năng đọc hiểu tin tức tiếng Nga, bạn hãy luyện đọc lướt tiêu đề (заголовки) và đoạn tóm tắt mở đầu (лид) của các bài báo trước. Báo chí tiếng Nga luôn đưa thông tin cốt lõi nhất (Ai làm gì, ở đâu, khi nào) vào ngay câu đầu tiên của bản tin."
  }
};


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
  window.TOPIC_ARTICLES = typeof TOPIC_ARTICLES !== "undefined" ? TOPIC_ARTICLES : {};
  window.SHOP_PRODUCTS = typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : [];
  window.PACKAGES = typeof PACKAGES !== "undefined" ? PACKAGES : [];
  window.BLOG_POSTS = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
}
