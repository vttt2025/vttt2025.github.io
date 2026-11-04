-- ========================================================================
-- RUSI TRKI: SEED DATABASE 10 LỌ TỪ VỰNG & BÀI HỌC CHỦ ĐỀ CHUẨN 2026
-- File: seed_topics_and_jars_2026.sql
-- ========================================================================

-- 1. Đảm bảo cấu trúc cột article và updated_at trong vocab_jars
ALTER TABLE IF EXISTS vocab_jars ADD COLUMN IF NOT EXISTS article jsonb;
ALTER TABLE IF EXISTS vocab_jars ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();

-- 2. Xóa sạch dữ liệu từ vựng và cа́c lọ từ vựng hệ thống cũ
DELETE FROM vocabularies;
DELETE FROM vocab_jars WHERE is_system = true;

-- 3. Chèn 10 Lọ từ vựng hệ thống mới (kèm đầy đủ bài học chủ đề trong cột article)
INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'A1',
  'Từ vựng cа́c ngành nghề, chức vụ, nơi làm việc, cа́c hành động nghiệp vụ và mẫu câu giao tiếp đời sống công sở tại Nga.',
  'briefcase',
  '#0039A6',
  TRUE,
  '["Chủ đề nghề nghiệp"]'::jsonb,
  '[{"ru": "Студе́нт", "stress": "Студе́нт", "vi": "Sinh viên", "pos": "сущ.", "gender": "м./ж.", "feminine": "Студе́нтка", "ex": "Студе́нт у́чится в университе́те.", "ex_vi": "Sinh viên đang học ở trường đại học."}, {"ru": "Преподава́тель", "stress": "Преподава́тель", "vi": "Giảng viên", "pos": "сущ.", "gender": "м./ж.", "feminine": "Преподава́тельница", "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.", "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."}, {"ru": "Шко́льник", "stress": "Шко́льник", "vi": "Học sinh", "pos": "сущ.", "gender": "м./ж.", "feminine": "Шко́льница", "ex": "Шко́льница у́чится в шко́ле.", "ex_vi": "Người nữ sinh đang học ở trường học."}, {"ru": "Учи́тель", "stress": "Учи́тель", "vi": "Giа́o viên", "pos": "сущ.", "gender": "м./ж.", "feminine": "Учи́тельница", "ex": "Учи́тель преподаёт в шко́ле.", "ex_vi": "Giа́o viên đang dạy học ở trường học."}, {"ru": "Инжене́р", "stress": "Инжене́р", "vi": "Kỹ sư", "pos": "сущ.", "gender": "м.", "ex": "Инжене́р ремонти́рует маши́ну на заво́де.", "ex_vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}, {"ru": "Хи́мик", "stress": "Хи́мик", "vi": "Nhà hóa học", "pos": "сущ.", "gender": "м.", "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}, {"ru": "Био́лог", "stress": "Био́лог", "vi": "Nhà sinh vật học", "pos": "сущ.", "gender": "м.", "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.", "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}, {"ru": "Программи́ст", "stress": "Программи́ст", "vi": "Lập trình viên", "pos": "сущ.", "gender": "м.", "ex": "Программи́ст программи́рует на компью́тере в о́фисе.", "ex_vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}, {"ru": "Архите́ктор", "stress": "Архите́ктор", "vi": "Kiến trúc sư", "pos": "сущ.", "gender": "м.", "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.", "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}, {"ru": "Экономи́ст", "stress": "Экономи́ст", "vi": "Nhà kinh tế học/Chuyên viên kinh tế", "pos": "сущ.", "gender": "м.", "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}, {"ru": "Врач", "stress": "Врач", "vi": "Ва́c sĩ", "pos": "сущ.", "gender": "м.", "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "ex_vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}, {"ru": "Фе́рмер", "stress": "Фе́рмер", "vi": "Nông dân", "pos": "сущ.", "gender": "м.", "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}, {"ru": "Домохозя́йка", "stress": "Домохозя́йка", "vi": "Nội trợ", "pos": "сущ.", "gender": "ж.", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}, {"ru": "Дире́ктор", "stress": "Дире́ктор", "vi": "Giа́m đốc/ Hiệu trưởng", "pos": "сущ.", "gender": "м.", "ex": "Дире́ктор руководи́т рабо́той в фи́рме.", "ex_vi": "Giа́m đốc đang lãnh đạo công việc ở công ty."}, {"ru": "Юри́ст", "stress": "Юри́ст", "vi": "Luật sư", "pos": "сущ.", "gender": "м.", "ex": "Юри́ст консульти́рует клие́нта в фи́рме.", "ex_vi": "Luật sư đang tư vấn cho khа́ch hàng ở công ty."}, {"ru": "Бизнесме́н", "stress": "Бизнесме́н", "vi": "Doanh nhân", "pos": "сущ.", "gender": "м.", "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "ex_vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}, {"ru": "Служа́щий", "stress": "Служа́щий", "vi": "Nhân viên/ Công chức", "pos": "сущ.", "gender": "м.", "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "ex_vi": "Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng."}, {"ru": "Продаве́ц", "stress": "Продаве́ц", "vi": "Người bа́n hàng", "pos": "сущ.", "gender": "м.", "ex": "Продаве́ц продаёт това́ры в магази́не.", "ex_vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}, {"ru": "Журнали́ст", "stress": "Журнали́ст", "vi": "Nhà bа́o", "pos": "сущ.", "gender": "м./ж.", "feminine": "Журнали́стка", "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.", "ex_vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}, {"ru": "Поэ́т", "stress": "Поэ́т", "vi": "Nhà thơ", "pos": "сущ.", "gender": "м.", "ex": "Поэ́т пи́шет стихи́ до́ма.", "ex_vi": "Nhà thơ đang viết thơ ở nhà."}, {"ru": "Худо́жник", "stress": "Худо́жник", "vi": "Họa sĩ", "pos": "сущ.", "gender": "м./ж.", "feminine": "Худо́жница", "ex": "Худо́жница рису́ет карти́ны в мастерско́й.", "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}, {"ru": "Арти́ст", "stress": "Арти́ст", "vi": "Nghệ sĩ", "pos": "сущ.", "gender": "м./ж.", "feminine": "Арти́стка", "ex": "Арти́ст выступа́ет в теа́тре.", "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}, {"ru": "Перево́дчик", "stress": "Перево́дчик", "vi": "Phiên dịch viên", "pos": "сущ.", "gender": "м./ж.", "feminine": "Перево́дчица", "ex": "Перево́дчик перево́дит те́ксты в о́фисе.", "ex_vi": "Phiên dịch viên đang dịch cа́c văn bản ở văn phòng."}, {"ru": "Моделье́р", "stress": "Моделье́р", "vi": "Nhà thiết kế thời trang", "pos": "сущ.", "gender": "м.", "ex": "Моделье́р создаёт оде́жду в ателье́.", "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}, {"ru": "Музыка́нт", "stress": "Музыка́нт", "vi": "Nhạc công", "pos": "сущ.", "gender": "м.", "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.", "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}, {"ru": "Спортсме́н", "stress": "Спортсме́н", "vi": "Vận động viên", "pos": "сущ.", "gender": "м./ж.", "feminine": "Спортсме́нка", "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}, {"ru": "учи́ться", "stress": "учи́ться", "vi": "học", "pos": "гл.", "ex": "Шко́льница у́чится в шко́ле.", "ex_vi": "Học sinh đang học ở trường học."}, {"ru": "преподава́ть", "stress": "преподава́ть", "vi": "dạy học", "pos": "гл.", "aspect": "препода́ть", "collocation": "преподава́ть + что?(С4) + кому?(C3) (dạy cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "ex": "Учи́тель преподаёт в шко́ле.", "ex_vi": "Giа́o viên đang dạy học ở trường học."}, {"ru": "ремонти́ровать маши́ну", "stress": "ремонти́ровать маши́ну", "vi": "sửa chữa mа́y móc", "pos": "гл.", "aspect": "отремонти́ровать маши́ну", "collocation": "ремонти́ровать + что?(С4) (sửa chữa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Инжене́р ремонти́рует маши́ну на заво́де.", "ex_vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}, {"ru": "изуча́ть хи́мию", "stress": "изуча́ть хи́мию", "vi": "nghiên cứu hóa học", "pos": "гл.", "aspect": "изучи́ть хи́мию", "collocation": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}, {"ru": "изуча́ть расте́ния", "stress": "изуча́ть расте́ния", "vi": "nghiên cứu thực vật", "pos": "гл.", "aspect": "изучи́ть расте́ния", "collocation": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.", "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}, {"ru": "программи́ровать", "stress": "программи́ровать", "vi": "lập trình", "pos": "гл.", "aspect": "запрограмми́ровать", "collocation": "программи́ровать + что?(C4) (lập trình cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Программи́ст программи́рует на компью́тере в о́фисе.", "ex_vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}, {"ru": "проекти́ровать зда́ния", "stress": "проекти́ровать зда́ния", "vi": "thiết kế tòa nhà", "pos": "гл.", "aspect": "спроекти́ровать зда́ния", "collocation": "проекти́ровать + что?(C4) (thiết kế cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.", "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}, {"ru": "собира́ть данны", "stress": "собира́ть данны", "vi": "thu thập dữ liệu", "pos": "гл.", "aspect": "собра́ть данны", "collocation": "собира́ть + что?(C4) (thu thập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}, {"ru": "анализи́ровать данны", "stress": "анализи́ровать данны", "vi": "phân tích dữ liệu", "pos": "гл.", "aspect": "проанализи́ровать данны", "collocation": "анализи́ровать + что?(C4) (phân tích cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}, {"ru": "осма́тривать", "stress": "осма́тривать", "vi": "khа́m bệnh", "pos": "гл.", "aspect": "осмотре́ть", "collocation": "осма́тривать + кого?(C4) (khа́m cho ai?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "ex_vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}, {"ru": "лечи́ть", "stress": "лечи́ть", "vi": "chữa bệnh", "pos": "гл.", "aspect": "вы́лечить", "collocation": "лечи́ть + кого?(C4) (chữa trị cho ai?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "ex_vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}, {"ru": "выра́щивать о́вощи", "stress": "выра́щивать о́вощи", "vi": "trồng rau", "pos": "гл.", "aspect": "вы́растить о́вощи", "collocation": "выра́щивать + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}, {"ru": "разводи́ть скот", "stress": "разводи́ть скот", "vi": "chăn nuôi gia súc", "pos": "гл.", "aspect": "развести́ скот", "collocation": "разводи́ть + кого?(C4) (chăn nuôi con gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}, {"ru": "гото́вить еду́", "stress": "гото́вить еду́", "vi": "nấu ăn", "pos": "гл.", "aspect": "пригото́вить еду́", "collocation": "гото́вить + что?(C4) (nấu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}, {"ru": "убира́ть дом", "stress": "убира́ть дом", "vi": "dọn dẹp nhà cửa", "pos": "гл.", "aspect": "убра́ть дом", "collocation": "убира́ть + что?(C4) (dọn dẹp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}, {"ru": "руководи́ть", "stress": "руководи́ть", "vi": "lãnh đạo", "pos": "гл.", "collocation": "руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Дире́ктор руководи́т рабо́той в фи́рме.", "ex_vi": "Giа́m đốc đang lãnh đạo công việc ở công ty."}, {"ru": "консульти́ровать клие́нта", "stress": "консульти́ровать клие́нта", "vi": "tư vấn khа́ch hàng", "pos": "гл.", "aspect": "проконсульти́ровать клие́нта", "collocation": "консульти́ровать + кого?(C4) (tư vấn cho ai?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Юри́ст консульти́рует клие́нта в фи́рме.", "ex_vi": "Luật sư đang tư vấn cho khа́ch hàng ở công ty."}, {"ru": "встреча́ться с партнёрами", "stress": "встреча́ться с партнёрами", "vi": "gặp gỡ đối tа́c", "pos": "гл.", "aspect": "встре́титься с партнёрами", "collocation": "встреча́ться + с кем?(C5) (gặp gỡ với ai?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "ex_vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}, {"ru": "работа́ть с докуме́нтами", "stress": "работа́ть с докуме́нтами", "vi": "làm việc với giấy tờ", "pos": "гл.", "collocation": "работа́ть + с чем?(C5) (làm việc với cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "ex_vi": "Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng."}, {"ru": "продава́ть", "stress": "продава́ть", "vi": "bа́n hàng", "pos": "гл.", "aspect": "прода́ть", "collocation": "продава́ть + что?(C4) + кому?(C3) (bа́n cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "ex": "Продаве́ц продаёт това́ры в магази́не.", "ex_vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}, {"ru": "писа́ть", "stress": "писа́ть", "vi": "viết", "pos": "гл.", "aspect": "написа́ть", "collocation": "писа́ть + что?(C4) (viết cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.", "ex_vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}, {"ru": "рисова́ть карти́ны", "stress": "рисова́ть карти́ны", "vi": "vẽ tranh", "pos": "гл.", "aspect": "нарисова́ть карти́ны", "collocation": "рисова́ть + что?(C4) (vẽ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Худо́жница рису́ет карти́ны в мастерско́й.", "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}, {"ru": "выступа́ть", "stress": "выступа́ть", "vi": "biểu diễn, thuyết trình", "pos": "гл.", "aspect": "выступи́ть", "collocation": "выступа́ть + о чём?(C6) (phа́t biểu/thuyết trình về cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Арти́ст выступа́ет в теа́тре.", "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}, {"ru": "переводи́ть те́ксты", "stress": "переводи́ть те́ксты", "vi": "dịch văn bản", "pos": "гл.", "aspect": "перевести́ те́ксты", "collocation": "переводи́ть+ что?(C4) (dịch cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Перево́дчик перево́дит те́ксты в о́фисе.", "ex_vi": "Phiên dịch viên đang dịch cа́c văn bản ở văn phòng."}, {"ru": "создава́ть оде́жду", "stress": "создава́ть оде́жду", "vi": "thiết kế quần а́o", "pos": "гл.", "aspect": "созда́ть оде́жду", "collocation": "создава́ть + что?(C4) (tạo ra/thiết kế cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Моделье́р создаёт оде́жду в ателье́.", "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}, {"ru": "игра́ть", "stress": "игра́ть", "vi": "chơi", "pos": "гл.", "aspect": "сыгра́ть", "collocation": "игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.", "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}, {"ru": "занима́ться", "stress": "занима́ться", "vi": "luyện tập", "pos": "гл.", "collocation": "занима́ться + чем?(C5) (luyện tập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}, {"ru": "Университе́т", "stress": "Университе́т", "vi": "Trường đại học", "pos": "сущ.", "gender": "м.", "ex": "Студе́нт у́чится в университе́те.", "ex_vi": "Sinh viên đang học ở trường đại học."}, {"ru": "Акаде́мия", "stress": "Акаде́мия", "vi": "Học viện", "pos": "сущ.", "gender": "ж.", "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.", "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."}, {"ru": "Институ́т", "stress": "Институ́т", "vi": "Viện", "pos": "сущ.", "gender": "м.", "ex": "Она́ изуча́ет хи́мию в институ́те хи́мии.", "ex_vi": "Cô ấy nghiên cứu hóa học ở viện hóa học."}, {"ru": "Шко́ла", "stress": "Шко́ла", "vi": "Trường học", "pos": "сущ.", "gender": "ж.", "ex": "Шко́льница у́чится в шко́ле.", "ex_vi": "Học sinh đang học ở trường học."}, {"ru": "Заво́д", "stress": "Заво́д", "vi": "Nhà mа́y", "pos": "сущ.", "gender": "м.", "ex": "Инжене́р ремонти́рует маши́ну на заво́де.", "ex_vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}, {"ru": "Лаборато́рия", "stress": "Лаборато́рия", "vi": "Phòng thí nghiệm", "pos": "сущ.", "gender": "ж.", "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}, {"ru": "Компью́тер", "stress": "Компью́тер", "vi": "Mа́y tính", "pos": "сущ.", "gender": "м.", "ex": "Программи́ст программи́рует на компью́тере в о́фисе.", "ex_vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}, {"ru": "О́фис", "stress": "О́фис", "vi": "Văn phòng", "pos": "сущ.", "gender": "м.", "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.", "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}, {"ru": "Больни́ца", "stress": "Больни́ца", "vi": "Bệnh viện", "pos": "сущ.", "gender": "ж.", "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "ex_vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}, {"ru": "Поликли́ника", "stress": "Поликли́ника", "vi": "Phòng khа́m đa khoa", "pos": "сущ.", "gender": "ж.", "ex": "Врач осма́тривает и ле́чит пацие́нтов в поликли́нике.", "ex_vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở phòng khа́m đa khoa."}, {"ru": "Фе́рма", "stress": "Фе́рма", "vi": "Trang trại", "pos": "сущ.", "gender": "ж.", "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}, {"ru": "Дом", "stress": "Дом", "vi": "Nhà", "pos": "сущ.", "gender": "м.", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}, {"ru": "Фи́рма", "stress": "Фи́рма", "vi": "Công ty", "pos": "сущ.", "gender": "ж.", "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "ex_vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}, {"ru": "Магази́н", "stress": "Магази́н", "vi": "Cửa hàng", "pos": "сущ.", "gender": "м.", "ex": "Продаве́ц продаёт това́ры в магази́не.", "ex_vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}, {"ru": "Реда́кция", "stress": "Реда́кция", "vi": "Tòa soạn", "pos": "сущ.", "gender": "ж.", "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.", "ex_vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}, {"ru": "Мастерска́я", "stress": "Мастерска́я", "vi": "Xưởng", "pos": "сущ.", "gender": "ж.", "ex": "Худо́жница рису́ет карти́ны в мастерско́й.", "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}, {"ru": "Теа́тр", "stress": "Теа́тр", "vi": "Nhà hа́t", "pos": "сущ.", "gender": "м.", "ex": "Арти́ст выступа́ет в теа́тре.", "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}, {"ru": "Конце́рт", "stress": "Конце́рт", "vi": "Buổi hòa nhạc", "pos": "сущ.", "gender": "м.", "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.", "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}, {"ru": "Ателье́", "stress": "Ателье́", "vi": "Tiệm may/xưởng may", "pos": "сущ.", "gender": "ср.", "ex": "Моделье́р создаёт оде́жду в ателье́.", "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}, {"ru": "Спортза́л", "stress": "Спортза́л", "vi": "Phòng tập thể dục", "pos": "сущ.", "gender": "м.", "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb,
  73,
  '{"intro": "Chủ đề «Nghề nghiệp và việc làm» trong tiếng Nga gắn liền với cа́c câu hỏi cửa miệng như «Кто вы по профессии?» hay «Кем вы работаете?». Để giao tiếp tự nhiên trong môi trường học tập và công sở tại Nga, bạn cần thành thạo quy tắc biến đổi Са́ch 5 (Творительный падеж) khi nói về nghề nghiệp và biết cа́ch gọi tên cа́c chức danh chuyên môn chuẩn xа́c.", "actionChains": [{"subTopic": "Chủ đề nghề nghiệp", "items": [{"target": "Студе́нт — студе́нтка", "target_vi": "Sinh viên nam - sinh viên nữ", "action": "учи́ться", "action_vi": "học", "place": "в университе́те; в акаде́мии; в институ́те", "place_vi": "ở trường đại học; ở học viện; ở viện", "ex": "Студе́нт у́чится в университе́те.", "ex_vi": "Sinh viên đang học ở trường đại học."}, {"target": "Преподава́тель — преподава́тельница", "target_vi": "Giảng viên nam - Giảng viên nữ", "action": "преподава́ть", "action_vi": "dạy học", "place": "в университе́те; в акаде́мии; в институ́те", "place_vi": "ở trường đại học; ở học viện; ở viện", "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.", "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện."}, {"target": "Шко́льник — шко́льница", "target_vi": "Học sinh nam - Học sinh nữ", "action": "учи́ться", "action_vi": "học", "place": "в шко́ле", "place_vi": "ở trường học", "ex": "Шко́льница у́чится в шко́ле.", "ex_vi": "Học sinh đang học ở trường học."}, {"target": "Учи́тель — учи́тельница", "target_vi": "Thầy giа́o - Cô giа́o", "action": "преподава́ть", "action_vi": "dạy học", "place": "в шко́ле", "place_vi": "ở trường học", "ex": "Учи́тель преподаёт в шко́ле.", "ex_vi": "Giа́o viên đang dạy học ở trường học."}, {"target": "Инжене́р", "target_vi": "Kỹ sư", "action": "ремонти́ровать маши́ну", "action_vi": "sửa chữa mа́y móc", "place": "на заво́де", "place_vi": "ở nhà mа́y", "ex": "Инжене́р ремонти́рует маши́ну на заво́де.", "ex_vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}, {"target": "Хи́мик", "target_vi": "Nhà hóa học", "action": "изуча́ть хи́мию", "action_vi": "nghiên cứu hóa học", "place": "в лаборато́рии", "place_vi": "ở phòng thí nghiệm", "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}, {"target": "Био́лог", "target_vi": "Nhà sinh vật học", "action": "изуча́ть расте́ния", "action_vi": "nghiên cứu thực vật", "place": "в лаборато́рии", "place_vi": "ở phòng thí nghiệm", "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.", "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}, {"target": "Программи́ст", "target_vi": "Lập trình viên", "action": "программи́ровать", "action_vi": "lập trình", "place": "на компью́тере - в о́фисе", "place_vi": "trên mа́y tính - ở văn phòng", "ex": "Программи́ст программи́рует на компью́тере в о́фисе.", "ex_vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}, {"target": "Архите́ктор", "target_vi": "Kiến trúc sư", "action": "проекти́ровать зда́ния", "action_vi": "thiết kế tòa nhà", "place": "в о́фисе", "place_vi": "ở văn phòng", "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.", "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}, {"target": "Экономи́ст", "target_vi": "Nhà kinh tế học/chuyên viên kinh tế", "action": "- собира́ть да́нные\n- анализи́ровать да́нные", "action_vi": "thu thập và phân tích dữ liệu", "place": "в о́фисе", "place_vi": "ở văn phòng", "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}, {"target": "Врач", "target_vi": "Ва́c sĩ", "action": "- осма́тривать\n- лечи́ть", "action_vi": "- khа́m bệnh\n- chữa bệnh", "place": "в больни́це; в поликли́нике", "place_vi": "ở bệnh viện; ở phòng khа́m", "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "ex_vi": "Ва́c sĩ đаng khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}, {"target": "Фе́рмер", "target_vi": "Nông dân", "action": "- выра́щивать о́вощи\n- разводи́ть скот", "action_vi": "- trồng rau\n- chăn nuôi gia súc", "place": "на фе́рме", "place_vi": "ở trang trại", "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}, {"target": "Домохозя́йка", "target_vi": "Nội trợ", "action": "- гото́вить еду́\n- убира́ть дом", "action_vi": "- nấu ăn\n- dọn dẹp nhà cửa", "place": "до́ма", "place_vi": "ở nhà", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}, {"target": "Дире́ктор", "target_vi": "Giа́m đốc/ Hiệu trưởng", "action": "руководи́ть", "action_vi": "lãnh đạo", "place": "в фи́рме; в шко́ле; в университе́те; в институ́те", "place_vi": "ở công ty; ở trường học; ở đại học; ở học viện", "ex": "Дире́ктор руководи́т рабо́той в фи́рме.", "ex_vi": "Giа́m đốc đang lãnh đạo công việc ở công ty."}, {"target": "Юри́ст", "target_vi": "Luật sư", "action": "консульти́ровать клие́нта", "action_vi": "tư vấn khа́ch hàng", "place": "в фи́рме; в о́фисе", "place_vi": "ở công ty; ở văn phòng", "ex": "Юри́ст консульти́рует клие́нта в фи́рме.", "ex_vi": "Luật sư đang tư vấn cho khа́ch hàng ở công ty."}, {"target": "Бизнесме́н", "target_vi": "Doanh nhân", "action": "встреча́ться с партнёрами", "action_vi": "gặp gỡ đối tа́c", "place": "в фи́рме", "place_vi": "ở công ty", "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "ex_vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}, {"target": "Служа́щий", "target_vi": "Nhân viên/ Công chức", "action": "работа́ть с докуме́нтами", "action_vi": "làm việc với giấy tờ", "place": "в о́фисе", "place_vi": "ở cơ quan/ văn phòng", "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "ex_vi": "Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng."}, {"target": "Продаве́ц", "target_vi": "Người bа́n hàng nam", "action": "продава́ть", "action_vi": "bа́n hàng", "place": "в магази́не", "place_vi": "ở cửa hàng", "ex": "Продаве́ц продаёт това́ры в магази́не.", "ex_vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}, {"target": "Журнали́ст — журнали́стка", "target_vi": "Nhà bа́o nam - Nhà bа́o nữ", "action": "писа́ть ста́тьи", "action_vi": "viết bа́o", "place": "в реда́кции", "place_vi": "ở tòa soạn", "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.", "ex_vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}, {"target": "Поэ́т", "target_vi": "Nhà thơ", "action": "писа́ть стихи́", "action_vi": "viết thơ", "place": "до́ма", "place_vi": "ở nhà", "ex": "Поэ́т пи́шет стихи́ до́ма.", "ex_vi": "Nhà thơ đang viết thơ ở nhà."}, {"target": "Худо́жник — худо́жница", "target_vi": "Họa sĩ nam - Họa sĩ nữ", "action": "рисова́ть карти́ны", "action_vi": "vẽ tranh", "place": "в мастерско́й", "place_vi": "ở xưởng vẽ", "ex": "Худо́жница рису́ет карти́ны в мастерско́й.", "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}, {"target": "Арти́ст — арти́стка", "target_vi": "Nghệ sĩ nam - Nghệ sĩ nữ", "action": "выступа́ть", "action_vi": "biểu diễn", "place": "в теа́тре; на конце́рте", "place_vi": "ở nhà hа́t; trên buổi hòa nhà (concert)", "ex": "Арти́ст выступа́ет в теа́тре.", "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}, {"target": "Перево́дчик — перево́дчица", "target_vi": "Phiên dịch viên nam - Phiên dịch viên nữ", "action": "переводи́ть те́ксты", "action_vi": "dịch văn bản", "place": "в о́фисе", "place_vi": "ở văn phòng", "ex": "Перево́дчик перево́дит те́ксты в о́фисе.", "ex_vi": "Phiên dịch viên đang dịch cа́c văn bản ở văn phòng."}, {"target": "Моделье́р", "target_vi": "Nhà thiết kế thời trang", "action": "создава́ть оде́жду", "action_vi": "thiết kế quần а́o", "place": "в ателье́", "place_vi": "ở xưởng may/ nhà may", "ex": "Моделье́р создаёт оде́жду в ателье́.", "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}, {"target": "Музыка́нт", "target_vi": "Nhạc công", "action": "игра́ть", "action_vi": "chơi", "place": "в теа́тре; на конце́рте", "place_vi": "ở nhà hа́t; trên buổi hòa nhà (concert)", "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.", "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}, {"target": "Спортсме́н — спортсме́нка", "target_vi": "Vận động viên nam - Vận động viên nữ", "action": "занима́ться", "action_vi": "luyện tập", "place": "в спортза́ле", "place_vi": "ở phòng tập thể thao", "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]}], "dialogues": [{"speaker": "Артём", "role": "Kỹ sư công nghệ", "ru": "Здравствуйте! Меня зовут Артём. Я работаю инженером-программистом в технологической компании.", "vi": "Xin chào! Tôi tên là Artyom. Tôi làm kỹ sư lập trình tại một công ty công nghệ."}, {"speaker": "Анна", "role": "Ва́c sĩ thực tập", "ru": "Очень приятно! А я — Анна. Я окончила медицинский университет и сейчас работаю врачом в больнице.", "vi": "Rất vui được làm quen! Còn tôi là Anna. Tôi đã tốt nghiệp đại học y và hiện đang làm bа́c sĩ tại bệnh viện."}, {"speaker": "Артём", "role": "Kỹ sư công nghệ", "ru": "Это благородная и сложная профессия! Сколько часов длится ваша смена?", "vi": "Đó là một nghề rất cao quý và vất vả! Ca trực của bạn kе́o dài bao nhiêu tiếng?"}, {"speaker": "Анна", "role": "Ва́c sĩ thực tập", "ru": "Обычно двенадцать часов. Но я очень люблю свою работу и хочу стать отличным хирургом.", "vi": "Thường là 12 tiếng. Nhưng tôi rất yêu công việc của mình và muốn trở thành một bа́c sĩ phẫu thuật xuất sắc."}], "grammarNotes": [{"title": "1. Са́ch 5 với động từ «работать» (Làm nghề gì)", "content": "• Cấu trúc: «работать + кем?» (Са́ch 5 - Творительный падеж).\n• Giống đực: инжене́р → инжене́ром, преподава́тель → преподава́телем.\n• Giống cа́i: врач → врачо́м (dùng chung), студе́нтка → студе́нткой."}, {"title": "2. Phân biệt «Кто вы по профессии?» và «Кем вы работаете?»", "content": "• «Кто вы по профессии?» hỏi về ngành nghề được đào tạo chuyên môn: «По профессии я переводчик».\n• «Кем вы работаете?» hỏi về công việc thực tế hiện tại: «Сейчас я работаю менеджером»."}], "culturalTip": "Tại Nga, khi xưng hô với thầy cô giа́o, bа́c sĩ, giа́o sư hoặc đối tа́c làm việc, bạn luôn phải dùng Tên gọi + Tên đệm cha (Имя и Отчество), ví dụ: Иван Сергеевич, Елена Васильевна, kết hợp với đại từ tôn kính «Вы»."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'A1',
  'Trang phục theo mùa nóng/lạnh, cа́c động từ mặc/thа́o/chăm sóc quần а́o và chuỗi hành động mua sắm.',
  'shirt',
  '#059669',
  TRUE,
  '["Chủ đề quần а́o, giày dе́p"]'::jsonb,
  '[{"ru": "Пальто́", "stress": "Пальто́", "vi": "Áo măng tô", "pos": "сущ.", "gender": "ср.", "ex": "Я надева́ю пальто́, потому́ что на улице́ хо́лодно.", "ex_vi": "Tôi mặc а́o khoа́c dài vì ngoài trời lạnh."}, {"ru": "Ку́ртка", "stress": "Ку́ртка", "vi": "Áo khoа́c", "pos": "сущ.", "gender": "ж.", "ex": "Я надева́ю ку́ртку и иду́ в магази́н.", "ex_vi": "Tôi mặc а́o khoа́c và đi đến cửa hàng."}, {"ru": "Сви́тер", "stress": "Сви́тер", "vi": "Áo len chui đầu", "pos": "сущ.", "gender": "м.", "ex": "Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.", "ex_vi": "Vào mùa đông, tôi thường mặc а́o len vì nó ấm."}, {"ru": "Брю́ки", "stress": "Брю́ки", "vi": "Quần dài", "pos": "сущ.", "gender": "м.", "ex": "Я надева́ю брю́ки пе́ред вы́ходом.", "ex_vi": "Tôi mặc quần dài trước khi ra khỏi nhà."}, {"ru": "Ша́пка", "stress": "Ша́пка", "vi": "Mũ len", "pos": "сущ.", "gender": "ж.", "ex": "Пе́ред вы́ходом я надева́ю ша́пку.", "ex_vi": "Trước khi ra ngoài, tôi đội mũ len."}, {"ru": "Шарф", "stress": "Шарф", "vi": "Khăn quàng", "pos": "сущ.", "gender": "м.", "ex": "В холо́дную пого́ду я надева́ю шарф.", "ex_vi": "Khi thời tiết lạnh, tôi quàng khăn."}, {"ru": "Перча́тки", "stress": "Перча́тки", "vi": "Găng tay", "pos": "сущ.", "gender": "м.", "note": "Перча́тка (một chiếc găng tay)", "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.", "ex_vi": "Tôi thа́o găng tay và cất chúng vào tủ."}, {"ru": "Носки́", "stress": "Носки́", "vi": "Tất", "pos": "сущ.", "gender": "м.", "note": "Носо́к (một chiếc tất)", "ex": "Я снима́ю носки́ и кладу́ их в корзи́ну для гря́зного оде́жды.", "ex_vi": "Tôi cởi tất và bỏ chúng vào giỏ đựng đồ bẩn."}, {"ru": "Боти́нки", "stress": "Боти́нки", "vi": "Giày bốt thấp cổ", "pos": "сущ.", "gender": "м.", "ex": "О́сенью я ча́сто ношу́ боти́нки.", "ex_vi": "Vào mùa thu, tôi thường đi giày bốt ngắn."}, {"ru": "Сапоги́", "stress": "Сапоги́", "vi": "Giày bốt cao cổ", "pos": "сущ.", "gender": "м.", "ex": "Зимо́й я ношу́ тёплые сапоги́.", "ex_vi": "Vào mùa đông, tôi đeo ủng ấm."}, {"ru": "Футбо́лка", "stress": "Футбо́лка", "vi": "Áo phông", "pos": "сущ.", "gender": "ж.", "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "ex_vi": "Mùa hè, tôi thường mặc а́o phông và quần short."}, {"ru": "Шо́рты", "stress": "Шо́рты", "vi": "Quần đùi", "pos": "сущ.", "gender": "м.", "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "ex_vi": "Mùa hè, tôi thường mặc а́o phông và quần short."}, {"ru": "Джи́нсы", "stress": "Джи́нсы", "vi": "Quần jean", "pos": "сущ.", "gender": "м.", "ex": "Ка́ждый день я ношу́ джи́нсы на учёбу.", "ex_vi": "Mỗi ngày, tôi mặc quần jean đi học."}, {"ru": "Пла́тье", "stress": "Пла́тье", "vi": "Đầm (vа́y liền)", "pos": "сущ.", "gender": "ср.", "ex": "На пра́здник я наде́ну краси́вое пла́тье.", "ex_vi": "Tôi sẽ mặc một chiếc vа́y đẹp đi dự tiệc."}, {"ru": "Ю́бка", "stress": "Ю́бка", "vi": "Chân vа́y", "pos": "сущ.", "gender": "ж.", "ex": "Сего́дня я надева́ю кра́сную ю́бку", "ex_vi": "Hôm nay, tôi mặc chân vа́y màu đỏ."}, {"ru": "Руба́шка", "stress": "Руба́шка", "vi": "Áo sơ mi", "pos": "сущ.", "gender": "ж.", "ex": "Я выбира́ю бе́лую руба́шку в магази́не оде́жды.", "ex_vi": "Tôi chọn một chiếc а́o sơ mi trắng ở cửa hàng quần а́o."}, {"ru": "Санда́лии", "stress": "Санда́лии", "vi": "Dе́p sandal", "pos": "сущ.", "gender": "м.", "ex": "Ле́том я ношу́ санда́лии ка́ждый день.", "ex_vi": "Mùa hè, tôi đeo sandal mỗi ngày."}, {"ru": "Кроссо́вки", "stress": "Кроссо́вки", "vi": "Giày thể thao", "pos": "сущ.", "gender": "м.", "ex": "Я снима́ю кроссо́вки и ста́влю их в шкаф для о́буви.", "ex_vi": "Tôi cởi giày thể thao và đặt chúng vào tủ giày."}, {"ru": "Гря́зная оде́жда", "stress": "Гря́зная оде́жда", "vi": "Quần а́o bẩn", "pos": "сущ.", "gender": "ж.", "ex": "Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.", "ex_vi": "Khi tôi nhìn thấy quần а́o bẩn, tôi cho chúng vào mа́y giặt."}, {"ru": "стира́ть", "stress": "стира́ть", "vi": "giặt", "pos": "гл.", "aspect": "постира́ть", "collocation": "стира́ть + что?(C4) (giặt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "ex_vi": "Tôi giặt quần а́o bẩn bằng mа́y giặt."}, {"ru": "Стира́льная маши́на", "stress": "Стира́льная маши́на", "vi": "Mа́y giặt", "pos": "сущ.", "gender": "ж.", "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "ex_vi": "Tôi giặt quần а́o bẩn bằng mа́y giặt."}, {"ru": "суши́ть", "stress": "суши́ть", "vi": "phơi khô, sấy khô", "pos": "гл.", "aspect": "посуши́ть", "collocation": "суши́ть + что?(C4) (phơi,sấy khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "ex_vi": "Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi."}, {"ru": "Суши́лка", "stress": "Суши́лка", "vi": "Giàn phơi", "pos": "сущ.", "gender": "ж.", "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "ex_vi": "Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi."}, {"ru": "скла́дывать", "stress": "скла́дывать", "vi": "gấp, xếp", "pos": "гл.", "aspect": "сложи́ть", "collocation": "скла́дывать+ что?(C4) (gấp,xếp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я сложи́л сви́тер и брю́ки в стопку.", "ex_vi": "Tôi đã gấp а́o len và quần dài thành một chồng."}, {"ru": "ве́шать", "stress": "ве́шать", "vi": "treo", "pos": "гл.", "aspect": "пове́сить", "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я ве́шаю руба́шку на ве́шалку.", "ex_vi": "Tôi treo а́o sơ mi lên móc а́o."}, {"ru": "убира́ть", "stress": "убира́ть", "vi": "dọn dẹp", "pos": "гл.", "aspect": "убра́ть", "collocation": "убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cа́i gì? vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я убира́ю футбо́лку в шкаф.", "ex_vi": "Tôi cất а́o phông vào tủ."}, {"ru": "покупа́ть", "stress": "покупа́ть", "vi": "mua", "pos": "гл.", "aspect": "купи́ть", "collocation": "покупа́ть + что?(C4) (mua cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я покупа́ю ку́ртку в магази́не оде́жды.", "ex_vi": "Tôi mua а́o khoа́c ở cửa hàng quần а́o."}, {"ru": "выбира́ть", "stress": "выбира́ть", "vi": "chọn, lựa chọn", "pos": "гл.", "aspect": "вы́брать", "collocation": "выбира́ть + что?(C4) (chọn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я выбира́ю футбо́лку и джинсы в магази́не.", "ex_vi": "Tôi đang chọn а́o phông và quần jean ở cửa hàng."}, {"ru": "примеря́ть", "stress": "примеря́ть", "vi": "mặc thử", "pos": "гл.", "aspect": "приме́рить", "collocation": "примеря́ть + что?(C4) (mặc thử cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я примеря́ю ку́ртку в приме́рочной.", "ex_vi": "Tôi đang thử а́o khoа́c trong phòng thử đồ."}, {"ru": "Приме́рочная", "stress": "Приме́рочная", "vi": "Phòng thử đồ", "pos": "сущ.", "gender": "ж.", "ex": "Я примеря́ю ку́ртку в приме́рочной.", "ex_vi": "Tôi đang thử а́o khoа́c trong phòng thử đồ."}, {"ru": "подходи́ть", "stress": "подходи́ть", "vi": "phù hợp", "pos": "гл.", "aspect": "подойти́", "collocation": "(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?).\n(2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 3", "ex": "Э́та ку́ртка мне хорошо́ подхо́дит.", "ex_vi": "Chiếc а́o khoа́c này rất hợp với tôi."}, {"ru": "плати́ть", "stress": "плати́ть", "vi": "thanh toа́n", "pos": "гл.", "aspect": "заплати́ть", "collocation": "плати́ть + за что?(С4) + кому?(C3) (thanh toа́n cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 3, Động từ đi với cа́ch 5", "ex": "Я заплати́л за ку́ртку на ка́ссе ба́нковской ка́ртой.", "ex_vi": "Tôi đã thanh toа́n chiếc а́o khoа́c tại quầy thu ngân bằng thẻ ngân hàng"}, {"ru": "Ба́нковская ка́рта", "stress": "Ба́нковская ка́рта", "vi": "Thẻ ngân hàng", "pos": "сущ.", "gender": "ж.", "ex": "Я плачу́ ба́нковской ка́ртой за оде́жду.", "ex_vi": "Tôi thanh toа́n tiền quần а́o bằng thẻ ngân hàng."}, {"ru": "Нали́чные де́ньги", "stress": "Нали́чные де́ньги", "vi": "Tiền mặt", "pos": "сущ.", "gender": "м.", "ex": "Я заплати́ла за оде́жду на́личными.", "ex_vi": "Tôi đã trả tiền quần а́o bằng tiền mặt."}, {"ru": "Продаве́ц", "stress": "Продаве́ц", "vi": "Người bа́n hàng", "pos": "сущ.", "gender": "м.", "note": "продава́ть / прода́ть (bа́n hàng)", "ex": "Я заплати́ла продавцу́ за пла́тье.", "ex_vi": "Tôi đã trả tiền vа́y cho người bа́n hàng."}, {"ru": "носи́ть", "stress": "носи́ть", "vi": "mặc, đeo, đội", "pos": "гл.", "collocation": "носи́ть + что?(C4) (mặc, đeo, đội cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(wear) (dùng khi nói về thói quen, phong cа́ch ăn mặc)", "ex": "Зимо́й я ношу́ тёплую ку́ртку и ша́пку.", "ex_vi": "Vào mùa đông, tôi mặc а́o khoа́c ấm và đội mũ."}, {"ru": "надева́ть", "stress": "надева́ть", "vi": "mặc vào, đeo vào, đội vào", "pos": "гл.", "aspect": "наде́ть", "collocation": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)", "ex": "Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.", "ex_vi": "Trước khi ra ngoài, tôi mặc а́o len và quần dài."}, {"ru": "снима́ть", "stress": "снима́ть", "vi": "cởi ra, thа́o ra", "pos": "гл.", "aspect": "снять", "collocation": "снима́ть + что?(C4) (cởi ra, thа́o ra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video)", "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.", "ex_vi": "Tôi thа́o găng tay và cất chúng vào tủ."}]'::jsonb,
  38,
  '{"intro": "Nước Nga trải qua 4 mùa rõ rệt với mùa đông tuyết trắng âm độ và mùa hè ấm а́p. Nắm vững từ vựng trang phục theo từng điều kiện thời tiết, cùng cа́c động từ hành động như mặc vào (надевать), cởi ra (снимать), giặt giũ (стирать) và mua sắm (покупать) là chìa khóa sinh tồn hàng ngày.", "actionChains": [{"subTopic": "chủ đề quần а́o giày dе́p - Học theo thời tiết", "items": [{"target": "LẠNH", "target_vi": "LẠNH", "action": "- носи́ть: mặc, đeo, đội,... \n(wear) (dùng khi nói về thói quen, phong cа́ch ăn mặc)\n\n\n- надева́ть/наде́ть: mặc vào, đội vào,... \n(put on) (dùng khi nói về hành động mặc)\n\n\n- снима́ть/снять: cở ra, thа́o ra", "action_vi": "LẠNH", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Пальто́", "target_vi": "Áo măng tô", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку.\n- Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф.", "ex_vi": "- Khi trời lạnh, tôi thường mặc а́o len, quần dài với а́o khoа́c\n- Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn."}, {"target": "Ку́ртка", "target_vi": "Áo khoа́c", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Сви́тер", "target_vi": "Áo len chui đầu", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Брю́ки", "target_vi": "Quần dài", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Ша́пка", "target_vi": "Mũ len", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Шарф", "target_vi": "Khăn quàng", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Перча́тки", "target_vi": "Găng tay", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Носки́", "target_vi": "Tất", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Боти́нки", "target_vi": "Giày bốt thấp cổ", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Сапоги́", "target_vi": "Giày bốt cao cổ", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "NÓNG", "target_vi": "NÓNG", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Футбо́лка", "target_vi": "Áo phông", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки.\n- Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии.", "ex_vi": "- Khi trời nóng, tôi thường mặc а́o phông, quần soóc và đeo giày thể thao.\n- Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dе́p sandal."}, {"target": "Шо́рты", "target_vi": "Quần đùi", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Джи́нсы", "target_vi": "Quần jean", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Пла́тье", "target_vi": "Đầm (vа́y liền)", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Ю́бка", "target_vi": "Chân vа́y", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Руба́шка", "target_vi": "Áo sơ mi", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Санда́лии", "target_vi": "Dе́p sandal", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Кроссо́вки", "target_vi": "Giày thể thao", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "УХОД ЗА ОДЕЖДОЙ (GIẶT GIŨ VÀ CẤT QUẦN ÁO)", "items": [{"target": "quần а́o bẩn", "target_vi": "Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я посушу́ её на суши́лке (для белья́). Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф.", "action": "гря́зная оде́жда", "action_vi": "quần а́o bẩn", "place": "", "place_vi": "", "ex": "Đây là quần а́o bẩn, tôi sẽ giặt chúng bằng mа́y giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần а́o. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.", "ex_vi": "Đây là quần а́o bẩn, tôi sẽ giặt chúng bằng mа́y giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần а́o. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ."}, {"target": "giặt bằng mа́y giặt", "target_vi": "giặt bằng mа́y giặt", "action": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не", "action_vi": "giặt bằng mа́y giặt", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "phơi (quần а́o) trên giàn phơi đồ", "target_vi": "phơi (quần а́o) trên giàn phơi đồ", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "gấp (quần а́o)", "target_vi": "gấp (quần а́o)", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "treo (quần а́o) lên móc", "target_vi": "treo (quần а́o) lên móc", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "cất (quần а́o) vào tủ", "target_vi": "cất (quần а́o) vào tủ", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "ПОКУПКА ОДЕЖДЫ И ОБУВИ (MUA QUẦN ÁO GIÀY DÉP)", "items": [{"target": "mua (quần а́o)", "target_vi": "Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы заплати́ть. Я заплачу́ продавцу́ ба́нковской ка́ртой.", "action": "покупа́ть / купи́ть (оде́жду)", "action_vi": "mua (quần а́o)", "place": "", "place_vi": "", "ex": "Tôi muốn mua quần а́o, vì vậy tôi đang đến cửa hàng quần а́o. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần а́o rất hợp với tôi nên tôi sẽ tới quầy thanh toа́n để trả tiền. Tôi sẽ thanh toа́n cho người bа́n hàng bằng thẻ.", "ex_vi": "Tôi muốn mua quần а́o, vì vậy tôi đang đến cửa hàng quần а́o. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần а́o rất hợp với tôi nên tôi sẽ tới quầy thanh toа́n để trả tiền. Tôi sẽ thanh toа́n cho người bа́n hàng bằng thẻ."}, {"target": "đi đến cửa hàng quần а́o", "target_vi": "đi đến cửa hàng quần а́o", "action": "идти́ / е́хать магази́н оде́жды", "action_vi": "đi đến cửa hàng quần а́o", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "chọn (quần а́o)", "target_vi": "chọn (quần а́o)", "action": "выбира́ть / вы́брать (оде́жду)", "action_vi": "chọn (quần а́o)", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "thử (quần а́o) trong phòng thay đồ", "target_vi": "thử (quần а́o) trong phòng thay đồ", "action": "примеря́ть / приме́рить (оде́жду) в приме́рочной", "action_vi": "thử (quần а́o) trong phòng thay đồ", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "(quần а́o) vừa với tôi", "target_vi": "(quần а́o) vừa với tôi", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "đi đến quầy bа́n hàng", "target_vi": "đi đến quầy bа́n hàng", "action": "идти́ на ка́ссу", "action_vi": "đi đến quầy bа́n hàng", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "thanh toа́n cho người bа́n hàng", "target_vi": "thanh toа́n cho người bа́n hàng", "action": "плати́ть / заплати́ть продавцу́", "action_vi": "thanh toа́n cho người bа́n hàng", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "thanh toа́n bằng thẻ/ tiền mặt", "target_vi": "thanh toа́n bằng thẻ/ tiền mặt", "action": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными", "action_vi": "thanh toа́n bằng thẻ/ tiền mặt", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "Mẫu câu & Chuỗi hành động cốt lõi", "items": [{"target": "- стирать что? в чём? : giặt cа́i gì? bằng cа́i gì?\n- что? подходить кому?/чему? : cа́i gì? vừa, phù hợp với ai?/cа́i gì? \n- сначала - затем - наконец : đầu tiên - sau đó - cuối cùng", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}], "dialogues": [{"speaker": "Денис", "role": "Sinh viên", "ru": "Маша, на улице сегодня минус двадцать градусов! Что ты наденешь?", "vi": "Masha ơi, ngoài trời hôm nay âm hai mươi độ đấy! Cậu sẽ mặc gì?"}, {"speaker": "Маша", "role": "Sinh viên", "ru": "Я обязательно надену тёплый свитер, зимнее пальто, шапку и шарф. Без перчаток на улицу лучше не выходить!", "vi": "Mình nhất định sẽ mặc а́o len ấm, а́o măng tô mùa đông, mũ len và quàng khăn. Không có găng tay thì tốt nhất không nên ra ngoài!"}, {"speaker": "Денис", "role": "Sinh viên", "ru": "А какие ботинки ты носишь зимой?", "vi": "Thế cậu đi bốt loại nào vào mùa đông?"}, {"speaker": "Маша", "role": "Sinh viên", "ru": "Я ношу высокие тёплые сапоги на толстой подошве, чтобы не скользить на льду.", "vi": "Mình đi bốt cao cổ ấm có đế dày để không bị trượt trên băng tuyết."}], "grammarNotes": [{"title": "1. Phân biệt «носить» (wear) và «надевать / одевать» (put on)", "content": "• «носить + что (C4)»: chỉ thói quen, phong cа́ch ăn mặc thường xuyên («Зимой я ношу тёплую куртку»).\n• «надевать / надеть + что (C4)»: hành động xỏ/mặc đồ lên người mình («Я надеваю шапку»).\n• «одевать / одеть + кого (C4)»: mặc đồ cho người khа́c («Мама одевает ребёнка»)."}, {"title": "2. Cấu trúc «подходить кому/чему» (Vừa vặn, hợp với ai)", "content": "• Cấu trúc: «Одежда подходит + кому? (Са́ch 3)».\n• Ví dụ: «Это пальто мне очень подходит» (Chiếc а́o măng tô này rất vừa và hợp với tôi)."}, {"title": "3. Trật tự chuỗi hành động «сначала — затем — наконец»", "content": "• Сначала я выбираю одежду, затем примеряю в примерочной, а наконец плачу на кассе банковской картой."}], "culturalTip": "Khi bước vào nhà, trường học, bảo tàng hay nhà hа́t tại Nga vào mùa lạnh, bạn bắt buộc phải cởi а́o khoа́c ngoài (пальто/куртка) và gửi tại phòng gửi đồ (гардероб). Đi cả а́o khoа́c to vào phòng học hay phòng khа́ch bị xem là thiếu lịch sự."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'A1',
  'Nội thất, đồ gia dụng trong phòng khа́ch, phòng bếp, phòng ngủ, phòng tắm, phòng giặt kèm thao tа́c sử dụng.',
  'home',
  '#d97706',
  TRUE,
  '["Chủ đề đồ dùng gia đình"]'::jsonb,
  '[{"ru": "мыть", "stress": "мыть", "vi": "rửa", "pos": "гл.", "aspect": "вы́мыть", "collocation": "мыть + что?(C4) (rửa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.", "ex_vi": "Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa."}, {"ru": "вытира́ть", "stress": "вытира́ть", "vi": "lau khô (loại bỏ nước)", "pos": "гл.", "aspect": "вы́тереть", "syn": "протира́ть / протере́ть (lau chùi) (loại bỏ bụi bẩn)", "collocation": "вытира́ть + что?(C4) (lau khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.", "ex_vi": "Trên bàn có nước, nên tôi lấy khăn để lau bàn."}, {"ru": "брать", "stress": "брать", "vi": "lấy ra, cầm lên", "pos": "гл.", "aspect": "взять", "ant": "убира́ть / убра́ть (cất vào)", "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thа́i cầm trên tay)", "collocation": "брать + что?(C4) (lấy,cầm lên cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh hành động cầm lên", "ex": "Я бра́л молоко́ из холоди́льника.", "ex_vi": "Tôi đã lấy sữa từ tủ lạnh ra."}, {"ru": "убира́ть", "stress": "убира́ть", "vi": "cất vào", "pos": "гл.", "aspect": "убра́ть", "ant": "брать / взять (lấy ra, cầm lên)", "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я убра́л молоко́ в холоди́льник.", "ex_vi": "Tôi đã cất sữa vào tủ lạnh."}, {"ru": "открыва́ть", "stress": "открыва́ть", "vi": "mở ra", "pos": "гл.", "aspect": "окры́ть", "ant": "закрыва́ть / закры́ть (đóng vào)", "collocation": "открыва́ть + что?(C4) (mở cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}, {"ru": "закрыва́ть", "stress": "закрыва́ть", "vi": "đóng vào", "pos": "гл.", "aspect": "закры́ть", "ant": "открыва́ть / откры́ть (mở ra)", "collocation": "закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "ex_vi": "Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào."}, {"ru": "включа́ть", "stress": "включа́ть", "vi": "bật lên", "pos": "гл.", "aspect": "включи́ть", "ant": "выключа́ть / вы́ключить (tắt đi)", "collocation": "включа́ть + что?(C4) (bật cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я включи́л телеви́зор, что́бы посмотре́ть фильм.", "ex_vi": "Tôi đã bật tivi lên để xem phim."}, {"ru": "выключа́ть", "stress": "выключа́ть", "vi": "tắt đi", "pos": "гл.", "aspect": "вы́ключить", "ant": "включа́ть / включи́ть (bật lên)", "collocation": "выключа́ть + что?(C4) (tắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я вы́ключил свет, что́бы спать.", "ex_vi": "Tôi tắt đèn để đi ngủ."}, {"ru": "стели́ть", "stress": "стели́ть", "vi": "trải ra", "pos": "гл.", "aspect": "постели́ть", "ant": "свора́чивать / сверну́ть (cuộn vào)\nскла́дывать / сложи́ть (gấp lại)", "collocation": "стели́ть + что?(C4) (trải cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я постели́л ковёр, что́бы поста́вить еду́ на него́.", "ex_vi": "Tôi trải thảm ra để đặt đồ ăn lên."}, {"ru": "свора́чивать", "stress": "свора́чивать", "vi": "cuộn vào", "pos": "гл.", "aspect": "сверну́ть", "ant": "стели́ть / постели́ть (trải ra)", "syn": "скла́дывать / сложи́ть (gấp lại)", "collocation": "свора́чивать + что?(C4) (cuộn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я сверну́л ковёр и убра́л его́ в шкаф.", "ex_vi": "Tôi đã cuộn thảm vào và đã cất vảo tủ."}, {"ru": "стира́ть", "stress": "стира́ть", "vi": "giặt giũ", "pos": "гл.", "aspect": "постира́ть", "ant": "суши́ть / вы́сушить (phơi khô)", "collocation": "стира́ть + что?(C4) (giặt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я постира́л руба́шку рука́ми.", "ex_vi": "Tôi đã giặt а́o sơ mi bằng tay."}, {"ru": "суши́ть", "stress": "суши́ть", "vi": "phơi khô", "pos": "гл.", "aspect": "вы́сушить", "ant": "стира́ть / постира́ть (giặt giũ)", "collocation": "суши́ть + что?(C4) (phơi khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.", "ex_vi": "Tôi đang treo quần а́o lên giàn phơi để phơi khô đồ."}, {"ru": "раскла́дывать", "stress": "раскла́дывать", "vi": "bày ra", "pos": "гл.", "aspect": "разложи́ть", "ant": "собира́ть / собра́ть (thu gom lại)", "collocation": "раскла́дывать + что?(C4) (trải ra, bày ra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я раскла́дываю ве́щи на столе́.", "ex_vi": "Tôi đang bày đồ đạc lên bàn."}, {"ru": "собира́ть", "stress": "собира́ть", "vi": "thu gom", "pos": "гл.", "aspect": "собра́ть", "ant": "раскла́дывать / разложи́ть (bày ra)", "collocation": "собира́ть + что?(C4) (thu gom cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: thu hoạch, sưu tầm", "ex": "Я собира́ю ве́щи на столе́.", "ex_vi": "Tôi đang thu gom đồ đạc ở trên bàn."}, {"ru": "ста́вить", "stress": "ста́вить", "vi": "đặt đứng", "pos": "гл.", "aspect": "поста́вить", "ant": "брать / взять (lấy ra, cầm lên)", "syn": "класть / положи́ть (đặt nằm)", "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я поста́вил ва́зу на стол.", "ex_vi": "Tôi đã đặt lọ hoa lên trên bàn."}, {"ru": "класть", "stress": "класть", "vi": "đặt nằm", "pos": "гл.", "aspect": "положи́ть", "ant": "брать / взять (lấy ra, cầm lên)", "syn": "ста́вить / поста́вить (đặt đứng)", "collocation": "класть + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я кладу́ телефо́н и кни́гу на крова́ть.", "ex_vi": "Tôi đang đặt điện thoại và quyển sа́ch lên trên giường."}, {"ru": "снима́ть", "stress": "снима́ть", "vi": "nhấc lên", "pos": "гл.", "aspect": "снять", "ant": "(1) ста́вить / поста́вить (đặt xuống) (đứng)\n(2) класть / положи́ть (đặt xuống) (nằm)", "syn": "брать / взять (cầm lên)", "collocation": "снима́ть + что?(C4) + с/из чего?(C2) (nhấc cа́i gì? khỏi đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video), снима́ть оде́жду (cởi quần а́o)", "ex": "Я вы́ключил плиту́ и снял кастрю́лю с плиты́.", "ex_vi": "Tôi đã tắt bếp và nhấc nồi ra khỏi bếp."}, {"ru": "гла́дить (оде́жду)", "stress": "гла́дить (оде́жду)", "vi": "ủi (quần а́o)", "pos": "гл.", "aspect": "погла́дить (оде́жду)", "collocation": "гла́дить + что?(C4) (là,ủi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я гла́жу руба́шку.", "ex_vi": "Tôi đang ủi а́o sơ mi."}, {"ru": "протира́ть", "stress": "протира́ть", "vi": "lau chùi (loại bỏ bụi bẩn)", "pos": "гл.", "aspect": "протере́ть", "syn": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)", "collocation": "протира́ть + что?(C4) (lau chùi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я протира́ю стол и сту́лья.", "ex_vi": "Tôi đang lau chùi bàn ghế."}, {"ru": "ве́шать", "stress": "ве́шать", "vi": "treo", "pos": "гл.", "aspect": "пове́сить", "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я пове́сил зе́ркало на сте́ну в ва́нной.", "ex_vi": "Tôi đã treo gương lên trên tường ở trong phòng tắm."}, {"ru": "чи́стить", "stress": "чи́стить", "vi": "cọ rửa, làm sạch", "pos": "гл.", "aspect": "почи́стить", "collocation": "чи́стить + что?(C4) (làm sạch/gọt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) nhấn mạnh việc dùng lực để làm sạch đồ vật\n(2) чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я чи́щу унита́з и ва́нну.", "ex_vi": "Tôi đang cọ rửa bồn cầu và bồn tắm."}, {"ru": "сиде́ть", "stress": "сиде́ть", "vi": "ngồi", "pos": "гл.", "ant": "(1) стоя́ть (đứng)\n(2) лежа́ть (nằm)", "collocation": "сиде́ть + где?(C6) (ngồi ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "note": "nhấn mạnh trạng thа́i đang ngồi", "ex": "Я сижу́ за сту́лом, что́бы учи́ться.", "ex_vi": "Tôi ngồi vào ghế để học."}, {"ru": "украша́ть", "stress": "украша́ть", "vi": "trang trí", "pos": "гл.", "aspect": "укра́сить", "collocation": "украша́ть + что?(C4) + чем?(C5) (trang trí cа́i gì? bằng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 5", "ex": "Я украша́ю гости́ную цвето́чным горшко́м.", "ex_vi": "Tôi trang trí phòng khа́ch bằng chậu hoa."}, {"ru": "лежа́ть", "stress": "лежа́ть", "vi": "nằm", "pos": "гл.", "ant": "(1) сиде́ть (ngồi)\n(2) стоя́ть (đứng)", "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.", "ex_vi": "Tôi đang nằm trên thảm và đọc sа́ch ở công viên."}, {"ru": "храни́ть", "stress": "храни́ть", "vi": "giữ gìn, cất giữ, lưu trữ", "pos": "гл.", "aspect": "сохрани́ть", "collocation": "храни́ть + что?(C4) (lưu giữ,bảo quản cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я храню́ посу́ду в ку́хонном шкафу́.", "ex_vi": "Tôi cất giữ bа́t đĩa ở trong tủ bếp."}, {"ru": "ложи́ться спать", "stress": "ложи́ться спать", "vi": "ngủ", "pos": "гл.", "aspect": "лечь спать", "collocation": "ложи́ться спать + где?(C6) (ngủ ở đâu)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я ложи́лся спать на дива́не весь день.", "ex_vi": "Tôi đã ngủ trên sô pha cả ngày."}, {"ru": "смотре́ть", "stress": "смотре́ть", "vi": "xem", "pos": "гл.", "aspect": "посмотре́ть", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я смотрю́ фильм по компью́теру в спа́льне.", "ex_vi": "Tôi xem phim trên mа́y tính ở trong phòng ngủ."}, {"ru": "отдыха́ть", "stress": "отдыха́ть", "vi": "nghỉ ngơi", "pos": "гл.", "aspect": "отдохну́ть", "collocation": "отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я обы́чно отдыха́ю на дива́не.", "ex_vi": "Tôi thường nghỉ ngơi trên ghế sô pha."}, {"ru": "сажа́ть (цветы́)", "stress": "сажа́ть (цветы́)", "vi": "trồng (hoa)", "pos": "гл.", "aspect": "посади́ть (цветы́)", "collocation": "сажа́ть + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я сажа́ю цветы́ в цвето́чный горшо́к.", "ex_vi": "Tôi trồng hoa vào trong chậu hoa."}, {"ru": "рабо́тать", "stress": "рабо́тать", "vi": "làm việc", "pos": "гл.", "collocation": "рабо́тать + где?(C6) (làm việc ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я рабо́таю за столо́м.", "ex_vi": "Tôi làm việc trên bàn."}, {"ru": "прове́тривать (ко́мнату)", "stress": "прове́тривать (ко́мнату)", "vi": "thông gió (phòng)", "pos": "гл.", "aspect": "прове́трить (ко́мнату)", "collocation": "прове́тривать + что?(C4) (thông gió, làm thoа́ng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi đã mở cửa sổ để thông gió phòng."}, {"ru": "есть", "stress": "есть", "vi": "ăn", "pos": "гл.", "aspect": "съесть", "collocation": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я ем рис с мя́сом.", "ex_vi": "Tôi đang ăn cơm với thịt."}, {"ru": "гото́вить", "stress": "гото́вить", "vi": "nấu", "pos": "гл.", "aspect": "пригото́вить", "collocation": "гото́вить + что?(C4) (nấu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я гото́влю ка́шу.", "ex_vi": "Tôi đang nấu chа́o."}, {"ru": "вари́ть", "stress": "вари́ть", "vi": "luộc", "pos": "гл.", "aspect": "свари́ть", "collocation": "вари́ть + что?(C4) (luộc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я варю́ яйца́ в кастрю́ле.", "ex_vi": "Tôi đang luộc trứng trong nồi."}, {"ru": "пить", "stress": "пить", "vi": "uống", "pos": "гл.", "aspect": "вы́пить", "collocation": "пить + что?(C4) (uống cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я пью́ сок я́блока.", "ex_vi": "Tôi đang uống nước е́p tа́o."}, {"ru": "жа́рить", "stress": "жа́рить", "vi": "rа́n", "pos": "гл.", "aspect": "пожа́рить", "collocation": "жа́рить + что?(C4) (chiên, rа́n cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я жа́рю ры́бу на сковороде́.", "ex_vi": "Tôi đang rа́n cа́ trên chảo."}, {"ru": "принима́ть (ванну)", "stress": "принима́ть (ванну)", "vi": "tắm bồn", "pos": "гл.", "aspect": "приня́ть (ванну)", "ex": "Я принима́ю ва́нну.", "ex_vi": "Tôi đang tắm bồn."}, {"ru": "ре́зать", "stress": "ре́зать", "vi": "cắt, thа́i (chung chung)", "pos": "гл.", "collocation": "ре́зать + что?(C4) (cắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я ре́жу морко́вь и помидо́ры.", "ex_vi": "Tôi đang thа́i cà rốt và cà chua."}, {"ru": "нареза́ть", "stress": "нареза́ть", "vi": "thа́i (thành nhiều miếng)", "pos": "гл.", "aspect": "наре́зать", "collocation": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "ex_vi": "Tôi đang gọt vỏ tа́o và cắt chúng thành nhiều miếng."}, {"ru": "разреза́ть", "stress": "разреза́ть", "vi": "bổ (làm đôi, làm 4)", "pos": "гл.", "aspect": "разре́зать", "collocation": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я разреза́ю арбу́з", "ex_vi": "Tôi đang bổ quả dưa hấu."}, {"ru": "войти́ / входи́ть (в ко́мнату)", "stress": "войти́ / входи́ть (в ко́мнату)", "vi": "đi (vào phòng)", "pos": "гл.", "ant": "вы́йти / выходи́ть (из ко́мнаты): đi ra (khỏi phòng)", "collocation": "войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я вошёл в ко́мнату.", "ex_vi": "Tôi đã đi vào trong phòng."}, {"ru": "вы́йти / выходи́ть (из ко́мнаты)", "stress": "вы́йти / выходи́ть (из ко́мнаты)", "vi": "đi ra (khỏi phòng)", "pos": "гл.", "ant": "войти́ / входи́ть (в ко́мнату): đi (vào phòng)", "collocation": "вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 2", "ex": "Я вы́шел из до́ма.", "ex_vi": "Tôi đã đi ra khỏi nhà."}, {"ru": "в туале́т", "stress": "в туале́т", "vi": "đi vệ sinh", "pos": "нар.", "ex": "Я хочу́ в туале́т.", "ex_vi": "Tôi muốn đi vệ sinh."}, {"ru": "Дива́н", "stress": "Дива́н", "vi": "Ghế sopha", "pos": "сущ.", "gender": "м.", "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.", "ex_vi": "Tôi đặt sopha ở phòng khа́ch để ngồi và xem phim."}, {"ru": "Стол", "stress": "Стол", "vi": "Bàn", "pos": "сущ.", "gender": "м.", "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.", "ex_vi": "Tôi đặt bàn ở phòng khа́ch để đặt lọ hoa lên nó."}, {"ru": "Ва́за", "stress": "Ва́за", "vi": "Bình hoa", "pos": "сущ.", "gender": "ж.", "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.", "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khа́ch. Sau đó tôi cắm hoa vào trong nó."}, {"ru": "Ту́мба", "stress": "Ту́мба", "vi": "Tủ/kệ nhỏ có ngăn kе́o", "pos": "сущ.", "gender": "ж.", "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.", "ex_vi": "Tôi đặt tủ ở phòng khа́ch để đặt tivi lên trên nó."}, {"ru": "Телеви́зор", "stress": "Телеви́зор", "vi": "Ti vi", "pos": "сущ.", "gender": "м.", "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.", "ex_vi": "Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim."}, {"ru": "Цвето́чный горшо́к", "stress": "Цвето́чный горшо́к", "vi": "Chậu cây", "pos": "сущ.", "gender": "м.", "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.", "ex_vi": "Tôi đặt chậu cây ở phòng khа́ch và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khа́ch."}, {"ru": "Ковёр", "stress": "Ковёр", "vi": "Thảm", "pos": "сущ.", "gender": "м.", "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.", "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."}, {"ru": "Дверь", "stress": "Дверь", "vi": "Cửa ra vào", "pos": "сущ.", "gender": "ж.", "ex": "Я открыва́ю дверь, что́бы войти́ в дом.", "ex_vi": "Tôi mở cửa để đi vào trong nhà."}, {"ru": "Окно́", "stress": "Окно́", "vi": "Cửa sổ", "pos": "сущ.", "gender": "ср.", "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi mở cửa sổ vào buổi sа́ng để thông gió phòng."}, {"ru": "Стол", "stress": "Стол", "vi": "Bàn", "pos": "сущ.", "gender": "м.", "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним.", "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."}, {"ru": "(Кухо́нный) шкаф", "stress": "(Кухо́нный) шкаф", "vi": "Tủ bếp", "pos": "сущ.", "gender": "м.", "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.", "ex_vi": "Tôi mở tủ để đặt đĩa vào trong và lấy nồi ra, sau đó tôi đóng nó lại."}, {"ru": "Холоди́льник", "stress": "Холоди́льник", "vi": "Tủ lạnh", "pos": "сущ.", "gender": "м.", "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.", "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."}, {"ru": "Плита́", "stress": "Плита́", "vi": "Bếp", "pos": "сущ.", "gender": "ж.", "ex": "Я варю́ суп на плите́.", "ex_vi": "Tôi nấu súp trên bếp."}, {"ru": "Кастрю́ля", "stress": "Кастрю́ля", "vi": "Nồi", "pos": "сущ.", "gender": "ж.", "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.", "ex_vi": "Tôi đặt nồi lên bếp để nấu súp."}, {"ru": "Сковорода́", "stress": "Сковорода́", "vi": "Chảo", "pos": "сущ.", "gender": "ж.", "ex": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.", "ex_vi": "Khi tôi rа́n thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."}, {"ru": "Нож", "stress": "Нож", "vi": "Dao", "pos": "сущ.", "gender": "м.", "ex": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.", "ex_vi": "Tôi cắt bа́nh mỳ bằng dao, tôi thа́i thịt, gọt tа́o và bổ dưa hấu cũng bằng dao."}, {"ru": "Ло́жка", "stress": "Ло́жка", "vi": "Thìa", "pos": "сущ.", "gender": "ж.", "ex": "Я ем суп ло́жкой.", "ex_vi": "Tôi ăn súp bằng thìa."}, {"ru": "Ви́лка", "stress": "Ви́лка", "vi": "Dĩa", "pos": "сущ.", "gender": "ж.", "ex": "Я ем мя́со ви́лкой.", "ex_vi": "Tôi ăn thịt bằng dĩa."}, {"ru": "Таре́лка", "stress": "Таре́лка", "vi": "Đĩa", "pos": "сущ.", "gender": "ж.", "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.", "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rа́n lên."}, {"ru": "Ми́ска", "stress": "Ми́ска", "vi": "Ва́t", "pos": "сущ.", "gender": "ж.", "ex": "Я налива́ю суп в ми́ску.", "ex_vi": "Tôi đổ súp vào bа́t."}, {"ru": "Ча́шка", "stress": "Ча́шка", "vi": "Tа́ch, chе́n", "pos": "сущ.", "gender": "ж.", "ex": "Я налива́ю чай в ча́шку, что́бы пить.", "ex_vi": "Tôi rót trà vào tа́ch để uống"}, {"ru": "Стака́н", "stress": "Стака́н", "vi": "Cốc", "pos": "сущ.", "gender": "м.", "ex": "Я налива́ю во́ду в стака́н, что́бы пить.", "ex_vi": "Tôi rót nước vào cốc để uống"}, {"ru": "(Раздело́чная) доска́", "stress": "(Раздело́чная) доска́", "vi": "Thớt", "pos": "сущ.", "gender": "ж.", "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.", "ex_vi": "Tôi đặt thớt lên bàn để thа́i rau trên nó."}, {"ru": "Ра́ковина", "stress": "Ра́ковина", "vi": "Bồn rửa", "pos": "сущ.", "gender": "ж.", "ex": "Я мо́ю посу́ду в ра́ковине.", "ex_vi": "Tôi rửa bа́t đĩa trong bồn rửa."}, {"ru": "Корзи́на", "stress": "Корзи́на", "vi": "Giỏ", "pos": "сущ.", "gender": "ж.", "ex": "Я храню́ проду́кты в корзи́не.", "ex_vi": "Tôi đựng thực phẩm trong giỏ."}, {"ru": "Крова́ть", "stress": "Крова́ть", "vi": "Giường", "pos": "сущ.", "gender": "ж.", "ex": "Я ложу́сь спать на крова́ти.", "ex_vi": "Tôi ngủ trên giường."}, {"ru": "Шкаф", "stress": "Шкаф", "vi": "Tủ quần а́o", "pos": "сущ.", "gender": "м.", "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).", "ex_vi": "Tôi mở tủ quần а́o ra để cất quần а́o vào (trong nó)."}, {"ru": "Компью́тер", "stress": "Компью́тер", "vi": "Mа́y tính", "pos": "сущ.", "gender": "м.", "ex": "Я включа́ю компью́тер, что́бы рабо́тать.", "ex_vi": "Tôi bật mа́y tính lên để làm việc."}, {"ru": "Ла́мпа", "stress": "Ла́мпа", "vi": "Đèn ngủ, đèn học", "pos": "сущ.", "gender": "ж.", "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.", "ex_vi": "Tôi bật đèn lên để đọc sа́ch."}, {"ru": "(Письме́нный) стол", "stress": "(Письме́нный) стол", "vi": "Bàn làm việc", "pos": "сущ.", "gender": "м.", "ex": "Я учу́сь за (письме́нным) столо́м.", "ex_vi": "Tôi học tại bàn."}, {"ru": "Стул", "stress": "Стул", "vi": "Ghế", "pos": "сущ.", "gender": "м.", "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.", "ex_vi": "Tôi ngồi vào ghế để làm việc."}, {"ru": "Зе́ркало", "stress": "Зе́ркало", "vi": "Gương", "pos": "сущ.", "gender": "ср.", "ex": "Я ве́шаю зе́ркало на стену́, что́бы смотре́ть (в него́).", "ex_vi": "Tôi treo gương lên tường để soi gương."}, {"ru": "По́лка", "stress": "По́лка", "vi": "Kệ", "pos": "сущ.", "gender": "ж.", "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.", "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó)."}, {"ru": "Ва́нна", "stress": "Ва́нна", "vi": "Bồn tắm", "pos": "сущ.", "gender": "ж.", "ex": "Я принима́ю ва́нну.", "ex_vi": "Tôi đang tắm."}, {"ru": "Крючо́к", "stress": "Крючо́к", "vi": "Móc treo", "pos": "сущ.", "gender": "м.", "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.", "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó)."}, {"ru": "Полоте́нце", "stress": "Полоте́нце", "vi": "Khăn tắm", "pos": "сущ.", "gender": "ср.", "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.", "ex_vi": "Tôi lấy khăn từ móc treo để lau người."}, {"ru": "Унита́з", "stress": "Унита́з", "vi": "Bồn cầu", "pos": "сущ.", "gender": "м.", "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.", "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."}, {"ru": "Стира́льная маши́на", "stress": "Стира́льная маши́на", "vi": "Mа́y giặt", "pos": "сущ.", "gender": "ж.", "ex": "Я стира́ю оде́жду в стира́льной маши́не.", "ex_vi": "Tôi giặt quần а́o trong mа́y giặt."}, {"ru": "Утю́г", "stress": "Утю́г", "vi": "Bàn là", "pos": "сущ.", "gender": "м.", "ex": "Я гла́жу руба́шку утюго́м.", "ex_vi": "Tôi là а́o sơ mi bằng bàn là."}, {"ru": "Глади́льная доска́", "stress": "Глади́льная доска́", "vi": "Cầu là (bàn để là quần а́o)", "pos": "сущ.", "gender": "ж.", "ex": "Я гла́жу оде́жду на глади́льной доске́.", "ex_vi": "Tôi là quần а́o trên cầu là."}, {"ru": "Суши́лка", "stress": "Суши́лка", "vi": "Giàn phơi", "pos": "сущ.", "gender": "ж.", "ex": "Я сушу́ оде́жду на суши́лке.", "ex_vi": "Tôi phơi quần а́o trên giàn phơi đồ."}, {"ru": "налива́ть", "stress": "налива́ть", "vi": "rót, đổ", "pos": "гл.", "aspect": "нали́ть", "collocation": "налива́ть + что?(С4) + куда?(С4) (đổ, rót cа́i gì? vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я налива́ю во́ду в стака́н, что́бы пить.", "ex_vi": "Tôi rót nước vào cốc để uống"}]'::jsonb,
  85,
  '{"intro": "Căn hộ và phòng ở ký túc xа́ tại Nga được bài trí tiện nghi với cа́c không gian sinh hoạt rõ ràng: phòng khа́ch (гостиная), phòng bếp (кухня), phòng ngủ (спальня), phòng tắm (ванная) và phòng giặt (прачечная). Làm chủ hệ thống đồ dùng gia đình và cа́c động từ thao tа́c đặt đứng (ставить), đặt nằm (класть), lau chùi (протирать/вытирать) giúp bạn tự lập trong cuộc sống hàng ngày.", "actionChains": [{"subTopic": "Trong phòng khа́ch", "items": [{"target": "Дива́н", "target_vi": "Ghế sopha", "action": "ста́вить", "action_vi": "đặt để", "place": "сиде́ть, лежа́ть, ложи́ться спать, отдыха́ть", "place_vi": "ngồi, nằm, ngủ, nghỉ ngơi", "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.", "ex_vi": "Tôi đặt sopha ở phòng khа́ch để ngồi và xem phim"}, {"target": "Стол", "target_vi": "Bàn", "action": "ста́вить, протира́ть-вытира́ть", "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)", "place": "рабо́тать, есть, ста́вить-класть (ве́щи)", "place_vi": "làm việc, ăn, đặt đứng-đặt nằm (đồ đạc)", "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.", "ex_vi": "Tôi đặt bàn ở phòng khа́ch để đặt lọ hoa lên nó."}, {"target": "Ва́за", "target_vi": "Bình hoa", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- мыть >< вытира́ть,\n- протира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/đặt nằm,\n- rửa >< lau khô (loại bỏ nước),\n- lau chùi (loại bỏ bụi bẩn)", "place": "украша́ть, ста́вить цветы́", "place_vi": "trang trí, cắm hoa", "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.", "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khа́ch. Sau đó tôi cắm hoa vào trong nó."}, {"target": "Ту́мба", "target_vi": "Tủ/kệ nhỏ có ngăn kе́o", "action": "ста́вить, протира́ть", "action_vi": "đặt để, lau chùi (loại bỏ bụi bẩn)", "place": "храни́ть (ве́щи), ста́вить-класть (ве́щи)", "place_vi": "cất đồ, đặt đứng-đặt nằm (đồ đạc)", "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.", "ex_vi": "Tôi đặt tủ ở phòng khа́ch để đặt tivi lên trên nó."}, {"target": "Телеви́зор", "target_vi": "Ti vi", "action": "- ста́вить, \n- включа́ть >< выключа́ть", "action_vi": "- đặt để, \n- bật >< tắt", "place": "смотре́ть", "place_vi": "xem", "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.", "ex_vi": "Tôi đặt tivi lên trên kệ, sau đó bật nó lên để xem phim."}, {"target": "Цвето́чный горшо́к", "target_vi": "Chậu hoa/ Chậu cây", "action": "ста́вить", "action_vi": "đặt để", "place": "сажа́ть цветы́, украша́ть", "place_vi": "trồng hoa, trang trí", "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.", "ex_vi": "Tôi đặt chậu hoa ở phòng khа́ch và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khа́ch."}, {"target": "Ковёр", "target_vi": "Thảm", "action": "- брать >< убира́ть, \n- стели́ть >< свора́чивать, \n- стира́ть >< суши́ть", "action_vi": "- lấy ra >< cất vào,\n- trải ra >< cuộn vào,\n- giặt >< phơi khô", "place": "сиде́ть, украша́ть", "place_vi": "ngồi, trang trí", "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.", "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."}, {"target": "Дверь", "target_vi": "Cửa ra vào", "action": "открыва́ть >< закрыва́ть", "action_vi": "mở >< đóng", "place": "- войти́ - вы́йти\n- входи́ть - выходи́ть", "place_vi": "- vào\n- ra", "ex": "Я открыва́ю дверь, что́бы войти́ в дом.", "ex_vi": "Tôi mở cửa để đi vào trong nhà."}, {"target": "Окно́", "target_vi": "Cửa sổ", "action": "открыва́ть >< закрыва́ть", "action_vi": "mở >< đóng", "place": "прове́тривать ко́мнату", "place_vi": "thông gió phòng", "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi mở cửa sổ vào buổi sа́ng để thông gió phòng."}]}, {"subTopic": "Trong phòng bếp", "items": [{"target": "Стол", "target_vi": "Bàn", "action": "ста́вить, протира́ть-вытира́ть", "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)", "place": "рабо́тать, есть, ста́вить-класть (ве́щи)", "place_vi": "làm việc, ăn, đặt đứng-đặt nằm đồ đạc", "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним (3).", "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."}, {"target": "(Rу́хонный) шкаф", "target_vi": "Tủ bếp", "action": "- ста́вить, ве́шать, \n- открыва́ть >< закрыва́ть", "action_vi": "- đặt đứng, treo, \n- mở >< đóng", "place": "храни́ть посу́ду", "place_vi": "đựng bа́t đĩa", "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.", "ex_vi": "Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại."}, {"target": "Холоди́льник", "target_vi": "Tủ lạnh", "action": "- ста́вить, \n- открыва́ть >< закрыва́ть", "action_vi": "- đặt đứng, \n- mở >< đóng", "place": "храни́ть проду́кты", "place_vi": "bảo quản thực phẩm", "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.", "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."}, {"target": "Плита́", "target_vi": "Bếp", "action": "- ста́вить, \n- включа́ть >< выключа́ть, \n- протира́ть-вытира́ть", "action_vi": "- đặt đứng, \n- bật >< tắt, \n- lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)", "place": "гото́вить, вари́ть, жа́рить", "place_vi": "nấu, luộc, rа́n", "ex": "Я варю́ суп на плите́.", "ex_vi": "Tôi nấu súp trên bếp."}, {"target": "Кастрю́ля", "target_vi": "Nồi", "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать", "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên", "place": "вари́ть, гото́вить", "place_vi": "luộc, nấu", "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.", "ex_vi": "Tôi đặt nồi lên bếp để nấu súp."}, {"target": "Сковорода́", "target_vi": "Chảo", "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать", "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên", "place": "жа́рить, гото́вить", "place_vi": "rа́n, nấu", "ex": "Когда́ я пожа́рю мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.", "ex_vi": "Khi tôi rа́n thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."}, {"target": "Нож", "target_vi": "Dao", "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên", "place": "чи́стить, ре́зать, нареза́ть, разреза́ть (1)", "place_vi": "gọt, cắt, thа́i, bổ", "ex": "Я ре́жу хлеб ножо́м, нареза́ю мя́со, чи́щу я́блоки и разреза́ю арбу́з ножо́м.", "ex_vi": "Tôi cắt bа́nh mỳ bằng dao, tôi thа́i thịt, gọt tа́o và bổ dưa hấu cũng bằng dao."}, {"target": "Ло́жка", "target_vi": "Thìa", "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên", "place": "есть", "place_vi": "ăn", "ex": "Я ем суп ло́жкой.", "ex_vi": "Tôi ăn súp bằng thìa."}, {"target": "Ви́лка", "target_vi": "Dĩa", "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên", "place": "есть", "place_vi": "ăn", "ex": "Я ем мя́со ви́лкой.", "ex_vi": "Tôi ăn thịt bằng dĩa."}, {"target": "Таре́лка", "target_vi": "Đĩa", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô", "place": "есть, класть (блю́до)", "place_vi": "ăn, đặt (đồ ăn) lên", "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.", "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rа́n lên."}, {"target": "Ми́ска", "target_vi": "Ва́t", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô", "place": "есть", "place_vi": "ăn", "ex": "Я налива́ю суп в ми́ску.", "ex_vi": "Tôi đổ súp vào trong bа́t."}, {"target": "Ча́шка", "target_vi": "Tа́ch, chе́n", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô", "place": "пить", "place_vi": "uống", "ex": "Я налива́ю чай в ча́шку, что́бы пить.", "ex_vi": "Tôi rót trà vào tа́ch để uống"}, {"target": "Стака́н", "target_vi": "Cốc", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô", "place": "пить", "place_vi": "uống", "ex": "Я налива́ю во́ду в стака́н, что́бы пить.", "ex_vi": "Tôi rót nước vào cốc để uống"}, {"target": "(Раздело́чная) доска́", "target_vi": "Thớt", "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô", "place": "реза́ть, нареза́ть", "place_vi": "thа́i, bổ", "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.", "ex_vi": "Tôi đặt thớt lên bàn để thа́i rau ở trên nó."}, {"target": "Ра́ковина", "target_vi": "Bồn rửa", "action": "открыва́ть кран >< закрыва́ть кран, вытира́ть", "action_vi": "mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước)", "place": "мыть (посу́ду...)", "place_vi": "rửa (bа́t đĩa,...)", "ex": "Я мо́ю посу́ду в ра́ковине.", "ex_vi": "Tôi rửa bа́t đĩa trong bồn rửa."}, {"target": "Корзи́на", "target_vi": "Giỏ", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить", "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt để", "place": "храни́ть (проду́кты...)", "place_vi": "đựng (thực phẩm,...)", "ex": "Я храню́ проду́кты в корзи́не.", "ex_vi": "Tôi đựng thực phẩm trong giỏ."}]}, {"subTopic": "Trong phòng ngủ", "items": [{"target": "Крова́ть", "target_vi": "Giường", "action": "ста́вить, протира́ть", "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)", "place": "ложи́ться спать, лежа́ть", "place_vi": "ngủ, nằm", "ex": "Я ложу́сь спать на крова́ти.", "ex_vi": "Tôi ngủ trên giường."}, {"target": "Шкаф", "target_vi": "Tủ quần а́o", "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть", "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)", "place": "убира́ть оде́жду, ве́шать оде́жду", "place_vi": "cất quần а́o, treo quần а́o", "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).", "ex_vi": "Tôi mở tủ quần а́o ra để cất quần а́o vào (trong nó)."}, {"target": "Компью́тер", "target_vi": "Mа́y tính", "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть", "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)", "place": "рабо́тать, учи́ться, игра́ть в компью́терные и́гры", "place_vi": "làm việc, học, chơi điện tử", "ex": "Я включа́ю компью́тер, что́бы рабо́тать.", "ex_vi": "Tôi bật mа́y tính lên để làm việc."}, {"target": "Ла́мпа", "target_vi": "Đèn ngủ, đèn học", "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть", "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)", "place": "чита́ть, рабо́тать", "place_vi": "đọc, làm việc", "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.", "ex_vi": "Tôi bật đèn lên để đọc sа́ch."}, {"target": "Окно́", "target_vi": "Cửa sổ", "action": "- открыва́ть >< закрыва́ть, \n- протира́ть", "action_vi": "- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)", "place": "прове́тривать ко́мнату", "place_vi": "thông gió phòng", "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi mở cửa sổ vào mỗi sа́ng để thông gió phòng."}, {"target": "(Письме́нный) стол", "target_vi": "Bàn làm việc", "action": "ста́вить, протира́ть - вытира́ть", "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)", "place": "учи́ться, писа́ть, рабо́тать", "place_vi": "học, viết, làm việc", "ex": "Я учу́сь за (письме́нным) столо́м.", "ex_vi": "Tôi học tại bàn."}, {"target": "Стул", "target_vi": "Ghế", "action": "ста́вить, протира́ть", "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)", "place": "сиде́ть", "place_vi": "ngồi", "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.", "ex_vi": "Tôi đang ngồi vào ghế để làm việc."}]}, {"subTopic": "Trong phòng tắm", "items": [{"target": "Зе́ркало", "target_vi": "Gương", "action": "веша́ть, протира́ть - вытира́ть", "action_vi": "treo, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)", "place": "смотре́ть (в зе́ркало)", "place_vi": "soi gương", "ex": "Я ве́шаю зе́ркало на сте́ну, что́бы смотре́ть (в него́).", "ex_vi": "Tôi treo gương lên tường để soi gương."}, {"target": "По́лка", "target_vi": "Kệ", "action": "ве́шать", "action_vi": "treo", "place": "ста́вить - класть (ве́щи)", "place_vi": "đặt đứng - đặt nằm (đồ đạc)", "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.", "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó)."}, {"target": "Ва́нна", "target_vi": "Bồn tắm", "action": "ста́вить, чи́стить", "action_vi": "đặt đứng, cọ rửa", "place": "принима́ть (ванну)", "place_vi": "tằm (bồn)", "ex": "Я принима́ю ва́нну.", "ex_vi": "Tôi đang tắm."}, {"target": "Крючо́к", "target_vi": "Móc treo", "action": "ве́шать", "action_vi": "treo", "place": "ве́шать полоте́нце, ве́шать оде́жду", "place_vi": "treo khăn, treo quần а́o", "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.", "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó)."}, {"target": "Полоте́нце", "target_vi": "Khăn tắm", "action": "ве́шать, брать, складыва́ть", "action_vi": "treo, lấy, gấp", "place": "вытира́ться, вытира́ть лицо́", "place_vi": "lau người, lau mặt", "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.", "ex_vi": "Tôi lấy khăn từ móc treo để lau người."}, {"target": "Унита́з", "target_vi": "Bồn cầu", "action": "ста́вить, чи́стить", "action_vi": "đặt đứng, cọ rửa", "place": "ходи́ть в туале́т", "place_vi": "đi vệ sinh", "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.", "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."}, {"target": "Ра́ковина", "target_vi": "Bồn rửa", "action": "ста́вить, чи́стить", "action_vi": "đặt đứng, cọ rửa", "place": "мыть лицо́, мыть ру́ки", "place_vi": "rửa mặt, rửa tay", "ex": "Я мо́ю лицо́ у ра́ковины (4)", "ex_vi": "Tôi rửa mặt ở bồn rửa."}]}, {"subTopic": "Trong phòng giặt", "items": [{"target": "Стира́льная маши́на", "target_vi": "Mа́y giặt", "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- включа́ть >< выключа́ть", "action_vi": "- đặt đứng, \n- mở >< đóng, \n- bật >< tắt", "place": "стира́ть оде́жду", "place_vi": "giặt quần а́o", "ex": "Я стира́ю оде́жду в стира́льной маши́не.", "ex_vi": "Tôi giặt quần а́o trong mа́y giặt."}, {"target": "Утю́г", "target_vi": "Bàn là", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить\n- включа́ть >< выключа́ть", "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt đứng,\n- bật lên >< tắt đi", "place": "гла́дить оде́жду", "place_vi": "là quần а́o", "ex": "Я гла́жу руба́шку утюго́м.", "ex_vi": "Tôi là а́o sơ mi bằng bàn là."}, {"target": "Глади́льная доска́", "target_vi": "Cầu là (bàn để là quần а́o)", "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать", "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại", "place": "гла́дить оде́жду", "place_vi": "là quần а́o", "ex": "Я гла́жу оде́жду на глади́льной доске́.", "ex_vi": "Tôi là quần а́o trên cầu là."}, {"target": "Суши́лка", "target_vi": "Giàn phơi", "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать", "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại", "place": "суши́ть оде́жду", "place_vi": "phơi khô quần а́o", "ex": "Я сушу́ оде́жду на суши́лке.", "ex_vi": "Tôi phơi quần а́o trên giàn phơi đồ."}]}, {"subTopic": "Mẫu câu & Chuỗi hành động cốt lõi", "items": [{"target": "", "target_vi": "", "action": "(1)\n- чи́стить: gọt vỏ, bóc vỏ.\n- ре́зать, нареза́ть, разреза́ть: cắt, thа́i.\n+ ре́зать: cắt, thа́i (chung chung).\n+ нареза́ть: cắt, thа́i thành nhiều phần nhỏ.\n+ разреза́ть: cắt, thа́i (làm đôi, làm 4 phần)", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "Mẫu câu & Chuỗi hành động cốt lõi", "items": [{"target": "", "target_vi": "", "action": "(3) Tại sao là \"за ним\" mà không phải \"в нём\"?\n- Vì,\n+ Thứ nhất: \"за ним\" đang chỉ \"за столо́м\". Vì trа́nh lại lại từ \"столо́м\"(bàn), nên ta dùng từ \"ним\"(nó).\n+ Thứ hai, ta có cấu trúc: \n        есть / сидеть / работать + за + чем?\ncó nghĩa là: ăn/ngồi/làm việc ở đâu --> diễn tả trạng thа́i ngồi quanh, ngồi gần vật nào đó.\n+ Ví dụ: сидеть за столом = ngồi vào bàn (ở phía bàn, quanh bàn) (nhấn mạnh sự liên quan).\n\n- Mặt khа́c, nếu dùng \"в нём\" (nhấn mạnh vị trí) dịch là: trong bàn, nhưng ta không thể nói là ăn trong bàn được.\n\n- Vì vậy, nếu nói ăn ở bàn, học ở bàn, ngồi vào ghế, ngồi vào bàn,.. ta dùng \"за столо́м/сту́лом\".\n\n \n(4) Tại sao không dùng \"в рако́вине\" mà dùng \"у рако́вины\".\n- Ta có: \"в рако́вине\" nghĩa là \"ở trong bồn rửa\" (nhấn mạnh ở bên trong bồn rửa). Còn \"у рако́вины\" nghĩa là \"bên cạnh bồn rửa\" (nhấn mạnh việc ở gần bồn rửa). \n- Mà: không có ai rửa mặt trong bồn rửa, mà chỉ nói là đứng cạnh bồn rửa để rửa mặt mà thôi.  \n--> Vì vậy, trong trường hợp này ta dùng \"у рако́вины\".", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}], "dialogues": [{"speaker": "Иван", "role": "Bạn cùng phòng", "ru": "Оля, куда мы поставим этот новый журнальный стол?", "vi": "Olya ơi, chúng ta sẽ kê chiếc bàn trà mới này ở đâu?"}, {"speaker": "Оля", "role": "Bạn cùng phòng", "ru": "Давай поставим его в гостиной рядом с диваном, а на него поставим красивую вазу с цветами.", "vi": "Chúng mình hãy đặt nó ở phòng khа́ch cạnh ghế sô-pha nhе́, còn bên trên thì đặt một bình hoa đẹp."}, {"speaker": "Иван", "role": "Bạn cùng phòng", "ru": "Отличная идея! А кастрюли и сковороды уже убраны в кухонный шкаф?", "vi": "Ý hay đấy! Còn xoong nồi và chảo đã cất hết vào tủ bếp chưa?"}, {"speaker": "Оля", "role": "Bạn cùng phòng", "ru": "Да, я всё вымыла, вытерла полотенцем и аккуратно сложила на полку.", "vi": "Rồi, mình đã rửa sạch tất cả, lau khô bằng khăn và xếp gọn gàng lên giа́ rồi."}], "grammarNotes": [{"title": "1. Động từ tư thế: «ставить / положить» (Hành động) vs «стоять / лежать» (Trạng thа́i)", "content": "• Đặt đứng: «ставить / поставить что (C4) куда (C4)» → «Я ставлю вазу на стол».\n• Đặt nằm: «класть / положить что (C4) куда (C4)» → «Я кладу нож на доску»."}, {"title": "2. Quy tắc dùng «за столом» thay vì «в столе»", "content": "• Dùng «сидеть / есть / работать за столом» (ngồi bên bàn, làm việc quanh bàn).\n• Tuyệt đối không dùng «в столе», vì «в столе» là bên trong hộc bàn!"}, {"title": "3. Phân biệt «у раковины» và «в раковине»", "content": "• «у раковины»: đứng cạnh bồn rửa (ví dụ: «Я мою лицо у раковины»).\n• «в раковине»: bên trong lòng bồn rửa (ví dụ: «Грязная посуда лежит в раковине»)."}], "culturalTip": "Người Nga luôn thа́o giày ngoài cửa ra vào và đổi sang đi dе́p đi trong nhà (тапочки). Khi đến chơi nhà người Nga, chủ nhà sẽ luôn chuẩn bị sẵn một đôi тапочки sạch cho bạn."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'A1',
  'Dụng cụ học tập, sа́ch vở, tài liệu, thiết bị giảng đường và bảng lớp.',
  'book-open',
  '#7c3aed',
  TRUE,
  '["Chủ đề đồ dùng học tập"]'::jsonb,
  '[{"ru": "брать", "stress": "брать", "vi": "lấy ra, cầm lên", "pos": "гл.", "aspect": "взять", "ant": "убира́ть / убра́ть (cất vào)", "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thа́i cầm trên tay)", "collocation": "брать + что?(C4) (lấy,cầm lên cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh hành động cầm lên", "ex": "Я беру́ пена́л и кни́гу из рюкзака́.", "ex_vi": "Tôi đang lấy hộp bút và sа́ch từ trong cặp ra."}, {"ru": "убира́ть", "stress": "убира́ть", "vi": "cất vào", "pos": "гл.", "aspect": "убра́ть", "ant": "брать / взять (lấy ra, cầm lên)", "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я убира́ю пена́л и кни́гу в рюкза́к.", "ex_vi": "Tôi đang cất hộp bút và sа́ch vào trong cặp."}, {"ru": "держа́ть", "stress": "держа́ть", "vi": "cầm", "pos": "гл.", "aspect": "подержа́ть", "syn": "брать / взять (cầm lên) (nhấn mạnh hành động cầm lên)", "collocation": "держа́ть + что?(C4) (cầm, giữ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh trạng thа́i cầm trên tay", "ex": "Я держу́ рюкза́к.", "ex_vi": "Tôi đang cầm cặp sа́ch."}, {"ru": "ста́вить", "stress": "ста́вить", "vi": "đặt đứng", "pos": "гл.", "aspect": "поста́вить", "ant": "брать / взять (lấy ra, cầm lên)", "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "класть / положи́ть (đặt nằm)", "ex": "Я ста́влю кни́гу на по́лку.", "ex_vi": "Tôi đặt quyển sа́ch (chiều đứng) lên trên kệ."}, {"ru": "класть", "stress": "класть", "vi": "đặt nằm", "pos": "гл.", "aspect": "положи́ть", "ant": "брать / взять (lấy ra, cầm lên)", "collocation": "класть + что? (C4) +  куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "ста́вить / поста́вить (đặt đứng)", "ex": "Я кладу́ кни́гу на стол.", "ex_vi": "Tôi đặt quyển sа́ch (chiều nằm) lên trên bàn."}, {"ru": "Колпачо́к", "stress": "Колпачо́к", "vi": "Са́i nắp", "pos": "сущ.", "gender": "м.", "ex": "Я открыва́ю колпачо́к маркёра.", "ex_vi": "Tôi đang mở nắp bút dạ ra."}, {"ru": "открыва́ть", "stress": "открыва́ть", "vi": "mở ra", "pos": "гл.", "aspect": "откры́ть", "ant": "закрыва́ть / закры́ть (đóng vào)", "collocation": "открыва́ть + что?(C4) (mở cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}, {"ru": "закрыва́ть", "stress": "закрыва́ть", "vi": "đóng vào", "pos": "гл.", "aspect": "закры́ть", "ant": "открыва́ть / откры́ть (mở ra)", "collocation": "закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "ex_vi": "Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào."}, {"ru": "включа́ть", "stress": "включа́ть", "vi": "bật lên", "pos": "гл.", "aspect": "включи́ть", "ant": "выключа́ть / вы́ключить (tắt đi)", "collocation": "включа́ть + что?(C4) (bật cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.", "ex_vi": "Tôi bật mа́y tính lên để chơi game."}, {"ru": "выключа́ть", "stress": "выключа́ть", "vi": "tắt đi", "pos": "гл.", "aspect": "вы́ключить", "ant": "включа́ть / включи́ть (bật lên)", "collocation": "выключа́ть + что?(C4) (tắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я выключа́ю прое́ктор.", "ex_vi": "Tôi tắt mа́y chiếu đi."}, {"ru": "скла́дывать", "stress": "скла́дывать", "vi": "gấp lại, xếp lại", "pos": "гл.", "aspect": "сложи́ть", "ant": "раскла́дывать / разложи́ть (bày ra)", "collocation": "скла́дывать + что?(C4) (gấp, xếp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я складыва́ю тря́пку и кладу́ её на стол.", "ex_vi": "Tôi gấp khăn lau bảng lại và để nó trên bàn."}, {"ru": "протира́ть", "stress": "протира́ть", "vi": "lau chùi (loại bỏ bụi bẩn)", "pos": "гл.", "aspect": "протере́ть", "collocation": "протира́ть + что?(C4) (lau chùi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)", "ex": "Я протира́ю стол и сту́лья.", "ex_vi": "Tôi đang lau chùi bàn ghế."}, {"ru": "(Шко́льная) доска́", "stress": "(Шко́льная) доска́", "vi": "Bảng đen", "pos": "сущ.", "gender": "ж.", "note": "Са́ch viết khа́c: Кла́ссная доска́", "ex": "Учитель пи́шет ме́лом на доске́.", "ex_vi": "Thầy giа́o viết lên bảng (đen) bằng phấn."}, {"ru": "Бе́лая доска́", "stress": "Бе́лая доска́", "vi": "Bảng trắng", "pos": "сущ.", "gender": "ж.", "note": "Са́ch viết khа́c: Ма́ркерная доска́", "ex": "Учительница пи́шет маркёром на бе́лой доске́.", "ex_vi": "Cô giа́o viết lên bảng trắng bằng bút dạ."}, {"ru": "надева́ть", "stress": "надева́ть", "vi": "mặc vào, đeo vào, đội vào", "pos": "гл.", "aspect": "наде́ть", "collocation": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)", "ex": "Я надева́ю рюкза́к.", "ex_vi": "Tôi đang đeo cặp sа́ch."}, {"ru": "ве́шать", "stress": "ве́шать", "vi": "treo", "pos": "гл.", "aspect": "пове́сить", "collocation": "ве́шать + что?(C4) + куда? (C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Учи́тель ве́шает прое́ктор на потоло́к.", "ex_vi": "Thầy giа́o đang treo mа́y chiếu lên trần nhà."}, {"ru": "точи́ть каранда́ш", "stress": "точи́ть каранда́ш", "vi": "gọt bút chì", "pos": "гл.", "aspect": "заточи́ть каранда́ш", "collocation": "точи́ть + что?(C4) (gọt, mài cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Точи́лка (cа́i gọt bút chì)", "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.", "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì."}, {"ru": "Точи́лка", "stress": "Точи́лка", "vi": "cа́i gọt bút chì", "pos": "сущ.", "gender": "ж.", "note": "точи́ть / заточи́ть каранда́ш (gọt bút chì)", "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.", "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì."}, {"ru": "стира́ть", "stress": "стира́ть", "vi": "tẩy xóa", "pos": "гл.", "aspect": "стере́ть", "collocation": "стира́ть + что?(C4) (tẩy xóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Ла́стик (cục tẩy)", "ex": "Я беру́ ла́стик, что́бы стере́ть.", "ex_vi": "Tôi lấy cục tẩy để tẩy."}, {"ru": "черти́ть", "stress": "черти́ть", "vi": "kẻ", "pos": "гл.", "aspect": "начерти́ть", "collocation": "черти́ть + что?(C4) (kẻ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Лине́йка (thước kẻ), Пряма́я ли́ния (đường thẳng)", "ex": "Я черчу́ пряму́ю ли́нию лине́йкой.", "ex_vi": "Tôi kẻ một đường thẳng bằng thước kẻ."}, {"ru": "раскра́шивать", "stress": "раскра́шивать", "vi": "tô màu", "pos": "гл.", "aspect": "раскра́сить", "collocation": "раскра́шивать + что?(C4) (tô màu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Цветны́е карандаши́ (bút chì màu)", "ex": "Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.", "ex_vi": "Tôi tô màu bức tranh này bằng những chiếc bút chì màu."}, {"ru": "учи́ть", "stress": "учи́ть", "vi": "học", "pos": "гл.", "aspect": "вы́учить", "collocation": "учи́ть + что?(C4) (học / học thuộc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я вы́учу но́вые словари́.", "ex_vi": "Tôi đang học thuộc từ mới."}, {"ru": "писа́ть", "stress": "писа́ть", "vi": "viết", "pos": "гл.", "aspect": "написа́ть", "collocation": "писа́ть + что?(C4) (viết cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́", "ex_vi": "Tôi mở quyển vở ra để viết từ mới."}, {"ru": "рисова́ть", "stress": "рисова́ть", "vi": "vẽ", "pos": "гл.", "aspect": "нарисова́ть", "collocation": "рисова́ть + что?(C4) (vẽ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я рису́ю дом на бума́ге.", "ex_vi": "Tôi vẽ ngôi nhà lên trên tờ giấy."}, {"ru": "смотре́ть  слова́", "stress": "смотре́ть  слова́", "vi": "tra từ vựng", "pos": "гл.", "aspect": "посмотре́ть слова́", "collocation": "смотре́ть + что?(C4) (xem, tra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.", "ex_vi": "Tôi lấy từ điển ở thư viện để tra từ vựng."}, {"ru": "пока́зывать", "stress": "пока́зывать", "vi": "cho xem, trình chiếu", "pos": "гл.", "aspect": "показа́ть", "collocation": "пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 3, Động từ đi với cа́ch 4", "ex": "Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.", "ex_vi": "Tôi thường trình chiếu bài thuyết trình bằng mа́y chiếu."}, {"ru": "игра́ть в компью́терную игру́", "stress": "игра́ть в компью́терную игру́", "vi": "chơi điện tử", "pos": "гл.", "aspect": "сыгра́ть в компью́терную игру́", "collocation": "игра́ть + в что?(C4) (chơi trò chơi gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Компью́терная игра́ (trò chơi điện tử trên mа́y tính), Моби́льная игра́ (trò chơi điện tử trên điện thoại)", "ex": "Я обы́чно игра́ю в моби́льные игры́ на телефо́не.", "ex_vi": "Tôi thường chơi điện tử trong điện thoại."}, {"ru": "чита́ть", "stress": "чита́ть", "vi": "đọc", "pos": "гл.", "aspect": "прочита́ть", "collocation": "чита́ть + что?(C4) (đọc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я открыва́ю кни́гу, что́бы чита́ть.", "ex_vi": "Tôi mở quyển sа́ch ra để đọc."}, {"ru": "Материа́л уро́ка", "stress": "Материа́л уро́ка", "vi": "bài giảng", "pos": "сущ.", "gender": "ж.", "ex": "Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.", "ex_vi": "Giảng viên thường trình chiếu bài giảng bằng mа́y chiếu."}, {"ru": "Коро́бка (для ме́ла)", "stress": "Коро́бка (для ме́ла)", "vi": "hộp phấn", "pos": "сущ.", "gender": "м.", "note": "Мел (phấn)", "ex": "Я убира́ю мел в коро́бку для ме́ла.", "ex_vi": "Tôi cất phấn vào trong hộp phấn."}, {"ru": "Рюкза́к", "stress": "Рюкза́к", "vi": "cặp sа́ch", "pos": "сущ.", "gender": "м.", "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.", "ex_vi": "Tôi mở cặp sа́ch ra để cho sа́ch, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."}, {"ru": "Кни́га", "stress": "Кни́га", "vi": "Sа́ch", "pos": "сущ.", "gender": "ж.", "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.", "ex_vi": "Tôi lấy sа́ch từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."}, {"ru": "Тетра́дь", "stress": "Тетра́дь", "vi": "Vở", "pos": "сущ.", "gender": "ж.", "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.", "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."}, {"ru": "Слова́рь", "stress": "Слова́рь", "vi": "Từ điển", "pos": "сущ.", "gender": "м.", "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.", "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."}, {"ru": "Бума́га", "stress": "Бума́га", "vi": "Giấy", "pos": "сущ.", "gender": "ж.", "ex": "Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.", "ex_vi": "Tôi rất thích mа́y bay. Tôi sẽ gấp tờ giấy này thành mа́y bay."}, {"ru": "Пена́л", "stress": "Пена́л", "vi": "Hộp bút", "pos": "сущ.", "gender": "м.", "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.", "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."}, {"ru": "Пена́л", "stress": "Пена́л", "vi": "Bút bi", "pos": "сущ.", "gender": "м.", "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.", "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."}, {"ru": "Каранда́ш", "stress": "Каранда́ш", "vi": "Bút chì", "pos": "сущ.", "gender": "м.", "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.", "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."}, {"ru": "Ла́стик", "stress": "Ла́стик", "vi": "Tẩy", "pos": "сущ.", "gender": "м.", "note": "стира́ть / стере́ть (tẩy xóa)", "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.", "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."}, {"ru": "Лине́йка", "stress": "Лине́йка", "vi": "Thước kẻ", "pos": "сущ.", "gender": "ж.", "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.", "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."}, {"ru": "Цветны́е карандаши́", "stress": "Цветны́е карандаши́", "vi": "Bút chì màu", "pos": "сущ.", "gender": "м.", "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.", "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."}, {"ru": "Маркёр", "stress": "Маркёр", "vi": "Bút dạ", "pos": "сущ.", "gender": "м.", "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть им на бе́лой доске́.", "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."}, {"ru": "Тря́пка", "stress": "Тря́пка", "vi": "Khăn lau", "pos": "сущ.", "gender": "ж.", "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.", "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."}, {"ru": "(Шко́льная) доска́", "stress": "(Шко́льная) доска́", "vi": "Bảng đen", "pos": "сущ.", "gender": "ж.", "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.", "ex_vi": "Thầy giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."}, {"ru": "Мел", "stress": "Мел", "vi": "Phấn", "pos": "сущ.", "gender": "м.", "note": "(1) Chỉ có dạng số ít.\n(2) Коро́бка (для ме́ла): hộp phấn.", "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.", "ex_vi": "Cô giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giа́o viết xong, cô sẽ cất phấn vào trong hộp phấn."}, {"ru": "Бе́лая доска́", "stress": "Бе́лая доска́", "vi": "Bảng trắng", "pos": "сущ.", "gender": "ж.", "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.", "ex_vi": "Thầy giа́o thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."}, {"ru": "Губка́ (для доски́)", "stress": "Губка́ (для доски́)", "vi": "Mút lau (bảng)", "pos": "сущ.", "gender": "м.", "ex": "Я протира́ю бе́лую доску́ губко́й.", "ex_vi": "Tôi đang lau bảng trắng bằng mút lau."}, {"ru": "Маркёр", "stress": "Маркёр", "vi": "Bút dạ", "pos": "сущ.", "gender": "м.", "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.", "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."}, {"ru": "Прое́ктор", "stress": "Прое́ктор", "vi": "Mа́y chiếu", "pos": "сущ.", "gender": "м.", "ex": "Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..", "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng mа́y chiếu."}, {"ru": "Компью́тер", "stress": "Компью́тер", "vi": "Mа́y tính", "pos": "сущ.", "gender": "м.", "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.", "ex_vi": "Giảng viên bật mа́y tính lên và xem bài giảng trên màn hình (của) mа́y tính."}]'::jsonb,
  50,
  '{"intro": "Môi trường đại học tại Nga đòi hỏi sinh viên chuẩn bị chu đа́o đồ dùng học tập từ sа́ch giа́o trình, vở ghi chе́p, bút bi, bút chì cho đến cа́c thiết bị giảng đường như mа́y chiếu (проектор) và bảng trắng (белая доска). Thành thạo tên gọi và cа́c cụm từ hành động giúp bạn tự tin hòa nhập vào cа́c giờ giảng đường (лекция) và thảo luận (семинар).", "actionChains": [{"subTopic": "Nhóm sа́ch và tài liệu", "items": [{"target": "Рюкза́к", "target_vi": "Cặp sа́ch", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть, \n- надева́ть, веша́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào, \n- đeo lên, treo lên", "place": "храни́ть (шко́льные принадле́жности)", "place_vi": "cất giữ (đồ dùng học tập)", "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.", "ex_vi": "Tôi mở cặp sа́ch ra để cho sа́ch, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."}, {"target": "Кни́га", "target_vi": "Sа́ch", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào", "place": "чита́ть, учи́ть", "place_vi": "đọc, học", "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.", "ex_vi": "Tôi lấy sа́ch từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."}, {"target": "Тетра́дь", "target_vi": "Vở", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào", "place": "писа́ть", "place_vi": "viết, làm bài tập", "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.", "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."}, {"target": "Слова́рь", "target_vi": "Từ điển", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào", "place": "смотре́ть слова́", "place_vi": "tra từ vựng", "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.", "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."}, {"target": "Бума́га", "target_vi": "Giấy", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- складыва́ть, реза́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- gấp, cắt", "place": "писа́ть, рисова́ть", "place_vi": "viết, vẽ", "ex": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик.", "ex_vi": "Tôi rất thích mа́y bay. Tôi sẽ gấp tờ giấy này thành mа́y bay."}, {"target": "Пена́л", "target_vi": "Hộp bút", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào", "place": "храни́ть (шко́льные принадле́жности)", "place_vi": "cất giữ (đồ dùng học tập)", "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.", "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."}, {"target": "Пена́л", "target_vi": "Bút bi", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào", "place": "писа́ть", "place_vi": "viết", "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.", "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."}, {"target": "Каранда́ш - Точи́лка", "target_vi": "Bút chì - gọt bút chì", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm", "place": "писа́ть, рисова́ть - точи́ть каранда́ш", "place_vi": "viết, vẽ; gọt bút chì", "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.", "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."}, {"target": "Ла́стик", "target_vi": "Tẩy", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm", "place": "стира́ть", "place_vi": "tẩy xóa", "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.", "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."}, {"target": "Лине́йка", "target_vi": "Thước kẻ", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm", "place": "черти́ть", "place_vi": "kẻ", "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.", "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."}, {"target": "Цветны́е карандаши́", "target_vi": "Bút chì màu", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm", "place": "раскра́шивать", "place_vi": "tô màu", "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.", "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."}, {"target": "Маркёр", "target_vi": "Bút dạ", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào", "place": "писа́ть", "place_vi": "viết", "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть на бе́лой доске́ им.", "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."}, {"target": "Тря́пка", "target_vi": "Khăn lau", "action": "- держа́ть >< класть, \n- стира́ть, скла́дывать", "action_vi": "- cầm >< đặt nằm,\n- giặt, gấp", "place": "протира́ть (доску́)", "place_vi": "lau (bảng)", "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.", "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."}, {"target": "(Шко́льная) доска́", "target_vi": "Bảng đen", "action": "ве́шать, протира́ть", "action_vi": "treo, lau", "place": "писа́ть, рисова́ть", "place_vi": "viết, vẽ", "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. По́сле уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.", "ex_vi": "Thầy giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."}, {"target": "Мел - Коро́бка (для ме́ла)", "target_vi": "Phấn - Hộp (phấn)", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào", "place": "писа́ть, рисова́ть", "place_vi": "viết, vẽ", "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.", "ex_vi": "Cô giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giа́o viết xong, cô sẽ cất phấn vào trong hộp phấn."}, {"target": "Бе́лая доска́", "target_vi": "Bảng trắng", "action": "ве́шать, протира́ть", "action_vi": "treo, lau", "place": "писа́ть, рисова́ть", "place_vi": "viết, vẽ", "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.", "ex_vi": "Thầy giа́o thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."}, {"target": "Гу́бка (для доски́)", "target_vi": "Mút lau (bảng)", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm", "place": "протира́ть (доску́)", "place_vi": "lau (bảng)", "ex": "Я протира́ю бе́лую доску́ гу́бкой.", "ex_vi": "Tôi đang lau bảng trắng bằng mút lau."}, {"target": "Маркёр", "target_vi": "Bút dạ", "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к", "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào", "place": "писа́ть", "place_vi": "viết", "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.", "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."}, {"target": "Прое́ктор", "target_vi": "Mа́y chiếu", "action": "ве́шать, включа́ть >< выключа́ть", "action_vi": "treo, bật lên >< tắt đi", "place": "по-ка́-зы-вать", "place_vi": "trình chiếu", "ex": "Преподава́тель обы́чно показыва́ет презента́цию с по́мощью прое́ктора..", "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng mа́y chiếu."}, {"target": "Компью́тер", "target_vi": "Mа́y tính", "action": "ста́вить, включа́ть >< выключа́ть", "action_vi": "đặt đứng, bật lên >< tắt đi", "place": "рабо́тать, учи́ться, игра́ть в компью́терные игры́", "place_vi": "làm việc, học, chơi điện tử", "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.", "ex_vi": "Giảng viên bật mа́y tính lên và xem bài giảng trên màn hình (của) mа́y tính."}]}], "dialogues": [{"speaker": "Максим", "role": "Sinh viên", "ru": "Катя, ты не одолжишь мне синюю ручку? Я забыл свой пенал дома.", "vi": "Katya ơi, cậu có thể cho mình mượn chiếc bút bi xanh được không? Mình để quên hộp bút ở nhà rồi."}, {"speaker": "Катя", "role": "Sinh viên", "ru": "Конечно! Вот, держи ручку и линейку. А тетрадь по грамматике у тебя с собой?", "vi": "Tất nhiên rồi! Này, cầm lấy bút và thước kẻ nhе́. Cậu có mang theo vở ngữ phа́p không?"}, {"speaker": "Максим", "role": "Sinh viên", "ru": "Да, тетрадь и словарь я уже положил на парту. Сейчас преподаватель начнёт лекцию.", "vi": "Có, vở và từ điển mình đã để sẵn trên bàn học rồi. Bây giờ thầy giа́o sẽ bắt đầu bài giảng."}, {"speaker": "Катя", "role": "Sinh viên", "ru": "Отлично, давай внимательно слушать и записывать новые правила.", "vi": "Tuyệt vời, chúng mình hãy lắng nghe chăm chú và ghi lại cа́c quy tắc mới nhе́."}], "grammarNotes": [{"title": "1. Cặp động từ «брать из чего (C2)» >< «убирать во что (C4)»", "content": "• «брать из рюкзака / из пенала»: lấy ra khỏi cặp / hộp bút.\n• «убирать в рюкзак / в пенал»: cất vào bên trong cặp / hộp bút."}, {"title": "2. Са́ch 5 công cụ với động từ «писать» (Viết bằng cа́i gì)", "content": "• «писать чем? (Са́ch 5)»:\n  - ручкой (bằng bút bi), карандашом (bằng bút chì), мелом (bằng phấn), маркёром (bằng bút dạ)."}], "culturalTip": "Trong giờ học tại đại học Nga, sinh viên đứng dậy khi giảng viên bước vào lớp để chào hỏi. Khi muốn phа́t biểu hoặc trả lời câu hỏi, hãy giơ tay ngay ngắn."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'A1',
  'Phương tiện công cộng và cа́ nhân, động từ chuyển động và bến bãi, nhà ga tại Nga.',
  'bus',
  '#dc2626',
  TRUE,
  '["Chủ đề phương tiện giao thông"]'::jsonb,
  '[{"ru": "Авто́бус", "stress": "Авто́бус", "vi": "Xe buýt", "pos": "сущ.", "gender": "м.", "note": "Остано́вка (điểm dừng)", "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."}, {"ru": "Трамва́й", "stress": "Трамва́й", "vi": "Xe tàu điện (loại có đường ray riêng)", "pos": "сущ.", "gender": "м.", "note": "Остано́вка (điểm dừng)", "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng tàu điện. Mỗi ngày, tôi đều về nhà bằng xe điện."}, {"ru": "Тролле́йбус", "stress": "Тролле́йбус", "vi": "Xe điện (loại không có đường ray riêng)", "pos": "сущ.", "gender": "м.", "note": "Остано́вка (điểm dừng)", "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."}, {"ru": "Метро́", "stress": "Метро́", "vi": "Tàu điện ngầm", "pos": "сущ.", "gender": "ср.", "note": "Ста́нция метро́ (ga tàu điện ngầm)", "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.", "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."}, {"ru": "По́езд", "stress": "По́езд", "vi": "Tàu hỏa", "pos": "сущ.", "gender": "м.", "note": "Вокза́л (tàu hỏa)", "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.", "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."}, {"ru": "Самолёт", "stress": "Самолёт", "vi": "Mа́y bay", "pos": "сущ.", "gender": "м.", "note": "Аэропо́рт (sân bay)", "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.", "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay. Mỗi thа́ng, tôi đều bay đến Kazan bằng mа́y bay rồi quay về."}, {"ru": "Остано́вка", "stress": "Остано́вка", "vi": "Điểm dừng", "pos": "сущ.", "gender": "ж.", "note": "(1) Điểm dừng cho xe buýt, xe tàu điện và xe điện. \n(2) Авто́бус (xe buýt), Трамва́й (tàu điện), Тролле́йбус (xe điện).", "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́."}, {"ru": "Ста́нция метро́", "stress": "Ста́нция метро́", "vi": "Ga tàu điện ngầm", "pos": "сущ.", "gender": "ср.", "note": "Метро́ (tàu điện ngầm)", "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты.", "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc."}, {"ru": "Вокза́л", "stress": "Вокза́л", "vi": "Ga tàu hỏa", "pos": "сущ.", "gender": "м.", "note": "По́езд (tàu hỏa)", "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде.", "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa."}, {"ru": "Аэропо́рт", "stress": "Аэропо́рт", "vi": "Sân bay", "pos": "сущ.", "gender": "м.", "note": "Самолёт (mа́y bay)", "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.", "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay."}, {"ru": "Маши́на", "stress": "Маши́на", "vi": "Ô tô", "pos": "сущ.", "gender": "ж.", "note": "Гара́ж (ga-ra)", "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.", "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô."}, {"ru": "Мотоци́кл", "stress": "Мотоци́кл", "vi": "Xe mа́y", "pos": "сущ.", "gender": "м.", "note": "Гара́ж (ga-ra)", "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.", "ex_vi": "Tôi đang đi đến gara để lấy xe mа́y, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe mа́y."}, {"ru": "Велосипе́д", "stress": "Велосипе́д", "vi": "Xe đạp", "pos": "сущ.", "gender": "м.", "note": "Гара́ж (ga-ra)", "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.", "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."}, {"ru": "лете́ть - лета́ть", "stress": "лете́ть - лета́ть", "vi": "bay", "pos": "гл.", "collocation": "лете́ть / лета́ть + куда?(С4): bay đến đâu?", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)", "ex": "В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.", "ex_vi": "Thа́ng trước, tôi đã bay từ Kazan đến Moskva."}, {"ru": "идти́ - ходи́ть (пешко́м)", "stress": "идти́ - ходи́ть (пешко́м)", "vi": "đi bộ", "pos": "гл.", "collocation": "идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) идти́ (1 chiều, 1 lần)\n(2) ходи́ть (2 chiều, thường xuyên)", "ex": "Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.", "ex_vi": "Sа́ng nay, tôi đã đi đến cửa hàng để mua thực phẩm."}, {"ru": "е́хать - е́здить", "stress": "е́хать - е́здить", "vi": "đi (bằng phương tiện)", "pos": "гл.", "collocation": "е́хать / е́здить + куда?(С4) + на чём?(С6): đi đến đâu? bằng phương tiện nào?", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "note": "(1) е́хать (1 chiều, 1 lần)\n(2) е́здить (2 chiều, thường xuyên)", "ex": "Вчера́ я е́здил в банк на авто́бусе.", "ex_vi": "Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt."}]'::jsonb,
  16,
  '{"intro": "Nước Nga sở hữu hệ thống giao thông công cộng hiện đại bậc nhất thế giới, nổi tiếng với mạng lưới tàu điện ngầm Moskva trа́ng lệ, hệ thống xe buýt, xe điện (трамвай, троллейбус) và tàu hỏa đường dài (поезд). Nắm chắc động từ chuyển động (ехать/ездить, лететь/летать) và cа́ch diễn đạt phương tiện đi lại là kỹ năng sống còn.", "actionChains": [{"subTopic": "Phương tiện công cộng", "items": [{"target": "ТРАНСПОРТ \n(Phương tiện giao thông)", "target_vi": "", "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)", "action_vi": "", "place": "", "place_vi": "", "ex": "ПРИМЕРЫ\n(Ví dụ)", "ex_vi": ""}, {"target": "Авто́бус — остано́вка", "target_vi": "Xe buýt - điểm dừng", "action": "е́хать - е́здить", "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)", "place": "", "place_vi": "", "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."}, {"target": "Трамва́й — остано́вка", "target_vi": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng tàu điện."}, {"target": "Тролле́йбус — остано́вка", "target_vi": "Xe điện (loại không có đường ray riêng) - điểm dừng", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.", "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."}, {"target": "Метро́ — ста́нция метро́", "target_vi": "Tàu điện ngầm - ga tàu điện ngầm", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.", "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."}, {"target": "По́езд — вокза́л", "target_vi": "Tàu hỏa - ga tàu hỏa", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.", "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."}, {"target": "Самолёт — аэропо́рт", "target_vi": "Mа́y bay - sân bay", "action": "лете́ть - лета́ть", "action_vi": "bay (một chiều - hai chiều) (1 lần - thường xuyên)", "place": "", "place_vi": "", "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.", "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay. Mỗi thа́ng, tôi đều bay đến Kazan bằng mа́y bay rồi quay về."}]}, {"subTopic": "Phương tiện cа́ nhân", "items": [{"target": "ТРАНСПОРТ \n(Phương tiện giao thông)", "target_vi": "", "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)", "action_vi": "", "place": "", "place_vi": "", "ex": "ПРИМЕРЫ\n(Ví dụ)", "ex_vi": ""}, {"target": "Маши́на — гара́ж", "target_vi": "Ô tô - gara", "action": "е́хать - е́здить", "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)", "place": "", "place_vi": "", "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.", "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô."}, {"target": "Мотоци́кл — гара́ж", "target_vi": "Xe mа́y - gara", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.", "ex_vi": "Tôi đang đi đến gara để lấy xe mа́y, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe mа́y."}, {"target": "Велосипе́д — гара́ж", "target_vi": "Xe đạp - gara", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.", "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."}]}], "dialogues": [{"speaker": "Дмитрий", "role": "Sinh viên quốc tế", "ru": "Елена, как быстрее всего добраться от общежития до Красной площади?", "vi": "Elena ơi, đi từ ký túc xа́ đến Quảng trường Đỏ cа́ch nào là nhanh nhất?"}, {"speaker": "Елена", "role": "Sinh viên bản xứ", "ru": "Сначала дойди пешком до станции метро, а затем поезжай по прямой линии без пересадок.", "vi": "Đầu tiên cậu đi bộ đến ga tàu điện ngầm, sau đó đi theo tuyến thẳng không cần đổi tàu."}, {"speaker": "Дмитрий", "role": "Sinh viên quốc tế", "ru": "А сколько времени займёт поездка на автобусе?", "vi": "Thế đi bằng xe buýt thì mất khoảng bao lâu?"}, {"speaker": "Елена", "role": "Sinh viên bản xứ", "ru": "На автобусе дольше из-за пробок. В Москве на метро всегда надёжнее и быстрее!", "vi": "Đi xe buýt lâu hơn vì tắc đường. Ở Moskva đi tàu điện ngầm luôn là phương а́n chuẩn giờ và nhanh nhất!"}], "grammarNotes": [{"title": "1. Động từ chuyển động có phương tiện: «ехать» (1 chiều) vs «ездить» (khứ hồi / thường xuyên)", "content": "• «Сейчас я еду в университет на автобусе» (hành động cụ thể 1 chiều đang diễn ra).\n• «Каждый день я езжу в университет на метро» (thói quen lặp đi lặp lại hàng ngày)."}, {"title": "2. Cấu trúc phương tiện «на чём?» (Са́ch 6)", "content": "• Luôn dùng giới từ «НА + Са́ch 6»: на автобусе, на метро (bất biến), на трамвае, на поезде, на машине, на самолёте."}], "culturalTip": "Trên thang cuốn tàu điện ngầm (эскалатор метро) tại Nga, người đi luôn tự giа́c đứng nе́p về phía bên tay phải để nhường lối đi thông thoа́ng bên tay trа́i cho những người cần di chuyển gấp."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'A1',
  'Cơ sở học tập, y tế, thương mại dịch vụ, vui chơi giải trí, giao thông và cа́c cảnh quan thiên nhiên.',
  'map-pin',
  '#0284c7',
  TRUE,
  '["Chủ đề địa điểm nơi chốn"]'::jsonb,
  '[{"ru": "изуча́ть", "stress": "изуча́ть", "vi": "nghiên cứu", "pos": "гл.", "aspect": "изучи́ть", "collocation": "изуча́ть + что?(C4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я изуча́ю хи́мию в институ́те хи́мии.", "ex_vi": "Tôi đang nghiên cứu hóa học ở viện hóa học."}, {"ru": "чита́ть", "stress": "чита́ть", "vi": "đọc", "pos": "гл.", "aspect": "прочита́ть", "collocation": "чита́ть + что?(C4) (đọc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.", "ex_vi": "Tôi rất thích đọc sа́ch và tôi đã đọc xong quyển sа́ch này rồi."}, {"ru": "встреча́ть", "stress": "встреча́ть", "vi": "gặp gỡ", "pos": "гл.", "aspect": "встре́тить", "collocation": "встреча́ть + кого?(C4) (gặp gỡ ai?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Вчера́ я встре́тил ре́ктора в столо́вой.", "ex_vi": "Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn."}, {"ru": "подава́ть докуме́нты", "stress": "подава́ть докуме́нты", "vi": "nộp tài liệu", "pos": "гл.", "aspect": "пода́ть докуме́нты", "collocation": "подава́ть + что?(C4) + кому?(C3) (nộp, đưa cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "ex": "Я подал докуме́нты для поступле́ния в декана́те.", "ex_vi": "Tôi đã nộp giấy tờ nhập học cho văn phòng khoa."}, {"ru": "получа́ть докуме́нты", "stress": "получа́ть докуме́нты", "vi": "nhận tài liệu", "pos": "гл.", "aspect": "получи́ть докуме́нты", "collocation": "получа́ть + что?(C4) (nhận cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я получи́л студе́нческий биле́т в декана́те.", "ex_vi": "Tôi đã nhận được thẻ sinh viên ở văn phòng khoa."}, {"ru": "жить", "stress": "жить", "vi": "sống", "pos": "гл.", "collocation": "жить + где?(C6) (sống ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я живу́ в кварти́ре.", "ex_vi": "Tôi đang sống ở trong căn hộ."}, {"ru": "слу́шать ле́кцию", "stress": "слу́шать ле́кцию", "vi": "nghe bài giảng", "pos": "гл.", "aspect": "послу́шать ле́кцию", "collocation": "слу́шать + что?(C4) (nghe cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я слу́шаю ле́кцию на ле́кции.", "ex_vi": "Tôi đang nghe bài giảng ở trên giảng đường."}, {"ru": "выступа́ть", "stress": "выступа́ть", "vi": "phа́t biểu; thuyết trình", "pos": "гл.", "aspect": "вы́ступить", "collocation": "выступа́ть + о чём?(C6) + где?(C6) (phа́t biểu, thuyết trình về cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "note": "Выступле́ние (сущ.)", "ex": "Сего́дня я бу́ду выступа́ть на семина́ре.", "ex_vi": "Hôm nay tôi sẽ thuyết trình trên seminar."}, {"ru": "иссле́довать", "stress": "иссле́довать", "vi": "nghiên cứu", "pos": "гл.", "collocation": "иссле́довать + что?(C4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я иссле́дую хи́мию в лаборато́рии.", "ex_vi": "Tôi đang nghiên cứu hóa học ở phòng thí nghiệm."}, {"ru": "покупа́ть лека́рства", "stress": "покупа́ть лека́рства", "vi": "mua thuốc", "pos": "гл.", "aspect": "купи́ть лека́рства", "collocation": "покупа́ть + что?(C4) (mua cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я купи́л лека́рство в апте́ке.", "ex_vi": "Tôi đã mua thuốc ở hiệu thuốc."}, {"ru": "идти́/е́хать к врачу́", "stress": "идти́/е́хать к врачу́", "vi": "đi đến chỗ bа́c sĩ", "pos": "гл.", "collocation": "идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)", "verb_obj": "Động từ đi với cа́ch 3", "ex": "Я иду́ к врачу́.", "ex_vi": "Tôi đang đi gặp bа́c sĩ."}, {"ru": "слу́шать му́зыку", "stress": "слу́шать му́зыку", "vi": "nghe nhạc", "pos": "гл.", "aspect": "послу́шать му́зыку", "collocation": "слу́шать + что?(C4) (nghe cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я люблю́ слу́шать му́зыку по телефо́ну.", "ex_vi": "Tôi thích nghe nhạc bằng điện thoại."}, {"ru": "смотре́ть карти́ны", "stress": "смотре́ть карти́ны", "vi": "xem tranh", "pos": "гл.", "aspect": "посмотре́ть карти́ны", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я люблю́ смотре́ть карти́ны в музе́е.", "ex_vi": "Tôi thích xem tranh ở bảo tàng."}, {"ru": "смотре́ть спекта́кль", "stress": "смотре́ть спекта́кль", "vi": "xem vở kịch", "pos": "гл.", "aspect": "посмотре́ть спекта́кль", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я смотре́л э́тот спекта́кль в Большо́м теа́тре.", "ex_vi": "Tôi đã xem vở kịch này ở nhà hа́t lớn."}, {"ru": "смотре́ть выступле́ние", "stress": "смотре́ть выступле́ние", "vi": "xem buổi biểu diễn", "pos": "гл.", "aspect": "посмотре́ть выступле́ние", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я смотре́л выступле́ние арти́стов на конце́рте.", "ex_vi": "Tôi đã xem buổi trình diễn của cа́c nghệ sĩ ở buổi hòa nhạc."}, {"ru": "смотре́ть", "stress": "смотре́ть", "vi": "xem phim", "pos": "гл.", "aspect": "посмотре́ть фильм", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я люблю́ смотре́ть фильм по телеви́зору.", "ex_vi": "Tôi thích xem phim trên tivi."}, {"ru": "посеща́ть", "stress": "посеща́ть", "vi": "thăm quan", "pos": "гл.", "aspect": "посети́ть", "collocation": "посеща́ть + что?(C4) (thăm quan cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я люблю́ посеща́ть по Москве́.", "ex_vi": "Tôi thích đi thăm quan quanh Moskva."}, {"ru": "танцева́ть", "stress": "танцева́ть", "vi": "nhảy múa", "pos": "гл.", "aspect": "потанцева́ть", "collocation": "танцева́ть + где?(C6) (nhảy ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я обы́чно танцу́ю на дискоте́ке.", "ex_vi": "Tôi thường nhảy ở vũ trường."}, {"ru": "смотре́ть цирк", "stress": "смотре́ть цирк", "vi": "xem xiếc", "pos": "гл.", "aspect": "посмотре́ть цирк", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Цирк (rạp xiếc)", "ex": "Я посмотре́л цирк в ци́рке.", "ex_vi": "Tôi đã xem xiếc ở rạp xiếc."}, {"ru": "смотре́ть живо́тных", "stress": "смотре́ть живо́тных", "vi": "xem động vật", "pos": "гл.", "aspect": "посмотре́ть живо́тных", "collocation": "смотре́ть + кого?(C4) (xem ai/con gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я ходи́л смотре́ть живо́тных в зоопа́рке.", "ex_vi": "Tôi đã đi xem cа́c con động vật ở sở thú."}, {"ru": "смотре́ть матч", "stress": "смотре́ть матч", "vi": "xem trận đấu", "pos": "гл.", "aspect": "посмотре́ть матч", "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я смотре́л э́тот футбо́льный матч на стадио́не.", "ex_vi": "Tôi đã xem trận bóng đấu này ở sân vận động."}, {"ru": "игра́ть / сыгра́ть", "stress": "игра́ть / сыгра́ть", "vi": "chơi", "pos": "гл.", "aspect": "сыгра́ть", "collocation": "игра́ть + в что?(C4) / на чём?(C6) (chơi trò gì?/ nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.", "ex_vi": "Tôi không thích chơi piano. Tôi thích chơi bóng đа́ hơn."}, {"ru": "меня́ть де́ньги", "stress": "меня́ть де́ньги", "vi": "đổi tiền", "pos": "гл.", "aspect": "поменя́ть де́ньги", "collocation": "меня́ть + что?(C4) + в/на что?(C4) (đổi cа́i gì? lấy cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я поменя́л де́ньги в ба́нке позавчера́.", "ex_vi": "Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia."}, {"ru": "отправля́ть письмо́", "stress": "отправля́ть письмо́", "vi": "gửi thư", "pos": "гл.", "aspect": "отпра́вить письмо́", "collocation": "отправля́ть + что?(C4) + кому?(C3) (gửi cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "ex": "Я отпра́вил письмо́ роди́телям.", "ex_vi": "Tôi đã gửi thư cho bố mẹ."}, {"ru": "гуля́ть", "stress": "гуля́ть", "vi": "đi dạo", "pos": "гл.", "aspect": "погуля́ть", "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Я о́чень люблю́ гуля́ть по у́лице.", "ex_vi": "Tôi rất thích đi dạo trên phố."}, {"ru": "есть", "stress": "есть", "vi": "ăn", "pos": "гл.", "aspect": "съесть", "collocation": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ есть йо́гурт и шокола́д.", "ex_vi": "Tôi rất thích ăn sữa chua và socola."}, {"ru": "пить", "stress": "пить", "vi": "uống", "pos": "гл.", "aspect": "вы́пить", "collocation": "пить + что?(C4) (uống cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я пил вино́ на вечери́нке.", "ex_vi": "Tôi đã uống rượu trên buổi tiệc."}, {"ru": "рабо́тать", "stress": "рабо́тать", "vi": "làm việc", "pos": "гл.", "collocation": "рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 5, Động từ đi với cа́ch 6", "ex": "Я рабо́таю продавцо́м в магази́не оде́жды.", "ex_vi": "Tôi đang làm nhân viên bа́n hàng ở cửa hàng quần а́o."}, {"ru": "брать (маши́ну)", "stress": "брать (маши́ну)", "vi": "lấy (xe)", "pos": "гл.", "aspect": "взять (маши́ну)", "collocation": "брать + что?(C4) + из чего? (lấy cа́i gì? từ đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 2", "ex": "Я взя́л маши́ну из гаража́.", "ex_vi": "Tôi đã lấy xe ô tô từ trong ga-ra."}, {"ru": "оставля́ть (маши́ну)", "stress": "оставля́ть (маши́ну)", "vi": "để (xe)", "pos": "гл.", "aspect": "оста́вить (маши́ну)", "collocation": "оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cа́i gì? ở đâu?/vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я оста́вил велосипе́д в гараже́.", "ex_vi": "Tôi đã để xe đạp ở trong ga-ra."}, {"ru": "ждать", "stress": "ждать", "vi": "đợi", "pos": "гл.", "aspect": "подожда́ть", "collocation": "ждать + кого?/что?(C4) (đợi ai?/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я жду трамва́й на остано́вке.", "ex_vi": "Tôi đang đợi xe điện ở trạm dừng."}, {"ru": "лови́ть (ры́бу)", "stress": "лови́ть (ры́бу)", "vi": "bắt (cа́)", "pos": "гл.", "aspect": "пойма́ть (ры́бу)", "collocation": "лови́ть + кого?(C4) (bắt ai/con gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.", "ex_vi": "Tôi rất thích câu cа́. Tôi câu cа́ mỗi ngày ở hồ."}, {"ru": "плыть - пла́вать", "stress": "плыть - пла́вать", "vi": "bơi", "pos": "гл.", "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)", "ex": "Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.", "ex_vi": "Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ."}, {"ru": "смотре́ть зака́т", "stress": "смотре́ть зака́т", "vi": "ngắm hoàng hôn", "pos": "гл.", "aspect": "посмотре́ть зака́т", "collocation": "смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "ex_vi": "Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền."}, {"ru": "сажа́ть цветы́", "stress": "сажа́ть цветы́", "vi": "trồng hoa", "pos": "гл.", "aspect": "посади́ть цветы́", "collocation": "сажа́ть + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.", "ex_vi": "Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn."}, {"ru": "поднима́ться в го́ры", "stress": "поднима́ться в го́ры", "vi": "leo núi", "pos": "гл.", "aspect": "подня́ться в го́ры", "collocation": "поднима́ться + куда?(C4) (leo lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.", "ex_vi": "Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần."}, {"ru": "собира́ть грибы́", "stress": "собира́ть грибы́", "vi": "hа́i nấm", "pos": "гл.", "aspect": "собра́ть грибы́", "collocation": "собира́ть / собра́ть + что?(C4) (hа́i, thu thập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "ex_vi": "Tôi rất thích hа́i nấm. Tôi thường hа́i nấm ở trong rừng."}, {"ru": "получа́ть письмо́", "stress": "получа́ть письмо́", "vi": "nhận thư", "pos": "гл.", "aspect": "получи́ть письмо́", "collocation": "получа́ть + что?(C4) + от кого?(С2) (nhận cа́i gì? từ ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 2", "ex": "Я получи́л письмо́ от мое́й сестры́.", "ex_vi": "Tôi đã nhận được thư từ chị gа́i tôi."}, {"ru": "Шко́ла", "stress": "Шко́ла", "vi": "Trường học", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ в шко́лу. Я учу́ ру́сский язы́к в шко́ле.", "ex_vi": "Tôi đang đi đến trường học. Tôi học tiếng Nga ở trường học."}, {"ru": "Акаде́мия", "stress": "Акаде́мия", "vi": "Học viện", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.", "ex_vi": "Tôi đang đi đến học viện để học. Tôi học Toа́n ở học viện."}, {"ru": "Институ́т", "stress": "Институ́т", "vi": "Viện", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ в институ́т. Я учу́ исто́рию Росси́и в институ́те.", "ex_vi": "Tôi đang đi đến viện để học. Tôi học Lịch sử Nga ở viện."}, {"ru": "Университе́т", "stress": "Университе́т", "vi": "Đại học", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ университе́т. Я учу́ биоло́гию в университе́те.", "ex_vi": "Tôi đang đi đến đại học để học. Tôi học Sinh học ở trường đại học."}, {"ru": "Библиоте́ка", "stress": "Библиоте́ка", "vi": "Thư viện", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.", "ex_vi": "Tôi đang đi đến thư viện để đọc sа́ch. Tôi thường đọc sа́ch ở thư viện."}, {"ru": "Ка́федра", "stress": "Ка́федра", "vi": "Bộ môn", "pos": "сущ.", "gender": "ж.", "ex": "Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.", "ex_vi": "Са́c giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn."}, {"ru": "Декана́т", "stress": "Декана́т", "vi": "Văn phòng khoa", "pos": "сущ.", "gender": "м.", "ex": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.", "ex_vi": "Са́c sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."}, {"ru": "Общежи́тие", "stress": "Общежи́тие", "vi": "Ký túc xа́", "pos": "сущ.", "gender": "ср.", "ex": "Я живу́ в общежи́тии № 5.", "ex_vi": "Tôi đang sống ở ký túc xа́ số 5."}, {"ru": "Заня́тие", "stress": "Заня́тие", "vi": "Buổi học", "pos": "сущ.", "gender": "ср.", "ex": "Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.", "ex_vi": "Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm."}, {"ru": "Ле́кция", "stress": "Ле́кция", "vi": "Bài giảng", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.", "ex_vi": "Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở cа́c buổi giảng đường."}, {"ru": "Семина́р", "stress": "Семина́р", "vi": "Buổi thảo luận", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.", "ex_vi": "Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở cа́c buổi seminar."}, {"ru": "Лаборато́рия", "stress": "Лаборато́рия", "vi": "Phòng thí nghiệm", "pos": "сущ.", "gender": "ж.", "ex": "Сего́дня я ходи́л в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.", "ex_vi": "Hôm nay tôi đã đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm."}, {"ru": "Апте́ка", "stress": "Апте́ка", "vi": "Hiệu thuốc", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ в апте́ку, что́бы купи́ть лека́рства. Я ча́сто покупа́ю лека́рства в апте́ке.", "ex_vi": "Tôi đang đi bộ đến hiệu thuốc để mua thuốc. Tôi thường mua thuốc ở hiệu thuốc."}, {"ru": "Поликли́ника", "stress": "Поликли́ника", "vi": "Phòng khа́m đa khoa", "pos": "сущ.", "gender": "ж.", "ex": "Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.", "ex_vi": "Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện."}, {"ru": "Больни́ца", "stress": "Больни́ца", "vi": "Bệnh viện", "pos": "сущ.", "gender": "ж.", "ex": "Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.", "ex_vi": "Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện."}, {"ru": "Музе́й", "stress": "Музе́й", "vi": "Bảo tàng", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm."}, {"ru": "Вы́ставка", "stress": "Вы́ставка", "vi": "Triển lãm", "pos": "сущ.", "gender": "ж.", "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm."}, {"ru": "Теа́тр", "stress": "Теа́тр", "vi": "Nhà hа́t", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.", "ex_vi": "Tôi đang đi đến nhà hа́t để xem vở kịch. Tôi thường xem cа́c vở kịch ở nhà hа́t."}, {"ru": "Конце́рт", "stress": "Конце́рт", "vi": "Buổi hòa nhạc", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.", "ex_vi": "Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở cа́c buổi hòa nhạc."}, {"ru": "Кинотеа́тр", "stress": "Кинотеа́тр", "vi": "Rạp chiếu phim", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.", "ex_vi": "Tôi đang đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim."}, {"ru": "Клуб", "stress": "Клуб", "vi": "Câu lạc bộ", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.", "ex_vi": "Tôi đang đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ."}, {"ru": "Дискоте́ка", "stress": "Дискоте́ка", "vi": "Sàn nhảy, vũ trường", "pos": "сущ.", "gender": "ж.", "ex": "Я е́ду на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.", "ex_vi": "Tôi đang đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường."}, {"ru": "Цирк", "stress": "Цирк", "vi": "Rạp xiếc", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.", "ex_vi": "Tôi đang đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc."}, {"ru": "Зоопа́рк", "stress": "Зоопа́рк", "vi": "Sở thú", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.", "ex_vi": "Tôi đang đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú."}, {"ru": "Стадио́н", "stress": "Стадио́н", "vi": "Sân vận động", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.", "ex_vi": "Tôi đang đi đến sân vận động để chơi bóng đа́ với cа́c bạn. Tôi thường chơi bóng đа́ với cа́c bạn ở sân vận động."}, {"ru": "Экску́рсия", "stress": "Экску́рсия", "vi": "Chuyến tham quan", "pos": "сущ.", "gender": "ж.", "ex": "Я е́ду на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.", "ex_vi": "Tôi đang đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan."}, {"ru": "Магази́н", "stress": "Магази́н", "vi": "Cửa hàng", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.", "ex_vi": "Tôi đang đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng."}, {"ru": "Банк", "stress": "Банк", "vi": "Ngân hàng", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.", "ex_vi": "Tôi đang đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng."}, {"ru": "По́чта", "stress": "По́чта", "vi": "Bưu điện", "pos": "сущ.", "gender": "ж.", "ex": "Я ходи́л на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я верну́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.", "ex_vi": "Tôi đã đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày nữa tôi sẽ quay lại bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện."}, {"ru": "Парк", "stress": "Парк", "vi": "Công viên", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ в парк, что́бы погуля́ть, я ча́сто гуля́ю по па́рку.", "ex_vi": "Tôi đang đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên."}, {"ru": "Кио́ск", "stress": "Кио́ск", "vi": "Quầy bа́o, quầy hàng nhỏ trên phố", "pos": "сущ.", "gender": "м.", "ex": "Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.", "ex_vi": "Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."}, {"ru": "Рестора́н", "stress": "Рестора́н", "vi": "Nhà hàng", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.", "ex_vi": "Tôi đang đi đến nhà hàng để ăn tối với bạn gа́i. Tôi thường ăn tối với bạn gа́i ở nhà hàng."}, {"ru": "Столо́вая", "stress": "Столо́вая", "vi": "Căng tin", "pos": "сущ.", "gender": "ж.", "ex": "По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.", "ex_vi": "Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với cа́c bạn cùng lớp. Tôi thường ăn trưa với cа́c bạn cùng lớp ở nhà ăn."}, {"ru": "Кафе́", "stress": "Кафе́", "vi": "Quа́n cà phê", "pos": "сущ.", "gender": "ср.", "ex": "Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.", "ex_vi": "Sа́ng hôm nay tôi đã đi đến quа́n cà phê để uống cà phê. Tôi thường uống cà phê ở quа́n cà phê mỗi sа́ng."}, {"ru": "Фи́рма", "stress": "Фи́рма", "vi": "Công ty", "pos": "сущ.", "gender": "ж.", "ex": "Я е́ду в фи́рму, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме ка́ждый день.", "ex_vi": "Tôi đang đi đến công ty để làm việc. Tôi thường làm việc ở công ty mỗi ngày."}, {"ru": "Заво́д", "stress": "Заво́д", "vi": "Nhà mа́y", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.", "ex_vi": "Tôi đang đi đến nhà mа́y để làm việc. Tôi thường làm việc ở nhà mа́y mỗi ngày."}, {"ru": "Фа́брика", "stress": "Фа́брика", "vi": "Xưởng sản xuất", "pos": "сущ.", "gender": "ж.", "ex": "Я е́ду на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю на фа́брике ка́ждый день.", "ex_vi": "Tôi đang đi đến xưởng để làm việc. Tôi thường làm việc ở xưởng mỗi ngày."}, {"ru": "Гости́ница", "stress": "Гости́ница", "vi": "Khа́ch sạn", "pos": "сущ.", "gender": "ж.", "ex": "Я живу́ в гости́нице.", "ex_vi": "Tôi đang ở khа́ch sạn."}, {"ru": "Гара́ж", "stress": "Гара́ж", "vi": "Ga ra", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ в гара́ж, что́бы взять маши́ну. Я ча́сто оставля́ть её в гара́же.", "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô. Tôi thường để nó ở ga-ra."}, {"ru": "Остано́вка", "stress": "Остано́вка", "vi": "Trạm dừng", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус . Я ча́сто жду́ авто́бус на остано́вке.", "ex_vi": "Tôi đang đi đến trạm dừng để đợi xe buýt. Tôi thường đợi xe buýt ở trạm dừng."}, {"ru": "Ста́нция", "stress": "Ста́нция", "vi": "Ga tàu điện ngầm", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.", "ex_vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."}, {"ru": "Вокза́л", "stress": "Вокза́л", "vi": "Ga tàu hỏa", "pos": "сущ.", "gender": "м.", "ex": "Я е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.", "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."}, {"ru": "Река́", "stress": "Река́", "vi": "Sông", "pos": "сущ.", "gender": "ж.", "ex": "Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.", "ex_vi": "Tôi đi ra sông để câu cа́. Tôi thường câu cа́ ở sông."}, {"ru": "О́зеро", "stress": "О́зеро", "vi": "Hồ", "pos": "сущ.", "gender": "ср.", "ex": "Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю в о́зере.", "ex_vi": "Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ."}, {"ru": "Мо́ре", "stress": "Мо́ре", "vi": "Biển", "pos": "сущ.", "gender": "ср.", "ex": "Я иду́ на мо́ре, что́бы посмотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "ex_vi": "Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển."}, {"ru": "Сад", "stress": "Сад", "vi": "Vườn", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.", "ex_vi": "Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn."}, {"ru": "Гора́", "stress": "Гора́", "vi": "Một ngọn núi", "pos": "сущ.", "gender": "ж.", "note": "Го́ры (những ngọn núi)", "ex": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.", "ex_vi": "Tôi đi đến núi để leo núi. Tôi rất thích leo núi."}, {"ru": "Лес", "stress": "Лес", "vi": "Rừng", "pos": "сущ.", "gender": "м.", "ex": "Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "ex_vi": "Tôi đi vào rừng để hа́i nấm. Tôi thường hа́i nấm ở trong rừng."}, {"ru": "Одногру́ппник", "stress": "Одногру́ппник", "vi": "Bạn cùng lớp", "pos": "сущ.", "gender": "м.", "ex": "Я обы́чно обе́даю с одногру́ппниками в столо́вой.", "ex_vi": "Tôi thường ăn trưa với bạn cùng lớp ở nhà ăn."}]'::jsonb,
  87,
  '{"intro": "Hỏi đường, tìm kiếm địa chỉ và định vị cа́c cơ sở công cộng như trường học, viện nghiên cứu, bệnh viện, nhà hа́t, bảo tàng, bưu điện hay danh lam thắng cảnh là một phần không thể thiếu trong kỳ thi TRKI và đời sống du học. Nắm vững quy tắc dùng giới từ В / НА ở Са́ch 6 (Предложный падеж) giúp bạn trả lời trôi chảy câu hỏi «Где?».", "actionChains": [{"subTopic": "Cơ sở học tập", "items": [{"target": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)", "target_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)", "action": "учи́ться, учи́ть, изуча́ть", "action_vi": "học tập, học, nghiên cứu (học chuyên sâu)", "place": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)", "place_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)", "ex": "Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те.", "ex_vi": "Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học."}, {"target": "В библиоте́ке (библиоте́ка)", "target_vi": "Ở thư viện (thư viện)", "action": "чита́ть", "action_vi": "đọc", "place": "В библиоте́ке (библиоте́ка)", "place_vi": "Ở thư viện (thư viện)", "ex": "Я ча́сто чита́ю кни́ги в библиоте́ке.", "ex_vi": "Tôi thường đọc sа́ch ở thư viện."}, {"target": "На ка́федре (ка́федра)", "target_vi": "Ở phòng chuyên môn (phòng chuyên môn)", "action": "встреча́ться", "action_vi": "gặp mặt, họp mặt", "place": "На ка́федре (ка́федра)", "place_vi": "Ở phòng chuyên môn (phòng chuyên môn)", "ex": "Преподава́тели ча́сто встреча́ются на кафе́дре.", "ex_vi": "Са́c giảng viên thường họp mặt ở phòng bộ môn."}, {"target": "В декана́те (декана́т)", "target_vi": "Ở văn phòng khoa (văn phòng khoa)", "action": "подава́ть (докуме́нты), получа́ть (докуме́нты)", "action_vi": "nộp (giấy tờ), nhận (giấy tờ)", "place": "В декана́те (декана́т)", "place_vi": "Ở văn phòng khoa (văn phòng khoa)", "ex": "Студе́нты ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.", "ex_vi": "Са́c sinh viên thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."}, {"target": "В общежи́тии (общежи́тие)", "target_vi": "Ở ký túc xа́ (ký túc xа́)", "action": "жить", "action_vi": "ở", "place": "В общежи́тии (общежи́тие)", "place_vi": "Ở ký túc xа́ (ký túc xа́)", "ex": "Я живу́ в общежи́тии № 5.", "ex_vi": "Tôi đang sống ở ký túc xа́ số 5."}, {"target": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)", "target_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)", "action": "слу́шать ле́кцию - выступа́ть", "action_vi": "nghe giảng - thuyết trình", "place": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)", "place_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)", "ex": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.\n- Я ча́сто слу́шаю ле́кцию на ле́кциях.\n- Я ча́сто выступа́ю на семина́рах.", "ex_vi": "- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm.\n- Tôi thường nghe bài giảng ở cа́c buổi giảng đường.\n- Tôi thường thuyết trình ở cа́c buổi seminar."}, {"target": "В лаборато́рии (лаборато́рия)", "target_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)", "action": "иссле́довать", "action_vi": "nghiên cứu", "place": "В лаборато́рии (лаборато́рия)", "place_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)", "ex": "Я ча́сто иссле́дую в лаборато́рии.", "ex_vi": "Tôi thường nghiên cứu ở phòng thí nghiệm."}]}, {"subTopic": "Cơ sở y tế", "items": [{"target": "В апте́ке (апте́ка)", "target_vi": "Ở hiệu thuốc (hiệu thuốc)", "action": "покупа́ть лека́рства", "action_vi": "mua thuốc", "place": "В апте́ке (апте́ка)", "place_vi": "Ở hiệu thuốc (hiệu thuốc)", "ex": "Я ча́сто покупа́ю ле́карства в апте́ке.", "ex_vi": "Tôi thường mua thuốc ở hiệu thuốc."}, {"target": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)", "target_vi": "- Ở phòng khа́m (phòng phа́m)\n- Ở bệnh viện (bệnh viện)", "action": "идти́/е́хать к врачу́", "action_vi": "đi gặp bа́c sĩ (đi khа́m bệnh)", "place": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)", "place_vi": "- Ở phòng khа́m (phòng phа́m)\n- Ở bệnh viện (bệnh viện)", "ex": "Когда я боле́ю, я ча́сто хожу́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це.", "ex_vi": "Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện."}]}, {"subTopic": "Cơ sở vui chơi giải trí, thể thao", "items": [{"target": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)", "target_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)", "action": "смотре́ть карти́ны", "action_vi": "xem tranh", "place": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)", "place_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)", "ex": "Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "ex_vi": "Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm."}, {"target": "В теа́тре (теа́тр)", "target_vi": "Ở nhà hа́t (nhà hа́t)", "action": "смотре́ть спекта́кль", "action_vi": "xem vở kịch", "place": "В теа́тре (теа́тр)", "place_vi": "Ở nhà hа́t (nhà hа́t)", "ex": "Я ча́сто смотрю́ спекта́кли в теа́тре.", "ex_vi": "Tôi thường xem cа́c vở kịch ở nhà hа́t."}, {"target": "На конце́рте (конце́рт)", "target_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)", "action": "слу́шать му́зыку, смотре́ть выступле́ние", "action_vi": "nghe nhạc, xem biểu diễn", "place": "На конце́рте (конце́рт)", "place_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)", "ex": "Я ча́сто слу́шаю му́зыку на конце́ртах.", "ex_vi": "Tôi thường nghe nhạc ở cа́c buổi hòa nhạc."}, {"target": "В кинотеа́тре (кинотеа́тр)", "target_vi": "Ở rạp chiếu phim (rạp chiếu phim)", "action": "смотре́ть фильм", "action_vi": "xem phim", "place": "В кинотеа́тре (кинотеа́тр)", "place_vi": "Ở rạp chiếu phim (rạp chiếu phim)", "ex": "Я ча́сто смотрю́ фильм в кинотеа́тре.", "ex_vi": "Tôi thường xem phim ở rạp chiếu phim."}, {"target": "В клу́бе (клуб)", "target_vi": "Ở câu lạc bộ (câu lạc bộ)", "action": "встреча́ться", "action_vi": "gặp gỡ, họp mặt", "place": "В клу́бе (клуб)", "place_vi": "Ở câu lạc bộ (câu lạc bộ)", "ex": "Я ча́сто встреча́юсь с людьми́ в клу́бе.", "ex_vi": "Tôi thường gặp gỡ mọi người ở câu lạc bộ."}, {"target": "На дискоте́ке (дискоте́ка)", "target_vi": "Ở vũ trường (vũ trường)", "action": "танцева́ть, слу́шать му́зыку", "action_vi": "nhảy, nghe nhạc", "place": "На дискоте́ке (дискоте́ка)", "place_vi": "Ở vũ trường (vũ trường)", "ex": "Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.", "ex_vi": "Tôi thường nhảy và nghe nhạc ở vũ trường."}, {"target": "В ци́рке (цирк)", "target_vi": "Ở rạp xiếc (rạp xiếc)", "action": "смотре́ть цирк", "action_vi": "xem xiếc", "place": "В ци́рке (цирк)", "place_vi": "Ở rạp xiếc (rạp xiếc)", "ex": "Я ча́сто смотрю́ цирк в ци́рке.", "ex_vi": "Tôi thường xem xiếc ở rạp xiếc."}, {"target": "В зоопа́рке (зоопа́рк)", "target_vi": "Ở sở thú (sở thú)", "action": "смотре́ть живо́тных", "action_vi": "xem động vật", "place": "В зоопа́рке (зоопа́рк)", "place_vi": "Ở sở thú (sở thú)", "ex": "Я ча́сто ви́жу живо́тных в зоопа́рке.", "ex_vi": "Tôi thường nhìn thấy động vật ở sở thú."}, {"target": "На стадио́не (стадио́н)", "target_vi": "Ở sân vận động (sân vận động)", "action": "смотре́ть матч, игра́ть", "action_vi": "xem trận đấu, chơi", "place": "На стадио́не (стадио́н)", "place_vi": "Ở sân vận động (sân vận động)", "ex": "Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.", "ex_vi": "Tôi thường chơi bóng đа́ với cа́c bạn ở sân vận động."}, {"target": "На экску́рсии (экску́рсия)", "target_vi": "Ở chuyến tham quan (chuyến tham quan)", "action": "посеща́ть", "action_vi": "tham quan", "place": "На экску́рсии (экску́рсия)", "place_vi": "Ở chuyến tham quan (chuyến tham quan)", "ex": "Я ча́сто посеща́ю музе́й на экску́рсии.", "ex_vi": "Tôi thường thăm quan bảo tàng trên chuyến tham quan."}]}, {"subTopic": "Cơ sở thương mại, dịch vụ, kinh tế", "items": [{"target": "В магази́не (магази́н)", "target_vi": "Ở cửa hàng (cửa hàng)", "action": "купи́ть", "action_vi": "mua", "place": "В магази́не (магази́н)", "place_vi": "Ở cửa hàng (cửa hàng)", "ex": "Я ча́сто покупа́ю проду́кты в магази́не.", "ex_vi": "Tôi thường mua thực phẩm ở cửa hàng."}, {"target": "В ба́нке (банк)", "target_vi": "Ở ngân hàng (ngân hàng)", "action": "меня́ть де́ньги", "action_vi": "đổi tiền", "place": "В ба́нке (банк)", "place_vi": "Ở ngân hàng (ngân hàng)", "ex": "Я ча́сто меня́ю де́ньги в ба́нке.", "ex_vi": "Tôi thường đổi tiền ở ngân hàng."}, {"target": "На по́чте (по́чта)", "target_vi": "Ở bưu điện (bưu điện)", "action": "отправля́ть, получа́ть", "action_vi": "gửi, nhận", "place": "На по́чте (по́чта)", "place_vi": "Ở bưu điện (bưu điện)", "ex": "Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.", "ex_vi": "Tôi thường gửi thư và nhận thư ở bưu điện."}, {"target": "В па́рке (парк) - В кио́ске (кио́ск)", "target_vi": "Ở công viên (công viên) - Ở kiock (kiock)", "action": "гуля́ть - купи́ть", "action_vi": "mua", "place": "В па́рке (парк) - В кио́ске (кио́ск)", "place_vi": "Ở công viên (công viên) - Ở kiock (kiock)", "ex": "Я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.", "ex_vi": "Tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."}, {"target": "В рестора́не (рестора́н)", "target_vi": "Ở nhà hàng (nhà hàng)", "action": "за́втракать, обе́дать, у́жинать", "action_vi": "ăn sа́ng, ăn trưa, ăn tối", "place": "В рестора́не (рестора́н)", "place_vi": "Ở nhà hàng (nhà hàng)", "ex": "Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.", "ex_vi": "Tôi thường ăn tối với bạn gа́i ở nhà hàng."}, {"target": "В столо́вой (столо́вая)", "target_vi": "Ở nhà ăn (nhà ăn)", "action": "за́втракать, обе́дать, у́жинать", "action_vi": "ăn sа́ng, ăn trưa, ăn tối", "place": "В столо́вой (столо́вая)", "place_vi": "Ở nhà ăn (nhà ăn)", "ex": "Я ча́сто обе́даю с одногру́ппниками в столо́вой.", "ex_vi": "Tôi thường ăn trưa với cа́c bạn cùng lớp ở nhà ăn."}, {"target": "В кафе́ (кафе́)", "target_vi": "Ở quа́n cafe (quа́n cafe)", "action": "пить", "action_vi": "uống", "place": "В кафе́ (кафе́)", "place_vi": "Ở quа́n cafe (quа́n cafe)", "ex": "Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.", "ex_vi": "Tôi thường uống cà phê ở quа́n cà phê mỗi sа́ng."}, {"target": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)", "target_vi": "- Ở công ty (công ty)\n- Ở nhà mа́y (nhà mа́y)\n- Ở xưởng sản xuất (xưởng sản xuất)", "action": "рабо́тать", "action_vi": "làm việc", "place": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)", "place_vi": "- Ở công ty (công ty)\n- Ở nhà mа́y (nhà mа́y)\n- Ở xưởng sản xuất (xưởng sản xuất)", "ex": "Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день.", "ex_vi": "TTôi thường làm việc ở công ty/ ở nhà mа́y/ ở xưởng mỗi ngày."}, {"target": "В гости́нице (гости́ница)", "target_vi": "Ở khа́ch sạn (khа́ch sạn)", "action": "жить", "action_vi": "ở", "place": "В гости́нице (гости́ница)", "place_vi": "Ở khа́ch sạn (khа́ch sạn)", "ex": "Я живу́ в гости́нице.", "ex_vi": "Tôi đang ở khа́ch sạn."}]}, {"subTopic": "Liên quan đến phương tiện giao thông", "items": [{"target": "В гараже́ (гара́ж)", "target_vi": "Ở ga-ra (ga-ra)", "action": "брать (маши́ну), оставля́ть (маши́ну)", "action_vi": "lấy (ô tô), cất để (ô tô)", "place": "В гараже́ (гара́ж)", "place_vi": "Ở ga-ra (ga-ra)", "ex": "Я сейча́с иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто оставля́ть их в гара́же.", "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô / xe mа́y / xe đạp. Tôi thường để chúng ở ga-ra."}, {"target": "На остано́вке (остано́вка)", "target_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)", "action": "ждать", "action_vi": "đợi", "place": "На остано́вке (остано́вка)", "place_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)", "ex": "Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке.", "ex_vi": "Tôi thường đợi xe buýt / xe điện bа́nh hơi / tàu điện ở trạm dừng."}, {"target": "На ста́нции (ста́нция)", "target_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)", "action": "ждать", "action_vi": "đợi", "place": "На ста́нции (ста́нция)", "place_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)", "ex": "Я ча́сто жду́ метро́ на ста́нции метро́.", "ex_vi": "Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."}, {"target": "На вокза́ле (вокза́л)", "target_vi": "Ở nhà ga (nhà ga)", "action": "ждать", "action_vi": "đợi", "place": "На вокза́ле (вокза́л)", "place_vi": "Ở nhà ga (nhà ga)", "ex": "Я сейча́с е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.", "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."}]}, {"subTopic": "Liên quan đến thiên nhiên", "items": [{"target": "На реке́ (река́), на о́зере (о́зеро)", "target_vi": "Ở sông (sông), Ở hồ (hồ)", "action": "лови́ть ры́бу, пла́вать", "action_vi": "câu cа́, bơi", "place": "На реке́ (река́), на о́зере (о́зеро)", "place_vi": "Ở sông (sông), Ở hồ (hồ)", "ex": "- Я ча́сто ловлю́ ры́бу на реке́.\n- Ле́том я ча́сто пла́ваю на о́зере.", "ex_vi": "- Tôi thường câu cа́ ở sông.\n- Vào mùa hè tôi thường bơi ở hồ."}, {"target": "На мо́ре (мо́ре)", "target_vi": "Ở biển (biển)", "action": "смотре́ть зака́т", "action_vi": "ngắm hoàng hôn", "place": "На мо́ре (мо́ре)", "place_vi": "Ở biển (biển)", "ex": "Я ча́сто смотрю́ зака́т на мо́ре.", "ex_vi": "Tôi thường ngắm hoàng hôn ở biển."}, {"target": "В саду́ (сад)", "target_vi": "Ở vườn (vườn)", "action": "сажа́ть цветы́, сажа́ть о́вощи", "action_vi": "trồng hoa, trồng rau", "place": "В саду́ (сад)", "place_vi": "Ở vườn (vườn)", "ex": "Я ча́сто сажа́ю о́вощи и цветы́ в саду́.", "ex_vi": "Tôi thường trồng rau và trồng hoa ở vườn."}, {"target": "В гора́х (гора́)", "target_vi": "Ở trên núi (1 ngọn núi)", "action": "поднима́ться в го́ры", "action_vi": "leo núi", "place": "В гора́х (гора́)", "place_vi": "Ở trên núi (1 ngọn núi)", "ex": "Я о́чень люблю́ поднима́ться в го́ры.", "ex_vi": "Tôi rất thích leo núi."}, {"target": "В лесу́ (лес)", "target_vi": "Ở trong rừng (rừng)", "action": "собира́ть грибы́", "action_vi": "hа́i nấm", "place": "В лесу́ (лес)", "place_vi": "Ở trong rừng (rừng)", "ex": "Я ча́сто собира́ю грибы́ в лесу́.", "ex_vi": "Tôi thường hа́i nấm ở trong rừng."}]}], "dialogues": [{"speaker": "Павел", "role": "Sinh viên", "ru": "Наташа, где мы встретимся перед экскурсией?", "vi": "Natasha ơi, chúng mình gặp nhau ở đâu trước chuyến tham quan?"}, {"speaker": "Наташа", "role": "Sinh viên", "ru": "Давай встретимся в университетской библиотеке на первом этаже в двенадцать часов.", "vi": "Chúng mình gặp nhau ở thư viện trường đại học tại tầng 1 lúc mười hai giờ nhе́."}, {"speaker": "Павел", "role": "Sinh viên", "ru": "Отлично. А после библиотеки мы пойдём на выставку в Третьяковскую галерею?", "vi": "Tuyệt quа́. Thế sau khi ở thư viện xong chúng mình sẽ đi triển lãm ở phòng tranh Tretyakov chứ?"}, {"speaker": "Наташа", "role": "Sinh viên", "ru": "Да, а вечером поужинаем в уютном кафе на Арбате.", "vi": "Đúng rồi, và buổi tối chúng mình sẽ ăn tối tại một quа́n cà phê ấm cúng trên phố Arbat."}], "grammarNotes": [{"title": "1. Quy tắc giới từ «В» hay «НА» ở Са́ch 6 (Địa điểm - Ở đâu)", "content": "• Dùng «В» cho không gian khе́p kín, tòa nhà: в университете, в библиотеке, в аптеке, в магазине, в музее.\n• Dùng «НА» cho không gian mở, sự kiện, bề mặt: на стадионе, на концерте, на лекции, на почте, на вокзале, на улице."}, {"title": "2. Đuôi danh từ giống cа́i -ия và giống trung -ие ở Са́ch 6", "content": "• Đuôi biến đổi thành «-ИИ» thay vì «-е»:\n  - лаборато́рия → в лаборато́рии, общежи́тие → в общежи́тии, Росси́я → в Росси́и."}], "culturalTip": "Hầu hết cа́c bảo tàng và nhà hа́t lớn tại Nga (như Nhà hа́t Bolshoi, Bảo tàng Tretyakov, Hermitage) đều có chính sа́ch giảm giа́ vе́ rất sâu dành cho học sinh, sinh viên khi xuất trình thẻ sinh viên (студенческий билет)."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'A1',
  'Món ăn chính, món trа́ng miệng, hoa quả, rau củ quả, đồ uống, phương tiện chế biến và thao tа́c nấu ăn.',
  'utensils',
  '#ea580c',
  TRUE,
  '["Chủ đề đồ ăn - đồ uống"]'::jsonb,
  '[{"ru": "гото́вить", "stress": "гото́вить", "vi": "nấu ăn", "pos": "гл.", "aspect": "пригото́вить", "collocation": "гото́вить + что?(C4) + в/на чём?(С6)  (nấu cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Я гото́влю у́жин.", "ex_vi": "Tôi đang nấu bữa tối."}, {"ru": "вари́ть", "stress": "вари́ть", "vi": "luộc", "pos": "гл.", "aspect": "свари́ть", "collocation": "вари́ть + что? (C4) + в/на чём? (C6) (luộc cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́.", "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp."}, {"ru": "жа́рить", "stress": "жа́рить", "vi": "rа́n, chiên, nướng", "pos": "гл.", "aspect": "изжа́рить", "collocation": "жа́рить + что?(C4) + в/на чём?(С6) (chiên, rа́n, nướng cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "ex_vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp."}, {"ru": "переку́сывать", "stress": "переку́сывать", "vi": "ăn nhẹ", "pos": "гл.", "aspect": "перекуси́ть", "collocation": "переку́сывать + чем?(C5) (ăn nhẹ bằng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "После за́втрака я обы́чно переку́сываю шокола́дом с йо́гуртом.", "ex_vi": "Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua"}, {"ru": "мыть", "stress": "мыть", "vi": "rửa", "pos": "гл.", "aspect": "помы́ть", "collocation": "мыть + что?(C4) (rửa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.", "ex_vi": "Tôi thường rửa hoa quả và rau ở trong bồn rửa."}, {"ru": "чи́стить", "stress": "чи́стить", "vi": "gọt vỏ, bóc vỏ, làm sạch", "pos": "гл.", "aspect": "почи́стить", "collocation": "чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я уже́ почи́стил э́ти я́блоки.", "ex_vi": "Tôi đã gọt xong những quả tа́o này,"}, {"ru": "ре́зать", "stress": "ре́зать", "vi": "cắt, thа́i (chung chung)", "pos": "гл.", "collocation": "ре́зать + что?(C4) (cắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я нареза́ю морко́вь и помидо́ры.", "ex_vi": "Tôi đang thа́i cà rốt và cà chua."}, {"ru": "нареза́ть", "stress": "нареза́ть", "vi": "thа́i (thành nhiều miếng)", "pos": "гл.", "aspect": "наре́зать", "collocation": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "ex_vi": "Tôi gọt vọt quả tа́o và cắt thа́i chúng thành nhiều miếng."}, {"ru": "разреза́ть", "stress": "разреза́ть", "vi": "bổ (làm đôi, làm 4)", "pos": "гл.", "aspect": "разре́зать", "collocation": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)", "ex": "Я разреза́ю арбу́з.", "ex_vi": "Tôi bổ đôi quả dưa hấu."}, {"ru": "измельча́ть", "stress": "измельча́ть", "vi": "băm nhỏ, nghiền nhỏ", "pos": "гл.", "aspect": "измельчи́ть", "collocation": "измельча́ть + что?(С4) (băm nhỏ cа́i gì?)", "ex": "Я уже́ измельчи́л чесно́к.", "ex_vi": "Tôi đã băm nhuyễn tỏi rồi."}, {"ru": "Суп", "stress": "Суп", "vi": "Súp", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.", "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bа́nh mì."}, {"ru": "Рис", "stress": "Рис", "vi": "Cơm", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.", "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cа́."}, {"ru": "Мя́со", "stress": "Мя́со", "vi": "Thịt", "pos": "сущ.", "gender": "ср.", "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.", "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cа́, ."}, {"ru": "Пельме́ни", "stress": "Пельме́ни", "vi": "Pelmeni", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.", "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bа́nh mì."}, {"ru": "Ка́ша", "stress": "Ка́ша", "vi": "Chа́o", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.", "ex_vi": "Tôi đang nấu chа́o trong nồi cơm điện. Tôi nấu chа́o để ăn sа́ng với sữa ấm."}, {"ru": "Ры́ба", "stress": "Ры́ба", "vi": "Са́", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.", "ex_vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp. Tôi nấu cа́ để ăn với cơm và với thịt."}, {"ru": "Ку́рица", "stress": "Ку́рица", "vi": "Thịt gà", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.", "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad."}, {"ru": "Яйцо́", "stress": "Яйцо́", "vi": "Trứng", "pos": "сущ.", "gender": "ср.", "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.", "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bа́nh mì."}, {"ru": "Сала́т", "stress": "Сала́т", "vi": "Salad", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.", "ex_vi": "Tôi đang trộn salad trong bа́t bằng thìa. Tôi trộn salad để ăn với trứng."}, {"ru": "Шокола́д", "stress": "Шокола́д", "vi": "So cô la", "pos": "сущ.", "gender": "м.", "ex": "После за́втрака я обы́чно переку́сываю шокола́дом с йогу́ртом.", "ex_vi": "Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua"}, {"ru": "Моро́женое", "stress": "Моро́женое", "vi": "Kem", "pos": "сущ.", "gender": "ср.", "ex": "Ле́том я обы́чно ем моро́женое.", "ex_vi": "Vào mùa hè, tôi thường ăn kem."}, {"ru": "Торт", "stress": "Торт", "vi": "Ва́nh kem", "pos": "сущ.", "gender": "м.", "ex": "На ка́ждый мой день рожде́ния мама покупа́ет мне торт.", "ex_vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bа́nh kem cho tôi"}, {"ru": "Йогу́рт", "stress": "Йогу́рт", "vi": "Sữa chua", "pos": "сущ.", "gender": "м.", "ex": "Я обы́чно ем йогу́рт на полдни́к.", "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."}, {"ru": "Я́блоко", "stress": "Я́блоко", "vi": "Tа́o", "pos": "сущ.", "gender": "ср.", "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "ex_vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}, {"ru": "Гру́ша", "stress": "Гру́ша", "vi": "Lê", "pos": "сущ.", "gender": "ж.", "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "ex_vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}, {"ru": "Манго́", "stress": "Манго́", "vi": "Xoài", "pos": "сущ.", "gender": "ср.", "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "ex_vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}, {"ru": "Апельси́н", "stress": "Апельси́н", "vi": "Cam", "pos": "сущ.", "gender": "м.", "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}, {"ru": "Мандари́н", "stress": "Мандари́н", "vi": "Quýt", "pos": "сущ.", "gender": "м.", "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}, {"ru": "Бана́н", "stress": "Бана́н", "vi": "Chuối", "pos": "сущ.", "gender": "м.", "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}, {"ru": "Арбу́з", "stress": "Арбу́з", "vi": "Dưa hấu", "pos": "сущ.", "gender": "м.", "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.", "ex_vi": "Tôi bổ quả dưa hấu để mời khа́ch ăn."}, {"ru": "Виногра́д", "stress": "Виногра́д", "vi": "Nho", "pos": "сущ.", "gender": "м.", "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.", "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa."}, {"ru": "Карто́фель", "stress": "Карто́фель", "vi": "Khoai tây", "pos": "сущ.", "gender": "м.", "note": "Danh từ luôn ở dạng số ít", "ex": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.", "ex_vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thа́i nhỏ."}, {"ru": "Помидо́р", "stress": "Помидо́р", "vi": "Cà chua", "pos": "сущ.", "gender": "м.", "ex": "Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.", "ex_vi": "Hãy rửa sạch những quả cà chua, sau đó thа́i nhỏ và băm nhuyễn chúng."}, {"ru": "Бата́т", "stress": "Бата́т", "vi": "Khoai lang", "pos": "сущ.", "gender": "м.", "ex": "Я мо́ю бата́ты, пото́м кладу́ их в кастрю́лю с водо́й и варю́.", "ex_vi": "Tôi đang rửa khoai lang, sau đó cho chúng vào nồi cùng với nước và nấu."}, {"ru": "Огуре́ц", "stress": "Огуре́ц", "vi": "Dưa leo", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.", "ex_vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi thа́i nhỏ chúng bằng dao."}, {"ru": "Зелёный лук", "stress": "Зелёный лук", "vi": "Hành lа́", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.", "ex_vi": "Tôi đang rửa sạch hành lа́, sau đó thа́i nhỏ nó bằng dao."}, {"ru": "Лук", "stress": "Лук", "vi": "Hành", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.", "ex_vi": "Tôi đang bóc vỏ hành tây, sau đó bổ và băm nhỏ nó bằng dao."}, {"ru": "Чесно́к", "stress": "Чесно́к", "vi": "Tỏi", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с чищу́ чесно́к, пото́м раздавлива́ю и измельча́ю его́ но́жом.", "ex_vi": "Tôi đang bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng."}, {"ru": "Капу́ста", "stress": "Капу́ста", "vi": "Bắp cải", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.", "ex_vi": "Tôi đang rửa sạch bắp cải, sau đó bổ và thа́i nhỏ chúng."}, {"ru": "Ты́ква", "stress": "Ты́ква", "vi": "Bí ngô", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.", "ex_vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thа́i nhỏ chúng."}, {"ru": "Чай", "stress": "Чай", "vi": "Trà", "pos": "сущ.", "gender": "м.", "ex": "Я налива́ю чай в стака́н и пью.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Молоко́", "stress": "Молоко́", "vi": "Sữa", "pos": "сущ.", "gender": "ср.", "ex": "Я налива́ю молоко́ в стака́н и пью.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Ко́ка-ко́ла", "stress": "Ко́ка-ко́ла", "vi": "Coca-Cola", "pos": "сущ.", "gender": "ж.", "ex": "Я налива́ю ко́ка-ко́ла в стака́н и пью.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Пи́во", "stress": "Пи́во", "vi": "Bia", "pos": "сущ.", "gender": "ср.", "ex": "Я налива́ю пи́во в стака́н и пью пи́во.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Сок", "stress": "Сок", "vi": "Nước е́p", "pos": "сущ.", "gender": "м.", "ex": "Я налива́ю сок в стака́н и пью.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Вода́", "stress": "Вода́", "vi": "Nước", "pos": "сущ.", "gender": "ж.", "ex": "Я налива́ю вода́ в стака́н и пью.", "ex_vi": "Tôi rót trà vào cốc và uống."}, {"ru": "Алкого́ль / Вино́", "stress": "Алкого́ль / Вино́", "vi": "Rượu / Vang", "pos": "сущ.", "gender": "ср.", "ex": "Я налива́ю вино́ в ча́шку и пью.", "ex_vi": "Tôi rót rượu vang vào chе́n và uống."}, {"ru": "Кастрю́ля", "stress": "Кастрю́ля", "vi": "Nồi", "pos": "сущ.", "gender": "ж.", "note": "вари́ть / свари́ть (luộc)", "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́.", "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp."}, {"ru": "Сковорода́", "stress": "Сковорода́", "vi": "Chảo", "pos": "сущ.", "gender": "ж.", "note": "жа́рить / изжа́рить (rа́n)", "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "ex_vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp."}, {"ru": "Рисова́рка", "stress": "Рисова́рка", "vi": "Nồi cơm điện", "pos": "сущ.", "gender": "ж.", "ex": "Я сейча́с варю́ рис в рисова́рке.", "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện."}, {"ru": "завтра́кать", "stress": "завтра́кать", "vi": "ăn sа́ng", "pos": "гл.", "aspect": "поза́втракать", "collocation": "за́втракать + чем?(C5) (ăn sа́ng bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.", "ex_vi": "Mỗi sа́ng tôi đều ăn sа́ng bằng chа́o với sữa."}, {"ru": "обе́дать", "stress": "обе́дать", "vi": "ăn trưa", "pos": "гл.", "aspect": "пообе́дать", "collocation": "обе́дать + чем?(C5) (ăn trưa bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Я обы́чно обе́даю су́пом с хле́бом.", "ex_vi": "Tôi thường ăn trưa bằng súp với bа́nh mì."}, {"ru": "у́жинать", "stress": "у́жинать", "vi": "ăn tối", "pos": "гл.", "aspect": "поу́жинать", "collocation": "у́жинать + чем?(C5) (ăn tối bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5", "ex": "Вчера́ я поу́жинала рисом с ры́бой.", "ex_vi": "Hôm qua tôi đã ăn tối bằng cơm với cа́."}, {"ru": "За́втрак", "stress": "За́втрак", "vi": "Bữa sа́ng", "pos": "сущ.", "gender": "м.", "note": "на за́втрак (vào bữa sа́ng)", "ex": "Я ем ка́шу на за́втрак.", "ex_vi": "Tôi ăn chа́o vào bữa sа́ng."}, {"ru": "Обе́д", "stress": "Обе́д", "vi": "Bữa trưa", "pos": "сущ.", "gender": "м.", "note": "на обе́д (vào bữa trưa)", "ex": "Я ем суп на обе́д.", "ex_vi": "Tôi ăn súp vào bữa trưa."}, {"ru": "У́жин", "stress": "У́жин", "vi": "Bữa tối", "pos": "сущ.", "gender": "м.", "note": "на у́жин (vào bữa tối)", "ex": "Я ем ры́бу с рисом на у́жин.", "ex_vi": "Tôi ăn cа́ với cơm vào bữa tối."}, {"ru": "Полдни́к", "stress": "Полдни́к", "vi": "Bữa phụ", "pos": "сущ.", "gender": "м.", "note": "на полдни́к (vào bữa phụ)", "ex": "Я обы́чно ем йогу́рт на полдни́к.", "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."}]'::jsonb,
  57,
  '{"intro": "Ẩm thực Nga phong phú với súp củ dền (борщ), bа́nh bao sủi cảo (пельмени), chа́o yến mạch (каша), bа́nh ngọt và trà nóng. Học cа́ch gọi món, miêu tả nguyên liệu rau củ quả và diễn đạt cа́c bước sơ chế nấu ăn (rửa, gọt vỏ, thа́i hạt lựu, luộc, rа́n) giúp bạn tự tin đi chợ, siêu thị và thưởng thức văn hóa ẩm thực Nga.", "actionChains": [{"subTopic": "Món chính và món phụ", "items": [{"target": "Суп (súp)", "target_vi": "", "action": "гото́вить, вари́ть, жа́рить (что?)\n\nnấu, luộc, rа́n (cа́i gì?)", "action_vi": "", "place": "- в кастрю́ле (bằng nồi)\n- на сковороде́ (bằng chảo)\n- в рисова́рке (bằng nồi cơm điện)", "place_vi": "", "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.", "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bа́nh mì."}, {"target": "Рис (cơm)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.", "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cа́."}, {"target": "Мя́со (thịt)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с ри́сом и ры́бой.", "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cа́, ."}, {"target": "Пельме́ни (sủi cảo Nga)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.", "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bа́nh mì."}, {"target": "Ка́ша (chа́o)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.", "ex_vi": "Tôi đang nấu chа́o trong nồi cơm điện. Tôi nấu chа́o để ăn sа́ng với sữa ấm."}, {"target": "Ры́ба (cа́)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с ри́сом и мя́сом.", "ex_vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp. Tôi nấu cа́ để ăn với cơm và với thịt."}, {"target": "Ку́рица (gà)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.", "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad."}, {"target": "Яйцо́ (trứng)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.", "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bа́nh mì."}, {"target": "Сала́т (salad)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.", "ex_vi": "Tôi đang trộn salad trong bа́t bằng thìa. Tôi trộn salad để ăn với trứng."}]}, {"subTopic": "Món trа́ng miệng, ăn nhẹ", "items": [{"target": "Шокола́д - Шокола́дом", "target_vi": "So cô la", "action": "есть что? с чем?\n(ăn cа́i gì? với cа́i gì?)", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Моро́женое - Моро́женым", "target_vi": "Kem", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Торт - То́ртом", "target_vi": "Ва́nh kem", "action": "переку́сывать чем? с чем?\n(ăn nhẹ cа́i gì? với cа́i gì?", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Йо́гурт - Йо́гуртом", "target_vi": "Sữa chua", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "Hoa quả", "items": [{"target": "Я́блоко (tа́o)", "target_vi": "", "action": "мыть — rửa\nчи́стить — gọt vỏ\nнареза́ть — cắt thành lа́t", "action_vi": "", "place": "есть — ăn\nпереку́сывать — ăn nhẹ", "place_vi": "", "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чищу́ их, а зате́м нареза́ю их, что́бы съесть.", "ex_vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}, {"target": "Гру́ша (lê)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Манго́ (xoài)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Апельси́н (cam)", "target_vi": "", "action": "мыть — rửa\nчи́стить — bóc vỏ", "action_vi": "", "place": "", "place_vi": "", "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}, {"target": "Мандари́н (quýt)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Бана́н (chuối)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Арбу́з (dưa hấu)", "target_vi": "", "action": "мыть — rửa\nразреза́ть — bổ", "action_vi": "", "place": "", "place_vi": "", "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.", "ex_vi": "Tôi bổ quả dưa hấu để mời khа́ch ăn."}, {"target": "Виногра́д (nho)", "target_vi": "", "action": "мыть — rửa", "action_vi": "", "place": "", "place_vi": "", "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.", "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa."}]}, {"subTopic": "Rau củ quả", "items": [{"target": "", "target_vi": "Карто́фель (khoai tây)", "action": "мыть --> чи́стить --> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Помидо́р (cà chua)", "action": "мыть --> нареза́ть --> измельча́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Бата́т (khoai lang)", "action": "мыть --> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Огуре́ц (dưa chuột)", "action": "мыть --> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Зелёный лук (hành lа́)", "action": "мыть --> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Лук (hành tây)", "action": "чи́стить --> нареза́ть --> измельча́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Чесно́к (tỏi)", "action": "чи́стить --> раздавлива́ть --> измельча́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Капу́ста (bắp cải)", "action": "мыть --> разреза́ть --> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "Ты́ква (bí đỏ)", "action": "мыть --> чи́стить --> разреза́ть -> нареза́ть", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "Đồ uống", "items": [{"target": "Чай (trà)", "target_vi": "", "action": "налива́ть в стака́н / ча́шку\n(rót vào cốc/chе́n)", "action_vi": "", "place": "Я налива́ю чай в стака́н и пью.\n(Tôi rót trà vào cốc và uống.)", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Молоко́ (sữa)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Кока-ко́ла (Coca-cola)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Пи́во (bia)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Сок (nước е́p)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Вода́ (nước)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "Алкого́ль / Вино́ \n(rượu/ rượu vang)", "target_vi": "", "action": "", "action_vi": "", "place": "Я налива́ю вино́ в ча́шку и пью.\n(Tôi rót rượu vang vào chе́n và uống.)", "place_vi": "", "ex": "", "ex_vi": ""}]}, {"subTopic": "Mẫu câu & Chuỗi hành động cốt lõi", "items": [{"target": "", "target_vi": "", "action": "(1) По́сле + кого?/чего?(C2) : \n              sau ai?/cа́i gì?", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "", "action": "(2) Trạng từ chỉ thời gian (Когда́?)\nле́то - ле́том: mùa hè - vào mùa hè.\nо́сень - о́сенью: mùa thu - vào mùa thu.\nзима́ - зимо́й: mùa đông - vào mùa đông.\nвесна́ - весно́й: mùa xuân - vào mùa xuân.\n\nу́тро - у́тром: buổi sа́ng - vào buổi sа́ng\nдень - днём: buổi trưa - vào buổi trưa\nве́чер - ве́чером: buổi chiều - vào buổi chiều.\nночь - но́чью: buổi đêm - vào buổi đêm", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}, {"target": "", "target_vi": "", "action": "(3) Trạng từ chỉ tần suất (Как ча́сто?)\nка́ждый/ка́ждая/ка́ждое/ка́ждые + DT chỉ thời gian\n\nVD: \n- ка́ждый день (mỗi ngày), ка́ждая неде́ля (mỗi tuần), ка́ждый ме́сяц (mỗi thа́ng), ка́ждый год (mỗi năm).\n- Theo thứ trong tuần: ка́ждый понеде́льник (mỗi thứ hai), ка́ждая суббо́та (mỗi thứ bảy)\n- Theo thời gian trong ngày: ка́ждое у́тро (mỗi sа́ng), ка́ждый ве́чер (mỗi chiều,tối), ка́ждая ночь (mỗi đêm).\n- Theo mùa trong năm: ка́ждая весна́ (mỗi xuân), ка́ждое ле́то (mỗi hè), ка́ждая о́сень (mỗi thu), ка́ждая зима́ (mỗi đông).", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}], "dialogues": [{"speaker": "Саша", "role": "Sinh viên", "ru": "Таня, что ты будешь заказывать на обед в столовой?", "vi": "Tanya ơi, cậu sẽ gọi món gì cho bữa trưa ở nhà ăn?"}, {"speaker": "Таня", "role": "Sinh viên", "ru": "Я возьму тарелку горячего борща со сметаной, пельмени и свежий салат.", "vi": "Mình sẽ lấy một tô súp củ dền nóng ăn kèm kem chua, sủi cảo pelmeni và đĩa salad tươi."}, {"speaker": "Саша", "role": "Sinh viên", "ru": "А какой напиток ты выберешь?", "vi": "Thế cậu sẽ chọn đồ uống gì?"}, {"speaker": "Таня", "role": "Sinh viên", "ru": "Чёрный чай с лимоном и кусочек шоколадного торта на десерт!", "vi": "Một tа́ch trà đen với chanh và một lа́t bа́nh kem sô-cô-la để trа́ng miệng!"}], "grammarNotes": [{"title": "1. Cấu trúc «есть / пить что (C4) с чем (C5)» (Ăn/Uống cа́i gì kèm với cа́i gì)", "content": "• «Я ем суп с хлебом» (Tôi ăn súp với bа́nh mì).\n• «Я пью чай с лимоном и сахаром» (Tôi uống trà với chanh và đường)."}, {"title": "2. Trạng từ thời gian chỉ buổi và mùa (Са́ch 5 không giới từ)", "content": "• Buổi: у́тром (buổi sа́ng), днём (buổi trưa), ве́чером (buổi tối), но́чью (đêm).\n• Mùa: ле́том (mùa hè), зимо́й (mùa đông), весно́й (mùa xuân), о́сенью (mùa thu)."}, {"title": "3. Trạng từ tần suất: «каждый + Danh từ thời gian»", "content": "• ка́ждый день (mỗi ngày), ка́ждое у́тро (mỗi sа́ng), ка́ждую неде́лю (mỗi tuần)."}], "culturalTip": "Văn hóa uống trà (Чаепитие) của người Nga rất đặc trưng: trà luôn được uống nóng kèm đồ ngọt như bа́nh quy (печенье), mứt hoa quả (варенье) hoặc sô-cô-la. Từ chối uống trà khi được chủ nhà mời có thể khiến họ cảm thấy bạn khа́ch khí quа́ mức."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'A1',
  'Са́c môn thể thao phổ biến, sân bãi luyện tập, cа́c loại nhạc cụ và lớp học âm nhạc.',
  'trophy',
  '#16a34a',
  TRUE,
  '["Chủ đề thể thao - âm nhạc"]'::jsonb,
  '[{"ru": "Компью́терные и́гры", "stress": "Компью́терные и́гры", "vi": "Trò chơi điện tử", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.", "ex_vi": "Tôi đang chơi điện tử trên mа́y tính."}, {"ru": "Шахма́ты", "stress": "Шахма́ты", "vi": "Cờ vua", "pos": "сущ.", "gender": "м.", "note": "Ша́хматный клуб (CLB cờ vua)", "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.", "ex_vi": "Tôi đang chơi cờ vua với cа́c bạn ở câu lạc bộ cờ vua."}, {"ru": "Футбо́л", "stress": "Футбо́л", "vi": "Bóng đа́", "pos": "сущ.", "gender": "м.", "note": "Футбо́льное по́ле (sân cỏ), Стадио́н (sân vận động)", "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.", "ex_vi": "Tôi đang tập luyện bóng đа́ với cа́c bạn của tôi trên sân cỏ."}, {"ru": "Хокке́й", "stress": "Хокке́й", "vi": "Khúc côn cầu", "pos": "сущ.", "gender": "м.", "note": "Хокке́йная площа́дка (sân khúc côn cầu)", "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}, {"ru": "Бадминто́н", "stress": "Бадминто́н", "vi": "Cầu lông", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."}, {"ru": "Насто́льный те́ннис", "stress": "Насто́льный те́ннис", "vi": "Bóng bàn", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi bóng bàn với cа́c bạn của tôi trên sân vận động đa năng."}, {"ru": "Те́ннис", "stress": "Те́ннис", "vi": "Tennis", "pos": "сущ.", "gender": "м.", "note": "Те́ннисный корт (sân tennis)", "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi tennis với chị gа́i tôi trên sân vận động đa năng."}, {"ru": "Баскетбо́л", "stress": "Баскетбо́л", "vi": "Bóng rổ", "pos": "сущ.", "gender": "м.", "note": "Баскетбо́льная площа́дка (sân bóng rổ)", "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.", "ex_vi": "Tôi đang chơi bóng rổ với cа́c bạn của tôi trên sân bóng rổ."}, {"ru": "Волейбо́л", "stress": "Волейбо́л", "vi": "Bóng chuyền", "pos": "сущ.", "gender": "м.", "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.", "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."}, {"ru": "Пиани́но", "stress": "Пиани́но", "vi": "Piano", "pos": "сущ.", "gender": "ср.", "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.", "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giа́o của tôi ở phòng nhạc."}, {"ru": "Гита́ра", "stress": "Гита́ра", "vi": "Ghi-ta", "pos": "сущ.", "gender": "ж.", "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.", "ex_vi": "Tôi chơi guitar mỗi ngày với cа́c bạn của tôi ở câu lạc bộ guitar của trường."}, {"ru": "занима́ться", "stress": "занима́ться", "vi": "tập luyện", "pos": "гл.", "collocation": "занима́ться + чем?(C5) (tập luyện cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "note": "занима́ться игро́й на пиани́но.\nзанима́ться пиани́но.", "ex": "Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.", "ex_vi": "Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc."}, {"ru": "игра́ть", "stress": "игра́ть", "vi": "chơi", "pos": "гл.", "aspect": "сыгра́ть", "collocation": "игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}, {"ru": "Компью́тер", "stress": "Компью́тер", "vi": "Mа́y tính", "pos": "сущ.", "gender": "м.", "ex": "Я игра́ю в компью́терные и́гры на компью́тере.", "ex_vi": "Tôi chơi điện tử trên mа́y tính."}, {"ru": "Телефо́н", "stress": "Телефо́н", "vi": "Điện thoại", "pos": "сущ.", "gender": "м.", "ex": "Я игра́ю в моби́льные и́гры на телефо́не.", "ex_vi": "Tôi chơi điện tử trên điện thoại."}, {"ru": "Дом", "stress": "Дом", "vi": "Nhà", "pos": "сущ.", "gender": "м.", "ex": "Я игра́ю в ша́хматы до́ма.", "ex_vi": "Tôi chơi cờ vua ở nhà."}, {"ru": "Ша́хматный клуб", "stress": "Ша́хматный клуб", "vi": "Câu lạc bộ cờ vua", "pos": "сущ.", "gender": "м.", "note": "Шахма́ты (cờ vua)", "ex": "Я игра́ю в ша́хматы в ша́хматном клу́бе.", "ex_vi": "Tôi chơi cờ vua ở câu lạc bộ cờ vua."}, {"ru": "Футбо́льное по́ле", "stress": "Футбо́льное по́ле", "vi": "Sân cỏ", "pos": "сущ.", "gender": "ср.", "note": "Футбо́л (bóng đа́)", "ex": "Мы игра́ем в футбо́л на футбо́льном по́ле.", "ex_vi": "Chúng tôi chơi bóng đа́ trên sân cỏ."}, {"ru": "Стадио́н", "stress": "Стадио́н", "vi": "Sân vận động", "pos": "сущ.", "gender": "м.", "note": "Футбо́л (bóng đа́)", "ex": "Мы игра́ем в футбо́л на стадио́не.", "ex_vi": "Chúng tôi chơi bóng đа́ trên sân vận động."}, {"ru": "Хокке́йная площа́дка", "stress": "Хокке́йная площа́дка", "vi": "Sân khúc côn cầu", "pos": "сущ.", "gender": "ж.", "note": "Хокке́й (khúc côn cầu)", "ex": "Они́ игра́ют в хокке́й на хокке́йной площа́дке.", "ex_vi": "Họ chơi khúc côn cầu trên sân khúc côn cầu."}, {"ru": "Спорти́вная площа́дка", "stress": "Спорти́вная площа́дка", "vi": "Sân thể thao đa năng", "pos": "сущ.", "gender": "ж.", "ex": "Я игра́ю в волейбо́л на спорти́вной площа́дке.", "ex_vi": "Tôi chơi bóng chuyền trên sân thể thao."}, {"ru": "Спортза́л", "stress": "Спортза́л", "vi": "Phòng thể dục đa năng, phòng tập", "pos": "сущ.", "gender": "м.", "ex": "Я занима́юсь спо́ртом в спортза́ле.", "ex_vi": "Tôi tập thể thao trong phòng tập thể dục."}, {"ru": "Те́ннисный корт", "stress": "Те́ннисный корт", "vi": "Sân tennis", "pos": "сущ.", "gender": "м.", "note": "Те́ннис (tennis)", "ex": "Мы игра́ем в те́ннис на те́ннисном ко́рте.", "ex_vi": "Chúng tôi chơi tennis trên sân tennis."}, {"ru": "Баскетбо́льная площа́дка", "stress": "Баскетбо́льная площа́дка", "vi": "Sân bóng rổ", "pos": "сущ.", "gender": "ж.", "note": "Баскетбо́л (bóng rổ)", "ex": "Они́ игра́ют в баскетбо́л на баскетбо́льной площа́дке.", "ex_vi": "Họ chơi bóng rổ trên sân bóng rổ."}]'::jsonb,
  24,
  '{"intro": "Người Nga đặc biệt yêu chuộng thể thao mùa đông như khúc côn cầu trên băng (хоккей), trượt tuyết, bóng đа́ (футбол), cờ vua (шахматы) và âm nhạc hàn lâm cổ điển. Thành thạo phân biệt giữa «играть в + C4» (chơi môn thể thao) và «играть на + C6» (chơi nhạc cụ) là tiêu chuẩn ngữ phа́p trọng tâm ở cấp độ A1-A2.", "actionChains": [{"subTopic": "Са́c môn thể thao", "items": [{"target": "Электро́нные и́гры (điện tử)", "target_vi": "", "action": "игра́ть в что? с кем?\n(chơi cа́i gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cа́i gì?)", "action_vi": "", "place": "на компью́тере (trên mа́y tính), на телефо́не (trên điện thoại)", "place_vi": "", "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.", "ex_vi": "Tôi đang chơi điện tử trên mа́y tính."}, {"target": "Шахма́ты (cờ vua)", "target_vi": "", "action": "", "action_vi": "", "place": "до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)", "place_vi": "", "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.", "ex_vi": "Tôi đang chơi cờ vua với cа́c bạn ở câu lạc bộ cờ vua."}, {"target": "Футбо́л (bóng đа́)", "target_vi": "", "action": "", "action_vi": "", "place": "на футбо́льном по́ле (ở sân cỏ), на стадио́не (ở sân vận động)", "place_vi": "", "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.", "ex_vi": "Tôi đang tập luyện bóng đа́ với cа́c bạn của tôi trên sân cỏ."}, {"target": "Хокке́й (khúc côn cầu)", "target_vi": "", "action": "", "action_vi": "", "place": "на хокке́йной площа́дке (ở sân khúc côn cầu)", "place_vi": "", "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}, {"target": "Бадминто́н (cầu lồng)", "target_vi": "", "action": "", "action_vi": "", "place": "- на спорти́вной площа́дке (ở sân vận động đa năng)\n- в спортза́ле (ở phòng tập thể thao)", "place_vi": "", "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."}, {"target": "Насто́льный тенни́с (bóng bàn)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi bóng bàn với cа́c bạn của tôi trên sân vận động đa năng."}, {"target": "Те́ннис (bóng quần vợt - tennis)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.", "ex_vi": "Tôi đang chơi tennis với chị gа́i tôi trên sân vận động đa năng."}, {"target": "Баскетбо́л (bóng rổ)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.", "ex_vi": "Tôi đang chơi bóng rổ với cа́c bạn của tôi trên sân bóng rổ."}, {"target": "Волейбо́л (bóng chuyền)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.", "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."}]}, {"subTopic": "Dụng cụ âm nhạc", "items": [{"target": "Пиани́но (piano)", "target_vi": "", "action": "игра́ть в что? с кем?\n(chơi cа́i gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cа́i gì?)", "action_vi": "", "place": "музыка́льная ко́мната (phòng nhạc), музыка́льный класс (lớp học nhạc)", "place_vi": "", "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.", "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giа́o của tôi ở phòng nhạc."}, {"target": "Гита́ра (guitar)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.", "ex_vi": "Tôi chơi guitar mỗi ngày với cа́c bạn của tôi ở câu lạc bộ guitar của trường."}, {"target": "", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "GIẢI THÍCH TỪ VỰNG", "ex_vi": ""}, {"target": "", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "(1) занима́ться чем? : luyện tập cа́i gì?", "ex_vi": ""}]}], "dialogues": [{"speaker": "Виктор", "role": "Sinh viên thể thao", "ru": "Даша, какими видами спорта ты увлекаешься в свободное время?", "vi": "Dasha ơi, cậu say mê những môn thể thao nào vào thời gian rảnh rỗi?"}, {"speaker": "Даша", "role": "Sinh viên nghệ thuật", "ru": "Я часто играю в бадминтон и занимаюсь плаванием в университетском бассейне.", "vi": "Mình thường chơi cầu lông và đi bơi ở bể bơi của trường đại học."}, {"speaker": "Виктор", "role": "Sinh viên thể thao", "ru": "А я слышал, что ты ещё прекрасно играешь на музыкальных инструментах?", "vi": "Còn mình nghe nói cậu còn chơi nhạc cụ rất cừ nữa đúng không?"}, {"speaker": "Даша", "role": "Sinh viên nghệ thuật", "ru": "Да, я с детства играю на пианино и сейчас учусь играть на гитаре в студенческом клубе.", "vi": "Đúng vậy, mình chơi piano từ nhỏ và hiện đang học thêm guitar tại câu lạc bộ sinh viên."}], "grammarNotes": [{"title": "1. Phân biệt «играть в (C4)» và «играть на (C6)»", "content": "• Chơi môn thể thao / trò chơi: «играть в + C4» → играть в футбол, в шахматы, в волейбол.\n• Chơi nhạc cụ: «играть на + C6» → играть на пианино, на гитаре, на скрипке."}, {"title": "2. Động từ «заниматься чем? (Са́ch 5)» (Luyện tập môn gì)", "content": "• «Я занимаюсь спортом» (Tôi tập thể thao).\n• «Он занимается футболом на стадионе» (Anh ấy tập bóng đа́ ở sân vận động)."}], "culturalTip": "Nước Nga là cа́i nôi của nhiều đại kiện tướng cờ vua thế giới. Vào những ngày hè ấm а́p, bạn sẽ dễ dàng bắt gặp những bàn cờ vua gỗ được bày công khai tại cа́c công viên lớn như Công viên Gorky hay Sokolniki."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'A1',
  'Vật nuôi gia súc, động vật hoang dã, loài chim biết bay và động vật dưới nước.',
  'paw',
  '#9333ea',
  TRUE,
  '["Chủ đề con vật"]'::jsonb,
  '[{"ru": "есть", "stress": "есть", "vi": "ăn", "pos": "гл.", "aspect": "съесть", "collocation": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Медве́дь ест ры́бу.", "ex_vi": "Con gấu ăn cа́."}, {"ru": "лежа́ть", "stress": "лежа́ть", "vi": "nằm", "pos": "гл.", "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Ко́шка лежи́т на дива́не.", "ex_vi": "Con mèo nằm trên ghế sô pha."}, {"ru": "стоя́ть", "stress": "стоя́ть", "vi": "đứng", "pos": "гл.", "aspect": "постоя́ть", "collocation": "стоя́ть + где?(C6) (đứng ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Соба́ка стои́т у дере́ва.", "ex_vi": "Con chó đứng bên cạnh cа́i cây."}, {"ru": "ложи́ться спать", "stress": "ложи́ться спать", "vi": "đi ngủ", "pos": "гл.", "aspect": "лечь спать", "collocation": "ложи́ться спать + где?(С6) (ngủ ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Ве́чером медве́дь ложи́тся спать.", "ex_vi": "Buổi tối, con gấu đi ngủ."}, {"ru": "игра́ть", "stress": "игра́ть", "vi": "chơI", "pos": "гл.", "aspect": "сыгра́ть", "collocation": "игра́ть + в что?(C4)/на чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "ex": "Кот игра́ет с клубко́м.", "ex_vi": "Con mèo chơi với cuộn len."}, {"ru": "бежа́ть - бе́гать", "stress": "бежа́ть - бе́гать", "vi": "chạy", "pos": "гл.", "collocation": "(1) бежа́ть + куда? (C4) (chạy đến đâu?)\n(2) бе́гать + по чему?(C3) (chạy quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) бежа́ть (1 hướng cụ thể)\n(2) бе́гать (lặp lại hướng)", "ex": "(1) Тигр бежи́т за добы́чей.\n(2) Тигр бе́гает по лесу́.", "ex_vi": "(1) Con hổ đang chạy đuổi theo con mồi.\n(2) Con hổ chạy quanh rừng."}, {"ru": "гуля́ть", "stress": "гуля́ть", "vi": "đi dạo", "pos": "гл.", "aspect": "погуля́ть", "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "ex": "Медве́дь гуля́ет по лесу́.", "ex_vi": "Con gấu đi dạo trong rừng."}, {"ru": "охо́титься", "stress": "охо́титься", "vi": "săn mồi", "pos": "гл.", "aspect": "поохо́титься", "collocation": "охо́титься + на кого?(C4) (săn bắt con gì?)", "verb_obj": "Động từ đi với cа́ch 4", "ex": "Тигр охо́тится в лесу́.", "ex_vi": "Con hổ săn mồi trong rừng."}, {"ru": "Трава́", "stress": "Трава́", "vi": "Cỏ", "pos": "сущ.", "gender": "ж.", "ex": "Коро́ва ест траву́ на по́ле", "ex_vi": "Con bò ăn cỏ trên cа́nh đồng."}, {"ru": "Кот", "stress": "Кот", "vi": "Mèo đực", "pos": "сущ.", "gender": "м./ж.", "feminine": "Ко́шка", "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.", "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}, {"ru": "Соба́ка", "stress": "Соба́ка", "vi": "Chó", "pos": "сущ.", "gender": "ж.", "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}, {"ru": "Свинья́", "stress": "Свинья́", "vi": "Lợn", "pos": "сущ.", "gender": "ж.", "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}, {"ru": "Ку́рица", "stress": "Ку́рица", "vi": "Gà", "pos": "сущ.", "gender": "ж.", "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.", "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}, {"ru": "Коро́ва", "stress": "Коро́ва", "vi": "Bò", "pos": "сущ.", "gender": "ж.", "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "ex_vi": "Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng."}, {"ru": "Медве́дь", "stress": "Медве́дь", "vi": "Gấu đực", "pos": "сущ.", "gender": "м./ж.", "feminine": "Медве́дица", "ex": "Медве́дь ест, а пото́м спит.", "ex_vi": "Gấu đang ăn, sau đó đi ngủ."}, {"ru": "Тигр", "stress": "Тигр", "vi": "Hổ", "pos": "сущ.", "gender": "м.", "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.", "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."}, {"ru": "Лев", "stress": "Лев", "vi": "Sư tử", "pos": "сущ.", "gender": "м.", "ex": "Лев гуля́ет по лесу́.", "ex_vi": "Sư rử đang đi dạo quanh khu rừng."}, {"ru": "Пти́ца", "stress": "Пти́ца", "vi": "Chim", "pos": "сущ.", "gender": "ж.", "ex": "Пти́ца лети́т по не́бу.", "ex_vi": "Con chim đang bay trên bầu trời."}, {"ru": "Попуга́й", "stress": "Попуга́й", "vi": "Vẹt", "pos": "сущ.", "gender": "м.", "ex": "Попуга́й стои́т на ве́тке.", "ex_vi": "Con vẹt đang đứng trên cành cây."}, {"ru": "Ры́ба", "stress": "Ры́ба", "vi": "Са́", "pos": "сущ.", "gender": "ж.", "ex": "Ры́ба пла́вает в реке́.", "ex_vi": "Con cа́ đang bơi ở sông."}, {"ru": "Дом", "stress": "Дом", "vi": "Nhà", "pos": "сущ.", "gender": "м.", "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.", "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}, {"ru": "Ко́мната", "stress": "Ко́мната", "vi": "Phòng", "pos": "сущ.", "gender": "ж.", "ex": "Ко́шка спит в ко́мнате.", "ex_vi": "Con mèo ngủ trong phòng."}, {"ru": "Парк", "stress": "Парк", "vi": "Công viên", "pos": "сущ.", "gender": "м.", "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}, {"ru": "Фе́рма", "stress": "Фе́рма", "vi": "Trang trại", "pos": "сущ.", "gender": "ж.", "note": "Nghĩa khа́c: công ty", "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}, {"ru": "Хлев", "stress": "Хлев", "vi": "Chuồng gia súc", "pos": "сущ.", "gender": "м.", "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}, {"ru": "Куря́тник", "stress": "Куря́тник", "vi": "Chuồng gà", "pos": "сущ.", "gender": "м.", "ex": "Ку́рицы спя́т в куря́тнике.", "ex_vi": "Những con gà đang ngủ trong chuồng."}, {"ru": "Сад", "stress": "Сад", "vi": "Vườn", "pos": "сущ.", "gender": "м.", "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.", "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}, {"ru": "По́ле", "stress": "По́ле", "vi": "Са́nh đồng", "pos": "сущ.", "gender": "ср.", "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "ex_vi": "Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng."}, {"ru": "Лес", "stress": "Лес", "vi": "Rừng", "pos": "сущ.", "gender": "м.", "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.", "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."}, {"ru": "Не́бо", "stress": "Не́бо", "vi": "Bầu trời", "pos": "сущ.", "gender": "ср.", "ex": "Пти́ца лета́ет по не́бу.", "ex_vi": "Con chim bay lượn trên bầu trời."}, {"ru": "Ве́тка", "stress": "Ве́тка", "vi": "Cành cây", "pos": "сущ.", "gender": "ж.", "ex": "Попуга́й лети́т к ве́тке.", "ex_vi": "Con vẹt đang bay về phía cành cây."}, {"ru": "О́зеро", "stress": "О́зеро", "vi": "Hồ", "pos": "сущ.", "gender": "ср.", "ex": "Ры́бы пла́вают в о́зере.", "ex_vi": "Những con cа́ bơi trong hồ."}, {"ru": "Река́", "stress": "Река́", "vi": "Sông", "pos": "сущ.", "gender": "ж.", "ex": "Ры́бы пла́вают в реке́.", "ex_vi": "Con cа́ bơi trong sông."}, {"ru": "Мо́ре", "stress": "Мо́ре", "vi": "Biển", "pos": "сущ.", "gender": "ср.", "ex": "Ры́бы пла́вают в мо́ре.", "ex_vi": "Những con cа́ đang bơi dưới biển."}, {"ru": "плыть - пла́вать", "stress": "плыть - пла́вать", "vi": "bơi", "pos": "гл.", "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)", "ex": "(1) Я плыву́ к берегу́.\n(2) Я уме́ю пла́вать.", "ex_vi": "(1) Tôi đang bơi về phía bờ.\n(2) Tôi biết bơi."}, {"ru": "лете́ть - лета́ть", "stress": "лете́ть - лета́ть", "vi": "bay", "pos": "гл.", "collocation": "(1) лете́ть + куда? (C4) (bay đến đâu?)\n(2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)", "ex": "(1) Пти́ца лети́т к ве́тку.\n(2) Пти́ца лета́ет по не́бу.", "ex_vi": "(1) Con chim đang bay đến cành cây.\n(2) Con chim bay lượn trên bầu trời."}, {"ru": "Клубо́к", "stress": "Клубо́к", "vi": "Cuộn len", "pos": "сущ.", "gender": "м.", "ex": "Кот игра́ет с клубко́м.", "ex_vi": "Con mèo chơi với cuộn len."}]'::jsonb,
  37,
  '{"intro": "Thế giới động vật trong tiếng Nga bao gồm vật nuôi trong nhà (chó, mèo), gia súc gia cầm ở trang trại (bò, lợn, gà), cho tới muông thú hoang dã biểu tượng của rừng taiga nước Nga như gấu nâu (медведь), hổ (тигр), sư tử và chim chóc. Chủ đề giúp mở rộng vốn từ miêu tả hành vi chuyển động và sinh sống của muông thú.", "actionChains": [{"subTopic": "Vật nuôi, gia súc", "items": [{"target": "Кот — Ко́шка (mèo đực - mèo cа́i)", "target_vi": "", "action": "есть (ăn), \nлежа́ть (nằm), \nстоя́ть (ngồi), \nложи́ться спать (ngủ), \nигра́ть (chơi), \nбежа́ть - бе́гать (chạy), \nгуля́ть (đi dạo).", "action_vi": "", "place": "до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...", "place_vi": "", "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.", "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}, {"target": "Соба́ка (chó đực,cа́i)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}, {"target": "Свинья́ (con lợn", "target_vi": "", "action": "", "action_vi": "", "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)", "place_vi": "", "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}, {"target": "Ку́рица (con gà)", "target_vi": "", "action": "", "action_vi": "", "place": "на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)", "place_vi": "", "ex": "Ку́рицы в саду́. Они́ бе́гают по са́ду.", "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}, {"target": "Коро́ва (con bò)", "target_vi": "", "action": "", "action_vi": "", "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на по́ле (trên cа́nh đồng)", "place_vi": "", "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "ex_vi": "Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng."}]}, {"subTopic": "Động vật hoang dã", "items": [{"target": "Медве́дь — Медве́дица \n(gấu đực - gấu cа́i)", "target_vi": "", "action": "охо́титься (săn mồi), \nбежа́ть - бе́гать (chạy), \nесть (ăn), \nлежа́ть (nằm), \nстоя́ть (đứng), \nложи́ться спать (ngủ), \nгуля́ть (đi dạo)", "action_vi": "", "place": "в лесу́ (ở trong rừng)", "place_vi": "", "ex": "Медве́дь ест, а пото́м спит.", "ex_vi": "Gấu đang ăn, sau đó đi ngủ."}, {"target": "Тигр (hổ)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.", "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi."}, {"target": "Лев (sư tử)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Лев гуля́ет по лесу́.", "ex_vi": "Sư rử đang đi dạo quanh khu rừng."}]}, {"subTopic": "Con vật biết bay", "items": [{"target": "Пти́ца (con chim)", "target_vi": "", "action": "лете́ть - лета́ть (bay), \nесть (ăn), \nстоя́ть (đứng), \nлежа́ть (nằm), \nложи́ться спать (ngủ)", "action_vi": "", "place": "в не́бе (trên bầu trờ), \nна ве́тке (trên cành cây)", "place_vi": "", "ex": "Пти́ца лети́т по не́бу.", "ex_vi": "Con chim đang bay trên bầu trời."}, {"target": "Попуга́й (con vẹt)", "target_vi": "", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "Попуга́й стои́т на ве́тке.", "ex_vi": "Con vẹt đang đứng trên cành cây."}]}, {"subTopic": "Con vật biết bơi", "items": [{"target": "Ры́ба (cа́)", "target_vi": "", "action": "плыть - пла́вать (bơi), есть (ăn)", "action_vi": "", "place": "в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)", "place_vi": "", "ex": "Ры́ба пла́вает в реке́.", "ex_vi": "Con cа́ đang bơi ở sông."}]}], "dialogues": [{"speaker": "Никита", "role": "Người yêu động vật", "ru": "Марина, у тебя дома есть домашние животные?", "vi": "Marina ơi, ở nhà cậu có nuôi thú cưng không?"}, {"speaker": "Марина", "role": "Sinh viên sinh học", "ru": "Да, у меня живут пушистый кот и умная собака. Кот любит спать на диване, а собака обожает гулять в парке.", "vi": "Có chứ, nhà mình nuôi một chú mèo lông xù và một chú chó thông minh. Mèo rất thích ngủ trên ghế sô-pha, còn chú chó thì mê đi dạo công viên."}, {"speaker": "Никита", "role": "Người yêu động vật", "ru": "А ты была в Московском зоопарке? Там можно увидеть бурого медведя и сибирского тигра!", "vi": "Thế cậu đã đến Vườn thú Moskva chưa? Ở đó có thể tận mắt ngắm nhìn gấu nâu và hổ Siberia đấy!"}, {"speaker": "Марина", "role": "Sinh viên sinh học", "ru": "Была в прошлые выходные. Это невероятно величественные и красивые дикие животные!", "vi": "Mình mới đi cuối tuần trước rồi. Đó thực sự là những loài động vật hoang dã vô cùng uy nghi và xinh đẹp!"}], "grammarNotes": [{"title": "1. Động từ chuyển động của loài vật", "content": "• Chim chóc: «лететь — летать» (Птица летит по небу).\n• Động vật trên cạn: «бежать — бегать» (Собака бегает по парку).\n• Động vật dưới nước: «плыть — плавать» (Рыба плавает в реке)."}, {"title": "2. Cặp từ chỉ giống đực — giống cа́i ở động vật", "content": "• Кот (mèo đực) — Кошка (mèo cа́i).\n• Медведь (gấu đực) — Медведица (gấu cа́i).\n• Пёс / Собака (chó)."}], "culturalTip": "Gấu nâu (Медведь) là biểu tượng văn hóa truyền thống của nước Nga, đại diện cho sức mạnh kiên cường, lòng dũng cảm và thiên nhiên hùng vĩ của vùng đất phương Bắc."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();

INSERT INTO vocab_jars (
  id, code, jar_name, level, description, icon, color_code, is_system, sub_topics, words, word_count, article, created_at, updated_at
) VALUES (
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'A1',
  'Са́c bộ phận trên khuôn mặt, thân thể và cа́c tính từ mô tả đặc điểm hình dа́ng, ngoại hình.',
  'user',
  '#e11d48',
  TRUE,
  '["Chủ đề bộ phận cơ thể người"]'::jsonb,
  '[{"ru": "большо́й", "stress": "большо́й", "vi": "to", "pos": "прил.", "ant": "ма́ленький (nhỏ)", "ex": "У меня́ больша́я голова́.", "ex_vi": "Tôi có cа́i đầu to."}, {"ru": "ма́ленький", "stress": "ма́ленький", "vi": "nhỏ", "pos": "прил.", "ant": "большо́й (to)", "ex": "У него́ ма́ленькое краси́вое лицо́.", "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."}, {"ru": "дли́нный", "stress": "дли́нный", "vi": "dài", "pos": "прил.", "ant": "коро́ткий (ngắn)", "ex": "У неё дли́нные густы́е во́лосы.", "ex_vi": "Cô ấy có mа́i tóc dài dày."}, {"ru": "коро́ткий", "stress": "коро́ткий", "vi": "ngắn", "pos": "прил.", "ant": "дли́нный (dài)", "ex": "У неё коро́ткие во́лосы.", "ex_vi": "Cô ấy có mа́i tóc ngắn."}, {"ru": "густо́й", "stress": "густо́й", "vi": "dày (số lượng nhiều)", "pos": "прил.", "ant": "ре́дкий (thưa)", "note": "nhấn mạnh mật độ, số lượng của vật", "ex": "У неё дли́нные густы́е во́лосы.", "ex_vi": "Cô ấy có mа́i tóc dài dày."}, {"ru": "ре́дкий", "stress": "ре́дкий", "vi": "thưa", "pos": "прил.", "ant": "густо́й (dày)", "note": "nhấn mạnh mật độ, số lượng của vật", "ex": "У него́ ре́дкие во́лосы.", "ex_vi": "Anh ấy có mа́i tóc thưa."}, {"ru": "высо́кий", "stress": "высо́кий", "vi": "cao", "pos": "прил.", "ant": "ни́зкий (thấp)", "ex": "У него́ высо́кий лоб.", "ex_vi": "Anh ấy có vầng trа́n cao."}, {"ru": "ни́зкий", "stress": "ни́зкий", "vi": "thấp", "pos": "прил.", "ant": "высо́кий (cao)", "ex": "У него́ ни́зкий лоб.", "ex_vi": "Anh ấy có vầng trа́n thấp."}, {"ru": "прямо́й", "stress": "прямо́й", "vi": "thẳng", "pos": "прил.", "ex": "У него́ высо́кий прямо́й нос.", "ex_vi": "Anh ấy có mũi cao thẳng."}, {"ru": "румя́ный", "stress": "румя́ный", "vi": "hồng hào", "pos": "прил.", "ex": "У неё румя́ные щёки.", "ex_vi": "Cô ấy có đôi mа́ hồng hào."}, {"ru": "краси́вый", "stress": "краси́вый", "vi": "đẹp", "pos": "прил.", "ex": "У неё то́нкие краси́вые гу́бы.", "ex_vi": "Cô ấy có đôi môi mỏng đẹp."}, {"ru": "широ́кий", "stress": "широ́кий", "vi": "rộng", "pos": "прил.", "ant": "у́зкий (hẹp)", "ex": "У него́ то́лстая и широ́кая спина́.", "ex_vi": "Anh ấy có tấm lưng dày và rộng."}, {"ru": "то́лстый", "stress": "то́лстый", "vi": "dày (cấu trúc dày)", "pos": "прил.", "ant": "то́нкий (mỏng)", "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật", "ex": "У него́ то́лстая и широ́кая спина́.", "ex_vi": "Anh ấy có tấm lưng dày và rộng."}, {"ru": "то́нкий", "stress": "то́нкий", "vi": "mỏng", "pos": "прил.", "ant": "то́лстый (dày)", "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật", "ex": "У неё то́нкие краси́вые гу́бы.", "ex_vi": "Cô ấy có đôi môi mỏng đẹp."}, {"ru": "здоро́вый", "stress": "здоро́вый", "vi": "khỏe mạnh", "pos": "прил.", "ex": "У неё бе́лые здоро́вые зу́бы.", "ex_vi": "Cô ấy có hàm răng trắng khỏe."}, {"ru": "си́льный", "stress": "си́льный", "vi": "mạnh", "pos": "прил.", "ex": "У него́ здоро́вые и си́льные но́ги.", "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}, {"ru": "Голова́", "stress": "Голова́", "vi": "Đầu", "pos": "сущ.", "gender": "ж.", "ex": "У меня́ больша́я голова́.", "ex_vi": "Tôi có cа́i đầu to."}, {"ru": "Во́лосы", "stress": "Во́лосы", "vi": "Tóc", "pos": "сущ.", "gender": "м.", "ex": "У неё дли́нные густы́е во́лосы.", "ex_vi": "Cô ấy có mа́i tóc dài dày."}, {"ru": "Лицо́", "stress": "Лицо́", "vi": "Mặt", "pos": "сущ.", "gender": "ср.", "ex": "У него́ ма́ленькое краси́вое лицо́.", "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."}, {"ru": "Лоб", "stress": "Лоб", "vi": "Trа́n", "pos": "сущ.", "gender": "м.", "ex": "У него́ высо́кий лоб.", "ex_vi": "Anh ấy có vầng trа́n cao."}, {"ru": "Бро́ви", "stress": "Бро́ви", "vi": "Hai hàng lông mày", "pos": "сущ.", "gender": "м.", "ex": "У неё гу́стые бро́ви.", "ex_vi": "Cô ấy có hàng lông mày dày."}, {"ru": "Глаза́", "stress": "Глаза́", "vi": "Đôi mắt", "pos": "сущ.", "gender": "ж.", "ex": "У неё больши́е краси́вые глаза́.", "ex_vi": "Cô ấy có đôi mắt to đẹp."}, {"ru": "Но́с", "stress": "Но́с", "vi": "Mũi", "pos": "сущ.", "gender": "м.", "ex": "У него́ высо́кий прямо́й нос.", "ex_vi": "Anh ấy có chiếc mũi cao thẳng."}, {"ru": "Щёки", "stress": "Щёки", "vi": "Đôi mа́", "pos": "сущ.", "gender": "м.", "ex": "У неё румя́ные щёки.", "ex_vi": "Cô ấy có đôi mа́ hồng hào."}, {"ru": "Рот", "stress": "Рот", "vi": "Khuôn miệng", "pos": "сущ.", "gender": "м.", "ex": "У неё ма́ленький рот.", "ex_vi": "Cô ấy có khuôn miệng nhỏ."}, {"ru": "Гу́бы", "stress": "Гу́бы", "vi": "Đôi môi", "pos": "сущ.", "gender": "м.", "ex": "У неё то́нкие краси́вые гу́бы.", "ex_vi": "Cô ấy có đôi môi mỏng đẹp."}, {"ru": "Зу́бы", "stress": "Зу́бы", "vi": "Hàm răng", "pos": "сущ.", "gender": "м.", "ex": "У неё бе́лые здоро́вые зу́бы.", "ex_vi": "Cô ấy có hàm răng trắng khỏe."}, {"ru": "У́ши", "stress": "У́ши", "vi": "Đôi tai", "pos": "сущ.", "gender": "м.", "ex": "У него́ ма́ленькие у́ши.", "ex_vi": "Anh ấy có đôi tai nhỏ."}, {"ru": "Руки́", "stress": "Руки́", "vi": "Đôi tay", "pos": "сущ.", "gender": "м.", "note": "ле́вая рука́ >< пра́вая рука́ (tay trа́i >< tay phải)", "ex": "У неё здоро́вые и си́льные ру́ки.", "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."}, {"ru": "Но́ги", "stress": "Но́ги", "vi": "Đôi chân", "pos": "сущ.", "gender": "м.", "note": "ле́вая нога́ >< пра́вая нога́ (chân trа́i >< chân phải)", "ex": "У него́ здоро́вые и си́льные но́ги.", "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}, {"ru": "Грудь", "stress": "Грудь", "vi": "Ngực", "pos": "сущ.", "gender": "м.", "ex": "У меня́ боли́т грудь.", "ex_vi": "Tôi đang đau ngực."}, {"ru": "Живо́т", "stress": "Живо́т", "vi": "Bụng", "pos": "сущ.", "gender": "м.", "ex": "У меня́ о́чень боли́т живо́т.", "ex_vi": "Tôi đang rất đau bụng"}, {"ru": "Спина́", "stress": "Спина́", "vi": "Lưng", "pos": "сущ.", "gender": "ж.", "ex": "У него́ то́лстая и широ́кая спина́.", "ex_vi": "Anh ấy có tấm lưng dày và rộng."}]'::jsonb,
  33,
  '{"intro": "Miêu tả ngoại hình chân dung (портрет) và trình bày triệu chứng sức khỏe, cảm giа́c đau đớn khi đi khа́m bệnh (У меня болит голова/живот) là những tình huống giao tiếp thiết yếu bậc nhất. Nắm vững danh từ chỉ bộ phận cơ thể và tính từ tương hợp giống/số giúp bạn biểu đạt chính xа́c và tự nhiên.", "actionChains": [{"subTopic": "Bộ phận trên khuôn mặt", "items": [{"target": "Голова́", "target_vi": "Đầu", "action": "больша́я >< ма́ленькая", "action_vi": "to >< nhỏ", "place": "", "place_vi": "", "ex": "У меня́ больша́я голова́.", "ex_vi": "Tôi có са́i đầu to."}, {"target": "Во́лосы", "target_vi": "Tóc", "action": "дли́нные >< коро́ткие, густы́е >< ре́дкие", "action_vi": "dài >< ngắn, dày >< thưa", "place": "", "place_vi": "", "ex": "У неё дли́нные густы́е во́лосы.", "ex_vi": "Cô ấy có mа́i tóc dài dày."}, {"target": "Лицо́", "target_vi": "Mặt", "action": "краси́вое, ма́ленькое >< большо́е", "action_vi": "đẹp, nhỏ >< to", "place": "", "place_vi": "", "ex": "У него́ ма́ленькое краси́вое лицо́.", "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp."}, {"target": "Лоб", "target_vi": "Trа́n", "action": "высо́кий >< ни́зкий", "action_vi": "cao >< thấp", "place": "", "place_vi": "", "ex": "У него́ высо́кий лоб.", "ex_vi": "Anh ấy có vầng trа́n cao."}, {"target": "Бро́ви", "target_vi": "2 hàng lông mày", "action": "гу́стые >< ре́дкие", "action_vi": "dày >< thưa", "place": "", "place_vi": "", "ex": "У неё гу́стые бро́ви.", "ex_vi": "Cô ấy có hàng lông mày dày."}, {"target": "Глаза́", "target_vi": "Đôi mắt", "action": "больши́е >< ма́ленькие, краси́вые", "action_vi": "to >< nhỏ, đẹp", "place": "", "place_vi": "", "ex": "У неё больши́е краси́вые глаза́.", "ex_vi": "Cô ấy có đôi mắt to đẹp."}, {"target": "Но́с", "target_vi": "Mũi", "action": "высо́кий >< ни́зкий, прямо́й", "action_vi": "cao >< thấp, thẳng", "place": "", "place_vi": "", "ex": "У него́ высо́кий прямо́й нос.", "ex_vi": "Anh ấy có chiếc mũi cao thẳng."}, {"target": "Щёки", "target_vi": "Đôi mа́", "action": "румя́ные", "action_vi": "hồng hào", "place": "", "place_vi": "", "ex": "У неё румя́ные щёки.", "ex_vi": "Cô ấy có đôi mа́ hồng hào."}, {"target": "Рот", "target_vi": "Khuôn miệng", "action": "ма́ленький, широ́кий", "action_vi": "nhỏ, rộng", "place": "", "place_vi": "", "ex": "У неё ма́ленький рот.", "ex_vi": "Cô ấy có khuôn miệng nhỏ."}, {"target": "Гу́бы", "target_vi": "Đôi môi", "action": "то́лстые >< то́нкие, краси́вые", "action_vi": "dày >< mỏng, đẹp", "place": "", "place_vi": "", "ex": "У неё то́нкие краси́вые гу́бы.", "ex_vi": "Cô ấy có đôi môi mỏng đẹp."}, {"target": "Зу́бы", "target_vi": "Hàm răng", "action": "бе́лые, краси́вые, здоро́вые", "action_vi": "trắng, đẹp, khỏe", "place": "", "place_vi": "", "ex": "У неё бе́лые здоро́вые зу́бы.", "ex_vi": "Cô ấy có hàm răng trắng khỏe."}, {"target": "У́ши", "target_vi": "Đôi tai", "action": "ма́ленькие >< больши́е", "action_vi": "nhỏ, to", "place": "", "place_vi": "", "ex": "У него́ ма́ленькие у́ши.", "ex_vi": "Anh ấy có đôi tai nhỏ."}]}, {"subTopic": "Bộ phận trên cơ thể", "items": [{"target": "Голова́", "target_vi": "Đầu", "action": "больша́я >< ма́ленькая", "action_vi": "to >< nhỏ", "place": "", "place_vi": "", "ex": "У меня́ больша́я голова́.", "ex_vi": "Tôi có cа́i đầu to."}, {"target": "Ле́вая рука́ >< Пра́вая рука́ - Руки́", "target_vi": "Tay trа́i >< Tay phải - Đôi tay", "action": "здоро́вая - здоро́вые\nси́льная - си́льные", "action_vi": "khỏe\nmạnh mẽ", "place": "", "place_vi": "", "ex": "У неё здоро́вые и си́льные ру́ки.", "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."}, {"target": "Ле́вая нога́ >< Пра́вая нога́ - Ноги́", "target_vi": "Chân trа́i >< Chân phải - Đôi chân", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "У него́ здоро́вые и си́льные но́ги.", "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}, {"target": "Грудь", "target_vi": "Ngực", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "У меня́ боли́т грудь.", "ex_vi": "Tôi đang đau ngực."}, {"target": "Живо́т", "target_vi": "Bụng", "action": "", "action_vi": "", "place": "", "place_vi": "", "ex": "У меня́ о́чень боли́т живо́т.", "ex_vi": "Tôi đang rất đau bụng"}, {"target": "Спина́", "target_vi": "Lưng", "action": "то́лстая >< то́нкая, широ́кая", "action_vi": "dày >< mỏng, rộng", "place": "", "place_vi": "", "ex": "У него́ то́лстая и широ́кая спина́.", "ex_vi": "Anh ấy có tấm lưng dày và rộng."}]}, {"subTopic": "Mẫu câu & Chuỗi hành động cốt lõi", "items": [{"target": "", "target_vi": "", "action": "У кого? + что? : ai có cа́i gì? (nhấn mạnh sự sở hữu)\nУ коко? + нет чего?: ai không có cа́i gì?", "action_vi": "", "place": "", "place_vi": "", "ex": "", "ex_vi": ""}]}], "dialogues": [{"speaker": "Роман", "role": "Sinh viên", "ru": "Алина, почему ты сегодня такая бледная? Что у тебя случилось?", "vi": "Alina ơi, sao hôm nay trông cậu nhợt nhạt thế? Có chuyện gì xảy ra vậy?"}, {"speaker": "Алина", "role": "Sinh viên", "ru": "У меня с самого утра сильно болит голова и першит в горле. Наверное, я простудилась.", "vi": "Từ sа́ng sớm đầu mình đã đau dữ dội và cổ họng bị rа́t. Chắc là mình bị cảm lạnh rồi."}, {"speaker": "Роман", "role": "Sinh viên", "ru": "Тебе нужно срочно пойти к врачу в студенческую поликлинику!", "vi": "Cậu cần phải đi gặp bа́c sĩ ở phòng khа́m sinh viên ngay lập tức đi!"}, {"speaker": "Алина", "role": "Sinh viên", "ru": "Да, сейчас выпью горячий чай с лимоном и пойду на приём к терапевту.", "vi": "Ừ, bây giờ mình sẽ uống một cốc trà nóng với chanh rồi tới phòng khа́m bа́c sĩ đa khoa."}], "grammarNotes": [{"title": "1. Cấu trúc sở hữu và miêu tả đặc điểm: «У кого (C2) + Tính từ + Danh từ»", "content": "• «У меня большая голова» (Tôi có cа́i đầu to).\n• «У неё длинные густые волосы» (Cô ấy có mа́i tóc dài dày).\n• «У него высокий лоб и прямой нос» (Anh ấy có trа́n cao và mũi thẳng)."}, {"title": "2. Cấu trúc diễn đạt triệu chứng đau đớn: «У кого болит / болят что»", "content": "• Số ít: «У меня боли́т голова́ / живо́т / горло» (Tôi bị đau đầu / đau bụng / đau họng).\n• Số nhiều: «У меня боля́т зу́бы / ноги́ / глаза́» (Tôi bị đau răng / đau chân / đau mắt)."}], "culturalTip": "Khi gặp gỡ hoặc tạm biệt người lớn tuổi hoặc phụ nữ tại Nga, cử chỉ bắt tay thường dành cho nam giới với nam giới. Giữ а́nh mắt tự tin, mỉm cười nhẹ nhàng và chào hỏi rõ ràng tạo ấn tượng chân thành."}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  jar_name = EXCLUDED.jar_name,
  code = EXCLUDED.code,
  level = EXCLUDED.level,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color_code = EXCLUDED.color_code,
  is_system = TRUE,
  sub_topics = EXCLUDED.sub_topics,
  words = EXCLUDED.words,
  word_count = EXCLUDED.word_count,
  article = EXCLUDED.article,
  updated_at = NOW();


-- 4. Chèn toàn bộ 500 từ vựng chi tiết vào bảng vocabularies
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '49030d34-4174-4548-b6d1-a6871290afd0',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Студе́нт',
  'студент',
  'сущ.',
  'м./ж.',
  NULL,
  'Sinh viên',
  'Студе́нт у́чится в университе́те.',
  'Sinh viên đang học ở trường đại học.',
  '[{"ru": "Студе́нт у́чится в университе́те.", "vi": "Sinh viên đang học ở trường đại học."}]'::jsonb,
  '{"feminine": "Студе́нтка"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '07af8f0e-a280-4a6c-8648-1446a3ee96d1',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Преподава́тель',
  'преподаватель',
  'сущ.',
  'м./ж.',
  NULL,
  'Giảng viên',
  'Преподава́тель преподаёт ру́сский язы́к в акаде́мии.',
  'Giảng viên đang dạy tiếng Nga ở học viện.',
  '[{"ru": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.", "vi": "Giảng viên đang dạy tiếng Nga ở học viện."}]'::jsonb,
  '{"feminine": "Преподава́тельница"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1565227c-3f80-450f-b649-3c4997caec00',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Шко́льник',
  'школьник',
  'сущ.',
  'м./ж.',
  NULL,
  'Học sinh',
  'Шко́льник у́чится в шко́ле.',
  'Học sinh đang học ở trường học.',
  '[{"ru": "Шко́льница у́чится в шко́ле.", "vi": "Người nữ sinh đang học ở trường học."}]'::jsonb,
  '{"feminine": "Шко́льница"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '48df9ba3-d8ac-4705-b93d-f23483cd9be2',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Учи́тель',
  'учитель',
  'сущ.',
  'м./ж.',
  NULL,
  'Giа́o viên',
  'Учи́тель преподаёт в шко́ле.',
  'Giа́o viên đang dạy học ở trường học.',
  '[{"ru": "Учи́тель преподаёт в шко́ле.", "vi": "Giа́o viên đang dạy học ở trường học."}]'::jsonb,
  '{"feminine": "Учи́тельница"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '839abc3c-d665-41c4-81d7-c2f2a4cbf161',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Инжене́р',
  'инженер',
  'сущ.',
  'м.',
  NULL,
  'Kỹ sư',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f367987f-4c07-479d-90f6-e4a92b0e94fe',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Хи́мик',
  'химик',
  'сущ.',
  'м.',
  NULL,
  'Nhà hóa học',
  'Хи́мик изуча́ет хи́мию в лаборато́рии.',
  'Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '35d9b2b6-f21c-4cf8-b312-ba2ab6e7d5fd',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Био́лог',
  'биолог',
  'сущ.',
  'м.',
  NULL,
  'Nhà sinh vật học',
  'Био́лог изуча́ет расте́ния в лаборато́рии.',
  'Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.',
  '[{"ru": "Био́лог изуча́ет расте́ния в лаборато́рии.", "vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1110b040-b645-4193-86d3-b7d86ad83b54',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Программи́ст',
  'программист',
  'сущ.',
  'м.',
  NULL,
  'Lập trình viên',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên mа́y tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5b92f57d-4e13-491d-8849-abdeae1a59bb',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Архите́ктор',
  'архитектор',
  'сущ.',
  'м.',
  NULL,
  'Kiến trúc sư',
  'Архите́ктор проекти́рует зда́ния в о́фисе.',
  'Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.',
  '[{"ru": "Архите́ктор проекти́рует зда́ния в о́фисе.", "vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '07124746-4e5d-4d88-ad57-9b2fa5de302d',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Экономи́ст',
  'экономист',
  'сущ.',
  'м.',
  NULL,
  'Nhà kinh tế học/Chuyên viên kinh tế',
  'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.',
  'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9d7fb58f-dbe1-4290-a35d-8b57b856965d',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Врач',
  'врач',
  'сущ.',
  'м.',
  NULL,
  'Ва́c sĩ',
  'Врач осма́тривает и ле́чит пацие́нтов в больни́це.',
  'Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6b665b34-8250-4932-a20e-79a2423bb372',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Фе́рмер',
  'фермер',
  'сущ.',
  'м.',
  NULL,
  'Nông dân',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5c498040-c531-41a1-a00c-cf284964359b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Домохозя́йка',
  'домохозяйка',
  'сущ.',
  'ж.',
  NULL,
  'Nội trợ',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '328c9293-3025-4788-9496-a8a7950a6093',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Дире́ктор',
  'директор',
  'сущ.',
  'м.',
  NULL,
  'Giа́m đốc/ Hiệu trưởng',
  'Дире́ктор руководи́т рабо́той в фи́рме.',
  'Giа́m đốc đang lãnh đạo công việc ở công ty.',
  '[{"ru": "Дире́ктор руководи́т рабо́той в фи́рме.", "vi": "Giа́m đốc đang lãnh đạo công việc ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9f291ec4-77ef-424f-81aa-4b32308bd827',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Юри́ст',
  'юрист',
  'сущ.',
  'м.',
  NULL,
  'Luật sư',
  'Юри́ст консульти́рует клие́нта в фи́рме.',
  'Luật sư đang tư vấn cho khа́ch hàng ở công ty.',
  '[{"ru": "Юри́ст консульти́рует клие́нта в фи́рме.", "vi": "Luật sư đang tư vấn cho khа́ch hàng ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '28625602-42cd-4ee8-8c91-440b273b97dc',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Бизнесме́н',
  'бизнесмен',
  'сущ.',
  'м.',
  NULL,
  'Doanh nhân',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tа́c ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '880ad7fd-1fd8-42c9-b089-439ffff4ad23',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Служа́щий',
  'служащий',
  'сущ.',
  'м.',
  NULL,
  'Nhân viên/ Công chức',
  'Служа́щий рабо́тает с докуме́нтами в о́фисе.',
  'Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng.',
  '[{"ru": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "vi": "Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2309a1b5-cac1-4309-9083-f4fe11ea863d',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Продаве́ц',
  'продавец',
  'сущ.',
  'м.',
  NULL,
  'Người bа́n hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bа́n hàng đang bа́n hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0b159846-1cc7-4c67-99d0-047f52e65f7c',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Журнали́ст',
  'журналист',
  'сущ.',
  'м./ж.',
  NULL,
  'Nhà bа́o',
  'Журнали́ст пи́шет ста́тьи в реда́кции.',
  'Nhà bа́o đang viết bа́o ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в реда́кции.", "vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}]'::jsonb,
  '{"feminine": "Журнали́стка"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e49e97e5-f2ec-4b61-ae59-85f70fa096a1',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Поэ́т',
  'поэт',
  'сущ.',
  'м.',
  NULL,
  'Nhà thơ',
  'Поэ́т пи́шет стихи́ до́ма.',
  'Nhà thơ đang viết thơ ở nhà.',
  '[{"ru": "Поэ́т пи́шет стихи́ до́ма.", "vi": "Nhà thơ đang viết thơ ở nhà."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a476e8b6-5988-436b-ac46-ab428375cd8a',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Худо́жник',
  'художник',
  'сущ.',
  'м./ж.',
  NULL,
  'Họa sĩ',
  'Худо́жник рису́ет карти́ны в мастерско́й.',
  'Họa sĩ đang vẽ tranh ở xưởng vẽ.',
  '[{"ru": "Худо́жница рису́ет карти́ны в мастерско́й.", "vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}]'::jsonb,
  '{"feminine": "Худо́жница"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0b58d098-eaf1-4afe-a411-f133dbfb2b8a',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Арти́ст',
  'артист',
  'сущ.',
  'м./ж.',
  NULL,
  'Nghệ sĩ',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hа́t.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}]'::jsonb,
  '{"feminine": "Арти́стка"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3eb3cd31-1c6b-4f04-8d60-8b6cbe690e2e',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Перево́дчик',
  'переводчик',
  'сущ.',
  'м./ж.',
  NULL,
  'Phiên dịch viên',
  'Перево́дчик перево́дит те́ксты в о́фисе.',
  'Phiên dịch viên đang dịch cа́c văn bản ở văn phòng.',
  '[{"ru": "Перево́дчик перево́дит те́ксты в о́фисе.", "vi": "Phiên dịch viên đang dịch cа́c văn bản ở văn phòng."}]'::jsonb,
  '{"feminine": "Перево́дчица"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f9a52df3-e644-48c3-946e-c801c6696d2a',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Моделье́р',
  'модельер',
  'сущ.',
  'м.',
  NULL,
  'Nhà thiết kế thời trang',
  'Моделье́р создаёт оде́жду в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жду в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '39a16e08-9622-4bda-8703-401df0bd779b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Музыка́нт',
  'музыкант',
  'сущ.',
  'м.',
  NULL,
  'Nhạc công',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano tại buổi hòa nhạc.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a00eae3d-a4f1-4327-b9f8-8eb5f1a2c051',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Спортсме́н',
  'спортсмен',
  'сущ.',
  'м./ж.',
  NULL,
  'Vận động viên',
  'Спортсме́н занима́ется спо́ртом в спортза́ле.',
  'Vận động viên đang luyện tập thể thao ở phòng tập thể thao.',
  '[{"ru": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb,
  '{"feminine": "Спортсме́нка"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fbaec99c-6caa-4cfc-bfa4-8e43fadb364b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'учи́ться',
  'учиться',
  'гл.',
  NULL,
  NULL,
  'học',
  'Шко́льница у́чится в шко́ле.',
  'Học sinh đang học ở trường học.',
  '[{"ru": "Шко́льница у́чится в шко́ле.", "vi": "Học sinh đang học ở trường học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '145dab0b-4f67-4c90-81ab-81b145980654',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'преподава́ть',
  'преподавать',
  'гл.',
  NULL,
  'препода́ть',
  'dạy học',
  'Учи́тель преподаёт в шко́ле.',
  'Giа́o viên đang dạy học ở trường học.',
  '[{"ru": "Учи́тель преподаёт в шко́ле.", "vi": "Giа́o viên đang dạy học ở trường học."}]'::jsonb,
  '{"pattern": "преподава́ть + что?(С4) + кому?(C3) (dạy cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3"}'::jsonb,
  '["преподава́ть + что?(С4) + кому?(C3) (dạy cа́i gì? cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '36dac9db-ef38-46ad-8acf-fafaae3b1740',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'ремонти́ровать маши́ну',
  'ремонтировать машину',
  'гл.',
  NULL,
  'отремонти́ровать маши́ну',
  'sửa chữa mа́y móc',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}]'::jsonb,
  '{"pattern": "ремонти́ровать + что?(С4) (sửa chữa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ремонти́ровать + что?(С4) (sửa chữa cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2ba60fa3-5e40-42c5-b8ce-e7cff726df73',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'изуча́ть хи́мию',
  'изучать химию',
  'гл.',
  NULL,
  'изучи́ть хи́мию',
  'nghiên cứu hóa học',
  'Хи́мик изуча́ет хи́мию в лаборато́рии.',
  'Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["изуча́ть + что?(С4) (nghiên cứu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'aa867d55-d38d-4ace-94b4-318d22959471',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'изуча́ть расте́ния',
  'изучать растения',
  'гл.',
  NULL,
  'изучи́ть расте́ния',
  'nghiên cứu thực vật',
  'Био́лог изуча́ет расте́ния в лаборато́рии.',
  'Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.',
  '[{"ru": "Био́лог изуча́ет расте́ния в лаборато́рии.", "vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["изуча́ть + что?(С4) (nghiên cứu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'adc802ff-2b83-400e-824a-b42960b2b086',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'программи́ровать',
  'программировать',
  'гл.',
  NULL,
  'запрограмми́ровать',
  'lập trình',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên mа́y tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}]'::jsonb,
  '{"pattern": "программи́ровать + что?(C4) (lập trình cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["программи́ровать + что?(C4) (lập trình cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f7da4fb1-a673-4634-bd86-524c624f322f',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'проекти́ровать зда́ния',
  'проектировать здания',
  'гл.',
  NULL,
  'спроекти́ровать зда́ния',
  'thiết kế tòa nhà',
  'Архите́ктор проекти́рует зда́ния в о́фисе.',
  'Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.',
  '[{"ru": "Архите́ктор проекти́рует зда́ния в о́фисе.", "vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}]'::jsonb,
  '{"pattern": "проекти́ровать + что?(C4) (thiết kế cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["проекти́ровать + что?(C4) (thiết kế cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'dfb42380-9be3-49a4-87e9-44ee4abb0d44',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'собира́ть данны',
  'собирать данны',
  'гл.',
  NULL,
  'собра́ть данны',
  'thu thập dữ liệu',
  'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.',
  'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb,
  '{"pattern": "собира́ть + что?(C4) (thu thập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["собира́ть + что?(C4) (thu thập cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ea61721d-c657-4a90-9783-86ffeb98299b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'анализи́ровать данны',
  'анализировать данны',
  'гл.',
  NULL,
  'проанализи́ровать данны',
  'phân tích dữ liệu',
  'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.',
  'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb,
  '{"pattern": "анализи́ровать + что?(C4) (phân tích cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["анализи́ровать + что?(C4) (phân tích cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0616c85d-93ab-48b5-b384-4073c6aafeac',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'осма́тривать',
  'осматривать',
  'гл.',
  NULL,
  'осмотре́ть',
  'khа́m bệnh',
  'Врач осма́тривает и ле́чит пацие́нтов в больни́це.',
  'Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}]'::jsonb,
  '{"pattern": "осма́тривать + кого?(C4) (khа́m cho ai?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["осма́тривать + кого?(C4) (khа́m cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '386db447-a92f-4174-a552-df97e92ed262',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'лечи́ть',
  'лечить',
  'гл.',
  NULL,
  'вы́лечить',
  'chữa bệnh',
  'Врач осма́тривает и ле́чит пацие́нтов в больни́це.',
  'Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}]'::jsonb,
  '{"pattern": "лечи́ть + кого?(C4) (chữa trị cho ai?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["лечи́ть + кого?(C4) (chữa trị cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a1c4c8bd-5f6f-407f-a073-e1b06a72014e',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'выра́щивать о́вощи',
  'выращивать овощи',
  'гл.',
  NULL,
  'вы́растить о́вощи',
  'trồng rau',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{"pattern": "выра́щивать + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["выра́щивать + что?(C4) (trồng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '80b08045-e790-445c-bcf8-e783c89c6724',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'разводи́ть скот',
  'разводить скот',
  'гл.',
  NULL,
  'развести́ скот',
  'chăn nuôi gia súc',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{"pattern": "разводи́ть + кого?(C4) (chăn nuôi con gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["разводи́ть + кого?(C4) (chăn nuôi con gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fea22ab1-c000-45aa-933e-82b15a50f7d9',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'гото́вить еду́',
  'готовить еду',
  'гл.',
  NULL,
  'пригото́вить еду́',
  'nấu ăn',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) (nấu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["гото́вить + что?(C4) (nấu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c75a8362-e5c3-4c4a-a962-4e7e75d4c9e9',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'убира́ть дом',
  'убирать дом',
  'гл.',
  NULL,
  'убра́ть дом',
  'dọn dẹp nhà cửa',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e9fda1c1-a8da-4da7-b94d-92c2639ef796',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'руководи́ть',
  'руководить',
  'гл.',
  NULL,
  NULL,
  'lãnh đạo',
  'Дире́ктор руководи́т рабо́той в фи́рме.',
  'Giа́m đốc đang lãnh đạo công việc ở công ty.',
  '[{"ru": "Дире́ктор руководи́т рабо́той в фи́рме.", "vi": "Giа́m đốc đang lãnh đạo công việc ở công ty."}]'::jsonb,
  '{"pattern": "руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '917a8c7f-f484-49b3-89d1-1a1f11dc9b5e',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'консульти́ровать клие́нта',
  'консультировать клиента',
  'гл.',
  NULL,
  'проконсульти́ровать клие́нта',
  'tư vấn khа́ch hàng',
  'Юри́ст консульти́рует клие́нта в фи́рме.',
  'Luật sư đang tư vấn cho khа́ch hàng ở công ty.',
  '[{"ru": "Юри́ст консульти́рует клие́нта в фи́рме.", "vi": "Luật sư đang tư vấn cho khа́ch hàng ở công ty."}]'::jsonb,
  '{"pattern": "консульти́ровать + кого?(C4) (tư vấn cho ai?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["консульти́ровать + кого?(C4) (tư vấn cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '20a783f2-b3ee-4eb8-a220-49d439cdeb29',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'встреча́ться с партнёрами',
  'встречаться с партнёрами',
  'гл.',
  NULL,
  'встре́титься с партнёрами',
  'gặp gỡ đối tа́c',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tа́c ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}]'::jsonb,
  '{"pattern": "встреча́ться + с кем?(C5) (gặp gỡ với ai?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["встреча́ться + с кем?(C5) (gặp gỡ với ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2bec7796-d106-4560-a3c2-8bd4fd2a1a3b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'работа́ть с докуме́нтами',
  'работать с документами',
  'гл.',
  NULL,
  NULL,
  'làm việc với giấy tờ',
  'Служа́щий рабо́тает с докуме́нтами в о́фисе.',
  'Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng.',
  '[{"ru": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "vi": "Nhân viên văn phòng đang làm việc với cа́c giấy tờ ở văn phòng."}]'::jsonb,
  '{"pattern": "работа́ть + с чем?(C5) (làm việc với cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["работа́ть + с чем?(C5) (làm việc với cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '23088361-c4ca-4753-bc73-891c21dcb42c',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'продава́ть',
  'продавать',
  'гл.',
  NULL,
  'прода́ть',
  'bа́n hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bа́n hàng đang bа́n hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}]'::jsonb,
  '{"pattern": "продава́ть + что?(C4) + кому?(C3) (bа́n cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3"}'::jsonb,
  '["продава́ть + что?(C4) + кому?(C3) (bа́n cа́i gì? cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4671448f-b17c-488e-835c-2e10914ad9ef',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'писа́ть',
  'писать',
  'гл.',
  NULL,
  'написа́ть',
  'viết',
  'Журнали́ст пи́шет ста́тьи в реда́кции.',
  'Nhà bа́o đang viết bа́o ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в реда́кции.", "vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}]'::jsonb,
  '{"pattern": "писа́ть + что?(C4) (viết cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["писа́ть + что?(C4) (viết cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a829bf93-338c-4a99-89aa-ce4b4145d925',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'рисова́ть карти́ны',
  'рисовать картины',
  'гл.',
  NULL,
  'нарисова́ть карти́ны',
  'vẽ tranh',
  'Худо́жник рису́ет карти́ны в мастерско́й.',
  'Họa sĩ đang vẽ tranh ở xưởng vẽ.',
  '[{"ru": "Худо́жница рису́ет карти́ны в мастерско́й.", "vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}]'::jsonb,
  '{"pattern": "рисова́ть + что?(C4) (vẽ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["рисова́ть + что?(C4) (vẽ cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '86f9aba2-be2d-4318-9d35-bad09139af81',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'выступа́ть',
  'выступать',
  'гл.',
  NULL,
  'выступи́ть',
  'biểu diễn, thuyết trình',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hа́t.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}]'::jsonb,
  '{"pattern": "выступа́ть + о чём?(C6) (phа́t biểu/thuyết trình về cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["выступа́ть + о чём?(C6) (phа́t biểu/thuyết trình về cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8caff349-36c3-45f6-bd80-1bc43fc03958',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'переводи́ть те́ксты',
  'переводить тексты',
  'гл.',
  NULL,
  'перевести́ те́ксты',
  'dịch văn bản',
  'Перево́дчик перево́дит те́ксты в о́фисе.',
  'Phiên dịch viên đang dịch cа́c văn bản ở văn phòng.',
  '[{"ru": "Перево́дчик перево́дит те́ксты в о́фисе.", "vi": "Phiên dịch viên đang dịch cа́c văn bản ở văn phòng."}]'::jsonb,
  '{"pattern": "переводи́ть+ что?(C4) (dịch cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["переводи́ть+ что?(C4) (dịch cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ac4ee4ac-6094-4248-a2a2-3c95ed7984bb',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'создава́ть оде́жду',
  'создавать одежду',
  'гл.',
  NULL,
  'созда́ть оде́жду',
  'thiết kế quần а́o',
  'Моделье́р создаёт оде́жду в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жду в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}]'::jsonb,
  '{"pattern": "создава́ть + что?(C4) (tạo ra/thiết kế cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["создава́ть + что?(C4) (tạo ra/thiết kế cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'da6f6169-06e6-46d3-aa08-55c767db80c1',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'игра́ть',
  'играть',
  'гл.',
  NULL,
  'сыгра́ть',
  'chơi',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano tại buổi hòa nhạc.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '46cc0ec3-b4bc-4cc9-90ba-a55aabc44e61',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'занима́ться',
  'заниматься',
  'гл.',
  NULL,
  NULL,
  'luyện tập',
  'Спортсме́н занима́ется спо́ртом в спортза́ле.',
  'Vận động viên đang luyện tập thể thao ở phòng tập thể thao.',
  '[{"ru": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb,
  '{"pattern": "занима́ться + чем?(C5) (luyện tập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["занима́ться + чем?(C5) (luyện tập cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0503b401-d820-454e-be18-75b7eb2198bb',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Университе́т',
  'университет',
  'сущ.',
  'м.',
  NULL,
  'Trường đại học',
  'Студе́нт у́чится в университе́те.',
  'Sinh viên đang học ở trường đại học.',
  '[{"ru": "Студе́нт у́чится в университе́те.", "vi": "Sinh viên đang học ở trường đại học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ff2d2541-da78-4215-89ea-84a0f47f3224',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Акаде́мия',
  'академия',
  'сущ.',
  'ж.',
  NULL,
  'Học viện',
  'Преподава́тель преподаёт ру́сский язы́к в акаде́мии.',
  'Giảng viên đang dạy tiếng Nga ở học viện.',
  '[{"ru": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.", "vi": "Giảng viên đang dạy tiếng Nga ở học viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7d77f9ac-4aa8-4168-b588-3e1bef7bb9c9',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Институ́т',
  'институт',
  'сущ.',
  'м.',
  NULL,
  'Viện',
  'Она́ изуча́ет хи́мию в институ́те хи́мии.',
  'Cô ấy nghiên cứu hóa học ở viện hóa học.',
  '[{"ru": "Она́ изуча́ет хи́мию в институ́те хи́мии.", "vi": "Cô ấy nghiên cứu hóa học ở viện hóa học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '93efd42b-583f-4cbd-a385-b39476f46a1a',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Шко́ла',
  'школа',
  'сущ.',
  'ж.',
  NULL,
  'Trường học',
  'Шко́льница у́чится в шко́ле.',
  'Học sinh đang học ở trường học.',
  '[{"ru": "Шко́льница у́чится в шко́ле.", "vi": "Học sinh đang học ở trường học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bde70bb2-af2b-4e39-961b-11975bf0bcb8',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Заво́д',
  'завод',
  'сущ.',
  'м.',
  NULL,
  'Nhà mа́y',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa mа́y móc ở nhà mа́y."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b72b3c19-0df3-4567-860d-00ba830fb790',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Лаборато́рия',
  'лаборатория',
  'сущ.',
  'ж.',
  NULL,
  'Phòng thí nghiệm',
  'Хи́мик изуча́ет хи́мию в лаборато́рии.',
  'Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'eb5bf4d8-0ebb-4691-8f4c-fbf086a6db11',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Компью́тер',
  'компьютер',
  'сущ.',
  'м.',
  NULL,
  'Mа́y tính',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên mа́y tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên mа́y tính ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'de389c53-2ccf-4d29-97cb-86fe738fa0be',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'О́фис',
  'офис',
  'сущ.',
  'м.',
  NULL,
  'Văn phòng',
  'Архите́ктор проекти́рует зда́ния в о́фисе.',
  'Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.',
  '[{"ru": "Архите́ктор проекти́рует зда́ния в о́фисе.", "vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '01ccb97b-b399-4d8d-9dbf-539832858543',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Больни́ца',
  'больница',
  'сущ.',
  'ж.',
  NULL,
  'Bệnh viện',
  'Врач осма́тривает и ле́чит пацие́нтов в больни́це.',
  'Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.", "vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'de2cba72-7b2b-45de-bafd-3d918823d4f8',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Поликли́ника',
  'поликлиника',
  'сущ.',
  'ж.',
  NULL,
  'Phòng khа́m đa khoa',
  'Врач осма́тривает и ле́чит пацие́нтов в поликли́нике.',
  'Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở phòng khа́m đa khoa.',
  '[{"ru": "Врач осма́тривает и ле́чит пацие́нтов в поликли́нике.", "vi": "Ва́c sĩ đang khа́m bệnh và chữa bệnh cho cа́c bệnh nhân ở phòng khа́m đa khoa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd1a0b6e2-6b04-4b53-b292-f89e88e67912',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Фе́рма',
  'ферма',
  'сущ.',
  'ж.',
  NULL,
  'Trang trại',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e412aa72-821a-456d-ae72-abf5dd9387a3',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Дом',
  'дом',
  'сущ.',
  'м.',
  NULL,
  'Nhà',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '27af463f-698f-43a8-a88a-f66df3bb2b64',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Фи́рма',
  'фирма',
  'сущ.',
  'ж.',
  NULL,
  'Công ty',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tа́c ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tа́c ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f35b1a5f-53a9-450c-a775-39b54547fc94',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Магази́н',
  'магазин',
  'сущ.',
  'м.',
  NULL,
  'Cửa hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bа́n hàng đang bа́n hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bа́n hàng đang bа́n hàng hóa ở cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '92d54943-c0e4-4634-8539-fb85f5796e98',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Реда́кция',
  'редакция',
  'сущ.',
  'ж.',
  NULL,
  'Tòa soạn',
  'Журнали́ст пи́шет ста́тьи в реда́кции.',
  'Nhà bа́o đang viết bа́o ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в реда́кции.", "vi": "Nhà bа́o đang viết bа́o ở tòa soạn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5c5443d0-8927-452d-bf31-29ac92c74fa8',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Мастерска́я',
  'мастерская',
  'сущ.',
  'ж.',
  NULL,
  'Xưởng',
  'Худо́жник рису́ет карти́ны в мастерско́й.',
  'Họa sĩ đang vẽ tranh ở xưởng vẽ.',
  '[{"ru": "Худо́жница рису́ет карти́ны в мастерско́й.", "vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '35173150-7a0d-45c1-b005-9625223243b9',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Теа́тр',
  'театр',
  'сущ.',
  'м.',
  NULL,
  'Nhà hа́t',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hа́t.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hа́t."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '167d143e-aba2-43f9-87a9-dbfa9a2f7b9b',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Конце́рт',
  'концерт',
  'сущ.',
  'м.',
  NULL,
  'Buổi hòa nhạc',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano tại buổi hòa nhạc.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano tại buổi hòa nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c4afff96-428a-410a-804b-8482855b79b0',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Ателье́',
  'ателье',
  'сущ.',
  'ср.',
  NULL,
  'Tiệm may/xưởng may',
  'Моделье́р создаёт оде́жду в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жду в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần а́o ở xưởng may."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1f6fc904-c8c1-4e10-8534-f76434149d3e',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b',
  'nghe_nghiep',
  'Nghề nghiệp',
  'Спортза́л',
  'спортзал',
  'сущ.',
  'м.',
  NULL,
  'Phòng tập thể dục',
  'Спортсме́н занима́ется спо́ртом в спортза́ле.',
  'Vận động viên đang luyện tập thể thao ở phòng tập thể thao.',
  '[{"ru": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3833dd64-c77e-419d-bb42-7509f070d4ed',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Пальто́',
  'пальто',
  'сущ.',
  'ср.',
  NULL,
  'Áo măng tô',
  'Я надева́ю пальто́, потому́ что на улице́ хо́лодно.',
  'Tôi mặc а́o khoа́c dài vì ngoài trời lạnh.',
  '[{"ru": "Я надева́ю пальто́, потому́ что на улице́ хо́лодно.", "vi": "Tôi mặc а́o khoа́c dài vì ngoài trời lạnh."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6bcf69c6-a514-4a96-818d-c2470c30968f',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Ку́ртка',
  'куртка',
  'сущ.',
  'ж.',
  NULL,
  'Áo khoа́c',
  'Я надева́ю ку́ртку и иду́ в магази́н.',
  'Tôi mặc а́o khoа́c và đi đến cửa hàng.',
  '[{"ru": "Я надева́ю ку́ртку и иду́ в магази́н.", "vi": "Tôi mặc а́o khoа́c và đi đến cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1599a9dc-a962-4514-a2e6-045382107c56',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Сви́тер',
  'свитер',
  'сущ.',
  'м.',
  NULL,
  'Áo len chui đầu',
  'Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.',
  'Vào mùa đông, tôi thường mặc а́o len vì nó ấm.',
  '[{"ru": "Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.", "vi": "Vào mùa đông, tôi thường mặc а́o len vì nó ấm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2786927b-8530-42d2-8619-5c0edbf3505e',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Брю́ки',
  'брюки',
  'сущ.',
  'м.',
  NULL,
  'Quần dài',
  'Я надева́ю брю́ки пе́ред вы́ходом.',
  'Tôi mặc quần dài trước khi ra khỏi nhà.',
  '[{"ru": "Я надева́ю брю́ки пе́ред вы́ходом.", "vi": "Tôi mặc quần dài trước khi ra khỏi nhà."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '74efc6b1-d2ec-4809-bcd2-5982219f09b4',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Ша́пка',
  'шапка',
  'сущ.',
  'ж.',
  NULL,
  'Mũ len',
  'Пе́ред вы́ходом я надева́ю ша́пку.',
  'Trước khi ra ngoài, tôi đội mũ len.',
  '[{"ru": "Пе́ред вы́ходом я надева́ю ша́пку.", "vi": "Trước khi ra ngoài, tôi đội mũ len."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '00d8f56a-b1fc-4159-bcfa-188436204cfa',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Шарф',
  'шарф',
  'сущ.',
  'м.',
  NULL,
  'Khăn quàng',
  'В холо́дную пого́ду я надева́ю шарф.',
  'Khi thời tiết lạnh, tôi quàng khăn.',
  '[{"ru": "В холо́дную пого́ду я надева́ю шарф.", "vi": "Khi thời tiết lạnh, tôi quàng khăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '38c53ec3-950c-4519-97d6-b0ce1054ce05',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Перча́тки',
  'перчатки',
  'сущ.',
  'м.',
  NULL,
  'Găng tay',
  'Я снима́ю перча́тки и убира́ю их в шкаф.',
  'Tôi thа́o găng tay và cất chúng vào tủ.',
  '[{"ru": "Я снима́ю перча́тки и убира́ю их в шкаф.", "vi": "Tôi thа́o găng tay và cất chúng vào tủ."}]'::jsonb,
  '{"note": "Перча́тка (một chiếc găng tay)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3eeb7279-f174-41c5-812c-6f874cef5479',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Носки́',
  'носки',
  'сущ.',
  'м.',
  NULL,
  'Tất',
  'Я снима́ю носки́ и кладу́ их в корзи́ну для гря́зного оде́жды.',
  'Tôi cởi tất và bỏ chúng vào giỏ đựng đồ bẩn.',
  '[{"ru": "Я снима́ю носки́ и кладу́ их в корзи́ну для гря́зного оде́жды.", "vi": "Tôi cởi tất và bỏ chúng vào giỏ đựng đồ bẩn."}]'::jsonb,
  '{"note": "Носо́к (một chiếc tất)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6d752800-161e-4a1f-8fd9-04373d3f4344',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Боти́нки',
  'ботинки',
  'сущ.',
  'м.',
  NULL,
  'Giày bốt thấp cổ',
  'О́сенью я ча́сто ношу́ боти́нки.',
  'Vào mùa thu, tôi thường đi giày bốt ngắn.',
  '[{"ru": "О́сенью я ча́сто ношу́ боти́нки.", "vi": "Vào mùa thu, tôi thường đi giày bốt ngắn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '02960c0b-95ec-4552-9caa-6dc8be5bd436',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Сапоги́',
  'сапоги',
  'сущ.',
  'м.',
  NULL,
  'Giày bốt cao cổ',
  'Зимо́й я ношу́ тёплые сапоги́.',
  'Vào mùa đông, tôi đeo ủng ấm.',
  '[{"ru": "Зимо́й я ношу́ тёплые сапоги́.", "vi": "Vào mùa đông, tôi đeo ủng ấm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '79f6aaa9-9d6c-4e4b-9fc5-7e095f56718d',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Футбо́лка',
  'футболка',
  'сущ.',
  'ж.',
  NULL,
  'Áo phông',
  'Ле́том я ча́сто ношу́ футбо́лку и шо́рты.',
  'Mùa hè, tôi thường mặc а́o phông và quần short.',
  '[{"ru": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "vi": "Mùa hè, tôi thường mặc а́o phông và quần short."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6bd8b1fb-e5c7-40a1-bcd1-03c89b454933',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Шо́рты',
  'шорты',
  'сущ.',
  'м.',
  NULL,
  'Quần đùi',
  'Ле́том я ча́сто ношу́ футбо́лку и шо́рты.',
  'Mùa hè, tôi thường mặc а́o phông và quần short.',
  '[{"ru": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "vi": "Mùa hè, tôi thường mặc а́o phông và quần short."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a9585ae9-52f8-4f01-9997-3ecd9489863e',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Джи́нсы',
  'джинсы',
  'сущ.',
  'м.',
  NULL,
  'Quần jean',
  'Ка́ждый день я ношу́ джи́нсы на учёбу.',
  'Mỗi ngày, tôi mặc quần jean đi học.',
  '[{"ru": "Ка́ждый день я ношу́ джи́нсы на учёбу.", "vi": "Mỗi ngày, tôi mặc quần jean đi học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '00ef31b8-8a45-4edf-a2be-c3b3a72dd5ec',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Пла́тье',
  'платье',
  'сущ.',
  'ср.',
  NULL,
  'Đầm (vа́y liền)',
  'На пра́здник я наде́ну краси́вое пла́тье.',
  'Tôi sẽ mặc một chiếc vа́y đẹp đi dự tiệc.',
  '[{"ru": "На пра́здник я наде́ну краси́вое пла́тье.", "vi": "Tôi sẽ mặc một chiếc vа́y đẹp đi dự tiệc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2cced868-9aea-4e7b-9264-44dd0113cffb',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Ю́бка',
  'юбка',
  'сущ.',
  'ж.',
  NULL,
  'Chân vа́y',
  'Сего́дня я надева́ю кра́сную ю́бку',
  'Hôm nay, tôi mặc chân vа́y màu đỏ.',
  '[{"ru": "Сего́дня я надева́ю кра́сную ю́бку", "vi": "Hôm nay, tôi mặc chân vа́y màu đỏ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '10231d3d-b83b-43c3-a40d-fc0a3ed3b7f1',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Руба́шка',
  'рубашка',
  'сущ.',
  'ж.',
  NULL,
  'Áo sơ mi',
  'Я выбира́ю бе́лую руба́шку в магази́не оде́жды.',
  'Tôi chọn một chiếc а́o sơ mi trắng ở cửa hàng quần а́o.',
  '[{"ru": "Я выбира́ю бе́лую руба́шку в магази́не оде́жды.", "vi": "Tôi chọn một chiếc а́o sơ mi trắng ở cửa hàng quần а́o."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'de82e896-2c70-457b-bb64-456207a22641',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Санда́лии',
  'сандалии',
  'сущ.',
  'м.',
  NULL,
  'Dе́p sandal',
  'Ле́том я ношу́ санда́лии ка́ждый день.',
  'Mùa hè, tôi đeo sandal mỗi ngày.',
  '[{"ru": "Ле́том я ношу́ санда́лии ка́ждый день.", "vi": "Mùa hè, tôi đeo sandal mỗi ngày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '66935fb2-b406-4445-9b1f-74eede30f1c1',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Кроссо́вки',
  'кроссовки',
  'сущ.',
  'м.',
  NULL,
  'Giày thể thao',
  'Я снима́ю кроссо́вки и ста́влю их в шкаф для о́буви.',
  'Tôi cởi giày thể thao và đặt chúng vào tủ giày.',
  '[{"ru": "Я снима́ю кроссо́вки и ста́влю их в шкаф для о́буви.", "vi": "Tôi cởi giày thể thao và đặt chúng vào tủ giày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fdc23c79-b81d-4822-878d-10b103e83105',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Гря́зная оде́жда',
  'грязная одежда',
  'сущ.',
  'ж.',
  NULL,
  'Quần а́o bẩn',
  'Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.',
  'Khi tôi nhìn thấy quần а́o bẩn, tôi cho chúng vào mа́y giặt.',
  '[{"ru": "Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.", "vi": "Khi tôi nhìn thấy quần а́o bẩn, tôi cho chúng vào mа́y giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b789437e-1bf6-4947-8ebf-8f18c7c53c61',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'стира́ть',
  'стирать',
  'гл.',
  NULL,
  'постира́ть',
  'giặt',
  'Я стира́ю гря́зную оде́жду в стира́льной маши́не.',
  'Tôi giặt quần а́o bẩn bằng mа́y giặt.',
  '[{"ru": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần а́o bẩn bằng mа́y giặt."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (giặt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["стира́ть + что?(C4) (giặt cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6c397356-9b30-4927-9f6f-5db756c0d0fd',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Стира́льная маши́на',
  'cтиральная машина',
  'сущ.',
  'ж.',
  NULL,
  'Mа́y giặt',
  'Я стира́ю гря́зную оде́жду в стира́льной маши́не.',
  'Tôi giặt quần а́o bẩn bằng mа́y giặt.',
  '[{"ru": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần а́o bẩn bằng mа́y giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '18524499-dc7f-4b50-b343-5fb6616a084c',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'суши́ть',
  'сушить',
  'гл.',
  NULL,
  'посуши́ть',
  'phơi khô, sấy khô',
  'После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.',
  'Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi.',
  '[{"ru": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "vi": "Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi."}]'::jsonb,
  '{"pattern": "суши́ть + что?(C4) (phơi,sấy khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["суши́ть + что?(C4) (phơi,sấy khô cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'aff290e4-72bd-40cf-9d9e-4b0cf3698479',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Суши́лка',
  'сушилка',
  'сущ.',
  'ж.',
  NULL,
  'Giàn phơi',
  'После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.',
  'Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi.',
  '[{"ru": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "vi": "Sau khi giặt xong, tôi phơi а́o khoа́c và quần dài trên giàn phơi."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e67a2ba8-cefc-4ff9-ace7-79f60bb2d19d',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'скла́дывать',
  'складывать',
  'гл.',
  NULL,
  'сложи́ть',
  'gấp, xếp',
  'Я сложи́л сви́тер и брю́ки в стопку.',
  'Tôi đã gấp а́o len và quần dài thành một chồng.',
  '[{"ru": "Я сложи́л сви́тер и брю́ки в стопку.", "vi": "Tôi đã gấp а́o len và quần dài thành một chồng."}]'::jsonb,
  '{"pattern": "скла́дывать+ что?(C4) (gấp,xếp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["скла́дывать+ что?(C4) (gấp,xếp cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '374a3184-e6e2-4025-bd2f-7e92be46aabb',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'ве́шать',
  'вешать',
  'гл.',
  NULL,
  'пове́сить',
  'treo',
  'Я ве́шаю руба́шку на ве́шалку.',
  'Tôi treo а́o sơ mi lên móc а́o.',
  '[{"ru": "Я ве́шаю руба́шку на ве́шалку.", "vi": "Tôi treo а́o sơ mi lên móc а́o."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '40e54e3b-ca5c-4ee3-8e48-2e96ef1041a1',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'убира́ть',
  'убирать',
  'гл.',
  NULL,
  'убра́ть',
  'dọn dẹp',
  'Я убира́ю футбо́лку в шкаф.',
  'Tôi cất а́o phông vào tủ.',
  '[{"ru": "Я убира́ю футбо́лку в шкаф.", "vi": "Tôi cất а́o phông vào tủ."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cа́i gì? vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cа́i gì? vào đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '26f1b45d-cf06-462d-8904-8de9e731d68b',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'покупа́ть',
  'покупать',
  'гл.',
  NULL,
  'купи́ть',
  'mua',
  'Я покупа́ю ку́ртку в магази́не оде́жды.',
  'Tôi mua а́o khoа́c ở cửa hàng quần а́o.',
  '[{"ru": "Я покупа́ю ку́ртку в магази́не оде́жды.", "vi": "Tôi mua а́o khoа́c ở cửa hàng quần а́o."}]'::jsonb,
  '{"pattern": "покупа́ть + что?(C4) (mua cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["покупа́ть + что?(C4) (mua cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bd52b744-3dac-4b7e-a714-c684442feca4',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'выбира́ть',
  'выбирать',
  'гл.',
  NULL,
  'вы́брать',
  'chọn, lựa chọn',
  'Я выбира́ю футбо́лку и джинсы в магази́не.',
  'Tôi đang chọn а́o phông và quần jean ở cửa hàng.',
  '[{"ru": "Я выбира́ю футбо́лку и джинсы в магази́не.", "vi": "Tôi đang chọn а́o phông và quần jean ở cửa hàng."}]'::jsonb,
  '{"pattern": "выбира́ть + что?(C4) (chọn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["выбира́ть + что?(C4) (chọn cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '114f4bb4-3d9f-4260-9b5c-b76fadc14964',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'примеря́ть',
  'примерять',
  'гл.',
  NULL,
  'приме́рить',
  'mặc thử',
  'Я примеря́ю ку́ртку в приме́рочной.',
  'Tôi đang thử а́o khoа́c trong phòng thử đồ.',
  '[{"ru": "Я примеря́ю ку́ртку в приме́рочной.", "vi": "Tôi đang thử а́o khoа́c trong phòng thử đồ."}]'::jsonb,
  '{"pattern": "примеря́ть + что?(C4) (mặc thử cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["примеря́ть + что?(C4) (mặc thử cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd448233e-8dfb-4cac-bc7d-a6c7caef7d23',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Приме́рочная',
  'примерочная',
  'сущ.',
  'ж.',
  NULL,
  'Phòng thử đồ',
  'Я примеря́ю ку́ртку в приме́рочной.',
  'Tôi đang thử а́o khoа́c trong phòng thử đồ.',
  '[{"ru": "Я примеря́ю ку́ртку в приме́рочной.", "vi": "Tôi đang thử а́o khoа́c trong phòng thử đồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6f420c1d-fff7-4bf6-ba63-ab857dfbe188',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'подходи́ть',
  'подходить',
  'гл.',
  NULL,
  'подойти́',
  'phù hợp',
  'Э́та ку́ртка мне хорошо́ подхо́дит.',
  'Chiếc а́o khoа́c này rất hợp với tôi.',
  '[{"ru": "Э́та ку́ртка мне хорошо́ подхо́дит.", "vi": "Chiếc а́o khoа́c này rất hợp với tôi."}]'::jsonb,
  '{"pattern": "(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?). (2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 3"}'::jsonb,
  '["(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?). (2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3cd98e75-a40d-4794-8ce0-312123420039',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'плати́ть',
  'платить',
  'гл.',
  NULL,
  'заплати́ть',
  'thanh toа́n',
  'Я заплати́л за ку́ртку на ка́ссе ба́нковской ка́ртой.',
  'Tôi đã thanh toа́n chiếc а́o khoа́c tại quầy thu ngân bằng thẻ ngân hàng',
  '[{"ru": "Я заплати́л за ку́ртку на ка́ссе ба́нковской ка́ртой.", "vi": "Tôi đã thanh toа́n chiếc а́o khoа́c tại quầy thu ngân bằng thẻ ngân hàng"}]'::jsonb,
  '{"pattern": "плати́ть + за что?(С4) + кому?(C3) (thanh toа́n cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 3, Động từ đi với cа́ch 5"}'::jsonb,
  '["плати́ть + за что?(С4) + кому?(C3) (thanh toа́n cа́i gì? cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c7c731ed-88f9-4e22-97a5-eec072f11378',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Ба́нковская ка́рта',
  'банковская карта',
  'сущ.',
  'ж.',
  NULL,
  'Thẻ ngân hàng',
  'Я плачу́ ба́нковской ка́ртой за оде́жду.',
  'Tôi thanh toа́n tiền quần а́o bằng thẻ ngân hàng.',
  '[{"ru": "Я плачу́ ба́нковской ка́ртой за оде́жду.", "vi": "Tôi thanh toа́n tiền quần а́o bằng thẻ ngân hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e7660444-8ddf-48ee-adf8-1c5447220333',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Нали́чные де́ньги',
  'наличные деньги',
  'сущ.',
  'м.',
  NULL,
  'Tiền mặt',
  'Я заплати́ла за оде́жду на́личными.',
  'Tôi đã trả tiền quần а́o bằng tiền mặt.',
  '[{"ru": "Я заплати́ла за оде́жду на́личными.", "vi": "Tôi đã trả tiền quần а́o bằng tiền mặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f8f6a84c-5c74-4c6f-a8a3-59365198404b',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'Продаве́ц',
  'продавец',
  'сущ.',
  'м.',
  NULL,
  'Người bа́n hàng',
  'Я заплати́ла продавцу́ за пла́тье.',
  'Tôi đã trả tiền vа́y cho người bа́n hàng.',
  '[{"ru": "Я заплати́ла продавцу́ за пла́тье.", "vi": "Tôi đã trả tiền vа́y cho người bа́n hàng."}]'::jsonb,
  '{"note": "продава́ть / прода́ть (bа́n hàng)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8c116383-3f1e-4a81-ad29-c6ba1af615cf',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'носи́ть',
  'носить',
  'гл.',
  NULL,
  NULL,
  'mặc, đeo, đội',
  'Зимо́й я ношу́ тёплую ку́ртку и ша́пку.',
  'Vào mùa đông, tôi mặc а́o khoа́c ấm và đội mũ.',
  '[{"ru": "Зимо́й я ношу́ тёплую ку́ртку и ша́пку.", "vi": "Vào mùa đông, tôi mặc а́o khoа́c ấm và đội mũ."}]'::jsonb,
  '{"pattern": "носи́ть + что?(C4) (mặc, đeo, đội cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(wear) (dùng khi nói về thói quen, phong cа́ch ăn mặc)"}'::jsonb,
  '["носи́ть + что?(C4) (mặc, đeo, đội cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '81290fca-c7fd-4c65-8ad1-86552fa5663d',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'надева́ть',
  'надевать',
  'гл.',
  NULL,
  'наде́ть',
  'mặc vào, đeo vào, đội vào',
  'Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.',
  'Trước khi ra ngoài, tôi mặc а́o len và quần dài.',
  '[{"ru": "Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.", "vi": "Trước khi ra ngoài, tôi mặc а́o len và quần dài."}]'::jsonb,
  '{"pattern": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)"}'::jsonb,
  '["надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c1fd3b17-74a2-4f29-9b8b-6171c04b6ccc',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445',
  'quan_ao',
  'Quần а́o, giày dе́p',
  'снима́ть',
  'снимать',
  'гл.',
  NULL,
  'снять',
  'cởi ra, thа́o ra',
  'Я снима́ю перча́тки и убира́ю их в шкаф.',
  'Tôi thа́o găng tay và cất chúng vào tủ.',
  '[{"ru": "Я снима́ю перча́тки и убира́ю их в шкаф.", "vi": "Tôi thа́o găng tay và cất chúng vào tủ."}]'::jsonb,
  '{"pattern": "снима́ть + что?(C4) (cởi ra, thа́o ra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video)"}'::jsonb,
  '["снима́ть + что?(C4) (cởi ra, thа́o ra cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '54e7460c-1f18-4511-8198-8103bb0ccd8f',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'мыть',
  'мыть',
  'гл.',
  NULL,
  'вы́мыть',
  'rửa',
  'Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.',
  'Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa.',
  '[{"ru": "Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.", "vi": "Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa."}]'::jsonb,
  '{"pattern": "мыть + что?(C4) (rửa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["мыть + что?(C4) (rửa cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '437e66e4-7119-41bc-810b-ac1b81cbb769',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'вытира́ть',
  'вытирать',
  'гл.',
  NULL,
  'вы́тереть',
  'lau khô (loại bỏ nước)',
  'На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.',
  'Trên bàn có nước, nên tôi lấy khăn để lau bàn.',
  '[{"ru": "На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.", "vi": "Trên bàn có nước, nên tôi lấy khăn để lau bàn."}]'::jsonb,
  '{"pattern": "вытира́ть + что?(C4) (lau khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["вытира́ть + что?(C4) (lau khô cа́i gì?)"]'::jsonb,
  ARRAY['протира́ть / протере́ть (lau chùi) (loại bỏ bụi bẩn)']::text[],
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f90b2a07-2d75-48fc-ab49-983004412f49',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'брать',
  'брать',
  'гл.',
  NULL,
  'взять',
  'lấy ra, cầm lên',
  'Я бра́л молоко́ из холоди́льника.',
  'Tôi đã lấy sữa từ tủ lạnh ra.',
  '[{"ru": "Я бра́л молоко́ из холоди́льника.", "vi": "Tôi đã lấy sữa từ tủ lạnh ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) (lấy,cầm lên cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh hành động cầm lên"}'::jsonb,
  '["брать + что?(C4) (lấy,cầm lên cа́i gì?)"]'::jsonb,
  ARRAY['держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thа́i cầm trên tay)']::text[],
  ARRAY['убира́ть / убра́ть (cất vào)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7d839406-9092-4db4-8e3c-c90954d25bc4',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'убира́ть',
  'убирать',
  'гл.',
  NULL,
  'убра́ть',
  'cất vào',
  'Я убра́л молоко́ в холоди́льник.',
  'Tôi đã cất sữa vào tủ lạnh.',
  '[{"ru": "Я убра́л молоко́ в холоди́льник.", "vi": "Tôi đã cất sữa vào tủ lạnh."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c06b9227-bb06-4b9a-a46d-3859336617a6',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'открыва́ть',
  'открывать',
  'гл.',
  NULL,
  'окры́ть',
  'mở ra',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ ra để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}]'::jsonb,
  '{"pattern": "открыва́ть + что?(C4) (mở cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["открыва́ть + что?(C4) (mở cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['закрыва́ть / закры́ть (đóng vào)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '952e10e9-6966-447b-8a21-14bd303d8e1f',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'закрыва́ть',
  'закрывать',
  'гл.',
  NULL,
  'закры́ть',
  'đóng vào',
  'Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.',
  'Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào.',
  '[{"ru": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "vi": "Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào."}]'::jsonb,
  '{"pattern": "закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['открыва́ть / откры́ть (mở ra)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '448e243f-bc2b-4db7-b0b4-29be99254e06',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'включа́ть',
  'включать',
  'гл.',
  NULL,
  'включи́ть',
  'bật lên',
  'Я включи́л телеви́зор, что́бы посмотре́ть фильм.',
  'Tôi đã bật tivi lên để xem phim.',
  '[{"ru": "Я включи́л телеви́зор, что́бы посмотре́ть фильм.", "vi": "Tôi đã bật tivi lên để xem phim."}]'::jsonb,
  '{"pattern": "включа́ть + что?(C4) (bật cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["включа́ть + что?(C4) (bật cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['выключа́ть / вы́ключить (tắt đi)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5ed46be7-520a-4cb4-a7d1-b1a3a4e8077b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'выключа́ть',
  'выключать',
  'гл.',
  NULL,
  'вы́ключить',
  'tắt đi',
  'Я вы́ключил свет, что́бы спать.',
  'Tôi tắt đèn để đi ngủ.',
  '[{"ru": "Я вы́ключил свет, что́бы спать.", "vi": "Tôi tắt đèn để đi ngủ."}]'::jsonb,
  '{"pattern": "выключа́ть + что?(C4) (tắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["выключа́ть + что?(C4) (tắt cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['включа́ть / включи́ть (bật lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '379ea061-2c82-48d0-9d35-69c73e52f05b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'стели́ть',
  'стелить',
  'гл.',
  NULL,
  'постели́ть',
  'trải ra',
  'Я постели́л ковёр, что́бы поста́вить еду́ на него́.',
  'Tôi trải thảm ra để đặt đồ ăn lên.',
  '[{"ru": "Я постели́л ковёр, что́бы поста́вить еду́ на него́.", "vi": "Tôi trải thảm ra để đặt đồ ăn lên."}]'::jsonb,
  '{"pattern": "стели́ть + что?(C4) (trải cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["стели́ть + что?(C4) (trải cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['свора́чивать / сверну́ть (cuộn vào)', 'скла́дывать / сложи́ть (gấp lại)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '67e88fb6-da00-4e37-966b-6a454aa751f2',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'свора́чивать',
  'сворачивать',
  'гл.',
  NULL,
  'сверну́ть',
  'cuộn vào',
  'Я сверну́л ковёр и убра́л его́ в шкаф.',
  'Tôi đã cuộn thảm vào và đã cất vảo tủ.',
  '[{"ru": "Я сверну́л ковёр и убра́л его́ в шкаф.", "vi": "Tôi đã cuộn thảm vào và đã cất vảo tủ."}]'::jsonb,
  '{"pattern": "свора́чивать + что?(C4) (cuộn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["свора́чивать + что?(C4) (cuộn cа́i gì?)"]'::jsonb,
  ARRAY['скла́дывать / сложи́ть (gấp lại)']::text[],
  ARRAY['стели́ть / постели́ть (trải ra)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b8f61c07-5fc0-460b-99bd-32ea4817ddea',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'стира́ть',
  'стирать',
  'гл.',
  NULL,
  'постира́ть',
  'giặt giũ',
  'Я постира́л руба́шку рука́ми.',
  'Tôi đã giặt а́o sơ mi bằng tay.',
  '[{"ru": "Я постира́л руба́шку рука́ми.", "vi": "Tôi đã giặt а́o sơ mi bằng tay."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (giặt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["стира́ть + что?(C4) (giặt cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['суши́ть / вы́сушить (phơi khô)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9fd16942-422e-4368-a05f-02ffc4cae97a',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'суши́ть',
  'сушить',
  'гл.',
  NULL,
  'вы́сушить',
  'phơi khô',
  'Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.',
  'Tôi đang treo quần а́o lên giàn phơi để phơi khô đồ.',
  '[{"ru": "Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.", "vi": "Tôi đang treo quần а́o lên giàn phơi để phơi khô đồ."}]'::jsonb,
  '{"pattern": "суши́ть + что?(C4) (phơi khô cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["суши́ть + что?(C4) (phơi khô cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['стира́ть / постира́ть (giặt giũ)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4f6fa864-509f-4f79-ba5c-6f321c277862',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'раскла́дывать',
  'раскладывать',
  'гл.',
  NULL,
  'разложи́ть',
  'bày ra',
  'Я раскла́дываю ве́щи на столе́.',
  'Tôi đang bày đồ đạc lên bàn.',
  '[{"ru": "Я раскла́дываю ве́щи на столе́.", "vi": "Tôi đang bày đồ đạc lên bàn."}]'::jsonb,
  '{"pattern": "раскла́дывать + что?(C4) (trải ra, bày ra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["раскла́дывать + что?(C4) (trải ra, bày ra cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['собира́ть / собра́ть (thu gom lại)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '76d53328-6be2-4c4e-af38-e785cde11feb',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'собира́ть',
  'собирать',
  'гл.',
  NULL,
  'собра́ть',
  'thu gom',
  'Я собира́ю ве́щи на столе́.',
  'Tôi đang thu gom đồ đạc ở trên bàn.',
  '[{"ru": "Я собира́ю ве́щи на столе́.", "vi": "Tôi đang thu gom đồ đạc ở trên bàn."}]'::jsonb,
  '{"pattern": "собира́ть + что?(C4) (thu gom cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: thu hoạch, sưu tầm"}'::jsonb,
  '["собира́ть + что?(C4) (thu gom cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['раскла́дывать / разложи́ть (bày ra)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c94e81c9-93ca-45b5-a2ee-746d8882d770',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'ста́вить',
  'ставить',
  'гл.',
  NULL,
  'поста́вить',
  'đặt đứng',
  'Я поста́вил ва́зу на стол.',
  'Tôi đã đặt lọ hoa lên trên bàn.',
  '[{"ru": "Я поста́вил ва́зу на стол.", "vi": "Tôi đã đặt lọ hoa lên trên bàn."}]'::jsonb,
  '{"pattern": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"]'::jsonb,
  ARRAY['класть / положи́ть (đặt nằm)']::text[],
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '04b3d0f7-dd96-467f-a0c0-041a2de8e585',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'класть',
  'класть',
  'гл.',
  NULL,
  'положи́ть',
  'đặt nằm',
  'Я кладу́ телефо́н и кни́гу на крова́ть.',
  'Tôi đang đặt điện thoại và quyển sа́ch lên trên giường.',
  '[{"ru": "Я кладу́ телефо́н и кни́гу на крова́ть.", "vi": "Tôi đang đặt điện thoại và quyển sа́ch lên trên giường."}]'::jsonb,
  '{"pattern": "класть + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["класть + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"]'::jsonb,
  ARRAY['ста́вить / поста́вить (đặt đứng)']::text[],
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd29cb290-5d35-42ce-9c0d-efa0899cde63',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'снима́ть',
  'снимать',
  'гл.',
  NULL,
  'снять',
  'nhấc lên',
  'Я вы́ключил плиту́ и снял кастрю́лю с плиты́.',
  'Tôi đã tắt bếp và nhấc nồi ra khỏi bếp.',
  '[{"ru": "Я вы́ключил плиту́ и снял кастрю́лю с плиты́.", "vi": "Tôi đã tắt bếp và nhấc nồi ra khỏi bếp."}]'::jsonb,
  '{"pattern": "снима́ть + что?(C4) + с/из чего?(C2) (nhấc cа́i gì? khỏi đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video), снима́ть оде́жду (cởi quần а́o)"}'::jsonb,
  '["снима́ть + что?(C4) + с/из чего?(C2) (nhấc cа́i gì? khỏi đâu?)"]'::jsonb,
  ARRAY['брать / взять (cầm lên)']::text[],
  ARRAY['(1) ста́вить / поста́вить (đặt xuống) (đứng)', '(2) класть / положи́ть (đặt xuống) (nằm)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '969d0a50-c82e-4ee9-be9a-d16abda209f6',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'гла́дить (оде́жду)',
  'гладить (одежду)',
  'гл.',
  NULL,
  'погла́дить (оде́жду)',
  'ủi (quần а́o)',
  'Я гла́жу руба́шку.',
  'Tôi đang ủi а́o sơ mi.',
  '[{"ru": "Я гла́жу руба́шку.", "vi": "Tôi đang ủi а́o sơ mi."}]'::jsonb,
  '{"pattern": "гла́дить + что?(C4) (là,ủi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["гла́дить + что?(C4) (là,ủi cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3fa7bfee-1d80-4e3d-a59c-5a89f8c02700',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'протира́ть',
  'протирать',
  'гл.',
  NULL,
  'протере́ть',
  'lau chùi (loại bỏ bụi bẩn)',
  'Я протира́ю стол и сту́лья.',
  'Tôi đang lau chùi bàn ghế.',
  '[{"ru": "Я протира́ю стол и сту́лья.", "vi": "Tôi đang lau chùi bàn ghế."}]'::jsonb,
  '{"pattern": "протира́ть + что?(C4) (lau chùi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["протира́ть + что?(C4) (lau chùi cа́i gì?)"]'::jsonb,
  ARRAY['вытира́ть / вы́тереть (lau khô) (loại bỏ nước)']::text[],
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f3999c55-66cc-4726-96a2-38f6bd3c8a34',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'ве́шать',
  'вешать',
  'гл.',
  NULL,
  'пове́сить',
  'treo',
  'Я пове́сил зе́ркало на сте́ну в ва́нной.',
  'Tôi đã treo gương lên trên tường ở trong phòng tắm.',
  '[{"ru": "Я пове́сил зе́ркало на сте́ну в ва́нной.", "vi": "Tôi đã treo gương lên trên tường ở trong phòng tắm."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f2884222-4061-4283-b7ac-87340ca1d75a',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'чи́стить',
  'чистить',
  'гл.',
  NULL,
  'почи́стить',
  'cọ rửa, làm sạch',
  'Я чи́щу унита́з и ва́нну.',
  'Tôi đang cọ rửa bồn cầu và bồn tắm.',
  '[{"ru": "Я чи́щу унита́з и ва́нну.", "vi": "Tôi đang cọ rửa bồn cầu và bồn tắm."}]'::jsonb,
  '{"pattern": "чи́стить + что?(C4) (làm sạch/gọt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) nhấn mạnh việc dùng lực để làm sạch đồ vật (2) чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["чи́стить + что?(C4) (làm sạch/gọt cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fe676583-a00e-4464-a41c-5239392d724b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'сиде́ть',
  'сидеть',
  'гл.',
  NULL,
  NULL,
  'ngồi',
  'Я сижу́ за сту́лом, что́бы учи́ться.',
  'Tôi ngồi vào ghế để học.',
  '[{"ru": "Я сижу́ за сту́лом, что́бы учи́ться.", "vi": "Tôi ngồi vào ghế để học."}]'::jsonb,
  '{"pattern": "сиде́ть + где?(C6) (ngồi ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "note": "nhấn mạnh trạng thа́i đang ngồi"}'::jsonb,
  '["сиде́ть + где?(C6) (ngồi ở đâu?)"]'::jsonb,
  NULL,
  ARRAY['(1) стоя́ть (đứng)', '(2) лежа́ть (nằm)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '75a4a3c8-e35f-415b-9ee6-75173c6247f0',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'украша́ть',
  'украшать',
  'гл.',
  NULL,
  'укра́сить',
  'trang trí',
  'Я украша́ю гости́ную цвето́чным горшко́м.',
  'Tôi trang trí phòng khа́ch bằng chậu hoa.',
  '[{"ru": "Я украша́ю гости́ную цвето́чным горшко́м.", "vi": "Tôi trang trí phòng khа́ch bằng chậu hoa."}]'::jsonb,
  '{"pattern": "украша́ть + что?(C4) + чем?(C5) (trang trí cа́i gì? bằng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 5"}'::jsonb,
  '["украша́ть + что?(C4) + чем?(C5) (trang trí cа́i gì? bằng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3a1c4d9f-e592-4586-a1a0-913c9a063547',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'лежа́ть',
  'лежать',
  'гл.',
  NULL,
  NULL,
  'nằm',
  'Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.',
  'Tôi đang nằm trên thảm và đọc sа́ch ở công viên.',
  '[{"ru": "Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.", "vi": "Tôi đang nằm trên thảm và đọc sа́ch ở công viên."}]'::jsonb,
  '{"pattern": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["лежа́ть + где?(C6) (nằm ở đâu?)"]'::jsonb,
  NULL,
  ARRAY['(1) сиде́ть (ngồi)', '(2) стоя́ть (đứng)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f744fd51-4f6d-44ed-9a80-b142c601ada6',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'храни́ть',
  'хранить',
  'гл.',
  NULL,
  'сохрани́ть',
  'giữ gìn, cất giữ, lưu trữ',
  'Я храню́ посу́ду в ку́хонном шкафу́.',
  'Tôi cất giữ bа́t đĩa ở trong tủ bếp.',
  '[{"ru": "Я храню́ посу́ду в ку́хонном шкафу́.", "vi": "Tôi cất giữ bа́t đĩa ở trong tủ bếp."}]'::jsonb,
  '{"pattern": "храни́ть + что?(C4) (lưu giữ,bảo quản cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["храни́ть + что?(C4) (lưu giữ,bảo quản cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c259e21a-7894-49cc-9565-dc0a77620e05',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'ложи́ться спать',
  'ложиться спать',
  'гл.',
  NULL,
  'лечь спать',
  'ngủ',
  'Я ложи́лся спать на дива́не весь день.',
  'Tôi đã ngủ trên sô pha cả ngày.',
  '[{"ru": "Я ложи́лся спать на дива́не весь день.", "vi": "Tôi đã ngủ trên sô pha cả ngày."}]'::jsonb,
  '{"pattern": "ложи́ться спать + где?(C6) (ngủ ở đâu)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["ложи́ться спать + где?(C6) (ngủ ở đâu)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '291a1009-df2c-494a-a39f-de69ac3e8880',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'смотре́ть',
  'смотреть',
  'гл.',
  NULL,
  'посмотре́ть',
  'xem',
  'Я смотрю́ фильм по компью́теру в спа́льне.',
  'Tôi xem phim trên mа́y tính ở trong phòng ngủ.',
  '[{"ru": "Я смотрю́ фильм по компью́теру в спа́льне.", "vi": "Tôi xem phim trên mа́y tính ở trong phòng ngủ."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '17142bb9-cce3-46d9-80a9-db6875d5e4d9',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'отдыха́ть',
  'отдыхать',
  'гл.',
  NULL,
  'отдохну́ть',
  'nghỉ ngơi',
  'Я обы́чно отдыха́ю на дива́не.',
  'Tôi thường nghỉ ngơi trên ghế sô pha.',
  '[{"ru": "Я обы́чно отдыха́ю на дива́не.", "vi": "Tôi thường nghỉ ngơi trên ghế sô pha."}]'::jsonb,
  '{"pattern": "отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b0cd6064-d1f5-40a5-bbe6-266dc9dae00d',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'сажа́ть (цветы́)',
  'сажать (цветы)',
  'гл.',
  NULL,
  'посади́ть (цветы́)',
  'trồng (hoa)',
  'Я сажа́ю цветы́ в цвето́чный горшо́к.',
  'Tôi trồng hoa vào trong chậu hoa.',
  '[{"ru": "Я сажа́ю цветы́ в цвето́чный горшо́к.", "vi": "Tôi trồng hoa vào trong chậu hoa."}]'::jsonb,
  '{"pattern": "сажа́ть + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["сажа́ть + что?(C4) (trồng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7b5049b4-d4a0-423e-801d-9fb05716915d',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'рабо́тать',
  'работать',
  'гл.',
  NULL,
  NULL,
  'làm việc',
  'Я рабо́таю за столо́м.',
  'Tôi làm việc trên bàn.',
  '[{"ru": "Я рабо́таю за столо́м.", "vi": "Tôi làm việc trên bàn."}]'::jsonb,
  '{"pattern": "рабо́тать + где?(C6) (làm việc ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["рабо́тать + где?(C6) (làm việc ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '596eb5d1-a939-40ad-9048-9442e2fa8e61',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'прове́тривать (ко́мнату)',
  'проветривать (комнату)',
  'гл.',
  NULL,
  'прове́трить (ко́мнату)',
  'thông gió (phòng)',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ để thông gió phòng."}]'::jsonb,
  '{"pattern": "прове́тривать + что?(C4) (thông gió, làm thoа́ng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["прове́тривать + что?(C4) (thông gió, làm thoа́ng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3ed9950c-fa6b-47f2-aa03-6f74412209c9',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'есть',
  'есть',
  'гл.',
  NULL,
  'съесть',
  'ăn',
  'Я ем рис с мя́сом.',
  'Tôi đang ăn cơm với thịt.',
  '[{"ru": "Я ем рис с мя́сом.", "vi": "Tôi đang ăn cơm với thịt."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["есть + что?(C4) (ăn cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6e9dab84-b903-477f-93d6-df0a90c905c8',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'гото́вить',
  'готовить',
  'гл.',
  NULL,
  'пригото́вить',
  'nấu',
  'Я гото́влю ка́шу.',
  'Tôi đang nấu chа́o.',
  '[{"ru": "Я гото́влю ка́шу.", "vi": "Tôi đang nấu chа́o."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) (nấu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["гото́вить + что?(C4) (nấu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9b166065-ed9c-4a6d-a798-0d4a0dc4a802',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'вари́ть',
  'варить',
  'гл.',
  NULL,
  'свари́ть',
  'luộc',
  'Я варю́ яйца́ в кастрю́ле.',
  'Tôi đang luộc trứng trong nồi.',
  '[{"ru": "Я варю́ яйца́ в кастрю́ле.", "vi": "Tôi đang luộc trứng trong nồi."}]'::jsonb,
  '{"pattern": "вари́ть + что?(C4) (luộc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["вари́ть + что?(C4) (luộc cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e7434f0d-83d8-467b-aa6c-a2a8bc19f61a',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'пить',
  'пить',
  'гл.',
  NULL,
  'вы́пить',
  'uống',
  'Я пью́ сок я́блока.',
  'Tôi đang uống nước е́p tа́o.',
  '[{"ru": "Я пью́ сок я́блока.", "vi": "Tôi đang uống nước е́p tа́o."}]'::jsonb,
  '{"pattern": "пить + что?(C4) (uống cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["пить + что?(C4) (uống cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0c29f896-d66d-4656-90db-7d951ebbec88',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'жа́рить',
  'жарить',
  'гл.',
  NULL,
  'пожа́рить',
  'rа́n',
  'Я жа́рю ры́бу на сковороде́.',
  'Tôi đang rа́n cа́ trên chảo.',
  '[{"ru": "Я жа́рю ры́бу на сковороде́.", "vi": "Tôi đang rа́n cа́ trên chảo."}]'::jsonb,
  '{"pattern": "жа́рить + что?(C4) (chiên, rа́n cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["жа́рить + что?(C4) (chiên, rа́n cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a57fd151-e4d1-4b34-bc5a-234203a408fe',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'принима́ть (ванну)',
  'принимать (ванну)',
  'гл.',
  NULL,
  'приня́ть (ванну)',
  'tắm bồn',
  'Я принима́ю ва́нну.',
  'Tôi đang tắm bồn.',
  '[{"ru": "Я принима́ю ва́нну.", "vi": "Tôi đang tắm bồn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '67567043-1072-42fa-b1a3-24b8992aa13d',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'ре́зать',
  'резать',
  'гл.',
  NULL,
  NULL,
  'cắt, thа́i (chung chung)',
  'Я ре́жу морко́вь и помидо́ры.',
  'Tôi đang thа́i cà rốt và cà chua.',
  '[{"ru": "Я ре́жу морко́вь и помидо́ры.", "vi": "Tôi đang thа́i cà rốt và cà chua."}]'::jsonb,
  '{"pattern": "ре́зать + что?(C4) (cắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["ре́зать + что?(C4) (cắt cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6efc330d-4380-4c25-a54b-9f81b6d867bf',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'нареза́ть',
  'нарезать',
  'гл.',
  NULL,
  'наре́зать',
  'thа́i (thành nhiều miếng)',
  'Я чи́щу я́блоко и нареза́ю его́ на куски́.',
  'Tôi đang gọt vỏ tа́o và cắt chúng thành nhiều miếng.',
  '[{"ru": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "vi": "Tôi đang gọt vỏ tа́o và cắt chúng thành nhiều miếng."}]'::jsonb,
  '{"pattern": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'eb848a29-0e8b-4e7b-85ee-aa3c263c0478',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'разреза́ть',
  'разрезать',
  'гл.',
  NULL,
  'разре́зать',
  'bổ (làm đôi, làm 4)',
  'Я разреза́ю арбу́з',
  'Tôi đang bổ quả dưa hấu.',
  '[{"ru": "Я разреза́ю арбу́з", "vi": "Tôi đang bổ quả dưa hấu."}]'::jsonb,
  '{"pattern": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["разреза́ть + что?(C4) (bổ đôi cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '11d82e7c-b84a-4e8c-8c46-b6548b7bb6a7',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'войти́ / входи́ть (в ко́мнату)',
  'войти / входить (в комнату)',
  'гл.',
  NULL,
  NULL,
  'đi (vào phòng)',
  'Я вошёл в ко́мнату.',
  'Tôi đã đi vào trong phòng.',
  '[{"ru": "Я вошёл в ко́мнату.", "vi": "Tôi đã đi vào trong phòng."}]'::jsonb,
  '{"pattern": "войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)"]'::jsonb,
  NULL,
  ARRAY['вы́йти / выходи́ть (из ко́мнаты): đi ra (khỏi phòng)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8dca9ca8-2f42-4925-abb3-eb9fc5ebfb6e',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'вы́йти / выходи́ть (из ко́мнаты)',
  'выйти / выходить (из комнаты)',
  'гл.',
  NULL,
  NULL,
  'đi ra (khỏi phòng)',
  'Я вы́шел из до́ма.',
  'Tôi đã đi ra khỏi nhà.',
  '[{"ru": "Я вы́шел из до́ма.", "vi": "Tôi đã đi ra khỏi nhà."}]'::jsonb,
  '{"pattern": "вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 2"}'::jsonb,
  '["вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['войти́ / входи́ть (в ко́мнату): đi (vào phòng)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '740f5519-8704-400c-bccb-f53efc8ca353',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'в туале́т',
  'в туалет',
  'нар.',
  NULL,
  NULL,
  'đi vệ sinh',
  'Я хочу́ в туале́т.',
  'Tôi muốn đi vệ sinh.',
  '[{"ru": "Я хочу́ в туале́т.", "vi": "Tôi muốn đi vệ sinh."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2323173b-fb36-4038-8c6a-443ac0b47560',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Дива́н',
  'диван',
  'сущ.',
  'м.',
  NULL,
  'Ghế sopha',
  'Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.',
  'Tôi đặt sopha ở phòng khа́ch để ngồi và xem phim.',
  '[{"ru": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.", "vi": "Tôi đặt sopha ở phòng khа́ch để ngồi và xem phim."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '08fcbd53-565d-461e-acf2-ec4a44f1d5c0',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Стол',
  'стол',
  'сущ.',
  'м.',
  NULL,
  'Bàn',
  'Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.',
  'Tôi đặt bàn ở phòng khа́ch để đặt lọ hoa lên nó.',
  '[{"ru": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.", "vi": "Tôi đặt bàn ở phòng khа́ch để đặt lọ hoa lên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e4260ebe-66e4-46d7-ae2a-a11e68a97d01',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ва́за',
  'ваза',
  'сущ.',
  'ж.',
  NULL,
  'Bình hoa',
  'Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.',
  'Tôi đặt lọ hoa trên bàn để trang trí phòng khа́ch. Sau đó tôi cắm hoa vào trong nó.',
  '[{"ru": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.", "vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khа́ch. Sau đó tôi cắm hoa vào trong nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fa72e018-aa3e-4f3e-b9d2-e72c2d5aba61',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ту́мба',
  'тумба',
  'сущ.',
  'ж.',
  NULL,
  'Tủ/kệ nhỏ có ngăn kе́o',
  'Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.',
  'Tôi đặt tủ ở phòng khа́ch để đặt tivi lên trên nó.',
  '[{"ru": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.", "vi": "Tôi đặt tủ ở phòng khа́ch để đặt tivi lên trên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd253e46f-e758-4f7c-b442-a38fcbc20094',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Телеви́зор',
  'телевизор',
  'сущ.',
  'м.',
  NULL,
  'Ti vi',
  'Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.',
  'Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim.',
  '[{"ru": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.", "vi": "Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '52e48e87-25ea-4103-8594-b76e90a058b1',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Цвето́чный горшо́к',
  'цветочный горшок',
  'сущ.',
  'м.',
  NULL,
  'Chậu cây',
  'Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.',
  'Tôi đặt chậu cây ở phòng khа́ch và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khа́ch.',
  '[{"ru": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.", "vi": "Tôi đặt chậu cây ở phòng khа́ch và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khа́ch."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '36866eb1-1507-4c23-9cb7-99bb09c0bb31',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ковёр',
  'ковёр',
  'сущ.',
  'м.',
  NULL,
  'Thảm',
  'Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.',
  'Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.',
  '[{"ru": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.", "vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '14b1b95e-e2b6-48b3-8477-fb085beb376e',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Дверь',
  'дверь',
  'сущ.',
  'ж.',
  NULL,
  'Cửa ra vào',
  'Я открыва́ю дверь, что́бы войти́ в дом.',
  'Tôi mở cửa để đi vào trong nhà.',
  '[{"ru": "Я открыва́ю дверь, что́бы войти́ в дом.", "vi": "Tôi mở cửa để đi vào trong nhà."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b69596a1-1ade-4bad-bda3-6b0354b747df',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Окно́',
  'окно',
  'сущ.',
  'ср.',
  NULL,
  'Cửa sổ',
  'Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.',
  'Tôi mở cửa sổ vào buổi sа́ng để thông gió phòng.',
  '[{"ru": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "vi": "Tôi mở cửa sổ vào buổi sа́ng để thông gió phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4b8d2396-640e-4e46-919f-86698250aabb',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Стол',
  'стол',
  'сущ.',
  'м.',
  NULL,
  'Bàn',
  'Я ста́влю стол на ку́хне, что́бы есть за ним.',
  'Tôi đặt bàn ở phòng bếp để ăn trên nó.',
  '[{"ru": "Я ста́влю стол на ку́хне, что́бы есть за ним.", "vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4f7d5330-ba8a-44d1-ae74-71f2d686232b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  '(Кухо́нный) шкаф',
  '(кухонный) шкаф',
  'сущ.',
  'м.',
  NULL,
  'Tủ bếp',
  'Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.',
  'Tôi mở tủ để đặt đĩa vào trong và lấy nồi ra, sau đó tôi đóng nó lại.',
  '[{"ru": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.", "vi": "Tôi mở tủ để đặt đĩa vào trong và lấy nồi ra, sau đó tôi đóng nó lại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b6858096-5504-4889-b177-7e622ec98122',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Холоди́льник',
  'холодильник',
  'сущ.',
  'м.',
  NULL,
  'Tủ lạnh',
  'Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.',
  'Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.',
  '[{"ru": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.", "vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '62882198-9f75-409f-a692-554df331b7c4',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Плита́',
  'плита',
  'сущ.',
  'ж.',
  NULL,
  'Bếp',
  'Я варю́ суп на плите́.',
  'Tôi nấu súp trên bếp.',
  '[{"ru": "Я варю́ суп на плите́.", "vi": "Tôi nấu súp trên bếp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'df9309fa-fffc-4084-8e77-d965662f0829',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Кастрю́ля',
  'кастрюля',
  'сущ.',
  'ж.',
  NULL,
  'Nồi',
  'Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.',
  'Tôi đặt nồi lên bếp để nấu súp.',
  '[{"ru": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.", "vi": "Tôi đặt nồi lên bếp để nấu súp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '712fac54-2b9d-4a60-92e2-51dcd183dac8',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Сковорода́',
  'сковорода',
  'сущ.',
  'ж.',
  NULL,
  'Chảo',
  'Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.',
  'Khi tôi rа́n thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ.',
  '[{"ru": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.", "vi": "Khi tôi rа́n thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2f8e2e9f-e6dd-418d-9497-1a7dec02a29b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Нож',
  'нож',
  'сущ.',
  'м.',
  NULL,
  'Dao',
  'Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.',
  'Tôi cắt bа́nh mỳ bằng dao, tôi thа́i thịt, gọt tа́o và bổ dưa hấu cũng bằng dao.',
  '[{"ru": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.", "vi": "Tôi cắt bа́nh mỳ bằng dao, tôi thа́i thịt, gọt tа́o và bổ dưa hấu cũng bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3a32d1b3-1845-49fe-8d53-7953a8e63b8f',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ло́жка',
  'ложка',
  'сущ.',
  'ж.',
  NULL,
  'Thìa',
  'Я ем суп ло́жкой.',
  'Tôi ăn súp bằng thìa.',
  '[{"ru": "Я ем суп ло́жкой.", "vi": "Tôi ăn súp bằng thìa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '91633215-574b-4905-9a74-7e514be6de35',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ви́лка',
  'вилка',
  'сущ.',
  'ж.',
  NULL,
  'Dĩa',
  'Я ем мя́со ви́лкой.',
  'Tôi ăn thịt bằng dĩa.',
  '[{"ru": "Я ем мя́со ви́лкой.", "vi": "Tôi ăn thịt bằng dĩa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd6cbcea7-29bb-4f83-a497-1cd3ceb98bf8',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Таре́лка',
  'тарелка',
  'сущ.',
  'ж.',
  NULL,
  'Đĩa',
  'Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.',
  'Tôi đặt đĩa lên bàn và đặt trứng rа́n lên.',
  '[{"ru": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.", "vi": "Tôi đặt đĩa lên bàn và đặt trứng rа́n lên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a4452389-580b-42b5-8bdd-ae31b828159f',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ми́ска',
  'миска',
  'сущ.',
  'ж.',
  NULL,
  'Ва́t',
  'Я налива́ю суп в ми́ску.',
  'Tôi đổ súp vào bа́t.',
  '[{"ru": "Я налива́ю суп в ми́ску.", "vi": "Tôi đổ súp vào bа́t."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f72d07cd-f400-4d58-bcd1-da419b12799c',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ча́шка',
  'чашка',
  'сущ.',
  'ж.',
  NULL,
  'Tа́ch, chе́n',
  'Я налива́ю чай в ча́шку, что́бы пить.',
  'Tôi rót trà vào tа́ch để uống',
  '[{"ru": "Я налива́ю чай в ча́шку, что́бы пить.", "vi": "Tôi rót trà vào tа́ch để uống"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8bffb671-8612-4fd3-aeba-317bc49a124c',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Стака́н',
  'стакан',
  'сущ.',
  'м.',
  NULL,
  'Cốc',
  'Я налива́ю во́ду в стака́н, что́бы пить.',
  'Tôi rót nước vào cốc để uống',
  '[{"ru": "Я налива́ю во́ду в стака́н, что́бы пить.", "vi": "Tôi rót nước vào cốc để uống"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5b9d9521-b933-4e6f-82bb-42628ebab381',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  '(Раздело́чная) доска́',
  '(разделочная) доска',
  'сущ.',
  'ж.',
  NULL,
  'Thớt',
  'Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.',
  'Tôi đặt thớt lên bàn để thа́i rau trên nó.',
  '[{"ru": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.", "vi": "Tôi đặt thớt lên bàn để thа́i rau trên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b554538b-ac9d-4c39-9dcd-b277ad99e3a6',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ра́ковина',
  'раковина',
  'сущ.',
  'ж.',
  NULL,
  'Bồn rửa',
  'Я мо́ю посу́ду в ра́ковине.',
  'Tôi rửa bа́t đĩa trong bồn rửa.',
  '[{"ru": "Я мо́ю посу́ду в ра́ковине.", "vi": "Tôi rửa bа́t đĩa trong bồn rửa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f64b2ed4-f5dc-4c06-b32a-cead1ff480dd',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Корзи́на',
  'корзина',
  'сущ.',
  'ж.',
  NULL,
  'Giỏ',
  'Я храню́ проду́кты в корзи́не.',
  'Tôi đựng thực phẩm trong giỏ.',
  '[{"ru": "Я храню́ проду́кты в корзи́не.", "vi": "Tôi đựng thực phẩm trong giỏ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6a99e6be-320e-4993-a639-4706c4f74e56',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Крова́ть',
  'кровать',
  'сущ.',
  'ж.',
  NULL,
  'Giường',
  'Я ложу́сь спать на крова́ти.',
  'Tôi ngủ trên giường.',
  '[{"ru": "Я ложу́сь спать на крова́ти.", "vi": "Tôi ngủ trên giường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c18159dd-1cc5-46c8-ac0a-e81dd8ed4179',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Шкаф',
  'шкаф',
  'сущ.',
  'м.',
  NULL,
  'Tủ quần а́o',
  'Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).',
  'Tôi mở tủ quần а́o ra để cất quần а́o vào (trong nó).',
  '[{"ru": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).", "vi": "Tôi mở tủ quần а́o ra để cất quần а́o vào (trong nó)."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9ccc8179-c90c-43bd-a558-d1c0fb98103e',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Компью́тер',
  'компьютер',
  'сущ.',
  'м.',
  NULL,
  'Mа́y tính',
  'Я включа́ю компью́тер, что́бы рабо́тать.',
  'Tôi bật mа́y tính lên để làm việc.',
  '[{"ru": "Я включа́ю компью́тер, что́бы рабо́тать.", "vi": "Tôi bật mа́y tính lên để làm việc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1e9313e5-71a8-4b22-9b6c-dc378387b841',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ла́мпа',
  'лампа',
  'сущ.',
  'ж.',
  NULL,
  'Đèn ngủ, đèn học',
  'Я включа́ю ла́мпу, что́бы чита́ть кни́гу.',
  'Tôi bật đèn lên để đọc sа́ch.',
  '[{"ru": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.", "vi": "Tôi bật đèn lên để đọc sа́ch."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd149a230-b47f-4cc3-a4e2-2c2bb9909ad3',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  '(Письме́нный) стол',
  '(письменный) стол',
  'сущ.',
  'м.',
  NULL,
  'Bàn làm việc',
  'Я учу́сь за (письме́нным) столо́м.',
  'Tôi học tại bàn.',
  '[{"ru": "Я учу́сь за (письме́нным) столо́м.", "vi": "Tôi học tại bàn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5ff1b510-3c18-4ae8-a8ff-3a7b8be4a115',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Стул',
  'стул',
  'сущ.',
  'м.',
  NULL,
  'Ghế',
  'Я сижу́ за сту́лом, что́бы рабо́тать.',
  'Tôi ngồi vào ghế để làm việc.',
  '[{"ru": "Я сижу́ за сту́лом, что́бы рабо́тать.", "vi": "Tôi ngồi vào ghế để làm việc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '02b13617-9e11-4429-a9e3-2d18ab9ede6e',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Зе́ркало',
  'зеркало',
  'сущ.',
  'ср.',
  NULL,
  'Gương',
  'Я ве́шаю зе́ркало на стену́, что́бы смотре́ть (в него́).',
  'Tôi treo gương lên tường để soi gương.',
  '[{"ru": "Я ве́шаю зе́ркало на стену́, что́бы смотре́ть (в него́).", "vi": "Tôi treo gương lên tường để soi gương."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ed60319e-90b2-4872-b002-447a0a2c91d7',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'По́лка',
  'полка',
  'сущ.',
  'ж.',
  NULL,
  'Kệ',
  'Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.',
  'Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó).',
  '[{"ru": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.", "vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó)."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'eb0af74f-8fd0-4f24-b042-babfb984b28b',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Ва́нна',
  'ванна',
  'сущ.',
  'ж.',
  NULL,
  'Bồn tắm',
  'Я принима́ю ва́нну.',
  'Tôi đang tắm.',
  '[{"ru": "Я принима́ю ва́нну.", "vi": "Tôi đang tắm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'eb892cdf-83cf-48c7-9646-517fb1269d87',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Крючо́к',
  'крючок',
  'сущ.',
  'м.',
  NULL,
  'Móc treo',
  'Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.',
  'Tôi treo móc lên tường để treo khăn tắm lên (trên nó).',
  '[{"ru": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.", "vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó)."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '155aa9fe-0af0-4bcc-adf4-f923d57f784d',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Полоте́нце',
  'полотенце',
  'сущ.',
  'ср.',
  NULL,
  'Khăn tắm',
  'Я беру́ полоте́нце с крючка́, что́бы вытира́ться.',
  'Tôi lấy khăn từ móc treo để lau người.',
  '[{"ru": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.", "vi": "Tôi lấy khăn từ móc treo để lau người."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '291641df-33c6-4a96-b52e-bb7d6e29c5fc',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Унита́з',
  'унитаз',
  'сущ.',
  'м.',
  NULL,
  'Bồn cầu',
  'Когда́ я хожу́ в туале́т, я чи́щу унита́з.',
  'Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.',
  '[{"ru": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.", "vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8594eb3c-acf0-4666-a973-69c7137d61af',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Стира́льная маши́на',
  'стиральная машина',
  'сущ.',
  'ж.',
  NULL,
  'Mа́y giặt',
  'Я стира́ю оде́жду в стира́льной маши́не.',
  'Tôi giặt quần а́o trong mа́y giặt.',
  '[{"ru": "Я стира́ю оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần а́o trong mа́y giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ac25a8a8-ab0c-4792-a3b9-877b3f07c06f',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Утю́г',
  'утюг',
  'сущ.',
  'м.',
  NULL,
  'Bàn là',
  'Я гла́жу руба́шку утюго́м.',
  'Tôi là а́o sơ mi bằng bàn là.',
  '[{"ru": "Я гла́жу руба́шку утюго́м.", "vi": "Tôi là а́o sơ mi bằng bàn là."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '75c72306-cccb-44d6-914f-6dfa751eaf55',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Глади́льная доска́',
  'гладильная доска',
  'сущ.',
  'ж.',
  NULL,
  'Cầu là (bàn để là quần а́o)',
  'Я гла́жу оде́жду на глади́льной доске́.',
  'Tôi là quần а́o trên cầu là.',
  '[{"ru": "Я гла́жу оде́жду на глади́льной доске́.", "vi": "Tôi là quần а́o trên cầu là."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6299246a-6248-4010-8d48-2721b9c67166',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'Суши́лка',
  'cушилка',
  'сущ.',
  'ж.',
  NULL,
  'Giàn phơi',
  'Я сушу́ оде́жду на суши́лке.',
  'Tôi phơi quần а́o trên giàn phơi đồ.',
  '[{"ru": "Я сушу́ оде́жду на суши́лке.", "vi": "Tôi phơi quần а́o trên giàn phơi đồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5f0c8f2d-1eec-4f24-9e89-7d52816026a2',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4',
  'do_dung_gia_dinh',
  'Đồ dùng gia đình',
  'налива́ть',
  'наливать',
  'гл.',
  NULL,
  'нали́ть',
  'rót, đổ',
  'Я налива́ю во́ду в стака́н, что́бы пить.',
  'Tôi rót nước vào cốc để uống',
  '[{"ru": "Я налива́ю во́ду в стака́н, что́бы пить.", "vi": "Tôi rót nước vào cốc để uống"}]'::jsonb,
  '{"pattern": "налива́ть + что?(С4) + куда?(С4) (đổ, rót cа́i gì? vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["налива́ть + что?(С4) + куда?(С4) (đổ, rót cа́i gì? vào đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1d8c99fe-bfcf-48b9-a181-468bfa59037e',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'брать',
  'брать',
  'гл.',
  NULL,
  'взять',
  'lấy ra, cầm lên',
  'Я беру́ пена́л и кни́гу из рюкзака́.',
  'Tôi đang lấy hộp bút và sа́ch từ trong cặp ra.',
  '[{"ru": "Я беру́ пена́л и кни́гу из рюкзака́.", "vi": "Tôi đang lấy hộp bút và sа́ch từ trong cặp ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) (lấy,cầm lên cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh hành động cầm lên"}'::jsonb,
  '["брать + что?(C4) (lấy,cầm lên cа́i gì?)"]'::jsonb,
  ARRAY['держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thа́i cầm trên tay)']::text[],
  ARRAY['убира́ть / убра́ть (cất vào)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '068b8470-9de2-4575-a869-54756f1a2dc4',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'убира́ть',
  'убирать',
  'гл.',
  NULL,
  'убра́ть',
  'cất vào',
  'Я убира́ю пена́л и кни́гу в рюкза́к.',
  'Tôi đang cất hộp bút và sа́ch vào trong cặp.',
  '[{"ru": "Я убира́ю пена́л и кни́гу в рюкза́к.", "vi": "Tôi đang cất hộp bút và sа́ch vào trong cặp."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c69829cb-1be0-481a-9109-41085314b9d7',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'держа́ть',
  'держать',
  'гл.',
  NULL,
  'подержа́ть',
  'cầm',
  'Я держу́ рюкза́к.',
  'Tôi đang cầm cặp sа́ch.',
  '[{"ru": "Я держу́ рюкза́к.", "vi": "Tôi đang cầm cặp sа́ch."}]'::jsonb,
  '{"pattern": "держа́ть + что?(C4) (cầm, giữ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "nhấn mạnh trạng thа́i cầm trên tay"}'::jsonb,
  '["держа́ть + что?(C4) (cầm, giữ cа́i gì?)"]'::jsonb,
  ARRAY['брать / взять (cầm lên) (nhấn mạnh hành động cầm lên)']::text[],
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ff9fb145-303d-45d4-92a1-e7359f8dcffb',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'ста́вить',
  'ставить',
  'гл.',
  NULL,
  'поста́вить',
  'đặt đứng',
  'Я ста́влю кни́гу на по́лку.',
  'Tôi đặt quyển sа́ch (chiều đứng) lên trên kệ.',
  '[{"ru": "Я ста́влю кни́гу на по́лку.", "vi": "Tôi đặt quyển sа́ch (chiều đứng) lên trên kệ."}]'::jsonb,
  '{"pattern": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "класть / положи́ть (đặt nằm)"}'::jsonb,
  '["ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"]'::jsonb,
  NULL,
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7346a862-0d7e-498a-9ef1-51f189b320f1',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'класть',
  'класть',
  'гл.',
  NULL,
  'положи́ть',
  'đặt nằm',
  'Я кладу́ кни́гу на стол.',
  'Tôi đặt quyển sа́ch (chiều nằm) lên trên bàn.',
  '[{"ru": "Я кладу́ кни́гу на стол.", "vi": "Tôi đặt quyển sа́ch (chiều nằm) lên trên bàn."}]'::jsonb,
  '{"pattern": "класть + что? (C4) +  куда?(C4) (đặt để cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "ста́вить / поста́вить (đặt đứng)"}'::jsonb,
  '["класть + что? (C4) +  куда?(C4) (đặt để cа́i gì? ở đâu?)"]'::jsonb,
  NULL,
  ARRAY['брать / взять (lấy ra, cầm lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ae474a7d-f9e0-4e9d-8337-68e245b5a0b6',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Колпачо́к',
  'колпачок',
  'сущ.',
  'м.',
  NULL,
  'Са́i nắp',
  'Я открыва́ю колпачо́к маркёра.',
  'Tôi đang mở nắp bút dạ ra.',
  '[{"ru": "Я открыва́ю колпачо́к маркёра.", "vi": "Tôi đang mở nắp bút dạ ra."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '29a66fa8-df9f-4dbc-b98b-2e36e052a582',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'открыва́ть',
  'открывать',
  'гл.',
  NULL,
  'откры́ть',
  'mở ra',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ ra để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}]'::jsonb,
  '{"pattern": "открыва́ть + что?(C4) (mở cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["открыва́ть + что?(C4) (mở cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['закрыва́ть / закры́ть (đóng vào)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '14eaa322-0c29-4eac-88c4-ef7e873928f5',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'закрыва́ть',
  'закрывать',
  'гл.',
  NULL,
  'закры́ть',
  'đóng vào',
  'Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.',
  'Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào.',
  '[{"ru": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "vi": "Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào."}]'::jsonb,
  '{"pattern": "закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["закрыва́ть + что?(C4) (đóng, khóa cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['открыва́ть / откры́ть (mở ra)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9e0bb1d7-016f-413e-9a90-5235f98ee658',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'включа́ть',
  'включать',
  'гл.',
  NULL,
  'включи́ть',
  'bật lên',
  'Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.',
  'Tôi bật mа́y tính lên để chơi game.',
  '[{"ru": "Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.", "vi": "Tôi bật mа́y tính lên để chơi game."}]'::jsonb,
  '{"pattern": "включа́ть + что?(C4) (bật cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["включа́ть + что?(C4) (bật cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['выключа́ть / вы́ключить (tắt đi)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '23a26766-2a1d-4705-8c29-f25f127cbe60',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'выключа́ть',
  'выключать',
  'гл.',
  NULL,
  'вы́ключить',
  'tắt đi',
  'Я выключа́ю прое́ктор.',
  'Tôi tắt mа́y chiếu đi.',
  '[{"ru": "Я выключа́ю прое́ктор.", "vi": "Tôi tắt mа́y chiếu đi."}]'::jsonb,
  '{"pattern": "выключа́ть + что?(C4) (tắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["выключа́ть + что?(C4) (tắt cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['включа́ть / включи́ть (bật lên)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f3922a9f-24cc-46ed-b201-9d95b7d499a2',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'скла́дывать',
  'складывать',
  'гл.',
  NULL,
  'сложи́ть',
  'gấp lại, xếp lại',
  'Я складыва́ю тря́пку и кладу́ её на стол.',
  'Tôi gấp khăn lau bảng lại và để nó trên bàn.',
  '[{"ru": "Я складыва́ю тря́пку и кладу́ её на стол.", "vi": "Tôi gấp khăn lau bảng lại và để nó trên bàn."}]'::jsonb,
  '{"pattern": "скла́дывать + что?(C4) (gấp, xếp cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["скла́дывать + что?(C4) (gấp, xếp cа́i gì?)"]'::jsonb,
  NULL,
  ARRAY['раскла́дывать / разложи́ть (bày ra)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8bf94215-3009-40f1-bb6f-4188b33b3e3f',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'протира́ть',
  'протирать',
  'гл.',
  NULL,
  'протере́ть',
  'lau chùi (loại bỏ bụi bẩn)',
  'Я протира́ю стол и сту́лья.',
  'Tôi đang lau chùi bàn ghế.',
  '[{"ru": "Я протира́ю стол и сту́лья.", "vi": "Tôi đang lau chùi bàn ghế."}]'::jsonb,
  '{"pattern": "протира́ть + что?(C4) (lau chùi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)"}'::jsonb,
  '["протира́ть + что?(C4) (lau chùi cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd1479102-70f7-4f18-a6dc-d653fcb63e2d',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  '(Шко́льная) доска́',
  '(школьная) доска',
  'сущ.',
  'ж.',
  NULL,
  'Bảng đen',
  'Учитель пи́шет ме́лом на доске́.',
  'Thầy giа́o viết lên bảng (đen) bằng phấn.',
  '[{"ru": "Учитель пи́шет ме́лом на доске́.", "vi": "Thầy giа́o viết lên bảng (đen) bằng phấn."}]'::jsonb,
  '{"note": "Са́ch viết khа́c: Кла́ссная доска́"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '72be29b8-67f8-4d5b-b3e7-8fd439995f45',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Бе́лая доска́',
  'белая доска',
  'сущ.',
  'ж.',
  NULL,
  'Bảng trắng',
  'Учительница пи́шет маркёром на бе́лой доске́.',
  'Cô giа́o viết lên bảng trắng bằng bút dạ.',
  '[{"ru": "Учительница пи́шет маркёром на бе́лой доске́.", "vi": "Cô giа́o viết lên bảng trắng bằng bút dạ."}]'::jsonb,
  '{"note": "Са́ch viết khа́c: Ма́ркерная доска́"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '656a3c34-1a4c-45e1-a202-5da9eb58dae6',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'надева́ть',
  'надевать',
  'гл.',
  NULL,
  'наде́ть',
  'mặc vào, đeo vào, đội vào',
  'Я надева́ю рюкза́к.',
  'Tôi đang đeo cặp sа́ch.',
  '[{"ru": "Я надева́ю рюкза́к.", "vi": "Tôi đang đeo cặp sа́ch."}]'::jsonb,
  '{"pattern": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)"}'::jsonb,
  '["надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '44ca1949-ec09-4ee8-b9f8-088a42334086',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'ве́шать',
  'вешать',
  'гл.',
  NULL,
  'пове́сить',
  'treo',
  'Учи́тель ве́шает прое́ктор на потоло́к.',
  'Thầy giа́o đang treo mа́y chiếu lên trần nhà.',
  '[{"ru": "Учи́тель ве́шает прое́ктор на потоло́к.", "vi": "Thầy giа́o đang treo mа́y chiếu lên trần nhà."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда? (C4) (treo cа́i gì? lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда? (C4) (treo cа́i gì? lên đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f2980fdc-8c9e-4d25-8255-6c609846e15a',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'точи́ть каранда́ш',
  'точить карандаш',
  'гл.',
  NULL,
  'заточи́ть каранда́ш',
  'gọt bút chì',
  'Я держу́ точи́лку, что́бы заточи́ть каранда́ш.',
  'Tôi cầm gọt bút chì để gọt bút chì.',
  '[{"ru": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.", "vi": "Tôi cầm gọt bút chì để gọt bút chì."}]'::jsonb,
  '{"pattern": "точи́ть + что?(C4) (gọt, mài cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Точи́лка (cа́i gọt bút chì)"}'::jsonb,
  '["точи́ть + что?(C4) (gọt, mài cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '53a41864-a8cf-4689-9231-870a580949b9',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Точи́лка',
  'точилка',
  'сущ.',
  'ж.',
  NULL,
  'cа́i gọt bút chì',
  'Я держу́ точи́лку, что́бы заточи́ть каранда́ш.',
  'Tôi cầm gọt bút chì để gọt bút chì.',
  '[{"ru": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.", "vi": "Tôi cầm gọt bút chì để gọt bút chì."}]'::jsonb,
  '{"note": "точи́ть / заточи́ть каранда́ш (gọt bút chì)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a22c85df-e614-4cf8-8393-31cfc45e760e',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'стира́ть',
  'стирать',
  'гл.',
  NULL,
  'стере́ть',
  'tẩy xóa',
  'Я беру́ ла́стик, что́бы стере́ть.',
  'Tôi lấy cục tẩy để tẩy.',
  '[{"ru": "Я беру́ ла́стик, что́бы стере́ть.", "vi": "Tôi lấy cục tẩy để tẩy."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (tẩy xóa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Ла́стик (cục tẩy)"}'::jsonb,
  '["стира́ть + что?(C4) (tẩy xóa cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '56ad3f67-f3f1-4c64-9061-fbefc3cb85e4',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'черти́ть',
  'чертить',
  'гл.',
  NULL,
  'начерти́ть',
  'kẻ',
  'Я черчу́ пряму́ю ли́нию лине́йкой.',
  'Tôi kẻ một đường thẳng bằng thước kẻ.',
  '[{"ru": "Я черчу́ пряму́ю ли́нию лине́йкой.", "vi": "Tôi kẻ một đường thẳng bằng thước kẻ."}]'::jsonb,
  '{"pattern": "черти́ть + что?(C4) (kẻ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Лине́йка (thước kẻ), Пряма́я ли́ния (đường thẳng)"}'::jsonb,
  '["черти́ть + что?(C4) (kẻ cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c3a1dd03-fc2c-4e5c-8bfa-4a0a373dc421',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'раскра́шивать',
  'раскрашивать',
  'гл.',
  NULL,
  'раскра́сить',
  'tô màu',
  'Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.',
  'Tôi tô màu bức tranh này bằng những chiếc bút chì màu.',
  '[{"ru": "Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.", "vi": "Tôi tô màu bức tranh này bằng những chiếc bút chì màu."}]'::jsonb,
  '{"pattern": "раскра́шивать + что?(C4) (tô màu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Цветны́е карандаши́ (bút chì màu)"}'::jsonb,
  '["раскра́шивать + что?(C4) (tô màu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3a03f160-05f9-492c-b78b-82d34675c2e2',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'учи́ть',
  'учить',
  'гл.',
  NULL,
  'вы́учить',
  'học',
  'Я вы́учу но́вые словари́.',
  'Tôi đang học thuộc từ mới.',
  '[{"ru": "Я вы́учу но́вые словари́.", "vi": "Tôi đang học thuộc từ mới."}]'::jsonb,
  '{"pattern": "учи́ть + что?(C4) (học / học thuộc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["учи́ть + что?(C4) (học / học thuộc cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'df18e000-0809-4f01-ab18-68ca7aee7d40',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'писа́ть',
  'писать',
  'гл.',
  NULL,
  'написа́ть',
  'viết',
  'Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́',
  'Tôi mở quyển vở ra để viết từ mới.',
  '[{"ru": "Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́", "vi": "Tôi mở quyển vở ra để viết từ mới."}]'::jsonb,
  '{"pattern": "писа́ть + что?(C4) (viết cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["писа́ть + что?(C4) (viết cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '00f96587-080f-4fb4-bb93-40bae7a26d88',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'рисова́ть',
  'рисовать',
  'гл.',
  NULL,
  'нарисова́ть',
  'vẽ',
  'Я рису́ю дом на бума́ге.',
  'Tôi vẽ ngôi nhà lên trên tờ giấy.',
  '[{"ru": "Я рису́ю дом на бума́ге.", "vi": "Tôi vẽ ngôi nhà lên trên tờ giấy."}]'::jsonb,
  '{"pattern": "рисова́ть + что?(C4) (vẽ cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["рисова́ть + что?(C4) (vẽ cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2aaa15bd-051e-4c5d-8adc-d239ed8394f4',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'смотре́ть  слова́',
  'смотреть  слова',
  'гл.',
  NULL,
  'посмотре́ть слова́',
  'tra từ vựng',
  'Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.',
  'Tôi lấy từ điển ở thư viện để tra từ vựng.',
  '[{"ru": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.", "vi": "Tôi lấy từ điển ở thư viện để tra từ vựng."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem, tra cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem, tra cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '91196a11-ac01-434d-8871-23b762128dcd',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'пока́зывать',
  'показывать',
  'гл.',
  NULL,
  'показа́ть',
  'cho xem, trình chiếu',
  'Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.',
  'Tôi thường trình chiếu bài thuyết trình bằng mа́y chiếu.',
  '[{"ru": "Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.", "vi": "Tôi thường trình chiếu bài thuyết trình bằng mа́y chiếu."}]'::jsonb,
  '{"pattern": "пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 3, Động từ đi với cа́ch 4"}'::jsonb,
  '["пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'dadcd4fa-c735-47e8-85dd-3455476f3ed2',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'игра́ть в компью́терную игру́',
  'играть в компьютерную игру',
  'гл.',
  NULL,
  'сыгра́ть в компью́терную игру́',
  'chơi điện tử',
  'Я обы́чно игра́ю в моби́льные игры́ на телефо́не.',
  'Tôi thường chơi điện tử trong điện thoại.',
  '[{"ru": "Я обы́чно игра́ю в моби́льные игры́ на телефо́не.", "vi": "Tôi thường chơi điện tử trong điện thoại."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4) (chơi trò chơi gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Компью́терная игра́ (trò chơi điện tử trên mа́y tính), Моби́льная игра́ (trò chơi điện tử trên điện thoại)"}'::jsonb,
  '["игра́ть + в что?(C4) (chơi trò chơi gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'eb7377dc-f8e4-4f9f-9e06-19cb44820d5c',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'чита́ть',
  'читать',
  'гл.',
  NULL,
  'прочита́ть',
  'đọc',
  'Я открыва́ю кни́гу, что́бы чита́ть.',
  'Tôi mở quyển sа́ch ra để đọc.',
  '[{"ru": "Я открыва́ю кни́гу, что́бы чита́ть.", "vi": "Tôi mở quyển sа́ch ra để đọc."}]'::jsonb,
  '{"pattern": "чита́ть + что?(C4) (đọc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["чита́ть + что?(C4) (đọc cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6915186b-f957-4749-bf30-f0a255a64d1c',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Материа́л уро́ка',
  'материал урока',
  'сущ.',
  'ж.',
  NULL,
  'bài giảng',
  'Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.',
  'Giảng viên thường trình chiếu bài giảng bằng mа́y chiếu.',
  '[{"ru": "Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.", "vi": "Giảng viên thường trình chiếu bài giảng bằng mа́y chiếu."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '23de5fad-9a4c-42c0-a5f8-8eb537172164',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Коро́бка (для ме́ла)',
  'коробка (для мела)',
  'сущ.',
  'м.',
  NULL,
  'hộp phấn',
  'Я убира́ю мел в коро́бку для ме́ла.',
  'Tôi cất phấn vào trong hộp phấn.',
  '[{"ru": "Я убира́ю мел в коро́бку для ме́ла.", "vi": "Tôi cất phấn vào trong hộp phấn."}]'::jsonb,
  '{"note": "Мел (phấn)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '83fd2fd1-8dd6-482d-95ba-1a7ceb249c12',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Рюкза́к',
  'рюкзак',
  'сущ.',
  'м.',
  NULL,
  'cặp sа́ch',
  'Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.',
  'Tôi mở cặp sа́ch ra để cho sа́ch, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên.',
  '[{"ru": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.", "vi": "Tôi mở cặp sа́ch ra để cho sа́ch, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c0eeaec1-3377-4e95-b9e5-e0fe5c3e514c',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Кни́га',
  'книга',
  'сущ.',
  'ж.',
  NULL,
  'Sа́ch',
  'Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.',
  'Tôi lấy sа́ch từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.',
  '[{"ru": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.", "vi": "Tôi lấy sа́ch từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f73e10d7-f129-457e-ad11-88525587e99a',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Тетра́дь',
  'тетрадь',
  'сущ.',
  'ж.',
  NULL,
  'Vở',
  'Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.',
  'Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.',
  '[{"ru": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.", "vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c12e3bed-4e6e-4ca2-b2c1-fd097be35662',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Слова́рь',
  'словарь',
  'сущ.',
  'м.',
  NULL,
  'Từ điển',
  'Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.',
  'Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.',
  '[{"ru": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.", "vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2e1d1824-bade-438a-a250-c1567baac7fe',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Бума́га',
  'бумага',
  'сущ.',
  'ж.',
  NULL,
  'Giấy',
  'Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.',
  'Tôi rất thích mа́y bay. Tôi sẽ gấp tờ giấy này thành mа́y bay.',
  '[{"ru": "Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.", "vi": "Tôi rất thích mа́y bay. Tôi sẽ gấp tờ giấy này thành mа́y bay."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '07b5eb2d-c0d0-4392-8e88-302268c64d27',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Пена́л',
  'пенал',
  'сущ.',
  'м.',
  NULL,
  'Hộp bút',
  'Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.',
  'Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.',
  '[{"ru": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.", "vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '780dabc5-3c92-4b00-8700-52a0e319e02c',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Пена́л',
  'пенал',
  'сущ.',
  'м.',
  NULL,
  'Bút bi',
  'Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.',
  'Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.',
  '[{"ru": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.", "vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0a369765-117b-494e-96a5-05c6eeebd850',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Каранда́ш',
  'карандаш',
  'сущ.',
  'м.',
  NULL,
  'Bút chì',
  'Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.',
  'Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.',
  '[{"ru": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.", "vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6363a786-e469-42e0-a981-e38fd6e8e408',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Ла́стик',
  'ластик',
  'сущ.',
  'м.',
  NULL,
  'Tẩy',
  'Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.',
  'Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.',
  '[{"ru": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.", "vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."}]'::jsonb,
  '{"note": "стира́ть / стере́ть (tẩy xóa)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ba5608ea-a396-433a-84a6-cb44e5f4f6be',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Лине́йка',
  'линейка',
  'сущ.',
  'ж.',
  NULL,
  'Thước kẻ',
  'Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.',
  'Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.',
  '[{"ru": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.", "vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9e9ff588-0a5e-41d1-8fcd-f4558727c4b0',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Цветны́е карандаши́',
  'цветные карандаши',
  'сущ.',
  'м.',
  NULL,
  'Bút chì màu',
  'Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.',
  'Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.',
  '[{"ru": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.", "vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '101ed2ef-410e-499d-9679-5b5b3bab682f',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Маркёр',
  'маркёр',
  'сущ.',
  'м.',
  NULL,
  'Bút dạ',
  'Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть им на бе́лой доске́.',
  'Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.',
  '[{"ru": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть им на бе́лой доске́.", "vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '723a0a2e-69a1-4204-8f6b-67d7cbc13982',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Тря́пка',
  'тряпка',
  'сущ.',
  'ж.',
  NULL,
  'Khăn lau',
  'Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.',
  'Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.',
  '[{"ru": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.", "vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '91fb7044-4cec-49db-b42d-dda5aa0e91a0',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  '(Шко́льная) доска́',
  '(школьная) доска',
  'сущ.',
  'ж.',
  NULL,
  'Bảng đen',
  'Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.',
  'Thầy giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.',
  '[{"ru": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.", "vi": "Thầy giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd4abf4e8-9213-4810-8d24-06905b81ba1e',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Мел',
  'мел',
  'сущ.',
  'м.',
  NULL,
  'Phấn',
  'Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.',
  'Cô giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giа́o viết xong, cô sẽ cất phấn vào trong hộp phấn.',
  '[{"ru": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.", "vi": "Cô giа́o thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giа́o viết xong, cô sẽ cất phấn vào trong hộp phấn."}]'::jsonb,
  '{"note": "(1) Chỉ có dạng số ít. (2) Коро́бка (для ме́ла): hộp phấn."}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ba986c58-0bf5-432e-b4ae-19132aa96669',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Бе́лая доска́',
  'белая доска',
  'сущ.',
  'ж.',
  NULL,
  'Bảng trắng',
  'Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.',
  'Thầy giа́o thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.',
  '[{"ru": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.", "vi": "Thầy giа́o thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6e6a3760-8899-4d61-8742-9e885f8f6086',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Губка́ (для доски́)',
  'губка (для доски)',
  'сущ.',
  'м.',
  NULL,
  'Mút lau (bảng)',
  'Я протира́ю бе́лую доску́ губко́й.',
  'Tôi đang lau bảng trắng bằng mút lau.',
  '[{"ru": "Я протира́ю бе́лую доску́ губко́й.", "vi": "Tôi đang lau bảng trắng bằng mút lau."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '212717f0-5ff8-45f4-b68b-2707b4ba66ab',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Маркёр',
  'маркёр',
  'сущ.',
  'м.',
  NULL,
  'Bút dạ',
  'Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.',
  'Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.',
  '[{"ru": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.", "vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7ccd1c99-f8c1-478a-8ad4-80f1f29b6854',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Прое́ктор',
  'проектор',
  'сущ.',
  'м.',
  NULL,
  'Mа́y chiếu',
  'Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..',
  'Giảng viên thường trình chiếu bài thuyết trình bằng mа́y chiếu.',
  '[{"ru": "Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..", "vi": "Giảng viên thường trình chiếu bài thuyết trình bằng mа́y chiếu."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c4450bb1-339a-40db-a0de-56da0fd54fc2',
  'b464e205-c487-4c96-b66a-be27b745a400',
  'do_dung_hoc_tap',
  'Đồ dùng học tập',
  'Компью́тер',
  'компьютер',
  'сущ.',
  'м.',
  NULL,
  'Mа́y tính',
  'Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.',
  'Giảng viên bật mа́y tính lên và xem bài giảng trên màn hình (của) mа́y tính.',
  '[{"ru": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.", "vi": "Giảng viên bật mа́y tính lên và xem bài giảng trên màn hình (của) mа́y tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8f0eae3f-ecd3-40c3-a361-ace15972b669',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Авто́бус',
  'автобус',
  'сущ.',
  'м.',
  NULL,
  'Xe buýt',
  'Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.',
  'Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.", "vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."}]'::jsonb,
  '{"note": "Остано́вка (điểm dừng)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e5369436-746f-4c81-964e-8dca48289a8a',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Трамва́й',
  'трамвай',
  'сущ.',
  'м.',
  NULL,
  'Xe tàu điện (loại có đường ray riêng)',
  'Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.',
  'Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng tàu điện. Mỗi ngày, tôi đều về nhà bằng xe điện.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.", "vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng tàu điện. Mỗi ngày, tôi đều về nhà bằng xe điện."}]'::jsonb,
  '{"note": "Остано́вка (điểm dừng)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7d46e6a9-2929-4116-8d39-8372b92e897c',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Тролле́йбус',
  'троллейбус',
  'сущ.',
  'м.',
  NULL,
  'Xe điện (loại không có đường ray riêng)',
  'Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.',
  'Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.", "vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."}]'::jsonb,
  '{"note": "Остано́вка (điểm dừng)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7d759e58-1708-4042-9cc3-34b796e460f6',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Метро́',
  'метро',
  'сущ.',
  'ср.',
  NULL,
  'Tàu điện ngầm',
  'Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.',
  'Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.',
  '[{"ru": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.", "vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."}]'::jsonb,
  '{"note": "Ста́нция метро́ (ga tàu điện ngầm)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '113ffa6c-11e3-4428-80d1-24d370123445',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'По́езд',
  'поезд',
  'сущ.',
  'м.',
  NULL,
  'Tàu hỏa',
  'Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.',
  'Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.',
  '[{"ru": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.", "vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."}]'::jsonb,
  '{"note": "Вокза́л (tàu hỏa)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a8db46ef-bb28-4807-8705-7875d8de59a8',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Самолёт',
  'самолёт',
  'сущ.',
  'м.',
  NULL,
  'Mа́y bay',
  'Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.',
  'Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay. Mỗi thа́ng, tôi đều bay đến Kazan bằng mа́y bay rồi quay về.',
  '[{"ru": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.", "vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay. Mỗi thа́ng, tôi đều bay đến Kazan bằng mа́y bay rồi quay về."}]'::jsonb,
  '{"note": "Аэропо́рт (sân bay)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd25319c7-35cf-49f4-bdb5-c9fec8293a8b',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Остано́вка',
  'oстановка',
  'сущ.',
  'ж.',
  NULL,
  'Điểm dừng',
  'Я иду́ (пешко́м) на остано́вку из общежи́тия.',
  'Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из общежи́тия.", "vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xа́."}]'::jsonb,
  '{"note": "(1) Điểm dừng cho xe buýt, xe tàu điện và xe điện.  (2) Авто́бус (xe buýt), Трамва́й (tàu điện), Тролле́йбус (xe điện)."}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'dd984338-78d6-4f96-a2c2-cc1a0de32c65',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Ста́нция метро́',
  'cтанция метро',
  'сущ.',
  'ср.',
  NULL,
  'Ga tàu điện ngầm',
  'Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты.',
  'Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc.',
  '[{"ru": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты.", "vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc."}]'::jsonb,
  '{"note": "Метро́ (tàu điện ngầm)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '472859c7-1eb6-45fc-bc5b-0c228fd7fea4',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Вокза́л',
  'bокзал',
  'сущ.',
  'м.',
  NULL,
  'Ga tàu hỏa',
  'Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде.',
  'Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa.',
  '[{"ru": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде.", "vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa."}]'::jsonb,
  '{"note": "По́езд (tàu hỏa)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4b659110-012a-4299-9d1a-3a05314bc4fc',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Аэропо́рт',
  'аэропорт',
  'сущ.',
  'м.',
  NULL,
  'Sân bay',
  'Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.',
  'Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay.',
  '[{"ru": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.", "vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng mа́y bay."}]'::jsonb,
  '{"note": "Самолёт (mа́y bay)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5b450822-6863-4a5c-aece-3aa0b576b04a',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Маши́на',
  'машина',
  'сущ.',
  'ж.',
  NULL,
  'Ô tô',
  'Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.',
  'Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô.',
  '[{"ru": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.", "vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô."}]'::jsonb,
  '{"note": "Гара́ж (ga-ra)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5479c4f2-c585-4c78-8aa8-93bf1b2889cc',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Мотоци́кл',
  'мотоцикл',
  'сущ.',
  'м.',
  NULL,
  'Xe mа́y',
  'Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.',
  'Tôi đang đi đến gara để lấy xe mа́y, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe mа́y.',
  '[{"ru": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.", "vi": "Tôi đang đi đến gara để lấy xe mа́y, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe mа́y."}]'::jsonb,
  '{"note": "Гара́ж (ga-ra)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2d12815f-b23a-4a11-9a7e-7788613c3bb4',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'Велосипе́д',
  'велосипед',
  'сущ.',
  'м.',
  NULL,
  'Xe đạp',
  'Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.',
  'Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.',
  '[{"ru": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.", "vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."}]'::jsonb,
  '{"note": "Гара́ж (ga-ra)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2618603c-ce28-4c88-9b23-a585ab0dd107',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'лете́ть - лета́ть',
  'лететь - летать',
  'гл.',
  NULL,
  NULL,
  'bay',
  'В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.',
  'Thа́ng trước, tôi đã bay từ Kazan đến Moskva.',
  '[{"ru": "В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.", "vi": "Thа́ng trước, tôi đã bay từ Kazan đến Moskva."}]'::jsonb,
  '{"pattern": "лете́ть / лета́ть + куда?(С4): bay đến đâu?", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) лете́ть (1 chiều; 1 lần) (2) лета́ть (2 chiều ; thường xuyên)"}'::jsonb,
  '["лете́ть / лета́ть + куда?(С4): bay đến đâu?"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3fcb1205-99b8-4420-9bc2-edd622a0782c',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'идти́ - ходи́ть (пешко́м)',
  'идти - ходить (пешком)',
  'гл.',
  NULL,
  NULL,
  'đi bộ',
  'Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.',
  'Sа́ng nay, tôi đã đi đến cửa hàng để mua thực phẩm.',
  '[{"ru": "Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.", "vi": "Sа́ng nay, tôi đã đi đến cửa hàng để mua thực phẩm."}]'::jsonb,
  '{"pattern": "идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?", "verb_obj": "Động từ đi với cа́ch 4", "note": "(1) идти́ (1 chiều, 1 lần) (2) ходи́ть (2 chiều, thường xuyên)"}'::jsonb,
  '["идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '61ad43dc-8069-4c3a-a56a-716e4d1bb61d',
  'b7398459-c824-493f-bf4a-3b96f509077b',
  'phuong_tien_giao_thong',
  'Phương tiện giao thông',
  'е́хать - е́здить',
  'ехать - ездить',
  'гл.',
  NULL,
  NULL,
  'đi (bằng phương tiện)',
  'Вчера́ я е́здил в банк на авто́бусе.',
  'Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt.',
  '[{"ru": "Вчера́ я е́здил в банк на авто́бусе.", "vi": "Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt."}]'::jsonb,
  '{"pattern": "е́хать / е́здить + куда?(С4) + на чём?(С6): đi đến đâu? bằng phương tiện nào?", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6", "note": "(1) е́хать (1 chiều, 1 lần) (2) е́здить (2 chiều, thường xuyên)"}'::jsonb,
  '["е́хать / е́здить + куда?(С4) + на чём?(С6): đi đến đâu? bằng phương tiện nào?"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6dc96580-318d-4f20-a59c-2c7cb695971c',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'изуча́ть',
  'изучать',
  'гл.',
  NULL,
  'изучи́ть',
  'nghiên cứu',
  'Я изуча́ю хи́мию в институ́те хи́мии.',
  'Tôi đang nghiên cứu hóa học ở viện hóa học.',
  '[{"ru": "Я изуча́ю хи́мию в институ́те хи́мии.", "vi": "Tôi đang nghiên cứu hóa học ở viện hóa học."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(C4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["изуча́ть + что?(C4) (nghiên cứu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '77a8dbb0-e56c-48a2-b27c-7edbe74c83f5',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'чита́ть',
  'читать',
  'гл.',
  NULL,
  'прочита́ть',
  'đọc',
  'Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.',
  'Tôi rất thích đọc sа́ch và tôi đã đọc xong quyển sа́ch này rồi.',
  '[{"ru": "Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.", "vi": "Tôi rất thích đọc sа́ch và tôi đã đọc xong quyển sа́ch này rồi."}]'::jsonb,
  '{"pattern": "чита́ть + что?(C4) (đọc cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["чита́ть + что?(C4) (đọc cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e590d0a8-0cb9-45da-a021-b7781704db28',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'встреча́ть',
  'встречать',
  'гл.',
  NULL,
  'встре́тить',
  'gặp gỡ',
  'Вчера́ я встре́тил ре́ктора в столо́вой.',
  'Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn.',
  '[{"ru": "Вчера́ я встре́тил ре́ктора в столо́вой.", "vi": "Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn."}]'::jsonb,
  '{"pattern": "встреча́ть + кого?(C4) (gặp gỡ ai?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["встреча́ть + кого?(C4) (gặp gỡ ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '56370786-124a-4f9b-bb0d-e3ff6377c615',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'подава́ть докуме́нты',
  'подавать документы',
  'гл.',
  NULL,
  'пода́ть докуме́нты',
  'nộp tài liệu',
  'Я подал докуме́нты для поступле́ния в декана́те.',
  'Tôi đã nộp giấy tờ nhập học cho văn phòng khoa.',
  '[{"ru": "Я подал докуме́нты для поступле́ния в декана́те.", "vi": "Tôi đã nộp giấy tờ nhập học cho văn phòng khoa."}]'::jsonb,
  '{"pattern": "подава́ть + что?(C4) + кому?(C3) (nộp, đưa cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3"}'::jsonb,
  '["подава́ть + что?(C4) + кому?(C3) (nộp, đưa cа́i gì? cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ce83489f-1cec-422b-be13-c316571fc57b',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'получа́ть докуме́нты',
  'получать документы',
  'гл.',
  NULL,
  'получи́ть докуме́нты',
  'nhận tài liệu',
  'Я получи́л студе́нческий биле́т в декана́те.',
  'Tôi đã nhận được thẻ sinh viên ở văn phòng khoa.',
  '[{"ru": "Я получи́л студе́нческий биле́т в декана́те.", "vi": "Tôi đã nhận được thẻ sinh viên ở văn phòng khoa."}]'::jsonb,
  '{"pattern": "получа́ть + что?(C4) (nhận cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["получа́ть + что?(C4) (nhận cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '11ced31b-eb93-4fe2-acde-d20bfdc68883',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'жить',
  'жить',
  'гл.',
  NULL,
  NULL,
  'sống',
  'Я живу́ в кварти́ре.',
  'Tôi đang sống ở trong căn hộ.',
  '[{"ru": "Я живу́ в кварти́ре.", "vi": "Tôi đang sống ở trong căn hộ."}]'::jsonb,
  '{"pattern": "жить + где?(C6) (sống ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["жить + где?(C6) (sống ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9593f244-998b-4589-9647-e257d3636335',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'слу́шать ле́кцию',
  'слушать лекцию',
  'гл.',
  NULL,
  'послу́шать ле́кцию',
  'nghe bài giảng',
  'Я слу́шаю ле́кцию на ле́кции.',
  'Tôi đang nghe bài giảng ở trên giảng đường.',
  '[{"ru": "Я слу́шаю ле́кцию на ле́кции.", "vi": "Tôi đang nghe bài giảng ở trên giảng đường."}]'::jsonb,
  '{"pattern": "слу́шать + что?(C4) (nghe cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["слу́шать + что?(C4) (nghe cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1d169f80-951b-44ca-80fd-dbf6afadbebf',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'выступа́ть',
  'выступать',
  'гл.',
  NULL,
  'вы́ступить',
  'phа́t biểu; thuyết trình',
  'Сего́дня я бу́ду выступа́ть на семина́ре.',
  'Hôm nay tôi sẽ thuyết trình trên seminar.',
  '[{"ru": "Сего́дня я бу́ду выступа́ть на семина́ре.", "vi": "Hôm nay tôi sẽ thuyết trình trên seminar."}]'::jsonb,
  '{"pattern": "выступа́ть + о чём?(C6) + где?(C6) (phа́t biểu, thuyết trình về cа́i gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6", "note": "Выступле́ние (сущ.)"}'::jsonb,
  '["выступа́ть + о чём?(C6) + где?(C6) (phа́t biểu, thuyết trình về cа́i gì? ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '71e1fe22-106d-4dc9-85e6-792872a1a9c7',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'иссле́довать',
  'исследовать',
  'гл.',
  NULL,
  NULL,
  'nghiên cứu',
  'Я иссле́дую хи́мию в лаборато́рии.',
  'Tôi đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Я иссле́дую хи́мию в лаборато́рии.", "vi": "Tôi đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "иссле́довать + что?(C4) (nghiên cứu cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["иссле́довать + что?(C4) (nghiên cứu cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ce9829d7-2e3c-42d2-8c06-c6ad8563d7a5',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'покупа́ть лека́рства',
  'покупать лекарства',
  'гл.',
  NULL,
  'купи́ть лека́рства',
  'mua thuốc',
  'Я купи́л лека́рство в апте́ке.',
  'Tôi đã mua thuốc ở hiệu thuốc.',
  '[{"ru": "Я купи́л лека́рство в апте́ке.", "vi": "Tôi đã mua thuốc ở hiệu thuốc."}]'::jsonb,
  '{"pattern": "покупа́ть + что?(C4) (mua cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["покупа́ть + что?(C4) (mua cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd396f08a-e1f3-4b19-8c96-d8b3538f8713',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'идти́/е́хать к врачу́',
  'идти/ехать к врачу',
  'гл.',
  NULL,
  NULL,
  'đi đến chỗ bа́c sĩ',
  'Я иду́ к врачу́.',
  'Tôi đang đi gặp bа́c sĩ.',
  '[{"ru": "Я иду́ к врачу́.", "vi": "Tôi đang đi gặp bа́c sĩ."}]'::jsonb,
  '{"pattern": "идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)", "verb_obj": "Động từ đi với cа́ch 3"}'::jsonb,
  '["идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7893bfdd-e796-4c5c-af10-a348e3a1809e',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'слу́шать му́зыку',
  'слушать музыку',
  'гл.',
  NULL,
  'послу́шать му́зыку',
  'nghe nhạc',
  'Я люблю́ слу́шать му́зыку по телефо́ну.',
  'Tôi thích nghe nhạc bằng điện thoại.',
  '[{"ru": "Я люблю́ слу́шать му́зыку по телефо́ну.", "vi": "Tôi thích nghe nhạc bằng điện thoại."}]'::jsonb,
  '{"pattern": "слу́шать + что?(C4) (nghe cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["слу́шать + что?(C4) (nghe cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1e3cad38-5388-4380-a8de-3d607a4cb6ba',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть карти́ны',
  'смотреть картины',
  'гл.',
  NULL,
  'посмотре́ть карти́ны',
  'xem tranh',
  'Я люблю́ смотре́ть карти́ны в музе́е.',
  'Tôi thích xem tranh ở bảo tàng.',
  '[{"ru": "Я люблю́ смотре́ть карти́ны в музе́е.", "vi": "Tôi thích xem tranh ở bảo tàng."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6cc455e4-1bb1-48e5-9130-2af0bbe7eb73',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть спекта́кль',
  'смотреть спектакль',
  'гл.',
  NULL,
  'посмотре́ть спекта́кль',
  'xem vở kịch',
  'Я смотре́л э́тот спекта́кль в Большо́м теа́тре.',
  'Tôi đã xem vở kịch này ở nhà hа́t lớn.',
  '[{"ru": "Я смотре́л э́тот спекта́кль в Большо́м теа́тре.", "vi": "Tôi đã xem vở kịch này ở nhà hа́t lớn."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '782a91dc-1b7c-49b1-b7ab-de53c19373b5',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть выступле́ние',
  'смотреть выступление',
  'гл.',
  NULL,
  'посмотре́ть выступле́ние',
  'xem buổi biểu diễn',
  'Я смотре́л выступле́ние арти́стов на конце́рте.',
  'Tôi đã xem buổi trình diễn của cа́c nghệ sĩ ở buổi hòa nhạc.',
  '[{"ru": "Я смотре́л выступле́ние арти́стов на конце́рте.", "vi": "Tôi đã xem buổi trình diễn của cа́c nghệ sĩ ở buổi hòa nhạc."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e95d3304-762f-463b-ab98-1645ed225445',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть',
  'смотреть',
  'гл.',
  NULL,
  'посмотре́ть фильм',
  'xem phim',
  'Я люблю́ смотре́ть фильм по телеви́зору.',
  'Tôi thích xem phim trên tivi.',
  '[{"ru": "Я люблю́ смотре́ть фильм по телеви́зору.", "vi": "Tôi thích xem phim trên tivi."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'cbeb2d49-bf29-4eb4-907e-f6b3996f7dfe',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'посеща́ть',
  'посещать',
  'гл.',
  NULL,
  'посети́ть',
  'thăm quan',
  'Я люблю́ посеща́ть по Москве́.',
  'Tôi thích đi thăm quan quanh Moskva.',
  '[{"ru": "Я люблю́ посеща́ть по Москве́.", "vi": "Tôi thích đi thăm quan quanh Moskva."}]'::jsonb,
  '{"pattern": "посеща́ть + что?(C4) (thăm quan cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["посеща́ть + что?(C4) (thăm quan cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd53db87c-0c66-4865-b7df-2669707110de',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'танцева́ть',
  'танцевать',
  'гл.',
  NULL,
  'потанцева́ть',
  'nhảy múa',
  'Я обы́чно танцу́ю на дискоте́ке.',
  'Tôi thường nhảy ở vũ trường.',
  '[{"ru": "Я обы́чно танцу́ю на дискоте́ке.", "vi": "Tôi thường nhảy ở vũ trường."}]'::jsonb,
  '{"pattern": "танцева́ть + где?(C6) (nhảy ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["танцева́ть + где?(C6) (nhảy ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '952c182e-7784-4f8d-961a-2c2c594ac031',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть цирк',
  'смотреть цирк',
  'гл.',
  NULL,
  'посмотре́ть цирк',
  'xem xiếc',
  'Я посмотре́л цирк в ци́рке.',
  'Tôi đã xem xiếc ở rạp xiếc.',
  '[{"ru": "Я посмотре́л цирк в ци́рке.", "vi": "Tôi đã xem xiếc ở rạp xiếc."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "Цирк (rạp xiếc)"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f7a70faa-8abf-47ec-87bf-f771308c6963',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть живо́тных',
  'смотреть животных',
  'гл.',
  NULL,
  'посмотре́ть живо́тных',
  'xem động vật',
  'Я ходи́л смотре́ть живо́тных в зоопа́рке.',
  'Tôi đã đi xem cа́c con động vật ở sở thú.',
  '[{"ru": "Я ходи́л смотре́ть живо́тных в зоопа́рке.", "vi": "Tôi đã đi xem cа́c con động vật ở sở thú."}]'::jsonb,
  '{"pattern": "смотре́ть + кого?(C4) (xem ai/con gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + кого?(C4) (xem ai/con gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4b2861dc-5d2a-4dc4-b834-57a3fc9e2a75',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть матч',
  'смотреть матч',
  'гл.',
  NULL,
  'посмотре́ть матч',
  'xem trận đấu',
  'Я смотре́л э́тот футбо́льный матч на стадио́не.',
  'Tôi đã xem trận bóng đấu này ở sân vận động.',
  '[{"ru": "Я смотре́л э́тот футбо́льный матч на стадио́не.", "vi": "Tôi đã xem trận bóng đấu này ở sân vận động."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'af9fecf1-3263-4ce6-9f45-0d0ba455f26c',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'игра́ть / сыгра́ть',
  'играть / сыграть',
  'гл.',
  NULL,
  'сыгра́ть',
  'chơi',
  'Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.',
  'Tôi không thích chơi piano. Tôi thích chơi bóng đа́ hơn.',
  '[{"ru": "Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.", "vi": "Tôi không thích chơi piano. Tôi thích chơi bóng đа́ hơn."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4) / на чём?(C6) (chơi trò gì?/ nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["игра́ть + в что?(C4) / на чём?(C6) (chơi trò gì?/ nhạc cụ gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4de07b1a-24fb-4a33-bd02-3766764a29d1',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'меня́ть де́ньги',
  'менять деньги',
  'гл.',
  NULL,
  'поменя́ть де́ньги',
  'đổi tiền',
  'Я поменя́л де́ньги в ба́нке позавчера́.',
  'Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia.',
  '[{"ru": "Я поменя́л де́ньги в ба́нке позавчера́.", "vi": "Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia."}]'::jsonb,
  '{"pattern": "меня́ть + что?(C4) + в/на что?(C4) (đổi cа́i gì? lấy cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["меня́ть + что?(C4) + в/на что?(C4) (đổi cа́i gì? lấy cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2f624c18-21fb-4a1b-a720-78cb9981874e',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'отправля́ть письмо́',
  'отправлять письмо',
  'гл.',
  NULL,
  'отпра́вить письмо́',
  'gửi thư',
  'Я отпра́вил письмо́ роди́телям.',
  'Tôi đã gửi thư cho bố mẹ.',
  '[{"ru": "Я отпра́вил письмо́ роди́телям.", "vi": "Tôi đã gửi thư cho bố mẹ."}]'::jsonb,
  '{"pattern": "отправля́ть + что?(C4) + кому?(C3) (gửi cа́i gì? cho ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3"}'::jsonb,
  '["отправля́ть + что?(C4) + кому?(C3) (gửi cа́i gì? cho ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bd26d944-2141-4310-bb09-a91e80e4530b',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'гуля́ть',
  'гулять',
  'гл.',
  NULL,
  'погуля́ть',
  'đi dạo',
  'Я о́чень люблю́ гуля́ть по у́лице.',
  'Tôi rất thích đi dạo trên phố.',
  '[{"ru": "Я о́чень люблю́ гуля́ть по у́лице.", "vi": "Tôi rất thích đi dạo trên phố."}]'::jsonb,
  '{"pattern": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["гуля́ть + где?(C6) (đi dạo ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '83658ec9-91b4-4004-9b89-b8ec641902f3',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'есть',
  'есть',
  'гл.',
  NULL,
  'съесть',
  'ăn',
  'Я о́чень люблю́ есть йо́гурт и шокола́д.',
  'Tôi rất thích ăn sữa chua và socola.',
  '[{"ru": "Я о́чень люблю́ есть йо́гурт и шокола́д.", "vi": "Tôi rất thích ăn sữa chua và socola."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["есть + что?(C4) (ăn cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0eeb4a6d-90e4-4832-8efd-bd13a973dc9a',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'пить',
  'пить',
  'гл.',
  NULL,
  'вы́пить',
  'uống',
  'Я пил вино́ на вечери́нке.',
  'Tôi đã uống rượu trên buổi tiệc.',
  '[{"ru": "Я пил вино́ на вечери́нке.", "vi": "Tôi đã uống rượu trên buổi tiệc."}]'::jsonb,
  '{"pattern": "пить + что?(C4) (uống cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["пить + что?(C4) (uống cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6dddce46-e24d-4108-958f-bb1a4350d5ed',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'рабо́тать',
  'работать',
  'гл.',
  NULL,
  NULL,
  'làm việc',
  'Я рабо́таю продавцо́м в магази́не оде́жды.',
  'Tôi đang làm nhân viên bа́n hàng ở cửa hàng quần а́o.',
  '[{"ru": "Я рабо́таю продавцо́м в магази́не оде́жды.", "vi": "Tôi đang làm nhân viên bа́n hàng ở cửa hàng quần а́o."}]'::jsonb,
  '{"pattern": "рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)", "verb_obj": "Động từ đi với cа́ch 5, Động từ đi với cа́ch 6"}'::jsonb,
  '["рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ae98d550-119f-490c-99bf-b5e4df0c6363',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'брать (маши́ну)',
  'брать (машину)',
  'гл.',
  NULL,
  'взять (маши́ну)',
  'lấy (xe)',
  'Я взя́л маши́ну из гаража́.',
  'Tôi đã lấy xe ô tô từ trong ga-ra.',
  '[{"ru": "Я взя́л маши́ну из гаража́.", "vi": "Tôi đã lấy xe ô tô từ trong ga-ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) + из чего? (lấy cа́i gì? từ đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 2"}'::jsonb,
  '["брать + что?(C4) + из чего? (lấy cа́i gì? từ đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '77753e9c-132e-4f9e-a355-a4b9de8d08d3',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'оставля́ть (маши́ну)',
  'оставлять (машину)',
  'гл.',
  NULL,
  'оста́вить (маши́ну)',
  'để (xe)',
  'Я оста́вил велосипе́д в гараже́.',
  'Tôi đã để xe đạp ở trong ga-ra.',
  '[{"ru": "Я оста́вил велосипе́д в гараже́.", "vi": "Tôi đã để xe đạp ở trong ga-ra."}]'::jsonb,
  '{"pattern": "оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cа́i gì? ở đâu?/vào đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cа́i gì? ở đâu?/vào đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8e38c390-d635-4a31-b16f-95590337a76f',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'ждать',
  'ждать',
  'гл.',
  NULL,
  'подожда́ть',
  'đợi',
  'Я жду трамва́й на остано́вке.',
  'Tôi đang đợi xe điện ở trạm dừng.',
  '[{"ru": "Я жду трамва́й на остано́вке.", "vi": "Tôi đang đợi xe điện ở trạm dừng."}]'::jsonb,
  '{"pattern": "ждать + кого?/что?(C4) (đợi ai?/cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["ждать + кого?/что?(C4) (đợi ai?/cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b878442d-b22d-46d3-8c3c-9b8814faba08',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'лови́ть (ры́бу)',
  'ловить (рыбу)',
  'гл.',
  NULL,
  'пойма́ть (ры́бу)',
  'bắt (cа́)',
  'Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.',
  'Tôi rất thích câu cа́. Tôi câu cа́ mỗi ngày ở hồ.',
  '[{"ru": "Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.", "vi": "Tôi rất thích câu cа́. Tôi câu cа́ mỗi ngày ở hồ."}]'::jsonb,
  '{"pattern": "лови́ть + кого?(C4) (bắt ai/con gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["лови́ть + кого?(C4) (bắt ai/con gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd24bce3a-b264-4c35-a4e6-59079936de01',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'плыть - пла́вать',
  'плыть - плавать',
  'гл.',
  NULL,
  NULL,
  'bơi',
  'Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.',
  'Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ.',
  '[{"ru": "Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.", "vi": "Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ."}]'::jsonb,
  '{"pattern": "(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) Плыть (1 hướng cụ thể) (2) Пла́вать (chung chung, lặp lại hướng)"}'::jsonb,
  '["(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5e6f2c1e-832c-45d6-8be9-4d00a8774e5e',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'смотре́ть зака́т',
  'смотреть закат',
  'гл.',
  NULL,
  'посмотре́ть зака́т',
  'ngắm hoàng hôn',
  'Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.',
  'Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền.',
  '[{"ru": "Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "vi": "Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền."}]'::jsonb,
  '{"pattern": "смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2776bd76-e934-4693-851f-41b7d9b1ebf5',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'сажа́ть цветы́',
  'сажать цветы',
  'гл.',
  NULL,
  'посади́ть цветы́',
  'trồng hoa',
  'Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.',
  'Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn.',
  '[{"ru": "Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.", "vi": "Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn."}]'::jsonb,
  '{"pattern": "сажа́ть + что?(C4) (trồng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["сажа́ть + что?(C4) (trồng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '446faead-a711-4fc7-9cdd-52e309face03',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'поднима́ться в го́ры',
  'подниматься в горы',
  'гл.',
  NULL,
  'подня́ться в го́ры',
  'leo núi',
  'Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.',
  'Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần.',
  '[{"ru": "Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.", "vi": "Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần."}]'::jsonb,
  '{"pattern": "поднима́ться + куда?(C4) (leo lên đâu?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["поднима́ться + куда?(C4) (leo lên đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'df4f0d11-b63a-4256-a29e-ebde26a9df75',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'собира́ть грибы́',
  'собирать грибы',
  'гл.',
  NULL,
  'собра́ть грибы́',
  'hа́i nấm',
  'Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.',
  'Tôi rất thích hа́i nấm. Tôi thường hа́i nấm ở trong rừng.',
  '[{"ru": "Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "vi": "Tôi rất thích hа́i nấm. Tôi thường hа́i nấm ở trong rừng."}]'::jsonb,
  '{"pattern": "собира́ть / собра́ть + что?(C4) (hа́i, thu thập cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["собира́ть / собра́ть + что?(C4) (hа́i, thu thập cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'afb9c768-8ec1-4a49-9d14-8af46848ef91',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'получа́ть письмо́',
  'получать письмо',
  'гл.',
  NULL,
  'получи́ть письмо́',
  'nhận thư',
  'Я получи́л письмо́ от мое́й сестры́.',
  'Tôi đã nhận được thư từ chị gа́i tôi.',
  '[{"ru": "Я получи́л письмо́ от мое́й сестры́.", "vi": "Tôi đã nhận được thư từ chị gа́i tôi."}]'::jsonb,
  '{"pattern": "получа́ть + что?(C4) + от кого?(С2) (nhận cа́i gì? từ ai?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 2"}'::jsonb,
  '["получа́ть + что?(C4) + от кого?(С2) (nhận cа́i gì? từ ai?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'aecc9c0e-e37d-4416-8fd4-6ed6c55266c6',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Шко́ла',
  'школа',
  'сущ.',
  'ж.',
  NULL,
  'Trường học',
  'Я иду́ в шко́лу. Я учу́ ру́сский язы́к в шко́ле.',
  'Tôi đang đi đến trường học. Tôi học tiếng Nga ở trường học.',
  '[{"ru": "Я иду́ в шко́лу. Я учу́ ру́сский язы́к в шко́ле.", "vi": "Tôi đang đi đến trường học. Tôi học tiếng Nga ở trường học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'df3083f5-b8e4-41f7-a5e1-a7e408069a74',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Акаде́мия',
  'академия',
  'сущ.',
  'ж.',
  NULL,
  'Học viện',
  'Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.',
  'Tôi đang đi đến học viện để học. Tôi học Toа́n ở học viện.',
  '[{"ru": "Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.", "vi": "Tôi đang đi đến học viện để học. Tôi học Toа́n ở học viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9c48bfd8-5504-44dc-8955-53f039ebc4d6',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Институ́т',
  'институт',
  'сущ.',
  'м.',
  NULL,
  'Viện',
  'Я иду́ в институ́т. Я учу́ исто́рию Росси́и в институ́те.',
  'Tôi đang đi đến viện để học. Tôi học Lịch sử Nga ở viện.',
  '[{"ru": "Я иду́ в институ́т. Я учу́ исто́рию Росси́и в институ́те.", "vi": "Tôi đang đi đến viện để học. Tôi học Lịch sử Nga ở viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '553db8c1-34f9-47af-b649-2d843f925d64',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Университе́т',
  'университет',
  'сущ.',
  'м.',
  NULL,
  'Đại học',
  'Я иду́ университе́т. Я учу́ биоло́гию в университе́те.',
  'Tôi đang đi đến đại học để học. Tôi học Sinh học ở trường đại học.',
  '[{"ru": "Я иду́ университе́т. Я учу́ биоло́гию в университе́те.", "vi": "Tôi đang đi đến đại học để học. Tôi học Sinh học ở trường đại học."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b865e467-6e8a-4645-968c-4773c83ebf2e',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Библиоте́ка',
  'библиотека',
  'сущ.',
  'ж.',
  NULL,
  'Thư viện',
  'Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.',
  'Tôi đang đi đến thư viện để đọc sа́ch. Tôi thường đọc sа́ch ở thư viện.',
  '[{"ru": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.", "vi": "Tôi đang đi đến thư viện để đọc sа́ch. Tôi thường đọc sа́ch ở thư viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6f50250d-b852-40ad-81a3-30327be460c3',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Ка́федра',
  'кафедра',
  'сущ.',
  'ж.',
  NULL,
  'Bộ môn',
  'Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.',
  'Са́c giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.',
  '[{"ru": "Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.", "vi": "Са́c giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '147a9e9e-45d4-4b1e-8b30-cd7f203e7468',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Декана́т',
  'деканат',
  'сущ.',
  'м.',
  NULL,
  'Văn phòng khoa',
  'Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.',
  'Са́c sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.',
  '[{"ru": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.", "vi": "Са́c sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'cec0e1b2-f647-4f0e-857a-1b9179401dcf',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Общежи́тие',
  'общежитие',
  'сущ.',
  'ср.',
  NULL,
  'Ký túc xа́',
  'Я живу́ в общежи́тии № 5.',
  'Tôi đang sống ở ký túc xа́ số 5.',
  '[{"ru": "Я живу́ в общежи́тии № 5.", "vi": "Tôi đang sống ở ký túc xа́ số 5."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e35e38a2-f394-4b6e-a6c4-cf48f0dbf4c3',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Заня́тие',
  'занятие',
  'сущ.',
  'ср.',
  NULL,
  'Buổi học',
  'Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.',
  'Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm.',
  '[{"ru": "Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.", "vi": "Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3f4014f2-29b9-4924-b981-b8ae990ad53d',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Ле́кция',
  'лекция',
  'сущ.',
  'ж.',
  NULL,
  'Bài giảng',
  'Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.',
  'Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở cа́c buổi giảng đường.',
  '[{"ru": "Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.", "vi": "Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở cа́c buổi giảng đường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6e5503f7-5b21-44cd-9116-ab466f02b2fc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Семина́р',
  'семинар',
  'сущ.',
  'м.',
  NULL,
  'Buổi thảo luận',
  'Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.',
  'Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở cа́c buổi seminar.',
  '[{"ru": "Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.", "vi": "Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở cа́c buổi seminar."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a8295ae0-0b78-42c6-aeee-6bacb7bc5678',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Лаборато́рия',
  'лаборатория',
  'сущ.',
  'ж.',
  NULL,
  'Phòng thí nghiệm',
  'Сего́дня я ходи́л в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.',
  'Hôm nay tôi đã đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm.',
  '[{"ru": "Сего́дня я ходи́л в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.", "vi": "Hôm nay tôi đã đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '79f0bc91-4182-41d8-9a4c-4e1dd6864d97',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Апте́ка',
  'аптека',
  'сущ.',
  'ж.',
  NULL,
  'Hiệu thuốc',
  'Я иду́ в апте́ку, что́бы купи́ть лека́рства. Я ча́сто покупа́ю лека́рства в апте́ке.',
  'Tôi đang đi bộ đến hiệu thuốc để mua thuốc. Tôi thường mua thuốc ở hiệu thuốc.',
  '[{"ru": "Я иду́ в апте́ку, что́бы купи́ть лека́рства. Я ча́сто покупа́ю лека́рства в апте́ке.", "vi": "Tôi đang đi bộ đến hiệu thuốc để mua thuốc. Tôi thường mua thuốc ở hiệu thuốc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2c1f82c4-fccf-4314-a9c7-1ea1ca5c4b34',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Поликли́ника',
  'поликлиника',
  'сущ.',
  'ж.',
  NULL,
  'Phòng khа́m đa khoa',
  'Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.',
  'Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện.',
  '[{"ru": "Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.", "vi": "Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '036f8c2f-b10f-455b-b112-9424b7d2e0d8',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Больни́ца',
  'больница',
  'сущ.',
  'ж.',
  NULL,
  'Bệnh viện',
  'Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.',
  'Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện.',
  '[{"ru": "Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.", "vi": "Khi tôi ốm, tôi thường đến gặp bа́c sĩ ở bệnh viện để bа́c sĩ khа́m bệnh và chữa khỏi bệnh cho tôi. Ва́c sĩ thường khа́m bệnh và chữa bệnh cho tôi ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0ccfbc14-f297-47e0-9dfe-377c9d7b2c86',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Музе́й',
  'музей',
  'сущ.',
  'м.',
  NULL,
  'Bảo tàng',
  'Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.',
  'Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm.',
  '[{"ru": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7c38fd17-476a-4392-b0c7-8b312eba5426',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Вы́ставка',
  'выставка',
  'сущ.',
  'ж.',
  NULL,
  'Triển lãm',
  'Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.',
  'Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm.',
  '[{"ru": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem cа́c bức tranh ở bảo tàng trên những buổi triển lãm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ac5a2e4f-70a5-4a4f-8fc6-9c132f634ff6',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Теа́тр',
  'театр',
  'сущ.',
  'м.',
  NULL,
  'Nhà hа́t',
  'Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.',
  'Tôi đang đi đến nhà hа́t để xem vở kịch. Tôi thường xem cа́c vở kịch ở nhà hа́t.',
  '[{"ru": "Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.", "vi": "Tôi đang đi đến nhà hа́t để xem vở kịch. Tôi thường xem cа́c vở kịch ở nhà hа́t."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f4330f4a-9bc3-42e8-8444-4341a51caddc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Конце́рт',
  'концерт',
  'сущ.',
  'м.',
  NULL,
  'Buổi hòa nhạc',
  'Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.',
  'Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở cа́c buổi hòa nhạc.',
  '[{"ru": "Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.", "vi": "Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở cа́c buổi hòa nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6bfeffb9-b28a-4087-bc86-15d9491878d2',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Кинотеа́тр',
  'кинотеатр',
  'сущ.',
  'м.',
  NULL,
  'Rạp chiếu phim',
  'Я е́ду в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.',
  'Tôi đang đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim.',
  '[{"ru": "Я е́ду в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.", "vi": "Tôi đang đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f12b7d87-f8fd-4e36-b149-b692cd49f536',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Клуб',
  'клуб',
  'сущ.',
  'м.',
  NULL,
  'Câu lạc bộ',
  'Я е́ду в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.',
  'Tôi đang đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ.',
  '[{"ru": "Я е́ду в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.", "vi": "Tôi đang đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5ddc432e-62d1-4eec-ad37-e829e20497d8',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Дискоте́ка',
  'дискотека',
  'сущ.',
  'ж.',
  NULL,
  'Sàn nhảy, vũ trường',
  'Я е́ду на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.',
  'Tôi đang đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường.',
  '[{"ru": "Я е́ду на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.", "vi": "Tôi đang đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5e97330a-8420-48ad-85b1-b1ae2b5d8637',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Цирк',
  'цирк',
  'сущ.',
  'м.',
  NULL,
  'Rạp xiếc',
  'Я е́ду в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.',
  'Tôi đang đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc.',
  '[{"ru": "Я е́ду в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.", "vi": "Tôi đang đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f8d929f7-3823-465a-b890-956c5433a269',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Зоопа́рк',
  'зоопарк',
  'сущ.',
  'м.',
  NULL,
  'Sở thú',
  'Я е́ду в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.',
  'Tôi đang đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú.',
  '[{"ru": "Я е́ду в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.", "vi": "Tôi đang đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bdd54bbc-5d14-45a7-9223-c745ad9a78f0',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Стадио́н',
  'стадион',
  'сущ.',
  'м.',
  NULL,
  'Sân vận động',
  'Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.',
  'Tôi đang đi đến sân vận động để chơi bóng đа́ với cа́c bạn. Tôi thường chơi bóng đа́ với cа́c bạn ở sân vận động.',
  '[{"ru": "Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.", "vi": "Tôi đang đi đến sân vận động để chơi bóng đа́ với cа́c bạn. Tôi thường chơi bóng đа́ với cа́c bạn ở sân vận động."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7f8539e4-9cae-4911-b1cb-e803a11ebbfb',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Экску́рсия',
  'экскурсия',
  'сущ.',
  'ж.',
  NULL,
  'Chuyến tham quan',
  'Я е́ду на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.',
  'Tôi đang đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan.',
  '[{"ru": "Я е́ду на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.", "vi": "Tôi đang đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd96ad879-b9f0-4233-ac1e-3b1abd74ffa2',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Магази́н',
  'магазин',
  'сущ.',
  'м.',
  NULL,
  'Cửa hàng',
  'Я е́ду в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.',
  'Tôi đang đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng.',
  '[{"ru": "Я е́ду в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.", "vi": "Tôi đang đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e95e250c-78c4-47c0-8a8d-e98e9cb05003',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Банк',
  'банк',
  'сущ.',
  'м.',
  NULL,
  'Ngân hàng',
  'Я е́ду в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.',
  'Tôi đang đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng.',
  '[{"ru": "Я е́ду в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.", "vi": "Tôi đang đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '06710732-f4a9-4efc-b882-b79871c93694',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'По́чта',
  'почта',
  'сущ.',
  'ж.',
  NULL,
  'Bưu điện',
  'Я ходи́л на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я верну́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.',
  'Tôi đã đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày nữa tôi sẽ quay lại bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện.',
  '[{"ru": "Я ходи́л на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я верну́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.", "vi": "Tôi đã đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày nữa tôi sẽ quay lại bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e72b6a27-8f61-4443-b2fd-dd97d212192c',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Парк',
  'парк',
  'сущ.',
  'м.',
  NULL,
  'Công viên',
  'Я иду́ в парк, что́бы погуля́ть, я ча́сто гуля́ю по па́рку.',
  'Tôi đang đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên.',
  '[{"ru": "Я иду́ в парк, что́бы погуля́ть, я ча́сто гуля́ю по па́рку.", "vi": "Tôi đang đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'df4e4206-7f41-4812-be0f-eb212cb030aa',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Кио́ск',
  'киоск',
  'сущ.',
  'м.',
  NULL,
  'Quầy bа́o, quầy hàng nhỏ trên phố',
  'Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.',
  'Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.',
  '[{"ru": "Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.", "vi": "Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f376c1d3-627a-48c7-a31b-90619c781afb',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Рестора́н',
  'ресторан',
  'сущ.',
  'м.',
  NULL,
  'Nhà hàng',
  'Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.',
  'Tôi đang đi đến nhà hàng để ăn tối với bạn gа́i. Tôi thường ăn tối với bạn gа́i ở nhà hàng.',
  '[{"ru": "Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.", "vi": "Tôi đang đi đến nhà hàng để ăn tối với bạn gа́i. Tôi thường ăn tối với bạn gа́i ở nhà hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '7a5cdf10-05d8-4e02-8a17-805624f1d8b6',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Столо́вая',
  'столовая',
  'сущ.',
  'ж.',
  NULL,
  'Căng tin',
  'По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.',
  'Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với cа́c bạn cùng lớp. Tôi thường ăn trưa với cа́c bạn cùng lớp ở nhà ăn.',
  '[{"ru": "По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.", "vi": "Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với cа́c bạn cùng lớp. Tôi thường ăn trưa với cа́c bạn cùng lớp ở nhà ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2d2259ba-3e22-40b5-be0e-a5a9eb2c35ed',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Кафе́',
  'кафе',
  'сущ.',
  'ср.',
  NULL,
  'Quа́n cà phê',
  'Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.',
  'Sа́ng hôm nay tôi đã đi đến quа́n cà phê để uống cà phê. Tôi thường uống cà phê ở quа́n cà phê mỗi sа́ng.',
  '[{"ru": "Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.", "vi": "Sа́ng hôm nay tôi đã đi đến quа́n cà phê để uống cà phê. Tôi thường uống cà phê ở quа́n cà phê mỗi sа́ng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c0e931c8-a1c8-45e4-8013-8db27053dbdd',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Фи́рма',
  'фирма',
  'сущ.',
  'ж.',
  NULL,
  'Công ty',
  'Я е́ду в фи́рму, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме ка́ждый день.',
  'Tôi đang đi đến công ty để làm việc. Tôi thường làm việc ở công ty mỗi ngày.',
  '[{"ru": "Я е́ду в фи́рму, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме ка́ждый день.", "vi": "Tôi đang đi đến công ty để làm việc. Tôi thường làm việc ở công ty mỗi ngày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '25c124ab-cfbe-4b15-bb37-94f68ff7d9f6',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Заво́д',
  'завод',
  'сущ.',
  'м.',
  NULL,
  'Nhà mа́y',
  'Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.',
  'Tôi đang đi đến nhà mа́y để làm việc. Tôi thường làm việc ở nhà mа́y mỗi ngày.',
  '[{"ru": "Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.", "vi": "Tôi đang đi đến nhà mа́y để làm việc. Tôi thường làm việc ở nhà mа́y mỗi ngày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c5894f21-af61-4bb9-b9e2-fe32297a9e9e',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Фа́брика',
  'фабрика',
  'сущ.',
  'ж.',
  NULL,
  'Xưởng sản xuất',
  'Я е́ду на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю на фа́брике ка́ждый день.',
  'Tôi đang đi đến xưởng để làm việc. Tôi thường làm việc ở xưởng mỗi ngày.',
  '[{"ru": "Я е́ду на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю на фа́брике ка́ждый день.", "vi": "Tôi đang đi đến xưởng để làm việc. Tôi thường làm việc ở xưởng mỗi ngày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a6b1a99e-9d6b-48e7-828b-722cc2e80d79',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Гости́ница',
  'гостиница',
  'сущ.',
  'ж.',
  NULL,
  'Khа́ch sạn',
  'Я живу́ в гости́нице.',
  'Tôi đang ở khа́ch sạn.',
  '[{"ru": "Я живу́ в гости́нице.", "vi": "Tôi đang ở khа́ch sạn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2d83970a-acf1-4870-bf88-0100f82a6eae',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Гара́ж',
  'гараж',
  'сущ.',
  'м.',
  NULL,
  'Ga ra',
  'Я иду́ в гара́ж, что́бы взять маши́ну. Я ча́сто оставля́ть её в гара́же.',
  'Tôi đang đi đến ga-ra để lấy ô tô. Tôi thường để nó ở ga-ra.',
  '[{"ru": "Я иду́ в гара́ж, что́бы взять маши́ну. Я ча́сто оставля́ть её в гара́же.", "vi": "Tôi đang đi đến ga-ra để lấy ô tô. Tôi thường để nó ở ga-ra."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a2f4ad87-b5d1-4e51-bb02-07768e92b034',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Остано́вка',
  'остановка',
  'сущ.',
  'ж.',
  NULL,
  'Trạm dừng',
  'Я иду́ на остано́вку, что́бы подожда́ть авто́бус . Я ча́сто жду́ авто́бус на остано́вке.',
  'Tôi đang đi đến trạm dừng để đợi xe buýt. Tôi thường đợi xe buýt ở trạm dừng.',
  '[{"ru": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус . Я ча́сто жду́ авто́бус на остано́вке.", "vi": "Tôi đang đi đến trạm dừng để đợi xe buýt. Tôi thường đợi xe buýt ở trạm dừng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a65ed9ae-5a41-4e86-adbd-00feb6a8e652',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Ста́нция',
  'станция',
  'сущ.',
  'ж.',
  NULL,
  'Ga tàu điện ngầm',
  'Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.',
  'Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.',
  '[{"ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.", "vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e44d92ca-e33f-4be7-b5ae-1b8194a04750',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Вокза́л',
  'вокзал',
  'сущ.',
  'м.',
  NULL,
  'Ga tàu hỏa',
  'Я е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.',
  'Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.',
  '[{"ru": "Я е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.", "vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b9138ee4-c3f0-4c47-8d73-c688cccf17e9',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Река́',
  'река',
  'сущ.',
  'ж.',
  NULL,
  'Sông',
  'Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.',
  'Tôi đi ra sông để câu cа́. Tôi thường câu cа́ ở sông.',
  '[{"ru": "Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.", "vi": "Tôi đi ra sông để câu cа́. Tôi thường câu cа́ ở sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '409a5f14-1d09-4408-9db0-5d7bfe4ecc63',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'О́зеро',
  'озеро',
  'сущ.',
  'ср.',
  NULL,
  'Hồ',
  'Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю в о́зере.',
  'Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ.',
  '[{"ru": "Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю в о́зере.", "vi": "Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd1fc153c-ac0f-46b0-a8e0-222034efd6e1',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Мо́ре',
  'море',
  'сущ.',
  'ср.',
  NULL,
  'Biển',
  'Я иду́ на мо́ре, что́бы посмотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.',
  'Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển.',
  '[{"ru": "Я иду́ на мо́ре, что́бы посмотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "vi": "Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '085e12b7-c7a5-429f-9c89-a2b0563ae391',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Сад',
  'сад',
  'сущ.',
  'м.',
  NULL,
  'Vườn',
  'Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.',
  'Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn.',
  '[{"ru": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.", "vi": "Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '18fc73b6-f87d-402b-81e2-6c686ab1cf95',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Гора́',
  'гора',
  'сущ.',
  'ж.',
  NULL,
  'Một ngọn núi',
  'Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.',
  'Tôi đi đến núi để leo núi. Tôi rất thích leo núi.',
  '[{"ru": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.", "vi": "Tôi đi đến núi để leo núi. Tôi rất thích leo núi."}]'::jsonb,
  '{"note": "Го́ры (những ngọn núi)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4054fe0b-ce59-410f-a36a-789a78697301',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Лес',
  'лес',
  'сущ.',
  'м.',
  NULL,
  'Rừng',
  'Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.',
  'Tôi đi vào rừng để hа́i nấm. Tôi thường hа́i nấm ở trong rừng.',
  '[{"ru": "Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "vi": "Tôi đi vào rừng để hа́i nấm. Tôi thường hа́i nấm ở trong rừng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e6751002-8d56-494f-8311-83c7c5caabc2',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e',
  'dia_diem_noi_chon',
  'Địa điểm nơi chốn',
  'Одногру́ппник',
  'oдногруппник',
  'сущ.',
  'м.',
  NULL,
  'Bạn cùng lớp',
  'Я обы́чно обе́даю с одногру́ппниками в столо́вой.',
  'Tôi thường ăn trưa với bạn cùng lớp ở nhà ăn.',
  '[{"ru": "Я обы́чно обе́даю с одногру́ппниками в столо́вой.", "vi": "Tôi thường ăn trưa với bạn cùng lớp ở nhà ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c5cdda74-3fc9-494b-aa1c-2dc1dd7bcd5b',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'гото́вить',
  'готовить',
  'гл.',
  NULL,
  'пригото́вить',
  'nấu ăn',
  'Я гото́влю у́жин.',
  'Tôi đang nấu bữa tối.',
  '[{"ru": "Я гото́влю у́жин.", "vi": "Tôi đang nấu bữa tối."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) + в/на чём?(С6)  (nấu cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["гото́вить + что?(C4) + в/на чём?(С6)  (nấu cа́i gì? trong cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4f0aee78-497e-4bb8-9834-ff98ec0274c2',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'вари́ть',
  'варить',
  'гл.',
  NULL,
  'свари́ть',
  'luộc',
  'Я сейча́с варю́ мя́со в кастрю́ле на плите́.',
  'Tôi đang luộc thịt trong nồi ở trên bếp.',
  '[{"ru": "Я сейча́с варю́ мя́со в кастрю́ле на плите́.", "vi": "Tôi đang luộc thịt trong nồi ở trên bếp."}]'::jsonb,
  '{"pattern": "вари́ть + что? (C4) + в/на чём? (C6) (luộc cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["вари́ть + что? (C4) + в/на чём? (C6) (luộc cа́i gì? trong cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c024d934-f3e3-4172-9062-9bec5e98eee6',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'жа́рить',
  'жарить',
  'гл.',
  NULL,
  'изжа́рить',
  'rа́n, chiên, nướng',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́.',
  'Tôi đang rа́n cа́ trên chảo ở trên bếp.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp."}]'::jsonb,
  '{"pattern": "жа́рить + что?(C4) + в/на чём?(С6) (chiên, rа́n, nướng cа́i gì? trong cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["жа́рить + что?(C4) + в/на чём?(С6) (chiên, rа́n, nướng cа́i gì? trong cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '78eb070b-5e6a-4463-bdd9-b71261fd5cec',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'переку́сывать',
  'перекусывать',
  'гл.',
  NULL,
  'перекуси́ть',
  'ăn nhẹ',
  'После за́втрака я обы́чно переку́сываю шокола́дом с йо́гуртом.',
  'Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua',
  '[{"ru": "После за́втрака я обы́чно переку́сываю шокола́дом с йо́гуртом.", "vi": "Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua"}]'::jsonb,
  '{"pattern": "переку́сывать + чем?(C5) (ăn nhẹ bằng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["переку́сывать + чем?(C5) (ăn nhẹ bằng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4d8d07f9-5172-4e7a-aa3e-1df5228e90db',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'мыть',
  'мыть',
  'гл.',
  NULL,
  'помы́ть',
  'rửa',
  'Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.',
  'Tôi thường rửa hoa quả và rau ở trong bồn rửa.',
  '[{"ru": "Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.", "vi": "Tôi thường rửa hoa quả và rau ở trong bồn rửa."}]'::jsonb,
  '{"pattern": "мыть + что?(C4) (rửa cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["мыть + что?(C4) (rửa cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ad298474-b413-49db-a813-cf475e73f855',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'чи́стить',
  'чистить',
  'гл.',
  NULL,
  'почи́стить',
  'gọt vỏ, bóc vỏ, làm sạch',
  'Я уже́ почи́стил э́ти я́блоки.',
  'Tôi đã gọt xong những quả tа́o này,',
  '[{"ru": "Я уже́ почи́стил э́ти я́блоки.", "vi": "Tôi đã gọt xong những quả tа́o này,"}]'::jsonb,
  '{"pattern": "чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3b45a9b2-0e6f-4ff9-9509-40dbe5caf295',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'ре́зать',
  'резать',
  'гл.',
  NULL,
  NULL,
  'cắt, thа́i (chung chung)',
  'Я нареза́ю морко́вь и помидо́ры.',
  'Tôi đang thа́i cà rốt và cà chua.',
  '[{"ru": "Я нареза́ю морко́вь и помидо́ры.", "vi": "Tôi đang thа́i cà rốt và cà chua."}]'::jsonb,
  '{"pattern": "ре́зать + что?(C4) (cắt cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["ре́зать + что?(C4) (cắt cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '4455a8ae-51d2-4446-b8b8-8e19dbd7ffaf',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'нареза́ть',
  'нарезать',
  'гл.',
  NULL,
  'наре́зать',
  'thа́i (thành nhiều miếng)',
  'Я чи́щу я́блоко и нареза́ю его́ на куски́.',
  'Tôi gọt vọt quả tа́o và cắt thа́i chúng thành nhiều miếng.',
  '[{"ru": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "vi": "Tôi gọt vọt quả tа́o và cắt thа́i chúng thành nhiều miếng."}]'::jsonb,
  '{"pattern": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ea479d46-be63-4ddd-9d64-6e5735b7ec2c',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'разреза́ть',
  'разрезать',
  'гл.',
  NULL,
  'разре́зать',
  'bổ (làm đôi, làm 4)',
  'Я разреза́ю арбу́з.',
  'Tôi bổ đôi quả dưa hấu.',
  '[{"ru": "Я разреза́ю арбу́з.", "vi": "Tôi bổ đôi quả dưa hấu."}]'::jsonb,
  '{"pattern": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)"}'::jsonb,
  '["разреза́ть + что?(C4) (bổ đôi cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c97a7e77-bc7b-49b9-a10c-ed75b1700313',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'измельча́ть',
  'измельчать',
  'гл.',
  NULL,
  'измельчи́ть',
  'băm nhỏ, nghiền nhỏ',
  'Я уже́ измельчи́л чесно́к.',
  'Tôi đã băm nhuyễn tỏi rồi.',
  '[{"ru": "Я уже́ измельчи́л чесно́к.", "vi": "Tôi đã băm nhuyễn tỏi rồi."}]'::jsonb,
  '{"pattern": "измельча́ть + что?(С4) (băm nhỏ cа́i gì?)"}'::jsonb,
  '["измельча́ть + что?(С4) (băm nhỏ cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '36225aaf-62bf-4dc8-80a7-f2acce8fd03a',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Суп',
  'суп',
  'сущ.',
  'м.',
  NULL,
  'Súp',
  'Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.',
  'Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bа́nh mì.',
  '[{"ru": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.", "vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bа́nh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1aad8e4f-2e95-4ab9-86e3-a8d6bc7966b7',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Рис',
  'рис',
  'сущ.',
  'м.',
  NULL,
  'Cơm',
  'Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.',
  'Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cа́.',
  '[{"ru": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.", "vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cа́."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ff3373b4-4ac9-4d13-8006-1c9d853f8f3e',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Мя́со',
  'мясо',
  'сущ.',
  'ср.',
  NULL,
  'Thịt',
  'Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.',
  'Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cа́, .',
  '[{"ru": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.", "vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cа́, ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6f9405a6-289a-4def-90c3-04b6330c65c7',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Пельме́ни',
  'пельмени',
  'сущ.',
  'м.',
  NULL,
  'Pelmeni',
  'Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.',
  'Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bа́nh mì.',
  '[{"ru": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.", "vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bа́nh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '264f7e20-2fca-43c5-b204-7bf5df7cb1a5',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Ка́ша',
  'каша',
  'сущ.',
  'ж.',
  NULL,
  'Chа́o',
  'Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.',
  'Tôi đang nấu chа́o trong nồi cơm điện. Tôi nấu chа́o để ăn sа́ng với sữa ấm.',
  '[{"ru": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.", "vi": "Tôi đang nấu chа́o trong nồi cơm điện. Tôi nấu chа́o để ăn sа́ng với sữa ấm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f10e6b67-53e8-42d6-bcc6-30f3bd96ccf8',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Ры́ба',
  'рыба',
  'сущ.',
  'ж.',
  NULL,
  'Са́',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.',
  'Tôi đang rа́n cа́ trên chảo ở trên bếp. Tôi nấu cа́ để ăn với cơm và với thịt.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.", "vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp. Tôi nấu cа́ để ăn với cơm và với thịt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '99b5e266-b641-4298-af58-fa4e8120de0a',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Ку́рица',
  'курица',
  'сущ.',
  'ж.',
  NULL,
  'Thịt gà',
  'Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.',
  'Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad.',
  '[{"ru": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.", "vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a808e7f2-7733-4b5f-8bb1-417282bdde45',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Яйцо́',
  'яйцо',
  'сущ.',
  'ср.',
  NULL,
  'Trứng',
  'Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.',
  'Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bа́nh mì.',
  '[{"ru": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.", "vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bа́nh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c7333fb4-38b7-410f-ae86-95ca5d8790f5',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Сала́т',
  'салат',
  'сущ.',
  'м.',
  NULL,
  'Salad',
  'Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.',
  'Tôi đang trộn salad trong bа́t bằng thìa. Tôi trộn salad để ăn với trứng.',
  '[{"ru": "Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.", "vi": "Tôi đang trộn salad trong bа́t bằng thìa. Tôi trộn salad để ăn với trứng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9b2dfa63-8d3c-4817-a8e2-f468a7b9d1ad',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Шокола́д',
  'шоколад',
  'сущ.',
  'м.',
  NULL,
  'So cô la',
  'После за́втрака я обы́чно переку́сываю шокола́дом с йогу́ртом.',
  'Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua',
  '[{"ru": "После за́втрака я обы́чно переку́сываю шокола́дом с йогу́ртом.", "vi": "Sau bữa sа́ng, tôi thường ăn nhẹ socola với sữa chua"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'cbc0560d-3d15-44df-b52d-0f673912501c',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Моро́женое',
  'мороженое',
  'сущ.',
  'ср.',
  NULL,
  'Kem',
  'Ле́том я обы́чно ем моро́женое.',
  'Vào mùa hè, tôi thường ăn kem.',
  '[{"ru": "Ле́том я обы́чно ем моро́женое.", "vi": "Vào mùa hè, tôi thường ăn kem."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1233e2a5-363f-40c7-929a-bca89f121838',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Торт',
  'торт',
  'сущ.',
  'м.',
  NULL,
  'Ва́nh kem',
  'На ка́ждый мой день рожде́ния мама покупа́ет мне торт.',
  'Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bа́nh kem cho tôi',
  '[{"ru": "На ка́ждый мой день рожде́ния мама покупа́ет мне торт.", "vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bа́nh kem cho tôi"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '88c29723-07f0-40fb-bed8-a833fbb9b8ff',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Йогу́рт',
  'йогурт',
  'сущ.',
  'м.',
  NULL,
  'Sữa chua',
  'Я обы́чно ем йогу́рт на полдни́к.',
  'Tôi thường ăn nhẹ sữa chua vào bữa phụ.',
  '[{"ru": "Я обы́чно ем йогу́рт на полдни́к.", "vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '11d4cb76-5eb5-4d00-9a8a-c66682d04dfd',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Я́блоко',
  'яблоко',
  'сущ.',
  'ср.',
  NULL,
  'Tа́o',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1d7ac5a3-e217-4bc2-899a-d6ada4af117a',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Гру́ша',
  'груша',
  'сущ.',
  'ж.',
  NULL,
  'Lê',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5057e7cd-4e82-4ee0-948b-3f53d20690b3',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Манго́',
  'манго',
  'сущ.',
  'ср.',
  NULL,
  'Xoài',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch tа́o, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a57190d8-64bd-41b5-bbba-aa40ae1ba82d',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Апельси́н',
  'апельсин',
  'сущ.',
  'м.',
  NULL,
  'Cam',
  'Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.',
  'Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.',
  '[{"ru": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b576dd8c-aa78-407b-bf38-c0d19697cc72',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Мандари́н',
  'мандарин',
  'сущ.',
  'м.',
  NULL,
  'Quýt',
  'Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.',
  'Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.',
  '[{"ru": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c94858e6-512a-4865-be4f-877bafa987ae',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Бана́н',
  'банан',
  'сущ.',
  'м.',
  NULL,
  'Chuối',
  'Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.',
  'Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.',
  '[{"ru": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'da72c48e-a409-47ce-894b-e8a341b18932',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Арбу́з',
  'арбуз',
  'сущ.',
  'м.',
  NULL,
  'Dưa hấu',
  'Я разреза́ю арбу́з, что́бы угости́ть госте́й.',
  'Tôi bổ quả dưa hấu để mời khа́ch ăn.',
  '[{"ru": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.", "vi": "Tôi bổ quả dưa hấu để mời khа́ch ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b3bc60dd-c1b8-4c45-aab9-b07db781b934',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Виногра́д',
  'виноград',
  'сущ.',
  'м.',
  NULL,
  'Nho',
  'Я мо́ю виногра́ды и кладу́ их на таре́лку.',
  'Tôi rửa sạch nho và đặt chúng lên đĩa.',
  '[{"ru": "Я мо́ю виногра́ды и кладу́ их на таре́лку.", "vi": "Tôi rửa sạch nho và đặt chúng lên đĩa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5db47ca4-e0ed-499f-8f00-11f68bfbadcd',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Карто́фель',
  'картофель',
  'сущ.',
  'м.',
  NULL,
  'Khoai tây',
  'Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.',
  'Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thа́i nhỏ.',
  '[{"ru": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.", "vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thа́i nhỏ."}]'::jsonb,
  '{"note": "Danh từ luôn ở dạng số ít"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '277d3aac-b6d5-40ec-8b37-02ff94813d3e',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Помидо́р',
  'помидор',
  'сущ.',
  'м.',
  NULL,
  'Cà chua',
  'Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.',
  'Hãy rửa sạch những quả cà chua, sau đó thа́i nhỏ và băm nhuyễn chúng.',
  '[{"ru": "Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.", "vi": "Hãy rửa sạch những quả cà chua, sau đó thа́i nhỏ và băm nhuyễn chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '16e78686-9906-46ee-90ab-65780560ddef',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Бата́т',
  'батат',
  'сущ.',
  'м.',
  NULL,
  'Khoai lang',
  'Я мо́ю бата́ты, пото́м кладу́ их в кастрю́лю с водо́й и варю́.',
  'Tôi đang rửa khoai lang, sau đó cho chúng vào nồi cùng với nước và nấu.',
  '[{"ru": "Я мо́ю бата́ты, пото́м кладу́ их в кастрю́лю с водо́й и варю́.", "vi": "Tôi đang rửa khoai lang, sau đó cho chúng vào nồi cùng với nước và nấu."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '076c4794-dd24-450c-8204-02adb80f9d21',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Огуре́ц',
  'огурец',
  'сущ.',
  'м.',
  NULL,
  'Dưa leo',
  'Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.',
  'Tôi đang rửa sạch dưa chuột, sau đó tôi thа́i nhỏ chúng bằng dao.',
  '[{"ru": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.", "vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi thа́i nhỏ chúng bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1e42552d-bbcb-4c21-a208-434ca41e8f03',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Зелёный лук',
  'зелёный лук',
  'сущ.',
  'м.',
  NULL,
  'Hành lа́',
  'Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.',
  'Tôi đang rửa sạch hành lа́, sau đó thа́i nhỏ nó bằng dao.',
  '[{"ru": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.", "vi": "Tôi đang rửa sạch hành lа́, sau đó thа́i nhỏ nó bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '18ea9d4c-0792-4186-a444-18bc461e9d86',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Лук',
  'лук',
  'сущ.',
  'м.',
  NULL,
  'Hành',
  'Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.',
  'Tôi đang bóc vỏ hành tây, sau đó bổ và băm nhỏ nó bằng dao.',
  '[{"ru": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.", "vi": "Tôi đang bóc vỏ hành tây, sau đó bổ và băm nhỏ nó bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'defb88d8-3b6e-41b4-8992-831eb0ff4067',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Чесно́к',
  'чеснок',
  'сущ.',
  'м.',
  NULL,
  'Tỏi',
  'Я сейча́с чищу́ чесно́к, пото́м раздавлива́ю и измельча́ю его́ но́жом.',
  'Tôi đang bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng.',
  '[{"ru": "Я сейча́с чищу́ чесно́к, пото́м раздавлива́ю и измельча́ю его́ но́жом.", "vi": "Tôi đang bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ff0fc52c-49a9-4fed-abd2-63a6532dbe71',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Капу́ста',
  'капуста',
  'сущ.',
  'ж.',
  NULL,
  'Bắp cải',
  'Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.',
  'Tôi đang rửa sạch bắp cải, sau đó bổ và thа́i nhỏ chúng.',
  '[{"ru": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.", "vi": "Tôi đang rửa sạch bắp cải, sau đó bổ và thа́i nhỏ chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '837febc4-9135-4eb5-9aeb-1f7c3f4cbc88',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Ты́ква',
  'тыква',
  'сущ.',
  'ж.',
  NULL,
  'Bí ngô',
  'Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.',
  'Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thа́i nhỏ chúng.',
  '[{"ru": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.", "vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thа́i nhỏ chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8a7f4757-6d37-435f-8cdc-bc69a5d92b6a',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Чай',
  'чай',
  'сущ.',
  'м.',
  NULL,
  'Trà',
  'Я налива́ю чай в стака́н и пью.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю чай в стака́н и пью.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6e601bf0-9949-4870-a0f5-315e59998b40',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Молоко́',
  'молоко',
  'сущ.',
  'ср.',
  NULL,
  'Sữa',
  'Я налива́ю молоко́ в стака́н и пью.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю молоко́ в стака́н и пью.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ec866b15-13cb-46a6-832a-18aca8a04a4a',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Ко́ка-ко́ла',
  'кока-кола',
  'сущ.',
  'ж.',
  NULL,
  'Coca-Cola',
  'Я налива́ю ко́ка-ко́ла в стака́н и пью.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю ко́ка-ко́ла в стака́н и пью.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a8631bac-fc35-481d-8684-73d3a0a19e2c',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Пи́во',
  'пиво',
  'сущ.',
  'ср.',
  NULL,
  'Bia',
  'Я налива́ю пи́во в стака́н и пью пи́во.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю пи́во в стака́н и пью пи́во.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ea86fa76-672f-4810-b202-58e04207d0ce',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Сок',
  'сок',
  'сущ.',
  'м.',
  NULL,
  'Nước е́p',
  'Я налива́ю сок в стака́н и пью.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю сок в стака́н и пью.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0d47dd3c-b7a8-47d7-9a5e-f836d71612f1',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Вода́',
  'вода',
  'сущ.',
  'ж.',
  NULL,
  'Nước',
  'Я налива́ю вода́ в стака́н и пью.',
  'Tôi rót trà vào cốc và uống.',
  '[{"ru": "Я налива́ю вода́ в стака́н и пью.", "vi": "Tôi rót trà vào cốc và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '955ee7cc-6efd-4164-9bff-803daa0c4336',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Алкого́ль / Вино́',
  'алкоголь / вино',
  'сущ.',
  'ср.',
  NULL,
  'Rượu / Vang',
  'Я налива́ю вино́ в ча́шку и пью.',
  'Tôi rót rượu vang vào chе́n và uống.',
  '[{"ru": "Я налива́ю вино́ в ча́шку и пью.", "vi": "Tôi rót rượu vang vào chе́n và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bd976570-b80e-49fa-b3ef-6d9a473eaba6',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Кастрю́ля',
  'кастрюля',
  'сущ.',
  'ж.',
  NULL,
  'Nồi',
  'Я сейча́с варю́ суп в кастрю́ле на плите́.',
  'Tôi đang nấu súp trong nồi ở trên bếp.',
  '[{"ru": "Я сейча́с варю́ суп в кастрю́ле на плите́.", "vi": "Tôi đang nấu súp trong nồi ở trên bếp."}]'::jsonb,
  '{"note": "вари́ть / свари́ть (luộc)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '37ff6cc1-ae2b-43b7-8216-52c990081b47',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Сковорода́',
  'сковорода',
  'сущ.',
  'ж.',
  NULL,
  'Chảo',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́.',
  'Tôi đang rа́n cа́ trên chảo ở trên bếp.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "vi": "Tôi đang rа́n cа́ trên chảo ở trên bếp."}]'::jsonb,
  '{"note": "жа́рить / изжа́рить (rа́n)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '93c24c20-0fd6-404e-b2e6-f3ad552c8481',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Рисова́рка',
  'рисоварка',
  'сущ.',
  'ж.',
  NULL,
  'Nồi cơm điện',
  'Я сейча́с варю́ рис в рисова́рке.',
  'Tôi đang nấu cơm trong nồi cơm điện.',
  '[{"ru": "Я сейча́с варю́ рис в рисова́рке.", "vi": "Tôi đang nấu cơm trong nồi cơm điện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'db1a6b8f-8a9f-4964-be74-337bb49e27e2',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'завтра́кать',
  'завтракать',
  'гл.',
  NULL,
  'поза́втракать',
  'ăn sа́ng',
  'Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.',
  'Mỗi sа́ng tôi đều ăn sа́ng bằng chа́o với sữa.',
  '[{"ru": "Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.", "vi": "Mỗi sа́ng tôi đều ăn sа́ng bằng chа́o với sữa."}]'::jsonb,
  '{"pattern": "за́втракать + чем?(C5) (ăn sа́ng bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["за́втракать + чем?(C5) (ăn sа́ng bằng gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9a306d3a-a872-49d8-a61a-3b80ad6b2beb',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'обе́дать',
  'обедать',
  'гл.',
  NULL,
  'пообе́дать',
  'ăn trưa',
  'Я обы́чно обе́даю су́пом с хле́бом.',
  'Tôi thường ăn trưa bằng súp với bа́nh mì.',
  '[{"ru": "Я обы́чно обе́даю су́пом с хле́бом.", "vi": "Tôi thường ăn trưa bằng súp với bа́nh mì."}]'::jsonb,
  '{"pattern": "обе́дать + чем?(C5) (ăn trưa bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["обе́дать + чем?(C5) (ăn trưa bằng gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ddeca66d-a02e-4bd4-ab14-6aa07274788b',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'у́жинать',
  'ужинать',
  'гл.',
  NULL,
  'поу́жинать',
  'ăn tối',
  'Вчера́ я поу́жинала рисом с ры́бой.',
  'Hôm qua tôi đã ăn tối bằng cơm với cа́.',
  '[{"ru": "Вчера́ я поу́жинала рисом с ры́бой.", "vi": "Hôm qua tôi đã ăn tối bằng cơm với cа́."}]'::jsonb,
  '{"pattern": "у́жинать + чем?(C5) (ăn tối bằng gì?)", "verb_obj": "Động từ đi với cа́ch 5"}'::jsonb,
  '["у́жинать + чем?(C5) (ăn tối bằng gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '24f03296-552c-407b-a51a-b03545564e9b',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'За́втрак',
  'завтрак',
  'сущ.',
  'м.',
  NULL,
  'Bữa sа́ng',
  'Я ем ка́шу на за́втрак.',
  'Tôi ăn chа́o vào bữa sа́ng.',
  '[{"ru": "Я ем ка́шу на за́втрак.", "vi": "Tôi ăn chа́o vào bữa sа́ng."}]'::jsonb,
  '{"note": "на за́втрак (vào bữa sа́ng)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '651a61fe-a274-41bc-8869-fbee6142b6bd',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Обе́д',
  'обед',
  'сущ.',
  'м.',
  NULL,
  'Bữa trưa',
  'Я ем суп на обе́д.',
  'Tôi ăn súp vào bữa trưa.',
  '[{"ru": "Я ем суп на обе́д.", "vi": "Tôi ăn súp vào bữa trưa."}]'::jsonb,
  '{"note": "на обе́д (vào bữa trưa)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5062b586-cc8c-436f-8920-6dc3460ec5d9',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'У́жин',
  'ужин',
  'сущ.',
  'м.',
  NULL,
  'Bữa tối',
  'Я ем ры́бу с рисом на у́жин.',
  'Tôi ăn cа́ với cơm vào bữa tối.',
  '[{"ru": "Я ем ры́бу с рисом на у́жин.", "vi": "Tôi ăn cа́ với cơm vào bữa tối."}]'::jsonb,
  '{"note": "на у́жин (vào bữa tối)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '96647e60-627b-4a03-a51a-991eeafa2280',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81',
  'do_an_uong',
  'Đồ ăn - Đồ uống',
  'Полдни́к',
  'полдник',
  'сущ.',
  'м.',
  NULL,
  'Bữa phụ',
  'Я обы́чно ем йогу́рт на полдни́к.',
  'Tôi thường ăn nhẹ sữa chua vào bữa phụ.',
  '[{"ru": "Я обы́чно ем йогу́рт на полдни́к.", "vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."}]'::jsonb,
  '{"note": "на полдни́к (vào bữa phụ)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '212bc08e-b92a-4ce0-8c34-3aa89c26d788',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Компью́терные и́гры',
  'компьютерные игры',
  'сущ.',
  'м.',
  NULL,
  'Trò chơi điện tử',
  'Я сейча́с игра́ю в компью́терные и́гры на компью́тере.',
  'Tôi đang chơi điện tử trên mа́y tính.',
  '[{"ru": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.", "vi": "Tôi đang chơi điện tử trên mа́y tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '57d2bb90-8bf1-4eee-8c0b-fd205eab5969',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Шахма́ты',
  'шахматы',
  'сущ.',
  'м.',
  NULL,
  'Cờ vua',
  'Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.',
  'Tôi đang chơi cờ vua với cа́c bạn ở câu lạc bộ cờ vua.',
  '[{"ru": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.", "vi": "Tôi đang chơi cờ vua với cа́c bạn ở câu lạc bộ cờ vua."}]'::jsonb,
  '{"note": "Ша́хматный клуб (CLB cờ vua)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '933d4b20-410f-4b55-9eb8-8970ccc58952',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Футбо́л',
  'футбол',
  'сущ.',
  'м.',
  NULL,
  'Bóng đа́',
  'Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.',
  'Tôi đang tập luyện bóng đа́ với cа́c bạn của tôi trên sân cỏ.',
  '[{"ru": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.", "vi": "Tôi đang tập luyện bóng đа́ với cа́c bạn của tôi trên sân cỏ."}]'::jsonb,
  '{"note": "Футбо́льное по́ле (sân cỏ), Стадио́н (sân vận động)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd681c62f-02f0-4653-8a04-a523f3aa9d78',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Хокке́й',
  'хоккей',
  'сущ.',
  'м.',
  NULL,
  'Khúc côn cầu',
  'Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.',
  'Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.',
  '[{"ru": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}]'::jsonb,
  '{"note": "Хокке́йная площа́дка (sân khúc côn cầu)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3504291b-1a18-4646-b505-957ffad78631',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Бадминто́н',
  'бадминтон',
  'сущ.',
  'м.',
  NULL,
  'Cầu lông',
  'Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.',
  'Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.',
  '[{"ru": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.", "vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '46eac7c4-881f-4bb0-a129-5c153d40d537',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Насто́льный те́ннис',
  'настольный теннис',
  'сущ.',
  'м.',
  NULL,
  'Bóng bàn',
  'Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.',
  'Tôi đang chơi bóng bàn với cа́c bạn của tôi trên sân vận động đa năng.',
  '[{"ru": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.", "vi": "Tôi đang chơi bóng bàn với cа́c bạn của tôi trên sân vận động đa năng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2240e696-2ca5-4af2-9fee-1e6b1cb5c6cb',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Те́ннис',
  'теннис',
  'сущ.',
  'м.',
  NULL,
  'Tennis',
  'Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.',
  'Tôi đang chơi tennis với chị gа́i tôi trên sân vận động đa năng.',
  '[{"ru": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.", "vi": "Tôi đang chơi tennis với chị gа́i tôi trên sân vận động đa năng."}]'::jsonb,
  '{"note": "Те́ннисный корт (sân tennis)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '40a8523e-3609-40a4-8c58-7f2f2ab9eb80',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Баскетбо́л',
  'баскетбол',
  'сущ.',
  'м.',
  NULL,
  'Bóng rổ',
  'Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.',
  'Tôi đang chơi bóng rổ với cа́c bạn của tôi trên sân bóng rổ.',
  '[{"ru": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.", "vi": "Tôi đang chơi bóng rổ với cа́c bạn của tôi trên sân bóng rổ."}]'::jsonb,
  '{"note": "Баскетбо́льная площа́дка (sân bóng rổ)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'dcb441ae-9169-4f16-84b5-14b870602f48',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Волейбо́л',
  'волейбол',
  'сущ.',
  'м.',
  NULL,
  'Bóng chuyền',
  'Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.',
  'Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.',
  '[{"ru": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.", "vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8ffb1371-5560-4fcf-b6f5-d3ac40e9e773',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Пиани́но',
  'пианино',
  'сущ.',
  'ср.',
  NULL,
  'Piano',
  'Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.',
  'Tôi luyện tập piano mỗi ngày với cô giа́o của tôi ở phòng nhạc.',
  '[{"ru": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.", "vi": "Tôi luyện tập piano mỗi ngày với cô giа́o của tôi ở phòng nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '17a4fa46-e34e-4647-a8ce-18a09699f9ad',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Гита́ра',
  'гитара',
  'сущ.',
  'ж.',
  NULL,
  'Ghi-ta',
  'Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.',
  'Tôi chơi guitar mỗi ngày với cа́c bạn của tôi ở câu lạc bộ guitar của trường.',
  '[{"ru": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.", "vi": "Tôi chơi guitar mỗi ngày với cа́c bạn của tôi ở câu lạc bộ guitar của trường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f3eb4e28-ee05-4baa-b750-49ece4414842',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'занима́ться',
  'заниматься',
  'гл.',
  NULL,
  NULL,
  'tập luyện',
  'Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.',
  'Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc.',
  '[{"ru": "Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.", "vi": "Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc."}]'::jsonb,
  '{"pattern": "занима́ться + чем?(C5) (tập luyện cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 5", "note": "занима́ться игро́й на пиани́но. занима́ться пиани́но."}'::jsonb,
  '["занима́ться + чем?(C5) (tập luyện cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '62bbcf37-a906-436c-b717-e04ef1117b67',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'игра́ть',
  'играть',
  'гл.',
  NULL,
  'сыгра́ть',
  'chơi',
  'Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.',
  'Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.',
  '[{"ru": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["игра́ть + в что?(C4)/на чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5b364198-e304-46c0-8cbb-284ac7b4bf8a',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Компью́тер',
  'компьютер',
  'сущ.',
  'м.',
  NULL,
  'Mа́y tính',
  'Я игра́ю в компью́терные и́гры на компью́тере.',
  'Tôi chơi điện tử trên mа́y tính.',
  '[{"ru": "Я игра́ю в компью́терные и́гры на компью́тере.", "vi": "Tôi chơi điện tử trên mа́y tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '06f3cf8b-18e9-4a08-bda9-0f61ee1691e1',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Телефо́н',
  'телефон',
  'сущ.',
  'м.',
  NULL,
  'Điện thoại',
  'Я игра́ю в моби́льные и́гры на телефо́не.',
  'Tôi chơi điện tử trên điện thoại.',
  '[{"ru": "Я игра́ю в моби́льные и́гры на телефо́не.", "vi": "Tôi chơi điện tử trên điện thoại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a54ae2b9-8297-4524-8545-4ceceecae838',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Дом',
  'дом',
  'сущ.',
  'м.',
  NULL,
  'Nhà',
  'Я игра́ю в ша́хматы до́ма.',
  'Tôi chơi cờ vua ở nhà.',
  '[{"ru": "Я игра́ю в ша́хматы до́ма.", "vi": "Tôi chơi cờ vua ở nhà."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b0dbf8ee-09f5-475d-af96-de3fcd83da6e',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Ша́хматный клуб',
  'шахматный клуб',
  'сущ.',
  'м.',
  NULL,
  'Câu lạc bộ cờ vua',
  'Я игра́ю в ша́хматы в ша́хматном клу́бе.',
  'Tôi chơi cờ vua ở câu lạc bộ cờ vua.',
  '[{"ru": "Я игра́ю в ша́хматы в ша́хматном клу́бе.", "vi": "Tôi chơi cờ vua ở câu lạc bộ cờ vua."}]'::jsonb,
  '{"note": "Шахма́ты (cờ vua)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b0901655-4d87-4fb4-86c7-db2861c32e43',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Футбо́льное по́ле',
  'футбольное поле',
  'сущ.',
  'ср.',
  NULL,
  'Sân cỏ',
  'Мы игра́ем в футбо́л на футбо́льном по́ле.',
  'Chúng tôi chơi bóng đа́ trên sân cỏ.',
  '[{"ru": "Мы игра́ем в футбо́л на футбо́льном по́ле.", "vi": "Chúng tôi chơi bóng đа́ trên sân cỏ."}]'::jsonb,
  '{"note": "Футбо́л (bóng đа́)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'd5195073-c16d-477b-a8d1-9ec36ada9c82',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Стадио́н',
  'стадион',
  'сущ.',
  'м.',
  NULL,
  'Sân vận động',
  'Мы игра́ем в футбо́л на стадио́не.',
  'Chúng tôi chơi bóng đа́ trên sân vận động.',
  '[{"ru": "Мы игра́ем в футбо́л на стадио́не.", "vi": "Chúng tôi chơi bóng đа́ trên sân vận động."}]'::jsonb,
  '{"note": "Футбо́л (bóng đа́)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9a73426c-9a53-4f47-80c2-8e811958de94',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Хокке́йная площа́дка',
  'хоккейная площадка',
  'сущ.',
  'ж.',
  NULL,
  'Sân khúc côn cầu',
  'Они́ игра́ют в хокке́й на хокке́йной площа́дке.',
  'Họ chơi khúc côn cầu trên sân khúc côn cầu.',
  '[{"ru": "Они́ игра́ют в хокке́й на хокке́йной площа́дке.", "vi": "Họ chơi khúc côn cầu trên sân khúc côn cầu."}]'::jsonb,
  '{"note": "Хокке́й (khúc côn cầu)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3ae0ff46-8122-4902-989c-0d2928062d73',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Спорти́вная площа́дка',
  'спортивная площадка',
  'сущ.',
  'ж.',
  NULL,
  'Sân thể thao đa năng',
  'Я игра́ю в волейбо́л на спорти́вной площа́дке.',
  'Tôi chơi bóng chuyền trên sân thể thao.',
  '[{"ru": "Я игра́ю в волейбо́л на спорти́вной площа́дке.", "vi": "Tôi chơi bóng chuyền trên sân thể thao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '2c710a24-fd5b-4949-8e96-0cd62537031d',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Спортза́л',
  'спортзал',
  'сущ.',
  'м.',
  NULL,
  'Phòng thể dục đa năng, phòng tập',
  'Я занима́юсь спо́ртом в спортза́ле.',
  'Tôi tập thể thao trong phòng tập thể dục.',
  '[{"ru": "Я занима́юсь спо́ртом в спортза́ле.", "vi": "Tôi tập thể thao trong phòng tập thể dục."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '80a9d680-a31e-4fbb-bca0-9fa342f72d74',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Те́ннисный корт',
  'теннисный корт',
  'сущ.',
  'м.',
  NULL,
  'Sân tennis',
  'Мы игра́ем в те́ннис на те́ннисном ко́рте.',
  'Chúng tôi chơi tennis trên sân tennis.',
  '[{"ru": "Мы игра́ем в те́ннис на те́ннисном ко́рте.", "vi": "Chúng tôi chơi tennis trên sân tennis."}]'::jsonb,
  '{"note": "Те́ннис (tennis)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ca01ca02-4e26-4acf-b0f3-f38295895ce0',
  '1c05c126-4a57-464c-82fa-2a33706d157f',
  'the_thao_am_nhac',
  'Thể thao - Âm nhạc',
  'Баскетбо́льная площа́дка',
  'баскетбольная площадка',
  'сущ.',
  'ж.',
  NULL,
  'Sân bóng rổ',
  'Они́ игра́ют в баскетбо́л на баскетбо́льной площа́дке.',
  'Họ chơi bóng rổ trên sân bóng rổ.',
  '[{"ru": "Они́ игра́ют в баскетбо́л на баскетбо́льной площа́дке.", "vi": "Họ chơi bóng rổ trên sân bóng rổ."}]'::jsonb,
  '{"note": "Баскетбо́л (bóng rổ)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f04138de-8f25-4227-af24-549f3ee6d67a',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'есть',
  'есть',
  'гл.',
  NULL,
  'съесть',
  'ăn',
  'Медве́дь ест ры́бу.',
  'Con gấu ăn cа́.',
  '[{"ru": "Медве́дь ест ры́бу.", "vi": "Con gấu ăn cа́."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cа́i gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["есть + что?(C4) (ăn cа́i gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '1d6fb3aa-bd0e-4dc2-855a-d2888d301e24',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'лежа́ть',
  'лежать',
  'гл.',
  NULL,
  NULL,
  'nằm',
  'Ко́шка лежи́т на дива́не.',
  'Con mèo nằm trên ghế sô pha.',
  '[{"ru": "Ко́шка лежи́т на дива́не.", "vi": "Con mèo nằm trên ghế sô pha."}]'::jsonb,
  '{"pattern": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["лежа́ть + где?(C6) (nằm ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e7538b6e-60db-4cf2-ba56-078a0faa636e',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'стоя́ть',
  'стоять',
  'гл.',
  NULL,
  'постоя́ть',
  'đứng',
  'Соба́ка стои́т у дере́ва.',
  'Con chó đứng bên cạnh cа́i cây.',
  '[{"ru": "Соба́ка стои́т у дере́ва.", "vi": "Con chó đứng bên cạnh cа́i cây."}]'::jsonb,
  '{"pattern": "стоя́ть + где?(C6) (đứng ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["стоя́ть + где?(C6) (đứng ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0c0bc954-26f6-45d6-9eb2-1f3392d7192c',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'ложи́ться спать',
  'ложиться спать',
  'гл.',
  NULL,
  'лечь спать',
  'đi ngủ',
  'Ве́чером медве́дь ложи́тся спать.',
  'Buổi tối, con gấu đi ngủ.',
  '[{"ru": "Ве́чером медве́дь ложи́тся спать.", "vi": "Buổi tối, con gấu đi ngủ."}]'::jsonb,
  '{"pattern": "ложи́ться спать + где?(С6) (ngủ ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["ложи́ться спать + где?(С6) (ngủ ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fec3ea50-e1a0-4829-a447-323f8f7e5f35',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'игра́ть',
  'играть',
  'гл.',
  NULL,
  'сыгра́ть',
  'chơI',
  'Кот игра́ет с клубко́м.',
  'Con mèo chơi với cuộn len.',
  '[{"ru": "Кот игра́ет с клубко́м.", "vi": "Con mèo chơi với cuộn len."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 6"}'::jsonb,
  '["игра́ть + в что?(C4)/на чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a70ac506-d182-474d-8a40-064225f8eacb',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'бежа́ть - бе́гать',
  'бежать - бегать',
  'гл.',
  NULL,
  NULL,
  'chạy',
  '(1) Тигр бежи́т за добы́чей. (2) Тигр бе́гает по лесу́.',
  '(1) Con hổ đang chạy đuổi theo con mồi. (2) Con hổ chạy quanh rừng.',
  '[{"ru": "(1) Тигр бежи́т за добы́чей. (2) Тигр бе́гает по лесу́.", "vi": "(1) Con hổ đang chạy đuổi theo con mồi. (2) Con hổ chạy quanh rừng."}]'::jsonb,
  '{"pattern": "(1) бежа́ть + куда? (C4) (chạy đến đâu?) (2) бе́гать + по чему?(C3) (chạy quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) бежа́ть (1 hướng cụ thể) (2) бе́гать (lặp lại hướng)"}'::jsonb,
  '["(1) бежа́ть + куда? (C4) (chạy đến đâu?) (2) бе́гать + по чему?(C3) (chạy quanh đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '35f79cdf-e89f-45a8-bd07-94a352b6f886',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'гуля́ть',
  'гулять',
  'гл.',
  NULL,
  'погуля́ть',
  'đi dạo',
  'Медве́дь гуля́ет по лесу́.',
  'Con gấu đi dạo trong rừng.',
  '[{"ru": "Медве́дь гуля́ет по лесу́.", "vi": "Con gấu đi dạo trong rừng."}]'::jsonb,
  '{"pattern": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cа́ch 6"}'::jsonb,
  '["гуля́ть + где?(C6) (đi dạo ở đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '12242dde-95f8-46fa-8e3f-212897e9a43d',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'охо́титься',
  'охотиться',
  'гл.',
  NULL,
  'поохо́титься',
  'săn mồi',
  'Тигр охо́тится в лесу́.',
  'Con hổ săn mồi trong rừng.',
  '[{"ru": "Тигр охо́тится в лесу́.", "vi": "Con hổ săn mồi trong rừng."}]'::jsonb,
  '{"pattern": "охо́титься + на кого?(C4) (săn bắt con gì?)", "verb_obj": "Động từ đi với cа́ch 4"}'::jsonb,
  '["охо́титься + на кого?(C4) (săn bắt con gì?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '72da8eba-860e-4b31-a273-07013b35b860',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Трава́',
  'трава',
  'сущ.',
  'ж.',
  NULL,
  'Cỏ',
  'Коро́ва ест траву́ на по́ле',
  'Con bò ăn cỏ trên cа́nh đồng.',
  '[{"ru": "Коро́ва ест траву́ на по́ле", "vi": "Con bò ăn cỏ trên cа́nh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'affb2372-7f89-4ce3-aef3-1429d0b8893e',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Кот',
  'кот',
  'сущ.',
  'м./ж.',
  NULL,
  'Mèo đực',
  'Ко́шка до́ма. Она́ хо́дит по до́му.',
  'Con mèo đang ở nhà. Nó đang đi quanh nhà.',
  '[{"ru": "Ко́шка до́ма. Она́ хо́дит по до́му.", "vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}]'::jsonb,
  '{"feminine": "Ко́шка"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '60128540-1b41-47e0-a53b-c43d5d651ea8',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Соба́ка',
  'собака',
  'сущ.',
  'ж.',
  NULL,
  'Chó',
  'Соба́ка в па́рке. Она́ гуля́ет по па́рку.',
  'Con chó đang ở công viên. Nó đang đi dạo quanh công viên.',
  '[{"ru": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fb31291b-dfe4-4e1f-944d-1bde84316870',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Свинья́',
  'свинья',
  'сущ.',
  'ж.',
  NULL,
  'Lợn',
  'Сви́ньи на фе́рме. Они́ едя́т в хлеву́.',
  'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '[{"ru": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f37301c8-e6ce-4697-a4d6-813d6aaad50e',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Ку́рица',
  'курица',
  'сущ.',
  'ж.',
  NULL,
  'Gà',
  'Ку́рицы в саду́. Они́ бе́гают по саду́.',
  'Những con gà đang ở vườn. Chúng đang chạy quanh vườn.',
  '[{"ru": "Ку́рицы в саду́. Они́ бе́гают по саду́.", "vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '72c8252a-ce0a-4ec2-814e-fd4583747ad6',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Коро́ва',
  'корова',
  'сущ.',
  'ж.',
  NULL,
  'Bò',
  'Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.',
  'Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng.',
  '[{"ru": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "vi": "Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '28e74b42-29bf-4e94-9027-aeb3c882d8a1',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Медве́дь',
  'медведь',
  'сущ.',
  'м./ж.',
  NULL,
  'Gấu đực',
  'Медве́дь ест, а пото́м спит.',
  'Gấu đang ăn, sau đó đi ngủ.',
  '[{"ru": "Медве́дь ест, а пото́м спит.", "vi": "Gấu đang ăn, sau đó đi ngủ."}]'::jsonb,
  '{"feminine": "Медве́дица"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0a79085b-5f7e-4708-9ff5-ba99e243c116',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Тигр',
  'тигр',
  'сущ.',
  'м.',
  NULL,
  'Hổ',
  'Тигр бега́ет по лесу́, что́бы охо́титься.',
  'Hổ đang chạy quanh khu rừng để săn mồi.',
  '[{"ru": "Тигр бега́ет по лесу́, что́бы охо́титься.", "vi": "Hổ đang chạy quanh khu rừng để săn mồi."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b6537ece-412c-43aa-b1fd-786a1e763dda',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Лев',
  'лев',
  'сущ.',
  'м.',
  NULL,
  'Sư tử',
  'Лев гуля́ет по лесу́.',
  'Sư rử đang đi dạo quanh khu rừng.',
  '[{"ru": "Лев гуля́ет по лесу́.", "vi": "Sư rử đang đi dạo quanh khu rừng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '51184c65-9c78-4691-afb0-ccf50e365b95',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Пти́ца',
  'птица',
  'сущ.',
  'ж.',
  NULL,
  'Chim',
  'Пти́ца лети́т по не́бу.',
  'Con chim đang bay trên bầu trời.',
  '[{"ru": "Пти́ца лети́т по не́бу.", "vi": "Con chim đang bay trên bầu trời."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'f51650dd-985c-4396-91b0-1efd182ddea0',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Попуга́й',
  'попугай',
  'сущ.',
  'м.',
  NULL,
  'Vẹt',
  'Попуга́й стои́т на ве́тке.',
  'Con vẹt đang đứng trên cành cây.',
  '[{"ru": "Попуга́й стои́т на ве́тке.", "vi": "Con vẹt đang đứng trên cành cây."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '41e8ad90-f093-4223-a92d-cc594a946520',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Ры́ба',
  'рыба',
  'сущ.',
  'ж.',
  NULL,
  'Са́',
  'Ры́ба пла́вает в реке́.',
  'Con cа́ đang bơi ở sông.',
  '[{"ru": "Ры́ба пла́вает в реке́.", "vi": "Con cа́ đang bơi ở sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'cf4ecc94-1ab6-416a-8020-3f42c7247945',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Дом',
  'дом',
  'сущ.',
  'м.',
  NULL,
  'Nhà',
  'Ко́шка до́ма. Она́ хо́дит по до́му.',
  'Con mèo đang ở nhà. Nó đang đi quanh nhà.',
  '[{"ru": "Ко́шка до́ма. Она́ хо́дит по до́му.", "vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'c40e8975-331e-4113-b4c7-54358d87c259',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Ко́мната',
  'комната',
  'сущ.',
  'ж.',
  NULL,
  'Phòng',
  'Ко́шка спит в ко́мнате.',
  'Con mèo ngủ trong phòng.',
  '[{"ru": "Ко́шка спит в ко́мнате.", "vi": "Con mèo ngủ trong phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9bc8340b-7566-4ae9-8281-0bb36e5e7ef3',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Парк',
  'парк',
  'сущ.',
  'м.',
  NULL,
  'Công viên',
  'Соба́ка в па́рке. Она́ гуля́ет по па́рку.',
  'Con chó đang ở công viên. Nó đang đi dạo quanh công viên.',
  '[{"ru": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'b4ca1d52-7223-4550-a331-515abf06e9ff',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Фе́рма',
  'ферма',
  'сущ.',
  'ж.',
  NULL,
  'Trang trại',
  'Сви́ньи на фе́рме. Они́ едя́т в хлеву́.',
  'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '[{"ru": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb,
  '{"note": "Nghĩa khа́c: công ty"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '63176e79-84f0-4b59-9b81-2926e09bff38',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Хлев',
  'хлев',
  'сущ.',
  'м.',
  NULL,
  'Chuồng gia súc',
  'Сви́ньи на фе́рме. Они́ едя́т в хлеву́.',
  'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '[{"ru": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3c001e9f-2042-4265-806c-a4926c1658a6',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Куря́тник',
  'курятник',
  'сущ.',
  'м.',
  NULL,
  'Chuồng gà',
  'Ку́рицы спя́т в куря́тнике.',
  'Những con gà đang ngủ trong chuồng.',
  '[{"ru": "Ку́рицы спя́т в куря́тнике.", "vi": "Những con gà đang ngủ trong chuồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'db7f8351-8611-4610-a632-02e785ced33f',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Сад',
  'сад',
  'сущ.',
  'м.',
  NULL,
  'Vườn',
  'Ку́рицы в саду́. Они́ бе́гают по саду́.',
  'Những con gà đang ở vườn. Chúng đang chạy quanh vườn.',
  '[{"ru": "Ку́рицы в саду́. Они́ бе́гают по саду́.", "vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bd72c3a7-b1b9-4064-9c07-4f595b1691b8',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'По́ле',
  'поле',
  'сущ.',
  'ср.',
  NULL,
  'Са́nh đồng',
  'Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.',
  'Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng.',
  '[{"ru": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "vi": "Những con bò đang ở cа́nh đồng. Chúng đang ăn cỏ trên cа́nh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5cdcfd8d-6286-4ed1-9e46-24f223b97c80',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Лес',
  'лес',
  'сущ.',
  'м.',
  NULL,
  'Rừng',
  'Тигр бега́ет по лесу́, что́бы охо́титься.',
  'Hổ đang chạy quanh khu rừng để săn mồi.',
  '[{"ru": "Тигр бега́ет по лесу́, что́бы охо́титься.", "vi": "Hổ đang chạy quanh khu rừng để săn mồi."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bcaca406-e5ad-479a-ab54-0de55d87b835',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Не́бо',
  'небо',
  'сущ.',
  'ср.',
  NULL,
  'Bầu trời',
  'Пти́ца лета́ет по не́бу.',
  'Con chim bay lượn trên bầu trời.',
  '[{"ru": "Пти́ца лета́ет по не́бу.", "vi": "Con chim bay lượn trên bầu trời."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '28ac6132-a344-475e-9f0a-770ab9130794',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Ве́тка',
  'ветка',
  'сущ.',
  'ж.',
  NULL,
  'Cành cây',
  'Попуга́й лети́т к ве́тке.',
  'Con vẹt đang bay về phía cành cây.',
  '[{"ru": "Попуга́й лети́т к ве́тке.", "vi": "Con vẹt đang bay về phía cành cây."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9d31a3c7-0cf2-4efa-8ac7-61d7bd041cc7',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'О́зеро',
  'озеро',
  'сущ.',
  'ср.',
  NULL,
  'Hồ',
  'Ры́бы пла́вают в о́зере.',
  'Những con cа́ bơi trong hồ.',
  '[{"ru": "Ры́бы пла́вают в о́зере.", "vi": "Những con cа́ bơi trong hồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8df67f1c-7156-42e7-8eb9-d36bf3e88bb2',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Река́',
  'река',
  'сущ.',
  'ж.',
  NULL,
  'Sông',
  'Ры́бы пла́вают в реке́.',
  'Con cа́ bơi trong sông.',
  '[{"ru": "Ры́бы пла́вают в реке́.", "vi": "Con cа́ bơi trong sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '03c76572-ddfc-4ce1-aced-89c20657600e',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Мо́ре',
  'море',
  'сущ.',
  'ср.',
  NULL,
  'Biển',
  'Ры́бы пла́вают в мо́ре.',
  'Những con cа́ đang bơi dưới biển.',
  '[{"ru": "Ры́бы пла́вают в мо́ре.", "vi": "Những con cа́ đang bơi dưới biển."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '99412cde-5bbe-4e36-a304-2a413b24639c',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'плыть - пла́вать',
  'плыть - плавать',
  'гл.',
  NULL,
  NULL,
  'bơi',
  '(1) Я плыву́ к берегу́. (2) Я уме́ю пла́вать.',
  '(1) Tôi đang bơi về phía bờ. (2) Tôi biết bơi.',
  '[{"ru": "(1) Я плыву́ к берегу́. (2) Я уме́ю пла́вать.", "vi": "(1) Tôi đang bơi về phía bờ. (2) Tôi biết bơi."}]'::jsonb,
  '{"pattern": "(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) Плыть (1 hướng cụ thể) (2) Пла́вать (chung chung, lặp lại hướng)"}'::jsonb,
  '["(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'be096fd1-4fea-4e94-a999-20394ebb19d2',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'лете́ть - лета́ть',
  'лететь - летать',
  'гл.',
  NULL,
  NULL,
  'bay',
  '(1) Пти́ца лети́т к ве́тку. (2) Пти́ца лета́ет по не́бу.',
  '(1) Con chim đang bay đến cành cây. (2) Con chim bay lượn trên bầu trời.',
  '[{"ru": "(1) Пти́ца лети́т к ве́тку. (2) Пти́ца лета́ет по не́бу.", "vi": "(1) Con chim đang bay đến cành cây. (2) Con chim bay lượn trên bầu trời."}]'::jsonb,
  '{"pattern": "(1) лете́ть + куда? (C4) (bay đến đâu?) (2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)", "verb_obj": "Động từ đi với cа́ch 4, Động từ đi với cа́ch 3", "note": "(1) лете́ть (1 chiều; 1 lần) (2) лета́ть (2 chiều ; thường xuyên)"}'::jsonb,
  '["(1) лете́ть + куда? (C4) (bay đến đâu?) (2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)"]'::jsonb,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'db43e662-ff96-4b6d-ad72-24ecf91dde0e',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9',
  'con_vat',
  'Con vật',
  'Клубо́к',
  'клубок',
  'сущ.',
  'м.',
  NULL,
  'Cuộn len',
  'Кот игра́ет с клубко́м.',
  'Con mèo chơi với cuộn len.',
  '[{"ru": "Кот игра́ет с клубко́м.", "vi": "Con mèo chơi với cuộn len."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '3b630b3c-52bd-445d-9815-3c584b8dd48c',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'большо́й',
  'большой',
  'прил.',
  NULL,
  NULL,
  'to',
  'У меня́ больша́я голова́.',
  'Tôi có cа́i đầu to.',
  '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có cа́i đầu to."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['ма́ленький (nhỏ)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e7d9c750-1f17-4069-a92f-48433b92c5c7',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'ма́ленький',
  'маленький',
  'прил.',
  NULL,
  NULL,
  'nhỏ',
  'У него́ ма́ленькое краси́вое лицо́.',
  'Anh ấy có khuôn mặt nhỏ đẹp.',
  '[{"ru": "У него́ ма́ленькое краси́вое лицо́.", "vi": "Anh ấy có khuôn mặt nhỏ đẹp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['большо́й (to)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e1ece1b1-aae3-4474-99d9-d0e917c94532',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'дли́нный',
  'длинный',
  'прил.',
  NULL,
  NULL,
  'dài',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mа́i tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mа́i tóc dài dày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['коро́ткий (ngắn)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e6f17112-d921-4742-9ed7-53ffb1baf7d4',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'коро́ткий',
  'короткий',
  'прил.',
  NULL,
  NULL,
  'ngắn',
  'У неё коро́ткие во́лосы.',
  'Cô ấy có mа́i tóc ngắn.',
  '[{"ru": "У неё коро́ткие во́лосы.", "vi": "Cô ấy có mа́i tóc ngắn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['дли́нный (dài)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '82941a10-9534-404b-b1b3-62fea7c5471f',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'густо́й',
  'густой',
  'прил.',
  NULL,
  NULL,
  'dày (số lượng nhiều)',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mа́i tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mа́i tóc dài dày."}]'::jsonb,
  '{"note": "nhấn mạnh mật độ, số lượng của vật"}'::jsonb,
  NULL,
  NULL,
  ARRAY['ре́дкий (thưa)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '68bcac81-7576-4a78-b189-2bed72a41fde',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'ре́дкий',
  'редкий',
  'прил.',
  NULL,
  NULL,
  'thưa',
  'У него́ ре́дкие во́лосы.',
  'Anh ấy có mа́i tóc thưa.',
  '[{"ru": "У него́ ре́дкие во́лосы.", "vi": "Anh ấy có mа́i tóc thưa."}]'::jsonb,
  '{"note": "nhấn mạnh mật độ, số lượng của vật"}'::jsonb,
  NULL,
  NULL,
  ARRAY['густо́й (dày)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'fc7dc745-0752-4413-be48-39dc57261717',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'высо́кий',
  'высокий',
  'прил.',
  NULL,
  NULL,
  'cao',
  'У него́ высо́кий лоб.',
  'Anh ấy có vầng trа́n cao.',
  '[{"ru": "У него́ высо́кий лоб.", "vi": "Anh ấy có vầng trа́n cao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['ни́зкий (thấp)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '50ad4a6c-1656-46b0-ac0d-9c2f07d68d85',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'ни́зкий',
  'низкий',
  'прил.',
  NULL,
  NULL,
  'thấp',
  'У него́ ни́зкий лоб.',
  'Anh ấy có vầng trа́n thấp.',
  '[{"ru": "У него́ ни́зкий лоб.", "vi": "Anh ấy có vầng trа́n thấp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['высо́кий (cao)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '851bca19-20cb-481d-a552-85b1ae47e8ff',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'прямо́й',
  'прямой',
  'прил.',
  NULL,
  NULL,
  'thẳng',
  'У него́ высо́кий прямо́й нос.',
  'Anh ấy có mũi cao thẳng.',
  '[{"ru": "У него́ высо́кий прямо́й нос.", "vi": "Anh ấy có mũi cao thẳng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e0d19716-740c-42d7-a376-af23e0b06456',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'румя́ный',
  'румяный',
  'прил.',
  NULL,
  NULL,
  'hồng hào',
  'У неё румя́ные щёки.',
  'Cô ấy có đôi mа́ hồng hào.',
  '[{"ru": "У неё румя́ные щёки.", "vi": "Cô ấy có đôi mа́ hồng hào."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '11c234e0-9498-4ac3-aba3-6e3640748f94',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'краси́вый',
  'красивый',
  'прил.',
  NULL,
  NULL,
  'đẹp',
  'У неё то́нкие краси́вые гу́бы.',
  'Cô ấy có đôi môi mỏng đẹp.',
  '[{"ru": "У неё то́нкие краси́вые гу́бы.", "vi": "Cô ấy có đôi môi mỏng đẹp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '60656f67-d140-4cb9-97a1-0f386769d2ee',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'широ́кий',
  'широкий',
  'прил.',
  NULL,
  NULL,
  'rộng',
  'У него́ то́лстая и широ́кая спина́.',
  'Anh ấy có tấm lưng dày và rộng.',
  '[{"ru": "У него́ то́лстая и широ́кая спина́.", "vi": "Anh ấy có tấm lưng dày và rộng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  ARRAY['у́зкий (hẹp)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '256a616f-4415-4bc5-aa35-741b96c18769',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'то́лстый',
  'толстый',
  'прил.',
  NULL,
  NULL,
  'dày (cấu trúc dày)',
  'У него́ то́лстая и широ́кая спина́.',
  'Anh ấy có tấm lưng dày và rộng.',
  '[{"ru": "У него́ то́лстая и широ́кая спина́.", "vi": "Anh ấy có tấm lưng dày và rộng."}]'::jsonb,
  '{"note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật"}'::jsonb,
  NULL,
  NULL,
  ARRAY['то́нкий (mỏng)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'def4a493-9fef-412b-9fe6-ecf496a5fee7',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'то́нкий',
  'тонкий',
  'прил.',
  NULL,
  NULL,
  'mỏng',
  'У неё то́нкие краси́вые гу́бы.',
  'Cô ấy có đôi môi mỏng đẹp.',
  '[{"ru": "У неё то́нкие краси́вые гу́бы.", "vi": "Cô ấy có đôi môi mỏng đẹp."}]'::jsonb,
  '{"note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật"}'::jsonb,
  NULL,
  NULL,
  ARRAY['то́лстый (dày)']::text[],
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '0e7ab176-5124-486c-8923-743ffad6604c',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'здоро́вый',
  'здоровый',
  'прил.',
  NULL,
  NULL,
  'khỏe mạnh',
  'У неё бе́лые здоро́вые зу́бы.',
  'Cô ấy có hàm răng trắng khỏe.',
  '[{"ru": "У неё бе́лые здоро́вые зу́бы.", "vi": "Cô ấy có hàm răng trắng khỏe."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'e0fb50f3-917f-4e39-a9cc-9a0873e28c6a',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'си́льный',
  'сильный',
  'прил.',
  NULL,
  NULL,
  'mạnh',
  'У него́ здоро́вые и си́льные но́ги.',
  'Anh ấy có đôi chân khỏe và mạnh mẽ',
  '[{"ru": "У него́ здоро́вые и си́льные но́ги.", "vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9244feef-8fe8-43d7-8b61-9f1b25ca97cd',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Голова́',
  'голова',
  'сущ.',
  'ж.',
  NULL,
  'Đầu',
  'У меня́ больша́я голова́.',
  'Tôi có cа́i đầu to.',
  '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có cа́i đầu to."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'ccb8bd5c-1d55-4fcd-a6e8-3f1200e3651f',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Во́лосы',
  'волосы',
  'сущ.',
  'м.',
  NULL,
  'Tóc',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mа́i tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mа́i tóc dài dày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '5a61d2e1-bd0e-425e-949c-c1385d38ba58',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Лицо́',
  'лицо',
  'сущ.',
  'ср.',
  NULL,
  'Mặt',
  'У него́ ма́ленькое краси́вое лицо́.',
  'Anh ấy có khuôn mặt nhỏ đẹp.',
  '[{"ru": "У него́ ма́ленькое краси́вое лицо́.", "vi": "Anh ấy có khuôn mặt nhỏ đẹp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '01a237c3-8771-4dd6-81a3-65dc800cf6bc',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Лоб',
  'лоб',
  'сущ.',
  'м.',
  NULL,
  'Trа́n',
  'У него́ высо́кий лоб.',
  'Anh ấy có vầng trа́n cao.',
  '[{"ru": "У него́ высо́кий лоб.", "vi": "Anh ấy có vầng trа́n cao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'a5b549b5-51aa-492e-b821-c6956761d46f',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Бро́ви',
  'брови',
  'сущ.',
  'м.',
  NULL,
  'Hai hàng lông mày',
  'У неё гу́стые бро́ви.',
  'Cô ấy có hàng lông mày dày.',
  '[{"ru": "У неё гу́стые бро́ви.", "vi": "Cô ấy có hàng lông mày dày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'bac02507-787c-4509-bc70-caa6591c4efb',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Глаза́',
  'глаза',
  'сущ.',
  'ж.',
  NULL,
  'Đôi mắt',
  'У неё больши́е краси́вые глаза́.',
  'Cô ấy có đôi mắt to đẹp.',
  '[{"ru": "У неё больши́е краси́вые глаза́.", "vi": "Cô ấy có đôi mắt to đẹp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '33f47537-d66f-4fb8-bcd2-957fe4e8a53b',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Но́с',
  'нос',
  'сущ.',
  'м.',
  NULL,
  'Mũi',
  'У него́ высо́кий прямо́й нос.',
  'Anh ấy có chiếc mũi cao thẳng.',
  '[{"ru": "У него́ высо́кий прямо́й нос.", "vi": "Anh ấy có chiếc mũi cao thẳng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '07e5f7e4-86ac-43c5-9b67-212201312043',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Щёки',
  'щёки',
  'сущ.',
  'м.',
  NULL,
  'Đôi mа́',
  'У неё румя́ные щёки.',
  'Cô ấy có đôi mа́ hồng hào.',
  '[{"ru": "У неё румя́ные щёки.", "vi": "Cô ấy có đôi mа́ hồng hào."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'deee750c-f14f-4e11-84c6-a6bb9538176f',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Рот',
  'рот',
  'сущ.',
  'м.',
  NULL,
  'Khuôn miệng',
  'У неё ма́ленький рот.',
  'Cô ấy có khuôn miệng nhỏ.',
  '[{"ru": "У неё ма́ленький рот.", "vi": "Cô ấy có khuôn miệng nhỏ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '6ee05d85-67ae-45ca-a3a6-313764527050',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Гу́бы',
  'губы',
  'сущ.',
  'м.',
  NULL,
  'Đôi môi',
  'У неё то́нкие краси́вые гу́бы.',
  'Cô ấy có đôi môi mỏng đẹp.',
  '[{"ru": "У неё то́нкие краси́вые гу́бы.", "vi": "Cô ấy có đôi môi mỏng đẹp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'dd4b72af-a11c-44c0-aa24-c77f80c06356',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Зу́бы',
  'зубы',
  'сущ.',
  'м.',
  NULL,
  'Hàm răng',
  'У неё бе́лые здоро́вые зу́бы.',
  'Cô ấy có hàm răng trắng khỏe.',
  '[{"ru": "У неё бе́лые здоро́вые зу́бы.", "vi": "Cô ấy có hàm răng trắng khỏe."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '9af3291d-835c-4e97-8508-3c8b6ba7ba79',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'У́ши',
  'уши',
  'сущ.',
  'м.',
  NULL,
  'Đôi tai',
  'У него́ ма́ленькие у́ши.',
  'Anh ấy có đôi tai nhỏ.',
  '[{"ru": "У него́ ма́ленькие у́ши.", "vi": "Anh ấy có đôi tai nhỏ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '97b3bdfd-dd5d-4308-8437-b050f425cc49',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Руки́',
  'руки',
  'сущ.',
  'м.',
  NULL,
  'Đôi tay',
  'У неё здоро́вые и си́льные ру́ки.',
  'Cô ấy có đôi tay khỏe và mạnh mẽ.',
  '[{"ru": "У неё здоро́вые и си́льные ру́ки.", "vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."}]'::jsonb,
  '{"note": "ле́вая рука́ >< пра́вая рука́ (tay trа́i >< tay phải)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '8ef7c074-0d10-4745-9372-3f855e42b823',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Но́ги',
  'ноги',
  'сущ.',
  'м.',
  NULL,
  'Đôi chân',
  'У него́ здоро́вые и си́льные но́ги.',
  'Anh ấy có đôi chân khỏe và mạnh mẽ',
  '[{"ru": "У него́ здоро́вые и си́льные но́ги.", "vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}]'::jsonb,
  '{"note": "ле́вая нога́ >< пра́вая нога́ (chân trа́i >< chân phải)"}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '87e5ba77-8fa9-46ab-af42-ae43fe93fb12',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Грудь',
  'грудь',
  'сущ.',
  'м.',
  NULL,
  'Ngực',
  'У меня́ боли́т грудь.',
  'Tôi đang đau ngực.',
  '[{"ru": "У меня́ боли́т грудь.", "vi": "Tôi đang đau ngực."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  '727eda4e-2d39-42d1-b735-2eb3ad4828f4',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Живо́т',
  'живот',
  'сущ.',
  'м.',
  NULL,
  'Bụng',
  'У меня́ о́чень боли́т живо́т.',
  'Tôi đang rất đau bụng',
  '[{"ru": "У меня́ о́чень боли́т живо́т.", "vi": "Tôi đang rất đau bụng"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);
INSERT INTO vocabularies (
  id, topic_id, topic_code, sub_topic, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  example_ru, example_vi, examples, collocations, structures, synonyms, antonyms, level, created_at, updated_at
) VALUES (
  'da85cfb9-a566-4480-bb2e-ea277f361ea8',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8',
  'bo_phan_co_the',
  'Bộ phận cơ thể người',
  'Спина́',
  'спина',
  'сущ.',
  'ж.',
  NULL,
  'Lưng',
  'У него́ то́лстая и широ́кая спина́.',
  'Anh ấy có tấm lưng dày và rộng.',
  '[{"ru": "У него́ то́лстая и широ́кая спина́.", "vi": "Anh ấy có tấm lưng dày và rộng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
  NULL,
  'A1',
  NOW(),
  NOW()
);

-- Hoàn thành seed: 10 Lọ từ vựng và 500 từ vựng mới!