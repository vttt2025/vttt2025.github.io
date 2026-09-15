/* =====================================================================
 * SRS — Spaced Repetition System cho Mishka TRKI
 * Thuật toán lặp lại ngắt quãng theo phong cách Đậu TOEIC:
 *   - Từ mới: Again = xem lại sau 5 thẻ; Hard = 6 giờ; Good = 1 ngày; Easy = 3 ngày.
 *   - Từ đã ôn: nhân khoảng thời gian hiện tại theo ×2 (Hard) / ×3 (Good) / ×4 (Easy).
 *   - Tick "Mastered" đưa từ vào danh sách đã thuộc — không còn nhắc ôn.
 * 4 chế độ học: Flashcard · Gõ từ · Trắc nghiệm · Phát âm.
 * ===================================================================== */

/** Word pool theo cấp CEFR — mỗi từ có ru, vi, transcription, partOfSpeech, example. */
const SRS_WORDS = [
  // ---------- A1 — ТЭУ (sơ cấp) ----------
  { level: "A1", ru: "привет", vi: "xin chào", pos: "thán từ", ex: "Привет! Как дела?" },
  { level: "A1", ru: "здравствуйте", vi: "xin chào (lịch sự)", pos: "thán từ", ex: "Здравствуйте, меня зовут Иван." },
  { level: "A1", ru: "да", vi: "vâng, có", pos: "phó từ", ex: "Да, я согласен." },
  { level: "A1", ru: "нет", vi: "không", pos: "phó từ", ex: "Нет, я не знаю." },
  { level: "A1", ru: "спасибо", vi: "cảm ơn", pos: "danh từ", ex: "Спасибо за помощь!" },
  { level: "A1", ru: "пожалуйста", vi: "làm ơn / không có chi", pos: "phó từ", ex: "Пожалуйста, помогите мне." },
  { level: "A1", ru: "извините", vi: "xin lỗi", pos: "động từ", ex: "Извините, я опоздал." },
  { level: "A1", ru: "я", vi: "tôi", pos: "đại từ", ex: "Я студент." },
  { level: "A1", ru: "ты", vi: "bạn (thân mật)", pos: "đại từ", ex: "Ты мой друг." },
  { level: "A1", ru: "он", vi: "anh ấy", pos: "đại từ", ex: "Он врач." },
  { level: "A1", ru: "она", vi: "cô ấy", pos: "đại từ", ex: "Она учительница." },
  { level: "A1", ru: "мы", vi: "chúng tôi", pos: "đại từ", ex: "Мы из Вьетнама." },
  { level: "A1", ru: "вы", vi: "các bạn / anh chị", pos: "đại từ", ex: "Вы говорите по-русски?" },
  { level: "A1", ru: "они", vi: "họ", pos: "đại từ", ex: "Они дома." },
  { level: "A1", ru: "мама", vi: "mẹ", pos: "danh từ", ex: "Моя мама дома." },
  { level: "A1", ru: "папа", vi: "bố", pos: "danh từ", ex: "Папа работает." },
  { level: "A1", ru: "семья", vi: "gia đình", pos: "danh từ", ex: "У меня большая семья." },
  { level: "A1", ru: "брат", vi: "anh trai / em trai", pos: "danh từ", ex: "Мой брат студент." },
  { level: "A1", ru: "сестра", vi: "chị gái / em gái", pos: "danh từ", ex: "Её сестра — врач." },
  { level: "A1", ru: "друг", vi: "bạn (nam)", pos: "danh từ", ex: "Он мой лучший друг." },
  { level: "A1", ru: "подруга", vi: "bạn (nữ)", pos: "danh từ", ex: "Моя подруга живёт в Москве." },
  { level: "A1", ru: "вода", vi: "nước (uống)", pos: "danh từ", ex: "Я хочу воды." },
  { level: "A1", ru: "чай", vi: "trà", pos: "danh từ", ex: "Я люблю горячий чай." },
  { level: "A1", ru: "кофе", vi: "cà phê", pos: "danh từ", ex: "Утром я пью кофе." },
  { level: "A1", ru: "хлеб", vi: "bánh mì", pos: "danh từ", ex: "Купи хлеб, пожалуйста." },
  { level: "A1", ru: "молоко", vi: "sữa", pos: "danh từ", ex: "Дайте мне молоко." },
  { level: "A1", ru: "мясо", vi: "thịt", pos: "danh từ", ex: "Я не ем мясо." },
  { level: "A1", ru: "рыба", vi: "cá", pos: "danh từ", ex: "Рыба полезна для здоровья." },
  { level: "A1", ru: "яблоко", vi: "quả táo", pos: "danh từ", ex: "Дай мне яблоко." },
  { level: "A1", ru: "дом", vi: "nhà", pos: "danh từ", ex: "Мой дом большой." },
  { level: "A1", ru: "квартира", vi: "căn hộ", pos: "danh từ", ex: "У меня новая квартира." },
  { level: "A1", ru: "комната", vi: "căn phòng", pos: "danh từ", ex: "В комнате стол и стул." },
  { level: "A1", ru: "стол", vi: "cái bàn", pos: "danh từ", ex: "На столе лежит книга." },
  { level: "A1", ru: "стул", vi: "cái ghế", pos: "danh từ", ex: "Это мой стул." },
  { level: "A1", ru: "окно", vi: "cửa sổ", pos: "danh từ", ex: "Открой окно." },
  { level: "A1", ru: "дверь", vi: "cửa ra vào", pos: "danh từ", ex: "Закрой дверь." },
  { level: "A1", ru: "город", vi: "thành phố", pos: "danh từ", ex: "Москва — большой город." },
  { level: "A1", ru: "улица", vi: "đường phố", pos: "danh từ", ex: "На улице холодно." },
  { level: "A1", ru: "школа", vi: "trường học", pos: "danh từ", ex: "Я иду в школу." },
  { level: "A1", ru: "работа", vi: "công việc", pos: "danh từ", ex: "У меня много работы." },
  { level: "A1", ru: "быть", vi: "thì, là (có)", pos: "động từ", ex: "Я студент." },
  { level: "A1", ru: "иметь", vi: "có", pos: "động từ", ex: "У меня есть брат." },
  { level: "A1", ru: "знать", vi: "biết", pos: "động từ", ex: "Я знаю этого человека." },
  { level: "A1", ru: "говорить", vi: "nói", pos: "động từ", ex: "Она говорит по-русски." },
  { level: "A1", ru: "читать", vi: "đọc", pos: "động từ", ex: "Я люблю читать книги." },
  { level: "A1", ru: "писать", vi: "viết", pos: "động từ", ex: "Он пишет письмо." },
  { level: "A1", ru: "видеть", vi: "nhìn thấy", pos: "động từ", ex: "Я вижу красивый дом." },
  { level: "A1", ru: "слышать", vi: "nghe thấy", pos: "động từ", ex: "Я слышу музыку." },
  { level: "A1", ru: "идти", vi: "đi (bộ)", pos: "động từ", ex: "Я иду в школу." },
  { level: "A1", ru: "ехать", vi: "đi (xe)", pos: "động từ", ex: "Мы едем в Москву." },
  { level: "A1", ru: "хотеть", vi: "muốn", pos: "động từ", ex: "Я хочу пить." },
  { level: "A1", ru: "мочь", vi: "có thể", pos: "động từ", ex: "Я могу помочь." },
  { level: "A1", ru: "большой", vi: "to, lớn", pos: "tính từ", ex: "Это большой дом." },
  { level: "A1", ru: "маленький", vi: "nhỏ, bé", pos: "tính từ", ex: "У меня маленькая собака." },
  { level: "A1", ru: "новый", vi: "mới", pos: "tính từ", ex: "Это мой новый телефон." },
  { level: "A1", ru: "старый", vi: "cũ", pos: "tính từ", ex: "Это старый дом." },
  { level: "A1", ru: "хороший", vi: "tốt", pos: "tính từ", ex: "Хорошая погода!" },
  { level: "A1", ru: "плохой", vi: "xấu, tệ", pos: "tính từ", ex: "Сегодня плохая погода." },
  { level: "A1", ru: "красивый", vi: "đẹp", pos: "tính từ", ex: "Какая красивая девушка!" },
  { level: "A1", ru: "интересный", vi: "thú vị", pos: "tính từ", ex: "Это интересный фильм." },
  { level: "A1", ru: "трудный", vi: "khó", pos: "tính từ", ex: "Это трудный вопрос." },
  { level: "A1", ru: "лёгкий", vi: "dễ, nhẹ", pos: "tính từ", ex: "Это лёгкий тест." },
  { level: "A1", ru: "сегодня", vi: "hôm nay", pos: "phó từ", ex: "Сегодня холодно." },
  { level: "A1", ru: "вчера", vi: "hôm qua", pos: "phó từ", ex: "Вчера был дождь." },
  { level: "A1", ru: "завтра", vi: "ngày mai", pos: "phó từ", ex: "Завтра у меня экзамен." },
  { level: "A1", ru: "сейчас", vi: "bây giờ", pos: "phó từ", ex: "Сейчас три часа." },
  { level: "A1", ru: "здесь", vi: "ở đây", pos: "phó từ", ex: "Я живу здесь." },
  { level: "A1", ru: "там", vi: "ở đó", pos: "phó từ", ex: "Мой друг там." },
  { level: "A1", ru: "один", vi: "một", pos: "số từ", ex: "У меня один брат." },
  { level: "A1", ru: "два", vi: "hai", pos: "số từ", ex: "У меня два кота." },
  { level: "A1", ru: "три", vi: "ba", pos: "số từ", ex: "Три плюс два — пять." },
  { level: "A1", ru: "пять", vi: "năm", pos: "số từ", ex: "У меня пять книг." },
  { level: "A1", ru: "десять", vi: "mười", pos: "số từ", ex: "Десять минут." },

  // ---------- A2 — ТЭУ/TBУ (sơ trung cấp) ----------
  { level: "A2", ru: "работать", vi: "làm việc", pos: "động từ", ex: "Я работаю в школе." },
  { level: "A2", ru: "учиться", vi: "học tập", pos: "động từ", ex: "Он учится в университете." },
  { level: "A2", ru: "покупать", vi: "mua", pos: "động từ", ex: "Я покупаю продукты." },
  { level: "A2", ru: "продавать", vi: "bán", pos: "động từ", ex: "Он продаёт машину." },
  { level: "A2", ru: "готовить", vi: "nấu ăn", pos: "động từ", ex: "Мама готовит ужин." },
  { level: "A2", ru: "убирать", vi: "dọn dẹp", pos: "động từ", ex: "Я убираю квартиру." },
  { level: "A2", ru: "отдыхать", vi: "nghỉ ngơi", pos: "động từ", ex: "Летом я отдыхаю на море." },
  { level: "A2", ru: "путешествовать", vi: "du lịch", pos: "động từ", ex: "Мы любим путешествовать." },
  { level: "A2", ru: "встречать", vi: "gặp gỡ", pos: "động từ", ex: "Я встречаю друга в кафе." },
  { level: "A2", ru: "звонить", vi: "gọi điện", pos: "động từ", ex: "Позвони мне вечером." },
  { level: "A2", ru: "помогать", vi: "giúp đỡ", pos: "động từ", ex: "Помоги мне, пожалуйста." },
  { level: "A2", ru: "объяснять", vi: "giải thích", pos: "động từ", ex: "Учитель объясняет правило." },
  { level: "A2", ru: "переводить", vi: "dịch", pos: "động từ", ex: "Переведите этот текст." },
  { level: "A2", ru: "запоминать", vi: "ghi nhớ", pos: "động từ", ex: "Я быстро запоминаю слова." },
  { level: "A2", ru: "забывать", vi: "quên", pos: "động từ", ex: "Не забывай ключи!" },
  { level: "A2", ru: "начинать", vi: "bắt đầu", pos: "động từ", ex: "Я начинаю работу в 9 часов." },
  { level: "A2", ru: "заканчивать", vi: "kết thúc", pos: "động từ", ex: "Когда заканчиваешь?" },
  { level: "A2", ru: "продолжать", vi: "tiếp tục", pos: "động từ", ex: "Продолжай говорить." },
  { level: "A2", ru: "возвращаться", vi: "quay lại, trở về", pos: "động từ", ex: "Я возвращаюсь домой." },
  { level: "A2", ru: "уезжать", vi: "đi xa (rời đi)", pos: "động từ", ex: "Завтра я уезжаю в Москву." },
  { level: "A2", ru: "приезжать", vi: "đến nơi (bằng xe)", pos: "động từ", ex: "Мы приезжаем в шесть часов." },
  { level: "A2", ru: "одежда", vi: "quần áo", pos: "danh từ", ex: "Эта одежда дорогая." },
  { level: "A2", ru: "обувь", vi: "giày dép", pos: "danh từ", ex: "Мне нужна новая обувь." },
  { level: "A2", ru: "куртка", vi: "áo khoác", pos: "danh từ", ex: "Надень куртку, холодно." },
  { level: "A2", ru: "шапка", vi: "mũ len", pos: "danh từ", ex: "Зимой я ношу шапку." },
  { level: "A2", ru: "пальто", vi: "áo măng tô", pos: "danh từ", ex: "У меня красивое пальто." },
  { level: "A2", ru: "чемодан", vi: "vali", pos: "danh từ", ex: "Собери чемодан." },
  { level: "A2", ru: "билет", vi: "vé", pos: "danh từ", ex: "Купи билет на поезд." },
  { level: "A2", ru: "паспорт", vi: "hộ chiếu", pos: "danh từ", ex: "Покажите ваш паспорт." },
  { level: "A2", ru: "виза", vi: "visa", pos: "danh từ", ex: "Мне нужна виза в Россию." },
  { level: "A2", ru: "аэропорт", vi: "sân bay", pos: "danh từ", ex: "Аэропорт далеко." },
  { level: "A2", ru: "самолёт", vi: "máy bay", pos: "danh từ", ex: "Самолёт летит в Москву." },
  { level: "A2", ru: "поезд", vi: "tàu hỏa", pos: "danh từ", ex: "Поезд приходит в семь." },
  { level: "A2", ru: "автобус", vi: "xe buýt", pos: "danh từ", ex: "Я еду на автобусе." },
  { level: "A2", ru: "такси", vi: "taxi", pos: "danh từ", ex: "Вызови мне такси." },
  { level: "A2", ru: "отель", vi: "khách sạn", pos: "danh từ", ex: "Отель в центре города." },
  { level: "A2", ru: "компьютер", vi: "máy tính", pos: "danh từ", ex: "Мой компьютер сломался." },
  { level: "A2", ru: "телефон", vi: "điện thoại", pos: "danh từ", ex: "Где мой телефон?" },
  { level: "A2", ru: "интернет", vi: "internet", pos: "danh từ", ex: "У меня дома быстрый интернет." },
  { level: "A2", ru: "погода", vi: "thời tiết", pos: "danh từ", ex: "Какая сегодня погода?" },
  { level: "A2", ru: "температура", vi: "nhiệt độ", pos: "danh từ", ex: "Температура минус пять." },
  { level: "A2", ru: "солнце", vi: "mặt trời", pos: "danh từ", ex: "Солнце светит ярко." },
  { level: "A2", ru: "дождь", vi: "mưa", pos: "danh từ", ex: "Идёт сильный дождь." },
  { level: "A2", ru: "снег", vi: "tuyết", pos: "danh từ", ex: "Зимой идёт снег." },
  { level: "A2", ru: "ветер", vi: "gió", pos: "danh từ", ex: "Сильный ветер на улице." },
  { level: "A2", ru: "здоровье", vi: "sức khỏe", pos: "danh từ", ex: "Здоровье важнее работы." },
  { level: "A2", ru: "врач", vi: "bác sĩ", pos: "danh từ", ex: "Я иду к врачу." },
  { level: "A2", ru: "больница", vi: "bệnh viện", pos: "danh từ", ex: "Больница рядом с домом." },
  { level: "A2", ru: "аптека", vi: "hiệu thuốc", pos: "danh từ", ex: "Аптека работает до 22:00." },
  { level: "A2", ru: "лекарство", vi: "thuốc", pos: "danh từ", ex: "Возьми это лекарство." },
  { level: "A2", ru: "продукты", vi: "thực phẩm (số nhiều)", pos: "danh từ", ex: "Купи продукты в магазине." },
  { level: "A2", ru: "магазин", vi: "cửa hàng", pos: "danh từ", ex: "Магазин закрыт." },
  { level: "A2", ru: "рынок", vi: "chợ", pos: "danh từ", ex: "Дешёвые фрукты на рынке." },
  { level: "A2", ru: "ресторан", vi: "nhà hàng", pos: "danh từ", ex: "Мы ужинали в ресторане." },
  { level: "A2", ru: "кафе", vi: "quán cà phê", pos: "danh từ", ex: "Давай встретимся в кафе." },
  { level: "A2", ru: "деньги", vi: "tiền", pos: "danh từ", ex: "У меня нет денег." },
  { level: "A2", ru: "цена", vi: "giá", pos: "danh từ", ex: "Какая цена?" },
  { level: "A2", ru: "скидка", vi: "giảm giá", pos: "danh từ", ex: "Здесь большая скидка." },

  // ---------- B1 — ТРКИ-1 (trung cấp) ----------
  { level: "B1", ru: "достижение", vi: "thành tựu", pos: "danh từ", ex: "Это моё главное достижение." },
  { level: "B1", ru: "возможность", vi: "cơ hội, khả năng", pos: "danh từ", ex: "У меня есть возможность поехать." },
  { level: "B1", ru: "трудность", vi: "khó khăn", pos: "danh từ", ex: "Я преодолел трудности." },
  { level: "B1", ru: "успех", vi: "thành công", pos: "danh từ", ex: "Желаю успехов!" },
  { level: "B1", ru: "неудача", vi: "thất bại", pos: "danh từ", ex: "Неудача — это опыт." },
  { level: "B1", ru: "опыт", vi: "kinh nghiệm", pos: "danh từ", ex: "У меня большой опыт работы." },
  { level: "B1", ru: "знание", vi: "kiến thức", pos: "danh từ", ex: "Знания — это сила." },
  { level: "B1", ru: "образование", vi: "giáo dục", pos: "danh từ", ex: "Образование играет важную роль." },
  { level: "B1", ru: "карьера", vi: "sự nghiệp", pos: "danh từ", ex: "Он сделал блестящую карьеру." },
  { level: "B1", ru: "собеседование", vi: "phỏng vấn", pos: "danh từ", ex: "Завтра у меня собеседование." },
  { level: "B1", ru: "сотрудник", vi: "đồng nghiệp", pos: "danh từ", ex: "Он мой коллега и сотрудник." },
  { level: "B1", ru: "начальник", vi: "sếp", pos: "danh từ", ex: "Мой начальник строгий." },
  { level: "B1", ru: "подчинённый", vi: "nhân viên dưới quyền", pos: "danh từ", ex: "У неё десять подчинённых." },
  { level: "B1", ru: "зарплата", vi: "lương", pos: "danh từ", ex: "Зарплата выплачивается вовремя." },
  { level: "B1", ru: "смена", vi: "ca (làm việc)", pos: "danh từ", ex: "Сегодня ночная смена." },
  { level: "B1", ru: "отпуск", vi: "kỳ nghỉ", pos: "danh từ", ex: "Я в отпуске." },
  { level: "B1", ru: "совещание", vi: "cuộc họp", pos: "danh từ", ex: "Совещание начнётся в десять." },
  { level: "B1", ru: "проект", vi: "dự án", pos: "danh từ", ex: "Новый проект сложный." },
  { level: "B1", ru: "отчёт", vi: "báo cáo", pos: "danh từ", ex: "Сдай отчёт до пятницы." },
  { level: "B1", ru: "предложение", vi: "đề nghị / câu", pos: "danh từ", ex: "У меня есть предложение." },
  { level: "B1", ru: "соглашение", vi: "thỏa thuận", pos: "danh từ", ex: "Мы подписали соглашение." },
  { level: "B1", ru: "договор", vi: "hợp đồng", pos: "danh từ", ex: "Договор действителен год." },
  { level: "B1", ru: "условие", vi: "điều kiện", pos: "danh từ", ex: "Назовите ваши условия." },
  { level: "B1", ru: "требование", vi: "yêu cầu", pos: "danh từ", ex: "Все требования выполнены." },
  { level: "B1", ru: "ответственность", vi: "trách nhiệm", pos: "danh từ", ex: "Это моя ответственность." },
  { level: "B1", ru: "уверенность", vi: "sự tự tin", pos: "danh từ", ex: "Говори с уверенностью." },
  { level: "B1", ru: "сомнение", vi: "sự nghi ngờ", pos: "danh từ", ex: "У меня есть сомнения." },
  { level: "B1", ru: "решение", vi: "quyết định / giải pháp", pos: "danh từ", ex: "Я принял решение." },
  { level: "B1", ru: "выбор", vi: "sự lựa chọn", pos: "danh từ", ex: "Сделай свой выбор." },
  { level: "B1", ru: "привычка", vi: "thói quen", pos: "danh từ", ex: "Это хорошая привычка." },
  { level: "B1", ru: "традиция", vi: "truyền thống", pos: "danh từ", ex: "Русские традиции интересны." },
  { level: "B1", ru: "обычай", vi: "phong tục", pos: "danh từ", ex: "Это древний обычай." },
  { level: "B1", ru: "праздник", vi: "ngày lễ", pos: "danh từ", ex: "С Новым годом! С праздником!" },
  { level: "B1", ru: "поздравлять", vi: "chúc mừng", pos: "động từ", ex: "Поздравляю с днём рождения!" },
  { level: "B1", ru: "приглашать", vi: "mời", pos: "động từ", ex: "Я приглашаю тебя на ужин." },
  { level: "B1", ru: "знакомиться", vi: "làm quen", pos: "động từ", ex: "Приятно познакомиться!" },
  { level: "B1", ru: "договариваться", vi: "thỏa thuận", pos: "động từ", ex: "Мы договорились о встрече." },
  { level: "B1", ru: "соглашаться", vi: "đồng ý", pos: "động từ", ex: "Я согласен с тобой." },
  { level: "B1", ru: "отказываться", vi: "từ chối", pos: "động từ", ex: "Он отказался от помощи." },
  { level: "B1", ru: "предлагать", vi: "đề nghị", pos: "động từ", ex: "Предлагаю пойти в кино." },
  { level: "B1", ru: "обсуждать", vi: "thảo luận", pos: "động từ", ex: "Давай обсудим этот вопрос." },
  { level: "B1", ru: "спорить", vi: "tranh luận", pos: "động từ", ex: "Не спорь со мной." },
  { level: "B1", ru: "убеждать", vi: "thuyết phục", pos: "động từ", ex: "Она убедила меня поехать." },
  { level: "B1", ru: "убедить", vi: "thuyết phục (HT)", pos: "động từ", ex: "Я убедил его остаться." },
  { level: "B1", ru: "добиваться", vi: "đạt được, giành được", pos: "động từ", ex: "Он добился успеха." },
  { level: "B1", ru: "стараться", vi: "cố gắng", pos: "động từ", ex: "Старайся больше!" },
  { level: "B1", ru: "пытаться", vi: "cố thử", pos: "động từ", ex: "Я пытаюсь понять." },
  { level: "B1", ru: "откладывать", vi: "trì hoãn", pos: "động từ", ex: "Не откладывай на завтра." },
  { level: "B1", ru: "планировать", vi: "lên kế hoạch", pos: "động từ", ex: "Мы планируем поездку." },
  { level: "B1", ru: "организовать", vi: "tổ chức", pos: "động từ", ex: "Он организовал встречу." },
  { level: "B1", ru: "управлять", vi: "quản lý, điều khiển", pos: "động từ", ex: "Она управляет компанией." },
  { level: "B1", ru: "руководить", vi: "lãnh đạo", pos: "động từ", ex: "Он руководит отделом." },
  { level: "B1", ru: "влиять", vi: "ảnh hưởng", pos: "động từ", ex: "Это влияет на решение." },
  { level: "B1", ru: "зависеть", vi: "phụ thuộc", pos: "động từ", ex: "Всё зависит от погоды." },
  { level: "B1", ru: "использовать", vi: "sử dụng", pos: "động từ", ex: "Используй эту возможность." },

  // ---------- B2 — ТРКИ-2 (trung cao cấp) ----------
  { level: "B2", ru: "совершенствовать", vi: "hoàn thiện", pos: "động từ", ex: "Он совершенствует навыки." },
  { level: "B2", ru: "преодолевать", vi: "vượt qua", pos: "động từ", ex: "Мы преодолеваем трудности." },
  { level: "B2", ru: "достигать", vi: "đạt tới", pos: "động từ", ex: "Она достигла своей цели." },
  { level: "B2", ru: "приобретать", vi: "có được, mua được", pos: "động từ", ex: "Я приобрёл новый опыт." },
  { level: "B2", ru: "поддерживать", vi: "hỗ trợ, duy trì", pos: "động từ", ex: "Спасибо за поддержку." },
  { level: "B2", ru: "обеспечивать", vi: "đảm bảo, cung cấp", pos: "động từ", ex: "Это обеспечивает безопасность." },
  { level: "B2", ru: "предотвращать", vi: "ngăn chặn", pos: "động từ", ex: "Нужно предотвратить ошибку." },
  { level: "B2", ru: "содействовать", vi: "giúp đỡ, hỗ trợ", pos: "động từ", ex: "Я содействую проекту." },
  { level: "B2", ru: "сотрудничать", vi: "hợp tác", pos: "động từ", ex: "Мы сотрудничаем с компанией." },
  { level: "B2", ru: "конкурировать", vi: "cạnh tranh", pos: "động từ", ex: "Фирмы конкурируют на рынке." },
  { level: "B2", ru: "развиваться", vi: "phát triển", pos: "động từ", ex: "Город быстро развивается." },
  { level: "B2", ru: "расширять", vi: "mở rộng", pos: "động từ", ex: "Компания расширяет рынок." },
  { level: "B2", ru: "сокращать", vi: "cắt giảm, rút ngắn", pos: "động từ", ex: "Нужно сократить расходы." },
  { level: "B2", ru: "увеличивать", vi: "tăng", pos: "động từ", ex: "Увеличивай скорость." },
  { level: "B2", ru: "уменьшать", vi: "giảm", pos: "động từ", ex: "Уменьшай расходы." },
  { level: "B2", ru: "повышать", vi: "nâng cao", pos: "động từ", ex: "Повышай качество." },
  { level: "B2", ru: "понижать", vi: "hạ thấp", pos: "động từ", ex: "Не понижай оценку." },
  { level: "B2", ru: "предполагать", vi: "giả định, cho rằng", pos: "động từ", ex: "Я предполагаю, что он прав." },
  { level: "B2", ru: "подразумевать", vi: "hàm ý", pos: "động từ", ex: "Что вы подразумеваете?" },
  { level: "B2", ru: "осознавать", vi: "nhận thức", pos: "động từ", ex: "Он осознал свою ошибку." },
  { level: "B2", ru: "признавать", vi: "thừa nhận", pos: "động từ", ex: "Признаю, что был неправ." },
  { level: "B2", ru: "подтверждать", vi: "xác nhận", pos: "động từ", ex: "Подтвердите бронирование." },
  { level: "B2", ru: "опровергать", vi: "bác bỏ", pos: "động từ", ex: "Он опроверг обвинение." },
  { level: "B2", ru: "доказывать", vi: "chứng minh", pos: "động từ", ex: "Докажи свою правоту." },
  { level: "B2", ru: "аргументировать", vi: "lập luận", pos: "động từ", ex: "Аргументируй своё мнение." },
  { level: "B2", ru: "анализировать", vi: "phân tích", pos: "động từ", ex: "Анализируй ситуацию." },
  { level: "B2", ru: "оценивать", vi: "đánh giá", pos: "động từ", ex: "Оцени свои силы." },
  { level: "B2", ru: "сравнивать", vi: "so sánh", pos: "động từ", ex: "Сравни два варианта." },
  { level: "B2", ru: "сопоставлять", vi: "đối chiếu", pos: "động từ", ex: "Сопоставьте факты." },
  { level: "B2", ru: "интерпретировать", vi: "diễn giải", pos: "động từ", ex: "Как интерпретировать эти данные?" },
  { level: "B2", ru: "формулировать", vi: "diễn đạt, phát biểu", pos: "động từ", ex: "Сформулируй мысль точно." },
  { level: "B2", ru: "определять", vi: "xác định", pos: "động từ", ex: "Определи цель." },
  { level: "B2", ru: "устанавливать", vi: "thiết lập", pos: "động từ", ex: "Установи правила." },
  { level: "B2", ru: "формировать", vi: "hình thành", pos: "động từ", ex: "Мнение формируется годами." },
  { level: "B2", ru: "преобразовывать", vi: "cải biến, chuyển đổi", pos: "động từ", ex: "Нужно преобразовать систему." },
  { level: "B2", ru: "внедрять", vi: "áp dụng, đưa vào", pos: "động từ", ex: "Внедряй новые технологии." },
  { level: "B2", ru: "оспаривать", vi: "tranh cãi, bác bỏ", pos: "động từ", ex: "Не оспаривай факты." },
  { level: "B2", ru: "придерживаться", vi: "tuân theo", pos: "động từ", ex: "Придерживайся диеты." },
  { level: "B2", ru: "руководствоваться", vi: "lấy làm hướng dẫn", pos: "động từ", ex: "Руководствуйся здравым смыслом." },
  { level: "B2", ru: "стремиться", vi: "phấn đấu", pos: "động từ", ex: "Он стремится к успеху." },
  { level: "B2", ru: "намереваться", vi: "có ý định", pos: "động từ", ex: "Я намереваюсь уехать." },
  { level: "B2", ru: "обязываться", vi: "cam kết", pos: "động từ", ex: "Я обязуюсь помочь." },
  { level: "B2", ru: "вынуждать", vi: "buộc phải", pos: "động từ", ex: "Обстоятельства вынуждают уехать." },
  { level: "B2", ru: "склонять", vi: "xiên, nghiêng; thuyết phục", pos: "động từ", ex: "Это склоняет к выводу." },

  // ---------- C1 — ТРКИ-3 (cao cấp) ----------
  { level: "C1", ru: "самосознание", vi: "ý thức về bản thân", pos: "danh từ", ex: "Самосознание формируется с возрастом." },
  { level: "C1", ru: "мировоззрение", vi: "thế giới quan", pos: "danh từ", ex: "У него научное мировоззрение." },
  { level: "C1", ru: "предрассудок", vi: "thành kiến", pos: "danh từ", ex: "Боритесь с предрассудками." },
  { level: "C1", ru: "недоразумение", vi: "sự hiểu lầm", pos: "danh từ", ex: "Произошло недоразумение." },
  { level: "C1", ru: "благоразумие", vi: "sự khôn ngoan", pos: "danh từ", ex: "Прояви благоразумие." },
  { level: "C1", ru: "невозмутимость", vi: "sự bình thản", pos: "danh từ", ex: "Его невозмутимость удивляет." },
  { level: "C1", ru: "самоотверженность", vi: "sự hy sinh", pos: "danh từ", ex: "Он проявил самоотверженность." },
  { level: "C1", ru: "непреклонность", vi: "sự cứng rắn", pos: "danh từ", ex: "Её непреклонность помогла." },
  { level: "C1", ru: "легкомыслие", vi: "sự nhẹ dạ", pos: "danh từ", ex: "Не допускай легкомыслия." },
  { level: "C1", ru: "неосмотрительность", vi: "sự thiếu thận trọng", pos: "danh từ", ex: "Это была моя неосмотрительность." },
  { level: "C1", ru: "предусмотрительность", vi: "sự biết trước, dự phòng", pos: "danh từ", ex: "Предусмотрительность спасает." },
  { level: "C1", ru: "незаурядный", vi: "xuất sắc, phi thường", pos: "tính từ", ex: "У него незаурядный ум." },
  { level: "C1", ru: "незаменимый", vi: "không thể thay thế", pos: "tính từ", ex: "Он незаменимый сотрудник." },
  { level: "C1", ru: "непревзойдённый", vi: "không ai sánh được", pos: "tính từ", ex: "Непревзойдённый мастер." },
  { level: "C1", ru: "неоценимый", vi: "vô giá", pos: "tính từ", ex: "Ваша помощь неоценима." },
  { level: "C1", ru: "неоспоримый", vi: "không thể chối cãi", pos: "tính từ", ex: "Факт неоспорим." },
  { level: "C1", ru: "неизбежный", vi: "không thể tránh khỏi", pos: "tính từ", ex: "Это неизбежный исход." },
  { level: "C1", ru: "нелепый", vi: "ngớ ngẩn", pos: "tính từ", ex: "Нелепая ситуация." },
  { level: "C1", ru: "невыносимый", vi: "không thể chịu nổi", pos: "tính từ", ex: "Невыносимая боль." },
  { level: "C1", ru: "незатейливый", vi: "đơn giản, mộc mạc", pos: "tính từ", ex: "Незатейливый ужин." },
  { level: "C1", ru: "необузданный", vi: "bất kham, hoang dã", pos: "tính từ", ex: "Необузданная фантазия." },
  { level: "C1", ru: "опрометчивый", vi: "thiếu thận trọng", pos: "tính từ", ex: "Опрометчивое решение." },
  { level: "C1", ru: "вопиющий", vi: "gây phẫn nộ, lố bịch", pos: "tính từ", ex: "Вопиющая несправедливость." },
  { level: "C1", ru: "расторопный", vi: "nhanh nhẹn, hoạt bát", pos: "tính từ", ex: "Расторопный продавец." },
  { level: "C1", ru: "сметливый", vi: "nhanh trí, khéo léo", pos: "tính từ", ex: "Сметливый ученик." },
  { level: "C1", ru: "смышлёный", vi: "thông minh, lanh lợi", pos: "tính từ", ex: "Смышлёный ребёнок." },
  { level: "C1", ru: "находчивый", vi: "ứng biến nhanh", pos: "tính từ", ex: "Он очень находчив." },
  { level: "C1", ru: "взвесить", vi: "cân nhắc kỹ", pos: "động từ", ex: "Взвесь все за и против." },
  { level: "C1", ru: "постигать", vi: "thấu hiểu, nắm bắt", pos: "động từ", ex: "Постигать смысл жизни." },
  { level: "C1", ru: "постичь", vi: "thấu hiểu (HT)", pos: "động từ", ex: "Он постиг эту науку." },
  { level: "C1", ru: "вникать", vi: "đi sâu vào", pos: "động từ", ex: "Вникай в суть проблемы." },
  { level: "C1", ru: "уразуметь", vi: "hiểu thấu", pos: "động từ", ex: "Я уразумел его мысль." },
  { level: "C1", ru: "воспринимать", vi: "tiếp nhận, cảm nhận", pos: "động từ", ex: "Воспринимай информацию критически." },
  { level: "C1", ru: "осмыслить", vi: "hiểu rõ ý nghĩa", pos: "động từ", ex: "Осмысли произошедшее." },
  { level: "C1", ru: "осмыслять", vi: "hiểu rõ ý nghĩa (CHT)", pos: "động từ", ex: "Я долго осмыслял это." },
  { level: "C1", ru: "претворять", vi: "thực hiện, hiện thực hóa", pos: "động từ", ex: "Претворить план в жизнь." },
  { level: "C1", ru: "воплощать", vi: "hiện thực hóa", pos: "động từ", ex: "Воплощать мечту в реальность." },
  { level: "C1", ru: "навлекать", vi: "gây ra (điều xấu)", pos: "động từ", ex: "Не навлекай на себя беду." },
  { level: "C1", ru: "посягать", vi: "xâm phạm, đụng chạm", pos: "động từ", ex: "Не посягай на чужое." },
  { level: "C1", ru: "предвосхищать", vi: "đón trước", pos: "động từ", ex: "Предвосхищай события." },
  { level: "C1", ru: "препятствовать", vi: "cản trở", pos: "động từ", ex: "Не препятствуй мне." },
  { level: "C1", ru: "благоприятствовать", vi: "thuận lợi cho", pos: "động từ", ex: "Погода благоприятствовала." },
  { level: "C1", ru: "бездействовать", vi: "không hành động", pos: "động từ", ex: "Нельзя бездействовать." },
  { level: "C1", ru: "безотлагательно", vi: "không trì hoãn", pos: "phó từ", ex: "Действуй безотлагательно." },
  { level: "C1", ru: "бесповоротно", vi: "không thể thay đổi", pos: "phó từ", ex: "Бесповоротно решил." },

  // ---------- BỔ SUNG: SỐ ĐẾM & THỜI GIAN ----------
  { level: "A1", ru: "сто", vi: "một trăm", pos: "số từ", ex: "Сто рублей." },
  { level: "A1", ru: "тысяча", vi: "một nghìn", pos: "số từ", ex: "Тысяча человек." },
  { level: "A1", ru: "миллион", vi: "một triệu", pos: "số từ", ex: "Миллион причин." },
  { level: "A1", ru: "первый", vi: "thứ nhất", pos: "số từ", ex: "Первый этаж." },
  { level: "A1", ru: "второй", vi: "thứ hai", pos: "số từ", ex: "Второй автобус." },
  { level: "A1", ru: "третий", vi: "thứ ba", pos: "số từ", ex: "Третий раз." },
  { level: "A1", ru: "последний", vi: "cuối cùng", pos: "tính từ", ex: "Последний шанс." },
  { level: "A1", ru: "час", vi: "giờ", pos: "danh từ nam", ex: "Который час?" },
  { level: "A1", ru: "минута", vi: "phút", pos: "danh từ nữ", ex: "Подожди минуту." },
  { level: "A1", ru: "секунда", vi: "giây", pos: "danh từ nữ", ex: "Одна секунда!" },
  { level: "A1", ru: "день", vi: "ngày", pos: "danh từ nam", ex: "Добрый день!" },
  { level: "A1", ru: "неделя", vi: "tuần", pos: "danh từ nữ", ex: "На этой неделе." },
  { level: "A1", ru: "месяц", vi: "tháng", pos: "danh từ nam", ex: "В этом месяце." },
  { level: "A1", ru: "год", vi: "năm", pos: "danh từ nam", ex: "Каждый год." },
  { level: "A1", ru: "утро", vi: "buổi sáng", pos: "danh từ trung", ex: "Доброе утро!" },
  { level: "A1", ru: "вечер", vi: "buổi tối", pos: "danh từ nam", ex: "Добрый вечер!" },
  { level: "A1", ru: "ночь", vi: "đêm", pos: "danh từ nữ", ex: "Спокойной ночи!" },
  { level: "A1", ru: "понедельник", vi: "thứ Hai", pos: "danh từ nam", ex: "В понедельник у меня экзамен." },
  { level: "A1", ru: "вторник", vi: "thứ Ba", pos: "danh từ nam", ex: "Во вторник мы встречаемся." },
  { level: "A1", ru: "среда", vi: "thứ Tư", pos: "danh từ nữ", ex: "В среду я свободен." },
  { level: "A1", ru: "четверг", vi: "thứ Năm", pos: "danh từ nam", ex: "Четверг — мой любимый день." },
  { level: "A1", ru: "пятница", vi: "thứ Sáu", pos: "danh từ nữ", ex: "Пятница, вечер." },
  { level: "A1", ru: "суббота", vi: "thứ Bảy", pos: "danh từ nữ", ex: "В субботу мы отдыхаем." },
  { level: "A1", ru: "воскресенье", vi: "Chủ Nhật", pos: "danh từ trung", ex: "Воскресенье — выходной." },
  { level: "A1", ru: "январь", vi: "tháng Một", pos: "danh từ nam", ex: "Январь — холодный месяц." },
  { level: "A1", ru: "лето", vi: "mùa hè", pos: "danh từ trung", ex: "Летом жарко." },
  { level: "A1", ru: "зима", vi: "mùa đông", pos: "danh từ nữ", ex: "Зимой холодно." },
  { level: "A1", ru: "весна", vi: "mùa xuân", pos: "danh từ nữ", ex: "Весной всё цветёт." },
  { level: "A1", ru: "осень", vi: "mùa thu", pos: "danh từ nữ", ex: "Осенью листья жёлтые." },

  // ---------- BỔ SUNG: MÀU SẮC ----------
  { level: "A1", ru: "красный", vi: "đỏ", pos: "tính từ", ex: "Красная роза." },
  { level: "A1", ru: "синий", vi: "xanh dương", pos: "tính từ", ex: "Синее небо." },
  { level: "A1", ru: "зелёный", vi: "xanh lá", pos: "tính từ", ex: "Зелёная трава." },
  { level: "A1", ru: "жёлтый", vi: "vàng", pos: "tính từ", ex: "Жёлтый цвет." },
  { level: "A1", ru: "белый", vi: "trắng", pos: "tính từ", ex: "Белый снег." },
  { level: "A1", ru: "чёрный", vi: "đen", pos: "tính từ", ex: "Чёрный кофе." },
  { level: "A1", ru: "серый", vi: "xám", pos: "tính từ", ex: "Серые тучи." },
  { level: "A1", ru: "коричневый", vi: "nâu", pos: "tính từ", ex: "Коричневый шоколад." },
  { level: "A1", ru: "розовый", vi: "hồng", pos: "tính từ", ex: "Розовые цветы." },
  { level: "A1", ru: "оранжевый", vi: "cam", pos: "tính từ", ex: "Оранжевый апельсин." },

  // ---------- BỔ SUNG: CƠ THỂ ----------
  { level: "A1", ru: "голова", vi: "đầu", pos: "danh từ nữ", ex: "У меня болит голова." },
  { level: "A1", ru: "рука", vi: "tay", pos: "danh từ nữ", ex: "Подними руку." },
  { level: "A1", ru: "нога", vi: "chân", pos: "danh từ nữ", ex: "Моя правая нога." },
  { level: "A1", ru: "глаз", vi: "mắt", pos: "danh từ nam", ex: "У неё голубые глаза." },
  { level: "A1", ru: "ухо", vi: "tai", pos: "danh từ trung", ex: "Ухо болит." },
  { level: "A1", ru: "нос", vi: "mũi", pos: "danh từ nam", ex: "Длинный нос." },
  { level: "A1", ru: "рот", vi: "miệng", pos: "danh từ nam", ex: "Открой рот." },
  { level: "A1", ru: "волосы", vi: "tóc", pos: "danh từ số nhiều", ex: "У неё длинные волосы." },
  { level: "A1", ru: "лицо", vi: "mặt", pos: "danh từ trung", ex: "Знакомое лицо." },
  { level: "A1", ru: "зуб", vi: "răng", pos: "danh từ nam", ex: "Зуб болит." },
  { level: "A1", ru: "сердце", vi: "tim", pos: "danh từ trung", ex: "Сердце бьётся." },
  { level: "A1", ru: "тело", vi: "cơ thể", pos: "danh từ trung", ex: "Здоровое тело." },

  // ---------- BỔ SUNG: GIA ĐÌNH & QUAN HỆ ----------
  { level: "A1", ru: "муж", vi: "chồng", pos: "danh từ nam", ex: "Мой муж — инженер." },
  { level: "A1", ru: "жена", vi: "vợ", pos: "danh từ nữ", ex: "Его жена — врач." },
  { level: "A1", ru: "сын", vi: "con trai", pos: "danh từ nam", ex: "У них два сына." },
  { level: "A1", ru: "дочь", vi: "con gái", pos: "danh từ nữ", ex: "Их дочь учится в школе." },
  { level: "A1", ru: "бабушка", vi: "bà ngoại/bà nội", pos: "danh từ nữ", ex: "Бабушка печёт пирог." },
  { level: "A1", ru: "дедушка", vi: "ông ngoại/ông nội", pos: "danh từ nam", ex: "Дедушка читает газету." },
  { level: "A1", ru: "тётя", vi: "cô/dì", pos: "danh từ nữ", ex: "Моя тётя живёт в Москве." },
  { level: "A1", ru: "дядя", vi: "chú/bác", pos: "danh từ nam", ex: "Дядя приехал в гости." },

  // ---------- BỔ SUNG: NƠI CHỐN & ĐỊA ĐIỂM ----------
  { level: "A1", ru: "страна", vi: "đất nước", pos: "danh từ nữ", ex: "Россия — моя страна." },
  { level: "A1", ru: "Москва", vi: "Mát-xcơ-va", pos: "danh từ nữ", ex: "Москва — столица России." },
  { level: "A1", ru: "Россия", vi: "Nga", pos: "danh từ nữ", ex: "Я из России." },
  { level: "A1", ru: "Вьетнам", vi: "Việt Nam", pos: "danh từ nam", ex: "Вьетнам — красивая страна." },
  { level: "A1", ru: "деревня", vi: "làng", pos: "danh từ nữ", ex: "Он живёт в деревне." },
  { level: "A1", ru: "центр", vi: "trung tâm", pos: "danh từ nam", ex: "Я живу в центре города." },
  { level: "A1", ru: "парк", vi: "công viên", pos: "danh từ nam", ex: "Давай погуляем в парке." },
  { level: "A1", ru: "площадь", vi: "quảng trường", pos: "danh từ nữ", ex: "Красная площадь." },
  { level: "A1", ru: "мост", vi: "cầu", pos: "danh từ nam", ex: "Длинный мост через реку." },
  { level: "A1", ru: "река", vi: "sông", pos: "danh từ nữ", ex: "Река течёт быстро." },
  { level: "A1", ru: "озеро", vi: "hồ", pos: "danh từ trung", ex: "Байкал — самое глубокое озеро." },
  { level: "A1", ru: "море", vi: "biển", pos: "danh từ trung", ex: "Летом мы едем на море." },
  { level: "A1", ru: "горы", vi: "núi (số nhiều)", pos: "danh từ số nhiều", ex: "Кавказские горы." },
  { level: "A1", ru: "лес", vi: "rừng", pos: "danh từ nam", ex: "Густой лес." },

  // ---------- BỔ SUNG: ĐỘNG TỪ CHUYỂN ĐỘNG ----------
  { level: "A1", ru: "бежать", vi: "chạy", pos: "động từ", ex: "Он бежит быстро." },
  { level: "A1", ru: "ходить", vi: "đi (có mục đích, lặp lại)", pos: "động từ", ex: "Он ходит в школу каждый день." },
  { level: "A2", ru: "ездить", vi: "đi (xe, lặp lại/nhiều chiều)", pos: "động từ", ex: "Он часто ездит в командировки." },
  { level: "A2", ru: "лететь", vi: "bay", pos: "động từ", ex: "Самолёт летит высоко." },
  { level: "A2", ru: "плыть", vi: "bơi, đi thuyền", pos: "động từ", ex: "Ребёнок учится плавать." },
  { level: "A2", ru: "нести", vi: "mang (theo chiều đi)", pos: "động từ", ex: "Она несёт сумку." },
  { level: "A2", ru: "носить", vi: "mang (thường xuyên)", pos: "động từ", ex: "Я ношу очки." },
  { level: "A2", ru: "везти", vi: "chở (xe, theo chiều đi)", pos: "động từ", ex: "Такси везёт меня в аэропорт." },
  { level: "A2", ru: "возить", vi: "chở (xe, lặp lại)", pos: "động từ", ex: "Отец возит детей в школу." },

  // ---------- BỔ SUNG: THỨC ĂN & ĐỒ UỐNG ----------
  { level: "A1", ru: "суп", vi: "súp", pos: "danh từ nam", ex: "Горячий суп." },
  { level: "A1", ru: "каша", vi: "cháo", pos: "danh từ nữ", ex: "Овсяная каша на завтрак." },
  { level: "A1", ru: "курица", vi: "gà (món ăn)", pos: "danh từ nữ", ex: "Курица с рисом." },
  { level: "A1", ru: "свинина", vi: "thịt heo", pos: "danh từ nữ", ex: "Свинина на гриле." },
  { level: "A1", ru: "говядина", vi: "thịt bò", pos: "danh từ nữ", ex: "Говядина по-французски." },
  { level: "A1", ru: "колбаса", vi: "xúc xích", pos: "danh từ nữ", ex: "Нарежь колбасу." },
  { level: "A1", ru: "сыр", vi: "phô mai", pos: "danh từ nam", ex: "Жёлтый сыр." },
  { level: "A1", ru: "масло", vi: "bơ, dầu", pos: "danh từ trung", ex: "Сливочное масло." },
  { level: "A1", ru: "яйцо", vi: "trứng", pos: "danh từ trung", ex: "Свари яйцо." },
  { level: "A1", ru: "рис", vi: "cơm, gạo", pos: "danh từ nam", ex: "Белый рис." },
  { level: "A1", ru: "картошка", vi: "khoai tây", pos: "danh từ nữ", ex: "Жареная картошка." },
  { level: "A1", ru: "макароны", vi: "mì ống", pos: "danh từ số nhiều", ex: "Макароны с томатным соусом." },
  { level: "A1", ru: "салат", vi: "sa lát", pos: "danh từ nam", ex: "Овощной салат." },
  { level: "A1", ru: "торт", vi: "bánh ngọt", pos: "danh từ nam", ex: "Шоколадный торт." },
  { level: "A1", ru: "мороженое", vi: "kem", pos: "danh từ trung", ex: "Фруктовое мороженое." },
  { level: "A1", ru: "шоколад", vi: "sô cô la", pos: "danh từ nam", ex: "Горький шоколад." },
  { level: "A1", ru: "лимон", vi: "chanh", pos: "danh từ nam", ex: "Чай с лимоном." },
  { level: "A1", ru: "сок", vi: "nước ép", pos: "danh từ nam", ex: "Апельсиновый сок." },
  { level: "A1", ru: "вино", vi: "rượu vang", pos: "danh từ trung", ex: "Красное вино." },
  { level: "A1", ru: "пиво", vi: "bia", pos: "danh từ trung", ex: "Холодное пиво." },

  // ---------- BỔ SUNG: NGHỀ NGHIỆP ----------
  { level: "A1", ru: "учитель", vi: "giáo viên (nam)", pos: "danh từ nam", ex: "Он учитель математики." },
  { level: "A1", ru: "учительница", vi: "giáo viên (nữ)", pos: "danh từ nữ", ex: "Учительница строгая." },
  { level: "A1", ru: "студент", vi: "sinh viên (nam)", pos: "danh từ nam", ex: "Я студент университета." },
  { level: "A1", ru: "студентка", vi: "sinh viên (nữ)", pos: "danh từ nữ", ex: "Она студентка." },
  { level: "A1", ru: "инженер", vi: "kỹ sư", pos: "danh từ nam", ex: "Он инженер-строитель." },
  { level: "A1", ru: "программист", vi: "lập trình viên", pos: "danh từ nam", ex: "Она программист." },
  { level: "A1", ru: "продавец", vi: "người bán hàng (nam)", pos: "danh từ nam", ex: "Продавец вежливый." },
  { level: "A1", ru: "повар", vi: "đầu bếp", pos: "danh từ nam", ex: "Повар готовит ужин." },
  { level: "A2", ru: "журналист", vi: "nhà báo", pos: "danh từ nam", ex: "Журналист взял интервью." },
  { level: "A2", ru: "юрист", vi: "luật sư", pos: "danh từ nam", ex: "Мой брат — юрист." },
  { level: "A2", ru: "бухгалтер", vi: "kế toán", pos: "danh từ nam", ex: "Бухгалтер считает расходы." },
  { level: "A2", ru: "переводчик", vi: "phiên dịch viên", pos: "danh từ nam", ex: "Переводчик работает на конференции." },
  { level: "B1", ru: "предприниматель", vi: "doanh nhân", pos: "danh từ nam", ex: "Он успешный предприниматель." },
  { level: "B1", ru: "директор", vi: "giám đốc", pos: "danh từ nam", ex: "Директор подписал договор." },
  { level: "B1", ru: "менеджер", vi: "quản lý", pos: "danh từ nam", ex: "Менеджер проекта." },

  // ---------- BỔ SUNG: CẢM XÚC & TÍNH CÁCH ----------
  { level: "A1", ru: "рад", vi: "vui (ngắn)", pos: "tính từ ngắn", ex: "Я очень рад!" },
  { level: "A1", ru: "доволен", vi: "hài lòng", pos: "tính từ ngắn", ex: "Я доволен результатом." },
  { level: "A1", ru: "грустно", vi: "buồn (trạng thái)", pos: "phó từ", ex: "Мне грустно." },
  { level: "A1", ru: "весело", vi: "vui vẻ", pos: "phó từ", ex: "Нам весело вместе." },
  { level: "A1", ru: "устал", vi: "mệt", pos: "tính từ ngắn", ex: "Я очень устал." },
  { level: "A1", ru: "голоден", vi: "đói", pos: "tính từ ngắn", ex: "Я голоден." },
  { level: "A1", ru: "болен", vi: "ốm", pos: "tính từ ngắn", ex: "Он болен." },
  { level: "A1", ru: "здоров", vi: "khỏe mạnh", pos: "tính từ ngắn", ex: "Ребёнок здоров." },
  { level: "A2", ru: "злой", vi: "giận, ác", pos: "tính từ", ex: "Злая собака." },
  { level: "A2", ru: "добрый", vi: "tốt bụng", pos: "tính từ", ex: "Добрый человек." },
  { level: "A2", ru: "умный", vi: "thông minh", pos: "tính từ", ex: "Умный ученик." },
  { level: "A2", ru: "глупый", vi: "ngu ngốc", pos: "tính từ", ex: "Глупая шутка." },
  { level: "A2", ru: "вежливый", vi: "lịch sự", pos: "tính từ", ex: "Вежливый мальчик." },
  { level: "A2", ru: "ленивый", vi: "lười biếng", pos: "tính từ", ex: "Ленивый кот." },
  { level: "A2", ru: "храбрый", vi: "dũng cảm", pos: "tính từ", ex: "Храбрый воин." },
  { level: "A2", ru: "трусливый", vi: "nhút nhát, hèn", pos: "tính từ", ex: "Трусливый заяц." },
  { level: "A2", ru: "гордый", vi: "tự hào", pos: "tính từ", ex: "Гордый победитель." },
  { level: "A2", ru: "скромный", vi: "khiêm tốn", pos: "tính từ", ex: "Скромная девушка." },
  { level: "A2", ru: "щедрый", vi: "hào phóng", pos: "tính từ", ex: "Щедрый подарок." },
  { level: "A2", ru: "жадный", vi: "tham lam", pos: "tính từ", ex: "Жадный человек." },

  // ---------- BỔ SUNG: GIỚI TỪ ----------
  { level: "A1", ru: "в", vi: "trong, ở", pos: "giới từ", ex: "Я живу в Москве." },
  { level: "A1", ru: "на", vi: "trên, tại", pos: "giới từ", ex: "Книга на столе." },
  { level: "A1", ru: "с", vi: "với, từ", pos: "giới từ", ex: "Я говорю с другом." },
  { level: "A1", ru: "к", vi: "đến (hướng tới)", pos: "giới từ", ex: "Иди к врачу." },
  { level: "A1", ru: "у", vi: "ở (gần, bên cạnh)", pos: "giới từ", ex: "Я живу у моря." },
  { level: "A1", ru: "из", vi: "từ (bên trong)", pos: "giới từ", ex: "Я из Вьетнама." },
  { level: "A1", ru: "по", vi: "theo, dọc", pos: "giới từ", ex: "Иди по улице." },
  { level: "A1", ru: "о", vi: "về", pos: "giới từ", ex: "Говорить о книге." },
  { level: "A1", ru: "для", vi: "cho, vì", pos: "giới từ", ex: "Это для тебя." },
  { level: "A1", ru: "без", vi: "không có", pos: "giới từ", ex: "Чай без сахара." },
  { level: "A1", ru: "после", vi: "sau", pos: "giới từ", ex: "После обеда." },
  { level: "A1", ru: "до", vi: "trước, đến", pos: "giới từ", ex: "До встречи!" },
  { level: "A1", ru: "между", vi: "giữa", pos: "giới từ", ex: "Между нами." },
  { level: "A1", ru: "около", vi: "gần", pos: "giới từ", ex: "Около дома." },
  { level: "A2", ru: "через", vi: "qua, sau (thời gian)", pos: "giới từ", ex: "Через час." },
  { level: "A2", ru: "вдоль", vi: "dọc theo", pos: "giới từ", ex: "Идти вдоль реки." },
  { level: "A2", ru: "вокруг", vi: "xung quanh", pos: "giới từ", ex: "Вокруг дома." },

  // ---------- BỔ SUNG: LIÊN TỪ & TRẠNG TỪ ----------
  { level: "A1", ru: "и", vi: "và", pos: "liên từ", ex: "Ты и я." },
  { level: "A1", ru: "или", vi: "hoặc", pos: "liên từ", ex: "Ты или он." },
  { level: "A1", ru: "но", vi: "nhưng", pos: "liên từ", ex: "Я устал, но счастлив." },
  { level: "A1", ru: "потому что", vi: "bởi vì", pos: "liên từ", ex: "Я опоздал, потому что был дождь." },
  { level: "A1", ru: "когда", vi: "khi", pos: "liên từ", ex: "Когда я приду, скажи." },
  { level: "A1", ru: "если", vi: "nếu", pos: "liên từ", ex: "Если хочешь, иди." },
  { level: "A1", ru: "что", vi: "rằng, cái gì", pos: "liên từ", ex: "Я знаю, что ты прав." },
  { level: "A1", ru: "где", vi: "ở đâu", pos: "phó từ", ex: "Где ты живёшь?" },
  { level: "A1", ru: "как", vi: "như thế nào", pos: "phó từ", ex: "Как дела?" },
  { level: "A1", ru: "кто", vi: "ai", pos: "phó từ", ex: "Кто там?" },
  { level: "A1", ru: "почему", vi: "tại sao", pos: "phó từ", ex: "Почему ты грустный?" },
  { level: "A1", ru: "сколько", vi: "bao nhiêu", pos: "phó từ", ex: "Сколько стоит?" },
  { level: "A1", ru: "всегда", vi: "luôn luôn", pos: "phó từ", ex: "Он всегда опаздывает." },
  { level: "A1", ru: "никогда", vi: "không bao giờ", pos: "phó từ", ex: "Никогда не сдавайся!" },
  { level: "A1", ru: "часто", vi: "thường xuyên", pos: "phó từ", ex: "Мы часто встречаемся." },
  { level: "A1", ru: "редко", vi: "hiếm khi", pos: "phó từ", ex: "Я редко читаю." },
  { level: "A1", ru: "очень", vi: "rất", pos: "phó từ", ex: "Очень вкусно!" },
  { level: "A1", ru: "немного", vi: "một chút", pos: "phó từ", ex: "Подожди немного." },
  { level: "A1", ru: "быстро", vi: "nhanh", pos: "phó từ", ex: "Говори быстрее." },
  { level: "A1", ru: "медленно", vi: "chậm", pos: "phó từ", ex: "Он медленно идёт." }
];

/** Thời gian nhắc ôn (giờ) cho từ MỚI — 4 nút chấm. */
const SRS_NEW_INTERVALS = {
  again: 0,    // xem lại ngay trong session (sau N thẻ)
  hard: 6,     // 6 giờ
  good: 24,    // 1 ngày
  easy: 72     // 3 ngày
};

/** Hệ số nhân cho từ ĐÃ ôn. */
const SRS_REVIEW_MULTIPLIERS = {
  hard: 2,     // ×2
  good: 3,     // ×3
  easy: 4      // ×4
};

/** Với rating "Again" trong từ mới: xem lại sau N thẻ. */
const SRS_AGAIN_REINSERT_AFTER = 5;

/** Lưu trữ state của SRS vào localStorage với key "trki_srs". */
const SRS = {
  /** Lấy state hiện tại (khởi tạo nếu chưa có). */
  getState() {
    const fallback = {
      cards: {},          // { [cardId]: SRS_CARD }
      sessionQueue: [],   // mảng cardId còn lại trong session hiện tại
      sessionInserted: [],// các cardId vừa được chèn lại (Again) trong session
      sessionDone: [],    // các cardId đã chấm trong session
      today: {
        date: new Date().toDateString(),
        reviewed: 0,
        newLearned: 0,
        correct: 0
      }
    };
    const v = STORE.get("srs", fallback);
    // Reset daily stats nếu sang ngày mới
    if (v.today.date !== new Date().toDateString()) {
      v.today = { date: new Date().toDateString(), reviewed: 0, newLearned: 0, correct: 0 };
    }
    return v;
  },

  /** Lưu state. */
  saveState(state) {
    STORE.set("srs", state);
  },

  /**
   * Khởi tạo card mới cho một từ. Card chưa tồn tại sẽ được thêm vào state.cards.
   * Trả về cardId.
   */
  ensureCard(word) {
    const state = this.getState();
    const id = this.cardId(word);
    if (!state.cards[id]) {
      state.cards[id] = {
        id,
        ru: word.ru,
        vi: word.vi,
        pos: word.pos,
        ex: word.ex,
        level: word.level,
        dk: word.dk || null,
        dir: word.dir || "ru-vi",
        // SRS fields
        interval: 0,           // giờ
        repetitions: 0,        // số lần ôn thành công liên tiếp
        lapses: 0,             // số lần quên
        dueDate: Date.now(),   // ms — sẵn sàng ngay
        isNew: true,
        mastered: false,
        lastReview: 0,
        learningStep: 0,       // 0 = mới, 1 = đang học, 2 = đã thuộc
        addedAt: Date.now()
      };
      this.saveState(state);
    }
    return id;
  },

  /** Sinh id ổn định cho card. Từ ngoài từ điển đầy đủ dùng dk riêng để tránh trùng do mất dấu. */
  cardId(word) {
    if (word && word.dk) return "srsd_" + word.dk;
    return "srs_" + word.ru.toLowerCase().replace(/[^а-яёa-z0-9]/gi, "_");
  },

  /** Tìm entry: pool SRS_WORDS trước, sau đó tra từ điển đầy đủ (nếu đã tải). */
  findWord(ru) {
    const lower = ru.toLowerCase().trim();
    const pool = SRS_WORDS.find((w) => w.ru.toLowerCase() === lower);
    if (pool) return pool;
    if (window.MishkaDict) return MishkaDict.lookup(lower) || null;
    return null;
  },

  /** Thêm từ vào hàng đợi SRS — nếu chưa có card thì tạo, đánh dấu "due now". */
  addToQueue(ru) {
    const w = this.findWord(ru);
    if (!w) return { ok: false, reason: "not-found" };
    const id = this.ensureCard(w);
    const state = this.getState();
    const card = state.cards[id];
    // Reset về trạng thái "chưa thuộc, đến hạn ngay" nhưng GIỮ lịch sử nếu đã học
    if (card.mastered) {
      card.mastered = false;
      card.learningStep = 1;
      card.repetitions = 0;
    }
    card.dueDate = Date.now();
    card.isNew = card.repetitions === 0;
    SRS.saveState(state);
    return { ok: true, id, word: w };
  },

  /** Lấy danh sách tất cả từ trong từ điển kèm trạng thái học. */
  getDictionary(state = this.getState()) {
    return SRS_WORDS.map((w) => {
      const id = this.cardId(w);
      const card = state.cards[id];
      const status = !card
        ? "unseen"
        : card.mastered
        ? "mastered"
        : card.isNew
        ? "new"
        : card.learningStep === 1
        ? "learning"
        : "reviewing";
      return { ...w, id, status };
    });
  },

  /** Đếm tổng số card theo trạng thái. */
  countByStatus(state = this.getState()) {
    let total = 0;
    let newCount = 0;
    let learning = 0;
    let reviewing = 0;
    let mastered = 0;
    for (const id in state.cards) {
      const c = state.cards[id];
      if (c.mastered) { mastered++; continue; }
      total++;
      if (c.isNew) newCount++;
      else if (c.learningStep === 1) learning++;
      else reviewing++;
    }
    return { total, newCount, learning, reviewing, mastered };
  },

  /** Lấy danh sách card "tới hạn" (dueDate <= now) và chưa mastered. */
  getDueCards(state = this.getState(), limit = 100) {
    const now = Date.now();
    return Object.values(state.cards)
      .filter((c) => !c.mastered && c.dueDate <= now)
      .sort((a, b) => a.dueDate - b.dueDate)
      .slice(0, limit);
  },

  /** Lấy từ mới giới hạn theo level và số lượng. */
  getNewCards(state = this.getState(), level = "all", limit = 10) {
    const seenIds = new Set(Object.keys(state.cards));
    return SRS_WORDS
      .filter((w) => !seenIds.has(this.cardId(w)))
      .filter((w) => level === "all" || w.level === level)
      .slice(0, limit);
  },

  /** Khởi tạo queue cho session học: trộn từ tới hạn + từ mới. */
  buildSession({ level = "all", newLimit = 8, dueLimit = 30 } = {}) {
    const state = this.getState();
    const due = this.getDueCards(state, dueLimit);
    const news = this.getNewCards(state, level, newLimit);
    const queue = [...due.map((c) => c.id), ...news.map((w) => this.ensureCard(w))];
    state.sessionQueue = queue;
    state.sessionInserted = [];
    state.sessionDone = [];
    this.saveState(state);
    return { queue: queue.map((id) => state.cards[id]), newCount: news.length, dueCount: due.length };
  },

  /** Lấy thẻ kế tiếp trong session. */
  nextCard(state = this.getState()) {
    while (state.sessionQueue.length > 0) {
      const id = state.sessionQueue[0];
      const card = state.cards[id];
      if (!card || card.mastered) {
        state.sessionQueue.shift();
        continue;
      }
      return card;
    }
    return null;
  },

  /**
   * Xử lý một lượt chấm điểm.
   * rating: 'again' | 'hard' | 'good' | 'easy'
   * Trả về thông tin đã cập nhật (interval hours tiếp theo, dueDate, ...).
   */
  review(cardId, rating) {
    const state = this.getState();
    const card = state.cards[cardId];
    if (!card || card.mastered) return null;

    const now = Date.now();
    let nextIntervalH = 0;
    // Card được chèn lại vào queue (again / new+hard / new+easy) thì không bị
    // shift khỏi đầu queue ở cuối hàm — nếu không thẻ cuối cùng sẽ bị mất.
    let reinserted = false;

    if (card.isNew) {
      // ---- TỪ MỚI ----
      nextIntervalH = SRS_NEW_INTERVALS[rating];
      if (rating === "again") {
        // Đánh dấu là đang học lại
        card.isNew = true;
        card.repetitions = 0;
        card.learningStep = 0;
        card.lapses++;
        // Chèn lại vào queue, sau N thẻ nữa
        this._reinsertAfter(state, cardId, SRS_AGAIN_REINSERT_AFTER);
        reinserted = true;
        nextIntervalH = 0;
      } else if (rating === "good") {
        // Good lần đầu: 1 ngày, từ này được tính là "đã học"
        card.isNew = false;
        card.learningStep = 2;
        card.repetitions = 1;
        state.today.newLearned++;
      } else if (rating === "hard" || rating === "easy") {
        // Hard/Easy lần đầu: chuyển sang trạng thái "đang học", chèn lại
        card.isNew = false;
        card.learningStep = 1;
        card.repetitions = 1;
        state.today.newLearned++;
        this._reinsertAfter(state, cardId, rating === "easy" ? 3 : 5);
        reinserted = true;
      }
    } else {
      // ---- TỪ ĐÃ ÔN ----
      // Nhân khoảng thời gian hiện tại theo multiplier
      const current = Math.max(card.interval, 1); // tối thiểu 1 giờ
      let multiplier = SRS_REVIEW_MULTIPLIERS[rating];
      nextIntervalH = current * multiplier;

      if (rating === "again") {
        // Quên: reset về 6 giờ và đánh dấu learning
        nextIntervalH = 6;
        card.lapses++;
        card.learningStep = 1;
        card.repetitions = 0;
        // Đưa card trở lại learning session trong vài thẻ
        this._reinsertAfter(state, cardId, SRS_AGAIN_REINSERT_AFTER);
        reinserted = true;
      } else if (rating === "hard") {
        // Hard: nhưng không quên — để interval × 2, giữ learning nếu đang learning
        if (card.learningStep === 1) card.learningStep = 2;
        card.repetitions++;
      } else if (rating === "good") {
        card.learningStep = 2;
        card.repetitions++;
      } else if (rating === "easy") {
        card.learningStep = 2;
        card.repetitions++;
      }
    }

    // Cập nhật SRS fields
    card.interval = nextIntervalH;
    card.dueDate = now + nextIntervalH * 3600 * 1000;
    card.lastReview = now;

    // Daily stats
    state.today.reviewed++;
    if (rating === "good" || rating === "easy") state.today.correct++;

    // Xóa khỏi queue đầu (đã xử lý xong) — bỏ qua nếu card vừa được chèn lại
    if (!reinserted && state.sessionQueue[0] === cardId) state.sessionQueue.shift();
    if (!reinserted && !state.sessionDone.includes(cardId)) state.sessionDone.push(cardId);

    // XP reward
    const xpMap = { again: 1, hard: 3, good: 5, easy: 7 };
    if (rating !== "again") {
      Progress.addXp(xpMap[rating] || 1);
    }
    Progress.touchStreak();

    this.saveState(state);
    return {
      card,
      nextIntervalH,
      nextDueLabel: this.formatInterval(nextIntervalH)
    };
  },

  /** Đánh dấu Mastered — loại khỏi queue, không còn nhắc ôn. */
  markMastered(cardId) {
    const state = this.getState();
    const card = state.cards[cardId];
    if (!card) return;
    card.mastered = true;
    card.learningStep = 2;
    card.dueDate = Number.MAX_SAFE_INTEGER;
    if (state.sessionQueue[0] === cardId) state.sessionQueue.shift();
    if (!state.sessionDone.includes(cardId)) state.sessionDone.push(cardId);
    Progress.addXp(10);
    this.saveState(state);
  },

  /** Hủy Mastered. */
  unmarkMastered(cardId) {
    const state = this.getState();
    const card = state.cards[cardId];
    if (!card) return;
    card.mastered = false;
    card.dueDate = Date.now();
    this.saveState(state);
  },

  /** Reset toàn bộ tiến độ SRS. */
  resetAll() {
    const state = this.getState();
    state.cards = {};
    state.sessionQueue = [];
    state.sessionInserted = [];
    state.sessionDone = [];
    state.today = { date: new Date().toDateString(), reviewed: 0, newLearned: 0, correct: 0 };
    this.saveState(state);
  },

  /** Thống kê tổng quan. */
  getStats(state = this.getState()) {
    const counts = this.countByStatus(state);
    const totalReviews = STORE.get("srs_totalReviews", 0);
    const totalCorrect = STORE.get("srs_totalCorrect", 0);
    const allTimeMastered = counts.mastered;
    return {
      ...counts,
      today: state.today,
      accuracy: totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0,
      totalReviews,
      totalCorrect
    };
  },

  /** Format khoảng thời gian (giờ) thành chuỗi thân thiện. */
  formatInterval(hours) {
    if (hours === 0) return "vài giây nữa";
    if (hours < 1) return Math.round(hours * 60) + " phút";
    if (hours < 24) return Math.round(hours) + " giờ";
    const days = hours / 24;
    if (days < 30) return Math.round(days * 10) / 10 + " ngày";
    return Math.round(days / 30) + " tháng";
  },

  /** Lấy sample trắc nghiệm: từ đang hỏi + 3 từ ngẫu nhiên khác. */
  buildMultipleChoice(targetCard, allCards) {
    const others = allCards.filter((c) => c.id !== targetCard.id && !c.mastered);
    const distractors = shuffle(others).slice(0, 3);
    const options = shuffle([targetCard, ...distractors]);
    return options.map((c) => ({ id: c.id, vi: c.vi }));
  },

  /** Che một từ trong câu ví dụ (dùng cho chế độ Gõ từ). */
  buildTypingPrompt(card) {
    const ex = card.ex || card.ru;
    const target = card.ru;
    // Che phần đầu/cuối của target word
    if (ex.toLowerCase().includes(target.toLowerCase())) {
      const re = new RegExp(target, "i");
      const masked = ex.replace(re, "____");
      return { masked, target, fullSentence: ex };
    }
    // Không tìm thấy trong ví dụ → tạo prompt đơn giản
    return { masked: "____", target, fullSentence: card.ex };
  },

  /** Lưu lịch sử tổng số review/đúng để tính accuracy. */
  recordReview(rating) {
    const total = STORE.get("srs_totalReviews", 0) + 1;
    STORE.set("srs_totalReviews", total);
    if (rating === "good" || rating === "easy") {
      STORE.set("srs_totalCorrect", STORE.get("srs_totalCorrect", 0) + 1);
    }
  },

  /** Chèn lại 1 card vào queue sau N thẻ nữa. */
  _reinsertAfter(state, cardId, after) {
    // Gỡ card khỏi queue (nếu đang ở vị trí 0 thì shift, nếu ở vị trí khác thì splice)
    const idx = state.sessionQueue.indexOf(cardId);
    if (idx !== -1) state.sessionQueue.splice(idx, 1);
    // Chèn lại ở vị trí "after" trong queue mới (đã gỡ cardId nên vị trí chính xác)
    const pos = Math.min(after, state.sessionQueue.length);
    state.sessionQueue.splice(pos, 0, cardId);
    if (!state.sessionInserted.includes(cardId)) state.sessionInserted.push(cardId);
  }
};
