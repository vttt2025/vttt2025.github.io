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
    "categoryName": "Đề thi toàn diện chuẩn quốc tế",
    "title": "Đề thi chuẩn quốc tế ТРКИ ТЭУ (Trình độ sơ cấp A1)",
    "durationMin": 45,
    "passPercent": 66,
    "is_pro_only": false,
    "icon": "award-badge",
    "parts": [
      {
        "id": "gram",
        "name": "Часть 1. Лексика и грамматика",
        "vi": "Phần 1. Từ vựng & Ngữ pháp (20 câu)",
        "durationMin": 20,
        "questions": [
          {
            "q": "Это Антон. Он ___ студент.",
            "a": 0,
            "options": [
              "хороший",
              "хорошая",
              "хорошее",
              "хорошие"
            ],
            "ex": "Danh từ 'студент' là giống đực số ít Cách 1 -> đi với tính từ đuôi giống đực 'хороший'."
          },
          {
            "q": "Мы сейчас живём в ___.",
            "a": 1,
            "options": [
              "Россия",
              "России",
              "Россию",
              "Россией"
            ],
            "ex": "Giới từ 'в' chỉ nơi chốn đi với Cách 6. Danh từ tận cùng -ия chuyển thành -ии (в России)."
          },
          {
            "q": "Вчера вечером Анна ___ в библиотеку.",
            "a": 0,
            "options": [
              "ходила",
              "идёт",
              "пойдёт",
              "поехала"
            ],
            "ex": "Hành động đã xảy ra trong quá khứ (vừa đi vừa về) bằng chân -> dùng quá khứ động từ khứ hồi 'ходила'."
          },
          {
            "q": "Мой брат в университете изучает ___.",
            "a": 0,
            "options": [
              "русский язык",
              "русском языке",
              "русскому языку",
              "русским языком"
            ],
            "ex": "Động từ 'изучать' đòi hỏi tân ngữ trực tiếp Cách 4 bất động vật giống đực (giữ nguyên như Cách 1: русский язык)."
          },
          {
            "q": "К сожалению, у меня сейчас нет ___.",
            "a": 1,
            "options": [
              "словарь",
              "словаря",
              "словарю",
              "словарём"
            ],
            "ex": "Cấu trúc phủ định 'нет' luôn đòi hỏi danh từ ở Cách 2 số ít (словарь -> словаря)."
          },
          {
            "q": "Каждое воскресенье я звоню ___.",
            "a": 2,
            "options": [
              "мама",
              "маму",
              "маме",
              "мамой"
            ],
            "ex": "Động từ 'звонить' đòi hỏi bổ ngữ tiếp nhận ở Cách 3 (gọi cho ai: звонить маме)."
          },
          {
            "q": "Скажите, пожалуйста, где находится ___?",
            "a": 0,
            "options": [
              "станция метро",
              "станцию метро",
              "станции метро",
              "станцией метро"
            ],
            "ex": "Chủ ngữ sau 'где находится' đứng ở Cách 1 (dạng nguyên thể: станция метро)."
          },
          {
            "q": "Студенты часто пишут письма ___ родителям.",
            "a": 2,
            "options": [
              "свои",
              "своих",
              "своим",
              "своими"
            ],
            "ex": "Bổ ngữ chỉ đối tượng nhận thư 'родителям' ở Cách 3 số nhiều -> đại từ sở hữu 'своим'."
          },
          {
            "q": "Виктор любит пить зелёный чай с ___.",
            "a": 3,
            "options": [
              "лимон",
              "лимона",
              "лимону",
              "лимоном"
            ],
            "ex": "Giới từ 'с' mang nghĩa 'với, cùng với' đòi hỏi danh từ ở Cách 5 số ít (лимон -> лимоном)."
          },
          {
            "q": "Когда вы ___ этот новый фильм?",
            "a": 0,
            "options": [
              "смотрели",
              "смотрите",
              "посмотрите",
              "смотреть"
            ],
            "ex": "Câu hỏi về sự kiện đã trải nghiệm trong quá khứ với chủ ngữ 'вы' -> dùng quá khứ số nhiều 'смотрели'."
          },
          {
            "q": "Это новый учебник ___ преподавателя.",
            "a": 1,
            "options": [
              "наш",
              "нашего",
              "нашему",
              "нашим"
            ],
            "ex": "Quan hệ sở hữu danh từ giống đực đứng ở Cách 2 số ít -> đại từ 'нашего'."
          },
          {
            "q": "Мы договорились встретиться в ___ часа.",
            "a": 0,
            "options": [
              "два",
              "две",
              "двух",
              "двоих"
            ],
            "ex": "Số từ 2 đi với danh từ giống đực 'час' (Cách 2 số ít 'часа') là 'два'."
          },
          {
            "q": "Сегодня на улице очень ___.",
            "a": 2,
            "options": [
              "холод",
              "холодный",
              "холодно",
              "холода"
            ],
            "ex": "Câu vô nhân xưng mô tả thời tiết dùng trạng từ/vị từ kết thúc đuôi -о ('холодно')."
          },
          {
            "q": "Куда вы ___ завтра утром?",
            "a": 0,
            "options": [
              "поедете",
              "ехали",
              "ездили",
              "поехали"
            ],
            "ex": "Thời gian 'завтра' đòi hỏi thì tương lai. Đi xa bằng phương tiện ngôi 'вы' -> 'поедете'."
          },
          {
            "q": "Моя младшая сестра красиво играет на ___.",
            "a": 2,
            "options": [
              "гитара",
              "гитару",
              "гитаре",
              "гитарой"
            ],
            "ex": "Cấu trúc 'играть на' + Cách 6 dùng khi nói về chơi nhạc cụ (играть на гитаре)."
          },
          {
            "q": "Я не знаю, ___ зовут этого молодого человека.",
            "a": 1,
            "options": [
              "кто",
              "как",
              "что",
              "где"
            ],
            "ex": "Thành ngữ hỏi và nói về tên người trong tiếng Nga dùng trạng từ 'Как' (Как зовут...)."
          },
          {
            "q": "Дайте мне, пожалуйста, стакан холодной ___.",
            "a": 1,
            "options": [
              "вода",
              "воды",
              "воде",
              "водой"
            ],
            "ex": "Sau từ chỉ lượng, đồ chứa như 'стакан' (cốc), danh từ đi ở Cách 2 số ít (вода -> воды)."
          },
          {
            "q": "Они живут и работают в Москве уже пять ___.",
            "a": 2,
            "options": [
              "год",
              "года",
              "лет",
              "годами"
            ],
            "ex": "Sau số từ từ 5 trở lên, danh từ chỉ năm chuyển sang dạng Cách 2 số nhiều bất quy tắc là 'лет'."
          },
          {
            "q": "Мой вьетнамский друг ___ по-русски очень хорошо.",
            "a": 0,
            "options": [
              "говорит",
              "говорить",
              "скажет",
              "расскажет"
            ],
            "ex": "Diễn đạt năng lực giao tiếp ngôn ngữ ở hiện tại với chủ ngữ ngôi thứ 3 số ít 'друг' -> 'говорит'."
          },
          {
            "q": "Мы решили остаться дома, ___ на улице шел сильный дождь.",
            "a": 0,
            "options": [
              "потому что",
              "поэтому",
              "чтобы",
              "если"
            ],
            "ex": "Mệnh đề giải thích nguyên nhân cho hành động ở vế trước dùng liên từ 'потому что' (bởi vì)."
          }
        ]
      },
      {
        "id": "reading",
        "name": "Часть 2. Чтение",
        "vi": "Phần 2. Đọc hiểu văn bản (8 câu)",
        "durationMin": 15,
        "text": {
          "ru": "Здравствуйте, дорогие родители!\n\nПишет вам ваш сын Нам из Москвы. Я уже две недели живу в России. Я поступил на подготовительный факультет Московского государственного университета имени М.В. Ломоносова (МГУ).\n\nНаше общежитие находится на Воробьёвых горах, недалеко от главного здания университета. Общежитие очень удобное, в комнате тепло и есть всё необходимое: стол, шкаф, кровать и быстрый интернет. Я живу в комнате вместе с другом по имени Марко. Он приехал из Италии. Мы общаемся только по-русски, потому что я не знаю итальянский язык, а Марко не знает вьетнамский. Это отличная языковая практика для нас обоих!\n\nКаждый день с понедельника по пятницу у нас уроки русского языка. Занятия начинаются в 9 часов утра и заканчиваются в 3 часа дня. Наш преподаватель, Елена Николаевна, очень добрая и опытная. Она всё объясняет понятно и терпеливо. Мы читаем тексты, учим падежи и говорим о культуре России.\n\nВчера в субботу мы с Марко впервые поехали на Красную площадь на метро. Московское метро невероятно красивое, как настоящий подземный дворец! Погода сейчас хорошая, хотя для меня немного прохладно: на улице около 10 градусов тепла. Я купил себе тёплую куртку и шапку.\n\nНе волнуйтесь за меня, у меня всё отлично. Передавайте привет бабушке и сестре!\n\nВаш сын Нам.",
          "vi": "Chào bố mẹ thân yêu!\n\nCon là Nam, con viết thư này cho bố mẹ từ Moskva. Con đã sống ở Nga được hai tuần rồi. Con đã nhập học vào khoa dự bị của Đại học Tổng hợp Quốc gia Moskva mang tên M.V. Lomonosov (MGU).\n\nKý túc xá của chúng con nằm ở Đồi Chim Sẻ, không xa tòa nhà chính của trường. Ký túc xá rất tiện nghi, trong phòng ấm áp và có đầy đủ mọi thứ cần thiết: bàn học, tủ quần áo, giường và internet tốc độ cao. Con ở cùng phòng với một người bạn tên là Marco. Cậu ấy đến từ Ý. Chúng con chỉ nói chuyện bằng tiếng Nga vì con không biết tiếng Ý, còn Marco không biết tiếng Việt. Đây là cơ hội luyện tập ngôn ngữ tuyệt vời cho cả hai đứa!\n\nTừ thứ Hai đến thứ Sáu hàng tuần, chúng con đều có các buổi học tiếng Nga. Lớp học bắt đầu lúc 9 giờ sáng và kết thúc lúc 3 giờ chiều. Cô giáo của chúng con, cô Elena Nikolaevna, rất tốt bụng và giàu kinh nghiệm. Cô giải thích mọi thứ rất dễ hiểu và kiên nhẫn. Chúng con đọc các đoạn văn, học các Cách và trò chuyện về văn hóa nước Nga.\n\nHôm qua là thứ Bảy, con và Marco lần đầu tiên đi tàu điện ngầm đến Quảng trường Đỏ. Tàu điện ngầm Moskva đẹp đến kinh ngạc, như một cung điện nguy nga dưới lòng đất! Thời tiết bây giờ khá dễ chịu, dù đối với con hơi se lạnh: ngoài trời khoảng 10 độ C. Con đã mua cho mình một chiếc áo khoác ấm và mũ len.\n\nBố mẹ đừng lo cho con nhé, mọi thứ với con đều rất tuyệt vời. Cho con gửi lời hỏi thăm đến bà và em gái!\n\nCon trai của bố mẹ, Nam."
        },
        "questions": [
          {
            "q": "Сколько времени Нам уже живёт в России?",
            "a": 1,
            "options": [
              "Два дня",
              "Две недели",
              "Два месяца",
              "Два года"
            ],
            "ex": "Dẫn chứng trong đoạn 1: 'Я уже две недели живу в России.'"
          },
          {
            "q": "В каком университете учится Нам?",
            "a": 0,
            "options": [
              "В МГУ",
              "В РУДН",
              "В СПбГУ",
              "В МГИМО"
            ],
            "ex": "Dẫn chứng trong đoạn 1: 'Я поступил на подготовительный факультет Московского государственного университета имени М.В. Ломоносова (МГУ).'"
          },
          {
            "q": "Откуда приехал сосед Нама по комнате?",
            "a": 2,
            "options": [
              "Из Франции",
              "Из Германии",
              "Из Италии",
              "Из Испании"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'Я живу в комнате вместе с другом по имени Марко. Он приехал из Италии.'"
          },
          {
            "q": "На каком языке общаются Нам и Марко?",
            "a": 1,
            "options": [
              "На английском языке",
              "На русском языке",
              "На итальянском языке",
              "На вьетнамском языке"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'Мы общаемся только по-русски...'"
          },
          {
            "q": "В какое время начинаются занятия в университете?",
            "a": 0,
            "options": [
              "В 9 часов утра",
              "В 8 часов утра",
              "В 10 часов утра",
              "В 12 часов дня"
            ],
            "ex": "Dẫn chứng trong đoạn 3: 'Занятия начинаются в 9 часов утра и заканчиваются в 3 часа дня.'"
          },
          {
            "q": "Как зовут преподавателя русского языка?",
            "a": 2,
            "options": [
              "Анна Ивановна",
              "Ольга Сергеевна",
              "Елена Николаевна",
              "Мария Петровна"
            ],
            "ex": "Dẫn chứng trong đoạn 3: 'Наш преподаватель, Елена Николаевна, очень добрая и опытная.'"
          },
          {
            "q": "Куда поехали Нам и Марко в субботу?",
            "a": 1,
            "options": [
              "В Большой театр",
              "На Красную площадь",
              "В парк Горького",
              "В Третьяковскую галерею"
            ],
            "ex": "Dẫn chứng trong đoạn 4: 'Вчера в субботу мы с Марко впервые поехали на Красную площадь на метро.'"
          },
          {
            "q": "Какая температура воздуха на улице в Москве?",
            "a": 0,
            "options": [
              "Около 10 градусов тепла",
              "Около 0 градусов",
              "Около 20 градусов тепла",
              "Минус 5 градусов"
            ],
            "ex": "Dẫn chứng trong đoạn 4: '...на улице около 10 градусов тепла.'"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Часть 3. Аудирование",
        "vi": "Phần 3. Nghe hiểu hội thoại đời sống (6 câu)",
        "durationMin": 10,
        "lines": [
          {
            "ru": "— Извините, девушка! Скажите, пожалуйста, как доехать до станции метро «Университет»?"
          },
          {
            "ru": "— Вам нужно сесть на поезд на этой платформе и проехать четыре станции прямо, без пересадки."
          },
          {
            "ru": "— Спасибо большое! А сколько стоит одна поездка на метро по карте «Тройка»?"
          },
          {
            "ru": "— Одна поездка стоит пятьдесят четыре рубля. Вы можете купить карту в кассе или в автомате."
          },
          {
            "ru": "— Понятно. И ещё один вопрос: где здесь находится студенческая столовая?"
          },
          {
            "ru": "— Столовая находится на втором этаже, рядом с читальным залом библиотеки. Она работает до шести часов вечера."
          },
          {
            "ru": "— Огромное спасибо за помощь! Хорошего вам дня!"
          },
          {
            "ru": "— Пожалуйста, успехов в учёбе!"
          }
        ],
        "questions": [
          {
            "q": "До какой станции метро хочет доехать молодой человек?",
            "a": 2,
            "options": [
              "«Охотный ряд»",
              "«Воробьёвы горы»",
              "«Университет»",
              "«Китай-город»"
            ],
            "ex": "Dẫn chứng lời thoại câu 1: '...как доехать до станции метро «Университет»?'"
          },
          {
            "q": "Сколько станций нужно проехать без пересадки?",
            "a": 1,
            "options": [
              "Две станции",
              "Четыре станции",
              "Три станции",
              "Пять станций"
            ],
            "ex": "Dẫn chứng lời thoại câu 2: '...проехать четыре станции прямо, без пересадки.'"
          },
          {
            "q": "Сколько стоит одна поездка по карте «Тройка»?",
            "a": 2,
            "options": [
              "45 рублей",
              "50 рублей",
              "54 рубля",
              "60 рублей"
            ],
            "ex": "Dẫn chứng lời thoại câu 4: 'Одна поездка стоит пятьдесят четыре рубля.'"
          },
          {
            "q": "Где можно купить транспортную карту «Тройка»?",
            "a": 0,
            "options": [
              "В кассе или в автомате",
              "Только в банке",
              "В киоске печати",
              "У водителя автобуса"
            ],
            "ex": "Dẫn chứng lời thoại câu 4: 'Вы можете купить карту в кассе или в автомате.'"
          },
          {
            "q": "На каком этаже находится студенческая столовая?",
            "a": 1,
            "options": [
              "На первом этаже",
              "На втором этаже",
              "На третьем этаже",
              "В подвальном этаже"
            ],
            "ex": "Dẫn chứng lời thoại câu 6: 'Столовая находится на втором этаже...'"
          },
          {
            "q": "До какого времени работает студенческая столовая?",
            "a": 2,
            "options": [
              "До пяти часов",
              "До восьми часов",
              "До шести часов вечера",
              "Круглосуточно"
            ],
            "ex": "Dẫn chứng lời thoại câu 6: 'Она работает до шести часов вечера.'"
          }
        ]
      }
    ,
{
      "id": "writing",
      "name": "Часть 4. Письмо",
      "vi": "Phần 4. Kỹ năng Viết (Tự luận & Điền mẫu)",
      "durationMin": 25,
      "writing_tasks": [
            {
                  "task_num": 1,
                  "title": "Tự giới thiệu bản thân hoặc viết thiệp ngắn",
                  "prompt": "Напишите короткий рассказ о себе (ваше имя, откуда вы, где вы живёте, что вы изучаете и чем увлекаетесь) или напишите короткую открытку другу. (Объём: 35–50 слов).",
                  "vi": "Viết đoạn văn ngắn giới thiệu bản thân (tên, quê quán, nơi ở, ngành học và sở thích) hoặc bưu thiếp gửi bạn bè. (Dung lượng: 35-50 từ).",
                  "minWords": 35,
                  "suggested": [
                        "Меня зовут...",
                        "Я из Вьетнама",
                        "Я живу в...",
                        "Я изучаю русский язык",
                        "В свободное время я..."
                  ]
            }
      ]
},
{
      "id": "speaking",
      "name": "Часть 5. Говорение",
      "vi": "Phần 5. Kỹ năng Nói (Vấn đáp & Giao tiếp tình huống)",
      "durationMin": 15,
      "speaking_tasks": [
            {
                  "task_num": 1,
                  "title": "Tình huống 1: Làm quen & Chào hỏi",
                  "prompt": "Вы познакомились со студентом из России. Спросите, как его зовут, откуда он и на каком факультете учится.",
                  "vi": "Bạn làm quen với một sinh viên người Nga. Hãy hỏi tên, quê quán và khoa bạn ấy đang học.",
                  "suggested": "Здравствуйте! Меня зовут... Очень приятно! А как вас зовут? Откуда вы? На каком факультете вы учитесь?"
            },
            {
                  "task_num": 2,
                  "title": "Tình huống 2: Hỏi đường & Địa điểm",
                  "prompt": "Вы хотите узнать, где находится библиотека или столовая в университете. Обратитесь к дежурному.",
                  "vi": "Bạn muốn hỏi đường tới thư viện hoặc căn tin trường đại học. Hãy hỏi người trực nhật.",
                  "suggested": "Скажите, пожалуйста, где находится библиотека? Как туда пройти? Спасибо большое!"
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
    "categoryName": "Đề thi toàn diện chuẩn quốc tế",
    "title": "Đề thi chuẩn quốc tế ТРКИ ТБУ (Trình độ cơ bản A2)",
    "durationMin": 50,
    "passPercent": 66,
    "is_pro_only": false,
    "icon": "award-badge",
    "parts": [
      {
        "id": "gram",
        "name": "Часть 1. Лексика и грамматика",
        "vi": "Phần 1. Từ vựng & Ngữ pháp (20 câu)",
        "durationMin": 25,
        "questions": [
          {
            "q": "Вчера весь вечер Виктор ___ домашнее задание по математике.",
            "a": 0,
            "options": [
              "делал",
              "сделал",
              "сделает",
              "будет делать"
            ],
            "ex": "Cụm từ chỉ khoảng thời gian kéo dài 'весь вечер' đòi hỏi động từ thể chưa hoàn thành quá khứ: 'делал'."
          },
          {
            "q": "За два часа студент наконец ___ все трудные упражнения.",
            "a": 1,
            "options": [
              "делал",
              "сделал",
              "делает",
              "будет делать"
            ],
            "ex": "Cụm từ 'за два часа' và phó từ 'наконец' nhấn mạnh kết quả hoàn thành -> dùng thể hoàn thành 'сделал'."
          },
          {
            "q": "Каждое утро Ольга ___ на работу на метро.",
            "a": 2,
            "options": [
              "едет",
              "поедет",
              "ездит",
              "ехала"
            ],
            "ex": "Hành động lặp đi lặp lại thường xuyên 'каждое утро' bằng phương tiện giao thông -> dùng động từ đa hướng 'ездит'."
          },
          {
            "q": "Посмотри в окно: куда так быстро ___ этот человек?",
            "a": 0,
            "options": [
              "идёт",
              "ходит",
              "пошёл",
              "ходил"
            ],
            "ex": "Hành động đang diễn ra ngay tại thời điểm nói theo một hướng xác định bằng chân -> dùng 'идёт'."
          },
          {
            "q": "В нашей университетской группе учится много иностранных ___.",
            "a": 1,
            "options": [
              "студенты",
              "студентов",
              "студентам",
              "студентами"
            ],
            "ex": "Sau từ chỉ số lượng 'много' danh từ giống đực đứng ở Cách 2 số nhiều (студентов)."
          },
          {
            "q": "В этом старинном городе совсем нет современных ___.",
            "a": 2,
            "options": [
              "здание",
              "здания",
              "зданий",
              "зданиям"
            ],
            "ex": "Cấu trúc phủ định 'нет' đi kèm danh từ số nhiều giống trung -ие -> Cách 2 số nhiều đuôi -ий ('зданий')."
          },
          {
            "q": "Мы долго гуляли ___ старинными домами и узкими переулками.",
            "a": 3,
            "options": [
              "в",
              "на",
              "около",
              "между"
            ],
            "ex": "Giới từ chỉ vị trí ở giữa 'между' đòi hỏi danh từ ở Cách 5 số nhiều ('между старинными домами')."
          },
          {
            "q": "Преподаватель вошёл в аудиторию и встал ___ студентами.",
            "a": 2,
            "options": [
              "за",
              "над",
              "перед",
              "под"
            ],
            "ex": "Giới từ 'перед' (đứng trước mặt ai) đòi hỏi Cách 5 ('перед студентами')."
          },
          {
            "q": "Я советую тебе ___ эту интересную научную книгу.",
            "a": 1,
            "options": [
              "читать",
              "прочитать",
              "читал",
              "прочитал"
            ],
            "ex": "Sau 'советую' khuyên đạt kết quả trọn vẹn đọc hết cuốn sách -> dùng động từ thể hoàn thành nguyên thể 'прочитать'."
          },
          {
            "q": "Это тот самый молодой учёный, о ___ мы читали в журнале.",
            "a": 2,
            "options": [
              "который",
              "которого",
              "котором",
              "которым"
            ],
            "ex": "Mệnh đề quan hệ với giới từ 'о' (nói về ai) đòi hỏi đại từ quan hệ ở Cách 6 giống đực: 'о котором'."
          },
          {
            "q": "Девушка, с ___ разговаривает декан, приехала из Ханоя.",
            "a": 3,
            "options": [
              "которая",
              "которую",
              "которой",
              "которой"
            ],
            "ex": "Giới từ 'с' (nói chuyện với ai) đòi hỏi đại từ quan hệ ở Cách 5 giống cái: 'с которой'."
          },
          {
            "q": "Я пришёл в библиотеку, ___ взять учебники по физике.",
            "a": 1,
            "options": [
              "потому что",
              "чтобы",
              "поэтому",
              "если"
            ],
            "ex": "Mệnh đề chỉ mục đích (đến để làm gì) cùng chủ ngữ dùng liên từ 'чтобы' + động từ nguyên thể ('чтобы взять')."
          },
          {
            "q": "___ завтра будет хорошая погода, мы поедем за город.",
            "a": 0,
            "options": [
              "Если",
              "Хотя",
              "Чтобы",
              "Потому что"
            ],
            "ex": "Mệnh đề điều kiện giả định trong tương lai dùng liên từ điều kiện 'Если' (Nếu)."
          },
          {
            "q": "Иван позвонил врачу и записался к ___ на приём.",
            "a": 2,
            "options": [
              "он",
              "его",
              "нему",
              "ним"
            ],
            "ex": "Giới từ 'к' đòi hỏi đại từ nhân xưng ở Cách 3, sau giới từ đại từ ngôi thứ ba thêm chữ 'н-' ('к нему')."
          },
          {
            "q": "Мой брат очень интересуется русской ___.",
            "a": 3,
            "options": [
              "история",
              "историю",
              "истории",
              "историей"
            ],
            "ex": "Động từ 'интересоваться' (say mê, quan tâm) đòi hỏi danh từ ở Cách 5 (интересоваться историей)."
          },
          {
            "q": "Родители очень гордятся своим старшим ___.",
            "a": 2,
            "options": [
              "сын",
              "сына",
              "сыном",
              "сыну"
            ],
            "ex": "Động từ 'гордиться' (tự hào về ai) đòi hỏi danh từ ở Cách 5 (гордиться сыном)."
          },
          {
            "q": "После окончания лекции студенты вышли из ___.",
            "a": 1,
            "options": [
              "аудитория",
              "аудитории",
              "аудиторию",
              "аудиторией"
            ],
            "ex": "Giới từ 'из' (rời khỏi đâu) đòi hỏi danh từ ở Cách 2 số ít (аудитория -> аудитории)."
          },
          {
            "q": "Мария купила в магазине две красивых ___.",
            "a": 0,
            "options": [
              "чашки",
              "чашек",
              "чашкам",
              "чашками"
            ],
            "ex": "Sau số từ 'две' (giống cái), danh từ giống cái đứng ở dạng Cách 2 số ít là 'чашки'."
          },
          {
            "q": "В этом старинном музее находится около пятидесяти ___.",
            "a": 2,
            "options": [
              "картина",
              "картины",
              "картин",
              "картинам"
            ],
            "ex": "Sau số từ 50 và giới từ 'около', danh từ giống cái đứng ở Cách 2 số nhiều (картин)."
          },
          {
            "q": "Он опоздал на поезд, ___ попал в большую автомобильную пробку.",
            "a": 1,
            "options": [
              "чтобы",
              "так как",
              "поэтому",
              "хотя"
            ],
            "ex": "Liên từ nguyên nhân văn phong chuẩn mực tương đương 'потому что' là 'так как' (do bởi vì)."
          }
        ]
      },
      {
        "id": "reading",
        "name": "Часть 2. Чтение",
        "vi": "Phần 2. Đọc hiểu văn bản văn hóa (8 câu)",
        "durationMin": 15,
        "text": {
          "ru": "Золотое кольцо России — это знаменитый туристический маршрут, который проходит по древним городам Северо-Восточной Руси. В этих городах сохранились уникальные памятники истории и культуры XII–XVII веков: белокаменные соборы, монастыри-крепости и шедевры древнерусского зодчества.\n\nАвтор идеи этого маршрута — советский писатель и журналист Юрий Бычков. В 1967 году он совершил поездку по городам на своём автомобиле и опубликовал серию очерков под общим названием «Золотое кольцо». В классический маршрут традиционно входят восемь основных городов: Сергиев Посад, Переславль-Залесский, Ростов Великий, Ярославль, Кострома, Иваново, Суздаль и Владимир.\n\nКаждый из этих городов обладает своим неповторимым характером. Например, в Сергиевом Посаде находится Троице-Сергиева лавра — крупнейший духовный центр Русской православной церкви. Город Суздаль называют городом-музеем под открытым небом: здесь нет высоких современных домов и промышленных заводов, зато на небольшой территории построено более тридцати церквей и монастырей. А Ярославль славится своей великолепной набережной реки Волги и старейшим в России драматическим театром имени Фёдора Волкова.\n\nСегодня путешествие по Золотому кольцу привлекает тысячи путешественников со всего мира. Туристы могут не только полюбоваться архитектурой, но и познакомиться с традиционными русскими ремёслами: росписью по дереву, изготовлением керамики и ростовской финифтью.",
          "vi": "Vành đai Vàng nước Nga là tuyến đường du lịch nổi tiếng đi qua các thành phố cổ kính ở miền Đông Bắc nước Nga cổ đại. Tại các thành phố này vẫn còn lưu giữ những di tích lịch sử và văn hóa độc nhất vô nhị từ thế kỷ 12 đến thế kỷ 17: các thánh đường bằng đá trắng, những tu viện kiên cố như pháo đài và kiệt tác kiến trúc Nga cổ.\n\nTác giả của ý tưởng tuyến du lịch này là nhà văn, nhà báo Liên Xô Yury Bychkov. Năm 1967, ông đã thực hiện chuyến đi qua các thành phố bằng xe hơi riêng và xuất bản loạt bài ký sự dưới nhan đề chung 'Vành đai Vàng'. Tuyến đường kinh điển này theo truyền thống gồm 8 thành phố chính: Sergiyev Posad, Pereslavl-Zalessky, Rostov Veliky, Yaroslavl, Kostroma, Ivanovo, Suzdal và Vladimir.\n\nMỗi thành phố đều mang một nét cá tính riêng biệt không thể trộn lẫn. Ví dụ, tại Sergiyev Posad có Tu viện Troitse-Sergieva Lavra — trung tâm tâm linh lớn nhất của Chính thống giáo Nga. Thành phố Suzdal được mệnh danh là bảo tàng ngoài trời: ở đây không có nhà cao tầng hiện đại hay nhà máy công nghiệp, nhưng trên một diện tích nhỏ có hơn ba mươi nhà thờ và tu viện. Còn Yaroslavl nổi tiếng với bờ kè tuyệt đẹp bên bờ sông Volga và nhà hát kịch lâu đời nhất nước Nga mang tên Fyodor Volkov.\n\nNgày nay, chuyến du hành dọc Vành đai Vàng thu hút hàng ngàn du khách từ khắp nơi trên thế giới. Du khách không chỉ được chiêm ngưỡng kiến trúc mà còn được tìm hiểu các nghề thủ công truyền thống của Nga: vẽ tranh trên gỗ, làm đồ gốm và nghệ thuật tráng men Rostov Finift."
        },
        "questions": [
          {
            "q": "К какому историческому периоду относятся памятники Золотого кольца?",
            "a": 1,
            "options": [
              "X–XI веков",
              "XII–XVII веков",
              "XVIII–XIX веков",
              "XX века"
            ],
            "ex": "Dẫn chứng trong đoạn 1: '...сохранились уникальные памятники истории и культуры XII–XVII веков...'"
          },
          {
            "q": "Кто придумал название и маршрут «Золотое кольцо»?",
            "a": 2,
            "options": [
              "Фёдор Волков",
              "М.В. Ломоносов",
              "Юрий Бычков",
              "Сергий Радонежский"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'Автор идеи этого маршрута — советский писатель и журналист Юрий Бычков.'"
          },
          {
            "q": "В каком году писатель опубликовал серию очерков о городах?",
            "a": 0,
            "options": [
              "В 1967 году",
              "В 1975 году",
              "В 1980 году",
              "В 1991 году"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'В 1967 году он совершил поездку по городам... и опубликовал серию очерков...'"
          },
          {
            "q": "Сколько основных городов входит в классический маршрут?",
            "a": 1,
            "options": [
              "Пять городов",
              "Восемь городов",
              "Десять городов",
              "Двенадцать городов"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'В классический маршрут традиционно входят восемь основных городов...'"
          },
          {
            "q": "Какой духовный центр находится в городе Сергиев Посад?",
            "a": 2,
            "options": [
              "Кремль",
              "Драматический театр",
              "Троице-Сергиева лавра",
              "Музей керамики"
            ],
            "ex": "Dẫn chứng trong đoạn 3: '...в Сергиевом Посаде находится Троице-Сергиева лавра — крупнейший духовный центр...'"
          },
          {
            "q": "Почему город Суздаль называют «музеем под открытым небом»?",
            "a": 0,
            "options": [
              "Там нет высотных домов и заводов, но много старинных церквей",
              "Там находится самый большой музей картин в мире",
              "Там живут только художники и скульпторы",
              "Город открыт для посещения только летом"
            ],
            "ex": "Dẫn chứng trong đoạn 3: '...здесь нет высоких современных домов и промышленных заводов, зато на небольшой территории построено более тридцати церквей...'"
          },
          {
            "q": "Чем славится старинный город Ярославль?",
            "a": 1,
            "options": [
              "Самым большим аэропортом в России",
              "Набережной Волги и старейшим драматическим театром",
              "Производством современных автомобилей",
              "Крупнейшими фабриками тканей"
            ],
            "ex": "Dẫn chứng trong đoạn 3: 'А Ярославль славится своей великолепной набережной реки Волги и старейшим в России драматическим театром...'"
          },
          {
            "q": "С какими ремёслами могут познакомиться туристы на маршруте?",
            "a": 2,
            "options": [
              "С добычей нефти и газа",
              "С ремонтом автомобилей",
              "С росписью по дереву, керамикой и финифтью",
              "С компьютерным программированием"
            ],
            "ex": "Dẫn chứng trong đoạn 4: '...с традиционными русскими ремёслами: росписью по дереву, изготовлением керамики и ростовской финифтью.'"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Часть 3. Аудирование",
        "vi": "Phần 3. Nghe hiểu tình huống du lịch (6 câu)",
        "durationMin": 10,
        "lines": [
          {
            "ru": "— Добрый день! Гостиница «Северная Пальмира», администратор Анна. Чем я могу вам помочь?"
          },
          {
            "ru": "— Здравствуйте! Я хотел бы забронировать стандартный одноместный номер на три ночи, с пятнадцатого по восемнадцатое ноября."
          },
          {
            "ru": "— Минуточку, я проверю наличие свободных мест... Да, у нас есть свободный номер на четвёртом этаже с видом на реку Мойку."
          },
          {
            "ru": "— Прекрасно! Скажите, пожалуйста, включён ли завтрак в стоимость проживания?"
          },
          {
            "ru": "— Да, завтрак «шведский стол» включён в стоимость. Он проходит в ресторане на первом этаже с семи до десяти тридцати утра."
          },
          {
            "ru": "— Отлично. А как мне добраться из аэропорта Пулково до вашей гостиницы?"
          },
          {
            "ru": "— Самый удобный способ: сесть на автобус номер тридцать девять до станции метро «Московская», а затем проехать по синей линии прямо до станции «Невский проспект»."
          },
          {
            "ru": "— Большое спасибо за подробную информацию! Оформите, пожалуйста, бронирование на имя Нгуен Ван Мин."
          }
        ],
        "questions": [
          {
            "q": "На сколько ночей гость хочет забронировать номер?",
            "a": 1,
            "options": [
              "На две ночи",
              "На три ночи",
              "На четыре ночи",
              "На неделю"
            ],
            "ex": "Dẫn chứng lời thoại câu 2: '...забронировать стандартный одноместный номер на три ночи...'"
          },
          {
            "q": "На каком этаже находится свободный номер?",
            "a": 2,
            "options": [
              "На первом этаже",
              "На втором этаже",
              "На четвёртом этаже",
              "На седьмом этаже"
            ],
            "ex": "Dẫn chứng lời thoại câu 3: '...у нас есть свободный номер на четвёртом этаже...'"
          },
          {
            "q": "Куда выходят окна предлагаемого номера?",
            "a": 0,
            "options": [
              "На реку Мойку",
              "Во внутренний двор",
              "На центральную площадь",
              "На парк"
            ],
            "ex": "Dẫn chứng lời thoại câu 3: '...с видом на реку Мойку.'"
          },
          {
            "q": "Входит ли завтрак в стоимость номера?",
            "a": 1,
            "options": [
              "Нет, нужно доплачивать",
              "Да, завтрак «шведский стол» включён",
              "Только кофе и чай",
              "Завтрак подаётся за отдельную плату в номер"
            ],
            "ex": "Dẫn chứng lời thoại câu 5: 'Да, завтрак «шведский стол» включён в стоимость.'"
          },
          {
            "q": "На каком автобусе нужно доехать от аэропорта Пулково до метро?",
            "a": 2,
            "options": [
              "Автобус № 12",
              "Автобус № 24",
              "Автобус № 39",
              "Автобус № 50"
            ],
            "ex": "Dẫn chứng lời thoại câu 7: '...сесть на автобус номер тридцать девять...'"
          },
          {
            "q": "До какой станции метро нужно доехать на синей линии?",
            "a": 1,
            "options": [
              "«Гостиный двор»",
              "«Невский проспект»",
              "«Маяковская»",
              "«Сенная площадь»"
            ],
            "ex": "Dẫn chứng lời thoại câu 7: '...прямо до станции «Невский проспект».'"
          }
        ]
      }
    ,
{
      "id": "writing",
      "name": "Часть 4. Письмо",
      "vi": "Phần 4. Kỹ năng Viết (Miêu tả & Thư từ)",
      "durationMin": 25,
      "writing_tasks": [
            {
                  "task_num": 1,
                  "title": "Kể về một ngày nghỉ cuối tuần hoặc một chuyến đi",
                  "prompt": "Напишите короткое сочинение о том, как вы провели прошлые выходные или расскажите о поездке в другой город. (Объём: 50–70 слов).",
                  "vi": "Viết bài văn ngắn kể về kỳ nghỉ cuối tuần vừa qua hoặc một chuyến đi đến thành phố khác. (Dung lượng: 50-70 từ).",
                  "minWords": 50,
                  "suggested": [
                        "В прошлые выходные я...",
                        "Мы решили поехать в...",
                        "Погода была замечательная",
                        "Мне очень понравилось, потому что..."
                  ]
            }
      ]
},
{
      "id": "speaking",
      "name": "Часть 5. Говорение",
      "vi": "Phần 5. Kỹ năng Nói (Vấn đáp hội thoại thực tế)",
      "durationMin": 15,
      "speaking_tasks": [
            {
                  "task_num": 1,
                  "title": "Tình huống 1: Mua vé tàu hỏa / tàu điện ngầm",
                  "prompt": "Вы находитесь на вокзале. Купите билет на поезд до Санкт-Петербурга на завтрашнее утро.",
                  "vi": "Bạn đang ở nhà ga. Hãy mua vé tàu đi Sankt-Peterburg vào sáng ngày mai.",
                  "suggested": "Здравствуйте! Дайте, пожалуйста, один билет на поезд до Санкт-Петербурга на завтра на утро. Сколько стоит билет?"
            },
            {
                  "task_num": 2,
                  "title": "Tình huống 2: Đổi hàng hoặc mua sắm",
                  "prompt": "В магазине вы хотите купить сувенир или тёплую куртку. Спросите продавца о размере и цене.",
                  "vi": "Ở cửa hàng, bạn muốn mua quà lưu niệm hoặc áo khoác ấm. Hãy hỏi người bán hàng về kích cỡ và giá tiền.",
                  "suggested": "Покажите, пожалуйста, эту куртку. У вас есть сорок восьмой размер? Можно примерить?"
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
    "categoryName": "Đề thi chuẩn quốc tế đầu vào Đại học Nga",
    "title": "Đề thi chuẩn quốc tế ТРКИ-1 (Đầu vào Đại học Liên bang Nga)",
    "durationMin": 60,
    "passPercent": 66,
    "is_pro_only": false,
    "icon": "award-badge",
    "parts": [
      {
        "id": "gram",
        "name": "Часть 1. Лексика и грамматика",
        "vi": "Phần 1. Từ vựng & Ngữ pháp (20 câu)",
        "durationMin": 30,
        "questions": [
          {
            "q": "Поезд из Санкт-Петербурга ___ на главный вокзал ровно в восемь утра.",
            "a": 1,
            "options": [
              "уехал",
              "прибыл",
              "отошёл",
              "переехал"
            ],
            "ex": "Động từ 'прибыть' (hoàn thành) có tiền tố при- chỉ sự đến nơi/cập bến chuẩn ngữ cảnh giờ tàu hỏa đến."
          },
          {
            "q": "Студент быстро ___ улицу на зелёный сигнал светофора.",
            "a": 2,
            "options": [
              "обошёл",
              "прошёл",
              "перешёл",
              "дошёл"
            ],
            "ex": "Hành động băng qua, qua đường từ bên này sang bên kia dùng tiền tố пере- ('перешёл улицу')."
          },
          {
            "q": "Профессор попросил аспиранта ___ на минуту в его рабочий кабинет.",
            "a": 0,
            "options": [
              "зайти",
              "уйти",
              "отойти",
              "сойти"
            ],
            "ex": "Tiền tố за- chỉ hành động ghé vào, tạt vào chốc lát trên đường đi ('зайти на минуту')."
          },
          {
            "q": "Мы внимательно слушали докладчика, ___ о новых открытиях в медицине.",
            "a": 1,
            "options": [
              "рассказавший",
              "рассказывающего",
              "рассказывающим",
              "рассказывающий"
            ],
            "ex": "Phân từ chủ động hiện tại bổ nghĩa cho danh từ Cách 4 sinh vật 'докладчика' -> đuôi -его ('рассказывающего')."
          },
          {
            "q": "Книга, ___ этим известным академиком, переведена на пять языков.",
            "a": 2,
            "options": [
              "написавшая",
              "написанную",
              "написанная",
              "написанной"
            ],
            "ex": "Phân từ bị động quá khứ bổ nghĩa cho chủ ngữ giống cái Cách 1 'книга' -> đuôi -ая ('написанная')."
          },
          {
            "q": "___ экзаменационную работу, студент аккуратно положил её на стол.",
            "a": 0,
            "options": [
              "Закончив",
              "Заканчивая",
              "Закончит",
              "Законченный"
            ],
            "ex": "Phó động từ quá khứ chỉ hành động đã hoàn tất trước ('sau khi làm xong bài'): 'Закончив'."
          },
          {
            "q": "___ по аллее парка, друзья оживлённо обсуждали научную конференцию.",
            "a": 1,
            "options": [
              "Гуляв",
              "Гуляя",
              "Погуляв",
              "Гуляющие"
            ],
            "ex": "Phó động từ chưa hoàn thành chỉ hành động diễn ra đồng thời ('vừa dạo bước vừa thảo luận'): 'Гуляя'."
          },
          {
            "q": "Успех научных исследований во многом зависит ___ слаженной работы команды.",
            "a": 2,
            "options": [
              "к",
              "в",
              "от",
              "за"
            ],
            "ex": "Cấu trúc quản cách: động từ 'зависеть' luôn đi với giới từ 'от' + Cách 2 (phụ thuộc vào cái gì)."
          },
          {
            "q": "Молодой специалист постоянно стремится ___ профессиональному росту.",
            "a": 0,
            "options": [
              "к",
              "в",
              "на",
              "для"
            ],
            "ex": "Cấu trúc quản cách: động từ 'стремиться' luôn đi với giới từ 'к' + Cách 3 (hướng tới, phấn đấu tới điều gì)."
          },
          {
            "q": "___ сильный снегопад, самолёт вылетел строго по расписанию.",
            "a": 1,
            "options": [
              "Благодаря тому что",
              "Несмотря на",
              "В связи с",
              "По причине"
            ],
            "ex": "Chỉ sự nhượng bộ đối lập (mặc cho tuyết rơi dày) dùng cụm 'Несмотря на' + Cách 4."
          },
          {
            "q": "Эксперимент завершился успешно ___ точным расчётам физиков.",
            "a": 0,
            "options": [
              "благодаря",
              "из-за",
              "несмотря на",
              "вследствие"
            ],
            "ex": "Nguyên nhân mang lại kết quả tích cực, có lợi đi với Cách 3 dùng giới từ 'благодаря' (nhờ có)."
          },
          {
            "q": "Проект не удалось завершить вовремя ___ неожиданной поломки оборудования.",
            "a": 1,
            "options": [
              "благодаря",
              "из-за",
              "ради",
              "для"
            ],
            "ex": "Nguyên nhân tiêu cực, gây cản trở hoặc thất bại đi với Cách 2 dùng giới từ 'из-за' (do bởi, vì sự cố)."
          },
          {
            "q": "Учёный посвятил всю свою жизнь ___ новых источников чистой энергии.",
            "a": 2,
            "options": [
              "поиск",
              "поиска",
              "поиску",
              "поиском"
            ],
            "ex": "Quản cách: động từ 'посвятить что?' (всю жизнь) 'чему?' -> đi với Cách 3 (поиску)."
          },
          {
            "q": "Я не сомневаюсь в том, ___ наша команда одержит победу.",
            "a": 0,
            "options": [
              "что",
              "чтобы",
              "будто",
              "как"
            ],
            "ex": "Sau 'сомневаться в том...' mệnh đề chỉ sự thật khách quan đi với liên từ 'что'."
          },
          {
            "q": "Преподаватель потребовал, ___ студенты выключили мобильные телефоны.",
            "a": 1,
            "options": [
              "что",
              "чтобы",
              "если",
              "когда"
            ],
            "ex": "Mệnh đề chỉ yêu cầu/mệnh lệnh sau 'потребовать' bắt buộc dùng liên từ 'чтобы' + động từ quá khứ."
          },
          {
            "q": "Едва солнце ___ из-за горизонта, экспедиция отправилась в путь.",
            "a": 2,
            "options": [
              "показалось",
              "показывалось",
              "покажется",
              "показывая"
            ],
            "ex": "Liên từ thời gian 'Едва... (как)' chỉ ngay khi hành động chớm hoàn tất trong quá khứ -> dùng thể hoàn thành 'показалось'."
          },
          {
            "q": "Мы обратили внимание ___ высокий уровень подготовки участников олимпиады.",
            "a": 3,
            "options": [
              "в",
              "о",
              "к",
              "на"
            ],
            "ex": "Quản cách: thành ngữ 'обратить внимание' luôn đi với giới từ 'на' + Cách 4 (chú ý đến cái gì)."
          },
          {
            "q": "В этом году конференция собрала более ___ ведущих специалистов со всего мира.",
            "a": 1,
            "options": [
              "трёхсот",
              "триста",
              "трёмстам",
              "тремястами"
            ],
            "ex": "Sau từ chỉ so sánh 'более' (hơn), số từ ghép 300 đứng ở dạng Cách 2 là 'трёхсот'."
          },
          {
            "q": "Он поступил на работу в международную компанию в ___ году.",
            "a": 2,
            "options": [
              "две тысячи двадцать второй",
              "две тысячи двадцать второго",
              "две тысячи двадцать втором",
              "две тысячи двадцать третьим"
            ],
            "ex": "Chỉ năm xảy ra sự kiện đi với giới từ 'в' + Cách 6 (ở số thứ tự chỉ biến đổi từ cuối cùng: в две тысячи двадцать втором году)."
          },
          {
            "q": "Чем больше вы практикуетесь в разговорной речи, ___ увереннее говорите.",
            "a": 0,
            "options": [
              "тем",
              "то",
              "так",
              "как"
            ],
            "ex": "Cặp liên từ tương quan tỷ lệ thuận: 'Чем... тем...' (Càng... thì càng...)."
          }
        ]
      },
      {
        "id": "reading",
        "name": "Часть 2. Чтение",
        "vi": "Phần 2. Đọc hiểu báo chí & khoa học (8 câu)",
        "durationMin": 20,
        "text": {
          "ru": "Высшее образование и развитие цифровых технологий в России\n\nВ последние годы российская система высшего образования переживает масштабную трансформацию, вызванную стремительным развитием искусственного интеллекта и цифровых технологий. Ведущие университеты страны, такие как Московский государственный университет (МГУ), МФТИ, НИУ ВШЭ и МГТУ имени Н.Э. Баумана, активно внедряют междисциплинарные образовательные программы, объединяющие фундаментальную математику, компьютерные науки и прикладные инженерные решения.\n\nГлавная цель этих реформ — подготовить специалистов нового поколения, способных не просто использовать готовые программные продукты, но и создавать инновационные отечественные алгоритмы, квантовые вычисления и системы нейросетей. По статистике Министерства науки и высшего образования РФ, за последние три года конкурс на направления «Информатика и вычислительная техника» и «Прикладная математика» вырос почти на 45%. При этом университеты сотрудничают с крупнейшими технологическими гигантами, создавая совместные лаборатории и исследовательские центры.\n\nОсобое внимание уделяется привлечению иностранных студентов. Сегодня в российских вузах обучается более 350 тысяч граждан из стран Азии, Африки, Латинской Америки и СНГ. Для адаптации зарубежных учащихся создана разветвлённая сеть подготовительных факультетов, где интенсивное изучение русского языка как иностранного сочетается с профильной подготовкой по естественным и точным наукам. По мнению экспертов, владение русским языком открывает международным специалистам доступ к богатейшим архивам фундаментальной науки и возможностям построения успешной карьеры в крупнейших международных проектах.",
          "vi": "Giáo dục đại học và sự phát triển công nghệ số tại Nga\n\nNhững năm gần đây, hệ thống giáo dục đại học Nga đang trải qua một cuộc chuyển đổi sâu rộng do sự phát triển vượt bậc của trí tuệ nhân tạo và công nghệ số. Các trường đại học hàng đầu như Đại học Tổng hợp Moskva (MGU), MIPT, HSE và Đại học Kỹ thuật Bauman đang tích cực triển khai các chương trình đào tạo liên ngành kết hợp toán học cơ bản, khoa học máy tính và các giải pháp kỹ thuật ứng dụng.\n\nMục tiêu chính của những cải cách này là đào tạo ra thế hệ chuyên gia mới có năng lực không chỉ ứng dụng các sản phẩm phần mềm có sẵn mà còn trực tiếp sáng tạo các thuật toán nội địa tiên tiến, tính toán lượng tử và hệ thống mạng nơ-ron. Theo thống kê của Bộ Giáo dục & Khoa học Liên bang Nga, trong ba năm qua, tỷ lệ cạnh tranh đầu vào các ngành 'Công nghệ thông tin' và 'Toán ứng dụng' đã tăng gần 45%. Đồng thời, các trường đại học hợp tác chặt chẽ với những tập đoàn công nghệ lớn để thành lập các phòng thí nghiệm và trung tâm nghiên cứu liên kết.\n\nCông tác thu hút sinh viên quốc tế cũng được đặc biệt chú trọng. Hiện nay có hơn 350 nghìn lưu học sinh từ châu Á, châu Phi, Mỹ Latinh và SNG đang theo học tại các trường đại học Nga. Nhằm hỗ trợ sinh viên quốc tế hòa nhập, một hệ thống các khoa dự bị đã được xây dựng, nơi việc học tiếng Nga chuyên sâu được kết hợp song hành với kiến thức chuyên ngành khoa học tự nhiên và chính xác. Theo các chuyên gia, việc thông thạo tiếng Nga mang lại cho các chuyên gia quốc tế cơ hội tiếp cận kho tàng khoa học cơ bản phong phú và xây dựng sự nghiệp thành công trong các dự án quốc tế quy mô lớn."
        },
        "questions": [
          {
            "q": "Чем вызвана масштабная трансформация высшего образования в России?",
            "a": 1,
            "options": [
              "Уменьшением количества студентов",
              "Стремительным развитием искусственного интеллекта и цифровых технологий",
              "Экономическим кризисом",
              "Закрытием старых институтов"
            ],
            "ex": "Dẫn chứng trong đoạn 1: '...вызванную стремительным развитием искусственного интеллекта и цифровых технологий.'"
          },
          {
            "q": "Какие дисциплины объединяют современные университетские программы?",
            "a": 0,
            "options": [
              "Фундаментальную математику, компьютерные науки и инженерные решения",
              "Историю, литературу и музыку",
              "Иностранные языки и менеджмент",
              "Географию и биологию"
            ],
            "ex": "Dẫn chứng trong đoạn 1: '...объединяющие фундаментальную математику, компьютерные науки и прикладные инженерные решения.'"
          },
          {
            "q": "В чём заключается главная цель образовательных реформ?",
            "a": 2,
            "options": [
              "Увеличить плату за обучение",
              "Сократить время обучения в университетах",
              "Подготовить специалистов, способных создавать инновационные отечественные алгоритмы",
              "Перевести всё обучение исключительно в онлайн-формат"
            ],
            "ex": "Dẫn chứng trong đoạn 2: 'Главная цель этих реформ — подготовить специалистов нового поколения, способных... создавать инновационные отечественные алгоритмы...'"
          },
          {
            "q": "На сколько процентов вырос конкурс на IT-направления за последние три года?",
            "a": 1,
            "options": [
              "На 20%",
              "Почти на 45%",
              "На 60%",
              "На 80%"
            ],
            "ex": "Dẫn chứng trong đoạn 2: '...конкурс на направления... вырос почти на 45%.'"
          },
          {
            "q": "Как университеты сотрудничают с технологическими гигантами?",
            "a": 3,
            "options": [
              "Продают им университетские здания",
              "Покупают только их рекламу",
              "Отправляют всех студентов за рубеж",
              "Создают совместные лаборатории и исследовательские центры"
            ],
            "ex": "Dẫn chứng trong đoạn 2: '...создавая совместные лаборатории и исследовательские центры.'"
          },
          {
            "q": "Сколько иностранных студентов обучается сегодня в российских вузах?",
            "a": 0,
            "options": [
              "Более 350 тысяч",
              "Около 100 тысяч",
              "Около 200 тысяч",
              "Более 1 миллиона"
            ],
            "ex": "Dẫn chứng trong đoạn 3: 'Сегодня в российских вузах обучается более 350 тысяч граждан...'"
          },
          {
            "q": "Какую роль играют подготовительные факультеты для иностранцев?",
            "a": 2,
            "options": [
              "Они заменяют полное высшее образование",
              "Они организуют только туристические экскурсии",
              "Сочетают изучение русского языка с профильной научной подготовкой",
              "Занимаются исключительно выдачей виз"
            ],
            "ex": "Dẫn chứng trong đoạn 3: '...где интенсивное изучение русского языка как иностранного сочетается с профильной подготовкой по естественным и точным наукам.'"
          },
          {
            "q": "Какое преимущество даёт владение русским языком международным специалистам?",
            "a": 1,
            "options": [
              "Возможность не сдавать выпускные экзамены",
              "Доступ к богатым архивам фундаментальной науки и карьеру в глобальных проектах",
              "Автоматическое получение второго гражданства",
              "Бесплатный проезд на всех видах транспорта"
            ],
            "ex": "Dẫn chứng trong đoạn 3: '...владение русским языком открывает международным специалистам доступ к богатейшим архивам фундаментальной науки и возможностям построения успешной карьеры...'"
          }
        ]
      },
      {
        "id": "listening",
        "name": "Часть 3. Аудирование",
        "vi": "Phần 3. Nghe hiểu phỏng vấn khoa học (6 câu)",
        "durationMin": 10,
        "lines": [
          {
            "ru": "— Здравствуйте, уважаемые радиослушатели! В эфире программа «Горизонты науки». Сегодня у нас в студии океанолог и руководитель арктической экспедиции Михаил Соколов."
          },
          {
            "ru": "— Добрый день! Рад приветствовать всех слушателей."
          },
          {
            "ru": "— Михаил, расскажите, пожалуйста, сколько времени длилась ваша недавняя экспедиция в Северный Ледовитый океан?"
          },
          {
            "ru": "— Наше исследовательское судно «Академик Фёдоров» провело в полярных широтах ровно шестьдесят пять суток. Мы прошли более восьми тысяч морских миль."
          },
          {
            "ru": "— Какие главные научные задачи стояли перед вашей международной научной командой?"
          },
          {
            "ru": "— Нашей ключевой задачей был мониторинг таяния многолетних льдов и комплексный анализ климатических изменений. Мы брали глубоководные пробы воды на глубине до четырёх тысяч метров."
          },
          {
            "ru": "— Какие предварительные выводы удалось сделать исследователям?"
          },
          {
            "ru": "— Данные спутников подтвердились: средняя толщина ледяного покрова уменьшается, однако морская экосистема демонстрирует поразительную способность к адаптации."
          },
          {
            "ru": "— Михаил, огромное спасибо за интересную и важную беседу! Желаем новых успехов вашей научной группе."
          },
          {
            "ru": "— Благодарю вас! До новых встреч!"
          }
        ],
        "questions": [
          {
            "q": "Какую научную специальность имеет гость программы Михаил Соколов?",
            "a": 1,
            "options": [
              "Астроном",
              "Океанолог",
              "Геолог",
              "Метеоролог"
            ],
            "ex": "Dẫn chứng lời thoại câu 1: '...у нас в студии океанолог и руководитель арктической экспедиции Михаил Соколов.'"
          },
          {
            "q": "Как называлось научно-исследовательское судно экспедиции?",
            "a": 0,
            "options": [
              "«Академик Фёдоров»",
              "«Михаил Ломоносов»",
              "«Арктика»",
              "«Юрий Гагарин»"
            ],
            "ex": "Dẫn chứng lời thoại câu 4: 'Наше исследовательское судно «Академик Фёдоров» провело в полярных широтах...'"
          },
          {
            "q": "Сколько суток продолжалась полярная экспедиция?",
            "a": 2,
            "options": [
              "Сорок пять суток",
              "Пятьдесят суток",
              "Шестьдесят пять суток",
              "Девяносто суток"
            ],
            "ex": "Dẫn chứng lời thoại câu 4: '...ровно шестьдесят пять суток.'"
          },
          {
            "q": "В чём заключалась ключевая задача научной команды?",
            "a": 1,
            "options": [
              "Поиск затонувших старинных кораблей",
              "Мониторинг таяния многолетних льдов и анализ климатических изменений",
              "Строительство новой полярной станции",
              "Бурение нефтяных скважин на шельфе"
            ],
            "ex": "Dẫn chứng lời thoại câu 6: 'Нашей ключевой задачей был мониторинг таяния многолетних льдов и комплексный анализ климатических изменений.'"
          },
          {
            "q": "На какой максимальной глубине учёные брали глубоководные пробы воды?",
            "a": 2,
            "options": [
              "До 1000 метров",
              "До 2500 метров",
              "До 4000 метров",
              "До 6000 метров"
            ],
            "ex": "Dẫn chứng lời thoại câu 6: 'Мы брали глубоководные пробы воды на глубине до четырёх тысяч метров.'"
          },
          {
            "q": "К какому выводу пришли исследователи относительно морской экосистемы?",
            "a": 0,
            "options": [
              "Она демонстрирует поразительную способность к адаптации",
              "Она полностью разрушена и не восстановится",
              "В полярных водах полностью исчезла рыба",
              "Изменения климата никак не влияют на океан"
            ],
            "ex": "Dẫn chứng lời thoại câu 8: '...однако морская экосистема демонстрирует поразительную способность к адаптации.'"
          }
        ]
      }
    ,
{
      "id": "writing",
      "name": "Часть 4. Письмо",
      "vi": "Phần 4. Kỹ năng Viết (Thư chính thức & Nghị luận)",
      "durationMin": 35,
      "writing_tasks": [
            {
                  "task_num": 1,
                  "title": "Viết thư bày tỏ nguyện vọng du học hoặc bài luận ngắn",
                  "prompt": "Напишите мотивационное письмо или эссе на тему: «Почему я хочу учиться в российском университете». Выразите своё мнение и аргументируйте выбор специальности. (Объём: 90–120 слов).",
                  "vi": "Viết thư động lực hoặc bài luận về chủ đề: «Vì sao tôi muốn học tập tại trường đại học ở Nga». Bày tỏ quan điểm và lập luận cho sự lựa chọn chuyên ngành. (Dung lượng: 90-120 từ).",
                  "minWords": 90,
                  "suggested": [
                        "Я выбрал обучение в России, потому что...",
                        "Во-первых...",
                        "Во-вторых...",
                        "По моему мнению...",
                        "В заключение хочу подчеркнуть..."
                  ]
            }
      ]
},
{
      "id": "speaking",
      "name": "Часть 5. Говорение",
      "vi": "Phần 5. Kỹ năng Nói (Thuyết trình & Đối thoại học thuật)",
      "durationMin": 20,
      "speaking_tasks": [
            {
                  "task_num": 1,
                  "title": "Chủ đề 1: Thuyết trình ngắn về ngành học dự định",
                  "prompt": "Расскажите экзаменатору о вашей будущей профессии: почему вы выбрали именно эту специальность и как планируете применить знания в будущем.",
                  "vi": "Trình bày với giám khảo về nghề nghiệp tương lai: vì sao bạn chọn ngành này và dự định áp dụng kiến thức ra sao.",
                  "suggested": "Я хочу рассказать о своей будущей специальности. В современном мире эта профессия играет важную роль..."
            },
            {
                  "task_num": 2,
                  "title": "Chủ đề 2: Thảo luận về văn hóa và cuộc sống sinh viên",
                  "prompt": "Обсудите с экзаменатором особенности адаптации иностранных студентов в России: какие трудности возникают и как их преодолеть.",
                  "vi": "Thảo luận về sự thích nghi của du học sinh tại Nga: những khó khăn gặp phải và cách vượt qua.",
                  "suggested": "Когда иностранные студенты приезжают в Россию, они сталкиваются с климатом и языковым барьером, однако..."
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
    ,
{
      "id": "writing",
      "name": "Часть 4. Письмо",
      "vi": "Phần 4. Kỹ năng Viết (Bài luận phân tích & Báo cáo)",
      "durationMin": 40,
      "writing_tasks": [
            {
                  "task_num": 1,
                  "title": "Bài luận phân tích vấn đề xã hội hoặc khoa học",
                  "prompt": "Напишите аналитическое эссе на тему: «Влияние искусственного интеллекта на современное образование: плюсы и риски». Приведите аргументы за и против и сделайте взвешенный вывод. (Объём: 140–180 слов).",
                  "vi": "Viết bài luận phân tích về chủ đề: «Tác động của trí tuệ nhân tạo đối với giáo dục hiện đại: cơ hội và rủi ro». Đưa ra luận cứ ủng hộ/phản đối và kết luận. (Dung lượng: 140-180 từ).",
                  "minWords": 140,
                  "suggested": [
                        "В настоящее время актуальной проблемой является...",
                        "С одной стороны, безусловно...",
                        "С другой стороны, нельзя не учитывать...",
                        "Обобщая вышесказанное..."
                  ]
            }
      ]
},
{
      "id": "speaking",
      "name": "Часть 5. Говорение",
      "vi": "Phần 5. Kỹ năng Nói (Tranh luận & Bảo vệ luận điểm)",
      "durationMin": 25,
      "speaking_tasks": [
            {
                  "task_num": 1,
                  "title": "Chủ đề 1: Bảo vệ quan điểm trong tranh luận khoa học",
                  "prompt": "Экзаменатор высказывает точку зрения, с которой вы не согласны. Выразите вежливое несогласие, приведите контраргументы и обоснуйте свою позицию.",
                  "vi": "Giám khảo đưa ra quan điểm mà bạn không đồng tình. Hãy lịch sự phản biện, đưa ra luận cứ phản bác và chứng minh quan điểm của mình.",
                  "suggested": "Позвольте не вполне согласиться с вашей точкой зрения. Мои аргументы заключаются в следующем..."
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
    "desc": "Từ vựng các ngành nghề, chức vụ, nơi làm việc, các hành động nghiệp vụ và mẫu câu giao tiếp đời sống công sở tại Nga.",
    "icon": "briefcase",
    "color": "#0039A6",
    "sub_topics": [
      "Chủ đề nghề nghiệp"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "Студе́нт",
        "stress": "Студе́нт",
        "vi": "Sinh viên",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Студе́нтка",
        "ex": "Студе́нт у́чится в университе́те.",
        "ex_vi": "Sinh viên đang học ở trường đại học."
      },
      {
        "ru": "Преподава́тель",
        "stress": "Преподава́тель",
        "vi": "Giảng viên",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Преподава́тельница",
        "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
        "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."
      },
      {
        "ru": "Шко́льник",
        "stress": "Шко́льник",
        "vi": "Học sinh",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Шко́льница",
        "ex": "Шко́льница у́чится в шко́ле.",
        "ex_vi": "Người nữ sinh đang học ở trường học."
      },
      {
        "ru": "Учи́тель",
        "stress": "Учи́тель",
        "vi": "Giáo viên",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Учи́тельница",
        "ex": "Учи́тель преподаёт в шко́ле.",
        "ex_vi": "Giáo viên đang dạy học ở trường học."
      },
      {
        "ru": "Инжене́р",
        "stress": "Инжене́р",
        "vi": "Kỹ sư",
        "pos": "Noun",
        "gender": "m",
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."
      },
      {
        "ru": "Хи́мик",
        "stress": "Хи́мик",
        "vi": "Nhà hóa học",
        "pos": "Noun",
        "gender": "m",
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."
      },
      {
        "ru": "Био́лог",
        "stress": "Био́лог",
        "vi": "Nhà sinh vật học",
        "pos": "Noun",
        "gender": "m",
        "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
        "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."
      },
      {
        "ru": "Программи́ст",
        "stress": "Программи́ст",
        "vi": "Lập trình viên",
        "pos": "Noun",
        "gender": "m",
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."
      },
      {
        "ru": "Архите́ктор",
        "stress": "Архите́ктор",
        "vi": "Kiến trúc sư",
        "pos": "Noun",
        "gender": "m",
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."
      },
      {
        "ru": "Экономи́ст",
        "stress": "Экономи́ст",
        "vi": "Nhà kinh tế học/Chuyên viên kinh tế",
        "pos": "Noun",
        "gender": "m",
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."
      },
      {
        "ru": "Врач",
        "stress": "Врач",
        "vi": "Bác sĩ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Врач осма́тривает и ле́чит пациéнтов в больни́це.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."
      },
      {
        "ru": "Фе́рмер",
        "stress": "Фе́рмер",
        "vi": "Nông dân",
        "pos": "Noun",
        "gender": "m",
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."
      },
      {
        "ru": "Домохозя́йка",
        "stress": "Домохозя́йка",
        "vi": "Nội trợ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."
      },
      {
        "ru": "Дире́ктор",
        "stress": "Дире́ктор",
        "vi": "Giám đốc/ Hiệu trưởng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Дире́ктор руководи́т рабо́той в фи́рме.",
        "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty."
      },
      {
        "ru": "Юри́ст",
        "stress": "Юри́ст",
        "vi": "Luật sư",
        "pos": "Noun",
        "gender": "m",
        "ex": "Юри́ст консульти́рует клие́нта в фи́рме.",
        "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty."
      },
      {
        "ru": "Бизнесме́н",
        "stress": "Бизнесме́н",
        "vi": "Doanh nhân",
        "pos": "Noun",
        "gender": "m",
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."
      },
      {
        "ru": "Служа́щий",
        "stress": "Служа́щий",
        "vi": "Nhân viên/ Công chức",
        "pos": "Noun",
        "gender": "m",
        "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
        "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."
      },
      {
        "ru": "Продаве́ц",
        "stress": "Продаве́ц",
        "vi": "Người bán hàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."
      },
      {
        "ru": "Журнали́ст",
        "stress": "Журнали́ст",
        "vi": "Nhà báo",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Журнали́стка",
        "ex": "Журнали́ст пи́шет ста́тьи в редаќции.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn."
      },
      {
        "ru": "Поэ́т",
        "stress": "Поэ́т",
        "vi": "Nhà thơ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Поэ́т пи́шет стихи́ до́ма.",
        "ex_vi": "Nhà thơ đang viết thơ ở nhà."
      },
      {
        "ru": "Худо́жник",
        "stress": "Худо́жник",
        "vi": "Họa sĩ",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Худо́жница",
        "ex": "Худо́жница рису́ет карти́ны в мастерско́й.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."
      },
      {
        "ru": "Арти́ст",
        "stress": "Арти́ст",
        "vi": "Nghệ sĩ",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Арти́стка",
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."
      },
      {
        "ru": "Перево́дчик",
        "stress": "Перево́дчик",
        "vi": "Phiên dịch viên",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Перево́дчица",
        "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
        "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng."
      },
      {
        "ru": "Моделье́р",
        "stress": "Моделье́р",
        "vi": "Nhà thiết kế thời trang",
        "pos": "Noun",
        "gender": "m",
        "ex": "Моделье́р создаёт оде́жды в ателье́.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."
      },
      {
        "ru": "Музыка́нт",
        "stress": "Музыка́нт",
        "vi": "Nhạc công",
        "pos": "Noun",
        "gender": "m",
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ex_vi": "Nhạc công đang chơi piano trên buổi concert."
      },
      {
        "ru": "Спортсме́н",
        "stress": "Спортсме́н",
        "vi": "Vận động viên",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Спортсме́нка",
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."
      },
      {
        "ru": "учи́ться",
        "stress": "учи́ться",
        "vi": "học",
        "pos": "Verb",
        "ex": "Шко́льница у́чится в шко́ле.",
        "ex_vi": "Học sinh đang học ở trường học."
      },
      {
        "ru": "преподава́ть",
        "stress": "преподава́ть",
        "vi": "dạy học",
        "pos": "Verb",
        "aspect": "препода́ть",
        "collocation": "преподава́ть + что?(С4) + кому?(C3) (dạy cái gì? cho ai?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "ex": "Учи́тель преподаёт в шко́ле.",
        "ex_vi": "Giáo viên đang dạy học ở trường học."
      },
      {
        "ru": "ремонти́ровать маши́ну",
        "stress": "ремонти́ровать маши́ну",
        "vi": "sửa chữa máy móc",
        "pos": "Verb",
        "aspect": "отремонти́ровать маши́ну",
        "collocation": "ремонти́ровать + что?(С4) (sửa chữa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."
      },
      {
        "ru": "изуча́ть хи́мию",
        "stress": "изуча́ть хи́мию",
        "vi": "nghiên cứu hóa học",
        "pos": "Verb",
        "aspect": "изучи́ть хи́мию",
        "collocation": "изуча́ть + что?(С4) (nghiên cứu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."
      },
      {
        "ru": "изуча́ть расте́ния",
        "stress": "изуча́ть расте́ния",
        "vi": "nghiên cứu thực vật",
        "pos": "Verb",
        "aspect": "изучи́ть расте́ния",
        "collocation": "изуча́ть + что?(С4) (nghiên cứu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
        "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."
      },
      {
        "ru": "программи́ровать",
        "stress": "программи́ровать",
        "vi": "lập trình",
        "pos": "Verb",
        "aspect": "запрограмми́ровать",
        "collocation": "программи́ровать + что?(C4) (lập trình cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."
      },
      {
        "ru": "проекти́ровать зда́ния",
        "stress": "проекти́ровать зда́ния",
        "vi": "thiết kế tòa nhà",
        "pos": "Verb",
        "aspect": "спроекти́ровать зда́ния",
        "collocation": "проекти́ровать + что?(C4) (thiết kế cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."
      },
      {
        "ru": "собира́ть данны",
        "stress": "собира́ть данны",
        "vi": "thu thập dữ liệu",
        "pos": "Verb",
        "aspect": "собра́ть данны",
        "collocation": "собира́ть + что?(C4) (thu thập cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."
      },
      {
        "ru": "анализи́ровать данны",
        "stress": "анализи́ровать данны",
        "vi": "phân tích dữ liệu",
        "pos": "Verb",
        "aspect": "проанализи́ровать данны",
        "collocation": "анализи́ровать + что?(C4) (phân tích cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."
      },
      {
        "ru": "осма́тривать",
        "stress": "осма́тривать",
        "vi": "khám bệnh",
        "pos": "Verb",
        "aspect": "осмотре́ть",
        "collocation": "осма́тривать + кого?(C4) (khám cho ai?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Врач осма́тривает и ле́чит пациéнтов в больни́це.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."
      },
      {
        "ru": "лечи́ть",
        "stress": "лечи́ть",
        "vi": "chữa bệnh",
        "pos": "Verb",
        "aspect": "вы́лечить",
        "collocation": "лечи́ть + кого?(C4) (chữa trị cho ai?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Врач осма́тривает и ле́чит пациéнтов в больни́це.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."
      },
      {
        "ru": "выра́щивать о́вощи",
        "stress": "выра́щивать о́вощи",
        "vi": "trồng rau",
        "pos": "Verb",
        "aspect": "вы́растить овощи́",
        "collocation": "выра́щивать + что?(C4) (trồng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."
      },
      {
        "ru": "разводи́ть скот",
        "stress": "разводи́ть скот",
        "vi": "chăn nuôi gia súc",
        "pos": "Verb",
        "aspect": "развести́ скот",
        "collocation": "разводи́ть + кого?(C4) (chăn nuôi con gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."
      },
      {
        "ru": "гото́вить еду́",
        "stress": "гото́вить еду́",
        "vi": "nấu ăn",
        "pos": "Verb",
        "aspect": "пригото́вить еду́",
        "collocation": "гото́вить + что?(C4) (nấu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."
      },
      {
        "ru": "убира́ть дом",
        "stress": "убира́ть дом",
        "vi": "dọn dẹp nhà cửa",
        "pos": "Verb",
        "aspect": "убра́ть дом",
        "collocation": "убира́ть + что?(C4) (dọn dẹp cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."
      },
      {
        "ru": "руководи́ть",
        "stress": "руководи́ть",
        "vi": "lãnh đạo",
        "pos": "Verb",
        "collocation": "руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cái gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Дире́ктор руководи́т рабо́той в фирме.",
        "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty."
      },
      {
        "ru": "консульти́ровать клие́нта",
        "stress": "консульти́ровать клие́нта",
        "vi": "tư vấn khách hàng",
        "pos": "Verb",
        "aspect": "проконсульти́ровать клие́нта",
        "collocation": "консульти́ровать + кого?(C4) (tư vấn cho ai?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Юри́ст консульти́рует клие́нта в юриди́ческой фи́рме.",
        "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty."
      },
      {
        "ru": "встреча́ться с партнёрами",
        "stress": "встреча́ться с партнёрами",
        "vi": "gặp gỡ đối tác",
        "pos": "Verb",
        "aspect": "встре́титься с партнёрами",
        "collocation": "встреча́ться + с кем?(C5) (gặp gỡ với ai?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."
      },
      {
        "ru": "работа́ть с докуме́нтами",
        "stress": "работа́ть с докуме́нтами",
        "vi": "làm việc với giấy tờ",
        "pos": "Verb",
        "collocation": "работа́ть + с чем?(C5) (làm việc với cái gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
        "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."
      },
      {
        "ru": "продава́ть",
        "stress": "продава́ть",
        "vi": "bán hàng",
        "pos": "Verb",
        "aspect": "прода́ть",
        "collocation": "продава́ть + что?(C4) + кому?(C3) (bán cái gì? cho ai?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."
      },
      {
        "ru": "писа́ть",
        "stress": "писа́ть",
        "vi": "viết",
        "pos": "Verb",
        "aspect": "написа́ть",
        "collocation": "писа́ть + что?(C4) (viết cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Журнали́ст пи́шет ста́тьи в редаќции.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn."
      },
      {
        "ru": "рисова́ть карти́ны",
        "stress": "рисова́ть карти́ны",
        "vi": "vẽ tranh",
        "pos": "Verb",
        "aspect": "нарисова́ть карти́ны",
        "collocation": "рисова́ть + что?(C4) (vẽ cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Худо́жница рису́ет карти́ны в мастерско́й.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."
      },
      {
        "ru": "выступа́ть",
        "stress": "выступа́ть",
        "vi": "biểu diễn, thuyết trình",
        "pos": "Verb",
        "aspect": "выступи́ть",
        "collocation": "выступа́ть + о чём?(C6) (phát biểu/thuyết trình về cái gì?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."
      },
      {
        "ru": "переводи́ть те́ксты",
        "stress": "переводи́ть те́ксты",
        "vi": "dịch văn bản",
        "pos": "Verb",
        "aspect": "перевести́ те́ксты",
        "collocation": "переводи́ть+ что?(C4) (dịch cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
        "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng."
      },
      {
        "ru": "создава́ть оде́жду",
        "stress": "создава́ть оде́жду",
        "vi": "thiết kế quần áo",
        "pos": "Verb",
        "aspect": "созда́ть оде́жду",
        "collocation": "создава́ть + что?(C4) (tạo ra/thiết kế cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Моделье́р создаёт оде́жды в ателье́.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."
      },
      {
        "ru": "игра́ть",
        "stress": "игра́ть",
        "vi": "chơi",
        "pos": "Verb",
        "aspect": "сыгра́ть",
        "collocation": "игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ex_vi": "Nhạc công đang chơi piano trên buổi concert."
      },
      {
        "ru": "занима́ться",
        "stress": "занима́ться",
        "vi": "luyện tập",
        "pos": "Verb",
        "collocation": "занима́ться + чем?(C5) (luyện tập cái gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."
      },
      {
        "ru": "Университе́т",
        "stress": "Университе́т",
        "vi": "Trường đại học",
        "pos": "Noun",
        "gender": "m",
        "ex": "Студе́нт у́чится в университе́те.",
        "ex_vi": "Sinh viên đang học ở trường đại học."
      },
      {
        "ru": "Акаде́мия",
        "stress": "Акаде́мия",
        "vi": "Học viện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
        "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."
      },
      {
        "ru": "Институ́т",
        "stress": "Институ́т",
        "vi": "Viện",
        "pos": "Noun",
        "gender": "m",
        "ex": "Она́ изуча́ет хи́мию в институ́те хи́мии.",
        "ex_vi": "Cô ấy nghiên cứu hóa học ở viện hóa học."
      },
      {
        "ru": "Шко́ла",
        "stress": "Шко́ла",
        "vi": "Trường học",
        "pos": "Noun",
        "gender": "f",
        "ex": "Шко́льница у́чится в шко́ле.",
        "ex_vi": "Học sinh đang học ở trường học."
      },
      {
        "ru": "Заво́д",
        "stress": "Заво́д",
        "vi": "Nhà máy",
        "pos": "Noun",
        "gender": "m",
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."
      },
      {
        "ru": "Лаборато́рия",
        "stress": "Лаборато́рия",
        "vi": "Phòng thí nghiệm",
        "pos": "Noun",
        "gender": "f",
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."
      },
      {
        "ru": "Компью́тер",
        "stress": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "gender": "m",
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."
      },
      {
        "ru": "О́фис",
        "stress": "О́фис",
        "vi": "Văn phòng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."
      },
      {
        "ru": "Больни́ца",
        "stress": "Больни́ца",
        "vi": "Bệnh viện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Врач осма́тривает и ле́чит пациéнтов в больни́це.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."
      },
      {
        "ru": "Поликли́ника",
        "stress": "Поликли́ника",
        "vi": "Phòng khám đa khoa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Врач осма́тривает и ле́чит пациéнтов в поликли́нике.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở phòng khám đa khoa."
      },
      {
        "ru": "Фе́рма",
        "stress": "Фе́рма",
        "vi": "Trang trại",
        "pos": "Noun",
        "gender": "f",
        "ex": "Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."
      },
      {
        "ru": "Дом",
        "stress": "Дом",
        "vi": "Nhà",
        "pos": "Noun",
        "gender": "m",
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."
      },
      {
        "ru": "Фи́рма",
        "stress": "Фи́рма",
        "vi": "Công ty",
        "pos": "Noun",
        "gender": "f",
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."
      },
      {
        "ru": "Магази́н",
        "stress": "Магази́н",
        "vi": "Cửa hàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."
      },
      {
        "ru": "Реда́кция",
        "stress": "Реда́кция",
        "vi": "Tòa soạn",
        "pos": "Noun",
        "gender": "f",
        "ex": "Журнали́ст пи́шет ста́тьи в редаќции.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn."
      },
      {
        "ru": "Мастерска́я",
        "stress": "Мастерска́я",
        "vi": "Xưởng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Худо́жница рису́ет карти́ны в мастерско́й.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."
      },
      {
        "ru": "Теа́тр",
        "stress": "Теа́тр",
        "vi": "Nhà hát",
        "pos": "Noun",
        "gender": "m",
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."
      },
      {
        "ru": "Конце́рт",
        "stress": "Конце́рт",
        "vi": "Buổi hòa nhạc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ex_vi": "Nhạc công đang chơi piano trên buổi concert."
      },
      {
        "ru": "Ателье́",
        "stress": "Ателье́",
        "vi": "Tiệm may/xưởng may",
        "pos": "Noun",
        "gender": "n",
        "ex": "Моделье́р создаёт оде́жды в ателье́.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."
      },
      {
        "ru": "Спортза́л",
        "stress": "Спортза́л",
        "vi": "Phòng tập thể dục",
        "pos": "Noun",
        "gender": "m",
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."
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
    "icon": "shirt",
    "color": "#059669",
    "sub_topics": [
      "Chủ đề quần áo, giày dép"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "Пальто́",
        "stress": "Пальто́",
        "vi": "Áo măng tô",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я надева́ю пальто́, потому́ что на улице́ хо́лодно.",
        "ex_vi": "Tôi mặc áo khoác dài vì ngoài trời lạnh."
      },
      {
        "ru": "Ку́ртка",
        "stress": "Ку́ртка",
        "vi": "Áo khoác",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я надева́ю ку́ртку и иду́ в магази́н.",
        "ex_vi": "Tôi mặc áo khoác và đi đến cửa hàng."
      },
      {
        "ru": "Сви́тер",
        "stress": "Сви́тер",
        "vi": "Áo len chui đầu",
        "pos": "Noun",
        "gender": "m",
        "ex": "Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.",
        "ex_vi": "Vào mùa đông, tôi thường mặc áo len vì nó ấm."
      },
      {
        "ru": "Брю́ки",
        "stress": "Брю́ки",
        "vi": "Quần dài",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я надева́ю брю́ки пе́ред вы́ходом.",
        "ex_vi": "Tôi mặc quần dài trước khi ra khỏi nhà."
      },
      {
        "ru": "Ша́пка",
        "stress": "Ша́пка",
        "vi": "Mũ len",
        "pos": "Noun",
        "gender": "f",
        "ex": "Пе́ред вы́ходом я надева́ю ша́пку.",
        "ex_vi": "Trước khi ra ngoài, tôi đội mũ len."
      },
      {
        "ru": "Шарф",
        "stress": "Шарф",
        "vi": "Khăn quàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "В холо́дную пого́ду я надева́ю шарф.",
        "ex_vi": "Khi thời tiết lạnh, tôi quàng khăn."
      },
      {
        "ru": "Перча́тки",
        "stress": "Перча́тки",
        "vi": "Găng tay",
        "pos": "Noun",
        "gender": "m",
        "note": "Перча́тка (một chiếc găng tay)",
        "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.",
        "ex_vi": "Tôi tháo găng tay và cất chúng vào tủ."
      },
      {
        "ru": "Носки́",
        "stress": "Носки́",
        "vi": "Tất",
        "pos": "Noun",
        "gender": "m",
        "note": "Носо́к (một chiếc tất)",
        "ex": "Я снима́ю носки́ и кладу́ их в корзи́ну для гря́зного оде́жды.",
        "ex_vi": "Tôi cởi tất và bỏ chúng vào giỏ đựng đồ bẩn."
      },
      {
        "ru": "Боти́нки",
        "stress": "Боти́нки",
        "vi": "Giày bốt thấp cổ",
        "pos": "Noun",
        "gender": "m",
        "ex": "О́сенью я ча́сто ношу́ боти́нки.",
        "ex_vi": "Vào mùa thu, tôi thường đi giày bốt ngắn."
      },
      {
        "ru": "Сапоги́",
        "stress": "Сапоги́",
        "vi": "Giày bốt cao cổ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Зимо́й я ношу́ тёплые сапоги́.",
        "ex_vi": "Vào mùa đông, tôi đeo ủng ấm."
      },
      {
        "ru": "Футбо́лка",
        "stress": "Футбо́лка",
        "vi": "Áo phông",
        "pos": "Noun",
        "gender": "f",
        "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.",
        "ex_vi": "Mùa hè, tôi thường mặc áo phông và quần short."
      },
      {
        "ru": "Шо́рты",
        "stress": "Шо́рты",
        "vi": "Quần đùi",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.",
        "ex_vi": "Mùa hè, tôi thường mặc áo phông và quần short."
      },
      {
        "ru": "Джи́нсы",
        "stress": "Джи́нсы",
        "vi": "Quần jean",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ка́ждый день я ношу́ джи́нсы на учёбу.",
        "ex_vi": "Mỗi ngày, tôi mặc quần jean đi học."
      },
      {
        "ru": "Пла́тье",
        "stress": "Пла́тье",
        "vi": "Đầm (váy liền)",
        "pos": "Noun",
        "gender": "n",
        "ex": "На пра́здник я наде́ну краси́вое пла́тье.",
        "ex_vi": "Tôi sẽ mặc một chiếc váy đẹp đi dự tiệc."
      },
      {
        "ru": "Ю́бка",
        "stress": "Ю́бка",
        "vi": "Chân váy",
        "pos": "Noun",
        "gender": "f",
        "ex": "Сего́дня я надева́ю кра́сную ю́бку",
        "ex_vi": "Hôm nay, tôi mặc chân váy màu đỏ."
      },
      {
        "ru": "Руба́шка",
        "stress": "Руба́шка",
        "vi": "Áo sơ mi",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я выбира́ю бе́лую руба́шку в магази́не оде́жды.",
        "ex_vi": "Tôi chọn một chiếc áo sơ mi trắng ở cửa hàng quần áo."
      },
      {
        "ru": "Санда́лии",
        "stress": "Санда́лии",
        "vi": "Dép sandal",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ле́том я ношу́ санда́лии ка́ждый день.",
        "ex_vi": "Mùa hè, tôi đeo sandal mỗi ngày."
      },
      {
        "ru": "Кроссо́вки",
        "stress": "Кроссо́вки",
        "vi": "Giày thể thao",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я снима́ю кроссо́вки и ста́влю их в шкаф для о́буви.",
        "ex_vi": "Tôi cởi giày thể thao và đặt chúng vào tủ giày."
      },
      {
        "ru": "Гря́зная оде́жда",
        "stress": "Гря́зная оде́жда",
        "vi": "Quần áo bẩn",
        "pos": "Noun",
        "gender": "f",
        "ex": "Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.",
        "ex_vi": "Khi tôi nhìn thấy quần áo bẩn, tôi cho chúng vào máy giặt."
      },
      {
        "ru": "стира́ть",
        "stress": "стира́ть",
        "vi": "giặt",
        "pos": "Verb",
        "aspect": "постира́ть",
        "collocation": "стира́ть + что?(C4) (giặt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.",
        "ex_vi": "Tôi giặt quần áo bẩn bằng máy giặt."
      },
      {
        "ru": "Cтира́льная маши́на",
        "stress": "Cтира́льная маши́на",
        "vi": "Máy giặt",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.",
        "ex_vi": "Tôi giặt quần áo bẩn bằng máy giặt."
      },
      {
        "ru": "суши́ть",
        "stress": "суши́ть",
        "vi": "phơi khô, sấy khô",
        "pos": "Verb",
        "aspect": "посуши́ть",
        "collocation": "суши́ть + что?(C4) (phơi,sấy khô cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.",
        "ex_vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi."
      },
      {
        "ru": "Суши́лка",
        "stress": "Суши́лка",
        "vi": "Giàn phơi",
        "pos": "Noun",
        "gender": "f",
        "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.",
        "ex_vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi."
      },
      {
        "ru": "скла́дывать",
        "stress": "скла́дывать",
        "vi": "gấp, xếp",
        "pos": "Verb",
        "aspect": "сложи́ть",
        "collocation": "скла́дывать+ что?(C4) (gấp,xếp cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я сложи́л сви́тер и брю́ки в стопку.",
        "ex_vi": "Tôi đã gấp áo len và quần dài thành một chồng."
      },
      {
        "ru": "ве́шать",
        "stress": "ве́шать",
        "vi": "treo",
        "pos": "Verb",
        "aspect": "повéсить",
        "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я ве́шаю руба́шку на ве́шалку.",
        "ex_vi": "Tôi treo áo sơ mi lên móc áo."
      },
      {
        "ru": "убира́ть",
        "stress": "убира́ть",
        "vi": "dọn dẹp",
        "pos": "Verb",
        "aspect": "убра́ть",
        "collocation": "убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cái gì? vào đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я убира́ю футбо́лку в шкаф.",
        "ex_vi": "Tôi cất áo phông vào tủ."
      },
      {
        "ru": "покупа́ть",
        "stress": "покупа́ть",
        "vi": "mua",
        "pos": "Verb",
        "aspect": "купи́ть",
        "collocation": "покупа́ть + что?(C4) (mua cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я покупа́ю ку́ртку в магази́не оде́жды.",
        "ex_vi": "Tôi mua áo khoác ở cửa hàng quần áo."
      },
      {
        "ru": "выбира́ть",
        "stress": "выбира́ть",
        "vi": "chọn, lựa chọn",
        "pos": "Verb",
        "aspect": "вы́брать",
        "collocation": "выбира́ть + что?(C4) (chọn cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я выбира́ю футбо́лку и джинсы в магази́не.",
        "ex_vi": "Tôi đang chọn áo phông và quần jean ở cửa hàng."
      },
      {
        "ru": "примеря́ть",
        "stress": "примеря́ть",
        "vi": "mặc thử",
        "pos": "Verb",
        "aspect": "приме́рить",
        "collocation": "примеря́ть + что?(C4) (mặc thử cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я примеря́ю ку́ртку в приме́рочной.",
        "ex_vi": "Tôi đang thử áo khoác trong phòng thử đồ."
      },
      {
        "ru": "Приме́рочная",
        "stress": "Приме́рочная",
        "vi": "Phòng thử đồ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я примеря́ю ку́ртку в приме́рочной.",
        "ex_vi": "Tôi đang thử áo khoác trong phòng thử đồ."
      },
      {
        "ru": "подходи́ть",
        "stress": "подходи́ть",
        "vi": "phù hợp",
        "pos": "Verb",
        "aspect": "подойти́",
        "collocation": "(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?).\n(2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cái gì?)",
        "verb_obj": "Động từ đi với cách 3",
        "ex": "Э́та ку́ртка мне хорошо́ подхо́дит.",
        "ex_vi": "Chiếc áo khoác này rất hợp với tôi."
      },
      {
        "ru": "плати́ть",
        "stress": "плати́ть",
        "vi": "thanh toán",
        "pos": "Verb",
        "aspect": "заплати́ть",
        "collocation": "плати́ть + за что?(С4) + кому?(C3) (thanh toán cái gì? cho ai?)",
        "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 5",
        "ex": "Я заплати́л за ку́ртку на ка́ссe ба́нковской ка́ртой.",
        "ex_vi": "Tôi đã thanh toán chiếc áo khoác tại quầy thu ngân bằng thẻ ngân hàng"
      },
      {
        "ru": "Ба́нковская ка́рта",
        "stress": "Ба́нковская ка́рта",
        "vi": "Thẻ ngân hàng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я плачу́ ба́нковской ка́ртой за оде́жду.",
        "ex_vi": "Tôi thanh toán tiền quần áo bằng thẻ ngân hàng."
      },
      {
        "ru": "Нали́чные де́ньги",
        "stress": "Нали́чные де́ньги",
        "vi": "Tiền mặt",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я заплати́ла за оде́жду на́личными.",
        "ex_vi": "Tôi đã trả tiền quần áo bằng tiền mặt."
      },
      {
        "ru": "Продаве́ц",
        "stress": "Продаве́ц",
        "vi": "Người bán hàng",
        "pos": "Noun",
        "gender": "m",
        "note": "продава́ть / прода́ть (bán hàng)",
        "ex": "Я заплати́ла продавцу́ за пла́тье.",
        "ex_vi": "Tôi đã trả tiền váy cho người bán hàng."
      },
      {
        "ru": "носи́ть",
        "stress": "носи́ть",
        "vi": "mặc, đeo, đội",
        "pos": "Verb",
        "collocation": "носи́ть + что?(C4) (mặc, đeo, đội cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(wear) (dùng khi nói về thói quen, phong cách ăn mặc)",
        "ex": "Зимо́й я ношу́ тёплую ку́ртку и ша́пку.",
        "ex_vi": "Vào mùa đông, tôi mặc áo khoác ấm và đội mũ."
      },
      {
        "ru": "надева́ть",
        "stress": "надева́ть",
        "vi": "mặc vào, đeo vào, đội vào",
        "pos": "Verb",
        "aspect": "наде́ть",
        "collocation": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)",
        "ex": "Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.",
        "ex_vi": "Trước khi ra ngoài, tôi mặc áo len và quần dài."
      },
      {
        "ru": "снима́ть",
        "stress": "снима́ть",
        "vi": "cởi ra, tháo ra",
        "pos": "Verb",
        "aspect": "снять",
        "collocation": "снима́ть + что?(C4) (cởi ra, tháo ra cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Nghĩa khác: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video)",
        "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.",
        "ex_vi": "Tôi tháo găng tay và cất chúng vào tủ."
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
    "icon": "home",
    "color": "#d97706",
    "sub_topics": [
      "Chủ đề đồ dùng gia đình"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "мыть",
        "stress": "мыть",
        "vi": "rửa",
        "pos": "Verb",
        "aspect": "вы́мыть",
        "collocation": "мыть + что?(C4) (rửa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.",
        "ex_vi": "Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa."
      },
      {
        "ru": "вытира́ть",
        "stress": "вытира́ть",
        "vi": "lau khô (loại bỏ nước)",
        "pos": "Verb",
        "aspect": "вы́тереть",
        "syn": "протира́ть / протере́ть (lau chùi) (loại bỏ bụi bẩn)",
        "collocation": "вытира́ть + что?(C4) (lau khô cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.",
        "ex_vi": "Trên bàn có nước, nên tôi lấy khăn để lau bàn."
      },
      {
        "ru": "брать",
        "stress": "брать",
        "vi": "lấy ra, cầm lên",
        "pos": "Verb",
        "aspect": "взять",
        "ant": "убира́ть / убра́ть (cất vào)",
        "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)",
        "collocation": "брать + что?(C4) (lấy,cầm lên cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "nhấn mạnh hành động cầm lên",
        "ex": "Я бра́л молоко́ из холоди́льника.",
        "ex_vi": "Tôi đã lấy sữa từ tủ lạnh ra."
      },
      {
        "ru": "убира́ть",
        "stress": "убира́ть",
        "vi": "cất vào",
        "pos": "Verb",
        "aspect": "убра́ть",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я убра́л молоко́ в холоди́льник.",
        "ex_vi": "Tôi đã cất sữa vào tủ lạnh."
      },
      {
        "ru": "открыва́ть",
        "stress": "открыва́ть",
        "vi": "mở ra",
        "pos": "Verb",
        "aspect": "окры́ть",
        "ant": "закрыва́ть / закры́ть (đóng vào)",
        "collocation": "открыва́ть + что?(C4) (mở cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng."
      },
      {
        "ru": "закрыва́ть",
        "stress": "закрыва́ть",
        "vi": "đóng vào",
        "pos": "Verb",
        "aspect": "закры́ть",
        "ant": "открыва́ть / откры́ть (mở ra)",
        "collocation": "закрыва́ть + что?(C4) (đóng, khóa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.",
        "ex_vi": "Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào."
      },
      {
        "ru": "включа́ть",
        "stress": "включа́ть",
        "vi": "bật lên",
        "pos": "Verb",
        "aspect": "включи́ть",
        "ant": "выключа́ть / вы́ключить (tắt đi)",
        "collocation": "включа́ть + что?(C4) (bật cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я включи́л телеви́зор, что́бы посмотре́ть фильм.",
        "ex_vi": "Tôi đã bật tivi lên để xem phim."
      },
      {
        "ru": "выключа́ть",
        "stress": "выключа́ть",
        "vi": "tắt đi",
        "pos": "Verb",
        "aspect": "вы́ключить",
        "ant": "включа́ть / включи́ть (bật lên)",
        "collocation": "выключа́ть + что?(C4) (tắt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я вы́ключил свет, что́бы спать.",
        "ex_vi": "Tôi tắt đèn để đi ngủ."
      },
      {
        "ru": "стели́ть",
        "stress": "стели́ть",
        "vi": "trải ra",
        "pos": "Verb",
        "aspect": "постели́ть",
        "ant": "свора́чивать / сверну́ть (cuộn vào)\nскла́дывать / сложи́ть (gấp lại)",
        "collocation": "стели́ть + что?(C4) (trải cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я постели́л ковёр, что́бы поста́вить еду́ на него́.",
        "ex_vi": "Tôi trải thảm ra để đặt đồ ăn lên."
      },
      {
        "ru": "свора́чивать",
        "stress": "свора́чивать",
        "vi": "cuộn vào",
        "pos": "Verb",
        "aspect": "сверну́ть",
        "ant": "стели́ть / постели́ть (trải ra)",
        "syn": "скла́дывать / сложи́ть (gấp lại)",
        "collocation": "свора́чивать + что?(C4) (cuộn cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я сверну́л ковёр и убра́л его́ в шкаф.",
        "ex_vi": "Tôi đã cuộn thảm vào và đã cất vảo tủ."
      },
      {
        "ru": "стира́ть",
        "stress": "стира́ть",
        "vi": "giặt giũ",
        "pos": "Verb",
        "aspect": "постира́ть",
        "ant": "суши́ть / вы́сушить (phơi khô)",
        "collocation": "стира́ть + что?(C4) (giặt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я постира́л руба́шку рука́ми.",
        "ex_vi": "Tôi đã giặt áo sơ mi bằng tay."
      },
      {
        "ru": "суши́ть",
        "stress": "суши́ть",
        "vi": "phơi khô",
        "pos": "Verb",
        "aspect": "вы́сушить",
        "ant": "стира́ть / постира́ть (giặt giũ)",
        "collocation": "суши́ть + что?(C4) (phơi khô cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.",
        "ex_vi": "Tôi đang treo quần áo lên giàn phơi để phơi khô đồ."
      },
      {
        "ru": "раскла́дывать",
        "stress": "раскла́дывать",
        "vi": "bày ra",
        "pos": "Verb",
        "aspect": "разложи́ть",
        "ant": "собира́ть / собра́ть (thu gom lại)",
        "collocation": "раскла́дывать + что?(C4) (trải ra, bày ra cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я раскла́дываю ве́щи на столе́.",
        "ex_vi": "Tôi đang bày đồ đạc lên bàn."
      },
      {
        "ru": "собира́ть",
        "stress": "собира́ть",
        "vi": "thu gom",
        "pos": "Verb",
        "aspect": "собра́ть",
        "ant": "раскла́дывать / разложи́ть (bày ra)",
        "collocation": "собира́ть + что?(C4) (thu gom cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Nghĩa khác: thu hoạch, sưu tầm",
        "ex": "Я собира́ю ве́щи на столе́.",
        "ex_vi": "Tôi đang thu gom đồ đạc ở trên bàn."
      },
      {
        "ru": "ста́вить",
        "stress": "ста́вить",
        "vi": "đặt đứng",
        "pos": "Verb",
        "aspect": "поста́вить",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "syn": "класть / положи́ть (đặt nằm)",
        "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я поста́вил ва́зу на стол.",
        "ex_vi": "Tôi đã đặt lọ hoa lên trên bàn."
      },
      {
        "ru": "класть",
        "stress": "класть",
        "vi": "đặt nằm",
        "pos": "Verb",
        "aspect": "положи́ть",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "syn": "ста́вить / поста́вить (đặt đứng)",
        "collocation": "класть + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я кладу́ телефо́н и кни́гу на крова́ть.",
        "ex_vi": "Tôi đang đặt điện thoại và quyển sách lên trên giường."
      },
      {
        "ru": "снима́ть",
        "stress": "снима́ть",
        "vi": "nhấc lên",
        "pos": "Verb",
        "aspect": "снять",
        "ant": "(1) ста́вить / поста́вить (đặt xuống) (đứng)\n(2) класть / положи́ть (đặt xuống) (nằm)",
        "syn": "брать / взять (cầm lên)",
        "collocation": "снима́ть + что?(C4) + с/из чего?(C2) (nhấc cái gì? khỏi đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Nghĩa khác: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video), снима́ть оде́жду (cởi quần áo)",
        "ex": "Я вы́ключил плиту́ и снял кастрю́лю с плиты́.",
        "ex_vi": "Tôi đã tắt bếp và nhấc nồi ra khỏi bếp."
      },
      {
        "ru": "гла́дить (оде́жду)",
        "stress": "гла́дить (оде́жду)",
        "vi": "ủi (quần áo)",
        "pos": "Verb",
        "aspect": "погла́дить (оде́жду)",
        "collocation": "гла́дить + что?(C4) (là,ủi cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я гла́жу руба́шку.",
        "ex_vi": "Tôi đang ủi áo sơ mi."
      },
      {
        "ru": "протира́ть",
        "stress": "протира́ть",
        "vi": "lau chùi (loại bỏ bụi bẩn)",
        "pos": "Verb",
        "aspect": "протере́ть",
        "syn": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)",
        "collocation": "протира́ть + что?(C4) (lau chùi cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я протира́ю стол и сту́лья.",
        "ex_vi": "Tôi đang lau chùi bàn ghế."
      },
      {
        "ru": "ве́шать",
        "stress": "ве́шать",
        "vi": "treo",
        "pos": "Verb",
        "aspect": "пове́сить",
        "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я пове́сил зе́ркало на сте́ну в ва́нной.",
        "ex_vi": "Tôi đã treo gương lên trên tường ở trong phòng tắm."
      },
      {
        "ru": "чи́стить",
        "stress": "чи́стить",
        "vi": "cọ rửa, làm sạch",
        "pos": "Verb",
        "aspect": "почи́стить",
        "collocation": "чи́стить + что?(C4) (làm sạch/gọt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(1) nhấn mạnh việc dùng lực để làm sạch đồ vật\n(2) чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я чи́щу унита́з и ва́нну.",
        "ex_vi": "Tôi đang cọ rửa bồn cầu và bồn tắm."
      },
      {
        "ru": "сиде́ть",
        "stress": "сиде́ть",
        "vi": "ngồi",
        "pos": "Verb",
        "ant": "(1) стоя́ть (đứng)\n(2) лежа́ть (nằm)",
        "collocation": "сиде́ть + где?(C6) (ngồi ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "note": "nhấn mạnh trạng thái đang ngồi",
        "ex": "Я сижу́ за сту́лом, что́бы учи́ться.",
        "ex_vi": "Tôi ngồi vào ghế để học."
      },
      {
        "ru": "украша́ть",
        "stress": "украша́ть",
        "vi": "trang trí",
        "pos": "Verb",
        "aspect": "укра́сить",
        "collocation": "украша́ть + что?(C4) + чем?(C5) (trang trí cái gì? bằng cái gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 5",
        "ex": "Я украша́ю гости́ную цвето́чным горшко́м.",
        "ex_vi": "Tôi trang trí phòng khách bằng chậu hoa."
      },
      {
        "ru": "лежа́ть",
        "stress": "лежа́ть",
        "vi": "nằm",
        "pos": "Verb",
        "ant": "(1) сиде́ть (ngồi)\n(2) стоя́ть (đứng)",
        "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.",
        "ex_vi": "Tôi đang nằm trên thảm và đọc sách ở công viên."
      },
      {
        "ru": "храни́ть",
        "stress": "храни́ть",
        "vi": "giữ gìn, cất giữ, lưu trữ",
        "pos": "Verb",
        "aspect": "сохрани́ть",
        "collocation": "храни́ть + что?(C4) (lưu giữ,bảo quản cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я храню́ посу́ду в ку́хонном шкафу́.",
        "ex_vi": "Tôi cất giữ bát đĩa ở trong tủ bếp."
      },
      {
        "ru": "ложи́ться спать",
        "stress": "ложи́ться спать",
        "vi": "ngủ",
        "pos": "Verb",
        "aspect": "лечь спать",
        "collocation": "ложи́ться спать + где?(C6) (ngủ ở đâu)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я ложи́лся спать на дива́не весь день.",
        "ex_vi": "Tôi đã ngủ trên sô pha cả ngày."
      },
      {
        "ru": "смотре́ть",
        "stress": "смотре́ть",
        "vi": "xem",
        "pos": "Verb",
        "aspect": "посмотре́ть",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я смотрю́ фильм по компью́теру в спа́льне.",
        "ex_vi": "Tôi xem phim trên máy tính ở trong phòng ngủ."
      },
      {
        "ru": "отдыха́ть",
        "stress": "отдыха́ть",
        "vi": "nghỉ ngơi",
        "pos": "Verb",
        "aspect": "отдохну́ть",
        "collocation": "отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я обы́чно отдыха́ю на дива́не.",
        "ex_vi": "Tôi thường nghỉ ngơi trên ghế sô pha."
      },
      {
        "ru": "сажа́ть (цветы́)",
        "stress": "сажа́ть (цветы́)",
        "vi": "trồng (hoa)",
        "pos": "Verb",
        "aspect": "посади́ть (цветы́)",
        "collocation": "сажа́ть + что?(C4) (trồng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я сажа́ю цветы́ в цвето́чный горшо́к.",
        "ex_vi": "Tôi trồng hoa vào trong chậu hoa."
      },
      {
        "ru": "рабо́тать",
        "stress": "рабо́тать",
        "vi": "làm việc",
        "pos": "Verb",
        "collocation": "рабо́тать + где?(C6) (làm việc ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я рабо́таю за столо́м.",
        "ex_vi": "Tôi làm việc trên bàn."
      },
      {
        "ru": "прове́тривать (ко́мнату)",
        "stress": "прове́тривать (ко́мнату)",
        "vi": "thông gió (phòng)",
        "pos": "Verb",
        "aspect": "прове́трить (ко́мнату)",
        "collocation": "прове́тривать + что?(C4) (thông gió, làm thoáng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ex_vi": "Tôi đã mở cửa sổ để thông gió phòng."
      },
      {
        "ru": "есть",
        "stress": "есть",
        "vi": "ăn",
        "pos": "Verb",
        "aspect": "съесть",
        "collocation": "есть + что?(C4) (ăn cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я ем рис с мя́сом.",
        "ex_vi": "Tôi đang ăn cơm với thịt."
      },
      {
        "ru": "гото́вить",
        "stress": "гото́вить",
        "vi": "nấu",
        "pos": "Verb",
        "aspect": "пригото́вить",
        "collocation": "гото́вить + что?(C4) (nấu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я гото́влю ка́шу.",
        "ex_vi": "Tôi đang nấu cháo."
      },
      {
        "ru": "вари́ть",
        "stress": "вари́ть",
        "vi": "luộc",
        "pos": "Verb",
        "aspect": "свари́ть",
        "collocation": "вари́ть + что?(C4) (luộc cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я варю́ яйца́ в кастрю́ле.",
        "ex_vi": "Tôi đang luộc trứng trong nồi."
      },
      {
        "ru": "пить",
        "stress": "пить",
        "vi": "uống",
        "pos": "Verb",
        "aspect": "вы́пить",
        "collocation": "пить + что?(C4) (uống cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я пью́ сок я́блока.",
        "ex_vi": "Tôi đang uống nước ép táo."
      },
      {
        "ru": "жа́рить",
        "stress": "жа́рить",
        "vi": "rán",
        "pos": "Verb",
        "aspect": "пожа́рить",
        "collocation": "жа́рить + что?(C4) (chiên, rán cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я жа́рю ры́бу на сковороде́.",
        "ex_vi": "Tôi đang rán cá trên chảo."
      },
      {
        "ru": "принима́ть (ванну)",
        "stress": "принима́ть (ванну)",
        "vi": "tắm bồn",
        "pos": "Verb",
        "aspect": "приня́ть (ванну)",
        "ex": "Я принима́ю ва́нну.",
        "ex_vi": "Tôi đang tắm bồn."
      },
      {
        "ru": "ре́зать",
        "stress": "ре́зать",
        "vi": "cắt, thái (chung chung)",
        "pos": "Verb",
        "collocation": "ре́зать + что?(C4) (cắt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я ре́жу морко́вь и помидо́ры.",
        "ex_vi": "Tôi đang thái cà rốt và cà chua."
      },
      {
        "ru": "нареза́ть",
        "stress": "нареза́ть",
        "vi": "thái (thành nhiều miếng)",
        "pos": "Verb",
        "aspect": "наре́зать",
        "collocation": "нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.",
        "ex_vi": "Tôi đang gọt vỏ táo và cắt chúng thành nhiều miếng."
      },
      {
        "ru": "разреза́ть",
        "stress": "разреза́ть",
        "vi": "bổ (làm đôi, làm 4)",
        "pos": "Verb",
        "aspect": "разре́зать",
        "collocation": "разреза́ть + что?(C4) (bổ đôi cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я разреза́ю арбу́з",
        "ex_vi": "Tôi đang bổ quả dưa hấu."
      },
      {
        "ru": "войти́ / входи́ть (в ко́мнату)",
        "stress": "войти́ / входи́ть (в ко́мнату)",
        "vi": "đi (vào phòng)",
        "pos": "Verb",
        "ant": "вы́йти / выходи́ть (из ко́мнаты): đi ra (khỏi phòng)",
        "collocation": "войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я вошёл в ко́мнату.",
        "ex_vi": "Tôi đã đi vào trong phòng."
      },
      {
        "ru": "вы́йти / выходи́ть (из ко́мнаты)",
        "stress": "вы́йти / выходи́ть (из ко́мнаты)",
        "vi": "đi ra (khỏi phòng)",
        "pos": "Verb",
        "ant": "войти́ / входи́ть (в ко́мнату): đi (vào phòng)",
        "collocation": "вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cái gì?)",
        "verb_obj": "Động từ đi với cách 2",
        "ex": "Я вы́шел из до́ма.",
        "ex_vi": "Tôi đã đi ra khỏi nhà."
      },
      {
        "ru": "в туале́т",
        "stress": "в туале́т",
        "vi": "đi vệ sinh",
        "pos": "Word",
        "ex": "Я хочу́ в туале́т.",
        "ex_vi": "Tôi muốn đi vệ sinh."
      },
      {
        "ru": "Дива́н",
        "stress": "Дива́н",
        "vi": "Ghế sopha",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.",
        "ex_vi": "Tôi đặt sopha ở phòng khách để ngồi và xem phim."
      },
      {
        "ru": "Стол",
        "stress": "Стол",
        "vi": "Bàn",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.",
        "ex_vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó."
      },
      {
        "ru": "Ва́за",
        "stress": "Ва́за",
        "vi": "Bình hoa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.",
        "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó."
      },
      {
        "ru": "Ту́мба",
        "stress": "Ту́мба",
        "vi": "Tủ/kệ nhỏ có ngăn kéo",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.",
        "ex_vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó."
      },
      {
        "ru": "Телеви́зор",
        "stress": "Телеви́зор",
        "vi": "Ti vi",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.",
        "ex_vi": "Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim."
      },
      {
        "ru": "Цвето́чный горшо́к",
        "stress": "Цвето́чный горшо́к",
        "vi": "Chậu cây",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.",
        "ex_vi": "Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách."
      },
      {
        "ru": "Ковёр",
        "stress": "Ковёр",
        "vi": "Thảm",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.",
        "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."
      },
      {
        "ru": "Дверь",
        "stress": "Дверь",
        "vi": "Cửa ra vào",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я открыва́ю дверь, что́бы войти́ в дом.",
        "ex_vi": "Tôi mở cửa để đi vào trong nhà."
      },
      {
        "ru": "Окно́",
        "stress": "Окно́",
        "vi": "Cửa sổ",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
        "ex_vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng."
      },
      {
        "ru": "Стол",
        "stress": "Стол",
        "vi": "Bàn",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним.",
        "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."
      },
      {
        "ru": "(Кухо́нный) шкаф",
        "stress": "(Кухо́нный) шкаф",
        "vi": "Tủ bếp",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.",
        "ex_vi": "Tôi mở tủ để đặt đĩa vào trong và lấy nồi ra, sau đó tôi đóng nó lại."
      },
      {
        "ru": "Холоди́льник",
        "stress": "Холоди́льник",
        "vi": "Tủ lạnh",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.",
        "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."
      },
      {
        "ru": "Плита́",
        "stress": "Плита́",
        "vi": "Bếp",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я варю́ суп на плите́.",
        "ex_vi": "Tôi nấu súp trên bếp."
      },
      {
        "ru": "Кастрю́ля",
        "stress": "Кастрю́ля",
        "vi": "Nồi",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.",
        "ex_vi": "Tôi đặt nồi lên bếp để nấu súp."
      },
      {
        "ru": "Сковорода́",
        "stress": "Сковорода́",
        "vi": "Chảo",
        "pos": "Noun",
        "gender": "f",
        "ex": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.",
        "ex_vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."
      },
      {
        "ru": "Нож",
        "stress": "Нож",
        "vi": "Dao",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.",
        "ex_vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao."
      },
      {
        "ru": "Ло́жка",
        "stress": "Ло́жка",
        "vi": "Thìa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ем суп ло́жкой.",
        "ex_vi": "Tôi ăn súp bằng thìa."
      },
      {
        "ru": "Ви́лка",
        "stress": "Ви́лка",
        "vi": "Dĩa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ем мя́со ви́лкой.",
        "ex_vi": "Tôi ăn thịt bằng dĩa."
      },
      {
        "ru": "Таре́лка",
        "stress": "Таре́лка",
        "vi": "Đĩa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.",
        "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên."
      },
      {
        "ru": "Ми́ска",
        "stress": "Ми́ска",
        "vi": "Bát",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я налива́ю суп в ми́ску.",
        "ex_vi": "Tôi đổ súp vào bát."
      },
      {
        "ru": "Ча́шка",
        "stress": "Ча́шка",
        "vi": "Tách, chén",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я налива́ю чай в ча́шку, что́бы пить.",
        "ex_vi": "Tôi rót trà vào tách để uống"
      },
      {
        "ru": "Стака́н",
        "stress": "Стака́н",
        "vi": "Cốc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
        "ex_vi": "Tôi rót nước vào cốc để uống"
      },
      {
        "ru": "(Раздело́чная) доска́",
        "stress": "(Раздело́чная) доска́",
        "vi": "Thớt",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.",
        "ex_vi": "Tôi đặt thớt lên bàn để thái rau trên nó."
      },
      {
        "ru": "Ра́ковина",
        "stress": "Ра́ковина",
        "vi": "Bồn rửa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я мо́ю посу́ду в ра́ковине.",
        "ex_vi": "Tôi rửa bát đĩa trong bồn rửa."
      },
      {
        "ru": "Корзи́на",
        "stress": "Корзи́на",
        "vi": "Giỏ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я храню́ проду́кты в корзи́не.",
        "ex_vi": "Tôi đựng thực phẩm trong giỏ."
      },
      {
        "ru": "Крова́ть",
        "stress": "Крова́ть",
        "vi": "Giường",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ложу́сь спать на крова́ти.",
        "ex_vi": "Tôi ngủ trên giường."
      },
      {
        "ru": "Шкаф",
        "stress": "Шкаф",
        "vi": "Tủ quần áo",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).",
        "ex_vi": "Tôi mở tủ quần áo ra để cất quần áo vào (trong nó)."
      },
      {
        "ru": "Компью́тер",
        "stress": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я включа́ю компью́тер, что́бы рабо́тать.",
        "ex_vi": "Tôi bật máy tính lên để làm việc."
      },
      {
        "ru": "Ла́мпа",
        "stress": "Ла́мпа",
        "vi": "Đèn ngủ, đèn học",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.",
        "ex_vi": "Tôi bật đèn lên để đọc sách."
      },
      {
        "ru": "(Письме́нный) стол",
        "stress": "(Письме́нный) стол",
        "vi": "Bàn làm việc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я учу́сь за (письме́нным) столо́м.",
        "ex_vi": "Tôi học tại bàn."
      },
      {
        "ru": "Стул",
        "stress": "Стул",
        "vi": "Ghế",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.",
        "ex_vi": "Tôi ngồi vào ghế để làm việc."
      },
      {
        "ru": "Зе́ркало",
        "stress": "Зе́ркало",
        "vi": "Gương",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я ве́шаю зе́ркало на стену́, что́бы смотре́ть (в него́).",
        "ex_vi": "Tôi treo gương lên tường để soi gương."
      },
      {
        "ru": "По́лка",
        "stress": "По́лка",
        "vi": "Kệ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.",
        "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó)."
      },
      {
        "ru": "Ва́нна",
        "stress": "Ва́нна",
        "vi": "Bồn tắm",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я принима́ю ва́нну.",
        "ex_vi": "Tôi đang tắm."
      },
      {
        "ru": "Крючо́к",
        "stress": "Крючо́к",
        "vi": "Móc treo",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.",
        "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó)."
      },
      {
        "ru": "Полоте́нце",
        "stress": "Полоте́нце",
        "vi": "Khăn tắm",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.",
        "ex_vi": "Tôi lấy khăn từ móc treo để lau người."
      },
      {
        "ru": "Унита́з",
        "stress": "Унита́з",
        "vi": "Bồn cầu",
        "pos": "Noun",
        "gender": "m",
        "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.",
        "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."
      },
      {
        "ru": "Стира́льная маши́на",
        "stress": "Стира́льная маши́на",
        "vi": "Máy giặt",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я стира́ю оде́жду в стира́льной маши́не.",
        "ex_vi": "Tôi giặt quần áo trong máy giặt."
      },
      {
        "ru": "Утю́г",
        "stress": "Утю́г",
        "vi": "Bàn là",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я гла́жу руба́шку утюго́м.",
        "ex_vi": "Tôi là áo sơ mi bằng bàn là."
      },
      {
        "ru": "Глади́льная доска́",
        "stress": "Глади́льная доска́",
        "vi": "Cầu là (bàn để là quần áo)",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я гла́жу оде́жду на глади́льной доске́.",
        "ex_vi": "Tôi là quần áo trên cầu là."
      },
      {
        "ru": "Cуши́лка",
        "stress": "Cуши́лка",
        "vi": "Giàn phơi",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сушу́ оде́жду на суши́лке.",
        "ex_vi": "Tôi phơi quần áo trên giàn phơi đồ."
      },
      {
        "ru": "налива́ть",
        "stress": "налива́ть",
        "vi": "rót, đổ",
        "pos": "Verb",
        "aspect": "нали́ть",
        "collocation": "налива́ть + что?(С4) + куда?(С4) (đổ, rót cái gì? vào đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
        "ex_vi": "Tôi rót nước vào cốc để uống"
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
    "icon": "book-open",
    "color": "#7c3aed",
    "sub_topics": [
      "Chủ đề đồ dùng học tập"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "брать",
        "stress": "брать",
        "vi": "lấy ra, cầm lên",
        "pos": "Verb",
        "aspect": "взять",
        "ant": "убира́ть / убра́ть (cất vào)",
        "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)",
        "collocation": "брать + что?(C4) (lấy,cầm lên cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "nhấn mạnh hành động cầm lên",
        "ex": "Я беру́ пена́л и кни́гу из рюкзака́.",
        "ex_vi": "Tôi đang lấy hộp bút và sách từ trong cặp ra."
      },
      {
        "ru": "убира́ть",
        "stress": "убира́ть",
        "vi": "cất vào",
        "pos": "Verb",
        "aspect": "убра́ть",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я убира́ю пена́л и кни́гу в рюкза́к.",
        "ex_vi": "Tôi đang cất hộp bút và sách vào trong cặp."
      },
      {
        "ru": "держа́ть",
        "stress": "держа́ть",
        "vi": "cầm",
        "pos": "Verb",
        "aspect": "подержа́ть",
        "syn": "брать / взять (cầm lên) (nhấn mạnh hành động cầm lên)",
        "collocation": "держа́ть + что?(C4) (cầm, giữ cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "nhấn mạnh trạng thái cầm trên tay",
        "ex": "Я держу́ рюкза́к.",
        "ex_vi": "Tôi đang cầm cặp sách."
      },
      {
        "ru": "ста́вить",
        "stress": "ста́вить",
        "vi": "đặt đứng",
        "pos": "Verb",
        "aspect": "поста́вить",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "класть / положи́ть (đặt nằm)",
        "ex": "Я ста́влю кни́гу на по́лку.",
        "ex_vi": "Tôi đặt quyển sách (chiều đứng) lên trên kệ."
      },
      {
        "ru": "класть",
        "stress": "класть",
        "vi": "đặt nằm",
        "pos": "Verb",
        "aspect": "положи́ть",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "collocation": "класть + что? (C4) +  куда?(C4) (đặt để cái gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "ста́вить / поста́вить (đặt đứng)",
        "ex": "Я кладу́ кни́гу на стол.",
        "ex_vi": "Tôi đặt quyển sách (chiều nằm) lên trên bàn."
      },
      {
        "ru": "Колпачо́к",
        "stress": "Колпачо́к",
        "vi": "Cái nắp",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я открыва́ю колпачо́к маркёра.",
        "ex_vi": "Tôi đang mở nắp bút dạ ra."
      },
      {
        "ru": "открыва́ть",
        "stress": "открыва́ть",
        "vi": "mở ra",
        "pos": "Verb",
        "aspect": "откры́ть",
        "ant": "закрыва́ть / закры́ть (đóng vào)",
        "collocation": "открыва́ть + что?(C4) (mở cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng."
      },
      {
        "ru": "закрыва́ть",
        "stress": "закрыва́ть",
        "vi": "đóng vào",
        "pos": "Verb",
        "aspect": "закры́ть",
        "ant": "открыва́ть / откры́ть (mở ra)",
        "collocation": "закрыва́ть + что?(C4) (đóng, khóa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.",
        "ex_vi": "Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào."
      },
      {
        "ru": "включа́ть",
        "stress": "включа́ть",
        "vi": "bật lên",
        "pos": "Verb",
        "aspect": "включи́ть",
        "ant": "выключа́ть / вы́ключить (tắt đi)",
        "collocation": "включа́ть + что?(C4) (bật cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.",
        "ex_vi": "Tôi bật máy tính lên để chơi game."
      },
      {
        "ru": "выключа́ть",
        "stress": "выключа́ть",
        "vi": "tắt đi",
        "pos": "Verb",
        "aspect": "вы́ключить",
        "ant": "включа́ть / включи́ть (bật lên)",
        "collocation": "выключа́ть + что?(C4) (tắt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я выключа́ю прое́ктор.",
        "ex_vi": "Tôi tắt máy chiếu đi."
      },
      {
        "ru": "скла́дывать",
        "stress": "скла́дывать",
        "vi": "gấp lại, xếp lại",
        "pos": "Verb",
        "aspect": "сложи́ть",
        "ant": "раскла́дывать / разложи́ть (bày ra)",
        "collocation": "скла́дывать + что?(C4) (gấp, xếp cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я складыва́ю тря́пку и кладу́ её на стол.",
        "ex_vi": "Tôi gấp khăn lau bảng lại và để nó trên bàn."
      },
      {
        "ru": "протира́ть",
        "stress": "протира́ть",
        "vi": "lau chùi (loại bỏ bụi bẩn)",
        "pos": "Verb",
        "aspect": "протере́ть",
        "collocation": "протира́ть + что?(C4) (lau chùi cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)",
        "ex": "Я протира́ю стол и сту́лья.",
        "ex_vi": "Tôi đang lau chùi bàn ghế."
      },
      {
        "ru": "(Шко́льная) доска́",
        "stress": "(Шко́льная) доска́",
        "vi": "Bảng đen",
        "pos": "Noun",
        "gender": "f",
        "note": "Cách viết khác: Кла́ссная доска́",
        "ex": "Учитель пи́шет ме́лом на доске́.",
        "ex_vi": "Thầy giáo viết lên bảng (đen) bằng phấn."
      },
      {
        "ru": "Бе́лая доска́",
        "stress": "Бе́лая доска́",
        "vi": "Bảng trắng",
        "pos": "Noun",
        "gender": "f",
        "note": "Cách viết khác: Ма́ркерная доска́",
        "ex": "Учительница пи́шет маркёром на бе́лой доске́.",
        "ex_vi": "Cô giáo viết lên bảng trắng bằng bút dạ."
      },
      {
        "ru": "надева́ть",
        "stress": "надева́ть",
        "vi": "mặc vào, đeo vào, đội vào",
        "pos": "Verb",
        "aspect": "наде́ть",
        "collocation": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)",
        "ex": "Я надева́ю рюкза́к.",
        "ex_vi": "Tôi đang đeo cặp sách."
      },
      {
        "ru": "ве́шать",
        "stress": "ве́шать",
        "vi": "treo",
        "pos": "Verb",
        "aspect": "пове́сить",
        "collocation": "ве́шать + что?(C4) + куда? (C4) (treo cái gì? lên đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Учи́тель ве́шает прое́ктор на потоло́к.",
        "ex_vi": "Thầy giáo đang treo máy chiếu lên trần nhà."
      },
      {
        "ru": "точи́ть каранда́ш",
        "stress": "точи́ть каранда́ш",
        "vi": "gọt bút chì",
        "pos": "Verb",
        "aspect": "заточи́ть каранда́ш",
        "collocation": "точи́ть + что?(C4) (gọt, mài cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Точи́лка (cái gọt bút chì)",
        "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.",
        "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì."
      },
      {
        "ru": "Точи́лка",
        "stress": "Точи́лка",
        "vi": "cái gọt bút chì",
        "pos": "Noun",
        "gender": "f",
        "note": "точи́ть / заточи́ть каранда́ш (gọt bút chì)",
        "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.",
        "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì."
      },
      {
        "ru": "стира́ть",
        "stress": "стира́ть",
        "vi": "tẩy xóa",
        "pos": "Verb",
        "aspect": "стере́ть",
        "collocation": "стира́ть + что?(C4) (tẩy xóa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Ла́стик (cục tẩy)",
        "ex": "Я беру́ ла́стик, что́бы стере́ть.",
        "ex_vi": "Tôi lấy cục tẩy để tẩy."
      },
      {
        "ru": "черти́ть",
        "stress": "черти́ть",
        "vi": "kẻ",
        "pos": "Verb",
        "aspect": "начерти́ть",
        "collocation": "черти́ть + что?(C4) (kẻ cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Лине́йка (thước kẻ), Пряма́я ли́ния (đường thẳng)",
        "ex": "Я черчу́ пряму́ю ли́нию лине́йкой.",
        "ex_vi": "Tôi kẻ một đường thẳng bằng thước kẻ."
      },
      {
        "ru": "раскра́шивать",
        "stress": "раскра́шивать",
        "vi": "tô màu",
        "pos": "Verb",
        "aspect": "раскра́сить",
        "collocation": "раскра́шивать + что?(C4) (tô màu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Цветны́е карандаши́ (bút chì màu)",
        "ex": "Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.",
        "ex_vi": "Tôi tô màu bức tranh này bằng những chiếc bút chì màu."
      },
      {
        "ru": "учи́ть",
        "stress": "учи́ть",
        "vi": "học",
        "pos": "Verb",
        "aspect": "вы́учить",
        "collocation": "учи́ть + что?(C4) (học / học thuộc cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я вы́учу но́вые словари́.",
        "ex_vi": "Tôi đang học thuộc từ mới."
      },
      {
        "ru": "писа́ть",
        "stress": "писа́ть",
        "vi": "viết",
        "pos": "Verb",
        "aspect": "написа́ть",
        "collocation": "писа́ть + что?(C4) (viết cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́",
        "ex_vi": "Tôi mở quyển vở ra để viết từ mới."
      },
      {
        "ru": "рисова́ть",
        "stress": "рисова́ть",
        "vi": "vẽ",
        "pos": "Verb",
        "aspect": "нарисова́ть",
        "collocation": "рисова́ть + что?(C4) (vẽ cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я рису́ю дом на бума́ге.",
        "ex_vi": "Tôi vẽ ngôi nhà lên trên tờ giấy."
      },
      {
        "ru": "смотре́ть  слова́",
        "stress": "смотре́ть  слова́",
        "vi": "tra từ vựng",
        "pos": "Verb",
        "aspect": "посмотре́ть слова́",
        "collocation": "смотре́ть + что?(C4) (xem, tra cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.",
        "ex_vi": "Tôi lấy từ điển ở thư viện để tra từ vựng."
      },
      {
        "ru": "пока́зывать",
        "stress": "пока́зывать",
        "vi": "cho xem, trình chiếu",
        "pos": "Verb",
        "aspect": "показа́ть",
        "collocation": "пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cái gì?)",
        "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 4",
        "ex": "Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.",
        "ex_vi": "Tôi thường trình chiếu bài thuyết trình bằng máy chiếu."
      },
      {
        "ru": "игра́ть в компью́терную игру́",
        "stress": "игра́ть в компью́терную игру́",
        "vi": "chơi điện tử",
        "pos": "Verb",
        "aspect": "сыгра́ть в компью́терную игру́",
        "collocation": "игра́ть + в что?(C4) (chơi trò chơi gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Компью́терная игра́ (trò chơi điện tử trên máy tính), Моби́льная игра́ (trò chơi điện tử trên điện thoại)",
        "ex": "Я обы́чно игра́ю в моби́льные игры́ на телефо́не.",
        "ex_vi": "Tôi thường chơi điện tử trong điện thoại."
      },
      {
        "ru": "чита́ть",
        "stress": "чита́ть",
        "vi": "đọc",
        "pos": "Verb",
        "aspect": "прочита́ть",
        "collocation": "чита́ть + что?(C4) (đọc cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я открыва́ю кни́гу, что́бы чита́ть.",
        "ex_vi": "Tôi mở quyển sách ra để đọc."
      },
      {
        "ru": "Материа́л уро́ка",
        "stress": "Материа́л уро́ка",
        "vi": "bài giảng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.",
        "ex_vi": "Giảng viên thường trình chiếu bài giảng bằng máy chiếu."
      },
      {
        "ru": "Коро́бка (для ме́ла)",
        "stress": "Коро́бка (для ме́ла)",
        "vi": "hộp phấn",
        "pos": "Noun",
        "gender": "m",
        "note": "Мел (phấn)",
        "ex": "Я убира́ю мел в коро́бку для ме́ла.",
        "ex_vi": "Tôi cất phấn vào trong hộp phấn."
      },
      {
        "ru": "Рюкза́к",
        "stress": "Рюкза́к",
        "vi": "cặp sách",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.",
        "ex_vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."
      },
      {
        "ru": "Кни́га",
        "stress": "Кни́га",
        "vi": "Sách",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
        "ex_vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."
      },
      {
        "ru": "Тетра́дь",
        "stress": "Тетра́дь",
        "vi": "Vở",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.",
        "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."
      },
      {
        "ru": "Слова́рь",
        "stress": "Слова́рь",
        "vi": "Từ điển",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.",
        "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."
      },
      {
        "ru": "Бума́га",
        "stress": "Бума́га",
        "vi": "Giấy",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.",
        "ex_vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay."
      },
      {
        "ru": "Пена́л",
        "stress": "Пена́л",
        "vi": "Hộp bút",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.",
        "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."
      },
      {
        "ru": "Пена́л",
        "stress": "Пена́л",
        "vi": "Bút bi",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.",
        "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."
      },
      {
        "ru": "Каранда́ш",
        "stress": "Каранда́ш",
        "vi": "Bút chì",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.",
        "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."
      },
      {
        "ru": "Ла́стик",
        "stress": "Ла́стик",
        "vi": "Tẩy",
        "pos": "Noun",
        "gender": "m",
        "note": "стира́ть / стере́ть (tẩy xóa)",
        "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.",
        "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."
      },
      {
        "ru": "Лине́йка",
        "stress": "Лине́йка",
        "vi": "Thước kẻ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.",
        "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."
      },
      {
        "ru": "Цветны́е карандаши́",
        "stress": "Цветны́е карандаши́",
        "vi": "Bút chì màu",
        "pos": "Noun",
        "gender": "m",
        "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.",
        "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."
      },
      {
        "ru": "Маркёр",
        "stress": "Маркёр",
        "vi": "Bút dạ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть им на бе́лой доске́.",
        "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."
      },
      {
        "ru": "Тря́пка",
        "stress": "Тря́пка",
        "vi": "Khăn lau",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.",
        "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."
      },
      {
        "ru": "(Шко́льная) доска́",
        "stress": "(Шко́льная) доска́",
        "vi": "Bảng đen",
        "pos": "Noun",
        "gender": "f",
        "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.",
        "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."
      },
      {
        "ru": "Мел",
        "stress": "Мел",
        "vi": "Phấn",
        "pos": "Noun",
        "gender": "m",
        "note": "(1) Chỉ có dạng số ít.\n(2) Коро́бка (для ме́ла): hộp phấn.",
        "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.",
        "ex_vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn."
      },
      {
        "ru": "Бе́лая доска́",
        "stress": "Бе́лая доска́",
        "vi": "Bảng trắng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.",
        "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."
      },
      {
        "ru": "Губка́ (для доски́)",
        "stress": "Губка́ (для доски́)",
        "vi": "Mút lau (bảng)",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я протира́ю бе́лую доску́ губко́й.",
        "ex_vi": "Tôi đang lau bảng trắng bằng mút lau."
      },
      {
        "ru": "Маркёр",
        "stress": "Маркёр",
        "vi": "Bút dạ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.",
        "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."
      },
      {
        "ru": "Прое́ктор",
        "stress": "Прое́ктор",
        "vi": "Máy chiếu",
        "pos": "Noun",
        "gender": "m",
        "ex": "Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..",
        "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu."
      },
      {
        "ru": "Компью́тер",
        "stress": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "gender": "m",
        "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.",
        "ex_vi": "Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính."
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
    "icon": "bus",
    "color": "#dc2626",
    "sub_topics": [
      "Chủ đề phương tiện giao thông"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "Авто́бус",
        "stress": "Авто́бус",
        "vi": "Xe buýt",
        "pos": "Noun",
        "gender": "m",
        "note": "Остано́вка (điểm dừng)",
        "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."
      },
      {
        "ru": "Трамва́й",
        "stress": "Трамва́й",
        "vi": "Xe tàu điện (loại có đường ray riêng)",
        "pos": "Noun",
        "gender": "m",
        "note": "Остано́вка (điểm dừng)",
        "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng tàu điện. Mỗi ngày, tôi đều về nhà bằng xe điện."
      },
      {
        "ru": "Тролле́йбус",
        "stress": "Тролле́йбус",
        "vi": "Xe điện (loại không có đường ray riêng)",
        "pos": "Noun",
        "gender": "m",
        "note": "Остано́вка (điểm dừng)",
        "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."
      },
      {
        "ru": "Метро́",
        "stress": "Метро́",
        "vi": "Tàu điện ngầm",
        "pos": "Noun",
        "gender": "n",
        "note": "Cта́нция метро́ (ga tàu điện ngầm)",
        "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.",
        "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."
      },
      {
        "ru": "По́езд",
        "stress": "По́езд",
        "vi": "Tàu hỏa",
        "pos": "Noun",
        "gender": "m",
        "note": "Bокза́л (tàu hỏa)",
        "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.",
        "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."
      },
      {
        "ru": "Самолёт",
        "stress": "Самолёт",
        "vi": "Máy bay",
        "pos": "Noun",
        "gender": "m",
        "note": "Аэропо́рт (sân bay)",
        "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.",
        "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về."
      },
      {
        "ru": "Oстано́вка",
        "stress": "Oстано́вка",
        "vi": "Điểm dừng",
        "pos": "Noun",
        "gender": "f",
        "note": "(1) Điểm dừng cho xe buýt, xe tàu điện và xe điện. \n(2) Авто́бус (xe buýt), Трамва́й (tàu điện), Тролле́йбус (xe điện).",
        "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия.",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá."
      },
      {
        "ru": "Cта́нция метро́",
        "stress": "Cта́нция метро́",
        "vi": "Ga tàu điện ngầm",
        "pos": "Noun",
        "gender": "n",
        "note": "Метро́ (tàu điện ngầm)",
        "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты.",
        "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc."
      },
      {
        "ru": "Bокза́л",
        "stress": "Bокза́л",
        "vi": "Ga tàu hỏa",
        "pos": "Noun",
        "gender": "m",
        "note": "По́езд (tàu hỏa)",
        "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде.",
        "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa."
      },
      {
        "ru": "Аэропо́рт",
        "stress": "Аэропо́рт",
        "vi": "Sân bay",
        "pos": "Noun",
        "gender": "m",
        "note": "Самолёт (máy bay)",
        "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.",
        "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay."
      },
      {
        "ru": "Маши́на",
        "stress": "Маши́на",
        "vi": "Ô tô",
        "pos": "Noun",
        "gender": "f",
        "note": "Гара́ж (ga-ra)",
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.",
        "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô."
      },
      {
        "ru": "Мотоци́кл",
        "stress": "Мотоци́кл",
        "vi": "Xe máy",
        "pos": "Noun",
        "gender": "m",
        "note": "Гара́ж (ga-ra)",
        "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.",
        "ex_vi": "Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy."
      },
      {
        "ru": "Велосипе́д",
        "stress": "Велосипе́д",
        "vi": "Xe đạp",
        "pos": "Noun",
        "gender": "m",
        "note": "Гара́ж (ga-ra)",
        "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.",
        "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."
      },
      {
        "ru": "лете́ть - лета́ть",
        "stress": "лете́ть - лета́ть",
        "vi": "bay",
        "pos": "Verb",
        "collocation": "лете́ть / лета́ть + куда?(С4): bay đến đâu?",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)",
        "ex": "В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.",
        "ex_vi": "Tháng trước, tôi đã bay từ Kazan đến Moskva."
      },
      {
        "ru": "идти́ - ходи́ть (пешко́м)",
        "stress": "идти́ - ходи́ть (пешко́м)",
        "vi": "đi bộ",
        "pos": "Verb",
        "collocation": "идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?",
        "verb_obj": "Động từ đi với cách 4",
        "note": "(1) идти́ (1 chiều, 1 lần)\n(2) ходи́ть (2 chiều, thường xuyên)",
        "ex": "Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.",
        "ex_vi": "Sáng nay, tôi đã đi đến cửa hàng để mua thực phẩm."
      },
      {
        "ru": "е́хать - е́здить",
        "stress": "е́хать - е́здить",
        "vi": "đi (bằng phương tiện)",
        "pos": "Verb",
        "collocation": "е́хать / е́здить + куда?(С4) + на чём?(С6): đi đến đâu? bằng phương tiện nào?",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "note": "(1) е́хать (1 chiều, 1 lần)\n(2) е́здить (2 chiều, thường xuyên)",
        "ex": "Вчера́ я е́здил в банк на авто́бусе.",
        "ex_vi": "Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt."
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
    "icon": "map-pin",
    "color": "#0284c7",
    "sub_topics": [
      "Chủ đề địa điểm nơi chốn"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "изуча́ть",
        "stress": "изуча́ть",
        "vi": "nghiên cứu",
        "pos": "Verb",
        "aspect": "изучи́ть",
        "collocation": "изуча́ть + что?(C4) (nghiên cứu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я изуча́ю хи́мию в институ́те хи́мии.",
        "ex_vi": "Tôi đang nghiên cứu hóa học ở viện hóa học."
      },
      {
        "ru": "чита́ть",
        "stress": "чита́ть",
        "vi": "đọc",
        "pos": "Verb",
        "aspect": "прочита́ть",
        "collocation": "чита́ть + что?(C4) (đọc cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.",
        "ex_vi": "Tôi rất thích đọc sách và tôi đã đọc xong quyển sách này rồi."
      },
      {
        "ru": "встреча́ть",
        "stress": "встреча́ть",
        "vi": "gặp gỡ",
        "pos": "Verb",
        "aspect": "встре́тить",
        "collocation": "встреча́ть + кого?(C4) (gặp gỡ ai?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Вчера́ я встре́тил ре́ктора в столо́вой.",
        "ex_vi": "Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn."
      },
      {
        "ru": "подава́ть докуме́нты",
        "stress": "подава́ть докуме́нты",
        "vi": "nộp tài liệu",
        "pos": "Verb",
        "aspect": "пода́ть докуме́нты",
        "collocation": "подава́ть + что?(C4) + кому?(C3) (nộp, đưa cái gì? cho ai?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "ex": "Я подал докуме́нты для поступле́ния в декана́те.",
        "ex_vi": "Tôi đã nộp giấy tờ nhập học cho văn phòng khoa."
      },
      {
        "ru": "получа́ть докуме́нты",
        "stress": "получа́ть докуме́нты",
        "vi": "nhận tài liệu",
        "pos": "Verb",
        "aspect": "получи́ть докуме́нты",
        "collocation": "получа́ть + что?(C4) (nhận cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я получи́л студе́нческий биле́т в декана́те.",
        "ex_vi": "Tôi đã nhận được thẻ sinh viên ở văn phòng khoa."
      },
      {
        "ru": "жить",
        "stress": "жить",
        "vi": "sống",
        "pos": "Verb",
        "collocation": "жить + где?(C6) (sống ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я живу́ в кварти́ре.",
        "ex_vi": "Tôi đang sống ở trong căn hộ."
      },
      {
        "ru": "слу́шать ле́кцию",
        "stress": "слу́шать ле́кцию",
        "vi": "nghe bài giảng",
        "pos": "Verb",
        "aspect": "послу́шать ле́кцию",
        "collocation": "слу́шать + что?(C4) (nghe cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я слу́шаю ле́кцию на ле́кции.",
        "ex_vi": "Tôi đang nghe bài giảng ở trên giảng đường."
      },
      {
        "ru": "выступа́ть",
        "stress": "выступа́ть",
        "vi": "phát biểu; thuyết trình",
        "pos": "Verb",
        "aspect": "вы́ступить",
        "collocation": "выступа́ть + о чём?(C6) + где?(C6) (phát biểu, thuyết trình về cái gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "note": "Выступле́ние (сущ.)",
        "ex": "Сего́дня я бу́ду выступа́ть на семина́ре.",
        "ex_vi": "Hôm nay tôi sẽ thuyết trình trên seminar."
      },
      {
        "ru": "иссле́довать",
        "stress": "иссле́довать",
        "vi": "nghiên cứu",
        "pos": "Verb",
        "collocation": "иссле́довать + что?(C4) (nghiên cứu cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я иссле́дую хи́мию в лаборато́рии.",
        "ex_vi": "Tôi đang nghiên cứu hóa học ở phòng thí nghiệm."
      },
      {
        "ru": "покупа́ть лека́рства",
        "stress": "покупа́ть лека́рства",
        "vi": "mua thuốc",
        "pos": "Verb",
        "aspect": "купи́ть лека́рства",
        "collocation": "покупа́ть + что?(C4) (mua cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я купи́л лека́рство в апте́ке.",
        "ex_vi": "Tôi đã mua thuốc ở hiệu thuốc."
      },
      {
        "ru": "идти́/е́хать к врачу́",
        "stress": "идти́/е́хать к врачу́",
        "vi": "đi đến chỗ bác sĩ",
        "pos": "Verb",
        "collocation": "идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)",
        "verb_obj": "Động từ đi với cách 3",
        "ex": "Я иду́ к врачу́.",
        "ex_vi": "Tôi đang đi gặp bác sĩ."
      },
      {
        "ru": "слу́шать му́зыку",
        "stress": "слу́шать му́зыку",
        "vi": "nghe nhạc",
        "pos": "Verb",
        "aspect": "послу́шать му́зыку",
        "collocation": "слу́шать + что?(C4) (nghe cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я люблю́ слу́шать му́зыку по телефо́ну.",
        "ex_vi": "Tôi thích nghe nhạc bằng điện thoại."
      },
      {
        "ru": "смотре́ть карти́ны",
        "stress": "смотре́ть карти́ны",
        "vi": "xem tranh",
        "pos": "Verb",
        "aspect": "посмотре́ть карти́ны",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я люблю́ смотре́ть карти́ны в музе́е.",
        "ex_vi": "Tôi thích xem tranh ở bảo tàng."
      },
      {
        "ru": "смотре́ть спекта́кль",
        "stress": "смотре́ть спекта́кль",
        "vi": "xem vở kịch",
        "pos": "Verb",
        "aspect": "посмотре́ть спекта́кль",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я смотре́л э́тот спекта́кль в Большо́м теа́тре.",
        "ex_vi": "Tôi đã xem vở kịch này ở nhà hát lớn."
      },
      {
        "ru": "смотре́ть выступле́ние",
        "stress": "смотре́ть выступле́ние",
        "vi": "xem buổi biểu diễn",
        "pos": "Verb",
        "aspect": "посмотре́ть выступле́ние",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я смотре́л выступле́ние арти́стов на конце́рте.",
        "ex_vi": "Tôi đã xem buổi trình diễn của các nghệ sĩ ở buổi hòa nhạc."
      },
      {
        "ru": "смотре́ть",
        "stress": "смотре́ть",
        "vi": "xem phim",
        "pos": "Verb",
        "aspect": "посмотре́ть фильм",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я люблю́ смотре́ть фильм по телеви́зору.",
        "ex_vi": "Tôi thích xem phim trên tivi."
      },
      {
        "ru": "посеща́ть",
        "stress": "посеща́ть",
        "vi": "thăm quan",
        "pos": "Verb",
        "aspect": "посети́ть",
        "collocation": "посеща́ть + что?(C4) (thăm quan cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я люблю́ посеща́ть по Москве́.",
        "ex_vi": "Tôi thích đi thăm quan quanh Moskva."
      },
      {
        "ru": "танцева́ть",
        "stress": "танцева́ть",
        "vi": "nhảy múa",
        "pos": "Verb",
        "aspect": "потанцева́ть",
        "collocation": "танцева́ть + где?(C6) (nhảy ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я обы́чно танцу́ю на дискоте́ке.",
        "ex_vi": "Tôi thường nhảy ở vũ trường."
      },
      {
        "ru": "смотре́ть цирк",
        "stress": "смотре́ть цирк",
        "vi": "xem xiếc",
        "pos": "Verb",
        "aspect": "посмотре́ть цирк",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "Цирк (rạp xiếc)",
        "ex": "Я посмотре́л цирк в ци́рке.",
        "ex_vi": "Tôi đã xem xiếc ở rạp xiếc."
      },
      {
        "ru": "смотре́ть живо́тных",
        "stress": "смотре́ть живо́тных",
        "vi": "xem động vật",
        "pos": "Verb",
        "aspect": "посмотре́ть живо́тных",
        "collocation": "смотре́ть + кого?(C4) (xem ai/con gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я ходи́л смотре́ть живо́тных в зоопа́рке.",
        "ex_vi": "Tôi đã đi xem các con động vật ở sở thú."
      },
      {
        "ru": "смотре́ть матч",
        "stress": "смотре́ть матч",
        "vi": "xem trận đấu",
        "pos": "Verb",
        "aspect": "посмотре́ть матч",
        "collocation": "смотре́ть + что?(C4) (xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я смотре́л э́тот футбо́льный матч на стадио́не.",
        "ex_vi": "Tôi đã xem trận bóng đấu này ở sân vận động."
      },
      {
        "ru": "игра́ть / сыгра́ть",
        "stress": "игра́ть / сыгра́ть",
        "vi": "chơi",
        "pos": "Verb",
        "aspect": "сыгра́ть",
        "collocation": "игра́ть + в что?(C4) / на чём?(C6) (chơi trò gì?/ nhạc cụ gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.",
        "ex_vi": "Tôi không thích chơi piano. Tôi thích chơi bóng đá hơn."
      },
      {
        "ru": "меня́ть де́ньги",
        "stress": "меня́ть де́ньги",
        "vi": "đổi tiền",
        "pos": "Verb",
        "aspect": "поменя́ть де́ньги",
        "collocation": "меня́ть + что?(C4) + в/на что?(C4) (đổi cái gì? lấy cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я поменя́л де́ньги в ба́нке позавчера́.",
        "ex_vi": "Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia."
      },
      {
        "ru": "отправля́ть письмо́",
        "stress": "отправля́ть письмо́",
        "vi": "gửi thư",
        "pos": "Verb",
        "aspect": "отпра́вить письмо́",
        "collocation": "отправля́ть + что?(C4) + кому?(C3) (gửi cái gì? cho ai?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "ex": "Я отпра́вил письмо́ роди́телям.",
        "ex_vi": "Tôi đã gửi thư cho bố mẹ."
      },
      {
        "ru": "гуля́ть",
        "stress": "гуля́ть",
        "vi": "đi dạo",
        "pos": "Verb",
        "aspect": "погуля́ть",
        "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Я о́чень люблю́ гуля́ть по у́лице.",
        "ex_vi": "Tôi rất thích đi dạo trên phố."
      },
      {
        "ru": "есть",
        "stress": "есть",
        "vi": "ăn",
        "pos": "Verb",
        "aspect": "съесть",
        "collocation": "есть + что?(C4) (ăn cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ есть йо́гурт и шокола́д.",
        "ex_vi": "Tôi rất thích ăn sữa chua và socola."
      },
      {
        "ru": "пить",
        "stress": "пить",
        "vi": "uống",
        "pos": "Verb",
        "aspect": "вы́пить",
        "collocation": "пить + что?(C4) (uống cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я пил вино́ на вечери́нке.",
        "ex_vi": "Tôi đã uống rượu trên buổi tiệc."
      },
      {
        "ru": "рабо́тать",
        "stress": "рабо́тать",
        "vi": "làm việc",
        "pos": "Verb",
        "collocation": "рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)",
        "verb_obj": "Động từ đi với cách 5, Động từ đi với cách 6",
        "ex": "Я рабо́таю продавцо́м в магази́не оде́жды.",
        "ex_vi": "Tôi đang làm nhân viên bán hàng ở cửa hàng quần áo."
      },
      {
        "ru": "брать (маши́ну)",
        "stress": "брать (маши́ну)",
        "vi": "lấy (xe)",
        "pos": "Verb",
        "aspect": "взять (маши́ну)",
        "collocation": "брать + что?(C4) + из чего? (lấy cái gì? từ đâu?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2",
        "ex": "Я взя́л маши́ну из гаража́.",
        "ex_vi": "Tôi đã lấy xe ô tô từ trong ga-ra."
      },
      {
        "ru": "оставля́ть (маши́ну)",
        "stress": "оставля́ть (маши́ну)",
        "vi": "để (xe)",
        "pos": "Verb",
        "aspect": "оста́вить (маши́ну)",
        "collocation": "оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cái gì? ở đâu?/vào đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я оста́вил велосипе́д в гараже́.",
        "ex_vi": "Tôi đã để xe đạp ở trong ga-ra."
      },
      {
        "ru": "ждать",
        "stress": "ждать",
        "vi": "đợi",
        "pos": "Verb",
        "aspect": "подожда́ть",
        "collocation": "ждать + кого?/что?(C4) (đợi ai?/cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я жду трамва́й на остано́вке.",
        "ex_vi": "Tôi đang đợi xe điện ở trạm dừng."
      },
      {
        "ru": "лови́ть (ры́бу)",
        "stress": "лови́ть (ры́бу)",
        "vi": "bắt (cá)",
        "pos": "Verb",
        "aspect": "пойма́ть (ры́бу)",
        "collocation": "лови́ть + кого?(C4) (bắt ai/con gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.",
        "ex_vi": "Tôi rất thích câu cá. Tôi câu cá mỗi ngày ở hồ."
      },
      {
        "ru": "плыть - пла́вать",
        "stress": "плыть - пла́вать",
        "vi": "bơi",
        "pos": "Verb",
        "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)",
        "ex": "Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.",
        "ex_vi": "Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ."
      },
      {
        "ru": "смотре́ть зака́т",
        "stress": "смотре́ть зака́т",
        "vi": "ngắm hoàng hôn",
        "pos": "Verb",
        "aspect": "посмотре́ть зака́т",
        "collocation": "смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.",
        "ex_vi": "Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền."
      },
      {
        "ru": "сажа́ть цветы́",
        "stress": "сажа́ть цветы́",
        "vi": "trồng hoa",
        "pos": "Verb",
        "aspect": "посади́ть цветы́",
        "collocation": "сажа́ть + что?(C4) (trồng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.",
        "ex_vi": "Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn."
      },
      {
        "ru": "поднима́ться в го́ры",
        "stress": "поднима́ться в го́ры",
        "vi": "leo núi",
        "pos": "Verb",
        "aspect": "подня́ться в го́ры",
        "collocation": "поднима́ться + куда?(C4) (leo lên đâu?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.",
        "ex_vi": "Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần."
      },
      {
        "ru": "собира́ть грибы́",
        "stress": "собира́ть грибы́",
        "vi": "hái nấm",
        "pos": "Verb",
        "aspect": "собра́ть грибы́",
        "collocation": "собира́ть / собра́ть + что?(C4) (hái, thu thập cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.",
        "ex_vi": "Tôi rất thích hái nấm. Tôi thường hái nấm ở trong rừng."
      },
      {
        "ru": "получа́ть письмо́",
        "stress": "получа́ть письмо́",
        "vi": "nhận thư",
        "pos": "Verb",
        "aspect": "получи́ть письмо́",
        "collocation": "получа́ть + что?(C4) + от кого?(С2) (nhận cái gì? từ ai?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2",
        "ex": "Я получи́л письмо́ от мое́й сестры́.",
        "ex_vi": "Tôi đã nhận được thư từ chị gái tôi."
      },
      {
        "ru": "Шко́ла",
        "stress": "Шко́ла",
        "vi": "Trường học",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ в шко́лу. Я учу́ ру́сский язы́к в шко́ле.",
        "ex_vi": "Tôi đang đi đến trường học. Tôi học tiếng Nga ở trường học."
      },
      {
        "ru": "Акаде́мия",
        "stress": "Акаде́мия",
        "vi": "Học viện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.",
        "ex_vi": "Tôi đang đi đến học viện để học. Tôi học Toán ở học viện."
      },
      {
        "ru": "Институ́т",
        "stress": "Институ́т",
        "vi": "Viện",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ в институ́т. Я учу́ исто́рию Росси́и в институ́те.",
        "ex_vi": "Tôi đang đi đến viện để học. Tôi học Lịch sử Nga ở viện."
      },
      {
        "ru": "Университе́т",
        "stress": "Университе́т",
        "vi": "Đại học",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ университе́т. Я учу́ биоло́гию в университе́те.",
        "ex_vi": "Tôi đang đi đến đại học để học. Tôi học Sinh học ở trường đại học."
      },
      {
        "ru": "Библиоте́ка",
        "stress": "Библиоте́ка",
        "vi": "Thư viện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.",
        "ex_vi": "Tôi đang đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện."
      },
      {
        "ru": "Ка́федра",
        "stress": "Ка́федра",
        "vi": "Bộ môn",
        "pos": "Noun",
        "gender": "f",
        "ex": "Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.",
        "ex_vi": "Các giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn."
      },
      {
        "ru": "Декана́т",
        "stress": "Декана́т",
        "vi": "Văn phòng khoa",
        "pos": "Noun",
        "gender": "m",
        "ex": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.",
        "ex_vi": "Các sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."
      },
      {
        "ru": "Общежи́тие",
        "stress": "Общежи́тие",
        "vi": "Ký túc xá",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я живу́ в общежи́тии № 5.",
        "ex_vi": "Tôi đang sống ở ký túc xá số 5."
      },
      {
        "ru": "Заня́тие",
        "stress": "Заня́тие",
        "vi": "Buổi học",
        "pos": "Noun",
        "gender": "n",
        "ex": "Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.",
        "ex_vi": "Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm."
      },
      {
        "ru": "Ле́кция",
        "stress": "Ле́кция",
        "vi": "Bài giảng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.",
        "ex_vi": "Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường."
      },
      {
        "ru": "Семина́р",
        "stress": "Семина́р",
        "vi": "Buổi thảo luận",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.",
        "ex_vi": "Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar."
      },
      {
        "ru": "Лаборато́рия",
        "stress": "Лаборато́рия",
        "vi": "Phòng thí nghiệm",
        "pos": "Noun",
        "gender": "f",
        "ex": "Сего́дня я ходи́л в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.",
        "ex_vi": "Hôm nay tôi đã đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm."
      },
      {
        "ru": "Апте́ка",
        "stress": "Апте́ка",
        "vi": "Hiệu thuốc",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ в апте́ку, что́бы купи́ть лека́рства. Я ча́сто покупа́ю лека́рства в апте́ке.",
        "ex_vi": "Tôi đang đi bộ đến hiệu thuốc để mua thuốc. Tôi thường mua thuốc ở hiệu thuốc."
      },
      {
        "ru": "Поликли́ника",
        "stress": "Поликли́ника",
        "vi": "Phòng khám đa khoa",
        "pos": "Noun",
        "gender": "f",
        "ex": "Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.",
        "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."
      },
      {
        "ru": "Больни́ца",
        "stress": "Больни́ца",
        "vi": "Bệnh viện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.",
        "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."
      },
      {
        "ru": "Музе́й",
        "stress": "Музе́й",
        "vi": "Bảo tàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
        "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm."
      },
      {
        "ru": "Вы́ставка",
        "stress": "Вы́ставка",
        "vi": "Triển lãm",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
        "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm."
      },
      {
        "ru": "Теа́тр",
        "stress": "Теа́тр",
        "vi": "Nhà hát",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.",
        "ex_vi": "Tôi đang đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát."
      },
      {
        "ru": "Конце́рт",
        "stress": "Конце́рт",
        "vi": "Buổi hòa nhạc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.",
        "ex_vi": "Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc."
      },
      {
        "ru": "Кинотеа́тр",
        "stress": "Кинотеа́тр",
        "vi": "Rạp chiếu phim",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.",
        "ex_vi": "Tôi đang đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim."
      },
      {
        "ru": "Клуб",
        "stress": "Клуб",
        "vi": "Câu lạc bộ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.",
        "ex_vi": "Tôi đang đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ."
      },
      {
        "ru": "Дискоте́ка",
        "stress": "Дискоте́ка",
        "vi": "Sàn nhảy, vũ trường",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я е́ду на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.",
        "ex_vi": "Tôi đang đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường."
      },
      {
        "ru": "Цирк",
        "stress": "Цирк",
        "vi": "Rạp xiếc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.",
        "ex_vi": "Tôi đang đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc."
      },
      {
        "ru": "Зоопа́рк",
        "stress": "Зоопа́рк",
        "vi": "Sở thú",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.",
        "ex_vi": "Tôi đang đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú."
      },
      {
        "ru": "Стадио́н",
        "stress": "Стадио́н",
        "vi": "Sân vận động",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.",
        "ex_vi": "Tôi đang đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động."
      },
      {
        "ru": "Экску́рсия",
        "stress": "Экску́рсия",
        "vi": "Chuyến tham quan",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я е́ду на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.",
        "ex_vi": "Tôi đang đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan."
      },
      {
        "ru": "Магази́н",
        "stress": "Магази́н",
        "vi": "Cửa hàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.",
        "ex_vi": "Tôi đang đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng."
      },
      {
        "ru": "Банк",
        "stress": "Банк",
        "vi": "Ngân hàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.",
        "ex_vi": "Tôi đang đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng."
      },
      {
        "ru": "По́чта",
        "stress": "По́чта",
        "vi": "Bưu điện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я ходи́л на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я верну́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.",
        "ex_vi": "Tôi đã đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày nữa tôi sẽ quay lại bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện."
      },
      {
        "ru": "Парк",
        "stress": "Парк",
        "vi": "Công viên",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ в парк, что́бы погуля́ть, я ча́сто гуля́ю по па́рку.",
        "ex_vi": "Tôi đang đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên."
      },
      {
        "ru": "Кио́ск",
        "stress": "Кио́ск",
        "vi": "Quầy báo, quầy hàng nhỏ trên phố",
        "pos": "Noun",
        "gender": "m",
        "ex": "Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.",
        "ex_vi": "Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."
      },
      {
        "ru": "Рестора́н",
        "stress": "Рестора́н",
        "vi": "Nhà hàng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.",
        "ex_vi": "Tôi đang đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng."
      },
      {
        "ru": "Столо́вая",
        "stress": "Столо́вая",
        "vi": "Căng tin",
        "pos": "Noun",
        "gender": "f",
        "ex": "По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.",
        "ex_vi": "Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn."
      },
      {
        "ru": "Кафе́",
        "stress": "Кафе́",
        "vi": "Quán cà phê",
        "pos": "Noun",
        "gender": "n",
        "ex": "Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.",
        "ex_vi": "Sáng hôm nay tôi đã đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng."
      },
      {
        "ru": "Фи́рма",
        "stress": "Фи́рма",
        "vi": "Công ty",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я е́ду в фи́рму, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме ка́ждый день.",
        "ex_vi": "Tôi đang đi đến công ty để làm việc. Tôi thường làm việc ở công ty mỗi ngày."
      },
      {
        "ru": "Заво́д",
        "stress": "Заво́д",
        "vi": "Nhà máy",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.",
        "ex_vi": "Tôi đang đi đến nhà máy để làm việc. Tôi thường làm việc ở nhà máy mỗi ngày."
      },
      {
        "ru": "Фа́брика",
        "stress": "Фа́брика",
        "vi": "Xưởng sản xuất",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я е́ду на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю на фа́брике ка́ждый день.",
        "ex_vi": "Tôi đang đi đến xưởng để làm việc. Tôi thường làm việc ở xưởng mỗi ngày."
      },
      {
        "ru": "Гости́ница",
        "stress": "Гости́ница",
        "vi": "Khách sạn",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я живу́ в гости́нице.",
        "ex_vi": "Tôi đang ở khách sạn."
      },
      {
        "ru": "Гара́ж",
        "stress": "Гара́ж",
        "vi": "Ga ra",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну. Я ча́сто оставля́ть её в гара́же.",
        "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô. Tôi thường để nó ở ga-ra."
      },
      {
        "ru": "Остано́вка",
        "stress": "Остано́вка",
        "vi": "Trạm dừng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус . Я ча́сто жду́ авто́бус на остано́вке.",
        "ex_vi": "Tôi đang đi đến trạm dừng để đợi xe buýt. Tôi thường đợi xe buýt ở trạm dừng."
      },
      {
        "ru": "Ста́нция",
        "stress": "Ста́нция",
        "vi": "Ga tàu điện ngầm",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
        "ex_vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
      },
      {
        "ru": "Вокза́л",
        "stress": "Вокза́л",
        "vi": "Ga tàu hỏa",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.",
        "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."
      },
      {
        "ru": "Река́",
        "stress": "Река́",
        "vi": "Sông",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.",
        "ex_vi": "Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông."
      },
      {
        "ru": "О́зеро",
        "stress": "О́зеро",
        "vi": "Hồ",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю в о́зере.",
        "ex_vi": "Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ."
      },
      {
        "ru": "Мо́ре",
        "stress": "Мо́ре",
        "vi": "Biển",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я иду́ на мо́ре, что́бы посмотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.",
        "ex_vi": "Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển."
      },
      {
        "ru": "Сад",
        "stress": "Сад",
        "vi": "Vườn",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.",
        "ex_vi": "Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn."
      },
      {
        "ru": "Гора́",
        "stress": "Гора́",
        "vi": "Một ngọn núi",
        "pos": "Noun",
        "gender": "f",
        "note": "Го́ры (những ngọn núi)",
        "ex": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.",
        "ex_vi": "Tôi đi đến núi để leo núi. Tôi rất thích leo núi."
      },
      {
        "ru": "Лес",
        "stress": "Лес",
        "vi": "Rừng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.",
        "ex_vi": "Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng."
      },
      {
        "ru": "Oдногру́ппник",
        "stress": "Oдногру́ппник",
        "vi": "Bạn cùng lớp",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я обы́чно обе́даю с одногру́ппниками в столо́вой.",
        "ex_vi": "Tôi thường ăn trưa với bạn cùng lớp ở nhà ăn."
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
    "icon": "utensils",
    "color": "#ea580c",
    "sub_topics": [
      "Chủ đề đồ ăn - đồ uống"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "гото́вить",
        "stress": "гото́вить",
        "vi": "nấu ăn",
        "pos": "Verb",
        "aspect": "пригото́вить",
        "collocation": "гото́вить + что?(C4) + в/на чём?(С6)  (nấu cái gì? trong cái gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Я гото́влю у́жин.",
        "ex_vi": "Tôi đang nấu bữa tối."
      },
      {
        "ru": "вари́ть",
        "stress": "вари́ть",
        "vi": "luộc",
        "pos": "Verb",
        "aspect": "свари́ть",
        "collocation": "вари́ть + что? (C4) + в/на чём? (C6) (luộc cái gì? trong cái gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́.",
        "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp."
      },
      {
        "ru": "жа́рить",
        "stress": "жа́рить",
        "vi": "rán, chiên, nướng",
        "pos": "Verb",
        "aspect": "изжа́рить",
        "collocation": "жа́рить + что?(C4) + в/на чём?(С6) (chiên, rán, nướng cái gì? trong cái gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp."
      },
      {
        "ru": "переку́сывать",
        "stress": "переку́сывать",
        "vi": "ăn nhẹ",
        "pos": "Verb",
        "aspect": "перекуси́ть",
        "collocation": "переку́сывать + чем?(C5) (ăn nhẹ bằng cái gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "После за́втрака я обы́чно переку́сываю шоколáдом с йо́гуртом.",
        "ex_vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua"
      },
      {
        "ru": "мыть",
        "stress": "мыть",
        "vi": "rửa",
        "pos": "Verb",
        "aspect": "помы́ть",
        "collocation": "мыть + что?(C4) (rửa cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.",
        "ex_vi": "Tôi thường rửa hoa quả và rau ở trong bồn rửa."
      },
      {
        "ru": "чи́стить",
        "stress": "чи́стить",
        "vi": "gọt vỏ, bóc vỏ, làm sạch",
        "pos": "Verb",
        "aspect": "почи́стить",
        "collocation": "чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я уже́ почи́стил э́ти я́блоки.",
        "ex_vi": "Tôi đã gọt xong những quả táo này,"
      },
      {
        "ru": "ре́зать",
        "stress": "ре́зать",
        "vi": "cắt, thái (chung chung)",
        "pos": "Verb",
        "collocation": "ре́зать + что?(C4) (cắt cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я нареза́ю морко́вь и помидо́ры.",
        "ex_vi": "Tôi đang thái cà rốt và cà chua."
      },
      {
        "ru": "нареза́ть",
        "stress": "нареза́ть",
        "vi": "thái (thành nhiều miếng)",
        "pos": "Verb",
        "aspect": "наре́зать",
        "collocation": "нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.",
        "ex_vi": "Tôi gọt vọt quả táo và cắt thái chúng thành nhiều miếng."
      },
      {
        "ru": "разреза́ть",
        "stress": "разреза́ть",
        "vi": "bổ (làm đôi, làm 4)",
        "pos": "Verb",
        "aspect": "разре́зать",
        "collocation": "разреза́ть + что?(C4) (bổ đôi cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)",
        "ex": "Я разреза́ю арбу́з.",
        "ex_vi": "Tôi bổ đôi quả dưa hấu."
      },
      {
        "ru": "измельча́ть",
        "stress": "измельча́ть",
        "vi": "băm nhỏ, nghiền nhỏ",
        "pos": "Verb",
        "aspect": "измельчи́ть",
        "collocation": "измельча́ть + что?(С4) (băm nhỏ cái gì?)",
        "ex": "Я уже́ измельчи́л чесно́к.",
        "ex_vi": "Tôi đã băm nhuyễn tỏi rồi."
      },
      {
        "ru": "Суп",
        "stress": "Суп",
        "vi": "Súp",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.",
        "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì."
      },
      {
        "ru": "Рис",
        "stress": "Рис",
        "vi": "Cơm",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.",
        "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá."
      },
      {
        "ru": "Мя́со",
        "stress": "Мя́со",
        "vi": "Thịt",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.",
        "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, ."
      },
      {
        "ru": "Пельме́ни",
        "stress": "Пельме́ни",
        "vi": "Pelmeni",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.",
        "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì."
      },
      {
        "ru": "Ка́ша",
        "stress": "Ка́ша",
        "vi": "Cháo",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.",
        "ex_vi": "Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm."
      },
      {
        "ru": "Ры́ба",
        "stress": "Ры́ба",
        "vi": "Cá",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt."
      },
      {
        "ru": "Ку́рица",
        "stress": "Ку́рица",
        "vi": "Thịt gà",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.",
        "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad."
      },
      {
        "ru": "Яйцо́",
        "stress": "Яйцо́",
        "vi": "Trứng",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.",
        "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì."
      },
      {
        "ru": "Сала́т",
        "stress": "Сала́т",
        "vi": "Salad",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м.",
        "ex_vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng."
      },
      {
        "ru": "Шокола́д",
        "stress": "Шокола́д",
        "vi": "So cô la",
        "pos": "Noun",
        "gender": "m",
        "ex": "После за́втрака я обы́чно переку́сываю шоколáдом с йогу́ртом.",
        "ex_vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua"
      },
      {
        "ru": "Моро́женое",
        "stress": "Моро́женое",
        "vi": "Kem",
        "pos": "Noun",
        "gender": "n",
        "ex": "Ле́том я обы́чно ем моро́женое.",
        "ex_vi": "Vào mùa hè, tôi thường ăn kem."
      },
      {
        "ru": "Торт",
        "stress": "Торт",
        "vi": "Bánh kem",
        "pos": "Noun",
        "gender": "m",
        "ex": "На ка́ждый мой день рожде́ния мама покупа́ет мне торт.",
        "ex_vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi"
      },
      {
        "ru": "Йогу́рт",
        "stress": "Йогу́рт",
        "vi": "Sữa chua",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я обы́чно ем йогу́рт на полдни́к.",
        "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."
      },
      {
        "ru": "Я́блоко",
        "stress": "Я́блоко",
        "vi": "Táo",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."
      },
      {
        "ru": "Гру́ша",
        "stress": "Гру́ша",
        "vi": "Lê",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."
      },
      {
        "ru": "Манго́",
        "stress": "Манго́",
        "vi": "Xoài",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."
      },
      {
        "ru": "Апельси́н",
        "stress": "Апельси́н",
        "vi": "Cam",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."
      },
      {
        "ru": "Мандари́н",
        "stress": "Мандари́н",
        "vi": "Quýt",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."
      },
      {
        "ru": "Бана́н",
        "stress": "Бана́н",
        "vi": "Chuối",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."
      },
      {
        "ru": "Арбу́з",
        "stress": "Арбу́з",
        "vi": "Dưa hấu",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.",
        "ex_vi": "Tôi bổ quả dưa hấu để mời khách ăn."
      },
      {
        "ru": "Виногра́д",
        "stress": "Виногра́д",
        "vi": "Nho",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.",
        "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa."
      },
      {
        "ru": "Карто́фель",
        "stress": "Карто́фель",
        "vi": "Khoai tây",
        "pos": "Noun",
        "gender": "m",
        "note": "Danh từ luôn ở dạng số ít",
        "ex": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.",
        "ex_vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ."
      },
      {
        "ru": "Помидо́р",
        "stress": "Помидо́р",
        "vi": "Cà chua",
        "pos": "Noun",
        "gender": "m",
        "ex": "Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.",
        "ex_vi": "Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng."
      },
      {
        "ru": "Бата́т",
        "stress": "Бата́т",
        "vi": "Khoai lang",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я мо́ю бата́ты, пото́м кладу́ их в кастрю́лю с водо́й и варю́.",
        "ex_vi": "Tôi đang rửa khoai lang, sau đó cho chúng vào nồi cùng với nước và nấu."
      },
      {
        "ru": "Огуре́ц",
        "stress": "Огуре́ц",
        "vi": "Dưa leo",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.",
        "ex_vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi thái nhỏ chúng bằng dao."
      },
      {
        "ru": "Зелёный лук",
        "stress": "Зелёный лук",
        "vi": "Hành lá",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.",
        "ex_vi": "Tôi đang rửa sạch hành lá, sau đó thái nhỏ nó bằng dao."
      },
      {
        "ru": "Лук",
        "stress": "Лук",
        "vi": "Hành",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.",
        "ex_vi": "Tôi đang bóc vỏ hành tây, sau đó bổ và băm nhỏ nó bằng dao."
      },
      {
        "ru": "Чесно́к",
        "stress": "Чесно́к",
        "vi": "Tỏi",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с чищу́ чесно́к, пото́м раздавлива́ю и измельча́ю его́ но́жом.",
        "ex_vi": "Tôi đang bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng."
      },
      {
        "ru": "Капу́ста",
        "stress": "Капу́ста",
        "vi": "Bắp cải",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.",
        "ex_vi": "Tôi đang rửa sạch bắp cải, sau đó bổ và thái nhỏ chúng."
      },
      {
        "ru": "Ты́ква",
        "stress": "Ты́ква",
        "vi": "Bí ngô",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.",
        "ex_vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thái nhỏ chúng."
      },
      {
        "ru": "Чай",
        "stress": "Чай",
        "vi": "Trà",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я налива́ю чай в стака́н и пью.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Молоко́",
        "stress": "Молоко́",
        "vi": "Sữa",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я налива́ю молоко́ в стака́н и пью.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Ко́ка-ко́ла",
        "stress": "Ко́ка-ко́ла",
        "vi": "Coca-Cola",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я налива́ю ко́ка-ко́ла в стака́н и пью.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Пи́во",
        "stress": "Пи́во",
        "vi": "Bia",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я налива́ю пи́во в стака́н и пью пи́во.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Сок",
        "stress": "Сок",
        "vi": "Nước ép",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я налива́ю сок в стака́н и пью.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Вода́",
        "stress": "Вода́",
        "vi": "Nước",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я налива́ю вода́ в стака́н и пью.",
        "ex_vi": "Tôi rót trà vào cốc và uống."
      },
      {
        "ru": "Алкого́ль / Вино́",
        "stress": "Алкого́ль / Вино́",
        "vi": "Rượu / Vang",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я налива́ю вино́ в ча́шку и пью.",
        "ex_vi": "Tôi rót rượu vang vào chén và uống."
      },
      {
        "ru": "Кастрю́ля",
        "stress": "Кастрю́ля",
        "vi": "Nồi",
        "pos": "Noun",
        "gender": "f",
        "note": "вари́ть / свари́ть (luộc)",
        "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́.",
        "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp."
      },
      {
        "ru": "Сковорода́",
        "stress": "Сковорода́",
        "vi": "Chảo",
        "pos": "Noun",
        "gender": "f",
        "note": "жа́рить / изжа́рить (rán)",
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp."
      },
      {
        "ru": "Рисова́рка",
        "stress": "Рисова́рка",
        "vi": "Nồi cơm điện",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я сейча́с варю́ рис в рисова́рке.",
        "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện."
      },
      {
        "ru": "завтра́кать",
        "stress": "завтра́кать",
        "vi": "ăn sáng",
        "pos": "Verb",
        "aspect": "поза́втракать",
        "collocation": "за́втракать + чем?(C5) (ăn sáng bằng gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.",
        "ex_vi": "Mỗi sáng tôi đều ăn sáng bằng cháo với sữa."
      },
      {
        "ru": "обе́дать",
        "stress": "обе́дать",
        "vi": "ăn trưa",
        "pos": "Verb",
        "aspect": "пообе́дать",
        "collocation": "обе́дать + чем?(C5) (ăn trưa bằng gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Я обы́чно обе́даю су́пом с хле́бом.",
        "ex_vi": "Tôi thường ăn trưa bằng súp với bánh mì."
      },
      {
        "ru": "у́жинать",
        "stress": "у́жинать",
        "vi": "ăn tối",
        "pos": "Verb",
        "aspect": "поу́жинать",
        "collocation": "у́жинать + чем?(C5) (ăn tối bằng gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "ex": "Вчера́ я поу́жинала рисом с ры́бой.",
        "ex_vi": "Hôm qua tôi đã ăn tối bằng cơm với cá."
      },
      {
        "ru": "За́втрак",
        "stress": "За́втрак",
        "vi": "Bữa sáng",
        "pos": "Noun",
        "gender": "m",
        "note": "на за́втрак (vào bữa sáng)",
        "ex": "Я ем ка́шу на за́втрак.",
        "ex_vi": "Tôi ăn cháo vào bữa sáng."
      },
      {
        "ru": "Обе́д",
        "stress": "Обе́д",
        "vi": "Bữa trưa",
        "pos": "Noun",
        "gender": "m",
        "note": "на обе́д (vào bữa trưa)",
        "ex": "Я ем суп на обе́д.",
        "ex_vi": "Tôi ăn súp vào bữa trưa."
      },
      {
        "ru": "У́жин",
        "stress": "У́жин",
        "vi": "Bữa tối",
        "pos": "Noun",
        "gender": "m",
        "note": "на у́жин (vào bữa tối)",
        "ex": "Я ем ры́бу с рисом на у́жин.",
        "ex_vi": "Tôi ăn cá với cơm vào bữa tối."
      },
      {
        "ru": "Полдни́к",
        "stress": "Полдни́к",
        "vi": "Bữa phụ",
        "pos": "Noun",
        "gender": "m",
        "note": "на полдни́к (vào bữa phụ)",
        "ex": "Я обы́чно ем йогу́рт на полдни́к.",
        "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."
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
    "icon": "trophy",
    "color": "#16a34a",
    "sub_topics": [
      "Chủ đề thể thao - âm nhạc"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "Компью́терные и́гры",
        "stress": "Компью́терные и́гры",
        "vi": "Trò chơi điện tử",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.",
        "ex_vi": "Tôi đang chơi điện tử trên máy tính."
      },
      {
        "ru": "Шахма́ты",
        "stress": "Шахма́ты",
        "vi": "Cờ vua",
        "pos": "Noun",
        "gender": "m",
        "note": "Ша́хматный клуб (CLB cờ vua)",
        "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.",
        "ex_vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua."
      },
      {
        "ru": "Футбо́л",
        "stress": "Футбо́л",
        "vi": "Bóng đá",
        "pos": "Noun",
        "gender": "m",
        "note": "Футбо́льное по́ле (sân cỏ), Стадио́н (sân vận động)",
        "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.",
        "ex_vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ."
      },
      {
        "ru": "Хокке́й",
        "stress": "Хокке́й",
        "vi": "Khúc côn cầu",
        "pos": "Noun",
        "gender": "m",
        "note": "Хокке́йная площа́дка (sân khúc côn cầu)",
        "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
        "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."
      },
      {
        "ru": "Бадминто́н",
        "stress": "Бадминто́н",
        "vi": "Cầu lông",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.",
        "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."
      },
      {
        "ru": "Насто́льный те́ннис",
        "stress": "Насто́льный те́ннис",
        "vi": "Bóng bàn",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.",
        "ex_vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng."
      },
      {
        "ru": "Те́ннис",
        "stress": "Те́ннис",
        "vi": "Tennis",
        "pos": "Noun",
        "gender": "m",
        "note": "Те́ннисный корт (sân tennis)",
        "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.",
        "ex_vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng."
      },
      {
        "ru": "Баскетбо́л",
        "stress": "Баскетбо́л",
        "vi": "Bóng rổ",
        "pos": "Noun",
        "gender": "m",
        "note": "Баскетбо́льная площа́дка (sân bóng rổ)",
        "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.",
        "ex_vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ."
      },
      {
        "ru": "Волейбо́л",
        "stress": "Волейбо́л",
        "vi": "Bóng chuyền",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.",
        "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."
      },
      {
        "ru": "Пиани́но",
        "stress": "Пиани́но",
        "vi": "Piano",
        "pos": "Noun",
        "gender": "n",
        "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.",
        "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc."
      },
      {
        "ru": "Гита́ра",
        "stress": "Гита́ра",
        "vi": "Ghi-ta",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.",
        "ex_vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường."
      },
      {
        "ru": "занима́ться",
        "stress": "занима́ться",
        "vi": "tập luyện",
        "pos": "Verb",
        "collocation": "занима́ться + чем?(C5) (tập luyện cái gì?)",
        "verb_obj": "Động từ đi với cách 5",
        "note": "занима́ться игро́й на пиани́но.\nзанима́ться пиани́но.",
        "ex": "Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.",
        "ex_vi": "Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc."
      },
      {
        "ru": "игра́ть",
        "stress": "игра́ть",
        "vi": "chơi",
        "pos": "Verb",
        "aspect": "сыгра́ть",
        "collocation": "игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
        "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."
      },
      {
        "ru": "Компью́тер",
        "stress": "Компью́тер",
        "vi": "Máy tính",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я игра́ю в компью́терные и́гры на компью́тере.",
        "ex_vi": "Tôi chơi điện tử trên máy tính."
      },
      {
        "ru": "Телефо́н",
        "stress": "Телефо́н",
        "vi": "Điện thoại",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я игра́ю в моби́льные и́гры на телефо́не.",
        "ex_vi": "Tôi chơi điện tử trên điện thoại."
      },
      {
        "ru": "Дом",
        "stress": "Дом",
        "vi": "Nhà",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я игра́ю в ша́хматы до́ма.",
        "ex_vi": "Tôi chơi cờ vua ở nhà."
      },
      {
        "ru": "Ша́хматный клуб",
        "stress": "Ша́хматный клуб",
        "vi": "Câu lạc bộ cờ vua",
        "pos": "Noun",
        "gender": "m",
        "note": "Шахма́ты (cờ vua)",
        "ex": "Я игра́ю в ша́хматы в ша́хматном клу́бе.",
        "ex_vi": "Tôi chơi cờ vua ở câu lạc bộ cờ vua."
      },
      {
        "ru": "Футбо́льное по́ле",
        "stress": "Футбо́льное по́ле",
        "vi": "Sân cỏ",
        "pos": "Noun",
        "gender": "n",
        "note": "Футбо́л (bóng đá)",
        "ex": "Мы игра́ем в футбо́л на футбо́льном по́ле.",
        "ex_vi": "Chúng tôi chơi bóng đá trên sân cỏ."
      },
      {
        "ru": "Стадио́н",
        "stress": "Стадио́н",
        "vi": "Sân vận động",
        "pos": "Noun",
        "gender": "m",
        "note": "Футбо́л (bóng đá)",
        "ex": "Мы игра́ем в футбо́л на стадио́не.",
        "ex_vi": "Chúng tôi chơi bóng đá trên sân vận động."
      },
      {
        "ru": "Хокке́йная площа́дка",
        "stress": "Хокке́йная площа́дка",
        "vi": "Sân khúc côn cầu",
        "pos": "Noun",
        "gender": "f",
        "note": "Хокке́й (khúc côn cầu)",
        "ex": "Они́ игра́ют в хокке́й на хокке́йной площа́дке.",
        "ex_vi": "Họ chơi khúc côn cầu trên sân khúc côn cầu."
      },
      {
        "ru": "Спорти́вная площа́дка",
        "stress": "Спорти́вная площа́дка",
        "vi": "Sân thể thao đa năng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Я игра́ю в волейбо́л на спорти́вной площа́дке.",
        "ex_vi": "Tôi chơi bóng chuyền trên sân thể thao."
      },
      {
        "ru": "Спортза́л",
        "stress": "Спортза́л",
        "vi": "Phòng thể dục đa năng, phòng tập",
        "pos": "Noun",
        "gender": "m",
        "ex": "Я занима́юсь спо́ртом в спортза́ле.",
        "ex_vi": "Tôi tập thể thao trong phòng tập thể dục."
      },
      {
        "ru": "Те́ннисный корт",
        "stress": "Те́ннисный корт",
        "vi": "Sân tennis",
        "pos": "Noun",
        "gender": "m",
        "note": "Те́ннис (tennis)",
        "ex": "Мы игра́ем в те́ннис на те́ннисном ко́рте.",
        "ex_vi": "Chúng tôi chơi tennis trên sân tennis."
      },
      {
        "ru": "Баскетбо́льная площа́дка",
        "stress": "Баскетбо́льная площа́дка",
        "vi": "Sân bóng rổ",
        "pos": "Noun",
        "gender": "f",
        "note": "Баскетбо́л (bóng rổ)",
        "ex": "Они́ игра́ют в баскетбо́л на баскетбо́льной площа́дке.",
        "ex_vi": "Họ chơi bóng rổ trên sân bóng rổ."
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
    "icon": "paw",
    "color": "#9333ea",
    "sub_topics": [
      "Chủ đề con vật"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "есть",
        "stress": "есть",
        "vi": "ăn",
        "pos": "Verb",
        "aspect": "съесть",
        "collocation": "есть + что?(C4) (ăn cái gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Медве́дь ест ры́бу.",
        "ex_vi": "Con gấu ăn cá."
      },
      {
        "ru": "лежа́ть",
        "stress": "лежа́ть",
        "vi": "nằm",
        "pos": "Verb",
        "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Ко́шка лежи́т на дива́не.",
        "ex_vi": "Con mèo nằm trên ghế sô pha."
      },
      {
        "ru": "стоя́ть",
        "stress": "стоя́ть",
        "vi": "đứng",
        "pos": "Verb",
        "aspect": "постоя́ть",
        "collocation": "стоя́ть + где?(C6) (đứng ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Соба́ка стои́т у дере́ва.",
        "ex_vi": "Con chó đứng bên cạnh cái cây."
      },
      {
        "ru": "ложи́ться спать",
        "stress": "ложи́ться спать",
        "vi": "đi ngủ",
        "pos": "Verb",
        "aspect": "лечь спать",
        "collocation": "ложи́ться спать + где?(С6) (ngủ ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Ве́чером медве́дь ложи́тся спать.",
        "ex_vi": "Buổi tối, con gấu đi ngủ."
      },
      {
        "ru": "игра́ть",
        "stress": "игра́ть",
        "vi": "chơI",
        "pos": "Verb",
        "aspect": "сыгра́ть",
        "collocation": "игра́ть + в что?(C4)/на чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "ex": "Кот игра́ет с клубко́м.",
        "ex_vi": "Con mèo chơi với cuộn len."
      },
      {
        "ru": "бежа́ть - бе́гать",
        "stress": "бежа́ть - бе́гать",
        "vi": "chạy",
        "pos": "Verb",
        "collocation": "(1) бежа́ть + куда? (C4) (chạy đến đâu?)\n(2) бе́гать + по чему?(C3) (chạy quanh đâu?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "note": "(1) бежа́ть (1 hướng cụ thể)\n(2) бе́гать (lặp lại hướng)",
        "ex": "(1) Тигр бежи́т за добы́чей.\n(2) Тигр бе́гает по лесу́.",
        "ex_vi": "(1) Con hổ đang chạy đuổi theo con mồi.\n(2) Con hổ chạy quanh rừng."
      },
      {
        "ru": "гуля́ть",
        "stress": "гуля́ть",
        "vi": "đi dạo",
        "pos": "Verb",
        "aspect": "погуля́ть",
        "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)",
        "verb_obj": "Động từ đi với cách 6",
        "ex": "Медве́дь гуля́ет по лесу́.",
        "ex_vi": "Con gấu đi dạo trong rừng."
      },
      {
        "ru": "охо́титься",
        "stress": "охо́титься",
        "vi": "săn mồi",
        "pos": "Verb",
        "aspect": "поохо́титься",
        "collocation": "охо́титься + на кого?(C4) (săn bắt con gì?)",
        "verb_obj": "Động từ đi với cách 4",
        "ex": "Тигр охо́тится в лесу́.",
        "ex_vi": "Con hổ săn mồi trong rừng."
      },
      {
        "ru": "Трава́",
        "stress": "Трава́",
        "vi": "Cỏ",
        "pos": "Noun",
        "gender": "f",
        "ex": "Коро́ва ест траву́ на по́ле",
        "ex_vi": "Con bò ăn cỏ trên cánh đồng."
      },
      {
        "ru": "Кот",
        "stress": "Кот",
        "vi": "Mèo đực",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Ко́шка",
        "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
        "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."
      },
      {
        "ru": "Соба́ка",
        "stress": "Соба́ка",
        "vi": "Chó",
        "pos": "Noun",
        "gender": "f",
        "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
        "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."
      },
      {
        "ru": "Свинья́",
        "stress": "Свинья́",
        "vi": "Lợn",
        "pos": "Noun",
        "gender": "f",
        "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."
      },
      {
        "ru": "Ку́рица",
        "stress": "Ку́рица",
        "vi": "Gà",
        "pos": "Noun",
        "gender": "f",
        "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.",
        "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."
      },
      {
        "ru": "Коро́ва",
        "stress": "Коро́ва",
        "vi": "Bò",
        "pos": "Noun",
        "gender": "f",
        "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
        "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."
      },
      {
        "ru": "Медве́дь",
        "stress": "Медве́дь",
        "vi": "Gấu đực",
        "pos": "Noun",
        "gender": "m/f",
        "feminine": "Медве́дица",
        "ex": "Медве́дь ест, а пото́м спит.",
        "ex_vi": "Gấu đang ăn, sau đó đi ngủ."
      },
      {
        "ru": "Тигр",
        "stress": "Тигр",
        "vi": "Hổ",
        "pos": "Noun",
        "gender": "m",
        "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
        "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."
      },
      {
        "ru": "Лев",
        "stress": "Лев",
        "vi": "Sư tử",
        "pos": "Noun",
        "gender": "m",
        "ex": "Лев гуля́ет по лесу́.",
        "ex_vi": "Sư rử đang đi dạo quanh khu rừng."
      },
      {
        "ru": "Пти́ца",
        "stress": "Пти́ца",
        "vi": "Chim",
        "pos": "Noun",
        "gender": "f",
        "ex": "Пти́ца лети́т по не́бу.",
        "ex_vi": "Con chim đang bay trên bầu trời."
      },
      {
        "ru": "Попуга́й",
        "stress": "Попуга́й",
        "vi": "Vẹt",
        "pos": "Noun",
        "gender": "m",
        "ex": "Попуга́й стои́т на ве́тке.",
        "ex_vi": "Con vẹt đang đứng trên cành cây."
      },
      {
        "ru": "Ры́ба",
        "stress": "Ры́ба",
        "vi": "Cá",
        "pos": "Noun",
        "gender": "f",
        "ex": "Ры́ба пла́вает в реке́.",
        "ex_vi": "Con cá đang bơi ở sông."
      },
      {
        "ru": "Дом",
        "stress": "Дом",
        "vi": "Nhà",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
        "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."
      },
      {
        "ru": "Ко́мната",
        "stress": "Ко́мната",
        "vi": "Phòng",
        "pos": "Noun",
        "gender": "f",
        "ex": "Ко́шка спит в ко́мнате.",
        "ex_vi": "Con mèo ngủ trong phòng."
      },
      {
        "ru": "Парк",
        "stress": "Парк",
        "vi": "Công viên",
        "pos": "Noun",
        "gender": "m",
        "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
        "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."
      },
      {
        "ru": "Фе́рма",
        "stress": "Фе́рма",
        "vi": "Trang trại",
        "pos": "Noun",
        "gender": "f",
        "note": "Nghĩa khác: công ty",
        "ex": "Cви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."
      },
      {
        "ru": "Хлев",
        "stress": "Хлев",
        "vi": "Chuồng gia súc",
        "pos": "Noun",
        "gender": "m",
        "ex": "Cви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."
      },
      {
        "ru": "Куря́тник",
        "stress": "Куря́тник",
        "vi": "Chuồng gà",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ку́рицы спя́т в куря́тнике.",
        "ex_vi": "Những con gà đang ngủ trong chuồng."
      },
      {
        "ru": "Сад",
        "stress": "Сад",
        "vi": "Vườn",
        "pos": "Noun",
        "gender": "m",
        "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.",
        "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."
      },
      {
        "ru": "По́ле",
        "stress": "По́ле",
        "vi": "Cánh đồng",
        "pos": "Noun",
        "gender": "n",
        "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
        "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."
      },
      {
        "ru": "Лес",
        "stress": "Лес",
        "vi": "Rừng",
        "pos": "Noun",
        "gender": "m",
        "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
        "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."
      },
      {
        "ru": "Не́бо",
        "stress": "Не́бо",
        "vi": "Bầu trời",
        "pos": "Noun",
        "gender": "n",
        "ex": "Пти́ца лета́ет по не́бу.",
        "ex_vi": "Con chim bay lượn trên bầu trời."
      },
      {
        "ru": "Ве́тка",
        "stress": "Ве́тка",
        "vi": "Cành cây",
        "pos": "Noun",
        "gender": "f",
        "ex": "Попуга́й лети́т к ве́тке.",
        "ex_vi": "Con vẹt đang bay về phía cành cây."
      },
      {
        "ru": "О́зеро",
        "stress": "О́зеро",
        "vi": "Hồ",
        "pos": "Noun",
        "gender": "n",
        "ex": "Ры́бы пла́вают в о́зере.",
        "ex_vi": "Những con cá bơi trong hồ."
      },
      {
        "ru": "Река́",
        "stress": "Река́",
        "vi": "Sông",
        "pos": "Noun",
        "gender": "f",
        "ex": "Ры́бы пла́вают в реке́.",
        "ex_vi": "Con cá bơi trong sông."
      },
      {
        "ru": "Мо́ре",
        "stress": "Мо́ре",
        "vi": "Biển",
        "pos": "Noun",
        "gender": "n",
        "ex": "Ры́бы пла́вают в мо́ре.",
        "ex_vi": "Những con cá đang bơi dưới biển."
      },
      {
        "ru": "плыть - пла́вать",
        "stress": "плыть - пла́вать",
        "vi": "bơi",
        "pos": "Verb",
        "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)",
        "ex": "(1) Я плыву́ к берегу́.\n(2) Я уме́ю пла́вать.",
        "ex_vi": "(1) Tôi đang bơi về phía bờ.\n(2) Tôi biết bơi."
      },
      {
        "ru": "лете́ть - лета́ть",
        "stress": "лете́ть - лета́ть",
        "vi": "bay",
        "pos": "Verb",
        "collocation": "(1) лете́ть + куда? (C4) (bay đến đâu?)\n(2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)",
        "ex": "(1) Пти́ца лети́т к ве́тку.\n(2) Пти́ца лета́ет по не́бу.",
        "ex_vi": "(1) Con chim đang bay đến cành cây.\n(2) Con chim bay lượn trên bầu trời."
      },
      {
        "ru": "Клубо́к",
        "stress": "Клубо́к",
        "vi": "Cuộn len",
        "pos": "Noun",
        "gender": "m",
        "ex": "Кот игра́ет с клубко́м.",
        "ex_vi": "Con mèo chơi với cuộn len."
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
    "icon": "user",
    "color": "#e11d48",
    "sub_topics": [
      "Chủ đề bộ phận cơ thể người"
    ],
    "is_system": true,
    "is_pro_only": false,
    "words": [
      {
        "ru": "большо́й",
        "stress": "большо́й",
        "vi": "to",
        "pos": "Adj",
        "ant": "ма́ленький (nhỏ)",
        "ex": "У меня́ больша́я голова́.",
        "ex_vi": "Tôi có cái đầu to."
      },
      {
        "ru": "ма́ленький",
        "stress": "ма́ленький",
        "vi": "nhỏ",
        "pos": "Adj",
        "ant": "большо́й (to)",
        "ex": "У него́ ма́ленькое краси́вое лицо́.",
        "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."
      },
      {
        "ru": "дли́нный",
        "stress": "дли́нный",
        "vi": "dài",
        "pos": "Adj",
        "ant": "коро́ткий (ngắn)",
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ex_vi": "Cô ấy có mái tóc dài dày."
      },
      {
        "ru": "коро́ткий",
        "stress": "коро́ткий",
        "vi": "ngắn",
        "pos": "Adj",
        "ant": "дли́нный (dài)",
        "ex": "У неё коро́ткие во́лосы.",
        "ex_vi": "Cô ấy có mái tóc ngắn."
      },
      {
        "ru": "густо́й",
        "stress": "густо́й",
        "vi": "dày (số lượng nhiều)",
        "pos": "Adj",
        "ant": "ре́дкий (thưa)",
        "note": "nhấn mạnh mật độ, số lượng của vật",
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ex_vi": "Cô ấy có mái tóc dài dày."
      },
      {
        "ru": "ре́дкий",
        "stress": "ре́дкий",
        "vi": "thưa",
        "pos": "Adj",
        "ant": "густо́й (dày)",
        "note": "nhấn mạnh mật độ, số lượng của vật",
        "ex": "У него́ ре́дкие во́лосы.",
        "ex_vi": "Anh ấy có mái tóc thưa."
      },
      {
        "ru": "высо́кий",
        "stress": "высо́кий",
        "vi": "cao",
        "pos": "Adj",
        "ant": "ни́зкий (thấp)",
        "ex": "У него́ высо́кий лоб.",
        "ex_vi": "Anh ấy có vầng trán cao."
      },
      {
        "ru": "ни́зкий",
        "stress": "ни́зкий",
        "vi": "thấp",
        "pos": "Adj",
        "ant": "высо́кий (cao)",
        "ex": "У него́ ни́зкий лоб.",
        "ex_vi": "Anh ấy có vầng trán thấp."
      },
      {
        "ru": "прямо́й",
        "stress": "прямо́й",
        "vi": "thẳng",
        "pos": "Adj",
        "ex": "У него́ высо́кий прямо́й нос.",
        "ex_vi": "Anh ấy có mũi cao thẳng."
      },
      {
        "ru": "румя́ный",
        "stress": "румя́ный",
        "vi": "hồng hào",
        "pos": "Adj",
        "ex": "У неё румя́ные щёки.",
        "ex_vi": "Cô ấy có đôi má hồng hào."
      },
      {
        "ru": "краси́вый",
        "stress": "краси́вый",
        "vi": "đẹp",
        "pos": "Adj",
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp."
      },
      {
        "ru": "широ́кий",
        "stress": "широ́кий",
        "vi": "rộng",
        "pos": "Adj",
        "ant": "у́зкий (hẹp)",
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng."
      },
      {
        "ru": "то́лстый",
        "stress": "то́лстый",
        "vi": "dày (cấu trúc dày)",
        "pos": "Adj",
        "ant": "то́нкий (mỏng)",
        "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật",
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng."
      },
      {
        "ru": "то́нкий",
        "stress": "то́нкий",
        "vi": "mỏng",
        "pos": "Adj",
        "ant": "то́лстый (dày)",
        "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật",
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp."
      },
      {
        "ru": "здоро́вый",
        "stress": "здоро́вый",
        "vi": "khỏe mạnh",
        "pos": "Adj",
        "ex": "У неё бе́лые здоро́вые зу́бы.",
        "ex_vi": "Cô ấy có hàm răng trắng khỏe."
      },
      {
        "ru": "си́льный",
        "stress": "си́льный",
        "vi": "mạnh",
        "pos": "Adj",
        "ex": "У него́ здоро́вые и си́льные но́ги.",
        "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"
      },
      {
        "ru": "Голова́",
        "stress": "Голова́",
        "vi": "Đầu",
        "pos": "Noun",
        "gender": "f",
        "ex": "У меня́ больша́я голова́.",
        "ex_vi": "Tôi có cái đầu to."
      },
      {
        "ru": "Во́лосы",
        "stress": "Во́лосы",
        "vi": "Tóc",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ex_vi": "Cô ấy có mái tóc dài dày."
      },
      {
        "ru": "Лицо́",
        "stress": "Лицо́",
        "vi": "Mặt",
        "pos": "Noun",
        "gender": "n",
        "ex": "У него́ ма́ленькое краси́вое лицо́.",
        "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."
      },
      {
        "ru": "Лоб",
        "stress": "Лоб",
        "vi": "Trán",
        "pos": "Noun",
        "gender": "m",
        "ex": "У него́ высо́кий лоб.",
        "ex_vi": "Anh ấy có vầng trán cao."
      },
      {
        "ru": "Бро́ви",
        "stress": "Бро́ви",
        "vi": "Hai hàng lông mày",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё гу́стые бро́ви.",
        "ex_vi": "Cô ấy có hàng lông mày dày."
      },
      {
        "ru": "Глаза́",
        "stress": "Глаза́",
        "vi": "Đôi mắt",
        "pos": "Noun",
        "gender": "f",
        "ex": "У неё больши́е краси́вые глаза́.",
        "ex_vi": "Cô ấy có đôi mắt to đẹp."
      },
      {
        "ru": "Но́с",
        "stress": "Но́с",
        "vi": "Mũi",
        "pos": "Noun",
        "gender": "m",
        "ex": "У него́ высо́кий прямо́й нос.",
        "ex_vi": "Anh ấy có chiếc mũi cao thẳng."
      },
      {
        "ru": "Щёки",
        "stress": "Щёки",
        "vi": "Đôi má",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё румя́ные щёки.",
        "ex_vi": "Cô ấy có đôi má hồng hào."
      },
      {
        "ru": "Рот",
        "stress": "Рот",
        "vi": "Khuôn miệng",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё ма́ленький рот.",
        "ex_vi": "Cô ấy có khuôn miệng nhỏ."
      },
      {
        "ru": "Гу́бы",
        "stress": "Гу́бы",
        "vi": "Đôi môi",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp."
      },
      {
        "ru": "Зу́бы",
        "stress": "Зу́бы",
        "vi": "Hàm răng",
        "pos": "Noun",
        "gender": "m",
        "ex": "У неё бе́лые здоро́вые зу́бы.",
        "ex_vi": "Cô ấy có hàm răng trắng khỏe."
      },
      {
        "ru": "У́ши",
        "stress": "У́ши",
        "vi": "Đôi tai",
        "pos": "Noun",
        "gender": "m",
        "ex": "У него́ ма́ленькие у́ши.",
        "ex_vi": "Anh ấy có đôi tai nhỏ."
      },
      {
        "ru": "Руки́",
        "stress": "Руки́",
        "vi": "Đôi tay",
        "pos": "Noun",
        "gender": "m",
        "note": "ле́вая рука́ >< пра́вая рука́ (tay trái >< tay phải)",
        "ex": "У неё здоро́вые и си́льные ру́ки.",
        "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."
      },
      {
        "ru": "Но́ги",
        "stress": "Но́ги",
        "vi": "Đôi chân",
        "pos": "Noun",
        "gender": "m",
        "note": "ле́вая нога́ >< пра́вая нога́ (chân trái >< chân phải)",
        "ex": "У него́ здоро́вые и си́льные но́ги.",
        "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"
      },
      {
        "ru": "Грудь",
        "stress": "Грудь",
        "vi": "Ngực",
        "pos": "Noun",
        "gender": "m",
        "ex": "У меня́ боли́т грудь.",
        "ex_vi": "Tôi đang đau ngực."
      },
      {
        "ru": "Живо́т",
        "stress": "Живо́т",
        "vi": "Bụng",
        "pos": "Noun",
        "gender": "m",
        "ex": "У меня́ о́чень боли́т живо́т.",
        "ex_vi": "Tôi đang rất đau bụng"
      },
      {
        "ru": "Спина́",
        "stress": "Спина́",
        "vi": "Lưng",
        "pos": "Noun",
        "gender": "f",
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng."
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
      "part_type": "Part 1",
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
      "part_type": "Part 1",
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
      "part_type": "Part 2",
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
      "part_type": "Part 2",
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
      "part_type": "Part 3",
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
      "part_type": "Part 3",
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
      "part_type": "Part 4",
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 15,
    "end_sec": 195,
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 200,
    "end_sec": 380,
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 390,
    "end_sec": 570,
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 580,
    "end_sec": 760,
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 960,
    "end_sec": 1150,
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
    "youtube_id": "e6lFvAQp0LE",
    "start_sec": 770,
    "end_sec": 950,
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
      "task_type": "summary",
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
      "task_type": "summary",
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
      "task_type": "essay",
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
      "task_type": "essay",
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
      "task_type": "picture_desc",
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
      "task_type": "summary",
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
      "task_type": "essay",
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
      "task_type": "essay",
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
    "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
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
    "intro": "Chủ đề «Nghề nghiệp và việc làm» trong tiếng Nga gắn liền với các câu hỏi cửa miệng như «Кто вы по профессии?» hay «Кем вы работаете?». Để giao tiếp tự nhiên trong môi trường học tập và công sở tại Nga, bạn cần thành thạo quy tắc biến đổi Cách 5 (Творительный падеж) khi nói về nghề nghiệp và biết cách gọi tên các chức danh chuyên môn chuẩn xác.",
    "actionChains": [
      {
        "subTopic": "Chủ đề nghề nghiệp",
        "items": [
          {
            "target": "Студе́нт — студе́нтка",
            "target_vi": "Sinh viên nam - sinh viên nữ",
            "action": "учи́ться",
            "action_vi": "học",
            "place": "в университе́те; в акаде́мии; в институ́те",
            "place_vi": "ở trường đại học; ở học viện; ở viện",
            "ex": "Студе́нт у́чится в университе́те.",
            "ex_vi": "Sinh viên đang học ở trường đại học."
          },
          {
            "target": "Преподава́тель — преподава́тельница",
            "target_vi": "Giảng viên nam - Giảng viên nữ",
            "action": "преподава́ть",
            "action_vi": "dạy học",
            "place": "в университе́те; в акаде́мии; в институ́те",
            "place_vi": "ở trường đại học; ở học viện; ở viện",
            "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
            "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."
          },
          {
            "target": "Шко́льник — шко́льница",
            "target_vi": "Học sinh nam - Học sinh nữ",
            "action": "учи́ться",
            "action_vi": "học",
            "place": "в шко́ле",
            "place_vi": "ở trường học",
            "ex": "Шко́льница у́чится в шко́ле.",
            "ex_vi": "Học sinh đang học ở trường học."
          },
          {
            "target": "Учи́тель — учи́тельница",
            "target_vi": "Thầy giáo - Cô giáo",
            "action": "преподава́ть",
            "action_vi": "dạy học",
            "place": "в шко́ле",
            "place_vi": "ở trường học",
            "ex": "Учи́тель преподаёт в шко́ле.",
            "ex_vi": "Giáo viên đang dạy học ở trường học."
          },
          {
            "target": "Инжене́р",
            "target_vi": "Kỹ sư",
            "action": "ремонти́ровать маши́ну",
            "action_vi": "sửa chữa máy móc",
            "place": "на заво́де",
            "place_vi": "ở nhà máy",
            "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
            "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."
          },
          {
            "target": "Хи́мик",
            "target_vi": "Nhà hóa học",
            "action": "изуча́ть хи́мию",
            "action_vi": "nghiên cứu hóa học",
            "place": "в лаборато́рии",
            "place_vi": "ở phòng thí nghiệm",
            "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
            "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."
          },
          {
            "target": "Био́лог",
            "target_vi": "Nhà sinh vật học",
            "action": "изуча́ть расте́ния",
            "action_vi": "nghiên cứu thực vật",
            "place": "в лаборато́рии",
            "place_vi": "ở phòng thí nghiệm",
            "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
            "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."
          },
          {
            "target": "Программи́ст",
            "target_vi": "Lập trình viên",
            "action": "программи́ровать",
            "action_vi": "lập trình",
            "place": "на компью́тере - в о́фисе",
            "place_vi": "trên máy tính - ở văn phòng",
            "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
            "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."
          },
          {
            "target": "Архите́ктор",
            "target_vi": "Kiến trúc sư",
            "action": "проекти́ровать зда́ния",
            "action_vi": "thiết kế tòa nhà",
            "place": "в о́фисе",
            "place_vi": "ở văn phòng",
            "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
            "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."
          },
          {
            "target": "Экономи́ст",
            "target_vi": "Nhà kinh tế học/chuyên viên kinh tế",
            "action": "- собира́ть да́нные\n- анализи́ровать да́нные",
            "action_vi": "thu thập và phân tích dữ liệu",
            "place": "в о́фисе",
            "place_vi": "ở văn phòng",
            "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
            "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."
          },
          {
            "target": "Врач",
            "target_vi": "Bác sĩ",
            "action": "- осма́тривать\n- лечи́ть",
            "action_vi": "- khám bệnh\n- chữa bệnh",
            "place": "в больни́це; в поликли́нике",
            "place_vi": "ở bệnh viện; ở phòng khám",
            "ex": "Врач осма́тривает и ле́чит пациéнтов в больни́це.",
            "ex_vi": "Bác sĩ đаng khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."
          },
          {
            "target": "Фе́рмер",
            "target_vi": "Nông dân",
            "action": "- выра́щивать о́вощи\n- разводи́ть скот",
            "action_vi": "- trồng rau\n- chăn nuôi gia súc",
            "place": "на фе́рме",
            "place_vi": "ở trang trại",
            "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
            "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."
          },
          {
            "target": "Домохозя́йка",
            "target_vi": "Nội trợ",
            "action": "- гото́вить еду́\n- убира́ть дом",
            "action_vi": "- nấu ăn\n- dọn dẹp nhà cửa",
            "place": "до́ма",
            "place_vi": "ở nhà",
            "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
            "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."
          },
          {
            "target": "Дире́ктор",
            "target_vi": "Giám đốc/ Hiệu trưởng",
            "action": "руководи́ть",
            "action_vi": "lãnh đạo",
            "place": "в фи́рме; в шко́ле; в университе́те; в институ́те",
            "place_vi": "ở công ty; ở trường học; ở đại học; ở học viện",
            "ex": "Дире́ктор руководи́т рабо́той в фи́рме.",
            "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty."
          },
          {
            "target": "Юри́ст",
            "target_vi": "Luật sư",
            "action": "консульти́ровать клие́нта",
            "action_vi": "tư vấn khách hàng",
            "place": "в фи́рме; в о́фисе",
            "place_vi": "ở công ty; ở văn phòng",
            "ex": "Юри́ст консульти́рует клие́нта в фи́рме.",
            "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty."
          },
          {
            "target": "Бизнесме́н",
            "target_vi": "Doanh nhân",
            "action": "встреча́ться с партнёрами",
            "action_vi": "gặp gỡ đối tác",
            "place": "в фи́рме",
            "place_vi": "ở công ty",
            "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
            "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."
          },
          {
            "target": "Служа́щий",
            "target_vi": "Nhân viên/ Công chức",
            "action": "работа́ть с докуме́нтами",
            "action_vi": "làm việc với giấy tờ",
            "place": "в о́фисе",
            "place_vi": "ở cơ quan/ văn phòng",
            "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
            "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."
          },
          {
            "target": "Продаве́ц",
            "target_vi": "Người bán hàng nam",
            "action": "продава́ть",
            "action_vi": "bán hàng",
            "place": "в магази́не",
            "place_vi": "ở cửa hàng",
            "ex": "Продаве́ц продаёт това́ры в магази́не.",
            "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."
          },
          {
            "target": "Журнали́ст — журнали́стка",
            "target_vi": "Nhà báo nam - Nhà báo nữ",
            "action": "писа́ть ста́тьи",
            "action_vi": "viết báo",
            "place": "в редаќции",
            "place_vi": "ở tòa soạn",
            "ex": "Журнали́ст пи́шет ста́тьи в редаќции.",
            "ex_vi": "Nhà báo đang viết báo ở tòa soạn."
          },
          {
            "target": "Поэ́т",
            "target_vi": "Nhà thơ",
            "action": "писа́ть стихи́",
            "action_vi": "viết thơ",
            "place": "до́ма",
            "place_vi": "ở nhà",
            "ex": "Поэ́т пи́шет стихи́ до́ма.",
            "ex_vi": "Nhà thơ đang viết thơ ở nhà."
          },
          {
            "target": "Худо́жник — худо́жница",
            "target_vi": "Họa sĩ nam - Họa sĩ nữ",
            "action": "рисова́ть  карти́ны",
            "action_vi": "vẽ tranh",
            "place": "в мастерско́й",
            "place_vi": "ở xưởng vẽ",
            "ex": "Худо́жница рису́ет карти́ны в мастерско́й.",
            "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."
          },
          {
            "target": "Арти́ст — арти́стка",
            "target_vi": "Nghệ sĩ nam - Nghệ sĩ nữ",
            "action": "выступа́ть",
            "action_vi": "biểu diễn",
            "place": "в теа́тре; на конце́рте",
            "place_vi": "ở nhà hát; trên buổi hòa nhà (concert)",
            "ex": "Арти́ст выступа́ет в теа́тре.",
            "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."
          },
          {
            "target": "Перево́дчик — перево́дчица",
            "target_vi": "Phiên dịch viên nam - Phiên dịch viên nữ",
            "action": "переводи́ть те́ксты",
            "action_vi": "dịch văn bản",
            "place": "в о́фисе",
            "place_vi": "ở văn phòng",
            "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
            "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng."
          },
          {
            "target": "Моделье́р",
            "target_vi": "Nhà thiết kế thời trang",
            "action": "создава́ть оде́жду",
            "action_vi": "thiết kế quần áo",
            "place": "в ателье́",
            "place_vi": "ở xưởng may/ nhà may",
            "ex": "Моделье́р создаёт оде́жды в ателье́.",
            "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."
          },
          {
            "target": "Музыка́нт",
            "target_vi": "Nhạc công",
            "action": "игра́ть",
            "action_vi": "chơi",
            "place": "в теа́тре; на конце́рте",
            "place_vi": "ở nhà hát; trên buổi hòa nhà (concert)",
            "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
            "ex_vi": "Nhạc công đang chơi piano trên buổi concert."
          },
          {
            "target": "Спортсме́н — спортсме́нка",
            "target_vi": "Vận động viên nam - Vận động viên nữ",
            "action": "занима́ться",
            "action_vi": "luyện tập",
            "place": "в спортза́ле",
            "place_vi": "ở phòng tập thể thao",
            "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
            "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Артём",
        "role": "Kỹ sư công nghệ",
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
        "role": "Kỹ sư công nghệ",
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
        "content": "• Cấu trúc: «работать + кем?» (Cách 5 - Творительный падеж).\n• Giống đực: инжене́р → инжене́ром, преподава́тель → преподава́телем.\n• Giống cái: врач → врачо́м (dùng chung), студе́нтка → студе́нткой."
      },
      {
        "title": "2. Phân biệt «Кто вы по профессии?» và «Кем вы работаете?»",
        "content": "• «Кто вы по профессии?» hỏi về ngành nghề được đào tạo chuyên môn: «По профессии я переводчик».\n• «Кем вы работаете?» hỏi về công việc thực tế hiện tại: «Сейчас я работаю менеджером»."
      }
    ],
    "culturalTip": "Tại Nga, khi xưng hô với thầy cô giáo, bác sĩ, giáo sư hoặc đối tác làm việc, bạn luôn phải dùng Tên gọi + Tên đệm cha (Имя и Отчество), ví dụ: Иван Сергеевич, Елена Васильевна, kết hợp với đại từ tôn kính «Вы»."
  },
  "quan_ao": {
    "intro": "Nước Nga trải qua 4 mùa rõ rệt với mùa đông tuyết trắng âm độ và mùa hè ấm áp. Nắm vững từ vựng trang phục theo từng điều kiện thời tiết, cùng các động từ hành động như mặc vào (надевать), cởi ra (снимать), giặt giũ (стирать) và mua sắm (покупать) là chìa khóa sinh tồn hàng ngày.",
    "actionChains": [
      {
        "subTopic": "chủ đề quần áo giày dép - Học theo thời tiết",
        "items": [
          {
            "target": "LẠNH",
            "target_vi": "LẠNH",
            "action": "- носи́ть: mặc, đeo, đội,... \n(wear) (dùng khi nói về thói quen, phong cách ăn mặc)\n\n\n- надева́ть/наде́ть: mặc vào, đội vào,... \n(put on) (dùng khi nói về hành động mặc)\n\n\n- снима́ть/снять: cở ra, tháo ra",
            "action_vi": "LẠNH",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Пальто́",
            "target_vi": "Áo măng tô",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку.\n- Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф.",
            "ex_vi": "- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác\n- Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn."
          },
          {
            "target": "Ку́ртка",
            "target_vi": "Áo khoác",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Сви́тер",
            "target_vi": "Áo len chui đầu",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Брю́ки",
            "target_vi": "Quần dài",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Ша́пка",
            "target_vi": "Mũ len",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Шарф",
            "target_vi": "Khăn quàng",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Перча́тки",
            "target_vi": "Găng tay",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Носки́",
            "target_vi": "Tất",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Боти́нки",
            "target_vi": "Giày bốt thấp cổ",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Сапоги́",
            "target_vi": "Giày bốt cao cổ",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "NÓNG",
            "target_vi": "NÓNG",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Футбо́лка",
            "target_vi": "Áo phông",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки.\n- Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии.",
            "ex_vi": "- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao.\n- Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal."
          },
          {
            "target": "Шо́рты",
            "target_vi": "Quần đùi",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Джи́нсы",
            "target_vi": "Quần jean",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Пла́тье",
            "target_vi": "Đầm (váy liền)",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Ю́бка",
            "target_vi": "Chân váy",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Руба́шка",
            "target_vi": "Áo sơ mi",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Санда́лии",
            "target_vi": "Dép sandal",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Кроссо́вки",
            "target_vi": "Giày thể thao",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "УХОД ЗА ОДЕЖДОЙ (GIẶT GIŨ VÀ CẤT QUẦN ÁO)",
        "items": [
          {
            "target": "quần áo bẩn",
            "target_vi": "Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я посушу́ её на суши́лке (для белья́). Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф.",
            "action": "гря́зная оде́жда",
            "action_vi": "quần áo bẩn",
            "place": "",
            "place_vi": "",
            "ex": "Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.",
            "ex_vi": "Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ."
          },
          {
            "target": "giặt bằng máy giặt",
            "target_vi": "giặt bằng máy giặt",
            "action": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не",
            "action_vi": "giặt bằng máy giặt",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "phơi (quần áo) trên giàn phơi đồ",
            "target_vi": "phơi (quần áo) trên giàn phơi đồ",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "gấp (quần áo)",
            "target_vi": "gấp (quần áo)",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "treo (quần áo) lên móc",
            "target_vi": "treo (quần áo) lên móc",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "cất (quần áo) vào tủ",
            "target_vi": "cất (quần áo) vào tủ",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "ПОКУПКА ОДЕЖДЫ И ОБУВИ (MUA QUẦN ÁO GIÀY DÉP)",
        "items": [
          {
            "target": "mua (quần áo)",
            "target_vi": "Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы заплати́ть. Я заплачу́ продавцу́ ба́нковской ка́ртой.",
            "action": "покупа́ть / купи́ть (оде́жду)",
            "action_vi": "mua (quần áo)",
            "place": "",
            "place_vi": "",
            "ex": "Tôi muốn mua quần áo, vì vậy tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi sẽ thanh toán cho người bán hàng bằng thẻ.",
            "ex_vi": "Tôi muốn mua quần áo, vì vậy tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi sẽ thanh toán cho người bán hàng bằng thẻ."
          },
          {
            "target": "đi đến cửa hàng quần áo",
            "target_vi": "đi đến cửa hàng quần áo",
            "action": "идти́ / е́хать магази́н оде́жды",
            "action_vi": "đi đến cửa hàng quần áo",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "chọn (quần áo)",
            "target_vi": "chọn (quần áo)",
            "action": "выбира́ть / вы́брать (оде́жду)",
            "action_vi": "chọn (quần áo)",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "thử (quần áo) trong phòng thay đồ",
            "target_vi": "thử (quần áo) trong phòng thay đồ",
            "action": "примеря́ть / приме́рить (оде́жду) в приме́рочной",
            "action_vi": "thử (quần áo) trong phòng thay đồ",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "(quần áo) vừa với tôi",
            "target_vi": "(quần áo) vừa với tôi",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "đi đến quầy bán hàng",
            "target_vi": "đi đến quầy bán hàng",
            "action": "идти́ на ка́ссу",
            "action_vi": "đi đến quầy bán hàng",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "thanh toán cho người bán hàng",
            "target_vi": "thanh toán cho người bán hàng",
            "action": "плати́ть / заплати́ть продавцу́",
            "action_vi": "thanh toán cho người bán hàng",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "thanh toán bằng thẻ/ tiền mặt",
            "target_vi": "thanh toán bằng thẻ/ tiền mặt",
            "action": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными",
            "action_vi": "thanh toán bằng thẻ/ tiền mặt",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi",
        "items": [
          {
            "target": "- стирать что? в чём? : giặt cái gì? bằng cái gì?\n- что? подходить кому?/чему? : cái gì? vừa, phù hợp với ai?/cái gì? \n- сначала - затем - наконец : đầu tiên - sau đó - cuối cùng",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Денис",
        "role": "Sinh viên",
        "ru": "Маша, на улице сегодня минус двадцать градусов! Что ты наденешь?",
        "vi": "Masha ơi, ngoài trời hôm nay âm hai mươi độ đấy! Cậu sẽ mặc gì?"
      },
      {
        "speaker": "Маша",
        "role": "Sinh viên",
        "ru": "Я обязательно надену тёплый свитер, зимнее пальто, шапку и шарф. Без перчаток на улицу лучше не выходить!",
        "vi": "Mình nhất định sẽ mặc áo len ấm, áo măng tô mùa đông, mũ len và quàng khăn. Không có găng tay thì tốt nhất không nên ra ngoài!"
      },
      {
        "speaker": "Денис",
        "role": "Sinh viên",
        "ru": "А какие ботинки ты носишь зимой?",
        "vi": "Thế cậu đi bốt loại nào vào mùa đông?"
      },
      {
        "speaker": "Маша",
        "role": "Sinh viên",
        "ru": "Я ношу высокие тёплые сапоги на толстой подошве, чтобы не скользить на льду.",
        "vi": "Mình đi bốt cao cổ ấm có đế dày để không bị trượt trên băng tuyết."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt «носить» (wear) và «надевать / одевать» (put on)",
        "content": "• «носить + что (C4)»: chỉ thói quen, phong cách ăn mặc thường xuyên («Зимой я ношу тёплую куртку»).\n• «надевать / надеть + что (C4)»: hành động xỏ/mặc đồ lên người mình («Я надеваю шапку»).\n• «одевать / одеть + кого (C4)»: mặc đồ cho người khác («Мама одевает ребёнка»)."
      },
      {
        "title": "2. Cấu trúc «подходить кому/чему» (Vừa vặn, hợp với ai)",
        "content": "• Cấu trúc: «Одежда подходит + кому? (Cách 3)».\n• Ví dụ: «Это пальто мне очень подходит» (Chiếc áo măng tô này rất vừa và hợp với tôi)."
      },
      {
        "title": "3. Trật tự chuỗi hành động «сначала — затем — наконец»",
        "content": "• Сначала я выбираю одежду, затем примеряю в примерочной, а наконец плачу на кассе банковской картой."
      }
    ],
    "culturalTip": "Khi bước vào nhà, trường học, bảo tàng hay nhà hát tại Nga vào mùa lạnh, bạn bắt buộc phải cởi áo khoác ngoài (пальто/куртка) và gửi tại phòng gửi đồ (гардероб). Đi cả áo khoác to vào phòng học hay phòng khách bị xem là thiếu lịch sự."
  },
  "do_dung_gia_dinh": {
    "intro": "Căn hộ và phòng ở ký túc xá tại Nga được bài trí tiện nghi với các không gian sinh hoạt rõ ràng: phòng khách (гостиная), phòng bếp (кухня), phòng ngủ (спальня), phòng tắm (ванная) và phòng giặt (прачечная). Làm chủ hệ thống đồ dùng gia đình và các động từ thao tác đặt đứng (ставить), đặt nằm (класть), lau chùi (протирать/вытирать) giúp bạn tự lập trong cuộc sống hàng ngày.",
    "actionChains": [
      {
        "subTopic": "Trong phòng khách",
        "items": [
          {
            "target": "Дива́н",
            "target_vi": "Ghế sopha",
            "action": "ста́вить",
            "action_vi": "đặt để",
            "place": "сиде́ть, лежа́ть, ложи́ться спать, отдыха́ть",
            "place_vi": "ngồi, nằm, ngủ, nghỉ ngơi",
            "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.",
            "ex_vi": "Tôi đặt sopha ở phòng khách để ngồi và xem phim"
          },
          {
            "target": "Стол",
            "target_vi": "Bàn",
            "action": "ста́вить, протира́ть-вытира́ть",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "place": "рабо́тать, есть, ста́вить-класть (ве́щи)",
            "place_vi": "làm việc, ăn, đặt đứng-đặt nằm (đồ đạc)",
            "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.",
            "ex_vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó."
          },
          {
            "target": "Ва́за",
            "target_vi": "Bình hoa",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- мыть >< вытира́ть,\n- протира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/đặt nằm,\n- rửa >< lau khô (loại bỏ nước),\n- lau chùi (loại bỏ bụi bẩn)",
            "place": "украша́ть, ста́вить цветы́",
            "place_vi": "trang trí, cắm hoa",
            "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.",
            "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó."
          },
          {
            "target": "Ту́мба",
            "target_vi": "Tủ/kệ nhỏ có ngăn kéo",
            "action": "ста́вить, протира́ть",
            "action_vi": "đặt để, lau chùi (loại bỏ bụi bẩn)",
            "place": "храни́ть (ве́щи), ста́вить-класть (ве́щи)",
            "place_vi": "cất đồ, đặt đứng-đặt nằm (đồ đạc)",
            "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.",
            "ex_vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó."
          },
          {
            "target": "Телеви́зор",
            "target_vi": "Ti vi",
            "action": "- ста́вить, \n- включа́ть >< выключа́ть",
            "action_vi": "- đặt để, \n- bật >< tắt",
            "place": "смотре́ть",
            "place_vi": "xem",
            "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.",
            "ex_vi": "Tôi đặt tivi lên trên kệ, sau đó bật nó lên để xem phim."
          },
          {
            "target": "Цвето́чный горшо́к",
            "target_vi": "Chậu hoa/ Chậu cây",
            "action": "ста́вить",
            "action_vi": "đặt để",
            "place": "сажа́ть цветы́, украша́ть",
            "place_vi": "trồng hoa, trang trí",
            "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.",
            "ex_vi": "Tôi đặt chậu hoa ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách."
          },
          {
            "target": "Ковёр",
            "target_vi": "Thảm",
            "action": "- брать >< убира́ть, \n- стели́ть >< свора́чивать, \n- стира́ть >< суши́ть",
            "action_vi": "- lấy ra >< cất vào,\n- trải ra >< cuộn vào,\n- giặt >< phơi khô",
            "place": "сиде́ть, украша́ть",
            "place_vi": "ngồi, trang trí",
            "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.",
            "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."
          },
          {
            "target": "Дверь",
            "target_vi": "Cửa ra vào",
            "action": "открыва́ть >< закрыва́ть",
            "action_vi": "mở >< đóng",
            "place": "- войти́ - вы́йти\n- входи́ть - выходи́ть",
            "place_vi": "- vào\n- ra",
            "ex": "Я открыва́ю дверь, что́бы войти́ в дом.",
            "ex_vi": "Tôi mở cửa để đi vào trong nhà."
          },
          {
            "target": "Окно́",
            "target_vi": "Cửa sổ",
            "action": "открыва́ть >< закрыва́ть",
            "action_vi": "mở >< đóng",
            "place": "прове́тривать ко́мнату",
            "place_vi": "thông gió phòng",
            "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
            "ex_vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng."
          }
        ]
      },
      {
        "subTopic": "Trong phòng bếp",
        "items": [
          {
            "target": "Стол",
            "target_vi": "Bàn",
            "action": "ста́вить, протира́ть-вытира́ть",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "place": "рабо́тать, есть, ста́вить-класть (ве́щи)",
            "place_vi": "làm việc, ăn, đặt đứng-đặt nằm đồ đạc",
            "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним (3).",
            "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."
          },
          {
            "target": "(Rу́хонный) шкаф",
            "target_vi": "Tủ bếp",
            "action": "- ста́вить, ве́шать, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- đặt đứng, treo, \n- mở >< đóng",
            "place": "храни́ть посу́ду",
            "place_vi": "đựng bát đĩa",
            "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.",
            "ex_vi": "Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại."
          },
          {
            "target": "Холоди́льник",
            "target_vi": "Tủ lạnh",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- đặt đứng, \n- mở >< đóng",
            "place": "храни́ть проду́кты",
            "place_vi": "bảo quản thực phẩm",
            "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.",
            "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."
          },
          {
            "target": "Плита́",
            "target_vi": "Bếp",
            "action": "- ста́вить, \n- включа́ть >< выключа́ть, \n- протира́ть-вытира́ть",
            "action_vi": "- đặt đứng, \n- bật >< tắt, \n- lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "place": "гото́вить, вари́ть, жа́рить",
            "place_vi": "nấu, luộc, rán",
            "ex": "Я варю́ суп на плите́.",
            "ex_vi": "Tôi nấu súp trên bếp."
          },
          {
            "target": "Кастрю́ля",
            "target_vi": "Nồi",
            "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать",
            "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên",
            "place": "вари́ть, гото́вить",
            "place_vi": "luộc, nấu",
            "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.",
            "ex_vi": "Tôi đặt nồi lên bếp để nấu súp."
          },
          {
            "target": "Сковорода́",
            "target_vi": "Chảo",
            "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать",
            "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên",
            "place": "жа́рить, гото́вить",
            "place_vi": "rán, nấu",
            "ex": "Когда́ я пожа́рю мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.",
            "ex_vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."
          },
          {
            "target": "Нож",
            "target_vi": "Dao",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "place": "чи́стить, ре́зать, нареза́ть, разреза́ть (1)",
            "place_vi": "gọt, cắt, thái, bổ",
            "ex": "Я ре́жу хлеб ножо́м, нареза́ю мя́со, чи́щу я́блоки и разреза́ю арбу́з ножо́м.",
            "ex_vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao."
          },
          {
            "target": "Ло́жка",
            "target_vi": "Thìa",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "place": "есть",
            "place_vi": "ăn",
            "ex": "Я ем суп ло́жкой.",
            "ex_vi": "Tôi ăn súp bằng thìa."
          },
          {
            "target": "Ви́лка",
            "target_vi": "Dĩa",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "place": "есть",
            "place_vi": "ăn",
            "ex": "Я ем мя́со ви́лкой.",
            "ex_vi": "Tôi ăn thịt bằng dĩa."
          },
          {
            "target": "Таре́лка",
            "target_vi": "Đĩa",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "place": "есть, класть (блю́до)",
            "place_vi": "ăn, đặt (đồ ăn) lên",
            "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.",
            "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên."
          },
          {
            "target": "Ми́ска",
            "target_vi": "Bát",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "place": "есть",
            "place_vi": "ăn",
            "ex": "Я налива́ю суп в ми́ску.",
            "ex_vi": "Tôi đổ súp vào trong bát."
          },
          {
            "target": "Ча́шка",
            "target_vi": "Tách, chén",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "place": "пить",
            "place_vi": "uống",
            "ex": "Я налива́ю чай в ча́шку, что́бы пить.",
            "ex_vi": "Tôi rót trà vào tách để uống"
          },
          {
            "target": "Стака́н",
            "target_vi": "Cốc",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "place": "пить",
            "place_vi": "uống",
            "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
            "ex_vi": "Tôi rót nước vào cốc để uống"
          },
          {
            "target": "(Раздело́чная) доска́",
            "target_vi": "Thớt",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "place": "реза́ть, нареза́ть",
            "place_vi": "thái, bổ",
            "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.",
            "ex_vi": "Tôi đặt thớt lên bàn để thái rau ở trên nó."
          },
          {
            "target": "Ра́ковина",
            "target_vi": "Bồn rửa",
            "action": "открыва́ть кран >< закрыва́ть кран, вытира́ть",
            "action_vi": "mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước)",
            "place": "мыть (посу́ду...)",
            "place_vi": "rửa (bát đĩa,...)",
            "ex": "Я мо́ю посу́ду в ра́ковине.",
            "ex_vi": "Tôi rửa bát đĩa trong bồn rửa."
          },
          {
            "target": "Корзи́на",
            "target_vi": "Giỏ",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить",
            "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt để",
            "place": "храни́ть (проду́кты...)",
            "place_vi": "đựng (thực phẩm,...)",
            "ex": "Я храню́ проду́кты в корзи́не.",
            "ex_vi": "Tôi đựng thực phẩm trong giỏ."
          }
        ]
      },
      {
        "subTopic": "Trong phòng ngủ",
        "items": [
          {
            "target": "Крова́ть",
            "target_vi": "Giường",
            "action": "ста́вить, протира́ть",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)",
            "place": "ложи́ться спать, лежа́ть",
            "place_vi": "ngủ, nằm",
            "ex": "Я ложу́сь спать на крова́ти.",
            "ex_vi": "Tôi ngủ trên giường."
          },
          {
            "target": "Шкаф",
            "target_vi": "Tủ quần áo",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "place": "убира́ть оде́жду, ве́шать оде́жду",
            "place_vi": "cất quần áo, treo quần áo",
            "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).",
            "ex_vi": "Tôi mở tủ quần áo ra để cất quần áo vào (trong nó)."
          },
          {
            "target": "Компью́тер",
            "target_vi": "Máy tính",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "place": "рабо́тать, учи́ться, игра́ть в компью́терные и́гры",
            "place_vi": "làm việc, học, chơi điện tử",
            "ex": "Я включа́ю компью́тер, что́бы рабо́тать.",
            "ex_vi": "Tôi bật máy tính lên để làm việc."
          },
          {
            "target": "Ла́мпа",
            "target_vi": "Đèn ngủ, đèn học",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "place": "чита́ть, рабо́тать",
            "place_vi": "đọc, làm việc",
            "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.",
            "ex_vi": "Tôi bật đèn lên để đọc sách."
          },
          {
            "target": "Окно́",
            "target_vi": "Cửa sổ",
            "action": "- открыва́ть >< закрыва́ть, \n- протира́ть",
            "action_vi": "- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "place": "прове́тривать ко́мнату",
            "place_vi": "thông gió phòng",
            "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
            "ex_vi": "Tôi mở cửa sổ vào mỗi sáng để thông gió phòng."
          },
          {
            "target": "(Письме́нный) стол",
            "target_vi": "Bàn làm việc",
            "action": "ста́вить, протира́ть - вытира́ть",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "place": "учи́ться, писа́ть, рабо́тать",
            "place_vi": "học, viết, làm việc",
            "ex": "Я учу́сь за (письме́нным) столо́м.",
            "ex_vi": "Tôi học tại bàn."
          },
          {
            "target": "Стул",
            "target_vi": "Ghế",
            "action": "ста́вить, протира́ть",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)",
            "place": "сидéть",
            "place_vi": "ngồi",
            "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.",
            "ex_vi": "Tôi đang ngồi vào ghế để làm việc."
          }
        ]
      },
      {
        "subTopic": "Trong phòng tắm",
        "items": [
          {
            "target": "Зе́ркало",
            "target_vi": "Gương",
            "action": "веша́ть, протира́ть - вытира́ть",
            "action_vi": "treo, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "place": "смотре́ть (в зе́ркало)",
            "place_vi": "soi gương",
            "ex": "Я ве́шаю зе́ркало на сте́ну, что́бы смотре́ть (в него́).",
            "ex_vi": "Tôi treo gương lên tường để soi gương."
          },
          {
            "target": "По́лка",
            "target_vi": "Kệ",
            "action": "ве́шать",
            "action_vi": "treo",
            "place": "ста́вить - класть (ве́щи)",
            "place_vi": "đặt đứng - đặt nằm (đồ đạc)",
            "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.",
            "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó)."
          },
          {
            "target": "Ва́нна",
            "target_vi": "Bồn tắm",
            "action": "ста́вить, чи́стить",
            "action_vi": "đặt đứng, cọ rửa",
            "place": "принима́ть (ванну)",
            "place_vi": "tằm (bồn)",
            "ex": "Я принима́ю ва́нну.",
            "ex_vi": "Tôi đang tắm."
          },
          {
            "target": "Крючо́к",
            "target_vi": "Móc treo",
            "action": "ве́шать",
            "action_vi": "treo",
            "place": "ве́шать полоте́нце, ве́шать оде́жду",
            "place_vi": "treo khăn, treo quần áo",
            "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.",
            "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó)."
          },
          {
            "target": "Полоте́нце",
            "target_vi": "Khăn tắm",
            "action": "ве́шать, брать, складыва́ть",
            "action_vi": "treo, lấy, gấp",
            "place": "вытира́ться, вытира́ть лицо́",
            "place_vi": "lau người, lau mặt",
            "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.",
            "ex_vi": "Tôi lấy khăn từ móc treo để lau người."
          },
          {
            "target": "Унита́з",
            "target_vi": "Bồn cầu",
            "action": "ста́вить, чи́стить",
            "action_vi": "đặt đứng, cọ rửa",
            "place": "ходи́ть в туале́т",
            "place_vi": "đi vệ sinh",
            "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.",
            "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."
          },
          {
            "target": "Ра́ковина",
            "target_vi": "Bồn rửa",
            "action": "ста́вить, чи́стить",
            "action_vi": "đặt đứng, cọ rửa",
            "place": "мыть лицо́, мыть ру́ки",
            "place_vi": "rửa mặt, rửa tay",
            "ex": "Я мо́ю лицо́ у ра́ковины (4)",
            "ex_vi": "Tôi rửa mặt ở bồn rửa."
          }
        ]
      },
      {
        "subTopic": "Trong phòng giặt",
        "items": [
          {
            "target": "Стира́льная маши́на",
            "target_vi": "Máy giặt",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- включа́ть >< выключа́ть",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- bật >< tắt",
            "place": "стира́ть оде́жду",
            "place_vi": "giặt quần áo",
            "ex": "Я стира́ю оде́жду в стира́льной маши́не.",
            "ex_vi": "Tôi giặt quần áo trong máy giặt."
          },
          {
            "target": "Утю́г",
            "target_vi": "Bàn là",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить\n- включа́ть >< выключа́ть",
            "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt đứng,\n- bật lên >< tắt đi",
            "place": "гла́дить оде́жду",
            "place_vi": "là quần áo",
            "ex": "Я гла́жу руба́шку утюго́м.",
            "ex_vi": "Tôi là áo sơ mi bằng bàn là."
          },
          {
            "target": "Глади́льная доска́",
            "target_vi": "Cầu là (bàn để là quần áo)",
            "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать",
            "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại",
            "place": "гла́дить оде́жду",
            "place_vi": "là quần áo",
            "ex": "Я гла́жу оде́жду на глади́льной доске́.",
            "ex_vi": "Tôi là quần áo trên cầu là."
          },
          {
            "target": "Cуши́лка",
            "target_vi": "Giàn phơi",
            "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать",
            "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại",
            "place": "суши́ть оде́жду",
            "place_vi": "phơi khô quần áo",
            "ex": "Я сушу́ оде́жду на суши́лке.",
            "ex_vi": "Tôi phơi quần áo trên giàn phơi đồ."
          }
        ]
      },
      {
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi",
        "items": [
          {
            "target": "",
            "target_vi": "",
            "action": "(1)\n- чи́стить: gọt vỏ, bóc vỏ.\n- ре́зать, нареза́ть, разреза́ть: cắt, thái.\n+ ре́зать: cắt, thái (chung chung).\n+ нареза́ть: cắt, thái thành nhiều phần nhỏ.\n+ разреза́ть: cắt, thái (làm đôi, làm 4 phần)",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi",
        "items": [
          {
            "target": "",
            "target_vi": "",
            "action": "(3) Tại sao là \"за ним\" mà không phải \"в нём\"?\n- Vì,\n+ Thứ nhất: \"за ним\" đang chỉ \"за столо́м\". Vì tránh lại lại từ \"столо́м\"(bàn), nên ta dùng từ \"ним\"(nó).\n+ Thứ hai, ta có cấu trúc: \n        есть / сидеть / работать + за + чем?\ncó nghĩa là: ăn/ngồi/làm việc ở đâu --> diễn tả trạng thái ngồi quanh, ngồi gần vật nào đó.\n+ Ví dụ: сидеть за столом = ngồi vào bàn (ở phía bàn, quanh bàn) (nhấn mạnh sự liên quan).\n\n- Mặt khác, nếu dùng \"в нём\" (nhấn mạnh vị trí) dịch là: trong bàn, nhưng ta không thể nói là ăn trong bàn được.\n\n- Vì vậy, nếu nói ăn ở bàn, học ở bàn, ngồi vào ghế, ngồi vào bàn,.. ta dùng \"за столо́м/сту́лом\".\n\n \n(4) Tại sao không dùng \"в рако́вине\" mà dùng \"у рако́вины\".\n- Ta có: \"в рако́вине\" nghĩa là \"ở trong bồn rửa\" (nhấn mạnh ở bên trong bồn rửa). Còn \"у рако́вины\" nghĩa là \"bên cạnh bồn rửa\" (nhấn mạnh việc ở gần bồn rửa). \n- Mà: không có ai rửa mặt trong bồn rửa, mà chỉ nói là đứng cạnh bồn rửa để rửa mặt mà thôi.  \n--> Vì vậy, trong trường hợp này ta dùng \"у рако́вины\".",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Иван",
        "role": "Bạn cùng phòng",
        "ru": "Оля, куда мы поставим этот новый журнальный стол?",
        "vi": "Olya ơi, chúng ta sẽ kê chiếc bàn trà mới này ở đâu?"
      },
      {
        "speaker": "Оля",
        "role": "Bạn cùng phòng",
        "ru": "Давай поставим его в гостиной рядом с диваном, а на него поставим красивую вазу с цветами.",
        "vi": "Chúng mình hãy đặt nó ở phòng khách cạnh ghế sô-pha nhé, còn bên trên thì đặt một bình hoa đẹp."
      },
      {
        "speaker": "Иван",
        "role": "Bạn cùng phòng",
        "ru": "Отличная идея! А кастрюли и сковороды уже убраны в кухонный шкаф?",
        "vi": "Ý hay đấy! Còn xoong nồi và chảo đã cất hết vào tủ bếp chưa?"
      },
      {
        "speaker": "Оля",
        "role": "Bạn cùng phòng",
        "ru": "Да, я всё вымыла, вытерла полотенцем и аккуратно сложила на полку.",
        "vi": "Rồi, mình đã rửa sạch tất cả, lau khô bằng khăn và xếp gọn gàng lên giá rồi."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ tư thế: «ставить / положить» (Hành động) vs «стоять / лежать» (Trạng thái)",
        "content": "• Đặt đứng: «ставить / поставить что (C4) куда (C4)» → «Я ставлю вазу на стол».\n• Đặt nằm: «класть / положить что (C4) куда (C4)» → «Я кладу нож на доску»."
      },
      {
        "title": "2. Quy tắc dùng «за столом» thay vì «в столе»",
        "content": "• Dùng «сидеть / есть / работать за столом» (ngồi bên bàn, làm việc quanh bàn).\n• Tuyệt đối không dùng «в столе», vì «в столе» là bên trong hộc bàn!"
      },
      {
        "title": "3. Phân biệt «у раковины» và «в раковине»",
        "content": "• «у раковины»: đứng cạnh bồn rửa (ví dụ: «Я мою лицо у раковины»).\n• «в раковине»: bên trong lòng bồn rửa (ví dụ: «Грязная посуда лежит в раковине»)."
      }
    ],
    "culturalTip": "Người Nga luôn tháo giày ngoài cửa ra vào và đổi sang đi dép đi trong nhà (тапочки). Khi đến chơi nhà người Nga, chủ nhà sẽ luôn chuẩn bị sẵn một đôi тапочки sạch cho bạn."
  },
  "do_dung_hoc_tap": {
    "intro": "Môi trường đại học tại Nga đòi hỏi sinh viên chuẩn bị chu đáo đồ dùng học tập từ sách giáo trình, vở ghi chép, bút bi, bút chì cho đến các thiết bị giảng đường như máy chiếu (проектор) và bảng trắng (белая доска). Thành thạo tên gọi và các cụm từ hành động giúp bạn tự tin hòa nhập vào các giờ giảng đường (лекция) và thảo luận (семинар).",
    "actionChains": [
      {
        "subTopic": "Nhóm sách và tài liệu",
        "items": [
          {
            "target": "Рюкза́к",
            "target_vi": "Cặp sách",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть, \n- надева́ть, веша́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào, \n- đeo lên, treo lên",
            "place": "храни́ть (шко́льные принадле́жности)",
            "place_vi": "cất giữ (đồ dùng học tập)",
            "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.",
            "ex_vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."
          },
          {
            "target": "Кни́га",
            "target_vi": "Sách",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "place": "чита́ть, учи́ть",
            "place_vi": "đọc, học",
            "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
            "ex_vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."
          },
          {
            "target": "Тетра́дь",
            "target_vi": "Vở",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "place": "писа́ть",
            "place_vi": "viết, làm bài tập",
            "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.",
            "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."
          },
          {
            "target": "Слова́рь",
            "target_vi": "Từ điển",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "place": "смотре́ть слова́",
            "place_vi": "tra từ vựng",
            "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.",
            "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."
          },
          {
            "target": "Бума́га",
            "target_vi": "Giấy",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- складыва́ть, реза́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- gấp, cắt",
            "place": "писа́ть, рисова́ть",
            "place_vi": "viết, vẽ",
            "ex": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик.",
            "ex_vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay."
          },
          {
            "target": "Пена́л",
            "target_vi": "Hộp bút",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "place": "храни́ть (шко́льные принадле́жности)",
            "place_vi": "cất giữ (đồ dùng học tập)",
            "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.",
            "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."
          },
          {
            "target": "Пена́л",
            "target_vi": "Bút bi",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "place": "писа́ть",
            "place_vi": "viết",
            "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.",
            "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."
          },
          {
            "target": "Каранда́ш - Точи́лка",
            "target_vi": "Bút chì - gọt bút chì",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "place": "писа́ть, рисова́ть - точи́ть каранда́ш",
            "place_vi": "viết, vẽ; gọt bút chì",
            "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.",
            "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."
          },
          {
            "target": "Ла́стик",
            "target_vi": "Tẩy",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "place": "стира́ть",
            "place_vi": "tẩy xóa",
            "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.",
            "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."
          },
          {
            "target": "Лине́йка",
            "target_vi": "Thước kẻ",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "place": "черти́ть",
            "place_vi": "kẻ",
            "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.",
            "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."
          },
          {
            "target": "Цветны́е карандаши́",
            "target_vi": "Bút chì màu",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "place": "раскра́шивать",
            "place_vi": "tô màu",
            "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.",
            "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."
          },
          {
            "target": "Маркёр",
            "target_vi": "Bút dạ",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "place": "писа́ть",
            "place_vi": "viết",
            "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть на бе́лой доске́ им.",
            "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."
          },
          {
            "target": "Тря́пка",
            "target_vi": "Khăn lau",
            "action": "- держа́ть >< класть, \n- стира́ть, скла́дывать",
            "action_vi": "- cầm >< đặt nằm,\n- giặt, gấp",
            "place": "протира́ть (доску́)",
            "place_vi": "lau (bảng)",
            "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.",
            "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."
          },
          {
            "target": "(Шко́льная) доска́",
            "target_vi": "Bảng đen",
            "action": "ве́шать, протира́ть",
            "action_vi": "treo, lau",
            "place": "писа́ть, рисова́ть",
            "place_vi": "viết, vẽ",
            "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. По́сле уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.",
            "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."
          },
          {
            "target": "Мел - Коро́бка (для ме́ла)",
            "target_vi": "Phấn - Hộp (phấn)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "place": "писа́ть, рисова́ть",
            "place_vi": "viết, vẽ",
            "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.",
            "ex_vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn."
          },
          {
            "target": "Бе́лая доска́",
            "target_vi": "Bảng trắng",
            "action": "ве́шать, протира́ть",
            "action_vi": "treo, lau",
            "place": "писа́ть, рисова́ть",
            "place_vi": "viết, vẽ",
            "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.",
            "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."
          },
          {
            "target": "Гу́бка (для доски́)",
            "target_vi": "Mút lau (bảng)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "place": "протира́ть (доску́)",
            "place_vi": "lau (bảng)",
            "ex": "Я протира́ю бе́лую доску́ гу́бкой.",
            "ex_vi": "Tôi đang lau bảng trắng bằng mút lau."
          },
          {
            "target": "Маркёр",
            "target_vi": "Bút dạ",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "place": "писа́ть",
            "place_vi": "viết",
            "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.",
            "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."
          },
          {
            "target": "Прое́ктор",
            "target_vi": "Máy chiếu",
            "action": "ве́шать, включа́ть >< выключа́ть",
            "action_vi": "treo, bật lên >< tắt đi",
            "place": "по-ка́-зы-вать",
            "place_vi": "trình chiếu",
            "ex": "Преподава́тель обы́чно показыва́ет презента́цию с по́мощью прое́ктора..",
            "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu."
          },
          {
            "target": "Компью́тер",
            "target_vi": "Máy tính",
            "action": "ста́вить, включа́ть >< выключа́ть",
            "action_vi": "đặt đứng, bật lên >< tắt đi",
            "place": "рабо́тать, учи́ться, игра́ть в компью́терные игры́",
            "place_vi": "làm việc, học, chơi điện tử",
            "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.",
            "ex_vi": "Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính."
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Максим",
        "role": "Sinh viên",
        "ru": "Катя, ты не одолжишь мне синюю ручку? Я забыл свой пенал дома.",
        "vi": "Katya ơi, cậu có thể cho mình mượn chiếc bút bi xanh được không? Mình để quên hộp bút ở nhà rồi."
      },
      {
        "speaker": "Катя",
        "role": "Sinh viên",
        "ru": "Конечно! Вот, держи ручку и линейку. А тетрадь по грамматике у тебя с собой?",
        "vi": "Tất nhiên rồi! Này, cầm lấy bút và thước kẻ nhé. Cậu có mang theo vở ngữ pháp không?"
      },
      {
        "speaker": "Максим",
        "role": "Sinh viên",
        "ru": "Да, тетрадь и словарь я уже положил на парту. Сейчас преподаватель начнёт лекцию.",
        "vi": "Có, vở và từ điển mình đã để sẵn trên bàn học rồi. Bây giờ thầy giáo sẽ bắt đầu bài giảng."
      },
      {
        "speaker": "Катя",
        "role": "Sinh viên",
        "ru": "Отлично, давай внимательно слушать и записывать новые правила.",
        "vi": "Tuyệt vời, chúng mình hãy lắng nghe chăm chú và ghi lại các quy tắc mới nhé."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cặp động từ «брать из чего (C2)» >< «убирать во что (C4)»",
        "content": "• «брать из рюкзака / из пенала»: lấy ra khỏi cặp / hộp bút.\n• «убирать в рюкзак / в пенал»: cất vào bên trong cặp / hộp bút."
      },
      {
        "title": "2. Cách 5 công cụ với động từ «писать» (Viết bằng cái gì)",
        "content": "• «писать чем? (Cách 5)»:\n  - ручкой (bằng bút bi), карандашом (bằng bút chì), мелом (bằng phấn), маркёром (bằng bút dạ)."
      }
    ],
    "culturalTip": "Trong giờ học tại đại học Nga, sinh viên đứng dậy khi giảng viên bước vào lớp để chào hỏi. Khi muốn phát biểu hoặc trả lời câu hỏi, hãy giơ tay ngay ngắn."
  },
  "phuong_tien_giao_thong": {
    "intro": "Nước Nga sở hữu hệ thống giao thông công cộng hiện đại bậc nhất thế giới, nổi tiếng với mạng lưới tàu điện ngầm Moskva tráng lệ, hệ thống xe buýt, xe điện (трамвай, троллейбус) và tàu hỏa đường dài (поезд). Nắm chắc động từ chuyển động (ехать/ездить, лететь/летать) và cách diễn đạt phương tiện đi lại là kỹ năng sống còn.",
    "actionChains": [
      {
        "subTopic": "Phương tiện công cộng",
        "items": [
          {
            "target": "ТРАНСПОРТ \n(Phương tiện giao thông)",
            "target_vi": "",
            "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "ПРИМЕРЫ\n(Ví dụ)",
            "ex_vi": ""
          },
          {
            "target": "Авто́бус — остано́вка",
            "target_vi": "Xe buýt - điểm dừng",
            "action": "е́хать - е́здить",
            "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."
          },
          {
            "target": "Трамва́й — остано́вка",
            "target_vi": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng tàu điện."
          },
          {
            "target": "Тролле́йбус — остано́вка",
            "target_vi": "Xe điện (loại không có đường ray riêng) - điểm dừng",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."
          },
          {
            "target": "Метро́ — ста́нция метро́",
            "target_vi": "Tàu điện ngầm - ga tàu điện ngầm",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.",
            "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."
          },
          {
            "target": "По́езд — вокза́л",
            "target_vi": "Tàu hỏa - ga tàu hỏa",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.",
            "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."
          },
          {
            "target": "Самолёт — аэропо́рт",
            "target_vi": "Máy bay - sân bay",
            "action": "лете́ть - лета́ть",
            "action_vi": "bay (một chiều - hai chiều) (1 lần - thường xuyên)",
            "place": "",
            "place_vi": "",
            "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.",
            "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về."
          }
        ]
      },
      {
        "subTopic": "Phương tiện cá nhân",
        "items": [
          {
            "target": "ТРАНСПОРТ \n(Phương tiện giao thông)",
            "target_vi": "",
            "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "ПРИМЕРЫ\n(Ví dụ)",
            "ex_vi": ""
          },
          {
            "target": "Маши́на — гара́ж",
            "target_vi": "Ô tô - gara",
            "action": "е́хать - е́здить",
            "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.",
            "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô."
          },
          {
            "target": "Мотоци́кл — гара́ж",
            "target_vi": "Xe máy - gara",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.",
            "ex_vi": "Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy."
          },
          {
            "target": "Велосипе́д — гара́ж",
            "target_vi": "Xe đạp - gara",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.",
            "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Дмитрий",
        "role": "Sinh viên quốc tế",
        "ru": "Елена, как быстрее всего добраться от общежития до Красной площади?",
        "vi": "Elena ơi, đi từ ký túc xá đến Quảng trường Đỏ cách nào là nhanh nhất?"
      },
      {
        "speaker": "Елена",
        "role": "Sinh viên bản xứ",
        "ru": "Сначала дойди пешком до станции метро, а затем поезжай по прямой линии без пересадок.",
        "vi": "Đầu tiên cậu đi bộ đến ga tàu điện ngầm, sau đó đi theo tuyến thẳng không cần đổi tàu."
      },
      {
        "speaker": "Дмитрий",
        "role": "Sinh viên quốc tế",
        "ru": "А сколько времени займёт поездка на автобусе?",
        "vi": "Thế đi bằng xe buýt thì mất khoảng bao lâu?"
      },
      {
        "speaker": "Елена",
        "role": "Sinh viên bản xứ",
        "ru": "На автобусе дольше из-за пробок. В Москве на метро всегда надёжнее и быстрее!",
        "vi": "Đi xe buýt lâu hơn vì tắc đường. Ở Moskva đi tàu điện ngầm luôn là phương án chuẩn giờ và nhanh nhất!"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ chuyển động có phương tiện: «ехать» (1 chiều) vs «ездить» (khứ hồi / thường xuyên)",
        "content": "• «Сейчас я еду в университет на автобусе» (hành động cụ thể 1 chiều đang diễn ra).\n• «Каждый день я езжу в университет на метро» (thói quen lặp đi lặp lại hàng ngày)."
      },
      {
        "title": "2. Cấu trúc phương tiện «на чём?» (Cách 6)",
        "content": "• Luôn dùng giới từ «НА + Cách 6»: на автобусе, на метро (bất biến), на трамвае, на поезде, на машине, на самолёте."
      }
    ],
    "culturalTip": "Trên thang cuốn tàu điện ngầm (эскалатор метро) tại Nga, người đi luôn tự giác đứng nép về phía bên tay phải để nhường lối đi thông thoáng bên tay trái cho những người cần di chuyển gấp."
  },
  "dia_diem_noi_chon": {
    "intro": "Hỏi đường, tìm kiếm địa chỉ và định vị các cơ sở công cộng như trường học, viện nghiên cứu, bệnh viện, nhà hát, bảo tàng, bưu điện hay danh lam thắng cảnh là một phần không thể thiếu trong kỳ thi TRKI và đời sống du học. Nắm vững quy tắc dùng giới từ В / НА ở Cách 6 (Предложный падеж) giúp bạn trả lời trôi chảy câu hỏi «Где?».",
    "actionChains": [
      {
        "subTopic": "Cơ sở học tập",
        "items": [
          {
            "target": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)",
            "target_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)",
            "action": "учи́ться, учи́ть, изуча́ть",
            "action_vi": "học tập, học, nghiên cứu (học chuyên sâu)",
            "place": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)",
            "place_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)",
            "ex": "Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те.",
            "ex_vi": "Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học."
          },
          {
            "target": "В библиоте́ке (библиоте́ка)",
            "target_vi": "Ở thư viện (thư viện)",
            "action": "чита́ть",
            "action_vi": "đọc",
            "place": "В библиоте́ке (библиоте́ка)",
            "place_vi": "Ở thư viện (thư viện)",
            "ex": "Я ча́сто чита́ю кни́ги в библиоте́ке.",
            "ex_vi": "Tôi thường đọc sách ở thư viện."
          },
          {
            "target": "На ка́федре (ка́федра)",
            "target_vi": "Ở phòng chuyên môn (phòng chuyên môn)",
            "action": "встреча́ться",
            "action_vi": "gặp mặt, họp mặt",
            "place": "На ка́федре (ка́федра)",
            "place_vi": "Ở phòng chuyên môn (phòng chuyên môn)",
            "ex": "Преподава́тели ча́сто встреча́ются на кафе́дре.",
            "ex_vi": "Các giảng viên thường họp mặt ở phòng bộ môn."
          },
          {
            "target": "В декана́те (декана́т)",
            "target_vi": "Ở văn phòng khoa (văn phòng khoa)",
            "action": "подава́ть (докуме́нты), получа́ть (докуме́нты)",
            "action_vi": "nộp (giấy tờ), nhận (giấy tờ)",
            "place": "В декана́те (декана́т)",
            "place_vi": "Ở văn phòng khoa (văn phòng khoa)",
            "ex": "Студе́нты ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.",
            "ex_vi": "Các sinh viên thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."
          },
          {
            "target": "В общежи́тии (общежи́тие)",
            "target_vi": "Ở ký túc xá (ký túc xá)",
            "action": "жить",
            "action_vi": "ở",
            "place": "В общежи́тии (общежи́тие)",
            "place_vi": "Ở ký túc xá (ký túc xá)",
            "ex": "Я живу́ в общежи́тии № 5.",
            "ex_vi": "Tôi đang sống ở ký túc xá số 5."
          },
          {
            "target": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)",
            "target_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)",
            "action": "слу́шать ле́кцию - выступа́ть",
            "action_vi": "nghe giảng - thuyết trình",
            "place": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)",
            "place_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)",
            "ex": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.\n- Я ча́сто слу́шаю ле́кцию на ле́кциях.\n- Я ча́сто выступа́ю на семина́рах.",
            "ex_vi": "- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm.\n- Tôi thường nghe bài giảng ở các buổi giảng đường.\n- Tôi thường thuyết trình ở các buổi seminar."
          },
          {
            "target": "В лаборато́рии (лаборато́рия)",
            "target_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)",
            "action": "иссле́довать",
            "action_vi": "nghiên cứu",
            "place": "В лаборато́рии (лаборато́рия)",
            "place_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)",
            "ex": "Я ча́сто иссле́дую в лаборато́рии.",
            "ex_vi": "Tôi thường nghiên cứu ở phòng thí nghiệm."
          }
        ]
      },
      {
        "subTopic": "Cơ sở y tế",
        "items": [
          {
            "target": "В апте́ке (апте́ка)",
            "target_vi": "Ở hiệu thuốc (hiệu thuốc)",
            "action": "покупа́ть лека́рства",
            "action_vi": "mua thuốc",
            "place": "В апте́ке (апте́ка)",
            "place_vi": "Ở hiệu thuốc (hiệu thuốc)",
            "ex": "Я ча́сто покупа́ю ле́карства в апте́ке.",
            "ex_vi": "Tôi thường mua thuốc ở hiệu thuốc."
          },
          {
            "target": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)",
            "target_vi": "- Ở phòng khám (phòng phám)\n- Ở bệnh viện (bệnh viện)",
            "action": "идти́/е́хать к врачу́",
            "action_vi": "đi gặp bác sĩ (đi khám bệnh)",
            "place": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)",
            "place_vi": "- Ở phòng khám (phòng phám)\n- Ở bệnh viện (bệnh viện)",
            "ex": "Когда я боле́ю, я ча́сто хожу́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це.",
            "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."
          }
        ]
      },
      {
        "subTopic": "Cơ sở vui chơi giải trí, thể thao",
        "items": [
          {
            "target": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)",
            "target_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)",
            "action": "смотре́ть карти́ны",
            "action_vi": "xem tranh",
            "place": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)",
            "place_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)",
            "ex": "Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
            "ex_vi": "Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm."
          },
          {
            "target": "В теа́тре (теа́тр)",
            "target_vi": "Ở nhà hát (nhà hát)",
            "action": "смотре́ть спекта́кль",
            "action_vi": "xem vở kịch",
            "place": "В теа́тре (теа́тр)",
            "place_vi": "Ở nhà hát (nhà hát)",
            "ex": "Я ча́сто смотрю́ спекта́кли в теа́тре.",
            "ex_vi": "Tôi thường xem các vở kịch ở nhà hát."
          },
          {
            "target": "На конце́рте (конце́рт)",
            "target_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)",
            "action": "слу́шать му́зыку, смотре́ть выступле́ние",
            "action_vi": "nghe nhạc, xem biểu diễn",
            "place": "На конце́рте (конце́рт)",
            "place_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)",
            "ex": "Я ча́сто слу́шаю му́зыку на конце́ртах.",
            "ex_vi": "Tôi thường nghe nhạc ở các buổi hòa nhạc."
          },
          {
            "target": "В кинотеа́тре (кинотеа́тр)",
            "target_vi": "Ở rạp chiếu phim (rạp chiếu phim)",
            "action": "смотре́ть фильм",
            "action_vi": "xem phim",
            "place": "В кинотеа́тре (кинотеа́тр)",
            "place_vi": "Ở rạp chiếu phim (rạp chiếu phim)",
            "ex": "Я ча́сто смотрю́ фильм в кинотеа́тре.",
            "ex_vi": "Tôi thường xem phim ở rạp chiếu phim."
          },
          {
            "target": "В клу́бе (клуб)",
            "target_vi": "Ở câu lạc bộ (câu lạc bộ)",
            "action": "встреча́ться",
            "action_vi": "gặp gỡ, họp mặt",
            "place": "В клу́бе (клуб)",
            "place_vi": "Ở câu lạc bộ (câu lạc bộ)",
            "ex": "Я ча́сто встреча́юсь с людьми́ в клу́бе.",
            "ex_vi": "Tôi thường gặp gỡ mọi người ở câu lạc bộ."
          },
          {
            "target": "На дискоте́ке (дискоте́ка)",
            "target_vi": "Ở vũ trường (vũ trường)",
            "action": "танцева́ть, слу́шать му́зыку",
            "action_vi": "nhảy, nghe nhạc",
            "place": "На дискоте́ке (дискоте́ка)",
            "place_vi": "Ở vũ trường (vũ trường)",
            "ex": "Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.",
            "ex_vi": "Tôi thường nhảy và nghe nhạc ở vũ trường."
          },
          {
            "target": "В ци́рке (цирк)",
            "target_vi": "Ở rạp xiếc (rạp xiếc)",
            "action": "смотре́ть цирк",
            "action_vi": "xem xiếc",
            "place": "В ци́рке (цирк)",
            "place_vi": "Ở rạp xiếc (rạp xiếc)",
            "ex": "Я ча́сто смотрю́ цирк в ци́рке.",
            "ex_vi": "Tôi thường xem xiếc ở rạp xiếc."
          },
          {
            "target": "В зоопа́рке (зоопа́рк)",
            "target_vi": "Ở sở thú (sở thú)",
            "action": "смотре́ть живо́тных",
            "action_vi": "xem động vật",
            "place": "В зоопа́рке (зоопа́рк)",
            "place_vi": "Ở sở thú (sở thú)",
            "ex": "Я ча́сто ви́жу живо́тных в зоопа́рке.",
            "ex_vi": "Tôi thường nhìn thấy động vật ở sở thú."
          },
          {
            "target": "На стадио́не (стадио́н)",
            "target_vi": "Ở sân vận động (sân vận động)",
            "action": "смотре́ть матч, игра́ть",
            "action_vi": "xem trận đấu, chơi",
            "place": "На стадио́не (стадио́н)",
            "place_vi": "Ở sân vận động (sân vận động)",
            "ex": "Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.",
            "ex_vi": "Tôi thường chơi bóng đá với các bạn ở sân vận động."
          },
          {
            "target": "На экску́рсии (экску́рсия)",
            "target_vi": "Ở chuyến tham quan (chuyến tham quan)",
            "action": "посеща́ть",
            "action_vi": "tham quan",
            "place": "На экску́рсии (экску́рсия)",
            "place_vi": "Ở chuyến tham quan (chuyến tham quan)",
            "ex": "Я ча́сто посеща́ю музе́й на экску́рсии.",
            "ex_vi": "Tôi thường thăm quan bảo tàng trên chuyến tham quan."
          }
        ]
      },
      {
        "subTopic": "Cơ sở thương mại, dịch vụ, kinh tế",
        "items": [
          {
            "target": "В магази́не (магази́н)",
            "target_vi": "Ở cửa hàng (cửa hàng)",
            "action": "купи́ть",
            "action_vi": "mua",
            "place": "В магази́не (магази́н)",
            "place_vi": "Ở cửa hàng (cửa hàng)",
            "ex": "Я ча́сто покупа́ю проду́кты в магази́не.",
            "ex_vi": "Tôi thường mua thực phẩm ở cửa hàng."
          },
          {
            "target": "В ба́нке (банк)",
            "target_vi": "Ở ngân hàng (ngân hàng)",
            "action": "меня́ть де́ньги",
            "action_vi": "đổi tiền",
            "place": "В ба́нке (банк)",
            "place_vi": "Ở ngân hàng (ngân hàng)",
            "ex": "Я ча́сто меня́ю де́ньги в ба́нке.",
            "ex_vi": "Tôi thường đổi tiền ở ngân hàng."
          },
          {
            "target": "На по́чте (по́чта)",
            "target_vi": "Ở bưu điện (bưu điện)",
            "action": "отправля́ть, получа́ть",
            "action_vi": "gửi, nhận",
            "place": "На по́чте (по́чта)",
            "place_vi": "Ở bưu điện (bưu điện)",
            "ex": "Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.",
            "ex_vi": "Tôi thường gửi thư và nhận thư ở bưu điện."
          },
          {
            "target": "В па́рке (парк) - В кио́ске (кио́ск)",
            "target_vi": "Ở công viên (công viên) - Ở kiock (kiock)",
            "action": "гуля́ть - купи́ть",
            "action_vi": "mua",
            "place": "В па́рке (парк) - В кио́ске (кио́ск)",
            "place_vi": "Ở công viên (công viên) - Ở kiock (kiock)",
            "ex": "Я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.",
            "ex_vi": "Tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."
          },
          {
            "target": "В рестора́не (рестора́н)",
            "target_vi": "Ở nhà hàng (nhà hàng)",
            "action": "за́втракать, обе́дать, у́жинать",
            "action_vi": "ăn sáng, ăn trưa, ăn tối",
            "place": "В рестора́не (рестора́н)",
            "place_vi": "Ở nhà hàng (nhà hàng)",
            "ex": "Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.",
            "ex_vi": "Tôi thường ăn tối với bạn gái ở nhà hàng."
          },
          {
            "target": "В столо́вой (столо́вая)",
            "target_vi": "Ở nhà ăn (nhà ăn)",
            "action": "за́втракать, обе́дать, у́жинать",
            "action_vi": "ăn sáng, ăn trưa, ăn tối",
            "place": "В столо́вой (столо́вая)",
            "place_vi": "Ở nhà ăn (nhà ăn)",
            "ex": "Я ча́сто обе́даю с одногру́ппниками в столо́вой.",
            "ex_vi": "Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn."
          },
          {
            "target": "В кафе́ (кафе́)",
            "target_vi": "Ở quán cafe (quán cafe)",
            "action": "пить",
            "action_vi": "uống",
            "place": "В кафе́ (кафе́)",
            "place_vi": "Ở quán cafe (quán cafe)",
            "ex": "Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.",
            "ex_vi": "Tôi thường uống cà phê ở quán cà phê mỗi sáng."
          },
          {
            "target": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)",
            "target_vi": "- Ở công ty (công ty)\n- Ở nhà máy (nhà máy)\n- Ở xưởng sản xuất (xưởng sản xuất)",
            "action": "рабо́тать",
            "action_vi": "làm việc",
            "place": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)",
            "place_vi": "- Ở công ty (công ty)\n- Ở nhà máy (nhà máy)\n- Ở xưởng sản xuất (xưởng sản xuất)",
            "ex": "Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день.",
            "ex_vi": "TTôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày."
          },
          {
            "target": "В гости́нице (гости́ница)",
            "target_vi": "Ở khách sạn (khách sạn)",
            "action": "жить",
            "action_vi": "ở",
            "place": "В гости́нице (гости́ница)",
            "place_vi": "Ở khách sạn (khách sạn)",
            "ex": "Я живу́ в гости́нице.",
            "ex_vi": "Tôi đang ở khách sạn."
          }
        ]
      },
      {
        "subTopic": "Liên quan đến phương tiện giao thông",
        "items": [
          {
            "target": "В гараже́ (гара́ж)",
            "target_vi": "Ở ga-ra (ga-ra)",
            "action": "брать (маши́ну), оставля́ть (маши́ну)",
            "action_vi": "lấy (ô tô), cất để (ô tô)",
            "place": "В гараже́ (гара́ж)",
            "place_vi": "Ở ga-ra (ga-ra)",
            "ex": "Я сейча́с иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто оставля́ть их в гара́же.",
            "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường để chúng ở ga-ra."
          },
          {
            "target": "На остано́вке (остано́вка)",
            "target_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)",
            "action": "ждать",
            "action_vi": "đợi",
            "place": "На остано́вке (остано́вка)",
            "place_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)",
            "ex": "Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке.",
            "ex_vi": "Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng."
          },
          {
            "target": "На ста́нции (ста́нция)",
            "target_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)",
            "action": "ждать",
            "action_vi": "đợi",
            "place": "На ста́нции (ста́нция)",
            "place_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)",
            "ex": "Я ча́сто жду́ метро́ на ста́нции метро́.",
            "ex_vi": "Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."
          },
          {
            "target": "На вокза́ле (вокза́л)",
            "target_vi": "Ở nhà ga (nhà ga)",
            "action": "ждать",
            "action_vi": "đợi",
            "place": "На вокза́ле (вокза́л)",
            "place_vi": "Ở nhà ga (nhà ga)",
            "ex": "Я сейча́с е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.",
            "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."
          }
        ]
      },
      {
        "subTopic": "Liên quan đến thiên nhiên",
        "items": [
          {
            "target": "На реке́ (река́), на о́зере (о́зеро)",
            "target_vi": "Ở sông (sông), Ở hồ (hồ)",
            "action": "лови́ть ры́бу, пла́вать",
            "action_vi": "câu cá, bơi",
            "place": "На реке́ (река́), на о́зере (о́зеро)",
            "place_vi": "Ở sông (sông), Ở hồ (hồ)",
            "ex": "- Я ча́сто ловлю́ ры́бу на реке́.\n- Ле́том я ча́сто пла́ваю на о́зере.",
            "ex_vi": "- Tôi thường câu cá ở sông.\n- Vào mùa hè tôi thường bơi ở hồ."
          },
          {
            "target": "На мо́ре (мо́ре)",
            "target_vi": "Ở biển (biển)",
            "action": "смотре́ть зака́т",
            "action_vi": "ngắm hoàng hôn",
            "place": "На мо́ре (мо́ре)",
            "place_vi": "Ở biển (biển)",
            "ex": "Я ча́сто смотрю́ зака́т на мо́ре.",
            "ex_vi": "Tôi thường ngắm hoàng hôn ở biển."
          },
          {
            "target": "В саду́ (сад)",
            "target_vi": "Ở vườn (vườn)",
            "action": "сажа́ть цветы́, сажа́ть о́вощи",
            "action_vi": "trồng hoa, trồng rau",
            "place": "В саду́ (сад)",
            "place_vi": "Ở vườn (vườn)",
            "ex": "Я ча́сто сажа́ю о́вощи и цветы́ в саду́.",
            "ex_vi": "Tôi thường trồng rau và trồng hoa ở vườn."
          },
          {
            "target": "В гора́х (гора́)",
            "target_vi": "Ở trên núi (1 ngọn núi)",
            "action": "поднима́ться в го́ры",
            "action_vi": "leo núi",
            "place": "В гора́х (гора́)",
            "place_vi": "Ở trên núi (1 ngọn núi)",
            "ex": "Я о́чень люблю́ поднима́ться в го́ры.",
            "ex_vi": "Tôi rất thích leo núi."
          },
          {
            "target": "В лесу́ (лес)",
            "target_vi": "Ở trong rừng (rừng)",
            "action": "собира́ть грибы́",
            "action_vi": "hái nấm",
            "place": "В лесу́ (лес)",
            "place_vi": "Ở trong rừng (rừng)",
            "ex": "Я ча́сто собира́ю грибы́ в лесу́.",
            "ex_vi": "Tôi thường hái nấm ở trong rừng."
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Павел",
        "role": "Sinh viên",
        "ru": "Наташа, где мы встретимся перед экскурсией?",
        "vi": "Natasha ơi, chúng mình gặp nhau ở đâu trước chuyến tham quan?"
      },
      {
        "speaker": "Наташа",
        "role": "Sinh viên",
        "ru": "Давай встретимся в университетской библиотеке на первом этаже в двенадцать часов.",
        "vi": "Chúng mình gặp nhau ở thư viện trường đại học tại tầng 1 lúc mười hai giờ nhé."
      },
      {
        "speaker": "Павел",
        "role": "Sinh viên",
        "ru": "Отлично. А после библиотеки мы пойдём на выставку в Третьяковскую галерею?",
        "vi": "Tuyệt quá. Thế sau khi ở thư viện xong chúng mình sẽ đi triển lãm ở phòng tranh Tretyakov chứ?"
      },
      {
        "speaker": "Наташа",
        "role": "Sinh viên",
        "ru": "Да, а вечером поужинаем в уютном кафе на Арбате.",
        "vi": "Đúng rồi, và buổi tối chúng mình sẽ ăn tối tại một quán cà phê ấm cúng trên phố Arbat."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Quy tắc giới từ «В» hay «НА» ở Cách 6 (Địa điểm - Ở đâu)",
        "content": "• Dùng «В» cho không gian khép kín, tòa nhà: в университете, в библиотеке, в аптеке, в магазине, в музее.\n• Dùng «НА» cho không gian mở, sự kiện, bề mặt: на стадионе, на концерте, на лекции, на почте, на вокзале, на улице."
      },
      {
        "title": "2. Đuôi danh từ giống cái -ия và giống trung -ие ở Cách 6",
        "content": "• Đuôi biến đổi thành «-ИИ» thay vì «-е»:\n  - лаборато́рия → в лаборато́рии, общежи́тие → в общежи́тии, Росси́я → в Росси́и."
      }
    ],
    "culturalTip": "Hầu hết các bảo tàng và nhà hát lớn tại Nga (như Nhà hát Bolshoi, Bảo tàng Tretyakov, Hermitage) đều có chính sách giảm giá vé rất sâu dành cho học sinh, sinh viên khi xuất trình thẻ sinh viên (студенческий билет)."
  },
  "do_an_uong": {
    "intro": "Ẩm thực Nga phong phú với súp củ dền (борщ), bánh bao sủi cảo (пельмени), cháo yến mạch (каша), bánh ngọt và trà nóng. Học cách gọi món, miêu tả nguyên liệu rau củ quả và diễn đạt các bước sơ chế nấu ăn (rửa, gọt vỏ, thái hạt lựu, luộc, rán) giúp bạn tự tin đi chợ, siêu thị và thưởng thức văn hóa ẩm thực Nga.",
    "actionChains": [
      {
        "subTopic": "Món chính và món phụ",
        "items": [
          {
            "target": "Суп (súp)",
            "target_vi": "",
            "action": "гото́вить, вари́ть, жа́рить (что?)\n\nnấu, luộc, rán (cái gì?)",
            "action_vi": "",
            "place": "- в кастрю́ле (bằng nồi)\n- на сковороде́ (bằng chảo)\n- в рисова́рке (bằng nồi cơm điện)",
            "place_vi": "",
            "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.",
            "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì."
          },
          {
            "target": "Рис (cơm)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.",
            "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá."
          },
          {
            "target": "Мя́со (thịt)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с ри́сом и ры́бой.",
            "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, ."
          },
          {
            "target": "Пельме́ни (sủi cảo Nga)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.",
            "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì."
          },
          {
            "target": "Ка́ша (cháo)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.",
            "ex_vi": "Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm."
          },
          {
            "target": "Ры́ба (cá)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с ри́сом и мя́сом.",
            "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt."
          },
          {
            "target": "Ку́рица (gà)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.",
            "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad."
          },
          {
            "target": "Яйцо́ (trứng)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.",
            "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì."
          },
          {
            "target": "Сала́т (salad)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м.",
            "ex_vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng."
          }
        ]
      },
      {
        "subTopic": "Món tráng miệng, ăn nhẹ",
        "items": [
          {
            "target": "Шокола́д - Шокола́дом",
            "target_vi": "So cô la",
            "action": "есть что? с чем?\n(ăn cái gì? với cái gì?)",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Моро́женое - Моро́женым",
            "target_vi": "Kem",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Торт - То́ртом",
            "target_vi": "Bánh kem",
            "action": "переку́сывать чем? с чем?\n(ăn nhẹ cái gì? với cái gì?",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Йо́гурт - Йо́гуртом",
            "target_vi": "Sữa chua",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "Hoa quả",
        "items": [
          {
            "target": "Я́блоко (táo)",
            "target_vi": "",
            "action": "мыть — rửa\nчи́стить — gọt vỏ\nнареза́ть — cắt thành lát",
            "action_vi": "",
            "place": "есть — ăn\nпереку́сывать — ăn nhẹ",
            "place_vi": "",
            "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чищу́ их, а зате́м нареза́ю их, что́бы съесть.",
            "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."
          },
          {
            "target": "Гру́ша (lê)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Манго́ (xoài)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Апельси́н (cam)",
            "target_vi": "",
            "action": "мыть — rửa\nчи́стить — bóc vỏ",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
            "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."
          },
          {
            "target": "Мандари́н (quýt)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Бана́н (chuối)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Арбу́з (dưa hấu)",
            "target_vi": "",
            "action": "мыть — rửa\nразреза́ть — bổ",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.",
            "ex_vi": "Tôi bổ quả dưa hấu để mời khách ăn."
          },
          {
            "target": "Виногра́д (nho)",
            "target_vi": "",
            "action": "мыть — rửa",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.",
            "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa."
          }
        ]
      },
      {
        "subTopic": "Rau củ quả",
        "items": [
          {
            "target": "",
            "target_vi": "Карто́фель (khoai tây)",
            "action": "мыть --> чи́стить --> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Помидо́р (cà chua)",
            "action": "мыть --> нареза́ть --> измельча́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Бата́т (khoai lang)",
            "action": "мыть --> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Огуре́ц (dưa chuột)",
            "action": "мыть --> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Зелёный лук (hành lá)",
            "action": "мыть --> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Лук (hành tây)",
            "action": "чи́стить --> нареза́ть --> измельча́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Чесно́к (tỏi)",
            "action": "чи́стить --> раздавлива́ть --> измельча́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Капу́ста (bắp cải)",
            "action": "мыть --> разреза́ть --> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "Ты́ква (bí đỏ)",
            "action": "мыть --> чи́стить --> разреза́ть -> нареза́ть",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "Đồ uống",
        "items": [
          {
            "target": "Чай (trà)",
            "target_vi": "",
            "action": "налива́ть в стака́н / ча́шку\n(rót vào cốc/chén)",
            "action_vi": "",
            "place": "Я налива́ю чай в стака́н и пью.\n(Tôi rót trà vào cốc và uống.)",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Молоко́ (sữa)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Кока-ко́ла (Coca-cola)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Пи́во (bia)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Сок (nước ép)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Вода́ (nước)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "Алкого́ль / Вино́ \n(rượu/ rượu vang)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "Я налива́ю вино́ в ча́шку и пью.\n(Tôi rót rượu vang vào chén và uống.)",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      },
      {
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi",
        "items": [
          {
            "target": "",
            "target_vi": "",
            "action": "(1) По́сле + кого?/чего?(C2) : \n              sau ai?/cái gì?",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "",
            "action": "(2) Trạng từ chỉ thời gian (Когда́?)\nле́то - ле́том: mùa hè - vào mùa hè.\nо́сень - о́сенью: mùa thu - vào mùa thu.\nзима́ - зимо́й: mùa đông - vào mùa đông.\nвесна́ - весно́й: mùa xuân - vào mùa xuân.\n\nу́тро - у́тром: buổi sáng - vào buổi sáng\nдень - днём: buổi trưa - vào buổi trưa\nве́чер - ве́чером: buổi chiều - vào buổi chiều.\nночь - но́чью: buổi đêm - vào buổi đêm",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "",
            "action": "(3) Trạng từ chỉ tần suất (Как ча́сто?)\nка́ждый/ка́ждая/ка́ждое/ка́ждые + DT chỉ thời gian\n\nVD: \n- ка́ждый день (mỗi ngày), ка́ждая неде́ля (mỗi tuần), ка́ждый ме́сяц (mỗi tháng), ка́ждый год (mỗi năm).\n- Theo thứ trong tuần: ка́ждый понеде́льник (mỗi thứ hai), ка́ждая суббо́та (mỗi thứ bảy)\n- Theo thời gian trong ngày: ка́ждое у́тро (mỗi sáng), ка́ждый ве́чер (mỗi chiều,tối), ка́ждая ночь (mỗi đêm).\n- Theo mùa trong năm: ка́ждая весна́ (mỗi xuân), ка́ждое ле́то (mỗi hè), ка́ждая о́сень (mỗi thu), ка́ждая зима́ (mỗi đông).",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Саша",
        "role": "Sinh viên",
        "ru": "Таня, что ты будешь заказывать на обед в столовой?",
        "vi": "Tanya ơi, cậu sẽ gọi món gì cho bữa trưa ở nhà ăn?"
      },
      {
        "speaker": "Таня",
        "role": "Sinh viên",
        "ru": "Я возьму тарелку горячего борща со сметаной, пельмени и свежий салат.",
        "vi": "Mình sẽ lấy một tô súp củ dền nóng ăn kèm kem chua, sủi cảo pelmeni và đĩa salad tươi."
      },
      {
        "speaker": "Саша",
        "role": "Sinh viên",
        "ru": "А какой напиток ты выберешь?",
        "vi": "Thế cậu sẽ chọn đồ uống gì?"
      },
      {
        "speaker": "Таня",
        "role": "Sinh viên",
        "ru": "Чёрный чай с лимоном и кусочек шоколадного торта на десерт!",
        "vi": "Một tách trà đen với chanh và một lát bánh kem sô-cô-la để tráng miệng!"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc «есть / пить что (C4) с чем (C5)» (Ăn/Uống cái gì kèm với cái gì)",
        "content": "• «Я ем суп с хлебом» (Tôi ăn súp với bánh mì).\n• «Я пью чай с лимоном и сахаром» (Tôi uống trà với chanh và đường)."
      },
      {
        "title": "2. Trạng từ thời gian chỉ buổi và mùa (Cách 5 không giới từ)",
        "content": "• Buổi: у́тром (buổi sáng), днём (buổi trưa), ве́чером (buổi tối), но́чью (đêm).\n• Mùa: ле́том (mùa hè), зимо́й (mùa đông), весно́й (mùa xuân), о́сенью (mùa thu)."
      },
      {
        "title": "3. Trạng từ tần suất: «каждый + Danh từ thời gian»",
        "content": "• ка́ждый день (mỗi ngày), ка́ждое у́тро (mỗi sáng), ка́ждую неде́лю (mỗi tuần)."
      }
    ],
    "culturalTip": "Văn hóa uống trà (Чаепитие) của người Nga rất đặc trưng: trà luôn được uống nóng kèm đồ ngọt như bánh quy (печенье), mứt hoa quả (варенье) hoặc sô-cô-la. Từ chối uống trà khi được chủ nhà mời có thể khiến họ cảm thấy bạn khách khí quá mức."
  },
  "the_thao_am_nhac": {
    "intro": "Người Nga đặc biệt yêu chuộng thể thao mùa đông như khúc côn cầu trên băng (хоккей), trượt tuyết, bóng đá (футбол), cờ vua (шахматы) và âm nhạc hàn lâm cổ điển. Thành thạo phân biệt giữa «играть в + C4» (chơi môn thể thao) và «играть на + C6» (chơi nhạc cụ) là tiêu chuẩn ngữ pháp trọng tâm ở cấp độ A1-A2.",
    "actionChains": [
      {
        "subTopic": "Các môn thể thao",
        "items": [
          {
            "target": "Электро́нные и́гры (điện tử)",
            "target_vi": "",
            "action": "игра́ть в что? с кем?\n(chơi cái gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cái gì?)",
            "action_vi": "",
            "place": "на компью́тере (trên máy tính), на телефо́не (trên điện thoại)",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.",
            "ex_vi": "Tôi đang chơi điện tử trên máy tính."
          },
          {
            "target": "Шахма́ты (cờ vua)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.",
            "ex_vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua."
          },
          {
            "target": "Футбо́л (bóng đá)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "на футбо́льном по́ле (ở sân cỏ), на стадио́не (ở sân vận động)",
            "place_vi": "",
            "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.",
            "ex_vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ."
          },
          {
            "target": "Хокке́й (khúc côn cầu)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "на хокке́йной площа́дке (ở sân khúc côn cầu)",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
            "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."
          },
          {
            "target": "Бадминто́н (cầu lồng)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "- на спорти́вной площа́дке (ở sân vận động đa năng)\n- в спортза́ле (ở phòng tập thể thao)",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."
          },
          {
            "target": "Насто́льный тенни́с (bóng bàn)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng."
          },
          {
            "target": "Те́ннис (bóng quần vợt - tennis)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng."
          },
          {
            "target": "Баскетбо́л (bóng rổ)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.",
            "ex_vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ."
          },
          {
            "target": "Волейбо́л (bóng chuyền)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.",
            "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."
          }
        ]
      },
      {
        "subTopic": "Dụng cụ âm nhạc",
        "items": [
          {
            "target": "Пиани́но (piano)",
            "target_vi": "",
            "action": "игра́ть в что? с кем?\n(chơi cái gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cái gì?)",
            "action_vi": "",
            "place": "музыка́льная ко́мната (phòng nhạc), музыка́льный класс (lớp học nhạc)",
            "place_vi": "",
            "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.",
            "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc."
          },
          {
            "target": "Гита́ра (guitar)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.",
            "ex_vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường."
          },
          {
            "target": "",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "GIẢI THÍCH TỪ VỰNG",
            "ex_vi": ""
          },
          {
            "target": "",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "(1) занима́ться чем? : luyện tập cái gì?",
            "ex_vi": ""
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Виктор",
        "role": "Sinh viên thể thao",
        "ru": "Даша, какими видами спорта ты увлекаешься в свободное время?",
        "vi": "Dasha ơi, cậu say mê những môn thể thao nào vào thời gian rảnh rỗi?"
      },
      {
        "speaker": "Даша",
        "role": "Sinh viên nghệ thuật",
        "ru": "Я часто играю в бадминтон и занимаюсь плаванием в университетском бассейне.",
        "vi": "Mình thường chơi cầu lông và đi bơi ở bể bơi của trường đại học."
      },
      {
        "speaker": "Виктор",
        "role": "Sinh viên thể thao",
        "ru": "А я слышал, что ты ещё прекрасно играешь на музыкальных инструментах?",
        "vi": "Còn mình nghe nói cậu còn chơi nhạc cụ rất cừ nữa đúng không?"
      },
      {
        "speaker": "Даша",
        "role": "Sinh viên nghệ thuật",
        "ru": "Да, я с детства играю на пианино и сейчас учусь играть на гитаре в студенческом клубе.",
        "vi": "Đúng vậy, mình chơi piano từ nhỏ và hiện đang học thêm guitar tại câu lạc bộ sinh viên."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt «играть в (C4)» và «играть на (C6)»",
        "content": "• Chơi môn thể thao / trò chơi: «играть в + C4» → играть в футбол, в шахматы, в волейбол.\n• Chơi nhạc cụ: «играть на + C6» → играть на пианино, на гитаре, на скрипке."
      },
      {
        "title": "2. Động từ «заниматься чем? (Cách 5)» (Luyện tập môn gì)",
        "content": "• «Я занимаюсь спортом» (Tôi tập thể thao).\n• «Он занимается футболом на стадионе» (Anh ấy tập bóng đá ở sân vận động)."
      }
    ],
    "culturalTip": "Nước Nga là cái nôi của nhiều đại kiện tướng cờ vua thế giới. Vào những ngày hè ấm áp, bạn sẽ dễ dàng bắt gặp những bàn cờ vua gỗ được bày công khai tại các công viên lớn như Công viên Gorky hay Sokolniki."
  },
  "con_vat": {
    "intro": "Thế giới động vật trong tiếng Nga bao gồm vật nuôi trong nhà (chó, mèo), gia súc gia cầm ở trang trại (bò, lợn, gà), cho tới muông thú hoang dã biểu tượng của rừng taiga nước Nga như gấu nâu (медведь), hổ (тигр), sư tử và chim chóc. Chủ đề giúp mở rộng vốn từ miêu tả hành vi chuyển động và sinh sống của muông thú.",
    "actionChains": [
      {
        "subTopic": "Vật nuôi, gia súc",
        "items": [
          {
            "target": "Кот — Ко́шка (mèo đực - mèo cái)",
            "target_vi": "",
            "action": "есть (ăn), \nлежа́ть (nằm), \nстоя́ть (ngồi), \nложи́ться спать (ngủ), \nигра́ть (chơi), \nбежа́ть - бе́гать (chạy), \nгуля́ть (đi dạo).",
            "action_vi": "",
            "place": "до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...",
            "place_vi": "",
            "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
            "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."
          },
          {
            "target": "Соба́ка (chó đực,cái)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
            "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."
          },
          {
            "target": "Свинья́ (con lợn",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)",
            "place_vi": "",
            "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
            "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."
          },
          {
            "target": "Ку́рица (con gà)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)",
            "place_vi": "",
            "ex": "Ку́рицы в саду́. Они́ бе́гают по са́ду.",
            "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."
          },
          {
            "target": "Коро́ва (con bò)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на по́ле (trên cánh đồng)",
            "place_vi": "",
            "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
            "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."
          }
        ]
      },
      {
        "subTopic": "Động vật hoang dã",
        "items": [
          {
            "target": "Медве́дь — Медве́дица \n(gấu đực - gấu cái)",
            "target_vi": "",
            "action": "охо́титься (săn mồi), \nбежа́ть - бе́гать (chạy), \nесть (ăn), \nлежа́ть (nằm), \nстоя́ть (đứng), \nложи́ться спать (ngủ), \nгуля́ть (đi dạo)",
            "action_vi": "",
            "place": "в лесу́ (ở trong rừng)",
            "place_vi": "",
            "ex": "Медве́дь ест, а пото́м спит.",
            "ex_vi": "Gấu đang ăn, sau đó đi ngủ."
          },
          {
            "target": "Тигр (hổ)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
            "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."
          },
          {
            "target": "Лев (sư tử)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Лев гуля́ет по лесу́.",
            "ex_vi": "Sư rử đang đi dạo quanh khu rừng."
          }
        ]
      },
      {
        "subTopic": "Con vật biết bay",
        "items": [
          {
            "target": "Пти́ца (con chim)",
            "target_vi": "",
            "action": "лете́ть - лета́ть (bay), \nесть (ăn), \nстоя́ть (đứng), \nлежа́ть (nằm), \nложи́ться спать (ngủ)",
            "action_vi": "",
            "place": "в не́бе (trên bầu trờ), \nна ве́тке (trên cành cây)",
            "place_vi": "",
            "ex": "Пти́ца лети́т по не́бу.",
            "ex_vi": "Con chim đang bay trên bầu trời."
          },
          {
            "target": "Попуга́й (con vẹt)",
            "target_vi": "",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "Попуга́й стои́т на ве́тке.",
            "ex_vi": "Con vẹt đang đứng trên cành cây."
          }
        ]
      },
      {
        "subTopic": "Con vật biết bơi",
        "items": [
          {
            "target": "Ры́ба (cá)",
            "target_vi": "",
            "action": "плыть - пла́вать (bơi), есть (ăn)",
            "action_vi": "",
            "place": "в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)",
            "place_vi": "",
            "ex": "Ры́ба пла́вает в реке́.",
            "ex_vi": "Con cá đang bơi ở sông."
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Никита",
        "role": "Người yêu động vật",
        "ru": "Марина, у тебя дома есть домашние животные?",
        "vi": "Marina ơi, ở nhà cậu có nuôi thú cưng không?"
      },
      {
        "speaker": "Марина",
        "role": "Sinh viên sinh học",
        "ru": "Да, у меня живут пушистый кот и умная собака. Кот любит спать на диване, а собака обожает гулять в парке.",
        "vi": "Có chứ, nhà mình nuôi một chú mèo lông xù và một chú chó thông minh. Mèo rất thích ngủ trên ghế sô-pha, còn chú chó thì mê đi dạo công viên."
      },
      {
        "speaker": "Никита",
        "role": "Người yêu động vật",
        "ru": "А ты была в Московском зоопарке? Там можно увидеть бурого медведя и сибирского тигра!",
        "vi": "Thế cậu đã đến Vườn thú Moskva chưa? Ở đó có thể tận mắt ngắm nhìn gấu nâu và hổ Siberia đấy!"
      },
      {
        "speaker": "Марина",
        "role": "Sinh viên sinh học",
        "ru": "Была в прошлые выходные. Это невероятно величественные и красивые дикие животные!",
        "vi": "Mình mới đi cuối tuần trước rồi. Đó thực sự là những loài động vật hoang dã vô cùng uy nghi và xinh đẹp!"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ chuyển động của loài vật",
        "content": "• Chim chóc: «лететь — летать» (Птица летит по небу).\n• Động vật trên cạn: «бежать — бегать» (Собака бегает по парку).\n• Động vật dưới nước: «плыть — плавать» (Рыба плавает в реке)."
      },
      {
        "title": "2. Cặp từ chỉ giống đực — giống cái ở động vật",
        "content": "• Кот (mèo đực) — Кошка (mèo cái).\n• Медведь (gấu đực) — Медведица (gấu cái).\n• Пёс / Собака (chó)."
      }
    ],
    "culturalTip": "Gấu nâu (Медведь) là biểu tượng văn hóa truyền thống của nước Nga, đại diện cho sức mạnh kiên cường, lòng dũng cảm và thiên nhiên hùng vĩ của vùng đất phương Bắc."
  },
  "bo_phan_co_the": {
    "intro": "Miêu tả ngoại hình chân dung (портрет) và trình bày triệu chứng sức khỏe, cảm giác đau đớn khi đi khám bệnh (У меня болит голова/живот) là những tình huống giao tiếp thiết yếu bậc nhất. Nắm vững danh từ chỉ bộ phận cơ thể và tính từ tương hợp giống/số giúp bạn biểu đạt chính xác và tự nhiên.",
    "actionChains": [
      {
        "subTopic": "Bộ phận trên khuôn mặt",
        "items": [
          {
            "target": "Голова́",
            "target_vi": "Đầu",
            "action": "больша́я >< ма́ленькая",
            "action_vi": "to >< nhỏ",
            "place": "",
            "place_vi": "",
            "ex": "У меня́ больша́я голова́.",
            "ex_vi": "Tôi có сái đầu to."
          },
          {
            "target": "Во́лосы",
            "target_vi": "Tóc",
            "action": "дли́нные >< коро́ткие, густы́е >< ре́дкие",
            "action_vi": "dài >< ngắn, dày >< thưa",
            "place": "",
            "place_vi": "",
            "ex": "У неё дли́нные густы́е во́лосы.",
            "ex_vi": "Cô ấy có mái tóc dài dày."
          },
          {
            "target": "Лицо́",
            "target_vi": "Mặt",
            "action": "краси́вое, ма́ленькое >< большо́е",
            "action_vi": "đẹp, nhỏ >< to",
            "place": "",
            "place_vi": "",
            "ex": "У него́ ма́ленькое краси́вое лицо́.",
            "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."
          },
          {
            "target": "Лоб",
            "target_vi": "Trán",
            "action": "высо́кий >< ни́зкий",
            "action_vi": "cao >< thấp",
            "place": "",
            "place_vi": "",
            "ex": "У него́ высо́кий лоб.",
            "ex_vi": "Anh ấy có vầng trán cao."
          },
          {
            "target": "Бро́ви",
            "target_vi": "2 hàng lông mày",
            "action": "гу́стые >< ре́дкие",
            "action_vi": "dày >< thưa",
            "place": "",
            "place_vi": "",
            "ex": "У неё гу́стые бро́ви.",
            "ex_vi": "Cô ấy có hàng lông mày dày."
          },
          {
            "target": "Глаза́",
            "target_vi": "Đôi mắt",
            "action": "больши́е >< ма́ленькие, краси́вые",
            "action_vi": "to >< nhỏ, đẹp",
            "place": "",
            "place_vi": "",
            "ex": "У неё больши́е краси́вые глаза́.",
            "ex_vi": "Cô ấy có đôi mắt to đẹp."
          },
          {
            "target": "Но́с",
            "target_vi": "Mũi",
            "action": "высо́кий >< ни́зкий, прямо́й",
            "action_vi": "cao >< thấp, thẳng",
            "place": "",
            "place_vi": "",
            "ex": "У него́ высо́кий прямо́й нос.",
            "ex_vi": "Anh ấy có chiếc mũi cao thẳng."
          },
          {
            "target": "Щёки",
            "target_vi": "Đôi má",
            "action": "румя́ные",
            "action_vi": "hồng hào",
            "place": "",
            "place_vi": "",
            "ex": "У неё румя́ные щёки.",
            "ex_vi": "Cô ấy có đôi má hồng hào."
          },
          {
            "target": "Рот",
            "target_vi": "Khuôn miệng",
            "action": "ма́ленький, широ́кий",
            "action_vi": "nhỏ, rộng",
            "place": "",
            "place_vi": "",
            "ex": "У неё ма́ленький рот.",
            "ex_vi": "Cô ấy có khuôn miệng nhỏ."
          },
          {
            "target": "Гу́бы",
            "target_vi": "Đôi môi",
            "action": "то́лстые >< то́нкие, краси́вые",
            "action_vi": "dày >< mỏng, đẹp",
            "place": "",
            "place_vi": "",
            "ex": "У неё то́нкие краси́вые гу́бы.",
            "ex_vi": "Cô ấy có đôi môi mỏng đẹp."
          },
          {
            "target": "Зу́бы",
            "target_vi": "Hàm răng",
            "action": "бе́лые, краси́вые, здоро́вые",
            "action_vi": "trắng, đẹp, khỏe",
            "place": "",
            "place_vi": "",
            "ex": "У неё бе́лые здоро́вые зу́бы.",
            "ex_vi": "Cô ấy có hàm răng trắng khỏe."
          },
          {
            "target": "У́ши",
            "target_vi": "Đôi tai",
            "action": "ма́ленькие >< больши́е",
            "action_vi": "nhỏ, to",
            "place": "",
            "place_vi": "",
            "ex": "У него́ ма́ленькие у́ши.",
            "ex_vi": "Anh ấy có đôi tai nhỏ."
          }
        ]
      },
      {
        "subTopic": "Bộ phận trên cơ thể",
        "items": [
          {
            "target": "Голова́",
            "target_vi": "Đầu",
            "action": "больша́я >< ма́ленькая",
            "action_vi": "to >< nhỏ",
            "place": "",
            "place_vi": "",
            "ex": "У меня́ больша́я голова́.",
            "ex_vi": "Tôi có cái đầu to."
          },
          {
            "target": "Ле́вая рука́ >< Пра́вая рука́ - Руки́",
            "target_vi": "Tay trái >< Tay phải - Đôi tay",
            "action": "здоро́вая - здоро́вые\nси́льная - си́льные",
            "action_vi": "khỏe\nmạnh mẽ",
            "place": "",
            "place_vi": "",
            "ex": "У неё здоро́вые и си́льные ру́ки.",
            "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."
          },
          {
            "target": "Ле́вая нога́ >< Пра́вая нога́ - Ноги́",
            "target_vi": "Chân trái >< Chân phải - Đôi chân",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "У него́ здоро́вые и си́льные но́ги.",
            "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"
          },
          {
            "target": "Грудь",
            "target_vi": "Ngực",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "У меня́ боли́т грудь.",
            "ex_vi": "Tôi đang đau ngực."
          },
          {
            "target": "Живо́т",
            "target_vi": "Bụng",
            "action": "",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "У меня́ о́чень боли́т живо́т.",
            "ex_vi": "Tôi đang rất đau bụng"
          },
          {
            "target": "Спина́",
            "target_vi": "Lưng",
            "action": "то́лстая >< то́нкая, широ́кая",
            "action_vi": "dày >< mỏng, rộng",
            "place": "",
            "place_vi": "",
            "ex": "У него́ то́лстая и широ́кая спина́.",
            "ex_vi": "Anh ấy có tấm lưng dày và rộng."
          }
        ]
      },
      {
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi",
        "items": [
          {
            "target": "",
            "target_vi": "",
            "action": "У кого? + что? : ai có cái gì? (nhấn mạnh sự sở hữu)\nУ коко? + нет чего?: ai không có cái gì?",
            "action_vi": "",
            "place": "",
            "place_vi": "",
            "ex": "",
            "ex_vi": ""
          }
        ]
      }
    ],
    "dialogues": [
      {
        "speaker": "Роман",
        "role": "Sinh viên",
        "ru": "Алина, почему ты сегодня такая бледная? Что у тебя случилось?",
        "vi": "Alina ơi, sao hôm nay trông cậu nhợt nhạt thế? Có chuyện gì xảy ra vậy?"
      },
      {
        "speaker": "Алина",
        "role": "Sinh viên",
        "ru": "У меня с самого утра сильно болит голова и першит в горле. Наверное, я простудилась.",
        "vi": "Từ sáng sớm đầu mình đã đau dữ dội và cổ họng bị rát. Chắc là mình bị cảm lạnh rồi."
      },
      {
        "speaker": "Роман",
        "role": "Sinh viên",
        "ru": "Тебе нужно срочно пойти к врачу в студенческую поликлинику!",
        "vi": "Cậu cần phải đi gặp bác sĩ ở phòng khám sinh viên ngay lập tức đi!"
      },
      {
        "speaker": "Алина",
        "role": "Sinh viên",
        "ru": "Да, сейчас выпью горячий чай с лимоном и пойду на приём к терапевту.",
        "vi": "Ừ, bây giờ mình sẽ uống một cốc trà nóng với chanh rồi tới phòng khám bác sĩ đa khoa."
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc sở hữu và miêu tả đặc điểm: «У кого (C2) + Tính từ + Danh từ»",
        "content": "• «У меня большая голова» (Tôi có cái đầu to).\n• «У неё длинные густые волосы» (Cô ấy có mái tóc dài dày).\n• «У него высокий лоб и прямой нос» (Anh ấy có trán cao và mũi thẳng)."
      },
      {
        "title": "2. Cấu trúc diễn đạt triệu chứng đau đớn: «У кого болит / болят что»",
        "content": "• Số ít: «У меня боли́т голова́ / живо́т / горло» (Tôi bị đau đầu / đau bụng / đau họng).\n• Số nhiều: «У меня боля́т зу́бы / ноги́ / глаза́» (Tôi bị đau răng / đau chân / đau mắt)."
      }
    ],
    "culturalTip": "Khi gặp gỡ hoặc tạm biệt người lớn tuổi hoặc phụ nữ tại Nga, cử chỉ bắt tay thường dành cho nam giới với nam giới. Giữ ánh mắt tự tin, mỉm cười nhẹ nhàng và chào hỏi rõ ràng tạo ấn tượng chân thành."
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
