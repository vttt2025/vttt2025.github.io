-- =======================================================================
-- RUSI TRKI - VOCABULARY SEED DATA (18 LỌ TỪ VỰNG & 144 TỪ NGA)
-- Chạy script này trong Supabase SQL Editor
-- =======================================================================

-- 1. Bổ sung các cột cần thiết cho vocab_jars nếu chưa có
ALTER TABLE vocab_jars ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'A1';
ALTER TABLE vocab_jars ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT '🏺';
ALTER TABLE vocab_jars ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE vocab_jars ADD COLUMN IF NOT EXISTS words JSONB DEFAULT '[]'::jsonb;

-- 2. Xóa dữ liệu lọ hệ thống cũ trước khi nạp mới để tránh trùng lặp
DELETE FROM vocab_jars WHERE is_system = true;

-- 3. Nạp 18 Lọ Từ Vựng Chuẩn Khung CEFR A1 - B2
INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ mua sắm Auchan',
  'A1',
  '🛒',
  'Từ vựng siêu thị, thực phẩm, cân đo, thanh toán sống còn khi mới sang Nga.',
  true,
  '[{"ru":"хлеб","vi":"bánh mì","note":"danh từ giống đực (он)","ex":"Я покупаю свежий хлеб каждый день."},{"ru":"молоко́","vi":"sữa tươi","note":"danh từ giống trung (оно)","ex":"Пакет молока стоит 80 рублей."},{"ru":"сыр","vi":"phô mai","note":"danh từ giống đực (он)","ex":"Российский сыр очень вкусный."},{"ru":"колбаса́","vi":"xúc xích, giò","note":"danh từ giống cái (она)","ex":"В магазине есть докторская колбаса."},{"ru":"чек","vi":"hóa đơn thanh toán","note":"cần giữ khi qua cổng bảo vệ","ex":"Возьмите ваш чек, пожалуйста."},{"ru":"паке́т","vi":"túi nilông","note":"thu ngân thường hỏi: ''Пакет нужен?''","ex":"Дайте мне один большой пакет."},{"ru":"ка́рта","vi":"thẻ ngân hàng","note":"оплата картой (quẹt thẻ)","ex":"Вы будете платить картой или наличными?"},{"ru":"ски́дка","vi":"giảm giá / khuyến mại","note":"thẻ tích điểm siêu thị","ex":"Студентам предоставляется скидка 10%."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ vali hành lý du học',
  'A1',
  '🧳',
  'Đồ dùng cá nhân, quần áo giữ nhiệt, giấy tờ bắt buộc chuẩn bị từ Việt Nam sang.',
  true,
  '[{"ru":"чемода́н","vi":"vali hành lý","note":"chuẩn ký gửi 23kg","ex":"Мой чемодан весит двадцать два килограмма."},{"ru":"па́спорт","vi":"hộ chiếu quốc tế","note":"luôn mang bản gốc bên người","ex":"Покажите, пожалуйста, ваш паспорт."},{"ru":"ви́за","vi":"thị thực du học","note":"thời hạn nhập cảnh lần đầu 90 ngày","ex":"У меня учебная виза в Россию."},{"ru":"биле́т","vi":"vé máy bay / xe khách","note":"vé điện tử in sẵn giấy","ex":"Я купил билет на самолёт до Москвы."},{"ru":"тёплая ку́ртка","vi":"áo khoác ấm đại hàn","note":"chịu nhiệt độ âm 20-30 độ","ex":"Зимой в Москве обязательно нужна тёплая куртка."},{"ru":"ша́пка","vi":"mũ len trùm tai","note":"bảo vệ đầu chống lạnh buốt","ex":"Надень шапку, на улице сильный мороз!"},{"ru":"перча́тки","vi":"găng tay ấm","note":"loại chống gió tuyết và cảm ứng","ex":"Кожаные перчатки отлично согревают руки."},{"ru":"лека́рства","vi":"thuốc men dự phòng","note":"hạ sốt, cảm cúm, men tiêu hóa mang từ VN","ex":"В поездку я всегда беру домашние лекарства."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ sân bay Sheremetyevo',
  'A1',
  '✈️',
  'Thủ tục check-in, ký gửi hành lý, cửa ra tàu bay và hải quan nhập cảnh Nga.',
  true,
  '[{"ru":"аэропо́рт","vi":"sân bay / phi trường","note":"ở Moskva có Sheremetyevo, Domodedovo, Vnukovo","ex":"Мы прилетели в международный аэропорт Шереметьево."},{"ru":"термина́л","vi":"nhà ga sân bay","note":"chú ý chữ cái Terminal B, C, D, E, F","ex":"Международные рейсы вылетают из терминала C."},{"ru":"регистра́ция","vi":"thủ tục check-in","note":"mở trước giờ bay 2-3 tiếng","ex":"Где находится стойка регистрации на рейс?"},{"ru":"поса́дочный тало́н","vi":"thẻ lên máy bay (boarding pass)","note":"giữ cùng hộ chiếu để qua cửa gate","ex":"Предъявите посадочный талон при входе в самолёт."},{"ru":"бага́ж","vi":"hành lý ký gửi","note":"nhận tại băng chuyền sân bay","ex":"Где выдают багаж после рейса из Ханоя?"},{"ru":"ручна́я кладь","vi":"hành lý xách tay","note":"tối đa 8-10kg tùy hãng","ex":"Ручную кладь можно взять с собой в салон."},{"ru":"вы́ход на поса́дку","vi":"cửa ra máy bay (gate)","note":"theo dõi màn hình thông báo cửa","ex":"Посадка начинается у выхода номер тридцать два."},{"ru":"тамо́жня","vi":"hải quan sân bay","note":"khai báo nếu mang đồ vượt hạn mức","ex":"Мы быстро прошли паспортный контроль и таможню."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ gia đình & người thân',
  'A1',
  '👨‍👩‍👧',
  'Mối quan hệ thân thuộc, xưng hô gia đình và tình bạn bè quốc tế.',
  true,
  '[{"ru":"семья́","vi":"gia đình","note":"danh từ giống cái (она)","ex":"У меня большая и дружная семья во Вьетнаме."},{"ru":"роди́тели","vi":"bố mẹ / phụ huynh","note":"luôn dùng số nhiều (они)","ex":"Мои родители звонят мне по видеосвязи каждый вечер."},{"ru":"оте́ц","vi":"bố / người cha","note":"dạng thân mật: папа","ex":"Мой отец работает инженером."},{"ru":"мать","vi":"mẹ / người mẹ","note":"dạng thân mật: мама","ex":"Моя мама готовит самые вкусные вьетнамские блюда."},{"ru":"брат","vi":"anh / em trai","note":"старший брат (anh), младший брат (em)","ex":"Мой старший брат тоже учился за границей."},{"ru":"сестра́","vi":"chị / em gái","note":"старшая сестра (chị), младшая сестра (em)","ex":"Моя сестра учит русский язык в школе."},{"ru":"друг","vi":"bạn thân / người bạn nam","note":"số nhiều: друзья","ex":"Антон — мой лучший русский друг в университете."},{"ru":"подру́га","vi":"bạn nữ / bạn gái","note":"danh từ giống cái (она)","ex":"Моя подруга Лена помогает мне с русским произношением."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ sinh hoạt hằng ngày',
  'A1',
  '⏰',
  'Các buổi trong ngày, nếp sống học tập, ăn uống và giờ giấc nghỉ ngơi.',
  true,
  '[{"ru":"у́тро","vi":"buổi sáng","note":"Доброе утро! (Chào buổi sáng!)","ex":"Каждое утро я встаю в семь часов и делаю зарядку."},{"ru":"день","vi":"buổi trưa / ban ngày","note":"Добрый день! (Chào buổi trưa/chiều!)","ex":"Днём у нас обычно три пары в институте."},{"ru":"ве́чер","vi":"buổi tối","note":"Добрый вечер! (Chào buổi tối!)","ex":"Вечером студенты повторяют новые слова и делают уроки."},{"ru":"ночь","vi":"ban đêm","note":"Спокойной ночи! (Chúc ngủ ngon!)","ex":"Ночью в общежитии тихо, все отдыхают."},{"ru":"за́втрак","vi":"bữa ăn sáng","note":"động từ: завтракать","ex":"На завтрак я ем овсяную кашу и пью кофе."},{"ru":"обе́д","vi":"bữa ăn trưa","note":"động từ: обедать","ex":"Мы идём на обед в университетскую столовую."},{"ru":"у́жин","vi":"bữa ăn tối","note":"động từ: ужинать","ex":"После занятий мы вместе готовим вкусный ужин."},{"ru":"отды́х","vi":"sự nghỉ ngơi / thư giãn","note":"động từ: отдыхать","ex":"В воскресенье у нас свободное время и хороший отдых."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ thời tiết & 4 mùa Nga',
  'A1',
  '❄️',
  'Bốn mùa đặc trưng xứ sở Bạch Dương: tuyết trắng, lá vàng, mưa phùn và nắng hè.',
  true,
  '[{"ru":"пого́да","vi":"thời tiết","note":"Какая сегодня погода? (Thời tiết hôm nay thế nào?)","ex":"Сегодня на улице прекрасная солнечная погода."},{"ru":"зима́","vi":"mùa đông","note":"trạng từ: зимой (vào mùa đông)","ex":"Русская зима очень холодная, но невероятно красивая."},{"ru":"снег","vi":"tuyết / bông tuyết","note":"идёт снег (tuyết đang rơi)","ex":"Зимой в Москве почти каждый день идёт белый снег."},{"ru":"моро́з","vi":"giá rét / sương giá","note":"nhiệt độ dưới 0°C buốt da","ex":"Сегодня на улице мороз минус пятнадцать градусов."},{"ru":"весна́","vi":"mùa xuân","note":"trạng từ: весной (vào mùa xuân)","ex":"Весной тает снег и распускаются первые листья."},{"ru":"ле́то","vi":"mùa hè","note":"trạng từ: летом (vào mùa hè)","ex":"Летом в Санкт-Петербурге начинаются белые ночи."},{"ru":"о́сень","vi":"mùa thu","note":"trạng từ: осенью (vào mùa thu)","ex":"Золотая осень в России — любимое время поэтов."},{"ru":"дождь","vi":"cơn mưa","note":"идёт дождь (trời đang mưa)","ex":"Возьми зонт, на улице идёт сильный дождь."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ thành phố & hỏi đường',
  'A1',
  '🗺️',
  'Đường phố, quảng trường, phương hướng trái phải và cách hỏi đường người bản xứ.',
  true,
  '[{"ru":"го́род","vi":"thành phố / đô thị","note":"số nhiều: города","ex":"Москва — огромный и современный европейский город."},{"ru":"у́лица","vi":"con đường / tuyến phố","note":"на улице (ở ngoài phố)","ex":"Наш университет находится на тихой красивой улице."},{"ru":"пло́щадь","vi":"quảng trường","note":"danh từ giống cái (она)","ex":"Красная площадь — главное историческое место столицы."},{"ru":"остано́вка","vi":"điểm dừng xe buýt / trạm đón","note":"автобусная остановка","ex":"Автобусная остановка находится прямо напротив общежития."},{"ru":"пра́во","vi":"bên phải","note":"направо (rẽ sang phải)","ex":"Поверните направо возле большого торгового центра."},{"ru":"ле́во","vi":"bên trái","note":"налево (rẽ sang trái)","ex":"Аптека расположена слева от входа в метро."},{"ru":"пря́мо","vi":"đi thẳng","note":"идите прямо (hãy đi thẳng)","ex":"Идите прямо двести метров, и вы увидите парк."},{"ru":"центр","vi":"trung tâm thành phố","note":"в центре (ở trung tâm)","ex":"Мы любим гулять в центре Москвы по выходным."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ ký túc xá & phòng ở',
  'A2',
  '🏢',
  'Cuộc sống tự lập ở KTX Nga: chìa khóa, nội quy, giặt giũ, nấu nướng.',
  true,
  '[{"ru":"общежи́тие","vi":"ký túc xá sinh viên","note":"viết tắt thường gọi: общага","ex":"Наше студенческое общежитие находится недалеко от метро."},{"ru":"ко́мната","vi":"phòng ở sinh viên","note":"thường xếp 2-3 bạn một phòng","ex":"В нашей комнате живут студенты из Вьетнама и Китая."},{"ru":"ключ","vi":"chìa khóa phòng","note":"gửi chìa khóa ở quầy trực khi ra ngoài","ex":"Не забудьте сдать ключ на вахту дежурному."},{"ru":"сосе́д","vi":"bạn cùng phòng nam","note":"соседка (bạn nữ)","ex":"Мой сосед по комнате отлично говорит по-русски."},{"ru":"ку́хня","vi":"bếp ăn chung","note":"mỗi tầng thường có 1-2 bếp chung","ex":"На кухне установлены две газовые плиты и мойка."},{"ru":"пра́чечная","vi":"phòng giặt là tự động","note":"máy giặt công cộng đặt dưới tầng hầm","ex":"В прачечной можно постирать постельное бельё за жетон."},{"ru":"дежу́рный","vi":"bác bảo vệ / quản lý trực ban","note":"người quản lý cổng ra vào","ex":"Дежурный проверяет пропуска у всех входящих."},{"ru":"про́пуск","vi":"thẻ ra vào KTX","note":"quẹt thẻ từ khi qua cửa kiểm soát","ex":"Всегда носите пропуск с собой при выходе на улицу."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ quán ăn & ẩm thực Nga',
  'A2',
  '🍽️',
  'Thực đơn món Nga truyền thống, cách gọi món và tính tiền lịch sự.',
  true,
  '[{"ru":"меню́","vi":"thực đơn","note":"''Дайте, пожалуйста, меню''","ex":"Официант принёс нам меню на русском языке."},{"ru":"борщ","vi":"súp củ dền đỏ truyền thống","note":"ăn kèm váng sữa сметана và tỏi","ex":"Горячий борщ со сметаной — лучшее блюдо в холодную зиму."},{"ru":"блины́","vi":"bánh xèo blini","note":"nhân mặn thịt băm hoặc nhân ngọt mứt dâu","ex":"На Масленицу в России пекут и едят вкусные блины."},{"ru":"пельме́ни","vi":"sủi cảo thịt kiểu Nga","note":"món ăn nhanh phổ biến nhất của sinh viên","ex":"Мы сварили пачку пельменей на скорый обед."},{"ru":"смета́на","vi":"kem chua váng sữa","note":"danh từ giống cái (она)","ex":"Борщ всегда подают со свежей сметаной и зеленью."},{"ru":"чай с лимо́ном","vi":"trà đen kèm lát chanh tươi","note":"thức uống sưởi ấm mùa đông yêu thích của người Nga","ex":"После мороза приятно выпить горячий чай с лимоном."},{"ru":"официа́нт","vi":"người phục vụ bàn","note":"nữ: официантка","ex":"Мы подозвали официанта и сделали заказ."},{"ru":"счёт","vi":"hóa đơn tính tiền","note":"''Дайте, пожалуйста, счёт''","ex":"Принесите, пожалуйста, счёт: мы платим раздельно."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ tàu điện ngầm Moskva',
  'A2',
  '🚇',
  'Bản đồ ngầm, quẹt thẻ Troika, chuyển tuyến đường tròn Koltsevaya.',
  true,
  '[{"ru":"ста́нция","vi":"nhà ga tàu điện ngầm","note":"nhiều ga là kiệt tác kiến trúc cung điện ngầm","ex":"Станция Маяковская признана одной из красивейших в мире."},{"ru":"перехо́д","vi":"lối chuyển tuyến giữa các ga","note":"theo dõi biển chỉ dẫn màu sắc đường kính","ex":"Здесь удобный переход на кольцевую коричневую ветку."},{"ru":"ка́рта Тро́йка","vi":"thẻ giao thông Troika","note":"thẻ tích hợp đi tàu điện ngầm, xe buýt, tramvaj","ex":"Я пополнил карту Тройка на месяц по студенческому тарифу."},{"ru":"турнике́т","vi":"cổng kiểm soát vé tự động","note":"chạm thẻ vào vòng tròn sáng xanh","ex":"Приложите карту к валидатору турникета для прохода."},{"ru":"эскала́тор","vi":"thang cuốn sâu lòng đất","note":"quy tắc vàng: đứng bên phải, nhường đi bên trái","ex":"Стойте справа на эскалаторе, чтобы пропустить спешащих."},{"ru":"по́езд","vi":"đoàn tàu điện ngầm","note":"khoảng cách giữa các chuyến chỉ 90 giây","ex":"Следующий поезд прибудет через полторы минуты."},{"ru":"ваго́н","vi":"toa tàu ngầm","note":"toa mới có điều hòa và cổng sạc USB","ex":"В современных вагонах метро есть бесплатный Wi-Fi."},{"ru":"вы́ход в го́род","vi":"lối ra khỏi ga lên mặt đất","note":"xem số thứ tự cửa ra theo biển chỉ dẫn","ex":"Вам нужен выход в город номер три к главному входу в парк."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ ngân hàng & thẻ Sberbank',
  'A2',
  '💳',
  'Mở tài khoản sinh viên, rút tiền ATM, chuyển khoản qua số điện thoại và bảo mật thẻ.',
  true,
  '[{"ru":"банк","vi":"ngân hàng","note":"các ngân hàng phổ biến: Sberbank, VTB, Tinkoff","ex":"Студенты открывают карты в отделении Сбербанка."},{"ru":"банкома́т","vi":"cây rút tiền tự động ATM","note":"có chức năng nạp tiền (внесение) và rút tiền (снятие)","ex":"Я снял наличные рубли в ближайшем банкомате."},{"ru":"перево́д","vi":"lệnh chuyển tiền / chuyển khoản","note":"chuyển khoản qua số điện thoại (СБП)","ex":"Я отправил перевод соседу через систему быстрых платежей."},{"ru":"нали́чные","vi":"tiền mặt giấy và xu","note":"luôn dùng số nhiều (они)","ex":"В некоторых киосках принимают только наличные деньги."},{"ru":"бала́нс","vi":"số dư tài khoản ngân hàng","note":"kiểm tra qua tin nhắn hoặc app","ex":"Какой у меня текущий баланс на карте Мир?"},{"ru":"приложе́ние","vi":"ứng dụng di động (app)","note":"app ngân hàng di động","ex":"Мобильное приложение банка позволяет оплачивать связь и интернет."},{"ru":"пин-код","vi":"mã số bí mật PIN của thẻ","note":"không bao giờ tiết lộ cho người lạ","ex":"Никому не сообщайте пин-код và mã bí mật."},{"ru":"коми́ссия","vi":"phí giao dịch ngân hàng","note":"miễn phí khi chuyển qua SBP dưới hạn mức","ex":"Перевод между своими счетами выполняется без комиссии."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ bưu điện Pochta Rossii & gửi đồ',
  'A2',
  '📦',
  'Nhận bưu kiện từ Việt Nam, gửi quà lưu niệm, tra mã tracking bưu chính.',
  true,
  '[{"ru":"по́чта","vi":"bưu điện quốc gia Pochta Rossii","note":"trực thuộc bưu chính Nga","ex":"Отделение почты находится на соседней улице."},{"ru":"посы́лка","vi":"bưu kiện hàng gửi đóng thùng","note":"hàng gửi gia đình từ quê sang","ex":"Мне пришла долгожданная посылка с вьетнамским кофе."},{"ru":"письмо́","vi":"thư từ / bì thư gửi bưu điện","note":"số nhiều: письма","ex":"Я отправил заказное письмо с документами в консульство."},{"ru":"адре́с","vi":"địa chỉ cư trú người nhận","note":"ghi tên đường, số nhà, số phòng KTX","ex":"Укажите точный почтовый адрес и номер комнаты."},{"ru":"и́ндекс","vi":"mã bưu chính (ZIP code)","note":"gồm 6 chữ số bưu cục Nga","ex":"Шестизначный почтовый индекс обязателен для доставки."},{"ru":"трек-но́мер","vi":"mã số tra cứu đơn vận (tracking)","note":"tra cứu trên app Pochta","ex":"По трек-номеру видно, что посылка прибыла в Москву."},{"ru":"извеще́ние","vi":"giấy báo / thông báo nhận hàng","note":"thông báo điện tử qua app hoặc SMS","ex":"Покажите электронное извещение и паспорт оператору."},{"ru":"опера́тор","vi":"giao dịch viên bưu điện","note":"người tiếp nhận và phát bưu phẩm","ex":"Оператор почты быстро выдал посылку по штрихкоду."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ y tế & phòng khám поликлиника',
  'B1',
  '💊',
  'Bảo hiểm y tế, mô tả bệnh án, đơn thuốc bác sĩ và tiêm phòng.',
  true,
  '[{"ru":"поликли́ника","vi":"phòng khám đa khoa sinh viên","note":"nơi khám chữa bệnh ban đầu của trường","ex":"Студенческая поликлиника принимает с восьми утра."},{"ru":"медици́нский по́лис","vi":"thẻ bảo hiểm y tế bắt buộc","note":"bắt buộc mang khi đi khám bệnh viện","ex":"Прикрепитесь к поликлинике по полису ДМС."},{"ru":"терапе́вт","vi":"bác sĩ nội khoa tổng quát","note":"khám ban đầu và chuyển tuyến chuyên khoa","ex":"Терапевт выслушал жалобы и измерил артериальное давление."},{"ru":"реце́пт","vi":"đơn thuốc kê bởi bác sĩ","note":"nhiều loại kháng sinh chỉ bán khi có đơn","ex":"Этот антибиотик в аптеке отпускается только по рецепту."},{"ru":"симпто́мы","vi":"các triệu chứng lâm sàng","note":"sốt, ho, nhức đầu, mệt mỏi","ex":"Опишите врачу основные симптомы вашего недомогания."},{"ru":"спра́вка","vi":"giấy chứng nhận nghỉ ốm y tế","note":"nộp cho dekanat để miễn buổi học","ex":"Врач выписал официальную справку об освобождении от занятий."},{"ru":"температу́ра","vi":"thân nhiệt / cơn sốt","note":"высокая температура (sốt cao)","ex":"У меня поднялась высокая температура до тридцати восьми градусов."},{"ru":"апте́ка","vi":"hiệu thuốc tây","note":"ký hiệu chữ thập xanh lá cây","ex":"Круглосуточная дежурная аптека расположена возле метро."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ khoa & giáo vụ Dekanat',
  'B1',
  '🏛️',
  'Thủ tục học vụ, lịch thi cử, sổ điểm zachotka và xin gia hạn visa du học.',
  true,
  '[{"ru":"декана́т","vi":"văn phòng khoa đại học","note":"giải quyết hồ sơ học bổng, điểm và giấy tờ","ex":"Студенты обращаются в деканат за учебными справками."},{"ru":"дека́н","vi":"trưởng khoa","note":"lãnh đạo cao nhất của khoa","ex":"Приказ о переводе на следующий курс подписан деканом."},{"ru":"расписа́ние","vi":"thời khóa biểu môn học","note":"lịch học được niêm yết online","ex":"По расписанию первая пара начинается в девять утра."},{"ru":"зачётная кни́жка","vi":"sổ điểm sinh viên (zachotka)","note":"bảo bối thi cử của mọi sinh viên Nga","ex":"Преподаватель поставил отлично в зачётную книжку."},{"ru":"экза́мен","vi":"kỳ thi kết thúc học phần (cho điểm)","note":"thang điểm 5: 5 (отл), 4 (хор), 3 (удовл), 2 (неуд)","ex":"Зимняя сессия состоит из четырёх трудных экзаменов."},{"ru":"зачёт","vi":"bài kiểm tra điều kiện (đạt/không đạt)","note":"ghi là ''зачтено'' nếu vượt qua","ex":"Чтобы получить допуск к экзамену, нужно сдать зачёт."},{"ru":"аудито́рия","vi":"giảng đường / phòng học lý thuyết","note":"đánh số theo tầng và tòa nhà","ex":"Лекция по высшей математике пройдёт в большой аудитории 305."},{"ru":"стипе́ндия","vi":"học bổng nhà nước cấp hằng tháng","note":"chuyển thẳng vào thẻ ngân hàng","ex":"Студенты-отличники получают повышенную академическую стипендию."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ du lịch & khám phá nước Nga',
  'B1',
  '🚂',
  'Tàu hỏa xuyên Siberia, đặt phòng khách sạn, khám phá kỳ quan thiên nhiên Baikal, Kazan, SPb.',
  true,
  '[{"ru":"путеше́ствие","vi":"chuyến du lịch trải nghiệm","note":"du lịch xuyên các múi giờ nước Nga","ex":"Путешествие на поезде через всю Россию оставляет яркие впечатления."},{"ru":"плацка́рт","vi":"khoang giường nằm tàu hỏa mở","note":"loại vé phổ thông quen thuộc nhất của sinh viên","ex":"Билет в плацкартный вагон стоит значительно дешевле купе."},{"ru":"проводни́к","vi":"nhân viên phụ trách toa tàu","note":"phục vụ trà bằng cốc có giá kim loại podstakannik","ex":"Проводник принёс горячий чай в традиционном подстаканнике."},{"ru":"гости́ница","vi":"khách sạn lưu trú du lịch","note":"đồng nghĩa: отель","ex":"Мы забронировали недорогую гостиницу в центре Казани."},{"ru":"брони́рование","vi":"việc đặt chỗ trước","note":"đặt vé tàu xe và phòng ở","ex":"Подтверждение бронирования пришло на электронную почту."},{"ru":"достопримеча́тельность","vi":"danh lam thắng cảnh / di tích lịch sử","note":"từ ghép B1 rất thông dụng","ex":"В Санкт-Петербурге огромное количество всемирно известных достопримечательностей."},{"ru":"экску́рсия","vi":"chuyến tham quan có hướng dẫn viên","note":"đi bảo tàng Hermitage, Kremlin","ex":"Гид провёл увлекательную экскурсию по залам Эрмитажа."},{"ru":"сувени́р","vi":"quà lưu niệm kỉ niệm","note":"búp bê Matryoshka, khăn Pavlovo Posad","ex":"Туристы часто покупают матрёшек в качестве русского сувенира."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ học thuật & nghiên cứu luận văn',
  'B2',
  '🎓',
  'Thuật ngữ luận văn, bảo vệ đề tài, phản biện khoa học và trích dẫn theo chuẩn GOST.',
  true,
  '[{"ru":"дипло́мная рабо́та","vi":"khóa luận tốt nghiệp đại học","note":"công trình bảo vệ năm cuối cử nhân/thạc sĩ","ex":"Тема моей дипломной работы утверждена на заседании кафедры."},{"ru":"нау́чный руководи́тель","vi":"giáo viên hướng dẫn khoa học","note":"giáo sư định hướng đề tài nghiên cứu","ex":"Научный руководитель одобрил структуру второй главы исследования."},{"ru":"актуа́льность","vi":"tính cấp thiết của đề tài","note":"phần mở đầu bắt buộc của mọi luận văn","ex":"Актуальность темы обусловлена быстрым развитием искусственного интеллекта."},{"ru":"библиогра́фия","vi":"danh mục tài liệu tham khảo","note":"trích dẫn theo quy chuẩn GOST Nga","ex":"В конце диссертации приведена обширная библиография из сотни источников."},{"ru":"защи́та дипло́ма","vi":"buổi lễ bảo vệ đồ án tốt nghiệp","note":"thuyết trình trước hội đồng giám khảo nhà nước","ex":"Защита диплома прошла успешно с оценкой отлично."},{"ru":"реце́нзия","vi":"bài nhận xét, phản biện khoa học độc lập","note":"đánh giá từ chuyên gia phản biện","ex":"Официальный оппонент подготовил положительную рецензию на исследование."},{"ru":"гипо́теза","vi":"giả thuyết nghiên cứu khoa học","note":"được kiểm chứng qua thực nghiệm","ex":"Экспериментальные данные полностью подтвердили выдвинутую гипотезу."},{"ru":"моногра́фия","vi":"công trình chuyên khảo học thuật","note":"ấn phẩm nghiên cứu chuyên sâu một chủ đề","ex":"Профессор опубликовал фундаментальную монографию по славянской филологии."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ phỏng vấn xin việc & công sở Nga',
  'B2',
  '💼',
  'Tuyển dụng, sơ yếu lý lịch CV, hợp đồng lao động và văn hóa làm việc văn phòng Nga.',
  true,
  '[{"ru":"собесе́дование","vi":"buổi phỏng vấn tuyển dụng việc làm","note":"gặp gỡ ban nhân sự HR","ex":"Кандидат успешно прошёл техническое собеседование в IT-компании."},{"ru":"резюме́","vi":"sơ yếu lý lịch, CV ứng tuyển","note":"tóm tắt kinh nghiệm và kỹ năng","ex":"Отправьте ваше подробное резюме на электронную почту рекрутера."},{"ru":"вака́нсия","vi":"vị trí tuyển dụng đang mở","note":"tìm kiếm trên HeadHunter (hh.ru)","ex":"Компания открыла привлекательную вакансию для русскоязычных переводчиков."},{"ru":"квалифика́ция","vi":"trình độ chuyên môn năng lực","note":"bằng cấp và kỹ năng chứng minh","ex":"Высокая квалификация специалиста подтверждена международными сертификатами."},{"ru":"испыта́тельный срок","vi":"thời gian thử việc công ty","note":"thường kéo dài 1-3 tháng theo luật lao động Nga","ex":"После успешного прохождения испытательного срока сотруднику повышают оклад."},{"ru":"контра́кт","vi":"hợp đồng lao động chính thức","note":"ký kết giữa người lao động và chủ sử dụng","ex":"Трудовой договор и контракт подписаны обеими сторонами."},{"ru":"зарпла́та","vi":"mức lương tháng thỏa thuận","note":"thường chia thành avans và oklad","ex":"Заработная плата перечисляется на банковскую карту два раза в месяц."},{"ru":"колле́га","vi":"đồng nghiệp cơ quan","note":"dùng chung cho cả nam và nữ","ex":"Мои российские коллеги всегда готовы помочь советом в сложной задаче."}]'::jsonb
);

INSERT INTO vocab_jars (id, jar_name, level, icon, description, is_system, words)
VALUES (
  uuid_generate_v4(),
  'Lọ báo chí, truyền thông & dư luận',
  'B2',
  '📰',
  'Tin tức thời sự, báo chí phân tích, xu hướng truyền thông và bình luận xã hội.',
  true,
  '[{"ru":"сре́дства ма́ссовой информа́ции","vi":"phương tiện truyền thông đại chúng (SMI)","note":"báo chí, đài truyền hình, mạng xã hội","ex":"Ведущие средства массовой информации оперативно освещают мировые события."},{"ru":"публика́ция","vi":"bài báo xuất bản / ấn phẩm phát hành","note":"trên các tạp chí uy tín","ex":"Статья вызвала большой резонанс сразу после первой публикации."},{"ru":"исто́чник","vi":"nguồn thông tin dữ liệu","note":"độ tin cậy của nguồn tin","ex":"Журналист ссылается исключительно на официальные и проверенные источники."},{"ru":"обще́ственное мне́ние","vi":"dư luận xã hội / công luận","note":"khảo sát ý kiến người dân","ex":"Результаты социологического опроса отражают актуальное общественное мнение."},{"ru":"ана́лиз","vi":"phân tích chuyên sâu vấn đề","note":"đánh giá đa chiều","ex":"Эксперт представил глубокий аналитический обзор экономической ситуации."},{"ru":"прогно́з","vi":"dự báo xu hướng phát triển","note":"dự báo tương lai","ex":"Позитивный прогноз аналитиков предсказывает устойчивый рост отрасли."},{"ru":"тенде́нция","vi":"khuynh hướng / xu thế tất yếu","note":"sự dịch chuyển của dòng chảy xã hội","ex":"Цифровизация образования — ключевая глобальная тенденция современности."},{"ru":"диску́ссия","vi":"cuộc thảo luận / tọa đàm tranh luận","note":"trao đổi quan điểm học thuật","ex":"На конференции развернулась оживлённая дискуссия по актуальным проблемам науки."}]'::jsonb
);

-- 4. Nạp từ vựng chi tiết vào bảng vocabularies
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('хлеб', 'хлеб', 'Noun', 'm', 'bánh mì', '{"note":"danh từ giống đực (он)","ex":"Я покупаю свежий хлеб каждый день.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('молоко́', 'молоко', 'Noun', 'n', 'sữa tươi', '{"note":"danh từ giống trung (оно)","ex":"Пакет молока стоит 80 рублей.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('сыр', 'сыр', 'Noun', 'm', 'phô mai', '{"note":"danh từ giống đực (он)","ex":"Российский сыр очень вкусный.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('колбаса́', 'колбаса', 'Noun', 'f', 'xúc xích, giò', '{"note":"danh từ giống cái (она)","ex":"В магазине есть докторская колбаса.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('чек', 'чек', 'Noun', NULL, 'hóa đơn thanh toán', '{"note":"cần giữ khi qua cổng bảo vệ","ex":"Возьмите ваш чек, пожалуйста.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('паке́т', 'пакет', 'Noun', NULL, 'túi nilông', '{"note":"thu ngân thường hỏi: ''Пакет нужен?''","ex":"Дайте мне один большой пакет.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ка́рта', 'карта', 'Noun', NULL, 'thẻ ngân hàng', '{"note":"оплата картой (quẹt thẻ)","ex":"Вы будете платить картой или наличными?","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ски́дка', 'скидка', 'Noun', NULL, 'giảm giá / khuyến mại', '{"note":"thẻ tích điểm siêu thị","ex":"Студентам предоставляется скидка 10%.","jar":"Lọ mua sắm Auchan","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('чемода́н', 'чемодан', 'Noun', NULL, 'vali hành lý', '{"note":"chuẩn ký gửi 23kg","ex":"Мой чемодан весит двадцать два килограмма.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('па́спорт', 'паспорт', 'Noun', NULL, 'hộ chiếu quốc tế', '{"note":"luôn mang bản gốc bên người","ex":"Покажите, пожалуйста, ваш паспорт.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ви́за', 'виза', 'Noun', NULL, 'thị thực du học', '{"note":"thời hạn nhập cảnh lần đầu 90 ngày","ex":"У меня учебная виза в Россию.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('биле́т', 'билет', 'Noun', NULL, 'vé máy bay / xe khách', '{"note":"vé điện tử in sẵn giấy","ex":"Я купил билет на самолёт до Москвы.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('тёплая ку́ртка', 'теплая куртка', 'Noun', NULL, 'áo khoác ấm đại hàn', '{"note":"chịu nhiệt độ âm 20-30 độ","ex":"Зимой в Москве обязательно нужна тёплая куртка.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ша́пка', 'шапка', 'Noun', NULL, 'mũ len trùm tai', '{"note":"bảo vệ đầu chống lạnh buốt","ex":"Надень шапку, на улице сильный мороз!","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('перча́тки', 'перчатки', 'Noun', NULL, 'găng tay ấm', '{"note":"loại chống gió tuyết và cảm ứng","ex":"Кожаные перчатки отлично согревают руки.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('лека́рства', 'лекарства', 'Noun', NULL, 'thuốc men dự phòng', '{"note":"hạ sốt, cảm cúm, men tiêu hóa mang từ VN","ex":"В поездку я всегда беру домашние лекарства.","jar":"Lọ vali hành lý du học","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('аэропо́рт', 'аэропорт', 'Noun', NULL, 'sân bay / phi trường', '{"note":"ở Moskva có Sheremetyevo, Domodedovo, Vnukovo","ex":"Мы прилетели в международный аэропорт Шереметьево.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('термина́л', 'терминал', 'Noun', 'f', 'nhà ga sân bay', '{"note":"chú ý chữ cái Terminal B, C, D, E, F","ex":"Международные рейсы вылетают из терминала C.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('регистра́ция', 'регистрация', 'Noun', NULL, 'thủ tục check-in', '{"note":"mở trước giờ bay 2-3 tiếng","ex":"Где находится стойка регистрации на рейс?","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('поса́дочный тало́н', 'посадочныи талон', 'Noun', NULL, 'thẻ lên máy bay (boarding pass)', '{"note":"giữ cùng hộ chiếu để qua cửa gate","ex":"Предъявите посадочный талон при входе в самолёт.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('бага́ж', 'багаж', 'Noun', NULL, 'hành lý ký gửi', '{"note":"nhận tại băng chuyền sân bay","ex":"Где выдают багаж после рейса из Ханоя?","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ручна́я кладь', 'ручная кладь', 'Noun', NULL, 'hành lý xách tay', '{"note":"tối đa 8-10kg tùy hãng","ex":"Ручную кладь можно взять с собой в салон.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('вы́ход на поса́дку', 'выход на посадку', 'Noun', NULL, 'cửa ra máy bay (gate)', '{"note":"theo dõi màn hình thông báo cửa","ex":"Посадка начинается у выхода номер тридцать два.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('тамо́жня', 'таможня', 'Noun', NULL, 'hải quan sân bay', '{"note":"khai báo nếu mang đồ vượt hạn mức","ex":"Мы быстро прошли паспортный контроль и таможню.","jar":"Lọ sân bay Sheremetyevo","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('семья́', 'семья', 'Noun', 'f', 'gia đình', '{"note":"danh từ giống cái (она)","ex":"У меня большая и дружная семья во Вьетнаме.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('роди́тели', 'родители', 'Noun', NULL, 'bố mẹ / phụ huynh', '{"note":"luôn dùng số nhiều (они)","ex":"Мои родители звонят мне по видеосвязи каждый вечер.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('оте́ц', 'отец', 'Noun', NULL, 'bố / người cha', '{"note":"dạng thân mật: папа","ex":"Мой отец работает инженером.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('мать', 'мать', 'Noun', NULL, 'mẹ / người mẹ', '{"note":"dạng thân mật: мама","ex":"Моя мама готовит самые вкусные вьетнамские блюда.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('брат', 'брат', 'Noun', NULL, 'anh / em trai', '{"note":"старший брат (anh), младший брат (em)","ex":"Мой старший брат тоже учился за границей.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('сестра́', 'сестра', 'Noun', NULL, 'chị / em gái', '{"note":"старшая сестра (chị), младшая сестра (em)","ex":"Моя сестра учит русский язык в школе.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('друг', 'друг', 'Noun', NULL, 'bạn thân / người bạn nam', '{"note":"số nhiều: друзья","ex":"Антон — мой лучший русский друг в университете.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('подру́га', 'подруга', 'Noun', 'f', 'bạn nữ / bạn gái', '{"note":"danh từ giống cái (она)","ex":"Моя подруга Лена помогает мне с русским произношением.","jar":"Lọ gia đình & người thân","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('у́тро', 'утро', 'Noun', NULL, 'buổi sáng', '{"note":"Доброе утро! (Chào buổi sáng!)","ex":"Каждое утро я встаю в семь часов и делаю зарядку.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('день', 'день', 'Noun', NULL, 'buổi trưa / ban ngày', '{"note":"Добрый день! (Chào buổi trưa/chiều!)","ex":"Днём у нас обычно три пары в институте.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ве́чер', 'вечер', 'Noun', NULL, 'buổi tối', '{"note":"Добрый вечер! (Chào buổi tối!)","ex":"Вечером студенты повторяют новые слова и делают уроки.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ночь', 'ночь', 'Noun', NULL, 'ban đêm', '{"note":"Спокойной ночи! (Chúc ngủ ngon!)","ex":"Ночью в общежитии тихо, все отдыхают.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('за́втрак', 'завтрак', 'Verb', NULL, 'bữa ăn sáng', '{"note":"động từ: завтракать","ex":"На завтрак я ем овсяную кашу и пью кофе.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('обе́д', 'обед', 'Verb', NULL, 'bữa ăn trưa', '{"note":"động từ: обедать","ex":"Мы идём на обед в университетскую столовую.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('у́жин', 'ужин', 'Verb', NULL, 'bữa ăn tối', '{"note":"động từ: ужинать","ex":"После занятий мы вместе готовим вкусный ужин.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('отды́х', 'отдых', 'Verb', NULL, 'sự nghỉ ngơi / thư giãn', '{"note":"động từ: отдыхать","ex":"В воскресенье у нас свободное время и хороший отдых.","jar":"Lọ sinh hoạt hằng ngày","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пого́да', 'погода', 'Noun', NULL, 'thời tiết', '{"note":"Какая сегодня погода? (Thời tiết hôm nay thế nào?)","ex":"Сегодня на улице прекрасная солнечная погода.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('зима́', 'зима', 'Adverb', NULL, 'mùa đông', '{"note":"trạng từ: зимой (vào mùa đông)","ex":"Русская зима очень холодная, но невероятно красивая.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('снег', 'снег', 'Noun', NULL, 'tuyết / bông tuyết', '{"note":"идёт снег (tuyết đang rơi)","ex":"Зимой в Москве почти каждый день идёт белый снег.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('моро́з', 'мороз', 'Noun', NULL, 'giá rét / sương giá', '{"note":"nhiệt độ dưới 0°C buốt da","ex":"Сегодня на улице мороз минус пятнадцать градусов.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('весна́', 'весна', 'Adverb', NULL, 'mùa xuân', '{"note":"trạng từ: весной (vào mùa xuân)","ex":"Весной тает снег и распускаются первые листья.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ле́то', 'лето', 'Adverb', NULL, 'mùa hè', '{"note":"trạng từ: летом (vào mùa hè)","ex":"Летом в Санкт-Петербурге начинаются белые ночи.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('о́сень', 'осень', 'Adverb', NULL, 'mùa thu', '{"note":"trạng từ: осенью (vào mùa thu)","ex":"Золотая осень в России — любимое время поэтов.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('дождь', 'дождь', 'Noun', NULL, 'cơn mưa', '{"note":"идёт дождь (trời đang mưa)","ex":"Возьми зонт, на улице идёт сильный дождь.","jar":"Lọ thời tiết & 4 mùa Nga","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('го́род', 'город', 'Noun', NULL, 'thành phố / đô thị', '{"note":"số nhiều: города","ex":"Москва — огромный и современный европейский город.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('у́лица', 'улица', 'Noun', NULL, 'con đường / tuyến phố', '{"note":"на улице (ở ngoài phố)","ex":"Наш университет находится на тихой красивой улице.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пло́щадь', 'площадь', 'Noun', 'f', 'quảng trường', '{"note":"danh từ giống cái (она)","ex":"Красная площадь — главное историческое место столицы.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('остано́вка', 'остановка', 'Noun', NULL, 'điểm dừng xe buýt / trạm đón', '{"note":"автобусная остановка","ex":"Автобусная остановка находится прямо напротив общежития.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пра́во', 'право', 'Noun', NULL, 'bên phải', '{"note":"направо (rẽ sang phải)","ex":"Поверните направо возле большого торгового центра.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ле́во', 'лево', 'Noun', NULL, 'bên trái', '{"note":"налево (rẽ sang trái)","ex":"Аптека расположена слева от входа в метро.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пря́мо', 'прямо', 'Noun', NULL, 'đi thẳng', '{"note":"идите прямо (hãy đi thẳng)","ex":"Идите прямо двести метров, и вы увидите парк.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('центр', 'центр', 'Noun', 'n', 'trung tâm thành phố', '{"note":"в центре (ở trung tâm)","ex":"Мы любим гулять в центре Москвы по выходным.","jar":"Lọ thành phố & hỏi đường","level":"A1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('общежи́тие', 'общежитие', 'Noun', NULL, 'ký túc xá sinh viên', '{"note":"viết tắt thường gọi: общага","ex":"Наше студенческое общежитие находится недалеко от метро.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ко́мната', 'комната', 'Noun', NULL, 'phòng ở sinh viên', '{"note":"thường xếp 2-3 bạn một phòng","ex":"В нашей комнате живут студенты из Вьетнама и Китая.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ключ', 'ключ', 'Noun', NULL, 'chìa khóa phòng', '{"note":"gửi chìa khóa ở quầy trực khi ra ngoài","ex":"Не забудьте сдать ключ на вахту дежурному.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('сосе́д', 'сосед', 'Noun', NULL, 'bạn cùng phòng nam', '{"note":"соседка (bạn nữ)","ex":"Мой сосед по комнате отлично говорит по-русски.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ку́хня', 'кухня', 'Noun', NULL, 'bếp ăn chung', '{"note":"mỗi tầng thường có 1-2 bếp chung","ex":"На кухне установлены две газовые плиты и мойка.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пра́чечная', 'прачечная', 'Noun', NULL, 'phòng giặt là tự động', '{"note":"máy giặt công cộng đặt dưới tầng hầm","ex":"В прачечной можно постирать постельное бельё за жетон.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('дежу́рный', 'дежурныи', 'Noun', NULL, 'bác bảo vệ / quản lý trực ban', '{"note":"người quản lý cổng ra vào","ex":"Дежурный проверяет пропуска у всех входящих.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('про́пуск', 'пропуск', 'Noun', NULL, 'thẻ ra vào KTX', '{"note":"quẹt thẻ từ khi qua cửa kiểm soát","ex":"Всегда носите пропуск с собой при выходе на улицу.","jar":"Lọ ký túc xá & phòng ở","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('меню́', 'меню', 'Noun', NULL, 'thực đơn', '{"note":"''Дайте, пожалуйста, меню''","ex":"Официант принёс нам меню на русском языке.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('борщ', 'борщ', 'Noun', NULL, 'súp củ dền đỏ truyền thống', '{"note":"ăn kèm váng sữa сметана và tỏi","ex":"Горячий борщ со сметаной — лучшее блюдо в холодную зиму.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('блины́', 'блины', 'Noun', NULL, 'bánh xèo blini', '{"note":"nhân mặn thịt băm hoặc nhân ngọt mứt dâu","ex":"На Масленицу в России пекут и едят вкусные блины.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пельме́ни', 'пельмени', 'Noun', NULL, 'sủi cảo thịt kiểu Nga', '{"note":"món ăn nhanh phổ biến nhất của sinh viên","ex":"Мы сварили пачку пельменей на скорый обед.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('смета́на', 'сметана', 'Noun', 'f', 'kem chua váng sữa', '{"note":"danh từ giống cái (она)","ex":"Борщ всегда подают со свежей сметаной и зеленью.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('чай с лимо́ном', 'чаи с лимоном', 'Noun', NULL, 'trà đen kèm lát chanh tươi', '{"note":"thức uống sưởi ấm mùa đông yêu thích của người Nga","ex":"После мороза приятно выпить горячий чай с лимоном.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('официа́нт', 'официант', 'Noun', NULL, 'người phục vụ bàn', '{"note":"nữ: официантка","ex":"Мы подозвали официанта и сделали заказ.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('счёт', 'счет', 'Noun', NULL, 'hóa đơn tính tiền', '{"note":"''Дайте, пожалуйста, счёт''","ex":"Принесите, пожалуйста, счёт: мы платим раздельно.","jar":"Lọ quán ăn & ẩm thực Nga","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ста́нция', 'станция', 'Noun', NULL, 'nhà ga tàu điện ngầm', '{"note":"nhiều ga là kiệt tác kiến trúc cung điện ngầm","ex":"Станция Маяковская признана одной из красивейших в мире.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('перехо́д', 'переход', 'Noun', NULL, 'lối chuyển tuyến giữa các ga', '{"note":"theo dõi biển chỉ dẫn màu sắc đường kính","ex":"Здесь удобный переход на кольцевую коричневую ветку.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ка́рта Тро́йка', 'карта троика', 'Noun', NULL, 'thẻ giao thông Troika', '{"note":"thẻ tích hợp đi tàu điện ngầm, xe buýt, tramvaj","ex":"Я пополнил карту Тройка на месяц по студенческому тарифу.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('турнике́т', 'турникет', 'Noun', NULL, 'cổng kiểm soát vé tự động', '{"note":"chạm thẻ vào vòng tròn sáng xanh","ex":"Приложите карту к валидатору турникета для прохода.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('эскала́тор', 'эскалатор', 'Noun', NULL, 'thang cuốn sâu lòng đất', '{"note":"quy tắc vàng: đứng bên phải, nhường đi bên trái","ex":"Стойте справа на эскалаторе, чтобы пропустить спешащих.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('по́езд', 'поезд', 'Noun', NULL, 'đoàn tàu điện ngầm', '{"note":"khoảng cách giữa các chuyến chỉ 90 giây","ex":"Следующий поезд прибудет через полторы минуты.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ваго́н', 'вагон', 'Noun', NULL, 'toa tàu ngầm', '{"note":"toa mới có điều hòa và cổng sạc USB","ex":"В современных вагонах метро есть бесплатный Wi-Fi.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('вы́ход в го́род', 'выход в город', 'Noun', NULL, 'lối ra khỏi ga lên mặt đất', '{"note":"xem số thứ tự cửa ra theo biển chỉ dẫn","ex":"Вам нужен выход в город номер три к главному входу в парк.","jar":"Lọ tàu điện ngầm Moskva","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('банк', 'банк', 'Noun', NULL, 'ngân hàng', '{"note":"các ngân hàng phổ biến: Sberbank, VTB, Tinkoff","ex":"Студенты открывают карты в отделении Сбербанка.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('банкома́т', 'банкомат', 'Noun', NULL, 'cây rút tiền tự động ATM', '{"note":"có chức năng nạp tiền (внесение) và rút tiền (снятие)","ex":"Я снял наличные рубли в ближайшем банкомате.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('перево́д', 'перевод', 'Noun', NULL, 'lệnh chuyển tiền / chuyển khoản', '{"note":"chuyển khoản qua số điện thoại (СБП)","ex":"Я отправил перевод соседу через систему быстрых платежей.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('нали́чные', 'наличные', 'Noun', NULL, 'tiền mặt giấy và xu', '{"note":"luôn dùng số nhiều (они)","ex":"В некоторых киосках принимают только наличные деньги.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('бала́нс', 'баланс', 'Noun', NULL, 'số dư tài khoản ngân hàng', '{"note":"kiểm tra qua tin nhắn hoặc app","ex":"Какой у меня текущий баланс на карте Мир?","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('приложе́ние', 'приложение', 'Noun', NULL, 'ứng dụng di động (app)', '{"note":"app ngân hàng di động","ex":"Мобильное приложение банка позволяет оплачивать связь и интернет.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('пин-код', 'пин-код', 'Noun', NULL, 'mã số bí mật PIN của thẻ', '{"note":"không bao giờ tiết lộ cho người lạ","ex":"Никому не сообщайте пин-код và mã bí mật.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('коми́ссия', 'комиссия', 'Noun', NULL, 'phí giao dịch ngân hàng', '{"note":"miễn phí khi chuyển qua SBP dưới hạn mức","ex":"Перевод между своими счетами выполняется без комиссии.","jar":"Lọ ngân hàng & thẻ Sberbank","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('по́чта', 'почта', 'Noun', NULL, 'bưu điện quốc gia Pochta Rossii', '{"note":"trực thuộc bưu chính Nga","ex":"Отделение почты находится на соседней улице.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('посы́лка', 'посылка', 'Noun', NULL, 'bưu kiện hàng gửi đóng thùng', '{"note":"hàng gửi gia đình từ quê sang","ex":"Мне пришла долгожданная посылка с вьетнамским кофе.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('письмо́', 'письмо', 'Noun', NULL, 'thư từ / bì thư gửi bưu điện', '{"note":"số nhiều: письма","ex":"Я отправил заказное письмо с документами в консульство.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('адре́с', 'адрес', 'Noun', NULL, 'địa chỉ cư trú người nhận', '{"note":"ghi tên đường, số nhà, số phòng KTX","ex":"Укажите точный почтовый адрес и номер комнаты.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('и́ндекс', 'индекс', 'Noun', NULL, 'mã bưu chính (ZIP code)', '{"note":"gồm 6 chữ số bưu cục Nga","ex":"Шестизначный почтовый индекс обязателен для доставки.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('трек-но́мер', 'трек-номер', 'Noun', NULL, 'mã số tra cứu đơn vận (tracking)', '{"note":"tra cứu trên app Pochta","ex":"По трек-номеру видно, что посылка прибыла в Москву.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('извеще́ние', 'извещение', 'Noun', NULL, 'giấy báo / thông báo nhận hàng', '{"note":"thông báo điện tử qua app hoặc SMS","ex":"Покажите электронное извещение и паспорт оператору.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('опера́тор', 'оператор', 'Noun', NULL, 'giao dịch viên bưu điện', '{"note":"người tiếp nhận và phát bưu phẩm","ex":"Оператор почты быстро выдал посылку по штрихкоду.","jar":"Lọ bưu điện Pochta Rossii & gửi đồ","level":"A2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('поликли́ника', 'поликлиника', 'Noun', NULL, 'phòng khám đa khoa sinh viên', '{"note":"nơi khám chữa bệnh ban đầu của trường","ex":"Студенческая поликлиника принимает с восьми утра.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('медици́нский по́лис', 'медицинскии полис', 'Noun', NULL, 'thẻ bảo hiểm y tế bắt buộc', '{"note":"bắt buộc mang khi đi khám bệnh viện","ex":"Прикрепитесь к поликлинике по полису ДМС.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('терапе́вт', 'терапевт', 'Noun', NULL, 'bác sĩ nội khoa tổng quát', '{"note":"khám ban đầu và chuyển tuyến chuyên khoa","ex":"Терапевт выслушал жалобы и измерил артериальное давление.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('реце́пт', 'рецепт', 'Noun', NULL, 'đơn thuốc kê bởi bác sĩ', '{"note":"nhiều loại kháng sinh chỉ bán khi có đơn","ex":"Этот антибиотик в аптеке отпускается только по рецепту.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('симпто́мы', 'симптомы', 'Noun', NULL, 'các triệu chứng lâm sàng', '{"note":"sốt, ho, nhức đầu, mệt mỏi","ex":"Опишите врачу основные симптомы вашего недомогания.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('спра́вка', 'справка', 'Noun', NULL, 'giấy chứng nhận nghỉ ốm y tế', '{"note":"nộp cho dekanat để miễn buổi học","ex":"Врач выписал официальную справку об освобождении от занятий.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('температу́ра', 'температура', 'Noun', NULL, 'thân nhiệt / cơn sốt', '{"note":"высокая температура (sốt cao)","ex":"У меня поднялась высокая температура до тридцати восьми градусов.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('апте́ка', 'аптека', 'Noun', NULL, 'hiệu thuốc tây', '{"note":"ký hiệu chữ thập xanh lá cây","ex":"Круглосуточная дежурная аптека расположена возле метро.","jar":"Lọ y tế & phòng khám поликлиника","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('декана́т', 'деканат', 'Noun', NULL, 'văn phòng khoa đại học', '{"note":"giải quyết hồ sơ học bổng, điểm và giấy tờ","ex":"Студенты обращаются в деканат за учебными справками.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('дека́н', 'декан', 'Noun', NULL, 'trưởng khoa', '{"note":"lãnh đạo cao nhất của khoa","ex":"Приказ о переводе на следующий курс подписан деканом.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('расписа́ние', 'расписание', 'Noun', NULL, 'thời khóa biểu môn học', '{"note":"lịch học được niêm yết online","ex":"По расписанию первая пара начинается в девять утра.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('зачётная кни́жка', 'зачетная книжка', 'Noun', NULL, 'sổ điểm sinh viên (zachotka)', '{"note":"bảo bối thi cử của mọi sinh viên Nga","ex":"Преподаватель поставил отлично в зачётную книжку.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('экза́мен', 'экзамен', 'Noun', NULL, 'kỳ thi kết thúc học phần (cho điểm)', '{"note":"thang điểm 5: 5 (отл), 4 (хор), 3 (удовл), 2 (неуд)","ex":"Зимняя сессия состоит из четырёх трудных экзаменов.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('зачёт', 'зачет', 'Noun', NULL, 'bài kiểm tra điều kiện (đạt/không đạt)', '{"note":"ghi là ''зачтено'' nếu vượt qua","ex":"Чтобы получить допуск к экзамену, нужно сдать зачёт.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('аудито́рия', 'аудитория', 'Noun', NULL, 'giảng đường / phòng học lý thuyết', '{"note":"đánh số theo tầng và tòa nhà","ex":"Лекция по высшей математике пройдёт в большой аудитории 305.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('стипе́ндия', 'стипендия', 'Noun', NULL, 'học bổng nhà nước cấp hằng tháng', '{"note":"chuyển thẳng vào thẻ ngân hàng","ex":"Студенты-отличники получают повышенную академическую стипендию.","jar":"Lọ khoa & giáo vụ Dekanat","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('путеше́ствие', 'путешествие', 'Noun', NULL, 'chuyến du lịch trải nghiệm', '{"note":"du lịch xuyên các múi giờ nước Nga","ex":"Путешествие на поезде через всю Россию оставляет яркие впечатления.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('плацка́рт', 'плацкарт', 'Noun', NULL, 'khoang giường nằm tàu hỏa mở', '{"note":"loại vé phổ thông quen thuộc nhất của sinh viên","ex":"Билет в плацкартный вагон стоит значительно дешевле купе.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('проводни́к', 'проводник', 'Noun', NULL, 'nhân viên phụ trách toa tàu', '{"note":"phục vụ trà bằng cốc có giá kim loại podstakannik","ex":"Проводник принёс горячий чай в традиционном подстаканнике.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('гости́ница', 'гостиница', 'Noun', NULL, 'khách sạn lưu trú du lịch', '{"note":"đồng nghĩa: отель","ex":"Мы забронировали недорогую гостиницу в центре Казани.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('брони́рование', 'бронирование', 'Noun', NULL, 'việc đặt chỗ trước', '{"note":"đặt vé tàu xe và phòng ở","ex":"Подтверждение бронирования пришло на электронную почту.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('достопримеча́тельность', 'достопримечательность', 'Noun', NULL, 'danh lam thắng cảnh / di tích lịch sử', '{"note":"từ ghép B1 rất thông dụng","ex":"В Санкт-Петербурге огромное количество всемирно известных достопримечательностей.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('экску́рсия', 'экскурсия', 'Noun', NULL, 'chuyến tham quan có hướng dẫn viên', '{"note":"đi bảo tàng Hermitage, Kremlin","ex":"Гид провёл увлекательную экскурсию по залам Эрмитажа.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('сувени́р', 'сувенир', 'Noun', NULL, 'quà lưu niệm kỉ niệm', '{"note":"búp bê Matryoshka, khăn Pavlovo Posad","ex":"Туристы часто покупают матрёшек в качестве русского сувенира.","jar":"Lọ du lịch & khám phá nước Nga","level":"B1"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('дипло́мная рабо́та', 'дипломная работа', 'Noun', NULL, 'khóa luận tốt nghiệp đại học', '{"note":"công trình bảo vệ năm cuối cử nhân/thạc sĩ","ex":"Тема моей дипломной работы утверждена на заседании кафедры.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('нау́чный руководи́тель', 'научныи руководитель', 'Noun', NULL, 'giáo viên hướng dẫn khoa học', '{"note":"giáo sư định hướng đề tài nghiên cứu","ex":"Научный руководитель одобрил структуру второй главы исследования.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('актуа́льность', 'актуальность', 'Noun', NULL, 'tính cấp thiết của đề tài', '{"note":"phần mở đầu bắt buộc của mọi luận văn","ex":"Актуальность темы обусловлена быстрым развитием искусственного интеллекта.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('библиогра́фия', 'библиография', 'Noun', NULL, 'danh mục tài liệu tham khảo', '{"note":"trích dẫn theo quy chuẩn GOST Nga","ex":"В конце диссертации приведена обширная библиография из сотни источников.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('защи́та дипло́ма', 'защита диплома', 'Noun', NULL, 'buổi lễ bảo vệ đồ án tốt nghiệp', '{"note":"thuyết trình trước hội đồng giám khảo nhà nước","ex":"Защита диплома прошла успешно с оценкой отлично.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('реце́нзия', 'рецензия', 'Noun', NULL, 'bài nhận xét, phản biện khoa học độc lập', '{"note":"đánh giá từ chuyên gia phản biện","ex":"Официальный оппонент подготовил положительную рецензию на исследование.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('гипо́теза', 'гипотеза', 'Noun', NULL, 'giả thuyết nghiên cứu khoa học', '{"note":"được kiểm chứng qua thực nghiệm","ex":"Экспериментальные данные полностью подтвердили выдвинутую гипотезу.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('моногра́фия', 'монография', 'Noun', NULL, 'công trình chuyên khảo học thuật', '{"note":"ấn phẩm nghiên cứu chuyên sâu một chủ đề","ex":"Профессор опубликовал фундаментальную монографию по славянской филологии.","jar":"Lọ học thuật & nghiên cứu luận văn","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('собесе́дование', 'собеседование', 'Noun', NULL, 'buổi phỏng vấn tuyển dụng việc làm', '{"note":"gặp gỡ ban nhân sự HR","ex":"Кандидат успешно прошёл техническое собеседование в IT-компании.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('резюме́', 'резюме', 'Noun', NULL, 'sơ yếu lý lịch, CV ứng tuyển', '{"note":"tóm tắt kinh nghiệm và kỹ năng","ex":"Отправьте ваше подробное резюме на электронную почту рекрутера.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('вака́нсия', 'вакансия', 'Noun', NULL, 'vị trí tuyển dụng đang mở', '{"note":"tìm kiếm trên HeadHunter (hh.ru)","ex":"Компания открыла привлекательную вакансию для русскоязычных переводчиков.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('квалифика́ция', 'квалификация', 'Noun', NULL, 'trình độ chuyên môn năng lực', '{"note":"bằng cấp và kỹ năng chứng minh","ex":"Высокая квалификация специалиста подтверждена международными сертификатами.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('испыта́тельный срок', 'испытательныи срок', 'Noun', NULL, 'thời gian thử việc công ty', '{"note":"thường kéo dài 1-3 tháng theo luật lao động Nga","ex":"После успешного прохождения испытательного срока сотруднику повышают оклад.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('контра́кт', 'контракт', 'Noun', NULL, 'hợp đồng lao động chính thức', '{"note":"ký kết giữa người lao động và chủ sử dụng","ex":"Трудовой договор и контракт подписаны обеими сторонами.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('зарпла́та', 'зарплата', 'Noun', NULL, 'mức lương tháng thỏa thuận', '{"note":"thường chia thành avans và oklad","ex":"Заработная плата перечисляется на банковскую карту два раза в месяц.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('колле́га', 'коллега', 'Noun', NULL, 'đồng nghiệp cơ quan', '{"note":"dùng chung cho cả nam và nữ","ex":"Мои российские коллеги всегда готовы помочь советом в сложной задаче.","jar":"Lọ phỏng vấn xin việc & công sở Nga","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('сре́дства ма́ссовой информа́ции', 'средства массовои информации', 'Noun', NULL, 'phương tiện truyền thông đại chúng (SMI)', '{"note":"báo chí, đài truyền hình, mạng xã hội","ex":"Ведущие средства массовой информации оперативно освещают мировые события.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('публика́ция', 'публикация', 'Noun', NULL, 'bài báo xuất bản / ấn phẩm phát hành', '{"note":"trên các tạp chí uy tín","ex":"Статья вызвала большой резонанс сразу после первой публикации.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('исто́чник', 'источник', 'Noun', NULL, 'nguồn thông tin dữ liệu', '{"note":"độ tin cậy của nguồn tin","ex":"Журналист ссылается исключительно на официальные и проверенные источники.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('обще́ственное мне́ние', 'общественное мнение', 'Noun', NULL, 'dư luận xã hội / công luận', '{"note":"khảo sát ý kiến người dân","ex":"Результаты социологического опроса отражают актуальное общественное мнение.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('ана́лиз', 'анализ', 'Noun', NULL, 'phân tích chuyên sâu vấn đề', '{"note":"đánh giá đa chiều","ex":"Эксперт представил глубокий аналитический обзор экономической ситуации.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('прогно́з', 'прогноз', 'Noun', NULL, 'dự báo xu hướng phát triển', '{"note":"dự báo tương lai","ex":"Позитивный прогноз аналитиков предсказывает устойчивый рост отрасли.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('тенде́нция', 'тенденция', 'Noun', NULL, 'khuynh hướng / xu thế tất yếu', '{"note":"sự dịch chuyển của dòng chảy xã hội","ex":"Цифровизация образования — ключевая глобальная тенденция современности.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
INSERT INTO vocabularies (word_with_stress, word_normalized, pos, gender, meaning_vi, cases_table)
VALUES ('диску́ссия', 'дискуссия', 'Noun', NULL, 'cuộc thảo luận / tọa đàm tranh luận', '{"note":"trao đổi quan điểm học thuật","ex":"На конференции развернулась оживлённая дискуссия по актуальным проблемам науки.","jar":"Lọ báo chí, truyền thông & dư luận","level":"B2"}'::jsonb)
ON CONFLICT DO NOTHING;
